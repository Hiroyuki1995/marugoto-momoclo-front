import * as React from "react";
import { pageUrl } from "../../src/const/const.url.js";
import Seo from "../../src/components/Seo.js";
// import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Modal,
} from "@mui/material";
// import { Calendar as FullCalendar } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  CalendarContext,
  EventDef,
  EventInstance,
  EventSourceInput,
} from "@fullcalendar/react";
import { useEffect, useState } from "react";
import { categories, groups } from "../../src/const/const.calendar";
import { Header } from "../../src/components/Header.js";
import dayjs from "dayjs";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

const theme = createTheme();
// selectedEventの初期値を空オブジェクトにするため、公式のEventApiインターフェースを拡張して、必須キーを任意に変えた型を定義
// TODO　適切なやり方かよくわからない。。
type SelectedEventApi = Partial<EventApi> & {
  _context?: CalendarContext;
  _def?: EventDef;
  _instance?: EventInstance | null;
}
const initialSelectedEvent: SelectedEventApi = {};

export default function Calendar(props) {
  const [open, setOpen] = React.useState(false);
  const [displayCategoryIds, setDisplayCategoryIds] = useState(
    categories
      .filter((category) => category.defaultDisplay === true)
      .map((category) => category.id)
  );
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventApi>(initialSelectedEvent);

  const eventSources: EventSourceInput[] = groups.map((group) => {
    console.log(
      "displayCategoryIds",
      displayCategoryIds,
      "group.category",
      group.category
    );
    if (displayCategoryIds.includes(group.category)) {
      console.log("googleCalendarId:", group.googleCalendarId);
      return {
        // id: group.id,
        key: group.googleCalendarId,
        googleCalendarId: group.googleCalendarId,
        className: categories.find(
          (category) => category.id === group.category
        )?.className, // TODO ?が適切なやり方かは要チェック
      };
    }
    return [];
  })


  const Calendar = (): JSX.Element => {
    return typeof window !== "undefined" ? (
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          googleCalendarPlugin,
        ]}
        displayEventTime={true}
        eventDisplay={"auto"}
        initialView="dayGridMonth"
        // lang="ja"
        height="auto"
        locale={"ja"}
        buttonText={{
          month: "月",
          week: "週",
          day: "日",
          list: "リスト",
        }}
        googleCalendarApiKey={"AIzaSyDQVBRwNglJudNq188KyldkE7voLbM39lI"}
        eventSources={eventSources}
        // Googleカレンダーへのリンクを解除する
        eventDataTransform={(event) => {
          event.url = "";
          return event;
        }}
        // titleFormat="YYYY年 MMMM"
        // monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        // monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        // dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        // dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
        allDayText="終日"
        noEventsText="予定はありません"
        // eventLimitText: function(n) {
        //     return "他 " + n + " 件";
        // }
        headerToolbar={{
          left: "prev,next",
          // left: "prev,next today",
          center: "title",
          // right: "dayGridMonth,timeGridWeek,listWeek",
          right: "dayGridMonth,listMonth",
        }}
        eventClick={(info: EventClickArg) => {
          setOpen(true);
          setSelectedEvent(info.event);
          console.log("info.event", info.event);
          // navigate(
          //   `/calendar/${info.event.id}${
          //     displayAdmin ? calendarAdmin : ``
          //   }`
          // );
        }
        }
      ></FullCalendar >
    ) : (
      <></>
    );
  };

  console.log("groups", groups);

  const handleChange = (event) => {
    console.log("displayCategoryIds before change", displayCategoryIds);
    console.log("handleChange", event.target.checked, event.target.id);
    if (event.target.checked === true) {
      setDisplayCategoryIds((prev) => [...prev, event.target.id]);
    } else {
      setDisplayCategoryIds((prev) =>
        prev.filter((groupId) => groupId !== event.target.id)
      );
    }
  };

  useEffect(() => {
    console.log("displayCategoryIds after chnage", displayCategoryIds);
  }, [displayCategoryIds]);
  return (
    <ThemeProvider theme={theme}>
      <Seo
        pageTitle={`スケジュール`}
        pageDescription={"ももクロのライブ情報・番組出演情報などのスケジュール"}
        pageImg={pageUrl + "/logo512.png"}
      // pageImg={imageUrl + "/" + results[0].fileName}
      // pageImgWidth={1280}
      // pageImgHeight={960}
      />
      {/* <Helmet
        title={`スケジュール｜まるごとももクロ`}
        meta={[
          { name: "twitter:card", content: "summary" },
          { name: "twitter:site", content: "@marugotomomoclo" },
          { name: "twitter:creator", content: "@marugotomomoclo" },
          { property: "og:title", content: "スケジュール｜まるごとももクロ" },
          {
            property: "og:description",
            content: "ももクロのライブ情報・番組出演情報などのスケジュール",
          },
          { property: "og:type", content: "website" },
          { property: "og:url", content: pageUrl + useLocation().pathname },
          { property: "og:image", content: pageUrl + "/logo512.png" },
        ]}
      /> */}
      <CssBaseline />
      {/* <AppBar position="relative"> */}
      <Header />
      <main
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
        }}
      >
        {open === true ? (
          <Modal
            open={true}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{
              style: { zIndex: 0 },
            }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedEvent.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedEvent.allDay === true
                  ? `${dayjs(selectedEvent.start).format("YYYY/M/D")}`
                  : `${dayjs(selectedEvent.start).format(
                    "YYYY/M/D HH:mm"
                  )}〜${dayjs(selectedEvent.end).format("YYYY/M/D HH:mm")}`}
              </Typography>
              {selectedEvent.extendedProps &&
                selectedEvent.extendedProps.description ? (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedEvent.extendedProps.description,
                    }}
                  ></span>
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          </Modal>
        ) : (
          <></>
        )}

        {/* <AvatarGroup total={24}> */}
        <Container
          maxWidth="sm"
          // disableGutters={false}
          style={{
            paddingTop: "20px",
            paddingBottom: "40px",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <FormGroup row={true}>
            {categories.map((category) => (
              <FormControlLabel
                id={category.id}
                control={
                  <Checkbox
                    id={category.id}
                    checked={displayCategoryIds.includes(category.id)}
                    onChange={handleChange}
                    // iconStyle={
                    //   category.colorCode ? { fill: category.colorCode } : {}
                    // }
                    style={
                      category.colorCode ? { color: category.colorCode } : {}
                    }
                  // labelStyle={{ color: "white" }}
                  // iconStyle={{ fill: "white" }}
                  // iconStyle={{ fill: "#dd0000" }}
                  // color={group.color}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
          <div className="custom-fullcalendar">
            <Calendar />
            {/* <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                googleCalendarPlugin,
              ]}
              displayEventTime={true}
              eventDisplay={"auto"}
              initialView="dayGridMonth"
              lang="ja"
              height="auto"
              locale={"ja"}
              buttonText={{
                month: "月",
                week: "週",
                day: "日",
                list: "リスト",
              }}
              googleCalendarApiKey={"AIzaSyDQVBRwNglJudNq188KyldkE7voLbM39lI"}
              eventSources={groups.map((group) => {
                console.log(
                  "displayCategoryIds",
                  displayCategoryIds,
                  "group.category",
                  group.category
                );
                if (displayCategoryIds.includes(group.category)) {
                  console.log("googleCalendarId:", group.googleCalendarId);
                  return {
                    // id: group.id,
                    key: group.googleCalendarId,
                    googleCalendarId: group.googleCalendarId,
                    className: categories.find(
                      (category) => category.id === group.category
                    ).className,
                  };
                }
              })}
              // Googleカレンダーへのリンクを解除する
              eventDataTransform={(event) => {
                event.url = "";
                return event;
              }}
              // titleFormat="YYYY年 MMMM"
              // monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              // monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              // dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
              // dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
              allDayText="終日"
              noEventsText="予定はありません"
              // eventLimitText: function(n) {
              //     return "他 " + n + " 件";
              // }
              headerToolbar={{
                left: "prev,next",
                // left: "prev,next today",
                center: "title",
                // right: "dayGridMonth,timeGridWeek,listWeek",
                right: "dayGridMonth,listMonth",
              }}
              eventClick={(info) => {
                setOpen(true);
                setSelectedEvent(info.event);
                console.log("info.event", info.event);
                // navigate(
                //   `/calendar/${info.event.id}${
                //     displayAdmin ? calendarAdmin : ``
                //   }`
                // );
              }}
            ></FullCalendar> */}
          </div>
        </Container>
      </main>
    </ThemeProvider>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};
