'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  const transID = params.get('TransID');
  const companyRef = params.get('CompanyRef');
  const approval = params.get('CCDapproval');

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

        {/* TRANSACTION DETAILS */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-left space-y-1">
          <p><strong>Reference:</strong> {companyRef}</p>
          <p><strong>Transaction ID:</strong> {transID}</p>
          <p><strong>Approval:</strong> {approval}</p>
        </div>

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