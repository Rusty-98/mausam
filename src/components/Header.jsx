
import { useTheme } from '@/context/theme-provider'
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom'
import CitySearch from './CitySearch';

const Header = () => {

    const { theme, setTheme } = useTheme();
    const isdark = theme === 'dark';

    return (
        <header className='sticky top-0 z-50 py-2 backdrop-blur w-full border-b'>
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                <Link to='/' className='flex items-center justify-center gap-2'>
                    <img src="logo.png" alt="" className='w-16 h-16' />
                </Link>
                <div className='flex gap-4'>
                    {/* search */}
                    <CitySearch />
                    {/* theme provider */}
                    <div className='cursor-pointer' onClick={() => {
                        setTheme(isdark ? 'light' : 'dark')
                    }}>
                        {isdark ? <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all' /> : <Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all' />}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header