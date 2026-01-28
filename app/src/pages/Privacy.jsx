import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-pharmacy-navy py-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect your data.
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
                Pure Life Pharmacy ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services. By using our services, you agree to the 
                collection and use of information in accordance with this policy.
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
                  <h2 className="text-xl font-semibold text-pharmacy-navy">1. Information We Collect</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment information.</li>
                    <li><strong>Medical Information:</strong> Prescription details and health-related information necessary to fulfill your orders.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and device information.</li>
                    <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    <Eye className="text-pharmacy-green" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-pharmacy-navy">2. How We Use Your Information</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 mb-4">We use your information for the following purposes:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• To process and deliver your orders</li>
                    <li>• To verify prescriptions and ensure safe medication dispensing</li>
                    <li>• To communicate with you about your orders and account</li>
                    <li>• To provide customer support and respond to inquiries</li>
                    <li>• To improve our services and website experience</li>
                    <li>• To comply with legal and regulatory requirements</li>
                    <li>• To send promotional offers (with your consent)</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    <Lock className="text-pharmacy-green" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-pharmacy-navy">3. Data Security</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction. This includes:
                  </p>
                  <ul className="space-y-2 text-gray-600 mt-4">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure payment processing through certified providers</li>
                    <li>• Regular security audits and vulnerability assessments</li>
                    <li>• Access controls and authentication measures</li>
                    <li>• Employee training on data protection</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    <Shield className="text-pharmacy-green" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-pharmacy-navy">4. Information Sharing</h2>
                </div>
                <div className="pl-13 ml-12">
                  <p className="text-gray-600 mb-4">We do not sell or rent your personal information. We may share your information with:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Service Providers:</strong> Delivery partners, payment processors, and IT service providers.</li>
                    <li><strong>Healthcare Providers:</strong> Licensed pharmacists and healthcare professionals for prescription verification.</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">5. Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li>• <strong>Restriction:</strong> Request restriction of processing</li>
                  <li>• <strong>Portability:</strong> Request transfer of your data</li>
                  <li>• <strong>Objection:</strong> Object to processing of your data</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, please contact us at privacy@purelifepharmacy.ae
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">6. Cookies and Tracking</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and 
                  hold certain information. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent. However, some parts of our service may not 
                  function properly without cookies.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">7. Children's Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our services are not intended for use by children under the age of 18. We do not 
                  knowingly collect personal information from children under 18. If we become aware 
                  that we have collected personal data from a child under 18, we will take steps to 
                  remove that information from our servers.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-pharmacy-navy mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="text-gray-600">
                  <p><strong>Email:</strong> privacy@purelifepharmacy.ae</p>
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

export default Privacy;
