import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {
  cocktails: Observable<Cocktail[]>;

  constructor(private cocktailService: CocktailService, private router: Router) { }

  ngOnInit(): void {
    this.cocktails = this.cocktailService.getCocktails();  
  }

  addNewCocktail(){
    this.router.navigateByUrl("/cocktails/add");
  }
  
  setMenu(){
    this.router.navigateByUrl("/cocktails/setMenu");
  }

  reloadList(bool: boolean){
    if(bool)
      this.cocktails = this.cocktailService.getCocktails();
  }
}
