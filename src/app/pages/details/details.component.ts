import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  public pokemon: any
  public isLoading: boolean = false   // criamos esta variavel para defenir se esta carregando (para limpar erros do console)
  public apiError: boolean = false    // boolean para a imagem de erro

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {   // adicionamos dependencia d activedRouter para buscar o id que la contem

  }

  ngOnInit(): void {
    this.getPokemon()
  }
  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id']  // recuperamos o id
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`)
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`)

    return forkJoin([pokemon, name]).subscribe({ // faz ao mesmo tempo as requisicoes economizando codigo e subscribe
      
        next: (res) => {
          this.pokemon = res
          this.isLoading = true    // mostra a tela quando tiver carregado
        },
        error: (error) => {
          this.apiError = true
        }
    })      
  }
}
