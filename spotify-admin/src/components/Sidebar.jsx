import { NavLink } from 'react-router-dom';
import {assets} from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[2vw]'>

        {/* bydefault its hidden, if screen size increases above 640px, it gets visible */}
        <img className='mt-5 w-[max(10vw,100px)] hidden sm:block' src={assets.logo} alt='' />
        {/* bydefault its visible(block), if screen size increases above 640px, it gets hidden */}
        <img className='mt-5 w-[max(5vw,40px)] mr-5 block sm:hidden' src={assets.logo_small} alt='' />

        <div className='flex flex-col gap-5 mt-10'>

            {/* ACTUALLY EACH NAVLINK IS A DIV AT FIRST WHEN CREATED*/}
            <NavLink to='/add-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img className='w-5'  src={assets.add_song} alt='' />
                <p className='hidden sm:block'>Add Song</p>
            </NavLink>

            <NavLink to='/list-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img className='w-5'  src={assets.song_icon} alt='' />
                <p className='hidden sm:block'>List Song</p>
            </NavLink>

            <NavLink to='/add-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img className='w-5'  src={assets.add_album} alt='' />
                <p className='hidden sm:block'>Add Album</p>
            </NavLink>

            <NavLink to='/list-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img className='w-5'  src={assets.album_icon} alt='' />
                <p className='hidden sm:block'>List Album</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar;