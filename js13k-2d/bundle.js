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
    var e = new t(n, this.h);
    return this.h && (this.h.p = e), this.h = e, e;
}, n.prototype.i = function (t) {
    var this$1 = this;

    for (var n = this.h;n; ) 
        { n.d ? (n.p ? (n.p.n = n.n) : (this$1.h = n.n), n.n && (n.n.p = n.p)) : t(n.c), n = n.n; }
};
var e = function (t, n, e, i) {
    var r = t.gl, a = Object.assign({
        10240: 9729,
        10241: 9729,
        10242: 33071,
        10243: 33071
    }, i);
    this.tex = r.createTexture(), r.bindTexture(3553, this.tex), Object.keys(a).forEach(function (t) {
        return r.texParameteri(3553, t, a[t]);
    }), r.texImage2D(3553, 0, 6408, 6408, 5121, n), this.alphaTest = e || 1, this.width = n.width, this.height = n.height, this.u = [0,
        0,1,1];
};
e.prototype.flipX = function () {
    var t = this.u;
    return this.u = [t[0] + t[2],t[1],-t[2],t[3]], this;
}, e.prototype.flipY = function () {
    var t = this.u;
    return this.u = [t[0],t[1] + t[3],t[2],-t[3]], this;
};
var i = (function (t) {
    function n(t, n, e, i, r) {
        this.texture = t, this.width = i, this.height = r, this.u = [n / t.width,
            e / t.height,i / t.width,r / t.height];
    }
    
    t && (n.__proto__ = t), (n.prototype = Object.create(t && t.prototype)).constructor = n;
    var e = {
        alphaTest: {
            configurable: !0
        },
        tex: {
            configurable: !0
        }
    };
    return e.alphaTest.get = function () {
        return this.texture.alphaTest;
    }, e.tex.get = function () {
        return this.texture.tex;
    }, n.prototype.clone = function () {
        var t = new n({});
        return Object.assign(t, this), t.u = t.u.slice(), t;
    }, Object.defineProperties(n.prototype, e), n;
})(e), r = function (t) {
    this.l = new n(), this.z = t;
};
r.prototype.add = function (t) {
    t.n = this.l.add(t), t.z = this.z;
};
var a = function (t, e) {
    var i = t.getContext("webgl", e), o = i.getExtension("ANGLE_instanced_arrays"), u = function (t, n) {
        var e = i.createShader(n);
        return i.shaderSource(e, t), i.compileShader(e), e;
    }, h = function (t, n, e) {
        var r = i.createBuffer();
        return i.bindBuffer(t, r), i.bufferData(t, n, e || 35044), r;
    }, c = [], s = {
        gl: i,
        camera: {
            at: new a.Point(),
            to: new a.Point(),
            angle: 0
        },
        bkg: function (t, n, e, r) {
            void 0 === r && (r = 1), i.clearColor(t, n, e, r);
        },
        layer: function (t) {
            var n = c.find(function (n) {
                return n.z === t;
            });
            return n || (n = new r(t), c.push(n), c.sort(function (t, n) {
                return n.z - t.z;
            })), n;
        }
    }, f = s.layer(0);
    s.add = function (t) {
        f.add(t);
    };
    var p = (function (t, n) {
        var e = u(t, 35633), r = u(n, 35632), a = i.createProgram();
        return i.attachShader(a, e), i.attachShader(a, r), i.linkProgram(a), a;
    })("attribute vec2 g;\nattribute vec2 a;\nattribute vec2 t;\nattribute float r;\nattribute vec2 s;\nattribute vec4 u;\nattribute vec4 c;\nattribute float z;\nuniform mat4 m;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nv=u.xy+g*u.zw;\ni=c.abgr;\nvec2 p=(g-a)*s;\nfloat q=cos(r);\nfloat w=sin(r);\np=vec2(p.x*q-p.y*w,p.x*w+p.y*q);\np+=a+t;\ngl_Position=m*vec4(p,z,1);}", "precision mediump float;\nuniform sampler2D x;\nuniform float j;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nvec4 c=texture2D(x,v);\ngl_FragColor=c*i;\nif(j>0.0){\nif(c.a<j)discard;\ngl_FragColor.a=1.0;\n};}"), l = function (t, n, e, r, a, u, h) {
        var c = i.getAttribLocation(p, t);
        return i.enableVertexAttribArray(c), i.vertexAttribPointer(c, n, u || 5126, !(!h), e || 0, a || 0), r && o.vertexAttribDivisorANGLE(c, r), c;
    };
    h(34963, new Uint8Array([0,1,2,2,1,3])), h(34962, new Float32Array([0,0,0,1,1,
        0,1,1])), l("g", 2);
    var v = new ArrayBuffer(3407820), d = new Float32Array(v), g = new Uint32Array(v);
    h(34962, v, 35048), l("a", 2, 52, 1), l("s", 2, 52, 1, 8), l("r", 1, 52, 1, 16), l("t", 2, 52, 1, 20), l("u", 4, 52, 1, 28), l("c", 4, 52, 1, 44, 5121, !0), l("z", 1, 52, 1, 48);
    var b, x, y = function (t) {
        return i.getUniformLocation(p, t);
    }, m = y("m"), w = y("x"), A = y("j"), P = 0, z = function () {
        P && (i.bufferSubData(34962, 0, d.subarray(0, 13 * P)), o.drawElementsInstancedANGLE(4, 6, 5121, 0, P), P = 0);
    }, T = function (t) {
        if (t.visible) {
            65535 === P && z();
            var n = t.bitmap, e = t.scale, r = t.position, a = t.anchor, o = n.tex, u = n.u;
            b !== o && (z(), b = o, i.bindTexture(3553, o), i.uniform1i(w, o), i.uniform1f(A, x ? n.alphaTest : 0));
            var h = 13 * P;
            d[h++] = a.x, d[h++] = a.y, d[h++] = e.x * n.width, d[h++] = e.y * n.height, d[h++] = t.rotation, d[h++] = r.x, d[h++] = r.y, d[h++] = u[0], d[h++] = u[1], d[h++] = u[2], d[h++] = u[3], g[h++] = ((16777215 & t.tint) << 8 | 255 * t.alpha & 255) >>> 0, d[h++] = -t.z, P++;
        }
    };
    return s.render = function () {
        var e = t.clientWidth, r = t.clientHeight;
        t.width = e, t.height = r;
        var a = s.camera, o = a.at, u = a.to, h = a.angle, f = o.x - e * u.x, l = o.y - r * u.y, v = Math.cos(h), d = Math.sin(h), g = 2 / e, y = -2 / r, w = [v * g,
            d * y,0,0,-d * g,v * y,0,0,0,0,1e-5,0,(o.x * (1 - v) + o.y * d) * g - 2 * f / e - 1,
            (o.y * (1 - v) - o.x * d) * y + 2 * l / r + 1,0,1];
        i.useProgram(p), i.uniformMatrix4fv(m, !1, w), i.viewport(0, 0, e, r), i.disable(3042), i.enable(2929), i.depthFunc(513), i.clear(16640), i.activeTexture(33984);
        var P = new n();
        b = null, x = !0, c.forEach(function (t) {
            t.l.i(function (t) {
                1 !== t.alpha || 0 === t.bitmap.alphaTest ? P.add(t) : T(t);
            });
        }), z(), i.enable(3042), i.blendFunc(1, 771), i.depthFunc(515), i.uniform1f(A, 0), x = !1, P.i(function (t) {
            return T(t);
        }), z();
    }, s.render(), s;
};
a.Point = (function () {
    function t(t, n) {
        this.set(t, n);
    }
    
    return t.prototype.set = function (t, n) {
        return this.x = t || 0, this.y = n || (0 !== n ? this.x : 0), this;
    }, t;
})(), a.Sprite = (function () {
    function t(t) {
        this.bitmap = t, this.anchor = new a.Point(), this.position = new a.Point(), this.scale = new a.Point(1), this.rotation = 0, this.tint = 16777215, this.alpha = 1, this.visible = !0, this.n = null;
    }
    
    return t.prototype.remove = function () {
        this.n && this.n.r();
    }, t;
})(), a.Texture = e, a.Bitmap = i;

var Texture = a.Texture;
var Bitmap = a.Bitmap;
var Sprite = a.Sprite;
var stats = new Stats();
document.body.appendChild(stats.dom);
var view = document.getElementById('view');
var renderer = a(view, {
    antialias: false
});
var gl = renderer.gl;
renderer.bkg(0.2, 0.2, 0.2, 0);
renderer.camera.at.set(400, 300);
renderer.camera.to.set(0.5);
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
var atlasTex = new Texture(renderer, atlasImg(), 0.5);
var bBitmap = new Bitmap(atlasTex, 0, 0, 32, 32);
var qBitmap = new Bitmap(atlasTex, 32, 0, 32, 32);
var fBitmap = new Bitmap(atlasTex, 64, 0, 32, 32);
var bitmaps = [atlasTex,bBitmap,qBitmap,fBitmap];
var len = 0;
var sprs = [];
var mask = logoMask();
var addSprite = function (l, a$$1) {
    len += a$$1;
    for (var i = 0;i < a$$1; i++) {
        var sprite = new Sprite(bitmaps[i % 4]);
        var x = 0;
        var y = 0;
        while (!mask(x, y)) {
            x = ~(~(800 * Math.random()));
            y = ~(~(600 * Math.random()));
        }
        sprite.anchor.set(0.5);
        sprite.position.set(x, y);
        sprite.scale.set(0.5);
        sprite.tint = Math.random() * 0xffffff;
        sprite.rotation = Math.random() * Math.PI * 2;
        sprite.dr = (0.5 - Math.random()) * 0.1;
        sprs.push(sprite);
        l.add(sprite);
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
