<template>
  <Splitter style="height: 600px">
    <SplitterPanel>    <app-offer-analysis></app-offer-analysis>
    </SplitterPanel>
    <SplitterPanel>
      panel 2

    </SplitterPanel>
  </Splitter>

</template>

<script>
import offerAnalysis from "./offer/offerAnalysis";
export default {
  components:{
    appOfferAnalysis:offerAnalysis
  }

};
</script>

<style scoped>

</style>