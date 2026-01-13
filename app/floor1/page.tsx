import Map from '@/app/components/Map'
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
    <div className="min-h-screen flex flex-col pt-16">
      <NavBar />
      <div className="flex-1 w-full">
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
    </div>
  )
}
