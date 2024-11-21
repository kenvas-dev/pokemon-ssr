import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PokemonListSkeletonComponent } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
	selector: 'pokemons-page',
	standalone: true,
	imports: [PokemonListComponent, PokemonListSkeletonComponent],
	templateUrl: './pokemons-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
	private _pokemonService: PokemonsService = inject(PokemonsService);
	private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private _router: Router = inject(Router);
	private _title = inject(Title);

	public pokemons: WritableSignal<SimplePokemon[]> = signal<SimplePokemon[]>([]);

	public currentPage = toSignal<number>(
		this._activatedRoute.queryParamMap.pipe(
			map(params => params.get('page') ?? '1'),
			map(page => (isNaN(+page) ? 1 : +page)),
			map(page => Math.max(1, page))
		)
	); //permite cambiar de Obs a un Signal

	ngOnInit(): void {
		this._activatedRoute.queryParamMap.subscribe();
		this.loadPokemons();
	}

	public loadPokemons(nextPage: number = 0) {
		const pageToLoad: number = this.currentPage()! + nextPage;
		this._pokemonService
			.loadPage(pageToLoad)
			.pipe(
				tap(() => this._title.setTitle(`pokemons SSR - Page ${pageToLoad}`)),
				tap(() => this._router.navigate([], { queryParams: { page: pageToLoad } }))
			)
			.subscribe(pokemons => {
				this.pokemons.set(pokemons);
			});
	}
}
