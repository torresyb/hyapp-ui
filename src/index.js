import HyButton from './packages/button';
import HyScroll from './packages/scroll';
import IndexList from './packages/index-list';
import PullDown from './packages/pull-down';
import HyCell from './packages/cell';
import hyConfirm from './packages/confirm';
import ActionSheet from './packages/action-sheet/index';
import HyPopup from './packages/popup/index';
import ConfirmPlugin from './plugins/confirm/index';
import DatePicker from './packages/date-picker/index';
import HyPicker from './packages/picker/index';
import Swiper from './packages/swiper/index';
import HyAddress from './packages/address/index';
import HyScratchCard from './packages/scratch-card';
import HyTextarea from './packages/textarea';
// 插件
const plugins = {
    ConfirmPlugin
};
// UI组件
const components = {
    HyButton,
    HyScroll,
    IndexList,
    PullDown,
    HyCell,
    hyConfirm,
    ActionSheet,
    HyPopup,
    DatePicker,
    HyPicker,
    Swiper,
    HyAddress,
    HyScratchCard,
    HyTextarea
};

const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    install,
    ...components,
    ...plugins
};

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
