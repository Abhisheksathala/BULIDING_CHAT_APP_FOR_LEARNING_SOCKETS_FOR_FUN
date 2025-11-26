import { AvatarGroup, Avatar, Box, Stack } from '@mui/material';
import React from 'react';

const AvaterCard = ({ avater = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup>
        <Box width={'5rem'} height={'3rem'}>
          {avater.map((src, index) => {
            return (
              <Avatar
                key={Math.random() * 100}
                src={src}
                alt={src}
                sx={{
                  width: '3rem',
                  height: '3rem',
                  position: 'absolute',
                  left: {
                    xs: `${0.5 + index}rem`,
                    sm: `${index}rem`,
                  },
                }}
              />
            );
          })}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvaterCard;
