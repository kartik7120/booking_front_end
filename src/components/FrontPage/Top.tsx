import Carousel, { CarouselProps } from "../Carousel";
import CarouselLayover, { CarouselLayoverProps } from "./CarouselLayover";

export interface TopProps extends CarouselLayoverProps, CarouselProps {

}

export default function Top(props: TopProps) {
  return (
    <div className="relative">
      {/* Carousel */}
      <div>
        <Carousel
          imageURLs={props.imageURLs} 
          shouldAutoScroll={props.shouldAutoScroll} 
          scrollInterval={props.scrollInterval} 
        />
      </div>

      {/* CarouselLayover */}
      <div className="absolute bottom-0 left-0 w-full z-10 bg-opacity-75 text-white">
        <CarouselLayover 
          director={props.director} 
          duration={props.duration}
          genreTags={props.genreTags} 
          rating={props.rating}
          releaseYear={props.releaseYear} 
          stars={props.stars}
          summary={props.summary} 
          title={props.title} 
        />
      </div>
    </div>
  )
}
