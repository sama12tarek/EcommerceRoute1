'use client'

import { useEffect, useState } from 'react'
import getLoggedWishlist from '@/app/wishlistActions/getLoggedWishlist'
import removeProductWishlist from '@/app/wishlistActions/removeProductWishlist'
import Image from 'next/image'
import { toast } from 'sonner'
import { WishlistProduct } from '@/types/wishlist';



export default function Wishlist() {
  const [wishlists, setWishlists] = useState<WishlistProduct[]>([])


  async function fetchWishlist() {
    try {
      const res = await getLoggedWishlist()
      if (res.status === 'success') {
        setWishlists(res.data || [])
      }
    } catch (err) {
      console.error('Error loading wishlist:', err)
    }
  }

  // Remove product from wishlist
  async function handleRemove(id: string) {
    try {
      const res = await removeProductWishlist(id)
      if (res.status === 'success') {
        // تحديث الـ state بدون إعادة تحميل الصفحة
        setWishlists(prev => prev.filter(item => item._id !== id))
        toast.success('Product removed from wishlist', { position: 'top-center', duration: 2000 })
      } else {
        toast.error('Failed to remove product', { position: 'top-center', duration: 2000 })
      }
    } catch (err) {
      console.error(err)
      toast.error('Error removing product', { position: 'top-center', duration: 2000 })
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <div className="text-center my-10">
      <h1 className="text-xl font-semibold mb-4">My Wishlist</h1>

      {wishlists.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <ul className="mt-4 space-y-4 flex flex-wrap justify-center gap-6 w-full">
          {wishlists.map((item: WishlistProduct) => (
            <li
              key={item._id}
              className="px-4 py-2 bg-gray-100 rounded flex flex-col items-center"
            >
              <Image
                src={item.imageCover}
                width={300}
                height={300}
                alt={item.title}
                className="object-cover rounded"
              />
              <div className="text-center mt-4">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-700">${item.price}</p>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove <i className='fa fa-heart-broken'></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

