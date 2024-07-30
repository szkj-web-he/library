import { BaseEditor, BaseSelection, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export interface PointProps {
    selection: BaseSelection;
    type: CustomText;
}

export interface CustomEditor extends BaseEditor, ReactEditor, HistoryEditor {
    noSelection?: PointProps;
    setNoSelectionData: (res?: PointProps) => void;
    maxLength?: number;
}

export type EmptyText = {
    text: string;
};

// export interface QuoteElement {
//     type: "quote";
//     children: Descendant[];
// }

// export interface PreElement {
//     type: "pre";
//     children: Descendant[];
// }

// export interface BulletedListElement {
//     type: "bulleted-list";
//     children: Descendant[];
// }

// export interface HeadOneElement {
//     type: "heading-one";
//     children: Descendant[];
// }

// export interface HeadTwoElement {
//     type: "heading-two";
//     children: Descendant[];
// }

// export interface HeadThreeElement {
//     type: "heading-three";
//     children: Descendant[];
// }

// export interface HeadFourElement {
//     type: "heading-four";
//     children: Descendant[];
// }

// export interface HeadFiveElement {
//     type: "heading-five";
//     children: Descendant[];
// }

// export interface HeadSixElement {
//     type: "heading-six";
//     children: Descendant[];
// }

// export interface ListItemElement {
//     type: "list-item";
//     children: Descendant[];
// }

// export interface NumberedListElement {
//     type: "numbered-list";
//     children: Descendant[];
// }

// export interface LinkElement {
//     type: "link";
//     url: string;
//     children: Descendant[];
// }

export interface LeftAlignElement {
    type: "left-align";
    children: Descendant[];
}

export interface RightAlignElement {
    type: "right-align";
    children: Descendant[];
}

export interface CenterAlignElement {
    type: "center-align";
    children: Descendant[];
}

export interface ImageElement {
    type?: "image";
    url?: string;
    children: EmptyText[];
}

export interface TextVoidElement {
    type: "voidText";
    color?: string;
    content: string;
    children: EmptyText[];
}

type CustomElement =
    // | QuoteElement
    // | PreElement
    // | BulletedListElement
    // | HeadOneElement
    // | HeadTwoElement
    // | HeadThreeElement
    // | HeadFourElement
    // | HeadFiveElement
    // | HeadSixElement
    // | ListItemElement
    // | NumberedListElement
    // | LinkElement
    LeftAlignElement | RightAlignElement | CenterAlignElement | TextVoidElement | ImageElement;

export type CustomText = {
    bold?: boolean;
    italic?: boolean;
    // code?: boolean;
    text: string;

    underline?: boolean;
    "line-through"?: boolean;
    "font-size"?: number;
    color?: string;
    background?: string;
    custom?: boolean;
};

declare module "slate" {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
