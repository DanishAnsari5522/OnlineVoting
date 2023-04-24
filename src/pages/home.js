import { useState, useEffect } from 'react';
import Users from './users'
import Clients from './clients';
import VotingList from './votingList';
import Sidebar from '../components/sidebar';
import NavBar from '../components/navbar';
import HelpTicket from './help';
import Dashboard from './dashboard';

export default function Home(currentPage) {
    const [page, setPage] = useState(currentPage)

    const changePage = (page) => setPage(page);

    let pages = {
        Dashboard: <Dashboard changePage={changePage} />,
        Users: <Users type={'user'} changePage={changePage} />,
        Clients: <Clients type={'user'} changePage={changePage} />,
        VotingList: <VotingList type={'user'} changePage={changePage} />,
        Help: <HelpTicket type={'user'} changePage={changePage} />,
    }

    useEffect(() => {
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