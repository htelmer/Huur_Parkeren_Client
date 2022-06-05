import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/slice";
import { selectUser } from "../../store/user/selectors";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("user?", user);
  return (
    <>
      <MenuItem>
        Welcome {user?.firstName} {user?.lastName}
      </MenuItem>
      <Button
        sx={{
          underline: "none",
          backgroundColor: "#F9F8F4",
        }}
        onClick={() => dispatch(logOut())}
      >
        Logout
      </Button>
    </>
  );
}
