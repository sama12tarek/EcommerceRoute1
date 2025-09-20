'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, loginSchemaType } from '@/schema/login.schema';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function Login() {
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: loginSchemaType) {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.ok) {
      toast.success("تم تسجيل الدخول", {
        position: 'top-center',
        duration: 2000,
      });
  
      router.push('/');
    } else {
      toast.error("فشل في تسجيل الدخول", {
        position: 'top-center',
        duration: 2000,
      });
    }
  }

  return (
    <div className='mx-auto my-12 w-1/2'>
      <h1 className='text-2xl text-center font-bold my-5'>login now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

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

          <Button type='submit' className='mx-auto cursor-pointer mt-4 w-full'>
            login
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
import { loginSchema, loginSchemaType } from '@/schema/login.schema';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function login() {
const router = useRouter();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
  
      email: '',
      password: '',
    
    },
  });

  async function onSubmit(values: loginSchemaType) {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        values
      );

      if (res.data.message === 'success') {
        toast.success(res.data.message, {
          position: 'top-center',
          duration: 2000,
        });

        router.push('/'); 
        return res.data;       
      } else {
        toast.error('فشل في تسجيل الدخول', {
          position: 'top-center',
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'حدث خطأ في الاتصال', {
        position: 'top-center',
        duration: 2000,
      });
    }
  }

  return (
    <div className='mx-auto my-12 w-1/2'>
      <h1 className='text-2xl text-center font-bold my-5'>login now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>


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

          
          <Button type='submit' className='mx-auto cursor-pointer mt-4 w-full'>
          login
          </Button>
        </form>
      </Form>
    </div>
  );
}

*/