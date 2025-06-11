
function Video({ video }) {
  console.log(video.key);
  console.log(video.key);
  return (
   <div className="aspect-video">
      <iframe
        className="w-[560px] h-[315px]"
        src={`https://www.youtube.com/embed/${video.key}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Video;