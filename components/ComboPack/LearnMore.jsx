import MiniProductCard from "./MiniProductCard";

const LearnMore = ({products}) => {
    return (<>
        <h2 className="text-4xl text-center mb-10 font-bold">
            Learn More About Each Section
        </h2>
        <div className="flex flex-wrap justify-center items-center ">
            {products.map((product, index) => (
                <MiniProductCard key={index} product={product}></MiniProductCard>
            ))}
        </div>
    </>)
}

export default LearnMore;