<template>
  <div id="map" :style="style"/>
</template>

<script lang="ts">
import L, {Map, Marker, TileLayer} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';


@Component({
  // components: {LMap, LTileLayer, LMarker},
})
export default class LeafletMap extends Vue {
  @Prop({type: String, default: '300px'}) height: string;
  @Prop({type: Number, default: 15}) zoom: number;
  @Prop({type: String, default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}) url: string;
  // 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

  @Prop({type: Array, default: () => [51.5, 0]}) position: any;

  map: Map = null;
  marker: Marker = null;
  tileLayer: TileLayer = null;

  mounted() {
    this.fixLeafletIcons();
    this.map = L.map('map');
    this.map.setView(this.position, this.zoom);

    this.marker = L.marker(this.position);
    this.marker.addTo(this.map);

    this.tileLayer = L.tileLayer(this.url);
    this.tileLayer.addTo(this.map);

    this.map.on('click', this.onMapClick);
  }

  fixLeafletIcons() {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }

  @Watch('position')
  watchPosition() {
    this.map.setView(this.position, this.zoom);
    this.marker.setLatLng(this.position);
  }

  async onMapClick(event) {
    console.log('map click', event);
    const response = await this.$api.get('/api/geolocation/reverse', {params: {lat: event.latlng.lat, lng: event.latlng.lng}});
    console.log(response.data);

    L.popup().setLatLng(event.latlng)
        .setContent('You clicked the map at ' + event.latlng.toString())
        .openOn(this.map);

    this.$emit('click', {event, address: response.data.address});
  }

  get style() {
    return {height: this.height};
  }
}
</script>

<style lang="scss" scoped>

</style>
