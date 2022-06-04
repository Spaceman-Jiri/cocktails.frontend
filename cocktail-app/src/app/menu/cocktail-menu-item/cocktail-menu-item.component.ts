import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail';

@Component({
  selector: 'app-cocktail-menu-item',
  templateUrl: './cocktail-menu-item.component.html',
  styleUrls: ['./cocktail-menu-item.component.css'],
})
export class CocktailMenuItemComponent implements OnInit {
  @Input()
  cocktail: Cocktail;
  allIngredients: string;

  constructor() {}

  ngOnInit(): void {
    this.ingredientsToString();
  }

  ingredientsToString() {
    var result = "";
    this.cocktail.ingredients.forEach(function (ingredient, index, array) {
      if (index != array.length - 1) {
        result += ingredient.name + ', ';
      } else {
        result += ingredient.name;
      }
    });
    this.allIngredients = result;
  }
}
