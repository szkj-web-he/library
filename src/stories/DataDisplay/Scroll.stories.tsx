/**
 * @file this is the scroll story file
 * @date 2021-06-01
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-01
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useState } from "react";
import { Kite } from "../..";
import { ScrollComponent, ScrollProps } from "../../Components/DataDisplay/Scroll";
import { useRef } from "react";

/**
 * Scroll component
 *
 */
export default {
    title: "DataDisplay/Scroll",
    component: ScrollComponent,
} as Meta;

type Story = StoryObj<typeof ScrollComponent>;

const Template: FC<ScrollProps> = (args) => {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    return (
        <div>
            <ScrollComponent {...args} ref={ref}>
                {args.children ?? (
                    <>
                        <h3>这个组件是基于原生scroll衍生出来的组件</h3>
                        <p>说明：</p>
                        <ol>
                            <li>它是由两个div组成</li>
                            <li>
                                scroll的body这个盒子是滚动容器。scroll的wrap这个盒子只是为了存放滚动条。所以如果在自定义样式的时候一定要注意:
                                <b>让scroll的wrap和scroll的body的尺寸大小相同</b>
                            </li>
                        </ol>
                        <h2>
                            注：
                            <br />
                            不能给scroll的wrap设置padding(给scroll的body设置)
                            <br />
                            不要给scroll的body设置margin(给scroll的wrap设置)
                        </h2>
                    </>
                )}

                <Kite
                    root={
                        <button
                            onClick={() => {
                                setShow((pre) => !pre);
                            }}
                        >
                            点我
                        </button>
                    }
                    show={show}
                    handleGlobalClick={(res) => {
                        if (!res.isBtn && !res.isMenu) {
                            setShow(false);
                        }
                    }}
                >
                    dajdflkjalsdkjflk
                </Kite>
            </ScrollComponent>
        </div>
    );
};

/**
 *Scroll component
 *
 */
export const ScrollSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        width: "500px",
        height: "10rem",
        defaultScrollTop: 0,
    },
};

export const MinScrollbar: Story = {
    render: (args) => <Template {...args} />,
    args: {
        width: "5rem",
        height: "10rem",
        defaultScrollTop: 0,
        children: (
            <>
                <p
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
                    我很长,也很宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽宽
                </p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
                <p>我很长</p>
            </>
        ),
    },
};

/**
 * 大数据
 */
export const BigDataSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        width: "1440px",
        height: "30rem",
        style: {
            border: "1px solid #ccc",
        },
        defaultScrollTop: 0,
        handleBarChange(res) {
            console.log(res);
        },
        children: (
            <div style={{ display: "flex" }}>
                {new Array(3200).fill(" ").map((_, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                width: "40rem",
                                flex: "0 0 auto",
                                borderLeft: index > 0 ? "1px solid #ccc" : undefined,
                            }}
                        >
                            {new Array(10).fill(" ").map((_, n) => {
                                return (
                                    <div
                                        key={`row_${n}`}
                                        style={{
                                            borderTop: n > 0 ? "1px solid #ccc" : undefined,
                                            height: "3rem",
                                            display: "flex",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        row{n + 1}-col{index + 1}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        ),
    },
};
