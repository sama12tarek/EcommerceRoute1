

'use client';

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import getAllCategory from "@/lib/api/Get All Categories";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function Category() {
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // To store the search term
  const [loading, setLoading] = useState(true); // To track loading state
  const router = useRouter();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        setAllCategory(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on search term
  const filteredCategories = allCategory.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-xl font-medium mt-10">Loading categories...</p>;
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="my-5 flex items-center space-x-2">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on typing
        />
        <i className="fa fas fa-search text-gray-600"></i>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCategories.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No categories found.</p>
        ) : (
          filteredCategories.map((item) => (
            <div
              key={item._id}
              onClick={() => router.push(`/category/${item._id}`)}
              className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={400}
                className="rounded-md"
              />
              <h1 className="mt-2 text-center text-lg font-semibold text-black">{item.name}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


/*
'use client'
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import getAllCategory from "@/lib/api/Get All Categories";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function Category() {
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- لتخزين كلمة البحث
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategory();
        setAllCategory(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  // تصفية النتائج بناءً على الكلمة المدخلة في البحث
  const filteredCategories = allCategory.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="my-5 flex items-center space-x-2">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // <-- التحديث عند الكتابة
        />
        <i className="fa fas-magnifying-glass"></i>
      </div>

      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCategories.map((item) => (
          <div
            key={item._id}
            onClick={() => router.push(`/category/${item._id}`)}
            className="bg-blue-100 p-4 rounded shadow hover:shadow-lg transition duration-200 cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={400}
              className="rounded"
            />
            <h1 className="mt-2 text-center text-lg font-semibold text-black">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

*/


