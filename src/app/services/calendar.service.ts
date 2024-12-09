import { Injectable } from '@angular/core';
import _ from 'lodash';
import { ABOUT_DATA, BASE_URL, FEMALE_FULL_NAME, FEMALE_NAME, MALE_FULL_NAME, MALE_NAME } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() {
  }

  genGoogleCalendarLink(eventData: any) {
    let baseCalendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';

    let text = encodeURIComponent(`💍Lễ Thành Hôn \n 💞${MALE_FULL_NAME} & ${FEMALE_FULL_NAME}💞`);
    let details = encodeURIComponent(
      `<h3>💍Lễ Thành Hôn ${MALE_FULL_NAME} & ${FEMALE_FULL_NAME}💍</h3> Sự có mặt của bạn là niềm vinh dự với vợ chồng chúng mình ❤️\nRất hân hạnh được đón tiếp!\n\n📲Liên hệ chú rể: ${ABOUT_DATA.maleData.tel}\n📲Liên hệ cô dâu: ${ABOUT_DATA.femaleData.tel}\nWebsite: ${BASE_URL}`
    );
    let location = encodeURIComponent(eventData.LOCATION);
    let dates = encodeURIComponent(`${eventData.START_TIME}/${eventData.END_TIME}`);

    let params = `text=${text}&details=${details}&location=${location}&dates=${dates}`;

    return `${baseCalendarUrl}?${params}`;
  }

  downloadICSFile(eventData: any) {
    const icsContent = `BEGIN:VCALENDAR
PRODID:-//${MALE_NAME} ${FEMALE_NAME} Wedding//${BASE_URL}//EN
VERSION:2.0
BEGIN:VTIMEZONE
TZID:Asia/Ho_Chi_Minh
BEGIN:STANDARD
DTSTART:19750612T230000
TZOFFSETFROM:+0700
TZOFFSETTO:+0700
TZNAME:+07
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:20240102T135028Z
STATUS:CONFIRMED
UID:${eventData.UID}
SEQUENCE:0
DTSTART;TZID=Asia/Ho_Chi_Minh:${eventData.START_TIME}
DTEND;TZID=Asia/Ho_Chi_Minh:${eventData.END_TIME}
SUMMARY:💍Lễ Thành Hôn\\n💞${MALE_FULL_NAME} & ${FEMALE_FULL_NAME}💞
DESCRIPTION:💍Lễ Thành Hôn ${MALE_FULL_NAME} & ${FEMALE_FULL_NAME}💍 \\nSự có mặt của bạn là niềm vinh dự với vợ chồng chúng mình ❤️\\nRất hân hạnh được đón tiếp!\\n\\n📲Liên hệ chú rể: ${ABOUT_DATA.maleData.tel}\\n📲Liên hệ cô dâu: ${ABOUT_DATA.femaleData.tel}\\nWebsite: ${BASE_URL}
X-ALT-DESC;FMTTYPE=text/html:Lễ Thành Hôn ${MALE_FULL_NAME} & ${FEMALE_FULL_NAME}
LOCATION:📍${eventData.LOCATION}
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'event.ics');
    document.body.appendChild(link);
    link.click();
  }
}
