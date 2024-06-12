import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import { router } from "./router/index.js";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
app.mount("#app");
app.use(router);
app.use(VueAxios, axios);
