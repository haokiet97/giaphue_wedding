import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FEMALE_NAME, GALLERY_DATA, MALE_NAME } from '../../../shared/constants';

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
  maxImageItem = 8;
  albumData?: any = [];

  ngOnInit() {
    this.getDataImages();
  }

  getDataImages() {
    let img_id = 1;
    for (const imageUrl of GALLERY_DATA.images) {
      let img: PhotosApi = {
        albumId: 1,
        id: img_id,
        title: `Ảnh cưới ${MALE_NAME} ${FEMALE_NAME}`,
        url: `${imageUrl}`,
        thumbnailUrl: `${imageUrl}`
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
  protected readonly GALLERY_DATA = GALLERY_DATA;
}
