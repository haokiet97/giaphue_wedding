import {CommonModule, NgIf} from '@angular/common';
import {Component, Input, SimpleChanges} from '@angular/core';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {WeddingConfig} from "../../../services/config.service";

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, CarouselModule, NgIf],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  @Input() config!: WeddingConfig | null;
  albumData?: any = [];

  constructor() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config){
      this.albumData = [];
      this.getDataImages();
    }
  }

  getDataImages() {
    let img_id = 1;
    let shuffledIndexes = [...Array(this.config?.gallery?.images?.length).keys()].sort(() => 0.5 - Math.random());
    for (const index of shuffledIndexes) {
      let img: PhotosApi = {
        albumId: 1,
        id: img_id,
        title: `Ảnh cưới ${this.config?.names?.male?.short} ${this.config?.names?.female?.short}`,
        url: `${this.config?.gallery?.images[index]}`,
        thumbnailUrl: `${this.config?.gallery?.images[index]}`
      };

      this.albumData?.push(img);
      img_id++;
    }
  }

  customOptions: OwlOptions = {
    nav: false,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  };
}
