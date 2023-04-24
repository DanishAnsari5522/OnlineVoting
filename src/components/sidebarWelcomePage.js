import SidebarButton from '../components/sidebarButton';
import AnchorLink from "react-anchor-link-smooth-scroll";

export default function SidebarWelcomePage({ changePage }) {

  const selectPage = (selectedPage) => {
    changePage(selectedPage)
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        class="z-4 hidden overflow-y-auto shadow bg-white dark:bg-gray-800 md:block flex-shrink-0 w-full"
      >
        <div class="py-0 text-gray-500 dark:text-gray-400 flex items-center w-full">
          <a
            class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200 w-52"
            href="#"
          >
            Online Voting
          </a>
          <ul class="mt-2 flex w-full">
            <AnchorLink href='#course'><button class="ml-4">Home</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#about'><button class="ml-4">About</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#testimonial'><button class="ml-4">Testimonial</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#event'><button class="ml-4">Event</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#ourclient'><button class="ml-4">Our Client</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#contact'><button class="ml-4">Contact</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
          </ul>
          <div class="mr-5">
            <SidebarButton name={'Login'} link={'/login'} selectPage={selectPage} />
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div id='mobile-sidebar-backdrop' class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center" style={{ display: "none" }}></div>
      <aside id='mobile-sidebar' class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden" style={{ display: "none" }}>
        <div class="py-4 text-gray-500 dark:text-gray-400">
          <a
            class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            href="#"
          >
            Online Voting
          </a>
          <ul class="mt-6  w-full">
          <AnchorLink href='#course'><button class="ml-4">Home</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#about'><button class="ml-4">About</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#testimonial'><button class="ml-4">Testimonial</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#event'><button class="ml-4">Event</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#ourclient'><button class="ml-4">Our Client</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
            <AnchorLink href='#contact'><button class="ml-4">Contact</button></AnchorLink>
            <div className='pt-2 pb-2'><hr /></div>
          </ul>
          <div class="mr-5">
            <SidebarButton name={'Login'} link={'/login'} selectPage={selectPage} />
          </div>
        </div>
      </aside>
    </>
  )
}