import { useEffect, useState } from "react";

export interface CarouselProps {
    imageURLs: string[],
    shouldAutoScroll: boolean,
    scrollInterval: number // should be in milliseconds
}

export default function Carousel({ imageURLs, shouldAutoScroll, scrollInterval }: CarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (shouldAutoScroll) {
            let intervalID;
            intervalID = setInterval(() => {
                setCurrentSlide(prevSlide => (prevSlide + 1) % imageURLs.length);
            }, scrollInterval || 3000);
            return () => {
                if (intervalID) clearInterval(intervalID);
            };
        }

        // Cleanup the interval on unmount
    }, [shouldAutoScroll, scrollInterval, imageURLs.length]);

    const goToNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % imageURLs.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + imageURLs.length) % imageURLs.length);
    };

    return (
        <div className="carousel w-full">
            {imageURLs.map((url, idx) => (
                <div
                    key={idx}
                    className={`carousel-item w-full ${idx === currentSlide ? 'active' : 'hidden'}`}
                >
                    <img src={url} className="w-full" alt={`Slide ${idx + 1}`} />
                </div>
            ))}
            <div className="controls absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button onClick={goToPrevSlide} className="btn btn-circle">❮</button>
                <button onClick={goToNextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>
    );
}