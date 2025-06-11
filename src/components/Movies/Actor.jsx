function Actor({ img, name, role }) {
  const imageUrl = img 
    ? `https://image.tmdb.org/t/p/w185${img}` 
    : '/placeholder-avatar.png';

  return (
    <div className="flex flex-col items-center text-center w-full">
      {/* Profile Image */}
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-300 flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-avatar.png';
          }}
        />
      </div>
      
      {/* Actor Name */}
      <h3 className="font-primary font-semibold text-sm text-white mb-1 leading-tight">
        {name}
      </h3>
      
      {/* Character Role */}
      <p className="font-primary text-xs text-gray-400 leading-tight">
        {role}
      </p>
    </div>
  );
}

export default Actor;