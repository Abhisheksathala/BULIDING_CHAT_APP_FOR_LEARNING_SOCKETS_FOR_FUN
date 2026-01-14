import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayOut";
import Table from "../../components/shared/Table";
import { renderActionsCell } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avater",
    headerName: "Avater",
    headerClassName: "table-header",
    width: 150,
    renderActionsCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avater} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 150,

  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 150,

  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "group",
    headerName: "Group",
    headerClassName: "table-header",
    width: 150,
  },
];

const Usermanagement = () => {
  const [rows, setRows] = useState([]);

  return (
    <>
      <AdminLayout>
        <Table heading={"all users"} columns={columns} rows={rows} />
      </AdminLayout>
    </>
  );
};

export default Usermanagement;
