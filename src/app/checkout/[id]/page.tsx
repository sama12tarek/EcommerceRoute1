



'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { checkoutSchema, checkoutSchemaType } from '@/schema/checkout.schema';
import { Button } from '@/components/ui/button';
import onlineCheckout from '@/app/checkoutAction/onlineCheckout';
import { useParams } from "next/navigation";
import cashorder from '@/app/checkoutAction/cashorder';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

export default function Checkout() {
  const form = useForm<checkoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: '',
      phone: '',
      city: '',
      checkoutType: 'card',
    },
  });

  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    console.log('No ID found!');
    return <div>ID is missing</div>;
  }

  async function handleCheckout(values: checkoutSchemaType) {
    if (values.checkoutType === 'cash') {
      await cashorder(id, {
        details: values.details,
        phone: values.phone,
        city: values.city,
      });
      console.log('Redirecting to /allorders');
      window.location.href = '/allorders';
      return;
    }

    const res = await onlineCheckout(id, '', values);
    console.log(res);

    if (res.status === 'success') {
      console.log('Redirecting to checkout session');
      window.location.href = res.session.url;
    } else {
      console.log('Checkout failed:', res);
    }
  }

  return (
    <div className="mx-auto my-12 w-1/2">
      <h1 className="text-2xl text-center font-bold my-5">Check out</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-8">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkoutType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Checkout Type</FormLabel>
                <FormControl>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="card"
                        checked={field.value === 'card'}
                        onChange={() => field.onChange('card')}
                      />
                      Card
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="cash"
                        checked={field.value === 'cash'}
                        onChange={() => field.onChange('cash')}
                      />
                      Cash
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Check out
          </Button>
        </form>
      </Form>
    </div>
  );
}







/*
'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { checkoutSchema, checkoutSchemaType } from '@/schema/checkout.schema';
import { Button } from '@/components/ui/button';
import onlineCheckout from '@/app/checkoutAction/onlineCheckout';
import { useParams } from "next/navigation";
import cashorder from  '@/app/checkoutAction/cashorder';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

 export Params={
props:{
  id:string
}
}


export default function Checkout({Params}:{props:{id}}) {
  
  const form = useForm<checkoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: '',
      phone: '',
      city: '',
      checkoutType: 'card', // default
    },
  });
  const  {id} = useParams()
console.log(id);
  if (!id) {
    console.log('No ID found!');
    return <div>ID is missing</div>;
  }

  

  async function handleCheckout(values: checkoutSchemaType) {

    if (values.checkoutType === 'cash') {
      await cashorder(id, {
      details: values.details,
      phone: values.phone,
      city: values.city,
    });
          console.log('Redirecting to /allorders');
      window.location.href = '/allorders';
      return;
    }

  
    const res = await onlineCheckout(productid, '', values);
  
console.log(res)
    if (res.status === 'success') {
          console.log('Redirecting to /');
      window.location.href = res.session.url;
    } else {
      console.log('Checkout failed:', res);
    }
  }

  return (
    <div className="mx-auto my-12 w-1/2">
      <h1 className="text-2xl text-center font-bold my-5">Check out</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-8">
        
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

      
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
<FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            control={form.control}
            name="checkoutType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Checkout Type</FormLabel>
                <FormControl>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="card"
                        checked={field.value === 'card'}
                        onChange={() => field.onChange('card')}
                      />
                      Card
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="cash"
                        checked={field.value === 'cash'}
                        onChange={() => field.onChange('cash')}
                      />
                      Cash
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        
          <Button type="submit" className="w-full">
            Check out
          </Button>
        </form>
      </Form>
    </div>
  );
}


*/