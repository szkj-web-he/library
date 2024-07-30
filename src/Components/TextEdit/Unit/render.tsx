/**
 * @file render
 * @date 2022-03-03
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-03
 */

import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { ImageElement, TextVoidElement } from "../slate";

export const Render = ({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
        // case "quote":
        //     return <blockquote {...attributes}>{children}</blockquote>;
        // case "pre":
        //     return <pre {...attributes}>{children}</pre>;
        // case "bulleted-list":
        //     return <ul {...attributes}>{children}</ul>;
        // case "heading-one":
        //     return <h1 {...attributes}>{children}</h1>;
        // case "heading-two":
        //     return <h2 {...attributes}>{children}</h2>;
        // case "heading-three":
        //     return <h3 {...attributes}>{children}</h3>;
        // case "heading-four":
        //     return <h4 {...attributes}>{children}</h4>;
        // case "heading-five":
        //     return <h5 {...attributes}>{children}</h5>;
        // case "heading-six":
        //     return <h6 {...attributes}>{children}</h6>;
        // case "list-item":
        //     return <li {...attributes}>{children}</li>;
        // case "numbered-list":
        //     return <ol {...attributes}>{children}</ol>;
        // case "link":
        //     return (
        //         <a href={(element as unknown as Record<"url", string>).url} {...attributes}>
        //             {children}
        //         </a>
        //     );

        case "left-align":
            return (
                <div
                    {...attributes}
                    style={{
                        textAlign: "left",
                    }}
                >
                    {children}
                </div>
            );
        case "right-align":
            return (
                <div
                    {...attributes}
                    style={{
                        textAlign: "right",
                    }}
                >
                    {children}
                </div>
            );
        case "center-align":
            return (
                <div
                    {...attributes}
                    style={{
                        textAlign: "center",
                    }}
                >
                    {children}
                </div>
            );
        case "image":
            return (
                <Image attributes={attributes} element={element}>
                    {children}
                </Image>
            );

        case "voidText":
            return (
                <TextVoid attributes={attributes} element={element}>
                    {children}
                </TextVoid>
            );

        default:
            return <div {...attributes}>{children}</div>;
    }
};

/**
 * image element
 */
export const Image = ({ attributes, children, element }: RenderElementProps) => {
    const elementType = element as ImageElement;

    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            {children}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexFlow: "row nowrap",
                }}
                contentEditable={false}
            >
                <img
                    src={elementType.url}
                    style={Object.assign(
                        {},
                        { display: "block", maxWidth: "600px" },
                        { boxShadow: selected && focused ? "0 0 1px 2px #B4D5FF" : "none" },
                    )}
                    alt=""
                />
            </div>
        </div>
    );
};

/**
 * 文字图片
 */
export const TextVoid = ({ attributes, children, element }: RenderElementProps) => {
    const elementType = element as TextVoidElement;
    const selected = useSelected();
    const focused = useFocused();

    return (
        <span
            {...attributes}
            contentEditable={false}
            style={{
                color: selected && focused ? "#fff" : elementType.color,
                backgroundColor: selected && focused ? elementType.color : "transparent",
            }}
        >
            {children}
            {elementType.content}
        </span>
    );
};
