import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);
  
  ngOnInit(): void {
    this._title.setTitle('About page');
    this._meta.updateTag({
      name: 'description',
      content: 'este es mi about page'
    });
    this._meta.updateTag({
      name: 'og:title',
      content: 'About page'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'Hola, Mundo, Kevin, Aquino'
    });
  } 
}
