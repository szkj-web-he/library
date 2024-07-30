/**
 * @file this is the slider component file
 * @date 2021-05-03
 * @author Frank
 * @lastModify Frank 2021-05-03
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { AvatarCrop, AvatarCropProps } from "../../Components/DataInput/AvatarCrop";

/**
 * Slider component
 *
 */
export default {
    title: "DataInput/AvatarCrop",
    component: AvatarCrop,
} as Meta;

const Template: FC<AvatarCropProps> = (args) => {
    const [cropPosition, setCropPosition] = useState<{
        x: "auto" | number;
        y: "auto" | number;
    }>({
        x: "auto",
        y: "auto",
    });

    const [imgSrc, setImgSrc] = useState<string | null>(args.defaultLink || null);

    const [zoom, setZoom] = useState(1);

    return (
        <div style={{ marginTop: "2rem", marginLeft: "3rem" }}>
            <AvatarCrop
                {...args}
                cropPosition={cropPosition}
                handleCropPositionChange={(x, y) => {
                    setCropPosition({ x, y });
                }}
                defaultLink={imgSrc || undefined}
                handleOriginalImage={(res) => {
                    if (res) {
                        setImgSrc(URL.createObjectURL(res));
                    } else {
                        setImgSrc(null);
                    }
                }}
                defaultZoom={zoom}
                handleZoomChange={(res) => {
                    setZoom(res);
                }}
            />
        </div>
    );
};

type Story = StoryObj<typeof AvatarCrop>;

/**
 * Avatar Crop  component when round
 */
export const AvatarCropRound: Story = {
    render: (args) => <Template {...args} />,
    args: {
        cropShape: "round",
        cropSize: {
            width: "15rem",
            height: "15rem",
        },
        defaultLink:
            // "https://dr-spm-contract-attachments-dev.s3-ap-southeast-2.amazonaws.com/6BOwjnyMdtfAxw63/eeYlavLKq_9dHF9qnMp7/fb67d266c2044b208f11dab1f862c5be.jpg",
            // "https://dr-task-report-sys-attachments-dev.s3-ap-southeast-2.amazonaws.com/CUA8UNyHClZRlPxzn8eg_bWqyLvM/_krr4XDRz357julRut7l/blob",
            "https://dr-app-pub.oss-cn-hangzhou.aliyuncs.com/v2-dev/profile_user_avatars/01GRSY9HDEPTYTVJJZ3DRFTTWR/blob?" +
            Date.now(),
        // https://dr-task-report-sys-attachments-dev.s3-ap-southeast-2.amazonaws.com/CUA8UNyHClZRlPxzn8eg_bWqyLvM/iYBgyXDhos7EfpmY1Etl/%E7%9C%BC%E7%9D%9B%E9%87%8C%E7%9A%84%E7%A5%9E%E9%9F%B5.jpeg

        handleConfirmClick: () => {
            console.log("handleConfirmClick");
        },
        handleImgChange: (file, base64) => {
            console.log(file);
            console.log(base64);

            const url = file && URL.createObjectURL(file);
            if (url) {
                window.open(url);
            }
        },
    },
};

/**
 * Avatar Crop component when rect
 */

export const AvatarCropRect: Story = {
    render: (args) => <Template {...args} />,
    args: {
        cropShape: "rect",
        cropSize: {
            width: "18rem",
            height: "12rem",
        },
        maxFileSize: 5,
        minZoom: 0.1,

        handleImgChange: (file, base64) => {
            console.log(file);
            console.log(base64);
        },
        handleConfirmClick: () => {
            console.log("handleConfirmClick");
        },
    },
};
