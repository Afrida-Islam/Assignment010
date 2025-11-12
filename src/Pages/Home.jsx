import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import FeatureSection from "../Components/FeatureSection";
import Stepltem from "../Components/StepItem";
import FeaturePart from "../Components/FeaturePart";
import CourseCategories from "../Components/CourseCategories";
import FAQSection from "../Components/FAQSection";
import TestimonialCard from "../Components/TestimonialCard";
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <CourseCategories></CourseCategories>
      <Stepltem></Stepltem>
      <FeaturePart></FeaturePart>
      <FAQSection></FAQSection>
      <TestimonialCard></TestimonialCard>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Home;
