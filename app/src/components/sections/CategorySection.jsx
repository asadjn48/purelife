import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CategorySection = () => {
  const sectionRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftImage = leftImageRef.current;
    const rightImage = rightImageRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;

    const ctx = gsap.context(() => {
      // Left image animation
      gsap.fromTo(
        leftImage,
        { x: '-50vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5
          }
        }
      );

      // Right image animation
      gsap.fromTo(
        rightImage,
        { x: '50vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5
          }
        }
      );

      // Headline animation
      gsap.fromTo(
        headline,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );

      // CTA animation
      gsap.fromTo(
        cta,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 35%',
            scrub: 0.5
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-teal py-20 z-20"
    >
      <div className="px-[7vw]">
        {/* Two Image Masks */}
        <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-center">
          {/* Left Image */}
          <div
            ref={leftImageRef}
            className="w-full lg:w-[40vw] h-[50vh] lg:h-[56vh] rounded-pill overflow-hidden shadow-card"
          >
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80"
              alt="Medicines Category"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Image */}
          <div
            ref={rightImageRef}
            className="w-full lg:w-[40vw] h-[50vh] lg:h-[56vh] rounded-pill overflow-hidden shadow-card"
          >
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
              alt="Medical Devices"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Headline */}
          <div
            ref={headlineRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <h2
              className="font-heading font-bold text-center leading-[0.95] drop-shadow-lg"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              <span className="text-navy block">MEDICINES</span>
              <span className="text-white block">& TREATMENTS</span>
            </h2>
          </div>
        </div>

        {/* Description & CTA */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-white/80 text-lg mb-6">
            From everyday pain relief to prescription support—organized by condition and reviewed by pharmacists.
          </p>
          <div ref={ctaRef}>
            <Link
              to="/category/medicines"
              className="pill-button-lime inline-flex items-center gap-2"
            >
              <span>Browse Medicines</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
