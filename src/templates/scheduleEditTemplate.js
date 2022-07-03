import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  List,
  ListItem,
  Container,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Button,
  FormControl,
  Grid,
} from "@mui/material";
// import { Calendar as FullCalendar } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useEffect, useState } from "react";
import {
  MobileDatePicker,
  LocalizationProvider,
  DateTimePicker,
} from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  registerSchedule,
  deleteSchedule,
} from "../redux/schedules/operations";
import { calendarAdmin } from "../secret/password.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { groups } from "../const/const.calendar";
export const scheduleEditTemplate = () => {
  return (
    <>
      <FormControl fullWidth>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12}>
              <TextField
                label="タイトル"
                required
                placeholder=""
                value={event.title}
                onChange={(event) =>
                  handleEventChange("title", event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                // id="outlined-select-currency"
                select
                label="カテゴリー"
                value={event.groupId}
                onChange={(event) =>
                  handleEventChange("groupId", event.target.value)
                }
              >
                {groups.map((group) => (
                  <MenuItem value={group.id}>{group.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <InputLabel>カテゴリー</InputLabel>
                <Select
                  value={event.groupId}
                  label="カテゴリー"
                  onChange={(event) =>
                    handleEventChange("groupId", event.target.value)
                  }
                >
                  {groups.map((group) => (
                    <MenuItem value={group.id}>{group.name}</MenuItem>
                  ))}
                </Select> */}

            <Grid item xs={6}>
              <MobileDatePicker
                spacing={2}
                clearable
                label="日付"
                inputFormat="YYYY-MM-DD"
                value={event.date}
                onChange={(value) =>
                  handleEventChange(
                    "date",
                    value ? value.format("YYYY-MM-DD") : null
                  )
                }
                onError={(e) => console.log("error on MobileDatePicker", e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker
                clearable
                label="開始時刻"
                inputFormat="YYYY-MM-DD HH:mm"
                value={event.start}
                onChange={(value) =>
                  handleEventChange("start", value ? value.format() : null)
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker
                clearable
                label="終了時刻"
                inputFormat="YYYY-MM-DD HH:mm"
                value={event.end}
                onChange={(value) =>
                  handleEventChange("end", value ? value.format() : null)
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ style: { fontSize: 20 } }}
                fullWidth
                label="詳細"
                multiline
                placeholder=""
                value={event.detail}
                onChange={(event) =>
                  handleEventChange("detail", event.target.value)
                }
              />
            </Grid>
            <CopyToClipboard text={'{"type":"image","src":"url"}'}>
              <Button>画像埋め込みコードコピー</Button>
            </CopyToClipboard>
            <CopyToClipboard text={'{"type":"tweet","id":"id"}'}>
              <Button>Twitter埋め込みコードコピー</Button>
            </CopyToClipboard>
            <CopyToClipboard
              text={'{"type":"link","href":"url", "label":"label"}'}
            >
              <Button>ハイパーリンク埋め込みコードコピー</Button>
            </CopyToClipboard>
            <Grid item xs={12}>
              <Button
                disabled={!canRegister}
                variant="contained"
                onClick={registerEvent}
              >
                登録
              </Button>
            </Grid>
          </LocalizationProvider>
          {/* </Box> */}
        </Grid>
      </FormControl>
      <FormGroup>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="スケジュールID"
            placeholder=""
            value={scheduleId}
            onChange={(event) => {
              setScheduleId(event.target.value);
            }}
          />
          <Button
            disabled={
              !schedules.map((schedule) => schedule.id).includes(scheduleId)
            }
            variant="contained"
            onClick={deleteEvent}
          >
            削除
          </Button>
        </Box>
      </FormGroup>
    </>
  );
};
