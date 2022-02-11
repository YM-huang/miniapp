/* eslint-disable import/no-duplicates */
/**
 * 地图交互组件
 */
import { connect } from 'herculex';
import { goPage } from '../../common/util';
import controls from './controls.json';

Component(connect({
  mapStateToProps: ['stationLocationList', 'includePoints'],
  mapGettersToProps: ['markerList', 'lbs']
})({
  data: {
    controls, // idea中图片无法显示，真机、模拟器正常
    scale: '12'
  },
  didMount() {
    this.mapCtx = my.createMapContext('map');
  },
  props: {},
  methods: {
    regionchange(e) {
      if (e.type === 'end') {
        this.mapCtx.getCenterLocation({
          success: (res) => {
            let longitude = res.longitude;
            let latitude = res.latitude;
            this.dispatch('queryStationList', { longitude, latitude });
          }
        });
        this.setData({
          scale: e.scale
        });
      }
    },
    /**
     * 移动到中心点
     */
    moveTolocation () {
      this.mapCtx.moveToLocation();
    },
    /**
     * 点击标记点
     * @param e
     */
    onMarkertap(e) {
      const { markerId } = e;
      const detail = this.data.stationLocationList[markerId - 1];
      const { shopId } = detail;
      this.commit('$global:updateState', { shopId });
      goPage('../settle-order/index');
    },
    tap(e) {
      console.log('onMapClick', e);
    },
    /**
     * 点击地图控件
     * @param e
     */
    controltap(e) {
      const { controlId } = e;
      if (controlId === 2) {
        // 请求定位，改变中心点坐标
        this.reSetCurrentLocation();
      } else if (controlId === 1) {
        goPage('../personal-center/index');
      }
    },
    /**
     * 请求地理位置
     * @returns {Promise<void>}
     */
    async reSetCurrentLocation() {
      this.setData({
        tempIncludePoinds: this.data.includePoints
      });
      await this.dispatch('getCurrentLocation');
      this.moveTolocation();
    },
    /**
     * 更新中心坐标点
     */
    updateCenterLocation (latitude, longitude) {
      this.moveTolocation();
    }
  }
}));
