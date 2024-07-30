/**
 * @file dropdown stories
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC, useState } from "react";
import { ScrollComponent } from "../..";
import { Dropdown, DropdownProps } from "../../Components/Common/Dropdown";
import { DropdownBtn } from "../../Components/Common/DropdownBtn";
import { DropdownContent } from "../../Components/Common/DropdownContent";

/**
 * Dropdown component
 */
export default {
    title: "Common/Dropdown",
    component: Dropdown,
} as Meta;

const dropdownContent = (
    <ScrollComponent
        style={{
            width: "300px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "14px",
            borderRadius: "4px",
            boxShadow: "0 2px 5px 0 rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.2)",
            boxSizing: "border-box",
            padding: "5px 10px",
            maxHeight: "150px",
        }}
    >
        <h2>特点</h2>
        <dl>
            <dt style={{ marginBottom: "5px" }}>①、相同点</dt>
            <dd style={{ marginBottom: "5px", lineHeight: "20px" }}>1. click功能相同</dd>
            <dd style={{ marginBottom: "5px", lineHeight: "20px" }}>2. 自动点位的功能相同</dd>
            <dd style={{ marginBottom: "5px", lineHeight: "20px" }}>3. 属性大体相同</dd>
            <dd />
            <dt style={{ marginBottom: "5px", marginTop: "20px" }}>②、不同点</dt>
            <dd style={{ marginBottom: "5px", lineHeight: "20px" }}>
                a. 除了click还集成了hover,focus,contextmenu事件
            </dd>
            <dd style={{ marginBottom: "5px", lineHeight: "20px" }}>
                b. global click不再暴露且不会做多余的执行
            </dd>
            <dd style={{ marginBottom: "5px", lineHeight: "20px" }}>c. 更加的react,使用了组合式</dd>
            <dd style={{ marginBottom: "5px", lineHeight: "20px" }}>
                d. 可以1对多,多对多(dropdown下可以嵌套多个dropdown btn 和多个dropdown
                content。如果需要分组管理,一定要传eventId)
            </dd>
            <dd style={{ lineHeight: "20px" }}>e. 还有更多新功能,期待你的发现</dd>
        </dl>
    </ScrollComponent>
);

type Story = StoryObj<typeof Dropdown>;

/**
 * default component
 *
 */
export const DefaultTmp: Story = {
    args: {
        /**
         * 偏移属性
         */
        offset: {
            x: (vale, { triangle, kite, root }) => {
                console.log("x", { triangle, kite, root });

                return vale;
            },
            y: (vale, { triangle, kite, root }) => {
                console.log("y", { triangle, kite, root });
                return vale;
            },
        },
        /**
         * 事件类型: 左击 右击
         */
        trigger: ["click", "contextmenu"],
        /**
         * 点击下拉框不关闭
         */
        hideOnClick: false,
        /**
         * 三角形的尺寸
         */
        triangle: {
            width: "2rem",
            height: "1rem",
        },
        children: (
            <>
                <DropdownBtn>我可以左击,也可以右击</DropdownBtn>
                <DropdownContent>{dropdownContent}</DropdownContent>
            </>
        ),
    },
};

/**
 * hover
 */
export const HoverTemp: Story = {
    args: {
        /**
         * x:右 y:中
         */
        placement: "rc",
        /**
         * 主轴: 水平
         */
        direction: "horizontal",
        /**
         * 事件类型: hover
         */
        trigger: "hover",
        /**
         * 三角形的尺寸
         */
        triangle: {
            width: "1rem",
            height: "2rem",
        },
        /**
         * 内容
         */
        children: (
            <>
                <DropdownBtn>hover 按钮1</DropdownBtn>
                <p>当下拉内容相同时可以这么写</p>
                <DropdownBtn>hover 按钮2</DropdownBtn>
                <DropdownContent>{dropdownContent}</DropdownContent>
            </>
        ),
    },
};

/**
 * removeOnHidden
 */
export const RemoveOnHidden: Story = {
    args: {
        /**
         * x:左 y:上
         */
        placement: "lt",
        /**
         * 主轴
         * 这决定了下拉框的走向
         */
        direction: "vertical",
        /**
         * 事件类型: focus
         */
        trigger: "focus",
        triangle: {
            width: "2rem",
            height: "1rem",
        },
        removeOnHide: true,
        cache: false,
        children: (
            <>
                <DropdownBtn>我只可以focus</DropdownBtn>
                <DropdownContent>{dropdownContent}</DropdownContent>
            </>
        ),
    },
};

/**
 * 可以多个btn的dropdown
 */
export const NBtnTemp: Story = {
    args: {
        placement: "lb",
        direction: "vertical",
        trigger: "click",
        triangle: {
            width: "2rem",
            height: "1rem",
        },
        removeOnHide: true,
        cache: false,
        children: (
            <>
                <DropdownBtn style={{ display: "inline-block" }}>我是一个可以click</DropdownBtn>
                <span>--</span>
                <DropdownBtn style={{ display: "inline-block" }}>我也是-个可以click</DropdownBtn>
                <DropdownContent>{dropdownContent}</DropdownContent>
            </>
        ),
    },
};

const nContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: "14px",
    borderRadius: "4px",
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.2)",
    border: "1px solid rgba(0,0,0,0.2)",
    boxSizing: "border-box",
    padding: "5px 10px",
};
/**
 * 可以多个content的dropdown
 */
export const NContentTemp: Story = {
    args: {
        removeOnHide: true,
        cache: false,
        children: (
            <>
                <DropdownBtn
                    style={{ display: "inline-block" }}
                    trigger={["click", "hover", "focus", "contextmenu"]}
                    clickId="1"
                    hoverId="2"
                    focusId="3"
                    contextmenuId="4"
                >
                    我是一个相当富有的btn, 我可以点击、右击、hover、focus
                </DropdownBtn>
                <DropdownContent
                    placement="lc"
                    direction="horizontal"
                    eventId="1"
                    trigger={"click"}
                    triangle={{
                        width: "1rem",
                        height: "2rem",
                    }}
                >
                    <div style={nContentStyle}>我是click</div>
                </DropdownContent>
                <DropdownContent
                    placement="ct"
                    direction="vertical"
                    trigger={"hover"}
                    eventId="2"
                    triangle={{
                        width: "2rem",
                        height: "1rem",
                    }}
                >
                    <div style={nContentStyle}>我是hover</div>
                </DropdownContent>
                <DropdownContent
                    placement="rt"
                    direction="horizontal"
                    trigger={"focus"}
                    eventId="3"
                    triangle={{
                        width: "1rem",
                        height: "2rem",
                    }}
                >
                    <div style={nContentStyle}>我是focus</div>
                </DropdownContent>
                <DropdownContent
                    placement="rb"
                    direction="vertical"
                    eventId="4"
                    trigger={"contextmenu"}
                    triangle={{
                        width: "2rem",
                        height: "1rem",
                    }}
                >
                    <div style={nContentStyle}>我是右击</div>
                </DropdownContent>
            </>
        ),
    },
};

const TestStory: FC = (args: DropdownProps) => {
    const [disable, setDisable] = useState(false);
    const event: {
        type: "click" | "hover" | "focus" | "contextmenu";
        name: string;
    } = { type: "contextmenu", name: "右击" };

    return (
        <Dropdown trigger={event.type} disable={disable} {...args}>
            <DropdownBtn style={{ display: "inline-block" }}>{event.name}</DropdownBtn>
            <DropdownContent
                placement="rb"
                direction="horizontal"
                triangle={{
                    width: "1rem",
                    height: "2rem",
                }}
                handleVisibleChange={(res) => {
                    if (res) {
                        setDisable((pre) => {
                            return !pre;
                        });
                    }
                }}
            >
                {dropdownContent}
            </DropdownContent>
        </Dropdown>
    );
};
export const TestTemp: Story = {
    render: () => {
        return <TestStory />;
    },
    args: {},
};
