import {Component, HostListener, Input, SimpleChanges} from '@angular/core';
import {forEach} from "lodash";
import {NgForOf} from "@angular/common";
import {WeddingConfig} from "../../../services/config.service";

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
  @Input() config!: WeddingConfig | null;
  protected readonly forEach = forEach;
  isLandscape: boolean = false;
  videoUrl: string = '';


  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLandscape = window.innerWidth > window.innerHeight;
  }

  ngOnchange(changes:SimpleChanges) {
    if (changes['config'] && this.config) {
      this.videoUrl = this.config?.carousel?.video;
    }
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
