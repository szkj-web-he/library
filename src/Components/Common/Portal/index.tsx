/**
 * @file
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, useRef } from "react";
import { useRemoveOnHidden } from "../Hooks/useRemoveOnHidden";
import { MainProps } from "../Kite/Unit/type";
import Main from "./Unit/main";
import Portal from "./Unit/portalTemp";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends Omit<MainProps, "handlePositionChange"> {
    /**
     *
     */
    hashId?: string;

    /**
     * root节点
     */
    root?: Element;
    /**
     * show of Portal
     */
    show: boolean;
    /**
     * Remove when the element is hidden
     */
    removeOnHidden?: boolean;
    /**
     * Cache only works if removeOnHidden=true.
     * When cache=true, as long as the element has been rendered, it will no longer be removed.  The opposite is the state of cache=false.
     */
    cache?: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement | null, TempProps>(
    (
        {
            children,
            show,
            removeOnHidden = true,
            cache = true,
            handleTransitionEnd,
            handleTransitionStart,
            handleTransitionCancel,
            mount,
            ...props
        },
        ref,
    ) => {
        Temp.displayName = "Portal";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const [endFn, isInstall] = useRemoveOnHidden(show, removeOnHidden, cache);

        /**
         * show的变化次数
         */
        const showCount = useRef(0);
        const preShow = useRef<boolean>();

        {
            if (preShow.current !== show) {
                ++showCount.current;
                preShow.current = show;
            }
        }

        if (isInstall) {
            return (
                <Portal mount={mount}>
                    <Main
                        show={show}
                        ref={ref}
                        isTransition={showCount.current < 2 ? show : true}
                        handleTransitionStart={handleTransitionStart}
                        handleTransitionEnd={() => {
                            handleTransitionEnd?.();
                            endFn();
                        }}
                        mount={mount}
                        handleTransitionCancel={() => {
                            handleTransitionCancel?.();
                            endFn();
                        }}
                        {...props}
                    >
                        {children}
                    </Main>
                </Portal>
            );
        }
        return <></>;
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Temp.displayName = "Portal";
export default Temp;
