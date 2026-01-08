import React from 'react';
import Applayout from '../components/layout/Applayout';
import { Box, Stack, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AttachFile, Send } from '@mui/icons-material';

import { InputBox } from '../components/styles/InputBox';
import FileMenu from '../components/dialogs/FileMenu';

const Chat = () => {
  const ContainerRef = React.useRef(null);

  return (
    <Stack ref={ContainerRef} height="100%" bgcolor={grey[100]} sx={{ overflow: 'hidden' }}>
      <Box
        boxSizing={'border-box'}
        sx={{
          flexGrow: 1,
          p: 2,
          spacing: '1rem',
          padding: '1rem',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {/* message render */}
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
          <IconButton>
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
