import {Component, Input} from '@angular/core';
import {WeddingConfig, WeddingConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-money',
  standalone: true,
  imports: [],
  templateUrl: './money.component.html',
  styleUrl: './money.component.css'
})
export class MoneyComponent {

  @Input() config!: WeddingConfig | null;

  constructor() {}

}
