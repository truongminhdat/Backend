import express from "express";
import homeController from "../controllers/homeController";
// import loginController from "../controllers/admin/loginController"
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGETCRUD);
  router.get("/edit-crud", homeController.getEditCrud);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  // router.get('/admin',loginController.login),
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);
  //doctor
  router.get("/api/top-doctor", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctor", doctorController.getAllDoctor);
  router.post("/api/save-doctor-info", doctorController.postTopDoctor);
  router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctor);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-doctor-by-id",
    doctorController.getExtraDoctorById
  );
  router.get(
    "/api/get-doctor-profile-by-id",
    doctorController.doctorProfileById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  //patient
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-apointment",
    patientController.postVerifyBookApointment
  );

  //specialty
  router.post("/api/create-specialty", specialtyController.createSpecialties);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialties);
  router.get(
    "/api/get-detail-doctor-specialty-by-id",
    specialtyController.getDetailDoctorById
  );
  //clinic
  router.post("/api/create-clinic", clinicController.postClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-doctor-clinic-by-id",
    clinicController.getDetailClinicId
  );

  return app.use("/", router);
};
module.exports = initWebRoutes;
