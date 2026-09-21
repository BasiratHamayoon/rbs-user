import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden relative">{children}</main>
      <Footer />
    </div>
  )
}