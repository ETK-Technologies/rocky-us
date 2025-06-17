import CustomImage from "../../utils/CustomImage";

const LossItem = ({img, title, description, iconClassName = 'w-[24px] h-[24px]'}) => {
    return (<>
        <div className="flex p-5 gap-4 border-solid border-[1px] mb-2 rounded-2xl border-gray-200 ">
            <div>
                <CustomImage className={iconClassName} src={img} width="250" height="250"></CustomImage>
            </div>
            <div>
                <h1 className="font-[POPPINS] font-medium text-[16px] text-black">{title}</h1>
                {
                    description && (<p>{description}</p>)
                }
                
            </div>
        </div>
    </>);
}

export default LossItem;