export default function VideoPlayer() {
  const embedUrl = ""; // https://drive.google.com/file/d/FILE_ID/preview
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
