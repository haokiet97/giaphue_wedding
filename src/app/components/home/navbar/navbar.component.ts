import {Component, Input} from '@angular/core';
import {WeddingConfig} from "../../../services/config.service";
import {config} from "rxjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() config!: WeddingConfig | null;
  ngOnInit() {
  }
}
