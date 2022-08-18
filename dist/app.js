(()=>{var Tt=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var r=(n,e,t)=>(Tt(n,e,"read from private field"),t?t.call(n):e.get(n)),u=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)},m=(n,e,t,i)=>(Tt(n,e,"write to private field"),i?i.call(n,t):e.set(n,t),t);var x=(n,e,t)=>new Promise((i,o)=>{var s=c=>{try{E(t.next(c))}catch(y){o(y)}},d=c=>{try{E(t.throw(c))}catch(y){o(y)}},E=c=>c.done?i(c.value):Promise.resolve(c.value).then(s,d);E((t=t.apply(n,e)).next())});var Mt=(i=>(i[i.EASY=0]="EASY",i[i.NORMAL=1]="NORMAL",i[i.HARD=2]="HARD",i))(Mt||{}),rt=[0,1,2],Zt={[0]:"Easy",[1]:"Normal",[2]:"Hard"},X=n=>{var e;return(e=Zt[n])!=null?e:"Invalid"},Dt=n=>{let e=parseInt(n);if(!rt.includes(e))throw new TypeError(`Invalid Difficulty: ${n}`);return e},I=Mt;var Gt=(o=>(o[o.UNKNOWN=-1]="UNKNOWN",o[o.WRONG=0]="WRONG",o[o.WRONG_PLACE=1]="WRONG_PLACE",o[o.RIGHT=2]="RIGHT",o))(Gt||{}),b=Gt;var ot=class extends TypeError{},tt=ot;var at=[{label:"Animals",path:"./lists/themes/animals.json"}],lt=n=>{let[e]=at.filter(t=>t.path===n);if(!e)throw new tt(`Unknown theme '${n}'.`);return e},St=n=>{var e;return(e=lt(n).label)!=null?e:"Unknown"};var Wt=[3,4,5],zt={3:"./lists/3-letter.json",4:"./lists/4-letter.json",5:"./lists/5-letter.json"},ht=new Map,Ht=n=>(ht.has(n)||ht.set(n,fetch(zt[n]).then(e=>e.json())),ht.get(n));var Nt=(t=>(t[t.FREE_PLAY=0]="FREE_PLAY",t[t.THEMED=1]="THEMED",t))(Nt||{}),dt=[0,1],Jt={[0]:"Free Play",[1]:"Themed"},et=n=>{var e;return(e=Jt[n])!=null?e:"Invalid"},Pt=n=>{let e=parseInt(n);if(!dt.includes(e))throw new TypeError(`Invalid Mode: ${n}`);return e},A=Nt;var S,K,$,W,H,R,N,G,pt=class{constructor(e){u(this,S,void 0);u(this,K,I.EASY);u(this,$,void 0);u(this,W,{});u(this,H,void 0);u(this,R,void 0);u(this,N,"");u(this,G,[]);m(this,R,e)}addAllValidWords(e){return x(this,null,function*(){yield Promise.all(e.map(t=>this.addValidWords(t)))})}addValidWords(e){return x(this,null,function*(){(yield Ht(e)).forEach(i=>r(this,G).push(i.toUpperCase()))})}currentTarget(){return r(this,S)}currentWordLength(){return r(this,S).word.length}difficulty(){return r(this,K)}letterScore(e){var t;return(t=r(this,W)[e])!=null?t:b.UNKNOWN}mode(){return r(this,H)}score(e){let t=[...r(this,S).word];return t.reduce((i,o,s)=>(o===e[s]&&(r(this,W)[o]=i[s]=b.RIGHT,t[s]=null),i),new Array(this.currentWordLength()).fill(b.UNKNOWN)).map((i,o)=>{if(i===b.RIGHT)return i;let s=t.indexOf(e[o]);return s>-1?(t[s]=null,r(this,W)[e[o]]=b.WRONG_PLACE):r(this,W)[e[o]]=b.WRONG})}setDifficulty(e){m(this,K,e)}setFreePlay(e){return x(this,null,function*(){yield this.addAllValidWords(e);let t=r(this,G)[Math.floor(r(this,G).length*Math.random())].toUpperCase();m(this,S,{word:t,difficulty:0,clues:[]})})}setLengths(e){m(this,$,e)}setMode(e){m(this,H,e)}setThemedGame(e,t){return x(this,null,function*(){let i=lt(e);m(this,N,e);let s=(yield(yield fetch(i.path)).json()).words.filter(v=>v.difficulty<=t),d=s.reduce((v,{word:T})=>(v.includes(T.length)||v.push(T.length),v),[]);yield this.addAllValidWords(d),s.map(({word:v})=>v.toUpperCase()).forEach(v=>{r(this,G).includes(v)||r(this,G).push(v)});let{word:E,difficulty:c,clues:y}=s[Math.floor(s.length*Math.random())];m(this,S,{word:E.toUpperCase(),difficulty:c,clues:y})})}setTheme(e){m(this,N,e)}start(){return x(this,null,function*(){if(r(this,H)===A.THEMED&&!r(this,N))throw new tt("Expected `theme` when using `Mode.THEMED`.");if(m(this,W,{}),r(this,H)===A.THEMED){yield this.setThemedGame(r(this,N),r(this,K)),r(this,R).call(this);return}if(r(this,H)===A.FREE_PLAY){yield this.setFreePlay(r(this,$)),r(this,R).call(this);return}})}theme(){return r(this,N)}validate(e){return r(this,G).includes(e.join(""))}};S=new WeakMap,K=new WeakMap,$=new WeakMap,W=new WeakMap,H=new WeakMap,R=new WeakMap,N=new WeakMap,G=new WeakMap;var Ot=pt;var f;(function(n){n.Attribute="attribute",n.Pseudo="pseudo",n.PseudoElement="pseudo-element",n.Tag="tag",n.Universal="universal",n.Adjacent="adjacent",n.Child="child",n.Descendant="descendant",n.Parent="parent",n.Sibling="sibling",n.ColumnCombinator="column-combinator"})(f||(f={}));var w;(function(n){n.Any="any",n.Element="element",n.End="end",n.Equals="equals",n.Exists="exists",n.Hyphen="hyphen",n.Not="not",n.Start="start"})(w||(w={}));var kt=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,Xt=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,It=new Map([[126,w.Element],[94,w.Start],[36,w.End],[42,w.Any],[33,w.Not],[124,w.Hyphen]]),te=new Set(["has","not","matches","is","where","host","host-context"]);function Kt(n){switch(n.type){case f.Adjacent:case f.Child:case f.Descendant:case f.Parent:case f.Sibling:case f.ColumnCombinator:return!0;default:return!1}}var ee=new Set(["contains","icontains"]);function ne(n,e,t){let i=parseInt(e,16)-65536;return i!==i||t?e:i<0?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,i&1023|56320)}function F(n){return n.replace(Xt,ne)}function ut(n){return n===39||n===34}function xt(n){return n===32||n===9||n===10||n===12||n===13}function ct(n){let e=[],t=Rt(e,`${n}`,0);if(t<n.length)throw new Error(`Unmatched selector: ${n.slice(t)}`);return e}function Rt(n,e,t){let i=[];function o(a){let h=e.slice(t+a).match(kt);if(!h)throw new Error(`Expected name, found ${e.slice(t)}`);let[p]=h;return t+=a+p.length,F(p)}function s(a){for(t+=a;t<e.length&&xt(e.charCodeAt(t));)t++}function d(){t+=1;let a=t,h=1;for(;h>0&&t<e.length;t++)e.charCodeAt(t)===40&&!E(t)?h++:e.charCodeAt(t)===41&&!E(t)&&h--;if(h)throw new Error("Parenthesis not matched");return F(e.slice(a,t-1))}function E(a){let h=0;for(;e.charCodeAt(--a)===92;)h++;return(h&1)===1}function c(){if(i.length>0&&Kt(i[i.length-1]))throw new Error("Did not expect successive traversals.")}function y(a){if(i.length>0&&i[i.length-1].type===f.Descendant){i[i.length-1].type=a;return}c(),i.push({type:a})}function v(a,h){i.push({type:f.Attribute,name:a,action:h,value:o(1),namespace:null,ignoreCase:"quirks"})}function T(){if(i.length&&i[i.length-1].type===f.Descendant&&i.pop(),i.length===0)throw new Error("Empty sub-selector");n.push(i)}if(s(0),e.length===t)return t;t:for(;t<e.length;){let a=e.charCodeAt(t);switch(a){case 32:case 9:case 10:case 12:case 13:{(i.length===0||i[0].type!==f.Descendant)&&(c(),i.push({type:f.Descendant})),s(1);break}case 62:{y(f.Child),s(1);break}case 60:{y(f.Parent),s(1);break}case 126:{y(f.Sibling),s(1);break}case 43:{y(f.Adjacent),s(1);break}case 46:{v("class",w.Element);break}case 35:{v("id",w.Equals);break}case 91:{s(1);let h,p=null;e.charCodeAt(t)===124?h=o(1):e.startsWith("*|",t)?(p="*",h=o(2)):(h=o(0),e.charCodeAt(t)===124&&e.charCodeAt(t+1)!==61&&(p=h,h=o(1))),s(0);let M=w.Exists,At=It.get(e.charCodeAt(t));if(At){if(M=At,e.charCodeAt(t+1)!==61)throw new Error("Expected `=`");s(2)}else e.charCodeAt(t)===61&&(M=w.Equals,s(1));let it="",st=null;if(M!=="exists"){if(ut(e.charCodeAt(t))){let J=e.charCodeAt(t),k=t+1;for(;k<e.length&&(e.charCodeAt(k)!==J||E(k));)k+=1;if(e.charCodeAt(k)!==J)throw new Error("Attribute value didn't end");it=F(e.slice(t+1,k)),t=k+1}else{let J=t;for(;t<e.length&&(!xt(e.charCodeAt(t))&&e.charCodeAt(t)!==93||E(t));)t+=1;it=F(e.slice(J,t))}s(0);let Ct=e.charCodeAt(t)|32;Ct===115?(st=!1,s(1)):Ct===105&&(st=!0,s(1))}if(e.charCodeAt(t)!==93)throw new Error("Attribute selector didn't terminate");t+=1;let Qt={type:f.Attribute,name:h,action:M,value:it,namespace:p,ignoreCase:st};i.push(Qt);break}case 58:{if(e.charCodeAt(t+1)===58){i.push({type:f.PseudoElement,name:o(2).toLowerCase(),data:e.charCodeAt(t)===40?d():null});continue}let h=o(1).toLowerCase(),p=null;if(e.charCodeAt(t)===40)if(te.has(h)){if(ut(e.charCodeAt(t+1)))throw new Error(`Pseudo-selector ${h} cannot be quoted`);if(p=[],t=Rt(p,e,t+1),e.charCodeAt(t)!==41)throw new Error(`Missing closing parenthesis in :${h} (${e})`);t+=1}else{if(p=d(),ee.has(h)){let M=p.charCodeAt(0);M===p.charCodeAt(p.length-1)&&ut(M)&&(p=p.slice(1,-1))}p=F(p)}i.push({type:f.Pseudo,name:h,data:p});break}case 44:{T(),i=[],s(1);break}default:{if(e.startsWith("/*",t)){let M=e.indexOf("*/",t+2);if(M<0)throw new Error("Comment was not terminated");t=M+2,i.length===0&&s(0);break}let h=null,p;if(a===42)t+=1,p="*";else if(a===124){if(p="",e.charCodeAt(t+1)===124){y(f.ColumnCombinator),s(2);break}}else if(kt.test(e.slice(t)))p=o(0);else break t;e.charCodeAt(t)===124&&e.charCodeAt(t+1)!==124&&(h=p,e.charCodeAt(t+1)===42?(p="*",t+=2):p=o(1)),i.push(p==="*"?{type:f.Universal,namespace:h}:{type:f.Tag,name:p,namespace:h})}}}return T(),t}var ft=n=>{for(;n.hasChildNodes();)n.firstChild.remove()},L=(n,e,t,i)=>n.addEventListener(e,t,i),ie=(n,e,t,i)=>{e.forEach(o=>L(n,o,t,i))},l=(n,...e)=>{let[t]=ct(n).map(i=>i.reduce((o,s)=>{var d;return o===null&&s.type!=="tag"&&(o=document.createElement("div")),s.type==="tag"?document.createElement(s.name):(s.type==="attribute"&&s.name!=="class"&&o.setAttribute(s.name,(d=s.value)!=null?d:""),s.type==="attribute"&&s.name==="class"&&o.classList.add(s.value),o)},null));return e.forEach(i=>t.append(i)),t},g=n=>document.createTextNode(n),B,mt=class{constructor(e,...t){u(this,B,void 0);m(this,B,l(e,...t))}addClass(...e){this.element().classList.add(...e)}append(...e){return this.element().append(...e)}element(){return r(this,B)}empty(){ft(this.element())}on(e,t,i){L(this.element(),e,t,i)}onEach(e,t,i){ie(this.element(),e,t,i)}removeClass(...e){this.element().classList.remove(...e)}};B=new WeakMap;var C=mt;var j,Et=class extends C{constructor(){super('span.letter[tabindex="-1"]');u(this,j,"")}hasValue(){return r(this,j)!==""}highlight(t){if(t===b.RIGHT){this.element().classList.add("right");return}if(t===b.WRONG_PLACE){this.element().classList.add("wrong-place");return}if(t===b.WRONG){this.element().classList.add("wrong");return}}setValue(t){m(this,j,t),this.empty(),this.append(g(t))}value(){return r(this,j)}};j=new WeakMap;var nt=Et;var D,q,gt=class extends C{constructor(t){super(".guess");u(this,D,[]);u(this,q,void 0);m(this,q,t);for(let i=0;i<t;i++)r(this,D).push(new nt);this.append(...r(this,D).map(i=>i.element()))}applyScore(t){r(this,D).forEach((i,o)=>i.highlight(t[o]))}clearError(){this.element().classList.remove("error")}guess(){return r(this,D).map(t=>t.value())}highlightError(){this.element().classList.add("error")}length(){return r(this,D).filter(t=>t.hasValue()).length}onInput(t){if(!(t==="Backspace"&&this.length()===0)){if(t==="Backspace"){this.clearError(),r(this,D)[this.length()-1].setValue("");return}this.length()!==r(this,q)&&r(this,D)[this.length()].setValue(t)}}};D=new WeakMap,q=new WeakMap;var jt=gt;var Y,P,U,vt=class extends C{constructor(t){super('section.guesses[tabindex="0"][aria-label="Enter your guess"][autofocus]');u(this,Y,!1);u(this,P,void 0);u(this,U,[]);m(this,P,t),this.addGuess()}addGuess(){r(this,U).push(new jt(r(this,P).currentWordLength())),this.append(this.currentGuess().element()),this.element().scrollTo({top:this.element().scrollHeight})}currentGuess(){return r(this,U)[r(this,U).length-1]}onInput(t){if(r(this,Y))return;let i=this.currentGuess().guess(),o=this.currentGuess().length()===r(this,P).currentWordLength(),s=r(this,P).validate(i);if(t==="Enter"&&o&&s){let d=r(this,P).score(i);if(this.currentGuess().applyScore(d),d.every(E=>E===b.RIGHT)){m(this,Y,!0);return}this.addGuess();return}t==="Enter"&&o&&!s&&this.currentGuess().highlightError(),t==="Backspace"&&this.currentGuess().onInput(t),t.match(/^[A-Z]$/i)&&this.currentGuess().onInput(t.toUpperCase())}};Y=new WeakMap,P=new WeakMap,U=new WeakMap;var Ut=vt;var V,yt=class extends C{constructor(...t){super('dialog[tabindex="0"]');u(this,V,void 0);m(this,V,l(".content",...t)),this.element().append(r(this,V)),document.body.append(this.element()),this.bindEvents()}append(...t){r(this,V).append(...t)}bindEvents(){this.on("click",t=>{t.target===this.element()&&this.close()}),this.on("keydown",t=>{t.key==="Escape"&&this.close()})}close(){this.element().removeAttribute("open")}open(){this.element().setAttribute("open",""),this.element().focus()}setLabel(t){this.element().setAttribute("aria-label",t)}};V=new WeakMap;var Vt=yt;var $t=n=>n.setAttribute("hidden",""),Ft=n=>n.removeAttribute("hidden"),bt=class extends Vt{constructor(e){super(l("h2",g("Options"))),this.addClass("options"),this.setLabel("Options dialog. Close with Escape key");let t=l("select#mode",...dt.map(a=>l(`option[value="${a}"]`+(a===e.mode()?"[selected]":""),g(et(a))))),i=l("select#theme",...at.map(({label:a,path:h})=>l(`option[value="${h}"]`+(h===e.theme()?"[selected]":""),g(a)))),o=l("select#difficulty",...rt.map(a=>l(`option[value="${a}"]`+(a===e.difficulty()?"[selected]":""),g(X(a))))),s=l("fieldset",l('label[for="mode"][aria-label="Choose game mode"]',g("Game mode")),t),d=l("fieldset"+(e.mode()!==A.THEMED?"[hidden]":""),l('label[for="mode"][aria-label="Choose theme"]',g("Theme")),i),E=l("fieldset"+(e.mode()!==A.THEMED?"[hidden]":""),l('label[for="difficulty"][aria-label="Choose difficulty"]',g("Difficulty")),o),c=l("button",g("Apply")),y=a=>{if(a=Pt(a),e.setMode(a),a===A.THEMED){Ft(E),Ft(d);return}$t(E),$t(d)},v=a=>e.setTheme(a),T=a=>e.setDifficulty(Dt(a));L(t,"change",()=>y(t.value)),L(i,"change",()=>v(i.value)),L(o,"change",()=>T(o.value)),L(c,"click",()=>{e.start(),this.close()}),this.append(l("div",s,d,E,l("fieldset",c)))}},Bt=bt;var wt=class extends C{constructor(e){super("nav.header",l("header",l("h1",g("Wordle Kids")),l("section.actions")),l("h3",g(et(e.mode())+(e.mode()===A.THEMED?` (${St(e.theme())}) - ${X(e.difficulty())}`:""))),l("p",g("A kid-friendly Wordle clone with small words and clues.")),l(".clues"));let t=this.element().querySelector(".clues"),i=new Bt(e),o=this.element().querySelector("section.actions"),s=l('button[title="New game"]',g("\u21BB")),d=l('button[title="Get a hint"]',g("?")),E=l('button[title="Options"]',g("\u2699"));L(s,"click",c=>{e.start(),c.preventDefault(),c.stopPropagation()}),L(d,"click",c=>{var T;let y=t.childNodes.length,v=(T=e.currentTarget().clues)!=null?T:[];c.preventDefault(),c.stopPropagation(),y===v.length&&t.append(l("p",g("No more clues!"))),!(y>=v.length)&&t.append(l("p",g(v[y])))}),L(E,"click",c=>{i.open(),c.preventDefault(),c.stopPropagation()}),o.append(s,d,E)}},qt=wt;var Yt={["Backspace"]:"\u232B"},_,Q,Z,z,Lt=class extends C{constructor(t,i){super("section.keyboard[autofocus]");u(this,_,void 0);u(this,Q,void 0);u(this,Z,{});u(this,z,[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Backspace","Z","X","C","V","B","N","M","Enter"]]);this.append(...r(this,z).map(o=>l("section.row",...o.map(s=>{var E;let d=new nt;return r(this,Z)[s]=d,d.setValue(s),d.element().setAttribute("data-key",s),Object.prototype.hasOwnProperty.call(Yt,s)&&(d.empty(),d.append(g((E=Yt[s])!=null?E:s))),d.on("click",()=>this.handleInput(s)),d.element()})))),m(this,Q,t),m(this,_,i),this.bindKeyboard()}bindKeyboard(){L(document,"keydown",t=>this.handleInput(t.key))}handleInput(t){r(this,Q).onInput(t),r(this,z).flat().forEach(i=>{let o=r(this,Z)[i],s=r(this,_).letterScore(i);o.highlight(s)})}};_=new WeakMap,Q=new WeakMap,Z=new WeakMap,z=new WeakMap;var _t=Lt;var O=new Ot(()=>{let n=new qt(O),e=new Ut(O),t=new _t(e,O),i=document.getElementById("app");ft(i),i.append(n.element(),e.element(),t.element())});O.setDifficulty(I.EASY);O.setLengths(Wt);O.setMode(A.THEMED);O.setTheme("./lists/themes/animals.json");O.start();})();
//# sourceMappingURL=app.js.map
