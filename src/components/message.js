import { useState, useEffect, useRef } from'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Message({userId, changePage}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [helpTicket, setHelpTicket] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const textInput = useRef();
  // const companyFilter = useRef();
  // const dateStartFilter = useRef();
  // const dateEndFilter = useRef();
  
  const navigate = useNavigate();

  const token = Cookies.get('token')

  const fetchHelp = async (helpId) => {
    try {
        setLoading(true);
        let APIurl = `/api/v1/help?id=${helpId}`
        const response = await axios.get(APIurl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setHelpTicket(response.data.data[0]);
        fetchMessage(response.data.data[0].id);
        setLoading(false);
    } catch (error) {

        setLoading(false);
    }
}

const fetchMessage = async (parentTicketId) => {
  try {
      let APIurl = `/api/v1/help?parentTicketId=${parentTicketId}`
      const response = await axios.get(APIurl, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setMessages(response.data.data);
  } catch (error) {
      setError(error.response.data);
  }
}

const sendMessage = () => {
  try {
      let APIurl = `/api/v1/help`
      let payload = {
        parentTicketId: searchParams.get('id'),
        userId: userId,
        message: textInput.current.value
      }
      axios.post(APIurl, payload, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      fetchMessage(searchParams.get('id'))
      textInput.current.value = ''
  } catch (error) {
      setError(error.response.data);
  }
}

  useEffect(() => {
    fetchHelp(searchParams.get('id'))

    // Fetch the help messages every 3 seconds
    const interval = setInterval(() => {
      fetchMessage(searchParams.get('id'))
    }, 1000);

    return () => clearInterval(interval);
  }, [])

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
        <div class="container grid px-6 mx-auto">

          <div>
            <button onClick={() => {navigate(`/help`); changePage('Help')}} class="flex items-center justify-between my-6 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 -ml-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              <span>Back</span>
            </button>
          </div>

            <h2
              class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
              {helpTicket.title}
            </h2>
            
            <div class="h-[60vh] w-full overflow-scroll rounded-lg shadow-xs">
              {(() => {
                    let arr = [];
                    messages.forEach(message => {
                      arr.push(
                        message.userId._id.$oid === userId ?

              <div class="min-w-0 p-4 text-white bg-purple-600 rounded-lg shadow-xs mb-5 ml-40">
                <span className='text-xs font-normal'>{message.createdAt.split(' ')[0]} at {message.createdAt.split(' ')[1].split('.')[0]}</span>
                <h4 class="mb-4 font-semibold">
                  You
                </h4>
                <p>
                  {message.message}
                </p>
              </div>
              :
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-5 mr-40">
            <span className='text-xs font-normal'>{message.createdAt.split(' ')[0]} at {message.createdAt.split(' ')[1].split('.')[0]}</span>
                <h4 class="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                  {message.userId.firstName} {message.userId.lastName}
                </h4>
                <p class="text-gray-600 dark:text-gray-400">
                  {message.message}
                </p>
              </div>

                      )
                    })
                    return arr
                  }
              )()}

              </div>
              <div
                class="font-semibold tracking-wide text-gray-500 uppercase mt-5 dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
              >
                <div class="relative rounded-md shadow-sm">
                  <input ref={textInput} onKeyDown={e => {e.key === 'Enter' && sendMessage()}} type="text" class="block w-full rounded-md border-gray-300 pl-4 pr-12 pt-3 pb-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter message here."/>
                  <div class="absolute inset-y-0 right-0 flex items-center">
                    <span class="rounded-md border-transparent bg-transparent py-0 pl-2 pr-5 text-gray-500 sm:text-sm">
                      <button onClick={sendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                      </button>

                    </span>
                  </div>
                </div>
              </div>
          </div>
    )
}