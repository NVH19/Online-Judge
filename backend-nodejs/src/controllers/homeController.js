import connection from '../config/connectDB';
import db from '../models/index';
let getHome = (req,res) =>{
    // Viết logic
    let data = [];
    connection.query(
        'SELECT * FROM login',
        function(err, results, fields){
            data = results;
            return res.render('home', {dataUsers: JSON.stringify(data)});
        }
    );
    
}

let getSinhVienLog = (req,res) =>{
    return res.render('sinhVien_log');
};
let getGiangVienLog = (req,res) =>{
    return res.render('giangVien_log');
};

let getExamPage = (req,res) =>{
    return res.render('examPaper');
};

let searchExam = async (req,res) =>{
    try {
        const nameExam = req.query.nameExam;
        console.log(nameExam);
        let exam = await db.Exam.findOne({ where: { nameExam: nameExam } });
        console.log(exam);
        if (exam) {
            res.status(200).json({status:200, message: 'Tìm kiếm thành công!', data:exam.toJSON()});
        } else {
            res.status(409).json({status:409, message: 'Không tìm thấy kì thi!'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Đã có lỗi xảy ra khi tìm kiếm kì thi!' });
    }
};
module.exports = {
    getHome,
    getSinhVienLog,
    getGiangVienLog,
    getExamPage,
    searchExam
}