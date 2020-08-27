import React from "react";
import ReactLoader from "react-loader-spinner";
import style from "./Loaders.module.css";

export const Loader = (props) => {

  const {type, color, mensuration} = props

  return (
    <div className={style.background}>
      <div>
        <ReactLoader type={type} visible color={color} height width={mensuration} />
      </div>
    </div>
  );
};

export default Loader;

/*
TYPE OF SPINNER
Audio	
Ball-Triangle	
Bars	
Circles	
Grid
Hearts	
Oval
Puff
Rings
TailSpin
ThreeDots
*/
