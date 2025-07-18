import React, { useContext, useState } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({activeMenu}) => {
  const {user , clearUser} = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === "/logout"){
      // handleLogout();
      setShowModal(true);
      return ;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
         {user?.profileImageUrl ? (
          <img src={user?.profileImageUrl || ""}
          alt="Profile Image"
          className="w-20 h-20 bg-slate-400 rounded-full" />
         ):
         <CharAvatar
           fullName={user?.fullName}
           width="w-20"
           height="h-20"
           style="text-xl"
           />
         }

         <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
         </h5>
      </div>
   
   {SIDE_MENU_DATA.map((item, index) => (
    <button
    key={`menu_${index}`}
    className={`w-full flex items-center gap-4 text-[15px] ${
      activeMenu == item.label ? "text-white bg-primary" : ""
    } py-3 px-6 rounded-lg mb-3`}
    onClick={() => handleClick(item.path)}>
      <item.icon className="text-xl" />
      {item.label}
    </button>
   ) )}
   {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

  </div>
  )
}

export default SideMenu
