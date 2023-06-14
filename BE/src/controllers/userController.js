import userService from '../services/userService';

let handleLogin = async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(300).json({
            errCode: -1,
            errMessage: 'Nhập thiếu dữ liệu!'
        })
    }
    let userData = await userService.handleUserLogin(req.body);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let recoveryPassword = async (req, res) => {
    if(!req.body.emailForget || !req.body.otp){
        return res.status(300).json({
            errCode: -1,
            errMessage: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await userService.handleRecoveryPassword(req.body);
    return res.status(200).json(data)
}

let recoveryPasswordSuccess = async (req, res) => {
    if(!req.body.inputOtp || !req.body.newPassword || !req.body.emailCheck){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let userData = await userService.handleRecoveryPasswordSucccess(req.body);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage
    })
}

let handleCreateNewUser = async (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.name){
        return res.status(300).json({
            errCode: -1,
            errMessage: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await userService.createNewUser(req.body);
    return res.status(200).json(data);
}

module.exports = {
    handleLogin: handleLogin,
    recoveryPassword: recoveryPassword,
    recoveryPasswordSuccess: recoveryPasswordSuccess,
    handleCreateNewUser: handleCreateNewUser
}