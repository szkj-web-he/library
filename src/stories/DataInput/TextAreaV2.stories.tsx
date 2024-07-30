/**
 * @file textarea storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useEffect, useState } from "react";
import { TextAreaV2, TextAreaV2Props } from "../../Components/DataInput/TextAreaV2";

/**
 * textarea component
 *
 */
export default {
    title: "DataInput/TextAreaV2",
    component: TextAreaV2,
} as Meta;

const TextOverflowTemp: FC<TextAreaV2Props> = (args) => {
    const [val, setVal] = useState("asdfasdfasdf");
    useEffect(() => {
        const timer = setTimeout(() => {
            setVal(
                "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
            );
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return <TextAreaV2 {...args} value={val} />;
};

type Story = StoryObj<typeof TextAreaV2>;

/**
 * textOverflow component
 *
 */
export const TextAreaSample: Story = {
    render: (args) => <TextOverflowTemp {...args} />,
    args: {
        width: "50%",
        height: "10rem",
        // maxLength: 100,
        defaultValue: "12132",
        textOverflow: true,
    },
};

/**
 * auto height component
 *
 */
export const AutoHeightSample: Story = {
    args: {
        width: "100px",
        height: "10rem",
        value: `春暖花开，又是拍照的好季节。
很多人都想拍出美美的花景人像照片，但是不同于风景和普通人像，要拍出一张好的花景人像照片，并不是一件容易的事情，让我从实践的难易程度深入浅出说几点Tips吧。
1. 合理的衣服配色
白色和非常浅的颜色始终是百搭，不管什么花都可以配。
而和花颜色互补的服饰，用的好往往可以更突显人物。
服饰尽量简单，这样更有画面冲击力。
2. 把花尽量铺满画面
不管树高树低，花大花小，我们的目的，都是要把花拍的尽量铺满画面。
大家看到漫天花雨的时候，都会哇一声，情不自禁点上一百个赞。
但大家在都差不多的场景，怎么拍出漫天花雨呢？
去人少风景好的地方
日出日落人少光线好的时候拍
很多人都想拍出美美的花景人像照片，但是不同于风景和普通人像，要拍出一张好的花景人像照片，并不是一件容易的事情，让我从实践的难易程度深入浅出说几点Tips吧。
1. 合理的衣服配色
白色和非常浅的颜色始终是百搭，不管什么花都可以配。
而和花颜色互补的服饰，用的好往往可以更突显人物。
服饰尽量简单，这样更有画面冲击力。
2. 把花尽量铺满画面
不管树高树低，花大花小，我们的目的，都是要把花拍的尽量铺满画面。
大家看到漫天花雨的时候，都会哇一声，情不自禁点上一百个赞。
但大家在都差不多的场景，怎么拍出漫天花雨呢？
去人少风景好的地方
日出日落人少光线好的时候拍`,
        autoHeight: true,
    },
};
