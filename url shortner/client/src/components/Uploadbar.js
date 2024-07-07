import React, { useState } from "react";
import axios from "axios";
function Uploadbar() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const changeurl = (e) => {
    setUrl(e.target.value);
    return 1;
  };

  const submitURL = async () => {
    try {
      let response=""
      if(window.localStorage.getItem("token")){
         response = await axios.post(
          "http://localhost:3000/api/v1/urlSubmit/submit",
          { 
            originalUrl: url,
            token:window.localStorage.getItem("token")
          } // Wrapping the originalUrl in a "body" property
        ); 
      }
      else{
         response = await axios.post(
          "http://localhost:3000/api/v1/urlSubmit/submit",
          { 
            originalUrl: url,
          } // Wrapping the originalUrl in a "body" property
        ); 
      }

      console.log(response.data);
      setShortUrl(
        "http://localhost:3000/api/v1/getUrl/" + response.data.shortUrl
      );
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <>
      {/* <div className='Uploadbar'>
      <input type='textbox' value={url} onChange={changeurl}></input>
      <button onClick={submitURL}>upload</button>
      <input type='textbox' value={shortUrl} ></input>
      </div> */}
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Shorten Link</h1>
          <form className="space-y-3">
            <div className="form-group">
              <label
                className="text-gray-800 font-weight-bold mb-2"
                htmlFor="link"
              >
                Original Link
              </label>
              <input
                type="text"
                id="link"
                className="form-control"
                placeholder="Enter the link you want to shorten"
                value={url}
                onChange={changeurl}
              />
            </div>
            <button
              type="button"
              className="btn btn-dark w-100 rounded-pill text-xl font-medium"
              onClick={submitURL}
            >
              Shorten Link
            </button>
            <div className="form-group">
              <label
                className="text-gray-800 font-weight-bold mb-2"
                htmlFor="shortenedLink"
              >
                Shortened Link
              </label>
              <input
                type="text"
                id="shortenedLink"
                className="form-control"
                placeholder="Shortened link"
                value={shortUrl}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Uploadbar;
