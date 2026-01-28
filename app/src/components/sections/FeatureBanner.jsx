import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureBanner = ({
  titleLine1,
  titleLine2,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  imagePosition = 'left',
  bgColor = 'teal'
}) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const cta = ctaRef.current;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(image, { x: 0, opacity: 1 });
            gsap.set(text, { x: 0, opacity: 1 });
            gsap.set(cta, { y: 0, scale: 1, opacity: 1 });
          }
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          image,
          { x: imagePosition === 'left' ? '-60vw' : '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          text,
          { x: imagePosition === 'left' ? '40vw' : '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.05
        )
        .fromTo(
          cta,
          { y: '10vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
          0.15
        );

      // SETTLE (30% - 70%) - Hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          image,
          { x: 0, opacity: 1 },
          { x: imagePosition === 'left' ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          text,
          { x: 0, opacity: 1 },
          { x: imagePosition === 'left' ? '18vw' : '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cta,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, [imagePosition]);

  const bgClass = bgColor === 'lime' ? 'bg-lime' : 'bg-teal';

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen ${bgClass} overflow-hidden z-40`}
    >
      <div className="h-full px-[7vw] flex items-center">
        <div className={`w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}>
          {/* Image */}
          <div
            ref={imageRef}
            className={`${imagePosition === 'right' ? 'lg:order-2' : ''}`}
          >
            <div className="w-full lg:w-[44vw] h-[50vh] lg:h-[68vh] rounded-pill overflow-hidden shadow-card mx-auto">
              <img
                src={imageSrc}
                alt={titleLine1}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            ref={textRef}
            className={`${imagePosition === 'right' ? 'lg:order-1' : ''} text-center lg:text-left`}
          >
            <h2
              className="font-heading font-bold leading-[0.95]"
              style={{ fontSize: 'clamp(34px, 4.2vw, 58px)' }}
            >
              <span className={bgColor === 'lime' ? 'text-navy block' : 'text-navy block'}>
                {titleLine1}
              </span>
              <span className={bgColor === 'lime' ? 'text-navy/80 block' : 'text-white block'}>
                {titleLine2}
              </span>
            </h2>

            <p className={`mt-6 text-lg max-w-md mx-auto lg:mx-0 ${
              bgColor === 'lime' ? 'text-navy/70' : 'text-white/80'
            }`}>
              {description}
            </p>

            <div ref={ctaRef} className="mt-8">
              <Link
                to={ctaLink}
                className={bgColor === 'lime' ? 'pill-button-navy' : 'pill-button-lime'}
              >
                <span>{ctaText}</span>
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;
