import { Divider } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <ul>
          <li>Product1</li>
          <li>Product2</li>
          <li>Product3</li>
        </ul>
      </div>
    </Layout>
  );
}
