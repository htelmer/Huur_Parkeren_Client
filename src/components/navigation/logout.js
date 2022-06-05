import React from "react";
import NavbarItem from "./NavbarItem";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}
