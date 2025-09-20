'use server'

export default async function getAllCategory(){


const res= await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,{
  method:'GET',

})

const {data}= await res.json()
return data

}