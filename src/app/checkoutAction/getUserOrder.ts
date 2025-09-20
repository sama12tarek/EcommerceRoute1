// src/app/checkoutAction/getSingleOrder.ts
'use server'
export default async function getUserOrders(userId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);



  if (!res.ok) {
    throw new Error("فشل في جلب بيانات الطلب");
  }

  const data = await res.json();
  console.log(data)
   return data;
}

