'use server'

import getMyToken from '@/utilities/getMyToken';

export default async function getLoggedUser() {
  const result = await getMyToken();
console.log(result)

  if (!result) {
    throw new Error('There isn’t a valid token');
  }

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    method: 'GET',
    headers: {
      token: result.token,           
      'Content-Type': 'application/json',
    },
  });

  const payload = await res.json();
  return payload;
}









