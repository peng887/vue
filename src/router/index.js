import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Community from '@/components/Community'
import Store from '@/components/Store'
import My from '@/components/My'
import TabBar from '@/components/TabBar'
import ScienceDetail from '@/components/ScienceDetail'
import GoodDetail from '@/components/GoodDetail'
import Login from '@/components/Login'
import RegType from '@/components/RegType'
import RegPatient from '@/components/RegPatient'
import RegDoctor from '@/components/RegDoctor'
import InformationList from '@/components/InformationList'
import InformationDetail from '@/components/InformationDetail'
import FamousDoctor from '@/components/FamousDoctor'
import Consultation from '@/components/Consultation'
import CommunityRecommend from '@/components/CommunityRecommend'
import CommunityFocus from '@/components/CommunityFocus'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect: "/Index"
    },
    {
      path: '/Index',
      components:{
        default:Index,
        bar:TabBar
      },
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/Community',
      components:{
        default:Community,
        bar:TabBar
      },
      children:[
        {
          path: '/Community',
          redirect: "/Community/CommunityRecommend"
        },
        {
          path:'/Community/CommunityRecommend',
          component:CommunityRecommend,
          meta:{
            keepAlive: true
          }
        },
        {
          path:'/Community/CommunityFocus',
          component:CommunityFocus,
          meta:{
            keepAlive: true
          }
        }
      ],
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/Store',
      components:{
        default:Store,
        bar:TabBar
      },
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/My',
      components:{
        default:My,
        bar:TabBar
      },
      meta:{
        keepAlive: true
      }
    },
    {
      path:'/ScienceDetail',
      components:{
        default:ScienceDetail
      },
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/GoodDetail',
      components:{
        default:GoodDetail
      },
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/Login',
      components:{
        default:Login
      },
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/RegType',
      components:{
        default:RegType
      },
      meta:{
        keepAlive: true
      }
    },
    {
      path:'/RegPatient',
      components:{
        default:RegPatient
      },
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/RegDoctor',
      components:{
        default:RegDoctor
      },
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/InformationList',
      components:{
        default:InformationList
      },
      meta:{
        keepAlive: true
      }
    },
    {
      path:'/InformationDetail',
      components:{
        default:InformationDetail
      },
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/FamousDoctor',
      components:{
        default:FamousDoctor
      },
      meta:{
        keepAlive: true
      }
    },
    {
      path:'/Consultation',
      components:{
        default:Consultation
      },
      meta:{
        keepAlive: true
      }
    }
  ]
})
