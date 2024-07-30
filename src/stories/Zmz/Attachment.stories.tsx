/**
 * @file
 * @date 2022-05-30
 * @author
 * @lastModify  2022-05-30
 */
import { Meta, StoryObj } from "@storybook/react";
import axios from "axios";
import { FC, useState } from "react";
import { Attachment, AttachmentProps } from "../../Components/Zmz/Attachment";
import { FileItem } from "../../Components/Zmz/Attachment/Unit/Item";

export default {
    title: "Zmz/Attachment",
    component: Attachment,
} as Meta;

const data: FileItem[] = [
    {
        name: "xx_203101940125基于node+react的记账本设计与实现.pdf",
        size: 3298816,
        id: 1654052702527,
        status: "pendding",
        progress: 50,
    },
    {
        name: "203101940125-张明舟-基于node+react的记账本设计与实现.docx",
        size: 2298816,
        id: 1654052698798,
        status: "pendding",
        progress: 80,
    },
    {
        name: "25-张明舟.pdf",
        size: 1298816,
        id: 1654052521010,
        status: "pendding",
        progress: 30,
    },
    {
        name: "xx_203101940125基于node+react的记账本设计与实现.pdf",
        size: 3298816,
        id: 1654052702327,
        status: "pendding",
        progress: 50,
    },
    {
        name: "203101940125-张明舟-基于node+react的记账本设计与实现.docx",
        size: 2298816,
        id: 1654052648798,
        status: "pendding",
        progress: 80,
    },
    {
        name: "25-张明舟.pdf",
        size: 1298816,
        id: 1654052821010,
        status: "pendding",
        progress: 30,
    },
    {
        name: "25-张明舟.pdf",
        size: 1298816,
        id: 1654222821010,
        status: "complete",
    },
];

// const csvData = `qid,q_type,q_label_name,q_text,q_dimension,option_code,option_text
//                         01,Multi,,请问你喝过哪些啤酒？,1,0,雪花
//                         ,,,,,1,青岛
//                         ,,,,,2,百威
//                         ,,,,,3,哈尔滨
//                         02,Single,,你最喜欢哪个品牌的啤酒？,1,0,雪花
//                         ,,,,,1,青岛
//                         ,,,,,2,百威
//                         ,,,,,3,哈尔滨
//                         03,Single,,你最近喝的啤酒是哪个品牌？,1,0,雪花
//                         ,,,,,1,青岛
//                         ,,,,,2,百威
//                         ,,,,,3,哈尔滨
//                         04,Single,,请为以下啤酒品牌打分,1,0,雪花
//                         ,,,,,1,青岛
//                         ,,,,,2,百威
//                         ,,,,,3,哈尔滨
//                         ,,,,2,0,5
//                         ,,,,,1,4
//                         ,,,,,2,3
//                         ,,,,,3,2
//                         ,,,,,4,1
//                         05,OpenEnd,,请简述你对雪花啤酒的看法,1,0,
//                         06,Numeric,,请填写近几年你消费以下各品牌啤酒的累计额,1,0,雪花
//                         ,,,,,1,青岛
//                         ,,,,,2,百威
//                         ,,,,,3,哈尔滨
//                         ,,,,2,0,2022年
//                         ,,,,,1,2021年
//                         ,,,,,2,2020年`;
let controller: AbortController;
const donwFile = (queryData: Record<string, unknown>) => {
    return axios.get("https://api.dev.datareachable.net/mkt/v2-temp/dev/invi_tender/attachs", {
        headers: {
            "dr-auth":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLmRldi5kYXRhcmVhY2hhYmxlLm5ldCIsInN1YiI6IjAxR0gzOENYRlg1SE1YTU1aV0VDRVhKODBLIiwibm9uY2UiOiIxaVFTb1dkZGh0N2xkdTE2aE1xSElBOG5QcWFHQXVhaiJ9.8WZ09cg158lYdDNKhwflgQR3Z7sX5v_q2_Ud8_qqd84",
        },
        responseType: "blob",
        params: queryData,
    });
};
const postData = (
    formData: FormData,
    { onUploadProgress }: { onUploadProgress: (progress: number) => void },
) => {
    controller = new AbortController();
    return axios.post(
        "https://api.dev.datareachable.net/mkt/v2-temp/dev/invi_tender/attachs",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "dr-auth":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLmRldi5kYXRhcmVhY2hhYmxlLm5ldCIsInN1YiI6IjAxR0gzOENYRlg1SE1YTU1aV0VDRVhKODBLIiwibm9uY2UiOiIxaVFTb1dkZGh0N2xkdTE2aE1xSElBOG5QcWFHQXVhaiJ9.8WZ09cg158lYdDNKhwflgQR3Z7sX5v_q2_Ud8_qqd84",
            },
            onUploadProgress(progressEvent) {
                const progress = (progressEvent.loaded * 100) / (progressEvent.total ?? 1);
                console.log("uploadProgress", progressEvent, progress);
                onUploadProgress(progress);
            },
            signal: controller.signal,
        },
    );
};
const handleCancel = (file: FileItem) => {
    console.log(file);
    controller?.abort();
};

type Story = StoryObj<typeof Attachment>;

export const DefaultAttachmentSample: Story = {
    args: {
        defaultfileList: data,
        onBeforeUpload(files, refs) {
            console.log("onBeforeUpload", files);
            console.log(files);
            Array.prototype.forEach.call(files, (file: File, index) => {
                const formData = new FormData();
                formData.append("attach_file", file);
                formData.append("invi_tender_id", "01GHGJ8AGGTVTH711K8PZ2BZD5");
                formData.append("org_id", "01GH393H3QBH6TQDRAZ7ZYXVGX");
                postData(formData, {
                    onUploadProgress: refs[index].setProgress,
                })
                    .then((res) => {
                        if (res.status === 200 || res.status === 304) {
                            refs[index].setStatus("complete");
                            const data = res.data as { data: Record<string, string> };
                            // refs[0].setId(data.data.id);
                            // refs[0].setPath(data.data.link);
                            refs[index].setItemFile({
                                id: data.data.id,
                                path: data.data.link,
                            });

                            // console.log(res);
                        }
                    })
                    .catch((err) => {
                        console.log("err", err);
                        refs[index].setStatus("fail");
                    });
            });
        },
        onCancel(item) {
            handleCancel(item);
        },
        onEditConfirm(val, ref) {
            console.log("val", val);
            console.log("ref", ref);
            ref.setItemFile({
                name: val,
            });
        },
        onEditCancel() {
            console.log("editCancel");
        },
        onDownFile(file_id, file_name, file_path) {
            donwFile({
                file_id,
                project_id: "",
            })
                .then((res) => {
                    console.log("res", res);
                    console.log("file_path", file_path);
                    if (res.status === 200 || res.status === 304) {
                        console.log(res);
                        const url = URL.createObjectURL(res.data as Blob);
                        const a = document.createElement("a");
                        a.style.display = "none";
                        a.href = url;
                        a.download = file_name;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },
        onListUpdate(list) {
            console.log("onListUpdate", list);
        },
        onFileDelete(file) {
            console.log(file);
        },
        onFileLimit(file) {
            console.log("filelimit", file);
        },
        maskClosable: false,
        limit: 1024 * 1024 * 1,
    },
};

const CustomNodeTemplate: FC<AttachmentProps> = (args) => {
    const [show, setShow] = useState(false);
    const [datas, setDatas] = useState(data);
    return (
        <>
            <Attachment
                {...args}
                maskClosable={false}
                defaultfileList={datas}
                isShow={show}
                onZoomOut={() => setShow(false)}
                customScaleNode={
                    <button style={{ margin: `10px` }} onClick={() => setShow(true)}>
                        123
                    </button>
                }
            />
            <button onClick={() => setDatas([])}>change</button>
        </>
    );
};

export const CustomNodeSample: Story = {
    render: (args) => <CustomNodeTemplate {...args} />,
};
