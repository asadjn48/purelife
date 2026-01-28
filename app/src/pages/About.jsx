import React from 'react';
import { Shield, Truck, Clock, Award, Users, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Genuine Products',
      description: 'All our products are 100% authentic and sourced directly from licensed manufacturers and distributors.'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'We offer free home delivery across all Emirates in the UAE, ensuring your medications reach you safely.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our licensed pharmacists are available round the clock to answer your health-related queries.'
    },
    {
      icon: Award,
      title: 'Licensed Pharmacy',
      description: 'We are fully licensed by Dubai Health Authority (DHA) and Ministry of Health & Prevention (MOHAP).'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-pharmacy-navy py-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Pure Life Pharmacy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your trusted partner in health and wellness since 2015
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="section">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pharmacy-navy mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At Pure Life Pharmacy, we believe that access to quality healthcare should be simple, 
              convenient, and affordable. Our mission is to provide the people of UAE with genuine 
              medicines, wellness products, and professional healthcare advice — all from the comfort 
              of their homes.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are committed to maintaining the highest standards of pharmaceutical care, ensuring 
              that every product we deliver meets strict quality controls and regulatory requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section bg-gray-50">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-pharmacy-navy text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border text-center">
                <div className="w-16 h-16 bg-pharmacy-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-pharmacy-green" size={32} />
                </div>
                <h3 className="font-semibold text-pharmacy-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="section">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-pharmacy-green mb-2">50K+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pharmacy-green mb-2">10K+</p>
              <p className="text-gray-600">Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pharmacy-green mb-2">24/7</p>
              <p className="text-gray-600">Support</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pharmacy-green mb-2">100%</p>
              <p className="text-gray-600">Genuine</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="section bg-gray-50">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-pharmacy-navy text-center mb-4">Our Team</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our team of licensed pharmacists and healthcare professionals are dedicated to 
            providing you with the best care and advice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="text-gray-400" size={40} />
              </div>
              <h3 className="font-semibold text-pharmacy-navy">Dr. Ahmed Hassan</h3>
              <p className="text-pharmacy-green text-sm mb-2">Chief Pharmacist</p>
              <p className="text-gray-600 text-sm">15+ years experience in pharmaceutical care</p>
            </div>
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="text-gray-400" size={40} />
              </div>
              <h3 className="font-semibold text-pharmacy-navy">Dr. Sarah Ahmed</h3>
              <p className="text-pharmacy-green text-sm mb-2">Clinical Pharmacist</p>
              <p className="text-gray-600 text-sm">Specialist in chronic disease management</p>
            </div>
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="text-gray-400" size={40} />
              </div>
              <h3 className="font-semibold text-pharmacy-navy">Mohammed Ali</h3>
              <p className="text-pharmacy-green text-sm mb-2">Operations Manager</p>
              <p className="text-gray-600 text-sm">Ensuring timely delivery across UAE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Licenses */}
      <div className="section">
        <div className="container-main">
          <div className="bg-pharmacy-navy rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Licensed & Regulated</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Pure Life Pharmacy is fully licensed and regulated by the relevant health authorities 
              in the UAE, ensuring that we meet the highest standards of pharmaceutical care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/10 rounded text-white text-sm">Dubai Health Authority (DHA)</span>
              <span className="px-4 py-2 bg-white/10 rounded text-white text-sm">Ministry of Health & Prevention (MOHAP)</span>
              <span className="px-4 py-2 bg-white/10 rounded text-white text-sm">UAE Pharmacists Association</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
