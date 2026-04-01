'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function InfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    ticketPackage: '',
    delegateCategory: '',
    name: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    organisation: '',
    jobTitle: '',
    referral: '',
    amount: '',
    currency: 'ZMW',
    product: 'EPD2026',
  });

  // Category info card content
  const ticketDetails: { [key: string]: { title: string; price: string; currency: string; description: string } } = {
    Standard: {
      title: 'Standard Ticket',
      price: '1',
      currency: 'ZMW',
      description:
        'This ticket is intended for general participants who are in a position to contribute towards their participation and the cost of the event. Contributions will also go towards the EPD Implementation Strategy Framework.',
    },
    Corporate: {
      title: 'Corporate Ticket',
      price: '1',
      currency: 'ZMW',
      description:
        'This ticket is intended for participants who are able to contribute towards their participation and the cost of the event. Contributions will also go towards the EPD Implementation Strategy Framework. Delegates will receive a golf T-shirt and seating in the VIP section.',
    },
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-set amount based on ticket package
      if (name === 'ticketPackage') {
        updated.amount = value === 'Standard' ? '1' : value === 'Corporate' ? '1' : '';
        updated.product = value ? `EPD2026 - ${value} Ticket` : 'EPD2026';
      }

      return updated;
    });
  };

  const handleNext = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!form.ticketPackage || !form.delegateCategory || !form.name || !form.email || !form.phone || !form.province || !form.district || !form.organisation || !form.jobTitle || !form.referral) {
      setMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }

    console.log('Submitting form with data: ' + JSON.stringify(form));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      console.log(res);

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', JSON.stringify({ ...form, token: data.token }));
        // alert(`Token created! Token: ${data.token}`);
        // setMessage('Token created successfully! Redirecting to checkout...');
        Swal.fire('Success', 'Token created successfully! Redirecting to checkout...', 'success');
        router.push('/checkout');
      } else {
        // setMessage('Failed to create token');
        Swal.fire('Error', 'Failed to create token: ' + data.message, 'error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error submitting form');
      Swal.fire('Error', 'An error occurred while submitting the form', 'error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl space-y-6">

        <div className="flex justify-center mb-4">

          <img src="https://cejzambia.org/wp-content/uploads/2023/01/High-Resolution4-1-768x799.png" alt="EPD2026 Logo" className="h-20" />
        </div>

        <h1 className="text-2xl font-semibold text-center">EPD2026 Registration</h1>

        {/* Category Info Card */}
        {form.ticketPackage && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-4 shadow-sm">
            <h2 className="text-lg font-semibold">{ticketDetails[form.ticketPackage].title}</h2>
            <p className="text-sm text-gray-700 mt-1">{ticketDetails[form.ticketPackage].description}</p>
            {/* <p className="mt-2 font-medium">{ticketDetails[form.ticketPackage].currency} {ticketDetails[form.ticketPackage].price}</p> */}
          </div>
        )}

        <form onSubmit={handleNext} className="space-y-4">

          {/* Ticket Package */}
          <select name="ticketPackage" value={form.ticketPackage} onChange={handleChange} className="input" required>
            <option value="">Select Ticket Package</option>
            <option value="Standard">Standard – ZMW 2,500</option>
            <option value="Corporate">Corporate – ZMW 4,000</option>
          </select>

        {message && (
          <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded-md mb-4 shadow-sm">
            <p className="text-sm text-gray-700 mt-1">{message}</p>
          </div>
         )}

          {/* Delegate Category */}
          <select name="delegateCategory" value={form.delegateCategory} onChange={handleChange} className="input" required>
            <option value="">Select Delegate Category</option>
            <option value="Academia / Research">Academia / Research</option>
            <option value="Embassies">Embassies</option>
            <option value="Government">Government</option>
            <option value="Private Sector">Private Sector</option>
            <option value="Civil Society / NGOs / L NGOs">Civil Society / L NGOs / NGOs</option>
            <option value="Multilateral Organisation">Multilateral Organisation</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>

          {/* Personal Info */}
          <input name="name" placeholder="Full Name" onChange={handleChange} className="input" required />
          
          {/* Group inputs in a responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              name="phone"
              placeholder="Phone (e.g. +260971234567)"
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              name="province"
              placeholder="Province"
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              name="district"
              placeholder="District"
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              name="organisation"
              placeholder="Organisation Name"
              onChange={handleChange}
              className="input w-full"
            />

            <input
              name="jobTitle"
              placeholder="Job Title / Designation"
              onChange={handleChange}
              className="input w-full"
            />

          </div>

          {/* Referral */}
          <select name="referral" value={form.referral} onChange={handleChange} className="input" required>
            <option value="">How did you hear about EPD2026?</option>
            <option value="Social Media">Social Media</option>
            <option value="Friends / Colleagues">Friends / Colleagues</option>
            <option value="Television / Radio">Television / Radio</option>
            <option value="Adverts">Adverts</option>
            <option value="Word of Mouth">Word of Mouth</option>
            <option value="Print Media">Print Media</option>
          </select>

          <button className="btn w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Continue to Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}