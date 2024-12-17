import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import {WeddingConfigService} from "../../../services/config.service";

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
  imports: [CommonModule, CarouselModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  albumData?: any = [];
  names: any = undefined;
  galleryData: any = undefined;

  constructor(private weddingConfigService:WeddingConfigService) {
  }

  ngOnInit() {
    this.weddingConfigService.config$.subscribe(config => {
      this.names = config?.names;
      this.galleryData = config?.gallery;
      this.getDataImages();
    });
  }

  getDataImages() {
    let img_id = 1;
    let shuffledIndexes = [...Array(this.galleryData.images.length).keys()].sort(() => 0.5 - Math.random());
    for (const index of shuffledIndexes) {
      let img: PhotosApi = {
        albumId: 1,
        id: img_id,
        title: `Ảnh cưới ${this.names.male.short} ${this.names.female.short}`,
        url: `${this.galleryData.images[index]}`,
        thumbnailUrl: `${this.galleryData.images[index]}`
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
