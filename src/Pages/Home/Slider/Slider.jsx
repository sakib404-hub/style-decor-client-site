import React from "react";
import { Carousel } from "react-responsive-carousel";
import { FaArrowRight } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Assets
import sliderImage1 from './../../../assets/sliderImage1.jpg';
import sliderImage2 from './../../../assets/sliderImage2.jpg';
import sliderImage3 from './../../../assets/sliderImage3.jpg';
import sliderImage4 from './../../../assets/sliderImage4.jpg';
import sliderImage5 from './../../../assets/sliderImage5.webp';
import { Link } from "react-router";

const ACCENT_COLOR = "#FFD700"; // Gold accent

const sliderData = [
    {
        image: sliderImage1,
        tag: "Premium Décor",
        title: "Golden Moments",
        description: "Celebrate your special day with elegant and luxurious décor.",
        linkText: "View Package",
        alignment: "left",
    },
    {
        image: sliderImage2,
        tag: "Elegant Themes",
        title: "Floral Elegance",
        description: "Beautiful floral arrangements and thematic setups for your events.",
        linkText: "Explore Themes",
        alignment: "center",
    },
    {
        image: sliderImage3,
        tag: "Memorable Experience",
        title: "Anniversary Bliss",
        description: "Create unforgettable memories with our bespoke event setups.",
        linkText: "Book Now",
        alignment: "right",
    },
    {
        image: sliderImage4,
        tag: "Exclusive Setups",
        title: "Luxury Arrangements",
        description: "Top-notch decorations with premium finishing for your event.",
        linkText: "See Details",
        alignment: "left",
    },
    {
        image: sliderImage5,
        tag: "Perfect Ambiance",
        title: "Elegant Celebrations",
        description: "Transform your venue into a stunning space with our décor solutions.",
        linkText: "Reserve Now",
        alignment: "center",
    },
];

const Slider = () => {
    return (
        <section className="relative overflow-hidden">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={6000}
                transitionTime={700}
                stopOnHover={true}
                className="main-banner-carousel"
            >
                {sliderData.map((slide, index) => (
                    <div key={index} className="relative h-[70vh] md:h-[80vh]">

                        {/* Background Image */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover rounded-xl scale-105 animate-slowZoom"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/30" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                        {/* Content */}
                        <div className={`absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32
                ${slide.alignment === 'left' ? 'items-start text-left' : ''}
                ${slide.alignment === 'center' ? 'items-center text-center' : ''}
                ${slide.alignment === 'right' ? 'items-end text-right' : ''}
              `}>
                            <div className="max-w-3xl space-y-6">

                                {/* Tag */}
                                <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md border border-yellow-400/30 px-4 py-1.5 rounded-full mb-4">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-yellow-300">{slide.tag}</span>
                                </div>

                                {/* Title */}
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg leading-tight">
                                    {slide.title}
                                </h2>

                                {/* Description */}
                                <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                                    {slide.description}
                                </p>

                                {/* CTA Button */}
                                <div className="pt-4">
                                    <Link
                                        to="/services"
                                        className="px-8 py-3 rounded-full font-semibold text-white tracking-wide shadow-lg transition-transform transform hover:scale-105"
                                        style={{
                                            background: `linear-gradient(90deg, ${ACCENT_COLOR} 0%, #fff1c2 100%)`,
                                        }}
                                    >
                                        {slide.linkText} <FaArrowRight className="inline ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Slide Index Dots */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {sliderData.map((_, i) => (
                                <div key={i} className={`h-2 rounded-full transition-all ${index === i ? 'w-8 bg-yellow-400' : 'w-3 bg-white/50'}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Custom Styles */}
            <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slowZoom {
          animation: slowZoom 15s infinite alternate ease-in-out;
        }
        .main-banner-carousel .control-dots {
          display: none; /* Hide default dots */
        }
      `}</style>
        </section>
    );
};

export default Slider;
