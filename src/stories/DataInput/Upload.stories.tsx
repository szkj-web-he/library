/**
 * @file Upload storybook
 * @date 2020-09-07
 * @author Andy
 * @lastModify Andy 2020-09-07
 */
import { BaseSyntheticEvent } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Upload } from "../../Components/DataInput/Upload";
import customUploadIcon from "../../Assets/images/upload_customIcon.png";
/**
 * Upload component
 *
 */
export default {
    title: "DataInput/Upload",
    component: Upload,
} as Meta;

type Story = StoryObj<typeof Upload>;
/**
 * Upload component
 *
 */
export const UploadFile: Story = {
    args: {
        onChange: (event: BaseSyntheticEvent) => event.persist(),
    },
};

export const CustomUploadFile: Story = {
    args: {
        icon: <img src={customUploadIcon} alt="" />,
        width: "46rem",
        height: "28.1rem",
        placeholder: "Drop files here to upload or",
        linkMsg: "choose file",
        isGlobal: false,
        handleOnFileUpload(files?) {
            console.log(files);
        },
    },
};
