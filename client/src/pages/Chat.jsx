import React from 'react';
import Applayout from '../components/layout/Applayout';
import { Box, Stack, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AttachFile, Send } from '@mui/icons-material';

import { InputBox } from '../components/styles/InputBox';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessages } from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: 'user_002',
  name: 'abhishek',
};

const Chat = () => {
  const ContainerRef = React.useRef(null);
  const FilemenuRef = React.useRef(null);

  return (
    <Stack className="relative" height="100%" bgcolor={grey[100]} sx={{ overflow: 'hidden' }}>
      <Box
        boxSizing={'border-box'}
        sx={{
          flexGrow: 1,
          p: 2,
          spacing: '1rem',
          padding: '1rem',
          overflowX: 'hidden',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        ref={ContainerRef}
      >
        {/* message render */}
        {sampleMessages.map((item, index) => (
          <>
            <MessageComponent key={index} message={item} user={user} />
          </>
        ))}
      </Box>

      <Box
        component="form"
        sx={{
          px: 2,
          py: 1.2,
          borderTop: `1px solid ${grey[300]}`,
          backgroundColor: '#fff',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton ref={FilemenuRef}>
            <AttachFile />
          </IconButton>

          <Box height={'2rem'} sx={{ flexGrow: 1 }}>
            <InputBox height={'2rem'} placeholder="Type a message…" />
          </Box>

          <IconButton
            sx={
              {
                // rotate:"-30deg"
              }
            }
            type="submit"
            color="primary"
          >
            <Send />
          </IconButton>
        </Stack>
      </Box>
      <FileMenu />
    </Stack>
  );
};

export default Applayout(Chat);
