(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{44:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var r=n(17),a=n.n(r),c=n(3),o=n.n(c),u=n(5),i=n(8),s=n(4),l=n(1),j=n(0),b=function(t){var e=t.note,n=t.toggleImportance,r=e.importance?"make not important":"make important";return Object(j.jsx)("div",{children:Object(j.jsxs)("li",{className:"note",children:[e.content,Object(j.jsx)("button",{onClick:n,children:r})]})})},p=function(t){var e=t.message;return null===e?null:Object(j.jsx)("div",{className:"error",children:e})},f=function(){return Object(j.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(j.jsx)("br",{}),Object(j.jsx)("em",{children:"Note app, Tiago Nunes 2021"})]})},d=n(6),O=n.n(d),m="/api/notes",h=null,v=(n(42),{getAll:function(){return O.a.get(m).then((function(t){return t.data}))},create:function(){var t=Object(u.a)(o.a.mark((function t(e){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{Authorization:h}},t.next=3,O.a.post(m,e,n);case 3:return r=t.sent,t.abrupt("return",r.data);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),update:function(t,e){return O.a.put("".concat(m,"/").concat(t),e).then((function(t){return t.data}))},setToken:function(t){h="bearer ".concat(t)}}),g={login:function(){var t=Object(u.a)(o.a.mark((function t(e){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.a.post("/api/login",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},x=function(){var t=Object(l.useState)([]),e=Object(s.a)(t,2),n=e[0],r=e[1],a=Object(l.useState)(""),c=Object(s.a)(a,2),d=c[0],O=c[1],m=Object(l.useState)(!1),h=Object(s.a)(m,2),x=h[0],w=h[1],k=Object(l.useState)(null),S=Object(s.a)(k,2),y=S[0],N=S[1],I=Object(l.useState)("mluukkai"),T=Object(s.a)(I,2),C=T[0],J=T[1],A=Object(l.useState)("mluukkai"),D=Object(s.a)(A,2),E=D[0],U=D[1],z=Object(l.useState)(null),B=Object(s.a)(z,2),M=B[0],P=B[1];Object(l.useEffect)((function(){v.getAll().then((function(t){r(t)}))}),[]),Object(l.useEffect)((function(){var t=window.localStorage.getItem("loggedNoteappUser");if(t){var e=JSON.parse(t);P(e),v.setToken(e.token)}}),[]);var q=function(t){t.preventDefault();var e={content:d,date:(new Date).toISOString(),important:Math.random()>.5};v.create(e).then((function(t){r(n.concat(t)),O("")}))},F=function(t){console.log(t.target.value),O(t.target.value)},G=x?n:n.filter((function(t){return t.important})),H=function(){var t=Object(u.a)(o.a.mark((function t(e){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,g.login({username:C,password:E});case 4:n=t.sent,v.setToken(n.token),window.localStorage.setItem("loggedNoteappUser",JSON.stringify(n)),P(n),J(""),U(""),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(1),N("wrong credentials"),setTimeout((function(){N(null)}),5e3);case 16:case"end":return t.stop()}}),t,null,[[1,12]])})));return function(e){return t.apply(this,arguments)}}();return Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:"Notes"}),Object(j.jsx)(p,{message:y}),null===M?Object(j.jsxs)("form",{onSubmit:H,children:[Object(j.jsxs)("div",{children:["username",Object(j.jsx)("input",{type:"text",value:C,name:"Username",onChange:function(t){var e=t.target;return J(e.value)}})]}),Object(j.jsxs)("div",{children:["password",Object(j.jsx)("input",{type:"password",value:E,name:"Password",onChange:function(t){var e=t.target;return U(e.value)}})]}),Object(j.jsx)("button",{type:"submit",children:"login"})]}):Object(j.jsxs)("div",{children:[Object(j.jsxs)("p",{children:[M.name," logged in"]}),Object(j.jsxs)("form",{onSubmit:q,children:[Object(j.jsx)("input",{value:d,onChange:F}),Object(j.jsx)("button",{type:"submit",children:"save"})]})]}),Object(j.jsx)("div",{children:Object(j.jsxs)("button",{onClick:function(){return w(!x)},children:["show ",x?"important":"all"]})}),Object(j.jsx)("ul",{children:G.map((function(t){return Object(j.jsx)(b,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(i.a)(Object(i.a)({},e),{},{important:!e.important});v.update(t,a).then((function(e){r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(t){N("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){N(null)}),5e3)}))}(t.id)}},t.id)}))}),Object(j.jsx)(f,{})]})};n(44);a.a.render(Object(j.jsx)(x,{}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.bb323556.chunk.js.map