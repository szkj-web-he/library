/**
 * @file
 * @date 2021-12-21
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-21
 */
import { StoryObj, Meta } from "@storybook/react";
import { Row } from "../../Components/Grid/Row";
import { Col } from "../../Components/Grid/Col";
import styles from "./styles.module.scss";
import { Button } from "../..";
import { FC, useState } from "react";

export default {
    title: "Grid/Row",
    component: Row,
} as Meta;

const Template: FC = () => {
    const [addShow, setAddShow] = useState(false);

    return (
        <>
            <Row className={styles.wrap} debug={true}>
                <Col className={styles.org_wrap} span={4}>
                    org
                </Col>
                <Col className={styles.project_wrap} span={addShow ? 4 : 8}>
                    project
                    <div>
                        <Button
                            label="Create"
                            width="10.4rem"
                            height="3.6rem"
                            onClick={() => {
                                setAddShow(!addShow);
                            }}
                        />
                    </div>
                </Col>

                <Col className={styles.add_wrap} span={addShow ? 4 : 0}>
                    add wrap
                </Col>
            </Row>
        </>
    );
};

type Story = StoryObj<typeof Row>;
export const ArgsTemp: Story = {
    render: () => <Template />,
};
