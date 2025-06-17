import { IoIosStar } from "react-icons/io";

const Rating = ({no_of_stars = 5}) => {
    return (<>
        <div className="flex">
            <IoIosStar className="text-[#AE7E56]" />
            <IoIosStar className="text-[#AE7E56]" />
            <IoIosStar className="text-[#AE7E56]" />
            <IoIosStar className="text-[#AE7E56]" />
            <IoIosStar className="text-[#AE7E56]" />
        </div>
    </>)
}

export default Rating;