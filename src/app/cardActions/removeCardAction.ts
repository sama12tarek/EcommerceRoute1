
'use server'
import getMyToken from'@/utilities/getMyToken'

export default async function removeCardAction(id:string){

try{
const token =await getMyToken()
if(!token){
  throw new Error('please try again')
}
const res=await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
  method: 'DELETE',
  headers:{
    token:token.token as string,
  },
})
const data= await res.json()
return data
}
catch{
console.log('error')
}

}