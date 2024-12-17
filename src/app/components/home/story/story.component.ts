import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {STORY_DATA} from "../../../shared/constants";
import {WeddingConfigService} from "../../../services/config.service";

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
  storyData: any = undefined;

  constructor(private weddingConfigService:WeddingConfigService) {}

  ngOnInit() {
    this.weddingConfigService.config$.subscribe(config => {
      this.storyData = config?.story;
    });
  }
}
