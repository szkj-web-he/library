/**
 * @file
 * @date 2023-11-18
 * @author xuejie.he
 * @lastModify xuejie.he 2023-11-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { createPortal } from "react-dom";
import { mountElement } from "../../../Cover/Unit/mountEl";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    children: React.ReactNode;
    /**
     * Where to install the'Kite'
     */
    mount?: Element;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ children, mount }) => {
    return createPortal(children, mountElement(mount));
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
