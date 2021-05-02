import React from "react";

function ImageWrapper({ loading, uploadFile }) {
  return (
    <div className="image-wrapper">
      {loading ? (
        <h3>Processing file..... please wait</h3>
      ) : (
        <form>
          <input
            type="file"
            className="custom-file-input"
            name="image"
            onChange={(e) => uploadFile(e)}
          />
        </form>
      )}
    </div>
  );
}

export default ImageWrapper;
