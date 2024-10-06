import React from 'react';

const About: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About This Project</h2>
        <p className="text-gray-600 mb-4">
          This project is a roadmap management tool designed to help users create, manage, and track their progress on various roadmaps. It provides a user-friendly interface for organizing tasks and visualizing the steps necessary to achieve goals.
        </p>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Key Features:</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Create and customize roadmaps with multiple steps.</li>
          <li>Track the status of each step (Complete or Incomplete).</li>
          <li>Delete roadmaps when they are no longer needed.</li>
          <li>Responsive design for use on various devices.</li>
        </ul>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Technologies Used:</h3>
        <p className="text-gray-600 mb-4">
          This project is built using React, TypeScript, and Next.js, with a focus on modular components and clean code practices.
        </p>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Get Involved:</h3>
        <p className="text-gray-600">
          If you would like to contribute to this project or provide feedback, please reach out via the project's repository on GitHub.
        </p>
      </div>
    </div>
  );
};

export default About;
