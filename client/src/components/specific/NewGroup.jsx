import React, { memo } from 'react';
import { Dialog, Stack, DialogTitle, Typography, ListItem, Avatar, Button } from '@mui/material';
import { grey } from '@mui/material/colors';

const NewGroup = () => {
  return (
    <Dialog open={open} onClose={() => {}}>
      <Stack
        p={{
          xs: '1.5rem',
          sm: '2rem',
        }}
        sx={{
          width: { xs: '22rem', sm: '32rem' }, // ⬅️ made it wider
        }}
      >
        <DialogTitle>Notifications</DialogTitle>

        {notifications && notifications.length > 0 ? (
          <>
            {notifications.map(({ sender, _id }) => (
              <NotifictionItem key={_id} sender={sender} _id={_id} handler={FriendRequestHandler} />
            ))}
          </>
        ) : (
          <Typography textAlign="center">0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
