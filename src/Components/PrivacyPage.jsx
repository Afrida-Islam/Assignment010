import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Eye,
  Lock,
  RefreshCcw,
  UserCheck,
  Cookie,
} from "lucide-react";

const PrivacyPage = () => {
  const sections = [
    {
      id: "collection",
      icon: <Eye className="text-[#FF782D]" />,
      title: "1. Information We Collect",
      content:
        "At SkillSet, we collect information you provide directly—like your name, email, and billing details. We also automatically collect device information and IP addresses to ensure platform stability and security.",
    },
    {
      id: "usage",
      icon: <RefreshCcw className="text-[#FF782D]" />,
      title: "2. How We Use Your Data",
      content:
        "We use your data to personalize your learning dashboard, track course progress, and issue verified certificates. Your data helps our AI recommend the best next steps for your career path.",
    },
    {
      id: "security",
      icon: <Lock className="text-[#FF782D]" />,
      title: "3. Data Security",
      content:
        "We implement industry-standard AES-256 encryption for all data at rest and TLS for data in transit. Your payment information is handled by PCI-compliant partners and is never stored on our servers.",
    },
    {
      id: "rights",
      icon: <UserCheck className="text-[#FF782D]" />,
      title: "4. Your Privacy Rights",
      content:
        "You have the right to access, correct, or delete your personal data at any time. You can export your learning history or withdraw consent for marketing emails via your account settings.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Dynamic Header */}
      <section className="bg-gray-900 py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF782D] opacity-10 blur-[100px] rounded-full" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#FF782D] border border-white/10 mb-6"
          >
            <ShieldCheck size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">
              Trust Center
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Privacy <span className="text-[#FF782D]">Matters</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We are committed to protecting your personal data and being
            transparent about how we use it.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[300px_1fr] gap-16">
          {/* Quick Nav - Desktop only */}
          <aside className="hidden lg:block sticky top-28 h-fit">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 px-2">
              On this page
            </h4>
            <nav className="flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-[#FF782D] transition-all font-medium border-l-2 border-transparent hover:border-[#FF782D]"
                >
                  {s.title.split(". ")[1]}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={itemVariants}
                className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-orange-100 dark:hover:border-gray-800 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF782D]/10 transition-all">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {section.content}
                </p>
              </motion.section>
            ))}

            {/* Cookie Highlight Card */}
            <motion.section
              variants={itemVariants}
              className="p-10 bg-gradient-to-br from-[#FF782D] to-[#d34e00] rounded-[2.5rem] shadow-xl text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Cookie size={32} className="text-orange-200" />
                  <h3 className="text-2xl font-bold">Cookie Notice</h3>
                </div>
                <p className="text-orange-50 leading-relaxed mb-6">
                  We use essential and functional cookies to remember your login
                  status and course progress. You can manage your preferences
                  through your browser settings.
                </p>
                <button className="px-6 py-2 bg-white text-[#FF782D] font-bold rounded-full text-sm hover:shadow-lg transition-all">
                  Manage Preferences
                </button>
              </div>
              {/* Background Icon Decor */}
              <Cookie
                size={180}
                className="absolute -bottom-10 -right-10 opacity-10 rotate-12"
              />
            </motion.section>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-sm text-center pt-10"
            >
              Questions? Reach out to our Data Protection Officer at{" "}
              <span className="text-[#FF782D] font-semibold">
                privacy@skillset.com
              </span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
