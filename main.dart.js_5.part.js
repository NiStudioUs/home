((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={amC:function amC(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},amD:function amD(){},amE:function amE(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},amB:function amB(){},Et:function Et(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wT:function wT(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qw$=d
_.cd$=e
_.ar$=f
_.a=null},QM:function QM(d,e,f,g,h,i,j){var _=this
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
aFX(d,e,f,g,h){var x=null
return new A.vl(d,new D.S1(e,f,!0,!0,!0,x),x,C.a9,!1,x,x,g,x,!0,x,0,x,x,f,C.mj,C.F,x,x,C.K,C.as,x)},
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
S3:function S3(d,e,f){this.f=d
this.d=e
this.a=f}}
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
A.amC.prototype={
a0s(d){var x=this.c
return d.yJ(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.b_(B.a(["scrollOffset: "+B.m(x.a),"crossAxisOffset: "+B.m(x.b),"mainAxisExtent: "+B.m(x.c),"crossAxisExtent: "+B.m(x.d)],y.x),", ")+")"}}
A.amD.prototype={}
A.amE.prototype={
a0D(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.je(d/x)-1)
return 0},
ab0(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BW(d){var x=this,w=x.a,v=C.k.bh(d,w)
return new A.amC(C.k.j6(d,w)*x.b,x.ab0(v*x.c),x.d,x.e)},
Wm(d){var x
if(d===0)return 0
x=this.b
return x*(C.k.j6(d-1,this.a)+1)-(x-this.d)}}
A.amB.prototype={}
A.Et.prototype={
L8(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.amE(v,t+x.b,u+w,t,u,B.yW(d.x))}}
A.wT.prototype={
k(d){return"crossAxisOffset="+B.m(this.w)+"; "+this.a41(0)}}
A.QM.prototype={
dS(d){if(!(d.b instanceof A.wT))d.b=new A.wT(!1,null,null)},
sa0V(d){var x,w,v=this
if(v.e7===d)return
x=!0
if(B.t(d)===B.t(v.e7)){w=v.e7
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.W()
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
u=a6.e7.L8(a8)
t=u.b
s=t>1e-10?u.a*C.d.j6(w,t):0
r=isFinite(v)?u.a0D(v):a7
if(a6.ad$!=null){q=a6.amC(s)
a6.uq(q,r!=null?a6.amF(r):0)}else a6.uq(0,0)
p=u.BW(s)
if(a6.ad$==null)if(!a6.Vp(s,p.a)){o=u.Wm(a9.gun())
a6.dy=B.l1(a7,!1,a7,a7,o,0,0,o,a7)
a9.uI()
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
g=a6.arj(a8.yJ(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eB(p.a0s(a8))
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
if(a1){g=a6.ari(a0,j)
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
a3=d?m:a9.Xr(a8,s,t,n,m)
a4=a6.uk(a8,Math.min(x,n),m)
a5=a6.yY(a8,n,m)
a6.dy=B.l1(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uI()}}
A.vl.prototype={
VY(d){return new A.S3(this.to,this.x1,null)}}
A.S3.prototype={
aB(d){var x=new A.QM(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.ag(y.d))
x.az()
return x},
aJ(d,e){e.sa0V(this.f)},
Ij(d,e,f,g,h){var x
this.a42(d,e,f,g,h)
x=this.f.L8(d).Wm(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.p,[A.amC,A.amD,A.amB])
w(A.amE,A.amD)
w(A.Et,A.amB)
w(A.wT,D.fx)
w(A.QM,D.oq)
w(A.vl,D.zH)
w(A.S3,D.mz)})()
B.lo(b.typeUniverse,JSON.parse('{"wT":{"fx":[],"l2":[],"dS":["A"],"jL":[],"cL":[]},"QM":{"oq":[],"cQ":[],"ao":["A","fx"],"v":[],"ap":[],"ao.1":"fx","ao.0":"A"},"vl":{"a2":[],"e":[]},"S3":{"mz":[],"as":[],"e":[]}}'))
var y={d:B.a1("dJ"),x:B.a1("o<i>"),g:B.a1("A"),z:B.a1("j6"),t:B.a1("wT"),v:B.a1("t8"),c:B.a1("fx"),e:B.a1("l")}};
(a=>{a["O9Z2E4TS83wayMWrnhU1AFXk1po="]=a.current})($__dart_deferred_initializers__);