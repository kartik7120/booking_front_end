import { useEffect, useState } from "react";
import CarouselLayover, { CarouselLayoverProps } from "./FrontPage/CarouselLayover";

export interface CarouselProps {
    imageURLs: string[];
    shouldAutoScroll: boolean;
    scrollInterval: number; // in ms
    CarouselLayoverProps: CarouselLayoverProps[];
}

export default function Carousel(props: CarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();

    const imageURLs = props.imageURLs || [];
    const CarouselLayovers = props.CarouselLayoverProps || [];

    useEffect(() => {
        if (props.shouldAutoScroll && imageURLs.length > 0) {
            const intervalID = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % imageURLs.length);
            }, props.scrollInterval || 3000);
            return () => clearInterval(intervalID);
        }

        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [props.shouldAutoScroll, props.scrollInterval, imageURLs]);

    const goToNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % imageURLs.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + imageURLs.length) % imageURLs.length);
    };

    if (imageURLs.length === 0) {
        return (
            <div className={`skeleton h-96 w-full`} />
        );
    }

    return (
        <div className="w-full max-md:hidden">
            <div className="relative w-full max-w-screen overflow-hidden h-[70vh] sm:h-[80vh]">
                <div className="relative w-full h-full">
                    {imageURLs.map((url, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100" : "opacity-0"}`}
                        >
                            <img src={url} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}

                    {/* Navigation controls */}
                    <div className="absolute left-4 right-4 top-1/2 flex justify-between transform -translate-y-1/2 z-20">
                        <button onClick={goToPrevSlide} className="btn btn-circle bg-white/30 hover:bg-white/50 text-black">
                            ❮
                        </button>
                        <button onClick={goToNextSlide} className="btn btn-circle bg-white/30 hover:bg-white/50 text-black">
                            ❯
                        </button>
                    </div>

                    {/* Layover with responsive styling */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent text-white p-4 sm:p-6 md:p-8 z-10">
                        <CarouselLayover {...(CarouselLayovers[currentSlide] || {})} />
                    </div>
                </div>
            </div>
        </div>
    );
}
