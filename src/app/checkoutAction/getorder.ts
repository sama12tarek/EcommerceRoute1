


'use server'
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
export default async function getorder(orderid:string,userid:string) {

const data=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`)

const userOrders= await data.json()
console.log('user order',userOrders);


const findOrders= userOrders.find((order:Order)=>  order._id==orderid)
return findOrders;  
}
