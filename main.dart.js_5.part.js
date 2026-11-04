((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={amE:function amE(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},amF:function amF(){},amG:function amG(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},amD:function amD(){},Ew:function Ew(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wT:function wT(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qw$=d
_.cd$=e
_.ar$=f
_.a=null},QP:function QP(d,e,f,g,h,i,j){var _=this
_.e7=d
_.y1=e
_.y2=f
_.dz$=g
_.ad$=h
_.cr$=i
_.b=_.dy=null
_.c=0
_.y=_.d=null
_.z=!0
_.Q=null
_.as=!1
_.at=null
_.ay=$
_.ch=j
_.CW=!1
_.cx=$
_.cy=!0
_.db=!1
_.dx=$},
aG_(d,e,f,g,h){var x=null
return new A.vl(d,new D.S4(e,f,!0,!0,!0,x),x,C.a9,!1,x,x,g,x,!0,x,0,x,x,f,C.mj,C.F,x,x,C.K,C.as,x)},
vl:function vl(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0){var _=this
_.to=d
_.x1=e
_.dx=f
_.c=g
_.d=h
_.e=i
_.f=j
_.r=k
_.w=l
_.x=m
_.y=n
_.z=o
_.Q=p
_.as=q
_.at=r
_.ax=s
_.ay=t
_.ch=u
_.CW=v
_.cx=w
_.cy=x
_.a=a0},
S6:function S6(d,e,f){this.f=d
this.d=e
this.a=f}}
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
A.amE.prototype={
a0u(d){var x=this.c
return d.yK(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.b_(B.a(["scrollOffset: "+B.m(x.a),"crossAxisOffset: "+B.m(x.b),"mainAxisExtent: "+B.m(x.c),"crossAxisExtent: "+B.m(x.d)],y.x),", ")+")"}}
A.amF.prototype={}
A.amG.prototype={
a0F(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.jf(d/x)-1)
return 0},
ab2(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BX(d){var x=this,w=x.a,v=C.k.bh(d,w)
return new A.amE(C.k.j6(d,w)*x.b,x.ab2(v*x.c),x.d,x.e)},
Wo(d){var x
if(d===0)return 0
x=this.b
return x*(C.k.j6(d-1,this.a)+1)-(x-this.d)}}
A.amD.prototype={}
A.Ew.prototype={
La(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.amG(v,t+x.b,u+w,t,u,B.yZ(d.x))}}
A.wT.prototype={
k(d){return"crossAxisOffset="+B.m(this.w)+"; "+this.a43(0)}}
A.QP.prototype={
dS(d){if(!(d.b instanceof A.wT))d.b=new A.wT(!1,null,null)},
sa0X(d){var x,w,v=this
if(v.e7===d)return
x=!0
if(B.t(d)===B.t(v.e7)){w=v.e7
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.X()
v.e7=d},
q3(d){var x=d.b
x.toString
x=y.t.a(x).w
x.toString
return x},
bo(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.v.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.e7.La(a8)
t=u.b
s=t>1e-10?u.a*C.d.j6(w,t):0
r=isFinite(v)?u.a0F(v):a7
if(a6.ad$!=null){q=a6.amG(s)
a6.ur(q,r!=null?a6.amJ(r):0)}else a6.ur(0,0)
p=u.BX(s)
if(a6.ad$==null)if(!a6.Vr(s,p.a)){o=u.Wo(a9.guo())
a6.dy=B.l1(a7,!1,a7,a7,o,0,0,o,a7)
a9.uJ()
return}n=p.a
m=n+p.c
t=a6.ad$
t.toString
t=t.b
t.toString
l=y.c
t=l.a(t).b
t.toString
k=t-1
t=y.t
j=a7
for(;k>=s;--k){i=u.BX(k)
h=i.c
g=a6.arn(a8.yK(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eB(p.a0u(a8))
j=a6.ad$
h=j.b
h.toString
t.a(h)
h.a=n
h.w=p.b}h=j.b
h.toString
h=l.a(h).b
h.toString
k=h+1
h=B.k(a6).i("ao.1")
f=r!=null
for(;;){if(!(!f||k<=r)){d=!1
break}i=u.BX(k)
e=i.c
a0=a8.yK(i.d,e,e)
a1=j.b
a1.toString
g=h.a(a1).ar$
if(g!=null){a1=g.b
a1.toString
a1=l.a(a1).b
a1.toString
a1=a1!==k}else a1=!0
if(a1){g=a6.arm(a0,j)
if(g==null){d=!0
break}}else g.eB(a0)
a1=g.b
a1.toString
t.a(a1)
a2=i.a
a1.a=a2
a1.w=i.b
m=Math.max(m,a2+e);++k
j=g}t=a6.cr$
t.toString
t=t.b
t.toString
t=l.a(t).b
t.toString
a3=d?m:a9.Xt(a8,s,t,n,m)
a4=a6.ul(a8,Math.min(x,n),m)
a5=a6.yZ(a8,n,m)
a6.dy=B.l1(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uJ()}}
A.vl.prototype={
W_(d){return new A.S6(this.to,this.x1,null)}}
A.S6.prototype={
aB(d){var x=new A.QP(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.ag(y.d))
x.aA()
return x},
aJ(d,e){e.sa0X(this.f)},
Il(d,e,f,g,h){var x
this.a44(d,e,f,g,h)
x=this.f.La(d).Wo(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.p,[A.amE,A.amF,A.amD])
w(A.amG,A.amF)
w(A.Ew,A.amD)
w(A.wT,D.fx)
w(A.QP,D.oq)
w(A.vl,D.zK)
w(A.S6,D.mz)})()
B.lo(b.typeUniverse,JSON.parse('{"wT":{"fx":[],"l2":[],"dS":["A"],"jL":[],"cL":[]},"QP":{"oq":[],"cQ":[],"ao":["A","fx"],"v":[],"ap":[],"ao.1":"fx","ao.0":"A"},"vl":{"a2":[],"e":[]},"S6":{"mz":[],"as":[],"e":[]}}'))
var y={d:B.a1("dJ"),x:B.a1("o<i>"),g:B.a1("A"),z:B.a1("j6"),t:B.a1("wT"),v:B.a1("t8"),c:B.a1("fx"),e:B.a1("l")}};
(a=>{a["m+yyhFJcn6GqTev9H1GVgTAAEMY="]=a.current})($__dart_deferred_initializers__);