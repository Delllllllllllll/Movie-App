import Actor from "./Actor";
import { useCasts } from "../../hooks/useMovies";
import { useParams, useLocation } from "react-router-dom";

function Casts() {
  const { id } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.includes('tv') ? 'tv' : 'movie';

  const { casts, error } = useCasts(mediaType, id);

  return (
    <div className="max-w-[1200px] w-full px-4">
      <div className="mb-5">
        <h2 className="font-primary text-3xl text-left">Full Casts</h2>
      </div>
      <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-start mx-auto gap-5 pb-4">
          {casts &&
            casts.map((cast) => (
              <div className="flex-shrink-0 w-30">
                <Actor img={cast.profile_path} name={cast.name} role={cast.character} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Casts;
