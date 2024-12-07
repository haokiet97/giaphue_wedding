import { Component } from '@angular/core';
import {FEMALE_NAME, MALE_NAME} from "../../../shared/constants";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  protected readonly MALE_NAME = MALE_NAME;
  protected readonly FEMALE_NAME = FEMALE_NAME;
}
