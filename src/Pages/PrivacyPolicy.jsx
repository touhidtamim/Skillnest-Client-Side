import { FaLock, FaUserShield, FaDatabase, FaShieldAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 md:py-16 px-6 text-gray-800">
      <div className="text-center mb-16">
        <h1 className="text-3xl lg:text-4xl md:text-5xl font-bold mb-6 text-teal-600">
          Privacy Policy
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We respect your privacy and are committed to protecting your personal
          data
        </p>
      </div>

      <div className="bg-teal-50 p-6 rounded-xl mb-12">
        <p className="text-lg text-center text-teal-700 font-medium">
          Last Updated: June 15, 2023
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          1. Introduction
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          SkillNest ("we", "our", or "us") operates the SkillNest platform. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you use our services.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          2. Data We Collect
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border border-teal-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaUserShield className="text-teal-600 text-2xl mr-3" />
              <h3 className="text-xl font-bold">Personal Information</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Name, email, phone number</li>
              <li>Profile information and portfolio</li>
              <li>Payment and billing information</li>
              <li>Government identification (for verification)</li>
            </ul>
          </div>
          <div className="border border-teal-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaDatabase className="text-teal-600 text-2xl mr-3" />
              <h3 className="text-xl font-bold">Usage Data</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>IP addresses and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Search queries and interactions</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          3. How We Use Your Data
        </h2>
        <div className="bg-teal-50 p-8 rounded-xl mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <FaLock className="text-teal-600 text-xl mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Service Provision</h3>
                <p className="text-gray-600">
                  To provide and maintain our platform
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaShieldAlt className="text-teal-600 text-xl mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Security</h3>
                <p className="text-gray-600">To detect and prevent fraud</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaLock className="text-teal-600 text-xl mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Communication</h3>
                <p className="text-gray-600">
                  To contact you about your account
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaShieldAlt className="text-teal-600 text-xl mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Improvements</h3>
                <p className="text-gray-600">To enhance user experience</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          4. Data Sharing
        </h2>
        <p className="mb-4 text-lg leading-relaxed">
          We do not sell your personal data. We may share information with:
        </p>
        <ul className="list-disc pl-8 mb-8 text-lg leading-relaxed space-y-2">
          <li>Service providers who assist in platform operations</li>
          <li>Legal authorities when required by law</li>
          <li>Business partners in anonymized, aggregated form</li>
          <li>Other users as part of the freelance service process</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          5. Your Rights
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          You have the right to access, correct, or delete your personal data.
          You may also object to processing or request data portability. Contact
          us at privacy@skillnest.com to exercise these rights.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          6. Changes to This Policy
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          We may update this policy periodically. We will notify you of
          significant changes through our platform or via email.
        </p>

        <div className="bg-teal-600 text-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-bold mb-4">
            Questions About Our Privacy Policy?
          </h3>
          <p className="mb-4">Contact our Data Protection Officer at:</p>
          <p className="text-xl font-medium">privacy@skillnest.com</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
