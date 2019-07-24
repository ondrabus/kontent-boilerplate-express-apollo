const { DeliveryClient } = require('kentico-cloud-delivery');

const { deliveryConfig } = require('../config');

const queryTypes = `
# The "Query" type is the root of all GraphQL queries.
extend type RichTextElement {
  resolvedHtml: String
}

type Query {
  items: [ContentItem],
  itemsByType(type: String!, limit: Int, depth: Int, order: String): [ContentItem]
}
`;

const deliveryClient = new DeliveryClient(deliveryConfig);
const resolvers = {
  ContentItem: {
    __resolveType(item, _context, _info) {
      const type = convertSnakeCaseToPascalCase(item);
      return type + 'ContentType';
    }
  },
  Query: {
    items: async () => {
      const response = await deliveryClient.items()
        .getPromise();
      resolveHtml(response.items);
      return response.items;
    },
    itemsByType: async (_, { type, limit, depth, order }) => {
      const query = deliveryClient.items()
        .type(type);
      limit && query.limitParameter(limit);
      depth && query.depthParameter(depth);
      order && query.orderParameter(order);

      const response = await query
        .getPromise();
      resolveHtml(response.items);
      return response.items;
    }
  },
};

const convertSnakeCaseToPascalCase = (item) => {
  return item.system.type
    .split('_')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join('');
}

/**
 * Create a new property with resolved Html.
 * @param {Array} items Items response from JS SDK.
 */
const resolveHtml = (items) => {
  items.forEach((item) => {
    Object
      .keys(item)
      .filter((key) =>
        item
         && item[key] 
         && item[key].type
         && item[key].type === 'rich_text')
      .forEach((key) => {
        item[key].getHtml()
      });
  });
};

module.exports = {
  resolvers,
  queryTypes
}

