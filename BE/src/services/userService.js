import db from "../models/index";
import bcrypt from 'bcryptjs';
import emailService from './emailService';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
			let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch(e){
            reject(e);
        }
    })
}

let checkUser = (email) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userEmail = await db.User.findOne({
                where: { email: email }
            });
            if(userEmail){
                resolve(true)
            } else{
                resolve(false)
            }
        } catch(e){
            reject(e);
        }
    })
}

let checkOTP = (check) => {
    return new Promise(async(resolve, reject) => {
        try{
            let checkOTP = await db.OTP.findOne({
                where: { otp: check, status: 'Confirmed' }
            });
            if(checkOTP){
                resolve(true)
            } else{
                resolve(false)
            }
        } catch(e){
            reject(e);
        }
    })
}

let handleUserLogin = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let checkEmail = await checkUser(data.email);
            if(checkEmail){
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'nameLogin', 'password'],
                    where: { email: data.email },
                    raw: true
                });
                if(user){
                    let checkPass = await bcrypt.compareSync(data.password, user.password);
                    if(checkPass){ 
                        userData.errCode = 0;
                        userData.errMessage = 'Mật khẩu đúng';
                        delete user.password;
                        userData.user = user;
                    } else{
                        userData.errCode = -2;
                        userData.errMessage = 'Sai mật khẩu';
                    }
                }
            } else{
                userData.errCode = -1;
                userData.errMessage = 'Tài khoản không tồn tại!';
            }
            resolve(userData);
        } catch(e){
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let checkEmail = await checkUser(data.email);
            if(checkEmail === true){
                resolve({
                    errCode: -1,
                    errMessage: 'Tài khoản đã có, xin hãy dùng email khác'			
                })
            } else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({ 
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    nameLogin: data.name
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo tài khoản thành công'
                })
            }
        } catch(e){
            reject(e); 
        }
    })
}

let handleRecoveryPassword = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.OTP.create({ 
                emailRecovery: data.emailForget,
                otp: data.otp
            })
            await emailService.sendSimpleEmail({
                receiverEmail: data.emailForget,
                otp: data.otp
            })
            resolve({
                errCode: 0,
                errMessage: 'Lấy email và tạo mã otp thành công'
            })
        } catch(e){
            reject(e); 
        }
    })
}

let handleRecoveryPasswordSucccess = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};            
            let checkOTPFirst = await checkOTP(data.inputOtp);
            if(checkOTPFirst === false){
                let userRecovery = await db.OTP.findOne({
                    where: { otp: data.inputOtp, emailRecovery: data.emailCheck },
                    raw: true
                });
                if(userRecovery){
                    let hashPasswordFromBcrypt = await hashUserPassword(data.newPassword);
                    await db.OTP.update({ status: 'Confirmed' }, {
                        where: { otp: data.inputOtp }
                    });
                    await db.User.update({ password: hashPasswordFromBcrypt }, {
                        where: { email: data.emailCheck }
                    });
                    userData.errCode = 0;
                    userData.errMessage = 'Đổi mật khẩu thành công!';
                } else{
                    userData.errCode = -2;
                    userData.errMessage = 'Nhập mã OTP không đúng hoặc mã đã được dùng, xin hãy thử lại!';
                }
            } else{
                userData.errCode = -1;
                userData.errMessage = 'Mã OTP này đã được sử dụng, hãy thử lại!';
            }
            resolve(userData);
        } catch(e){
            reject(e); 
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    createNewUser: createNewUser,
    handleRecoveryPassword: handleRecoveryPassword,
    handleRecoveryPasswordSucccess: handleRecoveryPasswordSucccess
}

