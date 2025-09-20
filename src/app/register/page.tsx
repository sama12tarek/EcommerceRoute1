
'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema, registerSchemaType } from '@/schema/register.schema';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function ProfileForm() {
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });

  async function onSubmit(values: registerSchemaType) {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );

      if (res.data.message === 'success') {
        toast.success(res.data.message, {
          position: 'top-center',
          duration: 2000,
        });

        router.push('/login');
        return res.data;       
      } else {
        toast.error('فشل في تسجيل الدخول', {
          position: 'top-center',
          duration: 2000,
        });
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || 'حدث خطأ في الاتصال', {
        position: 'top-center',
        duration: 2000,
      });
    }
  }

  return (
    <div className='mx-auto my-12 w-1/2'>
      <h1 className='text-2xl text-center font-bold my-5'>register now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rePassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Repeat password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder='Phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mx-auto cursor-pointer mt-4 w-full'>
            Register
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
import { registerSchema, registerSchemaType } from '@/schema/register.schema';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function ProfileForm() {
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });

  async function onSubmit(values: registerSchemaType) {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );

      if (res.data.message === 'success') {
        toast.success(res.data.message, {
          position: 'top-center',
          duration: 2000,
        });

        router.push('/login');
        return res.data;       
      } else {
        toast.error('فشل في تسجيل الدخول', {
          position: 'top-center',
          duration: 2000,
        });
      }
    } catch (error: unknown) {
  const axiosError = error as { response?: { data?: { message?: string } } };
  toast.error(axiosError.response?.data?.message || 'حدث خطأ في الاتصال', {
    position: 'top-center',
    duration: 2000,
  });
}

    }
  }

  return (
    <div className='mx-auto my-12 w-1/2'>
      <h1 className='text-2xl text-center font-bold my-5'>register now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rePassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Repeat password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder='Phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mx-auto cursor-pointer mt-4 w-full'>
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}

*/