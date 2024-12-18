import {Component, HostListener} from '@angular/core';
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
  protected carouselImages: Array<{ portraitUrl: string; landscapeUrl: string }> | undefined = [];
  protected carouselVideo: string | undefined = undefined;
  protected maleName: { short: string; full: string } | undefined = undefined;
  protected femaleName: { short: string; full: string } | undefined = undefined;
  protected readonly forEach = forEach;
  protected isLandscape: boolean = false;
  // config: WeddingConfig | null = null;


  constructor(private weddingConfigService:WeddingConfigService) {
  }

  ngOnInit() {
    this.weddingConfigService.config$.subscribe(config => {
      this.carouselImages = config?.carousel.images;
      this.carouselVideo = config?.carousel.video;
      this.maleName = config?.names.male;
      this.femaleName = config?.names.female;
      console.log(this.carouselVideo)
    });
  }

  ngAfterViewInit() {
    this.isLandscape = window.innerWidth > window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLandscape = event.target.innerWidth > event.target.innerHeight;
  }

  getImageUrl(image: any) {
    if (!image) return '';
    return this.isLandscape ? image.landscapeUrl : image.portraitUrl;
  }
}
