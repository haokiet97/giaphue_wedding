import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WeddingConfig, WeddingConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {
  @Input() config!: WeddingConfig | null;

  constructor() {}

  ngOnInit() {
  }
}
