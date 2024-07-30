/**
 * @file
 * @date 2022-12-16
 * @author
 * @lastModify 2022-12-16
 */
import { Meta, StoryObj } from "@storybook/react";
import { UploadPicture } from "../../Components/Zmz/UploadPicture";

export default {
    title: "Zmz/UploadPicture",
    component: UploadPicture,
} as Meta;

type Story = StoryObj<typeof UploadPicture>;

export const Default: Story = {
    args: {
        handleConfirmClick: (res) => {
            console.log("handleConfirmClick", res);
        },
    },
};

export const UploadPictureTemp: Story = {
    args: {
        preview: false,
        handleConfirmClick: (res) => {
            console.log("UploadPictureTemp", res);
        },
    },
};
