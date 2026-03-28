'use client';

import { useEffect } from 'react';

/**
 * Register service worker for PWA functionality
 */
export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope);
          
          // Wait for service worker to be ready
          return navigator.serviceWorker.ready;
        })
        .then(() => {
          // Send current page URL to service worker for language caching
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'PAGE_LOADED',
              url: window.location.href
            });
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);
}
