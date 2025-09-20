

'use client'
import React, { useState, useEffect } from 'react';

import getOrder from '@/app/checkoutAction/getorder';
import {useParams} from 'next/navigation'
import { jwtDecode } from 'jwt-decode';
import getMyToken from '@/utilities/getMyToken'
type Order = {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress?: {
    city: string;
    details: string;
  };
};


export default function Page() {




  const { orderid } =useParams();
console.log(orderid)
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        
        const token=await getMyToken()
          const {
        id 
      }: {
        id: string;
        name: string;
        role: string;
        iat: number;
        exp: number;
      } = jwtDecode(token.token as string);
      
            const orderData=await getOrder(orderid as string,id)
        if (!orderData) {
          setError('لم يتم العثور على الطلب!');
        } else {
          setOrder(orderData);
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('حدث خطأ أثناء تحميل تفاصيل الطلب');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderid]);

  if (loading) return <p>جاري تحميل البيانات...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">


    
      <h1 className="text-2xl font-bold mb-4">تفاصيل الطلب</h1>

    
      <div className="bg-gray-800 p-4 rounded shadow-sm mb-4">
        <p><strong>Order ID:</strong> {order?._id}</p>
        <p><strong>Total Price:</strong> ${order?.totalOrderPrice}</p>
        <p><strong>Payment Method:</strong> {order?.paymentMethodType}</p>
      </div>

  
      <div className="bg-gray-800 p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-semibold mb-2">بيانات العميل:</h2>
        <p><strong>Name:</strong> {order?.user?.name}</p>
        <p><strong>Email:</strong> {order?.user?.email}</p>
        <p><strong>Phone:</strong> {order?.user?.phone || 'N/A'}</p>
      </div>

  
      <div className="bg-gray-100 p-4 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-2">عنوان الشحن:</h2>
        <p><strong>City:</strong> {order?.shippingAddress?.city}</p>
        <p><strong>Details:</strong> {order?.shippingAddress?.details}</p>
      </div>
    </div>
  );
}






