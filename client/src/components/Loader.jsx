import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from  'react-loader-spinner'
import "./Loader.css"

const Loader = () => {
    return(
        <div className="spinner">
            <Bars
            height="100"
            width="100"
            color='blue'
            ariaLabel='loading'
    />
        </div>
    );
};
export default Loader;