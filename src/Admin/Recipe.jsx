import Axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './Home.css';

function Recipe() {    
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(['']);
  const addClose = () => setAdd(false);
  const addRecipe = () => setAdd(true); 

  const [edit, setEdit] = useState(false);
  const [nameEdit, editName] = useState('');
  const [descEdit, editDesc] = useState('');
  const [imageEdit, editImage] = useState(null);
  const [ingredientsEdit, editIngredients] = useState(['']);
  const editClose = () => setEdit(false);
  const editRecipe = (id) => setEdit(id);

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

  const getIdData = (id) =>{
    let item = data.find(x => x.id === id);
    editRecipe(id);
    editName(item.name);
    editDesc(item.description);
    editImage(item.imageUrl);
    editIngredients(item.ingredients);
  }

const ingredientChange = (e, i) => {
    const {value} = e.target
    const ingredientList = [...ingredients];
    ingredientList[i] = value;
    setIngredients(ingredientList);
 }

 const ingredientEditChange = (e, i) => {
  const {value} = e.target
  const ingredientList = [...ingredientsEdit];
  ingredientList[i] = value;
  editIngredients(ingredientList);
}
    
 const addIngredient = () => {
  setIngredients([...ingredients, ''])
 }

 const addEditIngredient = () => {
  editIngredients([...ingredientsEdit, ''])
 }

 const removeIngredient = (i) => {
    const newFormValues = [...ingredients];
    newFormValues.splice(i, 1);
    setIngredients(newFormValues);
}

const removeEditIngredient = (i) => {
  const newFormValues = [...ingredientsEdit];
  newFormValues.splice(i, 1);
  editIngredients(newFormValues);
}

  const handleAdd = (e) => {
    e.preventDefault()
    console.log(image);
    const formData = new FormData();        
    formData.append('image', image);
    Axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/upload-image`,formData,{  
      headers : {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),        
      }
    }).then(response => {
      console.log(response);
      console.log("image url : "+response.data.url);
      Axios(`${process.env.REACT_APP_BASEURL}/api/v1/create-food`,{
        method: 'post',
        data: {      
          name: name,
          description: desc,
          imageUrl: response.data.url,
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
    })    
  }

  const handleEdit = (id) => {
    console.log("Food ID : "+id);
    console.log(imageEdit);
    const formData = new FormData();        
    formData.append('image', imageEdit);
    Axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/upload-image`,formData,{  
      headers : {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),        
      }
    }).then(response => {
      console.log(response);
      console.log("image url : "+response.data.url);
      Axios(`${process.env.REACT_APP_BASEURL}/api/v1/update-food/${id}`,{
        method: 'post',
        data: {
          name: nameEdit,
          description: descEdit,
          imageUrl: response.data.url,
          ingredients: [...ingredientsEdit],
        }, 
        headers : {  
          Authorization: 'Bearer ' + localStorage.getItem('jwt') ,        
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
        .then(function (response) {
          editName('');
          editDesc('');
          editImage('');
          editIngredients(['']);
          getData();
          editClose(false)
        });
    })    
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ID ${id}?`)) {
      Axios(`${process.env.REACT_APP_BASEURL}/api/v1/delete-food/${id}`,{
        method: 'delete',        
        headers : {  
          Authorization: 'Bearer ' + localStorage.getItem('jwt') ,        
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
        .then(function (response) {
          getData()
        });
    }
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
          <Row ><Button size="xl" variant="success" onClick={() => addRecipe()}>+ Add Recipe</Button></Row>
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
                <td><img className="recipeImg" src={item.imageUrl} alt={item.name}></img></td>
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
                  <tr>
                    <td colSpan={3}>
                      <ButtonGroup aria-label="Action" size="xl">
                       <Button variant="primary" onClick={() => getIdData(item.id)}>Edit</Button>
                       <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </ButtonGroup>
                    </td>
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
              <Form.Control name="image" type="file" onChange={(e) => setImage(e.target.files[0])} placeholder="Place Image URL" required/>              
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
                  </div>
                  <div>
                  {ingredients.length > 1 && (
                    <Button variant='danger' onClick={() => removeIngredient(index)}>
                    - Remove
                    </Button>
                  )}
                  </div>  
                  <br />
                  {ingredients.length - 1 === index && ingredients.length < 10 && (
                      <Button variant='success' onClick={addIngredient}>
                      +Add Ingredient
                      </Button>                      
                    )}              
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
      <Modal show={edit} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={nameEdit} type="text" onChange={(e) => editName(e.target.value)} placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" type="file" onChange={(e) => editImage(e.target.files[0])} placeholder="Place Image URL" />
            </Form.Group>            
            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>          
              <Form.Control rows="5" value={descEdit} name="desc" as="textarea" aria-label="With textarea" onChange={(e) => editDesc(e.target.value)} placeholder="Write Product Description Here"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIngredient">
              <Form.Label>Ingredient</Form.Label>
              {ingredientsEdit.map((element, index) => (
                <div key={index}>                  
                  <div>
                    <Form.Control name="ingredients" value={ingredientsEdit[index]} type="text" placeholder="Enter Ingredient" 
                    onChange = {(e) => ingredientEditChange(e, index)} required/>                                                             
                  </div>
                  <div>
                  {ingredientsEdit.length > 1 && (
                    <Button variant='danger' onClick={() => removeEditIngredient(index)}>
                    - Remove
                    </Button>
                  )}
                  </div> 
                  <br />
                  {ingredientsEdit.length - 1 === index && ingredientsEdit.length < 10 && (
                      <Button variant='success' onClick={addEditIngredient}>
                      +Add Ingredient
                      </Button>                      
                    )}               
                </div>                              
              ))}              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEdit(edit)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Recipe;
