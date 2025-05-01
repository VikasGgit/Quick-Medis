

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   fetchMyStores, 
//   updateStoreStatus, 
//   updateStore, 
//   deleteStore,
//   resetStoreState
// } from '../../features/stores/storeSlice';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Switch,
//   CircularProgress,
//   Alert,
//   Button,
//   useMediaQuery,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Menu,
//   MenuItem,
//   Snackbar, Typography
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   MoreVert as MoreVertIcon,
//   LocalPharmacy as PharmacyIcon,
//   DeliveryDining as DeliveryIcon,
//   Close as CloseIcon
// } from '@mui/icons-material';
// import { motion } from 'framer-motion';

// const StoreList = () => {
//   const dispatch = useDispatch();
//   const { 
//     items, 
//     Myitems, 
//     loading, 
//     error, 
//     success,
//     operation 
//   } = useSelector((state) => state.stores);
  
//   const { user } = useSelector((state) => state.auth);
//   const isMobile = useMediaQuery('(max-width:768px)');
  
//   // State for edit dialog
//   const [editDialogOpen, setEditDialogOpen] = React.useState(false);
//   const [currentStore, setCurrentStore] = React.useState(null);
//   const [editFormData, setEditFormData] = React.useState({
//     name: '',
//     address: '',
//     contact: '',
//     deliveryAvailable: false
//   });
  
//   // State for context menu
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [selectedStoreId, setSelectedStoreId] = React.useState(null);

//   // Fetch stores on component mount
//   useEffect(() => {
//     dispatch(fetchMyStores());
//   }, [dispatch]);

//   // Reset success state after showing notification
//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         dispatch(resetStoreState());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, dispatch]);

//   const handleStatusChange = (storeId, newStatus) => {
//     dispatch(updateStoreStatus({ storeId, status: newStatus }));
//   };

//   const handleDelete = (storeId) => {
//     dispatch(deleteStore(storeId));
//     handleMenuClose();
//   };

//   const handleEditClick = (store) => {
//     setCurrentStore(store);
//     setEditFormData({
//       name: store.name,
//       address: store.address,
//       contact: store.contact,
//       deliveryAvailable: store.deliveryAvailable || false
//     });
//     setEditDialogOpen(true);
//     handleMenuClose();
//   };

//   const handleEditSubmit = () => {
//     dispatch(updateStore({
//       id: currentStore._id,
//       updatedData: editFormData
//     }));
//     setEditDialogOpen(false);
//   };

//   const handleMenuOpen = (event, storeId) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedStoreId(storeId);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedStoreId(null);
//   };

//   const handleCloseError = () => {
//     dispatch(resetStoreState());
//   };

//   // Filter stores based on user role
//   const filteredStores =Myitems.filter(store => 
//     user?.role === 'store_owner' ? store.ownerId === user.id : true
//   );

//   return (
//     <div className="space-y-4">
//       {/* Success Notification */}
//       <Snackbar
//         open={success}
//         autoHideDuration={3000}
//         message={`Store ${operation} successfully!`}
//         onClose={handleCloseError}
//       />
      
//       {/* Error Notification */}
//       {error && (
//         <Alert 
//           severity="error"
//           action={
//             <IconButton
//               size="small"
//               aria-label="close"
//               color="inherit"
//               onClick={handleCloseError}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           }
//           className="mb-4"
//         >
//           {error}
//         </Alert>
//       )}

//       {/* Loading Indicator */}
//       {loading && operation === 'fetching' && (
//         <div className="flex justify-center my-8">
//           <CircularProgress />
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && filteredStores.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-10"
//         >
//           <Typography variant="h6">No stores found</Typography>
//           <Typography variant="body1" className="mt-2">
//             {user?.role === 'admin' 
//               ? 'Add a new store using the button above' 
//               : 'Contact your admin to add your store'}
//           </Typography>
//         </motion.div>
//       )}

//       {/* Stores Table */}
//       {Myitems.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <TableContainer 
//             component={Paper} 
//             className="shadow-sm"
//             sx={{ minWidth: isMobile ? undefined : 650 }}
//           >
//             <Table size={isMobile ? 'small' : 'medium'}>
//               <TableHead className="bg-gray-100">
//                 <TableRow>
//                   <TableCell>Store</TableCell>
//                   {!isMobile && <TableCell>Address</TableCell>}
//                   <TableCell>Contact</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Delivery</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredStores.map((store) => (
//                   <motion.tr
//                     key={store._id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <TableCell>
//                       <div className="flex items-center">
//                         <PharmacyIcon color="primary" className="mr-2" />
//                         {store.name}
//                       </div>
//                     </TableCell>
//                     {!isMobile && <TableCell>{store.address}</TableCell>}
//                     <TableCell>
//                       <a href={`tel:${store.contact}`} className="text-blue-600 hover:underline">
//                         {store.contact}
//                       </a>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <Switch
//                           checked={store.status === 'open'}
//                           onChange={(e) =>
//                             handleStatusChange(
//                               store._id,
//                               e.target.checked ? 'open' : 'closed'
//                             )
//                           }
//                           color="primary"
//                           disabled={loading && operation === 'updateStatus'}
//                         />
//                         <span
//                           className={
//                             store.status === 'open' ? 'text-green-600' : 'text-red-600'
//                           }
//                         >
//                           {store.status}
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <DeliveryIcon
//                           color={store.deliveryAvailable ? "success" : "error"}
//                           className="mr-1"
//                         />
//                         {store.deliveryAvailable ? 'Yes' : 'No'}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton
//                         aria-label="more"
//                         aria-controls="store-menu"
//                         aria-haspopup="true"
//                         onClick={(e) => handleMenuOpen(e, store._id)}
//                         disabled={loading}
//                       >
//                         <MoreVertIcon />
//                       </IconButton>
//                     </TableCell>
//                   </motion.tr>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </motion.div>
//       )}

//       {/* Edit Dialog */}
//       <Dialog 
//         open={editDialogOpen} 
//         onClose={() => setEditDialogOpen(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Edit Store</DialogTitle>
//         <DialogContent className="space-y-4">
//           <TextField
//             label="Name"
//             fullWidth
//             margin="normal"
//             value={editFormData.name}
//             onChange={(e) =>
//               setEditFormData({ ...editFormData, name: e.target.value })
//             }
//             disabled={loading && operation === 'updating'}
//           />
//           <TextField
//             label="Address"
//             fullWidth
//             margin="normal"
//             value={editFormData.address}
//             onChange={(e) =>
//               setEditFormData({ ...editFormData, address: e.target.value })
//             }
//             disabled={loading && operation === 'updating'}
//           />
//           <TextField
//             label="Contact"
//             fullWidth
//             margin="normal"
//             value={editFormData.contact}
//             onChange={(e) =>
//               setEditFormData({ ...editFormData, contact: e.target.value })
//             }
//             disabled={loading && operation === 'updating'}
//           />
//           <div className="flex items-center">
//             <Switch
//               checked={editFormData.deliveryAvailable}
//               onChange={(e) =>
//                 setEditFormData({
//                   ...editFormData,
//                   deliveryAvailable: e.target.checked
//                 })
//               }
//               color="primary"
//               disabled={loading && operation === 'updating'}
//             />
//             <span>Delivery Available</span>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={() => setEditDialogOpen(false)}
//             disabled={loading && operation === 'updating'}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleEditSubmit} 
//             color="primary"
//             disabled={loading && operation === 'updating'}
//           >
//             {loading && operation === 'updating' ? (
//               <CircularProgress size={24} />
//             ) : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Context Menu */}
//       <Menu
//         id="store-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem 
//           onClick={() => {
//             const store =Myitems.find(s => s._id === selectedStoreId);
//             if (store) handleEditClick(store);
//           }}
//           disabled={loading}
//         >
//           <EditIcon className="mr-2" /> Edit
//         </MenuItem>
//         <MenuItem 
//           onClick={() => handleDelete(selectedStoreId)}
//           disabled={loading}
//         >
//           <DeleteIcon className="mr-2" /> Delete
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default StoreList;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchMyStores, 
  updateStoreStatus, 
  updateStoreDelivery,
  updateStore, 
  deleteStore,
  resetStoreState
} from '../../features/stores/storeSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  CircularProgress,
  Alert,
  Button,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Snackbar, 
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  LocalPharmacy as PharmacyIcon,
  DeliveryDining as DeliveryIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const StoreList = () => {
  const dispatch = useDispatch();
  const { 
    Myitems, 
    loading, 
    error, 
    success,
    operation 
  } = useSelector((state) => state.stores);
  
  const { user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery('(max-width:768px)');
  
  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [currentStore, setCurrentStore] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
    name: '',
    address: '',
    contact: '',
    deliveryAvailable: false
  });
  
  // State for context menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedStoreId, setSelectedStoreId] = React.useState(null);

  // Fetch stores on component mount
  useEffect(() => {
    dispatch(fetchMyStores());
  }, [dispatch, user]);

  // Reset success state after showing notification
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetStoreState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleStatusChange = (storeId, newStatus) => {
    dispatch(updateStoreStatus({ storeId, status: newStatus }));
  };

  const handleDeliveryChange = (storeId, isAvailable) => {
    dispatch(updateStoreDelivery({ storeId, deliveryAvailable: isAvailable }));
  };

  const handleDelete = (storeId) => {
    dispatch(deleteStore(storeId));
    handleMenuClose();
  };

  const handleEditClick = (store) => {
    setCurrentStore(store);
    setEditFormData({
      name: store.name,
      address: store.address,
      contact: store.contact,
      deliveryAvailable: store.deliveryAvailable || false
    });
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditSubmit = () => {
    dispatch(updateStore({
      id: currentStore._id,
      updatedData: editFormData
    }));
    setEditDialogOpen(false);
  };

  const handleMenuOpen = (event, storeId) => {
    setAnchorEl(event.currentTarget);
    setSelectedStoreId(storeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStoreId(null);
  };

  const handleCloseError = () => {
    dispatch(resetStoreState());
  };

  // Filter stores based on user role
  const filteredStores = Myitems
  // .filter(store => 
  //   user?.role === 'store_manager' ? store.ownerId === user._id : true
  // );

  return (
    <div className="space-y-4">
      {/* Success Notification */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="success" sx={{ width: '100%' }}>
          {`Store ${operation} successfully!`}
        </Alert>
      </Snackbar>
      
      {/* Error Notification */}
      {error && (
        <Alert 
          severity="error"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseError}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          className="mb-4"
        >
          {error}
        </Alert>
      )}

      {/* Loading Indicator */}
      {loading && operation === 'fetching' && (
        <div className="flex justify-center my-8">
          <CircularProgress />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredStores.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <Typography variant="h6">No stores found</Typography>
          <Typography variant="body1" className="mt-2">
            {user?.role === 'admin' 
              ? 'Add a new store using the button above' 
              : 'Contact your admin to add your store'}
          </Typography>
        </motion.div>
      )}

      {/* Stores Table */}
      {filteredStores.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TableContainer 
            component={Paper} 
            className="shadow-sm"
            sx={{ minWidth: isMobile ? undefined : 650 }}
          >
            <Table size={isMobile ? 'small' : 'medium'}>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Store</TableCell>
                  {!isMobile && <TableCell>Address</TableCell>}
                  <TableCell>Contact</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delivery Available</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStores.map((store) => (
                  <motion.tr
                    key={store._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <PharmacyIcon color="primary" className="mr-2" />
                        {store.name}
                      </div>
                    </TableCell>
                    {!isMobile && <TableCell>{store.address}</TableCell>}
                    <TableCell>
                      <a href={`tel:${store.contact}`} className="text-blue-600 hover:underline">
                        {store.contact}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={store.status === 'open'}
                          onChange={(e) =>
                            handleStatusChange(
                              store._id,
                              e.target.checked ? 'open' : 'closed'
                            )
                          }
                          color="primary"
                          disabled={loading && operation === 'updateStatus'}
                        />
                        <span
                          className={
                            store.status === 'open' ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {store.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={store.deliveryAvailable}
                          onChange={(e) =>
                            handleDeliveryChange(
                              store._id,
                              e.target.checked
                            )
                          }
                          color="success"
                          disabled={loading && operation === 'updateDelivery'}
                        />
                        <DeliveryIcon
                          color={store.deliveryAvailable ? "success" : "error"}
                          className="ml-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="store-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleMenuOpen(e, store._id)}
                        disabled={loading}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      )}

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Store</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={editFormData.name}
            onChange={(e) =>
              setEditFormData({ ...editFormData, name: e.target.value })
            }
            disabled={loading && operation === 'updating'}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={editFormData.address}
            onChange={(e) =>
              setEditFormData({ ...editFormData, address: e.target.value })
            }
            disabled={loading && operation === 'updating'}
          />
          <TextField
            label="Contact"
            fullWidth
            margin="normal"
            value={editFormData.contact}
            onChange={(e) =>
              setEditFormData({ ...editFormData, contact: e.target.value })
            }
            disabled={loading && operation === 'updating'}
          />
          <div className="flex items-center">
            <Switch
              checked={editFormData.deliveryAvailable}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  deliveryAvailable: e.target.checked
                })
              }
              color="primary"
              disabled={loading && operation === 'updating'}
            />
            <span>Delivery Available</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditDialogOpen(false)}
            disabled={loading && operation === 'updating'}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit} 
            color="primary"
            disabled={loading && operation === 'updating'}
          >
            {loading && operation === 'updating' ? (
              <CircularProgress size={24} />
            ) : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        id="store-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          onClick={() => {
            const store = Myitems.find(s => s._id === selectedStoreId);
            if (store) handleEditClick(store);
          }}
          disabled={loading}
        >
          <EditIcon className="mr-2" /> Edit
        </MenuItem>
        <MenuItem 
          onClick={() => handleDelete(selectedStoreId)}
          disabled={loading}
        >
          <DeleteIcon className="mr-2" /> Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default StoreList;