import { Link } from "react-router-dom";

const FreelancerCard = ({ freelancer }) => {
  const { _id, name, image, speciality, hourlyRate, rating } = freelancer;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
      {/* Image with subtle teal accent */}
      <div className="relative pt-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-teal-500"></div>
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-sm"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-teal-600 font-medium mb-2">{speciality}</p>

        {/* Rating + Rate */}
        <div className="flex justify-center items-center gap-4 my-3">
          <div className="flex items-center text-amber-400">
            ★ <span className="text-gray-700 ml-1 text-sm">{rating}</span>
          </div>
          <div className="text-gray-900 font-medium">${hourlyRate}/hr</div>
        </div>

        {/* CTA Button - Matching ExploreJobs */}
        <Link
          to={`/freelancers/${_id}`}
          className="mt-4 inline-block w-full py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default FreelancerCard;
