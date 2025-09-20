'use client'

import React, { createContext, useState, useEffect } from 'react'
import getLoggedWishlist from '@/app/wishlistActions/getLoggedWishlist'
import { WishlistProduct } from '@/types/wishlist'

type WishlistContextType = {
  numberOfwishlistItem: number
  productIds: string[]
  toggleWishlist: (id: string) => void
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
)

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [numberOfwishlistItem, setNumberOfwishlistItem] = useState(0)
  const [productIds, setProductIds] = useState<string[]>([])

  async function getUserWishlist() {
    try {
      const res = await getLoggedWishlist()
      if (res.status === 'success') {
        const ids = res.data.map((p: WishlistProduct) => p._id) || []
        setProductIds(ids)
        setNumberOfwishlistItem(ids.length)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserWishlist()
  }, [])

  const toggleWishlist = (id: string) => {
    setProductIds((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((pid) => pid !== id)
        setNumberOfwishlistItem(updated.length)
        return updated
      } else {
        const updated = [...prev, id]
        setNumberOfwishlistItem(updated.length)
        return updated
      }
    })
  }

  return (
    <WishlistContext.Provider
      value={{ numberOfwishlistItem, productIds, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}







/*

'use client';

import React, { createContext, useState,useEffect } from 'react';
import getLoggedWishlist from '@/app/wishlistActions/getLoggedWishlist';
type WishlistContextType = {
  numberOfwishlistItem: number;
  setNumberOfwishlistItem: React.Dispatch<React.SetStateAction<number>>;
};
// فى WishlistContext.tsx
export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);


export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [numberOfwishlistItem, setNumberOfwishlistItem] = useState(0);
  async function getUserWishlist(){
  try {
      const res = await getLoggedWishlist();

      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
          setNumberOfwishlistItem(sum);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  }

  useEffect(() => {
    getLoggedWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ numberOfwishlistItem, setNumberOfwishlistItem }}>
      {children}
    </WishlistContext.Provider>
  );
}
*/