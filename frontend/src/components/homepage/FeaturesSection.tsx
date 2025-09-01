"use client";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Brain, Award, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning Cards",
      description: "Comprehensive study materials with detailed explanations, images, and step-by-step procedures for every dental specialty.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Advanced Quiz System",
      description: "Test your knowledge with adaptive quizzes that adjust to your learning pace and identify areas for improvement.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "3D Anatomical Models",
      description: "Explore detailed 3D dental anatomy with interactive models that enhance visual learning and spatial understanding.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your learning progress with detailed analytics, performance insights, and personalized study recommendations.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Revolutionary Learning Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your dental education with cutting-edge technology and scientifically-proven learning methodologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;