'use client'

import Map from '@/app/components/Map'
import NavBar from '@/app/components/NavBar'
import Footer from '@/app/components/Footer'

export default function Floor2() {
    return (
        <div className="min-h-screen flex flex-col pt-24">
            <NavBar />
            <div className="flex-1 w-full">
                <Map
                    imageSrc="/FashionEtage1.png" // Placeholder until FashionEtage2.png is available
                    stores={[]} // Initially empty for Floor 2
                />
                <Footer />
            </div>
        </div>
    )
}
