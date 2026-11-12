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
_.f=i},amK:function amK(){},Ex:function Ex(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.d=g},wU:function wU(d,e,f){var _=this
_.b=_.w=null
_.c=!1
_.qq$=d
_.ce$=e
_.ar$=f
_.a=null},QX:function QX(d,e,f,g,h,i,j){var _=this
_.eb=d
_.y1=e
_.y2=f
_.dB$=g
_.ad$=h
_.cv$=i
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
aGh(d,e,f,g,h){var x=null
return new A.vq(d,new D.S9(e,f,!0,!0,!0,x),x,C.ab,!1,x,x,g,x,!0,x,0,x,x,f,C.mp,C.G,x,x,C.L,C.at,x)},
vq:function vq(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0){var _=this
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
Sb:function Sb(d,e,f){this.f=d
this.d=e
this.a=f}}
B=c[0]
C=c[2]
D=c[13]
A=a.updateHolder(c[9],A)
A.amL.prototype={
a0S(d){var x=this.c
return d.yL(this.d,x,x)},
k(d){var x=this
return"SliverGridGeometry("+C.b.b1(B.a(["scrollOffset: "+B.m(x.a),"crossAxisOffset: "+B.m(x.b),"mainAxisExtent: "+B.m(x.c),"crossAxisExtent: "+B.m(x.d)],y.x),", ")+")"}}
A.amM.prototype={}
A.amN.prototype={
a11(d){var x=this.b
if(x>0)return Math.max(0,this.a*C.e.jk(d/x)-1)
return 0},
abx(d){var x,w,v=this
if(v.f){x=v.c
w=v.e
return v.a*x-d-w-(x-w)}return d},
C4(d){var x=this,w=x.a,v=C.j.bd(d,w)
return new A.amL(C.j.jc(d,w)*x.b,x.abx(v*x.c),x.d,x.e)},
WE(d){var x
if(d===0)return 0
x=this.b
return x*(C.j.jc(d-1,this.a)+1)-(x-this.d)}}
A.amK.prototype={}
A.Ex.prototype={
Lf(d){var x=this,w=x.c,v=x.a,u=Math.max(0,d.w-w*(v-1))/v,t=u/x.d
return new A.amN(v,t+x.b,u+w,t,u,B.yZ(d.x))}}
A.wU.prototype={
k(d){return"crossAxisOffset="+B.m(this.w)+"; "+this.a4q(0)}}
A.QX.prototype={
dZ(d){if(!(d.b instanceof A.wU))d.b=new A.wU(!1,null,null)},
sa1g(d){var x,w,v=this
if(v.eb===d)return
x=!0
if(B.r(d)===B.r(v.eb)){w=v.eb
if(w.a===d.a)if(w.b===d.b)if(w.c===d.c)x=w.d!==d.d}if(x)v.W()
v.eb=d},
q0(d){var x=d.b
x.toString
x=y.t.a(x).w
x.toString
return x},
bp(){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6=this,a7=null,a8=y.z.a(B.x.prototype.gZ.call(a6)),a9=a6.y1
a9.R8=!1
x=a8.d
w=x+a8.z
v=w+a8.Q
u=a6.eb.Lf(a8)
t=u.b
s=t>1e-10?u.a*C.e.jc(w,t):0
r=isFinite(v)?u.a11(v):a7
if(a6.ad$!=null){q=a6.anh(s)
a6.uk(q,r!=null?a6.ank(r):0)}else a6.uk(0,0)
p=u.C4(s)
if(a6.ad$==null)if(!a6.VC(s,p.a)){o=u.WE(a9.gui())
a6.dy=B.l7(a7,!1,a7,a7,o,0,0,o,a7)
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
for(;k>=s;--k){i=u.C4(k)
h=i.c
g=a6.as_(a8.yL(i.d,h,h))
f=g.b
f.toString
t.a(f)
e=i.a
f.a=e
f.w=i.b
if(j==null)j=g
m=Math.max(m,e+h)}if(j==null){h=a6.ad$
h.toString
h.eB(p.a0S(a8))
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
break}i=u.C4(k)
e=i.c
a0=a8.yL(i.d,e,e)
a1=j.b
a1.toString
g=h.a(a1).ar$
if(g!=null){a1=g.b
a1.toString
a1=l.a(a1).b
a1.toString
a1=a1!==k}else a1=!0
if(a1){g=a6.arZ(a0,j)
if(g==null){d=!0
break}}else g.eB(a0)
a1=g.b
a1.toString
t.a(a1)
a2=i.a
a1.a=a2
a1.w=i.b
m=Math.max(m,a2+e);++k
j=g}t=a6.cv$
t.toString
t=t.b
t.toString
t=l.a(t).b
t.toString
a3=d?m:a9.XL(a8,s,t,n,m)
a4=a6.uf(a8,Math.min(x,n),m)
a5=a6.z1(a8,n,m)
a6.dy=B.l7(a5,a3>a4||x>0||a8.f!==0,a7,a7,a3,a4,0,a3,a7)
if(a3===m)a9.R8=!0
a9.uF()}}
A.vq.prototype={
Wd(d){return new A.Sb(this.to,this.x1,null)}}
A.Sb.prototype={
aB(d){var x=new A.QX(this.f,y.v.a(d),B.n(y.e,y.g),0,null,null,B.ai(y.d))
x.aA()
return x},
aK(d,e){e.sa1g(this.f)},
Il(d,e,f,g,h){var x
this.a4r(d,e,f,g,h)
x=this.f.Lf(d).WE(this.d.b)
return x}}
var z=a.updateTypes([]);(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.w,[A.amL,A.amM,A.amK])
w(A.amN,A.amM)
w(A.Ex,A.amK)
w(A.wU,D.fy)
w(A.QX,D.ov)
w(A.vq,D.zL)
w(A.Sb,D.mH)})()
B.ls(b.typeUniverse,JSON.parse('{"wU":{"fy":[],"l8":[],"dY":["C"],"jT":[],"cK":[]},"QX":{"ov":[],"cQ":[],"an":["C","fy"],"x":[],"ao":[],"an.1":"fy","an.0":"C"},"vq":{"a1":[],"e":[]},"Sb":{"mH":[],"ap":[],"e":[]}}'))
var y={d:B.a_("dN"),x:B.a_("o<i>"),g:B.a_("C"),z:B.a_("jf"),t:B.a_("wU"),v:B.a_("td"),c:B.a_("fy"),e:B.a_("l")}};
(a=>{a["liQUYNHG5bL+GxcN0pwFM/7aS0s="]=a.current})($__dart_deferred_initializers__);