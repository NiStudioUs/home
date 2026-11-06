((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={amL:function amL(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},amM:function amM(){},amN:function amN(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},amK:function amK(){},Ez:function Ez(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wU:function wU(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qp$=d
_.cf$=e
_.ar$=f
_.a=null},QS:function QS(d,e,f,g,h,i,j){var _=this
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
aGi(d,e,f,g,h){var x=null
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
A.amL.prototype={
a0x(d){var x=this.c
return d.yE(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.b1(B.a(["scrollOffset: "+B.m(x.a),"crossAxisOffset: "+B.m(x.b),"mainAxisExtent: "+B.m(x.c),"crossAxisExtent: "+B.m(x.d)],y.x),", ")+")"}}
A.amM.prototype={}
A.amN.prototype={
a0I(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.jd(d/x)-1)
return 0},
ab5(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BS(d){var x=this,w=x.a,v=C.k.bg(d,w)
return new A.amL(C.k.j5(d,w)*x.b,x.ab5(v*x.c),x.d,x.e)},
Wr(d){var x
if(d===0)return 0
x=this.b
return x*(C.k.j5(d-1,this.a)+1)-(x-this.d)}}
A.amK.prototype={}
A.Ez.prototype={
Lc(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.amN(v,t+x.b,u+w,t,u,B.z0(d.x))}}
A.wU.prototype={
k(d){return"crossAxisOffset="+B.m(this.w)+"; "+this.a45(0)}}
A.QS.prototype={
dS(d){if(!(d.b instanceof A.wU))d.b=new A.wU(!1,null,null)},
sa0Z(d){var x,w,v=this
if(v.e6===d)return
x=!0
if(B.t(d)===B.t(v.e6)){w=v.e6
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.X()
v.e6=d},
pY(d){var x=d.b
x.toString
x=y.t.a(x).w
x.toString
return x},
bp(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.v.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.e6.Lc(a8)
t=u.b
s=t>1e-10?u.a*C.d.j5(w,t):0
r=isFinite(v)?u.a0I(v):a7
if(a6.ad$!=null){q=a6.amM(s)
a6.uk(q,r!=null?a6.amP(r):0)}else a6.uk(0,0)
p=u.BS(s)
if(a6.ad$==null)if(!a6.Vt(s,p.a)){o=u.Wr(a9.gui())
a6.dy=B.l2(a7,!1,a7,a7,o,0,0,o,a7)
a9.uC()
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
for(;k>=s;--k){i=u.BS(k)
h=i.c
g=a6.arv(a8.yE(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eA(p.a0x(a8))
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
break}i=u.BS(k)
e=i.c
a0=a8.yE(i.d,e,e)
a1=j.b
a1.toString
g=h.a(a1).ar$
if(g!=null){a1=g.b
a1.toString
a1=l.a(a1).b
a1.toString
a1=a1!==k}else a1=!0
if(a1){g=a6.aru(a0,j)
if(g==null){d=!0
break}}else g.eA(a0)
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
a3=d?m:a9.Xw(a8,s,t,n,m)
a4=a6.uf(a8,Math.min(x,n),m)
a5=a6.yT(a8,n,m)
a6.dy=B.l2(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uC()}}
A.vm.prototype={
W1(d){return new A.S9(this.to,this.x1,null)}}
A.S9.prototype={
aB(d){var x=new A.QS(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.ah(y.d))
x.aA()
return x},
aJ(d,e){e.sa0Z(this.f)},
Ih(d,e,f,g,h){var x
this.a46(d,e,f,g,h)
x=this.f.Lc(d).Wr(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.p,[A.amL,A.amM,A.amK])
w(A.amN,A.amM)
w(A.Ez,A.amK)
w(A.wU,D.fy)
w(A.QS,D.oq)
w(A.vm,D.zN)
w(A.S9,D.mz)})()
B.lo(b.typeUniverse,JSON.parse('{"wU":{"fy":[],"l3":[],"dU":["B"],"jP":[],"cL":[]},"QS":{"oq":[],"cQ":[],"ao":["B","fy"],"v":[],"ap":[],"ao.1":"fy","ao.0":"B"},"vm":{"a2":[],"e":[]},"S9":{"mz":[],"as":[],"e":[]}}'))
var y={d:B.a1("dJ"),x:B.a1("o<i>"),g:B.a1("B"),z:B.a1("j7"),t:B.a1("wU"),v:B.a1("tb"),c:B.a1("fy"),e:B.a1("l")}};
(a=>{a["1V/Py9iUrRnGKcT5EfTOsLY+IvM="]=a.current})($__dart_deferred_initializers__);