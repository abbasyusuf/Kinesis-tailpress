var twind = (function (e) {
  "use strict";
  let t;
  function r(e) {
    return [...e.v, (e.i ? "!" : "") + e.n].join(":");
  }
  function n(e, t = ",") {
    return e.map(r).join(t);
  }
  let i =
    ("undefined" != typeof CSS && CSS.escape) ||
    ((e) =>
      e
        .replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&")
        .replace(/^\d/, "\\3$& "));
  function o(e) {
    for (var t = 9, r = e.length; r--; )
      t = Math.imul(t ^ e.charCodeAt(r), 1597334677);
    return "#" + ((t ^ (t >>> 9)) >>> 0).toString(36);
  }
  function l(e, t = "@media ") {
    return (
      t +
      u(e)
        .map(
          (e) => (
            "string" == typeof e && (e = { min: e }),
            e.raw ||
              Object.keys(e)
                .map((t) => `(${t}-width:${e[t]})`)
                .join(" and ")
          ),
        )
        .join(",")
    );
  }
  function u(e = []) {
    return Array.isArray(e) ? e : null == e ? [] : [e];
  }
  function s(e) {
    return e;
  }
  function a() {}
  let c = {
    d: 0,
    b: 134217728,
    c: 268435456,
    a: 671088640,
    u: 805306368,
    o: 939524096,
  };
  function f(e) {
    var t;
    return (null == (t = e.match(/[-=:;]/g)) ? void 0 : t.length) || 0;
  }
  function p(e) {
    return (
      (Math.min(
        /(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(e)
          ? Math.max(
              0,
              29.63 * (+RegExp.$1 / (RegExp.$2 ? 15 : 1)) ** 0.137 - 43,
            )
          : 0,
        15,
      ) <<
        22) |
      (Math.min(f(e), 15) << 18)
    );
  }
  let h = [
    "rst-c",
    "st-ch",
    "h-chi",
    "y-lin",
    "nk",
    "sited",
    "ecked",
    "pty",
    "ad-on",
    "cus-w",
    "ver",
    "cus",
    "cus-v",
    "tive",
    "sable",
    "tiona",
    "quire",
  ];
  function d({ n: e, i: t, v: n = [] }, i, o, s) {
    for (let a of (e && (e = r({ n: e, i: t, v: n })), (s = [...u(s)]), n)) {
      let c = i.theme("screens", a);
      for (let f of u((c && l(c)) || i.v(a))) {
        var d;
        s.push(f),
          (o |= c
            ? 67108864 | p(f)
            : "dark" == a
            ? 1073741824
            : "@" == f[0]
            ? p(f)
            : ((d = f),
              1 <<
                ~(
                  (/:([a-z-]+)/.test(d) && ~h.indexOf(RegExp.$1.slice(2, 7))) ||
                  -18
                )));
      }
    }
    return { n: e, p: o, r: s, i: t };
  }
  let g = new Map();
  function y() {
    return (y =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }).apply(this, arguments);
  }
  function m() {
    return y.apply(this, arguments);
  }
  function v(e) {
    if (e.d) {
      let t = [],
        r = b(
          e.r.reduce(
            (e, r) =>
              "@" == r[0]
                ? (t.push(r), e)
                : r
                ? b(e, (e) =>
                    b(r, (t) => {
                      let r = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(t);
                      if (r) {
                        let n = e.indexOf(r[1]);
                        return ~n
                          ? e.slice(0, n) + r[0] + e.slice(n + r[1].length)
                          : $(e, t);
                      }
                      return $(t, e);
                    }),
                  )
                : e,
            "&",
          ),
          (t) => $(t, e.n ? "." + i(e.n) : ""),
        );
      return (
        r && t.push(r.replace(/:merge\((.+?)\)/g, "$1")),
        t.reduceRight((e, t) => t + "{" + e + "}", e.d)
      );
    }
  }
  function b(e, t) {
    return e.replace(
      / *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g,
      (e, r, n) => t(r) + n,
    );
  }
  function $(e, t) {
    return e.replace(/&/g, t);
  }
  let w = new Intl.Collator("en", { numeric: !0 });
  function x(e, t) {
    for (var r = 0, n = e.length; r < n; ) {
      let i = (n + r) >> 1;
      0 >= A(e[i], t) ? (r = i + 1) : (n = i);
    }
    return n;
  }
  function A(e, t) {
    let r = e.p & c.o;
    return r == (t.p & c.o) && (r == c.b || r == c.o)
      ? 0
      : e.p - t.p ||
          e.o - t.o ||
          w.compare(j(e.n), j(t.n)) ||
          w.compare(k(e.n), k(t.n));
  }
  function j(e) {
    return (e || "").split(/:/).pop().split("/").pop() || "\0";
  }
  function k(e) {
    return (
      (e || "").replace(/\W/g, (e) =>
        String.fromCharCode(127 + e.charCodeAt(0)),
      ) + "\0"
    );
  }
  function O(e, t) {
    return Math.round(parseInt(e, 16) * t);
  }
  function S(e, t = {}) {
    if ("function" == typeof e) return e(t);
    let { opacityValue: r = "1", opacityVariable: n } = t,
      i = n ? `var(${n})` : r;
    if (e.includes("<alpha-value>")) return e.replace("<alpha-value>", i);
    if ("#" == e[0] && (4 == e.length || 7 == e.length)) {
      let o = (e.length - 1) / 3,
        l = [17, 1, 0.062272][o - 1];
      return `rgba(${[
        O(e.substr(1, o), l),
        O(e.substr(1 + o, o), l),
        O(e.substr(1 + 2 * o, o), l),
        i,
      ]})`;
    }
    return "1" == i
      ? e
      : "0" == i
      ? "#0000"
      : e.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${i})`);
  }
  function M(e, t, r, n, i = []) {
    return (function e(t, { n: r, p: n, r: i = [], i: s }, a) {
      let h = [],
        d = "",
        g = 0,
        y = 0;
      for (let m in t || {}) {
        var b, $;
        let w = t[m];
        if ("@" == m[0]) {
          if (!w) continue;
          if ("a" == m[1]) {
            h.push(...N(r, n, F("" + w), a, n, i, s, !0));
            continue;
          }
          if ("l" == m[1]) {
            for (let x of u(w))
              h.push(
                ...e(
                  x,
                  { n: r, p: ((b = c[m[7]]), (n & ~c.o) | b), r: i, i: s },
                  a,
                ),
              );
            continue;
          }
          if ("i" == m[1]) {
            h.push(
              ...u(w).map((e) => ({ p: -1, o: 0, r: [], d: m + " " + e })),
            );
            continue;
          }
          if ("k" == m[1]) {
            h.push({
              p: c.d,
              o: 0,
              r: [m],
              d: e(w, { p: c.d }, a).map(v).join(""),
            });
            continue;
          }
          if ("f" == m[1]) {
            h.push(
              ...u(w).map((t) => ({
                p: c.d,
                o: 0,
                r: [m],
                d: e(t, { p: c.d }, a).map(v).join(""),
              })),
            );
            continue;
          }
        }
        if ("object" != typeof w || Array.isArray(w))
          "label" == m && w
            ? (r = w + o(JSON.stringify([n, s, t])))
            : (w || 0 === w) &&
              ((m = m.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase())),
              (y += 1),
              (g = Math.max(
                g,
                "-" == ($ = m)[0]
                  ? 0
                  : f($) +
                      (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7,8}$)|([fl].{5}l|g.{8}$|pl))/.test(
                        $,
                      )
                        ? +!!RegExp.$1 || -!!RegExp.$2
                        : 0) +
                      1,
              )),
              (d +=
                (d ? ";" : "") +
                u(w)
                  .map((e) =>
                    a.s(m, C("" + e, a.theme) + (s ? " !important" : "")),
                  )
                  .join(";")));
        else if ("@" == m[0] || m.includes("&")) {
          let j = n;
          "@" == m[0] &&
            ((m = m.replace(/\bscreen\(([^)]+)\)/g, (e, t) => {
              let r = a.theme("screens", t);
              return r ? ((j |= 67108864), l(r, "")) : e;
            })),
            (j |= p(m))),
            h.push(...e(w, { n: r, p: j, r: [...i, m], i: s }, a));
        } else h.push(...e(w, { p: n, r: [...i, m] }, a));
      }
      return (
        h.unshift({
          n: r,
          p: n,
          o: Math.max(0, 15 - y) + 1.5 * Math.min(g || 15, 15),
          r: i,
          d: d,
        }),
        h.sort(A)
      );
    })(e, d(t, r, n, i), r);
  }
  function C(e, t) {
    return e.replace(
      /theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g,
      (e, r, n, i, o) => {
        let l = t(n, o);
        return "function" == typeof l && /color|fill|stroke/i.test(n)
          ? S(l)
          : "" + l;
      },
    );
  }
  function E(e, t) {
    let r;
    let n = [];
    for (let i of e)
      i.d && i.n
        ? (null == r ? void 0 : r.p) == i.p && "" + r.r == "" + i.r
          ? ((r.c = [r.c, i.c].filter(Boolean).join(" ")),
            (r.d = r.d + ";" + i.d))
          : n.push((r = m({}, i, { n: i.n && t })))
        : n.push(m({}, i, { n: i.n && t }));
    return n;
  }
  function R(e, t, n = c.u, i, o) {
    let l = [];
    for (let s of e)
      for (let a of (function (e, t, n, i, o) {
        var l;
        e = m({}, e, { i: e.i || o });
        let s = (function (e, t) {
          let r = g.get(e.n);
          return r ? r(e, t) : t.r(e.n, "dark" == e.v[0]);
        })(e, t);
        return s
          ? "string" == typeof s
            ? (({ r: i, p: n } = d(e, t, n, i)), E(R(F(s), t, n, i, e.i), e.n))
            : Array.isArray(s)
            ? s.map((e) => {
                var t, r;
                return m({ o: 0 }, e, {
                  r: [...u(i), ...u(e.r)],
                  p: ((t = n), (r = null != (l = e.p) ? l : n), (t & ~c.o) | r),
                });
              })
            : M(s, e, t, n, i)
          : [{ c: r(e), p: 0, o: 0, r: [] }];
      })(s, t, n, i, o))
        l.splice(x(l, a), 0, a);
    return l;
  }
  function N(e, t, r, n, i, o, l, u) {
    return E(
      (u ? r.flatMap((e) => R([e], n, i, o, l)) : R(r, n, i, o, l)).map((e) =>
        e.p & c.o && (e.n || t == c.b)
          ? m({}, e, { p: (e.p & ~c.o) | t, o: 0 })
          : e,
      ),
      e,
    );
  }
  function V(e, t, r, n) {
    var i;
    return (
      (i = (e, i) => {
        let { n: o, p: l, r: u, i: s } = d(e, i, t);
        return r && N(o, t, r, i, l, u, s, n);
      }),
      g.set(e, i),
      e
    );
  }
  function z(e, t) {
    if ("(" != e[e.length - 1]) {
      let r = [],
        n = !1,
        i = !1,
        o = "";
      for (let l of e)
        if (!("(" == l || /[~@]$/.test(l))) {
          if (("!" == l[0] && ((l = l.slice(1)), (n = !n)), l.endsWith(":"))) {
            r["dark:" == l ? "unshift" : "push"](l.slice(0, -1));
            continue;
          }
          "-" == l[0] && ((l = l.slice(1)), (i = !i)),
            l.endsWith("-") && (l = l.slice(0, -1)),
            l && "&" != l && (o += (o && "-") + l);
        }
      o && (i && (o = "-" + o), t[0].push({ n: o, v: r.filter(P), i: n }));
    }
  }
  function P(e, t, r) {
    return r.indexOf(e) == t;
  }
  let T = new Map();
  function F(e) {
    let t = T.get(e);
    if (!t) {
      let r = [],
        i = [[]],
        l = 0,
        u = 0,
        s = null,
        a = 0,
        f = (t, n = 0) => {
          l != a && (r.push(e.slice(l, a + n)), t && z(r, i)), (l = a + 1);
        };
      for (; a < e.length; a++) {
        let p = e[a];
        if (u) "\\" != e[a - 1] && (u += +("[" == p) || -("]" == p));
        else if ("[" == p) u += 1;
        else if (s)
          "\\" != e[a - 1] &&
            s.test(e.slice(a)) &&
            ((s = null), (l = a + RegExp.lastMatch.length));
        else if (
          "/" == p &&
          "\\" != e[a - 1] &&
          ("*" == e[a + 1] || "/" == e[a + 1])
        )
          s = "*" == e[a + 1] ? /^\*\// : /^[\r\n]/;
        else if ("(" == p) f(), r.push(p);
        else if (":" == p) ":" != e[a + 1] && f(!1, 1);
        else if (/[\s,)]/.test(p)) {
          f(!0);
          let h = r.lastIndexOf("(");
          if (")" == p) {
            let d = r[h - 1];
            if (/[~@]$/.test(d)) {
              let g = i.shift();
              (r.length = h), z([...r, "#"], i);
              let { v: y } = i[0].pop();
              for (let m of g)
                m.v.splice(+("dark" == m.v[0]) - +("dark" == y[0]), y.length);
              z(
                [
                  ...r,
                  V(
                    d.length > 1
                      ? d.slice(0, -1) + o(JSON.stringify([d, g]))
                      : d + "(" + n(g) + ")",
                    c.a,
                    g,
                    /@$/.test(d),
                  ),
                ],
                i,
              );
            }
            h = r.lastIndexOf("(", h - 1);
          }
          r.length = h + 1;
        } else /[~@]/.test(p) && "(" == e[a + 1] && i.unshift([]);
      }
      f(!0), T.set(e, (t = i[0]));
    }
    return t;
  }
  function _(e, t, r) {
    return t.reduce((t, n, i) => t + r(n) + e[i + 1], e[0]);
  }
  function I(e, t) {
    return Array.isArray(e) && Array.isArray(e.raw)
      ? _(e, t, (e) => L(e).trim())
      : t.filter(Boolean).reduce((e, t) => e + L(t), e ? L(e) : "");
  }
  function L(e) {
    let t,
      r = "";
    if (e && "object" == typeof e) {
      if (Array.isArray(e)) (t = I(e[0], e.slice(1))) && (r += " " + t);
      else for (let n in e) e[n] && (r += " " + n);
    } else null != e && "boolean" != typeof e && (r += " " + e);
    return r;
  }
  let q = J("@"),
    D = J("~");
  function J(e) {
    return new Proxy(
      function (e, ...r) {
        return t("", e, r);
      },
      {
        get: (e, r) =>
          r in e
            ? e[r]
            : function (e, ...n) {
                return t(r, e, n);
              },
      },
    );
    function t(t, r, i) {
      return n(F(t + e + "(" + I(r, i) + ")"));
    }
  }
  function B(e, t) {
    return Array.isArray(e)
      ? W(_(e, t, (e) => (null != e && "boolean" != typeof e ? e : "")))
      : "string" == typeof e
      ? W(e)
      : [e];
  }
  let U =
    / *(?:(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}))/g;
  function W(e) {
    let t;
    e = e.replace(/\/\*[^]*?\*\/|\s\s+|\n/gm, " ");
    let r = [{}],
      n = [r[0]],
      i = [];
    for (; (t = U.exec(e)); )
      t[4] && (r.shift(), i.shift()),
        t[3]
          ? (i.unshift(t[3]),
            r.unshift({}),
            n.push(i.reduce((e, t) => ({ [t]: e }), r[0])))
          : t[4] ||
            (r[0][t[1]] &&
              (r.unshift({}), n.push(i.reduce((e, t) => ({ [t]: e }), r[0]))),
            (r[0][t[1]] = t[2]));
    return n;
  }
  function G(e, ...t) {
    var r, n;
    let i = B(e, t),
      l =
        ((null == (r = i.find((e) => e.label)) ? void 0 : r.label) || "css") +
        o(JSON.stringify(i));
    return (
      (n = (e, t) =>
        E(
          i.flatMap((r) => M(r, e, t, c.o)),
          l,
        )),
      g.set(l, n),
      l
    );
  }
  let Y = new Proxy(
    function (e, t) {
      return Z("animation", e, t);
    },
    {
      get: (e, t) =>
        t in e
          ? e[t]
          : function (e, r) {
              return Z(t, e, r);
            },
    },
  );
  function Z(e, t, r) {
    return {
      toString: () =>
        G({
          label: e,
          "@layer components": m(
            {},
            "object" == typeof t ? t : { animation: t },
            { animationName: "" + r },
          ),
        }),
    };
  }
  function H(e, t) {
    return "function" == typeof e
      ? e
      : "string" == typeof e && /^[\w-]+$/.test(e)
      ? (r, n) => ({ [e]: t ? t(r, n) : K(r, 1) })
      : (t) => e || { [t[1]]: K(t, 2) };
  }
  function K(e, t, r = e.slice(t).find(Boolean) || e.$$ || e.input) {
    return "-" == e.input[0] ? `calc(${r} * -1)` : r;
  }
  function Q(e, t, r) {
    let n =
      "string" == typeof t
        ? (e, n) => ({ [t]: r ? r(e, n) : e._ })
        : t || (({ 1: e, _: t }, r, n) => ({ [e || n]: t }));
    return (t, r) => {
      var i;
      let o = en(e || t[1]),
        l = null != (i = r.theme(o, t.$$)) ? i : er(t.$$, o, r);
      if (null != l) return (t._ = K(t, 0, l)), n(t, r, o);
    };
  }
  function X(e = {}, t) {
    return (r, n) => {
      let { section: i = en(r[0]).replace("-", "") + "Color" } = e,
        [o, l] = ee(r.$$);
      if (!o) return;
      let u = n.theme(i, o) || er(o, i, n);
      if (!u || "object" == typeof u) return;
      let {
          opacityVariable: s = `--tw-${r[0].replace(/-$/, "")}-opacity`,
          opacitySection: a = i.replace("Color", "Opacity"),
          property: c = i,
          selector: f,
        } = e,
        p = n.theme(a, l || "DEFAULT") || (l && er(l, a, n)),
        h =
          t ||
          (({ _: e }) => {
            let t = et(c, e);
            return f ? { [f]: t } : t;
          });
      r._ = {
        value: S(u, {
          opacityVariable: s || void 0,
          opacityValue: p || void 0,
        }),
        color: (e) => S(u, e),
        opacityVariable: s || void 0,
        opacityValue: p || void 0,
      };
      let d = h(r, n);
      if (!r.dark) {
        let g = n.d(i, o, u);
        g &&
          g !== u &&
          ((r._ = {
            value: S(g, {
              opacityVariable: s || void 0,
              opacityValue: p || "1",
            }),
            color: (e) => S(g, e),
            opacityVariable: s || void 0,
            opacityValue: p || void 0,
          }),
          (d = { "&": d, [n.v("dark")]: h(r, n) }));
      }
      return d;
    };
  }
  function ee(e) {
    return (e.match(/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/) || []).slice(1);
  }
  function et(e, t) {
    let r = {};
    return (
      "string" == typeof t
        ? (r[e] = t)
        : (t.opacityVariable &&
            t.value.includes(t.opacityVariable) &&
            (r[t.opacityVariable] = t.opacityValue || "1"),
          (r[e] = t.value)),
      r
    );
  }
  function er(e, t, r) {
    if (
      "[" == e[0] &&
      "]" == e.slice(-1) &&
      ((e = ei(C(e.slice(1, -1), r.theme))),
      !(
        (/color|fill|stroke/i.test(t) &&
          !(
            /^color:/.test(e) ||
            /^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(e)
          )) ||
        (/image/i.test(t) && !(/^image:/.test(e) || /^[a-z-]+\(/.test(e))) ||
        (/weight/i.test(t) && !(/^(number|any):/.test(e) || /^\d+$/.test(e))) ||
        (/position/i.test(t) && /^(length|size):/.test(e))
      ))
    )
      return e.replace(/^[a-z-]+:/, "");
  }
  function en(e) {
    return e.replace(/-./g, (e) => e[1].toUpperCase());
  }
  function ei(e) {
    return e.includes("url(")
      ? e.replace(
          /(.*?)(url\(.*?\))(.*?)/g,
          (e, t = "", r, n = "") => ei(t) + r + ei(n),
        )
      : e
          .replace(
            /(^|[^\\])_+/g,
            (e, t) => t + " ".repeat(e.length - t.length),
          )
          .replace(/\\_/g, "_")
          .replace(/(calc|min|max|clamp)\(.+\)/g, (e) =>
            e.replace(
              /(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g,
              "$1 $2 ",
            ),
          );
  }
  let eo = Symbol();
  function el(e, t) {
    if (null == e) return {};
    var r,
      n,
      i = {},
      o = Object.keys(e);
    for (n = 0; n < o.length; n++)
      (r = o[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
    return i;
  }
  function eu(e) {
    var { presets: t = [] } = e,
      r = el(e, ["presets"]);
    let n = {
      preflight: !1 !== r.preflight && [],
      darkMode: void 0,
      darkColor: void 0,
      theme: {},
      variants: u(r.variants),
      rules: u(r.rules),
      ignorelist: u(r.ignorelist),
      hash: r.hash,
      stringify: r.stringify || es,
    };
    for (let i of u([
      ...t,
      {
        darkMode: r.darkMode,
        darkColor: r.darkColor,
        preflight: !1 !== r.preflight && u(r.preflight),
        theme: r.theme,
        hash: r.hash,
        stringify: r.stringify,
      },
    ])) {
      let {
        preflight: o,
        darkMode: l = n.darkMode,
        darkColor: s = n.darkColor,
        theme: a,
        variants: c,
        rules: f,
        ignorelist: p,
        hash: h = n.hash,
        stringify: d = n.stringify,
      } = "function" == typeof i ? i(n) : i;
      n = {
        preflight: !1 !== n.preflight && !1 !== o && [...n.preflight, ...u(o)],
        darkMode: l,
        darkColor: s,
        theme: m({}, n.theme, a, {
          extend: m({}, n.theme.extend, null == a ? void 0 : a.extend),
        }),
        variants: [...n.variants, ...u(c)],
        rules: [...n.rules, ...u(f)],
        ignorelist: [...n.ignorelist, ...u(p)],
        hash: h,
        stringify: d,
      };
    }
    return n;
  }
  function es(e, t) {
    return e + ":" + t;
  }
  function ea(e, t, r, n, i, o) {
    for (let l of t) {
      let u = r.get(l);
      u || r.set(l, (u = n(l)));
      let s = u(e, i, o);
      if (s) return s;
    }
  }
  function ec(e) {
    var t;
    return ep(e[0], "function" == typeof (t = e[1]) ? t : () => t);
  }
  function ef(e) {
    var t, r;
    return Array.isArray(e) ? ep(e[0], H(e[1], e[2])) : ep(e, H(t, r));
  }
  function ep(e, t) {
    return eh(e, (e, r, n, i) => {
      let o = r.exec(e);
      if (o) return (o.$$ = e.slice(o[0].length)), (o.dark = i), t(o, n);
    });
  }
  function eh(e, t) {
    let r = u(e).map(ed);
    return (e, n, i) => {
      for (let o of r) {
        let l = t(e, o, n, i);
        if (l) return l;
      }
    };
  }
  function ed(e) {
    return "string" == typeof e
      ? RegExp("^" + e + (e.includes("$") || "-" == e.slice(-1) ? "" : "$"))
      : e;
  }
  function eg(e, t) {
    return e.replace(
      /--(tw(?:-[\w-]+)?)\b/g,
      (e, r) => "--" + t(r).replace("#", ""),
    );
  }
  function ey(e, t) {
    let r = eu(e),
      n = (function ({
        theme: e,
        darkMode: t,
        darkColor: r,
        variants: n,
        rules: l,
        hash: a,
        stringify: c,
        ignorelist: f,
      }) {
        let p = new Map(),
          h = new Map(),
          d = new Map(),
          g = new Map(),
          y = eh(f, (e, t) => t.test(e));
        n.push([
          "dark",
          Array.isArray(t) || "class" == t
            ? `${u(t)[1] || ".dark"} &`
            : "string" == typeof t && "media" != t
            ? t
            : "@media (prefers-color-scheme:dark)",
        ]);
        let m = "function" == typeof a ? (e) => a(e, o) : a ? o : s;
        return {
          theme: (function (e) {
            var { extend: t = {} } = e,
              r = el(e, ["extend"]);
            let n = {},
              i = {
                get colors() {
                  return o("colors");
                },
                theme: o,
                negative: () => ({}),
                breakpoints(e) {
                  let t = {};
                  for (let r in e)
                    "string" == typeof e[r] && (t["screen-" + r] = e[r]);
                  return t;
                },
              };
            return o;
            function o(e, i, u, s) {
              if (e) {
                var a;
                if (
                  (({ 1: e, 2: s } = /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(e) || [
                    ,
                    e,
                  ]),
                  /[.[]/.test(e))
                ) {
                  let c = [];
                  e.replace(/\[([^\]]+)\]|([^.[]+)/g, (e, t, r = t) =>
                    c.push(r),
                  ),
                    (e = c.shift()),
                    (u = i),
                    (i = c.join("-"));
                }
                let f =
                  n[e] ||
                  Object.assign(Object.assign((n[e] = {}), l(r, e)), l(t, e));
                if (null == i) return f;
                let p = null != (a = f[i || "DEFAULT"]) ? a : u;
                return s ? S(p, { opacityValue: C(s, o) }) : p;
              }
              let h = {};
              for (let d of [...Object.keys(r), ...Object.keys(t)]) h[d] = o(d);
              return h;
            }
            function l(e, t) {
              let r = e[t];
              return ("function" == typeof r && (r = r(i)),
              r && /color|fill|stroke/i.test(t))
                ? (function e(t, r = []) {
                    let n = {};
                    for (let i in t) {
                      let o = t[i],
                        l = [...r, i];
                      (n[l.join("-")] = o),
                        "DEFAULT" == i && ((l = r), (n[r.join("-")] = o)),
                        "object" == typeof o && Object.assign(n, e(o, l));
                    }
                    return n;
                  })(r)
                : r;
            }
          })(e),
          e: i,
          h: m,
          s(e, t) {
            return c(eg(e, m), eg(t, m), this);
          },
          d(e, t, n) {
            return null == r ? void 0 : r(e, t, this, n);
          },
          v(e) {
            return (
              p.has(e) || p.set(e, ea(e, n, h, ec, this) || "&:" + e), p.get(e)
            );
          },
          r(e, t) {
            let r = JSON.stringify([e, t]);
            return (
              d.has(r) || d.set(r, !y(e, this) && ea(e, l, g, ef, this, t)),
              d.get(r)
            );
          },
        };
      })(r),
      l = new Map(),
      a = [],
      f = new Set();
    function p(e) {
      let r = e.n && n.h(e.n),
        i = v(r ? m({}, e, { n: r }) : e);
      if (i && !f.has(i)) {
        f.add(i);
        let o = x(a, e);
        t.insert(i, o, e), a.splice(o, 0, e);
      }
      return r;
    }
    return (
      t.resume(
        (e) => l.set(e, e),
        (e, r) => {
          t.insert(e, a.length, r), a.push(r), f.add(e);
        },
      ),
      Object.defineProperties(
        function (e) {
          if (!l.size)
            for (let t of u(r.preflight))
              "function" == typeof t && (t = t(n)),
                t &&
                  ("string" == typeof t
                    ? N("", c.b, F(t), n, c.b, [], !1, !0)
                    : M(t, {}, n, c.b)
                  ).forEach(p);
          e = "" + e;
          let i = l.get(e);
          if (!i) {
            let o = new Set();
            for (let s of R(F(e), n)) o.add(s.c).add(p(s));
            (i = [...o].filter(Boolean).join(" ")), l.set(e, i).set(i, i);
          }
          return i;
        },
        Object.getOwnPropertyDescriptors({
          get target() {
            return t.target;
          },
          theme: n.theme,
          config: r,
          snapshot() {
            let e = t.snapshot(),
              r = new Set(f),
              n = new Map(l),
              i = [...a];
            return () => {
              e(), (f = r), (l = n), (a = i);
            };
          },
          clear() {
            t.clear(), (f = new Set()), (l = new Map()), (a = []);
          },
          destroy() {
            this.clear(), t.destroy();
          },
        }),
      )
    );
  }
  function em(e, t) {
    return e != t && "" + e.split(" ").sort() != "" + t.split(" ").sort();
  }
  function ev(e = ek, t = document.documentElement) {
    if (!t) return e;
    let r = new MutationObserver(i);
    r.observe(t, { attributeFilter: ["class"], subtree: !0, childList: !0 }),
      o(t),
      i([{ target: t, type: "" }]);
    let { destroy: n } = e;
    return (
      (e.destroy = () => {
        r.disconnect(), n.call(e);
      }),
      e
    );
    function i(e) {
      for (let { type: t, target: n } of e)
        if ("a" == t[0]) o(n);
        else for (let i of n.querySelectorAll("[class]")) o(i);
      r.takeRecords();
    }
    function o(t) {
      let r;
      let n = t.getAttribute("class");
      n && em(n, (r = e(n))) && t.setAttribute("class", r);
    }
  }
  function eb(e) {
    let t = document.querySelector(e || "style[data-twind]");
    return (
      (t && "STYLE" == t.tagName) ||
        (((t = document.createElement("style")).dataset.twind = ""),
        document.head.prepend(t)),
      t
    );
  }
  function e$(e) {
    let t = (null == e ? void 0 : e.cssRules)
      ? e
      : (e && "string" != typeof e ? e : eb(e)).sheet;
    return {
      target: t,
      snapshot() {
        let e = Array.from(t.cssRules, (e) => e.cssText);
        return () => {
          this.clear(), e.forEach(this.insert);
        };
      },
      clear() {
        for (let e = t.cssRules.length; e--; ) t.deleteRule(e);
      },
      destroy() {
        var e;
        null == (e = t.ownerNode) || e.remove();
      },
      insert(e, r) {
        try {
          t.insertRule(e, r);
        } catch (n) {
          t.insertRule(":root{}", r), /:-[mwo]/.test(e);
        }
      },
      resume: a,
    };
  }
  function ew(e) {
    let t = e && "string" != typeof e ? e : eb(e);
    return {
      target: t,
      snapshot() {
        let e = Array.from(t.childNodes, (e) => e.textContent);
        return () => {
          this.clear(), e.forEach(this.insert);
        };
      },
      clear() {
        t.textContent = "";
      },
      destroy() {
        t.remove();
      },
      insert(e, r) {
        t.insertBefore(document.createTextNode(e), t.childNodes[r] || null);
      },
      resume: a,
    };
  }
  function ex(e, t) {
    let r = e ? ew() : e$();
    return t || (r.resume = ej), r;
  }
  function eA(e) {
    return (
      (e.ownerNode || e).textContent ||
      (e.cssRules ? Array.from(e.cssRules, (e) => e.cssText) : u(e)).join("")
    );
  }
  function ej(e, t) {
    let r = eA(this.target),
      n = /\/\*!([\da-z]+),([\da-z]+)(?:,(.+?))?\*\//g;
    if (n.test(r)) {
      var i;
      let o;
      for (let l of ((n.lastIndex = 0),
      this.clear(),
      document.querySelectorAll("[class]")))
        e(l.getAttribute("class"));
      for (
        ;
        (i = n.exec(r)),
          o &&
            t(r.slice(o.index + o[0].length, null == i ? void 0 : i.index), {
              p: parseInt(o[1], 36),
              o: parseInt(o[2], 36) / 2,
              n: o[3],
            }),
          (o = i);

      );
    }
  }
  let ek = new Proxy(a, {
    apply: (e, r, n) => t(n[0]),
    get(e, r) {
      let n = t[r];
      return "function" == typeof n
        ? function () {
            return n.apply(t, arguments);
          }
        : n;
    },
  });
  function eO(e = {}, r = ex, n) {
    return (
      null == t || t.destroy(),
      (t = ev(ey(e, "function" == typeof r ? r() : r), n))
    );
  }
  let eS = (function e(t) {
    return new Proxy(
      function (e, ...r) {
        return eM(t, "", e, r);
      },
      {
        get: (r, n) =>
          "bind" === n
            ? e
            : n in r
            ? r[n]
            : function (e, ...r) {
                return eM(t, n, e, r);
              },
      },
    );
  })();
  function eM(e, t, r, n) {
    return {
      toString() {
        let l = B(r, n),
          u = i(t + o(JSON.stringify([t, l])));
        return (
          ("function" == typeof e ? e : ek)(
            G({ [`@keyframes ${u}`]: B(r, n) }),
          ),
          u
        );
      },
    };
  }
  function eC(e, t = ek) {
    let r = t.snapshot(),
      n = { html: eE(e, t), css: eA(t.target) };
    return r(), n;
  }
  function eE(e, t = ek) {
    let r = "",
      n = 0;
    return (
      !(function (e, t) {
        let r = 1,
          n = 0,
          i = "",
          o = "",
          l = (l) => {
            5 == r && "class" == o && !1 === t(n, l, i) && (e = "");
          };
        for (let u = 0; u < e.length; u++) {
          let s = e[u];
          1 == r
            ? "<" == s && (r = "!--" == e.substr(u + 1, 3) ? 4 : 3)
            : 4 == r
            ? ">" == s && "--" == e.slice(u - 2, u) && (r = 1)
            : i
            ? s == i && "\\" != e[u - 1] && (l(u), (r = 2), (i = ""))
            : '"' == s || "'" == s
            ? ((i = s), (n += 1))
            : ">" == s
            ? (l(u), (r = 1))
            : r &&
              ("=" == s
                ? ((o = e.slice(n, u)), (r = 5), (n = u + 1))
                : "/" == s && (r < 5 || ">" == e[u + 1])
                ? (l(u), (r = 0))
                : /\s/.test(s) && (l(u), (r = 2), (n = u + 1)));
        }
      })(e, (i, o, l) => {
        var u;
        let s = e.slice(i, o),
          a = t(
            ('"' == (u = l)
              ? s.replace(
                  /(=|\[)(?:&#39;|&apos;|&#x27;)|(?:&#39;|&apos;|&#x27;)(])/g,
                  "$1'$2",
                )
              : "'" == u
              ? s.replace(
                  /(=|\[)(?:&#34;|&quot;|&#x22;)|(?:&#34;|&quot;|&#x22;)(])/g,
                  '$1"$2',
                )
              : s
            ).replace(/(&#38;|&amp;|&#x26;)/g, "&"),
          );
        em(s, a) &&
          ((l = l ? "" : '"'), (r += e.slice(n, i) + l + a + l), (n = o));
      }),
      r + e.slice(n, e.length)
    );
  }
  let eR = (e, t) => ("function" == typeof e ? eN(t, e) : eN(e));
  function eN(e = {}, t) {
    let {
        label: r = "style",
        base: n,
        props: l = {},
        defaults: u,
        when: s = [],
      } = e,
      a = m({}, null == t ? void 0 : t.defaults, u),
      f = o(JSON.stringify([r, null == t ? void 0 : t.className, n, l, a, s])),
      p = h("", n || "", c.c);
    function h(e, n, i) {
      return V(
        ((t ? t.className.replace(/#.+$/, "~") : "") + r + e + f).replace(
          /[: ,()[\]]/,
          "",
        ),
        i,
        n && F(n),
      );
    }
    return Object.defineProperties(
      function (e) {
        let r, n;
        Array.isArray(e) &&
          ((r = !0),
          (e = Object.fromEntries(new URLSearchParams(e[1]).entries())));
        let i = m({}, a, e),
          o = r ? "" : (t ? t(i) + " " : "") + p;
        for (let u in l) {
          let c = l[u],
            f = i[u];
          if (f === Object(f)) {
            let d = "";
            for (let g in ((n = ""), f)) {
              let y = c[f[g]];
              y &&
                ((d += "@" + g + "-" + f[g]),
                (n += (n && " ") + ("_" == g ? y : g + ":(" + y + ")")));
            }
            n && (o += " " + h("--" + u + "-" + d, n, 402653184));
          } else (n = c[f]) && (o += " " + h("--" + u + "-" + f, n, 402653184));
        }
        return (
          s.forEach((e, t) => {
            let r = "";
            for (let l in e[0]) {
              let u = i[l];
              if (u !== Object(u) && "" + u == "" + e[0][l])
                r += (r && "_") + l + "-" + u;
              else {
                r = "";
                break;
              }
            }
            r && (n = e[1]) && (o += " " + h("-" + t + "--" + r, n, 536870912));
          }),
          o
        );
      },
      Object.getOwnPropertyDescriptors({
        className: p,
        defaults: a,
        selector: "." + i(p),
      }),
    );
  }
  return (
    (e.animation = Y),
    (e.apply = q),
    (e.arbitrary = er),
    (e.asArray = u),
    (e.auto = function (e) {
      if (document.currentScript) {
        let t = () => r.disconnect(),
          r = new MutationObserver((r) => {
            for (let { target: n } of r)
              if (n === document.body) return e(), t();
          });
        return (
          r.observe(document.documentElement, { childList: !0, subtree: !0 }), t
        );
      }
      return a;
    }),
    (e.autoDarkColor = function (e, t, { theme: r }) {
      return r(
        e,
        (t = t.replace(
          /\d+$/,
          (e) => 100 * (9 - ~~(parseInt(e, 10) / 100) || 0.5),
        )),
      );
    }),
    (e.colorFromTheme = X),
    (e.consume = eE),
    (e.css = G),
    (e.cssom = e$),
    (e.cx = function (e, ...t) {
      return n(F(I(e, t)), " ");
    }),
    (e.defineConfig = eu),
    (e.dom = ew),
    (e.escape = i),
    (e.extract = eC),
    (e.fromMatch = H),
    (e.fromTheme = Q),
    (e.getAutocompleteProvider = function (e) {
      return e[eo];
    }),
    (e.getSheet = ex),
    (e.hash = o),
    (e.identity = s),
    (e.injectGlobal = function (e, ...t) {
      ("function" == typeof this ? this : ek)(G({ "@layer base": B(e, t) }));
    }),
    (e.inline = function (e, t = {}) {
      let { tw: r = ek, minify: n = s } =
          "function" == typeof t ? { tw: t } : t,
        { html: i, css: o } = eC(e, r);
      return i.replace(
        "</head>",
        `<style data-twind>${n(o, i)}</style></head>`,
      );
    }),
    (e.install = function (e, t = !0) {
      var r;
      let n = eu(e);
      return eO(m({}, n, { hash: null != (r = n.hash) ? r : t }), () => ex(!t));
    }),
    (e.keyframes = eS),
    (e.match = function (e, t, r) {
      return [e, H(t, r)];
    }),
    (e.matchColor = function (e, t = {}, r) {
      return [e, X(t, r)];
    }),
    (e.matchTheme = function (e, t, r, n) {
      return [e, Q(t, r, n)];
    }),
    (e.mql = l),
    (e.noop = a),
    (e.normalize = ei),
    (e.observe = ev),
    (e.parse = F),
    (e.parseValue = ee),
    (e.setup = eO),
    (e.shortcut = D),
    (e.stringify = eA),
    (e.style = eR),
    (e.toCSS = et),
    (e.toColorValue = S),
    (e.tw = ek),
    (e.twind = ey),
    (e.tx = function (e, ...t) {
      return ("function" == typeof this ? this : ek)(I(e, t));
    }),
    (e.virtual = function (e) {
      let t = [];
      return {
        target: t,
        snapshot() {
          let e = [...t];
          return () => {
            t.splice(0, t.length, ...e);
          };
        },
        clear() {
          t.length = 0;
        },
        destroy() {
          this.clear();
        },
        insert(r, n, i) {
          t.splice(
            n,
            0,
            e
              ? `/*!${i.p.toString(36)},${(2 * i.o).toString(36)}${
                  i.n ? "," + i.n : ""
                }*/${r}`
              : r,
          );
        },
        resume: a,
      };
    }),
    (e.withAutocomplete = function (e) {
      return e;
    }),
    e
  );
})({}); //# sourceMappingURL=core.global.js.map
