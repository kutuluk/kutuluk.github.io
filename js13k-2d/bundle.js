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
var e = 6408, r = 5121, i = 3553, a = 9728, o = 33071, u = function (t) {
    this.z = t, this.o = new n(), this.t = new n();
};
u.prototype.add = function (t) {
    t.remove(), t.layer = this, t.n = ((function (t) {
        return 1 !== t.a || 0 === t.frame.alphaTest;
    })(t) ? this.t : this.o).add(t);
};
var h = function (t, n) {
    var e = t.getContext("webgl", Object.assign({
        antialias: !1,
        alpha: !1
    }, n)), a = e.getExtension("ANGLE_instanced_arrays"), o = function (t, n) {
        var r = e.createShader(n);
        return e.shaderSource(r, t), e.compileShader(r), r;
    }, c = function (t, n, r) {
        var i = e.createBuffer();
        return e.bindBuffer(t, i), e.bufferData(t, n, r || 35044), i;
    }, s = [], f = {
        gl: e,
        camera: {
            at: h.Point(),
            to: h.Point(),
            angle: 0
        },
        background: function (t, n, r) {
            e.clearColor(t, n, r, 1);
        },
        layer: function (t) {
            var n = s.find(function (n) {
                return n.z === t;
            });
            return n || (n = new u(t), s.push(n), s.sort(function (t, n) {
                return n.z - t.z;
            })), n;
        }
    }, l = f.layer(0);
    f.add = function (t) {
        l.add(t);
    };
    var v = (function (t, n) {
        var r = o(t, 35633), i = o(n, 35632), a = e.createProgram();
        return e.attachShader(a, r), e.attachShader(a, i), e.linkProgram(a), a;
    })("attribute vec2 g;\nattribute vec2 a;\nattribute vec2 t;\nattribute float r;\nattribute vec2 s;\nattribute vec4 u;\nattribute vec4 c;\nattribute float z;\nuniform mat4 m;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nv=u.xy+g*u.zw;\ni=c.abgr;\nvec2 p=(g-a)*s;\nfloat q=cos(r);\nfloat w=sin(r);\np=vec2(p.x*q-p.y*w,p.x*w+p.y*q);\np+=a+t;\ngl_Position=m*vec4(p,z,1);}", "precision mediump float;\nuniform sampler2D x;\nuniform float j;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nvec4 c=texture2D(x,v);\ngl_FragColor=c*i;\nif(j>0.0){\nif(c.a<j)discard;\ngl_FragColor.a=1.0;};}"), p = function (t, n, r, i, o, u, h) {
        var c = e.getAttribLocation(v, t);
        return e.enableVertexAttribArray(c), e.vertexAttribPointer(c, n, u || 5126, !(!h), r || 0, o || 0), i && a.vertexAttribDivisorANGLE(c, i), c;
    };
    c(34963, new Uint8Array([0,1,2,2,1,3])), c(34962, new Float32Array([0,0,0,1,1,
        0,1,1])), p("g", 2);
    var d = new ArrayBuffer(3407820), g = new Float32Array(d), y = new Uint32Array(d);
    c(34962, d, 35048), p("a", 2, 52, 1), p("s", 2, 52, 1, 8), p("r", 1, 52, 1, 16), p("t", 2, 52, 1, 20), p("u", 4, 52, 1, 28), p("c", 4, 52, 1, 44, r, !0), p("z", 1, 52, 1, 48);
    var x, b, m = function (t) {
        return e.getUniformLocation(v, t);
    }, w = m("m"), P = m("x"), A = m("j"), j = 0, T = function () {
        j && (e.bufferSubData(34962, 0, g.subarray(0, 13 * j)), a.drawElementsInstancedANGLE(4, 6, r, 0, j), j = 0);
    }, z = function (t) {
        if (t.visible) {
            65535 === j && T();
            var n = t.frame, r = t.scale, a = t.position, o = n.tex, u = n.uvs, h = t.anchor || n.anchor;
            x !== o && (T(), x = o, e.bindTexture(i, o), e.uniform1i(P, o), e.uniform1f(A, b ? n.alphaTest : 0));
            var c = 13 * j;
            g[c++] = h.x, g[c++] = h.y, g[c++] = r.x * n.width, g[c++] = r.y * n.height, g[c++] = t.rotation, g[c++] = a.x, g[c++] = a.y, g[c++] = u[0], g[c++] = u[1], g[c++] = u[2], g[c++] = u[3], y[c++] = ((16777215 & t.tint) << 8 | 255 * t.a & 255) >>> 0, g[c++] = -t.layer.z, j++;
        }
    };
    return f.render = function () {
        var n = t.clientWidth, r = t.clientHeight;
        t.width = n, t.height = r;
        var i = f.camera, a = i.at, o = i.to, u = i.angle, h = a.x - n * o.x, c = a.y - r * o.y, l = Math.cos(u), p = Math.sin(u), d = 2 / n, g = -2 / r, y = [l * d,
            p * g,0,0,-p * d,l * g,0,0,0,0,1e-5,0,(a.x * (1 - l) + a.y * p) * d - 2 * h / n - 1,
            (a.y * (1 - l) - a.x * p) * g + 2 * c / r + 1,0,1];
        e.useProgram(v), e.uniformMatrix4fv(w, !1, y), e.viewport(0, 0, n, r), e.clear(16640), e.activeTexture(33984), x = null, e.disable(3042), e.enable(2929), e.depthFunc(513), b = !0, s.forEach(function (t) {
            t.o.i(function (t) {
                return z(t);
            });
        }), T(), e.enable(3042), e.blendFunc(770, 771), e.depthFunc(515), e.uniform1f(A, 0), b = !1;
        for (var m = s.length;m > 0; m--) 
            { s[m - 1].t.i(function (t) {
            return z(t);
        }); }
        T();
    }, f.render(), f;
};
h.Point = (function () {
    function t(t, n) {
        if (!(this instanceof h.Point)) 
            { return new h.Point(t, n); }
        this.set(t, n);
    }
    
    return t.prototype.set = function (t, n) {
        return this.x = t || 0, this.y = n || (0 !== n ? this.x : 0), this;
    }, t.prototype.clone = function () {
        return h.Point(this.x, this.y);
    }, t;
})(), h.Frame = (function () {
    function t(n, e, r, i) {
        if (!(this instanceof t)) 
            { return new t(n, e, r, i); }
        this.texture = n, this.width = r.x, this.height = r.y, this.uvs = [e.x / n.width,
            e.y / n.height,r.x / n.width,r.y / n.height], this.anchor = i || n.anchor.clone();
    }
    
    var n = {
        alphaTest: {
            configurable: !0
        },
        tex: {
            configurable: !0
        }
    };
    return n.alphaTest.get = function () {
        return this.texture.a;
    }, n.tex.get = function () {
        return this.texture.tex;
    }, Object.defineProperties(t.prototype, n), t;
})(), h.Texture = (function () {
    function t(n, u, c, s) {
        if (!(this instanceof t)) 
            { return new t(n, u, c, s); }
        var f = n.gl, l = Object.assign({
            10240: a,
            10241: a,
            10242: o,
            10243: o
        }, s);
        this.tex = f.createTexture(), f.bindTexture(i, this.tex), Object.keys(l).forEach(function (t) {
            return f.texParameteri(i, t, l[t]);
        }), f.texImage2D(i, 0, e, e, r, u), this.anchor = h.Point(), this.a = c || (0 === c ? 0 : 1), this.width = u.width, this.height = u.height, this.uvs = [0,
            0,1,1];
    }
    
    var n = {
        alphaTest: {
            configurable: !0
        }
    };
    return n.alphaTest.get = function () {
        return this.a;
    }, Object.defineProperties(t.prototype, n), t;
})(), h.Sprite = (function () {
    function t(n, e) {
        if (!(this instanceof t)) 
            { return new t(n, e); }
        this.frame = n, this.a = 1, Object.assign(this, {
            visible: !0,
            position: h.Point(),
            scale: h.Point(1),
            rotation: 0,
            tint: 16777215,
            anchor: null
        }, e), this.remove();
    }
    
    var n = {
        alpha: {
            configurable: !0
        }
    };
    return n.alpha.get = function () {
        return this.a;
    }, n.alpha.set = function (t) {
        var n = this.a;
        this.a = t, this.n && (t < 1 && 1 === n || 1 === t && n < 1) && this.layer.add(this);
    }, t.prototype.remove = function () {
        this.n && this.n.r(), this.layer = null, this.n = null;
    }, Object.defineProperties(t.prototype, n), t;
})();

var Point = h.Point;
var Texture = h.Texture;
var Frame = h.Frame;
var Sprite = h.Sprite;
var stats = new Stats();
document.body.appendChild(stats.dom);
var view = document.getElementById('view');
var renderer = h(view);
var gl = renderer.gl;
renderer.background(1, 1, 1);
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
var atlas = Texture(renderer, atlasImg(), 0.5);
atlas.anchor = Point(0.5);
var bFrame = Frame(atlas, Point(), Point(32));
var qFrame = Frame(atlas, Point(32, 0), Point(32));
var fFrame = Frame(atlas, Point(64, 0), Point(32));
var frames = [atlas,bFrame,qFrame,fFrame];
var len = 0;
var sprs = [];
var mask = logoMask();
var cl = 0;
var addSprite = function (a) {
    if (len % 250 === 0) {
        cl++;
    }
    var layer = renderer.layer(cl);
    len += a;
    for (var i = 0;i < a; i++) {
        var sprite = Sprite(frames[i % 4]);
        var x = 0;
        var y = 0;
        while (!mask(x, y)) {
            x = ~(~(800 * Math.random()));
            y = ~(~(600 * Math.random()));
        }
        sprite.position.set(x, y);
        sprite.scale.set(0.5);
        sprite.tint = Math.random() * 0xffffff;
        sprite.rotation = Math.random() * Math.PI * 2;
        sprite.dr = (0.5 - Math.random()) * 0.1;
        sprite.trans = !Math.round(Math.random());
        sprs.push(sprite);
        layer.add(sprite);
    }
};
addSprite(1000);
var sprites = document.getElementById('info');
var dbgRenderInfo = gl.getExtension('WEBGL_debug_renderer_info');
var info = gl.getParameter(dbgRenderInfo ? dbgRenderInfo.UNMASKED_RENDERER_WEBGL : gl.VENDOR);
var add = false;
view.onmousedown = (function () {
    add = true;
});
view.ontouchstart = (function () {
    add = true;
});
view.onmouseup = (function () {
    add = false;
});
view.ontouchend = (function () {
    add = false;
});
var loop = function () {
    stats.begin();
    if (add) 
        { addSprite(25); }
    sprites.innerHTML = "Renderer: " + info + "</br>Sprites: " + len + " (click to add)";
    sprs.forEach(function (sprite) {
        sprite.dr && (sprite.rotation += sprite.dr);
        if (sprite.trans && sprite.alpha > 0.6) {
            sprite.alpha -= 0.001;
        }
    });
    renderer.camera.angle += 0.005;
    renderer.render();
    stats.end();
    requestAnimationFrame(loop);
};
loop();
