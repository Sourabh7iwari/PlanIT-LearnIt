"use client";

import { useState, useEffect } from 'react';
import styles from '../../styles/Dashboard.module.css';

interface Step {
  heading: string;
  status: 'Incomplete' | 'Complete';
  details: string;
}

interface Roadmap {
  id: number;
  title: string;
  steps: Step[];
}

const Dashboard: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [newRoadmap, setNewRoadmap] = useState<Roadmap>({
    id: 0,
    title: '',
    steps: [{ heading: '', status: 'Incomplete', details: '' }]
  });

  // Fetch roadmaps from API
  const fetchRoadmaps = async () => {
    const response = await fetch('/api/copilotkit/router');
    const data = await response.json();
    setRoadmaps(data);
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoadmap({ ...newRoadmap, title: e.target.value });
  };

  const handleStepChange = (index: number, field: string, value: string) => {
    const updatedSteps = newRoadmap.steps.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    setNewRoadmap({ ...newRoadmap, steps: updatedSteps });
  };

  const handleAddStep = () => {
    setNewRoadmap({
      ...newRoadmap,
      steps: [...newRoadmap.steps, { heading: '', status: 'Incomplete', details: '' }]
    });
  };

  const handleCreateRoadmap = async () => {
    if (newRoadmap.title.trim()) {
      const response = await fetch('/api/copilotkit/router', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newRoadmap.title,
          steps: newRoadmap.steps,
        }),
      });

      const result = await response.json();
      if (result.message === 'Roadmap created') {
        fetchRoadmaps(); // Refresh roadmaps after creation
        setNewRoadmap({
          id: 0,
          title: '',
          steps: [{ heading: '', status: 'Incomplete', details: '' }]
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.roadmapForm}>
        <h2>Create a new roadmap</h2>
        <input
          type="text"
          placeholder="Roadmap Title"
          value={newRoadmap.title}
          onChange={handleTitleChange}
          className={styles.input}
        />
        <h3>Steps</h3>
        {newRoadmap.steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <input
              type="text"
              placeholder={`Step ${index + 1} Heading`}
              value={step.heading}
              onChange={(e) => handleStepChange(index, 'heading', e.target.value)}
              className={styles.input}
            />
            <select
              value={step.status}
              onChange={(e) => handleStepChange(index, 'status', e.target.value)}
              className={styles.input}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </select>
            <textarea
              placeholder={`Step ${index + 1} Details`}
              value={step.details}
              onChange={(e) => handleStepChange(index, 'details', e.target.value)}
              className={styles.textarea}
            />
          </div>
        ))}
        <button onClick={handleAddStep} className={styles.button}>Add Step</button>
        <button onClick={handleCreateRoadmap} className={styles.button}>Create Roadmap</button>
      </div>

      <div className={styles.roadmapList}>
        <h2>Existing Roadmaps</h2>
        {roadmaps.length === 0 ? (
          <p>No roadmaps created yet.</p>
        ) : (
          roadmaps.map((roadmap) => (
            <div key={roadmap.id} className={styles.roadmapCard}>
              <h3>{roadmap.title}</h3>
              <ul>
                {roadmap.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>
                    <strong>{step.heading}</strong> - {step.status}
                    <p>{step.details}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
