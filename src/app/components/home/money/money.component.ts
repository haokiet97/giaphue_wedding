import { Component } from '@angular/core';
import {MONEY_DATA} from "../../../shared/constants";

@Component({
  selector: 'app-money',
  standalone: true,
  imports: [],
  templateUrl: './money.component.html',
  styleUrl: './money.component.css'
})
export class MoneyComponent {

  protected readonly MONEY_DATA = MONEY_DATA;
}
