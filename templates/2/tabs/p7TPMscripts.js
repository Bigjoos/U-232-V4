var p7TPMover='_over';
var p7TPMopen='_down';
var p7TPMctl=[],p7TPMi=false,p7TPMa=false,p7TPMadv=[];
function P7_TPMset(){
	var h,sh='',hd,ie=P7_TPMgetIEver();
	if (!document.getElementById){
		return;
	}
	sh+='body {overflow-y: scroll;}\n';
	if(ie>0&&ie<5.5){
		sh+='.p7TPMcwrapper, .p7TPMcwrapper div {overflow: visible; height: 1%;}\n';
		sh+='.p7TPMtabs {display: none;}\n';
	}
	else{
		sh+='.p7TPMtabs_viewport {overflow:hidden;}\n';
		sh+='.p7TPMtabs_wrapper {position:relative;left:0px;}\n';
		sh+='.p7TPM_panel {width:100%;position:absolute;overflow:hidden;visibility:hidden;z-index:200;}\n';
		sh+='.p7TPM_vp {position:relative;overflow:hidden;padding:0;margin:0;}\n';
		sh+='.p7TPM_slide_panel_v {position:relative;}\n';
		sh+='.p7TPM_slide_panel_h {float:left;}\n';
		sh+='.p7TPM_slide_wrapper {position:relative;}\n';
	}
	if(ie>5&&ie<7){
		sh+='.p7TPMtabs_viewport {float:left;}\n';
	}
	if (document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n' + sh + '\n</s' + 'tyle>';
		document.write(h);
	}
	else{
		h=document.createElement('style');
		h.type='text/css';
		h.appendChild(document.createTextNode(sh));
		hd=document.getElementsByTagName('head');
		hd[0].appendChild(h);
	}
}
P7_TPMset();
function P7_opTPM(){
	if(!document.getElementById){
		return;
	}
	p7TPMctl[p7TPMctl.length]=arguments;
}
function P7_TPMaddLoad(){
	var ie=P7_TPMgetIEver();
	if(!document.getElementById || (ie>0&&ie<5.5)){
		return;
	}
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded",P7_initTPM,false);
		window.addEventListener("load",P7_initTPM,false);
		window.addEventListener("unload",P7_TPMrf,false);
		window.addEventListener("resize",P7_TPMrsz,false);
	}
	else if(document.addEventListener){
		document.addEventListener("load",P7_initTPM,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_tpm defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_tpm").onreadystatechange=function(){
			if(this.readyState=="complete"){
				if(p7TPMctl.length>0){
					P7_initTPM();
				}
			}
		};
		window.attachEvent("onload",P7_initTPM);
		window.attachEvent("onresize",P7_TPMrsz);
	}
	else if(typeof window.onload=='function'){
		var p7vloadit=onload;
		window.onload=function(){
			p7vloadit();
			P7_initTPM();
		};
	}
	else{
		window.onload=P7_initTPM;
	}
}
P7_TPMaddLoad();
function P7_TPMrf(){
	return;
}
function P7_initTPM(){
	var i,j,k,x,tB,tD,tA,tW,tV,tU,tP,p,cV,ob,lD,iM,tSL,tSR,sr,fnA,fnB,swp,s1,s2,s3,sP;
	if(p7TPMi){
		return;
	}
	p7TPMi=true;
	document.p7TPMpreload=[];
	for(j=p7TPMctl.length-1;j>-1;j--){
		tB=document.getElementById(p7TPMctl[j][0]);
		if(tB){
			tB.p7opt=p7TPMctl[j];
			P7_TPMtblfix(tB);
			cV=document.getElementById(tB.id.replace('_','cvp_'));
			tB.tpmTabs=[];
			tB.tpmPanels=[];
			tB.tpmCurrentPanel=-1;
			tB.tpmTrigScroll=false;
			if(tB.p7opt[5]==1){
				if(tB.p7opt[3]>2){
					tB.p7opt[3]=1;
				}
			}
			if(tB.p7opt[3]==1){
				cV.style.height='0px';
			}
			if(tB.p7opt[3]==1||tB.p7opt[3]==2){
				tB.tpmSlider=true;
				sP=document.getElementById(tB.id.replace('_','pw_'));
				sP.style.left='0px';
				sP.style.top='0px';
				sP.tpmVP=cV.id;
				sP.tpmDiv=tB.id;
				for(i=0;i<sP.childNodes.length;i++){
					if(sP.childNodes[i].nodeType==1){
						if(tB.p7opt[3]==1){
							sP.childNodes[i].className='p7TPM_slide_panel_v';
						}
						else{
							sP.childNodes[i].style.width=cV.offsetWidth+'px';
							sP.childNodes[i].className='p7TPM_slide_panel_h';
						}
						lD=sP.childNodes[i];
					}
				}
				if(tB.p7opt[3]==2){
					sP.tpmLastChild=lD;
					P7_TPMresetWidth(sP,sP.tpmLastChild);
				}
			}
			tV=document.getElementById(tB.id.replace('_','tvp_'));
			tW=document.getElementById(tB.id.replace('_','tgw_'));
			tD=document.getElementById(tB.id.replace('_','tabs_'));
			tU=tD.getElementsByTagName('UL')[0];
			tA=tU.getElementsByTagName('A');
			for(i=0;i<tA.length;i++){
				tB.tpmTabs[i]=tA[i];
				tB.tpmPanels[i]=null;
				tA[i].tpmDiv=tB.id;
				tA[i].tpmPanelNum=i+1;
				tA[i].tpmPanel=false;
				tA[i].tpmState='closed';
				iM=tA[i].getElementsByTagName("IMG");
				if(iM&&iM[0]){
					sr=iM[0].getAttribute("src");
					swp=tB.p7opt[7];
					iM[0].tpmSwap=swp;
					x=sr.lastIndexOf(".");
					fnA=sr.substring(0,x);
					fnB='.'+sr.substring(x+1);
					s1=fnA+p7TPMover+fnB;
					s2=fnA+p7TPMopen+fnB;
					if(swp==1){
						iM[0].p7imgswap=[sr,s1,s1,s1];
						P7_TPMpreloader(s1);
					}
					else if(swp==2){
						iM[0].p7imgswap=[sr,s1,s2,s2];
						P7_TPMpreloader(s1,s2);
					}
					else{
						iM[0].p7imgswap=[sr,sr,sr,sr];
					}
					iM[0].p7state='closed';
					iM[0].mark=false;
					iM[0].rollover=tB.p7opt[8];
					if(swp>0){
						tA[i].hasImg=true;
						iM[0].onmouseover=function(){
							P7_TPMimovr(this);
						};
						iM[0].onmouseout=function(){
							P7_TPMimout(this);
						};
						tA[i].onfocus=function(){
							P7_TPMimovr(this.getElementsByTagName('IMG')[0]);
						};
						tA[i].onblur=function(){
							P7_TPMimout(this.getElementsByTagName('IMG')[0]);
						};
					}
				}
				tA[i].onclick=function(){
					return P7_TPMclick(this);
				};
				if(tB.p7opt[5]==1){
					tA[i].onmouseover=function(){
						var tB=document.getElementById(this.tpmDiv);
						if(tB.tpmMouseTimer){
							clearTimeout(tB.tpmMouseTimer);
						}
						tB.tpmMouseTimer=setTimeout("P7_TPMtrig('"+this.id+"')",150);
					};
				}
				tP=document.getElementById(tA[i].id.replace('tab','w'));
				if(tP){
					tP.tpmDiv=tB.id;
					tP.tpmPanelNum=i+1;
					tP.tpmVP=tB.id.replace('_','cvp_');
					tA[i].tpmPanel=tP.id;
					tB.tpmPanels[i]=tP;
					tP.tpmState='closed';
					if(tB.p7opt[5]==1){
						tP.onmouseover=function (){
							var tB=document.getElementById(this.tpmDiv);
							if(tB.tpmMouseTimer){
								clearTimeout(tB.tpmMouseTimer);
							}
						};
					}
				}
			}
			if( (tB.p7opt.length>14&&tB.p7opt[14]>0) || (tB.p7opt.length<15&&tB.p7opt[1]!==0) ){
				tB.tpmTrigScroll=true;
				P7_TPMsetClass(cV.parentNode,'arrows_on');
				tW.style.left='0px';
				P7_TPMresetWidth(tW,tA[tA.length-1].parentNode);
				tSL=document.getElementById(tB.id.replace('_','tleft_'));
				if(tSL){
					P7_TPMsetClass(tSL,'off');
					tSL.tpmDiv=tB.id;
					if(tB.p7opt.length>14&&tB.p7opt[14]==2){
						tSL.onclick=function(){
							return P7_TPMtrigScrollPanel(this.tpmDiv,'left');
						};
					}
					else{
						tSL.onclick=function(){
							return P7_TPMtrigScroll(this.tpmDiv,'left');
						};
					}
				}
				tSR=document.getElementById(tB.id.replace('_','tright_'));
				if(tSR){
					tSR.tpmDiv=tB.id;
					if(tB.p7opt.length>14&&tB.p7opt[14]==2){
						tSR.onclick=function(){
							return P7_TPMtrigScrollPanel(this.tpmDiv,'right');
						};
					}
					else{
						tSR.onclick=function(){
							return P7_TPMtrigScroll(this.tpmDiv,'right');
						};
					}
				}
				P7_TPMtrigScroll(tB.id,'left');
			}
			p=tB.p7opt[6];
			if(p==-1){
				p=Math.floor(Math.random()*tB.tpmTabs.length+1);
			}
			p--;
			if(p>=0&&p<=tB.tpmTabs.length){
				P7_TPMopen(tB.tpmTabs[p],1);
			}
			if(tB.p7opt[9]==1){
				P7_TPMcurrentMark(tB);
			}
			P7_TPMurl(tB.id);
			tB.tpmRotateCycles=tB.p7opt[12];
			tB.tpmRotateCyclesCounter=1;
			tB.tpmRotatePanelNums=tB.tpmPanels.length;
			tB.tpmRotateCounter=1;
			tB.tpmRotateRunning=false;
			if(tB.p7opt[11]==1){
				tB.tpmRotateRunning=true;
				tB.tpmRotate=setInterval("P7_TPMrotate('"+tB.id+"')",tB.p7opt[13]);
			}
		}
	}
	P7_TPMrsz();
	p7TPMa=true;
}
function P7_TPMtrigScrollPanel(d,dr){
	var tB,tV,tW,min,max,mxL,dur,stp,lp,dy=10;
	tB=document.getElementById(d);
	tV=document.getElementById(tB.id.replace('_','tvp_'));
	tW=document.getElementById(tB.id.replace('_','tgw_'));
	min=0;
	mxL=tB.tpmTabs[tB.tpmTabs.length-1].parentNode;
	max=mxL.offsetLeft+mxL.offsetWidth-tV.offsetWidth;
	if(dr=='right'){
		lp=tW.offsetLeft-tV.offsetWidth;
	}
	else{
		lp=tW.offsetLeft+tV.offsetWidth;
	}
	tB.tpmLastScrollDir=dr;
	lp=(lp<=(max*-1))?max*-1:lp;
	lp=(lp>0)?0:lp;
	P7_TPMsetArrowStates(tB.id,lp,min,max);
	tB.tpmLastScrollTab=tB.tpmCurrentPanel;
	if(tB.tpmTrigScroll && p7TPMa && tB.p7opt[3]>0){
		tW.tpmDelay=dy;
		tW.tpmTime=0;
		tW.tpmBegin=parseInt(tW.style.left,10);
		tW.tpmFinish=lp;
		dur=tB.p7opt[1];
		stp=dur/dy;
		tW.tpmDuration=stp;
		if(!tW.tpmScrollGliderRunning){
			tW.tpmScrollGliderRunning=true;
			tW.tpmScrollGlider=setInterval("P7_TPMscrollGlider('"+tW.id+"')",tW.tpmDelay);
		}
	}
	else{
		if(tB.tpmTrigScroll){
			tW.style.left=lp+'px';
		}
	}
	return false;
}
function P7_TPMtrigScroll(d,dr){
	var i,k,tB,tV,tW,tL,tg,c=0,rr,vr,ps='left';
	tB=document.getElementById(d);
	if(tB){
		tV=document.getElementById(tB.id.replace('_','tvp_'));
		tW=document.getElementById(tB.id.replace('_','tgw_'));
		P7_TPMresetScroll(tW.parentNode);
		P7_TPMresetWidth(tW,tB.tpmTabs[tB.tpmTabs.length-1].parentNode);
		if(dr=='right'){
			tg=(tW.offsetLeft*-1)+tV.offsetWidth;
			for(i=0;i<tB.tpmTabs.length;i++){
				tL=tB.tpmTabs[i].parentNode;
				if((tL.offsetLeft+tL.offsetWidth)>=tg){
					c=i;
					if(tL.offsetWidth>=tV.offsetWidth){
						if(i==tB.tpmTabs.length-1){
							ps='right';
						}
						else if(tL.offsetLeft==(tW.offsetLeft*-1)){
							c++;
						}
					}
					break;
				}
			}
		}
		else{
			tg=tW.offsetLeft*-1;
			for(i=0;i<tB.tpmTabs.length;i++){
				tL=tB.tpmTabs[i].parentNode;
				if(tL.offsetWidth>=tV.offsetWidth){
					rr=tL.offsetLeft+tL.offsetWidth;
					vr=tg+tV.offsetWidth;
					if(tL.offsetLeft>=tg || rr>=vr){
						c=i-1;
						ps='right';
						if(i===0){
							ps='left';
						}
						break;
					}
				}
				else{
					if(tL.offsetLeft>=tg ){
						if(tB.tpmTabs[i].offsetWidth>=tV.offsetWidth){
						}
						c=i-1;
						ps='right';
						break;
					}
				}
			}
		}
		c=(c<0)?0:c;
		c++;
		P7_TPMmoveToTab(tB.id,c,ps);
	}
	return false;
}
function P7_TPMmoveToTab(d,n,ag,rs){
	var i,tB,tV,tW,tL,tA,lp,min,max,mxL,dur,stp,dy=10;
	tB=document.getElementById(d);
	tV=document.getElementById(tB.id.replace('_','tvp_'));
	tW=document.getElementById(tB.id.replace('_','tgw_'));
	P7_TPMresetScroll(tW.parentNode);
	P7_TPMresetWidth(tW,tB.tpmTabs[tB.tpmTabs.length-1].parentNode);
	tA=tB.tpmTabs[n-1];
	tL=tA.parentNode;
	min=0;
	mxL=tB.tpmTabs[tB.tpmTabs.length-1].parentNode;
	max=mxL.offsetLeft+mxL.offsetWidth-tV.offsetWidth;
	tB.tpmLastScrollTab=n;
	tB.tpmLastScrollDir=ag;
	if(ag=='right'){
		lp=tL.offsetLeft+tL.offsetWidth-tV.offsetWidth;
	}
	else{
		lp=tL.offsetLeft;
	}
	lp=(lp>=max)?max:lp;
	lp=lp*-1;
	lp=(lp>0)?0:lp;
	P7_TPMsetArrowStates(tB.id,lp,min,max);
	if(!rs&&tB.tpmTrigScroll && p7TPMa && tB.p7opt[3]>0){
		tW.tpmDelay=dy;
		tW.tpmTime=0;
		tW.tpmBegin=parseInt(tW.style.left,10);
		tW.tpmFinish=lp;
		dur=tB.p7opt[1];
		stp=dur/dy;
		tW.tpmDuration=stp;
		if(!tW.tpmScrollGliderRunning){
			tW.tpmScrollGliderRunning=true;
			tW.tpmScrollGlider=setInterval("P7_TPMscrollGlider('"+tW.id+"')",tW.tpmDelay);
		}
	}
	else{
		if(tB.tpmTrigScroll){
			tW.style.left=lp+'px';
		}
	}
}
function P7_TPMclick(a){
	var wH,m=false;
	if(!a.tpmPanel){
		wH=window.location.href;
		if(a.href!=wH&&a.href!=wH+'#'){
			if(a.href.toLowerCase().indexOf('javascript:')==-1){
				m=true;
				return m;
			}
		}
	}
	P7_TPMopen(a);
	return m;
}
function P7_TPMtrig(d){
	var i,a;
	a=document.getElementById(d);
	if(a){
		P7_TPMopen(a);
	}
}
function P7_TPMopenPanel(d,n){
	var x=n-1,tB=document.getElementById(d);
	if(tB&&tB.tpmTabs){
		if(x>-1&&x<tB.tpmTabs.length){
			P7_TPMopen(tB.tpmTabs[x]);
		}
	}
}
function P7_TPMopen(a,au){
	var i,tB,tW,tV,pT,pW,sW,iM,pP,op,oV,dur,stp,mv,dy=20;
	if(a.tpmState=='open'){
		return;
	}
	tB=document.getElementById(a.tpmDiv);
	if(tB.tpmAnimRunning){
		return;
	}
	if(!au && tB.tpmRotateRunning){
		clearInterval(tB.tpmRotate);
		tB.tpmRotateRunning=false;
	}
	tB.tpmPrevPanel=tB.tpmCurrentPanel;
	if(tB.tpmPrevPanel>0){
		pP=tB.tpmPanels[tB.tpmPrevPanel-1];
		pT=tB.tpmTabs[tB.tpmPrevPanel-1];
		if(pT){
			pT.tpmState='closed';
			P7_TPMremClass(pT,'open');
			P7_TPMremClass(pT.parentNode,'open');
			if(pT.hasImg){
				iM=pT.getElementsByTagName("IMG")[0];
				iM.p7state='closed';
				if(iM.mark){
					iM.src=iM.p7imgswap[3];
				}
				else{
					iM.src=iM.p7imgswap[0];
				}
			}
		}
	}
	tB.tpmCurrentPanel=a.tpmPanelNum;
	tB.tpmCurrentPanelId=null;
	op=tB.p7opt[3];
	if(!p7TPMa){
		op=0;
	}
	P7_TPMsetClass(a,'open');
	P7_TPMsetClass(a.parentNode,'open');
	a.tpmState='open';
	if(a.hasImg){
		iM=a.getElementsByTagName("IMG")[0];
		iM.p7state='open';
		iM.src=iM.p7imgswap[2];
	}
	mv=(tB.tpmTrigScroll&&tB.tpmLastScrollDir)?true:false;
	if(tB.p7opt.length>14&&tB.p7opt[14]==2){
		tB.tpmLastScrollTab=a.tpmPanelNum;
		if(mv){
			mv=(au==1)?true:false;
		}
	}
	if(mv){
		P7_TPMmoveToTab(tB.id,a.tpmPanelNum,tB.tpmLastScrollDir,true);
	}
	if(!a.tpmPanel){
		if(op<1||op>2){
			P7_TPMclose(tB.id,tB.tpmPrevPanel);
			return;
		}
	}
	tW=document.getElementById(a.tpmPanel);
	tB.tpmCurrentPanelId=(tW)?tW.id:null;
	tV=document.getElementById(tB.id.replace('_','cvp_'));
	tV.tpmDiv=tB.id;
	if(!tB.tpmSlider){
		tW.style.width=tV.offsetWidth+'px';
		tV.style.width=tV.offsetWidth+'px';
		if(pP){
			pP.style.width=tV.offsetWidth+'px';
			tV.style.height=tV.offsetHeight+'px';
			pP.style.position='absolute';
			pP.style.zIndex=210;
		}
	}
	if(op==1||op==2){
		sW=document.getElementById(tB.id.replace('_','pw_'));
		if(sW.tpmPanelResizeRunning){
			clearInterval(sW.tpmPanelResizer);
			sW.tpmPanelResizeRunning=false;
		}
		sW.tpmTime=0;
		sW.tpmDelay=dy;
		tV.tpmVPbegin=tV.offsetHeight;
		tV.tpmVPfinish=(tW)?tW.offsetHeight:0;
		tV.tpmVPtime=0;
		if(op==1){
			sW.tpmLbegin=0;
			sW.tpmLfinish=0;
			sW.tpmTbegin=parseInt(sW.style.top,10);
			sW.tpmTfinish=(tW)?tW.offsetTop*-1:sW.tpmTbegin;
		}
		else{
			sW.tpmLbegin=parseInt(sW.style.left,10);
			sW.tpmLfinish=(tW)?tW.offsetLeft*-1:0;
			sW.tpmTbegin=0;
			sW.tpmTfinish=0;
		}
		dur=tB.p7opt[4];
		stp=dur/dy;
		sW.tpmDuration=stp;
		if(!sW.tpmPanelSliderRunning){
			sW.tpmPanelSliderRunning=true;
			sW.tpmPanelSlider=setInterval("P7_TPMpanelSlider('"+sW.id+"')",sW.tpmDelay);
		}
	}
	else if(op==3){
		tW.style.width=tV.offsetWidth+'px';
		tW.style.height='auto';
		tW.style.position='absolute';
		tW.style.visibility='visible';
		tW.tpmAnim=op;
		tW.tpmDelay=dy;
		tW.tpmFOPdelay=20;
		tV.tpmVPbegin=tV.offsetHeight;
		tV.tpmVPfinish=tW.offsetHeight;
		tV.tpmVPtime=0;
		tW.tpmVPfirst=false;
		tW.tpmVPlast=true;
		tW.style.width=tV.offsetWidth+'px';
		if(pP){
			pP.style.zIndex=260;
			pP.tpmFOPbegin=99;
			pP.tpmFOPfinish=1;
			pP.tpmFOPtime=0;
			pP.tpmFOPdelay=tW.tpmFOPdelay;
			dur=tB.p7opt[4];
			stp=dur/pP.tpmFOPdelay;
			pP.tpmFOPduration=stp;
			if(tW.offsetHeight < pP.offsetHeight){
				tW.tpmVPfirst=true;
				tW.tpmVPlast=false;
			}
			if(pP.filters){
				pP.style.filter='alpha(opacity='+pP.tpmFOPbegin+')';
			}
			else{
				pP.style.opacity=pP.tpmFOPbegin/100;
			}
		}
		tW.style.zIndex=250;
		tW.tpmFOPbegin=1;
		tW.tpmFOPfinish=99;
		tW.tpmFOPtime=0;
		dur=tB.p7opt[4];
		stp=dur/tW.tpmFOPdelay;
		tW.tpmFOPduration=stp;
		if(tW.filters){
			tW.style.filter='alpha(opacity='+tW.tpmFOPbegin+')';
		}
		else{
			tW.style.opacity=tW.tpmFOPbegin/100;
		}
		dur=tB.p7opt[4];
		stp=dur/dy;
		tW.tpmDuration=stp;
		tV.tpmVPduration=parseInt((tW.tpmDuration/2),10);
		tW.style.left='0px';
		tW.style.top='0px';
		tW.style.height='auto';
		tW.style.visibility='visible';
		tB.tpmAnimRunning=true;
		if(!tW.tpmPanelFaderRunning){
			tW.tpmPrevPanel=(pP)?pP.id:null;
			tW.tpmPanelFaderRunning=true;
			tW.tpmPanelFader=setInterval("P7_TPMpanelCrossFader('"+tW.id+"')",tW.tpmFOPdelay);
		}
	}
	else{
		if(tB.tpmSlider){
			sW=document.getElementById(tB.id.replace('_','pw_'));
			if(tB.p7opt[3]==1){
				sW.style.top=(tW.offsetTop*-1)+'px';
			}
			else if(tB.p7opt[3]==2){
				sW.style.left=(tW.offsetLeft*-1)+'px';
			}
			tV.style.height=tW.offsetHeight+'px';
			if(!sW.tpmPanelResizeRunning){
				sW.tpmPanelResizeRunning=true;
				sW.tpmPanelResizer=setInterval("P7_TPMpanelResize('"+sW.id+"')",30);
			}
		}
		else{
			tW.style.visibility='hidden';
			tW.style.height='auto';
			tW.style.zIndex=250;
			tW.style.left='0px';
			tW.style.position='relative';
			tW.style.width='auto';
			tW.style.visibility='visible';
			tV.style.height='auto';
			tV.style.width='auto';
			P7_TPMclose(tB.id,tB.tpmPrevPanel);
		}
	}
}
function P7_TPMclose(d,pn){
	var tB,tT,tC,iM,sW;
	if(pn>0){
		tB=document.getElementById(d);
		if(tB){
			pn--;
			if(pn<tB.tpmTabs.length){
				tT=tB.tpmTabs[pn];
				tT.tpmState='closed';
				P7_TPMremClass(tT,'open');
				P7_TPMremClass(tT.parentNode,'open');
				if(tT.hasImg){
					iM=tT.getElementsByTagName("IMG")[0];
					iM.p7state='closed';
					if(iM.mark){
						iM.src=iM.p7imgswap[3];
					}
					else{
						iM.src=iM.p7imgswap[0];
					}
				}
				if(tT.tpmPanel){
					tC=document.getElementById(tT.tpmPanel);
					tC.style.position='absolute';
					tC.style.visibility='hidden';
					tC.style.left='-3000px';
					tC.style.zIndex=200;
				}
			}
		}
	}
}
function P7_TPMscrollGlider(d){
	var tD,nl;
	tD=document.getElementById(d);
	tD.tpmTime++;
	nl=P7_TPMInOutQuad(tD.tpmTime,tD.tpmBegin,tD.tpmFinish-tD.tpmBegin,tD.tpmDuration);
	tD.style.left=nl+'px';
	if(tD.tpmTime>=tD.tpmDuration){
		clearInterval(tD.tpmScrollGlider);
		tD.tpmScrollGliderRunning=false;
	}
}
function P7_TPMpanelSlider(d){
	var tD,vP,vph,nl,nt;
	tD=document.getElementById(d);
	vP=document.getElementById(tD.tpmVP);
	tD.tpmTime++;
	if(vP.tpmVPbegin!=vP.tpmVPfinish){
		vph=P7_TPMInOutQuad(tD.tpmTime,vP.tpmVPbegin,vP.tpmVPfinish-vP.tpmVPbegin,tD.tpmDuration);
		vP.style.height=vph+'px';
	}
	if(tD.tpmLbegin!=tD.tpmLfinish){
		nl=P7_TPMInOutQuad(tD.tpmTime,tD.tpmLbegin,tD.tpmLfinish-tD.tpmLbegin,tD.tpmDuration);
		tD.style.left=nl+'px';
	}
	if(tD.tpmTbegin!=tD.tpmTfinish){
		nt=P7_TPMInOutQuad(tD.tpmTime,tD.tpmTbegin,tD.tpmTfinish-tD.tpmTbegin,tD.tpmDuration);
		tD.style.top=nt+'px';
	}
	if(tD.tpmTime>=tD.tpmDuration){
		clearInterval(tD.tpmPanelSlider);
		tD.tpmPanelSliderRunning=false;
		if(!tD.tpmPanelResizeRunning){
			tD.tpmPanelResizer=setInterval("P7_TPMpanelResize('"+tD.id+"')",30);
			tD.tpmPanelResizeRunning=true;
		}
	}
}
function P7_TPMpanelResize(d){
	var wP,vP,tB,cP;
	wP=document.getElementById(d);
	if(!wP.tpmPanelSliderRunning){
		vP=document.getElementById(wP.tpmVP);
		tB=document.getElementById(vP.tpmDiv);
		cP=document.getElementById(tB.tpmCurrentPanelId);
		if(cP){
			if(cP.offsetHeight!=vP.offsetHeight){
				vP.style.height=cP.offsetHeight+'px';
			}
		}
	}
	else{
		clearInterval(wP.tpmPanelResizer);
		wP.tpmPanelResizeRunning=false;
	}
}
function P7_TPMpanelCrossFader(dIn){
	var cP,pP,vP,vph,tB,p;
	cP=document.getElementById(dIn);
	pP=document.getElementById(cP.tpmPrevPanel);
	vP=document.getElementById(cP.tpmVP);
	if(cP.tpmVPfirst){
		vP.tpmVPtime++;
		vph=P7_TPMInOutQuad(vP.tpmVPtime,vP.tpmVPbegin,vP.tpmVPfinish-vP.tpmVPbegin,vP.tpmVPduration);
		vP.style.height=vph+'px';
		if(vP.tpmVPtime>=vP.tpmVPduration){
			cP.tpmVPfirst=false;
			vP.tpmVPbegin=vP.tpmVPfinish;
		}
	}
	else if(cP.tpmFOPtime<=cP.tpmFOPduration){
		cP.tpmFOPtime++;
		p=P7_TPMInOutQuad(cP.tpmFOPtime,cP.tpmFOPbegin,cP.tpmFOPfinish-cP.tpmFOPbegin,cP.tpmFOPduration);
		if(cP.filters){
			cP.style.filter='alpha(opacity='+p+')';
		}
		else{
			cP.style.opacity=p/100;
		}
		if(pP){
			pP.tpmFOPtime++;
			p=P7_TPMInOutQuad(pP.tpmFOPtime,pP.tpmFOPbegin,pP.tpmFOPfinish-pP.tpmFOPbegin,pP.tpmFOPduration);
			if(pP.filters){
				pP.style.filter='alpha(opacity='+p+')';
			}
			else{
				pP.style.opacity=p/100;
			}
		}
	}
	else if(cP.tpmVPlast && (cP.tpmFOPtime>=cP.tpmFOPduration)){
		vP.tpmVPtime++;
		vph=P7_TPMInOutQuad(vP.tpmVPtime,vP.tpmVPbegin,vP.tpmVPfinish-vP.tpmVPbegin,vP.tpmVPduration);
		vP.style.height=vph+'px';
		if(vP.tpmVPtime>=vP.tpmVPduration){
			cP.tpmVPlast=false;
			vP.tpmVPbegin=vP.tpmVPfinish;
		}
	}
	if(!cP.tpmfirst && !cP.tpmVPlast && (cP.tpmFOPtime>=cP.tpmFOPduration)){
		clearInterval(cP.tpmPanelFader);
		cP.tpmPanelFaderRunning=false;
		tB=document.getElementById(cP.tpmDiv);
		cP.style.position='relative';
		cP.style.height='auto';
		cP.style.width='auto';
		tB.tpmAnimRunning=false;
		if(pP){
			P7_TPMclose(tB.id,pP.tpmPanelNum);
			if(pP.filters){
				pP.style.filter='';
			}
			else{
				pP.style.opacity=1;
			}
		}
		if(cP.filters){
			cP.style.filter='';
		}
		else{
			cP.style.opacity=1;
		}
		vP.style.height='auto';
		vP.style.width='auto';
	}
}
function P7_TPMInOutQuad(t,b,c,d){
	if((t/=d/2)<1){
		return c/2*t*t+b;
	}
	else{
		return -c/2*((--t)*(t-2)-1)+b;
	}
}
function P7_TPMrsz(){
	var i,j,tB,wP,vP,cP;
	for(j=p7TPMctl.length-1;j>-1;j--){
		tB=document.getElementById(p7TPMctl[j][0]);
		if(tB){
			if(tB.tpmTrigScroll&&tB.tpmLastScrollDir){
				P7_TPMmoveToTab(tB.id,tB.tpmLastScrollTab,tB.tpmLastScrollDir,true);
			}
			if(tB.tpmSlider){
				wP=document.getElementById(tB.id.replace('_','pw_'));
				vP=document.getElementById(tB.id.replace('_','cvp_'));
				cP=document.getElementById(tB.tpmCurrentPanelId);
				if(!wP.tpmPanelSliderRunning){
					if(tB.p7opt[3]==1){
						if(cP){
							vP.style.height=cP.offsetHeight+'px';
							wP.style.top=(cP.offsetTop*-1)+'px';
setTimeout(function(){
	P7_TPMrsz2(vP,wP,cP);
}
,20);
}
}
else{
for(i=0;i<wP.childNodes.length;i++){
if(wP.childNodes[i].nodeType==1){
	wP.childNodes[i].style.width=vP.offsetWidth+'px';
}
}
if(wP.tpmLastChild){
P7_TPMresetWidth(wP,wP.tpmLastChild);
}
if(cP){
vP.style.height=cP.offsetHeight+'px';
wP.style.left=(cP.offsetLeft*-1)+'px';
}
}
}
}
}
}
}
function P7_TPMrsz2(vP,wP,cP){
	vP.style.height=cP.offsetHeight+'px';
	wP.style.top=(cP.offsetTop*-1)+'px';
}
function P7_TPMpreloader(){
	var i,x;
	for(i=0;i<arguments.length;i++){
		x=document.p7TPMpreload.length;
		document.p7TPMpreload[x]=new Image();
		document.p7TPMpreload[x].src=arguments[i];
	}
}
function P7_TPMimovr(im){
	var m=false,r=im.rollover;
	if(im.mark){
		m=(r>1)?true:false;
	}
	else if(im.p7state=='open'){
		m=(r==1||r==3)?true:false;
	}
	else{
		m=true;
	}
	if(m){
		im.src=im.p7imgswap[1];
	}
}
function P7_TPMimout(im){
	var r=im.rollover;
	if(im.mark){
		if(im.p7state=='open'){
			im.src=im.p7imgswap[2];
		}
		else{
			im.src=im.p7imgswap[3];
		}
	}
	else if(im.p7state=='open'){
		if(r==1||r==3){
			im.src=im.p7imgswap[2];
		}
	}
	else{
		im.src=im.p7imgswap[0];
	}
}
function P7_TPMrotate(d){
	var tB,c,n,m=true;
	tB=document.getElementById(d);
	n=tB.tpmCurrentPanel-1;
	while(m){
		n++;
		tB.tpmRotateCounter++;
		if(tB.tpmRotateCounter>tB.tpmRotatePanelNums){
			tB.tpmRotateCyclesCounter++;
			tB.tpmRotateCounter=1;
		}
		if(n>tB.tpmPanels.length-1){
			n=0;
		}
		if(tB.tpmPanels[n]){
			m=false;
			break;
		}
	}
	if(tB.tpmRotateCyclesCounter>tB.tpmRotateCycles){
		clearInterval(tB.tpmRotate);
		tB.tpmRotateRunning=false;
		tB.tpmRotateCyclesCounter=1;
		tB.tpmRotateCounter=1;
	}
	if(n>-1&&n<tB.tpmPanels.length){
		P7_TPMopen(tB.tpmTabs[n],1);
	}
}
function P7_TPMrotator(d,ac){
	P7_TPMrotr(d,ac);
}
function P7_TPMrotr(d,ac){
	var tB=document.getElementById(d);
	if(tB){
		if(ac=='start'||ac=='resume'){
			if(!tB.tpmRotateRunning){
				tB.tpmRotateRunning=true;
				if(ac=='start'){
					tB.tpmRotateCyclesCounter=1;
					tB.tpmRotateCounter=1;
				}
				else{
					P7_TPMrotate(tB.id);
				}
				tB.tpmRotate=setInterval("P7_TPMrotate('"+tB.id+"')",tB.p7opt[13]);
			}
		}
		else if(ac=='stop'||ac=='pause'){
			tB.tpmRotateRunning=false;
			if(tB.tpmRotate){
				clearInterval(tB.tpmRotate);
			}
		}
	}
}
function P7_TPMmark(){
	p7TPMadv[p7TPMadv.length]=arguments;
}
function P7_TPMcurrentMark(el){
	var j,i,x,wH,cm=false,mt=['',1,'',''],op,r1,k,kk,tA,aU,pp,tr,aT,aP,d,pn,im;
	wH=window.location.href;
	if(el.p7opt[10]!=1){
		wH=wH.replace(window.location.search,'');
	}
	if(wH.charAt(wH.length-1)=='#'){
		wH=wH.substring(0,wH.length-1);
	}
	for(k=0;k<p7TPMadv.length;k++){
		if(p7TPMadv[k][0]&&p7TPMadv[k][0]==el.id){
			mt=p7TPMadv[k];
			cm=true;
			break;
		}
	}
	op=mt[1];
	if(op<1){
		return;
	}
	r1=/index\.[\S]*/i;
	k=-1;
	kk=-1;
	tA=[];
	d=document.getElementById(el.id.replace("_","tvp_"));
	if(d){
		aT=d.getElementsByTagName('A');
		if(aT&&aT.length>0){
			for(i=0;i<aT.length;i++){
				tA[tA.length]=aT[i];
			}
		}
	}
	d=document.getElementById(el.id.replace("_","cvp_"));
	if(d){
		aP=d.getElementsByTagName('A');
		if(aP&&aP.length>0){
			for(i=0;i<aP.length;i++){
				tA[tA.length]=aP[i];
			}
		}
	}
	for(j=0;j<tA.length;j++){
		aU=tA[j].href.replace(r1,'');
		if(op>0){
			if(tA[j].href==wH || aU==wH){
				k=j;
				kk=-1;
			}
		}
		if(op==2){
			if(tA[j].firstChild){
				if(tA[j].firstChild.nodeValue==mt[2]){
					kk=j;
				}
			}
		}
		if(op==3&&tA[j].href.indexOf(mt[2])>-1){
			kk=j;
		}
		if(op==4){
			for(x=2;x<mt.length;x+=2){
				if(wH.indexOf(mt[x])>-1){
					if(tA[j].firstChild&&tA[j].firstChild.nodeValue){
						if(tA[j].firstChild.nodeValue==mt[x+1]){
							kk=j;
						}
					}
				}
			}
		}
	}
	k=(kk>k)?kk:k;
	if(k>-1){
		if(tA[k].tpmPanelNum){
			tr=tA[k];
		}
		else{
			P7_TPMsetClass(tA[k],'current_mark');
			pp=tA[k].parentNode;
			while (pp){
				if(pp.tpmDiv && pp.tpmDiv==el.id){
					tr=el.tpmTabs[pp.tpmPanelNum-1];
					break;
				}
				pp=pp.parentNode;
			}
		}
		if(tr){
			P7_TPMsetClass(tr,'current_mark');
			P7_TPMsetClass(tr.parentNode,'current_mark');
			P7_TPMopen(tr,1);
		}
	}
}
function P7_TPMurl(dv){
	var i,h,s,x,d='tpm',pn,n=dv.replace("p7TPM_",""),tr;
	if(document.getElementById){
		h=document.location.search;
		if(h){
			h=h.replace('?','');
			s=h.split(/[=&]/g);
			if(s&&s.length){
				for(i=0;i<s.length;i+=2){
					if(s[i]==d){
						x=s[i+1];
						if(n!=x.charAt(0)){
							x=false;
						}
						if(x){
							pn='p7TPMtab'+x;
							tr=document.getElementById(pn);
							if(tr){
								P7_TPMopen(tr,1);
							}
						}
					}
				}
			}
		}
		h=document.location.hash;
		if(h){
			x=h.substring(1,h.length);
			if(n!=x.charAt(3)){
				x=false;
			}
			if(x&&x.indexOf(d)===0){
				pn='p7TPMtab'+x.substring(3);
				tr=document.getElementById(pn);
				if(tr){
					P7_TPMopen(tr,1);
				}
			}
		}
	}
}
function P7_TPMresetScroll(ob){
	if(ob.scrollLeft !== 0){
		ob.scrollLeft=0;
	}
	if(ob.scrollTop !== 0){
		ob.scrollTop=0;
	}
}
function P7_TPMresetWidth(dd,li){
	dd.style.width='19000px';
	dd.style.width=(li.offsetLeft+li.offsetWidth+2000)+'px';
}
function P7_TPMsetArrowStates(d,lp,mn,mx){
	var aL,aR;
	aL=document.getElementById(d.replace('_','tleft_'));
	aR=document.getElementById(d.replace('_','tright_'));
	if(lp>=mn){
		P7_TPMsetClass(aL,'off');
	}
	else{
		P7_TPMremClass(aL,'off');
	}
	if(lp<=(mx*-1)){
		P7_TPMsetClass(aR,'off');
	}
	else{
		P7_TPMremClass(aR,'off');
	}
}
function P7_TPMsetClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		nc=cl;
		if(cc&&cc.length>0){
			if(cc.indexOf(cl)==-1){
				nc=cc+' '+cl;
			}
			else{
				nc=cc;
			}
		}
		nc=nc.replace(r,' ');
		ob.className=nc;
	}
}
function P7_TPMremClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		if(cc&&cc.indexOf(cl>-1)){
			nc=cc.replace(cl,'');
			nc=nc.replace(r,' ');
			nc=nc.replace(/\s$/,'');
			ob.className=nc;
		}
	}
}
function P7_TPMtblfix(ob){
	var pp,sc,vp,tB,h,hh,ie,m=false;
	ie=P7_TPMgetIEver();
	pp=ob.parentNode;
	while(pp){
		if(pp.nodeName){
			if(pp.nodeName=='TD'||pp.nodeName=='TABLE'){
				m=true;
				break;
			}
			if(pp.nodeName=='BODY'){
				break;
			}
		}
		pp=pp.parentNode;
	}
	if(m || (ie>4&&ie<7)){
		h=ob.offsetWidth;
		ob.style.width=h+'px';
		hh=ob.offsetWidth;
		ob.style.width=(h+(h-hh))+'px';
		sc=document.getElementById(ob.id.replace('_','tvp_'));
		if(sc){
			sc.style.width=sc.offsetWidth+'px';
		}
		if(ob.p7opt&&ob.p7opt[3]==2){
			vp=document.getElementById(ob.id.replace('_','cvp_'));
			if(vp){
				vp.style.width=vp.offsetWidth+'px';
			}
		}
	}
}
function P7_TPMgetIEver(){
	var j,v=-1,nv,m=false;
	nv=navigator.userAgent.toLowerCase();
	j=nv.indexOf("msie");
	if(j>-1){
		v=parseFloat(nv.substring(j+4,j+8));
		if(document.documentMode){
			v=document.documentMode;
		}
	}
	return v;
}
