var t = function (t, n) {
    this.c = t, this.p = null, this.n = n, this.d = 0;
};
t.prototype.r = function () {
    this.d = 1;
};
var n = function () {
    this.h = null;
};
n.prototype.add = function (n) {
    var r = new t(n, this.h);
    return this.h && (this.h.p = r), this.h = r, r;
}, n.prototype.i = function (t) {
    var this$1 = this;

    for (var n = this.h;n; ) 
        { n.d ? (n.p ? (n.p.n = n.n) : (this$1.h = n.n), n.n && (n.n.p = n.p)) : t(n.c), n = n.n; }
};
var r = function (t, n) {
    this.set(t, n);
};
r.prototype.set = function (t, n) {
    return this.x = t || 0, this.y = n || (0 !== n ? this.x : 0), this;
}, r.prototype.copy = function (t) {
    return this.set(t.x, t.y);
}, r.prototype.clone = function () {
    return new r(this.x, this.y);
};
var e = function (t) {
    this.l = new n(), this.z = t;
};
e.prototype.add = function (t) {
    t.n = this.l.add(t), t.z = this.z;
};
var i = function (t) {
    this.bitmap = t, this.anchor = new r(), this.position = new r(), this.scale = new r(1), this.rotation = 0, this.tint = 16777215, this.alpha = 1, this.visible = !0, this.n = null;
};
i.prototype.remove = function () {
    this.n && this.n.r();
};
var a = function (t, i) {
    var a = t.getContext("webgl", i), o = a.getExtension("ANGLE_instanced_arrays"), u = function (t, n) {
        var r = a.createShader(n);
        return a.shaderSource(r, t), a.compileShader(r), r;
    }, c = function (t, n, r) {
        var e = a.createBuffer();
        return a.bindBuffer(t, e), a.bufferData(t, n, r || 35044), e;
    }, h = [], s = {
        gl: a,
        camera: {
            at: new r(),
            to: new r(),
            angle: 0
        },
        bkg: function (t, n, r, e) {
            void 0 === e && (e = 1), a.clearColor(t, n, r, e);
        },
        texture: function (t, n, r) {
            var e = Object.assign({
                10240: 9729,
                10241: 9729,
                10242: 33071,
                10243: 33071
            }, r), i = a.createTexture();
            return a.bindTexture(3553, i), Object.keys(e).forEach(function (t) {
                return a.texParameteri(3553, t, e[t]);
            }), a.texImage2D(3553, 0, 6408, 6408, 5121, t), i.a = n || .001, {
                tex: i,
                w: t.width,
                h: t.height,
                u: [0,0,1,1]
            };
        },
        bitmap: function (t, n, r, e, i) {
            return {
                tex: t.tex,
                w: e,
                h: i,
                u: [n / t.w,r / t.h,e / t.w,i / t.h]
            };
        },
        layer: function (t) {
            var n = h.find(function (n) {
                return n.z === t;
            });
            return n || (n = new e(t), h.push(n), h.sort(function (t, n) {
                return t.z < n.z ? 1 : -1;
            })), n;
        }
    }, f = s.layer(0);
    s.add = function (t) {
        f.add(t);
    };
    var v = (function (t, n) {
        var r = u(t, 35633), e = u(n, 35632), i = a.createProgram();
        return a.attachShader(i, r), a.attachShader(i, e), a.linkProgram(i), i;
    })("attribute vec2 g;\nattribute vec2 a;\nattribute vec2 t;\nattribute float r;\nattribute vec2 s;\nattribute vec4 u;\nattribute vec4 c;\nattribute float z;\nuniform mat4 m;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nv=u.xy+g*u.zw;\ni=c.abgr;\nvec2 p=(g-a)*s;\nfloat q=cos(r);\nfloat w=sin(r);\np=vec2(p.x*q-p.y*w,p.x*w+p.y*q);\np+=a+t;\ngl_Position=m*vec4(p,z,1);}", "precision mediump float;\nuniform sampler2D x;\nuniform float j;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nvec4 c=texture2D(x,v);\nif(c.a<j)discard;\ngl_FragColor=c*i;\n}"), l = function (t, n, r, e, i, u, c) {
        var h = a.getAttribLocation(v, t);
        return a.enableVertexAttribArray(h), a.vertexAttribPointer(h, n, u || 5126, !(!c), r || 0, i || 0), e && o.vertexAttribDivisorANGLE(h, e), h;
    };
    c(34963, new Uint16Array([0,1,2,2,1,3])), c(34962, new Float32Array([0,0,0,1,
        1,0,1,1])), l("g", 2);
    var p = new ArrayBuffer(3407820), d = new Float32Array(p), y = new Uint32Array(p);
    c(34962, p, 35048), l("a", 2, 52, 1), l("s", 2, 52, 1, 8), l("r", 1, 52, 1, 16), l("t", 2, 52, 1, 20), l("u", 4, 52, 1, 28), l("c", 4, 52, 1, 44, 5121, !0), l("z", 1, 52, 1, 48);
    var x, b = function (t) {
        return a.getUniformLocation(v, t);
    }, m = b("m"), g = b("x"), w = b("j"), A = 0, z = function () {
        A && (a.bufferSubData(34962, 0, d.subarray(0, 13 * A)), o.drawElementsInstancedANGLE(4, 6, 5123, 0, A), A = 0);
    }, E = function (t) {
        if (t.visible) {
            65535 === A && z();
            var n = t.bitmap, r = n.tex, e = n.w, i = n.h, o = n.u;
            x !== r && (z(), x = r, a.bindTexture(3553, r), a.uniform1i(g, r), a.uniform1f(w, r.a));
            var u = 13 * A;
            d[u++] = t.anchor.x, d[u++] = t.anchor.y, d[u++] = t.scale.x * e, d[u++] = t.scale.y * i, d[u++] = t.rotation, d[u++] = t.position.x, d[u++] = t.position.y, d[u++] = o[0], d[u++] = o[1], d[u++] = o[2], d[u++] = o[3], y[u++] = ((16777215 & t.tint) << 8 | 255 * t.alpha & 255) >>> 0, d[u++] = -t.z, A++;
        }
    };
    return s.render = function () {
        var r = t.clientWidth, e = t.clientHeight;
        t.width = r, t.height = e, a.viewport(0, 0, r, e), a.disable(3042), a.enable(2929), a.depthFunc(513), a.clear(16640);
        var i = s.camera, o = i.at, u = i.to, c = i.angle, f = o.x - r * u.x, l = o.y - e * u.y, p = Math.cos(c), d = Math.sin(c), y = 2 / r, b = -2 / e, g = [p * y,
            d * b,0,0,-d * y,p * b,0,0,0,0,1e-5,0,(o.x * (1 - p) + o.y * d) * y + -(2 * f + r) / r,
            (o.y * (1 - p) - o.x * d) * b + (2 * l + e) / e,0,1];
        a.useProgram(v), a.activeTexture(33984), a.uniformMatrix4fv(m, !1, g), x = null;
        var A = new n();
        h.forEach(function (t) {
            t.l.i(function (t) {
                1 !== t.alpha ? A.add(t) : E(t);
            });
        }), z(), a.enable(3042), a.blendFunc(1, 771), a.depthFunc(515), a.uniform1f(w, .001), A.i(function (t) {
            return E(t);
        }), z();
    }, s.render(), s;
};
a.Sprite = i, a.Point = r;

var Point = a.Point;
var Sprite = a.Sprite;
var stats = new Stats();
document.body.appendChild(stats.dom);
var view = document.getElementById('view');
var renderer = a(view, {
    antialias: false
});
var gl = renderer.gl;
renderer.bkg(0.2, 0.2, 0.2, 0);
renderer.camera = {
    at: new Point(400, 300),
    to: new Point(0.5),
    angle: 0
};
var atlasImg = function () {
    var canvas = document.createElement('canvas');
    var size = 32;
    var half = size / 2;
    canvas.width = 96;
    canvas.height = 32;
    var ctx = canvas.getContext('2d');
    var offset = 0;
    ctx.lineWidth = size / 16;
    ctx.fillStyle = '#cccccc';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(offset + half, half);
    for (var angle = 0;angle < Math.PI * 2; angle += Math.PI * 2 / 5) {
        ctx.lineTo(offset + half - Math.sin(angle) * half * 0.9, half - Math.cos(angle) * half * 0.9);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    offset += size;
    ctx.beginPath();
    ctx.moveTo(offset + 3, 3);
    ctx.lineTo(offset + size - 3, 3);
    ctx.lineTo(offset + size - 3, size - 3);
    ctx.lineTo(offset + 3, size - 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    offset += size;
    ctx.beginPath();
    ctx.moveTo(offset + 3, 3);
    ctx.lineTo(offset + 29, 3);
    ctx.lineTo(offset + 29, 8);
    ctx.lineTo(offset + 8, 8);
    ctx.lineTo(offset + 8, 14);
    ctx.lineTo(offset + 20, 14);
    ctx.lineTo(offset + 20, 18);
    ctx.lineTo(offset + 8, 18);
    ctx.lineTo(offset + 8, 29);
    ctx.lineTo(offset + 3, 29);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    return canvas;
};
var logoMask = function () {
    var canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(400, 300);
    for (var angle = 0;angle < Math.PI * 2; angle += Math.PI * 2 / 5) {
        ctx.lineTo(400 - Math.sin(angle) * 250, 300 - Math.cos(angle) * 250);
    }
    ctx.closePath();
    ctx.fill();
    var ref = ctx.getImageData(0, 0, 800, 600);
    var data = ref.data;
    return function (x, y) { return data[(y * 800 + x) * 4] > 0; };
};
var atlasTex = renderer.texture(atlasImg(), 0.5);
var bBitmap = renderer.bitmap(atlasTex, 0, 0, 32, 32);
var qBitmap = renderer.bitmap(atlasTex, 32, 0, 32, 32);
var fBitmap = renderer.bitmap(atlasTex, 64, 0, 32, 32);
var bitmaps = [atlasTex,bBitmap,qBitmap,fBitmap];
var len = 0;
var sprs = [];
var mask = logoMask();
var addSprite = function (l, a$$1) {
    len += a$$1;
    for (var i = 0;i < a$$1; i++) {
        var s = new Sprite(bitmaps[i % 4]);
        var x = 0;
        var y = 0;
        while (!mask(x, y)) {
            x = ~(~(view.width * Math.random()));
            y = ~(~(view.height * Math.random()));
        }
        s.anchor = new Point(0.5);
        s.position = new Point(x, y);
        s.scale = new Point(0.5);
        s.tint = Math.random() * 0xffffff;
        s.rotation = Math.random() * Math.PI * 2;
        s.dr = (0.5 - Math.random()) * 0.2;
        sprs.push(s);
        l.add(s);
    }
};
addSprite(renderer.layer(0), 1000);
var sprites = document.getElementById('info');
var dbgRenderInfo = gl.getExtension('WEBGL_debug_renderer_info');
var info = gl.getParameter(dbgRenderInfo ? dbgRenderInfo.UNMASKED_RENDERER_WEBGL : gl.VENDOR);
var add = null;
var l = 1;
view.onmousedown = (function () {
    add = renderer.layer(l++);
});
view.ontouchstart = (function () {
    add = renderer.layer(l++);
});
view.onmouseup = (function () {
    add = null;
});
view.ontouchend = (function () {
    add = null;
});
var loop = function () {
    stats.begin();
    if (add) 
        { addSprite(add, 25); }
    sprites.innerHTML = "Renderer: " + info + "</br>Sprites: " + len + " (click to add)";
    sprs.forEach(function (sprite) {
        sprite.dr && (sprite.rotation += sprite.dr);
    });
    renderer.camera.angle += 0.005;
    renderer.render();
    stats.end();
    requestAnimationFrame(loop);
};
loop();
