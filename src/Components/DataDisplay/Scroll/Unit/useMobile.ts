import { useCallback, useState } from "react";
import useEventListener from "../../../../Hooks/useEventListener";

const isMobile = (): boolean => {
    return window.matchMedia("(pointer:coarse)").matches;
};

export const useMobile = (): boolean => {
    const [state, setState] = useState(isMobile());

    const handleResize = useCallback(() => {
        setState(isMobile());
    }, []);

    useEventListener("resize", handleResize);

    return state;
};
