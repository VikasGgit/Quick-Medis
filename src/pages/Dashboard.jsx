import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyStores, fetchStores } from '../features/stores/storeSlice';
import StoreList from '../components/stores/StoreList';
import { Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import AddStoreForm from '../components/stores/AddStoreForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("state", user)
  useEffect(() => {
    dispatch(fetchMyStores());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className="py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4">
            {user?.role === 'admin' ? 'Admin Dashboard' : 'My Stores'}
          </Typography>
          <AddStoreForm />
        </div>
        
        <StoreList />
      </motion.div>
    </Container>
  );
};

export default Dashboard;