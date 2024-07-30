/**
 * @file
 * @date 2022-09-05
 * @author
 * @lastModify  2022-09-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import Qrcode, {
    QRCodeRenderersOptions,
    QRCodeToDataURLOptions,
    QRCodeToStringOptions,
} from "qrcode";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";

/**
 * Generate code
 */

export type QRCodeType = "canvas" | "svg" | "img";

export type QRCodeBaseProps = {
    value: string;
    className?: string;
    style?: React.CSSProperties;
};

export type QRCodeCanvasProps = QRCodeRenderersOptions & {
    mode?: "canvas";
    onCanvasCreate?: (canvas: HTMLCanvasElement) => void;
} & QRCodeBaseProps;

export type QRCodeSvgProps = QRCodeToStringOptions & {
    mode?: "svg";
} & QRCodeBaseProps;

export type QRCodeImgProps = QRCodeToDataURLOptions & {
    mode?: "img";
} & QRCodeBaseProps;

export type QRCodeProps = QRCodeCanvasProps | QRCodeSvgProps | QRCodeImgProps;

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
/**
 * options more detail see: https://www.npmjs.com/package/qrcode#options
 */
export const QRCode: React.FC<QRCodeProps> = ({
    value,
    mode = "canvas",
    className,
    style,
    ...rest
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const containerRef = useRef<HTMLDivElement>();

    useEffect(() => {
        renderQRCode(mode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, mode]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const renderQRCode = (mode: QRCodeType) => {
        const container = containerRef.current;

        if (container) {
            switch (mode) {
                case "canvas":
                    {
                        const { onCanvasCreate } = rest as QRCodeCanvasProps;
                        void Qrcode.toCanvas(value, { ...rest }).then((res: HTMLCanvasElement) => {
                            !container.children.length && container.appendChild(res);
                            onCanvasCreate?.(res);
                        });
                    }
                    break;
                case "img":
                    {
                        void Qrcode.toDataURL(value, { ...(rest as QRCodeToDataURLOptions) }).then(
                            (res: string) => {
                                const img = document.createElement("img");
                                img.src = res;
                                !container.children.length && container.appendChild(img);
                            },
                        );
                    }
                    break;
                case "svg":
                    {
                        void Qrcode.toString(value, { ...(rest as QRCodeToStringOptions) }).then(
                            (res: string) => {
                                container.innerHTML = res;
                            },
                        );
                    }
                    break;
            }
        }
        return container;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            ref={(el) => {
                if (el) containerRef.current = el;
            }}
            className={classNames(styles.qrcode_container, className)}
            style={style}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
