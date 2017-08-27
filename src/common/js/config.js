import axios from 'axios'
import {
   parent,
   musicurl
} from '../../api/config'
export default {
   getbanner() {
      return axios.get('/api' + musicurl.bannerurl, {
         params: parent
      })
   }
}
