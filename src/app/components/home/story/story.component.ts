import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {STORY_DATA} from "../../../shared/constants";

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

  protected readonly STORY_DATA = STORY_DATA;
}
