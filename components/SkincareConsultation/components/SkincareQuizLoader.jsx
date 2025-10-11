import { DotsLoader } from "react-loaders-kit";

const SkincareQuizLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        <DotsLoader size={50} loading={true} color={"#AE7E56"} />
        <p className="mt-4 text-gray-600 font-medium">Loading your consultation...</p>
      </div>
    </div>
  );
};

export default SkincareQuizLoader;