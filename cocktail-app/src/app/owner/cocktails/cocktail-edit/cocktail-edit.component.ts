import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cocktail } from 'src/app/models/cocktail';
import { Ingredient } from 'src/app/models/ingredient';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-edit',
  templateUrl: './cocktail-edit.component.html',
  styleUrls: ['./cocktail-edit.component.css']
})
export class CocktailEditComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    title: string;
    cocktail: Cocktail;
    ingredients: Ingredient[] = [];
    visible = false;
  
    form!: FormGroup;
    formIngredient!: FormGroup;
  
    constructor(private cocktailService: CocktailService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }
    
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
  
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.cocktailService.getCocktail(id).pipe(takeUntil(this.destroy$))
      .subscribe(c => {
        this.cocktail = c;
        this.title = c.name;
        this.ingredients = c.ingredients;
        this.form.patchValue({
          name: c.name,
          recipe: "ja"
        });
      })
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
      this.cocktail.name = this.form.value.name;
      this.cocktail.ingredients = this.ingredients;
      console.log(this.cocktail);
      this.cocktailService.editCocktail(this.cocktail)
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

  ngOnDestroy() : void{
      this.destroy$.next();
    }
  }
