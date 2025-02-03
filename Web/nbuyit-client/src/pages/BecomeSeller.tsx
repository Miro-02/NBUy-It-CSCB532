import { useState } from "react";
import { Link } from "react-router";

export default function BecomeSeller() {
  const [agreed, setAgreed] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    setScrolledToBottom(bottom);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('I should implement POST request to the server so your role is changed!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-[#093f87]">
            Become a Seller
          </h1>
          
          <div 
            className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 text-sm"
            onScroll={handleScroll}
          >
            <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
            
            <p className="mb-4">Last updated: February 02, 2025</p>

            <h3 className="font-medium mb-2">1. Seller Responsibilities</h3>
            <p className="mb-4">
              As a seller on NbuyIt, you agree to provide accurate product information, 
              maintain fair pricing, and handle customer inquiries promptly. You are 
              responsible for product quality, shipping logistics, and returns management.
            </p>

            <h3 className="font-medium mb-2">2. Fees & Commissions</h3>
            <p className="mb-4">
              NbuyIt charges a 10% commission on each sale. This fee covers payment 
              processing, platform maintenance, and customer support services. Fees are 
              deducted automatically from your sales balance.
            </p>

            <h3 className="font-medium mb-2">3. Prohibited Items</h3>
            <p className="mb-4">
              You may not sell counterfeit goods, illegal substances, weapons, or any 
              items violating local laws. Restricted categories include adult content, 
              hazardous materials, and prescription medications without proper 
              authorization.
            </p>

            <h3 className="font-medium mb-2">4. Dispute Resolution</h3>
            <p className="mb-4">
              Any customer disputes must be resolved within 7 business days. NbuyIt 
              reserves the right to mediate disputes and issue refunds at our discretion.
            </p>

            <h3 className="font-medium mb-2">5. Account Termination</h3>
            <p className="mb-4">
              We may suspend or terminate accounts violating these terms, with or 
              without notice. Suspended accounts will have outstanding balances held 
              for 90 days to cover potential refunds.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 text-[#093f87] rounded-lg border-gray-300"
              disabled={!scrolledToBottom}
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I have read and agree to the Terms & Conditions. I understand that 
              violating these terms may result in account suspension or legal action.
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={!agreed}
              className={`px-6 py-3 rounded-lg transition-colors ${
                agreed 
                  ? 'bg-[#093f87] hover:bg-[#082f6a] text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Activate Seller Account
            </button>
            
            <Link
              to="/"
              className="px-6 py-3 rounded-lg border border-[#093f87] text-[#093f87] hover:bg-[#093f87]/10 text-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}