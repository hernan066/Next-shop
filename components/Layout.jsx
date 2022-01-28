import React, { useContext, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import MenuIcon from "@material-ui/icons/Menu";
//import CancelIcon from '@material-ui/icons/Cancel';
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { useSnackbar } from "notistack";
import axios from "axios";
import { getError } from "../utils/error";

export default function Layout({ title, description, children }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [categories, setCategories] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

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
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  //////////////////profile menu ////////////////////

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);

    if (redirect && redirect !== "backdropClick") {
      router.push(redirect);
    }
  };

  /////////////////////Logout ///////////////////////

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  ////////////////////////theme//////////////////////

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  /////////////////Sidebar ///////////////////////

  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };

  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  /////////////////Fetch categories///////////////////////
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  useEffect(() => {
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {/* /////////////////Sidebar /////////////////////// */}
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
              >
                <MenuIcon className={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>Next Shop </Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidebarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding='20px'
                  >
                    <Typography className={classes.brand}>
                      Categories{" "}
                    </Typography>
                    {/* <Typography variant="h6">Shopping by category</Typography> */}
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                      style={{ marginLeft: "20px" }}
                    >
                      <CancelPresentationIcon />
                    </IconButton>
                  </Box>
                </ListItem>

                {/* <Typography variant="h6" style={{textAlign: 'center', letterSpacing: '2px' }} >CATEGORIES</Typography> */}
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                      style={{ textAlign: "center" }}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            {/* /////////////////Sidebar end/////////////////////// */}

            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>
                  <Badge badgeContent={cart.cartItems.length} color="secondary">
                    <ShoppingCartOutlined />
                  </Badge>
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    style={{ marginTop: "3rem" }}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order History
                    </MenuItem>
                    <MenuItem>
                      Dark Theme
                      <Switch
                        checked={darkMode}
                        onChange={darkModeChangeHandler}
                      ></Switch>
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}

                    <Divider></Divider>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
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
}
