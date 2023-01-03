const db = require("../models");

let postClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing the parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          image: data.imageBase64,
          address: data.address,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailDoctorClinicId = (inputId, localtion) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !localtion) {
        resolve({
          errCode: 1,
          errMessage: "Missing the parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let doctorSpecial = [];
          if (localtion === "ALL") {
            doctorSpecial = await db.Doctor_Infor.findAll({
              where: {
                clinicId: inputId,
              },
              attributes: ["doctorId", "provinceId"],
            });
            data.doctorSpecial = doctorSpecial;
          } else {
            doctorSpecial = await db.Doctor_Infor.findAll({
              where: {
                doctorId: inputId,
                provinceId: localtion,
              },
              attributes: ["doctorId", "provinceId"],
            });
            data.doctorSpecial = doctorSpecial;
          }
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "Save the appointment success!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postClinicService: postClinicService,
  getAllClinic: getAllClinic,
  getDetailDoctorClinicId: getDetailDoctorClinicId,
};
