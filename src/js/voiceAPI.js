import AMapLoader from '@amap/amap-jsapi-loader'


function WgsToGcj(lnt,lat){
    AMapLoader.load({
        key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:['AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
        var list =[lnt,lat]
        AMap.convertFrom(list, 'gps', function (status, result) {
            if (result.info === 'ok') {
              var lnglats = result.locations; // Array.<LngLat>

                return [lnglats[0].KL,lnglats[0].kT]
            } else {
              console.log('erro')

            }
        })
    })
}

export{WgsToGcj}