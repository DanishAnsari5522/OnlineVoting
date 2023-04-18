import { useState, useEffect, useRef } from'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CSVLink } from "react-csv";

export default function Table({type, title, description, columns, rows, userType, changePage, free, accountId}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [APIURL, setAPIURL] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [filteredRows, setFilteredRows] = useState(rows);
  // const [csvRows, setCsvRows] = useState(JSON.parse(JSON.stringify(filteredRows)));

  const searchUserFilter = useRef();
  const subscriptionFilter = useRef();
  const activeFilter = useRef();
  const employeeFilter = useRef();
  const companyFilter = useRef();
  const punchFilter = useRef();
  const hourFilter = useRef();
  const conflictFilter = useRef();
  const dateStartFilter = useRef();
  const dateEndFilter = useRef();
  const searchHelpFilter = useRef();
  const statusFilter = useRef();
  const searchSubscriptionFilter = useRef();
  const priceMinFilter = useRef();
  const priceMaxFilter = useRef();
  
  const navigate = useNavigate();

  const token = Cookies.get('token')

  const link = {
    'Super Admin':'SUPER-ADMIN',
    'User':'ORG-ADMIN',
    'Employee':'ORG-USER'
}

  const getAPIURL = {
    'Super Admin': 'superadmin',
    'User': 'user',
    'Employee': 'orguser',
    'Subscription': 'subscription',
    'Processed Attendance Record': 'attendance',
    'Raw Attendance Record': 'attendance/raw',
    'Payment': 'payment',
    'Help Ticket': 'help'
  }

  const filter = async (url) => {
    if (userType === 'ORG-ADMIN') url += `&accountId=${accountId}`
    try {
      const token = Cookies.get('token')
      setisLoading(true)
      const response = await axios.get(url, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setFilteredRows(response.data.data);
      setisLoading(false)
    } catch (error) {
      if (error.response.status === 401) navigate('/login');
    }
  }

  const filterSearchUser = async (event) => {
    // let arr = [];
    // arr = rows.filter(data => {
    //   return data.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || data.lastName.toLowerCase().includes(event.target.value.toLowerCase())
    // })
    // if (userType === 'SUPER-ADMIN' && title === 'Users') if (subscriptionFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return subscriptionFilter.current.value === data.subscription.name
    // })
    // if (activeFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return data.isActive === (activeFilter.current.value === 'true')
    // })
    // if (userType === 'SUPER-ADMIN' && title === 'Employee') if (companyFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.accountId._id['$oid'] === companyFilter.current.value
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?search=${event.target.value}`
    if (subscriptionFilter.current !== undefined) APIurl += `&subscription=${subscriptionFilter.current.value}`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
    if (activeFilter.current !== undefined) APIurl += `&isActive=${activeFilter.current.value}`

    if (event.target.value === '') await new Promise(resolve => setTimeout(resolve, 1000));
    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterSubscription = async (event) => {
    // let arr = [];
    // if (dateStartFilter.current.value !== '' || dateEndFilter.current.value !== '') {
    //   let APIurl = `/api/v1/payment`
    //   if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    //   if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    //   const response = await axios.get(APIurl, {
    //       headers: {
    //           'Authorization': `Bearer ${token}`
    //       }
    //   });
    //   arr = response.data.data
    // }
    // else arr = rows
    // arr = arr.filter(data => {
    //   if (type === 'user')
    //   return event.target.value === data.subscription.name

    //   if (type === 'payment')
    //   return event.target.value === data.product
    // })
    // if (type === 'user') {
    //   if (searchUserFilter.current.value !== '') 
    //   arr = arr.filter(data => {
    //     return data.firstName.toLowerCase().includes(searchUserFilter.current.value.toLowerCase()) || data.lastName.toLowerCase().includes(searchUserFilter.current.value.toLowerCase())
    //   })
    //   if (activeFilter.current.value !== '') 
    //   arr = arr.filter(data => {
    //     return data.isActive === (activeFilter.current.value === 'true')
    //   })
    // }
    // if ((userType === 'SUPER-ADMIN' && title === 'Employee') || type === 'payment') if (companyFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   if (type === 'user')
    //   return data.accountId._id['$oid'] === companyFilter.current.value

    //   if (type === 'payment')
    //   return data.userId._id['$oid'] === companyFilter.current.value
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?subscription=${event.target.value}`
    if (searchUserFilter.current !== undefined) APIurl += `&search=${searchUserFilter.current.value}`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
    if (activeFilter.current !== undefined) APIurl += `&isActive=${activeFilter.current.value}`
    if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
    if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterActive = (event) => {
    // let arr = [];
    // arr = rows.filter(data => {
    //   return data.isActive === (event.target.value === 'true')
    // })
    // if (searchUserFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return data.firstName.toLowerCase().includes(searchUserFilter.current.value.toLowerCase()) || data.lastName.toLowerCase().includes(searchUserFilter.current.value.toLowerCase())
    // })
    // if (userType === 'SUPER-ADMIN' && title === 'Users') if (subscriptionFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return subscriptionFilter.current.value === data.subscription.name
    // })
    // if (userType === 'SUPER-ADMIN' && title === 'Employee') if (companyFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.accountId._id['$oid'] === companyFilter.current.value
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?isActive=${event.target.value}`
    if (searchUserFilter.current !== undefined) APIurl += `&search=${searchUserFilter.current.value}`
    if (subscriptionFilter.current !== undefined) APIurl += `&subscription=${subscriptionFilter.current.value}`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterEmployee = async (event) => {
    // let arr = [];
    // if (dateStartFilter.current.value !== '' || dateEndFilter.current.value !== '') {
    //   let APIurl = `/api/v1/attendance${type === 'rawAttendance' ? '/raw?' : '?'}`
    //   if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    //   if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    //   const response = await axios.get(APIurl, {
    //       headers: {
    //           'Authorization': `Bearer ${token}`
    //       }
    //   });
    //   arr = response.data.data
    // }
    // else arr = rows
    // arr = arr.filter(data => {
    //   if (type === 'attendance')
    //   return data.employeeId.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || data.employeeId.lastName.toLowerCase().includes(event.target.value.toLowerCase()) || data.employeeId.email.toLowerCase().includes(event.target.value.toLowerCase())

    //   if (type === 'rawAttendance')
    //   return data.accountId.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || data.accountId.lastName.toLowerCase().includes(event.target.value.toLowerCase()) || data.accountId.email.toLowerCase().includes(event.target.value.toLowerCase())
    // })
    // if (userType === 'SUPER-ADMIN')
    // if (companyFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.accountId._id['$oid'] === companyFilter.current.value
    // })
    // if (type === 'rawAttendance')
    // if (punchFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.punchType === punchFilter.current.value
    // })
    // if (type === 'attendance') {
    //   if (conflictFilter.current.value !== '')
    //   arr = arr.filter(data => {
    //     return data.isConflict === (conflictFilter.current.value === 'true')
    //   })
    //   if (hourFilter.current.value !== '')
    //   arr = arr.filter(data => {
    //     return data.attendanceDurationInHours === parseInt(hourFilter.current.value)
    //   })
    // }
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?search=${event.target.value}`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
    if (hourFilter.current !== undefined) APIurl += `&hour=${hourFilter.current.value}`
    if (conflictFilter.current !== undefined) APIurl += `&conflict=${conflictFilter.current.value}`
    if (punchFilter.current !== undefined) APIurl += `&punch=${punchFilter.current.value}`
    if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
    if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

    if (event.target.value === '') await new Promise(resolve => setTimeout(resolve, 1000));
    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterCompany = async (event) => {
    // let arr = [];
    // if (type === 'user') {
    //   arr = rows.filter(data => {
    //     return data.accountId._id['$oid'] === event.target.value
    //   })
    //   if (searchUserFilter.current.value !== '') 
    //   arr = arr.filter(data => {
    //     return data.firstName.toLowerCase().includes(searchUserFilter.current.value.toLowerCase()) || data.lastName.toLowerCase().includes(searchUserFilter.current.value.toLowerCase())
    //   })
    //   if (userType === 'SUPER-ADMIN' && title === 'Users') if (subscriptionFilter.current.value !== '') 
    //   arr = arr.filter(data => {
    //     return subscriptionFilter.current.value === data.subscription.name
    //   })
    //   if (activeFilter.current.value !== '') 
    //   arr = arr.filter(data => {
    //     return data.isActive === (activeFilter.current.value === 'true')
    //   })
    // }
    // if (type === 'attendance' || type === 'rawAttendance') {
    //   if (dateStartFilter.current.value !== '' || dateEndFilter.current.value !== '') {
    //     let APIurl = `/api/v1/attendance${type === 'rawAttendance' ? '/raw?' : '?'}`
    //     if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    //     if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    //     const response = await axios.get(APIurl, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    //     arr = response.data.data
    //   }
    //   else arr = rows
    //   arr = arr.filter(data => {
    //     if (type === 'attendance')
    //     return data.employeeId._id['$oid'] === event.target.value
  
    //     if (type === 'rawAttendance')
    //     return data.accountId._id['$oid'] === event.target.value
    //   })
    //   if (employeeFilter.current.value !== '')
    //   arr = arr.filter(data => {
    //     if (type === 'attendance')
    //     return data.employeeId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())

    //     if (type === 'rawAttendance')
    //     return data.accountId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())
    //   })
    //   if (type === 'rawAttendance')
    //   if (punchFilter.current.value !== '')
    //   arr = arr.filter(data => {
    //     return data.punchType === punchFilter.current.value
    //   })
    //   if (type === 'attendance') {
    //     if (conflictFilter.current.value !== '')
    //     arr = arr.filter(data => {
    //       return data.isConflict === (conflictFilter.current.value === 'true')
    //     })
    //     if (hourFilter.current.value !== '')
    //     arr = arr.filter(data => {
    //       return data.attendanceDurationInHours === parseInt(hourFilter.current.value)
    //     })
    //   }
    // }
    // if (type === 'payment') {
    //   if (dateStartFilter.current.value !== '' || dateEndFilter.current.value !== '') {
    //     let APIurl = `/api/v1/payment?`
    //     if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    //     if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    //     const response = await axios.get(APIurl, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    //     arr = response.data.data
    //   }
    //   else arr = rows
    //   arr = arr.filter(data => {
    //     return data.userId._id['$oid'] === event.target.value
    //   })
    //   if (subscriptionFilter.current.value !== '') 
    //   arr = arr.filter(data => {
    //     return subscriptionFilter.current.value === data.product
    //   })
    // }
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?accountId=${event.target.value}`
    if (searchUserFilter.current !== undefined) APIurl += `&search=${searchUserFilter.current.value}`
    if (subscriptionFilter.current !== undefined) APIurl += `&subscription=${subscriptionFilter.current.value}`
    if (activeFilter.current !== undefined) APIurl += `&isActive=${activeFilter.current.value}`
    if (employeeFilter.current !== undefined) APIurl += `&search=${employeeFilter.current.value}`
    if (hourFilter.current !== undefined) APIurl += `&hour=${hourFilter.current.value}`
    if (conflictFilter.current !== undefined) APIurl += `&conflict=${conflictFilter.current.value}`
    if (punchFilter.current !== undefined) APIurl += `&punch=${punchFilter.current.value}`
    if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
    if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterPunch = async (event) => {
    // let arr = [];
    // if (dateStartFilter.current.value !== '' || dateEndFilter.current.value !== '') {
    //   let APIurl = `/api/v1/attendance${type === 'rawAttendance' ? '/raw?' : '?'}`
    //   if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    //   if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    //   const response = await axios.get(APIurl, {
    //       headers: {
    //           'Authorization': `Bearer ${token}`
    //       }
    //   });
    //   arr = response.data.data
    // }
    // else arr = rows
    // arr = arr.filter(data => {
    //   return data.punchType === event.target.value
    // })
    // if (employeeFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   if (type === 'attendance')
    //   return data.employeeId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())

    //   if (type === 'rawAttendance')
    //   return data.accountId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())
    // })
    // if (userType === 'SUPER-ADMIN') if (companyFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.accountId._id['$oid'] === companyFilter.current.value
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?punch=${event.target.value}`
    if (employeeFilter.current !== undefined) APIurl += `&search=${employeeFilter.current.value}`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
    if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
    if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterHour = async (event) => {
    // let arr = [];
    // if (dateStartFilter.current.value !== '' || dateEndFilter.current.value !== '') {
    //   let APIurl = `/api/v1/attendance${type === 'rawAttendance' ? '/raw?' : '?'}`
    //   if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    //   if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    //   const response = await axios.get(APIurl, {
    //       headers: {
    //           'Authorization': `Bearer ${token}`
    //       }
    //   });
    //   arr = response.data.data
    // }
    // else arr = rows
    // if (event.target.value !== '')
    // arr = arr.filter(data => {
    //   return data.attendanceDurationInHours === parseInt(event.target.value)
    // })
    // if (employeeFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   if (type === 'attendance')
    //   return data.employeeId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())

    //   if (type === 'rawAttendance')
    //   return data.accountId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())
    // })
    // if (userType === 'SUPER-ADMIN') if (companyFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.accountId._id['$oid'] === companyFilter.current.value
    // })
    // if (conflictFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.isConflict === (conflictFilter.current.value === 'true')
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?hour=${event.target.value}`
    if (employeeFilter.current !== undefined) APIurl += `&search=${employeeFilter.current.value}`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
    if (conflictFilter.current !== undefined) APIurl += `&conflict=${conflictFilter.current.value}`
    if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
    if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterConflict = async (event) => {
    // let arr = [];
    // if (dateStartFilter.current.value !== '' || dateEndFilter.current.value !== '') {
    //   let APIurl = `/api/v1/attendance${type === 'rawAttendance' ? '/raw?' : '?'}`
    //   if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    //   if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    //   const response = await axios.get(APIurl, {
    //       headers: {
    //           'Authorization': `Bearer ${token}`
    //       }
    //   });
    //   arr = response.data.data
    // }
    // else arr = rows
    // arr = arr.filter(data => {
    //   return data.isConflict === (event.target.value === 'true')
    // })
    // if (employeeFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   if (type === 'attendance')
    //   return data.employeeId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())

    //   if (type === 'rawAttendance')
    //   return data.accountId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())
    // })
    // if (userType === 'SUPER-ADMIN') if (companyFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.accountId._id['$oid'] === companyFilter.current.value
    // })
    // if (hourFilter.current.value !== '')
    // arr = arr.filter(data => {
    //   return data.attendanceDurationInHours === parseInt(hourFilter.current.value)
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?conflict=${event.target.value}`
    if (employeeFilter.current !== undefined) APIurl += `&search=${employeeFilter.current.value}`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
    if (hourFilter.current !== undefined) APIurl += `&hour=${hourFilter.current.value}`
    if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
    if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterDate = async (event) => {
    // let arr = []
    // let APIurl = type === 'payment' ? `/api/v1/payment?` : `/api/v1/attendance${type === 'rawAttendance' ? '/raw?' : '?'}`
    // if (dateStartFilter.current.value !== '') APIurl += `dateStart=${dateStartFilter.current.value}&`
    // if (dateEndFilter.current.value !== '') APIurl += `dateEnd=${dateEndFilter.current.value}`
    // const response = await axios.get(APIurl, {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // });
    // arr = response.data.data
    // if (type === 'payments') {
    //   if (companyFilter.current.value !== '')
    //   arr = arr.filter(data => {
    //     return data.accountId._id['$oid'] === companyFilter.current.value
    //   })
    //   if (subscriptionFilter.current.value !== '') 
    //   arr = arr.filter(data => {
    //     return subscriptionFilter.current.value === data.product
    //   })
    // }
    // if (type === 'rawAttendance' || type === 'attendance') {
    //   if (employeeFilter.current.value !== '')
    //   arr = arr.filter(data => {
    //     if (type === 'attendance')
    //     return data.employeeId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.employeeId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())
  
    //     if (type === 'rawAttendance')
    //     return data.accountId.firstName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.lastName.toLowerCase().includes(employeeFilter.current.value.toLowerCase()) || data.accountId.email.toLowerCase().includes(employeeFilter.current.value.toLowerCase())
    //   })
    //   if (type === 'rawAttendance')
    //   if (punchFilter.current.value !== '')
    //   arr = arr.filter(data => {
    //     return data.punchType === punchFilter.current.value
    //   })
    //   if (type === 'attendance') {
    //     if (conflictFilter.current.value !== '')
    //     arr = arr.filter(data => {
    //       return data.isConflict === (conflictFilter.current.value === 'true')
    //     })
    //     if (hourFilter.current.value !== '')
    //     arr = arr.filter(data => {
    //       return data.attendanceDurationInHours === parseInt(hourFilter.current.value)
    //     })
    // }
    // }
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?`
    if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
    if (subscriptionFilter.current !== undefined) APIurl += `&subscription=${subscriptionFilter.current.value}`
    if (employeeFilter.current !== undefined) APIurl += `&search=${employeeFilter.current.value}`
    if (hourFilter.current !== undefined) APIurl += `&hour=${hourFilter.current.value}`
    if (conflictFilter.current !== undefined) APIurl += `&conflict=${conflictFilter.current.value}`
    if (punchFilter.current !== undefined) APIurl += `&punch=${punchFilter.current.value}`
    if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
    if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }
  
  const filterSearchHelp = (event) => {
    // let arr = [];
    // arr = rows.filter(data => {
    //   return data.title.toLowerCase().includes(event.target.value.toLowerCase())
    // })
    // if (statusFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return data.status === statusFilter.current.value
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?search=${event.target.value}`
    if (statusFilter.current !== undefined) APIurl += `&status=${statusFilter.current.value}`
    APIurl += `&parent`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterStatus = (event) => {
    // let arr = [];
    // arr = rows.filter(data => {
    //   return data.status === event.target.value
    // })
    // if (searchHelpFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return (data.title.toLowerCase().includes(searchHelpFilter.current.value.toLowerCase()))
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?status=${event.target.value}`
    if (searchHelpFilter.current !== undefined) APIurl += `&search=${searchHelpFilter.current.value}`
    APIurl += `&parent`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterSearchSubscription = (event) => {
    // let arr = [];
    // arr = rows.filter(data => {
    //   return data.name.toLowerCase().includes(event.target.value.toLowerCase())
    // })
    // if (priceMinFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return parseInt(data.price) >= parseInt(priceMinFilter.current.value)
    // })
    // if (priceMaxFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return parseInt(data.price) <= parseInt(priceMaxFilter.current.value)
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?search=${event.target.value}`
    if (priceMaxFilter.current !== undefined) APIurl += `&priceMax=${priceMaxFilter.current.value}`
    if (priceMinFilter.current !== undefined) APIurl += `&priceMin=${priceMinFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterMinPrice = (event) => {
    // let arr = [];
    // if (event.target.value !== '') 
    // arr = rows.filter(data => {
    //   return parseInt(data.price) >= parseInt(event.target.value)
    // })
    // else arr = rows
    // if (searchSubscriptionFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return data.name.toLowerCase().includes(searchSubscriptionFilter.current.value.toLowerCase())
    // })
    // if (priceMaxFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return parseInt(data.price) <= parseInt(priceMaxFilter.current.value)
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?priceMin=${event.target.value}`
    if (searchSubscriptionFilter.current !== undefined) APIurl += `&search=${searchSubscriptionFilter.current.value}`
    if (priceMaxFilter.current !== undefined) APIurl += `&priceMax=${priceMaxFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  const filterMaxPrice = (event) => {
    // let arr = [];
    // if (event.target.value !== '') 
    // arr = rows.filter(data => {
    //   return parseInt(data.price) <= parseInt(event.target.value)
    // })
    // else arr = rows
    // if (searchSubscriptionFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return data.name.toLowerCase().includes(searchSubscriptionFilter.current.value.toLowerCase())
    // })
    // if (priceMinFilter.current.value !== '') 
    // arr = arr.filter(data => {
    //   return parseInt(data.price) >= parseInt(priceMinFilter.current.value)
    // })
    // setFilteredRows(arr);

    let APIurl = `/api/v1/${getAPIURL[title]}?priceMax=${event.target.value}`
    if (searchSubscriptionFilter.current !== undefined) APIurl += `&search=${searchSubscriptionFilter.current.value}`
    if (priceMinFilter.current !== undefined) APIurl += `&priceMin=${priceMinFilter.current.value}`

    setAPIURL(APIurl)
    
    filter(APIurl)
  }

  // useEffect(() => {
  //   // if (csvRows.length > 0)
  //   const csv = filteredRows.map(a => {return {...a}})
  //   const arr = []
  //   csv.forEach(row => {
  //     if (type === 'rawAttendance') {
  //       row.accountId = row.accountId._id !== undefined ? row.accountId._id['$oid'] : row.accountId
  //       row.userId = row.userId._id !== undefined ? row.userId._id['$oid'] : row.userId
  //     }
  //     if (type === 'attendance') {
  //       row.accountId = row.accountId._id !== undefined ? row.accountId._id['$oid'] : row.accountId
  //       row.employeeId = row.employeeId._id !== undefined ? row.employeeId._id['$oid'] : row.employeeId
  //       row.lastUpdatedByUserId = row.lastUpdatedByUserId._id !== undefined ? row.lastUpdatedByUserId._id['$oid'] : row.lastUpdatedByUserId
  //     }
  //     if (type === 'payment') {
  //       row.userId = row.userId._id !== undefined ? row.userId._id['$oid'] : row.userId
  //     }
  //     if (type === 'user' && title === 'Employee') {
  //       let rowCSV = {
  //         userId: row.id,
  //         name: row.firstName + ' ' + row.lastName,
  //         'company name': row.accountId.companyName,
  //         organisationId: row.accountId._id.$oid,
  //         'company address': row.accountId.companyAddress,
  //         filename: row.photo,
  //         'image url': window.location.host + '/api/v1/images/' + row.photo,
  //       }
  //       arr.push(rowCSV)
  //     }
  //     if (type === 'user' && title === 'User' && userType === 'SUPER-ADMIN') {
  //       let rowCSV = {
  //         userId: row.id,
  //         name: row.firstName + ' ' + row.lastName,
  //         'company name': row.companyName,
  //         'company address': row.companyAddress,
  //         filename: row.photo,
  //         'image url': window.location.host + '/api/v1/images/' + row.photo,
  //       }
  //       arr.push(rowCSV)
  //     }
  //   })
  //   if (type === 'user')
  //   setCsvRows(arr)
  //   else
  //   setCsvRows(csv)
  // }, [filteredRows])

  useEffect(() => {
    // setFilteredRows(rows.slice((pageNumber-1) * 10, rows.length > pageNumber * 10 ? pageNumber * 10 : rows.length))
    let url = APIURL === '' ? `/api/v1/${getAPIURL[title]}?` : APIURL
    filter(url+'&index='+(pageNumber-1)*10)
  }, [pageNumber])

    if (rows !== undefined && filteredRows !== undefined)
    return (
        <div class="container grid px-6 mx-auto">
            <h2
              class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
              {title}
            </h2>

            <h4
              class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
            >
              {description}
            </h4>
            
              <div class="md:flex items-center justify-between p-4 mb-8 text-sm font-semibold bg-white rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
              <div class="md:flex items-center">
                <div className='hidden md:block'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span>Filter</span>
                </div>
            {type==='user' &&
            <>
                 <div className='md:ml-10'>
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Search" 
                      onChange={filterSearchUser}
                      ref={searchUserFilter}
                      />
                  </div>
              </div>

              {(userType === 'SUPER-ADMIN' && title === 'User') &&
              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterSubscription}
                ref={subscriptionFilter}
                >
                  <option value="" disabled selected>Subscription</option>
                  {(() => {
                    let check = []
                    let arr = [];
                    rows.forEach(data => {
                      if (!check.includes(data.subscription.name)) {
                        arr.push(<option value={data.subscription.name}>{data.subscription.name}</option>)
                        check.push(data.subscription.name)
                      }
                    })
                    return arr
                    })()}
                </select>
              </label>
              }

              {(userType === 'SUPER-ADMIN' && title === 'Employee') &&
              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterCompany}
                ref={companyFilter}
                >
                  <option value="" disabled selected>Company</option>
                  {(() => {
                    let check = []
                    let arr = [];
                    rows.forEach(data => {
                      if (!check.includes(data.accountId._id['$oid'])) {
                        arr.push(<option value={data.accountId._id['$oid']}>{data.accountId.companyName}</option>)
                        check.push(data.accountId._id['$oid'])
                      }
                    })
                    return arr
                    })()}
                </select>
              </label>
              }

              <label class="block text-sm md:ml-5">
                <select class="mt-5 md:mt-0 block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterActive}
                ref={activeFilter}
                >
                  <option value="" disabled selected>Status</option>
                  <option value='true'>Active</option>
                  <option value='false'>Inactive</option>
                </select>
              </label>
            </>
            }
            
            {type==='attendance' &&
            <>
            
            <div className='md:ml-10'>
                  <label for="simple-search" class="sr-only">Search Employee</label>
                  <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Search Employee" 
                      onChange={filterEmployee}
                      ref={employeeFilter}
                      />
                  </div>
              </div>

              {userType === 'SUPER-ADMIN' &&
              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterCompany}
                ref={companyFilter}
                >
                  <option value="" disabled selected>Company</option>
                  {(() => {
                    let check = []
                    let arr = [];
                    rows.forEach(data => {
                      if (!check.includes(data.accountId._id['$oid'])) {
                        arr.push(<option value={data.accountId._id['$oid']}>{data.accountId.companyName}</option>)
                        check.push(data.accountId._id['$oid'])
                      }
                    })
                    return arr
                    })()}
                </select>
              </label>
              }

              
              <div className='mt-5 md:mt-0 md:ml-5'>
                  <label for="simple-search" class="sr-only">Hour</label>
                  <div class="relative w-28">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      </div>
                      <input type="number" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Hour" 
                      min='0'
                      onChange={filterHour}
                      ref={hourFilter}
                      />
                  </div>
              </div>


              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterConflict}
                ref={conflictFilter}
                >
                  <option value="" disabled selected>Conflict</option>
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </label>
              
              <div class="mt-5 md:mt-0 flex items-center">
                <span class="mx-4">Date from</span>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input name="start" type="date" ref={dateStartFilter} onChange={filterDate} class="bg-gray-50 border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 block w-full pl-10 p-2.5 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <span class="mx-4">to</span>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input name="end" type="date" ref={dateEndFilter} onChange={filterDate} class="bg-gray-50 border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 block w-full pl-10 p-2.5 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              </div>
            </>
            }

            {type==='rawAttendance' &&
            <>
              <div className='md:ml-10'>
                  <label for="simple-search" class="sr-only">Search Employee</label>
                  <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Search Employee" 
                      onChange={filterEmployee}
                      ref={employeeFilter}
                      />
                  </div>
              </div>

              {userType === 'SUPER-ADMIN' &&
              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterCompany}
                ref={companyFilter}
                >
                  <option value="" disabled selected>Company</option>
                  {(() => {
                    let check = []
                    let arr = [];
                    rows.forEach(data => {
                      if (!check.includes(data.accountId._id['$oid'])) {
                        arr.push(<option value={data.accountId._id['$oid']}>{data.accountId.companyName}</option>)
                        check.push(data.accountId._id['$oid'])
                      }
                    })
                    return arr
                    })()}
                </select>
              </label>
              }

              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterPunch}
                ref={punchFilter}
                >
                  <option value="" disabled selected>Punch Type</option>
                  <option value='PUNCH-IN'>PUNCH-IN</option>
                  <option value='PUNCH-OUT'>PUNCH-OUT</option>
                </select>
              </label>
              
              <div class="mt-5 md:mt-0 flex items-center">
                <span class="mx-4">Date from</span>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input name="start" type="date" ref={dateStartFilter} onChange={filterDate} class="bg-gray-50 border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 block w-full pl-10 p-2.5 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <span class="mx-4">to</span>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input name="end" type="date" ref={dateEndFilter} onChange={filterDate} class="bg-gray-50 border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 block w-full pl-10 p-2.5 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              </div>
            </>
            }

            {type==='subscription' &&
            <>
                 <div className='md:ml-10'>
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Search" 
                      onChange={filterSearchSubscription}
                      ref={searchSubscriptionFilter}
                      />
                  </div>
              </div>

              
              <div class="mt-5 md:mt-0 flex items-center">
                <span class="mx-4">Min</span>
                  <div class="relative w-21">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      ₹
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Price" 
                      onChange={filterMinPrice}
                      ref={priceMinFilter}
                      />
                  </div>
                <span class="mx-4">Max</span>
                  <div class="relative w-21">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      ₹
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Price" 
                      onChange={filterMaxPrice}
                      ref={priceMaxFilter}
                      />
                  </div>
              </div>
            </>
            }

            {type==='payment' &&
            <>

              <label class="block text-sm md:ml-10">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterCompany}
                ref={companyFilter}
                >
                  <option value="" disabled selected>User</option>
                  {(() => {
                    let check = []
                    let arr = [];
                    rows.forEach(data => {
                      if (!check.includes(data.orgAccountId._id['$oid'])) {
                        arr.push(<option value={data.orgAccountId._id['$oid']}>{data.orgAccountId.companyName}</option>)
                        check.push(data.orgAccountId._id['$oid'])
                      }
                    })
                    return arr
                    })()}
                </select>
              </label>
              
              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterSubscription}
                ref={subscriptionFilter}
                >
                  <option value="" disabled selected>Subscription</option>
                  {(() => {
                    let check = []
                    let arr = [];
                    rows.forEach(data => {
                      if (!check.includes(data.product)) {
                        arr.push(<option value={data.product}>{data.product}</option>)
                        check.push(data.product)
                      }
                    })
                    return arr
                    })()}
                </select>
              </label>


              <div class="mt-5 md:mt-0 flex items-center">
                <span class="mx-4">Date from</span>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input name="start" type="date" ref={dateStartFilter} onChange={filterDate} class="bg-gray-50 border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 block w-full pl-10 p-2.5 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <span class="mx-4">to</span>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input name="end" type="date" ref={dateEndFilter} onChange={filterDate} class="bg-gray-50 border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 block w-full pl-10 p-2.5 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              </div>
              </>
            }

            {type==='help' &&
            <>
                 <div className='md:ml-10'>
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Search" 
                      onChange={filterSearchHelp}
                      ref={searchHelpFilter}
                      />
                  </div>
              </div>

              <label class="mt-5 md:mt-0 block text-sm md:ml-5">
                <select class="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={filterStatus}
                ref={statusFilter}
                >
                  <option value="" disabled selected>Status</option>
                  <option value='OPEN'>Open</option>
                  <option value='RESOLVED'>Resolved</option>
                  <option value='BLOCKED'>Blocked</option>
                </select>
              </label>
            </>
            }

              <button class="mt-5 md:mt-0 md:ml-5 flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-slate-600 border border-transparent rounded-lg active:bg-slate-600 hover:bg-slate-700 focus:outline-none focus:shadow-outline-purple"
              onClick={() => {
                if (type === 'user') {
                  searchUserFilter.current.value = ''
                  activeFilter.current.value = ''
                  if (userType === 'SUPER-ADMIN' && title === 'Employee') companyFilter.current.value = ''
                }
                if (type === 'attendance' || type === 'rawAttendance') {
                  if (userType === 'SUPER-ADMIN') companyFilter.current.value = ''
                  employeeFilter.current.value = ''
                  if (type === 'rawAttendance') punchFilter.current.value = ''
                  if (type === 'attendance') hourFilter.current.value = ''
                  if (type === 'attendance') conflictFilter.current.value = ''
                  dateStartFilter.current.value = ''
                  dateEndFilter.current.value = ''
                }
                if (type === 'subscription') {
                  searchSubscriptionFilter.current.value = ''
                  priceMinFilter.current.value = ''
                  priceMaxFilter.current.value = ''
                }
                if (type === 'payment') {
                  companyFilter.current.value = ''
                  subscriptionFilter.current.value = ''
                  dateStartFilter.current.value = ''
                  dateEndFilter.current.value = ''
                }
                if (type === 'help') {
                  searchHelpFilter.current.value = ''
                  statusFilter.current.value = ''
                }
                setFilteredRows(rows)
              }}
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                  <span>Reset filter</span>
                </button>

              </div>
            </div>

            {(type === 'rawAttendance' || type === 'payment' || type === 'attendance') &&
            (userType === 'SUPER-ADMIN' || userType === 'ORG-ADMIN') &&
            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">             
            <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div class="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                </div>
                <div>
                  <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total {title} per filter
                  </p>
                  <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {filteredRows.length}
                  </p>
                </div>
              </div>
              
              {type === 'payment' &&
              <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

                </div>
                <div>
                  <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total revenue per filter
                  </p>
                  <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  ₹{(() => {
                            let total = 0;
                            filteredRows.forEach(data => {
                              total += data.paid;
                            })
                            return total
                        })()}
                  </p>
                </div>
              </div>
              }
            </div>
            }

            <div class="w-full overflow-hidden rounded-lg shadow-xs">
              <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    >
                      {(() => {
                        let arr = [];
                        columns.forEach(columnName => {
                            arr.push(<th class="px-4 py-3">{columnName}</th>)
                        })
                        return arr
                        })()}
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    {type === 'user' &&
                    (() => {
                        let arr = [];
                        filteredRows.forEach(data => {
                            arr.push(
                                <tr class="text-gray-700 dark:text-gray-400">
                                  
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                        
                                        <div
                                            class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                                        >
                                            <img
                                            class="object-cover w-full h-full rounded-full"
                                            src={'/api/v1/images/'+data.photo}
                                            alt=""
                                            loading="lazy"
                                            />
                                            <div
                                            class="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                            ></div>
                                        </div>
                                        <div>
                                            <p class="font-semibold">{data.firstName} {data.lastName}</p>
                                            <p class="text-xs text-gray-600 dark:text-gray-400">
                                            {data.email}
                                            </p>
                                        </div>
                                        </div>
                                    </td>
                                    
                                    
                                    {(data.companyName !== null && data.companyName !== undefined) &&
                                    <td class="px-4 py-3 text-sm">
                                        {data.companyName}
                                    </td>
                                    }
                                    {(data.subscription !== null && data.subscription !== undefined) &&
                                    <td class="px-4 py-3 text-sm">
                                        {data.subscription.name}
                                    </td>
                                    }
                                    {(data.accountId !== null && data.accountId !== undefined) &&
                                    <td class="px-4 py-3 text-sm">
                                        {data.accountId.companyName}
                                    </td>
                                    }
                                    
                                    <td class="px-4 py-3 text-xs">
                                        {data.isActive ? 
                                        <span
                                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                                        >
                                        Active
                                        </span>
                                        :
                                        <span 
                                        class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                                        Inactive
                                        </span>
                                        }
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="message"
                                            onClick={() => {
                                              navigate(`/view?id=${data.id}&userType=${data.userType}`)
                                              changePage('User Form')
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Edit"
                                            onClick={() => {
                                              navigate(`/edit?id=${data.id}&userType=${data.userType}`)
                                              changePage('User Form')
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                            ></path>
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Delete"
                                            onClick={() => {
                                              let choice = window.confirm("Are you sure you want to delete?");
                                              if (choice) {
                                                const userAPI = {
                                                  'SUPER-ADMIN': 'superadmin',
                                                  'ORG-ADMIN': 'user',
                                                  'ORG-USER': 'orguser'
                                              }
                                                axios.delete(`/api/v1/${userAPI[data.userType]}`, {
                                                  data : {
                                                    userId: data.id
                                                  },
                                                    headers: {
                                                      'Authorization': `Bearer ${token}`
                                                    },
                                                }
                                                )
                                                .then(res => {
                                                  window.location.reload();
                                                })
                                              }
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                            </svg>
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        return arr
                    })()}

                    {type === 'attendance' &&
                    (() => {
                        let arr = [];
                        filteredRows.forEach(data => {
                            arr.push(
                                <tr class="text-gray-700 dark:text-gray-400">

                                    <td class="px-4 py-3 text-sm">
                                        {data.recordForAttendanceDate}
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                        
                                        <div
                                            class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                                        >
                                            <img
                                            class="object-cover w-full h-full rounded-full"
                                            src={'/api/v1/images/'+data.employeeId.photo}
                                            alt=""
                                            loading="lazy"
                                            />
                                            <div
                                            class="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                            ></div>
                                        </div>
                                        <div>
                                            <p class="font-semibold">{data.employeeId.firstName} {data.employeeId.lastName}</p>
                                            <p class="text-xs text-gray-600 dark:text-gray-400">
                                            {data.employeeId.email}
                                            </p>
                                        </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.firstPunchInTimeStamp.split(' ')[1]}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.lastPuchOutTimeStamp.split(' ')[1]}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.attendanceDurationInHours}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.accountId.companyName}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.comment}
                                    </td>
                                    <td class="px-4 py-3 text-xs">
                                        {data.isConflict ? 
                                        <span 
                                        class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                                        Yes
                                        </span>
                                        :
                                        <span
                                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                                        >
                                        No
                                        </span>
                                        }
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="message"
                                            onClick={() => {
                                              navigate(`/view?attendanceType=processed&id=${data.id}`)
                                              changePage('Attendance Form')
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Edit"
                                            onClick={() => {
                                              navigate(`/edit?id=${data.id}&attendanceType=processed`)
                                              changePage('Attendance Form')
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                            ></path>
                                            </svg>
                                        </button>
                                        { userType === 'SUPER-ADMIN' &&
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Delete"
                                            onClick={() => {
                                              let choice = window.confirm("Are you sure you want to delete?");
                                              if (choice)
                                              axios.delete(`/api/v1/attendance`, {
                                                data : {
                                                  attendanceId: data.id
                                                },
                                                  headers: {
                                                    'Authorization': `Bearer ${token}`
                                                  },
                                              }
                                              )
                                              .then(res => {
                                                window.location.reload();
                                              })
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                            </svg>
                                        </button>
                                        }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        return arr
                    })()}

                    {type === 'rawAttendance' &&
                    (() => {
                        let arr = [];
                        filteredRows.forEach(data => {
                            arr.push(
                                <tr class="text-gray-700 dark:text-gray-400">

                                    <td class="px-4 py-3 text-sm">
                                        {data.timeStamp}
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                        
                                        <div
                                            class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                                        >
                                            <img
                                            class="object-cover w-full h-full rounded-full"
                                            src={'/api/v1/images/'+data.userId.photo}
                                            alt=""
                                            loading="lazy"
                                            />
                                            <div
                                            class="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                            ></div>
                                        </div>
                                        <div>
                                            <p class="font-semibold">{data.userId.firstName} {data.userId.lastName}</p>
                                            <p class="text-xs text-gray-600 dark:text-gray-400">
                                            {data.userId.email}
                                            </p>
                                        </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.punchType}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.GPSLoc}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.punchedByDeviceId}
                                    </td>
                                    {userType === 'SUPER-ADMIN' &&
                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="message"
                                            onClick={() => {
                                              navigate(`/view?attendanceType=raw&id=${data.id}`)
                                              changePage('Attendance Form')
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Edit"
                                            onClick={() => {
                                              navigate(`/edit?id=${data.id}&attendanceType=raw`)
                                              changePage('Attendance Form')
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                            ></path>
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Delete"
                                            onClick={() => {
                                              let choice = window.confirm("Are you sure you want to delete?");
                                              if (choice)
                                              axios.delete(`/api/v1/attendance/raw`, {
                                                data : {
                                                  rawAttendanceId: data.id
                                                },
                                                  headers: {
                                                    'Authorization': `Bearer ${token}`
                                                  },
                                              }
                                              )
                                              .then(res => {
                                                window.location.reload();
                                              })
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                            </svg>
                                        </button>
                                        </div>
                                    </td>
                                    }
                                </tr>
                            )
                        })
                        return arr
                    })()}

                    {type === 'subscription' &&
                    (() => {
                        let arr = [];
                        filteredRows.forEach(data => {
                            arr.push(
                                <tr class="text-gray-700 dark:text-gray-400">

                                    <td class="px-4 py-3 text-sm">
                                        {data.name}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        ₹{data.price}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.duration}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.offerPrice !== null ? `₹${data.offerPrice}` : '-'}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.description}
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="message"
                                            onClick={() => {
                                              navigate(`/view?id=${data.id}`)
                                              changePage('Subscription Form')
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Edit"
                                            onClick={() => {
                                              navigate(`/edit?id=${data.id}`)
                                              changePage('Subscription Form')
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                            ></path>
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Delete"
                                            onClick={() => {
                                              let choice = window.confirm("Are you sure you want to delete?");
                                              if (choice)
                                              axios.delete(`/api/v1/subscription`, {
                                                data : {
                                                  subscriptionId: data.id
                                                },
                                                  headers: {
                                                    'Authorization': `Bearer ${token}`
                                                  },
                                              }
                                              )
                                              .then(res => {
                                                window.location.reload();
                                              })
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                            </svg>
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        return arr
                    })()}

                    {type === 'payment' &&
                    (() => {
                        let arr = [];
                        filteredRows.forEach(data => {
                            arr.push(
                                <tr class="text-gray-700 dark:text-gray-400">

                                    <td class="px-4 py-3 text-sm">
                                        {data.timeStamp}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        
                                        <div class="flex items-center text-sm">
                        
                                        <div
                                            class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                                        >
                                            <img
                                            class="object-cover w-full h-full rounded-full"
                                            src={'/api/v1/images/'+data.orgAccountId.photo}
                                            alt=""
                                            loading="lazy"
                                            />
                                            <div
                                            class="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                            ></div>
                                        </div>
                                        <div>
                                            <p class="font-semibold">{data.orgAccountId.firstName} {data.orgAccountId.lastName}</p>
                                            <p class="text-xs text-gray-600 dark:text-gray-400">
                                            {data.orgAccountId.email}
                                            </p>
                                        </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {data.product}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        ₹{data.price}
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="message"
                                            onClick={() => {
                                              navigate(`/view?id=${data.id}`)
                                              changePage('Payment Form')
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Edit"
                                            onClick={() => {
                                              navigate(`/edit?id=${data.id}`)
                                              changePage('Payment Form')
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                            ></path>
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Delete"
                                            onClick={() => {
                                              let choice = window.confirm("Are you sure you want to delete?");
                                              if (choice)
                                              axios.delete(`/api/v1/payment`, {
                                                data : {
                                                  transactionId: data.id
                                                },
                                                  headers: {
                                                    'Authorization': `Bearer ${token}`
                                                  },
                                              }
                                              )
                                              .then(res => {
                                                window.location.reload();
                                              })
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                            </svg>
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        return arr
                    })()}

                    {type === 'help' &&
                    (() => {
                        let arr = [];
                        filteredRows.forEach(data => {
                            arr.push(
                                <tr class="text-gray-700 dark:text-gray-400">

                                    <td class="px-4 py-3 text-sm">
                                      {
                                        data.status !== 'RESOLVED' ?
                                        <b>
                                          {data.title}
                                        </b>
                                        :
                                        <>
                                        {data.title}
                                        </>
                                      }
                                    </td>
                                    
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                        
                                        <div
                                            class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                                        >
                                            <img
                                            class="object-cover w-full h-full rounded-full"
                                            src={'/api/v1/images/'+data.userId.photo}
                                            alt=""
                                            loading="lazy"
                                            />
                                            <div
                                            class="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                            ></div>
                                        </div>
                                        <div>
                                            <p class="font-semibold">{data.userId.firstName} {data.userId.lastName}</p>
                                            <p class="text-xs text-gray-600 dark:text-gray-400">
                                            {data.userId.email}
                                            </p>
                                        </div>
                                        </div>
                                    </td>

                                    
                                      {data.status === "OPEN" &&
                                    <td class="px-4 py-3 text-xs">
                                        <span 
                                        class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                                          {data.status}
                                        </span>
                                        </td>}
                                        {data.status === "RESOLVED" &&
                                    <td class="px-4 py-3 text-xs">
                                        <span 
                                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-700">
                                          {data.status}
                                        </span>
                                        </td>}
                                        {data.status === "BLOCKED" &&
                                    <td class="px-4 py-3 text-xs">
                                        <span 
                                        class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-700">
                                          {data.status}
                                        </span>
                                        </td>}

                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="message"
                                            onClick={() => {
                                              navigate(`/message?id=${data.id}`)
                                              changePage('View Help Ticket')
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </button>
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Edit"
                                            onClick={() => {
                                              navigate(`/edit?id=${data.id}`)
                                              changePage('Help Form')
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                            ></path>
                                            </svg>
                                        </button>
                                        {userType === 'SUPER-ADMIN' &&
                                        <button
                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            aria-label="Delete"
                                            onClick={() => {
                                              let choice = window.confirm("Are you sure you want to delete?");
                                              if (choice)
                                              axios.delete(`/api/v1/help`, {
                                                data : {
                                                  helpId: data.id
                                                },
                                                  headers: {
                                                    'Authorization': `Bearer ${token}`
                                                  },
                                              }
                                              )
                                              .then(res => {
                                                window.location.reload();
                                              })
                                            }}
                                        >
                                            <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                            </svg>
                                        </button>
                                        }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        return arr
                    })()}

                  </tbody>
                </table>
              </div>
              <div
                class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
              >
                <span class="flex items-center col-span-3">
                  {/* Showing {1 + (pageNumber-1) * 10}-{rows.length > pageNumber * 10 ? pageNumber * 10 : rows.length} of {rows.length} */}
                  {!isLoading ? `Showing ${1 + (pageNumber-1) * 10}-${filteredRows.length + (pageNumber-1) * 10} of ${filteredRows.length + (pageNumber-1) * 10}` : 'Loading...'}
                </span>
                <span class="col-span-2"></span>
                <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                  <nav aria-label="Table navigation">
                    <ul class="inline-flex items-center">
                      <li>
                        <button
                          class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Previous"
                          onClick={() => {
                            pageNumber > 1 &&
                            setPageNumber(pageNumber - 1)
                          }}
                        >
                          <svg
                            class="w-4 h-4 fill-current"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </li>
                      <li>
                        <button
                          class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                        >
                          {pageNumber}
                        </button>
                      </li>
                      <li>
                        <button
                          class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Next"
                          onClick={() => {
                            // pageNumber * 10 < rows.length &&
                            setPageNumber(pageNumber + 1)
                          }}
                        >
                          <svg
                            class="w-4 h-4 fill-current"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </span>
              </div>
            </div>
            <div class='flex mt-5 mb-10'>
            {(type === 'user' || type === 'help' || userType === 'SUPER-ADMIN' || (type === 'attendance' && userType !== 'ORG-USER')) &&
            // ((userType === 'SUPER-ADMIN' && title !== 'User' && title !== 'Employee') || (userType === 'ORG-ADMIN')) &&
            <>
              <button onClick={() => {
                if (type === 'user') {
                  navigate(`/create?userType=${link[title]}`)
                  changePage('User Form')
                }
                if (type === 'rawAttendance') {
                  navigate(`/create?attendanceType=raw`)
                  changePage('Attendance Form')
                }
                if (type === 'attendance') {
                  navigate(`/create?attendanceType=processed`)
                  changePage('Attendance Form')
                }
                if (type === 'subscription') {
                  navigate(`/create`)
                  changePage('Subscription Form')
                }
                if (type === 'payment') {
                  navigate(`/create`)
                  changePage('Payment Form')
                }
                if (type === 'help') {
                  navigate(`/create`)
                  changePage('Help Form')
                }
              }} class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2 -ml-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d={type === 'user' ? "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" : 'M12 4.5v15m7.5-7.5h-15'}/>
                </svg>

                <span>Create {title}</span>

              </button>
            </>
            }

            {(type === 'rawAttendance' || type === 'payment' || type === 'attendance') &&
            (userType === 'SUPER-ADMIN' || userType === 'ORG-ADMIN') &&
              <div className={userType === 'SUPER-ADMIN' ? 'ml-5' : type === 'attendance' ? 'ml-5' : ''}>
                {(userType === 'ORG-ADMIN' && type !== 'payment' && free) ?
              <button onClick={() => {
                window.location.href = '/subscription'
              }} class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 -ml-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>


                <span>Download</span>

              </button>
              :
//               <CSVLink data={csvRows} filename={`${title} Report.csv`}>
//               <button class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 -ml-1">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
// </svg>


//                 <span>Download</span>

//               </button>
//               </CSVLink>


              <button onClick={async () => {
                let APIurl = `/api/v1/${getAPIURL[title]}?download`
                if (employeeFilter.current !== undefined) APIurl += `&search=${employeeFilter.current.value}`
                if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
                if (hourFilter.current !== undefined) APIurl += `&hour=${hourFilter.current.value}`
                if (conflictFilter.current !== undefined) APIurl += `&conflict=${conflictFilter.current.value}`
                if (punchFilter.current !== undefined) APIurl += `&punch=${punchFilter.current.value}`
                if (dateStartFilter.current !== undefined) APIurl += `&dateStart=${dateStartFilter.current.value}`
                if (dateEndFilter.current !== undefined) APIurl += `&dateEnd=${dateEndFilter.current.value}`

                try {
                  const token = Cookies.get('token')
                  const response = await axios.get(APIurl, {
                      headers: {
                          'Authorization': `Bearer ${token}`
                      }
                  });

                  const type = 'text/csv';
                  const blob = new Blob([response.data], {type: type});
                  const url = URL.createObjectURL(blob);

                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${title} Report.csv`;
                  a.click(); // triggering it manually
                  a.removeChild()
                  a.revokeObjectURL()
                } catch (error) {
                  if (error.response.status === 401) navigate('/login');
                }

              }} class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 -ml-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>Download</span>
              </button>
}
              </div>
            }

            {(type === 'user' && title !== 'Super Admin') &&
              <div className='ml-5'>
                {(userType === 'ORG-ADMIN' && free) ?
              <button onClick={() => {
                window.location.href = '/subscription'
              }} class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 -ml-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>


                <span>Download Image List</span>

              </button>
              :
//               <CSVLink data={csvRows} filename={`Employee Image List.csv`}>
//               <button class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 -ml-1">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
// </svg>


//                 <span>Download Image List</span>

//               </button>
//               </CSVLink>


              <button onClick={async () => {
                let APIurl = `/api/v1/${getAPIURL[title]}?download`
                if (searchUserFilter.current !== undefined) APIurl += `&search=${searchUserFilter.current.value}`
                if (subscriptionFilter.current !== undefined) APIurl += `&subscription=${subscriptionFilter.current.value}`
                if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
                if (activeFilter.current !== undefined) APIurl += `&isActive=${activeFilter.current.value}`

                try {
                  const token = Cookies.get('token')
                  const response = await axios.get(APIurl, {
                      headers: {
                          'Authorization': `Bearer ${token}`
                      }
                  });

                  const type = 'text/csv';
                  const blob = new Blob([response.data], {type: type});
                  const url = URL.createObjectURL(blob);

                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${title} Image List.csv`;
                  a.click(); // triggering it manually
                  a.removeChild()
                  a.revokeObjectURL()
                } catch (error) {
                  if (error.response.status === 401) navigate('/login');
                }

              }} class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 -ml-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>Download Image List</span>
              </button>
}
              </div>
            }
            </div>
          </div>
    )
}