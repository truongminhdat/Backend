import { reject } from "lodash";
import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config;
import { v4 as uuidv4 } from "uuid";
let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.date || !data.timeType || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing the parameter",
        });
      } else {
        let token = uuidv4();
        await emailService.simpleEmail({
          reciverEmail: data.email,
          patientName: data.firstName + data.lastName,
          time: data.timeString,
          doctorName: data.nameDoctor,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });

        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,

            roleId: "R3",
          },
          raw: true,
        });
        if (user && user[0]) {
          await db.Booking.create({
            where: {
              patientId: user[0].id,
            },
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user[0].id,
            timeType: data.timeType,
            date: data.date,
            token: token,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save info patient succeed !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postTokenService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing the parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment success!",
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Save the appointment success!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postTokenService: postTokenService,
};
