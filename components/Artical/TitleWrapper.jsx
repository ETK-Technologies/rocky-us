const TitleWrapper = ({title , loading = false}) =>  {
    return ( <>
    {loading ? (<h1 className="text:2xl lg:text-4xl mt-4 font-bold h-16 bg:grey-600"></h1>) : ( <h1 className="text-4xl lg:text-6xl mt-5 font-bold">
            {title}
        </h1>) }
       
    </>
    )
}

export default TitleWrapper;