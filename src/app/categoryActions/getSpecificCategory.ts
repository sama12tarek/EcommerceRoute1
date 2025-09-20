'use server'

export default async function getSpecificCategory(categoryId:string) {
  const res=await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,{
    method:'GET'
  })
const payload= await res.json()
  return payload
  
  
}
