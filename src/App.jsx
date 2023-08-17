import Home from './pages/Home';
import Login from './pages/Login'
import ErrorPage from './pages/Error';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import Reviews from './pages/Reviews';
import Explore from './pages/Explore';
import Welcome from './pages/Welcome';
import Wishlist from './pages/WIshlist';

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Container, Image, NavDropdown, Navbar } from 'react-bootstrap';
import { AuthContext, AuthProvider } from './components/AuthProvider';
import { storage } from './firebase';
import GameDetails from './pages/GameDetails';
import DummyData from './components/DummyData';
import SearchBar from './SearchBar/SearchBar';
import ProfileSideBar from './components/SideBar';
import IconButton from './components/IconButton';
import { useContext, useEffect, useState } from 'react';
import './App.css'
import { getDownloadURL, ref } from 'firebase/storage';




function Layout() {

  const authContext = useContext(AuthContext);

  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  //Firestore request to fetch profile picture from current userid
  const fetchProfileImageUrl = async () => {
    if (authContext.currentUser) {
      try {
        const profileImageRef = ref(storage, `profile-pics/${authContext.currentUser.uid}.jpeg`);
        const downloadURL = await getDownloadURL(profileImageRef);
        setProfileImageUrl(downloadURL);
      } catch (error) {
        console.error('Error fetching profile image URL:', error);
      }
    }
  };

  useEffect(() => {
    if (authContext.currentUser) {
      fetchProfileImageUrl();
    }
  }, [authContext.currentUser]);

  return (

    <>
      <Navbar bg="light" variant="light" className="bg-dark text-light">

        <IconButton
          className="bi bi-grid-3x3-gap-fill mx-4"
          onClick={toggleSidebar}
        />
        <Container>
          <a href="/home" className="navbar-title">Stratus</a>
        </Container>
        <NavDropdown title="Profile" className='mx-5 px-5' direction="dropstart">
          {profileImageUrl ? (
            <Image
              className='mx-5 my-2'
              src={profileImageUrl}
              roundedCircle
              style={{ width: '60px', height: '60px' }}

            />
          ) : null}
          <NavDropdown.Item href="/profile">Your Profile</NavDropdown.Item>
        </NavDropdown>



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
              <Route path="games" element={<DummyData />} />
              <Route path="games/:gameId" element={<GameDetails />} />
              <Route path="search" element={<SearchBar />} />
              <Route path="explore" element={<Explore />} />
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div >
  )
}

export default App
