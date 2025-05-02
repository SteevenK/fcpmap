import Map from '@/app/components/Map'
import NavBar from '@/app/components/NavBar'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <NavBar />
      <Map />
      <Footer />
    </div>
  )
}
