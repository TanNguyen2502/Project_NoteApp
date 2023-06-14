import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { recoveryPasswordService } from '../../Redux/Service';
import { useDispatch } from 'react-redux';
import { saveNewPassword } from '../../Redux/Slice/UserSlice';

const RecoveryPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailForget, setEmailForget] = useState('');
    const [passwordForget, setPasswordForget] = useState('');
    const [alert, setAlert] = useState('');

    const NextForget = async (event) => {
        event.preventDefault();
        if(!emailForget) setAlert('Bạn chưa nhập email');
        else if(!passwordForget) setAlert('Bạn chưa nhập mật khẩu mới');
        let otp = Math.floor(1000 + Math.random() * 9000);
        try{
            let getData = await recoveryPasswordService({
                emailForget, 
                otp
            });
            if(getData && getData.errCode === 0){
                dispatch(saveNewPassword({
                    emailForget, 
                    passwordForget
                }))
                navigate('/login/otp');
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
                            <h3 className="frame-modal-title"> KHÔI PHỤC MẬT KHẨU </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="label-modal"> Nhập email của tài khoản cần khôi phục </label>
                                    <input  type="email" name="email" className="input-modal-style" required 
                                            onChange={ (e) => setEmailForget(e.target.value) } />
                                </div>
                                <div>
                                    <label className="label-modal"> Nhập mật khẩu mới </label>
                                    <input  type="password" name="password" className="input-modal-style" required 
                                            onChange={ (e) => setPasswordForget(e.target.value) } />
                                </div>
                                { alert && alert.length > 0 ? 
                                    <> 
                                        <i className="alert-icon-style fas fa-exclamation-triangle" />
                                        <span className='alert-contain'> {alert} </span>
                                    </> 
                                    : 
                                    <> </>
                                }
                                <button type="submit" className="button-modal" onClick={ NextForget }>
                                    Tiếp tục
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecoveryPassword;