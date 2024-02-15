
import React from 'react';
import { Category } from '../hooks/useMeals';

interface Props {
  categories: Category[];
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<Props> = ({ categories, onSelectCategory }) => {
  return (
    <section className={`list-cat`}>
      <h2>Categories</h2>
      <ul>
        {categories.map((category: Category) => (
          <li key={category.idCategory} onClick={() => onSelectCategory(category.strCategory)}>
            {category.strCategory}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
