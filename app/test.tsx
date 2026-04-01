// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    currency: '',
    product: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    console.log('Submitting form:', form);

    // Call Laravel to create token
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    console.log('Response from API:', res);

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', JSON.stringify({ ...form, token: data.token }));
      setLoading(false);
      alert('Token created successfully! Proceeding to checkout...' + `\nToken: ${data.token}`);
      router.push('/checkout');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-2xl font-semibold text-center">Customer Information</h1>

        <form onSubmit={handleNext} className="space-y-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="input" required />
          <input name="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input name="phone" placeholder="Phone (Include Country Code)" onChange={handleChange} className="input" required />
          <input name="product" placeholder="Product" onChange={handleChange} className="input" required />
          <input name="amount" type="number" placeholder="Amount" onChange={handleChange} className="input" required />
          <input name="currency" placeholder="Currency (e.g. ZMW, USD)" onChange={handleChange} className="input" required />
          <button className="btn" disabled={loading}>
            {loading ? 'Processing...' : 'Continue to Checkout'}
          </button>

        </form>
      </div>
    </div>
  );
}