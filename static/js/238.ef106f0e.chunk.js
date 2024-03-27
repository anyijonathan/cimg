"use strict";(self.webpackChunkcimg_portal=self.webpackChunkcimg_portal||[]).push([[238],{4453:function(e,a,s){s(5987),s(2791);var t=s(184);a.Z=function(e){var a=e.type,s=void 0===a?"submit":a,n=e.className,l=e.disabled,r=e.onClick,c=e.icon,i=e.isLoading,o=e.children;e.loaderText;return(0,t.jsxs)("button",{className:"bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)] w-full h-12 border border-purple-secondary text-white text-sm rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200  block pt-4 pb-6 px-16 ease-in-out duration-150 \n          ".concat(l&&"opacity-60"," ")+n,type:s,onClick:r,disabled:l||!1,children:[c&&(0,t.jsx)("div",{children:c}),o,i]})}},3131:function(e,a,s){s(2791);var t=s(184);a.Z=function(e){var a=e.label,s=e.endingLabel,n=e.endingLabelLink,l=e.placeholder,r=e.className,c=void 0===r?"":r,i=e.value,o=e.id,d=e.onChange,u=e.onBlur,m=e.type,x=e.name,p=e.autoComplete,h=e.inputMode,f=e.maxLength,b=e.required,v=e.readOnly;e.children;return(0,t.jsxs)("div",{className:c,children:[(0,t.jsxs)("div",{className:"flex justify-between",children:[a&&(0,t.jsxs)("label",{htmlFor:o,className:"mb-3 text-sm font-medium font-circular-std text-black-secondary",children:[" ",a]}),s&&(0,t.jsxs)("a",{href:n,className:"mb-3 text-sm text-right font-medium font-circular-std text-purple-secondary opacity-70",children:[" ",s]})]}),(0,t.jsx)("input",{id:o,className:"w-full md:w-[27.25rem] h-12 border border-purple-secondary text-black-40 text-sm rounded outline-none focus:border-purple-secondary focus:ring-purple-200  block py-4 pl-4 pr-[0.625rem]"+c,placeholder:l||"",value:i,onChange:d,onBlur:u,name:x,type:m,autoComplete:p||"",inputMode:h,maxLength:f,required:b,readOnly:v})]})}},700:function(e,a,s){s(2791);var t=s(184);a.Z=function(e){var a=e.onChange,s=e.id,n=e.label,l=e.type,r=e.options,c=e.value,i=e.defaultValue,o=e.className;return(0,t.jsxs)("div",{className:"font-circular-std",children:[n&&(0,t.jsx)("label",{className:"block mb-4 text-sm font-medium text-black-secondary",children:n}),(0,t.jsx)("select",{id:s,className:"border border-opacity-50 border-black-40 text-black-40 text-sm rounded outline-none focus:border-black-40 focus:border-opacity-50 focus:ring-gray-200 block pl-4 pr-[0.625rem]"+o,type:l,onChange:a,value:c,defaultValue:i,children:r&&r.map((function(e){return(0,t.jsx)("option",{value:e.value,children:e.name},e.id)}))})]})}},301:function(e,a,s){var t=s(5987),n=(s(2791),s(4453)),l=s(184);a.Z=function(e){var a=e.onClose,s=e.show,r=e.modalAction,c=(e.modalHeader,e.modalClose),i=e.actionType,o=e.actionReceiver,d=e.isLoading,u=e.disabled;e.loadingText,e.Children;return(0,l.jsx)("div",{className:"font-circular-std",children:(0,l.jsxs)(t.u_,{show:s,size:"xl",popup:!0,onClose:a,children:[(0,l.jsxs)(t.u_.Header,{children:[(0,l.jsx)("div",{className:"p-6",children:(0,l.jsx)("h3",{className:"w-[90%] text-lg font-bold text-black-secondary capitalize",children:"".concat(i,"  ").concat(o)})}),(0,l.jsx)("div",{className:"md:w-[27.75rem]",children:(0,l.jsx)("hr",{})})]}),(0,l.jsx)(t.u_.Body,{children:(0,l.jsxs)("div",{className:"text-center w-full mt-11",children:[(0,l.jsx)("h3",{className:"mb-20 text-lg text-black-secondary font-medium",children:"Are you sure you want to ".concat(i," this ").concat(o,"?")}),(0,l.jsxs)("div",{className:"flex justify-center gap-4",children:[(0,l.jsx)(n.Z,{className:"bg-transparent text-black-70 font-medium border-black-70 border-opacity-30",color:"failure",onClick:c,children:"Cancel"}),(0,l.jsx)(n.Z,{onClick:function(){return r()},isLoading:d,disabled:u,children:"Yes, ".concat(i)})]})]})})]})})}},9364:function(e,a,s){s(2791);var t=s(6675),n=s(184);a.Z=function(e){e.statusColor;var a=e.status,s=e.notificationText,l=e.className;return(0,n.jsxs)("div",{className:"mb-4 md:mb-0 md:absolute md:left-[77%] md:top-[10%] "+l,children:["success"===a&&(0,n.jsxs)("div",{className:"w-[60%] h-10 md:h-12 md:w-[21.8125rem] justify-center flex bg-green-primary items-center",children:[(0,n.jsx)(t.NotificationIcon,{}),(0,n.jsx)("p",{className:"font-medium text-base md:text-xs text-white pl-6",children:s})]}),"failure"===a&&(0,n.jsxs)("div",{className:"w-full px-4 py-2 h-10 md:h-12 md:w-[21.8125rem] justify-center flex bg-red-primary items-center",children:[(0,n.jsx)(t.NotificationIcon,{}),(0,n.jsx)("p",{className:"font-medium text-base md:text-xs text-white pl-6",children:s})]})]})}},2238:function(e,a,s){s.r(a);var t=s(4165),n=s(5861),l=s(885),r=s(2791),c=s(9364),i=s(6675),o=s(3131),d=s(4453),u=s(700),m=s(5987),x=s(301),p=s(9434),h=s(4159),f=s(3585),b=s(5479),v=s(2549),j=s(184);a.default=function(){var e=(0,p.v9)(v.np),a=e.emailAddress,s=e.userName,y=e.userRole,N=((0,p.I0)(),(0,r.useState)("")),g=(0,l.Z)(N,2),w=g[0],k=g[1],Z=(0,r.useState)(""),C=(0,l.Z)(Z,2),S=C[0],A=C[1],T=(0,r.useState)(1),L=(0,l.Z)(T,2),_=L[0],R=L[1],U=(0,r.useState)(!1),E=(0,l.Z)(U,2),F=E[0],O=E[1],B=(0,r.useState)(!1),I=(0,l.Z)(B,2),M=I[0],P=I[1],z=(0,r.useState)(""),H=(0,l.Z)(z,2),q=H[0],V=H[1],W=(0,r.useState)(""),Y=(0,l.Z)(W,2),D=Y[0],G=Y[1],J=(0,r.useState)([]),K=(0,l.Z)(J,2),Q=K[0],X=K[1],$=(0,r.useState)(!1),ee=(0,l.Z)($,2),ae=ee[0],se=ee[1],te=(0,r.useState)("Create User"),ne=(0,l.Z)(te,2),le=ne[0],re=ne[1],ce=(0,r.useState)(!1),ie=(0,l.Z)(ce,2),oe=ie[0],de=ie[1],ue=(0,r.useState)(""),me=(0,l.Z)(ue,2),xe=me[0],pe=me[1],he=(0,r.useState)(""),fe=(0,l.Z)(he,2),be=fe[0],ve=fe[1],je=(0,r.useState)(""),ye=(0,l.Z)(je,2),Ne=ye[0],ge=ye[1],we=(0,r.useState)(1),ke=(0,l.Z)(we,2),Ze=ke[0],Ce=ke[1],Se=(0,r.useState)([]),Ae=(0,l.Z)(Se,2),Te=Ae[0],Le=Ae[1],_e=(0,r.useState)(null),Re=(0,l.Z)(_e,2),Ue=Re[0],Ee=Re[1];function Fe(){O(!1)}function Oe(){P(!1)}function Be(){return Be=(0,n.Z)((0,t.Z)().mark((function e(){var s,n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s={fullName:xe,emailAddress:be,role:Ne},de(!0),se(!0),re("creating new user..."),e.next=6,(0,h.lF)(s,a,y);case 6:"00"!==(n=e.sent).code?(de(!1),se(!1),re("create new user"),Fe(),A("failure"),k(n.description),setTimeout((function(){A(""),k("")}),3e3)):(de(!1),se(!1),re("create new user"),Fe(),A("success"),k(n.description),setTimeout((function(){A(""),k("")}),3e3),Me());case 8:case"end":return e.stop()}}),e)}))),Be.apply(this,arguments)}function Ie(){return(Ie=(0,n.Z)((0,t.Z)().mark((function e(){var s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=Ue,{fullName:xe,emailAddress:be,role:Ne},e.prev=2,de(!0),se(!0),e.next=7,(0,h.ST)(s,a,y);case 7:P(!1),A("success"),k("".concat(q," ").concat(D,"d successfully")),de(!1),se(!1),setTimeout((function(){A(""),k("")}),3e3),Me(),e.next=23;break;case 16:e.prev=16,e.t0=e.catch(2),P(!1),de(!1),se(!1),A("failure"),k("User removel failed, please try again");case 23:case"end":return e.stop()}}),e,null,[[2,16]])})))).apply(this,arguments)}var Me=function(){var e=(0,n.Z)((0,t.Z)().mark((function e(){var s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,h.AW)(a,y);case 3:s=e.sent,X(s.dataList),Le(s.dataList.slice((Ze-1)*Pe,Ze*Pe)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),A("failure"),k("couldn't fetch User list, kindly refresh page");case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();(0,r.useEffect)((function(){Me()}),[Ze]);var Pe=5,ze=Q.length;return(0,j.jsxs)("div",{className:"font-circular-std",children:[(0,j.jsxs)(m.u_,{show:F,onClose:Fe,popup:!0,size:"lg",position:"center",children:[(0,j.jsxs)(m.u_.Header,{children:[(0,j.jsx)("div",{className:"p-6",children:(0,j.jsx)("h3",{className:"w-[90%] text-lg font-bold text-black-secondary",children:"Add New User"})}),(0,j.jsx)("div",{className:"md:w-[27.75rem] pb-10",children:(0,j.jsx)("hr",{})})]}),(0,j.jsx)(m.u_.Body,{children:(0,j.jsxs)("div",{className:"space-y-6",children:[(0,j.jsx)(o.Z,{onChange:function(e){var a=e.target.value;pe(a)},label:"Full Name",placeholder:"Enter full name"}),(0,j.jsx)(o.Z,{onChange:function(e){var a=e.target.value;ve(a)},label:"Email Address",placeholder:"Enter email address"}),(0,j.jsx)(u.Z,{onChange:function(e){var a=e.target.value;console.log(a),ge(a)},className:"w-full md:w-[27.25rem] h-12",label:"Role",options:f.CC})]})}),(0,j.jsx)(m.u_.Footer,{children:(0,j.jsx)("div",{className:"flex justify-between w-full",children:(0,j.jsx)(d.Z,{isLoading:ae,disabled:oe,onClick:function(){return Be.apply(this,arguments)},children:le})})})]}),(0,j.jsx)(x.Z,{onClose:Oe,show:M,modalClose:Oe,actionReceiver:q,actionType:D,modalAction:function(){return Ie.apply(this,arguments)},isLoading:ae,disabled:oe}),(0,j.jsx)(c.Z,{notificationText:w,status:S}),(0,j.jsx)("h2",{className:"text-xl font-bold text-black-secondary pb-9",children:"Settings"}),(0,j.jsxs)("div",{className:"h-[48.75rem] bg-white grid grid-cols-5",children:[(0,j.jsx)("div",{className:"col-span-1 border-r border-opacity-10 border-black-secondary",children:(0,j.jsxs)("ul",{className:"pt-14 pl-10",children:[(0,j.jsx)("li",{children:(0,j.jsxs)("button",{href:"",onClick:function(){R(1)},className:"".concat(1===_?"text-purple-primary":"text-black-secondary opacity-70","  inline-flex items-center pl-6 w-full h-12 text-sm font-normal transition-colors duration-150"),children:["Manage users",(0,j.jsx)(i.ArrowRight,{className:"".concat(1===_?"flex":"hidden"," ml-4")})]})}),(0,j.jsx)("li",{children:(0,j.jsxs)("button",{href:"",onClick:function(){R(2)},className:"".concat(2===_?"text-purple-primary":"text-black-secondary opacity-70","  inline-flex items-center pl-6 w-full h-12 text-sm font-normal transition-colors duration-150"),children:["Basic information",(0,j.jsx)(i.ArrowRight,{className:"".concat(2===_?"flex":"hidden"," ml-4")})]})})]})}),(0,j.jsxs)("div",{className:"col-span-4",children:[(0,j.jsx)("div",{className:1===_?"block":"hidden",children:(0,j.jsxs)("div",{className:"mt-16 pl-16",children:[(0,j.jsxs)("div",{className:"flex justify-between mb-10",children:[(0,j.jsx)("h2",{className:"text-base self-center font-bold text-black-secondary",children:"Manage Users"}),(0,j.jsx)("button",{onClick:function(){O(!0)},className:"pl-6 py-3 pr-6 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150",children:(0,j.jsx)("p",{className:"linear-gradient-text text-sm font-normal",children:"+ Add New User"})})]}),(0,j.jsxs)("table",{className:"w-full text-left",children:[(0,j.jsx)("thead",{className:"text-sm text-black-primary opacity-70 bg-gray-300",children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{scope:"col",className:"py-3 px-6",children:"Name"}),(0,j.jsx)("th",{scope:"col",className:"py-3 px-6",children:"Email Address"}),(0,j.jsx)("th",{scope:"col",className:"py-3 px-6",children:"Role"}),(0,j.jsx)("th",{scope:"col",className:"py-3 px-6",children:"Action"})]})}),(0,j.jsx)("tbody",{className:"text-sm bg-other-background",children:Te.map((function(e,a){return(0,j.jsxs)("tr",{className:"bg-white text-black-secondary border-b py-4 px-6",children:[(0,j.jsx)("td",{className:"py-6 px-6 font-medium whitespace-nowrap",children:e.fullName}),(0,j.jsx)("td",{className:"py-6 px-6",children:e.emailAddress}),(0,j.jsx)("td",{className:"py-6 px-6",children:e.role}),(0,j.jsx)("td",{className:"py-6 px-6",children:(0,j.jsx)("button",{onClick:function(){return a=e.id,Ee(a),G("remove"),V("user"),void P(!0);var a},className:"text-base font-[450] text-red-primary opacity-70",children:"Remove"})})]},a)}))}),(0,j.jsx)(b.Pagination,{totalResults:ze,resultsPerPage:Pe,label:"Table navigation",onChange:function(e){Ce(e)}})]})]})}),(0,j.jsx)("div",{className:2===_?"block":"hidden",children:(0,j.jsxs)("div",{className:"mt-16 pl-16",children:[(0,j.jsx)(i.UserIcon,{className:"h-24 w-24 mb-24"}),(0,j.jsx)(o.Z,{className:"mb-9",label:"Display name",placeholder:s,readOnly:"readOnly"}),(0,j.jsx)(o.Z,{className:"mb-14",label:"Email",placeholder:a,readOnly:"readOnly"}),(0,j.jsx)(d.Z,{disabled:!0,className:"newfee-button",children:"Update"})]})})]})]})]})}},3585:function(e,a,s){s.d(a,{CC:function(){return t},L4:function(){return r},f1:function(){return l},hm:function(){return c},rR:function(){return n}});var t=[{id:1,value:"",name:"select role"},{id:2,value:"admin",name:"admin"},{id:3,value:"superAdmin",name:"superAdmin"}],n=[{id:1,value:"today",name:"Today"},{id:2,value:"weekly",name:"This week"},{id:3,value:"monthly",name:"This month"}],l=[{id:1,value:"Total",name:"Total"},{id:2,value:"Today",name:"Today"},{id:3,value:"Weekly",name:"This week"},{id:4,value:"Monthly",name:"This month"}],r=[{id:1,value:"",name:"Filter by"},{id:2,value:"active",name:"Active"},{id:3,value:"inactive",name:"Inactive"},{id:4,value:"pending",name:"Pending"},{id:5,value:"archived",name:"Archived"}],c=[{id:1,value:"",name:"Select Status"},{id:2,value:"Y",name:"Successful"},{id:3,value:"F",name:"Failed"}]}}]);
//# sourceMappingURL=238.ef106f0e.chunk.js.map