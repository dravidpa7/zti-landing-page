/* Mallow: character-only widget, bottom-right.
   Route-driven: each route can have its own message and motion (see ROUTES below).
   On the home page ("/") she falls from the top of the screen on every load, hits the
   ground, lies dazed, gets up and says "Hi, I'm Marsheee!".
   Click her -> says the current route's line (default "Hii!"). Hides after 5s without interaction with her.
   <script src="/mallow-widget.js" data-contact="/contact" defer></script> */
(function () {
  if (window.__mallow) return;
  window.__mallow = 1;
  var CS = document.currentScript,
    IDLE = 5000;
  var CONTACT =
    window.MALLOW_CONTACT || (CS && CS.dataset.contact) || "/contact";

  function boot() {
    var T = window.THREE,
      rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var host = document.createElement("div");
    host.style.cssText =
      "position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:2147483000";
    var sr = host.attachShadow({ mode: "open" });
    sr.innerHTML =
      "<style>:host{display:block}" +
      ".w{--s:150px;position:relative;width:var(--s);transform:translateX(160%);opacity:0;visibility:hidden;transition:transform .45s cubic-bezier(.3,.7,.3,1),opacity .3s,visibility 0s .45s}" +
      ".w.on{transform:none;opacity:1;visibility:visible;transition:transform .45s cubic-bezier(.3,.7,.3,1),opacity .3s}" +
      ".c{display:block;width:var(--s);height:var(--s);padding:0;margin:0;border:0;background:none;cursor:pointer}" +
      "canvas{display:block;width:100%;height:100%}" +
      ".b{position:absolute;right:8px;bottom:calc(100% - 4px);font-family:inherit;font-weight:500;font-size:14px;line-height:1.2;letter-spacing:-.01em;background:var(--ink);color:var(--on);padding:9px 16px;border-radius:999px;text-decoration:none;white-space:nowrap;opacity:0;transform:translateY(6px);transition:opacity .2s,transform .2s;pointer-events:none}" +
      ".b.s{opacity:1;transform:none}.b.s[href]{pointer-events:auto}" +
      '.b:after{content:"";position:absolute;right:22px;top:100%;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}' +
      ".c:focus-visible,.b:focus-visible{outline:2px solid var(--ink);outline-offset:3px}" +
      "@media (max-width:600px){.w{--s:120px}}" +
      "@media (prefers-reduced-motion:reduce){.w,.w.on,.b{transition:none}}</style>" +
      '<div class="w"><a class="b" aria-live="polite"></a>' +
      '<button class="c" aria-label="Mallow. Press to say hi."><canvas></canvas></button></div>';
    document.body.appendChild(host);
    /* bubble takes the site's own look: text colour as fill, page colour as text, site font, pill shape */
    function clear(c) {
      return !c || c === "transparent" || /^rgba\(.*,\s*0\)$/.test(c);
    }
    var cs = getComputedStyle(document.body),
      pbg = cs.backgroundColor;
    if (clear(pbg))
      pbg = getComputedStyle(document.documentElement).backgroundColor;
    if (clear(pbg)) pbg = "#fff";
    host.style.setProperty("--ink", (CS && CS.dataset.bubbleBg) || cs.color);
    host.style.setProperty("--on", (CS && CS.dataset.bubbleText) || pbg);
    host.style.fontFamily = cs.fontFamily;
    var w = sr.querySelector(".w"),
      bub = sr.querySelector(".b"),
      btn = sr.querySelector(".c"),
      cv = sr.querySelector("canvas");

    var R = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    R.setPixelRatio(Math.min(devicePixelRatio, 2));
    R.setClearColor(0, 0);
    var S = new T.Scene(),
      cam = new T.PerspectiveCamera(32, 1, 0.1, 60);
    cam.position.set(0, 1.9, 6.4);
    cam.lookAt(0, 0.85, 0);
    S.add(new T.HemisphereLight(0xffffff, 0xf3c6cf, 0.95));
    var dl = new T.DirectionalLight(0xffffff, 0.7);
    dl.position.set(3, 6, 5);
    S.add(dl);
    function M(c) {
      return new T.MeshStandardMaterial({ color: c, roughness: 0.7 });
    }
    var BR = new T.MeshBasicMaterial({ color: 0x3b1a1a, side: T.BackSide });
    function ol(m, s) {
      var o = new T.Mesh(m.geometry, BR);
      o.scale.setScalar(s);
      m.add(o);
      return m;
    }
    function rbox(w, h, d, r, n) {
      var g = new T.BoxGeometry(w, h, d, n, n, n),
        p = g.attributes.position,
        v = new T.Vector3(),
        c = new T.Vector3(),
        hx = w / 2 - r,
        hy = h / 2 - r,
        hz = d / 2 - r,
        k = function (a, b) {
          return Math.max(-b, Math.min(b, a));
        };
      for (var i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        c.set(k(v.x, hx), k(v.y, hy), k(v.z, hz));
        v.sub(c).normalize().multiplyScalar(r).add(c);
        p.setXYZ(i, v.x, v.y, v.z);
      }
      g.computeVertexNormals();
      return g;
    }

    var ch = new T.Group();
    S.add(ch);
    var sc = document.createElement("canvas");
    sc.width = sc.height = 64;
    var sg = sc.getContext("2d"),
      gr = sg.createRadialGradient(32, 32, 2, 32, 32, 32);
    gr.addColorStop(0, "rgba(227,154,169,.7)");
    gr.addColorStop(1, "rgba(227,154,169,0)");
    sg.fillStyle = gr;
    sg.fillRect(0, 0, 64, 64);
    var sh = new T.Mesh(
      new T.PlaneGeometry(2.8, 2.8),
      new T.MeshBasicMaterial({
        map: new T.CanvasTexture(sc),
        transparent: true,
        depthWrite: false,
      }),
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = 0.01;
    S.add(sh);
    var body = new T.Group();
    body.position.y = 0.85;
    ch.add(body);
    body.add(ol(new T.Mesh(rbox(2.1, 1.7, 1.9, 0.5, 16), M(0xfff1ea)), 1.035));
    var dk = M(0x3b1a1a);
    function eye(x) {
      var e = new T.Group(),
        a = new T.Mesh(new T.SphereGeometry(0.16, 20, 16), dk);
      a.scale.z = 0.5;
      e.add(a);
      var h = new T.Mesh(
        new T.SphereGeometry(0.055, 12, 10),
        new T.MeshBasicMaterial({ color: 0xffffff }),
      );
      h.position.set(0.04, 0.06, 0.07);
      e.add(h);
      e.position.set(x, -0.02, 0.95);
      body.add(e);
      return e;
    }
    var eL = eye(-0.45),
      eR = eye(0.45);
    var BL = [];
    [-0.64, 0.64].forEach(function (x) {
      var b = new T.Mesh(
        new T.CircleGeometry(0.17, 20),
        new T.MeshBasicMaterial({
          color: 0xf79aa6,
          transparent: true,
          opacity: 0.55,
        }),
      );
      b.position.set(x, -0.24, 0.935);
      b.rotation.y = x * 0.15;
      body.add(b);
      BL.push(b);
    });
    var mo = new T.Mesh(new T.TorusGeometry(0.1, 0.022, 8, 16, Math.PI), dk);
    mo.rotation.z = Math.PI;
    mo.position.set(0, -0.12, 0.955);
    body.add(mo);
    var mHalf = new T.Mesh(
      new T.CircleGeometry(0.13, 20, Math.PI, Math.PI),
      dk,
    );
    mHalf.position.set(0, -0.07, 0.955);
    mHalf.visible = false;
    body.add(mHalf);
    var mO = new T.Mesh(new T.CircleGeometry(0.07, 20), dk);
    mO.position.set(0, -0.14, 0.955);
    mO.visible = false;
    body.add(mO);
    var bow = new T.Group(),
      pk = M(0xf58fa3);
    [-1, 1].forEach(function (s) {
      var m = ol(new T.Mesh(new T.SphereGeometry(0.22, 16, 12), pk), 1.12);
      m.scale.set(1.2, 0.8, 0.5);
      m.position.x = s * 0.22;
      m.rotation.z = s * 0.35;
      bow.add(m);
    });
    bow.add(ol(new T.Mesh(new T.SphereGeometry(0.1, 12, 10), pk), 1.2));
    bow.position.set(0.62, 0.8, 0.35);
    bow.rotation.set(-0.3, 0, -0.4);
    body.add(bow);
    var armP = new T.Group(),
      arm = ol(
        new T.Mesh(new T.SphereGeometry(0.2, 16, 12), M(0xfff1ea)),
        1.12,
      );
    arm.scale.set(1, 1.8, 1);
    arm.position.y = -0.3;
    armP.add(arm);
    armP.position.set(1.0, 0, 0.1);
    armP.rotation.z = 0.12;
    body.add(armP);
    var armQ = new T.Group(),
      arm2 = ol(
        new T.Mesh(new T.SphereGeometry(0.2, 16, 12), M(0xfff1ea)),
        1.12,
      );
    arm2.scale.set(1, 1.8, 1);
    arm2.position.y = -0.3;
    armQ.add(arm2);
    armQ.position.set(-1.0, 0, 0.1);
    armQ.rotation.z = -0.12;
    armQ.scale.setScalar(0.001);
    body.add(armQ);

    /* ROUTES: path -> what she does. Keys: '/pricing', '/blog/*' (prefix), '#contact', '*' (fallback).
       Value: { say, motion, href, onLoad }. motion: hi, reach, hop, happy, shy, surprised, wink, sleepy. Add yours with window.MALLOW_ROUTES or Mallow.configure({...}) */
    var ROUTES = {
      "/": { say: "Hii!", motion: "hi" },
      "/products": { say: "Take a look around!", motion: "hop", onLoad: true },
      "/products/*": {
        say: "Interested? Reach out to us →",
        motion: "reach",
        href: CONTACT,
        onLoad: true,
      },
      "/services": {
        say: "What can we build for you?",
        motion: "happy",
        onLoad: true,
      },
      "/services/*": {
        say: "Let’s talk about it →",
        motion: "reach",
        href: CONTACT,
        onLoad: true,
      },
      "/blogs": { say: "Fresh reads!", motion: "hop", onLoad: true },
      "/blogs/*": { say: "Hope this helps!", motion: "shy", onLoad: true },
      "/careers": { say: "Join our team!", motion: "happy", onLoad: true },
      "/training": { say: "Ready to learn?", motion: "hi", onLoad: true },
      "/contact": {
        say: "Reach out to us →",
        motion: "reach",
        href: CONTACT,
        onLoad: true,
      },
      "*": {
        say: "Oh no! Take me home →",
        motion: "surprised",
        href: "/",
        onLoad: true,
      } /* not-found page */,
    };
    var HI = { say: "Hii!", motion: "hi" };
    function norm(p) {
      p = (p || "/").toLowerCase().replace(/\/+$/, "");
      return p || "/";
    }
    function merge(o) {
      for (var k in o)
        ROUTES[
          k === "*" || k.charAt(0) === "#"
            ? k
            : norm(k.replace(/\/\*$/, "")) + (/\/\*$/.test(k) ? "/*" : "")
        ] = o[k];
    }
    if (window.MALLOW_ROUTES) merge(window.MALLOW_ROUTES);
    function match(path, hash, strict) {
      path = norm(path);
      hash = (hash || "").toLowerCase();
      if (hash && ROUTES[path + hash] !== undefined) return ROUTES[path + hash];
      if (hash && ROUTES[hash] !== undefined) return ROUTES[hash];
      if (hash && strict) return null;
      if (ROUTES[path] !== undefined) return ROUTES[path];
      var best = "",
        k;
      for (k in ROUTES)
        if (
          k.slice(-2) === "/*" &&
          (path + "/").indexOf(k.slice(0, -1)) === 0 &&
          k.length > best.length
        )
          best = k;
      return best ? ROUTES[best] : strict ? null : ROUTES["*"] || null;
    }

    var mode = "",
      on = false,
      timer,
      hop = 0,
      mx = 0,
      running = false,
      raf,
      t = 0,
      clk = new T.Clock();

    /* intro: fall from the top, hit the ground, lie dazed, get up, introduce herself */
    var intro = null,
      FALL = 0.85 /* seconds in the air */,
      LIE = 1.1 /* seconds lying on the ground */,
      UP = 0.55; /* seconds getting up */
    /* how far to lift the character so the rotated body rests on the ground */
    function ground(th) {
      var c = Math.cos(th),
        s = Math.sin(th);
      return 0.85 * Math.abs(c) + 1.05 * Math.abs(s) - 0.85 * c;
    }

    function say(c) {
      mode = (c && c.motion) || "";
      hop = 1;
      if (!c || !c.say) {
        bub.classList.remove("s");
        return;
      }
      bub.textContent = c.say;
      if (c.href) bub.setAttribute("href", c.href);
      else bub.removeAttribute("href");
      bub.classList.add("s");
    }
    function arm_() {
      if (intro) return;
      clearTimeout(timer);
      timer = setTimeout(hide, IDLE);
    }
    function show(c) {
      if (intro) return;
      on = true;
      w.classList.add("on");
      say(c);
      arm_();
      start();
    }
    function playIntro() {
      intro = { s: 0 };
      mode = "surprised";
      hop = 0;
      on = true;
      clearTimeout(timer);
      bub.classList.remove("s");
      host.style.transform = "translateY(-" + (innerHeight + 200) + "px)";
      w.style.transition = "none"; /* no slide-in, she just falls */
      w.classList.add("on");
      start();
    }
    function hide() {
      on = false;
      clearTimeout(timer);
      w.classList.remove("on");
      bub.classList.remove("s");
      mode = "";
      setTimeout(function () {
        if (!on) stop();
      }, 700);
    }
    btn.addEventListener("click", function () {
      show(match(location.pathname, location.hash) || HI);
    });
    ["pointermove", "focusin"].forEach(function (ev) {
      w.addEventListener(ev, function () {
        if (on) arm_();
      });
    });
    addEventListener("pointermove", function (e) {
      mx = (e.clientX / innerWidth) * 2 - 1;
    });

    /* a click on any link that points at a configured route (or has data-mallow="/route") brings her back */
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target.closest && e.target.closest("a,[data-mallow]");
        if (!a) return;
        var d = a.getAttribute("data-mallow"),
          c = null;
        if (d)
          c = match(
            d === "home" ? "/" : d === "contact" ? "/contact" : d,
            "",
            true,
          );
        else if (a.origin === location.origin)
          c = match(a.pathname, a.hash, true);
        if (!c) {
          var tx = (a.textContent || "").trim().toLowerCase();
          c =
            tx === "home"
              ? match("/")
              : tx === "contact" || tx === "contact us"
                ? match("/contact")
                : null;
        }
        if (c) show(c);
      },
      true,
    );
    /* a route change (React Router, back/forward, hash) does the same */
    function route() {
      var c = match(location.pathname, location.hash);
      if (c) show(c);
    }
    var last = location.href;
    function nav() {
      if (location.href !== last) {
        last = location.href;
        route();
      }
    }
    ["pushState", "replaceState"].forEach(function (k) {
      var o = history[k];
      history[k] = function () {
        var r = o.apply(this, arguments);
        setTimeout(nav, 0);
        return r;
      };
    });
    addEventListener("popstate", nav);
    addEventListener("hashchange", nav);
    window.Mallow = {
      show: function (c) {
        show(
          c === "reach"
            ? ROUTES["/contact"]
            : (typeof c === "object" && c) || HI,
        );
      },
      hide: hide,
      configure: merge,
      motions: [
        "hi",
        "reach",
        "hop",
        "happy",
        "shy",
        "surprised",
        "wink",
        "sleepy",
      ],
    };

    function size() {
      var s = btn.clientWidth;
      R.setSize(s, s, false);
    }
    addEventListener("resize", size);
    size();

    function frame() {
      var dt = Math.min(clk.getDelta(), 0.05),
        q = rm ? 0 : 1,
        m;
      t += dt;
      function sm(a, b, r) {
        return a + (b - a) * Math.min(1, dt * r);
      }

      /* intro timeline: fall -> impact -> lie -> get up -> greet */
      var iz = 0,
        iy = 0,
        isq = 1;
      if (intro) {
        intro.s += dt;
        var ts = intro.s;
        if (ts < FALL) {
          /* in the air: accelerate down from above the screen, tumbling */
          var p = ts / FALL;
          host.style.transform =
            "translateY(" + -(1 - p * p) * (innerHeight + 200) + "px)";
          iz = p * Math.PI * 2.5; /* ends lying on her side */
          iy = ground(iz);
          mode = "surprised";
        } else if (ts < FALL + LIE) {
          /* impact: squash, small bounce, then lie knocked out */
          host.style.transform = "";
          var k = Math.min(1, (ts - FALL) / 0.35);
          iz = Math.PI / 2;
          iy = ground(iz) + Math.sin(k * Math.PI) * 0.3;
          isq = 1 - 0.25 * Math.sin(Math.min(1, (ts - FALL) / 0.3) * Math.PI);
          mode = "sleepy";
        } else if (ts < FALL + LIE + UP) {
          /* wake up and stand */
          var q2 = (ts - FALL - LIE) / UP,
            e = 1 - Math.pow(1 - q2, 3);
          iz = (Math.PI / 2) * (1 - e);
          iy = ground(iz) + Math.sin(q2 * Math.PI) * 0.3;
          mode = "";
        } else {
          intro = null;
          host.style.transform = "";
          w.style.transition = "";
          say({ say: "Hi, I'm Marsheee!", motion: "hi" });
          arm_();
        }
      }
      m = mode;
      hop = Math.max(0, hop - dt * 0.8);
      /* the pose each motion aims for; everything eases toward it */
      var ey = 1,
        eyR = -1,
        es = 1,
        mouth = "s",
        mw = 1,
        bo = 0.55,
        bsc = 1,
        rz = 0,
        rx = 0,
        bAmp = 0,
        bSpd = 7,
        jp = 0,
        aR = 0.12,
        aL = -0.12,
        rp = [1, 0, 0.1],
        lp = [-1, 0, 0.1],
        lShow = 0;
      if (m === "hi") {
        aR = 2.3 + Math.sin(t * 9) * 0.45 * q;
        mw = 1.3;
      } else if (m === "reach") {
        aR = 1.55 + Math.sin(t * 3) * 0.08 * q;
        rx = -0.12;
        es = 1.15;
        mw = 1.5;
      } else if (m === "hop") {
        mw = 1.3;
      } else if (m === "happy") {
        mouth = "h";
        aR = 2.3 + Math.sin(t * 8) * 0.4 * q;
        aL = -2.3 - Math.sin(t * 8 + 1) * 0.4 * q;
        lShow = 1;
        bAmp = 0.28;
        bSpd = 8;
      } else if (m === "shy") {
        ey = 0.2;
        bo = 0.95;
        bsc = 1.3;
        aR = -0.35;
        aL = 0.35;
        rp = [0.28, -0.1, 0.95];
        lp = [-0.28, -0.1, 0.95];
        lShow = 1;
        rz = Math.sin(t * 2) * 0.07 * q;
        rx = 0.12;
      } else if (m === "surprised") {
        es = 1.3;
        ey = 1.15;
        mouth = "o";
        aR = 1;
        aL = -1;
        lShow = 1;
        jp = Math.sin(Math.min(1, (1 - hop) * 3) * Math.PI) * 0.8 * q;
      } else if (m === "wink") {
        eyR = 0.1;
        mw = 1.5;
        rz = 0.06 + Math.sin(t * 3) * 0.05 * q;
      } else if (m === "sleepy") {
        ey = 0.14;
        bo = 0.4;
        mw = 0.7;
        rz = Math.sin(t * 1.1) * 0.09 * q;
        rx = 0.2 + Math.sin(t * 1.1) * 0.05 * q;
      }
      if (eyR < 0) eyR = ey;
      var y =
        (Math.abs(Math.sin(t * 7)) * 0.45 * hop +
          Math.abs(Math.sin(t * 2.2)) * 0.03 +
          Math.abs(Math.sin(t * bSpd)) * bAmp) *
          q +
        jp;
      if (m === "sleepy") y *= 0.2;
      if (intro) {
        /* intro overrides: rotate about her feet, keep her centred and resting on the ground */
        ch.position.x = 0.85 * Math.sin(iz);
        ch.position.y = iy;
        ch.rotation.y = 0;
        ch.rotation.x = 0;
        ch.rotation.z = iz;
      } else {
        ch.position.x = 0;
        ch.position.y = y;
        ch.rotation.y = mx * 0.35;
        ch.rotation.x = sm(ch.rotation.x, rx, 8);
        ch.rotation.z = sm(ch.rotation.z, rz, 8);
      }
      sh.scale.setScalar(Math.max(0.4, 1 - ch.position.y * 0.4));
      var sq = 1 + Math.sin(t * 6) * 0.03 * q * (m && m !== "sleepy" ? 1 : 0.3);
      body.scale.set(1 / Math.sqrt(sq), sq * isq, 1 / Math.sqrt(sq));
      armP.rotation.z = sm(armP.rotation.z, aR, 10);
      armQ.rotation.z = sm(armQ.rotation.z, aL, 10);
      ["x", "y", "z"].forEach(function (k, i) {
        armP.position[k] = sm(armP.position[k], rp[i], 10);
        armQ.position[k] = sm(armQ.position[k], lp[i], 10);
      });
      armQ.scale.setScalar(sm(armQ.scale.x, lShow ? 1 : 0.001, 10));
      var bl = t % 3.2 < 0.12 ? 0.1 : 1;
      eL.scale.y = sm(eL.scale.y, ey * bl, 25);
      eR.scale.y = sm(eR.scale.y, eyR * bl, 25);
      eL.scale.x = eL.scale.z = sm(eL.scale.x, es, 10);
      eR.scale.x = eR.scale.z = sm(eR.scale.x, es, 10);
      mo.visible = mouth === "s";
      mHalf.visible = mouth === "h";
      mO.visible = mouth === "o";
      mo.scale.x = sm(mo.scale.x, mw, 10);
      BL.forEach(function (b) {
        b.material.opacity = sm(b.material.opacity, bo, 6);
        b.scale.setScalar(sm(b.scale.x, bsc, 6));
      });
      bow.rotation.z = -0.4 + Math.sin(t * 5) * 0.08 * q;
      R.render(S, cam);
    }
    function start() {
      if (running) return;
      running = true;
      clk.getDelta();
      (function loop() {
        if (!running) return;
        raf = requestAnimationFrame(loop);
        frame();
      })();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    /* home page only: fall in on every load. Everywhere else: the normal route behaviour */
    var c0 = match(location.pathname, location.hash);
    if (norm(location.pathname) === "/" && !rm) playIntro();
    else show(c0 && c0.onLoad ? c0 : null);
  }

  if (window.THREE) boot();
  else {
    var s = document.createElement("script");
    s.src =
      (CS && CS.dataset.three) ||
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"; /* pinned: r128 */
    s.onload = boot;
    document.head.appendChild(s);
  }
})();