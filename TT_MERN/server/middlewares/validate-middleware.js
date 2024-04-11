const validate = (schema) => () => async (req, res, next) => {
    try {
        // const parsedBody = await schema.parseAsync(req.body);
        const parsedBody = await schema.validateAsync(req.body);
        req.body = parsedBody;
        next();
    }
    catch (err) {
        const message = err.errors[0].message;
        console.log(message);
        res.status(400).send({msg: message}); 
    }
}

export default validate;
