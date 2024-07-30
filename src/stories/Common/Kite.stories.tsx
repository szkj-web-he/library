/**
 * @file kite stories
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC, useState } from "react";
import { Kite, KiteProps } from "../../Components/Common/Kite";

/**
 * Dropdown component
 */
export default {
    title: "Common/Kite",
    component: Kite,
} as Meta;

type Story = StoryObj<typeof Kite>;

const KiteTemp: FC<KiteProps> = (args) => {
    const [show, setShow] = useState<boolean>(false);
    const [value, setValue] = useState("");

    const handleGlobalClick = (status: { isBtn: boolean; isMenu: boolean }) => {
        if (status.isBtn === false && status.isMenu === false) {
            setShow(false);
        }
    };
    const [root, setRoot] = useState<HTMLElement>();

    return (
        <>
            <input
                type="text"
                onFocus={(e) => {
                    setRoot(e.currentTarget);
                    setShow(true);
                }}
                onInput={(e) => {
                    setValue(e.currentTarget.value);
                }}
            />
            <button
                onClick={(e) => {
                    const node = e.currentTarget;
                    if (node === root) {
                        setShow((pre) => !pre);
                    } else {
                        setRoot(node);

                        setShow(true);
                    }
                }}
            >
                click me
            </button>
            <button
                onClick={(e) => {
                    const node = e.currentTarget;
                    if (node === root) {
                        setShow((pre) => !pre);
                    } else {
                        setRoot(node);
                        setShow(true);
                    }
                }}
            >
                click me too
            </button>
            {root && (
                <Kite
                    {...args}
                    // triangle={{
                    //     width: "1rem",
                    //     height: "1rem",
                    //     color: "#fff",
                    // }}
                    handleGlobalClick={handleGlobalClick}
                    show={show}
                    root={root}
                >
                    <div
                        style={{
                            height: "auto",
                            backgroundColor: "#000",
                            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                            margin: 0,
                            padding: 0,
                            color: "#fff",
                            width: "20rem",
                        }}
                    >
                        <div
                            style={{
                                padding: "5px 10px",
                            }}
                        >
                            a: mount on body
                        </div>
                        <div
                            style={{
                                padding: "5px 10px",
                            }}
                        >
                            b: position auto
                        </div>
                        <p>{value}</p>
                    </div>
                </Kite>
            )}
        </>
    );
};

/**
 * default component
 *
 */
export const DefaultTmp: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        placement: "lb",
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
    },
};

/**
 * no triangle
 */
export const NoTriangle: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        style: {
            zIndex: "99",
        },
        placement: "lt",
    },
};

/**
 * removeOnHidden
 */
export const RemoveOnHidden: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        style: {
            zIndex: "99",
        },
        placement: "lc",
        removeOnHidden: true,
        cache: false,
        direction: "horizontal",
    },
};

/**
 *lb Horizontal  component
 */
export const LbHorizontal: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        direction: "horizontal",
        placement: "lb",
    },
};

/**
 *rb horizontal  component
 */
export const RbHorizontal: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        direction: "horizontal",
        placement: "rb",
    },
};

/**
 *lt horizontal  component
 */
export const LtHorizontal: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        direction: "horizontal",
        placement: "lt",
    },
};

/**
 *rt horizontal  component
 */
export const RtHorizontal: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        direction: "horizontal",
        placement: "rt",
    },
};

/**
 *rc horizontal  component
 */
export const RcHorizontal: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        direction: "horizontal",
        placement: "rc",
    },
};

/**
 *lc horizontal  component
 */
export const LcHorizontal: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        direction: "horizontal",
        placement: "lc",
    },
};

/**
 *lb vertical  component
 */
export const LbVertical: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        // triangle: {
        //     width: "2rem",
        //     height: "1rem",
        // },
        direction: "vertical",
        placement: "lb",
    },
};

/**
 *rb vertical  component
 */
export const RbVertical: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        // triangle: {
        //     width: "2rem",
        //     height: "1rem",
        // },
        direction: "vertical",
        placement: "rb",
    },
};

/**
 *cb vertical  component
 */
export const CbVertical: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        // triangle: {
        //     width: "2rem",
        //     height: "1rem",
        // },
        direction: "vertical",
        placement: "cb",
    },
};

/**
 *lt vertical  component
 */
export const LtVertical: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        // triangle: {
        //     width: "2rem",
        //     height: "1rem",
        // },
        direction: "vertical",
        placement: "lt",
    },
};

/**
 *ct vertical  component
 */
export const CtVertical: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        // triangle: {
        //     width: "2rem",
        //     height: "1rem",
        // },
        direction: "vertical",
        placement: "ct",
    },
};

/**
 *rt vertical  component
 */
export const RtVertical: Story = {
    render: (args) => {
        return <KiteTemp {...args} />;
    },
    args: {
        // triangle: {
        //     width: "2rem",
        //     height: "1rem",
        // },
        direction: "vertical",
        placement: "rt",
    },
};
