"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { defaultRoadmaps } from '../../lib/roadmaps/default-roadmaps';

interface Step {
  heading: string;
  status: 'Incomplete' | 'Complete';
  details: string;
}

interface Roadmap {
  id: string;
  title: string;
  steps: Step[];
}

const Dashboard: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchRoadmaps = () => {
      const savedRoadmaps = localStorage.getItem('roadmaps');
      const parsedRoadmaps = savedRoadmaps ? JSON.parse(savedRoadmaps) : [];
  
      const uniqueTitles = new Set(parsedRoadmaps.map((roadmap: { title: string; }) => roadmap.title.toLowerCase()));
  
      const mergedRoadmaps = [...parsedRoadmaps]; 
  
      defaultRoadmaps.forEach((defaultRoadmap) => {
          if (!uniqueTitles.has(defaultRoadmap.title.toLowerCase())) {
              mergedRoadmaps.push(defaultRoadmap); 
              uniqueTitles.add(defaultRoadmap.title.toLowerCase()); 
          }
      });
  
      setRoadmaps(mergedRoadmaps);
      saveRoadmaps(mergedRoadmaps); 
  }
  
    fetchRoadmaps();
  }, []);

  
  const saveRoadmaps = (newRoadmaps: Roadmap[]) => {
    const savedRoadmaps = localStorage.getItem('roadmaps');
    const existingRoadmaps = savedRoadmaps ? JSON.parse(savedRoadmaps) : [];

    const existingTitles = new Set(existingRoadmaps.map((roadmap: { title: string; }) => roadmap.title.toLowerCase()));

    const combinedRoadmaps = [...existingRoadmaps];

    newRoadmaps.forEach((roadmap) => {
        if (!existingTitles.has(roadmap.title.toLowerCase())) {
            combinedRoadmaps.push(roadmap);
        }
    });

    localStorage.setItem('roadmaps', JSON.stringify(combinedRoadmaps));
};
  

  useCopilotReadable({
    description: 'The details and full list of roadmaps, including steps and their status',
    value: JSON.stringify(
      roadmaps.map((roadmap) => ({
        title: roadmap.title,
        totalSteps: roadmap.steps.length,
        completedSteps: roadmap.steps.filter(step => step.status === 'Complete').length,
        steps: roadmap.steps.map((step) => ({
          heading: step.heading,
          status: step.status,
          details: step.details,
        })),
      }))
    ),
  });

  useCopilotAction({
    name: 'Create a Roadmap',
    description: 'Creates a new roadmap with multiple steps in elaborate details, ensure no duplication',
    parameters: [
      { name: 'title', type: 'string', description: 'Title of the roadmap', required: true },
      {
        name: 'steps',
        type: 'object[]',
        description: 'Array of steps containing heading and details',
        required: true,
        items: {
          type: 'object',
          properties: {
            heading: { type: 'string', description: 'Heading of the step', required: true },
            details: { type: 'string', description: 'Details of the step', required: true },
          },
        },
      },
    ],
    handler: ({ title, steps }: { title: string; steps: Step[] }) => {
      const roadmapExists = roadmaps.some((roadmap) => roadmap.title.toLowerCase() === title.trim().toLowerCase());

      if (roadmapExists) {
        return `The roadmap titled "${title}" already exists. No duplicate created.`;
      }

      const newRoadmap: Roadmap = {
        id: Math.random().toString(36).substring(2),
        title: title.trim(),
        steps: steps.map((step) => ({
          ...step,
          status: 'Incomplete',
        })),
      };
  
      const updatedRoadmaps = [...roadmaps, newRoadmap];
      setRoadmaps(updatedRoadmaps);
      saveRoadmaps(updatedRoadmaps); 
    },
  });

  const setStatusStep = (roadmap: Roadmap, heading: string, status: 'Incomplete' | 'Complete'): Roadmap => {
    const updatedSteps = roadmap.steps.map((step) => {
        if (step.heading === heading) {
            return { ...step, status }; 
        }
        return step; 
    });
    return { ...roadmap, steps: updatedSteps }; 
};

useCopilotAction({
    name: 'Mark Step Status',
    description: 'Marks a specific step in a roadmap as either "Complete" or "Incomplete"',
    parameters: [
        { name: 'roadmapId', type: 'string', description: 'ID of the roadmap', required: true },
        { 
            name: 'heading', 
            type: 'string', 
            description: 'The heading of the step to update', 
            required: true 
        },
        { 
            name: 'status', 
            type: 'string', 
            description: 'New status for the step', 
            enum: ['Incomplete', 'Complete'], 
            required: true 
        },
    ],
    handler: ({ roadmapId, heading, status }: { roadmapId: string; heading: string; status: 'Incomplete' | 'Complete' }) => {
        const updatedRoadmaps = roadmaps.map((roadmap) => {
            if (roadmap.id === roadmapId) {
                return setStatusStep(roadmap, heading, status); 
            }
            return roadmap; 
        });

        setRoadmaps(updatedRoadmaps);
        saveRoadmaps(updatedRoadmaps); 
    },
});


  const deleteRoadmap = (title: string) => {
    const savedRoadmaps = localStorage.getItem('roadmaps');
    const existingRoadmaps = savedRoadmaps ? JSON.parse(savedRoadmaps) : [];

    const updatedRoadmaps = existingRoadmaps.filter((roadmap: { title: string; }) => roadmap.title.toLowerCase() !== title.toLowerCase());

    localStorage.setItem('roadmaps', JSON.stringify(updatedRoadmaps));
    setRoadmaps(updatedRoadmaps); 
};

useCopilotAction({
    name: 'Delete Roadmap',
    description: 'Deletes a roadmap based on its title',
    parameters: [
        { name: 'title', type: 'string', description: 'Title of the roadmap to delete', required: true },
    ],
    handler: ({ title }: { title: string }) => {
        const trimmedTitle = title.trim().toLowerCase();

        deleteRoadmap(trimmedTitle); 

        return `Roadmap titled "${title}" has been deleted.`;
    },
});


  const openRoadmap = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Existing Roadmaps</h2>
        {roadmaps.length === 0 ? (
          <p className="text-gray-600">No roadmaps created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition cursor-pointer"
                onClick={() => openRoadmap(roadmap.id)}
              >
                <h3 className="text-xl font-semibold text-gray-700">{roadmap.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
