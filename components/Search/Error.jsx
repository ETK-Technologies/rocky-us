const Error = ({error, action, actionBtnText}) => {
  return (
    <div className="container mx-auto px-4 py-20">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={action}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {actionBtnText || "Retry"}
          </button>
        </div>
      </div>
  );
}

export default Error;