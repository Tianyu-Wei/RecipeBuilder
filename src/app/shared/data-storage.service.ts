import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-a0a25.firebaseio.com/recipes.json', recipes)
        .subscribe(res => {
            console.log(res);
        });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>('https://ng-course-recipe-book-a0a25.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }))
        .subscribe(res => {
            this.recipeService.setRecipes(res);
        });
    }
}