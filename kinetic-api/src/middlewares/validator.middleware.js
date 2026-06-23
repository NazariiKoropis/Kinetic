const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {

        const formattedErrors = result.error.issues.map(err => ({
            field: err.path[0] || 'unknown',
            message: err.message
        }));

        return res.status(400).json({
            status: 'fail',
            errors: formattedErrors
        });
    }

    req.body = result.data;
    next();
};

const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {

        const formattedErrors = result.error.issues.map(err => ({
            field: err.path[0] || 'unknown',
            message: err.message
        }));

        return res.status(400).json({
            status: 'fail',
            errors: formattedErrors
        });
    }

    req.validatedQuery = result.data;
    next();
}

export { validateBody, validateQuery };

