var vp=Object.create;var Ji=Object.defineProperty;var $l=Object.getOwnPropertyDescriptor;var bp=Object.getOwnPropertyNames;var _p=Object.getPrototypeOf,yp=Object.prototype.hasOwnProperty;var Bl=t=>{throw TypeError(t)};var wp=(t,e,r)=>e in t?Ji(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var xp=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Sp=(t,e)=>{for(var r in e)Ji(t,r,{get:e[r],enumerable:!0})},kp=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of bp(e))!yp.call(t,o)&&o!==r&&Ji(t,o,{get:()=>e[o],enumerable:!(i=$l(e,o))||i.enumerable});return t};var Cp=(t,e,r)=>(r=t!=null?vp(_p(t)):{},kp(e||!t||!t.__esModule?Ji(r,"default",{value:t,enumerable:!0}):r,t));var ut=(t,e,r,i)=>{for(var o=i>1?void 0:i?$l(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(o=(i?n(e,r,o):n(o))||o);return i&&o&&Ji(e,r,o),o};var Oe=(t,e,r)=>wp(t,typeof e!="symbol"?e+"":e,r),zl=(t,e,r)=>e.has(t)||Bl("Cannot "+r);var Xs=(t,e,r)=>(zl(t,e,"read from private field"),r?r.call(t):e.get(t)),En=(t,e,r)=>e.has(t)?Bl("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),An=(t,e,r,i)=>(zl(t,e,"write to private field"),i?i.call(t,r):e.set(t,r),r);var L0=xp((yo,ia)=>{(function(t,e){if(typeof yo=="object"&&typeof ia=="object")ia.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var i in r)(typeof yo=="object"?yo:t)[i]=r[i]}})(globalThis,(()=>(()=>{"use strict";var t={4567:function(o,s,n){var a=this&&this.__decorate||function(u,p,v,x){var S,C=arguments.length,y=C<3?p:x===null?x=Object.getOwnPropertyDescriptor(p,v):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")y=Reflect.decorate(u,p,v,x);else for(var k=u.length-1;k>=0;k--)(S=u[k])&&(y=(C<3?S(y):C>3?S(p,v,y):S(p,v))||y);return C>3&&y&&Object.defineProperty(p,v,y),y},l=this&&this.__param||function(u,p){return function(v,x){p(v,x,u)}};Object.defineProperty(s,"__esModule",{value:!0}),s.AccessibilityManager=void 0;let c=n(9042),f=n(9924),m=n(844),_=n(4725),g=n(2585),h=n(3656),d=s.AccessibilityManager=class extends m.Disposable{constructor(u,p,v,x){super(),this._terminal=u,this._coreBrowserService=v,this._renderService=x,this._rowColumns=new WeakMap,this._liveRegionLineCount=0,this._charsToConsume=[],this._charsToAnnounce="",this._accessibilityContainer=this._coreBrowserService.mainDocument.createElement("div"),this._accessibilityContainer.classList.add("xterm-accessibility"),this._rowContainer=this._coreBrowserService.mainDocument.createElement("div"),this._rowContainer.setAttribute("role","list"),this._rowContainer.classList.add("xterm-accessibility-tree"),this._rowElements=[];for(let S=0;S<this._terminal.rows;S++)this._rowElements[S]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[S]);if(this._topBoundaryFocusListener=S=>this._handleBoundaryFocus(S,0),this._bottomBoundaryFocusListener=S=>this._handleBoundaryFocus(S,1),this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._refreshRowsDimensions(),this._accessibilityContainer.appendChild(this._rowContainer),this._liveRegion=this._coreBrowserService.mainDocument.createElement("div"),this._liveRegion.classList.add("live-region"),this._liveRegion.setAttribute("aria-live","assertive"),this._accessibilityContainer.appendChild(this._liveRegion),this._liveRegionDebouncer=this.register(new f.TimeBasedDebouncer(this._renderRows.bind(this))),!this._terminal.element)throw new Error("Cannot enable accessibility before Terminal.open");this._terminal.element.insertAdjacentElement("afterbegin",this._accessibilityContainer),this.register(this._terminal.onResize((S=>this._handleResize(S.rows)))),this.register(this._terminal.onRender((S=>this._refreshRows(S.start,S.end)))),this.register(this._terminal.onScroll((()=>this._refreshRows()))),this.register(this._terminal.onA11yChar((S=>this._handleChar(S)))),this.register(this._terminal.onLineFeed((()=>this._handleChar(`
`)))),this.register(this._terminal.onA11yTab((S=>this._handleTab(S)))),this.register(this._terminal.onKey((S=>this._handleKey(S.key)))),this.register(this._terminal.onBlur((()=>this._clearLiveRegion()))),this.register(this._renderService.onDimensionsChange((()=>this._refreshRowsDimensions()))),this.register((0,h.addDisposableDomListener)(document,"selectionchange",(()=>this._handleSelectionChange()))),this.register(this._coreBrowserService.onDprChange((()=>this._refreshRowsDimensions()))),this._refreshRows(),this.register((0,m.toDisposable)((()=>{this._accessibilityContainer.remove(),this._rowElements.length=0})))}_handleTab(u){for(let p=0;p<u;p++)this._handleChar(" ")}_handleChar(u){this._liveRegionLineCount<21&&(this._charsToConsume.length>0?this._charsToConsume.shift()!==u&&(this._charsToAnnounce+=u):this._charsToAnnounce+=u,u===`
`&&(this._liveRegionLineCount++,this._liveRegionLineCount===21&&(this._liveRegion.textContent+=c.tooMuchOutput)))}_clearLiveRegion(){this._liveRegion.textContent="",this._liveRegionLineCount=0}_handleKey(u){this._clearLiveRegion(),/\p{Control}/u.test(u)||this._charsToConsume.push(u)}_refreshRows(u,p){this._liveRegionDebouncer.refresh(u,p,this._terminal.rows)}_renderRows(u,p){let v=this._terminal.buffer,x=v.lines.length.toString();for(let S=u;S<=p;S++){let C=v.lines.get(v.ydisp+S),y=[],k=C?.translateToString(!0,void 0,void 0,y)||"",D=(v.ydisp+S+1).toString(),$=this._rowElements[S];$&&(k.length===0?($.innerText="\xA0",this._rowColumns.set($,[0,1])):($.textContent=k,this._rowColumns.set($,y)),$.setAttribute("aria-posinset",D),$.setAttribute("aria-setsize",x))}this._announceCharacters()}_announceCharacters(){this._charsToAnnounce.length!==0&&(this._liveRegion.textContent+=this._charsToAnnounce,this._charsToAnnounce="")}_handleBoundaryFocus(u,p){let v=u.target,x=this._rowElements[p===0?1:this._rowElements.length-2];if(v.getAttribute("aria-posinset")===(p===0?"1":`${this._terminal.buffer.lines.length}`)||u.relatedTarget!==x)return;let S,C;if(p===0?(S=v,C=this._rowElements.pop(),this._rowContainer.removeChild(C)):(S=this._rowElements.shift(),C=v,this._rowContainer.removeChild(S)),S.removeEventListener("focus",this._topBoundaryFocusListener),C.removeEventListener("focus",this._bottomBoundaryFocusListener),p===0){let y=this._createAccessibilityTreeNode();this._rowElements.unshift(y),this._rowContainer.insertAdjacentElement("afterbegin",y)}else{let y=this._createAccessibilityTreeNode();this._rowElements.push(y),this._rowContainer.appendChild(y)}this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._terminal.scrollLines(p===0?-1:1),this._rowElements[p===0?1:this._rowElements.length-2].focus(),u.preventDefault(),u.stopImmediatePropagation()}_handleSelectionChange(){if(this._rowElements.length===0)return;let u=document.getSelection();if(!u)return;if(u.isCollapsed)return void(this._rowContainer.contains(u.anchorNode)&&this._terminal.clearSelection());if(!u.anchorNode||!u.focusNode)return void console.error("anchorNode and/or focusNode are null");let p={node:u.anchorNode,offset:u.anchorOffset},v={node:u.focusNode,offset:u.focusOffset};if((p.node.compareDocumentPosition(v.node)&Node.DOCUMENT_POSITION_PRECEDING||p.node===v.node&&p.offset>v.offset)&&([p,v]=[v,p]),p.node.compareDocumentPosition(this._rowElements[0])&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_FOLLOWING)&&(p={node:this._rowElements[0].childNodes[0],offset:0}),!this._rowContainer.contains(p.node))return;let x=this._rowElements.slice(-1)[0];if(v.node.compareDocumentPosition(x)&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_PRECEDING)&&(v={node:x,offset:x.textContent?.length??0}),!this._rowContainer.contains(v.node))return;let S=({node:k,offset:D})=>{let $=k instanceof Text?k.parentNode:k,F=parseInt($?.getAttribute("aria-posinset"),10)-1;if(isNaN(F))return console.warn("row is invalid. Race condition?"),null;let L=this._rowColumns.get($);if(!L)return console.warn("columns is null. Race condition?"),null;let V=D<L.length?L[D]:L.slice(-1)[0]+1;return V>=this._terminal.cols&&(++F,V=0),{row:F,column:V}},C=S(p),y=S(v);if(C&&y){if(C.row>y.row||C.row===y.row&&C.column>=y.column)throw new Error("invalid range");this._terminal.select(C.column,C.row,(y.row-C.row)*this._terminal.cols-C.column+y.column)}}_handleResize(u){this._rowElements[this._rowElements.length-1].removeEventListener("focus",this._bottomBoundaryFocusListener);for(let p=this._rowContainer.children.length;p<this._terminal.rows;p++)this._rowElements[p]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[p]);for(;this._rowElements.length>u;)this._rowContainer.removeChild(this._rowElements.pop());this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._refreshRowsDimensions()}_createAccessibilityTreeNode(){let u=this._coreBrowserService.mainDocument.createElement("div");return u.setAttribute("role","listitem"),u.tabIndex=-1,this._refreshRowDimensions(u),u}_refreshRowsDimensions(){if(this._renderService.dimensions.css.cell.height){this._accessibilityContainer.style.width=`${this._renderService.dimensions.css.canvas.width}px`,this._rowElements.length!==this._terminal.rows&&this._handleResize(this._terminal.rows);for(let u=0;u<this._terminal.rows;u++)this._refreshRowDimensions(this._rowElements[u])}}_refreshRowDimensions(u){u.style.height=`${this._renderService.dimensions.css.cell.height}px`}};s.AccessibilityManager=d=a([l(1,g.IInstantiationService),l(2,_.ICoreBrowserService),l(3,_.IRenderService)],d)},3614:(o,s)=>{function n(f){return f.replace(/\r?\n/g,"\r")}function a(f,m){return m?"\x1B[200~"+f+"\x1B[201~":f}function l(f,m,_,g){f=a(f=n(f),_.decPrivateModes.bracketedPasteMode&&g.rawOptions.ignoreBracketedPasteMode!==!0),_.triggerDataEvent(f,!0),m.value=""}function c(f,m,_){let g=_.getBoundingClientRect(),h=f.clientX-g.left-10,d=f.clientY-g.top-10;m.style.width="20px",m.style.height="20px",m.style.left=`${h}px`,m.style.top=`${d}px`,m.style.zIndex="1000",m.focus()}Object.defineProperty(s,"__esModule",{value:!0}),s.rightClickHandler=s.moveTextAreaUnderMouseCursor=s.paste=s.handlePasteEvent=s.copyHandler=s.bracketTextForPaste=s.prepareTextForTerminal=void 0,s.prepareTextForTerminal=n,s.bracketTextForPaste=a,s.copyHandler=function(f,m){f.clipboardData&&f.clipboardData.setData("text/plain",m.selectionText),f.preventDefault()},s.handlePasteEvent=function(f,m,_,g){f.stopPropagation(),f.clipboardData&&l(f.clipboardData.getData("text/plain"),m,_,g)},s.paste=l,s.moveTextAreaUnderMouseCursor=c,s.rightClickHandler=function(f,m,_,g,h){c(f,m,_),h&&g.rightClickSelect(f),m.value=g.selectionText,m.select()}},7239:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.ColorContrastCache=void 0;let a=n(1505);s.ColorContrastCache=class{constructor(){this._color=new a.TwoKeyMap,this._css=new a.TwoKeyMap}setCss(l,c,f){this._css.set(l,c,f)}getCss(l,c){return this._css.get(l,c)}setColor(l,c,f){this._color.set(l,c,f)}getColor(l,c){return this._color.get(l,c)}clear(){this._color.clear(),this._css.clear()}}},3656:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.addDisposableDomListener=void 0,s.addDisposableDomListener=function(n,a,l,c){n.addEventListener(a,l,c);let f=!1;return{dispose:()=>{f||(f=!0,n.removeEventListener(a,l,c))}}}},3551:function(o,s,n){var a=this&&this.__decorate||function(d,u,p,v){var x,S=arguments.length,C=S<3?u:v===null?v=Object.getOwnPropertyDescriptor(u,p):v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")C=Reflect.decorate(d,u,p,v);else for(var y=d.length-1;y>=0;y--)(x=d[y])&&(C=(S<3?x(C):S>3?x(u,p,C):x(u,p))||C);return S>3&&C&&Object.defineProperty(u,p,C),C},l=this&&this.__param||function(d,u){return function(p,v){u(p,v,d)}};Object.defineProperty(s,"__esModule",{value:!0}),s.Linkifier=void 0;let c=n(3656),f=n(8460),m=n(844),_=n(2585),g=n(4725),h=s.Linkifier=class extends m.Disposable{get currentLink(){return this._currentLink}constructor(d,u,p,v,x){super(),this._element=d,this._mouseService=u,this._renderService=p,this._bufferService=v,this._linkProviderService=x,this._linkCacheDisposables=[],this._isMouseOut=!0,this._wasResized=!1,this._activeLine=-1,this._onShowLinkUnderline=this.register(new f.EventEmitter),this.onShowLinkUnderline=this._onShowLinkUnderline.event,this._onHideLinkUnderline=this.register(new f.EventEmitter),this.onHideLinkUnderline=this._onHideLinkUnderline.event,this.register((0,m.getDisposeArrayDisposable)(this._linkCacheDisposables)),this.register((0,m.toDisposable)((()=>{this._lastMouseEvent=void 0,this._activeProviderReplies?.clear()}))),this.register(this._bufferService.onResize((()=>{this._clearCurrentLink(),this._wasResized=!0}))),this.register((0,c.addDisposableDomListener)(this._element,"mouseleave",(()=>{this._isMouseOut=!0,this._clearCurrentLink()}))),this.register((0,c.addDisposableDomListener)(this._element,"mousemove",this._handleMouseMove.bind(this))),this.register((0,c.addDisposableDomListener)(this._element,"mousedown",this._handleMouseDown.bind(this))),this.register((0,c.addDisposableDomListener)(this._element,"mouseup",this._handleMouseUp.bind(this)))}_handleMouseMove(d){this._lastMouseEvent=d;let u=this._positionFromMouseEvent(d,this._element,this._mouseService);if(!u)return;this._isMouseOut=!1;let p=d.composedPath();for(let v=0;v<p.length;v++){let x=p[v];if(x.classList.contains("xterm"))break;if(x.classList.contains("xterm-hover"))return}this._lastBufferCell&&u.x===this._lastBufferCell.x&&u.y===this._lastBufferCell.y||(this._handleHover(u),this._lastBufferCell=u)}_handleHover(d){if(this._activeLine!==d.y||this._wasResized)return this._clearCurrentLink(),this._askForLink(d,!1),void(this._wasResized=!1);this._currentLink&&this._linkAtPosition(this._currentLink.link,d)||(this._clearCurrentLink(),this._askForLink(d,!0))}_askForLink(d,u){this._activeProviderReplies&&u||(this._activeProviderReplies?.forEach((v=>{v?.forEach((x=>{x.link.dispose&&x.link.dispose()}))})),this._activeProviderReplies=new Map,this._activeLine=d.y);let p=!1;for(let[v,x]of this._linkProviderService.linkProviders.entries())u?this._activeProviderReplies?.get(v)&&(p=this._checkLinkProviderResult(v,d,p)):x.provideLinks(d.y,(S=>{if(this._isMouseOut)return;let C=S?.map((y=>({link:y})));this._activeProviderReplies?.set(v,C),p=this._checkLinkProviderResult(v,d,p),this._activeProviderReplies?.size===this._linkProviderService.linkProviders.length&&this._removeIntersectingLinks(d.y,this._activeProviderReplies)}))}_removeIntersectingLinks(d,u){let p=new Set;for(let v=0;v<u.size;v++){let x=u.get(v);if(x)for(let S=0;S<x.length;S++){let C=x[S],y=C.link.range.start.y<d?0:C.link.range.start.x,k=C.link.range.end.y>d?this._bufferService.cols:C.link.range.end.x;for(let D=y;D<=k;D++){if(p.has(D)){x.splice(S--,1);break}p.add(D)}}}}_checkLinkProviderResult(d,u,p){if(!this._activeProviderReplies)return p;let v=this._activeProviderReplies.get(d),x=!1;for(let S=0;S<d;S++)this._activeProviderReplies.has(S)&&!this._activeProviderReplies.get(S)||(x=!0);if(!x&&v){let S=v.find((C=>this._linkAtPosition(C.link,u)));S&&(p=!0,this._handleNewLink(S))}if(this._activeProviderReplies.size===this._linkProviderService.linkProviders.length&&!p)for(let S=0;S<this._activeProviderReplies.size;S++){let C=this._activeProviderReplies.get(S)?.find((y=>this._linkAtPosition(y.link,u)));if(C){p=!0,this._handleNewLink(C);break}}return p}_handleMouseDown(){this._mouseDownLink=this._currentLink}_handleMouseUp(d){if(!this._currentLink)return;let u=this._positionFromMouseEvent(d,this._element,this._mouseService);u&&this._mouseDownLink===this._currentLink&&this._linkAtPosition(this._currentLink.link,u)&&this._currentLink.link.activate(d,this._currentLink.link.text)}_clearCurrentLink(d,u){this._currentLink&&this._lastMouseEvent&&(!d||!u||this._currentLink.link.range.start.y>=d&&this._currentLink.link.range.end.y<=u)&&(this._linkLeave(this._element,this._currentLink.link,this._lastMouseEvent),this._currentLink=void 0,(0,m.disposeArray)(this._linkCacheDisposables))}_handleNewLink(d){if(!this._lastMouseEvent)return;let u=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);u&&this._linkAtPosition(d.link,u)&&(this._currentLink=d,this._currentLink.state={decorations:{underline:d.link.decorations===void 0||d.link.decorations.underline,pointerCursor:d.link.decorations===void 0||d.link.decorations.pointerCursor},isHovered:!0},this._linkHover(this._element,d.link,this._lastMouseEvent),d.link.decorations={},Object.defineProperties(d.link.decorations,{pointerCursor:{get:()=>this._currentLink?.state?.decorations.pointerCursor,set:p=>{this._currentLink?.state&&this._currentLink.state.decorations.pointerCursor!==p&&(this._currentLink.state.decorations.pointerCursor=p,this._currentLink.state.isHovered&&this._element.classList.toggle("xterm-cursor-pointer",p))}},underline:{get:()=>this._currentLink?.state?.decorations.underline,set:p=>{this._currentLink?.state&&this._currentLink?.state?.decorations.underline!==p&&(this._currentLink.state.decorations.underline=p,this._currentLink.state.isHovered&&this._fireUnderlineEvent(d.link,p))}}}),this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((p=>{if(!this._currentLink)return;let v=p.start===0?0:p.start+1+this._bufferService.buffer.ydisp,x=this._bufferService.buffer.ydisp+1+p.end;if(this._currentLink.link.range.start.y>=v&&this._currentLink.link.range.end.y<=x&&(this._clearCurrentLink(v,x),this._lastMouseEvent)){let S=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);S&&this._askForLink(S,!1)}}))))}_linkHover(d,u,p){this._currentLink?.state&&(this._currentLink.state.isHovered=!0,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(u,!0),this._currentLink.state.decorations.pointerCursor&&d.classList.add("xterm-cursor-pointer")),u.hover&&u.hover(p,u.text)}_fireUnderlineEvent(d,u){let p=d.range,v=this._bufferService.buffer.ydisp,x=this._createLinkUnderlineEvent(p.start.x-1,p.start.y-v-1,p.end.x,p.end.y-v-1,void 0);(u?this._onShowLinkUnderline:this._onHideLinkUnderline).fire(x)}_linkLeave(d,u,p){this._currentLink?.state&&(this._currentLink.state.isHovered=!1,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(u,!1),this._currentLink.state.decorations.pointerCursor&&d.classList.remove("xterm-cursor-pointer")),u.leave&&u.leave(p,u.text)}_linkAtPosition(d,u){let p=d.range.start.y*this._bufferService.cols+d.range.start.x,v=d.range.end.y*this._bufferService.cols+d.range.end.x,x=u.y*this._bufferService.cols+u.x;return p<=x&&x<=v}_positionFromMouseEvent(d,u,p){let v=p.getCoords(d,u,this._bufferService.cols,this._bufferService.rows);if(v)return{x:v[0],y:v[1]+this._bufferService.buffer.ydisp}}_createLinkUnderlineEvent(d,u,p,v,x){return{x1:d,y1:u,x2:p,y2:v,cols:this._bufferService.cols,fg:x}}};s.Linkifier=h=a([l(1,g.IMouseService),l(2,g.IRenderService),l(3,_.IBufferService),l(4,g.ILinkProviderService)],h)},9042:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.tooMuchOutput=s.promptLabel=void 0,s.promptLabel="Terminal input",s.tooMuchOutput="Too much output to announce, navigate to rows manually to read"},3730:function(o,s,n){var a=this&&this.__decorate||function(g,h,d,u){var p,v=arguments.length,x=v<3?h:u===null?u=Object.getOwnPropertyDescriptor(h,d):u;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(g,h,d,u);else for(var S=g.length-1;S>=0;S--)(p=g[S])&&(x=(v<3?p(x):v>3?p(h,d,x):p(h,d))||x);return v>3&&x&&Object.defineProperty(h,d,x),x},l=this&&this.__param||function(g,h){return function(d,u){h(d,u,g)}};Object.defineProperty(s,"__esModule",{value:!0}),s.OscLinkProvider=void 0;let c=n(511),f=n(2585),m=s.OscLinkProvider=class{constructor(g,h,d){this._bufferService=g,this._optionsService=h,this._oscLinkService=d}provideLinks(g,h){let d=this._bufferService.buffer.lines.get(g-1);if(!d)return void h(void 0);let u=[],p=this._optionsService.rawOptions.linkHandler,v=new c.CellData,x=d.getTrimmedLength(),S=-1,C=-1,y=!1;for(let k=0;k<x;k++)if(C!==-1||d.hasContent(k)){if(d.loadCell(k,v),v.hasExtendedAttrs()&&v.extended.urlId){if(C===-1){C=k,S=v.extended.urlId;continue}y=v.extended.urlId!==S}else C!==-1&&(y=!0);if(y||C!==-1&&k===x-1){let D=this._oscLinkService.getLinkData(S)?.uri;if(D){let $={start:{x:C+1,y:g},end:{x:k+(y||k!==x-1?0:1),y:g}},F=!1;if(!p?.allowNonHttpProtocols)try{let L=new URL(D);["http:","https:"].includes(L.protocol)||(F=!0)}catch{F=!0}F||u.push({text:D,range:$,activate:(L,V)=>p?p.activate(L,V,$):_(0,V),hover:(L,V)=>p?.hover?.(L,V,$),leave:(L,V)=>p?.leave?.(L,V,$)})}y=!1,v.hasExtendedAttrs()&&v.extended.urlId?(C=k,S=v.extended.urlId):(C=-1,S=-1)}}h(u)}};function _(g,h){if(confirm(`Do you want to navigate to ${h}?

WARNING: This link could potentially be dangerous`)){let d=window.open();if(d){try{d.opener=null}catch{}d.location.href=h}else console.warn("Opening link blocked as opener could not be cleared")}}s.OscLinkProvider=m=a([l(0,f.IBufferService),l(1,f.IOptionsService),l(2,f.IOscLinkService)],m)},6193:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.RenderDebouncer=void 0,s.RenderDebouncer=class{constructor(n,a){this._renderCallback=n,this._coreBrowserService=a,this._refreshCallbacks=[]}dispose(){this._animationFrame&&(this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame),this._animationFrame=void 0)}addRefreshCallback(n){return this._refreshCallbacks.push(n),this._animationFrame||(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame((()=>this._innerRefresh()))),this._animationFrame}refresh(n,a,l){this._rowCount=l,n=n!==void 0?n:0,a=a!==void 0?a:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,n):n,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,a):a,this._animationFrame||(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame((()=>this._innerRefresh())))}_innerRefresh(){if(this._animationFrame=void 0,this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return void this._runRefreshCallbacks();let n=Math.max(this._rowStart,0),a=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(n,a),this._runRefreshCallbacks()}_runRefreshCallbacks(){for(let n of this._refreshCallbacks)n(0);this._refreshCallbacks=[]}}},3236:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Terminal=void 0;let a=n(3614),l=n(3656),c=n(3551),f=n(9042),m=n(3730),_=n(1680),g=n(3107),h=n(5744),d=n(2950),u=n(1296),p=n(428),v=n(4269),x=n(5114),S=n(8934),C=n(3230),y=n(9312),k=n(4725),D=n(6731),$=n(8055),F=n(8969),L=n(8460),V=n(844),G=n(6114),K=n(8437),re=n(2584),J=n(7399),A=n(5941),B=n(9074),P=n(2585),N=n(5435),X=n(4567),ie=n(779);class ce extends F.CoreTerminal{get onFocus(){return this._onFocus.event}get onBlur(){return this._onBlur.event}get onA11yChar(){return this._onA11yCharEmitter.event}get onA11yTab(){return this._onA11yTabEmitter.event}get onWillOpen(){return this._onWillOpen.event}constructor(q={}){super(q),this.browser=G,this._keyDownHandled=!1,this._keyDownSeen=!1,this._keyPressHandled=!1,this._unprocessedDeadKey=!1,this._accessibilityManager=this.register(new V.MutableDisposable),this._onCursorMove=this.register(new L.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onKey=this.register(new L.EventEmitter),this.onKey=this._onKey.event,this._onRender=this.register(new L.EventEmitter),this.onRender=this._onRender.event,this._onSelectionChange=this.register(new L.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onTitleChange=this.register(new L.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onBell=this.register(new L.EventEmitter),this.onBell=this._onBell.event,this._onFocus=this.register(new L.EventEmitter),this._onBlur=this.register(new L.EventEmitter),this._onA11yCharEmitter=this.register(new L.EventEmitter),this._onA11yTabEmitter=this.register(new L.EventEmitter),this._onWillOpen=this.register(new L.EventEmitter),this._setup(),this._decorationService=this._instantiationService.createInstance(B.DecorationService),this._instantiationService.setService(P.IDecorationService,this._decorationService),this._linkProviderService=this._instantiationService.createInstance(ie.LinkProviderService),this._instantiationService.setService(k.ILinkProviderService,this._linkProviderService),this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(m.OscLinkProvider)),this.register(this._inputHandler.onRequestBell((()=>this._onBell.fire()))),this.register(this._inputHandler.onRequestRefreshRows(((R,j)=>this.refresh(R,j)))),this.register(this._inputHandler.onRequestSendFocus((()=>this._reportFocus()))),this.register(this._inputHandler.onRequestReset((()=>this.reset()))),this.register(this._inputHandler.onRequestWindowsOptionsReport((R=>this._reportWindowsOptions(R)))),this.register(this._inputHandler.onColor((R=>this._handleColorEvent(R)))),this.register((0,L.forwardEvent)(this._inputHandler.onCursorMove,this._onCursorMove)),this.register((0,L.forwardEvent)(this._inputHandler.onTitleChange,this._onTitleChange)),this.register((0,L.forwardEvent)(this._inputHandler.onA11yChar,this._onA11yCharEmitter)),this.register((0,L.forwardEvent)(this._inputHandler.onA11yTab,this._onA11yTabEmitter)),this.register(this._bufferService.onResize((R=>this._afterResize(R.cols,R.rows)))),this.register((0,V.toDisposable)((()=>{this._customKeyEventHandler=void 0,this.element?.parentNode?.removeChild(this.element)})))}_handleColorEvent(q){if(this._themeService)for(let R of q){let j,Z="";switch(R.index){case 256:j="foreground",Z="10";break;case 257:j="background",Z="11";break;case 258:j="cursor",Z="12";break;default:j="ansi",Z="4;"+R.index}switch(R.type){case 0:let ne=$.color.toColorRGB(j==="ansi"?this._themeService.colors.ansi[R.index]:this._themeService.colors[j]);this.coreService.triggerDataEvent(`${re.C0.ESC}]${Z};${(0,A.toRgbString)(ne)}${re.C1_ESCAPED.ST}`);break;case 1:if(j==="ansi")this._themeService.modifyColors((oe=>oe.ansi[R.index]=$.channels.toColor(...R.color)));else{let oe=j;this._themeService.modifyColors((Ee=>Ee[oe]=$.channels.toColor(...R.color)))}break;case 2:this._themeService.restoreColor(R.index)}}}_setup(){super._setup(),this._customKeyEventHandler=void 0}get buffer(){return this.buffers.active}focus(){this.textarea&&this.textarea.focus({preventScroll:!0})}_handleScreenReaderModeOptionChange(q){q?!this._accessibilityManager.value&&this._renderService&&(this._accessibilityManager.value=this._instantiationService.createInstance(X.AccessibilityManager,this)):this._accessibilityManager.clear()}_handleTextAreaFocus(q){this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(re.C0.ESC+"[I"),this.element.classList.add("focus"),this._showCursor(),this._onFocus.fire()}blur(){return this.textarea?.blur()}_handleTextAreaBlur(){this.textarea.value="",this.refresh(this.buffer.y,this.buffer.y),this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(re.C0.ESC+"[O"),this.element.classList.remove("focus"),this._onBlur.fire()}_syncTextArea(){if(!this.textarea||!this.buffer.isCursorInViewport||this._compositionHelper.isComposing||!this._renderService)return;let q=this.buffer.ybase+this.buffer.y,R=this.buffer.lines.get(q);if(!R)return;let j=Math.min(this.buffer.x,this.cols-1),Z=this._renderService.dimensions.css.cell.height,ne=R.getWidth(j),oe=this._renderService.dimensions.css.cell.width*ne,Ee=this.buffer.y*this._renderService.dimensions.css.cell.height,He=j*this._renderService.dimensions.css.cell.width;this.textarea.style.left=He+"px",this.textarea.style.top=Ee+"px",this.textarea.style.width=oe+"px",this.textarea.style.height=Z+"px",this.textarea.style.lineHeight=Z+"px",this.textarea.style.zIndex="-5"}_initGlobal(){this._bindKeys(),this.register((0,l.addDisposableDomListener)(this.element,"copy",(R=>{this.hasSelection()&&(0,a.copyHandler)(R,this._selectionService)})));let q=R=>(0,a.handlePasteEvent)(R,this.textarea,this.coreService,this.optionsService);this.register((0,l.addDisposableDomListener)(this.textarea,"paste",q)),this.register((0,l.addDisposableDomListener)(this.element,"paste",q)),G.isFirefox?this.register((0,l.addDisposableDomListener)(this.element,"mousedown",(R=>{R.button===2&&(0,a.rightClickHandler)(R,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)}))):this.register((0,l.addDisposableDomListener)(this.element,"contextmenu",(R=>{(0,a.rightClickHandler)(R,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)}))),G.isLinux&&this.register((0,l.addDisposableDomListener)(this.element,"auxclick",(R=>{R.button===1&&(0,a.moveTextAreaUnderMouseCursor)(R,this.textarea,this.screenElement)})))}_bindKeys(){this.register((0,l.addDisposableDomListener)(this.textarea,"keyup",(q=>this._keyUp(q)),!0)),this.register((0,l.addDisposableDomListener)(this.textarea,"keydown",(q=>this._keyDown(q)),!0)),this.register((0,l.addDisposableDomListener)(this.textarea,"keypress",(q=>this._keyPress(q)),!0)),this.register((0,l.addDisposableDomListener)(this.textarea,"compositionstart",(()=>this._compositionHelper.compositionstart()))),this.register((0,l.addDisposableDomListener)(this.textarea,"compositionupdate",(q=>this._compositionHelper.compositionupdate(q)))),this.register((0,l.addDisposableDomListener)(this.textarea,"compositionend",(()=>this._compositionHelper.compositionend()))),this.register((0,l.addDisposableDomListener)(this.textarea,"input",(q=>this._inputEvent(q)),!0)),this.register(this.onRender((()=>this._compositionHelper.updateCompositionElements())))}open(q){if(!q)throw new Error("Terminal requires a parent element.");if(q.isConnected||this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"),this.element?.ownerDocument.defaultView&&this._coreBrowserService)return void(this.element.ownerDocument.defaultView!==this._coreBrowserService.window&&(this._coreBrowserService.window=this.element.ownerDocument.defaultView));this._document=q.ownerDocument,this.options.documentOverride&&this.options.documentOverride instanceof Document&&(this._document=this.optionsService.rawOptions.documentOverride),this.element=this._document.createElement("div"),this.element.dir="ltr",this.element.classList.add("terminal"),this.element.classList.add("xterm"),q.appendChild(this.element);let R=this._document.createDocumentFragment();this._viewportElement=this._document.createElement("div"),this._viewportElement.classList.add("xterm-viewport"),R.appendChild(this._viewportElement),this._viewportScrollArea=this._document.createElement("div"),this._viewportScrollArea.classList.add("xterm-scroll-area"),this._viewportElement.appendChild(this._viewportScrollArea),this.screenElement=this._document.createElement("div"),this.screenElement.classList.add("xterm-screen"),this.register((0,l.addDisposableDomListener)(this.screenElement,"mousemove",(j=>this.updateCursorStyle(j)))),this._helperContainer=this._document.createElement("div"),this._helperContainer.classList.add("xterm-helpers"),this.screenElement.appendChild(this._helperContainer),R.appendChild(this.screenElement),this.textarea=this._document.createElement("textarea"),this.textarea.classList.add("xterm-helper-textarea"),this.textarea.setAttribute("aria-label",f.promptLabel),G.isChromeOS||this.textarea.setAttribute("aria-multiline","false"),this.textarea.setAttribute("autocorrect","off"),this.textarea.setAttribute("autocapitalize","off"),this.textarea.setAttribute("spellcheck","false"),this.textarea.tabIndex=0,this._coreBrowserService=this.register(this._instantiationService.createInstance(x.CoreBrowserService,this.textarea,q.ownerDocument.defaultView??window,this._document??typeof window<"u"?window.document:null)),this._instantiationService.setService(k.ICoreBrowserService,this._coreBrowserService),this.register((0,l.addDisposableDomListener)(this.textarea,"focus",(j=>this._handleTextAreaFocus(j)))),this.register((0,l.addDisposableDomListener)(this.textarea,"blur",(()=>this._handleTextAreaBlur()))),this._helperContainer.appendChild(this.textarea),this._charSizeService=this._instantiationService.createInstance(p.CharSizeService,this._document,this._helperContainer),this._instantiationService.setService(k.ICharSizeService,this._charSizeService),this._themeService=this._instantiationService.createInstance(D.ThemeService),this._instantiationService.setService(k.IThemeService,this._themeService),this._characterJoinerService=this._instantiationService.createInstance(v.CharacterJoinerService),this._instantiationService.setService(k.ICharacterJoinerService,this._characterJoinerService),this._renderService=this.register(this._instantiationService.createInstance(C.RenderService,this.rows,this.screenElement)),this._instantiationService.setService(k.IRenderService,this._renderService),this.register(this._renderService.onRenderedViewportChange((j=>this._onRender.fire(j)))),this.onResize((j=>this._renderService.resize(j.cols,j.rows))),this._compositionView=this._document.createElement("div"),this._compositionView.classList.add("composition-view"),this._compositionHelper=this._instantiationService.createInstance(d.CompositionHelper,this.textarea,this._compositionView),this._helperContainer.appendChild(this._compositionView),this._mouseService=this._instantiationService.createInstance(S.MouseService),this._instantiationService.setService(k.IMouseService,this._mouseService),this.linkifier=this.register(this._instantiationService.createInstance(c.Linkifier,this.screenElement)),this.element.appendChild(R);try{this._onWillOpen.fire(this.element)}catch{}this._renderService.hasRenderer()||this._renderService.setRenderer(this._createRenderer()),this.viewport=this._instantiationService.createInstance(_.Viewport,this._viewportElement,this._viewportScrollArea),this.viewport.onRequestScrollLines((j=>this.scrollLines(j.amount,j.suppressScrollEvent,1))),this.register(this._inputHandler.onRequestSyncScrollBar((()=>this.viewport.syncScrollArea()))),this.register(this.viewport),this.register(this.onCursorMove((()=>{this._renderService.handleCursorMove(),this._syncTextArea()}))),this.register(this.onResize((()=>this._renderService.handleResize(this.cols,this.rows)))),this.register(this.onBlur((()=>this._renderService.handleBlur()))),this.register(this.onFocus((()=>this._renderService.handleFocus()))),this.register(this._renderService.onDimensionsChange((()=>this.viewport.syncScrollArea()))),this._selectionService=this.register(this._instantiationService.createInstance(y.SelectionService,this.element,this.screenElement,this.linkifier)),this._instantiationService.setService(k.ISelectionService,this._selectionService),this.register(this._selectionService.onRequestScrollLines((j=>this.scrollLines(j.amount,j.suppressScrollEvent)))),this.register(this._selectionService.onSelectionChange((()=>this._onSelectionChange.fire()))),this.register(this._selectionService.onRequestRedraw((j=>this._renderService.handleSelectionChanged(j.start,j.end,j.columnSelectMode)))),this.register(this._selectionService.onLinuxMouseSelection((j=>{this.textarea.value=j,this.textarea.focus(),this.textarea.select()}))),this.register(this._onScroll.event((j=>{this.viewport.syncScrollArea(),this._selectionService.refresh()}))),this.register((0,l.addDisposableDomListener)(this._viewportElement,"scroll",(()=>this._selectionService.refresh()))),this.register(this._instantiationService.createInstance(g.BufferDecorationRenderer,this.screenElement)),this.register((0,l.addDisposableDomListener)(this.element,"mousedown",(j=>this._selectionService.handleMouseDown(j)))),this.coreMouseService.areMouseEventsActive?(this._selectionService.disable(),this.element.classList.add("enable-mouse-events")):this._selectionService.enable(),this.options.screenReaderMode&&(this._accessibilityManager.value=this._instantiationService.createInstance(X.AccessibilityManager,this)),this.register(this.optionsService.onSpecificOptionChange("screenReaderMode",(j=>this._handleScreenReaderModeOptionChange(j)))),this.options.overviewRulerWidth&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(h.OverviewRulerRenderer,this._viewportElement,this.screenElement))),this.optionsService.onSpecificOptionChange("overviewRulerWidth",(j=>{!this._overviewRulerRenderer&&j&&this._viewportElement&&this.screenElement&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(h.OverviewRulerRenderer,this._viewportElement,this.screenElement)))})),this._charSizeService.measure(),this.refresh(0,this.rows-1),this._initGlobal(),this.bindMouse()}_createRenderer(){return this._instantiationService.createInstance(u.DomRenderer,this,this._document,this.element,this.screenElement,this._viewportElement,this._helperContainer,this.linkifier)}bindMouse(){let q=this,R=this.element;function j(oe){let Ee=q._mouseService.getMouseReportCoords(oe,q.screenElement);if(!Ee)return!1;let He,Fe;switch(oe.overrideType||oe.type){case"mousemove":Fe=32,oe.buttons===void 0?(He=3,oe.button!==void 0&&(He=oe.button<3?oe.button:3)):He=1&oe.buttons?0:4&oe.buttons?1:2&oe.buttons?2:3;break;case"mouseup":Fe=0,He=oe.button<3?oe.button:3;break;case"mousedown":Fe=1,He=oe.button<3?oe.button:3;break;case"wheel":if(q._customWheelEventHandler&&q._customWheelEventHandler(oe)===!1||q.viewport.getLinesScrolled(oe)===0)return!1;Fe=oe.deltaY<0?0:1,He=4;break;default:return!1}return!(Fe===void 0||He===void 0||He>4)&&q.coreMouseService.triggerMouseEvent({col:Ee.col,row:Ee.row,x:Ee.x,y:Ee.y,button:He,action:Fe,ctrl:oe.ctrlKey,alt:oe.altKey,shift:oe.shiftKey})}let Z={mouseup:null,wheel:null,mousedrag:null,mousemove:null},ne={mouseup:oe=>(j(oe),oe.buttons||(this._document.removeEventListener("mouseup",Z.mouseup),Z.mousedrag&&this._document.removeEventListener("mousemove",Z.mousedrag)),this.cancel(oe)),wheel:oe=>(j(oe),this.cancel(oe,!0)),mousedrag:oe=>{oe.buttons&&j(oe)},mousemove:oe=>{oe.buttons||j(oe)}};this.register(this.coreMouseService.onProtocolChange((oe=>{oe?(this.optionsService.rawOptions.logLevel==="debug"&&this._logService.debug("Binding to mouse events:",this.coreMouseService.explainEvents(oe)),this.element.classList.add("enable-mouse-events"),this._selectionService.disable()):(this._logService.debug("Unbinding from mouse events."),this.element.classList.remove("enable-mouse-events"),this._selectionService.enable()),8&oe?Z.mousemove||(R.addEventListener("mousemove",ne.mousemove),Z.mousemove=ne.mousemove):(R.removeEventListener("mousemove",Z.mousemove),Z.mousemove=null),16&oe?Z.wheel||(R.addEventListener("wheel",ne.wheel,{passive:!1}),Z.wheel=ne.wheel):(R.removeEventListener("wheel",Z.wheel),Z.wheel=null),2&oe?Z.mouseup||(Z.mouseup=ne.mouseup):(this._document.removeEventListener("mouseup",Z.mouseup),Z.mouseup=null),4&oe?Z.mousedrag||(Z.mousedrag=ne.mousedrag):(this._document.removeEventListener("mousemove",Z.mousedrag),Z.mousedrag=null)}))),this.coreMouseService.activeProtocol=this.coreMouseService.activeProtocol,this.register((0,l.addDisposableDomListener)(R,"mousedown",(oe=>{if(oe.preventDefault(),this.focus(),this.coreMouseService.areMouseEventsActive&&!this._selectionService.shouldForceSelection(oe))return j(oe),Z.mouseup&&this._document.addEventListener("mouseup",Z.mouseup),Z.mousedrag&&this._document.addEventListener("mousemove",Z.mousedrag),this.cancel(oe)}))),this.register((0,l.addDisposableDomListener)(R,"wheel",(oe=>{if(!Z.wheel){if(this._customWheelEventHandler&&this._customWheelEventHandler(oe)===!1)return!1;if(!this.buffer.hasScrollback){let Ee=this.viewport.getLinesScrolled(oe);if(Ee===0)return;let He=re.C0.ESC+(this.coreService.decPrivateModes.applicationCursorKeys?"O":"[")+(oe.deltaY<0?"A":"B"),Fe="";for(let it=0;it<Math.abs(Ee);it++)Fe+=He;return this.coreService.triggerDataEvent(Fe,!0),this.cancel(oe,!0)}return this.viewport.handleWheel(oe)?this.cancel(oe):void 0}}),{passive:!1})),this.register((0,l.addDisposableDomListener)(R,"touchstart",(oe=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchStart(oe),this.cancel(oe)}),{passive:!0})),this.register((0,l.addDisposableDomListener)(R,"touchmove",(oe=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchMove(oe)?void 0:this.cancel(oe)}),{passive:!1}))}refresh(q,R){this._renderService?.refreshRows(q,R)}updateCursorStyle(q){this._selectionService?.shouldColumnSelect(q)?this.element.classList.add("column-select"):this.element.classList.remove("column-select")}_showCursor(){this.coreService.isCursorInitialized||(this.coreService.isCursorInitialized=!0,this.refresh(this.buffer.y,this.buffer.y))}scrollLines(q,R,j=0){j===1?(super.scrollLines(q,R,j),this.refresh(0,this.rows-1)):this.viewport?.scrollLines(q)}paste(q){(0,a.paste)(q,this.textarea,this.coreService,this.optionsService)}attachCustomKeyEventHandler(q){this._customKeyEventHandler=q}attachCustomWheelEventHandler(q){this._customWheelEventHandler=q}registerLinkProvider(q){return this._linkProviderService.registerLinkProvider(q)}registerCharacterJoiner(q){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");let R=this._characterJoinerService.register(q);return this.refresh(0,this.rows-1),R}deregisterCharacterJoiner(q){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");this._characterJoinerService.deregister(q)&&this.refresh(0,this.rows-1)}get markers(){return this.buffer.markers}registerMarker(q){return this.buffer.addMarker(this.buffer.ybase+this.buffer.y+q)}registerDecoration(q){return this._decorationService.registerDecoration(q)}hasSelection(){return!!this._selectionService&&this._selectionService.hasSelection}select(q,R,j){this._selectionService.setSelection(q,R,j)}getSelection(){return this._selectionService?this._selectionService.selectionText:""}getSelectionPosition(){if(this._selectionService&&this._selectionService.hasSelection)return{start:{x:this._selectionService.selectionStart[0],y:this._selectionService.selectionStart[1]},end:{x:this._selectionService.selectionEnd[0],y:this._selectionService.selectionEnd[1]}}}clearSelection(){this._selectionService?.clearSelection()}selectAll(){this._selectionService?.selectAll()}selectLines(q,R){this._selectionService?.selectLines(q,R)}_keyDown(q){if(this._keyDownHandled=!1,this._keyDownSeen=!0,this._customKeyEventHandler&&this._customKeyEventHandler(q)===!1)return!1;let R=this.browser.isMac&&this.options.macOptionIsMeta&&q.altKey;if(!R&&!this._compositionHelper.keydown(q))return this.options.scrollOnUserInput&&this.buffer.ybase!==this.buffer.ydisp&&this.scrollToBottom(),!1;R||q.key!=="Dead"&&q.key!=="AltGraph"||(this._unprocessedDeadKey=!0);let j=(0,J.evaluateKeyboardEvent)(q,this.coreService.decPrivateModes.applicationCursorKeys,this.browser.isMac,this.options.macOptionIsMeta);if(this.updateCursorStyle(q),j.type===3||j.type===2){let Z=this.rows-1;return this.scrollLines(j.type===2?-Z:Z),this.cancel(q,!0)}return j.type===1&&this.selectAll(),!!this._isThirdLevelShift(this.browser,q)||(j.cancel&&this.cancel(q,!0),!j.key||!!(q.key&&!q.ctrlKey&&!q.altKey&&!q.metaKey&&q.key.length===1&&q.key.charCodeAt(0)>=65&&q.key.charCodeAt(0)<=90)||(this._unprocessedDeadKey?(this._unprocessedDeadKey=!1,!0):(j.key!==re.C0.ETX&&j.key!==re.C0.CR||(this.textarea.value=""),this._onKey.fire({key:j.key,domEvent:q}),this._showCursor(),this.coreService.triggerDataEvent(j.key,!0),!this.optionsService.rawOptions.screenReaderMode||q.altKey||q.ctrlKey?this.cancel(q,!0):void(this._keyDownHandled=!0))))}_isThirdLevelShift(q,R){let j=q.isMac&&!this.options.macOptionIsMeta&&R.altKey&&!R.ctrlKey&&!R.metaKey||q.isWindows&&R.altKey&&R.ctrlKey&&!R.metaKey||q.isWindows&&R.getModifierState("AltGraph");return R.type==="keypress"?j:j&&(!R.keyCode||R.keyCode>47)}_keyUp(q){this._keyDownSeen=!1,this._customKeyEventHandler&&this._customKeyEventHandler(q)===!1||((function(R){return R.keyCode===16||R.keyCode===17||R.keyCode===18})(q)||this.focus(),this.updateCursorStyle(q),this._keyPressHandled=!1)}_keyPress(q){let R;if(this._keyPressHandled=!1,this._keyDownHandled||this._customKeyEventHandler&&this._customKeyEventHandler(q)===!1)return!1;if(this.cancel(q),q.charCode)R=q.charCode;else if(q.which===null||q.which===void 0)R=q.keyCode;else{if(q.which===0||q.charCode===0)return!1;R=q.which}return!(!R||(q.altKey||q.ctrlKey||q.metaKey)&&!this._isThirdLevelShift(this.browser,q)||(R=String.fromCharCode(R),this._onKey.fire({key:R,domEvent:q}),this._showCursor(),this.coreService.triggerDataEvent(R,!0),this._keyPressHandled=!0,this._unprocessedDeadKey=!1,0))}_inputEvent(q){if(q.data&&q.inputType==="insertText"&&(!q.composed||!this._keyDownSeen)&&!this.optionsService.rawOptions.screenReaderMode){if(this._keyPressHandled)return!1;this._unprocessedDeadKey=!1;let R=q.data;return this.coreService.triggerDataEvent(R,!0),this.cancel(q),!0}return!1}resize(q,R){q!==this.cols||R!==this.rows?super.resize(q,R):this._charSizeService&&!this._charSizeService.hasValidSize&&this._charSizeService.measure()}_afterResize(q,R){this._charSizeService?.measure(),this.viewport?.syncScrollArea(!0)}clear(){if(this.buffer.ybase!==0||this.buffer.y!==0){this.buffer.clearAllMarkers(),this.buffer.lines.set(0,this.buffer.lines.get(this.buffer.ybase+this.buffer.y)),this.buffer.lines.length=1,this.buffer.ydisp=0,this.buffer.ybase=0,this.buffer.y=0;for(let q=1;q<this.rows;q++)this.buffer.lines.push(this.buffer.getBlankLine(K.DEFAULT_ATTR_DATA));this._onScroll.fire({position:this.buffer.ydisp,source:0}),this.viewport?.reset(),this.refresh(0,this.rows-1)}}reset(){this.options.rows=this.rows,this.options.cols=this.cols;let q=this._customKeyEventHandler;this._setup(),super.reset(),this._selectionService?.reset(),this._decorationService.reset(),this.viewport?.reset(),this._customKeyEventHandler=q,this.refresh(0,this.rows-1)}clearTextureAtlas(){this._renderService?.clearTextureAtlas()}_reportFocus(){this.element?.classList.contains("focus")?this.coreService.triggerDataEvent(re.C0.ESC+"[I"):this.coreService.triggerDataEvent(re.C0.ESC+"[O")}_reportWindowsOptions(q){if(this._renderService)switch(q){case N.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:let R=this._renderService.dimensions.css.canvas.width.toFixed(0),j=this._renderService.dimensions.css.canvas.height.toFixed(0);this.coreService.triggerDataEvent(`${re.C0.ESC}[4;${j};${R}t`);break;case N.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:let Z=this._renderService.dimensions.css.cell.width.toFixed(0),ne=this._renderService.dimensions.css.cell.height.toFixed(0);this.coreService.triggerDataEvent(`${re.C0.ESC}[6;${ne};${Z}t`)}}cancel(q,R){if(this.options.cancelEvents||R)return q.preventDefault(),q.stopPropagation(),!1}}s.Terminal=ce},9924:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.TimeBasedDebouncer=void 0,s.TimeBasedDebouncer=class{constructor(n,a=1e3){this._renderCallback=n,this._debounceThresholdMS=a,this._lastRefreshMs=0,this._additionalRefreshRequested=!1}dispose(){this._refreshTimeoutID&&clearTimeout(this._refreshTimeoutID)}refresh(n,a,l){this._rowCount=l,n=n!==void 0?n:0,a=a!==void 0?a:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,n):n,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,a):a;let c=Date.now();if(c-this._lastRefreshMs>=this._debounceThresholdMS)this._lastRefreshMs=c,this._innerRefresh();else if(!this._additionalRefreshRequested){let f=c-this._lastRefreshMs,m=this._debounceThresholdMS-f;this._additionalRefreshRequested=!0,this._refreshTimeoutID=window.setTimeout((()=>{this._lastRefreshMs=Date.now(),this._innerRefresh(),this._additionalRefreshRequested=!1,this._refreshTimeoutID=void 0}),m)}}_innerRefresh(){if(this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return;let n=Math.max(this._rowStart,0),a=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(n,a)}}},1680:function(o,s,n){var a=this&&this.__decorate||function(d,u,p,v){var x,S=arguments.length,C=S<3?u:v===null?v=Object.getOwnPropertyDescriptor(u,p):v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")C=Reflect.decorate(d,u,p,v);else for(var y=d.length-1;y>=0;y--)(x=d[y])&&(C=(S<3?x(C):S>3?x(u,p,C):x(u,p))||C);return S>3&&C&&Object.defineProperty(u,p,C),C},l=this&&this.__param||function(d,u){return function(p,v){u(p,v,d)}};Object.defineProperty(s,"__esModule",{value:!0}),s.Viewport=void 0;let c=n(3656),f=n(4725),m=n(8460),_=n(844),g=n(2585),h=s.Viewport=class extends _.Disposable{constructor(d,u,p,v,x,S,C,y){super(),this._viewportElement=d,this._scrollArea=u,this._bufferService=p,this._optionsService=v,this._charSizeService=x,this._renderService=S,this._coreBrowserService=C,this.scrollBarWidth=0,this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._wheelPartialScroll=0,this._refreshAnimationFrame=null,this._ignoreNextScrollEvent=!1,this._smoothScrollState={startTime:0,origin:-1,target:-1},this._onRequestScrollLines=this.register(new m.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this.scrollBarWidth=this._viewportElement.offsetWidth-this._scrollArea.offsetWidth||15,this.register((0,c.addDisposableDomListener)(this._viewportElement,"scroll",this._handleScroll.bind(this))),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate((k=>this._activeBuffer=k.activeBuffer))),this._renderDimensions=this._renderService.dimensions,this.register(this._renderService.onDimensionsChange((k=>this._renderDimensions=k))),this._handleThemeChange(y.colors),this.register(y.onChangeColors((k=>this._handleThemeChange(k)))),this.register(this._optionsService.onSpecificOptionChange("scrollback",(()=>this.syncScrollArea()))),setTimeout((()=>this.syncScrollArea()))}_handleThemeChange(d){this._viewportElement.style.backgroundColor=d.background.css}reset(){this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._coreBrowserService.window.requestAnimationFrame((()=>this.syncScrollArea()))}_refresh(d){if(d)return this._innerRefresh(),void(this._refreshAnimationFrame!==null&&this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));this._refreshAnimationFrame===null&&(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame((()=>this._innerRefresh())))}_innerRefresh(){if(this._charSizeService.height>0){this._currentRowHeight=this._renderDimensions.device.cell.height/this._coreBrowserService.dpr,this._currentDeviceCellHeight=this._renderDimensions.device.cell.height,this._lastRecordedViewportHeight=this._viewportElement.offsetHeight;let u=Math.round(this._currentRowHeight*this._lastRecordedBufferLength)+(this._lastRecordedViewportHeight-this._renderDimensions.css.canvas.height);this._lastRecordedBufferHeight!==u&&(this._lastRecordedBufferHeight=u,this._scrollArea.style.height=this._lastRecordedBufferHeight+"px")}let d=this._bufferService.buffer.ydisp*this._currentRowHeight;this._viewportElement.scrollTop!==d&&(this._ignoreNextScrollEvent=!0,this._viewportElement.scrollTop=d),this._refreshAnimationFrame=null}syncScrollArea(d=!1){if(this._lastRecordedBufferLength!==this._bufferService.buffer.lines.length)return this._lastRecordedBufferLength=this._bufferService.buffer.lines.length,void this._refresh(d);this._lastRecordedViewportHeight===this._renderService.dimensions.css.canvas.height&&this._lastScrollTop===this._activeBuffer.ydisp*this._currentRowHeight&&this._renderDimensions.device.cell.height===this._currentDeviceCellHeight||this._refresh(d)}_handleScroll(d){if(this._lastScrollTop=this._viewportElement.scrollTop,!this._viewportElement.offsetParent)return;if(this._ignoreNextScrollEvent)return this._ignoreNextScrollEvent=!1,void this._onRequestScrollLines.fire({amount:0,suppressScrollEvent:!0});let u=Math.round(this._lastScrollTop/this._currentRowHeight)-this._bufferService.buffer.ydisp;this._onRequestScrollLines.fire({amount:u,suppressScrollEvent:!0})}_smoothScroll(){if(this._isDisposed||this._smoothScrollState.origin===-1||this._smoothScrollState.target===-1)return;let d=this._smoothScrollPercent();this._viewportElement.scrollTop=this._smoothScrollState.origin+Math.round(d*(this._smoothScrollState.target-this._smoothScrollState.origin)),d<1?this._coreBrowserService.window.requestAnimationFrame((()=>this._smoothScroll())):this._clearSmoothScrollState()}_smoothScrollPercent(){return this._optionsService.rawOptions.smoothScrollDuration&&this._smoothScrollState.startTime?Math.max(Math.min((Date.now()-this._smoothScrollState.startTime)/this._optionsService.rawOptions.smoothScrollDuration,1),0):1}_clearSmoothScrollState(){this._smoothScrollState.startTime=0,this._smoothScrollState.origin=-1,this._smoothScrollState.target=-1}_bubbleScroll(d,u){let p=this._viewportElement.scrollTop+this._lastRecordedViewportHeight;return!(u<0&&this._viewportElement.scrollTop!==0||u>0&&p<this._lastRecordedBufferHeight)||(d.cancelable&&d.preventDefault(),!1)}handleWheel(d){let u=this._getPixelsScrolled(d);return u!==0&&(this._optionsService.rawOptions.smoothScrollDuration?(this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target===-1?this._smoothScrollState.target=this._viewportElement.scrollTop+u:this._smoothScrollState.target+=u,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()):this._viewportElement.scrollTop+=u,this._bubbleScroll(d,u))}scrollLines(d){if(d!==0)if(this._optionsService.rawOptions.smoothScrollDuration){let u=d*this._currentRowHeight;this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target=this._smoothScrollState.origin+u,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()}else this._onRequestScrollLines.fire({amount:d,suppressScrollEvent:!1})}_getPixelsScrolled(d){if(d.deltaY===0||d.shiftKey)return 0;let u=this._applyScrollModifier(d.deltaY,d);return d.deltaMode===WheelEvent.DOM_DELTA_LINE?u*=this._currentRowHeight:d.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(u*=this._currentRowHeight*this._bufferService.rows),u}getBufferElements(d,u){let p,v="",x=[],S=u??this._bufferService.buffer.lines.length,C=this._bufferService.buffer.lines;for(let y=d;y<S;y++){let k=C.get(y);if(!k)continue;let D=C.get(y+1)?.isWrapped;if(v+=k.translateToString(!D),!D||y===C.length-1){let $=document.createElement("div");$.textContent=v,x.push($),v.length>0&&(p=$),v=""}}return{bufferElements:x,cursorElement:p}}getLinesScrolled(d){if(d.deltaY===0||d.shiftKey)return 0;let u=this._applyScrollModifier(d.deltaY,d);return d.deltaMode===WheelEvent.DOM_DELTA_PIXEL?(u/=this._currentRowHeight+0,this._wheelPartialScroll+=u,u=Math.floor(Math.abs(this._wheelPartialScroll))*(this._wheelPartialScroll>0?1:-1),this._wheelPartialScroll%=1):d.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(u*=this._bufferService.rows),u}_applyScrollModifier(d,u){let p=this._optionsService.rawOptions.fastScrollModifier;return p==="alt"&&u.altKey||p==="ctrl"&&u.ctrlKey||p==="shift"&&u.shiftKey?d*this._optionsService.rawOptions.fastScrollSensitivity*this._optionsService.rawOptions.scrollSensitivity:d*this._optionsService.rawOptions.scrollSensitivity}handleTouchStart(d){this._lastTouchY=d.touches[0].pageY}handleTouchMove(d){let u=this._lastTouchY-d.touches[0].pageY;return this._lastTouchY=d.touches[0].pageY,u!==0&&(this._viewportElement.scrollTop+=u,this._bubbleScroll(d,u))}};s.Viewport=h=a([l(2,g.IBufferService),l(3,g.IOptionsService),l(4,f.ICharSizeService),l(5,f.IRenderService),l(6,f.ICoreBrowserService),l(7,f.IThemeService)],h)},3107:function(o,s,n){var a=this&&this.__decorate||function(g,h,d,u){var p,v=arguments.length,x=v<3?h:u===null?u=Object.getOwnPropertyDescriptor(h,d):u;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(g,h,d,u);else for(var S=g.length-1;S>=0;S--)(p=g[S])&&(x=(v<3?p(x):v>3?p(h,d,x):p(h,d))||x);return v>3&&x&&Object.defineProperty(h,d,x),x},l=this&&this.__param||function(g,h){return function(d,u){h(d,u,g)}};Object.defineProperty(s,"__esModule",{value:!0}),s.BufferDecorationRenderer=void 0;let c=n(4725),f=n(844),m=n(2585),_=s.BufferDecorationRenderer=class extends f.Disposable{constructor(g,h,d,u,p){super(),this._screenElement=g,this._bufferService=h,this._coreBrowserService=d,this._decorationService=u,this._renderService=p,this._decorationElements=new Map,this._altBufferIsActive=!1,this._dimensionsChanged=!1,this._container=document.createElement("div"),this._container.classList.add("xterm-decoration-container"),this._screenElement.appendChild(this._container),this.register(this._renderService.onRenderedViewportChange((()=>this._doRefreshDecorations()))),this.register(this._renderService.onDimensionsChange((()=>{this._dimensionsChanged=!0,this._queueRefresh()}))),this.register(this._coreBrowserService.onDprChange((()=>this._queueRefresh()))),this.register(this._bufferService.buffers.onBufferActivate((()=>{this._altBufferIsActive=this._bufferService.buffer===this._bufferService.buffers.alt}))),this.register(this._decorationService.onDecorationRegistered((()=>this._queueRefresh()))),this.register(this._decorationService.onDecorationRemoved((v=>this._removeDecoration(v)))),this.register((0,f.toDisposable)((()=>{this._container.remove(),this._decorationElements.clear()})))}_queueRefresh(){this._animationFrame===void 0&&(this._animationFrame=this._renderService.addRefreshCallback((()=>{this._doRefreshDecorations(),this._animationFrame=void 0})))}_doRefreshDecorations(){for(let g of this._decorationService.decorations)this._renderDecoration(g);this._dimensionsChanged=!1}_renderDecoration(g){this._refreshStyle(g),this._dimensionsChanged&&this._refreshXPosition(g)}_createElement(g){let h=this._coreBrowserService.mainDocument.createElement("div");h.classList.add("xterm-decoration"),h.classList.toggle("xterm-decoration-top-layer",g?.options?.layer==="top"),h.style.width=`${Math.round((g.options.width||1)*this._renderService.dimensions.css.cell.width)}px`,h.style.height=(g.options.height||1)*this._renderService.dimensions.css.cell.height+"px",h.style.top=(g.marker.line-this._bufferService.buffers.active.ydisp)*this._renderService.dimensions.css.cell.height+"px",h.style.lineHeight=`${this._renderService.dimensions.css.cell.height}px`;let d=g.options.x??0;return d&&d>this._bufferService.cols&&(h.style.display="none"),this._refreshXPosition(g,h),h}_refreshStyle(g){let h=g.marker.line-this._bufferService.buffers.active.ydisp;if(h<0||h>=this._bufferService.rows)g.element&&(g.element.style.display="none",g.onRenderEmitter.fire(g.element));else{let d=this._decorationElements.get(g);d||(d=this._createElement(g),g.element=d,this._decorationElements.set(g,d),this._container.appendChild(d),g.onDispose((()=>{this._decorationElements.delete(g),d.remove()}))),d.style.top=h*this._renderService.dimensions.css.cell.height+"px",d.style.display=this._altBufferIsActive?"none":"block",g.onRenderEmitter.fire(d)}}_refreshXPosition(g,h=g.element){if(!h)return;let d=g.options.x??0;(g.options.anchor||"left")==="right"?h.style.right=d?d*this._renderService.dimensions.css.cell.width+"px":"":h.style.left=d?d*this._renderService.dimensions.css.cell.width+"px":""}_removeDecoration(g){this._decorationElements.get(g)?.remove(),this._decorationElements.delete(g),g.dispose()}};s.BufferDecorationRenderer=_=a([l(1,m.IBufferService),l(2,c.ICoreBrowserService),l(3,m.IDecorationService),l(4,c.IRenderService)],_)},5871:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.ColorZoneStore=void 0,s.ColorZoneStore=class{constructor(){this._zones=[],this._zonePool=[],this._zonePoolIndex=0,this._linePadding={full:0,left:0,center:0,right:0}}get zones(){return this._zonePool.length=Math.min(this._zonePool.length,this._zones.length),this._zones}clear(){this._zones.length=0,this._zonePoolIndex=0}addDecoration(n){if(n.options.overviewRulerOptions){for(let a of this._zones)if(a.color===n.options.overviewRulerOptions.color&&a.position===n.options.overviewRulerOptions.position){if(this._lineIntersectsZone(a,n.marker.line))return;if(this._lineAdjacentToZone(a,n.marker.line,n.options.overviewRulerOptions.position))return void this._addLineToZone(a,n.marker.line)}if(this._zonePoolIndex<this._zonePool.length)return this._zonePool[this._zonePoolIndex].color=n.options.overviewRulerOptions.color,this._zonePool[this._zonePoolIndex].position=n.options.overviewRulerOptions.position,this._zonePool[this._zonePoolIndex].startBufferLine=n.marker.line,this._zonePool[this._zonePoolIndex].endBufferLine=n.marker.line,void this._zones.push(this._zonePool[this._zonePoolIndex++]);this._zones.push({color:n.options.overviewRulerOptions.color,position:n.options.overviewRulerOptions.position,startBufferLine:n.marker.line,endBufferLine:n.marker.line}),this._zonePool.push(this._zones[this._zones.length-1]),this._zonePoolIndex++}}setPadding(n){this._linePadding=n}_lineIntersectsZone(n,a){return a>=n.startBufferLine&&a<=n.endBufferLine}_lineAdjacentToZone(n,a,l){return a>=n.startBufferLine-this._linePadding[l||"full"]&&a<=n.endBufferLine+this._linePadding[l||"full"]}_addLineToZone(n,a){n.startBufferLine=Math.min(n.startBufferLine,a),n.endBufferLine=Math.max(n.endBufferLine,a)}}},5744:function(o,s,n){var a=this&&this.__decorate||function(p,v,x,S){var C,y=arguments.length,k=y<3?v:S===null?S=Object.getOwnPropertyDescriptor(v,x):S;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")k=Reflect.decorate(p,v,x,S);else for(var D=p.length-1;D>=0;D--)(C=p[D])&&(k=(y<3?C(k):y>3?C(v,x,k):C(v,x))||k);return y>3&&k&&Object.defineProperty(v,x,k),k},l=this&&this.__param||function(p,v){return function(x,S){v(x,S,p)}};Object.defineProperty(s,"__esModule",{value:!0}),s.OverviewRulerRenderer=void 0;let c=n(5871),f=n(4725),m=n(844),_=n(2585),g={full:0,left:0,center:0,right:0},h={full:0,left:0,center:0,right:0},d={full:0,left:0,center:0,right:0},u=s.OverviewRulerRenderer=class extends m.Disposable{get _width(){return this._optionsService.options.overviewRulerWidth||0}constructor(p,v,x,S,C,y,k){super(),this._viewportElement=p,this._screenElement=v,this._bufferService=x,this._decorationService=S,this._renderService=C,this._optionsService=y,this._coreBrowserService=k,this._colorZoneStore=new c.ColorZoneStore,this._shouldUpdateDimensions=!0,this._shouldUpdateAnchor=!0,this._lastKnownBufferLength=0,this._canvas=this._coreBrowserService.mainDocument.createElement("canvas"),this._canvas.classList.add("xterm-decoration-overview-ruler"),this._refreshCanvasDimensions(),this._viewportElement.parentElement?.insertBefore(this._canvas,this._viewportElement);let D=this._canvas.getContext("2d");if(!D)throw new Error("Ctx cannot be null");this._ctx=D,this._registerDecorationListeners(),this._registerBufferChangeListeners(),this._registerDimensionChangeListeners(),this.register((0,m.toDisposable)((()=>{this._canvas?.remove()})))}_registerDecorationListeners(){this.register(this._decorationService.onDecorationRegistered((()=>this._queueRefresh(void 0,!0)))),this.register(this._decorationService.onDecorationRemoved((()=>this._queueRefresh(void 0,!0))))}_registerBufferChangeListeners(){this.register(this._renderService.onRenderedViewportChange((()=>this._queueRefresh()))),this.register(this._bufferService.buffers.onBufferActivate((()=>{this._canvas.style.display=this._bufferService.buffer===this._bufferService.buffers.alt?"none":"block"}))),this.register(this._bufferService.onScroll((()=>{this._lastKnownBufferLength!==this._bufferService.buffers.normal.lines.length&&(this._refreshDrawHeightConstants(),this._refreshColorZonePadding())})))}_registerDimensionChangeListeners(){this.register(this._renderService.onRender((()=>{this._containerHeight&&this._containerHeight===this._screenElement.clientHeight||(this._queueRefresh(!0),this._containerHeight=this._screenElement.clientHeight)}))),this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth",(()=>this._queueRefresh(!0)))),this.register(this._coreBrowserService.onDprChange((()=>this._queueRefresh(!0)))),this._queueRefresh(!0)}_refreshDrawConstants(){let p=Math.floor(this._canvas.width/3),v=Math.ceil(this._canvas.width/3);h.full=this._canvas.width,h.left=p,h.center=v,h.right=p,this._refreshDrawHeightConstants(),d.full=0,d.left=0,d.center=h.left,d.right=h.left+h.center}_refreshDrawHeightConstants(){g.full=Math.round(2*this._coreBrowserService.dpr);let p=this._canvas.height/this._bufferService.buffer.lines.length,v=Math.round(Math.max(Math.min(p,12),6)*this._coreBrowserService.dpr);g.left=v,g.center=v,g.right=v}_refreshColorZonePadding(){this._colorZoneStore.setPadding({full:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*g.full),left:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*g.left),center:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*g.center),right:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*g.right)}),this._lastKnownBufferLength=this._bufferService.buffers.normal.lines.length}_refreshCanvasDimensions(){this._canvas.style.width=`${this._width}px`,this._canvas.width=Math.round(this._width*this._coreBrowserService.dpr),this._canvas.style.height=`${this._screenElement.clientHeight}px`,this._canvas.height=Math.round(this._screenElement.clientHeight*this._coreBrowserService.dpr),this._refreshDrawConstants(),this._refreshColorZonePadding()}_refreshDecorations(){this._shouldUpdateDimensions&&this._refreshCanvasDimensions(),this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._colorZoneStore.clear();for(let v of this._decorationService.decorations)this._colorZoneStore.addDecoration(v);this._ctx.lineWidth=1;let p=this._colorZoneStore.zones;for(let v of p)v.position!=="full"&&this._renderColorZone(v);for(let v of p)v.position==="full"&&this._renderColorZone(v);this._shouldUpdateDimensions=!1,this._shouldUpdateAnchor=!1}_renderColorZone(p){this._ctx.fillStyle=p.color,this._ctx.fillRect(d[p.position||"full"],Math.round((this._canvas.height-1)*(p.startBufferLine/this._bufferService.buffers.active.lines.length)-g[p.position||"full"]/2),h[p.position||"full"],Math.round((this._canvas.height-1)*((p.endBufferLine-p.startBufferLine)/this._bufferService.buffers.active.lines.length)+g[p.position||"full"]))}_queueRefresh(p,v){this._shouldUpdateDimensions=p||this._shouldUpdateDimensions,this._shouldUpdateAnchor=v||this._shouldUpdateAnchor,this._animationFrame===void 0&&(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame((()=>{this._refreshDecorations(),this._animationFrame=void 0})))}};s.OverviewRulerRenderer=u=a([l(2,_.IBufferService),l(3,_.IDecorationService),l(4,f.IRenderService),l(5,_.IOptionsService),l(6,f.ICoreBrowserService)],u)},2950:function(o,s,n){var a=this&&this.__decorate||function(g,h,d,u){var p,v=arguments.length,x=v<3?h:u===null?u=Object.getOwnPropertyDescriptor(h,d):u;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(g,h,d,u);else for(var S=g.length-1;S>=0;S--)(p=g[S])&&(x=(v<3?p(x):v>3?p(h,d,x):p(h,d))||x);return v>3&&x&&Object.defineProperty(h,d,x),x},l=this&&this.__param||function(g,h){return function(d,u){h(d,u,g)}};Object.defineProperty(s,"__esModule",{value:!0}),s.CompositionHelper=void 0;let c=n(4725),f=n(2585),m=n(2584),_=s.CompositionHelper=class{get isComposing(){return this._isComposing}constructor(g,h,d,u,p,v){this._textarea=g,this._compositionView=h,this._bufferService=d,this._optionsService=u,this._coreService=p,this._renderService=v,this._isComposing=!1,this._isSendingComposition=!1,this._compositionPosition={start:0,end:0},this._dataAlreadySent=""}compositionstart(){this._isComposing=!0,this._compositionPosition.start=this._textarea.value.length,this._compositionView.textContent="",this._dataAlreadySent="",this._compositionView.classList.add("active")}compositionupdate(g){this._compositionView.textContent=g.data,this.updateCompositionElements(),setTimeout((()=>{this._compositionPosition.end=this._textarea.value.length}),0)}compositionend(){this._finalizeComposition(!0)}keydown(g){if(this._isComposing||this._isSendingComposition){if(g.keyCode===229||g.keyCode===16||g.keyCode===17||g.keyCode===18)return!1;this._finalizeComposition(!1)}return g.keyCode!==229||(this._handleAnyTextareaChanges(),!1)}_finalizeComposition(g){if(this._compositionView.classList.remove("active"),this._isComposing=!1,g){let h={start:this._compositionPosition.start,end:this._compositionPosition.end};this._isSendingComposition=!0,setTimeout((()=>{if(this._isSendingComposition){let d;this._isSendingComposition=!1,h.start+=this._dataAlreadySent.length,d=this._isComposing?this._textarea.value.substring(h.start,h.end):this._textarea.value.substring(h.start),d.length>0&&this._coreService.triggerDataEvent(d,!0)}}),0)}else{this._isSendingComposition=!1;let h=this._textarea.value.substring(this._compositionPosition.start,this._compositionPosition.end);this._coreService.triggerDataEvent(h,!0)}}_handleAnyTextareaChanges(){let g=this._textarea.value;setTimeout((()=>{if(!this._isComposing){let h=this._textarea.value,d=h.replace(g,"");this._dataAlreadySent=d,h.length>g.length?this._coreService.triggerDataEvent(d,!0):h.length<g.length?this._coreService.triggerDataEvent(`${m.C0.DEL}`,!0):h.length===g.length&&h!==g&&this._coreService.triggerDataEvent(h,!0)}}),0)}updateCompositionElements(g){if(this._isComposing){if(this._bufferService.buffer.isCursorInViewport){let h=Math.min(this._bufferService.buffer.x,this._bufferService.cols-1),d=this._renderService.dimensions.css.cell.height,u=this._bufferService.buffer.y*this._renderService.dimensions.css.cell.height,p=h*this._renderService.dimensions.css.cell.width;this._compositionView.style.left=p+"px",this._compositionView.style.top=u+"px",this._compositionView.style.height=d+"px",this._compositionView.style.lineHeight=d+"px",this._compositionView.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._compositionView.style.fontSize=this._optionsService.rawOptions.fontSize+"px";let v=this._compositionView.getBoundingClientRect();this._textarea.style.left=p+"px",this._textarea.style.top=u+"px",this._textarea.style.width=Math.max(v.width,1)+"px",this._textarea.style.height=Math.max(v.height,1)+"px",this._textarea.style.lineHeight=v.height+"px"}g||setTimeout((()=>this.updateCompositionElements(!0)),0)}}};s.CompositionHelper=_=a([l(2,f.IBufferService),l(3,f.IOptionsService),l(4,f.ICoreService),l(5,c.IRenderService)],_)},9806:(o,s)=>{function n(a,l,c){let f=c.getBoundingClientRect(),m=a.getComputedStyle(c),_=parseInt(m.getPropertyValue("padding-left")),g=parseInt(m.getPropertyValue("padding-top"));return[l.clientX-f.left-_,l.clientY-f.top-g]}Object.defineProperty(s,"__esModule",{value:!0}),s.getCoords=s.getCoordsRelativeToElement=void 0,s.getCoordsRelativeToElement=n,s.getCoords=function(a,l,c,f,m,_,g,h,d){if(!_)return;let u=n(a,l,c);return u?(u[0]=Math.ceil((u[0]+(d?g/2:0))/g),u[1]=Math.ceil(u[1]/h),u[0]=Math.min(Math.max(u[0],1),f+(d?1:0)),u[1]=Math.min(Math.max(u[1],1),m),u):void 0}},9504:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.moveToCellSequence=void 0;let a=n(2584);function l(h,d,u,p){let v=h-c(h,u),x=d-c(d,u),S=Math.abs(v-x)-(function(C,y,k){let D=0,$=C-c(C,k),F=y-c(y,k);for(let L=0;L<Math.abs($-F);L++){let V=f(C,y)==="A"?-1:1;k.buffer.lines.get($+V*L)?.isWrapped&&D++}return D})(h,d,u);return g(S,_(f(h,d),p))}function c(h,d){let u=0,p=d.buffer.lines.get(h),v=p?.isWrapped;for(;v&&h>=0&&h<d.rows;)u++,p=d.buffer.lines.get(--h),v=p?.isWrapped;return u}function f(h,d){return h>d?"A":"B"}function m(h,d,u,p,v,x){let S=h,C=d,y="";for(;S!==u||C!==p;)S+=v?1:-1,v&&S>x.cols-1?(y+=x.buffer.translateBufferLineToString(C,!1,h,S),S=0,h=0,C++):!v&&S<0&&(y+=x.buffer.translateBufferLineToString(C,!1,0,h+1),S=x.cols-1,h=S,C--);return y+x.buffer.translateBufferLineToString(C,!1,h,S)}function _(h,d){let u=d?"O":"[";return a.C0.ESC+u+h}function g(h,d){h=Math.floor(h);let u="";for(let p=0;p<h;p++)u+=d;return u}s.moveToCellSequence=function(h,d,u,p){let v=u.buffer.x,x=u.buffer.y;if(!u.buffer.hasScrollback)return(function(y,k,D,$,F,L){return l(k,$,F,L).length===0?"":g(m(y,k,y,k-c(k,F),!1,F).length,_("D",L))})(v,x,0,d,u,p)+l(x,d,u,p)+(function(y,k,D,$,F,L){let V;V=l(k,$,F,L).length>0?$-c($,F):k;let G=$,K=(function(re,J,A,B,P,N){let X;return X=l(A,B,P,N).length>0?B-c(B,P):J,re<A&&X<=B||re>=A&&X<B?"C":"D"})(y,k,D,$,F,L);return g(m(y,V,D,G,K==="C",F).length,_(K,L))})(v,x,h,d,u,p);let S;if(x===d)return S=v>h?"D":"C",g(Math.abs(v-h),_(S,p));S=x>d?"D":"C";let C=Math.abs(x-d);return g((function(y,k){return k.cols-y})(x>d?h:v,u)+(C-1)*u.cols+1+((x>d?v:h)-1),_(S,p))}},1296:function(o,s,n){var a=this&&this.__decorate||function(L,V,G,K){var re,J=arguments.length,A=J<3?V:K===null?K=Object.getOwnPropertyDescriptor(V,G):K;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")A=Reflect.decorate(L,V,G,K);else for(var B=L.length-1;B>=0;B--)(re=L[B])&&(A=(J<3?re(A):J>3?re(V,G,A):re(V,G))||A);return J>3&&A&&Object.defineProperty(V,G,A),A},l=this&&this.__param||function(L,V){return function(G,K){V(G,K,L)}};Object.defineProperty(s,"__esModule",{value:!0}),s.DomRenderer=void 0;let c=n(3787),f=n(2550),m=n(2223),_=n(6171),g=n(6052),h=n(4725),d=n(8055),u=n(8460),p=n(844),v=n(2585),x="xterm-dom-renderer-owner-",S="xterm-rows",C="xterm-fg-",y="xterm-bg-",k="xterm-focus",D="xterm-selection",$=1,F=s.DomRenderer=class extends p.Disposable{constructor(L,V,G,K,re,J,A,B,P,N,X,ie,ce){super(),this._terminal=L,this._document=V,this._element=G,this._screenElement=K,this._viewportElement=re,this._helperContainer=J,this._linkifier2=A,this._charSizeService=P,this._optionsService=N,this._bufferService=X,this._coreBrowserService=ie,this._themeService=ce,this._terminalClass=$++,this._rowElements=[],this._selectionRenderModel=(0,g.createSelectionRenderModel)(),this.onRequestRedraw=this.register(new u.EventEmitter).event,this._rowContainer=this._document.createElement("div"),this._rowContainer.classList.add(S),this._rowContainer.style.lineHeight="normal",this._rowContainer.setAttribute("aria-hidden","true"),this._refreshRowElements(this._bufferService.cols,this._bufferService.rows),this._selectionContainer=this._document.createElement("div"),this._selectionContainer.classList.add(D),this._selectionContainer.setAttribute("aria-hidden","true"),this.dimensions=(0,_.createRenderDimensions)(),this._updateDimensions(),this.register(this._optionsService.onOptionChange((()=>this._handleOptionsChanged()))),this.register(this._themeService.onChangeColors((ve=>this._injectCss(ve)))),this._injectCss(this._themeService.colors),this._rowFactory=B.createInstance(c.DomRendererRowFactory,document),this._element.classList.add(x+this._terminalClass),this._screenElement.appendChild(this._rowContainer),this._screenElement.appendChild(this._selectionContainer),this.register(this._linkifier2.onShowLinkUnderline((ve=>this._handleLinkHover(ve)))),this.register(this._linkifier2.onHideLinkUnderline((ve=>this._handleLinkLeave(ve)))),this.register((0,p.toDisposable)((()=>{this._element.classList.remove(x+this._terminalClass),this._rowContainer.remove(),this._selectionContainer.remove(),this._widthCache.dispose(),this._themeStyleElement.remove(),this._dimensionsStyleElement.remove()}))),this._widthCache=new f.WidthCache(this._document,this._helperContainer),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}_updateDimensions(){let L=this._coreBrowserService.dpr;this.dimensions.device.char.width=this._charSizeService.width*L,this.dimensions.device.char.height=Math.ceil(this._charSizeService.height*L),this.dimensions.device.cell.width=this.dimensions.device.char.width+Math.round(this._optionsService.rawOptions.letterSpacing),this.dimensions.device.cell.height=Math.floor(this.dimensions.device.char.height*this._optionsService.rawOptions.lineHeight),this.dimensions.device.char.left=0,this.dimensions.device.char.top=0,this.dimensions.device.canvas.width=this.dimensions.device.cell.width*this._bufferService.cols,this.dimensions.device.canvas.height=this.dimensions.device.cell.height*this._bufferService.rows,this.dimensions.css.canvas.width=Math.round(this.dimensions.device.canvas.width/L),this.dimensions.css.canvas.height=Math.round(this.dimensions.device.canvas.height/L),this.dimensions.css.cell.width=this.dimensions.css.canvas.width/this._bufferService.cols,this.dimensions.css.cell.height=this.dimensions.css.canvas.height/this._bufferService.rows;for(let G of this._rowElements)G.style.width=`${this.dimensions.css.canvas.width}px`,G.style.height=`${this.dimensions.css.cell.height}px`,G.style.lineHeight=`${this.dimensions.css.cell.height}px`,G.style.overflow="hidden";this._dimensionsStyleElement||(this._dimensionsStyleElement=this._document.createElement("style"),this._screenElement.appendChild(this._dimensionsStyleElement));let V=`${this._terminalSelector} .${S} span { display: inline-block; height: 100%; vertical-align: top;}`;this._dimensionsStyleElement.textContent=V,this._selectionContainer.style.height=this._viewportElement.style.height,this._screenElement.style.width=`${this.dimensions.css.canvas.width}px`,this._screenElement.style.height=`${this.dimensions.css.canvas.height}px`}_injectCss(L){this._themeStyleElement||(this._themeStyleElement=this._document.createElement("style"),this._screenElement.appendChild(this._themeStyleElement));let V=`${this._terminalSelector} .${S} { color: ${L.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;V+=`${this._terminalSelector} .${S} .xterm-dim { color: ${d.color.multiplyOpacity(L.foreground,.5).css};}`,V+=`${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;let G=`blink_underline_${this._terminalClass}`,K=`blink_bar_${this._terminalClass}`,re=`blink_block_${this._terminalClass}`;V+=`@keyframes ${G} { 50% {  border-bottom-style: hidden; }}`,V+=`@keyframes ${K} { 50% {  box-shadow: none; }}`,V+=`@keyframes ${re} { 0% {  background-color: ${L.cursor.css};  color: ${L.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${L.cursor.css}; }}`,V+=`${this._terminalSelector} .${S}.${k} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${G} 1s step-end infinite;}${this._terminalSelector} .${S}.${k} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${K} 1s step-end infinite;}${this._terminalSelector} .${S}.${k} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${re} 1s step-end infinite;}${this._terminalSelector} .${S} .xterm-cursor.xterm-cursor-block { background-color: ${L.cursor.css}; color: ${L.cursorAccent.css};}${this._terminalSelector} .${S} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${L.cursor.css} !important; color: ${L.cursorAccent.css} !important;}${this._terminalSelector} .${S} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${L.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${S} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${L.cursor.css} inset;}${this._terminalSelector} .${S} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${L.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`,V+=`${this._terminalSelector} .${D} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${D} div { position: absolute; background-color: ${L.selectionBackgroundOpaque.css};}${this._terminalSelector} .${D} div { position: absolute; background-color: ${L.selectionInactiveBackgroundOpaque.css};}`;for(let[J,A]of L.ansi.entries())V+=`${this._terminalSelector} .${C}${J} { color: ${A.css}; }${this._terminalSelector} .${C}${J}.xterm-dim { color: ${d.color.multiplyOpacity(A,.5).css}; }${this._terminalSelector} .${y}${J} { background-color: ${A.css}; }`;V+=`${this._terminalSelector} .${C}${m.INVERTED_DEFAULT_COLOR} { color: ${d.color.opaque(L.background).css}; }${this._terminalSelector} .${C}${m.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${d.color.multiplyOpacity(d.color.opaque(L.background),.5).css}; }${this._terminalSelector} .${y}${m.INVERTED_DEFAULT_COLOR} { background-color: ${L.foreground.css}; }`,this._themeStyleElement.textContent=V}_setDefaultSpacing(){let L=this.dimensions.css.cell.width-this._widthCache.get("W",!1,!1);this._rowContainer.style.letterSpacing=`${L}px`,this._rowFactory.defaultSpacing=L}handleDevicePixelRatioChange(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}_refreshRowElements(L,V){for(let G=this._rowElements.length;G<=V;G++){let K=this._document.createElement("div");this._rowContainer.appendChild(K),this._rowElements.push(K)}for(;this._rowElements.length>V;)this._rowContainer.removeChild(this._rowElements.pop())}handleResize(L,V){this._refreshRowElements(L,V),this._updateDimensions(),this.handleSelectionChanged(this._selectionRenderModel.selectionStart,this._selectionRenderModel.selectionEnd,this._selectionRenderModel.columnSelectMode)}handleCharSizeChanged(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}handleBlur(){this._rowContainer.classList.remove(k),this.renderRows(0,this._bufferService.rows-1)}handleFocus(){this._rowContainer.classList.add(k),this.renderRows(this._bufferService.buffer.y,this._bufferService.buffer.y)}handleSelectionChanged(L,V,G){if(this._selectionContainer.replaceChildren(),this._rowFactory.handleSelectionChanged(L,V,G),this.renderRows(0,this._bufferService.rows-1),!L||!V)return;this._selectionRenderModel.update(this._terminal,L,V,G);let K=this._selectionRenderModel.viewportStartRow,re=this._selectionRenderModel.viewportEndRow,J=this._selectionRenderModel.viewportCappedStartRow,A=this._selectionRenderModel.viewportCappedEndRow;if(J>=this._bufferService.rows||A<0)return;let B=this._document.createDocumentFragment();if(G){let P=L[0]>V[0];B.appendChild(this._createSelectionElement(J,P?V[0]:L[0],P?L[0]:V[0],A-J+1))}else{let P=K===J?L[0]:0,N=J===re?V[0]:this._bufferService.cols;B.appendChild(this._createSelectionElement(J,P,N));let X=A-J-1;if(B.appendChild(this._createSelectionElement(J+1,0,this._bufferService.cols,X)),J!==A){let ie=re===A?V[0]:this._bufferService.cols;B.appendChild(this._createSelectionElement(A,0,ie))}}this._selectionContainer.appendChild(B)}_createSelectionElement(L,V,G,K=1){let re=this._document.createElement("div"),J=V*this.dimensions.css.cell.width,A=this.dimensions.css.cell.width*(G-V);return J+A>this.dimensions.css.canvas.width&&(A=this.dimensions.css.canvas.width-J),re.style.height=K*this.dimensions.css.cell.height+"px",re.style.top=L*this.dimensions.css.cell.height+"px",re.style.left=`${J}px`,re.style.width=`${A}px`,re}handleCursorMove(){}_handleOptionsChanged(){this._updateDimensions(),this._injectCss(this._themeService.colors),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}clear(){for(let L of this._rowElements)L.replaceChildren()}renderRows(L,V){let G=this._bufferService.buffer,K=G.ybase+G.y,re=Math.min(G.x,this._bufferService.cols-1),J=this._optionsService.rawOptions.cursorBlink,A=this._optionsService.rawOptions.cursorStyle,B=this._optionsService.rawOptions.cursorInactiveStyle;for(let P=L;P<=V;P++){let N=P+G.ydisp,X=this._rowElements[P],ie=G.lines.get(N);if(!X||!ie)break;X.replaceChildren(...this._rowFactory.createRow(ie,N,N===K,A,B,re,J,this.dimensions.css.cell.width,this._widthCache,-1,-1))}}get _terminalSelector(){return`.${x}${this._terminalClass}`}_handleLinkHover(L){this._setCellUnderline(L.x1,L.x2,L.y1,L.y2,L.cols,!0)}_handleLinkLeave(L){this._setCellUnderline(L.x1,L.x2,L.y1,L.y2,L.cols,!1)}_setCellUnderline(L,V,G,K,re,J){G<0&&(L=0),K<0&&(V=0);let A=this._bufferService.rows-1;G=Math.max(Math.min(G,A),0),K=Math.max(Math.min(K,A),0),re=Math.min(re,this._bufferService.cols);let B=this._bufferService.buffer,P=B.ybase+B.y,N=Math.min(B.x,re-1),X=this._optionsService.rawOptions.cursorBlink,ie=this._optionsService.rawOptions.cursorStyle,ce=this._optionsService.rawOptions.cursorInactiveStyle;for(let ve=G;ve<=K;++ve){let q=ve+B.ydisp,R=this._rowElements[ve],j=B.lines.get(q);if(!R||!j)break;R.replaceChildren(...this._rowFactory.createRow(j,q,q===P,ie,ce,N,X,this.dimensions.css.cell.width,this._widthCache,J?ve===G?L:0:-1,J?(ve===K?V:re)-1:-1))}}};s.DomRenderer=F=a([l(7,v.IInstantiationService),l(8,h.ICharSizeService),l(9,v.IOptionsService),l(10,v.IBufferService),l(11,h.ICoreBrowserService),l(12,h.IThemeService)],F)},3787:function(o,s,n){var a=this&&this.__decorate||function(S,C,y,k){var D,$=arguments.length,F=$<3?C:k===null?k=Object.getOwnPropertyDescriptor(C,y):k;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")F=Reflect.decorate(S,C,y,k);else for(var L=S.length-1;L>=0;L--)(D=S[L])&&(F=($<3?D(F):$>3?D(C,y,F):D(C,y))||F);return $>3&&F&&Object.defineProperty(C,y,F),F},l=this&&this.__param||function(S,C){return function(y,k){C(y,k,S)}};Object.defineProperty(s,"__esModule",{value:!0}),s.DomRendererRowFactory=void 0;let c=n(2223),f=n(643),m=n(511),_=n(2585),g=n(8055),h=n(4725),d=n(4269),u=n(6171),p=n(3734),v=s.DomRendererRowFactory=class{constructor(S,C,y,k,D,$,F){this._document=S,this._characterJoinerService=C,this._optionsService=y,this._coreBrowserService=k,this._coreService=D,this._decorationService=$,this._themeService=F,this._workCell=new m.CellData,this._columnSelectMode=!1,this.defaultSpacing=0}handleSelectionChanged(S,C,y){this._selectionStart=S,this._selectionEnd=C,this._columnSelectMode=y}createRow(S,C,y,k,D,$,F,L,V,G,K){let re=[],J=this._characterJoinerService.getJoinedCharacters(C),A=this._themeService.colors,B,P=S.getNoBgTrimmedLength();y&&P<$+1&&(P=$+1);let N=0,X="",ie=0,ce=0,ve=0,q=!1,R=0,j=!1,Z=0,ne=[],oe=G!==-1&&K!==-1;for(let Ee=0;Ee<P;Ee++){S.loadCell(Ee,this._workCell);let He=this._workCell.getWidth();if(He===0)continue;let Fe=!1,it=Ee,xe=this._workCell;if(J.length>0&&Ee===J[0][0]){Fe=!0;let Ue=J.shift();xe=new d.JoinedCellData(this._workCell,S.translateToString(!0,Ue[0],Ue[1]),Ue[1]-Ue[0]),it=Ue[1]-1,He=xe.getWidth()}let Dr=this._isCellInSelection(Ee,C),Zr=y&&Ee===$,Lr=oe&&Ee>=G&&Ee<=K,$r=!1;this._decorationService.forEachDecorationAtCell(Ee,C,void 0,(Ue=>{$r=!0}));let Gs=xe.getChars()||f.WHITESPACE_CELL_CHAR;if(Gs===" "&&(xe.isUnderline()||xe.isOverline())&&(Gs="\xA0"),Z=He*L-V.get(Gs,xe.isBold(),xe.isItalic()),B){if(N&&(Dr&&j||!Dr&&!j&&xe.bg===ie)&&(Dr&&j&&A.selectionForeground||xe.fg===ce)&&xe.extended.ext===ve&&Lr===q&&Z===R&&!Zr&&!Fe&&!$r){xe.isInvisible()?X+=f.WHITESPACE_CELL_CHAR:X+=Gs,N++;continue}N&&(B.textContent=X),B=this._document.createElement("span"),N=0,X=""}else B=this._document.createElement("span");if(ie=xe.bg,ce=xe.fg,ve=xe.extended.ext,q=Lr,R=Z,j=Dr,Fe&&$>=Ee&&$<=it&&($=Ee),!this._coreService.isCursorHidden&&Zr&&this._coreService.isCursorInitialized){if(ne.push("xterm-cursor"),this._coreBrowserService.isFocused)F&&ne.push("xterm-cursor-blink"),ne.push(k==="bar"?"xterm-cursor-bar":k==="underline"?"xterm-cursor-underline":"xterm-cursor-block");else if(D)switch(D){case"outline":ne.push("xterm-cursor-outline");break;case"block":ne.push("xterm-cursor-block");break;case"bar":ne.push("xterm-cursor-bar");break;case"underline":ne.push("xterm-cursor-underline")}}if(xe.isBold()&&ne.push("xterm-bold"),xe.isItalic()&&ne.push("xterm-italic"),xe.isDim()&&ne.push("xterm-dim"),X=xe.isInvisible()?f.WHITESPACE_CELL_CHAR:xe.getChars()||f.WHITESPACE_CELL_CHAR,xe.isUnderline()&&(ne.push(`xterm-underline-${xe.extended.underlineStyle}`),X===" "&&(X="\xA0"),!xe.isUnderlineColorDefault()))if(xe.isUnderlineColorRGB())B.style.textDecorationColor=`rgb(${p.AttributeData.toColorRGB(xe.getUnderlineColor()).join(",")})`;else{let Ue=xe.getUnderlineColor();this._optionsService.rawOptions.drawBoldTextInBrightColors&&xe.isBold()&&Ue<8&&(Ue+=8),B.style.textDecorationColor=A.ansi[Ue].css}xe.isOverline()&&(ne.push("xterm-overline"),X===" "&&(X="\xA0")),xe.isStrikethrough()&&ne.push("xterm-strikethrough"),Lr&&(B.style.textDecoration="underline");let Bt=xe.getFgColor(),Xi=xe.getFgColorMode(),tr=xe.getBgColor(),Yi=xe.getBgColorMode(),Cn=!!xe.isInverse();if(Cn){let Ue=Bt;Bt=tr,tr=Ue;let gp=Xi;Xi=Yi,Yi=gp}let Br,Ks,zr,Zi=!1;switch(this._decorationService.forEachDecorationAtCell(Ee,C,void 0,(Ue=>{Ue.options.layer!=="top"&&Zi||(Ue.backgroundColorRGB&&(Yi=50331648,tr=Ue.backgroundColorRGB.rgba>>8&16777215,Br=Ue.backgroundColorRGB),Ue.foregroundColorRGB&&(Xi=50331648,Bt=Ue.foregroundColorRGB.rgba>>8&16777215,Ks=Ue.foregroundColorRGB),Zi=Ue.options.layer==="top")})),!Zi&&Dr&&(Br=this._coreBrowserService.isFocused?A.selectionBackgroundOpaque:A.selectionInactiveBackgroundOpaque,tr=Br.rgba>>8&16777215,Yi=50331648,Zi=!0,A.selectionForeground&&(Xi=50331648,Bt=A.selectionForeground.rgba>>8&16777215,Ks=A.selectionForeground)),Zi&&ne.push("xterm-decoration-top"),Yi){case 16777216:case 33554432:zr=A.ansi[tr],ne.push(`xterm-bg-${tr}`);break;case 50331648:zr=g.channels.toColor(tr>>16,tr>>8&255,255&tr),this._addStyle(B,`background-color:#${x((tr>>>0).toString(16),"0",6)}`);break;default:Cn?(zr=A.foreground,ne.push(`xterm-bg-${c.INVERTED_DEFAULT_COLOR}`)):zr=A.background}switch(Br||xe.isDim()&&(Br=g.color.multiplyOpacity(zr,.5)),Xi){case 16777216:case 33554432:xe.isBold()&&Bt<8&&this._optionsService.rawOptions.drawBoldTextInBrightColors&&(Bt+=8),this._applyMinimumContrast(B,zr,A.ansi[Bt],xe,Br,void 0)||ne.push(`xterm-fg-${Bt}`);break;case 50331648:let Ue=g.channels.toColor(Bt>>16&255,Bt>>8&255,255&Bt);this._applyMinimumContrast(B,zr,Ue,xe,Br,Ks)||this._addStyle(B,`color:#${x(Bt.toString(16),"0",6)}`);break;default:this._applyMinimumContrast(B,zr,A.foreground,xe,Br,Ks)||Cn&&ne.push(`xterm-fg-${c.INVERTED_DEFAULT_COLOR}`)}ne.length&&(B.className=ne.join(" "),ne.length=0),Zr||Fe||$r?B.textContent=X:N++,Z!==this.defaultSpacing&&(B.style.letterSpacing=`${Z}px`),re.push(B),Ee=it}return B&&N&&(B.textContent=X),re}_applyMinimumContrast(S,C,y,k,D,$){if(this._optionsService.rawOptions.minimumContrastRatio===1||(0,u.treatGlyphAsBackgroundColor)(k.getCode()))return!1;let F=this._getContrastCache(k),L;if(D||$||(L=F.getColor(C.rgba,y.rgba)),L===void 0){let V=this._optionsService.rawOptions.minimumContrastRatio/(k.isDim()?2:1);L=g.color.ensureContrastRatio(D||C,$||y,V),F.setColor((D||C).rgba,($||y).rgba,L??null)}return!!L&&(this._addStyle(S,`color:${L.css}`),!0)}_getContrastCache(S){return S.isDim()?this._themeService.colors.halfContrastCache:this._themeService.colors.contrastCache}_addStyle(S,C){S.setAttribute("style",`${S.getAttribute("style")||""}${C};`)}_isCellInSelection(S,C){let y=this._selectionStart,k=this._selectionEnd;return!(!y||!k)&&(this._columnSelectMode?y[0]<=k[0]?S>=y[0]&&C>=y[1]&&S<k[0]&&C<=k[1]:S<y[0]&&C>=y[1]&&S>=k[0]&&C<=k[1]:C>y[1]&&C<k[1]||y[1]===k[1]&&C===y[1]&&S>=y[0]&&S<k[0]||y[1]<k[1]&&C===k[1]&&S<k[0]||y[1]<k[1]&&C===y[1]&&S>=y[0])}};function x(S,C,y){for(;S.length<y;)S=C+S;return S}s.DomRendererRowFactory=v=a([l(1,h.ICharacterJoinerService),l(2,_.IOptionsService),l(3,h.ICoreBrowserService),l(4,_.ICoreService),l(5,_.IDecorationService),l(6,h.IThemeService)],v)},2550:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.WidthCache=void 0,s.WidthCache=class{constructor(n,a){this._flat=new Float32Array(256),this._font="",this._fontSize=0,this._weight="normal",this._weightBold="bold",this._measureElements=[],this._container=n.createElement("div"),this._container.classList.add("xterm-width-cache-measure-container"),this._container.setAttribute("aria-hidden","true"),this._container.style.whiteSpace="pre",this._container.style.fontKerning="none";let l=n.createElement("span");l.classList.add("xterm-char-measure-element");let c=n.createElement("span");c.classList.add("xterm-char-measure-element"),c.style.fontWeight="bold";let f=n.createElement("span");f.classList.add("xterm-char-measure-element"),f.style.fontStyle="italic";let m=n.createElement("span");m.classList.add("xterm-char-measure-element"),m.style.fontWeight="bold",m.style.fontStyle="italic",this._measureElements=[l,c,f,m],this._container.appendChild(l),this._container.appendChild(c),this._container.appendChild(f),this._container.appendChild(m),a.appendChild(this._container),this.clear()}dispose(){this._container.remove(),this._measureElements.length=0,this._holey=void 0}clear(){this._flat.fill(-9999),this._holey=new Map}setFont(n,a,l,c){n===this._font&&a===this._fontSize&&l===this._weight&&c===this._weightBold||(this._font=n,this._fontSize=a,this._weight=l,this._weightBold=c,this._container.style.fontFamily=this._font,this._container.style.fontSize=`${this._fontSize}px`,this._measureElements[0].style.fontWeight=`${l}`,this._measureElements[1].style.fontWeight=`${c}`,this._measureElements[2].style.fontWeight=`${l}`,this._measureElements[3].style.fontWeight=`${c}`,this.clear())}get(n,a,l){let c=0;if(!a&&!l&&n.length===1&&(c=n.charCodeAt(0))<256){if(this._flat[c]!==-9999)return this._flat[c];let _=this._measure(n,0);return _>0&&(this._flat[c]=_),_}let f=n;a&&(f+="B"),l&&(f+="I");let m=this._holey.get(f);if(m===void 0){let _=0;a&&(_|=1),l&&(_|=2),m=this._measure(n,_),m>0&&this._holey.set(f,m)}return m}_measure(n,a){let l=this._measureElements[a];return l.textContent=n.repeat(32),l.offsetWidth/32}}},2223:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.TEXT_BASELINE=s.DIM_OPACITY=s.INVERTED_DEFAULT_COLOR=void 0;let a=n(6114);s.INVERTED_DEFAULT_COLOR=257,s.DIM_OPACITY=.5,s.TEXT_BASELINE=a.isFirefox||a.isLegacyEdge?"bottom":"ideographic"},6171:(o,s)=>{function n(l){return 57508<=l&&l<=57558}function a(l){return l>=128512&&l<=128591||l>=127744&&l<=128511||l>=128640&&l<=128767||l>=9728&&l<=9983||l>=9984&&l<=10175||l>=65024&&l<=65039||l>=129280&&l<=129535||l>=127462&&l<=127487}Object.defineProperty(s,"__esModule",{value:!0}),s.computeNextVariantOffset=s.createRenderDimensions=s.treatGlyphAsBackgroundColor=s.allowRescaling=s.isEmoji=s.isRestrictedPowerlineGlyph=s.isPowerlineGlyph=s.throwIfFalsy=void 0,s.throwIfFalsy=function(l){if(!l)throw new Error("value must not be falsy");return l},s.isPowerlineGlyph=n,s.isRestrictedPowerlineGlyph=function(l){return 57520<=l&&l<=57527},s.isEmoji=a,s.allowRescaling=function(l,c,f,m){return c===1&&f>Math.ceil(1.5*m)&&l!==void 0&&l>255&&!a(l)&&!n(l)&&!(function(_){return 57344<=_&&_<=63743})(l)},s.treatGlyphAsBackgroundColor=function(l){return n(l)||(function(c){return 9472<=c&&c<=9631})(l)},s.createRenderDimensions=function(){return{css:{canvas:{width:0,height:0},cell:{width:0,height:0}},device:{canvas:{width:0,height:0},cell:{width:0,height:0},char:{width:0,height:0,left:0,top:0}}}},s.computeNextVariantOffset=function(l,c,f=0){return(l-(2*Math.round(c)-f))%(2*Math.round(c))}},6052:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.createSelectionRenderModel=void 0;class n{constructor(){this.clear()}clear(){this.hasSelection=!1,this.columnSelectMode=!1,this.viewportStartRow=0,this.viewportEndRow=0,this.viewportCappedStartRow=0,this.viewportCappedEndRow=0,this.startCol=0,this.endCol=0,this.selectionStart=void 0,this.selectionEnd=void 0}update(l,c,f,m=!1){if(this.selectionStart=c,this.selectionEnd=f,!c||!f||c[0]===f[0]&&c[1]===f[1])return void this.clear();let _=l.buffers.active.ydisp,g=c[1]-_,h=f[1]-_,d=Math.max(g,0),u=Math.min(h,l.rows-1);d>=l.rows||u<0?this.clear():(this.hasSelection=!0,this.columnSelectMode=m,this.viewportStartRow=g,this.viewportEndRow=h,this.viewportCappedStartRow=d,this.viewportCappedEndRow=u,this.startCol=c[0],this.endCol=f[0])}isCellSelected(l,c,f){return!!this.hasSelection&&(f-=l.buffer.active.viewportY,this.columnSelectMode?this.startCol<=this.endCol?c>=this.startCol&&f>=this.viewportCappedStartRow&&c<this.endCol&&f<=this.viewportCappedEndRow:c<this.startCol&&f>=this.viewportCappedStartRow&&c>=this.endCol&&f<=this.viewportCappedEndRow:f>this.viewportStartRow&&f<this.viewportEndRow||this.viewportStartRow===this.viewportEndRow&&f===this.viewportStartRow&&c>=this.startCol&&c<this.endCol||this.viewportStartRow<this.viewportEndRow&&f===this.viewportEndRow&&c<this.endCol||this.viewportStartRow<this.viewportEndRow&&f===this.viewportStartRow&&c>=this.startCol)}}s.createSelectionRenderModel=function(){return new n}},456:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.SelectionModel=void 0,s.SelectionModel=class{constructor(n){this._bufferService=n,this.isSelectAllActive=!1,this.selectionStartLength=0}clearSelection(){this.selectionStart=void 0,this.selectionEnd=void 0,this.isSelectAllActive=!1,this.selectionStartLength=0}get finalSelectionStart(){return this.isSelectAllActive?[0,0]:this.selectionEnd&&this.selectionStart&&this.areSelectionValuesReversed()?this.selectionEnd:this.selectionStart}get finalSelectionEnd(){if(this.isSelectAllActive)return[this._bufferService.cols,this._bufferService.buffer.ybase+this._bufferService.rows-1];if(this.selectionStart){if(!this.selectionEnd||this.areSelectionValuesReversed()){let n=this.selectionStart[0]+this.selectionStartLength;return n>this._bufferService.cols?n%this._bufferService.cols==0?[this._bufferService.cols,this.selectionStart[1]+Math.floor(n/this._bufferService.cols)-1]:[n%this._bufferService.cols,this.selectionStart[1]+Math.floor(n/this._bufferService.cols)]:[n,this.selectionStart[1]]}if(this.selectionStartLength&&this.selectionEnd[1]===this.selectionStart[1]){let n=this.selectionStart[0]+this.selectionStartLength;return n>this._bufferService.cols?[n%this._bufferService.cols,this.selectionStart[1]+Math.floor(n/this._bufferService.cols)]:[Math.max(n,this.selectionEnd[0]),this.selectionEnd[1]]}return this.selectionEnd}}areSelectionValuesReversed(){let n=this.selectionStart,a=this.selectionEnd;return!(!n||!a)&&(n[1]>a[1]||n[1]===a[1]&&n[0]>a[0])}handleTrim(n){return this.selectionStart&&(this.selectionStart[1]-=n),this.selectionEnd&&(this.selectionEnd[1]-=n),this.selectionEnd&&this.selectionEnd[1]<0?(this.clearSelection(),!0):(this.selectionStart&&this.selectionStart[1]<0&&(this.selectionStart[1]=0),!1)}}},428:function(o,s,n){var a=this&&this.__decorate||function(u,p,v,x){var S,C=arguments.length,y=C<3?p:x===null?x=Object.getOwnPropertyDescriptor(p,v):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")y=Reflect.decorate(u,p,v,x);else for(var k=u.length-1;k>=0;k--)(S=u[k])&&(y=(C<3?S(y):C>3?S(p,v,y):S(p,v))||y);return C>3&&y&&Object.defineProperty(p,v,y),y},l=this&&this.__param||function(u,p){return function(v,x){p(v,x,u)}};Object.defineProperty(s,"__esModule",{value:!0}),s.CharSizeService=void 0;let c=n(2585),f=n(8460),m=n(844),_=s.CharSizeService=class extends m.Disposable{get hasValidSize(){return this.width>0&&this.height>0}constructor(u,p,v){super(),this._optionsService=v,this.width=0,this.height=0,this._onCharSizeChange=this.register(new f.EventEmitter),this.onCharSizeChange=this._onCharSizeChange.event;try{this._measureStrategy=this.register(new d(this._optionsService))}catch{this._measureStrategy=this.register(new h(u,p,this._optionsService))}this.register(this._optionsService.onMultipleOptionChange(["fontFamily","fontSize"],(()=>this.measure())))}measure(){let u=this._measureStrategy.measure();u.width===this.width&&u.height===this.height||(this.width=u.width,this.height=u.height,this._onCharSizeChange.fire())}};s.CharSizeService=_=a([l(2,c.IOptionsService)],_);class g extends m.Disposable{constructor(){super(...arguments),this._result={width:0,height:0}}_validateAndSet(p,v){p!==void 0&&p>0&&v!==void 0&&v>0&&(this._result.width=p,this._result.height=v)}}class h extends g{constructor(p,v,x){super(),this._document=p,this._parentElement=v,this._optionsService=x,this._measureElement=this._document.createElement("span"),this._measureElement.classList.add("xterm-char-measure-element"),this._measureElement.textContent="W".repeat(32),this._measureElement.setAttribute("aria-hidden","true"),this._measureElement.style.whiteSpace="pre",this._measureElement.style.fontKerning="none",this._parentElement.appendChild(this._measureElement)}measure(){return this._measureElement.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._measureElement.style.fontSize=`${this._optionsService.rawOptions.fontSize}px`,this._validateAndSet(Number(this._measureElement.offsetWidth)/32,Number(this._measureElement.offsetHeight)),this._result}}class d extends g{constructor(p){super(),this._optionsService=p,this._canvas=new OffscreenCanvas(100,100),this._ctx=this._canvas.getContext("2d");let v=this._ctx.measureText("W");if(!("width"in v&&"fontBoundingBoxAscent"in v&&"fontBoundingBoxDescent"in v))throw new Error("Required font metrics not supported")}measure(){this._ctx.font=`${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;let p=this._ctx.measureText("W");return this._validateAndSet(p.width,p.fontBoundingBoxAscent+p.fontBoundingBoxDescent),this._result}}},4269:function(o,s,n){var a=this&&this.__decorate||function(d,u,p,v){var x,S=arguments.length,C=S<3?u:v===null?v=Object.getOwnPropertyDescriptor(u,p):v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")C=Reflect.decorate(d,u,p,v);else for(var y=d.length-1;y>=0;y--)(x=d[y])&&(C=(S<3?x(C):S>3?x(u,p,C):x(u,p))||C);return S>3&&C&&Object.defineProperty(u,p,C),C},l=this&&this.__param||function(d,u){return function(p,v){u(p,v,d)}};Object.defineProperty(s,"__esModule",{value:!0}),s.CharacterJoinerService=s.JoinedCellData=void 0;let c=n(3734),f=n(643),m=n(511),_=n(2585);class g extends c.AttributeData{constructor(u,p,v){super(),this.content=0,this.combinedData="",this.fg=u.fg,this.bg=u.bg,this.combinedData=p,this._width=v}isCombined(){return 2097152}getWidth(){return this._width}getChars(){return this.combinedData}getCode(){return 2097151}setFromCharData(u){throw new Error("not implemented")}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}s.JoinedCellData=g;let h=s.CharacterJoinerService=class D0{constructor(u){this._bufferService=u,this._characterJoiners=[],this._nextCharacterJoinerId=0,this._workCell=new m.CellData}register(u){let p={id:this._nextCharacterJoinerId++,handler:u};return this._characterJoiners.push(p),p.id}deregister(u){for(let p=0;p<this._characterJoiners.length;p++)if(this._characterJoiners[p].id===u)return this._characterJoiners.splice(p,1),!0;return!1}getJoinedCharacters(u){if(this._characterJoiners.length===0)return[];let p=this._bufferService.buffer.lines.get(u);if(!p||p.length===0)return[];let v=[],x=p.translateToString(!0),S=0,C=0,y=0,k=p.getFg(0),D=p.getBg(0);for(let $=0;$<p.getTrimmedLength();$++)if(p.loadCell($,this._workCell),this._workCell.getWidth()!==0){if(this._workCell.fg!==k||this._workCell.bg!==D){if($-S>1){let F=this._getJoinedRanges(x,y,C,p,S);for(let L=0;L<F.length;L++)v.push(F[L])}S=$,y=C,k=this._workCell.fg,D=this._workCell.bg}C+=this._workCell.getChars().length||f.WHITESPACE_CELL_CHAR.length}if(this._bufferService.cols-S>1){let $=this._getJoinedRanges(x,y,C,p,S);for(let F=0;F<$.length;F++)v.push($[F])}return v}_getJoinedRanges(u,p,v,x,S){let C=u.substring(p,v),y=[];try{y=this._characterJoiners[0].handler(C)}catch(k){console.error(k)}for(let k=1;k<this._characterJoiners.length;k++)try{let D=this._characterJoiners[k].handler(C);for(let $=0;$<D.length;$++)D0._mergeRanges(y,D[$])}catch(D){console.error(D)}return this._stringRangesToCellRanges(y,x,S),y}_stringRangesToCellRanges(u,p,v){let x=0,S=!1,C=0,y=u[x];if(y){for(let k=v;k<this._bufferService.cols;k++){let D=p.getWidth(k),$=p.getString(k).length||f.WHITESPACE_CELL_CHAR.length;if(D!==0){if(!S&&y[0]<=C&&(y[0]=k,S=!0),y[1]<=C){if(y[1]=k,y=u[++x],!y)break;y[0]<=C?(y[0]=k,S=!0):S=!1}C+=$}}y&&(y[1]=this._bufferService.cols)}}static _mergeRanges(u,p){let v=!1;for(let x=0;x<u.length;x++){let S=u[x];if(v){if(p[1]<=S[0])return u[x-1][1]=p[1],u;if(p[1]<=S[1])return u[x-1][1]=Math.max(p[1],S[1]),u.splice(x,1),u;u.splice(x,1),x--}else{if(p[1]<=S[0])return u.splice(x,0,p),u;if(p[1]<=S[1])return S[0]=Math.min(p[0],S[0]),u;p[0]<S[1]&&(S[0]=Math.min(p[0],S[0]),v=!0)}}return v?u[u.length-1][1]=p[1]:u.push(p),u}};s.CharacterJoinerService=h=a([l(0,_.IBufferService)],h)},5114:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.CoreBrowserService=void 0;let a=n(844),l=n(8460),c=n(3656);class f extends a.Disposable{constructor(g,h,d){super(),this._textarea=g,this._window=h,this.mainDocument=d,this._isFocused=!1,this._cachedIsFocused=void 0,this._screenDprMonitor=new m(this._window),this._onDprChange=this.register(new l.EventEmitter),this.onDprChange=this._onDprChange.event,this._onWindowChange=this.register(new l.EventEmitter),this.onWindowChange=this._onWindowChange.event,this.register(this.onWindowChange((u=>this._screenDprMonitor.setWindow(u)))),this.register((0,l.forwardEvent)(this._screenDprMonitor.onDprChange,this._onDprChange)),this._textarea.addEventListener("focus",(()=>this._isFocused=!0)),this._textarea.addEventListener("blur",(()=>this._isFocused=!1))}get window(){return this._window}set window(g){this._window!==g&&(this._window=g,this._onWindowChange.fire(this._window))}get dpr(){return this.window.devicePixelRatio}get isFocused(){return this._cachedIsFocused===void 0&&(this._cachedIsFocused=this._isFocused&&this._textarea.ownerDocument.hasFocus(),queueMicrotask((()=>this._cachedIsFocused=void 0))),this._cachedIsFocused}}s.CoreBrowserService=f;class m extends a.Disposable{constructor(g){super(),this._parentWindow=g,this._windowResizeListener=this.register(new a.MutableDisposable),this._onDprChange=this.register(new l.EventEmitter),this.onDprChange=this._onDprChange.event,this._outerListener=()=>this._setDprAndFireIfDiffers(),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._updateDpr(),this._setWindowResizeListener(),this.register((0,a.toDisposable)((()=>this.clearListener())))}setWindow(g){this._parentWindow=g,this._setWindowResizeListener(),this._setDprAndFireIfDiffers()}_setWindowResizeListener(){this._windowResizeListener.value=(0,c.addDisposableDomListener)(this._parentWindow,"resize",(()=>this._setDprAndFireIfDiffers()))}_setDprAndFireIfDiffers(){this._parentWindow.devicePixelRatio!==this._currentDevicePixelRatio&&this._onDprChange.fire(this._parentWindow.devicePixelRatio),this._updateDpr()}_updateDpr(){this._outerListener&&(this._resolutionMediaMatchList?.removeListener(this._outerListener),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._resolutionMediaMatchList=this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`),this._resolutionMediaMatchList.addListener(this._outerListener))}clearListener(){this._resolutionMediaMatchList&&this._outerListener&&(this._resolutionMediaMatchList.removeListener(this._outerListener),this._resolutionMediaMatchList=void 0,this._outerListener=void 0)}}},779:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.LinkProviderService=void 0;let a=n(844);class l extends a.Disposable{constructor(){super(),this.linkProviders=[],this.register((0,a.toDisposable)((()=>this.linkProviders.length=0)))}registerLinkProvider(f){return this.linkProviders.push(f),{dispose:()=>{let m=this.linkProviders.indexOf(f);m!==-1&&this.linkProviders.splice(m,1)}}}}s.LinkProviderService=l},8934:function(o,s,n){var a=this&&this.__decorate||function(_,g,h,d){var u,p=arguments.length,v=p<3?g:d===null?d=Object.getOwnPropertyDescriptor(g,h):d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")v=Reflect.decorate(_,g,h,d);else for(var x=_.length-1;x>=0;x--)(u=_[x])&&(v=(p<3?u(v):p>3?u(g,h,v):u(g,h))||v);return p>3&&v&&Object.defineProperty(g,h,v),v},l=this&&this.__param||function(_,g){return function(h,d){g(h,d,_)}};Object.defineProperty(s,"__esModule",{value:!0}),s.MouseService=void 0;let c=n(4725),f=n(9806),m=s.MouseService=class{constructor(_,g){this._renderService=_,this._charSizeService=g}getCoords(_,g,h,d,u){return(0,f.getCoords)(window,_,g,h,d,this._charSizeService.hasValidSize,this._renderService.dimensions.css.cell.width,this._renderService.dimensions.css.cell.height,u)}getMouseReportCoords(_,g){let h=(0,f.getCoordsRelativeToElement)(window,_,g);if(this._charSizeService.hasValidSize)return h[0]=Math.min(Math.max(h[0],0),this._renderService.dimensions.css.canvas.width-1),h[1]=Math.min(Math.max(h[1],0),this._renderService.dimensions.css.canvas.height-1),{col:Math.floor(h[0]/this._renderService.dimensions.css.cell.width),row:Math.floor(h[1]/this._renderService.dimensions.css.cell.height),x:Math.floor(h[0]),y:Math.floor(h[1])}}};s.MouseService=m=a([l(0,c.IRenderService),l(1,c.ICharSizeService)],m)},3230:function(o,s,n){var a=this&&this.__decorate||function(u,p,v,x){var S,C=arguments.length,y=C<3?p:x===null?x=Object.getOwnPropertyDescriptor(p,v):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")y=Reflect.decorate(u,p,v,x);else for(var k=u.length-1;k>=0;k--)(S=u[k])&&(y=(C<3?S(y):C>3?S(p,v,y):S(p,v))||y);return C>3&&y&&Object.defineProperty(p,v,y),y},l=this&&this.__param||function(u,p){return function(v,x){p(v,x,u)}};Object.defineProperty(s,"__esModule",{value:!0}),s.RenderService=void 0;let c=n(6193),f=n(4725),m=n(8460),_=n(844),g=n(7226),h=n(2585),d=s.RenderService=class extends _.Disposable{get dimensions(){return this._renderer.value.dimensions}constructor(u,p,v,x,S,C,y,k){super(),this._rowCount=u,this._charSizeService=x,this._renderer=this.register(new _.MutableDisposable),this._pausedResizeTask=new g.DebouncedIdleTask,this._observerDisposable=this.register(new _.MutableDisposable),this._isPaused=!1,this._needsFullRefresh=!1,this._isNextRenderRedrawOnly=!0,this._needsSelectionRefresh=!1,this._canvasWidth=0,this._canvasHeight=0,this._selectionState={start:void 0,end:void 0,columnSelectMode:!1},this._onDimensionsChange=this.register(new m.EventEmitter),this.onDimensionsChange=this._onDimensionsChange.event,this._onRenderedViewportChange=this.register(new m.EventEmitter),this.onRenderedViewportChange=this._onRenderedViewportChange.event,this._onRender=this.register(new m.EventEmitter),this.onRender=this._onRender.event,this._onRefreshRequest=this.register(new m.EventEmitter),this.onRefreshRequest=this._onRefreshRequest.event,this._renderDebouncer=new c.RenderDebouncer(((D,$)=>this._renderRows(D,$)),y),this.register(this._renderDebouncer),this.register(y.onDprChange((()=>this.handleDevicePixelRatioChange()))),this.register(C.onResize((()=>this._fullRefresh()))),this.register(C.buffers.onBufferActivate((()=>this._renderer.value?.clear()))),this.register(v.onOptionChange((()=>this._handleOptionsChanged()))),this.register(this._charSizeService.onCharSizeChange((()=>this.handleCharSizeChanged()))),this.register(S.onDecorationRegistered((()=>this._fullRefresh()))),this.register(S.onDecorationRemoved((()=>this._fullRefresh()))),this.register(v.onMultipleOptionChange(["customGlyphs","drawBoldTextInBrightColors","letterSpacing","lineHeight","fontFamily","fontSize","fontWeight","fontWeightBold","minimumContrastRatio","rescaleOverlappingGlyphs"],(()=>{this.clear(),this.handleResize(C.cols,C.rows),this._fullRefresh()}))),this.register(v.onMultipleOptionChange(["cursorBlink","cursorStyle"],(()=>this.refreshRows(C.buffer.y,C.buffer.y,!0)))),this.register(k.onChangeColors((()=>this._fullRefresh()))),this._registerIntersectionObserver(y.window,p),this.register(y.onWindowChange((D=>this._registerIntersectionObserver(D,p))))}_registerIntersectionObserver(u,p){if("IntersectionObserver"in u){let v=new u.IntersectionObserver((x=>this._handleIntersectionChange(x[x.length-1])),{threshold:0});v.observe(p),this._observerDisposable.value=(0,_.toDisposable)((()=>v.disconnect()))}}_handleIntersectionChange(u){this._isPaused=u.isIntersecting===void 0?u.intersectionRatio===0:!u.isIntersecting,this._isPaused||this._charSizeService.hasValidSize||this._charSizeService.measure(),!this._isPaused&&this._needsFullRefresh&&(this._pausedResizeTask.flush(),this.refreshRows(0,this._rowCount-1),this._needsFullRefresh=!1)}refreshRows(u,p,v=!1){this._isPaused?this._needsFullRefresh=!0:(v||(this._isNextRenderRedrawOnly=!1),this._renderDebouncer.refresh(u,p,this._rowCount))}_renderRows(u,p){this._renderer.value&&(u=Math.min(u,this._rowCount-1),p=Math.min(p,this._rowCount-1),this._renderer.value.renderRows(u,p),this._needsSelectionRefresh&&(this._renderer.value.handleSelectionChanged(this._selectionState.start,this._selectionState.end,this._selectionState.columnSelectMode),this._needsSelectionRefresh=!1),this._isNextRenderRedrawOnly||this._onRenderedViewportChange.fire({start:u,end:p}),this._onRender.fire({start:u,end:p}),this._isNextRenderRedrawOnly=!0)}resize(u,p){this._rowCount=p,this._fireOnCanvasResize()}_handleOptionsChanged(){this._renderer.value&&(this.refreshRows(0,this._rowCount-1),this._fireOnCanvasResize())}_fireOnCanvasResize(){this._renderer.value&&(this._renderer.value.dimensions.css.canvas.width===this._canvasWidth&&this._renderer.value.dimensions.css.canvas.height===this._canvasHeight||this._onDimensionsChange.fire(this._renderer.value.dimensions))}hasRenderer(){return!!this._renderer.value}setRenderer(u){this._renderer.value=u,this._renderer.value&&(this._renderer.value.onRequestRedraw((p=>this.refreshRows(p.start,p.end,!0))),this._needsSelectionRefresh=!0,this._fullRefresh())}addRefreshCallback(u){return this._renderDebouncer.addRefreshCallback(u)}_fullRefresh(){this._isPaused?this._needsFullRefresh=!0:this.refreshRows(0,this._rowCount-1)}clearTextureAtlas(){this._renderer.value&&(this._renderer.value.clearTextureAtlas?.(),this._fullRefresh())}handleDevicePixelRatioChange(){this._charSizeService.measure(),this._renderer.value&&(this._renderer.value.handleDevicePixelRatioChange(),this.refreshRows(0,this._rowCount-1))}handleResize(u,p){this._renderer.value&&(this._isPaused?this._pausedResizeTask.set((()=>this._renderer.value?.handleResize(u,p))):this._renderer.value.handleResize(u,p),this._fullRefresh())}handleCharSizeChanged(){this._renderer.value?.handleCharSizeChanged()}handleBlur(){this._renderer.value?.handleBlur()}handleFocus(){this._renderer.value?.handleFocus()}handleSelectionChanged(u,p,v){this._selectionState.start=u,this._selectionState.end=p,this._selectionState.columnSelectMode=v,this._renderer.value?.handleSelectionChanged(u,p,v)}handleCursorMove(){this._renderer.value?.handleCursorMove()}clear(){this._renderer.value?.clear()}};s.RenderService=d=a([l(2,h.IOptionsService),l(3,f.ICharSizeService),l(4,h.IDecorationService),l(5,h.IBufferService),l(6,f.ICoreBrowserService),l(7,f.IThemeService)],d)},9312:function(o,s,n){var a=this&&this.__decorate||function(y,k,D,$){var F,L=arguments.length,V=L<3?k:$===null?$=Object.getOwnPropertyDescriptor(k,D):$;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")V=Reflect.decorate(y,k,D,$);else for(var G=y.length-1;G>=0;G--)(F=y[G])&&(V=(L<3?F(V):L>3?F(k,D,V):F(k,D))||V);return L>3&&V&&Object.defineProperty(k,D,V),V},l=this&&this.__param||function(y,k){return function(D,$){k(D,$,y)}};Object.defineProperty(s,"__esModule",{value:!0}),s.SelectionService=void 0;let c=n(9806),f=n(9504),m=n(456),_=n(4725),g=n(8460),h=n(844),d=n(6114),u=n(4841),p=n(511),v=n(2585),x="\xA0",S=new RegExp(x,"g"),C=s.SelectionService=class extends h.Disposable{constructor(y,k,D,$,F,L,V,G,K){super(),this._element=y,this._screenElement=k,this._linkifier=D,this._bufferService=$,this._coreService=F,this._mouseService=L,this._optionsService=V,this._renderService=G,this._coreBrowserService=K,this._dragScrollAmount=0,this._enabled=!0,this._workCell=new p.CellData,this._mouseDownTimeStamp=0,this._oldHasSelection=!1,this._oldSelectionStart=void 0,this._oldSelectionEnd=void 0,this._onLinuxMouseSelection=this.register(new g.EventEmitter),this.onLinuxMouseSelection=this._onLinuxMouseSelection.event,this._onRedrawRequest=this.register(new g.EventEmitter),this.onRequestRedraw=this._onRedrawRequest.event,this._onSelectionChange=this.register(new g.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onRequestScrollLines=this.register(new g.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this._mouseMoveListener=re=>this._handleMouseMove(re),this._mouseUpListener=re=>this._handleMouseUp(re),this._coreService.onUserInput((()=>{this.hasSelection&&this.clearSelection()})),this._trimListener=this._bufferService.buffer.lines.onTrim((re=>this._handleTrim(re))),this.register(this._bufferService.buffers.onBufferActivate((re=>this._handleBufferActivate(re)))),this.enable(),this._model=new m.SelectionModel(this._bufferService),this._activeSelectionMode=0,this.register((0,h.toDisposable)((()=>{this._removeMouseDownListeners()})))}reset(){this.clearSelection()}disable(){this.clearSelection(),this._enabled=!1}enable(){this._enabled=!0}get selectionStart(){return this._model.finalSelectionStart}get selectionEnd(){return this._model.finalSelectionEnd}get hasSelection(){let y=this._model.finalSelectionStart,k=this._model.finalSelectionEnd;return!(!y||!k||y[0]===k[0]&&y[1]===k[1])}get selectionText(){let y=this._model.finalSelectionStart,k=this._model.finalSelectionEnd;if(!y||!k)return"";let D=this._bufferService.buffer,$=[];if(this._activeSelectionMode===3){if(y[0]===k[0])return"";let F=y[0]<k[0]?y[0]:k[0],L=y[0]<k[0]?k[0]:y[0];for(let V=y[1];V<=k[1];V++){let G=D.translateBufferLineToString(V,!0,F,L);$.push(G)}}else{let F=y[1]===k[1]?k[0]:void 0;$.push(D.translateBufferLineToString(y[1],!0,y[0],F));for(let L=y[1]+1;L<=k[1]-1;L++){let V=D.lines.get(L),G=D.translateBufferLineToString(L,!0);V?.isWrapped?$[$.length-1]+=G:$.push(G)}if(y[1]!==k[1]){let L=D.lines.get(k[1]),V=D.translateBufferLineToString(k[1],!0,0,k[0]);L&&L.isWrapped?$[$.length-1]+=V:$.push(V)}}return $.map((F=>F.replace(S," "))).join(d.isWindows?`\r
`:`
`)}clearSelection(){this._model.clearSelection(),this._removeMouseDownListeners(),this.refresh(),this._onSelectionChange.fire()}refresh(y){this._refreshAnimationFrame||(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame((()=>this._refresh()))),d.isLinux&&y&&this.selectionText.length&&this._onLinuxMouseSelection.fire(this.selectionText)}_refresh(){this._refreshAnimationFrame=void 0,this._onRedrawRequest.fire({start:this._model.finalSelectionStart,end:this._model.finalSelectionEnd,columnSelectMode:this._activeSelectionMode===3})}_isClickInSelection(y){let k=this._getMouseBufferCoords(y),D=this._model.finalSelectionStart,$=this._model.finalSelectionEnd;return!!(D&&$&&k)&&this._areCoordsInSelection(k,D,$)}isCellInSelection(y,k){let D=this._model.finalSelectionStart,$=this._model.finalSelectionEnd;return!(!D||!$)&&this._areCoordsInSelection([y,k],D,$)}_areCoordsInSelection(y,k,D){return y[1]>k[1]&&y[1]<D[1]||k[1]===D[1]&&y[1]===k[1]&&y[0]>=k[0]&&y[0]<D[0]||k[1]<D[1]&&y[1]===D[1]&&y[0]<D[0]||k[1]<D[1]&&y[1]===k[1]&&y[0]>=k[0]}_selectWordAtCursor(y,k){let D=this._linkifier.currentLink?.link?.range;if(D)return this._model.selectionStart=[D.start.x-1,D.start.y-1],this._model.selectionStartLength=(0,u.getRangeLength)(D,this._bufferService.cols),this._model.selectionEnd=void 0,!0;let $=this._getMouseBufferCoords(y);return!!$&&(this._selectWordAt($,k),this._model.selectionEnd=void 0,!0)}selectAll(){this._model.isSelectAllActive=!0,this.refresh(),this._onSelectionChange.fire()}selectLines(y,k){this._model.clearSelection(),y=Math.max(y,0),k=Math.min(k,this._bufferService.buffer.lines.length-1),this._model.selectionStart=[0,y],this._model.selectionEnd=[this._bufferService.cols,k],this.refresh(),this._onSelectionChange.fire()}_handleTrim(y){this._model.handleTrim(y)&&this.refresh()}_getMouseBufferCoords(y){let k=this._mouseService.getCoords(y,this._screenElement,this._bufferService.cols,this._bufferService.rows,!0);if(k)return k[0]--,k[1]--,k[1]+=this._bufferService.buffer.ydisp,k}_getMouseEventScrollAmount(y){let k=(0,c.getCoordsRelativeToElement)(this._coreBrowserService.window,y,this._screenElement)[1],D=this._renderService.dimensions.css.canvas.height;return k>=0&&k<=D?0:(k>D&&(k-=D),k=Math.min(Math.max(k,-50),50),k/=50,k/Math.abs(k)+Math.round(14*k))}shouldForceSelection(y){return d.isMac?y.altKey&&this._optionsService.rawOptions.macOptionClickForcesSelection:y.shiftKey}handleMouseDown(y){if(this._mouseDownTimeStamp=y.timeStamp,(y.button!==2||!this.hasSelection)&&y.button===0){if(!this._enabled){if(!this.shouldForceSelection(y))return;y.stopPropagation()}y.preventDefault(),this._dragScrollAmount=0,this._enabled&&y.shiftKey?this._handleIncrementalClick(y):y.detail===1?this._handleSingleClick(y):y.detail===2?this._handleDoubleClick(y):y.detail===3&&this._handleTripleClick(y),this._addMouseDownListeners(),this.refresh(!0)}}_addMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.addEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.addEventListener("mouseup",this._mouseUpListener)),this._dragScrollIntervalTimer=this._coreBrowserService.window.setInterval((()=>this._dragScroll()),50)}_removeMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.removeEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.removeEventListener("mouseup",this._mouseUpListener)),this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer),this._dragScrollIntervalTimer=void 0}_handleIncrementalClick(y){this._model.selectionStart&&(this._model.selectionEnd=this._getMouseBufferCoords(y))}_handleSingleClick(y){if(this._model.selectionStartLength=0,this._model.isSelectAllActive=!1,this._activeSelectionMode=this.shouldColumnSelect(y)?3:0,this._model.selectionStart=this._getMouseBufferCoords(y),!this._model.selectionStart)return;this._model.selectionEnd=void 0;let k=this._bufferService.buffer.lines.get(this._model.selectionStart[1]);k&&k.length!==this._model.selectionStart[0]&&k.hasWidth(this._model.selectionStart[0])===0&&this._model.selectionStart[0]++}_handleDoubleClick(y){this._selectWordAtCursor(y,!0)&&(this._activeSelectionMode=1)}_handleTripleClick(y){let k=this._getMouseBufferCoords(y);k&&(this._activeSelectionMode=2,this._selectLineAt(k[1]))}shouldColumnSelect(y){return y.altKey&&!(d.isMac&&this._optionsService.rawOptions.macOptionClickForcesSelection)}_handleMouseMove(y){if(y.stopImmediatePropagation(),!this._model.selectionStart)return;let k=this._model.selectionEnd?[this._model.selectionEnd[0],this._model.selectionEnd[1]]:null;if(this._model.selectionEnd=this._getMouseBufferCoords(y),!this._model.selectionEnd)return void this.refresh(!0);this._activeSelectionMode===2?this._model.selectionEnd[1]<this._model.selectionStart[1]?this._model.selectionEnd[0]=0:this._model.selectionEnd[0]=this._bufferService.cols:this._activeSelectionMode===1&&this._selectToWordAt(this._model.selectionEnd),this._dragScrollAmount=this._getMouseEventScrollAmount(y),this._activeSelectionMode!==3&&(this._dragScrollAmount>0?this._model.selectionEnd[0]=this._bufferService.cols:this._dragScrollAmount<0&&(this._model.selectionEnd[0]=0));let D=this._bufferService.buffer;if(this._model.selectionEnd[1]<D.lines.length){let $=D.lines.get(this._model.selectionEnd[1]);$&&$.hasWidth(this._model.selectionEnd[0])===0&&this._model.selectionEnd[0]<this._bufferService.cols&&this._model.selectionEnd[0]++}k&&k[0]===this._model.selectionEnd[0]&&k[1]===this._model.selectionEnd[1]||this.refresh(!0)}_dragScroll(){if(this._model.selectionEnd&&this._model.selectionStart&&this._dragScrollAmount){this._onRequestScrollLines.fire({amount:this._dragScrollAmount,suppressScrollEvent:!1});let y=this._bufferService.buffer;this._dragScrollAmount>0?(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=this._bufferService.cols),this._model.selectionEnd[1]=Math.min(y.ydisp+this._bufferService.rows,y.lines.length-1)):(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=0),this._model.selectionEnd[1]=y.ydisp),this.refresh()}}_handleMouseUp(y){let k=y.timeStamp-this._mouseDownTimeStamp;if(this._removeMouseDownListeners(),this.selectionText.length<=1&&k<500&&y.altKey&&this._optionsService.rawOptions.altClickMovesCursor){if(this._bufferService.buffer.ybase===this._bufferService.buffer.ydisp){let D=this._mouseService.getCoords(y,this._element,this._bufferService.cols,this._bufferService.rows,!1);if(D&&D[0]!==void 0&&D[1]!==void 0){let $=(0,f.moveToCellSequence)(D[0]-1,D[1]-1,this._bufferService,this._coreService.decPrivateModes.applicationCursorKeys);this._coreService.triggerDataEvent($,!0)}}}else this._fireEventIfSelectionChanged()}_fireEventIfSelectionChanged(){let y=this._model.finalSelectionStart,k=this._model.finalSelectionEnd,D=!(!y||!k||y[0]===k[0]&&y[1]===k[1]);D?y&&k&&(this._oldSelectionStart&&this._oldSelectionEnd&&y[0]===this._oldSelectionStart[0]&&y[1]===this._oldSelectionStart[1]&&k[0]===this._oldSelectionEnd[0]&&k[1]===this._oldSelectionEnd[1]||this._fireOnSelectionChange(y,k,D)):this._oldHasSelection&&this._fireOnSelectionChange(y,k,D)}_fireOnSelectionChange(y,k,D){this._oldSelectionStart=y,this._oldSelectionEnd=k,this._oldHasSelection=D,this._onSelectionChange.fire()}_handleBufferActivate(y){this.clearSelection(),this._trimListener.dispose(),this._trimListener=y.activeBuffer.lines.onTrim((k=>this._handleTrim(k)))}_convertViewportColToCharacterIndex(y,k){let D=k;for(let $=0;k>=$;$++){let F=y.loadCell($,this._workCell).getChars().length;this._workCell.getWidth()===0?D--:F>1&&k!==$&&(D+=F-1)}return D}setSelection(y,k,D){this._model.clearSelection(),this._removeMouseDownListeners(),this._model.selectionStart=[y,k],this._model.selectionStartLength=D,this.refresh(),this._fireEventIfSelectionChanged()}rightClickSelect(y){this._isClickInSelection(y)||(this._selectWordAtCursor(y,!1)&&this.refresh(!0),this._fireEventIfSelectionChanged())}_getWordAt(y,k,D=!0,$=!0){if(y[0]>=this._bufferService.cols)return;let F=this._bufferService.buffer,L=F.lines.get(y[1]);if(!L)return;let V=F.translateBufferLineToString(y[1],!1),G=this._convertViewportColToCharacterIndex(L,y[0]),K=G,re=y[0]-G,J=0,A=0,B=0,P=0;if(V.charAt(G)===" "){for(;G>0&&V.charAt(G-1)===" ";)G--;for(;K<V.length&&V.charAt(K+1)===" ";)K++}else{let ie=y[0],ce=y[0];L.getWidth(ie)===0&&(J++,ie--),L.getWidth(ce)===2&&(A++,ce++);let ve=L.getString(ce).length;for(ve>1&&(P+=ve-1,K+=ve-1);ie>0&&G>0&&!this._isCharWordSeparator(L.loadCell(ie-1,this._workCell));){L.loadCell(ie-1,this._workCell);let q=this._workCell.getChars().length;this._workCell.getWidth()===0?(J++,ie--):q>1&&(B+=q-1,G-=q-1),G--,ie--}for(;ce<L.length&&K+1<V.length&&!this._isCharWordSeparator(L.loadCell(ce+1,this._workCell));){L.loadCell(ce+1,this._workCell);let q=this._workCell.getChars().length;this._workCell.getWidth()===2?(A++,ce++):q>1&&(P+=q-1,K+=q-1),K++,ce++}}K++;let N=G+re-J+B,X=Math.min(this._bufferService.cols,K-G+J+A-B-P);if(k||V.slice(G,K).trim()!==""){if(D&&N===0&&L.getCodePoint(0)!==32){let ie=F.lines.get(y[1]-1);if(ie&&L.isWrapped&&ie.getCodePoint(this._bufferService.cols-1)!==32){let ce=this._getWordAt([this._bufferService.cols-1,y[1]-1],!1,!0,!1);if(ce){let ve=this._bufferService.cols-ce.start;N-=ve,X+=ve}}}if($&&N+X===this._bufferService.cols&&L.getCodePoint(this._bufferService.cols-1)!==32){let ie=F.lines.get(y[1]+1);if(ie?.isWrapped&&ie.getCodePoint(0)!==32){let ce=this._getWordAt([0,y[1]+1],!1,!1,!0);ce&&(X+=ce.length)}}return{start:N,length:X}}}_selectWordAt(y,k){let D=this._getWordAt(y,k);if(D){for(;D.start<0;)D.start+=this._bufferService.cols,y[1]--;this._model.selectionStart=[D.start,y[1]],this._model.selectionStartLength=D.length}}_selectToWordAt(y){let k=this._getWordAt(y,!0);if(k){let D=y[1];for(;k.start<0;)k.start+=this._bufferService.cols,D--;if(!this._model.areSelectionValuesReversed())for(;k.start+k.length>this._bufferService.cols;)k.length-=this._bufferService.cols,D++;this._model.selectionEnd=[this._model.areSelectionValuesReversed()?k.start:k.start+k.length,D]}}_isCharWordSeparator(y){return y.getWidth()!==0&&this._optionsService.rawOptions.wordSeparator.indexOf(y.getChars())>=0}_selectLineAt(y){let k=this._bufferService.buffer.getWrappedRangeForLine(y),D={start:{x:0,y:k.first},end:{x:this._bufferService.cols-1,y:k.last}};this._model.selectionStart=[0,k.first],this._model.selectionEnd=void 0,this._model.selectionStartLength=(0,u.getRangeLength)(D,this._bufferService.cols)}};s.SelectionService=C=a([l(3,v.IBufferService),l(4,v.ICoreService),l(5,_.IMouseService),l(6,v.IOptionsService),l(7,_.IRenderService),l(8,_.ICoreBrowserService)],C)},4725:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.ILinkProviderService=s.IThemeService=s.ICharacterJoinerService=s.ISelectionService=s.IRenderService=s.IMouseService=s.ICoreBrowserService=s.ICharSizeService=void 0;let a=n(8343);s.ICharSizeService=(0,a.createDecorator)("CharSizeService"),s.ICoreBrowserService=(0,a.createDecorator)("CoreBrowserService"),s.IMouseService=(0,a.createDecorator)("MouseService"),s.IRenderService=(0,a.createDecorator)("RenderService"),s.ISelectionService=(0,a.createDecorator)("SelectionService"),s.ICharacterJoinerService=(0,a.createDecorator)("CharacterJoinerService"),s.IThemeService=(0,a.createDecorator)("ThemeService"),s.ILinkProviderService=(0,a.createDecorator)("LinkProviderService")},6731:function(o,s,n){var a=this&&this.__decorate||function(C,y,k,D){var $,F=arguments.length,L=F<3?y:D===null?D=Object.getOwnPropertyDescriptor(y,k):D;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")L=Reflect.decorate(C,y,k,D);else for(var V=C.length-1;V>=0;V--)($=C[V])&&(L=(F<3?$(L):F>3?$(y,k,L):$(y,k))||L);return F>3&&L&&Object.defineProperty(y,k,L),L},l=this&&this.__param||function(C,y){return function(k,D){y(k,D,C)}};Object.defineProperty(s,"__esModule",{value:!0}),s.ThemeService=s.DEFAULT_ANSI_COLORS=void 0;let c=n(7239),f=n(8055),m=n(8460),_=n(844),g=n(2585),h=f.css.toColor("#ffffff"),d=f.css.toColor("#000000"),u=f.css.toColor("#ffffff"),p=f.css.toColor("#000000"),v={css:"rgba(255, 255, 255, 0.3)",rgba:4294967117};s.DEFAULT_ANSI_COLORS=Object.freeze((()=>{let C=[f.css.toColor("#2e3436"),f.css.toColor("#cc0000"),f.css.toColor("#4e9a06"),f.css.toColor("#c4a000"),f.css.toColor("#3465a4"),f.css.toColor("#75507b"),f.css.toColor("#06989a"),f.css.toColor("#d3d7cf"),f.css.toColor("#555753"),f.css.toColor("#ef2929"),f.css.toColor("#8ae234"),f.css.toColor("#fce94f"),f.css.toColor("#729fcf"),f.css.toColor("#ad7fa8"),f.css.toColor("#34e2e2"),f.css.toColor("#eeeeec")],y=[0,95,135,175,215,255];for(let k=0;k<216;k++){let D=y[k/36%6|0],$=y[k/6%6|0],F=y[k%6];C.push({css:f.channels.toCss(D,$,F),rgba:f.channels.toRgba(D,$,F)})}for(let k=0;k<24;k++){let D=8+10*k;C.push({css:f.channels.toCss(D,D,D),rgba:f.channels.toRgba(D,D,D)})}return C})());let x=s.ThemeService=class extends _.Disposable{get colors(){return this._colors}constructor(C){super(),this._optionsService=C,this._contrastCache=new c.ColorContrastCache,this._halfContrastCache=new c.ColorContrastCache,this._onChangeColors=this.register(new m.EventEmitter),this.onChangeColors=this._onChangeColors.event,this._colors={foreground:h,background:d,cursor:u,cursorAccent:p,selectionForeground:void 0,selectionBackgroundTransparent:v,selectionBackgroundOpaque:f.color.blend(d,v),selectionInactiveBackgroundTransparent:v,selectionInactiveBackgroundOpaque:f.color.blend(d,v),ansi:s.DEFAULT_ANSI_COLORS.slice(),contrastCache:this._contrastCache,halfContrastCache:this._halfContrastCache},this._updateRestoreColors(),this._setTheme(this._optionsService.rawOptions.theme),this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio",(()=>this._contrastCache.clear()))),this.register(this._optionsService.onSpecificOptionChange("theme",(()=>this._setTheme(this._optionsService.rawOptions.theme))))}_setTheme(C={}){let y=this._colors;if(y.foreground=S(C.foreground,h),y.background=S(C.background,d),y.cursor=S(C.cursor,u),y.cursorAccent=S(C.cursorAccent,p),y.selectionBackgroundTransparent=S(C.selectionBackground,v),y.selectionBackgroundOpaque=f.color.blend(y.background,y.selectionBackgroundTransparent),y.selectionInactiveBackgroundTransparent=S(C.selectionInactiveBackground,y.selectionBackgroundTransparent),y.selectionInactiveBackgroundOpaque=f.color.blend(y.background,y.selectionInactiveBackgroundTransparent),y.selectionForeground=C.selectionForeground?S(C.selectionForeground,f.NULL_COLOR):void 0,y.selectionForeground===f.NULL_COLOR&&(y.selectionForeground=void 0),f.color.isOpaque(y.selectionBackgroundTransparent)&&(y.selectionBackgroundTransparent=f.color.opacity(y.selectionBackgroundTransparent,.3)),f.color.isOpaque(y.selectionInactiveBackgroundTransparent)&&(y.selectionInactiveBackgroundTransparent=f.color.opacity(y.selectionInactiveBackgroundTransparent,.3)),y.ansi=s.DEFAULT_ANSI_COLORS.slice(),y.ansi[0]=S(C.black,s.DEFAULT_ANSI_COLORS[0]),y.ansi[1]=S(C.red,s.DEFAULT_ANSI_COLORS[1]),y.ansi[2]=S(C.green,s.DEFAULT_ANSI_COLORS[2]),y.ansi[3]=S(C.yellow,s.DEFAULT_ANSI_COLORS[3]),y.ansi[4]=S(C.blue,s.DEFAULT_ANSI_COLORS[4]),y.ansi[5]=S(C.magenta,s.DEFAULT_ANSI_COLORS[5]),y.ansi[6]=S(C.cyan,s.DEFAULT_ANSI_COLORS[6]),y.ansi[7]=S(C.white,s.DEFAULT_ANSI_COLORS[7]),y.ansi[8]=S(C.brightBlack,s.DEFAULT_ANSI_COLORS[8]),y.ansi[9]=S(C.brightRed,s.DEFAULT_ANSI_COLORS[9]),y.ansi[10]=S(C.brightGreen,s.DEFAULT_ANSI_COLORS[10]),y.ansi[11]=S(C.brightYellow,s.DEFAULT_ANSI_COLORS[11]),y.ansi[12]=S(C.brightBlue,s.DEFAULT_ANSI_COLORS[12]),y.ansi[13]=S(C.brightMagenta,s.DEFAULT_ANSI_COLORS[13]),y.ansi[14]=S(C.brightCyan,s.DEFAULT_ANSI_COLORS[14]),y.ansi[15]=S(C.brightWhite,s.DEFAULT_ANSI_COLORS[15]),C.extendedAnsi){let k=Math.min(y.ansi.length-16,C.extendedAnsi.length);for(let D=0;D<k;D++)y.ansi[D+16]=S(C.extendedAnsi[D],s.DEFAULT_ANSI_COLORS[D+16])}this._contrastCache.clear(),this._halfContrastCache.clear(),this._updateRestoreColors(),this._onChangeColors.fire(this.colors)}restoreColor(C){this._restoreColor(C),this._onChangeColors.fire(this.colors)}_restoreColor(C){if(C!==void 0)switch(C){case 256:this._colors.foreground=this._restoreColors.foreground;break;case 257:this._colors.background=this._restoreColors.background;break;case 258:this._colors.cursor=this._restoreColors.cursor;break;default:this._colors.ansi[C]=this._restoreColors.ansi[C]}else for(let y=0;y<this._restoreColors.ansi.length;++y)this._colors.ansi[y]=this._restoreColors.ansi[y]}modifyColors(C){C(this._colors),this._onChangeColors.fire(this.colors)}_updateRestoreColors(){this._restoreColors={foreground:this._colors.foreground,background:this._colors.background,cursor:this._colors.cursor,ansi:this._colors.ansi.slice()}}};function S(C,y){if(C!==void 0)try{return f.css.toColor(C)}catch{}return y}s.ThemeService=x=a([l(0,g.IOptionsService)],x)},6349:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.CircularList=void 0;let a=n(8460),l=n(844);class c extends l.Disposable{constructor(m){super(),this._maxLength=m,this.onDeleteEmitter=this.register(new a.EventEmitter),this.onDelete=this.onDeleteEmitter.event,this.onInsertEmitter=this.register(new a.EventEmitter),this.onInsert=this.onInsertEmitter.event,this.onTrimEmitter=this.register(new a.EventEmitter),this.onTrim=this.onTrimEmitter.event,this._array=new Array(this._maxLength),this._startIndex=0,this._length=0}get maxLength(){return this._maxLength}set maxLength(m){if(this._maxLength===m)return;let _=new Array(m);for(let g=0;g<Math.min(m,this.length);g++)_[g]=this._array[this._getCyclicIndex(g)];this._array=_,this._maxLength=m,this._startIndex=0}get length(){return this._length}set length(m){if(m>this._length)for(let _=this._length;_<m;_++)this._array[_]=void 0;this._length=m}get(m){return this._array[this._getCyclicIndex(m)]}set(m,_){this._array[this._getCyclicIndex(m)]=_}push(m){this._array[this._getCyclicIndex(this._length)]=m,this._length===this._maxLength?(this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1)):this._length++}recycle(){if(this._length!==this._maxLength)throw new Error("Can only recycle when the buffer is full");return this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1),this._array[this._getCyclicIndex(this._length-1)]}get isFull(){return this._length===this._maxLength}pop(){return this._array[this._getCyclicIndex(this._length---1)]}splice(m,_,...g){if(_){for(let h=m;h<this._length-_;h++)this._array[this._getCyclicIndex(h)]=this._array[this._getCyclicIndex(h+_)];this._length-=_,this.onDeleteEmitter.fire({index:m,amount:_})}for(let h=this._length-1;h>=m;h--)this._array[this._getCyclicIndex(h+g.length)]=this._array[this._getCyclicIndex(h)];for(let h=0;h<g.length;h++)this._array[this._getCyclicIndex(m+h)]=g[h];if(g.length&&this.onInsertEmitter.fire({index:m,amount:g.length}),this._length+g.length>this._maxLength){let h=this._length+g.length-this._maxLength;this._startIndex+=h,this._length=this._maxLength,this.onTrimEmitter.fire(h)}else this._length+=g.length}trimStart(m){m>this._length&&(m=this._length),this._startIndex+=m,this._length-=m,this.onTrimEmitter.fire(m)}shiftElements(m,_,g){if(!(_<=0)){if(m<0||m>=this._length)throw new Error("start argument out of range");if(m+g<0)throw new Error("Cannot shift elements in list beyond index 0");if(g>0){for(let d=_-1;d>=0;d--)this.set(m+d+g,this.get(m+d));let h=m+_+g-this._length;if(h>0)for(this._length+=h;this._length>this._maxLength;)this._length--,this._startIndex++,this.onTrimEmitter.fire(1)}else for(let h=0;h<_;h++)this.set(m+h+g,this.get(m+h))}}_getCyclicIndex(m){return(this._startIndex+m)%this._maxLength}}s.CircularList=c},1439:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.clone=void 0,s.clone=function n(a,l=5){if(typeof a!="object")return a;let c=Array.isArray(a)?[]:{};for(let f in a)c[f]=l<=1?a[f]:a[f]&&n(a[f],l-1);return c}},8055:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.contrastRatio=s.toPaddedHex=s.rgba=s.rgb=s.css=s.color=s.channels=s.NULL_COLOR=void 0;let n=0,a=0,l=0,c=0;var f,m,_,g,h;function d(p){let v=p.toString(16);return v.length<2?"0"+v:v}function u(p,v){return p<v?(v+.05)/(p+.05):(p+.05)/(v+.05)}s.NULL_COLOR={css:"#00000000",rgba:0},(function(p){p.toCss=function(v,x,S,C){return C!==void 0?`#${d(v)}${d(x)}${d(S)}${d(C)}`:`#${d(v)}${d(x)}${d(S)}`},p.toRgba=function(v,x,S,C=255){return(v<<24|x<<16|S<<8|C)>>>0},p.toColor=function(v,x,S,C){return{css:p.toCss(v,x,S,C),rgba:p.toRgba(v,x,S,C)}}})(f||(s.channels=f={})),(function(p){function v(x,S){return c=Math.round(255*S),[n,a,l]=h.toChannels(x.rgba),{css:f.toCss(n,a,l,c),rgba:f.toRgba(n,a,l,c)}}p.blend=function(x,S){if(c=(255&S.rgba)/255,c===1)return{css:S.css,rgba:S.rgba};let C=S.rgba>>24&255,y=S.rgba>>16&255,k=S.rgba>>8&255,D=x.rgba>>24&255,$=x.rgba>>16&255,F=x.rgba>>8&255;return n=D+Math.round((C-D)*c),a=$+Math.round((y-$)*c),l=F+Math.round((k-F)*c),{css:f.toCss(n,a,l),rgba:f.toRgba(n,a,l)}},p.isOpaque=function(x){return(255&x.rgba)==255},p.ensureContrastRatio=function(x,S,C){let y=h.ensureContrastRatio(x.rgba,S.rgba,C);if(y)return f.toColor(y>>24&255,y>>16&255,y>>8&255)},p.opaque=function(x){let S=(255|x.rgba)>>>0;return[n,a,l]=h.toChannels(S),{css:f.toCss(n,a,l),rgba:S}},p.opacity=v,p.multiplyOpacity=function(x,S){return c=255&x.rgba,v(x,c*S/255)},p.toColorRGB=function(x){return[x.rgba>>24&255,x.rgba>>16&255,x.rgba>>8&255]}})(m||(s.color=m={})),(function(p){let v,x;try{let S=document.createElement("canvas");S.width=1,S.height=1;let C=S.getContext("2d",{willReadFrequently:!0});C&&(v=C,v.globalCompositeOperation="copy",x=v.createLinearGradient(0,0,1,1))}catch{}p.toColor=function(S){if(S.match(/#[\da-f]{3,8}/i))switch(S.length){case 4:return n=parseInt(S.slice(1,2).repeat(2),16),a=parseInt(S.slice(2,3).repeat(2),16),l=parseInt(S.slice(3,4).repeat(2),16),f.toColor(n,a,l);case 5:return n=parseInt(S.slice(1,2).repeat(2),16),a=parseInt(S.slice(2,3).repeat(2),16),l=parseInt(S.slice(3,4).repeat(2),16),c=parseInt(S.slice(4,5).repeat(2),16),f.toColor(n,a,l,c);case 7:return{css:S,rgba:(parseInt(S.slice(1),16)<<8|255)>>>0};case 9:return{css:S,rgba:parseInt(S.slice(1),16)>>>0}}let C=S.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);if(C)return n=parseInt(C[1]),a=parseInt(C[2]),l=parseInt(C[3]),c=Math.round(255*(C[5]===void 0?1:parseFloat(C[5]))),f.toColor(n,a,l,c);if(!v||!x)throw new Error("css.toColor: Unsupported css format");if(v.fillStyle=x,v.fillStyle=S,typeof v.fillStyle!="string")throw new Error("css.toColor: Unsupported css format");if(v.fillRect(0,0,1,1),[n,a,l,c]=v.getImageData(0,0,1,1).data,c!==255)throw new Error("css.toColor: Unsupported css format");return{rgba:f.toRgba(n,a,l,c),css:S}}})(_||(s.css=_={})),(function(p){function v(x,S,C){let y=x/255,k=S/255,D=C/255;return .2126*(y<=.03928?y/12.92:Math.pow((y+.055)/1.055,2.4))+.7152*(k<=.03928?k/12.92:Math.pow((k+.055)/1.055,2.4))+.0722*(D<=.03928?D/12.92:Math.pow((D+.055)/1.055,2.4))}p.relativeLuminance=function(x){return v(x>>16&255,x>>8&255,255&x)},p.relativeLuminance2=v})(g||(s.rgb=g={})),(function(p){function v(S,C,y){let k=S>>24&255,D=S>>16&255,$=S>>8&255,F=C>>24&255,L=C>>16&255,V=C>>8&255,G=u(g.relativeLuminance2(F,L,V),g.relativeLuminance2(k,D,$));for(;G<y&&(F>0||L>0||V>0);)F-=Math.max(0,Math.ceil(.1*F)),L-=Math.max(0,Math.ceil(.1*L)),V-=Math.max(0,Math.ceil(.1*V)),G=u(g.relativeLuminance2(F,L,V),g.relativeLuminance2(k,D,$));return(F<<24|L<<16|V<<8|255)>>>0}function x(S,C,y){let k=S>>24&255,D=S>>16&255,$=S>>8&255,F=C>>24&255,L=C>>16&255,V=C>>8&255,G=u(g.relativeLuminance2(F,L,V),g.relativeLuminance2(k,D,$));for(;G<y&&(F<255||L<255||V<255);)F=Math.min(255,F+Math.ceil(.1*(255-F))),L=Math.min(255,L+Math.ceil(.1*(255-L))),V=Math.min(255,V+Math.ceil(.1*(255-V))),G=u(g.relativeLuminance2(F,L,V),g.relativeLuminance2(k,D,$));return(F<<24|L<<16|V<<8|255)>>>0}p.blend=function(S,C){if(c=(255&C)/255,c===1)return C;let y=C>>24&255,k=C>>16&255,D=C>>8&255,$=S>>24&255,F=S>>16&255,L=S>>8&255;return n=$+Math.round((y-$)*c),a=F+Math.round((k-F)*c),l=L+Math.round((D-L)*c),f.toRgba(n,a,l)},p.ensureContrastRatio=function(S,C,y){let k=g.relativeLuminance(S>>8),D=g.relativeLuminance(C>>8);if(u(k,D)<y){if(D<k){let L=v(S,C,y),V=u(k,g.relativeLuminance(L>>8));if(V<y){let G=x(S,C,y);return V>u(k,g.relativeLuminance(G>>8))?L:G}return L}let $=x(S,C,y),F=u(k,g.relativeLuminance($>>8));if(F<y){let L=v(S,C,y);return F>u(k,g.relativeLuminance(L>>8))?$:L}return $}},p.reduceLuminance=v,p.increaseLuminance=x,p.toChannels=function(S){return[S>>24&255,S>>16&255,S>>8&255,255&S]}})(h||(s.rgba=h={})),s.toPaddedHex=d,s.contrastRatio=u},8969:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.CoreTerminal=void 0;let a=n(844),l=n(2585),c=n(4348),f=n(7866),m=n(744),_=n(7302),g=n(6975),h=n(8460),d=n(1753),u=n(1480),p=n(7994),v=n(9282),x=n(5435),S=n(5981),C=n(2660),y=!1;class k extends a.Disposable{get onScroll(){return this._onScrollApi||(this._onScrollApi=this.register(new h.EventEmitter),this._onScroll.event(($=>{this._onScrollApi?.fire($.position)}))),this._onScrollApi.event}get cols(){return this._bufferService.cols}get rows(){return this._bufferService.rows}get buffers(){return this._bufferService.buffers}get options(){return this.optionsService.options}set options($){for(let F in $)this.optionsService.options[F]=$[F]}constructor($){super(),this._windowsWrappingHeuristics=this.register(new a.MutableDisposable),this._onBinary=this.register(new h.EventEmitter),this.onBinary=this._onBinary.event,this._onData=this.register(new h.EventEmitter),this.onData=this._onData.event,this._onLineFeed=this.register(new h.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onResize=this.register(new h.EventEmitter),this.onResize=this._onResize.event,this._onWriteParsed=this.register(new h.EventEmitter),this.onWriteParsed=this._onWriteParsed.event,this._onScroll=this.register(new h.EventEmitter),this._instantiationService=new c.InstantiationService,this.optionsService=this.register(new _.OptionsService($)),this._instantiationService.setService(l.IOptionsService,this.optionsService),this._bufferService=this.register(this._instantiationService.createInstance(m.BufferService)),this._instantiationService.setService(l.IBufferService,this._bufferService),this._logService=this.register(this._instantiationService.createInstance(f.LogService)),this._instantiationService.setService(l.ILogService,this._logService),this.coreService=this.register(this._instantiationService.createInstance(g.CoreService)),this._instantiationService.setService(l.ICoreService,this.coreService),this.coreMouseService=this.register(this._instantiationService.createInstance(d.CoreMouseService)),this._instantiationService.setService(l.ICoreMouseService,this.coreMouseService),this.unicodeService=this.register(this._instantiationService.createInstance(u.UnicodeService)),this._instantiationService.setService(l.IUnicodeService,this.unicodeService),this._charsetService=this._instantiationService.createInstance(p.CharsetService),this._instantiationService.setService(l.ICharsetService,this._charsetService),this._oscLinkService=this._instantiationService.createInstance(C.OscLinkService),this._instantiationService.setService(l.IOscLinkService,this._oscLinkService),this._inputHandler=this.register(new x.InputHandler(this._bufferService,this._charsetService,this.coreService,this._logService,this.optionsService,this._oscLinkService,this.coreMouseService,this.unicodeService)),this.register((0,h.forwardEvent)(this._inputHandler.onLineFeed,this._onLineFeed)),this.register(this._inputHandler),this.register((0,h.forwardEvent)(this._bufferService.onResize,this._onResize)),this.register((0,h.forwardEvent)(this.coreService.onData,this._onData)),this.register((0,h.forwardEvent)(this.coreService.onBinary,this._onBinary)),this.register(this.coreService.onRequestScrollToBottom((()=>this.scrollToBottom()))),this.register(this.coreService.onUserInput((()=>this._writeBuffer.handleUserInput()))),this.register(this.optionsService.onMultipleOptionChange(["windowsMode","windowsPty"],(()=>this._handleWindowsPtyOptionChange()))),this.register(this._bufferService.onScroll((F=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)}))),this.register(this._inputHandler.onScroll((F=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)}))),this._writeBuffer=this.register(new S.WriteBuffer(((F,L)=>this._inputHandler.parse(F,L)))),this.register((0,h.forwardEvent)(this._writeBuffer.onWriteParsed,this._onWriteParsed))}write($,F){this._writeBuffer.write($,F)}writeSync($,F){this._logService.logLevel<=l.LogLevelEnum.WARN&&!y&&(this._logService.warn("writeSync is unreliable and will be removed soon."),y=!0),this._writeBuffer.writeSync($,F)}input($,F=!0){this.coreService.triggerDataEvent($,F)}resize($,F){isNaN($)||isNaN(F)||($=Math.max($,m.MINIMUM_COLS),F=Math.max(F,m.MINIMUM_ROWS),this._bufferService.resize($,F))}scroll($,F=!1){this._bufferService.scroll($,F)}scrollLines($,F,L){this._bufferService.scrollLines($,F,L)}scrollPages($){this.scrollLines($*(this.rows-1))}scrollToTop(){this.scrollLines(-this._bufferService.buffer.ydisp)}scrollToBottom(){this.scrollLines(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp)}scrollToLine($){let F=$-this._bufferService.buffer.ydisp;F!==0&&this.scrollLines(F)}registerEscHandler($,F){return this._inputHandler.registerEscHandler($,F)}registerDcsHandler($,F){return this._inputHandler.registerDcsHandler($,F)}registerCsiHandler($,F){return this._inputHandler.registerCsiHandler($,F)}registerOscHandler($,F){return this._inputHandler.registerOscHandler($,F)}_setup(){this._handleWindowsPtyOptionChange()}reset(){this._inputHandler.reset(),this._bufferService.reset(),this._charsetService.reset(),this.coreService.reset(),this.coreMouseService.reset()}_handleWindowsPtyOptionChange(){let $=!1,F=this.optionsService.rawOptions.windowsPty;F&&F.buildNumber!==void 0&&F.buildNumber!==void 0?$=F.backend==="conpty"&&F.buildNumber<21376:this.optionsService.rawOptions.windowsMode&&($=!0),$?this._enableWindowsWrappingHeuristics():this._windowsWrappingHeuristics.clear()}_enableWindowsWrappingHeuristics(){if(!this._windowsWrappingHeuristics.value){let $=[];$.push(this.onLineFeed(v.updateWindowsModeWrappedState.bind(null,this._bufferService))),$.push(this.registerCsiHandler({final:"H"},(()=>((0,v.updateWindowsModeWrappedState)(this._bufferService),!1)))),this._windowsWrappingHeuristics.value=(0,a.toDisposable)((()=>{for(let F of $)F.dispose()}))}}}s.CoreTerminal=k},8460:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.runAndSubscribe=s.forwardEvent=s.EventEmitter=void 0,s.EventEmitter=class{constructor(){this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=n=>(this._listeners.push(n),{dispose:()=>{if(!this._disposed){for(let a=0;a<this._listeners.length;a++)if(this._listeners[a]===n)return void this._listeners.splice(a,1)}}})),this._event}fire(n,a){let l=[];for(let c=0;c<this._listeners.length;c++)l.push(this._listeners[c]);for(let c=0;c<l.length;c++)l[c].call(void 0,n,a)}dispose(){this.clearListeners(),this._disposed=!0}clearListeners(){this._listeners&&(this._listeners.length=0)}},s.forwardEvent=function(n,a){return n((l=>a.fire(l)))},s.runAndSubscribe=function(n,a){return a(void 0),n((l=>a(l)))}},5435:function(o,s,n){var a=this&&this.__decorate||function(J,A,B,P){var N,X=arguments.length,ie=X<3?A:P===null?P=Object.getOwnPropertyDescriptor(A,B):P;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")ie=Reflect.decorate(J,A,B,P);else for(var ce=J.length-1;ce>=0;ce--)(N=J[ce])&&(ie=(X<3?N(ie):X>3?N(A,B,ie):N(A,B))||ie);return X>3&&ie&&Object.defineProperty(A,B,ie),ie},l=this&&this.__param||function(J,A){return function(B,P){A(B,P,J)}};Object.defineProperty(s,"__esModule",{value:!0}),s.InputHandler=s.WindowsOptionsReportType=void 0;let c=n(2584),f=n(7116),m=n(2015),_=n(844),g=n(482),h=n(8437),d=n(8460),u=n(643),p=n(511),v=n(3734),x=n(2585),S=n(1480),C=n(6242),y=n(6351),k=n(5941),D={"(":0,")":1,"*":2,"+":3,"-":1,".":2},$=131072;function F(J,A){if(J>24)return A.setWinLines||!1;switch(J){case 1:return!!A.restoreWin;case 2:return!!A.minimizeWin;case 3:return!!A.setWinPosition;case 4:return!!A.setWinSizePixels;case 5:return!!A.raiseWin;case 6:return!!A.lowerWin;case 7:return!!A.refreshWin;case 8:return!!A.setWinSizeChars;case 9:return!!A.maximizeWin;case 10:return!!A.fullscreenWin;case 11:return!!A.getWinState;case 13:return!!A.getWinPosition;case 14:return!!A.getWinSizePixels;case 15:return!!A.getScreenSizePixels;case 16:return!!A.getCellSizePixels;case 18:return!!A.getWinSizeChars;case 19:return!!A.getScreenSizeChars;case 20:return!!A.getIconTitle;case 21:return!!A.getWinTitle;case 22:return!!A.pushTitle;case 23:return!!A.popTitle;case 24:return!!A.setWinLines}return!1}var L;(function(J){J[J.GET_WIN_SIZE_PIXELS=0]="GET_WIN_SIZE_PIXELS",J[J.GET_CELL_SIZE_PIXELS=1]="GET_CELL_SIZE_PIXELS"})(L||(s.WindowsOptionsReportType=L={}));let V=0;class G extends _.Disposable{getAttrData(){return this._curAttrData}constructor(A,B,P,N,X,ie,ce,ve,q=new m.EscapeSequenceParser){super(),this._bufferService=A,this._charsetService=B,this._coreService=P,this._logService=N,this._optionsService=X,this._oscLinkService=ie,this._coreMouseService=ce,this._unicodeService=ve,this._parser=q,this._parseBuffer=new Uint32Array(4096),this._stringDecoder=new g.StringToUtf32,this._utf8Decoder=new g.Utf8ToUtf32,this._workCell=new p.CellData,this._windowTitle="",this._iconName="",this._windowTitleStack=[],this._iconNameStack=[],this._curAttrData=h.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=h.DEFAULT_ATTR_DATA.clone(),this._onRequestBell=this.register(new d.EventEmitter),this.onRequestBell=this._onRequestBell.event,this._onRequestRefreshRows=this.register(new d.EventEmitter),this.onRequestRefreshRows=this._onRequestRefreshRows.event,this._onRequestReset=this.register(new d.EventEmitter),this.onRequestReset=this._onRequestReset.event,this._onRequestSendFocus=this.register(new d.EventEmitter),this.onRequestSendFocus=this._onRequestSendFocus.event,this._onRequestSyncScrollBar=this.register(new d.EventEmitter),this.onRequestSyncScrollBar=this._onRequestSyncScrollBar.event,this._onRequestWindowsOptionsReport=this.register(new d.EventEmitter),this.onRequestWindowsOptionsReport=this._onRequestWindowsOptionsReport.event,this._onA11yChar=this.register(new d.EventEmitter),this.onA11yChar=this._onA11yChar.event,this._onA11yTab=this.register(new d.EventEmitter),this.onA11yTab=this._onA11yTab.event,this._onCursorMove=this.register(new d.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onLineFeed=this.register(new d.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onScroll=this.register(new d.EventEmitter),this.onScroll=this._onScroll.event,this._onTitleChange=this.register(new d.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onColor=this.register(new d.EventEmitter),this.onColor=this._onColor.event,this._parseStack={paused:!1,cursorStartX:0,cursorStartY:0,decodedLength:0,position:0},this._specialColors=[256,257,258],this.register(this._parser),this._dirtyRowTracker=new K(this._bufferService),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate((R=>this._activeBuffer=R.activeBuffer))),this._parser.setCsiHandlerFallback(((R,j)=>{this._logService.debug("Unknown CSI code: ",{identifier:this._parser.identToString(R),params:j.toArray()})})),this._parser.setEscHandlerFallback((R=>{this._logService.debug("Unknown ESC code: ",{identifier:this._parser.identToString(R)})})),this._parser.setExecuteHandlerFallback((R=>{this._logService.debug("Unknown EXECUTE code: ",{code:R})})),this._parser.setOscHandlerFallback(((R,j,Z)=>{this._logService.debug("Unknown OSC code: ",{identifier:R,action:j,data:Z})})),this._parser.setDcsHandlerFallback(((R,j,Z)=>{j==="HOOK"&&(Z=Z.toArray()),this._logService.debug("Unknown DCS code: ",{identifier:this._parser.identToString(R),action:j,payload:Z})})),this._parser.setPrintHandler(((R,j,Z)=>this.print(R,j,Z))),this._parser.registerCsiHandler({final:"@"},(R=>this.insertChars(R))),this._parser.registerCsiHandler({intermediates:" ",final:"@"},(R=>this.scrollLeft(R))),this._parser.registerCsiHandler({final:"A"},(R=>this.cursorUp(R))),this._parser.registerCsiHandler({intermediates:" ",final:"A"},(R=>this.scrollRight(R))),this._parser.registerCsiHandler({final:"B"},(R=>this.cursorDown(R))),this._parser.registerCsiHandler({final:"C"},(R=>this.cursorForward(R))),this._parser.registerCsiHandler({final:"D"},(R=>this.cursorBackward(R))),this._parser.registerCsiHandler({final:"E"},(R=>this.cursorNextLine(R))),this._parser.registerCsiHandler({final:"F"},(R=>this.cursorPrecedingLine(R))),this._parser.registerCsiHandler({final:"G"},(R=>this.cursorCharAbsolute(R))),this._parser.registerCsiHandler({final:"H"},(R=>this.cursorPosition(R))),this._parser.registerCsiHandler({final:"I"},(R=>this.cursorForwardTab(R))),this._parser.registerCsiHandler({final:"J"},(R=>this.eraseInDisplay(R,!1))),this._parser.registerCsiHandler({prefix:"?",final:"J"},(R=>this.eraseInDisplay(R,!0))),this._parser.registerCsiHandler({final:"K"},(R=>this.eraseInLine(R,!1))),this._parser.registerCsiHandler({prefix:"?",final:"K"},(R=>this.eraseInLine(R,!0))),this._parser.registerCsiHandler({final:"L"},(R=>this.insertLines(R))),this._parser.registerCsiHandler({final:"M"},(R=>this.deleteLines(R))),this._parser.registerCsiHandler({final:"P"},(R=>this.deleteChars(R))),this._parser.registerCsiHandler({final:"S"},(R=>this.scrollUp(R))),this._parser.registerCsiHandler({final:"T"},(R=>this.scrollDown(R))),this._parser.registerCsiHandler({final:"X"},(R=>this.eraseChars(R))),this._parser.registerCsiHandler({final:"Z"},(R=>this.cursorBackwardTab(R))),this._parser.registerCsiHandler({final:"`"},(R=>this.charPosAbsolute(R))),this._parser.registerCsiHandler({final:"a"},(R=>this.hPositionRelative(R))),this._parser.registerCsiHandler({final:"b"},(R=>this.repeatPrecedingCharacter(R))),this._parser.registerCsiHandler({final:"c"},(R=>this.sendDeviceAttributesPrimary(R))),this._parser.registerCsiHandler({prefix:">",final:"c"},(R=>this.sendDeviceAttributesSecondary(R))),this._parser.registerCsiHandler({final:"d"},(R=>this.linePosAbsolute(R))),this._parser.registerCsiHandler({final:"e"},(R=>this.vPositionRelative(R))),this._parser.registerCsiHandler({final:"f"},(R=>this.hVPosition(R))),this._parser.registerCsiHandler({final:"g"},(R=>this.tabClear(R))),this._parser.registerCsiHandler({final:"h"},(R=>this.setMode(R))),this._parser.registerCsiHandler({prefix:"?",final:"h"},(R=>this.setModePrivate(R))),this._parser.registerCsiHandler({final:"l"},(R=>this.resetMode(R))),this._parser.registerCsiHandler({prefix:"?",final:"l"},(R=>this.resetModePrivate(R))),this._parser.registerCsiHandler({final:"m"},(R=>this.charAttributes(R))),this._parser.registerCsiHandler({final:"n"},(R=>this.deviceStatus(R))),this._parser.registerCsiHandler({prefix:"?",final:"n"},(R=>this.deviceStatusPrivate(R))),this._parser.registerCsiHandler({intermediates:"!",final:"p"},(R=>this.softReset(R))),this._parser.registerCsiHandler({intermediates:" ",final:"q"},(R=>this.setCursorStyle(R))),this._parser.registerCsiHandler({final:"r"},(R=>this.setScrollRegion(R))),this._parser.registerCsiHandler({final:"s"},(R=>this.saveCursor(R))),this._parser.registerCsiHandler({final:"t"},(R=>this.windowOptions(R))),this._parser.registerCsiHandler({final:"u"},(R=>this.restoreCursor(R))),this._parser.registerCsiHandler({intermediates:"'",final:"}"},(R=>this.insertColumns(R))),this._parser.registerCsiHandler({intermediates:"'",final:"~"},(R=>this.deleteColumns(R))),this._parser.registerCsiHandler({intermediates:'"',final:"q"},(R=>this.selectProtected(R))),this._parser.registerCsiHandler({intermediates:"$",final:"p"},(R=>this.requestMode(R,!0))),this._parser.registerCsiHandler({prefix:"?",intermediates:"$",final:"p"},(R=>this.requestMode(R,!1))),this._parser.setExecuteHandler(c.C0.BEL,(()=>this.bell())),this._parser.setExecuteHandler(c.C0.LF,(()=>this.lineFeed())),this._parser.setExecuteHandler(c.C0.VT,(()=>this.lineFeed())),this._parser.setExecuteHandler(c.C0.FF,(()=>this.lineFeed())),this._parser.setExecuteHandler(c.C0.CR,(()=>this.carriageReturn())),this._parser.setExecuteHandler(c.C0.BS,(()=>this.backspace())),this._parser.setExecuteHandler(c.C0.HT,(()=>this.tab())),this._parser.setExecuteHandler(c.C0.SO,(()=>this.shiftOut())),this._parser.setExecuteHandler(c.C0.SI,(()=>this.shiftIn())),this._parser.setExecuteHandler(c.C1.IND,(()=>this.index())),this._parser.setExecuteHandler(c.C1.NEL,(()=>this.nextLine())),this._parser.setExecuteHandler(c.C1.HTS,(()=>this.tabSet())),this._parser.registerOscHandler(0,new C.OscHandler((R=>(this.setTitle(R),this.setIconName(R),!0)))),this._parser.registerOscHandler(1,new C.OscHandler((R=>this.setIconName(R)))),this._parser.registerOscHandler(2,new C.OscHandler((R=>this.setTitle(R)))),this._parser.registerOscHandler(4,new C.OscHandler((R=>this.setOrReportIndexedColor(R)))),this._parser.registerOscHandler(8,new C.OscHandler((R=>this.setHyperlink(R)))),this._parser.registerOscHandler(10,new C.OscHandler((R=>this.setOrReportFgColor(R)))),this._parser.registerOscHandler(11,new C.OscHandler((R=>this.setOrReportBgColor(R)))),this._parser.registerOscHandler(12,new C.OscHandler((R=>this.setOrReportCursorColor(R)))),this._parser.registerOscHandler(104,new C.OscHandler((R=>this.restoreIndexedColor(R)))),this._parser.registerOscHandler(110,new C.OscHandler((R=>this.restoreFgColor(R)))),this._parser.registerOscHandler(111,new C.OscHandler((R=>this.restoreBgColor(R)))),this._parser.registerOscHandler(112,new C.OscHandler((R=>this.restoreCursorColor(R)))),this._parser.registerEscHandler({final:"7"},(()=>this.saveCursor())),this._parser.registerEscHandler({final:"8"},(()=>this.restoreCursor())),this._parser.registerEscHandler({final:"D"},(()=>this.index())),this._parser.registerEscHandler({final:"E"},(()=>this.nextLine())),this._parser.registerEscHandler({final:"H"},(()=>this.tabSet())),this._parser.registerEscHandler({final:"M"},(()=>this.reverseIndex())),this._parser.registerEscHandler({final:"="},(()=>this.keypadApplicationMode())),this._parser.registerEscHandler({final:">"},(()=>this.keypadNumericMode())),this._parser.registerEscHandler({final:"c"},(()=>this.fullReset())),this._parser.registerEscHandler({final:"n"},(()=>this.setgLevel(2))),this._parser.registerEscHandler({final:"o"},(()=>this.setgLevel(3))),this._parser.registerEscHandler({final:"|"},(()=>this.setgLevel(3))),this._parser.registerEscHandler({final:"}"},(()=>this.setgLevel(2))),this._parser.registerEscHandler({final:"~"},(()=>this.setgLevel(1))),this._parser.registerEscHandler({intermediates:"%",final:"@"},(()=>this.selectDefaultCharset())),this._parser.registerEscHandler({intermediates:"%",final:"G"},(()=>this.selectDefaultCharset()));for(let R in f.CHARSETS)this._parser.registerEscHandler({intermediates:"(",final:R},(()=>this.selectCharset("("+R))),this._parser.registerEscHandler({intermediates:")",final:R},(()=>this.selectCharset(")"+R))),this._parser.registerEscHandler({intermediates:"*",final:R},(()=>this.selectCharset("*"+R))),this._parser.registerEscHandler({intermediates:"+",final:R},(()=>this.selectCharset("+"+R))),this._parser.registerEscHandler({intermediates:"-",final:R},(()=>this.selectCharset("-"+R))),this._parser.registerEscHandler({intermediates:".",final:R},(()=>this.selectCharset("."+R))),this._parser.registerEscHandler({intermediates:"/",final:R},(()=>this.selectCharset("/"+R)));this._parser.registerEscHandler({intermediates:"#",final:"8"},(()=>this.screenAlignmentPattern())),this._parser.setErrorHandler((R=>(this._logService.error("Parsing error: ",R),R))),this._parser.registerDcsHandler({intermediates:"$",final:"q"},new y.DcsHandler(((R,j)=>this.requestStatusString(R,j))))}_preserveStack(A,B,P,N){this._parseStack.paused=!0,this._parseStack.cursorStartX=A,this._parseStack.cursorStartY=B,this._parseStack.decodedLength=P,this._parseStack.position=N}_logSlowResolvingAsync(A){this._logService.logLevel<=x.LogLevelEnum.WARN&&Promise.race([A,new Promise(((B,P)=>setTimeout((()=>P("#SLOW_TIMEOUT")),5e3)))]).catch((B=>{if(B!=="#SLOW_TIMEOUT")throw B;console.warn("async parser handler taking longer than 5000 ms")}))}_getCurrentLinkId(){return this._curAttrData.extended.urlId}parse(A,B){let P,N=this._activeBuffer.x,X=this._activeBuffer.y,ie=0,ce=this._parseStack.paused;if(ce){if(P=this._parser.parse(this._parseBuffer,this._parseStack.decodedLength,B))return this._logSlowResolvingAsync(P),P;N=this._parseStack.cursorStartX,X=this._parseStack.cursorStartY,this._parseStack.paused=!1,A.length>$&&(ie=this._parseStack.position+$)}if(this._logService.logLevel<=x.LogLevelEnum.DEBUG&&this._logService.debug("parsing data"+(typeof A=="string"?` "${A}"`:` "${Array.prototype.map.call(A,(R=>String.fromCharCode(R))).join("")}"`),typeof A=="string"?A.split("").map((R=>R.charCodeAt(0))):A),this._parseBuffer.length<A.length&&this._parseBuffer.length<$&&(this._parseBuffer=new Uint32Array(Math.min(A.length,$))),ce||this._dirtyRowTracker.clearRange(),A.length>$)for(let R=ie;R<A.length;R+=$){let j=R+$<A.length?R+$:A.length,Z=typeof A=="string"?this._stringDecoder.decode(A.substring(R,j),this._parseBuffer):this._utf8Decoder.decode(A.subarray(R,j),this._parseBuffer);if(P=this._parser.parse(this._parseBuffer,Z))return this._preserveStack(N,X,Z,R),this._logSlowResolvingAsync(P),P}else if(!ce){let R=typeof A=="string"?this._stringDecoder.decode(A,this._parseBuffer):this._utf8Decoder.decode(A,this._parseBuffer);if(P=this._parser.parse(this._parseBuffer,R))return this._preserveStack(N,X,R,0),this._logSlowResolvingAsync(P),P}this._activeBuffer.x===N&&this._activeBuffer.y===X||this._onCursorMove.fire();let ve=this._dirtyRowTracker.end+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp),q=this._dirtyRowTracker.start+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp);q<this._bufferService.rows&&this._onRequestRefreshRows.fire(Math.min(q,this._bufferService.rows-1),Math.min(ve,this._bufferService.rows-1))}print(A,B,P){let N,X,ie=this._charsetService.charset,ce=this._optionsService.rawOptions.screenReaderMode,ve=this._bufferService.cols,q=this._coreService.decPrivateModes.wraparound,R=this._coreService.modes.insertMode,j=this._curAttrData,Z=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._activeBuffer.x&&P-B>0&&Z.getWidth(this._activeBuffer.x-1)===2&&Z.setCellFromCodepoint(this._activeBuffer.x-1,0,1,j);let ne=this._parser.precedingJoinState;for(let oe=B;oe<P;++oe){if(N=A[oe],N<127&&ie){let it=ie[String.fromCharCode(N)];it&&(N=it.charCodeAt(0))}let Ee=this._unicodeService.charProperties(N,ne);X=S.UnicodeService.extractWidth(Ee);let He=S.UnicodeService.extractShouldJoin(Ee),Fe=He?S.UnicodeService.extractWidth(ne):0;if(ne=Ee,ce&&this._onA11yChar.fire((0,g.stringFromCodePoint)(N)),this._getCurrentLinkId()&&this._oscLinkService.addLineToLink(this._getCurrentLinkId(),this._activeBuffer.ybase+this._activeBuffer.y),this._activeBuffer.x+X-Fe>ve){if(q){let it=Z,xe=this._activeBuffer.x-Fe;for(this._activeBuffer.x=Fe,this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData(),!0)):(this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!0),Z=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y),Fe>0&&Z instanceof h.BufferLine&&Z.copyCellsFrom(it,xe,0,Fe,!1);xe<ve;)it.setCellFromCodepoint(xe++,0,1,j)}else if(this._activeBuffer.x=ve-1,X===2)continue}if(He&&this._activeBuffer.x){let it=Z.getWidth(this._activeBuffer.x-1)?1:2;Z.addCodepointToCell(this._activeBuffer.x-it,N,X);for(let xe=X-Fe;--xe>=0;)Z.setCellFromCodepoint(this._activeBuffer.x++,0,0,j)}else if(R&&(Z.insertCells(this._activeBuffer.x,X-Fe,this._activeBuffer.getNullCell(j)),Z.getWidth(ve-1)===2&&Z.setCellFromCodepoint(ve-1,u.NULL_CELL_CODE,u.NULL_CELL_WIDTH,j)),Z.setCellFromCodepoint(this._activeBuffer.x++,N,X,j),X>0)for(;--X;)Z.setCellFromCodepoint(this._activeBuffer.x++,0,0,j)}this._parser.precedingJoinState=ne,this._activeBuffer.x<ve&&P-B>0&&Z.getWidth(this._activeBuffer.x)===0&&!Z.hasContent(this._activeBuffer.x)&&Z.setCellFromCodepoint(this._activeBuffer.x,0,1,j),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}registerCsiHandler(A,B){return A.final!=="t"||A.prefix||A.intermediates?this._parser.registerCsiHandler(A,B):this._parser.registerCsiHandler(A,(P=>!F(P.params[0],this._optionsService.rawOptions.windowOptions)||B(P)))}registerDcsHandler(A,B){return this._parser.registerDcsHandler(A,new y.DcsHandler(B))}registerEscHandler(A,B){return this._parser.registerEscHandler(A,B)}registerOscHandler(A,B){return this._parser.registerOscHandler(A,new C.OscHandler(B))}bell(){return this._onRequestBell.fire(),!0}lineFeed(){return this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._optionsService.rawOptions.convertEol&&(this._activeBuffer.x=0),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows?this._activeBuffer.y=this._bufferService.rows-1:this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.x>=this._bufferService.cols&&this._activeBuffer.x--,this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._onLineFeed.fire(),!0}carriageReturn(){return this._activeBuffer.x=0,!0}backspace(){if(!this._coreService.decPrivateModes.reverseWraparound)return this._restrictCursor(),this._activeBuffer.x>0&&this._activeBuffer.x--,!0;if(this._restrictCursor(this._bufferService.cols),this._activeBuffer.x>0)this._activeBuffer.x--;else if(this._activeBuffer.x===0&&this._activeBuffer.y>this._activeBuffer.scrollTop&&this._activeBuffer.y<=this._activeBuffer.scrollBottom&&this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y)?.isWrapped){this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.y--,this._activeBuffer.x=this._bufferService.cols-1;let A=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);A.hasWidth(this._activeBuffer.x)&&!A.hasContent(this._activeBuffer.x)&&this._activeBuffer.x--}return this._restrictCursor(),!0}tab(){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let A=this._activeBuffer.x;return this._activeBuffer.x=this._activeBuffer.nextStop(),this._optionsService.rawOptions.screenReaderMode&&this._onA11yTab.fire(this._activeBuffer.x-A),!0}shiftOut(){return this._charsetService.setgLevel(1),!0}shiftIn(){return this._charsetService.setgLevel(0),!0}_restrictCursor(A=this._bufferService.cols-1){this._activeBuffer.x=Math.min(A,Math.max(0,this._activeBuffer.x)),this._activeBuffer.y=this._coreService.decPrivateModes.origin?Math.min(this._activeBuffer.scrollBottom,Math.max(this._activeBuffer.scrollTop,this._activeBuffer.y)):Math.min(this._bufferService.rows-1,Math.max(0,this._activeBuffer.y)),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_setCursor(A,B){this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._coreService.decPrivateModes.origin?(this._activeBuffer.x=A,this._activeBuffer.y=this._activeBuffer.scrollTop+B):(this._activeBuffer.x=A,this._activeBuffer.y=B),this._restrictCursor(),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_moveCursor(A,B){this._restrictCursor(),this._setCursor(this._activeBuffer.x+A,this._activeBuffer.y+B)}cursorUp(A){let B=this._activeBuffer.y-this._activeBuffer.scrollTop;return B>=0?this._moveCursor(0,-Math.min(B,A.params[0]||1)):this._moveCursor(0,-(A.params[0]||1)),!0}cursorDown(A){let B=this._activeBuffer.scrollBottom-this._activeBuffer.y;return B>=0?this._moveCursor(0,Math.min(B,A.params[0]||1)):this._moveCursor(0,A.params[0]||1),!0}cursorForward(A){return this._moveCursor(A.params[0]||1,0),!0}cursorBackward(A){return this._moveCursor(-(A.params[0]||1),0),!0}cursorNextLine(A){return this.cursorDown(A),this._activeBuffer.x=0,!0}cursorPrecedingLine(A){return this.cursorUp(A),this._activeBuffer.x=0,!0}cursorCharAbsolute(A){return this._setCursor((A.params[0]||1)-1,this._activeBuffer.y),!0}cursorPosition(A){return this._setCursor(A.length>=2?(A.params[1]||1)-1:0,(A.params[0]||1)-1),!0}charPosAbsolute(A){return this._setCursor((A.params[0]||1)-1,this._activeBuffer.y),!0}hPositionRelative(A){return this._moveCursor(A.params[0]||1,0),!0}linePosAbsolute(A){return this._setCursor(this._activeBuffer.x,(A.params[0]||1)-1),!0}vPositionRelative(A){return this._moveCursor(0,A.params[0]||1),!0}hVPosition(A){return this.cursorPosition(A),!0}tabClear(A){let B=A.params[0];return B===0?delete this._activeBuffer.tabs[this._activeBuffer.x]:B===3&&(this._activeBuffer.tabs={}),!0}cursorForwardTab(A){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let B=A.params[0]||1;for(;B--;)this._activeBuffer.x=this._activeBuffer.nextStop();return!0}cursorBackwardTab(A){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let B=A.params[0]||1;for(;B--;)this._activeBuffer.x=this._activeBuffer.prevStop();return!0}selectProtected(A){let B=A.params[0];return B===1&&(this._curAttrData.bg|=536870912),B!==2&&B!==0||(this._curAttrData.bg&=-536870913),!0}_eraseInBufferLine(A,B,P,N=!1,X=!1){let ie=this._activeBuffer.lines.get(this._activeBuffer.ybase+A);ie.replaceCells(B,P,this._activeBuffer.getNullCell(this._eraseAttrData()),X),N&&(ie.isWrapped=!1)}_resetBufferLine(A,B=!1){let P=this._activeBuffer.lines.get(this._activeBuffer.ybase+A);P&&(P.fill(this._activeBuffer.getNullCell(this._eraseAttrData()),B),this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase+A),P.isWrapped=!1)}eraseInDisplay(A,B=!1){let P;switch(this._restrictCursor(this._bufferService.cols),A.params[0]){case 0:for(P=this._activeBuffer.y,this._dirtyRowTracker.markDirty(P),this._eraseInBufferLine(P++,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,B);P<this._bufferService.rows;P++)this._resetBufferLine(P,B);this._dirtyRowTracker.markDirty(P);break;case 1:for(P=this._activeBuffer.y,this._dirtyRowTracker.markDirty(P),this._eraseInBufferLine(P,0,this._activeBuffer.x+1,!0,B),this._activeBuffer.x+1>=this._bufferService.cols&&(this._activeBuffer.lines.get(P+1).isWrapped=!1);P--;)this._resetBufferLine(P,B);this._dirtyRowTracker.markDirty(0);break;case 2:for(P=this._bufferService.rows,this._dirtyRowTracker.markDirty(P-1);P--;)this._resetBufferLine(P,B);this._dirtyRowTracker.markDirty(0);break;case 3:let N=this._activeBuffer.lines.length-this._bufferService.rows;N>0&&(this._activeBuffer.lines.trimStart(N),this._activeBuffer.ybase=Math.max(this._activeBuffer.ybase-N,0),this._activeBuffer.ydisp=Math.max(this._activeBuffer.ydisp-N,0),this._onScroll.fire(0))}return!0}eraseInLine(A,B=!1){switch(this._restrictCursor(this._bufferService.cols),A.params[0]){case 0:this._eraseInBufferLine(this._activeBuffer.y,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,B);break;case 1:this._eraseInBufferLine(this._activeBuffer.y,0,this._activeBuffer.x+1,!1,B);break;case 2:this._eraseInBufferLine(this._activeBuffer.y,0,this._bufferService.cols,!0,B)}return this._dirtyRowTracker.markDirty(this._activeBuffer.y),!0}insertLines(A){this._restrictCursor();let B=A.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let P=this._activeBuffer.ybase+this._activeBuffer.y,N=this._bufferService.rows-1-this._activeBuffer.scrollBottom,X=this._bufferService.rows-1+this._activeBuffer.ybase-N+1;for(;B--;)this._activeBuffer.lines.splice(X-1,1),this._activeBuffer.lines.splice(P,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}deleteLines(A){this._restrictCursor();let B=A.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let P=this._activeBuffer.ybase+this._activeBuffer.y,N;for(N=this._bufferService.rows-1-this._activeBuffer.scrollBottom,N=this._bufferService.rows-1+this._activeBuffer.ybase-N;B--;)this._activeBuffer.lines.splice(P,1),this._activeBuffer.lines.splice(N,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}insertChars(A){this._restrictCursor();let B=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return B&&(B.insertCells(this._activeBuffer.x,A.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}deleteChars(A){this._restrictCursor();let B=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return B&&(B.deleteCells(this._activeBuffer.x,A.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}scrollUp(A){let B=A.params[0]||1;for(;B--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollDown(A){let B=A.params[0]||1;for(;B--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,0,this._activeBuffer.getBlankLine(h.DEFAULT_ATTR_DATA));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollLeft(A){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let B=A.params[0]||1;for(let P=this._activeBuffer.scrollTop;P<=this._activeBuffer.scrollBottom;++P){let N=this._activeBuffer.lines.get(this._activeBuffer.ybase+P);N.deleteCells(0,B,this._activeBuffer.getNullCell(this._eraseAttrData())),N.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollRight(A){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let B=A.params[0]||1;for(let P=this._activeBuffer.scrollTop;P<=this._activeBuffer.scrollBottom;++P){let N=this._activeBuffer.lines.get(this._activeBuffer.ybase+P);N.insertCells(0,B,this._activeBuffer.getNullCell(this._eraseAttrData())),N.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}insertColumns(A){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let B=A.params[0]||1;for(let P=this._activeBuffer.scrollTop;P<=this._activeBuffer.scrollBottom;++P){let N=this._activeBuffer.lines.get(this._activeBuffer.ybase+P);N.insertCells(this._activeBuffer.x,B,this._activeBuffer.getNullCell(this._eraseAttrData())),N.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}deleteColumns(A){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let B=A.params[0]||1;for(let P=this._activeBuffer.scrollTop;P<=this._activeBuffer.scrollBottom;++P){let N=this._activeBuffer.lines.get(this._activeBuffer.ybase+P);N.deleteCells(this._activeBuffer.x,B,this._activeBuffer.getNullCell(this._eraseAttrData())),N.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}eraseChars(A){this._restrictCursor();let B=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return B&&(B.replaceCells(this._activeBuffer.x,this._activeBuffer.x+(A.params[0]||1),this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}repeatPrecedingCharacter(A){let B=this._parser.precedingJoinState;if(!B)return!0;let P=A.params[0]||1,N=S.UnicodeService.extractWidth(B),X=this._activeBuffer.x-N,ie=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).getString(X),ce=new Uint32Array(ie.length*P),ve=0;for(let R=0;R<ie.length;){let j=ie.codePointAt(R)||0;ce[ve++]=j,R+=j>65535?2:1}let q=ve;for(let R=1;R<P;++R)ce.copyWithin(q,0,ve),q+=ve;return this.print(ce,0,q),!0}sendDeviceAttributesPrimary(A){return A.params[0]>0||(this._is("xterm")||this._is("rxvt-unicode")||this._is("screen")?this._coreService.triggerDataEvent(c.C0.ESC+"[?1;2c"):this._is("linux")&&this._coreService.triggerDataEvent(c.C0.ESC+"[?6c")),!0}sendDeviceAttributesSecondary(A){return A.params[0]>0||(this._is("xterm")?this._coreService.triggerDataEvent(c.C0.ESC+"[>0;276;0c"):this._is("rxvt-unicode")?this._coreService.triggerDataEvent(c.C0.ESC+"[>85;95;0c"):this._is("linux")?this._coreService.triggerDataEvent(A.params[0]+"c"):this._is("screen")&&this._coreService.triggerDataEvent(c.C0.ESC+"[>83;40003;0c")),!0}_is(A){return(this._optionsService.rawOptions.termName+"").indexOf(A)===0}setMode(A){for(let B=0;B<A.length;B++)switch(A.params[B]){case 4:this._coreService.modes.insertMode=!0;break;case 20:this._optionsService.options.convertEol=!0}return!0}setModePrivate(A){for(let B=0;B<A.length;B++)switch(A.params[B]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!0;break;case 2:this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),this._charsetService.setgCharset(1,f.DEFAULT_CHARSET),this._charsetService.setgCharset(2,f.DEFAULT_CHARSET),this._charsetService.setgCharset(3,f.DEFAULT_CHARSET);break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(132,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!0,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!0;break;case 12:this._optionsService.options.cursorBlink=!0;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!0;break;case 66:this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire();break;case 9:this._coreMouseService.activeProtocol="X10";break;case 1e3:this._coreMouseService.activeProtocol="VT200";break;case 1002:this._coreMouseService.activeProtocol="DRAG";break;case 1003:this._coreMouseService.activeProtocol="ANY";break;case 1004:this._coreService.decPrivateModes.sendFocus=!0,this._onRequestSendFocus.fire();break;case 1005:this._logService.debug("DECSET 1005 not supported (see #2507)");break;case 1006:this._coreMouseService.activeEncoding="SGR";break;case 1015:this._logService.debug("DECSET 1015 not supported (see #2507)");break;case 1016:this._coreMouseService.activeEncoding="SGR_PIXELS";break;case 25:this._coreService.isCursorHidden=!1;break;case 1048:this.saveCursor();break;case 1049:this.saveCursor();case 47:case 1047:this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!0}return!0}resetMode(A){for(let B=0;B<A.length;B++)switch(A.params[B]){case 4:this._coreService.modes.insertMode=!1;break;case 20:this._optionsService.options.convertEol=!1}return!0}resetModePrivate(A){for(let B=0;B<A.length;B++)switch(A.params[B]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!1;break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(80,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!1,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!1;break;case 12:this._optionsService.options.cursorBlink=!1;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!1;break;case 66:this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire();break;case 9:case 1e3:case 1002:case 1003:this._coreMouseService.activeProtocol="NONE";break;case 1004:this._coreService.decPrivateModes.sendFocus=!1;break;case 1005:this._logService.debug("DECRST 1005 not supported (see #2507)");break;case 1006:case 1016:this._coreMouseService.activeEncoding="DEFAULT";break;case 1015:this._logService.debug("DECRST 1015 not supported (see #2507)");break;case 25:this._coreService.isCursorHidden=!0;break;case 1048:this.restoreCursor();break;case 1049:case 47:case 1047:this._bufferService.buffers.activateNormalBuffer(),A.params[B]===1049&&this.restoreCursor(),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!1}return!0}requestMode(A,B){let P=this._coreService.decPrivateModes,{activeProtocol:N,activeEncoding:X}=this._coreMouseService,ie=this._coreService,{buffers:ce,cols:ve}=this._bufferService,{active:q,alt:R}=ce,j=this._optionsService.rawOptions,Z=He=>He?1:2,ne=A.params[0];return oe=ne,Ee=B?ne===2?4:ne===4?Z(ie.modes.insertMode):ne===12?3:ne===20?Z(j.convertEol):0:ne===1?Z(P.applicationCursorKeys):ne===3?j.windowOptions.setWinLines?ve===80?2:ve===132?1:0:0:ne===6?Z(P.origin):ne===7?Z(P.wraparound):ne===8?3:ne===9?Z(N==="X10"):ne===12?Z(j.cursorBlink):ne===25?Z(!ie.isCursorHidden):ne===45?Z(P.reverseWraparound):ne===66?Z(P.applicationKeypad):ne===67?4:ne===1e3?Z(N==="VT200"):ne===1002?Z(N==="DRAG"):ne===1003?Z(N==="ANY"):ne===1004?Z(P.sendFocus):ne===1005?4:ne===1006?Z(X==="SGR"):ne===1015?4:ne===1016?Z(X==="SGR_PIXELS"):ne===1048?1:ne===47||ne===1047||ne===1049?Z(q===R):ne===2004?Z(P.bracketedPasteMode):0,ie.triggerDataEvent(`${c.C0.ESC}[${B?"":"?"}${oe};${Ee}$y`),!0;var oe,Ee}_updateAttrColor(A,B,P,N,X){return B===2?(A|=50331648,A&=-16777216,A|=v.AttributeData.fromColorRGB([P,N,X])):B===5&&(A&=-50331904,A|=33554432|255&P),A}_extractColor(A,B,P){let N=[0,0,-1,0,0,0],X=0,ie=0;do{if(N[ie+X]=A.params[B+ie],A.hasSubParams(B+ie)){let ce=A.getSubParams(B+ie),ve=0;do N[1]===5&&(X=1),N[ie+ve+1+X]=ce[ve];while(++ve<ce.length&&ve+ie+1+X<N.length);break}if(N[1]===5&&ie+X>=2||N[1]===2&&ie+X>=5)break;N[1]&&(X=1)}while(++ie+B<A.length&&ie+X<N.length);for(let ce=2;ce<N.length;++ce)N[ce]===-1&&(N[ce]=0);switch(N[0]){case 38:P.fg=this._updateAttrColor(P.fg,N[1],N[3],N[4],N[5]);break;case 48:P.bg=this._updateAttrColor(P.bg,N[1],N[3],N[4],N[5]);break;case 58:P.extended=P.extended.clone(),P.extended.underlineColor=this._updateAttrColor(P.extended.underlineColor,N[1],N[3],N[4],N[5])}return ie}_processUnderline(A,B){B.extended=B.extended.clone(),(!~A||A>5)&&(A=1),B.extended.underlineStyle=A,B.fg|=268435456,A===0&&(B.fg&=-268435457),B.updateExtended()}_processSGR0(A){A.fg=h.DEFAULT_ATTR_DATA.fg,A.bg=h.DEFAULT_ATTR_DATA.bg,A.extended=A.extended.clone(),A.extended.underlineStyle=0,A.extended.underlineColor&=-67108864,A.updateExtended()}charAttributes(A){if(A.length===1&&A.params[0]===0)return this._processSGR0(this._curAttrData),!0;let B=A.length,P,N=this._curAttrData;for(let X=0;X<B;X++)P=A.params[X],P>=30&&P<=37?(N.fg&=-50331904,N.fg|=16777216|P-30):P>=40&&P<=47?(N.bg&=-50331904,N.bg|=16777216|P-40):P>=90&&P<=97?(N.fg&=-50331904,N.fg|=16777224|P-90):P>=100&&P<=107?(N.bg&=-50331904,N.bg|=16777224|P-100):P===0?this._processSGR0(N):P===1?N.fg|=134217728:P===3?N.bg|=67108864:P===4?(N.fg|=268435456,this._processUnderline(A.hasSubParams(X)?A.getSubParams(X)[0]:1,N)):P===5?N.fg|=536870912:P===7?N.fg|=67108864:P===8?N.fg|=1073741824:P===9?N.fg|=2147483648:P===2?N.bg|=134217728:P===21?this._processUnderline(2,N):P===22?(N.fg&=-134217729,N.bg&=-134217729):P===23?N.bg&=-67108865:P===24?(N.fg&=-268435457,this._processUnderline(0,N)):P===25?N.fg&=-536870913:P===27?N.fg&=-67108865:P===28?N.fg&=-1073741825:P===29?N.fg&=2147483647:P===39?(N.fg&=-67108864,N.fg|=16777215&h.DEFAULT_ATTR_DATA.fg):P===49?(N.bg&=-67108864,N.bg|=16777215&h.DEFAULT_ATTR_DATA.bg):P===38||P===48||P===58?X+=this._extractColor(A,X,N):P===53?N.bg|=1073741824:P===55?N.bg&=-1073741825:P===59?(N.extended=N.extended.clone(),N.extended.underlineColor=-1,N.updateExtended()):P===100?(N.fg&=-67108864,N.fg|=16777215&h.DEFAULT_ATTR_DATA.fg,N.bg&=-67108864,N.bg|=16777215&h.DEFAULT_ATTR_DATA.bg):this._logService.debug("Unknown SGR attribute: %d.",P);return!0}deviceStatus(A){switch(A.params[0]){case 5:this._coreService.triggerDataEvent(`${c.C0.ESC}[0n`);break;case 6:let B=this._activeBuffer.y+1,P=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${c.C0.ESC}[${B};${P}R`)}return!0}deviceStatusPrivate(A){if(A.params[0]===6){let B=this._activeBuffer.y+1,P=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${c.C0.ESC}[?${B};${P}R`)}return!0}softReset(A){return this._coreService.isCursorHidden=!1,this._onRequestSyncScrollBar.fire(),this._activeBuffer.scrollTop=0,this._activeBuffer.scrollBottom=this._bufferService.rows-1,this._curAttrData=h.DEFAULT_ATTR_DATA.clone(),this._coreService.reset(),this._charsetService.reset(),this._activeBuffer.savedX=0,this._activeBuffer.savedY=this._activeBuffer.ybase,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,this._coreService.decPrivateModes.origin=!1,!0}setCursorStyle(A){let B=A.params[0]||1;switch(B){case 1:case 2:this._optionsService.options.cursorStyle="block";break;case 3:case 4:this._optionsService.options.cursorStyle="underline";break;case 5:case 6:this._optionsService.options.cursorStyle="bar"}let P=B%2==1;return this._optionsService.options.cursorBlink=P,!0}setScrollRegion(A){let B=A.params[0]||1,P;return(A.length<2||(P=A.params[1])>this._bufferService.rows||P===0)&&(P=this._bufferService.rows),P>B&&(this._activeBuffer.scrollTop=B-1,this._activeBuffer.scrollBottom=P-1,this._setCursor(0,0)),!0}windowOptions(A){if(!F(A.params[0],this._optionsService.rawOptions.windowOptions))return!0;let B=A.length>1?A.params[1]:0;switch(A.params[0]){case 14:B!==2&&this._onRequestWindowsOptionsReport.fire(L.GET_WIN_SIZE_PIXELS);break;case 16:this._onRequestWindowsOptionsReport.fire(L.GET_CELL_SIZE_PIXELS);break;case 18:this._bufferService&&this._coreService.triggerDataEvent(`${c.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);break;case 22:B!==0&&B!==2||(this._windowTitleStack.push(this._windowTitle),this._windowTitleStack.length>10&&this._windowTitleStack.shift()),B!==0&&B!==1||(this._iconNameStack.push(this._iconName),this._iconNameStack.length>10&&this._iconNameStack.shift());break;case 23:B!==0&&B!==2||this._windowTitleStack.length&&this.setTitle(this._windowTitleStack.pop()),B!==0&&B!==1||this._iconNameStack.length&&this.setIconName(this._iconNameStack.pop())}return!0}saveCursor(A){return this._activeBuffer.savedX=this._activeBuffer.x,this._activeBuffer.savedY=this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,!0}restoreCursor(A){return this._activeBuffer.x=this._activeBuffer.savedX||0,this._activeBuffer.y=Math.max(this._activeBuffer.savedY-this._activeBuffer.ybase,0),this._curAttrData.fg=this._activeBuffer.savedCurAttrData.fg,this._curAttrData.bg=this._activeBuffer.savedCurAttrData.bg,this._charsetService.charset=this._savedCharset,this._activeBuffer.savedCharset&&(this._charsetService.charset=this._activeBuffer.savedCharset),this._restrictCursor(),!0}setTitle(A){return this._windowTitle=A,this._onTitleChange.fire(A),!0}setIconName(A){return this._iconName=A,!0}setOrReportIndexedColor(A){let B=[],P=A.split(";");for(;P.length>1;){let N=P.shift(),X=P.shift();if(/^\d+$/.exec(N)){let ie=parseInt(N);if(re(ie))if(X==="?")B.push({type:0,index:ie});else{let ce=(0,k.parseColor)(X);ce&&B.push({type:1,index:ie,color:ce})}}}return B.length&&this._onColor.fire(B),!0}setHyperlink(A){let B=A.split(";");return!(B.length<2)&&(B[1]?this._createHyperlink(B[0],B[1]):!B[0]&&this._finishHyperlink())}_createHyperlink(A,B){this._getCurrentLinkId()&&this._finishHyperlink();let P=A.split(":"),N,X=P.findIndex((ie=>ie.startsWith("id=")));return X!==-1&&(N=P[X].slice(3)||void 0),this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=this._oscLinkService.registerLink({id:N,uri:B}),this._curAttrData.updateExtended(),!0}_finishHyperlink(){return this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=0,this._curAttrData.updateExtended(),!0}_setOrReportSpecialColor(A,B){let P=A.split(";");for(let N=0;N<P.length&&!(B>=this._specialColors.length);++N,++B)if(P[N]==="?")this._onColor.fire([{type:0,index:this._specialColors[B]}]);else{let X=(0,k.parseColor)(P[N]);X&&this._onColor.fire([{type:1,index:this._specialColors[B],color:X}])}return!0}setOrReportFgColor(A){return this._setOrReportSpecialColor(A,0)}setOrReportBgColor(A){return this._setOrReportSpecialColor(A,1)}setOrReportCursorColor(A){return this._setOrReportSpecialColor(A,2)}restoreIndexedColor(A){if(!A)return this._onColor.fire([{type:2}]),!0;let B=[],P=A.split(";");for(let N=0;N<P.length;++N)if(/^\d+$/.exec(P[N])){let X=parseInt(P[N]);re(X)&&B.push({type:2,index:X})}return B.length&&this._onColor.fire(B),!0}restoreFgColor(A){return this._onColor.fire([{type:2,index:256}]),!0}restoreBgColor(A){return this._onColor.fire([{type:2,index:257}]),!0}restoreCursorColor(A){return this._onColor.fire([{type:2,index:258}]),!0}nextLine(){return this._activeBuffer.x=0,this.index(),!0}keypadApplicationMode(){return this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire(),!0}keypadNumericMode(){return this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire(),!0}selectDefaultCharset(){return this._charsetService.setgLevel(0),this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),!0}selectCharset(A){return A.length!==2?(this.selectDefaultCharset(),!0):(A[0]==="/"||this._charsetService.setgCharset(D[A[0]],f.CHARSETS[A[1]]||f.DEFAULT_CHARSET),!0)}index(){return this._restrictCursor(),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._restrictCursor(),!0}tabSet(){return this._activeBuffer.tabs[this._activeBuffer.x]=!0,!0}reverseIndex(){if(this._restrictCursor(),this._activeBuffer.y===this._activeBuffer.scrollTop){let A=this._activeBuffer.scrollBottom-this._activeBuffer.scrollTop;this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase+this._activeBuffer.y,A,1),this._activeBuffer.lines.set(this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.getBlankLine(this._eraseAttrData())),this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom)}else this._activeBuffer.y--,this._restrictCursor();return!0}fullReset(){return this._parser.reset(),this._onRequestReset.fire(),!0}reset(){this._curAttrData=h.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=h.DEFAULT_ATTR_DATA.clone()}_eraseAttrData(){return this._eraseAttrDataInternal.bg&=-67108864,this._eraseAttrDataInternal.bg|=67108863&this._curAttrData.bg,this._eraseAttrDataInternal}setgLevel(A){return this._charsetService.setgLevel(A),!0}screenAlignmentPattern(){let A=new p.CellData;A.content=4194373,A.fg=this._curAttrData.fg,A.bg=this._curAttrData.bg,this._setCursor(0,0);for(let B=0;B<this._bufferService.rows;++B){let P=this._activeBuffer.ybase+this._activeBuffer.y+B,N=this._activeBuffer.lines.get(P);N&&(N.fill(A),N.isWrapped=!1)}return this._dirtyRowTracker.markAllDirty(),this._setCursor(0,0),!0}requestStatusString(A,B){let P=this._bufferService.buffer,N=this._optionsService.rawOptions;return(X=>(this._coreService.triggerDataEvent(`${c.C0.ESC}${X}${c.C0.ESC}\\`),!0))(A==='"q'?`P1$r${this._curAttrData.isProtected()?1:0}"q`:A==='"p'?'P1$r61;1"p':A==="r"?`P1$r${P.scrollTop+1};${P.scrollBottom+1}r`:A==="m"?"P1$r0m":A===" q"?`P1$r${{block:2,underline:4,bar:6}[N.cursorStyle]-(N.cursorBlink?1:0)} q`:"P0$r")}markRangeDirty(A,B){this._dirtyRowTracker.markRangeDirty(A,B)}}s.InputHandler=G;let K=class{constructor(J){this._bufferService=J,this.clearRange()}clearRange(){this.start=this._bufferService.buffer.y,this.end=this._bufferService.buffer.y}markDirty(J){J<this.start?this.start=J:J>this.end&&(this.end=J)}markRangeDirty(J,A){J>A&&(V=J,J=A,A=V),J<this.start&&(this.start=J),A>this.end&&(this.end=A)}markAllDirty(){this.markRangeDirty(0,this._bufferService.rows-1)}};function re(J){return 0<=J&&J<256}K=a([l(0,x.IBufferService)],K)},844:(o,s)=>{function n(a){for(let l of a)l.dispose();a.length=0}Object.defineProperty(s,"__esModule",{value:!0}),s.getDisposeArrayDisposable=s.disposeArray=s.toDisposable=s.MutableDisposable=s.Disposable=void 0,s.Disposable=class{constructor(){this._disposables=[],this._isDisposed=!1}dispose(){this._isDisposed=!0;for(let a of this._disposables)a.dispose();this._disposables.length=0}register(a){return this._disposables.push(a),a}unregister(a){let l=this._disposables.indexOf(a);l!==-1&&this._disposables.splice(l,1)}},s.MutableDisposable=class{constructor(){this._isDisposed=!1}get value(){return this._isDisposed?void 0:this._value}set value(a){this._isDisposed||a===this._value||(this._value?.dispose(),this._value=a)}clear(){this.value=void 0}dispose(){this._isDisposed=!0,this._value?.dispose(),this._value=void 0}},s.toDisposable=function(a){return{dispose:a}},s.disposeArray=n,s.getDisposeArrayDisposable=function(a){return{dispose:()=>n(a)}}},1505:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.FourKeyMap=s.TwoKeyMap=void 0;class n{constructor(){this._data={}}set(l,c,f){this._data[l]||(this._data[l]={}),this._data[l][c]=f}get(l,c){return this._data[l]?this._data[l][c]:void 0}clear(){this._data={}}}s.TwoKeyMap=n,s.FourKeyMap=class{constructor(){this._data=new n}set(a,l,c,f,m){this._data.get(a,l)||this._data.set(a,l,new n),this._data.get(a,l).set(c,f,m)}get(a,l,c,f){return this._data.get(a,l)?.get(c,f)}clear(){this._data.clear()}}},6114:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.isChromeOS=s.isLinux=s.isWindows=s.isIphone=s.isIpad=s.isMac=s.getSafariVersion=s.isSafari=s.isLegacyEdge=s.isFirefox=s.isNode=void 0,s.isNode=typeof process<"u"&&"title"in process;let n=s.isNode?"node":navigator.userAgent,a=s.isNode?"node":navigator.platform;s.isFirefox=n.includes("Firefox"),s.isLegacyEdge=n.includes("Edge"),s.isSafari=/^((?!chrome|android).)*safari/i.test(n),s.getSafariVersion=function(){if(!s.isSafari)return 0;let l=n.match(/Version\/(\d+)/);return l===null||l.length<2?0:parseInt(l[1])},s.isMac=["Macintosh","MacIntel","MacPPC","Mac68K"].includes(a),s.isIpad=a==="iPad",s.isIphone=a==="iPhone",s.isWindows=["Windows","Win16","Win32","WinCE"].includes(a),s.isLinux=a.indexOf("Linux")>=0,s.isChromeOS=/\bCrOS\b/.test(n)},6106:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.SortedList=void 0;let n=0;s.SortedList=class{constructor(a){this._getKey=a,this._array=[]}clear(){this._array.length=0}insert(a){this._array.length!==0?(n=this._search(this._getKey(a)),this._array.splice(n,0,a)):this._array.push(a)}delete(a){if(this._array.length===0)return!1;let l=this._getKey(a);if(l===void 0||(n=this._search(l),n===-1)||this._getKey(this._array[n])!==l)return!1;do if(this._array[n]===a)return this._array.splice(n,1),!0;while(++n<this._array.length&&this._getKey(this._array[n])===l);return!1}*getKeyIterator(a){if(this._array.length!==0&&(n=this._search(a),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===a))do yield this._array[n];while(++n<this._array.length&&this._getKey(this._array[n])===a)}forEachByKey(a,l){if(this._array.length!==0&&(n=this._search(a),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===a))do l(this._array[n]);while(++n<this._array.length&&this._getKey(this._array[n])===a)}values(){return[...this._array].values()}_search(a){let l=0,c=this._array.length-1;for(;c>=l;){let f=l+c>>1,m=this._getKey(this._array[f]);if(m>a)c=f-1;else{if(!(m<a)){for(;f>0&&this._getKey(this._array[f-1])===a;)f--;return f}l=f+1}}return l}}},7226:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.DebouncedIdleTask=s.IdleTaskQueue=s.PriorityTaskQueue=void 0;let a=n(6114);class l{constructor(){this._tasks=[],this._i=0}enqueue(m){this._tasks.push(m),this._start()}flush(){for(;this._i<this._tasks.length;)this._tasks[this._i]()||this._i++;this.clear()}clear(){this._idleCallback&&(this._cancelCallback(this._idleCallback),this._idleCallback=void 0),this._i=0,this._tasks.length=0}_start(){this._idleCallback||(this._idleCallback=this._requestCallback(this._process.bind(this)))}_process(m){this._idleCallback=void 0;let _=0,g=0,h=m.timeRemaining(),d=0;for(;this._i<this._tasks.length;){if(_=Date.now(),this._tasks[this._i]()||this._i++,_=Math.max(1,Date.now()-_),g=Math.max(_,g),d=m.timeRemaining(),1.5*g>d)return h-_<-20&&console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(h-_))}ms`),void this._start();h=d}this.clear()}}class c extends l{_requestCallback(m){return setTimeout((()=>m(this._createDeadline(16))))}_cancelCallback(m){clearTimeout(m)}_createDeadline(m){let _=Date.now()+m;return{timeRemaining:()=>Math.max(0,_-Date.now())}}}s.PriorityTaskQueue=c,s.IdleTaskQueue=!a.isNode&&"requestIdleCallback"in window?class extends l{_requestCallback(f){return requestIdleCallback(f)}_cancelCallback(f){cancelIdleCallback(f)}}:c,s.DebouncedIdleTask=class{constructor(){this._queue=new s.IdleTaskQueue}set(f){this._queue.clear(),this._queue.enqueue(f)}flush(){this._queue.flush()}}},9282:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.updateWindowsModeWrappedState=void 0;let a=n(643);s.updateWindowsModeWrappedState=function(l){let c=l.buffer.lines.get(l.buffer.ybase+l.buffer.y-1),f=c?.get(l.cols-1),m=l.buffer.lines.get(l.buffer.ybase+l.buffer.y);m&&f&&(m.isWrapped=f[a.CHAR_DATA_CODE_INDEX]!==a.NULL_CELL_CODE&&f[a.CHAR_DATA_CODE_INDEX]!==a.WHITESPACE_CELL_CODE)}},3734:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.ExtendedAttrs=s.AttributeData=void 0;class n{constructor(){this.fg=0,this.bg=0,this.extended=new a}static toColorRGB(c){return[c>>>16&255,c>>>8&255,255&c]}static fromColorRGB(c){return(255&c[0])<<16|(255&c[1])<<8|255&c[2]}clone(){let c=new n;return c.fg=this.fg,c.bg=this.bg,c.extended=this.extended.clone(),c}isInverse(){return 67108864&this.fg}isBold(){return 134217728&this.fg}isUnderline(){return this.hasExtendedAttrs()&&this.extended.underlineStyle!==0?1:268435456&this.fg}isBlink(){return 536870912&this.fg}isInvisible(){return 1073741824&this.fg}isItalic(){return 67108864&this.bg}isDim(){return 134217728&this.bg}isStrikethrough(){return 2147483648&this.fg}isProtected(){return 536870912&this.bg}isOverline(){return 1073741824&this.bg}getFgColorMode(){return 50331648&this.fg}getBgColorMode(){return 50331648&this.bg}isFgRGB(){return(50331648&this.fg)==50331648}isBgRGB(){return(50331648&this.bg)==50331648}isFgPalette(){return(50331648&this.fg)==16777216||(50331648&this.fg)==33554432}isBgPalette(){return(50331648&this.bg)==16777216||(50331648&this.bg)==33554432}isFgDefault(){return(50331648&this.fg)==0}isBgDefault(){return(50331648&this.bg)==0}isAttributeDefault(){return this.fg===0&&this.bg===0}getFgColor(){switch(50331648&this.fg){case 16777216:case 33554432:return 255&this.fg;case 50331648:return 16777215&this.fg;default:return-1}}getBgColor(){switch(50331648&this.bg){case 16777216:case 33554432:return 255&this.bg;case 50331648:return 16777215&this.bg;default:return-1}}hasExtendedAttrs(){return 268435456&this.bg}updateExtended(){this.extended.isEmpty()?this.bg&=-268435457:this.bg|=268435456}getUnderlineColor(){if(268435456&this.bg&&~this.extended.underlineColor)switch(50331648&this.extended.underlineColor){case 16777216:case 33554432:return 255&this.extended.underlineColor;case 50331648:return 16777215&this.extended.underlineColor;default:return this.getFgColor()}return this.getFgColor()}getUnderlineColorMode(){return 268435456&this.bg&&~this.extended.underlineColor?50331648&this.extended.underlineColor:this.getFgColorMode()}isUnderlineColorRGB(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==50331648:this.isFgRGB()}isUnderlineColorPalette(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==16777216||(50331648&this.extended.underlineColor)==33554432:this.isFgPalette()}isUnderlineColorDefault(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==0:this.isFgDefault()}getUnderlineStyle(){return 268435456&this.fg?268435456&this.bg?this.extended.underlineStyle:1:0}getUnderlineVariantOffset(){return this.extended.underlineVariantOffset}}s.AttributeData=n;class a{get ext(){return this._urlId?-469762049&this._ext|this.underlineStyle<<26:this._ext}set ext(c){this._ext=c}get underlineStyle(){return this._urlId?5:(469762048&this._ext)>>26}set underlineStyle(c){this._ext&=-469762049,this._ext|=c<<26&469762048}get underlineColor(){return 67108863&this._ext}set underlineColor(c){this._ext&=-67108864,this._ext|=67108863&c}get urlId(){return this._urlId}set urlId(c){this._urlId=c}get underlineVariantOffset(){let c=(3758096384&this._ext)>>29;return c<0?4294967288^c:c}set underlineVariantOffset(c){this._ext&=536870911,this._ext|=c<<29&3758096384}constructor(c=0,f=0){this._ext=0,this._urlId=0,this._ext=c,this._urlId=f}clone(){return new a(this._ext,this._urlId)}isEmpty(){return this.underlineStyle===0&&this._urlId===0}}s.ExtendedAttrs=a},9092:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Buffer=s.MAX_BUFFER_SIZE=void 0;let a=n(6349),l=n(7226),c=n(3734),f=n(8437),m=n(4634),_=n(511),g=n(643),h=n(4863),d=n(7116);s.MAX_BUFFER_SIZE=4294967295,s.Buffer=class{constructor(u,p,v){this._hasScrollback=u,this._optionsService=p,this._bufferService=v,this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.tabs={},this.savedY=0,this.savedX=0,this.savedCurAttrData=f.DEFAULT_ATTR_DATA.clone(),this.savedCharset=d.DEFAULT_CHARSET,this.markers=[],this._nullCell=_.CellData.fromCharData([0,g.NULL_CELL_CHAR,g.NULL_CELL_WIDTH,g.NULL_CELL_CODE]),this._whitespaceCell=_.CellData.fromCharData([0,g.WHITESPACE_CELL_CHAR,g.WHITESPACE_CELL_WIDTH,g.WHITESPACE_CELL_CODE]),this._isClearing=!1,this._memoryCleanupQueue=new l.IdleTaskQueue,this._memoryCleanupPosition=0,this._cols=this._bufferService.cols,this._rows=this._bufferService.rows,this.lines=new a.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}getNullCell(u){return u?(this._nullCell.fg=u.fg,this._nullCell.bg=u.bg,this._nullCell.extended=u.extended):(this._nullCell.fg=0,this._nullCell.bg=0,this._nullCell.extended=new c.ExtendedAttrs),this._nullCell}getWhitespaceCell(u){return u?(this._whitespaceCell.fg=u.fg,this._whitespaceCell.bg=u.bg,this._whitespaceCell.extended=u.extended):(this._whitespaceCell.fg=0,this._whitespaceCell.bg=0,this._whitespaceCell.extended=new c.ExtendedAttrs),this._whitespaceCell}getBlankLine(u,p){return new f.BufferLine(this._bufferService.cols,this.getNullCell(u),p)}get hasScrollback(){return this._hasScrollback&&this.lines.maxLength>this._rows}get isCursorInViewport(){let u=this.ybase+this.y-this.ydisp;return u>=0&&u<this._rows}_getCorrectBufferLength(u){if(!this._hasScrollback)return u;let p=u+this._optionsService.rawOptions.scrollback;return p>s.MAX_BUFFER_SIZE?s.MAX_BUFFER_SIZE:p}fillViewportRows(u){if(this.lines.length===0){u===void 0&&(u=f.DEFAULT_ATTR_DATA);let p=this._rows;for(;p--;)this.lines.push(this.getBlankLine(u))}}clear(){this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.lines=new a.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}resize(u,p){let v=this.getNullCell(f.DEFAULT_ATTR_DATA),x=0,S=this._getCorrectBufferLength(p);if(S>this.lines.maxLength&&(this.lines.maxLength=S),this.lines.length>0){if(this._cols<u)for(let y=0;y<this.lines.length;y++)x+=+this.lines.get(y).resize(u,v);let C=0;if(this._rows<p)for(let y=this._rows;y<p;y++)this.lines.length<p+this.ybase&&(this._optionsService.rawOptions.windowsMode||this._optionsService.rawOptions.windowsPty.backend!==void 0||this._optionsService.rawOptions.windowsPty.buildNumber!==void 0?this.lines.push(new f.BufferLine(u,v)):this.ybase>0&&this.lines.length<=this.ybase+this.y+C+1?(this.ybase--,C++,this.ydisp>0&&this.ydisp--):this.lines.push(new f.BufferLine(u,v)));else for(let y=this._rows;y>p;y--)this.lines.length>p+this.ybase&&(this.lines.length>this.ybase+this.y+1?this.lines.pop():(this.ybase++,this.ydisp++));if(S<this.lines.maxLength){let y=this.lines.length-S;y>0&&(this.lines.trimStart(y),this.ybase=Math.max(this.ybase-y,0),this.ydisp=Math.max(this.ydisp-y,0),this.savedY=Math.max(this.savedY-y,0)),this.lines.maxLength=S}this.x=Math.min(this.x,u-1),this.y=Math.min(this.y,p-1),C&&(this.y+=C),this.savedX=Math.min(this.savedX,u-1),this.scrollTop=0}if(this.scrollBottom=p-1,this._isReflowEnabled&&(this._reflow(u,p),this._cols>u))for(let C=0;C<this.lines.length;C++)x+=+this.lines.get(C).resize(u,v);this._cols=u,this._rows=p,this._memoryCleanupQueue.clear(),x>.1*this.lines.length&&(this._memoryCleanupPosition=0,this._memoryCleanupQueue.enqueue((()=>this._batchedMemoryCleanup())))}_batchedMemoryCleanup(){let u=!0;this._memoryCleanupPosition>=this.lines.length&&(this._memoryCleanupPosition=0,u=!1);let p=0;for(;this._memoryCleanupPosition<this.lines.length;)if(p+=this.lines.get(this._memoryCleanupPosition++).cleanupMemory(),p>100)return!0;return u}get _isReflowEnabled(){let u=this._optionsService.rawOptions.windowsPty;return u&&u.buildNumber?this._hasScrollback&&u.backend==="conpty"&&u.buildNumber>=21376:this._hasScrollback&&!this._optionsService.rawOptions.windowsMode}_reflow(u,p){this._cols!==u&&(u>this._cols?this._reflowLarger(u,p):this._reflowSmaller(u,p))}_reflowLarger(u,p){let v=(0,m.reflowLargerGetLinesToRemove)(this.lines,this._cols,u,this.ybase+this.y,this.getNullCell(f.DEFAULT_ATTR_DATA));if(v.length>0){let x=(0,m.reflowLargerCreateNewLayout)(this.lines,v);(0,m.reflowLargerApplyNewLayout)(this.lines,x.layout),this._reflowLargerAdjustViewport(u,p,x.countRemoved)}}_reflowLargerAdjustViewport(u,p,v){let x=this.getNullCell(f.DEFAULT_ATTR_DATA),S=v;for(;S-- >0;)this.ybase===0?(this.y>0&&this.y--,this.lines.length<p&&this.lines.push(new f.BufferLine(u,x))):(this.ydisp===this.ybase&&this.ydisp--,this.ybase--);this.savedY=Math.max(this.savedY-v,0)}_reflowSmaller(u,p){let v=this.getNullCell(f.DEFAULT_ATTR_DATA),x=[],S=0;for(let C=this.lines.length-1;C>=0;C--){let y=this.lines.get(C);if(!y||!y.isWrapped&&y.getTrimmedLength()<=u)continue;let k=[y];for(;y.isWrapped&&C>0;)y=this.lines.get(--C),k.unshift(y);let D=this.ybase+this.y;if(D>=C&&D<C+k.length)continue;let $=k[k.length-1].getTrimmedLength(),F=(0,m.reflowSmallerGetNewLineLengths)(k,this._cols,u),L=F.length-k.length,V;V=this.ybase===0&&this.y!==this.lines.length-1?Math.max(0,this.y-this.lines.maxLength+L):Math.max(0,this.lines.length-this.lines.maxLength+L);let G=[];for(let P=0;P<L;P++){let N=this.getBlankLine(f.DEFAULT_ATTR_DATA,!0);G.push(N)}G.length>0&&(x.push({start:C+k.length+S,newLines:G}),S+=G.length),k.push(...G);let K=F.length-1,re=F[K];re===0&&(K--,re=F[K]);let J=k.length-L-1,A=$;for(;J>=0;){let P=Math.min(A,re);if(k[K]===void 0)break;if(k[K].copyCellsFrom(k[J],A-P,re-P,P,!0),re-=P,re===0&&(K--,re=F[K]),A-=P,A===0){J--;let N=Math.max(J,0);A=(0,m.getWrappedLineTrimmedLength)(k,N,this._cols)}}for(let P=0;P<k.length;P++)F[P]<u&&k[P].setCell(F[P],v);let B=L-V;for(;B-- >0;)this.ybase===0?this.y<p-1?(this.y++,this.lines.pop()):(this.ybase++,this.ydisp++):this.ybase<Math.min(this.lines.maxLength,this.lines.length+S)-p&&(this.ybase===this.ydisp&&this.ydisp++,this.ybase++);this.savedY=Math.min(this.savedY+L,this.ybase+p-1)}if(x.length>0){let C=[],y=[];for(let K=0;K<this.lines.length;K++)y.push(this.lines.get(K));let k=this.lines.length,D=k-1,$=0,F=x[$];this.lines.length=Math.min(this.lines.maxLength,this.lines.length+S);let L=0;for(let K=Math.min(this.lines.maxLength-1,k+S-1);K>=0;K--)if(F&&F.start>D+L){for(let re=F.newLines.length-1;re>=0;re--)this.lines.set(K--,F.newLines[re]);K++,C.push({index:D+1,amount:F.newLines.length}),L+=F.newLines.length,F=x[++$]}else this.lines.set(K,y[D--]);let V=0;for(let K=C.length-1;K>=0;K--)C[K].index+=V,this.lines.onInsertEmitter.fire(C[K]),V+=C[K].amount;let G=Math.max(0,k+S-this.lines.maxLength);G>0&&this.lines.onTrimEmitter.fire(G)}}translateBufferLineToString(u,p,v=0,x){let S=this.lines.get(u);return S?S.translateToString(p,v,x):""}getWrappedRangeForLine(u){let p=u,v=u;for(;p>0&&this.lines.get(p).isWrapped;)p--;for(;v+1<this.lines.length&&this.lines.get(v+1).isWrapped;)v++;return{first:p,last:v}}setupTabStops(u){for(u!=null?this.tabs[u]||(u=this.prevStop(u)):(this.tabs={},u=0);u<this._cols;u+=this._optionsService.rawOptions.tabStopWidth)this.tabs[u]=!0}prevStop(u){for(u==null&&(u=this.x);!this.tabs[--u]&&u>0;);return u>=this._cols?this._cols-1:u<0?0:u}nextStop(u){for(u==null&&(u=this.x);!this.tabs[++u]&&u<this._cols;);return u>=this._cols?this._cols-1:u<0?0:u}clearMarkers(u){this._isClearing=!0;for(let p=0;p<this.markers.length;p++)this.markers[p].line===u&&(this.markers[p].dispose(),this.markers.splice(p--,1));this._isClearing=!1}clearAllMarkers(){this._isClearing=!0;for(let u=0;u<this.markers.length;u++)this.markers[u].dispose(),this.markers.splice(u--,1);this._isClearing=!1}addMarker(u){let p=new h.Marker(u);return this.markers.push(p),p.register(this.lines.onTrim((v=>{p.line-=v,p.line<0&&p.dispose()}))),p.register(this.lines.onInsert((v=>{p.line>=v.index&&(p.line+=v.amount)}))),p.register(this.lines.onDelete((v=>{p.line>=v.index&&p.line<v.index+v.amount&&p.dispose(),p.line>v.index&&(p.line-=v.amount)}))),p.register(p.onDispose((()=>this._removeMarker(p)))),p}_removeMarker(u){this._isClearing||this.markers.splice(this.markers.indexOf(u),1)}}},8437:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.BufferLine=s.DEFAULT_ATTR_DATA=void 0;let a=n(3734),l=n(511),c=n(643),f=n(482);s.DEFAULT_ATTR_DATA=Object.freeze(new a.AttributeData);let m=0;class _{constructor(h,d,u=!1){this.isWrapped=u,this._combined={},this._extendedAttrs={},this._data=new Uint32Array(3*h);let p=d||l.CellData.fromCharData([0,c.NULL_CELL_CHAR,c.NULL_CELL_WIDTH,c.NULL_CELL_CODE]);for(let v=0;v<h;++v)this.setCell(v,p);this.length=h}get(h){let d=this._data[3*h+0],u=2097151&d;return[this._data[3*h+1],2097152&d?this._combined[h]:u?(0,f.stringFromCodePoint)(u):"",d>>22,2097152&d?this._combined[h].charCodeAt(this._combined[h].length-1):u]}set(h,d){this._data[3*h+1]=d[c.CHAR_DATA_ATTR_INDEX],d[c.CHAR_DATA_CHAR_INDEX].length>1?(this._combined[h]=d[1],this._data[3*h+0]=2097152|h|d[c.CHAR_DATA_WIDTH_INDEX]<<22):this._data[3*h+0]=d[c.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|d[c.CHAR_DATA_WIDTH_INDEX]<<22}getWidth(h){return this._data[3*h+0]>>22}hasWidth(h){return 12582912&this._data[3*h+0]}getFg(h){return this._data[3*h+1]}getBg(h){return this._data[3*h+2]}hasContent(h){return 4194303&this._data[3*h+0]}getCodePoint(h){let d=this._data[3*h+0];return 2097152&d?this._combined[h].charCodeAt(this._combined[h].length-1):2097151&d}isCombined(h){return 2097152&this._data[3*h+0]}getString(h){let d=this._data[3*h+0];return 2097152&d?this._combined[h]:2097151&d?(0,f.stringFromCodePoint)(2097151&d):""}isProtected(h){return 536870912&this._data[3*h+2]}loadCell(h,d){return m=3*h,d.content=this._data[m+0],d.fg=this._data[m+1],d.bg=this._data[m+2],2097152&d.content&&(d.combinedData=this._combined[h]),268435456&d.bg&&(d.extended=this._extendedAttrs[h]),d}setCell(h,d){2097152&d.content&&(this._combined[h]=d.combinedData),268435456&d.bg&&(this._extendedAttrs[h]=d.extended),this._data[3*h+0]=d.content,this._data[3*h+1]=d.fg,this._data[3*h+2]=d.bg}setCellFromCodepoint(h,d,u,p){268435456&p.bg&&(this._extendedAttrs[h]=p.extended),this._data[3*h+0]=d|u<<22,this._data[3*h+1]=p.fg,this._data[3*h+2]=p.bg}addCodepointToCell(h,d,u){let p=this._data[3*h+0];2097152&p?this._combined[h]+=(0,f.stringFromCodePoint)(d):2097151&p?(this._combined[h]=(0,f.stringFromCodePoint)(2097151&p)+(0,f.stringFromCodePoint)(d),p&=-2097152,p|=2097152):p=d|4194304,u&&(p&=-12582913,p|=u<<22),this._data[3*h+0]=p}insertCells(h,d,u){if((h%=this.length)&&this.getWidth(h-1)===2&&this.setCellFromCodepoint(h-1,0,1,u),d<this.length-h){let p=new l.CellData;for(let v=this.length-h-d-1;v>=0;--v)this.setCell(h+d+v,this.loadCell(h+v,p));for(let v=0;v<d;++v)this.setCell(h+v,u)}else for(let p=h;p<this.length;++p)this.setCell(p,u);this.getWidth(this.length-1)===2&&this.setCellFromCodepoint(this.length-1,0,1,u)}deleteCells(h,d,u){if(h%=this.length,d<this.length-h){let p=new l.CellData;for(let v=0;v<this.length-h-d;++v)this.setCell(h+v,this.loadCell(h+d+v,p));for(let v=this.length-d;v<this.length;++v)this.setCell(v,u)}else for(let p=h;p<this.length;++p)this.setCell(p,u);h&&this.getWidth(h-1)===2&&this.setCellFromCodepoint(h-1,0,1,u),this.getWidth(h)!==0||this.hasContent(h)||this.setCellFromCodepoint(h,0,1,u)}replaceCells(h,d,u,p=!1){if(p)for(h&&this.getWidth(h-1)===2&&!this.isProtected(h-1)&&this.setCellFromCodepoint(h-1,0,1,u),d<this.length&&this.getWidth(d-1)===2&&!this.isProtected(d)&&this.setCellFromCodepoint(d,0,1,u);h<d&&h<this.length;)this.isProtected(h)||this.setCell(h,u),h++;else for(h&&this.getWidth(h-1)===2&&this.setCellFromCodepoint(h-1,0,1,u),d<this.length&&this.getWidth(d-1)===2&&this.setCellFromCodepoint(d,0,1,u);h<d&&h<this.length;)this.setCell(h++,u)}resize(h,d){if(h===this.length)return 4*this._data.length*2<this._data.buffer.byteLength;let u=3*h;if(h>this.length){if(this._data.buffer.byteLength>=4*u)this._data=new Uint32Array(this._data.buffer,0,u);else{let p=new Uint32Array(u);p.set(this._data),this._data=p}for(let p=this.length;p<h;++p)this.setCell(p,d)}else{this._data=this._data.subarray(0,u);let p=Object.keys(this._combined);for(let x=0;x<p.length;x++){let S=parseInt(p[x],10);S>=h&&delete this._combined[S]}let v=Object.keys(this._extendedAttrs);for(let x=0;x<v.length;x++){let S=parseInt(v[x],10);S>=h&&delete this._extendedAttrs[S]}}return this.length=h,4*u*2<this._data.buffer.byteLength}cleanupMemory(){if(4*this._data.length*2<this._data.buffer.byteLength){let h=new Uint32Array(this._data.length);return h.set(this._data),this._data=h,1}return 0}fill(h,d=!1){if(d)for(let u=0;u<this.length;++u)this.isProtected(u)||this.setCell(u,h);else{this._combined={},this._extendedAttrs={};for(let u=0;u<this.length;++u)this.setCell(u,h)}}copyFrom(h){this.length!==h.length?this._data=new Uint32Array(h._data):this._data.set(h._data),this.length=h.length,this._combined={};for(let d in h._combined)this._combined[d]=h._combined[d];this._extendedAttrs={};for(let d in h._extendedAttrs)this._extendedAttrs[d]=h._extendedAttrs[d];this.isWrapped=h.isWrapped}clone(){let h=new _(0);h._data=new Uint32Array(this._data),h.length=this.length;for(let d in this._combined)h._combined[d]=this._combined[d];for(let d in this._extendedAttrs)h._extendedAttrs[d]=this._extendedAttrs[d];return h.isWrapped=this.isWrapped,h}getTrimmedLength(){for(let h=this.length-1;h>=0;--h)if(4194303&this._data[3*h+0])return h+(this._data[3*h+0]>>22);return 0}getNoBgTrimmedLength(){for(let h=this.length-1;h>=0;--h)if(4194303&this._data[3*h+0]||50331648&this._data[3*h+2])return h+(this._data[3*h+0]>>22);return 0}copyCellsFrom(h,d,u,p,v){let x=h._data;if(v)for(let C=p-1;C>=0;C--){for(let y=0;y<3;y++)this._data[3*(u+C)+y]=x[3*(d+C)+y];268435456&x[3*(d+C)+2]&&(this._extendedAttrs[u+C]=h._extendedAttrs[d+C])}else for(let C=0;C<p;C++){for(let y=0;y<3;y++)this._data[3*(u+C)+y]=x[3*(d+C)+y];268435456&x[3*(d+C)+2]&&(this._extendedAttrs[u+C]=h._extendedAttrs[d+C])}let S=Object.keys(h._combined);for(let C=0;C<S.length;C++){let y=parseInt(S[C],10);y>=d&&(this._combined[y-d+u]=h._combined[y])}}translateToString(h,d,u,p){d=d??0,u=u??this.length,h&&(u=Math.min(u,this.getTrimmedLength())),p&&(p.length=0);let v="";for(;d<u;){let x=this._data[3*d+0],S=2097151&x,C=2097152&x?this._combined[d]:S?(0,f.stringFromCodePoint)(S):c.WHITESPACE_CELL_CHAR;if(v+=C,p)for(let y=0;y<C.length;++y)p.push(d);d+=x>>22||1}return p&&p.push(d),v}}s.BufferLine=_},4841:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.getRangeLength=void 0,s.getRangeLength=function(n,a){if(n.start.y>n.end.y)throw new Error(`Buffer range end (${n.end.x}, ${n.end.y}) cannot be before start (${n.start.x}, ${n.start.y})`);return a*(n.end.y-n.start.y)+(n.end.x-n.start.x+1)}},4634:(o,s)=>{function n(a,l,c){if(l===a.length-1)return a[l].getTrimmedLength();let f=!a[l].hasContent(c-1)&&a[l].getWidth(c-1)===1,m=a[l+1].getWidth(0)===2;return f&&m?c-1:c}Object.defineProperty(s,"__esModule",{value:!0}),s.getWrappedLineTrimmedLength=s.reflowSmallerGetNewLineLengths=s.reflowLargerApplyNewLayout=s.reflowLargerCreateNewLayout=s.reflowLargerGetLinesToRemove=void 0,s.reflowLargerGetLinesToRemove=function(a,l,c,f,m){let _=[];for(let g=0;g<a.length-1;g++){let h=g,d=a.get(++h);if(!d.isWrapped)continue;let u=[a.get(g)];for(;h<a.length&&d.isWrapped;)u.push(d),d=a.get(++h);if(f>=g&&f<h){g+=u.length-1;continue}let p=0,v=n(u,p,l),x=1,S=0;for(;x<u.length;){let y=n(u,x,l),k=y-S,D=c-v,$=Math.min(k,D);u[p].copyCellsFrom(u[x],S,v,$,!1),v+=$,v===c&&(p++,v=0),S+=$,S===y&&(x++,S=0),v===0&&p!==0&&u[p-1].getWidth(c-1)===2&&(u[p].copyCellsFrom(u[p-1],c-1,v++,1,!1),u[p-1].setCell(c-1,m))}u[p].replaceCells(v,c,m);let C=0;for(let y=u.length-1;y>0&&(y>p||u[y].getTrimmedLength()===0);y--)C++;C>0&&(_.push(g+u.length-C),_.push(C)),g+=u.length-1}return _},s.reflowLargerCreateNewLayout=function(a,l){let c=[],f=0,m=l[f],_=0;for(let g=0;g<a.length;g++)if(m===g){let h=l[++f];a.onDeleteEmitter.fire({index:g-_,amount:h}),g+=h-1,_+=h,m=l[++f]}else c.push(g);return{layout:c,countRemoved:_}},s.reflowLargerApplyNewLayout=function(a,l){let c=[];for(let f=0;f<l.length;f++)c.push(a.get(l[f]));for(let f=0;f<c.length;f++)a.set(f,c[f]);a.length=l.length},s.reflowSmallerGetNewLineLengths=function(a,l,c){let f=[],m=a.map(((d,u)=>n(a,u,l))).reduce(((d,u)=>d+u)),_=0,g=0,h=0;for(;h<m;){if(m-h<c){f.push(m-h);break}_+=c;let d=n(a,g,l);_>d&&(_-=d,g++);let u=a[g].getWidth(_-1)===2;u&&_--;let p=u?c-1:c;f.push(p),h+=p}return f},s.getWrappedLineTrimmedLength=n},5295:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.BufferSet=void 0;let a=n(8460),l=n(844),c=n(9092);class f extends l.Disposable{constructor(_,g){super(),this._optionsService=_,this._bufferService=g,this._onBufferActivate=this.register(new a.EventEmitter),this.onBufferActivate=this._onBufferActivate.event,this.reset(),this.register(this._optionsService.onSpecificOptionChange("scrollback",(()=>this.resize(this._bufferService.cols,this._bufferService.rows)))),this.register(this._optionsService.onSpecificOptionChange("tabStopWidth",(()=>this.setupTabStops())))}reset(){this._normal=new c.Buffer(!0,this._optionsService,this._bufferService),this._normal.fillViewportRows(),this._alt=new c.Buffer(!1,this._optionsService,this._bufferService),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}),this.setupTabStops()}get alt(){return this._alt}get active(){return this._activeBuffer}get normal(){return this._normal}activateNormalBuffer(){this._activeBuffer!==this._normal&&(this._normal.x=this._alt.x,this._normal.y=this._alt.y,this._alt.clearAllMarkers(),this._alt.clear(),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}))}activateAltBuffer(_){this._activeBuffer!==this._alt&&(this._alt.fillViewportRows(_),this._alt.x=this._normal.x,this._alt.y=this._normal.y,this._activeBuffer=this._alt,this._onBufferActivate.fire({activeBuffer:this._alt,inactiveBuffer:this._normal}))}resize(_,g){this._normal.resize(_,g),this._alt.resize(_,g),this.setupTabStops(_)}setupTabStops(_){this._normal.setupTabStops(_),this._alt.setupTabStops(_)}}s.BufferSet=f},511:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.CellData=void 0;let a=n(482),l=n(643),c=n(3734);class f extends c.AttributeData{constructor(){super(...arguments),this.content=0,this.fg=0,this.bg=0,this.extended=new c.ExtendedAttrs,this.combinedData=""}static fromCharData(_){let g=new f;return g.setFromCharData(_),g}isCombined(){return 2097152&this.content}getWidth(){return this.content>>22}getChars(){return 2097152&this.content?this.combinedData:2097151&this.content?(0,a.stringFromCodePoint)(2097151&this.content):""}getCode(){return this.isCombined()?this.combinedData.charCodeAt(this.combinedData.length-1):2097151&this.content}setFromCharData(_){this.fg=_[l.CHAR_DATA_ATTR_INDEX],this.bg=0;let g=!1;if(_[l.CHAR_DATA_CHAR_INDEX].length>2)g=!0;else if(_[l.CHAR_DATA_CHAR_INDEX].length===2){let h=_[l.CHAR_DATA_CHAR_INDEX].charCodeAt(0);if(55296<=h&&h<=56319){let d=_[l.CHAR_DATA_CHAR_INDEX].charCodeAt(1);56320<=d&&d<=57343?this.content=1024*(h-55296)+d-56320+65536|_[l.CHAR_DATA_WIDTH_INDEX]<<22:g=!0}else g=!0}else this.content=_[l.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|_[l.CHAR_DATA_WIDTH_INDEX]<<22;g&&(this.combinedData=_[l.CHAR_DATA_CHAR_INDEX],this.content=2097152|_[l.CHAR_DATA_WIDTH_INDEX]<<22)}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}s.CellData=f},643:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.WHITESPACE_CELL_CODE=s.WHITESPACE_CELL_WIDTH=s.WHITESPACE_CELL_CHAR=s.NULL_CELL_CODE=s.NULL_CELL_WIDTH=s.NULL_CELL_CHAR=s.CHAR_DATA_CODE_INDEX=s.CHAR_DATA_WIDTH_INDEX=s.CHAR_DATA_CHAR_INDEX=s.CHAR_DATA_ATTR_INDEX=s.DEFAULT_EXT=s.DEFAULT_ATTR=s.DEFAULT_COLOR=void 0,s.DEFAULT_COLOR=0,s.DEFAULT_ATTR=256|s.DEFAULT_COLOR<<9,s.DEFAULT_EXT=0,s.CHAR_DATA_ATTR_INDEX=0,s.CHAR_DATA_CHAR_INDEX=1,s.CHAR_DATA_WIDTH_INDEX=2,s.CHAR_DATA_CODE_INDEX=3,s.NULL_CELL_CHAR="",s.NULL_CELL_WIDTH=1,s.NULL_CELL_CODE=0,s.WHITESPACE_CELL_CHAR=" ",s.WHITESPACE_CELL_WIDTH=1,s.WHITESPACE_CELL_CODE=32},4863:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Marker=void 0;let a=n(8460),l=n(844);class c{get id(){return this._id}constructor(m){this.line=m,this.isDisposed=!1,this._disposables=[],this._id=c._nextId++,this._onDispose=this.register(new a.EventEmitter),this.onDispose=this._onDispose.event}dispose(){this.isDisposed||(this.isDisposed=!0,this.line=-1,this._onDispose.fire(),(0,l.disposeArray)(this._disposables),this._disposables.length=0)}register(m){return this._disposables.push(m),m}}s.Marker=c,c._nextId=1},7116:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.DEFAULT_CHARSET=s.CHARSETS=void 0,s.CHARSETS={},s.DEFAULT_CHARSET=s.CHARSETS.B,s.CHARSETS[0]={"`":"\u25C6",a:"\u2592",b:"\u2409",c:"\u240C",d:"\u240D",e:"\u240A",f:"\xB0",g:"\xB1",h:"\u2424",i:"\u240B",j:"\u2518",k:"\u2510",l:"\u250C",m:"\u2514",n:"\u253C",o:"\u23BA",p:"\u23BB",q:"\u2500",r:"\u23BC",s:"\u23BD",t:"\u251C",u:"\u2524",v:"\u2534",w:"\u252C",x:"\u2502",y:"\u2264",z:"\u2265","{":"\u03C0","|":"\u2260","}":"\xA3","~":"\xB7"},s.CHARSETS.A={"#":"\xA3"},s.CHARSETS.B=void 0,s.CHARSETS[4]={"#":"\xA3","@":"\xBE","[":"ij","\\":"\xBD","]":"|","{":"\xA8","|":"f","}":"\xBC","~":"\xB4"},s.CHARSETS.C=s.CHARSETS[5]={"[":"\xC4","\\":"\xD6","]":"\xC5","^":"\xDC","`":"\xE9","{":"\xE4","|":"\xF6","}":"\xE5","~":"\xFC"},s.CHARSETS.R={"#":"\xA3","@":"\xE0","[":"\xB0","\\":"\xE7","]":"\xA7","{":"\xE9","|":"\xF9","}":"\xE8","~":"\xA8"},s.CHARSETS.Q={"@":"\xE0","[":"\xE2","\\":"\xE7","]":"\xEA","^":"\xEE","`":"\xF4","{":"\xE9","|":"\xF9","}":"\xE8","~":"\xFB"},s.CHARSETS.K={"@":"\xA7","[":"\xC4","\\":"\xD6","]":"\xDC","{":"\xE4","|":"\xF6","}":"\xFC","~":"\xDF"},s.CHARSETS.Y={"#":"\xA3","@":"\xA7","[":"\xB0","\\":"\xE7","]":"\xE9","`":"\xF9","{":"\xE0","|":"\xF2","}":"\xE8","~":"\xEC"},s.CHARSETS.E=s.CHARSETS[6]={"@":"\xC4","[":"\xC6","\\":"\xD8","]":"\xC5","^":"\xDC","`":"\xE4","{":"\xE6","|":"\xF8","}":"\xE5","~":"\xFC"},s.CHARSETS.Z={"#":"\xA3","@":"\xA7","[":"\xA1","\\":"\xD1","]":"\xBF","{":"\xB0","|":"\xF1","}":"\xE7"},s.CHARSETS.H=s.CHARSETS[7]={"@":"\xC9","[":"\xC4","\\":"\xD6","]":"\xC5","^":"\xDC","`":"\xE9","{":"\xE4","|":"\xF6","}":"\xE5","~":"\xFC"},s.CHARSETS["="]={"#":"\xF9","@":"\xE0","[":"\xE9","\\":"\xE7","]":"\xEA","^":"\xEE",_:"\xE8","`":"\xF4","{":"\xE4","|":"\xF6","}":"\xFC","~":"\xFB"}},2584:(o,s)=>{var n,a,l;Object.defineProperty(s,"__esModule",{value:!0}),s.C1_ESCAPED=s.C1=s.C0=void 0,(function(c){c.NUL="\0",c.SOH="",c.STX="",c.ETX="",c.EOT="",c.ENQ="",c.ACK="",c.BEL="\x07",c.BS="\b",c.HT="	",c.LF=`
`,c.VT="\v",c.FF="\f",c.CR="\r",c.SO="",c.SI="",c.DLE="",c.DC1="",c.DC2="",c.DC3="",c.DC4="",c.NAK="",c.SYN="",c.ETB="",c.CAN="",c.EM="",c.SUB="",c.ESC="\x1B",c.FS="",c.GS="",c.RS="",c.US="",c.SP=" ",c.DEL="\x7F"})(n||(s.C0=n={})),(function(c){c.PAD="\x80",c.HOP="\x81",c.BPH="\x82",c.NBH="\x83",c.IND="\x84",c.NEL="\x85",c.SSA="\x86",c.ESA="\x87",c.HTS="\x88",c.HTJ="\x89",c.VTS="\x8A",c.PLD="\x8B",c.PLU="\x8C",c.RI="\x8D",c.SS2="\x8E",c.SS3="\x8F",c.DCS="\x90",c.PU1="\x91",c.PU2="\x92",c.STS="\x93",c.CCH="\x94",c.MW="\x95",c.SPA="\x96",c.EPA="\x97",c.SOS="\x98",c.SGCI="\x99",c.SCI="\x9A",c.CSI="\x9B",c.ST="\x9C",c.OSC="\x9D",c.PM="\x9E",c.APC="\x9F"})(a||(s.C1=a={})),(function(c){c.ST=`${n.ESC}\\`})(l||(s.C1_ESCAPED=l={}))},7399:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.evaluateKeyboardEvent=void 0;let a=n(2584),l={48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],186:[";",":"],187:["=","+"],188:[",","<"],189:["-","_"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"']};s.evaluateKeyboardEvent=function(c,f,m,_){let g={type:0,cancel:!1,key:void 0},h=(c.shiftKey?1:0)|(c.altKey?2:0)|(c.ctrlKey?4:0)|(c.metaKey?8:0);switch(c.keyCode){case 0:c.key==="UIKeyInputUpArrow"?g.key=f?a.C0.ESC+"OA":a.C0.ESC+"[A":c.key==="UIKeyInputLeftArrow"?g.key=f?a.C0.ESC+"OD":a.C0.ESC+"[D":c.key==="UIKeyInputRightArrow"?g.key=f?a.C0.ESC+"OC":a.C0.ESC+"[C":c.key==="UIKeyInputDownArrow"&&(g.key=f?a.C0.ESC+"OB":a.C0.ESC+"[B");break;case 8:g.key=c.ctrlKey?"\b":a.C0.DEL,c.altKey&&(g.key=a.C0.ESC+g.key);break;case 9:if(c.shiftKey){g.key=a.C0.ESC+"[Z";break}g.key=a.C0.HT,g.cancel=!0;break;case 13:g.key=c.altKey?a.C0.ESC+a.C0.CR:a.C0.CR,g.cancel=!0;break;case 27:g.key=a.C0.ESC,c.altKey&&(g.key=a.C0.ESC+a.C0.ESC),g.cancel=!0;break;case 37:if(c.metaKey)break;h?(g.key=a.C0.ESC+"[1;"+(h+1)+"D",g.key===a.C0.ESC+"[1;3D"&&(g.key=a.C0.ESC+(m?"b":"[1;5D"))):g.key=f?a.C0.ESC+"OD":a.C0.ESC+"[D";break;case 39:if(c.metaKey)break;h?(g.key=a.C0.ESC+"[1;"+(h+1)+"C",g.key===a.C0.ESC+"[1;3C"&&(g.key=a.C0.ESC+(m?"f":"[1;5C"))):g.key=f?a.C0.ESC+"OC":a.C0.ESC+"[C";break;case 38:if(c.metaKey)break;h?(g.key=a.C0.ESC+"[1;"+(h+1)+"A",m||g.key!==a.C0.ESC+"[1;3A"||(g.key=a.C0.ESC+"[1;5A")):g.key=f?a.C0.ESC+"OA":a.C0.ESC+"[A";break;case 40:if(c.metaKey)break;h?(g.key=a.C0.ESC+"[1;"+(h+1)+"B",m||g.key!==a.C0.ESC+"[1;3B"||(g.key=a.C0.ESC+"[1;5B")):g.key=f?a.C0.ESC+"OB":a.C0.ESC+"[B";break;case 45:c.shiftKey||c.ctrlKey||(g.key=a.C0.ESC+"[2~");break;case 46:g.key=h?a.C0.ESC+"[3;"+(h+1)+"~":a.C0.ESC+"[3~";break;case 36:g.key=h?a.C0.ESC+"[1;"+(h+1)+"H":f?a.C0.ESC+"OH":a.C0.ESC+"[H";break;case 35:g.key=h?a.C0.ESC+"[1;"+(h+1)+"F":f?a.C0.ESC+"OF":a.C0.ESC+"[F";break;case 33:c.shiftKey?g.type=2:c.ctrlKey?g.key=a.C0.ESC+"[5;"+(h+1)+"~":g.key=a.C0.ESC+"[5~";break;case 34:c.shiftKey?g.type=3:c.ctrlKey?g.key=a.C0.ESC+"[6;"+(h+1)+"~":g.key=a.C0.ESC+"[6~";break;case 112:g.key=h?a.C0.ESC+"[1;"+(h+1)+"P":a.C0.ESC+"OP";break;case 113:g.key=h?a.C0.ESC+"[1;"+(h+1)+"Q":a.C0.ESC+"OQ";break;case 114:g.key=h?a.C0.ESC+"[1;"+(h+1)+"R":a.C0.ESC+"OR";break;case 115:g.key=h?a.C0.ESC+"[1;"+(h+1)+"S":a.C0.ESC+"OS";break;case 116:g.key=h?a.C0.ESC+"[15;"+(h+1)+"~":a.C0.ESC+"[15~";break;case 117:g.key=h?a.C0.ESC+"[17;"+(h+1)+"~":a.C0.ESC+"[17~";break;case 118:g.key=h?a.C0.ESC+"[18;"+(h+1)+"~":a.C0.ESC+"[18~";break;case 119:g.key=h?a.C0.ESC+"[19;"+(h+1)+"~":a.C0.ESC+"[19~";break;case 120:g.key=h?a.C0.ESC+"[20;"+(h+1)+"~":a.C0.ESC+"[20~";break;case 121:g.key=h?a.C0.ESC+"[21;"+(h+1)+"~":a.C0.ESC+"[21~";break;case 122:g.key=h?a.C0.ESC+"[23;"+(h+1)+"~":a.C0.ESC+"[23~";break;case 123:g.key=h?a.C0.ESC+"[24;"+(h+1)+"~":a.C0.ESC+"[24~";break;default:if(!c.ctrlKey||c.shiftKey||c.altKey||c.metaKey)if(m&&!_||!c.altKey||c.metaKey)!m||c.altKey||c.ctrlKey||c.shiftKey||!c.metaKey?c.key&&!c.ctrlKey&&!c.altKey&&!c.metaKey&&c.keyCode>=48&&c.key.length===1?g.key=c.key:c.key&&c.ctrlKey&&(c.key==="_"&&(g.key=a.C0.US),c.key==="@"&&(g.key=a.C0.NUL)):c.keyCode===65&&(g.type=1);else{let d=l[c.keyCode],u=d?.[c.shiftKey?1:0];if(u)g.key=a.C0.ESC+u;else if(c.keyCode>=65&&c.keyCode<=90){let p=c.ctrlKey?c.keyCode-64:c.keyCode+32,v=String.fromCharCode(p);c.shiftKey&&(v=v.toUpperCase()),g.key=a.C0.ESC+v}else if(c.keyCode===32)g.key=a.C0.ESC+(c.ctrlKey?a.C0.NUL:" ");else if(c.key==="Dead"&&c.code.startsWith("Key")){let p=c.code.slice(3,4);c.shiftKey||(p=p.toLowerCase()),g.key=a.C0.ESC+p,g.cancel=!0}}else c.keyCode>=65&&c.keyCode<=90?g.key=String.fromCharCode(c.keyCode-64):c.keyCode===32?g.key=a.C0.NUL:c.keyCode>=51&&c.keyCode<=55?g.key=String.fromCharCode(c.keyCode-51+27):c.keyCode===56?g.key=a.C0.DEL:c.keyCode===219?g.key=a.C0.ESC:c.keyCode===220?g.key=a.C0.FS:c.keyCode===221&&(g.key=a.C0.GS)}return g}},482:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Utf8ToUtf32=s.StringToUtf32=s.utf32ToString=s.stringFromCodePoint=void 0,s.stringFromCodePoint=function(n){return n>65535?(n-=65536,String.fromCharCode(55296+(n>>10))+String.fromCharCode(n%1024+56320)):String.fromCharCode(n)},s.utf32ToString=function(n,a=0,l=n.length){let c="";for(let f=a;f<l;++f){let m=n[f];m>65535?(m-=65536,c+=String.fromCharCode(55296+(m>>10))+String.fromCharCode(m%1024+56320)):c+=String.fromCharCode(m)}return c},s.StringToUtf32=class{constructor(){this._interim=0}clear(){this._interim=0}decode(n,a){let l=n.length;if(!l)return 0;let c=0,f=0;if(this._interim){let m=n.charCodeAt(f++);56320<=m&&m<=57343?a[c++]=1024*(this._interim-55296)+m-56320+65536:(a[c++]=this._interim,a[c++]=m),this._interim=0}for(let m=f;m<l;++m){let _=n.charCodeAt(m);if(55296<=_&&_<=56319){if(++m>=l)return this._interim=_,c;let g=n.charCodeAt(m);56320<=g&&g<=57343?a[c++]=1024*(_-55296)+g-56320+65536:(a[c++]=_,a[c++]=g)}else _!==65279&&(a[c++]=_)}return c}},s.Utf8ToUtf32=class{constructor(){this.interim=new Uint8Array(3)}clear(){this.interim.fill(0)}decode(n,a){let l=n.length;if(!l)return 0;let c,f,m,_,g=0,h=0,d=0;if(this.interim[0]){let v=!1,x=this.interim[0];x&=(224&x)==192?31:(240&x)==224?15:7;let S,C=0;for(;(S=63&this.interim[++C])&&C<4;)x<<=6,x|=S;let y=(224&this.interim[0])==192?2:(240&this.interim[0])==224?3:4,k=y-C;for(;d<k;){if(d>=l)return 0;if(S=n[d++],(192&S)!=128){d--,v=!0;break}this.interim[C++]=S,x<<=6,x|=63&S}v||(y===2?x<128?d--:a[g++]=x:y===3?x<2048||x>=55296&&x<=57343||x===65279||(a[g++]=x):x<65536||x>1114111||(a[g++]=x)),this.interim.fill(0)}let u=l-4,p=d;for(;p<l;){for(;!(!(p<u)||128&(c=n[p])||128&(f=n[p+1])||128&(m=n[p+2])||128&(_=n[p+3]));)a[g++]=c,a[g++]=f,a[g++]=m,a[g++]=_,p+=4;if(c=n[p++],c<128)a[g++]=c;else if((224&c)==192){if(p>=l)return this.interim[0]=c,g;if(f=n[p++],(192&f)!=128){p--;continue}if(h=(31&c)<<6|63&f,h<128){p--;continue}a[g++]=h}else if((240&c)==224){if(p>=l)return this.interim[0]=c,g;if(f=n[p++],(192&f)!=128){p--;continue}if(p>=l)return this.interim[0]=c,this.interim[1]=f,g;if(m=n[p++],(192&m)!=128){p--;continue}if(h=(15&c)<<12|(63&f)<<6|63&m,h<2048||h>=55296&&h<=57343||h===65279)continue;a[g++]=h}else if((248&c)==240){if(p>=l)return this.interim[0]=c,g;if(f=n[p++],(192&f)!=128){p--;continue}if(p>=l)return this.interim[0]=c,this.interim[1]=f,g;if(m=n[p++],(192&m)!=128){p--;continue}if(p>=l)return this.interim[0]=c,this.interim[1]=f,this.interim[2]=m,g;if(_=n[p++],(192&_)!=128){p--;continue}if(h=(7&c)<<18|(63&f)<<12|(63&m)<<6|63&_,h<65536||h>1114111)continue;a[g++]=h}}return g}}},225:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.UnicodeV6=void 0;let a=n(1480),l=[[768,879],[1155,1158],[1160,1161],[1425,1469],[1471,1471],[1473,1474],[1476,1477],[1479,1479],[1536,1539],[1552,1557],[1611,1630],[1648,1648],[1750,1764],[1767,1768],[1770,1773],[1807,1807],[1809,1809],[1840,1866],[1958,1968],[2027,2035],[2305,2306],[2364,2364],[2369,2376],[2381,2381],[2385,2388],[2402,2403],[2433,2433],[2492,2492],[2497,2500],[2509,2509],[2530,2531],[2561,2562],[2620,2620],[2625,2626],[2631,2632],[2635,2637],[2672,2673],[2689,2690],[2748,2748],[2753,2757],[2759,2760],[2765,2765],[2786,2787],[2817,2817],[2876,2876],[2879,2879],[2881,2883],[2893,2893],[2902,2902],[2946,2946],[3008,3008],[3021,3021],[3134,3136],[3142,3144],[3146,3149],[3157,3158],[3260,3260],[3263,3263],[3270,3270],[3276,3277],[3298,3299],[3393,3395],[3405,3405],[3530,3530],[3538,3540],[3542,3542],[3633,3633],[3636,3642],[3655,3662],[3761,3761],[3764,3769],[3771,3772],[3784,3789],[3864,3865],[3893,3893],[3895,3895],[3897,3897],[3953,3966],[3968,3972],[3974,3975],[3984,3991],[3993,4028],[4038,4038],[4141,4144],[4146,4146],[4150,4151],[4153,4153],[4184,4185],[4448,4607],[4959,4959],[5906,5908],[5938,5940],[5970,5971],[6002,6003],[6068,6069],[6071,6077],[6086,6086],[6089,6099],[6109,6109],[6155,6157],[6313,6313],[6432,6434],[6439,6440],[6450,6450],[6457,6459],[6679,6680],[6912,6915],[6964,6964],[6966,6970],[6972,6972],[6978,6978],[7019,7027],[7616,7626],[7678,7679],[8203,8207],[8234,8238],[8288,8291],[8298,8303],[8400,8431],[12330,12335],[12441,12442],[43014,43014],[43019,43019],[43045,43046],[64286,64286],[65024,65039],[65056,65059],[65279,65279],[65529,65531]],c=[[68097,68099],[68101,68102],[68108,68111],[68152,68154],[68159,68159],[119143,119145],[119155,119170],[119173,119179],[119210,119213],[119362,119364],[917505,917505],[917536,917631],[917760,917999]],f;s.UnicodeV6=class{constructor(){if(this.version="6",!f){f=new Uint8Array(65536),f.fill(1),f[0]=0,f.fill(0,1,32),f.fill(0,127,160),f.fill(2,4352,4448),f[9001]=2,f[9002]=2,f.fill(2,11904,42192),f[12351]=1,f.fill(2,44032,55204),f.fill(2,63744,64256),f.fill(2,65040,65050),f.fill(2,65072,65136),f.fill(2,65280,65377),f.fill(2,65504,65511);for(let m=0;m<l.length;++m)f.fill(0,l[m][0],l[m][1]+1)}}wcwidth(m){return m<32?0:m<127?1:m<65536?f[m]:(function(_,g){let h,d=0,u=g.length-1;if(_<g[0][0]||_>g[u][1])return!1;for(;u>=d;)if(h=d+u>>1,_>g[h][1])d=h+1;else{if(!(_<g[h][0]))return!0;u=h-1}return!1})(m,c)?0:m>=131072&&m<=196605||m>=196608&&m<=262141?2:1}charProperties(m,_){let g=this.wcwidth(m),h=g===0&&_!==0;if(h){let d=a.UnicodeService.extractWidth(_);d===0?h=!1:d>g&&(g=d)}return a.UnicodeService.createPropertyValue(0,g,h)}}},5981:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.WriteBuffer=void 0;let a=n(8460),l=n(844);class c extends l.Disposable{constructor(m){super(),this._action=m,this._writeBuffer=[],this._callbacks=[],this._pendingData=0,this._bufferOffset=0,this._isSyncWriting=!1,this._syncCalls=0,this._didUserInput=!1,this._onWriteParsed=this.register(new a.EventEmitter),this.onWriteParsed=this._onWriteParsed.event}handleUserInput(){this._didUserInput=!0}writeSync(m,_){if(_!==void 0&&this._syncCalls>_)return void(this._syncCalls=0);if(this._pendingData+=m.length,this._writeBuffer.push(m),this._callbacks.push(void 0),this._syncCalls++,this._isSyncWriting)return;let g;for(this._isSyncWriting=!0;g=this._writeBuffer.shift();){this._action(g);let h=this._callbacks.shift();h&&h()}this._pendingData=0,this._bufferOffset=2147483647,this._isSyncWriting=!1,this._syncCalls=0}write(m,_){if(this._pendingData>5e7)throw new Error("write data discarded, use flow control to avoid losing data");if(!this._writeBuffer.length){if(this._bufferOffset=0,this._didUserInput)return this._didUserInput=!1,this._pendingData+=m.length,this._writeBuffer.push(m),this._callbacks.push(_),void this._innerWrite();setTimeout((()=>this._innerWrite()))}this._pendingData+=m.length,this._writeBuffer.push(m),this._callbacks.push(_)}_innerWrite(m=0,_=!0){let g=m||Date.now();for(;this._writeBuffer.length>this._bufferOffset;){let h=this._writeBuffer[this._bufferOffset],d=this._action(h,_);if(d){let p=v=>Date.now()-g>=12?setTimeout((()=>this._innerWrite(0,v))):this._innerWrite(g,v);return void d.catch((v=>(queueMicrotask((()=>{throw v})),Promise.resolve(!1)))).then(p)}let u=this._callbacks[this._bufferOffset];if(u&&u(),this._bufferOffset++,this._pendingData-=h.length,Date.now()-g>=12)break}this._writeBuffer.length>this._bufferOffset?(this._bufferOffset>50&&(this._writeBuffer=this._writeBuffer.slice(this._bufferOffset),this._callbacks=this._callbacks.slice(this._bufferOffset),this._bufferOffset=0),setTimeout((()=>this._innerWrite()))):(this._writeBuffer.length=0,this._callbacks.length=0,this._pendingData=0,this._bufferOffset=0),this._onWriteParsed.fire()}}s.WriteBuffer=c},5941:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.toRgbString=s.parseColor=void 0;let n=/^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/,a=/^[\da-f]+$/;function l(c,f){let m=c.toString(16),_=m.length<2?"0"+m:m;switch(f){case 4:return m[0];case 8:return _;case 12:return(_+_).slice(0,3);default:return _+_}}s.parseColor=function(c){if(!c)return;let f=c.toLowerCase();if(f.indexOf("rgb:")===0){f=f.slice(4);let m=n.exec(f);if(m){let _=m[1]?15:m[4]?255:m[7]?4095:65535;return[Math.round(parseInt(m[1]||m[4]||m[7]||m[10],16)/_*255),Math.round(parseInt(m[2]||m[5]||m[8]||m[11],16)/_*255),Math.round(parseInt(m[3]||m[6]||m[9]||m[12],16)/_*255)]}}else if(f.indexOf("#")===0&&(f=f.slice(1),a.exec(f)&&[3,6,9,12].includes(f.length))){let m=f.length/3,_=[0,0,0];for(let g=0;g<3;++g){let h=parseInt(f.slice(m*g,m*g+m),16);_[g]=m===1?h<<4:m===2?h:m===3?h>>4:h>>8}return _}},s.toRgbString=function(c,f=16){let[m,_,g]=c;return`rgb:${l(m,f)}/${l(_,f)}/${l(g,f)}`}},5770:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.PAYLOAD_LIMIT=void 0,s.PAYLOAD_LIMIT=1e7},6351:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.DcsHandler=s.DcsParser=void 0;let a=n(482),l=n(8742),c=n(5770),f=[];s.DcsParser=class{constructor(){this._handlers=Object.create(null),this._active=f,this._ident=0,this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=f}registerHandler(_,g){this._handlers[_]===void 0&&(this._handlers[_]=[]);let h=this._handlers[_];return h.push(g),{dispose:()=>{let d=h.indexOf(g);d!==-1&&h.splice(d,1)}}}clearHandler(_){this._handlers[_]&&delete this._handlers[_]}setHandlerFallback(_){this._handlerFb=_}reset(){if(this._active.length)for(let _=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;_>=0;--_)this._active[_].unhook(!1);this._stack.paused=!1,this._active=f,this._ident=0}hook(_,g){if(this.reset(),this._ident=_,this._active=this._handlers[_]||f,this._active.length)for(let h=this._active.length-1;h>=0;h--)this._active[h].hook(g);else this._handlerFb(this._ident,"HOOK",g)}put(_,g,h){if(this._active.length)for(let d=this._active.length-1;d>=0;d--)this._active[d].put(_,g,h);else this._handlerFb(this._ident,"PUT",(0,a.utf32ToString)(_,g,h))}unhook(_,g=!0){if(this._active.length){let h=!1,d=this._active.length-1,u=!1;if(this._stack.paused&&(d=this._stack.loopPosition-1,h=g,u=this._stack.fallThrough,this._stack.paused=!1),!u&&h===!1){for(;d>=0&&(h=this._active[d].unhook(_),h!==!0);d--)if(h instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=d,this._stack.fallThrough=!1,h;d--}for(;d>=0;d--)if(h=this._active[d].unhook(!1),h instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=d,this._stack.fallThrough=!0,h}else this._handlerFb(this._ident,"UNHOOK",_);this._active=f,this._ident=0}};let m=new l.Params;m.addParam(0),s.DcsHandler=class{constructor(_){this._handler=_,this._data="",this._params=m,this._hitLimit=!1}hook(_){this._params=_.length>1||_.params[0]?_.clone():m,this._data="",this._hitLimit=!1}put(_,g,h){this._hitLimit||(this._data+=(0,a.utf32ToString)(_,g,h),this._data.length>c.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}unhook(_){let g=!1;if(this._hitLimit)g=!1;else if(_&&(g=this._handler(this._data,this._params),g instanceof Promise))return g.then((h=>(this._params=m,this._data="",this._hitLimit=!1,h)));return this._params=m,this._data="",this._hitLimit=!1,g}}},2015:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.EscapeSequenceParser=s.VT500_TRANSITION_TABLE=s.TransitionTable=void 0;let a=n(844),l=n(8742),c=n(6242),f=n(6351);class m{constructor(d){this.table=new Uint8Array(d)}setDefault(d,u){this.table.fill(d<<4|u)}add(d,u,p,v){this.table[u<<8|d]=p<<4|v}addMany(d,u,p,v){for(let x=0;x<d.length;x++)this.table[u<<8|d[x]]=p<<4|v}}s.TransitionTable=m;let _=160;s.VT500_TRANSITION_TABLE=(function(){let h=new m(4095),d=Array.apply(null,Array(256)).map(((C,y)=>y)),u=(C,y)=>d.slice(C,y),p=u(32,127),v=u(0,24);v.push(25),v.push.apply(v,u(28,32));let x=u(0,14),S;for(S in h.setDefault(1,0),h.addMany(p,0,2,0),x)h.addMany([24,26,153,154],S,3,0),h.addMany(u(128,144),S,3,0),h.addMany(u(144,152),S,3,0),h.add(156,S,0,0),h.add(27,S,11,1),h.add(157,S,4,8),h.addMany([152,158,159],S,0,7),h.add(155,S,11,3),h.add(144,S,11,9);return h.addMany(v,0,3,0),h.addMany(v,1,3,1),h.add(127,1,0,1),h.addMany(v,8,0,8),h.addMany(v,3,3,3),h.add(127,3,0,3),h.addMany(v,4,3,4),h.add(127,4,0,4),h.addMany(v,6,3,6),h.addMany(v,5,3,5),h.add(127,5,0,5),h.addMany(v,2,3,2),h.add(127,2,0,2),h.add(93,1,4,8),h.addMany(p,8,5,8),h.add(127,8,5,8),h.addMany([156,27,24,26,7],8,6,0),h.addMany(u(28,32),8,0,8),h.addMany([88,94,95],1,0,7),h.addMany(p,7,0,7),h.addMany(v,7,0,7),h.add(156,7,0,0),h.add(127,7,0,7),h.add(91,1,11,3),h.addMany(u(64,127),3,7,0),h.addMany(u(48,60),3,8,4),h.addMany([60,61,62,63],3,9,4),h.addMany(u(48,60),4,8,4),h.addMany(u(64,127),4,7,0),h.addMany([60,61,62,63],4,0,6),h.addMany(u(32,64),6,0,6),h.add(127,6,0,6),h.addMany(u(64,127),6,0,0),h.addMany(u(32,48),3,9,5),h.addMany(u(32,48),5,9,5),h.addMany(u(48,64),5,0,6),h.addMany(u(64,127),5,7,0),h.addMany(u(32,48),4,9,5),h.addMany(u(32,48),1,9,2),h.addMany(u(32,48),2,9,2),h.addMany(u(48,127),2,10,0),h.addMany(u(48,80),1,10,0),h.addMany(u(81,88),1,10,0),h.addMany([89,90,92],1,10,0),h.addMany(u(96,127),1,10,0),h.add(80,1,11,9),h.addMany(v,9,0,9),h.add(127,9,0,9),h.addMany(u(28,32),9,0,9),h.addMany(u(32,48),9,9,12),h.addMany(u(48,60),9,8,10),h.addMany([60,61,62,63],9,9,10),h.addMany(v,11,0,11),h.addMany(u(32,128),11,0,11),h.addMany(u(28,32),11,0,11),h.addMany(v,10,0,10),h.add(127,10,0,10),h.addMany(u(28,32),10,0,10),h.addMany(u(48,60),10,8,10),h.addMany([60,61,62,63],10,0,11),h.addMany(u(32,48),10,9,12),h.addMany(v,12,0,12),h.add(127,12,0,12),h.addMany(u(28,32),12,0,12),h.addMany(u(32,48),12,9,12),h.addMany(u(48,64),12,0,11),h.addMany(u(64,127),12,12,13),h.addMany(u(64,127),10,12,13),h.addMany(u(64,127),9,12,13),h.addMany(v,13,13,13),h.addMany(p,13,13,13),h.add(127,13,0,13),h.addMany([27,156,24,26],13,14,0),h.add(_,0,2,0),h.add(_,8,5,8),h.add(_,6,0,6),h.add(_,11,0,11),h.add(_,13,13,13),h})();class g extends a.Disposable{constructor(d=s.VT500_TRANSITION_TABLE){super(),this._transitions=d,this._parseStack={state:0,handlers:[],handlerPos:0,transition:0,chunkPos:0},this.initialState=0,this.currentState=this.initialState,this._params=new l.Params,this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._printHandlerFb=(u,p,v)=>{},this._executeHandlerFb=u=>{},this._csiHandlerFb=(u,p)=>{},this._escHandlerFb=u=>{},this._errorHandlerFb=u=>u,this._printHandler=this._printHandlerFb,this._executeHandlers=Object.create(null),this._csiHandlers=Object.create(null),this._escHandlers=Object.create(null),this.register((0,a.toDisposable)((()=>{this._csiHandlers=Object.create(null),this._executeHandlers=Object.create(null),this._escHandlers=Object.create(null)}))),this._oscParser=this.register(new c.OscParser),this._dcsParser=this.register(new f.DcsParser),this._errorHandler=this._errorHandlerFb,this.registerEscHandler({final:"\\"},(()=>!0))}_identifier(d,u=[64,126]){let p=0;if(d.prefix){if(d.prefix.length>1)throw new Error("only one byte as prefix supported");if(p=d.prefix.charCodeAt(0),p&&60>p||p>63)throw new Error("prefix must be in range 0x3c .. 0x3f")}if(d.intermediates){if(d.intermediates.length>2)throw new Error("only two bytes as intermediates are supported");for(let x=0;x<d.intermediates.length;++x){let S=d.intermediates.charCodeAt(x);if(32>S||S>47)throw new Error("intermediate must be in range 0x20 .. 0x2f");p<<=8,p|=S}}if(d.final.length!==1)throw new Error("final must be a single byte");let v=d.final.charCodeAt(0);if(u[0]>v||v>u[1])throw new Error(`final must be in range ${u[0]} .. ${u[1]}`);return p<<=8,p|=v,p}identToString(d){let u=[];for(;d;)u.push(String.fromCharCode(255&d)),d>>=8;return u.reverse().join("")}setPrintHandler(d){this._printHandler=d}clearPrintHandler(){this._printHandler=this._printHandlerFb}registerEscHandler(d,u){let p=this._identifier(d,[48,126]);this._escHandlers[p]===void 0&&(this._escHandlers[p]=[]);let v=this._escHandlers[p];return v.push(u),{dispose:()=>{let x=v.indexOf(u);x!==-1&&v.splice(x,1)}}}clearEscHandler(d){this._escHandlers[this._identifier(d,[48,126])]&&delete this._escHandlers[this._identifier(d,[48,126])]}setEscHandlerFallback(d){this._escHandlerFb=d}setExecuteHandler(d,u){this._executeHandlers[d.charCodeAt(0)]=u}clearExecuteHandler(d){this._executeHandlers[d.charCodeAt(0)]&&delete this._executeHandlers[d.charCodeAt(0)]}setExecuteHandlerFallback(d){this._executeHandlerFb=d}registerCsiHandler(d,u){let p=this._identifier(d);this._csiHandlers[p]===void 0&&(this._csiHandlers[p]=[]);let v=this._csiHandlers[p];return v.push(u),{dispose:()=>{let x=v.indexOf(u);x!==-1&&v.splice(x,1)}}}clearCsiHandler(d){this._csiHandlers[this._identifier(d)]&&delete this._csiHandlers[this._identifier(d)]}setCsiHandlerFallback(d){this._csiHandlerFb=d}registerDcsHandler(d,u){return this._dcsParser.registerHandler(this._identifier(d),u)}clearDcsHandler(d){this._dcsParser.clearHandler(this._identifier(d))}setDcsHandlerFallback(d){this._dcsParser.setHandlerFallback(d)}registerOscHandler(d,u){return this._oscParser.registerHandler(d,u)}clearOscHandler(d){this._oscParser.clearHandler(d)}setOscHandlerFallback(d){this._oscParser.setHandlerFallback(d)}setErrorHandler(d){this._errorHandler=d}clearErrorHandler(){this._errorHandler=this._errorHandlerFb}reset(){this.currentState=this.initialState,this._oscParser.reset(),this._dcsParser.reset(),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._parseStack.state!==0&&(this._parseStack.state=2,this._parseStack.handlers=[])}_preserveStack(d,u,p,v,x){this._parseStack.state=d,this._parseStack.handlers=u,this._parseStack.handlerPos=p,this._parseStack.transition=v,this._parseStack.chunkPos=x}parse(d,u,p){let v,x=0,S=0,C=0;if(this._parseStack.state)if(this._parseStack.state===2)this._parseStack.state=0,C=this._parseStack.chunkPos+1;else{if(p===void 0||this._parseStack.state===1)throw this._parseStack.state=1,new Error("improper continuation due to previous async handler, giving up parsing");let y=this._parseStack.handlers,k=this._parseStack.handlerPos-1;switch(this._parseStack.state){case 3:if(p===!1&&k>-1){for(;k>=0&&(v=y[k](this._params),v!==!0);k--)if(v instanceof Promise)return this._parseStack.handlerPos=k,v}this._parseStack.handlers=[];break;case 4:if(p===!1&&k>-1){for(;k>=0&&(v=y[k](),v!==!0);k--)if(v instanceof Promise)return this._parseStack.handlerPos=k,v}this._parseStack.handlers=[];break;case 6:if(x=d[this._parseStack.chunkPos],v=this._dcsParser.unhook(x!==24&&x!==26,p),v)return v;x===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0;break;case 5:if(x=d[this._parseStack.chunkPos],v=this._oscParser.end(x!==24&&x!==26,p),v)return v;x===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0}this._parseStack.state=0,C=this._parseStack.chunkPos+1,this.precedingJoinState=0,this.currentState=15&this._parseStack.transition}for(let y=C;y<u;++y){switch(x=d[y],S=this._transitions.table[this.currentState<<8|(x<160?x:_)],S>>4){case 2:for(let L=y+1;;++L){if(L>=u||(x=d[L])<32||x>126&&x<_){this._printHandler(d,y,L),y=L-1;break}if(++L>=u||(x=d[L])<32||x>126&&x<_){this._printHandler(d,y,L),y=L-1;break}if(++L>=u||(x=d[L])<32||x>126&&x<_){this._printHandler(d,y,L),y=L-1;break}if(++L>=u||(x=d[L])<32||x>126&&x<_){this._printHandler(d,y,L),y=L-1;break}}break;case 3:this._executeHandlers[x]?this._executeHandlers[x]():this._executeHandlerFb(x),this.precedingJoinState=0;break;case 0:break;case 1:if(this._errorHandler({position:y,code:x,currentState:this.currentState,collect:this._collect,params:this._params,abort:!1}).abort)return;break;case 7:let k=this._csiHandlers[this._collect<<8|x],D=k?k.length-1:-1;for(;D>=0&&(v=k[D](this._params),v!==!0);D--)if(v instanceof Promise)return this._preserveStack(3,k,D,S,y),v;D<0&&this._csiHandlerFb(this._collect<<8|x,this._params),this.precedingJoinState=0;break;case 8:do switch(x){case 59:this._params.addParam(0);break;case 58:this._params.addSubParam(-1);break;default:this._params.addDigit(x-48)}while(++y<u&&(x=d[y])>47&&x<60);y--;break;case 9:this._collect<<=8,this._collect|=x;break;case 10:let $=this._escHandlers[this._collect<<8|x],F=$?$.length-1:-1;for(;F>=0&&(v=$[F](),v!==!0);F--)if(v instanceof Promise)return this._preserveStack(4,$,F,S,y),v;F<0&&this._escHandlerFb(this._collect<<8|x),this.precedingJoinState=0;break;case 11:this._params.reset(),this._params.addParam(0),this._collect=0;break;case 12:this._dcsParser.hook(this._collect<<8|x,this._params);break;case 13:for(let L=y+1;;++L)if(L>=u||(x=d[L])===24||x===26||x===27||x>127&&x<_){this._dcsParser.put(d,y,L),y=L-1;break}break;case 14:if(v=this._dcsParser.unhook(x!==24&&x!==26),v)return this._preserveStack(6,[],0,S,y),v;x===27&&(S|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0;break;case 4:this._oscParser.start();break;case 5:for(let L=y+1;;L++)if(L>=u||(x=d[L])<32||x>127&&x<_){this._oscParser.put(d,y,L),y=L-1;break}break;case 6:if(v=this._oscParser.end(x!==24&&x!==26),v)return this._preserveStack(5,[],0,S,y),v;x===27&&(S|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0}this.currentState=15&S}}}s.EscapeSequenceParser=g},6242:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.OscHandler=s.OscParser=void 0;let a=n(5770),l=n(482),c=[];s.OscParser=class{constructor(){this._state=0,this._active=c,this._id=-1,this._handlers=Object.create(null),this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}registerHandler(f,m){this._handlers[f]===void 0&&(this._handlers[f]=[]);let _=this._handlers[f];return _.push(m),{dispose:()=>{let g=_.indexOf(m);g!==-1&&_.splice(g,1)}}}clearHandler(f){this._handlers[f]&&delete this._handlers[f]}setHandlerFallback(f){this._handlerFb=f}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=c}reset(){if(this._state===2)for(let f=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;f>=0;--f)this._active[f].end(!1);this._stack.paused=!1,this._active=c,this._id=-1,this._state=0}_start(){if(this._active=this._handlers[this._id]||c,this._active.length)for(let f=this._active.length-1;f>=0;f--)this._active[f].start();else this._handlerFb(this._id,"START")}_put(f,m,_){if(this._active.length)for(let g=this._active.length-1;g>=0;g--)this._active[g].put(f,m,_);else this._handlerFb(this._id,"PUT",(0,l.utf32ToString)(f,m,_))}start(){this.reset(),this._state=1}put(f,m,_){if(this._state!==3){if(this._state===1)for(;m<_;){let g=f[m++];if(g===59){this._state=2,this._start();break}if(g<48||57<g)return void(this._state=3);this._id===-1&&(this._id=0),this._id=10*this._id+g-48}this._state===2&&_-m>0&&this._put(f,m,_)}}end(f,m=!0){if(this._state!==0){if(this._state!==3)if(this._state===1&&this._start(),this._active.length){let _=!1,g=this._active.length-1,h=!1;if(this._stack.paused&&(g=this._stack.loopPosition-1,_=m,h=this._stack.fallThrough,this._stack.paused=!1),!h&&_===!1){for(;g>=0&&(_=this._active[g].end(f),_!==!0);g--)if(_ instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=g,this._stack.fallThrough=!1,_;g--}for(;g>=0;g--)if(_=this._active[g].end(!1),_ instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=g,this._stack.fallThrough=!0,_}else this._handlerFb(this._id,"END",f);this._active=c,this._id=-1,this._state=0}}},s.OscHandler=class{constructor(f){this._handler=f,this._data="",this._hitLimit=!1}start(){this._data="",this._hitLimit=!1}put(f,m,_){this._hitLimit||(this._data+=(0,l.utf32ToString)(f,m,_),this._data.length>a.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}end(f){let m=!1;if(this._hitLimit)m=!1;else if(f&&(m=this._handler(this._data),m instanceof Promise))return m.then((_=>(this._data="",this._hitLimit=!1,_)));return this._data="",this._hitLimit=!1,m}}},8742:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Params=void 0;let n=2147483647;class a{static fromArray(c){let f=new a;if(!c.length)return f;for(let m=Array.isArray(c[0])?1:0;m<c.length;++m){let _=c[m];if(Array.isArray(_))for(let g=0;g<_.length;++g)f.addSubParam(_[g]);else f.addParam(_)}return f}constructor(c=32,f=32){if(this.maxLength=c,this.maxSubParamsLength=f,f>256)throw new Error("maxSubParamsLength must not be greater than 256");this.params=new Int32Array(c),this.length=0,this._subParams=new Int32Array(f),this._subParamsLength=0,this._subParamsIdx=new Uint16Array(c),this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}clone(){let c=new a(this.maxLength,this.maxSubParamsLength);return c.params.set(this.params),c.length=this.length,c._subParams.set(this._subParams),c._subParamsLength=this._subParamsLength,c._subParamsIdx.set(this._subParamsIdx),c._rejectDigits=this._rejectDigits,c._rejectSubDigits=this._rejectSubDigits,c._digitIsSub=this._digitIsSub,c}toArray(){let c=[];for(let f=0;f<this.length;++f){c.push(this.params[f]);let m=this._subParamsIdx[f]>>8,_=255&this._subParamsIdx[f];_-m>0&&c.push(Array.prototype.slice.call(this._subParams,m,_))}return c}reset(){this.length=0,this._subParamsLength=0,this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}addParam(c){if(this._digitIsSub=!1,this.length>=this.maxLength)this._rejectDigits=!0;else{if(c<-1)throw new Error("values lesser than -1 are not allowed");this._subParamsIdx[this.length]=this._subParamsLength<<8|this._subParamsLength,this.params[this.length++]=c>n?n:c}}addSubParam(c){if(this._digitIsSub=!0,this.length)if(this._rejectDigits||this._subParamsLength>=this.maxSubParamsLength)this._rejectSubDigits=!0;else{if(c<-1)throw new Error("values lesser than -1 are not allowed");this._subParams[this._subParamsLength++]=c>n?n:c,this._subParamsIdx[this.length-1]++}}hasSubParams(c){return(255&this._subParamsIdx[c])-(this._subParamsIdx[c]>>8)>0}getSubParams(c){let f=this._subParamsIdx[c]>>8,m=255&this._subParamsIdx[c];return m-f>0?this._subParams.subarray(f,m):null}getSubParamsAll(){let c={};for(let f=0;f<this.length;++f){let m=this._subParamsIdx[f]>>8,_=255&this._subParamsIdx[f];_-m>0&&(c[f]=this._subParams.slice(m,_))}return c}addDigit(c){let f;if(this._rejectDigits||!(f=this._digitIsSub?this._subParamsLength:this.length)||this._digitIsSub&&this._rejectSubDigits)return;let m=this._digitIsSub?this._subParams:this.params,_=m[f-1];m[f-1]=~_?Math.min(10*_+c,n):c}}s.Params=a},5741:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.AddonManager=void 0,s.AddonManager=class{constructor(){this._addons=[]}dispose(){for(let n=this._addons.length-1;n>=0;n--)this._addons[n].instance.dispose()}loadAddon(n,a){let l={instance:a,dispose:a.dispose,isDisposed:!1};this._addons.push(l),a.dispose=()=>this._wrappedAddonDispose(l),a.activate(n)}_wrappedAddonDispose(n){if(n.isDisposed)return;let a=-1;for(let l=0;l<this._addons.length;l++)if(this._addons[l]===n){a=l;break}if(a===-1)throw new Error("Could not dispose an addon that has not been loaded");n.isDisposed=!0,n.dispose.apply(n.instance),this._addons.splice(a,1)}}},8771:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.BufferApiView=void 0;let a=n(3785),l=n(511);s.BufferApiView=class{constructor(c,f){this._buffer=c,this.type=f}init(c){return this._buffer=c,this}get cursorY(){return this._buffer.y}get cursorX(){return this._buffer.x}get viewportY(){return this._buffer.ydisp}get baseY(){return this._buffer.ybase}get length(){return this._buffer.lines.length}getLine(c){let f=this._buffer.lines.get(c);if(f)return new a.BufferLineApiView(f)}getNullCell(){return new l.CellData}}},3785:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.BufferLineApiView=void 0;let a=n(511);s.BufferLineApiView=class{constructor(l){this._line=l}get isWrapped(){return this._line.isWrapped}get length(){return this._line.length}getCell(l,c){if(!(l<0||l>=this._line.length))return c?(this._line.loadCell(l,c),c):this._line.loadCell(l,new a.CellData)}translateToString(l,c,f){return this._line.translateToString(l,c,f)}}},8285:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.BufferNamespaceApi=void 0;let a=n(8771),l=n(8460),c=n(844);class f extends c.Disposable{constructor(_){super(),this._core=_,this._onBufferChange=this.register(new l.EventEmitter),this.onBufferChange=this._onBufferChange.event,this._normal=new a.BufferApiView(this._core.buffers.normal,"normal"),this._alternate=new a.BufferApiView(this._core.buffers.alt,"alternate"),this._core.buffers.onBufferActivate((()=>this._onBufferChange.fire(this.active)))}get active(){if(this._core.buffers.active===this._core.buffers.normal)return this.normal;if(this._core.buffers.active===this._core.buffers.alt)return this.alternate;throw new Error("Active buffer is neither normal nor alternate")}get normal(){return this._normal.init(this._core.buffers.normal)}get alternate(){return this._alternate.init(this._core.buffers.alt)}}s.BufferNamespaceApi=f},7975:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.ParserApi=void 0,s.ParserApi=class{constructor(n){this._core=n}registerCsiHandler(n,a){return this._core.registerCsiHandler(n,(l=>a(l.toArray())))}addCsiHandler(n,a){return this.registerCsiHandler(n,a)}registerDcsHandler(n,a){return this._core.registerDcsHandler(n,((l,c)=>a(l,c.toArray())))}addDcsHandler(n,a){return this.registerDcsHandler(n,a)}registerEscHandler(n,a){return this._core.registerEscHandler(n,a)}addEscHandler(n,a){return this.registerEscHandler(n,a)}registerOscHandler(n,a){return this._core.registerOscHandler(n,a)}addOscHandler(n,a){return this.registerOscHandler(n,a)}}},7090:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.UnicodeApi=void 0,s.UnicodeApi=class{constructor(n){this._core=n}register(n){this._core.unicodeService.register(n)}get versions(){return this._core.unicodeService.versions}get activeVersion(){return this._core.unicodeService.activeVersion}set activeVersion(n){this._core.unicodeService.activeVersion=n}}},744:function(o,s,n){var a=this&&this.__decorate||function(h,d,u,p){var v,x=arguments.length,S=x<3?d:p===null?p=Object.getOwnPropertyDescriptor(d,u):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")S=Reflect.decorate(h,d,u,p);else for(var C=h.length-1;C>=0;C--)(v=h[C])&&(S=(x<3?v(S):x>3?v(d,u,S):v(d,u))||S);return x>3&&S&&Object.defineProperty(d,u,S),S},l=this&&this.__param||function(h,d){return function(u,p){d(u,p,h)}};Object.defineProperty(s,"__esModule",{value:!0}),s.BufferService=s.MINIMUM_ROWS=s.MINIMUM_COLS=void 0;let c=n(8460),f=n(844),m=n(5295),_=n(2585);s.MINIMUM_COLS=2,s.MINIMUM_ROWS=1;let g=s.BufferService=class extends f.Disposable{get buffer(){return this.buffers.active}constructor(h){super(),this.isUserScrolling=!1,this._onResize=this.register(new c.EventEmitter),this.onResize=this._onResize.event,this._onScroll=this.register(new c.EventEmitter),this.onScroll=this._onScroll.event,this.cols=Math.max(h.rawOptions.cols||0,s.MINIMUM_COLS),this.rows=Math.max(h.rawOptions.rows||0,s.MINIMUM_ROWS),this.buffers=this.register(new m.BufferSet(h,this))}resize(h,d){this.cols=h,this.rows=d,this.buffers.resize(h,d),this._onResize.fire({cols:h,rows:d})}reset(){this.buffers.reset(),this.isUserScrolling=!1}scroll(h,d=!1){let u=this.buffer,p;p=this._cachedBlankLine,p&&p.length===this.cols&&p.getFg(0)===h.fg&&p.getBg(0)===h.bg||(p=u.getBlankLine(h,d),this._cachedBlankLine=p),p.isWrapped=d;let v=u.ybase+u.scrollTop,x=u.ybase+u.scrollBottom;if(u.scrollTop===0){let S=u.lines.isFull;x===u.lines.length-1?S?u.lines.recycle().copyFrom(p):u.lines.push(p.clone()):u.lines.splice(x+1,0,p.clone()),S?this.isUserScrolling&&(u.ydisp=Math.max(u.ydisp-1,0)):(u.ybase++,this.isUserScrolling||u.ydisp++)}else{let S=x-v+1;u.lines.shiftElements(v+1,S-1,-1),u.lines.set(x,p.clone())}this.isUserScrolling||(u.ydisp=u.ybase),this._onScroll.fire(u.ydisp)}scrollLines(h,d,u){let p=this.buffer;if(h<0){if(p.ydisp===0)return;this.isUserScrolling=!0}else h+p.ydisp>=p.ybase&&(this.isUserScrolling=!1);let v=p.ydisp;p.ydisp=Math.max(Math.min(p.ydisp+h,p.ybase),0),v!==p.ydisp&&(d||this._onScroll.fire(p.ydisp))}};s.BufferService=g=a([l(0,_.IOptionsService)],g)},7994:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.CharsetService=void 0,s.CharsetService=class{constructor(){this.glevel=0,this._charsets=[]}reset(){this.charset=void 0,this._charsets=[],this.glevel=0}setgLevel(n){this.glevel=n,this.charset=this._charsets[n]}setgCharset(n,a){this._charsets[n]=a,this.glevel===n&&(this.charset=a)}}},1753:function(o,s,n){var a=this&&this.__decorate||function(p,v,x,S){var C,y=arguments.length,k=y<3?v:S===null?S=Object.getOwnPropertyDescriptor(v,x):S;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")k=Reflect.decorate(p,v,x,S);else for(var D=p.length-1;D>=0;D--)(C=p[D])&&(k=(y<3?C(k):y>3?C(v,x,k):C(v,x))||k);return y>3&&k&&Object.defineProperty(v,x,k),k},l=this&&this.__param||function(p,v){return function(x,S){v(x,S,p)}};Object.defineProperty(s,"__esModule",{value:!0}),s.CoreMouseService=void 0;let c=n(2585),f=n(8460),m=n(844),_={NONE:{events:0,restrict:()=>!1},X10:{events:1,restrict:p=>p.button!==4&&p.action===1&&(p.ctrl=!1,p.alt=!1,p.shift=!1,!0)},VT200:{events:19,restrict:p=>p.action!==32},DRAG:{events:23,restrict:p=>p.action!==32||p.button!==3},ANY:{events:31,restrict:p=>!0}};function g(p,v){let x=(p.ctrl?16:0)|(p.shift?4:0)|(p.alt?8:0);return p.button===4?(x|=64,x|=p.action):(x|=3&p.button,4&p.button&&(x|=64),8&p.button&&(x|=128),p.action===32?x|=32:p.action!==0||v||(x|=3)),x}let h=String.fromCharCode,d={DEFAULT:p=>{let v=[g(p,!1)+32,p.col+32,p.row+32];return v[0]>255||v[1]>255||v[2]>255?"":`\x1B[M${h(v[0])}${h(v[1])}${h(v[2])}`},SGR:p=>{let v=p.action===0&&p.button!==4?"m":"M";return`\x1B[<${g(p,!0)};${p.col};${p.row}${v}`},SGR_PIXELS:p=>{let v=p.action===0&&p.button!==4?"m":"M";return`\x1B[<${g(p,!0)};${p.x};${p.y}${v}`}},u=s.CoreMouseService=class extends m.Disposable{constructor(p,v){super(),this._bufferService=p,this._coreService=v,this._protocols={},this._encodings={},this._activeProtocol="",this._activeEncoding="",this._lastEvent=null,this._onProtocolChange=this.register(new f.EventEmitter),this.onProtocolChange=this._onProtocolChange.event;for(let x of Object.keys(_))this.addProtocol(x,_[x]);for(let x of Object.keys(d))this.addEncoding(x,d[x]);this.reset()}addProtocol(p,v){this._protocols[p]=v}addEncoding(p,v){this._encodings[p]=v}get activeProtocol(){return this._activeProtocol}get areMouseEventsActive(){return this._protocols[this._activeProtocol].events!==0}set activeProtocol(p){if(!this._protocols[p])throw new Error(`unknown protocol "${p}"`);this._activeProtocol=p,this._onProtocolChange.fire(this._protocols[p].events)}get activeEncoding(){return this._activeEncoding}set activeEncoding(p){if(!this._encodings[p])throw new Error(`unknown encoding "${p}"`);this._activeEncoding=p}reset(){this.activeProtocol="NONE",this.activeEncoding="DEFAULT",this._lastEvent=null}triggerMouseEvent(p){if(p.col<0||p.col>=this._bufferService.cols||p.row<0||p.row>=this._bufferService.rows||p.button===4&&p.action===32||p.button===3&&p.action!==32||p.button!==4&&(p.action===2||p.action===3)||(p.col++,p.row++,p.action===32&&this._lastEvent&&this._equalEvents(this._lastEvent,p,this._activeEncoding==="SGR_PIXELS"))||!this._protocols[this._activeProtocol].restrict(p))return!1;let v=this._encodings[this._activeEncoding](p);return v&&(this._activeEncoding==="DEFAULT"?this._coreService.triggerBinaryEvent(v):this._coreService.triggerDataEvent(v,!0)),this._lastEvent=p,!0}explainEvents(p){return{down:!!(1&p),up:!!(2&p),drag:!!(4&p),move:!!(8&p),wheel:!!(16&p)}}_equalEvents(p,v,x){if(x){if(p.x!==v.x||p.y!==v.y)return!1}else if(p.col!==v.col||p.row!==v.row)return!1;return p.button===v.button&&p.action===v.action&&p.ctrl===v.ctrl&&p.alt===v.alt&&p.shift===v.shift}};s.CoreMouseService=u=a([l(0,c.IBufferService),l(1,c.ICoreService)],u)},6975:function(o,s,n){var a=this&&this.__decorate||function(u,p,v,x){var S,C=arguments.length,y=C<3?p:x===null?x=Object.getOwnPropertyDescriptor(p,v):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")y=Reflect.decorate(u,p,v,x);else for(var k=u.length-1;k>=0;k--)(S=u[k])&&(y=(C<3?S(y):C>3?S(p,v,y):S(p,v))||y);return C>3&&y&&Object.defineProperty(p,v,y),y},l=this&&this.__param||function(u,p){return function(v,x){p(v,x,u)}};Object.defineProperty(s,"__esModule",{value:!0}),s.CoreService=void 0;let c=n(1439),f=n(8460),m=n(844),_=n(2585),g=Object.freeze({insertMode:!1}),h=Object.freeze({applicationCursorKeys:!1,applicationKeypad:!1,bracketedPasteMode:!1,origin:!1,reverseWraparound:!1,sendFocus:!1,wraparound:!0}),d=s.CoreService=class extends m.Disposable{constructor(u,p,v){super(),this._bufferService=u,this._logService=p,this._optionsService=v,this.isCursorInitialized=!1,this.isCursorHidden=!1,this._onData=this.register(new f.EventEmitter),this.onData=this._onData.event,this._onUserInput=this.register(new f.EventEmitter),this.onUserInput=this._onUserInput.event,this._onBinary=this.register(new f.EventEmitter),this.onBinary=this._onBinary.event,this._onRequestScrollToBottom=this.register(new f.EventEmitter),this.onRequestScrollToBottom=this._onRequestScrollToBottom.event,this.modes=(0,c.clone)(g),this.decPrivateModes=(0,c.clone)(h)}reset(){this.modes=(0,c.clone)(g),this.decPrivateModes=(0,c.clone)(h)}triggerDataEvent(u,p=!1){if(this._optionsService.rawOptions.disableStdin)return;let v=this._bufferService.buffer;p&&this._optionsService.rawOptions.scrollOnUserInput&&v.ybase!==v.ydisp&&this._onRequestScrollToBottom.fire(),p&&this._onUserInput.fire(),this._logService.debug(`sending data "${u}"`,(()=>u.split("").map((x=>x.charCodeAt(0))))),this._onData.fire(u)}triggerBinaryEvent(u){this._optionsService.rawOptions.disableStdin||(this._logService.debug(`sending binary "${u}"`,(()=>u.split("").map((p=>p.charCodeAt(0))))),this._onBinary.fire(u))}};s.CoreService=d=a([l(0,_.IBufferService),l(1,_.ILogService),l(2,_.IOptionsService)],d)},9074:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.DecorationService=void 0;let a=n(8055),l=n(8460),c=n(844),f=n(6106),m=0,_=0;class g extends c.Disposable{get decorations(){return this._decorations.values()}constructor(){super(),this._decorations=new f.SortedList((u=>u?.marker.line)),this._onDecorationRegistered=this.register(new l.EventEmitter),this.onDecorationRegistered=this._onDecorationRegistered.event,this._onDecorationRemoved=this.register(new l.EventEmitter),this.onDecorationRemoved=this._onDecorationRemoved.event,this.register((0,c.toDisposable)((()=>this.reset())))}registerDecoration(u){if(u.marker.isDisposed)return;let p=new h(u);if(p){let v=p.marker.onDispose((()=>p.dispose()));p.onDispose((()=>{p&&(this._decorations.delete(p)&&this._onDecorationRemoved.fire(p),v.dispose())})),this._decorations.insert(p),this._onDecorationRegistered.fire(p)}return p}reset(){for(let u of this._decorations.values())u.dispose();this._decorations.clear()}*getDecorationsAtCell(u,p,v){let x=0,S=0;for(let C of this._decorations.getKeyIterator(p))x=C.options.x??0,S=x+(C.options.width??1),u>=x&&u<S&&(!v||(C.options.layer??"bottom")===v)&&(yield C)}forEachDecorationAtCell(u,p,v,x){this._decorations.forEachByKey(p,(S=>{m=S.options.x??0,_=m+(S.options.width??1),u>=m&&u<_&&(!v||(S.options.layer??"bottom")===v)&&x(S)}))}}s.DecorationService=g;class h extends c.Disposable{get isDisposed(){return this._isDisposed}get backgroundColorRGB(){return this._cachedBg===null&&(this.options.backgroundColor?this._cachedBg=a.css.toColor(this.options.backgroundColor):this._cachedBg=void 0),this._cachedBg}get foregroundColorRGB(){return this._cachedFg===null&&(this.options.foregroundColor?this._cachedFg=a.css.toColor(this.options.foregroundColor):this._cachedFg=void 0),this._cachedFg}constructor(u){super(),this.options=u,this.onRenderEmitter=this.register(new l.EventEmitter),this.onRender=this.onRenderEmitter.event,this._onDispose=this.register(new l.EventEmitter),this.onDispose=this._onDispose.event,this._cachedBg=null,this._cachedFg=null,this.marker=u.marker,this.options.overviewRulerOptions&&!this.options.overviewRulerOptions.position&&(this.options.overviewRulerOptions.position="full")}dispose(){this._onDispose.fire(),super.dispose()}}},4348:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.InstantiationService=s.ServiceCollection=void 0;let a=n(2585),l=n(8343);class c{constructor(...m){this._entries=new Map;for(let[_,g]of m)this.set(_,g)}set(m,_){let g=this._entries.get(m);return this._entries.set(m,_),g}forEach(m){for(let[_,g]of this._entries.entries())m(_,g)}has(m){return this._entries.has(m)}get(m){return this._entries.get(m)}}s.ServiceCollection=c,s.InstantiationService=class{constructor(){this._services=new c,this._services.set(a.IInstantiationService,this)}setService(f,m){this._services.set(f,m)}getService(f){return this._services.get(f)}createInstance(f,...m){let _=(0,l.getServiceDependencies)(f).sort(((d,u)=>d.index-u.index)),g=[];for(let d of _){let u=this._services.get(d.id);if(!u)throw new Error(`[createInstance] ${f.name} depends on UNKNOWN service ${d.id}.`);g.push(u)}let h=_.length>0?_[0].index:m.length;if(m.length!==h)throw new Error(`[createInstance] First service dependency of ${f.name} at position ${h+1} conflicts with ${m.length} static arguments`);return new f(...m,...g)}}},7866:function(o,s,n){var a=this&&this.__decorate||function(h,d,u,p){var v,x=arguments.length,S=x<3?d:p===null?p=Object.getOwnPropertyDescriptor(d,u):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")S=Reflect.decorate(h,d,u,p);else for(var C=h.length-1;C>=0;C--)(v=h[C])&&(S=(x<3?v(S):x>3?v(d,u,S):v(d,u))||S);return x>3&&S&&Object.defineProperty(d,u,S),S},l=this&&this.__param||function(h,d){return function(u,p){d(u,p,h)}};Object.defineProperty(s,"__esModule",{value:!0}),s.traceCall=s.setTraceLogger=s.LogService=void 0;let c=n(844),f=n(2585),m={trace:f.LogLevelEnum.TRACE,debug:f.LogLevelEnum.DEBUG,info:f.LogLevelEnum.INFO,warn:f.LogLevelEnum.WARN,error:f.LogLevelEnum.ERROR,off:f.LogLevelEnum.OFF},_,g=s.LogService=class extends c.Disposable{get logLevel(){return this._logLevel}constructor(h){super(),this._optionsService=h,this._logLevel=f.LogLevelEnum.OFF,this._updateLogLevel(),this.register(this._optionsService.onSpecificOptionChange("logLevel",(()=>this._updateLogLevel()))),_=this}_updateLogLevel(){this._logLevel=m[this._optionsService.rawOptions.logLevel]}_evalLazyOptionalParams(h){for(let d=0;d<h.length;d++)typeof h[d]=="function"&&(h[d]=h[d]())}_log(h,d,u){this._evalLazyOptionalParams(u),h.call(console,(this._optionsService.options.logger?"":"xterm.js: ")+d,...u)}trace(h,...d){this._logLevel<=f.LogLevelEnum.TRACE&&this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger)??console.log,h,d)}debug(h,...d){this._logLevel<=f.LogLevelEnum.DEBUG&&this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger)??console.log,h,d)}info(h,...d){this._logLevel<=f.LogLevelEnum.INFO&&this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger)??console.info,h,d)}warn(h,...d){this._logLevel<=f.LogLevelEnum.WARN&&this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger)??console.warn,h,d)}error(h,...d){this._logLevel<=f.LogLevelEnum.ERROR&&this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger)??console.error,h,d)}};s.LogService=g=a([l(0,f.IOptionsService)],g),s.setTraceLogger=function(h){_=h},s.traceCall=function(h,d,u){if(typeof u.value!="function")throw new Error("not supported");let p=u.value;u.value=function(...v){if(_.logLevel!==f.LogLevelEnum.TRACE)return p.apply(this,v);_.trace(`GlyphRenderer#${p.name}(${v.map((S=>JSON.stringify(S))).join(", ")})`);let x=p.apply(this,v);return _.trace(`GlyphRenderer#${p.name} return`,x),x}}},7302:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.OptionsService=s.DEFAULT_OPTIONS=void 0;let a=n(8460),l=n(844),c=n(6114);s.DEFAULT_OPTIONS={cols:80,rows:24,cursorBlink:!1,cursorStyle:"block",cursorWidth:1,cursorInactiveStyle:"outline",customGlyphs:!0,drawBoldTextInBrightColors:!0,documentOverride:null,fastScrollModifier:"alt",fastScrollSensitivity:5,fontFamily:"courier-new, courier, monospace",fontSize:15,fontWeight:"normal",fontWeightBold:"bold",ignoreBracketedPasteMode:!1,lineHeight:1,letterSpacing:0,linkHandler:null,logLevel:"info",logger:null,scrollback:1e3,scrollOnUserInput:!0,scrollSensitivity:1,screenReaderMode:!1,smoothScrollDuration:0,macOptionIsMeta:!1,macOptionClickForcesSelection:!1,minimumContrastRatio:1,disableStdin:!1,allowProposedApi:!1,allowTransparency:!1,tabStopWidth:8,theme:{},rescaleOverlappingGlyphs:!1,rightClickSelectsWord:c.isMac,windowOptions:{},windowsMode:!1,windowsPty:{},wordSeparator:" ()[]{}',\"`",altClickMovesCursor:!0,convertEol:!1,termName:"xterm",cancelEvents:!1,overviewRulerWidth:0};let f=["normal","bold","100","200","300","400","500","600","700","800","900"];class m extends l.Disposable{constructor(g){super(),this._onOptionChange=this.register(new a.EventEmitter),this.onOptionChange=this._onOptionChange.event;let h={...s.DEFAULT_OPTIONS};for(let d in g)if(d in h)try{let u=g[d];h[d]=this._sanitizeAndValidateOption(d,u)}catch(u){console.error(u)}this.rawOptions=h,this.options={...h},this._setupOptions(),this.register((0,l.toDisposable)((()=>{this.rawOptions.linkHandler=null,this.rawOptions.documentOverride=null})))}onSpecificOptionChange(g,h){return this.onOptionChange((d=>{d===g&&h(this.rawOptions[g])}))}onMultipleOptionChange(g,h){return this.onOptionChange((d=>{g.indexOf(d)!==-1&&h()}))}_setupOptions(){let g=d=>{if(!(d in s.DEFAULT_OPTIONS))throw new Error(`No option with key "${d}"`);return this.rawOptions[d]},h=(d,u)=>{if(!(d in s.DEFAULT_OPTIONS))throw new Error(`No option with key "${d}"`);u=this._sanitizeAndValidateOption(d,u),this.rawOptions[d]!==u&&(this.rawOptions[d]=u,this._onOptionChange.fire(d))};for(let d in this.rawOptions){let u={get:g.bind(this,d),set:h.bind(this,d)};Object.defineProperty(this.options,d,u)}}_sanitizeAndValidateOption(g,h){switch(g){case"cursorStyle":if(h||(h=s.DEFAULT_OPTIONS[g]),!(function(d){return d==="block"||d==="underline"||d==="bar"})(h))throw new Error(`"${h}" is not a valid value for ${g}`);break;case"wordSeparator":h||(h=s.DEFAULT_OPTIONS[g]);break;case"fontWeight":case"fontWeightBold":if(typeof h=="number"&&1<=h&&h<=1e3)break;h=f.includes(h)?h:s.DEFAULT_OPTIONS[g];break;case"cursorWidth":h=Math.floor(h);case"lineHeight":case"tabStopWidth":if(h<1)throw new Error(`${g} cannot be less than 1, value: ${h}`);break;case"minimumContrastRatio":h=Math.max(1,Math.min(21,Math.round(10*h)/10));break;case"scrollback":if((h=Math.min(h,4294967295))<0)throw new Error(`${g} cannot be less than 0, value: ${h}`);break;case"fastScrollSensitivity":case"scrollSensitivity":if(h<=0)throw new Error(`${g} cannot be less than or equal to 0, value: ${h}`);break;case"rows":case"cols":if(!h&&h!==0)throw new Error(`${g} must be numeric, value: ${h}`);break;case"windowsPty":h=h??{}}return h}}s.OptionsService=m},2660:function(o,s,n){var a=this&&this.__decorate||function(m,_,g,h){var d,u=arguments.length,p=u<3?_:h===null?h=Object.getOwnPropertyDescriptor(_,g):h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")p=Reflect.decorate(m,_,g,h);else for(var v=m.length-1;v>=0;v--)(d=m[v])&&(p=(u<3?d(p):u>3?d(_,g,p):d(_,g))||p);return u>3&&p&&Object.defineProperty(_,g,p),p},l=this&&this.__param||function(m,_){return function(g,h){_(g,h,m)}};Object.defineProperty(s,"__esModule",{value:!0}),s.OscLinkService=void 0;let c=n(2585),f=s.OscLinkService=class{constructor(m){this._bufferService=m,this._nextId=1,this._entriesWithId=new Map,this._dataByLinkId=new Map}registerLink(m){let _=this._bufferService.buffer;if(m.id===void 0){let v=_.addMarker(_.ybase+_.y),x={data:m,id:this._nextId++,lines:[v]};return v.onDispose((()=>this._removeMarkerFromLink(x,v))),this._dataByLinkId.set(x.id,x),x.id}let g=m,h=this._getEntryIdKey(g),d=this._entriesWithId.get(h);if(d)return this.addLineToLink(d.id,_.ybase+_.y),d.id;let u=_.addMarker(_.ybase+_.y),p={id:this._nextId++,key:this._getEntryIdKey(g),data:g,lines:[u]};return u.onDispose((()=>this._removeMarkerFromLink(p,u))),this._entriesWithId.set(p.key,p),this._dataByLinkId.set(p.id,p),p.id}addLineToLink(m,_){let g=this._dataByLinkId.get(m);if(g&&g.lines.every((h=>h.line!==_))){let h=this._bufferService.buffer.addMarker(_);g.lines.push(h),h.onDispose((()=>this._removeMarkerFromLink(g,h)))}}getLinkData(m){return this._dataByLinkId.get(m)?.data}_getEntryIdKey(m){return`${m.id};;${m.uri}`}_removeMarkerFromLink(m,_){let g=m.lines.indexOf(_);g!==-1&&(m.lines.splice(g,1),m.lines.length===0&&(m.data.id!==void 0&&this._entriesWithId.delete(m.key),this._dataByLinkId.delete(m.id)))}};s.OscLinkService=f=a([l(0,c.IBufferService)],f)},8343:(o,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.createDecorator=s.getServiceDependencies=s.serviceRegistry=void 0;let n="di$target",a="di$dependencies";s.serviceRegistry=new Map,s.getServiceDependencies=function(l){return l[a]||[]},s.createDecorator=function(l){if(s.serviceRegistry.has(l))return s.serviceRegistry.get(l);let c=function(f,m,_){if(arguments.length!==3)throw new Error("@IServiceName-decorator can only be used to decorate a parameter");(function(g,h,d){h[n]===h?h[a].push({id:g,index:d}):(h[a]=[{id:g,index:d}],h[n]=h)})(c,f,_)};return c.toString=()=>l,s.serviceRegistry.set(l,c),c}},2585:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.IDecorationService=s.IUnicodeService=s.IOscLinkService=s.IOptionsService=s.ILogService=s.LogLevelEnum=s.IInstantiationService=s.ICharsetService=s.ICoreService=s.ICoreMouseService=s.IBufferService=void 0;let a=n(8343);var l;s.IBufferService=(0,a.createDecorator)("BufferService"),s.ICoreMouseService=(0,a.createDecorator)("CoreMouseService"),s.ICoreService=(0,a.createDecorator)("CoreService"),s.ICharsetService=(0,a.createDecorator)("CharsetService"),s.IInstantiationService=(0,a.createDecorator)("InstantiationService"),(function(c){c[c.TRACE=0]="TRACE",c[c.DEBUG=1]="DEBUG",c[c.INFO=2]="INFO",c[c.WARN=3]="WARN",c[c.ERROR=4]="ERROR",c[c.OFF=5]="OFF"})(l||(s.LogLevelEnum=l={})),s.ILogService=(0,a.createDecorator)("LogService"),s.IOptionsService=(0,a.createDecorator)("OptionsService"),s.IOscLinkService=(0,a.createDecorator)("OscLinkService"),s.IUnicodeService=(0,a.createDecorator)("UnicodeService"),s.IDecorationService=(0,a.createDecorator)("DecorationService")},1480:(o,s,n)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.UnicodeService=void 0;let a=n(8460),l=n(225);class c{static extractShouldJoin(m){return(1&m)!=0}static extractWidth(m){return m>>1&3}static extractCharKind(m){return m>>3}static createPropertyValue(m,_,g=!1){return(16777215&m)<<3|(3&_)<<1|(g?1:0)}constructor(){this._providers=Object.create(null),this._active="",this._onChange=new a.EventEmitter,this.onChange=this._onChange.event;let m=new l.UnicodeV6;this.register(m),this._active=m.version,this._activeProvider=m}dispose(){this._onChange.dispose()}get versions(){return Object.keys(this._providers)}get activeVersion(){return this._active}set activeVersion(m){if(!this._providers[m])throw new Error(`unknown Unicode version "${m}"`);this._active=m,this._activeProvider=this._providers[m],this._onChange.fire(m)}register(m){this._providers[m.version]=m}wcwidth(m){return this._activeProvider.wcwidth(m)}getStringCellWidth(m){let _=0,g=0,h=m.length;for(let d=0;d<h;++d){let u=m.charCodeAt(d);if(55296<=u&&u<=56319){if(++d>=h)return _+this.wcwidth(u);let x=m.charCodeAt(d);56320<=x&&x<=57343?u=1024*(u-55296)+x-56320+65536:_+=this.wcwidth(x)}let p=this.charProperties(u,g),v=c.extractWidth(p);c.extractShouldJoin(p)&&(v-=c.extractWidth(g)),_+=v,g=p}return _}charProperties(m,_){return this._activeProvider.charProperties(m,_)}}s.UnicodeService=c}},e={};function r(o){var s=e[o];if(s!==void 0)return s.exports;var n=e[o]={exports:{}};return t[o].call(n.exports,n,n.exports,r),n.exports}var i={};return(()=>{var o=i;Object.defineProperty(o,"__esModule",{value:!0}),o.Terminal=void 0;let s=r(9042),n=r(3236),a=r(844),l=r(5741),c=r(8285),f=r(7975),m=r(7090),_=["cols","rows"];class g extends a.Disposable{constructor(d){super(),this._core=this.register(new n.Terminal(d)),this._addonManager=this.register(new l.AddonManager),this._publicOptions={...this._core.options};let u=v=>this._core.options[v],p=(v,x)=>{this._checkReadonlyOptions(v),this._core.options[v]=x};for(let v in this._core.options){let x={get:u.bind(this,v),set:p.bind(this,v)};Object.defineProperty(this._publicOptions,v,x)}}_checkReadonlyOptions(d){if(_.includes(d))throw new Error(`Option "${d}" can only be set in the constructor`)}_checkProposedApi(){if(!this._core.optionsService.rawOptions.allowProposedApi)throw new Error("You must set the allowProposedApi option to true to use proposed API")}get onBell(){return this._core.onBell}get onBinary(){return this._core.onBinary}get onCursorMove(){return this._core.onCursorMove}get onData(){return this._core.onData}get onKey(){return this._core.onKey}get onLineFeed(){return this._core.onLineFeed}get onRender(){return this._core.onRender}get onResize(){return this._core.onResize}get onScroll(){return this._core.onScroll}get onSelectionChange(){return this._core.onSelectionChange}get onTitleChange(){return this._core.onTitleChange}get onWriteParsed(){return this._core.onWriteParsed}get element(){return this._core.element}get parser(){return this._parser||(this._parser=new f.ParserApi(this._core)),this._parser}get unicode(){return this._checkProposedApi(),new m.UnicodeApi(this._core)}get textarea(){return this._core.textarea}get rows(){return this._core.rows}get cols(){return this._core.cols}get buffer(){return this._buffer||(this._buffer=this.register(new c.BufferNamespaceApi(this._core))),this._buffer}get markers(){return this._checkProposedApi(),this._core.markers}get modes(){let d=this._core.coreService.decPrivateModes,u="none";switch(this._core.coreMouseService.activeProtocol){case"X10":u="x10";break;case"VT200":u="vt200";break;case"DRAG":u="drag";break;case"ANY":u="any"}return{applicationCursorKeysMode:d.applicationCursorKeys,applicationKeypadMode:d.applicationKeypad,bracketedPasteMode:d.bracketedPasteMode,insertMode:this._core.coreService.modes.insertMode,mouseTrackingMode:u,originMode:d.origin,reverseWraparoundMode:d.reverseWraparound,sendFocusMode:d.sendFocus,wraparoundMode:d.wraparound}}get options(){return this._publicOptions}set options(d){for(let u in d)this._publicOptions[u]=d[u]}blur(){this._core.blur()}focus(){this._core.focus()}input(d,u=!0){this._core.input(d,u)}resize(d,u){this._verifyIntegers(d,u),this._core.resize(d,u)}open(d){this._core.open(d)}attachCustomKeyEventHandler(d){this._core.attachCustomKeyEventHandler(d)}attachCustomWheelEventHandler(d){this._core.attachCustomWheelEventHandler(d)}registerLinkProvider(d){return this._core.registerLinkProvider(d)}registerCharacterJoiner(d){return this._checkProposedApi(),this._core.registerCharacterJoiner(d)}deregisterCharacterJoiner(d){this._checkProposedApi(),this._core.deregisterCharacterJoiner(d)}registerMarker(d=0){return this._verifyIntegers(d),this._core.registerMarker(d)}registerDecoration(d){return this._checkProposedApi(),this._verifyPositiveIntegers(d.x??0,d.width??0,d.height??0),this._core.registerDecoration(d)}hasSelection(){return this._core.hasSelection()}select(d,u,p){this._verifyIntegers(d,u,p),this._core.select(d,u,p)}getSelection(){return this._core.getSelection()}getSelectionPosition(){return this._core.getSelectionPosition()}clearSelection(){this._core.clearSelection()}selectAll(){this._core.selectAll()}selectLines(d,u){this._verifyIntegers(d,u),this._core.selectLines(d,u)}dispose(){super.dispose()}scrollLines(d){this._verifyIntegers(d),this._core.scrollLines(d)}scrollPages(d){this._verifyIntegers(d),this._core.scrollPages(d)}scrollToTop(){this._core.scrollToTop()}scrollToBottom(){this._core.scrollToBottom()}scrollToLine(d){this._verifyIntegers(d),this._core.scrollToLine(d)}clear(){this._core.clear()}write(d,u){this._core.write(d,u)}writeln(d,u){this._core.write(d),this._core.write(`\r
`,u)}paste(d){this._core.paste(d)}refresh(d,u){this._verifyIntegers(d,u),this._core.refresh(d,u)}reset(){this._core.reset()}clearTextureAtlas(){this._core.clearTextureAtlas()}loadAddon(d){this._addonManager.loadAddon(this,d)}static get strings(){return s}_verifyIntegers(...d){for(let u of d)if(u===1/0||isNaN(u)||u%1!=0)throw new Error("This API only accepts integers")}_verifyPositiveIntegers(...d){for(let u of d)if(u&&(u===1/0||isNaN(u)||u%1!=0||u<0))throw new Error("This API only accepts positive integers")}}o.Terminal=g})(),i})()))});var Ep=Object.defineProperty,Ap=(t,e,r)=>e in t?Ep(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Tn=(t,e,r)=>(Ap(t,typeof e!="symbol"?e+"":e,r),r),Tp=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},Mn=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},Ys=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},Ol=(t,e,r)=>(Tp(t,e,"access private method"),r);function Il(t,e){return Object.is(t,e)}var Ze=null,Qi=!1,Zs=1,Js=Symbol("SIGNAL");function _i(t){let e=Ze;return Ze=t,e}function Mp(){return Ze}function Rp(){return Qi}var Bn={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Qs(t){if(Qi)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(Ze===null)return;Ze.consumerOnSignalRead(t);let e=Ze.nextProducerIndex++;if(yi(Ze),e<Ze.producerNode.length&&Ze.producerNode[e]!==t&&Ln(Ze)){let r=Ze.producerNode[e];eo(r,Ze.producerIndexOfThis[e])}Ze.producerNode[e]!==t&&(Ze.producerNode[e]=t,Ze.producerIndexOfThis[e]=Ln(Ze)?Fl(t,Ze,e):0),Ze.producerLastReadVersion[e]=t.version}function Dp(){Zs++}function Pl(t){if(!(!t.dirty&&t.lastCleanEpoch===Zs)){if(!t.producerMustRecompute(t)&&!Op(t)){t.dirty=!1,t.lastCleanEpoch=Zs;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=Zs}}function Hl(t){if(t.liveConsumerNode===void 0)return;let e=Qi;Qi=!0;try{for(let r of t.liveConsumerNode)r.dirty||$p(r)}finally{Qi=e}}function Lp(){return Ze?.consumerAllowSignalWrites!==!1}function $p(t){var e;t.dirty=!0,Hl(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function Bp(t){return t&&(t.nextProducerIndex=0),_i(t)}function zp(t,e){if(_i(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(Ln(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)eo(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function Op(t){yi(t);for(let e=0;e<t.producerNode.length;e++){let r=t.producerNode[e],i=t.producerLastReadVersion[e];if(i!==r.version||(Pl(r),i!==r.version))return!0}return!1}function Fl(t,e,r){var i;if(zn(t),yi(t),t.liveConsumerNode.length===0){(i=t.watched)==null||i.call(t.wrapper);for(let o=0;o<t.producerNode.length;o++)t.producerIndexOfThis[o]=Fl(t.producerNode[o],t,o)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function eo(t,e){var r;if(zn(t),yi(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let o=0;o<t.producerNode.length;o++)eo(t.producerNode[o],t.producerIndexOfThis[o])}let i=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[i],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[i],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let o=t.liveConsumerIndexOfThis[e],s=t.liveConsumerNode[e];yi(s),s.producerIndexOfThis[o]=e}}function Ln(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function yi(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function zn(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function Nl(t){if(Pl(t),Qs(t),t.value===$n)throw t.error;return t.value}function Ip(t){let e=Object.create(Pp);e.computation=t;let r=()=>Nl(e);return r[Js]=e,r}var Rn=Symbol("UNSET"),Dn=Symbol("COMPUTING"),$n=Symbol("ERRORED"),Pp={...Bn,value:Rn,dirty:!0,error:null,equal:Il,producerMustRecompute(t){return t.value===Rn||t.value===Dn},producerRecomputeValue(t){if(t.value===Dn)throw new Error("Detected cycle in computations.");let e=t.value;t.value=Dn;let r=Bp(t),i,o=!1;try{i=t.computation.call(t.wrapper),o=e!==Rn&&e!==$n&&t.equal.call(t.wrapper,e,i)}catch(s){i=$n,t.error=s}finally{zp(t,r)}if(o){t.value=e;return}t.value=i,t.version++}};function Hp(){throw new Error}var Fp=Hp;function Np(){Fp()}function qp(t){let e=Object.create(Wp);e.value=t;let r=()=>(Qs(e),e.value);return r[Js]=e,r}function Vp(){return Qs(this),this.value}function Up(t,e){Lp()||Np(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,jp(t))}var Wp={...Bn,equal:Il,value:void 0};function jp(t){t.version++,Dp(),Hl(t)}var at=Symbol("node"),Qe;(t=>{var e,r,i,o,s,n;class a{constructor(f,m={}){Ys(this,r),Tn(this,e);let g=qp(f)[Js];if(this[at]=g,g.wrapper=this,m){let h=m.equals;h&&(g.equal=h),g.watched=m[t.subtle.watched],g.unwatched=m[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Vp.call(this[at])}set(f){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Rp())throw new Error("Writes to signals not permitted during Watcher callback");let m=this[at];Up(m,f)}}e=at,r=new WeakSet,i=function(){},t.isState=c=>typeof c=="object"&&Mn(r,c),t.State=a;class l{constructor(f,m){Ys(this,s),Tn(this,o);let g=Ip(f)[Js];if(g.consumerAllowSignalWrites=!0,this[at]=g,g.wrapper=this,m){let h=m.equals;h&&(g.equal=h),g.watched=m[t.subtle.watched],g.unwatched=m[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Nl(this[at])}}o=at,s=new WeakSet,n=function(){},t.isComputed=c=>typeof c=="object"&&Mn(s,c),t.Computed=l,(c=>{var f,m,_,g,h;function d(y){let k,D=null;try{D=_i(null),k=y()}finally{_i(D)}return k}c.untrack=d;function u(y){var k;if(!(0,t.isComputed)(y)&&!(0,t.isWatcher)(y))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((k=y[at].producerNode)==null?void 0:k.map(D=>D.wrapper))??[]}c.introspectSources=u;function p(y){var k;if(!(0,t.isComputed)(y)&&!(0,t.isState)(y))throw new TypeError("Called introspectSinks without a Signal argument");return((k=y[at].liveConsumerNode)==null?void 0:k.map(D=>D.wrapper))??[]}c.introspectSinks=p;function v(y){if(!(0,t.isComputed)(y)&&!(0,t.isState)(y))throw new TypeError("Called hasSinks without a Signal argument");let k=y[at].liveConsumerNode;return k?k.length>0:!1}c.hasSinks=v;function x(y){if(!(0,t.isComputed)(y)&&!(0,t.isWatcher)(y))throw new TypeError("Called hasSources without a Computed or Watcher argument");let k=y[at].producerNode;return k?k.length>0:!1}c.hasSources=x;class S{constructor(k){Ys(this,m),Ys(this,g),Tn(this,f);let D=Object.create(Bn);D.wrapper=this,D.consumerMarkedDirty=k,D.consumerIsAlwaysLive=!0,D.consumerAllowSignalWrites=!1,D.producerNode=[],this[at]=D}watch(...k){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Ol(this,g,h).call(this,k);let D=this[at];D.dirty=!1;let $=_i(D);for(let F of k)Qs(F[at]);_i($)}unwatch(...k){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Ol(this,g,h).call(this,k);let D=this[at];yi(D);for(let $=D.producerNode.length-1;$>=0;$--)if(k.includes(D.producerNode[$].wrapper)){eo(D.producerNode[$],D.producerIndexOfThis[$]);let F=D.producerNode.length-1;if(D.producerNode[$]=D.producerNode[F],D.producerIndexOfThis[$]=D.producerIndexOfThis[F],D.producerNode.length--,D.producerIndexOfThis.length--,D.nextProducerIndex--,$<D.producerNode.length){let L=D.producerIndexOfThis[$],V=D.producerNode[$];zn(V),V.liveConsumerIndexOfThis[L]=$}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[at].producerNode.filter(D=>D.dirty).map(D=>D.wrapper)}}f=at,m=new WeakSet,_=function(){},g=new WeakSet,h=function(y){for(let k of y)if(!(0,t.isComputed)(k)&&!(0,t.isState)(k))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=y=>Mn(m,y),c.Watcher=S;function C(){var y;return(y=Mp())==null?void 0:y.wrapper}c.currentComputed=C,c.watched=Symbol("watched"),c.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(Qe||(Qe={}));var Gp=Symbol("SignalWatcherBrand"),Kp=new FinalizationRegistry((({watcher:t,signal:e})=>{t.unwatch(e)})),ql=new WeakMap;function Gt(t){return t[Gp]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Qe.State(0),this._$Si=!1,this._$So=!0,this._$Sh=new Set}_$Sl(){if(this._$Su!==void 0)return;this._$Sv=new Qe.Computed((()=>{this._$St.get(),super.performUpdate()}));let e=this._$Su=new Qe.subtle.Watcher((function(){let r=ql.get(this);r!==void 0&&(r._$Si===!1&&r.requestUpdate(),this.watch())}));ql.set(e,this),Kp.register(this,{watcher:e,signal:this._$Sv}),e.watch(this._$Sv)}_$Sp(){this._$Su!==void 0&&(this._$Su.unwatch(this._$Sv),this._$Sv=void 0,this._$Su=void 0)}performUpdate(){this.isUpdatePending&&(this._$Sl(),this._$Si=!0,this._$St.set(this._$St.get()+1),this._$Si=!1,this._$Sv.get())}update(e){try{this._$So?(this._$So=!1,super.update(e)):this._$Sh.forEach((r=>r.commit()))}finally{this.isUpdatePending=!1,this._$Sh.clear()}}requestUpdate(e,r,i){this._$So=!0,super.requestUpdate(e,r,i)}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask((()=>{this.isConnected===!1&&this._$Sp()}))}_(e){this._$Sh.add(e);let r=this._$So;this.requestUpdate(),this._$So=r}m(e){this._$Sh.delete(e)}}}var ft={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Tt=t=>(...e)=>({_$litDirective$:t,values:e}),zt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,i){this._$Ct=e,this._$AM=r,this._$Ci=i}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var ts=globalThis,to=ts.trustedTypes,Vl=to?to.createPolicy("lit-html",{createHTML:t=>t}):void 0,In="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,Pn="?"+pr,Xp=`<${Pn}>`,ei=document,rs=()=>ei.createComment(""),is=t=>t===null||typeof t!="object"&&typeof t!="function",Hn=Array.isArray,Xl=t=>Hn(t)||typeof t?.[Symbol.iterator]=="function",On=`[ 	
\f\r]`,es=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ul=/-->/g,Wl=/>/g,Jr=RegExp(`>|${On}(?:([^\\s"'>=/]+)(${On}*=${On}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),jl=/'/g,Gl=/"/g,Yl=/^(?:script|style|textarea|title)$/i,Fn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),W=Fn(1),ao=Fn(2),Zl=Fn(3),st=Symbol.for("lit-noChange"),ke=Symbol.for("lit-nothing"),Kl=new WeakMap,Qr=ei.createTreeWalker(ei,129);function Jl(t,e){if(!Hn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vl!==void 0?Vl.createHTML(e):e}var Ql=(t,e)=>{let r=t.length-1,i=[],o,s=e===2?"<svg>":e===3?"<math>":"",n=es;for(let a=0;a<r;a++){let l=t[a],c,f,m=-1,_=0;for(;_<l.length&&(n.lastIndex=_,f=n.exec(l),f!==null);)_=n.lastIndex,n===es?f[1]==="!--"?n=Ul:f[1]!==void 0?n=Wl:f[2]!==void 0?(Yl.test(f[2])&&(o=RegExp("</"+f[2],"g")),n=Jr):f[3]!==void 0&&(n=Jr):n===Jr?f[0]===">"?(n=o??es,m=-1):f[1]===void 0?m=-2:(m=n.lastIndex-f[2].length,c=f[1],n=f[3]===void 0?Jr:f[3]==='"'?Gl:jl):n===Gl||n===jl?n=Jr:n===Ul||n===Wl?n=es:(n=Jr,o=void 0);let g=n===Jr&&t[a+1].startsWith("/>")?" ":"";s+=n===es?l+Xp:m>=0?(i.push(c),l.slice(0,m)+In+l.slice(m)+pr+g):l+pr+(m===-2?a:g)}return[Jl(t,s+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ss=class t{constructor({strings:e,_$litType$:r},i){let o;this.parts=[];let s=0,n=0,a=e.length-1,l=this.parts,[c,f]=Ql(e,r);if(this.el=t.createElement(c,i),Qr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=Qr.nextNode())!==null&&l.length<a;){if(o.nodeType===1){if(o.hasAttributes())for(let m of o.getAttributeNames())if(m.endsWith(In)){let _=f[n++],g=o.getAttribute(m).split(pr),h=/([.?@])?(.*)/.exec(_);l.push({type:1,index:s,name:h[2],strings:g,ctor:h[1]==="."?io:h[1]==="?"?so:h[1]==="@"?oo:ri}),o.removeAttribute(m)}else m.startsWith(pr)&&(l.push({type:6,index:s}),o.removeAttribute(m));if(Yl.test(o.tagName)){let m=o.textContent.split(pr),_=m.length-1;if(_>0){o.textContent=to?to.emptyScript:"";for(let g=0;g<_;g++)o.append(m[g],rs()),Qr.nextNode(),l.push({type:2,index:++s});o.append(m[_],rs())}}}else if(o.nodeType===8)if(o.data===Pn)l.push({type:2,index:s});else{let m=-1;for(;(m=o.data.indexOf(pr,m+1))!==-1;)l.push({type:7,index:s}),m+=pr.length-1}s++}}static createElement(e,r){let i=ei.createElement("template");return i.innerHTML=e,i}};function ti(t,e,r=t,i){if(e===st)return e;let o=i!==void 0?r._$Co?.[i]:r._$Cl,s=is(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(t),o._$AT(t,r,i)),i!==void 0?(r._$Co??(r._$Co=[]))[i]=o:r._$Cl=o),o!==void 0&&(e=ti(t,o._$AS(t,e.values),o,i)),e}var ro=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:i}=this._$AD,o=(e?.creationScope??ei).importNode(r,!0);Qr.currentNode=o;let s=Qr.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new wi(s,s.nextSibling,this,e):l.type===1?c=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(c=new no(s,this,e)),this._$AV.push(c),l=i[++a]}n!==l?.index&&(s=Qr.nextNode(),n++)}return Qr.currentNode=ei,o}p(e){let r=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}},wi=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,i,o){this.type=2,this._$AH=ke,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=ti(this,e,r),is(e)?e===ke||e==null||e===""?(this._$AH!==ke&&this._$AR(),this._$AH=ke):e!==this._$AH&&e!==st&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Xl(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ke&&is(this._$AH)?this._$AA.nextSibling.data=e:this.T(ei.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ss.createElement(Jl(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(r);else{let s=new ro(o,this),n=s.u(this.options);s.p(r),this.T(n),this._$AH=s}}_$AC(e){let r=Kl.get(e.strings);return r===void 0&&Kl.set(e.strings,r=new ss(e)),r}k(e){Hn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,i,o=0;for(let s of e)o===r.length?r.push(i=new t(this.O(rs()),this.O(rs()),this,this.options)):i=r[o],i._$AI(s),o++;o<r.length&&(this._$AR(i&&i._$AB.nextSibling,o),r.length=o)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ri=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,o,s){this.type=1,this._$AH=ke,this._$AN=void 0,this.element=e,this.name=r,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ke}_$AI(e,r=this,i,o){let s=this.strings,n=!1;if(s===void 0)e=ti(this,e,r,0),n=!is(e)||e!==this._$AH&&e!==st,n&&(this._$AH=e);else{let a=e,l,c;for(e=s[0],l=0;l<s.length-1;l++)c=ti(this,a[i+l],r,l),c===st&&(c=this._$AH[l]),n||(n=!is(c)||c!==this._$AH[l]),c===ke?e=ke:e!==ke&&(e+=(c??"")+s[l+1]),this._$AH[l]=c}n&&!o&&this.j(e)}j(e){e===ke?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},io=class extends ri{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ke?void 0:e}},so=class extends ri{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ke)}},oo=class extends ri{constructor(e,r,i,o,s){super(e,r,i,o,s),this.type=5}_$AI(e,r=this){if((e=ti(this,e,r,0)??ke)===st)return;let i=this._$AH,o=e===ke&&i!==ke||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==ke&&(i===ke||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},no=class{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ti(this,e)}},e0={M:In,P:pr,A:Pn,C:1,L:Ql,R:ro,D:Xl,V:ti,I:wi,H:ri,N:so,U:oo,B:io,F:no},Yp=ts.litHtmlPolyfillSupport;Yp?.(ss,wi),(ts.litHtmlVersions??(ts.litHtmlVersions=[])).push("3.3.1");var t0=(t,e,r)=>{let i=r?.renderBefore??e,o=i._$litPart$;if(o===void 0){let s=r?.renderBefore??null;i._$litPart$=o=new wi(e.insertBefore(rs(),s),s,void 0,r??{})}return o._$AI(t),o};var{I:v2}=e0;var r0=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var lo=t=>t.strings===void 0;var Zp={},i0=(t,e=Zp)=>t._$AH=e;var os=(t,e)=>{let r=t._$AN;if(r===void 0)return!1;for(let i of r)i._$AO?.(e,!1),os(i,e);return!0},co=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},s0=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),ef(e)}};function Jp(t){this._$AN!==void 0?(co(this),this._$AM=t,s0(this)):this._$AM=t}function Qp(t,e=!1,r=0){let i=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(i))for(let s=r;s<i.length;s++)os(i[s],!1),co(i[s]);else i!=null&&(os(i,!1),co(i));else os(this,t)}var ef=t=>{t.type==ft.CHILD&&(t._$AP??(t._$AP=Qp),t._$AQ??(t._$AQ=Jp))},xi=class extends zt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,i){super._$AT(e,r,i),s0(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&(os(this,e),co(this))}setValue(e){if(lo(this._$Ct))this._$Ct._$AI(e,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};var ho=class extends xi{_$Sl(){if(this._$Su!==void 0)return;this._$SW=new Qe.Computed((()=>{var r;return(r=this._$Sj)===null||r===void 0?void 0:r.get()}));let e=this._$Su=new Qe.subtle.Watcher((()=>{var r;(r=this._$SO)===null||r===void 0||r._(this),e.watch()}));e.watch(this._$SW)}_$Sp(){var e;this._$Su!==void 0&&(this._$Su.unwatch(this._$SW),this._$SW=void 0,this._$Su=void 0,(e=this._$SO)===null||e===void 0||e.m(this))}commit(){this.setValue(Qe.subtle.untrack((()=>{var e;return(e=this._$SW)===null||e===void 0?void 0:e.get()})))}render(e){return Qe.subtle.untrack((()=>e.get()))}update(e,[r]){var i,o;return(i=this._$SO)!==null&&i!==void 0||(this._$SO=(o=e.options)===null||o===void 0?void 0:o.host),r!==this._$Sj&&this._$Sj!==void 0&&this._$Sp(),this._$Sj=r,this._$Sl(),Qe.subtle.untrack((()=>this._$SW.get()))}disconnected(){this._$Sp()}reconnected(){this._$Sl()}},Nn=Tt(ho);var qn=t=>(e,...r)=>t(e,...r.map((i=>i instanceof Qe.State||i instanceof Qe.Computed?Nn(i):i))),tf=qn(W),rf=qn(ao);var O2=Qe.State,I2=Qe.Computed,o0=(t,e)=>new Qe.State(t,e);var Vn=o0(new Date);function n0(t=1e3){setInterval(()=>Vn.set(new Date),t)}var Un="";function ns(t){Un=t}function Wn(t=""){if(!Un){let e=[...document.getElementsByTagName("script")],r=e.find(i=>i.hasAttribute("data-shoelace"));if(r)ns(r.getAttribute("data-shoelace"));else{let i=e.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),o="";i&&(o=i.getAttribute("src")),ns(o.split("/").slice(0,-1).join("/"))}}return Un.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var c0=Object.defineProperty,sf=Object.defineProperties,of=Object.getOwnPropertyDescriptor,nf=Object.getOwnPropertyDescriptors,a0=Object.getOwnPropertySymbols,af=Object.prototype.hasOwnProperty,lf=Object.prototype.propertyIsEnumerable,jn=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Gn=t=>{throw TypeError(t)},l0=(t,e,r)=>e in t?c0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Mt=(t,e)=>{for(var r in e||(e={}))af.call(e,r)&&l0(t,r,e[r]);if(a0)for(var r of a0(e))lf.call(e,r)&&l0(t,r,e[r]);return t},Or=(t,e)=>sf(t,nf(e)),T=(t,e,r,i)=>{for(var o=i>1?void 0:i?of(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(o=(i?n(e,r,o):n(o))||o);return i&&o&&c0(e,r,o),o},h0=(t,e,r)=>e.has(t)||Gn("Cannot "+r),u0=(t,e,r)=>(h0(t,e,"read from private field"),r?r.call(t):e.get(t)),d0=(t,e,r)=>e.has(t)?Gn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),p0=(t,e,r,i)=>(h0(t,e,"write to private field"),i?i.call(t,r):e.set(t,r),r),cf=function(t,e){this[0]=t,this[1]=e},f0=t=>{var e=t[jn("asyncIterator")],r=!1,i,o={};return e==null?(e=t[jn("iterator")](),i=s=>o[s]=n=>e[s](n)):(e=e.call(t),i=s=>o[s]=n=>{if(r){if(r=!1,s==="throw")throw n;return n}return r=!0,{done:!1,value:new cf(new Promise(a=>{var l=e[s](n);l instanceof Object||Gn("Object expected"),a(l)}),1)}}),o[jn("iterator")]=()=>o,i("next"),"throw"in e?i("throw"):o.throw=s=>{throw s},"return"in e&&i("return"),o};var uo=globalThis,po=uo.ShadowRoot&&(uo.ShadyCSS===void 0||uo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kn=Symbol(),m0=new WeakMap,as=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==Kn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(po&&e===void 0){let i=r!==void 0&&r.length===1;i&&(e=m0.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&m0.set(r,e))}return e}toString(){return this.cssText}},fo=t=>new as(typeof t=="string"?t:t+"",void 0,Kn),ue=(t,...e)=>{let r=t.length===1?t[0]:e.reduce(((i,o,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1]),t[0]);return new as(r,t,Kn)},g0=(t,e)=>{if(po)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let i=document.createElement("style"),o=uo.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=r.cssText,t.appendChild(i)}},Xn=po?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let i of e.cssRules)r+=i.cssText;return fo(r)})(t):t;var{is:hf,defineProperty:uf,getOwnPropertyDescriptor:df,getOwnPropertyNames:pf,getOwnPropertySymbols:ff,getPrototypeOf:mf}=Object,Ir=globalThis,v0=Ir.trustedTypes,gf=v0?v0.emptyScript:"",vf=Ir.reactiveElementPolyfillSupport,ls=(t,e)=>t,Pr={toAttribute(t,e){switch(e){case Boolean:t=t?gf:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},mo=(t,e)=>!hf(t,e),b0={attribute:!0,type:String,converter:Pr,reflect:!1,useDefault:!1,hasChanged:mo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ir.litPropertyMetadata??(Ir.litPropertyMetadata=new WeakMap);var fr=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=b0){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(e,i,r);o!==void 0&&uf(this.prototype,e,o)}}static getPropertyDescriptor(e,r,i){let{get:o,set:s}=df(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:o,set(n){let a=o?.call(this);s?.call(this,n),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b0}static _$Ei(){if(this.hasOwnProperty(ls("elementProperties")))return;let e=mf(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ls("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ls("properties"))){let r=this.properties,i=[...pf(r),...ff(r)];for(let o of i)this.createProperty(o,r[o])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[i,o]of r)this.elementProperties.set(i,o)}this._$Eh=new Map;for(let[r,i]of this.elementProperties){let o=this._$Eu(r,i);o!==void 0&&this._$Eh.set(o,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let o of i)r.unshift(Xn(o))}else e!==void 0&&r.push(Xn(e));return r}static _$Eu(e,r){let i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return g0(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){let i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:Pr).toAttribute(r,i.type);this._$Em=e,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,r){let i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let s=i.getPropertyOptions(o),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Pr;this._$Em=o;let a=n.fromAttribute(r,s.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,r,i){if(e!==void 0){let o=this.constructor,s=this[e];if(i??(i=o.getPropertyOptions(e)),!((i.hasChanged??mo)(s,r)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??r??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[o,s]of i){let{wrapped:n}=s,a=this[o];n!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,s,a)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(r)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach((r=>this._$ET(r,this[r])))),this._$EM()}updated(e){}firstUpdated(e){}};fr.elementStyles=[],fr.shadowRootOptions={mode:"open"},fr[ls("elementProperties")]=new Map,fr[ls("finalized")]=new Map,vf?.({ReactiveElement:fr}),(Ir.reactiveElementVersions??(Ir.reactiveElementVersions=[])).push("2.1.1");var cs=globalThis,Ke=class extends fr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;let e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=t0(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return st}};Ke._$litElement$=!0,Ke.finalized=!0,cs.litElementHydrateSupport?.({LitElement:Ke});var bf=cs.litElementPolyfillSupport;bf?.({LitElement:Ke});(cs.litElementVersions??(cs.litElementVersions=[])).push("4.2.1");var _0=ue`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;var Yn=new Set,Si=new Map,ii,Zn="ltr",Jn="en",y0=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(y0){let t=new MutationObserver(w0);Zn=document.documentElement.dir||"ltr",Jn=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function hs(...t){t.map(e=>{let r=e.$code.toLowerCase();Si.has(r)?Si.set(r,Object.assign(Object.assign({},Si.get(r)),e)):Si.set(r,e),ii||(ii=e)}),w0()}function w0(){y0&&(Zn=document.documentElement.dir||"ltr",Jn=document.documentElement.lang||navigator.language),[...Yn.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var go=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Yn.add(this.host)}hostDisconnected(){Yn.delete(this.host)}dir(){return`${this.host.dir||Zn}`.toLowerCase()}lang(){return`${this.host.lang||Jn}`.toLowerCase()}getTranslationData(e){var r,i;let o=new Intl.Locale(e.replace(/_/g,"-")),s=o?.language.toLowerCase(),n=(i=(r=o?.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&i!==void 0?i:"",a=Si.get(`${s}-${n}`),l=Si.get(s);return{locale:o,language:s,region:n,primary:a,secondary:l}}exists(e,r){var i;let{primary:o,secondary:s}=this.getTranslationData((i=r.lang)!==null&&i!==void 0?i:this.lang());return r=Object.assign({includeFallback:!1},r),!!(o&&o[e]||s&&s[e]||r.includeFallback&&ii&&ii[e])}term(e,...r){let{primary:i,secondary:o}=this.getTranslationData(this.lang()),s;if(i&&i[e])s=i[e];else if(o&&o[e])s=o[e];else if(ii&&ii[e])s=ii[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...r):s}date(e,r){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),r).format(e)}number(e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),r).format(e)}relativeTime(e,r,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,r)}};var x0={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};hs(x0);var S0=x0;var Ne=class extends go{};hs(S0);var _f={name:"default",resolver:t=>Wn(`assets/icons/${t}.svg`)},k0=_f;var C0={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},yf={name:"system",resolver:t=>t in C0?`data:image/svg+xml,${encodeURIComponent(C0[t])}`:""},E0=yf;var wf=[k0,E0],Qn=[];function A0(t){Qn.push(t)}function T0(t){Qn=Qn.filter(e=>e!==t)}function ea(t){return wf.find(e=>e.name===t)}var M0=ue`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function be(t,e){let r=Mt({waitUntilFirstUpdate:!1},e);return(i,o)=>{let{update:s}=i,n=Array.isArray(t)?t:[t];i.update=function(a){n.forEach(l=>{let c=l;if(a.has(c)){let f=a.get(c),m=this[c];f!==m&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[o](f,m)}}),s.call(this,a)}}}var ye=ue`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;var Ot=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var xf={attribute:!0,type:String,converter:Pr,reflect:!1,hasChanged:mo},Sf=(t=xf,e,r)=>{let{kind:i,metadata:o}=r,s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),i==="accessor"){let{name:n}=r;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(i==="setter"){let{name:n}=r;return function(a){let l=this[n];e.call(this,a),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+i)};function z(t){return(e,r)=>typeof r=="object"?Sf(t,e,r):((i,o,s)=>{let n=o.hasOwnProperty(s);return o.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(o,s):void 0})(t,e,r)}function he(t){return z({...t,state:!0,attribute:!1})}function ki(t){return(e,r)=>{let i=typeof e=="function"?e:e[r];Object.assign(i,t)}}var si=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function pe(t,e){return(r,i,o)=>{let s=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:a}=typeof i=="object"?r:o??(()=>{let l=Symbol();return{get(){return this[l]},set(c){this[l]=c}}})();return si(r,i,{get(){let l=n.call(this);return l===void 0&&(l=s(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return si(r,i,{get(){return s(this)}})}}var vo,fe=class extends Ke{constructor(){super(),d0(this,vo,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){let r=new CustomEvent(t,Mt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(r),r}static define(t,e=this,r={}){let i=customElements.get(t);if(!i){try{customElements.define(t,e,r)}catch{customElements.define(t,class extends e{},r)}return}let o=" (unknown version)",s=o;"version"in e&&e.version&&(o=" v"+e.version),"version"in i&&i.version&&(s=" v"+i.version),!(o&&s&&o===s)&&console.warn(`Attempted to register <${t}>${o}, but <${t}>${s} has already been registered.`)}attributeChangedCallback(t,e,r){u0(this,vo)||(this.constructor.elementProperties.forEach((i,o)=>{i.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o])}),p0(this,vo,!0)),super.attributeChangedCallback(t,e,r)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,r)=>{t.has(r)&&this[r]==null&&(this[r]=e)})}};vo=new WeakMap;fe.version="2.20.1";fe.dependencies={};T([z()],fe.prototype,"dir",2);T([z()],fe.prototype,"lang",2);var us=Symbol(),bo=Symbol(),ta,ra=new Map,$e=class extends fe{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var r;let i;if(e?.spriteSheet)return this.svg=W`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return i.status===410?us:bo}catch{return bo}try{let o=document.createElement("div");o.innerHTML=await i.text();let s=o.firstElementChild;if(((r=s?.tagName)==null?void 0:r.toLowerCase())!=="svg")return us;ta||(ta=new DOMParser);let a=ta.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):us}catch{return us}}connectedCallback(){super.connectedCallback(),A0(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),T0(this)}getIconSource(){let t=ea(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;let{url:e,fromLibrary:r}=this.getIconSource(),i=r?ea(this.library):void 0;if(!e){this.svg=null;return}let o=ra.get(e);if(o||(o=this.resolveIcon(e,i),ra.set(e,o)),!this.initialRender)return;let s=await o;if(s===bo&&ra.delete(e),e===this.getIconSource().url){if(r0(s)){if(this.svg=s,i){await this.updateComplete;let n=this.shadowRoot.querySelector("[part='svg']");typeof i.mutator=="function"&&n&&i.mutator(n)}return}switch(s){case bo:case us:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(!0),(t=i?.mutator)==null||t.call(i,this.svg),this.emit("sl-load")}}}render(){return this.svg}};$e.styles=[ye,M0];T([he()],$e.prototype,"svg",2);T([z({reflect:!0})],$e.prototype,"name",2);T([z()],$e.prototype,"src",2);T([z()],$e.prototype,"label",2);T([z({reflect:!0})],$e.prototype,"library",2);T([be("label")],$e.prototype,"handleLabelChange",1);T([be(["name","src","library"])],$e.prototype,"setIcon",1);var oi=class extends fe{constructor(){super(...arguments),this.localize=new Ne(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){let e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(r=>r.removeAttribute("id")),e.setAttribute("data-default",""),e.slot="separator",e}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()==="sl-breadcrumb-item");t.forEach((e,r)=>{let i=e.querySelector('[slot="separator"]');i===null?e.append(this.getSeparator()):i.hasAttribute("data-default")&&i.replaceWith(this.getSeparator()),r===t.length-1?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),W`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <sl-icon name=${this.localize.dir()==="rtl"?"chevron-left":"chevron-right"} library="system"></sl-icon>
        </slot>
      </span>
    `}};oi.styles=[ye,_0];oi.dependencies={"sl-icon":$e};T([pe("slot")],oi.prototype,"defaultSlot",2);T([pe('slot[name="separator"]')],oi.prototype,"separatorSlot",2);T([z()],oi.prototype,"label",2);oi.define("sl-breadcrumb");var R0=ue`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`;var Xe=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=r=>{let i=r.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};var _e=Tt(class extends zt{constructor(t){if(super(t),t.type!==ft.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((i=>i!==""))));for(let i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let r=t.element.classList;for(let i of this.st)i in e||(r.remove(i),this.st.delete(i));for(let i in e){let o=!!e[i];o===this.st.has(i)||this.nt?.has(i)||(o?(r.add(i),this.st.add(i)):(r.remove(i),this.st.delete(i)))}return st}});var ee=t=>t??ke;var mr=class extends fe{constructor(){super(...arguments),this.hasSlotController=new Xe(this,"prefix","suffix"),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){let t=this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.tagName.toLowerCase()==="sl-dropdown").length>0;if(this.href){this.renderType="link";return}if(t){this.renderType="dropdown";return}this.renderType="button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return W`
      <div
        part="base"
        class=${_e({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${this.renderType==="link"?W`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${ee(this.target?this.target:void 0)}"
                rel=${ee(this.target?this.rel:void 0)}
              >
                <slot @slotchange=${this.handleSlotChange}></slot>
              </a>
            `:""}
        ${this.renderType==="button"?W`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            `:""}
        ${this.renderType==="dropdown"?W`
              <div part="label" class="breadcrumb-item__label breadcrumb-item__label--drop-down">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            `:""}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};mr.styles=[ye,R0];T([pe("slot:not([name])")],mr.prototype,"defaultSlot",2);T([he()],mr.prototype,"renderType",2);T([z()],mr.prototype,"href",2);T([z()],mr.prototype,"target",2);T([z()],mr.prototype,"rel",2);T([be("href",{waitUntilFirstUpdate:!0})],mr.prototype,"hrefChanged",1);mr.define("sl-breadcrumb-item");var _o=class extends Gt(Ke){render(){return W`<p>Chart</p>`}};_o=ut([Ot("tbx-chart")],_o);var $0=Cp(L0());var wo=class extends Gt(Ke){render(){return W`<slot></slot>`}firstUpdated(){this.term=new $0.Terminal({cursorBlink:!1,cursorStyle:"bar",cursorInactiveStyle:"none",theme:{}}),this.term.open(this),this.term.blur(),this.term.write("Hello from \x1B[1;3;31mToolboxUI\x1B[0m! \x1B[?25l")}};wo=ut([Ot("tbx-console")],wo);var B0=()=>new oa,oa=class{},sa=new WeakMap,z0=Tt(class extends xi{render(t){return ke}update(t,[e]){let r=e!==this.G;return r&&this.G!==void 0&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),ke}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let e=this.ht??globalThis,r=sa.get(e);r===void 0&&(r=new WeakMap,sa.set(e,r)),r.get(this.G)!==void 0&&this.G.call(this.ht,void 0),r.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?sa.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var kf=typeof global=="object"&&global&&global.Object===Object&&global,O0=kf;var Cf=typeof self=="object"&&self&&self.Object===Object&&self,Ef=O0||Cf||Function("return this")(),Ci=Ef;var Af=Ci.Symbol,gr=Af;var I0=Object.prototype,Tf=I0.hasOwnProperty,Mf=I0.toString,ds=gr?gr.toStringTag:void 0;function Rf(t){var e=Tf.call(t,ds),r=t[ds];try{t[ds]=void 0;var i=!0}catch{}var o=Mf.call(t);return i&&(e?t[ds]=r:delete t[ds]),o}var P0=Rf;var Df=Object.prototype,Lf=Df.toString;function $f(t){return Lf.call(t)}var H0=$f;var Bf="[object Null]",zf="[object Undefined]",F0=gr?gr.toStringTag:void 0;function Of(t){return t==null?t===void 0?zf:Bf:F0&&F0 in Object(t)?P0(t):H0(t)}var xo=Of;function If(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var ni=If;var Pf="[object AsyncFunction]",Hf="[object Function]",Ff="[object GeneratorFunction]",Nf="[object Proxy]";function qf(t){if(!ni(t))return!1;var e=xo(t);return e==Hf||e==Ff||e==Pf||e==Nf}var N0=qf;var Vf=Ci["__core-js_shared__"],So=Vf;var q0=(function(){var t=/[^.]+$/.exec(So&&So.keys&&So.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""})();function Uf(t){return!!q0&&q0 in t}var V0=Uf;var Wf=Function.prototype,jf=Wf.toString;function Gf(t){if(t!=null){try{return jf.call(t)}catch{}try{return t+""}catch{}}return""}var U0=Gf;var Kf=/[\\^$.*+?()[\]{}|]/g,Xf=/^\[object .+?Constructor\]$/,Yf=Function.prototype,Zf=Object.prototype,Jf=Yf.toString,Qf=Zf.hasOwnProperty,em=RegExp("^"+Jf.call(Qf).replace(Kf,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function tm(t){if(!ni(t)||V0(t))return!1;var e=N0(t)?em:Xf;return e.test(U0(t))}var W0=tm;function rm(t,e){return t?.[e]}var j0=rm;function im(t,e){var r=j0(t,e);return W0(r)?r:void 0}var Ei=im;var sm=(function(){try{var t=Ei(Object,"defineProperty");return t({},"",{}),t}catch{}})(),na=sm;function om(t,e,r){e=="__proto__"&&na?na(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var G0=om;function nm(t,e){return t===e||t!==t&&e!==e}var ko=nm;var am=Object.prototype,lm=am.hasOwnProperty;function cm(t,e,r){var i=t[e];(!(lm.call(t,e)&&ko(i,r))||r===void 0&&!(e in t))&&G0(t,e,r)}var K0=cm;var hm=Array.isArray,Ai=hm;function um(t){return t!=null&&typeof t=="object"}var X0=um;var dm="[object Symbol]";function pm(t){return typeof t=="symbol"||X0(t)&&xo(t)==dm}var Ti=pm;var fm=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,mm=/^\w*$/;function gm(t,e){if(Ai(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||Ti(t)?!0:mm.test(t)||!fm.test(t)||e!=null&&t in Object(e)}var Y0=gm;var vm=Ei(Object,"create"),vr=vm;function bm(){this.__data__=vr?vr(null):{},this.size=0}var Z0=bm;function _m(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var J0=_m;var ym="__lodash_hash_undefined__",wm=Object.prototype,xm=wm.hasOwnProperty;function Sm(t){var e=this.__data__;if(vr){var r=e[t];return r===ym?void 0:r}return xm.call(e,t)?e[t]:void 0}var Q0=Sm;var km=Object.prototype,Cm=km.hasOwnProperty;function Em(t){var e=this.__data__;return vr?e[t]!==void 0:Cm.call(e,t)}var ec=Em;var Am="__lodash_hash_undefined__";function Tm(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=vr&&e===void 0?Am:e,this}var tc=Tm;function Mi(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var i=t[e];this.set(i[0],i[1])}}Mi.prototype.clear=Z0;Mi.prototype.delete=J0;Mi.prototype.get=Q0;Mi.prototype.has=ec;Mi.prototype.set=tc;var aa=Mi;function Mm(){this.__data__=[],this.size=0}var rc=Mm;function Rm(t,e){for(var r=t.length;r--;)if(ko(t[r][0],e))return r;return-1}var Hr=Rm;var Dm=Array.prototype,Lm=Dm.splice;function $m(t){var e=this.__data__,r=Hr(e,t);if(r<0)return!1;var i=e.length-1;return r==i?e.pop():Lm.call(e,r,1),--this.size,!0}var ic=$m;function Bm(t){var e=this.__data__,r=Hr(e,t);return r<0?void 0:e[r][1]}var sc=Bm;function zm(t){return Hr(this.__data__,t)>-1}var oc=zm;function Om(t,e){var r=this.__data__,i=Hr(r,t);return i<0?(++this.size,r.push([t,e])):r[i][1]=e,this}var nc=Om;function Ri(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var i=t[e];this.set(i[0],i[1])}}Ri.prototype.clear=rc;Ri.prototype.delete=ic;Ri.prototype.get=sc;Ri.prototype.has=oc;Ri.prototype.set=nc;var ac=Ri;var Im=Ei(Ci,"Map"),lc=Im;function Pm(){this.size=0,this.__data__={hash:new aa,map:new(lc||ac),string:new aa}}var cc=Pm;function Hm(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var hc=Hm;function Fm(t,e){var r=t.__data__;return hc(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Fr=Fm;function Nm(t){var e=Fr(this,t).delete(t);return this.size-=e?1:0,e}var uc=Nm;function qm(t){return Fr(this,t).get(t)}var dc=qm;function Vm(t){return Fr(this,t).has(t)}var pc=Vm;function Um(t,e){var r=Fr(this,t),i=r.size;return r.set(t,e),this.size+=r.size==i?0:1,this}var fc=Um;function Di(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var i=t[e];this.set(i[0],i[1])}}Di.prototype.clear=cc;Di.prototype.delete=uc;Di.prototype.get=dc;Di.prototype.has=pc;Di.prototype.set=fc;var la=Di;var Wm="Expected a function";function ca(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(Wm);var r=function(){var i=arguments,o=e?e.apply(this,i):i[0],s=r.cache;if(s.has(o))return s.get(o);var n=t.apply(this,i);return r.cache=s.set(o,n)||s,n};return r.cache=new(ca.Cache||la),r}ca.Cache=la;var mc=ca;var jm=500;function Gm(t){var e=mc(t,function(i){return r.size===jm&&r.clear(),i}),r=e.cache;return e}var gc=Gm;var Km=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Xm=/\\(\\)?/g,Ym=gc(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(Km,function(r,i,o,s){e.push(o?s.replace(Xm,"$1"):i||r)}),e}),vc=Ym;function Zm(t,e){for(var r=-1,i=t==null?0:t.length,o=Array(i);++r<i;)o[r]=e(t[r],r,t);return o}var bc=Zm;var Jm=1/0,_c=gr?gr.prototype:void 0,yc=_c?_c.toString:void 0;function wc(t){if(typeof t=="string")return t;if(Ai(t))return bc(t,wc)+"";if(Ti(t))return yc?yc.call(t):"";var e=t+"";return e=="0"&&1/t==-Jm?"-0":e}var xc=wc;function Qm(t){return t==null?"":xc(t)}var Sc=Qm;function e1(t,e){return Ai(t)?t:Y0(t,e)?[t]:vc(Sc(t))}var kc=e1;var t1=9007199254740991,r1=/^(?:0|[1-9]\d*)$/;function i1(t,e){var r=typeof t;return e=e??t1,!!e&&(r=="number"||r!="symbol"&&r1.test(t))&&t>-1&&t%1==0&&t<e}var Cc=i1;var s1=1/0;function o1(t){if(typeof t=="string"||Ti(t))return t;var e=t+"";return e=="0"&&1/t==-s1?"-0":e}var Ec=o1;function n1(t,e,r,i){if(!ni(t))return t;e=kc(e,t);for(var o=-1,s=e.length,n=s-1,a=t;a!=null&&++o<s;){var l=Ec(e[o]),c=r;if(l==="__proto__"||l==="constructor"||l==="prototype")return t;if(o!=n){var f=a[l];c=i?i(f,l,a):void 0,c===void 0&&(c=ni(f)?f:Cc(e[o+1])?[]:{})}K0(a,l,c),a=a[l]}return t}var Ac=n1;function a1(t,e,r){return t==null?t:Ac(t,e,r)}var Tc=a1;var Mc=(t,e,r,i,o,s,n,a,l,c=!1,f=0)=>{if(!Array.isArray(e))return W``;let m=u=>{e||(e=[]),Array.isArray(e)&&(typeof t.items!="object"||Array.isArray(t.items)||(t.items?.type==="string"?e.push(t.items?.default||""):t.items.properties?e.push(t.items?.default||{}):t.items?.type==="array"&&e.push(t.items?.default||[]),s([...r,e.length-1],e[e.length-1],a)))},_=u=>e?.map?.((p,v)=>{if(typeof t.items!="object"||Array.isArray(t.items)||!Array.isArray(e))return"";let x=[...a];x.push("items");let S=n(t.items,e[v],[...r,v],i,o?.[v],x,c,f+1),C=k=>D=>{if(!Array.isArray(e))return;let $=e[v];e[v]=e[v+k],e[v+k]=$,s([...r],e,a)},y={wrapper:{dragover:k=>{k.preventDefault(),k.stopPropagation();let D=k.dataTransfer;D&&(D.dropEffect="move")},dragenter:k=>{k.stopPropagation(),k.target.closest("sl-card")?.setAttribute("data-dropzone","")},dragleave:k=>{k.stopPropagation(),k.target.closest("sl-card")?.removeAttribute("data-dropzone")},drop:k=>{k.stopPropagation();let D=k.dataTransfer?.getData("integer");if(!D)return;let $=Number.parseInt(D,10);if(!Array.isArray(e))return;let F=e[v];e[v]=e[$],e[$]=F,s([...r],e,x),console.log({originIndex:$,idx:D}),k.target.closest("sl-card")?.removeAttribute("data-dropzone")}},handle:{mousedown:k=>{},dragstart:k=>{console.log(k),k.dataTransfer&&k.dataTransfer.setData("integer",String(v))}},delete:{click:k=>{Array.isArray(e)&&(e=e.filter((D,$)=>$!==v),s([...r],e,a))}},up:{click:C(-1),disabled:typeof e?.[v-1]>"u"},down:{click:C(1),disabled:typeof e?.[v+1]>"u"}};return u(v,S,y)}),g;typeof t.items=="object"&&!Array.isArray(t.items)&&t.items.title&&(g=t.items.title);let d={label:t.title??o?.["ui:title"],items:_,itemLabel:g,controls:{add:{click:m}},level:f};return l?.array?.(d)};var ha=(t,e,r,i,o,s,n,a,l=0)=>{let c="Wrong object field";if(typeof t.properties!="object")return a.callout?.({id:"",message:c})??W`${c}`;let f=Object.entries(t.properties).map(([h,d])=>{if(Array.isArray(d)||typeof d=="boolean")return W``;let u=e?.[h],p=[...r,h],v=t.required?.includes(h),x=[...n];return x.push(h),s(d,u,p,i?.[h],o?.[h],x,v,l+1)}),m,_=r.at(-1);t.title?m=t.title:typeof _!="number"&&(m=_),typeof o?.["ui:title"]=="string"&&(m=o["ui:title"]);let g={id:r.join("."),label:m,helpText:t.description,children:f,level:l};return a?.object?.(g)??a?.callout?.({id:"",message:c})??W`${c}`};var Rc=(t,e,r,i,o,s,n,a,l)=>{let c=r.join(".");function f(x){let S={id:c,message:`Missing ${x} widget.`};return l?.callout?.(S)??W`<p>${S.message}</p>`}let m="";t.title?m=t.title:Number.isNaN(Number(r.at(-1)))&&(m=String(r.at(-1))),i?.["ui:title"]&&(m=i?.["ui:title"]);let _=i?.["ui:help"]??i?.["ui:description"]??t.description??"",g=i?.["ui:placeholder"]??"",h=i?.["ui:disabled"]||!1,d=i?.["ui:readonly"]||!1,u;e!==void 0?u=e:typeof t.default<"u"&&(typeof t.default=="string"||typeof t.default=="number"||t.default==null||typeof t.default=="boolean")&&(u=t.default,s([...r],t.default,a));let v={label:m,helpText:_,placeholder:g,valueChangedCallback:x=>{let S=x;S===""&&(S=void 0),t?.type?.includes("null")&&(typeof x>"u"||x==="")&&(S=null),s(r,S,a)},handleKeydown:n,id:c,required:o,disabled:h,readonly:d};if(t?.enum&&(t.type==="integer"||t.type==="number"||t.type==="string")){let x={...v,value:u?String(u):"",type:t.type,enum:t.enum};return i?.["ui:widget"]==="radio"?l?.radioGroup?.(x)||f("radio group"):i?.["ui:widget"]==="button"?l?.buttonGroup?.(x)||f("button group"):l?.select?.(x)||f("select")}if(t.type==="string"&&i?.["ui:widget"]==="color"){let x={...v,value:u?String(u):""};return l?.colorPicker?.(x)||f("color picker")}if(t.format==="date"||t.format==="date-time"||t.format==="time"){let x=t.format,S=u;S&&(t.format,t.format,t.format==="date-time"&&(S instanceof Date||(S=new Date(S)),S instanceof Date&&(S=S.toISOString().split(".")[0]))),t.format==="date-time"&&(x="datetime-local");let C={...v,value:S,type:x};return l?.date?.(C)||f("date")}if(t.type==="string"){let x="text";(t.format==="password"||t.format==="email")&&(x=t.format),i?.["ui:widget"]==="password"&&(x="password"),i?.["ui:options"]?.inputType==="tel"&&(x="tel");let S={...v,value:u?String(u):"",inputType:x,minLength:t.minLength,maxLength:t.maxLength,pattern:t.pattern};if(i?.["ui:widget"]==="textarea")return l?.textarea?.(S)||f("textarea");if(typeof i?.["ui:widget"]=="string"){let C=i?.["ui:widget"];if(C!=="password")return l?.[C]?.(S)||f("custom")}return l?.text?.(S)||f("text")}if(t.type==="number"||t.type==="integer"){let x=t.multipleOf;typeof x>"u"&&(t.type?.includes("integer")&&(x=1),t.type?.includes("number")&&(x="any"));let S={...v,value:typeof u<"u"?Number(u):void 0,min:t.minimum,max:t.maximum,step:x};return i?.["ui:widget"]==="range"?l?.range?.(S)||f("range"):i?.["ui:widget"]==="rating"?l?.rating?.(S)||f("rating"):l?.number?.(S)||f("number")}if(t.type?.includes("boolean")){let x={...v,value:typeof u<"u"?!!u:void 0};return i?.["ui:widget"]==="switch"?l?.switch?.(x)||f("switch"):i?.["ui:widget"]==="radio"?l?.radioGroupBoolean?.(x)||f("radio group boolean"):i?.["ui:widget"]==="button"?l?.buttonGroupBoolean?.(x)||f("button group boolean"):l?.checkbox?.(x)||f("boolean")}return f(`Wrong input for: ${r.join("/")}`)};var Dc=(t,e,r,i,o,s,n,a,l,c=0)=>{let f=r.join(".");function m(p){let v={id:f,message:`Missing ${p} widget.`};return l?.callout?.(v)??W`<p>${v.message}</p>`}let _=t.description??o?.["ui:help"]??"",g=t.items;if(typeof g!="object"||Array.isArray(g))return;let h=p=>{let v=[...a,"items","enum"];n(r,p,v)},d=o?.["ui:disabled"]||!1,u={label:t.title,helpText:_,value:e??t?.default,enum:g.enum,disabled:d,level:c,id:f,valueChangedCallback:h};return o?.["ui:widget"]==="select"?l?.selectMultiple?.(u)||m("multi select"):l?.checkboxGroup?.(u)||m("array primitive")};var br=function(t,e,r,i){var o=arguments.length,s=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s},ps,Li,dt=class extends Ke{constructor(){super(...arguments);En(this,ps);En(this,Li);this.schema={},this.data={},this.uiSchema={},this.submitCallback=()=>{},this.dataChangeCallback=()=>{},this.widgets={},this.styleSheets=[],this.experimental={},this.submitButton=!0,this.submitButtonText="Submit",this._uiState={},An(this,ps,()=>{let r={id:"__submit_button",label:this.submitButtonLabel},i="Missing submit widget.";return this.widgets?.submit?.(r)??this.widgets?.callout?.({message:i})??i}),An(this,Li,B0())}_dig(r,i,o,s,n,a,l=!1,c=0){let f,m=r;if(typeof m.$ref<"u"||typeof m?.items=="object"&&"$ref"in m.items){let g=m.$ref;if(typeof m.items=="object"&&!Array.isArray(m.items)&&m.items?.$ref&&(g=m.items.$ref),g?.startsWith?.("#/definitions/")){let h=g.split("/")?.[2];m?.properties||(m.items={...this.schema.definitions?.[h]})}}if(m.type?.includes("boolean")||m.type?.includes("string")||m.type?.includes("integer")||m.format==="date"||m.format==="date-time"||m.type?.includes("number")){let g=[...a];f=Rc(m,i,o,n,l,this._handleChange.bind(this),this._handleKeydown.bind(this),g,this.widgets)}if(m.properties||m.allOf){if(m.allOf&&this.experimental?.allOf!==!0)return W`Unsupported feature.`;let g=r,h=[...a];h.push("properties"),f=ha(g,i,o,s,n,this._dig.bind(this),h,this.widgets,c)}if(m.type==="array"&&typeof m.items=="object"&&!Array.isArray(m.items)&&m.items.enum&&m.uniqueItems&&(m.items.type==="string"||m.items.type==="number"||m.items.type==="integer"||m.items.type==="boolean")){let g=[...a];f=Dc(m,i,o,s,n,l,this._handleChange.bind(this),g,this.widgets,c)}if(typeof m.items=="object"){if(Array.isArray(m.items)){let g={...r,properties:{}};m.items.forEach((d,u)=>{g.properties&&(g.properties[u]=d)});let h=[...a,"items"];f=ha(g,i,o,s,n,this._dig.bind(this),h,this.widgets,c)}else if(!((m.items.type==="string"||m.items.type==="number")&&m.items.enum)){let g=[...a];i||(i=[]),f=Mc(r,i,o,s,n,this._handleChange.bind(this),this._dig.bind(this),g,this.widgets,l,c)}}if(f)return f;let _=`Cannot dig this level: ${o.join("/")} - (${String(m.type)})`;return this.widgets?.callout?.({id:"",message:_})??W`<p>${_}</p>`}_setToValue(r,i,o){r&&typeof r=="object"&&Tc(r,o,i)}_handleChange(r,i,o){if(!(this.data&&typeof this.data=="object"))return;let s={...this.data};r.length===0?s={}:this._setToValue(s,i,r),this.data=s,this.dataChangeCallback(s,r,i,o)}_handleKeydown(r){console.log("cccccccccccccc");let i=r.metaKey||r.ctrlKey||r.shiftKey||r.altKey;r.key==="Enter"&&!i&&setTimeout(()=>{if(!r.defaultPrevented&&!r.isComposing){console.log({event:r});let o=Xs(this,Li).value,s=!0,n;if(!o.noValidate){let a=o.querySelectorAll("*");for(let l of a)typeof l.reportValidity=="function"&&(l.reportValidity()||(s=!1,n||(n=l)));n&&n?.reportValidity()}this.submitCallback(this.data,s)}})}_updateUi(r,i){if(!(this._uiState&&typeof this._uiState=="object"))return;let o={...this._uiState};this._setToValue(o,i,r),this._uiState=o}render(){return W`
			<style>
				${fo(this.styleSheets.join(`
`))}
			</style>

			<form
				${z0(Xs(this,Li))}
				part="base"
				@submit=${r=>{console.log("hey"),r.preventDefault();let i=r.target.reportValidity();this.submitCallback(this.data,i)}}
				@invalid=${r=>{}}
			>
				${this._dig(this.schema,this.data,[],this._uiState,this.uiSchema,[],!1)}

				<!--  -->
				${this.submitButton?Xs(this,ps).call(this):ke}
			</form>
		`}};ps=new WeakMap,Li=new WeakMap;br([z({type:Object})],dt.prototype,"schema",void 0);br([z({type:Object})],dt.prototype,"data",void 0);br([z({type:Object})],dt.prototype,"uiSchema",void 0);br([z({type:Object})],dt.prototype,"widgets",void 0);br([z({type:Array})],dt.prototype,"styleSheets",void 0);br([z({type:Object})],dt.prototype,"experimental",void 0);br([z({type:Boolean})],dt.prototype,"submitButton",void 0);br([z({type:String})],dt.prototype,"submitButtonText",void 0);br([he()],dt.prototype,"_uiState",void 0);customElements.define("json-schema-form",dt);var Fo={};Sp(Fo,{array:()=>Ic,buttonGroup:()=>Vc,buttonGroupBoolean:()=>Uc,callout:()=>Wc,checkbox:()=>Gc,checkboxGroup:()=>Xc,colorPicker:()=>Jh,date:()=>Qh,number:()=>eu,object:()=>tu,radioGroup:()=>iu,radioGroupBoolean:()=>su,range:()=>nu,rating:()=>lu,select:()=>du,selectMultiple:()=>pu,submit:()=>fu,switch:()=>gu,text:()=>vu,textarea:()=>_u});var Lc=ue`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;var ua=class extends fe{constructor(){super(...arguments),this.hasSlotController=new Xe(this,"footer","header","image")}render(){return W`
      <div
        part="base"
        class=${_e({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};ua.styles=[ye,Lc];ua.define("sl-card");var $c=ue`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;var Bc=ue`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;var Oc=Symbol.for(""),l1=t=>{if(t?.r===Oc)return t?._$litStatic$};var $i=(t,...e)=>({_$litStatic$:e.reduce(((r,i,o)=>r+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[o+1]),t[0]),r:Oc}),zc=new Map,da=t=>(e,...r)=>{let i=r.length,o,s,n=[],a=[],l,c=0,f=!1;for(;c<i;){for(l=e[c];c<i&&(s=r[c],(o=l1(s))!==void 0);)l+=o+e[++c],f=!0;c!==i&&a.push(s),n.push(l),c++}if(c===i&&n.push(e[i]),f){let m=n.join("$$lit$$");(e=zc.get(m))===void 0&&(n.raw=n,zc.set(m,e=n)),r=a}return t(e,...r)},Nr=da(W),S8=da(ao),k8=da(Zl);var wt=class extends fe{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=!!this.href,e=t?$i`a`:$i`button`;return Nr`
      <${e}
        part="base"
        class=${_e({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${ee(t?void 0:this.disabled)}
        type=${ee(t?void 0:"button")}
        href=${ee(t?this.href:void 0)}
        target=${ee(t?this.target:void 0)}
        download=${ee(t?this.download:void 0)}
        rel=${ee(t&&this.target?"noreferrer noopener":void 0)}
        role=${ee(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${ee(this.name)}
          library=${ee(this.library)}
          src=${ee(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};wt.styles=[ye,Bc];wt.dependencies={"sl-icon":$e};T([pe(".icon-button")],wt.prototype,"button",2);T([he()],wt.prototype,"hasFocus",2);T([z()],wt.prototype,"name",2);T([z()],wt.prototype,"library",2);T([z()],wt.prototype,"src",2);T([z()],wt.prototype,"href",2);T([z()],wt.prototype,"target",2);T([z()],wt.prototype,"download",2);T([z()],wt.prototype,"label",2);T([z({type:Boolean,reflect:!0})],wt.prototype,"disabled",2);var rr=class extends fe{constructor(){super(...arguments),this.localize=new Ne(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return W`
      <span
        part="base"
        class=${_e({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?W`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};rr.styles=[ye,$c];rr.dependencies={"sl-icon-button":wt};T([z({reflect:!0})],rr.prototype,"variant",2);T([z({reflect:!0})],rr.prototype,"size",2);T([z({type:Boolean,reflect:!0})],rr.prototype,"pill",2);T([z({type:Boolean})],rr.prototype,"removable",2);rr.define("sl-tag");var Ic=t=>W`
		<fieldset
			id=${t.id}
			class="theme-shoelace widget-array widget-fieldset level-${t.level}"
			part="widget-array"
		>
			${t.label?W`<legend>${t.label}</legend>`:ke}
			<!-- -->
			${t.helpText?W`<p class="widget-fieldset__description">${t.helpText}</p>`:ke}
			<!--  -->
			${t.items((e,r,i)=>W`
					<sl-card
						class="widget-array__card"
						@dragover=${i.wrapper.dragover}
						@dragenter=${i.wrapper.dragenter}
						@dragleave=${i.wrapper.dragleave}
						@drop=${i.wrapper.drop}
					>
						<header slot="header" class="widget-array__header">
							<div
								class="widget-array__handle"
								.draggable=${!0}
								@mousedown=${i.handle.mousedown}
								@dragstart=${i.handle.dragstart}
							>
								<sl-tag size="small" pill>${e+1}</sl-tag>
								<div class="widget-array__handle-grip">
									<sl-icon name="grip-horizontal" label="Settings"></sl-icon>
								</div>
							</div>

							<nav>
								<sl-tooltip content="Delete">
									<sl-button size="small" @click=${i.delete.click}>
										<sl-icon name="x-lg" label="Settings"></sl-icon>
									</sl-button>
								</sl-tooltip>

								<sl-divider vertical></sl-divider>

								<sl-button-group>
									<sl-tooltip content="Move item up">
										<sl-button
											size="small"
											@click=${i.up.click}
											.disabled=${i.up.disabled}
										>
											<sl-icon name="arrow-up" label="Up"></sl-icon>
										</sl-button>
									</sl-tooltip>

									<sl-tooltip content="Move item down">
										<sl-button
											size="small"
											@click=${i.down.click}
											.disabled=${i.down.disabled}
										>
											<sl-icon name="arrow-down" label="Down"></sl-icon>
										</sl-button>
									</sl-tooltip>
								</sl-button-group>
							</nav>
						</header>

						${r}
					</sl-card>
				`)}

			<nav class="widget-array__add-zone">
				<sl-button @click=${t.controls.add.click} size="large">
					<sl-icon name="plus"></sl-icon> New
					${t.itemLabel?W`"<strong>${t.itemLabel}</strong>"`:ke}
				</sl-button>
			</nav>
		</fieldset>
	`;var Pc=ue`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;var xt=ue`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;var Hc=ue`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var qr=class extends fe{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){let e=fs(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){let e=fs(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){let e=fs(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){let e=fs(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{let r=t.indexOf(e),i=fs(e);i&&(i.toggleAttribute("data-sl-button-group__button",!0),i.toggleAttribute("data-sl-button-group__button--first",r===0),i.toggleAttribute("data-sl-button-group__button--inner",r>0&&r<t.length-1),i.toggleAttribute("data-sl-button-group__button--last",r===t.length-1),i.toggleAttribute("data-sl-button-group__button--radio",i.tagName.toLowerCase()==="sl-radio-button"))})}render(){return W`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};qr.styles=[ye,Hc];T([pe("slot")],qr.prototype,"defaultSlot",2);T([he()],qr.prototype,"disableRole",2);T([z()],qr.prototype,"label",2);function fs(t){var e;let r="sl-button, sl-radio-button";return(e=t.closest(r))!=null?e:t.querySelector(r)}var ms=new WeakMap,gs=new WeakMap,vs=new WeakMap,pa=new WeakSet,Co=new WeakMap,ot=class{constructor(t,e){this.handleFormData=r=>{let i=this.options.disabled(this.host),o=this.options.name(this.host),s=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!n&&typeof o=="string"&&o.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(a=>{r.formData.append(o,a.toString())}):r.formData.append(o,s.toString()))},this.handleFormSubmit=r=>{var i;let o=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=ms.get(this.form))==null||i.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!o&&!s(this.host)&&(r.preventDefault(),r.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Co.set(this.host,[])},this.handleInteraction=r=>{let i=Co.get(this.host);i.includes(r.type)||i.push(r.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let r=this.form.querySelectorAll("*");for(let i of r)if(typeof i.checkValidity=="function"&&!i.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let r=this.form.querySelectorAll("*");for(let i of r)if(typeof i.reportValidity=="function"&&!i.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=Mt({form:r=>{let i=r.form;if(i){let s=r.getRootNode().querySelector(`#${i}`);if(s)return s}return r.closest("form")},name:r=>r.name,value:r=>r.value,defaultValue:r=>r.defaultValue,disabled:r=>{var i;return(i=r.disabled)!=null?i:!1},reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():!0,checkValidity:r=>typeof r.checkValidity=="function"?r.checkValidity():!0,setValue:(r,i)=>r.value=i,assumeInteractionOn:["sl-input"]},e)}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),Co.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Co.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,ms.has(this.form)?ms.get(this.form).add(this.host):ms.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),gs.has(this.form)||(gs.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),vs.has(this.form)||(vs.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;let t=ms.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),gs.has(this.form)&&(this.form.reportValidity=gs.get(this.form),gs.delete(this.form)),vs.has(this.form)&&(this.form.checkValidity=vs.get(this.form),vs.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?pa.add(t):pa.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){let r=document.createElement("button");r.type=t,r.style.position="absolute",r.style.width="0",r.style.height="0",r.style.clipPath="inset(50%)",r.style.overflow="hidden",r.style.whiteSpace="nowrap",e&&(r.name=e.name,r.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{e.hasAttribute(i)&&r.setAttribute(i,e.getAttribute(i))})),this.form.append(r),r.click(),r.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){let e=this.host,r=!!pa.has(e),i=!!e.required;e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&r),e.toggleAttribute("data-user-valid",t&&r)}updateValidity(){let t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){let e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault()}},Bi=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),Fc=Object.freeze(Or(Mt({},Bi),{valid:!1,valueMissing:!0})),Nc=Object.freeze(Or(Mt({},Bi),{valid:!1,customError:!0}));var nt=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this),this.hasSlotController=new Xe(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Nc:t?Fc:Bi}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let e=t.target.closest("sl-radio, sl-radio-button"),r=this.getAllRadios(),i=this.value;!e||e.disabled||(this.value=e.value,r.forEach(o=>o.checked=o===e),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let r=this.getAllRadios().filter(a=>!a.disabled),i=(e=r.find(a=>a.checked))!=null?e:r[0],o=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,n=r.indexOf(i)+o;n<0&&(n=r.length-1),n>r.length-1&&(n=0),this.getAllRadios().forEach(a=>{a.checked=!1,this.hasButtonGroup||a.setAttribute("tabindex","-1")}),this.value=r[n].value,r[n].checked=!0,this.hasButtonGroup?r[n].shadowRoot.querySelector("button").focus():(r[n].setAttribute("tabindex","0"),r[n].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}async syncRadioElements(){var t,e;let r=this.getAllRadios();if(await Promise.all(r.map(async i=>{await i.updateComplete,i.checked=i.value===this.value,i.size=this.size})),this.hasButtonGroup=r.some(i=>i.tagName.toLowerCase()==="sl-radio-button"),r.length>0&&!r.some(i=>i.checked))if(this.hasButtonGroup){let i=(t=r[0].shadowRoot)==null?void 0:t.querySelector("button");i&&i.setAttribute("tabindex","0")}else r[0].setAttribute("tabindex","0");if(this.hasButtonGroup){let i=(e=this.shadowRoot)==null?void 0:e.querySelector("sl-button-group");i&&(i.disableRole=!0)}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios())}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){let t=this.required&&!this.value,e=this.customValidityMessage!=="";return t||e?(this.formControlController.emitInvalidEvent(),!1):!0}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){let e=this.getAllRadios(),r=e.find(s=>s.checked),i=e.find(s=>!s.disabled),o=r||i;o&&o.focus(t)}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e,o=W`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return W`
      <fieldset
        part="form-control"
        class=${_e({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":!0,"form-control--has-label":r,"form-control--has-help-text":i})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?W`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${o}
                </sl-button-group>
              `:o}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};nt.styles=[ye,xt,Pc];nt.dependencies={"sl-button-group":qr};T([pe("slot:not([name])")],nt.prototype,"defaultSlot",2);T([pe(".radio-group__validation-input")],nt.prototype,"validationInput",2);T([he()],nt.prototype,"hasButtonGroup",2);T([he()],nt.prototype,"errorMessage",2);T([he()],nt.prototype,"defaultValue",2);T([z()],nt.prototype,"label",2);T([z({attribute:"help-text"})],nt.prototype,"helpText",2);T([z()],nt.prototype,"name",2);T([z({reflect:!0})],nt.prototype,"value",2);T([z({reflect:!0})],nt.prototype,"size",2);T([z({reflect:!0})],nt.prototype,"form",2);T([z({type:Boolean,reflect:!0})],nt.prototype,"required",2);T([be("size",{waitUntilFirstUpdate:!0})],nt.prototype,"handleSizeChange",1);T([be("value")],nt.prototype,"handleValueChange",1);nt.define("sl-radio-group");var Eo=ue`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;var qc=ue`
  ${Eo}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`;var It=class extends fe{constructor(){super(...arguments),this.hasSlotController=new Xe(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){return Nr`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${_e({button:!0,"button--default":!0,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${ee(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};It.styles=[ye,qc];T([pe(".button")],It.prototype,"input",2);T([pe(".hidden-input")],It.prototype,"hiddenInput",2);T([he()],It.prototype,"hasFocus",2);T([z({type:Boolean,reflect:!0})],It.prototype,"checked",2);T([z()],It.prototype,"value",2);T([z({type:Boolean,reflect:!0})],It.prototype,"disabled",2);T([z({reflect:!0})],It.prototype,"size",2);T([z({type:Boolean,reflect:!0})],It.prototype,"pill",2);T([be("disabled",{waitUntilFirstUpdate:!0})],It.prototype,"handleDisabledChange",1);It.define("sl-radio-button");var Vc=t=>W`
	<sl-radio-group
		size="medium"
		.label=${t.label??""}
		.helpText=${t.helpText??""}
		value=${typeof t.value<"u"?String(t.value):""}
		.name=${t.id}
		.required=${t.required??!1}
		@sl-change=${e=>{let r=e.target.value;t.type==="number"&&(r=Number(r)),t.valueChangedCallback?.(r)}}
	>
		${t.enum?.map(e=>W`<sl-radio-button
					.disabled=${String(e)===t.value?!1:t.disabled}
					value=${String(e)}
					>${e}</sl-radio-button
				>`)}
	</sl-radio-group>
`;var Uc=t=>W`
	<sl-radio-group
		size="medium"
		.label=${t.label??""}
		.helpText=${t.helpText??""}
		value=${typeof t.value<"u"?String(t.value):""}
		.name=${t.id}
		.required?=${t.required}
		@sl-change=${e=>{let r=e.target.value;t.valueChangedCallback?.(r==="true")}}
	>
		<sl-radio-button
			value="true"
			.disabled=${t.value===!0?!1:t.disabled}
			>${t.trueLabel??"Yes"}</sl-radio-button
		>
		<sl-radio-button
			value="false"
			.disabled=${t.value===!1?!1:t.disabled}
			>${t.falseLabel??"No"}</sl-radio-button
		>
	</sl-radio-group>
`;var Wc=t=>(console.warn(t.message),W`
		<div
			role="alert"
			class=${`callout--${t.type??"warning"} theme-shoelace widget-callout`}
			id=${t.id}
			part="widget-callout"
		>
			<p>${t.message}</p>
		</div>
	`);var jc=ue`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;var Pt=(t="value")=>(e,r)=>{let i=e.constructor,o=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(s,n,a){var l;let c=i.getPropertyOptions(t),f=typeof c.attribute=="string"?c.attribute:t;if(s===f){let m=c.converter||Pr,g=(typeof m=="function"?m:(l=m?.fromAttribute)!=null?l:Pr.fromAttribute)(a,c.type);this[t]!==g&&(this[r]=g)}o.call(this,s,n,a)}};var Kt=Tt(class extends zt{constructor(t){if(super(t),t.type!==ft.PROPERTY&&t.type!==ft.ATTRIBUTE&&t.type!==ft.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!lo(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===st||e===ke)return e;let r=t.element,i=t.name;if(t.type===ft.PROPERTY){if(e===r[i])return st}else if(t.type===ft.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(i))return st}else if(t.type===ft.ATTRIBUTE&&r.getAttribute(i)===e+"")return st;return i0(t),e}});var Se=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Xe(this,"help-text","label"),this.localize=new Ne(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,i="preserve"){let o=e??this.input.selectionStart,s=r??this.input.selectionEnd;this.input.setRangeText(t,o,s,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e,s=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return W`
      <div
        part="form-control"
        class=${_e({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${_e({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${ee(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${ee(this.placeholder)}
              minlength=${ee(this.minlength)}
              maxlength=${ee(this.maxlength)}
              min=${ee(this.min)}
              max=${ee(this.max)}
              step=${ee(this.step)}
              .value=${Kt(this.value)}
              autocapitalize=${ee(this.autocapitalize)}
              autocomplete=${ee(this.autocomplete)}
              autocorrect=${ee(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${ee(this.pattern)}
              enterkeyhint=${ee(this.enterkeyhint)}
              inputmode=${ee(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${s?W`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?W`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?W`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:W`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Se.styles=[ye,xt,jc];Se.dependencies={"sl-icon":$e};T([pe(".input__control")],Se.prototype,"input",2);T([he()],Se.prototype,"hasFocus",2);T([z()],Se.prototype,"title",2);T([z({reflect:!0})],Se.prototype,"type",2);T([z()],Se.prototype,"name",2);T([z()],Se.prototype,"value",2);T([Pt()],Se.prototype,"defaultValue",2);T([z({reflect:!0})],Se.prototype,"size",2);T([z({type:Boolean,reflect:!0})],Se.prototype,"filled",2);T([z({type:Boolean,reflect:!0})],Se.prototype,"pill",2);T([z()],Se.prototype,"label",2);T([z({attribute:"help-text"})],Se.prototype,"helpText",2);T([z({type:Boolean})],Se.prototype,"clearable",2);T([z({type:Boolean,reflect:!0})],Se.prototype,"disabled",2);T([z()],Se.prototype,"placeholder",2);T([z({type:Boolean,reflect:!0})],Se.prototype,"readonly",2);T([z({attribute:"password-toggle",type:Boolean})],Se.prototype,"passwordToggle",2);T([z({attribute:"password-visible",type:Boolean})],Se.prototype,"passwordVisible",2);T([z({attribute:"no-spin-buttons",type:Boolean})],Se.prototype,"noSpinButtons",2);T([z({reflect:!0})],Se.prototype,"form",2);T([z({type:Boolean,reflect:!0})],Se.prototype,"required",2);T([z()],Se.prototype,"pattern",2);T([z({type:Number})],Se.prototype,"minlength",2);T([z({type:Number})],Se.prototype,"maxlength",2);T([z()],Se.prototype,"min",2);T([z()],Se.prototype,"max",2);T([z()],Se.prototype,"step",2);T([z()],Se.prototype,"autocapitalize",2);T([z()],Se.prototype,"autocorrect",2);T([z()],Se.prototype,"autocomplete",2);T([z({type:Boolean})],Se.prototype,"autofocus",2);T([z()],Se.prototype,"enterkeyhint",2);T([z({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],Se.prototype,"spellcheck",2);T([z()],Se.prototype,"inputmode",2);T([be("disabled",{waitUntilFirstUpdate:!0})],Se.prototype,"handleDisabledChange",1);T([be("step",{waitUntilFirstUpdate:!0})],Se.prototype,"handleStepChange",1);T([be("value",{waitUntilFirstUpdate:!0})],Se.prototype,"handleValueChange",1);Se.define("sl-input");var Gc=t=>W`
	<div class="theme-shoelace widget-checkbox">
		<sl-checkbox
			type="text"
			.checked="${t.value}"
			.name=${t.id}
			.id=${t.id}
			.required=${t.required??!0}
			@sl-input=${e=>{let{checked:r}=e.target;t.valueChangedCallback?.(r)}}
			.disabled=${t.disabled}
		>
			<label class="widget-checkbox__label">${t.label}</label>
		</sl-checkbox>

		${t.helpText?W`<div class="widget-checkbox__description">
					${t.helpText}
			  </div>`:ke}
	</div>
`;var Kc=ue`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;var et=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Xe(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return W`
      <div
        class=${_e({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${_e({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${ee(this.value)}
            .indeterminate=${Kt(this.indeterminate)}
            .checked=${Kt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?W`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?W`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};et.styles=[ye,xt,Kc];et.dependencies={"sl-icon":$e};T([pe('input[type="checkbox"]')],et.prototype,"input",2);T([he()],et.prototype,"hasFocus",2);T([z()],et.prototype,"title",2);T([z()],et.prototype,"name",2);T([z()],et.prototype,"value",2);T([z({reflect:!0})],et.prototype,"size",2);T([z({type:Boolean,reflect:!0})],et.prototype,"disabled",2);T([z({type:Boolean,reflect:!0})],et.prototype,"checked",2);T([z({type:Boolean,reflect:!0})],et.prototype,"indeterminate",2);T([Pt("checked")],et.prototype,"defaultChecked",2);T([z({reflect:!0})],et.prototype,"form",2);T([z({type:Boolean,reflect:!0})],et.prototype,"required",2);T([z({attribute:"help-text"})],et.prototype,"helpText",2);T([be("disabled",{waitUntilFirstUpdate:!0})],et.prototype,"handleDisabledChange",1);T([be(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],et.prototype,"handleStateChange",1);et.define("sl-checkbox");var Xc=t=>W`
	<fieldset
		.id=${t.id}
		class="theme-shoelace widget-checkbox-group widget-fieldset level-${t.level}"
		part="widget-checkbox-group"
	>
		<legend>${t.label}</legend>
		${t.helpText?W`<div class="help-text">${t.helpText}</div>`:ke}

		<!-- NOTE: Unused for now. Too noisy? -->
		<!-- <div class="help-text">${t.itemsLabel}</div> -->

		<div class="widget-checkbox-group__list">
			${t?.enum?.map(e=>W`<sl-checkbox
					.checked=${t.value?.some(r=>r===e)??!1}
					@sl-change=${r=>{let{checked:i}=r.target,o=[];t?.enum?.forEach(s=>{s===e&&i&&o.push(s)}),t.value?.forEach(s=>{s!==e&&o.push(s)}),t.valueChangedCallback?.(o)}}
					.disabled=${t.disabled}
					>${e}</sl-checkbox
				>`)}
		</div>
	</fieldset>
`;var Yc=ue`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;var fa=class extends fe{render(){return W` <slot></slot> `}};fa.styles=[ye,Yc];function Ao(t,e){function r(o){let s=t.getBoundingClientRect(),n=t.ownerDocument.defaultView,a=s.left+n.scrollX,l=s.top+n.scrollY,c=o.pageX-a,f=o.pageY-l;e?.onMove&&e.onMove(c,f)}function i(){document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",i),e?.onStop&&e.onStop()}document.addEventListener("pointermove",r,{passive:!0}),document.addEventListener("pointerup",i),e?.initialEvent instanceof PointerEvent&&r(e.initialEvent)}var Zc=ue`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;function*Qc(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*f0(Qc(t.shadowRoot.activeElement))))}function eh(){return[...Qc()].pop()}var Jc=new WeakMap;function th(t){let e=Jc.get(t);return e||(e=window.getComputedStyle(t,null),Jc.set(t,e)),e}function c1(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});let e=th(t);return e.visibility!=="hidden"&&e.display!=="none"}function h1(t){let e=th(t),{overflowY:r,overflowX:i}=e;return r==="scroll"||i==="scroll"?!0:r!=="auto"||i!=="auto"?!1:t.scrollHeight>t.clientHeight&&r==="auto"||t.scrollWidth>t.clientWidth&&i==="auto"}function u1(t){let e=t.tagName.toLowerCase(),r=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(r)||r<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return!1;if(e==="input"&&t.getAttribute("type")==="radio"){let s=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,a=s.querySelector(`${n}:checked`);return a?a===t:s.querySelector(n)===t}return c1(t)?(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:h1(t):!1}function rh(t){var e,r;let i=p1(t),o=(e=i[0])!=null?e:null,s=(r=i[i.length-1])!=null?r:null;return{start:o,end:s}}function d1(t,e){var r;return((r=t.getRootNode({composed:!0}))==null?void 0:r.host)!==e}function p1(t){let e=new WeakMap,r=[];function i(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||e.has(o))return;e.set(o,!0),!r.includes(o)&&u1(o)&&r.push(o),o instanceof HTMLSlotElement&&d1(o,t)&&o.assignedElements({flatten:!0}).forEach(s=>{i(s)}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&i(o.shadowRoot)}for(let s of o.children)i(s)}return i(t),r.sort((o,s)=>{let n=Number(o.getAttribute("tabindex"))||0;return(Number(s.getAttribute("tabindex"))||0)-n})}var ih=ue`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;var ir=Math.min,mt=Math.max,_s=Math.round,ys=Math.floor,Xt=t=>({x:t,y:t}),f1={left:"right",right:"left",bottom:"top",top:"bottom"},m1={start:"end",end:"start"};function Mo(t,e,r){return mt(t,ir(e,r))}function ai(t,e){return typeof t=="function"?t(e):t}function _r(t){return t.split("-")[0]}function li(t){return t.split("-")[1]}function ma(t){return t==="x"?"y":"x"}function Ro(t){return t==="y"?"height":"width"}var g1=new Set(["top","bottom"]);function sr(t){return g1.has(_r(t))?"y":"x"}function Do(t){return ma(sr(t))}function nh(t,e,r){r===void 0&&(r=!1);let i=li(t),o=Do(t),s=Ro(o),n=o==="x"?i===(r?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(n=bs(n)),[n,bs(n)]}function ah(t){let e=bs(t);return[To(t),e,To(e)]}function To(t){return t.replace(/start|end/g,e=>m1[e])}var sh=["left","right"],oh=["right","left"],v1=["top","bottom"],b1=["bottom","top"];function _1(t,e,r){switch(t){case"top":case"bottom":return r?e?oh:sh:e?sh:oh;case"left":case"right":return e?v1:b1;default:return[]}}function lh(t,e,r,i){let o=li(t),s=_1(_r(t),r==="start",i);return o&&(s=s.map(n=>n+"-"+o),e&&(s=s.concat(s.map(To)))),s}function bs(t){return t.replace(/left|right|bottom|top/g,e=>f1[e])}function y1(t){return{top:0,right:0,bottom:0,left:0,...t}}function ga(t){return typeof t!="number"?y1(t):{top:t,right:t,bottom:t,left:t}}function ci(t){let{x:e,y:r,width:i,height:o}=t;return{width:i,height:o,top:r,left:e,right:e+i,bottom:r+o,x:e,y:r}}function ch(t,e,r){let{reference:i,floating:o}=t,s=sr(e),n=Do(e),a=Ro(n),l=_r(e),c=s==="y",f=i.x+i.width/2-o.width/2,m=i.y+i.height/2-o.height/2,_=i[a]/2-o[a]/2,g;switch(l){case"top":g={x:f,y:i.y-o.height};break;case"bottom":g={x:f,y:i.y+i.height};break;case"right":g={x:i.x+i.width,y:m};break;case"left":g={x:i.x-o.width,y:m};break;default:g={x:i.x,y:i.y}}switch(li(e)){case"start":g[n]-=_*(r&&c?-1:1);break;case"end":g[n]+=_*(r&&c?-1:1);break}return g}var hh=async(t,e,r)=>{let{placement:i="bottom",strategy:o="absolute",middleware:s=[],platform:n}=r,a=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e)),c=await n.getElementRects({reference:t,floating:e,strategy:o}),{x:f,y:m}=ch(c,i,l),_=i,g={},h=0;for(let d=0;d<a.length;d++){let{name:u,fn:p}=a[d],{x:v,y:x,data:S,reset:C}=await p({x:f,y:m,initialPlacement:i,placement:_,strategy:o,middlewareData:g,rects:c,platform:n,elements:{reference:t,floating:e}});f=v??f,m=x??m,g={...g,[u]:{...g[u],...S}},C&&h<=50&&(h++,typeof C=="object"&&(C.placement&&(_=C.placement),C.rects&&(c=C.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:o}):C.rects),{x:f,y:m}=ch(c,_,l)),d=-1)}return{x:f,y:m,placement:_,strategy:o,middlewareData:g}};async function Lo(t,e){var r;e===void 0&&(e={});let{x:i,y:o,platform:s,rects:n,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:f="viewport",elementContext:m="floating",altBoundary:_=!1,padding:g=0}=ai(e,t),h=ga(g),u=a[_?m==="floating"?"reference":"floating":m],p=ci(await s.getClippingRect({element:(r=await(s.isElement==null?void 0:s.isElement(u)))==null||r?u:u.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:c,rootBoundary:f,strategy:l})),v=m==="floating"?{x:i,y:o,width:n.floating.width,height:n.floating.height}:n.reference,x=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),S=await(s.isElement==null?void 0:s.isElement(x))?await(s.getScale==null?void 0:s.getScale(x))||{x:1,y:1}:{x:1,y:1},C=ci(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:v,offsetParent:x,strategy:l}):v);return{top:(p.top-C.top+h.top)/S.y,bottom:(C.bottom-p.bottom+h.bottom)/S.y,left:(p.left-C.left+h.left)/S.x,right:(C.right-p.right+h.right)/S.x}}var uh=t=>({name:"arrow",options:t,async fn(e){let{x:r,y:i,placement:o,rects:s,platform:n,elements:a,middlewareData:l}=e,{element:c,padding:f=0}=ai(t,e)||{};if(c==null)return{};let m=ga(f),_={x:r,y:i},g=Do(o),h=Ro(g),d=await n.getDimensions(c),u=g==="y",p=u?"top":"left",v=u?"bottom":"right",x=u?"clientHeight":"clientWidth",S=s.reference[h]+s.reference[g]-_[g]-s.floating[h],C=_[g]-s.reference[g],y=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c)),k=y?y[x]:0;(!k||!await(n.isElement==null?void 0:n.isElement(y)))&&(k=a.floating[x]||s.floating[h]);let D=S/2-C/2,$=k/2-d[h]/2-1,F=ir(m[p],$),L=ir(m[v],$),V=F,G=k-d[h]-L,K=k/2-d[h]/2+D,re=Mo(V,K,G),J=!l.arrow&&li(o)!=null&&K!==re&&s.reference[h]/2-(K<V?F:L)-d[h]/2<0,A=J?K<V?K-V:K-G:0;return{[g]:_[g]+A,data:{[g]:re,centerOffset:K-re-A,...J&&{alignmentOffset:A}},reset:J}}});var dh=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var r,i;let{placement:o,middlewareData:s,rects:n,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:f=!0,crossAxis:m=!0,fallbackPlacements:_,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:d=!0,...u}=ai(t,e);if((r=s.arrow)!=null&&r.alignmentOffset)return{};let p=_r(o),v=sr(a),x=_r(a)===a,S=await(l.isRTL==null?void 0:l.isRTL(c.floating)),C=_||(x||!d?[bs(a)]:ah(a)),y=h!=="none";!_&&y&&C.push(...lh(a,d,h,S));let k=[a,...C],D=await Lo(e,u),$=[],F=((i=s.flip)==null?void 0:i.overflows)||[];if(f&&$.push(D[p]),m){let K=nh(o,n,S);$.push(D[K[0]],D[K[1]])}if(F=[...F,{placement:o,overflows:$}],!$.every(K=>K<=0)){var L,V;let K=(((L=s.flip)==null?void 0:L.index)||0)+1,re=k[K];if(re&&(!(m==="alignment"?v!==sr(re):!1)||F.every(B=>sr(B.placement)===v?B.overflows[0]>0:!0)))return{data:{index:K,overflows:F},reset:{placement:re}};let J=(V=F.filter(A=>A.overflows[0]<=0).sort((A,B)=>A.overflows[1]-B.overflows[1])[0])==null?void 0:V.placement;if(!J)switch(g){case"bestFit":{var G;let A=(G=F.filter(B=>{if(y){let P=sr(B.placement);return P===v||P==="y"}return!0}).map(B=>[B.placement,B.overflows.filter(P=>P>0).reduce((P,N)=>P+N,0)]).sort((B,P)=>B[1]-P[1])[0])==null?void 0:G[0];A&&(J=A);break}case"initialPlacement":J=a;break}if(o!==J)return{reset:{placement:J}}}return{}}}};var w1=new Set(["left","top"]);async function x1(t,e){let{placement:r,platform:i,elements:o}=t,s=await(i.isRTL==null?void 0:i.isRTL(o.floating)),n=_r(r),a=li(r),l=sr(r)==="y",c=w1.has(n)?-1:1,f=s&&l?-1:1,m=ai(e,t),{mainAxis:_,crossAxis:g,alignmentAxis:h}=typeof m=="number"?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:m.mainAxis||0,crossAxis:m.crossAxis||0,alignmentAxis:m.alignmentAxis};return a&&typeof h=="number"&&(g=a==="end"?h*-1:h),l?{x:g*f,y:_*c}:{x:_*c,y:g*f}}var ph=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var r,i;let{x:o,y:s,placement:n,middlewareData:a}=e,l=await x1(e,t);return n===((r=a.offset)==null?void 0:r.placement)&&(i=a.arrow)!=null&&i.alignmentOffset?{}:{x:o+l.x,y:s+l.y,data:{...l,placement:n}}}}},fh=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:r,y:i,placement:o}=e,{mainAxis:s=!0,crossAxis:n=!1,limiter:a={fn:u=>{let{x:p,y:v}=u;return{x:p,y:v}}},...l}=ai(t,e),c={x:r,y:i},f=await Lo(e,l),m=sr(_r(o)),_=ma(m),g=c[_],h=c[m];if(s){let u=_==="y"?"top":"left",p=_==="y"?"bottom":"right",v=g+f[u],x=g-f[p];g=Mo(v,g,x)}if(n){let u=m==="y"?"top":"left",p=m==="y"?"bottom":"right",v=h+f[u],x=h-f[p];h=Mo(v,h,x)}let d=a.fn({...e,[_]:g,[m]:h});return{...d,data:{x:d.x-r,y:d.y-i,enabled:{[_]:s,[m]:n}}}}}};var mh=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var r,i;let{placement:o,rects:s,platform:n,elements:a}=e,{apply:l=()=>{},...c}=ai(t,e),f=await Lo(e,c),m=_r(o),_=li(o),g=sr(o)==="y",{width:h,height:d}=s.floating,u,p;m==="top"||m==="bottom"?(u=m,p=_===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(p=m,u=_==="end"?"top":"bottom");let v=d-f.top-f.bottom,x=h-f.left-f.right,S=ir(d-f[u],v),C=ir(h-f[p],x),y=!e.middlewareData.shift,k=S,D=C;if((r=e.middlewareData.shift)!=null&&r.enabled.x&&(D=x),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(k=v),y&&!_){let F=mt(f.left,0),L=mt(f.right,0),V=mt(f.top,0),G=mt(f.bottom,0);g?D=h-2*(F!==0||L!==0?F+L:mt(f.left,f.right)):k=d-2*(V!==0||G!==0?V+G:mt(f.top,f.bottom))}await l({...e,availableWidth:D,availableHeight:k});let $=await n.getDimensions(a.floating);return h!==$.width||d!==$.height?{reset:{rects:!0}}:{}}}};function $o(){return typeof window<"u"}function hi(t){return vh(t)?(t.nodeName||"").toLowerCase():"#document"}function St(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Yt(t){var e;return(e=(vh(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function vh(t){return $o()?t instanceof Node||t instanceof St(t).Node:!1}function Ht(t){return $o()?t instanceof Element||t instanceof St(t).Element:!1}function Zt(t){return $o()?t instanceof HTMLElement||t instanceof St(t).HTMLElement:!1}function gh(t){return!$o()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof St(t).ShadowRoot}var S1=new Set(["inline","contents"]);function Oi(t){let{overflow:e,overflowX:r,overflowY:i,display:o}=Ft(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+r)&&!S1.has(o)}var k1=new Set(["table","td","th"]);function bh(t){return k1.has(hi(t))}var C1=[":popover-open",":modal"];function ws(t){return C1.some(e=>{try{return t.matches(e)}catch{return!1}})}var E1=["transform","translate","scale","rotate","perspective"],A1=["transform","translate","scale","rotate","perspective","filter"],T1=["paint","layout","strict","content"];function Bo(t){let e=zo(),r=Ht(t)?Ft(t):t;return E1.some(i=>r[i]?r[i]!=="none":!1)||(r.containerType?r.containerType!=="normal":!1)||!e&&(r.backdropFilter?r.backdropFilter!=="none":!1)||!e&&(r.filter?r.filter!=="none":!1)||A1.some(i=>(r.willChange||"").includes(i))||T1.some(i=>(r.contain||"").includes(i))}function _h(t){let e=yr(t);for(;Zt(e)&&!ui(e);){if(Bo(e))return e;if(ws(e))return null;e=yr(e)}return null}function zo(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}var M1=new Set(["html","body","#document"]);function ui(t){return M1.has(hi(t))}function Ft(t){return St(t).getComputedStyle(t)}function xs(t){return Ht(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function yr(t){if(hi(t)==="html")return t;let e=t.assignedSlot||t.parentNode||gh(t)&&t.host||Yt(t);return gh(e)?e.host:e}function yh(t){let e=yr(t);return ui(e)?t.ownerDocument?t.ownerDocument.body:t.body:Zt(e)&&Oi(e)?e:yh(e)}function zi(t,e,r){var i;e===void 0&&(e=[]),r===void 0&&(r=!0);let o=yh(t),s=o===((i=t.ownerDocument)==null?void 0:i.body),n=St(o);if(s){let a=Oo(n);return e.concat(n,n.visualViewport||[],Oi(o)?o:[],a&&r?zi(a):[])}return e.concat(o,zi(o,[],r))}function Oo(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function kh(t){let e=Ft(t),r=parseFloat(e.width)||0,i=parseFloat(e.height)||0,o=Zt(t),s=o?t.offsetWidth:r,n=o?t.offsetHeight:i,a=_s(r)!==s||_s(i)!==n;return a&&(r=s,i=n),{width:r,height:i,$:a}}function ba(t){return Ht(t)?t:t.contextElement}function Ii(t){let e=ba(t);if(!Zt(e))return Xt(1);let r=e.getBoundingClientRect(),{width:i,height:o,$:s}=kh(e),n=(s?_s(r.width):r.width)/i,a=(s?_s(r.height):r.height)/o;return(!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}var R1=Xt(0);function Ch(t){let e=St(t);return!zo()||!e.visualViewport?R1:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function D1(t,e,r){return e===void 0&&(e=!1),!r||e&&r!==St(t)?!1:e}function di(t,e,r,i){e===void 0&&(e=!1),r===void 0&&(r=!1);let o=t.getBoundingClientRect(),s=ba(t),n=Xt(1);e&&(i?Ht(i)&&(n=Ii(i)):n=Ii(t));let a=D1(s,r,i)?Ch(s):Xt(0),l=(o.left+a.x)/n.x,c=(o.top+a.y)/n.y,f=o.width/n.x,m=o.height/n.y;if(s){let _=St(s),g=i&&Ht(i)?St(i):i,h=_,d=Oo(h);for(;d&&i&&g!==h;){let u=Ii(d),p=d.getBoundingClientRect(),v=Ft(d),x=p.left+(d.clientLeft+parseFloat(v.paddingLeft))*u.x,S=p.top+(d.clientTop+parseFloat(v.paddingTop))*u.y;l*=u.x,c*=u.y,f*=u.x,m*=u.y,l+=x,c+=S,h=St(d),d=Oo(h)}}return ci({width:f,height:m,x:l,y:c})}function Io(t,e){let r=xs(t).scrollLeft;return e?e.left+r:di(Yt(t)).left+r}function Eh(t,e){let r=t.getBoundingClientRect(),i=r.left+e.scrollLeft-Io(t,r),o=r.top+e.scrollTop;return{x:i,y:o}}function L1(t){let{elements:e,rect:r,offsetParent:i,strategy:o}=t,s=o==="fixed",n=Yt(i),a=e?ws(e.floating):!1;if(i===n||a&&s)return r;let l={scrollLeft:0,scrollTop:0},c=Xt(1),f=Xt(0),m=Zt(i);if((m||!m&&!s)&&((hi(i)!=="body"||Oi(n))&&(l=xs(i)),Zt(i))){let g=di(i);c=Ii(i),f.x=g.x+i.clientLeft,f.y=g.y+i.clientTop}let _=n&&!m&&!s?Eh(n,l):Xt(0);return{width:r.width*c.x,height:r.height*c.y,x:r.x*c.x-l.scrollLeft*c.x+f.x+_.x,y:r.y*c.y-l.scrollTop*c.y+f.y+_.y}}function $1(t){return Array.from(t.getClientRects())}function B1(t){let e=Yt(t),r=xs(t),i=t.ownerDocument.body,o=mt(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),s=mt(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight),n=-r.scrollLeft+Io(t),a=-r.scrollTop;return Ft(i).direction==="rtl"&&(n+=mt(e.clientWidth,i.clientWidth)-o),{width:o,height:s,x:n,y:a}}var wh=25;function z1(t,e){let r=St(t),i=Yt(t),o=r.visualViewport,s=i.clientWidth,n=i.clientHeight,a=0,l=0;if(o){s=o.width,n=o.height;let f=zo();(!f||f&&e==="fixed")&&(a=o.offsetLeft,l=o.offsetTop)}let c=Io(i);if(c<=0){let f=i.ownerDocument,m=f.body,_=getComputedStyle(m),g=f.compatMode==="CSS1Compat"&&parseFloat(_.marginLeft)+parseFloat(_.marginRight)||0,h=Math.abs(i.clientWidth-m.clientWidth-g);h<=wh&&(s-=h)}else c<=wh&&(s+=c);return{width:s,height:n,x:a,y:l}}var O1=new Set(["absolute","fixed"]);function I1(t,e){let r=di(t,!0,e==="fixed"),i=r.top+t.clientTop,o=r.left+t.clientLeft,s=Zt(t)?Ii(t):Xt(1),n=t.clientWidth*s.x,a=t.clientHeight*s.y,l=o*s.x,c=i*s.y;return{width:n,height:a,x:l,y:c}}function xh(t,e,r){let i;if(e==="viewport")i=z1(t,r);else if(e==="document")i=B1(Yt(t));else if(Ht(e))i=I1(e,r);else{let o=Ch(t);i={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return ci(i)}function Ah(t,e){let r=yr(t);return r===e||!Ht(r)||ui(r)?!1:Ft(r).position==="fixed"||Ah(r,e)}function P1(t,e){let r=e.get(t);if(r)return r;let i=zi(t,[],!1).filter(a=>Ht(a)&&hi(a)!=="body"),o=null,s=Ft(t).position==="fixed",n=s?yr(t):t;for(;Ht(n)&&!ui(n);){let a=Ft(n),l=Bo(n);!l&&a.position==="fixed"&&(o=null),(s?!l&&!o:!l&&a.position==="static"&&!!o&&O1.has(o.position)||Oi(n)&&!l&&Ah(t,n))?i=i.filter(f=>f!==n):o=a,n=yr(n)}return e.set(t,i),i}function H1(t){let{element:e,boundary:r,rootBoundary:i,strategy:o}=t,n=[...r==="clippingAncestors"?ws(e)?[]:P1(e,this._c):[].concat(r),i],a=n[0],l=n.reduce((c,f)=>{let m=xh(e,f,o);return c.top=mt(m.top,c.top),c.right=ir(m.right,c.right),c.bottom=ir(m.bottom,c.bottom),c.left=mt(m.left,c.left),c},xh(e,a,o));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function F1(t){let{width:e,height:r}=kh(t);return{width:e,height:r}}function N1(t,e,r){let i=Zt(e),o=Yt(e),s=r==="fixed",n=di(t,!0,s,e),a={scrollLeft:0,scrollTop:0},l=Xt(0);function c(){l.x=Io(o)}if(i||!i&&!s)if((hi(e)!=="body"||Oi(o))&&(a=xs(e)),i){let g=di(e,!0,s,e);l.x=g.x+e.clientLeft,l.y=g.y+e.clientTop}else o&&c();s&&!i&&o&&c();let f=o&&!i&&!s?Eh(o,a):Xt(0),m=n.left+a.scrollLeft-l.x-f.x,_=n.top+a.scrollTop-l.y-f.y;return{x:m,y:_,width:n.width,height:n.height}}function va(t){return Ft(t).position==="static"}function Sh(t,e){if(!Zt(t)||Ft(t).position==="fixed")return null;if(e)return e(t);let r=t.offsetParent;return Yt(t)===r&&(r=r.ownerDocument.body),r}function Th(t,e){let r=St(t);if(ws(t))return r;if(!Zt(t)){let o=yr(t);for(;o&&!ui(o);){if(Ht(o)&&!va(o))return o;o=yr(o)}return r}let i=Sh(t,e);for(;i&&bh(i)&&va(i);)i=Sh(i,e);return i&&ui(i)&&va(i)&&!Bo(i)?r:i||_h(t)||r}var q1=async function(t){let e=this.getOffsetParent||Th,r=this.getDimensions,i=await r(t.floating);return{reference:N1(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function V1(t){return Ft(t).direction==="rtl"}var Ss={convertOffsetParentRelativeRectToViewportRelativeRect:L1,getDocumentElement:Yt,getClippingRect:H1,getOffsetParent:Th,getElementRects:q1,getClientRects:$1,getDimensions:F1,getScale:Ii,isElement:Ht,isRTL:V1};function Mh(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function U1(t,e){let r=null,i,o=Yt(t);function s(){var a;clearTimeout(i),(a=r)==null||a.disconnect(),r=null}function n(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),s();let c=t.getBoundingClientRect(),{left:f,top:m,width:_,height:g}=c;if(a||e(),!_||!g)return;let h=ys(m),d=ys(o.clientWidth-(f+_)),u=ys(o.clientHeight-(m+g)),p=ys(f),x={rootMargin:-h+"px "+-d+"px "+-u+"px "+-p+"px",threshold:mt(0,ir(1,l))||1},S=!0;function C(y){let k=y[0].intersectionRatio;if(k!==l){if(!S)return n();k?n(!1,k):i=setTimeout(()=>{n(!1,1e-7)},1e3)}k===1&&!Mh(c,t.getBoundingClientRect())&&n(),S=!1}try{r=new IntersectionObserver(C,{...x,root:o.ownerDocument})}catch{r=new IntersectionObserver(C,x)}r.observe(t)}return n(!0),s}function Rh(t,e,r,i){i===void 0&&(i={});let{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=i,c=ba(t),f=o||s?[...c?zi(c):[],...zi(e)]:[];f.forEach(p=>{o&&p.addEventListener("scroll",r,{passive:!0}),s&&p.addEventListener("resize",r)});let m=c&&a?U1(c,r):null,_=-1,g=null;n&&(g=new ResizeObserver(p=>{let[v]=p;v&&v.target===c&&g&&(g.unobserve(e),cancelAnimationFrame(_),_=requestAnimationFrame(()=>{var x;(x=g)==null||x.observe(e)})),r()}),c&&!l&&g.observe(c),g.observe(e));let h,d=l?di(t):null;l&&u();function u(){let p=di(t);d&&!Mh(d,p)&&r(),d=p,h=requestAnimationFrame(u)}return r(),()=>{var p;f.forEach(v=>{o&&v.removeEventListener("scroll",r),s&&v.removeEventListener("resize",r)}),m?.(),(p=g)==null||p.disconnect(),g=null,l&&cancelAnimationFrame(h)}}var Dh=ph;var Lh=fh,$h=dh,_a=mh;var Bh=uh;var zh=(t,e,r)=>{let i=new Map,o={platform:Ss,...r},s={...o.platform,_c:i};return hh(t,e,{...o,platform:s})};function W1(){return typeof window<"u"}function Oh(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function j1(t){return W1()?t instanceof Element||t instanceof Oh(t).Element:!1}var G1=["transform","translate","scale","rotate","perspective"],K1=["transform","translate","scale","rotate","perspective","filter"],X1=["paint","layout","strict","content"];function Ih(t){let e=Y1(),r=j1(t)?Z1(t):t;return G1.some(i=>r[i]?r[i]!=="none":!1)||(r.containerType?r.containerType!=="normal":!1)||!e&&(r.backdropFilter?r.backdropFilter!=="none":!1)||!e&&(r.filter?r.filter!=="none":!1)||K1.some(i=>(r.willChange||"").includes(i))||X1.some(i=>(r.contain||"").includes(i))}function Y1(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Z1(t){return Oh(t).getComputedStyle(t)}function Ph(t){return J1(t)}function ya(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function J1(t){for(let e=t;e;e=ya(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=ya(t);e;e=ya(e)){if(!(e instanceof Element))continue;let r=getComputedStyle(e);if(r.display!=="contents"&&(r.position!=="static"||Ih(r)||e.tagName==="BODY"))return e}return null}function Q1(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:!0)}var ze=class extends fe{constructor(){super(...arguments),this.localize=new Ne(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom"),i=0,o=0,s=0,n=0,a=0,l=0,c=0,f=0;r?t.top<e.top?(i=t.left,o=t.bottom,s=t.right,n=t.bottom,a=e.left,l=e.top,c=e.right,f=e.top):(i=e.left,o=e.bottom,s=e.right,n=e.bottom,a=t.left,l=t.top,c=t.right,f=t.top):t.left<e.left?(i=t.right,o=t.top,s=e.left,n=e.top,a=t.right,l=t.bottom,c=e.left,f=e.bottom):(i=e.right,o=e.top,s=t.left,n=t.top,a=e.right,l=e.bottom,c=t.left,f=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${f}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Q1(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=Rh(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Dh({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(_a({apply:({rects:r})=>{let i=this.sync==="width"||this.sync==="both",o=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${r.reference.width}px`:"",this.popup.style.height=o?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push($h({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Lh({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(_a({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Bh({element:this.arrowEl,padding:this.arrowPadding}));let e=this.strategy==="absolute"?r=>Ss.getOffsetParent(r,Ph):Ss.getOffsetParent;zh(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Or(Mt({},Ss),{getOffsetParent:e})}).then(({x:r,y:i,middlewareData:o,placement:s})=>{let n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${r}px`,top:`${i}px`}),this.arrow){let l=o.arrow.x,c=o.arrow.y,f="",m="",_="",g="";if(this.arrowPlacement==="start"){let h=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",m=n?h:"",g=n?"":h}else if(this.arrowPlacement==="end"){let h=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=n?"":h,g=n?h:"",_=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(g=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",f=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof l=="number"?`${l}px`:"",f=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:f,right:m,bottom:_,left:g,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return W`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${_e({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${_e({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?W`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};ze.styles=[ye,ih];T([pe(".popup")],ze.prototype,"popup",2);T([pe(".popup__arrow")],ze.prototype,"arrowEl",2);T([z()],ze.prototype,"anchor",2);T([z({type:Boolean,reflect:!0})],ze.prototype,"active",2);T([z({reflect:!0})],ze.prototype,"placement",2);T([z({reflect:!0})],ze.prototype,"strategy",2);T([z({type:Number})],ze.prototype,"distance",2);T([z({type:Number})],ze.prototype,"skidding",2);T([z({type:Boolean})],ze.prototype,"arrow",2);T([z({attribute:"arrow-placement"})],ze.prototype,"arrowPlacement",2);T([z({attribute:"arrow-padding",type:Number})],ze.prototype,"arrowPadding",2);T([z({type:Boolean})],ze.prototype,"flip",2);T([z({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],ze.prototype,"flipFallbackPlacements",2);T([z({attribute:"flip-fallback-strategy"})],ze.prototype,"flipFallbackStrategy",2);T([z({type:Object})],ze.prototype,"flipBoundary",2);T([z({attribute:"flip-padding",type:Number})],ze.prototype,"flipPadding",2);T([z({type:Boolean})],ze.prototype,"shift",2);T([z({type:Object})],ze.prototype,"shiftBoundary",2);T([z({attribute:"shift-padding",type:Number})],ze.prototype,"shiftPadding",2);T([z({attribute:"auto-size"})],ze.prototype,"autoSize",2);T([z()],ze.prototype,"sync",2);T([z({type:Object})],ze.prototype,"autoSizeBoundary",2);T([z({attribute:"auto-size-padding",type:Number})],ze.prototype,"autoSizePadding",2);T([z({attribute:"hover-bridge",type:Boolean})],ze.prototype,"hoverBridge",2);var Fh=new Map,eg=new WeakMap;function tg(t){return t??{keyframes:[],options:{duration:0}}}function Hh(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Pi(t,e){Fh.set(t,tg(e))}function Hi(t,e,r){let i=eg.get(t);if(i?.[e])return Hh(i[e],r.dir);let o=Fh.get(e);return o?Hh(o,r.dir):{keyframes:[],options:{duration:0}}}function Fi(t,e){return new Promise(r=>{function i(o){o.target===t&&(t.removeEventListener(e,i),r())}t.addEventListener(e,i)})}function Ni(t,e,r){return new Promise(i=>{if(r?.duration===1/0)throw new Error("Promise-based animations must be finite.");let o=t.animate(e,Or(Mt({},r),{duration:rg()?0:r.duration}));o.addEventListener("cancel",i,{once:!0}),o.addEventListener("finish",i,{once:!0})})}function rg(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function qi(t){return Promise.all(t.getAnimations().map(e=>new Promise(r=>{e.cancel(),requestAnimationFrame(r)})))}var lt=class extends fe{constructor(){super(...arguments),this.localize=new Ne(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}let r=(i,o)=>{if(!i)return null;let s=i.closest(o);if(s)return s;let n=i.getRootNode();return n instanceof ShadowRoot?r(n.host,o):null};setTimeout(()=>{var i;let o=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?eh():document.activeElement;(!this.containingElement||r(o,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:!0})[0];typeof t?.focus=="function"&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let e=this.getMenu();if(e){let r=e.getAllItems(),i=r[0],o=r[r.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),r.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(i),i.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(o),o.focus())}))}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){let e=this.trigger.assignedElements({flatten:!0}).find(i=>rh(i).start),r;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":r=e.button;break;default:r=e}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Fi(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Fi(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await qi(this),this.panel.hidden=!1,this.popup.active=!0;let{keyframes:t,options:e}=Hi(this,"dropdown.show",{dir:this.localize.dir()});await Ni(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await qi(this);let{keyframes:t,options:e}=Hi(this,"dropdown.hide",{dir:this.localize.dir()});await Ni(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return W`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${ee(this.sync?this.sync:void 0)}
        class=${_e({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};lt.styles=[ye,Zc];lt.dependencies={"sl-popup":ze};T([pe(".dropdown")],lt.prototype,"popup",2);T([pe(".dropdown__trigger")],lt.prototype,"trigger",2);T([pe(".dropdown__panel")],lt.prototype,"panel",2);T([z({type:Boolean,reflect:!0})],lt.prototype,"open",2);T([z({reflect:!0})],lt.prototype,"placement",2);T([z({type:Boolean,reflect:!0})],lt.prototype,"disabled",2);T([z({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],lt.prototype,"stayOpenOnSelect",2);T([z({attribute:!1})],lt.prototype,"containingElement",2);T([z({type:Number})],lt.prototype,"distance",2);T([z({type:Number})],lt.prototype,"skidding",2);T([z({type:Boolean})],lt.prototype,"hoist",2);T([z({reflect:!0})],lt.prototype,"sync",2);T([be("open",{waitUntilFirstUpdate:!0})],lt.prototype,"handleOpenChange",1);Pi("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Pi("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Nh=ue`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;function gt(t,e,r){let i=o=>Object.is(o,-0)?0:o;return t<e?i(e):t>r?i(r):i(t)}var qh=ue`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;var wa=class extends fe{constructor(){super(...arguments),this.localize=new Ne(this)}render(){return W`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};wa.styles=[ye,qh];var De=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Xe(this,"[default]","prefix","suffix"),this.localize=new Ne(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Bi}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){let t=this.isLink(),e=t?$i`a`:$i`button`;return Nr`
      <${e}
        part="base"
        class=${_e({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${ee(t?void 0:this.disabled)}
        type=${ee(t?void 0:this.type)}
        title=${this.title}
        name=${ee(t?void 0:this.name)}
        value=${ee(t?void 0:this.value)}
        href=${ee(t&&!this.disabled?this.href:void 0)}
        target=${ee(t?this.target:void 0)}
        download=${ee(t?this.download:void 0)}
        rel=${ee(t?this.rel:void 0)}
        role=${ee(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Nr` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Nr`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};De.styles=[ye,Eo];De.dependencies={"sl-icon":$e,"sl-spinner":wa};T([pe(".button")],De.prototype,"button",2);T([he()],De.prototype,"hasFocus",2);T([he()],De.prototype,"invalid",2);T([z()],De.prototype,"title",2);T([z({reflect:!0})],De.prototype,"variant",2);T([z({reflect:!0})],De.prototype,"size",2);T([z({type:Boolean,reflect:!0})],De.prototype,"caret",2);T([z({type:Boolean,reflect:!0})],De.prototype,"disabled",2);T([z({type:Boolean,reflect:!0})],De.prototype,"loading",2);T([z({type:Boolean,reflect:!0})],De.prototype,"outline",2);T([z({type:Boolean,reflect:!0})],De.prototype,"pill",2);T([z({type:Boolean,reflect:!0})],De.prototype,"circle",2);T([z()],De.prototype,"type",2);T([z()],De.prototype,"name",2);T([z()],De.prototype,"value",2);T([z()],De.prototype,"href",2);T([z()],De.prototype,"target",2);T([z()],De.prototype,"rel",2);T([z()],De.prototype,"download",2);T([z()],De.prototype,"form",2);T([z({attribute:"formaction"})],De.prototype,"formAction",2);T([z({attribute:"formenctype"})],De.prototype,"formEnctype",2);T([z({attribute:"formmethod"})],De.prototype,"formMethod",2);T([z({attribute:"formnovalidate",type:Boolean})],De.prototype,"formNoValidate",2);T([z({attribute:"formtarget"})],De.prototype,"formTarget",2);T([be("disabled",{waitUntilFirstUpdate:!0})],De.prototype,"handleDisabledChange",1);var Vh="important",ig=" !"+Vh,Nt=Tt(class extends zt{constructor(t){if(super(t),t.type!==ft.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{let i=t[r];return i==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(t,[e]){let{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?r.removeProperty(i):r[i]=null);for(let i in e){let o=e[i];if(o!=null){this.ft.add(i);let s=typeof o=="string"&&o.endsWith(ig);i.includes("-")||s?r.setProperty(i,s?o.slice(0,-11):o,s?Vh:""):r[i]=o}}return st}});function tt(t,e){sg(t)&&(t="100%");let r=og(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),r&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function ks(t){return Math.min(1,Math.max(0,t))}function sg(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function og(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Po(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Cs(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Vr(t){return t.length===1?"0"+t:String(t)}function Uh(t,e,r){return{r:tt(t,255)*255,g:tt(e,255)*255,b:tt(r,255)*255}}function Sa(t,e,r){t=tt(t,255),e=tt(e,255),r=tt(r,255);let i=Math.max(t,e,r),o=Math.min(t,e,r),s=0,n=0,a=(i+o)/2;if(i===o)n=0,s=0;else{let l=i-o;switch(n=a>.5?l/(2-i-o):l/(i+o),i){case t:s=(e-r)/l+(e<r?6:0);break;case e:s=(r-t)/l+2;break;case r:s=(t-e)/l+4;break;default:break}s/=6}return{h:s,s:n,l:a}}function xa(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+(e-t)*(6*r):r<1/2?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function Wh(t,e,r){let i,o,s;if(t=tt(t,360),e=tt(e,100),r=tt(r,100),e===0)o=r,s=r,i=r;else{let n=r<.5?r*(1+e):r+e-r*e,a=2*r-n;i=xa(a,n,t+1/3),o=xa(a,n,t),s=xa(a,n,t-1/3)}return{r:i*255,g:o*255,b:s*255}}function ka(t,e,r){t=tt(t,255),e=tt(e,255),r=tt(r,255);let i=Math.max(t,e,r),o=Math.min(t,e,r),s=0,n=i,a=i-o,l=i===0?0:a/i;if(i===o)s=0;else{switch(i){case t:s=(e-r)/a+(e<r?6:0);break;case e:s=(r-t)/a+2;break;case r:s=(t-e)/a+4;break;default:break}s/=6}return{h:s,s:l,v:n}}function jh(t,e,r){t=tt(t,360)*6,e=tt(e,100),r=tt(r,100);let i=Math.floor(t),o=t-i,s=r*(1-e),n=r*(1-o*e),a=r*(1-(1-o)*e),l=i%6,c=[r,n,s,s,a,r][l],f=[a,r,r,n,s,s][l],m=[s,s,a,r,r,n][l];return{r:c*255,g:f*255,b:m*255}}function Ca(t,e,r,i){let o=[Vr(Math.round(t).toString(16)),Vr(Math.round(e).toString(16)),Vr(Math.round(r).toString(16))];return i&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function Gh(t,e,r,i,o){let s=[Vr(Math.round(t).toString(16)),Vr(Math.round(e).toString(16)),Vr(Math.round(r).toString(16)),Vr(ng(i))];return o&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function Kh(t,e,r,i){let o=t/100,s=e/100,n=r/100,a=i/100,l=255*(1-o)*(1-a),c=255*(1-s)*(1-a),f=255*(1-n)*(1-a);return{r:l,g:c,b:f}}function Ea(t,e,r){let i=1-t/255,o=1-e/255,s=1-r/255,n=Math.min(i,o,s);return n===1?(i=0,o=0,s=0):(i=(i-n)/(1-n)*100,o=(o-n)/(1-n)*100,s=(s-n)/(1-n)*100),n*=100,{c:Math.round(i),m:Math.round(o),y:Math.round(s),k:Math.round(n)}}function ng(t){return Math.round(parseFloat(t)*255).toString(16)}function Aa(t){return kt(t)/255}function kt(t){return parseInt(t,16)}function Xh(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}var Es={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function Yh(t){let e={r:0,g:0,b:0},r=1,i=null,o=null,s=null,n=!1,a=!1;return typeof t=="string"&&(t=cg(t)),typeof t=="object"&&(Rt(t.r)&&Rt(t.g)&&Rt(t.b)?(e=Uh(t.r,t.g,t.b),n=!0,a=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Rt(t.h)&&Rt(t.s)&&Rt(t.v)?(i=Cs(t.s),o=Cs(t.v),e=jh(t.h,i,o),n=!0,a="hsv"):Rt(t.h)&&Rt(t.s)&&Rt(t.l)?(i=Cs(t.s),s=Cs(t.l),e=Wh(t.h,i,s),n=!0,a="hsl"):Rt(t.c)&&Rt(t.m)&&Rt(t.y)&&Rt(t.k)&&(e=Kh(t.c,t.m,t.y,t.k),n=!0,a="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(r=t.a)),r=Po(r),{ok:n,format:t.format||a,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}var ag="[-\\+]?\\d+%?",lg="[-\\+]?\\d*\\.\\d+%?",Ur="(?:"+lg+")|(?:"+ag+")",Ta="[\\s|\\(]+("+Ur+")[,|\\s]+("+Ur+")[,|\\s]+("+Ur+")\\s*\\)?",Ho="[\\s|\\(]+("+Ur+")[,|\\s]+("+Ur+")[,|\\s]+("+Ur+")[,|\\s]+("+Ur+")\\s*\\)?",qt={CSS_UNIT:new RegExp(Ur),rgb:new RegExp("rgb"+Ta),rgba:new RegExp("rgba"+Ho),hsl:new RegExp("hsl"+Ta),hsla:new RegExp("hsla"+Ho),hsv:new RegExp("hsv"+Ta),hsva:new RegExp("hsva"+Ho),cmyk:new RegExp("cmyk"+Ho),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function cg(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(Es[t])t=Es[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let r=qt.rgb.exec(t);return r?{r:r[1],g:r[2],b:r[3]}:(r=qt.rgba.exec(t),r?{r:r[1],g:r[2],b:r[3],a:r[4]}:(r=qt.hsl.exec(t),r?{h:r[1],s:r[2],l:r[3]}:(r=qt.hsla.exec(t),r?{h:r[1],s:r[2],l:r[3],a:r[4]}:(r=qt.hsv.exec(t),r?{h:r[1],s:r[2],v:r[3]}:(r=qt.hsva.exec(t),r?{h:r[1],s:r[2],v:r[3],a:r[4]}:(r=qt.cmyk.exec(t),r?{c:r[1],m:r[2],y:r[3],k:r[4]}:(r=qt.hex8.exec(t),r?{r:kt(r[1]),g:kt(r[2]),b:kt(r[3]),a:Aa(r[4]),format:e?"name":"hex8"}:(r=qt.hex6.exec(t),r?{r:kt(r[1]),g:kt(r[2]),b:kt(r[3]),format:e?"name":"hex"}:(r=qt.hex4.exec(t),r?{r:kt(r[1]+r[1]),g:kt(r[2]+r[2]),b:kt(r[3]+r[3]),a:Aa(r[4]+r[4]),format:e?"name":"hex8"}:(r=qt.hex3.exec(t),r?{r:kt(r[1]+r[1]),g:kt(r[2]+r[2]),b:kt(r[3]+r[3]),format:e?"name":"hex"}:!1))))))))))}function Rt(t){return typeof t=="number"?!Number.isNaN(t):qt.CSS_UNIT.test(t)}var As=class t{constructor(e="",r={}){if(e instanceof t)return e;typeof e=="number"&&(e=Xh(e)),this.originalInput=e;let i=Yh(e);this.originalInput=e,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=r.format??i.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){let e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){let e=this.toRgb(),r,i,o,s=e.r/255,n=e.g/255,a=e.b/255;return s<=.03928?r=s/12.92:r=Math.pow((s+.055)/1.055,2.4),n<=.03928?i=n/12.92:i=Math.pow((n+.055)/1.055,2.4),a<=.03928?o=a/12.92:o=Math.pow((a+.055)/1.055,2.4),.2126*r+.7152*i+.0722*o}getAlpha(){return this.a}setAlpha(e){return this.a=Po(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:e}=this.toHsl();return e===0}toHsv(){let e=ka(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){let e=ka(this.r,this.g,this.b),r=Math.round(e.h*360),i=Math.round(e.s*100),o=Math.round(e.v*100);return this.a===1?`hsv(${r}, ${i}%, ${o}%)`:`hsva(${r}, ${i}%, ${o}%, ${this.roundA})`}toHsl(){let e=Sa(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){let e=Sa(this.r,this.g,this.b),r=Math.round(e.h*360),i=Math.round(e.s*100),o=Math.round(e.l*100);return this.a===1?`hsl(${r}, ${i}%, ${o}%)`:`hsla(${r}, ${i}%, ${o}%, ${this.roundA})`}toHex(e=!1){return Ca(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return Gh(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let e=Math.round(this.r),r=Math.round(this.g),i=Math.round(this.b);return this.a===1?`rgb(${e}, ${r}, ${i})`:`rgba(${e}, ${r}, ${i}, ${this.roundA})`}toPercentageRgb(){let e=r=>`${Math.round(tt(r,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){let e=r=>Math.round(tt(r,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...Ea(this.r,this.g,this.b)}}toCmykString(){let{c:e,m:r,y:i,k:o}=Ea(this.r,this.g,this.b);return`cmyk(${e}, ${r}, ${i}, ${o})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;let e="#"+Ca(this.r,this.g,this.b,!1);for(let[r,i]of Object.entries(Es))if(e===i)return r;return!1}toString(e){let r=!!e;e=e??this.format;let i=!1,o=this.a<1&&this.a>=0;return!r&&o&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(i=this.toRgbString()),e==="prgb"&&(i=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(i=this.toHexString()),e==="hex3"&&(i=this.toHexString(!0)),e==="hex4"&&(i=this.toHex8String(!0)),e==="hex8"&&(i=this.toHex8String()),e==="name"&&(i=this.toName()),e==="hsl"&&(i=this.toHslString()),e==="hsv"&&(i=this.toHsvString()),e==="cmyk"&&(i=this.toCmykString()),i||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new t(this.toString())}lighten(e=10){let r=this.toHsl();return r.l+=e/100,r.l=ks(r.l),new t(r)}brighten(e=10){let r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(255*-(e/100)))),r.g=Math.max(0,Math.min(255,r.g-Math.round(255*-(e/100)))),r.b=Math.max(0,Math.min(255,r.b-Math.round(255*-(e/100)))),new t(r)}darken(e=10){let r=this.toHsl();return r.l-=e/100,r.l=ks(r.l),new t(r)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){let r=this.toHsl();return r.s-=e/100,r.s=ks(r.s),new t(r)}saturate(e=10){let r=this.toHsl();return r.s+=e/100,r.s=ks(r.s),new t(r)}greyscale(){return this.desaturate(100)}spin(e){let r=this.toHsl(),i=(r.h+e)%360;return r.h=i<0?360+i:i,new t(r)}mix(e,r=50){let i=this.toRgb(),o=new t(e).toRgb(),s=r/100,n={r:(o.r-i.r)*s+i.r,g:(o.g-i.g)*s+i.g,b:(o.b-i.b)*s+i.b,a:(o.a-i.a)*s+i.a};return new t(n)}analogous(e=6,r=30){let i=this.toHsl(),o=360/r,s=[this];for(i.h=(i.h-(o*e>>1)+720)%360;--e;)i.h=(i.h+o)%360,s.push(new t(i));return s}complement(){let e=this.toHsl();return e.h=(e.h+180)%360,new t(e)}monochromatic(e=6){let r=this.toHsv(),{h:i}=r,{s:o}=r,{v:s}=r,n=[],a=1/e;for(;e--;)n.push(new t({h:i,s:o,v:s})),s=(s+a)%1;return n}splitcomplement(){let e=this.toHsl(),{h:r}=e;return[this,new t({h:(r+72)%360,s:e.s,l:e.l}),new t({h:(r+216)%360,s:e.s,l:e.l})]}onBackground(e){let r=this.toRgb(),i=new t(e).toRgb(),o=r.a+i.a*(1-r.a);return new t({r:(r.r*r.a+i.r*i.a*(1-r.a))/o,g:(r.g*r.a+i.g*i.a*(1-r.a))/o,b:(r.b*r.a+i.b*i.a*(1-r.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){let r=this.toHsl(),{h:i}=r,o=[this],s=360/e;for(let n=1;n<e;n++)o.push(new t({h:(i+n*s)%360,s:r.s,l:r.l}));return o}equals(e){let r=new t(e);return this.format==="cmyk"||r.format==="cmyk"?this.toCmykString()===r.toCmykString():this.toRgbString()===r.toRgbString()}};var Zh="EyeDropper"in window,Ae=class extends fe{constructor(){super(),this.formControlController=new ot(this),this.isSafeValue=!1,this.localize=new Ne(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){let t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),r=e.querySelector(".color-picker__slider-handle"),{width:i}=e.getBoundingClientRect(),o=this.value,s=this.value;r.focus(),t.preventDefault(),Ao(e,{onMove:n=>{this.alpha=gt(n/i*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"))},initialEvent:t})}handleHueDrag(t){let e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),r=e.querySelector(".color-picker__slider-handle"),{width:i}=e.getBoundingClientRect(),o=this.value,s=this.value;r.focus(),t.preventDefault(),Ao(e,{onMove:n=>{this.hue=gt(n/i*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==o&&(o=this.value,this.emit("sl-change"))},initialEvent:t})}handleGridDrag(t){let e=this.shadowRoot.querySelector(".color-picker__grid"),r=e.querySelector(".color-picker__grid-handle"),{width:i,height:o}=e.getBoundingClientRect(),s=this.value,n=this.value;r.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,Ao(e,{onMove:(a,l)=>{this.saturation=gt(a/i*100,0,100),this.brightness=gt(100-l/o*100,0,100),this.syncValues(),this.value!==n&&(n=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==s&&(s=this.value,this.emit("sl-change"))},initialEvent:t})}handleAlphaKeyDown(t){let e=t.shiftKey?10:1,r=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=gt(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=gt(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(t){let e=t.shiftKey?10:1,r=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=gt(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=gt(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(t){let e=t.shiftKey?10:1,r=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=gt(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=gt(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=gt(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=gt(this.brightness-e,0,100),this.syncValues()),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(t){let e=t.target,r=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==r&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){let e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleTouchMove(t){t.preventDefault()}parseColor(t){let e=new As(t);if(!e.isValid)return null;let r=e.toHsl(),i={h:r.h,s:r.s*100,l:r.l*100,a:r.a},o=e.toRgb(),s=e.toHexString(),n=e.toHex8String(),a=e.toHsv(),l={h:a.h,s:a.s*100,v:a.v*100,a:a.a};return{hsl:{h:i.h,s:i.s,l:i.l,string:this.setLetterCase(`hsl(${Math.round(i.h)}, ${Math.round(i.s)}%, ${Math.round(i.l)}%)`)},hsla:{h:i.h,s:i.s,l:i.l,a:i.a,string:this.setLetterCase(`hsla(${Math.round(i.h)}, ${Math.round(i.s)}%, ${Math.round(i.l)}%, ${i.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:o.r,g:o.g,b:o.b,string:this.setLetterCase(`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`)},rgba:{r:o.r,g:o.g,b:o.b,a:o.a,string:this.setLetterCase(`rgba(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)}, ${o.a.toFixed(2).toString()})`)},hex:this.setLetterCase(s),hexa:this.setLetterCase(n)}}setColor(t){let e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!Zh)return;new EyeDropper().open().then(e=>{let r=this.value;this.setColor(e.sRGBHex),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(t){let e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(t,e,r,i=100){let o=new As(`hsva(${t}, ${e}%, ${r}%, ${i/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let r=this.parseColor(e);r!==null?(this.inputValue=this.value,this.hue=r.hsva.h,this.saturation=r.hsva.s,this.brightness=r.hsva.v,this.alpha=r.hsva.a*100,this.syncValues()):this.inputValue=t??""}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t)}blur(){var t;let e=this.inline?this.base:this.trigger;this.hasFocus&&(e.focus({preventScroll:!0}),e.blur()),(t=this.dropdown)!=null&&t.open&&this.dropdown.hide()}getFormattedValue(t="hex"){let e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:!0}),this.disabled||this.formControlController.emitInvalidEvent(),!1):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.saturation,e=100-this.brightness,r=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(o=>o.trim()!==""),i=W`
      <div
        part="base"
        class=${_e({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?W`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${Nt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${_e({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${Nt({top:`${e}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${ee(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${Nt({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${ee(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?W`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${Nt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${Nt({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${ee(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${Nt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":W`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${Zh?W`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${r.length>0?W`
              <div part="swatches" class="color-picker__swatches">
                ${r.map(o=>{let s=this.parseColor(o);return s?W`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${ee(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${o}
                      @click=${()=>this.selectSwatch(o)}
                      @keydown=${n=>!this.disabled&&n.key==="Enter"&&this.setColor(s.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${Nt({backgroundColor:s.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${o}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?i:W`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${_e({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":!0})}
          style=${Nt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${i}
      </sl-dropdown>
    `}};Ae.styles=[ye,Nh];Ae.dependencies={"sl-button-group":qr,"sl-button":De,"sl-dropdown":lt,"sl-icon":$e,"sl-input":Se,"sl-visually-hidden":fa};T([pe('[part~="base"]')],Ae.prototype,"base",2);T([pe('[part~="input"]')],Ae.prototype,"input",2);T([pe(".color-dropdown")],Ae.prototype,"dropdown",2);T([pe('[part~="preview"]')],Ae.prototype,"previewButton",2);T([pe('[part~="trigger"]')],Ae.prototype,"trigger",2);T([he()],Ae.prototype,"hasFocus",2);T([he()],Ae.prototype,"isDraggingGridHandle",2);T([he()],Ae.prototype,"isEmpty",2);T([he()],Ae.prototype,"inputValue",2);T([he()],Ae.prototype,"hue",2);T([he()],Ae.prototype,"saturation",2);T([he()],Ae.prototype,"brightness",2);T([he()],Ae.prototype,"alpha",2);T([z()],Ae.prototype,"value",2);T([Pt()],Ae.prototype,"defaultValue",2);T([z()],Ae.prototype,"label",2);T([z()],Ae.prototype,"format",2);T([z({type:Boolean,reflect:!0})],Ae.prototype,"inline",2);T([z({reflect:!0})],Ae.prototype,"size",2);T([z({attribute:"no-format-toggle",type:Boolean})],Ae.prototype,"noFormatToggle",2);T([z()],Ae.prototype,"name",2);T([z({type:Boolean,reflect:!0})],Ae.prototype,"disabled",2);T([z({type:Boolean})],Ae.prototype,"hoist",2);T([z({type:Boolean})],Ae.prototype,"opacity",2);T([z({type:Boolean})],Ae.prototype,"uppercase",2);T([z()],Ae.prototype,"swatches",2);T([z({reflect:!0})],Ae.prototype,"form",2);T([z({type:Boolean,reflect:!0})],Ae.prototype,"required",2);T([ki({passive:!1})],Ae.prototype,"handleTouchMove",1);T([be("format",{waitUntilFirstUpdate:!0})],Ae.prototype,"handleFormatChange",1);T([be("opacity",{waitUntilFirstUpdate:!0})],Ae.prototype,"handleOpacityChange",1);T([be("value")],Ae.prototype,"handleValueChange",1);Ae.define("sl-color-picker");var Jh=t=>W`
	<div class="theme-shoelace widget-color-picker">
		<label>${t.label}</label>
		<sl-color-picker
			.label=${t.label??""}
			value=${t.value?String(t.value):""}
			@sl-change=${e=>{let r=e.target.value;t.valueChangedCallback?.(r)}}
			.disabled=${t.disabled}
		></sl-color-picker>

		<div class="widget-color-picker__description">${t.helpText}</div>
	</div>
`;var Qh=t=>W`
	<sl-input
		type=${t.type}
		.label=${t.label??""}
		.helpText=${t.helpText??""}
		value=${t.value?t.value:""}
		.name=${t.id}
		.id=${t.id}
		.required=${t.required??!1}
		@sl-input=${e=>{let{value:r}=e.target;t.type==="datetime-local"&&(r=new Date(r)),t.valueChangedCallback?.(r)}}
		.disabled=${t.disabled}
		.readonly=${t.readonly}
	>
	</sl-input>
`;var eu=t=>W` <!--  -->
		<sl-input
			type="number"
			value=${ee(t.value)}
			step=${ee(t.step)}
			min=${ee(t.min)}
			max=${ee(t.max)}
			.label=${t.label}
			.helpText=${t.helpText}
			placeholder=${t.placeholder}
			.name=${t.id}
			.id=${t.id}
			.required=${t.required}
			@sl-input=${e=>{let r=e.target.valueAsNumber;console.log(r),t.valueChangedCallback?.(r)}}
			.disabled=${t.disabled}
			.readonly=${t.readonly}
		></sl-input>`;var tu=t=>W`
	<fieldset
		id=${t.id}
		class="theme-shoelace widget-object widget-fieldset level-${t.level}"
		part="object"
	>
		${t.label?W`<legend>${t.label}</legend>`:""}
		<!-- -->
		${t.helpText?W`<div class="widget-fieldset__description">
					${t.helpText}
			  </div>`:ke}
		<!--  -->
		${t.children}
	</fieldset>
`;var ru=ue`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`;var Jt=class extends fe{constructor(){super(),this.checked=!1,this.hasFocus=!1,this.size="medium",this.disabled=!1,this.handleBlur=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=!0)},this.handleFocus=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return W`
      <span
        part="base"
        class=${_e({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?W` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Jt.styles=[ye,ru];Jt.dependencies={"sl-icon":$e};T([he()],Jt.prototype,"checked",2);T([he()],Jt.prototype,"hasFocus",2);T([z()],Jt.prototype,"value",2);T([z({reflect:!0})],Jt.prototype,"size",2);T([z({type:Boolean,reflect:!0})],Jt.prototype,"disabled",2);T([be("checked")],Jt.prototype,"handleCheckedChange",1);T([be("disabled",{waitUntilFirstUpdate:!0})],Jt.prototype,"handleDisabledChange",1);Jt.define("sl-radio");var iu=t=>W`
	<sl-radio-group
		class="theme-shoelace widget-radio-group"
		size="medium"
		.label=${t.label??""}
		.helpText=${t.helpText??""}
		value=${typeof t.value<"u"?String(t.value):""}
		.name=${t.id}
		.required=${t.required??!1}
		@sl-change=${e=>{let r=e.target.value;t.type==="number"&&(r=Number(r)),t.valueChangedCallback?.(r)}}
	>
		${t.enum?.map(e=>W`<sl-radio .disabled=${t.disabled} value=${String(e)}
					>${e}</sl-radio
				>`)}
	</sl-radio-group>
`;var su=t=>W`
	<!-- TODO: Disabled state (not supported by Shoelace for this specific field despite the docs?) -->
	<sl-radio-group
		class="theme-shoelace widget-radio-group-boolean"
		size="medium"
		.label=${t.label??""}
		.helpText=${t.helpText??""}
		value=${typeof t.value<"u"?String(t.value):""}
		.name=${t.id}
		.required=${t.required??!1}
		@sl-change=${e=>{let r=e.target.value;t.valueChangedCallback?.(r==="true")}}
	>
		<sl-radio .disabled=${t.disabled} value="true"
			>${t.trueLabel??"Yes"}</sl-radio
		>
		<sl-radio .disabled=${t.disabled} value="false"
			>${t.falseLabel??"No"}</sl-radio
		>
	</sl-radio-group>
`;var ou=ue`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`;var qe=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this),this.hasSlotController=new Xe(this,"help-text","label"),this.localize=new Ne(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.resizeObserver)==null||t.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`)}syncTooltip(t){if(this.output!==null){let e=this.input.offsetWidth,r=this.output.offsetWidth,i=getComputedStyle(this.input).getPropertyValue("--thumb-size"),o=this.localize.dir()==="rtl",s=e*t;if(o){let n=`${e-s}px + ${t} * ${i}`;this.output.style.translate=`calc((${n} - ${r/2}px - ${i} / 2))`}else{let n=`${s}px - ${t} * ${i}`;this.output.style.translate=`calc(${n} - ${r/2}px + ${i} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){let t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t))}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}focus(t){this.input.focus(t)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e;return W`
      <div
        part="form-control"
        class=${_e({"form-control":!0,"form-control--medium":!0,"form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${_e({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${ee(this.name)}
              ?disabled=${this.disabled}
              min=${ee(this.min)}
              max=${ee(this.max)}
              step=${ee(this.step)}
              .value=${Kt(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?W`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};qe.styles=[ye,xt,ou];T([pe(".range__control")],qe.prototype,"input",2);T([pe(".range__tooltip")],qe.prototype,"output",2);T([he()],qe.prototype,"hasFocus",2);T([he()],qe.prototype,"hasTooltip",2);T([z()],qe.prototype,"title",2);T([z()],qe.prototype,"name",2);T([z({type:Number})],qe.prototype,"value",2);T([z()],qe.prototype,"label",2);T([z({attribute:"help-text"})],qe.prototype,"helpText",2);T([z({type:Boolean,reflect:!0})],qe.prototype,"disabled",2);T([z({type:Number})],qe.prototype,"min",2);T([z({type:Number})],qe.prototype,"max",2);T([z({type:Number})],qe.prototype,"step",2);T([z()],qe.prototype,"tooltip",2);T([z({attribute:!1})],qe.prototype,"tooltipFormatter",2);T([z({reflect:!0})],qe.prototype,"form",2);T([Pt()],qe.prototype,"defaultValue",2);T([ki({passive:!0})],qe.prototype,"handleThumbDragStart",1);T([be("value",{waitUntilFirstUpdate:!0})],qe.prototype,"handleValueChange",1);T([be("disabled",{waitUntilFirstUpdate:!0})],qe.prototype,"handleDisabledChange",1);T([be("hasTooltip",{waitUntilFirstUpdate:!0})],qe.prototype,"syncRange",1);qe.define("sl-range");var nu=t=>W` <!--  -->
		<sl-range
			value=${ee(t.value)}
			step=${ee(t.step)}
			min=${ee(t.min)}
			max=${ee(t.max)}
			.label=${t.label}
			.helpText=${t.helpText}
			placeholder=${t.placeholder}
			.name=${t.id}
			.id=${t.id}
			.required=${t.required}
			@sl-input=${e=>{let r=e.target.value;console.log(r),t.valueChangedCallback?.(r)}}
			.disabled=${t.disabled}
		></sl-range>`;var au=ue`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;var Ts=class extends zt{constructor(e){if(super(e),this.it=ke,e.type!==ft.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ke||e==null)return this._t=void 0,this.it=e;if(e===st)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Ts.directiveName="unsafeHTML",Ts.resultType=1;var Wr=Tt(Ts);var ct=class extends fe{constructor(){super(...arguments),this.localize=new Ne(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){let e=this.localize.dir()==="rtl",{left:r,right:i,width:o}=this.rating.getBoundingClientRect(),s=e?this.roundToPrecision((i-t)/o*this.max,this.precision):this.roundToPrecision((t-r)/o*this.max,this.precision);return gt(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"))}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=!1)}handleKeyDown(t){let e=this.localize.dir()==="ltr",r=this.localize.dir()==="rtl",i=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||e&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"){let o=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-o),t.preventDefault()}if(t.key==="ArrowUp"||e&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"){let o=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+o),t.preventDefault()}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==i&&this.emit("sl-change")}}handleMouseEnter(t){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(t)}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(t){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=!1,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault()}roundToPrecision(t,e=.5){let r=1/e;return Math.ceil(t*r)/r}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}render(){let t=this.localize.dir()==="rtl",e=Array.from(Array(this.max).keys()),r=0;return this.disabled||this.readonly?r=this.value:r=this.isHovering?this.hoverValue:this.value,W`
      <div
        part="base"
        class=${_e({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${e.map(i=>r>i&&r<i+1?W`
                <span
                  class=${_e({rating__symbol:!0,"rating__partial-symbol-container":!0,"rating__symbol--hover":this.isHovering&&Math.ceil(r)===i+1})}
                  role="presentation"
                >
                  <div
                    style=${Nt({clipPath:t?`inset(0 ${(r-i)*100}% 0 0)`:`inset(0 0 0 ${(r-i)*100}%)`})}
                  >
                    ${Wr(this.getSymbol(i+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${Nt({clipPath:t?`inset(0 0 0 ${100-(r-i)*100}%)`:`inset(0 ${100-(r-i)*100}% 0 0)`})}
                  >
                    ${Wr(this.getSymbol(i+1))}
                  </div>
                </span>
              `:W`
              <span
                class=${_e({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(r)===i+1,"rating__symbol--active":r>=i+1})}
                role="presentation"
              >
                ${Wr(this.getSymbol(i+1))}
              </span>
            `)}
        </span>
      </div>
    `}};ct.styles=[ye,au];ct.dependencies={"sl-icon":$e};T([pe(".rating")],ct.prototype,"rating",2);T([he()],ct.prototype,"hoverValue",2);T([he()],ct.prototype,"isHovering",2);T([z()],ct.prototype,"label",2);T([z({type:Number})],ct.prototype,"value",2);T([z({type:Number})],ct.prototype,"max",2);T([z({type:Number})],ct.prototype,"precision",2);T([z({type:Boolean,reflect:!0})],ct.prototype,"readonly",2);T([z({type:Boolean,reflect:!0})],ct.prototype,"disabled",2);T([z()],ct.prototype,"getSymbol",2);T([ki({passive:!0})],ct.prototype,"handleTouchMove",1);T([be("hoverValue")],ct.prototype,"handleHoverValueChange",1);T([be("isHovering")],ct.prototype,"handleIsHoveringChange",1);ct.define("sl-rating");var lu=t=>W`<!--  -->
		<div class="theme-shoelace widget-rating" part="widget-rating">
			<label for=${t.id}>${t.label}</label>

			<sl-rating
				value=${ee(t.value)}
				precision=${ee(t.step)}
				min=${ee(t.min)}
				max=${ee(t.max)}
				.helpText=${t.helpText}
				.name=${t.id}
				.id=${t.id}
				.required=${t.required}
				@sl-change=${e=>{let r=e.target.value;console.log(r),t.valueChangedCallback?.(r)}}
				.disabled=${t.disabled}
				.readonly=${t.readonly}
			></sl-rating>
		</div>`;var cu=ue`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;function hg(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function hu(t,e,r="vertical",i="smooth"){let o=hg(t,e),s=o.top+e.scrollTop,n=o.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,f=e.scrollTop+e.offsetHeight;(r==="horizontal"||r==="both")&&(n<a?e.scrollTo({left:n,behavior:i}):n+t.clientWidth>l&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:i})),(r==="vertical"||r==="both")&&(s<c?e.scrollTo({top:s,behavior:i}):s+t.clientHeight>f&&e.scrollTo({top:s-e.offsetHeight+t.clientHeight,behavior:i}))}var Te=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Xe(this,"help-text","label"),this.localize=new Ne(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=!1,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>W`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let e=t.target,r=e.closest(".select__clear")!==null,i=e.closest("sl-icon-button")!==null;if(!(r||i)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let o=this.getAllOptions(),s=o.indexOf(this.currentOption),n=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=s+1,n>o.length-1&&(n=0)):t.key==="ArrowUp"?(n=s-1,n<0&&(n=o.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=o.length-1),this.setCurrentOption(o[n])}if(t.key&&t.key.length===1||t.key==="Backspace"){let o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let s of o)if(s.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){let r=t.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="sl-icon-button");this.disabled||r||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=!0,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let r=t.target.closest("sl-option"),i=this.value;r&&!r.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(r):this.setSelectedOptions(r),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==i&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());let t=this.getAllOptions(),e=this.valueHasChanged?this.value:this.defaultValue,r=Array.isArray(e)?e:[e],i=[];t.forEach(o=>i.push(o.value)),this.setSelectedOptions(t.filter(o=>r.includes(o.value)))}handleTagRemove(t,e){t.stopPropagation(),this.valueHasChanged=!0,this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(r=>{r.current=!1,r.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){let e=this.getAllOptions(),r=Array.isArray(t)?t:[t];e.forEach(i=>i.selected=!1),r.length&&r.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){var t,e,r;let i=this.getAllOptions();this.selectedOptions=i.filter(s=>s.selected);let o=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let s=this.selectedOptions[0];this.value=(t=s?.value)!=null?t:"",this.displayLabel=(r=(e=s?.getTextLabel)==null?void 0:e.call(s))!=null?r:""}this.valueHasChanged=o,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let r=this.getTag(t,e);return W`<div @sl-remove=${i=>this.handleTagRemove(i,t)}>
          ${typeof r=="string"?Wr(r):r}
        </div>`}else if(e===this.maxOptionsVisible)return W`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return W``})}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}attributeChangedCallback(t,e,r){if(super.attributeChangedCallback(t,e,r),t==="value"){let i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i}}handleValueChange(){if(!this.valueHasChanged){let r=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=r}let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(r=>e.includes(r.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await qi(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});let{keyframes:t,options:e}=Hi(this,"select.show",{dir:this.localize.dir()});await Ni(this.popup.popup,t,e),this.currentOption&&hu(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await qi(this);let{keyframes:t,options:e}=Hi(this,"select.hide",{dir:this.localize.dir()});await Ni(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Fi(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Fi(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e,o=this.clearable&&!this.disabled&&this.value.length>0,s=this.placeholder&&this.value&&this.value.length<=0;return W`
      <div
        part="form-control"
        class=${_e({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${_e({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":s,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?W`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${o?W`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Te.styles=[ye,xt,cu];Te.dependencies={"sl-icon":$e,"sl-popup":ze,"sl-tag":rr};T([pe(".select")],Te.prototype,"popup",2);T([pe(".select__combobox")],Te.prototype,"combobox",2);T([pe(".select__display-input")],Te.prototype,"displayInput",2);T([pe(".select__value-input")],Te.prototype,"valueInput",2);T([pe(".select__listbox")],Te.prototype,"listbox",2);T([he()],Te.prototype,"hasFocus",2);T([he()],Te.prototype,"displayLabel",2);T([he()],Te.prototype,"currentOption",2);T([he()],Te.prototype,"selectedOptions",2);T([he()],Te.prototype,"valueHasChanged",2);T([z()],Te.prototype,"name",2);T([he()],Te.prototype,"value",1);T([z({attribute:"value"})],Te.prototype,"defaultValue",2);T([z({reflect:!0})],Te.prototype,"size",2);T([z()],Te.prototype,"placeholder",2);T([z({type:Boolean,reflect:!0})],Te.prototype,"multiple",2);T([z({attribute:"max-options-visible",type:Number})],Te.prototype,"maxOptionsVisible",2);T([z({type:Boolean,reflect:!0})],Te.prototype,"disabled",2);T([z({type:Boolean})],Te.prototype,"clearable",2);T([z({type:Boolean,reflect:!0})],Te.prototype,"open",2);T([z({type:Boolean})],Te.prototype,"hoist",2);T([z({type:Boolean,reflect:!0})],Te.prototype,"filled",2);T([z({type:Boolean,reflect:!0})],Te.prototype,"pill",2);T([z()],Te.prototype,"label",2);T([z({reflect:!0})],Te.prototype,"placement",2);T([z({attribute:"help-text"})],Te.prototype,"helpText",2);T([z({reflect:!0})],Te.prototype,"form",2);T([z({type:Boolean,reflect:!0})],Te.prototype,"required",2);T([z()],Te.prototype,"getTag",2);T([be("disabled",{waitUntilFirstUpdate:!0})],Te.prototype,"handleDisabledChange",1);T([be(["defaultValue","value"],{waitUntilFirstUpdate:!0})],Te.prototype,"handleValueChange",1);T([be("open",{waitUntilFirstUpdate:!0})],Te.prototype,"handleOpenChange",1);Pi("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Pi("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});Te.define("sl-select");var uu=ue`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;var Dt=class extends fe{constructor(){super(...arguments),this.localize=new Ne(this),this.isInitialized=!1,this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{let t=this.closest("sl-select");t&&t.handleDefaultSlotChange()}):this.isInitialized=!0}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){let t=this.childNodes,e="";return[...t].forEach(r=>{r.nodeType===Node.ELEMENT_NODE&&(r.hasAttribute("slot")||(e+=r.textContent)),r.nodeType===Node.TEXT_NODE&&(e+=r.textContent)}),e.trim()}render(){return W`
      <div
        part="base"
        class=${_e({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Dt.styles=[ye,uu];Dt.dependencies={"sl-icon":$e};T([pe(".option__label")],Dt.prototype,"defaultSlot",2);T([he()],Dt.prototype,"current",2);T([he()],Dt.prototype,"selected",2);T([he()],Dt.prototype,"hasHover",2);T([z({reflect:!0})],Dt.prototype,"value",2);T([z({type:Boolean,reflect:!0})],Dt.prototype,"disabled",2);T([be("disabled")],Dt.prototype,"handleDisabledChange",1);T([be("selected")],Dt.prototype,"handleSelectedChange",1);T([be("value")],Dt.prototype,"handleValueChange",1);Dt.define("sl-option");var du=t=>W`
	<sl-select
		value=${ee(t.value)}
		.required=${t.required}
		@sl-change=${e=>{let r=e.target.value;Array.isArray(r)||((t.type==="number"||t.type==="integer")&&(r=Number(r)),t.valueChangedCallback?.(r))}}
		.disabled=${t.disabled}
		label=${ee(t.label)}
		.helpText=${t.helpText??""}
		>${t.enum?.map(e=>W` <sl-option .value=${String(e)}>
					${e}
				</sl-option>`)}</sl-select
	>
`;var pu=t=>W`
	<sl-select
		class="theme-shoelace widget-select-multi level-${t.level}"
		part="widget-select-multi"
		.id=${t.id}
		.label=${t.label??""}
		.value=${t.value}
		multiple
		clearable
		.disabled=${t.disabled}
		.helpText=${t.helpText??""}
		@sl-change=${e=>{let{value:r}=e.target;t.valueChangedCallback?.(r)}}
	>
		${t?.enum?.map(e=>W`<sl-option value=${e}>${e}</sl-option>`)}
	</sl-select>
`;De.define("sl-button");var fu=t=>W`
	<!--  -->
	<div id=${t.id} class="theme-shoelace widget-submit">
		<sl-button type="submit" size="large"
			>${t.label??"Submit"}</sl-button
		>
	</div>
`;var mu=ue`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`;var ht=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Xe(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return W`
      <div
        class=${_e({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${_e({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${ee(this.value)}
            .checked=${Kt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ht.styles=[ye,xt,mu];T([pe('input[type="checkbox"]')],ht.prototype,"input",2);T([he()],ht.prototype,"hasFocus",2);T([z()],ht.prototype,"title",2);T([z()],ht.prototype,"name",2);T([z()],ht.prototype,"value",2);T([z({reflect:!0})],ht.prototype,"size",2);T([z({type:Boolean,reflect:!0})],ht.prototype,"disabled",2);T([z({type:Boolean,reflect:!0})],ht.prototype,"checked",2);T([Pt("checked")],ht.prototype,"defaultChecked",2);T([z({reflect:!0})],ht.prototype,"form",2);T([z({type:Boolean,reflect:!0})],ht.prototype,"required",2);T([z({attribute:"help-text"})],ht.prototype,"helpText",2);T([be("checked",{waitUntilFirstUpdate:!0})],ht.prototype,"handleCheckedChange",1);T([be("disabled",{waitUntilFirstUpdate:!0})],ht.prototype,"handleDisabledChange",1);ht.define("sl-switch");var gu=t=>W`
	<sl-switch
		placeholder=${t.placeholder}
		.checked=${typeof t.value=="boolean"?t.value:!1}
		.name=${t.id}
		.id=${t.id}
		.required=${t.required}
		@sl-input=${e=>{let{checked:r}=e.target;t.valueChangedCallback?.(r)}}
		.disabled=${t.disabled}
		>${t.label}
		${t.helpText?W`<small> -&nbsp;${t.helpText}</small>`:ke}
	</sl-switch>
`;var vu=t=>W`
	<!-- ${t.pattern} -->
	<sl-input
		.type=${t.inputType}
		.label=${t.label}
		.helpText=${t.helpText}
		placeholder=${t.placeholder}
		value=${ee(t.value)}
		.name=${t.id}
		.id=${t.id}
		.required=${t.required}
		minLength=${ee(t.minLength)}
		maxLength=${ee(t.maxLength)}
		pattern=${ee(t.pattern)}
		@sl-input=${e=>{let{value:r}=e.target;t.valueChangedCallback?.(r)}}
		.disabled=${t.disabled}
		.readonly=${t.readonly}
	>
	</sl-input>
`;var bu=ue`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;var Me=class extends fe{constructor(){super(...arguments),this.formControlController=new ot(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Xe(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&((t=this.resizeObserver)==null||t.unobserve(this.input))}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=""}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,i="preserve"){let o=e??this.input.selectionStart,s=r??this.input.selectionEnd;this.input.setRangeText(t,o,s,i),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e;return W`
      <div
        part="form-control"
        class=${_e({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${_e({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${ee(this.name)}
              .value=${Kt(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${ee(this.placeholder)}
              rows=${ee(this.rows)}
              minlength=${ee(this.minlength)}
              maxlength=${ee(this.maxlength)}
              autocapitalize=${ee(this.autocapitalize)}
              autocorrect=${ee(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${ee(this.spellcheck)}
              enterkeyhint=${ee(this.enterkeyhint)}
              inputmode=${ee(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize!=="auto"}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Me.styles=[ye,xt,bu];T([pe(".textarea__control")],Me.prototype,"input",2);T([pe(".textarea__size-adjuster")],Me.prototype,"sizeAdjuster",2);T([he()],Me.prototype,"hasFocus",2);T([z()],Me.prototype,"title",2);T([z()],Me.prototype,"name",2);T([z()],Me.prototype,"value",2);T([z({reflect:!0})],Me.prototype,"size",2);T([z({type:Boolean,reflect:!0})],Me.prototype,"filled",2);T([z()],Me.prototype,"label",2);T([z({attribute:"help-text"})],Me.prototype,"helpText",2);T([z()],Me.prototype,"placeholder",2);T([z({type:Number})],Me.prototype,"rows",2);T([z()],Me.prototype,"resize",2);T([z({type:Boolean,reflect:!0})],Me.prototype,"disabled",2);T([z({type:Boolean,reflect:!0})],Me.prototype,"readonly",2);T([z({reflect:!0})],Me.prototype,"form",2);T([z({type:Boolean,reflect:!0})],Me.prototype,"required",2);T([z({type:Number})],Me.prototype,"minlength",2);T([z({type:Number})],Me.prototype,"maxlength",2);T([z()],Me.prototype,"autocapitalize",2);T([z()],Me.prototype,"autocorrect",2);T([z()],Me.prototype,"autocomplete",2);T([z({type:Boolean})],Me.prototype,"autofocus",2);T([z()],Me.prototype,"enterkeyhint",2);T([z({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],Me.prototype,"spellcheck",2);T([z()],Me.prototype,"inputmode",2);T([Pt()],Me.prototype,"defaultValue",2);T([be("disabled",{waitUntilFirstUpdate:!0})],Me.prototype,"handleDisabledChange",1);T([be("rows",{waitUntilFirstUpdate:!0})],Me.prototype,"handleRowsChange",1);T([be("value",{waitUntilFirstUpdate:!0})],Me.prototype,"handleValueChange",1);Me.define("sl-textarea");var _u=t=>W`
	<!--  -->
	<sl-textarea
		.label=${t.label??""}
		.helpText=${t.helpText??""}
		placeholder=${t.placeholder??""}
		value=${ee(t.value)}
		.name=${t.id}
		.id=${t.id}
		.required=${t.required??!0}
		minLength=${ee(t.minLength)}
		maxLength=${ee(t.maxLength)}
		@sl-input=${e=>{let{value:r}=e.target;t.valueChangedCallback?.(r)}}
		.disabled=${t.disabled}
		.readonly=${t.readonly}
	>
	</sl-textarea>
`;var yu=ue`@charset "UTF-8";
:host {
  box-sizing: border-box;
  font: 16px var(--sl-font-sans);
  font-weight: var(--sl-font-weight-normal);
  line-height: var(--sl-line-height-normal);
  color: var(--sl-color-neutral-900);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  --sl-input-focus-ring-color: var(--sl-color-primary-50);
}
:host *,
:host *::before,
:host *::after {
  box-sizing: inherit;
}

::selection {
  color: var(--sl-color-primary-300);
  background-color: var(--sl-color-primary-950);
}

sl-input,
sl-select,
sl-checkbox {
  display: block;
}

/* User invalid styles */
sl-input[data-user-invalid]::part(base),
sl-select[data-user-invalid]::part(combobox),
sl-checkbox[data-user-invalid]::part(control) {
  border-color: var(--sl-color-danger-600);
}

[data-user-invalid]::part(form-control-label),
[data-user-invalid]::part(form-control-help-text),
sl-checkbox[data-user-invalid]::part(label) {
  color: var(--sl-color-danger-700);
}

sl-checkbox[data-user-invalid]::part(control) {
  outline: none;
}

sl-input:focus-within[data-user-invalid]::part(base),
sl-select:focus-within[data-user-invalid]::part(combobox),
sl-checkbox:focus-within[data-user-invalid]::part(control) {
  border-color: var(--sl-color-danger-600);
  box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
}

.theme-shoelace.widget-fieldset {
  display: flex;
  flex-direction: column;
  gap: var(--sl-spacing-x-large) 0;
  padding: var(--sl-spacing-medium) var(--sl-spacing-small);
  margin: 0;
  font-weight: var(--sl-font-weight-semibold);
  border: 1px solid var(--sl-color-neutral-50);
  border-radius: var(--sl-border-radius-large);
}
.theme-shoelace.widget-fieldset .widget-fieldset__description {
  font-size: var(--sl-input-help-text-font-size-medium);
  color: var(--sl-input-help-text-color);
}
.theme-shoelace.widget-fieldset .theme-shoelace.widget-fieldset {
  transition: box-shadow var(--sl-transition-medium);
}
.theme-shoelace.widget-fieldset .theme-shoelace.widget-fieldset:hover {
  box-shadow: var(--sl-shadow-medium);
}
.theme-shoelace.widget-fieldset.level-0 legend {
  font-size: var(--sl-font-size-2x-large);
  font-weight: 200;
}
.theme-shoelace.widget-fieldset.level-1 legend {
  font-size: var(--sl-font-size-x-large);
  font-weight: var(--sl-font-weight-light);
}
.theme-shoelace.widget-fieldset.level-2 legend {
  font-size: var(--sl-font-size-large);
  font-weight: var(--sl-font-weight-light);
}
.theme-shoelace.widget-fieldset.level-3 legend {
  font-size: var(--sl-font-size-medium);
  font-weight: var(--sl-font-weight-bold);
}
.theme-shoelace.widget-array .widget-array__card {
  transition: box-shadow var(--sl-transition-medium);
}
.theme-shoelace.widget-array .widget-array__card:hover {
  box-shadow: var(--sl-shadow-medium);
}
.theme-shoelace.widget-array .widget-array__card[data-dropzone] {
  border-radius: var(--sl-border-radius-medium);
  outline: 1px solid var(--sl-color-primary-500);
}
.theme-shoelace.widget-array .widget-array__card[data-dropzone] * {
  pointer-events: none;
}
.theme-shoelace.widget-array sl-card::part(body) {
  padding: var(--sl-spacing-medium) var(--sl-spacing-small);
}
.theme-shoelace.widget-array .widget-array__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8em;
  user-select: none;
}
.theme-shoelace.widget-array .widget-array__header sl-tag::part(base) {
  background: var(--sl-color-neutral-100);
}
.theme-shoelace.widget-array .widget-array__handle {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  padding-left: var(--sl-spacing-2x-small);
  margin: 0 var(--sl-spacing-medium) 0 0;
  font-size: 1.25em;
  color: var(--sl-color-neutral-500);
  cursor: move;
  transition: opacity, var(--sl-transition-fast);
}
.theme-shoelace.widget-array .widget-array__handle:hover {
  color: var(--sl-color-neutral-600);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-x-large);
  transition: var(--sl-transition-medium);
}
.theme-shoelace.widget-array .widget-array__handle:active {
  user-select: none;
}
.theme-shoelace.widget-array .widget-array__handle .widget-array__handle-grip {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}
.theme-shoelace.widget-array .widget-array__add-zone {
  display: flex;
  padding: var(--sl-spacing-2x-large) var(--sl-spacing-2x-large);
  border: 2px dashed var(--sl-color-gray-100);
  border-radius: var(--sl-border-radius-large);
  box-shadow: var(--sl-shadow-large) inset;
}
.theme-shoelace.widget-array .widget-array__add-zone > sl-button {
  width: 100%;
}

/* Callouts */
.theme-shoelace.widget-callout {
  position: relative;
  padding: 1rem 1.5rem 1rem 2rem;
  margin: var(--sl-spacing-x-large) var(--sl-spacing-large);
  color: var(--sl-color-neutral-800);
  background-color: var(--sl-color-neutral-100);
  border-left: solid 4px var(--sl-color-neutral-500);
  border-radius: var(--sl-border-radius-medium);
}
.theme-shoelace.widget-callout > :first-child {
  margin-top: 0;
}
.theme-shoelace.widget-callout > :last-child {
  margin-bottom: 0;
}
.theme-shoelace.widget-callout.callout--tip {
  color: var(--sl-color-primary-800);
  background-color: var(--sl-color-primary-100);
  border-left-color: var(--sl-color-primary-600);
}
.theme-shoelace.widget-callout::before {
  position: absolute;
  top: calc(50% - 0.8rem);
  left: calc(-0.8rem - 2px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  clip-path: circle(50% at 50% 50%);
  font-family: var(--sl-font-serif);
  font-weight: var(--sl-font-weight-bold);
  color: var(--sl-color-neutral-0);
  content: "";
}
.theme-shoelace.widget-callout.callout--tip::before {
  font-style: italic;
  content: "i";
  background-color: var(--sl-color-primary-600);
}
.theme-shoelace.widget-callout.callout--warning {
  color: var(--sl-color-warning-800);
  background-color: var(--sl-color-warning-100);
  border-left-color: var(--sl-color-warning-600);
}
.theme-shoelace.widget-callout.callout--warning::before {
  content: "!";
  background-color: var(--sl-color-warning-600);
}
.theme-shoelace.widget-callout.callout--danger {
  color: var(--sl-color-danger-800);
  background-color: var(--sl-color-danger-100);
  border-left-color: var(--sl-color-danger-600);
}
.theme-shoelace.widget-callout.callout--danger::before {
  content: "‼";
  background-color: var(--sl-color-danger-600);
}
.theme-shoelace.widget-callout + .theme-shoelace.widget-callout {
  margin-top: calc(-0.5 * var(--sl-spacing-medium));
}
.theme-shoelace.widget-callout a {
  color: inherit;
}

.theme-shoelace.widget-checkbox-group .help-text {
  font-size: var(--sl-input-help-text-font-size-medium);
  color: var(--sl-input-help-text-color);
}
.theme-shoelace.widget-checkbox-group .widget-checkbox-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sl-spacing-large) var(--sl-spacing-4x-large);
  justify-content: space-evenly;
  padding: var(--sl-spacing-medium) var(--sl-spacing-x-large);
}

.theme-shoelace.widget-checkbox {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sl-spacing-small);
}
.theme-shoelace.widget-checkbox label {
  cursor: pointer;
}
.theme-shoelace.widget-checkbox .widget-checkbox__description {
  width: 100%;
  font-size: var(--sl-input-help-text-font-size-medium);
  color: var(--sl-input-help-text-color);
}
.theme-shoelace.widget-checkbox .widget-checkbox__label {
  width: 100%;
}

.theme-shoelace.widget-color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sl-spacing-large);
  align-items: center;
}
.theme-shoelace.widget-color-picker .widget-color-picker__description {
  font-size: var(--sl-input-help-text-font-size-medium);
  color: var(--sl-input-help-text-color);
}

.theme-shoelace.widget-radio-group-boolean::part(form-control-input) {
  display: flex;
  gap: 1rem;
}

.theme-shoelace.widget-radio-group::part(form-control-input) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sl-spacing-small) var(--sl-spacing-x-large);
}

.theme-shoelace.widget-rating label {
  display: block;
  margin-bottom: 0.5em;
}

.theme-shoelace.widget-submit {
  display: flex;
  justify-content: center;
  margin: var(--sl-spacing-2x-large) 0;
}
`;var Ms=class extends dt{constructor(){super(...arguments),this.widgets=Fo,this.styleSheets=[yu]}};customElements.define("jsf-shoelace",Ms);var ug={type:"object",properties:{foo:{type:"string"},bar:{type:"boolean"}}};function wu(t){return!0}var Rs=class extends Ke{constructor(){super(...arguments);this._dataInLit={foo:"hello"}}render(){return W`
      <jsf-shoelace
        .schema=${ug}
        .uiSchema=${{bar:{"ui:widget":"switch"}}}
        .data=${this._dataInLit}
        .dataChangeCallback=${r=>{console.log({"Data from Lit":r}),wu(r)?this._dataInLit=r:console.error("Invalid data!")}}
        .submitCallback=${(r,i)=>{console.log({"Submitted from Lit!":r,valid:i}),wu(r)}}
      ></jsf-shoelace>

      <pre>${JSON.stringify({data:this._dataInLit},null,2)}</pre>
    `}};ut([he()],Rs.prototype,"_dataInLit",2),Rs=ut([Ot("tbx-form")],Rs);var No=class extends Gt(Ke){render(){return W`<p>Grid</p>`}};No=ut([Ot("tbx-grid")],No);function La(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var fi=La();function Au(t){fi=t}var Bs={exec:()=>null};function Be(t,e=""){let r=typeof t=="string"?t:t.source,i={replace:(o,s)=>{let n=typeof s=="string"?s:s.source;return n=n.replace(vt.caret,"$1"),r=r.replace(o,n),i},getRegex:()=>new RegExp(r,e)};return i}var vt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},dg=/^(?:[ \t]*(?:\n|$))+/,pg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,zs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,mg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,$a=/(?:[*+-]|\d{1,9}[.)])/,Tu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Mu=Be(Tu).replace(/bull/g,$a).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),gg=Be(Tu).replace(/bull/g,$a).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ba=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,vg=/^[^\n]+/,za=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,bg=Be(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",za).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),_g=Be(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,$a).getRegex(),Go="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Oa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yg=Be("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Oa).replace("tag",Go).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ru=Be(Ba).replace("hr",zs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),wg=Be(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ru).getRegex(),Ia={blockquote:wg,code:pg,def:bg,fences:fg,heading:mg,hr:zs,html:yg,lheading:Mu,list:_g,newline:dg,paragraph:Ru,table:Bs,text:vg},xu=Be("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",zs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),xg={...Ia,lheading:gg,table:xu,paragraph:Be(Ba).replace("hr",zs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",xu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex()},Sg={...Ia,html:Be(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Oa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Bs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Be(Ba).replace("hr",zs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Mu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},kg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Cg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Du=/^( {2,}|\\)\n(?!\s*$)/,Eg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ko=/[\p{P}\p{S}]/u,Pa=/[\s\p{P}\p{S}]/u,Lu=/[^\s\p{P}\p{S}]/u,Ag=Be(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Pa).getRegex(),$u=/(?!~)[\p{P}\p{S}]/u,Tg=/(?!~)[\s\p{P}\p{S}]/u,Mg=/(?:[^\s\p{P}\p{S}]|~)/u,Rg=/\[[^\[\]]*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g,Bu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Dg=Be(Bu,"u").replace(/punct/g,Ko).getRegex(),Lg=Be(Bu,"u").replace(/punct/g,$u).getRegex(),zu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$g=Be(zu,"gu").replace(/notPunctSpace/g,Lu).replace(/punctSpace/g,Pa).replace(/punct/g,Ko).getRegex(),Bg=Be(zu,"gu").replace(/notPunctSpace/g,Mg).replace(/punctSpace/g,Tg).replace(/punct/g,$u).getRegex(),zg=Be("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Lu).replace(/punctSpace/g,Pa).replace(/punct/g,Ko).getRegex(),Og=Be(/\\(punct)/,"gu").replace(/punct/g,Ko).getRegex(),Ig=Be(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Pg=Be(Oa).replace("(?:-->|$)","-->").getRegex(),Hg=Be("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Pg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Uo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`[^`]*`|[^\[\]\\`])*?/,Fg=Be(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Uo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ou=Be(/^!?\[(label)\]\[(ref)\]/).replace("label",Uo).replace("ref",za).getRegex(),Iu=Be(/^!?\[(ref)\](?:\[\])?/).replace("ref",za).getRegex(),Ng=Be("reflink|nolink(?!\\()","g").replace("reflink",Ou).replace("nolink",Iu).getRegex(),Ha={_backpedal:Bs,anyPunctuation:Og,autolink:Ig,blockSkip:Rg,br:Du,code:Cg,del:Bs,emStrongLDelim:Dg,emStrongRDelimAst:$g,emStrongRDelimUnd:zg,escape:kg,link:Fg,nolink:Iu,punctuation:Ag,reflink:Ou,reflinkSearch:Ng,tag:Hg,text:Eg,url:Bs},qg={...Ha,link:Be(/^!?\[(label)\]\((.*?)\)/).replace("label",Uo).getRegex(),reflink:Be(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Uo).getRegex()},Ma={...Ha,emStrongRDelimAst:Bg,emStrongLDelim:Lg,url:Be(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Vg={...Ma,br:Be(Du).replace("{2,}","*").getRegex(),text:Be(Ma.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},qo={normal:Ia,gfm:xg,pedantic:Sg},Ds={normal:Ha,gfm:Ma,breaks:Vg,pedantic:qg},Ug={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Su=t=>Ug[t];function or(t,e){if(e){if(vt.escapeTest.test(t))return t.replace(vt.escapeReplace,Su)}else if(vt.escapeTestNoEncode.test(t))return t.replace(vt.escapeReplaceNoEncode,Su);return t}function ku(t){try{t=encodeURI(t).replace(vt.percentDecode,"%")}catch{return null}return t}function Cu(t,e){let r=t.replace(vt.findPipe,(s,n,a)=>{let l=!1,c=n;for(;--c>=0&&a[c]==="\\";)l=!l;return l?"|":" |"}),i=r.split(vt.splitPipe),o=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;o<i.length;o++)i[o]=i[o].trim().replace(vt.slashPipe,"|");return i}function Ls(t,e,r){let i=t.length;if(i===0)return"";let o=0;for(;o<i;){let s=t.charAt(i-o-1);if(s===e&&!r)o++;else if(s!==e&&r)o++;else break}return t.slice(0,i-o)}function Wg(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let i=0;i<t.length;i++)if(t[i]==="\\")i++;else if(t[i]===e[0])r++;else if(t[i]===e[1]&&(r--,r<0))return i;return r>0?-2:-1}function Eu(t,e,r,i,o){let s=e.href,n=e.title||null,a=t[1].replace(o.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:s,title:n,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function jg(t,e,r){let i=t.match(r.other.indentCodeCompensation);if(i===null)return e;let o=i[1];return e.split(`
`).map(s=>{let n=s.match(r.other.beginningSpace);if(n===null)return s;let[a]=n;return a.length>=o.length?s.slice(o.length):s}).join(`
`)}var Wo=class{constructor(t){Oe(this,"options");Oe(this,"rules");Oe(this,"lexer");this.options=t||fi}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Ls(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],i=jg(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let i=Ls(r,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(r=i.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Ls(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Ls(e[0],`
`).split(`
`),i="",o="",s=[];for(;r.length>0;){let n=!1,a=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))a.push(r[l]),n=!0;else if(!n)a.push(r[l]);else break;r=r.slice(l);let c=a.join(`
`),f=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,o=o?`${o}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=m,r.length===0)break;let _=s.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let g=_,h=g.raw+`
`+r.join(`
`),d=this.blockquote(h);s[s.length-1]=d,i=i.substring(0,i.length-g.raw.length)+d.raw,o=o.substring(0,o.length-g.text.length)+d.text;break}else if(_?.type==="list"){let g=_,h=g.raw+`
`+r.join(`
`),d=this.list(h);s[s.length-1]=d,i=i.substring(0,i.length-_.raw.length)+d.raw,o=o.substring(0,o.length-g.raw.length)+d.raw,r=h.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:s,text:o}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),i=r.length>1,o={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");let s=this.rules.other.listItemRegex(r),n=!1;for(;t;){let l=!1,c="",f="";if(!(e=s.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,p=>" ".repeat(3*p.length)),_=t.split(`
`,1)[0],g=!m.trim(),h=0;if(this.options.pedantic?(h=2,f=m.trimStart()):g?h=e[1].length+1:(h=e[2].search(this.rules.other.nonSpaceChar),h=h>4?1:h,f=m.slice(h),h+=e[1].length),g&&this.rules.other.blankLine.test(_)&&(c+=_+`
`,t=t.substring(_.length+1),l=!0),!l){let p=this.rules.other.nextBulletRegex(h),v=this.rules.other.hrRegex(h),x=this.rules.other.fencesBeginRegex(h),S=this.rules.other.headingBeginRegex(h),C=this.rules.other.htmlBeginRegex(h);for(;t;){let y=t.split(`
`,1)[0],k;if(_=y,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),k=_):k=_.replace(this.rules.other.tabCharGlobal,"    "),x.test(_)||S.test(_)||C.test(_)||p.test(_)||v.test(_))break;if(k.search(this.rules.other.nonSpaceChar)>=h||!_.trim())f+=`
`+k.slice(h);else{if(g||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(m)||S.test(m)||v.test(m))break;f+=`
`+_}!g&&!_.trim()&&(g=!0),c+=y+`
`,t=t.substring(y.length+1),m=k.slice(h)}}o.loose||(n?o.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(n=!0));let d=null,u;this.options.gfm&&(d=this.rules.other.listIsTask.exec(f),d&&(u=d[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:c,task:!!d,checked:u,loose:!1,text:f,tokens:[]}),o.raw+=c}let a=o.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let l=0;l<o.items.length;l++)if(this.lexer.state.top=!1,o.items[l].tokens=this.lexer.blockTokens(o.items[l].text,[]),!o.loose){let c=o.items[l].tokens.filter(m=>m.type==="space"),f=c.length>0&&c.some(m=>this.rules.other.anyLine.test(m.raw));o.loose=f}if(o.loose)for(let l=0;l<o.items.length;l++)o.items[l].loose=!0;return o}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:i,title:o}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Cu(e[1]),i=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===i.length){for(let n of i)this.rules.other.tableAlignRight.test(n)?s.align.push("right"):this.rules.other.tableAlignCenter.test(n)?s.align.push("center"):this.rules.other.tableAlignLeft.test(n)?s.align.push("left"):s.align.push(null);for(let n=0;n<r.length;n++)s.header.push({text:r[n],tokens:this.lexer.inline(r[n]),header:!0,align:s.align[n]});for(let n of o)s.rows.push(Cu(n,s.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:s.align[l]})));return s}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let s=Ls(r.slice(0,-1),"\\");if((r.length-s.length)%2===0)return}else{let s=Wg(e[2],"()");if(s===-2)return;if(s>-1){let n=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,n).trim(),e[3]=""}}let i=e[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(i);s&&(i=s[1],o=s[3])}else o=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i=i.slice(1):i=i.slice(1,-1)),Eu(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let i=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=e[i.toLowerCase()];if(!o){let s=r[0].charAt(0);return{type:"text",raw:s,text:s}}return Eu(r,o,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!(!i||i[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!r||this.rules.inline.punctuation.exec(r))){let o=[...i[0]].length-1,s,n,a=o,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+o);(i=c.exec(e))!=null;){if(s=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!s)continue;if(n=[...s].length,i[3]||i[4]){a+=n;continue}else if((i[5]||i[6])&&o%3&&!((o+n)%3)){l+=n;continue}if(a-=n,a>0)continue;n=Math.min(n,n+a+l);let f=[...i[0]][0].length,m=t.slice(0,o+i.index+f+n);if(Math.min(o,n)%2){let g=m.slice(1,-1);return{type:"em",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}let _=m.slice(2,-2);return{type:"strong",raw:m,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(r),o=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return i&&o&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,i;return e[2]==="@"?(r=e[1],i="mailto:"+r):(r=e[1],i=r),{type:"link",raw:e[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,i;if(e[2]==="@")r=e[0],i="mailto:"+r;else{let o;do o=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(o!==e[0]);r=e[0],e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},wr=class Ra{constructor(e){Oe(this,"tokens");Oe(this,"options");Oe(this,"state");Oe(this,"tokenizer");Oe(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||fi,this.options.tokenizer=this.options.tokenizer||new Wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:vt,block:qo.normal,inline:Ds.normal};this.options.pedantic?(r.block=qo.pedantic,r.inline=Ds.pedantic):this.options.gfm&&(r.block=qo.gfm,this.options.breaks?r.inline=Ds.breaks:r.inline=Ds.gfm),this.tokenizer.rules=r}static get rules(){return{block:qo,inline:Ds}}static lex(e,r){return new Ra(r).lex(e)}static lexInline(e,r){return new Ra(r).inlineTokens(e)}lex(e){e=e.replace(vt.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let i=this.inlineQueue[r];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],i=!1){for(this.options.pedantic&&(e=e.replace(vt.tabCharGlobal,"    ").replace(vt.spaceLine,""));e;){let o;if(this.options.extensions?.block?.some(n=>(o=n.call({lexer:this},e,r))?(e=e.substring(o.raw.length),r.push(o),!0):!1))continue;if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length);let n=r.at(-1);o.raw.length===1&&n!==void 0?n.raw+=`
`:r.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length);let n=r.at(-1);n?.type==="paragraph"||n?.type==="text"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+o.raw,n.text+=`
`+o.text,this.inlineQueue.at(-1).src=n.text):r.push(o);continue}if(o=this.tokenizer.fences(e)){e=e.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.heading(e)){e=e.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.hr(e)){e=e.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.blockquote(e)){e=e.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.list(e)){e=e.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.html(e)){e=e.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length);let n=r.at(-1);n?.type==="paragraph"||n?.type==="text"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+o.raw,n.text+=`
`+o.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},r.push(o));continue}if(o=this.tokenizer.table(e)){e=e.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.lheading(e)){e=e.substring(o.raw.length),r.push(o);continue}let s=e;if(this.options.extensions?.startBlock){let n=1/0,a=e.slice(1),l;this.options.extensions.startBlock.forEach(c=>{l=c.call({lexer:this},a),typeof l=="number"&&l>=0&&(n=Math.min(n,l))}),n<1/0&&n>=0&&(s=e.substring(0,n+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let n=r.at(-1);i&&n?.type==="paragraph"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+o.raw,n.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):r.push(o),i=s.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length);let n=r.at(-1);n?.type==="text"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+o.raw,n.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):r.push(o);continue}if(e){let n="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(n);break}else throw new Error(n)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let i=e,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,o.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(o=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=this.options.hooks?.emStrongMask?.call({lexer:this},i)??i;let s=!1,n="";for(;e;){s||(n=""),s=!1;let a;if(this.options.extensions?.inline?.some(c=>(a=c.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let c=r.at(-1);a.type==="text"&&c?.type==="text"?(c.raw+=a.raw,c.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,i,n)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let l=e;if(this.options.extensions?.startInline){let c=1/0,f=e.slice(1),m;this.options.extensions.startInline.forEach(_=>{m=_.call({lexer:this},f),typeof m=="number"&&m>=0&&(c=Math.min(c,m))}),c<1/0&&c>=0&&(l=e.substring(0,c+1))}if(a=this.tokenizer.inlineText(l)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(n=a.raw.slice(-1)),s=!0;let c=r.at(-1);c?.type==="text"?(c.raw+=a.raw,c.text+=a.text):r.push(a);continue}if(e){let c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return r}},jo=class{constructor(t){Oe(this,"options");Oe(this,"parser");this.options=t||fi}space(t){return""}code({text:t,lang:e,escaped:r}){let i=(e||"").match(vt.notSpaceStart)?.[0],o=t.replace(vt.endingNewline,"")+`
`;return i?'<pre><code class="language-'+or(i)+'">'+(r?o:or(o,!0))+`</code></pre>
`:"<pre><code>"+(r?o:or(o,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,i="";for(let n=0;n<t.items.length;n++){let a=t.items[n];i+=this.listitem(a)}let o=e?"ol":"ul",s=e&&r!==1?' start="'+r+'"':"";return"<"+o+s+`>
`+i+"</"+o+`>
`}listitem(t){let e="";if(t.task){let r=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=r+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=r+" "+or(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):e+=r+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let o=0;o<t.header.length;o++)r+=this.tablecell(t.header[o]);e+=this.tablerow({text:r});let i="";for(let o=0;o<t.rows.length;o++){let s=t.rows[o];r="";for(let n=0;n<s.length;n++)r+=this.tablecell(s[n]);i+=this.tablerow({text:r})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${or(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let i=this.parser.parseInline(r),o=ku(t);if(o===null)return i;t=o;let s='<a href="'+t+'"';return e&&(s+=' title="'+or(e)+'"'),s+=">"+i+"</a>",s}image({href:t,title:e,text:r,tokens:i}){i&&(r=this.parser.parseInline(i,this.parser.textRenderer));let o=ku(t);if(o===null)return or(r);t=o;let s=`<img src="${t}" alt="${r}"`;return e&&(s+=` title="${or(e)}"`),s+=">",s}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:or(t.text)}},Fa=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},xr=class Da{constructor(e){Oe(this,"options");Oe(this,"renderer");Oe(this,"textRenderer");this.options=e||fi,this.options.renderer=this.options.renderer||new jo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Fa}static parse(e,r){return new Da(r).parse(e)}static parseInline(e,r){return new Da(r).parseInline(e)}parse(e,r=!0){let i="";for(let o=0;o<e.length;o++){let s=e[o];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){i+=l||"";continue}}let n=s;switch(n.type){case"space":{i+=this.renderer.space(n);continue}case"hr":{i+=this.renderer.hr(n);continue}case"heading":{i+=this.renderer.heading(n);continue}case"code":{i+=this.renderer.code(n);continue}case"table":{i+=this.renderer.table(n);continue}case"blockquote":{i+=this.renderer.blockquote(n);continue}case"list":{i+=this.renderer.list(n);continue}case"html":{i+=this.renderer.html(n);continue}case"def":{i+=this.renderer.def(n);continue}case"paragraph":{i+=this.renderer.paragraph(n);continue}case"text":{let a=n,l=this.renderer.text(a);for(;o+1<e.length&&e[o+1].type==="text";)a=e[++o],l+=`
`+this.renderer.text(a);r?i+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):i+=l;continue}default:{let a='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return i}parseInline(e,r=this.renderer){let i="";for(let o=0;o<e.length;o++){let s=e[o];if(this.options.extensions?.renderers?.[s.type]){let a=this.options.extensions.renderers[s.type].call({parser:this},s);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){i+=a||"";continue}}let n=s;switch(n.type){case"escape":{i+=r.text(n);break}case"html":{i+=r.html(n);break}case"link":{i+=r.link(n);break}case"image":{i+=r.image(n);break}case"strong":{i+=r.strong(n);break}case"em":{i+=r.em(n);break}case"codespan":{i+=r.codespan(n);break}case"br":{i+=r.br(n);break}case"del":{i+=r.del(n);break}case"text":{i+=r.text(n);break}default:{let a='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return i}},Vo,$s=(Vo=class{constructor(t){Oe(this,"options");Oe(this,"block");this.options=t||fi}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?wr.lex:wr.lexInline}provideParser(){return this.block?xr.parse:xr.parseInline}},Oe(Vo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Oe(Vo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Vo),Gg=class{constructor(...t){Oe(this,"defaults",La());Oe(this,"options",this.setOptions);Oe(this,"parse",this.parseMarkdown(!0));Oe(this,"parseInline",this.parseMarkdown(!1));Oe(this,"Parser",xr);Oe(this,"Renderer",jo);Oe(this,"TextRenderer",Fa);Oe(this,"Lexer",wr);Oe(this,"Tokenizer",Wo);Oe(this,"Hooks",$s);this.use(...t)}walkTokens(t,e){let r=[];for(let i of t)switch(r=r.concat(e.call(this,i)),i.type){case"table":{let o=i;for(let s of o.header)r=r.concat(this.walkTokens(s.tokens,e));for(let s of o.rows)for(let n of s)r=r.concat(this.walkTokens(n.tokens,e));break}case"list":{let o=i;r=r.concat(this.walkTokens(o.items,e));break}default:{let o=i;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let n=o[s].flat(1/0);r=r.concat(this.walkTokens(n,e))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=e.renderers[o.name];s?e.renderers[o.name]=function(...n){let a=o.renderer.apply(this,n);return a===!1&&(a=s.apply(this,n)),a}:e.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=e[o.level];s?s.unshift(o.tokenizer):e[o.level]=[o.tokenizer],o.start&&(o.level==="block"?e.startBlock?e.startBlock.push(o.start):e.startBlock=[o.start]:o.level==="inline"&&(e.startInline?e.startInline.push(o.start):e.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(e.childTokens[o.name]=o.childTokens)}),i.extensions=e),r.renderer){let o=this.defaults.renderer||new jo(this.defaults);for(let s in r.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let n=s,a=r.renderer[n],l=o[n];o[n]=(...c)=>{let f=a.apply(o,c);return f===!1&&(f=l.apply(o,c)),f||""}}i.renderer=o}if(r.tokenizer){let o=this.defaults.tokenizer||new Wo(this.defaults);for(let s in r.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let n=s,a=r.tokenizer[n],l=o[n];o[n]=(...c)=>{let f=a.apply(o,c);return f===!1&&(f=l.apply(o,c)),f}}i.tokenizer=o}if(r.hooks){let o=this.defaults.hooks||new $s;for(let s in r.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let n=s,a=r.hooks[n],l=o[n];$s.passThroughHooks.has(s)?o[n]=c=>{if(this.defaults.async&&$s.passThroughHooksRespectAsync.has(s))return Promise.resolve(a.call(o,c)).then(m=>l.call(o,m));let f=a.call(o,c);return l.call(o,f)}:o[n]=(...c)=>{let f=a.apply(o,c);return f===!1&&(f=l.apply(o,c)),f}}i.hooks=o}if(r.walkTokens){let o=this.defaults.walkTokens,s=r.walkTokens;i.walkTokens=function(n){let a=[];return a.push(s.call(this,n)),o&&(a=a.concat(o.call(this,n))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return wr.lex(t,e??this.defaults)}parser(t,e){return xr.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let i={...r},o={...this.defaults,...i},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&i.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=t);let n=o.hooks?o.hooks.provideLexer():t?wr.lex:wr.lexInline,a=o.hooks?o.hooks.provideParser():t?xr.parse:xr.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(e):e).then(l=>n(l,o)).then(l=>o.hooks?o.hooks.processAllTokens(l):l).then(l=>o.walkTokens?Promise.all(this.walkTokens(l,o.walkTokens)).then(()=>l):l).then(l=>a(l,o)).then(l=>o.hooks?o.hooks.postprocess(l):l).catch(s);try{o.hooks&&(e=o.hooks.preprocess(e));let l=n(e,o);o.hooks&&(l=o.hooks.processAllTokens(l)),o.walkTokens&&this.walkTokens(l,o.walkTokens);let c=a(l,o);return o.hooks&&(c=o.hooks.postprocess(c)),c}catch(l){return s(l)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let i="<p>An error occurred:</p><pre>"+or(r.message+"",!0)+"</pre>";return e?Promise.resolve(i):i}if(e)return Promise.reject(r);throw r}}},pi=new Gg;function Le(t,e){return pi.parse(t,e)}Le.options=Le.setOptions=function(t){return pi.setOptions(t),Le.defaults=pi.defaults,Au(Le.defaults),Le};Le.getDefaults=La;Le.defaults=fi;Le.use=function(...t){return pi.use(...t),Le.defaults=pi.defaults,Au(Le.defaults),Le};Le.walkTokens=function(t,e){return pi.walkTokens(t,e)};Le.parseInline=pi.parseInline;Le.Parser=xr;Le.parser=xr.parse;Le.Renderer=jo;Le.TextRenderer=Fa;Le.Lexer=wr;Le.lexer=wr.lex;Le.Tokenizer=Wo;Le.Hooks=$s;Le.parse=Le;var lB=Le.options,cB=Le.setOptions,hB=Le.use,uB=Le.walkTokens,dB=Le.parseInline;var pB=xr.parse,fB=wr.lex;var Lt=class t{constructor(e,r,i){this.lexer=void 0,this.start=void 0,this.end=void 0,this.lexer=e,this.start=r,this.end=i}static range(e,r){return r?!e||!e.loc||!r.loc||e.loc.lexer!==r.loc.lexer?null:new t(e.loc.lexer,e.loc.start,r.loc.end):e&&e.loc}},Wt=class t{constructor(e,r){this.text=void 0,this.loc=void 0,this.noexpand=void 0,this.treatAsRelax=void 0,this.text=e,this.loc=r}range(e,r){return new t(r,Lt.range(this,e))}},te=class t{constructor(e,r){this.name=void 0,this.position=void 0,this.length=void 0,this.rawMessage=void 0;var i="KaTeX parse error: "+e,o,s,n=r&&r.loc;if(n&&n.start<=n.end){var a=n.lexer.input;o=n.start,s=n.end,o===a.length?i+=" at end of input: ":i+=" at position "+(o+1)+": ";var l=a.slice(o,s).replace(/[^]/g,"$&\u0332"),c;o>15?c="\u2026"+a.slice(o-15,o):c=a.slice(0,o);var f;s+15<a.length?f=a.slice(s,s+15)+"\u2026":f=a.slice(s),i+=c+l+f}var m=new Error(i);return m.name="ParseError",m.__proto__=t.prototype,m.position=o,o!=null&&s!=null&&(m.length=s-o),m.rawMessage=e,m}};te.prototype.__proto__=Error.prototype;var Kg=function(e,r){return e.indexOf(r)!==-1},Xg=function(e,r){return e===void 0?r:e},Yg=/([A-Z])/g,Zg=function(e){return e.replace(Yg,"-$1").toLowerCase()},Jg={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},Qg=/[&><"']/g;function ev(t){return String(t).replace(Qg,e=>Jg[e])}var md=function t(e){return e.type==="ordgroup"||e.type==="color"?e.body.length===1?t(e.body[0]):e:e.type==="font"?t(e.body):e},tv=function(e){var r=md(e);return r.type==="mathord"||r.type==="textord"||r.type==="atom"},rv=function(e){if(!e)throw new Error("Expected non-null, but got "+String(e));return e},iv=function(e){var r=/^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);return r?r[2]!==":"||!/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(r[1])?null:r[1].toLowerCase():"_relative"},de={contains:Kg,deflt:Xg,escape:ev,hyphenate:Zg,getBaseElem:md,isCharacterBox:tv,protocolFromUrl:iv},an={displayMode:{type:"boolean",description:"Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",cli:"-d, --display-mode"},output:{type:{enum:["htmlAndMathml","html","mathml"]},description:"Determines the markup language of the output.",cli:"-F, --format <type>"},leqno:{type:"boolean",description:"Render display math in leqno style (left-justified tags)."},fleqn:{type:"boolean",description:"Render display math flush left."},throwOnError:{type:"boolean",default:!0,cli:"-t, --no-throw-on-error",cliDescription:"Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."},errorColor:{type:"string",default:"#cc0000",cli:"-c, --error-color <color>",cliDescription:"A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",cliProcessor:t=>"#"+t},macros:{type:"object",cli:"-m, --macro <def>",cliDescription:"Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",cliDefault:[],cliProcessor:(t,e)=>(e.push(t),e)},minRuleThickness:{type:"number",description:"Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",processor:t=>Math.max(0,t),cli:"--min-rule-thickness <size>",cliProcessor:parseFloat},colorIsTextColor:{type:"boolean",description:"Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",cli:"-b, --color-is-text-color"},strict:{type:[{enum:["warn","ignore","error"]},"boolean","function"],description:"Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",cli:"-S, --strict",cliDefault:!1},trust:{type:["boolean","function"],description:"Trust the input, enabling all HTML features such as \\url.",cli:"-T, --trust"},maxSize:{type:"number",default:1/0,description:"If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",processor:t=>Math.max(0,t),cli:"-s, --max-size <n>",cliProcessor:parseInt},maxExpand:{type:"number",default:1e3,description:"Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",processor:t=>Math.max(0,t),cli:"-e, --max-expand <n>",cliProcessor:t=>t==="Infinity"?1/0:parseInt(t)},globalGroup:{type:"boolean",cli:!1}};function sv(t){if(t.default)return t.default;var e=t.type,r=Array.isArray(e)?e[0]:e;if(typeof r!="string")return r.enum[0];switch(r){case"boolean":return!1;case"string":return"";case"number":return 0;case"object":return{}}}var Fs=class{constructor(e){this.displayMode=void 0,this.output=void 0,this.leqno=void 0,this.fleqn=void 0,this.throwOnError=void 0,this.errorColor=void 0,this.macros=void 0,this.minRuleThickness=void 0,this.colorIsTextColor=void 0,this.strict=void 0,this.trust=void 0,this.maxSize=void 0,this.maxExpand=void 0,this.globalGroup=void 0,e=e||{};for(var r in an)if(an.hasOwnProperty(r)){var i=an[r];this[r]=e[r]!==void 0?i.processor?i.processor(e[r]):e[r]:sv(i)}}reportNonstrict(e,r,i){var o=this.strict;if(typeof o=="function"&&(o=o(e,r,i)),!(!o||o==="ignore")){if(o===!0||o==="error")throw new te("LaTeX-incompatible input and strict mode is set to 'error': "+(r+" ["+e+"]"),i);o==="warn"?typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to 'warn': "+(r+" ["+e+"]")):typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to "+("unrecognized '"+o+"': "+r+" ["+e+"]"))}}useStrictBehavior(e,r,i){var o=this.strict;if(typeof o=="function")try{o=o(e,r,i)}catch{o="error"}return!o||o==="ignore"?!1:o===!0||o==="error"?!0:o==="warn"?(typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to 'warn': "+(r+" ["+e+"]")),!1):(typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to "+("unrecognized '"+o+"': "+r+" ["+e+"]")),!1)}isTrusted(e){if(e.url&&!e.protocol){var r=de.protocolFromUrl(e.url);if(r==null)return!1;e.protocol=r}var i=typeof this.trust=="function"?this.trust(e):this.trust;return!!i}},nr=class{constructor(e,r,i){this.id=void 0,this.size=void 0,this.cramped=void 0,this.id=e,this.size=r,this.cramped=i}sup(){return ar[ov[this.id]]}sub(){return ar[nv[this.id]]}fracNum(){return ar[av[this.id]]}fracDen(){return ar[lv[this.id]]}cramp(){return ar[cv[this.id]]}text(){return ar[hv[this.id]]}isTight(){return this.size>=2}},dl=0,cn=1,Ui=2,Cr=3,Ns=4,Vt=5,Wi=6,_t=7,ar=[new nr(dl,0,!1),new nr(cn,0,!0),new nr(Ui,1,!1),new nr(Cr,1,!0),new nr(Ns,2,!1),new nr(Vt,2,!0),new nr(Wi,3,!1),new nr(_t,3,!0)],ov=[Ns,Vt,Ns,Vt,Wi,_t,Wi,_t],nv=[Vt,Vt,Vt,Vt,_t,_t,_t,_t],av=[Ui,Cr,Ns,Vt,Wi,_t,Wi,_t],lv=[Cr,Cr,Vt,Vt,_t,_t,_t,_t],cv=[cn,cn,Cr,Cr,Vt,Vt,_t,_t],hv=[dl,cn,Ui,Cr,Ui,Cr,Ui,Cr],ge={DISPLAY:ar[dl],TEXT:ar[Ui],SCRIPT:ar[Ns],SCRIPTSCRIPT:ar[Wi]},el=[{name:"latin",blocks:[[256,591],[768,879]]},{name:"cyrillic",blocks:[[1024,1279]]},{name:"armenian",blocks:[[1328,1423]]},{name:"brahmic",blocks:[[2304,4255]]},{name:"georgian",blocks:[[4256,4351]]},{name:"cjk",blocks:[[12288,12543],[19968,40879],[65280,65376]]},{name:"hangul",blocks:[[44032,55215]]}];function uv(t){for(var e=0;e<el.length;e++)for(var r=el[e],i=0;i<r.blocks.length;i++){var o=r.blocks[i];if(t>=o[0]&&t<=o[1])return r.name}return null}var ln=[];el.forEach(t=>t.blocks.forEach(e=>ln.push(...e)));function gd(t){for(var e=0;e<ln.length;e+=2)if(t>=ln[e]&&t<=ln[e+1])return!0;return!1}var Vi=80,dv=function(e,r){return"M95,"+(622+e+r)+`
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l`+e/2.075+" -"+e+`
c5.3,-9.3,12,-14,20,-14
H400000v`+(40+e)+`H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M`+(834+e)+" "+r+"h400000v"+(40+e)+"h-400000z"},pv=function(e,r){return"M263,"+(601+e+r)+`c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l`+e/2.084+" -"+e+`
c4.7,-7.3,11,-11,19,-11
H40000v`+(40+e)+`H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M`+(1001+e)+" "+r+"h400000v"+(40+e)+"h-400000z"},fv=function(e,r){return"M983 "+(10+e+r)+`
l`+e/3.13+" -"+e+`
c4,-6.7,10,-10,18,-10 H400000v`+(40+e)+`
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M`+(1001+e)+" "+r+"h400000v"+(40+e)+"h-400000z"},mv=function(e,r){return"M424,"+(2398+e+r)+`
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l`+e/4.223+" -"+e+`c4,-6.7,10,-10,18,-10 H400000
v`+(40+e)+`H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M`+(1001+e)+" "+r+`
h400000v`+(40+e)+"h-400000z"},gv=function(e,r){return"M473,"+(2713+e+r)+`
c339.3,-1799.3,509.3,-2700,510,-2702 l`+e/5.298+" -"+e+`
c3.3,-7.3,9.3,-11,18,-11 H400000v`+(40+e)+`H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM`+(1001+e)+" "+r+"h400000v"+(40+e)+"H1017.7z"},vv=function(e){var r=e/2;return"M400000 "+e+" H0 L"+r+" 0 l65 45 L145 "+(e-80)+" H400000z"},bv=function(e,r,i){var o=i-54-r-e;return"M702 "+(e+r)+"H400000"+(40+e)+`
H742v`+o+`l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 `+r+"H400000v"+(40+e)+"H742z"},_v=function(e,r,i){r=1e3*r;var o="";switch(e){case"sqrtMain":o=dv(r,Vi);break;case"sqrtSize1":o=pv(r,Vi);break;case"sqrtSize2":o=fv(r,Vi);break;case"sqrtSize3":o=mv(r,Vi);break;case"sqrtSize4":o=gv(r,Vi);break;case"sqrtTall":o=bv(r,Vi,i)}return o},yv=function(e,r){switch(e){case"\u239C":return"M291 0 H417 V"+r+" H291z M291 0 H417 V"+r+" H291z";case"\u2223":return"M145 0 H188 V"+r+" H145z M145 0 H188 V"+r+" H145z";case"\u2225":return"M145 0 H188 V"+r+" H145z M145 0 H188 V"+r+" H145z"+("M367 0 H410 V"+r+" H367z M367 0 H410 V"+r+" H367z");case"\u239F":return"M457 0 H583 V"+r+" H457z M457 0 H583 V"+r+" H457z";case"\u23A2":return"M319 0 H403 V"+r+" H319z M319 0 H403 V"+r+" H319z";case"\u23A5":return"M263 0 H347 V"+r+" H263z M263 0 H347 V"+r+" H263z";case"\u23AA":return"M384 0 H504 V"+r+" H384z M384 0 H504 V"+r+" H384z";case"\u23D0":return"M312 0 H355 V"+r+" H312z M312 0 H355 V"+r+" H312z";case"\u2016":return"M257 0 H300 V"+r+" H257z M257 0 H300 V"+r+" H257z"+("M478 0 H521 V"+r+" H478z M478 0 H521 V"+r+" H478z");default:return""}},Pu={doubleleftarrow:`M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,doublerightarrow:`M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,leftarrow:`M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,leftbrace:`M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,leftbraceunder:`M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,leftgroup:`M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,leftgroupunder:`M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,leftharpoon:`M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,leftharpoonplus:`M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,leftharpoondown:`M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,leftharpoondownplus:`M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,lefthook:`M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,leftlinesegment:`M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,leftmapsto:`M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,leftToFrom:`M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,longequal:`M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,midbrace:`M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,midbraceunder:`M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,oiintSize1:`M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,oiintSize2:`M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,oiiintSize1:`M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,oiiintSize2:`M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,rightarrow:`M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,rightbrace:`M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,rightbraceunder:`M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,rightgroup:`M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,rightgroupunder:`M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,rightharpoon:`M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,rightharpoonplus:`M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,rightharpoondown:`M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,rightharpoondownplus:`M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,righthook:`M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,rightlinesegment:`M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,rightToFrom:`M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,twoheadleftarrow:`M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,twoheadrightarrow:`M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,tilde1:`M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,tilde2:`M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,tilde3:`M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,tilde4:`M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,vec:`M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,widehat1:`M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,widehat2:`M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widehat3:`M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widehat4:`M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widecheck1:`M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,widecheck2:`M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,widecheck3:`M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,widecheck4:`M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,baraboveleftarrow:`M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,rightarrowabovebar:`M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,baraboveshortleftharpoon:`M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,rightharpoonaboveshortbar:`M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,shortbaraboveleftharpoon:`M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,shortrightharpoonabovebar:`M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`},wv=function(e,r){switch(e){case"lbrack":return"M403 1759 V84 H666 V0 H319 V1759 v"+r+` v1759 h347 v-84
H403z M403 1759 V0 H319 V1759 v`+r+" v1759 h84z";case"rbrack":return"M347 1759 V0 H0 V84 H263 V1759 v"+r+` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v`+r+" v1759 h84z";case"vert":return"M145 15 v585 v"+r+` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v`+-r+` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v`+r+" v585 h43z";case"doublevert":return"M145 15 v585 v"+r+` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v`+-r+` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v`+r+` v585 h43z
M367 15 v585 v`+r+` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v`+-r+` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v`+r+" v585 h43z";case"lfloor":return"M319 602 V0 H403 V602 v"+r+` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v`+r+" v1715 H319z";case"rfloor":return"M319 602 V0 H403 V602 v"+r+` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v`+r+" v1715 H319z";case"lceil":return"M403 1759 V84 H666 V0 H319 V1759 v"+r+` v602 h84z
M403 1759 V0 H319 V1759 v`+r+" v602 h84z";case"rceil":return"M347 1759 V0 H0 V84 H263 V1759 v"+r+` v602 h84z
M347 1759 V0 h-84 V1759 v`+r+" v602 h84z";case"lparen":return`M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,`+(r+84)+`c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-`+(r+92)+`c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;case"rparen":return`M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,`+(r+9)+`
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-`+(r+144)+`c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;default:throw new Error("Unknown stretchy delimiter.")}},gi=class{constructor(e){this.children=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,this.children=e,this.classes=[],this.height=0,this.depth=0,this.maxFontSize=0,this.style={}}hasClass(e){return de.contains(this.classes,e)}toNode(){for(var e=document.createDocumentFragment(),r=0;r<this.children.length;r++)e.appendChild(this.children[r].toNode());return e}toMarkup(){for(var e="",r=0;r<this.children.length;r++)e+=this.children[r].toMarkup();return e}toText(){var e=r=>r.toText();return this.children.map(e).join("")}},lr={"AMS-Regular":{32:[0,0,0,0,.25],65:[0,.68889,0,0,.72222],66:[0,.68889,0,0,.66667],67:[0,.68889,0,0,.72222],68:[0,.68889,0,0,.72222],69:[0,.68889,0,0,.66667],70:[0,.68889,0,0,.61111],71:[0,.68889,0,0,.77778],72:[0,.68889,0,0,.77778],73:[0,.68889,0,0,.38889],74:[.16667,.68889,0,0,.5],75:[0,.68889,0,0,.77778],76:[0,.68889,0,0,.66667],77:[0,.68889,0,0,.94445],78:[0,.68889,0,0,.72222],79:[.16667,.68889,0,0,.77778],80:[0,.68889,0,0,.61111],81:[.16667,.68889,0,0,.77778],82:[0,.68889,0,0,.72222],83:[0,.68889,0,0,.55556],84:[0,.68889,0,0,.66667],85:[0,.68889,0,0,.72222],86:[0,.68889,0,0,.72222],87:[0,.68889,0,0,1],88:[0,.68889,0,0,.72222],89:[0,.68889,0,0,.72222],90:[0,.68889,0,0,.66667],107:[0,.68889,0,0,.55556],160:[0,0,0,0,.25],165:[0,.675,.025,0,.75],174:[.15559,.69224,0,0,.94666],240:[0,.68889,0,0,.55556],295:[0,.68889,0,0,.54028],710:[0,.825,0,0,2.33334],732:[0,.9,0,0,2.33334],770:[0,.825,0,0,2.33334],771:[0,.9,0,0,2.33334],989:[.08167,.58167,0,0,.77778],1008:[0,.43056,.04028,0,.66667],8245:[0,.54986,0,0,.275],8463:[0,.68889,0,0,.54028],8487:[0,.68889,0,0,.72222],8498:[0,.68889,0,0,.55556],8502:[0,.68889,0,0,.66667],8503:[0,.68889,0,0,.44445],8504:[0,.68889,0,0,.66667],8513:[0,.68889,0,0,.63889],8592:[-.03598,.46402,0,0,.5],8594:[-.03598,.46402,0,0,.5],8602:[-.13313,.36687,0,0,1],8603:[-.13313,.36687,0,0,1],8606:[.01354,.52239,0,0,1],8608:[.01354,.52239,0,0,1],8610:[.01354,.52239,0,0,1.11111],8611:[.01354,.52239,0,0,1.11111],8619:[0,.54986,0,0,1],8620:[0,.54986,0,0,1],8621:[-.13313,.37788,0,0,1.38889],8622:[-.13313,.36687,0,0,1],8624:[0,.69224,0,0,.5],8625:[0,.69224,0,0,.5],8630:[0,.43056,0,0,1],8631:[0,.43056,0,0,1],8634:[.08198,.58198,0,0,.77778],8635:[.08198,.58198,0,0,.77778],8638:[.19444,.69224,0,0,.41667],8639:[.19444,.69224,0,0,.41667],8642:[.19444,.69224,0,0,.41667],8643:[.19444,.69224,0,0,.41667],8644:[.1808,.675,0,0,1],8646:[.1808,.675,0,0,1],8647:[.1808,.675,0,0,1],8648:[.19444,.69224,0,0,.83334],8649:[.1808,.675,0,0,1],8650:[.19444,.69224,0,0,.83334],8651:[.01354,.52239,0,0,1],8652:[.01354,.52239,0,0,1],8653:[-.13313,.36687,0,0,1],8654:[-.13313,.36687,0,0,1],8655:[-.13313,.36687,0,0,1],8666:[.13667,.63667,0,0,1],8667:[.13667,.63667,0,0,1],8669:[-.13313,.37788,0,0,1],8672:[-.064,.437,0,0,1.334],8674:[-.064,.437,0,0,1.334],8705:[0,.825,0,0,.5],8708:[0,.68889,0,0,.55556],8709:[.08167,.58167,0,0,.77778],8717:[0,.43056,0,0,.42917],8722:[-.03598,.46402,0,0,.5],8724:[.08198,.69224,0,0,.77778],8726:[.08167,.58167,0,0,.77778],8733:[0,.69224,0,0,.77778],8736:[0,.69224,0,0,.72222],8737:[0,.69224,0,0,.72222],8738:[.03517,.52239,0,0,.72222],8739:[.08167,.58167,0,0,.22222],8740:[.25142,.74111,0,0,.27778],8741:[.08167,.58167,0,0,.38889],8742:[.25142,.74111,0,0,.5],8756:[0,.69224,0,0,.66667],8757:[0,.69224,0,0,.66667],8764:[-.13313,.36687,0,0,.77778],8765:[-.13313,.37788,0,0,.77778],8769:[-.13313,.36687,0,0,.77778],8770:[-.03625,.46375,0,0,.77778],8774:[.30274,.79383,0,0,.77778],8776:[-.01688,.48312,0,0,.77778],8778:[.08167,.58167,0,0,.77778],8782:[.06062,.54986,0,0,.77778],8783:[.06062,.54986,0,0,.77778],8785:[.08198,.58198,0,0,.77778],8786:[.08198,.58198,0,0,.77778],8787:[.08198,.58198,0,0,.77778],8790:[0,.69224,0,0,.77778],8791:[.22958,.72958,0,0,.77778],8796:[.08198,.91667,0,0,.77778],8806:[.25583,.75583,0,0,.77778],8807:[.25583,.75583,0,0,.77778],8808:[.25142,.75726,0,0,.77778],8809:[.25142,.75726,0,0,.77778],8812:[.25583,.75583,0,0,.5],8814:[.20576,.70576,0,0,.77778],8815:[.20576,.70576,0,0,.77778],8816:[.30274,.79383,0,0,.77778],8817:[.30274,.79383,0,0,.77778],8818:[.22958,.72958,0,0,.77778],8819:[.22958,.72958,0,0,.77778],8822:[.1808,.675,0,0,.77778],8823:[.1808,.675,0,0,.77778],8828:[.13667,.63667,0,0,.77778],8829:[.13667,.63667,0,0,.77778],8830:[.22958,.72958,0,0,.77778],8831:[.22958,.72958,0,0,.77778],8832:[.20576,.70576,0,0,.77778],8833:[.20576,.70576,0,0,.77778],8840:[.30274,.79383,0,0,.77778],8841:[.30274,.79383,0,0,.77778],8842:[.13597,.63597,0,0,.77778],8843:[.13597,.63597,0,0,.77778],8847:[.03517,.54986,0,0,.77778],8848:[.03517,.54986,0,0,.77778],8858:[.08198,.58198,0,0,.77778],8859:[.08198,.58198,0,0,.77778],8861:[.08198,.58198,0,0,.77778],8862:[0,.675,0,0,.77778],8863:[0,.675,0,0,.77778],8864:[0,.675,0,0,.77778],8865:[0,.675,0,0,.77778],8872:[0,.69224,0,0,.61111],8873:[0,.69224,0,0,.72222],8874:[0,.69224,0,0,.88889],8876:[0,.68889,0,0,.61111],8877:[0,.68889,0,0,.61111],8878:[0,.68889,0,0,.72222],8879:[0,.68889,0,0,.72222],8882:[.03517,.54986,0,0,.77778],8883:[.03517,.54986,0,0,.77778],8884:[.13667,.63667,0,0,.77778],8885:[.13667,.63667,0,0,.77778],8888:[0,.54986,0,0,1.11111],8890:[.19444,.43056,0,0,.55556],8891:[.19444,.69224,0,0,.61111],8892:[.19444,.69224,0,0,.61111],8901:[0,.54986,0,0,.27778],8903:[.08167,.58167,0,0,.77778],8905:[.08167,.58167,0,0,.77778],8906:[.08167,.58167,0,0,.77778],8907:[0,.69224,0,0,.77778],8908:[0,.69224,0,0,.77778],8909:[-.03598,.46402,0,0,.77778],8910:[0,.54986,0,0,.76042],8911:[0,.54986,0,0,.76042],8912:[.03517,.54986,0,0,.77778],8913:[.03517,.54986,0,0,.77778],8914:[0,.54986,0,0,.66667],8915:[0,.54986,0,0,.66667],8916:[0,.69224,0,0,.66667],8918:[.0391,.5391,0,0,.77778],8919:[.0391,.5391,0,0,.77778],8920:[.03517,.54986,0,0,1.33334],8921:[.03517,.54986,0,0,1.33334],8922:[.38569,.88569,0,0,.77778],8923:[.38569,.88569,0,0,.77778],8926:[.13667,.63667,0,0,.77778],8927:[.13667,.63667,0,0,.77778],8928:[.30274,.79383,0,0,.77778],8929:[.30274,.79383,0,0,.77778],8934:[.23222,.74111,0,0,.77778],8935:[.23222,.74111,0,0,.77778],8936:[.23222,.74111,0,0,.77778],8937:[.23222,.74111,0,0,.77778],8938:[.20576,.70576,0,0,.77778],8939:[.20576,.70576,0,0,.77778],8940:[.30274,.79383,0,0,.77778],8941:[.30274,.79383,0,0,.77778],8994:[.19444,.69224,0,0,.77778],8995:[.19444,.69224,0,0,.77778],9416:[.15559,.69224,0,0,.90222],9484:[0,.69224,0,0,.5],9488:[0,.69224,0,0,.5],9492:[0,.37788,0,0,.5],9496:[0,.37788,0,0,.5],9585:[.19444,.68889,0,0,.88889],9586:[.19444,.74111,0,0,.88889],9632:[0,.675,0,0,.77778],9633:[0,.675,0,0,.77778],9650:[0,.54986,0,0,.72222],9651:[0,.54986,0,0,.72222],9654:[.03517,.54986,0,0,.77778],9660:[0,.54986,0,0,.72222],9661:[0,.54986,0,0,.72222],9664:[.03517,.54986,0,0,.77778],9674:[.11111,.69224,0,0,.66667],9733:[.19444,.69224,0,0,.94445],10003:[0,.69224,0,0,.83334],10016:[0,.69224,0,0,.83334],10731:[.11111,.69224,0,0,.66667],10846:[.19444,.75583,0,0,.61111],10877:[.13667,.63667,0,0,.77778],10878:[.13667,.63667,0,0,.77778],10885:[.25583,.75583,0,0,.77778],10886:[.25583,.75583,0,0,.77778],10887:[.13597,.63597,0,0,.77778],10888:[.13597,.63597,0,0,.77778],10889:[.26167,.75726,0,0,.77778],10890:[.26167,.75726,0,0,.77778],10891:[.48256,.98256,0,0,.77778],10892:[.48256,.98256,0,0,.77778],10901:[.13667,.63667,0,0,.77778],10902:[.13667,.63667,0,0,.77778],10933:[.25142,.75726,0,0,.77778],10934:[.25142,.75726,0,0,.77778],10935:[.26167,.75726,0,0,.77778],10936:[.26167,.75726,0,0,.77778],10937:[.26167,.75726,0,0,.77778],10938:[.26167,.75726,0,0,.77778],10949:[.25583,.75583,0,0,.77778],10950:[.25583,.75583,0,0,.77778],10955:[.28481,.79383,0,0,.77778],10956:[.28481,.79383,0,0,.77778],57350:[.08167,.58167,0,0,.22222],57351:[.08167,.58167,0,0,.38889],57352:[.08167,.58167,0,0,.77778],57353:[0,.43056,.04028,0,.66667],57356:[.25142,.75726,0,0,.77778],57357:[.25142,.75726,0,0,.77778],57358:[.41951,.91951,0,0,.77778],57359:[.30274,.79383,0,0,.77778],57360:[.30274,.79383,0,0,.77778],57361:[.41951,.91951,0,0,.77778],57366:[.25142,.75726,0,0,.77778],57367:[.25142,.75726,0,0,.77778],57368:[.25142,.75726,0,0,.77778],57369:[.25142,.75726,0,0,.77778],57370:[.13597,.63597,0,0,.77778],57371:[.13597,.63597,0,0,.77778]},"Caligraphic-Regular":{32:[0,0,0,0,.25],65:[0,.68333,0,.19445,.79847],66:[0,.68333,.03041,.13889,.65681],67:[0,.68333,.05834,.13889,.52653],68:[0,.68333,.02778,.08334,.77139],69:[0,.68333,.08944,.11111,.52778],70:[0,.68333,.09931,.11111,.71875],71:[.09722,.68333,.0593,.11111,.59487],72:[0,.68333,.00965,.11111,.84452],73:[0,.68333,.07382,0,.54452],74:[.09722,.68333,.18472,.16667,.67778],75:[0,.68333,.01445,.05556,.76195],76:[0,.68333,0,.13889,.68972],77:[0,.68333,0,.13889,1.2009],78:[0,.68333,.14736,.08334,.82049],79:[0,.68333,.02778,.11111,.79611],80:[0,.68333,.08222,.08334,.69556],81:[.09722,.68333,0,.11111,.81667],82:[0,.68333,0,.08334,.8475],83:[0,.68333,.075,.13889,.60556],84:[0,.68333,.25417,0,.54464],85:[0,.68333,.09931,.08334,.62583],86:[0,.68333,.08222,0,.61278],87:[0,.68333,.08222,.08334,.98778],88:[0,.68333,.14643,.13889,.7133],89:[.09722,.68333,.08222,.08334,.66834],90:[0,.68333,.07944,.13889,.72473],160:[0,0,0,0,.25]},"Fraktur-Regular":{32:[0,0,0,0,.25],33:[0,.69141,0,0,.29574],34:[0,.69141,0,0,.21471],38:[0,.69141,0,0,.73786],39:[0,.69141,0,0,.21201],40:[.24982,.74947,0,0,.38865],41:[.24982,.74947,0,0,.38865],42:[0,.62119,0,0,.27764],43:[.08319,.58283,0,0,.75623],44:[0,.10803,0,0,.27764],45:[.08319,.58283,0,0,.75623],46:[0,.10803,0,0,.27764],47:[.24982,.74947,0,0,.50181],48:[0,.47534,0,0,.50181],49:[0,.47534,0,0,.50181],50:[0,.47534,0,0,.50181],51:[.18906,.47534,0,0,.50181],52:[.18906,.47534,0,0,.50181],53:[.18906,.47534,0,0,.50181],54:[0,.69141,0,0,.50181],55:[.18906,.47534,0,0,.50181],56:[0,.69141,0,0,.50181],57:[.18906,.47534,0,0,.50181],58:[0,.47534,0,0,.21606],59:[.12604,.47534,0,0,.21606],61:[-.13099,.36866,0,0,.75623],63:[0,.69141,0,0,.36245],65:[0,.69141,0,0,.7176],66:[0,.69141,0,0,.88397],67:[0,.69141,0,0,.61254],68:[0,.69141,0,0,.83158],69:[0,.69141,0,0,.66278],70:[.12604,.69141,0,0,.61119],71:[0,.69141,0,0,.78539],72:[.06302,.69141,0,0,.7203],73:[0,.69141,0,0,.55448],74:[.12604,.69141,0,0,.55231],75:[0,.69141,0,0,.66845],76:[0,.69141,0,0,.66602],77:[0,.69141,0,0,1.04953],78:[0,.69141,0,0,.83212],79:[0,.69141,0,0,.82699],80:[.18906,.69141,0,0,.82753],81:[.03781,.69141,0,0,.82699],82:[0,.69141,0,0,.82807],83:[0,.69141,0,0,.82861],84:[0,.69141,0,0,.66899],85:[0,.69141,0,0,.64576],86:[0,.69141,0,0,.83131],87:[0,.69141,0,0,1.04602],88:[0,.69141,0,0,.71922],89:[.18906,.69141,0,0,.83293],90:[.12604,.69141,0,0,.60201],91:[.24982,.74947,0,0,.27764],93:[.24982,.74947,0,0,.27764],94:[0,.69141,0,0,.49965],97:[0,.47534,0,0,.50046],98:[0,.69141,0,0,.51315],99:[0,.47534,0,0,.38946],100:[0,.62119,0,0,.49857],101:[0,.47534,0,0,.40053],102:[.18906,.69141,0,0,.32626],103:[.18906,.47534,0,0,.5037],104:[.18906,.69141,0,0,.52126],105:[0,.69141,0,0,.27899],106:[0,.69141,0,0,.28088],107:[0,.69141,0,0,.38946],108:[0,.69141,0,0,.27953],109:[0,.47534,0,0,.76676],110:[0,.47534,0,0,.52666],111:[0,.47534,0,0,.48885],112:[.18906,.52396,0,0,.50046],113:[.18906,.47534,0,0,.48912],114:[0,.47534,0,0,.38919],115:[0,.47534,0,0,.44266],116:[0,.62119,0,0,.33301],117:[0,.47534,0,0,.5172],118:[0,.52396,0,0,.5118],119:[0,.52396,0,0,.77351],120:[.18906,.47534,0,0,.38865],121:[.18906,.47534,0,0,.49884],122:[.18906,.47534,0,0,.39054],160:[0,0,0,0,.25],8216:[0,.69141,0,0,.21471],8217:[0,.69141,0,0,.21471],58112:[0,.62119,0,0,.49749],58113:[0,.62119,0,0,.4983],58114:[.18906,.69141,0,0,.33328],58115:[.18906,.69141,0,0,.32923],58116:[.18906,.47534,0,0,.50343],58117:[0,.69141,0,0,.33301],58118:[0,.62119,0,0,.33409],58119:[0,.47534,0,0,.50073]},"Main-Bold":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.35],34:[0,.69444,0,0,.60278],35:[.19444,.69444,0,0,.95833],36:[.05556,.75,0,0,.575],37:[.05556,.75,0,0,.95833],38:[0,.69444,0,0,.89444],39:[0,.69444,0,0,.31944],40:[.25,.75,0,0,.44722],41:[.25,.75,0,0,.44722],42:[0,.75,0,0,.575],43:[.13333,.63333,0,0,.89444],44:[.19444,.15556,0,0,.31944],45:[0,.44444,0,0,.38333],46:[0,.15556,0,0,.31944],47:[.25,.75,0,0,.575],48:[0,.64444,0,0,.575],49:[0,.64444,0,0,.575],50:[0,.64444,0,0,.575],51:[0,.64444,0,0,.575],52:[0,.64444,0,0,.575],53:[0,.64444,0,0,.575],54:[0,.64444,0,0,.575],55:[0,.64444,0,0,.575],56:[0,.64444,0,0,.575],57:[0,.64444,0,0,.575],58:[0,.44444,0,0,.31944],59:[.19444,.44444,0,0,.31944],60:[.08556,.58556,0,0,.89444],61:[-.10889,.39111,0,0,.89444],62:[.08556,.58556,0,0,.89444],63:[0,.69444,0,0,.54305],64:[0,.69444,0,0,.89444],65:[0,.68611,0,0,.86944],66:[0,.68611,0,0,.81805],67:[0,.68611,0,0,.83055],68:[0,.68611,0,0,.88194],69:[0,.68611,0,0,.75555],70:[0,.68611,0,0,.72361],71:[0,.68611,0,0,.90416],72:[0,.68611,0,0,.9],73:[0,.68611,0,0,.43611],74:[0,.68611,0,0,.59444],75:[0,.68611,0,0,.90138],76:[0,.68611,0,0,.69166],77:[0,.68611,0,0,1.09166],78:[0,.68611,0,0,.9],79:[0,.68611,0,0,.86388],80:[0,.68611,0,0,.78611],81:[.19444,.68611,0,0,.86388],82:[0,.68611,0,0,.8625],83:[0,.68611,0,0,.63889],84:[0,.68611,0,0,.8],85:[0,.68611,0,0,.88472],86:[0,.68611,.01597,0,.86944],87:[0,.68611,.01597,0,1.18888],88:[0,.68611,0,0,.86944],89:[0,.68611,.02875,0,.86944],90:[0,.68611,0,0,.70277],91:[.25,.75,0,0,.31944],92:[.25,.75,0,0,.575],93:[.25,.75,0,0,.31944],94:[0,.69444,0,0,.575],95:[.31,.13444,.03194,0,.575],97:[0,.44444,0,0,.55902],98:[0,.69444,0,0,.63889],99:[0,.44444,0,0,.51111],100:[0,.69444,0,0,.63889],101:[0,.44444,0,0,.52708],102:[0,.69444,.10903,0,.35139],103:[.19444,.44444,.01597,0,.575],104:[0,.69444,0,0,.63889],105:[0,.69444,0,0,.31944],106:[.19444,.69444,0,0,.35139],107:[0,.69444,0,0,.60694],108:[0,.69444,0,0,.31944],109:[0,.44444,0,0,.95833],110:[0,.44444,0,0,.63889],111:[0,.44444,0,0,.575],112:[.19444,.44444,0,0,.63889],113:[.19444,.44444,0,0,.60694],114:[0,.44444,0,0,.47361],115:[0,.44444,0,0,.45361],116:[0,.63492,0,0,.44722],117:[0,.44444,0,0,.63889],118:[0,.44444,.01597,0,.60694],119:[0,.44444,.01597,0,.83055],120:[0,.44444,0,0,.60694],121:[.19444,.44444,.01597,0,.60694],122:[0,.44444,0,0,.51111],123:[.25,.75,0,0,.575],124:[.25,.75,0,0,.31944],125:[.25,.75,0,0,.575],126:[.35,.34444,0,0,.575],160:[0,0,0,0,.25],163:[0,.69444,0,0,.86853],168:[0,.69444,0,0,.575],172:[0,.44444,0,0,.76666],176:[0,.69444,0,0,.86944],177:[.13333,.63333,0,0,.89444],184:[.17014,0,0,0,.51111],198:[0,.68611,0,0,1.04166],215:[.13333,.63333,0,0,.89444],216:[.04861,.73472,0,0,.89444],223:[0,.69444,0,0,.59722],230:[0,.44444,0,0,.83055],247:[.13333,.63333,0,0,.89444],248:[.09722,.54167,0,0,.575],305:[0,.44444,0,0,.31944],338:[0,.68611,0,0,1.16944],339:[0,.44444,0,0,.89444],567:[.19444,.44444,0,0,.35139],710:[0,.69444,0,0,.575],711:[0,.63194,0,0,.575],713:[0,.59611,0,0,.575],714:[0,.69444,0,0,.575],715:[0,.69444,0,0,.575],728:[0,.69444,0,0,.575],729:[0,.69444,0,0,.31944],730:[0,.69444,0,0,.86944],732:[0,.69444,0,0,.575],733:[0,.69444,0,0,.575],915:[0,.68611,0,0,.69166],916:[0,.68611,0,0,.95833],920:[0,.68611,0,0,.89444],923:[0,.68611,0,0,.80555],926:[0,.68611,0,0,.76666],928:[0,.68611,0,0,.9],931:[0,.68611,0,0,.83055],933:[0,.68611,0,0,.89444],934:[0,.68611,0,0,.83055],936:[0,.68611,0,0,.89444],937:[0,.68611,0,0,.83055],8211:[0,.44444,.03194,0,.575],8212:[0,.44444,.03194,0,1.14999],8216:[0,.69444,0,0,.31944],8217:[0,.69444,0,0,.31944],8220:[0,.69444,0,0,.60278],8221:[0,.69444,0,0,.60278],8224:[.19444,.69444,0,0,.51111],8225:[.19444,.69444,0,0,.51111],8242:[0,.55556,0,0,.34444],8407:[0,.72444,.15486,0,.575],8463:[0,.69444,0,0,.66759],8465:[0,.69444,0,0,.83055],8467:[0,.69444,0,0,.47361],8472:[.19444,.44444,0,0,.74027],8476:[0,.69444,0,0,.83055],8501:[0,.69444,0,0,.70277],8592:[-.10889,.39111,0,0,1.14999],8593:[.19444,.69444,0,0,.575],8594:[-.10889,.39111,0,0,1.14999],8595:[.19444,.69444,0,0,.575],8596:[-.10889,.39111,0,0,1.14999],8597:[.25,.75,0,0,.575],8598:[.19444,.69444,0,0,1.14999],8599:[.19444,.69444,0,0,1.14999],8600:[.19444,.69444,0,0,1.14999],8601:[.19444,.69444,0,0,1.14999],8636:[-.10889,.39111,0,0,1.14999],8637:[-.10889,.39111,0,0,1.14999],8640:[-.10889,.39111,0,0,1.14999],8641:[-.10889,.39111,0,0,1.14999],8656:[-.10889,.39111,0,0,1.14999],8657:[.19444,.69444,0,0,.70277],8658:[-.10889,.39111,0,0,1.14999],8659:[.19444,.69444,0,0,.70277],8660:[-.10889,.39111,0,0,1.14999],8661:[.25,.75,0,0,.70277],8704:[0,.69444,0,0,.63889],8706:[0,.69444,.06389,0,.62847],8707:[0,.69444,0,0,.63889],8709:[.05556,.75,0,0,.575],8711:[0,.68611,0,0,.95833],8712:[.08556,.58556,0,0,.76666],8715:[.08556,.58556,0,0,.76666],8722:[.13333,.63333,0,0,.89444],8723:[.13333,.63333,0,0,.89444],8725:[.25,.75,0,0,.575],8726:[.25,.75,0,0,.575],8727:[-.02778,.47222,0,0,.575],8728:[-.02639,.47361,0,0,.575],8729:[-.02639,.47361,0,0,.575],8730:[.18,.82,0,0,.95833],8733:[0,.44444,0,0,.89444],8734:[0,.44444,0,0,1.14999],8736:[0,.69224,0,0,.72222],8739:[.25,.75,0,0,.31944],8741:[.25,.75,0,0,.575],8743:[0,.55556,0,0,.76666],8744:[0,.55556,0,0,.76666],8745:[0,.55556,0,0,.76666],8746:[0,.55556,0,0,.76666],8747:[.19444,.69444,.12778,0,.56875],8764:[-.10889,.39111,0,0,.89444],8768:[.19444,.69444,0,0,.31944],8771:[.00222,.50222,0,0,.89444],8773:[.027,.638,0,0,.894],8776:[.02444,.52444,0,0,.89444],8781:[.00222,.50222,0,0,.89444],8801:[.00222,.50222,0,0,.89444],8804:[.19667,.69667,0,0,.89444],8805:[.19667,.69667,0,0,.89444],8810:[.08556,.58556,0,0,1.14999],8811:[.08556,.58556,0,0,1.14999],8826:[.08556,.58556,0,0,.89444],8827:[.08556,.58556,0,0,.89444],8834:[.08556,.58556,0,0,.89444],8835:[.08556,.58556,0,0,.89444],8838:[.19667,.69667,0,0,.89444],8839:[.19667,.69667,0,0,.89444],8846:[0,.55556,0,0,.76666],8849:[.19667,.69667,0,0,.89444],8850:[.19667,.69667,0,0,.89444],8851:[0,.55556,0,0,.76666],8852:[0,.55556,0,0,.76666],8853:[.13333,.63333,0,0,.89444],8854:[.13333,.63333,0,0,.89444],8855:[.13333,.63333,0,0,.89444],8856:[.13333,.63333,0,0,.89444],8857:[.13333,.63333,0,0,.89444],8866:[0,.69444,0,0,.70277],8867:[0,.69444,0,0,.70277],8868:[0,.69444,0,0,.89444],8869:[0,.69444,0,0,.89444],8900:[-.02639,.47361,0,0,.575],8901:[-.02639,.47361,0,0,.31944],8902:[-.02778,.47222,0,0,.575],8968:[.25,.75,0,0,.51111],8969:[.25,.75,0,0,.51111],8970:[.25,.75,0,0,.51111],8971:[.25,.75,0,0,.51111],8994:[-.13889,.36111,0,0,1.14999],8995:[-.13889,.36111,0,0,1.14999],9651:[.19444,.69444,0,0,1.02222],9657:[-.02778,.47222,0,0,.575],9661:[.19444,.69444,0,0,1.02222],9667:[-.02778,.47222,0,0,.575],9711:[.19444,.69444,0,0,1.14999],9824:[.12963,.69444,0,0,.89444],9825:[.12963,.69444,0,0,.89444],9826:[.12963,.69444,0,0,.89444],9827:[.12963,.69444,0,0,.89444],9837:[0,.75,0,0,.44722],9838:[.19444,.69444,0,0,.44722],9839:[.19444,.69444,0,0,.44722],10216:[.25,.75,0,0,.44722],10217:[.25,.75,0,0,.44722],10815:[0,.68611,0,0,.9],10927:[.19667,.69667,0,0,.89444],10928:[.19667,.69667,0,0,.89444],57376:[.19444,.69444,0,0,0]},"Main-BoldItalic":{32:[0,0,0,0,.25],33:[0,.69444,.11417,0,.38611],34:[0,.69444,.07939,0,.62055],35:[.19444,.69444,.06833,0,.94444],37:[.05556,.75,.12861,0,.94444],38:[0,.69444,.08528,0,.88555],39:[0,.69444,.12945,0,.35555],40:[.25,.75,.15806,0,.47333],41:[.25,.75,.03306,0,.47333],42:[0,.75,.14333,0,.59111],43:[.10333,.60333,.03306,0,.88555],44:[.19444,.14722,0,0,.35555],45:[0,.44444,.02611,0,.41444],46:[0,.14722,0,0,.35555],47:[.25,.75,.15806,0,.59111],48:[0,.64444,.13167,0,.59111],49:[0,.64444,.13167,0,.59111],50:[0,.64444,.13167,0,.59111],51:[0,.64444,.13167,0,.59111],52:[.19444,.64444,.13167,0,.59111],53:[0,.64444,.13167,0,.59111],54:[0,.64444,.13167,0,.59111],55:[.19444,.64444,.13167,0,.59111],56:[0,.64444,.13167,0,.59111],57:[0,.64444,.13167,0,.59111],58:[0,.44444,.06695,0,.35555],59:[.19444,.44444,.06695,0,.35555],61:[-.10889,.39111,.06833,0,.88555],63:[0,.69444,.11472,0,.59111],64:[0,.69444,.09208,0,.88555],65:[0,.68611,0,0,.86555],66:[0,.68611,.0992,0,.81666],67:[0,.68611,.14208,0,.82666],68:[0,.68611,.09062,0,.87555],69:[0,.68611,.11431,0,.75666],70:[0,.68611,.12903,0,.72722],71:[0,.68611,.07347,0,.89527],72:[0,.68611,.17208,0,.8961],73:[0,.68611,.15681,0,.47166],74:[0,.68611,.145,0,.61055],75:[0,.68611,.14208,0,.89499],76:[0,.68611,0,0,.69777],77:[0,.68611,.17208,0,1.07277],78:[0,.68611,.17208,0,.8961],79:[0,.68611,.09062,0,.85499],80:[0,.68611,.0992,0,.78721],81:[.19444,.68611,.09062,0,.85499],82:[0,.68611,.02559,0,.85944],83:[0,.68611,.11264,0,.64999],84:[0,.68611,.12903,0,.7961],85:[0,.68611,.17208,0,.88083],86:[0,.68611,.18625,0,.86555],87:[0,.68611,.18625,0,1.15999],88:[0,.68611,.15681,0,.86555],89:[0,.68611,.19803,0,.86555],90:[0,.68611,.14208,0,.70888],91:[.25,.75,.1875,0,.35611],93:[.25,.75,.09972,0,.35611],94:[0,.69444,.06709,0,.59111],95:[.31,.13444,.09811,0,.59111],97:[0,.44444,.09426,0,.59111],98:[0,.69444,.07861,0,.53222],99:[0,.44444,.05222,0,.53222],100:[0,.69444,.10861,0,.59111],101:[0,.44444,.085,0,.53222],102:[.19444,.69444,.21778,0,.4],103:[.19444,.44444,.105,0,.53222],104:[0,.69444,.09426,0,.59111],105:[0,.69326,.11387,0,.35555],106:[.19444,.69326,.1672,0,.35555],107:[0,.69444,.11111,0,.53222],108:[0,.69444,.10861,0,.29666],109:[0,.44444,.09426,0,.94444],110:[0,.44444,.09426,0,.64999],111:[0,.44444,.07861,0,.59111],112:[.19444,.44444,.07861,0,.59111],113:[.19444,.44444,.105,0,.53222],114:[0,.44444,.11111,0,.50167],115:[0,.44444,.08167,0,.48694],116:[0,.63492,.09639,0,.385],117:[0,.44444,.09426,0,.62055],118:[0,.44444,.11111,0,.53222],119:[0,.44444,.11111,0,.76777],120:[0,.44444,.12583,0,.56055],121:[.19444,.44444,.105,0,.56166],122:[0,.44444,.13889,0,.49055],126:[.35,.34444,.11472,0,.59111],160:[0,0,0,0,.25],168:[0,.69444,.11473,0,.59111],176:[0,.69444,0,0,.94888],184:[.17014,0,0,0,.53222],198:[0,.68611,.11431,0,1.02277],216:[.04861,.73472,.09062,0,.88555],223:[.19444,.69444,.09736,0,.665],230:[0,.44444,.085,0,.82666],248:[.09722,.54167,.09458,0,.59111],305:[0,.44444,.09426,0,.35555],338:[0,.68611,.11431,0,1.14054],339:[0,.44444,.085,0,.82666],567:[.19444,.44444,.04611,0,.385],710:[0,.69444,.06709,0,.59111],711:[0,.63194,.08271,0,.59111],713:[0,.59444,.10444,0,.59111],714:[0,.69444,.08528,0,.59111],715:[0,.69444,0,0,.59111],728:[0,.69444,.10333,0,.59111],729:[0,.69444,.12945,0,.35555],730:[0,.69444,0,0,.94888],732:[0,.69444,.11472,0,.59111],733:[0,.69444,.11472,0,.59111],915:[0,.68611,.12903,0,.69777],916:[0,.68611,0,0,.94444],920:[0,.68611,.09062,0,.88555],923:[0,.68611,0,0,.80666],926:[0,.68611,.15092,0,.76777],928:[0,.68611,.17208,0,.8961],931:[0,.68611,.11431,0,.82666],933:[0,.68611,.10778,0,.88555],934:[0,.68611,.05632,0,.82666],936:[0,.68611,.10778,0,.88555],937:[0,.68611,.0992,0,.82666],8211:[0,.44444,.09811,0,.59111],8212:[0,.44444,.09811,0,1.18221],8216:[0,.69444,.12945,0,.35555],8217:[0,.69444,.12945,0,.35555],8220:[0,.69444,.16772,0,.62055],8221:[0,.69444,.07939,0,.62055]},"Main-Italic":{32:[0,0,0,0,.25],33:[0,.69444,.12417,0,.30667],34:[0,.69444,.06961,0,.51444],35:[.19444,.69444,.06616,0,.81777],37:[.05556,.75,.13639,0,.81777],38:[0,.69444,.09694,0,.76666],39:[0,.69444,.12417,0,.30667],40:[.25,.75,.16194,0,.40889],41:[.25,.75,.03694,0,.40889],42:[0,.75,.14917,0,.51111],43:[.05667,.56167,.03694,0,.76666],44:[.19444,.10556,0,0,.30667],45:[0,.43056,.02826,0,.35778],46:[0,.10556,0,0,.30667],47:[.25,.75,.16194,0,.51111],48:[0,.64444,.13556,0,.51111],49:[0,.64444,.13556,0,.51111],50:[0,.64444,.13556,0,.51111],51:[0,.64444,.13556,0,.51111],52:[.19444,.64444,.13556,0,.51111],53:[0,.64444,.13556,0,.51111],54:[0,.64444,.13556,0,.51111],55:[.19444,.64444,.13556,0,.51111],56:[0,.64444,.13556,0,.51111],57:[0,.64444,.13556,0,.51111],58:[0,.43056,.0582,0,.30667],59:[.19444,.43056,.0582,0,.30667],61:[-.13313,.36687,.06616,0,.76666],63:[0,.69444,.1225,0,.51111],64:[0,.69444,.09597,0,.76666],65:[0,.68333,0,0,.74333],66:[0,.68333,.10257,0,.70389],67:[0,.68333,.14528,0,.71555],68:[0,.68333,.09403,0,.755],69:[0,.68333,.12028,0,.67833],70:[0,.68333,.13305,0,.65277],71:[0,.68333,.08722,0,.77361],72:[0,.68333,.16389,0,.74333],73:[0,.68333,.15806,0,.38555],74:[0,.68333,.14028,0,.525],75:[0,.68333,.14528,0,.76888],76:[0,.68333,0,0,.62722],77:[0,.68333,.16389,0,.89666],78:[0,.68333,.16389,0,.74333],79:[0,.68333,.09403,0,.76666],80:[0,.68333,.10257,0,.67833],81:[.19444,.68333,.09403,0,.76666],82:[0,.68333,.03868,0,.72944],83:[0,.68333,.11972,0,.56222],84:[0,.68333,.13305,0,.71555],85:[0,.68333,.16389,0,.74333],86:[0,.68333,.18361,0,.74333],87:[0,.68333,.18361,0,.99888],88:[0,.68333,.15806,0,.74333],89:[0,.68333,.19383,0,.74333],90:[0,.68333,.14528,0,.61333],91:[.25,.75,.1875,0,.30667],93:[.25,.75,.10528,0,.30667],94:[0,.69444,.06646,0,.51111],95:[.31,.12056,.09208,0,.51111],97:[0,.43056,.07671,0,.51111],98:[0,.69444,.06312,0,.46],99:[0,.43056,.05653,0,.46],100:[0,.69444,.10333,0,.51111],101:[0,.43056,.07514,0,.46],102:[.19444,.69444,.21194,0,.30667],103:[.19444,.43056,.08847,0,.46],104:[0,.69444,.07671,0,.51111],105:[0,.65536,.1019,0,.30667],106:[.19444,.65536,.14467,0,.30667],107:[0,.69444,.10764,0,.46],108:[0,.69444,.10333,0,.25555],109:[0,.43056,.07671,0,.81777],110:[0,.43056,.07671,0,.56222],111:[0,.43056,.06312,0,.51111],112:[.19444,.43056,.06312,0,.51111],113:[.19444,.43056,.08847,0,.46],114:[0,.43056,.10764,0,.42166],115:[0,.43056,.08208,0,.40889],116:[0,.61508,.09486,0,.33222],117:[0,.43056,.07671,0,.53666],118:[0,.43056,.10764,0,.46],119:[0,.43056,.10764,0,.66444],120:[0,.43056,.12042,0,.46389],121:[.19444,.43056,.08847,0,.48555],122:[0,.43056,.12292,0,.40889],126:[.35,.31786,.11585,0,.51111],160:[0,0,0,0,.25],168:[0,.66786,.10474,0,.51111],176:[0,.69444,0,0,.83129],184:[.17014,0,0,0,.46],198:[0,.68333,.12028,0,.88277],216:[.04861,.73194,.09403,0,.76666],223:[.19444,.69444,.10514,0,.53666],230:[0,.43056,.07514,0,.71555],248:[.09722,.52778,.09194,0,.51111],338:[0,.68333,.12028,0,.98499],339:[0,.43056,.07514,0,.71555],710:[0,.69444,.06646,0,.51111],711:[0,.62847,.08295,0,.51111],713:[0,.56167,.10333,0,.51111],714:[0,.69444,.09694,0,.51111],715:[0,.69444,0,0,.51111],728:[0,.69444,.10806,0,.51111],729:[0,.66786,.11752,0,.30667],730:[0,.69444,0,0,.83129],732:[0,.66786,.11585,0,.51111],733:[0,.69444,.1225,0,.51111],915:[0,.68333,.13305,0,.62722],916:[0,.68333,0,0,.81777],920:[0,.68333,.09403,0,.76666],923:[0,.68333,0,0,.69222],926:[0,.68333,.15294,0,.66444],928:[0,.68333,.16389,0,.74333],931:[0,.68333,.12028,0,.71555],933:[0,.68333,.11111,0,.76666],934:[0,.68333,.05986,0,.71555],936:[0,.68333,.11111,0,.76666],937:[0,.68333,.10257,0,.71555],8211:[0,.43056,.09208,0,.51111],8212:[0,.43056,.09208,0,1.02222],8216:[0,.69444,.12417,0,.30667],8217:[0,.69444,.12417,0,.30667],8220:[0,.69444,.1685,0,.51444],8221:[0,.69444,.06961,0,.51444],8463:[0,.68889,0,0,.54028]},"Main-Regular":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.27778],34:[0,.69444,0,0,.5],35:[.19444,.69444,0,0,.83334],36:[.05556,.75,0,0,.5],37:[.05556,.75,0,0,.83334],38:[0,.69444,0,0,.77778],39:[0,.69444,0,0,.27778],40:[.25,.75,0,0,.38889],41:[.25,.75,0,0,.38889],42:[0,.75,0,0,.5],43:[.08333,.58333,0,0,.77778],44:[.19444,.10556,0,0,.27778],45:[0,.43056,0,0,.33333],46:[0,.10556,0,0,.27778],47:[.25,.75,0,0,.5],48:[0,.64444,0,0,.5],49:[0,.64444,0,0,.5],50:[0,.64444,0,0,.5],51:[0,.64444,0,0,.5],52:[0,.64444,0,0,.5],53:[0,.64444,0,0,.5],54:[0,.64444,0,0,.5],55:[0,.64444,0,0,.5],56:[0,.64444,0,0,.5],57:[0,.64444,0,0,.5],58:[0,.43056,0,0,.27778],59:[.19444,.43056,0,0,.27778],60:[.0391,.5391,0,0,.77778],61:[-.13313,.36687,0,0,.77778],62:[.0391,.5391,0,0,.77778],63:[0,.69444,0,0,.47222],64:[0,.69444,0,0,.77778],65:[0,.68333,0,0,.75],66:[0,.68333,0,0,.70834],67:[0,.68333,0,0,.72222],68:[0,.68333,0,0,.76389],69:[0,.68333,0,0,.68056],70:[0,.68333,0,0,.65278],71:[0,.68333,0,0,.78472],72:[0,.68333,0,0,.75],73:[0,.68333,0,0,.36111],74:[0,.68333,0,0,.51389],75:[0,.68333,0,0,.77778],76:[0,.68333,0,0,.625],77:[0,.68333,0,0,.91667],78:[0,.68333,0,0,.75],79:[0,.68333,0,0,.77778],80:[0,.68333,0,0,.68056],81:[.19444,.68333,0,0,.77778],82:[0,.68333,0,0,.73611],83:[0,.68333,0,0,.55556],84:[0,.68333,0,0,.72222],85:[0,.68333,0,0,.75],86:[0,.68333,.01389,0,.75],87:[0,.68333,.01389,0,1.02778],88:[0,.68333,0,0,.75],89:[0,.68333,.025,0,.75],90:[0,.68333,0,0,.61111],91:[.25,.75,0,0,.27778],92:[.25,.75,0,0,.5],93:[.25,.75,0,0,.27778],94:[0,.69444,0,0,.5],95:[.31,.12056,.02778,0,.5],97:[0,.43056,0,0,.5],98:[0,.69444,0,0,.55556],99:[0,.43056,0,0,.44445],100:[0,.69444,0,0,.55556],101:[0,.43056,0,0,.44445],102:[0,.69444,.07778,0,.30556],103:[.19444,.43056,.01389,0,.5],104:[0,.69444,0,0,.55556],105:[0,.66786,0,0,.27778],106:[.19444,.66786,0,0,.30556],107:[0,.69444,0,0,.52778],108:[0,.69444,0,0,.27778],109:[0,.43056,0,0,.83334],110:[0,.43056,0,0,.55556],111:[0,.43056,0,0,.5],112:[.19444,.43056,0,0,.55556],113:[.19444,.43056,0,0,.52778],114:[0,.43056,0,0,.39167],115:[0,.43056,0,0,.39445],116:[0,.61508,0,0,.38889],117:[0,.43056,0,0,.55556],118:[0,.43056,.01389,0,.52778],119:[0,.43056,.01389,0,.72222],120:[0,.43056,0,0,.52778],121:[.19444,.43056,.01389,0,.52778],122:[0,.43056,0,0,.44445],123:[.25,.75,0,0,.5],124:[.25,.75,0,0,.27778],125:[.25,.75,0,0,.5],126:[.35,.31786,0,0,.5],160:[0,0,0,0,.25],163:[0,.69444,0,0,.76909],167:[.19444,.69444,0,0,.44445],168:[0,.66786,0,0,.5],172:[0,.43056,0,0,.66667],176:[0,.69444,0,0,.75],177:[.08333,.58333,0,0,.77778],182:[.19444,.69444,0,0,.61111],184:[.17014,0,0,0,.44445],198:[0,.68333,0,0,.90278],215:[.08333,.58333,0,0,.77778],216:[.04861,.73194,0,0,.77778],223:[0,.69444,0,0,.5],230:[0,.43056,0,0,.72222],247:[.08333,.58333,0,0,.77778],248:[.09722,.52778,0,0,.5],305:[0,.43056,0,0,.27778],338:[0,.68333,0,0,1.01389],339:[0,.43056,0,0,.77778],567:[.19444,.43056,0,0,.30556],710:[0,.69444,0,0,.5],711:[0,.62847,0,0,.5],713:[0,.56778,0,0,.5],714:[0,.69444,0,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,0,0,.5],729:[0,.66786,0,0,.27778],730:[0,.69444,0,0,.75],732:[0,.66786,0,0,.5],733:[0,.69444,0,0,.5],915:[0,.68333,0,0,.625],916:[0,.68333,0,0,.83334],920:[0,.68333,0,0,.77778],923:[0,.68333,0,0,.69445],926:[0,.68333,0,0,.66667],928:[0,.68333,0,0,.75],931:[0,.68333,0,0,.72222],933:[0,.68333,0,0,.77778],934:[0,.68333,0,0,.72222],936:[0,.68333,0,0,.77778],937:[0,.68333,0,0,.72222],8211:[0,.43056,.02778,0,.5],8212:[0,.43056,.02778,0,1],8216:[0,.69444,0,0,.27778],8217:[0,.69444,0,0,.27778],8220:[0,.69444,0,0,.5],8221:[0,.69444,0,0,.5],8224:[.19444,.69444,0,0,.44445],8225:[.19444,.69444,0,0,.44445],8230:[0,.123,0,0,1.172],8242:[0,.55556,0,0,.275],8407:[0,.71444,.15382,0,.5],8463:[0,.68889,0,0,.54028],8465:[0,.69444,0,0,.72222],8467:[0,.69444,0,.11111,.41667],8472:[.19444,.43056,0,.11111,.63646],8476:[0,.69444,0,0,.72222],8501:[0,.69444,0,0,.61111],8592:[-.13313,.36687,0,0,1],8593:[.19444,.69444,0,0,.5],8594:[-.13313,.36687,0,0,1],8595:[.19444,.69444,0,0,.5],8596:[-.13313,.36687,0,0,1],8597:[.25,.75,0,0,.5],8598:[.19444,.69444,0,0,1],8599:[.19444,.69444,0,0,1],8600:[.19444,.69444,0,0,1],8601:[.19444,.69444,0,0,1],8614:[.011,.511,0,0,1],8617:[.011,.511,0,0,1.126],8618:[.011,.511,0,0,1.126],8636:[-.13313,.36687,0,0,1],8637:[-.13313,.36687,0,0,1],8640:[-.13313,.36687,0,0,1],8641:[-.13313,.36687,0,0,1],8652:[.011,.671,0,0,1],8656:[-.13313,.36687,0,0,1],8657:[.19444,.69444,0,0,.61111],8658:[-.13313,.36687,0,0,1],8659:[.19444,.69444,0,0,.61111],8660:[-.13313,.36687,0,0,1],8661:[.25,.75,0,0,.61111],8704:[0,.69444,0,0,.55556],8706:[0,.69444,.05556,.08334,.5309],8707:[0,.69444,0,0,.55556],8709:[.05556,.75,0,0,.5],8711:[0,.68333,0,0,.83334],8712:[.0391,.5391,0,0,.66667],8715:[.0391,.5391,0,0,.66667],8722:[.08333,.58333,0,0,.77778],8723:[.08333,.58333,0,0,.77778],8725:[.25,.75,0,0,.5],8726:[.25,.75,0,0,.5],8727:[-.03472,.46528,0,0,.5],8728:[-.05555,.44445,0,0,.5],8729:[-.05555,.44445,0,0,.5],8730:[.2,.8,0,0,.83334],8733:[0,.43056,0,0,.77778],8734:[0,.43056,0,0,1],8736:[0,.69224,0,0,.72222],8739:[.25,.75,0,0,.27778],8741:[.25,.75,0,0,.5],8743:[0,.55556,0,0,.66667],8744:[0,.55556,0,0,.66667],8745:[0,.55556,0,0,.66667],8746:[0,.55556,0,0,.66667],8747:[.19444,.69444,.11111,0,.41667],8764:[-.13313,.36687,0,0,.77778],8768:[.19444,.69444,0,0,.27778],8771:[-.03625,.46375,0,0,.77778],8773:[-.022,.589,0,0,.778],8776:[-.01688,.48312,0,0,.77778],8781:[-.03625,.46375,0,0,.77778],8784:[-.133,.673,0,0,.778],8801:[-.03625,.46375,0,0,.77778],8804:[.13597,.63597,0,0,.77778],8805:[.13597,.63597,0,0,.77778],8810:[.0391,.5391,0,0,1],8811:[.0391,.5391,0,0,1],8826:[.0391,.5391,0,0,.77778],8827:[.0391,.5391,0,0,.77778],8834:[.0391,.5391,0,0,.77778],8835:[.0391,.5391,0,0,.77778],8838:[.13597,.63597,0,0,.77778],8839:[.13597,.63597,0,0,.77778],8846:[0,.55556,0,0,.66667],8849:[.13597,.63597,0,0,.77778],8850:[.13597,.63597,0,0,.77778],8851:[0,.55556,0,0,.66667],8852:[0,.55556,0,0,.66667],8853:[.08333,.58333,0,0,.77778],8854:[.08333,.58333,0,0,.77778],8855:[.08333,.58333,0,0,.77778],8856:[.08333,.58333,0,0,.77778],8857:[.08333,.58333,0,0,.77778],8866:[0,.69444,0,0,.61111],8867:[0,.69444,0,0,.61111],8868:[0,.69444,0,0,.77778],8869:[0,.69444,0,0,.77778],8872:[.249,.75,0,0,.867],8900:[-.05555,.44445,0,0,.5],8901:[-.05555,.44445,0,0,.27778],8902:[-.03472,.46528,0,0,.5],8904:[.005,.505,0,0,.9],8942:[.03,.903,0,0,.278],8943:[-.19,.313,0,0,1.172],8945:[-.1,.823,0,0,1.282],8968:[.25,.75,0,0,.44445],8969:[.25,.75,0,0,.44445],8970:[.25,.75,0,0,.44445],8971:[.25,.75,0,0,.44445],8994:[-.14236,.35764,0,0,1],8995:[-.14236,.35764,0,0,1],9136:[.244,.744,0,0,.412],9137:[.244,.745,0,0,.412],9651:[.19444,.69444,0,0,.88889],9657:[-.03472,.46528,0,0,.5],9661:[.19444,.69444,0,0,.88889],9667:[-.03472,.46528,0,0,.5],9711:[.19444,.69444,0,0,1],9824:[.12963,.69444,0,0,.77778],9825:[.12963,.69444,0,0,.77778],9826:[.12963,.69444,0,0,.77778],9827:[.12963,.69444,0,0,.77778],9837:[0,.75,0,0,.38889],9838:[.19444,.69444,0,0,.38889],9839:[.19444,.69444,0,0,.38889],10216:[.25,.75,0,0,.38889],10217:[.25,.75,0,0,.38889],10222:[.244,.744,0,0,.412],10223:[.244,.745,0,0,.412],10229:[.011,.511,0,0,1.609],10230:[.011,.511,0,0,1.638],10231:[.011,.511,0,0,1.859],10232:[.024,.525,0,0,1.609],10233:[.024,.525,0,0,1.638],10234:[.024,.525,0,0,1.858],10236:[.011,.511,0,0,1.638],10815:[0,.68333,0,0,.75],10927:[.13597,.63597,0,0,.77778],10928:[.13597,.63597,0,0,.77778],57376:[.19444,.69444,0,0,0]},"Math-BoldItalic":{32:[0,0,0,0,.25],48:[0,.44444,0,0,.575],49:[0,.44444,0,0,.575],50:[0,.44444,0,0,.575],51:[.19444,.44444,0,0,.575],52:[.19444,.44444,0,0,.575],53:[.19444,.44444,0,0,.575],54:[0,.64444,0,0,.575],55:[.19444,.44444,0,0,.575],56:[0,.64444,0,0,.575],57:[.19444,.44444,0,0,.575],65:[0,.68611,0,0,.86944],66:[0,.68611,.04835,0,.8664],67:[0,.68611,.06979,0,.81694],68:[0,.68611,.03194,0,.93812],69:[0,.68611,.05451,0,.81007],70:[0,.68611,.15972,0,.68889],71:[0,.68611,0,0,.88673],72:[0,.68611,.08229,0,.98229],73:[0,.68611,.07778,0,.51111],74:[0,.68611,.10069,0,.63125],75:[0,.68611,.06979,0,.97118],76:[0,.68611,0,0,.75555],77:[0,.68611,.11424,0,1.14201],78:[0,.68611,.11424,0,.95034],79:[0,.68611,.03194,0,.83666],80:[0,.68611,.15972,0,.72309],81:[.19444,.68611,0,0,.86861],82:[0,.68611,.00421,0,.87235],83:[0,.68611,.05382,0,.69271],84:[0,.68611,.15972,0,.63663],85:[0,.68611,.11424,0,.80027],86:[0,.68611,.25555,0,.67778],87:[0,.68611,.15972,0,1.09305],88:[0,.68611,.07778,0,.94722],89:[0,.68611,.25555,0,.67458],90:[0,.68611,.06979,0,.77257],97:[0,.44444,0,0,.63287],98:[0,.69444,0,0,.52083],99:[0,.44444,0,0,.51342],100:[0,.69444,0,0,.60972],101:[0,.44444,0,0,.55361],102:[.19444,.69444,.11042,0,.56806],103:[.19444,.44444,.03704,0,.5449],104:[0,.69444,0,0,.66759],105:[0,.69326,0,0,.4048],106:[.19444,.69326,.0622,0,.47083],107:[0,.69444,.01852,0,.6037],108:[0,.69444,.0088,0,.34815],109:[0,.44444,0,0,1.0324],110:[0,.44444,0,0,.71296],111:[0,.44444,0,0,.58472],112:[.19444,.44444,0,0,.60092],113:[.19444,.44444,.03704,0,.54213],114:[0,.44444,.03194,0,.5287],115:[0,.44444,0,0,.53125],116:[0,.63492,0,0,.41528],117:[0,.44444,0,0,.68102],118:[0,.44444,.03704,0,.56666],119:[0,.44444,.02778,0,.83148],120:[0,.44444,0,0,.65903],121:[.19444,.44444,.03704,0,.59028],122:[0,.44444,.04213,0,.55509],160:[0,0,0,0,.25],915:[0,.68611,.15972,0,.65694],916:[0,.68611,0,0,.95833],920:[0,.68611,.03194,0,.86722],923:[0,.68611,0,0,.80555],926:[0,.68611,.07458,0,.84125],928:[0,.68611,.08229,0,.98229],931:[0,.68611,.05451,0,.88507],933:[0,.68611,.15972,0,.67083],934:[0,.68611,0,0,.76666],936:[0,.68611,.11653,0,.71402],937:[0,.68611,.04835,0,.8789],945:[0,.44444,0,0,.76064],946:[.19444,.69444,.03403,0,.65972],947:[.19444,.44444,.06389,0,.59003],948:[0,.69444,.03819,0,.52222],949:[0,.44444,0,0,.52882],950:[.19444,.69444,.06215,0,.50833],951:[.19444,.44444,.03704,0,.6],952:[0,.69444,.03194,0,.5618],953:[0,.44444,0,0,.41204],954:[0,.44444,0,0,.66759],955:[0,.69444,0,0,.67083],956:[.19444,.44444,0,0,.70787],957:[0,.44444,.06898,0,.57685],958:[.19444,.69444,.03021,0,.50833],959:[0,.44444,0,0,.58472],960:[0,.44444,.03704,0,.68241],961:[.19444,.44444,0,0,.6118],962:[.09722,.44444,.07917,0,.42361],963:[0,.44444,.03704,0,.68588],964:[0,.44444,.13472,0,.52083],965:[0,.44444,.03704,0,.63055],966:[.19444,.44444,0,0,.74722],967:[.19444,.44444,0,0,.71805],968:[.19444,.69444,.03704,0,.75833],969:[0,.44444,.03704,0,.71782],977:[0,.69444,0,0,.69155],981:[.19444,.69444,0,0,.7125],982:[0,.44444,.03194,0,.975],1009:[.19444,.44444,0,0,.6118],1013:[0,.44444,0,0,.48333],57649:[0,.44444,0,0,.39352],57911:[.19444,.44444,0,0,.43889]},"Math-Italic":{32:[0,0,0,0,.25],48:[0,.43056,0,0,.5],49:[0,.43056,0,0,.5],50:[0,.43056,0,0,.5],51:[.19444,.43056,0,0,.5],52:[.19444,.43056,0,0,.5],53:[.19444,.43056,0,0,.5],54:[0,.64444,0,0,.5],55:[.19444,.43056,0,0,.5],56:[0,.64444,0,0,.5],57:[.19444,.43056,0,0,.5],65:[0,.68333,0,.13889,.75],66:[0,.68333,.05017,.08334,.75851],67:[0,.68333,.07153,.08334,.71472],68:[0,.68333,.02778,.05556,.82792],69:[0,.68333,.05764,.08334,.7382],70:[0,.68333,.13889,.08334,.64306],71:[0,.68333,0,.08334,.78625],72:[0,.68333,.08125,.05556,.83125],73:[0,.68333,.07847,.11111,.43958],74:[0,.68333,.09618,.16667,.55451],75:[0,.68333,.07153,.05556,.84931],76:[0,.68333,0,.02778,.68056],77:[0,.68333,.10903,.08334,.97014],78:[0,.68333,.10903,.08334,.80347],79:[0,.68333,.02778,.08334,.76278],80:[0,.68333,.13889,.08334,.64201],81:[.19444,.68333,0,.08334,.79056],82:[0,.68333,.00773,.08334,.75929],83:[0,.68333,.05764,.08334,.6132],84:[0,.68333,.13889,.08334,.58438],85:[0,.68333,.10903,.02778,.68278],86:[0,.68333,.22222,0,.58333],87:[0,.68333,.13889,0,.94445],88:[0,.68333,.07847,.08334,.82847],89:[0,.68333,.22222,0,.58056],90:[0,.68333,.07153,.08334,.68264],97:[0,.43056,0,0,.52859],98:[0,.69444,0,0,.42917],99:[0,.43056,0,.05556,.43276],100:[0,.69444,0,.16667,.52049],101:[0,.43056,0,.05556,.46563],102:[.19444,.69444,.10764,.16667,.48959],103:[.19444,.43056,.03588,.02778,.47697],104:[0,.69444,0,0,.57616],105:[0,.65952,0,0,.34451],106:[.19444,.65952,.05724,0,.41181],107:[0,.69444,.03148,0,.5206],108:[0,.69444,.01968,.08334,.29838],109:[0,.43056,0,0,.87801],110:[0,.43056,0,0,.60023],111:[0,.43056,0,.05556,.48472],112:[.19444,.43056,0,.08334,.50313],113:[.19444,.43056,.03588,.08334,.44641],114:[0,.43056,.02778,.05556,.45116],115:[0,.43056,0,.05556,.46875],116:[0,.61508,0,.08334,.36111],117:[0,.43056,0,.02778,.57246],118:[0,.43056,.03588,.02778,.48472],119:[0,.43056,.02691,.08334,.71592],120:[0,.43056,0,.02778,.57153],121:[.19444,.43056,.03588,.05556,.49028],122:[0,.43056,.04398,.05556,.46505],160:[0,0,0,0,.25],915:[0,.68333,.13889,.08334,.61528],916:[0,.68333,0,.16667,.83334],920:[0,.68333,.02778,.08334,.76278],923:[0,.68333,0,.16667,.69445],926:[0,.68333,.07569,.08334,.74236],928:[0,.68333,.08125,.05556,.83125],931:[0,.68333,.05764,.08334,.77986],933:[0,.68333,.13889,.05556,.58333],934:[0,.68333,0,.08334,.66667],936:[0,.68333,.11,.05556,.61222],937:[0,.68333,.05017,.08334,.7724],945:[0,.43056,.0037,.02778,.6397],946:[.19444,.69444,.05278,.08334,.56563],947:[.19444,.43056,.05556,0,.51773],948:[0,.69444,.03785,.05556,.44444],949:[0,.43056,0,.08334,.46632],950:[.19444,.69444,.07378,.08334,.4375],951:[.19444,.43056,.03588,.05556,.49653],952:[0,.69444,.02778,.08334,.46944],953:[0,.43056,0,.05556,.35394],954:[0,.43056,0,0,.57616],955:[0,.69444,0,0,.58334],956:[.19444,.43056,0,.02778,.60255],957:[0,.43056,.06366,.02778,.49398],958:[.19444,.69444,.04601,.11111,.4375],959:[0,.43056,0,.05556,.48472],960:[0,.43056,.03588,0,.57003],961:[.19444,.43056,0,.08334,.51702],962:[.09722,.43056,.07986,.08334,.36285],963:[0,.43056,.03588,0,.57141],964:[0,.43056,.1132,.02778,.43715],965:[0,.43056,.03588,.02778,.54028],966:[.19444,.43056,0,.08334,.65417],967:[.19444,.43056,0,.05556,.62569],968:[.19444,.69444,.03588,.11111,.65139],969:[0,.43056,.03588,0,.62245],977:[0,.69444,0,.08334,.59144],981:[.19444,.69444,0,.08334,.59583],982:[0,.43056,.02778,0,.82813],1009:[.19444,.43056,0,.08334,.51702],1013:[0,.43056,0,.05556,.4059],57649:[0,.43056,0,.02778,.32246],57911:[.19444,.43056,0,.08334,.38403]},"SansSerif-Bold":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.36667],34:[0,.69444,0,0,.55834],35:[.19444,.69444,0,0,.91667],36:[.05556,.75,0,0,.55],37:[.05556,.75,0,0,1.02912],38:[0,.69444,0,0,.83056],39:[0,.69444,0,0,.30556],40:[.25,.75,0,0,.42778],41:[.25,.75,0,0,.42778],42:[0,.75,0,0,.55],43:[.11667,.61667,0,0,.85556],44:[.10556,.13056,0,0,.30556],45:[0,.45833,0,0,.36667],46:[0,.13056,0,0,.30556],47:[.25,.75,0,0,.55],48:[0,.69444,0,0,.55],49:[0,.69444,0,0,.55],50:[0,.69444,0,0,.55],51:[0,.69444,0,0,.55],52:[0,.69444,0,0,.55],53:[0,.69444,0,0,.55],54:[0,.69444,0,0,.55],55:[0,.69444,0,0,.55],56:[0,.69444,0,0,.55],57:[0,.69444,0,0,.55],58:[0,.45833,0,0,.30556],59:[.10556,.45833,0,0,.30556],61:[-.09375,.40625,0,0,.85556],63:[0,.69444,0,0,.51945],64:[0,.69444,0,0,.73334],65:[0,.69444,0,0,.73334],66:[0,.69444,0,0,.73334],67:[0,.69444,0,0,.70278],68:[0,.69444,0,0,.79445],69:[0,.69444,0,0,.64167],70:[0,.69444,0,0,.61111],71:[0,.69444,0,0,.73334],72:[0,.69444,0,0,.79445],73:[0,.69444,0,0,.33056],74:[0,.69444,0,0,.51945],75:[0,.69444,0,0,.76389],76:[0,.69444,0,0,.58056],77:[0,.69444,0,0,.97778],78:[0,.69444,0,0,.79445],79:[0,.69444,0,0,.79445],80:[0,.69444,0,0,.70278],81:[.10556,.69444,0,0,.79445],82:[0,.69444,0,0,.70278],83:[0,.69444,0,0,.61111],84:[0,.69444,0,0,.73334],85:[0,.69444,0,0,.76389],86:[0,.69444,.01528,0,.73334],87:[0,.69444,.01528,0,1.03889],88:[0,.69444,0,0,.73334],89:[0,.69444,.0275,0,.73334],90:[0,.69444,0,0,.67223],91:[.25,.75,0,0,.34306],93:[.25,.75,0,0,.34306],94:[0,.69444,0,0,.55],95:[.35,.10833,.03056,0,.55],97:[0,.45833,0,0,.525],98:[0,.69444,0,0,.56111],99:[0,.45833,0,0,.48889],100:[0,.69444,0,0,.56111],101:[0,.45833,0,0,.51111],102:[0,.69444,.07639,0,.33611],103:[.19444,.45833,.01528,0,.55],104:[0,.69444,0,0,.56111],105:[0,.69444,0,0,.25556],106:[.19444,.69444,0,0,.28611],107:[0,.69444,0,0,.53056],108:[0,.69444,0,0,.25556],109:[0,.45833,0,0,.86667],110:[0,.45833,0,0,.56111],111:[0,.45833,0,0,.55],112:[.19444,.45833,0,0,.56111],113:[.19444,.45833,0,0,.56111],114:[0,.45833,.01528,0,.37222],115:[0,.45833,0,0,.42167],116:[0,.58929,0,0,.40417],117:[0,.45833,0,0,.56111],118:[0,.45833,.01528,0,.5],119:[0,.45833,.01528,0,.74445],120:[0,.45833,0,0,.5],121:[.19444,.45833,.01528,0,.5],122:[0,.45833,0,0,.47639],126:[.35,.34444,0,0,.55],160:[0,0,0,0,.25],168:[0,.69444,0,0,.55],176:[0,.69444,0,0,.73334],180:[0,.69444,0,0,.55],184:[.17014,0,0,0,.48889],305:[0,.45833,0,0,.25556],567:[.19444,.45833,0,0,.28611],710:[0,.69444,0,0,.55],711:[0,.63542,0,0,.55],713:[0,.63778,0,0,.55],728:[0,.69444,0,0,.55],729:[0,.69444,0,0,.30556],730:[0,.69444,0,0,.73334],732:[0,.69444,0,0,.55],733:[0,.69444,0,0,.55],915:[0,.69444,0,0,.58056],916:[0,.69444,0,0,.91667],920:[0,.69444,0,0,.85556],923:[0,.69444,0,0,.67223],926:[0,.69444,0,0,.73334],928:[0,.69444,0,0,.79445],931:[0,.69444,0,0,.79445],933:[0,.69444,0,0,.85556],934:[0,.69444,0,0,.79445],936:[0,.69444,0,0,.85556],937:[0,.69444,0,0,.79445],8211:[0,.45833,.03056,0,.55],8212:[0,.45833,.03056,0,1.10001],8216:[0,.69444,0,0,.30556],8217:[0,.69444,0,0,.30556],8220:[0,.69444,0,0,.55834],8221:[0,.69444,0,0,.55834]},"SansSerif-Italic":{32:[0,0,0,0,.25],33:[0,.69444,.05733,0,.31945],34:[0,.69444,.00316,0,.5],35:[.19444,.69444,.05087,0,.83334],36:[.05556,.75,.11156,0,.5],37:[.05556,.75,.03126,0,.83334],38:[0,.69444,.03058,0,.75834],39:[0,.69444,.07816,0,.27778],40:[.25,.75,.13164,0,.38889],41:[.25,.75,.02536,0,.38889],42:[0,.75,.11775,0,.5],43:[.08333,.58333,.02536,0,.77778],44:[.125,.08333,0,0,.27778],45:[0,.44444,.01946,0,.33333],46:[0,.08333,0,0,.27778],47:[.25,.75,.13164,0,.5],48:[0,.65556,.11156,0,.5],49:[0,.65556,.11156,0,.5],50:[0,.65556,.11156,0,.5],51:[0,.65556,.11156,0,.5],52:[0,.65556,.11156,0,.5],53:[0,.65556,.11156,0,.5],54:[0,.65556,.11156,0,.5],55:[0,.65556,.11156,0,.5],56:[0,.65556,.11156,0,.5],57:[0,.65556,.11156,0,.5],58:[0,.44444,.02502,0,.27778],59:[.125,.44444,.02502,0,.27778],61:[-.13,.37,.05087,0,.77778],63:[0,.69444,.11809,0,.47222],64:[0,.69444,.07555,0,.66667],65:[0,.69444,0,0,.66667],66:[0,.69444,.08293,0,.66667],67:[0,.69444,.11983,0,.63889],68:[0,.69444,.07555,0,.72223],69:[0,.69444,.11983,0,.59722],70:[0,.69444,.13372,0,.56945],71:[0,.69444,.11983,0,.66667],72:[0,.69444,.08094,0,.70834],73:[0,.69444,.13372,0,.27778],74:[0,.69444,.08094,0,.47222],75:[0,.69444,.11983,0,.69445],76:[0,.69444,0,0,.54167],77:[0,.69444,.08094,0,.875],78:[0,.69444,.08094,0,.70834],79:[0,.69444,.07555,0,.73611],80:[0,.69444,.08293,0,.63889],81:[.125,.69444,.07555,0,.73611],82:[0,.69444,.08293,0,.64584],83:[0,.69444,.09205,0,.55556],84:[0,.69444,.13372,0,.68056],85:[0,.69444,.08094,0,.6875],86:[0,.69444,.1615,0,.66667],87:[0,.69444,.1615,0,.94445],88:[0,.69444,.13372,0,.66667],89:[0,.69444,.17261,0,.66667],90:[0,.69444,.11983,0,.61111],91:[.25,.75,.15942,0,.28889],93:[.25,.75,.08719,0,.28889],94:[0,.69444,.0799,0,.5],95:[.35,.09444,.08616,0,.5],97:[0,.44444,.00981,0,.48056],98:[0,.69444,.03057,0,.51667],99:[0,.44444,.08336,0,.44445],100:[0,.69444,.09483,0,.51667],101:[0,.44444,.06778,0,.44445],102:[0,.69444,.21705,0,.30556],103:[.19444,.44444,.10836,0,.5],104:[0,.69444,.01778,0,.51667],105:[0,.67937,.09718,0,.23889],106:[.19444,.67937,.09162,0,.26667],107:[0,.69444,.08336,0,.48889],108:[0,.69444,.09483,0,.23889],109:[0,.44444,.01778,0,.79445],110:[0,.44444,.01778,0,.51667],111:[0,.44444,.06613,0,.5],112:[.19444,.44444,.0389,0,.51667],113:[.19444,.44444,.04169,0,.51667],114:[0,.44444,.10836,0,.34167],115:[0,.44444,.0778,0,.38333],116:[0,.57143,.07225,0,.36111],117:[0,.44444,.04169,0,.51667],118:[0,.44444,.10836,0,.46111],119:[0,.44444,.10836,0,.68334],120:[0,.44444,.09169,0,.46111],121:[.19444,.44444,.10836,0,.46111],122:[0,.44444,.08752,0,.43472],126:[.35,.32659,.08826,0,.5],160:[0,0,0,0,.25],168:[0,.67937,.06385,0,.5],176:[0,.69444,0,0,.73752],184:[.17014,0,0,0,.44445],305:[0,.44444,.04169,0,.23889],567:[.19444,.44444,.04169,0,.26667],710:[0,.69444,.0799,0,.5],711:[0,.63194,.08432,0,.5],713:[0,.60889,.08776,0,.5],714:[0,.69444,.09205,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,.09483,0,.5],729:[0,.67937,.07774,0,.27778],730:[0,.69444,0,0,.73752],732:[0,.67659,.08826,0,.5],733:[0,.69444,.09205,0,.5],915:[0,.69444,.13372,0,.54167],916:[0,.69444,0,0,.83334],920:[0,.69444,.07555,0,.77778],923:[0,.69444,0,0,.61111],926:[0,.69444,.12816,0,.66667],928:[0,.69444,.08094,0,.70834],931:[0,.69444,.11983,0,.72222],933:[0,.69444,.09031,0,.77778],934:[0,.69444,.04603,0,.72222],936:[0,.69444,.09031,0,.77778],937:[0,.69444,.08293,0,.72222],8211:[0,.44444,.08616,0,.5],8212:[0,.44444,.08616,0,1],8216:[0,.69444,.07816,0,.27778],8217:[0,.69444,.07816,0,.27778],8220:[0,.69444,.14205,0,.5],8221:[0,.69444,.00316,0,.5]},"SansSerif-Regular":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.31945],34:[0,.69444,0,0,.5],35:[.19444,.69444,0,0,.83334],36:[.05556,.75,0,0,.5],37:[.05556,.75,0,0,.83334],38:[0,.69444,0,0,.75834],39:[0,.69444,0,0,.27778],40:[.25,.75,0,0,.38889],41:[.25,.75,0,0,.38889],42:[0,.75,0,0,.5],43:[.08333,.58333,0,0,.77778],44:[.125,.08333,0,0,.27778],45:[0,.44444,0,0,.33333],46:[0,.08333,0,0,.27778],47:[.25,.75,0,0,.5],48:[0,.65556,0,0,.5],49:[0,.65556,0,0,.5],50:[0,.65556,0,0,.5],51:[0,.65556,0,0,.5],52:[0,.65556,0,0,.5],53:[0,.65556,0,0,.5],54:[0,.65556,0,0,.5],55:[0,.65556,0,0,.5],56:[0,.65556,0,0,.5],57:[0,.65556,0,0,.5],58:[0,.44444,0,0,.27778],59:[.125,.44444,0,0,.27778],61:[-.13,.37,0,0,.77778],63:[0,.69444,0,0,.47222],64:[0,.69444,0,0,.66667],65:[0,.69444,0,0,.66667],66:[0,.69444,0,0,.66667],67:[0,.69444,0,0,.63889],68:[0,.69444,0,0,.72223],69:[0,.69444,0,0,.59722],70:[0,.69444,0,0,.56945],71:[0,.69444,0,0,.66667],72:[0,.69444,0,0,.70834],73:[0,.69444,0,0,.27778],74:[0,.69444,0,0,.47222],75:[0,.69444,0,0,.69445],76:[0,.69444,0,0,.54167],77:[0,.69444,0,0,.875],78:[0,.69444,0,0,.70834],79:[0,.69444,0,0,.73611],80:[0,.69444,0,0,.63889],81:[.125,.69444,0,0,.73611],82:[0,.69444,0,0,.64584],83:[0,.69444,0,0,.55556],84:[0,.69444,0,0,.68056],85:[0,.69444,0,0,.6875],86:[0,.69444,.01389,0,.66667],87:[0,.69444,.01389,0,.94445],88:[0,.69444,0,0,.66667],89:[0,.69444,.025,0,.66667],90:[0,.69444,0,0,.61111],91:[.25,.75,0,0,.28889],93:[.25,.75,0,0,.28889],94:[0,.69444,0,0,.5],95:[.35,.09444,.02778,0,.5],97:[0,.44444,0,0,.48056],98:[0,.69444,0,0,.51667],99:[0,.44444,0,0,.44445],100:[0,.69444,0,0,.51667],101:[0,.44444,0,0,.44445],102:[0,.69444,.06944,0,.30556],103:[.19444,.44444,.01389,0,.5],104:[0,.69444,0,0,.51667],105:[0,.67937,0,0,.23889],106:[.19444,.67937,0,0,.26667],107:[0,.69444,0,0,.48889],108:[0,.69444,0,0,.23889],109:[0,.44444,0,0,.79445],110:[0,.44444,0,0,.51667],111:[0,.44444,0,0,.5],112:[.19444,.44444,0,0,.51667],113:[.19444,.44444,0,0,.51667],114:[0,.44444,.01389,0,.34167],115:[0,.44444,0,0,.38333],116:[0,.57143,0,0,.36111],117:[0,.44444,0,0,.51667],118:[0,.44444,.01389,0,.46111],119:[0,.44444,.01389,0,.68334],120:[0,.44444,0,0,.46111],121:[.19444,.44444,.01389,0,.46111],122:[0,.44444,0,0,.43472],126:[.35,.32659,0,0,.5],160:[0,0,0,0,.25],168:[0,.67937,0,0,.5],176:[0,.69444,0,0,.66667],184:[.17014,0,0,0,.44445],305:[0,.44444,0,0,.23889],567:[.19444,.44444,0,0,.26667],710:[0,.69444,0,0,.5],711:[0,.63194,0,0,.5],713:[0,.60889,0,0,.5],714:[0,.69444,0,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,0,0,.5],729:[0,.67937,0,0,.27778],730:[0,.69444,0,0,.66667],732:[0,.67659,0,0,.5],733:[0,.69444,0,0,.5],915:[0,.69444,0,0,.54167],916:[0,.69444,0,0,.83334],920:[0,.69444,0,0,.77778],923:[0,.69444,0,0,.61111],926:[0,.69444,0,0,.66667],928:[0,.69444,0,0,.70834],931:[0,.69444,0,0,.72222],933:[0,.69444,0,0,.77778],934:[0,.69444,0,0,.72222],936:[0,.69444,0,0,.77778],937:[0,.69444,0,0,.72222],8211:[0,.44444,.02778,0,.5],8212:[0,.44444,.02778,0,1],8216:[0,.69444,0,0,.27778],8217:[0,.69444,0,0,.27778],8220:[0,.69444,0,0,.5],8221:[0,.69444,0,0,.5]},"Script-Regular":{32:[0,0,0,0,.25],65:[0,.7,.22925,0,.80253],66:[0,.7,.04087,0,.90757],67:[0,.7,.1689,0,.66619],68:[0,.7,.09371,0,.77443],69:[0,.7,.18583,0,.56162],70:[0,.7,.13634,0,.89544],71:[0,.7,.17322,0,.60961],72:[0,.7,.29694,0,.96919],73:[0,.7,.19189,0,.80907],74:[.27778,.7,.19189,0,1.05159],75:[0,.7,.31259,0,.91364],76:[0,.7,.19189,0,.87373],77:[0,.7,.15981,0,1.08031],78:[0,.7,.3525,0,.9015],79:[0,.7,.08078,0,.73787],80:[0,.7,.08078,0,1.01262],81:[0,.7,.03305,0,.88282],82:[0,.7,.06259,0,.85],83:[0,.7,.19189,0,.86767],84:[0,.7,.29087,0,.74697],85:[0,.7,.25815,0,.79996],86:[0,.7,.27523,0,.62204],87:[0,.7,.27523,0,.80532],88:[0,.7,.26006,0,.94445],89:[0,.7,.2939,0,.70961],90:[0,.7,.24037,0,.8212],160:[0,0,0,0,.25]},"Size1-Regular":{32:[0,0,0,0,.25],40:[.35001,.85,0,0,.45834],41:[.35001,.85,0,0,.45834],47:[.35001,.85,0,0,.57778],91:[.35001,.85,0,0,.41667],92:[.35001,.85,0,0,.57778],93:[.35001,.85,0,0,.41667],123:[.35001,.85,0,0,.58334],125:[.35001,.85,0,0,.58334],160:[0,0,0,0,.25],710:[0,.72222,0,0,.55556],732:[0,.72222,0,0,.55556],770:[0,.72222,0,0,.55556],771:[0,.72222,0,0,.55556],8214:[-99e-5,.601,0,0,.77778],8593:[1e-5,.6,0,0,.66667],8595:[1e-5,.6,0,0,.66667],8657:[1e-5,.6,0,0,.77778],8659:[1e-5,.6,0,0,.77778],8719:[.25001,.75,0,0,.94445],8720:[.25001,.75,0,0,.94445],8721:[.25001,.75,0,0,1.05556],8730:[.35001,.85,0,0,1],8739:[-.00599,.606,0,0,.33333],8741:[-.00599,.606,0,0,.55556],8747:[.30612,.805,.19445,0,.47222],8748:[.306,.805,.19445,0,.47222],8749:[.306,.805,.19445,0,.47222],8750:[.30612,.805,.19445,0,.47222],8896:[.25001,.75,0,0,.83334],8897:[.25001,.75,0,0,.83334],8898:[.25001,.75,0,0,.83334],8899:[.25001,.75,0,0,.83334],8968:[.35001,.85,0,0,.47222],8969:[.35001,.85,0,0,.47222],8970:[.35001,.85,0,0,.47222],8971:[.35001,.85,0,0,.47222],9168:[-99e-5,.601,0,0,.66667],10216:[.35001,.85,0,0,.47222],10217:[.35001,.85,0,0,.47222],10752:[.25001,.75,0,0,1.11111],10753:[.25001,.75,0,0,1.11111],10754:[.25001,.75,0,0,1.11111],10756:[.25001,.75,0,0,.83334],10758:[.25001,.75,0,0,.83334]},"Size2-Regular":{32:[0,0,0,0,.25],40:[.65002,1.15,0,0,.59722],41:[.65002,1.15,0,0,.59722],47:[.65002,1.15,0,0,.81111],91:[.65002,1.15,0,0,.47222],92:[.65002,1.15,0,0,.81111],93:[.65002,1.15,0,0,.47222],123:[.65002,1.15,0,0,.66667],125:[.65002,1.15,0,0,.66667],160:[0,0,0,0,.25],710:[0,.75,0,0,1],732:[0,.75,0,0,1],770:[0,.75,0,0,1],771:[0,.75,0,0,1],8719:[.55001,1.05,0,0,1.27778],8720:[.55001,1.05,0,0,1.27778],8721:[.55001,1.05,0,0,1.44445],8730:[.65002,1.15,0,0,1],8747:[.86225,1.36,.44445,0,.55556],8748:[.862,1.36,.44445,0,.55556],8749:[.862,1.36,.44445,0,.55556],8750:[.86225,1.36,.44445,0,.55556],8896:[.55001,1.05,0,0,1.11111],8897:[.55001,1.05,0,0,1.11111],8898:[.55001,1.05,0,0,1.11111],8899:[.55001,1.05,0,0,1.11111],8968:[.65002,1.15,0,0,.52778],8969:[.65002,1.15,0,0,.52778],8970:[.65002,1.15,0,0,.52778],8971:[.65002,1.15,0,0,.52778],10216:[.65002,1.15,0,0,.61111],10217:[.65002,1.15,0,0,.61111],10752:[.55001,1.05,0,0,1.51112],10753:[.55001,1.05,0,0,1.51112],10754:[.55001,1.05,0,0,1.51112],10756:[.55001,1.05,0,0,1.11111],10758:[.55001,1.05,0,0,1.11111]},"Size3-Regular":{32:[0,0,0,0,.25],40:[.95003,1.45,0,0,.73611],41:[.95003,1.45,0,0,.73611],47:[.95003,1.45,0,0,1.04445],91:[.95003,1.45,0,0,.52778],92:[.95003,1.45,0,0,1.04445],93:[.95003,1.45,0,0,.52778],123:[.95003,1.45,0,0,.75],125:[.95003,1.45,0,0,.75],160:[0,0,0,0,.25],710:[0,.75,0,0,1.44445],732:[0,.75,0,0,1.44445],770:[0,.75,0,0,1.44445],771:[0,.75,0,0,1.44445],8730:[.95003,1.45,0,0,1],8968:[.95003,1.45,0,0,.58334],8969:[.95003,1.45,0,0,.58334],8970:[.95003,1.45,0,0,.58334],8971:[.95003,1.45,0,0,.58334],10216:[.95003,1.45,0,0,.75],10217:[.95003,1.45,0,0,.75]},"Size4-Regular":{32:[0,0,0,0,.25],40:[1.25003,1.75,0,0,.79167],41:[1.25003,1.75,0,0,.79167],47:[1.25003,1.75,0,0,1.27778],91:[1.25003,1.75,0,0,.58334],92:[1.25003,1.75,0,0,1.27778],93:[1.25003,1.75,0,0,.58334],123:[1.25003,1.75,0,0,.80556],125:[1.25003,1.75,0,0,.80556],160:[0,0,0,0,.25],710:[0,.825,0,0,1.8889],732:[0,.825,0,0,1.8889],770:[0,.825,0,0,1.8889],771:[0,.825,0,0,1.8889],8730:[1.25003,1.75,0,0,1],8968:[1.25003,1.75,0,0,.63889],8969:[1.25003,1.75,0,0,.63889],8970:[1.25003,1.75,0,0,.63889],8971:[1.25003,1.75,0,0,.63889],9115:[.64502,1.155,0,0,.875],9116:[1e-5,.6,0,0,.875],9117:[.64502,1.155,0,0,.875],9118:[.64502,1.155,0,0,.875],9119:[1e-5,.6,0,0,.875],9120:[.64502,1.155,0,0,.875],9121:[.64502,1.155,0,0,.66667],9122:[-99e-5,.601,0,0,.66667],9123:[.64502,1.155,0,0,.66667],9124:[.64502,1.155,0,0,.66667],9125:[-99e-5,.601,0,0,.66667],9126:[.64502,1.155,0,0,.66667],9127:[1e-5,.9,0,0,.88889],9128:[.65002,1.15,0,0,.88889],9129:[.90001,0,0,0,.88889],9130:[0,.3,0,0,.88889],9131:[1e-5,.9,0,0,.88889],9132:[.65002,1.15,0,0,.88889],9133:[.90001,0,0,0,.88889],9143:[.88502,.915,0,0,1.05556],10216:[1.25003,1.75,0,0,.80556],10217:[1.25003,1.75,0,0,.80556],57344:[-.00499,.605,0,0,1.05556],57345:[-.00499,.605,0,0,1.05556],57680:[0,.12,0,0,.45],57681:[0,.12,0,0,.45],57682:[0,.12,0,0,.45],57683:[0,.12,0,0,.45]},"Typewriter-Regular":{32:[0,0,0,0,.525],33:[0,.61111,0,0,.525],34:[0,.61111,0,0,.525],35:[0,.61111,0,0,.525],36:[.08333,.69444,0,0,.525],37:[.08333,.69444,0,0,.525],38:[0,.61111,0,0,.525],39:[0,.61111,0,0,.525],40:[.08333,.69444,0,0,.525],41:[.08333,.69444,0,0,.525],42:[0,.52083,0,0,.525],43:[-.08056,.53055,0,0,.525],44:[.13889,.125,0,0,.525],45:[-.08056,.53055,0,0,.525],46:[0,.125,0,0,.525],47:[.08333,.69444,0,0,.525],48:[0,.61111,0,0,.525],49:[0,.61111,0,0,.525],50:[0,.61111,0,0,.525],51:[0,.61111,0,0,.525],52:[0,.61111,0,0,.525],53:[0,.61111,0,0,.525],54:[0,.61111,0,0,.525],55:[0,.61111,0,0,.525],56:[0,.61111,0,0,.525],57:[0,.61111,0,0,.525],58:[0,.43056,0,0,.525],59:[.13889,.43056,0,0,.525],60:[-.05556,.55556,0,0,.525],61:[-.19549,.41562,0,0,.525],62:[-.05556,.55556,0,0,.525],63:[0,.61111,0,0,.525],64:[0,.61111,0,0,.525],65:[0,.61111,0,0,.525],66:[0,.61111,0,0,.525],67:[0,.61111,0,0,.525],68:[0,.61111,0,0,.525],69:[0,.61111,0,0,.525],70:[0,.61111,0,0,.525],71:[0,.61111,0,0,.525],72:[0,.61111,0,0,.525],73:[0,.61111,0,0,.525],74:[0,.61111,0,0,.525],75:[0,.61111,0,0,.525],76:[0,.61111,0,0,.525],77:[0,.61111,0,0,.525],78:[0,.61111,0,0,.525],79:[0,.61111,0,0,.525],80:[0,.61111,0,0,.525],81:[.13889,.61111,0,0,.525],82:[0,.61111,0,0,.525],83:[0,.61111,0,0,.525],84:[0,.61111,0,0,.525],85:[0,.61111,0,0,.525],86:[0,.61111,0,0,.525],87:[0,.61111,0,0,.525],88:[0,.61111,0,0,.525],89:[0,.61111,0,0,.525],90:[0,.61111,0,0,.525],91:[.08333,.69444,0,0,.525],92:[.08333,.69444,0,0,.525],93:[.08333,.69444,0,0,.525],94:[0,.61111,0,0,.525],95:[.09514,0,0,0,.525],96:[0,.61111,0,0,.525],97:[0,.43056,0,0,.525],98:[0,.61111,0,0,.525],99:[0,.43056,0,0,.525],100:[0,.61111,0,0,.525],101:[0,.43056,0,0,.525],102:[0,.61111,0,0,.525],103:[.22222,.43056,0,0,.525],104:[0,.61111,0,0,.525],105:[0,.61111,0,0,.525],106:[.22222,.61111,0,0,.525],107:[0,.61111,0,0,.525],108:[0,.61111,0,0,.525],109:[0,.43056,0,0,.525],110:[0,.43056,0,0,.525],111:[0,.43056,0,0,.525],112:[.22222,.43056,0,0,.525],113:[.22222,.43056,0,0,.525],114:[0,.43056,0,0,.525],115:[0,.43056,0,0,.525],116:[0,.55358,0,0,.525],117:[0,.43056,0,0,.525],118:[0,.43056,0,0,.525],119:[0,.43056,0,0,.525],120:[0,.43056,0,0,.525],121:[.22222,.43056,0,0,.525],122:[0,.43056,0,0,.525],123:[.08333,.69444,0,0,.525],124:[.08333,.69444,0,0,.525],125:[.08333,.69444,0,0,.525],126:[0,.61111,0,0,.525],127:[0,.61111,0,0,.525],160:[0,0,0,0,.525],176:[0,.61111,0,0,.525],184:[.19445,0,0,0,.525],305:[0,.43056,0,0,.525],567:[.22222,.43056,0,0,.525],711:[0,.56597,0,0,.525],713:[0,.56555,0,0,.525],714:[0,.61111,0,0,.525],715:[0,.61111,0,0,.525],728:[0,.61111,0,0,.525],730:[0,.61111,0,0,.525],770:[0,.61111,0,0,.525],771:[0,.61111,0,0,.525],776:[0,.61111,0,0,.525],915:[0,.61111,0,0,.525],916:[0,.61111,0,0,.525],920:[0,.61111,0,0,.525],923:[0,.61111,0,0,.525],926:[0,.61111,0,0,.525],928:[0,.61111,0,0,.525],931:[0,.61111,0,0,.525],933:[0,.61111,0,0,.525],934:[0,.61111,0,0,.525],936:[0,.61111,0,0,.525],937:[0,.61111,0,0,.525],8216:[0,.61111,0,0,.525],8217:[0,.61111,0,0,.525],8242:[0,.61111,0,0,.525],9251:[.11111,.21944,0,0,.525]}},Xo={slant:[.25,.25,.25],space:[0,0,0],stretch:[0,0,0],shrink:[0,0,0],xHeight:[.431,.431,.431],quad:[1,1.171,1.472],extraSpace:[0,0,0],num1:[.677,.732,.925],num2:[.394,.384,.387],num3:[.444,.471,.504],denom1:[.686,.752,1.025],denom2:[.345,.344,.532],sup1:[.413,.503,.504],sup2:[.363,.431,.404],sup3:[.289,.286,.294],sub1:[.15,.143,.2],sub2:[.247,.286,.4],supDrop:[.386,.353,.494],subDrop:[.05,.071,.1],delim1:[2.39,1.7,1.98],delim2:[1.01,1.157,1.42],axisHeight:[.25,.25,.25],defaultRuleThickness:[.04,.049,.049],bigOpSpacing1:[.111,.111,.111],bigOpSpacing2:[.166,.166,.166],bigOpSpacing3:[.2,.2,.2],bigOpSpacing4:[.6,.611,.611],bigOpSpacing5:[.1,.143,.143],sqrtRuleThickness:[.04,.04,.04],ptPerEm:[10,10,10],doubleRuleSep:[.2,.2,.2],arrayRuleWidth:[.04,.04,.04],fboxsep:[.3,.3,.3],fboxrule:[.04,.04,.04]},Hu={\u00C5:"A",\u00D0:"D",\u00DE:"o",\u00E5:"a",\u00F0:"d",\u00FE:"o",\u0410:"A",\u0411:"B",\u0412:"B",\u0413:"F",\u0414:"A",\u0415:"E",\u0416:"K",\u0417:"3",\u0418:"N",\u0419:"N",\u041A:"K",\u041B:"N",\u041C:"M",\u041D:"H",\u041E:"O",\u041F:"N",\u0420:"P",\u0421:"C",\u0422:"T",\u0423:"y",\u0424:"O",\u0425:"X",\u0426:"U",\u0427:"h",\u0428:"W",\u0429:"W",\u042A:"B",\u042B:"X",\u042C:"B",\u042D:"3",\u042E:"X",\u042F:"R",\u0430:"a",\u0431:"b",\u0432:"a",\u0433:"r",\u0434:"y",\u0435:"e",\u0436:"m",\u0437:"e",\u0438:"n",\u0439:"n",\u043A:"n",\u043B:"n",\u043C:"m",\u043D:"n",\u043E:"o",\u043F:"n",\u0440:"p",\u0441:"c",\u0442:"o",\u0443:"y",\u0444:"b",\u0445:"x",\u0446:"n",\u0447:"n",\u0448:"w",\u0449:"w",\u044A:"a",\u044B:"m",\u044C:"a",\u044D:"e",\u044E:"m",\u044F:"r"};function xv(t,e){lr[t]=e}function pl(t,e,r){if(!lr[e])throw new Error("Font metrics not found for font: "+e+".");var i=t.charCodeAt(0),o=lr[e][i];if(!o&&t[0]in Hu&&(i=Hu[t[0]].charCodeAt(0),o=lr[e][i]),!o&&r==="text"&&gd(i)&&(o=lr[e][77]),o)return{depth:o[0],height:o[1],italic:o[2],skew:o[3],width:o[4]}}var Na={};function Sv(t){var e;if(t>=5?e=0:t>=3?e=1:e=2,!Na[e]){var r=Na[e]={cssEmPerMu:Xo.quad[e]/18};for(var i in Xo)Xo.hasOwnProperty(i)&&(r[i]=Xo[i][e])}return Na[e]}var kv=[[1,1,1],[2,1,1],[3,1,1],[4,2,1],[5,2,1],[6,3,1],[7,4,2],[8,6,3],[9,7,6],[10,8,7],[11,10,9]],Fu=[.5,.6,.7,.8,.9,1,1.2,1.44,1.728,2.074,2.488],Nu=function(e,r){return r.size<2?e:kv[e-1][r.size-1]},hn=class t{constructor(e){this.style=void 0,this.color=void 0,this.size=void 0,this.textSize=void 0,this.phantom=void 0,this.font=void 0,this.fontFamily=void 0,this.fontWeight=void 0,this.fontShape=void 0,this.sizeMultiplier=void 0,this.maxSize=void 0,this.minRuleThickness=void 0,this._fontMetrics=void 0,this.style=e.style,this.color=e.color,this.size=e.size||t.BASESIZE,this.textSize=e.textSize||this.size,this.phantom=!!e.phantom,this.font=e.font||"",this.fontFamily=e.fontFamily||"",this.fontWeight=e.fontWeight||"",this.fontShape=e.fontShape||"",this.sizeMultiplier=Fu[this.size-1],this.maxSize=e.maxSize,this.minRuleThickness=e.minRuleThickness,this._fontMetrics=void 0}extend(e){var r={style:this.style,size:this.size,textSize:this.textSize,color:this.color,phantom:this.phantom,font:this.font,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontShape:this.fontShape,maxSize:this.maxSize,minRuleThickness:this.minRuleThickness};for(var i in e)e.hasOwnProperty(i)&&(r[i]=e[i]);return new t(r)}havingStyle(e){return this.style===e?this:this.extend({style:e,size:Nu(this.textSize,e)})}havingCrampedStyle(){return this.havingStyle(this.style.cramp())}havingSize(e){return this.size===e&&this.textSize===e?this:this.extend({style:this.style.text(),size:e,textSize:e,sizeMultiplier:Fu[e-1]})}havingBaseStyle(e){e=e||this.style.text();var r=Nu(t.BASESIZE,e);return this.size===r&&this.textSize===t.BASESIZE&&this.style===e?this:this.extend({style:e,size:r})}havingBaseSizing(){var e;switch(this.style.id){case 4:case 5:e=3;break;case 6:case 7:e=1;break;default:e=6}return this.extend({style:this.style.text(),size:e})}withColor(e){return this.extend({color:e})}withPhantom(){return this.extend({phantom:!0})}withFont(e){return this.extend({font:e})}withTextFontFamily(e){return this.extend({fontFamily:e,font:""})}withTextFontWeight(e){return this.extend({fontWeight:e,font:""})}withTextFontShape(e){return this.extend({fontShape:e,font:""})}sizingClasses(e){return e.size!==this.size?["sizing","reset-size"+e.size,"size"+this.size]:[]}baseSizingClasses(){return this.size!==t.BASESIZE?["sizing","reset-size"+this.size,"size"+t.BASESIZE]:[]}fontMetrics(){return this._fontMetrics||(this._fontMetrics=Sv(this.size)),this._fontMetrics}getColor(){return this.phantom?"transparent":this.color}};hn.BASESIZE=6;var tl={pt:1,mm:7227/2540,cm:7227/254,in:72.27,bp:803/800,pc:12,dd:1238/1157,cc:14856/1157,nd:685/642,nc:1370/107,sp:1/65536,px:803/800},Cv={ex:!0,em:!0,mu:!0},vd=function(e){return typeof e!="string"&&(e=e.unit),e in tl||e in Cv||e==="ex"},Ge=function(e,r){var i;if(e.unit in tl)i=tl[e.unit]/r.fontMetrics().ptPerEm/r.sizeMultiplier;else if(e.unit==="mu")i=r.fontMetrics().cssEmPerMu;else{var o;if(r.style.isTight()?o=r.havingStyle(r.style.text()):o=r,e.unit==="ex")i=o.fontMetrics().xHeight;else if(e.unit==="em")i=o.fontMetrics().quad;else throw new te("Invalid unit: '"+e.unit+"'");o!==r&&(i*=o.sizeMultiplier/r.sizeMultiplier)}return Math.min(e.number*i,r.maxSize)},se=function(e){return+e.toFixed(4)+"em"},Kr=function(e){return e.filter(r=>r).join(" ")},bd=function(e,r,i){if(this.classes=e||[],this.attributes={},this.height=0,this.depth=0,this.maxFontSize=0,this.style=i||{},r){r.style.isTight()&&this.classes.push("mtight");var o=r.getColor();o&&(this.style.color=o)}},_d=function(e){var r=document.createElement(e);r.className=Kr(this.classes);for(var i in this.style)this.style.hasOwnProperty(i)&&(r.style[i]=this.style[i]);for(var o in this.attributes)this.attributes.hasOwnProperty(o)&&r.setAttribute(o,this.attributes[o]);for(var s=0;s<this.children.length;s++)r.appendChild(this.children[s].toNode());return r},Ev=/[\s"'>/=\x00-\x1f]/,yd=function(e){var r="<"+e;this.classes.length&&(r+=' class="'+de.escape(Kr(this.classes))+'"');var i="";for(var o in this.style)this.style.hasOwnProperty(o)&&(i+=de.hyphenate(o)+":"+this.style[o]+";");i&&(r+=' style="'+de.escape(i)+'"');for(var s in this.attributes)if(this.attributes.hasOwnProperty(s)){if(Ev.test(s))throw new te("Invalid attribute name '"+s+"'");r+=" "+s+'="'+de.escape(this.attributes[s])+'"'}r+=">";for(var n=0;n<this.children.length;n++)r+=this.children[n].toMarkup();return r+="</"+e+">",r},vi=class{constructor(e,r,i,o){this.children=void 0,this.attributes=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.width=void 0,this.maxFontSize=void 0,this.style=void 0,bd.call(this,e,i,o),this.children=r||[]}setAttribute(e,r){this.attributes[e]=r}hasClass(e){return de.contains(this.classes,e)}toNode(){return _d.call(this,"span")}toMarkup(){return yd.call(this,"span")}},qs=class{constructor(e,r,i,o){this.children=void 0,this.attributes=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,bd.call(this,r,o),this.children=i||[],this.setAttribute("href",e)}setAttribute(e,r){this.attributes[e]=r}hasClass(e){return de.contains(this.classes,e)}toNode(){return _d.call(this,"a")}toMarkup(){return yd.call(this,"a")}},rl=class{constructor(e,r,i){this.src=void 0,this.alt=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,this.alt=r,this.src=e,this.classes=["mord"],this.style=i}hasClass(e){return de.contains(this.classes,e)}toNode(){var e=document.createElement("img");e.src=this.src,e.alt=this.alt,e.className="mord";for(var r in this.style)this.style.hasOwnProperty(r)&&(e.style[r]=this.style[r]);return e}toMarkup(){var e='<img src="'+de.escape(this.src)+'"'+(' alt="'+de.escape(this.alt)+'"'),r="";for(var i in this.style)this.style.hasOwnProperty(i)&&(r+=de.hyphenate(i)+":"+this.style[i]+";");return r&&(e+=' style="'+de.escape(r)+'"'),e+="'/>",e}},Av={\u00EE:"\u0131\u0302",\u00EF:"\u0131\u0308",\u00ED:"\u0131\u0301",\u00EC:"\u0131\u0300"},Et=class{constructor(e,r,i,o,s,n,a,l){this.text=void 0,this.height=void 0,this.depth=void 0,this.italic=void 0,this.skew=void 0,this.width=void 0,this.maxFontSize=void 0,this.classes=void 0,this.style=void 0,this.text=e,this.height=r||0,this.depth=i||0,this.italic=o||0,this.skew=s||0,this.width=n||0,this.classes=a||[],this.style=l||{},this.maxFontSize=0;var c=uv(this.text.charCodeAt(0));c&&this.classes.push(c+"_fallback"),/[îïíì]/.test(this.text)&&(this.text=Av[this.text])}hasClass(e){return de.contains(this.classes,e)}toNode(){var e=document.createTextNode(this.text),r=null;this.italic>0&&(r=document.createElement("span"),r.style.marginRight=se(this.italic)),this.classes.length>0&&(r=r||document.createElement("span"),r.className=Kr(this.classes));for(var i in this.style)this.style.hasOwnProperty(i)&&(r=r||document.createElement("span"),r.style[i]=this.style[i]);return r?(r.appendChild(e),r):e}toMarkup(){var e=!1,r="<span";this.classes.length&&(e=!0,r+=' class="',r+=de.escape(Kr(this.classes)),r+='"');var i="";this.italic>0&&(i+="margin-right:"+this.italic+"em;");for(var o in this.style)this.style.hasOwnProperty(o)&&(i+=de.hyphenate(o)+":"+this.style[o]+";");i&&(e=!0,r+=' style="'+de.escape(i)+'"');var s=de.escape(this.text);return e?(r+=">",r+=s,r+="</span>",r):s}},er=class{constructor(e,r){this.children=void 0,this.attributes=void 0,this.children=e||[],this.attributes=r||{}}toNode(){var e="http://www.w3.org/2000/svg",r=document.createElementNS(e,"svg");for(var i in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,i)&&r.setAttribute(i,this.attributes[i]);for(var o=0;o<this.children.length;o++)r.appendChild(this.children[o].toNode());return r}toMarkup(){var e='<svg xmlns="http://www.w3.org/2000/svg"';for(var r in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,r)&&(e+=" "+r+'="'+de.escape(this.attributes[r])+'"');e+=">";for(var i=0;i<this.children.length;i++)e+=this.children[i].toMarkup();return e+="</svg>",e}},cr=class{constructor(e,r){this.pathName=void 0,this.alternate=void 0,this.pathName=e,this.alternate=r}toNode(){var e="http://www.w3.org/2000/svg",r=document.createElementNS(e,"path");return this.alternate?r.setAttribute("d",this.alternate):r.setAttribute("d",Pu[this.pathName]),r}toMarkup(){return this.alternate?'<path d="'+de.escape(this.alternate)+'"/>':'<path d="'+de.escape(Pu[this.pathName])+'"/>'}},Vs=class{constructor(e){this.attributes=void 0,this.attributes=e||{}}toNode(){var e="http://www.w3.org/2000/svg",r=document.createElementNS(e,"line");for(var i in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,i)&&r.setAttribute(i,this.attributes[i]);return r}toMarkup(){var e="<line";for(var r in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,r)&&(e+=" "+r+'="'+de.escape(this.attributes[r])+'"');return e+="/>",e}};function qu(t){if(t instanceof Et)return t;throw new Error("Expected symbolNode but got "+String(t)+".")}function Tv(t){if(t instanceof vi)return t;throw new Error("Expected span<HtmlDomNode> but got "+String(t)+".")}var Mv={bin:1,close:1,inner:1,open:1,punct:1,rel:1},Rv={"accent-token":1,mathord:1,"op-token":1,spacing:1,textord:1},Pe={math:{},text:{}};function b(t,e,r,i,o,s){Pe[t][o]={font:e,group:r,replace:i},s&&i&&(Pe[t][i]=Pe[t][o])}var w="math",Y="text",E="main",O="ams",Ve="accent-token",le="bin",yt="close",ji="inner",me="mathord",Je="op-token",$t="open",vn="punct",I="rel",Mr="spacing",H="textord";b(w,E,I,"\u2261","\\equiv",!0);b(w,E,I,"\u227A","\\prec",!0);b(w,E,I,"\u227B","\\succ",!0);b(w,E,I,"\u223C","\\sim",!0);b(w,E,I,"\u22A5","\\perp");b(w,E,I,"\u2AAF","\\preceq",!0);b(w,E,I,"\u2AB0","\\succeq",!0);b(w,E,I,"\u2243","\\simeq",!0);b(w,E,I,"\u2223","\\mid",!0);b(w,E,I,"\u226A","\\ll",!0);b(w,E,I,"\u226B","\\gg",!0);b(w,E,I,"\u224D","\\asymp",!0);b(w,E,I,"\u2225","\\parallel");b(w,E,I,"\u22C8","\\bowtie",!0);b(w,E,I,"\u2323","\\smile",!0);b(w,E,I,"\u2291","\\sqsubseteq",!0);b(w,E,I,"\u2292","\\sqsupseteq",!0);b(w,E,I,"\u2250","\\doteq",!0);b(w,E,I,"\u2322","\\frown",!0);b(w,E,I,"\u220B","\\ni",!0);b(w,E,I,"\u221D","\\propto",!0);b(w,E,I,"\u22A2","\\vdash",!0);b(w,E,I,"\u22A3","\\dashv",!0);b(w,E,I,"\u220B","\\owns");b(w,E,vn,".","\\ldotp");b(w,E,vn,"\u22C5","\\cdotp");b(w,E,H,"#","\\#");b(Y,E,H,"#","\\#");b(w,E,H,"&","\\&");b(Y,E,H,"&","\\&");b(w,E,H,"\u2135","\\aleph",!0);b(w,E,H,"\u2200","\\forall",!0);b(w,E,H,"\u210F","\\hbar",!0);b(w,E,H,"\u2203","\\exists",!0);b(w,E,H,"\u2207","\\nabla",!0);b(w,E,H,"\u266D","\\flat",!0);b(w,E,H,"\u2113","\\ell",!0);b(w,E,H,"\u266E","\\natural",!0);b(w,E,H,"\u2663","\\clubsuit",!0);b(w,E,H,"\u2118","\\wp",!0);b(w,E,H,"\u266F","\\sharp",!0);b(w,E,H,"\u2662","\\diamondsuit",!0);b(w,E,H,"\u211C","\\Re",!0);b(w,E,H,"\u2661","\\heartsuit",!0);b(w,E,H,"\u2111","\\Im",!0);b(w,E,H,"\u2660","\\spadesuit",!0);b(w,E,H,"\xA7","\\S",!0);b(Y,E,H,"\xA7","\\S");b(w,E,H,"\xB6","\\P",!0);b(Y,E,H,"\xB6","\\P");b(w,E,H,"\u2020","\\dag");b(Y,E,H,"\u2020","\\dag");b(Y,E,H,"\u2020","\\textdagger");b(w,E,H,"\u2021","\\ddag");b(Y,E,H,"\u2021","\\ddag");b(Y,E,H,"\u2021","\\textdaggerdbl");b(w,E,yt,"\u23B1","\\rmoustache",!0);b(w,E,$t,"\u23B0","\\lmoustache",!0);b(w,E,yt,"\u27EF","\\rgroup",!0);b(w,E,$t,"\u27EE","\\lgroup",!0);b(w,E,le,"\u2213","\\mp",!0);b(w,E,le,"\u2296","\\ominus",!0);b(w,E,le,"\u228E","\\uplus",!0);b(w,E,le,"\u2293","\\sqcap",!0);b(w,E,le,"\u2217","\\ast");b(w,E,le,"\u2294","\\sqcup",!0);b(w,E,le,"\u25EF","\\bigcirc",!0);b(w,E,le,"\u2219","\\bullet",!0);b(w,E,le,"\u2021","\\ddagger");b(w,E,le,"\u2240","\\wr",!0);b(w,E,le,"\u2A3F","\\amalg");b(w,E,le,"&","\\And");b(w,E,I,"\u27F5","\\longleftarrow",!0);b(w,E,I,"\u21D0","\\Leftarrow",!0);b(w,E,I,"\u27F8","\\Longleftarrow",!0);b(w,E,I,"\u27F6","\\longrightarrow",!0);b(w,E,I,"\u21D2","\\Rightarrow",!0);b(w,E,I,"\u27F9","\\Longrightarrow",!0);b(w,E,I,"\u2194","\\leftrightarrow",!0);b(w,E,I,"\u27F7","\\longleftrightarrow",!0);b(w,E,I,"\u21D4","\\Leftrightarrow",!0);b(w,E,I,"\u27FA","\\Longleftrightarrow",!0);b(w,E,I,"\u21A6","\\mapsto",!0);b(w,E,I,"\u27FC","\\longmapsto",!0);b(w,E,I,"\u2197","\\nearrow",!0);b(w,E,I,"\u21A9","\\hookleftarrow",!0);b(w,E,I,"\u21AA","\\hookrightarrow",!0);b(w,E,I,"\u2198","\\searrow",!0);b(w,E,I,"\u21BC","\\leftharpoonup",!0);b(w,E,I,"\u21C0","\\rightharpoonup",!0);b(w,E,I,"\u2199","\\swarrow",!0);b(w,E,I,"\u21BD","\\leftharpoondown",!0);b(w,E,I,"\u21C1","\\rightharpoondown",!0);b(w,E,I,"\u2196","\\nwarrow",!0);b(w,E,I,"\u21CC","\\rightleftharpoons",!0);b(w,O,I,"\u226E","\\nless",!0);b(w,O,I,"\uE010","\\@nleqslant");b(w,O,I,"\uE011","\\@nleqq");b(w,O,I,"\u2A87","\\lneq",!0);b(w,O,I,"\u2268","\\lneqq",!0);b(w,O,I,"\uE00C","\\@lvertneqq");b(w,O,I,"\u22E6","\\lnsim",!0);b(w,O,I,"\u2A89","\\lnapprox",!0);b(w,O,I,"\u2280","\\nprec",!0);b(w,O,I,"\u22E0","\\npreceq",!0);b(w,O,I,"\u22E8","\\precnsim",!0);b(w,O,I,"\u2AB9","\\precnapprox",!0);b(w,O,I,"\u2241","\\nsim",!0);b(w,O,I,"\uE006","\\@nshortmid");b(w,O,I,"\u2224","\\nmid",!0);b(w,O,I,"\u22AC","\\nvdash",!0);b(w,O,I,"\u22AD","\\nvDash",!0);b(w,O,I,"\u22EA","\\ntriangleleft");b(w,O,I,"\u22EC","\\ntrianglelefteq",!0);b(w,O,I,"\u228A","\\subsetneq",!0);b(w,O,I,"\uE01A","\\@varsubsetneq");b(w,O,I,"\u2ACB","\\subsetneqq",!0);b(w,O,I,"\uE017","\\@varsubsetneqq");b(w,O,I,"\u226F","\\ngtr",!0);b(w,O,I,"\uE00F","\\@ngeqslant");b(w,O,I,"\uE00E","\\@ngeqq");b(w,O,I,"\u2A88","\\gneq",!0);b(w,O,I,"\u2269","\\gneqq",!0);b(w,O,I,"\uE00D","\\@gvertneqq");b(w,O,I,"\u22E7","\\gnsim",!0);b(w,O,I,"\u2A8A","\\gnapprox",!0);b(w,O,I,"\u2281","\\nsucc",!0);b(w,O,I,"\u22E1","\\nsucceq",!0);b(w,O,I,"\u22E9","\\succnsim",!0);b(w,O,I,"\u2ABA","\\succnapprox",!0);b(w,O,I,"\u2246","\\ncong",!0);b(w,O,I,"\uE007","\\@nshortparallel");b(w,O,I,"\u2226","\\nparallel",!0);b(w,O,I,"\u22AF","\\nVDash",!0);b(w,O,I,"\u22EB","\\ntriangleright");b(w,O,I,"\u22ED","\\ntrianglerighteq",!0);b(w,O,I,"\uE018","\\@nsupseteqq");b(w,O,I,"\u228B","\\supsetneq",!0);b(w,O,I,"\uE01B","\\@varsupsetneq");b(w,O,I,"\u2ACC","\\supsetneqq",!0);b(w,O,I,"\uE019","\\@varsupsetneqq");b(w,O,I,"\u22AE","\\nVdash",!0);b(w,O,I,"\u2AB5","\\precneqq",!0);b(w,O,I,"\u2AB6","\\succneqq",!0);b(w,O,I,"\uE016","\\@nsubseteqq");b(w,O,le,"\u22B4","\\unlhd");b(w,O,le,"\u22B5","\\unrhd");b(w,O,I,"\u219A","\\nleftarrow",!0);b(w,O,I,"\u219B","\\nrightarrow",!0);b(w,O,I,"\u21CD","\\nLeftarrow",!0);b(w,O,I,"\u21CF","\\nRightarrow",!0);b(w,O,I,"\u21AE","\\nleftrightarrow",!0);b(w,O,I,"\u21CE","\\nLeftrightarrow",!0);b(w,O,I,"\u25B3","\\vartriangle");b(w,O,H,"\u210F","\\hslash");b(w,O,H,"\u25BD","\\triangledown");b(w,O,H,"\u25CA","\\lozenge");b(w,O,H,"\u24C8","\\circledS");b(w,O,H,"\xAE","\\circledR");b(Y,O,H,"\xAE","\\circledR");b(w,O,H,"\u2221","\\measuredangle",!0);b(w,O,H,"\u2204","\\nexists");b(w,O,H,"\u2127","\\mho");b(w,O,H,"\u2132","\\Finv",!0);b(w,O,H,"\u2141","\\Game",!0);b(w,O,H,"\u2035","\\backprime");b(w,O,H,"\u25B2","\\blacktriangle");b(w,O,H,"\u25BC","\\blacktriangledown");b(w,O,H,"\u25A0","\\blacksquare");b(w,O,H,"\u29EB","\\blacklozenge");b(w,O,H,"\u2605","\\bigstar");b(w,O,H,"\u2222","\\sphericalangle",!0);b(w,O,H,"\u2201","\\complement",!0);b(w,O,H,"\xF0","\\eth",!0);b(Y,E,H,"\xF0","\xF0");b(w,O,H,"\u2571","\\diagup");b(w,O,H,"\u2572","\\diagdown");b(w,O,H,"\u25A1","\\square");b(w,O,H,"\u25A1","\\Box");b(w,O,H,"\u25CA","\\Diamond");b(w,O,H,"\xA5","\\yen",!0);b(Y,O,H,"\xA5","\\yen",!0);b(w,O,H,"\u2713","\\checkmark",!0);b(Y,O,H,"\u2713","\\checkmark");b(w,O,H,"\u2136","\\beth",!0);b(w,O,H,"\u2138","\\daleth",!0);b(w,O,H,"\u2137","\\gimel",!0);b(w,O,H,"\u03DD","\\digamma",!0);b(w,O,H,"\u03F0","\\varkappa");b(w,O,$t,"\u250C","\\@ulcorner",!0);b(w,O,yt,"\u2510","\\@urcorner",!0);b(w,O,$t,"\u2514","\\@llcorner",!0);b(w,O,yt,"\u2518","\\@lrcorner",!0);b(w,O,I,"\u2266","\\leqq",!0);b(w,O,I,"\u2A7D","\\leqslant",!0);b(w,O,I,"\u2A95","\\eqslantless",!0);b(w,O,I,"\u2272","\\lesssim",!0);b(w,O,I,"\u2A85","\\lessapprox",!0);b(w,O,I,"\u224A","\\approxeq",!0);b(w,O,le,"\u22D6","\\lessdot");b(w,O,I,"\u22D8","\\lll",!0);b(w,O,I,"\u2276","\\lessgtr",!0);b(w,O,I,"\u22DA","\\lesseqgtr",!0);b(w,O,I,"\u2A8B","\\lesseqqgtr",!0);b(w,O,I,"\u2251","\\doteqdot");b(w,O,I,"\u2253","\\risingdotseq",!0);b(w,O,I,"\u2252","\\fallingdotseq",!0);b(w,O,I,"\u223D","\\backsim",!0);b(w,O,I,"\u22CD","\\backsimeq",!0);b(w,O,I,"\u2AC5","\\subseteqq",!0);b(w,O,I,"\u22D0","\\Subset",!0);b(w,O,I,"\u228F","\\sqsubset",!0);b(w,O,I,"\u227C","\\preccurlyeq",!0);b(w,O,I,"\u22DE","\\curlyeqprec",!0);b(w,O,I,"\u227E","\\precsim",!0);b(w,O,I,"\u2AB7","\\precapprox",!0);b(w,O,I,"\u22B2","\\vartriangleleft");b(w,O,I,"\u22B4","\\trianglelefteq");b(w,O,I,"\u22A8","\\vDash",!0);b(w,O,I,"\u22AA","\\Vvdash",!0);b(w,O,I,"\u2323","\\smallsmile");b(w,O,I,"\u2322","\\smallfrown");b(w,O,I,"\u224F","\\bumpeq",!0);b(w,O,I,"\u224E","\\Bumpeq",!0);b(w,O,I,"\u2267","\\geqq",!0);b(w,O,I,"\u2A7E","\\geqslant",!0);b(w,O,I,"\u2A96","\\eqslantgtr",!0);b(w,O,I,"\u2273","\\gtrsim",!0);b(w,O,I,"\u2A86","\\gtrapprox",!0);b(w,O,le,"\u22D7","\\gtrdot");b(w,O,I,"\u22D9","\\ggg",!0);b(w,O,I,"\u2277","\\gtrless",!0);b(w,O,I,"\u22DB","\\gtreqless",!0);b(w,O,I,"\u2A8C","\\gtreqqless",!0);b(w,O,I,"\u2256","\\eqcirc",!0);b(w,O,I,"\u2257","\\circeq",!0);b(w,O,I,"\u225C","\\triangleq",!0);b(w,O,I,"\u223C","\\thicksim");b(w,O,I,"\u2248","\\thickapprox");b(w,O,I,"\u2AC6","\\supseteqq",!0);b(w,O,I,"\u22D1","\\Supset",!0);b(w,O,I,"\u2290","\\sqsupset",!0);b(w,O,I,"\u227D","\\succcurlyeq",!0);b(w,O,I,"\u22DF","\\curlyeqsucc",!0);b(w,O,I,"\u227F","\\succsim",!0);b(w,O,I,"\u2AB8","\\succapprox",!0);b(w,O,I,"\u22B3","\\vartriangleright");b(w,O,I,"\u22B5","\\trianglerighteq");b(w,O,I,"\u22A9","\\Vdash",!0);b(w,O,I,"\u2223","\\shortmid");b(w,O,I,"\u2225","\\shortparallel");b(w,O,I,"\u226C","\\between",!0);b(w,O,I,"\u22D4","\\pitchfork",!0);b(w,O,I,"\u221D","\\varpropto");b(w,O,I,"\u25C0","\\blacktriangleleft");b(w,O,I,"\u2234","\\therefore",!0);b(w,O,I,"\u220D","\\backepsilon");b(w,O,I,"\u25B6","\\blacktriangleright");b(w,O,I,"\u2235","\\because",!0);b(w,O,I,"\u22D8","\\llless");b(w,O,I,"\u22D9","\\gggtr");b(w,O,le,"\u22B2","\\lhd");b(w,O,le,"\u22B3","\\rhd");b(w,O,I,"\u2242","\\eqsim",!0);b(w,E,I,"\u22C8","\\Join");b(w,O,I,"\u2251","\\Doteq",!0);b(w,O,le,"\u2214","\\dotplus",!0);b(w,O,le,"\u2216","\\smallsetminus");b(w,O,le,"\u22D2","\\Cap",!0);b(w,O,le,"\u22D3","\\Cup",!0);b(w,O,le,"\u2A5E","\\doublebarwedge",!0);b(w,O,le,"\u229F","\\boxminus",!0);b(w,O,le,"\u229E","\\boxplus",!0);b(w,O,le,"\u22C7","\\divideontimes",!0);b(w,O,le,"\u22C9","\\ltimes",!0);b(w,O,le,"\u22CA","\\rtimes",!0);b(w,O,le,"\u22CB","\\leftthreetimes",!0);b(w,O,le,"\u22CC","\\rightthreetimes",!0);b(w,O,le,"\u22CF","\\curlywedge",!0);b(w,O,le,"\u22CE","\\curlyvee",!0);b(w,O,le,"\u229D","\\circleddash",!0);b(w,O,le,"\u229B","\\circledast",!0);b(w,O,le,"\u22C5","\\centerdot");b(w,O,le,"\u22BA","\\intercal",!0);b(w,O,le,"\u22D2","\\doublecap");b(w,O,le,"\u22D3","\\doublecup");b(w,O,le,"\u22A0","\\boxtimes",!0);b(w,O,I,"\u21E2","\\dashrightarrow",!0);b(w,O,I,"\u21E0","\\dashleftarrow",!0);b(w,O,I,"\u21C7","\\leftleftarrows",!0);b(w,O,I,"\u21C6","\\leftrightarrows",!0);b(w,O,I,"\u21DA","\\Lleftarrow",!0);b(w,O,I,"\u219E","\\twoheadleftarrow",!0);b(w,O,I,"\u21A2","\\leftarrowtail",!0);b(w,O,I,"\u21AB","\\looparrowleft",!0);b(w,O,I,"\u21CB","\\leftrightharpoons",!0);b(w,O,I,"\u21B6","\\curvearrowleft",!0);b(w,O,I,"\u21BA","\\circlearrowleft",!0);b(w,O,I,"\u21B0","\\Lsh",!0);b(w,O,I,"\u21C8","\\upuparrows",!0);b(w,O,I,"\u21BF","\\upharpoonleft",!0);b(w,O,I,"\u21C3","\\downharpoonleft",!0);b(w,E,I,"\u22B6","\\origof",!0);b(w,E,I,"\u22B7","\\imageof",!0);b(w,O,I,"\u22B8","\\multimap",!0);b(w,O,I,"\u21AD","\\leftrightsquigarrow",!0);b(w,O,I,"\u21C9","\\rightrightarrows",!0);b(w,O,I,"\u21C4","\\rightleftarrows",!0);b(w,O,I,"\u21A0","\\twoheadrightarrow",!0);b(w,O,I,"\u21A3","\\rightarrowtail",!0);b(w,O,I,"\u21AC","\\looparrowright",!0);b(w,O,I,"\u21B7","\\curvearrowright",!0);b(w,O,I,"\u21BB","\\circlearrowright",!0);b(w,O,I,"\u21B1","\\Rsh",!0);b(w,O,I,"\u21CA","\\downdownarrows",!0);b(w,O,I,"\u21BE","\\upharpoonright",!0);b(w,O,I,"\u21C2","\\downharpoonright",!0);b(w,O,I,"\u21DD","\\rightsquigarrow",!0);b(w,O,I,"\u21DD","\\leadsto");b(w,O,I,"\u21DB","\\Rrightarrow",!0);b(w,O,I,"\u21BE","\\restriction");b(w,E,H,"\u2018","`");b(w,E,H,"$","\\$");b(Y,E,H,"$","\\$");b(Y,E,H,"$","\\textdollar");b(w,E,H,"%","\\%");b(Y,E,H,"%","\\%");b(w,E,H,"_","\\_");b(Y,E,H,"_","\\_");b(Y,E,H,"_","\\textunderscore");b(w,E,H,"\u2220","\\angle",!0);b(w,E,H,"\u221E","\\infty",!0);b(w,E,H,"\u2032","\\prime");b(w,E,H,"\u25B3","\\triangle");b(w,E,H,"\u0393","\\Gamma",!0);b(w,E,H,"\u0394","\\Delta",!0);b(w,E,H,"\u0398","\\Theta",!0);b(w,E,H,"\u039B","\\Lambda",!0);b(w,E,H,"\u039E","\\Xi",!0);b(w,E,H,"\u03A0","\\Pi",!0);b(w,E,H,"\u03A3","\\Sigma",!0);b(w,E,H,"\u03A5","\\Upsilon",!0);b(w,E,H,"\u03A6","\\Phi",!0);b(w,E,H,"\u03A8","\\Psi",!0);b(w,E,H,"\u03A9","\\Omega",!0);b(w,E,H,"A","\u0391");b(w,E,H,"B","\u0392");b(w,E,H,"E","\u0395");b(w,E,H,"Z","\u0396");b(w,E,H,"H","\u0397");b(w,E,H,"I","\u0399");b(w,E,H,"K","\u039A");b(w,E,H,"M","\u039C");b(w,E,H,"N","\u039D");b(w,E,H,"O","\u039F");b(w,E,H,"P","\u03A1");b(w,E,H,"T","\u03A4");b(w,E,H,"X","\u03A7");b(w,E,H,"\xAC","\\neg",!0);b(w,E,H,"\xAC","\\lnot");b(w,E,H,"\u22A4","\\top");b(w,E,H,"\u22A5","\\bot");b(w,E,H,"\u2205","\\emptyset");b(w,O,H,"\u2205","\\varnothing");b(w,E,me,"\u03B1","\\alpha",!0);b(w,E,me,"\u03B2","\\beta",!0);b(w,E,me,"\u03B3","\\gamma",!0);b(w,E,me,"\u03B4","\\delta",!0);b(w,E,me,"\u03F5","\\epsilon",!0);b(w,E,me,"\u03B6","\\zeta",!0);b(w,E,me,"\u03B7","\\eta",!0);b(w,E,me,"\u03B8","\\theta",!0);b(w,E,me,"\u03B9","\\iota",!0);b(w,E,me,"\u03BA","\\kappa",!0);b(w,E,me,"\u03BB","\\lambda",!0);b(w,E,me,"\u03BC","\\mu",!0);b(w,E,me,"\u03BD","\\nu",!0);b(w,E,me,"\u03BE","\\xi",!0);b(w,E,me,"\u03BF","\\omicron",!0);b(w,E,me,"\u03C0","\\pi",!0);b(w,E,me,"\u03C1","\\rho",!0);b(w,E,me,"\u03C3","\\sigma",!0);b(w,E,me,"\u03C4","\\tau",!0);b(w,E,me,"\u03C5","\\upsilon",!0);b(w,E,me,"\u03D5","\\phi",!0);b(w,E,me,"\u03C7","\\chi",!0);b(w,E,me,"\u03C8","\\psi",!0);b(w,E,me,"\u03C9","\\omega",!0);b(w,E,me,"\u03B5","\\varepsilon",!0);b(w,E,me,"\u03D1","\\vartheta",!0);b(w,E,me,"\u03D6","\\varpi",!0);b(w,E,me,"\u03F1","\\varrho",!0);b(w,E,me,"\u03C2","\\varsigma",!0);b(w,E,me,"\u03C6","\\varphi",!0);b(w,E,le,"\u2217","*",!0);b(w,E,le,"+","+");b(w,E,le,"\u2212","-",!0);b(w,E,le,"\u22C5","\\cdot",!0);b(w,E,le,"\u2218","\\circ",!0);b(w,E,le,"\xF7","\\div",!0);b(w,E,le,"\xB1","\\pm",!0);b(w,E,le,"\xD7","\\times",!0);b(w,E,le,"\u2229","\\cap",!0);b(w,E,le,"\u222A","\\cup",!0);b(w,E,le,"\u2216","\\setminus",!0);b(w,E,le,"\u2227","\\land");b(w,E,le,"\u2228","\\lor");b(w,E,le,"\u2227","\\wedge",!0);b(w,E,le,"\u2228","\\vee",!0);b(w,E,H,"\u221A","\\surd");b(w,E,$t,"\u27E8","\\langle",!0);b(w,E,$t,"\u2223","\\lvert");b(w,E,$t,"\u2225","\\lVert");b(w,E,yt,"?","?");b(w,E,yt,"!","!");b(w,E,yt,"\u27E9","\\rangle",!0);b(w,E,yt,"\u2223","\\rvert");b(w,E,yt,"\u2225","\\rVert");b(w,E,I,"=","=");b(w,E,I,":",":");b(w,E,I,"\u2248","\\approx",!0);b(w,E,I,"\u2245","\\cong",!0);b(w,E,I,"\u2265","\\ge");b(w,E,I,"\u2265","\\geq",!0);b(w,E,I,"\u2190","\\gets");b(w,E,I,">","\\gt",!0);b(w,E,I,"\u2208","\\in",!0);b(w,E,I,"\uE020","\\@not");b(w,E,I,"\u2282","\\subset",!0);b(w,E,I,"\u2283","\\supset",!0);b(w,E,I,"\u2286","\\subseteq",!0);b(w,E,I,"\u2287","\\supseteq",!0);b(w,O,I,"\u2288","\\nsubseteq",!0);b(w,O,I,"\u2289","\\nsupseteq",!0);b(w,E,I,"\u22A8","\\models");b(w,E,I,"\u2190","\\leftarrow",!0);b(w,E,I,"\u2264","\\le");b(w,E,I,"\u2264","\\leq",!0);b(w,E,I,"<","\\lt",!0);b(w,E,I,"\u2192","\\rightarrow",!0);b(w,E,I,"\u2192","\\to");b(w,O,I,"\u2271","\\ngeq",!0);b(w,O,I,"\u2270","\\nleq",!0);b(w,E,Mr,"\xA0","\\ ");b(w,E,Mr,"\xA0","\\space");b(w,E,Mr,"\xA0","\\nobreakspace");b(Y,E,Mr,"\xA0","\\ ");b(Y,E,Mr,"\xA0"," ");b(Y,E,Mr,"\xA0","\\space");b(Y,E,Mr,"\xA0","\\nobreakspace");b(w,E,Mr,null,"\\nobreak");b(w,E,Mr,null,"\\allowbreak");b(w,E,vn,",",",");b(w,E,vn,";",";");b(w,O,le,"\u22BC","\\barwedge",!0);b(w,O,le,"\u22BB","\\veebar",!0);b(w,E,le,"\u2299","\\odot",!0);b(w,E,le,"\u2295","\\oplus",!0);b(w,E,le,"\u2297","\\otimes",!0);b(w,E,H,"\u2202","\\partial",!0);b(w,E,le,"\u2298","\\oslash",!0);b(w,O,le,"\u229A","\\circledcirc",!0);b(w,O,le,"\u22A1","\\boxdot",!0);b(w,E,le,"\u25B3","\\bigtriangleup");b(w,E,le,"\u25BD","\\bigtriangledown");b(w,E,le,"\u2020","\\dagger");b(w,E,le,"\u22C4","\\diamond");b(w,E,le,"\u22C6","\\star");b(w,E,le,"\u25C3","\\triangleleft");b(w,E,le,"\u25B9","\\triangleright");b(w,E,$t,"{","\\{");b(Y,E,H,"{","\\{");b(Y,E,H,"{","\\textbraceleft");b(w,E,yt,"}","\\}");b(Y,E,H,"}","\\}");b(Y,E,H,"}","\\textbraceright");b(w,E,$t,"{","\\lbrace");b(w,E,yt,"}","\\rbrace");b(w,E,$t,"[","\\lbrack",!0);b(Y,E,H,"[","\\lbrack",!0);b(w,E,yt,"]","\\rbrack",!0);b(Y,E,H,"]","\\rbrack",!0);b(w,E,$t,"(","\\lparen",!0);b(w,E,yt,")","\\rparen",!0);b(Y,E,H,"<","\\textless",!0);b(Y,E,H,">","\\textgreater",!0);b(w,E,$t,"\u230A","\\lfloor",!0);b(w,E,yt,"\u230B","\\rfloor",!0);b(w,E,$t,"\u2308","\\lceil",!0);b(w,E,yt,"\u2309","\\rceil",!0);b(w,E,H,"\\","\\backslash");b(w,E,H,"\u2223","|");b(w,E,H,"\u2223","\\vert");b(Y,E,H,"|","\\textbar",!0);b(w,E,H,"\u2225","\\|");b(w,E,H,"\u2225","\\Vert");b(Y,E,H,"\u2225","\\textbardbl");b(Y,E,H,"~","\\textasciitilde");b(Y,E,H,"\\","\\textbackslash");b(Y,E,H,"^","\\textasciicircum");b(w,E,I,"\u2191","\\uparrow",!0);b(w,E,I,"\u21D1","\\Uparrow",!0);b(w,E,I,"\u2193","\\downarrow",!0);b(w,E,I,"\u21D3","\\Downarrow",!0);b(w,E,I,"\u2195","\\updownarrow",!0);b(w,E,I,"\u21D5","\\Updownarrow",!0);b(w,E,Je,"\u2210","\\coprod");b(w,E,Je,"\u22C1","\\bigvee");b(w,E,Je,"\u22C0","\\bigwedge");b(w,E,Je,"\u2A04","\\biguplus");b(w,E,Je,"\u22C2","\\bigcap");b(w,E,Je,"\u22C3","\\bigcup");b(w,E,Je,"\u222B","\\int");b(w,E,Je,"\u222B","\\intop");b(w,E,Je,"\u222C","\\iint");b(w,E,Je,"\u222D","\\iiint");b(w,E,Je,"\u220F","\\prod");b(w,E,Je,"\u2211","\\sum");b(w,E,Je,"\u2A02","\\bigotimes");b(w,E,Je,"\u2A01","\\bigoplus");b(w,E,Je,"\u2A00","\\bigodot");b(w,E,Je,"\u222E","\\oint");b(w,E,Je,"\u222F","\\oiint");b(w,E,Je,"\u2230","\\oiiint");b(w,E,Je,"\u2A06","\\bigsqcup");b(w,E,Je,"\u222B","\\smallint");b(Y,E,ji,"\u2026","\\textellipsis");b(w,E,ji,"\u2026","\\mathellipsis");b(Y,E,ji,"\u2026","\\ldots",!0);b(w,E,ji,"\u2026","\\ldots",!0);b(w,E,ji,"\u22EF","\\@cdots",!0);b(w,E,ji,"\u22F1","\\ddots",!0);b(w,E,H,"\u22EE","\\varvdots");b(Y,E,H,"\u22EE","\\varvdots");b(w,E,Ve,"\u02CA","\\acute");b(w,E,Ve,"\u02CB","\\grave");b(w,E,Ve,"\xA8","\\ddot");b(w,E,Ve,"~","\\tilde");b(w,E,Ve,"\u02C9","\\bar");b(w,E,Ve,"\u02D8","\\breve");b(w,E,Ve,"\u02C7","\\check");b(w,E,Ve,"^","\\hat");b(w,E,Ve,"\u20D7","\\vec");b(w,E,Ve,"\u02D9","\\dot");b(w,E,Ve,"\u02DA","\\mathring");b(w,E,me,"\uE131","\\@imath");b(w,E,me,"\uE237","\\@jmath");b(w,E,H,"\u0131","\u0131");b(w,E,H,"\u0237","\u0237");b(Y,E,H,"\u0131","\\i",!0);b(Y,E,H,"\u0237","\\j",!0);b(Y,E,H,"\xDF","\\ss",!0);b(Y,E,H,"\xE6","\\ae",!0);b(Y,E,H,"\u0153","\\oe",!0);b(Y,E,H,"\xF8","\\o",!0);b(Y,E,H,"\xC6","\\AE",!0);b(Y,E,H,"\u0152","\\OE",!0);b(Y,E,H,"\xD8","\\O",!0);b(Y,E,Ve,"\u02CA","\\'");b(Y,E,Ve,"\u02CB","\\`");b(Y,E,Ve,"\u02C6","\\^");b(Y,E,Ve,"\u02DC","\\~");b(Y,E,Ve,"\u02C9","\\=");b(Y,E,Ve,"\u02D8","\\u");b(Y,E,Ve,"\u02D9","\\.");b(Y,E,Ve,"\xB8","\\c");b(Y,E,Ve,"\u02DA","\\r");b(Y,E,Ve,"\u02C7","\\v");b(Y,E,Ve,"\xA8",'\\"');b(Y,E,Ve,"\u02DD","\\H");b(Y,E,Ve,"\u25EF","\\textcircled");var wd={"--":!0,"---":!0,"``":!0,"''":!0};b(Y,E,H,"\u2013","--",!0);b(Y,E,H,"\u2013","\\textendash");b(Y,E,H,"\u2014","---",!0);b(Y,E,H,"\u2014","\\textemdash");b(Y,E,H,"\u2018","`",!0);b(Y,E,H,"\u2018","\\textquoteleft");b(Y,E,H,"\u2019","'",!0);b(Y,E,H,"\u2019","\\textquoteright");b(Y,E,H,"\u201C","``",!0);b(Y,E,H,"\u201C","\\textquotedblleft");b(Y,E,H,"\u201D","''",!0);b(Y,E,H,"\u201D","\\textquotedblright");b(w,E,H,"\xB0","\\degree",!0);b(Y,E,H,"\xB0","\\degree");b(Y,E,H,"\xB0","\\textdegree",!0);b(w,E,H,"\xA3","\\pounds");b(w,E,H,"\xA3","\\mathsterling",!0);b(Y,E,H,"\xA3","\\pounds");b(Y,E,H,"\xA3","\\textsterling",!0);b(w,O,H,"\u2720","\\maltese");b(Y,O,H,"\u2720","\\maltese");var Vu='0123456789/@."';for(Yo=0;Yo<Vu.length;Yo++)qa=Vu.charAt(Yo),b(w,E,H,qa,qa);var qa,Yo,Uu='0123456789!@*()-=+";:?/.,';for(Zo=0;Zo<Uu.length;Zo++)Va=Uu.charAt(Zo),b(Y,E,H,Va,Va);var Va,Zo,un="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";for(Jo=0;Jo<un.length;Jo++)Os=un.charAt(Jo),b(w,E,me,Os,Os),b(Y,E,H,Os,Os);var Os,Jo;b(w,O,H,"C","\u2102");b(Y,O,H,"C","\u2102");b(w,O,H,"H","\u210D");b(Y,O,H,"H","\u210D");b(w,O,H,"N","\u2115");b(Y,O,H,"N","\u2115");b(w,O,H,"P","\u2119");b(Y,O,H,"P","\u2119");b(w,O,H,"Q","\u211A");b(Y,O,H,"Q","\u211A");b(w,O,H,"R","\u211D");b(Y,O,H,"R","\u211D");b(w,O,H,"Z","\u2124");b(Y,O,H,"Z","\u2124");b(w,E,me,"h","\u210E");b(Y,E,me,"h","\u210E");var we="";for(pt=0;pt<un.length;pt++)We=un.charAt(pt),we=String.fromCharCode(55349,56320+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56372+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56424+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56580+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56684+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56736+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56788+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56840+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56944+pt),b(w,E,me,We,we),b(Y,E,H,We,we),pt<26&&(we=String.fromCharCode(55349,56632+pt),b(w,E,me,We,we),b(Y,E,H,We,we),we=String.fromCharCode(55349,56476+pt),b(w,E,me,We,we),b(Y,E,H,We,we));var We,pt;we="\u{1D55C}";b(w,E,me,"k",we);b(Y,E,H,"k",we);for(jr=0;jr<10;jr++)Sr=jr.toString(),we=String.fromCharCode(55349,57294+jr),b(w,E,me,Sr,we),b(Y,E,H,Sr,we),we=String.fromCharCode(55349,57314+jr),b(w,E,me,Sr,we),b(Y,E,H,Sr,we),we=String.fromCharCode(55349,57324+jr),b(w,E,me,Sr,we),b(Y,E,H,Sr,we),we=String.fromCharCode(55349,57334+jr),b(w,E,me,Sr,we),b(Y,E,H,Sr,we);var Sr,jr,il="\xD0\xDE\xFE";for(Qo=0;Qo<il.length;Qo++)Is=il.charAt(Qo),b(w,E,me,Is,Is),b(Y,E,H,Is,Is);var Is,Qo,en=[["mathbf","textbf","Main-Bold"],["mathbf","textbf","Main-Bold"],["mathnormal","textit","Math-Italic"],["mathnormal","textit","Math-Italic"],["boldsymbol","boldsymbol","Main-BoldItalic"],["boldsymbol","boldsymbol","Main-BoldItalic"],["mathscr","textscr","Script-Regular"],["","",""],["","",""],["","",""],["mathfrak","textfrak","Fraktur-Regular"],["mathfrak","textfrak","Fraktur-Regular"],["mathbb","textbb","AMS-Regular"],["mathbb","textbb","AMS-Regular"],["mathboldfrak","textboldfrak","Fraktur-Regular"],["mathboldfrak","textboldfrak","Fraktur-Regular"],["mathsf","textsf","SansSerif-Regular"],["mathsf","textsf","SansSerif-Regular"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathitsf","textitsf","SansSerif-Italic"],["mathitsf","textitsf","SansSerif-Italic"],["","",""],["","",""],["mathtt","texttt","Typewriter-Regular"],["mathtt","texttt","Typewriter-Regular"]],Wu=[["mathbf","textbf","Main-Bold"],["","",""],["mathsf","textsf","SansSerif-Regular"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathtt","texttt","Typewriter-Regular"]],Dv=function(e,r){var i=e.charCodeAt(0),o=e.charCodeAt(1),s=(i-55296)*1024+(o-56320)+65536,n=r==="math"?0:1;if(119808<=s&&s<120484){var a=Math.floor((s-119808)/26);return[en[a][2],en[a][n]]}else if(120782<=s&&s<=120831){var l=Math.floor((s-120782)/10);return[Wu[l][2],Wu[l][n]]}else{if(s===120485||s===120486)return[en[0][2],en[0][n]];if(120486<s&&s<120782)return["",""];throw new te("Unsupported character: "+e)}},bn=function(e,r,i){return Pe[i][e]&&Pe[i][e].replace&&(e=Pe[i][e].replace),{value:e,metrics:pl(e,r,i)}},Qt=function(e,r,i,o,s){var n=bn(e,r,i),a=n.metrics;e=n.value;var l;if(a){var c=a.italic;(i==="text"||o&&o.font==="mathit")&&(c=0),l=new Et(e,a.height,a.depth,c,a.skew,a.width,s)}else typeof console<"u"&&console.warn("No character metrics "+("for '"+e+"' in style '"+r+"' and mode '"+i+"'")),l=new Et(e,0,0,0,0,0,s);if(o){l.maxFontSize=o.sizeMultiplier,o.style.isTight()&&l.classes.push("mtight");var f=o.getColor();f&&(l.style.color=f)}return l},Lv=function(e,r,i,o){return o===void 0&&(o=[]),i.font==="boldsymbol"&&bn(e,"Main-Bold",r).metrics?Qt(e,"Main-Bold",r,i,o.concat(["mathbf"])):e==="\\"||Pe[r][e].font==="main"?Qt(e,"Main-Regular",r,i,o):Qt(e,"AMS-Regular",r,i,o.concat(["amsrm"]))},$v=function(e,r,i,o,s){return s!=="textord"&&bn(e,"Math-BoldItalic",r).metrics?{fontName:"Math-BoldItalic",fontClass:"boldsymbol"}:{fontName:"Main-Bold",fontClass:"mathbf"}},Bv=function(e,r,i){var o=e.mode,s=e.text,n=["mord"],a=o==="math"||o==="text"&&r.font,l=a?r.font:r.fontFamily,c="",f="";if(s.charCodeAt(0)===55349&&([c,f]=Dv(s,o)),c.length>0)return Qt(s,c,o,r,n.concat(f));if(l){var m,_;if(l==="boldsymbol"){var g=$v(s,o,r,n,i);m=g.fontName,_=[g.fontClass]}else a?(m=kd[l].fontName,_=[l]):(m=tn(l,r.fontWeight,r.fontShape),_=[l,r.fontWeight,r.fontShape]);if(bn(s,m,o).metrics)return Qt(s,m,o,r,n.concat(_));if(wd.hasOwnProperty(s)&&m.slice(0,10)==="Typewriter"){for(var h=[],d=0;d<s.length;d++)h.push(Qt(s[d],m,o,r,n.concat(_)));return Sd(h)}}if(i==="mathord")return Qt(s,"Math-Italic",o,r,n.concat(["mathnormal"]));if(i==="textord"){var u=Pe[o][s]&&Pe[o][s].font;if(u==="ams"){var p=tn("amsrm",r.fontWeight,r.fontShape);return Qt(s,p,o,r,n.concat("amsrm",r.fontWeight,r.fontShape))}else if(u==="main"||!u){var v=tn("textrm",r.fontWeight,r.fontShape);return Qt(s,v,o,r,n.concat(r.fontWeight,r.fontShape))}else{var x=tn(u,r.fontWeight,r.fontShape);return Qt(s,x,o,r,n.concat(x,r.fontWeight,r.fontShape))}}else throw new Error("unexpected type: "+i+" in makeOrd")},zv=(t,e)=>{if(Kr(t.classes)!==Kr(e.classes)||t.skew!==e.skew||t.maxFontSize!==e.maxFontSize)return!1;if(t.classes.length===1){var r=t.classes[0];if(r==="mbin"||r==="mord")return!1}for(var i in t.style)if(t.style.hasOwnProperty(i)&&t.style[i]!==e.style[i])return!1;for(var o in e.style)if(e.style.hasOwnProperty(o)&&t.style[o]!==e.style[o])return!1;return!0},Ov=t=>{for(var e=0;e<t.length-1;e++){var r=t[e],i=t[e+1];r instanceof Et&&i instanceof Et&&zv(r,i)&&(r.text+=i.text,r.height=Math.max(r.height,i.height),r.depth=Math.max(r.depth,i.depth),r.italic=i.italic,t.splice(e+1,1),e--)}return t},fl=function(e){for(var r=0,i=0,o=0,s=0;s<e.children.length;s++){var n=e.children[s];n.height>r&&(r=n.height),n.depth>i&&(i=n.depth),n.maxFontSize>o&&(o=n.maxFontSize)}e.height=r,e.depth=i,e.maxFontSize=o},Ct=function(e,r,i,o){var s=new vi(e,r,i,o);return fl(s),s},xd=(t,e,r,i)=>new vi(t,e,r,i),Iv=function(e,r,i){var o=Ct([e],[],r);return o.height=Math.max(i||r.fontMetrics().defaultRuleThickness,r.minRuleThickness),o.style.borderBottomWidth=se(o.height),o.maxFontSize=1,o},Pv=function(e,r,i,o){var s=new qs(e,r,i,o);return fl(s),s},Sd=function(e){var r=new gi(e);return fl(r),r},Hv=function(e,r){return e instanceof gi?Ct([],[e],r):e},Fv=function(e){if(e.positionType==="individualShift"){for(var r=e.children,i=[r[0]],o=-r[0].shift-r[0].elem.depth,s=o,n=1;n<r.length;n++){var a=-r[n].shift-s-r[n].elem.depth,l=a-(r[n-1].elem.height+r[n-1].elem.depth);s=s+a,i.push({type:"kern",size:l}),i.push(r[n])}return{children:i,depth:o}}var c;if(e.positionType==="top"){for(var f=e.positionData,m=0;m<e.children.length;m++){var _=e.children[m];f-=_.type==="kern"?_.size:_.elem.height+_.elem.depth}c=f}else if(e.positionType==="bottom")c=-e.positionData;else{var g=e.children[0];if(g.type!=="elem")throw new Error('First child must have type "elem".');if(e.positionType==="shift")c=-g.elem.depth-e.positionData;else if(e.positionType==="firstBaseline")c=-g.elem.depth;else throw new Error("Invalid positionType "+e.positionType+".")}return{children:e.children,depth:c}},Nv=function(e,r){for(var{children:i,depth:o}=Fv(e),s=0,n=0;n<i.length;n++){var a=i[n];if(a.type==="elem"){var l=a.elem;s=Math.max(s,l.maxFontSize,l.height)}}s+=2;var c=Ct(["pstrut"],[]);c.style.height=se(s);for(var f=[],m=o,_=o,g=o,h=0;h<i.length;h++){var d=i[h];if(d.type==="kern")g+=d.size;else{var u=d.elem,p=d.wrapperClasses||[],v=d.wrapperStyle||{},x=Ct(p,[c,u],void 0,v);x.style.top=se(-s-g-u.depth),d.marginLeft&&(x.style.marginLeft=d.marginLeft),d.marginRight&&(x.style.marginRight=d.marginRight),f.push(x),g+=u.height+u.depth}m=Math.min(m,g),_=Math.max(_,g)}var S=Ct(["vlist"],f);S.style.height=se(_);var C;if(m<0){var y=Ct([],[]),k=Ct(["vlist"],[y]);k.style.height=se(-m);var D=Ct(["vlist-s"],[new Et("\u200B")]);C=[Ct(["vlist-r"],[S,D]),Ct(["vlist-r"],[k])]}else C=[Ct(["vlist-r"],[S])];var $=Ct(["vlist-t"],C);return C.length===2&&$.classes.push("vlist-t2"),$.height=_,$.depth=-m,$},qv=(t,e)=>{var r=Ct(["mspace"],[],e),i=Ge(t,e);return r.style.marginRight=se(i),r},tn=function(e,r,i){var o="";switch(e){case"amsrm":o="AMS";break;case"textrm":o="Main";break;case"textsf":o="SansSerif";break;case"texttt":o="Typewriter";break;default:o=e}var s;return r==="textbf"&&i==="textit"?s="BoldItalic":r==="textbf"?s="Bold":r==="textit"?s="Italic":s="Regular",o+"-"+s},kd={mathbf:{variant:"bold",fontName:"Main-Bold"},mathrm:{variant:"normal",fontName:"Main-Regular"},textit:{variant:"italic",fontName:"Main-Italic"},mathit:{variant:"italic",fontName:"Main-Italic"},mathnormal:{variant:"italic",fontName:"Math-Italic"},mathsfit:{variant:"sans-serif-italic",fontName:"SansSerif-Italic"},mathbb:{variant:"double-struck",fontName:"AMS-Regular"},mathcal:{variant:"script",fontName:"Caligraphic-Regular"},mathfrak:{variant:"fraktur",fontName:"Fraktur-Regular"},mathscr:{variant:"script",fontName:"Script-Regular"},mathsf:{variant:"sans-serif",fontName:"SansSerif-Regular"},mathtt:{variant:"monospace",fontName:"Typewriter-Regular"}},Cd={vec:["vec",.471,.714],oiintSize1:["oiintSize1",.957,.499],oiintSize2:["oiintSize2",1.472,.659],oiiintSize1:["oiiintSize1",1.304,.499],oiiintSize2:["oiiintSize2",1.98,.659]},Vv=function(e,r){var[i,o,s]=Cd[e],n=new cr(i),a=new er([n],{width:se(o),height:se(s),style:"width:"+se(o),viewBox:"0 0 "+1e3*o+" "+1e3*s,preserveAspectRatio:"xMinYMin"}),l=xd(["overlay"],[a],r);return l.height=s,l.style.height=se(s),l.style.width=se(o),l},U={fontMap:kd,makeSymbol:Qt,mathsym:Lv,makeSpan:Ct,makeSvgSpan:xd,makeLineSpan:Iv,makeAnchor:Pv,makeFragment:Sd,wrapFragment:Hv,makeVList:Nv,makeOrd:Bv,makeGlue:qv,staticSvg:Vv,svgData:Cd,tryCombineChars:Ov},je={number:3,unit:"mu"},mi={number:4,unit:"mu"},kr={number:5,unit:"mu"},Uv={mord:{mop:je,mbin:mi,mrel:kr,minner:je},mop:{mord:je,mop:je,mrel:kr,minner:je},mbin:{mord:mi,mop:mi,mopen:mi,minner:mi},mrel:{mord:kr,mop:kr,mopen:kr,minner:kr},mopen:{},mclose:{mop:je,mbin:mi,mrel:kr,minner:je},mpunct:{mord:je,mop:je,mrel:kr,mopen:je,mclose:je,mpunct:je,minner:je},minner:{mord:je,mop:je,mbin:mi,mrel:kr,mopen:je,mpunct:je,minner:je}},Wv={mord:{mop:je},mop:{mord:je,mop:je},mbin:{},mrel:{},mopen:{},mclose:{mop:je},mpunct:{},minner:{mop:je}},Ed={},dn={},pn={};function ae(t){for(var{type:e,names:r,props:i,handler:o,htmlBuilder:s,mathmlBuilder:n}=t,a={type:e,numArgs:i.numArgs,argTypes:i.argTypes,allowedInArgument:!!i.allowedInArgument,allowedInText:!!i.allowedInText,allowedInMath:i.allowedInMath===void 0?!0:i.allowedInMath,numOptionalArgs:i.numOptionalArgs||0,infix:!!i.infix,primitive:!!i.primitive,handler:o},l=0;l<r.length;++l)Ed[r[l]]=a;e&&(s&&(dn[e]=s),n&&(pn[e]=n))}function bi(t){var{type:e,htmlBuilder:r,mathmlBuilder:i}=t;ae({type:e,names:[],props:{numArgs:0},handler(){throw new Error("Should never be called.")},htmlBuilder:r,mathmlBuilder:i})}var fn=function(e){return e.type==="ordgroup"&&e.body.length===1?e.body[0]:e},Ye=function(e){return e.type==="ordgroup"?e.body:[e]},Ar=U.makeSpan,jv=["leftmost","mbin","mopen","mrel","mop","mpunct"],Gv=["rightmost","mrel","mclose","mpunct"],Kv={display:ge.DISPLAY,text:ge.TEXT,script:ge.SCRIPT,scriptscript:ge.SCRIPTSCRIPT},Xv={mord:"mord",mop:"mop",mbin:"mbin",mrel:"mrel",mopen:"mopen",mclose:"mclose",mpunct:"mpunct",minner:"minner"},rt=function(e,r,i,o){o===void 0&&(o=[null,null]);for(var s=[],n=0;n<e.length;n++){var a=Re(e[n],r);if(a instanceof gi){var l=a.children;s.push(...l)}else s.push(a)}if(U.tryCombineChars(s),!i)return s;var c=r;if(e.length===1){var f=e[0];f.type==="sizing"?c=r.havingSize(f.size):f.type==="styling"&&(c=r.havingStyle(Kv[f.style]))}var m=Ar([o[0]||"leftmost"],[],r),_=Ar([o[1]||"rightmost"],[],r),g=i==="root";return ju(s,(h,d)=>{var u=d.classes[0],p=h.classes[0];u==="mbin"&&de.contains(Gv,p)?d.classes[0]="mord":p==="mbin"&&de.contains(jv,u)&&(h.classes[0]="mord")},{node:m},_,g),ju(s,(h,d)=>{var u=sl(d),p=sl(h),v=u&&p?h.hasClass("mtight")?Wv[u][p]:Uv[u][p]:null;if(v)return U.makeGlue(v,c)},{node:m},_,g),s},ju=function t(e,r,i,o,s){o&&e.push(o);for(var n=0;n<e.length;n++){var a=e[n],l=Ad(a);if(l){t(l.children,r,i,null,s);continue}var c=!a.hasClass("mspace");if(c){var f=r(a,i.node);f&&(i.insertAfter?i.insertAfter(f):(e.unshift(f),n++))}c?i.node=a:s&&a.hasClass("newline")&&(i.node=Ar(["leftmost"])),i.insertAfter=(m=>_=>{e.splice(m+1,0,_),n++})(n)}o&&e.pop()},Ad=function(e){return e instanceof gi||e instanceof qs||e instanceof vi&&e.hasClass("enclosing")?e:null},Yv=function t(e,r){var i=Ad(e);if(i){var o=i.children;if(o.length){if(r==="right")return t(o[o.length-1],"right");if(r==="left")return t(o[0],"left")}}return e},sl=function(e,r){return e?(r&&(e=Yv(e,r)),Xv[e.classes[0]]||null):null},Us=function(e,r){var i=["nulldelimiter"].concat(e.baseSizingClasses());return Ar(r.concat(i))},Re=function(e,r,i){if(!e)return Ar();if(dn[e.type]){var o=dn[e.type](e,r);if(i&&r.size!==i.size){o=Ar(r.sizingClasses(i),[o],r);var s=r.sizeMultiplier/i.sizeMultiplier;o.height*=s,o.depth*=s}return o}else throw new te("Got group of unknown type: '"+e.type+"'")};function rn(t,e){var r=Ar(["base"],t,e),i=Ar(["strut"]);return i.style.height=se(r.height+r.depth),r.depth&&(i.style.verticalAlign=se(-r.depth)),r.children.unshift(i),r}function ol(t,e){var r=null;t.length===1&&t[0].type==="tag"&&(r=t[0].tag,t=t[0].body);var i=rt(t,e,"root"),o;i.length===2&&i[1].hasClass("tag")&&(o=i.pop());for(var s=[],n=[],a=0;a<i.length;a++)if(n.push(i[a]),i[a].hasClass("mbin")||i[a].hasClass("mrel")||i[a].hasClass("allowbreak")){for(var l=!1;a<i.length-1&&i[a+1].hasClass("mspace")&&!i[a+1].hasClass("newline");)a++,n.push(i[a]),i[a].hasClass("nobreak")&&(l=!0);l||(s.push(rn(n,e)),n=[])}else i[a].hasClass("newline")&&(n.pop(),n.length>0&&(s.push(rn(n,e)),n=[]),s.push(i[a]));n.length>0&&s.push(rn(n,e));var c;r?(c=rn(rt(r,e,!0)),c.classes=["tag"],s.push(c)):o&&s.push(o);var f=Ar(["katex-html"],s);if(f.setAttribute("aria-hidden","true"),c){var m=c.children[0];m.style.height=se(f.height+f.depth),f.depth&&(m.style.verticalAlign=se(-f.depth))}return f}function Td(t){return new gi(t)}var bt=class{constructor(e,r,i){this.type=void 0,this.attributes=void 0,this.children=void 0,this.classes=void 0,this.type=e,this.attributes={},this.children=r||[],this.classes=i||[]}setAttribute(e,r){this.attributes[e]=r}getAttribute(e){return this.attributes[e]}toNode(){var e=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var r in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,r)&&e.setAttribute(r,this.attributes[r]);this.classes.length>0&&(e.className=Kr(this.classes));for(var i=0;i<this.children.length;i++)if(this.children[i]instanceof Ut&&this.children[i+1]instanceof Ut){for(var o=this.children[i].toText()+this.children[++i].toText();this.children[i+1]instanceof Ut;)o+=this.children[++i].toText();e.appendChild(new Ut(o).toNode())}else e.appendChild(this.children[i].toNode());return e}toMarkup(){var e="<"+this.type;for(var r in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,r)&&(e+=" "+r+'="',e+=de.escape(this.attributes[r]),e+='"');this.classes.length>0&&(e+=' class ="'+de.escape(Kr(this.classes))+'"'),e+=">";for(var i=0;i<this.children.length;i++)e+=this.children[i].toMarkup();return e+="</"+this.type+">",e}toText(){return this.children.map(e=>e.toText()).join("")}},Ut=class{constructor(e){this.text=void 0,this.text=e}toNode(){return document.createTextNode(this.text)}toMarkup(){return de.escape(this.toText())}toText(){return this.text}},nl=class{constructor(e){this.width=void 0,this.character=void 0,this.width=e,e>=.05555&&e<=.05556?this.character="\u200A":e>=.1666&&e<=.1667?this.character="\u2009":e>=.2222&&e<=.2223?this.character="\u2005":e>=.2777&&e<=.2778?this.character="\u2005\u200A":e>=-.05556&&e<=-.05555?this.character="\u200A\u2063":e>=-.1667&&e<=-.1666?this.character="\u2009\u2063":e>=-.2223&&e<=-.2222?this.character="\u205F\u2063":e>=-.2778&&e<=-.2777?this.character="\u2005\u2063":this.character=null}toNode(){if(this.character)return document.createTextNode(this.character);var e=document.createElementNS("http://www.w3.org/1998/Math/MathML","mspace");return e.setAttribute("width",se(this.width)),e}toMarkup(){return this.character?"<mtext>"+this.character+"</mtext>":'<mspace width="'+se(this.width)+'"/>'}toText(){return this.character?this.character:" "}},Q={MathNode:bt,TextNode:Ut,SpaceNode:nl,newDocumentFragment:Td},jt=function(e,r,i){return Pe[r][e]&&Pe[r][e].replace&&e.charCodeAt(0)!==55349&&!(wd.hasOwnProperty(e)&&i&&(i.fontFamily&&i.fontFamily.slice(4,6)==="tt"||i.font&&i.font.slice(4,6)==="tt"))&&(e=Pe[r][e].replace),new Q.TextNode(e)},ml=function(e){return e.length===1?e[0]:new Q.MathNode("mrow",e)},gl=function(e,r){if(r.fontFamily==="texttt")return"monospace";if(r.fontFamily==="textsf")return r.fontShape==="textit"&&r.fontWeight==="textbf"?"sans-serif-bold-italic":r.fontShape==="textit"?"sans-serif-italic":r.fontWeight==="textbf"?"bold-sans-serif":"sans-serif";if(r.fontShape==="textit"&&r.fontWeight==="textbf")return"bold-italic";if(r.fontShape==="textit")return"italic";if(r.fontWeight==="textbf")return"bold";var i=r.font;if(!i||i==="mathnormal")return null;var o=e.mode;if(i==="mathit")return"italic";if(i==="boldsymbol")return e.type==="textord"?"bold":"bold-italic";if(i==="mathbf")return"bold";if(i==="mathbb")return"double-struck";if(i==="mathsfit")return"sans-serif-italic";if(i==="mathfrak")return"fraktur";if(i==="mathscr"||i==="mathcal")return"script";if(i==="mathsf")return"sans-serif";if(i==="mathtt")return"monospace";var s=e.text;if(de.contains(["\\imath","\\jmath"],s))return null;Pe[o][s]&&Pe[o][s].replace&&(s=Pe[o][s].replace);var n=U.fontMap[i].fontName;return pl(s,n,o)?U.fontMap[i].variant:null};function Ua(t){if(!t)return!1;if(t.type==="mi"&&t.children.length===1){var e=t.children[0];return e instanceof Ut&&e.text==="."}else if(t.type==="mo"&&t.children.length===1&&t.getAttribute("separator")==="true"&&t.getAttribute("lspace")==="0em"&&t.getAttribute("rspace")==="0em"){var r=t.children[0];return r instanceof Ut&&r.text===","}else return!1}var At=function(e,r,i){if(e.length===1){var o=Ie(e[0],r);return i&&o instanceof bt&&o.type==="mo"&&(o.setAttribute("lspace","0em"),o.setAttribute("rspace","0em")),[o]}for(var s=[],n,a=0;a<e.length;a++){var l=Ie(e[a],r);if(l instanceof bt&&n instanceof bt){if(l.type==="mtext"&&n.type==="mtext"&&l.getAttribute("mathvariant")===n.getAttribute("mathvariant")){n.children.push(...l.children);continue}else if(l.type==="mn"&&n.type==="mn"){n.children.push(...l.children);continue}else if(Ua(l)&&n.type==="mn"){n.children.push(...l.children);continue}else if(l.type==="mn"&&Ua(n))l.children=[...n.children,...l.children],s.pop();else if((l.type==="msup"||l.type==="msub")&&l.children.length>=1&&(n.type==="mn"||Ua(n))){var c=l.children[0];c instanceof bt&&c.type==="mn"&&(c.children=[...n.children,...c.children],s.pop())}else if(n.type==="mi"&&n.children.length===1){var f=n.children[0];if(f instanceof Ut&&f.text==="\u0338"&&(l.type==="mo"||l.type==="mi"||l.type==="mn")){var m=l.children[0];m instanceof Ut&&m.text.length>0&&(m.text=m.text.slice(0,1)+"\u0338"+m.text.slice(1),s.pop())}}}s.push(l),n=l}return s},Xr=function(e,r,i){return ml(At(e,r,i))},Ie=function(e,r){if(!e)return new Q.MathNode("mrow");if(pn[e.type]){var i=pn[e.type](e,r);return i}else throw new te("Got group of unknown type: '"+e.type+"'")};function Gu(t,e,r,i,o){var s=At(t,r),n;s.length===1&&s[0]instanceof bt&&de.contains(["mrow","mtable"],s[0].type)?n=s[0]:n=new Q.MathNode("mrow",s);var a=new Q.MathNode("annotation",[new Q.TextNode(e)]);a.setAttribute("encoding","application/x-tex");var l=new Q.MathNode("semantics",[n,a]),c=new Q.MathNode("math",[l]);c.setAttribute("xmlns","http://www.w3.org/1998/Math/MathML"),i&&c.setAttribute("display","block");var f=o?"katex":"katex-mathml";return U.makeSpan([f],[c])}var Md=function(e){return new hn({style:e.displayMode?ge.DISPLAY:ge.TEXT,maxSize:e.maxSize,minRuleThickness:e.minRuleThickness})},Rd=function(e,r){if(r.displayMode){var i=["katex-display"];r.leqno&&i.push("leqno"),r.fleqn&&i.push("fleqn"),e=U.makeSpan(i,[e])}return e},Zv=function(e,r,i){var o=Md(i),s;if(i.output==="mathml")return Gu(e,r,o,i.displayMode,!0);if(i.output==="html"){var n=ol(e,o);s=U.makeSpan(["katex"],[n])}else{var a=Gu(e,r,o,i.displayMode,!1),l=ol(e,o);s=U.makeSpan(["katex"],[a,l])}return Rd(s,i)},Jv=function(e,r,i){var o=Md(i),s=ol(e,o),n=U.makeSpan(["katex"],[s]);return Rd(n,i)},Qv={widehat:"^",widecheck:"\u02C7",widetilde:"~",utilde:"~",overleftarrow:"\u2190",underleftarrow:"\u2190",xleftarrow:"\u2190",overrightarrow:"\u2192",underrightarrow:"\u2192",xrightarrow:"\u2192",underbrace:"\u23DF",overbrace:"\u23DE",overgroup:"\u23E0",undergroup:"\u23E1",overleftrightarrow:"\u2194",underleftrightarrow:"\u2194",xleftrightarrow:"\u2194",Overrightarrow:"\u21D2",xRightarrow:"\u21D2",overleftharpoon:"\u21BC",xleftharpoonup:"\u21BC",overrightharpoon:"\u21C0",xrightharpoonup:"\u21C0",xLeftarrow:"\u21D0",xLeftrightarrow:"\u21D4",xhookleftarrow:"\u21A9",xhookrightarrow:"\u21AA",xmapsto:"\u21A6",xrightharpoondown:"\u21C1",xleftharpoondown:"\u21BD",xrightleftharpoons:"\u21CC",xleftrightharpoons:"\u21CB",xtwoheadleftarrow:"\u219E",xtwoheadrightarrow:"\u21A0",xlongequal:"=",xtofrom:"\u21C4",xrightleftarrows:"\u21C4",xrightequilibrium:"\u21CC",xleftequilibrium:"\u21CB","\\cdrightarrow":"\u2192","\\cdleftarrow":"\u2190","\\cdlongequal":"="},eb=function(e){var r=new Q.MathNode("mo",[new Q.TextNode(Qv[e.replace(/^\\/,"")])]);return r.setAttribute("stretchy","true"),r},tb={overrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],overleftarrow:[["leftarrow"],.888,522,"xMinYMin"],underrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],underleftarrow:[["leftarrow"],.888,522,"xMinYMin"],xrightarrow:[["rightarrow"],1.469,522,"xMaxYMin"],"\\cdrightarrow":[["rightarrow"],3,522,"xMaxYMin"],xleftarrow:[["leftarrow"],1.469,522,"xMinYMin"],"\\cdleftarrow":[["leftarrow"],3,522,"xMinYMin"],Overrightarrow:[["doublerightarrow"],.888,560,"xMaxYMin"],xRightarrow:[["doublerightarrow"],1.526,560,"xMaxYMin"],xLeftarrow:[["doubleleftarrow"],1.526,560,"xMinYMin"],overleftharpoon:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoonup:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoondown:[["leftharpoondown"],.888,522,"xMinYMin"],overrightharpoon:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoonup:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoondown:[["rightharpoondown"],.888,522,"xMaxYMin"],xlongequal:[["longequal"],.888,334,"xMinYMin"],"\\cdlongequal":[["longequal"],3,334,"xMinYMin"],xtwoheadleftarrow:[["twoheadleftarrow"],.888,334,"xMinYMin"],xtwoheadrightarrow:[["twoheadrightarrow"],.888,334,"xMaxYMin"],overleftrightarrow:[["leftarrow","rightarrow"],.888,522],overbrace:[["leftbrace","midbrace","rightbrace"],1.6,548],underbrace:[["leftbraceunder","midbraceunder","rightbraceunder"],1.6,548],underleftrightarrow:[["leftarrow","rightarrow"],.888,522],xleftrightarrow:[["leftarrow","rightarrow"],1.75,522],xLeftrightarrow:[["doubleleftarrow","doublerightarrow"],1.75,560],xrightleftharpoons:[["leftharpoondownplus","rightharpoonplus"],1.75,716],xleftrightharpoons:[["leftharpoonplus","rightharpoondownplus"],1.75,716],xhookleftarrow:[["leftarrow","righthook"],1.08,522],xhookrightarrow:[["lefthook","rightarrow"],1.08,522],overlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],underlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],overgroup:[["leftgroup","rightgroup"],.888,342],undergroup:[["leftgroupunder","rightgroupunder"],.888,342],xmapsto:[["leftmapsto","rightarrow"],1.5,522],xtofrom:[["leftToFrom","rightToFrom"],1.75,528],xrightleftarrows:[["baraboveleftarrow","rightarrowabovebar"],1.75,901],xrightequilibrium:[["baraboveshortleftharpoon","rightharpoonaboveshortbar"],1.75,716],xleftequilibrium:[["shortbaraboveleftharpoon","shortrightharpoonabovebar"],1.75,716]},rb=function(e){return e.type==="ordgroup"?e.body.length:1},ib=function(e,r){function i(){var a=4e5,l=e.label.slice(1);if(de.contains(["widehat","widecheck","widetilde","utilde"],l)){var c=e,f=rb(c.base),m,_,g;if(f>5)l==="widehat"||l==="widecheck"?(m=420,a=2364,g=.42,_=l+"4"):(m=312,a=2340,g=.34,_="tilde4");else{var h=[1,1,2,2,3,3][f];l==="widehat"||l==="widecheck"?(a=[0,1062,2364,2364,2364][h],m=[0,239,300,360,420][h],g=[0,.24,.3,.3,.36,.42][h],_=l+h):(a=[0,600,1033,2339,2340][h],m=[0,260,286,306,312][h],g=[0,.26,.286,.3,.306,.34][h],_="tilde"+h)}var d=new cr(_),u=new er([d],{width:"100%",height:se(g),viewBox:"0 0 "+a+" "+m,preserveAspectRatio:"none"});return{span:U.makeSvgSpan([],[u],r),minWidth:0,height:g}}else{var p=[],v=tb[l],[x,S,C]=v,y=C/1e3,k=x.length,D,$;if(k===1){var F=v[3];D=["hide-tail"],$=[F]}else if(k===2)D=["halfarrow-left","halfarrow-right"],$=["xMinYMin","xMaxYMin"];else if(k===3)D=["brace-left","brace-center","brace-right"],$=["xMinYMin","xMidYMin","xMaxYMin"];else throw new Error(`Correct katexImagesData or update code here to support
                    `+k+" children.");for(var L=0;L<k;L++){var V=new cr(x[L]),G=new er([V],{width:"400em",height:se(y),viewBox:"0 0 "+a+" "+C,preserveAspectRatio:$[L]+" slice"}),K=U.makeSvgSpan([D[L]],[G],r);if(k===1)return{span:K,minWidth:S,height:y};K.style.height=se(y),p.push(K)}return{span:U.makeSpan(["stretchy"],p,r),minWidth:S,height:y}}}var{span:o,minWidth:s,height:n}=i();return o.height=n,o.style.height=se(n),s>0&&(o.style.minWidth=se(s)),o},sb=function(e,r,i,o,s){var n,a=e.height+e.depth+i+o;if(/fbox|color|angl/.test(r)){if(n=U.makeSpan(["stretchy",r],[],s),r==="fbox"){var l=s.color&&s.getColor();l&&(n.style.borderColor=l)}}else{var c=[];/^[bx]cancel$/.test(r)&&c.push(new Vs({x1:"0",y1:"0",x2:"100%",y2:"100%","stroke-width":"0.046em"})),/^x?cancel$/.test(r)&&c.push(new Vs({x1:"0",y1:"100%",x2:"100%",y2:"0","stroke-width":"0.046em"}));var f=new er(c,{width:"100%",height:se(a)});n=U.makeSvgSpan([],[f],s)}return n.height=a,n.style.height=se(a),n},Tr={encloseSpan:sb,mathMLnode:eb,svgSpan:ib};function Ce(t,e){if(!t||t.type!==e)throw new Error("Expected node of type "+e+", but got "+(t?"node of type "+t.type:String(t)));return t}function vl(t){var e=_n(t);if(!e)throw new Error("Expected node of symbol group type, but got "+(t?"node of type "+t.type:String(t)));return e}function _n(t){return t&&(t.type==="atom"||Rv.hasOwnProperty(t.type))?t:null}var bl=(t,e)=>{var r,i,o;t&&t.type==="supsub"?(i=Ce(t.base,"accent"),r=i.base,t.base=r,o=Tv(Re(t,e)),t.base=i):(i=Ce(t,"accent"),r=i.base);var s=Re(r,e.havingCrampedStyle()),n=i.isShifty&&de.isCharacterBox(r),a=0;if(n){var l=de.getBaseElem(r),c=Re(l,e.havingCrampedStyle());a=qu(c).skew}var f=i.label==="\\c",m=f?s.height+s.depth:Math.min(s.height,e.fontMetrics().xHeight),_;if(i.isStretchy)_=Tr.svgSpan(i,e),_=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:s},{type:"elem",elem:_,wrapperClasses:["svg-align"],wrapperStyle:a>0?{width:"calc(100% - "+se(2*a)+")",marginLeft:se(2*a)}:void 0}]},e);else{var g,h;i.label==="\\vec"?(g=U.staticSvg("vec",e),h=U.svgData.vec[1]):(g=U.makeOrd({mode:i.mode,text:i.label},e,"textord"),g=qu(g),g.italic=0,h=g.width,f&&(m+=g.depth)),_=U.makeSpan(["accent-body"],[g]);var d=i.label==="\\textcircled";d&&(_.classes.push("accent-full"),m=s.height);var u=a;d||(u-=h/2),_.style.left=se(u),i.label==="\\textcircled"&&(_.style.top=".2em"),_=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:s},{type:"kern",size:-m},{type:"elem",elem:_}]},e)}var p=U.makeSpan(["mord","accent"],[_],e);return o?(o.children[0]=p,o.height=Math.max(p.height,o.height),o.classes[0]="mord",o):p},Dd=(t,e)=>{var r=t.isStretchy?Tr.mathMLnode(t.label):new Q.MathNode("mo",[jt(t.label,t.mode)]),i=new Q.MathNode("mover",[Ie(t.base,e),r]);return i.setAttribute("accent","true"),i},ob=new RegExp(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\mathring"].map(t=>"\\"+t).join("|"));ae({type:"accent",names:["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\mathring","\\widecheck","\\widehat","\\widetilde","\\overrightarrow","\\overleftarrow","\\Overrightarrow","\\overleftrightarrow","\\overgroup","\\overlinesegment","\\overleftharpoon","\\overrightharpoon"],props:{numArgs:1},handler:(t,e)=>{var r=fn(e[0]),i=!ob.test(t.funcName),o=!i||t.funcName==="\\widehat"||t.funcName==="\\widetilde"||t.funcName==="\\widecheck";return{type:"accent",mode:t.parser.mode,label:t.funcName,isStretchy:i,isShifty:o,base:r}},htmlBuilder:bl,mathmlBuilder:Dd});ae({type:"accent",names:["\\'","\\`","\\^","\\~","\\=","\\u","\\.",'\\"',"\\c","\\r","\\H","\\v","\\textcircled"],props:{numArgs:1,allowedInText:!0,allowedInMath:!0,argTypes:["primitive"]},handler:(t,e)=>{var r=e[0],i=t.parser.mode;return i==="math"&&(t.parser.settings.reportNonstrict("mathVsTextAccents","LaTeX's accent "+t.funcName+" works only in text mode"),i="text"),{type:"accent",mode:i,label:t.funcName,isStretchy:!1,isShifty:!0,base:r}},htmlBuilder:bl,mathmlBuilder:Dd});ae({type:"accentUnder",names:["\\underleftarrow","\\underrightarrow","\\underleftrightarrow","\\undergroup","\\underlinesegment","\\utilde"],props:{numArgs:1},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=e[0];return{type:"accentUnder",mode:r.mode,label:i,base:o}},htmlBuilder:(t,e)=>{var r=Re(t.base,e),i=Tr.svgSpan(t,e),o=t.label==="\\utilde"?.12:0,s=U.makeVList({positionType:"top",positionData:r.height,children:[{type:"elem",elem:i,wrapperClasses:["svg-align"]},{type:"kern",size:o},{type:"elem",elem:r}]},e);return U.makeSpan(["mord","accentunder"],[s],e)},mathmlBuilder:(t,e)=>{var r=Tr.mathMLnode(t.label),i=new Q.MathNode("munder",[Ie(t.base,e),r]);return i.setAttribute("accentunder","true"),i}});var sn=t=>{var e=new Q.MathNode("mpadded",t?[t]:[]);return e.setAttribute("width","+0.6em"),e.setAttribute("lspace","0.3em"),e};ae({type:"xArrow",names:["\\xleftarrow","\\xrightarrow","\\xLeftarrow","\\xRightarrow","\\xleftrightarrow","\\xLeftrightarrow","\\xhookleftarrow","\\xhookrightarrow","\\xmapsto","\\xrightharpoondown","\\xrightharpoonup","\\xleftharpoondown","\\xleftharpoonup","\\xrightleftharpoons","\\xleftrightharpoons","\\xlongequal","\\xtwoheadrightarrow","\\xtwoheadleftarrow","\\xtofrom","\\xrightleftarrows","\\xrightequilibrium","\\xleftequilibrium","\\\\cdrightarrow","\\\\cdleftarrow","\\\\cdlongequal"],props:{numArgs:1,numOptionalArgs:1},handler(t,e,r){var{parser:i,funcName:o}=t;return{type:"xArrow",mode:i.mode,label:o,body:e[0],below:r[0]}},htmlBuilder(t,e){var r=e.style,i=e.havingStyle(r.sup()),o=U.wrapFragment(Re(t.body,i,e),e),s=t.label.slice(0,2)==="\\x"?"x":"cd";o.classes.push(s+"-arrow-pad");var n;t.below&&(i=e.havingStyle(r.sub()),n=U.wrapFragment(Re(t.below,i,e),e),n.classes.push(s+"-arrow-pad"));var a=Tr.svgSpan(t,e),l=-e.fontMetrics().axisHeight+.5*a.height,c=-e.fontMetrics().axisHeight-.5*a.height-.111;(o.depth>.25||t.label==="\\xleftequilibrium")&&(c-=o.depth);var f;if(n){var m=-e.fontMetrics().axisHeight+n.height+.5*a.height+.111;f=U.makeVList({positionType:"individualShift",children:[{type:"elem",elem:o,shift:c},{type:"elem",elem:a,shift:l},{type:"elem",elem:n,shift:m}]},e)}else f=U.makeVList({positionType:"individualShift",children:[{type:"elem",elem:o,shift:c},{type:"elem",elem:a,shift:l}]},e);return f.children[0].children[0].children[1].classes.push("svg-align"),U.makeSpan(["mrel","x-arrow"],[f],e)},mathmlBuilder(t,e){var r=Tr.mathMLnode(t.label);r.setAttribute("minsize",t.label.charAt(0)==="x"?"1.75em":"3.0em");var i;if(t.body){var o=sn(Ie(t.body,e));if(t.below){var s=sn(Ie(t.below,e));i=new Q.MathNode("munderover",[r,s,o])}else i=new Q.MathNode("mover",[r,o])}else if(t.below){var n=sn(Ie(t.below,e));i=new Q.MathNode("munder",[r,n])}else i=sn(),i=new Q.MathNode("mover",[r,i]);return i}});var nb=U.makeSpan;function Ld(t,e){var r=rt(t.body,e,!0);return nb([t.mclass],r,e)}function $d(t,e){var r,i=At(t.body,e);return t.mclass==="minner"?r=new Q.MathNode("mpadded",i):t.mclass==="mord"?t.isCharacterBox?(r=i[0],r.type="mi"):r=new Q.MathNode("mi",i):(t.isCharacterBox?(r=i[0],r.type="mo"):r=new Q.MathNode("mo",i),t.mclass==="mbin"?(r.attributes.lspace="0.22em",r.attributes.rspace="0.22em"):t.mclass==="mpunct"?(r.attributes.lspace="0em",r.attributes.rspace="0.17em"):t.mclass==="mopen"||t.mclass==="mclose"?(r.attributes.lspace="0em",r.attributes.rspace="0em"):t.mclass==="minner"&&(r.attributes.lspace="0.0556em",r.attributes.width="+0.1111em")),r}ae({type:"mclass",names:["\\mathord","\\mathbin","\\mathrel","\\mathopen","\\mathclose","\\mathpunct","\\mathinner"],props:{numArgs:1,primitive:!0},handler(t,e){var{parser:r,funcName:i}=t,o=e[0];return{type:"mclass",mode:r.mode,mclass:"m"+i.slice(5),body:Ye(o),isCharacterBox:de.isCharacterBox(o)}},htmlBuilder:Ld,mathmlBuilder:$d});var yn=t=>{var e=t.type==="ordgroup"&&t.body.length?t.body[0]:t;return e.type==="atom"&&(e.family==="bin"||e.family==="rel")?"m"+e.family:"mord"};ae({type:"mclass",names:["\\@binrel"],props:{numArgs:2},handler(t,e){var{parser:r}=t;return{type:"mclass",mode:r.mode,mclass:yn(e[0]),body:Ye(e[1]),isCharacterBox:de.isCharacterBox(e[1])}}});ae({type:"mclass",names:["\\stackrel","\\overset","\\underset"],props:{numArgs:2},handler(t,e){var{parser:r,funcName:i}=t,o=e[1],s=e[0],n;i!=="\\stackrel"?n=yn(o):n="mrel";var a={type:"op",mode:o.mode,limits:!0,alwaysHandleSupSub:!0,parentIsSupSub:!1,symbol:!1,suppressBaseShift:i!=="\\stackrel",body:Ye(o)},l={type:"supsub",mode:s.mode,base:a,sup:i==="\\underset"?null:s,sub:i==="\\underset"?s:null};return{type:"mclass",mode:r.mode,mclass:n,body:[l],isCharacterBox:de.isCharacterBox(l)}},htmlBuilder:Ld,mathmlBuilder:$d});ae({type:"pmb",names:["\\pmb"],props:{numArgs:1,allowedInText:!0},handler(t,e){var{parser:r}=t;return{type:"pmb",mode:r.mode,mclass:yn(e[0]),body:Ye(e[0])}},htmlBuilder(t,e){var r=rt(t.body,e,!0),i=U.makeSpan([t.mclass],r,e);return i.style.textShadow="0.02em 0.01em 0.04px",i},mathmlBuilder(t,e){var r=At(t.body,e),i=new Q.MathNode("mstyle",r);return i.setAttribute("style","text-shadow: 0.02em 0.01em 0.04px"),i}});var ab={">":"\\\\cdrightarrow","<":"\\\\cdleftarrow","=":"\\\\cdlongequal",A:"\\uparrow",V:"\\downarrow","|":"\\Vert",".":"no arrow"},Ku=()=>({type:"styling",body:[],mode:"math",style:"display"}),Xu=t=>t.type==="textord"&&t.text==="@",lb=(t,e)=>(t.type==="mathord"||t.type==="atom")&&t.text===e;function cb(t,e,r){var i=ab[t];switch(i){case"\\\\cdrightarrow":case"\\\\cdleftarrow":return r.callFunction(i,[e[0]],[e[1]]);case"\\uparrow":case"\\downarrow":{var o=r.callFunction("\\\\cdleft",[e[0]],[]),s={type:"atom",text:i,mode:"math",family:"rel"},n=r.callFunction("\\Big",[s],[]),a=r.callFunction("\\\\cdright",[e[1]],[]),l={type:"ordgroup",mode:"math",body:[o,n,a]};return r.callFunction("\\\\cdparent",[l],[])}case"\\\\cdlongequal":return r.callFunction("\\\\cdlongequal",[],[]);case"\\Vert":{var c={type:"textord",text:"\\Vert",mode:"math"};return r.callFunction("\\Big",[c],[])}default:return{type:"textord",text:" ",mode:"math"}}}function hb(t){var e=[];for(t.gullet.beginGroup(),t.gullet.macros.set("\\cr","\\\\\\relax"),t.gullet.beginGroup();;){e.push(t.parseExpression(!1,"\\\\")),t.gullet.endGroup(),t.gullet.beginGroup();var r=t.fetch().text;if(r==="&"||r==="\\\\")t.consume();else if(r==="\\end"){e[e.length-1].length===0&&e.pop();break}else throw new te("Expected \\\\ or \\cr or \\end",t.nextToken)}for(var i=[],o=[i],s=0;s<e.length;s++){for(var n=e[s],a=Ku(),l=0;l<n.length;l++)if(!Xu(n[l]))a.body.push(n[l]);else{i.push(a),l+=1;var c=vl(n[l]).text,f=new Array(2);if(f[0]={type:"ordgroup",mode:"math",body:[]},f[1]={type:"ordgroup",mode:"math",body:[]},!("=|.".indexOf(c)>-1))if("<>AV".indexOf(c)>-1)for(var m=0;m<2;m++){for(var _=!0,g=l+1;g<n.length;g++){if(lb(n[g],c)){_=!1,l=g;break}if(Xu(n[g]))throw new te("Missing a "+c+" character to complete a CD arrow.",n[g]);f[m].body.push(n[g])}if(_)throw new te("Missing a "+c+" character to complete a CD arrow.",n[l])}else throw new te('Expected one of "<>AV=|." after @',n[l]);var h=cb(c,f,t),d={type:"styling",body:[h],mode:"math",style:"display"};i.push(d),a=Ku()}s%2===0?i.push(a):i.shift(),i=[],o.push(i)}t.gullet.endGroup(),t.gullet.endGroup();var u=new Array(o[0].length).fill({type:"align",align:"c",pregap:.25,postgap:.25});return{type:"array",mode:"math",body:o,arraystretch:1,addJot:!0,rowGaps:[null],cols:u,colSeparationType:"CD",hLinesBeforeRow:new Array(o.length+1).fill([])}}ae({type:"cdlabel",names:["\\\\cdleft","\\\\cdright"],props:{numArgs:1},handler(t,e){var{parser:r,funcName:i}=t;return{type:"cdlabel",mode:r.mode,side:i.slice(4),label:e[0]}},htmlBuilder(t,e){var r=e.havingStyle(e.style.sup()),i=U.wrapFragment(Re(t.label,r,e),e);return i.classes.push("cd-label-"+t.side),i.style.bottom=se(.8-i.depth),i.height=0,i.depth=0,i},mathmlBuilder(t,e){var r=new Q.MathNode("mrow",[Ie(t.label,e)]);return r=new Q.MathNode("mpadded",[r]),r.setAttribute("width","0"),t.side==="left"&&r.setAttribute("lspace","-1width"),r.setAttribute("voffset","0.7em"),r=new Q.MathNode("mstyle",[r]),r.setAttribute("displaystyle","false"),r.setAttribute("scriptlevel","1"),r}});ae({type:"cdlabelparent",names:["\\\\cdparent"],props:{numArgs:1},handler(t,e){var{parser:r}=t;return{type:"cdlabelparent",mode:r.mode,fragment:e[0]}},htmlBuilder(t,e){var r=U.wrapFragment(Re(t.fragment,e),e);return r.classes.push("cd-vert-arrow"),r},mathmlBuilder(t,e){return new Q.MathNode("mrow",[Ie(t.fragment,e)])}});ae({type:"textord",names:["\\@char"],props:{numArgs:1,allowedInText:!0},handler(t,e){for(var{parser:r}=t,i=Ce(e[0],"ordgroup"),o=i.body,s="",n=0;n<o.length;n++){var a=Ce(o[n],"textord");s+=a.text}var l=parseInt(s),c;if(isNaN(l))throw new te("\\@char has non-numeric argument "+s);if(l<0||l>=1114111)throw new te("\\@char with invalid code point "+s);return l<=65535?c=String.fromCharCode(l):(l-=65536,c=String.fromCharCode((l>>10)+55296,(l&1023)+56320)),{type:"textord",mode:r.mode,text:c}}});var Bd=(t,e)=>{var r=rt(t.body,e.withColor(t.color),!1);return U.makeFragment(r)},zd=(t,e)=>{var r=At(t.body,e.withColor(t.color)),i=new Q.MathNode("mstyle",r);return i.setAttribute("mathcolor",t.color),i};ae({type:"color",names:["\\textcolor"],props:{numArgs:2,allowedInText:!0,argTypes:["color","original"]},handler(t,e){var{parser:r}=t,i=Ce(e[0],"color-token").color,o=e[1];return{type:"color",mode:r.mode,color:i,body:Ye(o)}},htmlBuilder:Bd,mathmlBuilder:zd});ae({type:"color",names:["\\color"],props:{numArgs:1,allowedInText:!0,argTypes:["color"]},handler(t,e){var{parser:r,breakOnTokenText:i}=t,o=Ce(e[0],"color-token").color;r.gullet.macros.set("\\current@color",o);var s=r.parseExpression(!0,i);return{type:"color",mode:r.mode,color:o,body:s}},htmlBuilder:Bd,mathmlBuilder:zd});ae({type:"cr",names:["\\\\"],props:{numArgs:0,numOptionalArgs:0,allowedInText:!0},handler(t,e,r){var{parser:i}=t,o=i.gullet.future().text==="["?i.parseSizeGroup(!0):null,s=!i.settings.displayMode||!i.settings.useStrictBehavior("newLineInDisplayMode","In LaTeX, \\\\ or \\newline does nothing in display mode");return{type:"cr",mode:i.mode,newLine:s,size:o&&Ce(o,"size").value}},htmlBuilder(t,e){var r=U.makeSpan(["mspace"],[],e);return t.newLine&&(r.classes.push("newline"),t.size&&(r.style.marginTop=se(Ge(t.size,e)))),r},mathmlBuilder(t,e){var r=new Q.MathNode("mspace");return t.newLine&&(r.setAttribute("linebreak","newline"),t.size&&r.setAttribute("height",se(Ge(t.size,e)))),r}});var al={"\\global":"\\global","\\long":"\\\\globallong","\\\\globallong":"\\\\globallong","\\def":"\\gdef","\\gdef":"\\gdef","\\edef":"\\xdef","\\xdef":"\\xdef","\\let":"\\\\globallet","\\futurelet":"\\\\globalfuture"},Od=t=>{var e=t.text;if(/^(?:[\\{}$&#^_]|EOF)$/.test(e))throw new te("Expected a control sequence",t);return e},ub=t=>{var e=t.gullet.popToken();return e.text==="="&&(e=t.gullet.popToken(),e.text===" "&&(e=t.gullet.popToken())),e},Id=(t,e,r,i)=>{var o=t.gullet.macros.get(r.text);o==null&&(r.noexpand=!0,o={tokens:[r],numArgs:0,unexpandable:!t.gullet.isExpandable(r.text)}),t.gullet.macros.set(e,o,i)};ae({type:"internal",names:["\\global","\\long","\\\\globallong"],props:{numArgs:0,allowedInText:!0},handler(t){var{parser:e,funcName:r}=t;e.consumeSpaces();var i=e.fetch();if(al[i.text])return(r==="\\global"||r==="\\\\globallong")&&(i.text=al[i.text]),Ce(e.parseFunction(),"internal");throw new te("Invalid token after macro prefix",i)}});ae({type:"internal",names:["\\def","\\gdef","\\edef","\\xdef"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(t){var{parser:e,funcName:r}=t,i=e.gullet.popToken(),o=i.text;if(/^(?:[\\{}$&#^_]|EOF)$/.test(o))throw new te("Expected a control sequence",i);for(var s=0,n,a=[[]];e.gullet.future().text!=="{";)if(i=e.gullet.popToken(),i.text==="#"){if(e.gullet.future().text==="{"){n=e.gullet.future(),a[s].push("{");break}if(i=e.gullet.popToken(),!/^[1-9]$/.test(i.text))throw new te('Invalid argument number "'+i.text+'"');if(parseInt(i.text)!==s+1)throw new te('Argument number "'+i.text+'" out of order');s++,a.push([])}else{if(i.text==="EOF")throw new te("Expected a macro definition");a[s].push(i.text)}var{tokens:l}=e.gullet.consumeArg();return n&&l.unshift(n),(r==="\\edef"||r==="\\xdef")&&(l=e.gullet.expandTokens(l),l.reverse()),e.gullet.macros.set(o,{tokens:l,numArgs:s,delimiters:a},r===al[r]),{type:"internal",mode:e.mode}}});ae({type:"internal",names:["\\let","\\\\globallet"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(t){var{parser:e,funcName:r}=t,i=Od(e.gullet.popToken());e.gullet.consumeSpaces();var o=ub(e);return Id(e,i,o,r==="\\\\globallet"),{type:"internal",mode:e.mode}}});ae({type:"internal",names:["\\futurelet","\\\\globalfuture"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(t){var{parser:e,funcName:r}=t,i=Od(e.gullet.popToken()),o=e.gullet.popToken(),s=e.gullet.popToken();return Id(e,i,s,r==="\\\\globalfuture"),e.gullet.pushToken(s),e.gullet.pushToken(o),{type:"internal",mode:e.mode}}});var Ps=function(e,r,i){var o=Pe.math[e]&&Pe.math[e].replace,s=pl(o||e,r,i);if(!s)throw new Error("Unsupported symbol "+e+" and font size "+r+".");return s},_l=function(e,r,i,o){var s=i.havingBaseStyle(r),n=U.makeSpan(o.concat(s.sizingClasses(i)),[e],i),a=s.sizeMultiplier/i.sizeMultiplier;return n.height*=a,n.depth*=a,n.maxFontSize=s.sizeMultiplier,n},Pd=function(e,r,i){var o=r.havingBaseStyle(i),s=(1-r.sizeMultiplier/o.sizeMultiplier)*r.fontMetrics().axisHeight;e.classes.push("delimcenter"),e.style.top=se(s),e.height-=s,e.depth+=s},db=function(e,r,i,o,s,n){var a=U.makeSymbol(e,"Main-Regular",s,o),l=_l(a,r,o,n);return i&&Pd(l,o,r),l},pb=function(e,r,i,o){return U.makeSymbol(e,"Size"+r+"-Regular",i,o)},Hd=function(e,r,i,o,s,n){var a=pb(e,r,s,o),l=_l(U.makeSpan(["delimsizing","size"+r],[a],o),ge.TEXT,o,n);return i&&Pd(l,o,ge.TEXT),l},Wa=function(e,r,i){var o;r==="Size1-Regular"?o="delim-size1":o="delim-size4";var s=U.makeSpan(["delimsizinginner",o],[U.makeSpan([],[U.makeSymbol(e,r,i)])]);return{type:"elem",elem:s}},ja=function(e,r,i){var o=lr["Size4-Regular"][e.charCodeAt(0)]?lr["Size4-Regular"][e.charCodeAt(0)][4]:lr["Size1-Regular"][e.charCodeAt(0)][4],s=new cr("inner",yv(e,Math.round(1e3*r))),n=new er([s],{width:se(o),height:se(r),style:"width:"+se(o),viewBox:"0 0 "+1e3*o+" "+Math.round(1e3*r),preserveAspectRatio:"xMinYMin"}),a=U.makeSvgSpan([],[n],i);return a.height=r,a.style.height=se(r),a.style.width=se(o),{type:"elem",elem:a}},ll=.008,on={type:"kern",size:-1*ll},fb=["|","\\lvert","\\rvert","\\vert"],mb=["\\|","\\lVert","\\rVert","\\Vert"],Fd=function(e,r,i,o,s,n){var a,l,c,f,m="",_=0;a=c=f=e,l=null;var g="Size1-Regular";e==="\\uparrow"?c=f="\u23D0":e==="\\Uparrow"?c=f="\u2016":e==="\\downarrow"?a=c="\u23D0":e==="\\Downarrow"?a=c="\u2016":e==="\\updownarrow"?(a="\\uparrow",c="\u23D0",f="\\downarrow"):e==="\\Updownarrow"?(a="\\Uparrow",c="\u2016",f="\\Downarrow"):de.contains(fb,e)?(c="\u2223",m="vert",_=333):de.contains(mb,e)?(c="\u2225",m="doublevert",_=556):e==="["||e==="\\lbrack"?(a="\u23A1",c="\u23A2",f="\u23A3",g="Size4-Regular",m="lbrack",_=667):e==="]"||e==="\\rbrack"?(a="\u23A4",c="\u23A5",f="\u23A6",g="Size4-Regular",m="rbrack",_=667):e==="\\lfloor"||e==="\u230A"?(c=a="\u23A2",f="\u23A3",g="Size4-Regular",m="lfloor",_=667):e==="\\lceil"||e==="\u2308"?(a="\u23A1",c=f="\u23A2",g="Size4-Regular",m="lceil",_=667):e==="\\rfloor"||e==="\u230B"?(c=a="\u23A5",f="\u23A6",g="Size4-Regular",m="rfloor",_=667):e==="\\rceil"||e==="\u2309"?(a="\u23A4",c=f="\u23A5",g="Size4-Regular",m="rceil",_=667):e==="("||e==="\\lparen"?(a="\u239B",c="\u239C",f="\u239D",g="Size4-Regular",m="lparen",_=875):e===")"||e==="\\rparen"?(a="\u239E",c="\u239F",f="\u23A0",g="Size4-Regular",m="rparen",_=875):e==="\\{"||e==="\\lbrace"?(a="\u23A7",l="\u23A8",f="\u23A9",c="\u23AA",g="Size4-Regular"):e==="\\}"||e==="\\rbrace"?(a="\u23AB",l="\u23AC",f="\u23AD",c="\u23AA",g="Size4-Regular"):e==="\\lgroup"||e==="\u27EE"?(a="\u23A7",f="\u23A9",c="\u23AA",g="Size4-Regular"):e==="\\rgroup"||e==="\u27EF"?(a="\u23AB",f="\u23AD",c="\u23AA",g="Size4-Regular"):e==="\\lmoustache"||e==="\u23B0"?(a="\u23A7",f="\u23AD",c="\u23AA",g="Size4-Regular"):(e==="\\rmoustache"||e==="\u23B1")&&(a="\u23AB",f="\u23A9",c="\u23AA",g="Size4-Regular");var h=Ps(a,g,s),d=h.height+h.depth,u=Ps(c,g,s),p=u.height+u.depth,v=Ps(f,g,s),x=v.height+v.depth,S=0,C=1;if(l!==null){var y=Ps(l,g,s);S=y.height+y.depth,C=2}var k=d+x+S,D=Math.max(0,Math.ceil((r-k)/(C*p))),$=k+D*C*p,F=o.fontMetrics().axisHeight;i&&(F*=o.sizeMultiplier);var L=$/2-F,V=[];if(m.length>0){var G=$-d-x,K=Math.round($*1e3),re=wv(m,Math.round(G*1e3)),J=new cr(m,re),A=(_/1e3).toFixed(3)+"em",B=(K/1e3).toFixed(3)+"em",P=new er([J],{width:A,height:B,viewBox:"0 0 "+_+" "+K}),N=U.makeSvgSpan([],[P],o);N.height=K/1e3,N.style.width=A,N.style.height=B,V.push({type:"elem",elem:N})}else{if(V.push(Wa(f,g,s)),V.push(on),l===null){var X=$-d-x+2*ll;V.push(ja(c,X,o))}else{var ie=($-d-x-S)/2+2*ll;V.push(ja(c,ie,o)),V.push(on),V.push(Wa(l,g,s)),V.push(on),V.push(ja(c,ie,o))}V.push(on),V.push(Wa(a,g,s))}var ce=o.havingBaseStyle(ge.TEXT),ve=U.makeVList({positionType:"bottom",positionData:L,children:V},ce);return _l(U.makeSpan(["delimsizing","mult"],[ve],ce),ge.TEXT,o,n)},Ga=80,Ka=.08,Xa=function(e,r,i,o,s){var n=_v(e,o,i),a=new cr(e,n),l=new er([a],{width:"400em",height:se(r),viewBox:"0 0 400000 "+i,preserveAspectRatio:"xMinYMin slice"});return U.makeSvgSpan(["hide-tail"],[l],s)},gb=function(e,r){var i=r.havingBaseSizing(),o=Ud("\\surd",e*i.sizeMultiplier,Vd,i),s=i.sizeMultiplier,n=Math.max(0,r.minRuleThickness-r.fontMetrics().sqrtRuleThickness),a,l=0,c=0,f=0,m;return o.type==="small"?(f=1e3+1e3*n+Ga,e<1?s=1:e<1.4&&(s=.7),l=(1+n+Ka)/s,c=(1+n)/s,a=Xa("sqrtMain",l,f,n,r),a.style.minWidth="0.853em",m=.833/s):o.type==="large"?(f=(1e3+Ga)*Hs[o.size],c=(Hs[o.size]+n)/s,l=(Hs[o.size]+n+Ka)/s,a=Xa("sqrtSize"+o.size,l,f,n,r),a.style.minWidth="1.02em",m=1/s):(l=e+n+Ka,c=e+n,f=Math.floor(1e3*e+n)+Ga,a=Xa("sqrtTall",l,f,n,r),a.style.minWidth="0.742em",m=1.056),a.height=c,a.style.height=se(l),{span:a,advanceWidth:m,ruleWidth:(r.fontMetrics().sqrtRuleThickness+n)*s}},Nd=["(","\\lparen",")","\\rparen","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\u230A","\u230B","\\lceil","\\rceil","\u2308","\u2309","\\surd"],vb=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\u27EE","\u27EF","\\lmoustache","\\rmoustache","\u23B0","\u23B1"],qd=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"],Hs=[0,1.2,1.8,2.4,3],bb=function(e,r,i,o,s){if(e==="<"||e==="\\lt"||e==="\u27E8"?e="\\langle":(e===">"||e==="\\gt"||e==="\u27E9")&&(e="\\rangle"),de.contains(Nd,e)||de.contains(qd,e))return Hd(e,r,!1,i,o,s);if(de.contains(vb,e))return Fd(e,Hs[r],!1,i,o,s);throw new te("Illegal delimiter: '"+e+"'")},_b=[{type:"small",style:ge.SCRIPTSCRIPT},{type:"small",style:ge.SCRIPT},{type:"small",style:ge.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}],yb=[{type:"small",style:ge.SCRIPTSCRIPT},{type:"small",style:ge.SCRIPT},{type:"small",style:ge.TEXT},{type:"stack"}],Vd=[{type:"small",style:ge.SCRIPTSCRIPT},{type:"small",style:ge.SCRIPT},{type:"small",style:ge.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}],wb=function(e){if(e.type==="small")return"Main-Regular";if(e.type==="large")return"Size"+e.size+"-Regular";if(e.type==="stack")return"Size4-Regular";throw new Error("Add support for delim type '"+e.type+"' here.")},Ud=function(e,r,i,o){for(var s=Math.min(2,3-o.style.size),n=s;n<i.length&&i[n].type!=="stack";n++){var a=Ps(e,wb(i[n]),"math"),l=a.height+a.depth;if(i[n].type==="small"){var c=o.havingBaseStyle(i[n].style);l*=c.sizeMultiplier}if(l>r)return i[n]}return i[i.length-1]},Wd=function(e,r,i,o,s,n){e==="<"||e==="\\lt"||e==="\u27E8"?e="\\langle":(e===">"||e==="\\gt"||e==="\u27E9")&&(e="\\rangle");var a;de.contains(qd,e)?a=_b:de.contains(Nd,e)?a=Vd:a=yb;var l=Ud(e,r,a,o);return l.type==="small"?db(e,l.style,i,o,s,n):l.type==="large"?Hd(e,l.size,i,o,s,n):Fd(e,r,i,o,s,n)},xb=function(e,r,i,o,s,n){var a=o.fontMetrics().axisHeight*o.sizeMultiplier,l=901,c=5/o.fontMetrics().ptPerEm,f=Math.max(r-a,i+a),m=Math.max(f/500*l,2*f-c);return Wd(e,m,!0,o,s,n)},Er={sqrtImage:gb,sizedDelim:bb,sizeToMaxHeight:Hs,customSizedDelim:Wd,leftRightDelim:xb},Yu={"\\bigl":{mclass:"mopen",size:1},"\\Bigl":{mclass:"mopen",size:2},"\\biggl":{mclass:"mopen",size:3},"\\Biggl":{mclass:"mopen",size:4},"\\bigr":{mclass:"mclose",size:1},"\\Bigr":{mclass:"mclose",size:2},"\\biggr":{mclass:"mclose",size:3},"\\Biggr":{mclass:"mclose",size:4},"\\bigm":{mclass:"mrel",size:1},"\\Bigm":{mclass:"mrel",size:2},"\\biggm":{mclass:"mrel",size:3},"\\Biggm":{mclass:"mrel",size:4},"\\big":{mclass:"mord",size:1},"\\Big":{mclass:"mord",size:2},"\\bigg":{mclass:"mord",size:3},"\\Bigg":{mclass:"mord",size:4}},Sb=["(","\\lparen",")","\\rparen","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\u230A","\u230B","\\lceil","\\rceil","\u2308","\u2309","<",">","\\langle","\u27E8","\\rangle","\u27E9","\\lt","\\gt","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\u27EE","\u27EF","\\lmoustache","\\rmoustache","\u23B0","\u23B1","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."];function wn(t,e){var r=_n(t);if(r&&de.contains(Sb,r.text))return r;throw r?new te("Invalid delimiter '"+r.text+"' after '"+e.funcName+"'",t):new te("Invalid delimiter type '"+t.type+"'",t)}ae({type:"delimsizing",names:["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg"],props:{numArgs:1,argTypes:["primitive"]},handler:(t,e)=>{var r=wn(e[0],t);return{type:"delimsizing",mode:t.parser.mode,size:Yu[t.funcName].size,mclass:Yu[t.funcName].mclass,delim:r.text}},htmlBuilder:(t,e)=>t.delim==="."?U.makeSpan([t.mclass]):Er.sizedDelim(t.delim,t.size,e,t.mode,[t.mclass]),mathmlBuilder:t=>{var e=[];t.delim!=="."&&e.push(jt(t.delim,t.mode));var r=new Q.MathNode("mo",e);t.mclass==="mopen"||t.mclass==="mclose"?r.setAttribute("fence","true"):r.setAttribute("fence","false"),r.setAttribute("stretchy","true");var i=se(Er.sizeToMaxHeight[t.size]);return r.setAttribute("minsize",i),r.setAttribute("maxsize",i),r}});function Zu(t){if(!t.body)throw new Error("Bug: The leftright ParseNode wasn't fully parsed.")}ae({type:"leftright-right",names:["\\right"],props:{numArgs:1,primitive:!0},handler:(t,e)=>{var r=t.parser.gullet.macros.get("\\current@color");if(r&&typeof r!="string")throw new te("\\current@color set to non-string in \\right");return{type:"leftright-right",mode:t.parser.mode,delim:wn(e[0],t).text,color:r}}});ae({type:"leftright",names:["\\left"],props:{numArgs:1,primitive:!0},handler:(t,e)=>{var r=wn(e[0],t),i=t.parser;++i.leftrightDepth;var o=i.parseExpression(!1);--i.leftrightDepth,i.expect("\\right",!1);var s=Ce(i.parseFunction(),"leftright-right");return{type:"leftright",mode:i.mode,body:o,left:r.text,right:s.delim,rightColor:s.color}},htmlBuilder:(t,e)=>{Zu(t);for(var r=rt(t.body,e,!0,["mopen","mclose"]),i=0,o=0,s=!1,n=0;n<r.length;n++)r[n].isMiddle?s=!0:(i=Math.max(r[n].height,i),o=Math.max(r[n].depth,o));i*=e.sizeMultiplier,o*=e.sizeMultiplier;var a;if(t.left==="."?a=Us(e,["mopen"]):a=Er.leftRightDelim(t.left,i,o,e,t.mode,["mopen"]),r.unshift(a),s)for(var l=1;l<r.length;l++){var c=r[l],f=c.isMiddle;f&&(r[l]=Er.leftRightDelim(f.delim,i,o,f.options,t.mode,[]))}var m;if(t.right===".")m=Us(e,["mclose"]);else{var _=t.rightColor?e.withColor(t.rightColor):e;m=Er.leftRightDelim(t.right,i,o,_,t.mode,["mclose"])}return r.push(m),U.makeSpan(["minner"],r,e)},mathmlBuilder:(t,e)=>{Zu(t);var r=At(t.body,e);if(t.left!=="."){var i=new Q.MathNode("mo",[jt(t.left,t.mode)]);i.setAttribute("fence","true"),r.unshift(i)}if(t.right!=="."){var o=new Q.MathNode("mo",[jt(t.right,t.mode)]);o.setAttribute("fence","true"),t.rightColor&&o.setAttribute("mathcolor",t.rightColor),r.push(o)}return ml(r)}});ae({type:"middle",names:["\\middle"],props:{numArgs:1,primitive:!0},handler:(t,e)=>{var r=wn(e[0],t);if(!t.parser.leftrightDepth)throw new te("\\middle without preceding \\left",r);return{type:"middle",mode:t.parser.mode,delim:r.text}},htmlBuilder:(t,e)=>{var r;if(t.delim===".")r=Us(e,[]);else{r=Er.sizedDelim(t.delim,1,e,t.mode,[]);var i={delim:t.delim,options:e};r.isMiddle=i}return r},mathmlBuilder:(t,e)=>{var r=t.delim==="\\vert"||t.delim==="|"?jt("|","text"):jt(t.delim,t.mode),i=new Q.MathNode("mo",[r]);return i.setAttribute("fence","true"),i.setAttribute("lspace","0.05em"),i.setAttribute("rspace","0.05em"),i}});var yl=(t,e)=>{var r=U.wrapFragment(Re(t.body,e),e),i=t.label.slice(1),o=e.sizeMultiplier,s,n=0,a=de.isCharacterBox(t.body);if(i==="sout")s=U.makeSpan(["stretchy","sout"]),s.height=e.fontMetrics().defaultRuleThickness/o,n=-.5*e.fontMetrics().xHeight;else if(i==="phase"){var l=Ge({number:.6,unit:"pt"},e),c=Ge({number:.35,unit:"ex"},e),f=e.havingBaseSizing();o=o/f.sizeMultiplier;var m=r.height+r.depth+l+c;r.style.paddingLeft=se(m/2+l);var _=Math.floor(1e3*m*o),g=vv(_),h=new er([new cr("phase",g)],{width:"400em",height:se(_/1e3),viewBox:"0 0 400000 "+_,preserveAspectRatio:"xMinYMin slice"});s=U.makeSvgSpan(["hide-tail"],[h],e),s.style.height=se(m),n=r.depth+l+c}else{/cancel/.test(i)?a||r.classes.push("cancel-pad"):i==="angl"?r.classes.push("anglpad"):r.classes.push("boxpad");var d=0,u=0,p=0;/box/.test(i)?(p=Math.max(e.fontMetrics().fboxrule,e.minRuleThickness),d=e.fontMetrics().fboxsep+(i==="colorbox"?0:p),u=d):i==="angl"?(p=Math.max(e.fontMetrics().defaultRuleThickness,e.minRuleThickness),d=4*p,u=Math.max(0,.25-r.depth)):(d=a?.2:0,u=d),s=Tr.encloseSpan(r,i,d,u,e),/fbox|boxed|fcolorbox/.test(i)?(s.style.borderStyle="solid",s.style.borderWidth=se(p)):i==="angl"&&p!==.049&&(s.style.borderTopWidth=se(p),s.style.borderRightWidth=se(p)),n=r.depth+u,t.backgroundColor&&(s.style.backgroundColor=t.backgroundColor,t.borderColor&&(s.style.borderColor=t.borderColor))}var v;if(t.backgroundColor)v=U.makeVList({positionType:"individualShift",children:[{type:"elem",elem:s,shift:n},{type:"elem",elem:r,shift:0}]},e);else{var x=/cancel|phase/.test(i)?["svg-align"]:[];v=U.makeVList({positionType:"individualShift",children:[{type:"elem",elem:r,shift:0},{type:"elem",elem:s,shift:n,wrapperClasses:x}]},e)}return/cancel/.test(i)&&(v.height=r.height,v.depth=r.depth),/cancel/.test(i)&&!a?U.makeSpan(["mord","cancel-lap"],[v],e):U.makeSpan(["mord"],[v],e)},wl=(t,e)=>{var r=0,i=new Q.MathNode(t.label.indexOf("colorbox")>-1?"mpadded":"menclose",[Ie(t.body,e)]);switch(t.label){case"\\cancel":i.setAttribute("notation","updiagonalstrike");break;case"\\bcancel":i.setAttribute("notation","downdiagonalstrike");break;case"\\phase":i.setAttribute("notation","phasorangle");break;case"\\sout":i.setAttribute("notation","horizontalstrike");break;case"\\fbox":i.setAttribute("notation","box");break;case"\\angl":i.setAttribute("notation","actuarial");break;case"\\fcolorbox":case"\\colorbox":if(r=e.fontMetrics().fboxsep*e.fontMetrics().ptPerEm,i.setAttribute("width","+"+2*r+"pt"),i.setAttribute("height","+"+2*r+"pt"),i.setAttribute("lspace",r+"pt"),i.setAttribute("voffset",r+"pt"),t.label==="\\fcolorbox"){var o=Math.max(e.fontMetrics().fboxrule,e.minRuleThickness);i.setAttribute("style","border: "+o+"em solid "+String(t.borderColor))}break;case"\\xcancel":i.setAttribute("notation","updiagonalstrike downdiagonalstrike");break}return t.backgroundColor&&i.setAttribute("mathbackground",t.backgroundColor),i};ae({type:"enclose",names:["\\colorbox"],props:{numArgs:2,allowedInText:!0,argTypes:["color","text"]},handler(t,e,r){var{parser:i,funcName:o}=t,s=Ce(e[0],"color-token").color,n=e[1];return{type:"enclose",mode:i.mode,label:o,backgroundColor:s,body:n}},htmlBuilder:yl,mathmlBuilder:wl});ae({type:"enclose",names:["\\fcolorbox"],props:{numArgs:3,allowedInText:!0,argTypes:["color","color","text"]},handler(t,e,r){var{parser:i,funcName:o}=t,s=Ce(e[0],"color-token").color,n=Ce(e[1],"color-token").color,a=e[2];return{type:"enclose",mode:i.mode,label:o,backgroundColor:n,borderColor:s,body:a}},htmlBuilder:yl,mathmlBuilder:wl});ae({type:"enclose",names:["\\fbox"],props:{numArgs:1,argTypes:["hbox"],allowedInText:!0},handler(t,e){var{parser:r}=t;return{type:"enclose",mode:r.mode,label:"\\fbox",body:e[0]}}});ae({type:"enclose",names:["\\cancel","\\bcancel","\\xcancel","\\sout","\\phase"],props:{numArgs:1},handler(t,e){var{parser:r,funcName:i}=t,o=e[0];return{type:"enclose",mode:r.mode,label:i,body:o}},htmlBuilder:yl,mathmlBuilder:wl});ae({type:"enclose",names:["\\angl"],props:{numArgs:1,argTypes:["hbox"],allowedInText:!1},handler(t,e){var{parser:r}=t;return{type:"enclose",mode:r.mode,label:"\\angl",body:e[0]}}});var jd={};function hr(t){for(var{type:e,names:r,props:i,handler:o,htmlBuilder:s,mathmlBuilder:n}=t,a={type:e,numArgs:i.numArgs||0,allowedInText:!1,numOptionalArgs:0,handler:o},l=0;l<r.length;++l)jd[r[l]]=a;s&&(dn[e]=s),n&&(pn[e]=n)}var Gd={};function M(t,e){Gd[t]=e}function Ju(t){var e=[];t.consumeSpaces();var r=t.fetch().text;for(r==="\\relax"&&(t.consume(),t.consumeSpaces(),r=t.fetch().text);r==="\\hline"||r==="\\hdashline";)t.consume(),e.push(r==="\\hdashline"),t.consumeSpaces(),r=t.fetch().text;return e}var xn=t=>{var e=t.parser.settings;if(!e.displayMode)throw new te("{"+t.envName+"} can be used only in display mode.")};function xl(t){if(t.indexOf("ed")===-1)return t.indexOf("*")===-1}function Yr(t,e,r){var{hskipBeforeAndAfter:i,addJot:o,cols:s,arraystretch:n,colSeparationType:a,autoTag:l,singleRow:c,emptySingleRow:f,maxNumCols:m,leqno:_}=e;if(t.gullet.beginGroup(),c||t.gullet.macros.set("\\cr","\\\\\\relax"),!n){var g=t.gullet.expandMacroAsText("\\arraystretch");if(g==null)n=1;else if(n=parseFloat(g),!n||n<0)throw new te("Invalid \\arraystretch: "+g)}t.gullet.beginGroup();var h=[],d=[h],u=[],p=[],v=l!=null?[]:void 0;function x(){l&&t.gullet.macros.set("\\@eqnsw","1",!0)}function S(){v&&(t.gullet.macros.get("\\df@tag")?(v.push(t.subparse([new Wt("\\df@tag")])),t.gullet.macros.set("\\df@tag",void 0,!0)):v.push(!!l&&t.gullet.macros.get("\\@eqnsw")==="1"))}for(x(),p.push(Ju(t));;){var C=t.parseExpression(!1,c?"\\end":"\\\\");t.gullet.endGroup(),t.gullet.beginGroup(),C={type:"ordgroup",mode:t.mode,body:C},r&&(C={type:"styling",mode:t.mode,style:r,body:[C]}),h.push(C);var y=t.fetch().text;if(y==="&"){if(m&&h.length===m){if(c||a)throw new te("Too many tab characters: &",t.nextToken);t.settings.reportNonstrict("textEnv","Too few columns specified in the {array} column argument.")}t.consume()}else if(y==="\\end"){S(),h.length===1&&C.type==="styling"&&C.body[0].body.length===0&&(d.length>1||!f)&&d.pop(),p.length<d.length+1&&p.push([]);break}else if(y==="\\\\"){t.consume();var k=void 0;t.gullet.future().text!==" "&&(k=t.parseSizeGroup(!0)),u.push(k?k.value:null),S(),p.push(Ju(t)),h=[],d.push(h),x()}else throw new te("Expected & or \\\\ or \\cr or \\end",t.nextToken)}return t.gullet.endGroup(),t.gullet.endGroup(),{type:"array",mode:t.mode,addJot:o,arraystretch:n,body:d,cols:s,rowGaps:u,hskipBeforeAndAfter:i,hLinesBeforeRow:p,colSeparationType:a,tags:v,leqno:_}}function Sl(t){return t.slice(0,1)==="d"?"display":"text"}var ur=function(e,r){var i,o,s=e.body.length,n=e.hLinesBeforeRow,a=0,l=new Array(s),c=[],f=Math.max(r.fontMetrics().arrayRuleWidth,r.minRuleThickness),m=1/r.fontMetrics().ptPerEm,_=5*m;if(e.colSeparationType&&e.colSeparationType==="small"){var g=r.havingStyle(ge.SCRIPT).sizeMultiplier;_=.2778*(g/r.sizeMultiplier)}var h=e.colSeparationType==="CD"?Ge({number:3,unit:"ex"},r):12*m,d=3*m,u=e.arraystretch*h,p=.7*u,v=.3*u,x=0;function S(Lr){for(var $r=0;$r<Lr.length;++$r)$r>0&&(x+=.25),c.push({pos:x,isDashed:Lr[$r]})}for(S(n[0]),i=0;i<e.body.length;++i){var C=e.body[i],y=p,k=v;a<C.length&&(a=C.length);var D=new Array(C.length);for(o=0;o<C.length;++o){var $=Re(C[o],r);k<$.depth&&(k=$.depth),y<$.height&&(y=$.height),D[o]=$}var F=e.rowGaps[i],L=0;F&&(L=Ge(F,r),L>0&&(L+=v,k<L&&(k=L),L=0)),e.addJot&&(k+=d),D.height=y,D.depth=k,x+=y,D.pos=x,x+=k+L,l[i]=D,S(n[i+1])}var V=x/2+r.fontMetrics().axisHeight,G=e.cols||[],K=[],re,J,A=[];if(e.tags&&e.tags.some(Lr=>Lr))for(i=0;i<s;++i){var B=l[i],P=B.pos-V,N=e.tags[i],X=void 0;N===!0?X=U.makeSpan(["eqn-num"],[],r):N===!1?X=U.makeSpan([],[],r):X=U.makeSpan([],rt(N,r,!0),r),X.depth=B.depth,X.height=B.height,A.push({type:"elem",elem:X,shift:P})}for(o=0,J=0;o<a||J<G.length;++o,++J){for(var ie=G[J]||{},ce=!0;ie.type==="separator";){if(ce||(re=U.makeSpan(["arraycolsep"],[]),re.style.width=se(r.fontMetrics().doubleRuleSep),K.push(re)),ie.separator==="|"||ie.separator===":"){var ve=ie.separator==="|"?"solid":"dashed",q=U.makeSpan(["vertical-separator"],[],r);q.style.height=se(x),q.style.borderRightWidth=se(f),q.style.borderRightStyle=ve,q.style.margin="0 "+se(-f/2);var R=x-V;R&&(q.style.verticalAlign=se(-R)),K.push(q)}else throw new te("Invalid separator type: "+ie.separator);J++,ie=G[J]||{},ce=!1}if(!(o>=a)){var j=void 0;(o>0||e.hskipBeforeAndAfter)&&(j=de.deflt(ie.pregap,_),j!==0&&(re=U.makeSpan(["arraycolsep"],[]),re.style.width=se(j),K.push(re)));var Z=[];for(i=0;i<s;++i){var ne=l[i],oe=ne[o];if(oe){var Ee=ne.pos-V;oe.depth=ne.depth,oe.height=ne.height,Z.push({type:"elem",elem:oe,shift:Ee})}}Z=U.makeVList({positionType:"individualShift",children:Z},r),Z=U.makeSpan(["col-align-"+(ie.align||"c")],[Z]),K.push(Z),(o<a-1||e.hskipBeforeAndAfter)&&(j=de.deflt(ie.postgap,_),j!==0&&(re=U.makeSpan(["arraycolsep"],[]),re.style.width=se(j),K.push(re)))}}if(l=U.makeSpan(["mtable"],K),c.length>0){for(var He=U.makeLineSpan("hline",r,f),Fe=U.makeLineSpan("hdashline",r,f),it=[{type:"elem",elem:l,shift:0}];c.length>0;){var xe=c.pop(),Dr=xe.pos-V;xe.isDashed?it.push({type:"elem",elem:Fe,shift:Dr}):it.push({type:"elem",elem:He,shift:Dr})}l=U.makeVList({positionType:"individualShift",children:it},r)}if(A.length===0)return U.makeSpan(["mord"],[l],r);var Zr=U.makeVList({positionType:"individualShift",children:A},r);return Zr=U.makeSpan(["tag"],[Zr],r),U.makeFragment([l,Zr])},kb={c:"center ",l:"left ",r:"right "},dr=function(e,r){for(var i=[],o=new Q.MathNode("mtd",[],["mtr-glue"]),s=new Q.MathNode("mtd",[],["mml-eqn-num"]),n=0;n<e.body.length;n++){for(var a=e.body[n],l=[],c=0;c<a.length;c++)l.push(new Q.MathNode("mtd",[Ie(a[c],r)]));e.tags&&e.tags[n]&&(l.unshift(o),l.push(o),e.leqno?l.unshift(s):l.push(s)),i.push(new Q.MathNode("mtr",l))}var f=new Q.MathNode("mtable",i),m=e.arraystretch===.5?.1:.16+e.arraystretch-1+(e.addJot?.09:0);f.setAttribute("rowspacing",se(m));var _="",g="";if(e.cols&&e.cols.length>0){var h=e.cols,d="",u=!1,p=0,v=h.length;h[0].type==="separator"&&(_+="top ",p=1),h[h.length-1].type==="separator"&&(_+="bottom ",v-=1);for(var x=p;x<v;x++)h[x].type==="align"?(g+=kb[h[x].align],u&&(d+="none "),u=!0):h[x].type==="separator"&&u&&(d+=h[x].separator==="|"?"solid ":"dashed ",u=!1);f.setAttribute("columnalign",g.trim()),/[sd]/.test(d)&&f.setAttribute("columnlines",d.trim())}if(e.colSeparationType==="align"){for(var S=e.cols||[],C="",y=1;y<S.length;y++)C+=y%2?"0em ":"1em ";f.setAttribute("columnspacing",C.trim())}else e.colSeparationType==="alignat"||e.colSeparationType==="gather"?f.setAttribute("columnspacing","0em"):e.colSeparationType==="small"?f.setAttribute("columnspacing","0.2778em"):e.colSeparationType==="CD"?f.setAttribute("columnspacing","0.5em"):f.setAttribute("columnspacing","1em");var k="",D=e.hLinesBeforeRow;_+=D[0].length>0?"left ":"",_+=D[D.length-1].length>0?"right ":"";for(var $=1;$<D.length-1;$++)k+=D[$].length===0?"none ":D[$][0]?"dashed ":"solid ";return/[sd]/.test(k)&&f.setAttribute("rowlines",k.trim()),_!==""&&(f=new Q.MathNode("menclose",[f]),f.setAttribute("notation",_.trim())),e.arraystretch&&e.arraystretch<1&&(f=new Q.MathNode("mstyle",[f]),f.setAttribute("scriptlevel","1")),f},Kd=function(e,r){e.envName.indexOf("ed")===-1&&xn(e);var i=[],o=e.envName.indexOf("at")>-1?"alignat":"align",s=e.envName==="split",n=Yr(e.parser,{cols:i,addJot:!0,autoTag:s?void 0:xl(e.envName),emptySingleRow:!0,colSeparationType:o,maxNumCols:s?2:void 0,leqno:e.parser.settings.leqno},"display"),a,l=0,c={type:"ordgroup",mode:e.mode,body:[]};if(r[0]&&r[0].type==="ordgroup"){for(var f="",m=0;m<r[0].body.length;m++){var _=Ce(r[0].body[m],"textord");f+=_.text}a=Number(f),l=a*2}var g=!l;n.body.forEach(function(p){for(var v=1;v<p.length;v+=2){var x=Ce(p[v],"styling"),S=Ce(x.body[0],"ordgroup");S.body.unshift(c)}if(g)l<p.length&&(l=p.length);else{var C=p.length/2;if(a<C)throw new te("Too many math in a row: "+("expected "+a+", but got "+C),p[0])}});for(var h=0;h<l;++h){var d="r",u=0;h%2===1?d="l":h>0&&g&&(u=1),i[h]={type:"align",align:d,pregap:u,postgap:0}}return n.colSeparationType=g?"align":"alignat",n};hr({type:"array",names:["array","darray"],props:{numArgs:1},handler(t,e){var r=_n(e[0]),i=r?[e[0]]:Ce(e[0],"ordgroup").body,o=i.map(function(n){var a=vl(n),l=a.text;if("lcr".indexOf(l)!==-1)return{type:"align",align:l};if(l==="|")return{type:"separator",separator:"|"};if(l===":")return{type:"separator",separator:":"};throw new te("Unknown column alignment: "+l,n)}),s={cols:o,hskipBeforeAndAfter:!0,maxNumCols:o.length};return Yr(t.parser,s,Sl(t.envName))},htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix","matrix*","pmatrix*","bmatrix*","Bmatrix*","vmatrix*","Vmatrix*"],props:{numArgs:0},handler(t){var e={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[t.envName.replace("*","")],r="c",i={hskipBeforeAndAfter:!1,cols:[{type:"align",align:r}]};if(t.envName.charAt(t.envName.length-1)==="*"){var o=t.parser;if(o.consumeSpaces(),o.fetch().text==="["){if(o.consume(),o.consumeSpaces(),r=o.fetch().text,"lcr".indexOf(r)===-1)throw new te("Expected l or c or r",o.nextToken);o.consume(),o.consumeSpaces(),o.expect("]"),o.consume(),i.cols=[{type:"align",align:r}]}}var s=Yr(t.parser,i,Sl(t.envName)),n=Math.max(0,...s.body.map(a=>a.length));return s.cols=new Array(n).fill({type:"align",align:r}),e?{type:"leftright",mode:t.mode,body:[s],left:e[0],right:e[1],rightColor:void 0}:s},htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["smallmatrix"],props:{numArgs:0},handler(t){var e={arraystretch:.5},r=Yr(t.parser,e,"script");return r.colSeparationType="small",r},htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["subarray"],props:{numArgs:1},handler(t,e){var r=_n(e[0]),i=r?[e[0]]:Ce(e[0],"ordgroup").body,o=i.map(function(n){var a=vl(n),l=a.text;if("lc".indexOf(l)!==-1)return{type:"align",align:l};throw new te("Unknown column alignment: "+l,n)});if(o.length>1)throw new te("{subarray} can contain only one column");var s={cols:o,hskipBeforeAndAfter:!1,arraystretch:.5};if(s=Yr(t.parser,s,"script"),s.body.length>0&&s.body[0].length>1)throw new te("{subarray} can contain only one column");return s},htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["cases","dcases","rcases","drcases"],props:{numArgs:0},handler(t){var e={arraystretch:1.2,cols:[{type:"align",align:"l",pregap:0,postgap:1},{type:"align",align:"l",pregap:0,postgap:0}]},r=Yr(t.parser,e,Sl(t.envName));return{type:"leftright",mode:t.mode,body:[r],left:t.envName.indexOf("r")>-1?".":"\\{",right:t.envName.indexOf("r")>-1?"\\}":".",rightColor:void 0}},htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["align","align*","aligned","split"],props:{numArgs:0},handler:Kd,htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["gathered","gather","gather*"],props:{numArgs:0},handler(t){de.contains(["gather","gather*"],t.envName)&&xn(t);var e={cols:[{type:"align",align:"c"}],addJot:!0,colSeparationType:"gather",autoTag:xl(t.envName),emptySingleRow:!0,leqno:t.parser.settings.leqno};return Yr(t.parser,e,"display")},htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["alignat","alignat*","alignedat"],props:{numArgs:1},handler:Kd,htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["equation","equation*"],props:{numArgs:0},handler(t){xn(t);var e={autoTag:xl(t.envName),emptySingleRow:!0,singleRow:!0,maxNumCols:1,leqno:t.parser.settings.leqno};return Yr(t.parser,e,"display")},htmlBuilder:ur,mathmlBuilder:dr});hr({type:"array",names:["CD"],props:{numArgs:0},handler(t){return xn(t),hb(t.parser)},htmlBuilder:ur,mathmlBuilder:dr});M("\\nonumber","\\gdef\\@eqnsw{0}");M("\\notag","\\nonumber");ae({type:"text",names:["\\hline","\\hdashline"],props:{numArgs:0,allowedInText:!0,allowedInMath:!0},handler(t,e){throw new te(t.funcName+" valid only within array environment")}});var Qu=jd;ae({type:"environment",names:["\\begin","\\end"],props:{numArgs:1,argTypes:["text"]},handler(t,e){var{parser:r,funcName:i}=t,o=e[0];if(o.type!=="ordgroup")throw new te("Invalid environment name",o);for(var s="",n=0;n<o.body.length;++n)s+=Ce(o.body[n],"textord").text;if(i==="\\begin"){if(!Qu.hasOwnProperty(s))throw new te("No such environment: "+s,o);var a=Qu[s],{args:l,optArgs:c}=r.parseArguments("\\begin{"+s+"}",a),f={mode:r.mode,envName:s,parser:r},m=a.handler(f,l,c);r.expect("\\end",!1);var _=r.nextToken,g=Ce(r.parseFunction(),"environment");if(g.name!==s)throw new te("Mismatch: \\begin{"+s+"} matched by \\end{"+g.name+"}",_);return m}return{type:"environment",mode:r.mode,name:s,nameGroup:o}}});var Xd=(t,e)=>{var r=t.font,i=e.withFont(r);return Re(t.body,i)},Yd=(t,e)=>{var r=t.font,i=e.withFont(r);return Ie(t.body,i)},ed={"\\Bbb":"\\mathbb","\\bold":"\\mathbf","\\frak":"\\mathfrak","\\bm":"\\boldsymbol"};ae({type:"font",names:["\\mathrm","\\mathit","\\mathbf","\\mathnormal","\\mathsfit","\\mathbb","\\mathcal","\\mathfrak","\\mathscr","\\mathsf","\\mathtt","\\Bbb","\\bold","\\frak"],props:{numArgs:1,allowedInArgument:!0},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=fn(e[0]),s=i;return s in ed&&(s=ed[s]),{type:"font",mode:r.mode,font:s.slice(1),body:o}},htmlBuilder:Xd,mathmlBuilder:Yd});ae({type:"mclass",names:["\\boldsymbol","\\bm"],props:{numArgs:1},handler:(t,e)=>{var{parser:r}=t,i=e[0],o=de.isCharacterBox(i);return{type:"mclass",mode:r.mode,mclass:yn(i),body:[{type:"font",mode:r.mode,font:"boldsymbol",body:i}],isCharacterBox:o}}});ae({type:"font",names:["\\rm","\\sf","\\tt","\\bf","\\it","\\cal"],props:{numArgs:0,allowedInText:!0},handler:(t,e)=>{var{parser:r,funcName:i,breakOnTokenText:o}=t,{mode:s}=r,n=r.parseExpression(!0,o),a="math"+i.slice(1);return{type:"font",mode:s,font:a,body:{type:"ordgroup",mode:r.mode,body:n}}},htmlBuilder:Xd,mathmlBuilder:Yd});var Zd=(t,e)=>{var r=e;return t==="display"?r=r.id>=ge.SCRIPT.id?r.text():ge.DISPLAY:t==="text"&&r.size===ge.DISPLAY.size?r=ge.TEXT:t==="script"?r=ge.SCRIPT:t==="scriptscript"&&(r=ge.SCRIPTSCRIPT),r},kl=(t,e)=>{var r=Zd(t.size,e.style),i=r.fracNum(),o=r.fracDen(),s;s=e.havingStyle(i);var n=Re(t.numer,s,e);if(t.continued){var a=8.5/e.fontMetrics().ptPerEm,l=3.5/e.fontMetrics().ptPerEm;n.height=n.height<a?a:n.height,n.depth=n.depth<l?l:n.depth}s=e.havingStyle(o);var c=Re(t.denom,s,e),f,m,_;t.hasBarLine?(t.barSize?(m=Ge(t.barSize,e),f=U.makeLineSpan("frac-line",e,m)):f=U.makeLineSpan("frac-line",e),m=f.height,_=f.height):(f=null,m=0,_=e.fontMetrics().defaultRuleThickness);var g,h,d;r.size===ge.DISPLAY.size||t.size==="display"?(g=e.fontMetrics().num1,m>0?h=3*_:h=7*_,d=e.fontMetrics().denom1):(m>0?(g=e.fontMetrics().num2,h=_):(g=e.fontMetrics().num3,h=3*_),d=e.fontMetrics().denom2);var u;if(f){var v=e.fontMetrics().axisHeight;g-n.depth-(v+.5*m)<h&&(g+=h-(g-n.depth-(v+.5*m))),v-.5*m-(c.height-d)<h&&(d+=h-(v-.5*m-(c.height-d)));var x=-(v-.5*m);u=U.makeVList({positionType:"individualShift",children:[{type:"elem",elem:c,shift:d},{type:"elem",elem:f,shift:x},{type:"elem",elem:n,shift:-g}]},e)}else{var p=g-n.depth-(c.height-d);p<h&&(g+=.5*(h-p),d+=.5*(h-p)),u=U.makeVList({positionType:"individualShift",children:[{type:"elem",elem:c,shift:d},{type:"elem",elem:n,shift:-g}]},e)}s=e.havingStyle(r),u.height*=s.sizeMultiplier/e.sizeMultiplier,u.depth*=s.sizeMultiplier/e.sizeMultiplier;var S;r.size===ge.DISPLAY.size?S=e.fontMetrics().delim1:r.size===ge.SCRIPTSCRIPT.size?S=e.havingStyle(ge.SCRIPT).fontMetrics().delim2:S=e.fontMetrics().delim2;var C,y;return t.leftDelim==null?C=Us(e,["mopen"]):C=Er.customSizedDelim(t.leftDelim,S,!0,e.havingStyle(r),t.mode,["mopen"]),t.continued?y=U.makeSpan([]):t.rightDelim==null?y=Us(e,["mclose"]):y=Er.customSizedDelim(t.rightDelim,S,!0,e.havingStyle(r),t.mode,["mclose"]),U.makeSpan(["mord"].concat(s.sizingClasses(e)),[C,U.makeSpan(["mfrac"],[u]),y],e)},Cl=(t,e)=>{var r=new Q.MathNode("mfrac",[Ie(t.numer,e),Ie(t.denom,e)]);if(!t.hasBarLine)r.setAttribute("linethickness","0px");else if(t.barSize){var i=Ge(t.barSize,e);r.setAttribute("linethickness",se(i))}var o=Zd(t.size,e.style);if(o.size!==e.style.size){r=new Q.MathNode("mstyle",[r]);var s=o.size===ge.DISPLAY.size?"true":"false";r.setAttribute("displaystyle",s),r.setAttribute("scriptlevel","0")}if(t.leftDelim!=null||t.rightDelim!=null){var n=[];if(t.leftDelim!=null){var a=new Q.MathNode("mo",[new Q.TextNode(t.leftDelim.replace("\\",""))]);a.setAttribute("fence","true"),n.push(a)}if(n.push(r),t.rightDelim!=null){var l=new Q.MathNode("mo",[new Q.TextNode(t.rightDelim.replace("\\",""))]);l.setAttribute("fence","true"),n.push(l)}return ml(n)}return r};ae({type:"genfrac",names:["\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom","\\\\atopfrac","\\\\bracefrac","\\\\brackfrac"],props:{numArgs:2,allowedInArgument:!0},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=e[0],s=e[1],n,a=null,l=null,c="auto";switch(i){case"\\dfrac":case"\\frac":case"\\tfrac":n=!0;break;case"\\\\atopfrac":n=!1;break;case"\\dbinom":case"\\binom":case"\\tbinom":n=!1,a="(",l=")";break;case"\\\\bracefrac":n=!1,a="\\{",l="\\}";break;case"\\\\brackfrac":n=!1,a="[",l="]";break;default:throw new Error("Unrecognized genfrac command")}switch(i){case"\\dfrac":case"\\dbinom":c="display";break;case"\\tfrac":case"\\tbinom":c="text";break}return{type:"genfrac",mode:r.mode,continued:!1,numer:o,denom:s,hasBarLine:n,leftDelim:a,rightDelim:l,size:c,barSize:null}},htmlBuilder:kl,mathmlBuilder:Cl});ae({type:"genfrac",names:["\\cfrac"],props:{numArgs:2},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=e[0],s=e[1];return{type:"genfrac",mode:r.mode,continued:!0,numer:o,denom:s,hasBarLine:!0,leftDelim:null,rightDelim:null,size:"display",barSize:null}}});ae({type:"infix",names:["\\over","\\choose","\\atop","\\brace","\\brack"],props:{numArgs:0,infix:!0},handler(t){var{parser:e,funcName:r,token:i}=t,o;switch(r){case"\\over":o="\\frac";break;case"\\choose":o="\\binom";break;case"\\atop":o="\\\\atopfrac";break;case"\\brace":o="\\\\bracefrac";break;case"\\brack":o="\\\\brackfrac";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",mode:e.mode,replaceWith:o,token:i}}});var td=["display","text","script","scriptscript"],rd=function(e){var r=null;return e.length>0&&(r=e,r=r==="."?null:r),r};ae({type:"genfrac",names:["\\genfrac"],props:{numArgs:6,allowedInArgument:!0,argTypes:["math","math","size","text","math","math"]},handler(t,e){var{parser:r}=t,i=e[4],o=e[5],s=fn(e[0]),n=s.type==="atom"&&s.family==="open"?rd(s.text):null,a=fn(e[1]),l=a.type==="atom"&&a.family==="close"?rd(a.text):null,c=Ce(e[2],"size"),f,m=null;c.isBlank?f=!0:(m=c.value,f=m.number>0);var _="auto",g=e[3];if(g.type==="ordgroup"){if(g.body.length>0){var h=Ce(g.body[0],"textord");_=td[Number(h.text)]}}else g=Ce(g,"textord"),_=td[Number(g.text)];return{type:"genfrac",mode:r.mode,numer:i,denom:o,continued:!1,hasBarLine:f,barSize:m,leftDelim:n,rightDelim:l,size:_}},htmlBuilder:kl,mathmlBuilder:Cl});ae({type:"infix",names:["\\above"],props:{numArgs:1,argTypes:["size"],infix:!0},handler(t,e){var{parser:r,funcName:i,token:o}=t;return{type:"infix",mode:r.mode,replaceWith:"\\\\abovefrac",size:Ce(e[0],"size").value,token:o}}});ae({type:"genfrac",names:["\\\\abovefrac"],props:{numArgs:3,argTypes:["math","size","math"]},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=e[0],s=rv(Ce(e[1],"infix").size),n=e[2],a=s.number>0;return{type:"genfrac",mode:r.mode,numer:o,denom:n,continued:!1,hasBarLine:a,barSize:s,leftDelim:null,rightDelim:null,size:"auto"}},htmlBuilder:kl,mathmlBuilder:Cl});var Jd=(t,e)=>{var r=e.style,i,o;t.type==="supsub"?(i=t.sup?Re(t.sup,e.havingStyle(r.sup()),e):Re(t.sub,e.havingStyle(r.sub()),e),o=Ce(t.base,"horizBrace")):o=Ce(t,"horizBrace");var s=Re(o.base,e.havingBaseStyle(ge.DISPLAY)),n=Tr.svgSpan(o,e),a;if(o.isOver?(a=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:s},{type:"kern",size:.1},{type:"elem",elem:n}]},e),a.children[0].children[0].children[1].classes.push("svg-align")):(a=U.makeVList({positionType:"bottom",positionData:s.depth+.1+n.height,children:[{type:"elem",elem:n},{type:"kern",size:.1},{type:"elem",elem:s}]},e),a.children[0].children[0].children[0].classes.push("svg-align")),i){var l=U.makeSpan(["mord",o.isOver?"mover":"munder"],[a],e);o.isOver?a=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:l},{type:"kern",size:.2},{type:"elem",elem:i}]},e):a=U.makeVList({positionType:"bottom",positionData:l.depth+.2+i.height+i.depth,children:[{type:"elem",elem:i},{type:"kern",size:.2},{type:"elem",elem:l}]},e)}return U.makeSpan(["mord",o.isOver?"mover":"munder"],[a],e)},Cb=(t,e)=>{var r=Tr.mathMLnode(t.label);return new Q.MathNode(t.isOver?"mover":"munder",[Ie(t.base,e),r])};ae({type:"horizBrace",names:["\\overbrace","\\underbrace"],props:{numArgs:1},handler(t,e){var{parser:r,funcName:i}=t;return{type:"horizBrace",mode:r.mode,label:i,isOver:/^\\over/.test(i),base:e[0]}},htmlBuilder:Jd,mathmlBuilder:Cb});ae({type:"href",names:["\\href"],props:{numArgs:2,argTypes:["url","original"],allowedInText:!0},handler:(t,e)=>{var{parser:r}=t,i=e[1],o=Ce(e[0],"url").url;return r.settings.isTrusted({command:"\\href",url:o})?{type:"href",mode:r.mode,href:o,body:Ye(i)}:r.formatUnsupportedCmd("\\href")},htmlBuilder:(t,e)=>{var r=rt(t.body,e,!1);return U.makeAnchor(t.href,[],r,e)},mathmlBuilder:(t,e)=>{var r=Xr(t.body,e);return r instanceof bt||(r=new bt("mrow",[r])),r.setAttribute("href",t.href),r}});ae({type:"href",names:["\\url"],props:{numArgs:1,argTypes:["url"],allowedInText:!0},handler:(t,e)=>{var{parser:r}=t,i=Ce(e[0],"url").url;if(!r.settings.isTrusted({command:"\\url",url:i}))return r.formatUnsupportedCmd("\\url");for(var o=[],s=0;s<i.length;s++){var n=i[s];n==="~"&&(n="\\textasciitilde"),o.push({type:"textord",mode:"text",text:n})}var a={type:"text",mode:r.mode,font:"\\texttt",body:o};return{type:"href",mode:r.mode,href:i,body:Ye(a)}}});ae({type:"hbox",names:["\\hbox"],props:{numArgs:1,argTypes:["text"],allowedInText:!0,primitive:!0},handler(t,e){var{parser:r}=t;return{type:"hbox",mode:r.mode,body:Ye(e[0])}},htmlBuilder(t,e){var r=rt(t.body,e,!1);return U.makeFragment(r)},mathmlBuilder(t,e){return new Q.MathNode("mrow",At(t.body,e))}});ae({type:"html",names:["\\htmlClass","\\htmlId","\\htmlStyle","\\htmlData"],props:{numArgs:2,argTypes:["raw","original"],allowedInText:!0},handler:(t,e)=>{var{parser:r,funcName:i,token:o}=t,s=Ce(e[0],"raw").string,n=e[1];r.settings.strict&&r.settings.reportNonstrict("htmlExtension","HTML extension is disabled on strict mode");var a,l={};switch(i){case"\\htmlClass":l.class=s,a={command:"\\htmlClass",class:s};break;case"\\htmlId":l.id=s,a={command:"\\htmlId",id:s};break;case"\\htmlStyle":l.style=s,a={command:"\\htmlStyle",style:s};break;case"\\htmlData":{for(var c=s.split(","),f=0;f<c.length;f++){var m=c[f].split("=");if(m.length!==2)throw new te("Error parsing key-value for \\htmlData");l["data-"+m[0].trim()]=m[1].trim()}a={command:"\\htmlData",attributes:l};break}default:throw new Error("Unrecognized html command")}return r.settings.isTrusted(a)?{type:"html",mode:r.mode,attributes:l,body:Ye(n)}:r.formatUnsupportedCmd(i)},htmlBuilder:(t,e)=>{var r=rt(t.body,e,!1),i=["enclosing"];t.attributes.class&&i.push(...t.attributes.class.trim().split(/\s+/));var o=U.makeSpan(i,r,e);for(var s in t.attributes)s!=="class"&&t.attributes.hasOwnProperty(s)&&o.setAttribute(s,t.attributes[s]);return o},mathmlBuilder:(t,e)=>Xr(t.body,e)});ae({type:"htmlmathml",names:["\\html@mathml"],props:{numArgs:2,allowedInText:!0},handler:(t,e)=>{var{parser:r}=t;return{type:"htmlmathml",mode:r.mode,html:Ye(e[0]),mathml:Ye(e[1])}},htmlBuilder:(t,e)=>{var r=rt(t.html,e,!1);return U.makeFragment(r)},mathmlBuilder:(t,e)=>Xr(t.mathml,e)});var Ya=function(e){if(/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))return{number:+e,unit:"bp"};var r=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);if(!r)throw new te("Invalid size: '"+e+"' in \\includegraphics");var i={number:+(r[1]+r[2]),unit:r[3]};if(!vd(i))throw new te("Invalid unit: '"+i.unit+"' in \\includegraphics.");return i};ae({type:"includegraphics",names:["\\includegraphics"],props:{numArgs:1,numOptionalArgs:1,argTypes:["raw","url"],allowedInText:!1},handler:(t,e,r)=>{var{parser:i}=t,o={number:0,unit:"em"},s={number:.9,unit:"em"},n={number:0,unit:"em"},a="";if(r[0])for(var l=Ce(r[0],"raw").string,c=l.split(","),f=0;f<c.length;f++){var m=c[f].split("=");if(m.length===2){var _=m[1].trim();switch(m[0].trim()){case"alt":a=_;break;case"width":o=Ya(_);break;case"height":s=Ya(_);break;case"totalheight":n=Ya(_);break;default:throw new te("Invalid key: '"+m[0]+"' in \\includegraphics.")}}}var g=Ce(e[0],"url").url;return a===""&&(a=g,a=a.replace(/^.*[\\/]/,""),a=a.substring(0,a.lastIndexOf("."))),i.settings.isTrusted({command:"\\includegraphics",url:g})?{type:"includegraphics",mode:i.mode,alt:a,width:o,height:s,totalheight:n,src:g}:i.formatUnsupportedCmd("\\includegraphics")},htmlBuilder:(t,e)=>{var r=Ge(t.height,e),i=0;t.totalheight.number>0&&(i=Ge(t.totalheight,e)-r);var o=0;t.width.number>0&&(o=Ge(t.width,e));var s={height:se(r+i)};o>0&&(s.width=se(o)),i>0&&(s.verticalAlign=se(-i));var n=new rl(t.src,t.alt,s);return n.height=r,n.depth=i,n},mathmlBuilder:(t,e)=>{var r=new Q.MathNode("mglyph",[]);r.setAttribute("alt",t.alt);var i=Ge(t.height,e),o=0;if(t.totalheight.number>0&&(o=Ge(t.totalheight,e)-i,r.setAttribute("valign",se(-o))),r.setAttribute("height",se(i+o)),t.width.number>0){var s=Ge(t.width,e);r.setAttribute("width",se(s))}return r.setAttribute("src",t.src),r}});ae({type:"kern",names:["\\kern","\\mkern","\\hskip","\\mskip"],props:{numArgs:1,argTypes:["size"],primitive:!0,allowedInText:!0},handler(t,e){var{parser:r,funcName:i}=t,o=Ce(e[0],"size");if(r.settings.strict){var s=i[1]==="m",n=o.value.unit==="mu";s?(n||r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+i+" supports only mu units, "+("not "+o.value.unit+" units")),r.mode!=="math"&&r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+i+" works only in math mode")):n&&r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+i+" doesn't support mu units")}return{type:"kern",mode:r.mode,dimension:o.value}},htmlBuilder(t,e){return U.makeGlue(t.dimension,e)},mathmlBuilder(t,e){var r=Ge(t.dimension,e);return new Q.SpaceNode(r)}});ae({type:"lap",names:["\\mathllap","\\mathrlap","\\mathclap"],props:{numArgs:1,allowedInText:!0},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=e[0];return{type:"lap",mode:r.mode,alignment:i.slice(5),body:o}},htmlBuilder:(t,e)=>{var r;t.alignment==="clap"?(r=U.makeSpan([],[Re(t.body,e)]),r=U.makeSpan(["inner"],[r],e)):r=U.makeSpan(["inner"],[Re(t.body,e)]);var i=U.makeSpan(["fix"],[]),o=U.makeSpan([t.alignment],[r,i],e),s=U.makeSpan(["strut"]);return s.style.height=se(o.height+o.depth),o.depth&&(s.style.verticalAlign=se(-o.depth)),o.children.unshift(s),o=U.makeSpan(["thinbox"],[o],e),U.makeSpan(["mord","vbox"],[o],e)},mathmlBuilder:(t,e)=>{var r=new Q.MathNode("mpadded",[Ie(t.body,e)]);if(t.alignment!=="rlap"){var i=t.alignment==="llap"?"-1":"-0.5";r.setAttribute("lspace",i+"width")}return r.setAttribute("width","0px"),r}});ae({type:"styling",names:["\\(","$"],props:{numArgs:0,allowedInText:!0,allowedInMath:!1},handler(t,e){var{funcName:r,parser:i}=t,o=i.mode;i.switchMode("math");var s=r==="\\("?"\\)":"$",n=i.parseExpression(!1,s);return i.expect(s),i.switchMode(o),{type:"styling",mode:i.mode,style:"text",body:n}}});ae({type:"text",names:["\\)","\\]"],props:{numArgs:0,allowedInText:!0,allowedInMath:!1},handler(t,e){throw new te("Mismatched "+t.funcName)}});var id=(t,e)=>{switch(e.style.size){case ge.DISPLAY.size:return t.display;case ge.TEXT.size:return t.text;case ge.SCRIPT.size:return t.script;case ge.SCRIPTSCRIPT.size:return t.scriptscript;default:return t.text}};ae({type:"mathchoice",names:["\\mathchoice"],props:{numArgs:4,primitive:!0},handler:(t,e)=>{var{parser:r}=t;return{type:"mathchoice",mode:r.mode,display:Ye(e[0]),text:Ye(e[1]),script:Ye(e[2]),scriptscript:Ye(e[3])}},htmlBuilder:(t,e)=>{var r=id(t,e),i=rt(r,e,!1);return U.makeFragment(i)},mathmlBuilder:(t,e)=>{var r=id(t,e);return Xr(r,e)}});var Qd=(t,e,r,i,o,s,n)=>{t=U.makeSpan([],[t]);var a=r&&de.isCharacterBox(r),l,c;if(e){var f=Re(e,i.havingStyle(o.sup()),i);c={elem:f,kern:Math.max(i.fontMetrics().bigOpSpacing1,i.fontMetrics().bigOpSpacing3-f.depth)}}if(r){var m=Re(r,i.havingStyle(o.sub()),i);l={elem:m,kern:Math.max(i.fontMetrics().bigOpSpacing2,i.fontMetrics().bigOpSpacing4-m.height)}}var _;if(c&&l){var g=i.fontMetrics().bigOpSpacing5+l.elem.height+l.elem.depth+l.kern+t.depth+n;_=U.makeVList({positionType:"bottom",positionData:g,children:[{type:"kern",size:i.fontMetrics().bigOpSpacing5},{type:"elem",elem:l.elem,marginLeft:se(-s)},{type:"kern",size:l.kern},{type:"elem",elem:t},{type:"kern",size:c.kern},{type:"elem",elem:c.elem,marginLeft:se(s)},{type:"kern",size:i.fontMetrics().bigOpSpacing5}]},i)}else if(l){var h=t.height-n;_=U.makeVList({positionType:"top",positionData:h,children:[{type:"kern",size:i.fontMetrics().bigOpSpacing5},{type:"elem",elem:l.elem,marginLeft:se(-s)},{type:"kern",size:l.kern},{type:"elem",elem:t}]},i)}else if(c){var d=t.depth+n;_=U.makeVList({positionType:"bottom",positionData:d,children:[{type:"elem",elem:t},{type:"kern",size:c.kern},{type:"elem",elem:c.elem,marginLeft:se(s)},{type:"kern",size:i.fontMetrics().bigOpSpacing5}]},i)}else return t;var u=[_];if(l&&s!==0&&!a){var p=U.makeSpan(["mspace"],[],i);p.style.marginRight=se(s),u.unshift(p)}return U.makeSpan(["mop","op-limits"],u,i)},ep=["\\smallint"],Gi=(t,e)=>{var r,i,o=!1,s;t.type==="supsub"?(r=t.sup,i=t.sub,s=Ce(t.base,"op"),o=!0):s=Ce(t,"op");var n=e.style,a=!1;n.size===ge.DISPLAY.size&&s.symbol&&!de.contains(ep,s.name)&&(a=!0);var l;if(s.symbol){var c=a?"Size2-Regular":"Size1-Regular",f="";if((s.name==="\\oiint"||s.name==="\\oiiint")&&(f=s.name.slice(1),s.name=f==="oiint"?"\\iint":"\\iiint"),l=U.makeSymbol(s.name,c,"math",e,["mop","op-symbol",a?"large-op":"small-op"]),f.length>0){var m=l.italic,_=U.staticSvg(f+"Size"+(a?"2":"1"),e);l=U.makeVList({positionType:"individualShift",children:[{type:"elem",elem:l,shift:0},{type:"elem",elem:_,shift:a?.08:0}]},e),s.name="\\"+f,l.classes.unshift("mop"),l.italic=m}}else if(s.body){var g=rt(s.body,e,!0);g.length===1&&g[0]instanceof Et?(l=g[0],l.classes[0]="mop"):l=U.makeSpan(["mop"],g,e)}else{for(var h=[],d=1;d<s.name.length;d++)h.push(U.mathsym(s.name[d],s.mode,e));l=U.makeSpan(["mop"],h,e)}var u=0,p=0;return(l instanceof Et||s.name==="\\oiint"||s.name==="\\oiiint")&&!s.suppressBaseShift&&(u=(l.height-l.depth)/2-e.fontMetrics().axisHeight,p=l.italic),o?Qd(l,r,i,e,n,p,u):(u&&(l.style.position="relative",l.style.top=se(u)),l)},Ws=(t,e)=>{var r;if(t.symbol)r=new bt("mo",[jt(t.name,t.mode)]),de.contains(ep,t.name)&&r.setAttribute("largeop","false");else if(t.body)r=new bt("mo",At(t.body,e));else{r=new bt("mi",[new Ut(t.name.slice(1))]);var i=new bt("mo",[jt("\u2061","text")]);t.parentIsSupSub?r=new bt("mrow",[r,i]):r=Td([r,i])}return r},Eb={"\u220F":"\\prod","\u2210":"\\coprod","\u2211":"\\sum","\u22C0":"\\bigwedge","\u22C1":"\\bigvee","\u22C2":"\\bigcap","\u22C3":"\\bigcup","\u2A00":"\\bigodot","\u2A01":"\\bigoplus","\u2A02":"\\bigotimes","\u2A04":"\\biguplus","\u2A06":"\\bigsqcup"};ae({type:"op",names:["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint","\u220F","\u2210","\u2211","\u22C0","\u22C1","\u22C2","\u22C3","\u2A00","\u2A01","\u2A02","\u2A04","\u2A06"],props:{numArgs:0},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=i;return o.length===1&&(o=Eb[o]),{type:"op",mode:r.mode,limits:!0,parentIsSupSub:!1,symbol:!0,name:o}},htmlBuilder:Gi,mathmlBuilder:Ws});ae({type:"op",names:["\\mathop"],props:{numArgs:1,primitive:!0},handler:(t,e)=>{var{parser:r}=t,i=e[0];return{type:"op",mode:r.mode,limits:!1,parentIsSupSub:!1,symbol:!1,body:Ye(i)}},htmlBuilder:Gi,mathmlBuilder:Ws});var Ab={"\u222B":"\\int","\u222C":"\\iint","\u222D":"\\iiint","\u222E":"\\oint","\u222F":"\\oiint","\u2230":"\\oiiint"};ae({type:"op",names:["\\arcsin","\\arccos","\\arctan","\\arctg","\\arcctg","\\arg","\\ch","\\cos","\\cosec","\\cosh","\\cot","\\cotg","\\coth","\\csc","\\ctg","\\cth","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\sh","\\tan","\\tanh","\\tg","\\th"],props:{numArgs:0},handler(t){var{parser:e,funcName:r}=t;return{type:"op",mode:e.mode,limits:!1,parentIsSupSub:!1,symbol:!1,name:r}},htmlBuilder:Gi,mathmlBuilder:Ws});ae({type:"op",names:["\\det","\\gcd","\\inf","\\lim","\\max","\\min","\\Pr","\\sup"],props:{numArgs:0},handler(t){var{parser:e,funcName:r}=t;return{type:"op",mode:e.mode,limits:!0,parentIsSupSub:!1,symbol:!1,name:r}},htmlBuilder:Gi,mathmlBuilder:Ws});ae({type:"op",names:["\\int","\\iint","\\iiint","\\oint","\\oiint","\\oiiint","\u222B","\u222C","\u222D","\u222E","\u222F","\u2230"],props:{numArgs:0},handler(t){var{parser:e,funcName:r}=t,i=r;return i.length===1&&(i=Ab[i]),{type:"op",mode:e.mode,limits:!1,parentIsSupSub:!1,symbol:!0,name:i}},htmlBuilder:Gi,mathmlBuilder:Ws});var tp=(t,e)=>{var r,i,o=!1,s;t.type==="supsub"?(r=t.sup,i=t.sub,s=Ce(t.base,"operatorname"),o=!0):s=Ce(t,"operatorname");var n;if(s.body.length>0){for(var a=s.body.map(m=>{var _=m.text;return typeof _=="string"?{type:"textord",mode:m.mode,text:_}:m}),l=rt(a,e.withFont("mathrm"),!0),c=0;c<l.length;c++){var f=l[c];f instanceof Et&&(f.text=f.text.replace(/\u2212/,"-").replace(/\u2217/,"*"))}n=U.makeSpan(["mop"],l,e)}else n=U.makeSpan(["mop"],[],e);return o?Qd(n,r,i,e,e.style,0,0):n},Tb=(t,e)=>{for(var r=At(t.body,e.withFont("mathrm")),i=!0,o=0;o<r.length;o++){var s=r[o];if(!(s instanceof Q.SpaceNode))if(s instanceof Q.MathNode)switch(s.type){case"mi":case"mn":case"ms":case"mspace":case"mtext":break;case"mo":{var n=s.children[0];s.children.length===1&&n instanceof Q.TextNode?n.text=n.text.replace(/\u2212/,"-").replace(/\u2217/,"*"):i=!1;break}default:i=!1}else i=!1}if(i){var a=r.map(f=>f.toText()).join("");r=[new Q.TextNode(a)]}var l=new Q.MathNode("mi",r);l.setAttribute("mathvariant","normal");var c=new Q.MathNode("mo",[jt("\u2061","text")]);return t.parentIsSupSub?new Q.MathNode("mrow",[l,c]):Q.newDocumentFragment([l,c])};ae({type:"operatorname",names:["\\operatorname@","\\operatornamewithlimits"],props:{numArgs:1},handler:(t,e)=>{var{parser:r,funcName:i}=t,o=e[0];return{type:"operatorname",mode:r.mode,body:Ye(o),alwaysHandleSupSub:i==="\\operatornamewithlimits",limits:!1,parentIsSupSub:!1}},htmlBuilder:tp,mathmlBuilder:Tb});M("\\operatorname","\\@ifstar\\operatornamewithlimits\\operatorname@");bi({type:"ordgroup",htmlBuilder(t,e){return t.semisimple?U.makeFragment(rt(t.body,e,!1)):U.makeSpan(["mord"],rt(t.body,e,!0),e)},mathmlBuilder(t,e){return Xr(t.body,e,!0)}});ae({type:"overline",names:["\\overline"],props:{numArgs:1},handler(t,e){var{parser:r}=t,i=e[0];return{type:"overline",mode:r.mode,body:i}},htmlBuilder(t,e){var r=Re(t.body,e.havingCrampedStyle()),i=U.makeLineSpan("overline-line",e),o=e.fontMetrics().defaultRuleThickness,s=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r},{type:"kern",size:3*o},{type:"elem",elem:i},{type:"kern",size:o}]},e);return U.makeSpan(["mord","overline"],[s],e)},mathmlBuilder(t,e){var r=new Q.MathNode("mo",[new Q.TextNode("\u203E")]);r.setAttribute("stretchy","true");var i=new Q.MathNode("mover",[Ie(t.body,e),r]);return i.setAttribute("accent","true"),i}});ae({type:"phantom",names:["\\phantom"],props:{numArgs:1,allowedInText:!0},handler:(t,e)=>{var{parser:r}=t,i=e[0];return{type:"phantom",mode:r.mode,body:Ye(i)}},htmlBuilder:(t,e)=>{var r=rt(t.body,e.withPhantom(),!1);return U.makeFragment(r)},mathmlBuilder:(t,e)=>{var r=At(t.body,e);return new Q.MathNode("mphantom",r)}});ae({type:"hphantom",names:["\\hphantom"],props:{numArgs:1,allowedInText:!0},handler:(t,e)=>{var{parser:r}=t,i=e[0];return{type:"hphantom",mode:r.mode,body:i}},htmlBuilder:(t,e)=>{var r=U.makeSpan([],[Re(t.body,e.withPhantom())]);if(r.height=0,r.depth=0,r.children)for(var i=0;i<r.children.length;i++)r.children[i].height=0,r.children[i].depth=0;return r=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r}]},e),U.makeSpan(["mord"],[r],e)},mathmlBuilder:(t,e)=>{var r=At(Ye(t.body),e),i=new Q.MathNode("mphantom",r),o=new Q.MathNode("mpadded",[i]);return o.setAttribute("height","0px"),o.setAttribute("depth","0px"),o}});ae({type:"vphantom",names:["\\vphantom"],props:{numArgs:1,allowedInText:!0},handler:(t,e)=>{var{parser:r}=t,i=e[0];return{type:"vphantom",mode:r.mode,body:i}},htmlBuilder:(t,e)=>{var r=U.makeSpan(["inner"],[Re(t.body,e.withPhantom())]),i=U.makeSpan(["fix"],[]);return U.makeSpan(["mord","rlap"],[r,i],e)},mathmlBuilder:(t,e)=>{var r=At(Ye(t.body),e),i=new Q.MathNode("mphantom",r),o=new Q.MathNode("mpadded",[i]);return o.setAttribute("width","0px"),o}});ae({type:"raisebox",names:["\\raisebox"],props:{numArgs:2,argTypes:["size","hbox"],allowedInText:!0},handler(t,e){var{parser:r}=t,i=Ce(e[0],"size").value,o=e[1];return{type:"raisebox",mode:r.mode,dy:i,body:o}},htmlBuilder(t,e){var r=Re(t.body,e),i=Ge(t.dy,e);return U.makeVList({positionType:"shift",positionData:-i,children:[{type:"elem",elem:r}]},e)},mathmlBuilder(t,e){var r=new Q.MathNode("mpadded",[Ie(t.body,e)]),i=t.dy.number+t.dy.unit;return r.setAttribute("voffset",i),r}});ae({type:"internal",names:["\\relax"],props:{numArgs:0,allowedInText:!0,allowedInArgument:!0},handler(t){var{parser:e}=t;return{type:"internal",mode:e.mode}}});ae({type:"rule",names:["\\rule"],props:{numArgs:2,numOptionalArgs:1,allowedInText:!0,allowedInMath:!0,argTypes:["size","size","size"]},handler(t,e,r){var{parser:i}=t,o=r[0],s=Ce(e[0],"size"),n=Ce(e[1],"size");return{type:"rule",mode:i.mode,shift:o&&Ce(o,"size").value,width:s.value,height:n.value}},htmlBuilder(t,e){var r=U.makeSpan(["mord","rule"],[],e),i=Ge(t.width,e),o=Ge(t.height,e),s=t.shift?Ge(t.shift,e):0;return r.style.borderRightWidth=se(i),r.style.borderTopWidth=se(o),r.style.bottom=se(s),r.width=i,r.height=o+s,r.depth=-s,r.maxFontSize=o*1.125*e.sizeMultiplier,r},mathmlBuilder(t,e){var r=Ge(t.width,e),i=Ge(t.height,e),o=t.shift?Ge(t.shift,e):0,s=e.color&&e.getColor()||"black",n=new Q.MathNode("mspace");n.setAttribute("mathbackground",s),n.setAttribute("width",se(r)),n.setAttribute("height",se(i));var a=new Q.MathNode("mpadded",[n]);return o>=0?a.setAttribute("height",se(o)):(a.setAttribute("height",se(o)),a.setAttribute("depth",se(-o))),a.setAttribute("voffset",se(o)),a}});function rp(t,e,r){for(var i=rt(t,e,!1),o=e.sizeMultiplier/r.sizeMultiplier,s=0;s<i.length;s++){var n=i[s].classes.indexOf("sizing");n<0?Array.prototype.push.apply(i[s].classes,e.sizingClasses(r)):i[s].classes[n+1]==="reset-size"+e.size&&(i[s].classes[n+1]="reset-size"+r.size),i[s].height*=o,i[s].depth*=o}return U.makeFragment(i)}var sd=["\\tiny","\\sixptsize","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],Mb=(t,e)=>{var r=e.havingSize(t.size);return rp(t.body,r,e)};ae({type:"sizing",names:sd,props:{numArgs:0,allowedInText:!0},handler:(t,e)=>{var{breakOnTokenText:r,funcName:i,parser:o}=t,s=o.parseExpression(!1,r);return{type:"sizing",mode:o.mode,size:sd.indexOf(i)+1,body:s}},htmlBuilder:Mb,mathmlBuilder:(t,e)=>{var r=e.havingSize(t.size),i=At(t.body,r),o=new Q.MathNode("mstyle",i);return o.setAttribute("mathsize",se(r.sizeMultiplier)),o}});ae({type:"smash",names:["\\smash"],props:{numArgs:1,numOptionalArgs:1,allowedInText:!0},handler:(t,e,r)=>{var{parser:i}=t,o=!1,s=!1,n=r[0]&&Ce(r[0],"ordgroup");if(n)for(var a="",l=0;l<n.body.length;++l){var c=n.body[l];if(a=c.text,a==="t")o=!0;else if(a==="b")s=!0;else{o=!1,s=!1;break}}else o=!0,s=!0;var f=e[0];return{type:"smash",mode:i.mode,body:f,smashHeight:o,smashDepth:s}},htmlBuilder:(t,e)=>{var r=U.makeSpan([],[Re(t.body,e)]);if(!t.smashHeight&&!t.smashDepth)return r;if(t.smashHeight&&(r.height=0,r.children))for(var i=0;i<r.children.length;i++)r.children[i].height=0;if(t.smashDepth&&(r.depth=0,r.children))for(var o=0;o<r.children.length;o++)r.children[o].depth=0;var s=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r}]},e);return U.makeSpan(["mord"],[s],e)},mathmlBuilder:(t,e)=>{var r=new Q.MathNode("mpadded",[Ie(t.body,e)]);return t.smashHeight&&r.setAttribute("height","0px"),t.smashDepth&&r.setAttribute("depth","0px"),r}});ae({type:"sqrt",names:["\\sqrt"],props:{numArgs:1,numOptionalArgs:1},handler(t,e,r){var{parser:i}=t,o=r[0],s=e[0];return{type:"sqrt",mode:i.mode,body:s,index:o}},htmlBuilder(t,e){var r=Re(t.body,e.havingCrampedStyle());r.height===0&&(r.height=e.fontMetrics().xHeight),r=U.wrapFragment(r,e);var i=e.fontMetrics(),o=i.defaultRuleThickness,s=o;e.style.id<ge.TEXT.id&&(s=e.fontMetrics().xHeight);var n=o+s/4,a=r.height+r.depth+n+o,{span:l,ruleWidth:c,advanceWidth:f}=Er.sqrtImage(a,e),m=l.height-c;m>r.height+r.depth+n&&(n=(n+m-r.height-r.depth)/2);var _=l.height-r.height-n-c;r.style.paddingLeft=se(f);var g=U.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r,wrapperClasses:["svg-align"]},{type:"kern",size:-(r.height+_)},{type:"elem",elem:l},{type:"kern",size:c}]},e);if(t.index){var h=e.havingStyle(ge.SCRIPTSCRIPT),d=Re(t.index,h,e),u=.6*(g.height-g.depth),p=U.makeVList({positionType:"shift",positionData:-u,children:[{type:"elem",elem:d}]},e),v=U.makeSpan(["root"],[p]);return U.makeSpan(["mord","sqrt"],[v,g],e)}else return U.makeSpan(["mord","sqrt"],[g],e)},mathmlBuilder(t,e){var{body:r,index:i}=t;return i?new Q.MathNode("mroot",[Ie(r,e),Ie(i,e)]):new Q.MathNode("msqrt",[Ie(r,e)])}});var od={display:ge.DISPLAY,text:ge.TEXT,script:ge.SCRIPT,scriptscript:ge.SCRIPTSCRIPT};ae({type:"styling",names:["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(t,e){var{breakOnTokenText:r,funcName:i,parser:o}=t,s=o.parseExpression(!0,r),n=i.slice(1,i.length-5);return{type:"styling",mode:o.mode,style:n,body:s}},htmlBuilder(t,e){var r=od[t.style],i=e.havingStyle(r).withFont("");return rp(t.body,i,e)},mathmlBuilder(t,e){var r=od[t.style],i=e.havingStyle(r),o=At(t.body,i),s=new Q.MathNode("mstyle",o),n={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]},a=n[t.style];return s.setAttribute("scriptlevel",a[0]),s.setAttribute("displaystyle",a[1]),s}});var Rb=function(e,r){var i=e.base;if(i)if(i.type==="op"){var o=i.limits&&(r.style.size===ge.DISPLAY.size||i.alwaysHandleSupSub);return o?Gi:null}else if(i.type==="operatorname"){var s=i.alwaysHandleSupSub&&(r.style.size===ge.DISPLAY.size||i.limits);return s?tp:null}else{if(i.type==="accent")return de.isCharacterBox(i.base)?bl:null;if(i.type==="horizBrace"){var n=!e.sub;return n===i.isOver?Jd:null}else return null}else return null};bi({type:"supsub",htmlBuilder(t,e){var r=Rb(t,e);if(r)return r(t,e);var{base:i,sup:o,sub:s}=t,n=Re(i,e),a,l,c=e.fontMetrics(),f=0,m=0,_=i&&de.isCharacterBox(i);if(o){var g=e.havingStyle(e.style.sup());a=Re(o,g,e),_||(f=n.height-g.fontMetrics().supDrop*g.sizeMultiplier/e.sizeMultiplier)}if(s){var h=e.havingStyle(e.style.sub());l=Re(s,h,e),_||(m=n.depth+h.fontMetrics().subDrop*h.sizeMultiplier/e.sizeMultiplier)}var d;e.style===ge.DISPLAY?d=c.sup1:e.style.cramped?d=c.sup3:d=c.sup2;var u=e.sizeMultiplier,p=se(.5/c.ptPerEm/u),v=null;if(l){var x=t.base&&t.base.type==="op"&&t.base.name&&(t.base.name==="\\oiint"||t.base.name==="\\oiiint");(n instanceof Et||x)&&(v=se(-n.italic))}var S;if(a&&l){f=Math.max(f,d,a.depth+.25*c.xHeight),m=Math.max(m,c.sub2);var C=c.defaultRuleThickness,y=4*C;if(f-a.depth-(l.height-m)<y){m=y-(f-a.depth)+l.height;var k=.8*c.xHeight-(f-a.depth);k>0&&(f+=k,m-=k)}var D=[{type:"elem",elem:l,shift:m,marginRight:p,marginLeft:v},{type:"elem",elem:a,shift:-f,marginRight:p}];S=U.makeVList({positionType:"individualShift",children:D},e)}else if(l){m=Math.max(m,c.sub1,l.height-.8*c.xHeight);var $=[{type:"elem",elem:l,marginLeft:v,marginRight:p}];S=U.makeVList({positionType:"shift",positionData:m,children:$},e)}else if(a)f=Math.max(f,d,a.depth+.25*c.xHeight),S=U.makeVList({positionType:"shift",positionData:-f,children:[{type:"elem",elem:a,marginRight:p}]},e);else throw new Error("supsub must have either sup or sub.");var F=sl(n,"right")||"mord";return U.makeSpan([F],[n,U.makeSpan(["msupsub"],[S])],e)},mathmlBuilder(t,e){var r=!1,i,o;t.base&&t.base.type==="horizBrace"&&(o=!!t.sup,o===t.base.isOver&&(r=!0,i=t.base.isOver)),t.base&&(t.base.type==="op"||t.base.type==="operatorname")&&(t.base.parentIsSupSub=!0);var s=[Ie(t.base,e)];t.sub&&s.push(Ie(t.sub,e)),t.sup&&s.push(Ie(t.sup,e));var n;if(r)n=i?"mover":"munder";else if(t.sub)if(t.sup){var c=t.base;c&&c.type==="op"&&c.limits&&e.style===ge.DISPLAY||c&&c.type==="operatorname"&&c.alwaysHandleSupSub&&(e.style===ge.DISPLAY||c.limits)?n="munderover":n="msubsup"}else{var l=t.base;l&&l.type==="op"&&l.limits&&(e.style===ge.DISPLAY||l.alwaysHandleSupSub)||l&&l.type==="operatorname"&&l.alwaysHandleSupSub&&(l.limits||e.style===ge.DISPLAY)?n="munder":n="msub"}else{var a=t.base;a&&a.type==="op"&&a.limits&&(e.style===ge.DISPLAY||a.alwaysHandleSupSub)||a&&a.type==="operatorname"&&a.alwaysHandleSupSub&&(a.limits||e.style===ge.DISPLAY)?n="mover":n="msup"}return new Q.MathNode(n,s)}});bi({type:"atom",htmlBuilder(t,e){return U.mathsym(t.text,t.mode,e,["m"+t.family])},mathmlBuilder(t,e){var r=new Q.MathNode("mo",[jt(t.text,t.mode)]);if(t.family==="bin"){var i=gl(t,e);i==="bold-italic"&&r.setAttribute("mathvariant",i)}else t.family==="punct"?r.setAttribute("separator","true"):(t.family==="open"||t.family==="close")&&r.setAttribute("stretchy","false");return r}});var ip={mi:"italic",mn:"normal",mtext:"normal"};bi({type:"mathord",htmlBuilder(t,e){return U.makeOrd(t,e,"mathord")},mathmlBuilder(t,e){var r=new Q.MathNode("mi",[jt(t.text,t.mode,e)]),i=gl(t,e)||"italic";return i!==ip[r.type]&&r.setAttribute("mathvariant",i),r}});bi({type:"textord",htmlBuilder(t,e){return U.makeOrd(t,e,"textord")},mathmlBuilder(t,e){var r=jt(t.text,t.mode,e),i=gl(t,e)||"normal",o;return t.mode==="text"?o=new Q.MathNode("mtext",[r]):/[0-9]/.test(t.text)?o=new Q.MathNode("mn",[r]):t.text==="\\prime"?o=new Q.MathNode("mo",[r]):o=new Q.MathNode("mi",[r]),i!==ip[o.type]&&o.setAttribute("mathvariant",i),o}});var Za={"\\nobreak":"nobreak","\\allowbreak":"allowbreak"},Ja={" ":{},"\\ ":{},"~":{className:"nobreak"},"\\space":{},"\\nobreakspace":{className:"nobreak"}};bi({type:"spacing",htmlBuilder(t,e){if(Ja.hasOwnProperty(t.text)){var r=Ja[t.text].className||"";if(t.mode==="text"){var i=U.makeOrd(t,e,"textord");return i.classes.push(r),i}else return U.makeSpan(["mspace",r],[U.mathsym(t.text,t.mode,e)],e)}else{if(Za.hasOwnProperty(t.text))return U.makeSpan(["mspace",Za[t.text]],[],e);throw new te('Unknown type of space "'+t.text+'"')}},mathmlBuilder(t,e){var r;if(Ja.hasOwnProperty(t.text))r=new Q.MathNode("mtext",[new Q.TextNode("\xA0")]);else{if(Za.hasOwnProperty(t.text))return new Q.MathNode("mspace");throw new te('Unknown type of space "'+t.text+'"')}return r}});var nd=()=>{var t=new Q.MathNode("mtd",[]);return t.setAttribute("width","50%"),t};bi({type:"tag",mathmlBuilder(t,e){var r=new Q.MathNode("mtable",[new Q.MathNode("mtr",[nd(),new Q.MathNode("mtd",[Xr(t.body,e)]),nd(),new Q.MathNode("mtd",[Xr(t.tag,e)])])]);return r.setAttribute("width","100%"),r}});var ad={"\\text":void 0,"\\textrm":"textrm","\\textsf":"textsf","\\texttt":"texttt","\\textnormal":"textrm"},ld={"\\textbf":"textbf","\\textmd":"textmd"},Db={"\\textit":"textit","\\textup":"textup"},cd=(t,e)=>{var r=t.font;if(r){if(ad[r])return e.withTextFontFamily(ad[r]);if(ld[r])return e.withTextFontWeight(ld[r]);if(r==="\\emph")return e.fontShape==="textit"?e.withTextFontShape("textup"):e.withTextFontShape("textit")}else return e;return e.withTextFontShape(Db[r])};ae({type:"text",names:["\\text","\\textrm","\\textsf","\\texttt","\\textnormal","\\textbf","\\textmd","\\textit","\\textup","\\emph"],props:{numArgs:1,argTypes:["text"],allowedInArgument:!0,allowedInText:!0},handler(t,e){var{parser:r,funcName:i}=t,o=e[0];return{type:"text",mode:r.mode,body:Ye(o),font:i}},htmlBuilder(t,e){var r=cd(t,e),i=rt(t.body,r,!0);return U.makeSpan(["mord","text"],i,r)},mathmlBuilder(t,e){var r=cd(t,e);return Xr(t.body,r)}});ae({type:"underline",names:["\\underline"],props:{numArgs:1,allowedInText:!0},handler(t,e){var{parser:r}=t;return{type:"underline",mode:r.mode,body:e[0]}},htmlBuilder(t,e){var r=Re(t.body,e),i=U.makeLineSpan("underline-line",e),o=e.fontMetrics().defaultRuleThickness,s=U.makeVList({positionType:"top",positionData:r.height,children:[{type:"kern",size:o},{type:"elem",elem:i},{type:"kern",size:3*o},{type:"elem",elem:r}]},e);return U.makeSpan(["mord","underline"],[s],e)},mathmlBuilder(t,e){var r=new Q.MathNode("mo",[new Q.TextNode("\u203E")]);r.setAttribute("stretchy","true");var i=new Q.MathNode("munder",[Ie(t.body,e),r]);return i.setAttribute("accentunder","true"),i}});ae({type:"vcenter",names:["\\vcenter"],props:{numArgs:1,argTypes:["original"],allowedInText:!1},handler(t,e){var{parser:r}=t;return{type:"vcenter",mode:r.mode,body:e[0]}},htmlBuilder(t,e){var r=Re(t.body,e),i=e.fontMetrics().axisHeight,o=.5*(r.height-i-(r.depth+i));return U.makeVList({positionType:"shift",positionData:o,children:[{type:"elem",elem:r}]},e)},mathmlBuilder(t,e){return new Q.MathNode("mpadded",[Ie(t.body,e)],["vcenter"])}});ae({type:"verb",names:["\\verb"],props:{numArgs:0,allowedInText:!0},handler(t,e,r){throw new te("\\verb ended by end of line instead of matching delimiter")},htmlBuilder(t,e){for(var r=hd(t),i=[],o=e.havingStyle(e.style.text()),s=0;s<r.length;s++){var n=r[s];n==="~"&&(n="\\textasciitilde"),i.push(U.makeSymbol(n,"Typewriter-Regular",t.mode,o,["mord","texttt"]))}return U.makeSpan(["mord","text"].concat(o.sizingClasses(e)),U.tryCombineChars(i),o)},mathmlBuilder(t,e){var r=new Q.TextNode(hd(t)),i=new Q.MathNode("mtext",[r]);return i.setAttribute("mathvariant","monospace"),i}});var hd=t=>t.body.replace(/ /g,t.star?"\u2423":"\xA0"),Gr=Ed,sp=`[ \r
	]`,Lb="\\\\[a-zA-Z@]+",$b="\\\\[^\uD800-\uDFFF]",Bb="("+Lb+")"+sp+"*",zb=`\\\\(
|[ \r	]+
?)[ \r	]*`,cl="[\u0300-\u036F]",Ob=new RegExp(cl+"+$"),Ib="("+sp+"+)|"+(zb+"|")+"([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]"+(cl+"*")+"|[\uD800-\uDBFF][\uDC00-\uDFFF]"+(cl+"*")+"|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5"+("|"+Bb)+("|"+$b+")"),mn=class{constructor(e,r){this.input=void 0,this.settings=void 0,this.tokenRegex=void 0,this.catcodes=void 0,this.input=e,this.settings=r,this.tokenRegex=new RegExp(Ib,"g"),this.catcodes={"%":14,"~":13}}setCatcode(e,r){this.catcodes[e]=r}lex(){var e=this.input,r=this.tokenRegex.lastIndex;if(r===e.length)return new Wt("EOF",new Lt(this,r,r));var i=this.tokenRegex.exec(e);if(i===null||i.index!==r)throw new te("Unexpected character: '"+e[r]+"'",new Wt(e[r],new Lt(this,r,r+1)));var o=i[6]||i[3]||(i[2]?"\\ ":" ");if(this.catcodes[o]===14){var s=e.indexOf(`
`,this.tokenRegex.lastIndex);return s===-1?(this.tokenRegex.lastIndex=e.length,this.settings.reportNonstrict("commentAtEnd","% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")):this.tokenRegex.lastIndex=s+1,this.lex()}return new Wt(o,new Lt(this,r,this.tokenRegex.lastIndex))}},hl=class{constructor(e,r){e===void 0&&(e={}),r===void 0&&(r={}),this.current=void 0,this.builtins=void 0,this.undefStack=void 0,this.current=r,this.builtins=e,this.undefStack=[]}beginGroup(){this.undefStack.push({})}endGroup(){if(this.undefStack.length===0)throw new te("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");var e=this.undefStack.pop();for(var r in e)e.hasOwnProperty(r)&&(e[r]==null?delete this.current[r]:this.current[r]=e[r])}endGroups(){for(;this.undefStack.length>0;)this.endGroup()}has(e){return this.current.hasOwnProperty(e)||this.builtins.hasOwnProperty(e)}get(e){return this.current.hasOwnProperty(e)?this.current[e]:this.builtins[e]}set(e,r,i){if(i===void 0&&(i=!1),i){for(var o=0;o<this.undefStack.length;o++)delete this.undefStack[o][e];this.undefStack.length>0&&(this.undefStack[this.undefStack.length-1][e]=r)}else{var s=this.undefStack[this.undefStack.length-1];s&&!s.hasOwnProperty(e)&&(s[e]=this.current[e])}r==null?delete this.current[e]:this.current[e]=r}},Pb=Gd;M("\\noexpand",function(t){var e=t.popToken();return t.isExpandable(e.text)&&(e.noexpand=!0,e.treatAsRelax=!0),{tokens:[e],numArgs:0}});M("\\expandafter",function(t){var e=t.popToken();return t.expandOnce(!0),{tokens:[e],numArgs:0}});M("\\@firstoftwo",function(t){var e=t.consumeArgs(2);return{tokens:e[0],numArgs:0}});M("\\@secondoftwo",function(t){var e=t.consumeArgs(2);return{tokens:e[1],numArgs:0}});M("\\@ifnextchar",function(t){var e=t.consumeArgs(3);t.consumeSpaces();var r=t.future();return e[0].length===1&&e[0][0].text===r.text?{tokens:e[1],numArgs:0}:{tokens:e[2],numArgs:0}});M("\\@ifstar","\\@ifnextchar *{\\@firstoftwo{#1}}");M("\\TextOrMath",function(t){var e=t.consumeArgs(2);return t.mode==="text"?{tokens:e[0],numArgs:0}:{tokens:e[1],numArgs:0}});var ud={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,A:10,b:11,B:11,c:12,C:12,d:13,D:13,e:14,E:14,f:15,F:15};M("\\char",function(t){var e=t.popToken(),r,i="";if(e.text==="'")r=8,e=t.popToken();else if(e.text==='"')r=16,e=t.popToken();else if(e.text==="`")if(e=t.popToken(),e.text[0]==="\\")i=e.text.charCodeAt(1);else{if(e.text==="EOF")throw new te("\\char` missing argument");i=e.text.charCodeAt(0)}else r=10;if(r){if(i=ud[e.text],i==null||i>=r)throw new te("Invalid base-"+r+" digit "+e.text);for(var o;(o=ud[t.future().text])!=null&&o<r;)i*=r,i+=o,t.popToken()}return"\\@char{"+i+"}"});var El=(t,e,r,i)=>{var o=t.consumeArg().tokens;if(o.length!==1)throw new te("\\newcommand's first argument must be a macro name");var s=o[0].text,n=t.isDefined(s);if(n&&!e)throw new te("\\newcommand{"+s+"} attempting to redefine "+(s+"; use \\renewcommand"));if(!n&&!r)throw new te("\\renewcommand{"+s+"} when command "+s+" does not yet exist; use \\newcommand");var a=0;if(o=t.consumeArg().tokens,o.length===1&&o[0].text==="["){for(var l="",c=t.expandNextToken();c.text!=="]"&&c.text!=="EOF";)l+=c.text,c=t.expandNextToken();if(!l.match(/^\s*[0-9]+\s*$/))throw new te("Invalid number of arguments: "+l);a=parseInt(l),o=t.consumeArg().tokens}return n&&i||t.macros.set(s,{tokens:o,numArgs:a}),""};M("\\newcommand",t=>El(t,!1,!0,!1));M("\\renewcommand",t=>El(t,!0,!1,!1));M("\\providecommand",t=>El(t,!0,!0,!0));M("\\message",t=>{var e=t.consumeArgs(1)[0];return console.log(e.reverse().map(r=>r.text).join("")),""});M("\\errmessage",t=>{var e=t.consumeArgs(1)[0];return console.error(e.reverse().map(r=>r.text).join("")),""});M("\\show",t=>{var e=t.popToken(),r=e.text;return console.log(e,t.macros.get(r),Gr[r],Pe.math[r],Pe.text[r]),""});M("\\bgroup","{");M("\\egroup","}");M("~","\\nobreakspace");M("\\lq","`");M("\\rq","'");M("\\aa","\\r a");M("\\AA","\\r A");M("\\textcopyright","\\html@mathml{\\textcircled{c}}{\\char`\xA9}");M("\\copyright","\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");M("\\textregistered","\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");M("\u212C","\\mathscr{B}");M("\u2130","\\mathscr{E}");M("\u2131","\\mathscr{F}");M("\u210B","\\mathscr{H}");M("\u2110","\\mathscr{I}");M("\u2112","\\mathscr{L}");M("\u2133","\\mathscr{M}");M("\u211B","\\mathscr{R}");M("\u212D","\\mathfrak{C}");M("\u210C","\\mathfrak{H}");M("\u2128","\\mathfrak{Z}");M("\\Bbbk","\\Bbb{k}");M("\xB7","\\cdotp");M("\\llap","\\mathllap{\\textrm{#1}}");M("\\rlap","\\mathrlap{\\textrm{#1}}");M("\\clap","\\mathclap{\\textrm{#1}}");M("\\mathstrut","\\vphantom{(}");M("\\underbar","\\underline{\\text{#1}}");M("\\not",'\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');M("\\neq","\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");M("\\ne","\\neq");M("\u2260","\\neq");M("\\notin","\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");M("\u2209","\\notin");M("\u2258","\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");M("\u2259","\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");M("\u225A","\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");M("\u225B","\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");M("\u225D","\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");M("\u225E","\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");M("\u225F","\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");M("\u27C2","\\perp");M("\u203C","\\mathclose{!\\mkern-0.8mu!}");M("\u220C","\\notni");M("\u231C","\\ulcorner");M("\u231D","\\urcorner");M("\u231E","\\llcorner");M("\u231F","\\lrcorner");M("\xA9","\\copyright");M("\xAE","\\textregistered");M("\uFE0F","\\textregistered");M("\\ulcorner",'\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');M("\\urcorner",'\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');M("\\llcorner",'\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');M("\\lrcorner",'\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');M("\\vdots","{\\varvdots\\rule{0pt}{15pt}}");M("\u22EE","\\vdots");M("\\varGamma","\\mathit{\\Gamma}");M("\\varDelta","\\mathit{\\Delta}");M("\\varTheta","\\mathit{\\Theta}");M("\\varLambda","\\mathit{\\Lambda}");M("\\varXi","\\mathit{\\Xi}");M("\\varPi","\\mathit{\\Pi}");M("\\varSigma","\\mathit{\\Sigma}");M("\\varUpsilon","\\mathit{\\Upsilon}");M("\\varPhi","\\mathit{\\Phi}");M("\\varPsi","\\mathit{\\Psi}");M("\\varOmega","\\mathit{\\Omega}");M("\\substack","\\begin{subarray}{c}#1\\end{subarray}");M("\\colon","\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");M("\\boxed","\\fbox{$\\displaystyle{#1}$}");M("\\iff","\\DOTSB\\;\\Longleftrightarrow\\;");M("\\implies","\\DOTSB\\;\\Longrightarrow\\;");M("\\impliedby","\\DOTSB\\;\\Longleftarrow\\;");M("\\dddot","{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");M("\\ddddot","{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");var dd={",":"\\dotsc","\\not":"\\dotsb","+":"\\dotsb","=":"\\dotsb","<":"\\dotsb",">":"\\dotsb","-":"\\dotsb","*":"\\dotsb",":":"\\dotsb","\\DOTSB":"\\dotsb","\\coprod":"\\dotsb","\\bigvee":"\\dotsb","\\bigwedge":"\\dotsb","\\biguplus":"\\dotsb","\\bigcap":"\\dotsb","\\bigcup":"\\dotsb","\\prod":"\\dotsb","\\sum":"\\dotsb","\\bigotimes":"\\dotsb","\\bigoplus":"\\dotsb","\\bigodot":"\\dotsb","\\bigsqcup":"\\dotsb","\\And":"\\dotsb","\\longrightarrow":"\\dotsb","\\Longrightarrow":"\\dotsb","\\longleftarrow":"\\dotsb","\\Longleftarrow":"\\dotsb","\\longleftrightarrow":"\\dotsb","\\Longleftrightarrow":"\\dotsb","\\mapsto":"\\dotsb","\\longmapsto":"\\dotsb","\\hookrightarrow":"\\dotsb","\\doteq":"\\dotsb","\\mathbin":"\\dotsb","\\mathrel":"\\dotsb","\\relbar":"\\dotsb","\\Relbar":"\\dotsb","\\xrightarrow":"\\dotsb","\\xleftarrow":"\\dotsb","\\DOTSI":"\\dotsi","\\int":"\\dotsi","\\oint":"\\dotsi","\\iint":"\\dotsi","\\iiint":"\\dotsi","\\iiiint":"\\dotsi","\\idotsint":"\\dotsi","\\DOTSX":"\\dotsx"};M("\\dots",function(t){var e="\\dotso",r=t.expandAfterFuture().text;return r in dd?e=dd[r]:(r.slice(0,4)==="\\not"||r in Pe.math&&de.contains(["bin","rel"],Pe.math[r].group))&&(e="\\dotsb"),e});var Al={")":!0,"]":!0,"\\rbrack":!0,"\\}":!0,"\\rbrace":!0,"\\rangle":!0,"\\rceil":!0,"\\rfloor":!0,"\\rgroup":!0,"\\rmoustache":!0,"\\right":!0,"\\bigr":!0,"\\biggr":!0,"\\Bigr":!0,"\\Biggr":!0,$:!0,";":!0,".":!0,",":!0};M("\\dotso",function(t){var e=t.future().text;return e in Al?"\\ldots\\,":"\\ldots"});M("\\dotsc",function(t){var e=t.future().text;return e in Al&&e!==","?"\\ldots\\,":"\\ldots"});M("\\cdots",function(t){var e=t.future().text;return e in Al?"\\@cdots\\,":"\\@cdots"});M("\\dotsb","\\cdots");M("\\dotsm","\\cdots");M("\\dotsi","\\!\\cdots");M("\\dotsx","\\ldots\\,");M("\\DOTSI","\\relax");M("\\DOTSB","\\relax");M("\\DOTSX","\\relax");M("\\tmspace","\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");M("\\,","\\tmspace+{3mu}{.1667em}");M("\\thinspace","\\,");M("\\>","\\mskip{4mu}");M("\\:","\\tmspace+{4mu}{.2222em}");M("\\medspace","\\:");M("\\;","\\tmspace+{5mu}{.2777em}");M("\\thickspace","\\;");M("\\!","\\tmspace-{3mu}{.1667em}");M("\\negthinspace","\\!");M("\\negmedspace","\\tmspace-{4mu}{.2222em}");M("\\negthickspace","\\tmspace-{5mu}{.277em}");M("\\enspace","\\kern.5em ");M("\\enskip","\\hskip.5em\\relax");M("\\quad","\\hskip1em\\relax");M("\\qquad","\\hskip2em\\relax");M("\\tag","\\@ifstar\\tag@literal\\tag@paren");M("\\tag@paren","\\tag@literal{({#1})}");M("\\tag@literal",t=>{if(t.macros.get("\\df@tag"))throw new te("Multiple \\tag");return"\\gdef\\df@tag{\\text{#1}}"});M("\\bmod","\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");M("\\pod","\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");M("\\pmod","\\pod{{\\rm mod}\\mkern6mu#1}");M("\\mod","\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");M("\\newline","\\\\\\relax");M("\\TeX","\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");var op=se(lr["Main-Regular"][84][1]-.7*lr["Main-Regular"][65][1]);M("\\LaTeX","\\textrm{\\html@mathml{"+("L\\kern-.36em\\raisebox{"+op+"}{\\scriptstyle A}")+"\\kern-.15em\\TeX}{LaTeX}}");M("\\KaTeX","\\textrm{\\html@mathml{"+("K\\kern-.17em\\raisebox{"+op+"}{\\scriptstyle A}")+"\\kern-.15em\\TeX}{KaTeX}}");M("\\hspace","\\@ifstar\\@hspacer\\@hspace");M("\\@hspace","\\hskip #1\\relax");M("\\@hspacer","\\rule{0pt}{0pt}\\hskip #1\\relax");M("\\ordinarycolon",":");M("\\vcentcolon","\\mathrel{\\mathop\\ordinarycolon}");M("\\dblcolon",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');M("\\coloneqq",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');M("\\Coloneqq",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');M("\\coloneq",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');M("\\Coloneq",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');M("\\eqqcolon",'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');M("\\Eqqcolon",'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');M("\\eqcolon",'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');M("\\Eqcolon",'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');M("\\colonapprox",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');M("\\Colonapprox",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');M("\\colonsim",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');M("\\Colonsim",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');M("\u2237","\\dblcolon");M("\u2239","\\eqcolon");M("\u2254","\\coloneqq");M("\u2255","\\eqqcolon");M("\u2A74","\\Coloneqq");M("\\ratio","\\vcentcolon");M("\\coloncolon","\\dblcolon");M("\\colonequals","\\coloneqq");M("\\coloncolonequals","\\Coloneqq");M("\\equalscolon","\\eqqcolon");M("\\equalscoloncolon","\\Eqqcolon");M("\\colonminus","\\coloneq");M("\\coloncolonminus","\\Coloneq");M("\\minuscolon","\\eqcolon");M("\\minuscoloncolon","\\Eqcolon");M("\\coloncolonapprox","\\Colonapprox");M("\\coloncolonsim","\\Colonsim");M("\\simcolon","\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");M("\\simcoloncolon","\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");M("\\approxcolon","\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");M("\\approxcoloncolon","\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");M("\\notni","\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");M("\\limsup","\\DOTSB\\operatorname*{lim\\,sup}");M("\\liminf","\\DOTSB\\operatorname*{lim\\,inf}");M("\\injlim","\\DOTSB\\operatorname*{inj\\,lim}");M("\\projlim","\\DOTSB\\operatorname*{proj\\,lim}");M("\\varlimsup","\\DOTSB\\operatorname*{\\overline{lim}}");M("\\varliminf","\\DOTSB\\operatorname*{\\underline{lim}}");M("\\varinjlim","\\DOTSB\\operatorname*{\\underrightarrow{lim}}");M("\\varprojlim","\\DOTSB\\operatorname*{\\underleftarrow{lim}}");M("\\gvertneqq","\\html@mathml{\\@gvertneqq}{\u2269}");M("\\lvertneqq","\\html@mathml{\\@lvertneqq}{\u2268}");M("\\ngeqq","\\html@mathml{\\@ngeqq}{\u2271}");M("\\ngeqslant","\\html@mathml{\\@ngeqslant}{\u2271}");M("\\nleqq","\\html@mathml{\\@nleqq}{\u2270}");M("\\nleqslant","\\html@mathml{\\@nleqslant}{\u2270}");M("\\nshortmid","\\html@mathml{\\@nshortmid}{\u2224}");M("\\nshortparallel","\\html@mathml{\\@nshortparallel}{\u2226}");M("\\nsubseteqq","\\html@mathml{\\@nsubseteqq}{\u2288}");M("\\nsupseteqq","\\html@mathml{\\@nsupseteqq}{\u2289}");M("\\varsubsetneq","\\html@mathml{\\@varsubsetneq}{\u228A}");M("\\varsubsetneqq","\\html@mathml{\\@varsubsetneqq}{\u2ACB}");M("\\varsupsetneq","\\html@mathml{\\@varsupsetneq}{\u228B}");M("\\varsupsetneqq","\\html@mathml{\\@varsupsetneqq}{\u2ACC}");M("\\imath","\\html@mathml{\\@imath}{\u0131}");M("\\jmath","\\html@mathml{\\@jmath}{\u0237}");M("\\llbracket","\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");M("\\rrbracket","\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");M("\u27E6","\\llbracket");M("\u27E7","\\rrbracket");M("\\lBrace","\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");M("\\rBrace","\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");M("\u2983","\\lBrace");M("\u2984","\\rBrace");M("\\minuso","\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}");M("\u29B5","\\minuso");M("\\darr","\\downarrow");M("\\dArr","\\Downarrow");M("\\Darr","\\Downarrow");M("\\lang","\\langle");M("\\rang","\\rangle");M("\\uarr","\\uparrow");M("\\uArr","\\Uparrow");M("\\Uarr","\\Uparrow");M("\\N","\\mathbb{N}");M("\\R","\\mathbb{R}");M("\\Z","\\mathbb{Z}");M("\\alef","\\aleph");M("\\alefsym","\\aleph");M("\\Alpha","\\mathrm{A}");M("\\Beta","\\mathrm{B}");M("\\bull","\\bullet");M("\\Chi","\\mathrm{X}");M("\\clubs","\\clubsuit");M("\\cnums","\\mathbb{C}");M("\\Complex","\\mathbb{C}");M("\\Dagger","\\ddagger");M("\\diamonds","\\diamondsuit");M("\\empty","\\emptyset");M("\\Epsilon","\\mathrm{E}");M("\\Eta","\\mathrm{H}");M("\\exist","\\exists");M("\\harr","\\leftrightarrow");M("\\hArr","\\Leftrightarrow");M("\\Harr","\\Leftrightarrow");M("\\hearts","\\heartsuit");M("\\image","\\Im");M("\\infin","\\infty");M("\\Iota","\\mathrm{I}");M("\\isin","\\in");M("\\Kappa","\\mathrm{K}");M("\\larr","\\leftarrow");M("\\lArr","\\Leftarrow");M("\\Larr","\\Leftarrow");M("\\lrarr","\\leftrightarrow");M("\\lrArr","\\Leftrightarrow");M("\\Lrarr","\\Leftrightarrow");M("\\Mu","\\mathrm{M}");M("\\natnums","\\mathbb{N}");M("\\Nu","\\mathrm{N}");M("\\Omicron","\\mathrm{O}");M("\\plusmn","\\pm");M("\\rarr","\\rightarrow");M("\\rArr","\\Rightarrow");M("\\Rarr","\\Rightarrow");M("\\real","\\Re");M("\\reals","\\mathbb{R}");M("\\Reals","\\mathbb{R}");M("\\Rho","\\mathrm{P}");M("\\sdot","\\cdot");M("\\sect","\\S");M("\\spades","\\spadesuit");M("\\sub","\\subset");M("\\sube","\\subseteq");M("\\supe","\\supseteq");M("\\Tau","\\mathrm{T}");M("\\thetasym","\\vartheta");M("\\weierp","\\wp");M("\\Zeta","\\mathrm{Z}");M("\\argmin","\\DOTSB\\operatorname*{arg\\,min}");M("\\argmax","\\DOTSB\\operatorname*{arg\\,max}");M("\\plim","\\DOTSB\\mathop{\\operatorname{plim}}\\limits");M("\\bra","\\mathinner{\\langle{#1}|}");M("\\ket","\\mathinner{|{#1}\\rangle}");M("\\braket","\\mathinner{\\langle{#1}\\rangle}");M("\\Bra","\\left\\langle#1\\right|");M("\\Ket","\\left|#1\\right\\rangle");var np=t=>e=>{var r=e.consumeArg().tokens,i=e.consumeArg().tokens,o=e.consumeArg().tokens,s=e.consumeArg().tokens,n=e.macros.get("|"),a=e.macros.get("\\|");e.macros.beginGroup();var l=m=>_=>{t&&(_.macros.set("|",n),o.length&&_.macros.set("\\|",a));var g=m;if(!m&&o.length){var h=_.future();h.text==="|"&&(_.popToken(),g=!0)}return{tokens:g?o:i,numArgs:0}};e.macros.set("|",l(!1)),o.length&&e.macros.set("\\|",l(!0));var c=e.consumeArg().tokens,f=e.expandTokens([...s,...c,...r]);return e.macros.endGroup(),{tokens:f.reverse(),numArgs:0}};M("\\bra@ket",np(!1));M("\\bra@set",np(!0));M("\\Braket","\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");M("\\Set","\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");M("\\set","\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");M("\\angln","{\\angl n}");M("\\blue","\\textcolor{##6495ed}{#1}");M("\\orange","\\textcolor{##ffa500}{#1}");M("\\pink","\\textcolor{##ff00af}{#1}");M("\\red","\\textcolor{##df0030}{#1}");M("\\green","\\textcolor{##28ae7b}{#1}");M("\\gray","\\textcolor{gray}{#1}");M("\\purple","\\textcolor{##9d38bd}{#1}");M("\\blueA","\\textcolor{##ccfaff}{#1}");M("\\blueB","\\textcolor{##80f6ff}{#1}");M("\\blueC","\\textcolor{##63d9ea}{#1}");M("\\blueD","\\textcolor{##11accd}{#1}");M("\\blueE","\\textcolor{##0c7f99}{#1}");M("\\tealA","\\textcolor{##94fff5}{#1}");M("\\tealB","\\textcolor{##26edd5}{#1}");M("\\tealC","\\textcolor{##01d1c1}{#1}");M("\\tealD","\\textcolor{##01a995}{#1}");M("\\tealE","\\textcolor{##208170}{#1}");M("\\greenA","\\textcolor{##b6ffb0}{#1}");M("\\greenB","\\textcolor{##8af281}{#1}");M("\\greenC","\\textcolor{##74cf70}{#1}");M("\\greenD","\\textcolor{##1fab54}{#1}");M("\\greenE","\\textcolor{##0d923f}{#1}");M("\\goldA","\\textcolor{##ffd0a9}{#1}");M("\\goldB","\\textcolor{##ffbb71}{#1}");M("\\goldC","\\textcolor{##ff9c39}{#1}");M("\\goldD","\\textcolor{##e07d10}{#1}");M("\\goldE","\\textcolor{##a75a05}{#1}");M("\\redA","\\textcolor{##fca9a9}{#1}");M("\\redB","\\textcolor{##ff8482}{#1}");M("\\redC","\\textcolor{##f9685d}{#1}");M("\\redD","\\textcolor{##e84d39}{#1}");M("\\redE","\\textcolor{##bc2612}{#1}");M("\\maroonA","\\textcolor{##ffbde0}{#1}");M("\\maroonB","\\textcolor{##ff92c6}{#1}");M("\\maroonC","\\textcolor{##ed5fa6}{#1}");M("\\maroonD","\\textcolor{##ca337c}{#1}");M("\\maroonE","\\textcolor{##9e034e}{#1}");M("\\purpleA","\\textcolor{##ddd7ff}{#1}");M("\\purpleB","\\textcolor{##c6b9fc}{#1}");M("\\purpleC","\\textcolor{##aa87ff}{#1}");M("\\purpleD","\\textcolor{##7854ab}{#1}");M("\\purpleE","\\textcolor{##543b78}{#1}");M("\\mintA","\\textcolor{##f5f9e8}{#1}");M("\\mintB","\\textcolor{##edf2df}{#1}");M("\\mintC","\\textcolor{##e0e5cc}{#1}");M("\\grayA","\\textcolor{##f6f7f7}{#1}");M("\\grayB","\\textcolor{##f0f1f2}{#1}");M("\\grayC","\\textcolor{##e3e5e6}{#1}");M("\\grayD","\\textcolor{##d6d8da}{#1}");M("\\grayE","\\textcolor{##babec2}{#1}");M("\\grayF","\\textcolor{##888d93}{#1}");M("\\grayG","\\textcolor{##626569}{#1}");M("\\grayH","\\textcolor{##3b3e40}{#1}");M("\\grayI","\\textcolor{##21242c}{#1}");M("\\kaBlue","\\textcolor{##314453}{#1}");M("\\kaGreen","\\textcolor{##71B307}{#1}");var ap={"^":!0,_:!0,"\\limits":!0,"\\nolimits":!0},ul=class{constructor(e,r,i){this.settings=void 0,this.expansionCount=void 0,this.lexer=void 0,this.macros=void 0,this.stack=void 0,this.mode=void 0,this.settings=r,this.expansionCount=0,this.feed(e),this.macros=new hl(Pb,r.macros),this.mode=i,this.stack=[]}feed(e){this.lexer=new mn(e,this.settings)}switchMode(e){this.mode=e}beginGroup(){this.macros.beginGroup()}endGroup(){this.macros.endGroup()}endGroups(){this.macros.endGroups()}future(){return this.stack.length===0&&this.pushToken(this.lexer.lex()),this.stack[this.stack.length-1]}popToken(){return this.future(),this.stack.pop()}pushToken(e){this.stack.push(e)}pushTokens(e){this.stack.push(...e)}scanArgument(e){var r,i,o;if(e){if(this.consumeSpaces(),this.future().text!=="[")return null;r=this.popToken(),{tokens:o,end:i}=this.consumeArg(["]"])}else({tokens:o,start:r,end:i}=this.consumeArg());return this.pushToken(new Wt("EOF",i.loc)),this.pushTokens(o),r.range(i,"")}consumeSpaces(){for(;;){var e=this.future();if(e.text===" ")this.stack.pop();else break}}consumeArg(e){var r=[],i=e&&e.length>0;i||this.consumeSpaces();var o=this.future(),s,n=0,a=0;do{if(s=this.popToken(),r.push(s),s.text==="{")++n;else if(s.text==="}"){if(--n,n===-1)throw new te("Extra }",s)}else if(s.text==="EOF")throw new te("Unexpected end of input in a macro argument, expected '"+(e&&i?e[a]:"}")+"'",s);if(e&&i)if((n===0||n===1&&e[a]==="{")&&s.text===e[a]){if(++a,a===e.length){r.splice(-a,a);break}}else a=0}while(n!==0||i);return o.text==="{"&&r[r.length-1].text==="}"&&(r.pop(),r.shift()),r.reverse(),{tokens:r,start:o,end:s}}consumeArgs(e,r){if(r){if(r.length!==e+1)throw new te("The length of delimiters doesn't match the number of args!");for(var i=r[0],o=0;o<i.length;o++){var s=this.popToken();if(i[o]!==s.text)throw new te("Use of the macro doesn't match its definition",s)}}for(var n=[],a=0;a<e;a++)n.push(this.consumeArg(r&&r[a+1]).tokens);return n}countExpansion(e){if(this.expansionCount+=e,this.expansionCount>this.settings.maxExpand)throw new te("Too many expansions: infinite loop or need to increase maxExpand setting")}expandOnce(e){var r=this.popToken(),i=r.text,o=r.noexpand?null:this._getExpansion(i);if(o==null||e&&o.unexpandable){if(e&&o==null&&i[0]==="\\"&&!this.isDefined(i))throw new te("Undefined control sequence: "+i);return this.pushToken(r),!1}this.countExpansion(1);var s=o.tokens,n=this.consumeArgs(o.numArgs,o.delimiters);if(o.numArgs){s=s.slice();for(var a=s.length-1;a>=0;--a){var l=s[a];if(l.text==="#"){if(a===0)throw new te("Incomplete placeholder at end of macro body",l);if(l=s[--a],l.text==="#")s.splice(a+1,1);else if(/^[1-9]$/.test(l.text))s.splice(a,2,...n[+l.text-1]);else throw new te("Not a valid argument number",l)}}}return this.pushTokens(s),s.length}expandAfterFuture(){return this.expandOnce(),this.future()}expandNextToken(){for(;;)if(this.expandOnce()===!1){var e=this.stack.pop();return e.treatAsRelax&&(e.text="\\relax"),e}throw new Error}expandMacro(e){return this.macros.has(e)?this.expandTokens([new Wt(e)]):void 0}expandTokens(e){var r=[],i=this.stack.length;for(this.pushTokens(e);this.stack.length>i;)if(this.expandOnce(!0)===!1){var o=this.stack.pop();o.treatAsRelax&&(o.noexpand=!1,o.treatAsRelax=!1),r.push(o)}return this.countExpansion(r.length),r}expandMacroAsText(e){var r=this.expandMacro(e);return r&&r.map(i=>i.text).join("")}_getExpansion(e){var r=this.macros.get(e);if(r==null)return r;if(e.length===1){var i=this.lexer.catcodes[e];if(i!=null&&i!==13)return}var o=typeof r=="function"?r(this):r;if(typeof o=="string"){var s=0;if(o.indexOf("#")!==-1)for(var n=o.replace(/##/g,"");n.indexOf("#"+(s+1))!==-1;)++s;for(var a=new mn(o,this.settings),l=[],c=a.lex();c.text!=="EOF";)l.push(c),c=a.lex();l.reverse();var f={tokens:l,numArgs:s};return f}return o}isDefined(e){return this.macros.has(e)||Gr.hasOwnProperty(e)||Pe.math.hasOwnProperty(e)||Pe.text.hasOwnProperty(e)||ap.hasOwnProperty(e)}isExpandable(e){var r=this.macros.get(e);return r!=null?typeof r=="string"||typeof r=="function"||!r.unexpandable:Gr.hasOwnProperty(e)&&!Gr[e].primitive}},pd=/^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/,nn=Object.freeze({"\u208A":"+","\u208B":"-","\u208C":"=","\u208D":"(","\u208E":")","\u2080":"0","\u2081":"1","\u2082":"2","\u2083":"3","\u2084":"4","\u2085":"5","\u2086":"6","\u2087":"7","\u2088":"8","\u2089":"9","\u2090":"a","\u2091":"e","\u2095":"h","\u1D62":"i","\u2C7C":"j","\u2096":"k","\u2097":"l","\u2098":"m","\u2099":"n","\u2092":"o","\u209A":"p","\u1D63":"r","\u209B":"s","\u209C":"t","\u1D64":"u","\u1D65":"v","\u2093":"x","\u1D66":"\u03B2","\u1D67":"\u03B3","\u1D68":"\u03C1","\u1D69":"\u03D5","\u1D6A":"\u03C7","\u207A":"+","\u207B":"-","\u207C":"=","\u207D":"(","\u207E":")","\u2070":"0","\xB9":"1","\xB2":"2","\xB3":"3","\u2074":"4","\u2075":"5","\u2076":"6","\u2077":"7","\u2078":"8","\u2079":"9","\u1D2C":"A","\u1D2E":"B","\u1D30":"D","\u1D31":"E","\u1D33":"G","\u1D34":"H","\u1D35":"I","\u1D36":"J","\u1D37":"K","\u1D38":"L","\u1D39":"M","\u1D3A":"N","\u1D3C":"O","\u1D3E":"P","\u1D3F":"R","\u1D40":"T","\u1D41":"U","\u2C7D":"V","\u1D42":"W","\u1D43":"a","\u1D47":"b","\u1D9C":"c","\u1D48":"d","\u1D49":"e","\u1DA0":"f","\u1D4D":"g",\u02B0:"h","\u2071":"i",\u02B2:"j","\u1D4F":"k",\u02E1:"l","\u1D50":"m",\u207F:"n","\u1D52":"o","\u1D56":"p",\u02B3:"r",\u02E2:"s","\u1D57":"t","\u1D58":"u","\u1D5B":"v",\u02B7:"w",\u02E3:"x",\u02B8:"y","\u1DBB":"z","\u1D5D":"\u03B2","\u1D5E":"\u03B3","\u1D5F":"\u03B4","\u1D60":"\u03D5","\u1D61":"\u03C7","\u1DBF":"\u03B8"}),Qa={"\u0301":{text:"\\'",math:"\\acute"},"\u0300":{text:"\\`",math:"\\grave"},"\u0308":{text:'\\"',math:"\\ddot"},"\u0303":{text:"\\~",math:"\\tilde"},"\u0304":{text:"\\=",math:"\\bar"},"\u0306":{text:"\\u",math:"\\breve"},"\u030C":{text:"\\v",math:"\\check"},"\u0302":{text:"\\^",math:"\\hat"},"\u0307":{text:"\\.",math:"\\dot"},"\u030A":{text:"\\r",math:"\\mathring"},"\u030B":{text:"\\H"},"\u0327":{text:"\\c"}},fd={\u00E1:"a\u0301",\u00E0:"a\u0300",\u00E4:"a\u0308",\u01DF:"a\u0308\u0304",\u00E3:"a\u0303",\u0101:"a\u0304",\u0103:"a\u0306",\u1EAF:"a\u0306\u0301",\u1EB1:"a\u0306\u0300",\u1EB5:"a\u0306\u0303",\u01CE:"a\u030C",\u00E2:"a\u0302",\u1EA5:"a\u0302\u0301",\u1EA7:"a\u0302\u0300",\u1EAB:"a\u0302\u0303",\u0227:"a\u0307",\u01E1:"a\u0307\u0304",\u00E5:"a\u030A",\u01FB:"a\u030A\u0301",\u1E03:"b\u0307",\u0107:"c\u0301",\u1E09:"c\u0327\u0301",\u010D:"c\u030C",\u0109:"c\u0302",\u010B:"c\u0307",\u00E7:"c\u0327",\u010F:"d\u030C",\u1E0B:"d\u0307",\u1E11:"d\u0327",\u00E9:"e\u0301",\u00E8:"e\u0300",\u00EB:"e\u0308",\u1EBD:"e\u0303",\u0113:"e\u0304",\u1E17:"e\u0304\u0301",\u1E15:"e\u0304\u0300",\u0115:"e\u0306",\u1E1D:"e\u0327\u0306",\u011B:"e\u030C",\u00EA:"e\u0302",\u1EBF:"e\u0302\u0301",\u1EC1:"e\u0302\u0300",\u1EC5:"e\u0302\u0303",\u0117:"e\u0307",\u0229:"e\u0327",\u1E1F:"f\u0307",\u01F5:"g\u0301",\u1E21:"g\u0304",\u011F:"g\u0306",\u01E7:"g\u030C",\u011D:"g\u0302",\u0121:"g\u0307",\u0123:"g\u0327",\u1E27:"h\u0308",\u021F:"h\u030C",\u0125:"h\u0302",\u1E23:"h\u0307",\u1E29:"h\u0327",\u00ED:"i\u0301",\u00EC:"i\u0300",\u00EF:"i\u0308",\u1E2F:"i\u0308\u0301",\u0129:"i\u0303",\u012B:"i\u0304",\u012D:"i\u0306",\u01D0:"i\u030C",\u00EE:"i\u0302",\u01F0:"j\u030C",\u0135:"j\u0302",\u1E31:"k\u0301",\u01E9:"k\u030C",\u0137:"k\u0327",\u013A:"l\u0301",\u013E:"l\u030C",\u013C:"l\u0327",\u1E3F:"m\u0301",\u1E41:"m\u0307",\u0144:"n\u0301",\u01F9:"n\u0300",\u00F1:"n\u0303",\u0148:"n\u030C",\u1E45:"n\u0307",\u0146:"n\u0327",\u00F3:"o\u0301",\u00F2:"o\u0300",\u00F6:"o\u0308",\u022B:"o\u0308\u0304",\u00F5:"o\u0303",\u1E4D:"o\u0303\u0301",\u1E4F:"o\u0303\u0308",\u022D:"o\u0303\u0304",\u014D:"o\u0304",\u1E53:"o\u0304\u0301",\u1E51:"o\u0304\u0300",\u014F:"o\u0306",\u01D2:"o\u030C",\u00F4:"o\u0302",\u1ED1:"o\u0302\u0301",\u1ED3:"o\u0302\u0300",\u1ED7:"o\u0302\u0303",\u022F:"o\u0307",\u0231:"o\u0307\u0304",\u0151:"o\u030B",\u1E55:"p\u0301",\u1E57:"p\u0307",\u0155:"r\u0301",\u0159:"r\u030C",\u1E59:"r\u0307",\u0157:"r\u0327",\u015B:"s\u0301",\u1E65:"s\u0301\u0307",\u0161:"s\u030C",\u1E67:"s\u030C\u0307",\u015D:"s\u0302",\u1E61:"s\u0307",\u015F:"s\u0327",\u1E97:"t\u0308",\u0165:"t\u030C",\u1E6B:"t\u0307",\u0163:"t\u0327",\u00FA:"u\u0301",\u00F9:"u\u0300",\u00FC:"u\u0308",\u01D8:"u\u0308\u0301",\u01DC:"u\u0308\u0300",\u01D6:"u\u0308\u0304",\u01DA:"u\u0308\u030C",\u0169:"u\u0303",\u1E79:"u\u0303\u0301",\u016B:"u\u0304",\u1E7B:"u\u0304\u0308",\u016D:"u\u0306",\u01D4:"u\u030C",\u00FB:"u\u0302",\u016F:"u\u030A",\u0171:"u\u030B",\u1E7D:"v\u0303",\u1E83:"w\u0301",\u1E81:"w\u0300",\u1E85:"w\u0308",\u0175:"w\u0302",\u1E87:"w\u0307",\u1E98:"w\u030A",\u1E8D:"x\u0308",\u1E8B:"x\u0307",\u00FD:"y\u0301",\u1EF3:"y\u0300",\u00FF:"y\u0308",\u1EF9:"y\u0303",\u0233:"y\u0304",\u0177:"y\u0302",\u1E8F:"y\u0307",\u1E99:"y\u030A",\u017A:"z\u0301",\u017E:"z\u030C",\u1E91:"z\u0302",\u017C:"z\u0307",\u00C1:"A\u0301",\u00C0:"A\u0300",\u00C4:"A\u0308",\u01DE:"A\u0308\u0304",\u00C3:"A\u0303",\u0100:"A\u0304",\u0102:"A\u0306",\u1EAE:"A\u0306\u0301",\u1EB0:"A\u0306\u0300",\u1EB4:"A\u0306\u0303",\u01CD:"A\u030C",\u00C2:"A\u0302",\u1EA4:"A\u0302\u0301",\u1EA6:"A\u0302\u0300",\u1EAA:"A\u0302\u0303",\u0226:"A\u0307",\u01E0:"A\u0307\u0304",\u00C5:"A\u030A",\u01FA:"A\u030A\u0301",\u1E02:"B\u0307",\u0106:"C\u0301",\u1E08:"C\u0327\u0301",\u010C:"C\u030C",\u0108:"C\u0302",\u010A:"C\u0307",\u00C7:"C\u0327",\u010E:"D\u030C",\u1E0A:"D\u0307",\u1E10:"D\u0327",\u00C9:"E\u0301",\u00C8:"E\u0300",\u00CB:"E\u0308",\u1EBC:"E\u0303",\u0112:"E\u0304",\u1E16:"E\u0304\u0301",\u1E14:"E\u0304\u0300",\u0114:"E\u0306",\u1E1C:"E\u0327\u0306",\u011A:"E\u030C",\u00CA:"E\u0302",\u1EBE:"E\u0302\u0301",\u1EC0:"E\u0302\u0300",\u1EC4:"E\u0302\u0303",\u0116:"E\u0307",\u0228:"E\u0327",\u1E1E:"F\u0307",\u01F4:"G\u0301",\u1E20:"G\u0304",\u011E:"G\u0306",\u01E6:"G\u030C",\u011C:"G\u0302",\u0120:"G\u0307",\u0122:"G\u0327",\u1E26:"H\u0308",\u021E:"H\u030C",\u0124:"H\u0302",\u1E22:"H\u0307",\u1E28:"H\u0327",\u00CD:"I\u0301",\u00CC:"I\u0300",\u00CF:"I\u0308",\u1E2E:"I\u0308\u0301",\u0128:"I\u0303",\u012A:"I\u0304",\u012C:"I\u0306",\u01CF:"I\u030C",\u00CE:"I\u0302",\u0130:"I\u0307",\u0134:"J\u0302",\u1E30:"K\u0301",\u01E8:"K\u030C",\u0136:"K\u0327",\u0139:"L\u0301",\u013D:"L\u030C",\u013B:"L\u0327",\u1E3E:"M\u0301",\u1E40:"M\u0307",\u0143:"N\u0301",\u01F8:"N\u0300",\u00D1:"N\u0303",\u0147:"N\u030C",\u1E44:"N\u0307",\u0145:"N\u0327",\u00D3:"O\u0301",\u00D2:"O\u0300",\u00D6:"O\u0308",\u022A:"O\u0308\u0304",\u00D5:"O\u0303",\u1E4C:"O\u0303\u0301",\u1E4E:"O\u0303\u0308",\u022C:"O\u0303\u0304",\u014C:"O\u0304",\u1E52:"O\u0304\u0301",\u1E50:"O\u0304\u0300",\u014E:"O\u0306",\u01D1:"O\u030C",\u00D4:"O\u0302",\u1ED0:"O\u0302\u0301",\u1ED2:"O\u0302\u0300",\u1ED6:"O\u0302\u0303",\u022E:"O\u0307",\u0230:"O\u0307\u0304",\u0150:"O\u030B",\u1E54:"P\u0301",\u1E56:"P\u0307",\u0154:"R\u0301",\u0158:"R\u030C",\u1E58:"R\u0307",\u0156:"R\u0327",\u015A:"S\u0301",\u1E64:"S\u0301\u0307",\u0160:"S\u030C",\u1E66:"S\u030C\u0307",\u015C:"S\u0302",\u1E60:"S\u0307",\u015E:"S\u0327",\u0164:"T\u030C",\u1E6A:"T\u0307",\u0162:"T\u0327",\u00DA:"U\u0301",\u00D9:"U\u0300",\u00DC:"U\u0308",\u01D7:"U\u0308\u0301",\u01DB:"U\u0308\u0300",\u01D5:"U\u0308\u0304",\u01D9:"U\u0308\u030C",\u0168:"U\u0303",\u1E78:"U\u0303\u0301",\u016A:"U\u0304",\u1E7A:"U\u0304\u0308",\u016C:"U\u0306",\u01D3:"U\u030C",\u00DB:"U\u0302",\u016E:"U\u030A",\u0170:"U\u030B",\u1E7C:"V\u0303",\u1E82:"W\u0301",\u1E80:"W\u0300",\u1E84:"W\u0308",\u0174:"W\u0302",\u1E86:"W\u0307",\u1E8C:"X\u0308",\u1E8A:"X\u0307",\u00DD:"Y\u0301",\u1EF2:"Y\u0300",\u0178:"Y\u0308",\u1EF8:"Y\u0303",\u0232:"Y\u0304",\u0176:"Y\u0302",\u1E8E:"Y\u0307",\u0179:"Z\u0301",\u017D:"Z\u030C",\u1E90:"Z\u0302",\u017B:"Z\u0307",\u03AC:"\u03B1\u0301",\u1F70:"\u03B1\u0300",\u1FB1:"\u03B1\u0304",\u1FB0:"\u03B1\u0306",\u03AD:"\u03B5\u0301",\u1F72:"\u03B5\u0300",\u03AE:"\u03B7\u0301",\u1F74:"\u03B7\u0300",\u03AF:"\u03B9\u0301",\u1F76:"\u03B9\u0300",\u03CA:"\u03B9\u0308",\u0390:"\u03B9\u0308\u0301",\u1FD2:"\u03B9\u0308\u0300",\u1FD1:"\u03B9\u0304",\u1FD0:"\u03B9\u0306",\u03CC:"\u03BF\u0301",\u1F78:"\u03BF\u0300",\u03CD:"\u03C5\u0301",\u1F7A:"\u03C5\u0300",\u03CB:"\u03C5\u0308",\u03B0:"\u03C5\u0308\u0301",\u1FE2:"\u03C5\u0308\u0300",\u1FE1:"\u03C5\u0304",\u1FE0:"\u03C5\u0306",\u03CE:"\u03C9\u0301",\u1F7C:"\u03C9\u0300",\u038E:"\u03A5\u0301",\u1FEA:"\u03A5\u0300",\u03AB:"\u03A5\u0308",\u1FE9:"\u03A5\u0304",\u1FE8:"\u03A5\u0306",\u038F:"\u03A9\u0301",\u1FFA:"\u03A9\u0300"},gn=class t{constructor(e,r){this.mode=void 0,this.gullet=void 0,this.settings=void 0,this.leftrightDepth=void 0,this.nextToken=void 0,this.mode="math",this.gullet=new ul(e,r,this.mode),this.settings=r,this.leftrightDepth=0}expect(e,r){if(r===void 0&&(r=!0),this.fetch().text!==e)throw new te("Expected '"+e+"', got '"+this.fetch().text+"'",this.fetch());r&&this.consume()}consume(){this.nextToken=null}fetch(){return this.nextToken==null&&(this.nextToken=this.gullet.expandNextToken()),this.nextToken}switchMode(e){this.mode=e,this.gullet.switchMode(e)}parse(){this.settings.globalGroup||this.gullet.beginGroup(),this.settings.colorIsTextColor&&this.gullet.macros.set("\\color","\\textcolor");try{var e=this.parseExpression(!1);return this.expect("EOF"),this.settings.globalGroup||this.gullet.endGroup(),e}finally{this.gullet.endGroups()}}subparse(e){var r=this.nextToken;this.consume(),this.gullet.pushToken(new Wt("}")),this.gullet.pushTokens(e);var i=this.parseExpression(!1);return this.expect("}"),this.nextToken=r,i}parseExpression(e,r){for(var i=[];;){this.mode==="math"&&this.consumeSpaces();var o=this.fetch();if(t.endOfExpression.indexOf(o.text)!==-1||r&&o.text===r||e&&Gr[o.text]&&Gr[o.text].infix)break;var s=this.parseAtom(r);if(s){if(s.type==="internal")continue}else break;i.push(s)}return this.mode==="text"&&this.formLigatures(i),this.handleInfixNodes(i)}handleInfixNodes(e){for(var r=-1,i,o=0;o<e.length;o++)if(e[o].type==="infix"){if(r!==-1)throw new te("only one infix operator per group",e[o].token);r=o,i=e[o].replaceWith}if(r!==-1&&i){var s,n,a=e.slice(0,r),l=e.slice(r+1);a.length===1&&a[0].type==="ordgroup"?s=a[0]:s={type:"ordgroup",mode:this.mode,body:a},l.length===1&&l[0].type==="ordgroup"?n=l[0]:n={type:"ordgroup",mode:this.mode,body:l};var c;return i==="\\\\abovefrac"?c=this.callFunction(i,[s,e[r],n],[]):c=this.callFunction(i,[s,n],[]),[c]}else return e}handleSupSubscript(e){var r=this.fetch(),i=r.text;this.consume(),this.consumeSpaces();var o;do{var s;o=this.parseGroup(e)}while(((s=o)==null?void 0:s.type)==="internal");if(!o)throw new te("Expected group after '"+i+"'",r);return o}formatUnsupportedCmd(e){for(var r=[],i=0;i<e.length;i++)r.push({type:"textord",mode:"text",text:e[i]});var o={type:"text",mode:this.mode,body:r},s={type:"color",mode:this.mode,color:this.settings.errorColor,body:[o]};return s}parseAtom(e){var r=this.parseGroup("atom",e);if(r?.type==="internal"||this.mode==="text")return r;for(var i,o;;){this.consumeSpaces();var s=this.fetch();if(s.text==="\\limits"||s.text==="\\nolimits"){if(r&&r.type==="op"){var n=s.text==="\\limits";r.limits=n,r.alwaysHandleSupSub=!0}else if(r&&r.type==="operatorname")r.alwaysHandleSupSub&&(r.limits=s.text==="\\limits");else throw new te("Limit controls must follow a math operator",s);this.consume()}else if(s.text==="^"){if(i)throw new te("Double superscript",s);i=this.handleSupSubscript("superscript")}else if(s.text==="_"){if(o)throw new te("Double subscript",s);o=this.handleSupSubscript("subscript")}else if(s.text==="'"){if(i)throw new te("Double superscript",s);var a={type:"textord",mode:this.mode,text:"\\prime"},l=[a];for(this.consume();this.fetch().text==="'";)l.push(a),this.consume();this.fetch().text==="^"&&l.push(this.handleSupSubscript("superscript")),i={type:"ordgroup",mode:this.mode,body:l}}else if(nn[s.text]){var c=pd.test(s.text),f=[];for(f.push(new Wt(nn[s.text])),this.consume();;){var m=this.fetch().text;if(!nn[m]||pd.test(m)!==c)break;f.unshift(new Wt(nn[m])),this.consume()}var _=this.subparse(f);c?o={type:"ordgroup",mode:"math",body:_}:i={type:"ordgroup",mode:"math",body:_}}else break}return i||o?{type:"supsub",mode:this.mode,base:r,sup:i,sub:o}:r}parseFunction(e,r){var i=this.fetch(),o=i.text,s=Gr[o];if(!s)return null;if(this.consume(),r&&r!=="atom"&&!s.allowedInArgument)throw new te("Got function '"+o+"' with no arguments"+(r?" as "+r:""),i);if(this.mode==="text"&&!s.allowedInText)throw new te("Can't use function '"+o+"' in text mode",i);if(this.mode==="math"&&s.allowedInMath===!1)throw new te("Can't use function '"+o+"' in math mode",i);var{args:n,optArgs:a}=this.parseArguments(o,s);return this.callFunction(o,n,a,i,e)}callFunction(e,r,i,o,s){var n={funcName:e,parser:this,token:o,breakOnTokenText:s},a=Gr[e];if(a&&a.handler)return a.handler(n,r,i);throw new te("No function handler for "+e)}parseArguments(e,r){var i=r.numArgs+r.numOptionalArgs;if(i===0)return{args:[],optArgs:[]};for(var o=[],s=[],n=0;n<i;n++){var a=r.argTypes&&r.argTypes[n],l=n<r.numOptionalArgs;(r.primitive&&a==null||r.type==="sqrt"&&n===1&&s[0]==null)&&(a="primitive");var c=this.parseGroupOfType("argument to '"+e+"'",a,l);if(l)s.push(c);else if(c!=null)o.push(c);else throw new te("Null argument, please report this as a bug")}return{args:o,optArgs:s}}parseGroupOfType(e,r,i){switch(r){case"color":return this.parseColorGroup(i);case"size":return this.parseSizeGroup(i);case"url":return this.parseUrlGroup(i);case"math":case"text":return this.parseArgumentGroup(i,r);case"hbox":{var o=this.parseArgumentGroup(i,"text");return o!=null?{type:"styling",mode:o.mode,body:[o],style:"text"}:null}case"raw":{var s=this.parseStringGroup("raw",i);return s!=null?{type:"raw",mode:"text",string:s.text}:null}case"primitive":{if(i)throw new te("A primitive argument cannot be optional");var n=this.parseGroup(e);if(n==null)throw new te("Expected group as "+e,this.fetch());return n}case"original":case null:case void 0:return this.parseArgumentGroup(i);default:throw new te("Unknown group type as "+e,this.fetch())}}consumeSpaces(){for(;this.fetch().text===" ";)this.consume()}parseStringGroup(e,r){var i=this.gullet.scanArgument(r);if(i==null)return null;for(var o="",s;(s=this.fetch()).text!=="EOF";)o+=s.text,this.consume();return this.consume(),i.text=o,i}parseRegexGroup(e,r){for(var i=this.fetch(),o=i,s="",n;(n=this.fetch()).text!=="EOF"&&e.test(s+n.text);)o=n,s+=o.text,this.consume();if(s==="")throw new te("Invalid "+r+": '"+i.text+"'",i);return i.range(o,s)}parseColorGroup(e){var r=this.parseStringGroup("color",e);if(r==null)return null;var i=/^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(r.text);if(!i)throw new te("Invalid color: '"+r.text+"'",r);var o=i[0];return/^[0-9a-f]{6}$/i.test(o)&&(o="#"+o),{type:"color-token",mode:this.mode,color:o}}parseSizeGroup(e){var r,i=!1;if(this.gullet.consumeSpaces(),!e&&this.gullet.future().text!=="{"?r=this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,"size"):r=this.parseStringGroup("size",e),!r)return null;!e&&r.text.length===0&&(r.text="0pt",i=!0);var o=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(r.text);if(!o)throw new te("Invalid size: '"+r.text+"'",r);var s={number:+(o[1]+o[2]),unit:o[3]};if(!vd(s))throw new te("Invalid unit: '"+s.unit+"'",r);return{type:"size",mode:this.mode,value:s,isBlank:i}}parseUrlGroup(e){this.gullet.lexer.setCatcode("%",13),this.gullet.lexer.setCatcode("~",12);var r=this.parseStringGroup("url",e);if(this.gullet.lexer.setCatcode("%",14),this.gullet.lexer.setCatcode("~",13),r==null)return null;var i=r.text.replace(/\\([#$%&~_^{}])/g,"$1");return{type:"url",mode:this.mode,url:i}}parseArgumentGroup(e,r){var i=this.gullet.scanArgument(e);if(i==null)return null;var o=this.mode;r&&this.switchMode(r),this.gullet.beginGroup();var s=this.parseExpression(!1,"EOF");this.expect("EOF"),this.gullet.endGroup();var n={type:"ordgroup",mode:this.mode,loc:i.loc,body:s};return r&&this.switchMode(o),n}parseGroup(e,r){var i=this.fetch(),o=i.text,s;if(o==="{"||o==="\\begingroup"){this.consume();var n=o==="{"?"}":"\\endgroup";this.gullet.beginGroup();var a=this.parseExpression(!1,n),l=this.fetch();this.expect(n),this.gullet.endGroup(),s={type:"ordgroup",mode:this.mode,loc:Lt.range(i,l),body:a,semisimple:o==="\\begingroup"||void 0}}else if(s=this.parseFunction(r,e)||this.parseSymbol(),s==null&&o[0]==="\\"&&!ap.hasOwnProperty(o)){if(this.settings.throwOnError)throw new te("Undefined control sequence: "+o,i);s=this.formatUnsupportedCmd(o),this.consume()}return s}formLigatures(e){for(var r=e.length-1,i=0;i<r;++i){var o=e[i],s=o.text;s==="-"&&e[i+1].text==="-"&&(i+1<r&&e[i+2].text==="-"?(e.splice(i,3,{type:"textord",mode:"text",loc:Lt.range(o,e[i+2]),text:"---"}),r-=2):(e.splice(i,2,{type:"textord",mode:"text",loc:Lt.range(o,e[i+1]),text:"--"}),r-=1)),(s==="'"||s==="`")&&e[i+1].text===s&&(e.splice(i,2,{type:"textord",mode:"text",loc:Lt.range(o,e[i+1]),text:s+s}),r-=1)}}parseSymbol(){var e=this.fetch(),r=e.text;if(/^\\verb[^a-zA-Z]/.test(r)){this.consume();var i=r.slice(5),o=i.charAt(0)==="*";if(o&&(i=i.slice(1)),i.length<2||i.charAt(0)!==i.slice(-1))throw new te(`\\verb assertion failed --
                    please report what input caused this bug`);return i=i.slice(1,-1),{type:"verb",mode:"text",body:i,star:o}}fd.hasOwnProperty(r[0])&&!Pe[this.mode][r[0]]&&(this.settings.strict&&this.mode==="math"&&this.settings.reportNonstrict("unicodeTextInMathMode",'Accented Unicode text character "'+r[0]+'" used in math mode',e),r=fd[r[0]]+r.slice(1));var s=Ob.exec(r);s&&(r=r.substring(0,s.index),r==="i"?r="\u0131":r==="j"&&(r="\u0237"));var n;if(Pe[this.mode][r]){this.settings.strict&&this.mode==="math"&&il.indexOf(r)>=0&&this.settings.reportNonstrict("unicodeTextInMathMode",'Latin-1/Unicode text character "'+r[0]+'" used in math mode',e);var a=Pe[this.mode][r].group,l=Lt.range(e),c;if(Mv.hasOwnProperty(a)){var f=a;c={type:"atom",mode:this.mode,family:f,loc:l,text:r}}else c={type:a,mode:this.mode,loc:l,text:r};n=c}else if(r.charCodeAt(0)>=128)this.settings.strict&&(gd(r.charCodeAt(0))?this.mode==="math"&&this.settings.reportNonstrict("unicodeTextInMathMode",'Unicode text character "'+r[0]+'" used in math mode',e):this.settings.reportNonstrict("unknownSymbol",'Unrecognized Unicode character "'+r[0]+'"'+(" ("+r.charCodeAt(0)+")"),e)),n={type:"textord",mode:"text",loc:Lt.range(e),text:r};else return null;if(this.consume(),s)for(var m=0;m<s[0].length;m++){var _=s[0][m];if(!Qa[_])throw new te("Unknown accent ' "+_+"'",e);var g=Qa[_][this.mode]||Qa[_].text;if(!g)throw new te("Accent "+_+" unsupported in "+this.mode+" mode",e);n={type:"accent",mode:this.mode,loc:Lt.range(e),label:g,isStretchy:!1,isShifty:!0,base:n}}return n}};gn.endOfExpression=["}","\\endgroup","\\end","\\right","&"];var Tl=function(e,r){if(!(typeof e=="string"||e instanceof String))throw new TypeError("KaTeX can only parse string typed expression");var i=new gn(e,r);delete i.gullet.macros.current["\\df@tag"];var o=i.parse();if(delete i.gullet.macros.current["\\current@color"],delete i.gullet.macros.current["\\color"],i.gullet.macros.get("\\df@tag")){if(!r.displayMode)throw new te("\\tag works only in display equations");o=[{type:"tag",mode:"text",body:o,tag:i.subparse([new Wt("\\df@tag")])}]}return o},lp=function(e,r,i){r.textContent="";var o=Ml(e,i).toNode();r.appendChild(o)};typeof document<"u"&&document.compatMode!=="CSS1Compat"&&(typeof console<"u"&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."),lp=function(){throw new te("KaTeX doesn't work in quirks mode.")});var Hb=function(e,r){var i=Ml(e,r).toMarkup();return i},Fb=function(e,r){var i=new Fs(r);return Tl(e,i)},cp=function(e,r,i){if(i.throwOnError||!(e instanceof te))throw e;var o=U.makeSpan(["katex-error"],[new Et(r)]);return o.setAttribute("title",e.toString()),o.setAttribute("style","color:"+i.errorColor),o},Ml=function(e,r){var i=new Fs(r);try{var o=Tl(e,i);return Zv(o,e,i)}catch(s){return cp(s,e,i)}},Nb=function(e,r){var i=new Fs(r);try{var o=Tl(e,i);return Jv(o,e,i)}catch(s){return cp(s,e,i)}},qb="0.16.22",Vb={Span:vi,Anchor:qs,SymbolNode:Et,SvgNode:er,PathNode:cr,LineNode:Vs},hp={version:qb,render:lp,renderToString:Hb,ParseError:te,SETTINGS_SCHEMA:an,__parse:Fb,__renderToDomTree:Ml,__renderToHTMLTree:Nb,__setFontMetrics:xv,__defineSymbol:b,__defineFunction:ae,__defineMacro:M,__domTree:Vb};var Ub=/^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/,Wb=/^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1/,jb=/^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;function dp(t={}){return{extensions:[Gb(t,up(t,!1)),Kb(t,up(t,!0))]}}function up(t,e){return r=>hp.renderToString(r.text,{...t,displayMode:r.displayMode})+(e?`
`:"")}function Gb(t,e){let r=t&&t.nonStandard,i=r?Wb:Ub;return{name:"inlineKatex",level:"inline",start(o){let s,n=o;for(;n;){if(s=n.indexOf("$"),s===-1)return;if((r?s>-1:s===0||n.charAt(s-1)===" ")&&n.substring(s).match(i))return s;n=n.substring(s+1).replace(/^\$+/,"")}},tokenizer(o,s){let n=o.match(i);if(n)return{type:"inlineKatex",raw:n[0],text:n[2].trim(),displayMode:n[1].length===2}},renderer:e}}function Kb(t,e){return{name:"blockKatex",level:"block",tokenizer(r,i){let o=r.match(jb);if(o)return{type:"blockKatex",raw:o[0],text:o[2].trim(),displayMode:o[1].length===2}},renderer:e}}var Xb={throwOnError:!1,output:"mathml",strict:"warn"},Yb={...Xb,nonStandard:!1};Le.use(dp(Yb));var Sn=class extends Gt(Ke){render(){let r=this.querySelector('script[type="text/markdown"]')?.textContent;return W`${Wr(Le.parse(r))}`}};Sn=ut([Ot("tbx-markdown")],Sn);var Ki=class extends Gt(Ke){render(){let e=Zb.format(Vn.get());return W`<p>Hello ${this.name}! The time is ${e}.</p>`}};Ki.styles=ue`
    p {
      color: darkblue;
    }
  `,ut([z()],Ki.prototype,"name",2),Ki=ut([Ot("tbx-testelement")],Ki);var Zb=new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"numeric",second:"numeric"});$e.define("sl-icon");var pp="tbx-theme",Jb="sl-theme-dark",Qb="sl-theme-light",fp="(prefers-color-scheme: dark)";function e2(t){return e=>{customElements.get(t)==null&&customElements.define(t,e)}}var Rl=new Set,Rr="light",Ll=!1;function js(){return typeof window<"u"&&typeof document<"u"}function Dl(t){if(!js())return;let e=document.documentElement;e.classList.toggle(Jb,t==="dark"),e.classList.toggle(Qb,t==="light"),e.style.colorScheme=t}function mp(t){Rl.forEach(e=>e(t))}function t2(){if(!js())return null;try{let t=window.localStorage.getItem(pp);if(t==="light"||t==="dark")return t}catch{}return null}function r2(t){if(js())try{window.localStorage.setItem(pp,t)}catch{}}function i2(){let t=t2();return t!==null?(Ll=!0,t):js()&&window.matchMedia(fp).matches?"dark":"light"}function s2(t,e=!0){let r=Rr!==t;Rr=t,Dl(t),e&&(Ll=!0,r2(t)),r&&mp(t)}function o2(t){return Rl.add(t),t(Rr),()=>Rl.delete(t)}function n2(){if(!js())return;Rr=i2(),Dl(Rr);let t=window.matchMedia(fp),e=r=>{if(Ll)return;let i=r.matches?"dark":"light";i!==Rr&&(Rr=i,Dl(Rr),mp(Rr))};typeof t.addEventListener=="function"?t.addEventListener("change",e):typeof t.addListener=="function"&&t.addListener(e)}n2();var kn=class extends HTMLElement{constructor(){super(...arguments);this.switchEl=null;this.iconEl=null;this.unsubscribe=null;this.handleToggle=r=>{let o=r.currentTarget.checked?"dark":"light";s2(o)}}connectedCallback(){this.shadowRoot==null&&(this.attachShadow({mode:"open"}),this.render());let r=this.shadowRoot;r!=null&&(this.switchEl=r.querySelector("sl-switch"),this.iconEl=r.querySelector("sl-icon"),this.switchEl!=null&&this.switchEl.addEventListener("sl-change",this.handleToggle),this.unsubscribe=o2(i=>{this.updateUI(i)}))}disconnectedCallback(){this.switchEl!=null&&this.switchEl.removeEventListener("sl-change",this.handleToggle),this.unsubscribe!=null&&(this.unsubscribe(),this.unsubscribe=null)}updateUI(r){let i=r==="dark",o=this.switchEl,s=this.iconEl;o!=null&&o.checked!==i&&(o.checked=i),o?.setAttribute("aria-label",i?"Activate light mode":"Activate dark mode"),s?.setAttribute("name",i?"moon":"sun")}render(){let r=this.shadowRoot;r!=null&&(r.innerHTML=`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
        }

        sl-icon {
          margin-inline-start: 0.5rem;
          font-size: 1.2rem;
        }
      </style>
      <sl-switch size="small"></sl-switch>
      <sl-icon name="sun"></sl-icon>
    `)}};kn=ut([e2("tbx-theme-toggle")],kn);ns("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/dist/");n0();
/*! Bundled license information:

signal-polyfill/dist/index.js:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
  (**
   * @license
   * Copyright 2024 Bloomberg Finance L.P.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@lit-labs/signals/lib/signal-watcher.js:
@lit-labs/signals/lib/watch.js:
@lit-labs/signals/lib/html-tag.js:
@lit-labs/signals/index.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
lit-html/lit-html.js:
lit-html/async-directive.js:
@lit/reactive-element/reactive-element.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/ref.js:
lit-html/static.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
