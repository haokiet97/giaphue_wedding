import { Component } from '@angular/core';
import {FEMALE_NAME, MALE_NAME, CAROUSEL_DATA} from "../../../shared/constants";
import {forEach} from "lodash";
import {NgForOf} from "@angular/common";

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
  protected readonly carouselImages: string[] = CAROUSEL_DATA.images;
  protected readonly carouselVideo: string = CAROUSEL_DATA.video;
  protected readonly MALE_NAME = MALE_NAME;
  protected readonly FEMALE_NAME = FEMALE_NAME;
  protected readonly forEach = forEach;
}
