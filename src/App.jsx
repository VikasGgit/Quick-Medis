// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Navbar from './components/layout/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import AdminPanel from './pages/AdminPanel';
// import PrivateRoute from './components/routing/PrivateRoute';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow p-4">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//   path="/dashboard"
//   element={<PrivateRoute component={Dashboard} roles={["admin", "superAdmin"]} />}
// />

//             <Route
//               path="/admin"
//               element={
//                 <PrivateRoute
//                   component={AdminPanel}
//                   roles={['superadmin', 'admin']}
//                 />
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './features/auth/authSlice';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/routing/PrivateRoute';
import Store from './pages/Stores';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  // Redirect based on auth status
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && window.location.pathname === '/login') {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<Store />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={['superadmin', 'admin']}>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;