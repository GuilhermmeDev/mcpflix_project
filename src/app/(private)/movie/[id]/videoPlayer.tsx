export default function VideoPlayer({ embedUrl }: { embedUrl: string }) {
  // embedUrl = https://drive.google.com/file/d/movie_id/preview | in google drive
  // embedUrl = https://mega.nz/embed/yyAQXB6J#H0t9v08s16BElWnsNKc9owQbGE9E7uoAaRoMhlgfLH0 | in mega
  console.log(embedUrl)
  return (
    <>
      <div className="video-player">
        <iframe
          src={embedUrl}
          width={"100%"}
          height={480}
          allow="autoplay; encrypted-media; fullscreen"
          title="movie"
        ></iframe>
      </div>
    </>
  );
}
