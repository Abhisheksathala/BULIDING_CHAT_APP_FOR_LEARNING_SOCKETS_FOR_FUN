import React, { memo } from 'react';
import {
  Dialog,
  Stack,
  DialogTitle,
  List,
  ListItemText,
  ListItem,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';

import AvaterCard from '../shared/AvaterCard';
import { Add } from '@mui/icons-material';

const UserItem = ({ user, handler, handlerIsLoading }) => {
  const { name, _id, avater } = user;
  return (
    <ListItem>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
          color="initial"
        >
          {name}
        </Typography>
        {/*  */}
        <IconButton size="small" onClick={() => handler(_id)} disabled={handlerIsLoading}>
          <Add />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
