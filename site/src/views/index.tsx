
import { Outlet } from "react-router-dom"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer className="sticky bottom-0 z-10 sm:hidden" />
    </>
  )
}
export default Main