import mongoose from 'mongoose';
import logger from '../utils/config-winston';
import { mongouri } from '../../config';

// Daftar koneksi ke database yang dipakai
async function connectMongooseDb() {
    let isSukses = false;
    try {
        await mongoose.connect(mongouri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isSukses = true;
        return Promise.resolve(isSukses);
    } catch (err) {
        logger.error(err);
        return Promise.reject(new Error(err));
    }
}

export default connectMongooseDb;
