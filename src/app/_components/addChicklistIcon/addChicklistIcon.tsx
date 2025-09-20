
'use client'

import React, { useContext, useState } from 'react'
import addProductWishlist from '@/app/wishlistActions/addProductWishlist'
import removeProductWishlist from '@/app/wishlistActions/removeProductWishlist'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { WishlistContext } from '@/app/context/wishlistContext'

type Props = {
  productId: string
}

export default function AddChicklistIcon({ productId }: Props) {
  const wishlistContext = useContext(WishlistContext)

  if (!wishlistContext) {
    throw new Error('AddChicklistIcon must be used within a WishlistContextProvider')
  }

  const { productIds, toggleWishlist } = wishlistContext
  const isInWishlist = productIds?.includes(productId)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)

    try {
      if (isInWishlist) {
        const res = await removeProductWishlist(productId)
        if (res.status === 'success') {
          toggleWishlist(productId)
          toast.success('Removed from wishlist', {
            position: 'top-center',
            duration: 2000,
          })
        } else {
          toast.error('Failed to remove from wishlist', {
            position: 'top-center',
            duration: 2000,
          })
        }
      } else {
        const res = await addProductWishlist(productId)
        if (res.status === 'success') {
          toggleWishlist(productId)
          toast.success('Added to wishlist', {
            position: 'top-center',
            duration: 2000,
          })
        } else {
          toast.error('Failed to add to wishlist', {
            position: 'top-center',
            duration: 2000,
          })
        }
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong', {
        position: 'top-center',
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant="ghost"
      className="p-2"
    >
      <i className={`fa fa-heart ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}></i>
    </Button>
  )
}





/*


'use client';

import React, { useState } from 'react';
import addProductWishlist from '@/app/wishlistActions/addProductWishlist';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";  
import { WishlistContext } from '@/app/context/wishlistContext';

type Props = {
  productId: string;
};

export default function AddChicklistIcon({ productId }: Props) {
  const [added, setAdded] = useState(false);

  async function addChickList() {
    try {
      const res = await addProductWishlist(productId);
      console.log(res);

      if (res.status === 'success') {
        toast.success('Added product to wishlist successfully', {
          position: 'top-center',
          duration: 2000,
        });
        setAdded(true);
      } else {
        toast.error('Failed to add product to wishlist', {
          position: 'top-center',
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'top-center',
        duration: 2000,
      });
      console.error(error);
    }
  }

  return (
    <Button
      onClick={addChickList}
      className= 'bg-white '>
            <i className={`fa fa-heart ${added ? 'bg-red-600' : 'bg-gray-400'}`}></i>

    </Button>
  );
}


*/