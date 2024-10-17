import connection from '../config/connectDB';
import db from '../models/index';
import Exam from '../models/exam';
import Students from '../models/students';
import ExamQuestions from '../models/examquestions'

let getExamManagement = (req, res) => {
    return res.render('exam');
};
let getStudentManagement = (req, res) => {
    return res.render('qlsv');
};
let getThongke = (req,res) => {
    return res.render('thongke');
};
let getexampleThongKe = (req, res) => {
    return res.render('exampleThongKe');
};
let getExampleResults = (req,res) => {
    return res.render('exampleResults');
};
let getExamResults = (req, res) => {
    return res.render('examResults');
};
let getExamQuestionsPaper = (req, res) => {
    return res.render('examQuestions');
};
const checkNameExamExist = async (nameExam) => {
    let name = await db.Exam.findOne({
        where: { nameExam: nameExam }
    });
    if (name) {
        return true;
    }
    return false;
}
let addExam = async (req, res) => {
    try {
        const data = req.body;
        const nameExam = data.nameExam;
        const duration = data.duration;
        const date = data.date;
        const questions = data.questions;
        let attempts = Math.floor(Math.random() * 100);
        const href = `examQuestions/${nameExam}`;
        let isTimeBound = 0;
        let isNameExamExist = await checkNameExamExist(nameExam);
        if (isNameExamExist) {
            return res.status(404).json({ status: 409, message: 'Tên kì thi đã tồn tại!' });
        }
        let exam;
        if (date != "null") {
            isTimeBound = 1;
            attempts = 0;
            exam = await db.Exam.create({ nameExam, duration, attempts, questions, date, href, isTimeBound });
        }
        else {
            exam = await db.Exam.create({ nameExam, duration, attempts, questions, href, isTimeBound });
        }
        return res.status(200).json({ status: 200, message: 'Thêm kỳ thi thành công! Vui lòng thêm câu hỏi!',data: exam });
    } catch (e) {
        return res.status(500).json({ status: 500, message: 'Đã có lỗi xảy ra khi tạo mới kì thi!' });
    }
};

let deleteExam = async (req, res) => {
    const deleteNameExam = req.body.nameExamDelete;
    console.log(deleteNameExam);
    try {
        const deleteNameExam = req.body.nameExamDelete;
        console.log(deleteNameExam);
        let isNameExamDeleteExist = await checkNameExamExist(deleteNameExam);
        const exam = await db.Exam.findOne({
            where: {
                nameExam: deleteNameExam
            }
        });
        await db.Exam.destroy({
            where: {
                nameExam: deleteNameExam // Condition to delete user by id
            }
        });
        await db.ExamQuestions.destroy({
            where: {
                examId: exam.id
            }
        });
        if (isNameExamDeleteExist) {
            res.status(200).json({ message: 'Xóa kỳ thi thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy kỳ thi để xóa' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa kỳ thi' });
    }
}

let addExamQuestions = async (req,res) =>{
    console.log(req.body);
    
    try {
        const maxId = await db.Exam.max('id');
        const questionData = req.body;
        const questions = Array.isArray(questionData) ?
            await db.ExamQuestions.bulkCreate(questionData.map(question => ({
                examId: maxId,
                questionCount: question.questionCount,
                questionText: question.questionText,
                answerA: question.answerA,
                answerB: question.answerB,
                answerC: question.answerC,
                answerD: question.answerD,
                correctAnswer: question.correctAnswer
            }))) :
            await db.ExamQuestions.create({
                examId: maxId,
                questionCount: questionData.questionCount,
                questionText: questionData.questionText,
                answerA: questionData.answerA,
                answerB: questionData.answerB,
                answerC: questionData.answerC,
                answerD: questionData.answerD,
                correctAnswer: questionData.correctAnswer
            });

        res.status(200).json({message: 'Thêm câu hỏi thành công!', data:questions});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

let getExamQuestions = async(req,res) => {
    try{
        const nameExam = req.params.nameExam;
        const exam = await db.Exam.findOne({ where: { nameExam: nameExam } });
        if (!exam) {
            return res.status(404).json('Không tìm thấy đề thi!');
        }
        const examID = exam.id;
        const questions = await db.ExamQuestions.findAll({
            where: { examId: examID },
            attributes: ['examId','questionCount','questionText', 'answerA', 'answerB', 'answerC', 'answerD', 'correctAnswer'] });
        res.status(200).json({ message: 'Lấy câu hỏi thành công!', data: questions });
    }catch(error){
        console.error('Lỗi khi tìm câu hỏi của bài thi:', error);
        res.status(500).json('Đã xảy ra lỗi');
    }
}



let getStudents = async (req,res) => {
    try {
        const students = await db.Students.findAll();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students data:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin sinh viên' });
    }
}
let searchStudents = async (req,res) => {
    try {
        const name = req.body.name;
        console.log(name);
        const students = await db.Students.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { MSV: name },
                    { Ten: name }
                ]
            }
        });
        // console.log(students);
        if (students.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên nào phù hợp với điều kiện tìm kiếm.' });
        }
        res.json(students);
    } catch (error) {
        console.error('Error searching students:', error);
        res.status(500).json({ error: 'Lỗi khi tìm kiếm sinh viên' });
    }
}

let deleteStudent = async (req,res) => {
    const idStudent = req.params.MSV;
    console.log(idStudent);
    try{
        const student = await db.Students.findOne({
            where: {
                MSV: idStudent // Condition to delete user by id
            }
        });
        console.log(student);
        if(!student){
            return res.status(404).json({ error: 'Không tìm thấy sinh viên' });
        }
        await db.Students.destroy({
            where: {
                MSV: idStudent // Condition to delete user by id
            }
        });
        return res.status(200).json({ message: 'Đã xóa sinh viên thành công' , data: student});
    } catch(error){
        console.error('Lỗi khi xóa sinh viên:', error);
        return res.status(500).json({ error: 'Lỗi khi xóa sinh viên' });
    }
}

let addStudent = async (req,res) => {
    const MSV = req.body.MSV;
    const Ten = req.body.Ten;
    const NgaySinh = req.body.NgaySinh;
    const Lop = req.body.Lop;
    const DiaChi = req.body.DiaChi;
    let student;
    try{
        const ok = await db.Students.findOne({
            where: {
                MSV: MSV
            }
        });
        if (ok) {
            return res.status(404).json({ message: 'Sinh viên đã tồn tại' });
        }
        student = await db.Students.create({ MSV, Ten, NgaySinh, Lop, DiaChi});
        console.log(student);
        return res.status(200).json({ status: 200, message: 'Thêm sinh viên thành công!', data: student });
    }catch(error){
        console.error('Lỗi khi thêm sinh viên:', error);
        return res.status(500).json({ error: 'Lỗi khi thêm sinh viên' });
    }
}

let updateStudent = async (req,res) => {
    const MSV = req.body.MSV;
    const Ten = req.body.Ten;
    const NgaySinh = req.body.NgaySinh;
    const Lop = req.body.Lop;
    const DiaChi = req.body.DiaChi;
    // console.log(1);
    // console.log(MSV);
    const student = { MSV, Ten, NgaySinh, Lop, DiaChi };
    try {
        const result = await db.Students.update({MSV,Ten,NgaySinh,Lop,DiaChi}, {
            where: { MSV: MSV } 
        });
        console.log(result);
        return res.status(200).json({ status: 200, message: 'Cập nhật sinh viên thành công!', data: student });
    } catch (error) {
        console.error('Lỗi khi cập nhật sinh viên:', error);
        return res.status(500).json({ error: 'Lỗi khi cập nhật sinh viên' });
    }
}

module.exports = {
    getExamManagement, getStudentManagement, getExamResults,getThongke, getExampleResults, getexampleThongKe, getExamQuestionsPaper,
    addExam, deleteExam, addExamQuestions, getExamQuestions,
    getStudents, searchStudents, deleteStudent, addStudent, updateStudent
}