const getSlug = (slug) =>
  slug
    .replace(/\s+/g, '-')
    .replace(/[\\*?.()&'":%]/g, '')
    .toLowerCase();

const getFlavorSlug = (flavor) =>
  getSlug(`/flavor/${flavor.id} ${flavor.vendor.abbreviation} ${flavor.name}`);

const getRecipeSlug = (recipe) => getSlug(`/recipe/${recipe.id}`);

const getMixerSlug = (mixer) => getSlug(`/mixer/${mixer.name}`);

const getVendorSlug = (vendor) =>
  getSlug(`/vendor/${vendor.id} ${vendor.name}`);

module.exports = {
  getFlavorSlug,
  getRecipeSlug,
  getMixerSlug,
  getVendorSlug
};
