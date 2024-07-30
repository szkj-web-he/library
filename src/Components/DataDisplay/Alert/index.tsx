/**
 * @file alert component
 * @date 2020-10-21
 * @author Andy
 * @lastModify Andy 2020-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef } from "react";
import { langConfig } from "../../../DefaultData/DataDisplay/alert";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { useRemoveOnHidden } from "./../../Common/Hooks/useRemoveOnHidden";
import AlertMain, { MainProps } from "./Unit/main";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
export interface AlertProps extends MainProps {
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
/**
 * @deprecated 将会在v0.3.0后移除 由Dialog替代
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            status = false,
            removeOnHidden = true,
            cache = true,
            handleTransitionEnd,
            handleTransitionStart,
            handleTransitionCancel,
            ...props
        },
        ref,
    ) => {
        Alert.displayName = "Alert";

        const [endFn, isInstall] = useRemoveOnHidden(status, removeOnHidden, cache);

        /**
         * 这里加入翻译文件
         */
        useLangConfig("AlertComponent", langConfig);

        if (isInstall) {
            return (
                <AlertMain
                    ref={ref}
                    key={`AlertMain`}
                    {...props}
                    status={status}
                    handleTransitionCancel={() => {
                        endFn();
                        handleTransitionCancel?.();
                    }}
                    handleTransitionEnd={() => {
                        endFn();
                        handleTransitionEnd?.();
                    }}
                    handleTransitionStart={() => {
                        handleTransitionStart?.();
                    }}
                />
            );
        }
        return <></>;

        /* <------------------------------------ **** STATES END **** ------------------------------------ */
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Alert.displayName = "Alert";
