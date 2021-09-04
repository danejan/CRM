import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import router from "./router";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import Editor from "primevue/editor";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import ContextMenu from 'primevue/contextmenu';
import Dialog from 'primevue/dialog';
import TabMenu from "primevue/tabmenu";


const app = createApp(App);
app.use(PrimeVue);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Dropdown",Dropdown);
app.component("Calendar",Calendar);
app.component("ContextMenu", ContextMenu);
app.component("Dialog",Dialog);
app.component("TabMenu",TabMenu);


app.component("Textarea",Textarea);
app.component("Editor",Editor);
app.component("TabView" ,TabView);
app.component("TabPanel",TabPanel);
app.component("Button",Button);
app.component("Splitter",Splitter);
app.component("SplitterPanel",SplitterPanel);


app.component("InputText", InputText);
app.use(router);
app.mount("#app");

app.component("Password", Password);
