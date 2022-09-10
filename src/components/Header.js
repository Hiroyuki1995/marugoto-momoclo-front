import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import Image from "next/image";

export const Header = (props) => {
  return (
    <AppBar position="fixed" color={"grey"} style={{ zIndex: 2 }}>
      <Container maxWidth="md" style={{ padding: 0 }}>
        <Toolbar>
          {/* <Typography variant="h6" color="inherit" noWrap>
            まるごとももクロ
          </Typography> */}
          <Image alt="title" src={"/title-logo.jpeg"} width={230} height={38} />
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
