import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'pricing-page',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pricing-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
	private _title = inject(Title);
	private _meta = inject(Meta);

	ngOnInit(): void {
		this._title.setTitle('Pricing page');
		this._meta.updateTag({
			name: 'description',
			content: 'este es mi Pricing page',
		});
		this._meta.updateTag({
			name: 'og:title',
			content: 'Pricing page',
		});
		this._meta.updateTag({
			name: 'keywords',
			content: 'Hola, Mundo, Kevin, Aquino',
		});
	}
}
