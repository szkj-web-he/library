/**
 * @file 过渡动画的transition
 * @date 2023-11-28
 * @author xuejie.he
 * @lastModify xuejie.he 2023-11-28
 */

export type TransitionStatus =
    | "READY" // 准备 阶段，第一次获取宽高
    | "ENTER-FROM" // 开始进入
    | "ENTER-TO" // 进入中
    | "ENTER-DONE" // 结束进入
    | "LEAVE-FROM" // 开始离开
    | "LEAVE-TO" // 离开中
    | "LEAVE-DONE"; // 结束离开
