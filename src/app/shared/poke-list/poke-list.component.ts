import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit{
  private setAllPokemons: any
  public getAllPokemons: any
  
  public apiError: boolean = false    // boolean para a imagem de erro

  constructor(
    private pokeApiService: PokeApiService   // injetamos o service 
  ) {

  }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe({     // chanmamos o sevrice e executamos o metodo 
      next: (res) => {
        this.setAllPokemons = res.results
        this.getAllPokemons = this.setAllPokemons   // fizemos esta refatoracao pra corrigir o bug de apagar o search e noa mudar a lista
      },
      error: (error) => {
        this.apiError = true
      }                                              // desta forma em baixo conseguimos actualizar a lista ao apagar no input (estamos a resetar a lista ao iniciar o metodo)
    } )
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter( (res: any) => {
      return !res.name.indexOf(value.toLowerCase())              // vai verificar as primeiras letras do nome
    })

    this.getAllPokemons = filter
  }

}
