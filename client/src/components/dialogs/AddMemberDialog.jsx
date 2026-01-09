import React from 'react'
import {Button, Dialog, DialogTitle, Stack, Typography} from "@mui/material"
import {userChatData} from "../constants/sampleData.js";
import UserItem from "../shared/UserItem.jsx";

const AddMemberDialog = ({addMember, isLoadingAddMemer, ChatId}) => {

    const addFriendHandler = () => {

    }
    const addFrienSubmitdHandler = () => {

    }
    const closeHandler = () => {

    }

    return (

        <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
                <Stack>
                    {
                        userChatData.length > 0 ? userChatData.map((i) => {
                            return (
                                <UserItem user={i} handler={addFriendHandler}/>
                            )
                        }) : <Typography textAlign={"center"}>No Friends </Typography>
                    }
                </Stack>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Button color={"error"} onClick={() => closeHandler()}>Cancle</Button>
                    <Button onClick={() => addFrienSubmitdHandler()} variant={"contained"} disabled={isLoadingAddMemer}>Submit
                        Changes</Button>
                </Stack>
            </Stack>
        </Dialog>

    )
}
export default AddMemberDialog
