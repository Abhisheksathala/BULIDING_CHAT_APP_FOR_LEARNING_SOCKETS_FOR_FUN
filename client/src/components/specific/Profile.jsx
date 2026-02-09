import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { transformImage } from '../lib/features';

const Profile = () => {

  const { user } = useSelector((state) => state.auth);
 
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
        src={transformImage(user?.avater?.url)}
      />

      <ProfileCard
        heading="Bio"
        text={user?.bio}
        icon={<CalendarIcon />}
      />

      <ProfileCard
        heading="Username"
        text={user?.name}
        icon={<UserNameIcon />}
      />

      <ProfileCard heading="Face" text="dsad hkashd ajdhk jkhasdkhk jkhsdkaj" icon={<FaceIcon />} />
      <ProfileCard
        heading="joined"
        text={moment(user?.createdAt).fromNow()}
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
