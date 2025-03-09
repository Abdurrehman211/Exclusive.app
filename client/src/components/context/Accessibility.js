import { useState } from "react";

import {createContext,useContext} from "react";
const AccessibilityContext = createContext();
 export function Accessibilityprovider({children}){
    const [highContrast,setHighContrast]=useState(false);
    const [largeFont,setLargeFont]=useState(false);

    const toggleContrast=()=>{
        setHighContrast(!highContrast);
    };
    const toggleFont=()=>{
        setLargeFont(!largeFont);
    };
    return(
        <AccessibilityContext.Provider value={{highContrast,largeFont,toggleContrast,toggleFont}}>
            <div className={'container ${highContrast?"high-contrast":""} ${largeFont ?"large-font":""}'}>
            {children}
            </div>
            
        </AccessibilityContext.Provider>
    );
}
export function useAccessibility() {
    return useContext(AccessibilityContext);
}
export default Accessibilityprovider;