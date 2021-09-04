<template>
  <div >
    <ul class="p-grid">
    <router-link class="p-col-4" active-class="active" to="/" exact tag="li"> <a>Home</a> </router-link>



    <router-link class="p-col-4" active-class="active" to="/OfferList" tag="li"><a>OfferList </a></router-link>

    <router-link class="p-col-4" active-class="active" to="/CompanyList" tag="li"><a>CompanyList</a></router-link>

  </ul>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>

</style>