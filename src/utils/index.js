const getSlug = (slug) =>
  slug
    .replace(/\s+/g, '-')
    .replace(/[*"?|:#\\<>(),.%']/g, '')
    .toLowerCase();

const getFlavorSlug = (flavor) =>
  getSlug(`/flavor/${flavor.id} ${flavor.vendor} ${flavor.name}`);

const getRecipeSlug = (recipe) =>
  getSlug(`/recipe/${recipe.id} ${recipe.name}`);

const getMixerSlug = (mixer) => getSlug(`/mixer/${mixer.name}`);

module.exports = {
  getFlavorSlug,
  getRecipeSlug,
  getMixerSlug
};
