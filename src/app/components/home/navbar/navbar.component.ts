import { Component } from '@angular/core';
import {FEMALE_FULL_NAME, MALE_FULL_NAME} from "../../../shared/constants";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  protected readonly MALE_FULL_NAME = MALE_FULL_NAME;
  protected readonly FEMALE_FULL_NAME = FEMALE_FULL_NAME;
}
