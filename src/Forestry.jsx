import React, { Component } from "react";
import styles from "./Forestry.module.css";
import * as helpers from "./helpers";
import config from "./config.json";

const wfsUrl = config.wfsForestry;

class RealEstate extends Component {
  constructor(props) {
    super(props);
    this.images = [];
    this.state = { hasError: false, info: {} };
  }

  init = () => {
    if (this.props.params.type !== "FORESTRY") return;

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
      <div className={params.type === "FORESTRY" && !window.hasError ? styles.mainContainer : "hidden"}>
        <div className={params.showHeader ? styles.header : "hidden"}>
          <img src={images["forestry-logo.png"]} style={{ paddingRight: "25px" }} alt="logo" />
          <span className={styles.title}>{info.Tract}</span>&nbsp;
          <span className={styles.subTitle}>{`(${info.Municipality})`}</span>
        </div>
        <div className={params.showHeader ? "border-bottom" : "hidden"}>
          {`Below are the permitted, prohibited and restricted activities for the ${info.Tract} Tract within SPRINGWATER. Please ensure to follow these regulations as they are assigned to the forest tract as part of its overall management plan.`}
        </div>
        <div className={styles.activities}>
          <div className={styles.activityRow}>
            <div className={`${styles.borderRight} ${styles.leftContainer}`}>
              <div className={styles.restrictedTitle}>Restricted Activities</div>
              <RestrictedActivity name="ATV Clubs" allowed={info.ATV} link="https://ofatv.org/"></RestrictedActivity>
              <RestrictedActivity name="Snowmobile Clubs" allowed={info.Snowmobile} link="https://www.ofsc.on.ca/"></RestrictedActivity>
              <RestrictedActivity name="Trail Riders (OFTR)" allowed={info["Off Road Vehicle"]} link="https://oftr.ca/"></RestrictedActivity>
              <RestrictedActivity
                name={"Hunting - WMU (" + info["Wildlife Management Unit"] + ")"}
                allowed={info.Hunting}
                link="https://www.ontario.ca/document/ontario-hunting-regulations-summary"
              ></RestrictedActivity>
              <div className="border-bottom" />
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.restrictedTitle}>Additional Information</div>
              <div style={{ height: "104px" }}>
                For more information and complete copy of the Recreation Policy , please visit the{" "}
                <a href="https://www.simcoe.ca/dpt/fbl" alt="County Forest Website" target="_blank" rel="noopener noreferrer">
                  County Forest website
                </a>
              </div>
              <div className="border-bottom" />
            </div>
          </div>

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
          </div>
        </div>
        <div className="border-bottom" />
        <div className="alert alert-info">
          <b>Note:</b> There are no bathrooms or garbage facilities in any County Forest
        </div>
      </div>
    );
  }
}

export default RealEstate;

const RestrictedActivity = (props) => {
  return (
    <div>
      <img src={props.allowed === "YES" ? images["check.png"] : images["cross.png"]} alt={"Activity"}></img>
      <a className={styles.restrictedLink} href={props.link} target="_blank" rel="noopener noreferrer">
        {props.name}
      </a>
    </div>
  );
};

// IMPORT ALL IMAGES
const imageModules = import.meta.glob("./images/*.(png|jpg|jpeg|svg|gif)", { eager: true, import: "default" });
const images = Object.keys(imageModules).reduce((acc, path) => {
  const fileName = path.replace("./images/", "");
  acc[fileName] = imageModules[path];
  return acc;
}, {});
