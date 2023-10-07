<template>
  <v-app style="background-color: #f5f5f5;">
    <v-app-bar :elevation="5" color="blue darken-3">
      <v-toolbar-title>Weather Application</v-toolbar-title>
      <template v-slot:append>
        <v-btn icon="mdi-heart"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-container class="weather-comparison" >
      <v-row justify="center" align="center">
        <v-col cols="auto" v-if="!isButtonClicked">
          <v-btn variant="tonal" @click="getWeatherComparison">Get Weather Comparison</v-btn>
        </v-col>
      </v-row>
      <div v-if="comparisonData && isButtonClicked">
        <v-row>
          <v-col md="12">
            <h2 class="text-center" style="margin-bottom: 2%">5 day forecast from Open Weather</h2>
            <v-row>
              <v-col
                v-for="(day, index) in comparisonData.openWeatherDaily"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card class="mx-auto mb-4 elevation-5" color="white">
                  <v-card-title>
                    Location: {{ comparisonData.locationOpenWeather }}
                    <v-chip class="ml-2" small>{{ formatDate(day.date) }}</v-chip>
                  </v-card-title>
                  <v-card-subtitle>
                    <v-img :src="'https://openweathermap.org/img/wn/' + day.icon + '.png'" alt="weather-icon" class="icon"></v-img>
                    {{ day.description }}
                  </v-card-subtitle>
                  <v-card-text class="py-0 text-h4">
                    Min: {{ day.temperature.min.toFixed(1) }}°C, Max:
                    {{ day.temperature.max.toFixed(1) }}°C
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col md="12">
            <h2 class="text-center" style="margin-bottom: 2%">5 day forecast from AccuWeather</h2>
            <v-row>
              <v-col
                v-for="(day, index) in comparisonData.accuWeatherDaily"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card class="mx-auto mb-4 elevation-5" color="white">
                  <v-card-title>
                    Location: {{ comparisonData.locationAccuWeather }}
                    <v-chip class="ml-2" small>{{ formatDate(day.date) }}</v-chip>
                  </v-card-title>
                  <v-card-subtitle>
                    <v-img :src="'https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/' + (day.icon < 10 ? '0' + day.icon : day.icon) + '-s.png'" alt="weather-icon" class="icon"></v-img>
                    {{ day.description }}
                  </v-card-subtitle>
                  <v-card-text class="py-0 text-h4">
                    Min: {{ day.temperature.min.toFixed(1) }}°C, Max:
                    {{ day.temperature.max.toFixed(1) }}°C
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      comparisonData: null,
      isButtonClicked: false  // New data property to track button click
    }
  },
  methods: {
    async getWeatherComparison() {
      try {
        const response = await axios.get('http://localhost:3000/weather/compare')
        this.comparisonData = response.data
        this.isButtonClicked = true  // Set to true when button is clicked
        console.log(this.comparisonData)
      } catch (error) {
        console.error(error)
      }
    },
    formatDate(date) {
      const dateObj = new Date(date)
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return dateObj.toLocaleDateString(undefined, options)
    }
  }
}
</script>

<style scoped>
.weather-comparison {
  padding: 20px;
  margin-top: 10%;
}

.v-card {
  padding: 20px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.v-card-title {
  margin-bottom: 10px;
}

.v-card-text {
  margin-top: 10px;
  font-size: 1.25rem;
}

.icon {
  width: 50px;
  height: 50px;
}
</style>
