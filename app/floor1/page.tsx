import Map from '@/app/components/Map'
import FloorSwitcher from '@/app/components/FloorSwitcher'
import {
  stores0to20,
  stores21to40,
  stores41to60,
  stores61to80,
  stores81to100,
} from '@/app/components/stores'
import NavBar from '@/app/components/NavBar'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-6 mt-6 mb-4">
        <FloorSwitcher />
      </div>
      <Map
        imageSrc="/FashionEtage1.png"
        stores={[
          ...stores0to20,
          ...stores21to40,
          ...stores41to60,
          ...stores61to80,
          ...stores81to100,
        ]}
      />
      <Footer />
    </div>
  )
}
