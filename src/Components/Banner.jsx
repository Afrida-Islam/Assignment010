import React from "react";
import bgImage from "../assets/bg.jpeg";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    // <div
    //   className="h-screen bg-cover bg-center flex items-center justify-center text-white"
    //   style={{ backgroundImage: `url(${bgImage})` }}
    // >
    //   <motion.div
    //     initial={{ opacity: 0, y: 40 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 1 }}
    //     className="text-center text-white text-4xl font-bold"
    //   >
    //     <div className="bg-black/50 px-8 py-8 rounded-lg">
    //       <h1 className="text-4xl font-bold ">
    //         Find The Best Online Course for Skills
    //       </h1>
    //       <p className="text-2xl">
    //         Aihus has been credited with disrupting the traditional hospitality
    //         industry by offering a affordable
    //       </p>
    //       <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
    //         Get Starled Now
    //       </button>
    //     </div>
    //   </motion.div>
    // </div>
    <div>
      <section
        className="bg-orange-50 dark:bg-gray-900 py-16 sm:py-24 h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white text-4xl font-bold"
          >
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Find The Best Online</span>{" "}
                <span className="block text-indigo-600 dark:text-indigo-400 xl:inline">
                  Course for Skills
                </span>
              </h1>

              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                aliqua.
              </p>

              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <a
                    href="#"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 md:py-4 md:text-lg md:px-10"
                  >
                    Get started Now
                  </a>

                  {/* Secondary Button (e.g., Live Demo) */}
                  <a
                    href="#"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Discover More
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Placeholder for the large image/mockup shown in the bottom of your photo */}
          {/* <div className="mt-16 sm:mt-24">
            <div className="mx-auto max-w-7xl">
              <div className="lg:p-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300">
                  **Placeholder for App Screenshot / Mockup**
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Banner;
