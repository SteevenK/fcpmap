import { MdMap } from 'react-icons/md'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <span className="flex items-center text-2xl font-bold text-indigo-600">
          <MdMap className="mr-2 w-6 h-6" />
          <Link href={'/'}> Fashion Map </Link>
        </span>
      </div>
    </nav>
  )
}
