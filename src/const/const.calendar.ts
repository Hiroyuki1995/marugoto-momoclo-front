type category = {
  id:string;
  name:string;
  className:string;
  colorCode: string;
  defaultDisplay: Boolean;
}
export const categories: category[] = [
  {
    id: "LIVE",
    name: "【公式】ライブ情報",
    className: "live-event",
    colorCode: "#e67399",
    defaultDisplay: true,
  },
  {
    id: "UNREGULARPROGRAM",
    name: "番組・配信（不定期）",
    className: "unregular-program",
    colorCode: "#e0c240",
    defaultDisplay: true,
  },
  {
    id: "REGULARPROGRAM",
    name: "番組・配信（定期）",
    className: "regular-program",
    colorCode: "",
    defaultDisplay: false,
  },
  {
    id: "OTHERS",
    name: "その他イベント等",
    className: "others",
    colorCode: "#e6804d",
    defaultDisplay: true,
  },
];

type group = {
  id:string;
  category: string,
  name: string,
  googleCalendarId: string,
}

export const groups: group[] = [
  {
    id: "resultAnnouncement",
    category: "LIVE",
    name: "ライブ結果発表・入金期間",
    googleCalendarId: "egl79am00drmku06kn4ivfvess@group.calendar.google.com",
  },
  {
    id: "liveApplicationReception",
    category: "LIVE",
    name: "ライブ申込受付期間",
    googleCalendarId: "momoclo.schedule@gmail.com",
  },
  {
    id: "liveEvent",
    category: "LIVE",
    name: "ライブ公演日",
    googleCalendarId: "sgjkn6snu9fu8mtl1rnmcqjs3k@group.calendar.google.com",
  },
  {
    id: "UNREGULARPROGRAM",
    category: "UNREGULARPROGRAM",
    name: "番組・配信（不定期）",
    googleCalendarId: "253i7578skl4b93pkc6r7ubiq0@group.calendar.google.com",
  },
  {
    id: "REGULARPROGRAM",
    category: "REGULARPROGRAM",
    name: "番組・配信（定期）",
    googleCalendarId: "qpur385sj27sklsl9cg1bp5f98@group.calendar.google.com",
  },
  {
    id: "others",
    category: "OTHERS",
    name: "その他イベント等",
    googleCalendarId: "l41vh9658f778ormj2n0nvlako@group.calendar.google.com",
  },
];
