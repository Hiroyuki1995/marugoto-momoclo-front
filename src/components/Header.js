import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";

export const Header = (props) => {
  return (
    <AppBar position="fixed" color={"grey"}>
      <Container maxWidth="md" style={{ padding: 0 }}>
        <Toolbar>
          {/* <Typography variant="h6" color="inherit" noWrap>
            まるごとももクロ
          </Typography> */}
          <img alt="title" src={"/title-logo.jpeg"} style={{ width: 230 }} />
          <Box
            sx={{ display: { xs: "flex", md: "flex" } }}
            style={{ marginLeft: "auto" }}
          >
            {props.children}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
