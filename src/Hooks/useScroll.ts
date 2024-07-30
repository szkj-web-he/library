/**
 * @file
 * @date 2022-12-07
 * @author mingzhou.zhang
 * @lastModify  2022-12-07
 */
import type { MutableRefObject } from "react";
import { useLatest } from "./useLatest";
import useRafState from "./useRafState";
import { isBrower, isFunction } from "../Unit/utils";
import { useEffectWithTarget } from "./useEffectWithTarget";

type Position = { left: number; top: number };

export type TargetValue<T> = T | undefined | null;

export type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
    | (() => TargetValue<T>)
    | TargetValue<T>
    | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
    if (!isBrower) {
        return undefined;
    }

    if (!target) {
        return defaultElement;
    }

    let targetElement: TargetValue<T>;

    if (isFunction(target)) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        targetElement = (target as Function)();
    } else if ("current" in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
}

export type Target = BasicTarget<Element | Document>;

export type ScrollListenController = (val: Position) => boolean;

export const useScroll = (
    target?: Target,
    shouldUpdate: ScrollListenController = () => true,
): Position | undefined => {
    const [position, setPosition] = useRafState<Position>();

    const shouldUpdateRef = useLatest(shouldUpdate);

    useEffectWithTarget(
        () => {
            const el = getTargetElement(target, document);
            if (!el) return;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const updatePosition = () => {
                let newPosition: Position;
                if (el === document) {
                    newPosition = document.scrollingElement
                        ? {
                              left: document.scrollingElement.scrollLeft,
                              top: document.scrollingElement.scrollTop,
                          }
                        : {
                              left: Math.max(
                                  window.pageXOffset,
                                  document.documentElement.scrollLeft,
                                  document.body.scrollLeft,
                              ),
                              top: Math.max(
                                  window.pageYOffset,
                                  document.documentElement.scrollTop,
                                  document.body.scrollTop,
                              ),
                          };
                } else {
                    newPosition = {
                        left: (el as Element).scrollLeft,
                        top: (el as Element).scrollTop,
                    };
                }

                if (shouldUpdateRef.current(newPosition)) {
                    setPosition(newPosition);
                }
            };

            updatePosition();

            el.addEventListener("scroll", updatePosition);
            return () => {
                el.removeEventListener("scroll", updatePosition);
            };
        },
        [],
        target,
    );

    return position;
};
