import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home";
import TOfferList from "../components/offer/TOfferList";
import TCompanyList from "../components/companies/TCompanyList";
import offerAnalysis from "../components/offer/offerAnalysis";
import TCreateOffer from "../components/offer/TCreateOffer";

const routes = [
  { path: "/", name: "homepage", component: Home },
  { path: "/offerAnalysis", component: offerAnalysis },

  { path: "/OfferList", component: TOfferList, name: "OfferList" },
  {path: "/OfferCreate",component: TCreateOffer , name: "OfferCreate", props: (route) =>
      ({ offerId: Number(route.params.offerId), operation: Number(route.params.operation) })},
  {path: "/OfferCreate",component: TCreateOffer , name: "OfferUpdate"},

  { path: "/CompanyList", component: TCompanyList },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
