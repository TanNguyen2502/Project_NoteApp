import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { saveUserSocial, clearUserState, logoutSQLSocial, loginAccountSuccess, logoutAccountSuccess } from '../Redux/Slice/UserSlice';

const Title = () => {

  const dispatch = useDispatch();
  
  const nameAccount = useSelector(state => state.dataUser);

  const logout = () => {
    dispatch(clearUserState()); 
    dispatch(logoutAccountSuccess()); 
    dispatch(logoutSQLSocial()); 
  };

  useEffect(() => {
    const getUserGoogle = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Xác thực thất bại!");
      })
      .then((resObject) => {
        dispatch(loginAccountSuccess())
        dispatch(saveUserSocial(resObject.user))
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getUserGoogle();
  }, []);

  return (
    <>
      <div className="mx-2 pr-6 pb-2 text-right text-white cursor-pointer">
        { nameAccount.statusLogin === true ?
          <>
            <span> Xin chào, { nameAccount.userSocial ? nameAccount.userSocial.nameLogin : nameAccount.userSQL.nameLogin } ! </span>
            <span className='px-4'> || </span>
            <span onClick={logout}> ĐĂNG XUẤT </span>
          </>
          : 
          <Link className="link" to="login"> ĐĂNG NHẬP </Link>
        }
      </div>
    </>
  )
}

export default Title
