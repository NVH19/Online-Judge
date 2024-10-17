import express from "express";
import homeController from "../controllers/homeController";
import loginController from "../controllers/loginController";
import homePageController from "../controllers/homePageController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHome);
    router.get('/sinhVien_log', homeController.getSinhVienLog);
    router.get('/giangVien_log', homeController.getGiangVienLog);
    router.get('/sinhVien_sign', loginController.getSinhVienSign);
    router.get('/adminPage', loginController.getAdminPage);
    router.get('/getExam', loginController.getExam);
    router.get('/examPaper', homeController.getExamPage);
    router.get('/searchExam', homeController.searchExam);

    router.post('/addUser',loginController.addUser);
    router.post('/checkLogin', loginController.checkLogin);
    router.post('/checkAdmin', loginController.checkAdmin);
    router.get('/homePage', loginController.getHomePage);
    router.get('/home',homePageController.getHome);

    return app.use("/",router);
}

module.exports = initWebRoutes;