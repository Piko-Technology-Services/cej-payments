'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  const message = params.get('message');

  useEffect(() => {
    // Optional: clear stored token after success
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl">✅</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-green-700">
          Payment Successful
        </h1>

        {/* Message */}
        <p className="text-gray-600">
          Your registration for <strong>EPD2026</strong> has been completed successfully.
        </p>

        {/* Extra Info */}
        <p className="text-sm text-gray-500">
          A confirmation email and ticket will be sent to your email shortly.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="btn w-full"
          >
            Back to Home
          </button>

          <button
            onClick={() => window.print()}
            className="w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}