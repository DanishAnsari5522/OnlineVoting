export default function Card({title, value, icon, color}) {
    return (
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div class={`p-3 mr-4 text-${color}-500 bg-${color}-100 rounded-full`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d={icon} />
        </svg>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {title.includes('revenue') ? '₹'+value : value}
          </p>
        </div>
      </div>
    )
}