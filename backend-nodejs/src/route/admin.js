import express from "express";
import adminController from "../controllers/adminControllers";
let router = express.Router();

let adminRoutes = (app) =>{
    router.get('/exam', adminController.getExamManagement);
    router.get('/qlsv', adminController.getStudentManagement);
    router.get('/examQuestions/:nameExam', adminController.getExamQuestionsPaper)
    router.get('/students', adminController.getStudents);
    router.get('/thongke', adminController.getThongke);
    router.get('/exampleThongKe', adminController.getexampleThongKe);
    router.get('/exampleResults', adminController.getExampleResults);
    router.get('/examResults', adminController.getExamResults);
    router.get('/examPaper/:nameExam', adminController.getExamQuestions)
    
    router.post('/searchStudents', adminController.searchStudents);
    router.post('/addExam', adminController.addExam);
    router.post('/addExamQuestions', adminController.addExamQuestions);
    router.post('/deleteExam',adminController.deleteExam);
    router.post('/addStudent', adminController.addStudent);
    router.post('/updateStudent/:MSV', adminController.updateStudent);

    router.delete('/deleteStudent/:MSV', adminController.deleteStudent);
    return app.use("/", router);
}

module.exports = adminRoutes;