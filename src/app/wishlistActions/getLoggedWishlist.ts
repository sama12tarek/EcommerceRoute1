

'use server'

import getMyToken from '@/utilities/getMyToken'
import { WishlistProduct } from '@/types/wishlist';

interface WishlistApiResponse {
  status: 'success' | 'error'
  data: WishlistProduct[]
  message?: string
}

export default async function getLoggedWishlist(): Promise<WishlistApiResponse> {
  const result = await getMyToken()

  if (!result) {
    throw new Error('invalid token')
  }

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    method: 'GET',
    headers: {
      token: result.token,
    },
  })

  const payload: WishlistApiResponse = await res.json()
  return payload
}

