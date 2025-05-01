// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStores, addStore } from '../../features/stores/storeSlice';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CircularProgress,
//   Alert,
// } from '@mui/material';

// const AddStoreForm = () => {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     contact: '',
//     medicines: [],
//   });
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.stores);

//   const resetForm = () => {
//     setFormData({ name: '', address: '', contact: '', medicines: [] });
//     setError(null);
//   };

//   const handleSubmit = async () => {
//     const { name, address, contact } = formData;

//     if (!name || !address || !contact) {
//       setError('All fields except medicines are required.');
//       return;
//     }

//     const isValidMobile = /^[0-9]{10}$/.test(contact);
//     if (!isValidMobile) {
//       setError('Contact number must be a valid 10-digit mobile number.');
//       return;
//     }

//     try {
//       await dispatch(
//         addStore({
//           ...formData,
//           location: { coordinates: [0, 0] }, // Default coordinates
//         })
//       ).unwrap();

//       dispatch(fetchStores());
//       resetForm();
//       setOpen(false);
//     } catch (err) {
//       console.error('Add store error:', err);
//       setError(err?.message || 'Something went wrong.');
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setOpen(true)}
//         className="mb-4"
//       >
//         Add New Store
//       </Button>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add New Medical Store</DialogTitle>
//         <DialogContent className="space-y-4">
//           {error && <Alert severity="error">{error}</Alert>}

//           <TextField
//             label="Store Name"
//             placeholder="e.g., Gupta Medicals"
//             fullWidth
//             margin="normal"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//           <TextField
//             label="Address"
//             placeholder="e.g., Sector 5, Noida"
//             fullWidth
//             margin="normal"
//             value={formData.address}
//             onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//           />
//           <TextField
//             label="Contact Number"
//             placeholder="10-digit mobile number"
//             fullWidth
//             margin="normal"
//             type="tel"
//             inputProps={{ maxLength: 10 }}
//             value={formData.contact}
//             onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
//           />

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Medicines Available</InputLabel>
//             <Select
//               multiple
//               value={formData.medicines}
//               onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
//             >
//               {['Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin'].map((medicine) => (
//                 <MenuItem key={medicine} value={medicine}>
//                   {medicine}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
//           <Button onClick={handleSubmit} color="primary" disabled={loading}>
//             {loading ? <CircularProgress size={24} /> : 'Add Store'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default AddStoreForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores, addStore } from '../../features/stores/storeSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const AddStoreForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    medicines: [],
    isCertified: false,
    certificateNumber: '',
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.stores);

  const resetForm = () => {
    setFormData({ 
      name: '', 
      address: '', 
      contact: '', 
      medicines: [],
      isCertified: false,
      certificateNumber: ''
    });
    setError(null);
  };

  const handleSubmit = async () => {
    const { name, address, contact, isCertified, certificateNumber } = formData;

    // Basic validation
    if (!name || !address || !contact ||!isCertified) {
      setError('Name, address, certificateNumber and contact are required fields.');
      return;
    }

    // Contact number validation
    const isValidMobile = /^[0-9]{10}$/.test(contact);
    if (!isValidMobile) {
      setError('Contact number must be a valid 10-digit mobile number.');
      return;
    }

    // Certification validation
    if (isCertified && !certificateNumber) {
      setError('Please provide certificate number for certified stores.');
      return;
    }

    try {
      await dispatch(
        addStore({
          ...formData,
          location: { coordinates: [0, 0] }, // Default coordinates
        })
      ).unwrap();

      dispatch(fetchStores());
      resetForm();
      setOpen(false);
    } catch (err) {
      if(err.status==405){  setError('duplicate certifcate number' ) 
      return;}
      console.log('Add store error:', err);
      setError(err?.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        className="mb-4"
      >
        Add New Store
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Medical Store</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Store Name"
            placeholder="e.g., Gupta Medicals"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Address"
            placeholder="e.g., Sector 5, Noida"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <TextField
            label="Contact Number"
            placeholder="10-digit mobile number"
            fullWidth
            margin="normal"
            type="tel"
            inputProps={{ maxLength: 10 }}
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isCertified}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  isCertified: e.target.checked,
                  certificateNumber: e.target.checked ? formData.certificateNumber : ''
                })}
                color="primary"
              />
            }
            label="Is this store certified?"
            sx={{ mt: 1 }}
          />

          {formData.isCertified && (
            <TextField
              label="Certificate Number"
              placeholder="Enter certificate number"
              fullWidth
              margin="normal"
              value={formData.certificateNumber}
              onChange={(e) => setFormData({ 
                ...formData, 
                certificateNumber: e.target.value 
              })}
              required
            />
          )}

          {/* <FormControl fullWidth margin="normal">
            <InputLabel>Medicines Available</InputLabel>
            <Select
              multiple
              value={formData.medicines}
              onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
              renderValue={(selected) => selected.join(', ')}
            >
              {['Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin'].map((medicine) => (
                <MenuItem key={medicine} value={medicine}>
                  {medicine}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            disabled={loading}
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : 'Add Store'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStoreForm;