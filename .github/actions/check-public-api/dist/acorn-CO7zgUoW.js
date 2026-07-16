import { __esmMin } from "./rolldown-runtime-aR1ZRE-I.js";
//#region ../../node_modules/.pnpm/prettier@3.9.5/node_modules/prettier/plugins/acorn.mjs
function Ge(e, t) {
	for (var i = 65536, r = 0; r < t.length; r += 2) {
		if (i += t[r], i > e) return !1;
		if (i += t[r + 1], i >= e) return !0;
	}
	return !1;
}
function j(e, t) {
	return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Ji.test(String.fromCharCode(e)) : t === !1 ? !1 : Ge(e, yt);
}
function K(e, t) {
	return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Xi.test(String.fromCharCode(e)) : t === !1 ? !1 : Ge(e, yt) || Ge(e, qi);
}
function V(e, t) {
	return new _(e, {
		beforeExpr: !0,
		binop: t
	});
}
function C(e, t) {
	return t === void 0 && (t = {}), t.keyword = e, Ke[e] = new _(e, t);
}
function ee(e) {
	return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function bt(e, t, i) {
	i === void 0 && (i = e.length);
	for (var r = t; r < i; r++) {
		var s = e.charCodeAt(r);
		if (ee(s)) return r < i - 1 && s === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
	}
	return -1;
}
function H(e) {
	return ft[e] || (ft[e] = new RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function G(e) {
	return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
function _t(e, t) {
	for (var i = 1, r = 0;;) {
		var s = bt(e, r, t);
		if (s < 0) return new ue(i, t - r);
		++i, r = s;
	}
}
function $i(e) {
	var t = {};
	for (var i in We) t[i] = e && te(e, i) ? e[i] : We[i];
	if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!dt && typeof console == "object" && console.warn && (dt = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved ??= t.ecmaVersion < 5, (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), lt(t.onToken)) {
		var r = t.onToken;
		t.onToken = function(s) {
			return r.push(s);
		};
	}
	if (lt(t.onComment) && (t.onComment = er(t, t.onComment)), t.sourceType === "commonjs" && t.allowAwaitOutsideFunction) throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");
	return t;
}
function er(e, t) {
	return function(i, r, s, n, o, c) {
		var h = {
			type: i ? "Block" : "Line",
			value: r,
			start: s,
			end: n
		};
		e.locations && (h.loc = new be(this, o, c)), e.ranges && (h.range = [s, n]), t.push(h);
	};
}
function ze(e, t) {
	return z | (e ? Je : 0) | (t ? Et : 0);
}
function sr(e, t) {
	var i = t.key.name, r = e[i], s = "true";
	return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (s = (t.static ? "s" : "i") + t.kind), r === "iget" && s === "iset" || r === "iset" && s === "iget" || r === "sget" && s === "sset" || r === "sset" && s === "sget" ? (e[i] = "true", !1) : r ? !0 : (e[i] = s, !1);
}
function ye(e, t) {
	var i = e.computed, r = e.key;
	return !i && (r.type === "Identifier" && r.name === t || r.type === "Literal" && r.value === t);
}
function Lt(e) {
	return e.type === "Identifier" || e.type === "ParenthesizedExpression" && Lt(e.expression);
}
function He(e) {
	return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && He(e.expression) || e.type === "ParenthesizedExpression" && He(e.expression);
}
function Rt(e, t, i, r) {
	return e.type = t, e.end = i, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = i), e;
}
function dr(e) {
	var t = qt[e] = {
		binary: H(hr[e] + " " + mt),
		binaryOfStrings: H(pr[e]),
		nonBinary: {
			General_Category: H(mt),
			Script: H(fr[e])
		}
	};
	t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
function mr(e) {
	for (var t in e) return !0;
	return !1;
}
function xr(e) {
	return e === 105 || e === 109 || e === 115;
}
function Ht(e) {
	return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
function yr(e) {
	return j(e, !0) || e === 36 || e === 95;
}
function gr(e) {
	return K(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
function Kt(e) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
function vr(e) {
	return e >= 0 && e <= 1114111;
}
function br(e) {
	return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
function Xt(e) {
	return Kt(e) || e === 95;
}
function Sr(e) {
	return Xt(e) || ke(e);
}
function Cr(e) {
	return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
}
function _r(e) {
	return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
}
function Er(e) {
	return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
}
function ke(e) {
	return e >= 48 && e <= 57;
}
function zt(e) {
	return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function Qt(e) {
	return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
function Yt(e) {
	return e >= 48 && e <= 55;
}
function kr(e, t) {
	return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function Zt(e) {
	return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
}
function Lr(e, t) {
	let i = /* @__PURE__ */ new SyntaxError(e + " (" + t.loc.start.line + ":" + t.loc.start.column + ")");
	return Object.assign(i, t);
}
function Ae(e) {
	let t = [];
	for (let i of e) try {
		return i();
	} catch (r) {
		t.push(r);
	}
	throw Object.assign(/* @__PURE__ */ new Error("All combinations failed"), { errors: t });
}
function Or(e) {
	return this[e < 0 ? this.length + e : e];
}
function Y(e) {
	let t = new Set(e);
	return (i) => t.has(i?.type);
}
function se(e) {
	return e.range?.[1] ?? e.end;
}
function w(e) {
	let t = e.range?.[0] ?? e.start, i = (e.declaration?.decorators ?? e.decorators)?.[0];
	return i ? Math.min(w(i), t) : t;
}
function I(e) {
	let { type: t } = e;
	return t === "IfStatement" ? I(e.alternate ?? e.consequent) : t === "ForInStatement" || t === "ForOfStatement" || t === "ForStatement" || t === "LabeledStatement" || t === "WithStatement" || t === "WhileStatement" ? I(e.body) : Ur.get(t)?.(e) ?? se(e);
}
function ne(e, t, i) {
	if (!e.has(t)) {
		let r = i(t);
		e.set(t, r);
	}
	return e.get(t);
}
function ui(e) {
	return ne(Gr, e, (t) => ae(t) && t.value[0] === "*" && /@(?:type|satisfies)\b/.test(t.value));
}
function Hr(e) {
	return Z(0, e, /[^\n]/g, " ");
}
function Kr(e, t) {
	for (let i of t) {
		let r = w(i), s = I(i);
		e = e.slice(0, r) + hi(e.slice(r, s)) + e.slice(s);
	}
	return e;
}
function ci(e) {
	let t = e[we];
	return ne(Jr, t, (i) => Kr(e.originalText, i));
}
function Xr(e) {
	if (!ae(e)) return [];
	if (!e.value.includes(`
`)) return [];
	let t = [];
	for (let i of `*${e.value}*`.split(`
`)) {
		if (i = i.trimStart(), !i.startsWith("*")) return [];
		t.push(i);
	}
	return t;
}
function zr(e) {
	return ne(pi, e, Xr);
}
function li(e) {
	pi.delete(e);
}
function it(e) {
	return zr(e).length > 0;
}
function fi(e) {
	if (e.length < 2) return;
	let t;
	for (let i = e.length - 1; i >= 0; i--) {
		let r = e[i];
		if (t && I(r) === w(t) && it(r) && it(t) && (e.splice(i + 1, 1), r.value += "*//*" + t.value, r.range = [w(r), I(t)], li(r)), !oi(r) && !ae(r)) throw new TypeError(`Unknown comment type: "${r.type}".`);
		t = r;
	}
}
function Qr(e) {
	return e !== null && typeof e == "object";
}
function fe(e) {
	if (le !== null && typeof le.property) {
		let t = le;
		return le = fe.prototype = null, t;
	}
	return le = fe.prototype = e ?? Object.create(null), new fe();
}
function rt(e) {
	return fe(e);
}
function Zr(e, t = "type") {
	rt(e);
	function i(r) {
		let s = r[t], n = e[s];
		if (!Array.isArray(n)) throw Object.assign(/* @__PURE__ */ new Error(`Missing visitor keys for '${s}'.`), { node: r });
		return n;
	}
	return i;
}
function Pe(e, t) {
	if (!di(e)) return e;
	if (Array.isArray(e)) {
		for (let r = 0; r < e.length; r++) e[r] = Pe(e[r], t);
		return e;
	}
	if (t.onEnter) {
		let r = t.onEnter(e) ?? e;
		if (r !== e) return Pe(r, t);
		e = r;
	}
	let i = yi(e);
	for (let r = 0; r < i.length; r++) e[i[r]] = Pe(e[i[r]], t);
	return t.onLeave && (e = t.onLeave(e) || e), e;
}
function es(e, t) {
	let { text: i, astType: r } = t, s = r === "oxc-ts", { comments: n } = e;
	fi(n);
	let o = e.type === "File" ? e.program : e;
	o.interpreter && (n.unshift(o.interpreter), delete o.interpreter), e.hashbang && (s && n.unshift(e.hashbang), delete e.hashbang), e.type === "Program" && (e.range = [0, i.length]);
	let c;
	return e = gi(e, {
		onEnter(h) {
			switch (ts(h, n, i), h.type) {
				case "ParenthesizedExpression": {
					let { expression: l } = h, m = w(h);
					if (l.type === "TypeCastExpression") return l.range = [m, I(h)], l;
					let S = !1;
					if (!s) {
						if (!c) {
							c = [];
							for (let p of n) ui(p) && c.push(I(p));
						}
						let k = si(0, c, (p) => p <= m);
						S = k && i.slice(k, m).trim().length === 0;
					}
					return S ? void 0 : (l.extra = {
						...l.extra,
						parenthesized: !0
					}, l);
				}
				case "TemplateLiteral":
					if (h.expressions.length !== h.quasis.length - 1) throw new Error("Malformed template literal.");
					break;
				case "TemplateElement":
					if (r === "flow" || r === "hermes" || r === "espree" || r === "typescript" || s) h.range = [w(h) + 1, I(h) - (h.tail ? 1 : 2)];
					break;
				case "TSParenthesizedType": return h.typeAnnotation;
				case "TopicReference":
					e.extra = {
						...e.extra,
						__isUsingHackPipeline: !0
					};
					break;
				case "TSUnionType":
				case "TSIntersectionType":
					if (h.types.length === 1) return h.types[0];
					break;
				case "TupleTypeAnnotation":
					h.types && !h.elementTypes && (h.elementTypes = h.types);
					break;
				case "ImportDeclaration":
					r === "hermes" && h.assertions && !h.attributes && (h.attributes = h.assertions, delete h.assertions);
					break;
			}
		},
		onLeave(h) {
			switch (h.type) {
				case "LogicalExpression":
					if (vi(h)) return st(h);
					break;
			}
		}
	}), e;
}
function vi(e) {
	return e.type === "LogicalExpression" && e.right.type === "LogicalExpression" && e.operator === e.right.operator;
}
function st(e) {
	return vi(e) ? st({
		type: "LogicalExpression",
		operator: e.operator,
		left: st({
			type: "LogicalExpression",
			operator: e.operator,
			left: e.left,
			right: e.right.left,
			range: [w(e.left), I(e.right.left)]
		}),
		right: e.right.right,
		range: [w(e), I(e)]
	}) : e;
}
function ts(e, t, i) {
	if (!tt(e)) return;
	let r = se(e);
	if (i[r - 1] !== ";") return;
	let s = ci({
		[we]: t,
		originalText: i
	});
	r -= 1;
	let n = s.slice(w(e), r), o = n.trimEnd();
	e.__contentEnd = r - (n.length - o.length);
}
function Ci(e) {
	let t = e.match(as);
	return t ? t[0].trimStart() : "";
}
function _i(e) {
	e = Z(0, e.replace(ss, "").replace(rs, ""), us, "$1");
	let i = "";
	for (; i !== e;) i = e, e = Z(0, e, os, `
$1 $2
`);
	e = e.replace(bi, "").trimEnd();
	let r = Object.create(null), s = Z(0, e, Si, "").replace(bi, "").trimEnd(), n;
	for (; n = Si.exec(e);) {
		let o = Z(0, n[2], ns, "");
		if (typeof r[n[1]] == "string" || Array.isArray(r[n[1]])) {
			let c = r[n[1]];
			r[n[1]] = [
				...hs,
				...Array.isArray(c) ? c : [c],
				o
			];
		} else r[n[1]] = o;
	}
	return {
		comments: s,
		pragmas: r
	};
}
function cs(e) {
	if (!e.startsWith("#!")) return "";
	let t = e.indexOf(`
`);
	return t === -1 ? e : e.slice(0, t);
}
function Ai(e) {
	let t = Ti(e);
	t && (e = e.slice(t.length + 1));
	let { pragmas: r, comments: s } = _i(Ci(e));
	return {
		shebang: t,
		text: e,
		pragmas: r,
		comments: s
	};
}
function wi(e) {
	let { pragmas: t } = Ai(e);
	return ki.some((i) => at(t, i));
}
function Ii(e) {
	let { pragmas: t } = Ai(e);
	return Ei.some((i) => at(t, i));
}
function ps(e) {
	return e = typeof e == "function" ? { parse: e } : e, {
		astFormat: "estree",
		hasPragma: wi,
		hasIgnorePragma: Ii,
		locStart: w,
		locEnd: I,
		...e
	};
}
function Oe(e) {
	if (typeof e == "string") {
		if (e = e.toLowerCase(), /\.(?:mjs|mts)$/i.test(e)) return Re;
		if (/\.(?:cjs|cts)$/i.test(e)) return Pi;
	}
}
function fs(e) {
	let { message: t, loc: i } = e;
	if (!i) return e;
	let { line: r, column: s } = i;
	return Te(t.replace(/ \(\d+:\d+\)$/, ""), {
		loc: { start: {
			line: r,
			column: s + 1
		} },
		cause: e
	});
}
function ms(e, t) {
	let i = ds(), r = [], s = i.parse(e, {
		...ls,
		sourceType: t,
		allowImportExportEverywhere: t === Re,
		onComment: r
	});
	return s.comments = r, s;
}
function xs(e, t) {
	let i = Oe(t?.filepath), r = (i ? [i] : Ve).map((n) => () => ms(e, n)), s;
	try {
		s = Ae(r);
	} catch ({ errors: [n] }) {
		throw fs(n);
	}
	return Ne(s, { text: e });
}
function vs() {
	return gs;
}
function bs(e = 5) {
	let t = e === "latest" ? vs() : e;
	if (typeof t != "number") throw new Error(`ecmaVersion must be a number or "latest". Received value of type ${typeof e} instead.`);
	if (t >= 2015 && (t -= 2009), !Ri.includes(t)) throw new Error("Invalid ecmaVersion.");
	return t;
}
function Ss(e = "script") {
	if (e === "script" || e === "module" || e === "commonjs") return e;
	throw new Error("Invalid sourceType.");
}
function Vi(e) {
	let t = bs(e.ecmaVersion), i = Ss(e.sourceType), r = e.range === !0, s = e.loc === !0;
	if (t !== 3 && e.allowReserved) throw new Error("`allowReserved` is only supported when ecmaVersion is 3");
	if (typeof e.allowReserved < "u" && typeof e.allowReserved != "boolean") throw new Error("`allowReserved`, when present, must be `true` or `false`");
	let n = t === 3 ? e.allowReserved || "never" : !1, o = e.ecmaFeatures || {}, c = e.sourceType === "commonjs" || !!o.globalReturn;
	if (i === "module" && t < 6) throw new Error("sourceType 'module' is not supported when ecmaVersion < 2015. Consider adding `{ ecmaVersion: 2015 }` to the parser options.");
	return Object.assign({}, e, {
		ecmaVersion: t,
		sourceType: i,
		ranges: r,
		locations: s,
		allowReserved: n,
		allowReturnOutsideFunction: c
	});
}
function Cs(e, t, i, r, s, n, o) {
	let c;
	e ? c = "Block" : o.slice(i, i + 2) === "#!" ? c = "Hashbang" : c = "Line";
	let h = {
		type: c,
		value: t
	};
	return typeof i == "number" && (h.start = i, h.end = r, h.range = [i, r]), typeof s == "object" && (h.loc = {
		start: s,
		end: n
	}), h;
}
function Di(e, t) {
	return new (_s.get(t))(t, e).parse();
}
function ks(e) {
	let { message: t, lineNumber: i, column: r } = e;
	return typeof i != "number" ? e : Te(t, {
		loc: { start: {
			line: i,
			column: r
		} },
		cause: e
	});
}
function Ts(e, t) {
	let i = Oe(t?.filepath), r = (i ? [i] : Ve).map((n) => () => Di(e, {
		...Es,
		sourceType: n
	})), s;
	try {
		s = Ae(r);
	} catch ({ errors: [n] }) {
		throw ks(n);
	}
	return Ne(s, {
		text: e,
		astType: "espree"
	});
}
var Bi, Me, Fi, ji, Ui, Gi, ct, Be, Wi, pt, ti, et, Mi, nt, qi, yt, Hi, gt, Fe, je, Ki, vt, Ji, Xi, _, O, L, Ke, a, R, zi, St, A, Ct, Qi, Yi, te, lt, ft, Zi, ue, be, We, dt, X, z, Je, Et, Xe, kt, Se, Tt, Q, he, At, Ce, xe, Qe, q, wt, It, Pt, T, M, P, tr, _e, d, Ye, ir, rr, oe, qe, Nt, B, F, E, ie, g, ar, ge, J, nr, Ee, ce, or, Vt, Ot, Dt, Mt, Bt, hr, pr, mt, Ft, jt, Ut, Gt, Wt, fr, qt, xt, me, Ue, f, ve, U, Jt, W, D, Ze, b, $t, Li, Te, re, Rr, si, we, Ie, Mr, Br, Fr, ai, jr, ni, Ur, tt, ae, oi, Gr, Wr, Z, hi, Jr, pi, di, le, Yr, mi, u, yi, gi, Ne, at, rs, ss, as, ns, bi, os, Si, us, hs, Ei, ki, Ti, Le, Re, Pi, Ve, ls, Ni, ds, ys, ht, Oi, Ri, gs, $, ot, ut, _s, Es, As, ws;
//#endregion
__esmMin((() => {
	Bi = Object.create;
	Me = Object.defineProperty;
	Fi = Object.getOwnPropertyDescriptor;
	ji = Object.getOwnPropertyNames;
	Ui = Object.getPrototypeOf;
	Gi = Object.prototype.hasOwnProperty;
	ct = (e, t) => () => {
		try {
			return t || e((t = { exports: {} }).exports, t), t.exports;
		} catch (i) {
			throw t = 0, i;
		}
	};
	Be = (e, t) => {
		for (var i in t) Me(e, i, {
			get: t[i],
			enumerable: !0
		});
	};
	Wi = (e, t, i, r) => {
		if (t && typeof t == "object" || typeof t == "function") for (let s of ji(t)) !Gi.call(e, s) && s !== i && Me(e, s, {
			get: () => t[s],
			enumerable: !(r = Fi(t, s)) || r.enumerable
		});
		return e;
	};
	pt = (e, t, i) => (i = e != null ? Bi(Ui(e)) : {}, Wi(t || !e || !e.__esModule ? Me(i, "default", {
		value: e,
		enumerable: !0
	}) : i, e));
	ti = ct((Ps, ei) => {
		ei.exports = {};
	});
	et = ct((Ns, $e) => {
		"use strict";
		var wr = ti(), Ir = /^[\da-fA-F]+$/, Pr = /^\d+$/, ii = /* @__PURE__ */ new WeakMap();
		function ri(e) {
			e = e.Parser.acorn || e;
			let t = ii.get(e);
			if (!t) {
				let i = e.tokTypes, r = e.TokContext, s = e.TokenType, n = new r("<tag", !1), o = new r("</tag", !1), c = new r("<tag>...</tag>", !0, !0), h = {
					tc_oTag: n,
					tc_cTag: o,
					tc_expr: c
				}, l = {
					jsxName: new s("jsxName"),
					jsxText: new s("jsxText", { beforeExpr: !0 }),
					jsxTagStart: new s("jsxTagStart", { startsExpr: !0 }),
					jsxTagEnd: new s("jsxTagEnd")
				};
				l.jsxTagStart.updateContext = function() {
					this.context.push(c), this.context.push(n), this.exprAllowed = !1;
				}, l.jsxTagEnd.updateContext = function(m) {
					let S = this.context.pop();
					S === n && m === i.slash || S === o ? (this.context.pop(), this.exprAllowed = this.curContext() === c) : this.exprAllowed = !0;
				}, t = {
					tokContexts: h,
					tokTypes: l
				}, ii.set(e, t);
			}
			return t;
		}
		function pe(e) {
			if (!e) return e;
			if (e.type === "JSXIdentifier") return e.name;
			if (e.type === "JSXNamespacedName") return e.namespace.name + ":" + e.name.name;
			if (e.type === "JSXMemberExpression") return pe(e.object) + "." + pe(e.property);
		}
		$e.exports = function(e) {
			return e = e || {}, function(t) {
				return Nr({
					allowNamespaces: e.allowNamespaces !== !1,
					allowNamespacedObjects: !!e.allowNamespacedObjects
				}, t);
			};
		};
		Object.defineProperty($e.exports, "tokTypes", {
			get: function() {
				return ri(void 0).tokTypes;
			},
			configurable: !0,
			enumerable: !0
		});
		function Nr(e, t) {
			let i = t.acorn || void 0, r = ri(i), s = i.tokTypes, n = r.tokTypes, o = i.tokContexts, c = r.tokContexts.tc_oTag, h = r.tokContexts.tc_cTag, l = r.tokContexts.tc_expr, m = i.isNewLine, S = i.isIdentifierStart, k = i.isIdentifierChar;
			return class extends t {
				static get acornJsx() {
					return r;
				}
				jsx_readToken() {
					let p = "", x = this.pos;
					for (;;) {
						this.pos >= this.input.length && this.raise(this.start, "Unterminated JSX contents");
						let y = this.input.charCodeAt(this.pos);
						switch (y) {
							case 60:
							case 123: return this.pos === this.start ? y === 60 && this.exprAllowed ? (++this.pos, this.finishToken(n.jsxTagStart)) : this.getTokenFromCode(y) : (p += this.input.slice(x, this.pos), this.finishToken(n.jsxText, p));
							case 38:
								p += this.input.slice(x, this.pos), p += this.jsx_readEntity(), x = this.pos;
								break;
							case 62:
							case 125: this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (y === 62 ? "&gt;" : "&rbrace;") + "` or `{\"" + this.input[this.pos] + "\"}`?");
							default: m(y) ? (p += this.input.slice(x, this.pos), p += this.jsx_readNewLine(!0), x = this.pos) : ++this.pos;
						}
					}
				}
				jsx_readNewLine(p) {
					let x = this.input.charCodeAt(this.pos), y;
					return ++this.pos, x === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, y = p ? `
` : `\r
`) : y = String.fromCharCode(x), this.options.locations && (++this.curLine, this.lineStart = this.pos), y;
				}
				jsx_readString(p) {
					let x = "", y = ++this.pos;
					for (;;) {
						this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
						let v = this.input.charCodeAt(this.pos);
						if (v === p) break;
						v === 38 ? (x += this.input.slice(y, this.pos), x += this.jsx_readEntity(), y = this.pos) : m(v) ? (x += this.input.slice(y, this.pos), x += this.jsx_readNewLine(!1), y = this.pos) : ++this.pos;
					}
					return x += this.input.slice(y, this.pos++), this.finishToken(s.string, x);
				}
				jsx_readEntity() {
					let p = "", x = 0, y, v = this.input[this.pos];
					v !== "&" && this.raise(this.pos, "Entity must start with an ampersand");
					let N = ++this.pos;
					for (; this.pos < this.input.length && x++ < 10;) {
						if (v = this.input[this.pos++], v === ";") {
							p[0] === "#" ? p[1] === "x" ? (p = p.substr(2), Ir.test(p) && (y = String.fromCharCode(parseInt(p, 16)))) : (p = p.substr(1), Pr.test(p) && (y = String.fromCharCode(parseInt(p, 10)))) : y = wr[p];
							break;
						}
						p += v;
					}
					return y || (this.pos = N, "&");
				}
				jsx_readWord() {
					let p, x = this.pos;
					do
						p = this.input.charCodeAt(++this.pos);
					while (k(p) || p === 45);
					return this.finishToken(n.jsxName, this.input.slice(x, this.pos));
				}
				jsx_parseIdentifier() {
					let p = this.startNode();
					return this.type === n.jsxName ? p.name = this.value : this.type.keyword ? p.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(p, "JSXIdentifier");
				}
				jsx_parseNamespacedName() {
					let p = this.start, x = this.startLoc, y = this.jsx_parseIdentifier();
					if (!e.allowNamespaces || !this.eat(s.colon)) return y;
					var v = this.startNodeAt(p, x);
					return v.namespace = y, v.name = this.jsx_parseIdentifier(), this.finishNode(v, "JSXNamespacedName");
				}
				jsx_parseElementName() {
					if (this.type === n.jsxTagEnd) return "";
					let p = this.start, x = this.startLoc, y = this.jsx_parseNamespacedName();
					for (this.type === s.dot && y.type === "JSXNamespacedName" && !e.allowNamespacedObjects && this.unexpected(); this.eat(s.dot);) {
						let v = this.startNodeAt(p, x);
						v.object = y, v.property = this.jsx_parseIdentifier(), y = this.finishNode(v, "JSXMemberExpression");
					}
					return y;
				}
				jsx_parseAttributeValue() {
					switch (this.type) {
						case s.braceL:
							let p = this.jsx_parseExpressionContainer();
							return p.expression.type === "JSXEmptyExpression" && this.raise(p.start, "JSX attributes must only be assigned a non-empty expression"), p;
						case n.jsxTagStart:
						case s.string: return this.parseExprAtom();
						default: this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
					}
				}
				jsx_parseEmptyExpression() {
					let p = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
					return this.finishNodeAt(p, "JSXEmptyExpression", this.start, this.startLoc);
				}
				jsx_parseExpressionContainer() {
					let p = this.startNode();
					return this.next(), p.expression = this.type === s.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(s.braceR), this.finishNode(p, "JSXExpressionContainer");
				}
				jsx_parseAttribute() {
					let p = this.startNode();
					return this.eat(s.braceL) ? (this.expect(s.ellipsis), p.argument = this.parseMaybeAssign(), this.expect(s.braceR), this.finishNode(p, "JSXSpreadAttribute")) : (p.name = this.jsx_parseNamespacedName(), p.value = this.eat(s.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(p, "JSXAttribute"));
				}
				jsx_parseOpeningElementAt(p, x) {
					let y = this.startNodeAt(p, x);
					y.attributes = [];
					let v = this.jsx_parseElementName();
					for (v && (y.name = v); this.type !== s.slash && this.type !== n.jsxTagEnd;) y.attributes.push(this.jsx_parseAttribute());
					return y.selfClosing = this.eat(s.slash), this.expect(n.jsxTagEnd), this.finishNode(y, v ? "JSXOpeningElement" : "JSXOpeningFragment");
				}
				jsx_parseClosingElementAt(p, x) {
					let y = this.startNodeAt(p, x), v = this.jsx_parseElementName();
					return v && (y.name = v), this.expect(n.jsxTagEnd), this.finishNode(y, v ? "JSXClosingElement" : "JSXClosingFragment");
				}
				jsx_parseElementAt(p, x) {
					let y = this.startNodeAt(p, x), v = [], N = this.jsx_parseOpeningElementAt(p, x), de = null;
					if (!N.selfClosing) {
						e: for (;;) switch (this.type) {
							case n.jsxTagStart:
								if (p = this.start, x = this.startLoc, this.next(), this.eat(s.slash)) {
									de = this.jsx_parseClosingElementAt(p, x);
									break e;
								}
								v.push(this.jsx_parseElementAt(p, x));
								break;
							case n.jsxText:
								v.push(this.parseExprAtom());
								break;
							case s.braceL:
								v.push(this.jsx_parseExpressionContainer());
								break;
							default: this.unexpected();
						}
						pe(de.name) !== pe(N.name) && this.raise(de.start, "Expected corresponding JSX closing tag for <" + pe(N.name) + ">");
					}
					let De = N.name ? "Element" : "Fragment";
					return y["opening" + De] = N, y["closing" + De] = de, y.children = v, this.type === s.relational && this.value === "<" && this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag"), this.finishNode(y, "JSX" + De);
				}
				jsx_parseText() {
					let p = this.parseLiteral(this.value);
					return p.type = "JSXText", p;
				}
				jsx_parseElement() {
					let p = this.start, x = this.startLoc;
					return this.next(), this.jsx_parseElementAt(p, x);
				}
				parseExprAtom(p) {
					return this.type === n.jsxText ? this.jsx_parseText() : this.type === n.jsxTagStart ? this.jsx_parseElement() : super.parseExprAtom(p);
				}
				readToken(p) {
					let x = this.curContext();
					if (x === l) return this.jsx_readToken();
					if (x === c || x === h) {
						if (S(p)) return this.jsx_readWord();
						if (p == 62) return ++this.pos, this.finishToken(n.jsxTagEnd);
						if ((p === 34 || p === 39) && x == c) return this.jsx_readString(p);
					}
					return p === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33 ? (++this.pos, this.finishToken(n.jsxTagStart)) : super.readToken(p);
				}
				updateContext(p) {
					if (this.type == s.braceL) {
						var x = this.curContext();
						x == c ? this.context.push(o.b_expr) : x == l ? this.context.push(o.b_tmpl) : super.updateContext(p), this.exprAllowed = !0;
					} else if (this.type === s.slash && p === n.jsxTagStart) this.context.length -= 2, this.context.push(h), this.exprAllowed = !1;
					else return super.updateContext(p);
				}
			};
		}
	});
	Mi = {};
	Be(Mi, { parsers: () => ws });
	nt = {};
	Be(nt, { acorn: () => ys });
	qi = [
		509,
		0,
		227,
		0,
		150,
		4,
		294,
		9,
		1368,
		2,
		2,
		1,
		6,
		3,
		41,
		2,
		5,
		0,
		166,
		1,
		574,
		3,
		9,
		9,
		7,
		9,
		32,
		4,
		318,
		1,
		78,
		5,
		71,
		10,
		50,
		3,
		123,
		2,
		54,
		14,
		32,
		10,
		3,
		1,
		11,
		3,
		46,
		10,
		8,
		0,
		46,
		9,
		7,
		2,
		37,
		13,
		2,
		9,
		6,
		1,
		45,
		0,
		13,
		2,
		49,
		13,
		9,
		3,
		2,
		11,
		83,
		11,
		7,
		0,
		3,
		0,
		158,
		11,
		6,
		9,
		7,
		3,
		56,
		1,
		2,
		6,
		3,
		1,
		3,
		2,
		10,
		0,
		11,
		1,
		3,
		6,
		4,
		4,
		68,
		8,
		2,
		0,
		3,
		0,
		2,
		3,
		2,
		4,
		2,
		0,
		15,
		1,
		83,
		17,
		10,
		9,
		5,
		0,
		82,
		19,
		13,
		9,
		214,
		6,
		3,
		8,
		28,
		1,
		83,
		16,
		16,
		9,
		82,
		12,
		9,
		9,
		7,
		19,
		58,
		14,
		5,
		9,
		243,
		14,
		166,
		9,
		71,
		5,
		2,
		1,
		3,
		3,
		2,
		0,
		2,
		1,
		13,
		9,
		120,
		6,
		3,
		6,
		4,
		0,
		29,
		9,
		41,
		6,
		2,
		3,
		9,
		0,
		10,
		10,
		47,
		15,
		199,
		7,
		137,
		9,
		54,
		7,
		2,
		7,
		17,
		9,
		57,
		21,
		2,
		13,
		123,
		5,
		4,
		0,
		2,
		1,
		2,
		6,
		2,
		0,
		9,
		9,
		49,
		4,
		2,
		1,
		2,
		4,
		9,
		9,
		55,
		9,
		266,
		3,
		10,
		1,
		2,
		0,
		49,
		6,
		4,
		4,
		14,
		10,
		5350,
		0,
		7,
		14,
		11465,
		27,
		2343,
		9,
		87,
		9,
		39,
		4,
		60,
		6,
		26,
		9,
		535,
		9,
		470,
		0,
		2,
		54,
		8,
		3,
		82,
		0,
		12,
		1,
		19628,
		1,
		4178,
		9,
		519,
		45,
		3,
		22,
		543,
		4,
		4,
		5,
		9,
		7,
		3,
		6,
		31,
		3,
		149,
		2,
		1418,
		49,
		513,
		54,
		5,
		49,
		9,
		0,
		15,
		0,
		23,
		4,
		2,
		14,
		1361,
		6,
		2,
		16,
		3,
		6,
		2,
		1,
		2,
		4,
		101,
		0,
		161,
		6,
		10,
		9,
		357,
		0,
		62,
		13,
		499,
		13,
		245,
		1,
		2,
		9,
		233,
		0,
		3,
		0,
		8,
		1,
		6,
		0,
		475,
		6,
		110,
		6,
		6,
		9,
		4759,
		9,
		787719,
		239
	];
	yt = [
		0,
		11,
		2,
		25,
		2,
		18,
		2,
		1,
		2,
		14,
		3,
		13,
		35,
		122,
		70,
		52,
		268,
		28,
		4,
		48,
		48,
		31,
		14,
		29,
		6,
		37,
		11,
		29,
		3,
		35,
		5,
		7,
		2,
		4,
		43,
		157,
		19,
		35,
		5,
		35,
		5,
		39,
		9,
		51,
		13,
		10,
		2,
		14,
		2,
		6,
		2,
		1,
		2,
		10,
		2,
		14,
		2,
		6,
		2,
		1,
		4,
		51,
		13,
		310,
		10,
		21,
		11,
		7,
		25,
		5,
		2,
		41,
		2,
		8,
		70,
		5,
		3,
		0,
		2,
		43,
		2,
		1,
		4,
		0,
		3,
		22,
		11,
		22,
		10,
		30,
		66,
		18,
		2,
		1,
		11,
		21,
		11,
		25,
		7,
		25,
		39,
		55,
		7,
		1,
		65,
		0,
		16,
		3,
		2,
		2,
		2,
		28,
		43,
		28,
		4,
		28,
		36,
		7,
		2,
		27,
		28,
		53,
		11,
		21,
		11,
		18,
		14,
		17,
		111,
		72,
		56,
		50,
		14,
		50,
		14,
		35,
		39,
		27,
		10,
		22,
		251,
		41,
		7,
		1,
		17,
		5,
		57,
		28,
		11,
		0,
		9,
		21,
		43,
		17,
		47,
		20,
		28,
		22,
		13,
		52,
		58,
		1,
		3,
		0,
		14,
		44,
		33,
		24,
		27,
		35,
		30,
		0,
		3,
		0,
		9,
		34,
		4,
		0,
		13,
		47,
		15,
		3,
		22,
		0,
		2,
		0,
		36,
		17,
		2,
		24,
		20,
		1,
		64,
		6,
		2,
		0,
		2,
		3,
		2,
		14,
		2,
		9,
		8,
		46,
		39,
		7,
		3,
		1,
		3,
		21,
		2,
		6,
		2,
		1,
		2,
		4,
		4,
		0,
		19,
		0,
		13,
		4,
		31,
		9,
		2,
		0,
		3,
		0,
		2,
		37,
		2,
		0,
		26,
		0,
		2,
		0,
		45,
		52,
		19,
		3,
		21,
		2,
		31,
		47,
		21,
		1,
		2,
		0,
		185,
		46,
		42,
		3,
		37,
		47,
		21,
		0,
		60,
		42,
		14,
		0,
		72,
		26,
		38,
		6,
		186,
		43,
		117,
		63,
		32,
		7,
		3,
		0,
		3,
		7,
		2,
		1,
		2,
		23,
		16,
		0,
		2,
		0,
		95,
		7,
		3,
		38,
		17,
		0,
		2,
		0,
		29,
		0,
		11,
		39,
		8,
		0,
		22,
		0,
		12,
		45,
		20,
		0,
		19,
		72,
		200,
		32,
		32,
		8,
		2,
		36,
		18,
		0,
		50,
		29,
		113,
		6,
		2,
		1,
		2,
		37,
		22,
		0,
		26,
		5,
		2,
		1,
		2,
		31,
		15,
		0,
		24,
		43,
		261,
		18,
		16,
		0,
		2,
		12,
		2,
		33,
		125,
		0,
		80,
		921,
		103,
		110,
		18,
		195,
		2637,
		96,
		16,
		1071,
		18,
		5,
		26,
		3994,
		6,
		582,
		6842,
		29,
		1763,
		568,
		8,
		30,
		18,
		78,
		18,
		29,
		19,
		47,
		17,
		3,
		32,
		20,
		6,
		18,
		433,
		44,
		212,
		63,
		33,
		24,
		3,
		24,
		45,
		74,
		6,
		0,
		67,
		12,
		65,
		1,
		2,
		0,
		15,
		4,
		10,
		7381,
		42,
		31,
		98,
		114,
		8702,
		3,
		2,
		6,
		2,
		1,
		2,
		290,
		16,
		0,
		30,
		2,
		3,
		0,
		15,
		3,
		9,
		395,
		2309,
		106,
		6,
		12,
		4,
		8,
		8,
		9,
		5991,
		84,
		2,
		70,
		2,
		1,
		3,
		0,
		3,
		1,
		3,
		3,
		2,
		11,
		2,
		0,
		2,
		6,
		2,
		64,
		2,
		3,
		3,
		7,
		2,
		6,
		2,
		27,
		2,
		3,
		2,
		4,
		2,
		0,
		4,
		6,
		2,
		339,
		3,
		24,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		7,
		1845,
		30,
		7,
		5,
		262,
		61,
		147,
		44,
		11,
		6,
		17,
		0,
		322,
		29,
		19,
		43,
		485,
		27,
		229,
		29,
		3,
		0,
		208,
		30,
		2,
		2,
		2,
		1,
		2,
		6,
		3,
		4,
		10,
		1,
		225,
		6,
		2,
		3,
		2,
		1,
		2,
		14,
		2,
		196,
		60,
		67,
		8,
		0,
		1205,
		3,
		2,
		26,
		2,
		1,
		2,
		0,
		3,
		0,
		2,
		9,
		2,
		3,
		2,
		0,
		2,
		0,
		7,
		0,
		5,
		0,
		2,
		0,
		2,
		0,
		2,
		2,
		2,
		1,
		2,
		0,
		3,
		0,
		2,
		0,
		2,
		0,
		2,
		0,
		2,
		0,
		2,
		1,
		2,
		0,
		3,
		3,
		2,
		6,
		2,
		3,
		2,
		3,
		2,
		0,
		2,
		9,
		2,
		16,
		6,
		2,
		2,
		4,
		2,
		16,
		4421,
		42719,
		33,
		4381,
		3,
		5773,
		3,
		7472,
		16,
		621,
		2467,
		541,
		1507,
		4938,
		6,
		8489
	];
	Hi = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･";
	gt = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
	Fe = {
		3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
		5: "class enum extends super const export import",
		6: "enum",
		strict: "implements interface let package private protected public static yield",
		strictBind: "eval arguments"
	};
	je = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
	Ki = {
		5: je,
		"5module": je + " export import",
		6: je + " const class extends export import super"
	};
	vt = /^in(stanceof)?$/;
	Ji = new RegExp("[" + gt + "]");
	Xi = new RegExp("[" + gt + Hi + "]");
	_ = function(t, i) {
		i === void 0 && (i = {}), this.label = t, this.keyword = i.keyword, this.beforeExpr = !!i.beforeExpr, this.startsExpr = !!i.startsExpr, this.isLoop = !!i.isLoop, this.isAssign = !!i.isAssign, this.prefix = !!i.prefix, this.postfix = !!i.postfix, this.binop = i.binop || null, this.updateContext = null;
	};
	O = { beforeExpr: !0 };
	L = { startsExpr: !0 };
	Ke = {};
	a = {
		num: new _("num", L),
		regexp: new _("regexp", L),
		string: new _("string", L),
		name: new _("name", L),
		privateId: new _("privateId", L),
		eof: new _("eof"),
		bracketL: new _("[", {
			beforeExpr: !0,
			startsExpr: !0
		}),
		bracketR: new _("]"),
		braceL: new _("{", {
			beforeExpr: !0,
			startsExpr: !0
		}),
		braceR: new _("}"),
		parenL: new _("(", {
			beforeExpr: !0,
			startsExpr: !0
		}),
		parenR: new _(")"),
		comma: new _(",", O),
		semi: new _(";", O),
		colon: new _(":", O),
		dot: new _("."),
		question: new _("?", O),
		questionDot: new _("?."),
		arrow: new _("=>", O),
		template: new _("template"),
		invalidTemplate: new _("invalidTemplate"),
		ellipsis: new _("...", O),
		backQuote: new _("`", L),
		dollarBraceL: new _("${", {
			beforeExpr: !0,
			startsExpr: !0
		}),
		eq: new _("=", {
			beforeExpr: !0,
			isAssign: !0
		}),
		assign: new _("_=", {
			beforeExpr: !0,
			isAssign: !0
		}),
		incDec: new _("++/--", {
			prefix: !0,
			postfix: !0,
			startsExpr: !0
		}),
		prefix: new _("!/~", {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		}),
		logicalOR: V("||", 1),
		logicalAND: V("&&", 2),
		bitwiseOR: V("|", 3),
		bitwiseXOR: V("^", 4),
		bitwiseAND: V("&", 5),
		equality: V("==/!=/===/!==", 6),
		relational: V("</>/<=/>=", 7),
		bitShift: V("<</>>/>>>", 8),
		plusMin: new _("+/-", {
			beforeExpr: !0,
			binop: 9,
			prefix: !0,
			startsExpr: !0
		}),
		modulo: V("%", 10),
		star: V("*", 10),
		slash: V("/", 10),
		starstar: new _("**", { beforeExpr: !0 }),
		coalesce: V("??", 1),
		_break: C("break"),
		_case: C("case", O),
		_catch: C("catch"),
		_continue: C("continue"),
		_debugger: C("debugger"),
		_default: C("default", O),
		_do: C("do", {
			isLoop: !0,
			beforeExpr: !0
		}),
		_else: C("else", O),
		_finally: C("finally"),
		_for: C("for", { isLoop: !0 }),
		_function: C("function", L),
		_if: C("if"),
		_return: C("return", O),
		_switch: C("switch"),
		_throw: C("throw", O),
		_try: C("try"),
		_var: C("var"),
		_const: C("const"),
		_while: C("while", { isLoop: !0 }),
		_with: C("with"),
		_new: C("new", {
			beforeExpr: !0,
			startsExpr: !0
		}),
		_this: C("this", L),
		_super: C("super", L),
		_class: C("class", L),
		_extends: C("extends", O),
		_export: C("export"),
		_import: C("import", L),
		_null: C("null", L),
		_true: C("true", L),
		_false: C("false", L),
		_in: C("in", {
			beforeExpr: !0,
			binop: 7
		}),
		_instanceof: C("instanceof", {
			beforeExpr: !0,
			binop: 7
		}),
		_typeof: C("typeof", {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		}),
		_void: C("void", {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		}),
		_delete: C("delete", {
			beforeExpr: !0,
			prefix: !0,
			startsExpr: !0
		})
	};
	R = /\r\n?|\n|\u2028|\u2029/;
	zi = new RegExp(R.source, "g");
	St = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
	A = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
	Ct = Object.prototype;
	Qi = Ct.hasOwnProperty;
	Yi = Ct.toString;
	te = Object.hasOwn || (function(e, t) {
		return Qi.call(e, t);
	});
	lt = Array.isArray || (function(e) {
		return Yi.call(e) === "[object Array]";
	});
	ft = Object.create(null);
	Zi = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
	ue = function(t, i) {
		this.line = t, this.column = i;
	};
	ue.prototype.offset = function(t) {
		return new ue(this.line, this.column + t);
	};
	be = function(t, i, r) {
		this.start = i, this.end = r, t.sourceFile !== null && (this.source = t.sourceFile);
	};
	We = {
		ecmaVersion: null,
		sourceType: "script",
		strict: !1,
		onInsertedSemicolon: null,
		onTrailingComma: null,
		allowReserved: null,
		allowReturnOutsideFunction: !1,
		allowImportExportEverywhere: !1,
		allowAwaitOutsideFunction: null,
		allowSuperOutsideMethod: null,
		allowHashBang: !1,
		checkPrivateFields: !0,
		locations: !1,
		onToken: null,
		onComment: null,
		ranges: !1,
		program: null,
		sourceFile: null,
		directSourceFile: null,
		preserveParens: !1
	};
	dt = !1;
	X = 1;
	z = 2;
	Je = 4;
	Et = 8;
	Xe = 16;
	kt = 32;
	Se = 64;
	Tt = 128;
	Q = 256;
	he = 512;
	At = 1024;
	Ce = X | z | Q;
	xe = 0;
	Qe = 1;
	q = 2;
	wt = 3;
	It = 4;
	Pt = 5;
	T = function(t, i, r) {
		this.options = t = $i(t), this.sourceFile = t.sourceFile, this.keywords = H(Ki[t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5]);
		var s = "";
		t.allowReserved !== !0 && (s = Fe[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3], t.sourceType === "module" && (s += " await")), this.reservedWords = H(s);
		var n = (s ? s + " " : "") + Fe.strict;
		this.reservedWordsStrict = H(n), this.reservedWordsStrictBind = H(n + " " + Fe.strictBind), this.input = String(i), this.containsEsc = !1, r ? (this.pos = r, this.lineStart = this.input.lastIndexOf(`
`, r - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(R).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = a.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = t.sourceType === "module", this.strict = this.inModule || t.strict === !0 || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && t.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(this.options.sourceType === "commonjs" ? z : X), this.regexpState = null, this.privateNameStack = [];
	};
	M = {
		inFunction: { configurable: !0 },
		inGenerator: { configurable: !0 },
		inAsync: { configurable: !0 },
		canAwait: { configurable: !0 },
		allowReturn: { configurable: !0 },
		allowSuper: { configurable: !0 },
		allowDirectSuper: { configurable: !0 },
		treatFunctionsAsVar: { configurable: !0 },
		allowNewDotTarget: { configurable: !0 },
		allowUsing: { configurable: !0 },
		inClassStaticBlock: { configurable: !0 }
	};
	T.prototype.parse = function() {
		var t = this, i = this.options.program || this.startNode();
		return this.nextToken(), this.catchStackOverflow(function() {
			return t.parseTopLevel(i);
		});
	};
	M.inFunction.get = function() {
		return (this.currentVarScope().flags & z) > 0;
	};
	M.inGenerator.get = function() {
		return (this.currentVarScope().flags & Et) > 0;
	};
	M.inAsync.get = function() {
		return (this.currentVarScope().flags & Je) > 0;
	};
	M.canAwait.get = function() {
		for (var e = this.scopeStack.length - 1; e >= 0; e--) {
			var i = this.scopeStack[e].flags;
			if (i & (Q | he)) return !1;
			if (i & z) return (i & Je) > 0;
		}
		return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
	};
	M.allowReturn.get = function() {
		return !!(this.inFunction || this.options.allowReturnOutsideFunction && this.currentVarScope().flags & X);
	};
	M.allowSuper.get = function() {
		return (this.currentThisScope().flags & Se) > 0 || this.options.allowSuperOutsideMethod;
	};
	M.allowDirectSuper.get = function() {
		return (this.currentThisScope().flags & Tt) > 0;
	};
	M.treatFunctionsAsVar.get = function() {
		return this.treatFunctionsAsVarInScope(this.currentScope());
	};
	M.allowNewDotTarget.get = function() {
		for (var e = this.scopeStack.length - 1; e >= 0; e--) {
			var i = this.scopeStack[e].flags;
			if (i & (Q | he) || i & z && !(i & Xe)) return !0;
		}
		return !1;
	};
	M.allowUsing.get = function() {
		var t = this.currentScope().flags;
		return !(t & At || !this.inModule && t & X);
	};
	M.inClassStaticBlock.get = function() {
		return (this.currentVarScope().flags & Q) > 0;
	};
	T.extend = function() {
		for (var t = [], i = arguments.length; i--;) t[i] = arguments[i];
		for (var r = this, s = 0; s < t.length; s++) r = t[s](r);
		return r;
	};
	T.parse = function(t, i) {
		return new this(i, t).parse();
	};
	T.parseExpressionAt = function(t, i, r) {
		var s = new this(r, t, i);
		return s.nextToken(), s.parseExpression();
	};
	T.tokenizer = function(t, i) {
		return new this(i, t);
	};
	Object.defineProperties(T.prototype, M);
	P = T.prototype;
	tr = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
	P.strictDirective = function(e) {
		if (this.options.ecmaVersion < 5) return !1;
		for (;;) {
			A.lastIndex = e, e += A.exec(this.input)[0].length;
			var t = tr.exec(this.input.slice(e));
			if (!t) return !1;
			if ((t[1] || t[2]) === "use strict") {
				A.lastIndex = e + t[0].length;
				var i = A.exec(this.input), r = i.index + i[0].length, s = this.input.charAt(r);
				return s === ";" || s === "}" || R.test(i[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(s) || s === "!" && this.input.charAt(r + 1) === "=");
			}
			e += t[0].length, A.lastIndex = e, e += A.exec(this.input)[0].length, this.input[e] === ";" && e++;
		}
	};
	P.eat = function(e) {
		return this.type === e ? (this.next(), !0) : !1;
	};
	P.isContextual = function(e) {
		return this.type === a.name && this.value === e && !this.containsEsc;
	};
	P.eatContextual = function(e) {
		return this.isContextual(e) ? (this.next(), !0) : !1;
	};
	P.catchStackOverflow = function(e) {
		try {
			return e();
		} catch (t) {
			if (t instanceof Error && (/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message) || /\btoo much recursion\b/i.test(t.message))) this.raise(this.start, "Not enough stack space to parse input");
			else throw t;
		}
	};
	P.expectContextual = function(e) {
		this.eatContextual(e) || this.unexpected();
	};
	P.canInsertSemicolon = function() {
		return this.type === a.eof || this.type === a.braceR || R.test(this.input.slice(this.lastTokEnd, this.start));
	};
	P.insertSemicolon = function() {
		if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
	};
	P.semicolon = function() {
		!this.eat(a.semi) && !this.insertSemicolon() && this.unexpected();
	};
	P.afterTrailingComma = function(e, t) {
		if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
	};
	P.expect = function(e) {
		this.eat(e) || this.unexpected();
	};
	P.unexpected = function(e) {
		this.raise(e ?? this.start, "Unexpected token");
	};
	_e = function() {
		this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
	};
	P.checkPatternErrors = function(e, t) {
		if (e) {
			e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
			var i = t ? e.parenthesizedAssign : e.parenthesizedBind;
			i > -1 && this.raiseRecoverable(i, t ? "Assigning to rvalue" : "Parenthesized pattern");
		}
	};
	P.checkExpressionErrors = function(e, t) {
		if (!e) return !1;
		var i = e.shorthandAssign, r = e.doubleProto;
		if (!t) return i >= 0 || r >= 0;
		i >= 0 && this.raise(i, "Shorthand property assignments are valid only in destructuring patterns"), r >= 0 && this.raiseRecoverable(r, "Redefinition of __proto__ property");
	};
	P.checkYieldAwaitInDefaultParams = function() {
		this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
	};
	P.isSimpleAssignTarget = function(e) {
		return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
	};
	d = T.prototype;
	d.parseTopLevel = function(e) {
		var t = Object.create(null);
		for (e.body || (e.body = []); this.type !== a.eof;) {
			var i = this.parseStatement(null, !0, t);
			e.body.push(i);
		}
		if (this.inModule) for (var r = 0, s = Object.keys(this.undefinedExports); r < s.length; r += 1) {
			var n = s[r];
			this.raiseRecoverable(this.undefinedExports[n].start, "Export '" + n + "' is not defined");
		}
		return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType === "commonjs" ? "script" : this.options.sourceType, this.finishNode(e, "Program");
	};
	Ye = { kind: "loop" };
	ir = { kind: "switch" };
	d.isLet = function(e) {
		if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
		A.lastIndex = this.pos;
		var t = A.exec(this.input), i = this.pos + t[0].length, r = this.fullCharCodeAt(i);
		if (r === 91 || r === 92) return !0;
		if (e) return !1;
		if (r === 123) return !0;
		if (j(r)) {
			var s = i;
			do
				i += r <= 65535 ? 1 : 2;
			while (K(r = this.fullCharCodeAt(i)));
			if (r === 92) return !0;
			var n = this.input.slice(s, i);
			if (!vt.test(n)) return !0;
		}
		return !1;
	};
	d.isAsyncFunction = function() {
		if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
		A.lastIndex = this.pos;
		var e = A.exec(this.input), t = this.pos + e[0].length, i;
		return !R.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(K(i = this.fullCharCodeAt(t + 8)) || i === 92));
	};
	d.isUsingKeyword = function(e, t) {
		if (this.options.ecmaVersion < 17 || !this.isContextual(e ? "await" : "using")) return !1;
		A.lastIndex = this.pos;
		var i = A.exec(this.input), r = this.pos + i[0].length;
		if (R.test(this.input.slice(this.pos, r))) return !1;
		if (e) {
			var s = r + 5, n;
			if (this.input.slice(r, s) !== "using" || s === this.input.length || K(n = this.fullCharCodeAt(s)) || n === 92) return !1;
			A.lastIndex = s;
			var o = A.exec(this.input);
			if (r = s + o[0].length, o && R.test(this.input.slice(s, r))) return !1;
		}
		var c = this.fullCharCodeAt(r);
		if (!j(c) && c !== 92) return !1;
		var h = r;
		do
			r += c <= 65535 ? 1 : 2;
		while (K(c = this.fullCharCodeAt(r)));
		if (c === 92) return !0;
		var l = this.input.slice(h, r);
		if (vt.test(l)) return !1;
		if (t && !e && l === "of") {
			A.lastIndex = r;
			var m = A.exec(this.input);
			if (r = r + m[0].length, this.input.charCodeAt(r) !== 61 || (c = this.input.charCodeAt(r + 1)) === 61 || c === 62) return !1;
		}
		return !0;
	};
	d.isAwaitUsing = function(e) {
		return this.isUsingKeyword(!0, e);
	};
	d.isUsing = function(e) {
		return this.isUsingKeyword(!1, e);
	};
	d.parseStatement = function(e, t, i) {
		var r = this.type, s = this.startNode(), n;
		switch (this.isLet(e) && (r = a._var, n = "let"), r) {
			case a._break:
			case a._continue: return this.parseBreakContinueStatement(s, r.keyword);
			case a._debugger: return this.parseDebuggerStatement(s);
			case a._do: return this.parseDoStatement(s);
			case a._for: return this.parseForStatement(s);
			case a._function: return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(s, !1, !e);
			case a._class: return e && this.unexpected(), this.parseClass(s, !0);
			case a._if: return this.parseIfStatement(s);
			case a._return: return this.parseReturnStatement(s);
			case a._switch: return this.parseSwitchStatement(s);
			case a._throw: return this.parseThrowStatement(s);
			case a._try: return this.parseTryStatement(s);
			case a._const:
			case a._var: return n = n || this.value, e && n !== "var" && this.unexpected(), this.parseVarStatement(s, n);
			case a._while: return this.parseWhileStatement(s);
			case a._with: return this.parseWithStatement(s);
			case a.braceL: return this.parseBlock(!0, s);
			case a.semi: return this.parseEmptyStatement(s);
			case a._export:
			case a._import:
				if (this.options.ecmaVersion > 10 && r === a._import) {
					A.lastIndex = this.pos;
					var o = A.exec(this.input), c = this.pos + o[0].length, h = this.input.charCodeAt(c);
					if (h === 40 || h === 46) return this.parseExpressionStatement(s, this.parseExpression());
				}
				return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), r === a._import ? this.parseImport(s) : this.parseExport(s, i);
			default:
				if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(s, !0, !e);
				var l = this.isAwaitUsing(!1) ? "await using" : this.isUsing(!1) ? "using" : null;
				if (l) return this.allowUsing || this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"), e && this.raise(this.start, "Using declaration is not allowed in single-statement positions"), l === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.next(), this.parseVar(s, !1, l), this.semicolon(), this.finishNode(s, "VariableDeclaration");
				var m = this.value, S = this.parseExpression();
				return r === a.name && S.type === "Identifier" && this.eat(a.colon) ? this.parseLabeledStatement(s, m, S, e) : this.parseExpressionStatement(s, S);
		}
	};
	d.parseBreakContinueStatement = function(e, t) {
		var i = t === "break";
		this.next(), this.eat(a.semi) || this.insertSemicolon() ? e.label = null : this.type !== a.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
		for (var r = 0; r < this.labels.length; ++r) {
			var s = this.labels[r];
			if ((e.label == null || s.name === e.label.name) && (s.kind != null && (i || s.kind === "loop") || e.label && i)) break;
		}
		return r === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, i ? "BreakStatement" : "ContinueStatement");
	};
	d.parseDebuggerStatement = function(e) {
		return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
	};
	d.parseDoStatement = function(e) {
		return this.next(), this.labels.push(Ye), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(a._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(a.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
	};
	d.parseForStatement = function(e) {
		this.next();
		var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
		if (this.labels.push(Ye), this.enterScope(0), this.expect(a.parenL), this.type === a.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);
		var i = this.isLet();
		if (this.type === a._var || this.type === a._const || i) {
			var r = this.startNode(), s = i ? "let" : this.value;
			return this.next(), this.parseVar(r, !0, s), this.finishNode(r, "VariableDeclaration"), this.parseForAfterInit(e, r, t);
		}
		var n = this.isContextual("let"), o = !1, c = this.isUsing(!0) ? "using" : this.isAwaitUsing(!0) ? "await using" : null;
		if (c) {
			var h = this.startNode();
			return this.next(), c === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.parseVar(h, !0, c), this.finishNode(h, "VariableDeclaration"), this.parseForAfterInit(e, h, t);
		}
		var l = this.containsEsc, m = new _e(), S = this.start, k = t > -1 ? this.parseExprSubscripts(m, "await") : this.parseExpression(!0, m);
		return this.type === a._in || (o = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === a._in && this.unexpected(t), e.await = !0) : o && this.options.ecmaVersion >= 8 && (k.start === S && !l && k.type === "Identifier" && k.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), n && o && this.raise(k.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(k, !1, m), this.checkLValPattern(k), this.parseForIn(e, k)) : (this.checkExpressionErrors(m, !0), t > -1 && this.unexpected(t), this.parseFor(e, k));
	};
	d.parseForAfterInit = function(e, t, i) {
		return (this.type === a._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && t.declarations.length === 1 ? (this.type === a._in ? ((t.kind === "using" || t.kind === "await using") && !t.declarations[0].init && this.raise(this.start, "Using declaration is not allowed in for-in loops"), this.options.ecmaVersion >= 9 && i > -1 && this.unexpected(i)) : this.options.ecmaVersion >= 9 && (e.await = i > -1), this.parseForIn(e, t)) : (i > -1 && this.unexpected(i), this.parseFor(e, t));
	};
	d.parseFunctionStatement = function(e, t, i) {
		return this.next(), this.parseFunction(e, oe | (i ? 0 : qe), !1, t);
	};
	d.parseIfStatement = function(e) {
		return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(a._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
	};
	d.parseReturnStatement = function(e) {
		return this.allowReturn || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(a.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
	};
	d.parseSwitchStatement = function(e) {
		this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(a.braceL), this.labels.push(ir), this.enterScope(At);
		for (var t, i = !1; this.type !== a.braceR;) if (this.type === a._case || this.type === a._default) {
			var r = this.type === a._case;
			t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (i && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), i = !0, t.test = null), this.expect(a.colon);
		} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
		return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
	};
	d.parseThrowStatement = function(e) {
		return this.next(), R.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
	};
	rr = [];
	d.parseCatchClauseParam = function() {
		var e = this.parseBindingAtom(), t = e.type === "Identifier";
		return this.enterScope(t ? kt : 0), this.checkLValPattern(e, t ? It : q), this.expect(a.parenR), e;
	};
	d.parseTryStatement = function(e) {
		if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === a._catch) {
			var t = this.startNode();
			this.next(), this.eat(a.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
		}
		return e.finalizer = this.eat(a._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
	};
	d.parseVarStatement = function(e, t, i) {
		return this.next(), this.parseVar(e, !1, t, i), this.semicolon(), this.finishNode(e, "VariableDeclaration");
	};
	d.parseWhileStatement = function(e) {
		return this.next(), e.test = this.parseParenExpression(), this.labels.push(Ye), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
	};
	d.parseWithStatement = function(e) {
		return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
	};
	d.parseEmptyStatement = function(e) {
		return this.next(), this.finishNode(e, "EmptyStatement");
	};
	d.parseLabeledStatement = function(e, t, i, r) {
		for (var s = 0, n = this.labels; s < n.length; s += 1) n[s].name === t && this.raise(i.start, "Label '" + t + "' is already declared");
		for (var c = this.type.isLoop ? "loop" : this.type === a._switch ? "switch" : null, h = this.labels.length - 1; h >= 0; h--) {
			var l = this.labels[h];
			if (l.statementStart === e.start) l.statementStart = this.start, l.kind = c;
			else break;
		}
		return this.labels.push({
			name: t,
			kind: c,
			statementStart: this.start
		}), e.body = this.parseStatement(r ? r.indexOf("label") === -1 ? r + "label" : r : "label"), this.labels.pop(), e.label = i, this.finishNode(e, "LabeledStatement");
	};
	d.parseExpressionStatement = function(e, t) {
		return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
	};
	d.parseBlock = function(e, t, i) {
		for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(a.braceL), e && this.enterScope(0); this.type !== a.braceR;) {
			var r = this.parseStatement(null);
			t.body.push(r);
		}
		return i && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
	};
	d.parseFor = function(e, t) {
		return e.init = t, this.expect(a.semi), e.test = this.type === a.semi ? null : this.parseExpression(), this.expect(a.semi), e.update = this.type === a.parenR ? null : this.parseExpression(), this.expect(a.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
	};
	d.parseForIn = function(e, t) {
		var i = this.type === a._in;
		return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!i || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(t.start, (i ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"), e.left = t, e.right = i ? this.parseExpression() : this.parseMaybeAssign(), this.expect(a.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, i ? "ForInStatement" : "ForOfStatement");
	};
	d.parseVar = function(e, t, i, r) {
		for (e.declarations = [], e.kind = i;;) {
			var s = this.startNode();
			if (this.parseVarId(s, i), this.eat(a.eq) ? s.init = this.parseMaybeAssign(t) : !r && i === "const" && !(this.type === a._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !r && (i === "using" || i === "await using") && this.options.ecmaVersion >= 17 && this.type !== a._in && !this.isContextual("of") ? this.raise(this.lastTokEnd, "Missing initializer in " + i + " declaration") : !r && s.id.type !== "Identifier" && !(t && (this.type === a._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : s.init = null, e.declarations.push(this.finishNode(s, "VariableDeclarator")), !this.eat(a.comma)) break;
		}
		return e;
	};
	d.parseVarId = function(e, t) {
		e.id = t === "using" || t === "await using" ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? Qe : q, !1);
	};
	oe = 1;
	qe = 2;
	Nt = 4;
	d.parseFunction = function(e, t, i, r, s) {
		this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === a.star && t & qe && this.unexpected(), e.generator = this.eat(a.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & oe && (e.id = t & Nt && this.type !== a.name ? null : this.parseIdent(), e.id && !(t & qe) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? Qe : q : wt));
		var n = this.yieldPos, o = this.awaitPos, c = this.awaitIdentPos;
		return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(ze(e.async, e.generator)), t & oe || (e.id = this.type === a.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, i, !1, s), this.yieldPos = n, this.awaitPos = o, this.awaitIdentPos = c, this.finishNode(e, t & oe ? "FunctionDeclaration" : "FunctionExpression");
	};
	d.parseFunctionParams = function(e) {
		this.expect(a.parenL), e.params = this.parseBindingList(a.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
	};
	d.parseClass = function(e, t) {
		this.next();
		var i = this.strict;
		this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
		var r = this.enterClassBody(), s = this.startNode(), n = !1;
		for (s.body = [], this.expect(a.braceL); this.type !== a.braceR;) {
			var o = this.parseClassElement(e.superClass !== null);
			o && (s.body.push(o), o.type === "MethodDefinition" && o.kind === "constructor" ? (n && this.raiseRecoverable(o.start, "Duplicate constructor in the same class"), n = !0) : o.key && o.key.type === "PrivateIdentifier" && sr(r, o) && this.raiseRecoverable(o.key.start, "Identifier '#" + o.key.name + "' has already been declared"));
		}
		return this.strict = i, this.next(), e.body = this.finishNode(s, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
	};
	d.parseClassElement = function(e) {
		if (this.eat(a.semi)) return null;
		var t = this.options.ecmaVersion, i = this.startNode(), r = "", s = !1, n = !1, o = "method", c = !1;
		if (this.eatContextual("static")) {
			if (t >= 13 && this.eat(a.braceL)) return this.parseClassStaticBlock(i), i;
			this.isClassElementNameStart() || this.type === a.star ? c = !0 : r = "static";
		}
		if (i.static = c, !r && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === a.star) && !this.canInsertSemicolon() ? n = !0 : r = "async"), !r && (t >= 9 || !n) && this.eat(a.star) && (s = !0), !r && !n && !s) {
			var h = this.value;
			(this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? o = h : r = h);
		}
		if (r ? (i.computed = !1, i.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), i.key.name = r, this.finishNode(i.key, "Identifier")) : this.parseClassElementName(i), t < 13 || this.type === a.parenL || o !== "method" || s || n) {
			var l = !i.static && ye(i, "constructor"), m = l && e;
			l && o !== "method" && this.raise(i.key.start, "Constructor can't have get/set modifier"), i.kind = l ? "constructor" : o, this.parseClassMethod(i, s, n, m);
		} else this.parseClassField(i);
		return i;
	};
	d.isClassElementNameStart = function() {
		return this.type === a.name || this.type === a.privateId || this.type === a.num || this.type === a.string || this.type === a.bracketL || this.type.keyword;
	};
	d.parseClassElementName = function(e) {
		this.type === a.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
	};
	d.parseClassMethod = function(e, t, i, r) {
		var s = e.key;
		e.kind === "constructor" ? (t && this.raise(s.start, "Constructor can't be a generator"), i && this.raise(s.start, "Constructor can't be an async method")) : e.static && ye(e, "prototype") && this.raise(s.start, "Classes may not have a static property named prototype");
		var n = e.value = this.parseMethod(t, i, r);
		return e.kind === "get" && n.params.length !== 0 && this.raiseRecoverable(n.start, "getter should have no params"), e.kind === "set" && n.params.length !== 1 && this.raiseRecoverable(n.start, "setter should have exactly one param"), e.kind === "set" && n.params[0].type === "RestElement" && this.raiseRecoverable(n.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
	};
	d.parseClassField = function(e) {
		return ye(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && ye(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(a.eq) ? (this.enterScope(he | Se), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, "PropertyDefinition");
	};
	d.parseClassStaticBlock = function(e) {
		e.body = [];
		var t = this.labels;
		for (this.labels = [], this.enterScope(Q | Se); this.type !== a.braceR;) {
			var i = this.parseStatement(null);
			e.body.push(i);
		}
		return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
	};
	d.parseClassId = function(e, t) {
		this.type === a.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, q, !1)) : (t === !0 && this.unexpected(), e.id = null);
	};
	d.parseClassSuper = function(e) {
		e.superClass = this.eat(a._extends) ? this.parseExprSubscripts(null, !1) : null;
	};
	d.enterClassBody = function() {
		var e = {
			declared: Object.create(null),
			used: []
		};
		return this.privateNameStack.push(e), e.declared;
	};
	d.exitClassBody = function() {
		var e = this.privateNameStack.pop(), t = e.declared, i = e.used;
		if (this.options.checkPrivateFields) for (var r = this.privateNameStack.length, s = r === 0 ? null : this.privateNameStack[r - 1], n = 0; n < i.length; ++n) {
			var o = i[n];
			te(t, o.name) || (s ? s.used.push(o) : this.raiseRecoverable(o.start, "Private field '#" + o.name + "' must be declared in an enclosing class"));
		}
	};
	d.parseExportAllDeclaration = function(e, t) {
		return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== a.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
	};
	d.parseExport = function(e, t) {
		if (this.next(), this.eat(a.star)) return this.parseExportAllDeclaration(e, t);
		if (this.eat(a._default)) return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
		if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
		else {
			if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !== a.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
			else {
				for (var i = 0, r = e.specifiers; i < r.length; i += 1) {
					var s = r[i];
					this.checkUnreserved(s.local), this.checkLocalExport(s.local), s.local.type === "Literal" && this.raise(s.local.start, "A string literal cannot be used as an exported binding without `from`.");
				}
				e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
			}
			this.semicolon();
		}
		return this.finishNode(e, "ExportNamedDeclaration");
	};
	d.parseExportDeclaration = function(e) {
		return this.parseStatement(null);
	};
	d.parseExportDefaultDeclaration = function() {
		var e;
		if (this.type === a._function || (e = this.isAsyncFunction())) {
			var t = this.startNode();
			return this.next(), e && this.next(), this.parseFunction(t, oe | Nt, !1, e);
		} else if (this.type === a._class) {
			var i = this.startNode();
			return this.parseClass(i, "nullableID");
		} else {
			var r = this.parseMaybeAssign();
			return this.semicolon(), r;
		}
	};
	d.checkExport = function(e, t, i) {
		e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), te(e, t) && this.raiseRecoverable(i, "Duplicate export '" + t + "'"), e[t] = !0);
	};
	d.checkPatternExport = function(e, t) {
		var i = t.type;
		if (i === "Identifier") this.checkExport(e, t, t.start);
		else if (i === "ObjectPattern") for (var r = 0, s = t.properties; r < s.length; r += 1) {
			var n = s[r];
			this.checkPatternExport(e, n);
		}
		else if (i === "ArrayPattern") for (var o = 0, c = t.elements; o < c.length; o += 1) {
			var h = c[o];
			h && this.checkPatternExport(e, h);
		}
		else i === "Property" ? this.checkPatternExport(e, t.value) : i === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : i === "RestElement" && this.checkPatternExport(e, t.argument);
	};
	d.checkVariableExport = function(e, t) {
		if (e) for (var i = 0, r = t; i < r.length; i += 1) {
			var s = r[i];
			this.checkPatternExport(e, s.id);
		}
	};
	d.shouldParseExportStatement = function() {
		return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
	};
	d.parseExportSpecifier = function(e) {
		var t = this.startNode();
		return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(e, t.exported, t.exported.start), this.finishNode(t, "ExportSpecifier");
	};
	d.parseExportSpecifiers = function(e) {
		var t = [], i = !0;
		for (this.expect(a.braceL); !this.eat(a.braceR);) {
			if (i) i = !1;
			else if (this.expect(a.comma), this.afterTrailingComma(a.braceR)) break;
			t.push(this.parseExportSpecifier(e));
		}
		return t;
	};
	d.parseImport = function(e) {
		return this.next(), this.type === a.string ? (e.specifiers = rr, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === a.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
	};
	d.parseImportSpecifier = function() {
		var e = this.startNode();
		return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, q), this.finishNode(e, "ImportSpecifier");
	};
	d.parseImportDefaultSpecifier = function() {
		var e = this.startNode();
		return e.local = this.parseIdent(), this.checkLValSimple(e.local, q), this.finishNode(e, "ImportDefaultSpecifier");
	};
	d.parseImportNamespaceSpecifier = function() {
		var e = this.startNode();
		return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, q), this.finishNode(e, "ImportNamespaceSpecifier");
	};
	d.parseImportSpecifiers = function() {
		var e = [], t = !0;
		if (this.type === a.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(a.comma))) return e;
		if (this.type === a.star) return e.push(this.parseImportNamespaceSpecifier()), e;
		for (this.expect(a.braceL); !this.eat(a.braceR);) {
			if (t) t = !1;
			else if (this.expect(a.comma), this.afterTrailingComma(a.braceR)) break;
			e.push(this.parseImportSpecifier());
		}
		return e;
	};
	d.parseWithClause = function() {
		var e = [];
		if (!this.eat(a._with)) return e;
		this.expect(a.braceL);
		for (var t = {}, i = !0; !this.eat(a.braceR);) {
			if (i) i = !1;
			else if (this.expect(a.comma), this.afterTrailingComma(a.braceR)) break;
			var r = this.parseImportAttribute(), s = r.key.type === "Identifier" ? r.key.name : r.key.value;
			te(t, s) && this.raiseRecoverable(r.key.start, "Duplicate attribute key '" + s + "'"), t[s] = !0, e.push(r);
		}
		return e;
	};
	d.parseImportAttribute = function() {
		var e = this.startNode();
		return e.key = this.type === a.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(a.colon), this.type !== a.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, "ImportAttribute");
	};
	d.parseModuleExportName = function() {
		if (this.options.ecmaVersion >= 13 && this.type === a.string) {
			var e = this.parseLiteral(this.value);
			return Zi.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
		}
		return this.parseIdent(!0);
	};
	d.adaptDirectivePrologue = function(e) {
		for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1);
	};
	d.isDirectiveCandidate = function(e) {
		return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && (this.input[e.start] === "\"" || this.input[e.start] === "'");
	};
	B = T.prototype;
	B.toAssignable = function(e, t, i) {
		if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
			case "Identifier":
				this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
				break;
			case "ObjectPattern":
			case "ArrayPattern":
			case "AssignmentPattern":
			case "RestElement": break;
			case "ObjectExpression":
				e.type = "ObjectPattern", i && this.checkPatternErrors(i, !0);
				for (var r = 0, s = e.properties; r < s.length; r += 1) {
					var n = s[r];
					this.toAssignable(n, t), n.type === "RestElement" && (n.argument.type === "ArrayPattern" || n.argument.type === "ObjectPattern") && this.raise(n.argument.start, "Unexpected token");
				}
				break;
			case "Property":
				e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
				break;
			case "ArrayExpression":
				e.type = "ArrayPattern", i && this.checkPatternErrors(i, !0), this.toAssignableList(e.elements, t);
				break;
			case "SpreadElement":
				e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
				break;
			case "AssignmentExpression":
				e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
				break;
			case "ParenthesizedExpression":
				this.toAssignable(e.expression, t, i);
				break;
			case "ChainExpression":
				this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
				break;
			case "MemberExpression": if (!t) break;
			default: this.raise(e.start, "Assigning to rvalue");
		}
		else i && this.checkPatternErrors(i, !0);
		return e;
	};
	B.toAssignableList = function(e, t) {
		for (var i = e.length, r = 0; r < i; r++) {
			var s = e[r];
			s && this.toAssignable(s, t);
		}
		if (i) {
			var n = e[i - 1];
			this.options.ecmaVersion === 6 && t && n && n.type === "RestElement" && n.argument.type !== "Identifier" && this.unexpected(n.argument.start);
		}
		return e;
	};
	B.parseSpread = function(e) {
		var t = this.startNode();
		return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
	};
	B.parseRestBinding = function() {
		var e = this.startNode();
		return this.next(), this.options.ecmaVersion === 6 && this.type !== a.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
	};
	B.parseBindingAtom = function() {
		if (this.options.ecmaVersion >= 6) switch (this.type) {
			case a.bracketL:
				var e = this.startNode();
				return this.next(), e.elements = this.parseBindingList(a.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
			case a.braceL: return this.parseObj(!0);
		}
		return this.parseIdent();
	};
	B.parseBindingList = function(e, t, i, r) {
		for (var s = [], n = !0; !this.eat(e);) if (n ? n = !1 : this.expect(a.comma), t && this.type === a.comma) s.push(null);
		else {
			if (i && this.afterTrailingComma(e)) break;
			if (this.type === a.ellipsis) {
				var o = this.parseRestBinding();
				this.parseBindingListItem(o), s.push(o), this.type === a.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
				break;
			} else s.push(this.parseAssignableListItem(r));
		}
		return s;
	};
	B.parseAssignableListItem = function(e) {
		var t = this.parseMaybeDefault(this.start, this.startLoc);
		return this.parseBindingListItem(t), t;
	};
	B.parseBindingListItem = function(e) {
		return e;
	};
	B.parseMaybeDefault = function(e, t, i) {
		if (i = i || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(a.eq)) return i;
		var r = this.startNodeAt(e, t);
		return r.left = i, r.right = this.parseMaybeAssign(), this.finishNode(r, "AssignmentPattern");
	};
	B.checkLValSimple = function(e, t, i) {
		t === void 0 && (t = xe);
		var r = t !== xe;
		switch (e.type) {
			case "Identifier":
				this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? "Binding " : "Assigning to ") + e.name + " in strict mode"), r && (t === q && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), i && (te(i, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), i[e.name] = !0), t !== Pt && this.declareName(e.name, t, e.start));
				break;
			case "ChainExpression":
				this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
				break;
			case "MemberExpression":
				r && this.raiseRecoverable(e.start, "Binding member expression");
				break;
			case "ParenthesizedExpression": return r && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, i);
			default: this.raise(e.start, (r ? "Binding" : "Assigning to") + " rvalue");
		}
	};
	B.checkLValPattern = function(e, t, i) {
		switch (t === void 0 && (t = xe), e.type) {
			case "ObjectPattern":
				for (var r = 0, s = e.properties; r < s.length; r += 1) {
					var n = s[r];
					this.checkLValInnerPattern(n, t, i);
				}
				break;
			case "ArrayPattern":
				for (var o = 0, c = e.elements; o < c.length; o += 1) {
					var h = c[o];
					h && this.checkLValInnerPattern(h, t, i);
				}
				break;
			default: this.checkLValSimple(e, t, i);
		}
	};
	B.checkLValInnerPattern = function(e, t, i) {
		switch (t === void 0 && (t = xe), e.type) {
			case "Property":
				this.checkLValInnerPattern(e.value, t, i);
				break;
			case "AssignmentPattern":
				this.checkLValPattern(e.left, t, i);
				break;
			case "RestElement":
				this.checkLValPattern(e.argument, t, i);
				break;
			default: this.checkLValPattern(e, t, i);
		}
	};
	F = function(t, i, r, s, n) {
		this.token = t, this.isExpr = !!i, this.preserveSpace = !!r, this.override = s, this.generator = !!n;
	};
	E = {
		b_stat: new F("{", !1),
		b_expr: new F("{", !0),
		b_tmpl: new F("${", !1),
		p_stat: new F("(", !1),
		p_expr: new F("(", !0),
		q_tmpl: new F("`", !0, !0, function(e) {
			return e.tryReadTemplateToken();
		}),
		f_stat: new F("function", !1),
		f_expr: new F("function", !0),
		f_expr_gen: new F("function", !0, !1, null, !0),
		f_gen: new F("function", !1, !1, null, !0)
	};
	ie = T.prototype;
	ie.initialContext = function() {
		return [E.b_stat];
	};
	ie.curContext = function() {
		return this.context[this.context.length - 1];
	};
	ie.braceIsBlock = function(e) {
		var t = this.curContext();
		return t === E.f_expr || t === E.f_stat ? !0 : e === a.colon && (t === E.b_stat || t === E.b_expr) ? !t.isExpr : e === a._return || e === a.name && this.exprAllowed ? R.test(this.input.slice(this.lastTokEnd, this.start)) : e === a._else || e === a.semi || e === a.eof || e === a.parenR || e === a.arrow ? !0 : e === a.braceL ? t === E.b_stat : e === a._var || e === a._const || e === a.name ? !1 : !this.exprAllowed;
	};
	ie.inGeneratorContext = function() {
		for (var e = this.context.length - 1; e >= 1; e--) {
			var t = this.context[e];
			if (t.token === "function") return t.generator;
		}
		return !1;
	};
	ie.updateContext = function(e) {
		var t, i = this.type;
		i.keyword && e === a.dot ? this.exprAllowed = !1 : (t = i.updateContext) ? t.call(this, e) : this.exprAllowed = i.beforeExpr;
	};
	ie.overrideContext = function(e) {
		this.curContext() !== e && (this.context[this.context.length - 1] = e);
	};
	a.parenR.updateContext = a.braceR.updateContext = function() {
		if (this.context.length === 1) {
			this.exprAllowed = !0;
			return;
		}
		var e = this.context.pop();
		e === E.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
	};
	a.braceL.updateContext = function(e) {
		this.context.push(this.braceIsBlock(e) ? E.b_stat : E.b_expr), this.exprAllowed = !0;
	};
	a.dollarBraceL.updateContext = function() {
		this.context.push(E.b_tmpl), this.exprAllowed = !0;
	};
	a.parenL.updateContext = function(e) {
		var t = e === a._if || e === a._for || e === a._with || e === a._while;
		this.context.push(t ? E.p_stat : E.p_expr), this.exprAllowed = !0;
	};
	a.incDec.updateContext = function() {};
	a._function.updateContext = a._class.updateContext = function(e) {
		e.beforeExpr && e !== a._else && !(e === a.semi && this.curContext() !== E.p_stat) && !(e === a._return && R.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === a.colon || e === a.braceL) && this.curContext() === E.b_stat) ? this.context.push(E.f_expr) : this.context.push(E.f_stat), this.exprAllowed = !1;
	};
	a.colon.updateContext = function() {
		this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
	};
	a.backQuote.updateContext = function() {
		this.curContext() === E.q_tmpl ? this.context.pop() : this.context.push(E.q_tmpl), this.exprAllowed = !1;
	};
	a.star.updateContext = function(e) {
		if (e === a._function) {
			var t = this.context.length - 1;
			this.context[t] === E.f_expr ? this.context[t] = E.f_expr_gen : this.context[t] = E.f_gen;
		}
		this.exprAllowed = !0;
	};
	a.name.updateContext = function(e) {
		var t = !1;
		this.options.ecmaVersion >= 6 && e !== a.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
	};
	g = T.prototype;
	g.checkPropClash = function(e, t, i) {
		if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
			var r = e.key, s;
			switch (r.type) {
				case "Identifier":
					s = r.name;
					break;
				case "Literal":
					s = String(r.value);
					break;
				default: return;
			}
			var n = e.kind;
			if (this.options.ecmaVersion >= 6) {
				s === "__proto__" && n === "init" && (t.proto && (i ? i.doubleProto < 0 && (i.doubleProto = r.start) : this.raiseRecoverable(r.start, "Redefinition of __proto__ property")), t.proto = !0);
				return;
			}
			s = "$" + s;
			var o = t[s];
			if (o) {
				var c;
				n === "init" ? c = this.strict && o.init || o.get || o.set : c = o.init || o[n], c && this.raiseRecoverable(r.start, "Redefinition of property");
			} else o = t[s] = {
				init: !1,
				get: !1,
				set: !1
			};
			o[n] = !0;
		}
	};
	g.parseExpression = function(e, t) {
		var i = this;
		return this.catchStackOverflow(function() {
			var r = i.start, s = i.startLoc, n = i.parseMaybeAssign(e, t);
			if (i.type === a.comma) {
				var o = i.startNodeAt(r, s);
				for (o.expressions = [n]; i.eat(a.comma);) o.expressions.push(i.parseMaybeAssign(e, t));
				return i.finishNode(o, "SequenceExpression");
			}
			return n;
		});
	};
	g.parseMaybeAssign = function(e, t, i) {
		if (this.isContextual("yield")) {
			if (this.inGenerator) return this.parseYield(e);
			this.exprAllowed = !1;
		}
		var r = !1, s = -1, n = -1, o = -1;
		t ? (s = t.parenthesizedAssign, n = t.trailingComma, o = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new _e(), r = !0);
		var c = this.start, h = this.startLoc;
		(this.type === a.parenL || this.type === a.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
		var l = this.parseMaybeConditional(e, t);
		if (i && (l = i.call(this, l, c, h)), this.type.isAssign) {
			var m = this.startNodeAt(c, h);
			return m.operator = this.value, this.type === a.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === a.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), m.left = l, this.next(), m.right = this.parseMaybeAssign(e), o > -1 && (t.doubleProto = o), this.finishNode(m, "AssignmentExpression");
		} else r && this.checkExpressionErrors(t, !0);
		return s > -1 && (t.parenthesizedAssign = s), n > -1 && (t.trailingComma = n), l;
	};
	g.parseMaybeConditional = function(e, t) {
		var i = this.start, r = this.startLoc, s = this.parseExprOps(e, t);
		if (this.checkExpressionErrors(t)) return s;
		if (!(s.type === "ArrowFunctionExpression" && s.start === i) && this.eat(a.question)) {
			var n = this.startNodeAt(i, r);
			return n.test = s, n.consequent = this.parseMaybeAssign(), this.expect(a.colon), n.alternate = this.parseMaybeAssign(e), this.finishNode(n, "ConditionalExpression");
		}
		return s;
	};
	g.parseExprOps = function(e, t) {
		var i = this.start, r = this.startLoc, s = this.parseMaybeUnary(t, !1, !1, e);
		return this.checkExpressionErrors(t) || s.start === i && s.type === "ArrowFunctionExpression" ? s : this.parseExprOp(s, i, r, -1, e);
	};
	g.parseExprOp = function(e, t, i, r, s) {
		var n = this.type.binop;
		if (n != null && (!s || this.type !== a._in) && n > r) {
			var o = this.type === a.logicalOR || this.type === a.logicalAND, c = this.type === a.coalesce;
			c && (n = a.logicalAND.binop);
			var h = this.value;
			this.next();
			var l = this.start, m = this.startLoc, S = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, s), l, m, n, s), k = this.buildBinary(t, i, e, S, h, o || c);
			return (o && this.type === a.coalesce || c && (this.type === a.logicalOR || this.type === a.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(k, t, i, r, s);
		}
		return e;
	};
	g.buildBinary = function(e, t, i, r, s, n) {
		r.type === "PrivateIdentifier" && this.raise(r.start, "Private identifier can only be left side of binary expression");
		var o = this.startNodeAt(e, t);
		return o.left = i, o.operator = s, o.right = r, this.finishNode(o, n ? "LogicalExpression" : "BinaryExpression");
	};
	g.parseMaybeUnary = function(e, t, i, r) {
		var s = this.start, n = this.startLoc, o;
		if (this.isContextual("await") && this.canAwait) o = this.parseAwait(r), t = !0;
		else if (this.type.prefix) {
			var c = this.startNode(), h = this.type === a.incDec;
			c.operator = this.value, c.prefix = !0, this.next(), c.argument = this.parseMaybeUnary(null, !0, h, r), this.checkExpressionErrors(e, !0), h ? this.checkLValSimple(c.argument) : this.strict && c.operator === "delete" && Lt(c.argument) ? this.raiseRecoverable(c.start, "Deleting local variable in strict mode") : c.operator === "delete" && He(c.argument) ? this.raiseRecoverable(c.start, "Private fields can not be deleted") : t = !0, o = this.finishNode(c, h ? "UpdateExpression" : "UnaryExpression");
		} else if (!t && this.type === a.privateId) (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), o = this.parsePrivateIdent(), this.type !== a._in && this.unexpected();
		else {
			if (o = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return o;
			for (; this.type.postfix && !this.canInsertSemicolon();) {
				var l = this.startNodeAt(s, n);
				l.operator = this.value, l.prefix = !1, l.argument = o, this.checkLValSimple(o), this.next(), o = this.finishNode(l, "UpdateExpression");
			}
		}
		if (!i && this.eat(a.starstar)) if (t) this.unexpected(this.lastTokStart);
		else return this.buildBinary(s, n, o, this.parseMaybeUnary(null, !1, !1, r), "**", !1);
		else return o;
	};
	g.parseExprSubscripts = function(e, t) {
		var i = this.start, r = this.startLoc, s = this.parseExprAtom(e, t);
		if (s.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") return s;
		var n = this.parseSubscripts(s, i, r, !1, t);
		return e && n.type === "MemberExpression" && (e.parenthesizedAssign >= n.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= n.start && (e.parenthesizedBind = -1), e.trailingComma >= n.start && (e.trailingComma = -1)), n;
	};
	g.parseSubscripts = function(e, t, i, r, s) {
		for (var n = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, o = !1;;) {
			var c = this.parseSubscript(e, t, i, r, n, o, s);
			if (c.optional && (o = !0), c === e || c.type === "ArrowFunctionExpression") {
				if (o) {
					var h = this.startNodeAt(t, i);
					h.expression = c, c = this.finishNode(h, "ChainExpression");
				}
				return c;
			}
			e = c;
		}
	};
	g.shouldParseAsyncArrow = function() {
		return !this.canInsertSemicolon() && this.eat(a.arrow);
	};
	g.parseSubscriptAsyncArrow = function(e, t, i, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), i, !0, r);
	};
	g.parseSubscript = function(e, t, i, r, s, n, o) {
		var c = this.options.ecmaVersion >= 11, h = c && this.eat(a.questionDot);
		r && h && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
		var l = this.eat(a.bracketL);
		if (l || h && this.type !== a.parenL && this.type !== a.backQuote || this.eat(a.dot)) {
			var m = this.startNodeAt(t, i);
			m.object = e, l ? (m.property = this.parseExpression(), this.expect(a.bracketR)) : this.type === a.privateId && e.type !== "Super" ? m.property = this.parsePrivateIdent() : m.property = this.parseIdent(this.options.allowReserved !== "never"), m.computed = !!l, c && (m.optional = h), e = this.finishNode(m, "MemberExpression");
		} else if (!r && this.eat(a.parenL)) {
			var S = new _e(), k = this.yieldPos, p = this.awaitPos, x = this.awaitIdentPos;
			this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
			var y = this.parseExprList(a.parenR, this.options.ecmaVersion >= 8, !1, S);
			if (s && !h && this.shouldParseAsyncArrow()) return this.checkPatternErrors(S, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = k, this.awaitPos = p, this.awaitIdentPos = x, this.parseSubscriptAsyncArrow(t, i, y, o);
			this.checkExpressionErrors(S, !0), this.yieldPos = k || this.yieldPos, this.awaitPos = p || this.awaitPos, this.awaitIdentPos = x || this.awaitIdentPos;
			var v = this.startNodeAt(t, i);
			v.callee = e, v.arguments = y, c && (v.optional = h), e = this.finishNode(v, "CallExpression");
		} else if (this.type === a.backQuote) {
			(h || n) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
			var N = this.startNodeAt(t, i);
			N.tag = e, N.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(N, "TaggedTemplateExpression");
		}
		return e;
	};
	g.parseExprAtom = function(e, t, i) {
		this.type === a.slash && this.readRegexp();
		var r, s = this.potentialArrowAt === this.start;
		switch (this.type) {
			case a._super: return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), r = this.startNode(), this.next(), this.type === a.parenL && !this.allowDirectSuper && this.raise(r.start, "super() call outside constructor of a subclass"), this.type !== a.dot && this.type !== a.bracketL && this.type !== a.parenL && this.unexpected(), this.finishNode(r, "Super");
			case a._this: return r = this.startNode(), this.next(), this.finishNode(r, "ThisExpression");
			case a.name:
				var n = this.start, o = this.startLoc, c = this.containsEsc, h = this.parseIdent(!1);
				if (this.options.ecmaVersion >= 8 && !c && h.name === "async" && !this.canInsertSemicolon() && this.eat(a._function)) return this.overrideContext(E.f_expr), this.parseFunction(this.startNodeAt(n, o), 0, !1, !0, t);
				if (s && !this.canInsertSemicolon()) {
					if (this.eat(a.arrow)) return this.parseArrowExpression(this.startNodeAt(n, o), [h], !1, t);
					if (this.options.ecmaVersion >= 8 && h.name === "async" && this.type === a.name && !c && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) return h = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(a.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(n, o), [h], !0, t);
				}
				return h;
			case a.regexp:
				var l = this.value;
				return r = this.parseLiteral(l.value), r.regex = {
					pattern: l.pattern,
					flags: l.flags
				}, r;
			case a.num:
			case a.string: return this.parseLiteral(this.value);
			case a._null:
			case a._true:
			case a._false: return r = this.startNode(), r.value = this.type === a._null ? null : this.type === a._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, "Literal");
			case a.parenL:
				var m = this.start, S = this.parseParenAndDistinguishExpression(s, t);
				return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(S) && (e.parenthesizedAssign = m), e.parenthesizedBind < 0 && (e.parenthesizedBind = m)), S;
			case a.bracketL: return r = this.startNode(), this.next(), r.elements = this.parseExprList(a.bracketR, !0, !0, e), this.finishNode(r, "ArrayExpression");
			case a.braceL: return this.overrideContext(E.b_expr), this.parseObj(!1, e);
			case a._function: return r = this.startNode(), this.next(), this.parseFunction(r, 0);
			case a._class: return this.parseClass(this.startNode(), !1);
			case a._new: return this.parseNew();
			case a.backQuote: return this.parseTemplate();
			case a._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(i) : this.unexpected();
			default: return this.parseExprAtomDefault();
		}
	};
	g.parseExprAtomDefault = function() {
		this.unexpected();
	};
	g.parseExprImport = function(e) {
		var t = this.startNode();
		if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === a.parenL && !e) return this.parseDynamicImport(t);
		if (this.type === a.dot) {
			var i = this.startNodeAt(t.start, t.loc && t.loc.start);
			return i.name = "import", t.meta = this.finishNode(i, "Identifier"), this.parseImportMeta(t);
		} else this.unexpected();
	};
	g.parseDynamicImport = function(e) {
		if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(a.parenR) ? e.options = null : (this.expect(a.comma), this.afterTrailingComma(a.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(a.parenR) || (this.expect(a.comma), this.afterTrailingComma(a.parenR) || this.unexpected())));
		else if (!this.eat(a.parenR)) {
			var t = this.start;
			this.eat(a.comma) && this.eat(a.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
		}
		return this.finishNode(e, "ImportExpression");
	};
	g.parseImportMeta = function(e) {
		this.next();
		var t = this.containsEsc;
		return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
	};
	g.parseLiteral = function(e) {
		var t = this.startNode();
		return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.value != null ? t.value.toString() : t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal");
	};
	g.parseParenExpression = function() {
		this.expect(a.parenL);
		var e = this.parseExpression();
		return this.expect(a.parenR), e;
	};
	g.shouldParseArrow = function(e) {
		return !this.canInsertSemicolon();
	};
	g.parseParenAndDistinguishExpression = function(e, t) {
		var i = this.start, r = this.startLoc, s, n = this.options.ecmaVersion >= 8;
		if (this.options.ecmaVersion >= 6) {
			this.next();
			var o = this.start, c = this.startLoc, h = [], l = !0, m = !1, S = new _e(), k = this.yieldPos, p = this.awaitPos, x;
			for (this.yieldPos = 0, this.awaitPos = 0; this.type !== a.parenR;) if (l ? l = !1 : this.expect(a.comma), n && this.afterTrailingComma(a.parenR, !0)) {
				m = !0;
				break;
			} else if (this.type === a.ellipsis) {
				x = this.start, h.push(this.parseParenItem(this.parseRestBinding())), this.type === a.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
				break;
			} else h.push(this.parseMaybeAssign(!1, S, this.parseParenItem));
			var y = this.lastTokEnd, v = this.lastTokEndLoc;
			if (this.expect(a.parenR), e && this.shouldParseArrow(h) && this.eat(a.arrow)) return this.checkPatternErrors(S, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = k, this.awaitPos = p, this.parseParenArrowList(i, r, h, t);
			(!h.length || m) && this.unexpected(this.lastTokStart), x && this.unexpected(x), this.checkExpressionErrors(S, !0), this.yieldPos = k || this.yieldPos, this.awaitPos = p || this.awaitPos, h.length > 1 ? (s = this.startNodeAt(o, c), s.expressions = h, this.finishNodeAt(s, "SequenceExpression", y, v)) : s = h[0];
		} else s = this.parseParenExpression();
		if (this.options.preserveParens) {
			var N = this.startNodeAt(i, r);
			return N.expression = s, this.finishNode(N, "ParenthesizedExpression");
		} else return s;
	};
	g.parseParenItem = function(e) {
		return e;
	};
	g.parseParenArrowList = function(e, t, i, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), i, !1, r);
	};
	ar = [];
	g.parseNew = function() {
		this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
		var e = this.startNode();
		if (this.next(), this.options.ecmaVersion >= 6 && this.type === a.dot) {
			var t = this.startNodeAt(e.start, e.loc && e.loc.start);
			t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
			var i = this.containsEsc;
			return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), i && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
		}
		var r = this.start, s = this.startLoc;
		return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, s, !0, !1), e.callee.type === "Super" && this.raiseRecoverable(r, "Invalid use of 'super'"), this.eat(a.parenL) ? e.arguments = this.parseExprList(a.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = ar, this.finishNode(e, "NewExpression");
	};
	g.parseTemplateElement = function(e) {
		var t = e.isTagged, i = this.startNode();
		return this.type === a.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), i.value = {
			raw: this.value.replace(/\r\n?/g, `
`),
			cooked: null
		}) : i.value = {
			raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
			cooked: this.value
		}, this.next(), i.tail = this.type === a.backQuote, this.finishNode(i, "TemplateElement");
	};
	g.parseTemplate = function(e) {
		e === void 0 && (e = {});
		var t = e.isTagged;
		t === void 0 && (t = !1);
		var i = this.startNode();
		this.next(), i.expressions = [];
		var r = this.parseTemplateElement({ isTagged: t });
		for (i.quasis = [r]; !r.tail;) this.type === a.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(a.dollarBraceL), i.expressions.push(this.parseExpression()), this.expect(a.braceR), i.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
		return this.next(), this.finishNode(i, "TemplateLiteral");
	};
	g.isAsyncProp = function(e) {
		return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === a.name || this.type === a.num || this.type === a.string || this.type === a.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === a.star) && !R.test(this.input.slice(this.lastTokEnd, this.start));
	};
	g.parseObj = function(e, t) {
		var i = this.startNode(), r = !0, s = {};
		for (i.properties = [], this.next(); !this.eat(a.braceR);) {
			if (r) r = !1;
			else if (this.expect(a.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(a.braceR)) break;
			var n = this.parseProperty(e, t);
			e || this.checkPropClash(n, s, t), i.properties.push(n);
		}
		return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression");
	};
	g.parseProperty = function(e, t) {
		var i = this.startNode(), r, s, n, o;
		if (this.options.ecmaVersion >= 9 && this.eat(a.ellipsis)) return e ? (i.argument = this.parseIdent(!1), this.type === a.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(i, "RestElement")) : (i.argument = this.parseMaybeAssign(!1, t), this.type === a.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(i, "SpreadElement"));
		this.options.ecmaVersion >= 6 && (i.method = !1, i.shorthand = !1, (e || t) && (n = this.start, o = this.startLoc), e || (r = this.eat(a.star)));
		var c = this.containsEsc;
		return this.parsePropertyName(i), !e && !c && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(i) ? (s = !0, r = this.options.ecmaVersion >= 9 && this.eat(a.star), this.parsePropertyName(i)) : s = !1, this.parsePropertyValue(i, e, r, s, n, o, t, c), this.finishNode(i, "Property");
	};
	g.parseGetterSetter = function(e) {
		var t = e.key.name;
		this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
		var i = e.kind === "get" ? 0 : 1;
		if (e.value.params.length !== i) {
			var r = e.value.start;
			e.kind === "get" ? this.raiseRecoverable(r, "getter should have no params") : this.raiseRecoverable(r, "setter should have exactly one param");
		} else e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
	};
	g.parsePropertyValue = function(e, t, i, r, s, n, o, c) {
		(i || r) && this.type === a.colon && this.unexpected(), this.eat(a.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === a.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(i, r), e.kind = "init") : !t && !c && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== a.comma && this.type !== a.braceR && this.type !== a.eq ? ((i || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((i || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = s), t ? e.value = this.parseMaybeDefault(s, n, this.copyNode(e.key)) : this.type === a.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start), e.value = this.parseMaybeDefault(s, n, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = "init", e.shorthand = !0) : this.unexpected();
	};
	g.parsePropertyName = function(e) {
		if (this.options.ecmaVersion >= 6) {
			if (this.eat(a.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(a.bracketR), e.key;
			e.computed = !1;
		}
		return e.key = this.type === a.num || this.type === a.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
	};
	g.initFunction = function(e) {
		e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
	};
	g.parseMethod = function(e, t, i) {
		var r = this.startNode(), s = this.yieldPos, n = this.awaitPos, o = this.awaitIdentPos;
		return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(ze(t, r.generator) | Se | (i ? Tt : 0)), this.expect(a.parenL), r.params = this.parseBindingList(a.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = s, this.awaitPos = n, this.awaitIdentPos = o, this.finishNode(r, "FunctionExpression");
	};
	g.parseArrowExpression = function(e, t, i, r) {
		var s = this.yieldPos, n = this.awaitPos, o = this.awaitIdentPos;
		return this.enterScope(ze(i, !1) | Xe), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!i), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = s, this.awaitPos = n, this.awaitIdentPos = o, this.finishNode(e, "ArrowFunctionExpression");
	};
	g.parseFunctionBody = function(e, t, i, r) {
		var s = t && this.type !== a.braceL, n = this.strict, o = !1;
		if (s) e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
		else {
			var c = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
			(!n || c) && (o = this.strictDirective(this.end), o && c && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
			var h = this.labels;
			this.labels = [], o && (this.strict = !0), this.checkParams(e, !n && !o && !t && !i && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, Pt), e.body = this.parseBlock(!1, void 0, o && !n), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = h;
		}
		this.exitScope();
	};
	g.isSimpleParamList = function(e) {
		for (var t = 0, i = e; t < i.length; t += 1) if (i[t].type !== "Identifier") return !1;
		return !0;
	};
	g.checkParams = function(e, t) {
		for (var i = Object.create(null), r = 0, s = e.params; r < s.length; r += 1) {
			var n = s[r];
			this.checkLValInnerPattern(n, Qe, t ? null : i);
		}
	};
	g.parseExprList = function(e, t, i, r) {
		for (var s = [], n = !0; !this.eat(e);) {
			if (n) n = !1;
			else if (this.expect(a.comma), t && this.afterTrailingComma(e)) break;
			var o = void 0;
			i && this.type === a.comma ? o = null : this.type === a.ellipsis ? (o = this.parseSpread(r), r && this.type === a.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, r), s.push(o);
		}
		return s;
	};
	g.checkUnreserved = function(e) {
		var t = e.start, i = e.end, r = e.name;
		if (this.inGenerator && r === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & Ce) && r === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (r === "arguments" || r === "await") && this.raise(t, "Cannot use " + r + " in class static initialization block"), this.keywords.test(r) && this.raise(t, "Unexpected keyword '" + r + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, i).indexOf("\\") !== -1)) (this.strict ? this.reservedWordsStrict : this.reservedWords).test(r) && (!this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + r + "' is reserved"));
	};
	g.parseIdent = function(e) {
		var t = this.parseIdentNode();
		return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
	};
	g.parseIdentNode = function() {
		var e = this.startNode();
		return this.type === a.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = a.name) : this.unexpected(), e;
	};
	g.parsePrivateIdent = function() {
		var e = this.startNode();
		return this.type === a.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
	};
	g.parseYield = function(e) {
		this.yieldPos || (this.yieldPos = this.start);
		var t = this.startNode();
		return this.next(), this.type === a.semi || this.canInsertSemicolon() || this.type !== a.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(a.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
	};
	g.parseAwait = function(e) {
		this.awaitPos || (this.awaitPos = this.start);
		var t = this.startNode();
		return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
	};
	ge = T.prototype;
	ge.raise = function(e, t) {
		var i = _t(this.input, e);
		t += " (" + i.line + ":" + i.column + ")", this.sourceFile && (t += " in " + this.sourceFile);
		var r = new SyntaxError(t);
		throw r.pos = e, r.loc = i, r.raisedAt = this.pos, r;
	};
	ge.raiseRecoverable = ge.raise;
	ge.curPosition = function() {
		if (this.options.locations) return new ue(this.curLine, this.pos - this.lineStart);
	};
	J = T.prototype;
	nr = function(t) {
		this.flags = t, this.var = [], this.lexical = [], this.functions = [];
	};
	J.enterScope = function(e) {
		this.scopeStack.push(new nr(e));
	};
	J.exitScope = function() {
		this.scopeStack.pop();
	};
	J.treatFunctionsAsVarInScope = function(e) {
		return e.flags & z || !this.inModule && e.flags & X;
	};
	J.declareName = function(e, t, i) {
		var r = !1;
		if (t === q) {
			var s = this.currentScope();
			r = s.lexical.indexOf(e) > -1 || s.functions.indexOf(e) > -1 || s.var.indexOf(e) > -1, s.lexical.push(e), this.inModule && s.flags & X && delete this.undefinedExports[e];
		} else if (t === It) this.currentScope().lexical.push(e);
		else if (t === wt) {
			var o = this.currentScope();
			this.treatFunctionsAsVar ? r = o.lexical.indexOf(e) > -1 : r = o.lexical.indexOf(e) > -1 || o.var.indexOf(e) > -1, o.functions.push(e);
		} else for (var c = this.scopeStack.length - 1; c >= 0; --c) {
			var h = this.scopeStack[c];
			if (h.lexical.indexOf(e) > -1 && !(h.flags & kt && h.lexical[0] === e) || !this.treatFunctionsAsVarInScope(h) && h.functions.indexOf(e) > -1) {
				r = !0;
				break;
			}
			if (h.var.push(e), this.inModule && h.flags & X && delete this.undefinedExports[e], h.flags & Ce) break;
		}
		r && this.raiseRecoverable(i, "Identifier '" + e + "' has already been declared");
	};
	J.checkLocalExport = function(e) {
		this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
	};
	J.currentScope = function() {
		return this.scopeStack[this.scopeStack.length - 1];
	};
	J.currentVarScope = function() {
		for (var e = this.scopeStack.length - 1;; e--) {
			var t = this.scopeStack[e];
			if (t.flags & (Ce | he | Q)) return t;
		}
	};
	J.currentThisScope = function() {
		for (var e = this.scopeStack.length - 1;; e--) {
			var t = this.scopeStack[e];
			if (t.flags & (Ce | he | Q) && !(t.flags & Xe)) return t;
		}
	};
	Ee = function(t, i, r) {
		this.type = "", this.start = i, this.end = 0, t.options.locations && (this.loc = new be(t, r)), t.options.directSourceFile && (this.sourceFile = t.options.directSourceFile), t.options.ranges && (this.range = [i, 0]);
	};
	ce = T.prototype;
	ce.startNode = function() {
		return new Ee(this, this.start, this.startLoc);
	};
	ce.startNodeAt = function(e, t) {
		return new Ee(this, e, t);
	};
	ce.finishNode = function(e, t) {
		return Rt.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
	};
	ce.finishNodeAt = function(e, t, i, r) {
		return Rt.call(this, e, t, i, r);
	};
	ce.copyNode = function(e) {
		var t = new Ee(this, e.start, this.startLoc);
		for (var i in e) t[i] = e[i];
		return t;
	};
	or = "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz";
	Vt = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
	Ot = Vt + " Extended_Pictographic";
	Dt = Ot;
	Mt = Dt + " EBase EComp EMod EPres ExtPict";
	Bt = Mt;
	hr = {
		9: Vt,
		10: Ot,
		11: Dt,
		12: Mt,
		13: Bt,
		14: Bt
	};
	pr = {
		9: "",
		10: "",
		11: "",
		12: "",
		13: "",
		14: "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji"
	};
	mt = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
	Ft = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
	jt = Ft + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
	Ut = jt + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
	Gt = Ut + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
	Wt = Gt + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
	fr = {
		9: Ft,
		10: jt,
		11: Ut,
		12: Gt,
		13: Wt,
		14: Wt + " " + or
	};
	qt = {};
	for (me = 0, Ue = [
		9,
		10,
		11,
		12,
		13,
		14
	]; me < Ue.length; me += 1) xt = Ue[me], dr(xt);
	f = T.prototype;
	ve = function(t, i) {
		this.parent = t, this.base = i || this;
	};
	ve.prototype.separatedFrom = function(t) {
		for (var i = this; i; i = i.parent) for (var r = t; r; r = r.parent) if (i.base === r.base && i !== r) return !0;
		return !1;
	};
	ve.prototype.sibling = function() {
		return new ve(this.parent, this.base);
	};
	U = function(t) {
		this.parser = t, this.validFlags = "gim" + (t.options.ecmaVersion >= 6 ? "uy" : "") + (t.options.ecmaVersion >= 9 ? "s" : "") + (t.options.ecmaVersion >= 13 ? "d" : "") + (t.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = qt[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
	};
	U.prototype.reset = function(t, i, r) {
		var s = r.indexOf("v") !== -1, n = r.indexOf("u") !== -1;
		this.start = t | 0, this.source = i + "", this.flags = r, s && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = n && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = n && this.parser.options.ecmaVersion >= 9);
	};
	U.prototype.raise = function(t) {
		this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + t);
	};
	U.prototype.at = function(t, i) {
		i === void 0 && (i = !1);
		var r = this.source, s = r.length;
		if (t >= s) return -1;
		var n = r.charCodeAt(t);
		if (!(i || this.switchU) || n <= 55295 || n >= 57344 || t + 1 >= s) return n;
		var o = r.charCodeAt(t + 1);
		return o >= 56320 && o <= 57343 ? (n << 10) + o - 56613888 : n;
	};
	U.prototype.nextIndex = function(t, i) {
		i === void 0 && (i = !1);
		var r = this.source, s = r.length;
		if (t >= s) return s;
		var n = r.charCodeAt(t), o;
		return !(i || this.switchU) || n <= 55295 || n >= 57344 || t + 1 >= s || (o = r.charCodeAt(t + 1)) < 56320 || o > 57343 ? t + 1 : t + 2;
	};
	U.prototype.current = function(t) {
		return t === void 0 && (t = !1), this.at(this.pos, t);
	};
	U.prototype.lookahead = function(t) {
		return t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t);
	};
	U.prototype.advance = function(t) {
		t === void 0 && (t = !1), this.pos = this.nextIndex(this.pos, t);
	};
	U.prototype.eat = function(t, i) {
		return i === void 0 && (i = !1), this.current(i) === t ? (this.advance(i), !0) : !1;
	};
	U.prototype.eatChars = function(t, i) {
		i === void 0 && (i = !1);
		for (var r = this.pos, s = 0, n = t; s < n.length; s += 1) {
			var o = n[s], c = this.at(r, i);
			if (c === -1 || c !== o) return !1;
			r = this.nextIndex(r, i);
		}
		return this.pos = r, !0;
	};
	f.validateRegExpFlags = function(e) {
		for (var t = e.validFlags, i = e.flags, r = !1, s = !1, n = 0; n < i.length; n++) {
			var o = i.charAt(n);
			t.indexOf(o) === -1 && this.raise(e.start, "Invalid regular expression flag"), i.indexOf(o, n + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), o === "u" && (r = !0), o === "v" && (s = !0);
		}
		this.options.ecmaVersion >= 15 && r && s && this.raise(e.start, "Invalid regular expression flag");
	};
	f.validateRegExpPattern = function(e) {
		this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && mr(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
	};
	f.regexp_pattern = function(e) {
		e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
		for (var t = 0, i = e.backReferenceNames; t < i.length; t += 1) {
			var r = i[t];
			e.groupNames[r] || e.raise("Invalid named capture referenced");
		}
	};
	f.regexp_disjunction = function(e) {
		var t = this.options.ecmaVersion >= 16;
		for (t && (e.branchID = new ve(e.branchID, null)), this.regexp_alternative(e); e.eat(124);) t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
		t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets");
	};
	f.regexp_alternative = function(e) {
		for (; e.pos < e.source.length && this.regexp_eatTerm(e););
	};
	f.regexp_eatTerm = function(e) {
		return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
	};
	f.regexp_eatAssertion = function(e) {
		var t = e.pos;
		if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
		if (e.eat(92)) {
			if (e.eat(66) || e.eat(98)) return !0;
			e.pos = t;
		}
		if (e.eat(40) && e.eat(63)) {
			var i = !1;
			if (this.options.ecmaVersion >= 9 && (i = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !i, !0;
		}
		return e.pos = t, !1;
	};
	f.regexp_eatQuantifier = function(e, t) {
		return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
	};
	f.regexp_eatQuantifierPrefix = function(e, t) {
		return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
	};
	f.regexp_eatBracedQuantifier = function(e, t) {
		var i = e.pos;
		if (e.eat(123)) {
			var r = 0, s = -1;
			if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (s = e.lastIntValue), e.eat(125))) return s !== -1 && s < r && !t && e.raise("numbers out of order in {} quantifier"), !0;
			e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = i;
		}
		return !1;
	};
	f.regexp_eatAtom = function(e) {
		return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
	};
	f.regexp_eatReverseSolidusAtomEscape = function(e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatAtomEscape(e)) return !0;
			e.pos = t;
		}
		return !1;
	};
	f.regexp_eatUncapturingGroup = function(e) {
		var t = e.pos;
		if (e.eat(40)) {
			if (e.eat(63)) {
				if (this.options.ecmaVersion >= 16) {
					var i = this.regexp_eatModifiers(e), r = e.eat(45);
					if (i || r) {
						for (var s = 0; s < i.length; s++) {
							var n = i.charAt(s);
							i.indexOf(n, s + 1) > -1 && e.raise("Duplicate regular expression modifiers");
						}
						if (r) {
							var o = this.regexp_eatModifiers(e);
							!i && !o && e.current() === 58 && e.raise("Invalid regular expression modifiers");
							for (var c = 0; c < o.length; c++) {
								var h = o.charAt(c);
								(o.indexOf(h, c + 1) > -1 || i.indexOf(h) > -1) && e.raise("Duplicate regular expression modifiers");
							}
						}
					}
				}
				if (e.eat(58)) {
					if (this.regexp_disjunction(e), e.eat(41)) return !0;
					e.raise("Unterminated group");
				}
			}
			e.pos = t;
		}
		return !1;
	};
	f.regexp_eatCapturingGroup = function(e) {
		if (e.eat(40)) {
			if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
			e.raise("Unterminated group");
		}
		return !1;
	};
	f.regexp_eatModifiers = function(e) {
		for (var t = "", i = 0; (i = e.current()) !== -1 && xr(i);) t += G(i), e.advance();
		return t;
	};
	f.regexp_eatExtendedAtom = function(e) {
		return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
	};
	f.regexp_eatInvalidBracedQuantifier = function(e) {
		return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
	};
	f.regexp_eatSyntaxCharacter = function(e) {
		var t = e.current();
		return Ht(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
	};
	f.regexp_eatPatternCharacters = function(e) {
		for (var t = e.pos, i = 0; (i = e.current()) !== -1 && !Ht(i);) e.advance();
		return e.pos !== t;
	};
	f.regexp_eatExtendedPatternCharacter = function(e) {
		var t = e.current();
		return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
	};
	f.regexp_groupSpecifier = function(e) {
		if (e.eat(63)) {
			this.regexp_eatGroupName(e) || e.raise("Invalid group");
			var t = this.options.ecmaVersion >= 16, i = e.groupNames[e.lastStringValue];
			if (i) if (t) for (var r = 0, s = i; r < s.length; r += 1) s[r].separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
			else e.raise("Duplicate capture group name");
			t ? (i || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
		}
	};
	f.regexp_eatGroupName = function(e) {
		if (e.lastStringValue = "", e.eat(60)) {
			if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
			e.raise("Invalid capture group name");
		}
		return !1;
	};
	f.regexp_eatRegExpIdentifierName = function(e) {
		if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
			for (e.lastStringValue += G(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += G(e.lastIntValue);
			return !0;
		}
		return !1;
	};
	f.regexp_eatRegExpIdentifierStart = function(e) {
		var t = e.pos, i = this.options.ecmaVersion >= 11, r = e.current(i);
		return e.advance(i), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (r = e.lastIntValue), yr(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
	};
	f.regexp_eatRegExpIdentifierPart = function(e) {
		var t = e.pos, i = this.options.ecmaVersion >= 11, r = e.current(i);
		return e.advance(i), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (r = e.lastIntValue), gr(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
	};
	f.regexp_eatAtomEscape = function(e) {
		return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
	};
	f.regexp_eatBackReference = function(e) {
		var t = e.pos;
		if (this.regexp_eatDecimalEscape(e)) {
			var i = e.lastIntValue;
			if (e.switchU) return i > e.maxBackReference && (e.maxBackReference = i), !0;
			if (i <= e.numCapturingParens) return !0;
			e.pos = t;
		}
		return !1;
	};
	f.regexp_eatKGroupName = function(e) {
		if (e.eat(107)) {
			if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
			e.raise("Invalid named reference");
		}
		return !1;
	};
	f.regexp_eatCharacterEscape = function(e) {
		return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
	};
	f.regexp_eatCControlLetter = function(e) {
		var t = e.pos;
		if (e.eat(99)) {
			if (this.regexp_eatControlLetter(e)) return !0;
			e.pos = t;
		}
		return !1;
	};
	f.regexp_eatZero = function(e) {
		return e.current() === 48 && !ke(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
	};
	f.regexp_eatControlEscape = function(e) {
		var t = e.current();
		return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
	};
	f.regexp_eatControlLetter = function(e) {
		var t = e.current();
		return Kt(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
	};
	f.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
		t === void 0 && (t = !1);
		var i = e.pos, r = t || e.switchU;
		if (e.eat(117)) {
			if (this.regexp_eatFixedHexDigits(e, 4)) {
				var s = e.lastIntValue;
				if (r && s >= 55296 && s <= 56319) {
					var n = e.pos;
					if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
						var o = e.lastIntValue;
						if (o >= 56320 && o <= 57343) return e.lastIntValue = (s - 55296) * 1024 + (o - 56320) + 65536, !0;
					}
					e.pos = n, e.lastIntValue = s;
				}
				return !0;
			}
			if (r && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && vr(e.lastIntValue)) return !0;
			r && e.raise("Invalid unicode escape"), e.pos = i;
		}
		return !1;
	};
	f.regexp_eatIdentityEscape = function(e) {
		if (e.switchU) return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
		var t = e.current();
		return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
	};
	f.regexp_eatDecimalEscape = function(e) {
		e.lastIntValue = 0;
		var t = e.current();
		if (t >= 49 && t <= 57) {
			do
				e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
			while ((t = e.current()) >= 48 && t <= 57);
			return !0;
		}
		return !1;
	};
	Jt = 0;
	W = 1;
	D = 2;
	f.regexp_eatCharacterClassEscape = function(e) {
		var t = e.current();
		if (br(t)) return e.lastIntValue = -1, e.advance(), W;
		var i = !1;
		if (e.switchU && this.options.ecmaVersion >= 9 && ((i = t === 80) || t === 112)) {
			e.lastIntValue = -1, e.advance();
			var r;
			if (e.eat(123) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(125)) return i && r === D && e.raise("Invalid property name"), r;
			e.raise("Invalid property name");
		}
		return Jt;
	};
	f.regexp_eatUnicodePropertyValueExpression = function(e) {
		var t = e.pos;
		if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
			var i = e.lastStringValue;
			if (this.regexp_eatUnicodePropertyValue(e)) {
				var r = e.lastStringValue;
				return this.regexp_validateUnicodePropertyNameAndValue(e, i, r), W;
			}
		}
		if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
			var s = e.lastStringValue;
			return this.regexp_validateUnicodePropertyNameOrValue(e, s);
		}
		return Jt;
	};
	f.regexp_validateUnicodePropertyNameAndValue = function(e, t, i) {
		te(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(i) || e.raise("Invalid property value");
	};
	f.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
		if (e.unicodeProperties.binary.test(t)) return W;
		if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return D;
		e.raise("Invalid property name");
	};
	f.regexp_eatUnicodePropertyName = function(e) {
		var t = 0;
		for (e.lastStringValue = ""; Xt(t = e.current());) e.lastStringValue += G(t), e.advance();
		return e.lastStringValue !== "";
	};
	f.regexp_eatUnicodePropertyValue = function(e) {
		var t = 0;
		for (e.lastStringValue = ""; Sr(t = e.current());) e.lastStringValue += G(t), e.advance();
		return e.lastStringValue !== "";
	};
	f.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
		return this.regexp_eatUnicodePropertyValue(e);
	};
	f.regexp_eatCharacterClass = function(e) {
		if (e.eat(91)) {
			var t = e.eat(94), i = this.regexp_classContents(e);
			return e.eat(93) || e.raise("Unterminated character class"), t && i === D && e.raise("Negated character class may contain strings"), !0;
		}
		return !1;
	};
	f.regexp_classContents = function(e) {
		return e.current() === 93 ? W : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), W);
	};
	f.regexp_nonEmptyClassRanges = function(e) {
		for (; this.regexp_eatClassAtom(e);) {
			var t = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassAtom(e)) {
				var i = e.lastIntValue;
				e.switchU && (t === -1 || i === -1) && e.raise("Invalid character class"), t !== -1 && i !== -1 && t > i && e.raise("Range out of order in character class");
			}
		}
	};
	f.regexp_eatClassAtom = function(e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatClassEscape(e)) return !0;
			if (e.switchU) {
				var i = e.current();
				(i === 99 || Yt(i)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
			}
			e.pos = t;
		}
		var r = e.current();
		return r !== 93 ? (e.lastIntValue = r, e.advance(), !0) : !1;
	};
	f.regexp_eatClassEscape = function(e) {
		var t = e.pos;
		if (e.eat(98)) return e.lastIntValue = 8, !0;
		if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
		if (!e.switchU && e.eat(99)) {
			if (this.regexp_eatClassControlLetter(e)) return !0;
			e.pos = t;
		}
		return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
	};
	f.regexp_classSetExpression = function(e) {
		var t = W, i;
		if (!this.regexp_eatClassSetRange(e)) if (i = this.regexp_eatClassSetOperand(e)) {
			i === D && (t = D);
			for (var r = e.pos; e.eatChars([38, 38]);) {
				if (e.current() !== 38 && (i = this.regexp_eatClassSetOperand(e))) {
					i !== D && (t = W);
					continue;
				}
				e.raise("Invalid character in character class");
			}
			if (r !== e.pos) return t;
			for (; e.eatChars([45, 45]);) this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
			if (r !== e.pos) return t;
		} else e.raise("Invalid character in character class");
		for (;;) if (!this.regexp_eatClassSetRange(e)) {
			if (i = this.regexp_eatClassSetOperand(e), !i) return t;
			i === D && (t = D);
		}
	};
	f.regexp_eatClassSetRange = function(e) {
		var t = e.pos;
		if (this.regexp_eatClassSetCharacter(e)) {
			var i = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
				var r = e.lastIntValue;
				return i !== -1 && r !== -1 && i > r && e.raise("Range out of order in character class"), !0;
			}
			e.pos = t;
		}
		return !1;
	};
	f.regexp_eatClassSetOperand = function(e) {
		return this.regexp_eatClassSetCharacter(e) ? W : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
	};
	f.regexp_eatNestedClass = function(e) {
		var t = e.pos;
		if (e.eat(91)) {
			var i = e.eat(94), r = this.regexp_classContents(e);
			if (e.eat(93)) return i && r === D && e.raise("Negated character class may contain strings"), r;
			e.pos = t;
		}
		if (e.eat(92)) {
			var s = this.regexp_eatCharacterClassEscape(e);
			if (s) return s;
			e.pos = t;
		}
		return null;
	};
	f.regexp_eatClassStringDisjunction = function(e) {
		var t = e.pos;
		if (e.eatChars([92, 113])) {
			if (e.eat(123)) {
				var i = this.regexp_classStringDisjunctionContents(e);
				if (e.eat(125)) return i;
			} else e.raise("Invalid escape");
			e.pos = t;
		}
		return null;
	};
	f.regexp_classStringDisjunctionContents = function(e) {
		for (var t = this.regexp_classString(e); e.eat(124);) this.regexp_classString(e) === D && (t = D);
		return t;
	};
	f.regexp_classString = function(e) {
		for (var t = 0; this.regexp_eatClassSetCharacter(e);) t++;
		return t === 1 ? W : D;
	};
	f.regexp_eatClassSetCharacter = function(e) {
		var t = e.pos;
		if (e.eat(92)) return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(98) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
		var i = e.current();
		return i < 0 || i === e.lookahead() && Cr(i) || _r(i) ? !1 : (e.advance(), e.lastIntValue = i, !0);
	};
	f.regexp_eatClassSetReservedPunctuator = function(e) {
		var t = e.current();
		return Er(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
	};
	f.regexp_eatClassControlLetter = function(e) {
		var t = e.current();
		return ke(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
	};
	f.regexp_eatHexEscapeSequence = function(e) {
		var t = e.pos;
		if (e.eat(120)) {
			if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
			e.switchU && e.raise("Invalid escape"), e.pos = t;
		}
		return !1;
	};
	f.regexp_eatDecimalDigits = function(e) {
		var t = e.pos, i = 0;
		for (e.lastIntValue = 0; ke(i = e.current());) e.lastIntValue = 10 * e.lastIntValue + (i - 48), e.advance();
		return e.pos !== t;
	};
	f.regexp_eatHexDigits = function(e) {
		var t = e.pos, i = 0;
		for (e.lastIntValue = 0; zt(i = e.current());) e.lastIntValue = 16 * e.lastIntValue + Qt(i), e.advance();
		return e.pos !== t;
	};
	f.regexp_eatLegacyOctalEscapeSequence = function(e) {
		if (this.regexp_eatOctalDigit(e)) {
			var t = e.lastIntValue;
			if (this.regexp_eatOctalDigit(e)) {
				var i = e.lastIntValue;
				t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + i * 8 + e.lastIntValue : e.lastIntValue = t * 8 + i;
			} else e.lastIntValue = t;
			return !0;
		}
		return !1;
	};
	f.regexp_eatOctalDigit = function(e) {
		var t = e.current();
		return Yt(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
	};
	f.regexp_eatFixedHexDigits = function(e, t) {
		var i = e.pos;
		e.lastIntValue = 0;
		for (var r = 0; r < t; ++r) {
			var s = e.current();
			if (!zt(s)) return e.pos = i, !1;
			e.lastIntValue = 16 * e.lastIntValue + Qt(s), e.advance();
		}
		return !0;
	};
	Ze = function(t) {
		this.type = t.type, this.value = t.value, this.start = t.start, this.end = t.end, t.options.locations && (this.loc = new be(t, t.startLoc, t.endLoc)), t.options.ranges && (this.range = [t.start, t.end]);
	};
	b = T.prototype;
	b.next = function(e) {
		!e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Ze(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
	};
	b.getToken = function() {
		return this.next(), new Ze(this);
	};
	typeof Symbol < "u" && (b[Symbol.iterator] = function() {
		var e = this;
		return { next: function() {
			var t = e.getToken();
			return {
				done: t.type === a.eof,
				value: t
			};
		} };
	});
	b.nextToken = function() {
		var e = this.curContext();
		if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(a.eof);
		if (e.override) return e.override(this);
		this.readToken(this.fullCharCodeAtPos());
	};
	b.readToken = function(e) {
		return j(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
	};
	b.fullCharCodeAt = function(e) {
		var t = this.input.charCodeAt(e);
		if (t <= 55295 || t >= 56320) return t;
		var i = this.input.charCodeAt(e + 1);
		return i <= 56319 || i >= 57344 ? t : (t << 10) + i - 56613888;
	};
	b.fullCharCodeAtPos = function() {
		return this.fullCharCodeAt(this.pos);
	};
	b.skipBlockComment = function() {
		var e = this.options.onComment && this.curPosition(), t = this.pos, i = this.input.indexOf("*/", this.pos += 2);
		if (i === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = i + 2, this.options.locations) for (var r = void 0, s = t; (r = bt(this.input, s, this.pos)) > -1;) ++this.curLine, s = this.lineStart = r;
		this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, i), t, this.pos, e, this.curPosition());
	};
	b.skipLineComment = function(e) {
		for (var t = this.pos, i = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !ee(r);) r = this.input.charCodeAt(++this.pos);
		this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, i, this.curPosition());
	};
	b.skipSpace = function() {
		e: for (; this.pos < this.input.length;) {
			var e = this.input.charCodeAt(this.pos);
			switch (e) {
				case 32:
				case 160:
					++this.pos;
					break;
				case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
				case 10:
				case 8232:
				case 8233:
					++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
					break;
				case 47:
					switch (this.input.charCodeAt(this.pos + 1)) {
						case 42:
							this.skipBlockComment();
							break;
						case 47:
							this.skipLineComment(2);
							break;
						default: break e;
					}
					break;
				default: if (e > 8 && e < 14 || e >= 5760 && St.test(String.fromCharCode(e))) ++this.pos;
				else break e;
			}
		}
	};
	b.finishToken = function(e, t) {
		this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
		var i = this.type;
		this.type = e, this.value = t, this.updateContext(i);
	};
	b.readToken_dot = function() {
		var e = this.input.charCodeAt(this.pos + 1);
		if (e >= 48 && e <= 57) return this.readNumber(!0);
		var t = this.input.charCodeAt(this.pos + 2);
		return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(a.ellipsis)) : (++this.pos, this.finishToken(a.dot));
	};
	b.readToken_slash = function() {
		var e = this.input.charCodeAt(this.pos + 1);
		return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(a.assign, 2) : this.finishOp(a.slash, 1);
	};
	b.readToken_mult_modulo_exp = function(e) {
		var t = this.input.charCodeAt(this.pos + 1), i = 1, r = e === 42 ? a.star : a.modulo;
		return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++i, r = a.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(a.assign, i + 1) : this.finishOp(r, i);
	};
	b.readToken_pipe_amp = function(e) {
		var t = this.input.charCodeAt(this.pos + 1);
		if (t === e) {
			if (this.options.ecmaVersion >= 12) {
				if (this.input.charCodeAt(this.pos + 2) === 61) return this.finishOp(a.assign, 3);
			}
			return this.finishOp(e === 124 ? a.logicalOR : a.logicalAND, 2);
		}
		return t === 61 ? this.finishOp(a.assign, 2) : this.finishOp(e === 124 ? a.bitwiseOR : a.bitwiseAND, 1);
	};
	b.readToken_caret = function() {
		return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(a.assign, 2) : this.finishOp(a.bitwiseXOR, 1);
	};
	b.readToken_plus_min = function(e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || R.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(a.incDec, 2) : t === 61 ? this.finishOp(a.assign, 2) : this.finishOp(a.plusMin, 1);
	};
	b.readToken_lt_gt = function(e) {
		var t = this.input.charCodeAt(this.pos + 1), i = 1;
		return t === e ? (i = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + i) === 61 ? this.finishOp(a.assign, i + 1) : this.finishOp(a.bitShift, i)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (i = 2), this.finishOp(a.relational, i));
	};
	b.readToken_eq_excl = function(e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === 61 ? this.finishOp(a.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(a.arrow)) : this.finishOp(e === 61 ? a.eq : a.prefix, 1);
	};
	b.readToken_question = function() {
		var e = this.options.ecmaVersion;
		if (e >= 11) {
			var t = this.input.charCodeAt(this.pos + 1);
			if (t === 46) {
				var i = this.input.charCodeAt(this.pos + 2);
				if (i < 48 || i > 57) return this.finishOp(a.questionDot, 2);
			}
			if (t === 63) {
				if (e >= 12) {
					if (this.input.charCodeAt(this.pos + 2) === 61) return this.finishOp(a.assign, 3);
				}
				return this.finishOp(a.coalesce, 2);
			}
		}
		return this.finishOp(a.question, 1);
	};
	b.readToken_numberSign = function() {
		var e = this.options.ecmaVersion, t = 35;
		if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), j(t, !0) || t === 92)) return this.finishToken(a.privateId, this.readWord1());
		this.raise(this.pos, "Unexpected character '" + G(t) + "'");
	};
	b.getTokenFromCode = function(e) {
		switch (e) {
			case 46: return this.readToken_dot();
			case 40: return ++this.pos, this.finishToken(a.parenL);
			case 41: return ++this.pos, this.finishToken(a.parenR);
			case 59: return ++this.pos, this.finishToken(a.semi);
			case 44: return ++this.pos, this.finishToken(a.comma);
			case 91: return ++this.pos, this.finishToken(a.bracketL);
			case 93: return ++this.pos, this.finishToken(a.bracketR);
			case 123: return ++this.pos, this.finishToken(a.braceL);
			case 125: return ++this.pos, this.finishToken(a.braceR);
			case 58: return ++this.pos, this.finishToken(a.colon);
			case 96:
				if (this.options.ecmaVersion < 6) break;
				return ++this.pos, this.finishToken(a.backQuote);
			case 48:
				var t = this.input.charCodeAt(this.pos + 1);
				if (t === 120 || t === 88) return this.readRadixNumber(16);
				if (this.options.ecmaVersion >= 6) {
					if (t === 111 || t === 79) return this.readRadixNumber(8);
					if (t === 98 || t === 66) return this.readRadixNumber(2);
				}
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57: return this.readNumber(!1);
			case 34:
			case 39: return this.readString(e);
			case 47: return this.readToken_slash();
			case 37:
			case 42: return this.readToken_mult_modulo_exp(e);
			case 124:
			case 38: return this.readToken_pipe_amp(e);
			case 94: return this.readToken_caret();
			case 43:
			case 45: return this.readToken_plus_min(e);
			case 60:
			case 62: return this.readToken_lt_gt(e);
			case 61:
			case 33: return this.readToken_eq_excl(e);
			case 63: return this.readToken_question();
			case 126: return this.finishOp(a.prefix, 1);
			case 35: return this.readToken_numberSign();
		}
		this.raise(this.pos, "Unexpected character '" + G(e) + "'");
	};
	b.finishOp = function(e, t) {
		var i = this.input.slice(this.pos, this.pos + t);
		return this.pos += t, this.finishToken(e, i);
	};
	b.readRegexp = function() {
		for (var e, t, i = this.pos;;) {
			this.pos >= this.input.length && this.raise(i, "Unterminated regular expression");
			var r = this.input.charAt(this.pos);
			if (R.test(r) && this.raise(i, "Unterminated regular expression"), e) e = !1;
			else {
				if (r === "[") t = !0;
				else if (r === "]" && t) t = !1;
				else if (r === "/" && !t) break;
				e = r === "\\";
			}
			++this.pos;
		}
		var s = this.input.slice(i, this.pos);
		++this.pos;
		var n = this.pos, o = this.readWord1();
		this.containsEsc && this.unexpected(n);
		var c = this.regexpState || (this.regexpState = new U(this));
		c.reset(i, s, o), this.validateRegExpFlags(c), this.validateRegExpPattern(c);
		var h = null;
		try {
			h = new RegExp(s, o);
		} catch {}
		return this.finishToken(a.regexp, {
			pattern: s,
			flags: o,
			value: h
		});
	};
	b.readInt = function(e, t, i) {
		for (var r = this.options.ecmaVersion >= 12 && t === void 0, s = i && this.input.charCodeAt(this.pos) === 48, n = this.pos, o = 0, c = 0, h = 0, l = t ?? Infinity; h < l; ++h, ++this.pos) {
			var m = this.input.charCodeAt(this.pos), S = void 0;
			if (r && m === 95) {
				s && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), c === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), h === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), c = m;
				continue;
			}
			if (m >= 97 ? S = m - 97 + 10 : m >= 65 ? S = m - 65 + 10 : m >= 48 && m <= 57 ? S = m - 48 : S = Infinity, S >= e) break;
			c = m, o = o * e + S;
		}
		return r && c === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === n || t != null && this.pos - n !== t ? null : o;
	};
	b.readRadixNumber = function(e) {
		var t = this.pos;
		this.pos += 2;
		var i = this.readInt(e);
		return i ?? this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (i = Zt(this.input.slice(t, this.pos)), ++this.pos) : j(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(a.num, i);
	};
	b.readNumber = function(e) {
		var t = this.pos;
		!e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
		var i = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
		i && this.strict && this.raise(t, "Invalid number");
		var r = this.input.charCodeAt(this.pos);
		if (!i && !e && this.options.ecmaVersion >= 11 && r === 110) {
			var s = Zt(this.input.slice(t, this.pos));
			return ++this.pos, j(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(a.num, s);
		}
		i && /[89]/.test(this.input.slice(t, this.pos)) && (i = !1), r === 46 && !i && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !i && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), j(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
		var n = kr(this.input.slice(t, this.pos), i);
		return this.finishToken(a.num, n);
	};
	b.readCodePoint = function() {
		var e = this.input.charCodeAt(this.pos), t;
		if (e === 123) {
			this.options.ecmaVersion < 6 && this.unexpected();
			var i = ++this.pos;
			t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(i, "Code point out of bounds");
		} else t = this.readHexChar(4);
		return t;
	};
	b.readString = function(e) {
		for (var t = "", i = ++this.pos;;) {
			this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
			var r = this.input.charCodeAt(this.pos);
			if (r === e) break;
			r === 92 ? (t += this.input.slice(i, this.pos), t += this.readEscapedChar(!1), i = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (ee(r) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
		}
		return t += this.input.slice(i, this.pos++), this.finishToken(a.string, t);
	};
	$t = {};
	b.tryReadTemplateToken = function() {
		this.inTemplateElement = !0;
		try {
			this.readTmplToken();
		} catch (e) {
			if (e === $t) this.readInvalidTemplateToken();
			else throw e;
		}
		this.inTemplateElement = !1;
	};
	b.invalidStringToken = function(e, t) {
		if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw $t;
		this.raise(e, t);
	};
	b.readTmplToken = function() {
		for (var e = "", t = this.pos;;) {
			this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
			var i = this.input.charCodeAt(this.pos);
			if (i === 96 || i === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === a.template || this.type === a.invalidTemplate) ? i === 36 ? (this.pos += 2, this.finishToken(a.dollarBraceL)) : (++this.pos, this.finishToken(a.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(a.template, e));
			if (i === 92) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
			else if (ee(i)) {
				switch (e += this.input.slice(t, this.pos), ++this.pos, i) {
					case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
					case 10:
						e += `
`;
						break;
					default:
						e += String.fromCharCode(i);
						break;
				}
				this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
			} else ++this.pos;
		}
	};
	b.readInvalidTemplateToken = function() {
		for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
			case "\\":
				++this.pos;
				break;
			case "$": if (this.input[this.pos + 1] !== "{") break;
			case "`": return this.finishToken(a.invalidTemplate, this.input.slice(this.start, this.pos));
			case "\r": this.input[this.pos + 1] === `
` && ++this.pos;
			case `
`:
			case "\u2028":
			case "\u2029":
				++this.curLine, this.lineStart = this.pos + 1;
				break;
		}
		this.raise(this.start, "Unterminated template");
	};
	b.readEscapedChar = function(e) {
		var t = this.input.charCodeAt(++this.pos);
		switch (++this.pos, t) {
			case 110: return `
`;
			case 114: return "\r";
			case 120: return String.fromCharCode(this.readHexChar(2));
			case 117: return G(this.readCodePoint());
			case 116: return "	";
			case 98: return "\b";
			case 118: return "\v";
			case 102: return "\f";
			case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
			case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
			case 56:
			case 57: if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), e) {
				var i = this.pos - 1;
				this.invalidStringToken(i, "Invalid escape sequence in template string");
			}
			default:
				if (t >= 48 && t <= 55) {
					var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], s = parseInt(r, 8);
					return s > 255 && (r = r.slice(0, -1), s = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - r.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(s);
				}
				return ee(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
		}
	};
	b.readHexChar = function(e) {
		var t = this.pos, i = this.readInt(16, e);
		return i === null && this.invalidStringToken(t, "Bad character escape sequence"), i;
	};
	b.readWord1 = function() {
		this.containsEsc = !1;
		for (var e = "", t = !0, i = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
			var s = this.fullCharCodeAtPos();
			if (K(s, r)) this.pos += s <= 65535 ? 1 : 2;
			else if (s === 92) {
				this.containsEsc = !0, e += this.input.slice(i, this.pos);
				var n = this.pos;
				this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
				var o = this.readCodePoint();
				(t ? j : K)(o, r) || this.invalidStringToken(n, "Invalid Unicode escape"), e += G(o), i = this.pos;
			} else break;
			t = !1;
		}
		return e + this.input.slice(i, this.pos);
	};
	b.readWord = function() {
		var e = this.readWord1(), t = a.name;
		return this.keywords.test(e) && (t = Ke[e]), this.finishToken(t, e);
	};
	T.acorn = {
		Parser: T,
		version: "8.17.0",
		defaultOptions: We,
		Position: ue,
		SourceLocation: be,
		getLineInfo: _t,
		Node: Ee,
		TokenType: _,
		tokTypes: a,
		keywordTypes: Ke,
		TokContext: F,
		tokContexts: E,
		isIdentifierChar: K,
		isIdentifierStart: j,
		Token: Ze,
		isNewLine: ee,
		lineBreak: R,
		lineBreakG: zi,
		nonASCIIwhitespace: St
	};
	Li = pt(et(), 1);
	Te = Lr;
	re = (e, t) => (i, r, ...s) => i | 1 && r == null ? void 0 : (t.call(r) ?? r[e]).apply(r, s);
	Rr = Array.prototype.findLast ?? function(e) {
		for (let t = this.length - 1; t >= 0; t--) {
			let i = this[t];
			if (e(i, t, this)) return i;
		}
	};
	si = re("findLast", function() {
		if (Array.isArray(this)) return Rr;
	});
	we = Symbol.for("comments");
	Ie = re("at", function() {
		if (Array.isArray(this) || typeof this == "string") return Or;
	});
	Mr = 5;
	Br = 8;
	Fr = 8;
	ai = (e) => (t) => t.label ? I(t.label) : w(t) + e;
	jr = (e) => e.__contentEnd ?? se(e);
	ni = [
		"ExpressionStatement",
		"Directive",
		"ImportDeclaration",
		"ExportDefaultDeclaration",
		"ExportNamedDeclaration",
		"ExportAllDeclaration",
		"ReturnStatement",
		"ThrowStatement",
		"DoWhileStatement"
	];
	Ur = new Map([
		["BreakStatement", ai(Mr)],
		["ContinueStatement", ai(Br)],
		["DebuggerStatement", (e) => w(e) + Fr],
		["VariableDeclaration", (e) => I(Ie(0, e.declarations, -1))],
		...ni.map((e) => [e, jr])
	]);
	tt = Y(ni);
	ae = Y([
		"Block",
		"CommentBlock",
		"MultiLine"
	]);
	oi = Y([
		"Line",
		"CommentLine",
		"SingleLine",
		"HashbangComment",
		"HTMLOpen",
		"HTMLClose",
		"Hashbang",
		"InterpreterDirective"
	]);
	Gr = /* @__PURE__ */ new WeakMap();
	Wr = String.prototype.replaceAll ?? function(e, t) {
		return e.global ? this.replace(e, t) : this.split(e).join(t);
	};
	Z = re("replaceAll", function() {
		if (typeof this == "string") return Wr;
	});
	hi = Hr;
	Jr = /* @__PURE__ */ new WeakMap();
	pi = /* @__PURE__ */ new WeakMap();
	di = Qr;
	le = null;
	Yr = 10;
	for (let e = 0; e <= Yr; e++) fe();
	mi = Zr;
	u = [
		["elements"],
		["left", "right"],
		["value"],
		["directives", "body"],
		["label"],
		[
			"callee",
			"typeArguments",
			"arguments"
		],
		[
			"test",
			"consequent",
			"alternate"
		],
		["body", "test"],
		["expression"],
		[
			"left",
			"right",
			"body"
		],
		[
			"id",
			"typeParameters",
			"params",
			"predicate",
			"returnType",
			"body"
		],
		["object", "property"],
		["properties"],
		[
			"decorators",
			"key",
			"typeParameters",
			"params",
			"returnType",
			"body"
		],
		[
			"decorators",
			"key",
			"value"
		],
		["argument"],
		["expressions"],
		["id", "init"],
		["body"],
		[
			"decorators",
			"id",
			"typeParameters",
			"superClass",
			"superTypeArguments",
			"mixins",
			"implements",
			"body"
		],
		[
			"declaration",
			"specifiers",
			"source",
			"attributes"
		],
		["local"],
		["exported"],
		[
			"decorators",
			"variance",
			"key",
			"typeAnnotation",
			"value"
		],
		["id"],
		["key", "value"],
		["elementType"],
		["id", "typeParameters"],
		[
			"id",
			"typeParameters",
			"extends",
			"body"
		],
		["id", "body"],
		["typeAnnotation"],
		[
			"id",
			"typeParameters",
			"right"
		],
		["name", "typeAnnotation"],
		["types"],
		["qualification", "id"],
		["elementTypes"],
		["expression", "typeAnnotation"],
		["params"],
		["members"],
		["objectType", "indexType"],
		[
			"decorators",
			"key",
			"typeAnnotation",
			"value"
		],
		[
			"id",
			"typeParameters",
			"params",
			"returnType",
			"body"
		],
		[
			"key",
			"typeParameters",
			"params",
			"returnType"
		],
		[
			"typeParameters",
			"params",
			"returnType"
		],
		["parameterName", "typeAnnotation"],
		[
			"checkType",
			"extendsType",
			"trueType",
			"falseType"
		],
		["typeParameter"],
		["literal"],
		["expression", "typeArguments"],
		[
			"decorators",
			"key",
			"typeAnnotation"
		],
		["argument", "cases"],
		[
			"pattern",
			"body",
			"guard"
		],
		["properties", "rest"],
		["node"]
	];
	yi = mi({
		ArrayExpression: u[0],
		AssignmentExpression: u[1],
		BinaryExpression: u[1],
		InterpreterDirective: [],
		Directive: u[2],
		DirectiveLiteral: [],
		BlockStatement: u[3],
		BreakStatement: u[4],
		CallExpression: u[5],
		CatchClause: ["param", "body"],
		ConditionalExpression: u[6],
		ContinueStatement: u[4],
		DebuggerStatement: [],
		DoWhileStatement: u[7],
		EmptyStatement: [],
		ExpressionStatement: u[8],
		File: ["program"],
		ForInStatement: u[9],
		ForStatement: [
			"init",
			"test",
			"update",
			"body"
		],
		FunctionDeclaration: u[10],
		FunctionExpression: u[10],
		Identifier: ["typeAnnotation", "decorators"],
		IfStatement: u[6],
		LabeledStatement: ["label", "body"],
		StringLiteral: [],
		NumericLiteral: [],
		NullLiteral: [],
		BooleanLiteral: [],
		RegExpLiteral: [],
		LogicalExpression: u[1],
		MemberExpression: u[11],
		NewExpression: u[5],
		Program: u[3],
		ObjectExpression: u[12],
		ObjectMethod: u[13],
		ObjectProperty: u[14],
		RestElement: [
			"argument",
			"typeAnnotation",
			"decorators"
		],
		ReturnStatement: u[15],
		SequenceExpression: u[16],
		ParenthesizedExpression: u[8],
		SwitchCase: ["test", "consequent"],
		SwitchStatement: ["discriminant", "cases"],
		ThisExpression: [],
		ThrowStatement: u[15],
		TryStatement: [
			"block",
			"handler",
			"finalizer"
		],
		UnaryExpression: u[15],
		UpdateExpression: u[15],
		VariableDeclaration: ["declarations"],
		VariableDeclarator: u[17],
		WhileStatement: u[7],
		WithStatement: ["object", "body"],
		AssignmentPattern: [
			"left",
			"right",
			"decorators",
			"typeAnnotation"
		],
		ArrayPattern: [
			"elements",
			"typeAnnotation",
			"decorators"
		],
		ArrowFunctionExpression: [
			"typeParameters",
			"params",
			"predicate",
			"returnType",
			"body"
		],
		ClassBody: u[18],
		ClassExpression: u[19],
		ClassDeclaration: u[19],
		ExportAllDeclaration: [
			"source",
			"attributes",
			"exported"
		],
		ExportDefaultDeclaration: ["declaration"],
		ExportNamedDeclaration: u[20],
		ExportSpecifier: ["local", "exported"],
		ForOfStatement: u[9],
		ImportDeclaration: [
			"specifiers",
			"source",
			"attributes"
		],
		ImportDefaultSpecifier: u[21],
		ImportNamespaceSpecifier: u[21],
		ImportSpecifier: ["imported", "local"],
		MetaProperty: ["meta", "property"],
		ClassMethod: u[13],
		ObjectPattern: [
			"decorators",
			"properties",
			"typeAnnotation"
		],
		SpreadElement: u[15],
		Super: [],
		TaggedTemplateExpression: [
			"tag",
			"typeArguments",
			"quasi"
		],
		TemplateElement: [],
		TemplateLiteral: ["quasis", "expressions"],
		YieldExpression: u[15],
		AwaitExpression: u[15],
		ImportExpression: ["source", "options"],
		BigIntLiteral: [],
		ExportNamespaceSpecifier: u[22],
		OptionalMemberExpression: u[11],
		OptionalCallExpression: u[5],
		ClassProperty: u[23],
		ClassPrivateProperty: u[23],
		ClassPrivateMethod: u[13],
		PrivateName: u[24],
		StaticBlock: u[18],
		ImportAttribute: u[25],
		AnyTypeAnnotation: [],
		ArrayTypeAnnotation: u[26],
		BooleanTypeAnnotation: [],
		BooleanLiteralTypeAnnotation: [],
		NullLiteralTypeAnnotation: [],
		ClassImplements: u[27],
		DeclareClass: [
			"id",
			"typeParameters",
			"extends",
			"mixins",
			"implements",
			"body"
		],
		DeclareFunction: ["id", "predicate"],
		DeclareInterface: u[28],
		DeclareModule: u[29],
		DeclareModuleExports: u[30],
		DeclareTypeAlias: u[31],
		DeclareOpaqueType: [
			"id",
			"typeParameters",
			"supertype",
			"lowerBound",
			"upperBound"
		],
		DeclareVariable: ["id", "declarations"],
		DeclareExportDeclaration: u[20],
		DeclareExportAllDeclaration: ["source", "attributes"],
		DeclaredPredicate: u[2],
		ExistsTypeAnnotation: [],
		FunctionTypeAnnotation: [
			"typeParameters",
			"this",
			"params",
			"rest",
			"returnType"
		],
		FunctionTypeParam: u[32],
		GenericTypeAnnotation: u[27],
		InferredPredicate: [],
		InterfaceExtends: u[27],
		InterfaceDeclaration: u[28],
		InterfaceTypeAnnotation: ["extends", "body"],
		IntersectionTypeAnnotation: u[33],
		MixedTypeAnnotation: [],
		EmptyTypeAnnotation: [],
		NullableTypeAnnotation: u[30],
		NumberLiteralTypeAnnotation: [],
		BigIntLiteralTypeAnnotation: [],
		NumberTypeAnnotation: [],
		ObjectTypeAnnotation: [
			"properties",
			"indexers",
			"callProperties",
			"internalSlots"
		],
		ObjectTypeInternalSlot: ["id", "value"],
		ObjectTypeCallProperty: u[2],
		ObjectTypeIndexer: [
			"variance",
			"id",
			"key",
			"value"
		],
		ObjectTypeProperty: [
			"key",
			"value",
			"variance"
		],
		ObjectTypeSpreadProperty: u[15],
		OpaqueType: [
			"id",
			"typeParameters",
			"supertype",
			"impltype",
			"lowerBound",
			"upperBound"
		],
		QualifiedTypeIdentifier: u[34],
		StringLiteralTypeAnnotation: [],
		StringTypeAnnotation: [],
		SymbolTypeAnnotation: [],
		ThisTypeAnnotation: [],
		TupleTypeAnnotation: u[35],
		TypeofTypeAnnotation: ["argument", "typeArguments"],
		TypeAlias: u[31],
		TypeAnnotation: u[30],
		TypeCastExpression: u[36],
		TypeParameter: [
			"bound",
			"default",
			"variance"
		],
		TypeParameterDeclaration: u[37],
		TypeParameterInstantiation: u[37],
		UnionTypeAnnotation: u[33],
		Variance: [],
		VoidTypeAnnotation: [],
		EnumDeclaration: u[29],
		EnumBooleanBody: u[38],
		EnumNumberBody: u[38],
		EnumStringBody: u[38],
		EnumSymbolBody: u[38],
		EnumBooleanMember: u[17],
		EnumNumberMember: u[17],
		EnumStringMember: u[17],
		EnumDefaultedMember: u[24],
		IndexedAccessType: u[39],
		OptionalIndexedAccessType: u[39],
		JSXAttribute: ["name", "value"],
		JSXClosingElement: ["name"],
		JSXElement: [
			"openingElement",
			"children",
			"closingElement"
		],
		JSXEmptyExpression: [],
		JSXExpressionContainer: u[8],
		JSXSpreadChild: u[8],
		JSXIdentifier: [],
		JSXMemberExpression: u[11],
		JSXNamespacedName: ["namespace", "name"],
		JSXOpeningElement: [
			"name",
			"typeArguments",
			"attributes"
		],
		JSXSpreadAttribute: u[15],
		JSXText: [],
		JSXFragment: [
			"openingFragment",
			"children",
			"closingFragment"
		],
		JSXOpeningFragment: [],
		JSXClosingFragment: [],
		Placeholder: [],
		V8IntrinsicIdentifier: [],
		ArgumentPlaceholder: [],
		BindExpression: ["object", "callee"],
		ClassAccessorProperty: u[40],
		Decorator: u[8],
		DoExpression: u[18],
		ExportDefaultSpecifier: u[22],
		ModuleExpression: u[18],
		TopicReference: [],
		VoidPattern: [],
		TSParameterProperty: ["parameter", "decorators"],
		TSDeclareFunction: u[41],
		TSDeclareMethod: u[42],
		TSQualifiedName: u[1],
		TSCallSignatureDeclaration: u[43],
		TSConstructSignatureDeclaration: u[43],
		TSPropertySignature: ["key", "typeAnnotation"],
		TSMethodSignature: u[42],
		TSIndexSignature: ["parameters", "typeAnnotation"],
		TSAnyKeyword: [],
		TSBooleanKeyword: [],
		TSBigIntKeyword: [],
		TSIntrinsicKeyword: [],
		TSNeverKeyword: [],
		TSNullKeyword: [],
		TSNumberKeyword: [],
		TSObjectKeyword: [],
		TSStringKeyword: [],
		TSSymbolKeyword: [],
		TSUndefinedKeyword: [],
		TSUnknownKeyword: [],
		TSVoidKeyword: [],
		TSThisType: [],
		TSFunctionType: u[43],
		TSConstructorType: u[43],
		TSTypeReference: ["typeName", "typeArguments"],
		TSTypePredicate: u[44],
		TSTypeQuery: ["exprName", "typeArguments"],
		TSTypeLiteral: u[38],
		TSArrayType: u[26],
		TSTupleType: u[35],
		TSOptionalType: u[30],
		TSRestType: u[30],
		TSNamedTupleMember: ["label", "elementType"],
		TSUnionType: u[33],
		TSIntersectionType: u[33],
		TSConditionalType: u[45],
		TSInferType: u[46],
		TSParenthesizedType: u[30],
		TSTypeOperator: u[30],
		TSIndexedAccessType: u[39],
		TSMappedType: [
			"key",
			"constraint",
			"nameType",
			"typeAnnotation"
		],
		TSTemplateLiteralType: ["quasis", "types"],
		TSLiteralType: u[47],
		TSClassImplements: u[48],
		TSInterfaceHeritage: u[48],
		TSInterfaceDeclaration: u[28],
		TSInterfaceBody: u[18],
		TSTypeAliasDeclaration: [
			"id",
			"typeParameters",
			"typeAnnotation"
		],
		TSInstantiationExpression: u[48],
		TSAsExpression: u[36],
		TSSatisfiesExpression: u[36],
		TSTypeAssertion: u[36],
		TSEnumBody: u[38],
		TSEnumDeclaration: u[29],
		TSEnumMember: ["id", "initializer"],
		TSModuleDeclaration: u[29],
		TSModuleBlock: u[18],
		TSImportType: [
			"source",
			"options",
			"qualifier",
			"typeArguments"
		],
		TSImportEqualsDeclaration: ["id", "moduleReference"],
		TSExternalModuleReference: u[8],
		TSNonNullExpression: u[8],
		TSExportAssignment: u[8],
		TSNamespaceExportDeclaration: u[24],
		TSTypeAnnotation: u[30],
		TSTypeParameterInstantiation: u[37],
		TSTypeParameterDeclaration: u[37],
		TSTypeParameter: [
			"name",
			"constraint",
			"default"
		],
		ChainExpression: u[8],
		Literal: [],
		MethodDefinition: u[14],
		PrivateIdentifier: [],
		Property: u[25],
		PropertyDefinition: u[23],
		AccessorProperty: u[40],
		TSAbstractAccessorProperty: u[49],
		TSAbstractKeyword: [],
		TSAbstractMethodDefinition: u[25],
		TSAbstractPropertyDefinition: u[49],
		TSAsyncKeyword: [],
		TSDeclareKeyword: [],
		TSEmptyBodyFunctionExpression: [
			"id",
			"typeParameters",
			"params",
			"returnType"
		],
		TSExportKeyword: [],
		TSPrivateKeyword: [],
		TSProtectedKeyword: [],
		TSPublicKeyword: [],
		TSReadonlyKeyword: [],
		TSStaticKeyword: [],
		AsConstExpression: u[8],
		AsExpression: u[36],
		BigIntTypeAnnotation: [],
		ComponentDeclaration: [
			"id",
			"params",
			"body",
			"typeParameters",
			"rendersType"
		],
		ComponentParameter: ["name", "local"],
		ComponentTypeAnnotation: [
			"params",
			"rest",
			"typeParameters",
			"rendersType"
		],
		ComponentTypeParameter: u[32],
		ConditionalTypeAnnotation: u[45],
		DeclareComponent: [
			"id",
			"params",
			"rest",
			"typeParameters",
			"rendersType"
		],
		DeclareEnum: u[29],
		DeclareHook: u[24],
		DeclareNamespace: u[29],
		EnumBigIntBody: u[38],
		EnumBigIntMember: u[17],
		EnumBody: u[38],
		HookDeclaration: u[41],
		HookTypeAnnotation: [
			"params",
			"returnType",
			"rest",
			"typeParameters"
		],
		InferTypeAnnotation: u[46],
		KeyofTypeAnnotation: u[15],
		MatchArrayPattern: ["elements", "rest"],
		MatchAsPattern: ["pattern", "target"],
		MatchBindingPattern: u[24],
		MatchExpression: u[50],
		MatchExpressionCase: u[51],
		MatchIdentifierPattern: u[24],
		MatchInstanceObjectPattern: u[52],
		MatchInstancePattern: ["targetConstructor", "properties"],
		MatchLiteralPattern: u[47],
		MatchMemberPattern: ["base", "property"],
		MatchObjectPattern: u[52],
		MatchObjectPatternProperty: ["key", "pattern"],
		MatchOrPattern: ["patterns"],
		MatchRestPattern: u[15],
		MatchStatement: u[50],
		MatchStatementCase: u[51],
		MatchUnaryPattern: u[15],
		MatchWildcardPattern: [],
		NeverTypeAnnotation: [],
		ObjectTypeMappedTypeProperty: [
			"keyTparam",
			"propType",
			"sourceType",
			"variance"
		],
		QualifiedTypeofIdentifier: u[34],
		RecordDeclaration: [
			"id",
			"typeParameters",
			"implements",
			"body"
		],
		RecordDeclarationBody: u[0],
		RecordDeclarationImplements: ["id", "typeArguments"],
		RecordDeclarationProperty: [
			"key",
			"typeAnnotation",
			"defaultValue"
		],
		RecordDeclarationStaticProperty: [
			"key",
			"typeAnnotation",
			"value"
		],
		RecordExpression: [
			"recordConstructor",
			"typeArguments",
			"properties"
		],
		RecordExpressionProperties: u[12],
		SatisfiesExpression: u[36],
		TupleTypeLabeledElement: [
			"label",
			"elementType",
			"variance"
		],
		TupleTypeSpreadElement: ["label", "typeAnnotation"],
		TypeOperator: u[30],
		TypePredicate: u[44],
		UndefinedTypeAnnotation: [],
		UnknownTypeAnnotation: [],
		NGChainedExpression: u[16],
		NGEmptyExpression: [],
		NGPipeExpression: [
			"left",
			"right",
			"arguments"
		],
		NGMicrosyntax: u[18],
		NGMicrosyntaxAs: ["key", "alias"],
		NGMicrosyntaxExpression: ["expression", "alias"],
		NGMicrosyntaxKey: [],
		NGMicrosyntaxKeyedExpression: ["key", "expression"],
		NGMicrosyntaxLet: u[25],
		NGRoot: u[53],
		JsExpressionRoot: u[53],
		JsonRoot: u[53],
		TSJSDocAllType: [],
		TSJSDocUnknownType: [],
		TSJSDocNullableType: u[30],
		TSJSDocNonNullableType: u[30]
	});
	gi = Pe;
	Y([
		"RegExpLiteral",
		"BigIntLiteral",
		"NumericLiteral",
		"StringLiteral",
		"DirectiveLiteral",
		"Literal",
		"JSXText",
		"TemplateElement",
		"StringLiteralTypeAnnotation",
		"NumberLiteralTypeAnnotation",
		"BigIntLiteralTypeAnnotation"
	]);
	Ne = es;
	at = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty);
	rs = /\*\/$/;
	ss = /^\/\*\*?/;
	as = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/;
	ns = /(^|\s+)\/\/([^\n\r]*)/g;
	bi = /^(\r?\n)+/;
	os = /(?:^|\r?\n) *(@[^\n\r]*?) *\r?\n *(?![^\n\r@]*\/\/[^]*)([^\s@][^\n\r@]+?) *\r?\n/g;
	Si = /(?:^|\r?\n) *@(\S+) *([^\n\r]*)/g;
	us = /(\r?\n|^) *\* ?/g;
	hs = [];
	Ei = ["noformat", "noprettier"];
	ki = ["format", "prettier"];
	Ti = cs;
	Le = ps;
	Re = "module";
	Pi = "commonjs";
	Ve = [Re, Pi];
	ls = {
		ecmaVersion: "latest",
		allowReserved: !0,
		allowReturnOutsideFunction: !0,
		allowSuperOutsideMethod: !0,
		checkPrivateFields: !1,
		locations: !1,
		ranges: !0,
		preserveParens: !0
	};
	ds = () => (Ni ?? (Ni = T.extend((0, Li.default)())), Ni);
	ys = Le(xs);
	ht = {};
	Be(ht, { espree: () => As });
	Oi = pt(et(), 1);
	Ri = [
		3,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17
	];
	gs = Ie(0, Ri, -1);
	$ = Symbol("espree's internal state");
	ot = Symbol("espree's esprimaFinishNode");
	ut = () => (e) => {
		let t = Object.assign({}, e.acorn.tokTypes);
		return e.acornJsx && Object.assign(t, e.acornJsx.tokTypes), class extends e {
			constructor(r, s) {
				(typeof r != "object" || r === null) && (r = {}), typeof s != "string" && !(s instanceof String) && (s = String(s));
				let n = r.sourceType, o = Vi(r), c = o.ecmaFeatures || {}, l = {
					originalSourceType: n || o.sourceType,
					tokens: null,
					comments: o.comment === !0 ? [] : null,
					impliedStrict: c.impliedStrict === !0 && o.ecmaVersion >= 5,
					ecmaVersion: o.ecmaVersion,
					jsxAttrValueToken: !1,
					lastToken: null,
					templateElements: []
				};
				super({
					ecmaVersion: o.ecmaVersion,
					sourceType: o.sourceType,
					ranges: o.ranges,
					locations: o.locations,
					allowReserved: o.allowReserved,
					allowReturnOutsideFunction: o.allowReturnOutsideFunction,
					onToken(m) {
						m.type !== t.eof && (l.lastToken = m);
					},
					onComment(m, S, k, p, x, y) {
						if (l.comments) {
							let v = Cs(m, S, k, p, x, y, s);
							l.comments.push(v);
						}
					}
				}, s), this[$] = l;
			}
			tokenize() {
				do
					this.next();
				while (this.type !== t.eof);
				this.next();
				let r = this[$], s = r.tokens;
				return r.comments && (s.comments = r.comments), s;
			}
			finishNode(r, s) {
				let n = super.finishNode(r, s);
				return this[ot](n);
			}
			finishNodeAt(r, s, n, o) {
				let c = super.finishNodeAt(r, s, n, o);
				return this[ot](c);
			}
			parse() {
				let r = this[$], n = super.parse();
				return n.sourceType = r.originalSourceType, r.comments && (n.comments = r.comments), r.tokens && (n.tokens = r.tokens), this[$].templateElements.forEach((o) => {
					let h = o.tail ? 1 : 2;
					o.start += -1, o.end += h, o.range && (o.range[0] += -1, o.range[1] += h), o.loc && (o.loc.start.column += -1, o.loc.end.column += h);
				}), n;
			}
			parseTopLevel(r) {
				return this[$].impliedStrict && (this.strict = !0), super.parseTopLevel(r);
			}
			raise(r, s) {
				let n = e.acorn.getLineInfo(this.input, r), o = new SyntaxError(s);
				throw o.index = r, o.lineNumber = n.line, o.column = n.column + 1, o;
			}
			raiseRecoverable(r, s) {
				this.raise(r, s);
			}
			unexpected(r) {
				let s = "Unexpected token";
				if (r != null) {
					if (this.pos = r, this.options.locations) for (; this.pos < this.lineStart;) this.lineStart = this.input.lastIndexOf(`
`, this.lineStart - 2) + 1, --this.curLine;
					this.nextToken();
				}
				this.end > this.start && (s += ` ${this.input.slice(this.start, this.end)}`), this.raise(this.start, s);
			}
			jsx_readString(r) {
				let s = super.jsx_readString(r);
				return this.type === t.string && (this[$].jsxAttrValueToken = !0), s;
			}
			[ot](r) {
				return r.type === "TemplateElement" && this[$].templateElements.push(r), r.type.includes("Function") && !("generator" in r) && (r.generator = !1), r;
			}
		};
	};
	_s = {
		_regular: null,
		_jsx: null,
		get regular() {
			if (this._regular === null) {
				let e = ut();
				this._regular = T.extend(e);
			}
			return this._regular;
		},
		get jsx() {
			if (this._jsx === null) {
				let e = ut(), t = (0, Oi.default)();
				this._jsx = T.extend(t, e);
			}
			return this._jsx;
		},
		get(e) {
			return !!(e && e.ecmaFeatures && e.ecmaFeatures.jsx) ? this.jsx : this.regular;
		}
	};
	Es = {
		ecmaVersion: "latest",
		range: !0,
		loc: !1,
		comment: !0,
		tokens: !1,
		ecmaFeatures: {
			jsx: !0,
			impliedStrict: !1
		}
	};
	As = Le(Ts);
	ws = {
		...nt,
		...ht
	};
}))();
export { Mi as default, ws as parsers };
