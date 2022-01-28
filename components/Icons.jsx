import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { ShoppingCartOutlined } from "@material-ui/icons";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const useStyles = makeStyles((theme) => ({
  letterAvatar: {
    color: "#ffffff",
    backgroundColor: "#333333",
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  shoppingCartIcon: {
    color: "#ffffff",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  accountIcon: {
    color: "#ffffff",
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginTop: "5px",
  },
}));

export function LetterAvatars({ name }) {
  const classes = useStyles();

  const firstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <Avatar className={classes.letterAvatar}>{firstLetter(name)}</Avatar>
    </>
  );
}

export function ShoppingCartIcon() {
  const classes = useStyles();

  return (
    <>
      <ShoppingCartOutlined className={classes.shoppingCartIcon} />
    </>
  );
}

export function AccountIcon() {
  const classes = useStyles();

  return (
    <>
      <AccountCircleOutlinedIcon className={classes.accountIcon} />
    </>
  );
}
