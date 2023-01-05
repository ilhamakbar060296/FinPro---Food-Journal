import Axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './Home.css';

function User() {    
  const [data, setData] = useState([]);
  const [adminId, setAdminId] = useState();
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminFoto, setAdminFoto] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [edit, setEdit] = useState(false);
  const [editName, editAdminName] = useState('');
  const [editEmail, editAdminEmail] = useState('');
  const [editFoto, editAdminFoto] = useState('');
  const [editPhone, editAdminPhone] = useState('');
  const editClose = () => setEdit(false);   
  const radios = [
    { name: 'Admin', value: 'admin' },
    { name: 'General', value: 'general' },    
  ];

  const getData = () => {
    Axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/all-user`,{
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

  const getAdminData = () => {
    Axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/user`,{
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      }
    })
    .then(response => {
      console.log(response);          
      setAdminId(response.data.user.id)      
      setAdminName(response.data.user.name)
      setAdminEmail(response.data.user.email)
      setAdminFoto(response.data.user.profilePictureUrl)
      setAdminPhone(response.data.user.phoneNumber)
    })
  }

  const getProfile = () => {
    Axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/user`,{
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      }
    })
    .then(response => {
      console.log(response);                     
      editAdminName(response.data.user.name)
      editAdminEmail(response.data.user.email)
      editAdminFoto(response.data.user.profilePictureUrl)
      editAdminPhone(response.data.user.phoneNumber)
      setEdit(true)
    })
  }

  const updateProfile = () => { 
    console.log("Admin Name : "+editName);       
    Axios(`${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,{
      method: 'post',
      data: {
        name : editName,
        profilePictureUrl : editFoto,
        email : editEmail,
        phoneNumber : editPhone,
      },
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      }
    })
    .then(response => {
      editAdminName(''); 
      editAdminFoto('');
      editAdminEmail('');
      editAdminPhone('');
      getData();      
      getAdminData();  
      editClose(false)    
    })         
  }

  const updateRole = (id, v) => {    
    if(v === "admin"){
      Axios(`${process.env.REACT_APP_BASEURL}/api/v1/update-user-role/${id}`,{
        method: 'post',
        data: {
          role: "general",
        },
        headers : {
          Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
      .then(response => {        
        getData();
        getAdminData();      
      })
    }else{
      Axios(`${process.env.REACT_APP_BASEURL}/api/v1/update-user-role/${id}`,{
        method: 'post',
        data: {
          role: "admin",
        },
        headers : {
          Authorization: 'Bearer ' + localStorage.getItem('jwt') ,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
      .then(response => {
        getData();
      })
    } 
  }

  useEffect(() => {
    getData()
    getAdminData()
  }, []);

  return (    
    <> 
    <Container fluid>
      <Row>
        <Col sm={1} style={{backgroundColor : "#d6830e"}}></Col>  
        <Col>
          <Row><h1>Table of User</h1></Row>
          <Row><h2>Admin</h2></Row>
          <Table responsive bordered hover className='table-Recipe'>
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody> 
              <tr>
                <td>1</td>
                <td>{adminId}</td>
                <td><img src={adminFoto} alt={adminName}></img></td>
                <td>{adminName}</td> 
                <td>{adminEmail}</td>
                <td>{adminPhone}</td>               
                <td>
                  <Button size="sm" variant="primary" onClick={() => getProfile()}>Edit</Button>
                </td>               
              </tr>           
            </tbody>
          </Table>
          <br />  
          <Row><h2>All User</h2></Row> 
          <Table responsive bordered hover className='table-Recipe'>
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody> 
            {data.map((item, index) => {
              return <tr>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td><img src={item.profilePictureUrl} alt={item.name}></img></td>
                <td>{item.name}</td> 
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  <ButtonGroup>
                  {radios.map((radio, idx) => (                  
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}-${index}`}
                      type="radio"
                      variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                      name={`radio-${index}`}
                      value={radio.value}
                      checked={item.role === radio.value}
                      onChange={() => updateRole(item.id, item.role)}
                    >                                     
                      {radio.value}
                    </ToggleButton>
                  ))}                
                </ButtonGroup>
                </td>
            </tr>
            })}           
            </tbody>
          </Table>                  
        </Col>        
        <Col sm={1} style={{backgroundColor : "#d6830e"}}></Col>  
      </Row>                   
      </Container>
      <Modal show={edit} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={adminName} type="text" onChange={(e) => editAdminName(e.target.value)} placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={adminFoto} name="image" type="text" onChange={(e) => editAdminFoto(e.target.value)} placeholder="Place Image URL" />
            </Form.Group>                        
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Email</Form.Label>
              <Form.Control value={adminEmail} name="email" type="text" onChange={(e) => editAdminEmail(e.target.value)} placeholder="Place Image URL" />
            </Form.Group> 
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>HP</Form.Label>
              <Form.Control value={adminPhone} name="phone" type="text" onChange={(e) => editAdminPhone(e.target.value)} placeholder="Place Image URL" />
            </Form.Group> 
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateProfile()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>            
    </>
  );
}

export default User;
