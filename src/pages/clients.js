
export default function Clients({ type, userId, userType, changePage }) {
    return (
        <>
            <p class="text-gray-500 ml-10 my-7">Client List</p>

            <div class='my-6 ml-4'>
                <input type='file' />
                <a href="/client" class="font-medium text-white dark:text-blue-500 hover:bg-blue-800 bg-blue-700 px-3 py-2  rounded-lg">Create Client</a>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="col" class="px-6 py-3">
                                Business name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Approve
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Makhrum PVT LTD
                            </th>
                            <td class="px-6 py-4">
                                For Class CR
                            </td>
                            <td class="px-6 py-4">
                                <p class="text-green-600">Active</p>
                                {/* <p class="text-red-600">InActive</p> */}
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">Yes</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">No</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">View</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">Delete</a>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Shukhram PVT LTD
                            </th>
                            <td class="px-6 py-4">
                                For Class CR
                            </td>
                            <td class="px-6 py-4">
                                {/* <p class="text-green-600">Active</p> */}
                                <p class="text-red-600">InActive</p>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">Yes</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">No</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">View</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">Delete</a>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Makhrum PVT LTD
                            </th>
                            <td class="px-6 py-4">
                                For Class CR
                            </td>
                            <td class="px-6 py-4">
                                <p class="text-green-600">Active</p>
                                {/* <p class="text-red-600">InActive</p> */}
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">Yes</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">No</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">View</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">Delete</a>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Shukhram PVT LTD
                            </th>
                            <td class="px-6 py-4">
                                For Class CR
                            </td>
                            <td class="px-6 py-4">
                                {/* <p class="text-green-600">Active</p> */}
                                <p class="text-red-600">InActive</p>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">Yes</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">No</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">View</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">Delete</a>
                            </td>
                        </tr>    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Shukhram PVT LTD
                            </th>
                            <td class="px-6 py-4">
                                For Class CR
                            </td>
                            <td class="px-6 py-4">
                                {/* <p class="text-green-600">Active</p> */}
                                <p class="text-red-600">InActive</p>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">Yes</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">No</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">View</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">Delete</a>
                            </td>
                        </tr>    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Shukhram PVT LTD
                            </th>
                            <td class="px-6 py-4">
                                For Class CR
                            </td>
                            <td class="px-6 py-4">
                                {/* <p class="text-green-600">Active</p> */}
                                <p class="text-red-600">InActive</p>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">Yes</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">No</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">View</a>
                                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}