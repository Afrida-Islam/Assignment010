import React from "react";

import Banner from "../Components/Banner";

import Stepltem from "../Components/StepItem";
import FeaturePart from "../Components/FeaturePart";
// import CourseCategories from "../Components/CourseCategories";
import FAQSection from "../Components/FAQSection";
import TestimonialCard from "../Components/TestimonialCard";
import AllCourses from "../Components/AllCourses";
import StatsSection from "../Components/StatsSection";
import CTASection from "../Components/CTASection";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}

      <Banner></Banner>
      <AllCourses></AllCourses>

      <Stepltem></Stepltem>

      <FeaturePart></FeaturePart>
      <FAQSection></FAQSection>
      <StatsSection> </StatsSection>
      <CTASection></CTASection>
      <TestimonialCard></TestimonialCard>
      {/* <Outlet></Outlet>
      <Footer></Footer> */}
    </div>
  );
};

export default Home;
