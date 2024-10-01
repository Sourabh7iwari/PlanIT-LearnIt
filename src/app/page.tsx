// src/app/page.tsx
"use client";

import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <h1>Welcome to Roadmap Creator</h1>
        <p>Organize your learning journey with customizable roadmaps.</p>
        <Link href="/dashboard">
          <button className={styles.ctaButton}>Go to Dashboard</button>
        </Link>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <h3>Track Your Learning</h3>
          <p>Create personalized roadmaps to keep track of your progress.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Stay Organized</h3>
          <p>Break down learning tasks into smaller, manageable steps.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Visualize Your Goals</h3>
          <p>See your roadmaps and take control of your learning goals.</p>
        </div>
      </section>
    </div>
  );
}
