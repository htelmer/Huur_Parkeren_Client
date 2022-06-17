import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken } from "../../store/user/selectors";
import { selectAreas } from "../../store/rentalAreas/selectors";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { removeFavorites } from "../../store/rentalAreas/actions";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

export default function SavedAreas() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("selectors", user);
  const token = useSelector(selectToken);
  const area = useSelector(selectAreas);
  const onRemoveClick = (areaId) => {
    console.log("clicked?", areaId);
    dispatch(removeFavorites(areaId));
  };

  /*useEffect(() => {
    dispatch(fetchAllAreas());
  }, [dispatch]);*/

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/myAccount">
          My Account
        </Link>
        <Typography color="text.primary">Saved Parking Areas</Typography>
      </Breadcrumbs>
      <Typography variant="h4" sx={{ fontSize: "2rem" }}>
        Saved Areas
      </Typography>
      {user.favorites
        ? user.favorites.map((fav) => {
            return (
              <div>
                <Grid
                  item
                  xs={12}
                  md={6}
                  p={2}
                  sx={{ display: "flex", m: 1.5, width: 1000 }}
                  variant="outlined"
                  style={{ margin: "auto" }}
                >
                  <CardActionArea>
                    <Card sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 200,
                          height: 250,
                          display: { sm: "block" },
                          m: 3,
                        }}
                        image={fav.image}
                        alt="img"
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Link href={`/area/${fav.id}`}>
                          {" "}
                          <h3>
                            {fav.city} {fav.postalCode}
                          </h3>
                        </Link>
                        <p>
                          {fav.streetName} {fav.houseNo}
                        </p>
                        <p> € {fav.price}</p>
                        <Typography sx={{ textAlign: "left" }}>
                          {fav.description}
                        </Typography>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => onRemoveClick(fav.id)}
                        >
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Grid>
              </div>
            );
          })
        : "You have not any favorites yet"}
    </div>
  );
}
