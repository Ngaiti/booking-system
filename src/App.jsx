import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './pages/Login'
import ErrorPage from './pages/Error';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import ProfilePage2 from './pages/ProfilePage2';

import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
// import "./App.css"
import { AuthProvider } from './components/AuthProvider';
import { auth } from './firebase';


function Layout() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (

    <>
      <Navbar bg="light" variant="light" className='bg-dark text-light' >
        <Container>
          <Navbar.Brand className="text-light" href="/home">Home </Navbar.Brand>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Your Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}



function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Welcome />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile2" element={<ProfilePage2 />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div >
  )
}

export default App
