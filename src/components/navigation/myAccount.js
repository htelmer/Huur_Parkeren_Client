import React from "react";
import NavbarItem from "./NavbarItem";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";

export default function MyAccount() {
  return (
    <>
      <Grid justifyContent="flex-end">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          href="/myAccount"
          justifyContent="flex-end"
        >
          <AccountCircle />
        </IconButton>
      </Grid>
    </>
  );
}
