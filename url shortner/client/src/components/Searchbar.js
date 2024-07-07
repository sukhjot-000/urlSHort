import React, { useState } from 'react'
import axios from 'axios';
function Searchbar() {
    const [url,setUrl]=useState('');
    const changeurl=(e)=>{
      setUrl(e.target.value);
      return 1;
    }
    const submitURL=async ()=>{
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/getUrl/${url}`
        );
        console.log(response.data.originalLink);
        window.location.href = response.data.originalLink;
      } catch (error) {
        console.error(error);
      }

    }
  return (
    <div className='searchbar'>
      <input type='textbox' value={url} onChange={changeurl}></input>
      <button onClick={submitURL}>search</button>
    </div>
  )
}

export default Searchbar
