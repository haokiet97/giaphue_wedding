import { Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import {
  OPERATION_SYSTEM
} from '../../../shared/constants';
import Utils from '../../../shared/utils';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
// import emailjs from '@emailjs/browser';
import {WeddingConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  constructor(
    private calendarService: CalendarService,
    private toastr: ToastrService,
    private weddingConfigService:WeddingConfigService
  ) {
  }

  daysDifference: any = 0;
  isAfter: any = false;
  date: any;
  now: any;
  targetDateInput: any;
  targetDate: any;
  targetDateDisplay: any;
  targetTime: any;
  difference: any;

  days: any = 0;
  hours: any = 0;
  minutes: any = 0;
  seconds: any = 0;

  protected quote: string | undefined = '';
  protected baseUrl: string | undefined = '';
  protected names: any = undefined;
  protected contacts: any = undefined;
  protected maleEventData: any = undefined;
  protected femaleEventData: any = undefined;

  ngOnInit() {
    this.weddingConfigService.config$.subscribe(config => {
      this.baseUrl = config?.baseUrl;
      this.targetDateInput = config?.dateCountDown;
      this.quote = config?.events.quote;
      this.names = config?.names;
      this.contacts = {
        male: config?.about?.male?.socialMedia,
        female: config?.about?.female?.socialMedia
      }
      this.maleEventData = config?.events?.male;
      this.femaleEventData = config?.events?.female;
    });
  }


  ngAfterViewInit() {
    this.calculateDateTarget();

    if (!this.isAfter) {
      this.targetDate = new Date(this.targetDateInput?.toString());
      this.targetTime = this.targetDate.getTime();
      this.targetDateDisplay = moment(this.targetDateInput, 'YYYY-MM-DD').format('DD/MM/YYYY');

      setInterval(() => {
        this.tickTock();
        this.difference = this.targetTime - this.now;
        this.difference = this.difference / (1000 * 60 * 60 * 24);
        this.difference = this.difference <= 0 ? 0 : this.difference;
      }, 1000);
    }

    this.checkAnniversary();
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.days = Math.floor(this.difference) ? Math.floor(this.difference) : '0';
    this.hours = 23 - this.date.getHours();
    this.minutes = 60 - this.date.getMinutes();
    this.seconds = 60 - this.date.getSeconds();
  }

  calculateDateTarget() {
    const currentDate = moment();
    const targetDate = moment(this.targetDateInput, 'YYYY/MM/DD');
    this.isAfter = currentDate.isAfter(targetDate);

    const sortedDates = [currentDate, targetDate].sort((a: any, b: any) => a - b);
    this.daysDifference = sortedDates[1].diff(sortedDates[0], 'days');
    if (this.daysDifference === 0) this.daysDifference = 1;

    console.log('this.isAfter =' + this.isAfter);
  }

  onOpenMap(gender: string): void {
    if (!gender) return;

    let mapLink = '';
    if (gender === 'male') {
      mapLink = this.maleEventData.googleMapsLink;
    } else {
      mapLink = this.maleEventData.googleMapsLink;
    }

    window.open(mapLink);
  }

  onAddEvent = (gender: string) => {
    let os = Utils.getMobileOperatingSystem();

    if (gender === 'male') {
      let eventInfoMale = this.maleEventData.eventDetails;
      eventInfoMale.LOCATION = this.maleEventData.address;
      // eventInfoMale["location"] = this.maleEventData.address;
      if (os === OPERATION_SYSTEM.IOS) {
        this.calendarService.downloadICSFile(this.baseUrl, this.maleEventData, this.names, this.contacts);
      } else {
        let urlGGCalendar = this.calendarService.genGoogleCalendarLink(this.baseUrl, this.maleEventData, this.names, this.contacts);
        window.open(urlGGCalendar);
      }
    } else {
      if (os === OPERATION_SYSTEM.IOS) {
        this.calendarService.downloadICSFile(this.baseUrl,this.femaleEventData, this.names, this.contacts);
      } else {
        let urlGGCalendar = this.calendarService.genGoogleCalendarLink(this.baseUrl,this.femaleEventData, this.names, this.contacts);
        window.open(urlGGCalendar);
      }
    }
  };

  // sendMail(day: string) {
  //     emailjs.init({
  //         publicKey: 'rMbl48X95JYxit86_',
  //         blockHeadless: true,
  //         limitRate: {
  //             throttle: 10000, // 10s
  //         },
  //     });

  //     const templateParams = {
  //         message: `Hôm nay là kỷ niệm ${day} ngày cưới`,
  //     };

  //     emailjs
  //         .send('service_tuanhuyenwedding', 'template_wedding', templateParams, {
  //             publicKey: 'rMbl48X95JYxit86_',
  //         })
  //         .then(
  //             (response) => {
  //                 console.log('SUCCESS!', response.status, response.text);
  //             },
  //             (err) => {
  //                 console.log('FAILED...', err);
  //             },
  //         );
  // }

  checkAnniversary() {
    const targetDate = moment(this.targetDateInput, 'YYYY/MM/DD');
    const currentDate = moment();

    const daysDifference = currentDate.diff(targetDate, 'days');

    if (daysDifference > 0 && daysDifference % 100 === 0) {
      this.toastr.success(
        `Hôm nay là kỷ niệm ${daysDifference} ngày cưới`,
        'Ngày kỷ niệm',
        {
          progressBar: true,
          progressAnimation: 'decreasing'
        }
      );

      // this.sendMail(daysDifference.toString());
    }
  }
}
