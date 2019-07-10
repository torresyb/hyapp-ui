import ConfirmComponent from '../../packages/confirm/index';
import {mergeOptions} from '../../utils/common';

let $vm;

const plugin = {
    install (vue) {
        const Confirm = vue.extend(ConfirmComponent);

        if (!$vm) {
            $vm = new Confirm({
                el: document.createElement('div'),
                propsData: {
                    title: ''
                }
            });
            document.body.appendChild($vm.$el);
        }

        const confirm = {
            show (options) {
                if (typeof options === 'object') {
                    mergeOptions($vm, options);
                }
                if (typeof options === 'object' && (options.onShow || options.onHide)) {
                    options.onShow && options.onShow();
                }
                this.$watcher && this.$watcher();
                this.$watcher = $vm.$watch('showValue', (val) => {
                    if (!val && options && options.onHide) {
                        options.onHide();
                    }
                });

                $vm.$off('on-cancel');
                $vm.$off('on-confirm');
                $vm.$off('on-close');

                $vm.$on('on-cancel', () => {
                    options && options.onCancel && options.onCancel();
                });
                $vm.$on('on-close', () => {
                    options && options.onClose && options.onClose();
                });
                $vm.$on('on-confirm', msg => {
                    options && options.onConfirm && options.onConfirm(msg);
                });
                $vm.showValue = true;
            },
            hide () {
                $vm.showValue = false;
            },
            isVisible () {
                return $vm.showValue;
            }
        };
        // plugin in this.$hyapp
        if (!vue.$hyapp) {
            vue.$hyapp = {
                confirm
            };
        } else {
            vue.$hyapp.confirm = confirm;
        }

        vue.mixin({
            created: function () {
                this.$hyapp = vue.$hyapp;
            }
        });
    }
};

export default plugin;
export const install = plugin.install;
