import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CocktailMenuListComponent } from './menu/cocktail-menu-list/cocktail-menu-list.component';
import { CocktailAddComponent } from './owner/cocktails/cocktail-add/cocktail-add.component';
import { CocktailEditComponent } from './owner/cocktails/cocktail-edit/cocktail-edit.component';
import { CocktailListComponent } from './owner/cocktails/cocktail-list/cocktail-list.component';
import { MenuListComponent } from './owner/menu/menu-list/menu-list.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "menu",
    component: CocktailMenuListComponent
  },
  {
    path: "cocktails",
    component: CocktailListComponent
  },
  {
    path: "cocktails/add",
    component: CocktailAddComponent
  },
  {
    path: "cocktails/setMenu",
    component: MenuListComponent
  },
  {
    path: "cocktails/:id",
    component: CocktailEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
