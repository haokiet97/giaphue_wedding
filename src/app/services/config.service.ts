
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private configUrl = 'https://drive.google.com/uc?id=1U87yok1IXMvn5xhL07iPKzCj18JMvGvy';

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
    this.http.get<WeddingConfig>(this.configUrl).pipe(
      tap(config => {
        this.configSubject.next(config ?? WEDDING_CONFIG);
      }),
      catchError(error => {
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
