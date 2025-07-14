export default function VideoPlayer({ embedUrl }: { embedUrl: string }) {
  // embedUrl = https://drive.google.com/file/d/movie_id/preview | in google drive
  // embedUrl = https://mega.nz/embed/ | in mega
  return (
    <div className="video-player">
      <iframe
        allow="autoplay; encrypted-media; fullscreen"
        height={480}
        src={embedUrl}
        title="movie"
        width={'100%'}
      />
    </div>
  );
}
