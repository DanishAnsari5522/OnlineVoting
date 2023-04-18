
export default function VotingList({ type, userId, userType, changePage }) {
    return (
        <>

            <p class="text-gray-500 ml-10 my-7">Voting List</p>

            <div class='my-6 ml-4'>
                <a href="/client" class="font-medium text-white dark:text-blue-500 hover:bg-blue-800 bg-blue-700 px-3 py-2  rounded-lg">new Vote</a>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="col" class="px-6 py-3">
                                S No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Voting Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                cendidate
                            </th>
                            <th scope="col" class="px-6 py-3">
                                No. Of User
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Selected
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                01
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                For College CR
                            </th>
                            <td class="px-6 py-4">
                                Danish Ansari <br></br>
                                Shubham Mishra<br />
                                Deepak Kumar <br></br>
                                Ashutosh Tiwari
                            </td>
                            <td class="px-6 py-4">
                                24
                            </td>
                            <td class="px-6 py-4">
                                11/02/23
                            </td>
                            <td class="px-6 py-4">
                                <p class="text-red-600">Process....</p>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                02
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                For College CR
                            </th>
                            <td class="px-6 py-4">
                                Danish Ansari <br></br>
                                Shubham Mishra
                            </td>
                            <td class="px-6 py-4">
                                64
                            </td>
                            <td class="px-6 py-4">
                                12/03/23
                            </td>
                            <td class="px-6 py-4">
                                <p class="text-green-600">Shubham Mishra</p>
                            </td>
                        </tr>

                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                03
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                For XYZ
                            </th>
                            <td class="px-6 py-4">
                                Danish Ansari <br></br>
                                Shubham Mishra
                            </td>
                            <td class="px-6 py-4">
                                121
                            </td>
                            <td class="px-6 py-4">
                                14/06/26
                            </td>
                            <td class="px-6 py-4">
                                <p class="text-green-600">Danish Ansari</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}