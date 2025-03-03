const { z } = require("zod");

// Creating an object schema
// Login Schema
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

// Sign Up Schema
const signUpSchema = loginSchema.extend({
  fullname: z
    .string({
      required_error: "Please enter your correct name.",
    })
    .trim()
    .min(5, {
      message: "Fullname should be of atleast than 5 characters.",
    })
    .max(255, { message: "Fullname should be less than 255 characters." }),
  phoneNumber: z
    .string({ required_error: "Please enter your phone number." })
    .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits.")
    .min(10, { message: "Phone number must be of atleast 10 digits." })
    .max(15, {
      message: "Phone number must be less than 15 digits.",
    }),
  gender: z.string({ required_error: "Please enter your gender." }).trim(),
  enrolledCourses: z.array(z.string()).optional(),
});

// Enrollment Schema
const enrollmentSchema = z.object({
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
  courseName: z
    .string({ message: "Please select a course title." })
    .trim()
    .min(5, {
      message: "Course title must be of atleast 5 characters",
    }),
});

// Contact Schema
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
    .min(10, { message: "Message should be of atleast 10 characters." })
    .max(255, { message: "Message should be less than 255 characters." }),
});

module.exports = {
  signUpSchema,
  loginSchema,
  enrollmentSchema,
  contactSchema,
};
