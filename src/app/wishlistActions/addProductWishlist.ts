'use server'

import getMyToken from '@/utilities/getMyToken'

export default async function addProductWishlist(productId: string) {
  const result = await getMyToken()

  if (!result) {
    throw new Error('User is not logged in – token is empty')
  }

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    method: 'POST',
    headers: {
      token:result.token, 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  })

  const payload = await res.json()
  return payload
}

