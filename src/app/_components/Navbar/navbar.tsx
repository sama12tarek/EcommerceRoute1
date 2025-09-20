'use client'

import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/app/context/cartContext";
import { WishlistContext } from "@/app/context/wishlistContext";

export default function Navbar() {
  const { data: session, status } = useSession();
  const wishlist = useContext(WishlistContext);
  const cart = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
      return newMode;
    });
  }

  if (!cart) return <h1>error cant find cart</h1>;
  if (!wishlist) return <h1>cant find wishlist</h1>;

  const { numberOfwishlistItem } = wishlist;
  const { numberOfCartItem } = cart;
  const isLoading = status === 'loading';

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-sky-800 text-white'}`}>
  <div className="w-[90%] mx-auto flex flex-wrap items-center justify-between">
    {/* Logo */}
    <div className="flex items-center gap-2 font-bold text-2xl">
      <Link href="/" className="flex items-center gap-2">
        <span>Freshcard</span>
        <i className="fa-solid fa-cart-shopping"></i>
      </Link>

      {/* Toggle Menu (mobile) */}
      <button
        className="lg:hidden text-white text-xl ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>

    {/* Links */}
    <div className={`w-full lg:flex lg:items-center lg:w-auto transition-all duration-300 ${menuOpen ? 'block mt-4' : 'hidden'}`}>
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <li><Link href="/">Home</Link></li>
        <li>
          <Link href="/card" className="relative">
            Cart <i className='fa fa-basket-shopping'></i>
            {numberOfCartItem > 0 && (
              <span className='absolute top-[-10px] end-[-15px] rounded-full flex h-5 w-5 text-xs text-emerald-600 justify-center items-center bg-sky-200'>
                {numberOfCartItem}
              </span>
            )}
          </Link>
        </li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/category">Category</Link></li>
        <li><Link href="/brands">Brands</Link></li>
        <li className="relative">
          <Link href="/wishlist">
            Wishlist <i className="fa fa-heart"></i>
            {numberOfwishlistItem > 0 && (
              <span className='absolute top-[-10px] end-[-15px] rounded-full flex h-5 w-5 text-xs text-emerald-600 justify-center items-center bg-sky-200'>
                {numberOfwishlistItem}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>

    {/* Dark Mode + Login/Logout */}
    <div className={`w-full lg:w-auto flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4 lg:mt-0 ${menuOpen ? 'block' : 'hidden lg:flex'}`}>
      <button
        onClick={toggleDarkMode}
        className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <ul className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-start lg:items-center">
        {!session ? (
          <>
            <li><i className="fab fa-facebook text-blue-600"></i></li>
            <li><i className="fab fa-instagram text-pink-500"></i></li>
            <li><i className="fab fa-twitter text-blue-400"></i></li>
            <li><i className="fab fa-tiktok text-black"></i></li>
            <li><i className="fab fa-linkedin text-blue-700"></i></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-500 hover:underline">
                Sign Out
              </button>
            </li>
            <li className="text-green-300 font-semibold">
              {session.user?.name}
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

  );
}






/*
'use client'

import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/app/context/cartContext";
import { WishlistContext } from "@/app/context/wishlistContext";

export default function Navbar() {
  const { data: session ,status} = useSession();
  const wishlist = useContext(WishlistContext);
  const cart = useContext(CartContext);

  const [darkMode, setDarkMode] = useState(false);

  // حفظ تفضيل المستخدم في localStorage وتطبيقه عند تحميل الصفحة
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // تغيير الكلاس عند التبديل وتخزين التفضيل
  function toggleDarkMode() {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
      return newMode;
    });
  }

  if (!cart) return <h1>error cant find cart</h1>; 
  if (!wishlist) return <h1>cant find cart</h1>;

  const { numberOfwishlistItem } = wishlist;
  const { numberOfCartItem } = cart;

  function logout() {
    signOut({callbackUrl:'/login'});
  }

  const isLoading = status === 'loading';

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <nav className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-sky-800 text-white'}`}>
      <div className="container w-[80%] mx-auto flex flex-col lg:flex-row justify-between items-center">
        
        <div className="left">
          <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">
            <li className="flex items-center gap-2 font-bold text-2xl">
              <span>Freshcard</span>
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
            <li><Link href="/">Home</Link></li>
            <li>
              <Link href="/card" className="relative">
                Card <i className='fa fa-basket-shopping'></i>
                {numberOfCartItem > 0 && (
                  <span className='absolute top-[-19px] end-[-19px] rounded-full flex h-7 w-7 text-emerald-600 justify-center items-center bg-sky-200'>
                    {numberOfCartItem}
                  </span>
                )}
              </Link>
            </li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/category">Category</Link></li>
            <li><Link href="/brands">Brands</Link></li>
            <li className="relative">
              <Link href="/wishlist">
                wishlist <i className="fa fa-heart"></i>
                {numberOfwishlistItem > 0 && (
                  <span className='absolute top-[-19px] end-[-19px] rounded-full flex h-7 w-7 text-emerald-600 justify-center items-center bg-sky-200'>
                    {numberOfwishlistItem}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        <div className="right mt-4 lg:mt-0 flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">
            {!session ? (
              <>
                <li><i className="fab fa-facebook text-blue-600"></i></li>
                <li><i className="fab fa-instagram text-pink-500"></i></li>
                <li><i className="fab fa-twitter text-blue-400"></i></li>
                <li><i className="fab fa-tiktok text-black"></i></li>
                <li><i className="fab fa-linkedin text-blue-700"></i></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={logout} className="text-red-700 hover:underline">
                    Sign Out
                  </button>
                </li>
                <li className="text-green-800 font-semibold">
                  {session.user?.name}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
















/*
'use client'

import React, { useContext } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/app/context/cartContext";
import { WishlistContext } from "@/app/context/wishlistContext";

export default function Navbar() {
  const { data: session ,status} = useSession();
const wishlist = useContext(WishlistContext);

const cart = useContext(CartContext);

if (!cart) return <h1>error cant find cart</h1>; 
if(!wishlist) return <h1>cant find cart</h1>;

const {numberOfwishlistItem}=wishlist;
const { numberOfCartItem } = cart;
  function logout(){
    signOut({callbackUrl:'/login'})
  }
    const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  if (isLoading) {
  return <div>Loading...</div>;
}

if (!isAuthenticated) {
  return <div>Please log in</div>;
}

  return (
    <nav className="bg-sky-800 p-4">
      <div className="container w-[80%] mx-auto flex flex-col lg:flex-row justify-between items-center">
      
        <div className="left">
          <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">
            <li className="flex items-center gap-2 font-bold text-2xl">
              <span>Freshcard</span>
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
            <li><Link href="/">Home</Link></li>
          <li>
  <Link href="/card" className="relative">
    Card  <i className='fa fa-basket-shopping'></i>
    {numberOfCartItem > 0 && (
      <span className='absolute top-[-19px] end-[-19px] rounded-full flex h-7 w-7 text-emerald-600 justify-center items-center bg-sky-200'>
     {numberOfCartItem}
      </span>
    )}
  </Link>
</li>

            <li><Link href="/products">Products</Link></li>
            <li><Link href="/category">Category</Link></li>
        
              <li><Link href="/brands">Brands</Link></li>
            
<li className="relative">
  <Link href="/wishlist">
    wishlist <i className="fa fa-heart"></i>
    {numberOfwishlistItem > 0 && (
      <span className='absolute top-[-19px] end-[-19px] rounded-full flex h-7 w-7 text-emerald-600 justify-center items-center bg-sky-200'>
        {numberOfwishlistItem}
      </span>
    )}
  </Link>
</li>




      
          
          </ul>
        </div>

    
        <div className="right mt-4 lg:mt-0">
          <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">

            {!session ? (
              <>
                <li><i className="fab fa-facebook text-blue-600"></i></li>
                <li><i className="fab fa-instagram text-pink-500"></i></li>
                <li><i className="fab fa-twitter text-blue-400"></i></li>
                <li><i className="fab fa-tiktok text-black"></i></li>
                <li><i className="fab fa-linkedin text-blue-700"></i></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => logout()} className="text-red-700 hover:underline">
                    Sign Out
                  </button>
                </li>
                <li className="text-green-800 font-semibold">
                  {session.user?.name}
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}


*/
