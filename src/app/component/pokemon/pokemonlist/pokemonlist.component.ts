import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Pokemon } from '../interfaces/pokemon.interfaces';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {

  public pokemons: Pokemon[] = [];
  public page: number = 0;
  public search: string = "";
  public totalPokemons: number = 0

  constructor(private pokemonService: PokemonService, private auth: AuthService, private router: Router) { }
  
  ngOnInit(): void{
    !localStorage.getItem("token") && this.router.navigate(["login"])
    if (localStorage.getItem("token")) {
      this.pokemonService.getAllPokemons()
        .subscribe(pokemons => {
        this.pokemons = pokemons
        this.totalPokemons = pokemons.length
      })
    }
  }

  nextPage() {
    this.page +=5
  }

  prevPage() {
    if(this.page>0){this.page -=5}
  }

  onSearchPokemon(search: string) {
    this.page = 0;
    this.search = search
  }
  
  logout() {
    this.auth.logout()
    this.router.navigate(["login"])
  }
}
