import React from "react";
import NavbarItem from "./NavbarItem";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function LoggedOut() {
  return (
    <>
      <Button
        sx={{
          underline: "none",
          backgroundColor: "#F9F8F4",
        }}
        href="/login"
      >
        Login
      </Button>
    </>
  );
}
