import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import moment from 'moment';

const Profile = () => {
  return (
    <Stack
      className="bg-gray-100 h-full border-l-2 flex items-center  border-gray-300"
      spacing={'2rem'}
      direction={'column'}
      alignItems={'center'}
      p={2}
    >
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: 'contain',
          mb: 2,
        }}
      />

      <ProfileCard
        heading="Bio"
        text="dsad hkashd ajdhk jkhasdkhk jkhsdkaj"
        icon={<CalendarIcon />}
      />

      <ProfileCard
        heading="Username"
        text="dsad hkashd ajdhk jkhasdkhk jkhsdkaj"
        icon={<UserNameIcon />}
      />

      <ProfileCard heading="Face" text="dsad hkashd ajdhk jkhasdkhk jkhsdkaj" icon={<FaceIcon />} />
      <ProfileCard
        heading="joined"
        text={moment('2025-05-04T18:30:00.000Z').fromNow()}
        icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ heading, text, icon }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      color="black"
      textAlign="left"
      width="100%"
    >
      {icon && <>{icon}</>}
      <Stack>
        <Typography variant="body1" color="black" fontWeight="bold">
          {heading}
        </Typography>
        <Typography variant="caption" color="gray">
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
