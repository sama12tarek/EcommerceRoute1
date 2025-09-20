'use server'


export default async function getAllorders() {
const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`,{
  method:'GET'
})

const payload=res.json()


  return  payload


  
  
}
