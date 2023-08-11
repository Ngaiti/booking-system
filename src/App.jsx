import Home from './pages/Home';
import Login from './pages/Login'
import ErrorPage from './pages/Error';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import ProfilePage2 from './pages/ProfilePage2';
import Reviews from './pages/Reviews';

import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { AuthProvider } from './components/AuthProvider';
import { auth } from './firebase';
import GameDetails from './pages/GameDetails';
import DummyData from './components/DummyData';
import SearchList from './components/SearchBar';
import Search from './SearchBar/App';
import SearchBar from './SearchBar/SearchBar';
import { FaEquals } from "react-icons/fa";
import ProfileSideBar from './components/SideBar';
import IconButton from './components/IconButton';
import { useState } from 'react';
import Explore from './pages/Explore';
import Welcome from './pages/Welcome';


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

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (

    <>
      <Navbar bg="light" variant="light" className="bg-dark text-light">
        <Container>
          <IconButton
            className="bi bi-grid-3x3-gap-fill"
            onClick={toggleSidebar}
            isTop
          />
          <h3>Welcome sluts</h3>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Your Profile</NavDropdown.Item>
            <NavDropdown.Item href="/reviews">Reviews</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
      <div className="d-flex">
        {isSidebarVisible && <ProfileSideBar />}
        <div className={`flex-grow-1 ${isSidebarVisible ? 'ml-2' : ''}`}>
          <Outlet />
        </div>
      </div>
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
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile2" element={<ProfilePage2 />} />
              <Route path="games" element={<DummyData />} />
              <Route path="games/:gameId" element={<GameDetails />} />
              <Route path="search" element={<SearchBar />} />
              <Route path="explore" element={<Explore />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div >
  )
}

export default App
