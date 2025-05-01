// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { loginUser } from '../features/auth/authSlice';
// // import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

// // const Login = () => {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: ''
// //   });
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { error, status } = useSelector((state) => state.auth);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const result = await dispatch(loginUser(formData));
// //     if (result.payload) {
// //       navigate('/dashboard');
// //     }
// //   };

// //   return (
// //     <Container maxWidth="sm" className="py-10">
// //       <Typography variant="h4" gutterBottom className="text-center">
// //         Login
// //       </Typography>
// //       {error && <Alert severity="error" className="mb-4">{error}</Alert>}
// //       <Box component="form" onSubmit={handleSubmit} className="space-y-4">
// //         <TextField
// //           label="Email"
// //           type="email"
// //           fullWidth
// //           required
// //           value={formData.email}
// //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //         />
// //         <TextField
// //           label="Password"
// //           type="password"
// //           fullWidth
// //           required
// //           value={formData.password}
// //           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //         />
// //         <Button
// //           type="submit"
// //           variant="contained"
// //           color="primary"
// //           fullWidth
// //           size="large"
// //           disabled={status === 'loading'}
// //         >
// //           {status === 'loading' ? 'Logging in...' : 'Login'}
// //         </Button>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../features/auth/authSlice';
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Alert,
//   Paper,
//   InputAdornment
// } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import { motion } from 'framer-motion';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error, status } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(loginUser(formData));

//     if (result.payload) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ py: 8 }}>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Paper elevation={4} sx={{ p: 5, borderRadius: 4 }}>
//           <Typography
//             variant="h4"
//             gutterBottom
//             align="center"
//             fontWeight="bold"
//             color="primary"
//           >
//             Welcome Back
//           </Typography>
//           <Typography variant="body1" align="center" color="textSecondary" mb={3}>
//             Sign in to your account
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleSubmit} spacing={3}>
//             <TextField
//               label="Email"
//               type="email"
//               fullWidth
//               required
//               margin="normal"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon color="action" />
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               fullWidth
//               required
//               margin="normal"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon color="action" />
//                   </InputAdornment>
//                 )
//               }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               size="large"
//               sx={{
//                 mt: 3,
//                 py: 1.5,
//                 borderRadius: 2,
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 boxShadow: 3
//               }}
//               disabled={status === 'loading'}
//             >
//               {status === 'loading' ? 'Logging in...' : 'Login'}
//             </Button>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Container>
//   );
// };

// export default Login;











import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../features/auth/authSlice';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Paper,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    await dispatch(loginUser(formData));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={4} sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            fontWeight="bold"
            color="primary"
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" mb={3}>
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} spacing={3}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: 3
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;