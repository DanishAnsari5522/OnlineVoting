import { useNavigate } from 'react-router-dom';
export default function SidebarButton({ name, icon, link, selectPage }) {
    const navigate = useNavigate();
    return (
        <>
            <li class="relative px-6 py-3">
                <button
                    class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    onClick={() => {
                        document.getElementById('mobile-sidebar-backdrop').style.display = 'none';
                        document.getElementById('mobile-sidebar').style.display = 'none'
                        navigate(link);
                        selectPage(name === 'Client' ? 'Users' : name)
                    }}
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
                            d={icon}
                        ></path>
                    </svg>
                    <span class="ml-4">{name}</span>
                </button>
            </li>
        </>
    )
}