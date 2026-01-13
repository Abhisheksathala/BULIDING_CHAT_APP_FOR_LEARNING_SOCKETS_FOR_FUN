import React from 'react';
import {Grid} from '@mui/material';


const SideBar = () => {
    return (
        <>
            <div>
                sidebar
            </div>
        </>
    )
}


const AdminLayout = ({children}) => {
    return (
        <Grid container minHeight="100vh">
            {/* Sidebar */}
            <Grid
                item
                md={4}
                lg={3}
                sx={{display: {xs: 'none', md: 'block'}}}
            >
                {/* Sidebar content here */}
                <SideBar/>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={8} lg={9} sx={{bg: "#f5f5f5"}}>
                {children}
            </Grid>
        </Grid>
    );
};

export default AdminLayout;
