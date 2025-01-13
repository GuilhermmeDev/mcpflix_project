export default function VideoPlayer() {
  const embedUrl = "";
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
