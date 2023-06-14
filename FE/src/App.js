import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Title from './components/Title';
import Login from './components/Login/Login.js';
import Home from './components/Home';
import CreateAccount from './components/AccountService/CreateAccount';
import RecoveryPassword from './components/AccountService/RecoveryPassword';
import InputOTP from './components/AccountService/InputOTP';
import Alert from './components/Modal/Alert';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div className="text-center my-3 text-4xl text-white text-3xl font-semibold"> Note App </div>
            <Routes>
              <Route path="/" element={<> <Title /> <Home /> </>} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/create-account" element={<CreateAccount />} />
              <Route path="/login/recovery-password" element={<RecoveryPassword />} />
              <Route path="/login/otp" element={<InputOTP />} />
              <Route path="/alert" element={<Alert />} />
            </Routes>
        </header>
      </div>
      <ToastContainer position="top-center"
                      autoClose={1000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored" />
    </BrowserRouter>
  );
}

export default App;





