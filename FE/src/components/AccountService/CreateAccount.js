import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { successCreateAccount } from '../../Redux/Slice/StatusSlice';
import { createUserSQL } from '../../Redux/Slice/UserSlice';

const CreateAccount = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [inputEmail, setInputEmail] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputpassword, setInputPassword] = useState('');
    const [alert, setAlert] = useState('');

    const handleRegister = () => {
        if(!inputEmail) setAlert('Bạn chưa nhập email');
        else if(!inputName) setAlert('Bạn chưa nhập tên tài khoản');
        else if(!inputpassword) setAlert('Bạn chưa nhập mật khẩu');
        if(inputEmail && inputName && inputpassword){
            dispatch(successCreateAccount());  
            dispatch(createUserSQL({
                email: inputEmail,
                name: inputName,
                password: inputpassword
            }));  
            navigate('/alert');
        }
    }

    return (
        <>
            <div className="frame-modal-1 mt-10">
                <div className="frame-modal-2">
                    <div className="frame-modal-3">
                        <div className="frame-modal-4">
                            <h3 className="frame-modal-title"> ĐĂNG KÝ TÀI KHOẢN </h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label className="label-modal"> Email </label>
                                    <input  type="email" name="email" className="input-modal-style" required 
                                            onChange={ (e) => setInputEmail(e.target.value) } />
                                </div>
                                <div>
                                    <label className="label-modal"> Tên tài khoản </label>
                                    <input  type="text" name="name" className="input-modal-style" required 
                                            onChange={ (e) => setInputName(e.target.value) } />
                                </div>
                                <div>
                                    <label className="label-modal"> Mật khẩu </label>
                                    <input  type="password" name="password" className="input-modal-style" required
                                            onChange={ (e) => setInputPassword(e.target.value) } />
                                </div>
                                { alert && alert.length > 0 ? 
                                    <> 
                                        <i className="alert-icon-style fas fa-exclamation-triangle" />
                                        <span className='alert-contain'> {alert} </span>
                                    </> 
                                    : 
                                    <> </>
                                }
                                <button type="submit" className="button-modal" onClick= {handleRegister }> 
                                    Đăng ký 
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateAccount