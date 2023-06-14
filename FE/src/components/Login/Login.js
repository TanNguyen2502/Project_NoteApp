import React from 'react';
import './Social-Button-Style.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { saveUserSQL, loginSocialGoogle, loginAccountSuccess } from '../../Redux/Slice/UserSlice';
import { loginService } from '../../Redux/Service';

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');

    const handleLoginGoogle = () => {
        dispatch(loginSocialGoogle());
    };

    const handleLoginAccount = async(event) => {
        event.preventDefault();
        if(!email) setAlert('Bạn chưa nhập email');
        else if(!password) setAlert('Bạn chưa nhập mật khẩu');
        try{
            let getData = await loginService(email, password);
            if(getData && getData.errCode !== 0) setAlert(getData.errMessage)
            if(getData && getData.errCode === 0){
                dispatch(loginAccountSuccess());
                dispatch(saveUserSQL(getData.user));
                navigate('/');
            }
        } catch (e){
            if(e.response.getData) setAlert(e.response.getData.message)
        }
    }

    return (
        <>
            <div className="frame-modal-1 mt-10">
                <div className="frame-modal-2">
                    <div className="frame-modal-3">
                        <div className="frame-modal-4">
                            <h3 className="frame-modal-title"> ĐĂNG NHẬP </h3>
                            <form className="space-y-6" action="#">
                                <input  type="email" name="email" className="input-modal-style" required
                                        placeholder="Email của bạn" onChange={ (e) => setEmail(e.target.value) } />
                                <input  type="password" name="password" className="input-modal-style" required 
                                        placeholder="Mật khẩu của bạn" onChange={ (e) => setPassword(e.target.value) } /> 
                                { alert && alert.length > 0 ? 
                                    <> 
                                        <i className="alert-icon-style fas fa-exclamation-triangle" />
                                        <span className='alert-contain'> {alert} </span>
                                    </> 
                                    : 
                                    <> </>
                                }
                                <button type="submit" className="button-modal" onClick={ handleLoginAccount }> 
                                    Đăng nhập vào tài khoản 
                                </button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    <span className="pr-1"> Chưa có tài khoản? </span>
                                    <Link to="create-account" className="alter-link"> Tạo ngay </Link>
                                    <Link to="recovery-password" className="pl-12 alter-link"> Khôi phục mật khẩu </Link>
                                </div>
                                <a href="#" className="social-button" id="google-connect"> 
                                    <span onClick={ handleLoginGoogle }> Dùng tài khoản Google </span>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Login;