  import Axios from 'axios';  
  import './login.css';
  import { useFormik } from 'formik';
  import { useState } from 'react';
  import * as Yup from 'yup';
  import Form from 'react-bootstrap/Form';
  import Button from 'react-bootstrap/Button';
  
  function Login() {
  const [error, setError] = useState();
  const [submit, setSubmit] = useState();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required'),
    }),
    onSubmit: values => {
      setSubmit("Loading")
      setError()
      console.log(values)
      // Movie DB auth step 1
      Axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/login`, values,{
        headers : {          
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
      .then(response => {
        console.log(response);
        const name = response.data.user.name;
        const role = response.data.user.role;
        const JWT_Token = response.data.token;        
        localStorage.setItem('username', name);
        localStorage.setItem('role', role);
        localStorage.setItem('jwt', JWT_Token);
        setSubmit();
        if(role === "admin"){
          window.location.assign('/Admin/Home');        
        }else{
          window.location.assign('/General/Home');        
        }
      }).catch(error => {
           console.log("some error occurred", error)
           setSubmit()
           setError('Invalid Username or Password')
          })

 },
});

  return (
    <>
      <div className='login-container'>
        <div>
          <img className='login-image' src='https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg' alt='theMovieDB'></img>
        </div>
        <div className='rectangle'>
          <div className='login-page'>
          <h1>Login Page</h1><br />
          <Form onSubmit={formik.handleSubmit}>
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
            {/* <br /> */}
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
              <div>{formik.errors.password}</div>
            ) : null}                     
            <Button variant="primary" type="submit">
              Login
            </Button><br/><br/>
            {submit ? <label>Loading...</label> : null}
            {error ? <label>{error}</label>:null}
          </Form>
          </div>                  
        </div>      
      </div>      
    </>
  );
}

  export default Login;