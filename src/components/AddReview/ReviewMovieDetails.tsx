export interface ReviewMovieDetailsProps {
  movieTitle?: string;
  moviePosterUrl?: string;
  movieReleaseDate?: string;
  movieTitlePosterURL?: string;
  movieRating?: number;
  userRating?: number;
}

export default function ReviewMovieDetails({
  movieTitle,
  moviePosterUrl,
  movieReleaseDate,
  movieTitlePosterURL,
  movieRating,
  userRating,
}: ReviewMovieDetailsProps) {
  return (
    <div className="max-w-5xl mx-auto rounded-2xl border border-default bg-neutral-primary-soft shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-6 p-6">

        {/* Poster */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <img
            src={moviePosterUrl}
            alt={movieTitle}
            className="h-[225px] w-[150px] rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-3">

          {/* Movie Title / Logo */}
          {movieTitlePosterURL ? (
            <img
              src={movieTitlePosterURL}
              alt={movieTitle}
              className="h-[80px] max-w-[260px] object-contain"
            />
          ) : (
            movieTitle && (
              <h1 className="text-3xl font-bold text-heading">
                {movieTitle}
              </h1>
            )
          )}

          {/* Release Date */}
          {movieReleaseDate && (
            <p className="text-sm text-text-muted">
              Release date:{" "}
              <span className="font-medium text-heading">
                {movieReleaseDate}
              </span>
            </p>
          )}

          {/* Ratings */}
          <div className="flex flex-wrap items-center gap-4 pt-2">

            {/* Average Rating */}
            {movieRating !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-400">
                ★ {movieRating.toFixed(1)} / 5
              </span>
            )}

            {/* User Rating */}
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
              {userRating
                ? `Your rating: ${userRating}/5`
                : "You haven’t rated yet"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
