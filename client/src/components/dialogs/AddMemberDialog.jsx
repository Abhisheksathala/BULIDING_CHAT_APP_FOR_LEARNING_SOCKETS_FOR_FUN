import React from 'react';
import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import { userChatData } from '../constants/sampleData.js';
import UserItem from '../shared/UserItem.jsx';

const AddMemberDialog = ({ addMember, isLoadingAddMemer, ChatId }) => {

    const [members, setMembers] = React.useState(userChatData);
    const [selectedMembers, setSelectedMembers] = React.useState([]);

    const selectMemberhandler = (id) => {
      // setMembers((prev) =>
      //   prev.map((user) => (user._id === id ? { ...user, isAdded: !user.isAdded } : user)),
      // );
      setSelectedMembers((prev) =>
        prev.includes(id) ? prev.filter((currentElemt) => currentElemt !== id) : [...prev, id],
      );
    };

  const addFriendHandler = () => {};
  const addFrienSubmitdHandler = () => {};
  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
        <Stack>
          {userChatData.length > 0 ? (
            userChatData.map((i) => {
              return <UserItem user={i} isAdded={selectedMembers} handler={selectMemberhandler} />;
            })
          ) : (
            <Typography textAlign={'center'}>No Friends </Typography>
          )}
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
          <Button color={'error'} onClick={() => closeHandler()}>
            Cancle
          </Button>
          <Button
            onClick={() => addFrienSubmitdHandler()}
            variant={'contained'}
            disabled={isLoadingAddMemer}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default AddMemberDialog;
