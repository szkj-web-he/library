/**
 * @file Animation stories
 * @date 2021-05-27
 * @author xuejie.he
 * @lastModify xuejie.he 2021-05-27
 */
import { Meta, StoryObj } from "@storybook/react";
import React, { FC, useEffect, useState } from "react";
import { useTransitionStatus } from "../..";
import { Transition, TransitionProps } from "../../Components/Common/Transition";
import styles from "../../Components/Common/Transition/animation.module.scss";
/**
 * Animation component
 *
 */
export default {
    title: "Common/Transition",
    component: Transition,
} as Meta<typeof Transition>;

const SubComponent: React.FC = () => {
    const getStatus = useTransitionStatus();
    const status = getStatus();
    useEffect(() => {
        switch (status) {
            case "ENTER-DONE":
                console.log("进入的过渡动画 - 执行结束");
                break;
            case "ENTER-FROM":
                console.log("进入的过渡动画 - 执行开始");
                break;
            case "ENTER-TO":
                console.log("进入的过渡动画 - 执行中");
                break;
            case "READY":
                console.log("加载过渡动画");
                break;
            case "LEAVE-FROM":
                console.log("离开的过渡动画 - 执行开始");
                break;
            case "LEAVE-TO":
                console.log("离开的过渡动画 - 执行中···");
                break;
            case "LEAVE-DONE":
                console.log("离开的过渡动画 - 结束···");
                break;
            default:
                console.log("无动画执行");
                break;
        }
    }, [status]);

    return (
        <>
            <div>1. The callback function of getBoundingClientRect is exposed</div>
            <div>
                2. It is completely possible to add transition-duration and transition-delay css
                attributes to the top children to control the transition effect
            </div>
            <div>
                3. Transition is divided into two stages, enter and leave, and different transition
                effects can be used when entering and leaving
            </div>
            <div>4. It will produce a brand new excellent transitionGroup</div>
            <div>
                5. You can add transition-* to className or style to control the transition effect
            </div>
        </>
    );
};

const Template: FC<TransitionProps> = (args) => {
    const [show, setShow] = useState(false);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
        >
            <button
                onClick={() => {
                    setShow(!show);
                }}
            >
                toggle animation
            </button>

            <Transition {...args} show={show} style={{ display: "inline-block", padding: "2rem" }}>
                <SubComponent />
            </Transition>
        </div>
    );
};

type Story = StoryObj<typeof Transition>;

/**
 *Animation Fade
 *
 */
export const AnimationFade: Story = {
    render: (args) => <Template {...args} />,
    args: {
        animationType: "taller",
        removeOnHidden: true,
        cache: false,
        handleTransitionStart() {
            console.log("TransitionStart");
        },
        handleTransitionEnd() {
            console.log("TransitionEnd");
            console.log(" ");
        },
        handleTransitionCancel() {
            console.log("TransitionCancel");
            console.log(" ");
        },
    },
};

/**
 *Animation move
 *
 */
export const CustomAnimationMove: Story = {
    render: (args) => <Template {...args} />,
    args: {
        enterActive: styles["move-enter-active"],
        leaveActive: styles["move-leave-active"],
        toEnter: styles["move-enter-to"],
        toLeave: styles["move-leave-to"],
        fromEnter: styles["move-enter-from"],
        fromLeave: styles["move-leave-from"],

        handleTransitionStart() {
            console.log("TransitionStart");
        },
        handleTransitionEnd() {
            console.log("TransitionEnd");
            console.log(" ");
        },
        handleTransitionCancel() {
            console.log("TransitionCancel");
            console.log(" ");
        },
    },
};

/**
 * no transition
 */
export const NoTransition: Story = {
    render: (args) => <Template {...args} />,
    args: {
        removeOnHidden: true,
        cache: false,
        handleTransitionStart() {
            console.log("TransitionStart");
        },
        handleTransitionEnd() {
            console.log("TransitionEnd");
            console.log(" ");
        },
        handleTransitionCancel() {
            console.log("TransitionCancel");
            console.log(" ");
        },
    },
};
