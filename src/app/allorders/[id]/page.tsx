'use client';

import  { useEffect, useState } from 'react';

export type Root = Root2[];

export interface Root2 {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  paidAt?: string;
}

export interface ShippingAddress {
  details: string;
  city: string;
  phone?: string;
  postalCode?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  count: number;
  product: Product;
  price: number;
  _id: string;
}

export interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [order, setOrder] = useState<Root2 | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">تفاصيل الطلب</h1>

      <div className="bg-gray-100 p-4 rounded shadow-sm mb-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total Price:</strong> ${order.totalOrderPrice}</p>
        <p><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
        <p><strong>Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</p>
        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
      </div>
    </div>
  );
}









/*
'use client'
import React, { useState, useEffect } from 'react';
import getUserOrder from '@/app/checkoutAction/getUserOrder';

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

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getUserOrder(id);
        if (!data) {
          setError('لم يتم العثور على الطلب!');
        } else {
          setOrder(data);
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('حدث خطأ أثناء تحميل تفاصيل الطلب');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) return <p>جاري تحميل البيانات...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">


    
      <h1 className="text-2xl font-bold mb-4">تفاصيل الطلب</h1>

    
      <div className="bg-gray-100 p-4 rounded shadow-sm mb-4">
        <p><strong>Order ID:</strong> {order?._id}</p>
        <p><strong>Total Price:</strong> ${order?.totalOrderPrice}</p>
        <p><strong>Payment Method:</strong> {order?.paymentMethodType}</p>
      </div>

  
      <div className="bg-gray-100 p-4 rounded shadow-sm mb-4">
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


*/



