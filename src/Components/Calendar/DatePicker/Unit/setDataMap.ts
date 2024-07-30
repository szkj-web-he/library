/**
 * @file:
 * @date: 2021-05-21 10:28
 * @author: xuejie.he
 * @lastModify: xuejie.he 2021-05-21 10:28
 */

/**
 *
 * @param {number} selectedYear year
 * @param {number} selectedMonth month
 * @returns {DateItem[][]}
 */

/**
 * 获取上个月的最后一天
 * @param month 当前要展示的月
 * @param year 当前要展示的年
 */
const getPreMonthDate = (year: number, month: number): DateItem[] | null => {
    const preData = { month: month - 1, year };

    if (preData.month < 1) {
        preData.year = year - 1;
        preData.month = 12;
    }

    /**
     * 开始的周
     * 星期几
     */
    const startWeek = new Date(year, month - 1, 1).getDay();

    /**
     * 上个月的最后一天
     */
    let preMonthDate = new Date(preData.year, preData.month, 0).getDate();
    const arr: DateItem[] = [];
    for (let i = startWeek - 1; i >= 0; i--) {
        arr.unshift({
            year: preData.year,
            month: preData.month,
            date: preMonthDate,
            active: false,
        });
        --preMonthDate;
    }
    return arr;
};

/**
 *
 */
const getCurrentDate = (year: number, month: number): DateItem[] => {
    /**
     * 最后一天
     * 日期
     */
    const lastDate = new Date(year, month, 0);
    /**
     * 最后一天
     */
    const lastDateVal = lastDate.getDate();

    const arr: DateItem[] = [];

    /**
     * 最后一天星期几
     */
    const endWeek = lastDate.getDay();
    /**
     *
     */
    let startWeek = endWeek - (lastDateVal % 7) + 1;

    if (startWeek < 0) {
        startWeek += 7;
    }

    for (let i = 1; i <= lastDateVal; i++) {
        arr.push({
            year,
            month,
            date: i,
            active: true,
        });
    }
    return arr;
};

/**
 * 下个月的天
 */
const getNextMonthDateGroup = (year: number, month: number): DateItem[] => {
    /**
     * 当前月的最后一天
     */
    const lastDate = new Date(year, month, 0).getDate();
    /**
     * 当前月的第一天是星期几
     */
    const firstWeek = new Date(year, month - 1, 1).getDay();
    /**
     * 已占用的单元格
     */
    const total = firstWeek + lastDate;

    const nextData = { month: month + 1, year };
    if (nextData.month > 12) {
        nextData.year = year + 1;
        nextData.month = 1;
    }

    /**
     * 一共要展示42个单元
     * 横6
     * 纵7
     */
    let index = 1;
    const arr: DateItem[] = [];
    for (let i = total + 1; i <= 6 * 7; i++) {
        arr.push({
            year: nextData.year,
            month: nextData.month,
            date: index,
            active: false,
        });
        ++index;
    }
    return arr;
};

/**
 * this function will set the 2 dimension array
 */
export type DateItem = {
    active: boolean;
    date: number;
    month: number;
    year: number;
};
export const setDateMap = (selectedYear: number, selectedMonth: number): DateItem[][] => {
    /**
     * 当前时间的天
     */
    const currentDateGroup = getCurrentDate(selectedYear, selectedMonth);

    /**
     * 上个月的天
     */
    const preMonthDateGroup = getPreMonthDate(selectedYear, selectedMonth) ?? [];

    // 下个月的天

    const nextMonthDateGroup = getNextMonthDateGroup(selectedYear, selectedMonth);

    const dataMap: DateItem[][] = [];
    let index = -1;
    let count = 0;
    for (let i = 0; i < preMonthDateGroup.length; i++) {
        if (count % 7) {
            dataMap[index].push(preMonthDateGroup[i]);
        } else {
            ++index;
            dataMap[index] = [preMonthDateGroup[i]];
        }
        ++count;
    }

    for (let i = 0; i < currentDateGroup.length; i++) {
        if (count % 7) {
            dataMap[index].push(currentDateGroup[i]);
        } else {
            ++index;
            dataMap[index] = [currentDateGroup[i]];
        }
        ++count;
    }

    for (let i = 0; i < nextMonthDateGroup.length; i++) {
        if (count % 7) {
            dataMap[index].push(nextMonthDateGroup[i]);
        } else {
            ++index;
            dataMap[index] = [nextMonthDateGroup[i]];
        }
        ++count;
    }
    return dataMap;
};
