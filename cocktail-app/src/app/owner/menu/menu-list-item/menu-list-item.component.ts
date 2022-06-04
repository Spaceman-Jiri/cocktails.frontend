import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css']
})
export class MenuListItemComponent implements OnInit {
  @Input()
  cocktail: Cocktail;
  @Output()
  canMakeEvent = new EventEmitter<true>();
  
  allIngredients: string;

  constructor() { }

  ngOnInit(): void {    
    this.ingredientsToString();
  }

  canMake(){
    this.cocktail.canMake = !this.cocktail.canMake;
    this.changeStatusCanMake();
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

  changeStatusCanMake(){
    this.canMakeEvent.emit(true);
  }
}
