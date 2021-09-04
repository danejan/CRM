<template>
  <br>
  <div class="CreateBody">

    <Dropdown class="p-col-fixed " style="width: 400px ; margin-right:5px" v-model="offer.OfferNo"
              optionValue="name"
              :options="companies" optionLabel="name" placeholder="Firma Adı"
              :disabled="operation === 2" />


    <Dropdown class="p-col-fixed" style="width: 350px; margin-right:5px" v-model="offer.CompanyName"
              optionValue="name"
              :options="companiesContact"
              optionLabel="name"
              placeholder="Firma İlgilisi" />

    <Calendar class="p-col-fixed" style="width: 200px ; margin-right:5px" v-model="offer.CreateTime"
              placeholder="Teklif Tarihi"
              :showIcon="true" />

    <Calendar class="p-col-fixed" style="width: 200px ; margin-right:5px" v-model="offer.ValidationDate"
              placeholder="Geçerlilik Süresi"
              :showIcon="true" />


    <Dropdown class="p-col-fixed" style="width: 150px ; margin-right:5px" v-model="offer.Currency"
              :options="currency"
              optionLabel="name" placeholder="Para Birimi" />

    <Dropdown class="p-col-fixed" style="width: 150px ;margin-right:5px" v-model="offer.ProfitRate"
              :options="ProfitRate"
              optionLabel="name" placeholder="% Kar Oranı " />


    <br><br>

    <div class="CreateButton">
      <Button @click="addOfferDetail" label="Ekle" icon="pi pi-plus" style="margin-right: 5px" class="p-button-sm" />

      <Button label="Düzenle" icon="pi pi pi-pencil" class="p-button-sm" style="margin-right: 5px"
              @click="updateOfferDetail" />

      <Button @click="deleteOfferDetail" label="Sil" icon="pi pi-times" style="margin-right: 5px" class="p-button-sm" />
    </div>
    <br><br>

    <TabView>

      <TabPanel header="Detaylar">

        <DataTable v-model:selection="selected"

                   @contextmenu="onDataTableRightClick" aria-haspopup="true"

                   :value="offer.Items" data-keys="id" selection-mode="single" tabindex="-1">

          <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header"></Column>
          <span>Selected: {{ selected.Id }}</span>
          <ContextMenu ref="menu" :model="menu" />

        </DataTable>

      </TabPanel>

      <TabPanel header="Süre Bilgisi">
        <Editor v-model="offer.TimeInformation" editorStyle="height: 320px" placeholder="Süre Bilgisini Giriniz" />
      </TabPanel>

      <TabPanel header="Ticari Koşullar">
        <Editor v-model="offer.CommercialTerms" editorStyle="height: 320px" placeholder="Ticari Koşulları Giriniz" />
      </TabPanel>

      <TabPanel header="Açıklamalar">
        <Editor v-model="offer.Descriptions" editorStyle="height: 320px" placeholder="Açıklamaları Giriniz" />
      </TabPanel>

    </TabView>

    <div class="SubmitButton">
      <Button class="p-button-danger p-button-lg" label="Kaydet" @click="handleClick($event)" />
    </div>

    <t-offer-edit-dialog v-if="showOfferDialog"
                         :change-offer-detail="changeOfferDetail"
                         :close-dialog="closeOfferDialog"
                         :operation="selectedOperation"
                         :offer-id="selected.OfferNo"></t-offer-edit-dialog>
  </div>

</template>
<script>

import OfferService from "../../services/OfferService";
import TOfferEditDialog from "./TOfferEditDialog";


export default {

  props: {
    offerId: {
      type: Number,
      required: true
    },
    operation: {
      type: Number,
      default: 1
    }
  },
  components: {
    TOfferEditDialog: TOfferEditDialog
  },

  data() {
    return {
      displayModal: false,
      selectedOperation: "1",
      showOfferDialog: false,
      offer: {
        Items: []
      },

      companies: [
        { name: "Firma1", code: "1" },
        { name: "Firma2", code: "2" },
        { name: "Firma3", code: "3" },

      ],
      companiesContact: [
        { name: "Firma İlgilisi 1", code: "1" },
        { name: "Firma İlgilisi 2", code: "2" },
        { name: "Firma İlgilisi 3", code: "3" },


      ],
      menu: [
        {
          label: "Ekle",
          icon: "pi pi-plus",
          command: () => {
            this.addOfferDetail();
          }

        },
        {
          label: "Düzenle",
          icon: "pi pi-pencil",
          command: () => {
            this.updateOfferDetail();
          }
        },
        {
          label: "Sil",
          icon: "pi pi-times",
          command: () => {
            this.deleteOfferDetail();
          }
        },
        {
          label:"Gönder",
          icon: "pi pi-check-circle",
          items:[
            {
              label:"E-mail",
              icon:"pi pi-inbox",
            },
            {
            label:"İndir",
              icon: "pi pi-download"
            }
          ]
        },
        {
          separator: true
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off"
        }

      ],

      currency: [
        {  symbol: "₺" },
        { symbol: "€" },
        {  symbol: "$" }
      ],
      ProfitRate: [
        {}
      ],
      selected: [],
      columns: [
        { field: "ProductType", header: "Ürün Cinsi" },
        { field: "TotalProduct", header: "Adet" },
        { field: "UnitPrice", header: "Birim Fiyatı" },
        { field: "Currency", header: "Para birimi" },
        { field: "Earning", header: "Kâr" },
        { field: "Total", header: "Toplam" }

      ]
    };
  },
  methods: {
    addOfferDetail() {
      this.selected.OfferNo = 0;
      this.selectedOperation = 1;
      this.showOfferDialog = true;
      //this.offer.push()
      console.log(this.offer);

    },
    updateOfferDetail() {
      this.selectedOperation=2;
      this.showOfferDialog=true;
     // this.$router.push({name:"OfferCreate",params:{ProductType:this.selected.Id,operation:2}});

    },
    deleteOfferDetail() {
this.offer.Items.splice(this.offer.Items.indexOf(this.selected),1);

    },
    closeModal() {
      this.displayModal = false;
    },
    changeOfferDetail(offerDetail){
      this.offer.Items.push(offerDetail);
    },

    openModalUpdate() {
      this.displayModal = true;
    },
    handleClick() {
      if (this.operation === "1") {
          OfferService.addOffer()
          .then(request => {
            this.offer = request.data.Payload;
          });

        this.$router.push({ name: "OfferCreate" });
        this.offer.push(OfferService.offerList);
        console.log(this.offer.Items);

      } else {
         OfferService.update()
           .then(request => {
             this.selected.Id = request.data.selected.Id;
           });

        this.$router.push({ name: "OfferUpdate" });
      }
    },
    closeOfferDialog() {
      this.showOfferDialog = false;
    },

    onDataTableRightClick(event) {
      this.$refs.menu.show(event);
    }

  },
  mounted() {
    if (this.operation === 1)
      return;

    if (!this.offerId) {
      this.$router.push({ name: "OfferList" });
      return;
    }
    OfferService.getOffer(this.offerId)
      .then((data) => this.offer = data);
  }
};
</script>
<style>
.CreateButton, .SubmitButton {
  position: relative;
  float: right;

}
</style>