export const ApiUrl = 'http://192.168.0.102:8000/api/';
export const ApiUrl_Image = 'http://192.168.0.102:8000';

export const api_url = {
  LOGIN: 'auth/login',
  PROFILE: 'profile',
  COMPANY_PROFILE: 'company/profile',
  CHANGEPASS: 'setting/change-password',
  APPLY_JOB: 'create',
  LIST_APPLY: 'cv',
  UPDATE_PROFILE: 'update-profile',
  UPDATE_PROFILE_COMPANY: 'company/update-profile',
  UPLOAD_AVATAR: 'profile/upload',
  UPLOAD_LOGO_COMPANY: 'company/profile/upload',
  DETAIL: 'details',
  LIST_FAVORITE: 'list-favorite',
  DELETE_FA: 'details/delete-fa',
  LIST_JOB_COMPANY: 'company',
  LIST_CV: 'company/list-cv',
  LIST_CV_APPLY: 'company/list-cv/details',
  SEND_EMAIL: 'company/list-cv/details',
  LIST_MAJOR: 'listmajor',
  LIST_SCHOOL: 'admin/school',
  LIST_AREA: 'company/listareas',
};

export const PATH_API = {
  LOGIN: 'users/login',
  REGISTER: 'users/store',
  INFO_USER: 'users/edit',
  LOGOUT: 'auth/logout',
  RESET_PASSWORD: 'auth/reset-password',

  // sản phẩm
  PRODUCT: 'products/index',
  ALL_PRODUCT_DISCOUNT: 'products/allDiscout',
  ALL_PRODUCT: 'products/discout',
  PRODUCT_SEARCH: 'products/category/search',
  PRODUCT_IN_CATEGORIES: 'products/category',
  PRODUCT_IN_RELATED: 'products/related',
  PRODUCT_IN_BRANCH: 'products/brands',

  DETAIL_PRODUCT: 'products/edit',

  GET_COMMENT_WITH_PRODUCT: 'products/rate-yo-product',

  // loại sản phẩm
  CATEGORIES: 'products/index-type-product',

  // Danh mục
  MENU_CATEGORIES: 'products/index-categories',

  // Chi tiết user
  PROFILE: 'user/profile',

  // Giỏ hàng
  ADD_TO_CART: 'orders/add-to-cart',
  USER_CART: 'orders/product-to-cart',
  UPDATE_CART: 'orders/changer-product-to-cart',
  REMOVE_PRODUCT_CART: 'orders/remove-to-cart',

  // Đặt hàng
  ORDER_CART: 'orders/checkout',
  GET_ORDER_BY_USER: 'orders/my-order',

  UPDATE_PASSWORD: 'users/check-change-password',

  FORGET_PASSWORD: 'users/forget-password',

  ACCEPT_CODE: 'users/add-code',

  ACCEPT_CHANGE_PASSWORD: 'users/accept-check-change-password',

  NEW_CATEGORY: 'category_new/index',

  GET_PROVINCE: 'get-provinceid',
  GET_DISTRICT: 'get-district',
  GET_WARD: 'get-ward',

  UPDATE_USER: 'users/update',

  DETAIL_ORDER: 'orders/edit',

  UPDATE_STATUS_ORDER: 'orders/update-status',
};
