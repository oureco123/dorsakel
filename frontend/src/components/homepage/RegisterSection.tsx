"use client";
import React from 'react';
import { Button } from '@/components/ui/button';

const RegisterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of dental professionals who have already elevated their expertise with our comprehensive learning platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
            >
              Create Free Account
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-blue-700 hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              View Demo
            </Button>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-blue-200 text-sm">
              No credit card required • Start learning immediately • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;