/**
 * @file transitionClass
 * @date 2022-01-06
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-06
 */

import styles from "../../Portal/style.module.scss";

export interface TransitionClassProps {
    enter: {
        active: string;
        to: string;
        from: string;
    };
    leave: {
        active: string;
        to: string;
        from: string;
    };
}

export const getTransitionClass = (
    x: "l" | "r" | "c",
    y: "t" | "b" | "c",
    direction: "vertical" | "horizontal",
): TransitionClassProps => {
    const str = direction.slice(0, 1) + x + y;
    return {
        enter: {
            active: styles[`kite_${str}EnterActive`],
            to: styles[`kite_${str}EnterTo`],
            from: styles[`kite_${str}EnterFrom`],
        },
        leave: {
            active: styles[`kite_${str}LeaveActive`],
            to: styles[`kite_${str}LeaveTo`],
            from: styles[`kite_${str}LeaveFrom`],
        },
    };
};
