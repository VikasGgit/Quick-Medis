import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
  useMediaQuery
} from '@mui/material';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { token } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) return <CircularProgress className="mx-auto my-8" />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <TableContainer component={Paper} className="shadow-sm">
      <Table size={isMobile ? 'small' : 'medium'}>
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            {!isMobile && <TableCell>Role</TableCell>}
            {!isMobile && <TableCell>Region</TableCell>}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              {!isMobile && <TableCell>{user.role}</TableCell>}
              {!isMobile && <TableCell>{user.region || '-'}</TableCell>}
              <TableCell>
                <Button size="small" color="secondary">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;