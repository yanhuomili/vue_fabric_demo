import _ from 'lodash';

const LAYER_TYPE_IMAGE = 'image'
const LAYER_TYPE_TEXT = 'text'
//自定对象的行为操作属性位置
const _initControlAction = (canvas) => {
	fabric.Canvas.prototype.customiseControls({
		// tl: {
		//     action: 'moveDown',
		//     cursor: 'pointer'
		// },
		tr: {
			action: 'rotate',
			cursor: 'pointer'
		},
		//		bl: {
		//			action: 'remove',
		//			cursor: 'pointer'
		//		},
		bl: {
			action: (e, target) => {
				target.set({ //解决删除了图片仍然留在画布中的问题
					top: -999,
					left: 0,
					width: 0,
					height: 0
				})
				canvas.remove(target)
				canvas.renderAll()
			},
			cursor: 'pointer',
		},
		br: {
			action: 'scale',
			cursor: 'pointer'
		}
	})
}
//自定义对象的按钮
const _initControlIcon = (canvas) => {
	fabric.Object.prototype.customiseCornerIcons({
		settings: {
			borderColor: '#c4c4c4',
			cornerSize: 22,
			cornerShape: 'rect',
			cornerBackgroundColor: 'transparent',
		},
		// tl: {
		//     icon: 'static/diy/icon_mover.png'
		// },
		tr: {
			icon: 'static/img/icon_rotar.png'
		},
		bl: {
			icon: 'static/img/icon_close.png'
		},
		br: {
			icon: 'static/img/icon_escala.png'
		}
	}, function() {
		canvas.renderAll();
	})

}
let options = {
	mb: false,
	ml: false,
	mt: false,
	mr: false,
	bl: true,
	br: true,
	tr: true,
	tl: false,
	mtr: false
}
fabric.Object.prototype.setControlsVisibility(options); //设置对象的外部样式
function MyCanvas(id, props = {}, typeKey = 'shirt') {
	this.defaultOption = {
		width: 200,
		height: 200,
		left: 0,
		top: 0,
		backgroundColor: 'red',
		crossOrigin: 'Anonymous',
		selection: false
	};
	console.log(typeKey, 'typekey')
	console.log(props, 'props')
	this.defaultOption = Object.assign(this.defaultOption, props)
	this.id = options.id || 'canvas';
	this._canvas = null;
	this._typeKey = typeKey;
	this._editarea_left = 100;
	this._editarea_top = 100;
	this._editarea_width = 100;
	this._editarea_height = 100;
	this._img_width = 80;
	this._img_height = 80;
	this._img_left = 0;
	this._img_top = 0;
	this._text_left = 0;
	this._text_right = 0;
	this.editareaBorderColor = 'pink';
	this.clipname = null;
	this.selectedTarget = {};
	this.imageSelectedTarget = {};
	this.textSelectedTarget = {};
	this.initCanvas();
	return this;
}
//实例化画布
MyCanvas.prototype.initCanvas = function() {
	const canvas = this._canvas = new fabric.Canvas(this.id, this.defaultOption);
	if(this._typeKey == 'shirt') { //根据不同的类型创建不同的编辑区
		//		this.addEditArea({
		//			top: 0,
		//			left: 50,
		//			areaPosition: 'zuoxiu'
		//		})
		//		this.addEditArea({
		//			top: 0,
		//			left: 200,
		//			areaPosition: 'youxiu'
		//
		//		})
		//		this.addEditArea({
		//			top: 150,
		//			left: 100,
		//			areaPosition: 'zhongjian'
		//		})
	}
	_initControlIcon(canvas);
	_initControlAction(canvas);
	this.eventListen();
	canvas.renderAll();
}
//添加可视区
MyCanvas.prototype.addEditArea = function(props = {}) {
	let defaultOption = {
		left: this._editarea_left,
		top: this._editarea_top,
		width: this._editarea_width,
		height: this._editarea_height,
		fixed: true,
		hasBorders: false,
		hasControls: false,
		lockMovementX: true,
		lockMovementY: true,
		fill: 'transparent',
		stroke: this.editareaBorderColor,
		layerType: 'editarea'
	}
	defaultOption = Object.assign(defaultOption, props)
	let area = new fabric.Rect(defaultOption);
	this._canvas.add(area);
	//	this._canvas.setActiveObject(area);
	this._canvas.renderAll();
}
MyCanvas.prototype.eventListen = function() {
	let _this = this;
	this._canvas.on("object:selected", function(obj) {
		var rect = _this._canvas.getObjects()
		rect.forEach((item) => {
			if(item.layerType == 'editarea') {
				item.set({
					strokeWidth: 1,
					stroke: _this.editareaBorderColor
				});
			}
			if(item.layerType == 'rectObject') {
				item.set({
					strokeWidth: 1,
					stroke: _this.editareaBorderColor
				});
			}

		})
		if(obj.target.layerType == 'editarea') { //选中的可视区边框设置为绿色
			obj.target.set({
				strokeWidth: 1,
				stroke: 'green'
			});
		} else {}
		if(obj.target.layerType == 'rectObject') { //选中的可视区边框设置为绿色
			obj.target.set({
				strokeWidth: 1,
				stroke: 'green'
			});
		} else {}
		console.log(obj, '選中')
	});
	//			selection:cleared
	this._canvas.on("selection:cleared", function(obj) {
		console.log(_this._canvas.getActiveObject())
		var rect = _this._canvas.getObjects();
		rect.forEach((item) => {
			if(item.layerType == 'editarea') {
				item.set({
					strokeWidth: 1,
					stroke: _this.editareaBorderColor
				});
			}
			if(item.layerType == 'rectObject') {
				item.set({
					strokeWidth: 1,
					stroke: _this.editareaBorderColor
				});
			}
		})
		console.log(obj, '不再選中')
	});
	this._canvas.on("object:moving", function(ev) {
		//		console.log(ev.target);
		//		let activeO = ev.target;
		//		console.log(activeO.scaleY, 'moving')
		//		var top = activeO.top;
		//		var bottom = top + activeO.height * activeO.scaleY;
		//		var left = activeO.left;
		//		var right = left + activeO.width * activeO.scaleX;
		//	
		//		var topBound = activeO.parentOptions.top;
		//		var bottomBound = topBound + activeO.parentOptions.height;
		//		var leftBound = activeO.parentOptions.left;
		//		var rightBound = leftBound + activeO.parentOptions.width;
		//	
		//		// capping logic here
		//		activeO.setLeft(Math.min(Math.max(left, leftBound), rightBound - activeO.width * activeO.scaleX));
		//		activeO.setTop(Math.min(Math.max(top, topBound), bottomBound - activeO.height * activeO.scaleY));
	});
}

//添加图片传递对象是img标签
MyCanvas.prototype.addPic = function(img, props = {}) {
	let activeO = this._canvas.getActiveObject();
	if(!activeO || activeO.layerType != 'editarea') {
		return;
	};
	let x = (activeO.width - 1) / 2
	let y = (activeO.height - 1) / 2
	console.log(activeO.width, 'activeO——width')
	var imgInstance = new fabric.Image(img, {
		left: activeO.left + x - (this._img_width / 2),
		top: activeO.top + y - (this._img_height / 2),
		width: this._img_width,
		height: this._img_height,
		angle: 0,
		opacity: 0.85,
		crossOrigin: 'Anonymous' //解决图片跨域问题
	});
	this._canvas.add(imgInstance);
	activeO.set({
		strokeWidth: 1,
		stroke: 'red',
	});
	this._canvas.discardActiveObject(activeO);
	this._canvas.setActiveObject(imgInstance);
	this._canvas.renderAll();

}

//添加图片，传递过来的时候图片url
MyCanvas.prototype.addImg = function(url, props = {}) {
	if(!url) return;
	let activeO = this._canvas.getActiveObject();
	if(!activeO || activeO.layerType != 'editarea') {
		return;
	};
	let _this = this;
	let x = (activeO.width - 1) / 2
	let y = (activeO.height - 1) / 2
	let imgProps = {
		width: this._img_width,
		height: this._img_height,
		left: activeO.left + x - (this._img_width / 2),
		top: activeO.top + y - (this._img_height / 2),
		borderColor: '#c4c4c4',
		borderOpacityWhenMoving: .4,
		crossOrigin: '*', //解决图片跨域问题
		hasBorders: true,
		rotatingPointOffset: 20,
		layerType: 'img',
		parentOptions: {
			top: activeO.top,
			left: activeO.left,
			width: activeO.width,
			height: activeO.height
		}
	}
	imgProps = Object.assign(imgProps, props);
	/*
	 * 添加图片的时候先使用h5标签创建img图片并设置"crossOrigin",'anonymous属性，
	 * 这一步是为了解决图片跨域问题，否则将canvas转成base64图片的时候会报错
	 */
	let img = new Image();
	img.src = url;
	img.setAttribute("crossOrigin", 'anonymous');
	img.onload = function() {
		var imgInstance = new fabric.Image(img, imgProps)
		_this._canvas.add(imgInstance);
		activeO.set({
			strokeWidth: 1,
			stroke: 'red',
		});
		this._canvas.discardActiveObject(activeO);
		_this._canvas.setActiveObject(imgInstance);
		_this._canvas.renderAll();
	}
}
//添加文字
MyCanvas.prototype.addMyText = function(fontText, textOptions = {}) {
	const _this = this;
	let material_width = 60;
	let material_height = 60;
	console.log(this._canvas.getActiveObject(), 'activeObject')
	let editArea = this._canvas.getActiveObject();
	if(!(editArea && editArea.layerType == 'rectObject')) {
		console.log('请选择编辑区')
		return;
	}
	let e_left = editArea.left;
	let e_top = editArea.top;
	let e_width = editArea.width;
	let e_height = editArea.height;

	let computed_top = e_top+30;
	let computed_left = e_left+30;
	const text = new fabric.Text(fontText)
	let option = {
		index: null,
		left: computed_left,
		top: computed_top,
		maxLeft: 0,
		maxTop: 0,
		fontSize:18,
		backgroundColor: "transparent",
		textBackgroundColor: "transparent",
		textAlign: "center",
		fill: "black",
		padding: 8,
		lockUniScaling: !0,
		lockScalingFlip: !0,
		layerType: LAYER_TYPE_TEXT,
		area: '',
		angle: 0,
		hasBorders: true,
		rotatingPointOffset: 20,
		//  clipPath: _this._rect
		clipName: _this.clipname,
		clipTo: function(ctx) {
			return _.bind(_this.clipByName, text)(ctx, _this)
		}
	}
	fabric.util.object.extend(option, textOptions)
	// this.TextClipPathRendar()
	text.setOptions(option)

	this.setControlsVisibility(text)

	this._canvas.add(text)
	this._canvas.setActiveObject(text)
	this.initTextSelectedTarget(text)

	// this.subscribeObjectSelectedEvent()
	return text
}
MyCanvas.prototype.addText = function(text, props = {}) {
	if(!text) return;
	let defaultProps = {
		left: this._text_left,
		top: this._text_right,
		fontSize: 26,
		maxLeft: 0,
		maxTop: 0,
		backgroundColor: "transparent",
		textBackgroundColor: "transparent",
		fill: "black",
		padding: 8,
		lockUniScaling: !0,
		lockScalingFlip: !0,
		layerType: 'text',
		angle: 0,
		hasBorders: true,
		rotatingPointOffset: 20,
		textAlign: 'center',
	}
	defaultProps = Object.assign(defaultProps, props);
	var text = new fabric.Text('hello world', defaultProps);
	this._canvas.add(text);
	this._canvas.renderAll();
}
//设置背景图片
MyCanvas.prototype.setBgcImg = function(bgcImg, props) { //設置背景圖
	let defaultOption = {
		left: 0,
		top: 0,
		width: 300,
		height: 300,
		opacity: 1,
		crossOrigin: 'Anonymous'
	}
	defaultOption = Object.assign(defaultOption, props);
	var bgInstance = new fabric.Image(bgcImg, defaultOption)
	this._canvas.setBackgroundImage(bgInstance, this._canvas.renderAll.bind(this._canvas));
	//	this._canvas.setBackgroundColor('red', this._canvas.renderAll.bind(this._canvas));
}
//获取编辑区的图片
MyCanvas.prototype.getEditareaImg = function() {
	let arr = this._canvas.getObjects();
	let urlArr = [];
	let canvas = this._canvas;
	console.log(arr, 'arr')
	for(var i = 0; i < arr.length; i++) {
		let item = arr[i];
		if(item.layerType == 'rectObject') {
			let option = {
				format: "png",
				quality: 1,
				left: item.left,
				top: item.top,
				width: item.width,
				height: item.height,
				multiplier: 1, // 1200x1200
				crossOrigin: 'Anonymous' //解决图片跨域问题
			}
			let url = this._canvas.toDataURL(option);
			urlArr.push({
				url,
				position: item.areaPosition
			});
		}
	}
	console.log(urlArr, 'urlArr')
	return urlArr;
}
//获取合成图
MyCanvas.prototype.getMergeImg = function(url, props = {}) {
	this._hiddenEditarea(); //吧编辑区边框设置透明
	let _this = this;
	let bgcOption = {
		width: props.width || 200,
		height: props.height || 200,
		left: props.left || 0,
		top: props.top || 0,
		selectable: false,
	}
	let mergeImgOption = {
		format: "png",
		quality: 1,
		left: _this.defaultOption.left,
		top: _this.defaultOption.top,
		width: _this.defaultOption.width,
		height: _this.defaultOption.height,
		multiplier: 1 // 1200x1200
	}
	mergeImgOption = Object.assign(mergeImgOption, props);
	return new Promise((resolve) => {
		let img = new Image();
		img.src = url;
		img.setAttribute("crossOrigin", 'anonymous'); //解决图片跨域问题
		img.onload = function() {
			let imgInstance = new fabric.Image(img, bgcOption)
			_this._canvas.setBackgroundImage(imgInstance, _this._canvas.renderAll.bind(_this._canvas));
			let mergeImgUrl = _this._canvas.toDataURL(mergeImgOption);
			console.log(mergeImgUrl, 'merge finished')
			_this._showEditarea(); //重新显示编辑区的边框
			//			_this._canvas.setBackgroundImage(null, _this._canvas.renderAll.bind(_this._canvas));
			_this._canvas.renderAll();
			resolve({
				mergeImgUrl,
				side: 1
			});
		}
	})

}
//隐藏编辑区，内部方法，获取合成图的时候使用
MyCanvas.prototype._hiddenEditarea = function() {
	this._canvas.forEachObject((item) => {
		if(item.layerType == 'editarea') {
			console.log(item.stroke, 'stroke')
			item.set({
				stroke: 'transparent'
			})
		}
	})
}
//显示编辑区，内部方法，获取合成图片的时候使用
MyCanvas.prototype._showEditarea = function() {
	this._canvas.forEachObject((item) => {
		if(item.layerType == 'editarea') {
			console.log(item.stroke, 'stroke')
			item.set({
				stroke: this.editareaBorderColor
			})
		}
	})
}

MyCanvas.prototype.addMaterial = function(url, options = {}) {
	return new Promise((resolve) => {
		const _this = this;
		let material_width = 60;
		let material_height = 60;
		console.log(this._canvas.getActiveObject(), 'activeObject')
		let editArea = this._canvas.getActiveObject();
		if(!(editArea && editArea.layerType == 'rectObject')) {
			console.log('请选择编辑区')
			return;
		}
		let e_left = editArea.left;
		let e_top = editArea.top;
		let e_width = editArea.width;
		let e_height = editArea.height;

		let computed_top = e_top + (e_height / 2) - (material_height / 2);
		let computed_left = e_left + (e_width / 2) - (material_width / 2);
		let imageOpt = {
			borderColor: '#c4c4c4',
			borderOpacityWhenMoving: .4,
			id: 1,
			crossOrigin: 'Anonymous'
		}
		fabric.util.object.extend(imageOpt, options)
		// this.ImageClipPathRender()
		fabric.Image.fromURL(url, function(img) {
			img.set({
				ATTRIBUTE_NAMES: 'material',
				CSS_CANVAS: 'material-canvas',
				hasBorders: true,
				rotatingPointOffset: 20,
				top: computed_top,
				left: computed_left,
				width: material_width,
				height: material_height,
				layerType: LAYER_TYPE_IMAGE,
				clipName: _this.clipname,
				clipTo: function(ctx) {
					return _.bind(_this.clipByName, img)(ctx, _this)
				}
			})
			_this.setControlsVisibility(img)
			_this._canvas.add(img)
			_this._canvas.setActiveObject(img)
			_this.initImageSelectedTarget(img)
			_this._canvas.renderAll()
			resolve(img)
		}, imageOpt)
	})
}

MyCanvas.prototype.clipByName = function(ctx, _this) {
	this.setCoords();
	console.log(this.setCoords(), '999999')
	var clipObj = _this.findByClipName(this.clipName, _this);
	if(clipObj) {
		var scaleXTo1 = (1 / this.scaleX);
		var scaleYTo1 = (1 / this.scaleY);
		ctx.save();
		var ctxLeft = -(this.width / 2) + clipObj.strokeWidth;
		var ctxTop = -(this.height / 2) + clipObj.strokeWidth;
		var ctxWidth = clipObj.width - clipObj.strokeWidth;
		var ctxHeight = clipObj.height - clipObj.strokeWidth;

		ctx.translate(ctxLeft, ctxTop);
		ctx.scale(scaleXTo1, scaleYTo1);
		ctx.rotate(_this.degToRad(this.angle * -1));

		ctx.beginPath();
		let X = clipObj.left - this.oCoords.tl.x;
		let Y = clipObj.top - this.oCoords.tl.y;
		ctx.rect(
			X,
			Y,
			clipObj.width,
			clipObj.height
		);
		//  let elementToDraw = this._element;
		// let x = -this.width / 2;
		// let y = -this.height / 2;
		// ctx.drawImage(elementToDraw, 0, 0, this.width, this.height, X, Y, this.width, this.height);
		ctx.closePath();
		ctx.restore();
	}

}
MyCanvas.prototype.findByClipName = function(name, _this) {
	return _(_this._canvas.getObjects()).filter({
		clipFor: name
	}).first()
}
MyCanvas.prototype.degToRad = function(degrees) {
	return degrees * (Math.PI / 180);
}
MyCanvas.prototype.setControlsVisibility = function(fabricObject, controlOpts = {}) {
	let options = {
		mb: false,
		ml: false,
		mt: false,
		mr: false,
		bl: true,
		br: true,
		tr: true,
		tl: false,
		mtr: false
	}
	fabric.util.object.extend(options, controlOpts)
	fabricObject.setControlsVisibility(options)
}
MyCanvas.prototype.initImageSelectedTarget = function(fabricImageObject, url) {
	if(!fabricImageObject) {
		return fabric.warn('fabric image object should not be null!')
	}
	let target = {
		target: fabricImageObject,
		element: fabricImageObject._element,
		url: url
	}
	fabric.util.object.extend(target, fabricImageObject)
	this.imageSelectedTarget = target
}

MyCanvas.prototype.subscribeObjectSelectedEvent = function() {
	const _this = this
	_this._canvas.on('object:selected', function(e) {
		if(e.target && e.target.layerType === 'image') {
			_this.initImageSelectedTarget({
				target: e.target,
				element: e.target._element,
				url: ''
			})
		} else if(e.target && e.target.layerType === 'text') {
			_this.initTextSelectedTarget({
				target: e.target,
				text: e.target.text
			})
		}
	})
}
MyCanvas.prototype.initTextSelectedTarget = function(fabricTextObject, fontText) {
	if(!fabricTextObject) {
		return fabric.warn('fabric text object should not be null!')
	}
	let target = {
		target: fabricTextObject,
		text: fontText
	}
	fabric.util.object.extend(target, fabricTextObject)
	this.textSelectedTarget = target
}
MyCanvas.prototype.initRectObject = function(rectOptions = {}) {
	const _this = this;
	let option = {
		originX: 'left',
		originY: 'top',
		lockMovementX: true,
		lockMovementY: true,
		fill: '#fff',
		strokeWidth: 1,
		fixed: true,
		backgroundColor: 'transparent',
		borderColor: '#ccc',
		//  selectable: false,
		hasControls: false,
		hasBorders: false,
		layerType: 'rectObject'
	}
	const clipRect = new fabric.Rect().on('selected', function() {
		_this.clipname = rectOptions.clipFor;
		_this._rect = this
		_this._canvas.forEachObject(element => {
			element.set({
				selectable: true
			})
			element.shadow = null;
		});
		this.setShadow('2px 2px 10px rgba(0,0,0,0.2)')
		//	      this.set({
		//	        selectable: false
		//	      })
	});
	fabric.util.object.extend(option, rectOptions)
	clipRect.setOptions(option)

	this._canvas.add(clipRect);
	_this._canvas.renderAll()
	this.subscribeObjectSelectedEvent()
}

MyCanvas.prototype.getEditAreaPic=function(){
	this._canvas.forEachObject((item)=>{
		console.log(item,'for')
		if(item.layerType=='rectObject'){
			console.log(item,'rect')
		}
	})
}









export default MyCanvas;