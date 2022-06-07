import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./login";
import LoggedOut from "./logout";
import MyAccount from "./myAccount";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

const theme = createTheme({
  status: {
    palette: {
      primary: {
        main: "#0097a7",
      },
      secondary: {
        main: "#827717",
      },
    },
  },
});

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
  const myAccount = token ? <MyAccount /> : null;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HuurParkeren
            </Typography>
            <Grid style={{ marginLeft: "auto" }}>
              <Button variant="outlined" sx={{ color: "inherit" }}>
                {loginLogoutControls}
              </Button>
              <Button variant="outlined" sx={{ color: "inherit" }}>
                {myAccount}
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
    </ThemeProvider>
  );
}
