"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to LearnIt-PlaneIt 
        </h1>
        <h2 className='text-3xl font-bold text-blue-600 mb-4'>
        A Roadmap Creater 
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Organize your learning journey with roadmaps created with AI.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Track Your Learning</h3>
          <p className="text-gray-600">Create personalized roadmaps to keep track of your progress.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Stay Organized</h3>
          <p className="text-gray-600">Break down learning tasks into smaller, manageable steps.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Visualize Your Goals</h3>
          <p className="text-gray-600">See your roadmaps and take control of your learning goals.</p>
        </div>
      </section>
    </div>
  );
}
