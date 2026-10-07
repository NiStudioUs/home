((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={alf:function alf(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},alg:function alg(){},alh:function alh(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},ale:function ale(){},E7:function E7(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wD:function wD(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qu$=d
_.cc$=e
_.ar$=f
_.a=null},Qa:function Qa(d,e,f,g,h,i,j){var _=this
_.e6=d
_.y1=e
_.y2=f
_.dt$=g
_.ad$=h
_.co$=i
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
_.dx=$},OL:function OL(d){this.a=d},
aDW(d,e,f,g,h){var x=null
return new A.v6(d,new D.Ro(e,f,!0,!0,!0,x),x,C.a9,!1,x,x,g,x,!0,x,0,x,x,f,C.lR,C.H,x,x,C.O,C.ay,x)},
v6:function v6(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0){var _=this
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
Rq:function Rq(d,e,f){this.f=d
this.d=e
this.a=f}},E
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
E=c[15]
A.alf.prototype={
a01(d){var x=this.c
return d.yD(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.aZ(B.a(["scrollOffset: "+B.l(x.a),"crossAxisOffset: "+B.l(x.b),"mainAxisExtent: "+B.l(x.c),"crossAxisExtent: "+B.l(x.d)],y.x),", ")+")"}}
A.alg.prototype={}
A.alh.prototype={
a0c(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.jb(d/x)-1)
return 0},
aap(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BO(d){var x=this,w=x.a,v=C.i.bf(d,w)
return new A.alf(C.i.j3(d,w)*x.b,x.aap(v*x.c),x.d,x.e)},
VZ(d){var x
if(d===0)return 0
x=this.b
return x*(C.i.j3(d-1,this.a)+1)-(x-this.d)}}
A.ale.prototype={}
A.E7.prototype={
L_(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.alh(v,t+x.b,u+w,t,u,B.yE(d.x))}}
A.wD.prototype={
k(d){return"crossAxisOffset="+B.l(this.w)+"; "+this.a3z(0)}}
A.Qa.prototype={
dN(d){if(!(d.b instanceof A.wD))d.b=new A.wD(!1,null,null)},
sa0s(d){var x,w,v=this
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
bk(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.v.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.e6.L_(a8)
t=u.b
s=t>1e-10?u.a*C.d.j3(w,t):0
r=isFinite(v)?u.a0c(v):a7
if(a6.ad$!=null){q=a6.alW(s)
a6.um(q,r!=null?a6.alZ(r):0)}else a6.um(0,0)
p=u.BO(s)
if(a6.ad$==null)if(!a6.V3(s,p.a)){o=u.VZ(a9.guk())
a6.dy=B.kJ(a7,!1,a7,a7,o,0,0,o,a7)
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
for(;k>=s;--k){i=u.BO(k)
h=i.c
g=a6.aqC(a8.yD(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eA(p.a01(a8))
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
break}i=u.BO(k)
e=i.c
a0=a8.yD(i.d,e,e)
a1=j.b
a1.toString
g=h.a(a1).ar$
if(g!=null){a1=g.b
a1.toString
a1=l.a(a1).b
a1.toString
a1=a1!==k}else a1=!0
if(a1){g=a6.aqB(a0,j)
if(g==null){d=!0
break}}else g.eA(a0)
a1=g.b
a1.toString
t.a(a1)
a2=i.a
a1.a=a2
a1.w=i.b
m=Math.max(m,a2+e);++k
j=g}t=a6.co$
t.toString
t=t.b
t.toString
t=l.a(t).b
t.toString
a3=d?m:a9.X2(a8,s,t,n,m)
a4=a6.uh(a8,Math.min(x,n),m)
a5=a6.yS(a8,n,m)
a6.dy=B.kJ(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uE()}}
A.OL.prototype={
mi(d){return new A.OL(this.nM(d))},
gGs(){return!1},
gnI(){return!1}}
A.v6.prototype={
VA(d){return new A.Rq(this.to,this.x1,null)}}
A.Rq.prototype={
az(d){var x=new A.Qa(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.af(y.d))
x.aw()
return x},
aJ(d,e){e.sa0s(this.f)},
I8(d,e,f,g,h){var x
this.a3A(d,e,f,g,h)
x=this.f.L_(d).VZ(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.o,[A.alf,A.alg,A.ale])
w(A.alh,A.alg)
w(A.E7,A.ale)
w(A.wD,D.fp)
w(A.Qa,D.od)
w(A.OL,B.ok)
w(A.v6,D.zp)
w(A.Rq,D.mj)})()
B.l5(b.typeUniverse,JSON.parse('{"wD":{"fp":[],"kK":[],"dP":["A"],"jB":[],"cD":[]},"Qa":{"od":[],"cJ":[],"am":["A","fp"],"v":[],"an":[],"am.1":"fp","am.0":"A"},"v6":{"a1":[],"e":[]},"Rq":{"mj":[],"aq":[],"e":[]}}'))
var y={d:B.a_("dF"),x:B.a_("p<j>"),g:B.a_("A"),z:B.a_("j_"),t:B.a_("wD"),v:B.a_("rQ"),c:B.a_("fp"),e:B.a_("m")};(function constants(){E.l6=new A.OL(null)
E.dc=new B.bL(16,null,null,null)})()};
(a=>{a["qvvEg2K5MM3IiBjWvSzj8AnTsio="]=a.current})($__dart_deferred_initializers__);