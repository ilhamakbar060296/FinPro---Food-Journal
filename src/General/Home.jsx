import Axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Heart from "react-heart";
import Rating from "react-rating-stars-component";

import './Home.css';

function Home() {    
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState();
  const addClose = () => setAdd(false);
  const showComment = (id) => setAdd(id);

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

  const likeHandle = (id, state) => {
    console.log("Item id : "+id); 
    if(state === false){
      Axios(`${process.env.REACT_APP_BASEURL}/api/v1/like`,{
        method: 'post',
        data: {
          foodId : id,
        },
        headers : {
          Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
      .then(response => {
        console.log("Menjadi Suka");
        getData();
      })
    }else{
      Axios(`${process.env.REACT_APP_BASEURL}/api/v1/unlike`,{
        method: 'post',
        data: {
          foodId : id,
        },
        headers : {
          Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
      .then(response => {
        console.log("Menjadi Tidak Suka");
        getData();
      })
    }
  }

  const ratingChanged = (id) => {
    console.log("I rate this food : "+rate);
    console.log("This Food ID : "+id);  
    console.log("My Comment : "+comment);  
    Axios(`${process.env.REACT_APP_BASEURL}/api/v1/rate-food/${id}`,{
        method: 'post',
        data: {
          rating : rate,
          review : comment,
        },
        headers : {
          Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
      .then(response => {
        addClose(false);
        getData();
      })
  }

  const commentHandler = (id) => {
    console.log("This Food ID : "+id);
    showComment(id);
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
          <Row><h1>Welcome to Food Journal</h1></Row><br></br>
          <Col style={{display : "flex", flexWrap: "wrap"}}>
          {data.map((item, index) => {
            return <Row>
                  <Card style={{ width: '18rem', marginLeft : "60px", marginRight : "35px", marginBottom : "35px"}}>
                    <Card.Img variant="top" src={item.imageUrl} style={{marginTop : "5px"}}/>
                    <Card.Body>
                      <Card.Title><b>{item.name}</b></Card.Title>
                      <Card.Text>{item.description}</Card.Text>                                          
                    </Card.Body>
                    <Card.Footer>
                      <div style={{display : "flex", justifyContent : "space-around"}}>
                        <div style={{display : "flex" }}>
                          <div style={{ width: "2rem"}}>
                            <Heart isActive={item.isLike} onClick={() => likeHandle(item.id, item.isLike)}/>                          
                          </div>                          
                          <div>{item.totalLikes}</div>
                        </div>                        
                        <div style={{display : "flex" }}>
                          <div>
                            <Rating count={5} size={24} isHalf={true} activeColor="#ffd700" value={item.rating}></Rating>
                          </div>                         
                          <div>{item.rating}</div> 
                        </div>                        
                      </div> 
                      <Button size="sm" variant="info" onClick={() => commentHandler(item.id)}>Give Review</Button>
                    </Card.Footer>
                  </Card>         
            </Row>
            })}
          </Col>
        </Col>
        <Col sm={1} style={{backgroundColor : "#d6830e"}}></Col>
      </Row>         
      </Container>
      <Modal show={add} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Review Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Give Review</Form.Label>
              <Form.Control name="komentar" rows="5" value={comment} as="textarea" aria-label="With textarea" onChange={(e) => setComment(e.target.value)} placeholder="Comment Here" />
            </Form.Group> 
            <Form.Label>Give Rating (0-5)</Form.Label>
            <Rating count={5} size={24} isHalf={true} activeColor="#ffd700" onChange={(e) => setRate(e)}></Rating>                  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => ratingChanged(add)}>
            Review
          </Button>
        </Modal.Footer>
      </Modal>      
    </>
  );
}

export default Home;
