const fs = require('fs');
const path = './public/categories.json';

function loadCategories() {
  if (!fs.existsSync(path)) return { Categories: [] };

  try {
    const data = fs.readFileSync(path, 'utf8');
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed.Categories)) {
      return { Categories: [] }; // Ensure structure is safe
    }
    return parsed;
  } catch (err) {
    console.error('Error loading categories:', err.message);
    return { Categories: [] };
  }
}

function saveCategories(CategoriesList) {
  console.log("Cat", CategoriesList);
  const data = { Categories: CategoriesList };
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function addCategories(newCategory) {
  const all = loadCategories();
  console.log("new Cat", newCategory.toJSON());
  if (!Array.isArray(all.Categories)) {
    console.warn("Categories was not an array. Resetting.");
    all.Categories = [];
  }
  all.Categories.push(newCategory.toJSON()); // assumes .toJSON() exists
  console.log("new all", all);

  saveCategories(all.Categories); // pass array, not object
}

module.exports = { 
  loadCategories, 
  saveCategories, 
  addCategories 
};
