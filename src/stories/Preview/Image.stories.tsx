/**
 * @file Image的故事书
 * @date 2023-12-12
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-12
 */
import { Meta, StoryObj } from "@storybook/react";
import { ImageComponent } from "../../Components/Preview/ImageComponent";
import { ImageViewer } from "../../Components/Preview/ImageViewer";

/**
 * Preview component
 *
 */
export default {
    title: "Preview/ImageComponent",
    component: ImageComponent,
} as Meta;

type Story = StoryObj<typeof ImageComponent>;

/**
 */
export const Temp: Story = {
    args: {
        src: "https://images.pexels.com/photos/19274993/pexels-photo-19274993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        width: "300px",
        height: "300px",
    },
};

/**
 * 图片预览
 */
export const PreviewTemp: Story = {
    render: () => {
        return (
            <ImageViewer>
                <ImageComponent
                    src="https://images.pexels.com/photos/19274993/pexels-photo-19274993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width="300px"
                    height="300px"
                />
            </ImageViewer>
        );
    },
};

/**
 * 图片预览组
 */
export const PreviewGroupTemp: Story = {
    render: () => {
        return (
            <ImageViewer>
                <ImageComponent
                    src="https://images.pexels.com/photos/19274993/pexels-photo-19274993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width="300px"
                    height="300px"
                    index={3}
                />
                <ImageComponent
                    src="https://dr-app-pub.oss-cn-hangzhou.aliyuncs.com/v2-dev/cmty_haksen_banrs/01HGJ5BG9ER4G20GRMVB2CH5Q6/v2-125df4a776a451c03b711a1c076ab3af_1440w.jpg"
                    width="300px"
                    height="300px"
                    index={2}
                />
                <ImageComponent
                    src="https://dr-app-pub.oss-cn-hangzhou.aliyuncs.com/v2-dev/cmty_haksen_banrs/01H8ZWE7QYDAZN1MPXZR7KAPKC/06.png"
                    width="300px"
                    height="300px"
                    index={1}
                />
                <ImageComponent
                    src="https://dr-app-pub.oss-cn-hangzhou.aliyuncs.com/v2-dev/cmty_haksen_banrs/default/haksen.jpg"
                    width="300px"
                    height="300px"
                    index={0}
                />
            </ImageViewer>
        );
    },
};
