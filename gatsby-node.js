const { resolve } = require('path');
const { getFlavorSlug, getRecipeSlug, getMixerSlug } = require('./src/utils');

const createPages = async (
  pageName,
  query,
  slugBuilder,
  { actions, graphql, reporter }
) => {
  const { createPage } = actions;
  const result = await graphql(query);
  const component = resolve(`src/pages/${pageName}.js`);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.pageJson.nodes.forEach((node) => {
    const path = slugBuilder(node);

    reporter.info(`Created page for ${path}`);
    createPage({
      context: node,
      component,
      path
    });
  });
};

const createRecipePages = (options) =>
  createPages(
    'recipe',
    `
{
  pageJson: allRecipesJson {
    nodes {
      id
      name
    }
  }
}
`,
    getRecipeSlug,
    options
  );

const createFlavorPages = (options) =>
  createPages(
    'flavor',
    `
{
  pageJson: allFlavorsJson {
    nodes {
      id
      name
      vendor {
        abbreviation
      }
    }
  }
}
`,
    getFlavorSlug,
    options
  );

const createMixerPages = (options) =>
  createPages(
    'mixer',
    `
{
  pageJson: allMixersJson {
    nodes {
      name
    }
  }
}
`,
    getMixerSlug,
    options
  );

exports.createPages = async (options) => {
  await createFlavorPages(options);
  await createRecipePages(options);
  await createMixerPages(options);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~components': resolve(__dirname, 'src/components'),
        '~pages': resolve(__dirname, 'src/pages'),
        '~utils': resolve(__dirname, 'src/utils')
      }
    }
  });
};
