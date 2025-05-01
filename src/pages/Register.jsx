// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../features/auth/authSlice';
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Alert,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel
// } from '@mui/material';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'store_owner',
//     region: ''
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error, status } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(registerUser(formData));
//     if (result.payload) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <Container maxWidth="sm" className="py-10 gap-1.5" >
//       <Typography variant="h4" gutterBottom className="text-center">
//         Register
//       </Typography>
//       {error && <Alert severity="error" className="mb-4">{error}</Alert>}
//       <Box component="form" onSubmit={handleSubmit} className="space-y-4">
//         <TextField
//           label="Name"
//           fullWidth
//           required
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />
//         <TextField
//           label="Email"
//           type="email"
//           fullWidth
//           required
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           required
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//         />
//         <FormControl fullWidth>
//           <InputLabel>Role</InputLabel>
//           <Select
//             value={formData.role}
//             label="Role"
//             onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//           >
//             <MenuItem value="store_owner">Store Owner</MenuItem>
//             <MenuItem value="admin">Admin</MenuItem>
//           </Select>
//         </FormControl>
//         {formData.role === 'admin' && (
//           <TextField
//             label="Region"
//             fullWidth
//             value={formData.region}
//             onChange={(e) => setFormData({ ...formData, region: e.target.value })}
//           />
//         )}
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           size="large"
//           disabled={status === 'loading'}
//         >
//           {status === 'loading' ? 'Registering...' : 'Register'}
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authSlice';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'store_owner',
    region: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (result.payload) {
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          mb: 4
        }}
      >
        Register
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 4,
            width: '100%'
          }}
        >
          {error}
        </Alert>
      )}
      
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5
        }}
      >
        <TextField
          label="Name"
          fullWidth
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={formData.role}
            label="Role"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <MenuItem value="store_manager">Store Owner</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        
        {formData.role === 'admin' && (
          <TextField
            label="Region"
            fullWidth
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            sx={{ mb: 2 }}
          />
        )}
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={status === 'loading'}
          sx={{ 
            mt: 3,
            py: 1.5,
            fontSize: '1rem'
          }}
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </Button>
      </Box>
    </Container>
  );
};

export default Register;