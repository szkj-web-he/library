export interface OIDCRouteType {
    /**
     * 路径
     */
    path: string;
    /**
     * element
     */
    element: React.LazyExoticComponent<() => JSX.Element>;
    /**
     * 是否私有(需要登录才能访问的界面)
     */
    isPrivate?: boolean;
    /**
     * 子路由表
     */
    children?: OIDCRouteType[];
}

/**
 * 组件里需要的路由格式
 * {path:isPrivate}
 */
export type OIDCRouteProps = Record<string, boolean>;
