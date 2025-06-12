function Video({ video }) {
  return (
    <div className="aspect-video">
      <iframe
        className="w-[560px] h-[315px]"
        src={`https://www.youtube.com/embed/${video.key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;