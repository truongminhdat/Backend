import db from "../models/index";
import doctorService from "../services/doctorService";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};
let getAllDoctor = async (req, res) => {
  try {
    let getdoctor = await doctorService.getAllDoctorService();
    return res.status(200).json(getdoctor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postTopDoctor = async (req, res) => {
  try {
    let response = await doctorService.postTopDoctorService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailDoctor = async (req, res) => {
  try {
    let getDetailDoctorId = await doctorService.getDetailDoctorIdService(
      req.query.id
    );
    return res.status(200).json(getDetailDoctorId);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let getBulkCreate = await doctorService.bulkCreateScheduleService(req.body);
    return res.status(200).json(getBulkCreate);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let getByDate = await doctorService.getScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(getByDate);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getExtraDoctorById = async (req, res) => {
  try {
    let getByDate = await doctorService.getExtraDoctorInfoById(
      req.query.doctorId
    );
    return res.status(200).json(getByDate);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let doctorProfileById = async (req, res) => {
  try {
    let getDoctorProfile = await doctorService.getDoctorProfileById(
      req.query.doctorId
    );
    return res.status(200).json(getDoctorProfile);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getListPatientForDoctor = async (req, res) => {
  try {
    let resListPatient = await doctorService.getListPatient(
      req.query.doctorId,
      req.query.date
    );
    res.status(200).json(resListPatient);
  } catch (e) {
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let sendRemedy = async (req, res) => {
  try {
    let info = await doctorService.sendRemedy(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  postTopDoctor: postTopDoctor,
  getDetailDoctor: getDetailDoctor,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraDoctorById: getExtraDoctorById,
  doctorProfileById: doctorProfileById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
};
