const HtmlContent = ({html, className, loading = false}) => {
    return (<>
         <div className={className}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
    </>);
}

export default HtmlContent;