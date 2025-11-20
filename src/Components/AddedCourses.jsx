import React, { use, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CourseCard } from "./CourseCard";

const AddedCourses = () => {
  const { currentUser } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    const fetchModels = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch(
          `https://assignment010serverside.vercel.app/my-models?created_by=${currentUser.email}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setModels(data);
      } catch (err) {
        console.error("Failed to fetch models:", err);
        setError(err.message);
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [currentUser?.email]);

  if (loading) return <div>Loading models...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Added Course (List View)
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <CourseCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default AddedCourses;
