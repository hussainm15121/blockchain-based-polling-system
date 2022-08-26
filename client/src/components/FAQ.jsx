import React, { useState, useRef } from 'react';
import Chevron from './Chevron';

function FAQ(props) {
    
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon"); 

    const content = useRef(null);  function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
   
        setRotateState(setActive === "active" ? "accordion__icon" : "accordion__icon rotate"); }
    
    return (
       <div className="accordion-section">
           <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
               <p className="accordion-title">{props.title}</p>
                <Chevron width={10} className={`${setRotate}`} fill={"#777"} />
            </button>
            <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion-content">
                <div 
                    className="accordion-text" 
                    dangerouslySetInnerHTML={{ __html: props.content }}
                />
            </div>
       </div>
    );
}

export default FAQ;