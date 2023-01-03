import patientService from "../services/patientService";
let postBookAppointment = async (req, res) => {
  try {
    let patient = await patientService.postBookAppointment(req.body);
    res.status(200).json({
      patient,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let postVerifyBookApointment = async (req, res) => {
  try {
    let patient = await patientService.postTokenService(req.body);
    res.status(200).json({
      patient,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookApointment: postVerifyBookApointment,
};
