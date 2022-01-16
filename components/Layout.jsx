import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Badge,
} from "@material-ui/core";

import Head from "next/head";
import React from "react";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";

const Layout = ({ title, description, children }) => {
  const { quantity } = useSelector((state) => state.cart);

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Shop` : "Next Shop"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>
                  <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartOutlined className="nav__icon-carrito" />
                  </Badge>
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>
            {" "}
            All rights reserved &copy; {new Date().getFullYear()} - Hernan
            Moneta
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
