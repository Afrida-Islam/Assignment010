import React from "react";
import { useLoaderData } from "react-router";

const CourseDetails = () => {
  const data = useLoaderData;
  console.log(data);
  return <div>hiii</div>;
};

export default CourseDetails;
