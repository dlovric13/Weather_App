<template>
  <WeatherComparison />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import WeatherComparison from '../components/WeatherComparison.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    WeatherComparison,
  },
});
</script>
