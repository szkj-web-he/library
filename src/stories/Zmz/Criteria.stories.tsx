/**
 * @file
 * @date 2022-05-27
 * @author
 * @lastModify 2022-05-27
 */
import { useState, useRef, FC } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Criteria, CriteriaProps, CriteriaRef } from "../../Components/Zmz/Criteria";

export default {
    title: "Zmz/Criteria",
    component: Criteria,
} as Meta;

const Template: FC<CriteriaProps> = (args) => {
    const [saveStatus, setSaveStatus] = useState(false);
    const [content, setContent] = useState('[{"children":[{"text":"123"}]}]');
    const CriteriaRef = useRef<CriteriaRef>(null);

    /**
     * example
     * @param str The contents of the text box when saving
     * @param zoom when value is true call zoomIn
     */
    const handleSave = (str = content, zoom = false) => {
        const promise = new Promise<{ str: string; zoom: boolean }>((resolve) => {
            window.setTimeout(() => {
                resolve({
                    str,
                    zoom,
                });
            }, 2000);
        });
        setSaveStatus(true);

        promise.then(
            (res) => {
                zoom && CriteriaRef.current?.zoomIn();
                setSaveStatus(false);
                setContent(res.str);
            },
            (error) => {
                console.error(error);
                setSaveStatus(false);
            },
        );
    };

    return (
        <div style={{ position: "relative", width: 500, height: 500, border: "1px solid black" }}>
            <Criteria
                content={content}
                ref={CriteriaRef}
                saveStatus={saveStatus}
                onAutoSave={handleSave}
                onConfirm={(content) => {
                    handleSave(content, true);
                }}
                {...args}
            ></Criteria>
        </div>
    );
};

type Story = StoryObj<typeof Criteria>;

export const CriteriaDefaultSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        style: {
            // marginLeft: 50,
        },
    },
};
