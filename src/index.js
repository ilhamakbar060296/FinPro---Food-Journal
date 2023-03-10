import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import './index.css';
import Login from './login';
import Register from './register';
import Home from './Admin/Home';
import Like from './Admin/Like';
import Recipe from './Admin/Recipe';
import User from './Admin/User';
import GHome from './General/Home';
import GLike from './General/Like';
import GRecipe from './General/Recipe';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
        <Navbar.Brand>User : {localStorage.getItem('username')} ({localStorage.getItem('role')})</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="Home">Home</Nav.Link>
            <Nav.Link href="Like">Like</Nav.Link>
            <Nav.Link href="User">User</Nav.Link>
            <Nav.Link href="Recipe">Recipe</Nav.Link>            
          </Nav>
          <Nav>            
          <Button variant="danger" onClick={() => logOut()}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    : 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>User : {localStorage.getItem('username')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="Home">Home</Nav.Link>            
            <Nav.Link href="Like">Like</Nav.Link>
            <Nav.Link href="Recipe">Recipe</Nav.Link>           
          </Nav>
          <Nav>            
          <Button variant="danger" onClick={() => logOut()}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
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
        path: "/register",
        element: <Register />,
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
        path: "/Admin/Like",
        element: <>
        {localStorage.getItem('jwt') ?
        <Like /> :
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
        path: "/General/Home",
        element: <>
        {localStorage.getItem('jwt') ?
        <GHome /> :
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
        path: "/General/Like",
        element: <>
        {localStorage.getItem('jwt') ?
        <GLike /> :
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
        path: "/General/Recipe",
        element: <>
        {localStorage.getItem('jwt') ?
        <GRecipe /> :
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
