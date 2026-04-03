'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();

  const transID = params.get('TransID');
  const companyRef = params.get('CompanyRef');

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">

        <div className="flex justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl">✅</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-green-700">
          Payment Successful
        </h1>

        <p className="text-gray-600">
          Your registration for <strong>EPD2026</strong> has been completed successfully.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-left">
          <p><strong>Reference:</strong> {companyRef}</p>
          <p><strong>Transaction ID:</strong> {transID}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="btn w-full"
          >
            Back to Home
          </button>

        </div>
      </div>
    </div>
  );
}