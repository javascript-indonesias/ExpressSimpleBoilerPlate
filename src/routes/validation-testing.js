import express from 'express';
import {
    validateResultRequest,
    validateVariableReq,
    validateRuntimeExample,
} from '../services/validation-service';

async function tesValidasiController(req, res) {
    const arrayResultValidate = validateResultRequest(req);
    if (arrayResultValidate.errors.length > 0) {
        // terdapat error dari data yang dikirim
        res.status(400).json({
            status: false,
            message: 'Ditemukan kesalahan dalam menerima data',
            errors: arrayResultValidate.errors,
        });
    } else {
        const { paramA, stringB, paramC } = req.query;
        // Parameter C akan di validasi dengan runtime validation
        const resultObjValidate = await validateRuntimeExample(req);

        const errorValidate = resultObjValidate.errors;
        if (errorValidate.length === 0) {
            res.status(200).json({
                status: true,
                message: 'Sukses menerima parameter',
                data: { paramA, stringB, paramC },
            });
        } else {
            // terdapat error dari paramC yang dikirim
            res.status(400).json({
                status: false,
                message: 'Ditemukan kesalahan dalam menerima data',
                errors: errorValidate,
            });
        }
    }
}

function getValidasiTesRoutes() {
    const router = express.Router();
    router.get('/tesvalidasi', validateVariableReq, tesValidasiController);
    // localhost:3200/tesvalidasi?paramA=8&stringB=apasajateksnya&paramC=7
    return router;
}

export default getValidasiTesRoutes;
