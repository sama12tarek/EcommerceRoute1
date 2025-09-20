'use server';

import getMyToken from "@/utilities/getMyToken";
import { shippingAddressType } from "@/schema/cash.schema";

export default async function cashorder(orderId: string, formValues: shippingAddressType) {
  // محاولة الحصول على التوكن
  const result = await getMyToken();
  console.log(result);

  if (!result) {
    throw new Error('لا يمكن الحصول على التوكن');
  }

  // إرسال طلب POST مع البيانات
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}`, {
    method: 'POST',
    headers: {
      token: result.token,  // تأكد من أن الـ API يحتاج هذا الهيدر بهذا الشكل
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shippingAddress: formValues }),
  });

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      // في حال فشل parsing الـ JSON، نضع رسالة خطأ افتراضية
      errorData = { message: 'حدث خطأ غير معروف' };
    }

    const errorMessage = errorData?.message || 'حدث خطأ غير معروف';
    throw new Error(`خطأ: ${errorMessage}`);
  }

  const payload = await res.json();

  if (!payload) {
    throw new Error('لم يتم الحصول على البيانات من الخادم');
  }

  console.log(payload);
  return payload;
}


