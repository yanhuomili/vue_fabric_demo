<template>
  <div class="hello">
    <h4>{{msg}}</h4>
    <p @click="getImg">获取图片</p>
    <p @click="handleSeletedMaterial">添加素材</p>
    <p @click="getSomePic">获取编辑区图片集合</p>
    
    <canvas id="canvas" width="200" height="200"></canvas>
    
    <div class="source">
			<h2>图片素材</h2>
			<ul class="pic">
				<li><img @click="addPic" src="../../static/img/1.png" /></li>
				<li><img @click="addPic" src="../../static/img/2.png" /></li>
				<li><img @click="addPic" src="../../static/img/3.png" /></li>
				<li><img @click="addPic" src="../../static/img/4.png" /></li>
				<li><img @click="addPic" src="../../static/img/5.png" /></li>
				<li><img @click="addPic" src="../../static/img/6.png" /></li>
				<li><img @click="addPic" src="../../static/img/7.png" /></li>
			</ul>
			<h2>顏色選擇</h2>
			<ul class="color">
				<li style="background: red;"></li>
				<li style="background: yellow;"></li>
				<li style="background: blue;"></li>
				<li style="background: blueviolet;"></li>
				<li style="background: pink;"></li>
				<li style="background: green;"></li>
				<li style="background: purple;"></li>

			</ul>
		</div>
    <canvas style="border: 1px dashed #ccc;" id="c" width="200" height="200"></canvas>
    <img id="pic" src="../../static/img/6.png"/>
    <img style="width: 300px;height: 300px;" id="bgc" class="bg" src="../../static/img/t.jpg" />
  </div>
</template>

<script>
import Diy from './myFabric'

export default {
  name: 'fabric',
  components:{
  },
  data () {
    return {
      msg: 'fabric 封装测试',
      n:'33',
      diy:null,
      pic:null,
      bgcImg:null,
      tUrl:'',
    }
  },
  mounted(){
  	this.pic=document.getElementById('pic');
  	this.bgcImg=document.getElementById('bgc');
  	
  	this.diy=new Diy('canvas',{
  		width:301,
  		height:301,
  		backgroundColor:'transparent'
  	})
  	let positiveOptions = {
        left: 10,
        top: 10,
        width: 80,
        height: 90,
        clipFor: 'pug_1',
        fill: null,
        stroke:'red',
        
      }
  	let positiveOptions1 = {
        left: 100,
        top: 100,
        width: 150,
        height: 150,
        clipFor: 'pug_2',
        fill: null,
        stroke:'blue',
        
      }
      this.diy.initRectObject(positiveOptions)
      this.diy.initRectObject(positiveOptions1)
//	let defaultOption={
//		left: 0,
//		top: 0,
//		width: 300,
//		height: 300,
//		opacity: 1
//	}
//	var bgInstance = new fabric.Image(this.bgcImg, defaultOption)
//	this.diy._canvas.setBackgroundImage(bgInstance);
//	this.diy._canvas.renderAll();
 
  	let url='https://img04.sogoucdn.com/app/a/100520093/ca86e620b9e623ff-e7ae36db714776c0-b0158348187351632005e109f7faff29.jpg'
  	this.tUrl='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1684335778,3729660223&fm=26&gp=0.jpg'
//	diy.addEditArea({
//		top:50,
//		left:100
//	})
//	
//	diy.addEditArea({
//		top:50,
//		left:200
//	})
//	diy.addEditArea({
//		top:200,
//		left:100
//	})
  	
//	this.diy.addImg(url,{
//		width:110,
//		height:100,
//		left:0,
//		top:0
//	});
//let _this=this;
//let img=new Image();
//	img.src=url;
//	img.setAttribute("crossOrigin",'anonymous');
//	img.onload=function(){
//		var imgInstance = new fabric.Image(img,{
//			width:100,
//			height:100,
//			left:100,
//			top:100
//		})
//		_this.diy._canvas.add(imgInstance)
//		return;
//		_this._canvas.add(img);
//		_this._canvas.renderAll();
//	}

//this.diy.addImg(url,{
//		width:100,
//		height:100,
//		left:0,
//		top:0
//	});
//	this.diy.addImg(url,{
//		width:100,
//		height:100,
//		left:100,
//		top:100
//	});
//	this.diy.addPic(this.pic);
//	this.diy.addPic(this.pic);
//	this.diy.addPic(this.pic);
//	this.diy.addText('世界第一');
	
  	
  },
  methods:{
  	 handleSeletedMaterial () {
  	 	let url='https://img04.sogoucdn.com/app/a/100520093/ca86e620b9e623ff-e7ae36db714776c0-b0158348187351632005e109f7faff29.jpg'
      this.diy.addMaterial(url, {
        materialIndex: 1,
        left: 50,
        top: 60
      }).then((res)=>{
      	if(res.msg){
      		console.log(res.msg,'res')
      	}
      })
      this.diy.addMyText('你好世界')
    },
    getSomePic(){
    	let imgUrl=this.diy.getEditareaImg();
     	console.log(imgUrl[0].url,'url')
     	console.log(imgUrl[1].url,'url')
    },
  	addPic(ev){
  			this.diy.addPic(ev.target);
  	},
  	async getImg(){
			let data=await this.diy.getMergeImg(this.tUrl,{
				width:300,
				height:300
			});
			let arr=[...this.diy.getEditareaImg(),data]
  	}
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
		#canvas{
			border: 1px dashed #ccc;
		}
		.source {
				width: 100%;
			}
			
			ul {
				width: 100%;
				height: auto;
				padding: 0;
				margin: 0;
				white-space: nowrap;
				overflow: scroll;
				-webkit-overflow-scrolling: touch;
			}
			/*ul::-webkit-scrollbar{//去掉滚动条样式
	            width: 0;
	            height: 0;
	        }*/
			
			li {
				list-style: none;
				width: 60px;
				height: 60px;
				vertical-align: middle;
				display: inline-block;
				text-align: center;
				border: 1px solid #ccc;
				box-sizing: border-box;
			}
			
			img {
				width: 100%;
				height: 100%;
			}
</style>
