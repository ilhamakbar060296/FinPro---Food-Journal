import Axios from 'axios';
import { useEffect, useState } from 'react';
// import { useForm, useFieldArray, Controller} from "react-hook-form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import uuid from 'react-native-uuid';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './App.css';

function App() {    
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  // const [rating, setRating] = useState('');
  console.log(ingredients);
  const addClose = () => setAdd(false);
  const addRecipe = () => setAdd(true); 

  // const { register, control, handleSubmit, reset, watch } = useForm({
  //   defaultValues: {
  //     test: [{ ingredients: "" }]
  //   }
  // });

  // const { insertIngeridients } = useFieldArray(
  //   {
  //     control,
  //     name : "ingredients"
  //   }
  // );

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

const ingredientChange = (e, i) => {
    const {value} = e.target
    const ingredientList = [...ingredients];
    ingredientList[i] = value;
    setIngredients(ingredientList);
 }
    
 const addIngredient = () => {
  setIngredients([...ingredients, ''])
 }

 const removeIngredient = (i) => {
    const newFormValues = [...ingredients];
    newFormValues.splice(i, 1);
    setIngredients(newFormValues);
}

  const handleAdd = (e) => {
    e.preventDefault()
    console.log(name);
    console.log(desc);
    console.log(image);
    console.log(ingredients);
    Axios(`${process.env.REACT_APP_BASEURL}/api/v1/create-food`,{
      method: 'post',
      data: {      
        name: name,
        description: desc,
        imageUrl: image,
        ingredients: [...ingredients],              
      }, 
      headers : {  
        Authorization: 'Bearer ' + localStorage.getItem('jwt') ,        
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      }
    }).then(response => {
      setName('');
      setDesc('');
      setImage('');
      setIngredients(['']);
      getData();
      addClose(false)
    }).catch(error => {
      console.log("Input ingredient harus dalam bentuk array ex : 'Ayam, Tepung, Bawang' ");
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
    <Container fluid>
      <Row><h1>Table of Recipe</h1></Row>      
      <Row>
        <Col sm={1}></Col>
        <Col sm={10} style={{display : "flex" ,justifyContent : "center", alignItems : "center"}}>
          <Button size="xl" variant="success" onClick={() => addRecipe()}>+ Add Recipe</Button>
        </Col> 
        <Col sm={1}></Col>       
      </Row>      
      {data.map((item, index) => {
        return <Row key={index}>
        <Col sm={1} style={{backgroundColor : "#d6830e"}}></Col>
        <Col sm={1} style={{border : "1px solid black", textAlign : "center"}}>{index + 1}</Col> 
        <Col sm={3} style={{border : "1px solid black"}}>
        <img  src={item.imageUrl} alt={item.name}></img>
        </Col> 
        <Col sm={6} style={{border : "1px solid black"}}>
          <Row style={{borderBottom : "1px solid black"}}>{item.id}</Row>
          <Row style={{borderBottom : "1px solid black"}}>{item.name}</Row>
          <Row style={{borderBottom : "1px solid black"}}>{item.description}</Row>
          <Row style={{borderBottom : "1px solid black"}}>{item.rating}</Row>
          <Row>
            <ButtonGroup aria-label="Action">
              <Button size="sm" variant="primary" >Edit</Button>
              <Button size="sm" variant="danger" >Delete</Button>
            </ButtonGroup>
          </Row>          
        </Col>
        <Col sm={1} style={{backgroundColor : "#d6830e"}}></Col>
          </Row>
      })}            
      </Container>
      <Modal show={add} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter name" required/>              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={image} name="image" type="text" onChange={(e) => setImage(e.target.value)} placeholder="Place Image URL" required/>              
            </Form.Group>            
            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>          
              <Form.Control rows="5" value={desc} name="desc" as="textarea" aria-label="With textarea" onChange={(e) => setDesc(e.target.value)} placeholder="Write Product Description Here" required/>              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIngredient">
              <Form.Label>Ingredient</Form.Label>
              {ingredients.map((element, index) => (
                <div key={index}>
                  <div>
                    <Form.Control name="ingredients" value={element.ingredients} type="text" placeholder="Enter Ingredient" 
                    onChange = {(e) => ingredientChange(e, index)} required/>                     
                    {ingredients.length - 1 === index && ingredients.length < 4 && (
                      <Button variant='success' onClick={addIngredient}>
                      + Add Ingredient
                      </Button>                      
                    )}
                  </div>
                  <div>
                  {ingredients.length > 1 && (
                    <Button variant='danger' onClick={() => removeIngredient(index)}>
                    - Remove
                    </Button>
                  )}
                  </div>                
                </div>                              
              ))}              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
