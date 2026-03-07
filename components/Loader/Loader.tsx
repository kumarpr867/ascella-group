"use client";

import React, { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to hide the loader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds total (1.5s delay + 1.5s animation)

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.loaderWrap}>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="svg" d="M0,1000H1000V0H0Z"></path>
      </svg>
      <div className={styles.loaderWrapHeading}>
        <div className={styles.loadText}>
          <span>A</span>
          <span>S</span>
          <span>C</span>
          <span>E</span>
          <span>L</span>
          <span>L</span>
          <span>A</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;

