/**
 * @file 手机端的弹框
 * @date 2023-06-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { useRef } from "react";
import { useRemoveOnHidden } from "../../Common/Hooks/useRemoveOnHidden";
import Portal from "../../Common/Portal/Unit/portalTemp";
import Main from "./Unit/main";
import { MobileDialogProps } from "./Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const MobileDialog: React.FC<MobileDialogProps> = ({
    show = false,
    removeOnHidden,
    children,

    ...props
}) => {
    MobileDialog.displayName = "MobileDialog";

    const [endFn, isInstall] = useRemoveOnHidden(show, removeOnHidden, false);

    // 背景
    const bgTransitionEnd = useRef(false);

    // 弹框
    const mainTransitionEnd = useRef(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleEnd = () => {
        if (bgTransitionEnd.current && mainTransitionEnd.current) {
            endFn();
            bgTransitionEnd.current = false;
            mainTransitionEnd.current = false;
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    if (isInstall)
        return (
            <Portal>
                <Main
                    handleTransitionEnd={(res) => {
                        if (res === "bg") {
                            bgTransitionEnd.current = true;
                            handleEnd();
                            return;
                        }

                        if (res === "main") {
                            mainTransitionEnd.current = true;
                            handleEnd();
                            return;
                        }
                    }}
                    show={show}
                    {...props}
                >
                    {children}
                </Main>
            </Portal>
        );

    return <></>;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
MobileDialog.displayName = "MobileDialog";
