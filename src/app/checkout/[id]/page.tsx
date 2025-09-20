'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { checkoutSchema, checkoutSchemaType } from '@/schema/checkout.schema';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import onlineCheckout from '@/app/checkoutAction/onlineCheckout';
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

export default function Checkout() {
    const { id } = useParams() as { id: string };

  const form = useForm<checkoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: '',
      phone: '',
      city: '',
      checkoutType: 'card', // default
    },
  });

  if (!id) {
    console.log('No ID found!');
    return <div>ID is missing</div>;
  }

  

  async function handleCheckout(values: checkoutSchemaType) {
    // إذا كانت cash → يوديه على صفحة allorders
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

    // إذا كانت card → نعمل checkout online
    const res = await onlineCheckout(id, '', values);

    if (res?.status === 'success') {
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
          {/* Details */}
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

          {/* Phone */}
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
          {/* Checkout Type */}
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

          {/* Submit */}
          <Button type="submit" className="w-full">
            Check out
          </Button>
        </form>
      </Form>
    </div>
  );
}


