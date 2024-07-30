/**
 * @file: data date
 * @date: 2021-05-21 10:32
 * @author: xuejie.he
 * @lastModify: xuejie.he 2021-05-21 10:32
 */

import i18next from "i18next";

export const weekData = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const monthDropDownList = () => [
    {
        id: 1,
        content: i18next.t("CalendarComponent.January"),
    },
    {
        id: 2,
        content: i18next.t("CalendarComponent.February"),
    },
    { id: 3, content: i18next.t("CalendarComponent.March") },
    {
        id: 4,
        content: i18next.t("CalendarComponent.April"),
    },
    {
        id: 5,
        content: i18next.t("CalendarComponent.May"),
    },
    {
        id: 6,
        content: i18next.t("CalendarComponent.June"),
    },
    {
        id: 7,
        content: i18next.t("CalendarComponent.July"),
    },
    {
        id: 8,
        content: i18next.t("CalendarComponent.August"),
    },
    {
        id: 9,
        content: i18next.t("CalendarComponent.September"),
    },
    {
        id: 10,
        content: i18next.t("CalendarComponent.October"),
    },
    {
        id: 11,
        content: i18next.t("CalendarComponent.November"),
    },
    {
        id: 12,
        content: i18next.t("CalendarComponent.December"),
    },
];
