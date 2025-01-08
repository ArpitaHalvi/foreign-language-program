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
} = require("../controllers/admin-controller");
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// router.route("/admin").get(authMiddleware, adminMiddleware);
// User routes
router.route("/users").get(authMiddleware, adminMiddleware, fetchUsers);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUsers);

// Course routes
router.route("/courses").get(authMiddleware, adminMiddleware, fetchCourses);
router.route("/courses/:id").get(authMiddleware, adminMiddleware, fetchCourse);
router
  .route("/courses/update/:id")
  .patch(authMiddleware, adminMiddleware, editCourses);
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

module.exports = router;
