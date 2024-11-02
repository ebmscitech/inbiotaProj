import { clearStorages, eraseCookie, getPhotoProfile, getUserRole } from '@/utils/storage';
import { Password20Filled, Person20Filled, Person24Filled, SignOut20Filled } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
// import Cookies from "js-cookie";
import toastAlert from "@/utils/alert";
import { postLogout } from "@/api/index.js";
import { noValue } from '@/utils/validateInput';

function Dropdown() {
  // const profilePicture = getPhotoProfile()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [userRole, setUserRole] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!dropdownButtonRef.current.contains(e.target) && !dropdownMenuRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleEditProfile = () => {
    router.push('/admin/profile')
    // console.log("ini edit profile")
  };

  const handleChangePassword = () => {
    console.log("ini change password")
  };

  const handleLogout = () => {
    // eraseCookie('token');
    // Cookies.remove("token");
    setIsLoading(true);

    console.log("ini logout")
    setIsDropdownOpen(false);
    postLogout().then((res) => {
      setIsLoading(false)
      // console.log("ini post logout", res)
      var temp = res.data.data || null
      toastAlert("success", "Berhasil logout !")
      clearStorages()
      // handleClose()
      // router.push('/admin/dapil')
      router.push('/auth/login')
      // setCookie(temp.token, 8)
      // setCookie("token", temp.token, 8)
    })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
        if (err.code === "ERR_BAD_REQUEST") {
          toastAlert("error", err.response.data.message)
        }
        console.error(err)
      })
  };

  useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  useEffect(() => {
    const fetchedProfilePicture = getPhotoProfile();
    setProfilePicture(fetchedProfilePicture)
    const fetchedUserRole = getUserRole();
    setUserRole(fetchedUserRole);
  }, []); // Run only once on mount

  if (userRole === null) {
    // If userRole is still null, you can show a loading state or return null
    return null;
  }

  return (
    <>
      <a
        className="text-blueGray-500 block cursor-pointer"

        onClick={toggleDropdown}
        ref={dropdownButtonRef}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={`${!noValue(profilePicture) ? profilePicture : "/img/team-1-800x800.jpg"}`}
            />
          </span>
        </div>
      </a>
      <div
        id="dropdown-menu"
        ref={dropdownMenuRef}
        className={`origin-top-right absolute right-2 sm:right-14 top-16 z-50 w-48 rounded-md shadow-lg bg-white-500 ring-1 ring-black-500 ring-opacity-5 ${isDropdownOpen ? '' : 'hidden'
          }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-button"
      >
        <div className="py-2 px-2 min-w-max" role="none">
          {/* <a className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="light" width="18px" className="mr-2"><path d="M19 9.199h-.98c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799H19c.552 0 1-.357 1-.799 0-.441-.449-.801-1-.801zM10 4.5A5.483 5.483 0 0 0 4.5 10c0 3.051 2.449 5.5 5.5 5.5 3.05 0 5.5-2.449 5.5-5.5S13.049 4.5 10 4.5zm0 9.5c-2.211 0-4-1.791-4-4 0-2.211 1.789-4 4-4a4 4 0 0 1 0 8zm-7-4c0-.441-.449-.801-1-.801H1c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799h1c.551 0 1-.358 1-.799zm7-7c.441 0 .799-.447.799-1V1c0-.553-.358-1-.799-1-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1zm0 14c-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1 .441 0 .799-.447.799-1v-1c0-.553-.358-1-.799-1zm7.365-13.234c.391-.391.454-.961.142-1.273s-.883-.248-1.272.143l-.7.699c-.391.391-.454.961-.142 1.273s.883.248 1.273-.143l.699-.699zM3.334 15.533l-.7.701c-.391.391-.454.959-.142 1.271s.883.25 1.272-.141l.7-.699c.391-.391.454-.961.142-1.274s-.883-.247-1.272.142zm.431-12.898c-.39-.391-.961-.455-1.273-.143s-.248.883.141 1.274l.7.699c.391.391.96.455 1.272.143s.249-.883-.141-1.273l-.699-.7zm11.769 14.031l.7.699c.391.391.96.453 1.272.143.312-.312.249-.883-.142-1.273l-.699-.699c-.391-.391-.961-.455-1.274-.143s-.248.882.143 1.273z"></path></svg>
            Light
          </a>
          <a className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="moon" width="18px" className="mr-2"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg>
            Dark
          </a> */}
          {userRole === "caleg" &&
            <>
              <div onClick={() => handleEditProfile()} className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
                <Person20Filled />
                <span className='pl-3'>
                  Edit Profile
                </span>
              </div>
              <div onClick={() => handleChangePassword()} className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
                <Password20Filled />
                <span className='pl-3'>
                  Change Password
                </span>
              </div>
            </>
          }
          <div onClick={() => handleLogout()} className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
            <SignOut20Filled />
            <span className='pl-3'>
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dropdown;


