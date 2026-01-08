import React, { memo } from 'react';
import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  ListItem,
  Avatar,
  Button,
  TextField,
} from '@mui/material';
import { userChatData } from '../constants/sampleData';
import { grey, blue } from '@mui/material/colors';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';

const NewGroup = () => {
  const users = userChatData ?? [];

  const groupName = useInputValidation('');

  const [members, setMembers] = React.useState(users);
  const [selectedMembers, setSelectedMembers] = React.useState([]);

  const selectMemberhandler = (id) => {
    // setMembers((prev) =>
    //   prev.map((user) => (user._id === id ? { ...user, isAdded: !user.isAdded } : user)),
    // );
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currentElemt) => currentElemt !== id) : [...prev, id],
    );
  };

  const submitHandler = () => {};

  const closeHandler = () => {};

  return (
    <Dialog open={open} onClose={() => {closeHandler}}>
      <Stack
        p={{
          xs: '1rem',
          sm: '3rem',
        }}
        sx={{
          width: { xs: '22rem', sm: '32rem' },
        }}
        spacing={'2rem'}
      >
        <DialogTitle>NewGroup</DialogTitle>
        <TextField
          id="search"
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography>Members</Typography>
        <Stack>
          {members && members?.length > 0 ? (
            <>
              {members.map((i) => {
                return (
                  <>
                    <UserItem
                      user={i}
                      key={i._id}
                      handler={selectMemberhandler}
                      isAdded={selectedMembers.includes(i._id)}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <>
              <p>No Group</p>
            </>
          )}
        </Stack>
        <Stack
          diraction={'row'}
          sx={{
            gap: '0.5rem',
          }}
        >
          <Button
            sx={{
              color: 'black',
              backgroundColor: grey[300],
              '&:hover': {
                backgroundColor: grey[400],
              },
            }}
            variant="text"
          >
            cancel
          </Button>
          <Button
            sx={{
              color: 'white',
              bgcolor: 'blue',
              '&:hover': {
                backgroundColor: blue[800],
              },
            }}
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
