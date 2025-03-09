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
const PaymentScreenshot = require("../models/paymentss-model");

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

const deleteRegistration = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Registration.deleteOne({ _id: id });
    res.status(200).json({ message: "Registration deleted successfully." });
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

const deleteFeedback = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Feedback.deleteOne({ _id: id });
    res.status(200).json({ message: "Feedback deleted successfully." });
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

// Fetching Screnshots
const fetchPaymentScreenshots = async (req, res, next) => {
  try {
    // const payments = await Registration.find();
    const payments = await PaymentScreenshot.find().populate(
      "registeredUser",
      "paymentStatus"
    );
    // console.log(payments);
    if (!payments) {
      return res
        .status(500)
        .json({ message: "Error while fetching payment screenshots." });
    }
    return res.status(200).json(payments);
  } catch (e) {
    next(e);
  }
};

// Uploading Payment Screenshot
const uploadPaymentScreenshot = async (req, res, next) => {
  try {
    const userID = req.userId;
    console.log("userId from controller: ", userID);
    const courseID = req.body.courseId;
    console.log("CourseId from controller: ", courseID);
    // const registeredUser = await Registration.findOne({ userId: userID });
    const registeredUser = await Registration.findOne({
      userId: userID,
      courseId: courseID,
    });
    console.log("Registered User: ", registeredUser);
    // Checking if the user currently logged in has registered or not
    if (!registeredUser) {
      // console.log("User is not registered.");
      return res
        .status(403)
        .json({ message: "Please register yourself first." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file provided for upload." });
    }
    // Uploading the file to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "payments", // cloudinary folder name
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
    const payment = await PaymentScreenshot.create({
      registeredUser: registeredUser._id,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
    console.log("Payment details: ", payment);
    if (!payment) {
      return res
        .status(500)
        .json({ message: "Failed to upload payment screenshot." });
    }
    res.status(201).json({ message: "Screenshot uploaded successfully." });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// Update Payment Status
const updatePaymentStatus = async (req, res, next) => {
  try {
    const paymentStatus = req.body;
    console.log("req.body: ", req.body);
    const paymentId = req.params.id;
    console.log("req.params: ", req.params.id);
    const payment = await PaymentScreenshot.findById(paymentId).populate(
      "registeredUser"
    );
    if (!payment) {
      res.status(404).json({ message: "Payment Not Found!" });
    }
    console.log("Payment: ", payment);
    const updatedRegistration = await Registration.findByIdAndUpdate(
      { _id: payment.registeredUser._id },
      { $set: paymentStatus },
      { new: true }
    );
    console.log("Updated registration: ", updatedRegistration);
    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registered user not found." });
    }
    res.status(200).json({
      message: "Payment Status updated successfully!",
      updatedRegistration,
    });
    const publicID = payment.publicId;
    const paymentDeleted = await cloudinary.uploader.destroy(publicID);
    await PaymentScreenshot.findByIdAndDelete(paymentId);
    if (!paymentDeleted) {
      res.status(500).json({ message: "Unable to delete payment screenshot." });
      console.log("Payment screenshot not deleted!");
    }
    console.log("Payment screenshot deleted!");
    return res.status(200).json({ message: "Payment screenshot deleted." });
  } catch (e) {
    next(e);
  }
};

// Deleting the payment screenshot
const deletePaymentScreenshot = async (id) => {
  try {
    const payment = await PaymentScreenshot.findById(id);
    const publicID = payment.publicId;
    await cloudinary.uploader.destroy(publicID);
    await PaymentScreenshot.findByIdAndDelete(id);
    // return res.status(200).json({ message: "Screenshot deleted successfully" });
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
    const brochure = await Brochure.findById(id);
    const publicID = brochure.publicId;
    await cloudinary.uploader.destroy(publicID);
    await Brochure.findByIdAndDelete(id);
    return res.status(200).json({ message: "Brochure deleted successfully" });
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
    // console.log("reports: ", reports);
    return res.status(200).json(reports);
  } catch (e) {
    next(e);
  }
};

// Uploading Report
const uploadReport = async (req, res, next) => {
  // console.log(req);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided for upload." });
    }
    // console.log("Req.file", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "reports", // cloudinary folder name
      resource_type: "raw", // setting the type of file as raw
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

// Deleting the report
const deleteReport = async (req, res, next) => {
  const { id } = req.params;
  try {
    const report = await Report.findById(id);
    const publicID = report.publicId;
    console.log(report, publicID);
    const res1 = await cloudinary.uploader.destroy(publicID);
    const res2 = await Report.findOneAndDelete({ _id: id });
    // if (!res1) {
    //   console.log("Could not delete the report from cloudinary.");
    // }
    return res.status(200).json({ message: "Report deleted successfully." });
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
      resource_type: "raw",
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

// Update Syllabus
const updateSyllabus = async (req, res, next) => {
  try {
    // if (!req.file) {
    //   return res.status(400).json({ message: "No file provided for upload." });
    // }
    // // console.log("Req.file", req.file);
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "syllabus", // cloudinary folder name
    // });
    // // console.log("Result", result);
    // if (!result.secure_url || !result.public_id) {
    //   return res.status(500).json({ message: "Cloudinary upload failed." });
    // }
    // try {
    //   fs.unlinkSync(req.file.path);
    //   console.log(req.file.path, "File deleted successfully.");
    // } catch (err) {
    //   console.error("Error deleting file:", err);
    // }
    // const syllabus = await Syllabus.create({
    //   pdfLink: result.secure_url,
    //   publicId: result.public_id,
    // });
    // if (!syllabus) {
    //   return res.status(500).json({ message: "Failed to upload syllabus." });
    // }
    // res.status(201).json({ message: "Syllabus uploaded successfully." });
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
  deleteRegistration,
  fetchFeedbacks,
  deleteFeedback,
  fetchContacts,
  deleteContacts,
  fetchPaymentScreenshots,
  uploadPaymentScreenshot,
  updatePaymentStatus,
  deletePaymentScreenshot,
  fetchBrochures,
  uploadBrochure,
  deleteBrochure,
  fetchReports,
  uploadReport,
  deleteReport,
  uploadSyllabus,
  fetchSyllabus,
};
