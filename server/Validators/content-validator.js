const { z } = require("zod");

const feedbackSchema = z.object({
  rating: z
    .string({ required_error: "Rating must be between 1 and 5." })
    .min(1, { message: "Rating should be atleast 1." })
    .max(5, { message: "Rating should be less than 5." })
    .transform((val) => Number(val)),
  content: z
    .string({ required_error: "Content cannot be empty." })
    .min(5, { message: "Content must be of atleast 5 characters." }),
});

const courseSchema = z.object({
  title: z
    .string({ required_error: "Course title is required." })
    .trim()
    .min(5, {
      message: "Course title must be of atleast 5 characters",
    }),
  fee: z
    .number({ required_error: "Course fee is required." })
    .min(1)
    .max(100000, "Fee cannot exceed 1 lakh."),
  duration: z
    .string({ required_error: "Course duration is required." })
    .trim()
    .min(5, { message: "Course duration must be of minimum of 5 characters." }),
});

// Brochure Schema
const fileSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .trim()
    .min(5, { message: "Title must be of atleast 5 characters." }),
});

const brochureSchema = z.object({
  imageUrl: z
    .string({ required_error: "Image link is required." })
    .url("Invalid URL format. Please provide a valid image link."),
  publicId: z
    .string({ required_error: "Public Id is required." })
    .trim()
    .min(5, "Public ID must be at least 5 characters long."),
});

// Report Schema
const reportSchema = fileSchema.extend({
  pdfLink: z
    .string({ required_error: "PDF link is required." })
    .url("Invalid URL format. Please provide a valid image link."),
  publicId: z
    .string()
    .trim()
    .min(5, "Public ID must be at least 5 characters long."),
});

const paymentssSchema = z.object({
  imageUrl: z
    .string({ required_error: "Image link is required." })
    .url("Invalid URL format. Please provide a valid image link."),
  courseId: z
    .string({ required_error: "CourseId is required." })
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Course ID format."),
});

const syllabusSchema = z.object({
  pdfLink: z
    .string({ required_error: "PDF link is required." })
    .url("Invalid URL format. Please provide a valid pdf link."),
  publicId: z
    .string()
    .trim()
    .min(5, "Public ID must be at least 5 characters long."),
});

module.exports = {
  feedbackSchema,
  courseSchema,
  brochureSchema,
  reportSchema,
  paymentssSchema,
  syllabusSchema,
};
