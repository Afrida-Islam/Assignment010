import React from "react";
import { motion } from "framer-motion";

//   const data = useLoaderData();
//   // const [models, setModels] = useState(data)
//   // const [loading, setLoading] = useState(false)
// console.log(data)



const PlayIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-play"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

/**
 * Reusable component for displaying an individual step in the process.
 * @param {object} props - Component props.
 * @param {number} props.number - The step number.
 * @param {string} props.title - The title of the step.
 * @param {string} props.description - The description of the step.
 */
const StepItem = ({ number, title, description }) => (
  <div className="flex items-start space-x-4 p-4">
    <div className="relative flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg font-bold text-orange-600 border border-orange-300 shadow-md">
        {number}
      </div>

      <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-pulse opacity-50"></div>
    </div>

    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  </div>
);

const stepsData = [
  {
    number: 1,
    title: "Search for your course",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
  {
    number: 2,
    title: "Search for your course",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
  {
    number: 3,
    title: "Search for your course",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
  {
    number: 4,
    title: "Search for your course",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="md:grid md:grid-cols-2 md:divide-x divide-gray-100">
          <div className="relative flex items-center justify-center min-h-[300px] overflow-hidden">
            <img
              src="https://placehold.co/600x400/FDBA74/0A0A0A?text=Online+Learning"
              alt="A smiling woman wearing headphones and looking at a laptop"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/FDBA74/0A0A0A?text=Video+Placeholder";
              }}
            />

            <button
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-2xl transition duration-300 hover:bg-white text-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300/50"
              aria-label="Play video"
              onClick={() => console.log("Video played!")}
            >
              <PlayIcon className="w-8 h-8 ml-1" />
            </button>

            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white text-4xl font-bold"
          >
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                How It Works?
              </h2>
              <p className="text-gray-600 mb-8 sm:mb-10 text-base">
                Discouraged and irrelevant life attitudes. You're you. sneak
                peek into what has in store.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-4">
                {stepsData.map((step) => (
                  <StepItem
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default App;
