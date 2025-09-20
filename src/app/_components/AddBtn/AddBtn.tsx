
'use client'

import { Button } from "@/components/ui/button";
import AddCard from '@/app/cardActions/addCard';
import { toast } from "sonner";
import { useContext } from "react";
import { CartContext } from "@/app/context/cartContext";
export default function AddBtn({ id }: { id: string }) {
const cart = useContext(CartContext);

if (!cart) {
  throw new Error("AddBtn must be used within a CartContextProvider");
}

const { numberOfCartItem, setNumberOfCartItem } = cart;


  async function checkAddProduct(id: string) {
    try {
      const res = await AddCard(id)
      console.log(res);
      if (res.status === 'success') {
        toast.success('Successfully added', { position: 'top-center', duration: 2000 });
         setNumberOfCartItem(numberOfCartItem+1)
      } else {
        toast.error(res.message,{position:'top-center',duration:2000});
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  }

  return (
    <Button
      variant="outline"
      className="cursor-pointer w-full bg-sky-500"
      onClick={() => checkAddProduct(id)}
    >
      Add to Cart{numberOfCartItem}
    </Button>
  );
}
