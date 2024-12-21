import {Component, Input} from '@angular/core';
import {WeddingConfig, WeddingConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  @Input() config!: WeddingConfig | null;


  constructor() {
  }

}
