import React from "react";
// import Navbar from "../Components/Navbar";
// import { Outlet } from "react-router";
// import Footer from "../Components/Footer";
import Banner from "../Components/Banner";

import Stepltem from "../Components/StepItem";
import FeaturePart from "../Components/FeaturePart";
// import CourseCategories from "../Components/CourseCategories";
import FAQSection from "../Components/FAQSection";
import TestimonialCard from "../Components/TestimonialCard";
import AllModels from "../Components/AllModels";
const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}

      <Banner></Banner>
      <AllModels></AllModels>
      {/* <CourseCategories></CourseCategories> */}
      <Stepltem></Stepltem>

      <FeaturePart></FeaturePart>
      <FAQSection></FAQSection>
      <TestimonialCard></TestimonialCard>
      {/* <Outlet></Outlet>
      <Footer></Footer> */}
    </div>
  );
};

export default Home;
