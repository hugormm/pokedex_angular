import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeHeaderComponent } from './poke-header/poke-header.component';
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PokeHeaderComponent,
    PokeSearchComponent,
    PokeListComponent
  ],
  exports: [
    PokeHeaderComponent,   //exportamos para ser utilizado em outros sitios
    PokeSearchComponent,
    PokeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule  // importamos para o router link funcuionar nos componentes
  ]
})
export class SharedModule { }
