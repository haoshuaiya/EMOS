import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },{
      path:'/main',
      component:resolve =>require(['../components/Index.vue'],resolve)
    },
    {
      path:'/main/detail/:id',
      component:resolve =>require(['../components/detail/Index.vue'],resolve),
      children:[
        {
          path:'environment',
          component:resolve=>require(['../components/detail/environment/Index.vue'],resolve),
          name:'environment'
        },{
          path:'process',
          component:resolve =>require(['../components/detail/process/Index.vue'],resolve),
          name:'process'
        },{
          path:'index',
          component:resolve => require(['../components/detail/list/Index.vue'],resolve),
          name:'index',
          children:[
            {
              path:'',
              component:resolve => require(['../components/detail/list/Map.vue'],resolve),
              name:'index'
            },{
              path:'cpu',
              component:resolve => require(['../components/detail/list/CPU.vue'],resolve),
              name:'cpu'
            },{
              path:'logic',
              component:resolve => require(['../components/detail/list/LogicProcess.vue'],resolve),
              name:'logic'
            },{
              path:'load',
              component:resolve=>require(['../components/detail/list/SystemLoad.vue'],resolve),
              name:'load'
            },{
              path:'storage',
              component:resolve => require(['../components/detail/list/Storage.vue'],resolve),
              name:'storage'
            },{
              path:'connection',
              component:resolve => require(['../components/detail/list/Connections.vue'],resolve),
              name:'connection'
            },{
              path:'disk/:model',
              component:resolve => require(['../components/detail/list/Disk.vue'],resolve),
              name:'disk'
            },{
              path:'netcard/:model',
              component:resolve => require(['../components/detail/list/NetCard.vue'],resolve),
              name:'netcard'
            },
          ]
        }
      ]
    },{
      path:'/login',
      component:resolve =>require(['../components/Login.vue'],resolve)
    }
  ]
})
