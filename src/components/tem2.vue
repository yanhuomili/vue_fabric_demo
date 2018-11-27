<template>
  <div class="tem2">
    <h1>{{ msg }}</h1>
    <p>{{number}}</p>
    <button @click="change">在组件2中修改全局num</button>
    <p>这是中央事件总线的num:{{nn}}</p>
  </div>
</template>

<script>
import bus from './bus.js'
export default {
  name: 'tem2',
  data () {
    return {
      msg: 'this is b template',
      number:1
    }
  },
  methods:{
  	change(){
  		bus.num-=100;
  	}
  },
  mounted(){
  	this.number=bus.num;
  	
  	bus.$on('add',(data)=>{
  		console.log('接收到');
  		console.log(data);
  	})
  },
  computed:{
  	nn:function(){
  		return bus.num;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
