import { checkoutSchemaType } from "@/schema/checkout.schema";

export default async function onlinePayment(
  cartId: string,
  redirectUrl: string,  
  checkoutData: checkoutSchemaType
) {
  

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(redirectUrl)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(checkoutData),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Payment API error. Status: ${response.status}, Body: ${errorBody}`);
      throw new Error("Failed to initiate online payment.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Online payment error:", error);
    throw error;
  }
}


