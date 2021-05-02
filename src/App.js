import "./App.css";
import Tesseract from "tesseract.js";
import ImageWrapper from "./components/ImageWrapper";
import TextWrapper from "./components/TextWrapper";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState(null);

  const convertImageToText = async () => {
    setLoading(true);

    const result = await Tesseract.recognize(imageUrl, "eng");

    setText(result.data.text);

    setLoading(false);
  };

  const uploadFile = async (e) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      "https://api.imgbb.com/1/upload?expiration=600&key=975bfe07db5d3303d4436b4d2094a490",
      formData,
      config
    );

    setImageUrl(res.data.data.url);
    setLoading(false);
  };

  useEffect(() => {
    if (imageUrl != null) {
      convertImageToText();
    }
  }, [imageUrl]);

  const backHandler = () => {
    setText(null);
    setImageUrl(null);
  }

  return (
    <div className="App">
      <div className="logo">Convert.ME</div>
      <div className="sub-logo">The Tool You Need</div>
      <div className="container">
        {loading && <div className="loader"></div>}
        {text == null ? (
          <ImageWrapper loading = {loading} uploadFile={uploadFile} />
        ) : (
          <TextWrapper text = {text}/>
        )}
      </div>
      {text && <button className = 'go-back' onClick = {backHandler}>Go Back</button>}

    </div>
  );
}

export default App;
