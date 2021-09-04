<template>
  <div>
    <Chart :data="chartData" :options="chartOptions" type="polarArea" />
  </div>
</template>

<script>
import Chart from "primevue/chart";


export default {
  components: {
    Chart

  },
  data() {
    return {
      chartData: {
        datasets: [{
          data: [12, 7, 5],
          backgroundColor: ["#66BB6A", "#d9cf1c", "#d22c2c"],
          label: "My dataset"
        }],
        labels: ["Kabul edilen", "Bekleyen", "Red Edilen"]
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057"
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: "#ebedef"
            }
          }
        }
      }
    };
  }
};
</script>


<style scoped>

</style>