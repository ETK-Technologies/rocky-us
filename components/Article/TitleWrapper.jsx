const TitleWrapper = ({title , loading = false}) =>  {
    const decodeHtmlEntities = (text) => {
        if (typeof text !== 'string') return text;
        let decoded = text
            .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#39;|&apos;/g, "'");
        return decoded;
    };

    const sanitizeTitle = (rawTitle) => {
        if (typeof rawTitle !== 'string') return rawTitle;
        let text = decodeHtmlEntities(rawTitle).trim();
        // Remove leading numbers and common separators (e.g., "123 - ", "01:", "(02) ")
        text = text.replace(/^\s*\(?\d+\)?\s*[:.\-–—]?\s+/, '');
        // Remove trailing numeric suffixes like " - 01", "— 2", or "(3)"
        text = text.replace(/\s*(?:[\-–—:]\s*\d+|\(\s*\d+\s*\))\s*$/, '');
        return text.trim();
    };

    const displayedTitle = sanitizeTitle(title);

    return ( <>
    {loading ? (<h1 className="mb-3 text:2xl lg:text-3xl mt-4 font-semibold h-16 bg:grey-600"></h1>) : ( <h1 className="text-[25px] sm:text-2xl lg:text-4xl xl:text-6xl mt-5 font-semibold">
            {displayedTitle}
        </h1>) }
       
    </>
    )
}

export default TitleWrapper;