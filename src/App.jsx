import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { ThemeProvider } from './context/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './pages/dashboard'
import City from './pages/city'
import { Toaster } from 'sonner'
import { useEffect, useState } from 'react'



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the loader has already been shown during this session
    const hasShownLoader = sessionStorage.getItem('hasShownLoader');

    if (!hasShownLoader) {
      // If not, show the loader and set the flag
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasShownLoader', 'true');
      }, 1300); // Loader duration

      // Cleanup the timer
      return () => clearTimeout(timer);
    } else {
      // If the loader was already shown, skip the loading phase
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className='w-full h-screen bg-black flex items-center justify-center'>
      <div>
        <img src="itsLoader.svg" alt="" className='w-[60vw] md:w-[35vw]' />
      </div>
    </div>
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme='dark'>
            <Layout>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/city/:cityName' element={<City />} />
              </Routes>
            </Layout>
            <Toaster richColors />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
