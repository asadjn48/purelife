import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+971 4 000 0000', '+971 50 123 4567'],
      action: 'tel:+97140000000'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@purelifepharmacy.ae', 'info@purelifepharmacy.ae'],
      action: 'mailto:support@purelifepharmacy.ae'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Sheikh Zayed Road', 'Dubai, UAE'],
      action: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['24/7 Online Support', 'Pharmacist Available'],
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-pharmacy-navy py-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            We're here to help. Reach out to us for any questions or concerns.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="section">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.action}
                className="bg-white p-6 rounded-lg border hover:border-pharmacy-green text-center"
              >
                <div className="w-14 h-14 bg-pharmacy-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="text-pharmacy-green" size={28} />
                </div>
                <h3 className="font-semibold text-pharmacy-navy mb-2">{info.title}</h3>
                {info.details.map((detail, dIdx) => (
                  <p key={dIdx} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & WhatsApp */}
      <div className="section bg-gray-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white p-8 rounded-lg border">
              <h2 className="text-2xl font-bold text-pharmacy-navy mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="p-6 bg-green-50 rounded-lg text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-semibold text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-green-600">Thank you for contacting us. We'll respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="prescription">Prescription</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* WhatsApp CTA */}
            <div className="space-y-6">
              <div className="bg-green-500 p-8 rounded-lg text-white">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle size={32} />
                  <h2 className="text-2xl font-bold">Chat on WhatsApp</h2>
                </div>
                <p className="text-green-100 mb-6">
                  Get instant support from our team via WhatsApp. We're available 24/7 to assist you.
                </p>
                <a
                  href="https://wa.me/97140000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-medium rounded hover:bg-green-50"
                >
                  <span>Start Chat</span>
                  <Send size={18} />
                </a>
              </div>

              {/* FAQ Preview */}
              <div className="bg-white p-8 rounded-lg border">
                <h3 className="font-semibold text-pharmacy-navy mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pharmacy-navy">
                      <span>How long does delivery take?</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600">We offer same-day delivery in Dubai and 1-2 days for other Emirates.</p>
                  </details>
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pharmacy-navy">
                      <span>Do you accept insurance?</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600">Yes, we accept most major insurance providers in the UAE.</p>
                  </details>
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pharmacy-navy">
                      <span>How do I upload my prescription?</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600">You can upload your prescription during checkout or via WhatsApp.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
