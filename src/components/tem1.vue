<template>
  <div class="tem1">
    <h1>{{msg}}</h1>
    <button @click="send">在组件1中修改全局num</button>
    <p>{{number}}</p>
    <p>这是中央事件总线的num：{{nn}}</p>
  </div>
</template>

<script>
import bus from './bus.js'
export default {
  name: 'tem1',
  data () {
    return {
      msg: 'this is a template',
      number:100
    }
  },
  mounted(){
  	this.number=bus.num;
  },
  methods:{
  	send(){
  		console.log(bus.num);
  		bus.num=bus.num+=1;
  		console.log('发送');
  		bus.$emit('add',666);
  	}
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
