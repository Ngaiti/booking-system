import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './pages/Login'
import ErrorPage from './pages/Error';
import AddReview from './pages/AddReview';
import EditTodo from './pages/EditReview';

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { AuthContext } from './AuthContext';
import { Container, Navbar } from 'react-bootstrap';
import RequireAuth from './components/RequireAuth';
import useLocalStorage from 'use-local-storage';
import { TodoContext } from './contexts/TodoContext';
import "./App.css"
import { useContext } from 'react';
import Timer from './components/Timer';


function Layout() {
  const { setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (

    <>
      <Navbar bg="light" variant="light" className='bg-dark text-light' >
        <Container className="d-flex justify-content-between">
          <Navbar.Brand className="text-light" href="/home">Home :3</Navbar.Brand>
          <Timer />
          <Navbar.Brand className="text-light" href="/" onClick={handleLogout}>Logout</Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}



function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [todos, setTodos] = useLocalStorage("todos", []);


  return (
    <div className='todo-app'>
      <AuthContext.Provider value={{ token, setToken }}>
        <TodoContext.Provider value={{ todos, setTodos }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Welcome />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<ErrorPage />} />
                <Route
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                  path="home" />
                <Route
                  element={
                    <RequireAuth>
                      <AddReview />
                    </RequireAuth>
                  }
                  path="add" />
                <Route
                  element={
                    <RequireAuth>
                      <EditTodo />
                    </RequireAuth>
                  }
                  path="todo/:id" />
              </Route>
            </Routes>
          </BrowserRouter>
        </TodoContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
