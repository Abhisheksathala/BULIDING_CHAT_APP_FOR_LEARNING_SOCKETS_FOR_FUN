import React, { memo } from 'react';
import { Dialog, Stack, DialogTitle, Typography, ListItem, Avatar, Button } from '@mui/material';
import { grey,blue } from '@mui/material/colors';

const Notifications = ({ open = true }) => {
  const [notifications, setNotifications] = React.useState([
    {
      sender: {
        avatar: 'https://via.placeholder.com/40',
        name: 'Abhi',
        _id: '2',
      },
      _id: '1',
    },
    {
      sender: {
        avatar: 'https://via.placeholder.com/40',
        name: 'Abhi',
        _id: '2',
      },
      _id: '1',
    },
  ]);

  const FriendRequestHandler = ({ _id, accept }) => {
    console.log('Friend Request:', { _id, accept });
  };

  return (
    <Dialog open={open} onClose={() => {}}>
      <Stack
        p={{
          xs: '1.5rem',
          sm: '2rem',
        }}
        sx={{
          width: { xs: '22rem', sm: '32rem' },
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

const NotifictionItem = memo(({ sender, _id, handler }) => {
  return (
    <ListItem>
      <Stack direction="row" alignItems="center" spacing="1rem" width="100%">
        <Avatar src={sender.avatar} alt={sender.name} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {`${sender.name} sent you a friend request`}
        </Typography>

        {/* Buttons section */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button
            sx={{
              color: 'white',
              bgcolor: "blue",
              '&:hover': {
                backgroundColor: blue[800],
              },
            }}
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>

          <Button
            sx={{
              color: 'black',
              backgroundColor: grey[300],
              '&:hover': {
                backgroundColor: grey[400],
              },
            }}
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
