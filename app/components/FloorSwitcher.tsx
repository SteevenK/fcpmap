'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FloorSwitcher() {
  const pathname = usePathname()

  const floors = [
    { name: '1er Étage', href: '/floor1' },
    { name: '2ème Étage', href: '/floor2' },
  ]

  const currentFloor = floors.find((f) => f.href === pathname) || floors[0]

  return (
    <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <MenuButton className="group inline-flex w-full items-center justify-center gap-x-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer border border-indigo-400/30 backdrop-blur-sm">
          {currentFloor.name}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-indigo-200 group-hover:text-white transition-colors"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-50 mt-2 w-56 origin-top-left rounded-xl bg-gray-900/95 backdrop-blur-md shadow-2xl ring-1 ring-white/10 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="p-1">
          {floors.map((floor) => (
            <MenuItem key={floor.href}>
              <Link
                href={floor.href}
                className="group flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors data-[focus]:bg-indigo-600 data-[focus]:text-white cursor-pointer"
              >
                {floor.name}
              </Link>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
