import { useState, useRef, useEffect } from'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function NavBar({userId, userType, changePage, validate_token}) {
    const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const photo = useRef()

    const navigate = useNavigate();


    const profileClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
        setIsNotificationMenuOpen(false);
    }

    const fetchPhoto = async () => {
      const userAPI = {
          'SUPER-ADMIN': 'superadmin',
          'ORG-ADMIN': 'user',
          'ORG-USER': 'orguser'
      }

      try {
          let APIurl = `/api/v1/${userAPI[userType]}?id=${userId}`
          const token = Cookies.get('token')
          const response = await axios.get(APIurl);
          photo.current.src = '/api/v1/images/'+response.data.data[0]['photo']
          if (!response.data.data[0].isVerified && response.data.data[0].isVerified !== undefined) window.location.href = '/email_verification'
      } catch (error) {
        
      }
  }

    const logoutClick = () => {
      // const token = Cookies.get('token')
  
      // axios.post('/api/v1/logout')
      // .then(res => {
          Cookies.remove('token')
          axios.defaults.headers.common['Authorization'] = `Bearer `;
          validate_token()
          // window.location.href='/login'
          // window.location.reload()
      // })
      // .catch(err => {
      //   // console.log(err.toJSON());
      // })
  }

  useEffect(() => {
    fetchPhoto()
}, [])

    return (
        <>
        <header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div
            class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
          >
            {/* Mobile hamburger */}
            <button class="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu"
            onClick={() => {
              document.getElementById('mobile-sidebar-backdrop').style.display = document.getElementById('mobile-sidebar-backdrop').style.display === 'block' ? 'none' : 'block';
              document.getElementById('mobile-sidebar').style.display = document.getElementById('mobile-sidebar').style.display === 'block' ? 'none' : 'block';;
            }}>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              </svg>
            </button>

            {/* Search */}
            <div class="flex justify-center flex-1 lg:mr-32">
            </div>

            <ul class="flex items-center flex-shrink-0 space-x-6">
            
              <li class="relative">
                {/* profile icon */}
                <button
                  class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                  aria-label="Account"
                  aria-haspopup="true"
                  onClick={profileClick}
                >
                  <img
                    class="object-cover w-8 h-8 rounded-full"
                    ref={photo}
                    src=''
                    alt=""
                    aria-hidden="true"
                  />
                </button>
                <div style={{display: isProfileMenuOpen ? 'block' : "none"}}>
                  <ul
                    class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800"
                    aria-label="submenu"
                  >
                    <li class="flex">
                      <button
                        class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        onClick={() => {
                          navigate('/edit');
                          changePage('User Form')
                          setIsProfileMenuOpen(false)
                        }}
                      >
                        <svg
                          class="w-4 h-4 mr-3"
                          aria-hidden="true"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                        <span>Profile</span>
                      </button>
                    </li>
                    {/* <li class="flex">
                      <a
                        class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        href="#"
                      >
                        <svg
                          class="w-4 h-4 mr-3"
                          aria-hidden="true"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          ></path>
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>Settings</span>
                      </a>
                    </li> */}
                    <li class="flex">
                      <button
                        class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        onClick={logoutClick}
                      >
                        <svg
                          class="w-4 h-4 mr-3"
                          aria-hidden="true"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          ></path>
                        </svg>
                        <span>Log out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </header>
        </>
    )
}