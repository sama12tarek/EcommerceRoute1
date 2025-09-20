
/*
export default async function register(userData) {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (data.message === "success") {
      console.log("تم التسجيل بنجاح:", data);
      return data;
    } else {
      console.error("فشل التسجيل:", data);
      throw new Error(data.message || "Registration failed");
    }

  } catch (error) {
    console.error("خطأ في الاتصال:", error.message || error);
    throw error;
  }
}


*/
