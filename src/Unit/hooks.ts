/**
 * @file 有关hooks的导出
 * @date 2023-06-19
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-19
 */

import { useDomDisplay } from "../Hooks/useDomDisplay";
import { useDomResize } from "../Hooks/useDomResize";
import { useDomResizeLayout } from "../Hooks/useDomResizeLayout";
import useEventListener from "../Hooks/useEventListener";
import useLayoutEventListener from "../Hooks/useLayoutEventListener";
import useUpdateEffect from "../Hooks/useUpdateEffect";
import useUpdateLayoutEffect from "../Hooks/useUpdateLayoutEffect";
import { useLatest } from "../Hooks/useLatest";
import { useUnmount } from "../Hooks/useUnmount";
import { useLoginStatus } from "../Components/OIDCLogin/Unit/login/loginContext";
import { useScroll } from "../Hooks/useScroll";
import { useMemoizedFn } from "../Hooks/useMemoizedFn";
import { useEffectWithTarget } from "../Hooks/useEffectWithTarget";
import useRafState from "../Hooks/useRafState";
import useRafTimeout from "../Hooks/useRafTimeout";
import useRafInterval from "../Hooks/useRafInterval";
import useControllableValue from "../Hooks/useControllableValue";
import useGetSet from "../Hooks/UseGetSet";

import { useAssetsType } from "../Components/Grid/Sidebar/Context/assetsType";
import { useOrgReducer } from "../Components/Grid/Sidebar/Context/orgReducer";
import { usePreferredOrgReducer } from "../Components/Grid/Sidebar/Context/preferredOrgReducer";
import { useSelectedOrg } from "../Components/Grid/Sidebar/Context/selectedOrg";
import { useSidebarDispatch } from "../Components/Grid/Sidebar/Context/dispatch";
import { useStateCallback } from "../Hooks/useStateCallback";
import { useHoverTips } from "../Components/DropdownList/TipsContainer/useTips";
import useUpdate from "./../Hooks/useUpdate";
import { useTransitionStatus } from "../Components/Common/Transition/Context/status";

export {
    useGetSet,
    /**
     * 后台管理系统类型的hook
     * 用来分发侧边栏的行为
     */
    useSidebarDispatch,
    /**
     * 后台管理系统类型的hook
     * 用来获取侧边栏的静态资源类型
     */
    useAssetsType,
    /**
     * 后台管理系统类型的hook
     * 用来获取请求到的组织列表数据
     */
    useOrgReducer,
    /**
     * 后台管理系统类型的hook
     * 用来获取请求到的偏好组织信息
     */
    usePreferredOrgReducer,
    /**
     * 后台管理系统类型的hook
     * 用来获取设置的组织数据
     */
    useSelectedOrg,

    /**
     * useEffect的return简写模式
     */
    useUnmount,
    /**
     * 获取最新的state
     * 如果在useEffect或者useLayoutEffect里不想监听某个state,且调用时始终为最新的state
     * 就可以用它
     */
    useLatest,
    /**
     * 监听dom与document的相交变化
     *
     * 可用来判断dom是否可见
     */
    useDomDisplay,
    /**
     *  监听dom的尺寸变化
     */
    useDomResize,
    /**
     * 同useDomResize
     * 只是它为useLayoutEffect模式
     */
    useDomResizeLayout,
    /**
     * 绑定事件
     */
    useEventListener,
    /**
     * 同useEventListener
     * 只是它为useLayoutEffect模式
     */
    useLayoutEventListener,
    /**
     * 获取<Transition>组件的过渡状态
     * 前提时作为<Transition>的children进行调用
     */
    useTransitionStatus,
    /**
     * 监听 数据更新
     * 数据的第一次改变不会触发
     */
    useUpdateEffect,
    /**
     * 同useUpdateEffect
     * 只是它为useLayoutEffect模式
     */
    useUpdateLayoutEffect,
    /**
     * 获取用户在平台的登录状态
     */
    useLoginStatus,
    useScroll,
    useMemoizedFn,
    useUpdate,
    useEffectWithTarget,
    useRafState,
    useRafTimeout,
    useRafInterval,
    useControllableValue,
    /**
     * 这个setState可以确保state更新后，执行你的callback
     */
    useStateCallback,
    /**
     * 当鼠标移入 某个dom上时，展示浮动文字
     */
    useHoverTips,
};
