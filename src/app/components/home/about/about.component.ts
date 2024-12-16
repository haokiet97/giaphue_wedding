import { Component } from '@angular/core';
import {ABOUT_DATA, FEMALE_FULL_NAME, MALE_FULL_NAME} from "../../../shared/constants";
import {WeddingConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  //
  // protected readonly MALE_FULL_NAME = MALE_FULL_NAME;
  // protected readonly FEMALE_FULL_NAME = FEMALE_FULL_NAME;
  // protected readonly ABOUT_DATA = ABOUT_DATA;
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
