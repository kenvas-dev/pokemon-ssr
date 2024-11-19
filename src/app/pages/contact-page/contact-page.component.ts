import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);
  
  ngOnInit(): void {
    this._title.setTitle('Contact page');
    this._meta.updateTag({
      name: 'description',
      content: 'este es mi Contact page'
    });
    this._meta.updateTag({
      name: 'og:title',
      content: 'Contact page'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'Hola, Mundo, Kevin, Aquino'
    });
  } 
}
