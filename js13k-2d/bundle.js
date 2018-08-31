var t = function (t, n) {
    this.c = t, this.p = null, this.n = n, this.d = !1;
};
t.prototype.r = function () {
    this.d = !0;
};
var n = function () {
    this.h = null;
};
n.prototype.add = function (n) {
    var e = new t(n, this.h);
    return this.h && (this.h.p = e), this.h = e, e;
}, n.prototype.iterate = function (t) {
    var this$1 = this;

    for (var n = this.h;n; ) 
        { n.d ? (n.p ? (n.p.n = n.n) : (this$1.h = n.n), n.n && (n.n.p = n.p)) : t(n.c), n = n.n; }
};
var e = function (t) {
    this.l = new n(), this.z = t;
};
e.prototype.add = function (t) {
    t.node = this.l.add(t), t.z = this.z;
};
var r = function (t) {
    this.bitmap = t, this.anchor = {
        x: .5,
        y: .5
    }, this.position = {
        x: 0,
        y: 0
    }, this.rotation = 0, this.scale = {
        x: 1,
        y: 1
    }, this.tint = 16777215, this.alpha = 1, this.visible = !0, this.node = null;
};
r.prototype.remove = function () {
    this.node && this.node.r();
};
var i = function (t, r) {
    var i = t.getContext("webgl", r), a = i.getExtension("ANGLE_instanced_arrays"), o = function (t, n) {
        var e = i.createShader(n);
        return i.shaderSource(e, t), i.compileShader(e), e;
    }, u = function (t, n, e) {
        var r = i.createBuffer();
        return i.bindBuffer(t, r), i.bufferData(t, n, e), r;
    }, c = [], h = {
        gl: i,
        camera: {
            at: {
                x: 0,
                y: 0
            },
            to: {
                x: 0,
                y: 0
            },
            angle: 0
        },
        bkg: function (t, n, e, r) {
            i.clearColor(t, n, e, r || (0 === r ? 0 : 1));
        },
        texture: function (t, n, e, r, a) {
            var o = i.createTexture();
            return i.bindTexture(3553, o), i.texParameteri(3553, 10242, n || 33071), i.texParameteri(3553, 10243, e || 33071), i.texParameteri(3553, 10240, a || 9729), i.texParameteri(3553, 10241, r || 9729), i.texImage2D(3553, 0, 6408, 6408, 5121, t), o.alphaTest = 1 / 256, {
                tex: o,
                width: t.width,
                height: t.height,
                uvs: [0,0,1,1]
            };
        },
        bitmap: function (t, n, e, r, i) {
            var a = r - n + 1, o = i - e + 1;
            return {
                tex: t.tex,
                width: a,
                height: o,
                uvs: [n / t.width,e / t.height,a / t.width,o / t.height]
            };
        },
        layer: function (t) {
            var n = c.find(function (n) {
                return n.z === t;
            });
            if (n) 
                { return n; }
            var r = new e(t);
            return c.push(r), c.sort(function (t, n) {
                return t.z < n.z ? 1 : t.z > n.z ? -1 : 0;
            }), r;
        }
    }, f = h.layer(0);
    h.add = function (t) {
        f.add(t);
    };
    var s = (function (t, n) {
        var e = o(t, 35633), r = o(n, 35632), a = i.createProgram();
        return i.attachShader(a, e), i.attachShader(a, r), i.linkProgram(a), a;
    })("attribute vec2 g;\nattribute vec2 a;\nattribute vec2 t;\nattribute float r;\nattribute vec2 s;\nattribute vec4 u;\nattribute vec4 c;\nattribute float z;\nuniform mat4 m;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nv=u.xy+g*u.zw;\ni=c.abgr;\nvec2 p=(g-a)*s;\nfloat q=cos(r);\nfloat w=sin(r);\np=vec2(p.x*q-p.y*w,p.x*w+p.y*q);\np+=a+t;\ngl_Position=m*vec4(p,z,1);}", "precision mediump float;\nuniform sampler2D x;\nuniform float j;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nvec4 c=texture2D(x,v);\nif(c.a<j)discard;\ngl_FragColor=c*i;\n}"), v = function (t, n, e, r, o, u, c) {
        var h = i.getAttribLocation(s, t);
        return i.enableVertexAttribArray(h), i.vertexAttribPointer(h, n, u || i.FLOAT, !(!c), e || 0, o || 0), r && a.vertexAttribDivisorANGLE(h, r), h;
    };
    u(34963, new Uint16Array([0,1,2,2,1,3]), 35044), u(34962, new Float32Array([0,
        0,0,1,1,0,1,1]), 35044), v("g", 2);
    var l = new ArrayBuffer(3407820), d = new Float32Array(l), p = new Uint32Array(l);
    u(34962, l, 35048), v("a", 2, 52, 1), v("s", 2, 52, 1, 8), v("r", 1, 52, 1, 16), v("t", 2, 52, 1, 20), v("u", 4, 52, 1, 28), v("c", 4, 52, 1, 44, 5121, !0), v("z", 1, 52, 1, 48);
    var x, g = i.getUniformLocation(s, "m"), m = i.getUniformLocation(s, "x"), y = i.getUniformLocation(s, "j"), b = 0, w = function () {
        b && (i.bufferSubData(i.ARRAY_BUFFER, 0, d.subarray(0, 13 * b)), a.drawElementsInstancedANGLE(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0, b), b = 0);
    }, E = function (t) {
        if (t.visible) {
            65535 === b && w();
            var n = t.bitmap, e = n.tex, r = n.width, a = n.height, o = n.uvs;
            x !== e && (w(), x = e, i.bindTexture(i.TEXTURE_2D, e), i.uniform1i(m, e), i.uniform1f(y, e.alphaTest));
            var u = 13 * b;
            d[u++] = t.anchor.x, d[u++] = t.anchor.y, d[u++] = t.scale.x * r, d[u++] = t.scale.y * a, d[u++] = t.rotation, d[u++] = t.position.x, d[u++] = t.position.y, d[u++] = o[0], d[u++] = o[1], d[u++] = o[2], d[u++] = o[3], p[u++] = ((16777215 & t.tint) << 8 | 255 * t.alpha & 255) >>> 0, d[u++] = -t.z, b++;
        }
    };
    return h.render = function () {
        var e = t.clientWidth, r = t.clientHeight;
        t.width = e, t.height = r, i.viewport(0, 0, e, r), i.disable(i.BLEND), i.enable(i.DEPTH_TEST), i.depthFunc(i.LESS), i.clear(16640);
        var a, o, u, f, v, l, d, p, m, b, A = h.camera, T = A.at, S = A.to, z = A.angle, L = T.x - e * S.x, D = T.y - r * S.y, N = Math.cos(z), P = Math.sin(z), _ = [2 / ((o = L + e) - (a = L)),
            0,0,0,0,2 / ((f = D) - (u = D + r)),0,0,0,0,2 / ((v = 65535) - (l = -65535)),
            0,(a + o) / (a - o),(u + f) / (u - f),(v + l) / (v - l),1], U = [(p = [N,
            P,0,0,-P,N,0,0,0,0,1,0,-T.x * N + -T.y * -P + T.x,-T.x * P + -T.y * N + T.y,
            0,1])[0] * (m = (d = _)[0]),p[1] * (b = d[5]),0,0,p[4] * m,p[5] * b,0,
            0,0,0,d[10],0,p[12] * m + d[12],p[13] * b + d[13],d[14],1];
        i.useProgram(s), i.activeTexture(i.TEXTURE0), i.uniformMatrix4fv(g, !1, U), x = null;
        var F = new n();
        c.forEach(function (t) {
            t.l.iterate(function (t) {
                1 !== t.alpha ? F.add(t) : E(t);
            });
        }), w(), i.enable(i.BLEND), i.blendFunc(i.ONE, i.ONE_MINUS_SRC_ALPHA), i.depthFunc(515), i.uniform1f(y, 1 / 256), F.iterate(function (t) {
            return E(t);
        }), w();
    }, h.render(), h;
};
i.Sprite = r;

var stats = new Stats();
document.body.appendChild(stats.dom);
var view = document.getElementById('view');
var renderer = i(view);
var gl = renderer.gl;
console.log(gl);
renderer.bkg(0.2, 0.2, 0.2, 0);
renderer.camera = {
    at: {
        x: 400,
        y: 300
    },
    to: {
        x: 0.5,
        y: 0.5
    },
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
var atlasTex = renderer.texture(atlasImg());
atlasTex.tex.alphaTest = 0.5;
var bBitmap = renderer.bitmap(atlasTex, 0, 0, 31, 31);
var qBitmap = renderer.bitmap(atlasTex, 32, 0, 63, 31);
var fBitmap = renderer.bitmap(atlasTex, 64, 0, 95, 31);
var bitmaps = [atlasTex,bBitmap,qBitmap,fBitmap];
var len = 0;
var sprs = [];
var mask = logoMask();
var addSprite = function (l, a) {
    len += a;
    for (var i$$1 = 0;i$$1 < a; i$$1++) {
        var s = new i.Sprite(bitmaps[i$$1 % 4]);
        var x = 0;
        var y = 0;
        while (!mask(x, y)) {
            x = ~(~(view.width * Math.random()));
            y = ~(~(view.height * Math.random()));
        }
        s.position = {
            x: x,
            y: y
        };
        s.scale = {
            x: 0.5,
            y: 0.5
        };
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
