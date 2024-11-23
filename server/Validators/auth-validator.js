const { z } = require("zod");

// Creating an object schema
const signUpSchema = z.object({
  fullname: z
    .string({
      required_error:
        "Please enter you correct name as this is required for certificate.",
    })
    .trim()
    .min(5, {
      message: "Fullname should be of atleast than 5 characters.",
    })
    .max(255, { message: "Fullname should be less than 255 characters." }),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address." })
    .min(5, { message: "Email must be of at least 5 characters." })
    .max(255, { message: "Email should be less than 255 characters." }),
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(7, { message: "Username must be of at least 7 characters." })
    .max(255, { message: "Username should be less than 255 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(8, {
      message: "Password should be of atleast 8 characters and unique.",
    })
    .max(1024, { message: "Password should be less than 1024 characters." }),
  gender: z.string({ required_error: "Please enter your gender." }).trim(),
  courses: z.array(z.string()).optional(),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address." })
    .min(5, { message: "Email must be of at least 5 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(8, {
      message: "Password should be of atleast 8 characters and unique.",
    })
    .max(1024, { message: "Password should be less than 1024 characters." }),
});

const enrollmentSchema = z.object({
  userId: z.string().min(1, "User Id is required."),
  courseId: z.string().min(1, "Course Id is required."),
  paymentStatus: z.enum(["pending", "paid", "failed"], {
    required_error: "Payment status if required.",
  }),
  registrationDate: z.date().default(() => new date()), // Defaults to the current date if not provided,
  isCompleted: z.boolean().default(false), // Defaults to false if not provided
});

const contactSchema = z.object({
  fullname: z
    .string({ message: "Fullname is required." })
    .trim()
    .min(6, { message: "Fullname must be of atleast 6 characters." })
    .max(255, { message: "Fullname should be less than 255 chracters." }),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address." })
    .min(5, { message: "Email must be of at least 5 characters." })
    .max(255, { message: "Email should be less than 255 characters." }),
  message: z
    .string({ message: "Message is required." })
    .trim()
    .min(10, { message: "Message should be of atleast 10 chracters." })
    .max(255, { message: "Message should be less than 255 chracters." }),
});

module.exports = {
  signUpSchema,
  loginSchema,
  enrollmentSchema,
  contactSchema,
};
