'use client';

import React, { useEffect, useState, useContext, useCallback } from 'react';
import getLoggedUser from '@/app/cardActions/getLoggedUser';
import { toast } from "sonner";
import removeCardAction from '@/app/cardActions/removeCardAction';
import updateQuantityCard from '@/app/cardActions/updateQuantityCard';
import { Button } from "@/components/ui/button";  
import clearCardItem from '@/app/cardActions/clearCardItem';
import { CartContext } from './../context/cartContext';
import Link from 'next/link';
import Image from "next/image";

type Product = {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
};

export default function CardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removeDisable, setRemoveDisable] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext must be used within a CartContextProvider");
  }

  const { setNumberOfCartItem } = context;
  const [total, setTotal] = useState<number>(0);
  const [cartId, setCartId] = useState<string>('');

  // ✅ دالة محمية باستخدام useCallback عشان تحذير useEffect
  const loggedUserCard = useCallback(async () => {
    try {
      const res = await getLoggedUser();
      if (res.status === 'success') {
        setProducts(res.data.products);
        setTotal(res.data.totalCartPrice);
        setCartId(res.data._id);
        let sum = 0;
        res.data.products.forEach((p: Product) => (sum += p.count));
        setNumberOfCartItem(sum);
      } else {
        toast.error('⚠️ Failed to load products');
      }
    } catch (error) {
  if (error instanceof Error) {
    console.log("❌ Error message:", error.message);
    toast.error(`Something went wrong: ${error.message}`);
  } else {
    console.error("Unknown error", error);
    toast.error("An unknown error occurred");
  }
    } finally {
      setIsLoading(false);
    }
  }, [setNumberOfCartItem]);

  useEffect(() => {
    loggedUserCard();
  }, [loggedUserCard]);

  async function removeCardProduct(id: string) {
    setUpdateDisable(true);
    setRemoveDisable(true);

    const res = await removeCardAction(id);

    if (res.status === 'success') {
      setProducts(res.data.products);
      setTotal(res.data.totalCartPrice);
      toast.success('Product deleted successfully');
      let sum = 0;
      res.data.products.forEach((p: Product) => (sum += p.count));
      setNumberOfCartItem(sum);
    } else {
      toast.error('Can’t delete product now');
    }

    setUpdateDisable(false);
    setRemoveDisable(false);
  }

  async function clearCart() {
    const res = await clearCardItem();
    if (res.message === 'success') {
      setProducts([]);
      setNumberOfCartItem(0);
      setTotal(0);
    }
  }

  async function updateCount(id: string, newCount: number) {
    setRemoveDisable(true);
    setCurrentId(id);
    setUpdateDisable(true);

    // ✅ إذا updateQuantityCard يستقبل string، حوله
    const updateCart = await updateQuantityCard(id, newCount.toString());

    if (updateCart.status === 'success') {
      setProducts(updateCart.data.products);
      setTotal(updateCart.data.totalCartPrice);
      toast.success('Quantity updated successfully');

      let sum = 0;
      updateCart.data.products.forEach((p: Product) => (sum += p.count));
      setNumberOfCartItem(sum);
    } else {
      toast.error('Can’t update the quantity');
    }

    setUpdateDisable(false);
    setCurrentId('');
    setRemoveDisable(false);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto my-12 w-2/3">
      {products.length > 0 ? (
        <>
          <div className="flex justify-end">
            <Button
              className="bg-sky-200 my-4 hover:bg-sky-500"
              onClick={clearCart}
            >
              Clear cart items
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-4">🛒 My Cart</h1>
          <h1 className="text-2xl text-center font-bold text-sky-900">
            Total cart price: ${total}
          </h1>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-16 py-3"><span className="sr-only">Image</span></th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        src={product.product.imageCover}
                        width={100}
                        height={100}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>

                    <td className="px-6 py-4 flex items-center">
                      <button
                        disabled={updateDisable}
                        onClick={() =>
                          product.count > 1 &&
                          updateCount(product.product._id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:bg-slate-900 disabled:text-amber-50"
                      >
                        -
                      </button>
                      <div>
                        {product.product._id === currentId ? (
                          <i className="fas fa-spinner fa-spin fa-2x text-gray-600"></i>
                        ) : (
                          <span className="px-4">{product.count}</span>
                        )}
                      </div>
                      <button
                        disabled={updateDisable}
                        onClick={() =>
                          updateCount(product.product._id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:bg-slate-900 disabled:text-amber-50"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.price * product.count}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        disabled={removeDisable}
                        onClick={() => removeCardProduct(product.product._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6">
              <Link href={`/checkout/${cartId}`}>
                <Button className="w-full text-white bg-sky-600 hover:bg-sky-700">
                  Checkout Now
                </Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-xl font-bold text-center">
          ⚠️ Please add products to cart
        </h1>
      )}
    </div>
  );
}

