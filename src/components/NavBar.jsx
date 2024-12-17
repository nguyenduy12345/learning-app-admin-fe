import {useContext} from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie"

import { Auth } from "../stores/auth.store";
const NavBar = () => {
  const handleUserLogOut = () => {
    Cookies.remove("token")
    window.location.href = "http://localhost:5174/login";
  };
  const {admin} = useContext(Auth)
  return (
    <div className="h-screen w-[10rem] bg-[#f3f8f9] text-black flex items-center justify-center py-6">
      <div className="h-screen fixed top-[4rem] left-[0.5rem]">
      <div className="text-center text-xl font-bold p-2 uppercase">
        <p className="text-md font-semibold">Tài khoản: </p>
        {admin?.fullName}
      </div>
      <div className="flex flex-col items-center space-y-3 grow mt-[1rem]">
        <NavLink to='/course_manage' className={({ isActive }) => `${isActive ? 'border-[1px] rounded-md border-blue-500 font-bold text-blue-500' : ''} cursor-pointer  w-full py-2 px-4 transition duration-200 ease-in-out`}>
          Khóa học
        </NavLink>
        <NavLink to='/misson_manage' className={({ isActive }) => `${isActive ? 'border-[1px] rounded-md border-blue-500 font-bold text-blue-500' : ''} cursor-pointer  w-full py-2 px-4 transition duration-200 ease-in-out`}>
          Nhiệm vụ
        </NavLink>
        <NavLink to='/user_manage' className={({ isActive }) => `${isActive ? 'border-[1px] rounded-md border-blue-500 font-bold text-blue-500' : ''} cursor-pointer  w-full py-2 px-4 transition duration-200 ease-in-out`}>
          Người dùng
        </NavLink>
        <div onClick={handleUserLogOut} className="cursor-pointer w-full py-2 px-4 rounded-md transition duration-200 ease-in-out">
          Đăng xuất
        </div>
      </div>
      </div>
    </div>
  );
};

export default NavBar;
