import Axios from 'axios';  
import './register.css';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register() {
const [error, setError] = useState();
const [submit, setSubmit] = useState();
const [selectedImage, setSelectedImage] = useState(null);

const handleFileSelect = (event) => {  
  setSelectedImage(event.target.files[0]);
}

const formik = useFormik({
  initialValues: {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: 'general',
    profilePictureUrl: '',
    phoneNumber: ''
  },
  validationSchema: Yup.object({
    name: Yup.string()      
      .required('Required'),
    email: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Required'),
    passwordRepeat: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Required'),
    profilePictureUrl: Yup.string(),
    phoneNumber: Yup.string(),
  }),
  enableReinitialze: true,
  onSubmit: values => {
    setSubmit("Loading")
    setError()
    if(values.password !== values.passwordRepeat){
      setSubmit("")
      setError("Mohon Maaf, Pastikan Password yang anda ketik sudah sesuai dengan Repeat Password")
    }else{
      const formData = new FormData();        
      formData.append('image', selectedImage);
      Axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/upload-image`,formData,{  
        headers : {
          apiKey: `${process.env.REACT_APP_APIKEY}`,      
        }
      }).then(response => {
        formik.values.profilePictureUrl = response.data.url;
        Axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/register`, values,{
          headers : {          
            apiKey: `${process.env.REACT_APP_APIKEY}`,
          }
        })
        .then(response => {
          setSubmit("Sukses")
          window.location.assign('/');      
        }).catch(error => {
          setSubmit()
          setError('Invalid Data')
        })
      })
    }               
  },
});

return (
  <>    
    <div className='register-container'>
      <div className='register-rectangle'>
        <div className='register-page'>
        <h1>Register Page</h1><br />              
        <Form onSubmit={formik.handleSubmit}>
        <Row className="grid" style={{margin : "1px"}}>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>nama</Form.Label>
              <Form.Control 
              id="name"
              name="name" 
              type="text" 
              placeholder="Enter nama"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              />
            </Form.Group>
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: 'red' }}>{formik.errors.name}</div>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control 
              id="profilePictureUrl"
              name="profilePictureUrl" 
              type="file" 
              placeholder="Profile Picture"
              onChange={e => {formik.handleChange(e); handleFileSelect(e)}}
              onBlur={formik.handleBlur}
              />
            </Form.Group>
            {formik.touched.profilePictureUrl && formik.errors.profilePictureUrl ? (
              <div style={{ color: 'red' }}>{formik.errors.profilePictureUrl}</div>
            ) : null}   
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              id="phoneNumber"
              name="phoneNumber" 
              type="text" 
              placeholder="Phone Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              />
            </Form.Group>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div style={{ color: 'red' }}>{formik.errors.phoneNumber}</div>
            ) : null}  
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>email</Form.Label>
              <Form.Control 
              id="email"
              name="email" 
              type="text" 
              placeholder="Enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              />
            </Form.Group>
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}          
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              id="password"
              name="password"
              type="password" 
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              />
            </Form.Group>
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control 
              id="passwordRepeat"
              name="passwordRepeat"
              type="password" 
              placeholder="Repeat Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
              />
            </Form.Group>
            {formik.touched.passwordRepeat && formik.errors.passwordRepeat ? (
              <div style={{ color: 'red' }}>{formik.errors.passwordRepeat}</div>
            ) : null}
          </Col>
        </Row>                                                  
          <Button variant="primary" type="submit">
            Register
          </Button><br/><br/>
          {submit ? <label>Loading...</label> : null}
          {error ? <label>{error}</label>:null}
        </Form>
        </div>
        <a href="/">Already have account? Click Here</a>                 
      </div>      
    </div>      
  </>
);
}

export default Register;