import { Grid } from "@material-ui/core";
import Layout from "../components/Layout";
import Product from "../models/Product";
import ProductItem from "../components/ProductItem";
import db from "../utils/db";



export default function Home(props) {
  const { products } = props;

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
