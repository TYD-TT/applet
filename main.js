import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import LbPicker from '@/components/lb-picker'
import GetFormatDate from './util/data.js'
import uniSteps from '@/components/uni-steps/uni-steps.vue'

Vue.component("lb-picker", LbPicker)
Vue.component("uni-steps",uniSteps)

Vue.prototype.$http = myRequest
Vue.prototype.$getFormatDate = GetFormatDate


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
