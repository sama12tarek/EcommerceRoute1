'use client'

import React from 'react';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

export default function ViewBtn({ orderId }: { orderId: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/allorders/${orderId}`);
  };

  return (
    <Button size="sm" color="blue" onClick={handleClick}>
      View
    </Button>
  );
}

