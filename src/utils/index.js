export const getSlug = (slug) => slug.replace(/\s+/g, '-').toLowerCase();

export const getFlavorSlug = (flavor) =>
  getSlug(`/flavor/${flavor.vendor} ${flavor.name}`);

export const getRecipeSlug = (recipe) =>
  getSlug(`/recipe/${recipe.id} ${recipe.name}`);
