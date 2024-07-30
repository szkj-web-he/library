/**
 * @file 凭借dropdown的通讯id
 * @date 2023-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-08
 */

/**
 * 统一通讯的id拼接方式
 */
export const joinMsgId = (id: string, eventId?: string) => {
    let str = id;
    if (eventId) {
        str += `-${eventId}`;
    }
    return str;
};
