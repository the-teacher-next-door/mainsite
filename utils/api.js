import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  login: data => {
    return axios.post(`/api/login`, data);
  },
  checkLogin() {
    return axios.get(`/api/checkLogin`);
  },
  registerUser(userData) {
    return axios.post(`/api/register`, userData);
  },
  logout() {
    return axios.get(`/api/logout`);
  },
  findUserById: id => {
    return axios.get(`/api/users/find/${id}`);
  },
  saveBlog: data => {
    return axios.post(`/api/blog/save`, data);
  },
  loadBlogs: () => {
    return axios.get(
      `https://tnd-4605b0.easywp.com/wp-json/wp/v2/posts?_embed`
    );
  },
  loadBlog: data => {
    return axios.get(
      `https://tnd-4605b0.easywp.com/wp-json/wp/v2/posts?slug=${data}`
    );
  },
  loadBlogAdmin: data => {
    return axios.get(`/api/blog/loadAdmin/${data}`);
  },
  deleteBlog: data => {
    return axios.delete(`/api/blog/delete/${data}`);
  },
  loadFour: category => {
    return axios.get(`/api/blog/loadFour/${category}`);
  },
  newBlog: data => {
    return axios.post(`/api/blog/new`, data);
  },
  search: search => {
    return axios.get(`/api/blog/search/${search}`);
  },
  categorySearch: search => {
    return axios.get(`/api/blog/categorySearch/${search}`);
  },
  updateViews: data => {
    return axios.post(`/api/blog/views`, data);
  },
  addLink: data => {
    return axios.post("/api/slider/addLink", data);
  },
  retrieveLinks: () => {
    return axios.get("/api/slider/retrieveLinks");
  },
  loadImages: () => {
    return axios.get(`/api/images/`);
  },
  upload: data => {
    return axios.post(`/api/upload`, data);
  },
  loadFreebies: () => {
    return axios.get(`/api/freebies/`);
  },
  freebiesUpload: data => {
    return axios.post(`/api/freebies/upload`, data);
  },
  freebiesDownload: data => {
    return axios.get(`/api/freebies/download/`, {
      params: {
        path: data
      }
    });
  },
  saveFreebie: data => {
    return axios.post(`/api/freebies/save`, data);
  },
  deleteFreebies: data => {
    return axios.put(`/api/freebies/delete`, data);
  },
  deleteImage: data => {
    return axios.put(`/api/image/delete`, data);
  },
  newSliderImage: data => {
    return axios.post("/api/slider/addLink", data);
  },
  loadSliderImages: () => {
    return axios.get("/api/slider/loadall");
  },
  saveSlider: data => {
    return axios.post(`/api/slide/save`, data);
  },
  submitSubscriber: data => {
    return axios.post(
      "https://api.convertkit.com/v3/forms/988284/subscribe?api_key=TYgg8lXToCzj3_E7q4JnLw",
      data
    );
  },

  submitComment: data => {
    return axios.put(`/api/comments/submit`, data);
  },
  submitReply: data => {
    return axios.put(`/api/comments/submitReply`, data);
  },
  loadComments: data => {
    return axios.get(`/api/comments/load/${data}`);
  },
  loadReplies: data => {
    return axios.get(`/api/comments/loadReplies/${data}`);
  },
  loadBooks: () => {
    return axios.get(`/api/book/loadall`);
  },
  newBook: () => {
    return axios.post(`/api/book/new`);
  },
  saveBooks: data => {
    return axios.put(`/api/book/save`, data);
  },
  sendEmail: data => {
    return axios.post(`/api/email/send`, data);
  },
  getPins: () => {
    return axios.get(
      "https://api.pinterest.com/v1/me/pins/?access_token=AgmenqdC86FIzpmol42XLIUgwRuvFbvZhm6-MqlGFc3CdWDLDwWKwDAAADV4RhXQBhAAuCYAAAAA"
    );
  }
};
