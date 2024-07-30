/**
 * @file
 * @date 2022-11-16
 * @author mingzhou.zhang
 * @lastModify 2022-11-16
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useMemo, useRef, useState } from "react";
import { Icon } from "../../Components/Icon";
import { Tabs, TabsItem, TabsProps } from "../../Components/Zmz/Tabs";

export default {
    title: "Zmz/Tabs",
    component: Tabs,
} as Meta;

const lists: TabsItem[] = [
    {
        label: (
            <span>
                <Icon type="education" style={{ marginRight: ".5rem" }} />
                Tab 1
            </span>
        ),
        key: "1",
        children: `Content of Tab Pane 1`,
    },
    {
        label: (
            <span>
                <Icon type="medicalTreatment" style={{ marginRight: ".5rem" }} />
                Tab 2
            </span>
        ),
        key: "2",
        children: `Content of Tab Pane 2`,
    },
    {
        label: (
            <span>
                <Icon type="Inspection" style={{ marginRight: ".5rem" }} />
                Tab 3
            </span>
        ),
        key: "3",
        children: `Content of Tab Pane 3`,
        // disabled: true,
        closable: false,
    },
];

// default
const DefaultTemplate: FC<TabsProps> = (args) => {
    const [activeKey, setActiveKey] = useState("1");
    const [list] = useState([
        {
            label: (
                <span>
                    <Icon type="education" style={{ marginRight: ".5rem" }} />
                    Tab 1
                </span>
            ),
            key: "1",
            children: (
                <div>
                    <span>Content of Tab Pane 1</span>
                    <button onClick={() => setActiveKey("2")}>go Pane 2</button>
                </div>
            ),
        },
        {
            label: (
                <span>
                    <Icon type="medicalTreatment" style={{ marginRight: ".5rem" }} />
                    Tab 2
                </span>
            ),
            key: "2",
            children: `Content of Tab Pane 2`,
        },
        {
            label: (
                <span>
                    <Icon type="Inspection" style={{ marginRight: ".5rem" }} />
                    Tab 3
                </span>
            ),
            key: "3",
            children: `Content of Tab Pane 3`,
            // disabled: true,
            closable: false,
        },
    ]);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };
    return <Tabs {...args} activeKey={activeKey} items={list} onChange={onChange} />;
};

type Story = StoryObj<typeof Tabs>;

export const DefaultSample: Story = {
    render: () => <DefaultTemplate items={[]} />,
};

// editable card
const TabsEditCardTemplate: FC<TabsProps> = (args) => {
    const [list, setList] = useState(lists);
    const [activeKey, setActiveKey] = useState(lists[0].key);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...list];
        newPanes.push({ label: "New Tab", children: "Content of new Tab", key: newActiveKey });
        setList(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: string) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        list.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = list.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setList(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (payload: string | MouseEvent, action: "add" | "remove") => {
        if (typeof payload !== "string" || action === "add") {
            add();
        } else {
            remove(payload);
        }
    };
    return (
        <Tabs
            {...args}
            activeKey={activeKey}
            items={list}
            onEdit={onEdit}
            onChange={onChange}
            onTabClick={(key, wrap) => console.log("tabclick", key, wrap)}
        />
    );
};

export const TabseditcardSample: Story = {
    render: (args) => <TabsEditCardTemplate {...args} />,
    args: {
        type: "editable-card",
    },
};

// position
const PositionTemplate: FC<TabsProps> = (args) => {
    const [curPos, setCurPos] = useState<TabsProps["tabPosition"]>("top");
    return (
        <>
            <Tabs {...args} items={lists} tabPosition={curPos} />
            <div style={{ marginTop: "2rem" }}>
                <button
                    onClick={() => {
                        setCurPos("top");
                    }}
                >
                    top
                </button>
                <button
                    onClick={() => {
                        setCurPos("right");
                    }}
                >
                    right
                </button>
                <button
                    onClick={() => {
                        setCurPos("bottom");
                    }}
                >
                    bottom
                </button>
                <button
                    onClick={() => {
                        setCurPos("left");
                    }}
                >
                    left
                </button>
            </div>
        </>
    );
};

export const PositionSample: Story = {
    render: (args) => <PositionTemplate {...args} />,
    args: {},
};

// extra node
type ExtraType = "after" | "before";

const OperationsSlot: Record<ExtraType, React.ReactNode> = {
    after: <button>Left Extra Action</button>,
    before: <button>Right Extra Action</button>,
};

const ExtraTemplate: FC<TabsProps> = (args) => {
    const [extraType] = useState<ExtraType[]>(["after", "before"]);

    const slot = useMemo(() => {
        if (extraType.length === 0) return null;

        return extraType.reduce(
            (perv, type) => ({
                ...perv,
                [type]: OperationsSlot[type],
            }),
            {},
        );
    }, [extraType]);

    return <Tabs {...args} items={lists} tabBarExtraContent={slot} />;
};

export const Extra: Story = {
    render: (args) => <ExtraTemplate {...args} />,
    args: {},
};
