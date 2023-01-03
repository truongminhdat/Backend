import { reject } from "lodash";
import db from "../models/index";
let createSpecialtiesService = (data) => {
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
        await db.Specialties.create({
          name: data.name,
          image: data.imageBase64,
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
let getAllSpecialties = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialties.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }

      // data.image = new Buffer(dataDoctor.image, "base64").toString("binary");
      // if (data && data.length > 0) {
      //   data.map((item) => {
      //     item.image = new Buffer(dataDoctor.image, "base64").toString(
      //       "binary"
      //     );
      //     return item;
      //   });
      // }
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
let getDetailDoctorSpecialById = (inputId, localtion) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !localtion) {
        resolve({
          errCode: 1,
          errMessage: "Missing the parameter",
        });
      } else {
        let data = await db.Specialties.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorSpecial = [];
          if (localtion === "ALL") {
            doctorSpecial = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
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
  createSpecialtiesService: createSpecialtiesService,
  getAllSpecialties: getAllSpecialties,
  getDetailDoctorSpecialById: getDetailDoctorSpecialById,
};
