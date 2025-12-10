import React, { Component } from "react";
import styles from "./ChildCare.module.css";
import * as helpers from "./helpers";
import config from "./config.json";

const wfsUrl = config.wfsChildCare;

class RealEstate extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: {}, images: [] };
  }

  init = () => {
    if (this.props.params.type !== "CHILDCARE") return;

    const url = wfsUrl + "'" + this.props.params.id + "'";
    helpers.getJSON(url, (result) => {
      if (result.features.length === 0) {
        this.setState({ hasError: true });
        return;
      }

      const featureProps = result.features[0].properties;
      // console.log(featureProps);
      this.setState({ info: featureProps });
    });
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const { params } = this.props;
    const { info } = this.state;
    return (
      <div className={params.type === "CHILDCARE" && !window.hasError ? styles.mainContainer : "hidden"}>
        <div className={params.showHeader ? styles.header : "hidden"}>
          <img src={images["childcare-logo.png"]} style={{ paddingRight: "25px" }} alt="logo" />
          <span className={styles.title}>{info.name}</span>&nbsp;
          <span className={styles.subTitle}>{`(${info.muni})`}</span>
        </div>
        <div className={params.showHeader ? "border-bottom" : "hidden"}>{`Below is detailed information related to this childcare facility.`}</div>
        <div className={styles.infoContainer}>
          <div className={styles.infoColumn1}></div>
          <div className={styles.infoColumn2}></div>
          <div className={styles.infoRow}>
            <label className={styles.infoCell1}>Address</label>
            <label className={styles.infoCell2}>{info.address}</label>
          </div>
          <div className={styles.infoRow}>
            <label className={styles.infoCell1}>Phone</label>
            <label className={styles.infoCell2}>{info.phonenumber}</label>
          </div>
          <div className={styles.infoRow}>
            <label className={styles.infoCell1}>Type</label>
            <label className={styles.infoCell2}>{info.phonenumber}</label>
          </div>
          <div className={styles.infoRow}>
            <label className={styles.infoCell1}>In School</label>
            <label className={styles.infoCell2}>{info.inschool === null ? "N/A" : info.inschool}</label>
          </div>
          <div className={styles.infoRow}>
            <label className={styles.infoCell1}>Fee Subsidy</label>
            <img src={info.subsidy === "YES" ? images["check.png"] : images["cross.png"]} alt={"Subsidy"}></img>
          </div>
        </div>
        <div className="border-bottom" />
        <div className={styles.programsTitle}>Childcare Programs Available</div>
        <div className={styles.activities}>
          <div className={styles.activityRow}>
            <div className={`${styles.leftContainer}`}>
              <Activity name="Infants" allowed={info.lc_inf}></Activity>
              <Activity name="Toddlers" allowed={info.lc_todd}></Activity>
              <Activity name="Preschoolers" allowed={info.lc_ps}></Activity>
            </div>
            <div className={`${styles.rightContainer}`}>
              <Activity name="School Age" allowed={info.lc_sa}></Activity>
              <Activity name="Nursery School Age" allowed={info.lc_ns}></Activity>
              <Activity name="Jr/Sr Kindergarten" allowed={info.lc_jksk}></Activity>
            </div>
          </div>
          {/* 
          <div className={styles.activityRow}>
            <div className={`${styles.borderRight} ${styles.leftContainer}`}>
              <div className={styles.restrictedTitle}>
                Permitted Activities<img src={images["check.png"]} alt="Check" style={{ paddingLeft: "20px" }}></img>
              </div>
              <ul>
                <li>Cross Country Skiing</li>
                <li>Cycling</li>
                <li>Dog Walking</li>
                <li>Hiking</li>
                <li>Horseback Riding</li>
                <li>Snowshoeing</li>
              </ul>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.restrictedTitle}>
                Prohibited Activities<img src={images["cross.png"]} alt="Check" style={{ paddingLeft: "20px" }}></img>
              </div>
              <ul>
                <li>Camping</li>
                <li>Fire</li>
                <li>Paintball</li>
                <li>Target Practice</li>
                <li>Vehicles over 400kg</li>
              </ul>
            </div>
          </div> */}
        </div>
        <div className="border-bottom" />
      </div>
    );
  }
}

export default RealEstate;

const Activity = (props) => {
  return (
    <div>
      <img src={props.allowed > 0 ? images["check.png"] : images["cross.png"]} alt={"Activity"} style={{ paddingRight: "10px" }}></img>
      <label>{props.name}</label>
    </div>
  );
};

// IMPORT ALL IMAGES
const imageModules = import.meta.glob('./images/*.(png|jpg|jpeg|svg|gif)', { eager: true, import: 'default' });
const images = Object.keys(imageModules).reduce((acc, path) => {
  const fileName = path.replace('./images/', '');
  acc[fileName] = imageModules[path];
  return acc;
}, {});
