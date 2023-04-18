import {useRef} from 'react';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function SingleInputForm({title, inputName, buttonName}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef();

    const forgotPassword = async () => {
        try {
            await axios.post('/api/v1/forgot', {
                email: inputRef.current.value
            });
            window.location.href = '/login'
        } catch (error) {
            console.log(error);
        }
    }

    const emailVerification = async () => {
        try {
            await axios.post('/api/v1/email_verification', {
                token: inputRef.current.value
            });
            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    }

    const resetPassword = async () => {
        try {
            const token = searchParams.get("token")
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let res = await axios.get('/api/v1/validate_token')
            await axios.post('/api/v1/profile', {
                id: res.data['id'],
                password: inputRef.current.value
            });
            window.location.href = '/login'
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if (inputRef.current.value === '') {
            inputRef.current.focus();
            return
        }

        if (window.location.pathname === '/forgot_password') {
            forgotPassword()
        }
        if (window.location.pathname === '/reset_password') {
            resetPassword()
        }
        if (window.location.pathname === '/email_verification') {
            emailVerification()
        }
    }

    return (
        <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div class="flex flex-col overflow-y-auto md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" class="object-cover w-full h-full dark:hidden" src="../assets/img/forgot-password-office.jpeg" alt="Office"/>
            <img aria-hidden="true" class="hidden object-cover w-full h-full dark:block" src="../assets/img/forgot-password-office-dark.jpeg" alt="Office"/>
          </div>
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div class="w-full">
              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                {title}
              </h1>
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">{inputName}</span>
                <input ref={inputRef} class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder={inputName}/>
              </label>

              <button onClick={handleClick} class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                {buttonName}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
}