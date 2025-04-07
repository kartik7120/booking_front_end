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

    const [width, setWidth] = useState<number>()
    const [height, setHeight] = useState<number>()

    useEffect(() => {
        if (props.shouldAutoScroll) {
            const intervalID = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % props.imageURLs.length);
            }, props.scrollInterval || 3000);

            return () => clearInterval(intervalID); // Cleanup interval on unmount
        }

        // Handle window resize

        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [props.shouldAutoScroll, props.scrollInterval, props.imageURLs.length, currentSlide]);

    const goToNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % props.imageURLs.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + props.imageURLs.length) % props.imageURLs.length);
    };

    return (
        <div>
            {
                props.imageURLs.length === 0 && (
                    <div className={`skeleton h-200 w-[${width}]`}></div>
                )
            }
            {
                (props.imageURLs.length && <div className="relative w-full max-w-screen overflow-hidden">
                    <div className="carousel w-full relative">
                        {props.imageURLs.map((url, idx) => (
                            <div
                                key={idx}
                                className={`carousel-item w-full ${idx === currentSlide ? 'block' : 'hidden'}`}
                            >
                                <img src={url} className="w-full" alt={`Slide ${idx + 1}`} />
                            </div>
                        ))}
                        {/* Create a loading place-holder */}

                        {props.imageURLs.length === 0 && (
                            <div className="skeleton h-32 w-600"></div>
                        )}
                        {/* Controls */}
                        <div className="controls absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <button onClick={goToPrevSlide} className="btn btn-circle">❮</button>
                            <button onClick={goToNextSlide} className="btn btn-circle">❯</button>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/50 to-transparent text-white p-4">
                        {/* Render layover for the current slide */}
                        <CarouselLayover
                            {...(props.CarouselLayoverProps.length && props.CarouselLayoverProps[currentSlide] || {})} // Use an empty object as fallback
                        />
                    </div>
                </div>
                )
            }
        </div>
    );
}
