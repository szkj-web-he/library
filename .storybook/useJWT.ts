/**
 * @file 只用来设置组件库的jwt,避免加载Sidebar的时候，会因为jwt失效导致无法展示
 * @date 2023-10-21
 * @author xuejie.he
 * @lastModify xuejie.he 2023-10-21
 */

import { useEffect, useState } from "react";

// 用于保存输入的 JWT Token
let storedJwt: null | string = null;

const useJwt = () => {
    const [jwt, setJwt] = useState(storedJwt);

    useEffect(() => {
        // 如果之前没有保存过 JWT Token，则弹出输入框
        if (!storedJwt) {
            const userInput = prompt("请输入JWT Token:");
            if (userInput) {
                storedJwt = userInput;
                setJwt(userInput);
            } else {
                // 如果用户取消输入，则可以根据需求处理
                // 在这里设置为 null，但你也可以保持 jwt 不变或者做其他处理
                storedJwt = null;
                setJwt(null);
            }
        }
    }, []); // 空数组作为依赖，确保只在组件挂载时执行一次

    return jwt;
};

export default useJwt;
