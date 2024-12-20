import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon, PokemonAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
	providedIn: 'root',
})
export class PokemonsService {
	private _httpClient = inject(HttpClient);

	public loadPage(page: number): Observable<SimplePokemon[]> {
		if (page !== 0) --page;

		page = Math.max(0, page);

		return this._httpClient
			.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
			.pipe(
				map(resp => {
					const simplePokemons: SimplePokemon[] = resp.results.map(pokemon => ({
						id: pokemon.url.split('/').at(-2) ?? '',
						name: pokemon.name,
					}));

					return simplePokemons;
				}),

				tap(pokemons => console.log(pokemons))
			);
	}

	public loadPokemon(id: string): Observable<Pokemon> {
		return this._httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
	}
}
