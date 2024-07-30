/**
 * @file Wrapper.stories file
 * @date 2022-01-05
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-05
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC } from "react";
import { NavigationBar, OIDCLogin } from "../..";

import { Col } from "../../Components/Grid/Col";
import { Row } from "../../Components/Grid/Row";
import { Sidebar } from "../../Components/Grid/Sidebar";
import { Wrapper } from "../../Components/Grid/Wrapper";
import styles from "./styles.module.scss";
import useJwt from "../../../.storybook/useJWT";

export default {
    title: "Grid/Wrapper",
    component: Wrapper,
} as Meta;

const Template: FC = () => {
    const jwt = useJwt();
    if (!jwt) {
        return <>没有jwt</>;
    }
    return (
        <OIDCLogin projectType="plugins ide" development_jwt={jwt}>
            <Wrapper>
                <NavigationBar />
                <Sidebar
                    typeData={{
                        bind: 8,
                        star: 1,
                        publish: 3,
                        notBound: 4,
                        transfer: 6,
                        preview: 80,
                    }}
                />
                <Row className={styles.grid_row} debug={true}>
                    <Col span={8} className={styles.grid_col}>
                        <h1>Project Manager</h1>
                    </Col>
                    <Col span={4} className={styles.grid_col}>
                        <h1>project details</h1>
                    </Col>
                </Row>
            </Wrapper>
        </OIDCLogin>
    );
};
type Story = StoryObj<typeof Template>;

export const ArgsTemp: Story = {
    render: () => <Template />,
};
