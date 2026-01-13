import React, {memo} from 'react';
import {Avatar, IconButton, ListItem, Stack, Typography,} from '@mui/material';
import {Add, Remove} from '@mui/icons-material';

const UserItem = ({user, handler, handlerIsLoading, isAdded = false, styling}) => {

    // , isAdded = false

    const {name, _id, avater} = user;

    return (
        <ListItem disablePadding>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                padding={"0.5rem"}
                sx={{width: '100%'}}
                {...styling}
            >
                <Avatar/>

                {/* Name takes remaining space */}
                <Typography
                    variant="body1"
                    sx={{
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {name}
                </Typography>

                {/* Button stays at end */}
                <IconButton
                    size="small"
                    onClick={() => handler(_id)}
                    disabled={handlerIsLoading}
                    sx={{
                        bgcolor: isAdded ? 'error.main' : 'blue',
                        color: '#fff',
                        transition: 'all 0.2s ease',

                        '&:hover': {
                            bgcolor: isAdded ? 'error.dark' : 'blue ',
                            transform: 'scale(1)',
                        },

                        '&:disabled': {
                            bgcolor: 'grey.400',
                        },
                    }}
                >
                    {isAdded ? <Remove/> : <Add/>}
                </IconButton>
            </Stack>
        </ListItem>
    );
};

export default memo(UserItem);
