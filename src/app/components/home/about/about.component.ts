import { Component } from '@angular/core';
import {WeddingConfigService} from "../../../services/config.service";

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


  constructor(private weddingConfigService:WeddingConfigService) {
  }

  ngOnInit() {
    this.weddingConfigService.config$.subscribe(config => {
      this.maleFullName = config?.names?.male?.full;
      this.femaleFullName = config?.names?.female?.full;
      this.maleInfo = config?.about?.male;
      this.femaleInfo = config?.about?.female;
    });
  }
}
