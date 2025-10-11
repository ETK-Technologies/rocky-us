import React from "react";

export const PhotoIdUpload = ({
  photoIdFile,
  fileInputRef,
  handleTapToUpload,
  handlePhotoIdFileSelect,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  verifyCustomerAndProceed,
  isUploading,
}) => {
  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-3xl text-center text-[#AE7E56] font-bold mb-6">
        Verify your Identity
      </h1>
      <h3 className="text-lg text-center font-medium mb-1">
        Take a picture holding your ID.
      </h3>
      <h3 className="text-lg text-center font-medium mb-8">
        Your face and ID must be clearly visible
      </h3>

      <div className="flex flex-col items-center justify-center mb-6">
        <input
          type="file"
          ref={fileInputRef}
          id="photo-id-file"
          accept="image/jpeg,image/jpg,image/png,image/heif,image/heic"
          className="hidden"
          onChange={handlePhotoIdFileSelect}
        />

        <div
          onClick={handleTapToUpload}
          className="w-full md:w-[80%] max-w-lg h-40 flex items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 mb-6 mx-auto"
        >
          {!photoIdFile ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 border-2 border-[#C19A6B] rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="w-10 h-10 text-[#C19A6B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <span className="text-[#C19A6B] text-lg">
                Tap to upload the ID photo
              </span>
            </div>
          ) : (
            <img
              id="photo-id-preview"
              src={photoIdFile ? URL.createObjectURL(photoIdFile) : null}
              alt="ID Preview"
              className="max-w-full max-h-36 object-contain"
            />
          )}
        </div>

        {photoIdFile && (
          <div className="mb-6 mt-4 w-full max-w-md mx-auto">
            <div className="mb-4">
              <label
                htmlFor="legal_first_name"
                className="block text-sm font-medium text-gray-700 mb-1 text-left"
              >
                First Name (as per ID)
              </label>
              <input
                type="text"
                id="legal_first_name"
                name="legal_first_name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7885A]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="legal_last_name"
                className="block text-sm font-medium text-gray-700 mb-1 text-left"
              >
                Last Name (as per ID)
              </label>
              <input
                type="text"
                id="legal_last_name"
                name="legal_last_name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7885A]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <p className="text-center text-xs text-gray-500 mb-4">
              Photo selected: {photoIdFile.name}
            </p>
          </div>
        )}

        {!photoIdFile && (
          <div className="w-full max-w-md mx-auto">
            <p className="text-center text-md font-medium mb-2">
              Please capture a selfie of yourself holding your ID
            </p>{" "}
            <p className="text-center text-sm text-gray-500 mb-8">
              Only JPG, JPEG, PNG, HEIF, and HEIC images are supported.
              <br />
              Max allowed file size per image is 20MB
            </p>
          </div>
        )}
      </div>

      {photoIdFile && firstName && lastName && (
        <div className="text-center mt-4">
          <button
            onClick={verifyCustomerAndProceed}
            className="bg-[#000000] text-white w-full max-w-md py-4 px-4 rounded-full font-medium text-lg"
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload and Verify"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
