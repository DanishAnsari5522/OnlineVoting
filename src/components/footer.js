export default function Footer() {
    return (

    <footer class="p-4 z-[-1] md:z-10 fixed bottom-0 left-0 w-screen bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href={`http://${window.location.host}`} class="hover:underline">Attendance Management™</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="about" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="privacy_policy" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="toa" class="mr-4 hover:underline md:mr-6">Terms of Agreement</a>
            </li>
            <li>
                <a href="contact" class="hover:underline">Contact</a>
            </li>
        </ul>
    </footer>

    )
}