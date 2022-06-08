import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function AreaCard(props) {
  return (
    <Grid
      item
      xs={12}
      md={6}
      p={2}
      sx={{ m: 1, width: "90ch" }}
      justifyContent="flex-start"
    >
      <CardActionArea component="a" href={`/area/${props.id}`}>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={props.image}
            alt="img"
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {props.streetName}, {props.houseNo}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {props.postalCode}, {props.city}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              € {props.price}
            </Typography>
            {props.bookings.length === 0 ? (
              <Typography color="#2e7d32">Available Now</Typography>
            ) : (
              <Typography color="#ef5350">
                {" "}
                Booked till {"  "}
                {props.bookings.map((when) => when.tillWhen)}
              </Typography>
            )}
            <FavoriteIcon color="error" sx={{ m: -0.7 }} />
            {"    "}
            {props.favorites.length}
            <Typography variant="subtitle1" color="primary">
              View Details
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
