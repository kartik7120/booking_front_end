import { useEffect, useState } from "react";
import CarouselLayover, { CarouselLayoverProps } from "./FrontPage/CarouselLayover";

export interface CarouselProps {
    imageURLs: string[];
    shouldAutoScroll: boolean;
    scrollInterval: number; // should be in milliseconds
    CarouselLayoverProps: CarouselLayoverProps[]; // Each layover corresponds to an image
}

export default function Carousel(props: CarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (props.shouldAutoScroll) {
            const intervalID = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % props.imageURLs.length);
            }, props.scrollInterval || 3000);

            return () => clearInterval(intervalID); // Cleanup interval on unmount
        }
    }, [props.shouldAutoScroll, props.scrollInterval, props.imageURLs.length]);

    const goToNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % props.imageURLs.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + props.imageURLs.length) % props.imageURLs.length);
    };

    return (
        <div className="relative">
            <div className="carousel w-full">
                {props.imageURLs.map((url, idx) => (
                    <div
                        key={idx}
                        className={`carousel-item w-full ${idx === currentSlide ? 'block' : 'hidden'}`}
                    >
                        <img src={url} className="w-full" alt={`Slide ${idx + 1}`} />
                    </div>
                ))}
                <div className="controls absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button onClick={goToPrevSlide} className="btn btn-circle">❮</button>
                    <button onClick={goToNextSlide} className="btn btn-circle">❯</button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full z-10 bg-opacity-75 text-white">
                {/* Render layover for the current slide */}
                <CarouselLayover
                    {...props.CarouselLayoverProps[currentSlide]} // Pass layover props for the current slide
                />
            </div>
        </div>
    );
}
