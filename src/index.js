import logger from 'loglevel';
import cluster from 'cluster';
import os from 'os';
import startServer from './start';
import connectMongoDb from './repository/dbconnect';

import { port } from '../config';

const numCPUS = os.cpus().length;
logger.setLevel('info');

function startServerCluster() {
    // Aktifkan jika mode production
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUS; i += 1) {
            cluster.fork();
        }
    } else {
        startServer({ port })
            .then()
            .catch((err) => logger.error(err));
    }
}

connectMongoDb()
    .then((isConnect) => {
        if (isConnect) {
            logger.info('MongoDb connected');
            startServerCluster();
        } else {
            logger.info('Mongodb not connected');
        }
    })
    .catch((error) => {
        logger.error(error);
        logger.info('Mongodb not connected');
    });

// Aktifkan jika mode debug
// startServer({ port: 3200 });

// Jalankan gunakan untuk menggunakan API, misalnya
// http://localhost:3200/api/math/add?a=1&c=3
