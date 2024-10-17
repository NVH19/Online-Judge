import connection from '../config/connectDB';
import User from '../models/user';
import Admin from '../models/admin';
import db from '../models/index';
import { where } from 'sequelize';
let getSinhVienSign = (req, res) => {
    return res.render('sinhVien_sign');
};

let getHomePage = (req, res) => {
    return res.render('homePage');
};

let getAdminPage = (req,res) => {
    return res.render('adminPage');
};

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    });
    if (user) {
        return true;
    }
    return false;
}
const checkUserNameExist = async (userName) => {
    let user = await db.User.findOne({
        where: { username: userName }
    });
    if (user) {
        return true;
    }
    return false;
}
const checkPasswordExist = async (userPassword) => {
    let user = await db.User.findOne({
        where: { password: userPassword }
    });
    if (user) {
        return true;
    }
    return false;
}
let addUser = async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    console.log('username', req);
    try {

        // Kiểm tra xem username hoặc email đã tồn tại trong cơ sở dữ liệu chưa
        let isUserNameExist = await checkUserNameExist(username);
        let isEmailExist = await checkEmailExist(email);
        if (isEmailExist || isUserNameExist) {
            return res.status(409).json({ status: 409, message: 'Tên người dùng hoặc email đã tồn tại!' });
        }

        // Thêm người dùng mới vào cơ sở dữ liệu
        const newUser = await db.User.create({ username, email, password });
        return res.status(200).json({ status: 200, message: 'Người dùng đã được thêm mới thành công!', data: newUser });
    } catch (error) {
        console.error('Lỗi khi thêm người dùng:', error);
        return res.status(500).json({ status: 500, message: 'Đã có lỗi xảy ra khi thêm người dùng!' });
    }

};

let checkLogin = async (req,res) =>{
    const {username,password} = req.body;
    try{
        let isUserNameExist = await checkUserNameExist(username);
        let isPasswordExist = await checkPasswordExist(password);
        if (isPasswordExist && isUserNameExist) {
            return res.status(200).json({ status: 200, message: 'Đăng nhập thành công!' });
        }
        else{
            return res.status(409).json({status: 409, message: 'Tài khoản hoặc mật khẩu không chính xác!'});
        }
    }catch(error){
        console.error('Lỗi đăng nhập!', error);
        return res.status(500).json({ status: 500, message: 'Đã có lỗi xảy ra khi đăng nhập!' });
    }
};

const checkUserNameAdminExist = async (userName) => {
    let user = await db.Admin.findOne({
        where: { username: userName }
    });
    if (user) {
        return true;
    }
    return false;
}
const checkPasswordAdminExist = async (userPassword) => {
    let user = await db.Admin.findOne({
        where: { password: userPassword }
    });
    if (user) {
        return true;
    }
    return false;
}
let checkAdmin = async (req,res) =>{
    const { username, password } = req.body;
    try {
        let isUserNameExist = await checkUserNameAdminExist(username);
        let isPasswordExist = await checkPasswordAdminExist(password);
        if (isPasswordExist && isUserNameExist) {
            return res.status(200).json({ status: 200, message: 'Đăng nhập thành công!' });
        }
        else {
            return res.status(409).json({ status: 409, message: 'Tài khoản hoặc mật khẩu không chính xác!' });
        }
    } catch (error) {
        console.error('Lỗi đăng nhập!', error);
        return res.status(500).json({ status: 500, message: 'Đã có lỗi xảy ra khi đăng nhập!' });
    }
};

let getExam = (req,res) => {
    connection.query('SELECT * FROM exams', (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error.stack);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn dữ liệu' });
            return;
        }

        res.json(results);
    });
}

module.exports = {
    getSinhVienSign,
    getHomePage,
    getAdminPage,
    getExam,
    addUser,
    checkLogin,
    checkAdmin
};