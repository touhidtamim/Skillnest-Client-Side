import {
  FaRocket,
  FaUsers,
  FaShieldAlt,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 md:py-16 px-6 text-gray-800">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl lg:text-4xl md:text-5xl font-bold mb-6 text-teal-600">
          About SkillNest
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Where talent meets opportunity in a trusted digital ecosystem
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
          <p className="mb-4 text-lg leading-relaxed">
            SkillNest was born in 2020 from a simple idea: to create a freelance
            marketplace that actually works for everyone. Founded by a team of
            passionate developers and designers who experienced the frustrations
            of existing platforms firsthand, we set out to build something
            better.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            What started as a small project among friends has grown into a
            thriving community of over 50,000 professionals and businesses
            collaborating on projects worth millions. Our secret? We treat
            freelancers as partners, not commodities.
          </p>
          <p className="text-lg leading-relaxed">
            Today, SkillNest is recognized as one of the fastest-growing
            freelance platforms in South Asia, but we're just getting started on
            our mission to revolutionize how the world works.
          </p>
        </div>
        <div className="bg-teal-50 p-8 rounded-xl shadow-lg">
          <img
            src="https://i.postimg.cc/nV2JrxCK/image.jpg"
            alt="Team working together"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-teal-600 text-white p-12 rounded-xl mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl mb-8">
            To empower individuals and businesses by creating the world's most
            human-centric freelance platform – where quality work is rewarded,
            relationships matter, and everyone has the tools to succeed.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/20 p-6 rounded-lg shadow-lg border border-white/30">
              <div className="flex justify-center text-white mb-4">
                <FaRocket className="text-4xl" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Fuel Growth</h3>
              <p className="text-white text-opacity-90">
                Help freelancers build sustainable careers
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/20 p-6 rounded-lg shadow-lg border border-white/30">
              <div className="flex justify-center text-white mb-4">
                <FaHandshake className="text-4xl" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Build Trust</h3>
              <p className="text-white text-opacity-90">
                Create meaningful connections that last
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/20 p-6 rounded-lg shadow-lg border border-white/30">
              <div className="flex justify-center text-white mb-4">
                <FaChartLine className="text-4xl" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">
                Drive Innovation
              </h3>
              <p className="text-white text-opacity-90">
                Continuously improve how work gets done
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-teal-100 rounded-xl p-8 hover:shadow-lg transition">
            <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaUsers className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">
              Community First
            </h3>
            <p className="text-gray-600 text-center">
              We believe in the power of community. Every decision we make
              prioritizes the needs of our members.
            </p>
          </div>
          <div className="border border-teal-100 rounded-xl p-8 hover:shadow-lg transition">
            <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaShieldAlt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">
              Radical Transparency
            </h3>
            <p className="text-gray-600 text-center">
              No hidden fees, no fine print. We're open about how our platform
              works and how we make money.
            </p>
          </div>
          <div className="border border-teal-100 rounded-xl p-8 hover:shadow-lg transition">
            <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaHandshake className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">
              Fair Exchange
            </h3>
            <p className="text-gray-600 text-center">
              We ensure fair compensation for freelancers and fair pricing for
              clients - everyone wins.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          Meet The Founders
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gray-200 w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden">
              <img
                src="https://i.postimg.cc/76vx3Nkg/image.jpg"
                alt="Founder 1"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Aminul Islam</h3>
            <p className="text-teal-600 font-medium mb-2">CEO & Co-Founder</p>
            <p className="text-gray-600">
              Former senior developer turned entrepreneur with a vision for
              better work ecosystems.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden">
              <img
                src="https://i.postimg.cc/tC94vDVk/image.jpg"
                alt="Founder 2"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Fatima Rahman</h3>
            <p className="text-teal-600 font-medium mb-2">CTO & Co-Founder</p>
            <p className="text-gray-600">
              Tech visionary with expertise in building scalable platforms that
              people love to use.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden">
              <img
                src="https://i.postimg.cc/DwMfZTpp/image.jpg"
                alt="Founder 3"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Rahim Khan</h3>
            <p className="text-teal-600 font-medium mb-2">COO & Co-Founder</p>
            <p className="text-gray-600">
              Operations specialist focused on creating seamless experiences for
              our community.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 p-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          SkillNest by the Numbers
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-teal-600 mb-2">10K+</p>
            <p className="text-gray-600">Active Professionals</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-teal-600 mb-2">22K+</p>
            <p className="text-gray-600">Satisfied Clients</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-teal-600 mb-2">100K+</p>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-teal-600 mb-2">$5M+</p>
            <p className="text-gray-600">Earned by Freelancers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
