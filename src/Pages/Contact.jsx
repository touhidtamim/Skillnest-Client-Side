import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 md:py-16 px-6 text-gray-800">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-teal-600">
          Let's Connect
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          We're excited to hear from you! Whether you have questions, feedback,
          or just want to say hello, our team is ready to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-teal-600">
            Send Us a Message
          </h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 font-medium">
                Subject
              </label>
              <select
                id="subject"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select a topic</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                rows="5"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition font-medium text-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-teal-600">
              Contact Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-start">
                <FaEnvelope className="text-teal-600 text-xl mt-1 mr-4" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-600">support@skillnest.com</p>
                  <p className="text-gray-600">info@skillnest.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="text-teal-600 text-xl mt-1 mr-4" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-gray-600">+880 1234-567890</p>
                  <p className="text-gray-600">+880 9876-543210</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="text-teal-600 text-xl mt-1 mr-4" />
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p className="text-gray-600">123 Tech Park Road</p>
                  <p className="text-gray-600">Dhaka 1212, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaClock className="text-teal-600 text-xl mt-1 mr-4" />
                <div>
                  <h3 className="font-bold">Working Hours</h3>
                  <p className="text-gray-600">Sunday - Thursday: 9AM - 6PM</p>
                  <p className="text-gray-600">Friday - Saturday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-teal-600">Follow Us</h2>
            <p className="mb-5 text-gray-600">
              Stay updated with our latest news and announcements.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-teal-100 text-teal-600 p-3 rounded-full hover:bg-teal-600 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-teal-100 text-teal-600 p-3 rounded-full hover:bg-teal-600 hover:text-white transition"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-teal-100 text-teal-600 p-3 rounded-full hover:bg-teal-600 hover:text-white transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="mt-12 bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-teal-600">Our Location</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.793843363025!2d90.40623731543177!3d23.75096908458753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhaka%201205!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg"
            title="SkillNest Location on Google Maps"
          ></iframe>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-teal-600">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">
              How long does it take to get a response?
            </h3>
            <p className="text-gray-600">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">
              Do you offer 24/7 support?
            </h3>
            <p className="text-gray-600">
              Our standard support hours are 9AM-6PM Sunday through Thursday.
              For urgent matters outside these hours, please call our emergency
              line.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">Can I visit your office?</h3>
            <p className="text-gray-600">
              Yes! We welcome visitors by appointment. Please contact us to
              schedule a visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
