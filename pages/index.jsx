import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
 
} from "@material-ui/core";
import NextLink from "next/link";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import Rating from '@material-ui/lab/Rating';


export default function Home(props) {
  
  const { products } = props;
  
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
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
                  <Typography  variant="body2" component="p" color="textSecondary">
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
                  
                  <Typography variant="h6" >
                    ${product.price}
                  </Typography>
                
                </CardContent>

                
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
