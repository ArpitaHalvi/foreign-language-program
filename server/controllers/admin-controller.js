const User = require("../models/user-model");
const Course = require("../models/course-model");
const Contact = require("../models/contact-model");
const Feedback = require("../models/feedback-model");
const Registration = require("../models/registration-model");

// FETCHING THE RECORDS FOR THE PARTCULAR COLLECTIONS
const fetchUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).populate(
      "enrolledCourses"
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found." });
    }
    // console.log(users);
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

// Deleting user
const deleteUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (e) {
    next(e);
  }
};

const fetchCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("enrolledUsers");
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No Courses Found." });
    }
    // console.log(courses);
    return res.status(200).json(courses);
  } catch (e) {
    next(e);
  }
};

//Fetch a course by id
const fetchCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: id });
    if (course) {
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ message: "Course does not exist." });
    }
  } catch (e) {
    next(e);
  }
};

// Updating the courses
const editCourses = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updatedCourse = await Course.updateOne(
      { _id: id },
      { $set: newData }
    );
    if (updatedCourse) {
      return res.status(200).json(updatedCourse);
    }
  } catch (e) {
    next(e);
  }
};

// Deleting the courses
const deleteCourses = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Course.deleteOne({ _id: id });
    res.status(200).json({ message: "Course Deleted successfully." });
  } catch (e) {
    next(e);
  }
};

const fetchRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find()
      .populate("userId", "fullname , email")
      .populate("courseId", "title");
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ message: "No Registrations Found." });
    }
    // console.log("Registrations: ", registrations);
    return res.status(200).json(registrations);
  } catch (e) {
    next(e);
  }
};
const fetchFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("courseId")
      .populate("userId");
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: "No Feedbacks Found." });
    }
    // console.log(feedbacks);
    return res.status(200).json(feedbacks);
  } catch (e) {
    next(e);
  }
};
const fetchContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found." });
    }
    // console.log(contacts);
    return res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

// Deleting the contacts
const deleteContacts = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  fetchUsers,
  deleteUsers,
  fetchCourses,
  fetchCourse,
  editCourses,
  deleteCourses,
  fetchRegistrations,
  fetchFeedbacks,
  fetchContacts,
  deleteContacts,
};
