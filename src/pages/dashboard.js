import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Card from '../components/card';

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [rawToday, setRawToday] = useState(0);
  const [processedToday, setProcessedToday] = useState(0);
  const [paymentMonth, setPaymentMonth] = useState(0);
  const [revenueMonth, setRevenueMonth] = useState(0);
  const [users, setUsers] = useState(0);
  const [processedsToday, setProcessedsToday] = useState([]);
  const [errorToday, setErrorToday] = useState(0);
  const [workingHour, setWorkingHour] = useState(9);
  const [workingHourMoreToday, setWorkingHourMoreToday] = useState(0);
  const [workingHourLessToday, setWorkingHourLessToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    const userAPI = {
      'SUPER-ADMIN': 'superadmin',
      'ORG-ADMIN': 'user',
      'ORG-USER': 'orguser'
    }

  //   try {
  //     let APIurl = `/api/v1/${userAPI[userType]}?id=${userId}`
  //     const token = Cookies.get('token')
  //     const response = await axios.get(APIurl);
  //     setUser(response.data.data[0])
  //   } catch (error) {
  //     setLoading(false)
  //   }
  }

  const fetchRecords = async () => {
  //   try {
  //     let APIurl = `/api/v1/attendance?dateStart=${new Date().toISOString().slice(0, 10)}&dateEnd=${new Date().toISOString().slice(0, 10)}`
  //     if (userType === 'ORG-ADMIN') APIurl += `&accountId=${userId}`
  //     const token = Cookies.get('token')
  //     let response = await axios.get(APIurl);
  //     setProcessedToday(response.data.data.length)
  //     if (userType === 'ORG-ADMIN') {
  //       setProcessedsToday(response.data.data)
  //       let error = 0
  //       let workingHoursMore = 0
  //       let workingHoursLess = 0
  //       response.data.data.forEach(data => {
  //         error += data.isConflict ? 1 : 0
  //         workingHoursMore += data.attendanceDurationInHours > workingHour ? 1 : 0
  //         workingHoursLess += data.attendanceDurationInHours < workingHour ? 1 : 0
  //       })
  //       setErrorToday(error)
  //       setWorkingHourMoreToday(workingHoursMore)
  //       setWorkingHourLessToday(workingHoursLess)
  //     }

  //     APIurl = `/api/v1/attendance/raw?dateStart=${new Date().toISOString().slice(0, 10)}&dateEnd=${new Date().toISOString().slice(0, 10)}`
  //     if (userType === 'ORG-ADMIN') APIurl += `&accountId=${userId}`
  //     response = await axios.get(APIurl);
  //     setRawToday(response.data.data.length)
  //   } catch (error) {
  //     setLoading(false)
  //   }
  }

  const fetchTransactions = async () => {
    try {
      const lastDateOfMonth = {
        '01': 31,
        '02': 28,
        '03': 31,
        '04': 30,
        '05': 31,
        '06': 30,
        '07': 31,
        '08': 31,
        '09': 30,
        '10': 31,
        '11': 30,
        '12': 31
      }
      let APIurl = `/api/v1/payment?dateStart=${new Date().toISOString().slice(0, 8) + '01'}&dateEnd=${new Date().toISOString().slice(0, 8) + lastDateOfMonth[new Date().toISOString().slice(5, 7)]}`
      const token = Cookies.get('token')
      let response = await axios.get(APIurl);
      setPaymentMonth(response.data.data.length)
      let revenue = 0
      response.data.data.forEach(element => {
        revenue += element.paid
      })
      setRevenueMonth(revenue)
    } catch (error) {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      let APIurl = `/api/v1/user`
      const token = Cookies.get('token')
      let response = await axios.get(APIurl);
      setUsers(response.data.data.length)
    } catch (error) {
      setLoading(false)
    }
  }

  const fetchCoroutines = async () => {
    await fetchUser();
    await fetchRecords()
    // if (userType === 'SUPER-ADMIN') {
    //   await fetchTransactions()
    //   await fetchUsers();
    // }
    setLoading(false)
  }

  useEffect(() => {
    let workingHoursMore = 0
    let workingHoursLess = 0
    processedsToday.forEach(data => {
      workingHoursMore += data.attendanceDurationInHours > workingHour ? 1 : 0
      workingHoursLess += data.attendanceDurationInHours < workingHour ? 1 : 0
    })
    setWorkingHourMoreToday(workingHoursMore)
    setWorkingHourLessToday(workingHoursLess)
  }, [workingHour])

  useEffect(() => {
    fetchCoroutines()
  }, [])

  if (loading)
    return (
      <div class="text-center">
        <div role="status">
          <svg aria-hidden="true" class="inline w-12 h-12 mr-2 mt-10 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )

  else
    return (
      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h2>

        <p class="mb-8 text-gray-600 dark:text-gray-400">
          Welcome {user.firstName} {user.lastName} Danish Ansari
        </p>

        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card title={'Total Client'} value={10} color={'gray'} icon={"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"} />
          <Card title={'Client Request'} value={5} color={'purple'} icon={"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"} />
          <Card title={'Total Voting'} value={15} color={'blue'} icon={"M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"} />
        </div>

        {/* {userType === 'ORG-ADMIN' &&
          <>
            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <Card title={`Number of people working more than ${workingHour} hours today`} value={workingHourMoreToday} color={'green'} icon={"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"} />
              <Card title={`Number of people working less than ${workingHour} hours today`} value={workingHourLessToday} color={'orange'} icon={"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"} />
            </div>
            <div className='w-80 items-center justify-between p-4 mb-8 text-sm font-semibold bg-white shadow-xs rounded-lg focus:outline-none focus:shadow-outline-purple'>
              <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900">Working hour duration: {workingHour}</label>
              <input id="default-range" type="range" defaultValue={workingHour} min='1' max="18" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" onChange={e => { setWorkingHour(e.target.value) }} />
            </div>
          </>} */}
      </div>
    )
}
