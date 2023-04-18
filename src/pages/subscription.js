import { useState, useEffect } from'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Table from '../components/table'
import SubscriptionCard from '../components/subscriptionCard'

export default function Subscription({userId, userType, changePage}) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [currentSubscription, setCurrentSubscription] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            
            let APIurl = `/api/v1/subscription`
            const token = Cookies.get('token')
            let response = await axios.get(APIurl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSubscriptions(response.data.data)
            
            if (userType !== 'SUPER-ADMIN') {
                const userAPI = {
                    'SUPER-ADMIN': 'superadmin',
                    'ORG-ADMIN': 'user',
                    'ORG-USER': 'orguser'
                }
    
                APIurl = `/api/v1/${userAPI[userType]}?id=${userId}`
                response = await axios.get(APIurl, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserInfo(response.data.data[0])
                setCurrentSubscription(response.data.data[0].subscription.name);
            }
            setLoading(false);
        } catch (error) {
    
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSubscriptions();
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
        <>
            {userType !== 'SUPER-ADMIN' && 
            <div class="container grid px-6 mx-auto">
                <section class="mb-32 text-gray-800">
                    <h2 class="text-3xl font-bold text-center mb-12 my-12">Subscription</h2>
                    
                    <div class="grid lg:grid-cols-3 gap-6 lg:gap-x-12">
                        <SubscriptionCard id={0} title={'free'} description={'Basic features'} price={'0'} duration={'month'} offerPrice={null} selected={currentSubscription === 'free' ? true : false} user={userInfo}/>
                        {(() => {
                            let arr = [];
                            subscriptions.forEach(data => {
                                arr.push(
                                    <SubscriptionCard id={data.id} title={data.name} description={data.description} price={data.price} duration={data.duration} offerPrice={data.offerPrice} selected={currentSubscription === data.name ? true : false} user={userInfo}/>
                                )
                            })
                            return arr
                        })()}
                    </div>
            
                </section>
            </div>}
            {userType === 'SUPER-ADMIN' && <Table type={'subscription'} title={'Subscription'} columns={['Name', 'Price', 'Billing cycle', 'Offer price', 'Description', 'Actions']} rows={subscriptions} userType={userType} changePage={changePage}/>}
        </>
    )
}