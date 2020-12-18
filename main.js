import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import LbPicker from '@/components/lb-picker'
import GetFormatDate from './util/data.js'
import uniSteps from '@/components/uni-steps/uni-steps.vue'
import miLoading from '@/components/mi-loading/mi-loading.vue';
import bottomMenu from '@/components/bottom-menu/bottom-menu.vue'
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';

Vue.component("bottom-menu",bottomMenu)
Vue.component("mi-loading",miLoading)
Vue.component("lb-picker", LbPicker)
Vue.component("uni-steps",uniSteps)
Vue.component("t-table",tTable)
Vue.component("t-th", tTh)
Vue.component("t-tr",tTr)
Vue.component("t-td",tTd)

Vue.prototype.$http = myRequest
Vue.prototype.$getFormatDate = GetFormatDate


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
