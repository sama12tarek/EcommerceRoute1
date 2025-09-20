'use server'

import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'

export default async function getMyToken() {
  try {
    // جلب كل الكوكيز باستخدام await إذا كان الكوكيز يعود كـ Promise
    const allCookies = await cookies()

    // جلب التوكين من الكوكيز
    const decodeToken =
      allCookies.get('next-auth.session-token')?.value ||
      allCookies.get('__Secure-next-auth.session-token')?.value

    if (!decodeToken) {
      return { status: 'fail', message: 'لم يتم العثور على التوكين في الكوكيز' }
    }

    // فك تشفير التوكين
    const accessToken = await decode({
      token: decodeToken,
      secret: process.env.NEXTAUTH_SECRET!,
    })

    if (!accessToken) {
      return { status: 'fail', message: 'تعذّر فك تشفير التوكين أو انتهت صلاحيته' }
    }

    // إرجاع التوكين الحقيقي
    return { status: 'success', token: accessToken.token }
  } catch (error) {
    console.error('Error decoding token:', error)
    return { status: 'error', message: 'حدث خطأ أثناء قراءة التوكين', error: String(error) }
  }
}





/*
'use server'

import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'

export default async function getMyToken() {
  try {
    // استدعاء كل الكوكيز
    const allCookies = cookies()

    // جلب التوكين من الكوكيز
    const decodeToken =
      allCookies.get('next-auth.session-token')?.value ||
      allCookies.get('__Secure-next-auth.session-token')?.value

    if (!decodeToken) {
      return { status: 'fail', message: 'لم يتم العثور على التوكين في الكوكيز' }
    }

    // فك تشفير التوكين
    const accessToken = await decode({
      token: decodeToken,
      secret: process.env.NEXTAUTH_SECRET!,
    })

    if (!accessToken) {
      return { status: 'fail', message: 'تعذّر فك تشفير التوكين أو انتهت صلاحيته' }
    }

    // إرجاع التوكين الحقيقي
    return { status: 'success', token: accessToken.token }
  } catch (error) {
    console.error('Error decoding token:', error)
    return { status: 'error', message: 'حدث خطأ أثناء قراءة التوكين', error: String(error) }
  }
}

*/