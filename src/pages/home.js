import { useState, useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Users from './users'
import Clients from './clients';
import VotingList from './votingList';
import Sidebar from '../components/sidebar'
import NavBar from '../components/navbar'
import Attendance from './attendance';
import Form from '../components/form';
import Subscription from './subscription';
import Payment from './payment';
import HelpTicket from './help';
import Message from '../components/message';
import Dashboard from './dashboard';

export default function Home(currentPage) {
    const [page, setPage] = useState(currentPage)

    const changePage = (page) => setPage(page);

    let pages = {
        Dashboard: <Dashboard changePage={changePage} />,
        // 'Super Admins': <Users type={'superadmin'} userId={userId} userType={userType} changePage={changePage}/>,
        Users: <Users type={'user'} changePage={changePage} />,
        Clients: <Clients type={'user'} changePage={changePage} />,
        VotingList: <VotingList type={'user'} changePage={changePage} />,
        Help: <HelpTicket type={'user'} changePage={changePage} />,

        // Employees: <Users type={'employee'} userId={userId} userType={userType} changePage={changePage}/>,
        // Payment: <Payment userType={userType} changePage={changePage}/>,
        // Help: <HelpTicket userType={userType} userId={userId} changePage={changePage}/>,
        // 'User Form': <Form type={'user'} userId={userId} userType={userType} changePage={changePage}/>,
        // 'Attendance Form': <Form type={'attendance'} userId={userId} userType={userType} changePage={changePage}/>,
        // 'Subscription Form': <Form type={'subscription'} userId={userId} userType={userType} changePage={changePage}/>,
        // // 'Payment Form': <Form type={'payment'} userId={userId} userType={userType} changePage={changePage}/>,
        // 'Help Form': <Form type={'help'} userId={userId} userType={userType} changePage={changePage}/>,
    }

    useEffect(() => {
        // validate_token()
        // if (page !== undefined && !page.includes('Form'))
        // document.title = page
    }, [currentPage])

    return (
        <div class="flex h-screen bg-gray-50">
            <Sidebar changePage={changePage} />
            <div class="flex flex-col flex-1">
                <NavBar />
                <main class="h-full pb-16 overflow-y-auto">
                    {pages[page]}
                    {/* <div class="container px-6 mx-auto grid">
                        <h2
                        class="my-8 text-4xl font-semibold text-gray-700 dark:text-gray-200"
                        >
                        Blank
                        </h2>
                    </div> */}
                </main>
            </div>
        </div>
    );
}