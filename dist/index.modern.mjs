function e(){return e=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)({}).hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},e.apply(null,arguments)}class t{constructor({name:e,formElement:t,validator:s,onInput:r}){this.isDisabled=!1,this.element=null,this.errorMsgElement=null,this.validator=null,this.validate=()=>{var e,t;return null==(e=null==(t=this.validator)?void 0:t.call(this,this.getValue()))||e},this.getValue=()=>null!==this.element?this.element.value:"",this.reset=()=>{null!==this.element&&(this.element.value="")};const n=t.querySelector(`[data-bhwf-input="${e}"]`),i=t.querySelector(`[data-bhwf-error-msg="${e}"]`);this.isDisabled=null===n,this.isDisabled||(this.element=n,this.errorMsgElement=i,this.validator=s||null,r&&(null==n||n.addEventListener("input",e=>{var t;return r((null==(t=e.target)?void 0:t.value)||"")})))}}class s extends t{constructor(e){super({name:"description",formElement:e,validator:e=>{const t=e.length>50;var s;return!1===t&&(null==(s=this.element)||s.classList.add("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="Description must be at least 50 characters long")),t},onInput:()=>{var e;null==(e=this.element)||e.classList.remove("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="")}})}}const r="https://app.betahub.io",n=async({projectId:e,title:t,description:s,stepsToReproduce:n})=>{const i=new URLSearchParams;t&&i.append("issue[title]",t),i.append("issue[description]",s),n&&i.append("issue[unformatted_steps_to_reproduce]",n);const o=await fetch(`${r}/projects/${e}/issues.json`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded",Authorization:"FormUser anonymous","BetaHub-Project-ID":e},body:i.toString()});if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);return o.json()},i=async({projectId:e,issueId:t,screenshot:s})=>{const n=new FormData;n.append("screenshot[image]",s);const i=await fetch(`${r}/projects/${e}/issues/g-${t}/screenshots`,{method:"POST",headers:{Accept:"application/json",Authorization:"FormUser anonymous","BetaHub-Project-ID":e},body:n});if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return i.json()},o=async({projectId:e,issueId:t,videoClip:s})=>{const n=new FormData;n.append("video_clip[video]",s);const i=await fetch(`${r}/projects/${e}/issues/g-${t}/video_clips`,{method:"POST",headers:{Accept:"application/json",Authorization:"FormUser anonymous","BetaHub-Project-ID":e},body:n});if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return i.json()},l=async({projectId:e,issueId:t,logFile:s})=>{const n=new FormData;n.append("log_file[file]",s);const i=await fetch(`${r}/projects/${e}/issues/g-${t}/log_files`,{method:"POST",headers:{Accept:"application/json",Authorization:"FormUser anonymous","BetaHub-Project-ID":e},body:n});if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return i.json()};var a={__proto__:null,createNewIssue:n,uploadScreenshot:i,uploadVideoClip:o,uploadLogFile:l};class d extends t{constructor(e){super({name:"stepsToReproduce",formElement:e})}}class u{constructor({formElement:e,name:t,validator:s,onInput:r}){this.isDisabled=!1,this.element=null,this.errorMsgElement=null,this.dropZoneElement=null,this.fileListElement=null,this.validator=null,this.validate=()=>{var e,t;return null==(e=null==(t=this.validator)?void 0:t.call(this,this.getValue()))||e},this.getValue=()=>null!==this.element?this.element.files:null,this.reset=()=>{null!==this.element&&(this.element.value=""),null!==this.fileListElement&&(this.fileListElement.innerHTML="")};const n=e.querySelector(`[data-bhwf-input="${t}"]`),i=e.querySelector(`[data-bhwf-error-msg="${t}"]`),o=e.querySelector(`[data-bhwf-drop-zone="${t}"]`),l=e.querySelector(`[data-bhwf-file-list="${t}"]`);if(this.isDisabled=null===n,this.isDisabled)return;this.element=n,this.errorMsgElement=i,this.dropZoneElement=o,this.fileListElement=l,this.validator=s||null,r&&(null==n||n.addEventListener("input",e=>r(e.target.files)));const a=(null==o?void 0:o.innerText)||"";if(n&&o&&(n.style.display="none",o.addEventListener("dragover",e=>{e.preventDefault(),o.classList.add("bhwf-drag-over"),o.innerText="Drop here"}),o.addEventListener("dragleave",()=>{o.classList.remove("bhwf-drag-over"),o.innerText=a}),o.addEventListener("drop",e=>{var t;e.preventDefault(),o.classList.remove("bhwf-drag-over");const s=(null==(t=e.dataTransfer)?void 0:t.files)||null;s&&(n.files=s,n.dispatchEvent(new Event("input")),o.innerText=a)}),o.addEventListener("click",()=>n.click())),l){let d=[];function u(){if(!l)return;l.innerHTML="";for(let e=0;e<d.length;e++){const t=d[e],s=document.createElement("li"),r=document.createElement("img");t.type.startsWith("image/")&&(r.src=URL.createObjectURL(t),r.onload=function(){URL.revokeObjectURL(r.src)},r.classList.add("thumbnail"),s.appendChild(r));const n=document.createTextNode(t.name);s.appendChild(n);const a=document.createElement("button");a.classList.add("remove-button"),a.textContent="Remove",a.addEventListener("click",()=>{d.splice(e,1),u(),i&&(i.innerText=""),o&&o.classList.remove("bhwf-error")}),s.appendChild(a),l.appendChild(s)}const e=new DataTransfer;d.forEach(t=>e.items.add(t)),n&&(n.files=e.files)}null==n||n.addEventListener("input",()=>{l.innerHTML="",null!=n&&n.files&&(d=Array.from(n.files),u())})}}}class c extends u{constructor(e){super({name:"screenshots",formElement:e,validator:e=>{if(e)for(let r=0;r<e.length;r++){var t,s;if(!e[r].type.startsWith("image/"))return null==(t=this.element)||t.classList.add("bhwf-error"),null==(s=this.dropZoneElement)||s.classList.add("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="All files must be images"),!1}return!0},onInput:()=>{var e;null==(e=this.element)||e.classList.remove("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="")}})}}class h extends u{constructor(e){super({name:"videos",formElement:e,validator:e=>{if(e)for(let r=0;r<e.length;r++){var t,s;if(!e[r].type.startsWith("video/"))return null==(t=this.element)||t.classList.add("bhwf-error"),null==(s=this.dropZoneElement)||s.classList.add("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="All files must be videos"),!1}return!0},onInput:()=>{var e;null==(e=this.element)||e.classList.remove("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="")}})}}class m extends u{constructor(e){super({name:"logs",formElement:e,validator:e=>{if(e)for(let r=0;r<e.length;r++){const n=e[r];var t,s;if(n.type.startsWith("image/")||n.type.startsWith("video/"))return null==(t=this.element)||t.classList.add("bhwf-error"),null==(s=this.dropZoneElement)||s.classList.add("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="Files cannot be images or videos"),!1}return!0},onInput:()=>{var e;null==(e=this.element)||e.classList.remove("bhwf-error"),this.errorMsgElement&&(this.errorMsgElement.innerText="")}})}}class p extends u{constructor(e){super({name:"media",formElement:e})}}class f{constructor({formElement:e}){this.projectId=null,this.inputs={},this.fileInputs={},this.formElement=void 0,this.validate=()=>[...Object.values(this.inputs),...Object.values(this.fileInputs)].reduce((e,t)=>t.validate()&&e,!0),this.projectId=e.getAttribute("data-bhwf-form"),this.formElement=e,this._loadDefaultInputs(),this._handleButtons()}_loadDefaultInputs(){this.inputs={description:new s(this.formElement),stepsToReproduce:new d(this.formElement)},this.inputs=Object.fromEntries(Object.entries(this.inputs).filter(([e,t])=>!t.isDisabled)),this.fileInputs={screenshots:new c(this.formElement),videos:new h(this.formElement),logs:new m(this.formElement),media:new p(this.formElement)},this.fileInputs=Object.fromEntries(Object.entries(this.fileInputs).filter(([e,t])=>!t.isDisabled))}_handleButtons(){this.formElement.querySelectorAll('[data-bhwf-button="submit"]').forEach(e=>{e.addEventListener("click",()=>{this.validate()&&this.submit()})}),this.formElement.querySelectorAll('[data-bhwf-button="reset"]').forEach(e=>{e.addEventListener("click",()=>{Object.values(this.inputs).map(e=>e.reset()),Object.values(this.fileInputs).map(e=>e.reset()),this.formElement.removeAttribute("data-bhwf-state")})})}async submit(){var t,s,r,a,d,u;if(!this.projectId)return;const c={description:(null==(t=this.inputs.description)?void 0:t.getValue())||void 0,stepsToReproduce:(null==(s=this.inputs.stepsToReproduce)?void 0:s.getValue())||void 0},h=(null==(r=this.fileInputs.screenshots)?void 0:r.getValue())||void 0,m=(null==(a=this.fileInputs.videos)?void 0:a.getValue())||void 0,p=(null==(d=this.fileInputs.logs)?void 0:d.getValue())||void 0,f=(null==(u=this.fileInputs.media)?void 0:u.getValue())||void 0;this.formElement.setAttribute("data-bhwf-state","loading");try{const{id:t}=await n(e({},c,{projectId:this.projectId}));if(h&&h.length>0)for(const e of h)await i({projectId:this.projectId,issueId:t,screenshot:e});if(m&&m.length>0)for(const e of m)await o({projectId:this.projectId,issueId:t,videoClip:e});if(p&&p.length>0)for(const e of p)await l({projectId:this.projectId,issueId:t,logFile:e});if(f&&f.length>0)for(const e of f){const s=e.type;s.startsWith("image/")?await i({projectId:this.projectId,issueId:t,screenshot:e}):s.startsWith("video/")?await o({projectId:this.projectId,issueId:t,videoClip:e}):await l({projectId:this.projectId,issueId:t,logFile:e})}this.formElement.setAttribute("data-bhwf-state","success")}catch(e){this.formElement.setAttribute("data-bhwf-state","error")}}}const v=()=>{document.querySelectorAll("[data-bhwf-form]").forEach(e=>{new f({formElement:e})})};window.bhwf={init:v,forms:{}};export{a as API,v as init};
//# sourceMappingURL=index.modern.mjs.map
