// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStores } from '../features/stores/storeSlice';
// import {
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Chip,
//   CircularProgress,
//   TextField,
//   Pagination,
//   useMediaQuery,
// } from '@mui/material';
// import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
// import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import { motion } from 'framer-motion';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((state) => state.stores);
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     dispatch(fetchStores());
//   }, [dispatch]);

//   const filteredStores = items.filter((store) =>
//     store.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedStores = filteredStores.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredStores.length / itemsPerPage);

//   return (
//     <Container maxWidth="lg" className="py-8">
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//         <Typography variant={isMobile ? 'h4' : 'h3'} align="center" className="mb-6 font-semibold">
//           🏥 Find Nearby Medical Stores
//         </Typography>
//       </motion.div>

//       <div className="flex justify-center mb-6">
//         <TextField
//           variant="outlined"
//           placeholder="Search by store name..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(1);
//           }}
//           sx={{ width: isMobile ? '100%' : '50%' }}
//         />
//       </div>

//       {loading ? (
//         <div className="flex justify-center mt-10">
//           <CircularProgress size={40} />
//         </div>
//       ) : paginatedStores.length === 0 ? (
//         <Typography variant="h6" align="center" color="textSecondary">
//           No medical stores found matching your search.
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={4}>
//             {paginatedStores.map((store, index) => (
//               <Grid item xs={12} sm={6} md={4} key={store._id}>
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                 >
//                   <Card
//                     className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full"
//                     sx={{
//                       backgroundColor: '#f9fafb',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'space-between',
//                       height: '100%',
//                     }}
//                   >
//                     <CardContent>
//                       <div className="flex items-center mb-3">
//                         <LocalPharmacyIcon color="primary" sx={{ mr: 1 }} />
//                         <Typography variant="h6" fontWeight="bold">
//                           {store.name}
//                         </Typography>
//                       </div>

//                       <Typography color="text.secondary" sx={{ mb: 2 }}>
//                         {store.address}
//                       </Typography>

//                       <div className="mb-2 space-y-1">
//                         <Typography color="success.main">
//                           {store.deliveryAvailable
//                             ? '🎉 Hurray! Delivery is available. Call or click below to order.'
//                             : '🚫 Delivery not available. Please visit the store.'}
//                         </Typography>
//                         <Typography color={store.status === 'open' ? 'primary.main' : 'error.main'}>
//                           {store.status === 'open'
//                             ? '🟢 The store is currently open!'
//                             : '🔴 The store is currently closed.'}
//                         </Typography>
//                       </div>

//                       <div className="flex gap-2 flex-wrap mt-2 mb-2">
//                         <Chip
//                           icon={<DeliveryDiningIcon />}
//                           label={store.deliveryAvailable ? 'Delivery Available' : 'No Delivery'}
//                           color={store.deliveryAvailable ? 'success' : 'default'}
//                         />
//                         <Chip
//                           icon={<StorefrontIcon />}
//                           label={store.status === 'open' ? 'Open Now' : 'Closed'}
//                           color={store.status === 'open' ? 'primary' : 'error'}
//                         />
//                       </div>

//                       <Typography variant="body2" color="text.secondary">
//                         📞{' '}
//                         <a href={`tel:+91${store.contact}`} className="text-blue-600 hover:underline">
//                           {store.contact}
//                         </a>
//                       </Typography>
//                     </CardContent>

//                     <CardActions className="justify-center pb-4">
//                       <Button
//                         size="small"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         component="a"
//                         href={`tel:+91${store.contact}`}
//                         sx={{ borderRadius: '20px', textTransform: 'none' }}
//                       >
//                         Order Now
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>

//           {totalPages > 1 && (
//             <div className="flex justify-center mt-6">
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={(e, value) => setPage(value)}
//                 color="primary"
//                 size={isMobile ? 'small' : 'medium'}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// export default Home;





// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStores } from '../features/stores/storeSlice';
// import {
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Chip,
//   CircularProgress,
//   TextField,
//   Pagination,
//   useMediaQuery,
//   Tooltip
// } from '@mui/material';
// import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
// import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import { motion } from 'framer-motion';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((state) => state.stores);
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const isTablet = useMediaQuery('(max-width:900px)');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 9;

//   useEffect(() => {
//     dispatch(fetchStores());
//   }, [dispatch]);

//   const filteredStores = items.filter((store) =>
//     store.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedStores = filteredStores.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredStores.length / itemsPerPage);

//   // Truncate text with ellipsis
//   const truncateText = (text, maxLength) => {
//     return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ 
//       py: 4,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       {/* Header */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.6 }}
//         style={{ width: '100%', textAlign: 'center' }}
//       >
//         <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ 
//           mb: 4, 
//           fontWeight: 'bold',
//           textAlign: 'center'
//         }}>
//           🏥 Find Nearby Medical Stores
//         </Typography>
//       </motion.div>

//       {/* Search Bar */}
//       <div style={{ 
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         marginBottom: '24px'
//       }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search stores..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(1);
//           }}
//           sx={{ 
//             width: isMobile ? '100%' : isTablet ? '75%' : '50%',
//             maxWidth: '600px'
//           }}
//         />
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center',
//           height: '200px'
//         }}>
//           <CircularProgress size={40} />
//         </div>
//       ) : paginatedStores.length === 0 ? (
//         <Typography variant="h6" align="center" color="textSecondary">
//           No stores found matching your search.
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={3} sx={{ 
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'stretch',
//             width: '100%'
//           }}>
//             {paginatedStores.map((store, index) => (
//               <Grid item xs={12} sm={6} md={4} key={store._id} sx={{ 
//                 display: 'flex',
//                 justifyContent: 'center'
//               }}>
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   style={{ 
//                     width: '100%',
//                     maxWidth: '350px',
//                     height: '100%'
//                   }}
//                 >
//                   <Card
//                     sx={{
//                       backgroundColor: '#f9fafb',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                       height: '100%',
//                       borderRadius: '16px',
//                       boxShadow: 2,
//                       '&:hover': { boxShadow: 4 },
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       {/* Store Name with Tooltip */}
//                       <div style={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         marginBottom: '12px'
//                       }}>
//                         <LocalPharmacyIcon color="primary" sx={{ mr: 1 }} />
//                         <Tooltip title={store.name} arrow>
//                           <Typography 
//                             variant="h6" 
//                             fontWeight="bold" 
//                             sx={{ 
//                               fontSize: isMobile ? '1rem' : '1.1rem',
//                               whiteSpace: 'nowrap',
//                               overflow: 'hidden',
//                               textOverflow: 'ellipsis',
//                               maxWidth: '250px'
//                             }}
//                           >
//                             {store.name}
//                           </Typography>
//                         </Tooltip>
//                       </div>

//                       {/* Address with Tooltip */}
//                       <Tooltip title={store.address} arrow>
//                         <Typography 
//                           color="text.secondary" 
//                           sx={{ 
//                             mb: 2, 
//                             fontSize: isMobile ? '0.8rem' : '0.9rem',
//                             display: '-webkit-box',
//                             WebkitLineClamp: 3,
//                             WebkitBoxOrient: 'vertical',
//                             overflow: 'hidden',
//                             minHeight: '60px'
//                           }}
//                         >
//                           {store.address}
//                         </Typography>
//                       </Tooltip>

//                       {/* Status Info */}
//                       <div style={{ marginBottom: '12px' }}>
//                         <Typography 
//                           color={store.deliveryAvailable ? 'success.main' : 'text.secondary'} 
//                           sx={{ 
//                             fontSize: isMobile ? '0.8rem' : '0.9rem',
//                             mb: 1,
//                             whiteSpace: 'nowrap',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis'
//                           }}
//                         >
//                           {store.deliveryAvailable
//                             ? '🎉 Delivery Available'
//                             : '🚫 Delivery not available'}
//                         </Typography>
//                         <Typography 
//                           color={store.status === 'open' ? 'primary.main' : 'error.main'} 
//                           sx={{ 
//                             fontSize: isMobile ? '0.8rem' : '0.9rem',
//                             whiteSpace: 'nowrap',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis'
//                           }}
//                         >
//                           {store.status === 'open'
//                             ? '🟢 Currently Open'
//                             : '🔴 Currently Closed'}
//                         </Typography>
//                       </div>

//                       {/* Chips */}
//                       <div style={{ 
//                         display: 'flex', 
//                         gap: '8px', 
//                         flexWrap: 'wrap', 
//                         margin: '12px 0' 
//                       }}>
//                         <Chip
//                           icon={<DeliveryDiningIcon />}
//                           label={isMobile ? 'Delivery' : 'Delivery Status'}
//                           color={store.deliveryAvailable ? 'success' : 'default'}
//                           size={isMobile ? 'small' : 'medium'}
//                         />
//                         <Chip
//                           icon={<StorefrontIcon />}
//                           label={isMobile ? 'Status' : 'Store Status'}
//                           color={store.status === 'open' ? 'primary' : 'error'}
//                           size={isMobile ? 'small' : 'medium'}
//                         />
//                       </div>

//                       {/* Contact */}
//                       <Typography 
//                         variant="body2" 
//                         color="text.secondary" 
//                         sx={{ 
//                           fontSize: isMobile ? '0.8rem' : '0.9rem',
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis'
//                         }}
//                       >
//                         📞{' '}
//                         <a 
//                           href={`tel:+91${store.contact}`} 
//                           style={{ 
//                             color: '#1976d2', 
//                             textDecoration: 'underline' 
//                           }}
//                         >
//                           {store.contact}
//                         </a>
//                       </Typography>
//                     </CardContent>

//                     {/* Order Button */}
//                     <CardActions sx={{ 
//                       justifyContent: 'center', 
//                       pb: 2,
//                       px: 2
//                     }}>
//                       <Button
//                         size={isMobile ? 'small' : 'medium'}
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         component="a"
//                         href={`tel:+91${store.contact}`}
//                         sx={{ 
//                           borderRadius: '20px', 
//                           textTransform: 'none',
//                           fontSize: isMobile ? '0.8rem' : '0.9rem'
//                         }}
//                       >
//                         {isMobile ? 'Call Now' : 'Order Now'}
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               marginTop: '24px',
//               width: '100%'
//             }}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={(e, value) => setPage(value)}
//                 color="primary"
//                 size={isMobile ? 'small' : 'medium'}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// export default Home;



// import React from 'react';
// import { 
//   Box, 
//   Button, 
//   Container, 
//   Grid, 
//   Typography, 
//   Paper, 
//   Avatar, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText,
//   Divider,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import {
//   LocalPharmacy,
//   MedicalServices,
//   DeliveryDining,
//   AccessTime,
//   Phone,
//   Map,
//   VerifiedUser,
//   PersonAdd,
//   Dashboard
// } from '@mui/icons-material';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const QuickMedsHome = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const features = [
//     { icon: <LocalPharmacy />, title: "Real-time Store Status", desc: "See which medical stores are open right now" },
//     { icon: <DeliveryDining />, title: "Delivery Availability", desc: "Filter stores that offer delivery services" },
//     { icon: <AccessTime />, title: "24/7 Access", desc: "Find emergency medical stores anytime" },
//     { icon: <Phone />, title: "Direct Contact", desc: "One-tap calling to stores" },
//     { icon: <Map />, title: "Lucknow Coverage", desc: "Comprehensive coverage across the city" },
//     { icon: <VerifiedUser />, title: "Verified Listings", desc: "All stores are verified for authenticity" },
//   ];

//   return (
//     <Box sx={{ bgcolor: 'background.default' }}>
//       {/* Hero Section */}
//       <Box sx={{ 
//         bgcolor: 'primary.main', 
//         color: 'white',
//         py: 8,
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         <Container maxWidth="lg">
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 4
//           }}>
//             <Typography variant="h4" component="h1" fontWeight="bold">
//               Quick Meds
//             </Typography>
//             <Button 
//               component={Link}
//               to="/register"
//               variant="contained" 
//               color="secondary"
//               size="large"
//               startIcon={<PersonAdd />}
//               sx={{
//                 borderRadius: '50px',
//                 boxShadow: 4,
//                 '&:hover': {
//                   transform: 'translateY(-2px)',
//                   boxShadow: 6
//                 },
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               Register Your Store
//             </Button>
//           </Box>

//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <Typography variant={isMobile ? 'h4' : 'h2'} fontWeight="bold" gutterBottom>
//                   Find Medicine <br />When You Need It Most
//                 </Typography>
//                 <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
//                   Connecting Lucknow with reliable medical stores in real-time
//                 </Typography>
//                 <Button
//                   component={Link}
//                   to="/stores"
//                   variant="contained"
//                   color="secondary"
//                   size="large"
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: '50px',
//                     fontSize: '1.1rem',
//                     fontWeight: 'bold'
//                   }}
//                 >
//                   Find Stores Near You
//                 </Button>
//               </motion.div>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 style={{
//                   background: 'rgba(255,255,255,0.1)',
//                   borderRadius: '20px',
//                   backdropFilter: 'blur(10px)',
//                   padding: '20px',
//                   boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
//                 }}
//               >
//                 <img 
//                   src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
//                   alt="Medical Store" 
//                   style={{
//                     width: '100%',
//                     borderRadius: '15px',
//                     boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
//                   }}
//                 />
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
//           Why Choose Quick Meds?
//         </Typography>
//         <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
//           The most reliable way to find medicines in Lucknow
//         </Typography>

//         <Grid container spacing={4}>
//           {features.map((feature, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <motion.div
//                 whileHover={{ y: -5 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Paper elevation={3} sx={{ 
//                   p: 3, 
//                   height: '100%',
//                   borderRadius: '15px',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     boxShadow: theme.shadows[6]
//                   }
//                 }}>
//                   <Avatar sx={{ 
//                     bgcolor: 'primary.main', 
//                     color: 'white',
//                     width: 56, 
//                     height: 56,
//                     mb: 2
//                   }}>
//                     {feature.icon}
//                   </Avatar>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {feature.title}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     {feature.desc}
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* CTA Section */}
//       <Box sx={{ 
//         bgcolor: 'background.paper', 
//         py: 8,
//         borderTop: `1px solid ${theme.palette.divider}`,
//         borderBottom: `1px solid ${theme.palette.divider}`
//       }}>
//         <Container maxWidth="lg">
//           <Grid container alignItems="center" spacing={6}>
//             <Grid item xs={12} md={6}>
//               <img 
//                 src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
//                 alt="Medical Store Owner" 
//                 style={{
//                   width: '100%',
//                   borderRadius: '15px',
//                   boxShadow: theme.shadows[4]
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 Are You a Medical Store Owner?
//               </Typography>
//               <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//                 Join Quick Meds to increase your visibility and connect with more customers in Lucknow.
//                 Manage your store information, delivery status, and opening hours in real-time.
//               </Typography>
//               <List sx={{ mb: 3 }}>
//                 <ListItem disableGutters>
//                   <ListItemIcon sx={{ minWidth: '40px' }}>
//                     <Dashboard color="primary" />
//                   </ListItemIcon>
//                   <ListItemText primary="Easy-to-use dashboard" />
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <ListItemIcon sx={{ minWidth: '40px' }}>
//                     <MedicalServices color="primary" />
//                   </ListItemIcon>
//                   <ListItemText primary="Real-time status updates" />
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <ListItemIcon sx={{ minWidth: '40px' }}>
//                     <VerifiedUser color="primary" />
//                   </ListItemIcon>
//                   <ListItemText primary="Verified store badge" />
//                 </ListItem>
//               </List>
//               <Button
//                 component={Link}
//                 to="/register"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 startIcon={<PersonAdd />}
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: '50px',
//                   fontSize: '1.1rem',
//                   fontWeight: 'bold'
//                 }}
//               >
//                 Register Your Store
//               </Button>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             <Typography variant="h6" color="primary">
//               Quick Meds
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Currently serving Lucknow, Uttar Pradesh
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button 
//               component={Link}
//               to="/stores"
//               variant="outlined"
//               color="primary"
//               size="large"
//               sx={{
//                 borderRadius: '50px',
//                 px: 4
//               }}
//             >
//               Find Stores Now
//             </Button>
//           </Grid>
//         </Grid>
//         <Divider sx={{ my: 3 }} />
//         <Typography variant="body2" color="text.secondary" align="center">
//               © {new Date().getFullYear()} Quick Meds. All rights reserved.
//             </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default QuickMedsHome;




import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocalPharmacy,
  MedicalServices,
  DeliveryDining,
  AccessTime,
  Phone,
  Map,
  VerifiedUser,
  PersonAdd,
  Dashboard
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const QuickMedsHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    { icon: <LocalPharmacy />, title: "Real-time Store Status", desc: "See which medical stores are open right now" },
    { icon: <DeliveryDining />, title: "Delivery Availability", desc: "Filter stores that offer delivery services" },
    { icon: <AccessTime />, title: "24/7 Access", desc: "Find emergency medical stores anytime" },
    { icon: <Phone />, title: "Direct Contact", desc: "One-tap calling to stores" },
    { icon: <Map />, title: "Lucknow Coverage", desc: "Comprehensive coverage across the city" },
    { icon: <VerifiedUser />, title: "Verified Listings", desc: "All stores are verified for authenticity" },
  ];

  return (
    <Box sx={{ 
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        py: 8,
        width: '100%',
        textAlign: 'center'
      }}>
        <Container maxWidth="lg" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Box sx={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4
          }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Quick Meds
            </Typography>
            <Button 
              component={Link}
              to="/register"
              variant="contained" 
              color="secondary"
              size="large"
              startIcon={<PersonAdd />}
              sx={{
                borderRadius: '50px',
                boxShadow: 4,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 6
                },
                transition: 'all 0.3s ease'
              }}
            >
              Register Your Store
            </Button>
          </Box>

          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12} md={6} sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant={isMobile ? 'h4' : 'h2'} fontWeight="bold" gutterBottom>
                  Find Medicine When You Need It Most
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                  Connecting Lucknow with reliable medical stores in real-time
                </Typography>
                <Button
                  component={Link}
                  to="/stores"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Find Stores Near You
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  padding: '20px',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  maxWidth: '600px',
                  width: '100%'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Medical Store" 
                  style={{
                    width: '100%',
                    borderRadius: '15px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ 
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center' }}>
          Why Choose Quick Meds?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ 
          mb: 6,
          textAlign: 'center',
          maxWidth: '700px'
        }}>
          The most reliable way to find medicines in Lucknow
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '350px' }}
              >
                <Paper elevation={3} sx={{ 
                  p: 3, 
                  height: '100%',
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[6]
                  }
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      width: 56, 
                      height: 56,
                      mb: 2
                    }}>
                      {feature.icon}
                    </Avatar>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ textAlign: 'center' }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                    {feature.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        py: 8,
        width: '100%',
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Container maxWidth="lg" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Grid container alignItems="center" spacing={6} justifyContent="center">
            <Grid item xs={12} md={6} sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Medical Store Owner" 
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '15px',
                  boxShadow: theme.shadows[4]
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' }
            }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Are You a Medical Store Owner?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ 
                mb: 3,
                maxWidth: '600px'
              }}>
                Join Quick Meds to increase your visibility and connect with more customers in Lucknow.
                Manage your store information, delivery status, and opening hours in real-time.
              </Typography>
              <List sx={{ 
                mb: 3,
                width: '100%',
                maxWidth: '500px'
              }}>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <Dashboard color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Easy-to-use dashboard" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <MedicalServices color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Real-time status updates" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <VerifiedUser color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Verified store badge" />
                </ListItem>
              </List>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<PersonAdd />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Register Your Store
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Container maxWidth="lg" sx={{ 
        py: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" color="primary" sx={{ textAlign: 'center' }}>
              Quick Meds
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Currently serving Lucknow, Uttar Pradesh
            </Typography>
          </Grid>
          <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                component={Link}
                to="/stores"
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  borderRadius: '50px',
                  px: 4
                }}
              >
                Find Stores Now
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ 
          my: 3,
          width: '100%'
        }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Quick Meds. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default QuickMedsHome;