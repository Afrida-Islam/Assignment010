import React from "react";
import { useLoaderData } from "react-router"; // এখানে ইমপোর্ট করুন
import Banner from "../Components/Banner";
import Stepltem from "../Components/StepItem";
import FeaturePart from "../Components/FeaturePart";
import FAQSection from "../Components/FAQSection";
import TestimonialCard from "../Components/TestimonialCard";
import AllCourses from "../Components/AllCourses";
import StatsSection from "../Components/StatsSection";
import CTASection from "../Components/CTASection";
import ReviewsPage from "../Components/ReviewsPage";

const Home = () => {
  // ডাটাটি এখানে রিসিভ করুন
  const initialData = useLoaderData();

  return (
    <div>
      <Banner />
      {/* ডাটাটি props হিসেবে পাঠিয়ে দিন */}
      <AllCourses initialData={initialData} />
      <Stepltem />
      <FeaturePart />
      <FAQSection />
      <StatsSection />
      <CTASection />
      <ReviewsPage />
      <TestimonialCard />
    </div>
  );
};

export default Home;
