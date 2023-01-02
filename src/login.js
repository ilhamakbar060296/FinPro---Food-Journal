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
  
  // var config = {
  //   method : 'get',
  //   url : `${process.env.REACT_APP_BASEURL}/api/v1/login`,
  //   headers: {
  //     'apiKey' : `${process.env.REACT_APP_APIKEY}`
  //   },
  // }
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
        console.log("Nama : "+name);
        localStorage.setItem('username', name);
        localStorage.setItem('role', role);
        localStorage.setItem('jwt', JWT_Token);
        setSubmit();
        window.location.assign('/home');
        // const requestToken = response.data.request_token
        // console.log("Request Token : "+requestToken);
        // Axios.post(`${process.env.REACT_APP_BASEURL}authentication/token/validate_with_login?api_key=${process.env.REACT_APP_APIKEY}`,
        //   {
        //     username: values.username,
        //     password: values.password,
        //     request_token: requestToken
        //   }).then(res => {
        //     const validatedRequestToken = res.data.request_token
        //     console.log("Validated Token : "+validatedRequestToken);
        //     Axios.post(`${process.env.REACT_APP_BASEURL}authentication/session/new?api_key=${process.env.REACT_APP_APIKEY}`,
        //       {
        //         request_token: validatedRequestToken
        //       }).then(res => {
        //         const sessionID = res.data.session_id
        //         setSubmit()
        //         console.log("Session ID : " + sessionID);
        //         localStorage.setItem('session', sessionID);
        //         Axios.get(`${process.env.REACT_APP_BASEURL}account?api_key=${process.env.REACT_APP_APIKEY}&session_id=${sessionID}`)
        //         .then(res => {
        //            console.log(res);
        //            const user = res.data.username
        //            console.log("Username adalah "+user);
        //            localStorage.setItem('username', user)                                     
        //            window.location.assign('/home');
        //         })                  
        //       })
        //   }).catch(error => {
        //    console.log("some error occurred", error)
        //    setSubmit()
        //    setError('Invalid Username or Password')
        //   })
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