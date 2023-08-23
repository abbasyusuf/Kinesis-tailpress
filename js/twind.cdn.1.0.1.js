var twind = (function (e) {
  "use strict";
  let t;
  function r() {
    return (r =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
        return e;
      }).apply(this, arguments);
  }
  function o() {
    return r.apply(this, arguments);
  }
  function n(e, t) {
    if (null == e) return {};
    var r,
      o,
      n = {},
      i = Object.keys(e);
    for (o = 0; o < i.length; o++)
      (r = i[o]), t.indexOf(r) >= 0 || (n[r] = e[r]);
    return n;
  }
  function i(e) {
    return [...e.v, (e.i ? "!" : "") + e.n].join(":");
  }
  let a =
    ("undefined" != typeof CSS && CSS.escape) ||
    ((e) =>
      e
        .replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&")
        .replace(/^\d/, "\\3$& "));
  function l(e) {
    for (var t = 9, r = e.length; r--; )
      t = Math.imul(t ^ e.charCodeAt(r), 1597334677);
    return "#" + ((t ^ (t >>> 9)) >>> 0).toString(36);
  }
  function s(e, t = "@media ") {
    return (
      t +
      c(e)
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
  function c(e = []) {
    return Array.isArray(e) ? e : null == e ? [] : [e];
  }
  function d(e) {
    return e;
  }
  function f() {}
  let p = {
    d: 0,
    b: 134217728,
    c: 268435456,
    a: 671088640,
    u: 805306368,
    o: 939524096,
  };
  function u(e) {
    var t;
    return (null == (t = e.match(/[-=:;]/g)) ? void 0 : t.length) || 0;
  }
  function g(e) {
    return (
      (Math.min(
        /(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(e)
          ? +RegExp.$1 / (RegExp.$2 ? 15 : 1) / 10
          : 0,
        15,
      ) <<
        22) |
      (Math.min(u(e), 15) << 18)
    );
  }
  let m = [
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
  function b({ n: e, i: t, v: r = [] }, o, n, a) {
    for (let l of (e && (e = i({ n: e, i: t, v: r })), (a = [...c(a)]), r)) {
      let d = o.theme("screens", l);
      for (let f of c((d && s(d)) || o.v(l))) {
        var p;
        a.push(f),
          (n |= d
            ? 67108864 | g(f)
            : "dark" == l
            ? 1073741824
            : "@" == f[0]
            ? g(f)
            : ((p = f),
              1 <<
                ~(
                  (/:([a-z-]+)/.test(p) && ~m.indexOf(RegExp.$1.slice(2, 7))) ||
                  -18
                )));
      }
    }
    return { n: e, p: n, r: a, i: t };
  }
  let h = new Map();
  function x(e) {
    if (e.d) {
      let t = [],
        r = w(
          e.r.reduce(
            (e, r) =>
              "@" == r[0]
                ? (t.push(r), e)
                : r
                ? w(e, (e) =>
                    w(r, (t) => {
                      let r = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(t);
                      if (r) {
                        let o = e.indexOf(r[1]);
                        return ~o
                          ? e.slice(0, o) + r[0] + e.slice(o + r[1].length)
                          : y(e, t);
                      }
                      return y(t, e);
                    }),
                  )
                : e,
            "&",
          ),
          (t) => y(t, e.n ? "." + a(e.n) : ""),
        );
      return (
        r && t.push(r.replace(/:merge\((.+?)\)/g, "$1")),
        t.reduceRight((e, t) => t + "{" + e + "}", e.d)
      );
    }
  }
  function w(e, t) {
    return e.replace(
      / *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g,
      (e, r, o) => t(r) + o,
    );
  }
  function y(e, t) {
    return e.replace(/&/g, t);
  }
  let v = new Intl.Collator("en", { numeric: !0 });
  function k(e, t) {
    for (var r = 0, o = e.length; r < o; ) {
      let n = (o + r) >> 1;
      0 >= $(e[n], t) ? (r = n + 1) : (o = n);
    }
    return o;
  }
  function $(e, t) {
    let r = e.p & p.o;
    return r == (t.p & p.o) && (r == p.b || r == p.o)
      ? 0
      : e.p - t.p || e.o - t.o || v.compare(e.n, t.n);
  }
  function S(e, t) {
    return Math.round(parseInt(e, 16) * t);
  }
  function C(e, t = {}) {
    if ("function" == typeof e) return e(t);
    let { opacityValue: r = "1", opacityVariable: o } = t,
      n = o ? `var(${o})` : r;
    if (e.includes("<alpha-value>")) return e.replace("<alpha-value>", n);
    if ("#" == e[0] && (4 == e.length || 7 == e.length)) {
      let i = (e.length - 1) / 3,
        a = [17, 1, 0.062272][i - 1];
      return `rgba(${[
        S(e.substr(1, i), a),
        S(e.substr(1 + i, i), a),
        S(e.substr(1 + 2 * i, i), a),
        n,
      ]})`;
    }
    return "1" == n
      ? e
      : "0" == n
      ? "#0000"
      : e.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${n})`);
  }
  function A(e, t, r, o, n = []) {
    return (function e(t, { n: r, p: o, r: n = [], i: i }, a) {
      let d = [],
        f = "",
        m = 0,
        b = 0;
      for (let h in t || {}) {
        var w, y;
        let v = t[h];
        if ("@" == h[0]) {
          if (!v) continue;
          if ("a" == h[1]) {
            d.push(...T(r, o, D("" + v), a, o, n, i, !0));
            continue;
          }
          if ("l" == h[1]) {
            for (let k of c(v))
              d.push(
                ...e(
                  k,
                  { n: r, p: ((w = p[h[7]]), (o & ~p.o) | w), r: n, i: i },
                  a,
                ),
              );
            continue;
          }
          if ("i" == h[1]) {
            d.push(
              ...c(v).map((e) => ({ p: -1, o: 0, r: [], d: h + " " + e })),
            );
            continue;
          }
          if ("k" == h[1]) {
            d.push({
              p: p.d,
              o: 0,
              r: [h],
              d: e(v, { p: p.d }, a).map(x).join(""),
            });
            continue;
          }
          if ("f" == h[1]) {
            d.push(
              ...c(v).map((t) => ({
                p: p.d,
                o: 0,
                r: [h],
                d: e(t, { p: p.d }, a).map(x).join(""),
              })),
            );
            continue;
          }
        }
        if ("object" != typeof v || Array.isArray(v))
          "label" == h && v
            ? (r = v + l(JSON.stringify([o, i, t])))
            : (v || 0 === v) &&
              ((h = h.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase())),
              (b += 1),
              (m = Math.max(
                m,
                "-" == (y = h)[0]
                  ? 0
                  : u(y) +
                      (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7}$)|([fl].{5}l|g.{8}$|pl))/.test(
                        y,
                      )
                        ? +!!RegExp.$1 || -!!RegExp.$2
                        : 0) +
                      1,
              )),
              (f +=
                (f ? ";" : "") +
                c(v)
                  .map((e) =>
                    a.s(h, z("" + e, a.theme) + (i ? " !important" : "")),
                  )
                  .join(";")));
        else if ("@" == h[0] || h.includes("&")) {
          let S = o;
          "@" == h[0] &&
            ((h = h.replace(/\bscreen\(([^)]+)\)/g, (e, t) => {
              let r = a.theme("screens", t);
              return r ? ((S |= 67108864), s(r, "")) : e;
            })),
            (S |= g(h))),
            d.push(...e(v, { n: r, p: S, r: [...n, h], i: i }, a));
        } else d.push(...e(v, { p: o, r: [...n, h] }, a));
      }
      return (
        d.unshift({
          n: r,
          p: o,
          o: Math.max(0, 15 - b) + 1.5 * Math.min(m || 15, 15),
          r: n,
          d: f,
        }),
        d.sort($)
      );
    })(e, b(t, r, o, n), r);
  }
  function z(e, t) {
    return e.replace(
      /theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g,
      (e, r, o, n, i) => {
        let a = t(o, i);
        return "function" == typeof a && /color|fill|stroke/i.test(o)
          ? C(a)
          : "" + a;
      },
    );
  }
  function O(e, t) {
    let r;
    let n = [];
    for (let i of e)
      i.d && i.n
        ? (null == r ? void 0 : r.p) == i.p && "" + r.r == "" + i.r
          ? ((r.c = [r.c, i.c].filter(Boolean).join(" ")),
            (r.d = r.d + ";" + i.d))
          : n.push((r = o({}, i, { n: i.n && t })))
        : n.push(o({}, i, { n: i.n && t }));
    return n;
  }
  function j(e, t, r = p.u, n, a) {
    let l = [];
    for (let s of e)
      for (let d of (function (e, t, r, n, a) {
        var l;
        e = o({}, e, { i: e.i || a });
        let s = (function (e, t) {
          let r = h.get(e.n);
          return r ? r(e, t) : t.r(e.n, "dark" == e.v[0]);
        })(e, t);
        return s
          ? "string" == typeof s
            ? (({ r: n, p: r } = b(e, t, r, n)), O(j(D(s), t, r, n, e.i), e.n))
            : Array.isArray(s)
            ? s.map((e) => {
                var t, i;
                return o({ o: 0 }, e, {
                  r: [...c(n), ...c(e.r)],
                  p: ((t = r), (i = null != (l = e.p) ? l : r), (t & ~p.o) | i),
                });
              })
            : A(s, e, t, r, n)
          : [{ c: i(e), p: 0, o: 0, r: [] }];
      })(s, t, r, n, a))
        l.splice(k(l, d), 0, d);
    return l;
  }
  function T(e, t, r, n, i, a, l, s) {
    return O(
      (s ? r.flatMap((e) => j([e], n, i, a, l)) : j(r, n, i, a, l)).map((e) =>
        e.p & p.o && (e.n || t == p.b)
          ? o({}, e, { p: (e.p & ~p.o) | t, o: 0 })
          : e,
      ),
      e,
    );
  }
  function F(e, t) {
    if ("(" != e[e.length - 1]) {
      let r = [],
        o = !1,
        n = !1,
        i = "";
      for (let a of e)
        if (!("(" == a || /[~@]$/.test(a))) {
          if (("!" == a[0] && ((a = a.slice(1)), (o = !o)), a.endsWith(":"))) {
            r["dark:" == a ? "unshift" : "push"](a.slice(0, -1));
            continue;
          }
          "-" == a[0] && ((a = a.slice(1)), (n = !n)),
            a.endsWith("-") && (a = a.slice(0, -1)),
            a && "&" != a && (i += (i && "-") + a);
        }
      i && (n && (i = "-" + i), t[0].push({ n: i, v: r.filter(E), i: o }));
    }
  }
  function E(e, t, r) {
    return r.indexOf(e) == t;
  }
  let R = new Map();
  function D(e) {
    let t = R.get(e);
    if (!t) {
      let r = [],
        o = [[]],
        n = 0,
        a = 0,
        s = null,
        c = 0,
        d = (t, i = 0) => {
          n != c && (r.push(e.slice(n, c + i)), t && F(r, o)), (n = c + 1);
        };
      for (; c < e.length; c++) {
        let f = e[c];
        if (a) "\\" != e[c - 1] && (a += +("[" == f) || -("]" == f));
        else if ("[" == f) a += 1;
        else if (s)
          "\\" != e[c - 1] &&
            s.test(e.slice(c)) &&
            ((s = null), (n = c + RegExp.lastMatch.length));
        else if (
          "/" == f &&
          "\\" != e[c - 1] &&
          ("*" == e[c + 1] || "/" == e[c + 1])
        )
          s = "*" == e[c + 1] ? /^\*\// : /^[\r\n]/;
        else if ("(" == f) d(), r.push(f);
        else if (":" == f) ":" != e[c + 1] && d(!1, 1);
        else if (/[\s,)]/.test(f)) {
          d(!0);
          let u = r.lastIndexOf("(");
          if (")" == f) {
            let g = r[u - 1];
            if (/[~@]$/.test(g)) {
              let m = o.shift();
              (r.length = u), F([...r, "#"], o);
              let { v: x } = o[0].pop();
              for (let w of m)
                w.v.splice(+("dark" == w.v[0]) - +("dark" == x[0]), x.length);
              F(
                [
                  ...r,
                  (function (e, t, r, o) {
                    var n;
                    return (
                      (n = (e, n) => {
                        let { n: i, p: a, r: l, i: s } = b(e, n, t);
                        return r && T(i, t, r, n, a, l, s, o);
                      }),
                      h.set(e, n),
                      e
                    );
                  })(
                    g.length > 1
                      ? g.slice(0, -1) + l(JSON.stringify([g, m]))
                      : g +
                          "(" +
                          (function (e, t = ",") {
                            return e.map(i).join(t);
                          })(m) +
                          ")",
                    p.a,
                    m,
                    /@$/.test(g),
                  ),
                ],
                o,
              );
            }
            u = r.lastIndexOf("(", u - 1);
          }
          r.length = u + 1;
        } else /[~@]/.test(f) && "(" == e[c + 1] && o.unshift([]);
      }
      d(!0), R.set(e, (t = o[0]));
    }
    return t;
  }
  function W(e) {
    var { presets: t = [] } = e,
      r = n(e, ["presets"]);
    let i = {
      preflight: !1 !== r.preflight && [],
      darkMode: void 0,
      darkColor: void 0,
      theme: {},
      variants: c(r.variants),
      rules: c(r.rules),
      ignorelist: c(r.ignorelist),
      hash: r.hash,
      stringify: r.stringify || M,
    };
    for (let a of c([
      ...t,
      {
        darkMode: r.darkMode,
        darkColor: r.darkColor,
        preflight: !1 !== r.preflight && c(r.preflight),
        theme: r.theme,
        hash: r.hash,
        stringify: r.stringify,
      },
    ])) {
      let {
        preflight: l,
        darkMode: s = i.darkMode,
        darkColor: d = i.darkColor,
        theme: f,
        variants: p,
        rules: u,
        ignorelist: g,
        hash: m = i.hash,
        stringify: b = i.stringify,
      } = "function" == typeof a ? a(i) : a;
      i = {
        preflight: !1 !== i.preflight && !1 !== l && [...i.preflight, ...c(l)],
        darkMode: s,
        darkColor: d,
        theme: o({}, i.theme, f, {
          extend: o({}, i.theme.extend, null == f ? void 0 : f.extend),
        }),
        variants: [...i.variants, ...c(p)],
        rules: [...i.rules, ...c(u)],
        ignorelist: [...i.ignorelist, ...c(g)],
        hash: m,
        stringify: b,
      };
    }
    return i;
  }
  function M(e, t) {
    return e + ":" + t;
  }
  function L(e, t, r) {
    return [e, V(t, r)];
  }
  function V(e, t) {
    return "function" == typeof e
      ? e
      : "string" == typeof e && /^[\w-]+$/.test(e)
      ? (r, o) => ({ [e]: t ? t(r, o) : U(r, 1) })
      : (t) => e || { [t[1]]: U(t, 2) };
  }
  function U(e, t, r = e.slice(t).find(Boolean) || e.$$ || e.input) {
    return "-" == e.input[0] ? `calc(${r} * -1)` : r;
  }
  function I(e, t, r, o) {
    return [
      e,
      (function (e, t, r) {
        let o =
          "string" == typeof t
            ? (e, o) => ({ [t]: r ? r(e, o) : e._ })
            : t || (({ 1: e, _: t }, r, o) => ({ [e || o]: t }));
        return (t, r) => {
          var n;
          let i = P(e || t[1]),
            a = null != (n = r.theme(i, t.$$)) ? n : _(t.$$, i, r);
          if (null != a) return (t._ = U(t, 0, a)), o(t, r, i);
        };
      })(t, r, o),
    ];
  }
  function N(e, t = {}, r) {
    return [
      e,
      (function (e = {}, t) {
        return (r, o) => {
          let { section: n = P(r[0]).replace("-", "") + "Color" } = e;
          if (!/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/.test(r.$$)) return;
          let { $1: i, $2: a } = RegExp,
            l = o.theme(n, i) || _(i, n, o);
          if (!l || "object" == typeof l) return;
          let {
              opacityVariable: s = `--tw-${r[0].replace(/-$/, "")}-opacity`,
              opacitySection: c = n.replace("Color", "Opacity"),
              property: d = n,
              selector: f,
            } = e,
            p = o.theme(c, a || "DEFAULT") || (a && _(a, c, o)),
            u =
              t ||
              (({ _: e }) => {
                let t = B(d, e);
                return f ? { [f]: t } : t;
              });
          r._ = {
            value: C(l, {
              opacityVariable: s || void 0,
              opacityValue: p || void 0,
            }),
            color: (e) => C(l, e),
            opacityVariable: s || void 0,
            opacityValue: p || void 0,
          };
          let g = u(r, o);
          if (!r.dark) {
            let m = o.d(n, i, l);
            m &&
              m !== l &&
              ((r._ = {
                value: C(m, {
                  opacityVariable: s || void 0,
                  opacityValue: p || "1",
                }),
                color: (e) => C(m, e),
                opacityVariable: s || void 0,
                opacityValue: p || void 0,
              }),
              (g = { "&": g, [o.v("dark")]: u(r, o) }));
          }
          return g;
        };
      })(t, r),
    ];
  }
  function B(e, t) {
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
  function _(e, t, r) {
    if (
      "[" == e[0] &&
      "]" == e.slice(-1) &&
      ((e = H(z(e.slice(1, -1), r.theme))),
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
  function P(e) {
    return e.replace(/-./g, (e) => e[1].toUpperCase());
  }
  function H(e) {
    return e.includes("url(")
      ? e.replace(
          /(.*?)(url\(.*?\))(.*?)/g,
          (e, t = "", r, o = "") => H(t) + r + H(o),
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
  function q(e, t, r, o, n, i) {
    for (let a of t) {
      let l = r.get(a);
      l || r.set(a, (l = o(a)));
      let s = l(e, n, i);
      if (s) return s;
    }
  }
  function G(e) {
    var t;
    return J(e[0], "function" == typeof (t = e[1]) ? t : () => t);
  }
  function Y(e) {
    var t, r;
    return Array.isArray(e) ? J(e[0], V(e[1], e[2])) : J(e, V(t, r));
  }
  function J(e, t) {
    return X(e, (e, r, o, n) => {
      let i = r.exec(e);
      if (i) return (i.$$ = e.slice(i[0].length)), (i.dark = n), t(i, o);
    });
  }
  function X(e, t) {
    let r = c(e).map(Z);
    return (e, o, n) => {
      for (let i of r) {
        let a = t(e, i, o, n);
        if (a) return a;
      }
    };
  }
  function Z(e) {
    return "string" == typeof e
      ? RegExp("^" + e + (e.includes("$") || "-" == e.slice(-1) ? "" : "$"))
      : e;
  }
  function K(e, t) {
    return e.replace(
      /--(tw(?:-[\w-]+)?)\b/g,
      (e, r) => "--" + t(r).replace("#", ""),
    );
  }
  function Q(e) {
    let t = document.querySelector(e || "style[data-twind]");
    return (
      (t && "STYLE" == t.tagName) ||
        (((t = document.createElement("style")).dataset.twind = ""),
        document.head.prepend(t)),
      t
    );
  }
  function ee(e, t) {
    let r = e
      ? (function (e) {
          let t = e && "string" != typeof e ? e : Q(e);
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
              t.insertBefore(
                document.createTextNode(e),
                t.childNodes[r] || null,
              );
            },
            resume: f,
          };
        })()
      : (function (e) {
          let t = (null == e ? void 0 : e.cssRules)
            ? e
            : (e && "string" != typeof e ? e : Q(e)).sheet;
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
              } catch (o) {
                t.insertRule(":root{}", r), /:-[mwo]/.test(e);
              }
            },
            resume: f,
          };
        })();
    return t || (r.resume = et), r;
  }
  function et(e, t) {
    var r, o;
    let n =
        ((r = this.target).ownerNode || r).textContent ||
        (r.cssRules ? Array.from(r.cssRules, (e) => e.cssText) : c(r)).join(""),
      i = /\/\*!([\da-z]+),([\da-z]+)(?:,(.+?))?\*\//g;
    if (i.test(n)) {
      let a;
      for (let l of ((i.lastIndex = 0),
      this.clear(),
      document.querySelectorAll("[class]")))
        e(l.getAttribute("class"));
      for (
        ;
        (o = i.exec(n)),
          a &&
            t(n.slice(a.index + a[0].length, null == o ? void 0 : o.index), {
              p: parseInt(a[1], 36),
              o: parseInt(a[2], 36) / 2,
              n: a[3],
            }),
          (a = o);

      );
    }
  }
  let er = new Proxy(f, {
    apply: (e, r, o) => t(o[0]),
    get(e, r) {
      let o = t[r];
      return "function" == typeof o
        ? function () {
            return o.apply(t, arguments);
          }
        : o;
    },
  });
  var eo = new Map([
    ["align-self", "-ms-grid-row-align"],
    ["color-adjust", "-webkit-print-color-adjust"],
    ["column-gap", "grid-column-gap"],
    ["forced-color-adjust", "-ms-high-contrast-adjust"],
    ["gap", "grid-gap"],
    ["grid-template-columns", "-ms-grid-columns"],
    ["grid-template-rows", "-ms-grid-rows"],
    ["justify-self", "-ms-grid-column-align"],
    ["margin-inline-end", "-webkit-margin-end"],
    ["margin-inline-start", "-webkit-margin-start"],
    ["mask-border", "-webkit-mask-box-image"],
    ["mask-border-outset", "-webkit-mask-box-image-outset"],
    ["mask-border-slice", "-webkit-mask-box-image-slice"],
    ["mask-border-source", "-webkit-mask-box-image-source"],
    ["mask-border-repeat", "-webkit-mask-box-image-repeat"],
    ["mask-border-width", "-webkit-mask-box-image-width"],
    ["overflow-wrap", "word-wrap"],
    ["padding-inline-end", "-webkit-padding-end"],
    ["padding-inline-start", "-webkit-padding-start"],
    ["print-color-adjust", "color-adjust"],
    ["row-gap", "grid-row-gap"],
    ["scroll-margin-bottom", "scroll-snap-margin-bottom"],
    ["scroll-margin-left", "scroll-snap-margin-left"],
    ["scroll-margin-right", "scroll-snap-margin-right"],
    ["scroll-margin-top", "scroll-snap-margin-top"],
    ["scroll-margin", "scroll-snap-margin"],
    ["text-combine-upright", "-ms-text-combine-horizontal"],
  ]);
  let en = [
      ["-webkit-", 1],
      ["-moz-", 2],
      ["-ms-", 4],
    ],
    ei = {
      __proto__: null,
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
      },
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
      },
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
      },
    },
    ea = {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: ei,
      columns: {
        auto: "auto",
        "3xs": "16rem",
        "2xs": "18rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      spacing: o(
        { px: "1px", 0: "0px" },
        ec(4, "rem", 4, 0.5, 0.5),
        ec(12, "rem", 4, 5),
        { 14: "3.5rem" },
        ec(64, "rem", 4, 16, 4),
        { 72: "18rem", 80: "20rem", 96: "24rem" },
      ),
      durations: {
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms",
      },
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0,0,0.2,1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        bounce: "bounce 1s infinite",
      },
      aspectRatio: { auto: "auto", square: "1/1", video: "16/9" },
      backdropBlur: ed("blur"),
      backdropBrightness: ed("brightness"),
      backdropContrast: ed("contrast"),
      backdropGrayscale: ed("grayscale"),
      backdropHueRotate: ed("hueRotate"),
      backdropInvert: ed("invert"),
      backdropOpacity: ed("opacity"),
      backdropSaturate: ed("saturate"),
      backdropSepia: ed("sepia"),
      backgroundColor: ed("colors"),
      backgroundImage: { none: "none" },
      backgroundOpacity: ed("opacity"),
      backgroundSize: { auto: "auto", cover: "cover", contain: "contain" },
      blur: {
        none: "none",
        0: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      brightness: o({}, ec(200, "", 100, 0, 50), ec(110, "", 100, 90, 5), {
        75: "0.75",
        125: "1.25",
      }),
      borderColor: ({ theme: e }) =>
        o({ DEFAULT: e("colors.gray.200", "currentColor") }, e("colors")),
      borderOpacity: ed("opacity"),
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "1/2": "50%",
        full: "9999px",
      },
      borderSpacing: ed("spacing"),
      borderWidth: o({ DEFAULT: "1px" }, es(8, "px")),
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
        "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
        inner: "inset 0 2px 4px 0 rgba(0,0,0,0.05)",
        none: "0 0 #0000",
      },
      boxShadowColor: ed("colors"),
      caretColor: ed("colors"),
      accentColor: ({ theme: e }) => o({ auto: "auto" }, e("colors")),
      contrast: o({}, ec(200, "", 100, 0, 50), { 75: "0.75", 125: "1.25" }),
      content: { none: "none" },
      divideColor: ed("borderColor"),
      divideOpacity: ed("borderOpacity"),
      divideWidth: ed("borderWidth"),
      dropShadow: {
        sm: "0 1px 1px rgba(0,0,0,0.05)",
        DEFAULT: ["0 1px 2px rgba(0,0,0,0.1)", "0 1px 1px rgba(0,0,0,0.06)"],
        md: ["0 4px 3px rgba(0,0,0,0.07)", "0 2px 2px rgba(0,0,0,0.06)"],
        lg: ["0 10px 8px rgba(0,0,0,0.04)", "0 4px 3px rgba(0,0,0,0.1)"],
        xl: ["0 20px 13px rgba(0,0,0,0.03)", "0 8px 5px rgba(0,0,0,0.08)"],
        "2xl": "0 25px 25px rgba(0,0,0,0.15)",
        none: "0 0 #0000",
      },
      fill: ed("colors"),
      grayscale: { DEFAULT: "100%", 0: "0" },
      hueRotate: {
        0: "0deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        90: "90deg",
        180: "180deg",
      },
      invert: { DEFAULT: "100%", 0: "0" },
      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        none: "none",
      },
      flexBasis: ({ theme: e }) =>
        o({}, e("spacing"), el(2, 6), el(12, 12), {
          auto: "auto",
          full: "100%",
        }),
      flexGrow: { DEFAULT: 1, 0: 0 },
      flexShrink: { DEFAULT: 1, 0: 0 },
      fontFamily: {
        sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'.split(
          ",",
        ),
        serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'.split(
          ",",
        ),
        mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'.split(
          ",",
        ),
      },
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.75rem"],
        "2xl": ["1.5rem", "2rem"],
        "3xl": ["1.875rem", "2.25rem"],
        "4xl": ["2.25rem", "2.5rem"],
        "5xl": ["3rem", "1"],
        "6xl": ["3.75rem", "1"],
        "7xl": ["4.5rem", "1"],
        "8xl": ["6rem", "1"],
        "9xl": ["8rem", "1"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      gap: ed("spacing"),
      gradientColorStops: ed("colors"),
      gridAutoColumns: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)",
      },
      gridAutoRows: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)",
      },
      gridColumn: { auto: "auto", "span-full": "1 / -1" },
      gridRow: { auto: "auto", "span-full": "1 / -1" },
      gridTemplateColumns: { none: "none" },
      gridTemplateRows: { none: "none" },
      height: ({ theme: e }) =>
        o({}, e("spacing"), el(2, 6), {
          min: "min-content",
          max: "max-content",
          fit: "fit-content",
          auto: "auto",
          full: "100%",
          screen: "100vh",
        }),
      inset: ({ theme: e }) =>
        o({}, e("spacing"), el(2, 4), { auto: "auto", full: "100%" }),
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        ping: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%,100%": { transform: "scale(2)", opacity: "0" },
        },
        pulse: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".5" } },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: o({}, ec(10, "rem", 4, 3), {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      }),
      margin: ({ theme: e }) => o({ auto: "auto" }, e("spacing")),
      maxHeight: ({ theme: e }) =>
        o(
          {
            full: "100%",
            min: "min-content",
            max: "max-content",
            fit: "fit-content",
            screen: "100vh",
          },
          e("spacing"),
        ),
      maxWidth: ({ theme: e, breakpoints: t }) =>
        o({}, t(e("screens")), {
          none: "none",
          0: "0rem",
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
          "7xl": "80rem",
          full: "100%",
          min: "min-content",
          max: "max-content",
          fit: "fit-content",
          prose: "65ch",
        }),
      minHeight: {
        0: "0px",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        screen: "100vh",
      },
      minWidth: {
        0: "0px",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      },
      opacity: o({}, ec(100, "", 100, 0, 10), {
        5: "0.05",
        25: "0.25",
        75: "0.75",
        95: "0.95",
      }),
      order: { first: "-9999", last: "9999", none: "0" },
      padding: ed("spacing"),
      placeholderColor: ed("colors"),
      placeholderOpacity: ed("opacity"),
      outlineColor: ed("colors"),
      outlineOffset: es(8, "px"),
      outlineWidth: es(8, "px"),
      ringColor: ({ theme: e }) =>
        o({}, e("colors"), { DEFAULT: e("colors.blue.500", "#3b82f6") }),
      ringOffsetColor: ed("colors"),
      ringOffsetWidth: es(8, "px"),
      ringOpacity: ({ theme: e }) => o({}, e("opacity"), { DEFAULT: "0.5" }),
      ringWidth: o({ DEFAULT: "3px" }, es(8, "px")),
      rotate: o({}, es(2, "deg"), es(12, "deg", 3), es(180, "deg", 45)),
      saturate: ec(200, "", 100, 0, 50),
      scale: o({}, ec(150, "", 100, 0, 50), ec(110, "", 100, 90, 5), {
        75: "0.75",
        125: "1.25",
      }),
      scrollMargin: ed("spacing"),
      scrollPadding: ed("spacing"),
      sepia: { 0: "0", DEFAULT: "100%" },
      skew: o({}, es(2, "deg"), es(12, "deg", 3)),
      space: ed("spacing"),
      stroke: ed("colors"),
      strokeWidth: ec(2),
      textColor: ed("colors"),
      textDecorationColor: ed("colors"),
      textDecorationThickness: o(
        { "from-font": "from-font", auto: "auto" },
        es(8, "px"),
      ),
      textUnderlineOffset: o({ auto: "auto" }, es(8, "px")),
      textIndent: ed("spacing"),
      textOpacity: ed("opacity"),
      transitionDuration: ({ theme: e }) =>
        o({}, e("durations"), { DEFAULT: "150ms" }),
      transitionDelay: ed("durations"),
      transitionProperty: {
        none: "none",
        all: "all",
        DEFAULT:
          "color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter",
        colors:
          "color,background-color,border-color,text-decoration-color,fill,stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
        linear: "linear",
        in: "cubic-bezier(0.4,0,1,1)",
        out: "cubic-bezier(0,0,0.2,1)",
        "in-out": "cubic-bezier(0.4,0,0.2,1)",
      },
      translate: ({ theme: e }) =>
        o({}, e("spacing"), el(2, 4), { full: "100%" }),
      width: ({ theme: e }) =>
        o(
          {
            min: "min-content",
            max: "max-content",
            fit: "fit-content",
            screen: "100vw",
          },
          e("flexBasis"),
        ),
      willChange: { scroll: "scroll-position" },
      zIndex: o({}, ec(50, "", 1, 0, 10), { auto: "auto" }),
    };
  function el(e, t) {
    let r = {};
    do
      for (var o = 1; o < e; o++)
        r[`${o}/${e}`] = Number(((o / e) * 100).toFixed(6)) + "%";
    while (++e <= t);
    return r;
  }
  function es(e, t, r = 0) {
    let o = {};
    for (; r <= e; r = 2 * r || 1) o[r] = r + t;
    return o;
  }
  function ec(e, t = "", r = 1, o = 0, n = 1, i = {}) {
    for (; o <= e; o += n) i[o] = o / r + t;
    return i;
  }
  function ed(e) {
    return ({ theme: t }) => t(e);
  }
  let ef = {
      "*,::before,::after": {
        boxSizing: "border-box",
        borderWidth: "0",
        borderStyle: "solid",
        borderColor: "theme(borderColor.DEFAULT, currentColor)",
      },
      "::before,::after": { "--tw-content": "''" },
      html: {
        lineHeight: 1.5,
        WebkitTextSizeAdjust: "100%",
        MozTabSize: "4",
        tabSize: 4,
        fontFamily: `theme(fontFamily.sans, ${ea.fontFamily.sans})`,
      },
      body: { margin: "0", lineHeight: "inherit" },
      hr: { height: "0", color: "inherit", borderTopWidth: "1px" },
      "abbr:where([title])": { textDecoration: "underline dotted" },
      "h1,h2,h3,h4,h5,h6": { fontSize: "inherit", fontWeight: "inherit" },
      a: { color: "inherit", textDecoration: "inherit" },
      "b,strong": { fontWeight: "bolder" },
      "code,kbd,samp,pre": {
        fontFamily: `theme(fontFamily.mono, ${ea.fontFamily.mono})`,
        fontSize: "1em",
      },
      small: { fontSize: "80%" },
      "sub,sup": {
        fontSize: "75%",
        lineHeight: 0,
        position: "relative",
        verticalAlign: "baseline",
      },
      sub: { bottom: "-0.25em" },
      sup: { top: "-0.5em" },
      table: {
        textIndent: "0",
        borderColor: "inherit",
        borderCollapse: "collapse",
      },
      "button,input,optgroup,select,textarea": {
        fontFamily: "inherit",
        fontSize: "100%",
        lineHeight: "inherit",
        color: "inherit",
        margin: "0",
        padding: "0",
      },
      "button,select": { textTransform: "none" },
      "button,[type='button'],[type='reset'],[type='submit']": {
        WebkitAppearance: "button",
        backgroundColor: "transparent",
        backgroundImage: "none",
      },
      ":-moz-focusring": { outline: "auto" },
      ":-moz-ui-invalid": { boxShadow: "none" },
      progress: { verticalAlign: "baseline" },
      "::-webkit-inner-spin-button,::-webkit-outer-spin-button": {
        height: "auto",
      },
      "[type='search']": {
        WebkitAppearance: "textfield",
        outlineOffset: "-2px",
      },
      "::-webkit-search-decoration": { WebkitAppearance: "none" },
      "::-webkit-file-upload-button": {
        WebkitAppearance: "button",
        font: "inherit",
      },
      summary: { display: "list-item" },
      "blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre": { margin: "0" },
      fieldset: { margin: "0", padding: "0" },
      legend: { padding: "0" },
      "ol,ul,menu": { listStyle: "none", margin: "0", padding: "0" },
      textarea: { resize: "vertical" },
      "input::placeholder,textarea::placeholder": {
        opacity: 1,
        color: "theme(colors.gray.400, #9ca3af)",
      },
      'button,[role="button"]': { cursor: "pointer" },
      ":disabled": { cursor: "default" },
      "img,svg,video,canvas,audio,iframe,embed,object": {
        display: "block",
        verticalAlign: "middle",
      },
      "img,video": { maxWidth: "100%", height: "auto" },
      "[hidden]": { display: "none" },
    },
    ep = [
      L("\\[([-\\w]+):(.+)]", ({ 1: e, 2: t }, r) => ({
        "@layer overrides": { "&": { [e]: _(`[${t}]`, e, r) } },
      })),
      L("(group|peer)(~[^-[]+)?", ({ input: e }, { h: t }) => [{ c: t(e) }]),
      I("aspect-", "aspectRatio"),
      L("container", (e, { theme: t }) => {
        let {
            screens: r = t("screens"),
            center: n,
            padding: i,
          } = t("container"),
          a = o(
            {
              width: "100%",
              marginRight: n && "auto",
              marginLeft: n && "auto",
            },
            d("xs"),
          );
        for (let l in r) {
          let c = r[l];
          "string" == typeof c && (a[s(c)] = { "&": o({ maxWidth: c }, d(l)) });
        }
        return a;
        function d(e) {
          let t = i && ("string" == typeof i ? i : i[e] || i.DEFAULT);
          if (t) return { paddingRight: t, paddingLeft: t };
        }
      }),
      I("content-", "content", ({ _: e }) => ({
        "--tw-content": e,
        content: "var(--tw-content)",
      })),
      L("(?:box-)?decoration-(slice|clone)", "boxDecorationBreak"),
      L("box-(border|content)", "boxSizing", ({ 1: e }) => e + "-box"),
      L("hidden", { display: "none" }),
      L("table-(auto|fixed)", "tableLayout"),
      L(
        [
          "(block|flex|table|grid|inline|contents|flow-root|list-item)",
          "(inline-(block|flex|table|grid))",
          "(table-(caption|cell|column|row|(column|row|footer|header)-group))",
        ],
        "display",
      ),
      "(float)-(left|right|none)",
      "(clear)-(left|right|none|both)",
      "(overflow(?:-[xy])?)-(auto|hidden|clip|visible|scroll)",
      "(isolation)-(auto)",
      L("isolate", "isolation"),
      L("object-(contain|cover|fill|none|scale-down)", "objectFit"),
      I("object-", "objectPosition"),
      L(
        "object-(top|bottom|center|(left|right)(-(top|bottom))?)",
        "objectPosition",
        eu,
      ),
      L("overscroll(-[xy])?-(auto|contain|none)", ({ 1: e = "", 2: t }) => ({
        ["overscroll-behavior" + e]: t,
      })),
      L("(static|fixed|absolute|relative|sticky)", "position"),
      I("-?inset(-[xy])?(?:$|-)", "inset", ({ 1: e, _: t }) => ({
        top: "-x" != e && t,
        right: "-y" != e && t,
        bottom: "-x" != e && t,
        left: "-y" != e && t,
      })),
      I("-?(top|bottom|left|right)(?:$|-)", "inset"),
      L("visible", "visibility"),
      L("invisible", { visibility: "hidden" }),
      I("-?z-", "zIndex"),
      L("flex-((row|col)(-reverse)?)", "flexDirection", eg),
      L("flex-(wrap|wrap-reverse|nowrap)", "flexWrap"),
      I("(flex-(?:grow|shrink))(?:$|-)"),
      I("(flex)-"),
      I("grow(?:$|-)", "flexGrow"),
      I("shrink(?:$|-)", "flexShrink"),
      I("basis-", "flexBasis"),
      I("-?(order)-"),
      "-?(order)-(\\d+)",
      I("grid-cols-", "gridTemplateColumns"),
      L("grid-cols-(\\d+)", "gridTemplateColumns", eS),
      I("col-", "gridColumn"),
      L("col-(span)-(\\d+)", "gridColumn", e$),
      I("col-start-", "gridColumnStart"),
      L("col-start-(auto|\\d+)", "gridColumnStart"),
      I("col-end-", "gridColumnEnd"),
      L("col-end-(auto|\\d+)", "gridColumnEnd"),
      I("grid-rows-", "gridTemplateRows"),
      L("grid-rows-(\\d+)", "gridTemplateRows", eS),
      I("row-", "gridRow"),
      L("row-(span)-(\\d+)", "gridRow", e$),
      I("row-start-", "gridRowStart"),
      L("row-start-(auto|\\d+)", "gridRowStart"),
      I("row-end-", "gridRowEnd"),
      L("row-end-(auto|\\d+)", "gridRowEnd"),
      L("grid-flow-((row|col)(-dense)?)", "gridAutoFlow", (e) => eu(eg(e))),
      L("grid-flow-(dense)", "gridAutoFlow"),
      I("auto-cols-", "gridAutoColumns"),
      I("auto-rows-", "gridAutoRows"),
      I("gap-x(?:$|-)", "gap", "columnGap"),
      I("gap-y(?:$|-)", "gap", "rowGap"),
      I("gap(?:$|-)", "gap"),
      "(justify-(?:items|self))-",
      L("justify-", "justifyContent", eh),
      L("(content|items|self)-", (e) => ({ ["align-" + e[1]]: eh(e) })),
      L("(place-(content|items|self))-", ({ 1: e, $$: t }) => ({
        [e]: ("wun".includes(t[3]) ? "space-" : "") + t,
      })),
      I("p([xytrbl])?(?:$|-)", "padding", ex("padding")),
      I("-?m([xytrbl])?(?:$|-)", "margin", ex("margin")),
      I("-?space-(x|y)(?:$|-)", "space", ({ 1: e, _: t }) => ({
        "&>:not([hidden])~:not([hidden])": {
          [`--tw-space-${e}-reverse`]: "0",
          ["margin-" +
          { y: "top", x: "left" }[
            e
          ]]: `calc(${t} * calc(1 - var(--tw-space-${e}-reverse)))`,
          ["margin-" +
          { y: "bottom", x: "right" }[
            e
          ]]: `calc(${t} * var(--tw-space-${e}-reverse))`,
        },
      })),
      L("space-(x|y)-reverse", ({ 1: e }) => ({
        "&>:not([hidden])~:not([hidden])": { [`--tw-space-${e}-reverse`]: "1" },
      })),
      I("w-", "width"),
      I("min-w-", "minWidth"),
      I("max-w-", "maxWidth"),
      I("h-", "height"),
      I("min-h-", "minHeight"),
      I("max-h-", "maxHeight"),
      I("font-", "fontWeight"),
      I("font-", "fontFamily", "fontFamily", eb),
      L("antialiased", {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }),
      L("subpixel-antialiased", {
        WebkitFontSmoothing: "auto",
        MozOsxFontSmoothing: "auto",
      }),
      L("italic", "fontStyle"),
      L("not-italic", { fontStyle: "normal" }),
      L(
        "(ordinal|slashed-zero|(normal|lining|oldstyle|proportional|tabular)-nums|(diagonal|stacked)-fractions)",
        ({ 1: e, 2: t = "", 3: r }) =>
          "normal" == t
            ? { fontVariantNumeric: "normal" }
            : {
                ["--tw-" +
                (r
                  ? "numeric-fraction"
                  : "pt".includes(t[0])
                  ? "numeric-spacing"
                  : t
                  ? "numeric-figure"
                  : e)]: e,
                fontVariantNumeric:
                  "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)",
                "@layer defaults": {
                  "*,::before,::after,::backdrop": {
                    "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
                    "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
                    "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
                    "--tw-numeric-spacing": "var(--tw-empty,/*!*/ /*!*/)",
                    "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)",
                  },
                },
              },
      ),
      I("tracking-", "letterSpacing"),
      I("leading-", "lineHeight"),
      L("list-(inside|outside)", "listStylePosition"),
      I("list-", "listStyleType"),
      L("list-", "listStyleType"),
      I("placeholder-opacity-", "placeholderOpacity", ({ _: e }) => ({
        "&::placeholder": { "--tw-placeholder-opacity": e },
      })),
      N("placeholder-", { property: "color", selector: "&::placeholder" }),
      L("text-(left|center|right|justify|start|end)", "textAlign"),
      L("text-(ellipsis|clip)", "textOverflow"),
      I("text-opacity-", "textOpacity", "--tw-text-opacity"),
      N("text-", { property: "color" }),
      I("text-", "fontSize", ({ _: e }) =>
        "string" == typeof e
          ? { fontSize: e }
          : o(
              { fontSize: e[0] },
              "string" == typeof e[1] ? { lineHeight: e[1] } : e[1],
            ),
      ),
      I("indent-", "textIndent"),
      L("(overline|underline|line-through)", "textDecorationLine"),
      L("no-underline", { textDecorationLine: "none" }),
      I("underline-offset-", "textUnderlineOffset"),
      N("decoration-", {
        section: "textDecorationColor",
        opacityVariable: !1,
        opacitySection: "opacity",
      }),
      I("decoration-", "textDecorationThickness"),
      L("decoration-", "textDecorationStyle"),
      L("(uppercase|lowercase|capitalize)", "textTransform"),
      L("normal-case", { textTransform: "none" }),
      L("truncate", {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }),
      L("align-", "verticalAlign"),
      L("whitespace-", "whiteSpace"),
      L("break-normal", { wordBreak: "normal", overflowWrap: "normal" }),
      L("break-words", { overflowWrap: "break-word" }),
      L("break-all", { wordBreak: "break-all" }),
      N("caret-", { opacityVariable: !1, opacitySection: "opacity" }),
      N("accent-", { opacityVariable: !1, opacitySection: "opacity" }),
      L(
        "bg-gradient-to-([trbl]|[tb][rl])",
        "backgroundImage",
        ({ 1: e }) =>
          `linear-gradient(to ${em(e, " ")},var(--tw-gradient-stops))`,
      ),
      N(
        "from-",
        {
          section: "gradientColorStops",
          opacityVariable: !1,
          opacitySection: "opacity",
        },
        ({ _: e }) => ({
          "--tw-gradient-from": e.value,
          "--tw-gradient-to": e.color({ opacityValue: "0" }),
          "--tw-gradient-stops":
            "var(--tw-gradient-from),var(--tw-gradient-to)",
        }),
      ),
      N(
        "via-",
        {
          section: "gradientColorStops",
          opacityVariable: !1,
          opacitySection: "opacity",
        },
        ({ _: e }) => ({
          "--tw-gradient-to": e.color({ opacityValue: "0" }),
          "--tw-gradient-stops": `var(--tw-gradient-from),${e.value},var(--tw-gradient-to)`,
        }),
      ),
      N("to-", {
        section: "gradientColorStops",
        property: "--tw-gradient-to",
        opacityVariable: !1,
        opacitySection: "opacity",
      }),
      L("bg-(fixed|local|scroll)", "backgroundAttachment"),
      L(
        "bg-origin-(border|padding|content)",
        "backgroundOrigin",
        ({ 1: e }) => e + "-box",
      ),
      L(
        ["bg-(no-repeat|repeat(-[xy])?)", "bg-repeat-(round|space)"],
        "backgroundRepeat",
      ),
      L("bg-blend-", "backgroundBlendMode"),
      L(
        "bg-clip-(border|padding|content|text)",
        "backgroundClip",
        ({ 1: e }) => e + ("text" == e ? "" : "-box"),
      ),
      I("bg-opacity-", "backgroundOpacity", "--tw-bg-opacity"),
      N("bg-", { section: "backgroundColor" }),
      I("bg-", "backgroundImage"),
      I("bg-", "backgroundPosition"),
      L(
        "bg-(top|bottom|center|(left|right)(-(top|bottom))?)",
        "backgroundPosition",
        eu,
      ),
      I("bg-", "backgroundSize"),
      I("rounded(?:$|-)", "borderRadius"),
      I(
        "rounded-([trbl]|[tb][rl])(?:$|-)",
        "borderRadius",
        ({ 1: e, _: t }) => {
          let r = {
            t: ["tl", "tr"],
            r: ["tr", "br"],
            b: ["bl", "br"],
            l: ["bl", "tl"],
          }[e] || [e, e];
          return {
            [`border-${em(r[0])}-radius`]: t,
            [`border-${em(r[1])}-radius`]: t,
          };
        },
      ),
      L("border-(collapse|separate)", "borderCollapse"),
      I("border-opacity(?:$|-)", "borderOpacity", "--tw-border-opacity"),
      L("border-(solid|dashed|dotted|double|none)", "borderStyle"),
      I("border-spacing(-[xy])?(?:$|-)", "borderSpacing", ({ 1: e, _: t }) => ({
        "@layer defaults": {
          "*,::before,::after,::backdrop": {
            "--tw-border-spacing-x": 0,
            "--tw-border-spacing-y": 0,
          },
        },
        ["--tw-border-spacing" + (e || "-x")]: t,
        ["--tw-border-spacing" + (e || "-y")]: t,
        "border-spacing":
          "var(--tw-border-spacing-x) var(--tw-border-spacing-y)",
      })),
      N(
        "border-([xytrbl])-",
        { section: "borderColor" },
        ex("border", "Color"),
      ),
      N("border-"),
      I("border-([xytrbl])(?:$|-)", "borderWidth", ex("border", "Width")),
      I("border(?:$|-)", "borderWidth"),
      I("divide-opacity(?:$|-)", "divideOpacity", ({ _: e }) => ({
        "&>:not([hidden])~:not([hidden])": { "--tw-divide-opacity": e },
      })),
      L("divide-(solid|dashed|dotted|double|none)", ({ 1: e }) => ({
        "&>:not([hidden])~:not([hidden])": { borderStyle: e },
      })),
      L("divide-([xy]-reverse)", ({ 1: e }) => ({
        "&>:not([hidden])~:not([hidden])": { ["--tw-divide-" + e]: "1" },
      })),
      I("divide-([xy])(?:$|-)", "divideWidth", ({ 1: e, _: t }) => {
        let r = { x: "lr", y: "tb" }[e];
        return {
          "&>:not([hidden])~:not([hidden])": {
            [`--tw-divide-${e}-reverse`]: "0",
            [`border-${em(
              r[0],
            )}Width`]: `calc(${t} * calc(1 - var(--tw-divide-${e}-reverse)))`,
            [`border-${em(
              r[1],
            )}Width`]: `calc(${t} * var(--tw-divide-${e}-reverse))`,
          },
        };
      }),
      N("divide-", {
        property: "borderColor",
        selector: "&>:not([hidden])~:not([hidden])",
      }),
      I("ring-opacity(?:$|-)", "ringOpacity", "--tw-ring-opacity"),
      N("ring-offset-", {
        property: "--tw-ring-offset-color",
        opacityVariable: !1,
      }),
      I("ring-offset(?:$|-)", "ringOffsetWidth", "--tw-ring-offset-width"),
      L("ring-inset", { "--tw-ring-inset": "inset" }),
      N("ring-", { property: "--tw-ring-color" }),
      I("ring(?:$|-)", "ringWidth", ({ _: e }, { theme: t }) => ({
        "--tw-ring-offset-shadow":
          "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
        "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${e} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
        boxShadow:
          "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)",
        "@layer defaults": {
          "*,::before,::after,::backdrop": {
            "--tw-ring-offset-shadow": "0 0 #0000",
            "--tw-ring-shadow": "0 0 #0000",
            "--tw-shadow": "0 0 #0000",
            "--tw-shadow-colored": "0 0 #0000",
            "&": {
              "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
              "--tw-ring-offset-width": t("ringOffsetWidth", "", "0px"),
              "--tw-ring-offset-color": C(t("ringOffsetColor", "", "#fff")),
              "--tw-ring-color": C(t("ringColor", "", "#93c5fd"), {
                opacityVariable: "--tw-ring-opacity",
              }),
              "--tw-ring-opacity": t("ringOpacity", "", "0.5"),
            },
          },
        },
      })),
      N(
        "shadow-",
        {
          section: "boxShadowColor",
          opacityVariable: !1,
          opacitySection: "opacity",
        },
        ({ _: e }) => ({
          "--tw-shadow-color": e.value,
          "--tw-shadow": "var(--tw-shadow-colored)",
        }),
      ),
      I("shadow(?:$|-)", "boxShadow", ({ _: e }) => ({
        "--tw-shadow": eb(e),
        "--tw-shadow-colored": eb(e).replace(
          /([^,]\s+)(?:#[a-f\d]+|(?:(?:hsl|rgb)a?|hwb|lab|lch|color|var)\(.+?\)|[a-z]+)(,|$)/g,
          "$1var(--tw-shadow-color)$2",
        ),
        boxShadow:
          "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)",
        "@layer defaults": {
          "*,::before,::after,::backdrop": {
            "--tw-ring-offset-shadow": "0 0 #0000",
            "--tw-ring-shadow": "0 0 #0000",
            "--tw-shadow": "0 0 #0000",
            "--tw-shadow-colored": "0 0 #0000",
          },
        },
      })),
      I("(opacity)-"),
      L("mix-blend-", "mixBlendMode"),
      ...ew(),
      ...ew("backdrop-"),
      I("transition(?:$|-)", "transitionProperty", (e, { theme: t }) => ({
        transitionProperty: eb(e),
        transitionTimingFunction:
          "none" == e._ ? void 0 : eb(t("transitionTimingFunction", "")),
        transitionDuration:
          "none" == e._ ? void 0 : eb(t("transitionDuration", "")),
      })),
      I("duration(?:$|-)", "transitionDuration", "transitionDuration", eb),
      I(
        "ease(?:$|-)",
        "transitionTimingFunction",
        "transitionTimingFunction",
        eb,
      ),
      I("delay(?:$|-)", "transitionDelay", "transitionDelay", eb),
      I("animate(?:$|-)", "animation", (e, { theme: t, h: r }) => {
        let o = eb(e),
          n = o.split(" "),
          i = t("keyframes", n[0]);
        return i
          ? { ["@keyframes " + (n[0] = r(n[0]))]: i, animation: n.join(" ") }
          : { animation: o };
      }),
      "(transform)-(none)",
      L("transform", ev),
      L("transform-(cpu|gpu)", ({ 1: e }) => ({
        "--tw-transform": ek("gpu" == e),
      })),
      I("scale(-[xy])?-", "scale", ({ 1: e, _: t }) =>
        o(
          { ["--tw-scale" + (e || "-x")]: t, ["--tw-scale" + (e || "-y")]: t },
          ev(),
        ),
      ),
      I("-?(rotate)-", "rotate", ey),
      I("-?(translate-[xy])-", "translate", ey),
      I("-?(skew-[xy])-", "skew", ey),
      L(
        "origin-(center|((top|bottom)(-(left|right))?)|left|right)",
        "transformOrigin",
        eu,
      ),
      "(appearance)-",
      I("(columns)-"),
      "(columns)-(\\d+)",
      "(break-(?:before|after|inside))-",
      I("(cursor)-"),
      "(cursor)-",
      L("snap-(none)", "scroll-snap-type"),
      L("snap-(x|y|both)", ({ 1: e }) => ({
        "scroll-snap-type": e + " var(--tw-scroll-snap-strictness)",
        "@layer defaults": {
          "*,::before,::after,::backdrop": {
            "--tw-scroll-snap-strictness": "proximity",
          },
        },
      })),
      L("snap-(mandatory|proximity)", "--tw-scroll-snap-strictness"),
      L("snap-(?:(start|end|center)|align-(none))", "scroll-snap-align"),
      L("snap-(normal|always)", "scroll-snap-stop"),
      L("scroll-(auto|smooth)", "scroll-behavior"),
      I("scroll-p([xytrbl])?(?:$|-)", "padding", ex("scroll-padding")),
      I("-?scroll-m([xytrbl])?(?:$|-)", "scroll-margin", ex("scroll-margin")),
      L("touch-(auto|none|manipulation)", "touch-action"),
      L(
        "touch-(pinch-zoom|pan-(?:(x|left|right)|(y|up|down)))",
        ({ 1: e, 2: t, 3: r }) => ({
          [`--tw-${t ? "pan-x" : r ? "pan-y" : e}`]: e,
          "touch-action": "var(--tw-touch-action)",
          "@layer defaults": {
            "*,::before,::after,::backdrop": {
              "--tw-pan-x": "var(--tw-empty,/*!*/ /*!*/)",
              "--tw-pan-y": "var(--tw-empty,/*!*/ /*!*/)",
              "--tw-pinch-zoom": "var(--tw-empty,/*!*/ /*!*/)",
              "--tw-touch-action":
                "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)",
            },
          },
        }),
      ),
      L("outline-none", {
        outline: "2px solid transparent",
        "outline-offset": "2px",
      }),
      L("outline", { outlineStyle: "solid" }),
      L("outline-(dashed|dotted|double|hidden)", "outlineStyle"),
      I("(outline-offset)-"),
      N("outline-", { opacityVariable: !1, opacitySection: "opacity" }),
      I("outline-", "outlineWidth"),
      "(pointer-events)-",
      I("(will-change)-"),
      "(will-change)-",
      [
        "resize(?:-(none|x|y))?",
        "resize",
        ({ 1: e }) => ({ x: "horizontal", y: "vertical" })[e] || e || "both",
      ],
      L("select-(none|text|all|auto)", "userSelect"),
      N("fill-", {
        section: "fill",
        opacityVariable: !1,
        opacitySection: "opacity",
      }),
      N("stroke-", {
        section: "stroke",
        opacityVariable: !1,
        opacitySection: "opacity",
      }),
      I("stroke-", "strokeWidth"),
      L("sr-only", {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        clip: "rect(0,0,0,0)",
        borderWidth: "0",
      }),
      L("not-sr-only", {
        position: "static",
        width: "auto",
        height: "auto",
        padding: "0",
        margin: "0",
        overflow: "visible",
        whiteSpace: "normal",
        clip: "auto",
      }),
    ];
  function eu(e) {
    return ("string" == typeof e ? e : e[1]).replace(/-/g, " ").trim();
  }
  function eg(e) {
    return ("string" == typeof e ? e : e[1]).replace("col", "column");
  }
  function em(e, t = "-") {
    let r = [];
    for (let o of e)
      r.push({ t: "top", r: "right", b: "bottom", l: "left" }[o]);
    return r.join(t);
  }
  function eb(e) {
    return e && "" + (e._ || e);
  }
  function eh({ $$: e }) {
    return (
      ({ r: "flex-", "": "flex-", w: "space-", u: "space-", n: "space-" }[
        e[3] || ""
      ] || "") + e
    );
  }
  function ex(e, t = "") {
    return ({ 1: r, _: n }) => {
      let i = { x: "lr", y: "tb" }[r] || r + r;
      return i
        ? o({}, B(e + "-" + em(i[0]) + t, n), B(e + "-" + em(i[1]) + t, n))
        : B(e + t, n);
    };
  }
  function ew(e = "") {
    let t = [
        "blur",
        "brightness",
        "contrast",
        "grayscale",
        "hue-rotate",
        "invert",
        e && "opacity",
        "saturate",
        "sepia",
        !e && "drop-shadow",
      ].filter(Boolean),
      r = {};
    for (let n of t) r[`--tw-${e}${n}`] = "var(--tw-empty,/*!*/ /*!*/)";
    return (
      (r = {
        [`${e}filter`]: t.map((t) => `var(--tw-${e}${t})`).join(" "),
        "@layer defaults": { "*,::before,::after,::backdrop": r },
      }),
      [
        `(${e}filter)-(none)`,
        L(`${e}filter`, r),
        ...t.map((t) =>
          I(
            `${"h" == t[0] ? "-?" : ""}(${e}${t})(?:$|-)`,
            t,
            ({ 1: e, _: n }) =>
              o(
                {
                  [`--tw-${e}`]: c(n)
                    .map((e) => `${t}(${e})`)
                    .join(" "),
                },
                r,
              ),
          ),
        ),
      ]
    );
  }
  function ey({ 1: e, _: t }) {
    return o({ ["--tw-" + e]: t }, ev());
  }
  function ev() {
    return {
      transform: "var(--tw-transform)",
      "@layer defaults": {
        "*,::before,::after,::backdrop": {
          "--tw-translate-x": "0",
          "--tw-translate-y": "0",
          "--tw-rotate": "0",
          "--tw-skew-x": "0",
          "--tw-skew-y": "0",
          "--tw-scale-x": "1",
          "--tw-scale-y": "1",
          "--tw-transform": ek(),
        },
      },
    };
  }
  function ek(e) {
    return [
      e
        ? "translate3d(var(--tw-translate-x),var(--tw-translate-y),0)"
        : "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))",
      "rotate(var(--tw-rotate))",
      "skewX(var(--tw-skew-x))",
      "skewY(var(--tw-skew-y))",
      "scaleX(var(--tw-scale-x))",
      "scaleY(var(--tw-scale-y))",
    ].join(" ");
  }
  function e$({ 1: e, 2: t }) {
    return `${e} ${t} / ${e} ${t}`;
  }
  function eS({ 1: e }) {
    return `repeat(${e},minmax(0,1fr))`;
  }
  let eC = [
      ["sticky", "@supports ((position: -webkit-sticky) or (position:sticky))"],
      ["motion-reduce", "@media (prefers-reduced-motion:reduce)"],
      ["motion-safe", "@media (prefers-reduced-motion:no-preference)"],
      ["print", "@media print"],
      ["portrait", "@media (orientation:portrait)"],
      ["landscape", "@media (orientation:landscape)"],
      ["contrast-more", "@media (prefers-contrast:more)"],
      ["contrast-less", "@media (prefers-contrast:less)"],
      ["marker", "& *::marker,&::marker"],
      ["selection", "& *::selection,&::selection"],
      ["first-letter", "&::first-letter"],
      ["first-line", "&::first-line"],
      ["file", "&::file-selector-button"],
      ["placeholder", "&::placeholder"],
      ["backdrop", "&::backdrop"],
      ["first", "&:first-child"],
      ["last", "&:last-child"],
      ["even", "&:nth-child(2n)"],
      ["odd", "&:nth-child(odd)"],
      ["open", "&[open]"],
      [
        "((group|peer)(~[^-[]+)?)(-[a-z-]+|-\\[(.+)]|\\[.+])",
        ({ 1: e, 4: t, 5: r }, { e: o, h: n, v: i }) => {
          let a = (r && H(r)) || ("[" == t[0] ? t : i(t.slice(1)));
          return `${(a.includes("&") ? a : "&" + a).replace(
            /&/g,
            `:merge(.${o(n(e))})`,
          )}${"p" == e[0] ? "~" : " "}&`;
        },
      ],
      ["(ltr|rtl)", ({ 1: e }) => `[dir="${e}"] &`],
      [
        /^\[(.+)]$/,
        ({ 1: e }) => /[&@]/.test(e) && H(e).replace(/[}]+$/, "").split("{"),
      ],
    ],
    eA = (function (e) {
      if (document.currentScript) {
        let t = () => r.disconnect(),
          r = new MutationObserver((r) => {
            for (let { target: o } of r)
              if (o === document.body) return e(), t();
          });
        return (
          r.observe(document.documentElement, { childList: !0, subtree: !0 }), t
        );
      }
      return f;
    })(ez);
  function ez(e = {}, r) {
    var { disablePreflight: i } = e,
      s = n(e, ["disablePreflight"]);
    return (
      eA(),
      (function (e, r = !0) {
        var i;
        let s = W(e);
        return (function (e = {}, r = ee, i) {
          return (
            null == t || t.destroy(),
            (t = (function (e = er, t = document.documentElement) {
              if (!t) return e;
              let r = new MutationObserver(n);
              r.observe(t, {
                attributeFilter: ["class"],
                subtree: !0,
                childList: !0,
              }),
                i(t),
                n([{ target: t, type: "" }]);
              let { destroy: o } = e;
              return (
                (e.destroy = () => {
                  r.disconnect(), o.call(e);
                }),
                e
              );
              function n(e) {
                for (let { type: t, target: o } of e)
                  if ("a" == t[0]) i(o);
                  else for (let n of o.querySelectorAll("[class]")) i(n);
                r.takeRecords();
              }
              function i(t) {
                var r, o;
                let n;
                let i = t.getAttribute("class");
                i &&
                  (r = i) != (o = n = e(i)) &&
                  "" + r.split(" ").sort() != "" + o.split(" ").sort() &&
                  t.setAttribute("class", n);
              }
            })(
              (function (e, t) {
                let r = W(e),
                  i = (function ({
                    theme: e,
                    darkMode: t,
                    darkColor: r,
                    variants: o,
                    rules: i,
                    hash: s,
                    stringify: f,
                    ignorelist: p,
                  }) {
                    let u = new Map(),
                      g = new Map(),
                      m = new Map(),
                      b = new Map(),
                      h = X(p, (e, t) => t.test(e));
                    o.push([
                      "dark",
                      Array.isArray(t) || "class" == t
                        ? `${c(t)[1] || ".dark"} &`
                        : "string" == typeof t && "media" != t
                        ? t
                        : "@media (prefers-color-scheme:dark)",
                    ]);
                    let x = "function" == typeof s ? (e) => s(e, l) : s ? l : d;
                    return {
                      theme: (function (e) {
                        var { extend: t = {} } = e,
                          r = n(e, ["extend"]);
                        let o = {},
                          i = {
                            get colors() {
                              return a("colors");
                            },
                            theme: a,
                            negative: () => ({}),
                            breakpoints(e) {
                              let t = {};
                              for (let r in e)
                                "string" == typeof e[r] &&
                                  (t["screen-" + r] = e[r]);
                              return t;
                            },
                          };
                        return a;
                        function a(e, n, i, s) {
                          if (e) {
                            var c;
                            if (
                              (({ 1: e, 2: s } =
                                /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(e) || [
                                  ,
                                  e,
                                ]),
                              /[.[]/.test(e))
                            ) {
                              let d = [];
                              e.replace(
                                /\[([^\]]+)\]|([^.[]+)/g,
                                (e, t, r = t) => d.push(r),
                              ),
                                (e = d.shift()),
                                (i = n),
                                (n = d.join("-"));
                            }
                            let f =
                              o[e] ||
                              Object.assign(
                                Object.assign((o[e] = {}), l(r, e)),
                                l(t, e),
                              );
                            if (null == n) return f;
                            let p = null != (c = f[n || "DEFAULT"]) ? c : i;
                            return s ? C(p, { opacityValue: z(s, a) }) : p;
                          }
                          let u = {};
                          for (let g of [...Object.keys(r), ...Object.keys(t)])
                            u[g] = a(g);
                          return u;
                        }
                        function l(e, t) {
                          let r = e[t];
                          return ("function" == typeof r && (r = r(i)),
                          r && /color|fill|stroke/i.test(t))
                            ? (function e(t, r = []) {
                                let o = {};
                                for (let n in t) {
                                  let i = t[n],
                                    a = [...r, n];
                                  (o[a.join("-")] = i),
                                    "DEFAULT" == n &&
                                      ((a = r), (o[r.join("-")] = i)),
                                    "object" == typeof i &&
                                      Object.assign(o, e(i, a));
                                }
                                return o;
                              })(r)
                            : r;
                        }
                      })(e),
                      e: a,
                      h: x,
                      s(e, t) {
                        return f(K(e, x), K(t, x), this);
                      },
                      d(e, t, o) {
                        return null == r ? void 0 : r(e, t, this, o);
                      },
                      v(e) {
                        return (
                          u.has(e) || u.set(e, q(e, o, g, G, this) || "&:" + e),
                          u.get(e)
                        );
                      },
                      r(e, t) {
                        let r = JSON.stringify([e, t]);
                        return (
                          m.has(r) ||
                            m.set(r, !h(e, this) && q(e, i, b, Y, this, t)),
                          m.get(r)
                        );
                      },
                    };
                  })(r),
                  s = new Map(),
                  f = [],
                  u = new Set();
                function g(e) {
                  let r = e.n && i.h(e.n),
                    n = x(r ? o({}, e, { n: r }) : e);
                  if (n && !u.has(n)) {
                    u.add(n);
                    let a = k(f, e);
                    t.insert(n, a, e), f.splice(a, 0, e);
                  }
                  return r;
                }
                return (
                  t.resume(
                    (e) => s.set(e, e),
                    (e, r) => {
                      t.insert(e, f.length, r), f.push(r), u.add(e);
                    },
                  ),
                  Object.defineProperties(
                    function (e) {
                      if (!s.size)
                        for (let t of c(r.preflight))
                          "function" == typeof t && (t = t(i)),
                            t &&
                              ("string" == typeof t
                                ? T("", p.b, D(t), i, p.b, [], !1, !0)
                                : A(t, {}, i, p.b)
                              ).forEach(g);
                      e = "" + e;
                      let o = s.get(e);
                      if (!o) {
                        let n = new Set();
                        for (let a of j(D(e), i)) n.add(a.c).add(g(a));
                        (o = [...n].filter(Boolean).join(" ")),
                          s.set(e, o).set(o, o);
                      }
                      return o;
                    },
                    Object.getOwnPropertyDescriptors({
                      get target() {
                        return t.target;
                      },
                      theme: i.theme,
                      config: r,
                      snapshot() {
                        let e = t.snapshot(),
                          r = new Set(u),
                          o = new Map(s),
                          n = [...f];
                        return () => {
                          e(), (u = r), (s = o), (f = n);
                        };
                      },
                      clear() {
                        t.clear(), (u = new Set()), (s = new Map()), (f = []);
                      },
                      destroy() {
                        this.clear(), t.destroy();
                      },
                    }),
                  )
                );
              })(e, "function" == typeof r ? r() : r),
              void 0,
            ))
          );
        })(o({}, s, { hash: null != (i = s.hash) ? i : r }), () => ee(!r));
      })(
        W(
          o({}, s, {
            presets: [
              ({ stringify: e }) => ({
                stringify(t, r, o) {
                  var n, i;
                  let a = "",
                    l = eo.get(t);
                  l && (a += e(l, r, o) + ";");
                  let s = (n =
                      /^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(
                        t,
                      ))
                      ? n[1]
                        ? 1
                        : n[2]
                        ? 2
                        : n[3]
                        ? 3
                        : 5
                      : 0,
                    c = (i =
                      /^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(
                        t,
                      ))
                      ? i[1]
                        ? /^sti/i.test(r)
                          ? 1
                          : 0
                        : i[2]
                        ? /^pat/i.test(r)
                          ? 1
                          : 0
                        : i[3]
                        ? /^image-/i.test(r)
                          ? 1
                          : 0
                        : i[4]
                        ? "-" === r[3]
                          ? 2
                          : 0
                        : /^(?:inline-)?grid$/i.test(r)
                        ? 4
                        : 0
                      : 0;
                  for (let d of en)
                    s & d[1] && (a += e(d[0] + t, r, o) + ";"),
                      c & d[1] && (a += e(t, d[0] + r, o) + ";");
                  return a + e(t, r, o);
                },
              }),
              (function ({ disablePreflight: e } = {}) {
                return {
                  preflight: e ? void 0 : ef,
                  theme: ea,
                  variants: eC,
                  rules: ep,
                };
              })({ disablePreflight: i }),
              ...c(s.presets),
            ],
          }),
        ),
        r,
      )
    );
  }
  return (
    (e.install = ez),
    (e.presetTailwind_colors = ei),
    (e.presetTailwind_defaultTheme = ea),
    e
  );
})({});
/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@twind/preset-ext@1.0.1/preset-ext.global.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(this.twind = this.twind || {}),
  (this.twind.presetExt = (function (i) {
    "use strict";
    let r = [
        [
          /^([-\w]+\w)\[([^ ]+)]$/,
          ({ 1: r, 2: t }, n) => ({ [r]: i.arbitrary(`[${t}]`, r, n) }),
        ],
      ],
      t = [
        ["hocus", "&:hover,&:focus-visible"],
        [
          "((group|peer)(~[^-]+)?)-hocus",
          ({ 1: i }, { e: r, h: t }) =>
            ["hover", "focus-visible"]
              .map((n) => `:merge(.${r(t(i))}):${n}${"p" == i[0] ? "~" : " "}&`)
              .join(","),
        ],
        ["(dir|lang)-", ({ 1: i, $$: r }) => `&:${i}(${r})`],
        [
          "not-([a-z-]+|\\[.+\\])",
          ({ 1: i }) => `&:not(${("[" == i[0] ? "" : ":") + i})`,
        ],
        ["children", "&>*"],
        ["siblings", "&~*"],
        ["sibling", "&+*"],
        ["override", "&&"],
        ["\\[.+]", (i) => "&" + i.input],
        ["([a-z-]+):", ({ 1: i }) => "&::" + i],
        [/&/, (r) => i.normalize(r.input)],
      ];
    return function () {
      return { rules: r, variants: t };
    };
  })(twind.core));
/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@twind/preset-line-clamp@1.0.1/preset-line-clamp.global.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(this.twind = this.twind || {}),
  (this.twind.presetLineClamp = (function (e) {
    "use strict";
    function i(e) {
      return {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": `${e}`,
      };
    }
    return function () {
      return {
        rules: [
          ["line-clamp-none", { "-webkit-line-clamp": "unset" }],
          ["line-clamp-", e.fromTheme("lineClamp", ({ _: e }) => i(e))],
          ["line-clamp-(\\d+)", ({ 1: e }) => i(e)],
        ],
      };
    };
  })(twind.core));
/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@twind/preset-tailwind-forms@1.0.1/preset-tailwind-forms.global.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(this.twind = this.twind || {}),
  (this.twind.presetTailwindForms = (function (e, r, o) {
    "use strict";
    let t = o && o.__esModule ? o : { default: o },
      [n, a] = t.default.fontSize.base,
      { spacing: i, borderWidth: l, borderRadius: s } = t.default,
      c = [
        {
          b: [
            "[type='text']",
            "[type='email']",
            "[type='url']",
            "[type='password']",
            "[type='number']",
            "[type='date']",
            "[type='datetime-local']",
            "[type='month']",
            "[type='search']",
            "[type='tel']",
            "[type='time']",
            "[type='week']",
            "[multiple]",
            "textarea",
            "select",
          ],
          c: ["form-input", "form-textarea", "form-select", "form-multiselect"],
          s: ({ theme: o }) => ({
            appearance: "none",
            "background-color": "#fff",
            "border-color": e.toColorValue(o("colors.gray.500", r.gray[500])),
            "border-width": l.DEFAULT,
            "border-radius": s.none,
            "padding-top": i[2],
            "padding-right": i[3],
            "padding-bottom": i[2],
            "padding-left": i[3],
            "font-size": n,
            "line-height": a,
            "--tw-shadow": "0 0 #0000",
            "&:focus": {
              outline: "2px solid transparent",
              "outline-offset": "2px",
              "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
              "--tw-ring-offset-width": "0px",
              "--tw-ring-offset-color": "#fff",
              "--tw-ring-color": e.toColorValue(
                o("colors.blue.600", r.blue[600]),
              ),
              "--tw-ring-offset-shadow":
                "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
              "--tw-ring-shadow":
                "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
              "box-shadow":
                "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
              "border-color": e.toColorValue(o("colors.blue.600", r.blue[600])),
            },
          }),
        },
        {
          b: ["input", "textarea"],
          c: ["form-input", "form-textarea"],
          s: ({ theme: o }) => ({
            "&::placeholder": {
              color: e.toColorValue(o("colors.gray.500", r.gray[500])),
              opacity: "1",
            },
          }),
        },
        {
          b: [""],
          c: ["form-input"],
          s: {
            "&::-webkit-datetime-edit-fields-wrapper": { padding: "0" },
            "&::-webkit-date-and-time-value": { "min-height": "1.5em" },
          },
        },
        {
          b: ["select"],
          c: ["form-select"],
          s: ({ theme: o }) => ({
            "background-image": `url("${u(
              `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${e.toColorValue(
                o("colors.gray.500", r.gray[500]),
              )}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`,
            )}")`,
            "background-position": `right ${i[2]} center`,
            "background-repeat": "no-repeat",
            "background-size": "1.5em 1.5em",
            "padding-right": i[10],
            "color-adjust": "exact",
          }),
        },
        {
          b: ["[multiple]"],
          s: {
            "background-image": "initial",
            "background-position": "initial",
            "background-repeat": "unset",
            "background-size": "initial",
            "padding-right": i[3],
            "color-adjust": "unset",
          },
        },
        {
          b: ["[type='checkbox']", "[type='radio']"],
          c: ["form-checkbox", "form-radio"],
          s: ({ theme: o }) => ({
            appearance: "none",
            padding: "0",
            "color-adjust": "exact",
            display: "inline-block",
            "vertical-align": "middle",
            "background-origin": "border-box",
            "user-select": "none",
            "flex-shrink": "0",
            height: i[4],
            width: i[4],
            color: e.toColorValue(o("colors.blue.600", r.blue[600])),
            "background-color": "#fff",
            "border-color": e.toColorValue(o("colors.gray.500", r.gray[500])),
            "border-width": l.DEFAULT,
            "--tw-shadow": "0 0 #0000",
            "&:focus": {
              outline: "2px solid transparent",
              "outline-offset": "2px",
              "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
              "--tw-ring-offset-width": "2px",
              "--tw-ring-offset-color": "#fff",
              "--tw-ring-color": e.toColorValue(
                o("colors.blue.600", r.blue[600]),
              ),
              "--tw-ring-offset-shadow":
                "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
              "--tw-ring-shadow":
                "var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
              "box-shadow":
                "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
            },
            "&:checked": {
              "border-color": "transparent",
              "background-color": "currentColor",
              "background-size": "100% 100%",
              "background-position": "center",
              "background-repeat": "no-repeat",
              "&:hover,&:focus": {
                "border-color": "transparent",
                "background-color": "currentColor",
              },
            },
          }),
        },
        {
          b: ["[type='checkbox']"],
          c: ["form-checkbox"],
          s: {
            "border-radius": s.none,
            "&:checked": {
              "background-image": `url("${u(
                '<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>',
              )}")`,
            },
            "&:indeterminate": {
              "background-image": `url("${u(
                '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>',
              )}")`,
              "border-color": "transparent",
              "background-color": "currentColor",
              "background-size": "100% 100%",
              "background-position": "center",
              "background-repeat": "no-repeat",
              "&:hover,&:focus": {
                "border-color": "transparent",
                "background-color": "currentColor",
              },
            },
          },
        },
        {
          b: ["[type='radio']"],
          c: ["form-radio"],
          s: {
            "border-radius": "100%",
            "&:checked": {
              "background-image": `url("${u(
                '<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>',
              )}")`,
            },
          },
        },
        {
          b: ["[type='file']"],
          s: {
            background: "unset",
            "border-color": "inherit",
            "border-width": "0",
            "border-radius": "0",
            padding: "0",
            "font-size": "unset",
            "line-height": "inherit",
            "&:focus": {
              outline: [
                "1px solid ButtonText",
                "1px auto -webkit-focus-ring-color",
              ],
            },
          },
        },
      ];
    function d(e) {
      switch (e) {
        case "%20":
          return " ";
        case "%3D":
          return "=";
        case "%3A":
          return ":";
        case "%2F":
          return "/";
        default:
          return e.toLowerCase();
      }
    }
    function u(e) {
      return (
        "data:image/svg+xml," +
        encodeURIComponent(
          e.trim().replace(/\s+/g, " ").replace(/"/g, "'"),
        ).replace(/%[\dA-F]{2}/g, d)
      );
    }
    return function ({ strategy: e } = {}) {
      let r = {};
      return (
        "base" !== e &&
          (r.rules = [
            [
              "(" +
                [...new Set(c.flatMap((e) => e.c).filter(Boolean))].join("|") +
                ")",
              (e, r) => ({
                "@layer base": c
                  .filter((r) => {
                    var o;
                    return null == (o = r.c) ? void 0 : o.includes(e[1]);
                  })
                  .map(({ c: e, s: o }) => ({
                    ["" + e.map((e) => "." + r.e(r.h(e)))]:
                      "function" == typeof o ? o(r) : o,
                  })),
              }),
            ],
          ]),
        "class" !== e &&
          (r.preflight = (e) => {
            let r = {};
            for (let { b: o, s: t } of c)
              r["" + o] = "function" == typeof t ? t(e) : t;
            return r;
          }),
        r
      );
    };
  })(
    twind.core,
    twind.presetTailwind_colors,
    twind.presetTailwind_defaultTheme,
  ));
/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@twind/preset-typography@1.0.1/preset-typography.global.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(this.twind = this.twind || {}),
  (this.twind.presetTypography = (function (t) {
    "use strict";
    function o() {
      return (o =
        Object.assign ||
        function (t) {
          for (var o = 1; o < arguments.length; o++) {
            var e = arguments[o];
            for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
          return t;
        }).apply(this, arguments);
    }
    function e() {
      return o.apply(this, arguments);
    }
    function r(t, o, e) {
      let r = {};
      for (let n in e) r[i(t, n, o, (e) => `.${o.e(o.h(t))}${e}`)] = e[n];
      return r;
    }
    function i(t, o, { e, h: r }, i) {
      return o.replace(
        /^[^>:]+$|(>)?((?:[^:,]+(?::[\w-]+)?)|:[\w-]+)(::[\w-]+)?/g,
        (o, n = " ", l = o, a = "") =>
          i(`${n}:where(${l}):not(:where(.${e(r("not-" + t))} *))${a}`),
      );
    }
    function n(t) {
      return t
        ? "string" == typeof t
          ? { fontSize: t }
          : e(
              { fontSize: t[0] },
              "string" == typeof t[1] ? { lineHeight: t[1] } : t[1],
            )
        : void 0;
    }
    function l(t, o) {
      return `${(t / o).toFixed(3).replace(/^0|\.?0+$/g, "")}em`;
    }
    return function ({
      className: o = "prose",
      defaultColor: a = "gray",
      extend: d = {},
      colors: p = {},
    } = {}) {
      return (
        (p = e(
          {
            body: "700",
            headings: "900",
            lead: "600",
            links: "900",
            bold: "900",
            counters: "500",
            bullets: "300",
            hr: "200",
            quotes: "900",
            "quote-borders": "200",
            captions: "500",
            code: "900",
            "pre-code": "200",
            "pre-bg": "800",
            "th-borders": "300",
            "td-borders": "200",
          },
          p,
          {
            dark:
              null === p.dark
                ? null
                : e(
                    {
                      body: "300",
                      headings: "#fff",
                      lead: "400",
                      links: "#fff",
                      bold: "#fff",
                      counters: "400",
                      bullets: "600",
                      hr: "700",
                      quotes: "100",
                      "quote-borders": "700",
                      captions: "400",
                      code: "#fff",
                      "pre-code": "300",
                      "pre-bg": "rgb(0 0 0 / 50%)",
                      "th-borders": "600",
                      "td-borders": "700",
                    },
                    p.dark,
                  ),
          },
        )),
        {
          variants: [
            ["headings", "h1,h2,h3,h4,h5,h6,th"],
            ["h1"],
            ["h2"],
            ["h3"],
            ["h4"],
            ["h5"],
            ["h6"],
            ["p"],
            ["a"],
            ["blockquote"],
            ["figure"],
            ["figcaption"],
            ["strong"],
            ["em"],
            ["code"],
            ["pre"],
            ["ol"],
            ["ul"],
            ["li"],
            ["table"],
            ["thead"],
            ["tr"],
            ["th"],
            ["td"],
            ["img"],
            ["video"],
            ["hr"],
            ["lead", ".lead"],
          ].map(([t, e = t]) => [
            `${o}-${t}`,
            (t, r) =>
              i(
                o,
                "." == e[0] ? "." + r.e(r.h(e.slice(1))) : e,
                r,
                (t) => `& :is(${t.trim()})`,
              ),
          ]),
          rules: [
            [`(lead|not-${o})`, ({ 1: t }, { h: o }) => [{ c: o(t) }]],
            [
              `${o}-invert`,
              {
                "@layer defaults": {
                  "--tw-prose-body": "var(--tw-prose-invert-body)",
                  "--tw-prose-headings": "var(--tw-prose-invert-headings)",
                  "--tw-prose-lead": "var(--tw-prose-invert-lead)",
                  "--tw-prose-links": "var(--tw-prose-invert-links)",
                  "--tw-prose-bold": "var(--tw-prose-invert-bold)",
                  "--tw-prose-counters": "var(--tw-prose-invert-counters)",
                  "--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
                  "--tw-prose-hr": "var(--tw-prose-invert-hr)",
                  "--tw-prose-quotes": "var(--tw-prose-invert-quotes)",
                  "--tw-prose-quote-borders":
                    "var(--tw-prose-invert-quote-borders)",
                  "--tw-prose-captions": "var(--tw-prose-invert-captions)",
                  "--tw-prose-code": "var(--tw-prose-invert-code)",
                  "--tw-prose-pre-code": "var(--tw-prose-invert-pre-code)",
                  "--tw-prose-pre-bg": "var(--tw-prose-invert-pre-bg)",
                  "--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
                  "--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)",
                },
              },
            ],
            [
              o + "-",
              ({ $$: t }, o) => {
                let e = n(o.theme("fontSize", t));
                return e && { "@layer components": e };
              },
            ],
            [o + "-", ({ $$: t }, o) => s(t, o)],
            [
              o,
              (t, i) =>
                e({}, s(a, i), {
                  "@layer base": [
                    r(o, i, {
                      a: {
                        color: "var(--tw-prose-links)",
                        textDecorationLine: "underline",
                        fontWeight: "500",
                      },
                      strong: {
                        color: "var(--tw-prose-bold)",
                        fontWeight: "600",
                      },
                      "a strong,blockquote strong,thead th strong": {
                        color: "inherit",
                      },
                      ul: { listStyleType: "disc" },
                      ol: { listStyleType: "decimal" },
                      'ol[type="A"]': { listStyleType: "upper-alpha" },
                      'ol[type="a"]': { listStyleType: "lower-alpha" },
                      'ol[type="A" s]': { listStyleType: "upper-alpha" },
                      'ol[type="a" s]': { listStyleType: "lower-alpha" },
                      'ol[type="I"]': { listStyleType: "upper-roman" },
                      'ol[type="i"]': { listStyleType: "lower-roman" },
                      'ol[type="I" s]': { listStyleType: "upper-roman" },
                      'ol[type="i" s]': { listStyleType: "lower-roman" },
                      'ol[type="1"]': { listStyleType: "decimal" },
                      "ol,ul": {
                        marginTop: l(20, 16),
                        marginBottom: l(20, 16),
                        paddingLeft: l(26, 16),
                      },
                      li: { marginTop: l(8, 16), marginBottom: l(8, 16) },
                      "ol>li,ul>li": { paddingLeft: l(6, 16) },
                      ">ul>li p": {
                        marginTop: l(12, 16),
                        marginBottom: l(12, 16),
                      },
                      ">ul>li>*:first-child,>ol>li>*:last-child": {
                        marginTop: l(20, 16),
                      },
                      ">ul>li>*:last-child,>ol>li>*:last-child": {
                        marginBottom: l(20, 16),
                      },
                      "ol>li::marker": {
                        fontWeight: "400",
                        color: "var(--tw-prose-counters)",
                      },
                      "ul>li::marker": { color: "var(--tw-prose-bullets)" },
                      "ul ul,ul ol,ol ul,ol ol": {
                        marginTop: l(12, 16),
                        marginBottom: l(12, 16),
                      },
                      hr: {
                        borderColor: "var(--tw-prose-hr)",
                        borderTopWidth: "1",
                        marginTop: l(48, 16),
                        marginBottom: l(48, 16),
                      },
                      blockquote: {
                        marginTop: l(32, 20),
                        marginBottom: l(32, 20),
                        paddingLeft: l(20, 20),
                        fontWeight: "500",
                        fontStyle: "italic",
                        color: "var(--tw-prose-quotes)",
                        borderLeftWidth: "0.25rem",
                        borderLeftColor: "var(--tw-prose-quote-borders)",
                        quotes: '"\\201C""\\201D""\\2018""\\2019"',
                      },
                      "blockquote p:first-of-type::before": {
                        content: "open-quote",
                      },
                      "blockquote p:last-of-type::after": {
                        content: "close-quote",
                      },
                      p: { marginTop: l(20, 16), marginBottom: l(20, 16) },
                      h1: {
                        color: "var(--tw-prose-headings)",
                        fontWeight: "800",
                        fontSize: l(36, 16),
                        marginTop: "0",
                        marginBottom: l(32, 36),
                        lineHeight: 1.15,
                      },
                      "h1 strong": { fontWeight: "900", color: "inherit" },
                      h2: {
                        color: "var(--tw-prose-headings)",
                        fontWeight: "700",
                        fontSize: l(24, 16),
                        marginTop: l(48, 24),
                        marginBottom: l(24, 24),
                        lineHeight: "1.35",
                      },
                      "h2 strong": { fontWeight: "800", color: "inherit" },
                      h3: {
                        color: "var(--tw-prose-headings)",
                        fontWeight: "600",
                        fontSize: l(20, 16),
                        marginTop: l(32, 20),
                        marginBottom: l(12, 20),
                        lineHeight: "1.6",
                      },
                      "h3 strong": { fontWeight: "700", color: "inherit" },
                      h4: {
                        color: "var(--tw-prose-headings)",
                        fontWeight: "600",
                        marginTop: l(24, 16),
                        marginBottom: l(8, 16),
                        lineHeight: "1.5",
                      },
                      "h4 strong": { fontWeight: "700", color: "inherit" },
                      "hr+*,h2+*,h3+*,h4+*": { marginTop: "0" },
                      "img,video,figure": {
                        marginTop: l(32, 16),
                        marginBottom: l(32, 16),
                      },
                      "figure>*": { marginTop: "0", marginBottom: "0" },
                      figcaption: {
                        color: "var(--tw-prose-captions)",
                        fontSize: l(14, 16),
                        lineHeight: "1.4",
                        marginTop: l(12, 14),
                      },
                      code: {
                        color: "var(--tw-prose-code)",
                        fontWeight: "600",
                        fontSize: l(14, 16),
                      },
                      "code::before,code::after": { content: '"`"' },
                      "h2 code": { fontSize: l(21, 24) },
                      "h3 code": { fontSize: l(18, 20) },
                      "a code,h1 code,h2 code,h3 code,h4 code,blockquote code,thead th code":
                        { color: "inherit" },
                      pre: {
                        color: "var(--tw-prose-pre-code)",
                        backgroundColor: "var(--tw-prose-pre-bg)",
                        overflowX: "auto",
                        fontWeight: "400",
                        fontSize: l(14, 16),
                        lineHeight: "1.7",
                        marginTop: l(24, 14),
                        marginBottom: l(24, 14),
                        borderRadius: "0.375rem",
                        paddingTop: l(12, 14),
                        paddingRight: l(16, 14),
                        paddingBottom: l(12, 14),
                        paddingLeft: l(16, 14),
                      },
                      "pre code": {
                        backgroundColor: "transparent",
                        borderWidth: "0",
                        borderRadius: "0",
                        padding: "0",
                        fontWeight: "inherit",
                        color: "inherit",
                        fontSize: "inherit",
                        fontFamily: "inherit",
                        lineHeight: "inherit",
                      },
                      "pre code::before": { content: "none" },
                      "pre code::after": { content: "none" },
                      table: {
                        width: "100%",
                        tableLayout: "auto",
                        textAlign: "left",
                        marginTop: l(32, 16),
                        marginBottom: l(32, 16),
                        fontSize: l(14, 16),
                        lineHeight: "1.7",
                      },
                      thead: {
                        borderBottomWidth: "1px",
                        borderBottomColor: "var(--tw-prose-th-borders)",
                      },
                      "thead th": {
                        color: "var(--tw-prose-headings)",
                        fontWeight: "600",
                        verticalAlign: "bottom",
                        paddingRight: l(8, 14),
                        paddingBottom: l(8, 14),
                        paddingLeft: l(8, 14),
                      },
                      "thead th:first-child": { paddingLeft: "0" },
                      "thead th:last-child": { paddingRight: "0" },
                      "tbody tr": {
                        borderBottomWidth: "1px",
                        borderBottomColor: "var(--tw-prose-td-borders)",
                      },
                      "tbody tr:last-child": { borderBottomWidth: "0" },
                      "tbody td,tfoot td": {
                        verticalAlign: "baseline",
                        paddingTop: l(8, 14),
                        paddingRight: l(8, 14),
                        paddingBottom: l(8, 14),
                        paddingLeft: l(8, 14),
                      },
                      "tbody td:first-child,tfoot td:first-child": {
                        paddingLeft: "0",
                      },
                      "tbody td:last-child,tfoot td:last-child": {
                        paddingRight: "0",
                      },
                      [`.${i.e(i.h("lead"))}`]: {
                        color: "var(--tw-prose-lead)",
                        fontSize: l(20, 16),
                        lineHeight: "1.6",
                        marginTop: l(24, 20),
                        marginBottom: l(24, 20),
                      },
                      ">:first-child": { marginTop: "0" },
                      ">:last-child": { marginBottom: "0" },
                    }),
                    r(o, i, d),
                  ],
                  "@layer components": e({}, n(i.theme("fontSize", "base")), {
                    color: "var(--tw-prose-body)",
                    maxWidth: "theme(max-w.prose, 65ch)",
                  }),
                }),
            ],
          ],
        }
      );
      function s(o, e) {
        let r = {},
          i = {},
          n = (r, n, l) => {
            let a = e.theme(`colors.${o}.${n}`, n);
            l["--tw-prose-" + r] = t.toColorValue(a);
            let d = l != i && e.d("colors", `${o}.${n}`, a);
            d && (i["--tw-prose-" + r] = t.toColorValue(d));
          };
        for (let l in p) {
          let a = p[l];
          "dark" != l && a && n(l, a, r);
        }
        for (let d in p.dark || {}) {
          let s = p.dark[d];
          s && (p.dark ? n("invert-" + d, s, r) : n(d, s, i));
        }
        return Object.keys(r).length
          ? { "@layer defaults": { "&": r, [e.v("dark")]: i } }
          : void 0;
      }
    };
  })(twind.core));
//# sourceMappingURL=/sm/a24486be6971b88f990747d1e1548d528a744c78cc96fca1c6848105becc3e1f.map
