import { useState, useEffect } from 'react';

/**
 * Hook for managing initial site loading
 * Shows loader while critical resources are loading
 */
export const useInitialLoader = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Check if site was already loaded in this session
    const hasLoaded = sessionStorage.getItem('siteInitiallyLoaded');
    
    if (hasLoaded === 'true') {
      setIsInitialLoading(false);
      setLoadingProgress(100);
      return;
    }

    const startTime = Date.now();
    const minLoadingTime = 8000; // Minimum 8 seconds for full animation loading
    const maxLoadingTime = 12000; // Maximum 12 seconds protection
    
    let isFinished = false;

    // Smooth progress increment with realistic speed
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 85) return prev; // Stop at 85% waiting for resources
        const increment = Math.random() * 4 + 2; // From 2% to 6% per step
        return Math.min(prev + increment, 85);
      });
    }, 200); // Update every 200ms for smoothness

    // Function to check if resources are loaded
    const checkResourcesLoaded = () => {
      // Check if DOM is ready
      if (document.readyState !== 'complete') {
        return false;
      }

      // Check if all images are loaded
      const images = Array.from(document.querySelectorAll('img'));
      const allImagesLoaded = images.length === 0 || images.every(img => {
        if (img.complete && img.naturalHeight !== 0) return true;
        if (img.src.includes('data:') || img.src.includes('blob:')) return true; // Skip data URLs
        return false;
      });
      
      // Check if all videos are ready (metadata loaded)
      const videos = Array.from(document.querySelectorAll('video'));
      const allVideosReady = videos.length === 0 || videos.every(video => video.readyState >= 1); // HAVE_METADATA

      // Check if CSS animations are ready (check for key elements)
      const criticalElements = document.querySelectorAll('main, header, [data-animate]');
      const elementsReady = criticalElements.length > 0;

      return allImagesLoaded && allVideosReady && elementsReady;
    };

    // Check readiness every 300ms for optimal performance
    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const resourcesReady = checkResourcesLoaded();

      // Completion condition:
      // 1. Minimum 8 seconds passed AND resources are loaded
      // OR
      // 2. Maximum 12 seconds passed (forced completion)
      if ((elapsed >= minLoadingTime && resourcesReady) || elapsed >= maxLoadingTime) {
        if (!isFinished) {
          isFinished = true;
          finishLoading();
        }
      }
    }, 300); // Optimized check frequency

    function finishLoading() {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
      
      // Complete progress to 100% with smooth transition
      setLoadingProgress(100);
      
      // Small delay for smooth completion animation
      setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem('siteInitiallyLoaded', 'true');
        
        // Add class to trigger animations on home page
        document.body.classList.add('initial-load-complete');
      }, 800); // Increased delay for better UX
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
    };
  }, []);

  return { isInitialLoading, loadingProgress };
};