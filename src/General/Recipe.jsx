import Axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import './Home.css';

function Recipe() {    
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

  useEffect(() => {
    getData()
  }, []);

  return (    
    <> 
    <Container fluid>
      <Row>
        <Col sm={1} style={{backgroundColor : "#d6830e"}}></Col>
        <Col>
          <Row><h1>Table of Recipe</h1></Row><br />
          <Table responsive bordered hover className='table-Recipe'>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th colSpan={3}>Detail</th>                
              </tr>
            </thead>
            <tbody>
            {data.map((item, index) => {
              return <tr>
                <td>{index + 1}</td>
                <td><img  src={item.imageUrl} alt={item.name}></img></td>
                <td style={{textAlign : "left"}}>
                  <tr>
                    <td>Name</td>
                    <td>: </td>
                    <td>{item.name}</td>
                  </tr> 
                  <tr>
                    <td>Description</td>
                    <td>: </td>
                    <td>{item.description}</td>
                  </tr>
                  <tr>
                    <td>Ingredient</td>
                    <td>: </td> 
                    <td>
                      {item.ingredients.map((e) => {
                        return <tr>
                          - {e}
                        </tr>
                      })} 
                    </td>                                    
                  </tr>                  
                  <tr>
                    <td>Rating</td>
                    <td>: </td>
                    <td>{item.rating}</td>
                  </tr>
                  <tr>
                    <td>Total Likes</td>
                    <td>: </td>
                    <td>{item.totalLikes}</td>
                  </tr>
                </td>                              
              </tr>             
             })}
            </tbody>
          </Table>         
        </Col>
        <Col sm={1} style={{backgroundColor : "#d6830e"}}></Col>      
      </Row>                            
      </Container>      
    </>
  );
}

export default Recipe;
