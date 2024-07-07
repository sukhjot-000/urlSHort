import React , { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make Axios call to fetch data
    // let response= axios.post('http://localhost:3000/api/v1/user/getUrls',{
    //   token:window.localStorage.getItem("token")
    // });
    // setData(response.urls)
    axios.post('http://localhost:3000/api/v1/user/getUrls',{
        token:window.localStorage.getItem("token")
      })
      .then(response => {
        // console.log(response.data.urls)
        setData(response.data.urls); // Assuming the response data is an array of objects
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US');

  return (
    <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Original Url</th>
          <th scope='col'>Short Url</th>
          <th scope='col'>Created at</th>
          <th scope='col'>Created By</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((item, index) => (
          <tr key={index}>
            <th scope='row'>{index + 1}</th>
            <td>{item.originalUrl}</td>
            <td>{"http://localhost:3000/api/v1/getUrl/"+item.shortUrl}</td>
            <td>{formatDate(item.createdAt)}</td>
            <td>{item.createdby.email}</td>
          </tr>
        ))}

      </MDBTableBody>
    </MDBTable>
  );
}