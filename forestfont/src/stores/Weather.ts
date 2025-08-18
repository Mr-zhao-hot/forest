import { defineStore } from 'pinia'
import { ref } from 'vue'
import { weatherApi } from '@/api/WeatherApi.ts'

export const Weather = defineStore('Weather', () => {
  interface city {
    city: string
    province: string
    // 时间
    reporttime: string
    // 温度
    temperature: number | undefined
    // 天气
    weather: string
    // 湿度
    humidity: number | undefined
  }

  const cityTable = ref<city>({
    city: '',
    province: '',
    reporttime: '',
    temperature: undefined,
    weather: '',
    humidity: undefined,
  })
  // cityTable.value.city = res.data?.lives.city
  // cityTable.value.temperature = res.data?.lives.temperature
  // cityTable.value.humidity = res.data?.lives.humidity
  // cityTable.value.temperature = res.data?.lives.temperature
  // cityTable.value.weather = res.data?.weather
  // cityTable.value.province = res.data?.province
  const weather = (cityCode: number, apiKey: string) => {
    weatherApi(cityCode, apiKey)
      .then((res) => {
        cityTable.value.city = res.data?.lives[0].city
        cityTable.value.temperature = res.data?.lives[0].temperature
        cityTable.value.humidity = res.data?.lives[0].humidity
        cityTable.value.reporttime = res.data?.lives[0].reporttime
        cityTable.value.weather = res.data?.lives[0].weather
        cityTable.value.province = res.data?.lives[0].province
      })

      .catch((error) => {
        console.error(error)
      })
  }

  return {
    weather,
    cityTable,
  }
})
