import React from 'react';
import './OTP.css';
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { successForgetPassword } from '../../Redux/Slice/StatusSlice';
import { clearNewPassword } from '../../Redux/Slice/UserSlice';
import { recoveryPasswordSuccessService } from '../../Redux/Service';

const InputOTP = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const dataAccount = useSelector(state => state.dataUser);

    const [inputOtp, setInputOtp] = useState("");
    const [alert, setAlert] = useState('');

    const handleChange = (otp) => {
        setInputOtp(otp);
    }

    const changeSuccess = async (event) => {
        event.preventDefault();
        try{
            let getData = await recoveryPasswordSuccessService({
                inputOtp, 
                newPassword: dataAccount.userNewPassword,
                emailCheck: dataAccount.userEmailRecovery
            });
            if(getData && getData.errCode !== 0) setAlert(getData.errMessage)
            if(getData && getData.errCode === 0){
                dispatch(successForgetPassword()); 
                dispatch(clearNewPassword()); 
                navigate('/alert');
            }
        } catch (e){
            if(e.response.getData) setAlert(e.response.getData.errMessage)
        }
    }

    return (
        <>
            <div className="frame-modal-1 mt-10">
                <div className="frame-modal-2">
                    <div className="frame-modal-3">
                        <div className="frame-modal-4">
                            <h3 className="frame-modal-title"> XÁC THỰC MÃ OTP </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="label-modal"> Nhập mã OTP đã được gửi về email </label>
                                    <div className="otp-parent-container">
                                        <div className='input-otp-container'>
                                            <OtpInput   value={inputOtp}
                                                        onChange={handleChange}
                                                        numInputs={4}
                                                        separator={<span> - </span>}
                                                        inputStyle={"input-customize"} />
                                        </div>
                                    </div>
                                    { alert && alert.length > 0 ? 
                                        <> 
                                            <i className="alert-icon-style fas fa-exclamation-triangle" />
                                            <span className='alert-contain'> {alert} </span>
                                        </> 
                                        : 
                                        <> </>
                                    }
                                </div>
                                <Link to='/login' className="alter-link text-sm justify-center items-center flex inset-0"> Quay về trang đăng nhập </Link>
                                <button type="submit" className="button-modal" onClick={ changeSuccess }> 
                                    Xác thực 
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputOTP;