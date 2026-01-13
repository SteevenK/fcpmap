'use client'

import Map from '@/app/components/Map'
import FloorSwitcher from '@/app/components/FloorSwitcher'
import NavBar from '@/app/components/NavBar'
import Footer from '@/app/components/Footer'

export default function Floor2() {
    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
            <NavBar />
            <div className="container mx-auto px-6 mt-6 mb-4">
                <FloorSwitcher />
            </div>
            <Map
                imageSrc="/FashionEtage1.png" // Placeholder until FashionEtage2.png is available
                stores={[]} // Initially empty for Floor 2
            />
            <Footer />
        </div>
    )
}
