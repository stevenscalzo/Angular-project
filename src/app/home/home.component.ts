import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  image: string;
  cols: number;
  rows: number;
  text: string;
  size: string;
  position: string;
}


@Component({
  selector: 'home',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tiles: Tile[] = [
    {
      text: '',
      cols: 3,
      rows: 1,
      image: "url('https://propellerads.com/blog/wp-content/uploads/2020/03/CDD1606_blog_1800x900-min.png')",
      size: "cover",
      position: "center"
    },
    {
      text: '',
      cols: 1,
      rows: 2,
      image: "url('https://img.freepik.com/foto-gratis/tiro-completo-mujer-haciendo-deporte_23-2149679149.jpg')",
      size: "cover",
      position: "center"
    },
    {
      text: '',
      cols: 1,
      rows: 1,
      image: "url('https://www.clarin.com/img/2019/08/21/4EQhjTpfn_360x240__1.jpg')",
      size: "cover",
      position: "center"
    },
    {
      text: '',
      cols: 2,
      rows: 1,
      image: "url('https://tienda-sportfitness.com/wp-content/uploads/2024/04/Banner-web-marzo-02.png')",
      size: "cover",
      position: ""
    },
    {
      text: '',
      cols: 2,
      rows: 1,
      image: "url('https://i.pinimg.com/originals/53/a5/f2/53a5f280b3e5e1a9ae177db423fa3a29.png')",
      size: "cover",
      position: "center"
    },
    {
      text: '',
      cols: 2,
      rows: 1,
      image: "url('https://www.esloganmagazine.com/wp-content/uploads/2021/06/marketing-y-publicidad-en-amazon.jpg')",
      size: "cover",
      position: "center"
    },
  ];
}
