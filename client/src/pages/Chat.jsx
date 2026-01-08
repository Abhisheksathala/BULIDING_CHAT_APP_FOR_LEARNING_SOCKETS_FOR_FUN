import React from 'react';
import Applayout from '../components/layout/Applayout';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AttachFile, Send } from '@mui/icons-material';

// 
import InputBox from "../"

const Chat = () => {
  const ContainerRef = React.useRef(null);
  return (
    <Stack
      ref={ContainerRef}
      boxSizing={'border-box'}
      padding={'1rem'}
      spacing={'1rem'}
      height={'90%'}
      bgColor={grey}
      sx={{
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <from style={{ height: '10%' }}>
        <Stack>
          <IconButton>
            <AttachFile />
          </IconButton>
          {/* <InputBox /> */}
          <IconButton>
            <Send />
          </IconButton>
        </Stack>
      </from>
    </Stack>
  );
};

export default Applayout(Chat);
