import logger from 'loglevel';
import cluster from 'cluster';
import os from 'os';
import startServer from './start';
import connectMongoDb from './repository/dbconnect';

import config from '../config';

const numCPUS = os.cpus().length;
logger.setLevel('info');

function startServerCluster() {
    // Aktifkan jika mode production
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUS; i += 1) {
            cluster.fork();
        }
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

connectMongoDb()
    .then((isConnect) => {
        if (isConnect) {
            logger.info('MongoDb connected');
            // Aktifkan jika ingin mode produksi
            startServerCluster();
            // Aktifkan jika mode debug
            // startServerDebug();
        } else {
            logger.info('Mongodb not connected');
        }
    })
    .catch((error) => {
        logger.error(error);
        logger.info('Mongodb not connected');
    });

// Untuk menguji API akses dengan Postman atau Insomnia dengan
// Contoh URL API berikut
// http://localhost:3200/api/math/add?a=1&c=3
