import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function SubscriptionCard({id, title, description, price, duration, offerPrice, selected, user}) {
    const navigate = useNavigate();

    const buyButton = () => {
      if (id === 0) {
        let APIurl = `/api/v1/profile`
        const token = Cookies.get('token')
        let payload = {
            id: user.id,
            subscription: {name: title}
        }
        axios.post(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            window.location.href = '/subscription'
        })
        return
      }

        let APIurl = `/api/v1/payment`
        const token = Cookies.get('token')
        let payload = {
            amount: price,
            email: user.email,
            firstname: user.firstName,
            productinfo: title
        }
        axios.post(APIurl, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            // window.open("data:text/html;charset=utf-8,"+res.data, "", "_blank")
            console.log(res.data);
            // let win = window.open('about:blank', '_blank');
            // win.close()
            // win.document.write("<iframe srcdoc=" + res.data + "><\/iframe>");

            let APIurl = `/api/v1/subscription?id=${id}`
            axios.get(APIurl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
            })
            .then(res => {
              let data = res.data.data[0]
              let now = new Date();
              data['startTimeStamp'] = now.toISOString()
              data['endTimeStamp'] = new Date(now.getFullYear(), now.getMonth()+(data.duration === 'month' ? 1 : 12 ), now.getDate())
              let APIurl = `/api/v1/profile`
              const token = Cookies.get('token')
              let payload = {
                  id: user.id,
                  subscription: data
              }
              axios.post(APIurl, payload, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              })
              .then(res => {
                  window.location.href = '/subscription'
              })
            })
        })
        .catch(err => {
            window.location.reload()
        })
    }
    
    return (
        <>
      <div class="mb-6 lg:mb-0">
        <div class="block rounded-lg shadow-lg bg-white h-full">
          <div class="p-6 border-b border-gray-300 text-center">
            <p class="uppercase mb-4 text-sm">
              <strong>{title}</strong>
            </p>
            <h3 class="text-2xl mb-6">
              {offerPrice === null ? <strong>₹{price}</strong> : <strong><s className='text-[18px] text-red-500'>₹{price}</s> ₹{offerPrice}</strong>}
              <small class="text-gray-500 text-sm">{duration === 'month' ? '/mo' : '/year'}</small>
            </h3>
            {selected ?
            <button type="button"
              class="inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              disabled>
              Selected
            </button>
            :
            <button type="button"
              class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              onClick={buyButton}>
              Buy
            </button>
            }
          </div>
          <div class="p-6">
            {description}
            {/* <ol class="list-inside">
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Unlimited updates
              </li>
            </ol> */}
          </div>
        </div>
      </div>
        </>
    )
}