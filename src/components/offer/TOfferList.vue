<template>
  <div>
    <div class="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
      <span class="p-input-icon-right">
        <InputText type="text" placeholder="Search" />
           <i class="pi pi-search" />
           </span>
    </div>
    <div class="CreateButton">
      <Button @click="navigateToCreate" label="Teklif Oluştur" icon="pi pi-plus" style="margin-right: 5px"
              class="p-button-sm" />
      <Button @click="navigateToUpdate" label="Teklif Güncelle" icon="pi pi-pencil" style="margin-right: 5px"
              class="p-button-sm" />
      <Button @click="deleteOffer" label="Teklif Sil" icon="pi pi-times" style="margin-right: 5px"
              class="p-button-sm" />

    </div>
    <br><br><br>
    <div>
      <div>

      <DataTable v-model:selection="selected" :paginator="true"
                   :rows="10" :value="offerList" data-keys="id" selection-mode="single"
                   tabindex="-1"
                   @contextmenu="onDataTableOfferRightClick" aria-haspopup="true"
      >

          <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header"></Column>
        <ContextMenu ref="menu" :model="menu" />
        </DataTable>
        <p>Selected: {{ selected }}</p>

      </div>

    </div>

  </div>
</template>

<script>

import OfferService from "../../services/OfferService";


export default {
  components: {},

  data() {
    return {

      offerList: [],

      selected: [],
      columns: [
        { field: "OfferNo", header: "Teklif Numarası" },
        { field: "Header", header: "Teklif Başlığı" },
        { field: "CompanyName", header: "Şirket Adı" },
        { field: "CompanyContactName", header: "Firma İlgilisi" },
        { field: "CreateTime", header: "Teklif Tarihi" },
        { field: "State", header: "Teklif Durumu" },

      ],
      menu: [
        {
          label: "Teklif Oluştur",
          icon: "pi pi-plus",
          command: () => {
            this.navigateToCreate();
          }

        },
        {
          label: "Teklif Güncelle",
          icon: "pi pi-pencil",
          command: () =>{
            this.navigateToUpdate();
          }
        },
        {
          label: "Teklif Sil",
          icon: "pi pi-times"
        },
        {
          separator: true
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
          command: () =>{
            this.deleteOffer();
          }
        }

      ],
    };
  },
  methods: {

    navigateToCreate() {
      this.$router.push({ name: "OfferCreate", params: { offerId: 0, operation: 1 } });
    },
    navigateToUpdate() {
      this.$router.push({ name: "OfferCreate", params: { offerId: this.selected.Id, operation: 2 } });
    },
    deleteOffer() {

     OfferService.deleteOffer(this.selected.Id)
      .then((response)=>{
        if(response.data.Success){
          this.offerList.splice(this.offerList.indexOf(this.selected), 1);
        }
        }
      )

    },
    onDataTableOfferRightClick(event) {
      this.$refs.menu.show(event);
    },
    getOfferList(){
      OfferService.getOfferList()
    .then((response) => {
        if(response.data.Success )
          this.offerList =response.data.Payload;

      console.log(response.data.Payload);
      })
      console.log(this.offerList);

    }

  },

  mounted() {
   this.getOfferList()
  }
};

</script>


<style scoped></style>





