import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { ThemeProvider } from './context/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './pages/dashboard'



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

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme='dark'>
            <Layout>
              <Routes>
                <Route path='/' element={<Dashboard />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App