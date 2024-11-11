// await schema.parseAsync(req.body) is the line where you use zod to validate the request body data against the defines schema.
// Given any zod schema, you can call its .parse() method to check 'data' is valid. If it is, a value is returned with full type information! Otherwise, an error is thrown.
// .parseAsync(data:unknown):Promise<T>

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (e) {
        // status code 422 - server is unable to process the request because of invalid data.
        const status = 422;
        const message = "Fill the form correctly";
        const extraDetails = e.errors[0].message;
        const error = { status, message, extraDetails };
        console.log(error);
        // res.status(400).json({ msg: message });
        next(error);
    }
}

module.exports = {
    validate
}