import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HomeComponent } from './home/home/home.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { CocktailMenuListComponent } from './menu/cocktail-menu-list/cocktail-menu-list.component';
import { CocktailMenuItemComponent } from './menu/cocktail-menu-item/cocktail-menu-item.component';
import { HeaderComponent } from './header/header/header.component';
import { CocktailListComponent } from './owner/cocktails/cocktail-list/cocktail-list.component';
import { CocktailAddComponent } from './owner/cocktails/cocktail-add/cocktail-add.component';
import { CocktailListItemComponent } from './owner/cocktails/cocktail-list-item/cocktail-list-item.component';
import { CocktailEditComponent } from './owner/cocktails/cocktail-edit/cocktail-edit.component';
import { MenuListComponent } from './owner/menu/menu-list/menu-list.component';
import { MenuListItemComponent } from './owner/menu/menu-list-item/menu-list-item.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CocktailMenuListComponent,
    CocktailMenuItemComponent,
    HeaderComponent,
    CocktailListComponent,
    CocktailAddComponent,
    CocktailListItemComponent,
    CocktailEditComponent,
    MenuListComponent,
    MenuListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzListModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzInputModule,
    NzGridModule,
    NzDrawerModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzMessageModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
