import { useMoralisQuery, useMoralis } from "react-moralis";
import Categories from "./Categories";
import Feed from "./Feed";
import { Box, Grid, Card, Typography } from "@mui/material";

const Main = () => {
  const queryCategories = useMoralisQuery("Categories");
  const { isAuthenticated } = useMoralis();
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );

  return (
    <Box className="container">
      {isAuthenticated ? (
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={3}>
            <Categories categories={fetchedCategories} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Feed />
          </Grid>
        </Grid>
      ) : (
        <Card sx={{ p: 5 }}>
          <Typography
            variant="h5"
            color="unset"
            sx={{ textAlign: "center", w: 1 }}
          >
            Please Log in
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Main;
