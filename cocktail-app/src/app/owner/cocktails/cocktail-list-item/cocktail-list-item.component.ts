import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-list-item',
  templateUrl: './cocktail-list-item.component.html',
  styleUrls: ['./cocktail-list-item.component.css']
})
export class CocktailListItemComponent implements OnInit, OnDestroy {
  @Input()
  cocktail: Cocktail;
  @Output()
  isDeletedEvent = new EventEmitter<boolean>();

  allIngredients: string;
  destroy$ = new Subject();

  constructor(private cocktailService: CocktailService) {}
  

  ngOnInit(): void {
    this.ingredientsToString();
  }

  deleteCocktail(){
    this.cocktailService.deleteCocktail(this.cocktail.cocktailId)
      .pipe(takeUntil(this.destroy$)).subscribe(e => {
        this.addNewEvent(true);
      });
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

  addNewEvent(bool: boolean){
    this.isDeletedEvent.emit(bool);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
