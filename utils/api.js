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
    return axios.get(`/api/blog/loadall`);
  },
  loadBlog: data => {
    return axios.get(`/api/blog/load/${data}`);
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
  }
};
