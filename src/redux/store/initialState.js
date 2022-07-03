const initialState = {
  posts: {
    results: [],
    searchCondition: {
      person: "all",
      lastEvaluatedKey: "",
      showAllImages: false,
    },
    displayCondition: {
      numberOfColumns: 3,
      scrollPosition: 0,
    },
  },
  schedules: {
    results: [
      {
        id: "20220303190001",
        title: "モニタリング",
        groupId: "PROGRAM",
        start: "2022-03-03T19:00:00",
        end: "2022-03-03T21:00:00",
      },
      {
        id: "20220307190002",
        title: "まるごとれにちゃん大阪公演",
        date: "2022-03-07",
        groupId: "liveEvent",
        start: "2022-03-07T19:00:00",
        end: "2022-03-07T21:00:00",
        detail:
          'あいうえお\n{"type":"link","href":"https://evilamag.com/special/post/4589/","label":"ライブレポート"}\nかきくけこ\n{"type":"tweet", "id":"1501005135769923584"}\n{"type":"image", "src":"https://evilamag.com/uploads/2022/03/DSC1616.jpg"}',
      },
      {
        id: "20220308000003",
        title: "春の一大事当落発表",
        date: "2022-03-08",
        groupId: "liveEvent",
      },
      {
        id: "20220308000004",
        title: "まるごとれにちゃん名古屋公演",
        date: "2022-03-08",
        groupId: "liveEvent",
      },
      {
        id: "20220309000005",
        title: "まるごとれにちゃん神奈川公演",
        date: "2022-03-09",
        groupId: "liveEvent",
      },
      {
        id: "20220423000006",
        title: "春の一大事",
        date: "2022-04-23",
        groupId: "liveEvent",
      },
      {
        id: "20220424000007",
        title: "春の一大事",
        date: "2022-04-24",
        groupId: "liveEvent",
      },
      {
        id: "20220313154900",
        title: "高城れにの週末ももクロパンチ",
        daysOfWeek: [6],
        groupId: "RADIO",
        startTime: "17:00:00",
        endTime: "17:15:00",
        startRecur: "2022-03-01",
      },
    ],
  },
};

export default initialState;
