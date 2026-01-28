import React from 'react';
import { RotateCcw, CheckCircle, XCircle, Package, Clock, AlertCircle, Phone } from 'lucide-react';

const Returns = () => {
  const eligibleItems = [
    'Unopened and unused products',
    'Products with manufacturing defects',
    'Wrong items delivered',
    'Damaged during shipping',
    'Expired products'
  ];

  const nonEligibleItems = [
    'Opened or used products',
    'Products without original packaging',
    'Prescription medicines (by law)',
    'Temperature-sensitive items',
    'Items marked as non-returnable'
  ];

  const process = [
    {
      step: 1,
      title: 'Contact Us',
      description: 'Call us or send a message within 7 days of delivery'
    },
    {
      step: 2,
      title: 'Provide Details',
      description: 'Share your order ID and reason for return'
    },
    {
      step: 3,
      title: 'Schedule Pickup',
      description: 'We\'ll arrange a free pickup from your address'
    },
    {
      step: 4,
      title: 'Refund Processed',
      description: 'Refund will be issued within 5-7 business days'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-pharmacy-navy py-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Returns & Refunds
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Easy returns within 7 days of delivery
          </p>
        </div>
      </div>

      {/* Policy Overview */}
      <div className="section">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-pharmacy-navy mb-4">Our Return Policy</h2>
            <p className="text-gray-600 text-lg">
              We want you to be completely satisfied with your purchase. If you're not happy 
              with your order, we offer easy returns and full refunds within 7 days of delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <Clock className="mx-auto text-green-600 mb-3" size={32} />
              <h3 className="font-semibold text-green-800 mb-1">7-Day Window</h3>
              <p className="text-green-700 text-sm">Return items within 7 days of delivery</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <Package className="mx-auto text-green-600 mb-3" size={32} />
              <h3 className="font-semibold text-green-800 mb-1">Free Pickup</h3>
              <p className="text-green-700 text-sm">We'll collect items from your address</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <RotateCcw className="mx-auto text-green-600 mb-3" size={32} />
              <h3 className="font-semibold text-green-800 mb-1">Full Refund</h3>
              <p className="text-green-700 text-sm">100% refund to original payment method</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligible vs Non-Eligible */}
      <div className="section bg-gray-50">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-600" size={28} />
                <h3 className="text-xl font-semibold text-pharmacy-navy">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg border">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="text-red-500" size={28} />
                <h3 className="text-xl font-semibold text-pharmacy-navy">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Return Process */}
      <div className="section">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-pharmacy-navy text-center mb-12">
            How to Return
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <div key={step.step} className="bg-white p-6 rounded-lg border text-center">
                <div className="w-12 h-12 bg-pharmacy-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-pharmacy-navy mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refund Info */}
      <div className="section bg-gray-50">
        <div className="container-main">
          <div className="bg-white p-8 rounded-lg border">
            <h2 className="text-2xl font-bold text-pharmacy-navy mb-6">Refund Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Refund Methods</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Credit/Debit Card: 5-7 business days</li>
                  <li>• Cash on Delivery: Bank transfer within 7 days</li>
                  <li>• Store Credit: Immediate</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Refund Timeline</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Pickup: Within 48 hours</li>
                  <li>• Inspection: 1-2 business days</li>
                  <li>• Refund processed: 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact for Returns */}
      <div className="section bg-pharmacy-green">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-pharmacy-navy mb-2">Need to Return an Item?</h2>
              <p className="text-pharmacy-navy/80">Our customer service team is here to help</p>
            </div>
            <div className="flex gap-4">
              <a href="tel:+97140000000" className="flex items-center gap-2 px-6 py-3 bg-pharmacy-navy text-white rounded hover:bg-pharmacy-navy-light">
                <Phone size={18} />
                <span>Call Us</span>
              </a>
              <a href="https://wa.me/97140000000" className="flex items-center gap-2 px-6 py-3 bg-white text-pharmacy-navy rounded hover:bg-gray-100">
                <span>💬 WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
