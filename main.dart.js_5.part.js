((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={amM:function amM(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},amN:function amN(){},amO:function amO(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},amL:function amL(){},Ey:function Ey(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wQ:function wQ(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qr$=d
_.cf$=e
_.ar$=f
_.a=null},QR:function QR(d,e,f,g,h,i,j){var _=this
_.e6=d
_.y1=e
_.y2=f
_.dw$=g
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
aGq(d,e,f,g,h){var x=null
return new A.vm(d,new D.S7(e,f,!0,!0,!0,x),x,C.a9,!1,x,x,g,x,!0,x,0,x,x,f,C.mk,C.F,x,x,C.J,C.as,x)},
vm:function vm(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0){var _=this
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
S9:function S9(d,e,f){this.f=d
this.d=e
this.a=f}}
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
A.amM.prototype={
a0y(d){var x=this.c
return d.yG(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.b1(B.a(["scrollOffset: "+B.m(x.a),"crossAxisOffset: "+B.m(x.b),"mainAxisExtent: "+B.m(x.c),"crossAxisExtent: "+B.m(x.d)],y.x),", ")+")"}}
A.amN.prototype={}
A.amO.prototype={
a0J(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.je(d/x)-1)
return 0},
ab6(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BU(d){var x=this,w=x.a,v=C.k.bb(d,w)
return new A.amM(C.k.j6(d,w)*x.b,x.ab6(v*x.c),x.d,x.e)},
Ws(d){var x
if(d===0)return 0
x=this.b
return x*(C.k.j6(d-1,this.a)+1)-(x-this.d)}}
A.amL.prototype={}
A.Ey.prototype={
Ld(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.amO(v,t+x.b,u+w,t,u,B.yX(d.x))}}
A.wQ.prototype={
k(d){return"crossAxisOffset="+B.m(this.w)+"; "+this.a46(0)}}
A.QR.prototype={
dS(d){if(!(d.b instanceof A.wQ))d.b=new A.wQ(!1,null,null)},
sa1_(d){var x,w,v=this
if(v.e6===d)return
x=!0
if(B.t(d)===B.t(v.e6)){w=v.e6
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.X()
v.e6=d},
pZ(d){var x=d.b
x.toString
x=y.t.a(x).w
x.toString
return x},
bp(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.v.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.e6.Ld(a8)
t=u.b
s=t>1e-10?u.a*C.d.j6(w,t):0
r=isFinite(v)?u.a0J(v):a7
if(a6.ad$!=null){q=a6.amN(s)
a6.um(q,r!=null?a6.amQ(r):0)}else a6.um(0,0)
p=u.BU(s)
if(a6.ad$==null)if(!a6.Vu(s,p.a)){o=u.Ws(a9.guk())
a6.dy=B.l3(a7,!1,a7,a7,o,0,0,o,a7)
a9.uE()
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
for(;k>=s;--k){i=u.BU(k)
h=i.c
g=a6.arw(a8.yG(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eB(p.a0y(a8))
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
break}i=u.BU(k)
e=i.c
a0=a8.yG(i.d,e,e)
a1=j.b
a1.toString
g=h.a(a1).ar$
if(g!=null){a1=g.b
a1.toString
a1=l.a(a1).b
a1.toString
a1=a1!==k}else a1=!0
if(a1){g=a6.arv(a0,j)
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
a3=d?m:a9.Xx(a8,s,t,n,m)
a4=a6.uh(a8,Math.min(x,n),m)
a5=a6.yV(a8,n,m)
a6.dy=B.l3(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uE()}}
A.vm.prototype={
W2(d){return new A.S9(this.to,this.x1,null)}}
A.S9.prototype={
aB(d){var x=new A.QR(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.ah(y.d))
x.aA()
return x},
aJ(d,e){e.sa1_(this.f)},
Ii(d,e,f,g,h){var x
this.a47(d,e,f,g,h)
x=this.f.Ld(d).Ws(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.p,[A.amM,A.amN,A.amL])
w(A.amO,A.amN)
w(A.Ey,A.amL)
w(A.wQ,D.fz)
w(A.QR,D.os)
w(A.vm,D.zK)
w(A.S9,D.mB)})()
B.lp(b.typeUniverse,JSON.parse('{"wQ":{"fz":[],"l4":[],"dV":["C"],"jT":[],"cK":[]},"QR":{"os":[],"cP":[],"ao":["C","fz"],"v":[],"ap":[],"ao.1":"fz","ao.0":"C"},"vm":{"a2":[],"e":[]},"S9":{"mB":[],"as":[],"e":[]}}'))
var y={d:B.a1("dK"),x:B.a1("o<i>"),g:B.a1("C"),z:B.a1("ja"),t:B.a1("wQ"),v:B.a1("ta"),c:B.a1("fz"),e:B.a1("l")}};
(a=>{a["BVVQHMSdv5/qDWY2KttWnPmqrZU="]=a.current})($__dart_deferred_initializers__);