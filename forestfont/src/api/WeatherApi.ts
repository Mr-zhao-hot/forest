import CommonInstance from '@/utils/CommonInstance.ts'

// 访问高德天气api
export function weatherApi(cityCode:number,GDapi:string) {
  return CommonInstance({
    url:"https://restapi.amap.com/v3/weather/weatherInfo",
    method:"get",
    params:{
      city:cityCode,
      key:GDapi
    }
  })
}

// 获取城市code
export function TennconGetCityInfo(key:string):void {
  return CommonInstance({
    url:""
  })
}


