
export default function Users({ type, userId, userType, changePage }) {
    return (
        <>
            {/* <p>User table</p> */}
            <p class="text-gray-500 ml-10 my-7"> VOTING NAME :- For College CR</p>
            <div class='my-6 ml-4 flex-1 items-center'>
                <a href="/client" class="font-medium text-white dark:text-blue-500 hover:bg-blue-800 bg-blue-700 px-3 py-2  rounded-lg ">Create User</a>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="col" class="px-6 py-3">
                                User Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                313
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Danish Ansari
                            </th>
                            <td class="px-6 py-4">
                                MERN Stack Developer
                            </td>
                            <td class="px-6 py-4">
                                <p class="text-green-600">Vote Done</p>
                                {/* <p class="text-red-600">InActive</p> */}
                            </td>
                        </tr>



                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                352
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Shubham Mishra
                            </th>
                            <td class="px-6 py-4">
                                Data Analytics
                            </td>
                            <td class="px-6 py-4">
                                {/* <p class="text-green-600">Active</p> */}
                                <p class="text-red-600">Not Voted</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}