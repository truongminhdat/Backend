import clinicService from "../services/clinicService";

let postClinic = async (req, res) => {
  try {
    let resClinic = await clinicService.postClinicService(req.body);
    res.status(200).json(resClinic);
  } catch (e) {
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the serve",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    let AllClinic = await clinicService.getAllClinic();
    res.status(200).json({
      AllClinic,
    });
  } catch (e) {
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the serve",
    });
  }
};
let getDetailClinicId = async (req, res) => {
  try {
    let id = req.query.id;
    let getAllSpecialties = await clinicService.getDetailDoctorClinicId(
      id,
      req.query.localtion
    );
    return res.status(200).json(getAllSpecialties);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  postClinic: postClinic,
  getAllClinic: getAllClinic,
  getDetailClinicId: getDetailClinicId,
};
