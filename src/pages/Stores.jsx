import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores } from '../features/stores/storeSlice';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  TextField,
  Pagination,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { motion } from 'framer-motion';

const Store = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.stores);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const filteredStores = items.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStores = filteredStores.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);

  // Truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Container maxWidth="lg" sx={{ 
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        style={{ width: '100%', textAlign: 'center' }}
      >
        <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          🏥 Find Nearby Medical Stores
        </Typography>
      </motion.div>

      {/* Search Bar */}
      <div style={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <TextField
          variant="outlined"
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          sx={{ 
            width: isMobile ? '100%' : isTablet ? '75%' : '50%',
            maxWidth: '600px'
          }}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '200px'
        }}>
          <CircularProgress size={40} />
        </div>
      ) : paginatedStores.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No stores found matching your search.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '100%'
          }}>
            {paginatedStores.map((store, index) => (
              <Grid item xs={12} sm={6} md={4} key={store._id} sx={{ 
                display: 'flex',
                justifyContent: 'center'
              }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ 
                    width: '100%',
                    maxWidth: '350px',
                    height: '100%'
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: '#f9fafb',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                      height: '100%',
                      borderRadius: '16px',
                      boxShadow: 2,
                      '&:hover': { boxShadow: 4 },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Store Name with Tooltip */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '12px'
                      }}>
                        <LocalPharmacyIcon color="primary" sx={{ mr: 1 }} />
                        <Tooltip title={store.name} arrow>
                          <Typography 
                            variant="h6" 
                            fontWeight="bold" 
                            sx={{ 
                              fontSize: isMobile ? '1rem' : '1.1rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '250px'
                            }}
                          >
                            {store.name}
                          </Typography>
                        </Tooltip>
                      </div>

                      {/* Address with Tooltip */}
                      <Tooltip title={store.address} arrow>
                        <Typography 
                          color="text.secondary" 
                          sx={{ 
                            mb: 2, 
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '60px'
                          }}
                        >
                          {store.address}
                        </Typography>
                      </Tooltip>

                      {/* Status Info */}
                      <div style={{ marginBottom: '12px' }}>
                        <Typography 
                          color={store.deliveryAvailable ? 'success.main' : 'text.secondary'} 
                          sx={{ 
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            mb: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {store.deliveryAvailable
                            ? '🎉 Delivery Available'
                            : '🚫 Delivery not available'}
                        </Typography>
                        <Typography 
                          color={store.status === 'open' ? 'primary.main' : 'error.main'} 
                          sx={{ 
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {store.status === 'open'
                            ? '🟢 Currently Open'
                            : '🔴 Currently Closed'}
                        </Typography>
                      </div>

                      {/* Chips */}
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        flexWrap: 'wrap', 
                        margin: '12px 0' 
                      }}>
                        <Chip
                          icon={<DeliveryDiningIcon />}
                          label={isMobile ? 'Delivery' : 'Delivery Status'}
                          color={store.deliveryAvailable ? 'success' : 'default'}
                          size={isMobile ? 'small' : 'medium'}
                        />
                        <Chip
                          icon={<StorefrontIcon />}
                          label={isMobile ? 'Status' : 'Store Status'}
                          color={store.status === 'open' ? 'primary' : 'error'}
                          size={isMobile ? 'small' : 'medium'}
                        />
                      </div>

                      {/* Contact */}
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          fontSize: isMobile ? '0.8rem' : '0.9rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        📞{' '}
                        <a 
                          href={`tel:+91${store.contact}`} 
                          style={{ 
                            color: '#1976d2', 
                            textDecoration: 'underline' 
                          }}
                        >
                          {store.contact}
                        </a>
                      </Typography>
                    </CardContent>

                    {/* Order Button */}
                    <CardActions sx={{ 
                      justifyContent: 'center', 
                      pb: 2,
                      px: 2
                    }}>
                      <Button
                        size={isMobile ? 'small' : 'medium'}
                        variant="contained"
                        color="primary"
                        fullWidth
                        component="a"
                        href={`tel:+91${store.contact}`}
                        sx={{ 
                          borderRadius: '20px', 
                          textTransform: 'none',
                          fontSize: isMobile ? '0.8rem' : '0.9rem'
                        }}
                      >
                        {isMobile ? 'Call Now' : 'Order Now'}
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '24px',
              width: '100%'
            }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Store;

