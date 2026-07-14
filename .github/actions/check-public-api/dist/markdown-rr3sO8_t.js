import { __esmMin } from "./rolldown-runtime-aR1ZRE-I.js";
//#region ../../node_modules/.pnpm/prettier@3.9.4/node_modules/prettier/plugins/markdown.mjs
function jn(e, t) {
	let r = t || gm;
	return bu(e, typeof r.includeImageAlt == "boolean" ? r.includeImageAlt : !0, typeof r.includeHtml == "boolean" ? r.includeHtml : !0);
}
function bu(e, t, r) {
	if (xm(e)) {
		if ("value" in e) return e.type === "html" && !r ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return Fu(e.children, t, r);
	}
	return Array.isArray(e) ? Fu(e, t, r) : "";
}
function Fu(e, t, r) {
	let n = [], i = -1;
	for (; ++i < e.length;) n[i] = bu(e[i], t, r);
	return n.join("");
}
function xm(e) {
	return !!(e && typeof e == "object");
}
function Tt(e) {
	return km.call(Wn, e) ? Wn[e] : !1;
}
function re(e, t, r, n) {
	let i = e.length, u = 0, a;
	if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, r = r > 0 ? r : 0, n.length < 1e4) a = Array.from(n), a.unshift(t, r), e.splice(...a);
	else for (r && e.splice(t, r); u < n.length;) a = n.slice(u, u + 1e4), a.unshift(t, 0), e.splice(...a), u += 1e4, t += 1e4;
}
function he(e, t) {
	return e.length > 0 ? (re(e, e.length, 0, t), e) : t;
}
function Nr(e) {
	let t = {}, r = -1;
	for (; ++r < e.length;) Fm(t, e[r]);
	return t;
}
function Fm(e, t) {
	let r;
	for (r in t) {
		let i = (Eu.call(e, r) ? e[r] : void 0) || (e[r] = {}), u = t[r], a;
		if (u) for (a in u) {
			Eu.call(i, a) || (i[a] = []);
			let o = u[a];
			bm(i[a], Array.isArray(o) ? o : o ? [o] : []);
		}
	}
}
function bm(e, t) {
	let r = -1, n = [];
	for (; ++r < t.length;) (t[r].add === "after" ? e : n).push(t[r]);
	re(e, 0, 0, n);
}
function Rr(e, t) {
	let r = Number.parseInt(e, t);
	return r < 9 || r === 11 || r > 13 && r < 32 || r > 126 && r < 160 || r > 55295 && r < 57344 || r > 64975 && r < 65008 || (r & 65535) === 65535 || (r & 65535) === 65534 || r > 1114111 ? "�" : String.fromCodePoint(r);
}
function fe(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
function mt(e) {
	return e !== null && (e < 32 || e === 127);
}
function B(e) {
	return e !== null && e < -2;
}
function G(e) {
	return e !== null && (e < 0 || e === 32);
}
function H(e) {
	return e === -2 || e === -1 || e === 32;
}
function rt(e) {
	return t;
	function t(r) {
		return r !== null && r > -1 && e.test(String.fromCharCode(r));
	}
}
function U(e, t, r, n) {
	let i = n ? n - 1 : Number.POSITIVE_INFINITY, u = 0;
	return a;
	function a(s) {
		return H(s) ? (e.enter(r), o(s)) : t(s);
	}
	function o(s) {
		return H(s) && u++ < i ? (e.consume(s), o) : (e.exit(r), t(s));
	}
}
function Em(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, n, i), r;
	return t;
	function n(o) {
		if (o === null) {
			e.consume(o);
			return;
		}
		return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), U(e, t, "linePrefix");
	}
	function i(o) {
		return e.enter("paragraph"), u(o);
	}
	function u(o) {
		let s = e.enter("chunkText", {
			contentType: "text",
			previous: r
		});
		return r && (r.next = s), r = s, a(o);
	}
	function a(o) {
		if (o === null) {
			e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
			return;
		}
		return B(o) ? (e.consume(o), e.exit("chunkText"), u) : (e.consume(o), a);
	}
}
function wm(e) {
	let t = this, r = [], n = 0, i, u, a;
	return o;
	function o(w) {
		if (n < r.length) {
			let T = r[n];
			return t.containerState = T[1], e.attempt(T[0].continuation, s, l)(w);
		}
		return l(w);
	}
	function s(w) {
		if (n++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && E();
			let T = t.events.length, y = T, d;
			for (; y--;) if (t.events[y][0] === "exit" && t.events[y][1].type === "chunkFlow") {
				d = t.events[y][1].end;
				break;
			}
			k(n);
			let v = T;
			for (; v < t.events.length;) t.events[v][1].end = { ...d }, v++;
			return re(t.events, y + 1, 0, t.events.slice(T)), t.events.length = v, l(w);
		}
		return o(w);
	}
	function l(w) {
		if (n === r.length) {
			if (!i) return p(w);
			if (i.currentConstruct && i.currentConstruct.concrete) return D(w);
			t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(Au, f, c)(w);
	}
	function f(w) {
		return i && E(), k(n), p(w);
	}
	function c(w) {
		return t.parser.lazy[t.now().line] = n !== r.length, a = t.now().offset, D(w);
	}
	function p(w) {
		return t.containerState = {}, e.attempt(Au, m, D)(w);
	}
	function m(w) {
		return n++, r.push([t.currentConstruct, t.containerState]), p(w);
	}
	function D(w) {
		if (w === null) {
			i && E(), k(0), e.consume(w);
			return;
		}
		return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: u
		}), x(w);
	}
	function x(w) {
		if (w === null) {
			g(e.exit("chunkFlow"), !0), k(0), e.consume(w);
			return;
		}
		return B(w) ? (e.consume(w), g(e.exit("chunkFlow")), n = 0, t.interrupt = void 0, o) : (e.consume(w), x);
	}
	function g(w, T) {
		let y = t.sliceStream(w);
		if (T && y.push(null), w.previous = u, u && (u.next = w), u = w, i.defineSkip(w.start), i.write(y), t.parser.lazy[w.start.line]) {
			let d = i.events.length;
			for (; d--;) if (i.events[d][1].start.offset < a && (!i.events[d][1].end || i.events[d][1].end.offset > a)) return;
			let v = t.events.length, L = v, C, b;
			for (; L--;) if (t.events[L][0] === "exit" && t.events[L][1].type === "chunkFlow") {
				if (C) {
					b = t.events[L][1].end;
					break;
				}
				C = !0;
			}
			for (k(n), d = v; d < t.events.length;) t.events[d][1].end = { ...b }, d++;
			re(t.events, L + 1, 0, t.events.slice(v)), t.events.length = d;
		}
	}
	function k(w) {
		let T = r.length;
		for (; T-- > w;) {
			let y = r[T];
			t.containerState = y[1], y[0].exit.call(t, e);
		}
		r.length = w;
	}
	function E() {
		i.write([null]), u = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function Cm(e, t, r) {
	return U(e, e.attempt(this.parser.constructs.document, t, r), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function St(e) {
	if (e === null || G(e) || Ie(e)) return 1;
	if (Dt(e)) return 2;
}
function nt(e, t, r) {
	let n = [], i = -1;
	for (; ++i < e.length;) {
		let u = e[i].resolveAll;
		u && !n.includes(u) && (t = u(t, r), n.push(u));
	}
	return t;
}
function ym(e, t) {
	let r = -1, n, i, u, a, o, s, l, f;
	for (; ++r < e.length;) if (e[r][0] === "enter" && e[r][1].type === "attentionSequence" && e[r][1]._close) {
		for (n = r; n--;) if (e[n][0] === "exit" && e[n][1].type === "attentionSequence" && e[n][1]._open && t.sliceSerialize(e[n][1]).charCodeAt(0) === t.sliceSerialize(e[r][1]).charCodeAt(0)) {
			if ((e[n][1]._close || e[r][1]._open) && (e[r][1].end.offset - e[r][1].start.offset) % 3 && !((e[n][1].end.offset - e[n][1].start.offset + e[r][1].end.offset - e[r][1].start.offset) % 3)) continue;
			s = e[n][1].end.offset - e[n][1].start.offset > 1 && e[r][1].end.offset - e[r][1].start.offset > 1 ? 2 : 1;
			let c = { ...e[n][1].end }, p = { ...e[r][1].start };
			Su(c, -s), Su(p, s), a = {
				type: s > 1 ? "strongSequence" : "emphasisSequence",
				start: c,
				end: { ...e[n][1].end }
			}, o = {
				type: s > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[r][1].start },
				end: p
			}, u = {
				type: s > 1 ? "strongText" : "emphasisText",
				start: { ...e[n][1].end },
				end: { ...e[r][1].start }
			}, i = {
				type: s > 1 ? "strong" : "emphasis",
				start: { ...a.start },
				end: { ...o.end }
			}, e[n][1].end = { ...a.start }, e[r][1].start = { ...o.end }, l = [], e[n][1].end.offset - e[n][1].start.offset && (l = he(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])), l = he(l, [
				[
					"enter",
					i,
					t
				],
				[
					"enter",
					a,
					t
				],
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					u,
					t
				]
			]), l = he(l, nt(t.parser.constructs.insideSpan.null, e.slice(n + 1, r), t)), l = he(l, [
				[
					"exit",
					u,
					t
				],
				[
					"enter",
					o,
					t
				],
				[
					"exit",
					o,
					t
				],
				[
					"exit",
					i,
					t
				]
			]), e[r][1].end.offset - e[r][1].start.offset ? (f = 2, l = he(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])) : f = 0, re(e, n - 1, r - n + 3, l), r = n + l.length - f - 2;
			break;
		}
	}
	for (r = -1; ++r < e.length;) e[r][1].type === "attentionSequence" && (e[r][1].type = "data");
	return e;
}
function vm(e, t) {
	let r = this.parser.constructs.attentionMarkers.null, n = this.previous, i = St(n), u;
	return a;
	function a(s) {
		return u = s, e.enter("attentionSequence"), o(s);
	}
	function o(s) {
		if (s === u) return e.consume(s), o;
		let l = e.exit("attentionSequence"), f = St(s), c = !f || f === 2 && i || r.includes(s), p = !i || i === 2 && f || r.includes(n);
		return l._open = !!(u === 42 ? c : c && (i || !p)), l._close = !!(u === 42 ? p : p && (f || !c)), t(s);
	}
}
function Su(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
function Am(e, t, r) {
	let n = 0;
	return i;
	function i(m) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(m), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), u;
	}
	function u(m) {
		return K(m) ? (e.consume(m), a) : m === 64 ? r(m) : l(m);
	}
	function a(m) {
		return m === 43 || m === 45 || m === 46 || Q(m) ? (n = 1, o(m)) : l(m);
	}
	function o(m) {
		return m === 58 ? (e.consume(m), n = 0, s) : (m === 43 || m === 45 || m === 46 || Q(m)) && n++ < 32 ? (e.consume(m), o) : (n = 0, l(m));
	}
	function s(m) {
		return m === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(m), e.exit("autolinkMarker"), e.exit("autolink"), t) : m === null || m === 32 || m === 60 || mt(m) ? r(m) : (e.consume(m), s);
	}
	function l(m) {
		return m === 64 ? (e.consume(m), f) : wu(m) ? (e.consume(m), l) : r(m);
	}
	function f(m) {
		return Q(m) ? c(m) : r(m);
	}
	function c(m) {
		return m === 46 ? (e.consume(m), n = 0, f) : m === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(m), e.exit("autolinkMarker"), e.exit("autolink"), t) : p(m);
	}
	function p(m) {
		if ((m === 45 || Q(m)) && n++ < 63) {
			let D = m === 45 ? p : c;
			return e.consume(m), D;
		}
		return r(m);
	}
}
function Tm(e, t, r) {
	return n;
	function n(u) {
		return H(u) ? U(e, i, "linePrefix")(u) : i(u);
	}
	function i(u) {
		return u === null || B(u) ? t(u) : r(u);
	}
}
function Sm(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		if (a === 62) {
			let o = n.containerState;
			return o.open || (e.enter("blockQuote", { _container: !0 }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(a), e.exit("blockQuoteMarker"), u;
		}
		return r(a);
	}
	function u(a) {
		return H(a) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(a), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(a));
	}
}
function Lm(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return H(a) ? U(e, u, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a) : u(a);
	}
	function u(a) {
		return e.attempt(Mr, t, r)(a);
	}
}
function Im(e) {
	e.exit("blockQuote");
}
function qm(e, t, r) {
	return n;
	function n(u) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(u), e.exit("escapeMarker"), i;
	}
	function i(u) {
		return yu(u) ? (e.enter("characterEscapeValue"), e.consume(u), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : r(u);
	}
}
function Bm(e, t, r) {
	let n = this, i = 0, u, a;
	return o;
	function o(c) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), s;
	}
	function s(c) {
		return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), u = 31, a = Q, f(c));
	}
	function l(c) {
		return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), u = 6, a = Cu, f) : (e.enter("characterReferenceValue"), u = 7, a = tr, f(c));
	}
	function f(c) {
		if (c === 59 && i) {
			let p = e.exit("characterReferenceValue");
			return a === Q && !Tt(n.sliceSerialize(p)) ? r(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return a(c) && i++ < u ? (e.consume(c), f) : r(c);
	}
}
function _m(e, t, r) {
	let n = this, i = {
		partial: !0,
		tokenize: y
	}, u = 0, a = 0, o;
	return s;
	function s(d) {
		return l(d);
	}
	function l(d) {
		let v = n.events[n.events.length - 1];
		return u = v && v[1].type === "linePrefix" ? v[2].sliceSerialize(v[1], !0).length : 0, o = d, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(d);
	}
	function f(d) {
		return d === o ? (a++, e.consume(d), f) : a < 3 ? r(d) : (e.exit("codeFencedFenceSequence"), H(d) ? U(e, c, "whitespace")(d) : c(d));
	}
	function c(d) {
		return d === null || B(d) ? (e.exit("codeFencedFence"), n.interrupt ? t(d) : e.check(Lu, x, T)(d)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), p(d));
	}
	function p(d) {
		return d === null || B(d) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(d)) : H(d) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), U(e, m, "whitespace")(d)) : d === 96 && d === o ? r(d) : (e.consume(d), p);
	}
	function m(d) {
		return d === null || B(d) ? c(d) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), D(d));
	}
	function D(d) {
		return d === null || B(d) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(d)) : d === 96 && d === o ? r(d) : (e.consume(d), D);
	}
	function x(d) {
		return e.attempt(i, T, g)(d);
	}
	function g(d) {
		return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), k;
	}
	function k(d) {
		return u > 0 && H(d) ? U(e, E, "linePrefix", u + 1)(d) : E(d);
	}
	function E(d) {
		return d === null || B(d) ? e.check(Lu, x, T)(d) : (e.enter("codeFlowValue"), w(d));
	}
	function w(d) {
		return d === null || B(d) ? (e.exit("codeFlowValue"), E(d)) : (e.consume(d), w);
	}
	function T(d) {
		return e.exit("codeFenced"), t(d);
	}
	function y(d, v, L) {
		let C = 0;
		return b;
		function b(O) {
			return d.enter("lineEnding"), d.consume(O), d.exit("lineEnding"), _;
		}
		function _(O) {
			return d.enter("codeFencedFence"), H(O) ? U(d, I, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(O) : I(O);
		}
		function I(O) {
			return O === o ? (d.enter("codeFencedFenceSequence"), S(O)) : L(O);
		}
		function S(O) {
			return O === o ? (C++, d.consume(O), S) : C >= a ? (d.exit("codeFencedFenceSequence"), H(O) ? U(d, R, "whitespace")(O) : R(O)) : L(O);
		}
		function R(O) {
			return O === null || B(O) ? (d.exit("codeFencedFence"), v(O)) : L(O);
		}
	}
}
function Pm(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return a === null ? r(a) : (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), u);
	}
	function u(a) {
		return n.parser.lazy[n.now().line] ? r(a) : t(a);
	}
}
function Nm(e, t, r) {
	let n = this;
	return i;
	function i(l) {
		return e.enter("codeIndented"), U(e, u, "linePrefix", 5)(l);
	}
	function u(l) {
		let f = n.events[n.events.length - 1];
		return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? a(l) : r(l);
	}
	function a(l) {
		return l === null ? s(l) : B(l) ? e.attempt(Om, a, s)(l) : (e.enter("codeFlowValue"), o(l));
	}
	function o(l) {
		return l === null || B(l) ? (e.exit("codeFlowValue"), a(l)) : (e.consume(l), o);
	}
	function s(l) {
		return e.exit("codeIndented"), t(l);
	}
}
function Rm(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return n.parser.lazy[n.now().line] ? r(a) : B(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), i) : U(e, u, "linePrefix", 5)(a);
	}
	function u(a) {
		let o = n.events[n.events.length - 1];
		return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(a) : B(a) ? i(a) : r(a);
	}
}
function Mm(e) {
	let t = e.length - 4, r = 3, n, i;
	if ((e[r][1].type === "lineEnding" || e[r][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (n = r; ++n < t;) if (e[n][1].type === "codeTextData") {
			e[r][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", r += 2, t -= 2;
			break;
		}
	}
	for (n = r - 1, t++; ++n <= t;) i === void 0 ? n !== t && e[n][1].type !== "lineEnding" && (i = n) : (n === t || e[n][1].type === "lineEnding") && (e[i][1].type = "codeTextData", n !== i + 2 && (e[i][1].end = e[n - 1][1].end, e.splice(i + 2, n - i - 2), t -= n - i - 2, n = i + 2), i = void 0);
	return e;
}
function zm(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Um(e, t, r) {
	let i = 0, u, a;
	return o;
	function o(p) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(p);
	}
	function s(p) {
		return p === 96 ? (e.consume(p), i++, s) : (e.exit("codeTextSequence"), l(p));
	}
	function l(p) {
		return p === null ? r(p) : p === 32 ? (e.enter("space"), e.consume(p), e.exit("space"), l) : p === 96 ? (a = e.enter("codeTextSequence"), u = 0, c(p)) : B(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), l) : (e.enter("codeTextData"), f(p));
	}
	function f(p) {
		return p === null || p === 32 || p === 96 || B(p) ? (e.exit("codeTextData"), l(p)) : (e.consume(p), f);
	}
	function c(p) {
		return p === 96 ? (e.consume(p), u++, c) : u === i ? (e.exit("codeTextSequence"), e.exit("codeText"), t(p)) : (a.type = "codeTextData", f(p));
	}
}
function ir(e, t) {
	let r = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; r < t.length;) e.push(...t.slice(r, r + 1e4)), r += 1e4;
}
function Gr(e) {
	let t = {}, r = -1, n, i, u, a, o, s, l, f = new Vr(e);
	for (; ++r < f.length;) {
		for (; r in t;) r = t[r];
		if (n = f.get(r), r && n[1].type === "chunkFlow" && f.get(r - 1)[1].type === "listItemPrefix" && (s = n[1]._tokenizer.events, u = 0, u < s.length && s[u][1].type === "lineEndingBlank" && (u += 2), u < s.length && s[u][1].type === "content")) for (; ++u < s.length && s[u][1].type !== "content";) s[u][1].type === "chunkText" && (s[u][1]._isInFirstContentOfListItem = !0, u++);
		if (n[0] === "enter") n[1].contentType && (Object.assign(t, Hm(f, r)), r = t[r], l = !0);
		else if (n[1]._container) {
			for (u = r, i = void 0; u--;) if (a = f.get(u), a[1].type === "lineEnding" || a[1].type === "lineEndingBlank") a[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), a[1].type = "lineEnding", i = u);
			else if (!(a[1].type === "linePrefix" || a[1].type === "listItemIndent")) break;
			i && (n[1].end = { ...f.get(i)[1].start }, o = f.slice(i, r), o.unshift(n), f.splice(i, r - i + 1, o));
		}
	}
	return re(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !l;
}
function Hm(e, t) {
	let r = e.get(t)[1], n = e.get(t)[2], i = t - 1, u = [], a = r._tokenizer;
	a || (a = n.parser[r.contentType](r.start), r._contentTypeTextTrailing && (a._contentTypeTextTrailing = !0));
	let o = a.events, s = [], l = {}, f, c, p = -1, m = r, D = 0, x = 0, g = [x];
	for (; m;) {
		for (; e.get(++i)[1] !== m;);
		u.push(i), m._tokenizer || (f = n.sliceStream(m), m.next || f.push(null), c && a.defineSkip(m.start), m._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(f), m._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), c = m, m = m.next;
	}
	for (m = r; ++p < o.length;) o[p][0] === "exit" && o[p - 1][0] === "enter" && o[p][1].type === o[p - 1][1].type && o[p][1].start.line !== o[p][1].end.line && (x = p + 1, g.push(x), m._tokenizer = void 0, m.previous = void 0, m = m.next);
	for (a.events = [], m ? (m._tokenizer = void 0, m.previous = void 0) : g.pop(), p = g.length; p--;) {
		let k = o.slice(g[p], g[p + 1]), E = u.pop();
		s.push([E, E + k.length - 1]), e.splice(E, 2, k);
	}
	for (s.reverse(), p = -1; ++p < s.length;) l[D + s[p][0]] = D + s[p][1], D += s[p][1] - s[p][0] - 1;
	return l;
}
function Gm(e) {
	return Gr(e), e;
}
function jm(e, t) {
	let r;
	return n;
	function n(o) {
		return e.enter("content"), r = e.enter("chunkContent", { contentType: "content" }), i(o);
	}
	function i(o) {
		return o === null ? u(o) : B(o) ? e.check(Vm, a, u)(o) : (e.consume(o), i);
	}
	function u(o) {
		return e.exit("chunkContent"), e.exit("content"), t(o);
	}
	function a(o) {
		return e.consume(o), e.exit("chunkContent"), r.next = e.enter("chunkContent", {
			contentType: "content",
			previous: r
		}), r = r.next, i;
	}
}
function Wm(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), U(e, u, "linePrefix");
	}
	function u(a) {
		if (a === null || B(a)) return r(a);
		let o = n.events[n.events.length - 1];
		return !n.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(a) : e.interrupt(n.parser.constructs.flow, r, t)(a);
	}
}
function jr(e, t, r, n, i, u, a, o, s) {
	let l = s || Number.POSITIVE_INFINITY, f = 0;
	return c;
	function c(k) {
		return k === 60 ? (e.enter(n), e.enter(i), e.enter(u), e.consume(k), e.exit(u), p) : k === null || k === 32 || k === 41 || mt(k) ? r(k) : (e.enter(n), e.enter(a), e.enter(o), e.enter("chunkString", { contentType: "string" }), x(k));
	}
	function p(k) {
		return k === 62 ? (e.enter(u), e.consume(k), e.exit(u), e.exit(i), e.exit(n), t) : (e.enter(o), e.enter("chunkString", { contentType: "string" }), m(k));
	}
	function m(k) {
		return k === 62 ? (e.exit("chunkString"), e.exit(o), p(k)) : k === null || k === 60 || B(k) ? r(k) : (e.consume(k), k === 92 ? D : m);
	}
	function D(k) {
		return k === 60 || k === 62 || k === 92 ? (e.consume(k), m) : m(k);
	}
	function x(k) {
		return !f && (k === null || k === 41 || G(k)) ? (e.exit("chunkString"), e.exit(o), e.exit(a), e.exit(n), t(k)) : f < l && k === 40 ? (e.consume(k), f++, x) : k === 41 ? (e.consume(k), f--, x) : k === null || k === 32 || k === 40 || mt(k) ? r(k) : (e.consume(k), k === 92 ? g : x);
	}
	function g(k) {
		return k === 40 || k === 41 || k === 92 ? (e.consume(k), x) : x(k);
	}
}
function Wr(e, t, r, n, i, u) {
	let a = this, o = 0, s;
	return l;
	function l(m) {
		return e.enter(n), e.enter(i), e.consume(m), e.exit(i), e.enter(u), f;
	}
	function f(m) {
		return o > 999 || m === null || m === 91 || m === 93 && !s || m === 94 && !o && "_hiddenFootnoteSupport" in a.parser.constructs ? r(m) : m === 93 ? (e.exit(u), e.enter(i), e.consume(m), e.exit(i), e.exit(n), t) : B(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), f) : (e.enter("chunkString", { contentType: "string" }), c(m));
	}
	function c(m) {
		return m === null || m === 91 || m === 93 || B(m) || o++ > 999 ? (e.exit("chunkString"), f(m)) : (e.consume(m), s || (s = !H(m)), m === 92 ? p : c);
	}
	function p(m) {
		return m === 91 || m === 92 || m === 93 ? (e.consume(m), o++, c) : c(m);
	}
}
function Yr(e, t, r, n, i, u) {
	let a;
	return o;
	function o(p) {
		return p === 34 || p === 39 || p === 40 ? (e.enter(n), e.enter(i), e.consume(p), e.exit(i), a = p === 40 ? 41 : p, s) : r(p);
	}
	function s(p) {
		return p === a ? (e.enter(i), e.consume(p), e.exit(i), e.exit(n), t) : (e.enter(u), l(p));
	}
	function l(p) {
		return p === a ? (e.exit(u), s(a)) : p === null ? r(p) : B(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), U(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), f(p));
	}
	function f(p) {
		return p === a || p === null || B(p) ? (e.exit("chunkString"), l(p)) : (e.consume(p), p === 92 ? c : f);
	}
	function c(p) {
		return p === a || p === 92 ? (e.consume(p), f) : f(p);
	}
}
function dt(e, t) {
	let r;
	return n;
	function n(i) {
		return B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), r = !0, n) : H(i) ? U(e, n, r ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
function $m(e, t, r) {
	let n = this, i;
	return u;
	function u(m) {
		return e.enter("definition"), a(m);
	}
	function a(m) {
		return Wr.call(n, e, o, r, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(m);
	}
	function o(m) {
		return i = fe(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1)), m === 58 ? (e.enter("definitionMarker"), e.consume(m), e.exit("definitionMarker"), s) : r(m);
	}
	function s(m) {
		return G(m) ? dt(e, l)(m) : l(m);
	}
	function l(m) {
		return jr(e, f, r, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(m);
	}
	function f(m) {
		return e.attempt(Ym, c, c)(m);
	}
	function c(m) {
		return H(m) ? U(e, p, "whitespace")(m) : p(m);
	}
	function p(m) {
		return m === null || B(m) ? (e.exit("definition"), n.parser.defined.push(i), t(m)) : r(m);
	}
}
function Km(e, t, r) {
	return n;
	function n(o) {
		return G(o) ? dt(e, i)(o) : r(o);
	}
	function i(o) {
		return Yr(e, u, r, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
	}
	function u(o) {
		return H(o) ? U(e, a, "whitespace")(o) : a(o);
	}
	function a(o) {
		return o === null || B(o) ? t(o) : r(o);
	}
}
function Qm(e, t, r) {
	return n;
	function n(u) {
		return e.enter("hardBreakEscape"), e.consume(u), i;
	}
	function i(u) {
		return B(u) ? (e.exit("hardBreakEscape"), t(u)) : r(u);
	}
}
function Jm(e, t) {
	let r = e.length - 2, n = 3, i, u;
	return e[n][1].type === "whitespace" && (n += 2), r - 2 > n && e[r][1].type === "whitespace" && (r -= 2), e[r][1].type === "atxHeadingSequence" && (n === r - 1 || r - 4 > n && e[r - 2][1].type === "whitespace") && (r -= n + 1 === r ? 2 : 4), r > n && (i = {
		type: "atxHeadingText",
		start: e[n][1].start,
		end: e[r][1].end
	}, u = {
		type: "chunkText",
		start: e[n][1].start,
		end: e[r][1].end,
		contentType: "text"
	}, re(e, n, r - n + 1, [
		[
			"enter",
			i,
			t
		],
		[
			"enter",
			u,
			t
		],
		[
			"exit",
			u,
			t
		],
		[
			"exit",
			i,
			t
		]
	])), e;
}
function Xm(e, t, r) {
	let n = 0;
	return i;
	function i(f) {
		return e.enter("atxHeading"), u(f);
	}
	function u(f) {
		return e.enter("atxHeadingSequence"), a(f);
	}
	function a(f) {
		return f === 35 && n++ < 6 ? (e.consume(f), a) : f === null || G(f) ? (e.exit("atxHeadingSequence"), o(f)) : r(f);
	}
	function o(f) {
		return f === 35 ? (e.enter("atxHeadingSequence"), s(f)) : f === null || B(f) ? (e.exit("atxHeading"), t(f)) : H(f) ? U(e, o, "whitespace")(f) : (e.enter("atxHeadingText"), l(f));
	}
	function s(f) {
		return f === 35 ? (e.consume(f), s) : (e.exit("atxHeadingSequence"), o(f));
	}
	function l(f) {
		return f === null || f === 35 || G(f) ? (e.exit("atxHeadingText"), o(f)) : (e.consume(f), l);
	}
}
function tD(e) {
	let t = e.length;
	for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function rD(e, t, r) {
	let n = this, i, u, a, o, s;
	return l;
	function l(F) {
		return f(F);
	}
	function f(F) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(F), c;
	}
	function c(F) {
		return F === 33 ? (e.consume(F), p) : F === 47 ? (e.consume(F), u = !0, x) : F === 63 ? (e.consume(F), i = 3, n.interrupt ? t : h) : K(F) ? (e.consume(F), a = String.fromCharCode(F), g) : r(F);
	}
	function p(F) {
		return F === 45 ? (e.consume(F), i = 2, m) : F === 91 ? (e.consume(F), i = 5, o = 0, D) : K(F) ? (e.consume(F), i = 4, n.interrupt ? t : h) : r(F);
	}
	function m(F) {
		return F === 45 ? (e.consume(F), n.interrupt ? t : h) : r(F);
	}
	function D(F) {
		return F === "CDATA[".charCodeAt(o++) ? (e.consume(F), o === 6 ? n.interrupt ? t : I : D) : r(F);
	}
	function x(F) {
		return K(F) ? (e.consume(F), a = String.fromCharCode(F), g) : r(F);
	}
	function g(F) {
		if (F === null || F === 47 || F === 62 || G(F)) {
			let ee = F === 47, ce = a.toLowerCase();
			return !ee && !u && Zn.includes(ce) ? (i = 1, n.interrupt ? t(F) : I(F)) : Iu.includes(a.toLowerCase()) ? (i = 6, ee ? (e.consume(F), k) : n.interrupt ? t(F) : I(F)) : (i = 7, n.interrupt && !n.parser.lazy[n.now().line] ? r(F) : u ? E(F) : w(F));
		}
		return F === 45 || Q(F) ? (e.consume(F), a += String.fromCharCode(F), g) : r(F);
	}
	function k(F) {
		return F === 62 ? (e.consume(F), n.interrupt ? t : I) : r(F);
	}
	function E(F) {
		return H(F) ? (e.consume(F), E) : b(F);
	}
	function w(F) {
		return F === 47 ? (e.consume(F), b) : F === 58 || F === 95 || K(F) ? (e.consume(F), T) : H(F) ? (e.consume(F), w) : b(F);
	}
	function T(F) {
		return F === 45 || F === 46 || F === 58 || F === 95 || Q(F) ? (e.consume(F), T) : y(F);
	}
	function y(F) {
		return F === 61 ? (e.consume(F), d) : H(F) ? (e.consume(F), y) : w(F);
	}
	function d(F) {
		return F === null || F === 60 || F === 61 || F === 62 || F === 96 ? r(F) : F === 34 || F === 39 ? (e.consume(F), s = F, v) : H(F) ? (e.consume(F), d) : L(F);
	}
	function v(F) {
		return F === s ? (e.consume(F), s = null, C) : F === null || B(F) ? r(F) : (e.consume(F), v);
	}
	function L(F) {
		return F === null || F === 34 || F === 39 || F === 47 || F === 60 || F === 61 || F === 62 || F === 96 || G(F) ? y(F) : (e.consume(F), L);
	}
	function C(F) {
		return F === 47 || F === 62 || H(F) ? w(F) : r(F);
	}
	function b(F) {
		return F === 62 ? (e.consume(F), _) : r(F);
	}
	function _(F) {
		return F === null || B(F) ? I(F) : H(F) ? (e.consume(F), _) : r(F);
	}
	function I(F) {
		return F === 45 && i === 2 ? (e.consume(F), z) : F === 60 && i === 1 ? (e.consume(F), N) : F === 62 && i === 4 ? (e.consume(F), W) : F === 63 && i === 3 ? (e.consume(F), h) : F === 93 && i === 5 ? (e.consume(F), ne) : B(F) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Zm, ie, S)(F)) : F === null || B(F) ? (e.exit("htmlFlowData"), S(F)) : (e.consume(F), I);
	}
	function S(F) {
		return e.check(eD, R, ie)(F);
	}
	function R(F) {
		return e.enter("lineEnding"), e.consume(F), e.exit("lineEnding"), O;
	}
	function O(F) {
		return F === null || B(F) ? S(F) : (e.enter("htmlFlowData"), I(F));
	}
	function z(F) {
		return F === 45 ? (e.consume(F), h) : I(F);
	}
	function N(F) {
		return F === 47 ? (e.consume(F), a = "", j) : I(F);
	}
	function j(F) {
		if (F === 62) {
			let ee = a.toLowerCase();
			return Zn.includes(ee) ? (e.consume(F), W) : I(F);
		}
		return K(F) && a.length < 8 ? (e.consume(F), a += String.fromCharCode(F), j) : I(F);
	}
	function ne(F) {
		return F === 93 ? (e.consume(F), h) : I(F);
	}
	function h(F) {
		return F === 62 ? (e.consume(F), W) : F === 45 && i === 2 ? (e.consume(F), h) : I(F);
	}
	function W(F) {
		return F === null || B(F) ? (e.exit("htmlFlowData"), ie(F)) : (e.consume(F), W);
	}
	function ie(F) {
		return e.exit("htmlFlow"), t(F);
	}
}
function nD(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return B(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), u) : r(a);
	}
	function u(a) {
		return n.parser.lazy[n.now().line] ? r(a) : t(a);
	}
}
function iD(e, t, r) {
	return n;
	function n(i) {
		return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(qe, t, r);
	}
}
function aD(e, t, r) {
	let n = this, i, u, a;
	return o;
	function o(h) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(h), s;
	}
	function s(h) {
		return h === 33 ? (e.consume(h), l) : h === 47 ? (e.consume(h), y) : h === 63 ? (e.consume(h), w) : K(h) ? (e.consume(h), L) : r(h);
	}
	function l(h) {
		return h === 45 ? (e.consume(h), f) : h === 91 ? (e.consume(h), u = 0, D) : K(h) ? (e.consume(h), E) : r(h);
	}
	function f(h) {
		return h === 45 ? (e.consume(h), m) : r(h);
	}
	function c(h) {
		return h === null ? r(h) : h === 45 ? (e.consume(h), p) : B(h) ? (a = c, N(h)) : (e.consume(h), c);
	}
	function p(h) {
		return h === 45 ? (e.consume(h), m) : c(h);
	}
	function m(h) {
		return h === 62 ? z(h) : h === 45 ? p(h) : c(h);
	}
	function D(h) {
		return h === "CDATA[".charCodeAt(u++) ? (e.consume(h), u === 6 ? x : D) : r(h);
	}
	function x(h) {
		return h === null ? r(h) : h === 93 ? (e.consume(h), g) : B(h) ? (a = x, N(h)) : (e.consume(h), x);
	}
	function g(h) {
		return h === 93 ? (e.consume(h), k) : x(h);
	}
	function k(h) {
		return h === 62 ? z(h) : h === 93 ? (e.consume(h), k) : x(h);
	}
	function E(h) {
		return h === null || h === 62 ? z(h) : B(h) ? (a = E, N(h)) : (e.consume(h), E);
	}
	function w(h) {
		return h === null ? r(h) : h === 63 ? (e.consume(h), T) : B(h) ? (a = w, N(h)) : (e.consume(h), w);
	}
	function T(h) {
		return h === 62 ? z(h) : w(h);
	}
	function y(h) {
		return K(h) ? (e.consume(h), d) : r(h);
	}
	function d(h) {
		return h === 45 || Q(h) ? (e.consume(h), d) : v(h);
	}
	function v(h) {
		return B(h) ? (a = v, N(h)) : H(h) ? (e.consume(h), v) : z(h);
	}
	function L(h) {
		return h === 45 || Q(h) ? (e.consume(h), L) : h === 47 || h === 62 || G(h) ? C(h) : r(h);
	}
	function C(h) {
		return h === 47 ? (e.consume(h), z) : h === 58 || h === 95 || K(h) ? (e.consume(h), b) : B(h) ? (a = C, N(h)) : H(h) ? (e.consume(h), C) : z(h);
	}
	function b(h) {
		return h === 45 || h === 46 || h === 58 || h === 95 || Q(h) ? (e.consume(h), b) : _(h);
	}
	function _(h) {
		return h === 61 ? (e.consume(h), I) : B(h) ? (a = _, N(h)) : H(h) ? (e.consume(h), _) : C(h);
	}
	function I(h) {
		return h === null || h === 60 || h === 61 || h === 62 || h === 96 ? r(h) : h === 34 || h === 39 ? (e.consume(h), i = h, S) : B(h) ? (a = I, N(h)) : H(h) ? (e.consume(h), I) : (e.consume(h), R);
	}
	function S(h) {
		return h === i ? (e.consume(h), i = void 0, O) : h === null ? r(h) : B(h) ? (a = S, N(h)) : (e.consume(h), S);
	}
	function R(h) {
		return h === null || h === 34 || h === 39 || h === 60 || h === 61 || h === 96 ? r(h) : h === 47 || h === 62 || G(h) ? C(h) : (e.consume(h), R);
	}
	function O(h) {
		return h === 47 || h === 62 || G(h) ? C(h) : r(h);
	}
	function z(h) {
		return h === 62 ? (e.consume(h), e.exit("htmlTextData"), e.exit("htmlText"), t) : r(h);
	}
	function N(h) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), j;
	}
	function j(h) {
		return H(h) ? U(e, ne, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(h) : ne(h);
	}
	function ne(h) {
		return e.enter("htmlTextData"), a(h);
	}
}
function lD(e) {
	let t = -1, r = [];
	for (; ++t < e.length;) {
		let n = e[t][1];
		if (r.push(e[t]), n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") {
			let i = n.type === "labelImage" ? 4 : 2;
			n.type = "data", t += i;
		}
	}
	return e.length !== r.length && re(e, 0, e.length, r), e;
}
function cD(e, t) {
	let r = e.length, n = 0, i, u, a, o;
	for (; r--;) if (i = e[r][1], u) {
		if (i.type === "link" || i.type === "labelLink" && i._inactive) break;
		e[r][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
	} else if (a) {
		if (e[r][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (u = r, i.type !== "labelLink")) {
			n = 2;
			break;
		}
	} else i.type === "labelEnd" && (a = r);
	let s = {
		type: e[u][1].type === "labelLink" ? "link" : "image",
		start: { ...e[u][1].start },
		end: { ...e[e.length - 1][1].end }
	}, l = {
		type: "label",
		start: { ...e[u][1].start },
		end: { ...e[a][1].end }
	}, f = {
		type: "labelText",
		start: { ...e[u + n + 2][1].end },
		end: { ...e[a - 2][1].start }
	};
	return o = [[
		"enter",
		s,
		t
	], [
		"enter",
		l,
		t
	]], o = he(o, e.slice(u + 1, u + n + 3)), o = he(o, [[
		"enter",
		f,
		t
	]]), o = he(o, nt(t.parser.constructs.insideSpan.null, e.slice(u + n + 4, a - 3), t)), o = he(o, [
		[
			"exit",
			f,
			t
		],
		e[a - 2],
		e[a - 1],
		[
			"exit",
			l,
			t
		]
	]), o = he(o, e.slice(a + 1)), o = he(o, [[
		"exit",
		s,
		t
	]]), re(e, u, e.length, o), e;
}
function fD(e, t, r) {
	let n = this, i = n.events.length, u, a;
	for (; i--;) if ((n.events[i][1].type === "labelImage" || n.events[i][1].type === "labelLink") && !n.events[i][1]._balanced) {
		u = n.events[i][1];
		break;
	}
	return o;
	function o(p) {
		return u ? u._inactive ? c(p) : (a = n.parser.defined.includes(fe(n.sliceSerialize({
			start: u.end,
			end: n.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(p), e.exit("labelMarker"), e.exit("labelEnd"), s) : r(p);
	}
	function s(p) {
		return p === 40 ? e.attempt(uD, f, a ? f : c)(p) : p === 91 ? e.attempt(oD, f, a ? l : c)(p) : a ? f(p) : c(p);
	}
	function l(p) {
		return e.attempt(sD, f, c)(p);
	}
	function f(p) {
		return t(p);
	}
	function c(p) {
		return u._balanced = !0, r(p);
	}
}
function pD(e, t, r) {
	return n;
	function n(c) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
	}
	function i(c) {
		return G(c) ? dt(e, u)(c) : u(c);
	}
	function u(c) {
		return c === 41 ? f(c) : jr(e, a, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
	}
	function a(c) {
		return G(c) ? dt(e, s)(c) : f(c);
	}
	function o(c) {
		return r(c);
	}
	function s(c) {
		return c === 34 || c === 39 || c === 40 ? Yr(e, l, r, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
	}
	function l(c) {
		return G(c) ? dt(e, f)(c) : f(c);
	}
	function f(c) {
		return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), t) : r(c);
	}
}
function hD(e, t, r) {
	let n = this;
	return i;
	function i(o) {
		return Wr.call(n, e, u, a, "reference", "referenceMarker", "referenceString")(o);
	}
	function u(o) {
		return n.parser.defined.includes(fe(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1))) ? t(o) : r(o);
	}
	function a(o) {
		return r(o);
	}
}
function mD(e, t, r) {
	return n;
	function n(u) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), i;
	}
	function i(u) {
		return u === 93 ? (e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), e.exit("reference"), t) : r(u);
	}
}
function DD(e, t, r) {
	let n = this;
	return i;
	function i(o) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), u;
	}
	function u(o) {
		return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), a) : r(o);
	}
	function a(o) {
		return o === 94 && "_hiddenFootnoteSupport" in n.parser.constructs ? r(o) : t(o);
	}
}
function dD(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), u;
	}
	function u(a) {
		return a === 94 && "_hiddenFootnoteSupport" in n.parser.constructs ? r(a) : t(a);
	}
}
function gD(e, t) {
	return r;
	function r(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), U(e, t, "linePrefix");
	}
}
function xD(e, t, r) {
	let n = 0, i;
	return u;
	function u(l) {
		return e.enter("thematicBreak"), a(l);
	}
	function a(l) {
		return i = l, o(l);
	}
	function o(l) {
		return l === i ? (e.enter("thematicBreakSequence"), s(l)) : n >= 3 && (l === null || B(l)) ? (e.exit("thematicBreak"), t(l)) : r(l);
	}
	function s(l) {
		return l === i ? (e.consume(l), n++, s) : (e.exit("thematicBreakSequence"), H(l) ? U(e, o, "whitespace")(l) : o(l));
	}
}
function bD(e, t, r) {
	let n = this, i = n.events[n.events.length - 1], u = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
	return o;
	function o(m) {
		let D = n.containerState.type || (m === 42 || m === 43 || m === 45 ? "listUnordered" : "listOrdered");
		if (D === "listUnordered" ? !n.containerState.marker || m === n.containerState.marker : tr(m)) {
			if (n.containerState.type || (n.containerState.type = D, e.enter(D, { _container: !0 })), D === "listUnordered") return e.enter("listItemPrefix"), m === 42 || m === 45 ? e.check(xt, r, l)(m) : l(m);
			if (!n.interrupt || m === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), s(m);
		}
		return r(m);
	}
	function s(m) {
		return tr(m) && ++a < 10 ? (e.consume(m), s) : (!n.interrupt || a < 2) && (n.containerState.marker ? m === n.containerState.marker : m === 41 || m === 46) ? (e.exit("listItemValue"), l(m)) : r(m);
	}
	function l(m) {
		return e.enter("listItemMarker"), e.consume(m), e.exit("listItemMarker"), n.containerState.marker = n.containerState.marker || m, e.check(qe, n.interrupt ? r : f, e.attempt(kD, p, c));
	}
	function f(m) {
		return n.containerState.initialBlankLine = !0, u++, p(m);
	}
	function c(m) {
		return H(m) ? (e.enter("listItemPrefixWhitespace"), e.consume(m), e.exit("listItemPrefixWhitespace"), p) : r(m);
	}
	function p(m) {
		return n.containerState.size = u + n.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(m);
	}
}
function ED(e, t, r) {
	let n = this;
	return n.containerState._closeFlow = void 0, e.check(qe, i, u);
	function i(o) {
		return n.containerState.furtherBlankLines = n.containerState.furtherBlankLines || n.containerState.initialBlankLine, U(e, t, "listItemIndent", n.containerState.size + 1)(o);
	}
	function u(o) {
		return n.containerState.furtherBlankLines || !H(o) ? (n.containerState.furtherBlankLines = void 0, n.containerState.initialBlankLine = void 0, a(o)) : (n.containerState.furtherBlankLines = void 0, n.containerState.initialBlankLine = void 0, e.attempt(FD, t, a)(o));
	}
	function a(o) {
		return n.containerState._closeFlow = !0, n.interrupt = void 0, U(e, e.attempt(pe, t, r), "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
	}
}
function wD(e, t, r) {
	let n = this;
	return U(e, i, "listItemIndent", n.containerState.size + 1);
	function i(u) {
		let a = n.events[n.events.length - 1];
		return a && a[1].type === "listItemIndent" && a[2].sliceSerialize(a[1], !0).length === n.containerState.size ? t(u) : r(u);
	}
}
function CD(e) {
	e.exit(this.containerState.type);
}
function yD(e, t, r) {
	let n = this;
	return U(e, i, "listItemPrefixWhitespace", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(u) {
		let a = n.events[n.events.length - 1];
		return !H(u) && a && a[1].type === "listItemPrefixWhitespace" ? t(u) : r(u);
	}
}
function vD(e, t) {
	let r = e.length, n, i, u;
	for (; r--;) if (e[r][0] === "enter") {
		if (e[r][1].type === "content") {
			n = r;
			break;
		}
		e[r][1].type === "paragraph" && (i = r);
	} else e[r][1].type === "content" && e.splice(r, 1), !u && e[r][1].type === "definition" && (u = r);
	let a = {
		type: "setextHeading",
		start: { ...e[n][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[i][1].type = "setextHeadingText", u ? (e.splice(i, 0, [
		"enter",
		a,
		t
	]), e.splice(u + 1, 0, [
		"exit",
		e[n][1],
		t
	]), e[n][1].end = { ...e[u][1].end }) : e[n][1] = a, e.push([
		"exit",
		a,
		t
	]), e;
}
function AD(e, t, r) {
	let n = this, i;
	return u;
	function u(l) {
		let f = n.events.length, c;
		for (; f--;) if (n.events[f][1].type !== "lineEnding" && n.events[f][1].type !== "linePrefix" && n.events[f][1].type !== "content") {
			c = n.events[f][1].type === "paragraph";
			break;
		}
		return !n.parser.lazy[n.now().line] && (n.interrupt || c) ? (e.enter("setextHeadingLine"), i = l, a(l)) : r(l);
	}
	function a(l) {
		return e.enter("setextHeadingLineSequence"), o(l);
	}
	function o(l) {
		return l === i ? (e.consume(l), o) : (e.exit("setextHeadingLineSequence"), H(l) ? U(e, s, "lineSuffix")(l) : s(l));
	}
	function s(l) {
		return l === null || B(l) ? (e.exit("setextHeadingLine"), t(l)) : r(l);
	}
}
function TD(e) {
	let t = this, r = e.attempt(qe, n, e.attempt(this.parser.constructs.flowInitial, i, U(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Kn, i)), "linePrefix")));
	return r;
	function n(u) {
		if (u === null) {
			e.consume(u);
			return;
		}
		return e.enter("lineEndingBlank"), e.consume(u), e.exit("lineEndingBlank"), t.currentConstruct = void 0, r;
	}
	function i(u) {
		if (u === null) {
			e.consume(u);
			return;
		}
		return e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), t.currentConstruct = void 0, r;
	}
}
function Ou(e) {
	return {
		resolveAll: Nu(e === "text" ? SD : void 0),
		tokenize: t
	};
	function t(r) {
		let n = this, i = this.parser.constructs[e], u = r.attempt(i, a, o);
		return a;
		function a(f) {
			return l(f) ? u(f) : o(f);
		}
		function o(f) {
			if (f === null) {
				r.consume(f);
				return;
			}
			return r.enter("data"), r.consume(f), s;
		}
		function s(f) {
			return l(f) ? (r.exit("data"), u(f)) : (r.consume(f), s);
		}
		function l(f) {
			if (f === null) return !0;
			let c = i[f], p = -1;
			if (c) for (; ++p < c.length;) {
				let m = c[p];
				if (!m.previous || m.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Nu(e) {
	return t;
	function t(r, n) {
		let i = -1, u;
		for (; ++i <= r.length;) u === void 0 ? r[i] && r[i][1].type === "data" && (u = i, i++) : (!r[i] || r[i][1].type !== "data") && (i !== u + 2 && (r[u][1].end = r[i - 1][1].end, r.splice(u + 2, i - u - 2), i = u + 2), u = void 0);
		return e ? e(r, n) : r;
	}
}
function SD(e, t) {
	let r = 0;
	for (; ++r <= e.length;) if ((r === e.length || e[r][1].type === "lineEnding") && e[r - 1][1].type === "data") {
		let n = e[r - 1][1], i = t.sliceStream(n), u = i.length, a = -1, o = 0, s;
		for (; u--;) {
			let l = i[u];
			if (typeof l == "string") {
				for (a = l.length; l.charCodeAt(a - 1) === 32;) o++, a--;
				if (a) break;
				a = -1;
			} else if (l === -2) s = !0, o++;
			else if (l !== -1) {
				u++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && r === e.length && (o = 0), o) {
			let l = {
				type: r === e.length || s || o < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: u ? a : n.start._bufferIndex + a,
					_index: n.start._index + u,
					line: n.end.line,
					column: n.end.column - o,
					offset: n.end.offset - o
				},
				end: { ...n.end }
			};
			n.end = { ...l.start }, n.start.offset === n.end.offset ? Object.assign(n, l) : (e.splice(r, 0, [
				"enter",
				l,
				t
			], [
				"exit",
				l,
				t
			]), r += 2);
		}
		r++;
	}
	return e;
}
function Ru(e, t, r) {
	let n = {
		_bufferIndex: -1,
		_index: 0,
		line: r && r.line || 1,
		column: r && r.column || 1,
		offset: r && r.offset || 0
	}, i = {}, u = [], a = [], o = [], l = {
		attempt: C(v),
		check: C(L),
		consume: T,
		enter: y,
		exit: d,
		interrupt: C(L, { interrupt: !0 })
	}, f = {
		code: null,
		containerState: {},
		defineSkip: k,
		events: [],
		now: g,
		parser: e,
		previous: null,
		sliceSerialize: D,
		sliceStream: x,
		write: m
	}, c = t.tokenize.call(f, l);
	return t.resolveAll && u.push(t), f;
	function m(S) {
		return a = he(a, S), E(), a[a.length - 1] !== null ? [] : (b(t, 0), f.events = nt(u, f.events, f), f.events);
	}
	function D(S, R) {
		return zD(x(S), R);
	}
	function x(S) {
		return MD(a, S);
	}
	function g() {
		let { _bufferIndex: S, _index: R, line: O, column: z, offset: N } = n;
		return {
			_bufferIndex: S,
			_index: R,
			line: O,
			column: z,
			offset: N
		};
	}
	function k(S) {
		i[S.line] = S.column, I();
	}
	function E() {
		let S;
		for (; n._index < a.length;) {
			let R = a[n._index];
			if (typeof R == "string") for (S = n._index, n._bufferIndex < 0 && (n._bufferIndex = 0); n._index === S && n._bufferIndex < R.length;) w(R.charCodeAt(n._bufferIndex));
			else w(R);
		}
	}
	function w(S) {
		c = c(S);
	}
	function T(S) {
		B(S) ? (n.line++, n.column = 1, n.offset += S === -3 ? 2 : 1, I()) : S !== -1 && (n.column++, n.offset++), n._bufferIndex < 0 ? n._index++ : (n._bufferIndex++, n._bufferIndex === a[n._index].length && (n._bufferIndex = -1, n._index++)), f.previous = S;
	}
	function y(S, R) {
		let O = R || {};
		return O.type = S, O.start = g(), f.events.push([
			"enter",
			O,
			f
		]), o.push(O), O;
	}
	function d(S) {
		let R = o.pop();
		return R.end = g(), f.events.push([
			"exit",
			R,
			f
		]), R;
	}
	function v(S, R) {
		b(S, R.from);
	}
	function L(S, R) {
		R.restore();
	}
	function C(S, R) {
		return O;
		function O(z, N, j) {
			let ne, h, W, ie;
			return Array.isArray(z) ? ee(z) : "tokenize" in z ? ee([z]) : F(z);
			function F(oe) {
				return Xt;
				function Xt(ze) {
					let ct = ze !== null && oe[ze], yt = ze !== null && oe.null;
					return ee([...Array.isArray(ct) ? ct : ct ? [ct] : [], ...Array.isArray(yt) ? yt : yt ? [yt] : []])(ze);
				}
			}
			function ee(oe) {
				return ne = oe, h = 0, oe.length === 0 ? j : ce(oe[h]);
			}
			function ce(oe) {
				return Xt;
				function Xt(ze) {
					return ie = _(), W = oe, oe.partial || (f.currentConstruct = oe), oe.name && f.parser.constructs.disable.null.includes(oe.name) ? tt(ze) : oe.tokenize.call(R ? Object.assign(Object.create(f), R) : f, l, te, tt)(ze);
				}
			}
			function te(oe) {
				return S(W, ie), N;
			}
			function tt(oe) {
				return ie.restore(), ++h < ne.length ? ce(ne[h]) : j;
			}
		}
	}
	function b(S, R) {
		S.resolveAll && !u.includes(S) && u.push(S), S.resolve && re(f.events, R, f.events.length - R, S.resolve(f.events.slice(R), f)), S.resolveTo && (f.events = S.resolveTo(f.events, f));
	}
	function _() {
		let S = g(), R = f.previous, O = f.currentConstruct, z = f.events.length, N = Array.from(o);
		return {
			from: z,
			restore: j
		};
		function j() {
			n = S, f.previous = R, f.currentConstruct = O, f.events.length = z, o = N, I();
		}
	}
	function I() {
		n.line in i && n.column < 2 && (n.column = i[n.line], n.offset += i[n.line] - 1);
	}
}
function MD(e, t) {
	let r = t.start._index, n = t.start._bufferIndex, i = t.end._index, u = t.end._bufferIndex, a;
	if (r === i) a = [e[r].slice(n, u)];
	else {
		if (a = e.slice(r, i), n > -1) {
			let o = a[0];
			typeof o == "string" ? a[0] = o.slice(n) : a.shift();
		}
		u > 0 && a.push(e[i].slice(0, u));
	}
	return a;
}
function zD(e, t) {
	let r = -1, n = [], i;
	for (; ++r < e.length;) {
		let u = e[r], a;
		if (typeof u == "string") a = u;
		else switch (u) {
			case -5:
				a = "\r";
				break;
			case -4:
				a = `
`;
				break;
			case -3:
				a = `\r
`;
				break;
			case -2:
				a = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				a = " ";
				break;
			default: a = String.fromCharCode(u);
		}
		i = u === -2, n.push(a);
	}
	return n.join("");
}
function ai(e) {
	let n = {
		constructs: Nr([ii, ...(e || {}).extensions || []]),
		content: i(vu),
		defined: [],
		document: i(Tu),
		flow: i(qu),
		lazy: {},
		string: i(_u),
		text: i(Pu)
	};
	return n;
	function i(u) {
		return a;
		function a(o) {
			return Ru(n, u, o);
		}
	}
}
function ui(e) {
	for (; !Gr(e););
	return e;
}
function oi() {
	let e = 1, t = "", r = !0, n;
	return i;
	function i(u, a, o) {
		let s = [], l, f, c, p, m;
		for (u = t + (typeof u == "string" ? u.toString() : new TextDecoder(a || void 0).decode(u)), c = 0, t = "", r && (u.charCodeAt(0) === 65279 && c++, r = void 0); c < u.length;) {
			if (Mu.lastIndex = c, l = Mu.exec(u), p = l && l.index !== void 0 ? l.index : u.length, m = u.charCodeAt(p), !l) {
				t = u.slice(c);
				break;
			}
			if (m === 10 && c === p && n) s.push(-3), n = void 0;
			else switch (n && (s.push(-5), n = void 0), c < p && (s.push(u.slice(c, p)), e += p - c), m) {
				case 0:
					s.push(65533), e++;
					break;
				case 9:
					for (f = Math.ceil(e / 4) * 4, s.push(-2); e++ < f;) s.push(-1);
					break;
				case 10:
					s.push(-4), e = 1;
					break;
				default: n = !0, e = 1;
			}
			c = p + 1;
		}
		return o && (n && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
function zu(e) {
	return e.replace(UD, HD);
}
function HD(e, t, r) {
	if (t) return t;
	if (r.charCodeAt(0) === 35) {
		let i = r.charCodeAt(1), u = i === 120 || i === 88;
		return Rr(r.slice(u ? 2 : 1), u ? 16 : 10);
	}
	return Tt(r) || e;
}
function Lt(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Uu(e.position) : "start" in e || "end" in e ? Uu(e) : "line" in e || "column" in e ? si(e) : "";
}
function si(e) {
	return Hu(e && e.line) + ":" + Hu(e && e.column);
}
function Uu(e) {
	return si(e && e.start) + "-" + si(e && e.end);
}
function Hu(e) {
	return e && typeof e == "number" ? e : 1;
}
function li(e, t, r) {
	return t && typeof t == "object" && (r = t, t = void 0), VD(r)(ui(ai(r).document().write(oi()(e, t, !0))));
}
function VD(e) {
	let t = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: u(du),
			autolinkProtocol: C,
			autolinkEmail: C,
			atxHeading: u(hu),
			blockQuote: u(ze),
			characterEscape: C,
			characterReference: C,
			codeFenced: u(ct),
			codeFencedFenceInfo: a,
			codeFencedFenceMeta: a,
			codeIndented: u(ct, a),
			codeText: u(yt, a),
			codeTextData: C,
			data: C,
			codeFlowValue: C,
			definition: u(Hn),
			definitionDestinationString: a,
			definitionLabelString: a,
			definitionTitleString: a,
			emphasis: u(nm),
			hardBreakEscape: u(mu),
			hardBreakTrailing: u(mu),
			htmlFlow: u(Du, a),
			htmlFlowData: C,
			htmlText: u(Du, a),
			htmlTextData: C,
			image: u(im),
			label: a,
			link: u(du),
			listItem: u(am),
			listItemValue: p,
			listOrdered: u(gu, c),
			listUnordered: u(gu),
			paragraph: u(um),
			reference: F,
			referenceString: a,
			resourceDestinationString: a,
			resourceTitleString: a,
			setextHeading: u(hu),
			strong: u(om),
			thematicBreak: u(lm)
		},
		exit: {
			atxHeading: s(),
			atxHeadingSequence: y,
			autolink: s(),
			autolinkEmail: Xt,
			autolinkProtocol: oe,
			blockQuote: s(),
			characterEscapeValue: b,
			characterReferenceMarkerHexadecimal: ce,
			characterReferenceMarkerNumeric: ce,
			characterReferenceValue: te,
			characterReference: tt,
			codeFenced: s(g),
			codeFencedFence: x,
			codeFencedFenceInfo: m,
			codeFencedFenceMeta: D,
			codeFlowValue: b,
			codeIndented: s(k),
			codeText: s(O),
			codeTextData: b,
			data: b,
			definition: s(),
			definitionDestinationString: T,
			definitionLabelString: E,
			definitionTitleString: w,
			emphasis: s(),
			hardBreakEscape: s(I),
			hardBreakTrailing: s(I),
			htmlFlow: s(S),
			htmlFlowData: b,
			htmlText: s(R),
			htmlTextData: b,
			image: s(N),
			label: ne,
			labelText: j,
			lineEnding: _,
			link: s(z),
			listItem: s(),
			listOrdered: s(),
			listUnordered: s(),
			paragraph: s(),
			referenceString: ee,
			resourceDestinationString: h,
			resourceTitleString: W,
			resource: ie,
			setextHeading: s(L),
			setextHeadingLineSequence: v,
			setextHeadingText: d,
			strong: s(),
			thematicBreak: s()
		}
	};
	ju(t, (e || {}).mdastExtensions || []);
	let r = {};
	return n;
	function n(A) {
		let P = {
			type: "root",
			children: []
		}, V = {
			stack: [P],
			tokenStack: [],
			config: t,
			enter: o,
			exit: l,
			buffer: a,
			resume: f,
			data: r
		}, Y = [], $ = -1;
		for (; ++$ < A.length;) if (A[$][1].type === "listOrdered" || A[$][1].type === "listUnordered") if (A[$][0] === "enter") Y.push($);
		else $ = i(A, Y.pop(), $);
		for ($ = -1; ++$ < A.length;) {
			let ye = t[A[$][0]];
			Gu.call(ye, A[$][1].type) && ye[A[$][1].type].call(Object.assign({ sliceSerialize: A[$][2].sliceSerialize }, V), A[$][1]);
		}
		if (V.tokenStack.length > 0) {
			let ye = V.tokenStack[V.tokenStack.length - 1];
			(ye[1] || Vu).call(V, void 0, ye[0]);
		}
		for (P.position = {
			start: it(A.length > 0 ? A[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: it(A.length > 0 ? A[A.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, $ = -1; ++$ < t.transforms.length;) P = t.transforms[$](P) || P;
		return P;
	}
	function i(A, P, V) {
		let Y = P - 1, $ = -1, ye = !1, ft, Ue, Zt, er;
		for (; ++Y <= V;) {
			let xe = A[Y];
			switch (xe[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					xe[0] === "enter" ? $++ : $--, er = void 0;
					break;
				case "lineEndingBlank":
					xe[0] === "enter" && (ft && !er && !$ && !Zt && (Zt = Y), er = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: er = void 0;
			}
			if (!$ && xe[0] === "enter" && xe[1].type === "listItemPrefix" || $ === -1 && xe[0] === "exit" && (xe[1].type === "listUnordered" || xe[1].type === "listOrdered")) {
				if (ft) {
					let vt = Y;
					for (Ue = void 0; vt--;) {
						let He = A[vt];
						if (He[1].type === "lineEnding" || He[1].type === "lineEndingBlank") {
							if (He[0] === "exit") continue;
							Ue && (A[Ue][1].type = "lineEndingBlank", ye = !0), He[1].type = "lineEnding", Ue = vt;
						} else if (!(He[1].type === "linePrefix" || He[1].type === "blockQuotePrefix" || He[1].type === "blockQuotePrefixWhitespace" || He[1].type === "blockQuoteMarker" || He[1].type === "listItemIndent")) break;
					}
					Zt && (!Ue || Zt < Ue) && (ft._spread = !0), ft.end = Object.assign({}, Ue ? A[Ue][1].start : xe[1].end), A.splice(Ue || Y, 0, [
						"exit",
						ft,
						xe[2]
					]), Y++, V++;
				}
				if (xe[1].type === "listItemPrefix") {
					let vt = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, xe[1].start),
						end: void 0
					};
					ft = vt, A.splice(Y, 0, [
						"enter",
						vt,
						xe[2]
					]), Y++, V++, Zt = void 0, er = !0;
				}
			}
		}
		return A[P][1]._spread = ye, V;
	}
	function u(A, P) {
		return V;
		function V(Y) {
			o.call(this, A(Y), Y), P && P.call(this, Y);
		}
	}
	function a() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function o(A, P, V) {
		this.stack[this.stack.length - 1].children.push(A), this.stack.push(A), this.tokenStack.push([P, V || void 0]), A.position = {
			start: it(P.start),
			end: void 0
		};
	}
	function s(A) {
		return P;
		function P(V) {
			A && A.call(this, V), l.call(this, V);
		}
	}
	function l(A, P) {
		let V = this.stack.pop(), Y = this.tokenStack.pop();
		if (Y) Y[0].type !== A.type && (P ? P.call(this, A, Y[0]) : (Y[1] || Vu).call(this, A, Y[0]));
		else throw new Error("Cannot close `" + A.type + "` (" + Lt({
			start: A.start,
			end: A.end
		}) + "): it’s not open");
		V.position.end = it(A.end);
	}
	function f() {
		return jn(this.stack.pop());
	}
	function c() {
		this.data.expectingFirstListItemValue = !0;
	}
	function p(A) {
		if (this.data.expectingFirstListItemValue) {
			let P = this.stack[this.stack.length - 2];
			P.start = Number.parseInt(this.sliceSerialize(A), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function m() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.lang = A;
	}
	function D() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.meta = A;
	}
	function x() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function g() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.value = A.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function k() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.value = A.replace(/(\r?\n|\r)$/g, "");
	}
	function E(A) {
		let P = this.resume(), V = this.stack[this.stack.length - 1];
		V.label = P, V.identifier = fe(this.sliceSerialize(A)).toLowerCase();
	}
	function w() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.title = A;
	}
	function T() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.url = A;
	}
	function y(A) {
		let P = this.stack[this.stack.length - 1];
		if (!P.depth) P.depth = this.sliceSerialize(A).length;
	}
	function d() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function v(A) {
		let P = this.stack[this.stack.length - 1];
		P.depth = this.sliceSerialize(A).codePointAt(0) === 61 ? 1 : 2;
	}
	function L() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function C(A) {
		let V = this.stack[this.stack.length - 1].children, Y = V[V.length - 1];
		(!Y || Y.type !== "text") && (Y = sm(), Y.position = {
			start: it(A.start),
			end: void 0
		}, V.push(Y)), this.stack.push(Y);
	}
	function b(A) {
		let P = this.stack.pop();
		P.value += this.sliceSerialize(A), P.position.end = it(A.end);
	}
	function _(A) {
		let P = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let V = P.children[P.children.length - 1];
			V.position.end = it(A.end), this.data.atHardBreak = void 0;
			return;
		}
		!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(P.type) && (C.call(this, A), b.call(this, A));
	}
	function I() {
		this.data.atHardBreak = !0;
	}
	function S() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.value = A;
	}
	function R() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.value = A;
	}
	function O() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.value = A;
	}
	function z() {
		let A = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let P = this.data.referenceType || "shortcut";
			A.type += "Reference", A.referenceType = P, delete A.url, delete A.title;
		} else delete A.identifier, delete A.label;
		this.data.referenceType = void 0;
	}
	function N() {
		let A = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let P = this.data.referenceType || "shortcut";
			A.type += "Reference", A.referenceType = P, delete A.url, delete A.title;
		} else delete A.identifier, delete A.label;
		this.data.referenceType = void 0;
	}
	function j(A) {
		let P = this.sliceSerialize(A), V = this.stack[this.stack.length - 2];
		V.label = zu(P), V.identifier = fe(P).toLowerCase();
	}
	function ne() {
		let A = this.stack[this.stack.length - 1], P = this.resume(), V = this.stack[this.stack.length - 1];
		if (this.data.inReference = !0, V.type === "link") V.children = A.children;
		else V.alt = P;
	}
	function h() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.url = A;
	}
	function W() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.title = A;
	}
	function ie() {
		this.data.inReference = void 0;
	}
	function F() {
		this.data.referenceType = "collapsed";
	}
	function ee(A) {
		let P = this.resume(), V = this.stack[this.stack.length - 1];
		V.label = P, V.identifier = fe(this.sliceSerialize(A)).toLowerCase(), this.data.referenceType = "full";
	}
	function ce(A) {
		this.data.characterReferenceType = A.type;
	}
	function te(A) {
		let P = this.sliceSerialize(A), V = this.data.characterReferenceType, Y;
		V ? (Y = Rr(P, V === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Y = Tt(P);
		let $ = this.stack[this.stack.length - 1];
		$.value += Y;
	}
	function tt(A) {
		let P = this.stack.pop();
		P.position.end = it(A.end);
	}
	function oe(A) {
		b.call(this, A);
		let P = this.stack[this.stack.length - 1];
		P.url = this.sliceSerialize(A);
	}
	function Xt(A) {
		b.call(this, A);
		let P = this.stack[this.stack.length - 1];
		P.url = "mailto:" + this.sliceSerialize(A);
	}
	function ze() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function ct() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function yt() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function Hn() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function nm() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function hu() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function mu() {
		return { type: "break" };
	}
	function Du() {
		return {
			type: "html",
			value: ""
		};
	}
	function im() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function du() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function gu(A) {
		return {
			type: "list",
			ordered: A.type === "listOrdered",
			start: null,
			spread: A._spread,
			children: []
		};
	}
	function am(A) {
		return {
			type: "listItem",
			spread: A._spread,
			checked: null,
			children: []
		};
	}
	function um() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function om() {
		return {
			type: "strong",
			children: []
		};
	}
	function sm() {
		return {
			type: "text",
			value: ""
		};
	}
	function lm() {
		return { type: "thematicBreak" };
	}
}
function it(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function ju(e, t) {
	let r = -1;
	for (; ++r < t.length;) {
		let n = t[r];
		Array.isArray(n) ? ju(e, n) : GD(e, n);
	}
}
function GD(e, t) {
	let r;
	for (r in t) if (Gu.call(t, r)) switch (r) {
		case "canContainEols": {
			let n = t[r];
			n && e[r].push(...n);
			break;
		}
		case "transforms": {
			let n = t[r];
			n && e[r].push(...n);
			break;
		}
		case "enter":
		case "exit": {
			let n = t[r];
			n && Object.assign(e[r], n);
			break;
		}
	}
}
function Vu(e, t) {
	throw e ? /* @__PURE__ */ new Error("Cannot close `" + e.type + "` (" + Lt({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + Lt({
		start: t.start,
		end: t.end
	}) + ") is open") : /* @__PURE__ */ new Error("Cannot close document, a token (`" + t.type + "`, " + Lt({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
function ci() {
	return {
		enter: {
			mathFlow: e,
			mathFlowFenceMeta: t,
			mathText: u
		},
		exit: {
			mathFlow: i,
			mathFlowFence: n,
			mathFlowFenceMeta: r,
			mathFlowValue: o,
			mathText: a,
			mathTextData: o
		}
	};
	function e(s) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "pre",
				hChildren: [{
					type: "element",
					tagName: "code",
					properties: { className: ["language-math", "math-display"] },
					children: []
				}]
			}
		}, s);
	}
	function t() {
		this.buffer();
	}
	function r() {
		let s = this.resume(), l = this.stack[this.stack.length - 1];
		l.type, l.meta = s;
	}
	function n() {
		this.data.mathFlowInside || (this.buffer(), this.data.mathFlowInside = !0);
	}
	function i(s) {
		let l = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), f = this.stack[this.stack.length - 1];
		f.type, this.exit(s), f.value = l;
		let c = f.data.hChildren[0];
		c.type, c.tagName, c.children.push({
			type: "text",
			value: l
		}), this.data.mathFlowInside = void 0;
	}
	function u(s) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "code",
				hProperties: { className: ["language-math", "math-inline"] },
				hChildren: []
			}
		}, s), this.buffer();
	}
	function a(s) {
		let l = this.resume(), f = this.stack[this.stack.length - 1];
		f.type, this.exit(s), f.value = l, f.data.hChildren.push({
			type: "text",
			value: l
		});
	}
	function o(s) {
		this.config.enter.data.call(this, s), this.config.exit.data.call(this, s);
	}
}
function Be(e) {
	var t = Wu[e];
	if (t !== void 0) return t.exports;
	var r = Wu[e] = { exports: {} };
	return jD[e](r, r.exports, Be), r.exports;
}
function hi() {
	return { text: _e };
}
function $D(e, t, r) {
	let n = this, i, u;
	return a;
	function a(c) {
		return !pi(c) || !to.call(n, n.previous) || mi(n.events) ? r(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), o(c));
	}
	function o(c) {
		return pi(c) ? (e.consume(c), o) : c === 64 ? (e.consume(c), s) : r(c);
	}
	function s(c) {
		return c === 46 ? e.check(YD, f, l)(c) : c === 45 || c === 95 || Q(c) ? (u = !0, e.consume(c), s) : f(c);
	}
	function l(c) {
		return e.consume(c), i = !0, s;
	}
	function f(c) {
		return u && i && K(n.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(c)) : r(c);
	}
}
function KD(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return a !== 87 && a !== 119 || !Zu.call(n, n.previous) || mi(n.events) ? r(a) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(WD, e.attempt($u, e.attempt(Ku, u), r), r)(a));
	}
	function u(a) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(a);
	}
}
function QD(e, t, r) {
	let n = this, i = "", u = !1;
	return a;
	function a(c) {
		return (c === 72 || c === 104) && eo.call(n, n.previous) && !mi(n.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), o) : r(c);
	}
	function o(c) {
		if (K(c) && i.length < 5) return i += String.fromCodePoint(c), e.consume(c), o;
		if (c === 58) {
			let p = i.toLowerCase();
			if (p === "http" || p === "https") return e.consume(c), s;
		}
		return r(c);
	}
	function s(c) {
		return c === 47 ? (e.consume(c), u ? l : (u = !0, s)) : r(c);
	}
	function l(c) {
		return c === null || mt(c) || G(c) || Ie(c) || Dt(c) ? r(c) : e.attempt($u, e.attempt(Ku, f), r)(c);
	}
	function f(c) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(c);
	}
}
function JD(e, t, r) {
	let n = 0;
	return i;
	function i(a) {
		return (a === 87 || a === 119) && n < 3 ? (n++, e.consume(a), i) : a === 46 && n === 3 ? (e.consume(a), u) : r(a);
	}
	function u(a) {
		return a === null ? r(a) : t(a);
	}
}
function XD(e, t, r) {
	let n, i, u;
	return a;
	function a(l) {
		return l === 46 || l === 95 ? e.check(Qu, s, o)(l) : l === null || G(l) || Ie(l) || l !== 45 && Dt(l) ? s(l) : (u = !0, e.consume(l), a);
	}
	function o(l) {
		return l === 95 ? n = !0 : (i = n, n = void 0), e.consume(l), a;
	}
	function s(l) {
		return i || n || !u ? r(l) : t(l);
	}
}
function ZD(e, t) {
	let r = 0, n = 0;
	return i;
	function i(a) {
		return a === 40 ? (r++, e.consume(a), i) : a === 41 && n < r ? u(a) : a === 33 || a === 34 || a === 38 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 60 || a === 63 || a === 93 || a === 95 || a === 126 ? e.check(Qu, t, u)(a) : a === null || G(a) || Ie(a) ? t(a) : (e.consume(a), i);
	}
	function u(a) {
		return a === 41 && n++, e.consume(a), i;
	}
}
function ed(e, t, r) {
	return n;
	function n(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), n) : o === 38 ? (e.consume(o), u) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || G(o) || Ie(o) ? t(o) : r(o);
	}
	function i(o) {
		return o === null || o === 40 || o === 91 || G(o) || Ie(o) ? t(o) : n(o);
	}
	function u(o) {
		return K(o) ? a(o) : r(o);
	}
	function a(o) {
		return o === 59 ? (e.consume(o), n) : K(o) ? (e.consume(o), a) : r(o);
	}
}
function td(e, t, r) {
	return n;
	function n(u) {
		return e.consume(u), i;
	}
	function i(u) {
		return Q(u) ? r(u) : t(u);
	}
}
function Zu(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || G(e);
}
function eo(e) {
	return !K(e);
}
function to(e) {
	return !(e === 47 || pi(e));
}
function pi(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || Q(e);
}
function mi(e) {
	let t = e.length, r = !1;
	for (; t--;) {
		let n = e[t][1];
		if ((n.type === "labelLink" || n.type === "labelImage") && !n._balanced) {
			r = !0;
			break;
		}
		if (n._gfmAutolinkLiteralWalkedInto) {
			r = !1;
			break;
		}
	}
	return e.length > 0 && !r && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), r;
}
function Di() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: ud,
			continuation: { tokenize: od },
			exit: sd
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: ad
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: nd,
				resolveTo: id
			}
		}
	};
}
function nd(e, t, r) {
	let n = this, i = n.events.length, u = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []), a;
	for (; i--;) {
		let s = n.events[i][1];
		if (s.type === "labelImage") {
			a = s;
			break;
		}
		if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link") break;
	}
	return o;
	function o(s) {
		if (!a || !a._balanced) return r(s);
		let l = fe(n.sliceSerialize({
			start: a.end,
			end: n.now()
		}));
		return l.codePointAt(0) !== 94 || !u.includes(l.slice(1)) ? r(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), t(s));
	}
}
function id(e, t) {
	let r = e.length;
	for (; r--;) if (e[r][1].type === "labelImage" && e[r][0] === "enter") {
		e[r][1];
		break;
	}
	e[r + 1][1].type = "data", e[r + 3][1].type = "gfmFootnoteCallLabelMarker";
	let i = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[r + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, u = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[r + 3][1].end),
		end: Object.assign({}, e[r + 3][1].end)
	};
	u.end.column++, u.end.offset++, u.end._bufferIndex++;
	let a = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, u.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, a.start),
		end: Object.assign({}, a.end)
	}, s = [
		e[r + 1],
		e[r + 2],
		[
			"enter",
			i,
			t
		],
		e[r + 3],
		e[r + 4],
		[
			"enter",
			u,
			t
		],
		[
			"exit",
			u,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"enter",
			o,
			t
		],
		[
			"exit",
			o,
			t
		],
		[
			"exit",
			a,
			t
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			i,
			t
		]
	];
	return e.splice(r, e.length - r + 1, ...s), e;
}
function ad(e, t, r) {
	let n = this, i = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []), u = 0, a;
	return o;
	function o(c) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), s;
	}
	function s(c) {
		return c !== 94 ? r(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l);
	}
	function l(c) {
		if (u > 999 || c === 93 && !a || c === null || c === 91 || G(c)) return r(c);
		if (c === 93) {
			e.exit("chunkString");
			let p = e.exit("gfmFootnoteCallString");
			return i.includes(fe(n.sliceSerialize(p))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : r(c);
		}
		return G(c) || (a = !0), u++, e.consume(c), c === 92 ? f : l;
	}
	function f(c) {
		return c === 91 || c === 92 || c === 93 ? (e.consume(c), u++, l) : l(c);
	}
}
function ud(e, t, r) {
	let n = this, i = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []), u, a = 0, o;
	return s;
	function s(D) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(D), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(D) {
		return D === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(D), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : r(D);
	}
	function f(D) {
		if (a > 999 || D === 93 && !o || D === null || D === 91 || G(D)) return r(D);
		if (D === 93) {
			e.exit("chunkString");
			let x = e.exit("gfmFootnoteDefinitionLabelString");
			return u = fe(n.sliceSerialize(x)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(D), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
		}
		return G(D) || (o = !0), a++, e.consume(D), D === 92 ? c : f;
	}
	function c(D) {
		return D === 91 || D === 92 || D === 93 ? (e.consume(D), a++, f) : f(D);
	}
	function p(D) {
		return D === 58 ? (e.enter("definitionMarker"), e.consume(D), e.exit("definitionMarker"), i.includes(u) || i.push(u), U(e, m, "gfmFootnoteDefinitionWhitespace")) : r(D);
	}
	function m(D) {
		return t(D);
	}
}
function od(e, t, r) {
	return e.check(qe, t, e.attempt(rd, t, r));
}
function sd(e) {
	e.exit("gfmFootnoteDefinition");
}
function ld(e, t, r) {
	let n = this;
	return U(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(u) {
		let a = n.events[n.events.length - 1];
		return a && a[1].type === "gfmFootnoteDefinitionIndent" && a[2].sliceSerialize(a[1], !0).length === 4 ? t(u) : r(u);
	}
}
function di(e) {
	let r = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: u,
		resolveAll: i
	};
	return r ??= !0, {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function i(a, o) {
		let s = -1;
		for (; ++s < a.length;) if (a[s][0] === "enter" && a[s][1].type === "strikethroughSequenceTemporary" && a[s][1]._close) {
			let l = s;
			for (; l--;) if (a[l][0] === "exit" && a[l][1].type === "strikethroughSequenceTemporary" && a[l][1]._open && a[s][1].end.offset - a[s][1].start.offset === a[l][1].end.offset - a[l][1].start.offset) {
				a[s][1].type = "strikethroughSequence", a[l][1].type = "strikethroughSequence";
				let f = {
					type: "strikethrough",
					start: Object.assign({}, a[l][1].start),
					end: Object.assign({}, a[s][1].end)
				}, c = {
					type: "strikethroughText",
					start: Object.assign({}, a[l][1].end),
					end: Object.assign({}, a[s][1].start)
				}, p = [
					[
						"enter",
						f,
						o
					],
					[
						"enter",
						a[l][1],
						o
					],
					[
						"exit",
						a[l][1],
						o
					],
					[
						"enter",
						c,
						o
					]
				], m = o.parser.constructs.insideSpan.null;
				m && re(p, p.length, 0, nt(m, a.slice(l + 1, s), o)), re(p, p.length, 0, [
					[
						"exit",
						c,
						o
					],
					[
						"enter",
						a[s][1],
						o
					],
					[
						"exit",
						a[s][1],
						o
					],
					[
						"exit",
						f,
						o
					]
				]), re(a, l - 1, s - l + 3, p), s = l + p.length - 2;
				break;
			}
		}
		for (s = -1; ++s < a.length;) a[s][1].type === "strikethroughSequenceTemporary" && (a[s][1].type = "data");
		return a;
	}
	function u(a, o, s) {
		let l = this.previous, f = this.events, c = 0;
		return p;
		function p(D) {
			return l === 126 && f[f.length - 1][1].type !== "characterEscape" ? s(D) : (a.enter("strikethroughSequenceTemporary"), m(D));
		}
		function m(D) {
			let x = St(l);
			if (D === 126) return c > 1 ? s(D) : (a.consume(D), c++, m);
			if (c < 2 && !r) return s(D);
			let g = a.exit("strikethroughSequenceTemporary"), k = St(D);
			return g._open = !k || k === 2 && !!x, g._close = !x || x === 2 && !!k, o(D);
		}
	}
}
function cd(e, t, r, n) {
	let i = 0;
	if (!(r === 0 && n.length === 0)) {
		for (; i < e.map.length;) {
			if (e.map[i][0] === t) {
				e.map[i][1] += r, e.map[i][2].push(...n);
				return;
			}
			i += 1;
		}
		e.map.push([
			t,
			r,
			n
		]);
	}
}
function ro(e, t) {
	let r = !1, n = [];
	for (; t < e.length;) {
		let i = e[t];
		if (r) {
			if (i[0] === "enter") i[1].type === "tableContent" && n.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let u = n.length - 1;
					n[u] = n[u] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (r = !0);
		t += 1;
	}
	return n;
}
function gi() {
	return { flow: { null: {
		name: "table",
		tokenize: fd,
		resolveAll: pd
	} } };
}
function fd(e, t, r) {
	let n = this, i = 0, u = 0, a;
	return o;
	function o(b) {
		let _ = n.events.length - 1;
		for (; _ > -1;) {
			let R = n.events[_][1].type;
			if (R === "lineEnding" || R === "linePrefix") _--;
			else break;
		}
		let I = _ > -1 ? n.events[_][1].type : null, S = I === "tableHead" || I === "tableRow" ? d : s;
		return S === d && n.parser.lazy[n.now().line] ? r(b) : S(b);
	}
	function s(b) {
		return e.enter("tableHead"), e.enter("tableRow"), l(b);
	}
	function l(b) {
		return b === 124 || (a = !0, u += 1), f(b);
	}
	function f(b) {
		return b === null ? r(b) : B(b) ? u > 1 ? (u = 0, n.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), m) : r(b) : H(b) ? U(e, f, "whitespace")(b) : (u += 1, a && (a = !1, i += 1), b === 124 ? (e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), a = !0, f) : (e.enter("data"), c(b)));
	}
	function c(b) {
		return b === null || b === 124 || G(b) ? (e.exit("data"), f(b)) : (e.consume(b), b === 92 ? p : c);
	}
	function p(b) {
		return b === 92 || b === 124 ? (e.consume(b), c) : c(b);
	}
	function m(b) {
		return n.interrupt = !1, n.parser.lazy[n.now().line] ? r(b) : (e.enter("tableDelimiterRow"), a = !1, H(b) ? U(e, D, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(b) : D(b));
	}
	function D(b) {
		return b === 45 || b === 58 ? g(b) : b === 124 ? (a = !0, e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), x) : y(b);
	}
	function x(b) {
		return H(b) ? U(e, g, "whitespace")(b) : g(b);
	}
	function g(b) {
		return b === 58 ? (u += 1, a = !0, e.enter("tableDelimiterMarker"), e.consume(b), e.exit("tableDelimiterMarker"), k) : b === 45 ? (u += 1, k(b)) : b === null || B(b) ? T(b) : y(b);
	}
	function k(b) {
		return b === 45 ? (e.enter("tableDelimiterFiller"), E(b)) : y(b);
	}
	function E(b) {
		return b === 45 ? (e.consume(b), E) : b === 58 ? (a = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(b), e.exit("tableDelimiterMarker"), w) : (e.exit("tableDelimiterFiller"), w(b));
	}
	function w(b) {
		return H(b) ? U(e, T, "whitespace")(b) : T(b);
	}
	function T(b) {
		return b === 124 ? D(b) : b === null || B(b) ? !a || i !== u ? y(b) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(b)) : y(b);
	}
	function y(b) {
		return r(b);
	}
	function d(b) {
		return e.enter("tableRow"), v(b);
	}
	function v(b) {
		return b === 124 ? (e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), v) : b === null || B(b) ? (e.exit("tableRow"), t(b)) : H(b) ? U(e, v, "whitespace")(b) : (e.enter("data"), L(b));
	}
	function L(b) {
		return b === null || b === 124 || G(b) ? (e.exit("data"), v(b)) : (e.consume(b), b === 92 ? C : L);
	}
	function C(b) {
		return b === 92 || b === 124 ? (e.consume(b), L) : L(b);
	}
}
function pd(e, t) {
	let r = -1, n = !0, i = 0, u = [
		0,
		0,
		0,
		0
	], a = [
		0,
		0,
		0,
		0
	], o = !1, s = 0, l, f, c, p = new Kr();
	for (; ++r < e.length;) {
		let m = e[r], D = m[1];
		m[0] === "enter" ? D.type === "tableHead" ? (o = !1, s !== 0 && (no(p, t, s, l, f), f = void 0, s = 0), l = {
			type: "table",
			start: Object.assign({}, D.start),
			end: Object.assign({}, D.end)
		}, p.add(r, 0, [[
			"enter",
			l,
			t
		]])) : D.type === "tableRow" || D.type === "tableDelimiterRow" ? (n = !0, c = void 0, u = [
			0,
			0,
			0,
			0
		], a = [
			0,
			r + 1,
			0,
			0
		], o && (o = !1, f = {
			type: "tableBody",
			start: Object.assign({}, D.start),
			end: Object.assign({}, D.end)
		}, p.add(r, 0, [[
			"enter",
			f,
			t
		]])), i = D.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (D.type === "data" || D.type === "tableDelimiterMarker" || D.type === "tableDelimiterFiller") ? (n = !1, a[2] === 0 && (u[1] !== 0 && (a[0] = a[1], c = Qr(p, t, u, i, void 0, c), u = [
			0,
			0,
			0,
			0
		]), a[2] = r)) : D.type === "tableCellDivider" && (n ? n = !1 : (u[1] !== 0 && (a[0] = a[1], c = Qr(p, t, u, i, void 0, c)), u = a, a = [
			u[1],
			r,
			0,
			0
		])) : D.type === "tableHead" ? (o = !0, s = r) : D.type === "tableRow" || D.type === "tableDelimiterRow" ? (s = r, u[1] !== 0 ? (a[0] = a[1], c = Qr(p, t, u, i, r, c)) : a[1] !== 0 && (c = Qr(p, t, a, i, r, c)), i = 0) : i && (D.type === "data" || D.type === "tableDelimiterMarker" || D.type === "tableDelimiterFiller") && (a[3] = r);
	}
	for (s !== 0 && no(p, t, s, l, f), p.consume(t.events), r = -1; ++r < t.events.length;) {
		let m = t.events[r];
		m[0] === "enter" && m[1].type === "table" && (m[1]._align = ro(t.events, r));
	}
	return e;
}
function Qr(e, t, r, n, i, u) {
	let a = n === 1 ? "tableHeader" : n === 2 ? "tableDelimiter" : "tableData", o = "tableContent";
	r[0] !== 0 && (u.end = Object.assign({}, It(t.events, r[0])), e.add(r[0], 0, [[
		"exit",
		u,
		t
	]]));
	let s = It(t.events, r[1]);
	if (u = {
		type: a,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(r[1], 0, [[
		"enter",
		u,
		t
	]]), r[2] !== 0) {
		let l = It(t.events, r[2]), f = It(t.events, r[3]), c = {
			type: o,
			start: Object.assign({}, l),
			end: Object.assign({}, f)
		};
		if (e.add(r[2], 0, [[
			"enter",
			c,
			t
		]]), n !== 2) {
			let p = t.events[r[2]], m = t.events[r[3]];
			if (p[1].end = Object.assign({}, m[1].end), p[1].type = "chunkText", p[1].contentType = "text", r[3] > r[2] + 1) {
				let D = r[2] + 1, x = r[3] - r[2] - 1;
				e.add(D, x, []);
			}
		}
		e.add(r[3] + 1, 0, [[
			"exit",
			c,
			t
		]]);
	}
	return i !== void 0 && (u.end = Object.assign({}, It(t.events, i)), e.add(i, 0, [[
		"exit",
		u,
		t
	]]), u = void 0), u;
}
function no(e, t, r, n, i) {
	let u = [], a = It(t.events, r);
	i && (i.end = Object.assign({}, a), u.push([
		"exit",
		i,
		t
	])), n.end = Object.assign({}, a), u.push([
		"exit",
		n,
		t
	]), e.add(r + 1, 0, u);
}
function It(e, t) {
	let r = e[t], n = r[0] === "enter" ? "start" : "end";
	return r[1][n];
}
function xi() {
	return { text: { 91: hd } };
}
function md(e, t, r) {
	let n = this;
	return i;
	function i(s) {
		return n.previous !== null || !n._gfmTasklistFirstContentOfListItem ? r(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), u);
	}
	function u(s) {
		return G(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), a) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), a) : r(s);
	}
	function a(s) {
		return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), o) : r(s);
	}
	function o(s) {
		return B(s) ? t(s) : H(s) ? e.check({ tokenize: Dd }, t, r)(s) : r(s);
	}
}
function Dd(e, t, r) {
	return U(e, n, "whitespace");
	function n(i) {
		return i === null ? r(i) : t(i);
	}
}
function io(e) {
	return Nr([
		hi(),
		Di(),
		di(e),
		gi(),
		xi()
	]);
}
function dd(e, t, r) {
	let n = this, i = n.events[n.events.length - 1], u = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
	return o;
	function o(E) {
		return e.enter("mathFlow"), e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), s(E);
	}
	function s(E) {
		return E === 36 ? (e.consume(E), a++, s) : a < 2 ? r(E) : (e.exit("mathFlowFenceSequence"), U(e, l, "whitespace")(E));
	}
	function l(E) {
		return E === null || B(E) ? c(E) : (e.enter("mathFlowFenceMeta"), e.enter("chunkString", { contentType: "string" }), f(E));
	}
	function f(E) {
		return E === null || B(E) ? (e.exit("chunkString"), e.exit("mathFlowFenceMeta"), c(E)) : E === 36 ? r(E) : (e.consume(E), f);
	}
	function c(E) {
		return e.exit("mathFlowFence"), n.interrupt ? t(E) : e.attempt(ao, p, g)(E);
	}
	function p(E) {
		return e.attempt({
			tokenize: k,
			partial: !0
		}, g, m)(E);
	}
	function m(E) {
		return (u ? U(e, D, "linePrefix", u + 1) : D)(E);
	}
	function D(E) {
		return E === null ? g(E) : B(E) ? e.attempt(ao, p, g)(E) : (e.enter("mathFlowValue"), x(E));
	}
	function x(E) {
		return E === null || B(E) ? (e.exit("mathFlowValue"), D(E)) : (e.consume(E), x);
	}
	function g(E) {
		return e.exit("mathFlow"), t(E);
	}
	function k(E, w, T) {
		let y = 0;
		return U(E, d, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		function d(C) {
			return E.enter("mathFlowFence"), E.enter("mathFlowFenceSequence"), v(C);
		}
		function v(C) {
			return C === 36 ? (y++, E.consume(C), v) : y < a ? T(C) : (E.exit("mathFlowFenceSequence"), U(E, L, "whitespace")(C));
		}
		function L(C) {
			return C === null || B(C) ? (E.exit("mathFlowFence"), w(C)) : T(C);
		}
	}
}
function gd(e, t, r) {
	let n = this;
	return i;
	function i(a) {
		return a === null ? t(a) : (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), u);
	}
	function u(a) {
		return n.parser.lazy[n.now().line] ? r(a) : t(a);
	}
}
function oo(e) {
	let r = (e || {}).singleDollarTextMath;
	return r ??= !0, {
		tokenize: n,
		resolve: xd,
		previous: kd,
		name: "mathText"
	};
	function n(i, u, a) {
		let s = 0, l, f;
		return c;
		function c(g) {
			return i.enter("mathText"), i.enter("mathTextSequence"), p(g);
		}
		function p(g) {
			return g === 36 ? (i.consume(g), s++, p) : s < 2 && !r ? a(g) : (i.exit("mathTextSequence"), m(g));
		}
		function m(g) {
			return g === null ? a(g) : g === 36 ? (f = i.enter("mathTextSequence"), l = 0, x(g)) : g === 32 ? (i.enter("space"), i.consume(g), i.exit("space"), m) : B(g) ? (i.enter("lineEnding"), i.consume(g), i.exit("lineEnding"), m) : (i.enter("mathTextData"), D(g));
		}
		function D(g) {
			return g === null || g === 32 || g === 36 || B(g) ? (i.exit("mathTextData"), m(g)) : (i.consume(g), D);
		}
		function x(g) {
			return g === 36 ? (i.consume(g), l++, x) : l === s ? (i.exit("mathTextSequence"), i.exit("mathText"), u(g)) : (f.type = "mathTextData", D(g));
		}
	}
}
function xd(e) {
	let t = e.length - 4, r = 3, n, i;
	if ((e[r][1].type === "lineEnding" || e[r][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (n = r; ++n < t;) if (e[n][1].type === "mathTextData") {
			e[t][1].type = "mathTextPadding", e[r][1].type = "mathTextPadding", r += 2, t -= 2;
			break;
		}
	}
	for (n = r - 1, t++; ++n <= t;) i === void 0 ? n !== t && e[n][1].type !== "lineEnding" && (i = n) : (n === t || e[n][1].type === "lineEnding") && (e[i][1].type = "mathTextData", n !== i + 2 && (e[i][1].end = e[n - 1][1].end, e.splice(i + 2, n - i - 2), t -= n - i - 2, n = i + 2), i = void 0);
	return e;
}
function kd(e) {
	return e !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function ki(e) {
	return {
		flow: { 36: uo },
		text: { 36: oo(e) }
	};
}
function so(e) {
	return e < qt.nul || e === qt.space;
}
function Fi(e) {
	return e < qt.horizontalTab;
}
function lo() {
	var r = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).aliasDivider || ":", n = "[[", i = "]]";
	function u(o, s, l) {
		var f, c, p = 0, m = 0, D = 0;
		return x;
		function x(d) {
			return d !== n.charCodeAt(m) ? l(d) : (o.enter("wikiLink"), o.enter("wikiLinkMarker"), g(d));
		}
		function g(d) {
			return m === n.length ? (o.exit("wikiLinkMarker"), k(d)) : d !== n.charCodeAt(m) ? l(d) : (o.consume(d), m++, g);
		}
		function k(d) {
			return Fi(d) || d === qt.eof ? l(d) : (o.enter("wikiLinkData"), o.enter("wikiLinkTarget"), E(d));
		}
		function E(d) {
			return d === r.charCodeAt(p) ? f ? (o.exit("wikiLinkTarget"), o.enter("wikiLinkAliasMarker"), w(d)) : l(d) : d === i.charCodeAt(D) ? f ? (o.exit("wikiLinkTarget"), o.exit("wikiLinkData"), o.enter("wikiLinkMarker"), y(d)) : l(d) : Fi(d) || d === qt.eof ? l(d) : (so(d) || (f = !0), o.consume(d), E);
		}
		function w(d) {
			return p === r.length ? (o.exit("wikiLinkAliasMarker"), o.enter("wikiLinkAlias"), T(d)) : d !== r.charCodeAt(p) ? l(d) : (o.consume(d), p++, w);
		}
		function T(d) {
			return d === i.charCodeAt(D) ? c ? (o.exit("wikiLinkAlias"), o.exit("wikiLinkData"), o.enter("wikiLinkMarker"), y(d)) : l(d) : Fi(d) || d === qt.eof ? l(d) : (so(d) || (c = !0), o.consume(d), T);
		}
		function y(d) {
			return D === i.length ? (o.exit("wikiLinkMarker"), o.exit("wikiLink"), s(d)) : d !== i.charCodeAt(D) ? l(d) : (o.consume(d), D++, y);
		}
	}
	return { text: { 91: { tokenize: u } } };
}
function Fd(e) {
	return this[e < 0 ? this.length + e : e];
}
function yd(e) {
	return X(0, e, /[^\n]/g, " ");
}
function vd(e) {
	let t = e.slice(0, or);
	if (t !== "---" && t !== "+++") return;
	let r = e.indexOf(`
`, or);
	if (r === -1) return;
	let n = e.slice(or, r).trim(), i = e.indexOf(`
${t}`, r), u = n;
	if (u || (u = t === "+++" ? "toml" : "yaml"), i === -1 && t === "---" && u === "yaml" && (i = e.indexOf(`
...`, r)), i === -1) return;
	let a = i + 1 + or, o = e.charAt(a + 1);
	if (!/\s?/.test(o)) return;
	let s = e.slice(0, a), l;
	return {
		language: u,
		explicitLanguage: n || null,
		value: e.slice(r + 1, i),
		startDelimiter: t,
		endDelimiter: s.slice(-or),
		raw: s,
		start: {
			line: 1,
			column: 0,
			index: 0
		},
		end: {
			index: s.length,
			get line() {
				return l ?? (l = s.split(`
`)), l.length;
			},
			get column() {
				return l ?? (l = s.split(`
`)), J(0, l, -1).length;
			}
		},
		[Jr]: !0
	};
}
function Ad(e) {
	let t = vd(e);
	return t ? {
		frontMatter: t,
		get content() {
			let { raw: r } = t;
			return co(r) + e.slice(r.length);
		}
	} : { content: e };
}
function bi(e, t) {
	let r = String(e);
	if (typeof t != "string") throw new TypeError("Expected character");
	let n = 0, i = r.indexOf(t);
	for (; i !== -1;) n++, i = r.indexOf(t, i + t.length);
	return n;
}
function ve(e) {
	if (typeof e != "string") throw new TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Td(e) {
	let t = [], r = -1;
	for (; ++r < e.length;) t[r] = _t(e[r]);
	return Xr(n);
	function n(...i) {
		let u = -1;
		for (; ++u < t.length;) if (t[u].apply(this, i)) return !0;
		return !1;
	}
}
function Sd(e) {
	let t = e;
	return Xr(r);
	function r(n) {
		let i = n, u;
		for (u in e) if (i[u] !== t[u]) return !1;
		return !0;
	}
}
function Ld(e) {
	return Xr(t);
	function t(r) {
		return r && r.type === e;
	}
}
function Xr(e) {
	return t;
	function t(r, n, i) {
		return !!(qd(r) && e.call(this, r, typeof n == "number" ? n : void 0, i || void 0));
	}
}
function Id() {
	return !0;
}
function qd(e) {
	return e !== null && typeof e == "object" && "type" in e;
}
function wi(e, t, r, n) {
	let i;
	typeof t == "function" && typeof r != "function" ? (n = r, r = t) : i = t;
	let u = _t(i), a = n ? -1 : 1;
	o(e, void 0, [])();
	function o(s, l, f) {
		let c = s && typeof s == "object" ? s : {};
		if (typeof c.type == "string") {
			let m = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0;
			Object.defineProperty(p, "name", { value: "node (" + (s.type + (m ? "<" + m + ">" : "")) + ")" });
		}
		return p;
		function p() {
			let m = fo, D, x, g;
			if ((!t || u(s, l, f[f.length - 1] || void 0)) && (m = Bd(r(s, f)), m[0] === Ei)) return m;
			if ("children" in s && s.children) {
				let k = s;
				if (k.children && m[0] !== ho) for (x = (n ? k.children.length : -1) + a, g = f.concat(k); x > -1 && x < k.children.length;) {
					let E = k.children[x];
					if (D = o(E, x, g)(), D[0] === Ei) return D;
					x = typeof D[1] == "number" ? D[1] : x + a;
				}
			}
			return m;
		}
	}
}
function Bd(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [po, e] : e == null ? fo : [e];
}
function Ci(e, t, r) {
	let i = _t((r || {}).ignore || []), u = _d(t), a = -1;
	for (; ++a < u.length;) wi(e, "text", o);
	function o(l, f) {
		let c = -1, p;
		for (; ++c < f.length;) {
			let m = f[c], D = p ? p.children : void 0;
			if (i(m, D ? D.indexOf(m) : void 0, p)) return;
			p = m;
		}
		if (p) return s(l, f);
	}
	function s(l, f) {
		let c = f[f.length - 1], p = u[a][0], m = u[a][1], D = 0, g = c.children.indexOf(l), k = !1, E = [];
		p.lastIndex = 0;
		let w = p.exec(l.value);
		for (; w;) {
			let T = w.index, y = {
				index: w.index,
				input: w.input,
				stack: [...f, l]
			}, d = m(...w, y);
			if (typeof d == "string" && (d = d.length > 0 ? {
				type: "text",
				value: d
			} : void 0), d === !1 ? p.lastIndex = T + 1 : (D !== T && E.push({
				type: "text",
				value: l.value.slice(D, T)
			}), Array.isArray(d) ? E.push(...d) : d && E.push(d), D = T + w[0].length, k = !0), !p.global) break;
			w = p.exec(l.value);
		}
		return k ? (D < l.value.length && E.push({
			type: "text",
			value: l.value.slice(D)
		}), c.children.splice(g, 1, ...E)) : E = [l], g + E.length;
	}
}
function _d(e) {
	let t = [];
	if (!Array.isArray(e)) throw new TypeError("Expected find and replace tuple or list of tuples");
	let r = !e[0] || Array.isArray(e[0]) ? e : [e], n = -1;
	for (; ++n < r.length;) {
		let i = r[n];
		t.push([Pd(i[0]), Od(i[1])]);
	}
	return t;
}
function Pd(e) {
	return typeof e == "string" ? new RegExp(ve(e), "g") : e;
}
function Od(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
function vi() {
	return {
		transforms: [Hd],
		enter: {
			literalAutolink: Nd,
			literalAutolinkEmail: yi,
			literalAutolinkHttp: yi,
			literalAutolinkWww: yi
		},
		exit: {
			literalAutolink: Ud,
			literalAutolinkEmail: zd,
			literalAutolinkHttp: Rd,
			literalAutolinkWww: Md
		}
	};
}
function Nd(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function yi(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function Rd(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function Md(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function zd(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function Ud(e) {
	this.exit(e);
}
function Hd(e) {
	Ci(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Vd], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, Gd]], { ignore: ["link", "linkReference"] });
}
function Vd(e, t, r, n, i) {
	let u = "";
	if (!mo(i) || (/^w/i.test(t) && (r = t + r, t = "", u = "http://"), !jd(r))) return !1;
	let a = Wd(r + n);
	if (!a[0]) return !1;
	let o = {
		type: "link",
		title: null,
		url: u + t + a[0],
		children: [{
			type: "text",
			value: t + a[0]
		}]
	};
	return a[1] ? [o, {
		type: "text",
		value: a[1]
	}] : o;
}
function Gd(e, t, r, n) {
	return !mo(n, !0) || /[-\d_]$/.test(r) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + r,
		children: [{
			type: "text",
			value: t + "@" + r
		}]
	};
}
function jd(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function Wd(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let r = t[0], n = r.indexOf(")"), i = bi(e, "("), u = bi(e, ")");
	for (; n !== -1 && i > u;) e += r.slice(0, n + 1), r = r.slice(n + 1), n = r.indexOf(")"), u++;
	return [e, r];
}
function mo(e, t) {
	let r = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || Ie(r) || Dt(r)) && (!t || r !== 47);
}
function $d() {
	this.buffer();
}
function Kd(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function Qd() {
	this.buffer();
}
function Jd(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function Xd(e) {
	let t = this.resume(), r = this.stack[this.stack.length - 1];
	r.type, r.identifier = fe(this.sliceSerialize(e)).toLowerCase(), r.label = t;
}
function Zd(e) {
	this.exit(e);
}
function eg(e) {
	let t = this.resume(), r = this.stack[this.stack.length - 1];
	r.type, r.identifier = fe(this.sliceSerialize(e)).toLowerCase(), r.label = t;
}
function tg(e) {
	this.exit(e);
}
function rg() {
	return "[";
}
function ng(e, t, r, n) {
	let i = r.createTracker(n), u = i.move("[^"), a = r.enter("footnoteReference"), o = r.enter("reference");
	return u += i.move(r.safe(r.associationId(e), {
		after: "]",
		before: u
	})), o(), a(), u += i.move("]"), u;
}
function Ai() {
	return {
		enter: {
			gfmFootnoteCallString: $d,
			gfmFootnoteCall: Kd,
			gfmFootnoteDefinitionLabelString: Qd,
			gfmFootnoteDefinition: Jd
		},
		exit: {
			gfmFootnoteCallString: Xd,
			gfmFootnoteCall: Zd,
			gfmFootnoteDefinitionLabelString: eg,
			gfmFootnoteDefinition: tg
		}
	};
}
function Ti() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: ag },
		exit: { strikethrough: ug }
	};
}
function ag(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function ug(e) {
	this.exit(e);
}
function og(e, t, r, n) {
	let i = r.createTracker(n), u = r.enter("strikethrough"), a = i.move("~~");
	return a += r.containerPhrasing(e, {
		...i.current(),
		before: a,
		after: "~"
	}), a += i.move("~~"), u(), a;
}
function sg() {
	return "~";
}
function Li() {
	return {
		enter: {
			table: cg,
			tableData: Do,
			tableHeader: Do,
			tableRow: pg
		},
		exit: {
			codeText: hg,
			table: fg,
			tableData: Si,
			tableHeader: Si,
			tableRow: Si
		}
	};
}
function cg(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(r) {
			return r === "none" ? null : r;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function fg(e) {
	this.exit(e), this.data.inTable = void 0;
}
function pg(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function Si(e) {
	this.exit(e);
}
function Do(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function hg(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, mg));
	let r = this.stack[this.stack.length - 1];
	r.type, r.value = t, this.exit(e);
}
function mg(e, t) {
	return t === "|" ? t : e;
}
function Ii() {
	return { exit: {
		taskListCheckValueChecked: go,
		taskListCheckValueUnchecked: go,
		paragraph: dg
	} };
}
function go(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function dg(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let r = this.stack[this.stack.length - 1];
		r.type;
		let n = r.children[0];
		if (n && n.type === "text") {
			let i = t.children, u = -1, a;
			for (; ++u < i.length;) {
				let o = i[u];
				if (o.type === "paragraph") {
					a = o;
					break;
				}
			}
			a === r && (n.value = n.value.slice(1), n.value.length === 0 ? r.children.shift() : r.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, r.position.start = Object.assign({}, n.position.start)));
		}
	}
	this.exit(e);
}
function qi() {
	return [
		vi(),
		Ai(),
		Ti(),
		Li(),
		Ii()
	];
}
function xo() {
	let e = qi(), t = e.find((r) => r.enter.literalAutolink);
	return t.transforms = [], e;
}
function kg(e, t, r) {
	let n = this, i, u, a;
	return o;
	function o(h) {
		return M.lessThan, e.enter(se.htmlText), e.enter(se.htmlTextData), e.consume(h), s;
	}
	function s(h) {
		return h === M.exclamationMark ? (e.consume(h), l) : h === M.slash ? (e.consume(h), y) : h === M.questionMark ? (e.consume(h), w) : K(h) ? (e.consume(h), L) : r(h);
	}
	function l(h) {
		return h === M.dash ? (e.consume(h), f) : h === M.leftSquareBracket ? (e.consume(h), u = 0, D) : K(h) ? (e.consume(h), E) : r(h);
	}
	function f(h) {
		return h === M.dash ? (e.consume(h), m) : r(h);
	}
	function c(h) {
		return h === M.eof ? r(h) : h === M.dash ? (e.consume(h), p) : B(h) ? (a = c, N(h)) : (e.consume(h), c);
	}
	function p(h) {
		return h === M.dash ? (e.consume(h), m) : c(h);
	}
	function m(h) {
		return h === M.greaterThan ? z(h) : h === M.dash ? p(h) : c(h);
	}
	function D(h) {
		let W = Bi.cdataOpeningString;
		return h === W.charCodeAt(u++) ? (e.consume(h), u === W.length ? x : D) : r(h);
	}
	function x(h) {
		return h === M.eof ? r(h) : h === M.rightSquareBracket ? (e.consume(h), g) : B(h) ? (a = x, N(h)) : (e.consume(h), x);
	}
	function g(h) {
		return h === M.rightSquareBracket ? (e.consume(h), k) : x(h);
	}
	function k(h) {
		return h === M.greaterThan ? z(h) : h === M.rightSquareBracket ? (e.consume(h), k) : x(h);
	}
	function E(h) {
		return h === M.eof || h === M.greaterThan ? z(h) : B(h) ? (a = E, N(h)) : (e.consume(h), E);
	}
	function w(h) {
		return h === M.eof ? r(h) : h === M.questionMark ? (e.consume(h), T) : B(h) ? (a = w, N(h)) : (e.consume(h), w);
	}
	function T(h) {
		return h === M.greaterThan ? z(h) : w(h);
	}
	function y(h) {
		return K(h) ? (e.consume(h), d) : r(h);
	}
	function d(h) {
		return h === M.dash || Q(h) ? (e.consume(h), d) : v(h);
	}
	function v(h) {
		return B(h) ? (a = v, N(h)) : H(h) ? (e.consume(h), v) : z(h);
	}
	function L(h) {
		return h === M.dash || Q(h) ? (e.consume(h), L) : h === M.slash || h === M.greaterThan || G(h) ? C(h) : r(h);
	}
	function C(h) {
		return h === M.slash ? (e.consume(h), z) : h === M.colon || h === M.underscore || K(h) ? (e.consume(h), b) : B(h) ? (a = C, N(h)) : H(h) ? (e.consume(h), C) : z(h);
	}
	function b(h) {
		return h === M.dash || h === M.dot || h === M.colon || h === M.underscore || Q(h) ? (e.consume(h), b) : _(h);
	}
	function _(h) {
		return h === M.equalsTo ? (e.consume(h), I) : B(h) ? (a = _, N(h)) : H(h) ? (e.consume(h), _) : C(h);
	}
	function I(h) {
		return h === M.eof || h === M.lessThan || h === M.equalsTo || h === M.greaterThan || h === M.graveAccent ? r(h) : h === M.quotationMark || h === M.apostrophe ? (e.consume(h), i = h, S) : B(h) ? (a = I, N(h)) : H(h) ? (e.consume(h), I) : (e.consume(h), R);
	}
	function S(h) {
		return h === i ? (e.consume(h), i = void 0, O) : h === M.eof ? r(h) : B(h) ? (a = S, N(h)) : (e.consume(h), S);
	}
	function R(h) {
		return h === M.eof || h === M.quotationMark || h === M.apostrophe || h === M.lessThan || h === M.equalsTo || h === M.graveAccent ? r(h) : h === M.slash || h === M.greaterThan || G(h) ? C(h) : (e.consume(h), R);
	}
	function O(h) {
		return h === M.slash || h === M.greaterThan || G(h) ? C(h) : r(h);
	}
	function z(h) {
		return h === M.greaterThan ? (e.consume(h), e.exit(se.htmlTextData), e.exit(se.htmlText), t) : r(h);
	}
	function N(h) {
		return e.exit(se.htmlTextData), e.enter(se.lineEnding), e.consume(h), e.exit(se.lineEnding), j;
	}
	function j(h) {
		return n.parser.constructs.disable.null, ne(h);
	}
	function ne(h) {
		return e.enter(se.htmlTextData), a(h);
	}
}
function ko() {
	return { text: { [M.lessThan]: xg } };
}
function Fo() {
	return {
		canContainEols: [sr],
		enter: { [sr]: e },
		exit: { [sr]: t }
	};
	function e(r) {
		this.enter({ type: sr }, r), this.buffer();
	}
	function t(r) {
		this.resume();
		let n = J(0, this.stack, -1);
		n.value = this.sliceSerialize(r), this.exit(r);
	}
}
function bo() {
	return { text: { [M.leftCurlyBrace]: {
		name: "liquid",
		tokenize: e
	} } };
	function e(t, r, n) {
		let i;
		return u;
		function u(s) {
			return t.enter("liquidNode"), t.enter(se.data), t.consume(s), function(l) {
				switch (l) {
					case M.percentSign:
					case M.leftCurlyBrace: return i = l === M.percentSign ? M.percentSign : M.rightCurlyBrace, t.consume(l), a;
					default: return n(l);
				}
			};
		}
		function a(s) {
			switch (s) {
				case i: return t.consume(s), o;
				case M.eof: return n(s);
				default: return B(s) ? (t.exit(se.data), t.enter(se.lineEnding), t.consume(s), t.exit(se.lineEnding), t.enter(se.data), a) : (t.consume(s), a);
			}
		}
		function o(s) {
			return s === M.rightCurlyBrace ? (t.consume(s), t.exit(se.data), t.exit(sr), r) : a;
		}
	}
}
function bg() {
	return Fg ?? (Fg = {
		extensions: [
			io(),
			ki(),
			lo(),
			bo(),
			ko()
		],
		mdastExtensions: [
			xo(),
			ci(),
			Yu(),
			Fo()
		]
	});
}
function _i(e) {
	let { frontMatter: t, content: r } = Ge(e), n = li(r, bg());
	if (t) {
		let [i, u] = [t.start, t.end].map(({ line: a, column: o, index: s }) => ({
			line: a,
			column: o + 1,
			offset: s
		}));
		n.children.unshift({
			...t,
			type: "frontMatter",
			position: {
				start: i,
				end: u
			}
		});
	}
	return n;
}
function Bp(e, t, r) {
	if (!e.has(t)) {
		let n = r(t);
		e.set(t, n);
	}
	return e.get(t);
}
function _b(e) {
	if (typeof e == "string") return De;
	if (Array.isArray(e)) return de;
	if (!e) return;
	let { type: t } = e;
	if (Tn.has(t)) return t;
}
function Ob(e) {
	let t = e === null ? "null" : typeof e;
	if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
	if (me(e)) throw new Error("doc is valid.");
	let r = Object.prototype.toString.call(e);
	if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
	let n = Pb([...Tn].map((i) => `'${i}'`));
	return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
function Nb(e, t, r, n) {
	let i = [e];
	for (; i.length > 0;) {
		let u = i.pop();
		if (u === _p) {
			r(i.pop());
			continue;
		}
		r && i.push(u, _p);
		let a = me(u);
		if (!a) throw new wt(u);
		if (t?.(u) !== !1) switch (a) {
			case de:
			case Fe: {
				let o = a === de ? u : u.parts;
				for (let l = o.length - 1; l >= 0; --l) i.push(o[l]);
				break;
			}
			case be:
				i.push(u.flatContents, u.breakContents);
				break;
			case ke:
				if (n && u.expandedStates) for (let o = u.expandedStates.length, s = o - 1; s >= 0; --s) i.push(u.expandedStates[s]);
				else i.push(u.contents);
				break;
			case Te:
			case Ae:
			case Ke:
			case Xe:
			case Qe:
				i.push(u.contents);
				break;
			case De:
			case st:
			case $e:
			case Je:
			case ge:
			case Se: break;
			default: throw new wt(u);
		}
	}
}
function Rb(e, t) {
	if (typeof e == "string") return t(e);
	let r = /* @__PURE__ */ new Map();
	return n(e);
	function n(u) {
		return Bp(r, u, i);
	}
	function i(u) {
		switch (me(u)) {
			case de: return t(u.map(n));
			case Fe: return t({
				...u,
				parts: u.parts.map(n)
			});
			case be: return t({
				...u,
				breakContents: n(u.breakContents),
				flatContents: n(u.flatContents)
			});
			case ke: {
				let { expandedStates: a, contents: o } = u;
				return a ? (a = a.map(n), o = a[0]) : o = n(o), t({
					...u,
					contents: o,
					expandedStates: a
				});
			}
			case Te:
			case Ae:
			case Ke:
			case Xe:
			case Qe: return t({
				...u,
				contents: n(u.contents)
			});
			case De:
			case st:
			case $e:
			case Je:
			case ge:
			case Se: return t(u);
			default: throw new wt(u);
		}
	}
}
function Op(e) {
	if (e.length > 0) {
		let t = J(0, e, -1);
		!t.expandedStates && !t.break && (t.break = "propagated");
	}
	return null;
}
function Np(e) {
	let t = /* @__PURE__ */ new Set(), r = [];
	function n(u) {
		if (u.type === Se && Op(r), u.type === ke) {
			if (r.push(u), t.has(u)) return !1;
			t.add(u);
		}
	}
	function i(u) {
		u.type === ke && r.pop().break && Op(r);
	}
	Pp(e, n, i, !0);
}
function Ze(e, t = Cr) {
	return Rb(e, (r) => typeof r == "string" ? Sn(t, r.split(`
`)) : r);
}
function yr(e) {
	return Le(e), {
		type: Ae,
		contents: e
	};
}
function we(e, t) {
	return Mp(e), Le(t), {
		type: Te,
		contents: t,
		n: e
	};
}
function vr(e) {
	return we({ type: "root" }, e);
}
function Yt(e) {
	return Rp(e), {
		type: Fe,
		parts: e
	};
}
function $t(e, t = {}) {
	return Le(e), Ln(t.expandedStates, !0), {
		type: ke,
		id: t.id,
		contents: e,
		break: !!t.shouldBreak,
		expandedStates: t.expandedStates
	};
}
function zp(e, t = "", r = {}) {
	return Le(e), t !== "" && Le(t), {
		type: be,
		breakContents: e,
		flatContents: t,
		groupId: r.groupId
	};
}
function Sn(e, t) {
	Le(e), Ln(t);
	let r = [];
	for (let n = 0; n < t.length; n++) n !== 0 && r.push(e), r.push(t[n]);
	return r;
}
function Up(e) {
	return e === zb ? Hb : e === Ub ? Vb : jb;
}
function $b(e) {
	let t = e[0], r = e[1];
	for (let n = 0; n < e.length; n += 2) {
		let i = e[n], u = e[n + 1];
		if ($p >= i && $p <= u) return [i, u];
		u - i > r - t && (t = i, r = u);
	}
	return [t, r];
}
function Jb(e) {
	if (!e) return 0;
	if (!Qb.test(e)) return e.length;
	let t = 0;
	e = e.replace(Hp(), (r) => (t += Kp(r) ? 1 : 2, ""));
	for (let r of e) {
		let n = r.codePointAt(0);
		n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || n >= 65024 && n <= 65039 || (t += ja(n) || Wa(n) ? 2 : 1);
	}
	return t;
}
function Qp(e, t, r) {
	let n = t.type === 1 ? e.queue.slice(0, -1) : [...e.queue, t], i = "", u = 0, a = 0, o = 0;
	for (let D of n) switch (D.type) {
		case 0:
			f(), r.useTabs ? s(1) : l(r.tabWidth);
			break;
		case 3: {
			let { string: x } = D;
			f(), i += x, u += x.length;
			break;
		}
		case 2: {
			let { width: x } = D;
			a += 1, o += x;
			break;
		}
		default: throw new Error(`Unexpected indent comment '${D.type}'.`);
	}
	return p(), {
		...e,
		value: i,
		length: u,
		queue: n
	};
	function s(D) {
		i += "	".repeat(D), u += r.tabWidth * D;
	}
	function l(D) {
		i += " ".repeat(D), u += D;
	}
	function f() {
		r.useTabs ? c() : p();
	}
	function c() {
		a > 0 && s(a), m();
	}
	function p() {
		o > 0 && l(o), m();
	}
	function m() {
		a = 0, o = 0;
	}
}
function Jp(e, t, r) {
	if (!t) return e;
	if (t.type === "root") return {
		...e,
		root: e
	};
	if (t === Number.NEGATIVE_INFINITY) return e.root;
	let n;
	return typeof t == "number" ? t < 0 ? n = Zb : n = {
		type: 2,
		width: t
	} : n = {
		type: 3,
		string: t
	}, Qp(e, n, r);
}
function Xp(e, t) {
	return Qp(e, Xb, t);
}
function eE(e) {
	let t = 0;
	for (let r = e.length - 1; r >= 0; r--) {
		let n = e[r];
		if (n === " " || n === "	") t++;
		else break;
	}
	return t;
}
function Bn(e) {
	let t = eE(e);
	return {
		text: t === 0 ? e : e.slice(0, e.length - t),
		count: t
	};
}
function _n(e, t, r, n, i, u) {
	if (r === Number.POSITIVE_INFINITY) return !0;
	let a = t.length, o = !1, s = [e], l = "";
	for (; r >= 0;) {
		if (s.length === 0) {
			if (a === 0) return !0;
			s.push(t[--a]);
			continue;
		}
		let { mode: f, doc: c } = s.pop(), p = me(c);
		switch (p) {
			case De:
				c && (o && (l += " ", r -= 1, o = !1), l += c, r -= Tr(c));
				break;
			case de:
			case Fe: {
				let m = p === de ? c : c.parts, D = c[Ka] ?? 0;
				for (let x = m.length - 1; x >= D; x--) s.push({
					mode: f,
					doc: m[x]
				});
				break;
			}
			case Ae:
			case Te:
			case Ke:
			case Xe:
				s.push({
					mode: f,
					doc: c.contents
				});
				break;
			case $e: {
				let { text: m, count: D } = Bn(l);
				l = m, r += D;
				break;
			}
			case ke: {
				if (u && c.break) return !1;
				let m = c.break ? Ce : f, D = c.expandedStates && m === Ce ? J(0, c.expandedStates, -1) : c.contents;
				s.push({
					mode: m,
					doc: D
				});
				break;
			}
			case be: {
				let D = (c.groupId ? i[c.groupId] || Re : f) === Ce ? c.breakContents : c.flatContents;
				D && s.push({
					mode: f,
					doc: D
				});
				break;
			}
			case ge:
				if (f === Ce || c.hard) return !0;
				c.soft || (o = !0);
				break;
			case Qe:
				n = !0;
				break;
			case Je:
				if (n) return !1;
				break;
		}
	}
	return !1;
}
function eh(e, t) {
	let r = Object.create(null), n = t.printWidth, i = Up(t.endOfLine), u = 0, a = [{
		indent: Ya,
		mode: Ce,
		doc: e
	}], o = !1, s = [], l = new Zp();
	for (Np(e); a.length > 0;) {
		let { indent: D, mode: x, doc: g } = a.pop();
		switch (me(g)) {
			case De: {
				let k = i !== `
` ? X(0, g, `
`, i) : g;
				k && (l.write(k), a.length > 0 && (u += Tr(k)));
				break;
			}
			case de:
				for (let k = g.length - 1; k >= 0; k--) a.push({
					indent: D,
					mode: x,
					doc: g[k]
				});
				break;
			case st:
				l.markPosition();
				break;
			case Ae:
				a.push({
					indent: Xp(D, t),
					mode: x,
					doc: g.contents
				});
				break;
			case Te:
				a.push({
					indent: Jp(D, g.n, t),
					mode: x,
					doc: g.contents
				});
				break;
			case $e:
				u -= l.trim();
				break;
			case ke: {
				let k = (function() {
					if (x === Re && !o) return {
						indent: D,
						mode: g.break ? Ce : Re,
						doc: g.contents
					};
					o = !1;
					let w = n - u, T = s.length > 0, y = {
						indent: D,
						mode: Re,
						doc: g.contents
					};
					if (!g.break && _n(y, a, w, T, r)) return y;
					if (!g.expandedStates) return {
						indent: D,
						mode: Ce,
						doc: g.contents
					};
					if (!g.break) for (let d = 1; d < g.expandedStates.length - 1; d++) {
						let v = {
							indent: D,
							mode: Re,
							doc: g.expandedStates[d]
						};
						if (_n(v, a, w, T, r)) return v;
					}
					return {
						indent: D,
						mode: Ce,
						doc: J(0, g.expandedStates, -1)
					};
				})();
				a.push(k), g.id && (r[g.id] = k.mode);
				break;
			}
			case Fe: {
				let k = n - u, E = g[Ka] ?? 0, { parts: w } = g, T = w.length - E;
				if (T === 0) break;
				let y = w[E + 0], d = w[E + 1], v = {
					indent: D,
					mode: Re,
					doc: y
				}, L = {
					indent: D,
					mode: Ce,
					doc: y
				}, C = _n(v, [], k, s.length > 0, r, !0);
				if (T === 1) {
					C ? a.push(v) : a.push(L);
					break;
				}
				let b = {
					indent: D,
					mode: Re,
					doc: d
				}, _ = {
					indent: D,
					mode: Ce,
					doc: d
				};
				if (T === 2) {
					C ? a.push(b, v) : a.push(_, L);
					break;
				}
				let I = w[E + 2], S = {
					indent: D,
					mode: x,
					doc: {
						...g,
						[Ka]: E + 2
					}
				}, O = _n({
					indent: D,
					mode: Re,
					doc: [
						y,
						d,
						I
					]
				}, [], k, s.length > 0, r, !0);
				a.push(S), O ? a.push(b, v) : C ? a.push(_, v) : a.push(_, L);
				break;
			}
			case be:
			case Ke: {
				let k = g.groupId ? r[g.groupId] : x;
				if (k === Ce) {
					let E = g.type === be ? g.breakContents : g.negate ? g.contents : yr(g.contents);
					E && a.push({
						indent: D,
						mode: x,
						doc: E
					});
				}
				if (k === Re) {
					let E = g.type === be ? g.flatContents : g.negate ? yr(g.contents) : g.contents;
					E && a.push({
						indent: D,
						mode: x,
						doc: E
					});
				}
				break;
			}
			case Qe:
				s.push({
					indent: D,
					mode: x,
					doc: g.contents
				});
				break;
			case Je:
				s.length > 0 && a.push({
					indent: D,
					mode: x,
					doc: Ar
				});
				break;
			case ge:
				switch (x) {
					case Re:
						if (!g.hard) {
							g.soft || (l.write(" "), u += 1);
							break;
						}
						o = !0;
					case Ce:
						if (s.length > 0) {
							a.push({
								indent: D,
								mode: x,
								doc: g
							}, ...s.reverse()), s.length = 0;
							break;
						}
						g.literal ? (l.write(i), u = 0, D.root && (D.root.value && l.write(D.root.value), u = D.root.length)) : (l.trim(), l.write(i + D.value), u = D.length);
						break;
				}
				break;
			case Xe:
				a.push({
					indent: D,
					mode: x,
					doc: g.contents
				});
				break;
			case Se: break;
			default: throw new wt(g);
		}
		a.length === 0 && s.length > 0 && (a.push(...s.reverse()), s.length = 0);
	}
	let { text: f, positions: c } = l.finish();
	if (c.length !== 2) return { formatted: f };
	let [p, m] = c;
	return {
		formatted: f,
		cursorNodeStart: p,
		cursorNodeText: f.slice(p, m)
	};
}
function nE() {
	let e = globalThis, t = e.process?.platform;
	if (typeof t == "string") return t.startsWith("win");
	let r = e.Deno?.build?.os;
	return typeof r == "string" ? r === "windows" : e.navigator?.platform?.startsWith("Win") ?? !1;
}
function rh(e) {
	if (e = e instanceof URL ? e : new URL(e), e.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);
	return e;
}
function aE(e) {
	return e = rh(e), decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function uE(e) {
	e = rh(e);
	let t = decodeURIComponent(e.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
	return e.hostname !== "" && (t = `\\\\${e.hostname}${t}`), t;
}
function Qa(e) {
	return iE ? uE(e) : aE(e);
}
function ah(e, t) {
	if (!t) return;
	let r = nh(t).toLowerCase();
	return e.find(({ filenames: n }) => n?.some((i) => i.toLowerCase() === r)) ?? e.find(({ extensions: n }) => n?.some((i) => r.endsWith(i)));
}
function oE(e, t) {
	if (t) return e.find(({ name: r }) => r.toLowerCase() === t) ?? e.find(({ aliases: r }) => r?.includes(t)) ?? e.find(({ extensions: r }) => r?.includes(`.${t}`));
}
function uh(e, t) {
	if (t) {
		if (ih(t)) try {
			t = Qa(t);
		} catch {
			return;
		}
		if (typeof t == "string") return e.find(({ isSupported: r }) => r?.({ filepath: t }));
	}
}
function lE(e, t) {
	let r = th(0, e.plugins).flatMap((i) => i.languages ?? []);
	return (oE(r, t.language) ?? ah(r, t.physicalFile) ?? ah(r, t.file) ?? uh(r, t.physicalFile) ?? uh(r, t.file) ?? sE?.(r, t.physicalFile))?.parsers[0];
}
function cE(e) {
	return !!e?.[Jr];
}
function Lr(e) {
	let t = [], r = e.split(/([\t\n ]+)/);
	for (let [i, u] of r.entries()) {
		if (i % 2 === 1) {
			t.push({
				type: "whitespace",
				value: /\n/.test(u) ? `
` : " "
			});
			continue;
		}
		if ((i === 0 || i === r.length - 1) && u === "") continue;
		let a = u.split(new RegExp(`(${sh.source})`, "u"));
		for (let [o, s] of a.entries()) if (!((o === 0 || o === a.length - 1) && s === "")) {
			if (o % 2 === 0) {
				s !== "" && n({
					type: "word",
					value: s,
					kind: Kt,
					isCJ: !1,
					hasLeadingPunctuation: et.test(s[0]),
					hasTrailingPunctuation: et.test(J(0, s, -1))
				});
				continue;
			}
			if (et.test(s)) {
				n({
					type: "word",
					value: s,
					kind: Sr,
					isCJ: !0,
					hasLeadingPunctuation: !0,
					hasTrailingPunctuation: !0
				});
				continue;
			}
			if (pE.test(s)) {
				n({
					type: "word",
					value: s,
					kind: Ct,
					isCJ: !1,
					hasLeadingPunctuation: !1,
					hasTrailingPunctuation: !1
				});
				continue;
			}
			n({
				type: "word",
				value: s,
				kind: Me,
				isCJ: !0,
				hasLeadingPunctuation: !1,
				hasTrailingPunctuation: !1
			});
		}
	}
	return t;
	function n(i) {
		let u = J(0, t, -1);
		u?.type === "word" && !a(Kt, Sr) && [u.value, i.value].every((o) => !/\u3000/.test(o)) && t.push({
			type: "whitespace",
			value: ""
		}), t.push(i);
		function a(o, s) {
			return u.kind === o && i.kind === s || u.kind === s && i.kind === o;
		}
	}
}
function lt(e, t) {
	let r = t.originalText.slice(e.position.start.offset, e.position.end.offset);
	if (t.parser !== "mdx") {
		let u = e.children[0];
		u && (r = t.originalText.slice(e.position.start.offset, u.position.start.offset));
	}
	let { numberText: n, leadingSpaces: i } = r.match(/^\s*(?<numberText>\d+)(\.|\))(?<leadingSpaces>\s*)/).groups;
	return {
		number: Number(n),
		leadingSpaces: i
	};
}
function eu(e, t) {
	return !e.ordered || e.children.length < 2 || lt(e.children[1], t).number !== 1 ? !1 : lt(e.children[0], t).number !== 0 ? !0 : e.children.length > 2 && lt(e.children[2], t).number === 1;
}
function On(e, t) {
	let { value: r } = e;
	return e.position.end.offset === t.length && r.endsWith(`
`) && t.endsWith(`
`) ? r.slice(0, -1) : r;
}
function Ee(e, t) {
	return (function r(n, i, u) {
		let a = { ...t(n, i, u) };
		return a.children && (a.children = a.children.map((o, s) => r(o, s, [a, ...u]))), a;
	})(e, null, []);
}
function Nn(e) {
	if (e?.type !== "link" || e.children.length !== 1) return !1;
	let [t] = e.children;
	return pt(e) === pt(t) && ht(e) === ht(t);
}
function Ir(e) {
	let t;
	if (e.type === "html") t = e.value.match(/^<!--\s*prettier-ignore(?:-(start|end))?\s*-->$/);
	else {
		let r;
		e.type === "esComment" ? r = e : e.type === "paragraph" && e.children.length === 1 && e.children[0].type === "esComment" && (r = e.children[0]), r && (t = r.value.match(/^prettier-ignore(?:-(start|end))?$/));
	}
	return t ? t[1] || "next" : !1;
}
function qr(e, t) {
	return r(e, t, (n) => n.ordered === e.ordered);
	function r(n, i, u) {
		let a = -1;
		for (let o of i.children) if (o.type === n.type && u(o) ? a++ : a = -1, o === n) return a;
	}
}
function lh(e) {
	return e.index > 0 && Ir(e.previous) === "next";
}
function Qt(e) {
	let { start: t, end: r } = e.position;
	return t.line !== r.line;
}
function hE() {
	return (e) => Ee(e, (t, r, [n]) => t.type !== "html" || Tp.test(t.value) || Pn.has(n.type) ? t : {
		...t,
		type: "jsx"
	});
}
function tu(e) {
	let t = (0, dh.default)().use(Dh.default, {
		commonmark: !0,
		blocks: [Ap]
	}).use(hh.default).use(oh).use(mh.default).use(qp).use(fh).use(ch).use(ph);
	return t.run(t.parse(e));
}
function Eh(e) {
	return {
		astFormat: "mdast",
		hasPragma: Rn,
		hasIgnorePragma: Fh,
		locStart: pt,
		locEnd: ht,
		parse: e
	};
}
function xE(e, t) {
	let r = e.matchAll(new RegExp(`(?:${ve(t)})+`, "g"));
	return r.reduce || (r = [...r]), r.reduce((n, [i]) => Math.max(n, i.length), 0) / t.length;
}
function kE(e, t) {
	let { node: r } = e;
	switch (r.type) {
		case "code": {
			let { lang: n } = r;
			if (!n) return;
			let i;
			return n === "angular-ts" ? i = Ja(t, { language: "typescript" }) : n === "angular-html" ? i = "angular" : i = Ja(t, { language: n }), i ? async (u) => {
				let a = { parser: i };
				n === "ts" || n === "typescript" ? a.filepath = "dummy.ts" : n === "tsx" && (a.filepath = "dummy.tsx");
				let o = await u(t.parser === "mdx" ? On(r, t.originalText) : r.value, a), s = t.__inJsTemplate ? "~" : "`", l = s.repeat(Math.max(3, Mn(r.value, s) + 1));
				return vr([
					l,
					r.lang,
					r.meta ? " " + r.meta : "",
					Z,
					Ze(o),
					Z,
					l
				]);
			} : void 0;
		}
		case "import":
		case "export": return (n) => n(r.value, {
			__onHtmlBindingRoot: (i) => FE(i, r.type),
			parser: "babel"
		});
		case "jsx": return (n) => n(`<$>${r.value}</$>`, {
			parser: "__js_expression",
			rootMarker: "mdx"
		});
	}
	return null;
}
function FE(e, t) {
	let { program: { body: r } } = e;
	if (r.some((n) => !(n.type === "ImportDeclaration" || n.type === "ExportDefaultDeclaration" || n.type === "ExportNamedDeclaration"))) throw new Error(`Unexpected '${t}' in MDX.`);
}
function iu(e, t, r) {
	if ((e.type === "code" || e.type === "yaml" || e.type === "import" || e.type === "export" || e.type === "jsx") && delete t.value, e.type === "list" && delete t.isAligned, (e.type === "list" || e.type === "listItem") && delete t.spread, e.type === "text") return null;
	if (e.type === "inlineCode" && (t.value = X(0, e.value, `
`, " ")), (e.type === "definition" || e.type === "linkReference" || e.type === "imageReference") && (t.label = (0, nu.default)(e.label)), e.type === "imageReference" && e.referenceType === "collapsed" && (t.alt = (0, nu.default)(e.alt)), (e.type === "link" || e.type === "image") && e.url && e.url.includes("(")) for (let n of "<>") t.url = X(0, e.url, n, encodeURIComponent(n));
	if ((e.type === "definition" || e.type === "link" || e.type === "image") && e.title && (t.title = X(0, e.title, /\\(?=["')])/g, "")), r?.type === "root" && r.children.length > 0 && (r.children[0] === e || Xa(r.children[0]) && r.children[1] === e) && e.type === "html" && Rn(e.value)) return null;
}
function au(e, t) {
	let r = t.originalText.slice(e.node.position.start.offset, e.node.position.end.offset);
	return t.parser === "mdx" ? r : e.node.type === "list" && e.findAncestor((n) => n.type === "blockquote") && t.proseWrap !== "always" ? r.replace(/\n>\s*$/, "") : r;
}
function EE(e, t) {
	let r = e.match(new RegExp(`(${ve(t)})+`, "g"));
	if (r === null) return 1;
	let n = /* @__PURE__ */ new Map(), i = 0;
	for (let u of r) {
		let a = u.length / t.length;
		n.set(a, !0), a > i && (i = a);
	}
	for (let u = 1; u < i; u++) if (!n.get(u)) return u;
	return i + 1;
}
function Ah(e, t) {
	let { preferred: r, alternate: n } = t === !0 || t === "'" ? wE : CE, { length: i } = e, u = 0, a = 0;
	for (let o = 0; o < i; o++) {
		let s = e.charCodeAt(o);
		s === r.codePoint ? u++ : s === n.codePoint && a++;
	}
	return (u > a ? n : r).character;
}
function ae(e, t, r, n = {}) {
	let { processor: i = r } = n, u = [];
	return e.each(() => {
		let a = i(e);
		a !== !1 && (u.length > 0 && yE(e) && (u.push(Z), AE(e, t) && u.push(Z)), u.push(a));
	}, "children"), u;
}
function yE({ node: e, parent: t }) {
	let r = Za.has(e.type), n = e.type === "html" && Pn.has(t.type);
	return !r && !n;
}
function AE(e, t) {
	let { node: r, previous: n, parent: i } = e;
	if (t.parser === "mdx") {
		if (Sh(n, t) || r.type === "list" && i.type === "listItem" && (n.type === "code" || n.type === "paragraph") && n.position.end.line + 1 < r.position.start.line) return !0;
	} else {
		if (Qt(r) && r.position.start.line < n.position.end.line) return !1;
		if (TE(e) || r.type === "list" && i.type === "listItem" && (n.type === "code" || n.type === "paragraph") && n.position.end.line + 1 < r.position.start.line) return !0;
	}
	let a = n.type === r.type && vE.has(r.type), o;
	t.parser === "mdx" ? o = i.type === "listItem" && (r.type === "list" || !Sh(i, t)) : o = i.type === "listItem" && (r.type === "list" || !e.callParent(Lh));
	let s = Ir(n) === "next", l = r.type === "html" && n.type === "html" && n.position.end.line + 1 === r.position.start.line, f = t.parser !== "mdx" && r.type === "html" && n.type === "paragraph" && n.position.end.line + 1 === r.position.start.line, c = r.type === "html" && i.type === "listItem" && n.type === "paragraph" && n.position.end.line + 1 === r.position.start.line;
	return !(a || o || s || l || f || c);
}
function Sh(e, t) {
	return e.type === "listItem" && (e.spread || t.originalText.charAt(e.position.end.offset - 1) === `
`);
}
function Lh({ node: e, parent: t, next: r }) {
	return e.type === "listItem" && (e.spread || t.type === "list" && r?.type === "listItem" && e.position.end.line + 1 < r.position.start.line);
}
function TE(e) {
	return e.index === 0 ? !1 : Lh({
		node: e.previous,
		parent: e.parent,
		next: e.node
	});
}
function SE(e, t, r) {
	return ["#".repeat(e.node.depth) + " ", ae(e, t, r)];
}
function LE(e, t, r) {
	let { originalText: n } = t, { node: i } = e, u = i.position.end.offset, a = n.lastIndexOf(`
`, u - 1) + 1, o = n.slice(a, u), s = Math.max(o.indexOf("="), o.indexOf("-")), l = o.slice(s);
	return [
		ae(e, t, r),
		Z,
		l
	];
}
function Ih(e, t, r) {
	return t.parser !== "mdx" && Qt(e.node) ? LE(e, t, r) : SE(e, t, r);
}
function _h(e, t, r) {
	let { node: n } = e, i = qr(n, e.parent), u = eu(n, t), a = IE(e);
	return ae(e, t, r, { processor() {
		let o = l(), { node: s } = e;
		if (s.children.length === 2 && s.children[1].type === "html" && s.children[0].position.start.column !== s.children[1].position.start.column) return [o, qh(e, t, r, o)];
		return [o, we(" ".repeat(o.length), qh(e, t, r, o))];
		function l() {
			let f = n.ordered ? (e.isFirst ? n.start : u ? 1 : n.start + e.index) + (i % 2 === 0 ? ". " : ") ") : i % 2 === 0 ? "- " : "* ", c = n.isAligned && n.ordered ? Oh(f, t) : f;
			if (c.length >= a) return c;
			c = c.trimEnd();
			let p = Math.min(a - c.length, 4);
			p > 0 && (c += " ".repeat(p));
			let m = Math.min(a - c.length, 3);
			return m > 0 && (c = " ".repeat(m) + c), c;
		}
	} });
}
function qh(e, t, r, n) {
	let { node: i } = e, u = i.checked === null ? "" : i.checked ? "[x] " : "[ ] ";
	return [u, ae(e, t, r, { processor({ node: a, isFirst: o }) {
		if (o && a.type !== "list" || a.type === "code" && a.isIndented) return we(" ".repeat(u.length), r());
		let s = " ".repeat(Nh(t.tabWidth - n.length, 0, 3));
		return [s, we(s, r())];
	} })];
}
function IE(e) {
	let { node: t, next: r } = e;
	return t.checked === null || !(r?.type === "code" && r.isIndented) ? 0 : 4 + [.../^[ \t]*/.exec(r.value)?.[0] ?? ""].reduce((i, u) => i + (u === "	" ? 4 : 1), 0) + 1;
}
function Ph(e, t, r) {
	let { node: n } = e, i = qr(n, e.parent), u = eu(n, t);
	return ae(e, t, r, { processor() {
		let a = s(), { node: o } = e;
		if (o.children.length === 2 && o.children[1].type === "html" && o.children[0].position.start.column !== o.children[1].position.start.column) return [a, Bh(e, t, r, a)];
		return [a, we(" ".repeat(a.length), Bh(e, t, r, a))];
		function s() {
			let l = n.ordered ? (e.isFirst ? n.start : u ? 1 : n.start + e.index) + (i % 2 === 0 ? ". " : ") ") : i % 2 === 0 ? "- " : "* ";
			return (n.isAligned || n.hasIndentedCodeblock) && n.ordered ? Oh(l, t) : l;
		}
	} });
}
function Bh(e, t, r, n) {
	let { node: i } = e, u = i.checked === null ? "" : i.checked ? "[x] " : "[ ] ";
	return [u, ae(e, t, r, { processor({ node: a, isFirst: o }) {
		if (o && a.type !== "list") return we(" ".repeat(u.length), r());
		let s = " ".repeat(Nh(t.tabWidth - n.length, 0, 3));
		return [s, we(s, r())];
	} })];
}
function Oh(e, t) {
	let r = n();
	return e + " ".repeat(r >= 4 ? 0 : r);
	function n() {
		let i = e.length % t.tabWidth;
		return i === 0 ? 0 : t.tabWidth - i;
	}
}
function Nh(e, t, r) {
	return Math.max(t, Math.min(e, r));
}
function Rh(e, t, r) {
	return qE(e.map(r, "children"));
}
function qE(e) {
	let t = [""];
	return (function r(n) {
		for (let i of n) {
			let u = me(i);
			if (u === de) {
				r(i);
				continue;
			}
			let a = i, o = [];
			u === Fe && ([a, ...o] = i.parts), t.push([t.pop(), a], ...o);
		}
	})(e), Yt(t);
}
function Mh(e, t) {
	let r = [""];
	return e.each(() => {
		let { node: n } = e, i = t();
		switch (n.type) {
			case "whitespace": if (me(i) !== De) {
				r.push(i, "");
				break;
			}
			default: r.push([r.pop(), i]);
		}
	}, "children"), Yt(r);
}
function zh(e, t, r) {
	let { node: n } = e, i = [], u = e.map(() => e.map(({ index: c }) => {
		let p = eh(r(), t).formatted, m = Tr(p);
		return i[c] = Math.max(i[c] ?? 3, m), {
			text: p,
			width: m
		};
	}, "children"), "children"), a = s(!1);
	if (t.proseWrap !== "never") return [Wt, a];
	return [Wt, $t(zp(s(!0), a))];
	function s(c) {
		return Sn(Ar, [
			f(u[0], c),
			l(c),
			...u.slice(1).map((p) => f(p, c))
		].map((p) => `| ${p.join(" | ")} |`));
	}
	function l(c) {
		return i.map((p, m) => {
			if (t.parser !== "mdx" && m >= u[0].length) return null;
			let D = n.align[m], x = D === "center" || D === "left" ? ":" : "-", g = D === "center" || D === "right" ? ":" : "-";
			return `${x}${c ? "-" : "-".repeat(p - 2)}${g}`;
		}).filter((p) => p !== null);
	}
	function f(c, p) {
		return c.map(({ text: m, width: D }, x) => {
			if (p) return m;
			let g = i[x] - D, k = n.align[x], E = 0;
			k === "right" ? E = g : k === "center" && (E = Math.floor(g / 2));
			let w = g - E;
			return `${" ".repeat(E)}${m}${" ".repeat(w)}`;
		});
	}
}
function _E({ parent: e }) {
	if (e.usesCJSpaces === void 0) {
		let t = {
			" ": 0,
			"": 0
		}, { children: r } = e;
		for (let n = 1; n < r.length - 1; ++n) {
			let i = r[n];
			if (i.type === "whitespace" && (i.value === " " || i.value === "")) {
				let u = r[n - 1].kind, a = r[n + 1].kind;
				(u === Me && a === Kt || u === Kt && a === Me) && ++t[i.value];
			}
		}
		e.usesCJSpaces = t[" "] > t[""];
	}
	return e.usesCJSpaces;
}
function PE(e, t) {
	if (t) return !0;
	let { previous: r, next: n } = e;
	if (!r || !n) return !0;
	let i = r.kind, u = n.kind;
	return Hh(i) && Hh(u) || i === Ct && u === Me || u === Ct && i === Me ? !0 : i === Sr || u === Sr || i === Me && u === Me ? !1 : Uh.has(n.value[0]) || Uh.has(J(0, r.value, -1)) ? !0 : r.hasTrailingPunctuation || n.hasLeadingPunctuation ? !1 : _E(e);
}
function Hh(e) {
	return e === Kt || e === Ct;
}
function OE(e, t, r, n, i) {
	if (r !== "always" || e.hasAncestor((o) => BE.has(o.type) || o.type === "heading" && (i.parser === "mdx" || !Qt(o)))) return !1;
	if (n) return t !== "";
	let { previous: u, next: a } = e;
	return !u || !a ? !0 : t === "" ? !1 : u.kind === Ct && a.kind === Me || a.kind === Ct && u.kind === Me ? !0 : !(u.isCJ || a.isCJ);
}
function ou(e, t, r, n, i) {
	if (r === "preserve" && t === `
`) return Z;
	let u = t === " " || t === `
` && PE(e, n);
	return OE(e, t, r, n, i) ? u ? In : qn : u ? " " : "";
}
function Vh(e, t) {
	let { node: r } = e, n = e.findAncestor((u) => u.type === "emphasis" || u.type === "strong"), i = r.value;
	return n ? (e.isFirst && (i.startsWith("*") || i.startsWith("_")) && e.callParent(() => e.isFirst) && e.grandparent === n && (i = `\\${i}`), i = X(0, i, /(\\+|^|.)(\*+|_+)($|.)/g, (u, a, o, s) => [...a].every((l) => l === "\\") && a.length % 2 === 1 ? u : RE(J(0, a, -1) || J(1, e.previous?.value, -1), o, s[0] || e.next?.value[0]) ? `${a}\\${o}${s}` : u), i) : t.proseWrap === "preserve" && e.parent.type === "sentence" && NE.test(i) && Jt(e.previous) && (e.isLast || Jt(e.next)) ? `\\${i}` : i;
}
function RE(e, t, r) {
	if (!e || !r) return null;
	let n = /[\p{Space_Separator}\t\n\f\r]/u.test(r), i = /[\p{Space_Separator}\t\n\f\r]/u.test(e), u = et.test(r), a = et.test(e), o = !n && (!u || u && (i || a)), s = !i && (!a || a && (n || u));
	return t[0] === "*" ? o || s : o ? !s || a : s ? !o || u : !1;
}
function Gh(e) {
	let { node: t } = e, r = X(0, X(0, t.value, "*", "\\*"), new RegExp([`(^|${et.source})(_+)`, `(_+)(${et.source}|$)`].join("|"), "gu"), (u, a, o, s, l) => X(0, o ? `${a}${o}` : `${s}${l}`, "_", "\\_")), n = (u, a, o) => u.type === "sentence" && o === 0, i = (u, a, o) => Nn(u.children[o - 1]);
	return r !== t.value && (e.match(void 0, n, i) || e.match(void 0, n, (u, a, o) => u.type === "emphasis" && o === 0, i)) && (r = r.replace(/^(\\?[*_])+/, (u) => X(0, u, "\\", ""))), r;
}
function jh(e) {
	let { previous: t, next: r } = e;
	return t?.type === "sentence" && J(0, t.children, -1)?.type === "word" && !J(0, t.children, -1).hasTrailingPunctuation && !/[\p{Space_Separator}\t\n\f\r]$/u.test(J(0, t.children, -1).value) || r?.type === "sentence" && r.children[0]?.type === "word" && !r.children[0].hasLeadingPunctuation && !/^[\p{Space_Separator}\t\n\f\r]/u.test(r.children[0].value);
}
function ME(e) {
	let { siblings: t, index: r } = e;
	if (!t || typeof r != "number") return !1;
	let n = t[r + 2];
	return n?.type === "whitespace" && n.value === "";
}
function zE(e) {
	if (!Jt(e.node) || e.next?.value !== "-") return !1;
	let t = e.siblings[e.index + 2];
	return !t || Jt(t);
}
function lu(e, t, r) {
	let { node: n } = e;
	if (HE(e)) {
		let i = [""], u = Lr(t.originalText.slice(n.position.start.offset, n.position.end.offset));
		for (let a of u) {
			if (a.type === "word") {
				i.push([i.pop(), a.value]);
				continue;
			}
			let o = ou(e, a.value, t.proseWrap, !0, t);
			if (me(o) === De) {
				i.push([i.pop(), o]);
				continue;
			}
			i.push(o, "");
		}
		return Yt(i);
	}
	switch (n.type) {
		case "root": return n.children.length === 0 ? "" : [UE(e, t, r), Z];
		case "paragraph": return Rh(e, t, r);
		case "sentence": return Mh(e, r);
		case "word": return t.parser !== "mdx" ? Vh(e, t) : Gh(e);
		case "whitespace": {
			let { next: i } = e, u = i && /^>|^(?:[*+-]|#{1,6}|\d+[).])$/.test(i.value) && !ME(e) && !(t.proseWrap === "preserve" && zE(e)) ? "never" : t.proseWrap;
			return ou(e, n.value, u, !1, t);
		}
		case "emphasis": {
			let i;
			if (Nn(n.children[0])) i = t.originalText[n.position.start.offset];
			else {
				let u = jh(e), a = e.callParent(({ node: o }) => o.type === "strong" && jh(e));
				i = u || a || e.hasAncestor((o) => o.type === "emphasis") ? "*" : "_";
			}
			return [
				i,
				ae(e, t, r),
				i
			];
		}
		case "strong": return [
			"**",
			ae(e, t, r),
			"**"
		];
		case "delete": return [
			"~~",
			ae(e, t, r),
			"~~"
		];
		case "inlineCode": {
			let i = t.proseWrap === "preserve" ? n.value : X(0, n.value, `
`, " ");
			t.parser !== "mdx" && e.hasAncestor((s) => s.type === "tableCell") && (i = X(0, i, "|", "\\|"));
			let u = Ch(i, "`"), a = "`".repeat(u), o = i.startsWith("`") || i.endsWith("`") || /^[\n ]/.test(i) && /[\n ]$/.test(i) && /[^\n ]/.test(i) ? " " : "";
			return [
				a,
				o,
				i,
				o,
				a
			];
		}
		case "wikiLink": {
			let i;
			return t.proseWrap === "preserve" ? i = n.value : i = X(0, n.value, /[\t\n]+/g, " "), [
				"[[",
				i,
				"]]"
			];
		}
		case "link": switch (t.originalText[n.position.start.offset]) {
			case "<": {
				let i = "mailto:";
				return [
					"<",
					n.url.startsWith(i) && t.originalText.slice(n.position.start.offset + 1, n.position.start.offset + 1 + 7) !== i ? n.url.slice(7) : n.url,
					">"
				];
			}
			case "[": return [
				"[",
				ae(e, t, r),
				"](",
				su(n.url, ")"),
				Un(n.title, t),
				")"
			];
			default: return t.originalText.slice(n.position.start.offset, n.position.end.offset);
		}
		case "image": return [
			"![",
			$h(n, t),
			"](",
			su(n.url, ")"),
			Un(n.title, t),
			")"
		];
		case "blockquote": return ["> ", we("> ", ae(e, t, r))];
		case "heading": return Ih(e, t, r);
		case "code": {
			if (n.isIndented) {
				let a = " ".repeat(4);
				return we(a, [a, Ze(n.value, Z)]);
			}
			let i = t.__inJsTemplate ? "~" : "`", u = i.repeat(Math.max(3, Mn(n.value, i) + 1));
			return [
				u,
				n.lang || "",
				n.meta ? " " + n.meta : "",
				Z,
				Ze(t.parser === "mdx" ? On(n, t.originalText) : n.value, Z),
				Z,
				u
			];
		}
		case "html": {
			let { parent: i, isLast: u } = e, a = i.type === "root" && u ? n.value.trimEnd() : n.value;
			return Ze(a, /^<!--.*-->$/s.test(a) ? Z : vr(Cr));
		}
		case "list": return t.parser === "mdx" ? Ph(e, t, r) : _h(e, t, r);
		case "thematicBreak": {
			let { ancestors: i } = e, u = i.findIndex((o) => o.type === "list");
			return u === -1 ? "---" : qr(i[u], i[u + 1]) % 2 === 0 ? "***" : "---";
		}
		case "linkReference": return [
			"[",
			ae(e, t, r),
			"]",
			n.referenceType === "full" ? zn(n) : n.referenceType === "collapsed" ? "[]" : ""
		];
		case "imageReference": {
			let i = $h(n, t);
			return n.referenceType === "full" ? [
				"![",
				i,
				"]",
				zn(n)
			] : [...t.parser === "mdx" ? [
				"![",
				i,
				"]"
			] : ["!", zn(n)], n.referenceType === "collapsed" ? "[]" : ""];
		}
		case "definition": {
			let i = t.proseWrap === "always" ? In : " ";
			return $t([
				zn(n),
				":",
				yr([
					i,
					t.parser !== "mdx" && n.url === "" ? "<>" : su(n.url),
					n.title === null ? "" : [i, Un(n.title, t, !1)]
				])
			]);
		}
		case "footnote": return [
			"[^",
			ae(e, t, r),
			"]"
		];
		case "footnoteReference": return Yh(n);
		case "footnoteDefinition": {
			let i = n.children.length === 1 && n.children[0].type === "paragraph" && (t.proseWrap === "never" || t.proseWrap === "preserve" && n.children[0].position.start.line === n.children[0].position.end.line);
			return [
				Yh(n),
				": ",
				i ? ae(e, t, r) : $t([we(" ".repeat(4), ae(e, t, r, { processor: ({ isFirst: u }) => u ? $t([qn, r()]) : r() }))])
			];
		}
		case "table": return zh(e, t, r);
		case "tableCell": return ae(e, t, r);
		case "break": return /\s/.test(t.originalText[n.position.start.offset]) ? ["  ", vr(Cr)] : ["\\", Z];
		case "liquidNode": return Ze(n.value, Z);
		case "import":
		case "export":
		case "jsx": return n.value.trimEnd();
		case "esComment": return [
			"{/* ",
			n.value,
			" */}"
		];
		case "math": return [
			"$$",
			n.meta ? " " + n.meta : "",
			Z,
			n.value ? [Ze(n.value, Z), Z] : "",
			"$$"
		];
		case "inlineMath": return t.originalText.slice(pt(n), ht(n));
		case "text": return Ze(n.value, Z);
		default: throw new Th(n, "Markdown");
	}
}
function UE(e, t, r) {
	let n = [], i = null, { children: u } = e.node;
	for (let [a, o] of u.entries()) switch (Ir(o)) {
		case "start":
			i === null && (i = {
				index: a,
				offset: o.position.end.offset
			});
			break;
		case "end":
			i !== null && (n.push({
				start: i,
				end: {
					index: a,
					offset: o.position.start.offset
				}
			}), i = null);
			break;
		default: break;
	}
	return ae(e, t, r, { processor({ index: a }) {
		if (n.length > 0) {
			let o = n[0];
			if (a === o.start.index) return [
				Wh(u[o.start.index]),
				t.originalText.slice(o.start.offset, o.end.offset),
				Wh(u[o.end.index])
			];
			if (o.start.index < a && a < o.end.index) return !1;
			if (a === o.end.index) return n.shift(), !1;
		}
		return r();
	} });
}
function Wh(e) {
	if (e.type === "html") return e.value;
	if (e.type === "paragraph" && Array.isArray(e.children) && e.children.length === 1 && e.children[0].type === "esComment") return [
		"{/* ",
		e.children[0].value,
		" */}"
	];
}
function HE(e) {
	let t = e.findAncestor((r) => r.type === "linkReference" || r.type === "imageReference");
	return t && (t.type !== "linkReference" || t.referenceType !== "full");
}
function su(e, t = []) {
	let r = [" ", ...Array.isArray(t) ? t : [t]];
	return new RegExp(r.map((n) => ve(n)).join("|")).test(e) ? `<${VE(e, "<>")}>` : e;
}
function Un(e, t, r = !0) {
	if (!e) return "";
	if (r) return " " + Un(e, t, !1);
	if (t.parser === "mdx" && (e = X(0, e, /\\(?=["')])/g, "")), e.includes("\"") && e.includes("'") && !e.includes(")")) return `(${e})`;
	let n = Ah(e, t.singleQuote);
	return e = X(0, e, "\\", "\\\\"), e = X(0, e, n, `\\${n}`), `${n}${e}${n}`;
}
function zn(e, t) {
	let r = (0, Kh.default)(e.label);
	return t?.parser === "mdx" ? `[${r}]` : `[${X(0, r, /[\\[\]]/g, (i) => `\\${i}`)}]`;
}
function Yh(e) {
	return `[^${e.label}]`;
}
function $h(e, t) {
	return t.parser !== "mdx" && e.originalAltText ? e.originalAltText : e.alt || "";
}
function $E(e, t) {
	return t.parser === "mdx" ? e = KE(e, t) : e = QE(e, t), e = XE(e), t.parser === "mdx" ? e = nw(e, t) : e = rw(e, t), t.parser !== "mdx" && (e = iw(e, t)), t.parser === "mdx" ? e = uw(e, t) : e = aw(e, t), t.parser === "mdx" ? e = ZE(e) : e = ew(e), e;
}
function KE(e, t) {
	return Ee(e, (r) => {
		if (r.type !== "text") return r;
		let { value: n } = r;
		if (n === "*" || n === "_" || !WE.test(n) || r.position.end.offset - r.position.start.offset === n.length) return r;
		let i = t.originalText.slice(r.position.start.offset, r.position.end.offset);
		return YE.test(i) ? r : {
			...r,
			value: i
		};
	});
}
function QE(e, t) {
	return Ee(e, (r) => (r.type === "text" && (r.raw = t.originalText.slice(r.position.start.offset, r.position.end.offset)), r));
}
function JE(e, t, r) {
	return Ee(e, (n) => {
		if (!n.children) return n;
		let i = [], u, a;
		for (let o of n.children) u && t(u, o) ? (o = r(u, o), i.splice(-1, 1, o), a || (a = !0)) : i.push(o), u = o;
		return a ? {
			...n,
			children: i
		} : n;
	});
}
function XE(e) {
	return JE(e, (t, r) => t.type === "text" && r.type === "text", (t, r) => ({
		type: "text",
		value: t.value + r.value,
		position: {
			start: t.position.start,
			end: r.position.end
		}
	}));
}
function ZE(e) {
	return Ee(e, (t, r, [n]) => {
		if (t.type !== "text") return t;
		let { value: i } = t;
		return n.type === "paragraph" && (r === 0 && (i = Br.trimStart(i)), r === n.children.length - 1 && (i = Br.trimEnd(i))), {
			type: "sentence",
			position: t.position,
			children: Lr(i)
		};
	});
}
function ew(e) {
	let t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	return n(e, (u, a) => {
		if (u.type === "wikiLink") {
			i(a);
			return;
		}
		if (u.type === "text") {
			if (u.raw.includes("[[")) for (let o of a) o.type === "paragraph" && t.add(o);
			u.raw.includes("]]") && i(a);
		}
	}), Ee(e, (u, a, o) => {
		if (u.type !== "text") return u;
		let s = u.raw, l = o.findIndex((c) => c?.type === "paragraph"), f = l === -1 ? void 0 : o[l];
		if (f) {
			o.slice(l + 1).some((p) => p?.type === "blockquote") && (s = tw(s, u));
			let c = o[0];
			c?.type === "paragraph" && (a === 0 && (s = Br.trimStart(s)), a === c.children.length - 1 && (s = Br.trimEnd(s)));
		}
		return f && r.has(f.position) ? {
			type: "text",
			position: u.position,
			value: s
		} : {
			type: "sentence",
			position: u.position,
			children: Lr(s)
		};
	});
	function n(u, a) {
		return (function o(s, l) {
			if (a(s, l), s.children) for (let f of s.children) o(f, [s, ...l]);
		})(u, []);
	}
	function i(u) {
		for (let a of u) a.type === "paragraph" && t.has(a) && r.add(a.position);
	}
}
function tw(e, t) {
	let r = /^([ \t]*>[ \t]*)*/, n = e.split(`
`), i = t.value.split(`
`);
	return n.map((a, o) => {
		let l = (i[o] ?? "").match(r)[0] ?? "";
		return a.replace(r, l);
	}).join(`
`);
}
function rw(e, t) {
	return Ee(e, (r) => {
		if (r.type !== "code") return r;
		return r.isIndented = /^\n?(?: {4,}|\t)/.test(t.originalText.slice(r.position.start.offset, r.position.end.offset)), r;
	});
}
function nw(e, t) {
	return Ee(e, (r, n, i) => {
		if (r.type === "code") {
			let u = /^\n?(?: {4,}|\t)/.test(t.originalText.slice(r.position.start.offset, r.position.end.offset));
			if (r.isIndented = u, u) for (let a = 0; a < i.length; a++) {
				let o = i[a];
				if (o.hasIndentedCodeblock) break;
				o.type === "list" && (o.hasIndentedCodeblock = !0);
			}
		}
		return r;
	});
}
function iw(e, t) {
	let { originalText: r } = t;
	return Ee(e, (n) => {
		if (n.type === "image" || n.type === "imageReference") return n.originalAltText = Jh(r, n.position.start.offset, n.position.end.offset), n;
		if (n.type !== "link" || !n.url) return n;
		let i = Jh(r, n.position.start.offset, n.position.end.offset);
		return i && /[[\]]/.test(i) && (n.originalLabelText = i), n;
	});
}
function Jh(e, t, r) {
	let n = e.indexOf("[", t);
	if (n === -1 || n >= r) return null;
	let i = 1, u = n + 1;
	for (; u < r;) {
		let a = e[u];
		if (a === "\\") {
			u += 2;
			continue;
		}
		if (a === "[") i++;
		else if (a === "]" && (i--, i === 0)) return e.slice(n + 1, u);
		u++;
	}
	return null;
}
function aw(e, t) {
	return Ee(e, (i, u, a) => {
		if (i.type === "list" && i.children.length > 0) {
			for (let s = 0; s < a.length; s++) {
				let l = a[s];
				if (l.type === "list" && !l.isAligned) return i.isAligned = !1, i;
			}
			let o = a[0]?.children[u + 1];
			if (o?.type === "code" && o.isIndented) return i.isAligned = !1, i;
			i.isAligned = n(i);
		}
		return i;
	});
	function r(i) {
		return i.children.length === 0 ? -1 : i.children[0].position.start.column - 1;
	}
	function n(i) {
		if (!i.ordered) return !0;
		let [u, a] = i.children;
		if (lt(u, t).leadingSpaces.length > 1) return !0;
		let s = r(u);
		if (s === -1) return !1;
		if (i.children.length === 1) return s % t.tabWidth === 0;
		return s !== r(a) ? !1 : s % t.tabWidth === 0 ? !0 : lt(a, t).leadingSpaces.length > 1;
	}
}
function uw(e, t) {
	return Ee(e, (i, u, a) => {
		if (i.type === "list" && i.children.length > 0) {
			for (let o = 0; o < a.length; o++) {
				let s = a[o];
				if (s.type === "list" && !s.isAligned) return i.isAligned = !1, i;
			}
			i.isAligned = n(i);
		}
		return i;
	});
	function r(i) {
		return i.children.length === 0 ? -1 : i.children[0].position.start.column - 1;
	}
	function n(i) {
		if (!i.ordered) return !0;
		let [u, a] = i.children;
		if (lt(u, t).leadingSpaces.length > 1) return !0;
		let s = r(u);
		if (s === -1) return !1;
		if (i.children.length === 1) return s % t.tabWidth === 0;
		return s !== r(a) ? !1 : s % t.tabWidth === 0 ? !0 : lt(a, t).leadingSpaces.length > 1;
	}
}
function Pr(e) {
	if (_r !== null && typeof _r.property) {
		let t = _r;
		return _r = Pr.prototype = null, t;
	}
	return _r = Pr.prototype = e ?? Object.create(null), new Pr();
}
function fu(e) {
	return Pr(e);
}
function sw(e, t = "type") {
	fu(e);
	function r(n) {
		let i = n[t], u = e[i];
		if (!Array.isArray(u)) throw Object.assign(/* @__PURE__ */ new Error(`Missing visitor keys for '${i}'.`), { node: n });
		return u;
	}
	return r;
}
var cm, Vn, fm, pm, hm, mm, q, Or, Dm, At, wo, Ri, Lo, Po, No, Ft, Mo, Ho, Go, Wo, $o, Ko, Qo, bt, Zo, Nt, rs, ns, us, pr, Es, ys, Ts, Ls, $i, Bs, Os, Rs, Hs, Gs, Ws, Ks, Js, cn, Ji, rl, al, Et, pn, fl, ml, gl, ra, El, Tl, ql, oa, Rl, Oe, mn, sa, $l, Jl, ec, rc, uc, pa, pc, mc, gc, Ec, vc, Lc, Bc, wa, Uc, Gc, Wc, Qc, Xc, ef, uf, sf, hf, Df, xf, Ff, wf, yf, Sf, Bf, Pf, qa, jf, Yf, Kf, ep, ip, op, sp, cp, hp, Dp, gp, vp, rm, xu, Gn, ku, ru, pt, ht, gm, Wn, km, Eu, K, Q, wu, tr, Cu, yu, Dt, Ie, vu, Tu, Au, rr, Yn, qe, Mr, zr, Ur, Lu, Hr, nr, Om, $n, Vr, Kn, Vm, Qn, Ym, Jn, Xn, Iu, Zn, ei, Zm, eD, ti, gt, uD, oD, sD, ri, ni, ar, xt, pe, kD, FD, $r, qu, Bu, _u, Pu, ii, LD, ID, qD, BD, _D, PD, OD, ND, RD, Mu, UD, Gu, jD, Wu, fi, Yu, WD, $u, Ku, Qu, YD, Ju, Xu, Ve, _e, kt, rd, Kr, hd, uo, ao, qt, Bt, J, Ed, X, Cd, ur, co, Jr, or, Ge, _t, fo, po, Ei, ho, M, Bi, se, xg, sr, Fg, hh, mh, Dh, dh, Lb, Ib, Ap, Tp, qb, Bb, Sp, Lp, Ua, Ip, qp, De, de, st, Ae, Te, $e, ke, Fe, be, Ke, Qe, Je, ge, Xe, Se, Tn, me, Pb, Ha, wt, _p, Pp, Le, Ln, Rp, Mp, Wt, In, qn, Ar, Z, Cr, zb, Ub, Hb, Vb, jb, Hp, Vp, Gp, jp, Wp, Yp, Va, Ga, $p, Wb, Yb, ja, Wa, Kb, Kp, Qb, Tr, Xb, Zb, Ya, $a, Zp, Ce, Re, Ka, tE, th, iE, nh, ih, sE, Ja, Xa, fE, oh, sh, et, Za, Pn, Kt, Me, Ct, Sr, pE, Jt, ch, mE, fh, DE, ph, gh, xh, kh, Rn, Fh, bh, dE, gE, pu, Mn, wh, nu, bE, Kh, Ch, yh, vh, wE, CE, uu, Th, vE, BE, Uh, NE, VE, cu, Br, WE, YE, Xh, _r, ow, Zh, le, cw;
//#endregion
__esmMin((() => {
	cm = Object.create;
	Vn = Object.defineProperty;
	fm = Object.getOwnPropertyDescriptor;
	pm = Object.getOwnPropertyNames;
	hm = Object.getPrototypeOf;
	mm = Object.prototype.hasOwnProperty;
	q = (e, t) => () => {
		try {
			return t || e((t = { exports: {} }).exports, t), t.exports;
		} catch (r) {
			throw t = 0, r;
		}
	};
	Or = (e, t) => {
		for (var r in t) Vn(e, r, {
			get: t[r],
			enumerable: !0
		});
	};
	Dm = (e, t, r, n) => {
		if (t && typeof t == "object" || typeof t == "function") for (let i of pm(t)) !mm.call(e, i) && i !== r && Vn(e, i, {
			get: () => t[i],
			enumerable: !(n = fm(t, i)) || n.enumerable
		});
		return e;
	};
	At = (e, t, r) => (r = e != null ? cm(hm(e)) : {}, Dm(t || !e || !e.__esModule ? Vn(r, "default", {
		value: e,
		enumerable: !0
	}) : r, e));
	wo = q((g8, Eo) => {
		"use strict";
		Eo.exports = vg;
		var lr = 9, en = 10, Pt = 32, Eg = 33, wg = 58, Ot = 91, Cg = 92, Pi = 93, cr = 94, tn = 96, rn = 4, yg = 1024;
		function vg(e) {
			var t = this.Parser, r = this.Compiler;
			Ag(t) && Sg(t, e), Tg(r) && Lg(r);
		}
		function Ag(e) {
			return !!(e && e.prototype && e.prototype.blockTokenizers);
		}
		function Tg(e) {
			return !!(e && e.prototype && e.prototype.visitors);
		}
		function Sg(e, t) {
			for (var r = t || {}, n = e.prototype, i = n.blockTokenizers, u = n.inlineTokenizers, a = n.blockMethods, o = n.inlineMethods, s = i.definition, l = u.reference, f = [], c = -1, p = a.length, m; ++c < p;) m = a[c], !(m === "newline" || m === "indentedCode" || m === "paragraph" || m === "footnoteDefinition") && f.push([m]);
			f.push(["footnoteDefinition"]), r.inlineNotes && (Oi(o, "reference", "inlineNote"), u.inlineNote = g), Oi(a, "definition", "footnoteDefinition"), Oi(o, "reference", "footnoteCall"), i.definition = E, i.footnoteDefinition = D, u.footnoteCall = x, u.reference = k, n.interruptFootnoteDefinition = f, k.locator = l.locator, x.locator = w, g.locator = T;
			function D(y, d, v) {
				for (var L = this, C = L.interruptFootnoteDefinition, b = L.offset, _ = d.length + 1, I = 0, S = [], R, O, z, N, j, ne, h, W, ie, F, ee, ce, te; I < _ && (N = d.charCodeAt(I), !(N !== lr && N !== Pt));) I++;
				if (d.charCodeAt(I++) === Ot && d.charCodeAt(I++) === cr) {
					for (O = I; I < _;) {
						if (N = d.charCodeAt(I), N !== N || N === en || N === lr || N === Pt) return;
						if (N === Pi) {
							z = I, I++;
							break;
						}
						I++;
					}
					if (!(z === void 0 || O === z || d.charCodeAt(I++) !== wg)) {
						if (v) return !0;
						for (R = d.slice(O, z), j = y.now(), ie = 0, F = 0, ee = I, ce = []; I < _;) {
							if (N = d.charCodeAt(I), N !== N || N === en) te = {
								start: ie,
								contentStart: ee || I,
								contentEnd: I,
								end: I
							}, ce.push(te), N === en && (ie = I + 1, F = 0, ee = void 0, te.end = ie);
							else if (F !== void 0) if (N === Pt || N === lr) F += N === Pt ? 1 : rn - F % rn, F > rn && (F = void 0, ee = I);
							else {
								if (F < rn && te && (te.contentStart === te.contentEnd || Ig(C, i, L, [
									y,
									d.slice(I, yg),
									!0
								]))) break;
								F = void 0, ee = I;
							}
							I++;
						}
						for (I = -1, _ = ce.length; _ > 0 && (te = ce[_ - 1], te.contentStart === te.contentEnd);) _--;
						for (ne = y(d.slice(0, te.contentEnd)); ++I < _;) te = ce[I], b[j.line + I] = (b[j.line + I] || 0) + (te.contentStart - te.start), S.push(d.slice(te.contentStart, te.end));
						return h = L.enterBlock(), W = L.tokenizeBlock(S.join(""), j), h(), ne({
							type: "footnoteDefinition",
							identifier: R.toLowerCase(),
							label: R,
							children: W
						});
					}
				}
			}
			function x(y, d, v) {
				var L = d.length + 1, C = 0, b, _, I, S;
				if (d.charCodeAt(C++) === Ot && d.charCodeAt(C++) === cr) {
					for (_ = C; C < L;) {
						if (S = d.charCodeAt(C), S !== S || S === en || S === lr || S === Pt) return;
						if (S === Pi) {
							I = C, C++;
							break;
						}
						C++;
					}
					if (!(I === void 0 || _ === I)) return v ? !0 : (b = d.slice(_, I), y(d.slice(0, C))({
						type: "footnoteReference",
						identifier: b.toLowerCase(),
						label: b
					}));
				}
			}
			function g(y, d, v) {
				var L = this, C = d.length + 1, b = 0, _ = 0, I, S, R, O, z, N, j;
				if (d.charCodeAt(b++) === cr && d.charCodeAt(b++) === Ot) {
					for (R = b; b < C;) {
						if (S = d.charCodeAt(b), S !== S) return;
						if (N === void 0) if (S === Cg) b += 2;
						else if (S === Ot) _++, b++;
						else if (S === Pi) if (_ === 0) {
							O = b, b++;
							break;
						} else _--, b++;
						else if (S === tn) {
							for (z = b, N = 1; d.charCodeAt(z + N) === tn;) N++;
							b += N;
						} else b++;
						else if (S === tn) {
							for (z = b, j = 1; d.charCodeAt(z + j) === tn;) j++;
							b += j, N === j && (N = void 0), j = void 0;
						} else b++;
					}
					if (O !== void 0) return v ? !0 : (I = y.now(), I.column += 2, I.offset += 2, y(d.slice(0, b))({
						type: "footnote",
						children: L.tokenizeInline(d.slice(R, O), I)
					}));
				}
			}
			function k(y, d, v) {
				var L = 0;
				if (d.charCodeAt(L) === Eg && L++, d.charCodeAt(L) === Ot && d.charCodeAt(L + 1) !== cr) return l.call(this, y, d, v);
			}
			function E(y, d, v) {
				for (var L = 0, C = d.charCodeAt(L); C === Pt || C === lr;) C = d.charCodeAt(++L);
				if (C === Ot && d.charCodeAt(L + 1) !== cr) return s.call(this, y, d, v);
			}
			function w(y, d) {
				return y.indexOf("[", d);
			}
			function T(y, d) {
				return y.indexOf("^[", d);
			}
		}
		function Lg(e) {
			var t = e.prototype.visitors, r = "    ";
			t.footnote = n, t.footnoteReference = i, t.footnoteDefinition = u;
			function n(a) {
				return "^[" + this.all(a).join("") + "]";
			}
			function i(a) {
				return "[^" + (a.label || a.identifier) + "]";
			}
			function u(a) {
				for (var o = this.all(a).join(`

`).split(`
`), s = 0, l = o.length, f; ++s < l;) f = o[s], f !== "" && (o[s] = r + f);
				return "[^" + (a.label || a.identifier) + "]: " + o.join(`
`);
			}
		}
		function Oi(e, t, r) {
			e.splice(e.indexOf(t), 0, r);
		}
		function Ig(e, t, r, n) {
			for (var i = e.length, u = -1; ++u < i;) if (t[e[u][0]].apply(r, n)) return !0;
			return !1;
		}
	});
	Ri = q((Ni) => {
		Ni.isRemarkParser = qg;
		Ni.isRemarkCompiler = Bg;
		function qg(e) {
			return !!(e && e.prototype && e.prototype.blockTokenizers);
		}
		function Bg(e) {
			return !!(e && e.prototype && e.prototype.visitors);
		}
	});
	Lo = q((k8, So) => {
		var Co = Ri();
		So.exports = Ng;
		var yo = 9, vo = 32, nn = 36, _g = 48, Pg = 57, Ao = 92, Og = ["math", "math-inline"], To = "math-display";
		function Ng(e) {
			let t = this.Parser, r = this.Compiler;
			Co.isRemarkParser(t) && Rg(t, e), Co.isRemarkCompiler(r) && Mg(r, e);
		}
		function Rg(e, t) {
			let r = e.prototype, n = r.inlineMethods;
			u.locator = i, r.inlineTokenizers.math = u, n.splice(n.indexOf("text"), 0, "math");
			function i(a, o) {
				return a.indexOf("$", o);
			}
			function u(a, o, s) {
				let l = o.length, f = !1, c = !1, p = 0, m, D, x, g, k, E, w;
				if (o.charCodeAt(p) === Ao && (c = !0, p++), o.charCodeAt(p) === nn) {
					if (p++, c) return s ? !0 : a(o.slice(0, p))({
						type: "text",
						value: "$"
					});
					if (o.charCodeAt(p) === nn && (f = !0, p++), x = o.charCodeAt(p), !(x === vo || x === yo)) {
						for (g = p; p < l;) {
							if (D = x, x = o.charCodeAt(p + 1), D === nn) {
								if (m = o.charCodeAt(p - 1), m !== vo && m !== yo && (x !== x || x < _g || x > Pg) && (!f || x === nn)) {
									k = p - 1, p++, f && p++, E = p;
									break;
								}
							} else D === Ao && (p++, x = o.charCodeAt(p + 1));
							p++;
						}
						if (E !== void 0) return s ? !0 : (w = o.slice(g, k + 1), a(o.slice(0, E))({
							type: "inlineMath",
							value: w,
							data: {
								hName: "span",
								hProperties: { className: Og.concat(f && t.inlineMathDouble ? [To] : []) },
								hChildren: [{
									type: "text",
									value: w
								}]
							}
						}));
					}
				}
			}
		}
		function Mg(e) {
			let t = e.prototype;
			t.visitors.inlineMath = r;
			function r(n) {
				let i = "$";
				return (n.data && n.data.hProperties && n.data.hProperties.className || []).includes(To) && (i = "$$"), i + n.value + i;
			}
		}
	});
	Po = q((F8, _o) => {
		var Io = Ri();
		_o.exports = Vg;
		var qo = 10, fr = 32, Mi = 36, Bo = `
`, zg = "$", Ug = 2, Hg = ["math", "math-display"];
		function Vg() {
			let e = this.Parser, t = this.Compiler;
			Io.isRemarkParser(e) && Gg(e), Io.isRemarkCompiler(t) && jg(t);
		}
		function Gg(e) {
			let t = e.prototype, r = t.blockMethods, n = t.interruptParagraph, i = t.interruptList, u = t.interruptBlockquote;
			t.blockTokenizers.math = a, r.splice(r.indexOf("fencedCode") + 1, 0, "math"), n.splice(n.indexOf("fencedCode") + 1, 0, ["math"]), i.splice(i.indexOf("fencedCode") + 1, 0, ["math"]), u.splice(u.indexOf("fencedCode") + 1, 0, ["math"]);
			function a(o, s, l) {
				var f = s.length, c = 0;
				let p, m, D, x, g, k, E, w, T, y, d;
				for (; c < f && s.charCodeAt(c) === fr;) c++;
				for (g = c; c < f && s.charCodeAt(c) === Mi;) c++;
				if (k = c - g, !(k < Ug)) {
					for (; c < f && s.charCodeAt(c) === fr;) c++;
					for (E = c; c < f;) {
						if (p = s.charCodeAt(c), p === Mi) return;
						if (p === qo) break;
						c++;
					}
					if (s.charCodeAt(c) === qo) {
						if (l) return !0;
						for (m = [], E !== c && m.push(s.slice(E, c)), c++, D = s.indexOf(Bo, c + 1), D = D === -1 ? f : D; c < f;) {
							for (w = !1, y = c, d = D, x = D, T = 0; x > y && s.charCodeAt(x - 1) === fr;) x--;
							for (; x > y && s.charCodeAt(x - 1) === Mi;) T++, x--;
							for (k <= T && s.indexOf(zg, y) === x && (w = !0, d = x); y <= d && y - c < g && s.charCodeAt(y) === fr;) y++;
							if (w) for (; d > y && s.charCodeAt(d - 1) === fr;) d--;
							if ((!w || y !== d) && m.push(s.slice(y, d)), w) break;
							c = D + 1, D = s.indexOf(Bo, c + 1), D = D === -1 ? f : D;
						}
						return m = m.join(`
`), o(s.slice(0, D))({
							type: "math",
							value: m,
							data: {
								hName: "div",
								hProperties: { className: Hg.concat() },
								hChildren: [{
									type: "text",
									value: m
								}]
							}
						});
					}
				}
			}
		}
		function jg(e) {
			let t = e.prototype;
			t.visitors.math = r;
			function r(n) {
				return `$$
` + n.value + `
$$`;
			}
		}
	});
	No = q((b8, Oo) => {
		var Wg = Lo(), Yg = Po();
		Oo.exports = $g;
		function $g(e) {
			var t = e || {};
			Yg.call(this, t), Wg.call(this, t);
		}
	});
	Ft = q((E8, Ro) => {
		Ro.exports = Qg;
		var Kg = Object.prototype.hasOwnProperty;
		function Qg() {
			for (var e = {}, t = 0; t < arguments.length; t++) {
				var r = arguments[t];
				for (var n in r) Kg.call(r, n) && (e[n] = r[n]);
			}
			return e;
		}
	});
	Mo = q((w8, zi) => {
		typeof Object.create == "function" ? zi.exports = function(t, r) {
			r && (t.super_ = r, t.prototype = Object.create(r.prototype, { constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			} }));
		} : zi.exports = function(t, r) {
			if (r) {
				t.super_ = r;
				var n = function() {};
				n.prototype = r.prototype, t.prototype = new n(), t.prototype.constructor = t;
			}
		};
	});
	Ho = q((C8, Uo) => {
		"use strict";
		var Jg = Ft(), zo = Mo();
		Uo.exports = Xg;
		function Xg(e) {
			var t, r, n;
			zo(u, e), zo(i, u), t = u.prototype;
			for (r in t) n = t[r], n && typeof n == "object" && (t[r] = "concat" in n ? n.concat() : Jg(n));
			return u;
			function i(a) {
				return e.apply(this, a);
			}
			function u() {
				return this instanceof u ? e.apply(this, arguments) : new i(arguments);
			}
		}
	});
	Go = q((y8, Vo) => {
		"use strict";
		Vo.exports = Zg;
		function Zg(e, t, r) {
			return n;
			function n() {
				var i = r || this, u = i[e];
				return i[e] = !t, a;
				function a() {
					i[e] = u;
				}
			}
		}
	});
	Wo = q((v8, jo) => {
		"use strict";
		jo.exports = ex;
		function ex(e) {
			for (var t = String(e), r = [], n = /\r?\n|\r/g; n.exec(t);) r.push(n.lastIndex);
			return r.push(t.length + 1), {
				toPoint: i,
				toPosition: i,
				toOffset: u
			};
			function i(a) {
				var o = -1;
				if (a > -1 && a < r[r.length - 1]) {
					for (; ++o < r.length;) if (r[o] > a) return {
						line: o + 1,
						column: a - (r[o - 1] || 0) + 1,
						offset: a
					};
				}
				return {};
			}
			function u(a) {
				var o = a && a.line, s = a && a.column, l;
				return !isNaN(o) && !isNaN(s) && o - 1 in r && (l = (r[o - 2] || 0) + s - 1 || 0), l > -1 && l < r[r.length - 1] ? l : -1;
			}
		}
	});
	$o = q((A8, Yo) => {
		"use strict";
		Yo.exports = tx;
		var Ui = "\\";
		function tx(e, t) {
			return r;
			function r(n) {
				for (var i = 0, u = n.indexOf(Ui), a = e[t], o = [], s; u !== -1;) o.push(n.slice(i, u)), i = u + 1, s = n.charAt(i), (!s || a.indexOf(s) === -1) && o.push(Ui), u = n.indexOf(Ui, i + 1);
				return o.push(n.slice(i)), o.join("");
			}
		}
	});
	Ko = q((T8, rx) => {
		rx.exports = {
			AElig: "Æ",
			AMP: "&",
			Aacute: "Á",
			Acirc: "Â",
			Agrave: "À",
			Aring: "Å",
			Atilde: "Ã",
			Auml: "Ä",
			COPY: "©",
			Ccedil: "Ç",
			ETH: "Ð",
			Eacute: "É",
			Ecirc: "Ê",
			Egrave: "È",
			Euml: "Ë",
			GT: ">",
			Iacute: "Í",
			Icirc: "Î",
			Igrave: "Ì",
			Iuml: "Ï",
			LT: "<",
			Ntilde: "Ñ",
			Oacute: "Ó",
			Ocirc: "Ô",
			Ograve: "Ò",
			Oslash: "Ø",
			Otilde: "Õ",
			Ouml: "Ö",
			QUOT: "\"",
			REG: "®",
			THORN: "Þ",
			Uacute: "Ú",
			Ucirc: "Û",
			Ugrave: "Ù",
			Uuml: "Ü",
			Yacute: "Ý",
			aacute: "á",
			acirc: "â",
			acute: "´",
			aelig: "æ",
			agrave: "à",
			amp: "&",
			aring: "å",
			atilde: "ã",
			auml: "ä",
			brvbar: "¦",
			ccedil: "ç",
			cedil: "¸",
			cent: "¢",
			copy: "©",
			curren: "¤",
			deg: "°",
			divide: "÷",
			eacute: "é",
			ecirc: "ê",
			egrave: "è",
			eth: "ð",
			euml: "ë",
			frac12: "½",
			frac14: "¼",
			frac34: "¾",
			gt: ">",
			iacute: "í",
			icirc: "î",
			iexcl: "¡",
			igrave: "ì",
			iquest: "¿",
			iuml: "ï",
			laquo: "«",
			lt: "<",
			macr: "¯",
			micro: "µ",
			middot: "·",
			nbsp: "\xA0",
			not: "¬",
			ntilde: "ñ",
			oacute: "ó",
			ocirc: "ô",
			ograve: "ò",
			ordf: "ª",
			ordm: "º",
			oslash: "ø",
			otilde: "õ",
			ouml: "ö",
			para: "¶",
			plusmn: "±",
			pound: "£",
			quot: "\"",
			raquo: "»",
			reg: "®",
			sect: "§",
			shy: "­",
			sup1: "¹",
			sup2: "²",
			sup3: "³",
			szlig: "ß",
			thorn: "þ",
			times: "×",
			uacute: "ú",
			ucirc: "û",
			ugrave: "ù",
			uml: "¨",
			uuml: "ü",
			yacute: "ý",
			yen: "¥",
			yuml: "ÿ"
		};
	});
	Qo = q((S8, nx) => {
		nx.exports = {
			"0": "�",
			"128": "€",
			"130": "‚",
			"131": "ƒ",
			"132": "„",
			"133": "…",
			"134": "†",
			"135": "‡",
			"136": "ˆ",
			"137": "‰",
			"138": "Š",
			"139": "‹",
			"140": "Œ",
			"142": "Ž",
			"145": "‘",
			"146": "’",
			"147": "“",
			"148": "”",
			"149": "•",
			"150": "–",
			"151": "—",
			"152": "˜",
			"153": "™",
			"154": "š",
			"155": "›",
			"156": "œ",
			"158": "ž",
			"159": "Ÿ"
		};
	});
	bt = q((L8, Jo) => {
		"use strict";
		Jo.exports = ix;
		function ix(e) {
			var t = typeof e == "string" ? e.charCodeAt(0) : e;
			return t >= 48 && t <= 57;
		}
	});
	Zo = q((I8, Xo) => {
		"use strict";
		Xo.exports = ax;
		function ax(e) {
			var t = typeof e == "string" ? e.charCodeAt(0) : e;
			return t >= 97 && t <= 102 || t >= 65 && t <= 70 || t >= 48 && t <= 57;
		}
	});
	Nt = q((q8, es) => {
		"use strict";
		es.exports = ux;
		function ux(e) {
			var t = typeof e == "string" ? e.charCodeAt(0) : e;
			return t >= 97 && t <= 122 || t >= 65 && t <= 90;
		}
	});
	rs = q((B8, ts) => {
		"use strict";
		var ox = Nt(), sx = bt();
		ts.exports = lx;
		function lx(e) {
			return ox(e) || sx(e);
		}
	});
	ns = q((_8, cx) => {
		cx.exports = {
			AEli: "Æ",
			AElig: "Æ",
			AM: "&",
			AMP: "&",
			Aacut: "Á",
			Aacute: "Á",
			Abreve: "Ă",
			Acir: "Â",
			Acirc: "Â",
			Acy: "А",
			Afr: "𝔄",
			Agrav: "À",
			Agrave: "À",
			Alpha: "Α",
			Amacr: "Ā",
			And: "⩓",
			Aogon: "Ą",
			Aopf: "𝔸",
			ApplyFunction: "⁡",
			Arin: "Å",
			Aring: "Å",
			Ascr: "𝒜",
			Assign: "≔",
			Atild: "Ã",
			Atilde: "Ã",
			Aum: "Ä",
			Auml: "Ä",
			Backslash: "∖",
			Barv: "⫧",
			Barwed: "⌆",
			Bcy: "Б",
			Because: "∵",
			Bernoullis: "ℬ",
			Beta: "Β",
			Bfr: "𝔅",
			Bopf: "𝔹",
			Breve: "˘",
			Bscr: "ℬ",
			Bumpeq: "≎",
			CHcy: "Ч",
			COP: "©",
			COPY: "©",
			Cacute: "Ć",
			Cap: "⋒",
			CapitalDifferentialD: "ⅅ",
			Cayleys: "ℭ",
			Ccaron: "Č",
			Ccedi: "Ç",
			Ccedil: "Ç",
			Ccirc: "Ĉ",
			Cconint: "∰",
			Cdot: "Ċ",
			Cedilla: "¸",
			CenterDot: "·",
			Cfr: "ℭ",
			Chi: "Χ",
			CircleDot: "⊙",
			CircleMinus: "⊖",
			CirclePlus: "⊕",
			CircleTimes: "⊗",
			ClockwiseContourIntegral: "∲",
			CloseCurlyDoubleQuote: "”",
			CloseCurlyQuote: "’",
			Colon: "∷",
			Colone: "⩴",
			Congruent: "≡",
			Conint: "∯",
			ContourIntegral: "∮",
			Copf: "ℂ",
			Coproduct: "∐",
			CounterClockwiseContourIntegral: "∳",
			Cross: "⨯",
			Cscr: "𝒞",
			Cup: "⋓",
			CupCap: "≍",
			DD: "ⅅ",
			DDotrahd: "⤑",
			DJcy: "Ђ",
			DScy: "Ѕ",
			DZcy: "Џ",
			Dagger: "‡",
			Darr: "↡",
			Dashv: "⫤",
			Dcaron: "Ď",
			Dcy: "Д",
			Del: "∇",
			Delta: "Δ",
			Dfr: "𝔇",
			DiacriticalAcute: "´",
			DiacriticalDot: "˙",
			DiacriticalDoubleAcute: "˝",
			DiacriticalGrave: "`",
			DiacriticalTilde: "˜",
			Diamond: "⋄",
			DifferentialD: "ⅆ",
			Dopf: "𝔻",
			Dot: "¨",
			DotDot: "⃜",
			DotEqual: "≐",
			DoubleContourIntegral: "∯",
			DoubleDot: "¨",
			DoubleDownArrow: "⇓",
			DoubleLeftArrow: "⇐",
			DoubleLeftRightArrow: "⇔",
			DoubleLeftTee: "⫤",
			DoubleLongLeftArrow: "⟸",
			DoubleLongLeftRightArrow: "⟺",
			DoubleLongRightArrow: "⟹",
			DoubleRightArrow: "⇒",
			DoubleRightTee: "⊨",
			DoubleUpArrow: "⇑",
			DoubleUpDownArrow: "⇕",
			DoubleVerticalBar: "∥",
			DownArrow: "↓",
			DownArrowBar: "⤓",
			DownArrowUpArrow: "⇵",
			DownBreve: "̑",
			DownLeftRightVector: "⥐",
			DownLeftTeeVector: "⥞",
			DownLeftVector: "↽",
			DownLeftVectorBar: "⥖",
			DownRightTeeVector: "⥟",
			DownRightVector: "⇁",
			DownRightVectorBar: "⥗",
			DownTee: "⊤",
			DownTeeArrow: "↧",
			Downarrow: "⇓",
			Dscr: "𝒟",
			Dstrok: "Đ",
			ENG: "Ŋ",
			ET: "Ð",
			ETH: "Ð",
			Eacut: "É",
			Eacute: "É",
			Ecaron: "Ě",
			Ecir: "Ê",
			Ecirc: "Ê",
			Ecy: "Э",
			Edot: "Ė",
			Efr: "𝔈",
			Egrav: "È",
			Egrave: "È",
			Element: "∈",
			Emacr: "Ē",
			EmptySmallSquare: "◻",
			EmptyVerySmallSquare: "▫",
			Eogon: "Ę",
			Eopf: "𝔼",
			Epsilon: "Ε",
			Equal: "⩵",
			EqualTilde: "≂",
			Equilibrium: "⇌",
			Escr: "ℰ",
			Esim: "⩳",
			Eta: "Η",
			Eum: "Ë",
			Euml: "Ë",
			Exists: "∃",
			ExponentialE: "ⅇ",
			Fcy: "Ф",
			Ffr: "𝔉",
			FilledSmallSquare: "◼",
			FilledVerySmallSquare: "▪",
			Fopf: "𝔽",
			ForAll: "∀",
			Fouriertrf: "ℱ",
			Fscr: "ℱ",
			GJcy: "Ѓ",
			G: ">",
			GT: ">",
			Gamma: "Γ",
			Gammad: "Ϝ",
			Gbreve: "Ğ",
			Gcedil: "Ģ",
			Gcirc: "Ĝ",
			Gcy: "Г",
			Gdot: "Ġ",
			Gfr: "𝔊",
			Gg: "⋙",
			Gopf: "𝔾",
			GreaterEqual: "≥",
			GreaterEqualLess: "⋛",
			GreaterFullEqual: "≧",
			GreaterGreater: "⪢",
			GreaterLess: "≷",
			GreaterSlantEqual: "⩾",
			GreaterTilde: "≳",
			Gscr: "𝒢",
			Gt: "≫",
			HARDcy: "Ъ",
			Hacek: "ˇ",
			Hat: "^",
			Hcirc: "Ĥ",
			Hfr: "ℌ",
			HilbertSpace: "ℋ",
			Hopf: "ℍ",
			HorizontalLine: "─",
			Hscr: "ℋ",
			Hstrok: "Ħ",
			HumpDownHump: "≎",
			HumpEqual: "≏",
			IEcy: "Е",
			IJlig: "Ĳ",
			IOcy: "Ё",
			Iacut: "Í",
			Iacute: "Í",
			Icir: "Î",
			Icirc: "Î",
			Icy: "И",
			Idot: "İ",
			Ifr: "ℑ",
			Igrav: "Ì",
			Igrave: "Ì",
			Im: "ℑ",
			Imacr: "Ī",
			ImaginaryI: "ⅈ",
			Implies: "⇒",
			Int: "∬",
			Integral: "∫",
			Intersection: "⋂",
			InvisibleComma: "⁣",
			InvisibleTimes: "⁢",
			Iogon: "Į",
			Iopf: "𝕀",
			Iota: "Ι",
			Iscr: "ℐ",
			Itilde: "Ĩ",
			Iukcy: "І",
			Ium: "Ï",
			Iuml: "Ï",
			Jcirc: "Ĵ",
			Jcy: "Й",
			Jfr: "𝔍",
			Jopf: "𝕁",
			Jscr: "𝒥",
			Jsercy: "Ј",
			Jukcy: "Є",
			KHcy: "Х",
			KJcy: "Ќ",
			Kappa: "Κ",
			Kcedil: "Ķ",
			Kcy: "К",
			Kfr: "𝔎",
			Kopf: "𝕂",
			Kscr: "𝒦",
			LJcy: "Љ",
			L: "<",
			LT: "<",
			Lacute: "Ĺ",
			Lambda: "Λ",
			Lang: "⟪",
			Laplacetrf: "ℒ",
			Larr: "↞",
			Lcaron: "Ľ",
			Lcedil: "Ļ",
			Lcy: "Л",
			LeftAngleBracket: "⟨",
			LeftArrow: "←",
			LeftArrowBar: "⇤",
			LeftArrowRightArrow: "⇆",
			LeftCeiling: "⌈",
			LeftDoubleBracket: "⟦",
			LeftDownTeeVector: "⥡",
			LeftDownVector: "⇃",
			LeftDownVectorBar: "⥙",
			LeftFloor: "⌊",
			LeftRightArrow: "↔",
			LeftRightVector: "⥎",
			LeftTee: "⊣",
			LeftTeeArrow: "↤",
			LeftTeeVector: "⥚",
			LeftTriangle: "⊲",
			LeftTriangleBar: "⧏",
			LeftTriangleEqual: "⊴",
			LeftUpDownVector: "⥑",
			LeftUpTeeVector: "⥠",
			LeftUpVector: "↿",
			LeftUpVectorBar: "⥘",
			LeftVector: "↼",
			LeftVectorBar: "⥒",
			Leftarrow: "⇐",
			Leftrightarrow: "⇔",
			LessEqualGreater: "⋚",
			LessFullEqual: "≦",
			LessGreater: "≶",
			LessLess: "⪡",
			LessSlantEqual: "⩽",
			LessTilde: "≲",
			Lfr: "𝔏",
			Ll: "⋘",
			Lleftarrow: "⇚",
			Lmidot: "Ŀ",
			LongLeftArrow: "⟵",
			LongLeftRightArrow: "⟷",
			LongRightArrow: "⟶",
			Longleftarrow: "⟸",
			Longleftrightarrow: "⟺",
			Longrightarrow: "⟹",
			Lopf: "𝕃",
			LowerLeftArrow: "↙",
			LowerRightArrow: "↘",
			Lscr: "ℒ",
			Lsh: "↰",
			Lstrok: "Ł",
			Lt: "≪",
			Map: "⤅",
			Mcy: "М",
			MediumSpace: " ",
			Mellintrf: "ℳ",
			Mfr: "𝔐",
			MinusPlus: "∓",
			Mopf: "𝕄",
			Mscr: "ℳ",
			Mu: "Μ",
			NJcy: "Њ",
			Nacute: "Ń",
			Ncaron: "Ň",
			Ncedil: "Ņ",
			Ncy: "Н",
			NegativeMediumSpace: "​",
			NegativeThickSpace: "​",
			NegativeThinSpace: "​",
			NegativeVeryThinSpace: "​",
			NestedGreaterGreater: "≫",
			NestedLessLess: "≪",
			NewLine: `
`,
			Nfr: "𝔑",
			NoBreak: "⁠",
			NonBreakingSpace: "\xA0",
			Nopf: "ℕ",
			Not: "⫬",
			NotCongruent: "≢",
			NotCupCap: "≭",
			NotDoubleVerticalBar: "∦",
			NotElement: "∉",
			NotEqual: "≠",
			NotEqualTilde: "≂̸",
			NotExists: "∄",
			NotGreater: "≯",
			NotGreaterEqual: "≱",
			NotGreaterFullEqual: "≧̸",
			NotGreaterGreater: "≫̸",
			NotGreaterLess: "≹",
			NotGreaterSlantEqual: "⩾̸",
			NotGreaterTilde: "≵",
			NotHumpDownHump: "≎̸",
			NotHumpEqual: "≏̸",
			NotLeftTriangle: "⋪",
			NotLeftTriangleBar: "⧏̸",
			NotLeftTriangleEqual: "⋬",
			NotLess: "≮",
			NotLessEqual: "≰",
			NotLessGreater: "≸",
			NotLessLess: "≪̸",
			NotLessSlantEqual: "⩽̸",
			NotLessTilde: "≴",
			NotNestedGreaterGreater: "⪢̸",
			NotNestedLessLess: "⪡̸",
			NotPrecedes: "⊀",
			NotPrecedesEqual: "⪯̸",
			NotPrecedesSlantEqual: "⋠",
			NotReverseElement: "∌",
			NotRightTriangle: "⋫",
			NotRightTriangleBar: "⧐̸",
			NotRightTriangleEqual: "⋭",
			NotSquareSubset: "⊏̸",
			NotSquareSubsetEqual: "⋢",
			NotSquareSuperset: "⊐̸",
			NotSquareSupersetEqual: "⋣",
			NotSubset: "⊂⃒",
			NotSubsetEqual: "⊈",
			NotSucceeds: "⊁",
			NotSucceedsEqual: "⪰̸",
			NotSucceedsSlantEqual: "⋡",
			NotSucceedsTilde: "≿̸",
			NotSuperset: "⊃⃒",
			NotSupersetEqual: "⊉",
			NotTilde: "≁",
			NotTildeEqual: "≄",
			NotTildeFullEqual: "≇",
			NotTildeTilde: "≉",
			NotVerticalBar: "∤",
			Nscr: "𝒩",
			Ntild: "Ñ",
			Ntilde: "Ñ",
			Nu: "Ν",
			OElig: "Œ",
			Oacut: "Ó",
			Oacute: "Ó",
			Ocir: "Ô",
			Ocirc: "Ô",
			Ocy: "О",
			Odblac: "Ő",
			Ofr: "𝔒",
			Ograv: "Ò",
			Ograve: "Ò",
			Omacr: "Ō",
			Omega: "Ω",
			Omicron: "Ο",
			Oopf: "𝕆",
			OpenCurlyDoubleQuote: "“",
			OpenCurlyQuote: "‘",
			Or: "⩔",
			Oscr: "𝒪",
			Oslas: "Ø",
			Oslash: "Ø",
			Otild: "Õ",
			Otilde: "Õ",
			Otimes: "⨷",
			Oum: "Ö",
			Ouml: "Ö",
			OverBar: "‾",
			OverBrace: "⏞",
			OverBracket: "⎴",
			OverParenthesis: "⏜",
			PartialD: "∂",
			Pcy: "П",
			Pfr: "𝔓",
			Phi: "Φ",
			Pi: "Π",
			PlusMinus: "±",
			Poincareplane: "ℌ",
			Popf: "ℙ",
			Pr: "⪻",
			Precedes: "≺",
			PrecedesEqual: "⪯",
			PrecedesSlantEqual: "≼",
			PrecedesTilde: "≾",
			Prime: "″",
			Product: "∏",
			Proportion: "∷",
			Proportional: "∝",
			Pscr: "𝒫",
			Psi: "Ψ",
			QUO: "\"",
			QUOT: "\"",
			Qfr: "𝔔",
			Qopf: "ℚ",
			Qscr: "𝒬",
			RBarr: "⤐",
			RE: "®",
			REG: "®",
			Racute: "Ŕ",
			Rang: "⟫",
			Rarr: "↠",
			Rarrtl: "⤖",
			Rcaron: "Ř",
			Rcedil: "Ŗ",
			Rcy: "Р",
			Re: "ℜ",
			ReverseElement: "∋",
			ReverseEquilibrium: "⇋",
			ReverseUpEquilibrium: "⥯",
			Rfr: "ℜ",
			Rho: "Ρ",
			RightAngleBracket: "⟩",
			RightArrow: "→",
			RightArrowBar: "⇥",
			RightArrowLeftArrow: "⇄",
			RightCeiling: "⌉",
			RightDoubleBracket: "⟧",
			RightDownTeeVector: "⥝",
			RightDownVector: "⇂",
			RightDownVectorBar: "⥕",
			RightFloor: "⌋",
			RightTee: "⊢",
			RightTeeArrow: "↦",
			RightTeeVector: "⥛",
			RightTriangle: "⊳",
			RightTriangleBar: "⧐",
			RightTriangleEqual: "⊵",
			RightUpDownVector: "⥏",
			RightUpTeeVector: "⥜",
			RightUpVector: "↾",
			RightUpVectorBar: "⥔",
			RightVector: "⇀",
			RightVectorBar: "⥓",
			Rightarrow: "⇒",
			Ropf: "ℝ",
			RoundImplies: "⥰",
			Rrightarrow: "⇛",
			Rscr: "ℛ",
			Rsh: "↱",
			RuleDelayed: "⧴",
			SHCHcy: "Щ",
			SHcy: "Ш",
			SOFTcy: "Ь",
			Sacute: "Ś",
			Sc: "⪼",
			Scaron: "Š",
			Scedil: "Ş",
			Scirc: "Ŝ",
			Scy: "С",
			Sfr: "𝔖",
			ShortDownArrow: "↓",
			ShortLeftArrow: "←",
			ShortRightArrow: "→",
			ShortUpArrow: "↑",
			Sigma: "Σ",
			SmallCircle: "∘",
			Sopf: "𝕊",
			Sqrt: "√",
			Square: "□",
			SquareIntersection: "⊓",
			SquareSubset: "⊏",
			SquareSubsetEqual: "⊑",
			SquareSuperset: "⊐",
			SquareSupersetEqual: "⊒",
			SquareUnion: "⊔",
			Sscr: "𝒮",
			Star: "⋆",
			Sub: "⋐",
			Subset: "⋐",
			SubsetEqual: "⊆",
			Succeeds: "≻",
			SucceedsEqual: "⪰",
			SucceedsSlantEqual: "≽",
			SucceedsTilde: "≿",
			SuchThat: "∋",
			Sum: "∑",
			Sup: "⋑",
			Superset: "⊃",
			SupersetEqual: "⊇",
			Supset: "⋑",
			THOR: "Þ",
			THORN: "Þ",
			TRADE: "™",
			TSHcy: "Ћ",
			TScy: "Ц",
			Tab: "	",
			Tau: "Τ",
			Tcaron: "Ť",
			Tcedil: "Ţ",
			Tcy: "Т",
			Tfr: "𝔗",
			Therefore: "∴",
			Theta: "Θ",
			ThickSpace: "  ",
			ThinSpace: " ",
			Tilde: "∼",
			TildeEqual: "≃",
			TildeFullEqual: "≅",
			TildeTilde: "≈",
			Topf: "𝕋",
			TripleDot: "⃛",
			Tscr: "𝒯",
			Tstrok: "Ŧ",
			Uacut: "Ú",
			Uacute: "Ú",
			Uarr: "↟",
			Uarrocir: "⥉",
			Ubrcy: "Ў",
			Ubreve: "Ŭ",
			Ucir: "Û",
			Ucirc: "Û",
			Ucy: "У",
			Udblac: "Ű",
			Ufr: "𝔘",
			Ugrav: "Ù",
			Ugrave: "Ù",
			Umacr: "Ū",
			UnderBar: "_",
			UnderBrace: "⏟",
			UnderBracket: "⎵",
			UnderParenthesis: "⏝",
			Union: "⋃",
			UnionPlus: "⊎",
			Uogon: "Ų",
			Uopf: "𝕌",
			UpArrow: "↑",
			UpArrowBar: "⤒",
			UpArrowDownArrow: "⇅",
			UpDownArrow: "↕",
			UpEquilibrium: "⥮",
			UpTee: "⊥",
			UpTeeArrow: "↥",
			Uparrow: "⇑",
			Updownarrow: "⇕",
			UpperLeftArrow: "↖",
			UpperRightArrow: "↗",
			Upsi: "ϒ",
			Upsilon: "Υ",
			Uring: "Ů",
			Uscr: "𝒰",
			Utilde: "Ũ",
			Uum: "Ü",
			Uuml: "Ü",
			VDash: "⊫",
			Vbar: "⫫",
			Vcy: "В",
			Vdash: "⊩",
			Vdashl: "⫦",
			Vee: "⋁",
			Verbar: "‖",
			Vert: "‖",
			VerticalBar: "∣",
			VerticalLine: "|",
			VerticalSeparator: "❘",
			VerticalTilde: "≀",
			VeryThinSpace: " ",
			Vfr: "𝔙",
			Vopf: "𝕍",
			Vscr: "𝒱",
			Vvdash: "⊪",
			Wcirc: "Ŵ",
			Wedge: "⋀",
			Wfr: "𝔚",
			Wopf: "𝕎",
			Wscr: "𝒲",
			Xfr: "𝔛",
			Xi: "Ξ",
			Xopf: "𝕏",
			Xscr: "𝒳",
			YAcy: "Я",
			YIcy: "Ї",
			YUcy: "Ю",
			Yacut: "Ý",
			Yacute: "Ý",
			Ycirc: "Ŷ",
			Ycy: "Ы",
			Yfr: "𝔜",
			Yopf: "𝕐",
			Yscr: "𝒴",
			Yuml: "Ÿ",
			ZHcy: "Ж",
			Zacute: "Ź",
			Zcaron: "Ž",
			Zcy: "З",
			Zdot: "Ż",
			ZeroWidthSpace: "​",
			Zeta: "Ζ",
			Zfr: "ℨ",
			Zopf: "ℤ",
			Zscr: "𝒵",
			aacut: "á",
			aacute: "á",
			abreve: "ă",
			ac: "∾",
			acE: "∾̳",
			acd: "∿",
			acir: "â",
			acirc: "â",
			acut: "´",
			acute: "´",
			acy: "а",
			aeli: "æ",
			aelig: "æ",
			af: "⁡",
			afr: "𝔞",
			agrav: "à",
			agrave: "à",
			alefsym: "ℵ",
			aleph: "ℵ",
			alpha: "α",
			amacr: "ā",
			amalg: "⨿",
			am: "&",
			amp: "&",
			and: "∧",
			andand: "⩕",
			andd: "⩜",
			andslope: "⩘",
			andv: "⩚",
			ang: "∠",
			ange: "⦤",
			angle: "∠",
			angmsd: "∡",
			angmsdaa: "⦨",
			angmsdab: "⦩",
			angmsdac: "⦪",
			angmsdad: "⦫",
			angmsdae: "⦬",
			angmsdaf: "⦭",
			angmsdag: "⦮",
			angmsdah: "⦯",
			angrt: "∟",
			angrtvb: "⊾",
			angrtvbd: "⦝",
			angsph: "∢",
			angst: "Å",
			angzarr: "⍼",
			aogon: "ą",
			aopf: "𝕒",
			ap: "≈",
			apE: "⩰",
			apacir: "⩯",
			ape: "≊",
			apid: "≋",
			apos: "'",
			approx: "≈",
			approxeq: "≊",
			arin: "å",
			aring: "å",
			ascr: "𝒶",
			ast: "*",
			asymp: "≈",
			asympeq: "≍",
			atild: "ã",
			atilde: "ã",
			aum: "ä",
			auml: "ä",
			awconint: "∳",
			awint: "⨑",
			bNot: "⫭",
			backcong: "≌",
			backepsilon: "϶",
			backprime: "‵",
			backsim: "∽",
			backsimeq: "⋍",
			barvee: "⊽",
			barwed: "⌅",
			barwedge: "⌅",
			bbrk: "⎵",
			bbrktbrk: "⎶",
			bcong: "≌",
			bcy: "б",
			bdquo: "„",
			becaus: "∵",
			because: "∵",
			bemptyv: "⦰",
			bepsi: "϶",
			bernou: "ℬ",
			beta: "β",
			beth: "ℶ",
			between: "≬",
			bfr: "𝔟",
			bigcap: "⋂",
			bigcirc: "◯",
			bigcup: "⋃",
			bigodot: "⨀",
			bigoplus: "⨁",
			bigotimes: "⨂",
			bigsqcup: "⨆",
			bigstar: "★",
			bigtriangledown: "▽",
			bigtriangleup: "△",
			biguplus: "⨄",
			bigvee: "⋁",
			bigwedge: "⋀",
			bkarow: "⤍",
			blacklozenge: "⧫",
			blacksquare: "▪",
			blacktriangle: "▴",
			blacktriangledown: "▾",
			blacktriangleleft: "◂",
			blacktriangleright: "▸",
			blank: "␣",
			blk12: "▒",
			blk14: "░",
			blk34: "▓",
			block: "█",
			bne: "=⃥",
			bnequiv: "≡⃥",
			bnot: "⌐",
			bopf: "𝕓",
			bot: "⊥",
			bottom: "⊥",
			bowtie: "⋈",
			boxDL: "╗",
			boxDR: "╔",
			boxDl: "╖",
			boxDr: "╓",
			boxH: "═",
			boxHD: "╦",
			boxHU: "╩",
			boxHd: "╤",
			boxHu: "╧",
			boxUL: "╝",
			boxUR: "╚",
			boxUl: "╜",
			boxUr: "╙",
			boxV: "║",
			boxVH: "╬",
			boxVL: "╣",
			boxVR: "╠",
			boxVh: "╫",
			boxVl: "╢",
			boxVr: "╟",
			boxbox: "⧉",
			boxdL: "╕",
			boxdR: "╒",
			boxdl: "┐",
			boxdr: "┌",
			boxh: "─",
			boxhD: "╥",
			boxhU: "╨",
			boxhd: "┬",
			boxhu: "┴",
			boxminus: "⊟",
			boxplus: "⊞",
			boxtimes: "⊠",
			boxuL: "╛",
			boxuR: "╘",
			boxul: "┘",
			boxur: "└",
			boxv: "│",
			boxvH: "╪",
			boxvL: "╡",
			boxvR: "╞",
			boxvh: "┼",
			boxvl: "┤",
			boxvr: "├",
			bprime: "‵",
			breve: "˘",
			brvba: "¦",
			brvbar: "¦",
			bscr: "𝒷",
			bsemi: "⁏",
			bsim: "∽",
			bsime: "⋍",
			bsol: "\\",
			bsolb: "⧅",
			bsolhsub: "⟈",
			bull: "•",
			bullet: "•",
			bump: "≎",
			bumpE: "⪮",
			bumpe: "≏",
			bumpeq: "≏",
			cacute: "ć",
			cap: "∩",
			capand: "⩄",
			capbrcup: "⩉",
			capcap: "⩋",
			capcup: "⩇",
			capdot: "⩀",
			caps: "∩︀",
			caret: "⁁",
			caron: "ˇ",
			ccaps: "⩍",
			ccaron: "č",
			ccedi: "ç",
			ccedil: "ç",
			ccirc: "ĉ",
			ccups: "⩌",
			ccupssm: "⩐",
			cdot: "ċ",
			cedi: "¸",
			cedil: "¸",
			cemptyv: "⦲",
			cen: "¢",
			cent: "¢",
			centerdot: "·",
			cfr: "𝔠",
			chcy: "ч",
			check: "✓",
			checkmark: "✓",
			chi: "χ",
			cir: "○",
			cirE: "⧃",
			circ: "ˆ",
			circeq: "≗",
			circlearrowleft: "↺",
			circlearrowright: "↻",
			circledR: "®",
			circledS: "Ⓢ",
			circledast: "⊛",
			circledcirc: "⊚",
			circleddash: "⊝",
			cire: "≗",
			cirfnint: "⨐",
			cirmid: "⫯",
			cirscir: "⧂",
			clubs: "♣",
			clubsuit: "♣",
			colon: ":",
			colone: "≔",
			coloneq: "≔",
			comma: ",",
			commat: "@",
			comp: "∁",
			compfn: "∘",
			complement: "∁",
			complexes: "ℂ",
			cong: "≅",
			congdot: "⩭",
			conint: "∮",
			copf: "𝕔",
			coprod: "∐",
			cop: "©",
			copy: "©",
			copysr: "℗",
			crarr: "↵",
			cross: "✗",
			cscr: "𝒸",
			csub: "⫏",
			csube: "⫑",
			csup: "⫐",
			csupe: "⫒",
			ctdot: "⋯",
			cudarrl: "⤸",
			cudarrr: "⤵",
			cuepr: "⋞",
			cuesc: "⋟",
			cularr: "↶",
			cularrp: "⤽",
			cup: "∪",
			cupbrcap: "⩈",
			cupcap: "⩆",
			cupcup: "⩊",
			cupdot: "⊍",
			cupor: "⩅",
			cups: "∪︀",
			curarr: "↷",
			curarrm: "⤼",
			curlyeqprec: "⋞",
			curlyeqsucc: "⋟",
			curlyvee: "⋎",
			curlywedge: "⋏",
			curre: "¤",
			curren: "¤",
			curvearrowleft: "↶",
			curvearrowright: "↷",
			cuvee: "⋎",
			cuwed: "⋏",
			cwconint: "∲",
			cwint: "∱",
			cylcty: "⌭",
			dArr: "⇓",
			dHar: "⥥",
			dagger: "†",
			daleth: "ℸ",
			darr: "↓",
			dash: "‐",
			dashv: "⊣",
			dbkarow: "⤏",
			dblac: "˝",
			dcaron: "ď",
			dcy: "д",
			dd: "ⅆ",
			ddagger: "‡",
			ddarr: "⇊",
			ddotseq: "⩷",
			de: "°",
			deg: "°",
			delta: "δ",
			demptyv: "⦱",
			dfisht: "⥿",
			dfr: "𝔡",
			dharl: "⇃",
			dharr: "⇂",
			diam: "⋄",
			diamond: "⋄",
			diamondsuit: "♦",
			diams: "♦",
			die: "¨",
			digamma: "ϝ",
			disin: "⋲",
			div: "÷",
			divid: "÷",
			divide: "÷",
			divideontimes: "⋇",
			divonx: "⋇",
			djcy: "ђ",
			dlcorn: "⌞",
			dlcrop: "⌍",
			dollar: "$",
			dopf: "𝕕",
			dot: "˙",
			doteq: "≐",
			doteqdot: "≑",
			dotminus: "∸",
			dotplus: "∔",
			dotsquare: "⊡",
			doublebarwedge: "⌆",
			downarrow: "↓",
			downdownarrows: "⇊",
			downharpoonleft: "⇃",
			downharpoonright: "⇂",
			drbkarow: "⤐",
			drcorn: "⌟",
			drcrop: "⌌",
			dscr: "𝒹",
			dscy: "ѕ",
			dsol: "⧶",
			dstrok: "đ",
			dtdot: "⋱",
			dtri: "▿",
			dtrif: "▾",
			duarr: "⇵",
			duhar: "⥯",
			dwangle: "⦦",
			dzcy: "џ",
			dzigrarr: "⟿",
			eDDot: "⩷",
			eDot: "≑",
			eacut: "é",
			eacute: "é",
			easter: "⩮",
			ecaron: "ě",
			ecir: "ê",
			ecirc: "ê",
			ecolon: "≕",
			ecy: "э",
			edot: "ė",
			ee: "ⅇ",
			efDot: "≒",
			efr: "𝔢",
			eg: "⪚",
			egrav: "è",
			egrave: "è",
			egs: "⪖",
			egsdot: "⪘",
			el: "⪙",
			elinters: "⏧",
			ell: "ℓ",
			els: "⪕",
			elsdot: "⪗",
			emacr: "ē",
			empty: "∅",
			emptyset: "∅",
			emptyv: "∅",
			emsp13: " ",
			emsp14: " ",
			emsp: " ",
			eng: "ŋ",
			ensp: " ",
			eogon: "ę",
			eopf: "𝕖",
			epar: "⋕",
			eparsl: "⧣",
			eplus: "⩱",
			epsi: "ε",
			epsilon: "ε",
			epsiv: "ϵ",
			eqcirc: "≖",
			eqcolon: "≕",
			eqsim: "≂",
			eqslantgtr: "⪖",
			eqslantless: "⪕",
			equals: "=",
			equest: "≟",
			equiv: "≡",
			equivDD: "⩸",
			eqvparsl: "⧥",
			erDot: "≓",
			erarr: "⥱",
			escr: "ℯ",
			esdot: "≐",
			esim: "≂",
			eta: "η",
			et: "ð",
			eth: "ð",
			eum: "ë",
			euml: "ë",
			euro: "€",
			excl: "!",
			exist: "∃",
			expectation: "ℰ",
			exponentiale: "ⅇ",
			fallingdotseq: "≒",
			fcy: "ф",
			female: "♀",
			ffilig: "ﬃ",
			fflig: "ﬀ",
			ffllig: "ﬄ",
			ffr: "𝔣",
			filig: "ﬁ",
			fjlig: "fj",
			flat: "♭",
			fllig: "ﬂ",
			fltns: "▱",
			fnof: "ƒ",
			fopf: "𝕗",
			forall: "∀",
			fork: "⋔",
			forkv: "⫙",
			fpartint: "⨍",
			frac1: "¼",
			frac12: "½",
			frac13: "⅓",
			frac14: "¼",
			frac15: "⅕",
			frac16: "⅙",
			frac18: "⅛",
			frac23: "⅔",
			frac25: "⅖",
			frac3: "¾",
			frac34: "¾",
			frac35: "⅗",
			frac38: "⅜",
			frac45: "⅘",
			frac56: "⅚",
			frac58: "⅝",
			frac78: "⅞",
			frasl: "⁄",
			frown: "⌢",
			fscr: "𝒻",
			gE: "≧",
			gEl: "⪌",
			gacute: "ǵ",
			gamma: "γ",
			gammad: "ϝ",
			gap: "⪆",
			gbreve: "ğ",
			gcirc: "ĝ",
			gcy: "г",
			gdot: "ġ",
			ge: "≥",
			gel: "⋛",
			geq: "≥",
			geqq: "≧",
			geqslant: "⩾",
			ges: "⩾",
			gescc: "⪩",
			gesdot: "⪀",
			gesdoto: "⪂",
			gesdotol: "⪄",
			gesl: "⋛︀",
			gesles: "⪔",
			gfr: "𝔤",
			gg: "≫",
			ggg: "⋙",
			gimel: "ℷ",
			gjcy: "ѓ",
			gl: "≷",
			glE: "⪒",
			gla: "⪥",
			glj: "⪤",
			gnE: "≩",
			gnap: "⪊",
			gnapprox: "⪊",
			gne: "⪈",
			gneq: "⪈",
			gneqq: "≩",
			gnsim: "⋧",
			gopf: "𝕘",
			grave: "`",
			gscr: "ℊ",
			gsim: "≳",
			gsime: "⪎",
			gsiml: "⪐",
			g: ">",
			gt: ">",
			gtcc: "⪧",
			gtcir: "⩺",
			gtdot: "⋗",
			gtlPar: "⦕",
			gtquest: "⩼",
			gtrapprox: "⪆",
			gtrarr: "⥸",
			gtrdot: "⋗",
			gtreqless: "⋛",
			gtreqqless: "⪌",
			gtrless: "≷",
			gtrsim: "≳",
			gvertneqq: "≩︀",
			gvnE: "≩︀",
			hArr: "⇔",
			hairsp: " ",
			half: "½",
			hamilt: "ℋ",
			hardcy: "ъ",
			harr: "↔",
			harrcir: "⥈",
			harrw: "↭",
			hbar: "ℏ",
			hcirc: "ĥ",
			hearts: "♥",
			heartsuit: "♥",
			hellip: "…",
			hercon: "⊹",
			hfr: "𝔥",
			hksearow: "⤥",
			hkswarow: "⤦",
			hoarr: "⇿",
			homtht: "∻",
			hookleftarrow: "↩",
			hookrightarrow: "↪",
			hopf: "𝕙",
			horbar: "―",
			hscr: "𝒽",
			hslash: "ℏ",
			hstrok: "ħ",
			hybull: "⁃",
			hyphen: "‐",
			iacut: "í",
			iacute: "í",
			ic: "⁣",
			icir: "î",
			icirc: "î",
			icy: "и",
			iecy: "е",
			iexc: "¡",
			iexcl: "¡",
			iff: "⇔",
			ifr: "𝔦",
			igrav: "ì",
			igrave: "ì",
			ii: "ⅈ",
			iiiint: "⨌",
			iiint: "∭",
			iinfin: "⧜",
			iiota: "℩",
			ijlig: "ĳ",
			imacr: "ī",
			image: "ℑ",
			imagline: "ℐ",
			imagpart: "ℑ",
			imath: "ı",
			imof: "⊷",
			imped: "Ƶ",
			in: "∈",
			incare: "℅",
			infin: "∞",
			infintie: "⧝",
			inodot: "ı",
			int: "∫",
			intcal: "⊺",
			integers: "ℤ",
			intercal: "⊺",
			intlarhk: "⨗",
			intprod: "⨼",
			iocy: "ё",
			iogon: "į",
			iopf: "𝕚",
			iota: "ι",
			iprod: "⨼",
			iques: "¿",
			iquest: "¿",
			iscr: "𝒾",
			isin: "∈",
			isinE: "⋹",
			isindot: "⋵",
			isins: "⋴",
			isinsv: "⋳",
			isinv: "∈",
			it: "⁢",
			itilde: "ĩ",
			iukcy: "і",
			ium: "ï",
			iuml: "ï",
			jcirc: "ĵ",
			jcy: "й",
			jfr: "𝔧",
			jmath: "ȷ",
			jopf: "𝕛",
			jscr: "𝒿",
			jsercy: "ј",
			jukcy: "є",
			kappa: "κ",
			kappav: "ϰ",
			kcedil: "ķ",
			kcy: "к",
			kfr: "𝔨",
			kgreen: "ĸ",
			khcy: "х",
			kjcy: "ќ",
			kopf: "𝕜",
			kscr: "𝓀",
			lAarr: "⇚",
			lArr: "⇐",
			lAtail: "⤛",
			lBarr: "⤎",
			lE: "≦",
			lEg: "⪋",
			lHar: "⥢",
			lacute: "ĺ",
			laemptyv: "⦴",
			lagran: "ℒ",
			lambda: "λ",
			lang: "⟨",
			langd: "⦑",
			langle: "⟨",
			lap: "⪅",
			laqu: "«",
			laquo: "«",
			larr: "←",
			larrb: "⇤",
			larrbfs: "⤟",
			larrfs: "⤝",
			larrhk: "↩",
			larrlp: "↫",
			larrpl: "⤹",
			larrsim: "⥳",
			larrtl: "↢",
			lat: "⪫",
			latail: "⤙",
			late: "⪭",
			lates: "⪭︀",
			lbarr: "⤌",
			lbbrk: "❲",
			lbrace: "{",
			lbrack: "[",
			lbrke: "⦋",
			lbrksld: "⦏",
			lbrkslu: "⦍",
			lcaron: "ľ",
			lcedil: "ļ",
			lceil: "⌈",
			lcub: "{",
			lcy: "л",
			ldca: "⤶",
			ldquo: "“",
			ldquor: "„",
			ldrdhar: "⥧",
			ldrushar: "⥋",
			ldsh: "↲",
			le: "≤",
			leftarrow: "←",
			leftarrowtail: "↢",
			leftharpoondown: "↽",
			leftharpoonup: "↼",
			leftleftarrows: "⇇",
			leftrightarrow: "↔",
			leftrightarrows: "⇆",
			leftrightharpoons: "⇋",
			leftrightsquigarrow: "↭",
			leftthreetimes: "⋋",
			leg: "⋚",
			leq: "≤",
			leqq: "≦",
			leqslant: "⩽",
			les: "⩽",
			lescc: "⪨",
			lesdot: "⩿",
			lesdoto: "⪁",
			lesdotor: "⪃",
			lesg: "⋚︀",
			lesges: "⪓",
			lessapprox: "⪅",
			lessdot: "⋖",
			lesseqgtr: "⋚",
			lesseqqgtr: "⪋",
			lessgtr: "≶",
			lesssim: "≲",
			lfisht: "⥼",
			lfloor: "⌊",
			lfr: "𝔩",
			lg: "≶",
			lgE: "⪑",
			lhard: "↽",
			lharu: "↼",
			lharul: "⥪",
			lhblk: "▄",
			ljcy: "љ",
			ll: "≪",
			llarr: "⇇",
			llcorner: "⌞",
			llhard: "⥫",
			lltri: "◺",
			lmidot: "ŀ",
			lmoust: "⎰",
			lmoustache: "⎰",
			lnE: "≨",
			lnap: "⪉",
			lnapprox: "⪉",
			lne: "⪇",
			lneq: "⪇",
			lneqq: "≨",
			lnsim: "⋦",
			loang: "⟬",
			loarr: "⇽",
			lobrk: "⟦",
			longleftarrow: "⟵",
			longleftrightarrow: "⟷",
			longmapsto: "⟼",
			longrightarrow: "⟶",
			looparrowleft: "↫",
			looparrowright: "↬",
			lopar: "⦅",
			lopf: "𝕝",
			loplus: "⨭",
			lotimes: "⨴",
			lowast: "∗",
			lowbar: "_",
			loz: "◊",
			lozenge: "◊",
			lozf: "⧫",
			lpar: "(",
			lparlt: "⦓",
			lrarr: "⇆",
			lrcorner: "⌟",
			lrhar: "⇋",
			lrhard: "⥭",
			lrm: "‎",
			lrtri: "⊿",
			lsaquo: "‹",
			lscr: "𝓁",
			lsh: "↰",
			lsim: "≲",
			lsime: "⪍",
			lsimg: "⪏",
			lsqb: "[",
			lsquo: "‘",
			lsquor: "‚",
			lstrok: "ł",
			l: "<",
			lt: "<",
			ltcc: "⪦",
			ltcir: "⩹",
			ltdot: "⋖",
			lthree: "⋋",
			ltimes: "⋉",
			ltlarr: "⥶",
			ltquest: "⩻",
			ltrPar: "⦖",
			ltri: "◃",
			ltrie: "⊴",
			ltrif: "◂",
			lurdshar: "⥊",
			luruhar: "⥦",
			lvertneqq: "≨︀",
			lvnE: "≨︀",
			mDDot: "∺",
			mac: "¯",
			macr: "¯",
			male: "♂",
			malt: "✠",
			maltese: "✠",
			map: "↦",
			mapsto: "↦",
			mapstodown: "↧",
			mapstoleft: "↤",
			mapstoup: "↥",
			marker: "▮",
			mcomma: "⨩",
			mcy: "м",
			mdash: "—",
			measuredangle: "∡",
			mfr: "𝔪",
			mho: "℧",
			micr: "µ",
			micro: "µ",
			mid: "∣",
			midast: "*",
			midcir: "⫰",
			middo: "·",
			middot: "·",
			minus: "−",
			minusb: "⊟",
			minusd: "∸",
			minusdu: "⨪",
			mlcp: "⫛",
			mldr: "…",
			mnplus: "∓",
			models: "⊧",
			mopf: "𝕞",
			mp: "∓",
			mscr: "𝓂",
			mstpos: "∾",
			mu: "μ",
			multimap: "⊸",
			mumap: "⊸",
			nGg: "⋙̸",
			nGt: "≫⃒",
			nGtv: "≫̸",
			nLeftarrow: "⇍",
			nLeftrightarrow: "⇎",
			nLl: "⋘̸",
			nLt: "≪⃒",
			nLtv: "≪̸",
			nRightarrow: "⇏",
			nVDash: "⊯",
			nVdash: "⊮",
			nabla: "∇",
			nacute: "ń",
			nang: "∠⃒",
			nap: "≉",
			napE: "⩰̸",
			napid: "≋̸",
			napos: "ŉ",
			napprox: "≉",
			natur: "♮",
			natural: "♮",
			naturals: "ℕ",
			nbs: "\xA0",
			nbsp: "\xA0",
			nbump: "≎̸",
			nbumpe: "≏̸",
			ncap: "⩃",
			ncaron: "ň",
			ncedil: "ņ",
			ncong: "≇",
			ncongdot: "⩭̸",
			ncup: "⩂",
			ncy: "н",
			ndash: "–",
			ne: "≠",
			neArr: "⇗",
			nearhk: "⤤",
			nearr: "↗",
			nearrow: "↗",
			nedot: "≐̸",
			nequiv: "≢",
			nesear: "⤨",
			nesim: "≂̸",
			nexist: "∄",
			nexists: "∄",
			nfr: "𝔫",
			ngE: "≧̸",
			nge: "≱",
			ngeq: "≱",
			ngeqq: "≧̸",
			ngeqslant: "⩾̸",
			nges: "⩾̸",
			ngsim: "≵",
			ngt: "≯",
			ngtr: "≯",
			nhArr: "⇎",
			nharr: "↮",
			nhpar: "⫲",
			ni: "∋",
			nis: "⋼",
			nisd: "⋺",
			niv: "∋",
			njcy: "њ",
			nlArr: "⇍",
			nlE: "≦̸",
			nlarr: "↚",
			nldr: "‥",
			nle: "≰",
			nleftarrow: "↚",
			nleftrightarrow: "↮",
			nleq: "≰",
			nleqq: "≦̸",
			nleqslant: "⩽̸",
			nles: "⩽̸",
			nless: "≮",
			nlsim: "≴",
			nlt: "≮",
			nltri: "⋪",
			nltrie: "⋬",
			nmid: "∤",
			nopf: "𝕟",
			no: "¬",
			not: "¬",
			notin: "∉",
			notinE: "⋹̸",
			notindot: "⋵̸",
			notinva: "∉",
			notinvb: "⋷",
			notinvc: "⋶",
			notni: "∌",
			notniva: "∌",
			notnivb: "⋾",
			notnivc: "⋽",
			npar: "∦",
			nparallel: "∦",
			nparsl: "⫽⃥",
			npart: "∂̸",
			npolint: "⨔",
			npr: "⊀",
			nprcue: "⋠",
			npre: "⪯̸",
			nprec: "⊀",
			npreceq: "⪯̸",
			nrArr: "⇏",
			nrarr: "↛",
			nrarrc: "⤳̸",
			nrarrw: "↝̸",
			nrightarrow: "↛",
			nrtri: "⋫",
			nrtrie: "⋭",
			nsc: "⊁",
			nsccue: "⋡",
			nsce: "⪰̸",
			nscr: "𝓃",
			nshortmid: "∤",
			nshortparallel: "∦",
			nsim: "≁",
			nsime: "≄",
			nsimeq: "≄",
			nsmid: "∤",
			nspar: "∦",
			nsqsube: "⋢",
			nsqsupe: "⋣",
			nsub: "⊄",
			nsubE: "⫅̸",
			nsube: "⊈",
			nsubset: "⊂⃒",
			nsubseteq: "⊈",
			nsubseteqq: "⫅̸",
			nsucc: "⊁",
			nsucceq: "⪰̸",
			nsup: "⊅",
			nsupE: "⫆̸",
			nsupe: "⊉",
			nsupset: "⊃⃒",
			nsupseteq: "⊉",
			nsupseteqq: "⫆̸",
			ntgl: "≹",
			ntild: "ñ",
			ntilde: "ñ",
			ntlg: "≸",
			ntriangleleft: "⋪",
			ntrianglelefteq: "⋬",
			ntriangleright: "⋫",
			ntrianglerighteq: "⋭",
			nu: "ν",
			num: "#",
			numero: "№",
			numsp: " ",
			nvDash: "⊭",
			nvHarr: "⤄",
			nvap: "≍⃒",
			nvdash: "⊬",
			nvge: "≥⃒",
			nvgt: ">⃒",
			nvinfin: "⧞",
			nvlArr: "⤂",
			nvle: "≤⃒",
			nvlt: "<⃒",
			nvltrie: "⊴⃒",
			nvrArr: "⤃",
			nvrtrie: "⊵⃒",
			nvsim: "∼⃒",
			nwArr: "⇖",
			nwarhk: "⤣",
			nwarr: "↖",
			nwarrow: "↖",
			nwnear: "⤧",
			oS: "Ⓢ",
			oacut: "ó",
			oacute: "ó",
			oast: "⊛",
			ocir: "ô",
			ocirc: "ô",
			ocy: "о",
			odash: "⊝",
			odblac: "ő",
			odiv: "⨸",
			odot: "⊙",
			odsold: "⦼",
			oelig: "œ",
			ofcir: "⦿",
			ofr: "𝔬",
			ogon: "˛",
			ograv: "ò",
			ograve: "ò",
			ogt: "⧁",
			ohbar: "⦵",
			ohm: "Ω",
			oint: "∮",
			olarr: "↺",
			olcir: "⦾",
			olcross: "⦻",
			oline: "‾",
			olt: "⧀",
			omacr: "ō",
			omega: "ω",
			omicron: "ο",
			omid: "⦶",
			ominus: "⊖",
			oopf: "𝕠",
			opar: "⦷",
			operp: "⦹",
			oplus: "⊕",
			or: "∨",
			orarr: "↻",
			ord: "º",
			order: "ℴ",
			orderof: "ℴ",
			ordf: "ª",
			ordm: "º",
			origof: "⊶",
			oror: "⩖",
			orslope: "⩗",
			orv: "⩛",
			oscr: "ℴ",
			oslas: "ø",
			oslash: "ø",
			osol: "⊘",
			otild: "õ",
			otilde: "õ",
			otimes: "⊗",
			otimesas: "⨶",
			oum: "ö",
			ouml: "ö",
			ovbar: "⌽",
			par: "¶",
			para: "¶",
			parallel: "∥",
			parsim: "⫳",
			parsl: "⫽",
			part: "∂",
			pcy: "п",
			percnt: "%",
			period: ".",
			permil: "‰",
			perp: "⊥",
			pertenk: "‱",
			pfr: "𝔭",
			phi: "φ",
			phiv: "ϕ",
			phmmat: "ℳ",
			phone: "☎",
			pi: "π",
			pitchfork: "⋔",
			piv: "ϖ",
			planck: "ℏ",
			planckh: "ℎ",
			plankv: "ℏ",
			plus: "+",
			plusacir: "⨣",
			plusb: "⊞",
			pluscir: "⨢",
			plusdo: "∔",
			plusdu: "⨥",
			pluse: "⩲",
			plusm: "±",
			plusmn: "±",
			plussim: "⨦",
			plustwo: "⨧",
			pm: "±",
			pointint: "⨕",
			popf: "𝕡",
			poun: "£",
			pound: "£",
			pr: "≺",
			prE: "⪳",
			prap: "⪷",
			prcue: "≼",
			pre: "⪯",
			prec: "≺",
			precapprox: "⪷",
			preccurlyeq: "≼",
			preceq: "⪯",
			precnapprox: "⪹",
			precneqq: "⪵",
			precnsim: "⋨",
			precsim: "≾",
			prime: "′",
			primes: "ℙ",
			prnE: "⪵",
			prnap: "⪹",
			prnsim: "⋨",
			prod: "∏",
			profalar: "⌮",
			profline: "⌒",
			profsurf: "⌓",
			prop: "∝",
			propto: "∝",
			prsim: "≾",
			prurel: "⊰",
			pscr: "𝓅",
			psi: "ψ",
			puncsp: " ",
			qfr: "𝔮",
			qint: "⨌",
			qopf: "𝕢",
			qprime: "⁗",
			qscr: "𝓆",
			quaternions: "ℍ",
			quatint: "⨖",
			quest: "?",
			questeq: "≟",
			quo: "\"",
			quot: "\"",
			rAarr: "⇛",
			rArr: "⇒",
			rAtail: "⤜",
			rBarr: "⤏",
			rHar: "⥤",
			race: "∽̱",
			racute: "ŕ",
			radic: "√",
			raemptyv: "⦳",
			rang: "⟩",
			rangd: "⦒",
			range: "⦥",
			rangle: "⟩",
			raqu: "»",
			raquo: "»",
			rarr: "→",
			rarrap: "⥵",
			rarrb: "⇥",
			rarrbfs: "⤠",
			rarrc: "⤳",
			rarrfs: "⤞",
			rarrhk: "↪",
			rarrlp: "↬",
			rarrpl: "⥅",
			rarrsim: "⥴",
			rarrtl: "↣",
			rarrw: "↝",
			ratail: "⤚",
			ratio: "∶",
			rationals: "ℚ",
			rbarr: "⤍",
			rbbrk: "❳",
			rbrace: "}",
			rbrack: "]",
			rbrke: "⦌",
			rbrksld: "⦎",
			rbrkslu: "⦐",
			rcaron: "ř",
			rcedil: "ŗ",
			rceil: "⌉",
			rcub: "}",
			rcy: "р",
			rdca: "⤷",
			rdldhar: "⥩",
			rdquo: "”",
			rdquor: "”",
			rdsh: "↳",
			real: "ℜ",
			realine: "ℛ",
			realpart: "ℜ",
			reals: "ℝ",
			rect: "▭",
			re: "®",
			reg: "®",
			rfisht: "⥽",
			rfloor: "⌋",
			rfr: "𝔯",
			rhard: "⇁",
			rharu: "⇀",
			rharul: "⥬",
			rho: "ρ",
			rhov: "ϱ",
			rightarrow: "→",
			rightarrowtail: "↣",
			rightharpoondown: "⇁",
			rightharpoonup: "⇀",
			rightleftarrows: "⇄",
			rightleftharpoons: "⇌",
			rightrightarrows: "⇉",
			rightsquigarrow: "↝",
			rightthreetimes: "⋌",
			ring: "˚",
			risingdotseq: "≓",
			rlarr: "⇄",
			rlhar: "⇌",
			rlm: "‏",
			rmoust: "⎱",
			rmoustache: "⎱",
			rnmid: "⫮",
			roang: "⟭",
			roarr: "⇾",
			robrk: "⟧",
			ropar: "⦆",
			ropf: "𝕣",
			roplus: "⨮",
			rotimes: "⨵",
			rpar: ")",
			rpargt: "⦔",
			rppolint: "⨒",
			rrarr: "⇉",
			rsaquo: "›",
			rscr: "𝓇",
			rsh: "↱",
			rsqb: "]",
			rsquo: "’",
			rsquor: "’",
			rthree: "⋌",
			rtimes: "⋊",
			rtri: "▹",
			rtrie: "⊵",
			rtrif: "▸",
			rtriltri: "⧎",
			ruluhar: "⥨",
			rx: "℞",
			sacute: "ś",
			sbquo: "‚",
			sc: "≻",
			scE: "⪴",
			scap: "⪸",
			scaron: "š",
			sccue: "≽",
			sce: "⪰",
			scedil: "ş",
			scirc: "ŝ",
			scnE: "⪶",
			scnap: "⪺",
			scnsim: "⋩",
			scpolint: "⨓",
			scsim: "≿",
			scy: "с",
			sdot: "⋅",
			sdotb: "⊡",
			sdote: "⩦",
			seArr: "⇘",
			searhk: "⤥",
			searr: "↘",
			searrow: "↘",
			sec: "§",
			sect: "§",
			semi: ";",
			seswar: "⤩",
			setminus: "∖",
			setmn: "∖",
			sext: "✶",
			sfr: "𝔰",
			sfrown: "⌢",
			sharp: "♯",
			shchcy: "щ",
			shcy: "ш",
			shortmid: "∣",
			shortparallel: "∥",
			sh: "­",
			shy: "­",
			sigma: "σ",
			sigmaf: "ς",
			sigmav: "ς",
			sim: "∼",
			simdot: "⩪",
			sime: "≃",
			simeq: "≃",
			simg: "⪞",
			simgE: "⪠",
			siml: "⪝",
			simlE: "⪟",
			simne: "≆",
			simplus: "⨤",
			simrarr: "⥲",
			slarr: "←",
			smallsetminus: "∖",
			smashp: "⨳",
			smeparsl: "⧤",
			smid: "∣",
			smile: "⌣",
			smt: "⪪",
			smte: "⪬",
			smtes: "⪬︀",
			softcy: "ь",
			sol: "/",
			solb: "⧄",
			solbar: "⌿",
			sopf: "𝕤",
			spades: "♠",
			spadesuit: "♠",
			spar: "∥",
			sqcap: "⊓",
			sqcaps: "⊓︀",
			sqcup: "⊔",
			sqcups: "⊔︀",
			sqsub: "⊏",
			sqsube: "⊑",
			sqsubset: "⊏",
			sqsubseteq: "⊑",
			sqsup: "⊐",
			sqsupe: "⊒",
			sqsupset: "⊐",
			sqsupseteq: "⊒",
			squ: "□",
			square: "□",
			squarf: "▪",
			squf: "▪",
			srarr: "→",
			sscr: "𝓈",
			ssetmn: "∖",
			ssmile: "⌣",
			sstarf: "⋆",
			star: "☆",
			starf: "★",
			straightepsilon: "ϵ",
			straightphi: "ϕ",
			strns: "¯",
			sub: "⊂",
			subE: "⫅",
			subdot: "⪽",
			sube: "⊆",
			subedot: "⫃",
			submult: "⫁",
			subnE: "⫋",
			subne: "⊊",
			subplus: "⪿",
			subrarr: "⥹",
			subset: "⊂",
			subseteq: "⊆",
			subseteqq: "⫅",
			subsetneq: "⊊",
			subsetneqq: "⫋",
			subsim: "⫇",
			subsub: "⫕",
			subsup: "⫓",
			succ: "≻",
			succapprox: "⪸",
			succcurlyeq: "≽",
			succeq: "⪰",
			succnapprox: "⪺",
			succneqq: "⪶",
			succnsim: "⋩",
			succsim: "≿",
			sum: "∑",
			sung: "♪",
			sup: "⊃",
			sup1: "¹",
			sup2: "²",
			sup3: "³",
			supE: "⫆",
			supdot: "⪾",
			supdsub: "⫘",
			supe: "⊇",
			supedot: "⫄",
			suphsol: "⟉",
			suphsub: "⫗",
			suplarr: "⥻",
			supmult: "⫂",
			supnE: "⫌",
			supne: "⊋",
			supplus: "⫀",
			supset: "⊃",
			supseteq: "⊇",
			supseteqq: "⫆",
			supsetneq: "⊋",
			supsetneqq: "⫌",
			supsim: "⫈",
			supsub: "⫔",
			supsup: "⫖",
			swArr: "⇙",
			swarhk: "⤦",
			swarr: "↙",
			swarrow: "↙",
			swnwar: "⤪",
			szli: "ß",
			szlig: "ß",
			target: "⌖",
			tau: "τ",
			tbrk: "⎴",
			tcaron: "ť",
			tcedil: "ţ",
			tcy: "т",
			tdot: "⃛",
			telrec: "⌕",
			tfr: "𝔱",
			there4: "∴",
			therefore: "∴",
			theta: "θ",
			thetasym: "ϑ",
			thetav: "ϑ",
			thickapprox: "≈",
			thicksim: "∼",
			thinsp: " ",
			thkap: "≈",
			thksim: "∼",
			thor: "þ",
			thorn: "þ",
			tilde: "˜",
			time: "×",
			times: "×",
			timesb: "⊠",
			timesbar: "⨱",
			timesd: "⨰",
			tint: "∭",
			toea: "⤨",
			top: "⊤",
			topbot: "⌶",
			topcir: "⫱",
			topf: "𝕥",
			topfork: "⫚",
			tosa: "⤩",
			tprime: "‴",
			trade: "™",
			triangle: "▵",
			triangledown: "▿",
			triangleleft: "◃",
			trianglelefteq: "⊴",
			triangleq: "≜",
			triangleright: "▹",
			trianglerighteq: "⊵",
			tridot: "◬",
			trie: "≜",
			triminus: "⨺",
			triplus: "⨹",
			trisb: "⧍",
			tritime: "⨻",
			trpezium: "⏢",
			tscr: "𝓉",
			tscy: "ц",
			tshcy: "ћ",
			tstrok: "ŧ",
			twixt: "≬",
			twoheadleftarrow: "↞",
			twoheadrightarrow: "↠",
			uArr: "⇑",
			uHar: "⥣",
			uacut: "ú",
			uacute: "ú",
			uarr: "↑",
			ubrcy: "ў",
			ubreve: "ŭ",
			ucir: "û",
			ucirc: "û",
			ucy: "у",
			udarr: "⇅",
			udblac: "ű",
			udhar: "⥮",
			ufisht: "⥾",
			ufr: "𝔲",
			ugrav: "ù",
			ugrave: "ù",
			uharl: "↿",
			uharr: "↾",
			uhblk: "▀",
			ulcorn: "⌜",
			ulcorner: "⌜",
			ulcrop: "⌏",
			ultri: "◸",
			umacr: "ū",
			um: "¨",
			uml: "¨",
			uogon: "ų",
			uopf: "𝕦",
			uparrow: "↑",
			updownarrow: "↕",
			upharpoonleft: "↿",
			upharpoonright: "↾",
			uplus: "⊎",
			upsi: "υ",
			upsih: "ϒ",
			upsilon: "υ",
			upuparrows: "⇈",
			urcorn: "⌝",
			urcorner: "⌝",
			urcrop: "⌎",
			uring: "ů",
			urtri: "◹",
			uscr: "𝓊",
			utdot: "⋰",
			utilde: "ũ",
			utri: "▵",
			utrif: "▴",
			uuarr: "⇈",
			uum: "ü",
			uuml: "ü",
			uwangle: "⦧",
			vArr: "⇕",
			vBar: "⫨",
			vBarv: "⫩",
			vDash: "⊨",
			vangrt: "⦜",
			varepsilon: "ϵ",
			varkappa: "ϰ",
			varnothing: "∅",
			varphi: "ϕ",
			varpi: "ϖ",
			varpropto: "∝",
			varr: "↕",
			varrho: "ϱ",
			varsigma: "ς",
			varsubsetneq: "⊊︀",
			varsubsetneqq: "⫋︀",
			varsupsetneq: "⊋︀",
			varsupsetneqq: "⫌︀",
			vartheta: "ϑ",
			vartriangleleft: "⊲",
			vartriangleright: "⊳",
			vcy: "в",
			vdash: "⊢",
			vee: "∨",
			veebar: "⊻",
			veeeq: "≚",
			vellip: "⋮",
			verbar: "|",
			vert: "|",
			vfr: "𝔳",
			vltri: "⊲",
			vnsub: "⊂⃒",
			vnsup: "⊃⃒",
			vopf: "𝕧",
			vprop: "∝",
			vrtri: "⊳",
			vscr: "𝓋",
			vsubnE: "⫋︀",
			vsubne: "⊊︀",
			vsupnE: "⫌︀",
			vsupne: "⊋︀",
			vzigzag: "⦚",
			wcirc: "ŵ",
			wedbar: "⩟",
			wedge: "∧",
			wedgeq: "≙",
			weierp: "℘",
			wfr: "𝔴",
			wopf: "𝕨",
			wp: "℘",
			wr: "≀",
			wreath: "≀",
			wscr: "𝓌",
			xcap: "⋂",
			xcirc: "◯",
			xcup: "⋃",
			xdtri: "▽",
			xfr: "𝔵",
			xhArr: "⟺",
			xharr: "⟷",
			xi: "ξ",
			xlArr: "⟸",
			xlarr: "⟵",
			xmap: "⟼",
			xnis: "⋻",
			xodot: "⨀",
			xopf: "𝕩",
			xoplus: "⨁",
			xotime: "⨂",
			xrArr: "⟹",
			xrarr: "⟶",
			xscr: "𝓍",
			xsqcup: "⨆",
			xuplus: "⨄",
			xutri: "△",
			xvee: "⋁",
			xwedge: "⋀",
			yacut: "ý",
			yacute: "ý",
			yacy: "я",
			ycirc: "ŷ",
			ycy: "ы",
			ye: "¥",
			yen: "¥",
			yfr: "𝔶",
			yicy: "ї",
			yopf: "𝕪",
			yscr: "𝓎",
			yucy: "ю",
			yum: "ÿ",
			yuml: "ÿ",
			zacute: "ź",
			zcaron: "ž",
			zcy: "з",
			zdot: "ż",
			zeetrf: "ℨ",
			zeta: "ζ",
			zfr: "𝔷",
			zhcy: "ж",
			zigrarr: "⇝",
			zopf: "𝕫",
			zscr: "𝓏",
			zwj: "‍",
			zwnj: "‌"
		};
	});
	us = q((P8, as) => {
		"use strict";
		var is = ns();
		as.exports = px;
		var fx = {}.hasOwnProperty;
		function px(e) {
			return fx.call(is, e) ? is[e] : !1;
		}
	});
	pr = q((O8, ks) => {
		"use strict";
		var os = Ko(), ss = Qo(), hx = bt(), mx = Zo(), ps = rs(), Dx = us();
		ks.exports = Tx;
		var dx = {}.hasOwnProperty, Rt = String.fromCharCode, gx = Function.prototype, ls = {
			warning: null,
			reference: null,
			text: null,
			warningContext: null,
			referenceContext: null,
			textContext: null,
			position: {},
			additional: null,
			attribute: !1,
			nonTerminated: !0
		}, xx = 9, cs = 10, kx = 12, Fx = 32, fs = 38, bx = 59, Ex = 60, wx = 61, Cx = 35, yx = 88, vx = 120, Ax = 65533, Mt = "named", Vi = "hexadecimal", Gi = "decimal", ji = {};
		ji[Vi] = 16;
		ji[Gi] = 10;
		var an = {};
		an[Mt] = ps;
		an[Gi] = hx;
		an[Vi] = mx;
		var hs = 1, ms = 2, Ds = 3, ds = 4, gs = 5, Hi = 6, xs = 7, at = {};
		at[hs] = "Named character references must be terminated by a semicolon";
		at[ms] = "Numeric character references must be terminated by a semicolon";
		at[Ds] = "Named character references cannot be empty";
		at[ds] = "Numeric character references cannot be empty";
		at[gs] = "Named character references must be known";
		at[Hi] = "Numeric character references cannot be disallowed";
		at[xs] = "Numeric character references cannot be outside the permissible Unicode range";
		function Tx(e, t) {
			var r = {}, n, i;
			t || (t = {});
			for (i in ls) n = t[i], r[i] = n ?? ls[i];
			return (r.position.indent || r.position.start) && (r.indent = r.position.indent || [], r.position = r.position.start), Sx(e, r);
		}
		function Sx(e, t) {
			var r = t.additional, n = t.nonTerminated, i = t.text, u = t.reference, a = t.warning, o = t.textContext, s = t.referenceContext, l = t.warningContext, f = t.position, c = t.indent || [], p = e.length, m = 0, D = -1, x = f.column || 1, g = f.line || 1, k = "", E = [], w, T, y, d, v, L, C, b, _, I, S, R, O, z, N, j, ne, h, W;
			for (typeof r == "string" && (r = r.charCodeAt(0)), j = ie(), b = a ? F : gx, m--, p++; ++m < p;) if (v === cs && (x = c[D] || 1), v = e.charCodeAt(m), v === fs) {
				if (C = e.charCodeAt(m + 1), C === xx || C === cs || C === kx || C === Fx || C === fs || C === Ex || C !== C || r && C === r) {
					k += Rt(v), x++;
					continue;
				}
				for (O = m + 1, R = O, W = O, C === Cx ? (W = ++R, C = e.charCodeAt(W), C === yx || C === vx ? (z = Vi, W = ++R) : z = Gi) : z = Mt, w = "", S = "", d = "", N = an[z], W--; ++W < p && (C = e.charCodeAt(W), !!N(C));) d += Rt(C), z === Mt && dx.call(os, d) && (w = d, S = os[d]);
				y = e.charCodeAt(W) === bx, y && (W++, T = z === Mt ? Dx(d) : !1, T && (w = d, S = T)), h = 1 + W - O, !y && !n || (d ? z === Mt ? (y && !S ? b(gs, 1) : (w !== d && (W = R + w.length, h = 1 + W - R, y = !1), y || (_ = w ? hs : Ds, t.attribute ? (C = e.charCodeAt(W), C === wx ? (b(_, h), S = null) : ps(C) ? S = null : b(_, h)) : b(_, h))), L = S) : (y || b(ms, h), L = parseInt(d, ji[z]), Lx(L) ? (b(xs, h), L = Rt(Ax)) : L in ss ? (b(Hi, h), L = ss[L]) : (I = "", Ix(L) && b(Hi, h), L > 65535 && (L -= 65536, I += Rt(L >>> 10 | 55296), L = 56320 | L & 1023), L = I + Rt(L))) : z !== Mt && b(ds, h)), L ? (ee(), j = ie(), m = W - 1, x += W - O + 1, E.push(L), ne = ie(), ne.offset++, u && u.call(s, L, {
					start: j,
					end: ne
				}, e.slice(O - 1, W)), j = ne) : (d = e.slice(O - 1, W), k += d, x += d.length, m = W - 1);
			} else v === 10 && (g++, D++, x = 0), v === v ? (k += Rt(v), x++) : ee();
			return E.join("");
			function ie() {
				return {
					line: g,
					column: x,
					offset: m + (f.offset || 0)
				};
			}
			function F(ce, te) {
				var tt = ie();
				tt.column += te, tt.offset += te, a.call(l, at[ce], tt, ce);
			}
			function ee() {
				k && (E.push(k), i && i.call(o, k, {
					start: j,
					end: ie()
				}), k = "");
			}
		}
		function Lx(e) {
			return e >= 55296 && e <= 57343 || e > 1114111;
		}
		function Ix(e) {
			return e >= 1 && e <= 8 || e === 11 || e >= 13 && e <= 31 || e >= 127 && e <= 159 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534;
		}
	});
	Es = q((N8, bs) => {
		"use strict";
		var qx = Ft(), Fs = pr();
		bs.exports = Bx;
		function Bx(e) {
			return r.raw = n, r;
			function t(u) {
				for (var a = e.offset, o = u.line, s = []; ++o && o in a;) s.push((a[o] || 0) + 1);
				return {
					start: u,
					indent: s
				};
			}
			function r(u, a, o) {
				Fs(u, {
					position: t(a),
					warning: i,
					text: o,
					reference: o,
					textContext: e,
					referenceContext: e
				});
			}
			function n(u, a, o) {
				return Fs(u, qx(o, {
					position: t(a),
					warning: i
				}));
			}
			function i(u, a, o) {
				o !== 3 && e.file.message(u, a);
			}
		}
	});
	ys = q((R8, Cs) => {
		"use strict";
		Cs.exports = _x;
		function _x(e) {
			return t;
			function t(r, n) {
				var i = this, u = i.offset, a = [], o = i[e + "Methods"], s = i[e + "Tokenizers"], l = n.line, f = n.column, c, p, m, D, x, g;
				if (!r) return a;
				for (L.now = w, L.file = i.file, k(""); r;) {
					for (c = -1, p = o.length, x = !1; ++c < p && (D = o[c], m = s[D], !(m && (!m.onlyAtStart || i.atStart) && (!m.notInList || !i.inList) && (!m.notInBlock || !i.inBlock) && (!m.notInLink || !i.inLink) && (g = r.length, m.apply(i, [L, r]), x = g !== r.length, x))););
					x || i.file.fail(/* @__PURE__ */ new Error("Infinite loop"), L.now());
				}
				return i.eof = w(), a;
				function k(C) {
					for (var b = -1, _ = C.indexOf(`
`); _ !== -1;) l++, b = _, _ = C.indexOf(`
`, _ + 1);
					b === -1 ? f += C.length : f = C.length - b, l in u && (b !== -1 ? f += u[l] : f <= u[l] && (f = u[l] + 1));
				}
				function E() {
					var C = [], b = l + 1;
					return function() {
						for (var _ = l + 1; b < _;) C.push((u[b] || 0) + 1), b++;
						return C;
					};
				}
				function w() {
					var C = {
						line: l,
						column: f
					};
					return C.offset = i.toOffset(C), C;
				}
				function T(C) {
					this.start = C, this.end = w();
				}
				function y(C) {
					r.slice(0, C.length) !== C && i.file.fail(/* @__PURE__ */ new Error("Incorrectly eaten value: please report this warning on https://git.io/vg5Ft"), w());
				}
				function d() {
					var C = w();
					return b;
					function b(_, I) {
						var S = _.position, R = S ? S.start : C, O = [], z = S && S.end.line, N = C.line;
						if (_.position = new T(R), S && I && S.indent) {
							if (O = S.indent, z < N) {
								for (; ++z < N;) O.push((u[z] || 0) + 1);
								O.push(C.column);
							}
							I = O.concat(I);
						}
						return _.position.indent = I || [], _;
					}
				}
				function v(C, b) {
					var _ = b ? b.children : a, I = _[_.length - 1], S;
					return I && C.type === I.type && (C.type === "text" || C.type === "blockquote") && ws(I) && ws(C) && (S = C.type === "text" ? Px : Ox, C = S.call(i, I, C)), C !== I && _.push(C), i.atStart && a.length !== 0 && i.exitStart(), C;
				}
				function L(C) {
					var b = E(), _ = d(), I = w();
					return y(C), S.reset = R, R.test = O, S.test = O, r = r.slice(C.length), k(C), b = b(), S;
					function S(z, N) {
						return _(v(_(z), N), b);
					}
					function R() {
						var z = S.apply(null, arguments);
						return l = I.line, f = I.column, r = C + r, z;
					}
					function O() {
						var z = _({});
						return l = I.line, f = I.column, r = C + r, z.position;
					}
				}
			}
		}
		function ws(e) {
			var t, r;
			return e.type !== "text" || !e.position ? !0 : (t = e.position.start, r = e.position.end, t.line !== r.line || r.column - t.column === e.value.length);
		}
		function Px(e, t) {
			return e.value += t.value, e;
		}
		function Ox(e, t) {
			return this.options.commonmark || this.options.gfm ? t : (e.children = e.children.concat(t.children), e);
		}
	});
	Ts = q((M8, As) => {
		"use strict";
		As.exports = un;
		var Wi = [
			"\\",
			"`",
			"*",
			"{",
			"}",
			"[",
			"]",
			"(",
			")",
			"#",
			"+",
			"-",
			".",
			"!",
			"_",
			">"
		], Yi = Wi.concat(["~", "|"]), vs = Yi.concat([
			`
`,
			"\"",
			"$",
			"%",
			"&",
			"'",
			",",
			"/",
			":",
			";",
			"<",
			"=",
			"?",
			"@",
			"^"
		]);
		un.default = Wi;
		un.gfm = Yi;
		un.commonmark = vs;
		function un(e) {
			var t = e || {};
			return t.commonmark ? vs : t.gfm ? Yi : Wi;
		}
	});
	Ls = q((z8, Ss) => {
		"use strict";
		Ss.exports = [
			"address",
			"article",
			"aside",
			"base",
			"basefont",
			"blockquote",
			"body",
			"caption",
			"center",
			"col",
			"colgroup",
			"dd",
			"details",
			"dialog",
			"dir",
			"div",
			"dl",
			"dt",
			"fieldset",
			"figcaption",
			"figure",
			"footer",
			"form",
			"frame",
			"frameset",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"head",
			"header",
			"hgroup",
			"hr",
			"html",
			"iframe",
			"legend",
			"li",
			"link",
			"main",
			"menu",
			"menuitem",
			"meta",
			"nav",
			"noframes",
			"ol",
			"optgroup",
			"option",
			"p",
			"param",
			"pre",
			"section",
			"source",
			"title",
			"summary",
			"table",
			"tbody",
			"td",
			"tfoot",
			"th",
			"thead",
			"title",
			"tr",
			"track",
			"ul"
		];
	});
	$i = q((U8, Is) => {
		"use strict";
		Is.exports = {
			position: !0,
			gfm: !0,
			commonmark: !1,
			pedantic: !1,
			blocks: Ls()
		};
	});
	Bs = q((H8, qs) => {
		"use strict";
		var Nx = Ft(), Rx = Ts(), Mx = $i();
		qs.exports = zx;
		function zx(e) {
			var t = this, r = t.options, n, i;
			if (e == null) e = {};
			else if (typeof e == "object") e = Nx(e);
			else throw new Error("Invalid value `" + e + "` for setting `options`");
			for (n in Mx) {
				if (i = e[n], i ??= r[n], n !== "blocks" && typeof i != "boolean" || n === "blocks" && typeof i != "object") throw new Error("Invalid value `" + i + "` for setting `options." + n + "`");
				e[n] = i;
			}
			return t.options = e, t.escape = Rx(e), t;
		}
	});
	Os = q((V8, Ps) => {
		"use strict";
		Ps.exports = _s;
		function _s(e) {
			if (e == null) return Gx;
			if (typeof e == "string") return Vx(e);
			if (typeof e == "object") return "length" in e ? Hx(e) : Ux(e);
			if (typeof e == "function") return e;
			throw new Error("Expected function, string, or object as test");
		}
		function Ux(e) {
			return t;
			function t(r) {
				var n;
				for (n in e) if (r[n] !== e[n]) return !1;
				return !0;
			}
		}
		function Hx(e) {
			for (var t = [], r = -1; ++r < e.length;) t[r] = _s(e[r]);
			return n;
			function n() {
				for (var i = -1; ++i < t.length;) if (t[i].apply(this, arguments)) return !0;
				return !1;
			}
		}
		function Vx(e) {
			return t;
			function t(r) {
				return !!(r && r.type === e);
			}
		}
		function Gx() {
			return !0;
		}
	});
	Rs = q((G8, Ns) => {
		Ns.exports = jx;
		function jx(e) {
			return e;
		}
	});
	Hs = q((j8, Us) => {
		"use strict";
		Us.exports = on;
		var Wx = Os(), Yx = Rs(), Ms = !0, zs = "skip", Ki = !1;
		on.CONTINUE = Ms;
		on.SKIP = zs;
		on.EXIT = Ki;
		function on(e, t, r, n) {
			var i, u;
			typeof t == "function" && typeof r != "function" && (n = r, r = t, t = null), u = Wx(t), i = n ? -1 : 1, a(e, null, [])();
			function a(o, s, l) {
				var f = typeof o == "object" && o !== null ? o : {}, c;
				return typeof f.type == "string" && (c = typeof f.tagName == "string" ? f.tagName : typeof f.name == "string" ? f.name : void 0, p.displayName = "node (" + Yx(f.type + (c ? "<" + c + ">" : "")) + ")"), p;
				function p() {
					var m = l.concat(o), D = [], x, g;
					if ((!t || u(o, s, l[l.length - 1] || null)) && (D = $x(r(o, l)), D[0] === Ki)) return D;
					if (o.children && D[0] !== zs) for (g = (n ? o.children.length : -1) + i; g > -1 && g < o.children.length;) {
						if (x = a(o.children[g], g, m)(), x[0] === Ki) return x;
						g = typeof x[1] == "number" ? x[1] : g + i;
					}
					return D;
				}
			}
		}
		function $x(e) {
			return e !== null && typeof e == "object" && "length" in e ? e : typeof e == "number" ? [Ms, e] : [e];
		}
	});
	Gs = q((W8, Vs) => {
		"use strict";
		Vs.exports = ln;
		var sn = Hs(), Kx = sn.CONTINUE, Qx = sn.SKIP, Jx = sn.EXIT;
		ln.CONTINUE = Kx;
		ln.SKIP = Qx;
		ln.EXIT = Jx;
		function ln(e, t, r, n) {
			typeof t == "function" && typeof r != "function" && (n = r, r = t, t = null), sn(e, t, i, n);
			function i(u, a) {
				var o = a[a.length - 1], s = o ? o.children.indexOf(u) : null;
				return r(u, s, o);
			}
		}
	});
	Ws = q((Y8, js) => {
		"use strict";
		var Xx = Gs();
		js.exports = Zx;
		function Zx(e, t) {
			return Xx(e, t ? e1 : t1), e;
		}
		function e1(e) {
			delete e.position;
		}
		function t1(e) {
			e.position = void 0;
		}
	});
	Ks = q(($8, $s) => {
		"use strict";
		var Ys = Ft(), r1 = Ws();
		$s.exports = a1;
		var n1 = `
`, i1 = /\r\n|\r/g;
		function a1() {
			var e = this, t = String(e.file), r = {
				line: 1,
				column: 1,
				offset: 0
			}, n = Ys(r), i;
			return t = t.replace(i1, n1), t.charCodeAt(0) === 65279 && (t = t.slice(1), n.column++, n.offset++), i = {
				type: "root",
				children: e.tokenizeBlock(t, n),
				position: {
					start: r,
					end: e.eof || Ys(r)
				}
			}, e.options.position || r1(i, !0), i;
		}
	});
	Js = q((K8, Qs) => {
		"use strict";
		var u1 = /^[ \t]*(\n|$)/;
		Qs.exports = o1;
		function o1(e, t, r) {
			for (var n, i = "", u = 0, a = t.length; u < a && (n = u1.exec(t.slice(u)), n != null);) u += n[0].length, i += n[0];
			if (i !== "") {
				if (r) return !0;
				e(i);
			}
		}
	});
	cn = q((Q8, Xs) => {
		"use strict";
		var je = "", Qi;
		Xs.exports = s1;
		function s1(e, t) {
			if (typeof e != "string") throw new TypeError("expected a string");
			if (t === 1) return e;
			if (t === 2) return e + e;
			var r = e.length * t;
			if (Qi !== e || typeof Qi > "u") Qi = e, je = "";
			else if (je.length >= r) return je.substr(0, r);
			for (; r > je.length && t > 1;) t & 1 && (je += e), t >>= 1, e += e;
			return je += e, je = je.substr(0, r), je;
		}
	});
	Ji = q((J8, Zs) => {
		"use strict";
		Zs.exports = l1;
		function l1(e) {
			return String(e).replace(/\n+$/, "");
		}
	});
	rl = q((X8, tl) => {
		"use strict";
		var c1 = cn(), f1 = Ji();
		tl.exports = m1;
		var Xi = `
`, el = "	", Zi = " ", h1 = c1(Zi, 4);
		function m1(e, t, r) {
			for (var n = -1, i = t.length, u = "", a = "", o = "", s = "", l, f, c; ++n < i;) if (l = t.charAt(n), c) if (c = !1, u += o, a += s, o = "", s = "", l === Xi) o = l, s = l;
			else for (u += l, a += l; ++n < i;) {
				if (l = t.charAt(n), !l || l === Xi) {
					s = l, o = l;
					break;
				}
				u += l, a += l;
			}
			else if (l === Zi && t.charAt(n + 1) === l && t.charAt(n + 2) === l && t.charAt(n + 3) === l) o += h1, n += 3, c = !0;
			else if (l === el) o += l, c = !0;
			else {
				for (f = ""; l === el || l === Zi;) f += l, l = t.charAt(++n);
				if (l !== Xi) break;
				o += f + l, s += l;
			}
			if (a) return r ? !0 : e(u)({
				type: "code",
				lang: null,
				meta: null,
				value: f1(a)
			});
		}
	});
	al = q((Z8, il) => {
		"use strict";
		il.exports = x1;
		var fn = `
`, hr = "	", zt = " ", D1 = "~", nl = "`", d1 = 3, g1 = 4;
		function x1(e, t, r) {
			var n = this, i = n.options.gfm, u = t.length + 1, a = 0, o = "", s, l, f, c, p, m, D, x, g, k, E, w, T;
			if (i) {
				for (; a < u && (f = t.charAt(a), !(f !== zt && f !== hr));) o += f, a++;
				if (w = a, f = t.charAt(a), !(f !== D1 && f !== nl)) {
					for (a++, l = f, s = 1, o += f; a < u && (f = t.charAt(a), f === l);) o += f, s++, a++;
					if (!(s < d1)) {
						for (; a < u && (f = t.charAt(a), !(f !== zt && f !== hr));) o += f, a++;
						for (c = "", D = ""; a < u && (f = t.charAt(a), !(f === fn || l === nl && f === l));) f === zt || f === hr ? D += f : (c += D + f, D = ""), a++;
						if (f = t.charAt(a), !(f && f !== fn)) {
							if (r) return !0;
							T = e.now(), T.column += o.length, T.offset += o.length, o += c, c = n.decode.raw(n.unescape(c), T), D && (o += D), D = "", k = "", E = "", x = "", g = "";
							for (var y = !0; a < u;) {
								if (f = t.charAt(a), x += k, g += E, k = "", E = "", f !== fn) {
									x += f, E += f, a++;
									continue;
								}
								for (y ? (o += f, y = !1) : (k += f, E += f), D = "", a++; a < u && (f = t.charAt(a), f === zt);) D += f, a++;
								if (k += D, E += D.slice(w), !(D.length >= g1)) {
									for (D = ""; a < u && (f = t.charAt(a), f === l);) D += f, a++;
									if (k += D, E += D, !(D.length < s)) {
										for (D = ""; a < u && (f = t.charAt(a), !(f !== zt && f !== hr));) k += f, E += f, a++;
										if (!f || f === fn) break;
									}
								}
							}
							for (o += x + k, a = -1, u = c.length; ++a < u;) if (f = c.charAt(a), f === zt || f === hr) p || (p = c.slice(0, a));
							else if (p) {
								m = c.slice(a);
								break;
							}
							return e(o)({
								type: "code",
								lang: p || c || null,
								meta: m || null,
								value: g
							});
						}
					}
				}
			}
		}
	});
	Et = q((Ut, ul) => {
		Ut = ul.exports = k1;
		function k1(e) {
			return e.trim ? e.trim() : Ut.right(Ut.left(e));
		}
		Ut.left = function(e) {
			return e.trimLeft ? e.trimLeft() : e.replace(/^\s\s*/, "");
		};
		Ut.right = function(e) {
			if (e.trimRight) return e.trimRight();
			for (var t = /\s/, r = e.length; t.test(e.charAt(--r)););
			return e.slice(0, r + 1);
		};
	});
	pn = q((eT, ol) => {
		"use strict";
		ol.exports = F1;
		function F1(e, t, r, n) {
			for (var i = e.length, u = -1, a, o; ++u < i;) if (a = e[u], o = a[1] || {}, !(o.pedantic !== void 0 && o.pedantic !== r.options.pedantic) && !(o.commonmark !== void 0 && o.commonmark !== r.options.commonmark) && t[a[0]].apply(r, n)) return !0;
			return !1;
		}
	});
	fl = q((tT, cl) => {
		"use strict";
		var b1 = Et(), E1 = pn();
		cl.exports = w1;
		var ea = `
`, sl = "	", ta = " ", ll = ">";
		function w1(e, t, r) {
			for (var n = this, i = n.offset, u = n.blockTokenizers, a = n.interruptBlockquote, o = e.now(), s = o.line, l = t.length, f = [], c = [], p = [], m, D = 0, x, g, k, E, w, T, y, d; D < l && (x = t.charAt(D), !(x !== ta && x !== sl));) D++;
			if (t.charAt(D) === ll) {
				if (r) return !0;
				for (D = 0; D < l;) {
					for (k = t.indexOf(ea, D), T = D, y = !1, k === -1 && (k = l); D < l && (x = t.charAt(D), !(x !== ta && x !== sl));) D++;
					if (t.charAt(D) === ll ? (D++, y = !0, t.charAt(D) === ta && D++) : D = T, E = t.slice(D, k), !y && !b1(E)) {
						D = T;
						break;
					}
					if (!y && (g = t.slice(D), E1(a, u, n, [
						e,
						g,
						!0
					]))) break;
					w = T === D ? E : t.slice(T, k), p.push(D - T), f.push(w), c.push(E), D = k + 1;
				}
				for (D = -1, l = p.length, m = e(f.join(ea)); ++D < l;) i[s] = (i[s] || 0) + p[D], s++;
				return d = n.enterBlock(), c = n.tokenizeBlock(c.join(ea), o), d(), m({
					type: "blockquote",
					children: c
				});
			}
		}
	});
	ml = q((rT, hl) => {
		"use strict";
		hl.exports = y1;
		var pl = `
`, mr = "	", Dr = " ", dr = "#", C1 = 6;
		function y1(e, t, r) {
			for (var n = this, i = n.options.pedantic, u = t.length + 1, a = -1, o = e.now(), s = "", l = "", f, c, p; ++a < u;) {
				if (f = t.charAt(a), f !== Dr && f !== mr) {
					a--;
					break;
				}
				s += f;
			}
			for (p = 0; ++a <= u;) {
				if (f = t.charAt(a), f !== dr) {
					a--;
					break;
				}
				s += f, p++;
			}
			if (!(p > C1) && !(!p || !i && t.charAt(a + 1) === dr)) {
				for (u = t.length + 1, c = ""; ++a < u;) {
					if (f = t.charAt(a), f !== Dr && f !== mr) {
						a--;
						break;
					}
					c += f;
				}
				if (!(!i && c.length === 0 && f && f !== pl)) {
					if (r) return !0;
					for (s += c, c = "", l = ""; ++a < u && (f = t.charAt(a), !(!f || f === pl));) {
						if (f !== Dr && f !== mr && f !== dr) {
							l += c + f, c = "";
							continue;
						}
						for (; f === Dr || f === mr;) c += f, f = t.charAt(++a);
						if (!i && l && !c && f === dr) {
							l += f;
							continue;
						}
						for (; f === dr;) c += f, f = t.charAt(++a);
						for (; f === Dr || f === mr;) c += f, f = t.charAt(++a);
						a--;
					}
					return o.column += s.length, o.offset += s.length, s += l + c, e(s)({
						type: "heading",
						depth: p,
						children: n.tokenizeInline(l, o)
					});
				}
			}
		}
	});
	gl = q((nT, dl) => {
		"use strict";
		dl.exports = q1;
		var v1 = "	", A1 = `
`, Dl = " ", T1 = "*", S1 = "-", L1 = "_", I1 = 3;
		function q1(e, t, r) {
			for (var n = -1, i = t.length + 1, u = "", a, o, s, l; ++n < i && (a = t.charAt(n), !(a !== v1 && a !== Dl));) u += a;
			if (!(a !== T1 && a !== S1 && a !== L1)) for (o = a, u += a, s = 1, l = ""; ++n < i;) if (a = t.charAt(n), a === o) s++, u += l + o, l = "";
			else if (a === Dl) l += a;
			else return s >= I1 && (!a || a === A1) ? (u += l, r ? !0 : e(u)({ type: "thematicBreak" })) : void 0;
		}
	});
	ra = q((iT, kl) => {
		"use strict";
		kl.exports = O1;
		var xl = "	", B1 = " ", _1 = 1, P1 = 4;
		function O1(e) {
			for (var t = 0, r = 0, n = e.charAt(t), i = {}, u, a = 0; n === xl || n === B1;) {
				for (u = n === xl ? P1 : _1, r += u, u > 1 && (r = Math.floor(r / u) * u); a < r;) i[++a] = t;
				n = e.charAt(++t);
			}
			return {
				indent: r,
				stops: i
			};
		}
	});
	El = q((aT, bl) => {
		"use strict";
		var N1 = Et(), R1 = cn(), M1 = ra();
		bl.exports = H1;
		var Fl = `
`, z1 = " ", U1 = "!";
		function H1(e, t) {
			var r = e.split(Fl), n = r.length + 1, i = Infinity, u = [], a, o, s;
			for (r.unshift(R1(z1, t) + U1); n--;) if (o = M1(r[n]), u[n] = o.stops, N1(r[n]).length !== 0) if (o.indent) o.indent > 0 && o.indent < i && (i = o.indent);
			else {
				i = Infinity;
				break;
			}
			if (i !== Infinity) for (n = r.length; n--;) {
				for (s = u[n], a = i; a && !(a in s);) a--;
				r[n] = r[n].slice(s[a] + 1);
			}
			return r.shift(), r.join(Fl);
		}
	});
	Tl = q((uT, Al) => {
		"use strict";
		var V1 = Et(), G1 = cn(), wl = bt(), j1 = ra(), W1 = El(), Y1 = pn();
		Al.exports = tk;
		var na = "*", $1 = "_", Cl = "+", ia = "-", yl = ".", We = " ", Pe = `
`, hn = "	", vl = ")", K1 = "x", ut = 4, Q1 = /\n\n(?!\s*$)/, J1 = /^\[([ X\tx])][ \t]/, X1 = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/, Z1 = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/, ek = /^( {1,4}|\t)?/gm;
		function tk(e, t, r) {
			for (var n = this, i = n.options.commonmark, u = n.options.pedantic, a = n.blockTokenizers, o = n.interruptList, s = 0, l = t.length, f = null, c, p, m, D, x, g, k, E, w, T, y, d, v, L, C, b, _, I, S, R = !1, O, z, N, j; s < l && (D = t.charAt(s), !(D !== hn && D !== We));) s++;
			if (D = t.charAt(s), D === na || D === Cl || D === ia) x = D, m = !1;
			else {
				for (m = !0, p = ""; s < l && (D = t.charAt(s), !!wl(D));) p += D, s++;
				if (D = t.charAt(s), !p || !(D === yl || i && D === vl) || r && p !== "1") return;
				f = parseInt(p, 10), x = D;
			}
			if (D = t.charAt(++s), !(D !== We && D !== hn && (u || D !== Pe && D !== ""))) {
				if (r) return !0;
				for (s = 0, L = [], C = [], b = []; s < l;) {
					for (g = t.indexOf(Pe, s), k = s, E = !1, j = !1, g === -1 && (g = l), c = 0; s < l;) {
						if (D = t.charAt(s), D === hn) c += ut - c % ut;
						else if (D === We) c++;
						else break;
						s++;
					}
					if (_ && c >= _.indent && (j = !0), D = t.charAt(s), w = null, !j) {
						if (D === na || D === Cl || D === ia) w = D, s++, c++;
						else {
							for (p = ""; s < l && (D = t.charAt(s), !!wl(D));) p += D, s++;
							D = t.charAt(s), s++, p && (D === yl || i && D === vl) && (w = D, c += p.length + 1);
						}
						if (w) if (D = t.charAt(s), D === hn) c += ut - c % ut, s++;
						else if (D === We) {
							for (N = s + ut; s < N && t.charAt(s) === We;) s++, c++;
							s === N && t.charAt(s) === We && (s -= ut - 1, c -= ut - 1);
						} else D !== Pe && D !== "" && (w = null);
					}
					if (w) {
						if (!u && x !== w) break;
						E = !0;
					} else !i && !j && t.charAt(k) === We ? j = !0 : i && _ && (j = c >= _.indent || c > ut), E = !1, s = k;
					if (y = t.slice(k, g), T = k === s ? y : t.slice(s, g), (w === na || w === $1 || w === ia) && a.thematicBreak.call(n, e, y, !0)) break;
					if (d = v, v = !E && !V1(T).length, j && _) _.value = _.value.concat(b, y), C = C.concat(b, y), b = [];
					else if (E) b.length !== 0 && (R = !0, _.value.push(""), _.trail = b.concat()), _ = {
						value: [y],
						indent: c,
						trail: []
					}, L.push(_), C = C.concat(b, y), b = [];
					else if (v) {
						if (d && !i) break;
						b.push(y);
					} else {
						if (d || Y1(o, a, n, [
							e,
							y,
							!0
						])) break;
						_.value = _.value.concat(b, y), C = C.concat(b, y), b = [];
					}
					s = g + 1;
				}
				for (O = e(C.join(Pe)).reset({
					type: "list",
					ordered: m,
					start: f,
					spread: R,
					children: []
				}), I = n.enterList(), S = n.enterBlock(), s = -1, l = L.length; ++s < l;) _ = L[s].value.join(Pe), z = e.now(), e(_)(rk(n, _, z), O), _ = L[s].trail.join(Pe), s !== l - 1 && (_ += Pe), e(_);
				return I(), S(), O;
			}
		}
		function rk(e, t, r) {
			var n = e.offset, i = e.options.pedantic ? nk : ik, u = null, a, o;
			return t = i.apply(null, arguments), e.options.gfm && (a = t.match(J1), a && (o = a[0].length, u = a[1].toLowerCase() === K1, n[r.line] += o, t = t.slice(o))), {
				type: "listItem",
				spread: Q1.test(t),
				checked: u,
				children: e.tokenizeBlock(t, r)
			};
		}
		function nk(e, t, r) {
			var n = e.offset, i = r.line;
			return t = t.replace(Z1, u), i = r.line, t.replace(ek, u);
			function u(a) {
				return n[i] = (n[i] || 0) + a.length, i++, "";
			}
		}
		function ik(e, t, r) {
			var n = e.offset, i = r.line, u, a, o, s, l, f, c;
			for (t = t.replace(X1, p), s = t.split(Pe), l = W1(t, j1(u).indent).split(Pe), l[0] = o, n[i] = (n[i] || 0) + a.length, i++, f = 0, c = s.length; ++f < c;) n[i] = (n[i] || 0) + s[f].length - l[f].length, i++;
			return l.join(Pe);
			function p(m, D, x, g, k) {
				return a = D + x + g, o = k, Number(x) < 10 && a.length % 2 === 1 && (x = We + x), u = D + G1(We, x.length) + g, u + o;
			}
		}
	});
	ql = q((oT, Il) => {
		"use strict";
		Il.exports = ck;
		var aa = `
`, ak = "	", Sl = " ", Ll = "=", uk = "-", ok = 3, sk = 1, lk = 2;
		function ck(e, t, r) {
			for (var n = this, i = e.now(), u = t.length, a = -1, o = "", s, l, f, c, p; ++a < u;) {
				if (f = t.charAt(a), f !== Sl || a >= ok) {
					a--;
					break;
				}
				o += f;
			}
			for (s = "", l = ""; ++a < u;) {
				if (f = t.charAt(a), f === aa) {
					a--;
					break;
				}
				f === Sl || f === ak ? l += f : (s += l + f, l = "");
			}
			if (i.column += o.length, i.offset += o.length, o += s + l, f = t.charAt(++a), c = t.charAt(++a), !(f !== aa || c !== Ll && c !== uk)) {
				for (o += f, l = c, p = c === Ll ? sk : lk; ++a < u;) {
					if (f = t.charAt(a), f !== c) {
						if (f !== aa) return;
						a--;
						break;
					}
					l += f;
				}
				return r ? !0 : e(o + l)({
					type: "heading",
					depth: p,
					children: n.tokenizeInline(s, i)
				});
			}
		}
	});
	oa = q((ua) => {
		"use strict";
		var Bl = "<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\u0000-\\u0020]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>", _l = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", gk = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", xk = "<[?].*?[?]>", kk = "<![A-Za-z]+\\s+[^>]*>", Fk = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
		ua.openCloseTag = new RegExp("^(?:" + Bl + "|" + _l + ")");
		ua.tag = new RegExp("^(?:" + Bl + "|" + _l + "|" + gk + "|" + xk + "|" + kk + "|" + Fk + ")");
	});
	Rl = q((lT, Nl) => {
		"use strict";
		var bk = oa().openCloseTag;
		Nl.exports = Ok;
		var Ek = "	", wk = " ", Pl = `
`, Ck = "<", yk = /^<(script|pre|style)(?=(\s|>|$))/i, vk = /<\/(script|pre|style)>/i, Ak = /^<!--/, Tk = /-->/, Sk = /^<\?/, Lk = /\?>/, Ik = /^<![A-Za-z]/, qk = />/, Bk = /^<!\[CDATA\[/, _k = /]]>/, Ol = /^$/, Pk = new RegExp(bk.source + "\\s*$");
		function Ok(e, t, r) {
			for (var i = this.options.blocks.join("|"), u = new RegExp("^</?(" + i + ")(?=(\\s|/?>|$))", "i"), a = t.length, o = 0, s, l, f, c, p, m, D, x = [
				[
					yk,
					vk,
					!0
				],
				[
					Ak,
					Tk,
					!0
				],
				[
					Sk,
					Lk,
					!0
				],
				[
					Ik,
					qk,
					!0
				],
				[
					Bk,
					_k,
					!0
				],
				[
					u,
					Ol,
					!0
				],
				[
					Pk,
					Ol,
					!1
				]
			]; o < a && (c = t.charAt(o), !(c !== Ek && c !== wk));) o++;
			if (t.charAt(o) === Ck) {
				for (s = t.indexOf(Pl, o + 1), s = s === -1 ? a : s, l = t.slice(o, s), f = -1, p = x.length; ++f < p;) if (x[f][0].test(l)) {
					m = x[f];
					break;
				}
				if (m) {
					if (r) return m[2];
					if (o = s, !m[1].test(l)) for (; o < a;) {
						if (s = t.indexOf(Pl, o + 1), s = s === -1 ? a : s, l = t.slice(o + 1, s), m[1].test(l)) {
							l && (o = s);
							break;
						}
						o = s;
					}
					return D = t.slice(0, o), e(D)({
						type: "html",
						value: D
					});
				}
			}
		}
	});
	Oe = q((cT, Ml) => {
		"use strict";
		Ml.exports = Mk;
		var Nk = String.fromCharCode, Rk = /\s/;
		function Mk(e) {
			return Rk.test(typeof e == "number" ? Nk(e) : e.charAt(0));
		}
	});
	mn = q((fT, zl) => {
		"use strict";
		zl.exports = zk;
		function zk(e) {
			return String(e).replace(/\s+/g, " ");
		}
	});
	sa = q((pT, Ul) => {
		"use strict";
		var Uk = mn();
		Ul.exports = Hk;
		function Hk(e) {
			return Uk(e).toLowerCase();
		}
	});
	$l = q((hT, Yl) => {
		"use strict";
		var Vk = Oe(), Gk = sa();
		Yl.exports = $k;
		var Hl = "\"", Vl = "'", jk = "\\", Ht = `
`, Dn = "	", dn = " ", ca = "[", gr = "]", Wk = "(", Yk = ")", Gl = ":", jl = "<", Wl = ">";
		function $k(e, t, r) {
			for (var n = this, i = n.options.commonmark, u = 0, a = t.length, o = "", s, l, f, c, p, m, D, x; u < a && (c = t.charAt(u), !(c !== dn && c !== Dn));) o += c, u++;
			if (c = t.charAt(u), c === ca) {
				for (u++, o += c, f = ""; u < a && (c = t.charAt(u), c !== gr);) c === jk && (f += c, u++, c = t.charAt(u)), f += c, u++;
				if (!(!f || t.charAt(u) !== gr || t.charAt(u + 1) !== Gl)) {
					for (m = f, o += f + gr + Gl, u = o.length, f = ""; u < a && (c = t.charAt(u), !(c !== Dn && c !== dn && c !== Ht));) o += c, u++;
					if (c = t.charAt(u), f = "", s = o, c === jl) {
						for (u++; u < a && (c = t.charAt(u), !!la(c));) f += c, u++;
						if (c = t.charAt(u), c === la.delimiter) o += jl + f + c, u++;
						else {
							if (i) return;
							u -= f.length + 1, f = "";
						}
					}
					if (!f) {
						for (; u < a && (c = t.charAt(u), !!Kk(c));) f += c, u++;
						o += f;
					}
					if (f) {
						for (D = f, f = ""; u < a && (c = t.charAt(u), !(c !== Dn && c !== dn && c !== Ht));) f += c, u++;
						if (c = t.charAt(u), p = null, c === Hl ? p = Hl : c === Vl ? p = Vl : c === Wk && (p = Yk), !p) f = "", u = o.length;
						else if (f) {
							for (o += f + c, u = o.length, f = ""; u < a && (c = t.charAt(u), c !== p);) {
								if (c === Ht) {
									if (u++, c = t.charAt(u), c === Ht || c === p) return;
									f += Ht;
								}
								f += c, u++;
							}
							if (c = t.charAt(u), c !== p) return;
							l = o, o += f + c, u++, x = f, f = "";
						} else return;
						for (; u < a && (c = t.charAt(u), !(c !== Dn && c !== dn));) o += c, u++;
						if (c = t.charAt(u), !c || c === Ht) return r ? !0 : (s = e(s).test().end, D = n.decode.raw(n.unescape(D), s, { nonTerminated: !1 }), x && (l = e(l).test().end, x = n.decode.raw(n.unescape(x), l)), e(o)({
							type: "definition",
							identifier: Gk(m),
							label: m,
							title: x || null,
							url: D
						}));
					}
				}
			}
		}
		function la(e) {
			return e !== Wl && e !== ca && e !== gr;
		}
		la.delimiter = Wl;
		function Kk(e) {
			return e !== ca && e !== gr && !Vk(e);
		}
	});
	Jl = q((mT, Ql) => {
		"use strict";
		var Qk = Oe();
		Ql.exports = u0;
		var Jk = "	", gn = `
`, Xk = " ", Zk = "-", e0 = ":", t0 = "\\", fa = "|", r0 = 1, n0 = 2, Kl = "left", i0 = "center", a0 = "right";
		function u0(e, t, r) {
			var n = this, i, u, a, o, s, l, f, c, p, m, D, x, g, k, E, w, T, y, d, v, L, C;
			if (n.options.gfm) {
				for (i = 0, w = 0, l = t.length + 1, f = []; i < l;) {
					if (v = t.indexOf(gn, i), L = t.indexOf(fa, i + 1), v === -1 && (v = t.length), L === -1 || L > v) {
						if (w < n0) return;
						break;
					}
					f.push(t.slice(i, v)), w++, i = v + 1;
				}
				for (o = f.join(gn), u = f.splice(1, 1)[0] || [], i = 0, l = u.length, w--, a = !1, D = []; i < l;) {
					if (p = u.charAt(i), p === fa) {
						if (m = null, a === !1) {
							if (C === !1) return;
						} else D.push(a), a = !1;
						C = !1;
					} else if (p === Zk) m = !0, a = a || null;
					else if (p === e0) a === Kl ? a = i0 : m && a === null ? a = a0 : a = Kl;
					else if (!Qk(p)) return;
					i++;
				}
				if (a !== !1 && D.push(a), !(D.length < r0)) {
					if (r) return !0;
					for (E = -1, y = [], d = e(o).reset({
						type: "table",
						align: D,
						children: y
					}); ++E < w;) {
						for (T = f[E], s = {
							type: "tableRow",
							children: []
						}, E && e(gn), e(T).reset(s, d), l = T.length + 1, i = 0, c = "", x = "", g = !0; i < l;) {
							if (p = T.charAt(i), p === Jk || p === Xk) {
								x ? c += p : e(p), i++;
								continue;
							}
							p === "" || p === fa ? g ? e(p) : ((x || p) && !g && (o = x, c.length > 1 && (p ? (o += c.slice(0, -1), c = c.charAt(c.length - 1)) : (o += c, c = "")), k = e.now(), e(o)({
								type: "tableCell",
								children: n.tokenizeInline(x, k)
							}, s)), e(c + p), c = "", x = "") : (c && (x += c, c = ""), x += p, p === t0 && i !== l - 2 && (x += T.charAt(i + 1), i++)), g = !1, i++;
						}
						E || e(gn + u);
					}
					return d;
				}
			}
		}
	});
	ec = q((DT, Zl) => {
		"use strict";
		var o0 = Et(), s0 = Ji(), l0 = pn();
		Zl.exports = p0;
		var c0 = "	", xr = `
`, f0 = " ", Xl = 4;
		function p0(e, t, r) {
			for (var n = this, u = n.options.commonmark, a = n.blockTokenizers, o = n.interruptParagraph, s = t.indexOf(xr), l = t.length, f, c, p, m, D; s < l;) {
				if (s === -1) {
					s = l;
					break;
				}
				if (t.charAt(s + 1) === xr) break;
				if (u) {
					for (m = 0, f = s + 1; f < l;) {
						if (p = t.charAt(f), p === c0) {
							m = Xl;
							break;
						} else if (p === f0) m++;
						else break;
						f++;
					}
					if (m >= Xl && p !== xr) {
						s = t.indexOf(xr, s + 1);
						continue;
					}
				}
				if (c = t.slice(s + 1), l0(o, a, n, [
					e,
					c,
					!0
				])) break;
				if (f = s, s = t.indexOf(xr, s + 1), s !== -1 && o0(t.slice(f, s)) === "") {
					s = f;
					break;
				}
			}
			return c = t.slice(0, s), r ? !0 : (D = e.now(), c = s0(c), e(c)({
				type: "paragraph",
				children: n.tokenizeInline(c, D)
			}));
		}
	});
	rc = q((dT, tc) => {
		"use strict";
		tc.exports = h0;
		function h0(e, t) {
			return e.indexOf("\\", t);
		}
	});
	uc = q((gT, ac) => {
		"use strict";
		var m0 = rc();
		ac.exports = ic;
		ic.locator = m0;
		var D0 = `
`, nc = "\\";
		function ic(e, t, r) {
			var n = this, i, u;
			if (t.charAt(0) === nc && (i = t.charAt(1), n.escape.indexOf(i) !== -1)) return r ? !0 : (i === D0 ? u = { type: "break" } : u = {
				type: "text",
				value: i
			}, e(nc + i)(u));
		}
	});
	pa = q((xT, oc) => {
		"use strict";
		oc.exports = d0;
		function d0(e, t) {
			return e.indexOf("<", t);
		}
	});
	pc = q((kT, fc) => {
		"use strict";
		var sc = Oe(), g0 = pr(), x0 = pa();
		fc.exports = da;
		da.locator = x0;
		da.notInLink = !0;
		var lc = "<", ha = ">", cc = "@", ma = "/", Da = "mailto:", xn = Da.length;
		function da(e, t, r) {
			var n = this, i = "", u = t.length, a = 0, o = "", s = !1, l = "", f, c, p, m, D;
			if (t.charAt(0) === lc) {
				for (a++, i = lc; a < u && (f = t.charAt(a), !(sc(f) || f === ha || f === cc || f === ":" && t.charAt(a + 1) === ma));) o += f, a++;
				if (o) {
					if (l += o, o = "", f = t.charAt(a), l += f, a++, f === cc) s = !0;
					else {
						if (f !== ":" || t.charAt(a + 1) !== ma) return;
						l += ma, a++;
					}
					for (; a < u && (f = t.charAt(a), !(sc(f) || f === ha));) o += f, a++;
					if (f = t.charAt(a), !(!o || f !== ha)) return r ? !0 : (l += o, p = l, i += l + f, c = e.now(), c.column++, c.offset++, s && (l.slice(0, xn).toLowerCase() === Da ? (p = p.slice(xn), c.column += xn, c.offset += xn) : l = Da + l), m = n.inlineTokenizers, n.inlineTokenizers = { text: m.text }, D = n.enterLink(), p = n.tokenizeInline(p, c), n.inlineTokenizers = m, D(), e(i)({
						type: "link",
						title: null,
						url: g0(l, { nonTerminated: !1 }),
						children: p
					}));
				}
			}
		}
	});
	mc = q((FT, hc) => {
		"use strict";
		hc.exports = k0;
		function k0(e, t) {
			var r = String(e), n = 0, i;
			if (typeof t != "string") throw new Error("Expected character");
			for (i = r.indexOf(t); i !== -1;) n++, i = r.indexOf(t, i + t.length);
			return n;
		}
	});
	gc = q((bT, dc) => {
		"use strict";
		dc.exports = F0;
		var Dc = [
			"www.",
			"http://",
			"https://"
		];
		function F0(e, t) {
			var r = -1, n, i, u;
			if (!this.options.gfm) return r;
			for (i = Dc.length, n = -1; ++n < i;) u = e.indexOf(Dc[n], t), u !== -1 && (r === -1 || u < r) && (r = u);
			return r;
		}
	});
	Ec = q((ET, bc) => {
		"use strict";
		var xc = mc(), b0 = pr(), E0 = bt(), ga = Nt(), w0 = Oe(), C0 = gc();
		bc.exports = ka;
		ka.locator = C0;
		ka.notInLink = !0;
		var y0 = 33, v0 = 38, A0 = 41, T0 = 42, S0 = 44, L0 = 45, xa = 46, I0 = 58, q0 = 59, B0 = 63, _0 = 60, kc = 95, P0 = 126, O0 = "(", Fc = ")";
		function ka(e, t, r) {
			var n = this, i = n.options.gfm, u = n.inlineTokenizers, a = t.length, o = -1, s = !1, l, f, c, p, m, D, x, g, k, E, w, T, y, d;
			if (i) {
				if (t.slice(0, 4) === "www.") s = !0, p = 4;
				else if (t.slice(0, 7).toLowerCase() === "http://") p = 7;
				else if (t.slice(0, 8).toLowerCase() === "https://") p = 8;
				else return;
				for (o = p - 1, c = p, l = []; p < a;) {
					if (x = t.charCodeAt(p), x === xa) {
						if (o === p - 1) break;
						l.push(p), o = p, p++;
						continue;
					}
					if (E0(x) || ga(x) || x === L0 || x === kc) {
						p++;
						continue;
					}
					break;
				}
				if (x === xa && (l.pop(), p--), l[0] !== void 0 && (f = l.length < 2 ? c : l[l.length - 2] + 1, t.slice(f, p).indexOf("_") === -1)) {
					if (r) return !0;
					for (g = p, m = p; p < a && (x = t.charCodeAt(p), !(w0(x) || x === _0));) p++, x === y0 || x === T0 || x === S0 || x === xa || x === I0 || x === B0 || x === kc || x === P0 || (g = p);
					if (p = g, t.charCodeAt(p - 1) === A0) for (D = t.slice(m, p), k = xc(D, O0), E = xc(D, Fc); E > k;) p = m + D.lastIndexOf(Fc), D = t.slice(m, p), E--;
					if (t.charCodeAt(p - 1) === q0 && (p--, ga(t.charCodeAt(p - 1)))) {
						for (g = p - 2; ga(t.charCodeAt(g));) g--;
						t.charCodeAt(g) === v0 && (p = g);
					}
					return w = t.slice(0, p), y = b0(w, { nonTerminated: !1 }), s && (y = "http://" + y), d = n.enterLink(), n.inlineTokenizers = { text: u.text }, T = n.tokenizeInline(w, e.now()), n.inlineTokenizers = u, d(), e(w)({
						type: "link",
						title: null,
						url: y,
						children: T
					});
				}
			}
		}
	});
	vc = q((wT, yc) => {
		"use strict";
		var N0 = bt(), R0 = Nt(), M0 = 43, z0 = 45, U0 = 46, H0 = 95;
		yc.exports = Cc;
		function Cc(e, t) {
			var r = this, n, i;
			if (!this.options.gfm || (n = e.indexOf("@", t), n === -1)) return -1;
			if (i = n, i === t || !wc(e.charCodeAt(i - 1))) return Cc.call(r, e, n + 1);
			for (; i > t && wc(e.charCodeAt(i - 1));) i--;
			return i;
		}
		function wc(e) {
			return N0(e) || R0(e) || e === M0 || e === z0 || e === U0 || e === H0;
		}
	});
	Lc = q((CT, Sc) => {
		"use strict";
		var V0 = pr(), Ac = bt(), Tc = Nt(), G0 = vc();
		Sc.exports = Ea;
		Ea.locator = G0;
		Ea.notInLink = !0;
		var j0 = 43, Fa = 45, kn = 46, W0 = 64, ba = 95;
		function Ea(e, t, r) {
			var n = this, i = n.options.gfm, u = n.inlineTokenizers, a = 0, o = t.length, s = -1, l, f, c, p;
			if (i) {
				for (l = t.charCodeAt(a); Ac(l) || Tc(l) || l === j0 || l === Fa || l === kn || l === ba;) l = t.charCodeAt(++a);
				if (a !== 0 && l === W0) {
					for (a++; a < o;) {
						if (l = t.charCodeAt(a), Ac(l) || Tc(l) || l === Fa || l === kn || l === ba) {
							a++, s === -1 && l === kn && (s = a);
							continue;
						}
						break;
					}
					if (!(s === -1 || s === a || l === Fa || l === ba)) return l === kn && a--, f = t.slice(0, a), r ? !0 : (p = n.enterLink(), n.inlineTokenizers = { text: u.text }, c = n.tokenizeInline(f, e.now()), n.inlineTokenizers = u, p(), e(f)({
						type: "link",
						title: null,
						url: "mailto:" + V0(f, { nonTerminated: !1 }),
						children: c
					}));
				}
			}
		}
	});
	Bc = q((yT, qc) => {
		"use strict";
		var Y0 = Nt(), $0 = pa(), K0 = oa().tag;
		qc.exports = Ic;
		Ic.locator = $0;
		var Q0 = "<", J0 = "?", X0 = "!", Z0 = "/", eF = /^<a /i, tF = /^<\/a>/i;
		function Ic(e, t, r) {
			var n = this, i = t.length, u, a;
			if (!(t.charAt(0) !== Q0 || i < 3) && (u = t.charAt(1), !(!Y0(u) && u !== J0 && u !== X0 && u !== Z0) && (a = t.match(K0), !!a))) return r ? !0 : (a = a[0], !n.inLink && eF.test(a) ? n.inLink = !0 : n.inLink && tF.test(a) && (n.inLink = !1), e(a)({
				type: "html",
				value: a
			}));
		}
	});
	wa = q((vT, _c) => {
		"use strict";
		_c.exports = rF;
		function rF(e, t) {
			var r = e.indexOf("[", t), n = e.indexOf("![", t);
			return n === -1 || r < n ? r : n;
		}
	});
	Uc = q((AT, zc) => {
		"use strict";
		var kr = Oe(), nF = wa();
		zc.exports = Mc;
		Mc.locator = nF;
		var iF = `
`, aF = "!", Pc = "\"", Oc = "'", Vt = "(", Fr = ")", Ca = "<", ya = ">", Nc = "[", br = "\\", uF = "]", Rc = "`";
		function Mc(e, t, r) {
			var n = this, i = "", u = 0, a = t.charAt(0), o = n.options.pedantic, s = n.options.commonmark, l = n.options.gfm, f, c, p, m, D, x, g, k, E, w, T, y, d, v, L, C, b, _;
			if (a === aF && (k = !0, i = a, a = t.charAt(++u)), a === Nc && !(!k && n.inLink)) {
				for (i += a, v = "", u++, T = t.length, C = e.now(), d = 0, C.column += u, C.offset += u; u < T;) {
					if (a = t.charAt(u), x = a, a === Rc) {
						for (c = 1; t.charAt(u + 1) === Rc;) x += a, u++, c++;
						p ? c >= p && (p = 0) : p = c;
					} else if (a === br) u++, x += t.charAt(u);
					else if ((!p || l) && a === Nc) d++;
					else if ((!p || l) && a === uF) if (d) d--;
					else {
						if (t.charAt(u + 1) !== Vt) return;
						x += Vt, f = !0, u++;
						break;
					}
					v += x, x = "", u++;
				}
				if (f) {
					for (E = v, i += v + x, u++; u < T && (a = t.charAt(u), !!kr(a));) i += a, u++;
					if (a = t.charAt(u), v = "", m = i, a === Ca) {
						for (u++, m += Ca; u < T && (a = t.charAt(u), a !== ya);) {
							if (s && a === iF) return;
							v += a, u++;
						}
						if (t.charAt(u) !== ya) return;
						i += Ca + v + ya, L = v, u++;
					} else {
						for (a = null, x = ""; u < T && (a = t.charAt(u), !(x && (a === Pc || a === Oc || s && a === Vt)));) {
							if (kr(a)) {
								if (!o) break;
								x += a;
							} else {
								if (a === Vt) d++;
								else if (a === Fr) {
									if (d === 0) break;
									d--;
								}
								v += x, x = "", a === br && (v += br, a = t.charAt(++u)), v += a;
							}
							u++;
						}
						i += v, L = v, u = i.length;
					}
					for (v = ""; u < T && (a = t.charAt(u), !!kr(a));) v += a, u++;
					if (a = t.charAt(u), i += v, v && (a === Pc || a === Oc || s && a === Vt)) if (u++, i += a, v = "", w = a === Vt ? Fr : a, D = i, s) {
						for (; u < T && (a = t.charAt(u), a !== w);) a === br && (v += br, a = t.charAt(++u)), u++, v += a;
						if (a = t.charAt(u), a !== w) return;
						for (y = v, i += v + a, u++; u < T && (a = t.charAt(u), !!kr(a));) i += a, u++;
					} else for (x = ""; u < T;) {
						if (a = t.charAt(u), a === w) g && (v += w + x, x = ""), g = !0;
						else if (!g) v += a;
						else if (a === Fr) {
							i += v + w + x, y = v;
							break;
						} else kr(a) ? x += a : (v += w + x + a, x = "", g = !1);
						u++;
					}
					if (t.charAt(u) === Fr) return r ? !0 : (i += Fr, L = n.decode.raw(n.unescape(L), e(m).test().end, { nonTerminated: !1 }), y && (D = e(D).test().end, y = n.decode.raw(n.unescape(y), D)), _ = {
						type: k ? "image" : "link",
						title: y || null,
						url: L
					}, k ? _.alt = n.decode.raw(n.unescape(E), C) || null : (b = n.enterLink(), _.children = n.tokenizeInline(E, C), b()), e(i)(_));
				}
			}
		}
	});
	Gc = q((TT, Vc) => {
		"use strict";
		var oF = Oe(), sF = wa(), lF = sa();
		Vc.exports = Hc;
		Hc.locator = sF;
		var va = "link", cF = "image", fF = "shortcut", pF = "collapsed", Aa = "full", hF = "!", Fn = "[", bn = "\\", En = "]";
		function Hc(e, t, r) {
			var n = this, i = n.options.commonmark, u = t.charAt(0), a = 0, o = t.length, s = "", l = "", f = va, c = fF, p, m, D, x, g, k, E, w;
			if (u === hF && (f = cF, l = u, u = t.charAt(++a)), u === Fn) {
				for (a++, l += u, k = "", w = 0; a < o;) {
					if (u = t.charAt(a), u === Fn) E = !0, w++;
					else if (u === En) {
						if (!w) break;
						w--;
					}
					u === bn && (k += bn, u = t.charAt(++a)), k += u, a++;
				}
				if (s = k, p = k, u = t.charAt(a), u === En) {
					if (a++, s += u, k = "", !i) for (; a < o && (u = t.charAt(a), !!oF(u));) k += u, a++;
					if (u = t.charAt(a), u === Fn) {
						for (m = "", k += u, a++; a < o && (u = t.charAt(a), !(u === Fn || u === En));) u === bn && (m += bn, u = t.charAt(++a)), m += u, a++;
						u = t.charAt(a), u === En ? (c = m ? Aa : pF, k += m + u, a++) : m = "", s += k, k = "";
					} else {
						if (!p) return;
						m = p;
					}
					if (!(c !== Aa && E)) return s = l + s, f === va && n.inLink ? null : r ? !0 : (D = e.now(), D.column += l.length, D.offset += l.length, m = c === Aa ? m : p, x = {
						type: f + "Reference",
						identifier: lF(m),
						label: m,
						referenceType: c
					}, f === va ? (g = n.enterLink(), x.children = n.tokenizeInline(p, D), g()) : x.alt = n.decode.raw(n.unescape(p), D) || null, e(s)(x));
				}
			}
		}
	});
	Wc = q((ST, jc) => {
		"use strict";
		jc.exports = mF;
		function mF(e, t) {
			var r = e.indexOf("**", t), n = e.indexOf("__", t);
			return n === -1 ? r : r === -1 || n < r ? n : r;
		}
	});
	Qc = q((LT, Kc) => {
		"use strict";
		var DF = Et(), Yc = Oe(), dF = Wc();
		Kc.exports = $c;
		$c.locator = dF;
		var gF = "\\", xF = "*", kF = "_";
		function $c(e, t, r) {
			var n = this, i = 0, u = t.charAt(i), a, o, s, l, f, c, p;
			if (!(u !== xF && u !== kF || t.charAt(++i) !== u) && (o = n.options.pedantic, s = u, f = s + s, c = t.length, i++, l = "", u = "", !(o && Yc(t.charAt(i))))) for (; i < c;) {
				if (p = u, u = t.charAt(i), u === s && t.charAt(i + 1) === s && (!o || !Yc(p)) && (u = t.charAt(i + 2), u !== s)) return DF(l) ? r ? !0 : (a = e.now(), a.column += 2, a.offset += 2, e(f + l + f)({
					type: "strong",
					children: n.tokenizeInline(l, a)
				})) : void 0;
				!o && u === gF && (l += u, u = t.charAt(++i)), l += u, i++;
			}
		}
	});
	Xc = q((IT, Jc) => {
		"use strict";
		Jc.exports = EF;
		var FF = String.fromCharCode, bF = /\w/;
		function EF(e) {
			return bF.test(typeof e == "number" ? FF(e) : e.charAt(0));
		}
	});
	ef = q((qT, Zc) => {
		"use strict";
		Zc.exports = wF;
		function wF(e, t) {
			var r = e.indexOf("*", t), n = e.indexOf("_", t);
			return n === -1 ? r : r === -1 || n < r ? n : r;
		}
	});
	uf = q((BT, af) => {
		"use strict";
		var CF = Et(), yF = Xc(), tf = Oe(), vF = ef();
		af.exports = nf;
		nf.locator = vF;
		var AF = "*", rf = "_", TF = "\\";
		function nf(e, t, r) {
			var n = this, i = 0, u = t.charAt(i), a, o, s, l, f, c, p;
			if (!(u !== AF && u !== rf) && (o = n.options.pedantic, f = u, s = u, c = t.length, i++, l = "", u = "", !(o && tf(t.charAt(i))))) for (; i < c;) {
				if (p = u, u = t.charAt(i), u === s && (!o || !tf(p))) {
					if (u = t.charAt(++i), u !== s) {
						if (!CF(l) || p === s) return;
						if (!o && s === rf && yF(u)) {
							l += s;
							continue;
						}
						return r ? !0 : (a = e.now(), a.column++, a.offset++, e(f + l + s)({
							type: "emphasis",
							children: n.tokenizeInline(l, a)
						}));
					}
					l += s;
				}
				!o && u === TF && (l += u, u = t.charAt(++i)), l += u, i++;
			}
		}
	});
	sf = q((_T, of) => {
		"use strict";
		of.exports = SF;
		function SF(e, t) {
			return e.indexOf("~~", t);
		}
	});
	hf = q((PT, pf) => {
		"use strict";
		var lf = Oe(), LF = sf();
		pf.exports = ff;
		ff.locator = LF;
		var wn = "~", cf = "~~";
		function ff(e, t, r) {
			var n = this, i = "", u = "", a = "", o = "", s, l, f;
			if (!(!n.options.gfm || t.charAt(0) !== wn || t.charAt(1) !== wn || lf(t.charAt(2)))) for (s = 1, l = t.length, f = e.now(), f.column += 2, f.offset += 2; ++s < l;) {
				if (i = t.charAt(s), i === wn && u === wn && (!a || !lf(a))) return r ? !0 : e(cf + o + cf)({
					type: "delete",
					children: n.tokenizeInline(o, f)
				});
				o += u, a = u, u = i;
			}
		}
	});
	Df = q((OT, mf) => {
		"use strict";
		mf.exports = IF;
		function IF(e, t) {
			return e.indexOf("`", t);
		}
	});
	xf = q((NT, gf) => {
		"use strict";
		var qF = Df();
		gf.exports = df;
		df.locator = qF;
		var Ta = 10, Sa = 32, La = 96;
		function df(e, t, r) {
			for (var n = t.length, i = 0, u, a, o, s, l, f; i < n && t.charCodeAt(i) === La;) i++;
			if (!(i === 0 || i === n)) {
				for (u = i, l = t.charCodeAt(i); i < n;) {
					if (s = l, l = t.charCodeAt(i + 1), s === La) {
						if (a === void 0 && (a = i), o = i + 1, l !== La && o - a === u) {
							f = !0;
							break;
						}
					} else a !== void 0 && (a = void 0, o = void 0);
					i++;
				}
				if (f) {
					if (r) return !0;
					if (i = u, n = a, s = t.charCodeAt(i), l = t.charCodeAt(n - 1), f = !1, n - i > 2 && (s === Sa || s === Ta) && (l === Sa || l === Ta)) {
						for (i++, n--; i < n;) {
							if (s = t.charCodeAt(i), s !== Sa && s !== Ta) {
								f = !0;
								break;
							}
							i++;
						}
						f === !0 && (u++, a--);
					}
					return e(t.slice(0, o))({
						type: "inlineCode",
						value: t.slice(u, a)
					});
				}
			}
		}
	});
	Ff = q((RT, kf) => {
		"use strict";
		kf.exports = BF;
		function BF(e, t) {
			for (var r = e.indexOf(`
`, t); r > t && e.charAt(r - 1) === " ";) r--;
			return r;
		}
	});
	wf = q((MT, Ef) => {
		"use strict";
		var _F = Ff();
		Ef.exports = bf;
		bf.locator = _F;
		var PF = " ", OF = `
`, NF = 2;
		function bf(e, t, r) {
			for (var n = t.length, i = -1, u = "", a; ++i < n;) {
				if (a = t.charAt(i), a === OF) return i < NF ? void 0 : r ? !0 : (u += a, e(u)({ type: "break" }));
				if (a !== PF) return;
				u += a;
			}
		}
	});
	yf = q((zT, Cf) => {
		"use strict";
		Cf.exports = RF;
		function RF(e, t, r) {
			var n = this, i, u, a, o, s, l, f, c, p, m;
			if (r) return !0;
			for (i = n.inlineMethods, o = i.length, u = n.inlineTokenizers, a = -1, p = t.length; ++a < o;) c = i[a], !(c === "text" || !u[c]) && (f = u[c].locator, f || e.file.fail("Missing locator: `" + c + "`"), l = f.call(n, t, 1), l !== -1 && l < p && (p = l));
			s = t.slice(0, p), m = e.now(), n.decode(s, m, D);
			function D(x, g, k) {
				e(k || x)({
					type: "text",
					value: x
				});
			}
		}
	});
	Sf = q((UT, Tf) => {
		"use strict";
		var MF = Ft(), Cn = Go(), zF = Wo(), UF = $o(), HF = Es(), Ia = ys();
		Tf.exports = vf;
		function vf(e, t) {
			this.file = t, this.offset = {}, this.options = MF(this.options), this.setOptions({}), this.inList = !1, this.inBlock = !1, this.inLink = !1, this.atStart = !0, this.toOffset = zF(t).toOffset, this.unescape = UF(this, "escape"), this.decode = HF(this);
		}
		var ue = vf.prototype;
		ue.setOptions = Bs();
		ue.parse = Ks();
		ue.options = $i();
		ue.exitStart = Cn("atStart", !0);
		ue.enterList = Cn("inList", !1);
		ue.enterLink = Cn("inLink", !1);
		ue.enterBlock = Cn("inBlock", !1);
		ue.interruptParagraph = [
			["thematicBreak"],
			["list"],
			["atxHeading"],
			["fencedCode"],
			["blockquote"],
			["html"],
			["setextHeading", { commonmark: !1 }],
			["definition", { commonmark: !1 }]
		];
		ue.interruptList = [
			["atxHeading", { pedantic: !1 }],
			["fencedCode", { pedantic: !1 }],
			["thematicBreak", { pedantic: !1 }],
			["definition", { commonmark: !1 }]
		];
		ue.interruptBlockquote = [
			["indentedCode", { commonmark: !0 }],
			["fencedCode", { commonmark: !0 }],
			["atxHeading", { commonmark: !0 }],
			["setextHeading", { commonmark: !0 }],
			["thematicBreak", { commonmark: !0 }],
			["html", { commonmark: !0 }],
			["list", { commonmark: !0 }],
			["definition", { commonmark: !1 }]
		];
		ue.blockTokenizers = {
			blankLine: Js(),
			indentedCode: rl(),
			fencedCode: al(),
			blockquote: fl(),
			atxHeading: ml(),
			thematicBreak: gl(),
			list: Tl(),
			setextHeading: ql(),
			html: Rl(),
			definition: $l(),
			table: Jl(),
			paragraph: ec()
		};
		ue.inlineTokenizers = {
			escape: uc(),
			autoLink: pc(),
			url: Ec(),
			email: Lc(),
			html: Bc(),
			link: Uc(),
			reference: Gc(),
			strong: Qc(),
			emphasis: uf(),
			deletion: hf(),
			code: xf(),
			break: wf(),
			text: yf()
		};
		ue.blockMethods = Af(ue.blockTokenizers);
		ue.inlineMethods = Af(ue.inlineTokenizers);
		ue.tokenizeBlock = Ia("block");
		ue.tokenizeInline = Ia("inline");
		ue.tokenizeFactory = Ia;
		function Af(e) {
			var t = [], r;
			for (r in e) t.push(r);
			return t;
		}
	});
	Bf = q((HT, qf) => {
		"use strict";
		var VF = Ho(), GF = Ft(), Lf = Sf();
		qf.exports = If;
		If.Parser = Lf;
		function If(e) {
			var t = this.data("settings"), r = VF(Lf);
			r.prototype.options = GF(r.prototype.options, t, e), this.Parser = r;
		}
	});
	Pf = q((VT, _f) => {
		"use strict";
		_f.exports = jF;
		function jF(e) {
			if (e) throw e;
		}
	});
	qa = q((GT, Of) => {
		Of.exports = function(t) {
			return t != null && t.constructor != null && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
		};
	});
	jf = q((jT, Gf) => {
		"use strict";
		var yn = Object.prototype.hasOwnProperty, Vf = Object.prototype.toString, Nf = Object.defineProperty, Rf = Object.getOwnPropertyDescriptor, Mf = function(t) {
			return typeof Array.isArray == "function" ? Array.isArray(t) : Vf.call(t) === "[object Array]";
		}, zf = function(t) {
			if (!t || Vf.call(t) !== "[object Object]") return !1;
			var r = yn.call(t, "constructor"), n = t.constructor && t.constructor.prototype && yn.call(t.constructor.prototype, "isPrototypeOf");
			if (t.constructor && !r && !n) return !1;
			var i;
			for (i in t);
			return typeof i > "u" || yn.call(t, i);
		}, Uf = function(t, r) {
			Nf && r.name === "__proto__" ? Nf(t, r.name, {
				enumerable: !0,
				configurable: !0,
				value: r.newValue,
				writable: !0
			}) : t[r.name] = r.newValue;
		}, Hf = function(t, r) {
			if (r === "__proto__") if (yn.call(t, r)) {
				if (Rf) return Rf(t, r).value;
			} else return;
			return t[r];
		};
		Gf.exports = function e() {
			var t, r, n, i, u, a, o = arguments[0], s = 1, l = arguments.length, f = !1;
			for (typeof o == "boolean" && (f = o, o = arguments[1] || {}, s = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); s < l; ++s) if (t = arguments[s], t != null) for (r in t) n = Hf(o, r), i = Hf(t, r), o !== i && (f && i && (zf(i) || (u = Mf(i))) ? (u ? (u = !1, a = n && Mf(n) ? n : []) : a = n && zf(n) ? n : {}, Uf(o, {
				name: r,
				newValue: e(f, a, i)
			})) : typeof i < "u" && Uf(o, {
				name: r,
				newValue: i
			}));
			return o;
		};
	});
	Yf = q((WT, Wf) => {
		"use strict";
		Wf.exports = (e) => {
			if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
			let t = Object.getPrototypeOf(e);
			return t === null || t === Object.prototype;
		};
	});
	Kf = q((YT, $f) => {
		"use strict";
		var WF = [].slice;
		$f.exports = YF;
		function YF(e, t) {
			var r;
			return n;
			function n() {
				var a = WF.call(arguments, 0), o = e.length > a.length, s;
				o && a.push(i);
				try {
					s = e.apply(null, a);
				} catch (l) {
					if (o && r) throw l;
					return i(l);
				}
				o || (s && typeof s.then == "function" ? s.then(u, i) : s instanceof Error ? i(s) : u(s));
			}
			function i() {
				r || (r = !0, t.apply(null, arguments));
			}
			function u(a) {
				i(null, a);
			}
		}
	});
	ep = q(($T, Zf) => {
		"use strict";
		var Jf = Kf();
		Zf.exports = Xf;
		Xf.wrap = Jf;
		var Qf = [].slice;
		function Xf() {
			var e = [], t = {};
			return t.run = r, t.use = n, t;
			function r() {
				var i = -1, u = Qf.call(arguments, 0, -1), a = arguments[arguments.length - 1];
				if (typeof a != "function") throw new Error("Expected function as last argument, not " + a);
				o.apply(null, [null].concat(u));
				function o(s) {
					var l = e[++i], c = Qf.call(arguments, 0).slice(1), p = u.length, m = -1;
					if (s) {
						a(s);
						return;
					}
					for (; ++m < p;) (c[m] === null || c[m] === void 0) && (c[m] = u[m]);
					u = c, l ? Jf(l, o).apply(null, u) : a.apply(null, [null].concat(u));
				}
			}
			function n(i) {
				if (typeof i != "function") throw new Error("Expected `fn` to be a function, not " + i);
				return e.push(i), t;
			}
		}
	});
	ip = q((KT, np) => {
		"use strict";
		var Gt = {}.hasOwnProperty;
		np.exports = $F;
		function $F(e) {
			return !e || typeof e != "object" ? "" : Gt.call(e, "position") || Gt.call(e, "type") ? tp(e.position) : Gt.call(e, "start") || Gt.call(e, "end") ? tp(e) : Gt.call(e, "line") || Gt.call(e, "column") ? Ba(e) : "";
		}
		function Ba(e) {
			return (!e || typeof e != "object") && (e = {}), rp(e.line) + ":" + rp(e.column);
		}
		function tp(e) {
			return (!e || typeof e != "object") && (e = {}), Ba(e.start) + "-" + Ba(e.end);
		}
		function rp(e) {
			return e && typeof e == "number" ? e : 1;
		}
	});
	op = q((QT, up) => {
		"use strict";
		var KF = ip();
		up.exports = _a;
		function ap() {}
		ap.prototype = Error.prototype;
		_a.prototype = new ap();
		var ot = _a.prototype;
		ot.file = "";
		ot.name = "";
		ot.reason = "";
		ot.message = "";
		ot.stack = "";
		ot.fatal = null;
		ot.column = null;
		ot.line = null;
		function _a(e, t, r) {
			var n, i, u;
			typeof t == "string" && (r = t, t = null), n = QF(r), i = KF(t) || "1:1", u = {
				start: {
					line: null,
					column: null
				},
				end: {
					line: null,
					column: null
				}
			}, t && t.position && (t = t.position), t && (t.start ? (u = t, t = t.start) : u.start = t), e.stack && (this.stack = e.stack, e = e.message), this.message = e, this.name = i, this.reason = e, this.line = t ? t.line : null, this.column = t ? t.column : null, this.location = u, this.source = n[0], this.ruleId = n[1];
		}
		function QF(e) {
			var t = [null, null], r;
			return typeof e == "string" && (r = e.indexOf(":"), r === -1 ? t[1] = e : (t[0] = e.slice(0, r), t[1] = e.slice(r + 1))), t;
		}
	});
	sp = q((jt) => {
		"use strict";
		jt.basename = JF;
		jt.dirname = XF;
		jt.extname = ZF;
		jt.join = eb;
		jt.sep = "/";
		function JF(e, t) {
			var r = 0, n = -1, i, u, a, o;
			if (t !== void 0 && typeof t != "string") throw new TypeError("\"ext\" argument must be a string");
			if (Er(e), i = e.length, t === void 0 || !t.length || t.length > e.length) {
				for (; i--;) if (e.charCodeAt(i) === 47) {
					if (a) {
						r = i + 1;
						break;
					}
				} else n < 0 && (a = !0, n = i + 1);
				return n < 0 ? "" : e.slice(r, n);
			}
			if (t === e) return "";
			for (u = -1, o = t.length - 1; i--;) if (e.charCodeAt(i) === 47) {
				if (a) {
					r = i + 1;
					break;
				}
			} else u < 0 && (a = !0, u = i + 1), o > -1 && (e.charCodeAt(i) === t.charCodeAt(o--) ? o < 0 && (n = i) : (o = -1, n = u));
			return r === n ? n = u : n < 0 && (n = e.length), e.slice(r, n);
		}
		function XF(e) {
			var t, r, n;
			if (Er(e), !e.length) return ".";
			for (t = -1, n = e.length; --n;) if (e.charCodeAt(n) === 47) {
				if (r) {
					t = n;
					break;
				}
			} else r || (r = !0);
			return t < 0 ? e.charCodeAt(0) === 47 ? "/" : "." : t === 1 && e.charCodeAt(0) === 47 ? "//" : e.slice(0, t);
		}
		function ZF(e) {
			var t = -1, r = 0, n = -1, i = 0, u, a, o;
			for (Er(e), o = e.length; o--;) {
				if (a = e.charCodeAt(o), a === 47) {
					if (u) {
						r = o + 1;
						break;
					}
					continue;
				}
				n < 0 && (u = !0, n = o + 1), a === 46 ? t < 0 ? t = o : i !== 1 && (i = 1) : t > -1 && (i = -1);
			}
			return t < 0 || n < 0 || i === 0 || i === 1 && t === n - 1 && t === r + 1 ? "" : e.slice(t, n);
		}
		function eb() {
			for (var e = -1, t; ++e < arguments.length;) Er(arguments[e]), arguments[e] && (t = t === void 0 ? arguments[e] : t + "/" + arguments[e]);
			return t === void 0 ? "." : tb(t);
		}
		function tb(e) {
			var t, r;
			return Er(e), t = e.charCodeAt(0) === 47, r = rb(e, !t), !r.length && !t && (r = "."), r.length && e.charCodeAt(e.length - 1) === 47 && (r += "/"), t ? "/" + r : r;
		}
		function rb(e, t) {
			for (var r = "", n = 0, i = -1, u = 0, a = -1, o, s; ++a <= e.length;) {
				if (a < e.length) o = e.charCodeAt(a);
				else {
					if (o === 47) break;
					o = 47;
				}
				if (o === 47) {
					if (!(i === a - 1 || u === 1)) if (i !== a - 1 && u === 2) {
						if (r.length < 2 || n !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
							if (r.length > 2) {
								if (s = r.lastIndexOf("/"), s !== r.length - 1) {
									s < 0 ? (r = "", n = 0) : (r = r.slice(0, s), n = r.length - 1 - r.lastIndexOf("/")), i = a, u = 0;
									continue;
								}
							} else if (r.length) {
								r = "", n = 0, i = a, u = 0;
								continue;
							}
						}
						t && (r = r.length ? r + "/.." : "..", n = 2);
					} else r.length ? r += "/" + e.slice(i + 1, a) : r = e.slice(i + 1, a), n = a - i - 1;
					i = a, u = 0;
				} else o === 46 && u > -1 ? u++ : u = -1;
			}
			return r;
		}
		function Er(e) {
			if (typeof e != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
		}
	});
	cp = q((lp) => {
		"use strict";
		lp.cwd = nb;
		function nb() {
			return "/";
		}
	});
	hp = q((ZT, pp) => {
		"use strict";
		var Ne = sp(), ib = cp(), ab = qa();
		pp.exports = Ye;
		var ub = {}.hasOwnProperty, Pa = [
			"history",
			"path",
			"basename",
			"stem",
			"extname",
			"dirname"
		];
		Ye.prototype.toString = gb;
		Object.defineProperty(Ye.prototype, "path", {
			get: ob,
			set: sb
		});
		Object.defineProperty(Ye.prototype, "dirname", {
			get: lb,
			set: cb
		});
		Object.defineProperty(Ye.prototype, "basename", {
			get: fb,
			set: pb
		});
		Object.defineProperty(Ye.prototype, "extname", {
			get: hb,
			set: mb
		});
		Object.defineProperty(Ye.prototype, "stem", {
			get: Db,
			set: db
		});
		function Ye(e) {
			var t, r;
			if (!e) e = {};
			else if (typeof e == "string" || ab(e)) e = { contents: e };
			else if ("message" in e && "messages" in e) return e;
			if (!(this instanceof Ye)) return new Ye(e);
			for (this.data = {}, this.messages = [], this.history = [], this.cwd = ib.cwd(), r = -1; ++r < Pa.length;) t = Pa[r], ub.call(e, t) && (this[t] = e[t]);
			for (t in e) Pa.indexOf(t) < 0 && (this[t] = e[t]);
		}
		function ob() {
			return this.history[this.history.length - 1];
		}
		function sb(e) {
			Na(e, "path"), this.path !== e && this.history.push(e);
		}
		function lb() {
			return typeof this.path == "string" ? Ne.dirname(this.path) : void 0;
		}
		function cb(e) {
			fp(this.path, "dirname"), this.path = Ne.join(e || "", this.basename);
		}
		function fb() {
			return typeof this.path == "string" ? Ne.basename(this.path) : void 0;
		}
		function pb(e) {
			Na(e, "basename"), Oa(e, "basename"), this.path = Ne.join(this.dirname || "", e);
		}
		function hb() {
			return typeof this.path == "string" ? Ne.extname(this.path) : void 0;
		}
		function mb(e) {
			if (Oa(e, "extname"), fp(this.path, "extname"), e) {
				if (e.charCodeAt(0) !== 46) throw new Error("`extname` must start with `.`");
				if (e.indexOf(".", 1) > -1) throw new Error("`extname` cannot contain multiple dots");
			}
			this.path = Ne.join(this.dirname, this.stem + (e || ""));
		}
		function Db() {
			return typeof this.path == "string" ? Ne.basename(this.path, this.extname) : void 0;
		}
		function db(e) {
			Na(e, "stem"), Oa(e, "stem"), this.path = Ne.join(this.dirname || "", e + (this.extname || ""));
		}
		function gb(e) {
			return (this.contents || "").toString(e);
		}
		function Oa(e, t) {
			if (e && e.indexOf(Ne.sep) > -1) throw new Error("`" + t + "` cannot be a path: did not expect `" + Ne.sep + "`");
		}
		function Na(e, t) {
			if (!e) throw new Error("`" + t + "` cannot be empty");
		}
		function fp(e, t) {
			if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
		}
	});
	Dp = q((e3, mp) => {
		"use strict";
		var xb = op(), vn = hp();
		mp.exports = vn;
		vn.prototype.message = kb;
		vn.prototype.info = bb;
		vn.prototype.fail = Fb;
		function kb(e, t, r) {
			var n = new xb(e, t, r);
			return this.path && (n.name = this.path + ":" + n.name, n.file = this.path), n.fatal = !1, this.messages.push(n), n;
		}
		function Fb() {
			var e = this.message.apply(this, arguments);
			throw e.fatal = !0, e;
		}
		function bb() {
			var e = this.message.apply(this, arguments);
			return e.fatal = null, e;
		}
	});
	gp = q((t3, dp) => {
		"use strict";
		dp.exports = Dp();
	});
	vp = q((r3, yp) => {
		"use strict";
		var xp = Pf(), Eb = qa(), An = jf(), kp = Yf(), wp = ep(), wr = gp();
		yp.exports = Cp().freeze();
		var wb = [].slice, Cb = {}.hasOwnProperty, yb = wp().use(vb).use(Ab).use(Tb);
		function vb(e, t) {
			t.tree = e.parse(t.file);
		}
		function Ab(e, t, r) {
			e.run(t.tree, t.file, n);
			function n(i, u, a) {
				i ? r(i) : (t.tree = u, t.file = a, r());
			}
		}
		function Tb(e, t) {
			var r = e.stringify(t.tree, t.file);
			r == null || (typeof r == "string" || Eb(r) ? ("value" in t.file && (t.file.value = r), t.file.contents = r) : t.file.result = r);
		}
		function Cp() {
			var e = [], t = wp(), r = {}, n = -1, i;
			return u.data = o, u.freeze = a, u.attachers = e, u.use = s, u.parse = f, u.stringify = m, u.run = c, u.runSync = p, u.process = D, u.processSync = x, u;
			function u() {
				for (var g = Cp(), k = -1; ++k < e.length;) g.use.apply(null, e[k]);
				return g.data(An(!0, {}, r)), g;
			}
			function a() {
				var g, k;
				if (i) return u;
				for (; ++n < e.length;) g = e[n], g[1] !== !1 && (g[1] === !0 && (g[1] = void 0), k = g[0].apply(u, g.slice(1)), typeof k == "function" && t.use(k));
				return i = !0, n = Infinity, u;
			}
			function o(g, k) {
				return typeof g == "string" ? arguments.length === 2 ? (za("data", i), r[g] = k, u) : Cb.call(r, g) && r[g] || null : g ? (za("data", i), r = g, u) : r;
			}
			function s(g) {
				var k;
				if (za("use", i), g != null) if (typeof g == "function") y.apply(null, arguments);
				else if (typeof g == "object") "length" in g ? T(g) : E(g);
				else throw new Error("Expected usable value, not `" + g + "`");
				return k && (r.settings = An(r.settings || {}, k)), u;
				function E(d) {
					T(d.plugins), d.settings && (k = An(k || {}, d.settings));
				}
				function w(d) {
					if (typeof d == "function") y(d);
					else if (typeof d == "object") "length" in d ? y.apply(null, d) : E(d);
					else throw new Error("Expected usable value, not `" + d + "`");
				}
				function T(d) {
					var v = -1;
					if (d != null) if (typeof d == "object" && "length" in d) for (; ++v < d.length;) w(d[v]);
					else throw new Error("Expected a list of plugins, not `" + d + "`");
				}
				function y(d, v) {
					var L = l(d);
					L ? (kp(L[1]) && kp(v) && (v = An(!0, L[1], v)), L[1] = v) : e.push(wb.call(arguments));
				}
			}
			function l(g) {
				for (var k = -1; ++k < e.length;) if (e[k][0] === g) return e[k];
			}
			function f(g) {
				var k = wr(g), E;
				return a(), E = u.Parser, Ra("parse", E), Fp(E, "parse") ? new E(String(k), k).parse() : E(String(k), k);
			}
			function c(g, k, E) {
				if (bp(g), a(), !E && typeof k == "function" && (E = k, k = null), !E) return new Promise(w);
				w(null, E);
				function w(T, y) {
					t.run(g, wr(k), d);
					function d(v, L, C) {
						L = L || g, v ? y(v) : T ? T(L) : E(null, L, C);
					}
				}
			}
			function p(g, k) {
				var E, w;
				return c(g, k, T), Ep("runSync", "run", w), E;
				function T(y, d) {
					w = !0, E = d, xp(y);
				}
			}
			function m(g, k) {
				var E = wr(k), w;
				return a(), w = u.Compiler, Ma("stringify", w), bp(g), Fp(w, "compile") ? new w(g, E).compile() : w(g, E);
			}
			function D(g, k) {
				if (a(), Ra("process", u.Parser), Ma("process", u.Compiler), !k) return new Promise(E);
				E(null, k);
				function E(w, T) {
					var y = wr(g);
					yb.run(u, { file: y }, d);
					function d(v) {
						v ? T(v) : w ? w(y) : k(null, y);
					}
				}
			}
			function x(g) {
				var k, E;
				return a(), Ra("processSync", u.Parser), Ma("processSync", u.Compiler), k = wr(g), D(k, w), Ep("processSync", "process", E), k;
				function w(T) {
					E = !0, xp(T);
				}
			}
		}
		function Fp(e, t) {
			return typeof e == "function" && e.prototype && (Sb(e.prototype) || t in e.prototype);
		}
		function Sb(e) {
			var t;
			for (t in e) return !0;
			return !1;
		}
		function Ra(e, t) {
			if (typeof t != "function") throw new Error("Cannot `" + e + "` without `Parser`");
		}
		function Ma(e, t) {
			if (typeof t != "function") throw new Error("Cannot `" + e + "` without `Compiler`");
		}
		function za(e, t) {
			if (t) throw new Error("Cannot invoke `" + e + "` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.");
		}
		function bp(e) {
			if (!e || typeof e.type != "string") throw new Error("Expected node, got `" + e + "`");
		}
		function Ep(e, t, r) {
			if (!r) throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
		}
	});
	rm = {};
	Or(rm, {
		languages: () => xu,
		options: () => ku,
		parsers: () => ru,
		printers: () => pu
	});
	xu = [{
		name: "Markdown",
		type: "prose",
		aceMode: "markdown",
		extensions: [
			".md",
			".livemd",
			".markdown",
			".mdown",
			".mdwn",
			".mkd",
			".mkdn",
			".mkdown",
			".ronn",
			".scd",
			".workbook"
		],
		filenames: ["contents.lr", "README"],
		tmScope: "text.md",
		aliases: ["md", "pandoc"],
		codemirrorMode: "gfm",
		codemirrorMimeType: "text/x-gfm",
		wrap: !0,
		parsers: ["markdown"],
		vscodeLanguageIds: ["markdown"],
		linguistLanguageId: 222
	}, {
		name: "MDX",
		type: "prose",
		aceMode: "markdown",
		extensions: [".mdx"],
		filenames: [],
		tmScope: "text.md",
		aliases: ["md", "pandoc"],
		codemirrorMode: "gfm",
		codemirrorMimeType: "text/x-gfm",
		wrap: !0,
		parsers: ["mdx"],
		vscodeLanguageIds: ["mdx"],
		linguistLanguageId: 222
	}];
	Gn = {
		bracketSpacing: {
			category: "Common",
			type: "boolean",
			default: !0,
			description: "Print spaces between brackets.",
			oppositeDescription: "Do not print spaces between brackets."
		},
		objectWrap: {
			category: "Common",
			type: "choice",
			default: "preserve",
			description: "How to wrap object literals.",
			choices: [{
				value: "preserve",
				description: "Keep as multi-line, if there is a newline between the opening brace and first property."
			}, {
				value: "collapse",
				description: "Fit to a single line when possible."
			}]
		},
		singleQuote: {
			category: "Common",
			type: "boolean",
			default: !1,
			description: "Use single quotes instead of double quotes."
		},
		proseWrap: {
			category: "Common",
			type: "choice",
			default: "preserve",
			description: "How to wrap prose.",
			choices: [
				{
					value: "always",
					description: "Wrap prose if it exceeds the print width."
				},
				{
					value: "never",
					description: "Do not wrap prose."
				},
				{
					value: "preserve",
					description: "Wrap prose as-is."
				}
			]
		},
		bracketSameLine: {
			category: "Common",
			type: "boolean",
			default: !1,
			description: "Put > of opening tags on the last line instead of on a new line."
		},
		singleAttributePerLine: {
			category: "Common",
			type: "boolean",
			default: !1,
			description: "Enforce single attribute per line in HTML, Vue and JSX."
		}
	};
	ku = {
		proseWrap: Gn.proseWrap,
		singleQuote: Gn.singleQuote
	};
	ru = {};
	Or(ru, {
		markdown: () => dE,
		mdx: () => gE,
		remark: () => dE
	});
	pt = (e) => e.position.start.offset;
	ht = (e) => e.position.end.offset;
	gm = {};
	Wn = {
		AElig: "Æ",
		AMP: "&",
		Aacute: "Á",
		Abreve: "Ă",
		Acirc: "Â",
		Acy: "А",
		Afr: "𝔄",
		Agrave: "À",
		Alpha: "Α",
		Amacr: "Ā",
		And: "⩓",
		Aogon: "Ą",
		Aopf: "𝔸",
		ApplyFunction: "⁡",
		Aring: "Å",
		Ascr: "𝒜",
		Assign: "≔",
		Atilde: "Ã",
		Auml: "Ä",
		Backslash: "∖",
		Barv: "⫧",
		Barwed: "⌆",
		Bcy: "Б",
		Because: "∵",
		Bernoullis: "ℬ",
		Beta: "Β",
		Bfr: "𝔅",
		Bopf: "𝔹",
		Breve: "˘",
		Bscr: "ℬ",
		Bumpeq: "≎",
		CHcy: "Ч",
		COPY: "©",
		Cacute: "Ć",
		Cap: "⋒",
		CapitalDifferentialD: "ⅅ",
		Cayleys: "ℭ",
		Ccaron: "Č",
		Ccedil: "Ç",
		Ccirc: "Ĉ",
		Cconint: "∰",
		Cdot: "Ċ",
		Cedilla: "¸",
		CenterDot: "·",
		Cfr: "ℭ",
		Chi: "Χ",
		CircleDot: "⊙",
		CircleMinus: "⊖",
		CirclePlus: "⊕",
		CircleTimes: "⊗",
		ClockwiseContourIntegral: "∲",
		CloseCurlyDoubleQuote: "”",
		CloseCurlyQuote: "’",
		Colon: "∷",
		Colone: "⩴",
		Congruent: "≡",
		Conint: "∯",
		ContourIntegral: "∮",
		Copf: "ℂ",
		Coproduct: "∐",
		CounterClockwiseContourIntegral: "∳",
		Cross: "⨯",
		Cscr: "𝒞",
		Cup: "⋓",
		CupCap: "≍",
		DD: "ⅅ",
		DDotrahd: "⤑",
		DJcy: "Ђ",
		DScy: "Ѕ",
		DZcy: "Џ",
		Dagger: "‡",
		Darr: "↡",
		Dashv: "⫤",
		Dcaron: "Ď",
		Dcy: "Д",
		Del: "∇",
		Delta: "Δ",
		Dfr: "𝔇",
		DiacriticalAcute: "´",
		DiacriticalDot: "˙",
		DiacriticalDoubleAcute: "˝",
		DiacriticalGrave: "`",
		DiacriticalTilde: "˜",
		Diamond: "⋄",
		DifferentialD: "ⅆ",
		Dopf: "𝔻",
		Dot: "¨",
		DotDot: "⃜",
		DotEqual: "≐",
		DoubleContourIntegral: "∯",
		DoubleDot: "¨",
		DoubleDownArrow: "⇓",
		DoubleLeftArrow: "⇐",
		DoubleLeftRightArrow: "⇔",
		DoubleLeftTee: "⫤",
		DoubleLongLeftArrow: "⟸",
		DoubleLongLeftRightArrow: "⟺",
		DoubleLongRightArrow: "⟹",
		DoubleRightArrow: "⇒",
		DoubleRightTee: "⊨",
		DoubleUpArrow: "⇑",
		DoubleUpDownArrow: "⇕",
		DoubleVerticalBar: "∥",
		DownArrow: "↓",
		DownArrowBar: "⤓",
		DownArrowUpArrow: "⇵",
		DownBreve: "̑",
		DownLeftRightVector: "⥐",
		DownLeftTeeVector: "⥞",
		DownLeftVector: "↽",
		DownLeftVectorBar: "⥖",
		DownRightTeeVector: "⥟",
		DownRightVector: "⇁",
		DownRightVectorBar: "⥗",
		DownTee: "⊤",
		DownTeeArrow: "↧",
		Downarrow: "⇓",
		Dscr: "𝒟",
		Dstrok: "Đ",
		ENG: "Ŋ",
		ETH: "Ð",
		Eacute: "É",
		Ecaron: "Ě",
		Ecirc: "Ê",
		Ecy: "Э",
		Edot: "Ė",
		Efr: "𝔈",
		Egrave: "È",
		Element: "∈",
		Emacr: "Ē",
		EmptySmallSquare: "◻",
		EmptyVerySmallSquare: "▫",
		Eogon: "Ę",
		Eopf: "𝔼",
		Epsilon: "Ε",
		Equal: "⩵",
		EqualTilde: "≂",
		Equilibrium: "⇌",
		Escr: "ℰ",
		Esim: "⩳",
		Eta: "Η",
		Euml: "Ë",
		Exists: "∃",
		ExponentialE: "ⅇ",
		Fcy: "Ф",
		Ffr: "𝔉",
		FilledSmallSquare: "◼",
		FilledVerySmallSquare: "▪",
		Fopf: "𝔽",
		ForAll: "∀",
		Fouriertrf: "ℱ",
		Fscr: "ℱ",
		GJcy: "Ѓ",
		GT: ">",
		Gamma: "Γ",
		Gammad: "Ϝ",
		Gbreve: "Ğ",
		Gcedil: "Ģ",
		Gcirc: "Ĝ",
		Gcy: "Г",
		Gdot: "Ġ",
		Gfr: "𝔊",
		Gg: "⋙",
		Gopf: "𝔾",
		GreaterEqual: "≥",
		GreaterEqualLess: "⋛",
		GreaterFullEqual: "≧",
		GreaterGreater: "⪢",
		GreaterLess: "≷",
		GreaterSlantEqual: "⩾",
		GreaterTilde: "≳",
		Gscr: "𝒢",
		Gt: "≫",
		HARDcy: "Ъ",
		Hacek: "ˇ",
		Hat: "^",
		Hcirc: "Ĥ",
		Hfr: "ℌ",
		HilbertSpace: "ℋ",
		Hopf: "ℍ",
		HorizontalLine: "─",
		Hscr: "ℋ",
		Hstrok: "Ħ",
		HumpDownHump: "≎",
		HumpEqual: "≏",
		IEcy: "Е",
		IJlig: "Ĳ",
		IOcy: "Ё",
		Iacute: "Í",
		Icirc: "Î",
		Icy: "И",
		Idot: "İ",
		Ifr: "ℑ",
		Igrave: "Ì",
		Im: "ℑ",
		Imacr: "Ī",
		ImaginaryI: "ⅈ",
		Implies: "⇒",
		Int: "∬",
		Integral: "∫",
		Intersection: "⋂",
		InvisibleComma: "⁣",
		InvisibleTimes: "⁢",
		Iogon: "Į",
		Iopf: "𝕀",
		Iota: "Ι",
		Iscr: "ℐ",
		Itilde: "Ĩ",
		Iukcy: "І",
		Iuml: "Ï",
		Jcirc: "Ĵ",
		Jcy: "Й",
		Jfr: "𝔍",
		Jopf: "𝕁",
		Jscr: "𝒥",
		Jsercy: "Ј",
		Jukcy: "Є",
		KHcy: "Х",
		KJcy: "Ќ",
		Kappa: "Κ",
		Kcedil: "Ķ",
		Kcy: "К",
		Kfr: "𝔎",
		Kopf: "𝕂",
		Kscr: "𝒦",
		LJcy: "Љ",
		LT: "<",
		Lacute: "Ĺ",
		Lambda: "Λ",
		Lang: "⟪",
		Laplacetrf: "ℒ",
		Larr: "↞",
		Lcaron: "Ľ",
		Lcedil: "Ļ",
		Lcy: "Л",
		LeftAngleBracket: "⟨",
		LeftArrow: "←",
		LeftArrowBar: "⇤",
		LeftArrowRightArrow: "⇆",
		LeftCeiling: "⌈",
		LeftDoubleBracket: "⟦",
		LeftDownTeeVector: "⥡",
		LeftDownVector: "⇃",
		LeftDownVectorBar: "⥙",
		LeftFloor: "⌊",
		LeftRightArrow: "↔",
		LeftRightVector: "⥎",
		LeftTee: "⊣",
		LeftTeeArrow: "↤",
		LeftTeeVector: "⥚",
		LeftTriangle: "⊲",
		LeftTriangleBar: "⧏",
		LeftTriangleEqual: "⊴",
		LeftUpDownVector: "⥑",
		LeftUpTeeVector: "⥠",
		LeftUpVector: "↿",
		LeftUpVectorBar: "⥘",
		LeftVector: "↼",
		LeftVectorBar: "⥒",
		Leftarrow: "⇐",
		Leftrightarrow: "⇔",
		LessEqualGreater: "⋚",
		LessFullEqual: "≦",
		LessGreater: "≶",
		LessLess: "⪡",
		LessSlantEqual: "⩽",
		LessTilde: "≲",
		Lfr: "𝔏",
		Ll: "⋘",
		Lleftarrow: "⇚",
		Lmidot: "Ŀ",
		LongLeftArrow: "⟵",
		LongLeftRightArrow: "⟷",
		LongRightArrow: "⟶",
		Longleftarrow: "⟸",
		Longleftrightarrow: "⟺",
		Longrightarrow: "⟹",
		Lopf: "𝕃",
		LowerLeftArrow: "↙",
		LowerRightArrow: "↘",
		Lscr: "ℒ",
		Lsh: "↰",
		Lstrok: "Ł",
		Lt: "≪",
		Map: "⤅",
		Mcy: "М",
		MediumSpace: " ",
		Mellintrf: "ℳ",
		Mfr: "𝔐",
		MinusPlus: "∓",
		Mopf: "𝕄",
		Mscr: "ℳ",
		Mu: "Μ",
		NJcy: "Њ",
		Nacute: "Ń",
		Ncaron: "Ň",
		Ncedil: "Ņ",
		Ncy: "Н",
		NegativeMediumSpace: "​",
		NegativeThickSpace: "​",
		NegativeThinSpace: "​",
		NegativeVeryThinSpace: "​",
		NestedGreaterGreater: "≫",
		NestedLessLess: "≪",
		NewLine: `
`,
		Nfr: "𝔑",
		NoBreak: "⁠",
		NonBreakingSpace: "\xA0",
		Nopf: "ℕ",
		Not: "⫬",
		NotCongruent: "≢",
		NotCupCap: "≭",
		NotDoubleVerticalBar: "∦",
		NotElement: "∉",
		NotEqual: "≠",
		NotEqualTilde: "≂̸",
		NotExists: "∄",
		NotGreater: "≯",
		NotGreaterEqual: "≱",
		NotGreaterFullEqual: "≧̸",
		NotGreaterGreater: "≫̸",
		NotGreaterLess: "≹",
		NotGreaterSlantEqual: "⩾̸",
		NotGreaterTilde: "≵",
		NotHumpDownHump: "≎̸",
		NotHumpEqual: "≏̸",
		NotLeftTriangle: "⋪",
		NotLeftTriangleBar: "⧏̸",
		NotLeftTriangleEqual: "⋬",
		NotLess: "≮",
		NotLessEqual: "≰",
		NotLessGreater: "≸",
		NotLessLess: "≪̸",
		NotLessSlantEqual: "⩽̸",
		NotLessTilde: "≴",
		NotNestedGreaterGreater: "⪢̸",
		NotNestedLessLess: "⪡̸",
		NotPrecedes: "⊀",
		NotPrecedesEqual: "⪯̸",
		NotPrecedesSlantEqual: "⋠",
		NotReverseElement: "∌",
		NotRightTriangle: "⋫",
		NotRightTriangleBar: "⧐̸",
		NotRightTriangleEqual: "⋭",
		NotSquareSubset: "⊏̸",
		NotSquareSubsetEqual: "⋢",
		NotSquareSuperset: "⊐̸",
		NotSquareSupersetEqual: "⋣",
		NotSubset: "⊂⃒",
		NotSubsetEqual: "⊈",
		NotSucceeds: "⊁",
		NotSucceedsEqual: "⪰̸",
		NotSucceedsSlantEqual: "⋡",
		NotSucceedsTilde: "≿̸",
		NotSuperset: "⊃⃒",
		NotSupersetEqual: "⊉",
		NotTilde: "≁",
		NotTildeEqual: "≄",
		NotTildeFullEqual: "≇",
		NotTildeTilde: "≉",
		NotVerticalBar: "∤",
		Nscr: "𝒩",
		Ntilde: "Ñ",
		Nu: "Ν",
		OElig: "Œ",
		Oacute: "Ó",
		Ocirc: "Ô",
		Ocy: "О",
		Odblac: "Ő",
		Ofr: "𝔒",
		Ograve: "Ò",
		Omacr: "Ō",
		Omega: "Ω",
		Omicron: "Ο",
		Oopf: "𝕆",
		OpenCurlyDoubleQuote: "“",
		OpenCurlyQuote: "‘",
		Or: "⩔",
		Oscr: "𝒪",
		Oslash: "Ø",
		Otilde: "Õ",
		Otimes: "⨷",
		Ouml: "Ö",
		OverBar: "‾",
		OverBrace: "⏞",
		OverBracket: "⎴",
		OverParenthesis: "⏜",
		PartialD: "∂",
		Pcy: "П",
		Pfr: "𝔓",
		Phi: "Φ",
		Pi: "Π",
		PlusMinus: "±",
		Poincareplane: "ℌ",
		Popf: "ℙ",
		Pr: "⪻",
		Precedes: "≺",
		PrecedesEqual: "⪯",
		PrecedesSlantEqual: "≼",
		PrecedesTilde: "≾",
		Prime: "″",
		Product: "∏",
		Proportion: "∷",
		Proportional: "∝",
		Pscr: "𝒫",
		Psi: "Ψ",
		QUOT: "\"",
		Qfr: "𝔔",
		Qopf: "ℚ",
		Qscr: "𝒬",
		RBarr: "⤐",
		REG: "®",
		Racute: "Ŕ",
		Rang: "⟫",
		Rarr: "↠",
		Rarrtl: "⤖",
		Rcaron: "Ř",
		Rcedil: "Ŗ",
		Rcy: "Р",
		Re: "ℜ",
		ReverseElement: "∋",
		ReverseEquilibrium: "⇋",
		ReverseUpEquilibrium: "⥯",
		Rfr: "ℜ",
		Rho: "Ρ",
		RightAngleBracket: "⟩",
		RightArrow: "→",
		RightArrowBar: "⇥",
		RightArrowLeftArrow: "⇄",
		RightCeiling: "⌉",
		RightDoubleBracket: "⟧",
		RightDownTeeVector: "⥝",
		RightDownVector: "⇂",
		RightDownVectorBar: "⥕",
		RightFloor: "⌋",
		RightTee: "⊢",
		RightTeeArrow: "↦",
		RightTeeVector: "⥛",
		RightTriangle: "⊳",
		RightTriangleBar: "⧐",
		RightTriangleEqual: "⊵",
		RightUpDownVector: "⥏",
		RightUpTeeVector: "⥜",
		RightUpVector: "↾",
		RightUpVectorBar: "⥔",
		RightVector: "⇀",
		RightVectorBar: "⥓",
		Rightarrow: "⇒",
		Ropf: "ℝ",
		RoundImplies: "⥰",
		Rrightarrow: "⇛",
		Rscr: "ℛ",
		Rsh: "↱",
		RuleDelayed: "⧴",
		SHCHcy: "Щ",
		SHcy: "Ш",
		SOFTcy: "Ь",
		Sacute: "Ś",
		Sc: "⪼",
		Scaron: "Š",
		Scedil: "Ş",
		Scirc: "Ŝ",
		Scy: "С",
		Sfr: "𝔖",
		ShortDownArrow: "↓",
		ShortLeftArrow: "←",
		ShortRightArrow: "→",
		ShortUpArrow: "↑",
		Sigma: "Σ",
		SmallCircle: "∘",
		Sopf: "𝕊",
		Sqrt: "√",
		Square: "□",
		SquareIntersection: "⊓",
		SquareSubset: "⊏",
		SquareSubsetEqual: "⊑",
		SquareSuperset: "⊐",
		SquareSupersetEqual: "⊒",
		SquareUnion: "⊔",
		Sscr: "𝒮",
		Star: "⋆",
		Sub: "⋐",
		Subset: "⋐",
		SubsetEqual: "⊆",
		Succeeds: "≻",
		SucceedsEqual: "⪰",
		SucceedsSlantEqual: "≽",
		SucceedsTilde: "≿",
		SuchThat: "∋",
		Sum: "∑",
		Sup: "⋑",
		Superset: "⊃",
		SupersetEqual: "⊇",
		Supset: "⋑",
		THORN: "Þ",
		TRADE: "™",
		TSHcy: "Ћ",
		TScy: "Ц",
		Tab: "	",
		Tau: "Τ",
		Tcaron: "Ť",
		Tcedil: "Ţ",
		Tcy: "Т",
		Tfr: "𝔗",
		Therefore: "∴",
		Theta: "Θ",
		ThickSpace: "  ",
		ThinSpace: " ",
		Tilde: "∼",
		TildeEqual: "≃",
		TildeFullEqual: "≅",
		TildeTilde: "≈",
		Topf: "𝕋",
		TripleDot: "⃛",
		Tscr: "𝒯",
		Tstrok: "Ŧ",
		Uacute: "Ú",
		Uarr: "↟",
		Uarrocir: "⥉",
		Ubrcy: "Ў",
		Ubreve: "Ŭ",
		Ucirc: "Û",
		Ucy: "У",
		Udblac: "Ű",
		Ufr: "𝔘",
		Ugrave: "Ù",
		Umacr: "Ū",
		UnderBar: "_",
		UnderBrace: "⏟",
		UnderBracket: "⎵",
		UnderParenthesis: "⏝",
		Union: "⋃",
		UnionPlus: "⊎",
		Uogon: "Ų",
		Uopf: "𝕌",
		UpArrow: "↑",
		UpArrowBar: "⤒",
		UpArrowDownArrow: "⇅",
		UpDownArrow: "↕",
		UpEquilibrium: "⥮",
		UpTee: "⊥",
		UpTeeArrow: "↥",
		Uparrow: "⇑",
		Updownarrow: "⇕",
		UpperLeftArrow: "↖",
		UpperRightArrow: "↗",
		Upsi: "ϒ",
		Upsilon: "Υ",
		Uring: "Ů",
		Uscr: "𝒰",
		Utilde: "Ũ",
		Uuml: "Ü",
		VDash: "⊫",
		Vbar: "⫫",
		Vcy: "В",
		Vdash: "⊩",
		Vdashl: "⫦",
		Vee: "⋁",
		Verbar: "‖",
		Vert: "‖",
		VerticalBar: "∣",
		VerticalLine: "|",
		VerticalSeparator: "❘",
		VerticalTilde: "≀",
		VeryThinSpace: " ",
		Vfr: "𝔙",
		Vopf: "𝕍",
		Vscr: "𝒱",
		Vvdash: "⊪",
		Wcirc: "Ŵ",
		Wedge: "⋀",
		Wfr: "𝔚",
		Wopf: "𝕎",
		Wscr: "𝒲",
		Xfr: "𝔛",
		Xi: "Ξ",
		Xopf: "𝕏",
		Xscr: "𝒳",
		YAcy: "Я",
		YIcy: "Ї",
		YUcy: "Ю",
		Yacute: "Ý",
		Ycirc: "Ŷ",
		Ycy: "Ы",
		Yfr: "𝔜",
		Yopf: "𝕐",
		Yscr: "𝒴",
		Yuml: "Ÿ",
		ZHcy: "Ж",
		Zacute: "Ź",
		Zcaron: "Ž",
		Zcy: "З",
		Zdot: "Ż",
		ZeroWidthSpace: "​",
		Zeta: "Ζ",
		Zfr: "ℨ",
		Zopf: "ℤ",
		Zscr: "𝒵",
		aacute: "á",
		abreve: "ă",
		ac: "∾",
		acE: "∾̳",
		acd: "∿",
		acirc: "â",
		acute: "´",
		acy: "а",
		aelig: "æ",
		af: "⁡",
		afr: "𝔞",
		agrave: "à",
		alefsym: "ℵ",
		aleph: "ℵ",
		alpha: "α",
		amacr: "ā",
		amalg: "⨿",
		amp: "&",
		and: "∧",
		andand: "⩕",
		andd: "⩜",
		andslope: "⩘",
		andv: "⩚",
		ang: "∠",
		ange: "⦤",
		angle: "∠",
		angmsd: "∡",
		angmsdaa: "⦨",
		angmsdab: "⦩",
		angmsdac: "⦪",
		angmsdad: "⦫",
		angmsdae: "⦬",
		angmsdaf: "⦭",
		angmsdag: "⦮",
		angmsdah: "⦯",
		angrt: "∟",
		angrtvb: "⊾",
		angrtvbd: "⦝",
		angsph: "∢",
		angst: "Å",
		angzarr: "⍼",
		aogon: "ą",
		aopf: "𝕒",
		ap: "≈",
		apE: "⩰",
		apacir: "⩯",
		ape: "≊",
		apid: "≋",
		apos: "'",
		approx: "≈",
		approxeq: "≊",
		aring: "å",
		ascr: "𝒶",
		ast: "*",
		asymp: "≈",
		asympeq: "≍",
		atilde: "ã",
		auml: "ä",
		awconint: "∳",
		awint: "⨑",
		bNot: "⫭",
		backcong: "≌",
		backepsilon: "϶",
		backprime: "‵",
		backsim: "∽",
		backsimeq: "⋍",
		barvee: "⊽",
		barwed: "⌅",
		barwedge: "⌅",
		bbrk: "⎵",
		bbrktbrk: "⎶",
		bcong: "≌",
		bcy: "б",
		bdquo: "„",
		becaus: "∵",
		because: "∵",
		bemptyv: "⦰",
		bepsi: "϶",
		bernou: "ℬ",
		beta: "β",
		beth: "ℶ",
		between: "≬",
		bfr: "𝔟",
		bigcap: "⋂",
		bigcirc: "◯",
		bigcup: "⋃",
		bigodot: "⨀",
		bigoplus: "⨁",
		bigotimes: "⨂",
		bigsqcup: "⨆",
		bigstar: "★",
		bigtriangledown: "▽",
		bigtriangleup: "△",
		biguplus: "⨄",
		bigvee: "⋁",
		bigwedge: "⋀",
		bkarow: "⤍",
		blacklozenge: "⧫",
		blacksquare: "▪",
		blacktriangle: "▴",
		blacktriangledown: "▾",
		blacktriangleleft: "◂",
		blacktriangleright: "▸",
		blank: "␣",
		blk12: "▒",
		blk14: "░",
		blk34: "▓",
		block: "█",
		bne: "=⃥",
		bnequiv: "≡⃥",
		bnot: "⌐",
		bopf: "𝕓",
		bot: "⊥",
		bottom: "⊥",
		bowtie: "⋈",
		boxDL: "╗",
		boxDR: "╔",
		boxDl: "╖",
		boxDr: "╓",
		boxH: "═",
		boxHD: "╦",
		boxHU: "╩",
		boxHd: "╤",
		boxHu: "╧",
		boxUL: "╝",
		boxUR: "╚",
		boxUl: "╜",
		boxUr: "╙",
		boxV: "║",
		boxVH: "╬",
		boxVL: "╣",
		boxVR: "╠",
		boxVh: "╫",
		boxVl: "╢",
		boxVr: "╟",
		boxbox: "⧉",
		boxdL: "╕",
		boxdR: "╒",
		boxdl: "┐",
		boxdr: "┌",
		boxh: "─",
		boxhD: "╥",
		boxhU: "╨",
		boxhd: "┬",
		boxhu: "┴",
		boxminus: "⊟",
		boxplus: "⊞",
		boxtimes: "⊠",
		boxuL: "╛",
		boxuR: "╘",
		boxul: "┘",
		boxur: "└",
		boxv: "│",
		boxvH: "╪",
		boxvL: "╡",
		boxvR: "╞",
		boxvh: "┼",
		boxvl: "┤",
		boxvr: "├",
		bprime: "‵",
		breve: "˘",
		brvbar: "¦",
		bscr: "𝒷",
		bsemi: "⁏",
		bsim: "∽",
		bsime: "⋍",
		bsol: "\\",
		bsolb: "⧅",
		bsolhsub: "⟈",
		bull: "•",
		bullet: "•",
		bump: "≎",
		bumpE: "⪮",
		bumpe: "≏",
		bumpeq: "≏",
		cacute: "ć",
		cap: "∩",
		capand: "⩄",
		capbrcup: "⩉",
		capcap: "⩋",
		capcup: "⩇",
		capdot: "⩀",
		caps: "∩︀",
		caret: "⁁",
		caron: "ˇ",
		ccaps: "⩍",
		ccaron: "č",
		ccedil: "ç",
		ccirc: "ĉ",
		ccups: "⩌",
		ccupssm: "⩐",
		cdot: "ċ",
		cedil: "¸",
		cemptyv: "⦲",
		cent: "¢",
		centerdot: "·",
		cfr: "𝔠",
		chcy: "ч",
		check: "✓",
		checkmark: "✓",
		chi: "χ",
		cir: "○",
		cirE: "⧃",
		circ: "ˆ",
		circeq: "≗",
		circlearrowleft: "↺",
		circlearrowright: "↻",
		circledR: "®",
		circledS: "Ⓢ",
		circledast: "⊛",
		circledcirc: "⊚",
		circleddash: "⊝",
		cire: "≗",
		cirfnint: "⨐",
		cirmid: "⫯",
		cirscir: "⧂",
		clubs: "♣",
		clubsuit: "♣",
		colon: ":",
		colone: "≔",
		coloneq: "≔",
		comma: ",",
		commat: "@",
		comp: "∁",
		compfn: "∘",
		complement: "∁",
		complexes: "ℂ",
		cong: "≅",
		congdot: "⩭",
		conint: "∮",
		copf: "𝕔",
		coprod: "∐",
		copy: "©",
		copysr: "℗",
		crarr: "↵",
		cross: "✗",
		cscr: "𝒸",
		csub: "⫏",
		csube: "⫑",
		csup: "⫐",
		csupe: "⫒",
		ctdot: "⋯",
		cudarrl: "⤸",
		cudarrr: "⤵",
		cuepr: "⋞",
		cuesc: "⋟",
		cularr: "↶",
		cularrp: "⤽",
		cup: "∪",
		cupbrcap: "⩈",
		cupcap: "⩆",
		cupcup: "⩊",
		cupdot: "⊍",
		cupor: "⩅",
		cups: "∪︀",
		curarr: "↷",
		curarrm: "⤼",
		curlyeqprec: "⋞",
		curlyeqsucc: "⋟",
		curlyvee: "⋎",
		curlywedge: "⋏",
		curren: "¤",
		curvearrowleft: "↶",
		curvearrowright: "↷",
		cuvee: "⋎",
		cuwed: "⋏",
		cwconint: "∲",
		cwint: "∱",
		cylcty: "⌭",
		dArr: "⇓",
		dHar: "⥥",
		dagger: "†",
		daleth: "ℸ",
		darr: "↓",
		dash: "‐",
		dashv: "⊣",
		dbkarow: "⤏",
		dblac: "˝",
		dcaron: "ď",
		dcy: "д",
		dd: "ⅆ",
		ddagger: "‡",
		ddarr: "⇊",
		ddotseq: "⩷",
		deg: "°",
		delta: "δ",
		demptyv: "⦱",
		dfisht: "⥿",
		dfr: "𝔡",
		dharl: "⇃",
		dharr: "⇂",
		diam: "⋄",
		diamond: "⋄",
		diamondsuit: "♦",
		diams: "♦",
		die: "¨",
		digamma: "ϝ",
		disin: "⋲",
		div: "÷",
		divide: "÷",
		divideontimes: "⋇",
		divonx: "⋇",
		djcy: "ђ",
		dlcorn: "⌞",
		dlcrop: "⌍",
		dollar: "$",
		dopf: "𝕕",
		dot: "˙",
		doteq: "≐",
		doteqdot: "≑",
		dotminus: "∸",
		dotplus: "∔",
		dotsquare: "⊡",
		doublebarwedge: "⌆",
		downarrow: "↓",
		downdownarrows: "⇊",
		downharpoonleft: "⇃",
		downharpoonright: "⇂",
		drbkarow: "⤐",
		drcorn: "⌟",
		drcrop: "⌌",
		dscr: "𝒹",
		dscy: "ѕ",
		dsol: "⧶",
		dstrok: "đ",
		dtdot: "⋱",
		dtri: "▿",
		dtrif: "▾",
		duarr: "⇵",
		duhar: "⥯",
		dwangle: "⦦",
		dzcy: "џ",
		dzigrarr: "⟿",
		eDDot: "⩷",
		eDot: "≑",
		eacute: "é",
		easter: "⩮",
		ecaron: "ě",
		ecir: "≖",
		ecirc: "ê",
		ecolon: "≕",
		ecy: "э",
		edot: "ė",
		ee: "ⅇ",
		efDot: "≒",
		efr: "𝔢",
		eg: "⪚",
		egrave: "è",
		egs: "⪖",
		egsdot: "⪘",
		el: "⪙",
		elinters: "⏧",
		ell: "ℓ",
		els: "⪕",
		elsdot: "⪗",
		emacr: "ē",
		empty: "∅",
		emptyset: "∅",
		emptyv: "∅",
		emsp13: " ",
		emsp14: " ",
		emsp: " ",
		eng: "ŋ",
		ensp: " ",
		eogon: "ę",
		eopf: "𝕖",
		epar: "⋕",
		eparsl: "⧣",
		eplus: "⩱",
		epsi: "ε",
		epsilon: "ε",
		epsiv: "ϵ",
		eqcirc: "≖",
		eqcolon: "≕",
		eqsim: "≂",
		eqslantgtr: "⪖",
		eqslantless: "⪕",
		equals: "=",
		equest: "≟",
		equiv: "≡",
		equivDD: "⩸",
		eqvparsl: "⧥",
		erDot: "≓",
		erarr: "⥱",
		escr: "ℯ",
		esdot: "≐",
		esim: "≂",
		eta: "η",
		eth: "ð",
		euml: "ë",
		euro: "€",
		excl: "!",
		exist: "∃",
		expectation: "ℰ",
		exponentiale: "ⅇ",
		fallingdotseq: "≒",
		fcy: "ф",
		female: "♀",
		ffilig: "ﬃ",
		fflig: "ﬀ",
		ffllig: "ﬄ",
		ffr: "𝔣",
		filig: "ﬁ",
		fjlig: "fj",
		flat: "♭",
		fllig: "ﬂ",
		fltns: "▱",
		fnof: "ƒ",
		fopf: "𝕗",
		forall: "∀",
		fork: "⋔",
		forkv: "⫙",
		fpartint: "⨍",
		frac12: "½",
		frac13: "⅓",
		frac14: "¼",
		frac15: "⅕",
		frac16: "⅙",
		frac18: "⅛",
		frac23: "⅔",
		frac25: "⅖",
		frac34: "¾",
		frac35: "⅗",
		frac38: "⅜",
		frac45: "⅘",
		frac56: "⅚",
		frac58: "⅝",
		frac78: "⅞",
		frasl: "⁄",
		frown: "⌢",
		fscr: "𝒻",
		gE: "≧",
		gEl: "⪌",
		gacute: "ǵ",
		gamma: "γ",
		gammad: "ϝ",
		gap: "⪆",
		gbreve: "ğ",
		gcirc: "ĝ",
		gcy: "г",
		gdot: "ġ",
		ge: "≥",
		gel: "⋛",
		geq: "≥",
		geqq: "≧",
		geqslant: "⩾",
		ges: "⩾",
		gescc: "⪩",
		gesdot: "⪀",
		gesdoto: "⪂",
		gesdotol: "⪄",
		gesl: "⋛︀",
		gesles: "⪔",
		gfr: "𝔤",
		gg: "≫",
		ggg: "⋙",
		gimel: "ℷ",
		gjcy: "ѓ",
		gl: "≷",
		glE: "⪒",
		gla: "⪥",
		glj: "⪤",
		gnE: "≩",
		gnap: "⪊",
		gnapprox: "⪊",
		gne: "⪈",
		gneq: "⪈",
		gneqq: "≩",
		gnsim: "⋧",
		gopf: "𝕘",
		grave: "`",
		gscr: "ℊ",
		gsim: "≳",
		gsime: "⪎",
		gsiml: "⪐",
		gt: ">",
		gtcc: "⪧",
		gtcir: "⩺",
		gtdot: "⋗",
		gtlPar: "⦕",
		gtquest: "⩼",
		gtrapprox: "⪆",
		gtrarr: "⥸",
		gtrdot: "⋗",
		gtreqless: "⋛",
		gtreqqless: "⪌",
		gtrless: "≷",
		gtrsim: "≳",
		gvertneqq: "≩︀",
		gvnE: "≩︀",
		hArr: "⇔",
		hairsp: " ",
		half: "½",
		hamilt: "ℋ",
		hardcy: "ъ",
		harr: "↔",
		harrcir: "⥈",
		harrw: "↭",
		hbar: "ℏ",
		hcirc: "ĥ",
		hearts: "♥",
		heartsuit: "♥",
		hellip: "…",
		hercon: "⊹",
		hfr: "𝔥",
		hksearow: "⤥",
		hkswarow: "⤦",
		hoarr: "⇿",
		homtht: "∻",
		hookleftarrow: "↩",
		hookrightarrow: "↪",
		hopf: "𝕙",
		horbar: "―",
		hscr: "𝒽",
		hslash: "ℏ",
		hstrok: "ħ",
		hybull: "⁃",
		hyphen: "‐",
		iacute: "í",
		ic: "⁣",
		icirc: "î",
		icy: "и",
		iecy: "е",
		iexcl: "¡",
		iff: "⇔",
		ifr: "𝔦",
		igrave: "ì",
		ii: "ⅈ",
		iiiint: "⨌",
		iiint: "∭",
		iinfin: "⧜",
		iiota: "℩",
		ijlig: "ĳ",
		imacr: "ī",
		image: "ℑ",
		imagline: "ℐ",
		imagpart: "ℑ",
		imath: "ı",
		imof: "⊷",
		imped: "Ƶ",
		in: "∈",
		incare: "℅",
		infin: "∞",
		infintie: "⧝",
		inodot: "ı",
		int: "∫",
		intcal: "⊺",
		integers: "ℤ",
		intercal: "⊺",
		intlarhk: "⨗",
		intprod: "⨼",
		iocy: "ё",
		iogon: "į",
		iopf: "𝕚",
		iota: "ι",
		iprod: "⨼",
		iquest: "¿",
		iscr: "𝒾",
		isin: "∈",
		isinE: "⋹",
		isindot: "⋵",
		isins: "⋴",
		isinsv: "⋳",
		isinv: "∈",
		it: "⁢",
		itilde: "ĩ",
		iukcy: "і",
		iuml: "ï",
		jcirc: "ĵ",
		jcy: "й",
		jfr: "𝔧",
		jmath: "ȷ",
		jopf: "𝕛",
		jscr: "𝒿",
		jsercy: "ј",
		jukcy: "є",
		kappa: "κ",
		kappav: "ϰ",
		kcedil: "ķ",
		kcy: "к",
		kfr: "𝔨",
		kgreen: "ĸ",
		khcy: "х",
		kjcy: "ќ",
		kopf: "𝕜",
		kscr: "𝓀",
		lAarr: "⇚",
		lArr: "⇐",
		lAtail: "⤛",
		lBarr: "⤎",
		lE: "≦",
		lEg: "⪋",
		lHar: "⥢",
		lacute: "ĺ",
		laemptyv: "⦴",
		lagran: "ℒ",
		lambda: "λ",
		lang: "⟨",
		langd: "⦑",
		langle: "⟨",
		lap: "⪅",
		laquo: "«",
		larr: "←",
		larrb: "⇤",
		larrbfs: "⤟",
		larrfs: "⤝",
		larrhk: "↩",
		larrlp: "↫",
		larrpl: "⤹",
		larrsim: "⥳",
		larrtl: "↢",
		lat: "⪫",
		latail: "⤙",
		late: "⪭",
		lates: "⪭︀",
		lbarr: "⤌",
		lbbrk: "❲",
		lbrace: "{",
		lbrack: "[",
		lbrke: "⦋",
		lbrksld: "⦏",
		lbrkslu: "⦍",
		lcaron: "ľ",
		lcedil: "ļ",
		lceil: "⌈",
		lcub: "{",
		lcy: "л",
		ldca: "⤶",
		ldquo: "“",
		ldquor: "„",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		ldsh: "↲",
		le: "≤",
		leftarrow: "←",
		leftarrowtail: "↢",
		leftharpoondown: "↽",
		leftharpoonup: "↼",
		leftleftarrows: "⇇",
		leftrightarrow: "↔",
		leftrightarrows: "⇆",
		leftrightharpoons: "⇋",
		leftrightsquigarrow: "↭",
		leftthreetimes: "⋋",
		leg: "⋚",
		leq: "≤",
		leqq: "≦",
		leqslant: "⩽",
		les: "⩽",
		lescc: "⪨",
		lesdot: "⩿",
		lesdoto: "⪁",
		lesdotor: "⪃",
		lesg: "⋚︀",
		lesges: "⪓",
		lessapprox: "⪅",
		lessdot: "⋖",
		lesseqgtr: "⋚",
		lesseqqgtr: "⪋",
		lessgtr: "≶",
		lesssim: "≲",
		lfisht: "⥼",
		lfloor: "⌊",
		lfr: "𝔩",
		lg: "≶",
		lgE: "⪑",
		lhard: "↽",
		lharu: "↼",
		lharul: "⥪",
		lhblk: "▄",
		ljcy: "љ",
		ll: "≪",
		llarr: "⇇",
		llcorner: "⌞",
		llhard: "⥫",
		lltri: "◺",
		lmidot: "ŀ",
		lmoust: "⎰",
		lmoustache: "⎰",
		lnE: "≨",
		lnap: "⪉",
		lnapprox: "⪉",
		lne: "⪇",
		lneq: "⪇",
		lneqq: "≨",
		lnsim: "⋦",
		loang: "⟬",
		loarr: "⇽",
		lobrk: "⟦",
		longleftarrow: "⟵",
		longleftrightarrow: "⟷",
		longmapsto: "⟼",
		longrightarrow: "⟶",
		looparrowleft: "↫",
		looparrowright: "↬",
		lopar: "⦅",
		lopf: "𝕝",
		loplus: "⨭",
		lotimes: "⨴",
		lowast: "∗",
		lowbar: "_",
		loz: "◊",
		lozenge: "◊",
		lozf: "⧫",
		lpar: "(",
		lparlt: "⦓",
		lrarr: "⇆",
		lrcorner: "⌟",
		lrhar: "⇋",
		lrhard: "⥭",
		lrm: "‎",
		lrtri: "⊿",
		lsaquo: "‹",
		lscr: "𝓁",
		lsh: "↰",
		lsim: "≲",
		lsime: "⪍",
		lsimg: "⪏",
		lsqb: "[",
		lsquo: "‘",
		lsquor: "‚",
		lstrok: "ł",
		lt: "<",
		ltcc: "⪦",
		ltcir: "⩹",
		ltdot: "⋖",
		lthree: "⋋",
		ltimes: "⋉",
		ltlarr: "⥶",
		ltquest: "⩻",
		ltrPar: "⦖",
		ltri: "◃",
		ltrie: "⊴",
		ltrif: "◂",
		lurdshar: "⥊",
		luruhar: "⥦",
		lvertneqq: "≨︀",
		lvnE: "≨︀",
		mDDot: "∺",
		macr: "¯",
		male: "♂",
		malt: "✠",
		maltese: "✠",
		map: "↦",
		mapsto: "↦",
		mapstodown: "↧",
		mapstoleft: "↤",
		mapstoup: "↥",
		marker: "▮",
		mcomma: "⨩",
		mcy: "м",
		mdash: "—",
		measuredangle: "∡",
		mfr: "𝔪",
		mho: "℧",
		micro: "µ",
		mid: "∣",
		midast: "*",
		midcir: "⫰",
		middot: "·",
		minus: "−",
		minusb: "⊟",
		minusd: "∸",
		minusdu: "⨪",
		mlcp: "⫛",
		mldr: "…",
		mnplus: "∓",
		models: "⊧",
		mopf: "𝕞",
		mp: "∓",
		mscr: "𝓂",
		mstpos: "∾",
		mu: "μ",
		multimap: "⊸",
		mumap: "⊸",
		nGg: "⋙̸",
		nGt: "≫⃒",
		nGtv: "≫̸",
		nLeftarrow: "⇍",
		nLeftrightarrow: "⇎",
		nLl: "⋘̸",
		nLt: "≪⃒",
		nLtv: "≪̸",
		nRightarrow: "⇏",
		nVDash: "⊯",
		nVdash: "⊮",
		nabla: "∇",
		nacute: "ń",
		nang: "∠⃒",
		nap: "≉",
		napE: "⩰̸",
		napid: "≋̸",
		napos: "ŉ",
		napprox: "≉",
		natur: "♮",
		natural: "♮",
		naturals: "ℕ",
		nbsp: "\xA0",
		nbump: "≎̸",
		nbumpe: "≏̸",
		ncap: "⩃",
		ncaron: "ň",
		ncedil: "ņ",
		ncong: "≇",
		ncongdot: "⩭̸",
		ncup: "⩂",
		ncy: "н",
		ndash: "–",
		ne: "≠",
		neArr: "⇗",
		nearhk: "⤤",
		nearr: "↗",
		nearrow: "↗",
		nedot: "≐̸",
		nequiv: "≢",
		nesear: "⤨",
		nesim: "≂̸",
		nexist: "∄",
		nexists: "∄",
		nfr: "𝔫",
		ngE: "≧̸",
		nge: "≱",
		ngeq: "≱",
		ngeqq: "≧̸",
		ngeqslant: "⩾̸",
		nges: "⩾̸",
		ngsim: "≵",
		ngt: "≯",
		ngtr: "≯",
		nhArr: "⇎",
		nharr: "↮",
		nhpar: "⫲",
		ni: "∋",
		nis: "⋼",
		nisd: "⋺",
		niv: "∋",
		njcy: "њ",
		nlArr: "⇍",
		nlE: "≦̸",
		nlarr: "↚",
		nldr: "‥",
		nle: "≰",
		nleftarrow: "↚",
		nleftrightarrow: "↮",
		nleq: "≰",
		nleqq: "≦̸",
		nleqslant: "⩽̸",
		nles: "⩽̸",
		nless: "≮",
		nlsim: "≴",
		nlt: "≮",
		nltri: "⋪",
		nltrie: "⋬",
		nmid: "∤",
		nopf: "𝕟",
		not: "¬",
		notin: "∉",
		notinE: "⋹̸",
		notindot: "⋵̸",
		notinva: "∉",
		notinvb: "⋷",
		notinvc: "⋶",
		notni: "∌",
		notniva: "∌",
		notnivb: "⋾",
		notnivc: "⋽",
		npar: "∦",
		nparallel: "∦",
		nparsl: "⫽⃥",
		npart: "∂̸",
		npolint: "⨔",
		npr: "⊀",
		nprcue: "⋠",
		npre: "⪯̸",
		nprec: "⊀",
		npreceq: "⪯̸",
		nrArr: "⇏",
		nrarr: "↛",
		nrarrc: "⤳̸",
		nrarrw: "↝̸",
		nrightarrow: "↛",
		nrtri: "⋫",
		nrtrie: "⋭",
		nsc: "⊁",
		nsccue: "⋡",
		nsce: "⪰̸",
		nscr: "𝓃",
		nshortmid: "∤",
		nshortparallel: "∦",
		nsim: "≁",
		nsime: "≄",
		nsimeq: "≄",
		nsmid: "∤",
		nspar: "∦",
		nsqsube: "⋢",
		nsqsupe: "⋣",
		nsub: "⊄",
		nsubE: "⫅̸",
		nsube: "⊈",
		nsubset: "⊂⃒",
		nsubseteq: "⊈",
		nsubseteqq: "⫅̸",
		nsucc: "⊁",
		nsucceq: "⪰̸",
		nsup: "⊅",
		nsupE: "⫆̸",
		nsupe: "⊉",
		nsupset: "⊃⃒",
		nsupseteq: "⊉",
		nsupseteqq: "⫆̸",
		ntgl: "≹",
		ntilde: "ñ",
		ntlg: "≸",
		ntriangleleft: "⋪",
		ntrianglelefteq: "⋬",
		ntriangleright: "⋫",
		ntrianglerighteq: "⋭",
		nu: "ν",
		num: "#",
		numero: "№",
		numsp: " ",
		nvDash: "⊭",
		nvHarr: "⤄",
		nvap: "≍⃒",
		nvdash: "⊬",
		nvge: "≥⃒",
		nvgt: ">⃒",
		nvinfin: "⧞",
		nvlArr: "⤂",
		nvle: "≤⃒",
		nvlt: "<⃒",
		nvltrie: "⊴⃒",
		nvrArr: "⤃",
		nvrtrie: "⊵⃒",
		nvsim: "∼⃒",
		nwArr: "⇖",
		nwarhk: "⤣",
		nwarr: "↖",
		nwarrow: "↖",
		nwnear: "⤧",
		oS: "Ⓢ",
		oacute: "ó",
		oast: "⊛",
		ocir: "⊚",
		ocirc: "ô",
		ocy: "о",
		odash: "⊝",
		odblac: "ő",
		odiv: "⨸",
		odot: "⊙",
		odsold: "⦼",
		oelig: "œ",
		ofcir: "⦿",
		ofr: "𝔬",
		ogon: "˛",
		ograve: "ò",
		ogt: "⧁",
		ohbar: "⦵",
		ohm: "Ω",
		oint: "∮",
		olarr: "↺",
		olcir: "⦾",
		olcross: "⦻",
		oline: "‾",
		olt: "⧀",
		omacr: "ō",
		omega: "ω",
		omicron: "ο",
		omid: "⦶",
		ominus: "⊖",
		oopf: "𝕠",
		opar: "⦷",
		operp: "⦹",
		oplus: "⊕",
		or: "∨",
		orarr: "↻",
		ord: "⩝",
		order: "ℴ",
		orderof: "ℴ",
		ordf: "ª",
		ordm: "º",
		origof: "⊶",
		oror: "⩖",
		orslope: "⩗",
		orv: "⩛",
		oscr: "ℴ",
		oslash: "ø",
		osol: "⊘",
		otilde: "õ",
		otimes: "⊗",
		otimesas: "⨶",
		ouml: "ö",
		ovbar: "⌽",
		par: "∥",
		para: "¶",
		parallel: "∥",
		parsim: "⫳",
		parsl: "⫽",
		part: "∂",
		pcy: "п",
		percnt: "%",
		period: ".",
		permil: "‰",
		perp: "⊥",
		pertenk: "‱",
		pfr: "𝔭",
		phi: "φ",
		phiv: "ϕ",
		phmmat: "ℳ",
		phone: "☎",
		pi: "π",
		pitchfork: "⋔",
		piv: "ϖ",
		planck: "ℏ",
		planckh: "ℎ",
		plankv: "ℏ",
		plus: "+",
		plusacir: "⨣",
		plusb: "⊞",
		pluscir: "⨢",
		plusdo: "∔",
		plusdu: "⨥",
		pluse: "⩲",
		plusmn: "±",
		plussim: "⨦",
		plustwo: "⨧",
		pm: "±",
		pointint: "⨕",
		popf: "𝕡",
		pound: "£",
		pr: "≺",
		prE: "⪳",
		prap: "⪷",
		prcue: "≼",
		pre: "⪯",
		prec: "≺",
		precapprox: "⪷",
		preccurlyeq: "≼",
		preceq: "⪯",
		precnapprox: "⪹",
		precneqq: "⪵",
		precnsim: "⋨",
		precsim: "≾",
		prime: "′",
		primes: "ℙ",
		prnE: "⪵",
		prnap: "⪹",
		prnsim: "⋨",
		prod: "∏",
		profalar: "⌮",
		profline: "⌒",
		profsurf: "⌓",
		prop: "∝",
		propto: "∝",
		prsim: "≾",
		prurel: "⊰",
		pscr: "𝓅",
		psi: "ψ",
		puncsp: " ",
		qfr: "𝔮",
		qint: "⨌",
		qopf: "𝕢",
		qprime: "⁗",
		qscr: "𝓆",
		quaternions: "ℍ",
		quatint: "⨖",
		quest: "?",
		questeq: "≟",
		quot: "\"",
		rAarr: "⇛",
		rArr: "⇒",
		rAtail: "⤜",
		rBarr: "⤏",
		rHar: "⥤",
		race: "∽̱",
		racute: "ŕ",
		radic: "√",
		raemptyv: "⦳",
		rang: "⟩",
		rangd: "⦒",
		range: "⦥",
		rangle: "⟩",
		raquo: "»",
		rarr: "→",
		rarrap: "⥵",
		rarrb: "⇥",
		rarrbfs: "⤠",
		rarrc: "⤳",
		rarrfs: "⤞",
		rarrhk: "↪",
		rarrlp: "↬",
		rarrpl: "⥅",
		rarrsim: "⥴",
		rarrtl: "↣",
		rarrw: "↝",
		ratail: "⤚",
		ratio: "∶",
		rationals: "ℚ",
		rbarr: "⤍",
		rbbrk: "❳",
		rbrace: "}",
		rbrack: "]",
		rbrke: "⦌",
		rbrksld: "⦎",
		rbrkslu: "⦐",
		rcaron: "ř",
		rcedil: "ŗ",
		rceil: "⌉",
		rcub: "}",
		rcy: "р",
		rdca: "⤷",
		rdldhar: "⥩",
		rdquo: "”",
		rdquor: "”",
		rdsh: "↳",
		real: "ℜ",
		realine: "ℛ",
		realpart: "ℜ",
		reals: "ℝ",
		rect: "▭",
		reg: "®",
		rfisht: "⥽",
		rfloor: "⌋",
		rfr: "𝔯",
		rhard: "⇁",
		rharu: "⇀",
		rharul: "⥬",
		rho: "ρ",
		rhov: "ϱ",
		rightarrow: "→",
		rightarrowtail: "↣",
		rightharpoondown: "⇁",
		rightharpoonup: "⇀",
		rightleftarrows: "⇄",
		rightleftharpoons: "⇌",
		rightrightarrows: "⇉",
		rightsquigarrow: "↝",
		rightthreetimes: "⋌",
		ring: "˚",
		risingdotseq: "≓",
		rlarr: "⇄",
		rlhar: "⇌",
		rlm: "‏",
		rmoust: "⎱",
		rmoustache: "⎱",
		rnmid: "⫮",
		roang: "⟭",
		roarr: "⇾",
		robrk: "⟧",
		ropar: "⦆",
		ropf: "𝕣",
		roplus: "⨮",
		rotimes: "⨵",
		rpar: ")",
		rpargt: "⦔",
		rppolint: "⨒",
		rrarr: "⇉",
		rsaquo: "›",
		rscr: "𝓇",
		rsh: "↱",
		rsqb: "]",
		rsquo: "’",
		rsquor: "’",
		rthree: "⋌",
		rtimes: "⋊",
		rtri: "▹",
		rtrie: "⊵",
		rtrif: "▸",
		rtriltri: "⧎",
		ruluhar: "⥨",
		rx: "℞",
		sacute: "ś",
		sbquo: "‚",
		sc: "≻",
		scE: "⪴",
		scap: "⪸",
		scaron: "š",
		sccue: "≽",
		sce: "⪰",
		scedil: "ş",
		scirc: "ŝ",
		scnE: "⪶",
		scnap: "⪺",
		scnsim: "⋩",
		scpolint: "⨓",
		scsim: "≿",
		scy: "с",
		sdot: "⋅",
		sdotb: "⊡",
		sdote: "⩦",
		seArr: "⇘",
		searhk: "⤥",
		searr: "↘",
		searrow: "↘",
		sect: "§",
		semi: ";",
		seswar: "⤩",
		setminus: "∖",
		setmn: "∖",
		sext: "✶",
		sfr: "𝔰",
		sfrown: "⌢",
		sharp: "♯",
		shchcy: "щ",
		shcy: "ш",
		shortmid: "∣",
		shortparallel: "∥",
		shy: "­",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		sim: "∼",
		simdot: "⩪",
		sime: "≃",
		simeq: "≃",
		simg: "⪞",
		simgE: "⪠",
		siml: "⪝",
		simlE: "⪟",
		simne: "≆",
		simplus: "⨤",
		simrarr: "⥲",
		slarr: "←",
		smallsetminus: "∖",
		smashp: "⨳",
		smeparsl: "⧤",
		smid: "∣",
		smile: "⌣",
		smt: "⪪",
		smte: "⪬",
		smtes: "⪬︀",
		softcy: "ь",
		sol: "/",
		solb: "⧄",
		solbar: "⌿",
		sopf: "𝕤",
		spades: "♠",
		spadesuit: "♠",
		spar: "∥",
		sqcap: "⊓",
		sqcaps: "⊓︀",
		sqcup: "⊔",
		sqcups: "⊔︀",
		sqsub: "⊏",
		sqsube: "⊑",
		sqsubset: "⊏",
		sqsubseteq: "⊑",
		sqsup: "⊐",
		sqsupe: "⊒",
		sqsupset: "⊐",
		sqsupseteq: "⊒",
		squ: "□",
		square: "□",
		squarf: "▪",
		squf: "▪",
		srarr: "→",
		sscr: "𝓈",
		ssetmn: "∖",
		ssmile: "⌣",
		sstarf: "⋆",
		star: "☆",
		starf: "★",
		straightepsilon: "ϵ",
		straightphi: "ϕ",
		strns: "¯",
		sub: "⊂",
		subE: "⫅",
		subdot: "⪽",
		sube: "⊆",
		subedot: "⫃",
		submult: "⫁",
		subnE: "⫋",
		subne: "⊊",
		subplus: "⪿",
		subrarr: "⥹",
		subset: "⊂",
		subseteq: "⊆",
		subseteqq: "⫅",
		subsetneq: "⊊",
		subsetneqq: "⫋",
		subsim: "⫇",
		subsub: "⫕",
		subsup: "⫓",
		succ: "≻",
		succapprox: "⪸",
		succcurlyeq: "≽",
		succeq: "⪰",
		succnapprox: "⪺",
		succneqq: "⪶",
		succnsim: "⋩",
		succsim: "≿",
		sum: "∑",
		sung: "♪",
		sup1: "¹",
		sup2: "²",
		sup3: "³",
		sup: "⊃",
		supE: "⫆",
		supdot: "⪾",
		supdsub: "⫘",
		supe: "⊇",
		supedot: "⫄",
		suphsol: "⟉",
		suphsub: "⫗",
		suplarr: "⥻",
		supmult: "⫂",
		supnE: "⫌",
		supne: "⊋",
		supplus: "⫀",
		supset: "⊃",
		supseteq: "⊇",
		supseteqq: "⫆",
		supsetneq: "⊋",
		supsetneqq: "⫌",
		supsim: "⫈",
		supsub: "⫔",
		supsup: "⫖",
		swArr: "⇙",
		swarhk: "⤦",
		swarr: "↙",
		swarrow: "↙",
		swnwar: "⤪",
		szlig: "ß",
		target: "⌖",
		tau: "τ",
		tbrk: "⎴",
		tcaron: "ť",
		tcedil: "ţ",
		tcy: "т",
		tdot: "⃛",
		telrec: "⌕",
		tfr: "𝔱",
		there4: "∴",
		therefore: "∴",
		theta: "θ",
		thetasym: "ϑ",
		thetav: "ϑ",
		thickapprox: "≈",
		thicksim: "∼",
		thinsp: " ",
		thkap: "≈",
		thksim: "∼",
		thorn: "þ",
		tilde: "˜",
		times: "×",
		timesb: "⊠",
		timesbar: "⨱",
		timesd: "⨰",
		tint: "∭",
		toea: "⤨",
		top: "⊤",
		topbot: "⌶",
		topcir: "⫱",
		topf: "𝕥",
		topfork: "⫚",
		tosa: "⤩",
		tprime: "‴",
		trade: "™",
		triangle: "▵",
		triangledown: "▿",
		triangleleft: "◃",
		trianglelefteq: "⊴",
		triangleq: "≜",
		triangleright: "▹",
		trianglerighteq: "⊵",
		tridot: "◬",
		trie: "≜",
		triminus: "⨺",
		triplus: "⨹",
		trisb: "⧍",
		tritime: "⨻",
		trpezium: "⏢",
		tscr: "𝓉",
		tscy: "ц",
		tshcy: "ћ",
		tstrok: "ŧ",
		twixt: "≬",
		twoheadleftarrow: "↞",
		twoheadrightarrow: "↠",
		uArr: "⇑",
		uHar: "⥣",
		uacute: "ú",
		uarr: "↑",
		ubrcy: "ў",
		ubreve: "ŭ",
		ucirc: "û",
		ucy: "у",
		udarr: "⇅",
		udblac: "ű",
		udhar: "⥮",
		ufisht: "⥾",
		ufr: "𝔲",
		ugrave: "ù",
		uharl: "↿",
		uharr: "↾",
		uhblk: "▀",
		ulcorn: "⌜",
		ulcorner: "⌜",
		ulcrop: "⌏",
		ultri: "◸",
		umacr: "ū",
		uml: "¨",
		uogon: "ų",
		uopf: "𝕦",
		uparrow: "↑",
		updownarrow: "↕",
		upharpoonleft: "↿",
		upharpoonright: "↾",
		uplus: "⊎",
		upsi: "υ",
		upsih: "ϒ",
		upsilon: "υ",
		upuparrows: "⇈",
		urcorn: "⌝",
		urcorner: "⌝",
		urcrop: "⌎",
		uring: "ů",
		urtri: "◹",
		uscr: "𝓊",
		utdot: "⋰",
		utilde: "ũ",
		utri: "▵",
		utrif: "▴",
		uuarr: "⇈",
		uuml: "ü",
		uwangle: "⦧",
		vArr: "⇕",
		vBar: "⫨",
		vBarv: "⫩",
		vDash: "⊨",
		vangrt: "⦜",
		varepsilon: "ϵ",
		varkappa: "ϰ",
		varnothing: "∅",
		varphi: "ϕ",
		varpi: "ϖ",
		varpropto: "∝",
		varr: "↕",
		varrho: "ϱ",
		varsigma: "ς",
		varsubsetneq: "⊊︀",
		varsubsetneqq: "⫋︀",
		varsupsetneq: "⊋︀",
		varsupsetneqq: "⫌︀",
		vartheta: "ϑ",
		vartriangleleft: "⊲",
		vartriangleright: "⊳",
		vcy: "в",
		vdash: "⊢",
		vee: "∨",
		veebar: "⊻",
		veeeq: "≚",
		vellip: "⋮",
		verbar: "|",
		vert: "|",
		vfr: "𝔳",
		vltri: "⊲",
		vnsub: "⊂⃒",
		vnsup: "⊃⃒",
		vopf: "𝕧",
		vprop: "∝",
		vrtri: "⊳",
		vscr: "𝓋",
		vsubnE: "⫋︀",
		vsubne: "⊊︀",
		vsupnE: "⫌︀",
		vsupne: "⊋︀",
		vzigzag: "⦚",
		wcirc: "ŵ",
		wedbar: "⩟",
		wedge: "∧",
		wedgeq: "≙",
		weierp: "℘",
		wfr: "𝔴",
		wopf: "𝕨",
		wp: "℘",
		wr: "≀",
		wreath: "≀",
		wscr: "𝓌",
		xcap: "⋂",
		xcirc: "◯",
		xcup: "⋃",
		xdtri: "▽",
		xfr: "𝔵",
		xhArr: "⟺",
		xharr: "⟷",
		xi: "ξ",
		xlArr: "⟸",
		xlarr: "⟵",
		xmap: "⟼",
		xnis: "⋻",
		xodot: "⨀",
		xopf: "𝕩",
		xoplus: "⨁",
		xotime: "⨂",
		xrArr: "⟹",
		xrarr: "⟶",
		xscr: "𝓍",
		xsqcup: "⨆",
		xuplus: "⨄",
		xutri: "△",
		xvee: "⋁",
		xwedge: "⋀",
		yacute: "ý",
		yacy: "я",
		ycirc: "ŷ",
		ycy: "ы",
		yen: "¥",
		yfr: "𝔶",
		yicy: "ї",
		yopf: "𝕪",
		yscr: "𝓎",
		yucy: "ю",
		yuml: "ÿ",
		zacute: "ź",
		zcaron: "ž",
		zcy: "з",
		zdot: "ż",
		zeetrf: "ℨ",
		zeta: "ζ",
		zfr: "𝔷",
		zhcy: "ж",
		zigrarr: "⇝",
		zopf: "𝕫",
		zscr: "𝓏",
		zwj: "‍",
		zwnj: "‌"
	};
	km = {}.hasOwnProperty;
	Eu = {}.hasOwnProperty;
	K = rt(/[A-Za-z]/);
	Q = rt(/[\dA-Za-z]/);
	wu = rt(/[#-'*+\--9=?A-Z^-~]/);
	tr = rt(/\d/);
	Cu = rt(/[\dA-Fa-f]/);
	yu = rt(/[!-/:-@[-`{-~]/);
	Dt = rt(/\p{P}|\p{S}/u);
	Ie = rt(/\s/);
	vu = { tokenize: Em };
	Tu = { tokenize: wm };
	Au = { tokenize: Cm };
	rr = {
		name: "attention",
		resolveAll: ym,
		tokenize: vm
	};
	Yn = {
		name: "autolink",
		tokenize: Am
	};
	qe = {
		partial: !0,
		tokenize: Tm
	};
	Mr = {
		continuation: { tokenize: Lm },
		exit: Im,
		name: "blockQuote",
		tokenize: Sm
	};
	zr = {
		name: "characterEscape",
		tokenize: qm
	};
	Ur = {
		name: "characterReference",
		tokenize: Bm
	};
	Lu = {
		partial: !0,
		tokenize: Pm
	};
	Hr = {
		concrete: !0,
		name: "codeFenced",
		tokenize: _m
	};
	nr = {
		name: "codeIndented",
		tokenize: Nm
	};
	Om = {
		partial: !0,
		tokenize: Rm
	};
	$n = {
		name: "codeText",
		previous: zm,
		resolve: Mm,
		tokenize: Um
	};
	Vr = class {
		constructor(t) {
			this.left = t ? [...t] : [], this.right = [];
		}
		get(t) {
			if (t < 0 || t >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
			return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
		}
		get length() {
			return this.left.length + this.right.length;
		}
		shift() {
			return this.setCursor(0), this.right.pop();
		}
		slice(t, r) {
			let n = r ?? Number.POSITIVE_INFINITY;
			return n < this.left.length ? this.left.slice(t, n) : t > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
		}
		splice(t, r, n) {
			let i = r || 0;
			this.setCursor(Math.trunc(t));
			let u = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
			return n && ir(this.left, n), u.reverse();
		}
		pop() {
			return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
		}
		push(t) {
			this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
		}
		pushMany(t) {
			this.setCursor(Number.POSITIVE_INFINITY), ir(this.left, t);
		}
		unshift(t) {
			this.setCursor(0), this.right.push(t);
		}
		unshiftMany(t) {
			this.setCursor(0), ir(this.right, t.reverse());
		}
		setCursor(t) {
			if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0)) if (t < this.left.length) {
				let r = this.left.splice(t, Number.POSITIVE_INFINITY);
				ir(this.right, r.reverse());
			} else {
				let r = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
				ir(this.left, r.reverse());
			}
		}
	};
	Kn = {
		resolve: Gm,
		tokenize: jm
	};
	Vm = {
		partial: !0,
		tokenize: Wm
	};
	Qn = {
		name: "definition",
		tokenize: $m
	};
	Ym = {
		partial: !0,
		tokenize: Km
	};
	Jn = {
		name: "hardBreakEscape",
		tokenize: Qm
	};
	Xn = {
		name: "headingAtx",
		resolve: Jm,
		tokenize: Xm
	};
	Iu = [
		"address",
		"article",
		"aside",
		"base",
		"basefont",
		"blockquote",
		"body",
		"caption",
		"center",
		"col",
		"colgroup",
		"dd",
		"details",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"frame",
		"frameset",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hr",
		"html",
		"iframe",
		"legend",
		"li",
		"link",
		"main",
		"menu",
		"menuitem",
		"nav",
		"noframes",
		"ol",
		"optgroup",
		"option",
		"p",
		"param",
		"search",
		"section",
		"summary",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"title",
		"tr",
		"track",
		"ul"
	];
	Zn = [
		"pre",
		"script",
		"style",
		"textarea"
	];
	ei = {
		concrete: !0,
		name: "htmlFlow",
		resolveTo: tD,
		tokenize: rD
	};
	Zm = {
		partial: !0,
		tokenize: iD
	};
	eD = {
		partial: !0,
		tokenize: nD
	};
	ti = {
		name: "htmlText",
		tokenize: aD
	};
	gt = {
		name: "labelEnd",
		resolveAll: lD,
		resolveTo: cD,
		tokenize: fD
	};
	uD = { tokenize: pD };
	oD = { tokenize: hD };
	sD = { tokenize: mD };
	ri = {
		name: "labelStartImage",
		resolveAll: gt.resolveAll,
		tokenize: DD
	};
	ni = {
		name: "labelStartLink",
		resolveAll: gt.resolveAll,
		tokenize: dD
	};
	ar = {
		name: "lineEnding",
		tokenize: gD
	};
	xt = {
		name: "thematicBreak",
		tokenize: xD
	};
	pe = {
		continuation: { tokenize: ED },
		exit: CD,
		name: "list",
		tokenize: bD
	};
	kD = {
		partial: !0,
		tokenize: yD
	};
	FD = {
		partial: !0,
		tokenize: wD
	};
	$r = {
		name: "setextUnderline",
		resolveTo: vD,
		tokenize: AD
	};
	qu = { tokenize: TD };
	Bu = { resolveAll: Nu() };
	_u = Ou("string");
	Pu = Ou("text");
	ii = {};
	Or(ii, {
		attentionMarkers: () => ND,
		contentInitial: () => ID,
		disable: () => RD,
		document: () => LD,
		flow: () => BD,
		flowInitial: () => qD,
		insideSpan: () => OD,
		string: () => _D,
		text: () => PD
	});
	LD = {
		42: pe,
		43: pe,
		45: pe,
		48: pe,
		49: pe,
		50: pe,
		51: pe,
		52: pe,
		53: pe,
		54: pe,
		55: pe,
		56: pe,
		57: pe,
		62: Mr
	};
	ID = { 91: Qn };
	qD = {
		[-2]: nr,
		[-1]: nr,
		32: nr
	};
	BD = {
		35: Xn,
		42: xt,
		45: [$r, xt],
		60: ei,
		61: $r,
		95: xt,
		96: Hr,
		126: Hr
	};
	_D = {
		38: Ur,
		92: zr
	};
	PD = {
		[-5]: ar,
		[-4]: ar,
		[-3]: ar,
		33: ri,
		38: Ur,
		42: rr,
		60: [Yn, ti],
		91: ni,
		92: [Jn, zr],
		93: gt,
		95: rr,
		96: $n
	};
	OD = { null: [rr, Bu] };
	ND = { null: [42, 95] };
	RD = { null: [] };
	Mu = /[\0\t\n\r]/g;
	UD = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
	Gu = {}.hasOwnProperty;
	jD = {
		553: (e) => {
			e.exports = function(t) {
				var r, n;
				return t._compiled || (r = t.before ? "(?:" + t.before + ")" : "", n = t.after ? "(?:" + t.after + ")" : "", t.atBreak && (r = "[\\r\\n][\\t ]*" + r), t._compiled = new RegExp((r ? "(" + r + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(t.character) ? "\\" : "") + t.character + (n || ""), "g")), t._compiled;
			};
		},
		112: (e) => {
			function t(r, n, i) {
				var u;
				if (!n) return i;
				for (typeof n == "string" && (n = [n]), u = -1; ++u < n.length;) if (r.indexOf(n[u]) !== -1) return !0;
				return !1;
			}
			e.exports = function(r, n) {
				return t(r, n.inConstruct, !0) && !t(r, n.notInConstruct);
			};
		},
		113: (e, t, r) => {
			e.exports = function(o, s, l) {
				for (var f, c, p, m, D, x, g, k, E = (l.before || "") + (s || "") + (l.after || ""), w = [], T = [], y = {}, d = -1; ++d < o.unsafe.length;) if (m = o.unsafe[d], i(o.stack, m)) for (D = n(m); x = D.exec(E);) f = "before" in m || m.atBreak, c = "after" in m, p = x.index + (f ? x[1].length : 0), w.indexOf(p) === -1 ? (w.push(p), y[p] = {
					before: f,
					after: c
				}) : (y[p].before && !f && (y[p].before = !1), y[p].after && !c && (y[p].after = !1));
				for (w.sort(u), g = l.before ? l.before.length : 0, k = E.length - (l.after ? l.after.length : 0), d = -1; ++d < w.length;) (p = w[d]) < g || p >= k || p + 1 < k && w[d + 1] === p + 1 && y[p].after && !y[p + 1].before && !y[p + 1].after || (g !== p && T.push(a(E.slice(g, p), "\\")), g = p, !/[!-/:-@[-`{-~]/.test(E.charAt(p)) || l.encode && l.encode.indexOf(E.charAt(p)) !== -1 ? (T.push("&#x" + E.charCodeAt(p).toString(16).toUpperCase() + ";"), g++) : T.push("\\"));
				return T.push(a(E.slice(g, k), l.after)), T.join("");
			};
			var n = r(553), i = r(112);
			function u(o, s) {
				return o - s;
			}
			function a(o, s) {
				for (var l, f = /\\(?=[!-/:-@[-`{-~])/g, c = [], p = [], m = -1, D = 0, x = o + s; l = f.exec(x);) c.push(l.index);
				for (; ++m < c.length;) D !== c[m] && p.push(o.slice(D, c[m])), p.push("\\"), D = c[m];
				return p.push(o.slice(D)), p.join("");
			}
		}
	};
	Wu = {};
	Be.n = (e) => {
		var t = e && e.__esModule ? () => e.default : () => e;
		return Be.d(t, { a: t }), t;
	}, Be.d = (e, t) => {
		for (var r in t) Be.o(t, r) && !Be.o(e, r) && Object.defineProperty(e, r, {
			enumerable: !0,
			get: t[r]
		});
	}, Be.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
	fi = {};
	(() => {
		function e(i = {}) {
			let u = i.permalinks || [], a = i.pageResolver || ((p) => [p.replace(/ /g, "_").toLowerCase()]), o = i.newClassName || "new", s = i.wikiLinkClassName || "internal", l = i.hrefTemplate || ((p) => `#/page/${p}`), f;
			function c(p) {
				return p[p.length - 1];
			}
			return {
				enter: { wikiLink: function(p) {
					f = {
						type: "wikiLink",
						value: null,
						data: {
							alias: null,
							permalink: null,
							exists: null
						}
					}, this.enter(f, p);
				} },
				exit: {
					wikiLinkTarget: function(p) {
						let m = this.sliceSerialize(p);
						c(this.stack).value = m;
					},
					wikiLinkAlias: function(p) {
						let m = this.sliceSerialize(p);
						c(this.stack).data.alias = m;
					},
					wikiLink: function(p) {
						this.exit(p);
						let m = f, D = a(m.value), x = D.find(((T) => u.indexOf(T) !== -1)), g = x !== void 0, k;
						k = g ? x : D[0] || "";
						let E = m.value;
						m.data.alias && (E = m.data.alias);
						let w = s;
						g || (w += " " + o), m.data.alias = E, m.data.permalink = k, m.data.exists = g, m.data.hName = "a", m.data.hProperties = {
							className: w,
							href: l(k)
						}, m.data.hChildren = [{
							type: "text",
							value: E
						}];
					}
				}
			};
		}
		Be.d(fi, {
			V: () => e,
			x: () => n
		});
		var t = Be(113), r = Be.n(t);
		function n(i = {}) {
			let u = i.aliasDivider || ":";
			return {
				unsafe: [{
					character: "[",
					inConstruct: [
						"phrasing",
						"label",
						"reference"
					]
				}, {
					character: "]",
					inConstruct: ["label", "reference"]
				}],
				handlers: { wikiLink: function(a, o, s) {
					let l = s.enter("wikiLink"), f = r()(s, a.value, {
						before: "[",
						after: "]"
					}), c = r()(s, a.data.alias, {
						before: "[",
						after: "]"
					}), p;
					return p = c !== f ? `[[${f}${u}${c}]]` : `[[${f}]]`, l(), p;
				} }
			};
		}
	})();
	Yu = fi.V;
	fi.x;
	WD = {
		tokenize: JD,
		partial: !0
	};
	$u = {
		tokenize: XD,
		partial: !0
	};
	Ku = {
		tokenize: ZD,
		partial: !0
	};
	Qu = {
		tokenize: ed,
		partial: !0
	};
	YD = {
		tokenize: td,
		partial: !0
	};
	Ju = {
		name: "wwwAutolink",
		tokenize: KD,
		previous: Zu
	};
	Xu = {
		name: "protocolAutolink",
		tokenize: QD,
		previous: eo
	};
	Ve = {
		name: "emailAutolink",
		tokenize: $D,
		previous: to
	};
	_e = {};
	kt = 48;
	for (; kt < 123;) _e[kt] = Ve, kt++, kt === 58 ? kt = 65 : kt === 91 && (kt = 97);
	_e[43] = Ve;
	_e[45] = Ve;
	_e[46] = Ve;
	_e[95] = Ve;
	_e[72] = [Ve, Xu];
	_e[104] = [Ve, Xu];
	_e[87] = [Ve, Ju];
	_e[119] = [Ve, Ju];
	rd = {
		tokenize: ld,
		partial: !0
	};
	Kr = class {
		constructor() {
			this.map = [];
		}
		add(t, r, n) {
			cd(this, t, r, n);
		}
		consume(t) {
			if (this.map.sort(function(u, a) {
				return u[0] - a[0];
			}), this.map.length === 0) return;
			let r = this.map.length, n = [];
			for (; r > 0;) r -= 1, n.push(t.slice(this.map[r][0] + this.map[r][1]), this.map[r][2]), t.length = this.map[r][0];
			n.push(t.slice()), t.length = 0;
			let i = n.pop();
			for (; i;) {
				for (let u of i) t.push(u);
				i = n.pop();
			}
			this.map.length = 0;
		}
	};
	hd = {
		name: "tasklistCheck",
		tokenize: md
	};
	uo = {
		tokenize: dd,
		concrete: !0,
		name: "mathFlow"
	};
	ao = {
		tokenize: gd,
		partial: !0
	};
	qt = {
		horizontalTab: -2,
		virtualSpace: -1,
		nul: 0,
		eof: null,
		space: 32
	};
	Bt = (e, t) => (r, n, ...i) => r | 1 && n == null ? void 0 : (t.call(n) ?? n[e]).apply(n, i);
	J = Bt("at", function() {
		if (Array.isArray(this) || typeof this == "string") return Fd;
	});
	Ed = String.prototype.replaceAll ?? function(e, t) {
		return e.global ? this.replace(e, t) : this.split(e).join(t);
	};
	X = Bt("replaceAll", function() {
		if (typeof this == "string") return Ed;
	});
	Cd = () => {};
	ur = Cd;
	co = yd;
	Jr = Symbol.for("PRETTIER_IS_FRONT_MATTER");
	or = 3;
	Ge = Ad;
	_t = (function(e) {
		if (e == null) return Id;
		if (typeof e == "function") return Xr(e);
		if (typeof e == "object") return Array.isArray(e) ? Td(e) : Sd(e);
		if (typeof e == "string") return Ld(e);
		throw new Error("Expected function, string, or object as test");
	});
	fo = [];
	po = !0;
	Ei = !1;
	ho = "skip";
	ng.peek = rg;
	og.peek = sg;
	M = {
		carriageReturn: -5,
		lineFeed: -4,
		carriageReturnLineFeed: -3,
		horizontalTab: -2,
		virtualSpace: -1,
		eof: null,
		nul: 0,
		soh: 1,
		stx: 2,
		etx: 3,
		eot: 4,
		enq: 5,
		ack: 6,
		bel: 7,
		bs: 8,
		ht: 9,
		lf: 10,
		vt: 11,
		ff: 12,
		cr: 13,
		so: 14,
		si: 15,
		dle: 16,
		dc1: 17,
		dc2: 18,
		dc3: 19,
		dc4: 20,
		nak: 21,
		syn: 22,
		etb: 23,
		can: 24,
		em: 25,
		sub: 26,
		esc: 27,
		fs: 28,
		gs: 29,
		rs: 30,
		us: 31,
		space: 32,
		exclamationMark: 33,
		quotationMark: 34,
		numberSign: 35,
		dollarSign: 36,
		percentSign: 37,
		ampersand: 38,
		apostrophe: 39,
		leftParenthesis: 40,
		rightParenthesis: 41,
		asterisk: 42,
		plusSign: 43,
		comma: 44,
		dash: 45,
		dot: 46,
		slash: 47,
		digit0: 48,
		digit1: 49,
		digit2: 50,
		digit3: 51,
		digit4: 52,
		digit5: 53,
		digit6: 54,
		digit7: 55,
		digit8: 56,
		digit9: 57,
		colon: 58,
		semicolon: 59,
		lessThan: 60,
		equalsTo: 61,
		greaterThan: 62,
		questionMark: 63,
		atSign: 64,
		uppercaseA: 65,
		uppercaseB: 66,
		uppercaseC: 67,
		uppercaseD: 68,
		uppercaseE: 69,
		uppercaseF: 70,
		uppercaseG: 71,
		uppercaseH: 72,
		uppercaseI: 73,
		uppercaseJ: 74,
		uppercaseK: 75,
		uppercaseL: 76,
		uppercaseM: 77,
		uppercaseN: 78,
		uppercaseO: 79,
		uppercaseP: 80,
		uppercaseQ: 81,
		uppercaseR: 82,
		uppercaseS: 83,
		uppercaseT: 84,
		uppercaseU: 85,
		uppercaseV: 86,
		uppercaseW: 87,
		uppercaseX: 88,
		uppercaseY: 89,
		uppercaseZ: 90,
		leftSquareBracket: 91,
		backslash: 92,
		rightSquareBracket: 93,
		caret: 94,
		underscore: 95,
		graveAccent: 96,
		lowercaseA: 97,
		lowercaseB: 98,
		lowercaseC: 99,
		lowercaseD: 100,
		lowercaseE: 101,
		lowercaseF: 102,
		lowercaseG: 103,
		lowercaseH: 104,
		lowercaseI: 105,
		lowercaseJ: 106,
		lowercaseK: 107,
		lowercaseL: 108,
		lowercaseM: 109,
		lowercaseN: 110,
		lowercaseO: 111,
		lowercaseP: 112,
		lowercaseQ: 113,
		lowercaseR: 114,
		lowercaseS: 115,
		lowercaseT: 116,
		lowercaseU: 117,
		lowercaseV: 118,
		lowercaseW: 119,
		lowercaseX: 120,
		lowercaseY: 121,
		lowercaseZ: 122,
		leftCurlyBrace: 123,
		verticalBar: 124,
		rightCurlyBrace: 125,
		tilde: 126,
		del: 127,
		byteOrderMarker: 65279,
		replacementCharacter: 65533
	};
	Bi = {
		attentionSideAfter: 2,
		attentionSideBefore: 1,
		atxHeadingOpeningFenceSizeMax: 6,
		autolinkDomainSizeMax: 63,
		autolinkSchemeSizeMax: 32,
		cdataOpeningString: "CDATA[",
		characterGroupPunctuation: 2,
		characterGroupWhitespace: 1,
		characterReferenceDecimalSizeMax: 7,
		characterReferenceHexadecimalSizeMax: 6,
		characterReferenceNamedSizeMax: 31,
		codeFencedSequenceSizeMin: 3,
		contentTypeContent: "content",
		contentTypeDocument: "document",
		contentTypeFlow: "flow",
		contentTypeString: "string",
		contentTypeText: "text",
		hardBreakPrefixSizeMin: 2,
		htmlBasic: 6,
		htmlCdata: 5,
		htmlComment: 2,
		htmlComplete: 7,
		htmlDeclaration: 4,
		htmlInstruction: 3,
		htmlRawSizeMax: 8,
		htmlRaw: 1,
		linkResourceDestinationBalanceMax: 32,
		linkReferenceSizeMax: 999,
		listItemValueSizeMax: 10,
		numericBaseDecimal: 10,
		numericBaseHexadecimal: 16,
		tabSize: 4,
		thematicBreakMarkerCountMin: 3,
		v8MaxSafeChunkSize: 1e4
	};
	se = {
		data: "data",
		whitespace: "whitespace",
		lineEnding: "lineEnding",
		lineEndingBlank: "lineEndingBlank",
		linePrefix: "linePrefix",
		lineSuffix: "lineSuffix",
		atxHeading: "atxHeading",
		atxHeadingSequence: "atxHeadingSequence",
		atxHeadingText: "atxHeadingText",
		autolink: "autolink",
		autolinkEmail: "autolinkEmail",
		autolinkMarker: "autolinkMarker",
		autolinkProtocol: "autolinkProtocol",
		characterEscape: "characterEscape",
		characterEscapeValue: "characterEscapeValue",
		characterReference: "characterReference",
		characterReferenceMarker: "characterReferenceMarker",
		characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
		characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
		characterReferenceValue: "characterReferenceValue",
		codeFenced: "codeFenced",
		codeFencedFence: "codeFencedFence",
		codeFencedFenceSequence: "codeFencedFenceSequence",
		codeFencedFenceInfo: "codeFencedFenceInfo",
		codeFencedFenceMeta: "codeFencedFenceMeta",
		codeFlowValue: "codeFlowValue",
		codeIndented: "codeIndented",
		codeText: "codeText",
		codeTextData: "codeTextData",
		codeTextPadding: "codeTextPadding",
		codeTextSequence: "codeTextSequence",
		content: "content",
		definition: "definition",
		definitionDestination: "definitionDestination",
		definitionDestinationLiteral: "definitionDestinationLiteral",
		definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
		definitionDestinationRaw: "definitionDestinationRaw",
		definitionDestinationString: "definitionDestinationString",
		definitionLabel: "definitionLabel",
		definitionLabelMarker: "definitionLabelMarker",
		definitionLabelString: "definitionLabelString",
		definitionMarker: "definitionMarker",
		definitionTitle: "definitionTitle",
		definitionTitleMarker: "definitionTitleMarker",
		definitionTitleString: "definitionTitleString",
		emphasis: "emphasis",
		emphasisSequence: "emphasisSequence",
		emphasisText: "emphasisText",
		escapeMarker: "escapeMarker",
		hardBreakEscape: "hardBreakEscape",
		hardBreakTrailing: "hardBreakTrailing",
		htmlFlow: "htmlFlow",
		htmlFlowData: "htmlFlowData",
		htmlText: "htmlText",
		htmlTextData: "htmlTextData",
		image: "image",
		label: "label",
		labelText: "labelText",
		labelLink: "labelLink",
		labelImage: "labelImage",
		labelMarker: "labelMarker",
		labelImageMarker: "labelImageMarker",
		labelEnd: "labelEnd",
		link: "link",
		paragraph: "paragraph",
		reference: "reference",
		referenceMarker: "referenceMarker",
		referenceString: "referenceString",
		resource: "resource",
		resourceDestination: "resourceDestination",
		resourceDestinationLiteral: "resourceDestinationLiteral",
		resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
		resourceDestinationRaw: "resourceDestinationRaw",
		resourceDestinationString: "resourceDestinationString",
		resourceMarker: "resourceMarker",
		resourceTitle: "resourceTitle",
		resourceTitleMarker: "resourceTitleMarker",
		resourceTitleString: "resourceTitleString",
		setextHeading: "setextHeading",
		setextHeadingText: "setextHeadingText",
		setextHeadingLine: "setextHeadingLine",
		setextHeadingLineSequence: "setextHeadingLineSequence",
		strong: "strong",
		strongSequence: "strongSequence",
		strongText: "strongText",
		thematicBreak: "thematicBreak",
		thematicBreakSequence: "thematicBreakSequence",
		blockQuote: "blockQuote",
		blockQuotePrefix: "blockQuotePrefix",
		blockQuoteMarker: "blockQuoteMarker",
		blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
		listOrdered: "listOrdered",
		listUnordered: "listUnordered",
		listItemIndent: "listItemIndent",
		listItemMarker: "listItemMarker",
		listItemPrefix: "listItemPrefix",
		listItemPrefixWhitespace: "listItemPrefixWhitespace",
		listItemValue: "listItemValue",
		chunkDocument: "chunkDocument",
		chunkContent: "chunkContent",
		chunkFlow: "chunkFlow",
		chunkText: "chunkText",
		chunkString: "chunkString"
	};
	xg = {
		name: "htmlText",
		tokenize: kg,
		add: "before"
	};
	sr = "liquidNode";
	hh = At(wo(), 1);
	mh = At(No(), 1);
	Dh = At(Bf(), 1);
	dh = At(vp(), 1);
	Lb = /^import\s/;
	Ib = /^export\s/;
	Ap = "[a-z][a-z0-9]*(\\.[a-z][a-z0-9]*)*|";
	Tp = /<!---->|<!---?[^>-](?:-?[^-])*-->/;
	qb = /^\{\s*\/\*(.*)\*\/\s*\}/;
	Bb = (e) => Lb.test(e);
	Sp = (e) => Ib.test(e);
	Lp = (e) => Bb(e) || Sp(e);
	Ua = (e, t) => {
		let r = t.indexOf(`

`), n = r === -1 ? t : t.slice(0, r);
		if (Lp(n)) return e(n)({
			type: Sp(n) ? "export" : "import",
			value: n
		});
	};
	Ua.notInBlock = !0;
	Ua.locator = (e) => Lp(e) ? -1 : 1;
	Ip = (e, t) => {
		let r = qb.exec(t);
		if (r) return e(r[0])({
			type: "esComment",
			value: r[1].trim()
		});
	};
	Ip.locator = (e, t) => e.indexOf("{", t);
	qp = function() {
		let { Parser: e } = this, { blockTokenizers: t, blockMethods: r, inlineTokenizers: n, inlineMethods: i } = e.prototype;
		t.esSyntax = Ua, n.esComment = Ip, r.splice(r.indexOf("paragraph"), 0, "esSyntax"), i.splice(i.indexOf("text"), 0, "esComment");
	};
	De = "string";
	de = "array";
	st = "cursor";
	Ae = "indent";
	Te = "align";
	$e = "trim";
	ke = "group";
	Fe = "fill";
	be = "if-break";
	Ke = "indent-if-break";
	Qe = "line-suffix";
	Je = "line-suffix-boundary";
	ge = "line";
	Xe = "label";
	Se = "break-parent";
	Tn = /* @__PURE__ */ new Set([
		st,
		Ae,
		Te,
		$e,
		ke,
		Fe,
		be,
		Ke,
		Qe,
		Je,
		ge,
		Xe,
		Se
	]);
	me = _b;
	Pb = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
	Ha = class extends Error {
		name = "InvalidDocError";
		constructor(t) {
			super(Ob(t)), this.doc = t;
		}
	};
	wt = Ha;
	_p = {};
	Pp = Nb;
	Le = ur;
	Ln = ur;
	Rp = ur;
	Mp = ur;
	Wt = { type: Se };
	In = { type: ge };
	qn = {
		type: ge,
		soft: !0
	};
	Ar = {
		type: ge,
		hard: !0
	};
	Z = [Ar, Wt];
	Cr = [{
		type: ge,
		hard: !0,
		literal: !0
	}, Wt];
	zb = "cr";
	Ub = "crlf";
	Hb = "\r";
	Vb = `\r
`;
	jb = `
`;
	Hp = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
	Vp = 12288;
	Gp = 65510;
	jp = [
		12288,
		12288,
		65281,
		65376,
		65504,
		65510
	];
	Wp = 4352;
	Yp = 262141;
	Va = [
		4352,
		4447,
		8986,
		8987,
		9001,
		9002,
		9193,
		9196,
		9200,
		9200,
		9203,
		9203,
		9725,
		9726,
		9748,
		9749,
		9776,
		9783,
		9800,
		9811,
		9855,
		9855,
		9866,
		9871,
		9875,
		9875,
		9889,
		9889,
		9898,
		9899,
		9917,
		9918,
		9924,
		9925,
		9934,
		9934,
		9940,
		9940,
		9962,
		9962,
		9970,
		9971,
		9973,
		9973,
		9978,
		9978,
		9981,
		9981,
		9989,
		9989,
		9994,
		9995,
		10024,
		10024,
		10060,
		10060,
		10062,
		10062,
		10067,
		10069,
		10071,
		10071,
		10133,
		10135,
		10160,
		10160,
		10175,
		10175,
		11035,
		11036,
		11088,
		11088,
		11093,
		11093,
		11904,
		11929,
		11931,
		12019,
		12032,
		12245,
		12272,
		12287,
		12289,
		12350,
		12353,
		12438,
		12441,
		12543,
		12549,
		12591,
		12593,
		12686,
		12688,
		12773,
		12783,
		12830,
		12832,
		12871,
		12880,
		42124,
		42128,
		42182,
		43360,
		43388,
		44032,
		55203,
		63744,
		64255,
		65040,
		65049,
		65072,
		65106,
		65108,
		65126,
		65128,
		65131,
		94176,
		94180,
		94192,
		94198,
		94208,
		101589,
		101631,
		101662,
		101760,
		101874,
		110576,
		110579,
		110581,
		110587,
		110589,
		110590,
		110592,
		110882,
		110898,
		110898,
		110928,
		110930,
		110933,
		110933,
		110948,
		110951,
		110960,
		111355,
		119552,
		119638,
		119648,
		119670,
		126980,
		126980,
		127183,
		127183,
		127374,
		127374,
		127377,
		127386,
		127488,
		127490,
		127504,
		127547,
		127552,
		127560,
		127568,
		127569,
		127584,
		127589,
		127744,
		127776,
		127789,
		127797,
		127799,
		127868,
		127870,
		127891,
		127904,
		127946,
		127951,
		127955,
		127968,
		127984,
		127988,
		127988,
		127992,
		128062,
		128064,
		128064,
		128066,
		128252,
		128255,
		128317,
		128331,
		128334,
		128336,
		128359,
		128378,
		128378,
		128405,
		128406,
		128420,
		128420,
		128507,
		128591,
		128640,
		128709,
		128716,
		128716,
		128720,
		128722,
		128725,
		128728,
		128732,
		128735,
		128747,
		128748,
		128756,
		128764,
		128992,
		129003,
		129008,
		129008,
		129292,
		129338,
		129340,
		129349,
		129351,
		129535,
		129648,
		129660,
		129664,
		129674,
		129678,
		129734,
		129736,
		129736,
		129741,
		129756,
		129759,
		129770,
		129775,
		129784,
		131072,
		196605,
		196608,
		262141
	];
	Ga = (e, t) => {
		let r = 0, n = Math.floor(e.length / 2) - 1;
		for (; r <= n;) {
			let i = Math.floor((r + n) / 2), u = i * 2;
			if (t < e[u]) n = i - 1;
			else if (t > e[u + 1]) r = i + 1;
			else return !0;
		}
		return !1;
	};
	$p = 19968, [Wb, Yb] = $b(Va);
	ja = (e) => e < Vp || e > Gp ? !1 : Ga(jp, e);
	Wa = (e) => e >= Wb && e <= Yb ? !0 : e < Wp || e > Yp ? !1 : Ga(Va, e);
	Kb = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/;
	Kp = (e) => Kb.test(e);
	Qb = /[^\x20-\x7F]/;
	Tr = Jb;
	Xb = { type: 0 };
	Zb = { type: 1 };
	Ya = {
		value: "",
		length: 0,
		queue: [],
		get root() {
			return Ya;
		}
	};
	$a = class {
		#e = [];
		#t = "";
		#n = 0;
		#i = [];
		#r = [];
		#a() {
			let t = this.#t;
			t !== "" && (this.#e.push(t), this.#n += t.length, this.#t = "");
			for (let r of this.#r) this.#i.push(Math.min(r, this.#n));
			this.#r.length = 0;
		}
		markPosition() {
			if (this.#i.length + this.#r.length >= 2) throw new Error("There are too many 'cursor' in doc.");
			this.#r.push(this.#n + this.#t.length);
		}
		write(t) {
			this.#t += t;
		}
		trim() {
			let { text: t, count: r } = Bn(this.#t);
			return this.#t = t, this.#a(), r;
		}
		finish() {
			return this.#a(), {
				text: this.#e.join(""),
				positions: this.#i
			};
		}
	};
	Zp = $a;
	Ce = Symbol("MODE_BREAK");
	Re = Symbol("MODE_FLAT");
	Ka = Symbol("DOC_FILL_PRINTED_LENGTH");
	tE = Array.prototype.toReversed ?? function() {
		return [...this].reverse();
	};
	th = Bt("toReversed", function() {
		if (Array.isArray(this)) return tE;
	});
	iE = nE();
	nh = (e) => String(e).split(/[/\\]/).pop();
	ih = (e) => String(e).startsWith("file:");
	sE = void 0;
	Ja = lE;
	Xa = cE;
	fE = function() {
		let e = this.Parser.prototype;
		e.blockMethods = ["frontMatter", ...e.blockMethods], e.blockTokenizers.frontMatter = t;
		function t(r, n) {
			let { frontMatter: i } = Ge(n);
			if (i) return r(i.raw)({
				...i,
				type: "frontMatter"
			});
		}
		t.onlyAtStart = !0;
	};
	oh = fE;
	sh = /(?:[\u{2c7}\u{2c9}-\u{2cb}\u{2d9}\u{2ea}-\u{2eb}\u{305}\u{323}\u{1100}-\u{11ff}\u{2e80}-\u{2e99}\u{2e9b}-\u{2ef3}\u{2f00}-\u{2fd5}\u{2ff0}-\u{303f}\u{3041}-\u{3096}\u{3099}-\u{30ff}\u{3105}-\u{312f}\u{3131}-\u{318e}\u{3190}-\u{4dbf}\u{4e00}-\u{9fff}\u{a700}-\u{a707}\u{a960}-\u{a97c}\u{ac00}-\u{d7a3}\u{d7b0}-\u{d7c6}\u{d7cb}-\u{d7fb}\u{f900}-\u{fa6d}\u{fa70}-\u{fad9}\u{fe10}-\u{fe1f}\u{fe30}-\u{fe6f}\u{ff00}-\u{ffef}\u{16fe3}\u{16ff2}-\u{16ff6}\u{1aff0}-\u{1aff3}\u{1aff5}-\u{1affb}\u{1affd}-\u{1affe}\u{1b000}-\u{1b122}\u{1b132}\u{1b150}-\u{1b152}\u{1b155}\u{1b164}-\u{1b167}\u{1f200}\u{1f250}-\u{1f251}\u{20000}-\u{2a6df}\u{2a700}-\u{2b81d}\u{2b820}-\u{2cead}\u{2ceb0}-\u{2ebe0}\u{2ebf0}-\u{2ee5d}\u{2f800}-\u{2fa1d}\u{30000}-\u{3134a}\u{31350}-\u{33479}])(?:[\u{fe00}-\u{fe0f}\u{e0100}-\u{e01ef}])?/u;
	et = /(?:[\u{21}-\u{2f}\u{3a}-\u{40}\u{5b}-\u{60}\u{7b}-\u{7e}\u{3000}\u{ff5e}]|\p{General_Category=Connector_Punctuation}|\p{General_Category=Dash_Punctuation}|\p{General_Category=Close_Punctuation}|\p{General_Category=Final_Punctuation}|\p{General_Category=Initial_Punctuation}|\p{General_Category=Other_Punctuation}|\p{General_Category=Open_Punctuation})/u;
	Za = /* @__PURE__ */ new Set([
		"liquidNode",
		"inlineCode",
		"emphasis",
		"esComment",
		"strong",
		"delete",
		"wikiLink",
		"link",
		"linkReference",
		"image",
		"imageReference",
		"footnote",
		"footnoteReference",
		"sentence",
		"whitespace",
		"word",
		"break",
		"inlineMath"
	]);
	Pn = /* @__PURE__ */ new Set([
		...Za,
		"tableCell",
		"paragraph",
		"heading"
	]);
	Kt = "non-cjk";
	Me = "cj-letter";
	Ct = "k-letter";
	Sr = "cjk-punctuation";
	pE = /\p{Script_Extensions=Hangul}/u;
	Jt = (e) => e?.type === "whitespace" && e.value === `
`;
	ch = hE;
	mE = function() {
		let e = this.Parser.prototype, t = e.inlineMethods;
		t.splice(t.indexOf("text"), 0, "liquid"), e.inlineTokenizers.liquid = r;
		function r(n, i) {
			let u = i.match(/^(\{%.*?%\}|\{\{.*?\}\})/s);
			if (u) return n(u[0])({
				type: "liquidNode",
				value: u[0]
			});
		}
		r.locator = function(n, i) {
			return n.indexOf("{", i);
		};
	};
	fh = mE;
	DE = function() {
		let e = "wikiLink", t = /^\[\[(?<linkContents>.+?)\]\]/s, r = this.Parser.prototype, n = r.inlineMethods;
		n.splice(n.indexOf("link"), 0, e), r.inlineTokenizers.wikiLink = i;
		function i(u, a) {
			let o = t.exec(a);
			if (o) {
				let s = o.groups.linkContents.trim();
				return u(o[0])({
					type: e,
					value: s
				});
			}
		}
		i.locator = function(u, a) {
			return u.indexOf("[", a);
		};
	};
	ph = DE;
	gh = "format";
	xh = /<!--\s*@(?:noformat|noprettier)\s*-->|\{\s*\/\*\s*@(?:noformat|noprettier)\s*\*\/\s*\}|<!--.*\r?\n[\s\S]*(^|\n)[^\S\n]*@(?:noformat|noprettier)[^\S\n]*($|\n)[\s\S]*\n.*-->/m;
	kh = /<!--\s*@(?:format|prettier)\s*-->|\{\s*\/\*\s*@(?:format|prettier)\s*\*\/\s*\}|<!--.*\r?\n[\s\S]*(^|\n)[^\S\n]*@(?:format|prettier)[^\S\n]*($|\n)[\s\S]*\n.*-->/m;
	Rn = (e) => Ge(e).content.trimStart().match(kh)?.index === 0;
	Fh = (e) => Ge(e).content.trimStart().match(xh)?.index === 0;
	bh = (e) => {
		let { frontMatter: t } = Ge(e), r = `<!-- @${gh} -->`;
		return t ? `${t.raw}

${r}

${e.slice(t.end.index)}` : `${r}

${e}`;
	};
	dE = Eh(_i);
	gE = Eh(tu);
	pu = {};
	Or(pu, { mdast: () => cw });
	Mn = xE;
	wh = kE;
	nu = At(mn(), 1);
	bE = /* @__PURE__ */ new Set(["position", "raw"]);
	iu.ignoredProperties = bE;
	Kh = At(mn(), 1);
	Ch = EE;
	yh = Object.freeze({
		character: "'",
		codePoint: 39
	});
	vh = Object.freeze({
		character: "\"",
		codePoint: 34
	});
	wE = Object.freeze({
		preferred: yh,
		alternate: vh
	});
	CE = Object.freeze({
		preferred: vh,
		alternate: yh
	});
	uu = class extends Error {
		name = "UnexpectedNodeError";
		constructor(t, r, n = "type") {
			super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`), this.node = t;
		}
	};
	Th = uu;
	vE = /* @__PURE__ */ new Set(["listItem", "definition"]);
	BE = /* @__PURE__ */ new Set([
		"tableCell",
		"link",
		"wikiLink"
	]);
	Uh = /* @__PURE__ */ new Set("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~");
	NE = /^(?:=+|-+)$/;
	VE = (e, t) => {
		for (let r of t) e = X(0, e, r, encodeURIComponent(r));
		return e;
	};
	cu = class {
		#e;
		constructor(t) {
			this.#e = new Set(t);
		}
		getLeadingWhitespaceCount(t) {
			let r = this.#e, n = 0;
			for (let i = 0; i < t.length && r.has(t.charAt(i)); i++) n++;
			return n;
		}
		getTrailingWhitespaceCount(t) {
			let r = this.#e, n = 0;
			for (let i = t.length - 1; i >= 0 && r.has(t.charAt(i)); i--) n++;
			return n;
		}
		getLeadingWhitespace(t) {
			let r = this.getLeadingWhitespaceCount(t);
			return t.slice(0, r);
		}
		getTrailingWhitespace(t) {
			let r = this.getTrailingWhitespaceCount(t);
			return t.slice(t.length - r);
		}
		hasLeadingWhitespace(t) {
			return this.#e.has(t.charAt(0));
		}
		hasTrailingWhitespace(t) {
			return this.#e.has(J(0, t, -1));
		}
		trimStart(t) {
			let r = this.getLeadingWhitespaceCount(t);
			return t.slice(r);
		}
		trimEnd(t) {
			let r = this.getTrailingWhitespaceCount(t);
			return t.slice(0, t.length - r);
		}
		trim(t) {
			return this.trimEnd(this.trimStart(t));
		}
		split(t, r = !1) {
			let n = `[${ve([...this.#e].join(""))}]+`, i = new RegExp(r ? `(${n})` : n);
			return t.split(i);
		}
		hasWhitespaceCharacter(t) {
			let r = this.#e;
			return Array.prototype.some.call(t, (n) => r.has(n));
		}
		hasNonWhitespaceCharacter(t) {
			let r = this.#e;
			return Array.prototype.some.call(t, (n) => !r.has(n));
		}
		isWhitespaceOnly(t) {
			let r = this.#e;
			return Array.prototype.every.call(t, (n) => r.has(n));
		}
		#t(t) {
			let r = Number.POSITIVE_INFINITY;
			for (let n of t.split(`
`)) {
				if (n.length === 0) continue;
				let i = this.getLeadingWhitespaceCount(n);
				if (i === 0) return 0;
				n.length !== i && i < r && (r = i);
			}
			return r === Number.POSITIVE_INFINITY ? 0 : r;
		}
		dedentString(t) {
			let r = this.#t(t);
			return r === 0 ? t : t.split(`
`).map((n) => n.slice(r)).join(`
`);
		}
	};
	Br = new cu([
		"	",
		`
`,
		"\f",
		"\r",
		" "
	]);
	WE = /^\\?.$/su;
	YE = /^\n *>[ >]*$/;
	Xh = $E;
	_r = null;
	ow = 10;
	for (let e = 0; e <= ow; e++) Pr();
	Zh = sw;
	le = [["children"]];
	cw = {
		features: { experimental_frontMatterSupport: {
			massageAstNode: !0,
			embed: !0,
			print: !0
		} },
		preprocess: Xh,
		print: lu,
		embed: wh,
		massageAstNode: iu,
		hasPrettierIgnore: lh,
		insertPragma: bh,
		getVisitorKeys: Zh({
			root: le[0],
			paragraph: le[0],
			sentence: le[0],
			word: [],
			whitespace: [],
			emphasis: le[0],
			strong: le[0],
			delete: le[0],
			inlineCode: [],
			wikiLink: [],
			link: le[0],
			image: [],
			blockquote: le[0],
			heading: le[0],
			code: [],
			html: [],
			list: le[0],
			thematicBreak: [],
			linkReference: le[0],
			imageReference: [],
			definition: [],
			footnote: le[0],
			footnoteReference: [],
			footnoteDefinition: le[0],
			table: le[0],
			tableCell: le[0],
			break: [],
			liquidNode: [],
			import: [],
			export: [],
			esComment: [],
			jsx: [],
			math: [],
			inlineMath: [],
			tableRow: le[0],
			listItem: le[0],
			text: []
		}),
		printPrettierIgnored: au
	};
}))();
export { rm as default, xu as languages, ku as options, ru as parsers, pu as printers };
