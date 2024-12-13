import { Component, HostListener } from '@angular/core';
import {FEMALE_NAME, MALE_NAME, CAROUSEL_DATA} from "../../../shared/constants";
import {forEach} from "lodash";
import {NgForOf} from "@angular/common";
import {WeddingConfig, WeddingConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  protected readonly carouselImages = CAROUSEL_DATA.images;
  protected readonly carouselVideo: string = CAROUSEL_DATA.video;
  protected readonly MALE_NAME = MALE_NAME;
  protected readonly FEMALE_NAME = FEMALE_NAME;
  protected readonly forEach = forEach;
  protected isLandscape: boolean = false;
  config: WeddingConfig | null = null;

  constructor(private weddingConfigService:WeddingConfigService) {
  }

  ngOnInit() {
    this.weddingConfigService.config$.subscribe(config => {
      this.config = config;
    });
  }



  ngAfterViewInit() {
    this.isLandscape = window.innerWidth > window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLandscape = event.target.innerWidth > event.target.innerHeight;
  }
}
