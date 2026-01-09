import React, { memo } from 'react';
import { Grid, Box, Tooltip, IconButton, Drawer, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { KeyboardBackspace, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AvaterCard from '../components/shared/AvaterCard';
import { userChatData } from '../components/constants/sampleData';
import {Link} from "react-router-dom"

const Groups = () => {
  const [isMobileopen, setIsmobileopen] = React.useState(false);

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate('/');
  };

  const handleMobile = () => {
    setIsmobileopen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsmobileopen(false);
  };

  const BackButton = () => (
    <>
      <Tooltip title="Menu">
        <IconButton
          onClick={handleMobile}
          sx={{
            display: {
              xs: 'block',
              sm: 'none',
              position: 'fixed',
              top: '1rem',
              right: '1rem',
              color: 'black',
              '&:hover': {
                bgcolor: grey[400],
              },
            },
          }}
        >
          <Menu />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Back"
        onClick={() => {
          navigateBack();
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: grey[300],
            color: 'black',
            '&:hover': {
              bgcolor: grey[400],
            },
          }}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* Left Panel - Fixed width */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: '30%',
          borderRight: `1px solid ${grey[300]}`,
          p: 2,
        }}
      >
        <GroupList myGroup={userChatData} w={'50vw'} chatId={'ada'} />
      </Box>

      {/* Right Panel - Takes remaining space */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          p: '1rem 3rem',
          width: '70%',
        }}
      >
        <BackButton />
      </Box>

      <Drawer
        open={isMobileopen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          },
        }}
      ></Drawer>
    </Box>
  );
};

const GroupList = ({ w = '100%', myGroup = [], chatId }) => {
  return (
    <Stack width={w}>
      {myGroup.length > 0 ? (
        myGroup.map((group) => (
          <GroupListItem
            group={group}
            chatId={chatId}
            key={group._id}
          />
        ))
      ) : (
        <Typography textAlign="center" padding="1rem">
          No Groups
        </Typography>
      )}
    </Stack>
  );
};


const GroupListItem = memo(({ group, chatId }) => {
  const { name, avater, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      // underline="none"
      // color="inherit"
    >
      <Stack>
        <AvaterCard avater={avater} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});


export default Groups;
