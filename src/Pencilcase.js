export default class Pencilcase {
  constructor(element, editButton) {
    this._name = 'Pencilcase';
    this.svg = element;
    this.textEl = null;
    this.pt = this.svg.createSVGPoint();
    this.editButton = editButton;
    this.init();
    this.state = {
    	tool: null,
    	x: null,
    	y: null,
    	text: "",
    }
  }
  get name() {
    return this._name;
  }
  text(){

  }
  init(){
  	const showTools = this.showTools.bind(this)
  	this.editButton.addEventListener("click", function(a){
		showTools()
	})
	var style = document.createElement('style');
	style.type = 'text/css';
	var keyFrames = '\
	.blink {\
	  animation: blink-animation 1s steps(2, start) infinite;\
	  -webkit-animation: blink-animation 1s steps(2, start) infinite;\
	}\
	@keyframes blink-animation {\
	    to {\
	        visibility: hidden;\
	    }\
	}\
	@-webkit-keyframes blink-animation {\
	    to {\
	        visibility: hidden;\
	    }\
	}';
	style.innerHTML = keyFrames
	//.replace(/A_DYNAMIC_VALUE/g, "180deg");
	document.getElementsByTagName('head')[0].appendChild(style);
  }
  toolClick(evt){
  	var pt = this.pt;  // Created once for document
 	pt.x = evt.clientX;
    pt.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    var cursorpt =  pt.matrixTransform(this.svg.getScreenCTM().inverse());
	
	this.state.x = cursorpt.x;
	this.state.y = cursorpt.y;

    console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");

	if(this.state.tool === "text") {
		this.state.text = "";
		this.textEl = null;
		// this.createLine(x1, y1, x2, y2, color, w)
		let textInput = document.getElementById('pcase-textblinker');
		let foreign
	    if(!textInput) {
			foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
	     	foreign.setAttribute('id', 'pcase-textblinker');

	    	const textInput = document.createElement('textarea');

	    	foreign.appendChild(textInput)

	    	foreign.setAttribute('x', cursorpt.x);
	    	foreign.setAttribute('y', cursorpt.y);
	    }

	   	this.svg.appendChild(foreign);


	 //    if(!textInput) {
	 //    	console.log("");
	 //    	textInput.setAttribute('stroke', 'black');
  //   		textInput.setAttribute('stroke-width', 1);

	 //    	textInput.setAttribute("id", "pcase-textblinker");
	 //    }

	 //    textInput.setAttribute('x1', cursorpt.x);
	 //    textInput.setAttribute('y1', cursorpt.y-10);
	 //    textInput.setAttribute('x2', cursorpt.x);
	 //    textInput.setAttribute('y2', cursorpt.y+10);

	    // this.svg.appendChild(textInput);
		// textInput.classList.add('blink')
	}

  }
  toolMouseDown(){
  }
  toolMouseUp(){
  }
  toolKeyPress(evt){
		// this.state.text += evt.key

		// this.textEl = this.textEl || document.createElementNS('http://www.w3.org/2000/svg', 'text');
		// this.textEl.setAttribute('x', this.state.x);
		// this.textEl.setAttribute('y', this.state.y);
		// this.textEl.setAttribute('fill', '#000');
		// this.textEl.textContent = this.state.text;
	 //  	this.svg.appendChild(this.textEl);
  }
  toolKeyDown(evt){
	// console.log(evt.keyCode);
 //  	switch (evt.keyCode) {
	//   case 8:
	// 	this.state.text = this.state.text.slice(0,-1)
	//     break;
	//   case 13: 
	//   	const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
	//   	this.textEl.appendChild(tspan);
	//   	// tspan.setAttribute('dy', "-0.5cm");
	//   	// this.textEl =  tspan;
	//   	// this.state.text = 
	// 	break;
	//   default:
	//     console.log('default');
	// }

	// this.textEl = this.textEl || document.createElementNS('http://www.w3.org/2000/svg', 'text');
	// this.textEl.setAttribute('x', this.state.x);
	// this.textEl.setAttribute('y', this.state.y);
	// this.textEl.setAttribute('fill', '#000');
	// this.textEl.textContent = this.state.text;
 //  	this.svg.appendChild(this.textEl);
  }
  showTools(){

  	const svg = this.svg

  	const toolClick = this.toolClick.bind(this)
  	const toolMouseDown = this.toolMouseDown.bind(this)
  	const toolMouseUp = this.toolMouseUp.bind(this)
  	const toolKeyDown = this.toolKeyDown.bind(this)
  	const toolKeyPress = this.toolKeyPress.bind(this)


  	svg.addEventListener("click", toolClick)
  	svg.addEventListener("mousedown", toolMouseDown)
  	svg.addEventListener("mouseup", toolMouseUp)
  	document.addEventListener("keydown", toolKeyDown)
  	document.addEventListener("keypress", toolKeyPress)

  	document.body.insertAdjacentHTML('afterbegin', '<div style=position:fixed;top:0;left:0;height:100%;width:100%;margin:0;padding:0;background:#d0d0d0 id=pcase-olverlay><div style="border:1px solid;display:flex"><ul id=pcase-tools style="list-style:none;display:flex;border:1px solid;justify-content:space-between;padding:0"><li><button data-tool=text style="border-radius:3px;padding:10px;border:none;margin:5px;box-shadow:1px 1px 5px #343434">Text</button><li><button data-tool=line style="border-radius:3px;padding:10px;border:none;margin:5px;box-shadow:1px 1px 5px #343434">Line</button><li><button data-tool=arrow style="border-radius:3px;padding:10px;border:none;margin:5px;box-shadow:1px 1px 5px #343434">Arrow</button></ul></div><div style=background:#fff id=pcase-svg-container></div><button id=pcase-olverlay-done>Done Editing</button></div>')
 
	const overlay = document.getElementById('pcase-olverlay');
	const svgContainer = document.getElementById('pcase-svg-container')
	// const svgClone = svg.cloneNode(true)
	const placeholderDiv = document.createElement('div');
	const tools = document.getElementById('pcase-tools');
	
	const toolButtons = tools.getElementsByTagName('button');

	const clickTool = this.clickTool.bind(this)

	Array.from(toolButtons).forEach(function(button) {
		button.style = 'background: #ededed; border: 1px solid #ccc; -webkit-box-shadow: 1px 1px 2px #ccc; -moz-box-shadow: 1px 1px 2px #ccc; box-shadow: 1px 1px 2px #ccc; padding: 10px 30px; border-radius: 3px; cursor: pointer;'
   		button.addEventListener("click", (evt) => {
   			evt.target.style = "outline: none; -webkit-box-shadow: inset 0px 0px 4px #ccc; -moz-box-shadow: inset 0px 0px 4px #ccc; box-shadow: inset 0px 0px 4px #ccc;  border: 1px solid #ccc;  padding: 10px 30px; border-radius: 3px;"
   			clickTool(evt.target.dataset.tool, svg)
   		})
	});

	svg.parentNode.insertBefore(placeholderDiv, svg)

	svgContainer.appendChild(
    	svg
  	);

  	document.getElementById('pcase-olverlay-done').addEventListener('click', ()=>{
		
		var insertedNode = placeholderDiv.parentNode.insertBefore(svg, placeholderDiv);

		svg.removeEventListener("click", toolClick, false);
		svg.removeEventListener("mousedown", toolMouseDown, false);
  		svg.removeEventListener("mouseup", toolMouseUp, false);
  		document.removeEventListener("keydown", toolKeyDown, false);
  		document.removeEventListener("keypress", toolKeyPress, false);

  		this.state.tool = null;

		overlay.parentNode.removeChild(overlay);
	})
  }
  initText(){
  		this.state.tool = "text";
  		this.svg.style.cursor = "text"; 
  }
  initLine(){
  	  	this.state.tool = "line";
  		this.svg.style.cursor = "crosshair"; 
  }
  initArrow(){
  	  	this.state.tool = "arrow";
  	  	this.svg.style.cursor = "all-scroll"; 
  }
  clickTool(tool, svg){
	switch (tool) {
	  case 'text':
		this.initText()
	    break
	  case 'line':
	  	this.initLine()
	    break
	  case 'arrow':
		this.initArrow()
	    break
	  default:
	    breaks
	}
  }

}
