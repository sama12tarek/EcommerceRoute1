

'use server';

import {  checkoutSchemaType } from '@/schema/checkout.schema';
import getMyToken from '@/utilities/getMyToken'
export default async function onlinePayment(
  cartId: string,
  redirectUrl: string,
  checkoutData: checkoutSchemaType
) {
  try {
    const token = await getMyToken()

    if (!token) {
      throw new Error("لم يتم العثور على التوكن في الكوكيز. يجب تسجيل الدخول.");
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(redirectUrl)}`,
      {
        method: "POST",
        headers: {
            token:token.token as string,
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(checkoutData),
      }
    );

    const data = await response.json();
    console.log(data)
    return data;
  

    if (!data || data.status === "fail" || data.message) {
      throw new Error(data.message || "Failed to initiate online payment.");
    }



  } catch (error: unknown) {
    console.error("Online payment error:", error);
    throw error;
  }
      
}
