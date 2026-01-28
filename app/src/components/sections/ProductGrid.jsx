import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../ProductCard';

gsap.registerPlugin(ScrollTrigger);

const ProductGrid = ({ title, subtitle, products, viewAllLink, showViewAll = true }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5
          }
        }
      );

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.product-card');
      gsap.fromTo(
        cardElements,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            end: 'top 50%',
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
      className="relative w-full bg-teal py-[8vh] z-30"
    >
      <div className="px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="font-heading font-bold text-navy uppercase"
              style={{ fontSize: 'clamp(34px, 4.2vw, 58px)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/80 text-lg mt-2 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          {showViewAll && viewAllLink && (
            <Link
              to={viewAllLink}
              className="hidden sm:flex items-center gap-2 text-white hover:text-lime transition-colors"
            >
              <span className="font-medium">View all</span>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All */}
        {showViewAll && viewAllLink && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              to={viewAllLink}
              className="inline-flex items-center gap-2 text-white hover:text-lime transition-colors"
            >
              <span className="font-medium">View all</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
