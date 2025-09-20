'use server'
import getMyToken from '@/utilities/getMyToken';

export default async function removeProductWishlist(id:string) {
const result=await getMyToken()


if(!result){
  throw new Error ('invalid token ')
}
const res=await  fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
    method:'DELETE',
    headers:{
      token:result.token as string
    }
  })
  const payload=await res.json()
  return payload
  
  
}
