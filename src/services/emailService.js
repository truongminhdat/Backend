require("dotenv").config();

import nodemailer from "nodemailer";

let simpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booking care 👻" <foo@example.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: buildLanguage(dataSend),
  });
};
let buildLanguage = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được đặt lịch khám bệnh trên hệ thống Booking Care</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin tin trên đúng là sự thật, vui lòng xác nhận và hoàn tất thủ đặt lịch khám bệnh</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click me</a></div>
    <div>Xin chân thành cảm ơn</div>
    `; // html body`
  } else if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>Bạn nhận được đặt lịch khám bệnh trên hệ thống Booking Care</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin tin trên đúng là sự thật, vui lòng xác nhận và hoàn tất thủ đặt lịch khám bệnh</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click me</a></div>
    <div>Xin chân thành cảm ơn</div>
    `; // html body`
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào bạn</h3>
    <p>Bạn nhận được email này vì đã đặt lịch thành công tại Booking Care</p>
    <p>Thời gian là : ${dataSend.timeType} </p>
    <div>Xin chân thành cảm ơn</div>
    `; // html body`
  } else if (dataSend.language === "en") {
    result = `
    <h3>Hello you</h3>
    <p>
    You received this email because your booking was successful</p>
    <p>Prescription/invoice information is sent in the image file</p>
    <div>Thanh you</div>
    >
    `; // html body`
  }
  return result;
};
let sendEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booking care 👻" <foo@example.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmailRemedy(dataSend),
  });
};
module.exports = {
  simpleEmail: simpleEmail,
  sendEmail: sendEmail,
};
