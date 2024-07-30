/**
 * @file Popver stories file
 * @date 2022-01-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-13
 */
import { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverProps } from "../../Components/DataDisplay/Popover";
import { FC } from "react";
import { Icon } from "../..";
/**
 * Popover component
 *
 */
export default {
    title: "DataDisplay/Popover",
    component: Popover,
} as Meta;

type Story = StoryObj<typeof Popover>;

const Template: FC<PopoverProps> = (args) => {
    // const [show, setShow] = useState(false);
    return (
        <Popover
            {...args}
            root={
                <span>
                    <span>
                        有autoSize属性可以自适应宽高(默认值为false)
                        <br />
                        在autoSize的状态下，会有最大宽高，溢出会出现滚动条
                    </span>
                </span>
            }
        >
            msg
            {/* Feature:
            <br />
            1. root does not create additional parent boxes
            <br />
            2. Support custom offset */}
        </Popover>
    );
};

/**
 * Popover component
 *
 */
export const PopoverSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        autoSize: true,
    },
};

/**
 *lb Horizontal Popover component
 */
export const LbHorizontalPopover: Story = {
    render: (args) => <Template {...args} />,
    args: { direction: "horizontal", placement: "lb", disable: true },
};

/**
 *rb horizontal Popover component
 */
export const RbHorizontalPopover: Story = {
    render: (args) => <Template {...args} />,
    args: {
        direction: "horizontal",
        placement: "rb",
    },
};

/**
 *lt horizontal Popover component
 */
export const LtHorizontalPopover: Story = {
    render: (args) => <Template {...args} />,
    args: {
        direction: "horizontal",
        placement: "lt",
    },
};

/**
 *rt horizontal Popover component
 */
export const RtHorizontalPopover: Story = {
    render: (args) => <Template {...args} />,
    args: {
        direction: "horizontal",
        placement: "rt",
    },
};

/**
 *rc horizontal Popover component
 */
export const RcHorizontalPopover: Story = {
    render: (args) => <Template {...args} />,
    args: {
        direction: "horizontal",
        placement: "rc",
    },
};

/**
 *lc horizontal Popover component
 */
export const LcHorizontalPopover: Story = {
    render: (args) => <Template {...args} />,
    args: {
        direction: "horizontal",
        placement: "lc",
    },
};

/**
 *lb vertical Popover component
 */
export const LbVerticalPopover: Story = {
    render: (args) => <Template {...args} />,
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
 *rb vertical Popover component
 */
export const RbVerticalPopover: Story = {
    render: (args) => <Template {...args} />,
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
 *cb vertical Popover component
 */
export const CbVerticalPopover: Story = {
    render: (args) => <Template {...args} />,
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
 *lt vertical Popover component
 */
export const LtVerticalPopover: Story = {
    render: (args) => <Template {...args} />,
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
 *ct vertical Popover component
 */
export const CtVerticalPopover: Story = {
    render: (args) => <Template {...args} />,
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
 *rt vertical Popover component
 */
export const RtVerticalPopover: Story = {
    render: (args) => <Template {...args} />,
    args: {
        // triangle: {
        //     width: "2rem",
        //     height: "1rem",
        // },
        direction: "vertical",
        placement: "rt",
    },
};

/**
 * 小root
 */
export const QEditorPopover: Story = {
    args: {
        autoSize: true,
        direction: "vertical",
        placement: "rt",
        offset: {
            x: undefined,
            y: undefined,
        },
        children: "转换行选项与列选项",
        root: <Icon type="transform" fontSize="1.6rem" />,
    },
};
