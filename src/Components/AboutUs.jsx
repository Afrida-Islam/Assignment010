import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Shield, Zap, CheckCircle2 } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { label: "Students", value: "1,200+" },
    { label: "Courses", value: "50+" },
    { label: "Mentors", value: "60+" },
    { label: "Success Rate", value: "94%" },
  ];

  const values = [
    {
      icon: <Target className="text-orange-500" size={30} />,
      title: "Our Mission",
      desc: "To democratize high-quality education by making it accessible and affordable for everyone, everywhere.",
    },
    {
      icon: <Shield className="text-orange-500" size={30} />,
      title: "Quality First",
      desc: "We curate our courses with industry experts to ensure you learn the most relevant, up-to-date skills.",
    },
    {
      icon: <Zap className="text-orange-500" size={30} />,
      title: "Fast Tracking",
      desc: "Our project-based curriculum is designed to get you job-ready in the shortest time possible.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Empowering the Next <br />
            <span className="text-[#FF782D]">Generation of Leaders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Astrax is more than just an e-learning platform. We are a community
            of creators, thinkers, and doers dedicated to professional growth.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#FF782D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </h3>
                <p className="text-orange-100 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#FF782D] font-bold uppercase tracking-widest text-sm">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
              Started from a simple idea: <br />
              <span className="text-[#FF782D]">
                Learning should be practical.
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We noticed a gap between traditional education and industry
              requirements. Theoretical knowledge is great, but the world
              rewards those who can actually build, design, and manage.
            </p>
            <ul className="space-y-4">
              {[
                "Industry Expert Mentors",
                "Lifetime Access",
                "Official Certifications",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-semibold"
                >
                  <CheckCircle2 className="text-[#FF782D]" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="Our Team"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FF782D] rounded-3xl -z-10 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
