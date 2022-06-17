import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectMyAreas } from "../../store/user/selectors";
import { deleteArea } from "../../store/rentalAreas/actions";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

export default function MyParkingArea() {
  const dispatch = useDispatch();
  const myAreas = useSelector(selectMyAreas);
  console.log("myareas", myAreas);
  const onDeleteClick = (id) => {
    console.log("clicked?", id);
    dispatch(deleteArea(id));
  };

  const StyledLink = styled(Link)`
    color: Blue;
    text-decoration: none;
    margin: 1rem;
    position: relative;
  `;

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" to="/myAccount">
          My Account
        </Link>
        <Typography color="text.primary">My Parking Area</Typography>
      </Breadcrumbs>
      <div>
        <h1>My Areas</h1>

        {myAreas
          ? myAreas.map((own) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  p={2}
                  sx={{ display: "flex", m: 1.5, width: 1000 }}
                  variant="outlined"
                  style={{ margin: "auto" }}
                >
                  <CardActionArea component="a">
                    <Card sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 200,
                          height: 250,
                          display: { sm: "block" },
                          m: 3,
                        }}
                        image={own.image}
                        alt="img"
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <h3>
                          {own.city} {own.postalCode}
                        </h3>
                        <p>
                          {own.streetName} {own.houseNo}
                        </p>
                        <p> € {own.price}</p>
                        <Typography sx={{ textAlign: "left" }}>
                          {own.description}
                        </Typography>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => onDeleteClick(own.id)}
                        >
                          Delete
                        </Button>
                        <StyledLink to={`/MyAccount/MyParkingArea/${own.id}`}>
                          Update
                        </StyledLink>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Grid>
              );
            })
          : "You have not any area yet"}
      </div>
    </div>
  );
}
