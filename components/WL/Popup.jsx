import Image from "next/image";
import CustomImage from "../utils/CustomImage";

const Popup = () => {
  return (
    <div className="bg-white rounded-2xl p-3 w-[297px]">
      <div className="flex">
        <div className="w-[91px] h-[91px] rounded-2xl bg-gray-200 p-2 mr-3">
          <CustomImage height="50" quality="100" width="50" alt="person" className="object-fill" src="/WL/person.webp" />
        </div>
        <div>
          <p className="font-[20px]">
            Lose up to <b>22.5%</b> your body weight
          </p>
          <p className="bg-gray-200  px-4 rounded-xl mt-4">
            <b>MyRocky</b> Clinician
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
