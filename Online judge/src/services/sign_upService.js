import { where } from 'sequelize';
import db from '../models/index';
const checkEmailExist = async (userEmail)=> {
    let user = await db.User.findOne({
        where: {email: userEmail}
    });
    
    if(user){
        return true;
    }
    return false;
}
const checkUserNameExist = async (userName)=> {
    let user = await db.User.findOne({
        where: {username: userName}
    });
    
    if(user){
        return true;
    }
    return false;
}
const SignNewUser = async (UserData) => {
    try{
        let isUserNameExist = await checkUserNameExist(UserData.username);
        if(isUserNameExist === true){
            return {
                EM: 'Tên người dùng đã tồn tại',
                EC: 1
            }
        }
        let isEmailExist = await checkEmailExist(UserData.email);
        if(isEmailExist === true){
            return {
                EM: 'Email đã tồn tại',
                EC: 1
            }
        }
        if(UserData.username && UserData.email && UserData.password){
            await db.User.create({
                username: UserData.username,
                email: UserData.email,
                password: UserData.password
            });
        }
        return{
            EM: 'Đăng kí tài khoản mới thành công',
            EC: 0
        }
    }catch(e){
        return {
            EM: 'Lỗi đăng kí',
            EC: -1
        }
    }
}
module.exports = {
    SignNewUser
}