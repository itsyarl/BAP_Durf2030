import React, { useState } from "react";
import styling from "./ProgresBar.module.css";

const ProgresBar = () => {
  const [style, setStyle] = useState({});
	const aantal = 843
  const done = (aantal/2030*100).toFixed();
  
  setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);

  
    return (
      <div className={styling.progres__container}>
        <h4 className={styling.progres__title}>10 jaar resterend ({done}%)</h4>
        <div className={styling.progress}>
          <div style={style} className={styling.progress_done}></div>
        </div>
      </div>
    );
};

export default ProgresBar;
