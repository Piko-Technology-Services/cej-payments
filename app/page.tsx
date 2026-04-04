'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function InfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);

const slides = [
  {
    title: 'Welcome to EPD2026',
    text: 'The 6th Environmental Protection Dialogue (EPD2026) is Zambia’s premier environmental conference focused on safeguarding our future and addressing environmental degradation.',
    image: './epd (5).jpeg',
  },
  {
    title: 'Event Details',
    text: 'Join us from 14th–16th October 2026 at the Mulungushi International Conference Centre (Kenneth Kaunda Wing) in Lusaka, Zambia.',
    image: './epd (4).jpeg',
  },
  {
    title: 'Theme of EPD2026',
    text: '“Safeguarding Our Future: Addressing the Impact of Environmental Degradation in Zambia.” This theme drives conversations around sustainability and responsible development.',
    image: './epd (3).jpeg',
  },
  {
    title: 'Who Will Attend',
    text: 'Over 500 physical delegates including government ministries, NGOs, private sector leaders, UN agencies, academia, youth, and international stakeholders.',
    image: './epd (7).jpeg',
  },
  {
    title: 'Participation & Reach',
    text: 'EPD2026 will also host 100+ virtual delegates, enabling global participation and broader knowledge sharing across borders.',
    image: './epd (6).jpeg',
  },
  {
    title: 'Key Focus Areas',
    text: 'Discussions will focus on mining waste management, environmental protection, sustainable practices, and policy development.',
    image: './epd (9).jpeg',
  },
  {
    title: 'Objectives of the Dialogue',
    text: 'Promote safe tailings dam design, strengthen regulations, encourage community engagement, and ensure environmental sustainability.',
    image: './epd (5).jpeg',
  },
  {
    title: 'What to Expect',
    text: '8 panel discussions, 2 side events, expert speakers, networking opportunities, and actionable environmental solutions.',
    image: './epd (4).jpeg',
  },
];

  // Rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const ticketDetails: { [key: string]: { title: string; price: string; currency: string; description: string } } = {
    Standard: {
      title: 'Standard Ticket',
      price: '2,500',
      currency: 'ZMW',
      description:
        'General participation with contribution towards EPD Implementation Strategy Framework.',
    },
    Corporate: {
      title: 'Corporate Ticket',
      price: '4,000',
      currency: 'ZMW',
      description:
        'VIP experience with exclusive gifts and seating for corporate delegates.',
    },
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
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

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', JSON.stringify({ ...form, token: data.token }));
        Swal.fire('Success', 'Token created successfully! Redirecting to checkout...', 'success');
        router.push('/checkout');
      } else {
        Swal.fire('Error', 'Failed to create token: ' + data.message, 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while submitting the form', 'error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-gray rounded-3xl shadow-2xl overflow-hidden  m-4">

        {/* Left Slide Section */}

        <div className="md:w-1/2 bg-gradient-to-br from-orange-500 via-yellow-400 to-green-900 text-white p-5 flex flex-col justify-center relative">
          <div className="text-center space-y-4">
            <img src={slides[slideIndex].image} alt={slides[slideIndex].title} className="w-full h-60 mx-auto rounded-lg object-cover shadow-lg" />
            <h2 className="text-3xl font-bold">{slides[slideIndex].title}</h2>
            <p className="text-lg mt-2">{slides[slideIndex].text}</p>
          </div>
          {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <span key={i} className={`w-3 h-3 rounded-full ${i === slideIndex ? 'bg-white' : 'bg-white/50'}`}></span>
            ))}
          </div> */}
        </div>

        {/* Right Form Section */}

        <div className="md:w-1/2 p-8 md:p-12 space-y-6">
          <div className="flex justify-center mb-4">
            <img src="https://cejzambia.org/wp-content/uploads/2023/01/High-Resolution4-1-768x799.png" alt="EPD2026 Logo" className="h-20" />
          </div>

          <h1 className="text-2xl font-semibold text-center">Register for EPD2026</h1>

          


          {form.ticketPackage && (
            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{ticketDetails[form.ticketPackage].title}</h2>
              <p className="text-sm text-gray-700 mt-1">{ticketDetails[form.ticketPackage].description}</p>
              <p className="mt-2 font-medium">{ticketDetails[form.ticketPackage].currency} {ticketDetails[form.ticketPackage].price}</p>
            </div>
          )}

          {message && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
              <p className="text-sm text-red-700">{message}</p>
            </div>
          )}

          <form onSubmit={handleNext} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="ticketPackage" value={form.ticketPackage} onChange={handleChange} className="input" required>
                <option value="">Select Ticket Package</option>
                <option value="Standard">Standard – ZMW 2,500</option>
                <option value="Corporate">Corporate – ZMW 4,000</option>
              </select>


            <select name="delegateCategory" value={form.delegateCategory} onChange={handleChange} className="input" required>
                <option value="">Select Delegate Category</option>
                <option value="Academia / Research">Academia / Research</option>
                <option value="Embassies">Embassies</option>
                <option value="Government">Government</option>
                <option value="Private Sector">Private Sector</option>
                <option value="Civil Society / NGOs / L NGOs">Civil Society / NGOs / L NGOs</option>
                <option value="Multilateral Organisation">Multilateral Organisation</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
            </select>

            </div>

            

            <input name="name" placeholder="Full Name" onChange={handleChange} className="input w-full" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="input w-full" required />
              <input name="phone" placeholder="Phone (e.g. +260971234567)" onChange={handleChange} className="input w-full" required />
              <input name="province" placeholder="Province" onChange={handleChange} className="input w-full" required />
              <input name="district" placeholder="District" onChange={handleChange} className="input w-full" required />
              <input name="organisation" placeholder="Organisation Name" onChange={handleChange} className="input w-full" />
              <input name="jobTitle" placeholder="Job Title / Designation" onChange={handleChange} className="input w-full" />
            </div>

            <select name="referral" value={form.referral} onChange={handleChange} className="input w-full" required>
              <option value="">How did you hear about EPD2026?</option>
              <option value="Social Media">Social Media</option>
              <option value="Friends / Colleagues">Friends / Colleagues</option>
              <option value="Television / Radio">Television / Radio</option>
              <option value="Adverts">Adverts</option>
              <option value="Word of Mouth">Word of Mouth</option>
              <option value="Print Media">Print Media</option>
            </select>

            <button className="btn w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg flex justify-center items-center" disabled={loading}>
              {loading ? <div className="animate-spin rounded-full h-8 w-8 border-b-5 border-white-900"></div> : 'Continue to Registration'}
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}