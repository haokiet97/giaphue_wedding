
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import WEDDING_CONFIG from '../shared/wedding-config.json';

// Define the interface to match the JSON structure
export interface WeddingConfig {
  baseUrl: string;
  operationSystem: {
    ios: string;
    android: string;
    windowsPhone: string;
    other: string;
  };
  dateCountDown: string;
  names: {
    male: {
      short: string;
      full: string;
    };
    female: {
      short: string;
      full: string;
    };
  };
  about: {
    male: {
      image: string;
      description: string;
      socialMedia: {
        facebook: string;
        zalo: string;
        instagram: string;
        telephone: string;
      };
    };
    female: {
      image: string;
      description: string;
      socialMedia: {
        facebook: string;
        zalo: string;
        instagram: string;
        telephone: string;
      };
    };
  };
  carousel: {
    images: Array<{
      portraitUrl: string;
      landscapeUrl: string;
    }>;
    video: string;
    displayVideo: boolean;
  };
  events: {
    quote: string;
    male: {
      image: string;
      location: string;
      address: string;
      dateGregorian: string;
      dateLunar: string;
      googleMapsLink: string;
      eventDetails: {
        uid: string;
        startTime: string;
        endTime: string;
      };
    };
    female: {
      image: string;
      location: string;
      address: string;
      dateGregorian: string;
      dateLunar: string;
      googleMapsLink: string;
      eventDetails: {
        uid: string;
        startTime: string;
        endTime: string;
      };
    };
  };
  story: {
    quote: string;
    title: string;
    description: string;
    timelines: Array<{
      title: string;
      date: string;
      description: string;
      image: string;
    }>;
  };
  monetaryGifts: {
    male: {
      bank: string;
      accountName: string;
      account: string;
      qrCodeImage: string;
    };
    female: {
      bank: string;
      accountName: string;
      account: string;
      qrCodeImage: string;
    };
  };
  gallery: {
    quote: string;
    maleAlbumUrl: string;
    femaleAlbumUrl: string;
    images: string[];
  };
  musics: Array<{
    path: string;
    displayName: string;
  }>;
}


@Injectable({
  providedIn: 'root'
})
export class WeddingConfigService {
  // Public URL where your JSON is hosted (replace with your actual public JSON URL)
  // private configUrl = 'https://www.dropbox.com/scl/fi/ik1xg9xl9r14e36lro5fe/wedding-config.json?rlkey=64keyl1xm54yyf0fioe3kp83x&st=efyq4lit&raw=1';
  // private configUrl = 'https://uc08428e09fb5510ec15c8db9779.dl.dropboxusercontent.com/cd/0/inline/CkjY7XKOI_YDQ7CPhnYxfzZwPBWl1yFhmZDdxtB4rKSJaErTETCGGCwYLvmvw-6bRtcu0krS4joR-eJ91_EUPEHBHU3EScZgSsXWOXRqYSXzNFqhHx0G_2PS5tp2L4F23zli0ttIT3DtQYzRDxDj9R9-/file#';
  private configUrl = 'https://raw.githubusercontent.com/haokiet97/giaphue_wedding/refs/heads/dev.config/src/app/shared/wedding-config.json';

  // BehaviorSubject to store and stream the configuration
  private configSubject = new BehaviorSubject<WeddingConfig | null>(null);

  // Observable for components to subscribe to
  public config$: Observable<WeddingConfig | null> = this.configSubject.asObservable();

  constructor(private http: HttpClient) {
    // Automatically load config on service initialization
    this.loadConfig();
  }

  // Method to load configuration from remote JSON
  public loadConfig(): void {
    this.http.get<WeddingConfig>(this.configUrl, { observe: 'response' }).pipe(
      tap(response  => {
        // this.configSubject.next(config ?? WEDDING_CONFIG);

        if (response.status === 302) {
          const redirectUrl = response.headers.get('Location');
          if (redirectUrl) {
            console.log(redirectUrl);
            this.configUrl = redirectUrl;
            this.loadConfig(); // Call loadConfig again with the new URL
          } else {
            console.error('Redirect URL not found');
          }
        } else {
          console.log('read from github');
          this.configSubject.next(response.body ?? WEDDING_CONFIG);
        }
      }),
      catchError(error => {
        console.log('error. load from local');
        this.configSubject.next(this.configSubject.value ?? WEDDING_CONFIG);
        return of(null);
      })
    ).subscribe();

  }

  // Getter methods for specific config sections
  public getBaseUrl(): string | null {
    return this.configSubject.value?.baseUrl || null;
  }

  public getMaleInfo() {
    return this.configSubject.value?.about.male || null;
  }

  public getFemaleInfo() {
    return this.configSubject.value?.about.female || null;
  }

  public getNames() {
    return this.configSubject.value?.names || null;
  }

  public getOperationSystem() {
    return this.configSubject.value?.operationSystem || null;
  }

  public getDateCountDown() {
    return this.configSubject.value?.dateCountDown || null;
  }

  public getCarouselImages() {
    return this.configSubject.value?.carousel.images || null;
  }

  public getEvents() {
    return this.configSubject.value?.events || null;
  }

  public getStory() {
    return this.configSubject.value?.story || null;
  }

  public getMonetaryGifts() {
    return this.configSubject.value?.monetaryGifts || null;
  }

  public getGallery() {
    return this.configSubject.value?.gallery || null;
  }
  // Add more specific getter methods as needed
}
