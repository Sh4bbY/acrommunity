<template>
  <div id="map" :style="style"/>
</template>

<script lang="ts">
import L, {Map, Marker, TileLayer} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {debounceTime, fromEvent} from 'rxjs';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';


@Component
export default class LeafletMap extends Vue {
  @Prop({type: Array, default: () => [51.5, 0]}) position: any;
  @Prop({type: String, default: '300px'}) height: string;
  @Prop({type: Number, default: 15}) zoom: number;
  @Prop({type: Boolean, default: false}) loadCurrentPos: boolean;
  @Prop({type: String, default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}) url: string;
  // 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

  map: Map = null;
  marker: Marker = null;
  tileLayer: TileLayer = null;

  async mounted() {
    this.fixLeafletIcons();
    this.map = L.map('map');
    this.map.setView(this.position, this.zoom);

    this.marker = L.marker(this.map.getCenter());
    this.marker.addTo(this.map);

    this.map.on('move', () => this.marker.setLatLng(this.map.getCenter()));
    const moves = fromEvent(this.map, 'move');
    const result = moves.pipe(debounceTime(500));
    result.subscribe(() => this.$emit('move', this.marker.getLatLng()));

    this.tileLayer = L.tileLayer(this.url);
    this.tileLayer.addTo(this.map);

    if (this.loadCurrentPos) {
      await this.getCurrentLocation();
    }
  }

  async getCurrentLocation() {
    const pos: any = await new Promise(resolve => navigator.geolocation.getCurrentPosition(resolve));
    const position = [pos.coords.latitude, pos.coords.longitude] as any;
    this.map.setView(position, this.zoom);
    this.marker.setLatLng(position);
  }

  @Watch('position')
  watchPosition() {
    this.map.setView(this.position, this.zoom);
    this.marker.setLatLng(this.position);
  }

  fixLeafletIcons() {
    // eslint-disable-next-line
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }

  get style() {
    return {height: this.height};
  }
}
</script>

<style lang="scss" scoped>

</style>
