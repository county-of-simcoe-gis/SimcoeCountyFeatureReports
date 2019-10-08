import React, { Component } from "react";
import styles from "./RealEstate.module.css";
import * as helpers from "./helpers";
import config from "./config.json";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const wfsUrl = config.wfsRealEstate;

class RealEstate extends Component {
  constructor(props) {
    super(props);
    this.images = [];
    this.state = { hasError: false, info: {} };

    this.init();
  }

  init = () => {
    if (this.props.params.type !== "REALESTATE") return;

    console.log("Real Estate");
    helpers.getJSON(wfsUrl + this.props.params.id, result => {
      if (result.features.length === 0) {
        this.setState({ hasError: true });
        return;
      }

      const featureProps = result.features[0].properties;
      console.log(featureProps);
      this.setState({ info: featureProps });

      // CREATE IMAGE ARRAY FOR CAROUSEL
      for (let index = 0; index < featureProps.num_images; index++) {
        const imageUrl = featureProps.image_url.replace("-0", "-" + index);
        this.images.push({ original: imageUrl, thumbnail: imageUrl });
      }
    });
  };

  componentDidMount() {}

  render() {
    const { params } = this.props;
    const { info } = this.state;

    return (
      <div className={params.type === "REALESTATE" && !window.hasError ? styles.mainContainer : "hidden"}>
        <div className={params.showHeader ? styles.header : "hidden"}>
          <img src={images["simcoe-logo.png"]} style={{ paddingRight: "25px" }} alt="logo" />
          <span className={styles.title}>{info.Address}</span>&nbsp;
          <span className={styles.subTitle}>{`(${info.Municipality})`}</span>
        </div>
        <div className={params.showHeader ? "border-bottom" : "hidden"}>
          {`Below is information related to ${info.Address}. If you wish to get detailed information about this real estate listing please visit the `}
          <a href={info.url_link} target="_blank" rel="noopener noreferrer">
            Realtor® website.
          </a>
        </div>
        <ImageGallery items={this.images} autoPlay={true} slideDuration={200} lazyLoad={true} showIndex={true} showFullscreenButton={false} />
        <div className="border-bottom" />
        <div style={{ textAlign: "center" }}>
          <a className="btn btn-info" href={info.url_link} target="_blank" rel="noopener noreferrer">
            <span className={styles.listingButton}>View Listing on Realtor ®</span>
          </a>
        </div>
        <div className="border-bottom" />
        <div className="alert alert-info">Information provided by local real estate boards, Barrie, Southern Georgian Bay and Lakelands</div>
      </div>
    );
  }
}

export default RealEstate;

// IMPORT ALL IMAGES
const images = importAllImages(require.context("./images", false, /\.(png|jpe?g|svg|gif)$/));
function importAllImages(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
}
