import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <MedicalServicesIcon className="mr-2" />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            className="text-white no-underline"
          >
            QUICK MEDS
          </Typography>
          
         
        </div>

        <Box className="flex items-center space-x-4">
          {user ? (
            <>
             <Button
                component={Link}
                to="/stores"
                color="inherit"
                className="text-white"
              >
                Stores
              </Button>
              <Button
                component={Link}
                to="/dashboard"
                color="inherit"
                className="text-white"
              >
                Dashboard
              </Button>
            
              <Button
                color="inherit"
                onClick={handleLogout}
                className="text-white"
              >
                Logout
              </Button>
             
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                className="text-white"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/stores"
                color="inherit"
                className="text-white"
              >
                Stores
              </Button>
              {!isMobile && (
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  className="text-white"
                >
                  Register
                </Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;