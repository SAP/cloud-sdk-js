import { __esmMin } from "./rolldown-runtime-aR1ZRE-I.js";
//#region ../../node_modules/.pnpm/prettier@3.9.5/node_modules/prettier/plugins/markdown.mjs
function mm({ slug: e, permalink: t, alias: r }) {
	return {
		hName: "a",
		hProperties: { href: t ?? e },
		hChildren: [{
			type: "text",
			value: r ?? e
		}]
	};
}
function Gn(e = {}) {
	let t = e.linkTemplate || mm, r;
	function n(s) {
		r = {
			type: "wikiLink",
			value: null,
			data: {}
		}, this.enter(r, s);
	}
	function a(s) {
		return s[s.length - 1];
	}
	function u(s) {
		let l = this.sliceSerialize(s), c = a(this.stack);
		c.data.alias = l;
	}
	function i(s) {
		let l = this.sliceSerialize(s), c = a(this.stack);
		c.value = l;
	}
	function o(s) {
		this.exit(s);
		let l = r, c = {
			slug: l.value,
			alias: l.data.alias,
			permalink: e.linkResolver ? e.linkResolver(l.value) : void 0
		};
		l.data = {
			alias: c.alias,
			permalink: c.permalink,
			...t(c)
		};
	}
	return {
		enter: { wikiLink: n },
		exit: {
			wikiLinkTarget: i,
			wikiLinkAlias: u,
			wikiLink: o
		}
	};
}
function Fu(e) {
	return e !== tt.eof && (e < tt.nul || e === tt.space);
}
function Wn(e) {
	return e !== tt.eof && (e === null || e < tt.horizontalTab);
}
function Yn(e = {}) {
	let r = e.aliasDivider || "|", n = "[[", a = "]]";
	return { text: { 91: { tokenize: (i, o, s) => {
		let l, c, f = 0, h = 0, m = 0;
		return D;
		function D(w) {
			return w !== n.charCodeAt(h) ? s(w) : (i.enter("wikiLink"), i.enter("wikiLinkMarker"), x(w));
		}
		function x(w) {
			return h === 2 ? (i.exit("wikiLinkMarker"), g(w)) : w !== n.charCodeAt(h) ? s(w) : (i.consume(w), h++, x);
		}
		function g(w) {
			return Wn(w) || w === tt.eof ? s(w) : (i.enter("wikiLinkData"), i.enter("wikiLinkTarget"), k(w));
		}
		function k(w) {
			return w === r.charCodeAt(f) ? l ? (i.exit("wikiLinkTarget"), i.enter("wikiLinkAliasMarker"), E(w)) : s(w) : w === a.charCodeAt(m) ? l ? (i.exit("wikiLinkTarget"), i.exit("wikiLinkData"), i.enter("wikiLinkMarker"), S(w)) : s(w) : Wn(w) || w === tt.eof ? s(w) : (Fu(w) || (l = !0), i.consume(w), k);
		}
		function E(w) {
			return f === r.length ? (i.exit("wikiLinkAliasMarker"), i.enter("wikiLinkAlias"), C(w)) : w !== r.charCodeAt(f) ? s(w) : (i.consume(w), f++, E);
		}
		function C(w) {
			return w === a.charCodeAt(m) ? c ? (i.exit("wikiLinkAlias"), i.exit("wikiLinkData"), i.enter("wikiLinkMarker"), S(w)) : s(w) : Wn(w) || w === tt.eof ? s(w) : (Fu(w) || (c = !0), i.consume(w), C);
		}
		function S(w) {
			return m === 2 ? (i.exit("wikiLinkMarker"), i.exit("wikiLink"), o(w)) : w !== a.charCodeAt(m) ? s(w) : (i.consume(w), m++, S);
		}
	} } } };
}
function jn(e, t) {
	let r = t || Dm;
	return Eu(e, typeof r.includeImageAlt == "boolean" ? r.includeImageAlt : !0, typeof r.includeHtml == "boolean" ? r.includeHtml : !0);
}
function Eu(e, t, r) {
	if (dm(e)) {
		if ("value" in e) return e.type === "html" && !r ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return bu(e.children, t, r);
	}
	return Array.isArray(e) ? bu(e, t, r) : "";
}
function bu(e, t, r) {
	let n = [], a = -1;
	for (; ++a < e.length;) n[a] = Eu(e[a], t, r);
	return n.join("");
}
function dm(e) {
	return !!(e && typeof e == "object");
}
function Tt(e) {
	return gm.call($n, e) ? $n[e] : !1;
}
function re(e, t, r, n) {
	let a = e.length, u = 0, i;
	if (t < 0 ? t = -t > a ? 0 : a + t : t = t > a ? a : t, r = r > 0 ? r : 0, n.length < 1e4) i = Array.from(n), i.unshift(t, r), e.splice(...i);
	else for (r && e.splice(t, r); u < n.length;) i = n.slice(u, u + 1e4), i.unshift(t, 0), e.splice(...i), u += 1e4, t += 1e4;
}
function he(e, t) {
	return e.length > 0 ? (re(e, e.length, 0, t), e) : t;
}
function Or(e) {
	let t = {}, r = -1;
	for (; ++r < e.length;) xm(t, e[r]);
	return t;
}
function xm(e, t) {
	let r;
	for (r in t) {
		let a = (wu.call(e, r) ? e[r] : void 0) || (e[r] = {}), u = t[r], i;
		if (u) for (i in u) {
			wu.call(a, i) || (a[i] = []);
			let o = u[i];
			km(a[i], Array.isArray(o) ? o : o ? [o] : []);
		}
	}
}
function km(e, t) {
	let r = -1, n = [];
	for (; ++r < t.length;) (t[r].add === "after" ? e : n).push(t[r]);
	re(e, 0, 0, n);
}
function Nr(e, t) {
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
	let a = n ? n - 1 : Number.POSITIVE_INFINITY, u = 0;
	return i;
	function i(s) {
		return H(s) ? (e.enter(r), o(s)) : t(s);
	}
	function o(s) {
		return H(s) && u++ < a ? (e.consume(s), o) : (e.exit(r), t(s));
	}
}
function Fm(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, n, a), r;
	return t;
	function n(o) {
		if (o === null) {
			e.consume(o);
			return;
		}
		return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), U(e, t, "linePrefix");
	}
	function a(o) {
		return e.enter("paragraph"), u(o);
	}
	function u(o) {
		let s = e.enter("chunkText", {
			contentType: "text",
			previous: r
		});
		return r && (r.next = s), r = s, i(o);
	}
	function i(o) {
		if (o === null) {
			e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
			return;
		}
		return B(o) ? (e.consume(o), e.exit("chunkText"), u) : (e.consume(o), i);
	}
}
function bm(e) {
	let t = this, r = [], n = 0, a, u, i;
	return o;
	function o(C) {
		if (n < r.length) {
			let S = r[n];
			return t.containerState = S[1], e.attempt(S[0].continuation, s, l)(C);
		}
		return l(C);
	}
	function s(C) {
		if (n++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, a && E();
			let S = t.events.length, w = S, d;
			for (; w--;) if (t.events[w][0] === "exit" && t.events[w][1].type === "chunkFlow") {
				d = t.events[w][1].end;
				break;
			}
			k(n);
			let v = S;
			for (; v < t.events.length;) t.events[v][1].end = { ...d }, v++;
			return re(t.events, w + 1, 0, t.events.slice(S)), t.events.length = v, l(C);
		}
		return o(C);
	}
	function l(C) {
		if (n === r.length) {
			if (!a) return h(C);
			if (a.currentConstruct && a.currentConstruct.concrete) return D(C);
			t.interrupt = !!(a.currentConstruct && !a._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(Tu, c, f)(C);
	}
	function c(C) {
		return a && E(), k(n), h(C);
	}
	function f(C) {
		return t.parser.lazy[t.now().line] = n !== r.length, i = t.now().offset, D(C);
	}
	function h(C) {
		return t.containerState = {}, e.attempt(Tu, m, D)(C);
	}
	function m(C) {
		return n++, r.push([t.currentConstruct, t.containerState]), h(C);
	}
	function D(C) {
		if (C === null) {
			a && E(), k(0), e.consume(C);
			return;
		}
		return a = a || t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: a,
			contentType: "flow",
			previous: u
		}), x(C);
	}
	function x(C) {
		if (C === null) {
			g(e.exit("chunkFlow"), !0), k(0), e.consume(C);
			return;
		}
		return B(C) ? (e.consume(C), g(e.exit("chunkFlow")), n = 0, t.interrupt = void 0, o) : (e.consume(C), x);
	}
	function g(C, S) {
		let w = t.sliceStream(C);
		if (S && w.push(null), C.previous = u, u && (u.next = C), u = C, a.defineSkip(C.start), a.write(w), t.parser.lazy[C.start.line]) {
			let d = a.events.length;
			for (; d--;) if (a.events[d][1].start.offset < i && (!a.events[d][1].end || a.events[d][1].end.offset > i)) return;
			let v = t.events.length, L = v, y, b;
			for (; L--;) if (t.events[L][0] === "exit" && t.events[L][1].type === "chunkFlow") {
				if (y) {
					b = t.events[L][1].end;
					break;
				}
				y = !0;
			}
			for (k(n), d = v; d < t.events.length;) t.events[d][1].end = { ...b }, d++;
			re(t.events, L + 1, 0, t.events.slice(v)), t.events.length = d;
		}
	}
	function k(C) {
		let S = r.length;
		for (; S-- > C;) {
			let w = r[S];
			t.containerState = w[1], w[0].exit.call(t, e);
		}
		r.length = C;
	}
	function E() {
		a.write([null]), u = void 0, a = void 0, t.containerState._closeFlow = void 0;
	}
}
function Em(e, t, r) {
	return U(e, e.attempt(this.parser.constructs.document, t, r), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function St(e) {
	if (e === null || G(e) || Ie(e)) return 1;
	if (Dt(e)) return 2;
}
function nt(e, t, r) {
	let n = [], a = -1;
	for (; ++a < e.length;) {
		let u = e[a].resolveAll;
		u && !n.includes(u) && (t = u(t, r), n.push(u));
	}
	return t;
}
function wm(e, t) {
	let r = -1, n, a, u, i, o, s, l, c;
	for (; ++r < e.length;) if (e[r][0] === "enter" && e[r][1].type === "attentionSequence" && e[r][1]._close) {
		for (n = r; n--;) if (e[n][0] === "exit" && e[n][1].type === "attentionSequence" && e[n][1]._open && t.sliceSerialize(e[n][1]).charCodeAt(0) === t.sliceSerialize(e[r][1]).charCodeAt(0)) {
			if ((e[n][1]._close || e[r][1]._open) && (e[r][1].end.offset - e[r][1].start.offset) % 3 && !((e[n][1].end.offset - e[n][1].start.offset + e[r][1].end.offset - e[r][1].start.offset) % 3)) continue;
			s = e[n][1].end.offset - e[n][1].start.offset > 1 && e[r][1].end.offset - e[r][1].start.offset > 1 ? 2 : 1;
			let f = { ...e[n][1].end }, h = { ...e[r][1].start };
			Lu(f, -s), Lu(h, s), i = {
				type: s > 1 ? "strongSequence" : "emphasisSequence",
				start: f,
				end: { ...e[n][1].end }
			}, o = {
				type: s > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[r][1].start },
				end: h
			}, u = {
				type: s > 1 ? "strongText" : "emphasisText",
				start: { ...e[n][1].end },
				end: { ...e[r][1].start }
			}, a = {
				type: s > 1 ? "strong" : "emphasis",
				start: { ...i.start },
				end: { ...o.end }
			}, e[n][1].end = { ...i.start }, e[r][1].start = { ...o.end }, l = [], e[n][1].end.offset - e[n][1].start.offset && (l = he(l, [[
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
					a,
					t
				],
				[
					"enter",
					i,
					t
				],
				[
					"exit",
					i,
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
					a,
					t
				]
			]), e[r][1].end.offset - e[r][1].start.offset ? (c = 2, l = he(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])) : c = 0, re(e, n - 1, r - n + 3, l), r = n + l.length - c - 2;
			break;
		}
	}
	for (r = -1; ++r < e.length;) e[r][1].type === "attentionSequence" && (e[r][1].type = "data");
	return e;
}
function Cm(e, t) {
	let r = this.parser.constructs.attentionMarkers.null, n = this.previous, a = St(n), u;
	return i;
	function i(s) {
		return u = s, e.enter("attentionSequence"), o(s);
	}
	function o(s) {
		if (s === u) return e.consume(s), o;
		let l = e.exit("attentionSequence"), c = St(s), f = !c || c === 2 && a || r.includes(s), h = !a || a === 2 && c || r.includes(n);
		return l._open = !!(u === 42 ? f : f && (a || !h)), l._close = !!(u === 42 ? h : h && (c || !f)), t(s);
	}
}
function Lu(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
function ym(e, t, r) {
	let n = 0;
	return a;
	function a(m) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(m), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), u;
	}
	function u(m) {
		return K(m) ? (e.consume(m), i) : m === 64 ? r(m) : l(m);
	}
	function i(m) {
		return m === 43 || m === 45 || m === 46 || Q(m) ? (n = 1, o(m)) : l(m);
	}
	function o(m) {
		return m === 58 ? (e.consume(m), n = 0, s) : (m === 43 || m === 45 || m === 46 || Q(m)) && n++ < 32 ? (e.consume(m), o) : (n = 0, l(m));
	}
	function s(m) {
		return m === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(m), e.exit("autolinkMarker"), e.exit("autolink"), t) : m === null || m === 32 || m === 60 || mt(m) ? r(m) : (e.consume(m), s);
	}
	function l(m) {
		return m === 64 ? (e.consume(m), c) : Cu(m) ? (e.consume(m), l) : r(m);
	}
	function c(m) {
		return Q(m) ? f(m) : r(m);
	}
	function f(m) {
		return m === 46 ? (e.consume(m), n = 0, c) : m === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(m), e.exit("autolinkMarker"), e.exit("autolink"), t) : h(m);
	}
	function h(m) {
		if ((m === 45 || Q(m)) && n++ < 63) {
			let D = m === 45 ? h : f;
			return e.consume(m), D;
		}
		return r(m);
	}
}
function vm(e, t, r) {
	return n;
	function n(u) {
		return H(u) ? U(e, a, "linePrefix")(u) : a(u);
	}
	function a(u) {
		return u === null || B(u) ? t(u) : r(u);
	}
}
function Am(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		if (i === 62) {
			let o = n.containerState;
			return o.open || (e.enter("blockQuote", { _container: !0 }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(i), e.exit("blockQuoteMarker"), u;
		}
		return r(i);
	}
	function u(i) {
		return H(i) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(i), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(i));
	}
}
function Tm(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return H(i) ? U(e, u, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : u(i);
	}
	function u(i) {
		return e.attempt(Rr, t, r)(i);
	}
}
function Sm(e) {
	e.exit("blockQuote");
}
function Lm(e, t, r) {
	return n;
	function n(u) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(u), e.exit("escapeMarker"), a;
	}
	function a(u) {
		return vu(u) ? (e.enter("characterEscapeValue"), e.consume(u), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : r(u);
	}
}
function Im(e, t, r) {
	let n = this, a = 0, u, i;
	return o;
	function o(f) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), s;
	}
	function s(f) {
		return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), u = 31, i = Q, c(f));
	}
	function l(f) {
		return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), u = 6, i = yu, c) : (e.enter("characterReferenceValue"), u = 7, i = er, c(f));
	}
	function c(f) {
		if (f === 59 && a) {
			let h = e.exit("characterReferenceValue");
			return i === Q && !Tt(n.sliceSerialize(h)) ? r(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return i(f) && a++ < u ? (e.consume(f), c) : r(f);
	}
}
function qm(e, t, r) {
	let n = this, a = {
		partial: !0,
		tokenize: w
	}, u = 0, i = 0, o;
	return s;
	function s(d) {
		return l(d);
	}
	function l(d) {
		let v = n.events[n.events.length - 1];
		return u = v && v[1].type === "linePrefix" ? v[2].sliceSerialize(v[1], !0).length : 0, o = d, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(d);
	}
	function c(d) {
		return d === o ? (i++, e.consume(d), c) : i < 3 ? r(d) : (e.exit("codeFencedFenceSequence"), H(d) ? U(e, f, "whitespace")(d) : f(d));
	}
	function f(d) {
		return d === null || B(d) ? (e.exit("codeFencedFence"), n.interrupt ? t(d) : e.check(Iu, x, S)(d)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), h(d));
	}
	function h(d) {
		return d === null || B(d) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(d)) : H(d) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), U(e, m, "whitespace")(d)) : d === 96 && d === o ? r(d) : (e.consume(d), h);
	}
	function m(d) {
		return d === null || B(d) ? f(d) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), D(d));
	}
	function D(d) {
		return d === null || B(d) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(d)) : d === 96 && d === o ? r(d) : (e.consume(d), D);
	}
	function x(d) {
		return e.attempt(a, S, g)(d);
	}
	function g(d) {
		return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), k;
	}
	function k(d) {
		return u > 0 && H(d) ? U(e, E, "linePrefix", u + 1)(d) : E(d);
	}
	function E(d) {
		return d === null || B(d) ? e.check(Iu, x, S)(d) : (e.enter("codeFlowValue"), C(d));
	}
	function C(d) {
		return d === null || B(d) ? (e.exit("codeFlowValue"), E(d)) : (e.consume(d), C);
	}
	function S(d) {
		return e.exit("codeFenced"), t(d);
	}
	function w(d, v, L) {
		let y = 0;
		return b;
		function b(O) {
			return d.enter("lineEnding"), d.consume(O), d.exit("lineEnding"), _;
		}
		function _(O) {
			return d.enter("codeFencedFence"), H(O) ? U(d, I, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(O) : I(O);
		}
		function I(O) {
			return O === o ? (d.enter("codeFencedFenceSequence"), T(O)) : L(O);
		}
		function T(O) {
			return O === o ? (y++, d.consume(O), T) : y >= i ? (d.exit("codeFencedFenceSequence"), H(O) ? U(d, R, "whitespace")(O) : R(O)) : L(O);
		}
		function R(O) {
			return O === null || B(O) ? (d.exit("codeFencedFence"), v(O)) : L(O);
		}
	}
}
function Bm(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return i === null ? r(i) : (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), u);
	}
	function u(i) {
		return n.parser.lazy[n.now().line] ? r(i) : t(i);
	}
}
function Pm(e, t, r) {
	let n = this;
	return a;
	function a(l) {
		return e.enter("codeIndented"), U(e, u, "linePrefix", 5)(l);
	}
	function u(l) {
		let c = n.events[n.events.length - 1];
		return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? i(l) : r(l);
	}
	function i(l) {
		return l === null ? s(l) : B(l) ? e.attempt(_m, i, s)(l) : (e.enter("codeFlowValue"), o(l));
	}
	function o(l) {
		return l === null || B(l) ? (e.exit("codeFlowValue"), i(l)) : (e.consume(l), o);
	}
	function s(l) {
		return e.exit("codeIndented"), t(l);
	}
}
function Om(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return n.parser.lazy[n.now().line] ? r(i) : B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), a) : U(e, u, "linePrefix", 5)(i);
	}
	function u(i) {
		let o = n.events[n.events.length - 1];
		return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(i) : B(i) ? a(i) : r(i);
	}
}
function Nm(e) {
	let t = e.length - 4, r = 3, n, a;
	if ((e[r][1].type === "lineEnding" || e[r][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (n = r; ++n < t;) if (e[n][1].type === "codeTextData") {
			e[r][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", r += 2, t -= 2;
			break;
		}
	}
	for (n = r - 1, t++; ++n <= t;) a === void 0 ? n !== t && e[n][1].type !== "lineEnding" && (a = n) : (n === t || e[n][1].type === "lineEnding") && (e[a][1].type = "codeTextData", n !== a + 2 && (e[a][1].end = e[n - 1][1].end, e.splice(a + 2, n - a - 2), t -= n - a - 2, n = a + 2), a = void 0);
	return e;
}
function Rm(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Mm(e, t, r) {
	let a = 0, u, i;
	return o;
	function o(h) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(h);
	}
	function s(h) {
		return h === 96 ? (e.consume(h), a++, s) : (e.exit("codeTextSequence"), l(h));
	}
	function l(h) {
		return h === null ? r(h) : h === 32 ? (e.enter("space"), e.consume(h), e.exit("space"), l) : h === 96 ? (i = e.enter("codeTextSequence"), u = 0, f(h)) : B(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), l) : (e.enter("codeTextData"), c(h));
	}
	function c(h) {
		return h === null || h === 32 || h === 96 || B(h) ? (e.exit("codeTextData"), l(h)) : (e.consume(h), c);
	}
	function f(h) {
		return h === 96 ? (e.consume(h), u++, f) : u === a ? (e.exit("codeTextSequence"), e.exit("codeText"), t(h)) : (i.type = "codeTextData", c(h));
	}
}
function nr(e, t) {
	let r = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; r < t.length;) e.push(...t.slice(r, r + 1e4)), r += 1e4;
}
function Vr(e) {
	let t = {}, r = -1, n, a, u, i, o, s, l, c = new Hr(e);
	for (; ++r < c.length;) {
		for (; r in t;) r = t[r];
		if (n = c.get(r), r && n[1].type === "chunkFlow" && c.get(r - 1)[1].type === "listItemPrefix" && (s = n[1]._tokenizer.events, u = 0, u < s.length && s[u][1].type === "lineEndingBlank" && (u += 2), u < s.length && s[u][1].type === "content")) for (; ++u < s.length && s[u][1].type !== "content";) s[u][1].type === "chunkText" && (s[u][1]._isInFirstContentOfListItem = !0, u++);
		if (n[0] === "enter") n[1].contentType && (Object.assign(t, zm(c, r)), r = t[r], l = !0);
		else if (n[1]._container) {
			for (u = r, a = void 0; u--;) if (i = c.get(u), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank") i[0] === "enter" && (a && (c.get(a)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", a = u);
			else if (!(i[1].type === "linePrefix" || i[1].type === "listItemIndent")) break;
			a && (n[1].end = { ...c.get(a)[1].start }, o = c.slice(a, r), o.unshift(n), c.splice(a, r - a + 1, o));
		}
	}
	return re(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !l;
}
function zm(e, t) {
	let r = e.get(t)[1], n = e.get(t)[2], a = t - 1, u = [], i = r._tokenizer;
	i || (i = n.parser[r.contentType](r.start), r._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
	let o = i.events, s = [], l = {}, c, f, h = -1, m = r, D = 0, x = 0, g = [x];
	for (; m;) {
		for (; e.get(++a)[1] !== m;);
		u.push(a), m._tokenizer || (c = n.sliceStream(m), m.next || c.push(null), f && i.defineSkip(m.start), m._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(c), m._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), f = m, m = m.next;
	}
	for (m = r; ++h < o.length;) o[h][0] === "exit" && o[h - 1][0] === "enter" && o[h][1].type === o[h - 1][1].type && o[h][1].start.line !== o[h][1].end.line && (x = h + 1, g.push(x), m._tokenizer = void 0, m.previous = void 0, m = m.next);
	for (i.events = [], m ? (m._tokenizer = void 0, m.previous = void 0) : g.pop(), h = g.length; h--;) {
		let k = o.slice(g[h], g[h + 1]), E = u.pop();
		s.push([E, E + k.length - 1]), e.splice(E, 2, k);
	}
	for (s.reverse(), h = -1; ++h < s.length;) l[D + s[h][0]] = D + s[h][1], D += s[h][1] - s[h][0] - 1;
	return l;
}
function Hm(e) {
	return Vr(e), e;
}
function Vm(e, t) {
	let r;
	return n;
	function n(o) {
		return e.enter("content"), r = e.enter("chunkContent", { contentType: "content" }), a(o);
	}
	function a(o) {
		return o === null ? u(o) : B(o) ? e.check(Um, i, u)(o) : (e.consume(o), a);
	}
	function u(o) {
		return e.exit("chunkContent"), e.exit("content"), t(o);
	}
	function i(o) {
		return e.consume(o), e.exit("chunkContent"), r.next = e.enter("chunkContent", {
			contentType: "content",
			previous: r
		}), r = r.next, a;
	}
}
function Gm(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), U(e, u, "linePrefix");
	}
	function u(i) {
		if (i === null || B(i)) return r(i);
		let o = n.events[n.events.length - 1];
		return !n.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(i) : e.interrupt(n.parser.constructs.flow, r, t)(i);
	}
}
function Gr(e, t, r, n, a, u, i, o, s) {
	let l = s || Number.POSITIVE_INFINITY, c = 0;
	return f;
	function f(k) {
		return k === 60 ? (e.enter(n), e.enter(a), e.enter(u), e.consume(k), e.exit(u), h) : k === null || k === 32 || k === 41 || mt(k) ? r(k) : (e.enter(n), e.enter(i), e.enter(o), e.enter("chunkString", { contentType: "string" }), x(k));
	}
	function h(k) {
		return k === 62 ? (e.enter(u), e.consume(k), e.exit(u), e.exit(a), e.exit(n), t) : (e.enter(o), e.enter("chunkString", { contentType: "string" }), m(k));
	}
	function m(k) {
		return k === 62 ? (e.exit("chunkString"), e.exit(o), h(k)) : k === null || k === 60 || B(k) ? r(k) : (e.consume(k), k === 92 ? D : m);
	}
	function D(k) {
		return k === 60 || k === 62 || k === 92 ? (e.consume(k), m) : m(k);
	}
	function x(k) {
		return !c && (k === null || k === 41 || G(k)) ? (e.exit("chunkString"), e.exit(o), e.exit(i), e.exit(n), t(k)) : c < l && k === 40 ? (e.consume(k), c++, x) : k === 41 ? (e.consume(k), c--, x) : k === null || k === 32 || k === 40 || mt(k) ? r(k) : (e.consume(k), k === 92 ? g : x);
	}
	function g(k) {
		return k === 40 || k === 41 || k === 92 ? (e.consume(k), x) : x(k);
	}
}
function Wr(e, t, r, n, a, u) {
	let i = this, o = 0, s;
	return l;
	function l(m) {
		return e.enter(n), e.enter(a), e.consume(m), e.exit(a), e.enter(u), c;
	}
	function c(m) {
		return o > 999 || m === null || m === 91 || m === 93 && !s || m === 94 && !o && "_hiddenFootnoteSupport" in i.parser.constructs ? r(m) : m === 93 ? (e.exit(u), e.enter(a), e.consume(m), e.exit(a), e.exit(n), t) : B(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), c) : (e.enter("chunkString", { contentType: "string" }), f(m));
	}
	function f(m) {
		return m === null || m === 91 || m === 93 || B(m) || o++ > 999 ? (e.exit("chunkString"), c(m)) : (e.consume(m), s || (s = !H(m)), m === 92 ? h : f);
	}
	function h(m) {
		return m === 91 || m === 92 || m === 93 ? (e.consume(m), o++, f) : f(m);
	}
}
function Yr(e, t, r, n, a, u) {
	let i;
	return o;
	function o(h) {
		return h === 34 || h === 39 || h === 40 ? (e.enter(n), e.enter(a), e.consume(h), e.exit(a), i = h === 40 ? 41 : h, s) : r(h);
	}
	function s(h) {
		return h === i ? (e.enter(a), e.consume(h), e.exit(a), e.exit(n), t) : (e.enter(u), l(h));
	}
	function l(h) {
		return h === i ? (e.exit(u), s(i)) : h === null ? r(h) : B(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), U(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), c(h));
	}
	function c(h) {
		return h === i || h === null || B(h) ? (e.exit("chunkString"), l(h)) : (e.consume(h), h === 92 ? f : c);
	}
	function f(h) {
		return h === i || h === 92 ? (e.consume(h), c) : c(h);
	}
}
function dt(e, t) {
	let r;
	return n;
	function n(a) {
		return B(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), r = !0, n) : H(a) ? U(e, n, r ? "linePrefix" : "lineSuffix")(a) : t(a);
	}
}
function Ym(e, t, r) {
	let n = this, a;
	return u;
	function u(m) {
		return e.enter("definition"), i(m);
	}
	function i(m) {
		return Wr.call(n, e, o, r, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(m);
	}
	function o(m) {
		return a = fe(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1)), m === 58 ? (e.enter("definitionMarker"), e.consume(m), e.exit("definitionMarker"), s) : r(m);
	}
	function s(m) {
		return G(m) ? dt(e, l)(m) : l(m);
	}
	function l(m) {
		return Gr(e, c, r, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(m);
	}
	function c(m) {
		return e.attempt(Wm, f, f)(m);
	}
	function f(m) {
		return H(m) ? U(e, h, "whitespace")(m) : h(m);
	}
	function h(m) {
		return m === null || B(m) ? (e.exit("definition"), n.parser.defined.push(a), t(m)) : r(m);
	}
}
function jm(e, t, r) {
	return n;
	function n(o) {
		return G(o) ? dt(e, a)(o) : r(o);
	}
	function a(o) {
		return Yr(e, u, r, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
	}
	function u(o) {
		return H(o) ? U(e, i, "whitespace")(o) : i(o);
	}
	function i(o) {
		return o === null || B(o) ? t(o) : r(o);
	}
}
function $m(e, t, r) {
	return n;
	function n(u) {
		return e.enter("hardBreakEscape"), e.consume(u), a;
	}
	function a(u) {
		return B(u) ? (e.exit("hardBreakEscape"), t(u)) : r(u);
	}
}
function Km(e, t) {
	let r = e.length - 2, n = 3, a, u;
	return e[n][1].type === "whitespace" && (n += 2), r - 2 > n && e[r][1].type === "whitespace" && (r -= 2), e[r][1].type === "atxHeadingSequence" && (n === r - 1 || r - 4 > n && e[r - 2][1].type === "whitespace") && (r -= n + 1 === r ? 2 : 4), r > n && (a = {
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
			a,
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
			a,
			t
		]
	])), e;
}
function Qm(e, t, r) {
	let n = 0;
	return a;
	function a(c) {
		return e.enter("atxHeading"), u(c);
	}
	function u(c) {
		return e.enter("atxHeadingSequence"), i(c);
	}
	function i(c) {
		return c === 35 && n++ < 6 ? (e.consume(c), i) : c === null || G(c) ? (e.exit("atxHeadingSequence"), o(c)) : r(c);
	}
	function o(c) {
		return c === 35 ? (e.enter("atxHeadingSequence"), s(c)) : c === null || B(c) ? (e.exit("atxHeading"), t(c)) : H(c) ? U(e, o, "whitespace")(c) : (e.enter("atxHeadingText"), l(c));
	}
	function s(c) {
		return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), o(c));
	}
	function l(c) {
		return c === null || c === 35 || G(c) ? (e.exit("atxHeadingText"), o(c)) : (e.consume(c), l);
	}
}
function Zm(e) {
	let t = e.length;
	for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function eD(e, t, r) {
	let n = this, a, u, i, o, s;
	return l;
	function l(F) {
		return c(F);
	}
	function c(F) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(F), f;
	}
	function f(F) {
		return F === 33 ? (e.consume(F), h) : F === 47 ? (e.consume(F), u = !0, x) : F === 63 ? (e.consume(F), a = 3, n.interrupt ? t : p) : K(F) ? (e.consume(F), i = String.fromCharCode(F), g) : r(F);
	}
	function h(F) {
		return F === 45 ? (e.consume(F), a = 2, m) : F === 91 ? (e.consume(F), a = 5, o = 0, D) : K(F) ? (e.consume(F), a = 4, n.interrupt ? t : p) : r(F);
	}
	function m(F) {
		return F === 45 ? (e.consume(F), n.interrupt ? t : p) : r(F);
	}
	function D(F) {
		return F === "CDATA[".charCodeAt(o++) ? (e.consume(F), o === 6 ? n.interrupt ? t : I : D) : r(F);
	}
	function x(F) {
		return K(F) ? (e.consume(F), i = String.fromCharCode(F), g) : r(F);
	}
	function g(F) {
		if (F === null || F === 47 || F === 62 || G(F)) {
			let ee = F === 47, ce = i.toLowerCase();
			return !ee && !u && ti.includes(ce) ? (a = 1, n.interrupt ? t(F) : I(F)) : qu.includes(i.toLowerCase()) ? (a = 6, ee ? (e.consume(F), k) : n.interrupt ? t(F) : I(F)) : (a = 7, n.interrupt && !n.parser.lazy[n.now().line] ? r(F) : u ? E(F) : C(F));
		}
		return F === 45 || Q(F) ? (e.consume(F), i += String.fromCharCode(F), g) : r(F);
	}
	function k(F) {
		return F === 62 ? (e.consume(F), n.interrupt ? t : I) : r(F);
	}
	function E(F) {
		return H(F) ? (e.consume(F), E) : b(F);
	}
	function C(F) {
		return F === 47 ? (e.consume(F), b) : F === 58 || F === 95 || K(F) ? (e.consume(F), S) : H(F) ? (e.consume(F), C) : b(F);
	}
	function S(F) {
		return F === 45 || F === 46 || F === 58 || F === 95 || Q(F) ? (e.consume(F), S) : w(F);
	}
	function w(F) {
		return F === 61 ? (e.consume(F), d) : H(F) ? (e.consume(F), w) : C(F);
	}
	function d(F) {
		return F === null || F === 60 || F === 61 || F === 62 || F === 96 ? r(F) : F === 34 || F === 39 ? (e.consume(F), s = F, v) : H(F) ? (e.consume(F), d) : L(F);
	}
	function v(F) {
		return F === s ? (e.consume(F), s = null, y) : F === null || B(F) ? r(F) : (e.consume(F), v);
	}
	function L(F) {
		return F === null || F === 34 || F === 39 || F === 47 || F === 60 || F === 61 || F === 62 || F === 96 || G(F) ? w(F) : (e.consume(F), L);
	}
	function y(F) {
		return F === 47 || F === 62 || H(F) ? C(F) : r(F);
	}
	function b(F) {
		return F === 62 ? (e.consume(F), _) : r(F);
	}
	function _(F) {
		return F === null || B(F) ? I(F) : H(F) ? (e.consume(F), _) : r(F);
	}
	function I(F) {
		return F === 45 && a === 2 ? (e.consume(F), z) : F === 60 && a === 1 ? (e.consume(F), N) : F === 62 && a === 4 ? (e.consume(F), Y) : F === 63 && a === 3 ? (e.consume(F), p) : F === 93 && a === 5 ? (e.consume(F), ne) : B(F) && (a === 6 || a === 7) ? (e.exit("htmlFlowData"), e.check(Jm, ie, T)(F)) : F === null || B(F) ? (e.exit("htmlFlowData"), T(F)) : (e.consume(F), I);
	}
	function T(F) {
		return e.check(Xm, R, ie)(F);
	}
	function R(F) {
		return e.enter("lineEnding"), e.consume(F), e.exit("lineEnding"), O;
	}
	function O(F) {
		return F === null || B(F) ? T(F) : (e.enter("htmlFlowData"), I(F));
	}
	function z(F) {
		return F === 45 ? (e.consume(F), p) : I(F);
	}
	function N(F) {
		return F === 47 ? (e.consume(F), i = "", W) : I(F);
	}
	function W(F) {
		if (F === 62) {
			let ee = i.toLowerCase();
			return ti.includes(ee) ? (e.consume(F), Y) : I(F);
		}
		return K(F) && i.length < 8 ? (e.consume(F), i += String.fromCharCode(F), W) : I(F);
	}
	function ne(F) {
		return F === 93 ? (e.consume(F), p) : I(F);
	}
	function p(F) {
		return F === 62 ? (e.consume(F), Y) : F === 45 && a === 2 ? (e.consume(F), p) : I(F);
	}
	function Y(F) {
		return F === null || B(F) ? (e.exit("htmlFlowData"), ie(F)) : (e.consume(F), Y);
	}
	function ie(F) {
		return e.exit("htmlFlow"), t(F);
	}
}
function tD(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return B(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), u) : r(i);
	}
	function u(i) {
		return n.parser.lazy[n.now().line] ? r(i) : t(i);
	}
}
function rD(e, t, r) {
	return n;
	function n(a) {
		return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), e.attempt(qe, t, r);
	}
}
function nD(e, t, r) {
	let n = this, a, u, i;
	return o;
	function o(p) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(p), s;
	}
	function s(p) {
		return p === 33 ? (e.consume(p), l) : p === 47 ? (e.consume(p), w) : p === 63 ? (e.consume(p), C) : K(p) ? (e.consume(p), L) : r(p);
	}
	function l(p) {
		return p === 45 ? (e.consume(p), c) : p === 91 ? (e.consume(p), u = 0, D) : K(p) ? (e.consume(p), E) : r(p);
	}
	function c(p) {
		return p === 45 ? (e.consume(p), m) : r(p);
	}
	function f(p) {
		return p === null ? r(p) : p === 45 ? (e.consume(p), h) : B(p) ? (i = f, N(p)) : (e.consume(p), f);
	}
	function h(p) {
		return p === 45 ? (e.consume(p), m) : f(p);
	}
	function m(p) {
		return p === 62 ? z(p) : p === 45 ? h(p) : f(p);
	}
	function D(p) {
		return p === "CDATA[".charCodeAt(u++) ? (e.consume(p), u === 6 ? x : D) : r(p);
	}
	function x(p) {
		return p === null ? r(p) : p === 93 ? (e.consume(p), g) : B(p) ? (i = x, N(p)) : (e.consume(p), x);
	}
	function g(p) {
		return p === 93 ? (e.consume(p), k) : x(p);
	}
	function k(p) {
		return p === 62 ? z(p) : p === 93 ? (e.consume(p), k) : x(p);
	}
	function E(p) {
		return p === null || p === 62 ? z(p) : B(p) ? (i = E, N(p)) : (e.consume(p), E);
	}
	function C(p) {
		return p === null ? r(p) : p === 63 ? (e.consume(p), S) : B(p) ? (i = C, N(p)) : (e.consume(p), C);
	}
	function S(p) {
		return p === 62 ? z(p) : C(p);
	}
	function w(p) {
		return K(p) ? (e.consume(p), d) : r(p);
	}
	function d(p) {
		return p === 45 || Q(p) ? (e.consume(p), d) : v(p);
	}
	function v(p) {
		return B(p) ? (i = v, N(p)) : H(p) ? (e.consume(p), v) : z(p);
	}
	function L(p) {
		return p === 45 || Q(p) ? (e.consume(p), L) : p === 47 || p === 62 || G(p) ? y(p) : r(p);
	}
	function y(p) {
		return p === 47 ? (e.consume(p), z) : p === 58 || p === 95 || K(p) ? (e.consume(p), b) : B(p) ? (i = y, N(p)) : H(p) ? (e.consume(p), y) : z(p);
	}
	function b(p) {
		return p === 45 || p === 46 || p === 58 || p === 95 || Q(p) ? (e.consume(p), b) : _(p);
	}
	function _(p) {
		return p === 61 ? (e.consume(p), I) : B(p) ? (i = _, N(p)) : H(p) ? (e.consume(p), _) : y(p);
	}
	function I(p) {
		return p === null || p === 60 || p === 61 || p === 62 || p === 96 ? r(p) : p === 34 || p === 39 ? (e.consume(p), a = p, T) : B(p) ? (i = I, N(p)) : H(p) ? (e.consume(p), I) : (e.consume(p), R);
	}
	function T(p) {
		return p === a ? (e.consume(p), a = void 0, O) : p === null ? r(p) : B(p) ? (i = T, N(p)) : (e.consume(p), T);
	}
	function R(p) {
		return p === null || p === 34 || p === 39 || p === 60 || p === 61 || p === 96 ? r(p) : p === 47 || p === 62 || G(p) ? y(p) : (e.consume(p), R);
	}
	function O(p) {
		return p === 47 || p === 62 || G(p) ? y(p) : r(p);
	}
	function z(p) {
		return p === 62 ? (e.consume(p), e.exit("htmlTextData"), e.exit("htmlText"), t) : r(p);
	}
	function N(p) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), W;
	}
	function W(p) {
		return H(p) ? U(e, ne, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(p) : ne(p);
	}
	function ne(p) {
		return e.enter("htmlTextData"), i(p);
	}
}
function oD(e) {
	let t = -1, r = [];
	for (; ++t < e.length;) {
		let n = e[t][1];
		if (r.push(e[t]), n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") {
			let a = n.type === "labelImage" ? 4 : 2;
			n.type = "data", t += a;
		}
	}
	return e.length !== r.length && re(e, 0, e.length, r), e;
}
function sD(e, t) {
	let r = e.length, n = 0, a, u, i, o;
	for (; r--;) if (a = e[r][1], u) {
		if (a.type === "link" || a.type === "labelLink" && a._inactive) break;
		e[r][0] === "enter" && a.type === "labelLink" && (a._inactive = !0);
	} else if (i) {
		if (e[r][0] === "enter" && (a.type === "labelImage" || a.type === "labelLink") && !a._balanced && (u = r, a.type !== "labelLink")) {
			n = 2;
			break;
		}
	} else a.type === "labelEnd" && (i = r);
	let s = {
		type: e[u][1].type === "labelLink" ? "link" : "image",
		start: { ...e[u][1].start },
		end: { ...e[e.length - 1][1].end }
	}, l = {
		type: "label",
		start: { ...e[u][1].start },
		end: { ...e[i][1].end }
	}, c = {
		type: "labelText",
		start: { ...e[u + n + 2][1].end },
		end: { ...e[i - 2][1].start }
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
		c,
		t
	]]), o = he(o, nt(t.parser.constructs.insideSpan.null, e.slice(u + n + 4, i - 3), t)), o = he(o, [
		[
			"exit",
			c,
			t
		],
		e[i - 2],
		e[i - 1],
		[
			"exit",
			l,
			t
		]
	]), o = he(o, e.slice(i + 1)), o = he(o, [[
		"exit",
		s,
		t
	]]), re(e, u, e.length, o), e;
}
function lD(e, t, r) {
	let n = this, a = n.events.length, u, i;
	for (; a--;) if ((n.events[a][1].type === "labelImage" || n.events[a][1].type === "labelLink") && !n.events[a][1]._balanced) {
		u = n.events[a][1];
		break;
	}
	return o;
	function o(h) {
		return u ? u._inactive ? f(h) : (i = n.parser.defined.includes(fe(n.sliceSerialize({
			start: u.end,
			end: n.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), s) : r(h);
	}
	function s(h) {
		return h === 40 ? e.attempt(iD, c, i ? c : f)(h) : h === 91 ? e.attempt(aD, c, i ? l : f)(h) : i ? c(h) : f(h);
	}
	function l(h) {
		return e.attempt(uD, c, f)(h);
	}
	function c(h) {
		return t(h);
	}
	function f(h) {
		return u._balanced = !0, r(h);
	}
}
function cD(e, t, r) {
	return n;
	function n(f) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), a;
	}
	function a(f) {
		return G(f) ? dt(e, u)(f) : u(f);
	}
	function u(f) {
		return f === 41 ? c(f) : Gr(e, i, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
	}
	function i(f) {
		return G(f) ? dt(e, s)(f) : c(f);
	}
	function o(f) {
		return r(f);
	}
	function s(f) {
		return f === 34 || f === 39 || f === 40 ? Yr(e, l, r, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
	}
	function l(f) {
		return G(f) ? dt(e, c)(f) : c(f);
	}
	function c(f) {
		return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), t) : r(f);
	}
}
function fD(e, t, r) {
	let n = this;
	return a;
	function a(o) {
		return Wr.call(n, e, u, i, "reference", "referenceMarker", "referenceString")(o);
	}
	function u(o) {
		return n.parser.defined.includes(fe(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1))) ? t(o) : r(o);
	}
	function i(o) {
		return r(o);
	}
}
function pD(e, t, r) {
	return n;
	function n(u) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), a;
	}
	function a(u) {
		return u === 93 ? (e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), e.exit("reference"), t) : r(u);
	}
}
function hD(e, t, r) {
	let n = this;
	return a;
	function a(o) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), u;
	}
	function u(o) {
		return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), i) : r(o);
	}
	function i(o) {
		return o === 94 && "_hiddenFootnoteSupport" in n.parser.constructs ? r(o) : t(o);
	}
}
function mD(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(i), e.exit("labelMarker"), e.exit("labelLink"), u;
	}
	function u(i) {
		return i === 94 && "_hiddenFootnoteSupport" in n.parser.constructs ? r(i) : t(i);
	}
}
function DD(e, t) {
	return r;
	function r(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), U(e, t, "linePrefix");
	}
}
function dD(e, t, r) {
	let n = 0, a;
	return u;
	function u(l) {
		return e.enter("thematicBreak"), i(l);
	}
	function i(l) {
		return a = l, o(l);
	}
	function o(l) {
		return l === a ? (e.enter("thematicBreakSequence"), s(l)) : n >= 3 && (l === null || B(l)) ? (e.exit("thematicBreak"), t(l)) : r(l);
	}
	function s(l) {
		return l === a ? (e.consume(l), n++, s) : (e.exit("thematicBreakSequence"), H(l) ? U(e, o, "whitespace")(l) : o(l));
	}
}
function kD(e, t, r) {
	let n = this, a = n.events[n.events.length - 1], u = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, i = 0;
	return o;
	function o(m) {
		let D = n.containerState.type || (m === 42 || m === 43 || m === 45 ? "listUnordered" : "listOrdered");
		if (D === "listUnordered" ? !n.containerState.marker || m === n.containerState.marker : er(m)) {
			if (n.containerState.type || (n.containerState.type = D, e.enter(D, { _container: !0 })), D === "listUnordered") return e.enter("listItemPrefix"), m === 42 || m === 45 ? e.check(xt, r, l)(m) : l(m);
			if (!n.interrupt || m === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), s(m);
		}
		return r(m);
	}
	function s(m) {
		return er(m) && ++i < 10 ? (e.consume(m), s) : (!n.interrupt || i < 2) && (n.containerState.marker ? m === n.containerState.marker : m === 41 || m === 46) ? (e.exit("listItemValue"), l(m)) : r(m);
	}
	function l(m) {
		return e.enter("listItemMarker"), e.consume(m), e.exit("listItemMarker"), n.containerState.marker = n.containerState.marker || m, e.check(qe, n.interrupt ? r : c, e.attempt(gD, h, f));
	}
	function c(m) {
		return n.containerState.initialBlankLine = !0, u++, h(m);
	}
	function f(m) {
		return H(m) ? (e.enter("listItemPrefixWhitespace"), e.consume(m), e.exit("listItemPrefixWhitespace"), h) : r(m);
	}
	function h(m) {
		return n.containerState.size = u + n.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(m);
	}
}
function FD(e, t, r) {
	let n = this;
	return n.containerState._closeFlow = void 0, e.check(qe, a, u);
	function a(o) {
		return n.containerState.furtherBlankLines = n.containerState.furtherBlankLines || n.containerState.initialBlankLine, U(e, t, "listItemIndent", n.containerState.size + 1)(o);
	}
	function u(o) {
		return n.containerState.furtherBlankLines || !H(o) ? (n.containerState.furtherBlankLines = void 0, n.containerState.initialBlankLine = void 0, i(o)) : (n.containerState.furtherBlankLines = void 0, n.containerState.initialBlankLine = void 0, e.attempt(xD, t, i)(o));
	}
	function i(o) {
		return n.containerState._closeFlow = !0, n.interrupt = void 0, U(e, e.attempt(pe, t, r), "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
	}
}
function bD(e, t, r) {
	let n = this;
	return U(e, a, "listItemIndent", n.containerState.size + 1);
	function a(u) {
		let i = n.events[n.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === n.containerState.size ? t(u) : r(u);
	}
}
function ED(e) {
	e.exit(this.containerState.type);
}
function wD(e, t, r) {
	let n = this;
	return U(e, a, "listItemPrefixWhitespace", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function a(u) {
		let i = n.events[n.events.length - 1];
		return !H(u) && i && i[1].type === "listItemPrefixWhitespace" ? t(u) : r(u);
	}
}
function CD(e, t) {
	let r = e.length, n, a, u;
	for (; r--;) if (e[r][0] === "enter") {
		if (e[r][1].type === "content") {
			n = r;
			break;
		}
		e[r][1].type === "paragraph" && (a = r);
	} else e[r][1].type === "content" && e.splice(r, 1), !u && e[r][1].type === "definition" && (u = r);
	let i = {
		type: "setextHeading",
		start: { ...e[n][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[a][1].type = "setextHeadingText", u ? (e.splice(a, 0, [
		"enter",
		i,
		t
	]), e.splice(u + 1, 0, [
		"exit",
		e[n][1],
		t
	]), e[n][1].end = { ...e[u][1].end }) : e[n][1] = i, e.push([
		"exit",
		i,
		t
	]), e;
}
function yD(e, t, r) {
	let n = this, a;
	return u;
	function u(l) {
		let c = n.events.length, f;
		for (; c--;) if (n.events[c][1].type !== "lineEnding" && n.events[c][1].type !== "linePrefix" && n.events[c][1].type !== "content") {
			f = n.events[c][1].type === "paragraph";
			break;
		}
		return !n.parser.lazy[n.now().line] && (n.interrupt || f) ? (e.enter("setextHeadingLine"), a = l, i(l)) : r(l);
	}
	function i(l) {
		return e.enter("setextHeadingLineSequence"), o(l);
	}
	function o(l) {
		return l === a ? (e.consume(l), o) : (e.exit("setextHeadingLineSequence"), H(l) ? U(e, s, "lineSuffix")(l) : s(l));
	}
	function s(l) {
		return l === null || B(l) ? (e.exit("setextHeadingLine"), t(l)) : r(l);
	}
}
function vD(e) {
	let t = this, r = e.attempt(qe, n, e.attempt(this.parser.constructs.flowInitial, a, U(e, e.attempt(this.parser.constructs.flow, a, e.attempt(Jn, a)), "linePrefix")));
	return r;
	function n(u) {
		if (u === null) {
			e.consume(u);
			return;
		}
		return e.enter("lineEndingBlank"), e.consume(u), e.exit("lineEndingBlank"), t.currentConstruct = void 0, r;
	}
	function a(u) {
		if (u === null) {
			e.consume(u);
			return;
		}
		return e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), t.currentConstruct = void 0, r;
	}
}
function Nu(e) {
	return {
		resolveAll: Ru(e === "text" ? AD : void 0),
		tokenize: t
	};
	function t(r) {
		let n = this, a = this.parser.constructs[e], u = r.attempt(a, i, o);
		return i;
		function i(c) {
			return l(c) ? u(c) : o(c);
		}
		function o(c) {
			if (c === null) {
				r.consume(c);
				return;
			}
			return r.enter("data"), r.consume(c), s;
		}
		function s(c) {
			return l(c) ? (r.exit("data"), u(c)) : (r.consume(c), s);
		}
		function l(c) {
			if (c === null) return !0;
			let f = a[c], h = -1;
			if (f) for (; ++h < f.length;) {
				let m = f[h];
				if (!m.previous || m.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Ru(e) {
	return t;
	function t(r, n) {
		let a = -1, u;
		for (; ++a <= r.length;) u === void 0 ? r[a] && r[a][1].type === "data" && (u = a, a++) : (!r[a] || r[a][1].type !== "data") && (a !== u + 2 && (r[u][1].end = r[a - 1][1].end, r.splice(u + 2, a - u - 2), a = u + 2), u = void 0);
		return e ? e(r, n) : r;
	}
}
function AD(e, t) {
	let r = 0;
	for (; ++r <= e.length;) if ((r === e.length || e[r][1].type === "lineEnding") && e[r - 1][1].type === "data") {
		let n = e[r - 1][1], a = t.sliceStream(n), u = a.length, i = -1, o = 0, s;
		for (; u--;) {
			let l = a[u];
			if (typeof l == "string") {
				for (i = l.length; l.charCodeAt(i - 1) === 32;) o++, i--;
				if (i) break;
				i = -1;
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
					_bufferIndex: u ? i : n.start._bufferIndex + i,
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
function Mu(e, t, r) {
	let n = {
		_bufferIndex: -1,
		_index: 0,
		line: r && r.line || 1,
		column: r && r.column || 1,
		offset: r && r.offset || 0
	}, a = {}, u = [], i = [], o = [], l = {
		attempt: y(v),
		check: y(L),
		consume: S,
		enter: w,
		exit: d,
		interrupt: y(L, { interrupt: !0 })
	}, c = {
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
	}, f = t.tokenize.call(c, l);
	return t.resolveAll && u.push(t), c;
	function m(T) {
		return i = he(i, T), E(), i[i.length - 1] !== null ? [] : (b(t, 0), c.events = nt(u, c.events, c), c.events);
	}
	function D(T, R) {
		return RD(x(T), R);
	}
	function x(T) {
		return ND(i, T);
	}
	function g() {
		let { _bufferIndex: T, _index: R, line: O, column: z, offset: N } = n;
		return {
			_bufferIndex: T,
			_index: R,
			line: O,
			column: z,
			offset: N
		};
	}
	function k(T) {
		a[T.line] = T.column, I();
	}
	function E() {
		let T;
		for (; n._index < i.length;) {
			let R = i[n._index];
			if (typeof R == "string") for (T = n._index, n._bufferIndex < 0 && (n._bufferIndex = 0); n._index === T && n._bufferIndex < R.length;) C(R.charCodeAt(n._bufferIndex));
			else C(R);
		}
	}
	function C(T) {
		f = f(T);
	}
	function S(T) {
		B(T) ? (n.line++, n.column = 1, n.offset += T === -3 ? 2 : 1, I()) : T !== -1 && (n.column++, n.offset++), n._bufferIndex < 0 ? n._index++ : (n._bufferIndex++, n._bufferIndex === i[n._index].length && (n._bufferIndex = -1, n._index++)), c.previous = T;
	}
	function w(T, R) {
		let O = R || {};
		return O.type = T, O.start = g(), c.events.push([
			"enter",
			O,
			c
		]), o.push(O), O;
	}
	function d(T) {
		let R = o.pop();
		return R.end = g(), c.events.push([
			"exit",
			R,
			c
		]), R;
	}
	function v(T, R) {
		b(T, R.from);
	}
	function L(T, R) {
		R.restore();
	}
	function y(T, R) {
		return O;
		function O(z, N, W) {
			let ne, p, Y, ie;
			return Array.isArray(z) ? ee(z) : "tokenize" in z ? ee([z]) : F(z);
			function F(oe) {
				return Jt;
				function Jt(Me) {
					let ct = Me !== null && oe[Me], yt = Me !== null && oe.null;
					return ee([...Array.isArray(ct) ? ct : ct ? [ct] : [], ...Array.isArray(yt) ? yt : yt ? [yt] : []])(Me);
				}
			}
			function ee(oe) {
				return ne = oe, p = 0, oe.length === 0 ? W : ce(oe[p]);
			}
			function ce(oe) {
				return Jt;
				function Jt(Me) {
					return ie = _(), Y = oe, oe.partial || (c.currentConstruct = oe), oe.name && c.parser.constructs.disable.null.includes(oe.name) ? et(Me) : oe.tokenize.call(R ? Object.assign(Object.create(c), R) : c, l, te, et)(Me);
				}
			}
			function te(oe) {
				return T(Y, ie), N;
			}
			function et(oe) {
				return ie.restore(), ++p < ne.length ? ce(ne[p]) : W;
			}
		}
	}
	function b(T, R) {
		T.resolveAll && !u.includes(T) && u.push(T), T.resolve && re(c.events, R, c.events.length - R, T.resolve(c.events.slice(R), c)), T.resolveTo && (c.events = T.resolveTo(c.events, c));
	}
	function _() {
		let T = g(), R = c.previous, O = c.currentConstruct, z = c.events.length, N = Array.from(o);
		return {
			from: z,
			restore: W
		};
		function W() {
			n = T, c.previous = R, c.currentConstruct = O, c.events.length = z, o = N, I();
		}
	}
	function I() {
		n.line in a && n.column < 2 && (n.column = a[n.line], n.offset += a[n.line] - 1);
	}
}
function ND(e, t) {
	let r = t.start._index, n = t.start._bufferIndex, a = t.end._index, u = t.end._bufferIndex, i;
	if (r === a) i = [e[r].slice(n, u)];
	else {
		if (i = e.slice(r, a), n > -1) {
			let o = i[0];
			typeof o == "string" ? i[0] = o.slice(n) : i.shift();
		}
		u > 0 && i.push(e[a].slice(0, u));
	}
	return i;
}
function RD(e, t) {
	let r = -1, n = [], a;
	for (; ++r < e.length;) {
		let u = e[r], i;
		if (typeof u == "string") i = u;
		else switch (u) {
			case -5:
				i = "\r";
				break;
			case -4:
				i = `
`;
				break;
			case -3:
				i = `\r
`;
				break;
			case -2:
				i = t ? " " : "	";
				break;
			case -1:
				if (!t && a) continue;
				i = " ";
				break;
			default: i = String.fromCharCode(u);
		}
		a = u === -2, n.push(i);
	}
	return n.join("");
}
function oi(e) {
	let n = {
		constructs: Or([ui, ...(e || {}).extensions || []]),
		content: a(Au),
		defined: [],
		document: a(Su),
		flow: a(Bu),
		lazy: {},
		string: a(Pu),
		text: a(Ou)
	};
	return n;
	function a(u) {
		return i;
		function i(o) {
			return Mu(n, u, o);
		}
	}
}
function si(e) {
	for (; !Vr(e););
	return e;
}
function li() {
	let e = 1, t = "", r = !0, n;
	return a;
	function a(u, i, o) {
		let s = [], l, c, f, h, m;
		for (u = t + (typeof u == "string" ? u.toString() : new TextDecoder(i || void 0).decode(u)), f = 0, t = "", r && (u.charCodeAt(0) === 65279 && f++, r = void 0); f < u.length;) {
			if (zu.lastIndex = f, l = zu.exec(u), h = l && l.index !== void 0 ? l.index : u.length, m = u.charCodeAt(h), !l) {
				t = u.slice(f);
				break;
			}
			if (m === 10 && f === h && n) s.push(-3), n = void 0;
			else switch (n && (s.push(-5), n = void 0), f < h && (s.push(u.slice(f, h)), e += h - f), m) {
				case 0:
					s.push(65533), e++;
					break;
				case 9:
					for (c = Math.ceil(e / 4) * 4, s.push(-2); e++ < c;) s.push(-1);
					break;
				case 10:
					s.push(-4), e = 1;
					break;
				default: n = !0, e = 1;
			}
			f = h + 1;
		}
		return o && (n && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
function Uu(e) {
	return e.replace(MD, zD);
}
function zD(e, t, r) {
	if (t) return t;
	if (r.charCodeAt(0) === 35) {
		let a = r.charCodeAt(1), u = a === 120 || a === 88;
		return Nr(r.slice(u ? 2 : 1), u ? 16 : 10);
	}
	return Tt(r) || e;
}
function Lt(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Hu(e.position) : "start" in e || "end" in e ? Hu(e) : "line" in e || "column" in e ? ci(e) : "";
}
function ci(e) {
	return Vu(e && e.line) + ":" + Vu(e && e.column);
}
function Hu(e) {
	return ci(e && e.start) + "-" + ci(e && e.end);
}
function Vu(e) {
	return e && typeof e == "number" ? e : 1;
}
function fi(e, t, r) {
	return t && typeof t == "object" && (r = t, t = void 0), UD(r)(si(oi(r).document().write(li()(e, t, !0))));
}
function UD(e) {
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
			autolinkProtocol: y,
			autolinkEmail: y,
			atxHeading: u(hu),
			blockQuote: u(Me),
			characterEscape: y,
			characterReference: y,
			codeFenced: u(ct),
			codeFencedFenceInfo: i,
			codeFencedFenceMeta: i,
			codeIndented: u(ct, i),
			codeText: u(yt, i),
			codeTextData: y,
			data: y,
			codeFlowValue: y,
			definition: u(Un),
			definitionDestinationString: i,
			definitionLabelString: i,
			definitionTitleString: i,
			emphasis: u(em),
			hardBreakEscape: u(mu),
			hardBreakTrailing: u(mu),
			htmlFlow: u(Du, i),
			htmlFlowData: y,
			htmlText: u(Du, i),
			htmlTextData: y,
			image: u(tm),
			label: i,
			link: u(du),
			listItem: u(rm),
			listItemValue: h,
			listOrdered: u(gu, f),
			listUnordered: u(gu),
			paragraph: u(nm),
			reference: F,
			referenceString: i,
			resourceDestinationString: i,
			resourceTitleString: i,
			setextHeading: u(hu),
			strong: u(im),
			thematicBreak: u(um)
		},
		exit: {
			atxHeading: s(),
			atxHeadingSequence: w,
			autolink: s(),
			autolinkEmail: Jt,
			autolinkProtocol: oe,
			blockQuote: s(),
			characterEscapeValue: b,
			characterReferenceMarkerHexadecimal: ce,
			characterReferenceMarkerNumeric: ce,
			characterReferenceValue: te,
			characterReference: et,
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
			definitionDestinationString: S,
			definitionLabelString: E,
			definitionTitleString: C,
			emphasis: s(),
			hardBreakEscape: s(I),
			hardBreakTrailing: s(I),
			htmlFlow: s(T),
			htmlFlowData: b,
			htmlText: s(R),
			htmlTextData: b,
			image: s(N),
			label: ne,
			labelText: W,
			lineEnding: _,
			link: s(z),
			listItem: s(),
			listOrdered: s(),
			listUnordered: s(),
			paragraph: s(),
			referenceString: ee,
			resourceDestinationString: p,
			resourceTitleString: Y,
			resource: ie,
			setextHeading: s(L),
			setextHeadingLineSequence: v,
			setextHeadingText: d,
			strong: s(),
			thematicBreak: s()
		}
	};
	Yu(t, (e || {}).mdastExtensions || []);
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
			buffer: i,
			resume: c,
			data: r
		}, j = [], $ = -1;
		for (; ++$ < A.length;) if (A[$][1].type === "listOrdered" || A[$][1].type === "listUnordered") if (A[$][0] === "enter") j.push($);
		else $ = a(A, j.pop(), $);
		for ($ = -1; ++$ < A.length;) {
			let ye = t[A[$][0]];
			Wu.call(ye, A[$][1].type) && ye[A[$][1].type].call(Object.assign({ sliceSerialize: A[$][2].sliceSerialize }, V), A[$][1]);
		}
		if (V.tokenStack.length > 0) {
			let ye = V.tokenStack[V.tokenStack.length - 1];
			(ye[1] || Gu).call(V, void 0, ye[0]);
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
	function a(A, P, V) {
		let j = P - 1, $ = -1, ye = !1, ft, ze, Xt, Zt;
		for (; ++j <= V;) {
			let xe = A[j];
			switch (xe[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					xe[0] === "enter" ? $++ : $--, Zt = void 0;
					break;
				case "lineEndingBlank":
					xe[0] === "enter" && (ft && !Zt && !$ && !Xt && (Xt = j), Zt = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: Zt = void 0;
			}
			if (!$ && xe[0] === "enter" && xe[1].type === "listItemPrefix" || $ === -1 && xe[0] === "exit" && (xe[1].type === "listUnordered" || xe[1].type === "listOrdered")) {
				if (ft) {
					let vt = j;
					for (ze = void 0; vt--;) {
						let Ue = A[vt];
						if (Ue[1].type === "lineEnding" || Ue[1].type === "lineEndingBlank") {
							if (Ue[0] === "exit") continue;
							ze && (A[ze][1].type = "lineEndingBlank", ye = !0), Ue[1].type = "lineEnding", ze = vt;
						} else if (!(Ue[1].type === "linePrefix" || Ue[1].type === "blockQuotePrefix" || Ue[1].type === "blockQuotePrefixWhitespace" || Ue[1].type === "blockQuoteMarker" || Ue[1].type === "listItemIndent")) break;
					}
					Xt && (!ze || Xt < ze) && (ft._spread = !0), ft.end = Object.assign({}, ze ? A[ze][1].start : xe[1].end), A.splice(ze || j, 0, [
						"exit",
						ft,
						xe[2]
					]), j++, V++;
				}
				if (xe[1].type === "listItemPrefix") {
					let vt = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, xe[1].start),
						end: void 0
					};
					ft = vt, A.splice(j, 0, [
						"enter",
						vt,
						xe[2]
					]), j++, V++, Xt = void 0, Zt = !0;
				}
			}
		}
		return A[P][1]._spread = ye, V;
	}
	function u(A, P) {
		return V;
		function V(j) {
			o.call(this, A(j), j), P && P.call(this, j);
		}
	}
	function i() {
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
		let V = this.stack.pop(), j = this.tokenStack.pop();
		if (j) j[0].type !== A.type && (P ? P.call(this, A, j[0]) : (j[1] || Gu).call(this, A, j[0]));
		else throw new Error("Cannot close `" + A.type + "` (" + Lt({
			start: A.start,
			end: A.end
		}) + "): it’s not open");
		V.position.end = it(A.end);
	}
	function c() {
		return jn(this.stack.pop());
	}
	function f() {
		this.data.expectingFirstListItemValue = !0;
	}
	function h(A) {
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
	function C() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.title = A;
	}
	function S() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.url = A;
	}
	function w(A) {
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
	function y(A) {
		let V = this.stack[this.stack.length - 1].children, j = V[V.length - 1];
		(!j || j.type !== "text") && (j = am(), j.position = {
			start: it(A.start),
			end: void 0
		}, V.push(j)), this.stack.push(j);
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
		!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(P.type) && (y.call(this, A), b.call(this, A));
	}
	function I() {
		this.data.atHardBreak = !0;
	}
	function T() {
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
	function W(A) {
		let P = this.sliceSerialize(A), V = this.stack[this.stack.length - 2];
		V.label = Uu(P), V.identifier = fe(P).toLowerCase();
	}
	function ne() {
		let A = this.stack[this.stack.length - 1], P = this.resume(), V = this.stack[this.stack.length - 1];
		if (this.data.inReference = !0, V.type === "link") V.children = A.children;
		else V.alt = P;
	}
	function p() {
		let A = this.resume(), P = this.stack[this.stack.length - 1];
		P.url = A;
	}
	function Y() {
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
		let P = this.sliceSerialize(A), V = this.data.characterReferenceType, j;
		V ? (j = Nr(P, V === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = Tt(P);
		let $ = this.stack[this.stack.length - 1];
		$.value += j;
	}
	function et(A) {
		let P = this.stack.pop();
		P.position.end = it(A.end);
	}
	function oe(A) {
		b.call(this, A);
		let P = this.stack[this.stack.length - 1];
		P.url = this.sliceSerialize(A);
	}
	function Jt(A) {
		b.call(this, A);
		let P = this.stack[this.stack.length - 1];
		P.url = "mailto:" + this.sliceSerialize(A);
	}
	function Me() {
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
	function Un() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function em() {
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
	function tm() {
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
	function rm(A) {
		return {
			type: "listItem",
			spread: A._spread,
			checked: null,
			children: []
		};
	}
	function nm() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function im() {
		return {
			type: "strong",
			children: []
		};
	}
	function am() {
		return {
			type: "text",
			value: ""
		};
	}
	function um() {
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
function Yu(e, t) {
	let r = -1;
	for (; ++r < t.length;) {
		let n = t[r];
		Array.isArray(n) ? Yu(e, n) : HD(e, n);
	}
}
function HD(e, t) {
	let r;
	for (r in t) if (Wu.call(t, r)) switch (r) {
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
function Gu(e, t) {
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
function pi() {
	return {
		enter: {
			mathFlow: e,
			mathFlowFenceMeta: t,
			mathText: u
		},
		exit: {
			mathFlow: a,
			mathFlowFence: n,
			mathFlowFenceMeta: r,
			mathFlowValue: o,
			mathText: i,
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
	function a(s) {
		let l = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), c = this.stack[this.stack.length - 1];
		c.type, this.exit(s), c.value = l;
		let f = c.data.hChildren[0];
		f.type, f.tagName, f.children.push({
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
	function i(s) {
		let l = this.resume(), c = this.stack[this.stack.length - 1];
		c.type, this.exit(s), c.value = l, c.data.hChildren.push({
			type: "text",
			value: l
		});
	}
	function o(s) {
		this.config.enter.data.call(this, s), this.config.exit.data.call(this, s);
	}
}
function mi() {
	return { text: Be };
}
function WD(e, t, r) {
	let n = this, a, u;
	return i;
	function i(f) {
		return !hi(f) || !eo.call(n, n.previous) || Di(n.events) ? r(f) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), o(f));
	}
	function o(f) {
		return hi(f) ? (e.consume(f), o) : f === 64 ? (e.consume(f), s) : r(f);
	}
	function s(f) {
		return f === 46 ? e.check(GD, c, l)(f) : f === 45 || f === 95 || Q(f) ? (u = !0, e.consume(f), s) : c(f);
	}
	function l(f) {
		return e.consume(f), a = !0, s;
	}
	function c(f) {
		return u && a && K(n.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(f)) : r(f);
	}
}
function YD(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return i !== 87 && i !== 119 || !Xu.call(n, n.previous) || Di(n.events) ? r(i) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(VD, e.attempt(ju, e.attempt($u, u), r), r)(i));
	}
	function u(i) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(i);
	}
}
function jD(e, t, r) {
	let n = this, a = "", u = !1;
	return i;
	function i(f) {
		return (f === 72 || f === 104) && Zu.call(n, n.previous) && !Di(n.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), a += String.fromCodePoint(f), e.consume(f), o) : r(f);
	}
	function o(f) {
		if (K(f) && a.length < 5) return a += String.fromCodePoint(f), e.consume(f), o;
		if (f === 58) {
			let h = a.toLowerCase();
			if (h === "http" || h === "https") return e.consume(f), s;
		}
		return r(f);
	}
	function s(f) {
		return f === 47 ? (e.consume(f), u ? l : (u = !0, s)) : r(f);
	}
	function l(f) {
		return f === null || mt(f) || G(f) || Ie(f) || Dt(f) ? r(f) : e.attempt(ju, e.attempt($u, c), r)(f);
	}
	function c(f) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(f);
	}
}
function $D(e, t, r) {
	let n = 0;
	return a;
	function a(i) {
		return (i === 87 || i === 119) && n < 3 ? (n++, e.consume(i), a) : i === 46 && n === 3 ? (e.consume(i), u) : r(i);
	}
	function u(i) {
		return i === null ? r(i) : t(i);
	}
}
function KD(e, t, r) {
	let n, a, u;
	return i;
	function i(l) {
		return l === 46 || l === 95 ? e.check(Ku, s, o)(l) : l === null || G(l) || Ie(l) || l !== 45 && Dt(l) ? s(l) : (u = !0, e.consume(l), i);
	}
	function o(l) {
		return l === 95 ? n = !0 : (a = n, n = void 0), e.consume(l), i;
	}
	function s(l) {
		return a || n || !u ? r(l) : t(l);
	}
}
function QD(e, t) {
	let r = 0, n = 0;
	return a;
	function a(i) {
		return i === 40 ? (r++, e.consume(i), a) : i === 41 && n < r ? u(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? e.check(Ku, t, u)(i) : i === null || G(i) || Ie(i) ? t(i) : (e.consume(i), a);
	}
	function u(i) {
		return i === 41 && n++, e.consume(i), a;
	}
}
function JD(e, t, r) {
	return n;
	function n(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), n) : o === 38 ? (e.consume(o), u) : o === 93 ? (e.consume(o), a) : o === 60 || o === null || G(o) || Ie(o) ? t(o) : r(o);
	}
	function a(o) {
		return o === null || o === 40 || o === 91 || G(o) || Ie(o) ? t(o) : n(o);
	}
	function u(o) {
		return K(o) ? i(o) : r(o);
	}
	function i(o) {
		return o === 59 ? (e.consume(o), n) : K(o) ? (e.consume(o), i) : r(o);
	}
}
function XD(e, t, r) {
	return n;
	function n(u) {
		return e.consume(u), a;
	}
	function a(u) {
		return Q(u) ? r(u) : t(u);
	}
}
function Xu(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || G(e);
}
function Zu(e) {
	return !K(e);
}
function eo(e) {
	return !(e === 47 || hi(e));
}
function hi(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || Q(e);
}
function Di(e) {
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
function di() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: nd,
			continuation: { tokenize: id },
			exit: ad
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: rd
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: ed,
				resolveTo: td
			}
		}
	};
}
function ed(e, t, r) {
	let n = this, a = n.events.length, u = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []), i;
	for (; a--;) {
		let s = n.events[a][1];
		if (s.type === "labelImage") {
			i = s;
			break;
		}
		if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link") break;
	}
	return o;
	function o(s) {
		if (!i || !i._balanced) return r(s);
		let l = fe(n.sliceSerialize({
			start: i.end,
			end: n.now()
		}));
		return l.codePointAt(0) !== 94 || !u.includes(l.slice(1)) ? r(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), t(s));
	}
}
function td(e, t) {
	let r = e.length;
	for (; r--;) if (e[r][1].type === "labelImage" && e[r][0] === "enter") {
		e[r][1];
		break;
	}
	e[r + 1][1].type = "data", e[r + 3][1].type = "gfmFootnoteCallLabelMarker";
	let a = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[r + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, u = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[r + 3][1].end),
		end: Object.assign({}, e[r + 3][1].end)
	};
	u.end.column++, u.end.offset++, u.end._bufferIndex++;
	let i = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, u.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, i.start),
		end: Object.assign({}, i.end)
	}, s = [
		e[r + 1],
		e[r + 2],
		[
			"enter",
			a,
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
			i,
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
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			a,
			t
		]
	];
	return e.splice(r, e.length - r + 1, ...s), e;
}
function rd(e, t, r) {
	let n = this, a = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []), u = 0, i;
	return o;
	function o(f) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(f), e.exit("gfmFootnoteCallLabelMarker"), s;
	}
	function s(f) {
		return f !== 94 ? r(f) : (e.enter("gfmFootnoteCallMarker"), e.consume(f), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l);
	}
	function l(f) {
		if (u > 999 || f === 93 && !i || f === null || f === 91 || G(f)) return r(f);
		if (f === 93) {
			e.exit("chunkString");
			let h = e.exit("gfmFootnoteCallString");
			return a.includes(fe(n.sliceSerialize(h))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(f), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : r(f);
		}
		return G(f) || (i = !0), u++, e.consume(f), f === 92 ? c : l;
	}
	function c(f) {
		return f === 91 || f === 92 || f === 93 ? (e.consume(f), u++, l) : l(f);
	}
}
function nd(e, t, r) {
	let n = this, a = n.parser.gfmFootnotes || (n.parser.gfmFootnotes = []), u, i = 0, o;
	return s;
	function s(D) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(D), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(D) {
		return D === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(D), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", c) : r(D);
	}
	function c(D) {
		if (i > 999 || D === 93 && !o || D === null || D === 91 || G(D)) return r(D);
		if (D === 93) {
			e.exit("chunkString");
			let x = e.exit("gfmFootnoteDefinitionLabelString");
			return u = fe(n.sliceSerialize(x)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(D), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), h;
		}
		return G(D) || (o = !0), i++, e.consume(D), D === 92 ? f : c;
	}
	function f(D) {
		return D === 91 || D === 92 || D === 93 ? (e.consume(D), i++, c) : c(D);
	}
	function h(D) {
		return D === 58 ? (e.enter("definitionMarker"), e.consume(D), e.exit("definitionMarker"), a.includes(u) || a.push(u), U(e, m, "gfmFootnoteDefinitionWhitespace")) : r(D);
	}
	function m(D) {
		return t(D);
	}
}
function id(e, t, r) {
	return e.check(qe, t, e.attempt(ZD, t, r));
}
function ad(e) {
	e.exit("gfmFootnoteDefinition");
}
function ud(e, t, r) {
	let n = this;
	return U(e, a, "gfmFootnoteDefinitionIndent", 5);
	function a(u) {
		let i = n.events[n.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(u) : r(u);
	}
}
function gi(e) {
	let r = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: u,
		resolveAll: a
	};
	return r ??= !0, {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function a(i, o) {
		let s = -1;
		for (; ++s < i.length;) if (i[s][0] === "enter" && i[s][1].type === "strikethroughSequenceTemporary" && i[s][1]._close) {
			let l = s;
			for (; l--;) if (i[l][0] === "exit" && i[l][1].type === "strikethroughSequenceTemporary" && i[l][1]._open && i[s][1].end.offset - i[s][1].start.offset === i[l][1].end.offset - i[l][1].start.offset) {
				i[s][1].type = "strikethroughSequence", i[l][1].type = "strikethroughSequence";
				let c = {
					type: "strikethrough",
					start: Object.assign({}, i[l][1].start),
					end: Object.assign({}, i[s][1].end)
				}, f = {
					type: "strikethroughText",
					start: Object.assign({}, i[l][1].end),
					end: Object.assign({}, i[s][1].start)
				}, h = [
					[
						"enter",
						c,
						o
					],
					[
						"enter",
						i[l][1],
						o
					],
					[
						"exit",
						i[l][1],
						o
					],
					[
						"enter",
						f,
						o
					]
				], m = o.parser.constructs.insideSpan.null;
				m && re(h, h.length, 0, nt(m, i.slice(l + 1, s), o)), re(h, h.length, 0, [
					[
						"exit",
						f,
						o
					],
					[
						"enter",
						i[s][1],
						o
					],
					[
						"exit",
						i[s][1],
						o
					],
					[
						"exit",
						c,
						o
					]
				]), re(i, l - 1, s - l + 3, h), s = l + h.length - 2;
				break;
			}
		}
		for (s = -1; ++s < i.length;) i[s][1].type === "strikethroughSequenceTemporary" && (i[s][1].type = "data");
		return i;
	}
	function u(i, o, s) {
		let l = this.previous, c = this.events, f = 0;
		return h;
		function h(D) {
			return l === 126 && c[c.length - 1][1].type !== "characterEscape" ? s(D) : (i.enter("strikethroughSequenceTemporary"), m(D));
		}
		function m(D) {
			let x = St(l);
			if (D === 126) return f > 1 ? s(D) : (i.consume(D), f++, m);
			if (f < 2 && !r) return s(D);
			let g = i.exit("strikethroughSequenceTemporary"), k = St(D);
			return g._open = !k || k === 2 && !!x, g._close = !x || x === 2 && !!k, o(D);
		}
	}
}
function od(e, t, r, n) {
	let a = 0;
	if (!(r === 0 && n.length === 0)) {
		for (; a < e.map.length;) {
			if (e.map[a][0] === t) {
				e.map[a][1] += r, e.map[a][2].push(...n);
				return;
			}
			a += 1;
		}
		e.map.push([
			t,
			r,
			n
		]);
	}
}
function to(e, t) {
	let r = !1, n = [];
	for (; t < e.length;) {
		let a = e[t];
		if (r) {
			if (a[0] === "enter") a[1].type === "tableContent" && n.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (a[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let u = n.length - 1;
					n[u] = n[u] === "left" ? "center" : "right";
				}
			} else if (a[1].type === "tableDelimiterRow") break;
		} else a[0] === "enter" && a[1].type === "tableDelimiterRow" && (r = !0);
		t += 1;
	}
	return n;
}
function xi() {
	return { flow: { null: {
		name: "table",
		tokenize: sd,
		resolveAll: ld
	} } };
}
function sd(e, t, r) {
	let n = this, a = 0, u = 0, i;
	return o;
	function o(b) {
		let _ = n.events.length - 1;
		for (; _ > -1;) {
			let R = n.events[_][1].type;
			if (R === "lineEnding" || R === "linePrefix") _--;
			else break;
		}
		let I = _ > -1 ? n.events[_][1].type : null, T = I === "tableHead" || I === "tableRow" ? d : s;
		return T === d && n.parser.lazy[n.now().line] ? r(b) : T(b);
	}
	function s(b) {
		return e.enter("tableHead"), e.enter("tableRow"), l(b);
	}
	function l(b) {
		return b === 124 || (i = !0, u += 1), c(b);
	}
	function c(b) {
		return b === null ? r(b) : B(b) ? u > 1 ? (u = 0, n.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), m) : r(b) : H(b) ? U(e, c, "whitespace")(b) : (u += 1, i && (i = !1, a += 1), b === 124 ? (e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), i = !0, c) : (e.enter("data"), f(b)));
	}
	function f(b) {
		return b === null || b === 124 || G(b) ? (e.exit("data"), c(b)) : (e.consume(b), b === 92 ? h : f);
	}
	function h(b) {
		return b === 92 || b === 124 ? (e.consume(b), f) : f(b);
	}
	function m(b) {
		return n.interrupt = !1, n.parser.lazy[n.now().line] ? r(b) : (e.enter("tableDelimiterRow"), i = !1, H(b) ? U(e, D, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(b) : D(b));
	}
	function D(b) {
		return b === 45 || b === 58 ? g(b) : b === 124 ? (i = !0, e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), x) : w(b);
	}
	function x(b) {
		return H(b) ? U(e, g, "whitespace")(b) : g(b);
	}
	function g(b) {
		return b === 58 ? (u += 1, i = !0, e.enter("tableDelimiterMarker"), e.consume(b), e.exit("tableDelimiterMarker"), k) : b === 45 ? (u += 1, k(b)) : b === null || B(b) ? S(b) : w(b);
	}
	function k(b) {
		return b === 45 ? (e.enter("tableDelimiterFiller"), E(b)) : w(b);
	}
	function E(b) {
		return b === 45 ? (e.consume(b), E) : b === 58 ? (i = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(b), e.exit("tableDelimiterMarker"), C) : (e.exit("tableDelimiterFiller"), C(b));
	}
	function C(b) {
		return H(b) ? U(e, S, "whitespace")(b) : S(b);
	}
	function S(b) {
		return b === 124 ? D(b) : b === null || B(b) ? !i || a !== u ? w(b) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(b)) : w(b);
	}
	function w(b) {
		return r(b);
	}
	function d(b) {
		return e.enter("tableRow"), v(b);
	}
	function v(b) {
		return b === 124 ? (e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), v) : b === null || B(b) ? (e.exit("tableRow"), t(b)) : H(b) ? U(e, v, "whitespace")(b) : (e.enter("data"), L(b));
	}
	function L(b) {
		return b === null || b === 124 || G(b) ? (e.exit("data"), v(b)) : (e.consume(b), b === 92 ? y : L);
	}
	function y(b) {
		return b === 92 || b === 124 ? (e.consume(b), L) : L(b);
	}
}
function ld(e, t) {
	let r = -1, n = !0, a = 0, u = [
		0,
		0,
		0,
		0
	], i = [
		0,
		0,
		0,
		0
	], o = !1, s = 0, l, c, f, h = new $r();
	for (; ++r < e.length;) {
		let m = e[r], D = m[1];
		m[0] === "enter" ? D.type === "tableHead" ? (o = !1, s !== 0 && (ro(h, t, s, l, c), c = void 0, s = 0), l = {
			type: "table",
			start: Object.assign({}, D.start),
			end: Object.assign({}, D.end)
		}, h.add(r, 0, [[
			"enter",
			l,
			t
		]])) : D.type === "tableRow" || D.type === "tableDelimiterRow" ? (n = !0, f = void 0, u = [
			0,
			0,
			0,
			0
		], i = [
			0,
			r + 1,
			0,
			0
		], o && (o = !1, c = {
			type: "tableBody",
			start: Object.assign({}, D.start),
			end: Object.assign({}, D.end)
		}, h.add(r, 0, [[
			"enter",
			c,
			t
		]])), a = D.type === "tableDelimiterRow" ? 2 : c ? 3 : 1) : a && (D.type === "data" || D.type === "tableDelimiterMarker" || D.type === "tableDelimiterFiller") ? (n = !1, i[2] === 0 && (u[1] !== 0 && (i[0] = i[1], f = Kr(h, t, u, a, void 0, f), u = [
			0,
			0,
			0,
			0
		]), i[2] = r)) : D.type === "tableCellDivider" && (n ? n = !1 : (u[1] !== 0 && (i[0] = i[1], f = Kr(h, t, u, a, void 0, f)), u = i, i = [
			u[1],
			r,
			0,
			0
		])) : D.type === "tableHead" ? (o = !0, s = r) : D.type === "tableRow" || D.type === "tableDelimiterRow" ? (s = r, u[1] !== 0 ? (i[0] = i[1], f = Kr(h, t, u, a, r, f)) : i[1] !== 0 && (f = Kr(h, t, i, a, r, f)), a = 0) : a && (D.type === "data" || D.type === "tableDelimiterMarker" || D.type === "tableDelimiterFiller") && (i[3] = r);
	}
	for (s !== 0 && ro(h, t, s, l, c), h.consume(t.events), r = -1; ++r < t.events.length;) {
		let m = t.events[r];
		m[0] === "enter" && m[1].type === "table" && (m[1]._align = to(t.events, r));
	}
	return e;
}
function Kr(e, t, r, n, a, u) {
	let i = n === 1 ? "tableHeader" : n === 2 ? "tableDelimiter" : "tableData", o = "tableContent";
	r[0] !== 0 && (u.end = Object.assign({}, It(t.events, r[0])), e.add(r[0], 0, [[
		"exit",
		u,
		t
	]]));
	let s = It(t.events, r[1]);
	if (u = {
		type: i,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(r[1], 0, [[
		"enter",
		u,
		t
	]]), r[2] !== 0) {
		let l = It(t.events, r[2]), c = It(t.events, r[3]), f = {
			type: o,
			start: Object.assign({}, l),
			end: Object.assign({}, c)
		};
		if (e.add(r[2], 0, [[
			"enter",
			f,
			t
		]]), n !== 2) {
			let h = t.events[r[2]], m = t.events[r[3]];
			if (h[1].end = Object.assign({}, m[1].end), h[1].type = "chunkText", h[1].contentType = "text", r[3] > r[2] + 1) {
				let D = r[2] + 1, x = r[3] - r[2] - 1;
				e.add(D, x, []);
			}
		}
		e.add(r[3] + 1, 0, [[
			"exit",
			f,
			t
		]]);
	}
	return a !== void 0 && (u.end = Object.assign({}, It(t.events, a)), e.add(a, 0, [[
		"exit",
		u,
		t
	]]), u = void 0), u;
}
function ro(e, t, r, n, a) {
	let u = [], i = It(t.events, r);
	a && (a.end = Object.assign({}, i), u.push([
		"exit",
		a,
		t
	])), n.end = Object.assign({}, i), u.push([
		"exit",
		n,
		t
	]), e.add(r + 1, 0, u);
}
function It(e, t) {
	let r = e[t], n = r[0] === "enter" ? "start" : "end";
	return r[1][n];
}
function ki() {
	return { text: { 91: cd } };
}
function fd(e, t, r) {
	let n = this;
	return a;
	function a(s) {
		return n.previous !== null || !n._gfmTasklistFirstContentOfListItem ? r(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), u);
	}
	function u(s) {
		return G(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), i) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), i) : r(s);
	}
	function i(s) {
		return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), o) : r(s);
	}
	function o(s) {
		return B(s) ? t(s) : H(s) ? e.check({ tokenize: pd }, t, r)(s) : r(s);
	}
}
function pd(e, t, r) {
	return U(e, n, "whitespace");
	function n(a) {
		return a === null ? r(a) : t(a);
	}
}
function no(e) {
	return Or([
		mi(),
		di(),
		gi(e),
		xi(),
		ki()
	]);
}
function hd(e, t, r) {
	let n = this, a = n.events[n.events.length - 1], u = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0, i = 0;
	return o;
	function o(E) {
		return e.enter("mathFlow"), e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), s(E);
	}
	function s(E) {
		return E === 36 ? (e.consume(E), i++, s) : i < 2 ? r(E) : (e.exit("mathFlowFenceSequence"), U(e, l, "whitespace")(E));
	}
	function l(E) {
		return E === null || B(E) ? f(E) : (e.enter("mathFlowFenceMeta"), e.enter("chunkString", { contentType: "string" }), c(E));
	}
	function c(E) {
		return E === null || B(E) ? (e.exit("chunkString"), e.exit("mathFlowFenceMeta"), f(E)) : E === 36 ? r(E) : (e.consume(E), c);
	}
	function f(E) {
		return e.exit("mathFlowFence"), n.interrupt ? t(E) : e.attempt(io, h, g)(E);
	}
	function h(E) {
		return e.attempt({
			tokenize: k,
			partial: !0
		}, g, m)(E);
	}
	function m(E) {
		return (u ? U(e, D, "linePrefix", u + 1) : D)(E);
	}
	function D(E) {
		return E === null ? g(E) : B(E) ? e.attempt(io, h, g)(E) : (e.enter("mathFlowValue"), x(E));
	}
	function x(E) {
		return E === null || B(E) ? (e.exit("mathFlowValue"), D(E)) : (e.consume(E), x);
	}
	function g(E) {
		return e.exit("mathFlow"), t(E);
	}
	function k(E, C, S) {
		let w = 0;
		return U(E, d, "linePrefix", n.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		function d(y) {
			return E.enter("mathFlowFence"), E.enter("mathFlowFenceSequence"), v(y);
		}
		function v(y) {
			return y === 36 ? (w++, E.consume(y), v) : w < i ? S(y) : (E.exit("mathFlowFenceSequence"), U(E, L, "whitespace")(y));
		}
		function L(y) {
			return y === null || B(y) ? (E.exit("mathFlowFence"), C(y)) : S(y);
		}
	}
}
function md(e, t, r) {
	let n = this;
	return a;
	function a(i) {
		return i === null ? t(i) : (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), u);
	}
	function u(i) {
		return n.parser.lazy[n.now().line] ? r(i) : t(i);
	}
}
function uo(e) {
	let r = (e || {}).singleDollarTextMath;
	return r ??= !0, {
		tokenize: n,
		resolve: Dd,
		previous: dd,
		name: "mathText"
	};
	function n(a, u, i) {
		let s = 0, l, c;
		return f;
		function f(g) {
			return a.enter("mathText"), a.enter("mathTextSequence"), h(g);
		}
		function h(g) {
			return g === 36 ? (a.consume(g), s++, h) : s < 2 && !r ? i(g) : (a.exit("mathTextSequence"), m(g));
		}
		function m(g) {
			return g === null ? i(g) : g === 36 ? (c = a.enter("mathTextSequence"), l = 0, x(g)) : g === 32 ? (a.enter("space"), a.consume(g), a.exit("space"), m) : B(g) ? (a.enter("lineEnding"), a.consume(g), a.exit("lineEnding"), m) : (a.enter("mathTextData"), D(g));
		}
		function D(g) {
			return g === null || g === 32 || g === 36 || B(g) ? (a.exit("mathTextData"), m(g)) : (a.consume(g), D);
		}
		function x(g) {
			return g === 36 ? (a.consume(g), l++, x) : l === s ? (a.exit("mathTextSequence"), a.exit("mathText"), u(g)) : (c.type = "mathTextData", D(g));
		}
	}
}
function Dd(e) {
	let t = e.length - 4, r = 3, n, a;
	if ((e[r][1].type === "lineEnding" || e[r][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (n = r; ++n < t;) if (e[n][1].type === "mathTextData") {
			e[t][1].type = "mathTextPadding", e[r][1].type = "mathTextPadding", r += 2, t -= 2;
			break;
		}
	}
	for (n = r - 1, t++; ++n <= t;) a === void 0 ? n !== t && e[n][1].type !== "lineEnding" && (a = n) : (n === t || e[n][1].type === "lineEnding") && (e[a][1].type = "mathTextData", n !== a + 2 && (e[a][1].end = e[n - 1][1].end, e.splice(a + 2, n - a - 2), t -= n - a - 2, n = a + 2), a = void 0);
	return e;
}
function dd(e) {
	return e !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Fi(e) {
	return {
		flow: { 36: ao },
		text: { 36: uo(e) }
	};
}
function gd(e) {
	return this[e < 0 ? this.length + e : e];
}
function Ed(e) {
	return X(0, e, /[^\n]/g, " ");
}
function wd(e) {
	let t = e.slice(0, ur);
	if (t !== "---" && t !== "+++") return;
	let r = e.indexOf(`
`, ur);
	if (r === -1) return;
	let n = e.slice(ur, r).trim(), a = e.indexOf(`
${t}`, r), u = n;
	if (u || (u = t === "+++" ? "toml" : "yaml"), a === -1 && t === "---" && u === "yaml" && (a = e.indexOf(`
...`, r)), a === -1) return;
	let i = a + 1 + ur, o = e.charAt(i + 1);
	if (!/\s?/.test(o)) return;
	let s = e.slice(0, i), l;
	return {
		language: u,
		explicitLanguage: n || null,
		value: e.slice(r + 1, a),
		startDelimiter: t,
		endDelimiter: s.slice(-ur),
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
		[Qr]: !0
	};
}
function Cd(e) {
	let t = wd(e);
	return t ? {
		frontMatter: t,
		get content() {
			let { raw: r } = t;
			return oo(r) + e.slice(r.length);
		}
	} : { content: e };
}
function bi(e, t) {
	let r = String(e);
	if (typeof t != "string") throw new TypeError("Expected character");
	let n = 0, a = r.indexOf(t);
	for (; a !== -1;) n++, a = r.indexOf(t, a + t.length);
	return n;
}
function ve(e) {
	if (typeof e != "string") throw new TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function yd(e) {
	let t = [], r = -1;
	for (; ++r < e.length;) t[r] = Bt(e[r]);
	return Jr(n);
	function n(...a) {
		let u = -1;
		for (; ++u < t.length;) if (t[u].apply(this, a)) return !0;
		return !1;
	}
}
function vd(e) {
	let t = e;
	return Jr(r);
	function r(n) {
		let a = n, u;
		for (u in e) if (a[u] !== t[u]) return !1;
		return !0;
	}
}
function Ad(e) {
	return Jr(t);
	function t(r) {
		return r && r.type === e;
	}
}
function Jr(e) {
	return t;
	function t(r, n, a) {
		return !!(Sd(r) && e.call(this, r, typeof n == "number" ? n : void 0, a || void 0));
	}
}
function Td() {
	return !0;
}
function Sd(e) {
	return e !== null && typeof e == "object" && "type" in e;
}
function wi(e, t, r, n) {
	let a;
	typeof t == "function" && typeof r != "function" ? (n = r, r = t) : a = t;
	let u = Bt(a), i = n ? -1 : 1;
	o(e, void 0, [])();
	function o(s, l, c) {
		let f = s && typeof s == "object" ? s : {};
		if (typeof f.type == "string") {
			let m = typeof f.tagName == "string" ? f.tagName : typeof f.name == "string" ? f.name : void 0;
			Object.defineProperty(h, "name", { value: "node (" + (s.type + (m ? "<" + m + ">" : "")) + ")" });
		}
		return h;
		function h() {
			let m = so, D, x, g;
			if ((!t || u(s, l, c[c.length - 1] || void 0)) && (m = Ld(r(s, c)), m[0] === Ei)) return m;
			if ("children" in s && s.children) {
				let k = s;
				if (k.children && m[0] !== co) for (x = (n ? k.children.length : -1) + i, g = c.concat(k); x > -1 && x < k.children.length;) {
					let E = k.children[x];
					if (D = o(E, x, g)(), D[0] === Ei) return D;
					x = typeof D[1] == "number" ? D[1] : x + i;
				}
			}
			return m;
		}
	}
}
function Ld(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [lo, e] : e == null ? so : [e];
}
function Ci(e, t, r) {
	let a = Bt((r || {}).ignore || []), u = Id(t), i = -1;
	for (; ++i < u.length;) wi(e, "text", o);
	function o(l, c) {
		let f = -1, h;
		for (; ++f < c.length;) {
			let m = c[f], D = h ? h.children : void 0;
			if (a(m, D ? D.indexOf(m) : void 0, h)) return;
			h = m;
		}
		if (h) return s(l, c);
	}
	function s(l, c) {
		let f = c[c.length - 1], h = u[i][0], m = u[i][1], D = 0, g = f.children.indexOf(l), k = !1, E = [];
		h.lastIndex = 0;
		let C = h.exec(l.value);
		for (; C;) {
			let S = C.index, w = {
				index: C.index,
				input: C.input,
				stack: [...c, l]
			}, d = m(...C, w);
			if (typeof d == "string" && (d = d.length > 0 ? {
				type: "text",
				value: d
			} : void 0), d === !1 ? h.lastIndex = S + 1 : (D !== S && E.push({
				type: "text",
				value: l.value.slice(D, S)
			}), Array.isArray(d) ? E.push(...d) : d && E.push(d), D = S + C[0].length, k = !0), !h.global) break;
			C = h.exec(l.value);
		}
		return k ? (D < l.value.length && E.push({
			type: "text",
			value: l.value.slice(D)
		}), f.children.splice(g, 1, ...E)) : E = [l], g + E.length;
	}
}
function Id(e) {
	let t = [];
	if (!Array.isArray(e)) throw new TypeError("Expected find and replace tuple or list of tuples");
	let r = !e[0] || Array.isArray(e[0]) ? e : [e], n = -1;
	for (; ++n < r.length;) {
		let a = r[n];
		t.push([qd(a[0]), Bd(a[1])]);
	}
	return t;
}
function qd(e) {
	return typeof e == "string" ? new RegExp(ve(e), "g") : e;
}
function Bd(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
function vi() {
	return {
		transforms: [Md],
		enter: {
			literalAutolink: _d,
			literalAutolinkEmail: yi,
			literalAutolinkHttp: yi,
			literalAutolinkWww: yi
		},
		exit: {
			literalAutolink: Rd,
			literalAutolinkEmail: Nd,
			literalAutolinkHttp: Pd,
			literalAutolinkWww: Od
		}
	};
}
function _d(e) {
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
function Pd(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function Od(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function Nd(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function Rd(e) {
	this.exit(e);
}
function Md(e) {
	Ci(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, zd], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, Ud]], { ignore: ["link", "linkReference"] });
}
function zd(e, t, r, n, a) {
	let u = "";
	if (!fo(a) || (/^w/i.test(t) && (r = t + r, t = "", u = "http://"), !Hd(r))) return !1;
	let i = Vd(r + n);
	if (!i[0]) return !1;
	let o = {
		type: "link",
		title: null,
		url: u + t + i[0],
		children: [{
			type: "text",
			value: t + i[0]
		}]
	};
	return i[1] ? [o, {
		type: "text",
		value: i[1]
	}] : o;
}
function Ud(e, t, r, n) {
	return !fo(n, !0) || /[-\d_]$/.test(r) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + r,
		children: [{
			type: "text",
			value: t + "@" + r
		}]
	};
}
function Hd(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function Vd(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let r = t[0], n = r.indexOf(")"), a = bi(e, "("), u = bi(e, ")");
	for (; n !== -1 && a > u;) e += r.slice(0, n + 1), r = r.slice(n + 1), n = r.indexOf(")"), u++;
	return [e, r];
}
function fo(e, t) {
	let r = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || Ie(r) || Dt(r)) && (!t || r !== 47);
}
function Wd() {
	this.buffer();
}
function Yd(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function jd() {
	this.buffer();
}
function $d(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function Kd(e) {
	let t = this.resume(), r = this.stack[this.stack.length - 1];
	r.type, r.identifier = fe(this.sliceSerialize(e)).toLowerCase(), r.label = t;
}
function Qd(e) {
	this.exit(e);
}
function Jd(e) {
	let t = this.resume(), r = this.stack[this.stack.length - 1];
	r.type, r.identifier = fe(this.sliceSerialize(e)).toLowerCase(), r.label = t;
}
function Xd(e) {
	this.exit(e);
}
function Zd() {
	return "[";
}
function eg(e, t, r, n) {
	let a = r.createTracker(n), u = a.move("[^"), i = r.enter("footnoteReference"), o = r.enter("reference");
	return u += a.move(r.safe(r.associationId(e), {
		after: "]",
		before: u
	})), o(), i(), u += a.move("]"), u;
}
function Ai() {
	return {
		enter: {
			gfmFootnoteCallString: Wd,
			gfmFootnoteCall: Yd,
			gfmFootnoteDefinitionLabelString: jd,
			gfmFootnoteDefinition: $d
		},
		exit: {
			gfmFootnoteCallString: Kd,
			gfmFootnoteCall: Qd,
			gfmFootnoteDefinitionLabelString: Jd,
			gfmFootnoteDefinition: Xd
		}
	};
}
function Ti() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: rg },
		exit: { strikethrough: ng }
	};
}
function rg(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function ng(e) {
	this.exit(e);
}
function ig(e, t, r, n) {
	let a = r.createTracker(n), u = r.enter("strikethrough"), i = a.move("~~");
	return i += r.containerPhrasing(e, {
		...a.current(),
		before: i,
		after: "~"
	}), i += a.move("~~"), u(), i;
}
function ag() {
	return "~";
}
function Li() {
	return {
		enter: {
			table: og,
			tableData: po,
			tableHeader: po,
			tableRow: lg
		},
		exit: {
			codeText: cg,
			table: sg,
			tableData: Si,
			tableHeader: Si,
			tableRow: Si
		}
	};
}
function og(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(r) {
			return r === "none" ? null : r;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function sg(e) {
	this.exit(e), this.data.inTable = void 0;
}
function lg(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function Si(e) {
	this.exit(e);
}
function po(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function cg(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, fg));
	let r = this.stack[this.stack.length - 1];
	r.type, r.value = t, this.exit(e);
}
function fg(e, t) {
	return t === "|" ? t : e;
}
function Ii() {
	return { exit: {
		taskListCheckValueChecked: ho,
		taskListCheckValueUnchecked: ho,
		paragraph: hg
	} };
}
function ho(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function hg(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let r = this.stack[this.stack.length - 1];
		r.type;
		let n = r.children[0];
		if (n && n.type === "text") {
			let a = t.children, u = -1, i;
			for (; ++u < a.length;) {
				let o = a[u];
				if (o.type === "paragraph") {
					i = o;
					break;
				}
			}
			i === r && (n.value = n.value.slice(1), n.value.length === 0 ? r.children.shift() : r.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, r.position.start = Object.assign({}, n.position.start)));
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
function mo() {
	let e = qi(), t = e.find((r) => r.enter.literalAutolink);
	return t.transforms = [], e;
}
function dg(e, t, r) {
	let n = this, a, u, i;
	return o;
	function o(p) {
		return M.lessThan, e.enter(se.htmlText), e.enter(se.htmlTextData), e.consume(p), s;
	}
	function s(p) {
		return p === M.exclamationMark ? (e.consume(p), l) : p === M.slash ? (e.consume(p), w) : p === M.questionMark ? (e.consume(p), C) : K(p) ? (e.consume(p), L) : r(p);
	}
	function l(p) {
		return p === M.dash ? (e.consume(p), c) : p === M.leftSquareBracket ? (e.consume(p), u = 0, D) : K(p) ? (e.consume(p), E) : r(p);
	}
	function c(p) {
		return p === M.dash ? (e.consume(p), m) : r(p);
	}
	function f(p) {
		return p === M.eof ? r(p) : p === M.dash ? (e.consume(p), h) : B(p) ? (i = f, N(p)) : (e.consume(p), f);
	}
	function h(p) {
		return p === M.dash ? (e.consume(p), m) : f(p);
	}
	function m(p) {
		return p === M.greaterThan ? z(p) : p === M.dash ? h(p) : f(p);
	}
	function D(p) {
		let Y = Bi.cdataOpeningString;
		return p === Y.charCodeAt(u++) ? (e.consume(p), u === Y.length ? x : D) : r(p);
	}
	function x(p) {
		return p === M.eof ? r(p) : p === M.rightSquareBracket ? (e.consume(p), g) : B(p) ? (i = x, N(p)) : (e.consume(p), x);
	}
	function g(p) {
		return p === M.rightSquareBracket ? (e.consume(p), k) : x(p);
	}
	function k(p) {
		return p === M.greaterThan ? z(p) : p === M.rightSquareBracket ? (e.consume(p), k) : x(p);
	}
	function E(p) {
		return p === M.eof || p === M.greaterThan ? z(p) : B(p) ? (i = E, N(p)) : (e.consume(p), E);
	}
	function C(p) {
		return p === M.eof ? r(p) : p === M.questionMark ? (e.consume(p), S) : B(p) ? (i = C, N(p)) : (e.consume(p), C);
	}
	function S(p) {
		return p === M.greaterThan ? z(p) : C(p);
	}
	function w(p) {
		return K(p) ? (e.consume(p), d) : r(p);
	}
	function d(p) {
		return p === M.dash || Q(p) ? (e.consume(p), d) : v(p);
	}
	function v(p) {
		return B(p) ? (i = v, N(p)) : H(p) ? (e.consume(p), v) : z(p);
	}
	function L(p) {
		return p === M.dash || Q(p) ? (e.consume(p), L) : p === M.slash || p === M.greaterThan || G(p) ? y(p) : r(p);
	}
	function y(p) {
		return p === M.slash ? (e.consume(p), z) : p === M.colon || p === M.underscore || K(p) ? (e.consume(p), b) : B(p) ? (i = y, N(p)) : H(p) ? (e.consume(p), y) : z(p);
	}
	function b(p) {
		return p === M.dash || p === M.dot || p === M.colon || p === M.underscore || Q(p) ? (e.consume(p), b) : _(p);
	}
	function _(p) {
		return p === M.equalsTo ? (e.consume(p), I) : B(p) ? (i = _, N(p)) : H(p) ? (e.consume(p), _) : y(p);
	}
	function I(p) {
		return p === M.eof || p === M.lessThan || p === M.equalsTo || p === M.greaterThan || p === M.graveAccent ? r(p) : p === M.quotationMark || p === M.apostrophe ? (e.consume(p), a = p, T) : B(p) ? (i = I, N(p)) : H(p) ? (e.consume(p), I) : (e.consume(p), R);
	}
	function T(p) {
		return p === a ? (e.consume(p), a = void 0, O) : p === M.eof ? r(p) : B(p) ? (i = T, N(p)) : (e.consume(p), T);
	}
	function R(p) {
		return p === M.eof || p === M.quotationMark || p === M.apostrophe || p === M.lessThan || p === M.equalsTo || p === M.graveAccent ? r(p) : p === M.slash || p === M.greaterThan || G(p) ? y(p) : (e.consume(p), R);
	}
	function O(p) {
		return p === M.slash || p === M.greaterThan || G(p) ? y(p) : r(p);
	}
	function z(p) {
		return p === M.greaterThan ? (e.consume(p), e.exit(se.htmlTextData), e.exit(se.htmlText), t) : r(p);
	}
	function N(p) {
		return e.exit(se.htmlTextData), e.enter(se.lineEnding), e.consume(p), e.exit(se.lineEnding), W;
	}
	function W(p) {
		return n.parser.constructs.disable.null, ne(p);
	}
	function ne(p) {
		return e.enter(se.htmlTextData), i(p);
	}
}
function Do() {
	return { text: { [M.lessThan]: Dg } };
}
function go() {
	return {
		canContainEols: [or],
		enter: { [or]: e },
		exit: { [or]: t }
	};
	function e(r) {
		this.enter({ type: or }, r), this.buffer();
	}
	function t(r) {
		this.resume();
		let n = J(0, this.stack, -1);
		n.value = this.sliceSerialize(r), this.exit(r);
	}
}
function xo() {
	return { text: { [M.leftCurlyBrace]: {
		name: "liquid",
		tokenize: e
	} } };
	function e(t, r, n) {
		let a;
		return u;
		function u(s) {
			return t.enter("liquidNode"), t.enter(se.data), t.consume(s), function(l) {
				switch (l) {
					case M.percentSign:
					case M.leftCurlyBrace: return a = l === M.percentSign ? M.percentSign : M.rightCurlyBrace, t.consume(l), i;
					default: return n(l);
				}
			};
		}
		function i(s) {
			switch (s) {
				case a: return t.consume(s), o;
				case M.eof: return n(s);
				default: return B(s) ? (t.exit(se.data), t.enter(se.lineEnding), t.consume(s), t.exit(se.lineEnding), t.enter(se.data), i) : (t.consume(s), i);
			}
		}
		function o(s) {
			return s === M.rightCurlyBrace ? (t.consume(s), t.exit(se.data), t.exit(or), r) : i;
		}
	}
}
function xg() {
	return gg ?? (gg = {
		extensions: [
			no(),
			Fi(),
			Yn({ aliasDivider: { charCodeAt: () => NaN } }),
			xo(),
			Do()
		],
		mdastExtensions: [
			mo(),
			pi(),
			Gn(),
			go()
		]
	});
}
function _i(e) {
	let { frontMatter: t, content: r } = Ve(e), n = fi(r, xg());
	if (t) {
		let [a, u] = [t.start, t.end].map(({ line: i, column: o, index: s }) => ({
			line: i,
			column: o + 1,
			offset: s
		}));
		n.children.unshift({
			...t,
			type: "frontMatter",
			position: {
				start: a,
				end: u
			}
		});
	}
	return n;
}
function Lp(e, t, r) {
	if (!e.has(t)) {
		let n = r(t);
		e.set(t, n);
	}
	return e.get(t);
}
function Ib(e) {
	if (typeof e == "string") return De;
	if (Array.isArray(e)) return de;
	if (!e) return;
	let { type: t } = e;
	if (An.has(t)) return t;
}
function Bb(e) {
	let t = e === null ? "null" : typeof e;
	if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
	if (me(e)) throw new Error("doc is valid.");
	let r = Object.prototype.toString.call(e);
	if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
	let n = qb([...An].map((a) => `'${a}'`));
	return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
function _b(e, t, r, n) {
	let a = [e];
	for (; a.length > 0;) {
		let u = a.pop();
		if (u === Ip) {
			r(a.pop());
			continue;
		}
		r && a.push(u, Ip);
		let i = me(u);
		if (!i) throw new wt(u);
		if (t?.(u) !== !1) switch (i) {
			case de:
			case Fe: {
				let o = i === de ? u : u.parts;
				for (let l = o.length - 1; l >= 0; --l) a.push(o[l]);
				break;
			}
			case be:
				a.push(u.flatContents, u.breakContents);
				break;
			case ke:
				if (n && u.expandedStates) for (let o = u.expandedStates.length, s = o - 1; s >= 0; --s) a.push(u.expandedStates[s]);
				else a.push(u.contents);
				break;
			case Te:
			case Ae:
			case $e:
			case Je:
			case Ke:
				a.push(u.contents);
				break;
			case De:
			case st:
			case je:
			case Qe:
			case ge:
			case Se: break;
			default: throw new wt(u);
		}
	}
}
function Pb(e, t) {
	if (typeof e == "string") return t(e);
	let r = /* @__PURE__ */ new Map();
	return n(e);
	function n(u) {
		return Lp(r, u, a);
	}
	function a(u) {
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
				let { expandedStates: i, contents: o } = u;
				return i ? (i = i.map(n), o = i[0]) : o = n(o), t({
					...u,
					contents: o,
					expandedStates: i
				});
			}
			case Te:
			case Ae:
			case $e:
			case Je:
			case Ke: return t({
				...u,
				contents: n(u.contents)
			});
			case De:
			case st:
			case je:
			case Qe:
			case ge:
			case Se: return t(u);
			default: throw new wt(u);
		}
	}
}
function Bp(e) {
	if (e.length > 0) {
		let t = J(0, e, -1);
		!t.expandedStates && !t.break && (t.break = "propagated");
	}
	return null;
}
function _p(e) {
	let t = /* @__PURE__ */ new Set(), r = [];
	function n(u) {
		if (u.type === Se && Bp(r), u.type === ke) {
			if (r.push(u), t.has(u)) return !1;
			t.add(u);
		}
	}
	function a(u) {
		u.type === ke && r.pop().break && Bp(r);
	}
	qp(e, n, a, !0);
}
function Xe(e, t = wr) {
	return Pb(e, (r) => typeof r == "string" ? Tn(t, r.split(`
`)) : r);
}
function Cr(e) {
	return Le(e), {
		type: Ae,
		contents: e
	};
}
function we(e, t) {
	return Op(e), Le(t), {
		type: Te,
		contents: t,
		n: e
	};
}
function yr(e) {
	return we({ type: "root" }, e);
}
function Yt(e) {
	return Pp(e), {
		type: Fe,
		parts: e
	};
}
function jt(e, t = {}) {
	return Le(e), Sn(t.expandedStates, !0), {
		type: ke,
		id: t.id,
		contents: e,
		break: !!t.shouldBreak,
		expandedStates: t.expandedStates
	};
}
function Np(e, t = "", r = {}) {
	return Le(e), t !== "" && Le(t), {
		type: be,
		breakContents: e,
		flatContents: t,
		groupId: r.groupId
	};
}
function Tn(e, t) {
	Le(e), Sn(t);
	let r = [];
	for (let n = 0; n < t.length; n++) n !== 0 && r.push(e), r.push(t[n]);
	return r;
}
function Rp(e) {
	return e === Nb ? Mb : e === Rb ? zb : Hb;
}
function Wb(e) {
	let t = e[0], r = e[1];
	for (let n = 0; n < e.length; n += 2) {
		let a = e[n], u = e[n + 1];
		if (Wp >= a && Wp <= u) return [a, u];
		u - a > r - t && (t = a, r = u);
	}
	return [t, r];
}
function $b(e) {
	if (!e) return 0;
	if (!jb.test(e)) return e.length;
	let t = 0;
	e = e.replace(Mp(), (r) => (t += Yp(r) ? 1 : 2, ""));
	for (let r of e) {
		let n = r.codePointAt(0);
		n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || n >= 65024 && n <= 65039 || (t += Wa(n) || Ya(n) ? 2 : 1);
	}
	return t;
}
function jp(e, t, r) {
	let n = t.type === 1 ? e.queue.slice(0, -1) : [...e.queue, t], a = "", u = 0, i = 0, o = 0;
	for (let D of n) switch (D.type) {
		case 0:
			c(), r.useTabs ? s(1) : l(r.tabWidth);
			break;
		case 3: {
			let { string: x } = D;
			c(), a += x, u += x.length;
			break;
		}
		case 2: {
			let { width: x } = D;
			i += 1, o += x;
			break;
		}
		default: throw new Error(`Unexpected indent comment '${D.type}'.`);
	}
	return h(), {
		...e,
		value: a,
		length: u,
		queue: n
	};
	function s(D) {
		a += "	".repeat(D), u += r.tabWidth * D;
	}
	function l(D) {
		a += " ".repeat(D), u += D;
	}
	function c() {
		r.useTabs ? f() : h();
	}
	function f() {
		i > 0 && s(i), m();
	}
	function h() {
		o > 0 && l(o), m();
	}
	function m() {
		i = 0, o = 0;
	}
}
function $p(e, t, r) {
	if (!t) return e;
	if (t.type === "root") return {
		...e,
		root: e
	};
	if (t === Number.NEGATIVE_INFINITY) return e.root;
	let n;
	return typeof t == "number" ? t < 0 ? n = Qb : n = {
		type: 2,
		width: t
	} : n = {
		type: 3,
		string: t
	}, jp(e, n, r);
}
function Kp(e, t) {
	return jp(e, Kb, t);
}
function Jb(e) {
	let t = 0;
	for (let r = e.length - 1; r >= 0; r--) {
		let n = e[r];
		if (n === " " || n === "	") t++;
		else break;
	}
	return t;
}
function qn(e) {
	let t = Jb(e);
	return {
		text: t === 0 ? e : e.slice(0, e.length - t),
		count: t
	};
}
function Bn(e, t, r, n, a, u) {
	if (r === Number.POSITIVE_INFINITY) return !0;
	let i = t.length, o = !1, s = [e], l = "";
	for (; r >= 0;) {
		if (s.length === 0) {
			if (i === 0) return !0;
			s.push(t[--i]);
			continue;
		}
		let { mode: c, doc: f } = s.pop(), h = me(f);
		switch (h) {
			case De:
				f && (o && (l += " ", r -= 1, o = !1), l += f, r -= Ar(f));
				break;
			case de:
			case Fe: {
				let m = h === de ? f : f.parts, D = f[Ka] ?? 0;
				for (let x = m.length - 1; x >= D; x--) s.push({
					mode: c,
					doc: m[x]
				});
				break;
			}
			case Ae:
			case Te:
			case $e:
			case Je:
				s.push({
					mode: c,
					doc: f.contents
				});
				break;
			case je: {
				let { text: m, count: D } = qn(l);
				l = m, r += D;
				break;
			}
			case ke: {
				if (u && f.break) return !1;
				let m = f.break ? Ce : c, D = f.expandedStates && m === Ce ? J(0, f.expandedStates, -1) : f.contents;
				s.push({
					mode: m,
					doc: D
				});
				break;
			}
			case be: {
				let D = (f.groupId ? a[f.groupId] || Ne : c) === Ce ? f.breakContents : f.flatContents;
				D && s.push({
					mode: c,
					doc: D
				});
				break;
			}
			case ge:
				if (c === Ce || f.hard) return !0;
				f.soft || (o = !0);
				break;
			case Ke:
				n = !0;
				break;
			case Qe:
				if (n) return !1;
				break;
		}
	}
	return !1;
}
function Jp(e, t) {
	let r = Object.create(null), n = t.printWidth, a = Rp(t.endOfLine), u = 0, i = [{
		indent: ja,
		mode: Ce,
		doc: e
	}], o = !1, s = [], l = new Qp();
	for (_p(e); i.length > 0;) {
		let { indent: D, mode: x, doc: g } = i.pop();
		switch (me(g)) {
			case De: {
				let k = a !== `
` ? X(0, g, `
`, a) : g;
				k && (l.write(k), i.length > 0 && (u += Ar(k)));
				break;
			}
			case de:
				for (let k = g.length - 1; k >= 0; k--) i.push({
					indent: D,
					mode: x,
					doc: g[k]
				});
				break;
			case st:
				l.markPosition();
				break;
			case Ae:
				i.push({
					indent: Kp(D, t),
					mode: x,
					doc: g.contents
				});
				break;
			case Te:
				i.push({
					indent: $p(D, g.n, t),
					mode: x,
					doc: g.contents
				});
				break;
			case je:
				u -= l.trim();
				break;
			case ke: {
				let k = (function() {
					if (x === Ne && !o) return {
						indent: D,
						mode: g.break ? Ce : Ne,
						doc: g.contents
					};
					o = !1;
					let C = n - u, S = s.length > 0, w = {
						indent: D,
						mode: Ne,
						doc: g.contents
					};
					if (!g.break && Bn(w, i, C, S, r)) return w;
					if (!g.expandedStates) return {
						indent: D,
						mode: Ce,
						doc: g.contents
					};
					if (!g.break) for (let d = 1; d < g.expandedStates.length - 1; d++) {
						let v = {
							indent: D,
							mode: Ne,
							doc: g.expandedStates[d]
						};
						if (Bn(v, i, C, S, r)) return v;
					}
					return {
						indent: D,
						mode: Ce,
						doc: J(0, g.expandedStates, -1)
					};
				})();
				i.push(k), g.id && (r[g.id] = k.mode);
				break;
			}
			case Fe: {
				let k = n - u, E = g[Ka] ?? 0, { parts: C } = g, S = C.length - E;
				if (S === 0) break;
				let w = C[E + 0], d = C[E + 1], v = {
					indent: D,
					mode: Ne,
					doc: w
				}, L = {
					indent: D,
					mode: Ce,
					doc: w
				}, y = Bn(v, [], k, s.length > 0, r, !0);
				if (S === 1) {
					y ? i.push(v) : i.push(L);
					break;
				}
				let b = {
					indent: D,
					mode: Ne,
					doc: d
				}, _ = {
					indent: D,
					mode: Ce,
					doc: d
				};
				if (S === 2) {
					y ? i.push(b, v) : i.push(_, L);
					break;
				}
				let I = C[E + 2], T = {
					indent: D,
					mode: x,
					doc: {
						...g,
						[Ka]: E + 2
					}
				}, O = Bn({
					indent: D,
					mode: Ne,
					doc: [
						w,
						d,
						I
					]
				}, [], k, s.length > 0, r, !0);
				i.push(T), O ? i.push(b, v) : y ? i.push(_, v) : i.push(_, L);
				break;
			}
			case be:
			case $e: {
				let k = g.groupId ? r[g.groupId] : x;
				if (k === Ce) {
					let E = g.type === be ? g.breakContents : g.negate ? g.contents : Cr(g.contents);
					E && i.push({
						indent: D,
						mode: x,
						doc: E
					});
				}
				if (k === Ne) {
					let E = g.type === be ? g.flatContents : g.negate ? Cr(g.contents) : g.contents;
					E && i.push({
						indent: D,
						mode: x,
						doc: E
					});
				}
				break;
			}
			case Ke:
				s.push({
					indent: D,
					mode: x,
					doc: g.contents
				});
				break;
			case Qe:
				s.length > 0 && i.push({
					indent: D,
					mode: x,
					doc: vr
				});
				break;
			case ge:
				switch (x) {
					case Ne:
						if (!g.hard) {
							g.soft || (l.write(" "), u += 1);
							break;
						}
						o = !0;
					case Ce:
						if (s.length > 0) {
							i.push({
								indent: D,
								mode: x,
								doc: g
							}, ...s.reverse()), s.length = 0;
							break;
						}
						g.literal ? (l.write(a), u = 0, D.root && (D.root.value && l.write(D.root.value), u = D.root.length)) : (l.trim(), l.write(a + D.value), u = D.length);
						break;
				}
				break;
			case Je:
				i.push({
					indent: D,
					mode: x,
					doc: g.contents
				});
				break;
			case Se: break;
			default: throw new wt(g);
		}
		i.length === 0 && s.length > 0 && (i.push(...s.reverse()), s.length = 0);
	}
	let { text: c, positions: f } = l.finish();
	if (f.length !== 2) return { formatted: c };
	let [h, m] = f;
	return {
		formatted: c,
		cursorNodeStart: h,
		cursorNodeText: c.slice(h, m)
	};
}
function eE() {
	let e = globalThis, t = e.process?.platform;
	if (typeof t == "string") return t.startsWith("win");
	let r = e.Deno?.build?.os;
	return typeof r == "string" ? r === "windows" : e.navigator?.platform?.startsWith("Win") ?? !1;
}
function Zp(e) {
	if (e = e instanceof URL ? e : new URL(e), e.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);
	return e;
}
function rE(e) {
	return e = Zp(e), decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function nE(e) {
	e = Zp(e);
	let t = decodeURIComponent(e.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
	return e.hostname !== "" && (t = `\\\\${e.hostname}${t}`), t;
}
function Qa(e) {
	return tE ? nE(e) : rE(e);
}
function rh(e, t) {
	if (!t) return;
	let r = eh(t).toLowerCase();
	return e.find(({ filenames: n }) => n?.some((a) => a.toLowerCase() === r)) ?? e.find(({ extensions: n }) => n?.some((a) => r.endsWith(a)));
}
function iE(e, t) {
	if (t) return e.find(({ name: r }) => r.toLowerCase() === t) ?? e.find(({ aliases: r }) => r?.includes(t)) ?? e.find(({ extensions: r }) => r?.includes(`.${t}`));
}
function nh(e, t) {
	if (t) {
		if (th(t)) try {
			t = Qa(t);
		} catch {
			return;
		}
		if (typeof t == "string") return e.find(({ isSupported: r }) => r?.({ filepath: t }));
	}
}
function uE(e, t) {
	let r = Xp(0, e.plugins).flatMap((a) => a.languages ?? []);
	return (iE(r, t.language) ?? rh(r, t.physicalFile) ?? rh(r, t.file) ?? nh(r, t.physicalFile) ?? nh(r, t.file) ?? aE?.(r, t.physicalFile))?.parsers[0];
}
function oE(e) {
	return !!e?.[Qr];
}
function Sr(e) {
	let t = [], r = e.split(/([\t\n ]+)/);
	for (let [a, u] of r.entries()) {
		if (a % 2 === 1) {
			t.push({
				type: "whitespace",
				value: /\n/.test(u) ? `
` : " "
			});
			continue;
		}
		if ((a === 0 || a === r.length - 1) && u === "") continue;
		let i = u.split(new RegExp(`(${ah.source})`, "u"));
		for (let [o, s] of i.entries()) if (!((o === 0 || o === i.length - 1) && s === "")) {
			if (o % 2 === 0) {
				s !== "" && n({
					type: "word",
					value: s,
					kind: $t,
					isCJ: !1,
					hasLeadingPunctuation: Ze.test(s[0]),
					hasTrailingPunctuation: Ze.test(J(0, s, -1))
				});
				continue;
			}
			if (Ze.test(s)) {
				n({
					type: "word",
					value: s,
					kind: Tr,
					isCJ: !0,
					hasLeadingPunctuation: !0,
					hasTrailingPunctuation: !0
				});
				continue;
			}
			if (lE.test(s)) {
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
				kind: Re,
				isCJ: !0,
				hasLeadingPunctuation: !1,
				hasTrailingPunctuation: !1
			});
		}
	}
	return t;
	function n(a) {
		let u = J(0, t, -1);
		u?.type === "word" && !i($t, Tr) && [u.value, a.value].every((o) => !/\u3000/.test(o)) && t.push({
			type: "whitespace",
			value: ""
		}), t.push(a);
		function i(o, s) {
			return u.kind === o && a.kind === s || u.kind === s && a.kind === o;
		}
	}
}
function lt(e, t) {
	let r = t.originalText.slice(e.position.start.offset, e.position.end.offset);
	if (t.parser !== "mdx") {
		let u = e.children[0];
		u && (r = t.originalText.slice(e.position.start.offset, u.position.start.offset));
	}
	let { numberText: n, leadingSpaces: a } = r.match(/^\s*(?<numberText>\d+)(\.|\))(?<leadingSpaces>\s*)/).groups;
	return {
		number: Number(n),
		leadingSpaces: a
	};
}
function eu(e, t) {
	return !e.ordered || e.children.length < 2 || lt(e.children[1], t).number !== 1 ? !1 : lt(e.children[0], t).number !== 0 ? !0 : e.children.length > 2 && lt(e.children[2], t).number === 1;
}
function Pn(e, t) {
	let { value: r } = e;
	return e.position.end.offset === t.length && r.endsWith(`
`) && t.endsWith(`
`) ? r.slice(0, -1) : r;
}
function Ee(e, t) {
	return (function r(n, a, u) {
		let i = { ...t(n, a, u) };
		return i.children && (i.children = i.children.map((o, s) => r(o, s, [i, ...u]))), i;
	})(e, null, []);
}
function On(e) {
	if (e?.type !== "link" || e.children.length !== 1) return !1;
	let [t] = e.children;
	return pt(e) === pt(t) && ht(e) === ht(t);
}
function Lr(e) {
	let t;
	if (e.type === "html") t = e.value.match(/^<!--\s*prettier-ignore(?:-(start|end))?\s*-->$/);
	else {
		let r;
		e.type === "esComment" ? r = e : e.type === "paragraph" && e.children.length === 1 && e.children[0].type === "esComment" && (r = e.children[0]), r && (t = r.value.match(/^prettier-ignore(?:-(start|end))?$/));
	}
	return t ? t[1] || "next" : !1;
}
function Ir(e, t) {
	return r(e, t, (n) => n.ordered === e.ordered);
	function r(n, a, u) {
		let i = -1;
		for (let o of a.children) if (o.type === n.type && u(o) ? i++ : i = -1, o === n) return i;
	}
}
function uh(e) {
	return e.index > 0 && Lr(e.previous) === "next";
}
function Kt(e) {
	let { start: t, end: r } = e.position;
	return t.line !== r.line;
}
function cE() {
	return (e) => Ee(e, (t, r, [n]) => t.type !== "html" || yp.test(t.value) || _n.has(n.type) ? t : {
		...t,
		type: "jsx"
	});
}
function tu(e) {
	let t = (0, hh.default)().use(ph.default, {
		commonmark: !0,
		blocks: [Cp]
	}).use(ch.default).use(ih).use(fh.default).use(Sp).use(sh).use(oh).use(lh);
	return t.run(t.parse(e));
}
function kh(e) {
	return {
		astFormat: "mdast",
		hasPragma: Nn,
		hasIgnorePragma: gh,
		locStart: pt,
		locEnd: ht,
		parse: e
	};
}
function DE(e, t) {
	let r = e.matchAll(new RegExp(`(?:${ve(t)})+`, "g"));
	return r.reduce || (r = [...r]), r.reduce((n, [a]) => Math.max(n, a.length), 0) / t.length;
}
function dE(e, t) {
	let { node: r } = e;
	switch (r.type) {
		case "code": {
			let { lang: n } = r;
			if (!n) return;
			let a;
			return n === "angular-ts" ? a = Ja(t, { language: "typescript" }) : n === "angular-html" ? a = "angular" : a = Ja(t, { language: n }), a ? async (u) => {
				let i = { parser: a };
				n === "ts" || n === "typescript" ? i.filepath = "dummy.ts" : n === "tsx" && (i.filepath = "dummy.tsx");
				let o = await u(t.parser === "mdx" ? Pn(r, t.originalText) : r.value, i), s = t.__inJsTemplate ? "~" : "`", l = s.repeat(Math.max(3, Rn(r.value, s) + 1));
				return yr([
					l,
					r.lang,
					r.meta ? " " + r.meta : "",
					Z,
					Xe(o),
					Z,
					l
				]);
			} : void 0;
		}
		case "import":
		case "export": return (n) => n(r.value, {
			__onHtmlBindingRoot: (a) => gE(a, r.type),
			parser: "babel"
		});
		case "jsx": return (n) => n(`<$>${r.value}</$>`, {
			parser: "__js_expression",
			rootMarker: "mdx"
		});
	}
	return null;
}
function gE(e, t) {
	let { program: { body: r } } = e;
	if (r.some((n) => !(n.type === "ImportDeclaration" || n.type === "ExportDefaultDeclaration" || n.type === "ExportNamedDeclaration"))) throw new Error(`Unexpected '${t}' in MDX.`);
}
function iu(e, t, r) {
	if ((e.type === "code" || e.type === "yaml" || e.type === "import" || e.type === "export" || e.type === "jsx") && delete t.value, e.type === "list" && delete t.isAligned, (e.type === "list" || e.type === "listItem") && delete t.spread, e.type === "text") return null;
	if (e.type === "inlineCode" && (t.value = X(0, e.value, `
`, " ")), (e.type === "definition" || e.type === "linkReference" || e.type === "imageReference") && (t.label = (0, nu.default)(e.label)), e.type === "imageReference" && e.referenceType === "collapsed" && (t.alt = (0, nu.default)(e.alt)), (e.type === "link" || e.type === "image") && e.url && e.url.includes("(")) for (let n of "<>") t.url = X(0, e.url, n, encodeURIComponent(n));
	if ((e.type === "definition" || e.type === "link" || e.type === "image") && e.title && (t.title = X(0, e.title, /\\(?=["')])/g, "")), r?.type === "root" && r.children.length > 0 && (r.children[0] === e || Xa(r.children[0]) && r.children[1] === e) && e.type === "html" && Nn(e.value)) return null;
}
function au(e, t) {
	let r = t.originalText.slice(e.node.position.start.offset, e.node.position.end.offset);
	return t.parser === "mdx" ? r : e.node.type === "list" && e.findAncestor((n) => n.type === "blockquote") && t.proseWrap !== "always" ? r.replace(/\n>\s*$/, "") : r;
}
function kE(e, t) {
	let r = e.match(new RegExp(`(${ve(t)})+`, "g"));
	if (r === null) return 1;
	let n = /* @__PURE__ */ new Map(), a = 0;
	for (let u of r) {
		let i = u.length / t.length;
		n.set(i, !0), i > a && (a = i);
	}
	for (let u = 1; u < a; u++) if (!n.get(u)) return u;
	return a + 1;
}
function Ch(e, t) {
	let { preferred: r, alternate: n } = t === !0 || t === "'" ? FE : bE, { length: a } = e, u = 0, i = 0;
	for (let o = 0; o < a; o++) {
		let s = e.charCodeAt(o);
		s === r.codePoint ? u++ : s === n.codePoint && i++;
	}
	return (u > i ? n : r).character;
}
function ae(e, t, r, n = {}) {
	let { processor: a = r } = n, u = [];
	return e.each(() => {
		let i = a(e);
		i !== !1 && (u.length > 0 && EE(e) && (u.push(Z), CE(e, t) && u.push(Z)), u.push(i));
	}, "children"), u;
}
function EE({ node: e, parent: t }) {
	let r = Za.has(e.type), n = e.type === "html" && _n.has(t.type);
	return !r && !n;
}
function CE(e, t) {
	let { node: r, previous: n, parent: a } = e;
	if (t.parser === "mdx") {
		if (vh(n, t) || r.type === "list" && a.type === "listItem" && (n.type === "code" || n.type === "paragraph") && n.position.end.line + 1 < r.position.start.line) return !0;
	} else {
		if (Kt(r) && r.position.start.line < n.position.end.line) return !1;
		if (yE(e) || r.type === "list" && a.type === "listItem" && (n.type === "code" || n.type === "paragraph") && n.position.end.line + 1 < r.position.start.line) return !0;
	}
	let i = n.type === r.type && wE.has(r.type), o;
	t.parser === "mdx" ? o = a.type === "listItem" && (r.type === "list" || !vh(a, t)) : o = a.type === "listItem" && (r.type === "list" || !e.callParent(Ah));
	let s = Lr(n) === "next", l = r.type === "html" && n.type === "html" && n.position.end.line + 1 === r.position.start.line, c = t.parser !== "mdx" && r.type === "html" && n.type === "paragraph" && n.position.end.line + 1 === r.position.start.line, f = r.type === "html" && a.type === "listItem" && n.type === "paragraph" && n.position.end.line + 1 === r.position.start.line;
	return !(i || o || s || l || c || f);
}
function vh(e, t) {
	return e.type === "listItem" && (e.spread || t.originalText.charAt(e.position.end.offset - 1) === `
`);
}
function Ah({ node: e, parent: t, next: r }) {
	return e.type === "listItem" && (e.spread || t.type === "list" && r?.type === "listItem" && e.position.end.line + 1 < r.position.start.line);
}
function yE(e) {
	return e.index === 0 ? !1 : Ah({
		node: e.previous,
		parent: e.parent,
		next: e.node
	});
}
function vE(e, t, r) {
	return ["#".repeat(e.node.depth) + " ", ae(e, t, r)];
}
function AE(e, t, r) {
	let { originalText: n } = t, { node: a } = e, u = a.position.end.offset, i = n.lastIndexOf(`
`, u - 1) + 1, o = n.slice(i, u), s = Math.max(o.indexOf("="), o.indexOf("-")), l = o.slice(s);
	return [
		ae(e, t, r),
		Z,
		l
	];
}
function Th(e, t, r) {
	return t.parser !== "mdx" && Kt(e.node) ? AE(e, t, r) : vE(e, t, r);
}
function Ih(e, t, r) {
	let { node: n } = e, a = Ir(n, e.parent), u = eu(n, t), i = SE(e);
	return ae(e, t, r, { processor() {
		let o = l(), { node: s } = e;
		if (s.children.length === 2 && s.children[1].type === "html" && s.children[0].position.start.column !== s.children[1].position.start.column) return [o, Sh(e, t, r, o)];
		return [o, we(" ".repeat(o.length), Sh(e, t, r, o))];
		function l() {
			let c = n.ordered ? (e.isFirst ? n.start : u ? 1 : Math.min(n.start + e.index, TE)) + (a % 2 === 0 ? ". " : ") ") : a % 2 === 0 ? "- " : "* ", f = n.isAligned && n.ordered ? Bh(c, t) : c;
			if (f.length >= i) return f;
			f = f.trimEnd();
			let h = Math.min(i - f.length, 4);
			h > 0 && (f += " ".repeat(h));
			let m = Math.min(i - f.length, 3);
			return m > 0 && (f = " ".repeat(m) + f), f;
		}
	} });
}
function Sh(e, t, r, n) {
	let { node: a } = e, u = a.checked === null ? "" : a.checked ? "[x] " : "[ ] ";
	return [u, ae(e, t, r, { processor({ node: i, isFirst: o }) {
		if (o && i.type !== "list" || i.type === "code" && i.isIndented) return we(" ".repeat(u.length), r());
		let s = " ".repeat(_h(t.tabWidth - n.length, 0, 3));
		return [s, we(s, r())];
	} })];
}
function SE(e) {
	let { node: t, next: r } = e;
	return t.checked === null || !(r?.type === "code" && r.isIndented) ? 0 : 4 + [.../^[ \t]*/.exec(r.value)?.[0] ?? ""].reduce((a, u) => a + (u === "	" ? 4 : 1), 0) + 1;
}
function qh(e, t, r) {
	let { node: n } = e, a = Ir(n, e.parent), u = eu(n, t);
	return ae(e, t, r, { processor() {
		let i = s(), { node: o } = e;
		if (o.children.length === 2 && o.children[1].type === "html" && o.children[0].position.start.column !== o.children[1].position.start.column) return [i, Lh(e, t, r, i)];
		return [i, we(" ".repeat(i.length), Lh(e, t, r, i))];
		function s() {
			let l = n.ordered ? (e.isFirst ? n.start : u ? 1 : n.start + e.index) + (a % 2 === 0 ? ". " : ") ") : a % 2 === 0 ? "- " : "* ";
			return (n.isAligned || n.hasIndentedCodeblock) && n.ordered ? Bh(l, t) : l;
		}
	} });
}
function Lh(e, t, r, n) {
	let { node: a } = e, u = a.checked === null ? "" : a.checked ? "[x] " : "[ ] ";
	return [u, ae(e, t, r, { processor({ node: i, isFirst: o }) {
		if (o && i.type !== "list") return we(" ".repeat(u.length), r());
		let s = " ".repeat(_h(t.tabWidth - n.length, 0, 3));
		return [s, we(s, r())];
	} })];
}
function Bh(e, t) {
	let r = n();
	return e + " ".repeat(r >= 4 ? 0 : r);
	function n() {
		let a = e.length % t.tabWidth;
		return a === 0 ? 0 : t.tabWidth - a;
	}
}
function _h(e, t, r) {
	return Math.max(t, Math.min(e, r));
}
function Ph(e, t, r) {
	return LE(e.map(r, "children"));
}
function LE(e) {
	let t = [""];
	return (function r(n) {
		for (let a of n) {
			let u = me(a);
			if (u === de) {
				r(a);
				continue;
			}
			let i = a, o = [];
			u === Fe && ([i, ...o] = a.parts), t.push([t.pop(), i], ...o);
		}
	})(e), Yt(t);
}
function Oh(e, t) {
	let r = [""];
	return e.each(() => {
		let { node: n } = e, a = t();
		switch (n.type) {
			case "whitespace": if (me(a) !== De) {
				r.push(a, "");
				break;
			}
			default: r.push([r.pop(), a]);
		}
	}, "children"), Yt(r);
}
function Nh(e, t, r) {
	let { node: n } = e, a = [], u = e.map(() => e.map(({ index: f }) => {
		let h = Jp(r(), t).formatted, m = Ar(h);
		return a[f] = Math.max(a[f] ?? 3, m), {
			text: h,
			width: m
		};
	}, "children"), "children"), i = s(!1);
	if (t.proseWrap !== "never") return [Wt, i];
	return [Wt, jt(Np(s(!0), i))];
	function s(f) {
		return Tn(vr, [
			c(u[0], f),
			l(f),
			...u.slice(1).map((h) => c(h, f))
		].map((h) => `| ${h.join(" | ")} |`));
	}
	function l(f) {
		return a.map((h, m) => {
			if (t.parser !== "mdx" && m >= u[0].length) return null;
			let D = n.align[m], x = D === "center" || D === "left" ? ":" : "-", g = D === "center" || D === "right" ? ":" : "-";
			return `${x}${f ? "-" : "-".repeat(h - 2)}${g}`;
		}).filter((h) => h !== null);
	}
	function c(f, h) {
		return f.map(({ text: m, width: D }, x) => {
			if (h) return m;
			let g = a[x] - D, k = n.align[x], E = 0;
			k === "right" ? E = g : k === "center" && (E = Math.floor(g / 2));
			let C = g - E;
			return `${" ".repeat(E)}${m}${" ".repeat(C)}`;
		});
	}
}
function qE({ parent: e }) {
	if (e.usesCJSpaces === void 0) {
		let t = {
			" ": 0,
			"": 0
		}, { children: r } = e;
		for (let n = 1; n < r.length - 1; ++n) {
			let a = r[n];
			if (a.type === "whitespace" && (a.value === " " || a.value === "")) {
				let u = r[n - 1].kind, i = r[n + 1].kind;
				(u === Re && i === $t || u === $t && i === Re) && ++t[a.value];
			}
		}
		e.usesCJSpaces = t[" "] > t[""];
	}
	return e.usesCJSpaces;
}
function BE(e, t) {
	if (t) return !0;
	let { previous: r, next: n } = e;
	if (!r || !n) return !0;
	let a = r.kind, u = n.kind;
	return Mh(a) && Mh(u) || a === Ct && u === Re || u === Ct && a === Re ? !0 : a === Tr || u === Tr || a === Re && u === Re ? !1 : Rh.has(n.value[0]) || Rh.has(J(0, r.value, -1)) ? !0 : r.hasTrailingPunctuation || n.hasLeadingPunctuation ? !1 : qE(e);
}
function Mh(e) {
	return e === $t || e === Ct;
}
function _E(e, t, r, n, a) {
	if (r !== "always" || e.hasAncestor((o) => IE.has(o.type) || o.type === "heading" && (a.parser === "mdx" || !Kt(o)))) return !1;
	if (n) return t !== "";
	let { previous: u, next: i } = e;
	return !u || !i ? !0 : t === "" ? !1 : u.kind === Ct && i.kind === Re || i.kind === Ct && u.kind === Re ? !0 : !(u.isCJ || i.isCJ);
}
function ou(e, t, r, n, a) {
	if (r === "preserve" && t === `
`) return Z;
	let u = t === " " || t === `
` && BE(e, n);
	return _E(e, t, r, n, a) ? u ? Ln : In : u ? " " : "";
}
function zh(e, t) {
	let { node: r } = e, n = e.findAncestor((u) => u.type === "emphasis" || u.type === "strong"), a = r.value;
	return n ? (e.isFirst && (a.startsWith("*") || a.startsWith("_")) && e.callParent(() => e.isFirst) && e.grandparent === n && (a = `\\${a}`), a = X(0, a, /(\\+|^|.)(\*+|_+)($|.)/g, (u, i, o, s) => [...i].every((l) => l === "\\") && i.length % 2 === 1 ? u : OE(J(0, i, -1) || J(1, e.previous?.value, -1), o, s[0] || e.next?.value[0]) ? `${i}\\${o}${s}` : u), a) : t.proseWrap === "preserve" && e.parent.type === "sentence" && PE.test(a) && Qt(e.previous) && (e.isLast || Qt(e.next)) ? `\\${a}` : a;
}
function OE(e, t, r) {
	if (!e || !r) return null;
	let n = /[\p{Space_Separator}\t\n\f\r]/u.test(r), a = /[\p{Space_Separator}\t\n\f\r]/u.test(e), u = Ze.test(r), i = Ze.test(e), o = !n && (!u || u && (a || i)), s = !a && (!i || i && (n || u));
	return t[0] === "*" ? o || s : o ? !s || i : s ? !o || u : !1;
}
function Uh(e) {
	let { node: t } = e, r = X(0, X(0, t.value, "*", "\\*"), new RegExp([`(^|${Ze.source})(_+)`, `(_+)(${Ze.source}|$)`].join("|"), "gu"), (u, i, o, s, l) => X(0, o ? `${i}${o}` : `${s}${l}`, "_", "\\_")), n = (u, i, o) => u.type === "sentence" && o === 0, a = (u, i, o) => On(u.children[o - 1]);
	return r !== t.value && (e.match(void 0, n, a) || e.match(void 0, n, (u, i, o) => u.type === "emphasis" && o === 0, a)) && (r = r.replace(/^(\\?[*_])+/, (u) => X(0, u, "\\", ""))), r;
}
function Hh(e) {
	let { previous: t, next: r } = e;
	return t?.type === "sentence" && J(0, t.children, -1)?.type === "word" && !J(0, t.children, -1).hasTrailingPunctuation && !/[\p{Space_Separator}\t\n\f\r]$/u.test(J(0, t.children, -1).value) || r?.type === "sentence" && r.children[0]?.type === "word" && !r.children[0].hasLeadingPunctuation && !/^[\p{Space_Separator}\t\n\f\r]/u.test(r.children[0].value);
}
function NE(e) {
	let { siblings: t, index: r } = e;
	if (!t || typeof r != "number") return !1;
	let n = t[r + 2];
	return n?.type === "whitespace" && n.value === "";
}
function RE(e) {
	if (!Qt(e.node) || e.next?.value !== "-") return !1;
	let t = e.siblings[e.index + 2];
	return !t || Qt(t);
}
function lu(e, t, r) {
	let { node: n } = e;
	if (zE(e)) {
		let a = [""], u = Sr(t.originalText.slice(n.position.start.offset, n.position.end.offset));
		for (let i of u) {
			if (i.type === "word") {
				a.push([a.pop(), i.value]);
				continue;
			}
			let o = ou(e, i.value, t.proseWrap, !0, t);
			if (me(o) === De) {
				a.push([a.pop(), o]);
				continue;
			}
			a.push(o, "");
		}
		return Yt(a);
	}
	switch (n.type) {
		case "root": return n.children.length === 0 ? "" : [ME(e, t, r), Z];
		case "paragraph": return Ph(e, t, r);
		case "sentence": return Oh(e, r);
		case "word": return t.parser !== "mdx" ? zh(e, t) : Uh(e);
		case "whitespace": {
			let { next: a } = e, u = a && /^>|^(?:[*+-]|#{1,6}|\d+[).])$/.test(a.value) && !NE(e) && !(t.proseWrap === "preserve" && RE(e)) ? "never" : t.proseWrap;
			return ou(e, n.value, u, !1, t);
		}
		case "emphasis": {
			let a;
			if (On(n.children[0])) a = t.originalText[n.position.start.offset];
			else {
				let u = Hh(e), i = e.callParent(({ node: o }) => o.type === "strong" && Hh(e));
				a = u || i || e.hasAncestor((o) => o.type === "emphasis") ? "*" : "_";
			}
			return [
				a,
				ae(e, t, r),
				a
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
			let a = t.proseWrap === "preserve" ? n.value : X(0, n.value, `
`, " ");
			t.parser !== "mdx" && e.hasAncestor((s) => s.type === "tableCell") && (a = X(0, a, "|", "\\|"));
			let u = bh(a, "`"), i = "`".repeat(u), o = a.startsWith("`") || a.endsWith("`") || /^[\n ]/.test(a) && /[\n ]$/.test(a) && /[^\n ]/.test(a) ? " " : "";
			return [
				i,
				o,
				a,
				o,
				i
			];
		}
		case "wikiLink": {
			let a;
			return t.proseWrap === "preserve" ? a = n.value : a = X(0, n.value, /[\t\n]+/g, " "), [
				"[[",
				a,
				"]]"
			];
		}
		case "link": switch (t.originalText[n.position.start.offset]) {
			case "<": {
				let a = "mailto:";
				return [
					"<",
					n.url.startsWith(a) && t.originalText.slice(n.position.start.offset + 1, n.position.start.offset + 1 + 7) !== a ? n.url.slice(7) : n.url,
					">"
				];
			}
			case "[": return [
				"[",
				ae(e, t, r),
				"](",
				t.parser !== "mdx" && n.url === "" ? "<>" : su(n.url, ")"),
				zn(n.title, t),
				")"
			];
			default: return t.originalText.slice(n.position.start.offset, n.position.end.offset);
		}
		case "image": return [
			"![",
			Wh(n, t),
			"](",
			t.parser !== "mdx" && n.url === "" ? "<>" : su(n.url, ")"),
			zn(n.title, t),
			")"
		];
		case "blockquote": return ["> ", we("> ", ae(e, t, r))];
		case "heading": return Th(e, t, r);
		case "code": {
			if (n.isIndented) {
				let i = " ".repeat(4);
				return we(i, [i, Xe(n.value, Z)]);
			}
			let a = t.__inJsTemplate ? "~" : "`", u = a.repeat(Math.max(3, Rn(n.value, a) + 1));
			return [
				u,
				n.lang || "",
				n.meta ? " " + n.meta : "",
				Z,
				Xe(t.parser === "mdx" ? Pn(n, t.originalText) : n.value, Z),
				Z,
				u
			];
		}
		case "html": {
			let { parent: a, isLast: u } = e, i = a.type === "root" && u ? n.value.trimEnd() : n.value;
			return Xe(i, /^<!--.*-->$/s.test(i) ? Z : yr(wr));
		}
		case "list": return t.parser === "mdx" ? qh(e, t, r) : Ih(e, t, r);
		case "thematicBreak": {
			let { ancestors: a } = e, u = a.findIndex((o) => o.type === "list");
			return u === -1 ? "---" : Ir(a[u], a[u + 1]) % 2 === 0 ? "***" : "---";
		}
		case "linkReference": return [
			"[",
			ae(e, t, r),
			"]",
			n.referenceType === "full" ? Mn(n) : n.referenceType === "collapsed" ? "[]" : ""
		];
		case "imageReference": {
			let a = Wh(n, t);
			return n.referenceType === "full" ? [
				"![",
				a,
				"]",
				Mn(n)
			] : [...t.parser === "mdx" ? [
				"![",
				a,
				"]"
			] : ["!", Mn(n)], n.referenceType === "collapsed" ? "[]" : ""];
		}
		case "definition": {
			let a = t.proseWrap === "always" ? Ln : " ";
			return jt([
				Mn(n),
				":",
				Cr([
					a,
					t.parser !== "mdx" && n.url === "" ? "<>" : su(n.url),
					n.title === null ? "" : [a, zn(n.title, t, !1)]
				])
			]);
		}
		case "footnote": return [
			"[^",
			ae(e, t, r),
			"]"
		];
		case "footnoteReference": return Gh(n);
		case "footnoteDefinition": {
			let a = n.children.length === 1 && n.children[0].type === "paragraph" && (t.proseWrap === "never" || t.proseWrap === "preserve" && n.children[0].position.start.line === n.children[0].position.end.line);
			return [
				Gh(n),
				": ",
				a ? ae(e, t, r) : jt([we(" ".repeat(4), ae(e, t, r, { processor: ({ isFirst: u }) => u ? jt([In, r()]) : r() }))])
			];
		}
		case "table": return Nh(e, t, r);
		case "tableCell": return ae(e, t, r);
		case "break": return /\s/.test(t.originalText[n.position.start.offset]) ? ["  ", yr(wr)] : ["\\", Z];
		case "liquidNode": return Xe(n.value, Z);
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
			n.value ? [Xe(n.value, Z), Z] : "",
			"$$"
		];
		case "inlineMath": return t.originalText.slice(pt(n), ht(n));
		case "text": return Xe(n.value, Z);
		default: throw new yh(n, "Markdown");
	}
}
function ME(e, t, r) {
	let n = [], a = null, { children: u } = e.node;
	for (let [i, o] of u.entries()) switch (Lr(o)) {
		case "start":
			a === null && (a = {
				index: i,
				offset: o.position.end.offset
			});
			break;
		case "end":
			a !== null && (n.push({
				start: a,
				end: {
					index: i,
					offset: o.position.start.offset
				}
			}), a = null);
			break;
		default: break;
	}
	return ae(e, t, r, { processor({ index: i }) {
		if (n.length > 0) {
			let o = n[0];
			if (i === o.start.index) return [
				Vh(u[o.start.index]),
				t.originalText.slice(o.start.offset, o.end.offset),
				Vh(u[o.end.index])
			];
			if (o.start.index < i && i < o.end.index) return !1;
			if (i === o.end.index) return n.shift(), !1;
		}
		return r();
	} });
}
function Vh(e) {
	if (e.type === "html") return e.value;
	if (e.type === "paragraph" && Array.isArray(e.children) && e.children.length === 1 && e.children[0].type === "esComment") return [
		"{/* ",
		e.children[0].value,
		" */}"
	];
}
function zE(e) {
	let t = e.findAncestor((r) => r.type === "linkReference" || r.type === "imageReference");
	return t && (t.type !== "linkReference" || t.referenceType !== "full");
}
function su(e, t = []) {
	let r = [" ", ...Array.isArray(t) ? t : [t]];
	return new RegExp(r.map((n) => ve(n)).join("|")).test(e) ? `<${UE(e, "<>")}>` : e;
}
function zn(e, t, r = !0) {
	if (!e) return "";
	if (r) return " " + zn(e, t, !1);
	if (t.parser === "mdx" && (e = X(0, e, /\\(?=["')])/g, "")), e.includes("\"") && e.includes("'") && !e.includes(")")) return `(${e})`;
	let n = Ch(e, t.singleQuote);
	return e = X(0, e, "\\", "\\\\"), e = X(0, e, n, `\\${n}`), `${n}${e}${n}`;
}
function Mn(e, t) {
	let r = (0, Yh.default)(e.label);
	return t?.parser === "mdx" ? `[${r}]` : `[${X(0, r, /[\\[\]]/g, (a) => `\\${a}`)}]`;
}
function Gh(e) {
	return `[^${e.label}]`;
}
function Wh(e, t) {
	return t.parser !== "mdx" && e.originalAltText ? e.originalAltText : e.alt || "";
}
function YE(e, t) {
	return t.parser === "mdx" ? e = jE(e, t) : e = $E(e, t), e = QE(e), t.parser === "mdx" ? e = tw(e, t) : e = ew(e, t), t.parser !== "mdx" && (e = rw(e, t)), t.parser === "mdx" ? e = iw(e, t) : e = nw(e, t), t.parser === "mdx" ? e = JE(e) : e = XE(e), e;
}
function jE(e, t) {
	return Ee(e, (r) => {
		if (r.type !== "text") return r;
		let { value: n } = r;
		if (n === "*" || n === "_" || !GE.test(n) || r.position.end.offset - r.position.start.offset === n.length) return r;
		let a = t.originalText.slice(r.position.start.offset, r.position.end.offset);
		return WE.test(a) ? r : {
			...r,
			value: a
		};
	});
}
function $E(e, t) {
	return Ee(e, (r) => (r.type === "text" && (r.raw = t.originalText.slice(r.position.start.offset, r.position.end.offset)), r));
}
function KE(e, t, r) {
	return Ee(e, (n) => {
		if (!n.children) return n;
		let a = [], u, i;
		for (let o of n.children) u && t(u, o) ? (o = r(u, o), a.splice(-1, 1, o), i || (i = !0)) : a.push(o), u = o;
		return i ? {
			...n,
			children: a
		} : n;
	});
}
function QE(e) {
	return KE(e, (t, r) => t.type === "text" && r.type === "text", (t, r) => ({
		type: "text",
		value: t.value + r.value,
		position: {
			start: t.position.start,
			end: r.position.end
		}
	}));
}
function JE(e) {
	return Ee(e, (t, r, [n]) => {
		if (t.type !== "text") return t;
		let { value: a } = t;
		return n.type === "paragraph" && (r === 0 && (a = qr.trimStart(a)), r === n.children.length - 1 && (a = qr.trimEnd(a))), {
			type: "sentence",
			position: t.position,
			children: Sr(a)
		};
	});
}
function XE(e) {
	let t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	return n(e, (u, i) => {
		if (u.type === "wikiLink") {
			a(i);
			return;
		}
		if (u.type === "text") {
			if (u.raw.includes("[[")) for (let o of i) o.type === "paragraph" && t.add(o);
			u.raw.includes("]]") && a(i);
		}
	}), Ee(e, (u, i, o) => {
		if (u.type !== "text") return u;
		let s = u.raw, l = o.findIndex((f) => f?.type === "paragraph"), c = l === -1 ? void 0 : o[l];
		if (c) {
			o.slice(l + 1).some((h) => h?.type === "blockquote") && (s = ZE(s, u));
			let f = o[0];
			f?.type === "paragraph" && (i === 0 && (s = qr.trimStart(s)), i === f.children.length - 1 && (s = qr.trimEnd(s)));
		}
		return c && r.has(c.position) ? {
			type: "text",
			position: u.position,
			value: s
		} : {
			type: "sentence",
			position: u.position,
			children: Sr(s)
		};
	});
	function n(u, i) {
		return (function o(s, l) {
			if (i(s, l), s.children) for (let c of s.children) o(c, [s, ...l]);
		})(u, []);
	}
	function a(u) {
		for (let i of u) i.type === "paragraph" && t.has(i) && r.add(i.position);
	}
}
function ZE(e, t) {
	let r = /^([ \t]*>[ \t]*)*/, n = e.split(`
`), a = t.value.split(`
`);
	return n.map((i, o) => {
		let l = (a[o] ?? "").match(r)[0] ?? "";
		return i.replace(r, l);
	}).join(`
`);
}
function ew(e, t) {
	return Ee(e, (r) => {
		if (r.type !== "code") return r;
		return r.isIndented = /^\n?(?: {4,}|\t)/.test(t.originalText.slice(r.position.start.offset, r.position.end.offset)), r;
	});
}
function tw(e, t) {
	return Ee(e, (r, n, a) => {
		if (r.type === "code") {
			let u = /^\n?(?: {4,}|\t)/.test(t.originalText.slice(r.position.start.offset, r.position.end.offset));
			if (r.isIndented = u, u) for (let i = 0; i < a.length; i++) {
				let o = a[i];
				if (o.hasIndentedCodeblock) break;
				o.type === "list" && (o.hasIndentedCodeblock = !0);
			}
		}
		return r;
	});
}
function rw(e, t) {
	let { originalText: r } = t;
	return Ee(e, (n) => {
		if (n.type === "image" || n.type === "imageReference") return n.originalAltText = $h(r, n.position.start.offset, n.position.end.offset), n;
		if (n.type !== "link" || !n.url) return n;
		let a = $h(r, n.position.start.offset, n.position.end.offset);
		return a && /[[\]]/.test(a) && (n.originalLabelText = a), n;
	});
}
function $h(e, t, r) {
	let n = e.indexOf("[", t);
	if (n === -1 || n >= r) return null;
	let a = 1, u = n + 1;
	for (; u < r;) {
		let i = e[u];
		if (i === "\\") {
			u += 2;
			continue;
		}
		if (i === "[") a++;
		else if (i === "]" && (a--, a === 0)) return e.slice(n + 1, u);
		u++;
	}
	return null;
}
function nw(e, t) {
	return Ee(e, (a, u, i) => {
		if (a.type === "list" && a.children.length > 0) {
			for (let s = 0; s < i.length; s++) {
				let l = i[s];
				if (l.type === "list" && !l.isAligned) return a.isAligned = !1, a;
			}
			let o = i[0]?.children[u + 1];
			if (o?.type === "code" && o.isIndented) return a.isAligned = !1, a;
			a.isAligned = n(a);
		}
		return a;
	});
	function r(a) {
		return a.children.length === 0 ? -1 : a.children[0].position.start.column - 1;
	}
	function n(a) {
		if (!a.ordered) return !0;
		let [u, i] = a.children;
		if (lt(u, t).leadingSpaces.length > 1) return !0;
		let s = r(u);
		if (s === -1) return !1;
		if (a.children.length === 1) return s % t.tabWidth === 0;
		return s !== r(i) ? !1 : s % t.tabWidth === 0 ? !0 : lt(i, t).leadingSpaces.length > 1;
	}
}
function iw(e, t) {
	return Ee(e, (a, u, i) => {
		if (a.type === "list" && a.children.length > 0) {
			for (let o = 0; o < i.length; o++) {
				let s = i[o];
				if (s.type === "list" && !s.isAligned) return a.isAligned = !1, a;
			}
			a.isAligned = n(a);
		}
		return a;
	});
	function r(a) {
		return a.children.length === 0 ? -1 : a.children[0].position.start.column - 1;
	}
	function n(a) {
		if (!a.ordered) return !0;
		let [u, i] = a.children;
		if (lt(u, t).leadingSpaces.length > 1) return !0;
		let s = r(u);
		if (s === -1) return !1;
		if (a.children.length === 1) return s % t.tabWidth === 0;
		return s !== r(i) ? !1 : s % t.tabWidth === 0 ? !0 : lt(i, t).leadingSpaces.length > 1;
	}
}
function _r(e) {
	if (Br !== null && typeof Br.property) {
		let t = Br;
		return Br = _r.prototype = null, t;
	}
	return Br = _r.prototype = e ?? Object.create(null), new _r();
}
function fu(e) {
	return _r(e);
}
function uw(e, t = "type") {
	fu(e);
	function r(n) {
		let a = n[t], u = e[a];
		if (!Array.isArray(u)) throw Object.assign(/* @__PURE__ */ new Error(`Missing visitor keys for '${a}'.`), { node: n });
		return u;
	}
	return r;
}
var om, Hn, sm, lm, cm, fm, q, Pr, pm, At, Fo, Ri, Ao, qo, _o, Ft, Oo, Mo, Uo, Vo, Wo, Yo, jo, bt, Qo, Ot, Zo, es, ns, fr, ks, Es, ys, As, $i, Ls, Bs, Ps, Ms, Us, Vs, Ys, $s, ln, Ji, Zs, rl, Et, fn, sl, fl, ml, ra, kl, yl, Sl, oa, Pl, Pe, hn, sa, Wl, $l, Jl, Zl, nc, pa, lc, fc, mc, kc, wc, Ac, Lc, wa, Rc, Uc, Vc, jc, Kc, Jc, rf, af, cf, pf, Df, gf, Ff, Ef, vf, Lf, qf, qa, Hf, Gf, Yf, Jf, tp, ip, ap, op, cp, pp, mp, wp, Zh, xu, Vn, ku, ru, pt, ht, tt, Dm, $n, gm, wu, K, Q, Cu, er, yu, vu, Dt, Ie, Au, Su, Tu, tr, Kn, qe, Rr, Mr, zr, Iu, Ur, rr, _m, Qn, Hr, Jn, Um, Xn, Wm, Zn, ei, qu, ti, ri, Jm, Xm, ni, gt, iD, aD, uD, ii, ai, ir, xt, pe, gD, xD, jr, Bu, _u, Pu, Ou, ui, TD, SD, LD, ID, qD, BD, _D, PD, OD, zu, MD, Wu, VD, ju, $u, Ku, GD, Qu, Ju, He, Be, kt, ZD, $r, cd, ao, io, qt, J, kd, X, bd, ar, oo, Qr, ur, Ve, Bt, so, lo, Ei, co, M, Bi, se, Dg, or, gg, ch, fh, ph, hh, Ab, Tb, Cp, yp, Sb, Lb, vp, Ap, Ua, Tp, Sp, De, de, st, Ae, Te, je, ke, Fe, be, $e, Ke, Qe, ge, Je, Se, An, me, qb, Ha, wt, Ip, qp, Le, Sn, Pp, Op, Wt, Ln, In, vr, Z, wr, Nb, Rb, Mb, zb, Hb, Mp, zp, Up, Hp, Vp, Gp, Va, Ga, Wp, Vb, Gb, Wa, Ya, Yb, Yp, jb, Ar, Kb, Qb, ja, $a, Qp, Ce, Ne, Ka, Xb, Xp, tE, eh, th, aE, Ja, Xa, sE, ih, ah, Ze, Za, _n, $t, Re, Ct, Tr, lE, Qt, oh, fE, sh, pE, lh, mh, Dh, dh, Nn, gh, xh, hE, mE, pu, Rn, Fh, nu, xE, Yh, bh, Eh, wh, FE, bE, uu, yh, wE, TE, IE, Rh, PE, UE, cu, qr, GE, WE, Kh, Br, aw, Qh, le, sw;
//#endregion
__esmMin((() => {
	om = Object.create;
	Hn = Object.defineProperty;
	sm = Object.getOwnPropertyDescriptor;
	lm = Object.getOwnPropertyNames;
	cm = Object.getPrototypeOf;
	fm = Object.prototype.hasOwnProperty;
	q = (e, t) => () => {
		try {
			return t || e((t = { exports: {} }).exports, t), t.exports;
		} catch (r) {
			throw t = 0, r;
		}
	};
	Pr = (e, t) => {
		for (var r in t) Hn(e, r, {
			get: t[r],
			enumerable: !0
		});
	};
	pm = (e, t, r, n) => {
		if (t && typeof t == "object" || typeof t == "function") for (let a of lm(t)) !fm.call(e, a) && a !== r && Hn(e, a, {
			get: () => t[a],
			enumerable: !(n = sm(t, a)) || n.enumerable
		});
		return e;
	};
	At = (e, t, r) => (r = e != null ? om(cm(e)) : {}, pm(t || !e || !e.__esModule ? Hn(r, "default", {
		value: e,
		enumerable: !0
	}) : r, e));
	Fo = q((x8, ko) => {
		"use strict";
		ko.exports = wg;
		var sr = 9, Zr = 10, _t = 32, kg = 33, Fg = 58, Pt = 91, bg = 92, Pi = 93, lr = 94, en = 96, tn = 4, Eg = 1024;
		function wg(e) {
			var t = this.Parser, r = this.Compiler;
			Cg(t) && vg(t, e), yg(r) && Ag(r);
		}
		function Cg(e) {
			return !!(e && e.prototype && e.prototype.blockTokenizers);
		}
		function yg(e) {
			return !!(e && e.prototype && e.prototype.visitors);
		}
		function vg(e, t) {
			for (var r = t || {}, n = e.prototype, a = n.blockTokenizers, u = n.inlineTokenizers, i = n.blockMethods, o = n.inlineMethods, s = a.definition, l = u.reference, c = [], f = -1, h = i.length, m; ++f < h;) m = i[f], !(m === "newline" || m === "indentedCode" || m === "paragraph" || m === "footnoteDefinition") && c.push([m]);
			c.push(["footnoteDefinition"]), r.inlineNotes && (Oi(o, "reference", "inlineNote"), u.inlineNote = g), Oi(i, "definition", "footnoteDefinition"), Oi(o, "reference", "footnoteCall"), a.definition = E, a.footnoteDefinition = D, u.footnoteCall = x, u.reference = k, n.interruptFootnoteDefinition = c, k.locator = l.locator, x.locator = C, g.locator = S;
			function D(w, d, v) {
				for (var L = this, y = L.interruptFootnoteDefinition, b = L.offset, _ = d.length + 1, I = 0, T = [], R, O, z, N, W, ne, p, Y, ie, F, ee, ce, te; I < _ && (N = d.charCodeAt(I), !(N !== sr && N !== _t));) I++;
				if (d.charCodeAt(I++) === Pt && d.charCodeAt(I++) === lr) {
					for (O = I; I < _;) {
						if (N = d.charCodeAt(I), N !== N || N === Zr || N === sr || N === _t) return;
						if (N === Pi) {
							z = I, I++;
							break;
						}
						I++;
					}
					if (!(z === void 0 || O === z || d.charCodeAt(I++) !== Fg)) {
						if (v) return !0;
						for (R = d.slice(O, z), W = w.now(), ie = 0, F = 0, ee = I, ce = []; I < _;) {
							if (N = d.charCodeAt(I), N !== N || N === Zr) te = {
								start: ie,
								contentStart: ee || I,
								contentEnd: I,
								end: I
							}, ce.push(te), N === Zr && (ie = I + 1, F = 0, ee = void 0, te.end = ie);
							else if (F !== void 0) if (N === _t || N === sr) F += N === _t ? 1 : tn - F % tn, F > tn && (F = void 0, ee = I);
							else {
								if (F < tn && te && (te.contentStart === te.contentEnd || Tg(y, a, L, [
									w,
									d.slice(I, Eg),
									!0
								]))) break;
								F = void 0, ee = I;
							}
							I++;
						}
						for (I = -1, _ = ce.length; _ > 0 && (te = ce[_ - 1], te.contentStart === te.contentEnd);) _--;
						for (ne = w(d.slice(0, te.contentEnd)); ++I < _;) te = ce[I], b[W.line + I] = (b[W.line + I] || 0) + (te.contentStart - te.start), T.push(d.slice(te.contentStart, te.end));
						return p = L.enterBlock(), Y = L.tokenizeBlock(T.join(""), W), p(), ne({
							type: "footnoteDefinition",
							identifier: R.toLowerCase(),
							label: R,
							children: Y
						});
					}
				}
			}
			function x(w, d, v) {
				var L = d.length + 1, y = 0, b, _, I, T;
				if (d.charCodeAt(y++) === Pt && d.charCodeAt(y++) === lr) {
					for (_ = y; y < L;) {
						if (T = d.charCodeAt(y), T !== T || T === Zr || T === sr || T === _t) return;
						if (T === Pi) {
							I = y, y++;
							break;
						}
						y++;
					}
					if (!(I === void 0 || _ === I)) return v ? !0 : (b = d.slice(_, I), w(d.slice(0, y))({
						type: "footnoteReference",
						identifier: b.toLowerCase(),
						label: b
					}));
				}
			}
			function g(w, d, v) {
				var L = this, y = d.length + 1, b = 0, _ = 0, I, T, R, O, z, N, W;
				if (d.charCodeAt(b++) === lr && d.charCodeAt(b++) === Pt) {
					for (R = b; b < y;) {
						if (T = d.charCodeAt(b), T !== T) return;
						if (N === void 0) if (T === bg) b += 2;
						else if (T === Pt) _++, b++;
						else if (T === Pi) if (_ === 0) {
							O = b, b++;
							break;
						} else _--, b++;
						else if (T === en) {
							for (z = b, N = 1; d.charCodeAt(z + N) === en;) N++;
							b += N;
						} else b++;
						else if (T === en) {
							for (z = b, W = 1; d.charCodeAt(z + W) === en;) W++;
							b += W, N === W && (N = void 0), W = void 0;
						} else b++;
					}
					if (O !== void 0) return v ? !0 : (I = w.now(), I.column += 2, I.offset += 2, w(d.slice(0, b))({
						type: "footnote",
						children: L.tokenizeInline(d.slice(R, O), I)
					}));
				}
			}
			function k(w, d, v) {
				var L = 0;
				if (d.charCodeAt(L) === kg && L++, d.charCodeAt(L) === Pt && d.charCodeAt(L + 1) !== lr) return l.call(this, w, d, v);
			}
			function E(w, d, v) {
				for (var L = 0, y = d.charCodeAt(L); y === _t || y === sr;) y = d.charCodeAt(++L);
				if (y === Pt && d.charCodeAt(L + 1) !== lr) return s.call(this, w, d, v);
			}
			function C(w, d) {
				return w.indexOf("[", d);
			}
			function S(w, d) {
				return w.indexOf("^[", d);
			}
		}
		function Ag(e) {
			var t = e.prototype.visitors, r = "    ";
			t.footnote = n, t.footnoteReference = a, t.footnoteDefinition = u;
			function n(i) {
				return "^[" + this.all(i).join("") + "]";
			}
			function a(i) {
				return "[^" + (i.label || i.identifier) + "]";
			}
			function u(i) {
				for (var o = this.all(i).join(`

`).split(`
`), s = 0, l = o.length, c; ++s < l;) c = o[s], c !== "" && (o[s] = r + c);
				return "[^" + (i.label || i.identifier) + "]: " + o.join(`
`);
			}
		}
		function Oi(e, t, r) {
			e.splice(e.indexOf(t), 0, r);
		}
		function Tg(e, t, r, n) {
			for (var a = e.length, u = -1; ++u < a;) if (t[e[u][0]].apply(r, n)) return !0;
			return !1;
		}
	});
	Ri = q((Ni) => {
		Ni.isRemarkParser = Sg;
		Ni.isRemarkCompiler = Lg;
		function Sg(e) {
			return !!(e && e.prototype && e.prototype.blockTokenizers);
		}
		function Lg(e) {
			return !!(e && e.prototype && e.prototype.visitors);
		}
	});
	Ao = q((F8, vo) => {
		var bo = Ri();
		vo.exports = _g;
		var Eo = 9, wo = 32, rn = 36, Ig = 48, qg = 57, Co = 92, Bg = ["math", "math-inline"], yo = "math-display";
		function _g(e) {
			let t = this.Parser, r = this.Compiler;
			bo.isRemarkParser(t) && Pg(t, e), bo.isRemarkCompiler(r) && Og(r, e);
		}
		function Pg(e, t) {
			let r = e.prototype, n = r.inlineMethods;
			u.locator = a, r.inlineTokenizers.math = u, n.splice(n.indexOf("text"), 0, "math");
			function a(i, o) {
				return i.indexOf("$", o);
			}
			function u(i, o, s) {
				let l = o.length, c = !1, f = !1, h = 0, m, D, x, g, k, E, C;
				if (o.charCodeAt(h) === Co && (f = !0, h++), o.charCodeAt(h) === rn) {
					if (h++, f) return s ? !0 : i(o.slice(0, h))({
						type: "text",
						value: "$"
					});
					if (o.charCodeAt(h) === rn && (c = !0, h++), x = o.charCodeAt(h), !(x === wo || x === Eo)) {
						for (g = h; h < l;) {
							if (D = x, x = o.charCodeAt(h + 1), D === rn) {
								if (m = o.charCodeAt(h - 1), m !== wo && m !== Eo && (x !== x || x < Ig || x > qg) && (!c || x === rn)) {
									k = h - 1, h++, c && h++, E = h;
									break;
								}
							} else D === Co && (h++, x = o.charCodeAt(h + 1));
							h++;
						}
						if (E !== void 0) return s ? !0 : (C = o.slice(g, k + 1), i(o.slice(0, E))({
							type: "inlineMath",
							value: C,
							data: {
								hName: "span",
								hProperties: { className: Bg.concat(c && t.inlineMathDouble ? [yo] : []) },
								hChildren: [{
									type: "text",
									value: C
								}]
							}
						}));
					}
				}
			}
		}
		function Og(e) {
			let t = e.prototype;
			t.visitors.inlineMath = r;
			function r(n) {
				let a = "$";
				return (n.data && n.data.hProperties && n.data.hProperties.className || []).includes(yo) && (a = "$$"), a + n.value + a;
			}
		}
	});
	qo = q((b8, Io) => {
		var To = Ri();
		Io.exports = zg;
		var So = 10, cr = 32, Mi = 36, Lo = `
`, Ng = "$", Rg = 2, Mg = ["math", "math-display"];
		function zg() {
			let e = this.Parser, t = this.Compiler;
			To.isRemarkParser(e) && Ug(e), To.isRemarkCompiler(t) && Hg(t);
		}
		function Ug(e) {
			let t = e.prototype, r = t.blockMethods, n = t.interruptParagraph, a = t.interruptList, u = t.interruptBlockquote;
			t.blockTokenizers.math = i, r.splice(r.indexOf("fencedCode") + 1, 0, "math"), n.splice(n.indexOf("fencedCode") + 1, 0, ["math"]), a.splice(a.indexOf("fencedCode") + 1, 0, ["math"]), u.splice(u.indexOf("fencedCode") + 1, 0, ["math"]);
			function i(o, s, l) {
				var c = s.length, f = 0;
				let h, m, D, x, g, k, E, C, S, w, d;
				for (; f < c && s.charCodeAt(f) === cr;) f++;
				for (g = f; f < c && s.charCodeAt(f) === Mi;) f++;
				if (k = f - g, !(k < Rg)) {
					for (; f < c && s.charCodeAt(f) === cr;) f++;
					for (E = f; f < c;) {
						if (h = s.charCodeAt(f), h === Mi) return;
						if (h === So) break;
						f++;
					}
					if (s.charCodeAt(f) === So) {
						if (l) return !0;
						for (m = [], E !== f && m.push(s.slice(E, f)), f++, D = s.indexOf(Lo, f + 1), D = D === -1 ? c : D; f < c;) {
							for (C = !1, w = f, d = D, x = D, S = 0; x > w && s.charCodeAt(x - 1) === cr;) x--;
							for (; x > w && s.charCodeAt(x - 1) === Mi;) S++, x--;
							for (k <= S && s.indexOf(Ng, w) === x && (C = !0, d = x); w <= d && w - f < g && s.charCodeAt(w) === cr;) w++;
							if (C) for (; d > w && s.charCodeAt(d - 1) === cr;) d--;
							if ((!C || w !== d) && m.push(s.slice(w, d)), C) break;
							f = D + 1, D = s.indexOf(Lo, f + 1), D = D === -1 ? c : D;
						}
						return m = m.join(`
`), o(s.slice(0, D))({
							type: "math",
							value: m,
							data: {
								hName: "div",
								hProperties: { className: Mg.concat() },
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
		function Hg(e) {
			let t = e.prototype;
			t.visitors.math = r;
			function r(n) {
				return `$$
` + n.value + `
$$`;
			}
		}
	});
	_o = q((E8, Bo) => {
		var Vg = Ao(), Gg = qo();
		Bo.exports = Wg;
		function Wg(e) {
			var t = e || {};
			Gg.call(this, t), Vg.call(this, t);
		}
	});
	Ft = q((w8, Po) => {
		Po.exports = jg;
		var Yg = Object.prototype.hasOwnProperty;
		function jg() {
			for (var e = {}, t = 0; t < arguments.length; t++) {
				var r = arguments[t];
				for (var n in r) Yg.call(r, n) && (e[n] = r[n]);
			}
			return e;
		}
	});
	Oo = q((C8, zi) => {
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
	Mo = q((y8, Ro) => {
		"use strict";
		var $g = Ft(), No = Oo();
		Ro.exports = Kg;
		function Kg(e) {
			var t, r, n;
			No(u, e), No(a, u), t = u.prototype;
			for (r in t) n = t[r], n && typeof n == "object" && (t[r] = "concat" in n ? n.concat() : $g(n));
			return u;
			function a(i) {
				return e.apply(this, i);
			}
			function u() {
				return this instanceof u ? e.apply(this, arguments) : new a(arguments);
			}
		}
	});
	Uo = q((v8, zo) => {
		"use strict";
		zo.exports = Qg;
		function Qg(e, t, r) {
			return n;
			function n() {
				var a = r || this, u = a[e];
				return a[e] = !t, i;
				function i() {
					a[e] = u;
				}
			}
		}
	});
	Vo = q((A8, Ho) => {
		"use strict";
		Ho.exports = Jg;
		function Jg(e) {
			for (var t = String(e), r = [], n = /\r?\n|\r/g; n.exec(t);) r.push(n.lastIndex);
			return r.push(t.length + 1), {
				toPoint: a,
				toPosition: a,
				toOffset: u
			};
			function a(i) {
				var o = -1;
				if (i > -1 && i < r[r.length - 1]) {
					for (; ++o < r.length;) if (r[o] > i) return {
						line: o + 1,
						column: i - (r[o - 1] || 0) + 1,
						offset: i
					};
				}
				return {};
			}
			function u(i) {
				var o = i && i.line, s = i && i.column, l;
				return !isNaN(o) && !isNaN(s) && o - 1 in r && (l = (r[o - 2] || 0) + s - 1 || 0), l > -1 && l < r[r.length - 1] ? l : -1;
			}
		}
	});
	Wo = q((T8, Go) => {
		"use strict";
		Go.exports = Xg;
		var Ui = "\\";
		function Xg(e, t) {
			return r;
			function r(n) {
				for (var a = 0, u = n.indexOf(Ui), i = e[t], o = [], s; u !== -1;) o.push(n.slice(a, u)), a = u + 1, s = n.charAt(a), (!s || i.indexOf(s) === -1) && o.push(Ui), u = n.indexOf(Ui, a + 1);
				return o.push(n.slice(a)), o.join("");
			}
		}
	});
	Yo = q((S8, Zg) => {
		Zg.exports = {
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
	jo = q((L8, ex) => {
		ex.exports = {
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
	bt = q((I8, $o) => {
		"use strict";
		$o.exports = tx;
		function tx(e) {
			var t = typeof e == "string" ? e.charCodeAt(0) : e;
			return t >= 48 && t <= 57;
		}
	});
	Qo = q((q8, Ko) => {
		"use strict";
		Ko.exports = rx;
		function rx(e) {
			var t = typeof e == "string" ? e.charCodeAt(0) : e;
			return t >= 97 && t <= 102 || t >= 65 && t <= 70 || t >= 48 && t <= 57;
		}
	});
	Ot = q((B8, Jo) => {
		"use strict";
		Jo.exports = nx;
		function nx(e) {
			var t = typeof e == "string" ? e.charCodeAt(0) : e;
			return t >= 97 && t <= 122 || t >= 65 && t <= 90;
		}
	});
	Zo = q((_8, Xo) => {
		"use strict";
		var ix = Ot(), ax = bt();
		Xo.exports = ux;
		function ux(e) {
			return ix(e) || ax(e);
		}
	});
	es = q((P8, ox) => {
		ox.exports = {
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
	ns = q((O8, rs) => {
		"use strict";
		var ts = es();
		rs.exports = lx;
		var sx = {}.hasOwnProperty;
		function lx(e) {
			return sx.call(ts, e) ? ts[e] : !1;
		}
	});
	fr = q((N8, ds) => {
		"use strict";
		var is = Yo(), as = jo(), cx = bt(), fx = Qo(), ls = Zo(), px = ns();
		ds.exports = yx;
		var hx = {}.hasOwnProperty, Nt = String.fromCharCode, mx = Function.prototype, us = {
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
		}, Dx = 9, os = 10, dx = 12, gx = 32, ss = 38, xx = 59, kx = 60, Fx = 61, bx = 35, Ex = 88, wx = 120, Cx = 65533, Rt = "named", Vi = "hexadecimal", Gi = "decimal", Wi = {};
		Wi[Vi] = 16;
		Wi[Gi] = 10;
		var nn = {};
		nn[Rt] = ls;
		nn[Gi] = cx;
		nn[Vi] = fx;
		var cs = 1, fs = 2, ps = 3, hs = 4, ms = 5, Hi = 6, Ds = 7, at = {};
		at[cs] = "Named character references must be terminated by a semicolon";
		at[fs] = "Numeric character references must be terminated by a semicolon";
		at[ps] = "Named character references cannot be empty";
		at[hs] = "Numeric character references cannot be empty";
		at[ms] = "Named character references must be known";
		at[Hi] = "Numeric character references cannot be disallowed";
		at[Ds] = "Numeric character references cannot be outside the permissible Unicode range";
		function yx(e, t) {
			var r = {}, n, a;
			t || (t = {});
			for (a in us) n = t[a], r[a] = n ?? us[a];
			return (r.position.indent || r.position.start) && (r.indent = r.position.indent || [], r.position = r.position.start), vx(e, r);
		}
		function vx(e, t) {
			var r = t.additional, n = t.nonTerminated, a = t.text, u = t.reference, i = t.warning, o = t.textContext, s = t.referenceContext, l = t.warningContext, c = t.position, f = t.indent || [], h = e.length, m = 0, D = -1, x = c.column || 1, g = c.line || 1, k = "", E = [], C, S, w, d, v, L, y, b, _, I, T, R, O, z, N, W, ne, p, Y;
			for (typeof r == "string" && (r = r.charCodeAt(0)), W = ie(), b = i ? F : mx, m--, h++; ++m < h;) if (v === os && (x = f[D] || 1), v = e.charCodeAt(m), v === ss) {
				if (y = e.charCodeAt(m + 1), y === Dx || y === os || y === dx || y === gx || y === ss || y === kx || y !== y || r && y === r) {
					k += Nt(v), x++;
					continue;
				}
				for (O = m + 1, R = O, Y = O, y === bx ? (Y = ++R, y = e.charCodeAt(Y), y === Ex || y === wx ? (z = Vi, Y = ++R) : z = Gi) : z = Rt, C = "", T = "", d = "", N = nn[z], Y--; ++Y < h && (y = e.charCodeAt(Y), !!N(y));) d += Nt(y), z === Rt && hx.call(is, d) && (C = d, T = is[d]);
				w = e.charCodeAt(Y) === xx, w && (Y++, S = z === Rt ? px(d) : !1, S && (C = d, T = S)), p = 1 + Y - O, !w && !n || (d ? z === Rt ? (w && !T ? b(ms, 1) : (C !== d && (Y = R + C.length, p = 1 + Y - R, w = !1), w || (_ = C ? cs : ps, t.attribute ? (y = e.charCodeAt(Y), y === Fx ? (b(_, p), T = null) : ls(y) ? T = null : b(_, p)) : b(_, p))), L = T) : (w || b(fs, p), L = parseInt(d, Wi[z]), Ax(L) ? (b(Ds, p), L = Nt(Cx)) : L in as ? (b(Hi, p), L = as[L]) : (I = "", Tx(L) && b(Hi, p), L > 65535 && (L -= 65536, I += Nt(L >>> 10 | 55296), L = 56320 | L & 1023), L = I + Nt(L))) : z !== Rt && b(hs, p)), L ? (ee(), W = ie(), m = Y - 1, x += Y - O + 1, E.push(L), ne = ie(), ne.offset++, u && u.call(s, L, {
					start: W,
					end: ne
				}, e.slice(O - 1, Y)), W = ne) : (d = e.slice(O - 1, Y), k += d, x += d.length, m = Y - 1);
			} else v === 10 && (g++, D++, x = 0), v === v ? (k += Nt(v), x++) : ee();
			return E.join("");
			function ie() {
				return {
					line: g,
					column: x,
					offset: m + (c.offset || 0)
				};
			}
			function F(ce, te) {
				var et = ie();
				et.column += te, et.offset += te, i.call(l, at[ce], et, ce);
			}
			function ee() {
				k && (E.push(k), a && a.call(o, k, {
					start: W,
					end: ie()
				}), k = "");
			}
		}
		function Ax(e) {
			return e >= 55296 && e <= 57343 || e > 1114111;
		}
		function Tx(e) {
			return e >= 1 && e <= 8 || e === 11 || e >= 13 && e <= 31 || e >= 127 && e <= 159 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534;
		}
	});
	ks = q((R8, xs) => {
		"use strict";
		var Sx = Ft(), gs = fr();
		xs.exports = Lx;
		function Lx(e) {
			return r.raw = n, r;
			function t(u) {
				for (var i = e.offset, o = u.line, s = []; ++o && o in i;) s.push((i[o] || 0) + 1);
				return {
					start: u,
					indent: s
				};
			}
			function r(u, i, o) {
				gs(u, {
					position: t(i),
					warning: a,
					text: o,
					reference: o,
					textContext: e,
					referenceContext: e
				});
			}
			function n(u, i, o) {
				return gs(u, Sx(o, {
					position: t(i),
					warning: a
				}));
			}
			function a(u, i, o) {
				o !== 3 && e.file.message(u, i);
			}
		}
	});
	Es = q((M8, bs) => {
		"use strict";
		bs.exports = Ix;
		function Ix(e) {
			return t;
			function t(r, n) {
				var a = this, u = a.offset, i = [], o = a[e + "Methods"], s = a[e + "Tokenizers"], l = n.line, c = n.column, f, h, m, D, x, g;
				if (!r) return i;
				for (L.now = C, L.file = a.file, k(""); r;) {
					for (f = -1, h = o.length, x = !1; ++f < h && (D = o[f], m = s[D], !(m && (!m.onlyAtStart || a.atStart) && (!m.notInList || !a.inList) && (!m.notInBlock || !a.inBlock) && (!m.notInLink || !a.inLink) && (g = r.length, m.apply(a, [L, r]), x = g !== r.length, x))););
					x || a.file.fail(/* @__PURE__ */ new Error("Infinite loop"), L.now());
				}
				return a.eof = C(), i;
				function k(y) {
					for (var b = -1, _ = y.indexOf(`
`); _ !== -1;) l++, b = _, _ = y.indexOf(`
`, _ + 1);
					b === -1 ? c += y.length : c = y.length - b, l in u && (b !== -1 ? c += u[l] : c <= u[l] && (c = u[l] + 1));
				}
				function E() {
					var y = [], b = l + 1;
					return function() {
						for (var _ = l + 1; b < _;) y.push((u[b] || 0) + 1), b++;
						return y;
					};
				}
				function C() {
					var y = {
						line: l,
						column: c
					};
					return y.offset = a.toOffset(y), y;
				}
				function S(y) {
					this.start = y, this.end = C();
				}
				function w(y) {
					r.slice(0, y.length) !== y && a.file.fail(/* @__PURE__ */ new Error("Incorrectly eaten value: please report this warning on https://git.io/vg5Ft"), C());
				}
				function d() {
					var y = C();
					return b;
					function b(_, I) {
						var T = _.position, R = T ? T.start : y, O = [], z = T && T.end.line, N = y.line;
						if (_.position = new S(R), T && I && T.indent) {
							if (O = T.indent, z < N) {
								for (; ++z < N;) O.push((u[z] || 0) + 1);
								O.push(y.column);
							}
							I = O.concat(I);
						}
						return _.position.indent = I || [], _;
					}
				}
				function v(y, b) {
					var _ = b ? b.children : i, I = _[_.length - 1], T;
					return I && y.type === I.type && (y.type === "text" || y.type === "blockquote") && Fs(I) && Fs(y) && (T = y.type === "text" ? qx : Bx, y = T.call(a, I, y)), y !== I && _.push(y), a.atStart && i.length !== 0 && a.exitStart(), y;
				}
				function L(y) {
					var b = E(), _ = d(), I = C();
					return w(y), T.reset = R, R.test = O, T.test = O, r = r.slice(y.length), k(y), b = b(), T;
					function T(z, N) {
						return _(v(_(z), N), b);
					}
					function R() {
						var z = T.apply(null, arguments);
						return l = I.line, c = I.column, r = y + r, z;
					}
					function O() {
						var z = _({});
						return l = I.line, c = I.column, r = y + r, z.position;
					}
				}
			}
		}
		function Fs(e) {
			var t, r;
			return e.type !== "text" || !e.position ? !0 : (t = e.position.start, r = e.position.end, t.line !== r.line || r.column - t.column === e.value.length);
		}
		function qx(e, t) {
			return e.value += t.value, e;
		}
		function Bx(e, t) {
			return this.options.commonmark || this.options.gfm ? t : (e.children = e.children.concat(t.children), e);
		}
	});
	ys = q((z8, Cs) => {
		"use strict";
		Cs.exports = an;
		var Yi = [
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
		], ji = Yi.concat(["~", "|"]), ws = ji.concat([
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
		an.default = Yi;
		an.gfm = ji;
		an.commonmark = ws;
		function an(e) {
			var t = e || {};
			return t.commonmark ? ws : t.gfm ? ji : Yi;
		}
	});
	As = q((U8, vs) => {
		"use strict";
		vs.exports = [
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
	$i = q((H8, Ts) => {
		"use strict";
		Ts.exports = {
			position: !0,
			gfm: !0,
			commonmark: !1,
			pedantic: !1,
			blocks: As()
		};
	});
	Ls = q((V8, Ss) => {
		"use strict";
		var _x = Ft(), Px = ys(), Ox = $i();
		Ss.exports = Nx;
		function Nx(e) {
			var t = this, r = t.options, n, a;
			if (e == null) e = {};
			else if (typeof e == "object") e = _x(e);
			else throw new Error("Invalid value `" + e + "` for setting `options`");
			for (n in Ox) {
				if (a = e[n], a ??= r[n], n !== "blocks" && typeof a != "boolean" || n === "blocks" && typeof a != "object") throw new Error("Invalid value `" + a + "` for setting `options." + n + "`");
				e[n] = a;
			}
			return t.options = e, t.escape = Px(e), t;
		}
	});
	Bs = q((G8, qs) => {
		"use strict";
		qs.exports = Is;
		function Is(e) {
			if (e == null) return Ux;
			if (typeof e == "string") return zx(e);
			if (typeof e == "object") return "length" in e ? Mx(e) : Rx(e);
			if (typeof e == "function") return e;
			throw new Error("Expected function, string, or object as test");
		}
		function Rx(e) {
			return t;
			function t(r) {
				var n;
				for (n in e) if (r[n] !== e[n]) return !1;
				return !0;
			}
		}
		function Mx(e) {
			for (var t = [], r = -1; ++r < e.length;) t[r] = Is(e[r]);
			return n;
			function n() {
				for (var a = -1; ++a < t.length;) if (t[a].apply(this, arguments)) return !0;
				return !1;
			}
		}
		function zx(e) {
			return t;
			function t(r) {
				return !!(r && r.type === e);
			}
		}
		function Ux() {
			return !0;
		}
	});
	Ps = q((W8, _s) => {
		_s.exports = Hx;
		function Hx(e) {
			return e;
		}
	});
	Ms = q((Y8, Rs) => {
		"use strict";
		Rs.exports = un;
		var Vx = Bs(), Gx = Ps(), Os = !0, Ns = "skip", Ki = !1;
		un.CONTINUE = Os;
		un.SKIP = Ns;
		un.EXIT = Ki;
		function un(e, t, r, n) {
			var a, u;
			typeof t == "function" && typeof r != "function" && (n = r, r = t, t = null), u = Vx(t), a = n ? -1 : 1, i(e, null, [])();
			function i(o, s, l) {
				var c = typeof o == "object" && o !== null ? o : {}, f;
				return typeof c.type == "string" && (f = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0, h.displayName = "node (" + Gx(c.type + (f ? "<" + f + ">" : "")) + ")"), h;
				function h() {
					var m = l.concat(o), D = [], x, g;
					if ((!t || u(o, s, l[l.length - 1] || null)) && (D = Wx(r(o, l)), D[0] === Ki)) return D;
					if (o.children && D[0] !== Ns) for (g = (n ? o.children.length : -1) + a; g > -1 && g < o.children.length;) {
						if (x = i(o.children[g], g, m)(), x[0] === Ki) return x;
						g = typeof x[1] == "number" ? x[1] : g + a;
					}
					return D;
				}
			}
		}
		function Wx(e) {
			return e !== null && typeof e == "object" && "length" in e ? e : typeof e == "number" ? [Os, e] : [e];
		}
	});
	Us = q((j8, zs) => {
		"use strict";
		zs.exports = sn;
		var on = Ms(), Yx = on.CONTINUE, jx = on.SKIP, $x = on.EXIT;
		sn.CONTINUE = Yx;
		sn.SKIP = jx;
		sn.EXIT = $x;
		function sn(e, t, r, n) {
			typeof t == "function" && typeof r != "function" && (n = r, r = t, t = null), on(e, t, a, n);
			function a(u, i) {
				var o = i[i.length - 1], s = o ? o.children.indexOf(u) : null;
				return r(u, s, o);
			}
		}
	});
	Vs = q(($8, Hs) => {
		"use strict";
		var Kx = Us();
		Hs.exports = Qx;
		function Qx(e, t) {
			return Kx(e, t ? Jx : Xx), e;
		}
		function Jx(e) {
			delete e.position;
		}
		function Xx(e) {
			e.position = void 0;
		}
	});
	Ys = q((K8, Ws) => {
		"use strict";
		var Gs = Ft(), Zx = Vs();
		Ws.exports = r1;
		var e1 = `
`, t1 = /\r\n|\r/g;
		function r1() {
			var e = this, t = String(e.file), r = {
				line: 1,
				column: 1,
				offset: 0
			}, n = Gs(r), a;
			return t = t.replace(t1, e1), t.charCodeAt(0) === 65279 && (t = t.slice(1), n.column++, n.offset++), a = {
				type: "root",
				children: e.tokenizeBlock(t, n),
				position: {
					start: r,
					end: e.eof || Gs(r)
				}
			}, e.options.position || Zx(a, !0), a;
		}
	});
	$s = q((Q8, js) => {
		"use strict";
		var n1 = /^[ \t]*(\n|$)/;
		js.exports = i1;
		function i1(e, t, r) {
			for (var n, a = "", u = 0, i = t.length; u < i && (n = n1.exec(t.slice(u)), n != null);) u += n[0].length, a += n[0];
			if (a !== "") {
				if (r) return !0;
				e(a);
			}
		}
	});
	ln = q((J8, Ks) => {
		"use strict";
		var Ge = "", Qi;
		Ks.exports = a1;
		function a1(e, t) {
			if (typeof e != "string") throw new TypeError("expected a string");
			if (t === 1) return e;
			if (t === 2) return e + e;
			var r = e.length * t;
			if (Qi !== e || typeof Qi > "u") Qi = e, Ge = "";
			else if (Ge.length >= r) return Ge.substr(0, r);
			for (; r > Ge.length && t > 1;) t & 1 && (Ge += e), t >>= 1, e += e;
			return Ge += e, Ge = Ge.substr(0, r), Ge;
		}
	});
	Ji = q((X8, Qs) => {
		"use strict";
		Qs.exports = u1;
		function u1(e) {
			return String(e).replace(/\n+$/, "");
		}
	});
	Zs = q((Z8, Xs) => {
		"use strict";
		var o1 = ln(), s1 = Ji();
		Xs.exports = f1;
		var Xi = `
`, Js = "	", Zi = " ", c1 = o1(Zi, 4);
		function f1(e, t, r) {
			for (var n = -1, a = t.length, u = "", i = "", o = "", s = "", l, c, f; ++n < a;) if (l = t.charAt(n), f) if (f = !1, u += o, i += s, o = "", s = "", l === Xi) o = l, s = l;
			else for (u += l, i += l; ++n < a;) {
				if (l = t.charAt(n), !l || l === Xi) {
					s = l, o = l;
					break;
				}
				u += l, i += l;
			}
			else if (l === Zi && t.charAt(n + 1) === l && t.charAt(n + 2) === l && t.charAt(n + 3) === l) o += c1, n += 3, f = !0;
			else if (l === Js) o += l, f = !0;
			else {
				for (c = ""; l === Js || l === Zi;) c += l, l = t.charAt(++n);
				if (l !== Xi) break;
				o += c + l, s += l;
			}
			if (i) return r ? !0 : e(u)({
				type: "code",
				lang: null,
				meta: null,
				value: s1(i)
			});
		}
	});
	rl = q((eT, tl) => {
		"use strict";
		tl.exports = D1;
		var cn = `
`, pr = "	", Mt = " ", p1 = "~", el = "`", h1 = 3, m1 = 4;
		function D1(e, t, r) {
			var n = this, a = n.options.gfm, u = t.length + 1, i = 0, o = "", s, l, c, f, h, m, D, x, g, k, E, C, S;
			if (a) {
				for (; i < u && (c = t.charAt(i), !(c !== Mt && c !== pr));) o += c, i++;
				if (C = i, c = t.charAt(i), !(c !== p1 && c !== el)) {
					for (i++, l = c, s = 1, o += c; i < u && (c = t.charAt(i), c === l);) o += c, s++, i++;
					if (!(s < h1)) {
						for (; i < u && (c = t.charAt(i), !(c !== Mt && c !== pr));) o += c, i++;
						for (f = "", D = ""; i < u && (c = t.charAt(i), !(c === cn || l === el && c === l));) c === Mt || c === pr ? D += c : (f += D + c, D = ""), i++;
						if (c = t.charAt(i), !(c && c !== cn)) {
							if (r) return !0;
							S = e.now(), S.column += o.length, S.offset += o.length, o += f, f = n.decode.raw(n.unescape(f), S), D && (o += D), D = "", k = "", E = "", x = "", g = "";
							for (var w = !0; i < u;) {
								if (c = t.charAt(i), x += k, g += E, k = "", E = "", c !== cn) {
									x += c, E += c, i++;
									continue;
								}
								for (w ? (o += c, w = !1) : (k += c, E += c), D = "", i++; i < u && (c = t.charAt(i), c === Mt);) D += c, i++;
								if (k += D, E += D.slice(C), !(D.length >= m1)) {
									for (D = ""; i < u && (c = t.charAt(i), c === l);) D += c, i++;
									if (k += D, E += D, !(D.length < s)) {
										for (D = ""; i < u && (c = t.charAt(i), !(c !== Mt && c !== pr));) k += c, E += c, i++;
										if (!c || c === cn) break;
									}
								}
							}
							for (o += x + k, i = -1, u = f.length; ++i < u;) if (c = f.charAt(i), c === Mt || c === pr) h || (h = f.slice(0, i));
							else if (h) {
								m = f.slice(i);
								break;
							}
							return e(o)({
								type: "code",
								lang: h || f || null,
								meta: m || null,
								value: g
							});
						}
					}
				}
			}
		}
	});
	Et = q((zt, nl) => {
		zt = nl.exports = d1;
		function d1(e) {
			return e.trim ? e.trim() : zt.right(zt.left(e));
		}
		zt.left = function(e) {
			return e.trimLeft ? e.trimLeft() : e.replace(/^\s\s*/, "");
		};
		zt.right = function(e) {
			if (e.trimRight) return e.trimRight();
			for (var t = /\s/, r = e.length; t.test(e.charAt(--r)););
			return e.slice(0, r + 1);
		};
	});
	fn = q((tT, il) => {
		"use strict";
		il.exports = g1;
		function g1(e, t, r, n) {
			for (var a = e.length, u = -1, i, o; ++u < a;) if (i = e[u], o = i[1] || {}, !(o.pedantic !== void 0 && o.pedantic !== r.options.pedantic) && !(o.commonmark !== void 0 && o.commonmark !== r.options.commonmark) && t[i[0]].apply(r, n)) return !0;
			return !1;
		}
	});
	sl = q((rT, ol) => {
		"use strict";
		var x1 = Et(), k1 = fn();
		ol.exports = F1;
		var ea = `
`, al = "	", ta = " ", ul = ">";
		function F1(e, t, r) {
			for (var n = this, a = n.offset, u = n.blockTokenizers, i = n.interruptBlockquote, o = e.now(), s = o.line, l = t.length, c = [], f = [], h = [], m, D = 0, x, g, k, E, C, S, w, d; D < l && (x = t.charAt(D), !(x !== ta && x !== al));) D++;
			if (t.charAt(D) === ul) {
				if (r) return !0;
				for (D = 0; D < l;) {
					for (k = t.indexOf(ea, D), S = D, w = !1, k === -1 && (k = l); D < l && (x = t.charAt(D), !(x !== ta && x !== al));) D++;
					if (t.charAt(D) === ul ? (D++, w = !0, t.charAt(D) === ta && D++) : D = S, E = t.slice(D, k), !w && !x1(E)) {
						D = S;
						break;
					}
					if (!w && (g = t.slice(D), k1(i, u, n, [
						e,
						g,
						!0
					]))) break;
					C = S === D ? E : t.slice(S, k), h.push(D - S), c.push(C), f.push(E), D = k + 1;
				}
				for (D = -1, l = h.length, m = e(c.join(ea)); ++D < l;) a[s] = (a[s] || 0) + h[D], s++;
				return d = n.enterBlock(), f = n.tokenizeBlock(f.join(ea), o), d(), m({
					type: "blockquote",
					children: f
				});
			}
		}
	});
	fl = q((nT, cl) => {
		"use strict";
		cl.exports = E1;
		var ll = `
`, hr = "	", mr = " ", Dr = "#", b1 = 6;
		function E1(e, t, r) {
			for (var n = this, a = n.options.pedantic, u = t.length + 1, i = -1, o = e.now(), s = "", l = "", c, f, h; ++i < u;) {
				if (c = t.charAt(i), c !== mr && c !== hr) {
					i--;
					break;
				}
				s += c;
			}
			for (h = 0; ++i <= u;) {
				if (c = t.charAt(i), c !== Dr) {
					i--;
					break;
				}
				s += c, h++;
			}
			if (!(h > b1) && !(!h || !a && t.charAt(i + 1) === Dr)) {
				for (u = t.length + 1, f = ""; ++i < u;) {
					if (c = t.charAt(i), c !== mr && c !== hr) {
						i--;
						break;
					}
					f += c;
				}
				if (!(!a && f.length === 0 && c && c !== ll)) {
					if (r) return !0;
					for (s += f, f = "", l = ""; ++i < u && (c = t.charAt(i), !(!c || c === ll));) {
						if (c !== mr && c !== hr && c !== Dr) {
							l += f + c, f = "";
							continue;
						}
						for (; c === mr || c === hr;) f += c, c = t.charAt(++i);
						if (!a && l && !f && c === Dr) {
							l += c;
							continue;
						}
						for (; c === Dr;) f += c, c = t.charAt(++i);
						for (; c === mr || c === hr;) f += c, c = t.charAt(++i);
						i--;
					}
					return o.column += s.length, o.offset += s.length, s += l + f, e(s)({
						type: "heading",
						depth: h,
						children: n.tokenizeInline(l, o)
					});
				}
			}
		}
	});
	ml = q((iT, hl) => {
		"use strict";
		hl.exports = S1;
		var w1 = "	", C1 = `
`, pl = " ", y1 = "*", v1 = "-", A1 = "_", T1 = 3;
		function S1(e, t, r) {
			for (var n = -1, a = t.length + 1, u = "", i, o, s, l; ++n < a && (i = t.charAt(n), !(i !== w1 && i !== pl));) u += i;
			if (!(i !== y1 && i !== v1 && i !== A1)) for (o = i, u += i, s = 1, l = ""; ++n < a;) if (i = t.charAt(n), i === o) s++, u += l + o, l = "";
			else if (i === pl) l += i;
			else return s >= T1 && (!i || i === C1) ? (u += l, r ? !0 : e(u)({ type: "thematicBreak" })) : void 0;
		}
	});
	ra = q((aT, dl) => {
		"use strict";
		dl.exports = B1;
		var Dl = "	", L1 = " ", I1 = 1, q1 = 4;
		function B1(e) {
			for (var t = 0, r = 0, n = e.charAt(t), a = {}, u, i = 0; n === Dl || n === L1;) {
				for (u = n === Dl ? q1 : I1, r += u, u > 1 && (r = Math.floor(r / u) * u); i < r;) a[++i] = t;
				n = e.charAt(++t);
			}
			return {
				indent: r,
				stops: a
			};
		}
	});
	kl = q((uT, xl) => {
		"use strict";
		var _1 = Et(), P1 = ln(), O1 = ra();
		xl.exports = M1;
		var gl = `
`, N1 = " ", R1 = "!";
		function M1(e, t) {
			var r = e.split(gl), n = r.length + 1, a = Infinity, u = [], i, o, s;
			for (r.unshift(P1(N1, t) + R1); n--;) if (o = O1(r[n]), u[n] = o.stops, _1(r[n]).length !== 0) if (o.indent) o.indent > 0 && o.indent < a && (a = o.indent);
			else {
				a = Infinity;
				break;
			}
			if (a !== Infinity) for (n = r.length; n--;) {
				for (s = u[n], i = a; i && !(i in s);) i--;
				r[n] = r[n].slice(s[i] + 1);
			}
			return r.shift(), r.join(gl);
		}
	});
	yl = q((oT, Cl) => {
		"use strict";
		var z1 = Et(), U1 = ln(), Fl = bt(), H1 = ra(), V1 = kl(), G1 = fn();
		Cl.exports = X1;
		var na = "*", W1 = "_", bl = "+", ia = "-", El = ".", We = " ", _e = `
`, pn = "	", wl = ")", Y1 = "x", ut = 4, j1 = /\n\n(?!\s*$)/, $1 = /^\[([ X\tx])][ \t]/, K1 = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/, Q1 = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/, J1 = /^( {1,4}|\t)?/gm;
		function X1(e, t, r) {
			for (var n = this, a = n.options.commonmark, u = n.options.pedantic, i = n.blockTokenizers, o = n.interruptList, s = 0, l = t.length, c = null, f, h, m, D, x, g, k, E, C, S, w, d, v, L, y, b, _, I, T, R = !1, O, z, N, W; s < l && (D = t.charAt(s), !(D !== pn && D !== We));) s++;
			if (D = t.charAt(s), D === na || D === bl || D === ia) x = D, m = !1;
			else {
				for (m = !0, h = ""; s < l && (D = t.charAt(s), !!Fl(D));) h += D, s++;
				if (D = t.charAt(s), !h || !(D === El || a && D === wl) || r && h !== "1") return;
				c = parseInt(h, 10), x = D;
			}
			if (D = t.charAt(++s), !(D !== We && D !== pn && (u || D !== _e && D !== ""))) {
				if (r) return !0;
				for (s = 0, L = [], y = [], b = []; s < l;) {
					for (g = t.indexOf(_e, s), k = s, E = !1, W = !1, g === -1 && (g = l), f = 0; s < l;) {
						if (D = t.charAt(s), D === pn) f += ut - f % ut;
						else if (D === We) f++;
						else break;
						s++;
					}
					if (_ && f >= _.indent && (W = !0), D = t.charAt(s), C = null, !W) {
						if (D === na || D === bl || D === ia) C = D, s++, f++;
						else {
							for (h = ""; s < l && (D = t.charAt(s), !!Fl(D));) h += D, s++;
							D = t.charAt(s), s++, h && (D === El || a && D === wl) && (C = D, f += h.length + 1);
						}
						if (C) if (D = t.charAt(s), D === pn) f += ut - f % ut, s++;
						else if (D === We) {
							for (N = s + ut; s < N && t.charAt(s) === We;) s++, f++;
							s === N && t.charAt(s) === We && (s -= ut - 1, f -= ut - 1);
						} else D !== _e && D !== "" && (C = null);
					}
					if (C) {
						if (!u && x !== C) break;
						E = !0;
					} else !a && !W && t.charAt(k) === We ? W = !0 : a && _ && (W = f >= _.indent || f > ut), E = !1, s = k;
					if (w = t.slice(k, g), S = k === s ? w : t.slice(s, g), (C === na || C === W1 || C === ia) && i.thematicBreak.call(n, e, w, !0)) break;
					if (d = v, v = !E && !z1(S).length, W && _) _.value = _.value.concat(b, w), y = y.concat(b, w), b = [];
					else if (E) b.length !== 0 && (R = !0, _.value.push(""), _.trail = b.concat()), _ = {
						value: [w],
						indent: f,
						trail: []
					}, L.push(_), y = y.concat(b, w), b = [];
					else if (v) {
						if (d && !a) break;
						b.push(w);
					} else {
						if (d || G1(o, i, n, [
							e,
							w,
							!0
						])) break;
						_.value = _.value.concat(b, w), y = y.concat(b, w), b = [];
					}
					s = g + 1;
				}
				for (O = e(y.join(_e)).reset({
					type: "list",
					ordered: m,
					start: c,
					spread: R,
					children: []
				}), I = n.enterList(), T = n.enterBlock(), s = -1, l = L.length; ++s < l;) _ = L[s].value.join(_e), z = e.now(), e(_)(Z1(n, _, z), O), _ = L[s].trail.join(_e), s !== l - 1 && (_ += _e), e(_);
				return I(), T(), O;
			}
		}
		function Z1(e, t, r) {
			var n = e.offset, a = e.options.pedantic ? ek : tk, u = null, i, o;
			return t = a.apply(null, arguments), e.options.gfm && (i = t.match($1), i && (o = i[0].length, u = i[1].toLowerCase() === Y1, n[r.line] += o, t = t.slice(o))), {
				type: "listItem",
				spread: j1.test(t),
				checked: u,
				children: e.tokenizeBlock(t, r)
			};
		}
		function ek(e, t, r) {
			var n = e.offset, a = r.line;
			return t = t.replace(Q1, u), a = r.line, t.replace(J1, u);
			function u(i) {
				return n[a] = (n[a] || 0) + i.length, a++, "";
			}
		}
		function tk(e, t, r) {
			var n = e.offset, a = r.line, u, i, o, s, l, c, f;
			for (t = t.replace(K1, h), s = t.split(_e), l = V1(t, H1(u).indent).split(_e), l[0] = o, n[a] = (n[a] || 0) + i.length, a++, c = 0, f = s.length; ++c < f;) n[a] = (n[a] || 0) + s[c].length - l[c].length, a++;
			return l.join(_e);
			function h(m, D, x, g, k) {
				return i = D + x + g, o = k, Number(x) < 10 && i.length % 2 === 1 && (x = We + x), u = D + U1(We, x.length) + g, u + o;
			}
		}
	});
	Sl = q((sT, Tl) => {
		"use strict";
		Tl.exports = ok;
		var aa = `
`, rk = "	", vl = " ", Al = "=", nk = "-", ik = 3, ak = 1, uk = 2;
		function ok(e, t, r) {
			for (var n = this, a = e.now(), u = t.length, i = -1, o = "", s, l, c, f, h; ++i < u;) {
				if (c = t.charAt(i), c !== vl || i >= ik) {
					i--;
					break;
				}
				o += c;
			}
			for (s = "", l = ""; ++i < u;) {
				if (c = t.charAt(i), c === aa) {
					i--;
					break;
				}
				c === vl || c === rk ? l += c : (s += l + c, l = "");
			}
			if (a.column += o.length, a.offset += o.length, o += s + l, c = t.charAt(++i), f = t.charAt(++i), !(c !== aa || f !== Al && f !== nk)) {
				for (o += c, l = f, h = f === Al ? ak : uk; ++i < u;) {
					if (c = t.charAt(i), c !== f) {
						if (c !== aa) return;
						i--;
						break;
					}
					l += c;
				}
				return r ? !0 : e(o + l)({
					type: "heading",
					depth: h,
					children: n.tokenizeInline(s, a)
				});
			}
		}
	});
	oa = q((ua) => {
		"use strict";
		var Ll = "<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\u0000-\\u0020]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>", Il = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", mk = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", Dk = "<[?].*?[?]>", dk = "<![A-Za-z]+\\s+[^>]*>", gk = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
		ua.openCloseTag = new RegExp("^(?:" + Ll + "|" + Il + ")");
		ua.tag = new RegExp("^(?:" + Ll + "|" + Il + "|" + mk + "|" + Dk + "|" + dk + "|" + gk + ")");
	});
	Pl = q((cT, _l) => {
		"use strict";
		var xk = oa().openCloseTag;
		_l.exports = Bk;
		var kk = "	", Fk = " ", ql = `
`, bk = "<", Ek = /^<(script|pre|style)(?=(\s|>|$))/i, wk = /<\/(script|pre|style)>/i, Ck = /^<!--/, yk = /-->/, vk = /^<\?/, Ak = /\?>/, Tk = /^<![A-Za-z]/, Sk = />/, Lk = /^<!\[CDATA\[/, Ik = /]]>/, Bl = /^$/, qk = new RegExp(xk.source + "\\s*$");
		function Bk(e, t, r) {
			for (var a = this.options.blocks.join("|"), u = new RegExp("^</?(" + a + ")(?=(\\s|/?>|$))", "i"), i = t.length, o = 0, s, l, c, f, h, m, D, x = [
				[
					Ek,
					wk,
					!0
				],
				[
					Ck,
					yk,
					!0
				],
				[
					vk,
					Ak,
					!0
				],
				[
					Tk,
					Sk,
					!0
				],
				[
					Lk,
					Ik,
					!0
				],
				[
					u,
					Bl,
					!0
				],
				[
					qk,
					Bl,
					!1
				]
			]; o < i && (f = t.charAt(o), !(f !== kk && f !== Fk));) o++;
			if (t.charAt(o) === bk) {
				for (s = t.indexOf(ql, o + 1), s = s === -1 ? i : s, l = t.slice(o, s), c = -1, h = x.length; ++c < h;) if (x[c][0].test(l)) {
					m = x[c];
					break;
				}
				if (m) {
					if (r) return m[2];
					if (o = s, !m[1].test(l)) for (; o < i;) {
						if (s = t.indexOf(ql, o + 1), s = s === -1 ? i : s, l = t.slice(o + 1, s), m[1].test(l)) {
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
	Pe = q((fT, Ol) => {
		"use strict";
		Ol.exports = Ok;
		var _k = String.fromCharCode, Pk = /\s/;
		function Ok(e) {
			return Pk.test(typeof e == "number" ? _k(e) : e.charAt(0));
		}
	});
	hn = q((pT, Nl) => {
		"use strict";
		Nl.exports = Nk;
		function Nk(e) {
			return String(e).replace(/\s+/g, " ");
		}
	});
	sa = q((hT, Rl) => {
		"use strict";
		var Rk = hn();
		Rl.exports = Mk;
		function Mk(e) {
			return Rk(e).toLowerCase();
		}
	});
	Wl = q((mT, Gl) => {
		"use strict";
		var zk = Pe(), Uk = sa();
		Gl.exports = Wk;
		var Ml = "\"", zl = "'", Hk = "\\", Ut = `
`, mn = "	", Dn = " ", ca = "[", dr = "]", Vk = "(", Gk = ")", Ul = ":", Hl = "<", Vl = ">";
		function Wk(e, t, r) {
			for (var n = this, a = n.options.commonmark, u = 0, i = t.length, o = "", s, l, c, f, h, m, D, x; u < i && (f = t.charAt(u), !(f !== Dn && f !== mn));) o += f, u++;
			if (f = t.charAt(u), f === ca) {
				for (u++, o += f, c = ""; u < i && (f = t.charAt(u), f !== dr);) f === Hk && (c += f, u++, f = t.charAt(u)), c += f, u++;
				if (!(!c || t.charAt(u) !== dr || t.charAt(u + 1) !== Ul)) {
					for (m = c, o += c + dr + Ul, u = o.length, c = ""; u < i && (f = t.charAt(u), !(f !== mn && f !== Dn && f !== Ut));) o += f, u++;
					if (f = t.charAt(u), c = "", s = o, f === Hl) {
						for (u++; u < i && (f = t.charAt(u), !!la(f));) c += f, u++;
						if (f = t.charAt(u), f === la.delimiter) o += Hl + c + f, u++;
						else {
							if (a) return;
							u -= c.length + 1, c = "";
						}
					}
					if (!c) {
						for (; u < i && (f = t.charAt(u), !!Yk(f));) c += f, u++;
						o += c;
					}
					if (c) {
						for (D = c, c = ""; u < i && (f = t.charAt(u), !(f !== mn && f !== Dn && f !== Ut));) c += f, u++;
						if (f = t.charAt(u), h = null, f === Ml ? h = Ml : f === zl ? h = zl : f === Vk && (h = Gk), !h) c = "", u = o.length;
						else if (c) {
							for (o += c + f, u = o.length, c = ""; u < i && (f = t.charAt(u), f !== h);) {
								if (f === Ut) {
									if (u++, f = t.charAt(u), f === Ut || f === h) return;
									c += Ut;
								}
								c += f, u++;
							}
							if (f = t.charAt(u), f !== h) return;
							l = o, o += c + f, u++, x = c, c = "";
						} else return;
						for (; u < i && (f = t.charAt(u), !(f !== mn && f !== Dn));) o += f, u++;
						if (f = t.charAt(u), !f || f === Ut) return r ? !0 : (s = e(s).test().end, D = n.decode.raw(n.unescape(D), s, { nonTerminated: !1 }), x && (l = e(l).test().end, x = n.decode.raw(n.unescape(x), l)), e(o)({
							type: "definition",
							identifier: Uk(m),
							label: m,
							title: x || null,
							url: D
						}));
					}
				}
			}
		}
		function la(e) {
			return e !== Vl && e !== ca && e !== dr;
		}
		la.delimiter = Vl;
		function Yk(e) {
			return e !== ca && e !== dr && !zk(e);
		}
	});
	$l = q((DT, jl) => {
		"use strict";
		var jk = Pe();
		jl.exports = n0;
		var $k = "	", dn = `
`, Kk = " ", Qk = "-", Jk = ":", Xk = "\\", fa = "|", Zk = 1, e0 = 2, Yl = "left", t0 = "center", r0 = "right";
		function n0(e, t, r) {
			var n = this, a, u, i, o, s, l, c, f, h, m, D, x, g, k, E, C, S, w, d, v, L, y;
			if (n.options.gfm) {
				for (a = 0, C = 0, l = t.length + 1, c = []; a < l;) {
					if (v = t.indexOf(dn, a), L = t.indexOf(fa, a + 1), v === -1 && (v = t.length), L === -1 || L > v) {
						if (C < e0) return;
						break;
					}
					c.push(t.slice(a, v)), C++, a = v + 1;
				}
				for (o = c.join(dn), u = c.splice(1, 1)[0] || [], a = 0, l = u.length, C--, i = !1, D = []; a < l;) {
					if (h = u.charAt(a), h === fa) {
						if (m = null, i === !1) {
							if (y === !1) return;
						} else D.push(i), i = !1;
						y = !1;
					} else if (h === Qk) m = !0, i = i || null;
					else if (h === Jk) i === Yl ? i = t0 : m && i === null ? i = r0 : i = Yl;
					else if (!jk(h)) return;
					a++;
				}
				if (i !== !1 && D.push(i), !(D.length < Zk)) {
					if (r) return !0;
					for (E = -1, w = [], d = e(o).reset({
						type: "table",
						align: D,
						children: w
					}); ++E < C;) {
						for (S = c[E], s = {
							type: "tableRow",
							children: []
						}, E && e(dn), e(S).reset(s, d), l = S.length + 1, a = 0, f = "", x = "", g = !0; a < l;) {
							if (h = S.charAt(a), h === $k || h === Kk) {
								x ? f += h : e(h), a++;
								continue;
							}
							h === "" || h === fa ? g ? e(h) : ((x || h) && !g && (o = x, f.length > 1 && (h ? (o += f.slice(0, -1), f = f.charAt(f.length - 1)) : (o += f, f = "")), k = e.now(), e(o)({
								type: "tableCell",
								children: n.tokenizeInline(x, k)
							}, s)), e(f + h), f = "", x = "") : (f && (x += f, f = ""), x += h, h === Xk && a !== l - 2 && (x += S.charAt(a + 1), a++)), g = !1, a++;
						}
						E || e(dn + u);
					}
					return d;
				}
			}
		}
	});
	Jl = q((dT, Ql) => {
		"use strict";
		var i0 = Et(), a0 = Ji(), u0 = fn();
		Ql.exports = l0;
		var o0 = "	", gr = `
`, s0 = " ", Kl = 4;
		function l0(e, t, r) {
			for (var n = this, u = n.options.commonmark, i = n.blockTokenizers, o = n.interruptParagraph, s = t.indexOf(gr), l = t.length, c, f, h, m, D; s < l;) {
				if (s === -1) {
					s = l;
					break;
				}
				if (t.charAt(s + 1) === gr) break;
				if (u) {
					for (m = 0, c = s + 1; c < l;) {
						if (h = t.charAt(c), h === o0) {
							m = Kl;
							break;
						} else if (h === s0) m++;
						else break;
						c++;
					}
					if (m >= Kl && h !== gr) {
						s = t.indexOf(gr, s + 1);
						continue;
					}
				}
				if (f = t.slice(s + 1), u0(o, i, n, [
					e,
					f,
					!0
				])) break;
				if (c = s, s = t.indexOf(gr, s + 1), s !== -1 && i0(t.slice(c, s)) === "") {
					s = c;
					break;
				}
			}
			return f = t.slice(0, s), r ? !0 : (D = e.now(), f = a0(f), e(f)({
				type: "paragraph",
				children: n.tokenizeInline(f, D)
			}));
		}
	});
	Zl = q((gT, Xl) => {
		"use strict";
		Xl.exports = c0;
		function c0(e, t) {
			return e.indexOf("\\", t);
		}
	});
	nc = q((xT, rc) => {
		"use strict";
		var f0 = Zl();
		rc.exports = tc;
		tc.locator = f0;
		var p0 = `
`, ec = "\\";
		function tc(e, t, r) {
			var n = this, a, u;
			if (t.charAt(0) === ec && (a = t.charAt(1), n.escape.indexOf(a) !== -1)) return r ? !0 : (a === p0 ? u = { type: "break" } : u = {
				type: "text",
				value: a
			}, e(ec + a)(u));
		}
	});
	pa = q((kT, ic) => {
		"use strict";
		ic.exports = h0;
		function h0(e, t) {
			return e.indexOf("<", t);
		}
	});
	lc = q((FT, sc) => {
		"use strict";
		var ac = Pe(), m0 = fr(), D0 = pa();
		sc.exports = da;
		da.locator = D0;
		da.notInLink = !0;
		var uc = "<", ha = ">", oc = "@", ma = "/", Da = "mailto:", gn = Da.length;
		function da(e, t, r) {
			var n = this, a = "", u = t.length, i = 0, o = "", s = !1, l = "", c, f, h, m, D;
			if (t.charAt(0) === uc) {
				for (i++, a = uc; i < u && (c = t.charAt(i), !(ac(c) || c === ha || c === oc || c === ":" && t.charAt(i + 1) === ma));) o += c, i++;
				if (o) {
					if (l += o, o = "", c = t.charAt(i), l += c, i++, c === oc) s = !0;
					else {
						if (c !== ":" || t.charAt(i + 1) !== ma) return;
						l += ma, i++;
					}
					for (; i < u && (c = t.charAt(i), !(ac(c) || c === ha));) o += c, i++;
					if (c = t.charAt(i), !(!o || c !== ha)) return r ? !0 : (l += o, h = l, a += l + c, f = e.now(), f.column++, f.offset++, s && (l.slice(0, gn).toLowerCase() === Da ? (h = h.slice(gn), f.column += gn, f.offset += gn) : l = Da + l), m = n.inlineTokenizers, n.inlineTokenizers = { text: m.text }, D = n.enterLink(), h = n.tokenizeInline(h, f), n.inlineTokenizers = m, D(), e(a)({
						type: "link",
						title: null,
						url: m0(l, { nonTerminated: !1 }),
						children: h
					}));
				}
			}
		}
	});
	fc = q((bT, cc) => {
		"use strict";
		cc.exports = d0;
		function d0(e, t) {
			var r = String(e), n = 0, a;
			if (typeof t != "string") throw new Error("Expected character");
			for (a = r.indexOf(t); a !== -1;) n++, a = r.indexOf(t, a + t.length);
			return n;
		}
	});
	mc = q((ET, hc) => {
		"use strict";
		hc.exports = g0;
		var pc = [
			"www.",
			"http://",
			"https://"
		];
		function g0(e, t) {
			var r = -1, n, a, u;
			if (!this.options.gfm) return r;
			for (a = pc.length, n = -1; ++n < a;) u = e.indexOf(pc[n], t), u !== -1 && (r === -1 || u < r) && (r = u);
			return r;
		}
	});
	kc = q((wT, xc) => {
		"use strict";
		var Dc = fc(), x0 = fr(), k0 = bt(), ga = Ot(), F0 = Pe(), b0 = mc();
		xc.exports = ka;
		ka.locator = b0;
		ka.notInLink = !0;
		var E0 = 33, w0 = 38, C0 = 41, y0 = 42, v0 = 44, A0 = 45, xa = 46, T0 = 58, S0 = 59, L0 = 63, I0 = 60, dc = 95, q0 = 126, B0 = "(", gc = ")";
		function ka(e, t, r) {
			var n = this, a = n.options.gfm, u = n.inlineTokenizers, i = t.length, o = -1, s = !1, l, c, f, h, m, D, x, g, k, E, C, S, w, d;
			if (a) {
				if (t.slice(0, 4) === "www.") s = !0, h = 4;
				else if (t.slice(0, 7).toLowerCase() === "http://") h = 7;
				else if (t.slice(0, 8).toLowerCase() === "https://") h = 8;
				else return;
				for (o = h - 1, f = h, l = []; h < i;) {
					if (x = t.charCodeAt(h), x === xa) {
						if (o === h - 1) break;
						l.push(h), o = h, h++;
						continue;
					}
					if (k0(x) || ga(x) || x === A0 || x === dc) {
						h++;
						continue;
					}
					break;
				}
				if (x === xa && (l.pop(), h--), l[0] !== void 0 && (c = l.length < 2 ? f : l[l.length - 2] + 1, t.slice(c, h).indexOf("_") === -1)) {
					if (r) return !0;
					for (g = h, m = h; h < i && (x = t.charCodeAt(h), !(F0(x) || x === I0));) h++, x === E0 || x === y0 || x === v0 || x === xa || x === T0 || x === L0 || x === dc || x === q0 || (g = h);
					if (h = g, t.charCodeAt(h - 1) === C0) for (D = t.slice(m, h), k = Dc(D, B0), E = Dc(D, gc); E > k;) h = m + D.lastIndexOf(gc), D = t.slice(m, h), E--;
					if (t.charCodeAt(h - 1) === S0 && (h--, ga(t.charCodeAt(h - 1)))) {
						for (g = h - 2; ga(t.charCodeAt(g));) g--;
						t.charCodeAt(g) === w0 && (h = g);
					}
					return C = t.slice(0, h), w = x0(C, { nonTerminated: !1 }), s && (w = "http://" + w), d = n.enterLink(), n.inlineTokenizers = { text: u.text }, S = n.tokenizeInline(C, e.now()), n.inlineTokenizers = u, d(), e(C)({
						type: "link",
						title: null,
						url: w,
						children: S
					});
				}
			}
		}
	});
	wc = q((CT, Ec) => {
		"use strict";
		var _0 = bt(), P0 = Ot(), O0 = 43, N0 = 45, R0 = 46, M0 = 95;
		Ec.exports = bc;
		function bc(e, t) {
			var r = this, n, a;
			if (!this.options.gfm || (n = e.indexOf("@", t), n === -1)) return -1;
			if (a = n, a === t || !Fc(e.charCodeAt(a - 1))) return bc.call(r, e, n + 1);
			for (; a > t && Fc(e.charCodeAt(a - 1));) a--;
			return a;
		}
		function Fc(e) {
			return _0(e) || P0(e) || e === O0 || e === N0 || e === R0 || e === M0;
		}
	});
	Ac = q((yT, vc) => {
		"use strict";
		var z0 = fr(), Cc = bt(), yc = Ot(), U0 = wc();
		vc.exports = Ea;
		Ea.locator = U0;
		Ea.notInLink = !0;
		var H0 = 43, Fa = 45, xn = 46, V0 = 64, ba = 95;
		function Ea(e, t, r) {
			var n = this, a = n.options.gfm, u = n.inlineTokenizers, i = 0, o = t.length, s = -1, l, c, f, h;
			if (a) {
				for (l = t.charCodeAt(i); Cc(l) || yc(l) || l === H0 || l === Fa || l === xn || l === ba;) l = t.charCodeAt(++i);
				if (i !== 0 && l === V0) {
					for (i++; i < o;) {
						if (l = t.charCodeAt(i), Cc(l) || yc(l) || l === Fa || l === xn || l === ba) {
							i++, s === -1 && l === xn && (s = i);
							continue;
						}
						break;
					}
					if (!(s === -1 || s === i || l === Fa || l === ba)) return l === xn && i--, c = t.slice(0, i), r ? !0 : (h = n.enterLink(), n.inlineTokenizers = { text: u.text }, f = n.tokenizeInline(c, e.now()), n.inlineTokenizers = u, h(), e(c)({
						type: "link",
						title: null,
						url: "mailto:" + z0(c, { nonTerminated: !1 }),
						children: f
					}));
				}
			}
		}
	});
	Lc = q((vT, Sc) => {
		"use strict";
		var G0 = Ot(), W0 = pa(), Y0 = oa().tag;
		Sc.exports = Tc;
		Tc.locator = W0;
		var j0 = "<", $0 = "?", K0 = "!", Q0 = "/", J0 = /^<a /i, X0 = /^<\/a>/i;
		function Tc(e, t, r) {
			var n = this, a = t.length, u, i;
			if (!(t.charAt(0) !== j0 || a < 3) && (u = t.charAt(1), !(!G0(u) && u !== $0 && u !== K0 && u !== Q0) && (i = t.match(Y0), !!i))) return r ? !0 : (i = i[0], !n.inLink && J0.test(i) ? n.inLink = !0 : n.inLink && X0.test(i) && (n.inLink = !1), e(i)({
				type: "html",
				value: i
			}));
		}
	});
	wa = q((AT, Ic) => {
		"use strict";
		Ic.exports = Z0;
		function Z0(e, t) {
			var r = e.indexOf("[", t), n = e.indexOf("![", t);
			return n === -1 || r < n ? r : n;
		}
	});
	Rc = q((TT, Nc) => {
		"use strict";
		var xr = Pe(), eF = wa();
		Nc.exports = Oc;
		Oc.locator = eF;
		var tF = `
`, rF = "!", qc = "\"", Bc = "'", Ht = "(", kr = ")", Ca = "<", ya = ">", _c = "[", Fr = "\\", nF = "]", Pc = "`";
		function Oc(e, t, r) {
			var n = this, a = "", u = 0, i = t.charAt(0), o = n.options.pedantic, s = n.options.commonmark, l = n.options.gfm, c, f, h, m, D, x, g, k, E, C, S, w, d, v, L, y, b, _;
			if (i === rF && (k = !0, a = i, i = t.charAt(++u)), i === _c && !(!k && n.inLink)) {
				for (a += i, v = "", u++, S = t.length, y = e.now(), d = 0, y.column += u, y.offset += u; u < S;) {
					if (i = t.charAt(u), x = i, i === Pc) {
						for (f = 1; t.charAt(u + 1) === Pc;) x += i, u++, f++;
						h ? f >= h && (h = 0) : h = f;
					} else if (i === Fr) u++, x += t.charAt(u);
					else if ((!h || l) && i === _c) d++;
					else if ((!h || l) && i === nF) if (d) d--;
					else {
						if (t.charAt(u + 1) !== Ht) return;
						x += Ht, c = !0, u++;
						break;
					}
					v += x, x = "", u++;
				}
				if (c) {
					for (E = v, a += v + x, u++; u < S && (i = t.charAt(u), !!xr(i));) a += i, u++;
					if (i = t.charAt(u), v = "", m = a, i === Ca) {
						for (u++, m += Ca; u < S && (i = t.charAt(u), i !== ya);) {
							if (s && i === tF) return;
							v += i, u++;
						}
						if (t.charAt(u) !== ya) return;
						a += Ca + v + ya, L = v, u++;
					} else {
						for (i = null, x = ""; u < S && (i = t.charAt(u), !(x && (i === qc || i === Bc || s && i === Ht)));) {
							if (xr(i)) {
								if (!o) break;
								x += i;
							} else {
								if (i === Ht) d++;
								else if (i === kr) {
									if (d === 0) break;
									d--;
								}
								v += x, x = "", i === Fr && (v += Fr, i = t.charAt(++u)), v += i;
							}
							u++;
						}
						a += v, L = v, u = a.length;
					}
					for (v = ""; u < S && (i = t.charAt(u), !!xr(i));) v += i, u++;
					if (i = t.charAt(u), a += v, v && (i === qc || i === Bc || s && i === Ht)) if (u++, a += i, v = "", C = i === Ht ? kr : i, D = a, s) {
						for (; u < S && (i = t.charAt(u), i !== C);) i === Fr && (v += Fr, i = t.charAt(++u)), u++, v += i;
						if (i = t.charAt(u), i !== C) return;
						for (w = v, a += v + i, u++; u < S && (i = t.charAt(u), !!xr(i));) a += i, u++;
					} else for (x = ""; u < S;) {
						if (i = t.charAt(u), i === C) g && (v += C + x, x = ""), g = !0;
						else if (!g) v += i;
						else if (i === kr) {
							a += v + C + x, w = v;
							break;
						} else xr(i) ? x += i : (v += C + x + i, x = "", g = !1);
						u++;
					}
					if (t.charAt(u) === kr) return r ? !0 : (a += kr, L = n.decode.raw(n.unescape(L), e(m).test().end, { nonTerminated: !1 }), w && (D = e(D).test().end, w = n.decode.raw(n.unescape(w), D)), _ = {
						type: k ? "image" : "link",
						title: w || null,
						url: L
					}, k ? _.alt = n.decode.raw(n.unescape(E), y) || null : (b = n.enterLink(), _.children = n.tokenizeInline(E, y), b()), e(a)(_));
				}
			}
		}
	});
	Uc = q((ST, zc) => {
		"use strict";
		var iF = Pe(), aF = wa(), uF = sa();
		zc.exports = Mc;
		Mc.locator = aF;
		var va = "link", oF = "image", sF = "shortcut", lF = "collapsed", Aa = "full", cF = "!", kn = "[", Fn = "\\", bn = "]";
		function Mc(e, t, r) {
			var n = this, a = n.options.commonmark, u = t.charAt(0), i = 0, o = t.length, s = "", l = "", c = va, f = sF, h, m, D, x, g, k, E, C;
			if (u === cF && (c = oF, l = u, u = t.charAt(++i)), u === kn) {
				for (i++, l += u, k = "", C = 0; i < o;) {
					if (u = t.charAt(i), u === kn) E = !0, C++;
					else if (u === bn) {
						if (!C) break;
						C--;
					}
					u === Fn && (k += Fn, u = t.charAt(++i)), k += u, i++;
				}
				if (s = k, h = k, u = t.charAt(i), u === bn) {
					if (i++, s += u, k = "", !a) for (; i < o && (u = t.charAt(i), !!iF(u));) k += u, i++;
					if (u = t.charAt(i), u === kn) {
						for (m = "", k += u, i++; i < o && (u = t.charAt(i), !(u === kn || u === bn));) u === Fn && (m += Fn, u = t.charAt(++i)), m += u, i++;
						u = t.charAt(i), u === bn ? (f = m ? Aa : lF, k += m + u, i++) : m = "", s += k, k = "";
					} else {
						if (!h) return;
						m = h;
					}
					if (!(f !== Aa && E)) return s = l + s, c === va && n.inLink ? null : r ? !0 : (D = e.now(), D.column += l.length, D.offset += l.length, m = f === Aa ? m : h, x = {
						type: c + "Reference",
						identifier: uF(m),
						label: m,
						referenceType: f
					}, c === va ? (g = n.enterLink(), x.children = n.tokenizeInline(h, D), g()) : x.alt = n.decode.raw(n.unescape(h), D) || null, e(s)(x));
				}
			}
		}
	});
	Vc = q((LT, Hc) => {
		"use strict";
		Hc.exports = fF;
		function fF(e, t) {
			var r = e.indexOf("**", t), n = e.indexOf("__", t);
			return n === -1 ? r : r === -1 || n < r ? n : r;
		}
	});
	jc = q((IT, Yc) => {
		"use strict";
		var pF = Et(), Gc = Pe(), hF = Vc();
		Yc.exports = Wc;
		Wc.locator = hF;
		var mF = "\\", DF = "*", dF = "_";
		function Wc(e, t, r) {
			var n = this, a = 0, u = t.charAt(a), i, o, s, l, c, f, h;
			if (!(u !== DF && u !== dF || t.charAt(++a) !== u) && (o = n.options.pedantic, s = u, c = s + s, f = t.length, a++, l = "", u = "", !(o && Gc(t.charAt(a))))) for (; a < f;) {
				if (h = u, u = t.charAt(a), u === s && t.charAt(a + 1) === s && (!o || !Gc(h)) && (u = t.charAt(a + 2), u !== s)) return pF(l) ? r ? !0 : (i = e.now(), i.column += 2, i.offset += 2, e(c + l + c)({
					type: "strong",
					children: n.tokenizeInline(l, i)
				})) : void 0;
				!o && u === mF && (l += u, u = t.charAt(++a)), l += u, a++;
			}
		}
	});
	Kc = q((qT, $c) => {
		"use strict";
		$c.exports = kF;
		var gF = String.fromCharCode, xF = /\w/;
		function kF(e) {
			return xF.test(typeof e == "number" ? gF(e) : e.charAt(0));
		}
	});
	Jc = q((BT, Qc) => {
		"use strict";
		Qc.exports = FF;
		function FF(e, t) {
			var r = e.indexOf("*", t), n = e.indexOf("_", t);
			return n === -1 ? r : r === -1 || n < r ? n : r;
		}
	});
	rf = q((_T, tf) => {
		"use strict";
		var bF = Et(), EF = Kc(), Xc = Pe(), wF = Jc();
		tf.exports = ef;
		ef.locator = wF;
		var CF = "*", Zc = "_", yF = "\\";
		function ef(e, t, r) {
			var n = this, a = 0, u = t.charAt(a), i, o, s, l, c, f, h;
			if (!(u !== CF && u !== Zc) && (o = n.options.pedantic, c = u, s = u, f = t.length, a++, l = "", u = "", !(o && Xc(t.charAt(a))))) for (; a < f;) {
				if (h = u, u = t.charAt(a), u === s && (!o || !Xc(h))) {
					if (u = t.charAt(++a), u !== s) {
						if (!bF(l) || h === s) return;
						if (!o && s === Zc && EF(u)) {
							l += s;
							continue;
						}
						return r ? !0 : (i = e.now(), i.column++, i.offset++, e(c + l + s)({
							type: "emphasis",
							children: n.tokenizeInline(l, i)
						}));
					}
					l += s;
				}
				!o && u === yF && (l += u, u = t.charAt(++a)), l += u, a++;
			}
		}
	});
	af = q((PT, nf) => {
		"use strict";
		nf.exports = vF;
		function vF(e, t) {
			return e.indexOf("~~", t);
		}
	});
	cf = q((OT, lf) => {
		"use strict";
		var uf = Pe(), AF = af();
		lf.exports = sf;
		sf.locator = AF;
		var En = "~", of = "~~";
		function sf(e, t, r) {
			var n = this, a = "", u = "", i = "", o = "", s, l, c;
			if (!(!n.options.gfm || t.charAt(0) !== En || t.charAt(1) !== En || uf(t.charAt(2)))) for (s = 1, l = t.length, c = e.now(), c.column += 2, c.offset += 2; ++s < l;) {
				if (a = t.charAt(s), a === En && u === En && (!i || !uf(i))) return r ? !0 : e(of + o + of)({
					type: "delete",
					children: n.tokenizeInline(o, c)
				});
				o += u, i = u, u = a;
			}
		}
	});
	pf = q((NT, ff) => {
		"use strict";
		ff.exports = TF;
		function TF(e, t) {
			return e.indexOf("`", t);
		}
	});
	Df = q((RT, mf) => {
		"use strict";
		var SF = pf();
		mf.exports = hf;
		hf.locator = SF;
		var Ta = 10, Sa = 32, La = 96;
		function hf(e, t, r) {
			for (var n = t.length, a = 0, u, i, o, s, l, c; a < n && t.charCodeAt(a) === La;) a++;
			if (!(a === 0 || a === n)) {
				for (u = a, l = t.charCodeAt(a); a < n;) {
					if (s = l, l = t.charCodeAt(a + 1), s === La) {
						if (i === void 0 && (i = a), o = a + 1, l !== La && o - i === u) {
							c = !0;
							break;
						}
					} else i !== void 0 && (i = void 0, o = void 0);
					a++;
				}
				if (c) {
					if (r) return !0;
					if (a = u, n = i, s = t.charCodeAt(a), l = t.charCodeAt(n - 1), c = !1, n - a > 2 && (s === Sa || s === Ta) && (l === Sa || l === Ta)) {
						for (a++, n--; a < n;) {
							if (s = t.charCodeAt(a), s !== Sa && s !== Ta) {
								c = !0;
								break;
							}
							a++;
						}
						c === !0 && (u++, i--);
					}
					return e(t.slice(0, o))({
						type: "inlineCode",
						value: t.slice(u, i)
					});
				}
			}
		}
	});
	gf = q((MT, df) => {
		"use strict";
		df.exports = LF;
		function LF(e, t) {
			for (var r = e.indexOf(`
`, t); r > t && e.charAt(r - 1) === " ";) r--;
			return r;
		}
	});
	Ff = q((zT, kf) => {
		"use strict";
		var IF = gf();
		kf.exports = xf;
		xf.locator = IF;
		var qF = " ", BF = `
`, _F = 2;
		function xf(e, t, r) {
			for (var n = t.length, a = -1, u = "", i; ++a < n;) {
				if (i = t.charAt(a), i === BF) return a < _F ? void 0 : r ? !0 : (u += i, e(u)({ type: "break" }));
				if (i !== qF) return;
				u += i;
			}
		}
	});
	Ef = q((UT, bf) => {
		"use strict";
		bf.exports = PF;
		function PF(e, t, r) {
			var n = this, a, u, i, o, s, l, c, f, h, m;
			if (r) return !0;
			for (a = n.inlineMethods, o = a.length, u = n.inlineTokenizers, i = -1, h = t.length; ++i < o;) f = a[i], !(f === "text" || !u[f]) && (c = u[f].locator, c || e.file.fail("Missing locator: `" + f + "`"), l = c.call(n, t, 1), l !== -1 && l < h && (h = l));
			s = t.slice(0, h), m = e.now(), n.decode(s, m, D);
			function D(x, g, k) {
				e(k || x)({
					type: "text",
					value: x
				});
			}
		}
	});
	vf = q((HT, yf) => {
		"use strict";
		var OF = Ft(), wn = Uo(), NF = Vo(), RF = Wo(), MF = ks(), Ia = Es();
		yf.exports = wf;
		function wf(e, t) {
			this.file = t, this.offset = {}, this.options = OF(this.options), this.setOptions({}), this.inList = !1, this.inBlock = !1, this.inLink = !1, this.atStart = !0, this.toOffset = NF(t).toOffset, this.unescape = RF(this, "escape"), this.decode = MF(this);
		}
		var ue = wf.prototype;
		ue.setOptions = Ls();
		ue.parse = Ys();
		ue.options = $i();
		ue.exitStart = wn("atStart", !0);
		ue.enterList = wn("inList", !1);
		ue.enterLink = wn("inLink", !1);
		ue.enterBlock = wn("inBlock", !1);
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
			blankLine: $s(),
			indentedCode: Zs(),
			fencedCode: rl(),
			blockquote: sl(),
			atxHeading: fl(),
			thematicBreak: ml(),
			list: yl(),
			setextHeading: Sl(),
			html: Pl(),
			definition: Wl(),
			table: $l(),
			paragraph: Jl()
		};
		ue.inlineTokenizers = {
			escape: nc(),
			autoLink: lc(),
			url: kc(),
			email: Ac(),
			html: Lc(),
			link: Rc(),
			reference: Uc(),
			strong: jc(),
			emphasis: rf(),
			deletion: cf(),
			code: Df(),
			break: Ff(),
			text: Ef()
		};
		ue.blockMethods = Cf(ue.blockTokenizers);
		ue.inlineMethods = Cf(ue.inlineTokenizers);
		ue.tokenizeBlock = Ia("block");
		ue.tokenizeInline = Ia("inline");
		ue.tokenizeFactory = Ia;
		function Cf(e) {
			var t = [], r;
			for (r in e) t.push(r);
			return t;
		}
	});
	Lf = q((VT, Sf) => {
		"use strict";
		var zF = Mo(), UF = Ft(), Af = vf();
		Sf.exports = Tf;
		Tf.Parser = Af;
		function Tf(e) {
			var t = this.data("settings"), r = zF(Af);
			r.prototype.options = UF(r.prototype.options, t, e), this.Parser = r;
		}
	});
	qf = q((GT, If) => {
		"use strict";
		If.exports = HF;
		function HF(e) {
			if (e) throw e;
		}
	});
	qa = q((WT, Bf) => {
		Bf.exports = function(t) {
			return t != null && t.constructor != null && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
		};
	});
	Hf = q((YT, Uf) => {
		"use strict";
		var Cn = Object.prototype.hasOwnProperty, zf = Object.prototype.toString, _f = Object.defineProperty, Pf = Object.getOwnPropertyDescriptor, Of = function(t) {
			return typeof Array.isArray == "function" ? Array.isArray(t) : zf.call(t) === "[object Array]";
		}, Nf = function(t) {
			if (!t || zf.call(t) !== "[object Object]") return !1;
			var r = Cn.call(t, "constructor"), n = t.constructor && t.constructor.prototype && Cn.call(t.constructor.prototype, "isPrototypeOf");
			if (t.constructor && !r && !n) return !1;
			var a;
			for (a in t);
			return typeof a > "u" || Cn.call(t, a);
		}, Rf = function(t, r) {
			_f && r.name === "__proto__" ? _f(t, r.name, {
				enumerable: !0,
				configurable: !0,
				value: r.newValue,
				writable: !0
			}) : t[r.name] = r.newValue;
		}, Mf = function(t, r) {
			if (r === "__proto__") if (Cn.call(t, r)) {
				if (Pf) return Pf(t, r).value;
			} else return;
			return t[r];
		};
		Uf.exports = function e() {
			var t, r, n, a, u, i, o = arguments[0], s = 1, l = arguments.length, c = !1;
			for (typeof o == "boolean" && (c = o, o = arguments[1] || {}, s = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); s < l; ++s) if (t = arguments[s], t != null) for (r in t) n = Mf(o, r), a = Mf(t, r), o !== a && (c && a && (Nf(a) || (u = Of(a))) ? (u ? (u = !1, i = n && Of(n) ? n : []) : i = n && Nf(n) ? n : {}, Rf(o, {
				name: r,
				newValue: e(c, i, a)
			})) : typeof a < "u" && Rf(o, {
				name: r,
				newValue: a
			}));
			return o;
		};
	});
	Gf = q((jT, Vf) => {
		"use strict";
		Vf.exports = (e) => {
			if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
			let t = Object.getPrototypeOf(e);
			return t === null || t === Object.prototype;
		};
	});
	Yf = q(($T, Wf) => {
		"use strict";
		var VF = [].slice;
		Wf.exports = GF;
		function GF(e, t) {
			var r;
			return n;
			function n() {
				var i = VF.call(arguments, 0), o = e.length > i.length, s;
				o && i.push(a);
				try {
					s = e.apply(null, i);
				} catch (l) {
					if (o && r) throw l;
					return a(l);
				}
				o || (s && typeof s.then == "function" ? s.then(u, a) : s instanceof Error ? a(s) : u(s));
			}
			function a() {
				r || (r = !0, t.apply(null, arguments));
			}
			function u(i) {
				a(null, i);
			}
		}
	});
	Jf = q((KT, Qf) => {
		"use strict";
		var $f = Yf();
		Qf.exports = Kf;
		Kf.wrap = $f;
		var jf = [].slice;
		function Kf() {
			var e = [], t = {};
			return t.run = r, t.use = n, t;
			function r() {
				var a = -1, u = jf.call(arguments, 0, -1), i = arguments[arguments.length - 1];
				if (typeof i != "function") throw new Error("Expected function as last argument, not " + i);
				o.apply(null, [null].concat(u));
				function o(s) {
					var l = e[++a], f = jf.call(arguments, 0).slice(1), h = u.length, m = -1;
					if (s) {
						i(s);
						return;
					}
					for (; ++m < h;) (f[m] === null || f[m] === void 0) && (f[m] = u[m]);
					u = f, l ? $f(l, o).apply(null, u) : i.apply(null, [null].concat(u));
				}
			}
			function n(a) {
				if (typeof a != "function") throw new Error("Expected `fn` to be a function, not " + a);
				return e.push(a), t;
			}
		}
	});
	tp = q((QT, ep) => {
		"use strict";
		var Vt = {}.hasOwnProperty;
		ep.exports = WF;
		function WF(e) {
			return !e || typeof e != "object" ? "" : Vt.call(e, "position") || Vt.call(e, "type") ? Xf(e.position) : Vt.call(e, "start") || Vt.call(e, "end") ? Xf(e) : Vt.call(e, "line") || Vt.call(e, "column") ? Ba(e) : "";
		}
		function Ba(e) {
			return (!e || typeof e != "object") && (e = {}), Zf(e.line) + ":" + Zf(e.column);
		}
		function Xf(e) {
			return (!e || typeof e != "object") && (e = {}), Ba(e.start) + "-" + Ba(e.end);
		}
		function Zf(e) {
			return e && typeof e == "number" ? e : 1;
		}
	});
	ip = q((JT, np) => {
		"use strict";
		var YF = tp();
		np.exports = _a;
		function rp() {}
		rp.prototype = Error.prototype;
		_a.prototype = new rp();
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
			var n, a, u;
			typeof t == "string" && (r = t, t = null), n = jF(r), a = YF(t) || "1:1", u = {
				start: {
					line: null,
					column: null
				},
				end: {
					line: null,
					column: null
				}
			}, t && t.position && (t = t.position), t && (t.start ? (u = t, t = t.start) : u.start = t), e.stack && (this.stack = e.stack, e = e.message), this.message = e, this.name = a, this.reason = e, this.line = t ? t.line : null, this.column = t ? t.column : null, this.location = u, this.source = n[0], this.ruleId = n[1];
		}
		function jF(e) {
			var t = [null, null], r;
			return typeof e == "string" && (r = e.indexOf(":"), r === -1 ? t[1] = e : (t[0] = e.slice(0, r), t[1] = e.slice(r + 1))), t;
		}
	});
	ap = q((Gt) => {
		"use strict";
		Gt.basename = $F;
		Gt.dirname = KF;
		Gt.extname = QF;
		Gt.join = JF;
		Gt.sep = "/";
		function $F(e, t) {
			var r = 0, n = -1, a, u, i, o;
			if (t !== void 0 && typeof t != "string") throw new TypeError("\"ext\" argument must be a string");
			if (br(e), a = e.length, t === void 0 || !t.length || t.length > e.length) {
				for (; a--;) if (e.charCodeAt(a) === 47) {
					if (i) {
						r = a + 1;
						break;
					}
				} else n < 0 && (i = !0, n = a + 1);
				return n < 0 ? "" : e.slice(r, n);
			}
			if (t === e) return "";
			for (u = -1, o = t.length - 1; a--;) if (e.charCodeAt(a) === 47) {
				if (i) {
					r = a + 1;
					break;
				}
			} else u < 0 && (i = !0, u = a + 1), o > -1 && (e.charCodeAt(a) === t.charCodeAt(o--) ? o < 0 && (n = a) : (o = -1, n = u));
			return r === n ? n = u : n < 0 && (n = e.length), e.slice(r, n);
		}
		function KF(e) {
			var t, r, n;
			if (br(e), !e.length) return ".";
			for (t = -1, n = e.length; --n;) if (e.charCodeAt(n) === 47) {
				if (r) {
					t = n;
					break;
				}
			} else r || (r = !0);
			return t < 0 ? e.charCodeAt(0) === 47 ? "/" : "." : t === 1 && e.charCodeAt(0) === 47 ? "//" : e.slice(0, t);
		}
		function QF(e) {
			var t = -1, r = 0, n = -1, a = 0, u, i, o;
			for (br(e), o = e.length; o--;) {
				if (i = e.charCodeAt(o), i === 47) {
					if (u) {
						r = o + 1;
						break;
					}
					continue;
				}
				n < 0 && (u = !0, n = o + 1), i === 46 ? t < 0 ? t = o : a !== 1 && (a = 1) : t > -1 && (a = -1);
			}
			return t < 0 || n < 0 || a === 0 || a === 1 && t === n - 1 && t === r + 1 ? "" : e.slice(t, n);
		}
		function JF() {
			for (var e = -1, t; ++e < arguments.length;) br(arguments[e]), arguments[e] && (t = t === void 0 ? arguments[e] : t + "/" + arguments[e]);
			return t === void 0 ? "." : XF(t);
		}
		function XF(e) {
			var t, r;
			return br(e), t = e.charCodeAt(0) === 47, r = ZF(e, !t), !r.length && !t && (r = "."), r.length && e.charCodeAt(e.length - 1) === 47 && (r += "/"), t ? "/" + r : r;
		}
		function ZF(e, t) {
			for (var r = "", n = 0, a = -1, u = 0, i = -1, o, s; ++i <= e.length;) {
				if (i < e.length) o = e.charCodeAt(i);
				else {
					if (o === 47) break;
					o = 47;
				}
				if (o === 47) {
					if (!(a === i - 1 || u === 1)) if (a !== i - 1 && u === 2) {
						if (r.length < 2 || n !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
							if (r.length > 2) {
								if (s = r.lastIndexOf("/"), s !== r.length - 1) {
									s < 0 ? (r = "", n = 0) : (r = r.slice(0, s), n = r.length - 1 - r.lastIndexOf("/")), a = i, u = 0;
									continue;
								}
							} else if (r.length) {
								r = "", n = 0, a = i, u = 0;
								continue;
							}
						}
						t && (r = r.length ? r + "/.." : "..", n = 2);
					} else r.length ? r += "/" + e.slice(a + 1, i) : r = e.slice(a + 1, i), n = i - a - 1;
					a = i, u = 0;
				} else o === 46 && u > -1 ? u++ : u = -1;
			}
			return r;
		}
		function br(e) {
			if (typeof e != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
		}
	});
	op = q((up) => {
		"use strict";
		up.cwd = eb;
		function eb() {
			return "/";
		}
	});
	cp = q((e3, lp) => {
		"use strict";
		var Oe = ap(), tb = op(), rb = qa();
		lp.exports = Ye;
		var nb = {}.hasOwnProperty, Pa = [
			"history",
			"path",
			"basename",
			"stem",
			"extname",
			"dirname"
		];
		Ye.prototype.toString = mb;
		Object.defineProperty(Ye.prototype, "path", {
			get: ib,
			set: ab
		});
		Object.defineProperty(Ye.prototype, "dirname", {
			get: ub,
			set: ob
		});
		Object.defineProperty(Ye.prototype, "basename", {
			get: sb,
			set: lb
		});
		Object.defineProperty(Ye.prototype, "extname", {
			get: cb,
			set: fb
		});
		Object.defineProperty(Ye.prototype, "stem", {
			get: pb,
			set: hb
		});
		function Ye(e) {
			var t, r;
			if (!e) e = {};
			else if (typeof e == "string" || rb(e)) e = { contents: e };
			else if ("message" in e && "messages" in e) return e;
			if (!(this instanceof Ye)) return new Ye(e);
			for (this.data = {}, this.messages = [], this.history = [], this.cwd = tb.cwd(), r = -1; ++r < Pa.length;) t = Pa[r], nb.call(e, t) && (this[t] = e[t]);
			for (t in e) Pa.indexOf(t) < 0 && (this[t] = e[t]);
		}
		function ib() {
			return this.history[this.history.length - 1];
		}
		function ab(e) {
			Na(e, "path"), this.path !== e && this.history.push(e);
		}
		function ub() {
			return typeof this.path == "string" ? Oe.dirname(this.path) : void 0;
		}
		function ob(e) {
			sp(this.path, "dirname"), this.path = Oe.join(e || "", this.basename);
		}
		function sb() {
			return typeof this.path == "string" ? Oe.basename(this.path) : void 0;
		}
		function lb(e) {
			Na(e, "basename"), Oa(e, "basename"), this.path = Oe.join(this.dirname || "", e);
		}
		function cb() {
			return typeof this.path == "string" ? Oe.extname(this.path) : void 0;
		}
		function fb(e) {
			if (Oa(e, "extname"), sp(this.path, "extname"), e) {
				if (e.charCodeAt(0) !== 46) throw new Error("`extname` must start with `.`");
				if (e.indexOf(".", 1) > -1) throw new Error("`extname` cannot contain multiple dots");
			}
			this.path = Oe.join(this.dirname, this.stem + (e || ""));
		}
		function pb() {
			return typeof this.path == "string" ? Oe.basename(this.path, this.extname) : void 0;
		}
		function hb(e) {
			Na(e, "stem"), Oa(e, "stem"), this.path = Oe.join(this.dirname || "", e + (this.extname || ""));
		}
		function mb(e) {
			return (this.contents || "").toString(e);
		}
		function Oa(e, t) {
			if (e && e.indexOf(Oe.sep) > -1) throw new Error("`" + t + "` cannot be a path: did not expect `" + Oe.sep + "`");
		}
		function Na(e, t) {
			if (!e) throw new Error("`" + t + "` cannot be empty");
		}
		function sp(e, t) {
			if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
		}
	});
	pp = q((t3, fp) => {
		"use strict";
		var Db = ip(), yn = cp();
		fp.exports = yn;
		yn.prototype.message = db;
		yn.prototype.info = xb;
		yn.prototype.fail = gb;
		function db(e, t, r) {
			var n = new Db(e, t, r);
			return this.path && (n.name = this.path + ":" + n.name, n.file = this.path), n.fatal = !1, this.messages.push(n), n;
		}
		function gb() {
			var e = this.message.apply(this, arguments);
			throw e.fatal = !0, e;
		}
		function xb() {
			var e = this.message.apply(this, arguments);
			return e.fatal = null, e;
		}
	});
	mp = q((r3, hp) => {
		"use strict";
		hp.exports = pp();
	});
	wp = q((n3, Ep) => {
		"use strict";
		var Dp = qf(), kb = qa(), vn = Hf(), dp = Gf(), Fp = Jf(), Er = mp();
		Ep.exports = bp().freeze();
		var Fb = [].slice, bb = {}.hasOwnProperty, Eb = Fp().use(wb).use(Cb).use(yb);
		function wb(e, t) {
			t.tree = e.parse(t.file);
		}
		function Cb(e, t, r) {
			e.run(t.tree, t.file, n);
			function n(a, u, i) {
				a ? r(a) : (t.tree = u, t.file = i, r());
			}
		}
		function yb(e, t) {
			var r = e.stringify(t.tree, t.file);
			r == null || (typeof r == "string" || kb(r) ? ("value" in t.file && (t.file.value = r), t.file.contents = r) : t.file.result = r);
		}
		function bp() {
			var e = [], t = Fp(), r = {}, n = -1, a;
			return u.data = o, u.freeze = i, u.attachers = e, u.use = s, u.parse = c, u.stringify = m, u.run = f, u.runSync = h, u.process = D, u.processSync = x, u;
			function u() {
				for (var g = bp(), k = -1; ++k < e.length;) g.use.apply(null, e[k]);
				return g.data(vn(!0, {}, r)), g;
			}
			function i() {
				var g, k;
				if (a) return u;
				for (; ++n < e.length;) g = e[n], g[1] !== !1 && (g[1] === !0 && (g[1] = void 0), k = g[0].apply(u, g.slice(1)), typeof k == "function" && t.use(k));
				return a = !0, n = Infinity, u;
			}
			function o(g, k) {
				return typeof g == "string" ? arguments.length === 2 ? (za("data", a), r[g] = k, u) : bb.call(r, g) && r[g] || null : g ? (za("data", a), r = g, u) : r;
			}
			function s(g) {
				var k;
				if (za("use", a), g != null) if (typeof g == "function") w.apply(null, arguments);
				else if (typeof g == "object") "length" in g ? S(g) : E(g);
				else throw new Error("Expected usable value, not `" + g + "`");
				return k && (r.settings = vn(r.settings || {}, k)), u;
				function E(d) {
					S(d.plugins), d.settings && (k = vn(k || {}, d.settings));
				}
				function C(d) {
					if (typeof d == "function") w(d);
					else if (typeof d == "object") "length" in d ? w.apply(null, d) : E(d);
					else throw new Error("Expected usable value, not `" + d + "`");
				}
				function S(d) {
					var v = -1;
					if (d != null) if (typeof d == "object" && "length" in d) for (; ++v < d.length;) C(d[v]);
					else throw new Error("Expected a list of plugins, not `" + d + "`");
				}
				function w(d, v) {
					var L = l(d);
					L ? (dp(L[1]) && dp(v) && (v = vn(!0, L[1], v)), L[1] = v) : e.push(Fb.call(arguments));
				}
			}
			function l(g) {
				for (var k = -1; ++k < e.length;) if (e[k][0] === g) return e[k];
			}
			function c(g) {
				var k = Er(g), E;
				return i(), E = u.Parser, Ra("parse", E), gp(E, "parse") ? new E(String(k), k).parse() : E(String(k), k);
			}
			function f(g, k, E) {
				if (xp(g), i(), !E && typeof k == "function" && (E = k, k = null), !E) return new Promise(C);
				C(null, E);
				function C(S, w) {
					t.run(g, Er(k), d);
					function d(v, L, y) {
						L = L || g, v ? w(v) : S ? S(L) : E(null, L, y);
					}
				}
			}
			function h(g, k) {
				var E, C;
				return f(g, k, S), kp("runSync", "run", C), E;
				function S(w, d) {
					C = !0, E = d, Dp(w);
				}
			}
			function m(g, k) {
				var E = Er(k), C;
				return i(), C = u.Compiler, Ma("stringify", C), xp(g), gp(C, "compile") ? new C(g, E).compile() : C(g, E);
			}
			function D(g, k) {
				if (i(), Ra("process", u.Parser), Ma("process", u.Compiler), !k) return new Promise(E);
				E(null, k);
				function E(C, S) {
					var w = Er(g);
					Eb.run(u, { file: w }, d);
					function d(v) {
						v ? S(v) : C ? C(w) : k(null, w);
					}
				}
			}
			function x(g) {
				var k, E;
				return i(), Ra("processSync", u.Parser), Ma("processSync", u.Compiler), k = Er(g), D(k, C), kp("processSync", "process", E), k;
				function C(S) {
					E = !0, Dp(S);
				}
			}
		}
		function gp(e, t) {
			return typeof e == "function" && e.prototype && (vb(e.prototype) || t in e.prototype);
		}
		function vb(e) {
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
		function xp(e) {
			if (!e || typeof e.type != "string") throw new Error("Expected node, got `" + e + "`");
		}
		function kp(e, t, r) {
			if (!r) throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
		}
	});
	Zh = {};
	Pr(Zh, {
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
	Vn = {
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
		proseWrap: Vn.proseWrap,
		singleQuote: Vn.singleQuote
	};
	ru = {};
	Pr(ru, {
		markdown: () => hE,
		mdx: () => mE,
		remark: () => hE
	});
	pt = (e) => e.position.start.offset;
	ht = (e) => e.position.end.offset;
	tt = {
		horizontalTab: -2,
		virtualSpace: -1,
		nul: 0,
		eof: null,
		space: 32
	};
	Dm = {};
	$n = {
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
	gm = {}.hasOwnProperty;
	wu = {}.hasOwnProperty;
	K = rt(/[A-Za-z]/);
	Q = rt(/[\dA-Za-z]/);
	Cu = rt(/[#-'*+\--9=?A-Z^-~]/);
	er = rt(/\d/);
	yu = rt(/[\dA-Fa-f]/);
	vu = rt(/[!-/:-@[-`{-~]/);
	Dt = rt(/\p{P}|\p{S}/u);
	Ie = rt(/\s/);
	Au = { tokenize: Fm };
	Su = { tokenize: bm };
	Tu = { tokenize: Em };
	tr = {
		name: "attention",
		resolveAll: wm,
		tokenize: Cm
	};
	Kn = {
		name: "autolink",
		tokenize: ym
	};
	qe = {
		partial: !0,
		tokenize: vm
	};
	Rr = {
		continuation: { tokenize: Tm },
		exit: Sm,
		name: "blockQuote",
		tokenize: Am
	};
	Mr = {
		name: "characterEscape",
		tokenize: Lm
	};
	zr = {
		name: "characterReference",
		tokenize: Im
	};
	Iu = {
		partial: !0,
		tokenize: Bm
	};
	Ur = {
		concrete: !0,
		name: "codeFenced",
		tokenize: qm
	};
	rr = {
		name: "codeIndented",
		tokenize: Pm
	};
	_m = {
		partial: !0,
		tokenize: Om
	};
	Qn = {
		name: "codeText",
		previous: Rm,
		resolve: Nm,
		tokenize: Mm
	};
	Hr = class {
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
			let a = r || 0;
			this.setCursor(Math.trunc(t));
			let u = this.right.splice(this.right.length - a, Number.POSITIVE_INFINITY);
			return n && nr(this.left, n), u.reverse();
		}
		pop() {
			return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
		}
		push(t) {
			this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
		}
		pushMany(t) {
			this.setCursor(Number.POSITIVE_INFINITY), nr(this.left, t);
		}
		unshift(t) {
			this.setCursor(0), this.right.push(t);
		}
		unshiftMany(t) {
			this.setCursor(0), nr(this.right, t.reverse());
		}
		setCursor(t) {
			if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0)) if (t < this.left.length) {
				let r = this.left.splice(t, Number.POSITIVE_INFINITY);
				nr(this.right, r.reverse());
			} else {
				let r = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
				nr(this.left, r.reverse());
			}
		}
	};
	Jn = {
		resolve: Hm,
		tokenize: Vm
	};
	Um = {
		partial: !0,
		tokenize: Gm
	};
	Xn = {
		name: "definition",
		tokenize: Ym
	};
	Wm = {
		partial: !0,
		tokenize: jm
	};
	Zn = {
		name: "hardBreakEscape",
		tokenize: $m
	};
	ei = {
		name: "headingAtx",
		resolve: Km,
		tokenize: Qm
	};
	qu = [
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
	ti = [
		"pre",
		"script",
		"style",
		"textarea"
	];
	ri = {
		concrete: !0,
		name: "htmlFlow",
		resolveTo: Zm,
		tokenize: eD
	};
	Jm = {
		partial: !0,
		tokenize: rD
	};
	Xm = {
		partial: !0,
		tokenize: tD
	};
	ni = {
		name: "htmlText",
		tokenize: nD
	};
	gt = {
		name: "labelEnd",
		resolveAll: oD,
		resolveTo: sD,
		tokenize: lD
	};
	iD = { tokenize: cD };
	aD = { tokenize: fD };
	uD = { tokenize: pD };
	ii = {
		name: "labelStartImage",
		resolveAll: gt.resolveAll,
		tokenize: hD
	};
	ai = {
		name: "labelStartLink",
		resolveAll: gt.resolveAll,
		tokenize: mD
	};
	ir = {
		name: "lineEnding",
		tokenize: DD
	};
	xt = {
		name: "thematicBreak",
		tokenize: dD
	};
	pe = {
		continuation: { tokenize: FD },
		exit: ED,
		name: "list",
		tokenize: kD
	};
	gD = {
		partial: !0,
		tokenize: wD
	};
	xD = {
		partial: !0,
		tokenize: bD
	};
	jr = {
		name: "setextUnderline",
		resolveTo: CD,
		tokenize: yD
	};
	Bu = { tokenize: vD };
	_u = { resolveAll: Ru() };
	Pu = Nu("string");
	Ou = Nu("text");
	ui = {};
	Pr(ui, {
		attentionMarkers: () => PD,
		contentInitial: () => SD,
		disable: () => OD,
		document: () => TD,
		flow: () => ID,
		flowInitial: () => LD,
		insideSpan: () => _D,
		string: () => qD,
		text: () => BD
	});
	TD = {
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
		62: Rr
	};
	SD = { 91: Xn };
	LD = {
		[-2]: rr,
		[-1]: rr,
		32: rr
	};
	ID = {
		35: ei,
		42: xt,
		45: [jr, xt],
		60: ri,
		61: jr,
		95: xt,
		96: Ur,
		126: Ur
	};
	qD = {
		38: zr,
		92: Mr
	};
	BD = {
		[-5]: ir,
		[-4]: ir,
		[-3]: ir,
		33: ii,
		38: zr,
		42: tr,
		60: [Kn, ni],
		91: ai,
		92: [Zn, Mr],
		93: gt,
		95: tr,
		96: Qn
	};
	_D = { null: [tr, _u] };
	PD = { null: [42, 95] };
	OD = { null: [] };
	zu = /[\0\t\n\r]/g;
	MD = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
	Wu = {}.hasOwnProperty;
	VD = {
		tokenize: $D,
		partial: !0
	};
	ju = {
		tokenize: KD,
		partial: !0
	};
	$u = {
		tokenize: QD,
		partial: !0
	};
	Ku = {
		tokenize: JD,
		partial: !0
	};
	GD = {
		tokenize: XD,
		partial: !0
	};
	Qu = {
		name: "wwwAutolink",
		tokenize: YD,
		previous: Xu
	};
	Ju = {
		name: "protocolAutolink",
		tokenize: jD,
		previous: Zu
	};
	He = {
		name: "emailAutolink",
		tokenize: WD,
		previous: eo
	};
	Be = {};
	kt = 48;
	for (; kt < 123;) Be[kt] = He, kt++, kt === 58 ? kt = 65 : kt === 91 && (kt = 97);
	Be[43] = He;
	Be[45] = He;
	Be[46] = He;
	Be[95] = He;
	Be[72] = [He, Ju];
	Be[104] = [He, Ju];
	Be[87] = [He, Qu];
	Be[119] = [He, Qu];
	ZD = {
		tokenize: ud,
		partial: !0
	};
	$r = class {
		constructor() {
			this.map = [];
		}
		add(t, r, n) {
			od(this, t, r, n);
		}
		consume(t) {
			if (this.map.sort(function(u, i) {
				return u[0] - i[0];
			}), this.map.length === 0) return;
			let r = this.map.length, n = [];
			for (; r > 0;) r -= 1, n.push(t.slice(this.map[r][0] + this.map[r][1]), this.map[r][2]), t.length = this.map[r][0];
			n.push(t.slice()), t.length = 0;
			let a = n.pop();
			for (; a;) {
				for (let u of a) t.push(u);
				a = n.pop();
			}
			this.map.length = 0;
		}
	};
	cd = {
		name: "tasklistCheck",
		tokenize: fd
	};
	ao = {
		tokenize: hd,
		concrete: !0,
		name: "mathFlow"
	};
	io = {
		tokenize: md,
		partial: !0
	};
	qt = (e, t) => (r, n, ...a) => r | 1 && n == null ? void 0 : (t.call(n) ?? n[e]).apply(n, a);
	J = qt("at", function() {
		if (Array.isArray(this) || typeof this == "string") return gd;
	});
	kd = String.prototype.replaceAll ?? function(e, t) {
		return e.global ? this.replace(e, t) : this.split(e).join(t);
	};
	X = qt("replaceAll", function() {
		if (typeof this == "string") return kd;
	});
	bd = () => {};
	ar = bd;
	oo = Ed;
	Qr = Symbol.for("PRETTIER_IS_FRONT_MATTER");
	ur = 3;
	Ve = Cd;
	Bt = (function(e) {
		if (e == null) return Td;
		if (typeof e == "function") return Jr(e);
		if (typeof e == "object") return Array.isArray(e) ? yd(e) : vd(e);
		if (typeof e == "string") return Ad(e);
		throw new Error("Expected function, string, or object as test");
	});
	so = [];
	lo = !0;
	Ei = !1;
	co = "skip";
	eg.peek = Zd;
	ig.peek = ag;
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
	Dg = {
		name: "htmlText",
		tokenize: dg,
		add: "before"
	};
	or = "liquidNode";
	ch = At(Fo(), 1);
	fh = At(_o(), 1);
	ph = At(Lf(), 1);
	hh = At(wp(), 1);
	Ab = /^import\s/;
	Tb = /^export\s/;
	Cp = "[a-z][a-z0-9]*(\\.[a-z][a-z0-9]*)*|";
	yp = /<!---->|<!---?[^>-](?:-?[^-])*-->/;
	Sb = /^\{\s*\/\*(.*)\*\/\s*\}/;
	Lb = (e) => Ab.test(e);
	vp = (e) => Tb.test(e);
	Ap = (e) => Lb(e) || vp(e);
	Ua = (e, t) => {
		let r = t.indexOf(`

`), n = r === -1 ? t : t.slice(0, r);
		if (Ap(n)) return e(n)({
			type: vp(n) ? "export" : "import",
			value: n
		});
	};
	Ua.notInBlock = !0;
	Ua.locator = (e) => Ap(e) ? -1 : 1;
	Tp = (e, t) => {
		let r = Sb.exec(t);
		if (r) return e(r[0])({
			type: "esComment",
			value: r[1].trim()
		});
	};
	Tp.locator = (e, t) => e.indexOf("{", t);
	Sp = function() {
		let { Parser: e } = this, { blockTokenizers: t, blockMethods: r, inlineTokenizers: n, inlineMethods: a } = e.prototype;
		t.esSyntax = Ua, n.esComment = Tp, r.splice(r.indexOf("paragraph"), 0, "esSyntax"), a.splice(a.indexOf("text"), 0, "esComment");
	};
	De = "string";
	de = "array";
	st = "cursor";
	Ae = "indent";
	Te = "align";
	je = "trim";
	ke = "group";
	Fe = "fill";
	be = "if-break";
	$e = "indent-if-break";
	Ke = "line-suffix";
	Qe = "line-suffix-boundary";
	ge = "line";
	Je = "label";
	Se = "break-parent";
	An = /* @__PURE__ */ new Set([
		st,
		Ae,
		Te,
		je,
		ke,
		Fe,
		be,
		$e,
		Ke,
		Qe,
		ge,
		Je,
		Se
	]);
	me = Ib;
	qb = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
	Ha = class extends Error {
		name = "InvalidDocError";
		constructor(t) {
			super(Bb(t)), this.doc = t;
		}
	};
	wt = Ha;
	Ip = {};
	qp = _b;
	Le = ar;
	Sn = ar;
	Pp = ar;
	Op = ar;
	Wt = { type: Se };
	Ln = { type: ge };
	In = {
		type: ge,
		soft: !0
	};
	vr = {
		type: ge,
		hard: !0
	};
	Z = [vr, Wt];
	wr = [{
		type: ge,
		hard: !0,
		literal: !0
	}, Wt];
	Nb = "cr";
	Rb = "crlf";
	Mb = "\r";
	zb = `\r
`;
	Hb = `
`;
	Mp = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
	zp = 12288;
	Up = 65510;
	Hp = [
		12288,
		12288,
		65281,
		65376,
		65504,
		65510
	];
	Vp = 4352;
	Gp = 262141;
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
			let a = Math.floor((r + n) / 2), u = a * 2;
			if (t < e[u]) n = a - 1;
			else if (t > e[u + 1]) r = a + 1;
			else return !0;
		}
		return !1;
	};
	Wp = 19968, [Vb, Gb] = Wb(Va);
	Wa = (e) => e < zp || e > Up ? !1 : Ga(Hp, e);
	Ya = (e) => e >= Vb && e <= Gb ? !0 : e < Vp || e > Gp ? !1 : Ga(Va, e);
	Yb = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/;
	Yp = (e) => Yb.test(e);
	jb = /[^\x20-\x7F]/;
	Ar = $b;
	Kb = { type: 0 };
	Qb = { type: 1 };
	ja = {
		value: "",
		length: 0,
		queue: [],
		get root() {
			return ja;
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
			let { text: t, count: r } = qn(this.#t);
			return this.#t = t, this.#a(), r;
		}
		finish() {
			return this.#a(), {
				text: this.#e.join(""),
				positions: this.#i
			};
		}
	};
	Qp = $a;
	Ce = Symbol("MODE_BREAK");
	Ne = Symbol("MODE_FLAT");
	Ka = Symbol("DOC_FILL_PRINTED_LENGTH");
	Xb = Array.prototype.toReversed ?? function() {
		return [...this].reverse();
	};
	Xp = qt("toReversed", function() {
		if (Array.isArray(this)) return Xb;
	});
	tE = eE();
	eh = (e) => String(e).split(/[/\\]/).pop();
	th = (e) => String(e).startsWith("file:");
	aE = void 0;
	Ja = uE;
	Xa = oE;
	sE = function() {
		let e = this.Parser.prototype;
		e.blockMethods = ["frontMatter", ...e.blockMethods], e.blockTokenizers.frontMatter = t;
		function t(r, n) {
			let { frontMatter: a } = Ve(n);
			if (a) return r(a.raw)({
				...a,
				type: "frontMatter"
			});
		}
		t.onlyAtStart = !0;
	};
	ih = sE;
	ah = /(?:[\u{2c7}\u{2c9}-\u{2cb}\u{2d9}\u{2ea}-\u{2eb}\u{305}\u{323}\u{1100}-\u{11ff}\u{2e80}-\u{2e99}\u{2e9b}-\u{2ef3}\u{2f00}-\u{2fd5}\u{2ff0}-\u{303f}\u{3041}-\u{3096}\u{3099}-\u{30ff}\u{3105}-\u{312f}\u{3131}-\u{318e}\u{3190}-\u{4dbf}\u{4e00}-\u{9fff}\u{a700}-\u{a707}\u{a960}-\u{a97c}\u{ac00}-\u{d7a3}\u{d7b0}-\u{d7c6}\u{d7cb}-\u{d7fb}\u{f900}-\u{fa6d}\u{fa70}-\u{fad9}\u{fe10}-\u{fe1f}\u{fe30}-\u{fe6f}\u{ff00}-\u{ffef}\u{16fe3}\u{16ff2}-\u{16ff6}\u{1aff0}-\u{1aff3}\u{1aff5}-\u{1affb}\u{1affd}-\u{1affe}\u{1b000}-\u{1b122}\u{1b132}\u{1b150}-\u{1b152}\u{1b155}\u{1b164}-\u{1b167}\u{1f200}\u{1f250}-\u{1f251}\u{20000}-\u{2a6df}\u{2a700}-\u{2b81d}\u{2b820}-\u{2cead}\u{2ceb0}-\u{2ebe0}\u{2ebf0}-\u{2ee5d}\u{2f800}-\u{2fa1d}\u{30000}-\u{3134a}\u{31350}-\u{33479}])(?:[\u{fe00}-\u{fe0f}\u{e0100}-\u{e01ef}])?/u;
	Ze = /(?:[\u{21}-\u{2f}\u{3a}-\u{40}\u{5b}-\u{60}\u{7b}-\u{7e}\u{3000}\u{ff5e}]|\p{General_Category=Connector_Punctuation}|\p{General_Category=Dash_Punctuation}|\p{General_Category=Close_Punctuation}|\p{General_Category=Final_Punctuation}|\p{General_Category=Initial_Punctuation}|\p{General_Category=Other_Punctuation}|\p{General_Category=Open_Punctuation})/u;
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
	_n = /* @__PURE__ */ new Set([
		...Za,
		"tableCell",
		"paragraph",
		"heading"
	]);
	$t = "non-cjk";
	Re = "cj-letter";
	Ct = "k-letter";
	Tr = "cjk-punctuation";
	lE = /\p{Script_Extensions=Hangul}/u;
	Qt = (e) => e?.type === "whitespace" && e.value === `
`;
	oh = cE;
	fE = function() {
		let e = this.Parser.prototype, t = e.inlineMethods;
		t.splice(t.indexOf("text"), 0, "liquid"), e.inlineTokenizers.liquid = r;
		function r(n, a) {
			let u = a.match(/^(\{%.*?%\}|\{\{.*?\}\})/s);
			if (u) return n(u[0])({
				type: "liquidNode",
				value: u[0]
			});
		}
		r.locator = function(n, a) {
			return n.indexOf("{", a);
		};
	};
	sh = fE;
	pE = function() {
		let e = "wikiLink", t = /^\[\[(?<linkContents>.+?)\]\]/s, r = this.Parser.prototype, n = r.inlineMethods;
		n.splice(n.indexOf("link"), 0, e), r.inlineTokenizers.wikiLink = a;
		function a(u, i) {
			let o = t.exec(i);
			if (o) {
				let s = o.groups.linkContents.trim();
				return u(o[0])({
					type: e,
					value: s
				});
			}
		}
		a.locator = function(u, i) {
			return u.indexOf("[", i);
		};
	};
	lh = pE;
	mh = "format";
	Dh = /<!--\s*@(?:noformat|noprettier)\s*-->|\{\s*\/\*\s*@(?:noformat|noprettier)\s*\*\/\s*\}|<!--.*\r?\n[\s\S]*(^|\n)[^\S\n]*@(?:noformat|noprettier)[^\S\n]*($|\n)[\s\S]*\n.*-->/m;
	dh = /<!--\s*@(?:format|prettier)\s*-->|\{\s*\/\*\s*@(?:format|prettier)\s*\*\/\s*\}|<!--.*\r?\n[\s\S]*(^|\n)[^\S\n]*@(?:format|prettier)[^\S\n]*($|\n)[\s\S]*\n.*-->/m;
	Nn = (e) => Ve(e).content.trimStart().match(dh)?.index === 0;
	gh = (e) => Ve(e).content.trimStart().match(Dh)?.index === 0;
	xh = (e) => {
		let { frontMatter: t } = Ve(e), r = `<!-- @${mh} -->`;
		return t ? `${t.raw}

${r}

${e.slice(t.end.index)}` : `${r}

${e}`;
	};
	hE = kh(_i);
	mE = kh(tu);
	pu = {};
	Pr(pu, { mdast: () => sw });
	Rn = DE;
	Fh = dE;
	nu = At(hn(), 1);
	xE = /* @__PURE__ */ new Set(["position", "raw"]);
	iu.ignoredProperties = xE;
	Yh = At(hn(), 1);
	bh = kE;
	Eh = Object.freeze({
		character: "'",
		codePoint: 39
	});
	wh = Object.freeze({
		character: "\"",
		codePoint: 34
	});
	FE = Object.freeze({
		preferred: Eh,
		alternate: wh
	});
	bE = Object.freeze({
		preferred: wh,
		alternate: Eh
	});
	uu = class extends Error {
		name = "UnexpectedNodeError";
		constructor(t, r, n = "type") {
			super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`), this.node = t;
		}
	};
	yh = uu;
	wE = /* @__PURE__ */ new Set(["listItem", "definition"]);
	TE = 999999999;
	IE = /* @__PURE__ */ new Set([
		"tableCell",
		"link",
		"wikiLink"
	]);
	Rh = /* @__PURE__ */ new Set("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~");
	PE = /^(?:=+|-+)$/;
	UE = (e, t) => {
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
			for (let a = 0; a < t.length && r.has(t.charAt(a)); a++) n++;
			return n;
		}
		getTrailingWhitespaceCount(t) {
			let r = this.#e, n = 0;
			for (let a = t.length - 1; a >= 0 && r.has(t.charAt(a)); a--) n++;
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
			let n = `[${ve([...this.#e].join(""))}]+`, a = new RegExp(r ? `(${n})` : n);
			return t.split(a);
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
				let a = this.getLeadingWhitespaceCount(n);
				if (a === 0) return 0;
				n.length !== a && a < r && (r = a);
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
	qr = new cu([
		"	",
		`
`,
		"\f",
		"\r",
		" "
	]);
	GE = /^\\?.$/su;
	WE = /^\n *>[ >]*$/;
	Kh = YE;
	Br = null;
	aw = 10;
	for (let e = 0; e <= aw; e++) _r();
	Qh = uw;
	le = [["children"]];
	sw = {
		features: { experimental_frontMatterSupport: {
			massageAstNode: !0,
			embed: !0,
			print: !0
		} },
		preprocess: Kh,
		print: lu,
		embed: Fh,
		massageAstNode: iu,
		hasPrettierIgnore: uh,
		insertPragma: xh,
		getVisitorKeys: Qh({
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
export { Zh as default, xu as languages, ku as options, ru as parsers, pu as printers };
