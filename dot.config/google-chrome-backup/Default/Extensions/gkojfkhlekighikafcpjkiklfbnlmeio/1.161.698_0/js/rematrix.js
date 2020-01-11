/*! @license Rematrix v0.4.1 (MIT) Copyright 2019 Julian Lloyd. */
var Rematrix=function(r){"use strict";function t(r){if("string"==typeof r){var t=r.match(/matrix(3d)?\(([^)]+)\)/);if(t)return M(t[2].split(", ").map(parseFloat))}return o()}function M(r){if(r.constructor!==Array)throw new TypeError("Expected array.");if(16===r.length)return r;if(6!==r.length)throw new RangeError("Expected array with either 6 or 16 values.");var t=o();return t[0]=r[0],t[1]=r[1],t[4]=r[2],t[5]=r[3],t[12]=r[4],t[13]=r[5],t}function o(){for(var r=[],t=0;t<16;t++)t%5==0?r.push(1):r.push(0);return r}function n(r){var t=Math.PI/180*r,n=o();return n[0]=n[5]=Math.cos(t),n[1]=n[4]=Math.sin(t),n[4]*=-1,n}return r.format=M,r.fromString=t,r.identity=o,r.inverse=function(r){var t=M(r),n=t[0]*t[5]-t[4]*t[1],e=t[0]*t[6]-t[4]*t[2],a=t[0]*t[7]-t[4]*t[3],o=t[1]*t[6]-t[5]*t[2],u=t[1]*t[7]-t[5]*t[3],i=t[2]*t[7]-t[6]*t[3],c=t[10]*t[15]-t[14]*t[11],f=t[9]*t[15]-t[13]*t[11],s=t[9]*t[14]-t[13]*t[10],v=t[8]*t[15]-t[12]*t[11],h=t[8]*t[14]-t[12]*t[10],l=t[8]*t[13]-t[12]*t[9],p=1/(n*c-e*f+a*s+o*v-u*h+i*l);if(isNaN(p)||p==1/0)throw new Error("Inverse determinant attempted to divide by zero.");return[(t[5]*c-t[6]*f+t[7]*s)*p,(-t[1]*c+t[2]*f-t[3]*s)*p,(t[13]*i-t[14]*u+t[15]*o)*p,(-t[9]*i+t[10]*u-t[11]*o)*p,(-t[4]*c+t[6]*v-t[7]*h)*p,(t[0]*c-t[2]*v+t[3]*h)*p,(-t[12]*i+t[14]*a-t[15]*e)*p,(t[8]*i-t[10]*a+t[11]*e)*p,(t[4]*f-t[5]*v+t[7]*l)*p,(-t[0]*f+t[1]*v-t[3]*l)*p,(t[12]*u-t[13]*a+t[15]*n)*p,(-t[8]*u+t[9]*a-t[11]*n)*p,(-t[4]*s+t[5]*h-t[6]*l)*p,(t[0]*s-t[1]*h+t[2]*l)*p,(-t[12]*o+t[13]*e-t[14]*n)*p,(t[8]*o-t[9]*e+t[10]*n)*p]},r.multiply=function(r,t){for(var n=M(r),e=M(t),a=[],o=0;o<4;o++)for(var u=[n[o],n[o+4],n[o+8],n[o+12]],i=0;i<4;i++){var c=4*i,f=[e[c],e[1+c],e[2+c],e[3+c]],s=u[0]*f[0]+u[1]*f[1]+u[2]*f[2]+u[3]*f[3];a[o+c]=s}return a},r.parse=function(r){return console.warn("The `parse` method has been deprecated, please use `fromString`"),t(r)},r.perspective=function(r){var t=o();return t[11]=-1/r,t},r.rotate=function(r){return n(r)},r.rotateX=function(r){var t=Math.PI/180*r,n=o();return n[5]=n[10]=Math.cos(t),n[6]=n[9]=Math.sin(t),n[9]*=-1,n},r.rotateY=function(r){var t=Math.PI/180*r,n=o();return n[0]=n[10]=Math.cos(t),n[2]=n[8]=Math.sin(t),n[2]*=-1,n},r.rotateZ=n,r.scale=function(r,t){var n=o();return n[0]=r,n[5]="number"==typeof t?t:r,n},r.scaleX=function(r){var t=o();return t[0]=r,t},r.scaleY=function(r){var t=o();return t[5]=r,t},r.scaleZ=function(r){var t=o();return t[10]=r,t},r.skew=function(r,t){var n=Math.PI/180*r,e=o();if(e[4]=Math.tan(n),t){var a=Math.PI/180*t;e[1]=Math.tan(a)}return e},r.skewX=function(r){var t=Math.PI/180*r,n=o();return n[4]=Math.tan(t),n},r.skewY=function(r){var t=Math.PI/180*r,n=o();return n[1]=Math.tan(t),n},r.toString=function(r){return"matrix3d("+M(r).join(", ")+")"},r.translate=function(r,t){var n=o();return n[12]=r,t&&(n[13]=t),n},r.translate3d=function(r,t,n){var e=o();return void 0!==r&&void 0!==t&&void 0!==n&&(e[12]=r,e[13]=t,e[14]=n),e},r.translateX=function(r){var t=o();return t[12]=r,t},r.translateY=function(r){var t=o();return t[13]=r,t},r.translateZ=function(r){var t=o();return t[14]=r,t},r}({});