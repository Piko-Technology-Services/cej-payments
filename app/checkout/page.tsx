
// app/checkout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {dpoMNOs} from '../../utils/data';
import Swal from 'sweetalert2';

export default function checkout() {
  const [data, setData] = useState<any>(null);
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [MNO, setMNO] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setData(JSON.parse(stored));
  }, []);

  const handlePay = async () => {
    setLoading(true);

  console.log("Token data being sent for payment:", { token: data.token, method, mobileNumber: mobileNumber, MNO, country });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/charge-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ token: data.token, method, mobileNumber, MNO, country }),
    });

    const result = await res.json();

    console.log('Response from charge-token API: ' + JSON.stringify(result));

    if (result.payment_url) { 
      verifyPayment();
      Swal.fire('Info', 'Redirecting to Card payment page...', 'info');
      window.location.href = result.payment_url;
    } else {
      Swal.fire('Info', result.message, 'info');
      setMessage('Check your phone to approve payment');
      verifyPayment();
    }

    setLoading(false);
  };


  // const verifyPayment = async () => {
  //   const interval = setInterval(async () => {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token: data.token }),
  //     });

  //     const result = await res.json();

  //     if (result.status === 'success') {
  //       clearInterval(interval);
  //       setMessage('Payment Successful');
  //       Swal.fire('Success', result.message, 'success');
  //       window.location.href = `/success?message=${encodeURIComponent(result.message)}`; // Redirect to success page
  //     }

  //     if (result.status === 'failed') {
  //       clearInterval(interval);
  //       setMessage('Payment Failed');
  //       Swal.fire('Error', 'Payment failed!' + result.message, 'error');
  //       window.location.href = '/failure'; // Redirect to failure page
  //     }
  //   }, 5000);
  // };

  const verifyPayment = async () => {
    let attempts = 0;
    const maxAttempts = 25; // 5 minutes total (12 × 5s)

    const interval = setInterval(async () => {
      attempts++;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.token }),
      });

      const result = await res.json();

      if (result.status === 'success') {
        clearInterval(interval);
        Swal.fire('Success', result.message, 'success');
        window.location.href = `/success?message=${encodeURIComponent(result.message)}`;
      }

      if (result.status === 'failed') {
        clearInterval(interval);
        Swal.fire('Error', result.message, 'error');
        window.location.href = '/failure';
      }

      // ⛔ Stop after max attempts
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        Swal.fire('Timeout', 'Payment confirmation taking too long. Please check later.', 'warning');
      }

    }, 5000);
};


  if (!data) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl space-y-6">

        <div className="flex justify-center mb-4">
          <img src="https://cejzambia.org/wp-content/uploads/2023/01/High-Resolution4-1-768x799.png" alt="EPD2026 Logo" className="h-20" />
        </div>

        <h1 className="text-2xl font-semibold text-center">Checkout</h1>

        <div className="bg-gray-100 p-4 rounded-xl text-center">
          <p>{data.product}</p>
          <p className="text-xl font-bold">ZMW {data.amount}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {['card', 'mobile'].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`p-3 border rounded-lg font-semibold
                ${method === m ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-black border-gray-300'}
              `}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {method === 'mobile' && (
          <div className="space-y-4">

            {/* COUNTRY SELECT */}
            <select
              value={country}
              onChange={(e) => {
                const selectedCountry = dpoMNOs.find(c => c.country === e.target.value);
                setCountry(e.target.value);
                setCountryCode(selectedCountry?.code || '');
                setMNO(''); 
              }}
              className="input"
            >
              <option value="">Select Country</option>
              {dpoMNOs.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.country} ({c.code})
                </option>
              ))}
            </select>

            {/* NETWORK SELECT */}
            <select
              value={MNO}
              onChange={(e) => setMNO(e.target.value)}
              className="input"
              disabled={!country}
            >
              <option value="">Select Network</option>

              {dpoMNOs
                .find(c => c.country === country)
                ?.networks.map((net) => (
                  <option key={net.mno} value={net.mno}>
                    {net.name}
                  </option>
                ))}
            </select>

            {/* PHONE INPUT */}
            {/* <input
              type="text"
              placeholder="e.g. xxx-xxx-xxx"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="input"
            /> */}

            <input
              type="text"
              placeholder="e.g. xxx-xxx-xxx"
              value={mobileNumber}
              onFocus={() => {
                if (!mobileNumber && countryCode) {
                  setMobileNumber(countryCode.replace('+', ''));
                }
              }}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');

                // Prevent user from deleting country code
                if (countryCode) {
                  const code = countryCode.replace('+', '');
                  if (!value.startsWith(code)) {
                    value = code + value;
                  }
                }

                setMobileNumber(value);
              }}
              className="input"
            />

          </div>
        )}

        <button onClick={handlePay} className="btn w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg  flex justify-center items-center" disabled={loading}>
          {loading ? <div className="animate-spin rounded-full h-8 w-8 border-b-5 border-white-900"></div> : 'Pay Now'}
        </button>

        {message && <p className="text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}

