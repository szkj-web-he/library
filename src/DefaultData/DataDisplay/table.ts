const date = () => {
    const time = new Date().getTime() + Math.round(Math.random() * 3 * 24 * 3600 * 1000);
    return new Date(time).toLocaleString("en-US");
};

export const dataList = [
    {
        date: date(),
        q1: "q1 789789",
        q2: "q2 213213213",
        q3: "q3 qweradsfasf",
        q4: "q4 2132132",
        q5: "q5 123132132",
        q6: "q6 123123132",
    },
    {
        date: date(),
        q1: "q1 asdfasdf",
        q2: "q2 asdzxvxcv",
        q3: "q3 qweradsfasf",
        q4: "q4 ukuykhk",
        q5: "q5 3453245234",
        q6: "q6 6456456",
    },
    {
        date: date(),
        q1: "q1 57527852",
        q2: "q2 g53th 64yj",
        q3: "q3 qweradsfasf",
        q4: "q4 ukuykhk",
        q5: "q5 sdc",
        q6: "q6 vcdsfvsdv",
    },
    {
        date: date(),
        q1: "q1 ;/poo.ol.",
        q2: "q2 396*938",
        q3: "q3 p89;ids",
        q4: "q4 y56jghn",
        q5: "q5 45ytngnmq",
        q6: "q6 f23ggn6iikm ",
    },
    {
        date: date(),
        q1: "q1 45yjngty76",
        q2: "q2 13ffvdfb",
        q3: "q3 45j4 th j",
        q4: "q4 f3f3hgrt",
        q5: "q5 45y56u67i",
        q6: "q6 4l89lkyn",
    },
];
