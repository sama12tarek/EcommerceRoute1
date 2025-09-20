'use server'
import getMyToken from '@/utilities/getMyToken'

export default async function updateQuantityCard(id: string, count: string) {
  const token = await getMyToken()


  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: 'PUT',
    headers: {
      token:token.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ count }) // هنا تبعت البيانات صح
  })

  const payload = await res.json()
  return payload
}

