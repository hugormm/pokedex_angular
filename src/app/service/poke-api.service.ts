import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Observable para observar a requisicao (tratamento assincrono)
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'

  constructor(
    private http: HttpClient         // injetamos o httpClient depois d registar o httpClientModule no app-component
  ) { }

  get apiListAllPokemons(): Observable<any> {       //  usamos o metodo get (typescript) para retornar
    return this.http.get<any>(this.url).pipe(       // retonamos um get de any com a reuisicao do url
      tap(res => res),                 // usamos o tap, e com um map do rxjs , mas nao modifica os valores (estudar melhor o seu efeito)
      tap(res => {
        res.results.map( ( resPokemons: any ) => {   // map por cada pokemon vamos fazer a requisicao da url que traz os dados do pokemon (tipo um foreach)

          this.apiGetPokemons(resPokemons.url).subscribe(   // chamamos o metodo abaixo e damos subscribe
            res => resPokemons.status = res   // por cada Pokemon da resposta anterior ele cria o atributo status e insere os atributos do pokemon que vieram na ultima req
          )   

        })
      })
    )   
  }

  //criamos a parte esta funcao q pode ser reutilzada
  public apiGetPokemons( url: string ): Observable<any> {    // Um observable e como uma promisse mas fica observando mais dados e nao resolve so com um. tem q ter um subscribe
    return this.http.get<any>(url).pipe(  // pega no url de cada popkemon
      map(
        res => res                // vamos receber a resposta e mapeia (como no map Javascrpit)
      )
    )
  }
}
