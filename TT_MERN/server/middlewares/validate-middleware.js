const validate = (schema) => () => async (req, res, next) => {
    try {
        // const parsedBody = await schema.parseAsync(req.body);
        const parsedBody = await schema.validateAsync(req.body);
        req.body = parsedBody;
        next();
    }
    catch (err) {
        const status = 422;
        const message = "File the input properly.";
        const extraDetails = err.errors[0].message;
        // res.status(400).send({msg: message});
        const error = {
            status, 
            message,
            extraDetails,
        };
        console.log(error);
        next(error); 
    }
}

export default validate;
