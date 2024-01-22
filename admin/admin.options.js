const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const { Category } = require("../src/models/category.model");
const { Order } = require("../src/models/order.model");
const { Product } = require("../src/models/product.model");
// const { upload_img } = require("../src/helpers/img_upload");
const { before: beforePhotoHook, after: afterPhotoHook } = require("./actions/photo-location");

AdminBro.registerAdapter(AdminBroMongoose);

const updateAndCreate = {
  createdAt: { isVisible: { show: true, edit: false, list: true, filter: true } },
  updatedAt: { isVisible: { show: true, edit: false, list: true, filter: true } },
};

const options = {
  resources: [
    {
      resource: Category,
      options: {
        properties: {
          image: {
            components: {
              edit: AdminBro.bundle("./components/photo-location.jsx"),
            },
          },
          ...updateAndCreate,
        },
        actions: {
          new: {
            after: afterPhotoHook,
            before: beforePhotoHook,
          },
          edit: {
            after: afterPhotoHook,
            before: beforePhotoHook,
          },
        },
      },
    },
    {
      resource: Order,
      options: {
        properties: {
          ...updateAndCreate,
        },
      },
    },
    {
      resource: Product,
      options: {
        properties: {
          ...updateAndCreate,
        },
      },
    },
  ],
};

module.exports = options;
