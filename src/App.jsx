import React from "react";
import styles from "./App.module.css";
import RealEstate from "./RealEstate.jsx";
import Forestry from "./Forestry.jsx";
import ChildCare from "./ChildCare.jsx";
import "./global.css";

function App() {
  // GET URL PARAMETERS
  const url = new URL(window.location.href);
  const type = url.searchParams.get("TYPE");
  const id = url.searchParams.get("ID");
  const showHeader = url.searchParams.get("SHOWHEADER") !== null && url.searchParams.get("SHOWHEADER") === "1" ? true : false;
  const params = { type: type, id: id, showHeader: showHeader };
  window.hasError = type === null || id === null;
  return (
    <div>
      <div className={window.hasError ? styles.error : "hidden"}>Invalid Parameters. This app needs a TYPE and ID.</div>

      {/* http://localhost:3001/?TYPE=REALESTATE&ID=30739961 */}
      <RealEstate params={params} />

      {/* http://localhost:3001/?TYPE=FORESTRY&ID=COPELAND&SHOWHEADER=1 */}
      <Forestry params={params} />

      {/* http://localhost:3001/?SHOWHEADER=1&TYPE=CHILDCARE&ID=YMCA%20Young%20Parent%20Program%20Barrie */}
      <ChildCare params={params} />
    </div>
  );
}

export default App;
