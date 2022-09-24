import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import Image from "next/image";

type Props = {
  children?: React.ReactNode | null,
};

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <AppBar position="fixed" style={{ zIndex: 2, backgroundColor: "#fff" }}>
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
            {children}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
