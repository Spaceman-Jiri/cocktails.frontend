import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';
import { Cocktail } from 'src/app/models/cocktail';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {
  cocktails$: Observable<Cocktail[]>;
  cocktails: Cocktail[];
 
  destroy$ = new Subject();

  constructor(private cocktailService: CocktailService, private router: Router, private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.cocktails$ = this.cocktailService.getCocktails();
    this.cocktails$.subscribe(res => this.cocktails = res)  
  }

  saveMenu(){
   console.log(this.cocktails);
   this.cocktailService.setMenu(this.cocktails).pipe(takeUntil(this.destroy$)).subscribe(res => {
     if(res){
        this.createMessage('success');
        this.goBack();
     } else {
       this.createMessage('error');
     }
   });
  }

  goBack(){
    this.router.navigate(['/cocktails']);
  }

  updateCanMake(bool: boolean, cocktailId: number){
    if(bool){
      let cocktail = this.cocktails.find(c => c.cocktailId == cocktailId);
      cocktail.canMake = !cocktail.canMake;
    }
  }

  createMessage(type: string){
    if(type == 'success')
      this.messageService.create(type, "Nice, the menu is saved!");
      else 
        this.messageService.create(type, "Something went wrong...")

  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
