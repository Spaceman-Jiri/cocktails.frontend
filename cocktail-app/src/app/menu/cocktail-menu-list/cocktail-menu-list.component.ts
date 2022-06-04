import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-menu-list',
  templateUrl: './cocktail-menu-list.component.html',
  styleUrls: ['./cocktail-menu-list.component.css']
})
export class CocktailMenuListComponent implements OnInit {
  cocktails: Observable<Cocktail[]>;

  constructor(private cocktailService: CocktailService) { }

  ngOnInit(): void {
    this.cocktails = this.cocktailService.getMenu();  }

}
