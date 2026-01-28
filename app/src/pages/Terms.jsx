import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-pharmacy-navy py-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="section">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8 text-center">
              <p className="text-gray-600">Last Updated: January 2024</p>
            </div>

            {/* Introduction */}
            <div className="mb-10">
              <p className="text-gray-600 leading-relaxed">
                Welcome to Pure Life Pharmacy. These Terms of Service ("Terms") govern your use of our 
                website, mobile applications, and services (collectively, the "Services"). By accessing 
                or using our Services, you agree to be bound by these Terms. If you do not agree to these 
                Terms, please do not use our Services.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {/* Section 1 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    <FileText className="text-pharmacy-green" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-pharmacy-navy">1. Acceptance of Terms</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 leading-relaxed">
                    By accessing or using Pure Life Pharmacy's Services, you acknowledge that you have 
                    read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. 
                    These Terms apply to all visitors, users, and others who access or use the Services.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="text-pharmacy-green" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-pharmacy-navy">2. Eligibility</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 mb-4">
                    To use our Services, you must:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Be at least 18 years of age or have parental/guardian consent</li>
                    <li>• Be a resident of the United Arab Emirates</li>
                    <li>• Have a valid delivery address within the UAE</li>
                    <li>• Provide accurate and complete information when creating an account</li>
                    <li>• Have the legal capacity to enter into binding contracts</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    <Scale className="text-pharmacy-green" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-pharmacy-navy">3. Account Registration</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 mb-4">
                    When you create an account with us, you must provide accurate, complete, and current 
                    information. You are responsible for:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Maintaining the confidentiality of your account credentials</li>
                    <li>• All activities that occur under your account</li>
                    <li>• Notifying us immediately of any unauthorized access</li>
                    <li>• Ensuring your account information is kept up to date</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">4. Products and Orders</h2>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">4.1 Product Information</h3>
                    <p>
                      We strive to display accurate product information, including prices, descriptions, 
                      and availability. However, we do not warrant that product descriptions or other content 
                      is accurate, complete, reliable, current, or error-free.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">4.2 Pricing</h3>
                    <p>
                      All prices are listed in UAE Dirhams (AED) and are inclusive of VAT where applicable. 
                      Prices are subject to change without notice. The price charged will be the price in 
                      effect at the time of order confirmation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">4.3 Order Acceptance</h3>
                    <p>
                      Your order is an offer to purchase products. We reserve the right to accept or decline 
                      your order for any reason, including product availability, errors in pricing or product 
                      information, or concerns about fraud or unauthorized activity.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">4.4 Prescription Medicines</h3>
                    <p>
                      Prescription medicines require a valid prescription from a licensed UAE healthcare provider. 
                      We reserve the right to verify prescriptions and refuse orders if a valid prescription is 
                      not provided or if we have concerns about the prescription's validity.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">5. Payment</h2>
                <p className="text-gray-600 mb-4">We accept the following payment methods:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cash on Delivery (COD)</li>
                  <li>• Credit/Debit Cards (Visa, Mastercard)</li>
                  <li>• Apple Pay</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  By providing payment information, you represent that you are authorized to use the payment 
                  method and authorize us to charge the total order amount. All payments are processed securely 
                  through our payment partners.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">6. Delivery</h2>
                <p className="text-gray-600 leading-relaxed">
                  We offer free delivery across all Emirates in the UAE. Delivery times vary by location and 
                  are estimates only. We are not responsible for delays caused by circumstances beyond our 
                  control, including but not limited to weather conditions, traffic, or courier service issues. 
                  Someone must be available to receive the order and provide identification.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">7. Returns and Refunds</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our return and refund policy is available on our Returns & Refunds page. By placing an order, 
                  you agree to the terms of our return policy. Prescription medicines cannot be returned except 
                  in cases of error or defect due to legal and safety regulations.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">8. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All content on our website, including text, graphics, logos, images, and software, is the 
                  property of Pure Life Pharmacy or its licensors and is protected by copyright, trademark, 
                  and other intellectual property laws. You may not use, reproduce, or distribute any content 
                  without our prior written permission.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="text-pharmacy-green" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-pharmacy-navy">9. Limitation of Liability</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 leading-relaxed">
                    To the maximum extent permitted by law, Pure Life Pharmacy shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages, including loss of 
                    profits, data, or use, arising out of or in connection with these Terms or your use of 
                    our Services. Our total liability shall not exceed the amount you paid for the specific 
                    product or service giving rise to the claim.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">10. Medical Disclaimer</h2>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-yellow-800 leading-relaxed">
                    The information provided on our website is for general informational purposes only and 
                    is not intended as medical advice. Always consult with a qualified healthcare provider 
                    before starting any medication or treatment. Our pharmacists are available to answer 
                    questions, but they do not replace your doctor's advice.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">11. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United 
                  Arab Emirates. Any disputes arising from these Terms or your use of our Services shall be 
                  subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                  upon posting on our website. Your continued use of our Services after any changes indicates 
                  your acceptance of the modified Terms.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="text-gray-600">
                  <p><strong>Email:</strong> legal@purelifepharmacy.ae</p>
                  <p><strong>Phone:</strong> +971 4 000 0000</p>
                  <p><strong>Address:</strong> Sheikh Zayed Road, Dubai, UAE</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
