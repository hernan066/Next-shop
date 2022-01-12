import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import useStyles from "../utils/styles";

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Next Shop</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>Next Shop</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>

      <footer className={classes.footer}>
        <Typography>
          All rights reserved &copy; {new Date().getFullYear()} - Hernan Moneta
        </Typography>
      </footer>
    </div>
  );
};

export default Layout;
