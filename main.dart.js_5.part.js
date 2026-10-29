((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={amB:function amB(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},amC:function amC(){},amD:function amD(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},amA:function amA(){},Es:function Es(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wS:function wS(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qv$=d
_.cc$=e
_.ar$=f
_.a=null},QL:function QL(d,e,f,g,h,i,j){var _=this
_.e7=d
_.y1=e
_.y2=f
_.dw$=g
_.ad$=h
_.cq$=i
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
aFN(d,e,f,g,h){var x=null
return new A.vk(d,new D.S0(e,f,!0,!0,!0,x),x,C.a9,!1,x,x,g,x,!0,x,0,x,x,f,C.mj,C.F,x,x,C.K,C.aA,x)},
vk:function vk(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0){var _=this
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
S2:function S2(d,e,f){this.f=d
this.d=e
this.a=f}}
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
A.amB.prototype={
a0n(d){var x=this.c
return d.yJ(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.b_(B.a(["scrollOffset: "+B.l(x.a),"crossAxisOffset: "+B.l(x.b),"mainAxisExtent: "+B.l(x.c),"crossAxisExtent: "+B.l(x.d)],y.x),", ")+")"}}
A.amC.prototype={}
A.amD.prototype={
a0y(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.je(d/x)-1)
return 0},
aaX(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BW(d){var x=this,w=x.a,v=C.k.bh(d,w)
return new A.amB(C.k.j6(d,w)*x.b,x.aaX(v*x.c),x.d,x.e)},
Wi(d){var x
if(d===0)return 0
x=this.b
return x*(C.k.j6(d-1,this.a)+1)-(x-this.d)}}
A.amA.prototype={}
A.Es.prototype={
L8(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.amD(v,t+x.b,u+w,t,u,B.yW(d.x))}}
A.wS.prototype={
k(d){return"crossAxisOffset="+B.l(this.w)+"; "+this.a3X(0)}}
A.QL.prototype={
dR(d){if(!(d.b instanceof A.wS))d.b=new A.wS(!1,null,null)},
sa0Q(d){var x,w,v=this
if(v.e7===d)return
x=!0
if(B.t(d)===B.t(v.e7)){w=v.e7
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.W()
v.e7=d},
q2(d){var x=d.b
x.toString
x=y.t.a(x).w
x.toString
return x},
bo(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.v.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.e7.L8(a8)
t=u.b
s=t>1e-10?u.a*C.d.j6(w,t):0
r=isFinite(v)?u.a0y(v):a7
if(a6.ad$!=null){q=a6.amz(s)
a6.uo(q,r!=null?a6.amC(r):0)}else a6.uo(0,0)
p=u.BW(s)
if(a6.ad$==null)if(!a6.Vl(s,p.a)){o=u.Wi(a9.gum())
a6.dy=B.kZ(a7,!1,a7,a7,o,0,0,o,a7)
a9.uH()
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
for(;k>=s;--k){i=u.BW(k)
h=i.c
g=a6.arg(a8.yJ(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eB(p.a0n(a8))
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
break}i=u.BW(k)
e=i.c
a0=a8.yJ(i.d,e,e)
a1=j.b
a1.toString
g=h.a(a1).ar$
if(g!=null){a1=g.b
a1.toString
a1=l.a(a1).b
a1.toString
a1=a1!==k}else a1=!0
if(a1){g=a6.arf(a0,j)
if(g==null){d=!0
break}}else g.eB(a0)
a1=g.b
a1.toString
t.a(a1)
a2=i.a
a1.a=a2
a1.w=i.b
m=Math.max(m,a2+e);++k
j=g}t=a6.cq$
t.toString
t=t.b
t.toString
t=l.a(t).b
t.toString
a3=d?m:a9.Xn(a8,s,t,n,m)
a4=a6.uj(a8,Math.min(x,n),m)
a5=a6.yY(a8,n,m)
a6.dy=B.kZ(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uH()}}
A.vk.prototype={
VU(d){return new A.S2(this.to,this.x1,null)}}
A.S2.prototype={
aA(d){var x=new A.QL(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.ag(y.d))
x.az()
return x},
aJ(d,e){e.sa0Q(this.f)},
Ij(d,e,f,g,h){var x
this.a3Y(d,e,f,g,h)
x=this.f.L8(d).Wi(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.p,[A.amB,A.amC,A.amA])
w(A.amD,A.amC)
w(A.Es,A.amA)
w(A.wS,D.fv)
w(A.QL,D.oo)
w(A.vk,D.zH)
w(A.S2,D.mw)})()
B.ll(b.typeUniverse,JSON.parse('{"wS":{"fv":[],"l_":[],"dS":["B"],"jJ":[],"cM":[]},"QL":{"oo":[],"cR":[],"ao":["B","fv"],"v":[],"ap":[],"ao.1":"fv","ao.0":"B"},"vk":{"a2":[],"e":[]},"S2":{"mw":[],"as":[],"e":[]}}'))
var y={d:B.a1("dJ"),x:B.a1("o<i>"),g:B.a1("B"),z:B.a1("j6"),t:B.a1("wS"),v:B.a1("t7"),c:B.a1("fv"),e:B.a1("m")}};
(a=>{a["zoAZnI5RaHxesHcWwgGoHoCbONE="]=a.current})($__dart_deferred_initializers__);