import { useEffect, useState } from "react";
import CarouselLayover, { CarouselLayoverProps } from "./FrontPage/CarouselLayover";

export interface CarouselProps {
    imageURLs: string[];
    shouldAutoScroll: boolean;
    scrollInterval: number; // in ms
    CarouselLayoverProps: CarouselLayoverProps[];
    isLoading: boolean;
}

export default function Carousel({
    imageURLs = [],
    shouldAutoScroll,
    scrollInterval = 3000,
    CarouselLayoverProps = [],
    isLoading,
}: CarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        let intervalID: NodeJS.Timeout | undefined;

        if (shouldAutoScroll && imageURLs.length > 0) {
            intervalID = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % imageURLs.length);
            }, scrollInterval);
        }

        return () => {
            if (intervalID) clearInterval(intervalID);
        };
    }, [shouldAutoScroll, scrollInterval, imageURLs.length]);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % imageURLs.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + imageURLs.length) % imageURLs.length);
    };

    const renderContent = () => {
        if (isLoading || imageURLs.length === 0) {
            return (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="skeleton w-full h-full" />
                </div>
            );
        }

        return (
            <>
                {imageURLs.map((url, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={url}
                            alt={`Slide ${idx + 1}`}
                            className="w-full h-full object-contain bg-black"
                            loading="lazy"
                        />
                    </div>
                ))}

                {/* Navigation Controls */}
                <div className="absolute left-4 right-4 top-1/2 flex justify-between transform -translate-y-1/2 z-20">
                    <button onClick={goToPrevSlide} className="btn btn-circle bg-white/30 hover:bg-white/50 text-black">
                        ❮
                    </button>
                    <button onClick={goToNextSlide} className="btn btn-circle bg-white/30 hover:bg-white/50 text-black">
                        ❯
                    </button>
                </div>

                {/* Layover */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black to-transparent text-white p-4 sm:p-6 md:p-8 z-10">
                    <CarouselLayover {...(CarouselLayoverProps[currentSlide] || {})} />
                </div>
            </>
        );
    };

    return (
        <div className="w-full max-md:hidden">
            {/* Aspect ratio wrapper to prevent layout shift */}
            <div className="relative w-full h-[90vh] overflow-hidden">
                {renderContent()}
            </div>
            <div className="divider"></div>
        </div>
    );
}
