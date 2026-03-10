'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi'
import Image from "next/image";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpenMenu(null)
    setSidebarOpen(false)
  }, [pathname])

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu))
  }

  const handleClose = () => {
    setOpenMenu(null)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className='fixed top-0 w-full z-50 flex items-center py-2 px-8 border-b border-gray-700 bg-[#060f20]'
      >
        {/* BOTÓN HAMBURGUESA (solo md y menor) */}
        <div className="flex items-center gap-3">
          {/* BOTÓN HAMBURGUESA */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white text-2xl"
          >
            <FiMenu />
          </button>

          {/* LOGO */}
          <Link 
            href="/" 
            onClick={handleClose}
            className='flex items-center gap-2 transition duration-300 hover:scale-110'
          >
            <Image
              src="/logo.png"
              alt="Pingu Store Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
            <h1 className='text-xl font-semibold'>Pingu Store</h1>
          </Link>
        </div>

        {/* MENÚ DESKTOP — EXACTAMENTE IGUAL */}
        <ul className='hidden lg:flex gap-6 text-md ml-32'>
          <Link 
            href="/" 
            onClick={handleClose}
            className='px-3 py-1.5 rounded-md text-gray-300 hover:bg-gray-900 hover:text-white transition-colors duration-200'
          >
            Inicio
          </Link>

          {/* Players */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu('players')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className="px-3 py-1.5 rounded-md flex items-center gap-1 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Skins de Personaje <FiChevronDown />
            </button>

            <div
              className={`absolute left-0 top-full mt-2 w-47 bg-[#030915] border border-gray-700 rounded-lg shadow-lg transition-all duration-200
                ${openMenu === 'players' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}
              `}
            >
              <Link href="/player" onClick={handleClose} className="block px-4 py-2 underline text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                Ver todo
              </Link>
              <Link href="/player/ct" onClick={handleClose} className="block px-4 py-2 text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                Counter-Terrorist
              </Link>
              <Link href="/player/tt" onClick={handleClose} className="block px-4 py-2 text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                Terrorist
              </Link>
            </div>
          </li>

          {/* Weapons */}
          <li 
            className="relative"
            onMouseEnter={() => setOpenMenu('weapons')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className="px-3 py-1.5 rounded-md flex items-center gap-1 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Skins de Armas <FiChevronDown />
            </button>

            <div className={`absolute left-0 top-full mt-2 w-41 bg-[#030915] border border-gray-700 rounded-lg shadow-lg transition-all duration-200
              ${openMenu === 'weapons' ? 'opacity-100 visible' : 'opacity-0 invisible'}
            `}>
              <Link href="/weapons" onClick={handleClose} className="block px-4 py-2 underline text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                Ver todo
              </Link>
              <Link href="/weapons/ak47" onClick={handleClose} className="block px-4 py-2 text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                AK-47
              </Link>
              <Link href="/weapons/awp" onClick={handleClose} className="block px-4 py-2 text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                AWP
              </Link>
              <Link href="/weapons/cuchillo" onClick={handleClose} className="block px-4 py-2 text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                Cuchillos
              </Link>
              <Link href="/weapons/deagle" onClick={handleClose} className="block px-4 py-2 text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                Deagle
              </Link>
              <Link href="/weapons/m4a1" onClick={handleClose} className="block px-4 py-2 text-md text-gray-300 hover:bg-[#121d39] hover:text-white">
                M4A1
              </Link>
            </div>
          </li>

          <Link 
            href="/packs" 
            onClick={handleClose}
            className='px-3 py-1.5 rounded-md hover:bg-gray-900 text-gray-300 hover:text-white transition-colors duration-200'
          >
            Packs de Skins
          </Link>

          <Link 
            href="/pedido" 
            onClick={handleClose}
            className='px-3 py-1.5 rounded-md text-gray-300 hover:bg-gray-900 hover:text-white transition-colors duration-200'
          >
            Pedir una Skin
          </Link>
        </ul>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden
        ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#020817] border-r border-gray-700 z-50 transform transition-transform duration-300 lg:hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-xl font-semibold text-white">Menú</span>
          <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl">
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-2 text-md">

          <Link href="/" onClick={handleClose} className="text-gray-300 hover:text-white mb-4">
            Inicio
          </Link>

          {/* Dropdown Players móvil */}
          <button
            onClick={() => toggleMenu('playersMobile')}
            className="flex items-center justify-between text-gray-300 hover:text-white"
          >
            Skins de Personaje
            <FiChevronDown />
          </button>

          <div className={`ml-4 flex flex-col gap-1 overflow-hidden transition-all mb-3
            ${openMenu === 'playersMobile' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <Link href="/player" onClick={handleClose} className="text-gray-400 underline">Ver todo</Link>
            <Link href="/player/ct" onClick={handleClose} className="text-gray-400">Counter-Terrorist</Link>
            <Link href="/player/tt" onClick={handleClose} className="text-gray-400">Terrorist</Link>
          </div>

          {/* Dropdown Weapons móvil */}
          <button
            onClick={() => toggleMenu('weaponsMobile')}
            className="flex items-center justify-between text-gray-300 hover:text-white"
          >
            Skins de Armas
            <FiChevronDown />
          </button>

          <div className={`ml-4 flex flex-col gap-1 overflow-hidden transition-all mb-3
            ${openMenu === 'weaponsMobile' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <Link href="/weapons" onClick={handleClose} className="text-gray-400 underline">
              Ver todo
            </Link>
            <Link href="/weapons/ak47" onClick={handleClose} className="text-gray-400">
              AK-47
            </Link>
            <Link href="/weapons/awp" onClick={handleClose} className="text-gray-400">
              AWP
            </Link>
            <Link href="/weapons/cuchillo" onClick={handleClose} className="text-gray-400">
              Cuchillos
            </Link>
            <Link href="/weapons/deagle" onClick={handleClose} className="text-gray-400">
              Deagle
            </Link>
            <Link href="/weapons/m4a1" onClick={handleClose} className="text-gray-400">
              M4A1
            </Link>
            
          </div>

          <Link href="/packs" onClick={handleClose} className="text-gray-300 mb-4 hover:text-white">
            Packs de Skins
          </Link>

          <Link href="/pedido" onClick={handleClose} className="text-gray-300 mb-4 hover:text-white">
            Pedir una Skin
          </Link>

        </nav>
      </aside>
    </>
  )
}

export default Navbar