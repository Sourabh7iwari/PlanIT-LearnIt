"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Modal from './Model';

interface Step {
  heading: string;
  status: 'Incomplete' | 'Complete';
  details: string;
}

interface Roadmap {
  id: string; // UUID as a string
  title: string;
  steps: Step[];
}

const RoadmapDetail: React.FC = () => {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const loadRoadmap = () => {
      const savedRoadmaps = localStorage.getItem('roadmaps');
      const roadmaps = savedRoadmaps ? JSON.parse(savedRoadmaps) : [];
      const roadmapId = Array.isArray(id) ? id[0] : id;
      const selectedRoadmap = roadmaps.find(
        (roadmap: Roadmap) => roadmap.id === roadmapId
      );

      if (selectedRoadmap) {
        setRoadmap(selectedRoadmap);
      } else {
        console.error("Roadmap not found");
      }
      setLoading(false);
    };

    if (id) {
      loadRoadmap();
    }
  }, [id]);

  const toggleStepStatus = (stepIndex: number) => {
    if (!roadmap) return;

    const updatedSteps = roadmap.steps.map((step, index) => {
      if (index === stepIndex) {
        const newStatus: 'Incomplete' | 'Complete' =
          step.status === 'Complete' ? 'Incomplete' : 'Complete';
        return { ...step, status: newStatus };
      }
      return step;
    });

    const updatedRoadmap: Roadmap = { ...roadmap, steps: updatedSteps };
    setRoadmap(updatedRoadmap);

    const savedRoadmaps = localStorage.getItem('roadmaps');
    const roadmaps = savedRoadmaps ? JSON.parse(savedRoadmaps) : [];
    const updatedRoadmaps = roadmaps.map((r: Roadmap) =>
      r.id === roadmap.id ? updatedRoadmap : r
    );
    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));
  };

  const checkIncompleteSteps = () => {
    return roadmap?.steps.some(step => step.status === 'Incomplete');
  };

  const handleDeleteRoadmap = () => {
    if (checkIncompleteSteps()) {
      setIsModalOpen(true);
    } else {
      deleteRoadmap();
    }
  };

  const deleteRoadmap = () => {
    if (!roadmap) return;

    const savedRoadmaps = localStorage.getItem('roadmaps');
    const roadmaps = savedRoadmaps ? JSON.parse(savedRoadmaps) : [];
    const updatedRoadmaps = roadmaps.filter((r: Roadmap) => r.id !== roadmap.id);
    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));

    setRoadmap(null);
    router.push('/dashboard');
  };

  const handleConfirmDelete = () => {
    deleteRoadmap();
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const goBackToDashboard = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!roadmap) {
    return <p className="text-center">Roadmap not found.</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">{roadmap.title}</h2>
      <div className="border-l-4 border-blue-500 pl-4">
        <ul className="space-y-4">
          {roadmap.steps.map((step, index) => (
            <li key={index} className={`flex items-center ${step.status === 'Complete' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              <input
                type="checkbox"
                checked={step.status === 'Complete'}
                onChange={() => toggleStepStatus(index)}
                className="mr-2 w-5 h-5"
              />
              <div className="flex flex-col">
                <strong className="text-lg">{step.heading}</strong>
                <p className="text-sm text-gray-600">{step.details}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button onClick={handleDeleteRoadmap} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Delete Roadmap</button>
        <button onClick={goBackToDashboard} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Back to Dashboard</button>
      </div>

      {/* Modal Component */}
      <Modal 
        isOpen={isModalOpen} 
        message="Not all steps are complete. Are you sure you want to delete this roadmap?" 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
      />
    </div>
  );
};

export default RoadmapDetail;
