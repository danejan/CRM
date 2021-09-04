<template>
  <div>  <TabMenu :model="items" /> <router-view /> </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home text-blue-300 text-xl",
          to: "/"
        },
        {
          label: "Kullanıcılar",
          icon: "pi pi-fw pi-users text-green-500 text-xl",
          to: "/UserList"
        },
        {
          label: "Teklifler",
          icon: "pi pi-fw pi-file-o text-orange-500 text-xl",
          to: "/OfferList"
        },
        {
          label: "Şirketler",
          icon: "pi pi-fw pi-briefcase text-purple-500 text-xl",
          to: "/CompanyList"
        }] };} };
</script>