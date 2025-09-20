'use server'


import getMyToken from '@/utilities/getMyToken'

export default async function clearCardItem() {
const token=await getMyToken()
const res=await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
  method:'DELETE',
  headers:{
    token:token.token as string
  }
})
  const payload=await res.json()
  return payload
}
