import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;
    const trust = trustRef.current;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        headline.querySelectorAll('.headline-line'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }
      )
        .fromTo(
          subheadline,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          cta,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.6)' },
          '-=0.2'
        )
        .fromTo(
          image,
          { x: '10vw', scale: 0.96, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          trust,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.4'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([headline.querySelectorAll('.headline-line'), subheadline, cta, trust], {
              x: 0,
              y: 0,
              opacity: 1
            });
            gsap.set(image, { x: 0, rotate: 0, opacity: 1 });
          }
        }
      });

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          headline,
          { x: 0, opacity: 1 },
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          subheadline,
          { x: 0, opacity: 1 },
          { x: '-35vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          cta,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          image,
          { x: 0, rotate: 0, opacity: 1 },
          { x: '45vw', rotate: 6, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          trust,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.78
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-teal overflow-hidden z-10"
    >
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-[7vw] grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Headline */}
            <div ref={headlineRef} className="space-y-1">
              <h1 className="headline-line font-heading font-bold text-navy uppercase leading-[0.95]"
                  style={{ fontSize: 'clamp(44px, 6vw, 84px)' }}>
                YOUR HEALTH
              </h1>
              <h1 className="headline-line font-heading font-bold text-white uppercase leading-[0.95]"
                  style={{ fontSize: 'clamp(44px, 6vw, 84px)' }}>
                IS OUR WEALTH
              </h1>
            </div>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-white/90 text-lg max-w-md leading-relaxed"
            >
              Pure Life Pharmacy delivers genuine medicines, daily care, and wellness essentials—fast, safe, and stress-free.
            </p>

            {/* CTA */}
            <div ref={ctaRef}>
              <Link
                to="/category/medicines"
                className="pill-button-lime inline-flex items-center gap-2"
              >
                <span>Shop Medicines</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust Badge */}
            <div
              ref={trustRef}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex items-center gap-2 text-white/80">
                <Shield size={18} className="text-lime" />
                <span className="text-sm">Licensed UAE Pharmacy</span>
              </div>
              <div className="w-px h-4 bg-white/30" />
              <div className="flex items-center gap-2 text-white/80">
                <Clock size={18} className="text-lime" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="hidden lg:flex justify-end">
            <div
              ref={imageRef}
              className="relative w-[38vw] h-[68vh] rounded-pill overflow-hidden shadow-float"
            >
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"
                alt="Pharmacy Products"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-lime/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy/10 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
