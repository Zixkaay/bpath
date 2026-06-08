"use client";

import { ScrollToTop } from './ScrollToTop';
import { DeveloperBadge } from './DeveloperBadge';
import { GoldActionBar } from './GoldActionBar';
import { MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram, Search, LayoutGrid, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const TopBar = () => (
  <div className="bg-[#050B14] text-[#A3A3A3] text-xs py-2 sm:py-3 px-4 md:px-8 flex flex-row justify-between items-center border-b border-[#262626]">
    <div className="flex items-center gap-2 text-center text-[10px] sm:text-xs">
      <MapPin size={12} className="text-[#d4af37] shrink-0 sm:w-3.5 sm:h-3.5" />
      <span className="font-medium tracking-wide">Accra, Ghana</span>
    </div>
    <div className="flex gap-3 sm:gap-4 items-center">
      <Facebook size={12} className="hover:text-[#d4af37] cursor-pointer transition-colors sm:w-4 sm:h-4" />
      <Instagram size={12} className="hover:text-[#d4af37] cursor-pointer transition-colors sm:w-4 sm:h-4" onClick={() => window.open('https://instagram.com/BillionairePath', '_blank')} />
      <Twitter size={12} className="hover:text-[#d4af37] cursor-pointer transition-colors sm:w-4 sm:h-4" />
      <Linkedin size={12} className="hover:text-[#d4af37] cursor-pointer transition-colors sm:w-4 sm:h-4" />
      <Youtube size={12} className="hover:text-[#d4af37] cursor-pointer transition-colors sm:w-4 sm:h-4" />
    </div>
  </div>
);

const MainNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative w-full z-40 pointer-events-none">
      <div className="px-2 sm:px-4 md:px-8 flex items-start w-full max-w-[1500px] mx-auto gap-2 sm:gap-4 md:gap-6 justify-end md:justify-start">
        <div className="hidden md:block w-[180px] lg:w-[220px] shrink-0 h-full"></div>

        <button 
          className="md:hidden pointer-events-auto text-[#d4af37] bg-[#050B14]/80 backdrop-blur border border-[#262626] p-3 rounded-xl mt-4 shrink-0 shadow-2xl relative z-50 mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex pointer-events-auto flex-1 justify-between items-center gap-2 w-full bg-[#0a0a0a]/95 backdrop-blur-md border border-[#262626] border-t-0 shadow-2xl py-3 md:py-4 px-4 sm:px-6 lg:px-8 rounded-b-2xl">
          <div className="flex justify-start items-center gap-1 md:gap-2 lg:gap-8 min-w-0">
            <div className="hidden md:flex gap-2 md:gap-3 lg:gap-8 text-xs xl:text-sm font-bold uppercase tracking-wider text-[#A3A3A3] items-center flex-wrap justify-start">
              <Link href="/" className="hover:text-[#d4af37] transition-colors flex items-center gap-1 shrink-0">Home</Link>
              <Link href="/about" className="hover:text-[#d4af37] transition-colors shrink-0">About</Link>
              <Link href="/gallery" className="hover:text-[#d4af37] transition-colors flex items-center gap-1 shrink-0">Gallery</Link>
              <Link href="/blog" className="hover:text-[#d4af37] transition-colors flex items-center gap-1 shrink-0">Newsroom</Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 hidden sm:flex shrink-0 justify-end">
             <div className="relative w-24 md:w-32 lg:w-48">
               <Search size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#A3A3A3] lg:w-4 lg:h-4" />
               <input type="text" placeholder="Search..." className="bg-transparent border-b border-[#262626] pb-1 outline-none text-[10px] md:text-xs lg:text-sm w-full focus:border-[#d4af37] text-white transition-colors" />
             </div>
             <LayoutGrid size={16} className="text-[#A3A3A3] hover:text-[#d4af37] cursor-pointer shrink-0 hidden md:block lg:w-[18px] lg:h-[18px]" />
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-full left-0 w-full bg-[#050B14] border-b border-[#262626] shadow-2xl flex flex-col items-center py-6 gap-6 font-bold uppercase tracking-widest text-sm animate-in slide-in-from-top-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#d4af37] transition-colors w-full text-center py-2 border-b border-[#262626]/50">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#d4af37] transition-colors w-full text-center py-2 border-b border-[#262626]/50">About</Link>
          <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#d4af37] transition-colors w-full text-center py-2 border-b border-[#262626]/50">Gallery</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#d4af37] transition-colors w-full text-center py-2">Newsroom</Link>
        </div>
      )}
    </nav>
  );
};

export const NextLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ScrollToTop />
      
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <TopBar />
        </div>
        <div className="pointer-events-auto">
          <GoldActionBar />
        </div>
        <div className="pointer-events-auto">
          <MainNav />
        </div>

        <div className="absolute left-1 sm:left-4 md:left-6 lg:left-8 top-[45px] sm:top-[55px] md:top-[75px] lg:top-[90px] z-[60] pointer-events-auto w-[90px] sm:w-[120px] md:w-[180px] lg:w-[220px] flex justify-center">
           <Link href="/" className="block transition-transform hover:scale-105">
             <img 
               src="https://res.cloudinary.com/dnhz6xwjz/image/upload/v1776840105/logo_ahkway.png" 
               alt="The Next Billionaire Logo" 
               className="w-full h-auto max-w-[85px] sm:max-w-[110px] md:max-w-[160px] lg:max-w-[190px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
             />
           </Link>
        </div>
      </div>

      <main className="flex-1 w-full overflow-x-hidden min-h-screen">
        {children}
      </main>

      <footer className="bg-[#050B14] text-white py-12 px-6 border-t border-[#262626] mt-auto relative z-10 pointer-events-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="font-bold tracking-widest text-[#d4af37] mb-2">THE BILLIONAIRE'S PATH</p>
            <p className="text-xs text-[#A3A3A3] mb-4">&copy; {new Date().getFullYear()} All rights reserved.</p>
            <div className="flex flex-col gap-2 mt-4 text-[11px] text-[#A3A3A3] uppercase tracking-wider">
               <a href="https://wa.me/233549834747" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors flex items-center justify-center md:justify-start gap-2">
                 GHANA: +233 54 983 4747 (WhatsApp)
               </a>
               <a href="https://wa.me/19296344138" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors flex items-center justify-center md:justify-start gap-2">
                 USA: +1 929 634 4138 (WhatsApp)
               </a>
            </div>
          </div>
          <div className="text-center md:text-right flex flex-col items-center md:items-end gap-1">
            <span className="text-[10px] text-[#A3A3A3] uppercase tracking-[0.2em] mb-1">Developed By</span>
            <span className="text-xl font-black tracking-widest text-white leading-none">KWASIE</span>
            <span className="text-xs text-[#d4af37] font-semibold tracking-wide mb-2">TECH INVENTIVE</span>
            <div className="flex gap-4 text-[10px] text-[#A3A3A3]">
               <span>techinventiveworks@gmail.com</span>
            </div>
          </div>
        </div>
      </footer>
      <DeveloperBadge />
    </>
  );
};
