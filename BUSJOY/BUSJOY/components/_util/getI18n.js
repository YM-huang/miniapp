import I18n_zhCN from '../_lang/zh-CN';
import I18n_enUS from '../_lang/en-US';
export default function getI18n() {
  try {
    /* global getApp */

    /* eslint no-undef: "error" */
    var appMiniAliUI = getApp() || null;

    if (appMiniAliUI) {
      var _appMiniAliUI$globalD;

      if (((_appMiniAliUI$globalD = appMiniAliUI.globalData) == null ? void 0 : _appMiniAliUI$globalD.miniAliUiLang) === 'en-US') {
        return I18n_enUS;
      } else {
        return I18n_zhCN;
      }
    } else {
      return I18n_zhCN;
    }
  } catch (error) {
    return I18n_zhCN;
  }
}