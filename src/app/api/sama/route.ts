import { NextResponse } from "next/server";

// دالة GET لجلب البيانات من API خارجي
export async function GET() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");

    if (!response.ok) {
      console.log("Error fetching categories:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server error in /api/samasemo:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}






/*

import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
let response=await fetch('https://ecommerce.routemisr.com/api/v1/categories')
let data= await response.json()
  return NextResponse.json(data);
}




*/