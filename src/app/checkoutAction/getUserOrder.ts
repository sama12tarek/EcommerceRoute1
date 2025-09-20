// src/app/checkoutAction/getSingleOrder.ts

export default async function getSingleOrder(orderId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${orderId}`);

  if (!res.ok) {
    throw new Error("فشل في جلب بيانات الطلب");
  }

  const data = await res.json();
   return data;
}

