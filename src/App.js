import Axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';

function App() {    
  const [data, setData] = useState([]); 
  const getData = () => {
    Axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/foods`,{
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      }
    })
    .then(response => {
      console.log(response);
      setData(response.data.data)      
    })
  }
  
  // const getURL = (path) => {
  //   const url =  `${process.env.REACT_APP_BASEIMGURL}`+path;
  //   return url;
  // }

  // const logOut = () => {
  //   localStorage.clear();
  //   return window.location.assign('/');    
  // }

  useEffect(() => {
    getData()
  }, []);

  return (    
    <> 
    {/* <br/>
    <button onClick={() => logOut()}>Logout</button> 
    <h1>FORM PRODUCT TABLE</h1>       */}
    <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img  src={item.imageUrl} alt={item.name}></img>  
              </td>
              <td>{item.rating}</td>
              <td>{item.description}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </>
  );
}

export default App;
