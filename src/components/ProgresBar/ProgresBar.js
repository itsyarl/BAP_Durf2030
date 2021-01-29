import React from "react";
//import { useStores } from "../../hooks/useStores";
import styling from "./ProgresBar.module.css";

const ProgresBar = () => {

  //const { projectStore } = useStores();

  //const [style, setStyle] = useState({});
	const aantal = 1015;
  const done = (aantal/2030*100).toFixed();

  const year = new Date().getFullYear();
  const yearsToGo = 2031 - year;
  
  // setTimeout(() => {
	// 	const newStyle = {
	// 		opacity: 1,
	// 		width: `${done}%`
	// 	}
		
	// 	setStyle(newStyle);
	// }, 200);

  
    return (
      <div className={styling.progres__container}>
        <h4 className={styling.progres__title}>{`${yearsToGo} jaar resterend`} ({done}%)</h4>
        <div className={styling.progress}>
          <div className={styling.progress_done}></div>
        </div>
      </div>
    );
};

export default ProgresBar;
