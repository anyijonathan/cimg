"use strict";(self.webpackChunkcimg_portal=self.webpackChunkcimg_portal||[]).push([[961],{7798:function(e,s,t){t(2791);var a=t(184);s.Z=function(e){var s=e.firstLayer,t=e.firstLayerLink,c=e.secondLayer,n=e.secondLayerLink;return(0,a.jsx)("div",{children:(0,a.jsx)("nav",{className:"flex","aria-label":"Breadcrumb",children:(0,a.jsxs)("ol",{className:"inline-flex items-center space-x-1 md:space-x-3",children:[(0,a.jsx)("li",{className:"inline-flex items-center",children:(0,a.jsx)("a",{href:t,className:"inline-flex items-center text-[#74677B] text-sm font-medium hover:text-gray-900",children:s})}),(0,a.jsx)("li",{children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("svg",{className:"w-6 h-6 text-gray-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})}),(0,a.jsx)("a",{href:n,className:"ml-1 text-sm font-medium text-purple-primary",children:c})]})})]})})})}},9324:function(e,s,t){t(2791);var a=t(6675),c=t(184);s.Z=function(e){var s=e.active,t=e.inactive,n=e.pending,i=e.archived,l=e.declined;return(0,c.jsxs)("div",{children:[t&&(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)(a.InactiveStatusIcon,{}),(0,c.jsx)("p",{className:"font-sm text-black-secondary pl-2",children:"Inactive"})]}),s&&(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)(a.ActiveStatusIcon,{}),(0,c.jsx)("p",{className:"font-sm text-green-primary pl-2",children:"Active"})]}),n&&(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)(a.PendingStatusIcon,{}),(0,c.jsx)("p",{className:"font-sm text-yellow-primary pl-2",children:"Pending"})]}),i&&(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)(a.ArchivedStatusIcon,{}),(0,c.jsx)("p",{className:"font-sm text-black-secondary pl-2",children:"Archived"})]}),l&&(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)(a.ArchivedStatusIcon,{}),(0,c.jsx)("p",{className:"font-sm text-red-500 pl-2",children:"Declined"})]})]})}},1937:function(e,s,t){t(2791);var a=t(6675),c=t(184);s.Z=function(e){var s=e.status;return(0,c.jsxs)("div",{children:["Y"===s&&(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)(a.ActiveStatusIcon,{}),(0,c.jsx)("p",{className:"font-sm text-green-primary pl-2",children:"Successful"})]}),"Y"!==s&&(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)(a.FailedStatusIcon,{}),(0,c.jsx)("p",{className:"font-sm text-red-primary pl-2",children:"Failed"})]})]})}},8961:function(e,s,t){t.r(s);t(2791);var a=t(7798),c=(t(9324),t(1937)),n=t(9434),i=t(184);s.default=function(){var e=(0,n.v9)((function(e){return e.reports.data})),s=e.flag,t=(e.customerName,e.platform),l=e.amount,r=e.responseDescr,d=e.tranDate,m=e.transType,x=e.sourcePhone,o=e.sourceAccount,h=e.requestid;return(0,i.jsxs)("div",{className:"font-circular-std",children:[(0,i.jsx)(a.Z,{firstLayer:"Reports",secondLayer:"View transaction",firstLayerLink:"/app/admin/reports"}),(0,i.jsx)("h2",{className:"mt-11 mx-10 text-xl font-bold text-black-secondary pb-6",children:"Transaction details"}),(0,i.jsx)("hr",{className:"mb-7 mx-10"}),(0,i.jsx)("div",{className:"bg-white",children:(0,i.jsxs)("div",{className:"px-10 pt-6 pb-[4.5rem] gap-8 block md:grid grid-cols-8 ",children:[(0,i.jsx)("div",{className:"rounded-lg h-56 col-span-2 pl-6 pt-6 border border-black-secondary border-opacity-5",children:(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"mb-14",children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Status"}),(0,i.jsx)(c.Z,{status:s})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Reason"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:r})]})]})}),(0,i.jsxs)("div",{className:"h-56 col-span-6 rounded-lg flex pl-6 pt-6 pr-8 pb-11 justify-between border border-black-secondary border-opacity-5",children:[(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"mb-14",children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Request Id"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:h})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Transaction date"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:new Date(d).toLocaleDateString()})]})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"mb-14",children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Source Account"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:o})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Type"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:m})]})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"mb-14",children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Platform"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:t})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Phone number"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:x})]})]}),(0,i.jsx)("div",{children:(0,i.jsxs)("div",{className:"mb-14",children:[(0,i.jsx)("p",{className:"text-sm font-medium text-black-70 mb-3 opacity-30",children:"Transaction amount"}),(0,i.jsx)("span",{className:"text-sm font-medium text-black-secondary",children:l})]})})]})]})})]})}}}]);
//# sourceMappingURL=961.3e0d6685.chunk.js.map