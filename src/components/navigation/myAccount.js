import React from "react";
import NavbarItem from "./NavbarItem";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function MyAccount() {
  return (
    <>
      <Link to="/myAccount">
        <MenuItem
          sx={{
            underline: "none",
            backgroundColor: "#F9F8F4",
          }}
        >
          My Account{" "}
        </MenuItem>
      </Link>
    </>
  );
}
