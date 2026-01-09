import { AvatarGroup, Avatar, Box, Stack } from '@mui/material';
import React from 'react';
import { transformImage } from '../lib/features';

const AvaterCard = ({ avater = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup>
        <Box width={'5rem'} height={'3rem'}>
          {avater.map((i, index) => {
            return (
              <Avatar
                key={Math.random() * 100}
                src={transformImage(i)}
                alt={i}
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
