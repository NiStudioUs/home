((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={all:function all(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},alm:function alm(){},aln:function aln(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},alk:function alk(){},E9:function E9(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wG:function wG(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qu$=d
_.cc$=e
_.ar$=f
_.a=null},Qd:function Qd(d,e,f,g,h,i,j){var _=this
_.e6=d
_.y1=e
_.y2=f
_.du$=g
_.ad$=h
_.cp$=i
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
aE8(d,e,f,g,h){var x=null
return new A.v8(d,new D.Rs(e,f,!0,!0,!0,x),x,C.a9,!1,x,x,g,x,!0,x,0,x,x,f,C.lY,C.H,x,x,C.P,C.ay,x)},
v8:function v8(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0){var _=this
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
Ru:function Ru(d,e,f){this.f=d
this.d=e
this.a=f}},E
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
E=c[15]
A.all.prototype={
a05(d){var x=this.c
return d.yF(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.aZ(B.a(["scrollOffset: "+B.l(x.a),"crossAxisOffset: "+B.l(x.b),"mainAxisExtent: "+B.l(x.c),"crossAxisExtent: "+B.l(x.d)],y.x),", ")+")"}}
A.alm.prototype={}
A.aln.prototype={
a0g(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.je(d/x)-1)
return 0},
aau(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BP(d){var x=this,w=x.a,v=C.i.bf(d,w)
return new A.all(C.i.j6(d,w)*x.b,x.aau(v*x.c),x.d,x.e)},
W1(d){var x
if(d===0)return 0
x=this.b
return x*(C.i.j6(d-1,this.a)+1)-(x-this.d)}}
A.alk.prototype={}
A.E9.prototype={
L2(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.aln(v,t+x.b,u+w,t,u,B.yH(d.x))}}
A.wG.prototype={
k(d){return"crossAxisOffset="+B.l(this.w)+"; "+this.a3D(0)}}
A.Qd.prototype={
dP(d){if(!(d.b instanceof A.wG))d.b=new A.wG(!1,null,null)},
sa0w(d){var x,w,v=this
if(v.e6===d)return
x=!0
if(B.t(d)===B.t(v.e6)){w=v.e6
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.W()
v.e6=d},
q1(d){var x=d.b
x.toString
x=y.t.a(x).w
x.toString
return x},
bl(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.v.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.e6.L2(a8)
t=u.b
s=t>1e-10?u.a*C.d.j6(w,t):0
r=isFinite(v)?u.a0g(v):a7
if(a6.ad$!=null){q=a6.am0(s)
a6.um(q,r!=null?a6.am3(r):0)}else a6.um(0,0)
p=u.BP(s)
if(a6.ad$==null)if(!a6.V6(s,p.a)){o=u.W1(a9.guk())
a6.dy=B.kM(a7,!1,a7,a7,o,0,0,o,a7)
a9.uF()
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
for(;k>=s;--k){i=u.BP(k)
h=i.c
g=a6.aqG(a8.yF(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eA(p.a05(a8))
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
h=B.k(a6).i("am.1")
f=r!=null
for(;;){if(!(!f||k<=r)){d=!1
break}i=u.BP(k)
e=i.c
a0=a8.yF(i.d,e,e)
a1=j.b
a1.toString
g=h.a(a1).ar$
if(g!=null){a1=g.b
a1.toString
a1=l.a(a1).b
a1.toString
a1=a1!==k}else a1=!0
if(a1){g=a6.aqF(a0,j)
if(g==null){d=!0
break}}else g.eA(a0)
a1=g.b
a1.toString
t.a(a1)
a2=i.a
a1.a=a2
a1.w=i.b
m=Math.max(m,a2+e);++k
j=g}t=a6.cp$
t.toString
t=t.b
t.toString
t=l.a(t).b
t.toString
a3=d?m:a9.X6(a8,s,t,n,m)
a4=a6.uh(a8,Math.min(x,n),m)
a5=a6.yU(a8,n,m)
a6.dy=B.kM(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uF()}}
A.v8.prototype={
VD(d){return new A.Ru(this.to,this.x1,null)}}
A.Ru.prototype={
az(d){var x=new A.Qd(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.af(y.d))
x.aw()
return x},
aJ(d,e){e.sa0w(this.f)},
Ic(d,e,f,g,h){var x
this.a3E(d,e,f,g,h)
x=this.f.L2(d).W1(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.o,[A.all,A.alm,A.alk])
w(A.aln,A.alm)
w(A.E9,A.alk)
w(A.wG,D.fr)
w(A.Qd,D.oe)
w(A.v8,D.zs)
w(A.Ru,D.ml)})()
B.l8(b.typeUniverse,JSON.parse('{"wG":{"fr":[],"kN":[],"dQ":["A"],"jB":[],"cD":[]},"Qd":{"oe":[],"cK":[],"am":["A","fr"],"v":[],"an":[],"am.1":"fr","am.0":"A"},"v8":{"a1":[],"e":[]},"Ru":{"ml":[],"aq":[],"e":[]}}'))
var y={d:B.a0("dH"),x:B.a0("p<j>"),g:B.a0("A"),z:B.a0("j_"),t:B.a0("wG"),v:B.a0("rS"),c:B.a0("fr"),e:B.a0("m")};(function constants(){E.dd=new B.bJ(16,null,null,null)})()};
(a=>{a["UaVFKrPa1T0BEljzdUez944KvVk="]=a.current})($__dart_deferred_initializers__);