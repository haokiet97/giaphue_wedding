import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() {
  }

  genGoogleCalendarLink(baseUrl:any, eventData: any, names: any, contacts: any) {
    let baseCalendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';

    let text = encodeURIComponent(`💍Lễ Thành Hôn \n 💞${names.male.full} & ${names.female.full}💞`);
    let details = encodeURIComponent(
      `<h3>💍Lễ Thành Hôn ${names.male.full} & ${names.female.full}💍</h3> Sự có mặt của bạn là niềm vinh dự với vợ chồng chúng mình ❤️\nRất hân hạnh được đón tiếp!\n\n📲Liên hệ chú rể: ${contacts.male.telephone}\n📲Liên hệ cô dâu: ${contacts.female.telephone}\nWebsite: ${baseUrl}`
    );
    let location = encodeURIComponent(eventData.address);
    let dates = encodeURIComponent(`${eventData.eventDetails.startTime}/${eventData.eventDetails.endTime}`);

    let params = `text=${text}&details=${details}&location=${location}&dates=${dates}`;

    return `${baseCalendarUrl}?${params}`;
  }

  downloadICSFile(baseUrl:any, eventData: any, names: any, contacts: any) {
    const icsContent = `BEGIN:VCALENDAR
PRODID:-//${names.male.short} ${names.female.short} Wedding//${baseUrl}//EN
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
UID:${eventData.eventDetails.uid}
SEQUENCE:0
DTSTART;TZID=Asia/Ho_Chi_Minh:${eventData.eventDetails.startTime}
DTEND;TZID=Asia/Ho_Chi_Minh:${eventData.eventDetails.endTime}
SUMMARY:💍Lễ Thành Hôn\\n💞${names.male.full} & ${names.female.full}💞
DESCRIPTION:💍Lễ Thành Hôn ${names.male.full} & ${names.female.full}💍 \\nSự có mặt của bạn là niềm vinh dự với vợ chồng chúng mình ❤️\\nRất hân hạnh được đón tiếp!\\n\\n📲Liên hệ chú rể: ${contacts.male.telephone}\\n📲Liên hệ cô dâu: ${contacts.female.telephone}\\nWebsite: ${baseUrl}
X-ALT-DESC;FMTTYPE=text/html:Lễ Thành Hôn ${names.male.full} & ${names.female.full}
LOCATION:📍${eventData.address}
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
