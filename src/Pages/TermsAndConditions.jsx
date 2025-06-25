import {
  FaGavel,
  FaFileContract,
  FaBalanceScale,
  FaExclamationTriangle,
} from "react-icons/fa";

const TermsAndConditions = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 md:py-16 px-6 text-gray-800">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl lg:text-4xl md:text-5xl font-bold mb-6 text-teal-600">
          Terms & Conditions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The rules that govern your use of the SkillNest platform
        </p>
      </div>

      {/* Notice Banner */}
      <div className="bg-orange-50 p-6 rounded-xl mb-12 text-center">
        <p className="text-lg text-orange-700 font-medium">
          Please read these Terms carefully before using our platform
        </p>
      </div>

      {/* Main Content */}
      <div className="mb-16">
        {/* 1. Acceptance of Terms */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          1. Acceptance of Terms
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          By accessing or using the SkillNest platform, you agree to be bound by
          these Terms. If you disagree with any part, you may not access the
          platform.
        </p>

        {/* 2. User Accounts */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          2. User Accounts
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Registration */}
          <div className="border border-teal-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaFileContract className="text-teal-600 text-2xl mr-3" />
              <h3 className="text-xl font-bold">Registration</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>You must provide accurate information</li>
              <li>You're responsible for account security</li>
              <li>Minimum age requirement: 18 years</li>
            </ul>
          </div>

          {/* Prohibited Conduct */}
          <div className="border border-teal-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-teal-600 text-2xl mr-3" />
              <h3 className="text-xl font-bold">Prohibited Conduct</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>No fraudulent activities</li>
              <li>No harassment or discrimination</li>
              <li>No circumventing of fees</li>
              <li>No illegal content</li>
            </ul>
          </div>
        </div>

        {/* 3. Services */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">3. Services</h2>
        <div className="bg-teal-50 p-8 rounded-xl mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Freelancers */}
            <div>
              <h3 className="font-bold mb-4 text-lg">For Freelancers</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>You're responsible for service quality</li>
                <li>You set your own rates and availability</li>
                <li>You must honor agreed-upon deadlines</li>
              </ul>
            </div>

            {/* For Clients */}
            <div>
              <h3 className="font-bold mb-4 text-lg">For Clients</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>You're responsible for clear briefs</li>
                <li>You must pay for accepted work</li>
                <li>You must provide timely feedback</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Payments & Fees */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          4. Payments & Fees
        </h2>
        <div className="border border-teal-100 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaBalanceScale className="text-teal-600 text-2xl mr-3" />
            <h3 className="text-xl font-bold">Financial Terms</h3>
          </div>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Service fee: 10% of project value (charged to freelancer)</li>
            <li>Payment processing fees may apply</li>
            <li>All payments go through SkillNest's secure system</li>
            <li>Disputed payments may be held for investigation</li>
          </ul>
        </div>

        {/* 5. Intellectual Property */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          5. Intellectual Property
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          Freelancers retain ownership of work until full payment is received.
          After payment, clients receive rights as specified in the project
          agreement. SkillNest retains no ownership of work products.
        </p>

        {/* 6. Disputes */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">6. Disputes</h2>
        <p className="mb-6 text-lg leading-relaxed">
          In case of disputes, SkillNest may mediate but is not obligated to do
          so. We encourage users to resolve issues amicably. Any legal action
          must be brought in courts of Bangladesh.
        </p>

        {/* 7. Limitation of Liability */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          7. Limitation of Liability
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          SkillNest is not liable for any indirect, incidental, or consequential
          damages arising from platform use. Our total liability is limited to
          fees paid to us in the past six months.
        </p>

        {/* 8. Changes to Terms */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          8. Changes to Terms
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          We may modify these Terms at any time. Continued use after changes
          constitutes acceptance. We'll notify users of significant changes.
        </p>

        {/* Governing Law */}
        <div className="bg-teal-600 text-white p-8 rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <FaGavel className="text-3xl mr-4" />
            <h3 className="text-2xl font-bold">Governing Law</h3>
          </div>
          <p className="text-center text-lg">
            These Terms are governed by the laws of Bangladesh. Any disputes
            shall be resolved in the courts of Dhaka.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
