'use client';

import { useEffect } from 'react';
import { Video } from '@/lib/types';

interface TrailerModalProps {
  video: Video;
  onClose: () => void;
}

export default function TrailerModal({ video, onClose }: TrailerModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-cyber-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-4xl bg-cyber-dark border-2 border-cyber-blue/50 shadow-neon-blue rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-cyber-blue/30">
          <h3 className="text-white font-cyber">{video.name}</h3>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="relative pt-[56.25%]">
          <iframe 
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
            title={video.name}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}