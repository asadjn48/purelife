import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(headline, { x: 0, y: 0, opacity: 1 });
            gsap.set(image, { x: 0, y: 0, opacity: 1 });
            gsap.set(content, { y: 0, opacity: 1, scale: 1 });
          }
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headline,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          image,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.05
        )
        .fromTo(
          content,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.15
        );

      // SETTLE (30% - 70%) - Hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          image,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          content,
          { scale: 1, opacity: 1 },
          { scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-lime overflow-hidden z-50"
    >
      <div className="h-full px-[7vw] flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Headline */}
            <div ref={headlineRef}>
              <h2
                className="font-heading font-bold text-navy leading-[0.95]"
                style={{ fontSize: 'clamp(44px, 6vw, 84px)' }}
              >
                <span className="block">JOIN</span>
                <span className="block">PURE LIFE</span>
              </h2>
            </div>

            {/* Content */}
            <div ref={contentRef} className="space-y-6">
              <p className="text-navy/70 text-lg max-w-md">
                Save your prescriptions, track orders, and get refill reminders—right from your phone.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="pill-button-navy inline-flex items-center justify-center gap-2"
                >
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="#"
                  className="pill-button-outline inline-flex items-center justify-center gap-2"
                >
                  <span>Download App</span>
                </Link>
              </div>

              {/* Trust Line */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-navy/70">
                  <Shield size={16} />
                  <span className="text-sm">Secure checkout</span>
                </div>
                <div className="w-px h-4 bg-navy/20" />
                <div className="flex items-center gap-2 text-navy/70">
                  <Check size={16} />
                  <span className="text-sm">UAE-licensed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex justify-end">
            <div
              ref={imageRef}
              className="w-[38vw] h-[68vh] rounded-pill overflow-hidden shadow-card"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                alt="Join Pure Life Pharmacy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
