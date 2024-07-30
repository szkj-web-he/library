/**
 * @file 类型的导出
 * @date 2023-06-19
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-19
 */

import { ChartDataset, ChartOptions, ChartType, ScatterDataPoint } from "chart.js";
import { Descendant } from "slate";
import { MobileDatePickerEvents } from "../Components/Calendar/MobileDatePicker";
import { EventParams } from "../Components/Common/Kite/Unit/eventListener";
import { ContactsDialogEvents } from "../Components/Contacts/ContactsDialog";
import { ContactsDropdownEvents } from "../Components/Contacts/ContactsDropdown";
import { DialogGroupForwardEvents } from "../Components/Cover/DialogGroup";
import { InputEvents } from "../Components/DataInput/Input";
import iconType, { IconDefinition } from "../Components/Icon/Unit/customFontIcon";
import { OIDCRouteType } from "../Components/OIDCLogin/Unit/Utils/type";
import { BtnProps, BtnEvents } from "../Components/Buttons/Btn";
import { NormalBtnProps } from "../Components/Buttons/NormalBtn";
import { TextBtnProps } from "../Components/Buttons/TextBtn";
import { BorderBtnProps } from "../Components/Buttons/BorderBtn";

import { ImageViewerEvents, ImageViewerProps } from "../Components/Preview/ImageViewer";

type IconTypes = keyof typeof iconType;

export type {
    NormalBtnProps,
    TextBtnProps,
    BorderBtnProps,
    BtnProps,
    BtnEvents,
    ChartDataset,
    ChartOptions,
    ChartType,
    /**
     * 联系人对话框组件的转发事件类型
     */
    ContactsDialogEvents,
    /**
     * 下拉联系人组件的转发事件类型
     */
    ContactsDropdownEvents,
    Descendant,
    /**
     * 类型: dialog group转发的事件
     */
    DialogGroupForwardEvents,
    EventParams,
    IconDefinition,
    /**
     * icon的type属性值
     */
    IconTypes,
    /**
     * Input的事件转发类型
     */
    InputEvents,
    MobileDatePickerEvents,
    OIDCRouteType,
    ScatterDataPoint,
    /**
     * 图片预览转发的事件
     */
    ImageViewerEvents,
    /**
     * 图片预览的参数
     */
    ImageViewerProps,
};
