import "./assets/scss/style.scss";
import "./assets/style.css";
import * as boostrap from "bootstrap";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
