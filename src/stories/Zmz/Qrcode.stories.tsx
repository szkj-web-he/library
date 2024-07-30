/**
 * @file
 * @date 2022-05-20
 * @author
 * @lastModify  2022-05-20
 */
import { StoryObj, Meta } from "@storybook/react";
import { QRCode, QRCodeProps } from "../../Components/Zmz/QRCode";
import image from "../../Assets/images/spr_contacts86.png";

export default {
    title: "Zmz/QRCode",
    component: QRCode,
} as Meta;

type Story = StoryObj<QRCodeProps>;

export const QRCodeCanvas: Story = {
    render: (args: QRCodeProps) => {
        return (
            <QRCode
                {...args}
                value="http://192.168.10.8:6006/?path=/story/zmz-mobilepickerview--default"
            />
        );
    },
    args: {
        width: 100,
        onCanvasCreate(canvas: HTMLCanvasElement) {
            console.log(canvas.getContext("2d"));
        },
    },
};

const ImageTemplate: Story = {
    render: (args: QRCodeProps) => {
        return (
            <QRCode
                {...args}
                mode="canvas"
                onCanvasCreate={(canvas: HTMLCanvasElement) => {
                    const { width: w = 100 } = args;
                    const width = 30;
                    const height = 30;
                    const logo = new Image(width, height);
                    logo.src = image;
                    logo.onload = () => {
                        const ctx = canvas.getContext("2d");
                        ctx?.drawImage(logo, (w - width) / 2, (w - height) / 2, width, height);
                    };
                }}
                value="https://github.com/soldair/node-qrcode#qr-code-capacity"
            />
        );
    },
};

export const ImageCenterCanvas: Story = {
    ...ImageTemplate,
    args: {
        width: 100,
        errorCorrectionLevel: "Q",
    },
};

export const QRCodeImg = {
    ...ImageTemplate,
    args: {
        mode: "img",
        width: 100,
    } as QRCodeProps,
};

export const QRCodeSvg = {
    ...ImageTemplate,
    args: {
        mode: "svg",
        width: 100,
    },
};
