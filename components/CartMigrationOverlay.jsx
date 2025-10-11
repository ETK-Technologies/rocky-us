import { DotsLoader } from "react-loaders-kit";

const CartMigrationOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center z-[9999]">
      <div className="absolute backdrop-blur-[1px] flex flex-col items-center justify-center left-0 right-0 top-0 bottom-0 z-50">
        <DotsLoader size={50} loading={true} color={"#fff"} />
        <p className="text-white text-lg mt-6 font-medium">
          Getting your cart items ready...
        </p>
      </div>
    </div>
  );
};

export default CartMigrationOverlay;
