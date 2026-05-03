const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-dark">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-navy-light border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
