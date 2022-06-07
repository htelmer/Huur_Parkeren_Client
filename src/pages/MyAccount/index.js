import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { getUserWithStoredToken } from "../../store/user/actions";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EmojiTransportationTwoToneIcon from "@mui/icons-material/EmojiTransportationTwoTone";
import { Link as RouterLink } from "react-router-dom";

export default function MyAccount() {
  const dispatch = useDispatch();
  const areas = useSelector(selectUser);
  console.log("selectors", areas);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  return (
    <div>
      <h1>My account</h1>
      <Grid item xs={12} md={6} p={2} sx={{ m: 1, width: "70ch" }}>
        <CardActionArea
          component={RouterLink}
          to="/MyAccount/SavedAreas"
          justifyContent="center"
        >
          <Card sx={{ display: "flex" }}>
            <FavoriteIcon color="error" sx={{ m: 1 }} />
            <CardContent sx={{ flex: 1 }} justifyContent="flex-end">
              <Typography component="h2" variant="h5">
                {" "}
                Saved Parking Areas
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                You can view and manage the areas that you added your favorites
              </Typography>
              <Typography variant="subtitle1" color="primary">
                View Details
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <Grid item xs={12} md={6} p={2} sx={{ m: 1, width: "70ch" }}>
        <CardActionArea
          component={RouterLink}
          to="/MyAccount/NewParkingArea"
          justifyContent="center"
        >
          <Card sx={{ display: "flex" }}>
            <FileUploadIcon color="#2e7d32" sx={{ m: 1 }} />
            <CardContent sx={{ flex: 1 }} justifyContent="flex-end">
              <Typography component="h2" variant="h5">
                {" "}
                New Parking Area
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                If you want to rent your parking area please add it from here
              </Typography>
              <Typography variant="subtitle1" color="primary">
                View Details
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <Grid item xs={12} md={6} p={2} sx={{ m: 1, width: "70ch" }}>
        <CardActionArea
          component={RouterLink}
          to="/MyAccount/MyParkingArea"
          justifyContent="center"
        >
          <Card sx={{ display: "flex" }}>
            <EmojiTransportationTwoToneIcon color="primary" sx={{ m: 1 }} />
            <CardContent sx={{ flex: 1 }} justifyContent="flex-end">
              <Typography component="h2" variant="h5">
                {" "}
                My Parking Area
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                You can view and manage your own areas
              </Typography>
              <Typography variant="subtitle1" color="primary">
                View Details
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </div>
  );
}
