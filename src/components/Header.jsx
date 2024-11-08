import React from 'react';
import CenterMenu from './CenterMenu';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const responseMessage = (response) => {
    console.log(response);
    navigate('/dashboard');
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="header bg-[#081730] flex items-center justify-between pb-[2rem] px-[7rem] pt-[2.4rem] text-[0.8rem]">
      {/* Logo */}
      <img src={require('../img/MuzicLogo.png')} alt="Muzic Logo" className="logo w-[42px] h-[42px]" />

      {/* Center Menu */}
      <CenterMenu />

      {/* Google Login Button */}
      <div>
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="flex items-center bg-white border border-gray-300 rounded-full p-1 pr-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-center bg-white w-8 h-8 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="fill-blue-500"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="fill-green-500"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="fill-yellow-500"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="fill-red-500"
                  ></path>
                </svg>
              </div>
              <span className="text-sm text-gray-600 pl-2">Sign in with Google</span>
            </button>
          )}
        />
      </div>
    </div>
  );
}

export default Header;
