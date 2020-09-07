// DOKUMENTASI VALIDATOR
// https://express-validator.github.io/docs/
// https://github.com/validatorjs/validator.js#validators
import { check, query, validationResult } from 'express-validator';

// Cek parameter query "paramA" apakah bilangan atau tidak
// Cek paramter query "paramB" apakah string dan sanitasikan
const validateVariableReq = [
    check('paramA')
        .trim()
        .notEmpty({ checkFalsy: true, nullable: false })
        .withMessage('Variabel A tidak boleh kosong')
        .isLength({ min: 1 })
        .withMessage('Variabel A minimal 1 karakter')
        .isNumeric({ no_symbols: true })
        .withMessage('Bilangan harus berbentuk angka'),
    query('stringB')
        .trim()
        .notEmpty({ checkFalsy: true, nullable: false })
        .withMessage('Variabel B tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('Masukkan parameter String B minimal 3 karakter')
        .escape(),
];

// Cek parameter C apakah string atau tidak dengan Promise async await
const validateRuntimeExample = async (req) => {
    const resultreq = await query('paramC')
        .trim()
        .notEmpty({ checkFalsy: true, nullable: false })
        .withMessage('Variabel C tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('Variabel C minimal 3 karakter')
        .escape()
        .run(req);

    return new Promise((resolve) => {
        const objectResult = JSON.parse(JSON.stringify(resultreq));
        resolve(objectResult);
    });
};

const validateResultRequest = (req) => {
    const errorsResult = validationResult(req);
    return errorsResult;
};

export { validateVariableReq, validateResultRequest, validateRuntimeExample };
