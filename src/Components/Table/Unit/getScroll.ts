/**
 * @file getScrollStatus
 * @date 2022-03-24
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-24
 */

export interface ScrollProps {
    left: number;
    top: number;
    scrollHeight: number;
    scrollWidth: number;
    offsetHeight: number;
    offsetWidth: number;
    clientHeight: number;
    clientWidth: number;
}

export interface ScrollStatus {
    left: boolean;
    right: boolean;
}

/**
 * 获取滚动条状态
 * @param {ScrollProps } res
 * @returns {ScrollStatus}
 */
export const getScrollStatus = (res: ScrollProps): ScrollStatus => {
    const left = res.left;
    const scrollWidth = res.scrollWidth;
    const clientWidth = res.clientWidth;
    const right = scrollWidth - clientWidth - left;
    return {
        left: left <= 0,
        right: right <= 0,
    };
};
