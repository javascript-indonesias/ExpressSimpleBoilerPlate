import cluster from 'cluster';
import os from 'os';
import logger from './utils/config-winston';
import startServer from './start';
import connectMongoDb from './repository/dbconnect';

import config from '../config';

const numCPUS = os.cpus().length;

function startServerCluster() {
    // Aktifkan jika mode production
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUS; i += 1) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code) => {
            // Cluster mengalami crash karena error
            // Jalankan fallback untuk restart ulang cluster
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                logger.warn('Cluster crashed, starting new cluster');
                cluster.fork();
            }
        });
    } else {
        startServer({ port: config.port })
            .then()
            .catch((err) => logger.error(err));
    }
}

function startServerDebug() {
    // Aktifkan jika mode debug
    startServer({ port: 3200 })
        .then()
        .catch((err) => logger.error(err));
}

// Jika tidak menggunakan MongoDb, bisa jalankan langsung saja
function runServerNodeJS() {
    logger.info('Start server Express');
    if (config.mode === 'production') {
        // Aktifkan jika ingin mode production
        startServerCluster();
    } else {
        // Aktifkan jika mode development
        startServerDebug();
    }
}

// Jika menggunakan MongoDb atau sejenisnya, dapat menggunakan fungsi ini.
function runServerNodeJSMongoDb() {
    // Jalankan koneksi ke MongoDb terlebih dahulu sebelum start server
    connectMongoDb()
        .then((isConnect) => {
            if (isConnect) {
                logger.info('MongoDb connected');
                if (config.mode === 'production') {
                    // Aktifkan jika ingin mode production
                    startServerCluster();
                } else {
                    // Aktifkan jika mode development
                    startServerDebug();
                }
            } else {
                logger.info('Mongodb not connected');
            }
        })
        .catch((error) => {
            logger.error(error);
            logger.info('Mongodb not connected');
        });
}

// Jalankan server sesuai kebutuhan
runServerNodeJS();
// runServerNodeJSMongoDb();

// Untuk menguji API akses dengan Postman atau Insomnia dengan
// Contoh URL API berikut
// http://localhost:3200/api/v1/math/add?a=1&c=3
