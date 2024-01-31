const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const fieldsErrors = {};
        
        errors.array().map(error => {
            fieldsErrors[error.path] = { field: error.path, msg: error.msg };
        });

        return res.status(401).json({ status: 'error', errors: fieldsErrors });
    }

    next();
}

module.exports = { validateFields };