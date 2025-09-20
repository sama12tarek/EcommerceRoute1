'use server'

export default async function relatedProducts(id:string) {

const res=await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,{
    method:'GET',
  
  })
  const data=await res.json()
  
  return data.data
  
  
}
