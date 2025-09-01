"use client";
import React, { useState } from 'react';
import { Play } from 'lucide-react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            See Dorsakel in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our platform transforms dental education through innovative technology and proven learning methods
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
          <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
            {!isPlaying ? (
              <div 
                className="cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <p className="text-white text-lg">Video player would be embedded here</p>
              </div>
            )}
          </div>
          
          {/* Video overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;