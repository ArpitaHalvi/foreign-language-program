const { z } = require("zod");

// Creating an object schema
const signUpSchema = z.object({
    username: z.string({ required_error: "Username is required." }).trim().min(7, { message: "Username must be of at least 7 characters." }).max(255, { message: "Username should be less than 255 characters." }),
    email: z.string({ required_error: "Email is required." }).trim().email({ message: "Invalid email address." }).min(5, { message: "Email must be of at least 5 characters." }).max(255, { message: "Email should be less than 255 characters." }),
    fullname: z.string().trim().min(5, { message: "Fullname must be of at least 5 characters." }).max(255, { message: "Fullname should be less than 255 characters." }),
    password: z.string({ required_error: "Password is required." }).trim().min(8, { message: "Password should be of atleast 8 characters and unique." }).max(1024, { message: "Password should be less than 1024 characters." }),
    courses: z.array(),
})

const loginSchema = z.object({
    email: z.string({ required_error: "Email is required." }).trim().email({ message: "Invalid email address." }).min(5, { message: "Emaail must be of at least 5 characters." }),
    password: z.string({ required_error: "Password is required." }).trim().min(8, { message: "Password should be of atleast 8 characters and unique." }).max(1024, { message: "Password should be less than 1024 characters." }),
})

const contactSchema = z.object({
    fullname: z.string({ message: "Fullname is required." }).trim().min(6, { message: "Fullname must be of atleast 6 characters." }).max(255, { message: "Fullname should be less than 255 chracters." }),
    email: z.string({ required_error: "Email is required." }).trim().email({ message: "Invalid email address." }).min(5, { message: "Email must be of at least 5 characters." }).max(255, { message: "Email should be less than 255 characters." }),
    message: z.string({message: "Message is required."}).trim().min(10,{message: "Message should be of atleast 10 chracters."}).max(255,{message: "Message should be less than 255 chracters."})
})

module.exports = {
    signUpSchema,
    loginSchema,
    contactSchema
}