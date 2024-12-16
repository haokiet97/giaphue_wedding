import { Component } from '@angular/core';
import {WeddingConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-money',
  standalone: true,
  imports: [],
  templateUrl: './money.component.html',
  styleUrl: './money.component.css'
})
export class MoneyComponent {

  protected monetaryGifts: any | undefined = undefined;

  constructor(private weddingConfigService:WeddingConfigService) {
  }

  ngOnInit(): void {
    this.weddingConfigService.config$.subscribe(config => {
      this.monetaryGifts =config?.monetaryGifts;
    });
  }
}
