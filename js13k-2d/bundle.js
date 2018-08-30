var t = function (t, e) {
    this.c = t, this.p = null, this.n = e, this.d = !1;
};
t.prototype.r = function () {
    this.d = !0;
};
var e = function () {
    this.h = null;
};
e.prototype.add = function (e) {
    var n = new t(e, this.h);
    return this.h && (this.h.p = n), this.h = n, n;
}, e.prototype.iterate = function (t) {
    var this$1 = this;

    for (var e = this.h;e; ) 
        { e.d ? (e.p ? (e.p.n = e.n) : (this$1.h = e.n), e.n && (e.n.p = e.p)) : t(e.c), e = e.n; }
};
var n = function (t) {
    this.l = new e(), this.z = t;
};
n.prototype.add = function (t) {
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
    var i = t.getContext("webgl", r), a = i.getExtension("ANGLE_instanced_arrays"), o = function (t, e) {
        var n = i.createShader(e);
        return i.shaderSource(n, t), i.compileShader(n), n;
    }, u = function (t, e, n) {
        var r = i.createBuffer();
        return i.bindBuffer(t, r), i.bufferData(t, e, n), r;
    }, c = [], h = {
        gl: i,
        offset: {
            x: 0,
            y: 0
        },
        bkg: function (t, e, n, r) {
            i.clearColor(t, e, n, r || (0 === r ? 0 : 1));
        },
        texture: function (t, e, n, r, a) {
            var o = i.createTexture();
            return i.bindTexture(3553, o), i.texParameteri(3553, 10242, e || 33071), i.texParameteri(3553, 10243, n || 33071), i.texParameteri(3553, 10240, a || 9729), i.texParameteri(3553, 10241, r || 9729), i.texImage2D(3553, 0, 6408, 6408, 5121, t), o.alphaTest = 1 / 256, {
                tex: o,
                width: t.width,
                height: t.height,
                uvs: [0,0,1,1]
            };
        },
        bitmap: function (t, e, n, r, i) {
            var a = r - e + 1, o = i - n + 1;
            return {
                tex: t.tex,
                width: a,
                height: o,
                uvs: [e / t.width,n / t.height,a / t.width,o / t.height]
            };
        },
        layer: function (t) {
            var e = c.find(function (e) {
                return e.z === t;
            });
            if (e) 
                { return e; }
            var r = new n(t);
            return c.push(r), c.sort(function (t, e) {
                return t.z < e.z ? 1 : t.z > e.z ? -1 : 0;
            }), r;
        }
    }, f = h.layer(0);
    h.add = function (t) {
        f.add(t);
    };
    var s = (function (t, e) {
        var n = o(t, 35633), r = o(e, 35632), a = i.createProgram();
        return i.attachShader(a, n), i.attachShader(a, r), i.linkProgram(a), a;
    })("attribute vec2 g;\nattribute vec2 a;\nattribute vec2 t;\nattribute float r;\nattribute vec2 s;\nattribute vec4 u;\nattribute vec4 c;\nattribute float z;\nuniform mat4 m;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nv=u.xy+g*u.zw;\ni=c.abgr;\nvec2 p=(g-a)*s;\nfloat q=cos(r);\nfloat w=sin(r);\np=vec2(p.x*q-p.y*w,p.x*w+p.y*q);\np+=a+t;\ngl_Position=m*vec4(p,z,1);}", "precision mediump float;\nuniform sampler2D x;\nuniform float j;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nvec4 c=texture2D(x,v);\nif(c.a<j)discard;\ngl_FragColor=c*i;\n}"), v = function (t, e, n, r, o, u, c) {
        var h = i.getAttribLocation(s, t);
        return i.enableVertexAttribArray(h), i.vertexAttribPointer(h, e, u || i.FLOAT, !(!c), n || 0, o || 0), r && a.vertexAttribDivisorANGLE(h, r), h;
    };
    u(34963, new Uint16Array([0,1,2,2,1,3]), 35044), u(34962, new Float32Array([0,
        0,0,1,1,0,1,1]), 35044), v("g", 2);
    var d = new ArrayBuffer(3407820), l = new Float32Array(d), p = new Uint32Array(d);
    u(34962, d, 35048), v("a", 2, 52, 1), v("s", 2, 52, 1, 8), v("r", 1, 52, 1, 16), v("t", 2, 52, 1, 20), v("u", 4, 52, 1, 28), v("c", 4, 52, 1, 44, 5121, !0), v("z", 1, 52, 1, 48);
    var x, g = i.getUniformLocation(s, "m"), m = i.getUniformLocation(s, "x"), b = i.getUniformLocation(s, "j"), y = 0, E = function () {
        y && (i.bufferSubData(i.ARRAY_BUFFER, 0, l.subarray(0, 13 * y)), a.drawElementsInstancedANGLE(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0, y), y = 0);
    }, w = function (t) {
        if (t.visible) {
            65535 === y && E();
            var e = t.bitmap, n = e.tex, r = e.width, a = e.height, o = e.uvs;
            x !== n && (E(), x = n, i.bindTexture(i.TEXTURE_2D, n), i.uniform1i(m, n), i.uniform1f(b, n.alphaTest));
            var u = 13 * y;
            l[u++] = t.anchor.x, l[u++] = t.anchor.y, l[u++] = t.scale.x * r, l[u++] = t.scale.y * a, l[u++] = t.rotation, l[u++] = t.position.x, l[u++] = t.position.y, l[u++] = o[0], l[u++] = o[1], l[u++] = o[2], l[u++] = o[3], p[u++] = ((16777215 & t.tint) << 8 | 255 * t.alpha & 255) >>> 0, l[u++] = -t.z, y++;
        }
    };
    return h.render = function () {
        var n = t.clientWidth, r = t.clientHeight;
        t.width = n, t.height = r, i.viewport(0, 0, n, r), i.disable(i.BLEND), i.enable(i.DEPTH_TEST), i.depthFunc(i.LESS), i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT);
        var a, o, u, f, v, d, l = [2 / ((o = h.offset.x + n) - (a = h.offset.x)),
            0,0,0,0,2 / ((f = h.offset.y) - (u = h.offset.y + r)),0,0,0,0,2 / ((v = 65535) - (d = -65535)),
            0,(a + o) / (a - o),(u + f) / (u - f),(v + d) / (v - d),1];
        i.useProgram(s), i.activeTexture(i.TEXTURE0), i.uniformMatrix4fv(g, !1, l), x = null;
        var p = new e();
        c.forEach(function (t) {
            t.l.iterate(function (t) {
                1 !== t.alpha ? p.add(t) : w(t);
            });
        }), E(), i.enable(i.BLEND), i.blendFunc(i.ONE, i.ONE_MINUS_SRC_ALPHA), i.depthFunc(i.LEQUAL), i.uniform1f(b, 1 / 256), p.iterate(function (t) {
            return w(t);
        }), E();
    }, h.render(), h;
};
i.Sprite = r;

var stats = new Stats();
document.body.appendChild(stats.dom);
var view = document.getElementById('view');
var renderer = i(view);
var gl = renderer.gl;
renderer.bkg(0.2, 0.2, 0.2, 0);
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
var atlasTex = renderer.texture(atlasImg());
atlasTex.tex.alphaTest = 0.5;
var bBitmap = renderer.bitmap(atlasTex, 0, 0, 31, 31);
var qBitmap = renderer.bitmap(atlasTex, 32, 0, 63, 31);
var fBitmap = renderer.bitmap(atlasTex, 64, 0, 95, 31);
var bitmaps = [atlasTex,bBitmap,qBitmap,fBitmap];
var len = 0;
var sprs = [];
var addSprite = function (l, a) {
    len += a;
    for (var i$$1 = 0;i$$1 < a; i$$1++) {
        var s = new i.Sprite(bitmaps[i$$1 % 4]);
        s.position = {
            x: view.width * 0.05 + Math.random() * view.width * 0.9,
            y: view.height * 0.05 + Math.random() * view.height * 0.9
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
addSprite(renderer.layer(0), 300);
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
    sprites.innerHTML = "Renderer: " + info + "</br>Sprites: " + len;
    sprs.forEach(function (sprite) {
        sprite.dr && (sprite.rotation += sprite.dr);
    });
    renderer.render();
    stats.end();
    requestAnimationFrame(loop);
};
loop();
