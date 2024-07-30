/**
 * @file 对话框的例子
 * @date 2023-01-31
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-31
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC, useState } from "react";
import { Button } from "../..";
import {
    DialogGroup,
    DialogGroupForwardEvents,
    DialogGroupProps,
} from "../../Components/Cover/DialogGroup";
import { DialogItem } from "../../Components/Cover/DialogItem";
import { useRef } from "react";

export default {
    title: "Cover/DialogGroup",
    component: DialogGroup,
} as Meta;

const Template: FC<DialogGroupProps> = (args) => {
    const [show, setShow] = useState(false);
    const ref = useRef<DialogGroupForwardEvents>({
        goTo: () => undefined,
        next: () => undefined,
        prev: () => undefined,
    });

    return (
        <>
            <Button
                onClick={() => {
                    setShow((pre) => !pre);
                }}
                label="点我"
            />
            <DialogGroup show={show} {...args} ref={ref}>
                <DialogItem
                    removeOnHidden
                    onCloseClick={() => {
                        setShow(() => false);
                    }}
                >
                    a
                    <Button
                        onClick={() => {
                            ref.current.next();
                        }}
                        label="下一张"
                    />
                    <Button
                        onClick={() => {
                            ref.current.prev();
                        }}
                        label="上一张"
                    />
                    <input
                        placeholder="跳转到"
                        type={"number"}
                        defaultValue={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                ref.current.goTo(Number(e.currentTarget.value));
                            }
                        }}
                    />
                </DialogItem>
                <DialogItem
                    onCloseClick={() => {
                        setShow(() => false);
                    }}
                >
                    b
                    <div>
                        <Button
                            onClick={() => {
                                ref.current.prev();
                            }}
                            label="上一张"
                        />
                        <Button
                            onClick={() => {
                                ref.current.next();
                            }}
                            label="下一张"
                        />
                        <input
                            placeholder="跳转到"
                            type={"number"}
                            defaultValue={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    ref.current.goTo(Number(e.currentTarget.value));
                                }
                            }}
                        />
                    </div>
                </DialogItem>
                <DialogItem
                    onCloseClick={() => {
                        setShow(() => false);
                    }}
                    backIcon
                    onBackClick={() => {
                        ref.current.prev();
                    }}
                    size="small"
                >
                    c
                    <div>
                        <Button
                            onClick={() => {
                                ref.current.prev();
                            }}
                            label="上一张"
                        />
                        <Button
                            onClick={() => {
                                ref.current.next();
                            }}
                            label="下一张"
                        />
                        <input
                            placeholder="跳转到"
                            type={"number"}
                            defaultValue={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    ref.current.goTo(Number(e.currentTarget.value));
                                }
                            }}
                        />
                    </div>
                </DialogItem>
                <DialogItem
                    onCloseClick={() => {
                        setShow(() => false);
                    }}
                >
                    d
                    <div>
                        <Button
                            onClick={() => {
                                ref.current.prev();
                            }}
                            label="上一张"
                        />
                        <Button
                            onClick={() => {
                                ref.current.next();
                            }}
                            label="下一张"
                        />
                        <input
                            placeholder="跳转到"
                            type={"number"}
                            defaultValue={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    ref.current.goTo(Number(e.currentTarget.value));
                                }
                            }}
                        />
                    </div>
                </DialogItem>
                <DialogItem
                    onCloseClick={() => {
                        setShow(() => false);
                    }}
                >
                    e
                    <div>
                        <Button
                            onClick={() => {
                                ref.current.prev();
                            }}
                            label="上一张"
                        />
                        <Button
                            onClick={() => {
                                ref.current.next();
                            }}
                            label="下一张"
                        />
                        <input
                            placeholder="跳转到"
                            type={"number"}
                            defaultValue={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    ref.current.goTo(Number(e.currentTarget.value));
                                }
                            }}
                        />
                    </div>
                </DialogItem>
                <DialogItem
                    onCloseClick={() => {
                        setShow(() => false);
                    }}
                >
                    f
                    <Button
                        onClick={() => {
                            ref.current.prev();
                        }}
                        label="上一张"
                    />
                    <input
                        placeholder="跳转到"
                        type={"number"}
                        defaultValue={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                ref.current.goTo(Number(e.currentTarget.value));
                            }
                        }}
                    />
                    <Button
                        onClick={() => {
                            ref.current.next();
                        }}
                        label="下一张"
                    />
                </DialogItem>
            </DialogGroup>
        </>
    );
};

type Story = StoryObj<typeof DialogGroup>;

/**
 * 默认的对话框
 */
export const DefaultDialog: Story = {
    render: (args) => <Template {...args} />,
    args: {
        onChange: (to, from) => {
            console.log("from", from);
            console.log("to", to);
            console.log(" ");
        },
    },
};
