((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,D,A={alM:function alM(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},alN:function alN(){},alO:function alO(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},alL:function alL(){},Ei:function Ei(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wM:function wM(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qu$=d
_.cc$=e
_.ar$=f
_.a=null},Qq:function Qq(d,e,f,g,h,i,j){var _=this
_.e7=d
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
aET(d,e,f,g,h){var x=null
return new A.vc(d,new D.RF(e,f,!0,!0,!0,x),x,C.a8,!1,x,x,g,x,!0,x,0,x,x,f,C.md,C.G,x,x,C.Q,C.ay,x)},
vc:function vc(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0){var _=this
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
RH:function RH(d,e,f){this.f=d
this.d=e
this.a=f}}
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
A.alM.prototype={
a0a(d){var x=this.c
return d.yG(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.aZ(B.a(["scrollOffset: "+B.l(x.a),"crossAxisOffset: "+B.l(x.b),"mainAxisExtent: "+B.l(x.c),"crossAxisExtent: "+B.l(x.d)],y.x),", ")+")"}}
A.alN.prototype={}
A.alO.prototype={
a0l(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.d.je(d/x)-1)
return 0},
aaz(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
BR(d){var x=this,w=x.a,v=C.k.bf(d,w)
return new A.alM(C.k.j6(d,w)*x.b,x.aaz(v*x.c),x.d,x.e)},
W5(d){var x
if(d===0)return 0
x=this.b
return x*(C.k.j6(d-1,this.a)+1)-(x-this.d)}}
A.alL.prototype={}
A.Ei.prototype={
L4(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.alO(v,t+x.b,u+w,t,u,B.yP(d.x))}}
A.wM.prototype={
k(d){return"crossAxisOffset="+B.l(this.w)+"; "+this.a3I(0)}}
A.Qq.prototype={
dP(d){if(!(d.b instanceof A.wM))d.b=new A.wM(!1,null,null)},
sa0B(d){var x,w,v=this
if(v.e7===d)return
x=!0
if(B.t(d)===B.t(v.e7)){w=v.e7
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.W()
v.e7=d},
q1(d){var x=d.b
x.toString
x=y.t.a(x).w
x.toString
return x},
bm(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.v.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.e7.L4(a8)
t=u.b
s=t>1e-10?u.a*C.d.j6(w,t):0
r=isFinite(v)?u.a0l(v):a7
if(a6.ad$!=null){q=a6.ama(s)
a6.um(q,r!=null?a6.amd(r):0)}else a6.um(0,0)
p=u.BR(s)
if(a6.ad$==null)if(!a6.Va(s,p.a)){o=u.W5(a9.guk())
a6.dy=B.kQ(a7,!1,a7,a7,o,0,0,o,a7)
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
for(;k>=s;--k){i=u.BR(k)
h=i.c
g=a6.aqP(a8.yG(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eA(p.a0a(a8))
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
h=B.k(a6).i("an.1")
f=r!=null
for(;;){if(!(!f||k<=r)){d=!1
break}i=u.BR(k)
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
if(a1){g=a6.aqO(a0,j)
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
a3=d?m:a9.Xa(a8,s,t,n,m)
a4=a6.uh(a8,Math.min(x,n),m)
a5=a6.yV(a8,n,m)
a6.dy=B.kQ(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uF()}}
A.vc.prototype={
VH(d){return new A.RH(this.to,this.x1,null)}}
A.RH.prototype={
az(d){var x=new A.Qq(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.af(y.d))
x.aw()
return x},
aJ(d,e){e.sa0B(this.f)},
Ie(d,e,f,g,h){var x
this.a3J(d,e,f,g,h)
x=this.f.L4(d).W5(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.o,[A.alM,A.alN,A.alL])
w(A.alO,A.alN)
w(A.Ei,A.alL)
w(A.wM,D.fs)
w(A.Qq,D.oi)
w(A.vc,D.zA)
w(A.RH,D.mo)})()
B.lc(b.typeUniverse,JSON.parse('{"wM":{"fs":[],"kR":[],"dS":["A"],"jF":[],"cJ":[]},"Qq":{"oi":[],"cP":[],"an":["A","fs"],"v":[],"ao":[],"an.1":"fs","an.0":"A"},"vc":{"a0":[],"e":[]},"RH":{"mo":[],"ar":[],"e":[]}}'))
var y={d:B.a1("dJ"),x:B.a1("p<i>"),g:B.a1("A"),z:B.a1("j2"),t:B.a1("wM"),v:B.a1("t_"),c:B.a1("fs"),e:B.a1("m")}};
(a=>{a["T96dII92x03Cb1S4wTd9f4RgLCY="]=a.current})($__dart_deferred_initializers__);