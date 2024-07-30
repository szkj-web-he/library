/**
 * @file
 * @date 2022-04-27
 * @author
 * @lastModify  2022-04-27
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useState } from "react";
import { ProjectStatus, ProjectStatusProps, statusType } from "../../Components/Zmz/ProjectStatus";
export default {
    title: "Zmz/ProjectStatus",
    component: ProjectStatus,
} as Meta;

const Template: FC<ProjectStatusProps> = (args) => {
    const [status, setStatus] = useState<statusType>("public");
    const [publishState, setPublishState] = useState(false);
    const handleConfirm = async () => {
        await new Promise((resolve) => {
            publishState ? "" : setPublishState(true);
            status === "public" ? setStatus("private") : setStatus("public");
            resolve(100);
        });
    };
    return (
        <ProjectStatus
            isPublish={publishState}
            status={status}
            handleConfirm={handleConfirm}
            {...args}
        />
    );
};
type Story = StoryObj<typeof ProjectStatus>;

/**
 * Primary Button style
 */
export const Component: Story = {
    render: () => <Template />,
};
