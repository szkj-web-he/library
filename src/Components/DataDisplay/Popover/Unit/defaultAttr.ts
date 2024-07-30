/**
 * @file defaultAttr
 * @date 2022-01-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-14
 */

import { OffsetHeightFn, OffsetWidthFn } from "../../../Common/Kite/Unit/autoPosition";
import { Direction } from "../../../Common/Kite/Unit/type";
import { Placement } from "../../../Common/Unit/type";

export interface TriangleProps {
    width: string;
    height: string;
    color?: string;
    offset?: {
        x?: number | OffsetWidthFn;
        y?: number | OffsetHeightFn;
    };
}

export interface OffsetProps {
    x?: number | OffsetWidthFn;
    y?: number | OffsetWidthFn;
}

export const defaultAttr = (
    p: Placement,
    d: Direction,
): {
    triangle: TriangleProps;
    offset: OffsetProps;
} => {
    let triangle: TriangleProps | undefined = undefined;
    let offset: OffsetProps = {};
    switch (d) {
        case "horizontal":
            triangle = {
                width: "0.5rem",
                height: "1rem",
                color: "rgba(0,0,0,0.7)",
            };
            if (p.endsWith("t")) {
                offset = {
                    y: (value, data) => {
                        /**
                         * 如果下拉列表可以放下三角
                         */
                        if (data.kite >= data.triangle + 15) {
                            if (data.root < data.triangle + 13) {
                                /**
                                 * 如果btn放不下三角
                                 */
                                return value - 13;
                            }
                            /**
                             * 如果btn放的下三角
                             */
                            return value;
                        }
                        /**
                         * 如果下拉列表不可以放下
                         */
                        return value;
                    },
                };

                triangle.offset = {
                    y: (value, data) => {
                        /**
                         * 如果下拉列表可以放下三角
                         */
                        if (data.kite >= data.triangle + 15) {
                            if (data.root >= data.triangle + 13) {
                                /**
                                 *  如果btn可以放下三角
                                 */
                                return data.root / 2 - 13 - data.triangle > 0 ? 13 : value;
                            }

                            /**
                             *  如果btn放不下三角
                             */
                            return value;
                        }

                        /**
                         * 如果下拉列表不可以放下
                         */
                        return value;
                    },
                };
            } else if (p.endsWith("b")) {
                triangle.offset = {
                    y: (value, data) => {
                        /**
                         * 如果下拉列表可以放下三角
                         */
                        if (data.kite >= data.triangle + 15) {
                            if (data.root >= data.triangle + 13) {
                                /**
                                 * 如果btn可以放下三角
                                 */
                                return data.root / 2 - 13 - data.triangle > 0
                                    ? data.kite - 13 - data.triangle
                                    : value;
                            }

                            /**
                             * 如果btn放不下三角
                             */
                            return value;
                        }

                        /**
                         * 如果下拉列表放不下三角
                         */
                        return value;
                    },
                };

                offset = {
                    y: (value, data) => {
                        /**
                         * 如果下拉列表可以放下三角
                         */
                        if (data.kite >= data.triangle + 15) {
                            if (data.root < data.triangle + 13) {
                                /**
                                 * 如果btn放不下下三角
                                 */
                                return value + 13;
                            }

                            /**
                             * 如果btn放的下三角
                             */
                            return value;
                        }

                        /**
                         * 如果下拉列表放不下三角
                         */
                        return value;
                    },
                };
            }

            break;
        case "vertical":
            triangle = {
                width: "1rem",
                height: "0.5rem",
                color: "rgba(0,0,0,0.7)",
            };

            if (p.startsWith("l")) {
                offset = {
                    x: (value, data) => {
                        /**
                         * 如果下拉内容可以放下三角
                         */
                        if (data.kite > data.triangle + 15) {
                            if (data.root < data.triangle + 13) {
                                /**
                                 * 如果btn放不下三角
                                 */
                                return value - 13;
                            }
                            return value;
                        }
                        /**
                         * 如果下拉内容放不下三角
                         */
                        return value;
                    },
                };

                triangle.offset = {
                    x: (value, data) => {
                        /**
                         * 如果下拉内容可以放下三角
                         */
                        if (data.kite > data.triangle + 15) {
                            if (data.root < data.triangle + 13) {
                                /**
                                 * 如果btn放不下三角
                                 */
                                return value;
                            }
                            return 13;
                        }
                        return value;
                    },
                };
            } else if (p.startsWith("r")) {
                offset = {
                    x: (value, data) => {
                        /**
                         * 如果下拉内容可以放下三角
                         */
                        if (data.kite > data.triangle + 15) {
                            if (data.root < data.triangle + 13) {
                                /**
                                 * 如果btn放不下三角
                                 */
                                return value + 13;
                            }
                            return value;
                        }
                        return value;
                    },
                };

                triangle.offset = {
                    x: (value, data) => {
                        /**
                         * 如果下拉内容可以放下三角
                         */
                        if (data.kite > data.triangle + 15) {
                            if (data.root < data.triangle + 13) {
                                /**
                                 * 如果btn放不下三角
                                 */
                                return value;
                            }
                            return data.kite - 13 - data.triangle;
                        }
                        return value;
                    },
                };
            }
            break;
    }
    return {
        triangle,
        offset,
    };
};
