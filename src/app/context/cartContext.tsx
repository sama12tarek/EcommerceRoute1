"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import getLoggedUser from "@/app/cardActions/getLoggedUser"; 

type CartContextType = {
  numberOfCartItem: number;
  setNumberOfCartItem: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItem, setNumberOfCartItem] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getLoggedUser();

      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setNumberOfCartItem(sum);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setNumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
