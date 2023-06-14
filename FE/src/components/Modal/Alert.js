import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../../public/image/NotFoundImage.png';

const Alert = () => {

    const navigate = useNavigate();

    const getAlert = useSelector(state => state.statusApp);

    const [count, setCount] = useState(5);

    useEffect(() => {
        if (count === 0) {
            navigate('/login');
        };
        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000);
        return () => clearInterval(timer)
    }, [count]);

    return (
        <>
            { getAlert.statusFromCreate === true || getAlert.statusFromForget === true ?
                <>
                    <div className="mt-10 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-full max-w-md max-h-full">
                            <div className="relative rounded-lg shadow bg-white">
                                <div className='justify-center items-center flex py-5'>
                                    <i className=" text-9xl fas fa-check-circle" style={{color: '#81ee8e'}} />
                                </div>
                                <span className='justify-center items-center flex pt-3 text-lg font-semibold' style={{color: '#81ee8e'}}> 
                                    { getAlert.statusFromCreate === true ? 'Đã tạo tài khoản thành công!' : 'Đã thay đổi mật khẩu thành công!' } 
                                </span>
                                <span className='justify-center items-center flex py-4 text-base text-gray-400'> Tự động quay về trang đăng nhập sau: {count}s </span>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="frame-modal-1 mt-10">
                    <div className="frame-modal-2">
                        <img src={NotFoundImage} />
                    </div>
                </div>
            }
        </>
    )
}

export default Alert;