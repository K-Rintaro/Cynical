if     ( window.addEventListener ){window.addEventListener('load', cmanOM_JS_init, false);}
else if( window.attachEvent )     {window.attachEvent( 'onload', cmanOM_JS_init );}
var cmanOM_VAR    = {};
var cmanOM_Obj    = [];
var cmanOM_OyaObj = [];
function cmanOM_JS_init(){
	var wTargetTag	= [ 'img', 'div' ];
	var wTagList	= [];
	var wObjAt;

	cmanOM_VAR['moveOn']	= false;


	if ("ontouchstart" in window) {
		cmanOM_VAR['device'] ='mobi';
	}else{
		cmanOM_VAR['device'] ='pc';
	}
	for(var i = 0; i < wTargetTag.length; i++){

		var wHtmlCollection = document.getElementsByTagName(wTargetTag[i]);

		for(var j = 0; j < wHtmlCollection.length; j++){
			wTagList.push( wHtmlCollection[j] );
		}
	}
	for(var i = 0; i < wTagList.length; i++){

		wObjAt = wTagList[i].getAttribute("cmanOMat");

		if((wObjAt === null)||(wObjAt =='')){
		}else{
			if(wObjAt.toLowerCase().match(/move/)){
				cmanOM_Obj.push( wTagList[i] );
			}
		}
	}
	for(var i = 0; i < cmanOM_Obj.length; i++){
		if(cmanOM_Obj[i].style.position.toLowerCase() != 'absolute'){
			var wObjStyle = window.getComputedStyle(cmanOM_Obj[i], null);
			var wOyaDiv = document.createElement("div");
			wOyaDiv.setAttribute("id", "cmanOM_ID_DMY"+i);
			wOyaDiv.style.position		= 'relative';
			wOyaDiv.style.width		= cmanOM_Obj[i].offsetWidth + 'px';	
			wOyaDiv.style.height		= cmanOM_Obj[i].offsetHeight + 'px';
			wOyaDiv.style.marginTop		= wObjStyle.marginTop
			wOyaDiv.style.marginRight	= wObjStyle.marginRight
			wOyaDiv.style.marginBottom	= wObjStyle.marginBottom
			wOyaDiv.style.marginLeft	= wObjStyle.marginLeft
			if(cmanOM_Obj[i].tagName.toLowerCase() == 'img'){
				wOyaDiv.style.display = 'inline-block';
			}
			var wParentDiv = cmanOM_Obj[i].parentNode;
			wParentDiv.insertBefore(wOyaDiv,  cmanOM_Obj[i]);
			var wCopyNode = cmanOM_Obj[i].cloneNode(true); 
			wCopyNode.style.position	= 'absolute';
			wCopyNode.style.top		= 0;
			wCopyNode.style.left		= 0;
			wCopyNode.style.margin		= 0;
			document.getElementById("cmanOM_ID_DMY"+i).appendChild(wCopyNode); 
			cmanOM_Obj[i].parentNode.removeChild(cmanOM_Obj[i]);
			cmanOM_Obj[i] = wCopyNode;
		}
		wObjAt = cmanOM_Obj[i].getAttribute("cmanOMat");

		if(wObjAt.toLowerCase().match(/movearea/)){

			cmanOM_OyaObj[i] = '';
			var wOyaObj = cmanOM_Obj[i];

			for(var j = 0; j < 20; j++){

				wOyaObj = wOyaObj.parentNode;

				if((typeof wOyaObj === 'object')&&(wOyaObj.tagName.toLowerCase() != 'html')){

					wObjAt = wOyaObj.getAttribute("cmanOMat");

					if((wObjAt === null)||(wObjAt =='')){
					}else{
						if(wObjAt.toLowerCase().match(/area/)){
							cmanOM_OyaObj[i] = wOyaObj;
							break;
						}
					}
				}else{
					break;
				}
			}
		}
		if (cmanOM_VAR['device'] == 'mobi') {
			cmanOM_Obj[i].ontouchstart	= cmanOM_JS_mdown;
			cmanOM_Obj[i].ontouchend	= cmanOM_JS_mup;
			cmanOM_Obj[i].ontouchmove	= cmanOM_JS_mmove;
		}else{
			cmanOM_Obj[i].onmousedown	= cmanOM_JS_mdown;
			cmanOM_Obj[i].onmouseup		= cmanOM_JS_mup;
			cmanOM_Obj[i].onmousemove	= cmanOM_JS_mmove;
			cmanOM_Obj[i].onmouseout	= cmanOM_JS_mout;
		}


		cmanOM_Obj[i].style.cursor  = "pointer";
		cmanOM_Obj[i].setAttribute("cmanOMno", i);

	}
}
function cmanOM_JS_mdown(e){

	cmanOM_VAR['moveOn']	= false;
	var wTarget = e.target || e.srcElement;
	var wObjAt = wTarget.getAttribute("cmanOMat");		

	if((wObjAt === null)||(wObjAt =='')){
	}else{
		if(wObjAt.toLowerCase().match(/move/)){
			cmanOM_VAR['moveOn']	= true;
		}
	}

	if(!cmanOM_VAR['moveOn']){return;}
	for(var i = 0; i < cmanOM_Obj.length; i++){
		if(cmanOM_Obj[i].style.zIndex != 1){
			cmanOM_Obj[i].style.zIndex	= 1;
		}
	}
	cmanOM_VAR['objNowImg']	= wTarget;								

	if (cmanOM_VAR['device'] == 'mobi') {
		cmanOM_VAR['sPosX']	= e.touches[0].pageX;							
		cmanOM_VAR['sPosY']	= e.touches[0].pageY;						
	}else{
		cmanOM_VAR['sPosX']	= e.pageX;							
		cmanOM_VAR['sPosY']	= e.pageY;								
	}

	if(cmanOM_VAR['objNowImg'].style.top == ''){
		cmanOM_VAR['sTop']	= 0;
	}else{
		cmanOM_VAR['sTop']	= parseInt(cmanOM_VAR['objNowImg'].style.top.replace("px", ""));	
	}
	if(cmanOM_VAR['objNowImg'].style.left == ''){
		cmanOM_VAR['sLeft']	= 0;
	}else{
		cmanOM_VAR['sLeft']	= parseInt(cmanOM_VAR['objNowImg'].style.left.replace("px", ""));	
	}

	cmanOM_VAR['objNowImg'].style.zIndex	= 2;

	return false;
}
function cmanOM_JS_mup(e){

	cmanOM_VAR['moveOn']	= false;

}
function cmanOM_JS_mout(e){

	cmanOM_VAR['moveOn']	= false;

}
function cmanOM_JS_mmove(e){

	if(!cmanOM_VAR['moveOn']){return;}
	var wObjStyle = window.getComputedStyle(cmanOM_VAR['objNowImg'].parentNode, null);

	var wObjNo	= -1;
	var wObjAt = cmanOM_VAR['objNowImg'].getAttribute("cmanOMno");
	if((wObjAt === null)||(wObjAt =='')){
	}else{
		wObjNo = parseInt(wObjAt);
	}

	if (cmanOM_VAR['device'] == 'mobi') {
		cmanOM_VAR['objNowImg'].style.top  = cmanOM_VAR['sTop']  - ( cmanOM_VAR['sPosY'] - e.touches[0].pageY) + 'px';
		cmanOM_VAR['objNowImg'].style.left = cmanOM_VAR['sLeft'] - ( cmanOM_VAR['sPosX'] - e.touches[0].pageX) + 'px';
	}else{
		cmanOM_VAR['objNowImg'].style.top  = cmanOM_VAR['sTop']  - ( cmanOM_VAR['sPosY'] - e.pageY) + 'px';
		cmanOM_VAR['objNowImg'].style.left = cmanOM_VAR['sLeft'] - ( cmanOM_VAR['sPosX'] - e.pageX) + 'px';
	}

	if(wObjNo < 0){
	}else{
		if( typeof cmanOM_OyaObj[wObjNo]  == "object"){

			var wOyaRect = cmanOM_OyaObj[wObjNo].getBoundingClientRect();
			var wObjRect = cmanOM_VAR['objNowImg'].getBoundingClientRect();

			var wTop  = 0;
			var wLeft = 0;

			if(wOyaRect.top > wObjRect.top){
				wTop  +=  wOyaRect.top - wObjRect.top;
			}

			if(wOyaRect.left > wObjRect.left){
				wLeft += wOyaRect.left - wObjRect.left;
			}

			if((wOyaRect.top + wOyaRect.height) < (wObjRect.top + wObjRect.height)){
				wTop  +=  (wOyaRect.top + wOyaRect.height) - (wObjRect.top + wObjRect.height);
			}

			if((wOyaRect.left + wOyaRect.width) < (wObjRect.left + wObjRect.width)){
				wLeft +=  (wOyaRect.left + wOyaRect.width) - (wObjRect.left + wObjRect.width);
			}


			if(wTop  != 0){cmanOM_VAR['objNowImg'].style.top  = parseInt(cmanOM_VAR['objNowImg'].style.top.replace("px", ""))  + wTop  + 'px';}
			if(wLeft != 0){cmanOM_VAR['objNowImg'].style.left = parseInt(cmanOM_VAR['objNowImg'].style.left.replace("px", "")) + wLeft + 'px';}

		}
	}

	return false;

}
