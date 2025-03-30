import Carousel, { CarouselProps } from "../Carousel";
import { CarouselLayoverProps } from "./CarouselLayover";

export interface TopProps extends CarouselLayoverProps, CarouselProps {

}

export default function Top(props: TopProps) {
  return (
    <div>
      <Carousel
        imageURLs={props.imageURLs}
        shouldAutoScroll={props.shouldAutoScroll}
        scrollInterval={props.scrollInterval}
        CarouselLayoverProps={[
          {
            title: "Inception",
            genreTags: ["Action", "Drama", "Sci-fi"],
            rating: 4,
            director: "Chris Nolan",
            stars: ["abc", "def", "try"],
            summary: props.summary,
            releaseYear: props.releaseYear,
            duration: props.duration // in milliseconds
          },
          {
            title: "Intersteller",
            genreTags: ["Action", "Drama", "Sci-fi"],
            rating: 5,
            director: "Chris Nolan",
            stars: ["abc", "def", "try"],
            summary: props.summary,
            releaseYear: props.releaseYear,
            duration: props.duration // in milliseconds
          },
          {
            title: "The Batman",
            genreTags: ["Action", "Drama", "Sci-fi"],
            rating: 2,
            director: "Chris Nolan",
            stars: ["abc", "def", "try"],
            summary: props.summary,
            releaseYear: props.releaseYear,
            duration: props.duration // in milliseconds
          }
        ]}
      />
    </div>
  )
}
