import{u as i,I as l,c as a,a as g,o as r,b as c,F as k,k as m,p as d}from"./vendor.a5c503ae.js";import{_ as u,b as j,p as _,t as B,n as b,s as f,P as v,A as t}from"./index.4e7e3906.js";const I={props:{},name:"ProjectBacklogPage",setup(){const e=i();return l(async()=>{try{await j.getBacklogs(e.params.projectId),await _.getProjectById(e.params.projectId),await B.getTasks(e.params.projectId),await b.getNotes(e.params.projectId),await f.getSprints(e.params.projectId)}catch(o){v.toast(o.message,"error","from project backlogpage")}}),{sprint:a(()=>t.sprints),backlog:a(()=>t.currentBacklog),backlogs:a(()=>t.backlogs),currentProject:a(()=>t.currentProject)}}},P={class:"container-fluid"};function S(e,o,w,n,x,y){const p=g("BacklogItem");return r(),c("div",P,[(r(!0),c(k,null,m(n.backlogs,s=>(r(),d(p,{key:s.id,backlog:s},null,8,["backlog"]))),128))])}var A=u(I,[["render",S]]);export{A as default};
