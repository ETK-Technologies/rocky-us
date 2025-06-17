const CenterContainer = ({ children, loading = false }) => {
  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center content-center">
            <div className="w-[450px] rounded h-[100px] bg-gray-50 animate-pulse"></div>
          </div>
        </>
      ) : (
        <div className="text-center mb-4">{children}</div>
      )}
    </>
  );
};

export default CenterContainer;
