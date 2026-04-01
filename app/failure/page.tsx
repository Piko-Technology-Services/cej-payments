'use client';

import { useRouter } from 'next/navigation';

export default function FailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100">
            <span className="text-4xl">❌</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-red-600">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-gray-600">
          Unfortunately, your payment could not be completed.
        </p>

        {/* Help text */}
        <p className="text-sm text-gray-500">
          Please try again or use a different payment method.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/checkout')}
            className="btn w-full"
          >
            Try Again
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}