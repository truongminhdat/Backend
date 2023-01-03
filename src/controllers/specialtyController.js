import specialtiesService from "../services/specialtiesService";
let createSpecialties = async (req, res) => {
  try {
    let info = await specialtiesService.createSpecialtiesService(req.body);
    res.status(200).json(info);
  } catch (e) {
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllSpecialties = async (req, res) => {
  try {
    let getAllSpecialties = await specialtiesService.getAllSpecialties();
    return res.status(200).json(getAllSpecialties);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let id = req.query.id;
    let getAllSpecialties = await specialtiesService.getDetailDoctorSpecialById(
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
  createSpecialties: createSpecialties,
  getAllSpecialties: getAllSpecialties,
  getDetailDoctorById: getDetailDoctorById,
};
