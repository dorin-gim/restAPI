const validator = (schema) => {
    return (req, res, next) => {
        try {
             //1. validate the request body
            const {error} = schema.validateAsync(req.body)
            if(error) return res.status(400).send(error.details[0].message);
            next();
            // Use the 'param' variable here
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
};

module.exports = validator;