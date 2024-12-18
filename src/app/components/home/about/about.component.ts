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
  protected maleFullName: string | undefined = undefined;
  protected femaleFullName: string | undefined = undefined;
  protected maleInfo: any = undefined;
  protected femaleInfo: any = undefined;
  @Input() config!: WeddingConfig | null;


  constructor() {
  }

}
