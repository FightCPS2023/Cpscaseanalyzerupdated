import React, { useState } from 'react';
import { LandingPage } from './LandingPage';
import { AttorneyLandingPage } from './AttorneyLandingPage';
import { Button } from './ui/button';
import { Users, Briefcase, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { FooterDisclaimer } from './LegalDisclaimer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from 'figma:asset/da7dee53b50fcb425e1a14bf57136ede67a0ca5a.png';
// import { StickyDisclaimerBanner } from './StickyDisclaimerBanner'; // REMOVED

interface LandingPageRouterProps {
  onGetStarted: () => void;
}

export function LandingPageRouter({ onGetStarted }: LandingPageRouterProps) {
  const [selectedAudience, setSelectedAudience] = useState<'parent' | 'attorney' | null>(null);

  // Show audience selection first
  if (selectedAudience === null) {
    return (
      <>
        {/* <StickyDisclaimerBanner /> */} // REMOVED
        <div className="relative min-h-screen text-white p-4 sm:p-6 md:p-8 overflow-hidden">
          {/* Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full overflow-hidden">
              <ImageWithFallback
                src={heroImage}
                alt="CPS Punisher Background"
                className="w-full h-full opacity-40"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  minHeight: '100%',
                  minWidth: '100%'
                }}
              />
            </div>
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-blue-900/20 animate-pulse" style={{ animationDuration: '4s' }} />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent px-2">
                Welcome to The CPS Punisher
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4">
                Choose your path to access the most powerful CPS defense tools available
              </p>
            </div>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 px-2 sm:px-4">
              {/* Parent Option */}
              <button
                onClick={() => setSelectedAudience('parent')}
                className="group relative p-6 sm:p-8 md:p-10 bg-gradient-to-br from-red-900/50 to-red-950/50 border-2 border-red-700/50 rounded-xl sm:rounded-2xl hover:border-red-500 transition-all md:hover:scale-105 hover:border-red-400 text-left w-full"
              >
                <div className="flex flex-col items-start gap-6 sm:gap-8">
                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 space-y-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">I'm a Parent</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                      Fighting a CPS case and need tools to analyze documents, identify violations, and build your defense strategy.
                    </p>
                    <div className="flex items-center text-red-300 font-semibold text-sm sm:text-base pt-2">
                      Continue as Parent
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {/* Attorney Option */}
              <button
                onClick={() => setSelectedAudience('attorney')}
                className="group relative p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-900/50 to-blue-950/50 border-2 border-blue-700/50 rounded-xl sm:rounded-2xl hover:border-blue-500 transition-all md:hover:scale-105 hover:border-blue-400 text-left w-full"
              >
                <div className="flex flex-col items-start gap-6 sm:gap-8">
                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 space-y-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">I'm an Attorney</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                      Family law professional looking for Westlaw-grade research tools, document automation, and case management.
                    </p>
                    <div className="flex items-center text-blue-300 font-semibold text-sm sm:text-base pt-2">
                      Continue as Attorney
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 text-center px-4 mb-8">
              You can always switch between views later
            </p>

            {/* Important Legal Disclaimer - Now positioned under role cards */}
            <div className="px-2 sm:px-4">
              <Alert className="bg-amber-600/90 dark:bg-amber-700/90 border-2 border-amber-600 dark:border-amber-500 shadow-lg">
                <AlertTriangle className="h-5 w-5 text-amber-50" />
                <AlertTitle className="text-amber-50 font-bold mb-2">
                  ⚖️ IMPORTANT LEGAL NOTICE - READ CAREFULLY
                </AlertTitle>
                <AlertDescription className="text-amber-50 text-sm leading-relaxed space-y-2">
                  <p>
                    <strong className="text-amber-50">THIS APPLICATION PROVIDES LEGAL INFORMATION ONLY, NOT LEGAL ADVICE.</strong> The creators of this application are <strong className="text-amber-50">NOT licensed attorneys</strong> and do not provide legal services. Use of this application does <strong className="text-amber-50">NOT</strong> create an attorney-client relationship.
                  </p>
                  <p>
                    <strong className="text-amber-50">All content is for educational and informational purposes only.</strong> They are NOT a substitute for professional legal advice tailored to your specific circumstances.
                  </p>
                  <p className="font-semibold text-amber-50">
                    ⚠️ CRITICAL: Child protective services cases can result in permanent loss of parental rights. You MUST consult with a qualified, licensed family law attorney in your jurisdiction before taking ANY legal action.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show appropriate landing page based on selection
  if (selectedAudience === 'attorney') {
    return <AttorneyLandingPage onGetStarted={onGetStarted} />;
  }

  return <LandingPage onGetStarted={onGetStarted} />;
}