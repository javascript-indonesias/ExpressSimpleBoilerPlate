import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import logger from '../utils/config-winston';

// create application/json parser
const jsonParser = bodyParser.json();

const cachedData = {};
let cacheTime = 0;
let cacheTimeMdroid = 0;

// API Data Covid dari web resmi pemerintah
// https://covid19.go.id/peta-sebaran
function getDataCovid19Pemerintah(_req, res, next) {
    // Kirim data hasil cache jika waktu cache masih ada
    // Kirim data dari cache, jika waktunya masih 5 menit
    const timeMsNow = Date.now() - 5 * 60 * 1000;
    if (cacheTime && cacheTime > timeMsNow) {
        res.json({
            status: 'sukses cached',
            data: cachedData.data,
            cachetime: cacheTime,
        });
    } else {
        axios
            .get('https://data.covid19.go.id/public/api/data.json')
            .then((result) => {
                if (result.status === 200) {
                    cachedData.data = result.data;
                    cacheTime = Date.now();
                    res.json({
                        status: 'sukses',
                        data: result.data,
                        cachetime: cacheTime,
                    });
                } else {
                    res.json({ status: 'error', message: result.status });
                }
            })
            .catch((err) => {
                logger.error(err);
                res.json({ status: 'error', message: err });
                next(err);
            });
    }
}

function getDataCovidMathdroid(_req, res, next) {
    const timeMsNow = Date.now() - 5 * 60 * 1000;
    if (cacheTimeMdroid && cacheTimeMdroid > timeMsNow) {
        res.json({
            status: 'sukses cached',
            data: cachedData.datamdroid,
            cachetime: cacheTimeMdroid,
        });
    } else {
        axios
            .get('https://covid19.mathdro.id/api/countries/IDN')
            .then((result) => {
                if (result.status === 200) {
                    cachedData.datamdroid = result.data;
                    cacheTimeMdroid = Date.now();
                    res.json({
                        status: 'sukses',
                        data: result.data,
                        cachetime: cacheTimeMdroid,
                    });
                } else {
                    res.json({ status: 'error', message: result.status });
                }
            })
            .catch((err) => {
                logger.error(err);
                res.json({ status: 'error', message: err });
                next(err);
            });
    }
}

// Definisikan router di sini dari setiap controller di atas
function getCovidRoutes() {
    const router = express.Router();
    router.get('/pemerintah', jsonParser, getDataCovid19Pemerintah);
    router.get('/matdroid', jsonParser, getDataCovidMathdroid);
    return router;
}

export default getCovidRoutes;
