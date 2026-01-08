import React, { memo } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Applayout from '../components/layout/Applayout';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa, #e4ecf5)',
      }}
    >
      <Box
        sx={{
          px: 4,
          py: 5,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          component="img"
          src="https://img.icons8.com/?format=png&id=112795&size=256w"
          alt="chat icon"
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            mx: 'auto',
          }}
        />

        <Typography variant="h5" fontWeight={600} color="text.primary">
          Nothing to see yet
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1, maxWidth: 280, mx: 'auto' }}
        >
          Pick a friend on the left to start chatting and watch the magic happen.
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Applayout(Home));
