import { Component } from '@angular/core';
import {ABOUT_DATA, FEMALE_FULL_NAME, MALE_FULL_NAME} from "../../../shared/constants";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  protected readonly MALE_FULL_NAME = MALE_FULL_NAME;
  protected readonly FEMALE_FULL_NAME = FEMALE_FULL_NAME;
  protected readonly ABOUT_DATA = ABOUT_DATA;
}
