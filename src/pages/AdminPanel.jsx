import React from 'react';
import { Container, Typography } from '@mui/material';
import UserList from '../components/admin/UserList';

const AdminPanel = () => {
  return (
    <Container maxWidth="lg" className="py-6">
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <UserList />
    </Container>
  );
};

export default AdminPanel;