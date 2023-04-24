export default function NavBarWelcomePage({ userId, userType, changePage, validate_token }) {

    return (
        <>
            <header class="z-50 py-4 bg-white shadow-md dark:bg-gray-800 w-screen pb-4 -mt-6">
                <div
                    class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
                >
                    {/* Mobile hamburger */}
                    <button class="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple z-100" aria-label="Menu"
                        onClick={() => {
                            document.getElementById('mobile-sidebar-backdrop').style.display = document.getElementById('mobile-sidebar-backdrop').style.display === 'block' ? 'none' : 'block';
                            document.getElementById('mobile-sidebar').style.display = document.getElementById('mobile-sidebar').style.display === 'block' ? 'none' : 'block';;
                        }}>
                        <svg class="w-6 h-6 z-90" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    {/* Search */}
                    <div class="flex justify-center flex-1 lg:mr-32">
                    </div>

                    <ul class="flex items-center flex-shrink-0 space-x-6">

                        <li class="relative">
                            {/* profile icon */}
                            {/* <button
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
                            </button> */}
                            {/* <div style={{ display: isProfileMenuOpen ? 'block' : "none" }}>
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
                            </div> */}
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}