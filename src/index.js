import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import './index.css';
// import App from './App';
import Login from './login';
import Home from './Admin/Home';
import Recipe from './Admin/Recipe';
import User from './Admin/User';
import About from './Admin/About';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

const logOut = () => {
  localStorage.clear();
  return window.location.assign('/');    
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    {localStorage.getItem('jwt') ?
    (localStorage.getItem('role') === 'admin'  ? 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">User : {localStorage.getItem('username')} ({localStorage.getItem('role')})</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="Home">Home</Nav.Link>
            <Nav.Link href="User">User</Nav.Link>
            <Nav.Link href="Recipe">Recipe</Nav.Link>
            <Nav.Link href="About">About Us</Nav.Link>            
          </Nav>
          <Nav>            
          <Button variant="danger" onClick={() => logOut()}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    : 
    <Navbar bg="dark" variant="dark">           
        <Nav className="me-auto">            
          <label style={{color : "white"}}>User : {localStorage.getItem('username')}</label><br />            
        </Nav>
        <Nav>            
        <Button variant="danger" onClick={() => logOut()}>Logout</Button>
        </Nav>        
    </Navbar>
    )
    : ''
  }      
      <Outlet />
    </>,
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/Admin/Home",
        element: <>
        {localStorage.getItem('jwt') ?
        <Home /> :
        <div className='forbid-container'>
          <div className='rectangle'>
            <div className='login-page'>
            <h1>Forbidden Entry</h1><br /> 
            <img id='stop' src="https://img.freepik.com/free-vector/no-entry-hand-sign-isolated-white_1284-41869.jpg" alt="Stop"></img>            
            </div>                  
          </div>      
        </div>
        }
        </>        
      },
      {
        path: "/Admin/Recipe",
        element: <>
        {localStorage.getItem('jwt') ?
        <Recipe /> :
        <div className='forbid-container'>
          <div className='rectangle'>
            <div className='login-page'>
            <h1>Forbidden Entry</h1><br /> 
            <img id='stop' src="https://img.freepik.com/free-vector/no-entry-hand-sign-isolated-white_1284-41869.jpg" alt="Stop"></img>            
            </div>                  
          </div>      
        </div>
        }
        </>
        
      },
      {
        path: "/Admin/User",
        element: <>
        {localStorage.getItem('jwt') ?
        <User /> :
        <div className='forbid-container'>
          <div className='rectangle'>
            <div className='login-page'>
            <h1>Forbidden Entry</h1><br /> 
            <img id='stop' src="https://img.freepik.com/free-vector/no-entry-hand-sign-isolated-white_1284-41869.jpg" alt="Stop"></img>            
            </div>                  
          </div>      
        </div>
        }
        </>
      },
      {
        path: "/Admin/About",
        element: <>
        {localStorage.getItem('jwt') ?
        <About /> :
        <div className='forbid-container'>
          <div className='rectangle'>
            <div className='login-page'>
            <h1>Forbidden Entry</h1><br /> 
            <img id='stop' src="https://img.freepik.com/free-vector/no-entry-hand-sign-isolated-white_1284-41869.jpg" alt="Stop"></img>            
            </div>                  
          </div>      
        </div>
        }
        </>
      },
    ],
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
