/**
 * @file 让element执行动画
 * @date 2023-03-06
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-06
 */

export const toAnimate = (el: HTMLElement | Element, show: boolean) => {
    const animateKeyframes = [
        {
            opacity: "0",
            transform: "scale(0)",
        },
        { opacity: "1", transform: "scale(1)" },
    ];

    const animateTiming: KeyframeAnimationOptions = {
        duration: 100,
        direction: show ? "normal" : "reverse",
        easing: show ? "ease" : "ease-out",
        fill: "forwards",
    };
    el.animate(animateKeyframes, animateTiming);
};
