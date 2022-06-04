import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cocktail } from 'src/app/models/cocktail';
import { Ingredient } from 'src/app/models/ingredient';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-add',
  templateUrl: './cocktail-add.component.html',
  styleUrls: ['./cocktail-add.component.css']
})
export class CocktailAddComponent implements OnInit, OnDestroy {
  title: string = "New cocktail";
  ingredients: Ingredient[] = [];
  newCocktail: Cocktail = new Cocktail();
  visible = false;

  form!: FormGroup;
  formIngredient!: FormGroup;
  destroy$ = new Subject();

  constructor(private fb: FormBuilder, private cocktailService: CocktailService, private router: Router) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      recipe: []
    });

    this.formIngredient = this.fb.group({
      name: ['', [Validators.required]],
      amount: [],
      unit: []
    });
  }

  submitIngredientForm(){
    if (this.formIngredient.valid) {
      this.ingredients.push(this.createIngredient());  
      this.formIngredient.reset();
      this.close();
    } else {
      Object.values(this.formIngredient.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } 
  }

  submitForm(){
    if (this.form.valid) {
      this.newCocktail.name = this.form.value.name;
      this.newCocktail.ingredients = this.ingredients;
      this.cocktailService.addCocktail(this.newCocktail)
      .pipe(takeUntil(this.destroy$))
      .subscribe(c => {
        console.log(c);
        this.router.navigate(['/cocktails']);
      });
      this.form.reset();
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  removeIngredient(index: number){
    this.ingredients.splice(index, 1);
  }

  private createIngredient(): Ingredient{
    var result = new Ingredient();
    result.name = this.formIngredient.value.name;
    result.amount = this.formIngredient.value.amount;
    result.unit = this.formIngredient.value.unit;
    return result;
  }

  goBack(){
    this.router.navigate(['/cocktails']);
  }

  open(): void {
    this.visible = true;
    
  }

  close(): void {
    this.visible = false;
    this.formIngredient.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
