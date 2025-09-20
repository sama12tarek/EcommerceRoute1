// app/brands/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import getSpecificBrand from "@/app/brandActions/getSpecificBrand";
import { toast } from "sonner";

type Brand = {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
};

export default function BrandDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBrand() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getSpecificBrand(id);
        setBrand(res);
      } catch (error) {
        console.error(error);
        toast.error("Error loading brand");
      } finally {
        setLoading(false);
      }
    }
    fetchBrand();
  }, [id]);

  // Toast عند النجاح
  useEffect(() => {
    if (brand) {
      toast.success(`Loaded brand: ${brand.name}`);
    }
  }, [brand]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!brand) return <p className="p-6 text-center">Brand not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{brand.name}</h1>
      {brand.image && (
        <Image
          src={brand.image}
          alt={brand.name}
          className="w-64 h-64 object-contain"
          width={300}
          height={300}
        />
      )}
    </div>
  );
}




