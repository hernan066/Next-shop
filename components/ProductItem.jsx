import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import NextLink from "next/link";
import Rating from "@material-ui/lab/Rating";
import useStyles from "../utils/styles";

export default function ProductItem({ product }) {
  const classes = useStyles();
  
  return (
    <Card  className={classes.cartItems}>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
           
          ></CardMedia>
        </CardActionArea>
      </NextLink>
      <CardContent>
        <Typography variant="body2" component="p" color="textSecondary">
          {product.category}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textPrimary"
          component="p"
        >
          {product.description}
        </Typography>

        <Rating value={product.rating} readOnly></Rating>

        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
    </Card>
  );
}