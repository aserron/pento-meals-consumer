# Free Recipe API Support

The API and site will always remain free at point of access.
If you love our service and want extra features you can sign up as a Paypal supporter.
You can cancel anytime. This allows us to pay for the servers and bandwidth and develop new features.

## Test API Keys

You can use the test API key "1" during development of your app or for educational use (see test links below).
However you must become a supporter if releasing publicly on an appstore.
All data is returned in JSON format. We recomend Json view chrome extension to view the data in your web browser.

### API Production Key Upgrade 

All supporters have access to the beta version of the API which allows mutiple ingredient filters.
You also get access to adding your own meals and images. You can also list the full database rather than limited to 100 items.
Please sign up on Paypal and we will email you the upgrade.

## Contact  

Email: thedatadb@gmail.com (please state if you are a Paypal Supporter)

## API Methods

> API Methods using the developer test key '1' as the API key

### Methods

#### Search meal by name

www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

#### List all meals by first letter

www.themealdb.com/api/json/v1/1/search.php?f=a

#### Lookup full meal details by id  

www.themealdb.com/api/json/v1/1/lookup.php?i=52772

#### Lookup a single random meal  

www.themealdb.com/api/json/v1/1/random.php

#### Lookup a selection of 10 random meals (only available to Paypal supporters)  

www.themealdb.com/api/json/v1/1/randomselection.php

#### List all meal categories  

www.themealdb.com/api/json/v1/1/categories.php

#### Latest Meals (only available to Paypal supporters)  

www.themealdb.com/api/json/v1/1/latest.php

#### List all Categories, Area, Ingredients  

www.themealdb.com/api/json/v1/1/list.php?c=list
www.themealdb.com/api/json/v1/1/list.php?a=list
www.themealdb.com/api/json/v1/1/list.php?i=list

#### Filter by main ingredient  

www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

#### Filter by multi-ingredient (only available to Paypal supporters) 

#### www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast,garlic,salt 

#### Filter by Category  

www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

#### Filter by Area 

www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

### Images  

Meal Thumbnail Images
Add /preview to the end of the meal image URL
/images/media/meals/llcbn01574260722.jpg/preview

Ingredient Thumbnail Images
www.themealdb.com/images/ingredients/Lime.png
www.themealdb.com/images/ingredients/Lime-Small.png
