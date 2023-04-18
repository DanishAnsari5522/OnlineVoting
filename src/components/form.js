import { useState, useEffect, useRef } from'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ImageUploader from './image'

export default function Form({type, userId, userType, changePage}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // User input fields
    const nameInput = useRef();
    const [photo, setPhoto] = useState();
    const usernameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const subscriptionInput = useRef();
    const streetInput = useRef();
    const cityInput = useRef();
    const stateInput = useRef();
    const pinInput = useRef();
    const isActiveInput = useRef();
    const [companyLogo, setCompanyLogo] = useState();
    const companyNameInput = useRef();
    const companyStreetInput = useRef();
    const companyCityInput = useRef();
    const companyStateInput = useRef();
    const companyPinInput = useRef();
    const accountIdInput = useRef();

    // Raw attendance input fields
    const userIdInput = useRef();
    const punchTypeInput = useRef();
    const timeStampInput = useRef();
    const GPSLocInput = useRef();
    const punchedByDeviceIdInput = useRef();

    // Processed attendance input fields
    const firstPunchInTimeStampInput = useRef();
    const lastPuchOutTimeStampInput = useRef();
    const attendanceDurationInHoursInput = useRef();
    const recordForAttendanceDateInput = useRef();
    const commentInput = useRef();
    const employeeIdInput = useRef();
    // const accountIdInput = useRef();
    const isConflictInput = useRef();
    // const lastUpdatedByUserIdInput = useRef();
    // const createdAtInput = useRef();

    // Subscription input fields
    const titleInput = useRef();
    const priceInput = useRef();
    const durationInput = useRef();
    const offerPriceInput = useRef();
    const descInput = useRef();

    // Payment input fields
    const productInput = useRef();
    const paymentMethodInput = useRef();
    const referenceInput = useRef();
    const paidInput = useRef();
    const discountInput = useRef();

    // Help ticket input fields
    // const titleInput = useRef();
    const createdByInput = useRef();
    const statusInput = useRef();

    const [user, setUser] = useState();
    const [company, setCompany] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [attendance, setAttendance] = useState();
    const [subscription, setSubscription] = useState([]);
    const [payment, setPayment] = useState();
    const [help, setHelp] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const createUser = async () => {

      if (emailInput.current.value === '') {
        setError('Email cannot be empty')
        return
      }

      if (passwordInput.current.value === '') {
        setError('Password cannot be empty')
        return
      }

        const userAPI = {
            'SUPER-ADMIN': 'superadmin',
            'ORG-ADMIN': 'user',
            'ORG-USER': 'orguser'
        }

        let APIurl = `/api/v1/${userAPI[searchParams.get("userType")]}`
        const token = Cookies.get('token')
        let payload = {
            firstName: nameInput.current.value.substring(0, nameInput.current.value.indexOf(' ')),
            lastName: nameInput.current.value.substring(nameInput.current.value.indexOf(' ')+1),
            username: usernameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            address: {
              street: streetInput.current.value,
              city: cityInput.current.value,
              state: stateInput.current.value,
              pin: pinInput.current.value,
            }
        }

      if (photo !== undefined) {
          const formData = new FormData();
          formData.append('file', photo);
      
          let response = await axios.post('/api/v1/upload', formData, {
              headers: {
              'Content-Type': 'multipart/form-data'
              }
          })
          payload['photo'] = response.data.filename
          payload['imageRelativePath'] = response.data.relativePath
      }
        if (searchParams.get('userType') === 'ORG-ADMIN') {
          if (companyNameInput.current.value === '') {
            setError('Company name cannot be empty')
            return
          }
            payload['companyName'] = companyNameInput.current.value
            payload['companyAddress'] = {
              street: companyStreetInput.current.value,
              city: companyCityInput.current.value,
              state: companyStateInput.current.value,
              pin: companyPinInput.current.value,
            }

            if (companyLogo !== undefined) {
              const formData = new FormData();
              formData.append('file', companyLogo);
          
              let response = await axios.post('/api/v1/upload', formData, {
                  headers: {
                  'Content-Type': 'multipart/form-data'
                  }
              })
              payload['companyLogo'] = response.data.filename
            }
        }
        if (searchParams.get('userType') === 'ORG-USER') {
          payload['accountId'] = userType === 'SUPER-ADMIN' ? accountIdInput.current.value : userId
      }
        axios.post(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
          if (searchParams.get('userType') === 'SUPER-ADMIN') {
            window.location.href = '/superadmin'
          }
          if (searchParams.get('userType') === 'ORG-ADMIN') {
            window.location.href = '/users'
          }
          if (searchParams.get('userType') === 'ORG-USER') {
            window.location.href = '/employee'
          }
        })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
    }

    const createAttendance = () => {
        let APIurl = `/api/v1/attendance${searchParams.get("attendanceType") === 'raw' ? '/raw' : ''}`
        const token = Cookies.get('token')
        let Id = null
        const e = employee.filter(e => {
          return `${e.firstName} ${e.lastName}` === userIdInput.current.value
        })
        if (e.length > 0) {
          Id = e[0].id
        }
        let payload = searchParams.get("attendanceType") === 'raw' ? {
            userId: Id,
            punchType: punchTypeInput.current.value,
            timeStamp: timeStampInput.current.value.split('T')[0]+' '+timeStampInput.current.value.split('T')[1]+':00',
            GPSLoc: GPSLocInput.current.value,
            punchedByDeviceId: punchedByDeviceIdInput.current.value
        } : {
            firstPunchInTimeStamp: recordForAttendanceDateInput.current.value + ' ' + firstPunchInTimeStampInput.current.value + ':00',
            lastPuchOutTimeStamp: recordForAttendanceDateInput.current.value + ' ' + lastPuchOutTimeStampInput.current.value + ':00',
            attendanceDurationInHours: attendanceDurationInHoursInput.current.value,
            recordForAttendanceDate: recordForAttendanceDateInput.current.value,
            comment: commentInput.current.value,
            employeeId: Id,
            isConflict: isConflictInput.current.checked,
            lastUpdatedByUserId: userId
        }
        axios.post(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
          if (searchParams.get("attendanceType") === 'raw')
            window.location.href = '/raw_attendance'
          
          if (searchParams.get("attendanceType") === 'processed')
            window.location.href = '/processed_attendance'
        })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
    }

    const createSubscription = () => {
        let APIurl = `/api/v1/subscription`
        const token = Cookies.get('token')
        let payload = {
            name: titleInput.current.value,
            price: priceInput.current.value,
            duration: durationInput.current.value,
            offerPrice: offerPriceInput.current.value,
            description: descInput.current.value,
        }
        axios.post(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            window.location.href = '/subscription'
        })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
    }

    const createPayment = () => {
      if (timeStampInput.current.value === '') {
        setError('Error: date not provided')
        return
      }
      if (paidInput.current.value === '') {
        setError('Error: total paid not provided')
        return
      }
      let productDetails = subscription.find(subscription => subscription.name === productInput.current.value)
      let now = new Date();
      productDetails['startTimeStamp'] = now.toISOString()
      productDetails['endTimeStamp'] = new Date(now.getFullYear(), now.getMonth()+(productDetails.duration === 'month' ? 1 : 12 ), now.getDate())
      delete productDetails._id

      let APIurl = `/api/v1/payment`
      const token = Cookies.get('token')
      let payload = {
          timeStamp: timeStampInput.current.value.split('T')[0]+' '+timeStampInput.current.value.split('T')[1]+':00',
          orgAccountId: userIdInput.current.value,
          lastUpdatedByUserId: userId,
          product: productInput.current.value,
          productDetails: productDetails,
          paymentMethod: paymentMethodInput.current.value,
          reference: referenceInput.current.value,
          comment: commentInput.current.value,
          price: priceInput.current.value,
          paid: paidInput.current.value,
          discount: discountInput.current.value,
      }
      axios.post(APIurl, payload, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(() => {
        let APIurl = `/api/v1/profile`
        const token = Cookies.get('token')
        let payload = {
          id: userIdInput.current.value,
          subscription: {name: productInput.current.value}
        }
        axios.post(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            window.location.href = '/payment'
        })
      })
      .catch(err => {
        setError(`Error: ${err.response.data.message}`)
      })
    }

    const createHelp = () => {
        let APIurl = `/api/v1/help`
        const token = Cookies.get('token')
        let payload = {
            title: titleInput.current.value,
            userId: userType === 'SUPER-ADMIN' ? createdByInput.current.value : userId,
            // status: 'OPEN',
        }
        axios.post(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            window.location.href = '/help'
        })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
    }

    const editUser = async () => {

      if (emailInput.current.value === '') {
        setError('Email cannot be empty')
        return
      }

      if (passwordInput.current.value === '') {
        setError('Password cannot be empty')
        return
      }

      let APIurl = `/api/v1/profile`
      const token = Cookies.get('token')
      let payload = {
        id: searchParams.get("id") || userId,
        firstName: nameInput.current.value.substring(0, nameInput.current.value.indexOf(' ')),
        lastName: nameInput.current.value.substring(nameInput.current.value.indexOf(' ')+1),
        username: usernameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
        address: {
          street: streetInput.current.value,
          city: cityInput.current.value,
          state: stateInput.current.value,
          pin: pinInput.current.value,
        }
      }
      if (nameInput.current.value.substring(0, nameInput.current.value.indexOf(' ')) === '') {
        payload['firstName'] = nameInput.current.value
        payload['lastName'] = ''
      }
        if (searchParams.get("id") !== null)
        payload['isActive'] = isActiveInput.current.checked

      if (photo !== undefined) {
        const formData = new FormData();
        formData.append('file', photo);
    
        let response = await axios.post('/api/v1/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        payload['photo'] = response.data.filename
        payload['imageRelativePath'] = response.data.relativePath
      }
    if (searchParams.get('userType') === 'ORG-ADMIN' || (userType === 'ORG-ADMIN' && searchParams.get('userType') !== 'ORG-USER')) {
          if (companyNameInput.current.value === '') {
            setError('Company name cannot be empty')
            return
          }
        payload['companyName'] = companyNameInput.current.value
        payload['companyAddress'] = {
          street: companyStreetInput.current.value,
          city: companyCityInput.current.value,
          state: companyStateInput.current.value,
          pin: companyPinInput.current.value,
        }
        if (searchParams.get('userType') !== null)
        payload['subscription'] = {'name': subscriptionInput.current.value}

      if (companyLogo !== undefined) {
        const formData = new FormData();
        formData.append('file', companyLogo);
    
        let response = await axios.post('/api/v1/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        payload['companyLogo'] = response.data.filename
      }
    }
      axios.post(APIurl, payload, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(() => {
        if (searchParams.get('userType') === 'SUPER-ADMIN') {
          window.location.href = '/superadmin'
        }
        if (searchParams.get('userType') === 'ORG-ADMIN') {
          window.location.href = '/users'
        }
        if (searchParams.get('userType') === 'ORG-USER') {
          window.location.href = '/employee'
        }
        if (searchParams.get('userType') === null) {
          window.location.href = '/dashboard'
        }
      })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
    }

    const editAttendance = () => {
        let APIurl = `/api/v1/attendance${searchParams.get("attendanceType") === 'raw' ? '/raw' : ''}`
        const token = Cookies.get('token')
        let Id = null
        const e = employee.filter(e => {
          return `${e.firstName} ${e.lastName}` === userIdInput.current.value
        })
        if (e.length > 0) {
          Id = e[0].id
        }
        let payload = undefined
        if (userType === 'SUPER-ADMIN' || userType === 'ORG-ADMIN') {
          payload = searchParams.get("attendanceType") === 'raw' ? {
              id: searchParams.get("id"),
              userId: Id,
              punchType: punchTypeInput.current.value,
              timeStamp: timeStampInput.current.value.split('T')[0]+' '+timeStampInput.current.value.split('T')[1]+':00',
              GPSLoc: GPSLocInput.current.value,
              punchedByDeviceId: punchedByDeviceIdInput.current.value
          } : {
              id: searchParams.get("id"),
              firstPunchInTimeStamp: recordForAttendanceDateInput.current.value + ' ' + firstPunchInTimeStampInput.current.value + (firstPunchInTimeStampInput.current.value.split(':').length > 2 ? '' : ':00'),
              lastPuchOutTimeStamp: recordForAttendanceDateInput.current.value + ' ' + lastPuchOutTimeStampInput.current.value + (firstPunchInTimeStampInput.current.value.split(':').length > 2 ? '' : ':00'),
              attendanceDurationInHours: attendanceDurationInHoursInput.current.value,
              recordForAttendanceDate: recordForAttendanceDateInput.current.value,
              comment: commentInput.current.value,
              employeeId: Id,
              isConflict: isConflictInput.current.checked,
              lastUpdatedByUserId: userId,
          }
        }
        else {
          payload = {
            id: searchParams.get("id"),
            comment: commentInput.current.value,
            isConflict: isConflictInput.current.checked,
            lastUpdatedByUserId: userId
          }
        }
        axios.put(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
          if (searchParams.get("attendanceType") === 'raw')
            window.location.href = '/raw_attendance'
          
          if (searchParams.get("attendanceType") === 'processed')
            window.location.href = '/processed_attendance'
        })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
      }

    const editSubscription = () => {
        let APIurl = `/api/v1/subscription`
        const token = Cookies.get('token')
        let payload = {
            id: searchParams.get("id"),
            name: titleInput.current.value,
            price: priceInput.current.value,
            duration: durationInput.current.value,
            offerPrice: offerPriceInput.current.value,
            description: descInput.current.value,
        }
        axios.put(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            window.location.href = '/subscription'
        })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
    }

    const editPayment = () => {
      let productDetails = subscription.find(subscription => subscription.name === productInput.current.value)
      let now = new Date();
      productDetails['startTimeStamp'] = now.toISOString()
      productDetails['endTimeStamp'] = new Date(now.getFullYear(), now.getMonth()+(productDetails.duration === 'month' ? 1 : 12 ), now.getDate())
      delete productDetails._id

      let APIurl = `/api/v1/payment`
      const token = Cookies.get('token')
      let payload = {
          id: searchParams.get("id"),
          timeStamp: timeStampInput.current.value.split('T')[0]+' '+timeStampInput.current.value.split('T')[1]+':00',
          orgAccountId: userIdInput.current.value,
          lastUpdatedByUserId: userId,
          product: productInput.current.value,
          productDetails: productDetails,
          paymentMethod: paymentMethodInput.current.value,
          reference: referenceInput.current.value,
          comment: commentInput.current.value,
          price: priceInput.current.value,
          paid: paidInput.current.value,
          discount: discountInput.current.value,
      }
      axios.put(APIurl, payload, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(() => {
          window.location.href = '/payment'
      })
      .catch(err => {
        setError(`Error: ${err.response.data.message}`)
      })
  }

    const editHelp = () => {
        let APIurl = `/api/v1/help`
        const token = Cookies.get('token')
        let payload = userType === 'SUPER-ADMIN' ? {
            id: searchParams.get("id"),
            title: titleInput.current.value,
            createdBy: createdByInput.current.value,
            status: statusInput.current.value,
        }
        :
        {
          id: searchParams.get("id"),
          title: titleInput.current.value,
          status: statusInput.current.value,
        }
        axios.put(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            window.location.href = '/help'
        })
        .catch(err => {
            setError(`Error: ${err.response.data.message}`)
        })
    }

    const fetchUser = async (userType, userId) => {
        const userAPI = {
            'SUPER-ADMIN': 'superadmin',
            'ORG-ADMIN': 'user',
            'ORG-USER': 'orguser'
        }

        try {
            setLoading(true);
            let APIurl = `/api/v1/${userAPI[userType]}?id=${userId}`
            const token = Cookies.get('token')
            const response = await axios.get(APIurl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data.data[0]);
            setLoading(false);
        } catch (error) {
    
            setLoading(false);
            window.location.reload();
        }
    }

    const fetchCompanies = async () => {
      try {
          setLoading(true);
          let APIurl = `/api/v1/user`
          const token = Cookies.get('token')
          const response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
      
          setCompany(response.data.data)
          setLoading(false);
        } catch (error) {
    
            setLoading(false);
            window.location.reload();
        }
    }

    const fetchEmployees = async (accountId) => {
      try {
        if (accountId === undefined) setLoading(true);
          let APIurl = `/api/v1/orguser`
          if (accountId !== undefined) APIurl += `?accountId=${accountId}`
          const token = Cookies.get('token')
          const response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
        if (accountId !== undefined && response.data.data.length === 0) userIdInput.current.value = 'No employee exist in this company'
          setEmployee(response.data.data)
          setLoading(false);
        } catch (error) {
    
            setLoading(false);
            window.location.reload();
        }
    }

    const fetchAttendance = async (attendanceId) => {
        try {
            setLoading(true);
            let APIurl = `/api/v1/attendance${searchParams.get("attendanceType") === 'raw' ? '/raw' : ''}?id=${attendanceId}`
            const token = Cookies.get('token')
            const response = await axios.get(APIurl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAttendance(response.data.data[0]);
            setLoading(false);
        } catch (error) {
    
            setLoading(false);
            window.location.reload();
        }
    }

    const fetchSubscription = async (subscriptionId) => {
        try {
            setLoading(true);
            let APIurl = `/api/v1/subscription?id=${subscriptionId}`
            const token = Cookies.get('token')
            const response = await axios.get(APIurl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSubscription(response.data.data[0]);
            setLoading(false);
        } catch (error) {
    
            setLoading(false);
            window.location.reload();
        }
    }

    const fetchSubscriptions = async () => {
      try {
          setLoading(true);
          let APIurl = `/api/v1/subscription`
          const token = Cookies.get('token')
          const response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setSubscription(response.data.data);
          setLoading(false);
      } catch (error) {
  
          setLoading(false);
          window.location.reload();
      }
  }

    const fetchPayment = async (fetchPaymentId) => {
      try {
          setLoading(true);
          let APIurl = `/api/v1/payment?id=${fetchPaymentId}`
          const token = Cookies.get('token')
          const response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setPayment(response.data.data[0]);
          setLoading(false);
      } catch (error) {
  
          setLoading(false);
          window.location.reload();
      }
  }

    const fetchHelp = async (helpId) => {
        try {
            setLoading(true);
            let APIurl = `/api/v1/help?id=${helpId}`
            const token = Cookies.get('token')
            const response = await axios.get(APIurl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setHelp(response.data.data[0]);
            setLoading(false);
        } catch (error) {
    
            setLoading(false);
            window.location.reload();
        }
    }

    const fetchAttendanceCombo = async (attendanceId) => {
      try {
          setLoading(true);

          let APIurl = `/api/v1/attendance${searchParams.get("attendanceType") === 'raw' ? '/raw' : ''}?id=${attendanceId}`
          const token = Cookies.get('token')
          let response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setAttendance(response.data.data[0]);
          const accountIdInput = response.data.data[0].accountId.companyName

          APIurl = `/api/v1/user`
          response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
      
          setCompany(response.data.data)
          let accountId = response.data.data.filter(c => {
            return c.companyName === accountIdInput
          })[0].id

          APIurl = `/api/v1/orguser?accountId=${accountId}`
          response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
        // if (response.data.data.length === 0 && searchParams.get("attendanceType") === 'raw') userIdInput.current.value = 'No employee exist in this company'
          setEmployee(response.data.data)
          setLoading(false);
        } catch (error) {
          console.log(error);
            setLoading(false);
            window.location.reload();
        }
    }

    const fetchPaymentCombo = async (fetchPaymentId=false) => {
      try {
          setLoading(true);
          let APIurl = `/api/v1/user`
          const token = Cookies.get('token')
          let response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setCompany(response.data.data)
          APIurl = `/api/v1/subscription`
          response = await axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setSubscription(response.data.data);
          if (fetchPaymentId !== false) {
            APIurl = `/api/v1/payment?id=${fetchPaymentId}`
            response = await axios.get(APIurl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPayment(response.data.data[0]);
          }
          setLoading(false);
        } catch (error) {
    
            setLoading(false);
            window.location.reload();
        }
    }

    const accountIdInputOnChange = () => {
      setEmployee([])
      userIdInput.current.value = ''
      const c = company.filter(c => {
        return c.companyName === accountIdInput.current.value
      })
      if (c.length > 0) {
        fetchEmployees(c[0].id)
      }
    }

    const productInfoInputOnChange = () => {
      const s = subscription.filter(s => {
        return s.name === productInput.current.value
      })
      if (s.length > 0) {
        priceInput.current.value = s[0].price
        discountInput.current.value = s[0].offerPrice
      }
    }

    useEffect(() => {
        if (window.location.pathname === '/create') {
          if (type === 'user') document.title = 'Create User'
          if (type === 'attendance' && searchParams.get("attendanceType") === 'raw') {
            document.title = 'Create Raw Attendance'
            fetchCompanies()
            return
          }
          if (type === 'attendance' && searchParams.get("attendanceType") === 'processed') {
            document.title = 'Create Processed Attendance'
            if (userType === 'SUPER-ADMIN') fetchCompanies()
            else fetchEmployees(userId)
            return
          }
          if (type === 'subscription') document.title = 'Create Subscription'
          if (type === 'payment') {
            document.title = 'Create Payment Transaction'
            fetchPaymentCombo()
            return
          }
          if (type === 'help') {
            document.title = 'Create Help Ticket'
            if (userType === 'SUPER-ADMIN') {
              fetchCompanies()
              // fetchEmployees()
              return
            }
          }

            if (searchParams.get('userType') === 'ORG-USER' && userType === 'SUPER-ADMIN') fetchCompanies()
            else setLoading(false)
        }

        if (window.location.pathname === '/edit') {
          if (type === 'user') {
            document.title = 'Edit User'
            searchParams.get("userType") !== null && fetchUser(searchParams.get("userType"), searchParams.get("id"));
            (searchParams.get("userType") === 'ORG-ADMIN' && userType === 'SUPER-ADMIN') && fetchSubscriptions()
            searchParams.get("userType") === null && fetchUser(userType, userId);
          }
          if (type === 'attendance') {
            if (searchParams.get("attendanceType") === 'raw') document.title = 'Edit Raw Attendance'
            if (searchParams.get("attendanceType") === 'processed') document.title = 'Edit Processed Attendance'
            if (userType === 'SUPER-ADMIN') { 
              fetchAttendanceCombo(searchParams.get('id'))
            }
            else fetchAttendance(searchParams.get('id'))
            if (userType === 'ORG-ADMIN') fetchEmployees(userId)
          }
          if (type === 'subscription') {
            document.title = 'Edit Subscription'
            fetchSubscription(searchParams.get('id'))
          }
          if (type === 'payment') {
            document.title = 'Edit Payment Transaction'
            fetchPaymentCombo(searchParams.get('id'))
          }
          if (type === 'help') {
            document.title = 'Edit Help Ticket'
            if (userType === 'SUPER-ADMIN') fetchCompanies()
            fetchHelp(searchParams.get('id'))
          }
        }

        if (window.location.pathname === '/view') {
          if (type === 'user') {
            document.title = 'View User Details'
            searchParams.get("userType") !== null && fetchUser(searchParams.get("userType"), searchParams.get("id"));
            searchParams.get("userType") === null && fetchUser(userType, userId);
          }
          if (type === 'attendance') {
            if (searchParams.get("attendanceType") === 'raw') document.title = 'View Raw Attendance Details'
            if (searchParams.get("attendanceType") === 'processed') document.title = 'View Processed Attendance Details'
            fetchAttendance(searchParams.get('id'))
          }
          if (type === 'subscription') {
            document.title = 'View Subscription Details'
            fetchSubscription(searchParams.get('id'))
          }
          if (type === 'payment') {
            document.title = 'View Payment Transaction Details'
            fetchPayment(searchParams.get('id'))
          }
          if (type === 'help') {
            document.title = 'View Help Ticket Details'
            fetchHelp(searchParams.get('id'))
          }
        }
    }, [])

    const title = {
        'SUPER-ADMIN': 'Super Admin',
        'ORG-ADMIN': 'Admin',
        'ORG-USER': 'Employee',
        'raw': 'Raw Attendance Record',
        'processed': 'Processed Attendance Record',
    }

    if (loading) 
    return (
      <div class="text-center">
          <div role="status">
              <svg aria-hidden="true" class="inline w-12 h-12 mr-2 mt-10 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
      </div>
    )
    
    else
    return (
    <div class="container px-6 mx-auto grid">
    <h2
      class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
    >
      {window.location.pathname === '/create' && 'Create '} 
      {window.location.pathname === '/edit' && 'Edit '} 
      {window.location.pathname === '/view' && 'View '} 
      {type === 'user' && title[searchParams.get("userType")]}
      {type === 'attendance' && title[searchParams.get("attendanceType")]}
      {type === 'subscription' && 'Subscription'}
      {type === 'payment' && 'Payment'}
      {type === 'help' && 'Help Ticket'}
      {window.location.pathname === '/view' && ' Details'} 
    </h2>

    {type === 'user' && <>

  {(searchParams.get("userType") === 'ORG-ADMIN' || (userType === 'ORG-ADMIN' && searchParams.get("userType") === null)) &&
  <>
    <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      Company
    </h4>


    <div
      class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      {<ImageUploader type={'company'} src={user !== undefined ? user.companyLogo : 'default.jpg'} image={setCompanyLogo}/>}

      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Name</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? `${user.companyName}` : ''}
          ref={companyNameInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Address</span>
        <div class="px-4 py-3 mt-1 mb-8 bg-white rounded-lg shadow-xs dark:bg-gray-800">

        <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Street</span>
        <textarea
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          rows="3"
          placeholder={window.location.pathname !== '/view' ? "Street address" : ''}
          defaultValue={user !== undefined ? user.companyAddress.street : ''}
          ref={companyStreetInput}
          disabled={window.location.pathname === '/view' ? true : false}
        ></textarea>
        </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">City</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? user.companyAddress.city : ''}
            placeholder='City'
            ref={companyCityInput}
            disabled={window.location.pathname === '/view' ? true : false}
        />
        </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">State</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? user.companyAddress.state : ''}
            placeholder='State'
            ref={companyStateInput}
            disabled={window.location.pathname === '/view' ? true : false}
        />
        </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">PIN</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? user.companyAddress.pin : ''}
            placeholder='PIN'
            ref={companyPinInput}
            disabled={window.location.pathname === '/view' ? true : false}
        />
        </label>

        </div>
      </label>
    </div>

      </>
  }

    <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      Account
    </h4>

    <div
      class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
        {<ImageUploader type={'user'} src={user !== undefined ? user.photo : 'default.jpg'} image={setPhoto}/>}

      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Full Name</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? `${user.firstName} ${user.lastName}` : ''}
            placeholder='Full name'
            ref={nameInput}
            disabled={window.location.pathname === '/view' ? true : false}
        />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Username</span>
        
        <div
          class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
        >
          <input
            class="block w-full pl-10 mt-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            defaultValue={user !== undefined ? user.username : ''}
            placeholder='Username'
            ref={usernameInput}
            disabled={window.location.pathname === '/view' ? true : false}
          />
          <div
            class="absolute inset-y-0 flex items-center ml-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              ></path>
            </svg>
          </div>
        </div>
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Email</span>
        
        <div
          class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
        >
          <input
            class="block w-full pl-10 mt-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            defaultValue={user !== undefined ? user.email : ''}
            placeholder='Email'
            ref={emailInput}
            disabled={window.location.pathname === '/view' ? true : (window.location.pathname === '/edit' && userType === 'ORG-ADMIN' && searchParams.get("userType") === null) ? true : false}
          />
          <div
            class="absolute inset-y-0 flex items-center ml-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Password</span>
        
        <div
          class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
        >
          <input
            class="block w-full pl-10 mt-1 text-sm text-black dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            type='password'
            defaultValue={user !== undefined ? user.password : ''}
            placeholder='Password'
            ref={passwordInput}
            disabled={window.location.pathname === '/view' ? true : false}
          />
          <div
            class="absolute inset-y-0 flex items-center ml-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              ></path>
            </svg>
          </div>
        </div>
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Address</span>
        <div class="px-4 py-3 mt-1 mb-8 bg-white rounded-lg shadow-xs dark:bg-gray-800">

        <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Street</span>
        <textarea
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          rows="3"
          // placeholder={window.location.pathname !== '/view' ? "Street address" : ''}
          placeholder={"Street address"}
          defaultValue={user !== undefined ? user.address.street : ''}
          ref={streetInput}
          disabled={window.location.pathname === '/view' ? true : false}
        ></textarea>
        </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">City</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? user.address.city : ''}
            placeholder='City'
            ref={cityInput}
            disabled={window.location.pathname === '/view' ? true : false}
        />
        </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">State</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? user.address.state : ''}
            placeholder='State'
            ref={stateInput}
            disabled={window.location.pathname === '/view' ? true : false}
        />
        </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">PIN</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={user !== undefined ? user.address.pin : ''}
            placeholder='PIN'
            ref={pinInput}
            disabled={window.location.pathname === '/view' ? true : false}
        />
        </label>

        </div>
      </label>

      {((window.location.pathname === '/edit' && searchParams.get("id") !== null) || window.location.pathname === '/view') &&
      <div class="flex mt-6 text-sm">
            <label class="flex items-center dark:text-gray-400">
                <input
                type="checkbox"
                class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                ref={isActiveInput}
                defaultChecked={user !== undefined ? user.isActive : false}
            disabled={window.location.pathname === '/view' ? true : false}
            />
                <span class="ml-2">
                Account is active?
                </span>
            </label>
        </div>
      }

    {((window.location.pathname === '/edit' && searchParams.get("userType") === 'ORG-ADMIN') || (window.location.pathname === '/view' && searchParams.get("userType") === 'ORG-ADMIN')) &&
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">
          Subscription
        </span>
        <select
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          ref={subscriptionInput}
          defaultValue={user !== undefined ? user.subscription.name : ''}
          disabled={window.location.pathname === '/view' ? true : false}
          >
            <option value="free">free</option>
          {(() => {
            let arr = [];
            if (window.location.pathname === '/edit')
            subscription.forEach(c => {
                arr.push(<option
                  value={c.name}>
                    {c.name}
                  </option>)
            })
            else
            arr.push(<option
              value={user.subscription.name}>
                {user.subscription.name}
              </option>)
            return arr
          })()}
        </select>
      </label>
    }

    {(user === undefined && searchParams.get("userType") === 'ORG-USER' && userType === 'SUPER-ADMIN') &&
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">
          Company
        </span>
        <select
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          ref={accountIdInput}
          disabled={window.location.pathname === '/view' ? true : false}
          >
          {(() => {
            let arr = [];
            company.forEach(c => {
                arr.push(<option
                  value={c.id}>
                    {c.companyName}
                  </option>)
            })
            return arr
          })()}
        </select>
      </label>
    }
    </div>
    </>}

    {(type === 'attendance' && searchParams.get("attendanceType") === 'raw') && <>
    <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      Data
    </h4>

    <div
      class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >

      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Company</span>
        <input list="accountId" 
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          onChange={accountIdInputOnChange}
          defaultValue={attendance !== undefined ? attendance.accountId.companyName : ''}
          ref={accountIdInput}
          disabled={window.location.pathname === '/view' ? true : false}
        />
        <datalist id="accountId">
          {window.location.pathname === '/view' && 
                <option
                  data-value={attendance.accountId._id['$oid']} 
                  value={`${attendance.accountId.companyName}`}
                  />}
          {window.location.pathname !== '/view' && (() => {
            let arr = [];
            company.forEach(c => {
              if (c.companyName !== null)
              arr.push(
                <option
                  data-value={c.id} 
                  value={`${c.companyName}`}
                  />)
            })
            return arr
          })()}
        </datalist>
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Employee</span>
        <input list="userId" 
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          defaultValue={attendance !== undefined ? `${attendance.userId.firstName} ${attendance.userId.lastName}` : ''}
          ref={userIdInput}
          disabled={(window.location.pathname === '/view' ? true : employee < 1 ? true : false)}
        />
        {(window.location.pathname !== '/view' && employee.length > 0) &&
        <datalist id="userId">
          {/* {window.location.pathname !== '/view' && (() => {
            let arr = [];
            employee.forEach(c => {
                arr.push(
                <option
                  // data-value={c.id} 
                  value={`${c.firstName} ${c.lastName}`}
                  />)
            })
            return arr
          })()} */}
          {employee.map(c => {
              return <option
                // data-value={c.id} 
                value={`${c.firstName} ${c.lastName}`}
                />
            })
          }
        </datalist>
      }
      {window.location.pathname === '/view' &&
        <datalist id="userId">
          <option
            // data-value={attendance.userId._id['$oid']} 
            value={`${attendance.userId.firstName} ${attendance.userId.lastName}`}
            />
        </datalist>
      }
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">
            Punch Type
        </span>
        <select
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            defaultValue={attendance !== undefined ? attendance.punchType : ''}
            ref={punchTypeInput}
            disabled={window.location.pathname === '/view' ? true : false}
        >
            <option>PUNCH-IN</option>
            <option>PUNCH-OUT</option>
        </select>
        </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Timestamp</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='datetime-local'
          defaultValue={attendance !== undefined ? attendance.timeStamp : ''}
          ref={timeStampInput}
          readOnly={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">GPS Location</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={attendance !== undefined ? attendance.GPSLoc : ''}
          ref={GPSLocInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Device ID</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={attendance !== undefined ? attendance.punchedByDeviceId : ''}
          ref={punchedByDeviceIdInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>
      </div>
    </>}

    {(type === 'attendance' && searchParams.get("attendanceType") === 'processed') && <>
    <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      Data
    </h4>

    <div
      class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      {userType !== 'ORG-USER' &&
      <>

      {userType === 'SUPER-ADMIN' &&
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Company</span>
        <input list="accountId" 
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          onChange={accountIdInputOnChange}
          defaultValue={attendance !== undefined ? attendance.accountId.companyName : ''}
          ref={accountIdInput}
          disabled={window.location.pathname === '/view' ? true : false}
        />
        <datalist id="accountId">
          {window.location.pathname === '/view' && 
                <option
                  // data-value={attendance.accountId._id['$oid']} 
                  value={`${attendance.accountId.companyName}`}
                  />}
          {window.location.pathname !== '/view' && (() => {
            let arr = [];
            company.forEach(c => {
              if (c.companyName !== null)
                arr.push(
                <option
                  // data-value={c.id} 
                  value={`${c.companyName}`}
                  />)
            })
            return arr
          })()}
        </datalist>
      </label>
      }

    <label class="block mt-4 text-sm">
      <span class="text-gray-700 dark:text-gray-400">Employee</span>
      <input list="userId" 
        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        defaultValue={attendance !== undefined ? `${attendance.employeeId.firstName} ${attendance.employeeId.lastName}` : ''}
        ref={userIdInput}
        disabled={(window.location.pathname === '/view' ? true : employee < 1 ? true : false)}
      />
      {(window.location.pathname !== '/view' && employee.length > 0) &&
      <datalist id="userId">
        {employee.map(c => {
            return <option
              // data-value={c.id} 
              value={`${c.firstName} ${c.lastName}`}
              />
          })
        }
      </datalist>
    }
    {window.location.pathname === '/view' &&
      <datalist id="userId">
        <option
          // data-value={attendance.userId._id['$oid']} 
          value={`${attendance.employeeId.firstName} ${attendance.employeeId.lastName}`}
          />
      </datalist>
    }
    </label>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Attendance Date</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='date'
          defaultValue={attendance !== undefined ? attendance.recordForAttendanceDate : ''}
          ref={recordForAttendanceDateInput}
          readOnly={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">First Punch In Timestamp</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='time'
          defaultValue={attendance !== undefined ? attendance.firstPunchInTimeStamp.split(' ')[1] : ''}
          ref={firstPunchInTimeStampInput}
          readOnly={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Last Punch Out Timestamp</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='time'
          defaultValue={attendance !== undefined ? attendance.lastPuchOutTimeStamp.split(' ')[1] : ''}
          ref={lastPuchOutTimeStampInput}
          readOnly={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Attendance Hours Duration</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='number'
          min='0'
          defaultValue={attendance !== undefined ? attendance.attendanceDurationInHours : ''}
          ref={attendanceDurationInHoursInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>
      </>
}

      <div class="flex mt-6 text-sm">
            <label class="flex items-center">
                <input
                type="checkbox"
                class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                ref={isConflictInput}
                defaultChecked={attendance !== undefined ? attendance.isConflict : ''}
            disabled={window.location.pathname === '/view' ? true : false}
            />
                <span class="ml-2">
                Record is conflict?
                </span>
            </label>
        </div>

        <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Comment</span>
        <textarea
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          rows="3"
          placeholder="Enter comment"
          defaultValue={attendance !== undefined ? attendance.comment : ''}
          ref={commentInput}
            disabled={window.location.pathname === '/view' ? true : false}
            ></textarea>
      </label>
      </div>
    </>}

    {(type === 'subscription') && <>
    <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      Data
    </h4>

    <div
      class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Title</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={subscription !== undefined ? subscription.name : ''}
          ref={titleInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

    <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Price</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='number' min='0'
          defaultValue={subscription !== undefined ? subscription.price : ''}
          ref={priceInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
      <span class="text-gray-700 dark:text-gray-400">
            Billing cycle
        </span>
        <select
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            defaultValue={subscription !== undefined ? subscription.duration : ''}
            ref={durationInput}
            disabled={window.location.pathname === '/view' ? true : false}
        >
            <option>month</option>
            <option>year</option>
        </select>
        </label>

    <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Offer price</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='number' min='0'
          defaultValue={subscription !== undefined ? subscription.offerPrice : ''}
          ref={offerPriceInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

    <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Description</span>
        <textarea
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          rows="3"
          placeholder="Enter description here"
          defaultValue={subscription !== undefined ? subscription.description : ''}
          ref={descInput}
            disabled={window.location.pathname === '/view' ? true : false}
            ></textarea>
      </label>
      </div>
    </>}

    {(type === 'payment') && <>
    <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      Data
    </h4>

    <div
      class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Date</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='datetime-local'
          defaultValue={payment !== undefined ? payment.timeStamp : ''}
          ref={timeStampInput}
          readOnly={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">User ID</span>
        <select
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          defaultValue={payment !== undefined ? payment.userId._id['$oid'] : ''}
          ref={userIdInput}
          disabled={window.location.pathname === '/view' ? true : false}
          >
          {window.location.pathname === '/view' && <option>{payment.userId._id['$oid']}</option>}
          {window.location.pathname !== '/view' && (() => {
            let arr = [];
            company.forEach(c => {
                arr.push(<option
                  value={c.id}>
                    {c.firstName} {c.lastName} ({c.id})
                  </option>)
            })
            return arr
          })()}
        </select>
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Product info</span>
        <select
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          defaultValue={payment !== undefined ? payment.product : ''}
          ref={productInput}
          disabled={window.location.pathname === '/view' ? true : false}
          onChange={productInfoInputOnChange}
          >
          {window.location.pathname === '/view' && <option>{payment.product}</option>}
          {window.location.pathname !== '/view' && (() => {
            let arr = [];
            subscription.forEach(c => {
                arr.push(<option
                  value={c.name}>
                    {c.name}
                  </option>)
            })
            return arr
          })()}
        </select>
      </label>


      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Payment method</span>
        <select
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          defaultValue={payment !== undefined ? payment.paymentMethod : ''}
          ref={paymentMethodInput}
          disabled={window.location.pathname === '/view' ? true : false}
          >
          <option>Cash</option>
          <option>Cheque</option>
          <option>UPI</option>
          <option>Bank transfer</option>
        </select>
      </label>
      
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Reference</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          placeholder='Reference'
          defaultValue={payment !== undefined ? payment.reference : ''}
          ref={referenceInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Comment</span>
        <textarea
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          rows="3"
          placeholder="Enter comment"
          defaultValue={payment !== undefined ? payment.comment : ''}
          ref={commentInput}
            disabled={window.location.pathname === '/view' ? true : false}
            ></textarea>
      </label>

    <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Total price</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='number' min='0'
          defaultValue={payment !== undefined ? payment.price : subscription !== [] ? subscription[0].price : ''}
          ref={priceInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

    <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Total paid</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='number' min='0'
          defaultValue={payment !== undefined ? payment.paid : ''}
          ref={paidInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>

    <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Additional discount</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          type='number' min='0'
          defaultValue={payment !== undefined ? payment.discount : subscription !== [] ? subscription[0].offerPrice : ''}
          ref={discountInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>
      </div>
    </>}

    {(type === 'help') && <>
    <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      Ticket Details
    </h4>

    <div
      class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">Title</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
          defaultValue={help !== undefined ? help.title : ''}
          ref={titleInput}
          disabled={window.location.pathname === '/view' ? true : false}
          />
      </label>
    {userType === 'SUPER-ADMIN' &&
    <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Created By</span>
        <select
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          defaultValue={help !== undefined ? help.userId._id['$oid'] : ''}
          ref={createdByInput}
          disabled={window.location.pathname === '/view' ? true : false}
          >
          {window.location.pathname === '/view' && <option>{help.userId._id['$oid']}</option>}
          {window.location.pathname !== '/view' && (() => {
            let arr = [];
            company.forEach(c => {
                arr.push(<option
                  value={c.id}>
                    {c.firstName} {c.lastName} ({c.id})
                  </option>)
            })
            // employee.forEach(c => {
            //     arr.push(<option
            //       value={c.id}>
            //         {c.firstName} {c.lastName} ({c.id})
            //       </option>)
            // })
            return arr
          })()}
        </select>
      </label>
    }
    
    {(window.location.pathname === '/edit' || window.location.pathname === '/view') &&
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">
          Status
        </span>
        <select
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          defaultValue={help !== undefined ? help.status : ''}
          ref={statusInput}
          disabled={window.location.pathname === '/view' ? true : false}
          >
            <option>
            OPEN
            </option>
            <option>
            RESOLVED
            </option>
            <option>
            BLOCKED
            </option>
        </select>
      </label>}
      </div>
    </>}

    <p className='text-red-500'>{error}</p>

    <div className='text-right'>
    {window.location.pathname !== '/view' &&
    <button
        class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        onClick={() => {
          if (window.location.pathname === '/create') {
              type === 'user' && createUser()
              type === 'attendance' && createAttendance()
              type === 'subscription' && createSubscription()
              type === 'payment' && createPayment()
              type === 'help' && createHelp()
          }
          if (window.location.pathname === '/edit') {
              type === 'user' && editUser()
              type === 'attendance' && editAttendance()
              type === 'subscription' && editSubscription()
              type === 'payment' && editPayment()
              type === 'help' && editHelp()
          }
        }}
    >
      {window.location.pathname === '/create' && 'Create'} 
      {window.location.pathname === '/edit' && 'Save'} 
    </button>
}

    <button
        class="ml-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-slate-600 border border-transparent rounded-lg active:bg-slate-600 hover:bg-slate-700 focus:outline-none focus:shadow-outline-purple"
        onClick={() => {
          if (type === 'user') {
            if (searchParams.get('userType') === 'SUPER-ADMIN') {
              navigate(`/superadmin`)
              changePage('Super Admins')
            }
            if (searchParams.get('userType') === 'ORG-ADMIN') {
              navigate(`/users`)
              changePage('Users')
            }
            if (searchParams.get('userType') === 'ORG-USER') {
              navigate(`/employee`)
              changePage('Employees')
            }
            if (searchParams.get('userType') === null) {
              navigate(`/`)
              changePage('Dashboard')
            }
          }
          if (type === 'attendance' && searchParams.get("attendanceType") === 'raw') {
            navigate(`/raw_attendance`)
            changePage('Raw Attendance')
          }
          if (type === 'attendance' && searchParams.get("attendanceType") === 'processed') {
            navigate(`/processed_attendance`)
            changePage('Processed Attendance')
          }
          if (type === 'subscription') {
            navigate(`/subscription`)
            changePage('Subscription')
          }
          if (type === 'payment') {
            navigate(`/payment`)
            changePage('Payment')
          }
          if (type === 'help') {
            navigate(`/help`)
            changePage('Help')
          }
        }}
    >
      {window.location.pathname === '/view' ? "Back" : 'Cancel'}
    </button>
    </div>
  </div>
  )
}