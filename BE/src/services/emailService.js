require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_APP, 
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Note App" <tan250002@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Gửi mã OTP thay đổi mật khẩu",
        html: `
            <h3> Xin chào bạn ! </h3>
            <p> Bạn nhận được thư này vì muốn thay đổi mật khẩu cho tài khoản </p>
            <p> Đây là mã OTP dùng để thay đổi mật khẩu: ${dataSend.otp} </p>
            <p> Vui lòng không chia sẻ mã OTP cho người khác </p>
            <div> Xin cảm ơn, </div>
        `
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}