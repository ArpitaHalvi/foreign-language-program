const express = require("express");
const router = express.Router();
const {
  fetchUsers,
  deleteUsers,
  fetchRegistrations,
  fetchCourses,
  fetchFeedbacks,
  fetchContacts,
  editCourses,
  fetchCourse,
  deleteCourses,
  deleteContacts,
  addCourse,
  fetchBrochures,
  uploadBrochure,
  fetchReports,
  uploadReport,
  deleteBrochure,
  uploadSyllabus,
  fetchSyllabus,
} = require("../controllers/admin-controller");
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const {
  courseSchema,
  brochureSchema,
  reportSchema,
} = require("../Validators/content-validator");
const { validate } = require("../middlewares/validate-middleware");
const upload = require("../cloudinary/multer");

// User routes
router.route("/users").get(authMiddleware, adminMiddleware, fetchUsers);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUsers);

// Course routes
router.route("/courses").get(authMiddleware, adminMiddleware, fetchCourses);
router.route("/courses/:id").get(authMiddleware, adminMiddleware, fetchCourse);
router
  .route("/courses/add")
  .post(authMiddleware, adminMiddleware, validate(courseSchema), addCourse);
router
  .route("/courses/update/:id")
  .patch(authMiddleware, adminMiddleware, validate(courseSchema), editCourses);
router
  .route("/courses/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteCourses);

// Registration Routes
router
  .route("/registrations")
  .get(authMiddleware, adminMiddleware, fetchRegistrations);

// Feedback Routes
router.route("/feedbacks").get(authMiddleware, adminMiddleware, fetchFeedbacks);

// Contact Routes
router.route("/contacts").get(authMiddleware, adminMiddleware, fetchContacts);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContacts);

// Brochure Routes
router.route("/brochures").get(authMiddleware, fetchBrochures);
router.route("/brochure").post(
  authMiddleware,
  adminMiddleware,
  upload.single("file"),
  (req, res, next) => {
    // Adding the file data to req.body for validation
    if (req.file) {
      req.body.imageUrl = req.file.path; // Set imageUrl from uploaded file
      req.body.publicId = req.file.filename; // Or use Cloudinary's publicId if available
    }
    next();
  },
  validate(brochureSchema),
  uploadBrochure
);
router
  .route("/brochure/:id/delete")
  .delete(authMiddleware, adminMiddleware, deleteBrochure);

//Report Routes
router.route("/reports").get(authMiddleware, fetchReports);
router.route("/report").post(
  authMiddleware,
  adminMiddleware,
  upload.single("file"),
  (req, res, next) => {
    // Adding the file data to req.body for validation
    console.log("Req.file: ", req.file);
    if (req.file) {
      req.body.pdfLink = req.file.path; // Set imageUrl from uploaded file
      req.body.publicId = req.file.filename; // Or use Cloudinary's publicId if available
    }
    next();
  },
  validate(reportSchema),
  uploadReport
);

router.route("syllabus").get(authMiddleware, fetchSyllabus);
router.route("syllabus").post(
  authMiddleware,
  adminMiddleware,
  upload.single("file"),
  (req, res, next) => {
    // Adding the file data to req.body for validation
    console.log("Req.file: ", req.file);
    if (req.file) {
      req.body.pdfLink = req.file.path; // Set imageUrl from uploaded file
      req.body.publicId = req.file.filename; // Or use Cloudinary's publicId if available
    }
    next();
  },
  validate(reportSchema),
  uploadSyllabus
);

module.exports = router;
