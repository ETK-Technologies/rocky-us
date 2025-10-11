const FlowCallBack = ({className, LoadingText}) => {
  return (
    <>
      <div className={`${className} flex flex-col min-h-screen`}>
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">{LoadingText}</p>
        </div>
      </div>
    </>
  );
};

export default FlowCallBack;
