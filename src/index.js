import logger from 'loglevel';
import cluster from 'cluster';
import os from 'os';
import startServer from './start';

const numCPUS = os.cpus().length;
logger.setLevel('info');

// Aktifkan jika mode production
if (cluster.isMaster) {
    for (let i = 0; i < numCPUS; i += 1) {
        cluster.fork();
    }
} else {
    startServer({ port: 3200 });
}

// Aktifkan jika mode debug
// startServer({ port: 3200 });

// Jalankan gunakan untuk menggunakan API, misalnya
// http://localhost:3200/api/math/add?a=1&c=3
