import React, { Component,useEffect, useState } from "react";
import { Table, Button, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { YouTubePlaylist } from "@codesweetly/react-youtube-playlist";
import YouTube from 'react-youtube';
import Tester from "./Tablet";
import v0 from "./vo";
import AccessibleTable from "./TableList";
import Tutorials from "./YtVideo";
import MainTest from "./Tablet/Index";

const YOUTUBE_PLAYLIST_API='https://www.googleapis.com/youtube/v3/playlistItems';
// export async function gerServerSideProps() {
//   const res =await fetch(YOUTUBE_PLAYLIST_API);
//   const data = await res.json();
//   return {
//     props:{
//       data
//     }
//   }
// }

function GerServerSideComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {

        const res = await fetch('${YOUTUBE_PLAYLIST_API}?part=snippet&plaslistId=PLgqOnPTLXtBkToewKewLYsumLJYtYEdNLkey=${process.env.YOUTUBE_API');
        const result = await res.json();
        setData(result);
    }

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.items.map((item) => (
        <div key={item.id}>{item.snippet.title}</div>
      ))}
    </div>
  );
}

export default class ProductList extends Component {
  render() {
    return (
      <div>
        <h3>
          {this.props.info.title}-{this.props.currentCategory}
        </h3>
        {/* <Tutorials></Tutorials> */}
        <MainTest></MainTest>
        {/* <Tester></Tester> */}
        <AccessibleTable></AccessibleTable>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button
                    onClick={() => this.props.addToCart(product)}
                    color="info"
                  >
                    add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="container">
          <Row className="mb-5">
            <div className="ratio ratio-16x9">
              <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/vlDzYIIOYmM"
                title="YouTube video"
                allowFullScreen
                loop
              ></iframe>
            </div>
          </Row>
          <Row>
            <YouTubePlaylist
              apiKey=""
              playlistId="PLgqOnPTLXtBkToewKewLYsumLJYtYEdNL"
            />
            {/* <YouTube videoId="2g811Eo7K8U" onReady={this._onReady} /> */}
          </Row>
        </div>
      </div>
    );
  }
}
