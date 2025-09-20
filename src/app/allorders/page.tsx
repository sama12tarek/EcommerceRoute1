
'use client'
import React, { useState, useEffect } from 'react';
import getUserOrder from '../checkoutAction/getUserOrder';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import getMyToken from '@/utilities/getMyToken';
import { jwtDecode } from 'jwt-decode';
import ViewBtn from '@/app/_components/viewBtn/viewBtn';
type Order = {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;

};

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);


  async function getAllProductOrders() {
    try {
      const token = await getMyToken();
      console.log(token)
      if (!token) throw new Error("Invalid token, please log in");




      const {
        id
      }: {
        id: string;
        name: string;
        role: string;
        iat: number;
        exp: number;
      } = jwtDecode(token.token);

    

      const res = await getUserOrder(id);
  
      setAllOrders(res);

    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  }

  useEffect(() => {
    getAllProductOrders();
  }, []);

  return (
    <div>
  <Table className="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm ">
  <TableCaption className="caption-bottom text-gray-600 text-sm py-2">
    A list of your recent orders.
  </TableCaption>

  <TableHeader className="bg-blue-600 text-white py-3">
    <TableRow>
      <TableHead className="text-right px-4 py-3 border-r border-blue-500 font-semibold text-center">#</TableHead>
      <TableHead className="px-4 py-3 border-r border-blue-500 font-semibold text-center">Order Price</TableHead>
      <TableHead className="px-4 py-3 font-semibold text-center">Actions</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {allOrders?.map((order) => (
      <TableRow
        key={order._id}
        className="even:bg-gray-50 odd:bg-white hover:bg-blue-100 transition-colors duration-200 cursor-pointer "
      >
        <TableCell className="text-right px-4 py-3 border-r border-gray-200 font-mono text-sm text-gray-700 text-center">
          {order._id.slice(0, 8)}...
        </TableCell>
        <TableCell className="px-4 py-3 border-r border-gray-200 font-medium text-gray-800 text-center">
          ${order.totalOrderPrice || 'N/A'}
        </TableCell>
        <TableCell className="px-4 py-3 text-center">
        
<ViewBtn orderId={order._id} />

      
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    </div>
  );
}


