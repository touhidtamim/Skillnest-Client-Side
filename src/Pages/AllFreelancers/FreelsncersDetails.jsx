import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const FreelancerDetails = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/freelancers/${id}`);
        const data = await res.json();
        setFreelancer(data);
      } catch (error) {
        console.error("Error fetching freelancer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!freelancer)
    return <p className="text-center py-20">Freelancer not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/freelancers"
        className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Freelancers
      </Link>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-teal-50 to-gray-50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {freelancer.available && (
                <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Available
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {freelancer.name}
                </h1>
                <span className="inline-block bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                  {freelancer.rank}
                </span>
              </div>

              <p className="text-lg text-teal-600 font-medium mt-1">
                {freelancer.speciality}
              </p>

              <div className="flex items-center justify-center md:justify-start mt-3 space-x-4">
                <div className="flex items-center">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(freelancer.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-700">
                    ({freelancer.rating.toFixed(1)})
                  </span>
                </div>

                <div className="text-gray-900 font-bold">
                  ${freelancer.hourlyRate}/hr
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
          {/* Left Column - About */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 mb-6">{freelancer.description}</p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {freelancer.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
                <p className="text-gray-700">
                  {freelancer.experience}{" "}
                  {freelancer.experience === 1 ? "year" : "years"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                <p className="text-gray-700">
                  {freelancer.location || "Remote"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Projects Completed
                </h3>
                <p className="text-gray-700">
                  {freelancer.projectsCompleted || "99+"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Response Time
                </h3>
                <p className="text-gray-700">
                  {freelancer.responseTime || "Within 24 hours"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact */}
          <div className="bg-gray-50 rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact {freelancer.name.split(" ")[0]}
            </h2>

            {freelancer.available ? (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Details
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Describe your project..."
                    ></textarea>
                  </div>
                </div>

                <button className="w-full cursor-pointer py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all">
                  Send Message
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Currently Unavailable
                </h3>
                <p className="text-gray-600">
                  {freelancer.name} is not accepting new projects at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetails;
