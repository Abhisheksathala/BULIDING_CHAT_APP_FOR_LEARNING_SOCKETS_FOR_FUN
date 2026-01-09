import React, {memo, Suspense} from 'react';
import {Box, Button, Drawer, IconButton, Stack, TextField, Tooltip, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';
import {Add, Delete, Done, Edit, KeyboardBackspace, Menu} from '@mui/icons-material';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import AvaterCard from '../components/shared/AvaterCard';
import {userChatData} from '../components/constants/sampleData';


const ConfrimDeleteDialog = React.lazy(() => import("../components/dialogs/ConfrimDeleteDialog.jsx"))

const Groups = () => {
    const [isMobileopen, setIsmobileopen] = React.useState(false);

    const [isEdit, setIsEdit] = React.useState(false);
    const [groupName, setGroupName] = React.useState('');
    const [groupNameUpdatedValue, setGroupNameUpdateValue] = React.useState('');
    const [conformDeleteDilog, setConfomDeleteDilog] = React.useState(false)


    const chatId = useSearchParams()[0].get('group');
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

    const openConformDeleteHandler = () => {
        setConfomDeleteDilog(true)
    }
    const CloseConformDeleteHandler = () => {
        setConfomDeleteDilog(false)
    }

    const deleteHandler = () => {
        CloseConformDeleteHandler()
    }


    const openAddMemberHandler = () => {
    }

    const updateGroupName = () => {
        setIsEdit(false);
        console.log('update group name');
    };

    React.useEffect(() => {
        setGroupName(`name ${chatId}`)
        setGroupNameUpdateValue(`name ${chatId}`)
        return () => {
            setGroupName(``)
            setGroupNameUpdateValue(``)
            setIsEdit(false)
        }
    }, [chatId])

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
                    <Menu/>
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
                    <KeyboardBackspace/>
                </IconButton>
            </Tooltip>
        </>
    );

    const GroupName = () => {
        return (
            <>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={'1rem'}
                    padding={'3rem'}
                >
                    {isEdit ? (
                        <>
                            <TextField
                                value={groupNameUpdatedValue}
                                onChange={(e) => {
                                    setGroupNameUpdateValue(e.target.value);
                                }}
                            />
                            <IconButton aria-label="" onClick={updateGroupName}>
                                <Done/>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4">{
                                groupName
                            }</Typography>
                            <IconButton onClick={() => setIsEdit(true)}>
                                <Edit/>
                            </IconButton>
                        </>
                    )}
                </Stack>
            </>
        );
    };


    const ButtonGroup = () => {
        return (
            <>
                <Stack
                    direction={{
                        sm: "row",
                        xs: "column-reverse"
                    }}
                    spacing={"1rem"}
                    p={{
                        sm: "1rem",
                        zs: "0",
                        md: "1rem 4rem"
                    }}
                >
                    <Button onClick={openConformDeleteHandler} size={"large"} color={"error"} startIcon={<Delete/>}>Delete
                        Group</Button>
                    <Button onClick={openAddMemberHandler} size={"large"} variant={"contained"} startIcon={<Add/>}>Add
                        Member</Button>
                </Stack>
            </>
        )
    }

    return (
        <Box sx={{display: 'flex', height: '100vh', width: '100%'}}>
            {/* Left Panel - Fixed width */}
            <Box
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    width: '30%',
                    borderRight: `1px solid ${grey[300]}`,
                    p: 2,
                }}
            >
                <GroupList myGroup={userChatData} chatId={chatId}/>
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
                <BackButton/>
                {
                    groupName && <>
                        <GroupName/>
                        <Typography margin={"2rem"} alignItems={"flex-start"} variant={"body1"}>

                        </Typography>
                        <Stack maxWidth={"45rem"} width={"100%"} boxSizing={"border-box"} padding={{
                            sm: "1rem",
                            xs: "0",
                            md: "1rem 4rem"
                        }} spacing={"2rem"} bgcolor={`${grey[300]}`} height={"50vh"} overflow={"auto"}>
                            {/*member*/}
                        </Stack>
                        <ButtonGroup/>
                    </>

                }
            </Box>
            {
                conformDeleteDilog && <>
                    <Suspense fallback={<div>Loading....</div>}>
                        <ConfrimDeleteDialog open={conformDeleteDilog} handleCLose={CloseConformDeleteHandler}
                                             deleteHandler={deleteHandler}

                        />
                    </Suspense>
                </>
            }
            <Drawer
                open={isMobileopen}
                onClose={handleMobileClose}
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'none',
                    },
                }}
            ><GroupList myGroup={userChatData} w={'70vw'} chatId={chatId}/>
            </Drawer>
        </Box>
    );
};

const GroupList = ({w = '100%', myGroup = [], chatId}) => {
    return (
        <Stack width={w}>
            {myGroup.length > 0 ? (
                myGroup.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id}/>)
            ) : (
                <Typography textAlign="center" padding="1rem">
                    No Groups
                </Typography>
            )}
        </Stack>
    );
};

const GroupListItem = memo(({group, chatId}) => {
    const {name, avater, _id} = group;

    return (
        <Link
            to={`?group=${_id}`}
            onClick={(e) => {
                if (chatId === _id) e.preventDefault();
            }}
            // underline="none"q
            // color="inherit"
        >
            <Stack>
                <AvaterCard avater={avater}/>
                <Typography>{name}</Typography>
            </Stack>
        </Link>
    );
});

export default Groups;
