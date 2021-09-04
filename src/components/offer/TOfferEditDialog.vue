<template>
  <Dialog position="center" :visible="true" :modal="true" :show-header="false" :style="{width: '50vw'}">
    <div class="p-fluid">
      <h5>Düzenle</h5>
      <div class="p-field">
        <label>Ürün Cinsi</label>
        <InputText placeholder="Ürün Cinsi" id="ProductType" type="text"
                   v-model="offerDetail.ProductType"/>
      </div>
      <br>
      <div class="p-field">
        <label>Ürün Adeti</label>
        <InputText placeholder="Ürün Adeti" id="TotalProduct" type="text"
                   v-model="offerDetail.TotalProduct"/>
      </div>
      <br>
      <div class="p-field">
        <label>Birim Fiyatı</label>
        <InputText placeholder="Birim Fiyatı" id="UnitPrice" type="text"
                   v-model="offerDetail.UnitPrice"/>
      </div>
      <br>
      <div class="p-grid">
        <div class="drop-down" style="margin-right: 100px">
          <label>Birim Fiyatı</label>
          <Dropdown v-model="offerDetail.Currency" :options="Currency"
                    optionLabel="name" placeholder="Para Birimi" />
        </div>
        <div class="drop-down">
          <label>% Kar Oranı</label>
          <Dropdown class="p-col-fixed" v-model="offerDetail.ProfitRate "
                    :options="ProfitRate"
                    optionLabel="name" placeholder="% Kar Oranı " />
        </div>
      </div>

    </div>
    <br>

    <Button class="buttonEdit" label="Ekle" icon="pi pi-check" style="margin-right: 5px" @click="submitOffer"
            autofocus />
    <Button class="buttonEdit" label="İptal" icon="pi pi-check" @click="closeDialog" style="margin-right: 5px"
            autofocus />

  </Dialog>

</template>

<script>

export default {
  props: {
    changeOfferDetail:{
      type: Function,
      required: true
    },
    closeDialog: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      offerDetail: {  },
      Currency: [
        { name: "Tl", symbol: "₺" },
        { name: "Euro", symbol: "€" },
        { name: "Dolar", symbol: "$" }
      ],
      ProfitRate: [
        {}
      ]

    };

  },
  methods: {
    submitOffer() {
      this.changeOfferDetail(this.offerDetail);
      this.$router.push({ name: "OfferUpdate" });
      return this.closeDialog();
    }
  },

};

</script>
<style>
.drop-down {
  display: inline-block;
  margin-left: 5px;

}

.buttonEdit {

  position: relative;
  float: right;

}
</style>