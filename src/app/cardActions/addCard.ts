'use server'
import getMyToken from '@/utilities/getMyToken'

export default async function addCard(id: string) {
  const tokenResult = await getMyToken();

  if (!tokenResult || tokenResult.status !== 'success') {
    throw new Error(tokenResult?.message || 'Not authorized to add product');
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      
      token: tokenResult.token as string,  
        'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ productId: id })
  });

  const data = await response.json();
  console.log(data);
  return data;
}


