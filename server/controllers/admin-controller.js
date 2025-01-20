const User = require("../models/user-model");
const Course = require("../models/course-model");
const Contact = require("../models/contact-model");
const Feedback = require("../models/feedback-model");
const Registration = require("../models/registration-model");
const Brochure = require("../models/brochure-model");
const Report = require("../models/report-model");
const cloudinary = require("../cloudinary/cloudinaryConfig");
const fs = require("fs");
const upload = require("../cloudinary/multer");
const { error } = require("console");
const Syllabus = require("../models/syllabus-model");

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

// Addin the courses
const addCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    if (course) {
      return res.status(200).json({ message: "Course Added!" });
    }
    return res.status(400).json({ message: "Error while adding course." });
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
      .populate("courseId", "title")
      .populate("userId", "fullname , email");
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

// Uploading brochure
const fetchBrochures = async (req, res, next) => {
  try {
    const brochures = await Brochure.find();
    if (!brochures) {
      return res
        .status(500)
        .json({ message: "Error while fetching brochures." });
    }
    return res.status(200).json(brochures);
  } catch (e) {
    next(e);
  }
};

// Uploading brochure
const uploadBrochure = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided for upload." });
    }
    // Uploading the file to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "brochures", // cloudinary folder name
    });
    // Checking if cloudinary returned a valid result
    if (!result.secure_url || !result.public_id) {
      return res.status(500).json({ message: "Cloudinary upload failed." });
    }
    // Deleting the file from the local server after successfully uploading the file to cloudinary
    try {
      fs.unlinkSync(req.file.path);
      console.log(req.file.path, "File deleted successfully.");
    } catch (err) {
      console.error("Error deleting file:", err);
    }
    // Saving the file details in the database
    const brochure = await Brochure.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
    if (!brochure) {
      return res.status(500).json({ message: "Failed to upload brochure." });
    }
    res.status(201).json({ message: "Brochure uploaded successfully." });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteBrochure = async (req, res, next) => {
  const { id } = req.params;
  try {
    try {
      const brochure = await Brochure.findById(id);
      const publicID = brochure.publicId;
      await cloudinary.uploader.destroy(publicID);
      await Brochure.findByIdAndDelete(id);
      res.status(200).json({ message: "Brochure deleted successfully" });
    } catch (error) {
      console.error("Error deleting brochure:", error);
      res.status(500).json({ message: "Failed to delete brochure" });
    }
  } catch (e) {
    next(e);
  }
};

// Fetch reports
const fetchReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    if (!reports) {
      return res.status(500).json({ message: "Error while fetching reports." });
    }
    console.log("reports: ", reports);
    return res.status(200).json(reports);
  } catch (e) {
    next(e);
  }
};

// Uploading Report
const uploadReport = async (req, res, next) => {
  console.log(req);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided for upload." });
    }
    console.log("Req.file", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "reports", // cloudinary folder name
    });
    console.log("Result", result);
    if (!result.secure_url || !result.public_id) {
      return res.status(500).json({ message: "Cloudinary upload failed." });
    }
    try {
      fs.unlinkSync(req.file.path);
      console.log(req.file.path, "File deleted successfully.");
    } catch (err) {
      console.error("Error deleting file:", err);
    }
    const report = await Report.create({
      title: req.body.title,
      pdfLink: result.secure_url,
      publicId: result.public_id,
    });
    if (!report) {
      return res.status(500).json({ message: "Failed to upload report." });
    }
    res.status(201).json({ message: "Report uploaded successfully." });
  } catch (e) {
    next(e);
  }
};

// Syllabus
const uploadSyllabus = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided for upload." });
    }
    // console.log("Req.file", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "syllabus", // cloudinary folder name
    });
    // console.log("Result", result);
    if (!result.secure_url || !result.public_id) {
      return res.status(500).json({ message: "Cloudinary upload failed." });
    }
    try {
      fs.unlinkSync(req.file.path);
      console.log(req.file.path, "File deleted successfully.");
    } catch (err) {
      console.error("Error deleting file:", err);
    }
    const syllabus = await Syllabus.create({
      pdfLink: result.secure_url,
      publicId: result.public_id,
    });
    if (!syllabus) {
      return res.status(500).json({ message: "Failed to upload syllabus." });
    }
    res.status(201).json({ message: "Syllabus uploaded successfully." });
  } catch (e) {
    next(e);
  }
};

// Fetching syllabus
const fetchSyllabus = async (req, res, next) => {
  try {
    const syllabus = await Syllabus.find();
    if (!syllabus) {
      return res
        .status(500)
        .json({ message: "Error while fetching Syllabus." });
    }
    return res.status(200).json(syllabus);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  fetchUsers,
  deleteUsers,
  fetchCourses,
  addCourse,
  fetchCourse,
  editCourses,
  deleteCourses,
  fetchRegistrations,
  fetchFeedbacks,
  fetchContacts,
  deleteContacts,
  fetchBrochures,
  uploadBrochure,
  deleteBrochure,
  fetchReports,
  uploadReport,
  uploadSyllabus,
  fetchSyllabus,
};
