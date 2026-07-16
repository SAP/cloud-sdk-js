import { __esmMin } from "./rolldown-runtime-aR1ZRE-I.js";
//#region ../../node_modules/.pnpm/prettier@3.9.5/node_modules/prettier/plugins/html.mjs
function is(e) {
	return this[e < 0 ? this.length + e : e];
}
function mt(e, t, r) {
	if (!e.has(t)) {
		let n = r(t);
		e.set(t, n);
	}
	return e.get(t);
}
function os(e) {
	if (typeof e == "string") return Fe;
	if (Array.isArray(e)) return Ve;
	if (!e) return;
	let { type: t } = e;
	if (ht.has(t)) return t;
}
function cs(e) {
	let t = e === null ? "null" : typeof e;
	if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
	if (ft(e)) throw new Error("doc is valid.");
	let r = Object.prototype.toString.call(e);
	if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
	let n = ls([...ht].map((i) => `'${i}'`));
	return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
function Gt(e, t) {
	if (typeof e == "string") return t(e);
	let r = /* @__PURE__ */ new Map();
	return n(e);
	function n(s) {
		return mt(r, s, i);
	}
	function i(s) {
		switch (ft(s)) {
			case Ve: return t(s.map(n));
			case ye: return t({
				...s,
				parts: s.parts.map(n)
			});
			case Ee: return t({
				...s,
				breakContents: n(s.breakContents),
				flatContents: n(s.flatContents)
			});
			case Te: {
				let { expandedStates: a, contents: o } = s;
				return a ? (a = a.map(n), o = a[0]) : o = n(o), t({
					...s,
					contents: o,
					expandedStates: a
				});
			}
			case we:
			case be:
			case xe:
			case pt:
			case ct: return t({
				...s,
				contents: n(s.contents)
			});
			case Fe:
			case ot:
			case lt:
			case ut:
			case z:
			case Le: return t(s);
			default: throw new Or(s);
		}
	}
}
function L(e, t = Mr) {
	return Gt(e, (r) => typeof r == "string" ? R(t, r.split(`
`)) : r);
}
function A(e) {
	return D(e), {
		type: be,
		contents: e
	};
}
function us(e, t) {
	return qr(e), D(t), {
		type: we,
		contents: t,
		n: e
	};
}
function Hr(e) {
	return us(Number.NEGATIVE_INFINITY, e);
}
function gt(e) {
	return Br(e), {
		type: ye,
		parts: e
	};
}
function C(e, t = {}) {
	return D(e), dt(t.expandedStates, !0), {
		type: Te,
		id: t.id,
		contents: e,
		break: !!t.shouldBreak,
		expandedStates: t.expandedStates
	};
}
function $(e, t = "", r = {}) {
	return D(e), t !== "" && D(t), {
		type: Ee,
		breakContents: e,
		flatContents: t,
		groupId: r.groupId
	};
}
function Fr(e, t) {
	return D(e), {
		type: xe,
		contents: e,
		groupId: t.groupId,
		negate: t.negate
	};
}
function R(e, t) {
	D(e), dt(t);
	let r = [];
	for (let n = 0; n < t.length; n++) n !== 0 && r.push(e), r.push(t[n]);
	return r;
}
function Wr(e, t) {
	let { preferred: r, alternate: n } = t === !0 || t === "'" ? ms : fs, { length: i } = e, s = 0, a = 0;
	for (let o = 0; o < i; o++) {
		let l = e.charCodeAt(o);
		l === r.codePoint ? s++ : l === n.codePoint && a++;
	}
	return (s > a ? n : r).character;
}
function $t(e) {
	if (typeof e != "string") throw new TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function j(e, t = !0) {
	return [A([y, e]), t ? y : ""];
}
function q(e, t) {
	let r = e.type === "NGRoot" ? e.node.type === "NGMicrosyntax" && e.node.body.length === 1 && e.node.body[0].type === "NGMicrosyntaxExpression" ? e.node.body[0].expression : e.node : e.type === "JsExpressionRoot" ? e.node : e;
	return r && (r.type === "ObjectExpression" || r.type === "ArrayExpression" || (t.parser === "__vue_expression" || t.parser === "__vue_ts_expression" || t.parser === "__ng_binding" || t.parser === "__ng_directive") && (r.type === "TemplateLiteral" || r.type === "StringLiteral"));
}
async function E(e, t, r, n) {
	r = {
		__isInHtmlAttribute: !0,
		__embeddedInHtml: !0,
		...r
	};
	let i = !0;
	n && (r.__onHtmlBindingRoot = (a, o) => {
		i = n(a, o);
	});
	let s = await t(e, r, t);
	return i ? C(s) : j(s);
}
function _s(e, t, r, n) {
	let { node: i } = r, s = n.originalText.slice(i.sourceSpan.start.offset, i.sourceSpan.end.offset);
	return /^\s*$/.test(s) ? "" : E(s, e, {
		parser: "__ng_directive",
		__isInHtmlAttribute: !1
	}, q);
}
function ks() {
	let e = globalThis, t = e.process?.platform;
	if (typeof t == "string") return t.startsWith("win");
	let r = e.Deno?.build?.os;
	return typeof r == "string" ? r === "windows" : e.navigator?.platform?.startsWith("Win") ?? !1;
}
function Yr(e) {
	if (e = e instanceof URL ? e : new URL(e), e.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);
	return e;
}
function ws(e) {
	return e = Yr(e), decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function Ts(e) {
	e = Yr(e);
	let t = decodeURIComponent(e.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
	return e.hostname !== "" && (t = `\\\\${e.hostname}${t}`), t;
}
function Kt(e) {
	return bs ? Ts(e) : ws(e);
}
function ys(e) {
	return Array.isArray(e) && e.length > 0;
}
function Xr(e, t) {
	if (!t) return;
	let r = Kr(t).toLowerCase();
	return e.find(({ filenames: n }) => n?.some((i) => i.toLowerCase() === r)) ?? e.find(({ extensions: n }) => n?.some((i) => r.endsWith(i)));
}
function Es(e, t) {
	if (t) return e.find(({ name: r }) => r.toLowerCase() === t) ?? e.find(({ aliases: r }) => r?.includes(t)) ?? e.find(({ extensions: r }) => r?.includes(`.${t}`));
}
function Jr(e, t) {
	if (t) {
		if (Qr(t)) try {
			t = Kt(t);
		} catch {
			return;
		}
		if (typeof t == "string") return e.find(({ isSupported: r }) => r?.({ filepath: t }));
	}
}
function Ls(e, t) {
	let r = jr(0, e.plugins).flatMap((i) => i.languages ?? []);
	return (Es(r, t.language) ?? Xr(r, t.physicalFile) ?? Xr(r, t.file) ?? Jr(r, t.physicalFile) ?? Jr(r, t.file) ?? xs?.(r, t.physicalFile))?.parsers[0];
}
function As(e) {
	return !!e?.[St];
}
function Ps(e) {
	return T(0, e, /[^\n]/g, " ");
}
function Ns(e) {
	let t = e.slice(0, Ue);
	if (t !== "---" && t !== "+++") return;
	let r = e.indexOf(`
`, Ue);
	if (r === -1) return;
	let n = e.slice(Ue, r).trim(), i = e.indexOf(`
${t}`, r), s = n;
	if (s || (s = t === "+++" ? "toml" : "yaml"), i === -1 && t === "---" && s === "yaml" && (i = e.indexOf(`
...`, r)), i === -1) return;
	let a = i + 1 + Ue, o = e.charAt(a + 1);
	if (!/\s?/.test(o)) return;
	let l = e.slice(0, a), c;
	return {
		language: s,
		explicitLanguage: n || null,
		value: e.slice(r + 1, i),
		startDelimiter: t,
		endDelimiter: l.slice(-Ue),
		raw: l,
		start: {
			line: 1,
			column: 0,
			index: 0
		},
		end: {
			index: l.length,
			get line() {
				return c ?? (c = l.split(`
`)), c.length;
			},
			get column() {
				return c ?? (c = l.split(`
`)), I(0, c, -1).length;
			}
		},
		[St]: !0
	};
}
function Ds(e) {
	let t = Ns(e);
	return t ? {
		frontMatter: t,
		get content() {
			let { raw: r } = t;
			return vt(r) + e.slice(r.length);
		}
	} : { content: e };
}
function Is(e) {
	return e.kind === "element" && !e.hasExplicitNamespace && !["html", "svg"].includes(e.namespace);
}
function Ct(e, t) {
	return !!(e.kind === "ieConditionalComment" && e.lastChild && !e.lastChild.isSelfClosing && !e.lastChild.endSourceSpan || e.kind === "ieConditionalComment" && !e.complete || Y(e) && e.children.some((r) => r.kind !== "text" && r.kind !== "interpolation") || wt(e, t) && !O(e, t) && e.kind !== "interpolation");
}
function le(e) {
	return e.kind === "attribute" || !e.parent || !e.prev ? !1 : Os(e.prev);
}
function Os(e) {
	return e.kind === "comment" && e.value.trim() === "prettier-ignore";
}
function N(e) {
	return e.kind === "text" || e.kind === "comment";
}
function O(e, t) {
	return e.kind === "element" && (e.fullName === "script" || e.fullName === "style" || e.fullName === "svg:style" || e.fullName === "svg:script" || e.fullName === "mj-style" && t.parser === "mjml" || oe(e) && (e.name === "script" || e.name === "style"));
}
function rn(e, t) {
	return e.children && !O(e, t);
}
function nn(e, t) {
	return O(e, t) || e.kind === "interpolation" || er(e);
}
function er(e) {
	return dn(e).startsWith("pre");
}
function sn(e, t) {
	let r = n();
	if (r && !e.prev && e.parent?.tagDefinition?.ignoreFirstLf) return e.kind === "interpolation";
	return r;
	function n() {
		return ae(e) || e.kind === "angularControlFlowBlock" ? !1 : (e.kind === "text" || e.kind === "interpolation") && e.prev && (e.prev.kind === "text" || e.prev.kind === "interpolation") ? !0 : !e.parent || e.parent.cssDisplay === "none" ? !1 : Y(e.parent) ? !0 : !(!e.prev && (e.parent.kind === "root" || Y(e) && e.parent || O(e.parent, t) || Ge(e.parent, t) || !Vs(e.parent.cssDisplay)) || e.prev && !zs(e.prev.cssDisplay));
	}
}
function an(e, t) {
	return ae(e) || e.kind === "angularControlFlowBlock" ? !1 : (e.kind === "text" || e.kind === "interpolation") && e.next && (e.next.kind === "text" || e.next.kind === "interpolation") ? !0 : !e.parent || e.parent.cssDisplay === "none" ? !1 : Y(e.parent) ? !0 : !(!e.next && (e.parent.kind === "root" || Y(e) && e.parent || O(e.parent, t) || Ge(e.parent, t) || !Us(e.parent.cssDisplay)) || e.next && !Ws(e.next.cssDisplay));
}
function on(e, t) {
	return Gs(e.cssDisplay) && !O(e, t);
}
function We(e) {
	return ae(e) || e.next && e.sourceSpan.end && e.sourceSpan.end.line + 1 < e.next.sourceSpan.start.line;
}
function ln(e) {
	return tr(e) || e.kind === "element" && e.children.length > 0 && ([
		"body",
		"script",
		"style"
	].includes(e.name) || e.children.some((t) => Bs(t))) || e.firstChild && e.firstChild === e.lastChild && e.firstChild.kind !== "text" && un(e.firstChild) && (!e.lastChild.isTrailingSpaceSensitive || pn(e.lastChild));
}
function tr(e) {
	return e.kind === "element" && e.children.length > 0 && ([
		"html",
		"head",
		"ul",
		"ol",
		"select"
	].includes(e.name) || e.cssDisplay.startsWith("table") && e.cssDisplay !== "table-cell");
}
function kt(e) {
	return hn(e) || e.prev && Ms(e.prev) || cn(e);
}
function Ms(e) {
	return hn(e) || e.kind === "element" && e.fullName === "br" || cn(e);
}
function cn(e) {
	return un(e) && pn(e);
}
function un(e) {
	return e.hasLeadingSpaces && (e.prev ? e.prev.sourceSpan.end.line < e.sourceSpan.start.line : e.parent.kind === "root" || e.parent.startSourceSpan.end.line < e.sourceSpan.start.line);
}
function pn(e) {
	return e.hasTrailingSpaces && (e.next ? e.next.sourceSpan.start.line > e.sourceSpan.end.line : e.parent.kind === "root" || e.parent.endSourceSpan && e.parent.endSourceSpan.start.line > e.sourceSpan.end.line);
}
function hn(e) {
	switch (e.kind) {
		case "ieConditionalComment":
		case "comment":
		case "directive": return !0;
		case "element": return ["script", "select"].includes(e.name);
	}
	return !1;
}
function bt(e) {
	return e.lastChild ? bt(e.lastChild) : e;
}
function Bs(e) {
	return e.children?.some((t) => t.kind !== "text");
}
function mn(e) {
	if (e) switch (e) {
		case "module":
		case "text/javascript":
		case "text/babel":
		case "text/jsx":
		case "application/javascript": return "babel";
		case "application/x-typescript": return "typescript";
		case "text/markdown": return "markdown";
		case "text/html": return "html";
		case "text/x-handlebars-template": return "glimmer";
		default: if (e.endsWith("json") || e.endsWith("importmap") || e === "speculationrules") return "json";
	}
}
function qs(e, t) {
	let { name: r, attrMap: n } = e;
	if (r !== "script" || se(n, "src")) return;
	let { type: i, lang: s } = e.attrMap;
	return !s && !i ? "babel" : _t(t, { language: s }) ?? mn(i);
}
function Hs(e, t) {
	if (!wt(e, t)) return;
	let { attrMap: r } = e;
	if (se(r, "src")) return;
	let { type: n, lang: i } = r;
	return _t(t, { language: i }) ?? mn(n);
}
function Fs(e, t) {
	if (e.name === "style") {
		let { lang: r } = e.attrMap;
		return r ? _t(t, { language: r }) : "css";
	}
	if (e.name === "mj-style" && t.parser === "mjml") return "css";
}
function rr(e, t) {
	return qs(e, t) ?? Fs(e, t) ?? Hs(e, t);
}
function ze(e) {
	return e === "block" || e === "list-item" || e.startsWith("table");
}
function Vs(e) {
	return !ze(e) && e !== "inline-block";
}
function Us(e) {
	return !ze(e) && e !== "inline-block";
}
function Ws(e) {
	return !ze(e);
}
function zs(e) {
	return !ze(e);
}
function Gs(e) {
	return !ze(e) && e !== "inline-block";
}
function Y(e) {
	return dn(e).startsWith("pre");
}
function $s(e, t) {
	let r = e;
	for (; r;) {
		if (t(r)) return !0;
		r = r.parent;
	}
	return !1;
}
function fn(e, t) {
	if (ce(e, t)) return "block";
	if (e.prev?.kind === "comment") {
		let n = e.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/);
		if (n) return n[1];
	}
	let r = !1;
	if (e.kind === "element" && e.namespace === "svg") if ($s(e, (n) => n.fullName === "svg:foreignObject")) r = !0;
	else return e.name === "svg" ? "inline-block" : "block";
	switch (t.htmlWhitespaceSensitivity) {
		case "strict": return "inline";
		case "ignore": return "block";
		default: if (e.kind === "element" && (!e.namespace || r || oe(e)) && se(Xt, e.name)) return Xt[e.name];
	}
	return Zr;
}
function dn(e) {
	return e.kind === "element" && (!e.namespace || oe(e)) && se(Jt, e.name) ? Jt[e.name] : en;
}
function nr(e) {
	return T(0, T(0, e, "&apos;", "'"), "&quot;", "\"");
}
function w(e) {
	return nr(e.value);
}
function Ge(e, t) {
	return ce(e, t) && !js.has(e.fullName);
}
function ce(e, t) {
	return t.parser === "vue" && e.kind === "element" && e.parent.kind === "root" && e.fullName.toLowerCase() !== "html";
}
function wt(e, t) {
	return ce(e, t) && (Ge(e, t) || e.attrMap.lang && e.attrMap.lang !== "html");
}
function gn(e) {
	let t = e.fullName;
	return t.charAt(0) === "#" || t === "slot-scope" || t === "v-slot" || t.startsWith("v-slot:");
}
function _n(e, t) {
	let r = e.parent;
	if (!ce(r, t)) return !1;
	let n = r.fullName, i = e.fullName;
	return n === "script" && i === "setup" || n === "style" && i === "vars";
}
function Tt(e, t = e.value) {
	return e.parent.isWhitespaceSensitive ? e.parent.isIndentationSensitive ? L(t) : L(P.dedentString(Zt(t)), k) : R(S, P.split(t));
}
function yt(e, t) {
	return ce(e, t) && e.name === "script";
}
function Ys(e) {
	let { valueSpan: t, value: r } = e;
	return t.end.offset - t.start.offset === r.length + 2;
}
function Et(e, t) {
	if (Ys(e)) return !1;
	let { value: r } = e;
	return /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(r) || t.parser === "lwc" && r.startsWith("{") && r.endsWith("}");
}
async function Cn(e, t, r) {
	let n = w(r.node), i = [];
	for (let [s, a] of n.split(Sn).entries()) if (s % 2 === 0) i.push(L(a));
	else try {
		i.push(C([
			"{{",
			A([S, await E(a, e, {
				parser: "__ng_interpolation",
				__isInHtmlInterpolation: !0
			})]),
			S,
			"}}"
		]));
	} catch {
		i.push("{{", L(a), "}}");
	}
	return i;
}
function Qs(e, t, { node: r }) {
	let n = w(r);
	return j(gt(Tt(r, n.trim())), !n.includes("@@"));
}
function Zs(e) {
	let t = [];
	for (let r of e.split(";")) {
		if (r = P.trim(r), !r) continue;
		let [n, ...i] = P.split(r);
		t.push({
			name: n,
			value: i
		});
	}
	return t;
}
function Ln(e, t, r) {
	let { node: n } = r, i = En(w(n));
	return i.length === 0 ? [""] : j(i.map(({ name: s, value: a }, o) => [[s, ...a].join(" "), o === i.length - 1 ? $(";") : [";", S]]));
}
function An(e) {
	return e === "	" || e === `
` || e === "\f" || e === "\r" || e === " ";
}
function sa(e) {
	let t = e.length, r, n, i, s, a, o = 0, l;
	function c(h) {
		let f, g = h.exec(e.substring(o));
		if (g) return [f] = g, o += f.length, f;
	}
	let u = [];
	for (;;) {
		if (c(ta), o >= t) {
			if (u.length === 0) throw new Error("Must contain one or more image candidate strings.");
			return u;
		}
		l = o, r = c(ra), n = [], r.slice(-1) === "," ? (r = r.replace(na, ""), _()) : d();
	}
	function d() {
		for (c(ea), i = "", s = "in descriptor";;) {
			if (a = e.charAt(o), s === "in descriptor") if (An(a)) i && (n.push(i), i = "", s = "after descriptor");
			else if (a === ",") {
				o += 1, i && n.push(i), _();
				return;
			} else if (a === "(") i += a, s = "in parens";
			else if (a === "") {
				i && n.push(i), _();
				return;
			} else i += a;
			else if (s === "in parens") if (a === ")") i += a, s = "in descriptor";
			else if (a === "") {
				n.push(i), _();
				return;
			} else i += a;
			else if (s === "after descriptor" && !An(a)) if (a === "") {
				_();
				return;
			} else s = "in descriptor", o -= 1;
			o += 1;
		}
	}
	function _() {
		let h = !1, f, g, v, W, ie = {}, Q, at, Ce, Be, Ut;
		for (W = 0; W < n.length; W++) Q = n[W], at = Q[Q.length - 1], Ce = Q.substring(0, Q.length - 1), Be = parseInt(Ce, 10), Ut = parseFloat(Ce), Pn.test(Ce) && at === "w" ? ((f || g) && (h = !0), Be === 0 ? h = !0 : f = Be) : ia.test(Ce) && at === "x" ? ((f || g || v) && (h = !0), Ut < 0 ? h = !0 : g = Ut) : Pn.test(Ce) && at === "h" ? ((v || g) && (h = !0), Be === 0 ? h = !0 : v = Be) : h = !0;
		if (!h) ie.source = {
			value: r,
			startOffset: l
		}, f && (ie.width = { value: f }), g && (ie.density = { value: g }), v && (ie.height = { value: v }), u.push(ie);
		else throw new Error(`Invalid srcset descriptor found in "${e}" at "${Q}".`);
	}
}
function Rn(e, t, r) {
	let i = Nn(w(r.node)), s = aa.filter((h) => i.some((f) => se(f, h)));
	if (s.length > 1) throw new Error("Mixed descriptor in srcset is not supported");
	let [a] = s, o = In[a], l = i.map((h) => h.source.value), c = Math.max(...l.map((h) => h.length)), u = i.map((h) => h[a] ? String(h[a].value) : ""), d = u.map((h) => {
		let f = h.indexOf(".");
		return f === -1 ? h.length : f;
	}), _ = Math.max(...d);
	return j(R([",", S], l.map((h, f) => {
		let g = [h], v = u[f];
		if (v) {
			let W = c - h.length + 1, ie = _ - d[f], Q = " ".repeat(W + ie);
			g.push($(Q, " "), v + o);
		}
		return g;
	})));
}
function la(e, t) {
	return mt(oa, e.root, (r) => r.children.some((n) => yt(n, t) && ["ts", "typescript"].includes(n.attrMap.lang)));
}
function Bn(e, t, r) {
	return E(`type T<${w(r.node)}> = any`, e, {
		parser: "babel-ts",
		__isEmbeddedTypescriptGenericParameters: !0
	}, q);
}
function qn(e, t, r, n) {
	let i = w(r.node), s = H(r, n) ? "babel-ts" : "babel";
	return E(`function _(${i}) {}`, e, {
		parser: s,
		__isVueBindings: !0
	});
}
async function Hn(e, t, r, n) {
	let { left: s, operator: a, right: o } = ca(w(r.node)), l = H(r, n);
	return [
		C(await E(`function _(${s}) {}`, e, {
			parser: l ? "babel-ts" : "babel",
			__isVueForBindingLeft: !0
		})),
		" ",
		a,
		" ",
		await E(o, e, { parser: l ? "__ts_expression" : "__js_expression" })
	];
}
function ca(e) {
	let r = e.match(/(.*?)\s+(in|of)\s+(.*)/s);
	if (!r) return;
	let n = { for: r[3].trim() };
	if (!n.for) return;
	let i = /,([^,\]}]*)(?:,([^,\]}]*))?$/, a = T(0, r[1].trim(), /^\(|\)$/g, ""), o = a.match(i);
	o ? (n.alias = a.replace(i, ""), n.iterator1 = o[1].trim(), o[2] && (n.iterator2 = o[2].trim())) : n.alias = a;
	let l = [
		n.alias,
		n.iterator1,
		n.iterator2
	];
	if (!l.some((c, u) => !c && (u === 0 || l.slice(u + 1).some(Boolean)))) return {
		left: l.filter(Boolean).join(","),
		operator: r[2],
		right: n.for
	};
}
async function pa(e, t, r, n) {
	try {
		return await Fn(e, t, r, n);
	} catch (a) {
		if (a.cause?.code !== "BABEL_PARSER_SYNTAX_ERROR") throw a;
	}
	return E(w(r.node), e, { parser: H(r, n) ? "__vue_ts_event_binding" : "__vue_event_binding" }, q);
}
function ha(e, t, r, n) {
	return E(w(r.node), e, { parser: H(r, n) ? "__vue_ts_expression" : "__vue_expression" }, q);
}
function Fn(e, t, r, n) {
	return E(w(r.node), e, { parser: H(r, n) ? "__ts_expression" : "__js_expression" }, q);
}
function fa(e, t) {
	let { node: r } = e, { value: n } = r;
	if (n) return Et(r, t) ? [
		r.rawName,
		"=",
		n
	] : ma.find(({ test: i }) => i(e, t))?.print;
}
function da(e) {
	return async (t, r, n, i) => {
		let s = await e(t, r, n, i);
		if (s) return s = Gt(s, (a) => typeof a == "string" ? T(0, a, "\"", "&quot;") : a), [
			n.node.rawName,
			"=\"",
			C(s),
			"\""
		];
	};
}
function $e(e, t) {
	return [e.isSelfClosing ? "" : ga(e, t), ue(e, t)];
}
function ga(e, t) {
	return e.lastChild && K(e.lastChild) ? "" : [_a(e, t), xt(e, t)];
}
function ue(e, t) {
	return (e.next ? V(e.next) : he(e.parent)) ? "" : [pe(e, t), M(e, t)];
}
function _a(e, t) {
	return he(e) ? pe(e.lastChild, t) : "";
}
function M(e, t) {
	return K(e) ? xt(e.parent, t) : je(e) ? Lt(e.next, t) : "";
}
function xt(e, t) {
	if (zn(e, t)) return "";
	switch (e.kind) {
		case "ieConditionalComment": return "<!";
		case "element": if (e.hasHtmComponentClosingTag) return "<//";
		default: return `</${e.rawName}`;
	}
}
function pe(e, t) {
	if (zn(e, t)) return "";
	switch (e.kind) {
		case "ieConditionalComment":
		case "ieConditionalEndComment": return "[endif]-->";
		case "ieConditionalStartComment": return "]><!-->";
		case "interpolation": return "}}";
		case "angularIcuExpression": return "}";
		case "element": if (e.isSelfClosing) return "/>";
		default: return ">";
	}
}
function zn(e, t) {
	return !e.isSelfClosing && !e.endSourceSpan && (le(e) || Ct(e.parent, t));
}
function V(e) {
	return e.prev && e.prev.kind !== "docType" && e.kind !== "angularControlFlowBlock" && !N(e.prev) && e.isLeadingSpaceSensitive && !e.hasLeadingSpaces;
}
function he(e) {
	return e.lastChild?.isTrailingSpaceSensitive && !e.lastChild.hasTrailingSpaces && !N(bt(e.lastChild)) && !Y(e);
}
function K(e) {
	return !e.next && !e.hasTrailingSpaces && e.isTrailingSpaceSensitive && N(bt(e));
}
function je(e) {
	return e.next && !N(e.next) && N(e) && e.isTrailingSpaceSensitive && !e.hasTrailingSpaces;
}
function Sa(e) {
	let t = e.trim().match(/^prettier-ignore-attribute(?:\s+(.+))?$/s);
	return t ? t[1] ? t[1].split(/\s+/) : !0 : !1;
}
function Ye(e) {
	return !e.prev && e.isLeadingSpaceSensitive && !e.hasLeadingSpaces;
}
function va(e, t, r) {
	let { node: n } = e, { attrs: i = [], startTagComments: s = [] } = n;
	if (i.length === 0 && s.length === 0) return n.isSelfClosing ? " " : "";
	let a = n.prev?.kind === "comment" && Sa(n.prev.value), o = typeof a == "boolean" ? () => a : Array.isArray(a) ? (g) => a.includes(g.rawName) : () => !1, l = ["attrs", "startTagComments"].filter((g) => X(n[g])), c = l.flatMap((g) => e.map(({ node: v }) => ({
		loc: F(v),
		printed: v.kind === "attribute" && o(v) ? L(t.originalText.slice(F(v), J(v))) : r()
	}), g));
	l.length > 1 && c.sort((g, v) => g.loc - v.loc);
	let u = n.kind === "element" && n.fullName === "script" && i.length === 1 && i[0].fullName === "src" && n.children.length === 0 && s.length === 0, d = s.some((g) => g.type === "single"), h = d || t.singleAttributePerLine && i.length > 1 && !ce(n, t) ? k : S, f = [A([u ? " " : d ? k : S, R(h, c.map(({ printed: g }) => g))])];
	return n.firstChild && Ye(n.firstChild) || n.isSelfClosing && he(n.parent) || u ? f.push(n.isSelfClosing ? " " : "") : f.push(t.bracketSameLine ? n.isSelfClosing ? " " : "" : n.isSelfClosing ? S : y), f;
}
function Ca(e) {
	return e.firstChild && Ye(e.firstChild) ? "" : At(e);
}
function Ke(e, t, r) {
	let { node: n } = e;
	return [
		me(n, t),
		va(e, t, r),
		n.isSelfClosing ? "" : Ca(n)
	];
}
function me(e, t) {
	return e.prev && je(e.prev) ? "" : [B(e, t), Lt(e, t)];
}
function B(e, t) {
	return Ye(e) ? At(e.parent) : V(e) ? pe(e.prev, t) : "";
}
function Lt(e, t) {
	switch (e.kind) {
		case "ieConditionalComment":
		case "ieConditionalStartComment": return `<!--[if ${e.condition}`;
		case "ieConditionalEndComment": return "<!--<!";
		case "interpolation": return "{{";
		case "docType": {
			if (e.value === "html") {
				let { filepath: n } = t;
				if (n && /\.html?$/.test(n)) return Wn;
			}
			let r = F(e);
			return t.originalText.slice(r, r + Wn.length);
		}
		case "angularIcuExpression": return "{";
		case "element": if (e.condition) return `<!--[if ${e.condition}]><!--><${e.rawName}`;
		default: return `<${e.rawName}`;
	}
}
function At(e) {
	switch (e.kind) {
		case "ieConditionalComment": return "]>";
		case "element": if (e.condition) return "><!--<![endif]-->";
		default: return ">";
	}
}
function ka(e, t) {
	if (!e.endSourceSpan) return "";
	let r = e.startSourceSpan.end.offset;
	e.firstChild && Ye(e.firstChild) && (r -= At(e).length);
	let n = e.endSourceSpan.start.offset;
	return e.lastChild && K(e.lastChild) ? n += xt(e, t).length : he(e) && (n -= pe(e.lastChild, t).length), t.originalText.slice(r, n);
}
function wa(e, t) {
	let { node: r } = e;
	switch (r.kind) {
		case "element":
			if (O(r, t) || r.kind === "interpolation") return;
			if (!r.isSelfClosing && wt(r, t)) {
				let n = rr(r, t);
				return n ? async (i, s) => {
					let a = Pt(r, t), o = /^\s*$/.test(a), l = "";
					return o || (l = await i(Zt(a), {
						parser: n,
						__embeddedInHtml: !0
					}), o = l === ""), [
						B(r, t),
						C(Ke(e, t, s)),
						o ? "" : k,
						l,
						o ? "" : k,
						$e(r, t),
						M(r, t)
					];
				} : void 0;
			}
			break;
		case "text":
			if (O(r.parent, t)) {
				let n = rr(r.parent, t);
				if (n) return async (i) => {
					let s = n === "markdown" ? P.dedentString(r.value.replace(/^[^\S\n]*\n/, "")) : r.value, a = {
						parser: n,
						__embeddedInHtml: !0
					};
					if (t.parser === "html" && n === "babel") {
						let o = "script", { attrMap: l } = r.parent;
						l && (l.type === "module" || (l.type === "text/babel" || l.type === "text/jsx") && l["data-type"] === "module") && (o = "module"), a.__babelSourceType = o;
					}
					return [
						G,
						B(r, t),
						await i(s, a),
						M(r, t)
					];
				};
			} else if (r.parent.kind === "interpolation") return async (n) => {
				let i = {
					__isInHtmlInterpolation: !0,
					__embeddedInHtml: !0
				};
				return t.parser === "angular" ? i.parser = "__ng_interpolation" : t.parser === "vue" ? i.parser = H(e, t) ? "__vue_ts_expression" : "__vue_expression" : i.parser = "__js_expression", [A([S, await n(r.value, i)]), r.parent.next && V(r.parent.next) ? " " : S];
			};
			break;
		case "attribute": return Un(e, t);
		case "angularControlFlowBlockParameters": return ba.has(e.parent.name) ? $r : void 0;
		case "angularLetDeclarationInitializer": return (n) => E(r.value, n, {
			parser: "__ng_binding",
			__isInHtmlAttribute: !1
		});
	}
}
function Xe(e) {
	if (Qe !== null && typeof Qe.property) {
		let t = Qe;
		return Qe = Xe.prototype = null, t;
	}
	return Qe = Xe.prototype = e ?? Object.create(null), new Xe();
}
function ar(e) {
	return Xe(e);
}
function ya(e, t = "type") {
	ar(e);
	function r(n) {
		let i = n[t], s = e[i];
		if (!Array.isArray(s)) throw Object.assign(/* @__PURE__ */ new Error(`Missing visitor keys for '${i}'.`), { node: n });
		return s;
	}
	return r;
}
function or(e, t, r) {
	if (e.kind === "text" || e.kind === "comment") return null;
	if (e.kind === "yaml" && delete t.value, e.kind === "attribute") {
		let { fullName: n, value: i } = e;
		n === "style" || n === "class" || n === "srcset" && (r.fullName === "img" || r.fullName === "source") || n === "allow" && r.fullName === "iframe" || n.startsWith("on") || n.startsWith("@") || n.startsWith(":") || n.startsWith(".") || n.startsWith("#") || n.startsWith("v-") || n === "vars" && r.fullName === "style" || (n === "setup" || n === "generic") && r.fullName === "script" || n === "slot-scope" || n.startsWith("(") || n.startsWith("[") || n.startsWith("*") || n.startsWith("bind") || n.startsWith("i18n") || n.startsWith("on-") || n.startsWith("ng-") || i?.includes("{{") ? delete t.value : i && (t.value = T(0, i, /'|&quot;|&apos;/g, "\""));
	}
	if (e.kind === "docType" && (t.value = T(0, e.value.toLowerCase(), /\s+/g, " ")), e.kind === "angularControlFlowBlock" && e.parameters?.children) for (let n of t.parameters.children) La.has(e.name) ? delete n.expression : n.expression = n.expression.trim();
	e.kind === "angularIcuExpression" && (t.switchValue = e.switchValue.trim()), e.kind === "angularLetDeclarationInitializer" && delete t.value, e.kind === "element" && e.isVoid && !e.isSelfClosing && (t.isSelfClosing = !0);
}
function ri(e) {
	let t = J(e);
	return e.kind === "element" && !e.endSourceSpan && X(e.children) ? Math.max(t, ri(I(0, e.children, -1))) : t;
}
function Ze(e, t, r) {
	let n = e.node;
	if (le(n)) {
		let i = ri(n);
		return [
			B(n, t),
			L(P.trimEnd(t.originalText.slice(F(n) + (n.prev && je(n.prev) ? Lt(n).length : 0), i - (n.next && V(n.next) ? pe(n, t).length : 0)))),
			M(n, t)
		];
	}
	return r();
}
function Nt(e, t) {
	return N(e) && N(t) ? e.isTrailingSpaceSensitive ? e.hasTrailingSpaces ? kt(t) ? k : S : "" : kt(t) ? k : y : je(e) && (le(t) || t.firstChild || t.isSelfClosing || t.kind === "element" && t.attrs.length > 0) || e.kind === "element" && e.isSelfClosing && V(t) ? "" : t.kind === "comment" && t.isLeadingSpaceSensitive && !t.hasLeadingSpaces ? y : !t.isLeadingSpaceSensitive || kt(t) || V(t) && e.lastChild && K(e.lastChild) && e.lastChild.lastChild && K(e.lastChild.lastChild) ? k : t.hasLeadingSpaces ? S : y;
}
function Ae(e, t, r) {
	let { node: n } = e;
	if (tr(n)) return [G, ...e.map(() => {
		let s = e.node, a = s.prev ? Nt(s.prev, s) : "";
		return [a ? [a, We(s.prev) ? k : ""] : "", Ze(e, t, r)];
	}, "children")];
	let i = n.children.map(() => Symbol(""));
	return e.map(({ node: s, index: a }) => {
		if (N(s)) {
			if (s.prev && N(s.prev)) {
				let h = Nt(s.prev, s);
				if (h) return We(s.prev) ? [
					k,
					k,
					Ze(e, t, r)
				] : [h, Ze(e, t, r)];
			}
			return Ze(e, t, r);
		}
		let o = [], l = [], c = [], u = [], d = s.prev ? Nt(s.prev, s) : "", _ = s.next ? Nt(s, s.next) : "";
		return d && (We(s.prev) ? o.push(k, k) : d === k ? o.push(k) : N(s.prev) ? l.push(d) : l.push($("", y, { groupId: i[a - 1] }))), _ && (We(s) ? N(s.next) && u.push(k, k) : _ === k ? N(s.next) && u.push(k) : c.push(_)), [
			...o,
			C([...l, C([Ze(e, t, r), ...c], { id: i[a] })]),
			...u
		];
	}, "children");
}
function ni(e, t, r) {
	let { node: n } = e, i = [];
	Da(e) && i.push("} "), i.push("@", n.name);
	let s = Pa(n);
	if (n.parameters && (s || i.push(" "), i.push("(", C(r("parameters")), ")")), s) return i.push(";"), i;
	if (!Na(n)) {
		i.push(" {");
		let a = ii(n);
		n.children.length > 0 ? (n.firstChild.hasLeadingSpaces = !0, n.lastChild.hasTrailingSpaces = !0, i.push(A([k, Ae(e, t, r)])), a && i.push(k, "}")) : a && i.push("}");
	}
	return C(i, { shouldBreak: !0 });
}
function ii(e) {
	return !(e.next?.kind === "angularControlFlowBlock" && ti.get(e.name)?.has(e.next.name));
}
function Na(e) {
	return Aa(e) && e.endSourceSpan && e.endSourceSpan.start.offset === e.endSourceSpan.end.offset;
}
function Da(e) {
	let { previous: t } = e;
	return t?.kind === "angularControlFlowBlock" && !le(t) && !ii(t);
}
function si(e, t, r) {
	return [A([y, R([";", S], e.map(r, "children"))]), y];
}
function ai(e, t, r) {
	let { node: n } = e;
	return [
		me(n, t),
		C([
			n.switchValue.trim(),
			", ",
			n.type,
			n.cases.length > 0 ? [",", A([S, R(S, e.map(r, "cases"))])] : "",
			y
		]),
		ue(n, t)
	];
}
function oi(e, t, r) {
	let { node: n } = e;
	return [
		n.value,
		" {",
		C([A([y, e.map(({ node: i, isLast: s }) => {
			let a = [r()];
			return i.kind === "text" && (i.hasLeadingSpaces && a.unshift(S), i.hasTrailingSpaces && !s && a.push(S)), a;
		}, "expression")]), y]),
		"}"
	];
}
function li(e, t, r) {
	let { node: n } = e;
	if (Ct(n, t)) return [
		B(n, t),
		C(Ke(e, t, r)),
		L(Pt(n, t)),
		...$e(n, t),
		M(n, t)
	];
	let i = n.children.length === 1 && (n.firstChild.kind === "interpolation" || n.firstChild.kind === "angularIcuExpression") && n.firstChild.isLeadingSpaceSensitive && !n.firstChild.hasLeadingSpaces && n.lastChild.isTrailingSpaceSensitive && !n.lastChild.hasTrailingSpaces, s = Symbol("element-attr-group-id"), a = (u) => C([
		C(Ke(e, t, r), { id: s }),
		u,
		$e(n, t)
	]);
	if (n.children.length === 0) return a(n.hasDanglingSpaces && n.isDanglingSpaceSensitive ? S : "");
	let o = (u) => i ? Fr(u, { groupId: s }) : (O(n, t) || Ge(n, t)) && n.parent.kind === "root" && t.parser === "vue" && !t.vueIndentScriptAndStyle ? u : A(u), l = () => i ? $(y, "", { groupId: s }) : n.firstChild.hasLeadingSpaces && n.firstChild.isLeadingSpaceSensitive ? S : n.firstChild.kind === "text" && n.isWhitespaceSensitive && n.isIndentationSensitive ? Hr(y) : y, c = () => (n.next ? V(n.next) : he(n.parent)) ? n.lastChild.hasTrailingSpaces && n.lastChild.isTrailingSpaceSensitive ? " " : "" : Y(n) && K(n.lastChild) ? "" : i ? $(y, "", { groupId: s }) : n.lastChild.hasTrailingSpaces && n.lastChild.isTrailingSpaceSensitive ? S : (n.lastChild.kind === "comment" || n.lastChild.kind === "text" && n.isWhitespaceSensitive && n.isIndentationSensitive) && new RegExp(`\\n[\\t ]{${t.tabWidth * (e.ancestors.length - 1)}}$`).test(n.lastChild.value) ? "" : y;
	return a([
		ln(n) ? G : "",
		o([l(), Ae(e, t, r)]),
		c()
	]);
}
function ci(e) {
	let { node: { value: t, type: r } } = e;
	return r === "single" ? `//${t.trimEnd()}` : [
		"/*",
		L(t),
		"*/"
	];
}
function Z(e, t = !0) {
	if (e[0] != ":") return [null, e];
	let r = e.indexOf(":", 1);
	if (r === -1) {
		if (t) throw new Error(`Unsupported format "${e}" expecting ":namespace:name"`);
		return [null, e];
	}
	return [e.slice(1, r), e.slice(r + 1)];
}
function cr(e) {
	return Z(e)[1] === "ng-container";
}
function ur(e) {
	return Z(e)[1] === "ng-content";
}
function Pe(e) {
	return e === null ? null : Z(e)[0];
}
function fe(e, t) {
	return e ? `:${e}:${t}` : t;
}
function Ra() {
	return et || (et = pr(), ee(1, void 0, [["iframe", ["srcdoc"]], ["*", ["innerHTML", "outerHTML"]]]), ee(2, void 0, [["*", ["style"]]]), ee(4, void 0, [
		["*", ["formAction"]],
		["area", ["href"]],
		["a", ["href", "xlink:href"]],
		["form", ["action"]],
		["img", ["src"]],
		["video", ["src"]]
	]), ee(4, Ia, [["*", ["href", "xlink:href"]]]), ee(5, void 0, [
		["base", ["href"]],
		["embed", ["src"]],
		["frame", ["src"]],
		["iframe", ["src"]],
		["link", ["href"]],
		["object", ["codebase", "data"]]
	]), ee(4, "svg", [["a", ["href", "xlink:href"]]]), ee(6, "svg", [
		["animate", [
			"attributeName",
			"values",
			"to",
			"from"
		]],
		["set", ["to", "attributeName"]],
		["animateMotion", ["attributeName"]],
		["animateTransform", ["attributeName"]]
	]), ee(6, void 0, [["unknown", [
		"attributeName",
		"values",
		"to",
		"from",
		"sandbox",
		"allow",
		"allowFullscreen",
		"referrerPolicy",
		"csp",
		"fetchPriority",
		"credentialless"
	]], ["iframe", [
		"sandbox",
		"allow",
		"allowFullscreen",
		"referrerPolicy",
		"csp",
		"fetchPriority",
		"credentialless"
	]]]), et);
}
function ee(e, t, r) {
	let n = t ?? "";
	for (let [s, a] of r) {
		let o = s.toLowerCase();
		for (let l of a) {
			var i;
			let c = l.toLowerCase(), u = (i = et)[c] ?? (i[c] = pr()), d = u[n] ?? (u[n] = pr());
			d[o] = e;
		}
	}
}
function ui(e, t, r) {
	let n = Ra()[t.toLowerCase()];
	if (!n) return 0;
	let i = e.toLowerCase(), s;
	if (r) {
		let a = n[r];
		a && (s = a[i] ?? a["*"]);
	}
	if (s === void 0) {
		let a = n[""];
		a && (s = a[i] ?? a["*"]);
	}
	return s ?? 0;
}
function pi(e) {
	return e.replace(Oa, (...t) => t[1].toUpperCase());
}
function Dt(e) {
	let [t, r] = Z(e.toLowerCase(), !1);
	return t === "svg" || t === "math" ? `:${t}:${r}` : r;
}
function Ua(e) {
	switch (e) {
		case "width":
		case "height":
		case "minWidth":
		case "minHeight":
		case "maxWidth":
		case "maxHeight":
		case "left":
		case "top":
		case "bottom":
		case "right":
		case "fontSize":
		case "outlineWidth":
		case "outlineOffset":
		case "paddingTop":
		case "paddingLeft":
		case "paddingBottom":
		case "paddingRight":
		case "marginTop":
		case "marginLeft":
		case "marginBottom":
		case "marginRight":
		case "borderRadius":
		case "borderWidth":
		case "borderTopWidth":
		case "borderLeftWidth":
		case "borderRightWidth":
		case "borderBottomWidth":
		case "textIndent": return !0;
		default: return !1;
	}
}
function Ne(e) {
	return tt || (di = new m({ canSelfClose: !0 }), tt = Object.assign(Object.create(null), {
		base: new m({ isVoid: !0 }),
		meta: new m({ isVoid: !0 }),
		area: new m({ isVoid: !0 }),
		embed: new m({ isVoid: !0 }),
		link: new m({ isVoid: !0 }),
		img: new m({ isVoid: !0 }),
		input: new m({ isVoid: !0 }),
		param: new m({ isVoid: !0 }),
		hr: new m({ isVoid: !0 }),
		br: new m({ isVoid: !0 }),
		source: new m({ isVoid: !0 }),
		track: new m({ isVoid: !0 }),
		wbr: new m({ isVoid: !0 }),
		p: new m({
			closedByChildren: [
				"address",
				"article",
				"aside",
				"blockquote",
				"div",
				"dl",
				"fieldset",
				"footer",
				"form",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"header",
				"hgroup",
				"hr",
				"main",
				"nav",
				"ol",
				"p",
				"pre",
				"section",
				"table",
				"ul"
			],
			closedByParent: !0
		}),
		thead: new m({ closedByChildren: ["tbody", "tfoot"] }),
		tbody: new m({
			closedByChildren: ["tbody", "tfoot"],
			closedByParent: !0
		}),
		tfoot: new m({
			closedByChildren: ["tbody"],
			closedByParent: !0
		}),
		tr: new m({
			closedByChildren: ["tr"],
			closedByParent: !0
		}),
		td: new m({
			closedByChildren: ["td", "th"],
			closedByParent: !0
		}),
		th: new m({
			closedByChildren: ["td", "th"],
			closedByParent: !0
		}),
		col: new m({ isVoid: !0 }),
		svg: new m({ implicitNamespacePrefix: "svg" }),
		foreignObject: new m({
			implicitNamespacePrefix: "svg",
			preventNamespaceInheritance: !0
		}),
		math: new m({ implicitNamespacePrefix: "math" }),
		li: new m({
			closedByChildren: ["li"],
			closedByParent: !0
		}),
		dt: new m({ closedByChildren: ["dt", "dd"] }),
		dd: new m({
			closedByChildren: ["dt", "dd"],
			closedByParent: !0
		}),
		rb: new m({
			closedByChildren: [
				"rb",
				"rt",
				"rtc",
				"rp"
			],
			closedByParent: !0
		}),
		rt: new m({
			closedByChildren: [
				"rb",
				"rt",
				"rtc",
				"rp"
			],
			closedByParent: !0
		}),
		rtc: new m({
			closedByChildren: [
				"rb",
				"rtc",
				"rp"
			],
			closedByParent: !0
		}),
		rp: new m({
			closedByChildren: [
				"rb",
				"rt",
				"rtc",
				"rp"
			],
			closedByParent: !0
		}),
		optgroup: new m({
			closedByChildren: ["optgroup"],
			closedByParent: !0
		}),
		option: new m({
			closedByChildren: ["option", "optgroup"],
			closedByParent: !0
		}),
		pre: new m({ ignoreFirstLf: !0 }),
		listing: new m({ ignoreFirstLf: !0 }),
		style: new m({ contentType: 0 }),
		script: new m({ contentType: 0 }),
		title: new m({ contentType: {
			default: 1,
			svg: 2
		} }),
		textarea: new m({
			contentType: 1,
			ignoreFirstLf: !0
		})
	}), new fi().allKnownElementNames().forEach((t) => {
		!tt[t] && Pe(t) === null && (tt[t] = new m({ canSelfClose: !1 }));
	})), tt[e] ?? di;
}
function It(e, t, r = null) {
	let n = [], i = e.visit ? (s) => e.visit(s, r) || s.visit(e, r) : (s) => s.visit(e, r);
	return t.forEach((s) => {
		let a = i(s);
		a && n.push(a);
	}), n;
}
function nt(e) {
	return e >= 9 && e <= 32 || e == 160;
}
function Ie(e) {
	return 48 <= e && e <= 57;
}
function Re(e) {
	return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function Ei(e) {
	return e >= 97 && e <= 102 || e >= 65 && e <= 70 || Ie(e);
}
function Oe(e) {
	return e === 10 || e === 13;
}
function _r(e) {
	return 48 <= e && e <= 55;
}
function Rt(e) {
	return e === 39 || e === 34 || e === 96;
}
function Di(e, t, r, n = {}) {
	let i = new Qa(new rt(e, t), r, n);
	return i.tokenize(), new za(no(i.tokens), i.errors, i.nonNormalizedIcuExpressions);
}
function Se(e) {
	return `Unexpected character "${e === 0 ? "EOF" : String.fromCharCode(e)}"`;
}
function xi(e) {
	return `Unknown entity "${e}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
function $a(e, t) {
	return `Unable to parse entity "${t}" - ${e} character reference entities must end with ";"`;
}
function b(e) {
	return !nt(e) || e === 0;
}
function ve(e) {
	return nt(e) || e === 62 || e === 60 || e === 47 || e === 39 || e === 34 || e === 61 || e === 0;
}
function Xa(e) {
	return (e < 97 || 122 < e) && (e < 65 || 90 < e) && (e < 48 || e > 57);
}
function Ja(e) {
	return e === 59 || e === 0 || !Ei(e);
}
function Za(e) {
	return e === 59 || e === 0 || !(Re(e) || Ie(e));
}
function eo(e) {
	return e !== 125;
}
function to(e, t) {
	return Li(e) === Li(t);
}
function Li(e) {
	return e >= 97 && e <= 122 ? e - 97 + 65 : e;
}
function ro(e) {
	return Re(e) || Ie(e) || e === 95;
}
function Ai(e) {
	return e !== 59 && b(e);
}
function Ot(e) {
	return e === 95 || e >= 65 && e <= 90;
}
function Pi(e) {
	return Re(e) || Ie(e) || e === 95;
}
function Ni(e) {
	return e === 47 || e === 62 || e === 60 || e === 0;
}
function no(e) {
	let t = [], r;
	for (let n = 0; n < e.length; n++) {
		let i = e[n];
		r && r.type === 5 && i.type === 5 || r && r.type === 17 && i.type === 17 ? (r.parts[0] += i.parts[0], r.sourceSpan.end = i.sourceSpan.end) : (r = i, t.push(r));
	}
	return t;
}
function Ri(e, t) {
	return e.length > 0 && e[e.length - 1] === t;
}
function Oi(e, t) {
	return _e[t] !== void 0 ? _e[t] || e : /^#x[a-f0-9]+$/i.test(t) ? String.fromCodePoint(parseInt(t.slice(2), 16)) : /^#\d+$/.test(t) ? String.fromCodePoint(parseInt(t.slice(1), 10)) : e;
}
function Mt(e, t = {}) {
	let { canSelfClose: r = !1, allowHtmComponentClosingTags: n = !1, allowStartTagComments: i = !1, isTagNameCaseSensitive: s = !1, getTagContentType: a, tokenizeAngularBlocks: o = !1, tokenizeAngularLetDeclaration: l = !1, enableAngularSelectorlessSyntax: c = !1 } = t;
	return kr ?? (kr = new Hi()), kr.parse(e, "angular-html-parser", {
		tokenizeExpansionForms: o,
		canSelfClose: r,
		allowHtmComponentClosingTags: n,
		allowStartTagComments: i,
		tokenizeBlocks: o,
		tokenizeLet: l,
		selectorlessEnabled: c
	}, s, a);
}
function lo(e, t) {
	for (let r of oo) r(e, t);
	return e;
}
function co(e) {
	e.walk((t) => {
		if (t.kind === "element" && t.tagDefinition.ignoreFirstLf && t.children.length > 0 && t.children[0].kind === "text" && t.children[0].value[0] === `
`) {
			let r = t.children[0];
			r.value.length === 1 ? t.removeChild(r) : r.value = r.value.slice(1);
		}
	});
}
function uo(e) {
	let t = (r) => r.kind === "element" && r.prev?.kind === "ieConditionalStartComment" && r.prev.sourceSpan.end.offset === r.startSourceSpan.start.offset && r.firstChild?.kind === "ieConditionalEndComment" && r.firstChild.sourceSpan.start.offset === r.startSourceSpan.end.offset;
	e.walk((r) => {
		if (r.children) for (let n = 0; n < r.children.length; n++) {
			let i = r.children[n];
			if (!t(i)) continue;
			let s = i.prev, a = i.firstChild;
			r.removeChild(s), n--;
			let o = new p(s.sourceSpan.start, a.sourceSpan.end), l = new p(o.start, i.sourceSpan.end);
			i.condition = s.condition, i.sourceSpan = l, i.startSourceSpan = o, i.removeChild(a);
		}
	});
}
function po(e, t, r) {
	e.walk((n) => {
		if (n.children) for (let i = 0; i < n.children.length; i++) {
			let s = n.children[i];
			if (s.kind !== "text" && !t(s)) continue;
			s.kind !== "text" && (s.kind = "text", s.value = r(s));
			let a = s.prev;
			!a || a.kind !== "text" || (a.value += s.value, a.sourceSpan = new p(a.sourceSpan.start, s.sourceSpan.end), n.removeChild(s), i--);
		}
	});
}
function ho(e) {
	return po(e, (t) => t.kind === "cdata", (t) => `<![CDATA[${t.value}]]>`);
}
function mo(e) {
	let t = (r) => r.kind === "element" && r.attrs.length === 0 && !X(r.startTagComments) && r.children.length === 1 && r.firstChild.kind === "text" && !P.hasWhitespaceCharacter(r.children[0].value) && !r.firstChild.hasLeadingSpaces && !r.firstChild.hasTrailingSpaces && r.isLeadingSpaceSensitive && !r.hasLeadingSpaces && r.isTrailingSpaceSensitive && !r.hasTrailingSpaces && r.prev?.kind === "text" && r.next?.kind === "text";
	e.walk((r) => {
		if (r.children) for (let n = 0; n < r.children.length; n++) {
			let i = r.children[n];
			if (!t(i)) continue;
			let s = i.prev, a = i.next;
			s.value += `<${i.rawName}>` + i.firstChild.value + `</${i.rawName}>` + a.value, s.sourceSpan = new p(s.sourceSpan.start, a.sourceSpan.end), s.isTrailingSpaceSensitive = a.isTrailingSpaceSensitive, s.hasTrailingSpaces = a.hasTrailingSpaces, r.removeChild(i), n--, r.removeChild(a);
		}
	});
}
function fo(e, t) {
	if (t.parser === "html") return;
	let r = /\{\{(.+?)\}\}/s;
	e.walk((n) => {
		if (rn(n, t)) for (let i of n.children) {
			if (i.kind !== "text") continue;
			let s = i.sourceSpan.start, a, o = i.value.split(r);
			for (let l = 0; l < o.length; l++, s = a) {
				let c = o[l];
				if (l % 2 === 0) {
					a = s.moveBy(c.length), c.length > 0 && n.insertChildBefore(i, {
						kind: "text",
						value: c,
						sourceSpan: new p(s, a)
					});
					continue;
				}
				a = s.moveBy(c.length + 4), n.insertChildBefore(i, {
					kind: "interpolation",
					sourceSpan: new p(s, a),
					children: c.length === 0 ? [] : [{
						kind: "text",
						value: c,
						sourceSpan: new p(s.moveBy(2), a.moveBy(-2))
					}]
				});
			}
			n.removeChild(i);
		}
	});
}
function go(e, t) {
	e.walk((r) => {
		let n = r.$children;
		if (!n) return;
		if (n.length === 0 || n.length === 1 && n[0].kind === "text" && P.trim(n[0].value).length === 0) {
			r.hasDanglingSpaces = n.length > 0, r.$children = [];
			return;
		}
		let i = nn(r, t), s = er(r);
		if (!i) for (let a = 0; a < n.length; a++) {
			let o = n[a];
			if (o.kind !== "text") continue;
			let { leadingWhitespace: l, text: c, trailingWhitespace: u } = tn(o.value), d = o.prev, _ = o.next;
			c ? (o.value = c, o.sourceSpan = new p(o.sourceSpan.start.moveBy(l.length), o.sourceSpan.end.moveBy(-u.length)), l && (d && (d.hasTrailingSpaces = !0), o.hasLeadingSpaces = !0), u && (o.hasTrailingSpaces = !0, _ && (_.hasLeadingSpaces = !0))) : (r.removeChild(o), a--, (l || u) && (d && (d.hasTrailingSpaces = !0), _ && (_.hasLeadingSpaces = !0)));
		}
		r.isWhitespaceSensitive = i, r.isIndentationSensitive = s;
	});
}
function _o(e) {
	e.walk((t) => {
		t.isSelfClosing = !t.children || t.kind === "element" && (t.tagDefinition.isVoid || t.endSourceSpan && t.startSourceSpan.start === t.endSourceSpan.start && t.startSourceSpan.end === t.endSourceSpan.end);
	});
}
function So(e, t) {
	e.walk((r) => {
		r.kind === "element" && (r.hasHtmComponentClosingTag = r.endSourceSpan && /^<\s*\/\s*\/\s*>$/.test(t.originalText.slice(r.endSourceSpan.start.offset, r.endSourceSpan.end.offset)));
	});
}
function vo(e, t) {
	e.walk((r) => {
		r.cssDisplay = fn(r, t);
	});
}
function Co(e, t) {
	e.walk((r) => {
		let { children: n } = r;
		if (n) {
			if (n.length === 0) {
				r.isDanglingSpaceSensitive = on(r, t);
				return;
			}
			for (let i of n) i.isLeadingSpaceSensitive = sn(i, t), i.isTrailingSpaceSensitive = an(i, t);
			for (let i = 0; i < n.length; i++) {
				let s = n[i];
				s.isLeadingSpaceSensitive = (i === 0 || s.prev.isTrailingSpaceSensitive) && s.isLeadingSpaceSensitive, s.isTrailingSpaceSensitive = (i === n.length - 1 || s.next.isLeadingSpaceSensitive) && s.isTrailingSpaceSensitive;
			}
		}
	});
}
function ko(e, t, r) {
	let { node: n } = e;
	switch (n.kind) {
		case "root": return t.__onHtmlRoot && t.__onHtmlRoot(n), [C(Ae(e, t, r)), k];
		case "element":
		case "ieConditionalComment": return li(e, t, r);
		case "angularControlFlowBlock": return ni(e, t, r);
		case "angularControlFlowBlockParameters": return si(e, t, r);
		case "angularControlFlowBlockParameter": return P.trim(n.expression);
		case "angularLetDeclaration": return C([
			"@let ",
			C([
				n.id,
				" =",
				C(A([S, r("init")]))
			]),
			";"
		]);
		case "angularLetDeclarationInitializer": return n.value;
		case "angularIcuExpression": return ai(e, t, r);
		case "angularIcuCase": return oi(e, t, r);
		case "ieConditionalStartComment":
		case "ieConditionalEndComment": return [me(n), ue(n)];
		case "interpolation": return [
			me(n, t),
			...e.map(r, "children"),
			ue(n, t)
		];
		case "text": {
			if (n.parent.kind === "interpolation") {
				let o = /\n[^\S\n]*$/, l = o.test(n.value);
				return [L(l ? n.value.replace(o, "") : n.value), l ? k : ""];
			}
			let i = B(n, t), s = Tt(n), a = M(n, t);
			return s[0] = [i, s[0]], s.push([s.pop(), a]), gt(s);
		}
		case "docType": return [C([
			me(n, t),
			" ",
			T(0, n.value.replace(/^html\b/i, "html"), /\s+/g, " ")
		]), ue(n, t)];
		case "comment": return [
			B(n, t),
			L(t.originalText.slice(F(n), J(n))),
			M(n, t)
		];
		case "attribute": {
			if (n.value === null) return n.rawName;
			let i = nr(n.value), s = Et(n, t) ? "" : Wr(i, "\"");
			return [
				n.rawName,
				"=",
				s,
				L(s === "\"" ? T(0, i, "\"", "&quot;") : T(0, i, "'", "&apos;")),
				s
			];
		}
		case "startTagComment": return ci(e);
		default: throw new Gr(n, "HTML");
	}
}
function To(e, t) {
	let r = /* @__PURE__ */ new SyntaxError(e + " (" + t.loc.start.line + ":" + t.loc.start.column + ")");
	return Object.assign(r, t);
}
function Bt(e) {
	return {
		...yo,
		...e
	};
}
function wr(e) {
	let { canSelfClose: t, allowHtmComponentClosingTags: r, allowStartTagComments: n, isTagNameCaseSensitive: i, shouldParseAsRawText: s, tokenizeAngularBlocks: a, tokenizeAngularLetDeclaration: o } = e;
	return {
		canSelfClose: t,
		allowHtmComponentClosingTags: r,
		allowStartTagComments: n,
		isTagNameCaseSensitive: i,
		getTagContentType: s ? (...l) => s(...l) ? lr.RAW_TEXT : void 0 : void 0,
		tokenizeAngularBlocks: a,
		tokenizeAngularLetDeclaration: o
	};
}
function Eo(e, t) {
	let r = e.map(t);
	return r.some((n, i) => n !== e[i]) ? r : e;
}
function Yi(e, t) {
	if (e.value) for (let { regex: r, parse: n } of xo) {
		let i = e.value.match(r);
		if (i) return n(e, i, t);
	}
	return null;
}
function Lo(e, t, r) {
	let { openingTagSuffix: n, condition: i, data: s } = t.groups, a = 4 + n.length, o = e.sourceSpan.start.moveBy(a), l = o.moveBy(s.length), [c, u] = (() => {
		try {
			return [!0, r(s, o).children];
		} catch {
			return [!1, [{
				kind: "text",
				value: s,
				sourceSpan: new p(o, l)
			}]];
		}
	})();
	return {
		kind: "ieConditionalComment",
		complete: c,
		children: u,
		condition: T(0, i.trim(), /\s+/g, " "),
		sourceSpan: e.sourceSpan,
		startSourceSpan: new p(e.sourceSpan.start, o),
		endSourceSpan: new p(l, e.sourceSpan.end)
	};
}
function Ao(e, t) {
	let { condition: r } = t.groups;
	return {
		kind: "ieConditionalStartComment",
		condition: T(0, r.trim(), /\s+/g, " "),
		sourceSpan: e.sourceSpan
	};
}
function Po(e) {
	return {
		kind: "ieConditionalEndComment",
		sourceSpan: e.sourceSpan
	};
}
function Xi(e, t, r, n) {
	let i = r.name === "angular";
	It(new Er(), e.children, { parseOptions: r }), t && e.children.unshift(t);
	let s = new Ft(e);
	return s.walk((a) => {
		if (a.kind === "comment") {
			let o = Yi(a, n);
			o && a.parent.replaceChild(a, o);
		} else i && a.kind === "element" && a.comments && (a.startTagComments = a.comments, delete a.comments);
		i && (No(a), Do(a), Io(a));
	}), s;
}
function No(e) {
	if (e.kind === "block") {
		if (e.name = T(0, e.name.toLowerCase(), /\s+/g, " ").trim(), e.kind = "angularControlFlowBlock", !X(e.parameters)) {
			delete e.parameters;
			return;
		}
		for (let t of e.parameters) t.kind = "angularControlFlowBlockParameter";
		e.parameters = {
			kind: "angularControlFlowBlockParameters",
			children: e.parameters,
			sourceSpan: new p(e.parameters[0].sourceSpan.start, I(0, e.parameters, -1).sourceSpan.end)
		};
	}
}
function Do(e) {
	e.kind === "letDeclaration" && (e.kind = "angularLetDeclaration", e.id = e.name, e.init = {
		kind: "angularLetDeclarationInitializer",
		sourceSpan: new p(e.valueSpan.start, e.valueSpan.end),
		value: e.value
	}, delete e.name, delete e.value);
}
function Io(e) {
	e.kind === "expansion" && (e.kind = "angularIcuExpression"), e.kind === "expansionCase" && (e.kind = "angularIcuCase");
}
function Ki(e, t) {
	let r = e.toLowerCase();
	return t(r) ? r : e;
}
function Qi(e) {
	let t = e.name.startsWith(":") ? e.name.slice(1).split(":", 1)[0] : null, r = e.nameSpan.toString(), n = t !== null && r.startsWith(`${t}:`);
	e.name = n ? r.slice(t.length + 1) : r, e.namespace = t, e.hasExplicitNamespace = n;
}
function Ro(e) {
	switch (e.kind) {
		case "element":
			Qi(e);
			for (let t of e.attrs) Qi(t), t.valueSpan ? (t.value = t.valueSpan.toString(), /["']/.test(t.value[0]) && (t.value = t.value.slice(1, -1))) : t.value = null;
			break;
		case "comment":
			e.value = e.sourceSpan.toString().slice(4, -3);
			break;
		case "text":
			e.value = e.sourceSpan.toString();
			break;
	}
}
function Oo(e, t) {
	if (e.kind === "element") {
		let r = Ne(t.isTagNameCaseSensitive ? e.name : e.name.toLowerCase());
		!e.namespace || e.namespace === r.implicitNamespacePrefix || oe(e) ? e.tagDefinition = r : e.tagDefinition = Ne("");
	}
}
function Mo(e) {
	e.sourceSpan && e.endSourceSpan && (e.sourceSpan = new p(e.sourceSpan.start, e.endSourceSpan.end));
}
function Bo(e, t) {
	if (e.kind === "element" && (t.normalizeTagName && (!e.namespace || e.namespace === e.tagDefinition.implicitNamespacePrefix || oe(e)) && (e.name = Ki(e.name, (r) => $i.has(r))), t.normalizeAttributeName)) for (let r of e.attrs) r.namespace || (r.name = Ki(r.name, (n) => qt.has(e.name) && (qt.get("*").has(n) || qt.get(e.name).has(n))));
}
function Lr(e, t) {
	let { rootNodes: r, errors: n } = Mt(e, wr(t));
	return n.length > 0 && xr(n[0]), {
		parseOptions: t,
		rootNodes: r
	};
}
function Ji(e, t) {
	let r = wr(t), { rootNodes: n, errors: i } = Mt(e, r);
	if (n.some((c) => c.kind === "docType" && c.value === "html" || c.kind === "element" && c.name.toLowerCase() === "html")) return Lr(e, Vt);
	let a, o = () => a ?? (a = Mt(e, {
		...r,
		getTagContentType: void 0
	})), l = (c) => {
		let { offset: u } = c.startSourceSpan.start;
		return o().rootNodes.find((d) => d.kind === "element" && d.startSourceSpan.start.offset === u) ?? c;
	};
	for (let [c, u] of n.entries()) if (u.kind === "element") {
		if (u.isVoid) i = o().errors, n[c] = l(u);
		else if (qo(u)) {
			let { endSourceSpan: d, startSourceSpan: _ } = u, h = o().errors.find((f) => f.span.start.offset > _.start.offset && f.span.start.offset < d.end.offset);
			h && xr(h), n[c] = l(u);
		}
	}
	return i.length > 0 && xr(i[0]), {
		parseOptions: t,
		rootNodes: n
	};
}
function qo(e) {
	if (e.kind !== "element" || e.name !== "template") return !1;
	let t = e.attrs.find((r) => r.name === "lang")?.value;
	return !t || t === "html";
}
function xr(e) {
	let { msg: t, span: { start: r, end: n } } = e;
	throw Gi(t, {
		loc: {
			start: {
				line: r.line + 1,
				column: r.col + 1
			},
			end: {
				line: n.line + 1,
				column: n.col + 1
			}
		},
		cause: e
	});
}
function Ho(e, t, r, n, i, s) {
	let { offset: a } = n, l = Ar(vt(t.slice(0, a)) + r, e, {
		...i,
		shouldParseFrontMatter: !1
	}, s);
	l.sourceSpan = new p(n, I(0, l.children, -1).sourceSpan.end);
	let c = l.children[0];
	return c.length === a ? l.children.shift() : (c.sourceSpan = new p(c.sourceSpan.start.moveBy(a), c.sourceSpan.end), c.value = c.value.slice(a)), l;
}
function Ar(e, t, r, n = {}) {
	let { frontMatter: i, content: s } = r.shouldParseFrontMatter ? Qt(e) : { content: e }, a = new rt(e, n.filepath), o = new De(a, 0, 0, 0), l = o.moveBy(e.length), { parseOptions: c, rootNodes: u } = t(s, r), d = {
		kind: "root",
		sourceSpan: new p(o, l),
		children: u
	}, _;
	if (i) {
		let [f, g] = [i.start, i.end].map((v) => new De(a, v.index, v.line - 1, v.column));
		_ = {
			...i,
			kind: "frontMatter",
			sourceSpan: new p(f, g)
		};
	}
	return Xi(d, _, c, (f, g) => Ho(t, e, f, g, c, n));
}
function st(e) {
	let t = Bt(e), r = t.name === "vue" ? Ji : Lr;
	return {
		parse: (n, i) => Ar(n, r, t, i),
		hasPragma: Jn,
		hasIgnorePragma: Zn,
		astFormat: "html",
		locStart: F,
		locEnd: J
	};
}
var Nr, Dr, es, Ir, Wt, ts, qe, Rr, Zi, ke, rs, T, I, as, He, Fe, Ve, ot, be, we, lt, Te, ye, Ee, xe, ct, ut, z, pt, Le, ht, ft, ls, zt, Or, D, dt, Br, qr, G, S, y, k, Mr, Vr, Ur, ms, fs, jt, P, Yt, Gr, $r, se, vs, jr, bs, Kr, Qr, X, xs, _t, St, ae, vt, Ue, Qt, Zr, Xt, en, Jt, oe, Rs, Zt, tn, js, Sn, vn, ir, Ks, kn, bn, wn, Js, Tn, yn, En, xn, ea, ta, ra, na, Pn, ia, Nn, Dn, In, aa, On, Mn, oa, H, ua, ma, Un, F, J, Wn, Pt, ba, Gn, Qe, Ta, $n, Je, Yn, xa, La, Kn, Qn, Xn, Jn, Zn, ei, ti, Aa, Pa, lr, et, Ia, pr, hr, mr, Oa, hi, Ma, Ba, qa, Ha, Fa, mi, Va, fi, m, di, tt, De, rt, p, Wa, te, de, _i, Si, vi, Ci, ki, bi, re, wi, Ti, ge, U, yi, fr, dr, gr, _e, za, Ga, ja, it, Ya, Ka, Qa, Ii, io, Cr, x, so, Bi, ao, Hi, kr, oo, Fi, Vi, Ui, br, Wi, zi, Pr, Gi, yo, qt, $i, Ht, ji, ne, Tr, yr, Me, Ft, xo, Er, Vt, Fo, Vo, Uo, Wo, zo, Go, $o;
//#endregion
__esmMin((() => {
	Nr = Object.defineProperty;
	Dr = (e) => {
		throw TypeError(e);
	};
	es = (e, t, r) => t in e ? Nr(e, t, {
		enumerable: !0,
		configurable: !0,
		writable: !0,
		value: r
	}) : e[t] = r;
	Ir = (e, t) => {
		for (var r in t) Nr(e, r, {
			get: t[r],
			enumerable: !0
		});
	};
	Wt = (e, t, r) => es(e, typeof t != "symbol" ? t + "" : t, r);
	ts = (e, t, r) => t.has(e) || Dr("Cannot " + r);
	qe = (e, t, r) => (ts(e, t, "read from private field"), r ? r.call(e) : t.get(e));
	Rr = (e, t, r) => t.has(e) ? Dr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r);
	Zi = {};
	Ir(Zi, {
		languages: () => Ui,
		options: () => zi,
		parsers: () => Pr,
		printers: () => $o
	});
	ke = (e, t) => (r, n, ...i) => r | 1 && n == null ? void 0 : (t.call(n) ?? n[e]).apply(n, i);
	rs = String.prototype.replaceAll ?? function(e, t) {
		return e.global ? this.replace(e, t) : this.split(e).join(t);
	};
	T = ke("replaceAll", function() {
		if (typeof this == "string") return rs;
	});
	I = ke("at", function() {
		if (Array.isArray(this) || typeof this == "string") return is;
	});
	as = () => {};
	He = as;
	Fe = "string";
	Ve = "array";
	ot = "cursor";
	be = "indent";
	we = "align";
	lt = "trim";
	Te = "group";
	ye = "fill";
	Ee = "if-break";
	xe = "indent-if-break";
	ct = "line-suffix";
	ut = "line-suffix-boundary";
	z = "line";
	pt = "label";
	Le = "break-parent";
	ht = /* @__PURE__ */ new Set([
		ot,
		be,
		we,
		lt,
		Te,
		ye,
		Ee,
		xe,
		ct,
		ut,
		z,
		pt,
		Le
	]);
	ft = os;
	ls = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
	zt = class extends Error {
		name = "InvalidDocError";
		constructor(t) {
			super(cs(t)), this.doc = t;
		}
	};
	Or = zt;
	D = He;
	dt = He;
	Br = He;
	qr = He;
	G = { type: Le };
	S = { type: z };
	y = {
		type: z,
		soft: !0
	};
	k = [{
		type: z,
		hard: !0
	}, G];
	Mr = [{
		type: z,
		hard: !0,
		literal: !0
	}, G];
	Vr = Object.freeze({
		character: "'",
		codePoint: 39
	});
	Ur = Object.freeze({
		character: "\"",
		codePoint: 34
	});
	ms = Object.freeze({
		preferred: Vr,
		alternate: Ur
	});
	fs = Object.freeze({
		preferred: Ur,
		alternate: Vr
	});
	jt = class {
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
			return this.#e.has(I(0, t, -1));
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
			let n = `[${$t([...this.#e].join(""))}]+`, i = new RegExp(r ? `(${n})` : n);
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
	P = new jt([
		"	",
		`
`,
		"\f",
		"\r",
		" "
	]);
	Yt = class extends Error {
		name = "UnexpectedNodeError";
		constructor(t, r, n = "type") {
			super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`), this.node = t;
		}
	};
	Gr = Yt;
	$r = _s;
	se = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty);
	vs = Array.prototype.toReversed ?? function() {
		return [...this].reverse();
	};
	jr = ke("toReversed", function() {
		if (Array.isArray(this)) return vs;
	});
	bs = ks();
	Kr = (e) => String(e).split(/[/\\]/).pop();
	Qr = (e) => String(e).startsWith("file:");
	X = ys;
	xs = void 0;
	_t = Ls;
	St = Symbol.for("PRETTIER_IS_FRONT_MATTER");
	ae = As;
	vt = Ps;
	Ue = 3;
	Qt = Ds;
	Zr = "inline";
	Xt = {
		area: "none",
		base: "none",
		basefont: "none",
		datalist: "none",
		head: "none",
		link: "none",
		meta: "none",
		noembed: "none",
		noframes: "none",
		param: "block",
		rp: "none",
		script: "block",
		style: "none",
		template: "inline",
		title: "none",
		html: "block",
		body: "block",
		address: "block",
		blockquote: "block",
		center: "block",
		dialog: "block",
		div: "block",
		figure: "block",
		figcaption: "block",
		footer: "block",
		form: "block",
		header: "block",
		hr: "block",
		legend: "block",
		listing: "block",
		main: "block",
		p: "block",
		plaintext: "block",
		pre: "block",
		search: "block",
		xmp: "block",
		slot: "contents",
		ruby: "ruby",
		rt: "ruby-text",
		article: "block",
		aside: "block",
		h1: "block",
		h2: "block",
		h3: "block",
		h4: "block",
		h5: "block",
		h6: "block",
		hgroup: "block",
		nav: "block",
		section: "block",
		dir: "block",
		dd: "block",
		dl: "block",
		dt: "block",
		menu: "block",
		ol: "block",
		ul: "block",
		li: "list-item",
		table: "table",
		caption: "table-caption",
		colgroup: "table-column-group",
		col: "table-column",
		thead: "table-header-group",
		tbody: "table-row-group",
		tfoot: "table-footer-group",
		tr: "table-row",
		td: "table-cell",
		th: "table-cell",
		input: "inline-block",
		button: "inline-block",
		fieldset: "block",
		details: "block",
		summary: "block",
		marquee: "inline-block",
		option: "block",
		optgroup: "block",
		select: "inline-block",
		source: "block",
		track: "block",
		meter: "inline-block",
		progress: "inline-block",
		object: "inline-block",
		video: "inline-block",
		audio: "inline-block"
	};
	en = "normal";
	Jt = {
		listing: "pre",
		plaintext: "pre",
		pre: "pre",
		xmp: "pre",
		nobr: "nowrap",
		table: "initial",
		textarea: "pre-wrap"
	};
	oe = Is;
	Rs = (e) => T(0, e, /^[\t\f\r ]*\n/g, "");
	Zt = (e) => Rs(P.trimEnd(e));
	tn = (e) => {
		let t = e, r = P.getLeadingWhitespace(t);
		r && (t = t.slice(r.length));
		let n = P.getTrailingWhitespace(t);
		return n && (t = t.slice(0, -n.length)), {
			leadingWhitespace: r,
			trailingWhitespace: n,
			text: t
		};
	};
	js = /* @__PURE__ */ new Set([
		"template",
		"style",
		"script"
	]);
	Sn = /\{\{(.+?)\}\}/s;
	vn = ({ node: { value: e } }) => Sn.test(e);
	ir = (e) => (t, r, n) => E(w(n.node), t, { parser: e }, q);
	Ks = [
		{
			test(e) {
				let t = e.node.fullName;
				return t.startsWith("(") && t.endsWith(")") || t.startsWith("on-");
			},
			print: ir("__ng_action")
		},
		{
			test(e) {
				let t = e.node.fullName;
				return t.startsWith("[") && t.endsWith("]") || /^bind(?:on)?-/.test(t) || /^ng-(?:if|show|hide|class|style)$/.test(t);
			},
			print: ir("__ng_binding")
		},
		{
			test: (e) => e.node.fullName.startsWith("*"),
			print: ir("__ng_directive")
		},
		{
			test: (e) => /^i18n(?:-.+)?$/.test(e.node.fullName),
			print: Qs
		},
		{
			test: vn,
			print: Cn
		}
	].map(({ test: e, print: t }) => ({
		test: (r, n) => n.parser === "angular" && e(r),
		print: t
	}));
	kn = Ks;
	bn = ({ node: e }, t) => !t.parentParser && e.fullName === "class" && !e.value.includes("{{");
	wn = (e, t, r) => T(0, w(r.node).trim(), /\s+/g, " ");
	Js = /* @__PURE__ */ new Set([
		"onabort",
		"onafterprint",
		"onauxclick",
		"onbeforeinput",
		"onbeforematch",
		"onbeforeprint",
		"onbeforetoggle",
		"onbeforeunload",
		"onblur",
		"oncancel",
		"oncanplay",
		"oncanplaythrough",
		"onchange",
		"onclick",
		"onclose",
		"oncommand",
		"oncontextlost",
		"oncontextmenu",
		"oncontextrestored",
		"oncopy",
		"oncuechange",
		"oncut",
		"ondblclick",
		"ondrag",
		"ondragend",
		"ondragenter",
		"ondragleave",
		"ondragover",
		"ondragstart",
		"ondrop",
		"ondurationchange",
		"onemptied",
		"onended",
		"onerror",
		"onfocus",
		"onformdata",
		"onhashchange",
		"oninput",
		"oninvalid",
		"onkeydown",
		"onkeypress",
		"onkeyup",
		"onlanguagechange",
		"onload",
		"onloadeddata",
		"onloadedmetadata",
		"onloadstart",
		"onmessage",
		"onmessageerror",
		"onmousedown",
		"onmouseenter",
		"onmouseleave",
		"onmousemove",
		"onmouseout",
		"onmouseover",
		"onmouseup",
		"onoffline",
		"ononline",
		"onpagehide",
		"onpagereveal",
		"onpageshow",
		"onpageswap",
		"onpaste",
		"onpause",
		"onplay",
		"onplaying",
		"onpopstate",
		"onprogress",
		"onratechange",
		"onrejectionhandled",
		"onreset",
		"onresize",
		"onscroll",
		"onscrollend",
		"onsecuritypolicyviolation",
		"onseeked",
		"onseeking",
		"onselect",
		"onslotchange",
		"onstalled",
		"onstorage",
		"onsubmit",
		"onsuspend",
		"ontimeupdate",
		"ontoggle",
		"onunhandledrejection",
		"onunload",
		"onvolumechange",
		"onwaiting",
		"onwheel"
	]);
	Tn = ({ node: e }, t) => Js.has(e.fullName) && !t.parentParser && !e.value.includes("{{");
	yn = (e, t, r) => E(w(r.node), e, {
		parser: "babel",
		__isHtmlInlineEventHandler: !0
	}, () => !1);
	En = Zs;
	xn = ({ node: e }, t) => e.fullName === "allow" && !t.parentParser && e.parent.fullName === "iframe" && !e.value.includes("{{");
	ea = /^[ \t\n\r\u000c]+/;
	ta = /^[, \t\n\r\u000c]+/;
	ra = /^[^ \t\n\r\u000c]+/;
	na = /[,]+$/;
	Pn = /^\d+$/;
	ia = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
	Nn = sa;
	Dn = (e) => e.node.fullName === "srcset" && (e.parent.fullName === "img" || e.parent.fullName === "source");
	In = {
		width: "w",
		height: "h",
		density: "x"
	};
	aa = Object.keys(In);
	On = ({ node: e }, t) => e.fullName === "style" && !t.parentParser && !e.value.includes("{{");
	Mn = async (e, t, r) => j(await e(w(r.node), {
		parser: "css",
		__isHTMLStyleAttribute: !0
	}));
	oa = /* @__PURE__ */ new WeakMap();
	H = la;
	ua = [
		{
			test: (e) => e.node.fullName === "v-for",
			print: Hn
		},
		{
			test: (e, t) => e.node.fullName === "generic" && yt(e.parent, t),
			print: Bn
		},
		{
			test: ({ node: e }, t) => gn(e) || _n(e, t),
			print: qn
		},
		{
			test(e) {
				let t = e.node.fullName;
				return t.startsWith("@") || t.startsWith("v-on:");
			},
			print: pa
		},
		{
			test(e) {
				let t = e.node.fullName;
				return t.startsWith(":") || t.startsWith(".") || t.startsWith("v-bind:");
			},
			print: ha
		},
		{
			test: (e) => e.node.fullName.startsWith("v-"),
			print: Fn
		}
	].map(({ test: e, print: t }) => ({
		test: (r, n) => n.parser === "vue" && e(r, n),
		print: t
	}));
	ma = [
		{
			test: Dn,
			print: Rn
		},
		{
			test: On,
			print: Mn
		},
		{
			test: Tn,
			print: yn
		},
		{
			test: bn,
			print: wn
		},
		{
			test: xn,
			print: Ln
		},
		...ua,
		...kn
	].map(({ test: e, print: t }) => ({
		test: e,
		print: da(t)
	}));
	Un = fa;
	F = (e) => e.sourceSpan.start.offset;
	J = (e) => e.sourceSpan.end.offset;
	Wn = "<!doctype";
	Pt = ka;
	ba = /* @__PURE__ */ new Set([
		"if",
		"else if",
		"for",
		"switch",
		"case"
	]);
	Gn = wa;
	Qe = null;
	Ta = 10;
	for (let e = 0; e <= Ta; e++) Xe();
	$n = ya;
	Je = [["children"]];
	Yn = $n({
		root: Je[0],
		element: [
			"attrs",
			"startTagComments",
			"children"
		],
		ieConditionalComment: Je[0],
		ieConditionalStartComment: [],
		ieConditionalEndComment: [],
		interpolation: Je[0],
		text: Je[0],
		docType: [],
		comment: [],
		attribute: [],
		startTagComment: [],
		cdata: [],
		angularControlFlowBlock: ["children", "parameters"],
		angularControlFlowBlockParameters: Je[0],
		angularControlFlowBlockParameter: [],
		angularLetDeclaration: ["init"],
		angularLetDeclarationInitializer: [],
		angularIcuExpression: ["cases"],
		angularIcuCase: ["expression"]
	}, "kind");
	xa = /* @__PURE__ */ new Set([
		"sourceSpan",
		"startSourceSpan",
		"endSourceSpan",
		"nameSpan",
		"valueSpan",
		"keySpan",
		"tagDefinition",
		"tokens",
		"valueTokens",
		"switchValueSourceSpan",
		"expSourceSpan",
		"valueSourceSpan"
	]);
	La = /* @__PURE__ */ new Set([
		"if",
		"else if",
		"for",
		"switch",
		"case"
	]);
	or.ignoredProperties = xa;
	Kn = "format";
	Qn = /^\s*<!--\s*@(?:noformat|noprettier)\s*-->/;
	Xn = /^\s*<!--\s*@(?:format|prettier)\s*-->/;
	Jn = (e) => Xn.test(e);
	Zn = (e) => Qn.test(e);
	ei = (e) => `<!-- @${Kn} -->

${e}`;
	ti = /* @__PURE__ */ new Map([
		["if", /* @__PURE__ */ new Set(["else if", "else"])],
		["else if", /* @__PURE__ */ new Set(["else if", "else"])],
		["for", /* @__PURE__ */ new Set(["empty"])],
		["defer", /* @__PURE__ */ new Set([
			"placeholder",
			"error",
			"loading"
		])],
		["placeholder", /* @__PURE__ */ new Set([
			"placeholder",
			"error",
			"loading"
		])],
		["error", /* @__PURE__ */ new Set([
			"placeholder",
			"error",
			"loading"
		])],
		["loading", /* @__PURE__ */ new Set([
			"placeholder",
			"error",
			"loading"
		])]
	]);
	Aa = (e) => e?.kind === "angularControlFlowBlock" && (e.name === "case" || e.name === "default");
	Pa = (e) => e?.kind === "angularControlFlowBlock" && e.name === "default never";
	lr = (function(e) {
		return e[e.RAW_TEXT = 0] = "RAW_TEXT", e[e.ESCAPABLE_RAW_TEXT = 1] = "ESCAPABLE_RAW_TEXT", e[e.PARSABLE_DATA = 2] = "PARSABLE_DATA", e;
	})({});
	Ia = "math";
	pr = () => Object.create(null);
	hr = { name: "custom-elements" };
	mr = { name: "no-errors-schema" };
	Oa = /-+([a-z0-9])/g;
	hi = class {};
	Ma = "boolean";
	Ba = "number";
	qa = "string";
	Ha = "object";
	Fa = [
		"[Element]|textContent,%ariaActiveDescendantElement,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColIndexText,%ariaColSpan,%ariaControlsElements,%ariaCurrent,%ariaDescribedByElements,%ariaDescription,%ariaDetailsElements,%ariaDisabled,%ariaErrorMessageElements,%ariaExpanded,%ariaFlowToElements,%ariaHasPopup,%ariaHidden,%ariaInvalid,%ariaKeyShortcuts,%ariaLabel,%ariaLabelledByElements,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaOwnsElements,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowIndexText,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored",
		"[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,!inert,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
		"abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,search,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
		"media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume",
		":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex",
		":svg:graphics^:svg:|",
		":svg:animation^:svg:|*begin,*end,*repeat",
		":svg:geometry^:svg:|",
		":svg:componentTransferFunction^:svg:|",
		":svg:gradient^:svg:|",
		":svg:textContent^:svg:graphics|",
		":svg:textPositioning^:svg:textContent|",
		"a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username",
		"area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username",
		"audio^media|",
		"br^[HTMLElement]|clear",
		"base^[HTMLElement]|href,target",
		"body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink",
		"button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value",
		"canvas^[HTMLElement]|#height,#width",
		"content^[HTMLElement]|select",
		"dl^[HTMLElement]|!compact",
		"data^[HTMLElement]|value",
		"datalist^[HTMLElement]|",
		"details^[HTMLElement]|!open",
		"dialog^[HTMLElement]|!open,returnValue",
		"dir^[HTMLElement]|!compact",
		"div^[HTMLElement]|align",
		"embed^[HTMLElement]|align,height,name,src,type,width",
		"fieldset^[HTMLElement]|!disabled,name",
		"font^[HTMLElement]|color,face,size",
		"form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target",
		"frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src",
		"frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows",
		"geolocation^[HTMLElement]|accuracymode,!autolocate,*location,*promptaction,*promptdismiss,*validationstatuschange,!watch",
		"hr^[HTMLElement]|align,color,!noShade,size,width",
		"head^[HTMLElement]|",
		"h1,h2,h3,h4,h5,h6^[HTMLElement]|align",
		"html^[HTMLElement]|version",
		"iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,!credentialless,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width",
		"img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width",
		"input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width",
		"li^[HTMLElement]|type,#value",
		"label^[HTMLElement]|htmlFor",
		"legend^[HTMLElement]|align",
		"link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type",
		"map^[HTMLElement]|name",
		"marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width",
		"menu^[HTMLElement]|!compact",
		"meta^[HTMLElement]|content,httpEquiv,media,name,scheme",
		"meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value",
		"ins,del^[HTMLElement]|cite,dateTime",
		"ol^[HTMLElement]|!compact,!reversed,#start,type",
		"object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width",
		"optgroup^[HTMLElement]|!disabled,label",
		"option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value",
		"output^[HTMLElement]|defaultValue,%htmlFor,name,value",
		"p^[HTMLElement]|align",
		"param^[HTMLElement]|name,type,value,valueType",
		"picture^[HTMLElement]|",
		"pre^[HTMLElement]|#width",
		"progress^[HTMLElement]|#max,#value",
		"q,blockquote,cite^[HTMLElement]|",
		"script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type",
		"select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value",
		"selectedcontent^[HTMLElement]|",
		"slot^[HTMLElement]|name",
		"source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width",
		"span^[HTMLElement]|",
		"style^[HTMLElement]|!disabled,media,type",
		"search^[HTMLELement]|",
		"caption^[HTMLElement]|align",
		"th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width",
		"col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width",
		"table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width",
		"tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign",
		"tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign",
		"template^[HTMLElement]|",
		"textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap",
		"time^[HTMLElement]|dateTime",
		"title^[HTMLElement]|text",
		"track^[HTMLElement]|!default,kind,label,src,srclang",
		"ul^[HTMLElement]|!compact,type",
		"unknown^[HTMLElement]|",
		"video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width",
		":svg:a^:svg:graphics|",
		":svg:animate^:svg:animation|",
		":svg:animateMotion^:svg:animation|",
		":svg:animateTransform^:svg:animation|",
		":svg:circle^:svg:geometry|",
		":svg:clipPath^:svg:graphics|",
		":svg:defs^:svg:graphics|",
		":svg:desc^:svg:|",
		":svg:discard^:svg:|",
		":svg:ellipse^:svg:geometry|",
		":svg:feBlend^:svg:|",
		":svg:feColorMatrix^:svg:|",
		":svg:feComponentTransfer^:svg:|",
		":svg:feComposite^:svg:|",
		":svg:feConvolveMatrix^:svg:|",
		":svg:feDiffuseLighting^:svg:|",
		":svg:feDisplacementMap^:svg:|",
		":svg:feDistantLight^:svg:|",
		":svg:feDropShadow^:svg:|",
		":svg:feFlood^:svg:|",
		":svg:feFuncA^:svg:componentTransferFunction|",
		":svg:feFuncB^:svg:componentTransferFunction|",
		":svg:feFuncG^:svg:componentTransferFunction|",
		":svg:feFuncR^:svg:componentTransferFunction|",
		":svg:feGaussianBlur^:svg:|",
		":svg:feImage^:svg:|",
		":svg:feMerge^:svg:|",
		":svg:feMergeNode^:svg:|",
		":svg:feMorphology^:svg:|",
		":svg:feOffset^:svg:|",
		":svg:fePointLight^:svg:|",
		":svg:feSpecularLighting^:svg:|",
		":svg:feSpotLight^:svg:|",
		":svg:feTile^:svg:|",
		":svg:feTurbulence^:svg:|",
		":svg:filter^:svg:|",
		":svg:foreignObject^:svg:graphics|",
		":svg:g^:svg:graphics|",
		":svg:image^:svg:graphics|decoding",
		":svg:line^:svg:geometry|",
		":svg:linearGradient^:svg:gradient|",
		":svg:mpath^:svg:|",
		":svg:marker^:svg:|",
		":svg:mask^:svg:|",
		":svg:metadata^:svg:|",
		":svg:path^:svg:geometry|",
		":svg:pattern^:svg:|",
		":svg:polygon^:svg:geometry|",
		":svg:polyline^:svg:geometry|",
		":svg:radialGradient^:svg:gradient|",
		":svg:rect^:svg:geometry|",
		":svg:svg^:svg:graphics|#currentScale,#zoomAndPan",
		":svg:script^:svg:|type",
		":svg:set^:svg:animation|",
		":svg:stop^:svg:|",
		":svg:style^:svg:|!disabled,media,title,type",
		":svg:switch^:svg:graphics|",
		":svg:symbol^:svg:|",
		":svg:tspan^:svg:textPositioning|",
		":svg:text^:svg:textPositioning|",
		":svg:textPath^:svg:textContent|",
		":svg:title^:svg:|",
		":svg:use^:svg:graphics|",
		":svg:view^:svg:|#zoomAndPan",
		"data^[HTMLElement]|value",
		"keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name",
		"menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default",
		"summary^[HTMLElement]|",
		"time^[HTMLElement]|dateTime",
		":svg:cursor^:svg:|",
		":math:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforeinput,*beforematch,*beforetoggle,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contentvisibilityautostatechange,*contextlost,*contextmenu,*contextrestored,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*scrollend,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex",
		":math:math^:math:|",
		":math:maction^:math:|",
		":math:menclose^:math:|",
		":math:merror^:math:|",
		":math:mfenced^:math:|",
		":math:mfrac^:math:|",
		":math:mi^:math:|",
		":math:mmultiscripts^:math:|",
		":math:mn^:math:|",
		":math:mo^:math:|",
		":math:mover^:math:|",
		":math:mpadded^:math:|",
		":math:mphantom^:math:|",
		":math:mroot^:math:|",
		":math:mrow^:math:|",
		":math:ms^:math:|",
		":math:mspace^:math:|",
		":math:msqrt^:math:|",
		":math:mstyle^:math:|",
		":math:msub^:math:|",
		":math:msubsup^:math:|",
		":math:msup^:math:|",
		":math:mtable^:math:|",
		":math:mtd^:math:|",
		":math:mtext^:math:|",
		":math:mtr^:math:|",
		":math:munder^:math:|",
		":math:munderover^:math:|",
		":math:semantics^:math:|"
	];
	mi = new Map(Object.entries({
		class: "className",
		for: "htmlFor",
		formaction: "formAction",
		innerHtml: "innerHTML",
		readonly: "readOnly",
		tabindex: "tabIndex",
		"aria-activedescendant": "ariaActiveDescendantElement",
		"aria-atomic": "ariaAtomic",
		"aria-autocomplete": "ariaAutoComplete",
		"aria-busy": "ariaBusy",
		"aria-checked": "ariaChecked",
		"aria-colcount": "ariaColCount",
		"aria-colindex": "ariaColIndex",
		"aria-colindextext": "ariaColIndexText",
		"aria-colspan": "ariaColSpan",
		"aria-controls": "ariaControlsElements",
		"aria-current": "ariaCurrent",
		"aria-describedby": "ariaDescribedByElements",
		"aria-description": "ariaDescription",
		"aria-details": "ariaDetailsElements",
		"aria-disabled": "ariaDisabled",
		"aria-errormessage": "ariaErrorMessageElements",
		"aria-expanded": "ariaExpanded",
		"aria-flowto": "ariaFlowToElements",
		"aria-haspopup": "ariaHasPopup",
		"aria-hidden": "ariaHidden",
		"aria-invalid": "ariaInvalid",
		"aria-keyshortcuts": "ariaKeyShortcuts",
		"aria-label": "ariaLabel",
		"aria-labelledby": "ariaLabelledByElements",
		"aria-level": "ariaLevel",
		"aria-live": "ariaLive",
		"aria-modal": "ariaModal",
		"aria-multiline": "ariaMultiLine",
		"aria-multiselectable": "ariaMultiSelectable",
		"aria-orientation": "ariaOrientation",
		"aria-owns": "ariaOwnsElements",
		"aria-placeholder": "ariaPlaceholder",
		"aria-posinset": "ariaPosInSet",
		"aria-pressed": "ariaPressed",
		"aria-readonly": "ariaReadOnly",
		"aria-required": "ariaRequired",
		"aria-roledescription": "ariaRoleDescription",
		"aria-rowcount": "ariaRowCount",
		"aria-rowindex": "ariaRowIndex",
		"aria-rowindextext": "ariaRowIndexText",
		"aria-rowspan": "ariaRowSpan",
		"aria-selected": "ariaSelected",
		"aria-setsize": "ariaSetSize",
		"aria-sort": "ariaSort",
		"aria-valuemax": "ariaValueMax",
		"aria-valuemin": "ariaValueMin",
		"aria-valuenow": "ariaValueNow",
		"aria-valuetext": "ariaValueText"
	}));
	Va = Array.from(mi).reduce((e, [t, r]) => (e.set(t, r), e), /* @__PURE__ */ new Map());
	fi = class extends hi {
		_schema = /* @__PURE__ */ new Map();
		_eventSchema = /* @__PURE__ */ new Map();
		constructor() {
			super(), Fa.forEach((e) => {
				let t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), [n, i] = e.split("|"), s = i.split(","), [a, o] = n.split("^");
				a.split(",").forEach((c) => {
					this._schema.set(c.toLowerCase(), t), this._eventSchema.set(c.toLowerCase(), r);
				});
				let l = o && this._schema.get(o.toLowerCase());
				if (l) {
					for (let [c, u] of l) t.set(c, u);
					for (let c of this._eventSchema.get(o.toLowerCase())) r.add(c);
				}
				s.forEach((c) => {
					if (c.length > 0) switch (c[0]) {
						case "*":
							r.add(c.substring(1));
							break;
						case "!":
							t.set(c.substring(1), Ma);
							break;
						case "#":
							t.set(c.substring(1), Ba);
							break;
						case "%":
							t.set(c.substring(1), Ha);
							break;
						default: t.set(c, qa);
					}
				});
			});
		}
		hasProperty(e, t, r) {
			if (r.some((i) => i.name === mr.name)) return !0;
			let n = Dt(e);
			if (n.includes("-")) {
				if (cr(n) || ur(n)) return !1;
				if (r.some((i) => i.name === hr.name)) return !0;
			}
			return (this._schema.get(n) || this._schema.get("unknown")).has(t);
		}
		hasElement(e, t) {
			if (t.some((n) => n.name === mr.name)) return !0;
			let r = Dt(e);
			return r.includes("-") && (cr(r) || ur(r) || t.some((n) => n.name === hr.name)) ? !0 : this._schema.has(r);
		}
		securityContext(e, t, r) {
			r && (t = this.getMappedPropName(t));
			let [n, i] = Z(e, !1);
			return ui(i, t, n);
		}
		getMappedPropName(e) {
			return mi.get(e) ?? e;
		}
		getDefaultComponentElementName() {
			return "ng-component";
		}
		validateProperty(e) {
			return e.toLowerCase().startsWith("on") ? {
				error: !0,
				msg: `Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...
If '${e}' is a directive input, make sure the directive is imported by the current module.`
			} : { error: !1 };
		}
		validateAttribute(e) {
			return e.toLowerCase().startsWith("on") ? {
				error: !0,
				msg: `Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...`
			} : { error: !1 };
		}
		allKnownElementNames() {
			return Array.from(this._schema.keys());
		}
		allKnownAttributesOfElement(e) {
			let t = Dt(e), r = this._schema.get(t) || this._schema.get("unknown");
			return Array.from(r.keys()).map((n) => Va.get(n) ?? n);
		}
		allKnownEventsOfElement(e) {
			let t = Dt(e);
			return Array.from(this._eventSchema.get(t) ?? []);
		}
		normalizeAnimationStyleProperty(e) {
			return pi(e);
		}
		normalizeAnimationStyleValue(e, t, r) {
			let n = "", i = r.toString().trim(), s = null;
			if (Ua(e) && r !== 0 && r !== "0") if (typeof r == "number") n = "px";
			else {
				let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
				a && a[1].length == 0 && (s = `Please provide a CSS unit value for ${t}:${r}`);
			}
			return {
				error: s,
				value: i + n
			};
		}
	};
	m = class {
		closedByChildren = {};
		contentType;
		closedByParent = !1;
		implicitNamespacePrefix;
		isVoid;
		ignoreFirstLf;
		canSelfClose;
		preventNamespaceInheritance;
		constructor({ closedByChildren: e, implicitNamespacePrefix: t, contentType: r = 2, closedByParent: n = !1, isVoid: i = !1, ignoreFirstLf: s = !1, preventNamespaceInheritance: a = !1, canSelfClose: o = !1 } = {}) {
			e && e.length > 0 && e.forEach((l) => this.closedByChildren[l] = !0), this.isVoid = i, this.closedByParent = n || i, this.implicitNamespacePrefix = t || null, this.contentType = r, this.ignoreFirstLf = s, this.preventNamespaceInheritance = a, this.canSelfClose = o ?? i;
		}
		isClosedByChild(e) {
			return this.isVoid || e.toLowerCase() in this.closedByChildren;
		}
		getContentType(e) {
			return typeof this.contentType == "object" ? (e === void 0 ? void 0 : this.contentType[e]) ?? this.contentType.default : this.contentType;
		}
	};
	De = class gi {
		file;
		offset;
		line;
		col;
		constructor(t, r, n, i) {
			this.file = t, this.offset = r, this.line = n, this.col = i;
		}
		toString() {
			return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
		}
		moveBy(t) {
			let r = this.file.content, n = r.length, i = this.offset, s = this.line, a = this.col;
			for (; i > 0 && t < 0;) if (i--, t++, r.charCodeAt(i) == 10) {
				s--;
				let o = r.substring(0, i - 1).lastIndexOf(`
`);
				a = o > 0 ? i - o : i;
			} else a--;
			for (; i < n && t > 0;) {
				let o = r.charCodeAt(i);
				i++, t--, o == 10 ? (s++, a = 0) : a++;
			}
			return new gi(this.file, i, s, a);
		}
		getContext(t, r) {
			let n = this.file.content, i = this.offset;
			if (i != null) {
				i > n.length - 1 && (i = n.length - 1);
				let s = i, a = 0, o = 0;
				for (; a < t && i > 0 && (i--, a++, !(n[i] == `
` && ++o == r)););
				for (a = 0, o = 0; a < t && s < n.length - 1 && (s++, a++, !(n[s] == `
` && ++o == r)););
				return {
					before: n.substring(i, this.offset),
					after: n.substring(this.offset, s + 1)
				};
			}
			return null;
		}
	};
	rt = class {
		content;
		url;
		constructor(e, t) {
			this.content = e, this.url = t;
		}
	};
	p = class {
		start;
		end;
		fullStart;
		details;
		constructor(e, t, r = e, n = null) {
			this.start = e, this.end = t, this.fullStart = r, this.details = n;
		}
		toString() {
			return this.start.file.content.substring(this.start.offset, this.end.offset);
		}
	};
	Wa = (function(e) {
		return e[e.WARNING = 0] = "WARNING", e[e.ERROR = 1] = "ERROR", e;
	})({});
	te = class extends Error {
		span;
		msg;
		level;
		relatedError;
		constructor(e, t, r = 1, n) {
			super(t), this.span = e, this.msg = t, this.level = r, this.relatedError = n, Object.setPrototypeOf(this, new.target.prototype);
		}
		contextualMessage() {
			let e = this.span.start.getContext(100, 3);
			return e ? `${this.msg} ("${e.before}[${Wa[this.level]} ->]${e.after}")` : this.msg;
		}
		toString() {
			let e = this.span.details ? `, ${this.span.details}` : "";
			return `${this.contextualMessage()}: ${this.span.start}${e}`;
		}
	};
	de = class {
		sourceSpan;
		i18n;
		constructor(e, t) {
			this.sourceSpan = e, this.i18n = t;
		}
	};
	_i = class extends de {
		value;
		tokens;
		constructor(e, t, r, n) {
			super(t, n), this.value = e, this.tokens = r;
		}
		visit(e, t) {
			return e.visitText(this, t);
		}
		kind = "text";
	};
	Si = class extends de {
		value;
		tokens;
		constructor(e, t, r, n) {
			super(t, n), this.value = e, this.tokens = r;
		}
		visit(e, t) {
			return e.visitCdata(this, t);
		}
		kind = "cdata";
	};
	vi = class extends de {
		switchValue;
		type;
		cases;
		switchValueSourceSpan;
		constructor(e, t, r, n, i, s) {
			super(n, s), this.switchValue = e, this.type = t, this.cases = r, this.switchValueSourceSpan = i;
		}
		visit(e, t) {
			return e.visitExpansion(this, t);
		}
		kind = "expansion";
	};
	Ci = class {
		value;
		expression;
		sourceSpan;
		valueSourceSpan;
		expSourceSpan;
		constructor(e, t, r, n, i) {
			this.value = e, this.expression = t, this.sourceSpan = r, this.valueSourceSpan = n, this.expSourceSpan = i;
		}
		visit(e, t) {
			return e.visitExpansionCase(this, t);
		}
		kind = "expansionCase";
	};
	ki = class extends de {
		name;
		value;
		keySpan;
		valueSpan;
		valueTokens;
		constructor(e, t, r, n, i, s, a) {
			super(r, a), this.name = e, this.value = t, this.keySpan = n, this.valueSpan = i, this.valueTokens = s;
		}
		visit(e, t) {
			return e.visitAttribute(this, t);
		}
		kind = "attribute";
		get nameSpan() {
			return this.keySpan;
		}
	};
	bi = class {
		value;
		type;
		sourceSpan;
		constructor(e, t, r) {
			this.value = e, this.type = t, this.sourceSpan = r;
		}
		visit(e, t) {
			return e.visitStartTagComment ? e.visitStartTagComment(this, t) : void 0;
		}
		kind = "startTagComment";
	};
	re = class extends de {
		name;
		attrs;
		directives;
		children;
		isSelfClosing;
		startSourceSpan;
		endSourceSpan;
		nameSpan;
		isVoid;
		comments;
		constructor(e, t, r, n, i, s, a, o = null, l = null, c, u, d = []) {
			super(s, u), this.name = e, this.attrs = t, this.directives = r, this.children = n, this.isSelfClosing = i, this.startSourceSpan = a, this.endSourceSpan = o, this.nameSpan = l, this.isVoid = c, this.comments = d;
		}
		visit(e, t) {
			return e.visitElement(this, t);
		}
		kind = "element";
	};
	wi = class {
		value;
		sourceSpan;
		constructor(e, t) {
			this.value = e, this.sourceSpan = t;
		}
		visit(e, t) {
			return e.visitComment(this, t);
		}
		kind = "comment";
	};
	Ti = class {
		value;
		sourceSpan;
		constructor(e, t) {
			this.value = e, this.sourceSpan = t;
		}
		visit(e, t) {
			return e.visitDocType(this, t);
		}
		kind = "docType";
	};
	ge = class extends de {
		name;
		parameters;
		children;
		nameSpan;
		startSourceSpan;
		endSourceSpan;
		constructor(e, t, r, n, i, s, a = null, o) {
			super(n, o), this.name = e, this.parameters = t, this.children = r, this.nameSpan = i, this.startSourceSpan = s, this.endSourceSpan = a;
		}
		visit(e, t) {
			return e.visitBlock(this, t);
		}
		kind = "block";
	};
	U = class extends de {
		componentName;
		tagName;
		fullName;
		attrs;
		directives;
		children;
		isSelfClosing;
		startSourceSpan;
		endSourceSpan;
		comments;
		constructor(e, t, r, n, i, s, a, o, l, c = null, u, d = []) {
			super(o, u), this.componentName = e, this.tagName = t, this.fullName = r, this.attrs = n, this.directives = i, this.children = s, this.isSelfClosing = a, this.startSourceSpan = l, this.endSourceSpan = c, this.comments = d;
		}
		visit(e, t) {
			return e.visitComponent(this, t);
		}
		kind = "component";
	};
	yi = class {
		name;
		attrs;
		sourceSpan;
		startSourceSpan;
		endSourceSpan;
		constructor(e, t, r, n, i = null) {
			this.name = e, this.attrs = t, this.sourceSpan = r, this.startSourceSpan = n, this.endSourceSpan = i;
		}
		visit(e, t) {
			return e.visitDirective(this, t);
		}
		kind = "directive";
	};
	fr = class {
		expression;
		sourceSpan;
		constructor(e, t) {
			this.expression = e, this.sourceSpan = t;
		}
		visit(e, t) {
			return e.visitBlockParameter(this, t);
		}
		kind = "blockParameter";
		startSourceSpan = null;
		endSourceSpan = null;
	};
	dr = class {
		name;
		value;
		sourceSpan;
		nameSpan;
		valueSpan;
		constructor(e, t, r, n, i) {
			this.name = e, this.value = t, this.sourceSpan = r, this.nameSpan = n, this.valueSpan = i;
		}
		visit(e, t) {
			return e.visitLetDeclaration(this, t);
		}
		kind = "letDeclaration";
		startSourceSpan = null;
		endSourceSpan = null;
	};
	gr = class {
		constructor() {}
		visitElement(e, t) {
			this.visitChildren(t, (r) => {
				r(e.attrs), r(e.directives), r(e.comments), r(e.children);
			});
		}
		visitAttribute(e, t) {}
		visitStartTagComment(e, t) {}
		visitText(e, t) {}
		visitCdata(e, t) {}
		visitComment(e, t) {}
		visitDocType(e, t) {}
		visitExpansion(e, t) {
			return this.visitChildren(t, (r) => {
				r(e.cases);
			});
		}
		visitExpansionCase(e, t) {}
		visitBlock(e, t) {
			this.visitChildren(t, (r) => {
				r(e.parameters), r(e.children);
			});
		}
		visitBlockParameter(e, t) {}
		visitLetDeclaration(e, t) {}
		visitComponent(e, t) {
			this.visitChildren(t, (r) => {
				r(e.attrs), r(e.comments), r(e.children);
			});
		}
		visitDirective(e, t) {
			this.visitChildren(t, (r) => {
				r(e.attrs);
			});
		}
		visitChildren(e, t) {
			let r = [], n = this;
			function i(s) {
				s && r.push(It(n, s, e));
			}
			return t(i), Array.prototype.concat.apply([], r);
		}
	};
	_e = {
		AElig: "Æ",
		AMP: "&",
		amp: "&",
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
		af: "⁡",
		Aring: "Å",
		angst: "Å",
		Ascr: "𝒜",
		Assign: "≔",
		colone: "≔",
		coloneq: "≔",
		Atilde: "Ã",
		Auml: "Ä",
		Backslash: "∖",
		setminus: "∖",
		setmn: "∖",
		smallsetminus: "∖",
		ssetmn: "∖",
		Barv: "⫧",
		Barwed: "⌆",
		doublebarwedge: "⌆",
		Bcy: "Б",
		Because: "∵",
		becaus: "∵",
		because: "∵",
		Bernoullis: "ℬ",
		Bscr: "ℬ",
		bernou: "ℬ",
		Beta: "Β",
		Bfr: "𝔅",
		Bopf: "𝔹",
		Breve: "˘",
		breve: "˘",
		Bumpeq: "≎",
		HumpDownHump: "≎",
		bump: "≎",
		CHcy: "Ч",
		COPY: "©",
		copy: "©",
		Cacute: "Ć",
		Cap: "⋒",
		CapitalDifferentialD: "ⅅ",
		DD: "ⅅ",
		Cayleys: "ℭ",
		Cfr: "ℭ",
		Ccaron: "Č",
		Ccedil: "Ç",
		Ccirc: "Ĉ",
		Cconint: "∰",
		Cdot: "Ċ",
		Cedilla: "¸",
		cedil: "¸",
		CenterDot: "·",
		centerdot: "·",
		middot: "·",
		Chi: "Χ",
		CircleDot: "⊙",
		odot: "⊙",
		CircleMinus: "⊖",
		ominus: "⊖",
		CirclePlus: "⊕",
		oplus: "⊕",
		CircleTimes: "⊗",
		otimes: "⊗",
		ClockwiseContourIntegral: "∲",
		cwconint: "∲",
		CloseCurlyDoubleQuote: "”",
		rdquo: "”",
		rdquor: "”",
		CloseCurlyQuote: "’",
		rsquo: "’",
		rsquor: "’",
		Colon: "∷",
		Proportion: "∷",
		Colone: "⩴",
		Congruent: "≡",
		equiv: "≡",
		Conint: "∯",
		DoubleContourIntegral: "∯",
		ContourIntegral: "∮",
		conint: "∮",
		oint: "∮",
		Copf: "ℂ",
		complexes: "ℂ",
		Coproduct: "∐",
		coprod: "∐",
		CounterClockwiseContourIntegral: "∳",
		awconint: "∳",
		Cross: "⨯",
		Cscr: "𝒞",
		Cup: "⋓",
		CupCap: "≍",
		asympeq: "≍",
		DDotrahd: "⤑",
		DJcy: "Ђ",
		DScy: "Ѕ",
		DZcy: "Џ",
		Dagger: "‡",
		ddagger: "‡",
		Darr: "↡",
		Dashv: "⫤",
		DoubleLeftTee: "⫤",
		Dcaron: "Ď",
		Dcy: "Д",
		Del: "∇",
		nabla: "∇",
		Delta: "Δ",
		Dfr: "𝔇",
		DiacriticalAcute: "´",
		acute: "´",
		DiacriticalDot: "˙",
		dot: "˙",
		DiacriticalDoubleAcute: "˝",
		dblac: "˝",
		DiacriticalGrave: "`",
		grave: "`",
		DiacriticalTilde: "˜",
		tilde: "˜",
		Diamond: "⋄",
		diam: "⋄",
		diamond: "⋄",
		DifferentialD: "ⅆ",
		dd: "ⅆ",
		Dopf: "𝔻",
		Dot: "¨",
		DoubleDot: "¨",
		die: "¨",
		uml: "¨",
		DotDot: "⃜",
		DotEqual: "≐",
		doteq: "≐",
		esdot: "≐",
		DoubleDownArrow: "⇓",
		Downarrow: "⇓",
		dArr: "⇓",
		DoubleLeftArrow: "⇐",
		Leftarrow: "⇐",
		lArr: "⇐",
		DoubleLeftRightArrow: "⇔",
		Leftrightarrow: "⇔",
		hArr: "⇔",
		iff: "⇔",
		DoubleLongLeftArrow: "⟸",
		Longleftarrow: "⟸",
		xlArr: "⟸",
		DoubleLongLeftRightArrow: "⟺",
		Longleftrightarrow: "⟺",
		xhArr: "⟺",
		DoubleLongRightArrow: "⟹",
		Longrightarrow: "⟹",
		xrArr: "⟹",
		DoubleRightArrow: "⇒",
		Implies: "⇒",
		Rightarrow: "⇒",
		rArr: "⇒",
		DoubleRightTee: "⊨",
		vDash: "⊨",
		DoubleUpArrow: "⇑",
		Uparrow: "⇑",
		uArr: "⇑",
		DoubleUpDownArrow: "⇕",
		Updownarrow: "⇕",
		vArr: "⇕",
		DoubleVerticalBar: "∥",
		par: "∥",
		parallel: "∥",
		shortparallel: "∥",
		spar: "∥",
		DownArrow: "↓",
		ShortDownArrow: "↓",
		darr: "↓",
		downarrow: "↓",
		DownArrowBar: "⤓",
		DownArrowUpArrow: "⇵",
		duarr: "⇵",
		DownBreve: "̑",
		DownLeftRightVector: "⥐",
		DownLeftTeeVector: "⥞",
		DownLeftVector: "↽",
		leftharpoondown: "↽",
		lhard: "↽",
		DownLeftVectorBar: "⥖",
		DownRightTeeVector: "⥟",
		DownRightVector: "⇁",
		rhard: "⇁",
		rightharpoondown: "⇁",
		DownRightVectorBar: "⥗",
		DownTee: "⊤",
		top: "⊤",
		DownTeeArrow: "↧",
		mapstodown: "↧",
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
		in: "∈",
		isin: "∈",
		isinv: "∈",
		Emacr: "Ē",
		EmptySmallSquare: "◻",
		EmptyVerySmallSquare: "▫",
		Eogon: "Ę",
		Eopf: "𝔼",
		Epsilon: "Ε",
		Equal: "⩵",
		EqualTilde: "≂",
		eqsim: "≂",
		esim: "≂",
		Equilibrium: "⇌",
		rightleftharpoons: "⇌",
		rlhar: "⇌",
		Escr: "ℰ",
		expectation: "ℰ",
		Esim: "⩳",
		Eta: "Η",
		Euml: "Ë",
		Exists: "∃",
		exist: "∃",
		ExponentialE: "ⅇ",
		ee: "ⅇ",
		exponentiale: "ⅇ",
		Fcy: "Ф",
		Ffr: "𝔉",
		FilledSmallSquare: "◼",
		FilledVerySmallSquare: "▪",
		blacksquare: "▪",
		squarf: "▪",
		squf: "▪",
		Fopf: "𝔽",
		ForAll: "∀",
		forall: "∀",
		Fouriertrf: "ℱ",
		Fscr: "ℱ",
		GJcy: "Ѓ",
		GT: ">",
		gt: ">",
		Gamma: "Γ",
		Gammad: "Ϝ",
		Gbreve: "Ğ",
		Gcedil: "Ģ",
		Gcirc: "Ĝ",
		Gcy: "Г",
		Gdot: "Ġ",
		Gfr: "𝔊",
		Gg: "⋙",
		ggg: "⋙",
		Gopf: "𝔾",
		GreaterEqual: "≥",
		ge: "≥",
		geq: "≥",
		GreaterEqualLess: "⋛",
		gel: "⋛",
		gtreqless: "⋛",
		GreaterFullEqual: "≧",
		gE: "≧",
		geqq: "≧",
		GreaterGreater: "⪢",
		GreaterLess: "≷",
		gl: "≷",
		gtrless: "≷",
		GreaterSlantEqual: "⩾",
		geqslant: "⩾",
		ges: "⩾",
		GreaterTilde: "≳",
		gsim: "≳",
		gtrsim: "≳",
		Gscr: "𝒢",
		Gt: "≫",
		NestedGreaterGreater: "≫",
		gg: "≫",
		HARDcy: "Ъ",
		Hacek: "ˇ",
		caron: "ˇ",
		Hat: "^",
		Hcirc: "Ĥ",
		Hfr: "ℌ",
		Poincareplane: "ℌ",
		HilbertSpace: "ℋ",
		Hscr: "ℋ",
		hamilt: "ℋ",
		Hopf: "ℍ",
		quaternions: "ℍ",
		HorizontalLine: "─",
		boxh: "─",
		Hstrok: "Ħ",
		HumpEqual: "≏",
		bumpe: "≏",
		bumpeq: "≏",
		IEcy: "Е",
		IJlig: "Ĳ",
		IOcy: "Ё",
		Iacute: "Í",
		Icirc: "Î",
		Icy: "И",
		Idot: "İ",
		Ifr: "ℑ",
		Im: "ℑ",
		image: "ℑ",
		imagpart: "ℑ",
		Igrave: "Ì",
		Imacr: "Ī",
		ImaginaryI: "ⅈ",
		ii: "ⅈ",
		Int: "∬",
		Integral: "∫",
		int: "∫",
		Intersection: "⋂",
		bigcap: "⋂",
		xcap: "⋂",
		InvisibleComma: "⁣",
		ic: "⁣",
		InvisibleTimes: "⁢",
		it: "⁢",
		Iogon: "Į",
		Iopf: "𝕀",
		Iota: "Ι",
		Iscr: "ℐ",
		imagline: "ℐ",
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
		lt: "<",
		Lacute: "Ĺ",
		Lambda: "Λ",
		Lang: "⟪",
		Laplacetrf: "ℒ",
		Lscr: "ℒ",
		lagran: "ℒ",
		Larr: "↞",
		twoheadleftarrow: "↞",
		Lcaron: "Ľ",
		Lcedil: "Ļ",
		Lcy: "Л",
		LeftAngleBracket: "⟨",
		lang: "⟨",
		langle: "⟨",
		LeftArrow: "←",
		ShortLeftArrow: "←",
		larr: "←",
		leftarrow: "←",
		slarr: "←",
		LeftArrowBar: "⇤",
		larrb: "⇤",
		LeftArrowRightArrow: "⇆",
		leftrightarrows: "⇆",
		lrarr: "⇆",
		LeftCeiling: "⌈",
		lceil: "⌈",
		LeftDoubleBracket: "⟦",
		lobrk: "⟦",
		LeftDownTeeVector: "⥡",
		LeftDownVector: "⇃",
		dharl: "⇃",
		downharpoonleft: "⇃",
		LeftDownVectorBar: "⥙",
		LeftFloor: "⌊",
		lfloor: "⌊",
		LeftRightArrow: "↔",
		harr: "↔",
		leftrightarrow: "↔",
		LeftRightVector: "⥎",
		LeftTee: "⊣",
		dashv: "⊣",
		LeftTeeArrow: "↤",
		mapstoleft: "↤",
		LeftTeeVector: "⥚",
		LeftTriangle: "⊲",
		vartriangleleft: "⊲",
		vltri: "⊲",
		LeftTriangleBar: "⧏",
		LeftTriangleEqual: "⊴",
		ltrie: "⊴",
		trianglelefteq: "⊴",
		LeftUpDownVector: "⥑",
		LeftUpTeeVector: "⥠",
		LeftUpVector: "↿",
		uharl: "↿",
		upharpoonleft: "↿",
		LeftUpVectorBar: "⥘",
		LeftVector: "↼",
		leftharpoonup: "↼",
		lharu: "↼",
		LeftVectorBar: "⥒",
		LessEqualGreater: "⋚",
		leg: "⋚",
		lesseqgtr: "⋚",
		LessFullEqual: "≦",
		lE: "≦",
		leqq: "≦",
		LessGreater: "≶",
		lessgtr: "≶",
		lg: "≶",
		LessLess: "⪡",
		LessSlantEqual: "⩽",
		leqslant: "⩽",
		les: "⩽",
		LessTilde: "≲",
		lesssim: "≲",
		lsim: "≲",
		Lfr: "𝔏",
		Ll: "⋘",
		Lleftarrow: "⇚",
		lAarr: "⇚",
		Lmidot: "Ŀ",
		LongLeftArrow: "⟵",
		longleftarrow: "⟵",
		xlarr: "⟵",
		LongLeftRightArrow: "⟷",
		longleftrightarrow: "⟷",
		xharr: "⟷",
		LongRightArrow: "⟶",
		longrightarrow: "⟶",
		xrarr: "⟶",
		Lopf: "𝕃",
		LowerLeftArrow: "↙",
		swarr: "↙",
		swarrow: "↙",
		LowerRightArrow: "↘",
		searr: "↘",
		searrow: "↘",
		Lsh: "↰",
		lsh: "↰",
		Lstrok: "Ł",
		Lt: "≪",
		NestedLessLess: "≪",
		ll: "≪",
		Map: "⤅",
		Mcy: "М",
		MediumSpace: " ",
		Mellintrf: "ℳ",
		Mscr: "ℳ",
		phmmat: "ℳ",
		Mfr: "𝔐",
		MinusPlus: "∓",
		mnplus: "∓",
		mp: "∓",
		Mopf: "𝕄",
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
		ZeroWidthSpace: "​",
		NewLine: `
`,
		Nfr: "𝔑",
		NoBreak: "⁠",
		NonBreakingSpace: "\xA0",
		nbsp: "\xA0",
		Nopf: "ℕ",
		naturals: "ℕ",
		Not: "⫬",
		NotCongruent: "≢",
		nequiv: "≢",
		NotCupCap: "≭",
		NotDoubleVerticalBar: "∦",
		npar: "∦",
		nparallel: "∦",
		nshortparallel: "∦",
		nspar: "∦",
		NotElement: "∉",
		notin: "∉",
		notinva: "∉",
		NotEqual: "≠",
		ne: "≠",
		NotEqualTilde: "≂̸",
		nesim: "≂̸",
		NotExists: "∄",
		nexist: "∄",
		nexists: "∄",
		NotGreater: "≯",
		ngt: "≯",
		ngtr: "≯",
		NotGreaterEqual: "≱",
		nge: "≱",
		ngeq: "≱",
		NotGreaterFullEqual: "≧̸",
		ngE: "≧̸",
		ngeqq: "≧̸",
		NotGreaterGreater: "≫̸",
		nGtv: "≫̸",
		NotGreaterLess: "≹",
		ntgl: "≹",
		NotGreaterSlantEqual: "⩾̸",
		ngeqslant: "⩾̸",
		nges: "⩾̸",
		NotGreaterTilde: "≵",
		ngsim: "≵",
		NotHumpDownHump: "≎̸",
		nbump: "≎̸",
		NotHumpEqual: "≏̸",
		nbumpe: "≏̸",
		NotLeftTriangle: "⋪",
		nltri: "⋪",
		ntriangleleft: "⋪",
		NotLeftTriangleBar: "⧏̸",
		NotLeftTriangleEqual: "⋬",
		nltrie: "⋬",
		ntrianglelefteq: "⋬",
		NotLess: "≮",
		nless: "≮",
		nlt: "≮",
		NotLessEqual: "≰",
		nle: "≰",
		nleq: "≰",
		NotLessGreater: "≸",
		ntlg: "≸",
		NotLessLess: "≪̸",
		nLtv: "≪̸",
		NotLessSlantEqual: "⩽̸",
		nleqslant: "⩽̸",
		nles: "⩽̸",
		NotLessTilde: "≴",
		nlsim: "≴",
		NotNestedGreaterGreater: "⪢̸",
		NotNestedLessLess: "⪡̸",
		NotPrecedes: "⊀",
		npr: "⊀",
		nprec: "⊀",
		NotPrecedesEqual: "⪯̸",
		npre: "⪯̸",
		npreceq: "⪯̸",
		NotPrecedesSlantEqual: "⋠",
		nprcue: "⋠",
		NotReverseElement: "∌",
		notni: "∌",
		notniva: "∌",
		NotRightTriangle: "⋫",
		nrtri: "⋫",
		ntriangleright: "⋫",
		NotRightTriangleBar: "⧐̸",
		NotRightTriangleEqual: "⋭",
		nrtrie: "⋭",
		ntrianglerighteq: "⋭",
		NotSquareSubset: "⊏̸",
		NotSquareSubsetEqual: "⋢",
		nsqsube: "⋢",
		NotSquareSuperset: "⊐̸",
		NotSquareSupersetEqual: "⋣",
		nsqsupe: "⋣",
		NotSubset: "⊂⃒",
		nsubset: "⊂⃒",
		vnsub: "⊂⃒",
		NotSubsetEqual: "⊈",
		nsube: "⊈",
		nsubseteq: "⊈",
		NotSucceeds: "⊁",
		nsc: "⊁",
		nsucc: "⊁",
		NotSucceedsEqual: "⪰̸",
		nsce: "⪰̸",
		nsucceq: "⪰̸",
		NotSucceedsSlantEqual: "⋡",
		nsccue: "⋡",
		NotSucceedsTilde: "≿̸",
		NotSuperset: "⊃⃒",
		nsupset: "⊃⃒",
		vnsup: "⊃⃒",
		NotSupersetEqual: "⊉",
		nsupe: "⊉",
		nsupseteq: "⊉",
		NotTilde: "≁",
		nsim: "≁",
		NotTildeEqual: "≄",
		nsime: "≄",
		nsimeq: "≄",
		NotTildeFullEqual: "≇",
		ncong: "≇",
		NotTildeTilde: "≉",
		nap: "≉",
		napprox: "≉",
		NotVerticalBar: "∤",
		nmid: "∤",
		nshortmid: "∤",
		nsmid: "∤",
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
		ohm: "Ω",
		Omicron: "Ο",
		Oopf: "𝕆",
		OpenCurlyDoubleQuote: "“",
		ldquo: "“",
		OpenCurlyQuote: "‘",
		lsquo: "‘",
		Or: "⩔",
		Oscr: "𝒪",
		Oslash: "Ø",
		Otilde: "Õ",
		Otimes: "⨷",
		Ouml: "Ö",
		OverBar: "‾",
		oline: "‾",
		OverBrace: "⏞",
		OverBracket: "⎴",
		tbrk: "⎴",
		OverParenthesis: "⏜",
		PartialD: "∂",
		part: "∂",
		Pcy: "П",
		Pfr: "𝔓",
		Phi: "Φ",
		Pi: "Π",
		PlusMinus: "±",
		plusmn: "±",
		pm: "±",
		Popf: "ℙ",
		primes: "ℙ",
		Pr: "⪻",
		Precedes: "≺",
		pr: "≺",
		prec: "≺",
		PrecedesEqual: "⪯",
		pre: "⪯",
		preceq: "⪯",
		PrecedesSlantEqual: "≼",
		prcue: "≼",
		preccurlyeq: "≼",
		PrecedesTilde: "≾",
		precsim: "≾",
		prsim: "≾",
		Prime: "″",
		Product: "∏",
		prod: "∏",
		Proportional: "∝",
		prop: "∝",
		propto: "∝",
		varpropto: "∝",
		vprop: "∝",
		Pscr: "𝒫",
		Psi: "Ψ",
		QUOT: "\"",
		quot: "\"",
		Qfr: "𝔔",
		Qopf: "ℚ",
		rationals: "ℚ",
		Qscr: "𝒬",
		RBarr: "⤐",
		drbkarow: "⤐",
		REG: "®",
		circledR: "®",
		reg: "®",
		Racute: "Ŕ",
		Rang: "⟫",
		Rarr: "↠",
		twoheadrightarrow: "↠",
		Rarrtl: "⤖",
		Rcaron: "Ř",
		Rcedil: "Ŗ",
		Rcy: "Р",
		Re: "ℜ",
		Rfr: "ℜ",
		real: "ℜ",
		realpart: "ℜ",
		ReverseElement: "∋",
		SuchThat: "∋",
		ni: "∋",
		niv: "∋",
		ReverseEquilibrium: "⇋",
		leftrightharpoons: "⇋",
		lrhar: "⇋",
		ReverseUpEquilibrium: "⥯",
		duhar: "⥯",
		Rho: "Ρ",
		RightAngleBracket: "⟩",
		rang: "⟩",
		rangle: "⟩",
		RightArrow: "→",
		ShortRightArrow: "→",
		rarr: "→",
		rightarrow: "→",
		srarr: "→",
		RightArrowBar: "⇥",
		rarrb: "⇥",
		RightArrowLeftArrow: "⇄",
		rightleftarrows: "⇄",
		rlarr: "⇄",
		RightCeiling: "⌉",
		rceil: "⌉",
		RightDoubleBracket: "⟧",
		robrk: "⟧",
		RightDownTeeVector: "⥝",
		RightDownVector: "⇂",
		dharr: "⇂",
		downharpoonright: "⇂",
		RightDownVectorBar: "⥕",
		RightFloor: "⌋",
		rfloor: "⌋",
		RightTee: "⊢",
		vdash: "⊢",
		RightTeeArrow: "↦",
		map: "↦",
		mapsto: "↦",
		RightTeeVector: "⥛",
		RightTriangle: "⊳",
		vartriangleright: "⊳",
		vrtri: "⊳",
		RightTriangleBar: "⧐",
		RightTriangleEqual: "⊵",
		rtrie: "⊵",
		trianglerighteq: "⊵",
		RightUpDownVector: "⥏",
		RightUpTeeVector: "⥜",
		RightUpVector: "↾",
		uharr: "↾",
		upharpoonright: "↾",
		RightUpVectorBar: "⥔",
		RightVector: "⇀",
		rharu: "⇀",
		rightharpoonup: "⇀",
		RightVectorBar: "⥓",
		Ropf: "ℝ",
		reals: "ℝ",
		RoundImplies: "⥰",
		Rrightarrow: "⇛",
		rAarr: "⇛",
		Rscr: "ℛ",
		realine: "ℛ",
		Rsh: "↱",
		rsh: "↱",
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
		ShortUpArrow: "↑",
		UpArrow: "↑",
		uarr: "↑",
		uparrow: "↑",
		Sigma: "Σ",
		SmallCircle: "∘",
		compfn: "∘",
		Sopf: "𝕊",
		Sqrt: "√",
		radic: "√",
		Square: "□",
		squ: "□",
		square: "□",
		SquareIntersection: "⊓",
		sqcap: "⊓",
		SquareSubset: "⊏",
		sqsub: "⊏",
		sqsubset: "⊏",
		SquareSubsetEqual: "⊑",
		sqsube: "⊑",
		sqsubseteq: "⊑",
		SquareSuperset: "⊐",
		sqsup: "⊐",
		sqsupset: "⊐",
		SquareSupersetEqual: "⊒",
		sqsupe: "⊒",
		sqsupseteq: "⊒",
		SquareUnion: "⊔",
		sqcup: "⊔",
		Sscr: "𝒮",
		Star: "⋆",
		sstarf: "⋆",
		Sub: "⋐",
		Subset: "⋐",
		SubsetEqual: "⊆",
		sube: "⊆",
		subseteq: "⊆",
		Succeeds: "≻",
		sc: "≻",
		succ: "≻",
		SucceedsEqual: "⪰",
		sce: "⪰",
		succeq: "⪰",
		SucceedsSlantEqual: "≽",
		sccue: "≽",
		succcurlyeq: "≽",
		SucceedsTilde: "≿",
		scsim: "≿",
		succsim: "≿",
		Sum: "∑",
		sum: "∑",
		Sup: "⋑",
		Supset: "⋑",
		Superset: "⊃",
		sup: "⊃",
		supset: "⊃",
		SupersetEqual: "⊇",
		supe: "⊇",
		supseteq: "⊇",
		THORN: "Þ",
		TRADE: "™",
		trade: "™",
		TSHcy: "Ћ",
		TScy: "Ц",
		Tab: "	",
		Tau: "Τ",
		Tcaron: "Ť",
		Tcedil: "Ţ",
		Tcy: "Т",
		Tfr: "𝔗",
		Therefore: "∴",
		there4: "∴",
		therefore: "∴",
		Theta: "Θ",
		ThickSpace: "  ",
		ThinSpace: " ",
		thinsp: " ",
		Tilde: "∼",
		sim: "∼",
		thicksim: "∼",
		thksim: "∼",
		TildeEqual: "≃",
		sime: "≃",
		simeq: "≃",
		TildeFullEqual: "≅",
		cong: "≅",
		TildeTilde: "≈",
		ap: "≈",
		approx: "≈",
		asymp: "≈",
		thickapprox: "≈",
		thkap: "≈",
		Topf: "𝕋",
		TripleDot: "⃛",
		tdot: "⃛",
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
		lowbar: "_",
		UnderBrace: "⏟",
		UnderBracket: "⎵",
		bbrk: "⎵",
		UnderParenthesis: "⏝",
		Union: "⋃",
		bigcup: "⋃",
		xcup: "⋃",
		UnionPlus: "⊎",
		uplus: "⊎",
		Uogon: "Ų",
		Uopf: "𝕌",
		UpArrowBar: "⤒",
		UpArrowDownArrow: "⇅",
		udarr: "⇅",
		UpDownArrow: "↕",
		updownarrow: "↕",
		varr: "↕",
		UpEquilibrium: "⥮",
		udhar: "⥮",
		UpTee: "⊥",
		bot: "⊥",
		bottom: "⊥",
		perp: "⊥",
		UpTeeArrow: "↥",
		mapstoup: "↥",
		UpperLeftArrow: "↖",
		nwarr: "↖",
		nwarrow: "↖",
		UpperRightArrow: "↗",
		nearr: "↗",
		nearrow: "↗",
		Upsi: "ϒ",
		upsih: "ϒ",
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
		bigvee: "⋁",
		xvee: "⋁",
		Verbar: "‖",
		Vert: "‖",
		VerticalBar: "∣",
		mid: "∣",
		shortmid: "∣",
		smid: "∣",
		VerticalLine: "|",
		verbar: "|",
		vert: "|",
		VerticalSeparator: "❘",
		VerticalTilde: "≀",
		wr: "≀",
		wreath: "≀",
		VeryThinSpace: " ",
		hairsp: " ",
		Vfr: "𝔙",
		Vopf: "𝕍",
		Vscr: "𝒱",
		Vvdash: "⊪",
		Wcirc: "Ŵ",
		Wedge: "⋀",
		bigwedge: "⋀",
		xwedge: "⋀",
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
		Zeta: "Ζ",
		Zfr: "ℨ",
		zeetrf: "ℨ",
		Zopf: "ℤ",
		integers: "ℤ",
		Zscr: "𝒵",
		aacute: "á",
		abreve: "ă",
		ac: "∾",
		mstpos: "∾",
		acE: "∾̳",
		acd: "∿",
		acirc: "â",
		acy: "а",
		aelig: "æ",
		afr: "𝔞",
		agrave: "à",
		alefsym: "ℵ",
		aleph: "ℵ",
		alpha: "α",
		amacr: "ā",
		amalg: "⨿",
		and: "∧",
		wedge: "∧",
		andand: "⩕",
		andd: "⩜",
		andslope: "⩘",
		andv: "⩚",
		ang: "∠",
		angle: "∠",
		ange: "⦤",
		angmsd: "∡",
		measuredangle: "∡",
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
		angzarr: "⍼",
		aogon: "ą",
		aopf: "𝕒",
		apE: "⩰",
		apacir: "⩯",
		ape: "≊",
		approxeq: "≊",
		apid: "≋",
		apos: "'",
		aring: "å",
		ascr: "𝒶",
		ast: "*",
		midast: "*",
		atilde: "ã",
		auml: "ä",
		awint: "⨑",
		bNot: "⫭",
		backcong: "≌",
		bcong: "≌",
		backepsilon: "϶",
		bepsi: "϶",
		backprime: "‵",
		bprime: "‵",
		backsim: "∽",
		bsim: "∽",
		backsimeq: "⋍",
		bsime: "⋍",
		barvee: "⊽",
		barwed: "⌅",
		barwedge: "⌅",
		bbrktbrk: "⎶",
		bcy: "б",
		bdquo: "„",
		ldquor: "„",
		bemptyv: "⦰",
		beta: "β",
		beth: "ℶ",
		between: "≬",
		twixt: "≬",
		bfr: "𝔟",
		bigcirc: "◯",
		xcirc: "◯",
		bigodot: "⨀",
		xodot: "⨀",
		bigoplus: "⨁",
		xoplus: "⨁",
		bigotimes: "⨂",
		xotime: "⨂",
		bigsqcup: "⨆",
		xsqcup: "⨆",
		bigstar: "★",
		starf: "★",
		bigtriangledown: "▽",
		xdtri: "▽",
		bigtriangleup: "△",
		xutri: "△",
		biguplus: "⨄",
		xuplus: "⨄",
		bkarow: "⤍",
		rbarr: "⤍",
		blacklozenge: "⧫",
		lozf: "⧫",
		blacktriangle: "▴",
		utrif: "▴",
		blacktriangledown: "▾",
		dtrif: "▾",
		blacktriangleleft: "◂",
		ltrif: "◂",
		blacktriangleright: "▸",
		rtrif: "▸",
		blank: "␣",
		blk12: "▒",
		blk14: "░",
		blk34: "▓",
		block: "█",
		bne: "=⃥",
		bnequiv: "≡⃥",
		bnot: "⌐",
		bopf: "𝕓",
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
		boxhD: "╥",
		boxhU: "╨",
		boxhd: "┬",
		boxhu: "┴",
		boxminus: "⊟",
		minusb: "⊟",
		boxplus: "⊞",
		plusb: "⊞",
		boxtimes: "⊠",
		timesb: "⊠",
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
		brvbar: "¦",
		bscr: "𝒷",
		bsemi: "⁏",
		bsol: "\\",
		bsolb: "⧅",
		bsolhsub: "⟈",
		bull: "•",
		bullet: "•",
		bumpE: "⪮",
		cacute: "ć",
		cap: "∩",
		capand: "⩄",
		capbrcup: "⩉",
		capcap: "⩋",
		capcup: "⩇",
		capdot: "⩀",
		caps: "∩︀",
		caret: "⁁",
		ccaps: "⩍",
		ccaron: "č",
		ccedil: "ç",
		ccirc: "ĉ",
		ccups: "⩌",
		ccupssm: "⩐",
		cdot: "ċ",
		cemptyv: "⦲",
		cent: "¢",
		cfr: "𝔠",
		chcy: "ч",
		check: "✓",
		checkmark: "✓",
		chi: "χ",
		cir: "○",
		cirE: "⧃",
		circ: "ˆ",
		circeq: "≗",
		cire: "≗",
		circlearrowleft: "↺",
		olarr: "↺",
		circlearrowright: "↻",
		orarr: "↻",
		circledS: "Ⓢ",
		oS: "Ⓢ",
		circledast: "⊛",
		oast: "⊛",
		circledcirc: "⊚",
		ocir: "⊚",
		circleddash: "⊝",
		odash: "⊝",
		cirfnint: "⨐",
		cirmid: "⫯",
		cirscir: "⧂",
		clubs: "♣",
		clubsuit: "♣",
		colon: ":",
		comma: ",",
		commat: "@",
		comp: "∁",
		complement: "∁",
		congdot: "⩭",
		copf: "𝕔",
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
		curlyeqprec: "⋞",
		cuesc: "⋟",
		curlyeqsucc: "⋟",
		cularr: "↶",
		curvearrowleft: "↶",
		cularrp: "⤽",
		cup: "∪",
		cupbrcap: "⩈",
		cupcap: "⩆",
		cupcup: "⩊",
		cupdot: "⊍",
		cupor: "⩅",
		cups: "∪︀",
		curarr: "↷",
		curvearrowright: "↷",
		curarrm: "⤼",
		curlyvee: "⋎",
		cuvee: "⋎",
		curlywedge: "⋏",
		cuwed: "⋏",
		curren: "¤",
		cwint: "∱",
		cylcty: "⌭",
		dHar: "⥥",
		dagger: "†",
		daleth: "ℸ",
		dash: "‐",
		hyphen: "‐",
		dbkarow: "⤏",
		rBarr: "⤏",
		dcaron: "ď",
		dcy: "д",
		ddarr: "⇊",
		downdownarrows: "⇊",
		ddotseq: "⩷",
		eDDot: "⩷",
		deg: "°",
		delta: "δ",
		demptyv: "⦱",
		dfisht: "⥿",
		dfr: "𝔡",
		diamondsuit: "♦",
		diams: "♦",
		digamma: "ϝ",
		gammad: "ϝ",
		disin: "⋲",
		div: "÷",
		divide: "÷",
		divideontimes: "⋇",
		divonx: "⋇",
		djcy: "ђ",
		dlcorn: "⌞",
		llcorner: "⌞",
		dlcrop: "⌍",
		dollar: "$",
		dopf: "𝕕",
		doteqdot: "≑",
		eDot: "≑",
		dotminus: "∸",
		minusd: "∸",
		dotplus: "∔",
		plusdo: "∔",
		dotsquare: "⊡",
		sdotb: "⊡",
		drcorn: "⌟",
		lrcorner: "⌟",
		drcrop: "⌌",
		dscr: "𝒹",
		dscy: "ѕ",
		dsol: "⧶",
		dstrok: "đ",
		dtdot: "⋱",
		dtri: "▿",
		triangledown: "▿",
		dwangle: "⦦",
		dzcy: "џ",
		dzigrarr: "⟿",
		eacute: "é",
		easter: "⩮",
		ecaron: "ě",
		ecir: "≖",
		eqcirc: "≖",
		ecirc: "ê",
		ecolon: "≕",
		eqcolon: "≕",
		ecy: "э",
		edot: "ė",
		efDot: "≒",
		fallingdotseq: "≒",
		efr: "𝔢",
		eg: "⪚",
		egrave: "è",
		egs: "⪖",
		eqslantgtr: "⪖",
		egsdot: "⪘",
		el: "⪙",
		elinters: "⏧",
		ell: "ℓ",
		els: "⪕",
		eqslantless: "⪕",
		elsdot: "⪗",
		emacr: "ē",
		empty: "∅",
		emptyset: "∅",
		emptyv: "∅",
		varnothing: "∅",
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
		straightepsilon: "ϵ",
		varepsilon: "ϵ",
		equals: "=",
		equest: "≟",
		questeq: "≟",
		equivDD: "⩸",
		eqvparsl: "⧥",
		erDot: "≓",
		risingdotseq: "≓",
		erarr: "⥱",
		escr: "ℯ",
		eta: "η",
		eth: "ð",
		euml: "ë",
		euro: "€",
		excl: "!",
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
		fork: "⋔",
		pitchfork: "⋔",
		forkv: "⫙",
		fpartint: "⨍",
		frac12: "½",
		half: "½",
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
		sfrown: "⌢",
		fscr: "𝒻",
		gEl: "⪌",
		gtreqqless: "⪌",
		gacute: "ǵ",
		gamma: "γ",
		gap: "⪆",
		gtrapprox: "⪆",
		gbreve: "ğ",
		gcirc: "ĝ",
		gcy: "г",
		gdot: "ġ",
		gescc: "⪩",
		gesdot: "⪀",
		gesdoto: "⪂",
		gesdotol: "⪄",
		gesl: "⋛︀",
		gesles: "⪔",
		gfr: "𝔤",
		gimel: "ℷ",
		gjcy: "ѓ",
		glE: "⪒",
		gla: "⪥",
		glj: "⪤",
		gnE: "≩",
		gneqq: "≩",
		gnap: "⪊",
		gnapprox: "⪊",
		gne: "⪈",
		gneq: "⪈",
		gnsim: "⋧",
		gopf: "𝕘",
		gscr: "ℊ",
		gsime: "⪎",
		gsiml: "⪐",
		gtcc: "⪧",
		gtcir: "⩺",
		gtdot: "⋗",
		gtrdot: "⋗",
		gtlPar: "⦕",
		gtquest: "⩼",
		gtrarr: "⥸",
		gvertneqq: "≩︀",
		gvnE: "≩︀",
		hardcy: "ъ",
		harrcir: "⥈",
		harrw: "↭",
		leftrightsquigarrow: "↭",
		hbar: "ℏ",
		hslash: "ℏ",
		planck: "ℏ",
		plankv: "ℏ",
		hcirc: "ĥ",
		hearts: "♥",
		heartsuit: "♥",
		hellip: "…",
		mldr: "…",
		hercon: "⊹",
		hfr: "𝔥",
		hksearow: "⤥",
		searhk: "⤥",
		hkswarow: "⤦",
		swarhk: "⤦",
		hoarr: "⇿",
		homtht: "∻",
		hookleftarrow: "↩",
		larrhk: "↩",
		hookrightarrow: "↪",
		rarrhk: "↪",
		hopf: "𝕙",
		horbar: "―",
		hscr: "𝒽",
		hstrok: "ħ",
		hybull: "⁃",
		iacute: "í",
		icirc: "î",
		icy: "и",
		iecy: "е",
		iexcl: "¡",
		ifr: "𝔦",
		igrave: "ì",
		iiiint: "⨌",
		qint: "⨌",
		iiint: "∭",
		tint: "∭",
		iinfin: "⧜",
		iiota: "℩",
		ijlig: "ĳ",
		imacr: "ī",
		imath: "ı",
		inodot: "ı",
		imof: "⊷",
		imped: "Ƶ",
		incare: "℅",
		infin: "∞",
		infintie: "⧝",
		intcal: "⊺",
		intercal: "⊺",
		intlarhk: "⨗",
		intprod: "⨼",
		iprod: "⨼",
		iocy: "ё",
		iogon: "į",
		iopf: "𝕚",
		iota: "ι",
		iquest: "¿",
		iscr: "𝒾",
		isinE: "⋹",
		isindot: "⋵",
		isins: "⋴",
		isinsv: "⋳",
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
		varkappa: "ϰ",
		kcedil: "ķ",
		kcy: "к",
		kfr: "𝔨",
		kgreen: "ĸ",
		khcy: "х",
		kjcy: "ќ",
		kopf: "𝕜",
		kscr: "𝓀",
		lAtail: "⤛",
		lBarr: "⤎",
		lEg: "⪋",
		lesseqqgtr: "⪋",
		lHar: "⥢",
		lacute: "ĺ",
		laemptyv: "⦴",
		lambda: "λ",
		langd: "⦑",
		lap: "⪅",
		lessapprox: "⪅",
		laquo: "«",
		larrbfs: "⤟",
		larrfs: "⤝",
		larrlp: "↫",
		looparrowleft: "↫",
		larrpl: "⤹",
		larrsim: "⥳",
		larrtl: "↢",
		leftarrowtail: "↢",
		lat: "⪫",
		latail: "⤙",
		late: "⪭",
		lates: "⪭︀",
		lbarr: "⤌",
		lbbrk: "❲",
		lbrace: "{",
		lcub: "{",
		lbrack: "[",
		lsqb: "[",
		lbrke: "⦋",
		lbrksld: "⦏",
		lbrkslu: "⦍",
		lcaron: "ľ",
		lcedil: "ļ",
		lcy: "л",
		ldca: "⤶",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		ldsh: "↲",
		le: "≤",
		leq: "≤",
		leftleftarrows: "⇇",
		llarr: "⇇",
		leftthreetimes: "⋋",
		lthree: "⋋",
		lescc: "⪨",
		lesdot: "⩿",
		lesdoto: "⪁",
		lesdotor: "⪃",
		lesg: "⋚︀",
		lesges: "⪓",
		lessdot: "⋖",
		ltdot: "⋖",
		lfisht: "⥼",
		lfr: "𝔩",
		lgE: "⪑",
		lharul: "⥪",
		lhblk: "▄",
		ljcy: "љ",
		llhard: "⥫",
		lltri: "◺",
		lmidot: "ŀ",
		lmoust: "⎰",
		lmoustache: "⎰",
		lnE: "≨",
		lneqq: "≨",
		lnap: "⪉",
		lnapprox: "⪉",
		lne: "⪇",
		lneq: "⪇",
		lnsim: "⋦",
		loang: "⟬",
		loarr: "⇽",
		longmapsto: "⟼",
		xmap: "⟼",
		looparrowright: "↬",
		rarrlp: "↬",
		lopar: "⦅",
		lopf: "𝕝",
		loplus: "⨭",
		lotimes: "⨴",
		lowast: "∗",
		loz: "◊",
		lozenge: "◊",
		lpar: "(",
		lparlt: "⦓",
		lrhard: "⥭",
		lrm: "‎",
		lrtri: "⊿",
		lsaquo: "‹",
		lscr: "𝓁",
		lsime: "⪍",
		lsimg: "⪏",
		lsquor: "‚",
		sbquo: "‚",
		lstrok: "ł",
		ltcc: "⪦",
		ltcir: "⩹",
		ltimes: "⋉",
		ltlarr: "⥶",
		ltquest: "⩻",
		ltrPar: "⦖",
		ltri: "◃",
		triangleleft: "◃",
		lurdshar: "⥊",
		luruhar: "⥦",
		lvertneqq: "≨︀",
		lvnE: "≨︀",
		mDDot: "∺",
		macr: "¯",
		strns: "¯",
		male: "♂",
		malt: "✠",
		maltese: "✠",
		marker: "▮",
		mcomma: "⨩",
		mcy: "м",
		mdash: "—",
		mfr: "𝔪",
		mho: "℧",
		micro: "µ",
		midcir: "⫰",
		minus: "−",
		minusdu: "⨪",
		mlcp: "⫛",
		models: "⊧",
		mopf: "𝕞",
		mscr: "𝓂",
		mu: "μ",
		multimap: "⊸",
		mumap: "⊸",
		nGg: "⋙̸",
		nGt: "≫⃒",
		nLeftarrow: "⇍",
		nlArr: "⇍",
		nLeftrightarrow: "⇎",
		nhArr: "⇎",
		nLl: "⋘̸",
		nLt: "≪⃒",
		nRightarrow: "⇏",
		nrArr: "⇏",
		nVDash: "⊯",
		nVdash: "⊮",
		nacute: "ń",
		nang: "∠⃒",
		napE: "⩰̸",
		napid: "≋̸",
		napos: "ŉ",
		natur: "♮",
		natural: "♮",
		ncap: "⩃",
		ncaron: "ň",
		ncedil: "ņ",
		ncongdot: "⩭̸",
		ncup: "⩂",
		ncy: "н",
		ndash: "–",
		neArr: "⇗",
		nearhk: "⤤",
		nedot: "≐̸",
		nesear: "⤨",
		toea: "⤨",
		nfr: "𝔫",
		nharr: "↮",
		nleftrightarrow: "↮",
		nhpar: "⫲",
		nis: "⋼",
		nisd: "⋺",
		njcy: "њ",
		nlE: "≦̸",
		nleqq: "≦̸",
		nlarr: "↚",
		nleftarrow: "↚",
		nldr: "‥",
		nopf: "𝕟",
		not: "¬",
		notinE: "⋹̸",
		notindot: "⋵̸",
		notinvb: "⋷",
		notinvc: "⋶",
		notnivb: "⋾",
		notnivc: "⋽",
		nparsl: "⫽⃥",
		npart: "∂̸",
		npolint: "⨔",
		nrarr: "↛",
		nrightarrow: "↛",
		nrarrc: "⤳̸",
		nrarrw: "↝̸",
		nscr: "𝓃",
		nsub: "⊄",
		nsubE: "⫅̸",
		nsubseteqq: "⫅̸",
		nsup: "⊅",
		nsupE: "⫆̸",
		nsupseteqq: "⫆̸",
		ntilde: "ñ",
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
		nwnear: "⤧",
		oacute: "ó",
		ocirc: "ô",
		ocy: "о",
		odblac: "ő",
		odiv: "⨸",
		odsold: "⦼",
		oelig: "œ",
		ofcir: "⦿",
		ofr: "𝔬",
		ogon: "˛",
		ograve: "ò",
		ogt: "⧁",
		ohbar: "⦵",
		olcir: "⦾",
		olcross: "⦻",
		olt: "⧀",
		omacr: "ō",
		omega: "ω",
		omicron: "ο",
		omid: "⦶",
		oopf: "𝕠",
		opar: "⦷",
		operp: "⦹",
		or: "∨",
		vee: "∨",
		ord: "⩝",
		order: "ℴ",
		orderof: "ℴ",
		oscr: "ℴ",
		ordf: "ª",
		ordm: "º",
		origof: "⊶",
		oror: "⩖",
		orslope: "⩗",
		orv: "⩛",
		oslash: "ø",
		osol: "⊘",
		otilde: "õ",
		otimesas: "⨶",
		ouml: "ö",
		ovbar: "⌽",
		para: "¶",
		parsim: "⫳",
		parsl: "⫽",
		pcy: "п",
		percnt: "%",
		period: ".",
		permil: "‰",
		pertenk: "‱",
		pfr: "𝔭",
		phi: "φ",
		phiv: "ϕ",
		straightphi: "ϕ",
		varphi: "ϕ",
		phone: "☎",
		pi: "π",
		piv: "ϖ",
		varpi: "ϖ",
		planckh: "ℎ",
		plus: "+",
		plusacir: "⨣",
		pluscir: "⨢",
		plusdu: "⨥",
		pluse: "⩲",
		plussim: "⨦",
		plustwo: "⨧",
		pointint: "⨕",
		popf: "𝕡",
		pound: "£",
		prE: "⪳",
		prap: "⪷",
		precapprox: "⪷",
		precnapprox: "⪹",
		prnap: "⪹",
		precneqq: "⪵",
		prnE: "⪵",
		precnsim: "⋨",
		prnsim: "⋨",
		prime: "′",
		profalar: "⌮",
		profline: "⌒",
		profsurf: "⌓",
		prurel: "⊰",
		pscr: "𝓅",
		psi: "ψ",
		puncsp: " ",
		qfr: "𝔮",
		qopf: "𝕢",
		qprime: "⁗",
		qscr: "𝓆",
		quatint: "⨖",
		quest: "?",
		rAtail: "⤜",
		rHar: "⥤",
		race: "∽̱",
		racute: "ŕ",
		raemptyv: "⦳",
		rangd: "⦒",
		range: "⦥",
		raquo: "»",
		rarrap: "⥵",
		rarrbfs: "⤠",
		rarrc: "⤳",
		rarrfs: "⤞",
		rarrpl: "⥅",
		rarrsim: "⥴",
		rarrtl: "↣",
		rightarrowtail: "↣",
		rarrw: "↝",
		rightsquigarrow: "↝",
		ratail: "⤚",
		ratio: "∶",
		rbbrk: "❳",
		rbrace: "}",
		rcub: "}",
		rbrack: "]",
		rsqb: "]",
		rbrke: "⦌",
		rbrksld: "⦎",
		rbrkslu: "⦐",
		rcaron: "ř",
		rcedil: "ŗ",
		rcy: "р",
		rdca: "⤷",
		rdldhar: "⥩",
		rdsh: "↳",
		rect: "▭",
		rfisht: "⥽",
		rfr: "𝔯",
		rharul: "⥬",
		rho: "ρ",
		rhov: "ϱ",
		varrho: "ϱ",
		rightrightarrows: "⇉",
		rrarr: "⇉",
		rightthreetimes: "⋌",
		rthree: "⋌",
		ring: "˚",
		rlm: "‏",
		rmoust: "⎱",
		rmoustache: "⎱",
		rnmid: "⫮",
		roang: "⟭",
		roarr: "⇾",
		ropar: "⦆",
		ropf: "𝕣",
		roplus: "⨮",
		rotimes: "⨵",
		rpar: ")",
		rpargt: "⦔",
		rppolint: "⨒",
		rsaquo: "›",
		rscr: "𝓇",
		rtimes: "⋊",
		rtri: "▹",
		triangleright: "▹",
		rtriltri: "⧎",
		ruluhar: "⥨",
		rx: "℞",
		sacute: "ś",
		scE: "⪴",
		scap: "⪸",
		succapprox: "⪸",
		scaron: "š",
		scedil: "ş",
		scirc: "ŝ",
		scnE: "⪶",
		succneqq: "⪶",
		scnap: "⪺",
		succnapprox: "⪺",
		scnsim: "⋩",
		succnsim: "⋩",
		scpolint: "⨓",
		scy: "с",
		sdot: "⋅",
		sdote: "⩦",
		seArr: "⇘",
		sect: "§",
		semi: ";",
		seswar: "⤩",
		tosa: "⤩",
		sext: "✶",
		sfr: "𝔰",
		sharp: "♯",
		shchcy: "щ",
		shcy: "ш",
		shy: "­",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		varsigma: "ς",
		simdot: "⩪",
		simg: "⪞",
		simgE: "⪠",
		siml: "⪝",
		simlE: "⪟",
		simne: "≆",
		simplus: "⨤",
		simrarr: "⥲",
		smashp: "⨳",
		smeparsl: "⧤",
		smile: "⌣",
		ssmile: "⌣",
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
		sqcaps: "⊓︀",
		sqcups: "⊔︀",
		sscr: "𝓈",
		star: "☆",
		sub: "⊂",
		subset: "⊂",
		subE: "⫅",
		subseteqq: "⫅",
		subdot: "⪽",
		subedot: "⫃",
		submult: "⫁",
		subnE: "⫋",
		subsetneqq: "⫋",
		subne: "⊊",
		subsetneq: "⊊",
		subplus: "⪿",
		subrarr: "⥹",
		subsim: "⫇",
		subsub: "⫕",
		subsup: "⫓",
		sung: "♪",
		sup1: "¹",
		sup2: "²",
		sup3: "³",
		supE: "⫆",
		supseteqq: "⫆",
		supdot: "⪾",
		supdsub: "⫘",
		supedot: "⫄",
		suphsol: "⟉",
		suphsub: "⫗",
		suplarr: "⥻",
		supmult: "⫂",
		supnE: "⫌",
		supsetneqq: "⫌",
		supne: "⊋",
		supsetneq: "⊋",
		supplus: "⫀",
		supsim: "⫈",
		supsub: "⫔",
		supsup: "⫖",
		swArr: "⇙",
		swnwar: "⤪",
		szlig: "ß",
		target: "⌖",
		tau: "τ",
		tcaron: "ť",
		tcedil: "ţ",
		tcy: "т",
		telrec: "⌕",
		tfr: "𝔱",
		theta: "θ",
		thetasym: "ϑ",
		thetav: "ϑ",
		vartheta: "ϑ",
		thorn: "þ",
		times: "×",
		timesbar: "⨱",
		timesd: "⨰",
		topbot: "⌶",
		topcir: "⫱",
		topf: "𝕥",
		topfork: "⫚",
		tprime: "‴",
		triangle: "▵",
		utri: "▵",
		triangleq: "≜",
		trie: "≜",
		tridot: "◬",
		triminus: "⨺",
		triplus: "⨹",
		trisb: "⧍",
		tritime: "⨻",
		trpezium: "⏢",
		tscr: "𝓉",
		tscy: "ц",
		tshcy: "ћ",
		tstrok: "ŧ",
		uHar: "⥣",
		uacute: "ú",
		ubrcy: "ў",
		ubreve: "ŭ",
		ucirc: "û",
		ucy: "у",
		udblac: "ű",
		ufisht: "⥾",
		ufr: "𝔲",
		ugrave: "ù",
		uhblk: "▀",
		ulcorn: "⌜",
		ulcorner: "⌜",
		ulcrop: "⌏",
		ultri: "◸",
		umacr: "ū",
		uogon: "ų",
		uopf: "𝕦",
		upsi: "υ",
		upsilon: "υ",
		upuparrows: "⇈",
		uuarr: "⇈",
		urcorn: "⌝",
		urcorner: "⌝",
		urcrop: "⌎",
		uring: "ů",
		urtri: "◹",
		uscr: "𝓊",
		utdot: "⋰",
		utilde: "ũ",
		uuml: "ü",
		uwangle: "⦧",
		vBar: "⫨",
		vBarv: "⫩",
		vangrt: "⦜",
		varsubsetneq: "⊊︀",
		vsubne: "⊊︀",
		varsubsetneqq: "⫋︀",
		vsubnE: "⫋︀",
		varsupsetneq: "⊋︀",
		vsupne: "⊋︀",
		varsupsetneqq: "⫌︀",
		vsupnE: "⫌︀",
		vcy: "в",
		veebar: "⊻",
		veeeq: "≚",
		vellip: "⋮",
		vfr: "𝔳",
		vopf: "𝕧",
		vscr: "𝓋",
		vzigzag: "⦚",
		wcirc: "ŵ",
		wedbar: "⩟",
		wedgeq: "≙",
		weierp: "℘",
		wp: "℘",
		wfr: "𝔴",
		wopf: "𝕨",
		wscr: "𝓌",
		xfr: "𝔵",
		xi: "ξ",
		xnis: "⋻",
		xopf: "𝕩",
		xscr: "𝓍",
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
		zeta: "ζ",
		zfr: "𝔷",
		zhcy: "ж",
		zigrarr: "⇝",
		zopf: "𝕫",
		zscr: "𝓏",
		zwj: "‍",
		zwnj: "‌"
	};
	_e.ngsp = "";
	za = class {
		tokens;
		errors;
		nonNormalizedIcuExpressions;
		constructor(e, t, r) {
			this.tokens = e, this.errors = t, this.nonNormalizedIcuExpressions = r;
		}
	};
	Ga = /\r\n?/g;
	ja = [
		"@if",
		"@else",
		"@for",
		"@switch",
		"@case",
		"@default",
		"@empty",
		"@defer",
		"@placeholder",
		"@loading",
		"@error",
		"@content"
	];
	it = {
		start: "{{",
		end: "}}"
	};
	Ya = /^default[^\S\r\n]+never/;
	Ka = /^else[^\S\r\n]+if/;
	Qa = class {
		_getTagContentType;
		_cursor;
		_tokenizeIcu;
		_leadingTriviaCodePoints;
		_canSelfClose;
		_allowHtmComponentClosingTags;
		_allowStartTagComments;
		_currentTokenStart = null;
		_currentTokenType = null;
		_expansionCaseStack = [];
		_openDirectiveCount = 0;
		_inInterpolation = !1;
		_preserveLineEndings;
		_i18nNormalizeLineEndingsInICUs;
		_fullNameStack = [];
		_tokenizeBlocks;
		_tokenizeLet;
		_selectorlessEnabled;
		tokens = [];
		errors = [];
		nonNormalizedIcuExpressions = [];
		constructor(e, t, r) {
			this._getTagContentType = t, this._tokenizeIcu = r.tokenizeExpansionForms || !1, this._leadingTriviaCodePoints = r.leadingTriviaChars && r.leadingTriviaChars.map((i) => i.codePointAt(0) || 0), this._canSelfClose = r.canSelfClose || !1, this._allowHtmComponentClosingTags = r.allowHtmComponentClosingTags || !1, this._allowStartTagComments = r.allowStartTagComments ?? !0;
			let n = r.range || {
				endPos: e.content.length,
				startPos: 0,
				startLine: 0,
				startCol: 0
			};
			this._cursor = r.escapedString ? new io(e, n) : new Ii(e, n), this._preserveLineEndings = r.preserveLineEndings || !1, this._i18nNormalizeLineEndingsInICUs = r.i18nNormalizeLineEndingsInICUs || !1, this._tokenizeBlocks = r.tokenizeBlocks ?? !0, this._tokenizeLet = r.tokenizeLet ?? !0, this._selectorlessEnabled = r.selectorlessEnabled ?? !1;
			try {
				this._cursor.init();
			} catch (i) {
				this.handleError(i);
			}
		}
		_processCarriageReturns(e) {
			return this._preserveLineEndings ? e : e.replace(Ga, `
`);
		}
		tokenize() {
			for (; this._cursor.peek() !== 0;) {
				let e = this._cursor.clone();
				try {
					if (this._attemptCharCode(60)) if (this._attemptCharCode(33)) this._attemptStr("[CDATA[") ? this._consumeCdata(e) : this._attemptStr("--") ? this._consumeComment(e) : this._attemptStrCaseInsensitive("doctype") ? this._consumeDocType(e) : this._consumeBogusComment(e);
					else if (this._attemptCharCode(47)) this._consumeTagClose(e);
					else {
						let t = this._cursor.clone();
						this._attemptCharCode(63) ? (this._cursor = t, this._consumeBogusComment(e)) : this._consumeTagOpen(e);
					}
					else this._tokenizeLet && this._cursor.peek() === 64 && !this._inInterpolation && this._isLetStart() ? this._consumeLetDeclaration(e) : this._tokenizeBlocks && this._isBlockStart() ? this._consumeBlockStart(e) : this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansionCase() && !this._isInExpansionForm() && this._attemptCharCode(125) ? this._consumeBlockEnd(e) : this._tokenizeIcu && this._tokenizeExpansionForm() || this._consumeWithInterpolation(5, 8, () => this._isTextEnd(), () => this._isTagStart());
				} catch (t) {
					this.handleError(t);
				}
			}
			this._beginToken(43), this._endToken([]);
		}
		_getBlockName() {
			let e = !1, t = this._cursor.clone();
			this._attemptCharCodeUntilFn((n) => nt(n) ? !e : ro(n) ? (e = !0, !1) : !0);
			let r = this._cursor.getChars(t).trim();
			return Ka.test(r) ? r = "else if" : Ya.test(r) && (r = "default never"), r;
		}
		_consumeBlockStart(e) {
			this._requireCharCode(64), this._beginToken(26, e);
			let t = this._endToken([this._getBlockName()]);
			if (this._cursor.peek() === 40) if (this._cursor.advance(), this._consumeBlockParameters(), this._attemptCharCodeUntilFn(b), this._attemptCharCode(41)) this._attemptCharCodeUntilFn(b);
			else {
				t.type = 30;
				return;
			}
			if (t.parts[0] === "default never" && this._attemptCharCode(59)) {
				this._beginToken(27), this._endToken([]), this._beginToken(28), this._endToken([]);
				return;
			}
			this._attemptCharCode(123) ? (this._beginToken(27), this._endToken([])) : this._isBlockStart() && (t.parts[0] === "case" || t.parts[0] === "default") ? (this._beginToken(27), this._endToken([]), this._beginToken(28), this._endToken([])) : t.type = 30;
		}
		_consumeBlockEnd(e) {
			this._beginToken(28, e), this._endToken([]);
		}
		_consumeBlockParameters() {
			for (this._attemptCharCodeUntilFn(Ai); this._cursor.peek() !== 41 && this._cursor.peek() !== 0;) {
				this._beginToken(29);
				let e = this._cursor.clone(), t = null, r = 0;
				for (; this._cursor.peek() !== 59 && this._cursor.peek() !== 0 || t !== null;) {
					let n = this._cursor.peek();
					if (n === 92) this._cursor.advance();
					else if (n === t) t = null;
					else if (t === null && Rt(n)) t = n;
					else if (n === 40 && t === null) r++;
					else if (n === 41 && t === null) {
						if (r === 0) break;
						r > 0 && r--;
					}
					this._cursor.advance();
				}
				this._endToken([this._cursor.getChars(e)]), this._attemptCharCodeUntilFn(Ai);
			}
		}
		_consumeLetDeclaration(e) {
			if (this._requireStr("@let"), this._beginToken(31, e), nt(this._cursor.peek())) this._attemptCharCodeUntilFn(b);
			else {
				let r = this._endToken([this._cursor.getChars(e)]);
				r.type = 34;
				return;
			}
			let t = this._endToken([this._getLetDeclarationName()]);
			if (this._attemptCharCodeUntilFn(b), !this._attemptCharCode(61)) {
				t.type = 34;
				return;
			}
			this._attemptCharCodeUntilFn((r) => b(r) && !Oe(r)), this._consumeLetDeclarationValue(), this._cursor.peek() === 59 ? (this._beginToken(33), this._cursor.advance(), this._endToken([])) : (t.type = 34, t.sourceSpan = this._cursor.getSpan(e));
		}
		_getLetDeclarationName() {
			let e = this._cursor.clone(), t = !1;
			return this._attemptCharCodeUntilFn((r) => Re(r) || r === 36 || r === 95 || t && Ie(r) ? (t = !0, !1) : !0), this._cursor.getChars(e).trim();
		}
		_consumeLetDeclarationValue() {
			let e = this._cursor.clone();
			for (this._beginToken(32, e); this._cursor.peek() !== 0;) {
				let t = this._cursor.peek();
				if (t === 59) break;
				Rt(t) && (this._cursor.advance(), this._attemptCharCodeUntilFn((r) => r === 92 ? (this._cursor.advance(), !1) : r === t)), this._cursor.advance();
			}
			this._endToken([this._cursor.getChars(e)]);
		}
		_tokenizeExpansionForm() {
			if (this.isExpansionFormStart()) return this._consumeExpansionFormStart(), !0;
			if (eo(this._cursor.peek()) && this._isInExpansionForm()) return this._consumeExpansionCaseStart(), !0;
			if (this._cursor.peek() === 125) {
				if (this._isInExpansionCase()) return this._consumeExpansionCaseEnd(), !0;
				if (this._isInExpansionForm()) return this._consumeExpansionFormEnd(), !0;
			}
			return !1;
		}
		_beginToken(e, t = this._cursor.clone()) {
			this._currentTokenStart = t, this._currentTokenType = e;
		}
		_endToken(e, t) {
			if (this._currentTokenStart === null) throw new te(this._cursor.getSpan(t), "Programming error - attempted to end a token when there was no start to the token");
			if (this._currentTokenType === null) throw new te(this._cursor.getSpan(this._currentTokenStart), "Programming error - attempted to end a token which has no token type");
			let r = {
				type: this._currentTokenType,
				parts: e,
				sourceSpan: (t ?? this._cursor).getSpan(this._currentTokenStart, this._leadingTriviaCodePoints)
			};
			return this.tokens.push(r), this._currentTokenStart = null, this._currentTokenType = null, r;
		}
		_createError(e, t) {
			this._isInExpansionForm() && (e += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`);
			let r = new te(t, e);
			return this._currentTokenStart = null, this._currentTokenType = null, r;
		}
		handleError(e) {
			if (e instanceof Cr && (e = this._createError(e.msg, this._cursor.getSpan(e.cursor))), e instanceof te) this.errors.push(e);
			else throw e;
		}
		_attemptCharCode(e) {
			return this._cursor.peek() === e ? (this._cursor.advance(), !0) : !1;
		}
		_attemptCharCodeCaseInsensitive(e) {
			return to(this._cursor.peek(), e) ? (this._cursor.advance(), !0) : !1;
		}
		_requireCharCode(e) {
			let t = this._cursor.clone();
			if (!this._attemptCharCode(e)) throw this._createError(Se(this._cursor.peek()), this._cursor.getSpan(t));
		}
		_attemptStr(e) {
			let t = e.length;
			if (this._cursor.charsLeft() < t) return !1;
			let r = this._cursor.clone();
			for (let n = 0; n < t; n++) if (!this._attemptCharCode(e.charCodeAt(n))) return this._cursor = r, !1;
			return !0;
		}
		_attemptStrCaseInsensitive(e) {
			for (let t = 0; t < e.length; t++) if (!this._attemptCharCodeCaseInsensitive(e.charCodeAt(t))) return !1;
			return !0;
		}
		_requireStr(e) {
			let t = this._cursor.clone();
			if (!this._attemptStr(e)) throw this._createError(Se(this._cursor.peek()), this._cursor.getSpan(t));
		}
		_requireStrCaseInsensitive(e) {
			let t = this._cursor.clone();
			if (!this._attemptStrCaseInsensitive(e)) throw this._createError(Se(this._cursor.peek()), this._cursor.getSpan(t));
		}
		_attemptCharCodeUntilFn(e) {
			for (; !e(this._cursor.peek());) this._cursor.advance();
		}
		_requireCharCodeUntilFn(e, t) {
			let r = this._cursor.clone();
			if (this._attemptCharCodeUntilFn(e), this._cursor.diff(r) < t) throw this._createError(Se(this._cursor.peek()), this._cursor.getSpan(r));
		}
		_attemptUntilChar(e) {
			for (; this._cursor.peek() !== e;) this._cursor.advance();
		}
		_readChar() {
			let e = String.fromCodePoint(this._cursor.peek());
			return this._cursor.advance(), e;
		}
		_peekStr(e) {
			let t = e.length;
			if (this._cursor.charsLeft() < t) return !1;
			let r = this._cursor.clone();
			for (let n = 0; n < t; n++) {
				if (r.peek() !== e.charCodeAt(n)) return !1;
				r.advance();
			}
			return !0;
		}
		_isBlockStart() {
			return this._cursor.peek() === 64 && ja.some((e) => this._peekStr(e));
		}
		_isLetStart() {
			return this._cursor.peek() === 64 && this._peekStr("@let");
		}
		_consumeEntity(e) {
			this._beginToken(9);
			let t = this._cursor.clone();
			if (this._cursor.advance(), this._attemptCharCode(35)) {
				let r = this._attemptCharCode(120) || this._attemptCharCode(88), n = this._cursor.clone();
				if (this._attemptCharCodeUntilFn(Ja), this._cursor.peek() != 59) {
					this._cursor.advance();
					let s = r ? "hexadecimal" : "decimal";
					throw this._createError($a(s, this._cursor.getChars(t)), this._cursor.getSpan());
				}
				let i = this._cursor.getChars(n);
				this._cursor.advance();
				try {
					let s = parseInt(i, r ? 16 : 10);
					this._endToken([String.fromCodePoint(s), this._cursor.getChars(t)]);
				} catch {
					throw this._createError(xi(this._cursor.getChars(t)), this._cursor.getSpan());
				}
			} else {
				let r = this._cursor.clone();
				if (this._attemptCharCodeUntilFn(Za), this._cursor.peek() != 59) this._beginToken(e, t), this._cursor = r, this._endToken(["&"]);
				else {
					let n = this._cursor.getChars(r);
					this._cursor.advance();
					let i = _e.hasOwnProperty(n) && _e[n];
					if (!i) throw this._createError(xi(n), this._cursor.getSpan(t));
					this._endToken([i, `&${n};`]);
				}
			}
		}
		_consumeRawText(e, t) {
			this._beginToken(e ? 6 : 7);
			let r = [];
			for (;;) {
				let n = this._cursor.clone(), i = t();
				if (this._cursor = n, i) break;
				e && this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(r.join(""))]), r.length = 0, this._consumeEntity(6), this._beginToken(6)) : r.push(this._readChar());
			}
			this._endToken([this._processCarriageReturns(r.join(""))]);
		}
		_consumeComment(e) {
			this._beginToken(10, e), this._endToken([]), this._consumeRawText(!1, () => this._attemptStr("-->")), this._beginToken(11), this._requireStr("-->"), this._endToken([]);
		}
		_consumeBogusComment(e) {
			this._beginToken(10, e), this._endToken([]), this._consumeRawText(!1, () => this._cursor.peek() === 62), this._beginToken(11), this._cursor.advance(), this._endToken([]);
		}
		_consumeCdata(e) {
			this._beginToken(13, e), this._endToken([]), this._consumeRawText(!1, () => this._attemptStr("]]>")), this._beginToken(14), this._requireStr("]]>"), this._endToken([]);
		}
		_consumeDocType(e) {
			this._beginToken(19, e), this._endToken([]), this._consumeRawText(!1, () => this._cursor.peek() === 62), this._beginToken(20), this._cursor.advance(), this._endToken([]);
		}
		_consumePrefixAndName(e) {
			let t = this._cursor.clone(), r = "";
			for (; this._cursor.peek() !== 58 && !Xa(this._cursor.peek());) this._cursor.advance();
			let n;
			this._cursor.peek() === 58 ? (r = this._cursor.getChars(t), this._cursor.advance(), n = this._cursor.clone()) : n = t, this._requireCharCodeUntilFn(e, r === "" ? 0 : 1);
			let i = this._cursor.getChars(n);
			return [r, i];
		}
		_consumeSingleLineComment(e) {
			let t = this._cursor.clone();
			this._attemptCharCodeUntilFn((i) => Oe(i) || i === 0);
			let r = this._cursor.clone(), n = r.getChars(t);
			this._beginToken(12, e), this._endToken([n, "single"], r), this._attemptCharCodeUntilFn(b);
		}
		_consumeMultiLineComment(e) {
			let t = this._cursor.clone();
			this._attemptCharCodeUntilFn((s) => {
				if (s === 0) return !0;
				if (s === 42) {
					let a = this._cursor.clone();
					return a.advance(), a.peek() === 47;
				}
				return !1;
			});
			let r = this._cursor.clone(), n = r.getChars(t), i = r;
			this._attemptStr("*/") && (i = this._cursor.clone(), this._attemptCharCodeUntilFn(b)), this._beginToken(12, e), this._endToken([n, "multi"], i);
		}
		_consumeTagOpen(e) {
			let t, r, n, i, s = [];
			try {
				if (this._selectorlessEnabled && Ot(this._cursor.peek())) i = this._consumeComponentOpenStart(e), [n, r, t] = i.parts, r && (n += `:${r}`), t && (n += `:${t}`), this._attemptCharCodeUntilFn(b);
				else {
					if (!Re(this._cursor.peek())) throw this._createError(Se(this._cursor.peek()), this._cursor.getSpan(e));
					i = this._consumeTagOpenStart(e), r = i.parts[0], t = n = i.parts[1], this._attemptCharCodeUntilFn(b);
				}
				for (;;) {
					if (this._allowStartTagComments) {
						let o = this._cursor.clone();
						if (this._attemptStr("//")) {
							this._consumeSingleLineComment(o);
							continue;
						}
						if (this._attemptStr("/*")) {
							this._consumeMultiLineComment(o);
							continue;
						}
					}
					if (Ni(this._cursor.peek())) break;
					if (this._selectorlessEnabled && this._cursor.peek() === 64) {
						let o = this._cursor.clone(), l = o.clone();
						l.advance(), Ot(l.peek()) && this._consumeDirective(o, l);
					} else {
						let o = this._consumeAttribute();
						s.push(o);
					}
				}
				i.type === 35 ? this._consumeComponentOpenEnd() : this._consumeTagOpenEnd();
			} catch (o) {
				if (o instanceof te) {
					i ? i.type = i.type === 35 ? 39 : 4 : (this._beginToken(5, e), this._endToken(["<"]));
					return;
				}
				throw o;
			}
			if (this._canSelfClose && this.tokens[this.tokens.length - 1].type === 2) return;
			let a = this._getTagContentType(t, r, this._fullNameStack.length > 0, s);
			this._handleFullNameStackForTagOpen(r, t), a === 0 ? this._consumeRawTextWithTagClose(r, i, n, !1) : a === 1 && this._consumeRawTextWithTagClose(r, i, n, !0);
		}
		_consumeRawTextWithTagClose(e, t, r, n) {
			this._consumeRawText(n, () => !this._attemptCharCode(60) || !this._attemptCharCode(47) || (this._attemptCharCodeUntilFn(b), !this._attemptStrCaseInsensitive(e && t.type !== 35 ? `${e}:${r}` : r)) ? !1 : (this._attemptCharCodeUntilFn(b), this._attemptCharCode(62))), this._beginToken(t.type === 35 ? 38 : 3), this._requireCharCodeUntilFn((i) => i === 62, 3), this._cursor.advance(), this._endToken(t.parts), this._handleFullNameStackForTagClose(e, r);
		}
		_consumeTagOpenStart(e) {
			this._beginToken(0, e);
			let t = this._consumePrefixAndName(ve);
			return this._endToken(t);
		}
		_consumeComponentOpenStart(e) {
			this._beginToken(35, e);
			let t = this._consumeComponentName();
			return this._endToken(t);
		}
		_consumeComponentName() {
			let e = this._cursor.clone();
			for (; Pi(this._cursor.peek());) this._cursor.advance();
			let t = this._cursor.getChars(e), r = "", n = "";
			return this._cursor.peek() === 58 && (this._cursor.advance(), [r, n] = this._consumePrefixAndName(ve)), [
				t,
				r,
				n
			];
		}
		_consumeAttribute() {
			let [e, t] = this._consumeAttributeName(), r;
			return this._attemptCharCodeUntilFn(b), this._attemptCharCode(61) && (this._attemptCharCodeUntilFn(b), r = this._consumeAttributeValue()), this._attemptCharCodeUntilFn(b), {
				prefix: e,
				name: t,
				value: r
			};
		}
		_consumeAttributeName() {
			let e = this._cursor.peek();
			if (e === 39 || e === 34) throw this._createError(Se(e), this._cursor.getSpan());
			this._beginToken(15);
			let t;
			if (this._openDirectiveCount > 0) {
				let n = 0;
				t = (i) => {
					if (this._openDirectiveCount > 0) {
						if (i === 40) n++;
						else if (i === 41) {
							if (n === 0) return !0;
							n--;
						}
					}
					return ve(i);
				};
			} else if (e === 91) {
				let n = 0;
				t = (i) => (i === 91 ? n++ : i === 93 && n--, n <= 0 ? ve(i) : Oe(i));
			} else t = ve;
			let r = this._consumePrefixAndName(t);
			return this._endToken(r), r;
		}
		_consumeAttributeValue() {
			let e;
			if (this._cursor.peek() === 39 || this._cursor.peek() === 34) {
				let t = this._cursor.peek();
				this._consumeQuote(t);
				let r = () => this._cursor.peek() === t;
				e = this._consumeWithInterpolation(17, 18, r, r), this._consumeQuote(t);
			} else {
				let t = () => ve(this._cursor.peek());
				e = this._consumeWithInterpolation(17, 18, t, t);
			}
			return e;
		}
		_consumeQuote(e) {
			this._beginToken(16), this._requireCharCode(e), this._endToken([String.fromCodePoint(e)]);
		}
		_consumeTagOpenEnd() {
			let e = this._attemptCharCode(47) ? 2 : 1;
			this._beginToken(e), this._requireCharCode(62), this._endToken([]);
		}
		_consumeComponentOpenEnd() {
			let e = this._attemptCharCode(47) ? 37 : 36;
			this._beginToken(e), this._requireCharCode(62), this._endToken([]);
		}
		_consumeTagClose(e) {
			if (this._selectorlessEnabled) {
				let t = e.clone();
				for (; t.peek() !== 62 && !Ot(t.peek());) t.advance();
				if (Ot(t.peek())) {
					this._beginToken(38, e);
					let r = this._consumeComponentName();
					this._attemptCharCodeUntilFn(b), this._requireCharCode(62), this._endToken(r);
					return;
				}
			}
			if (this._beginToken(3, e), this._attemptCharCodeUntilFn(b), this._allowHtmComponentClosingTags && this._attemptCharCode(47)) this._attemptCharCodeUntilFn(b), this._requireCharCode(62), this._endToken([]);
			else {
				let [t, r] = this._consumePrefixAndName(ve);
				this._attemptCharCodeUntilFn(b), this._requireCharCode(62), this._endToken([t, r]), this._handleFullNameStackForTagClose(t, r);
			}
		}
		_consumeExpansionFormStart() {
			this._beginToken(21), this._requireCharCode(123), this._endToken([]), this._expansionCaseStack.push(21), this._beginToken(7);
			let e = this._readUntil(44), t = this._processCarriageReturns(e);
			if (this._i18nNormalizeLineEndingsInICUs) this._endToken([t]);
			else {
				let n = this._endToken([e]);
				t !== e && this.nonNormalizedIcuExpressions.push(n);
			}
			this._requireCharCode(44), this._attemptCharCodeUntilFn(b), this._beginToken(7);
			let r = this._readUntil(44);
			this._endToken([r]), this._requireCharCode(44), this._attemptCharCodeUntilFn(b);
		}
		_consumeExpansionCaseStart() {
			this._beginToken(22);
			let e = this._readUntil(123).trim();
			this._endToken([e]), this._attemptCharCodeUntilFn(b), this._beginToken(23), this._requireCharCode(123), this._endToken([]), this._attemptCharCodeUntilFn(b), this._expansionCaseStack.push(23);
		}
		_consumeExpansionCaseEnd() {
			this._beginToken(24), this._requireCharCode(125), this._endToken([]), this._attemptCharCodeUntilFn(b), this._expansionCaseStack.pop();
		}
		_consumeExpansionFormEnd() {
			this._beginToken(25), this._requireCharCode(125), this._endToken([]), this._expansionCaseStack.pop();
		}
		_consumeWithInterpolation(e, t, r, n) {
			this._beginToken(e);
			let i = [];
			for (; !r();) {
				let a = this._cursor.clone();
				this._attemptStr(it.start) ? (this._endToken([this._processCarriageReturns(i.join(""))], a), i.length = 0, this._consumeInterpolation(t, a, n), this._beginToken(e)) : this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(i.join(""))]), i.length = 0, this._consumeEntity(e), this._beginToken(e)) : i.push(this._readChar());
			}
			this._inInterpolation = !1;
			let s = this._processCarriageReturns(i.join(""));
			return this._endToken([s]), s;
		}
		_consumeInterpolation(e, t, r) {
			let n = [];
			this._beginToken(e, t), n.push(it.start);
			let i = this._cursor.clone(), s = null, a = !1;
			for (; this._cursor.peek() !== 0 && (r === null || !r());) {
				let o = this._cursor.clone();
				if (this._isTagStart()) {
					this._cursor = o, n.push(this._getProcessedChars(i, o)), this._endToken(n);
					return;
				}
				if (s === null) if (this._attemptStr(it.end)) {
					n.push(this._getProcessedChars(i, o)), n.push(it.end), this._endToken(n);
					return;
				} else this._attemptStr("//") && (a = !0);
				let l = this._cursor.peek();
				this._cursor.advance(), l === 92 ? this._cursor.advance() : l === s ? s = null : !a && s === null && Rt(l) && (s = l);
			}
			n.push(this._getProcessedChars(i, this._cursor)), this._endToken(n);
		}
		_consumeDirective(e, t) {
			for (this._requireCharCode(64), this._cursor.advance(); Pi(this._cursor.peek());) this._cursor.advance();
			this._beginToken(40, e);
			let r = this._cursor.getChars(t);
			if (this._endToken([r]), this._attemptCharCodeUntilFn(b), this._cursor.peek() === 40) {
				for (this._openDirectiveCount++, this._beginToken(41), this._cursor.advance(), this._endToken([]), this._attemptCharCodeUntilFn(b); !Ni(this._cursor.peek()) && this._cursor.peek() !== 41;) this._consumeAttribute();
				if (this._attemptCharCodeUntilFn(b), this._openDirectiveCount--, this._cursor.peek() !== 41) {
					if (this._cursor.peek() === 62 || this._cursor.peek() === 47) return;
					throw this._createError(Se(this._cursor.peek()), this._cursor.getSpan(e));
				}
				this._beginToken(42), this._cursor.advance(), this._endToken([]), this._attemptCharCodeUntilFn(b);
			}
		}
		_getProcessedChars(e, t) {
			return this._processCarriageReturns(t.getChars(e));
		}
		_isTextEnd() {
			return !!(this._isTagStart() || this._cursor.peek() === 0 || this._tokenizeIcu && !this._inInterpolation && (this.isExpansionFormStart() || this._cursor.peek() === 125 && this._isInExpansionCase()) || this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansion() && (this._isBlockStart() || this._isLetStart() || this._cursor.peek() === 125));
		}
		_isTagStart() {
			if (this._cursor.peek() === 60) {
				let e = this._cursor.clone();
				e.advance();
				let t = e.peek();
				if (97 <= t && t <= 122 || 65 <= t && t <= 90 || t === 47 || t === 33) return !0;
			}
			return !1;
		}
		_readUntil(e) {
			let t = this._cursor.clone();
			return this._attemptUntilChar(e), this._cursor.getChars(t);
		}
		_isInExpansion() {
			return this._isInExpansionCase() || this._isInExpansionForm();
		}
		_isInExpansionCase() {
			return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 23;
		}
		_isInExpansionForm() {
			return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 21;
		}
		isExpansionFormStart() {
			if (this._cursor.peek() !== 123) return !1;
			let e = this._cursor.clone(), t = this._attemptStr(it.start);
			return this._cursor = e, !t;
		}
		_handleFullNameStackForTagOpen(e, t) {
			let r = fe(e, t);
			(this._fullNameStack.length === 0 || this._fullNameStack[this._fullNameStack.length - 1] === r) && this._fullNameStack.push(r);
		}
		_handleFullNameStackForTagClose(e, t) {
			let r = fe(e, t);
			this._fullNameStack.length !== 0 && this._fullNameStack[this._fullNameStack.length - 1] === r && this._fullNameStack.pop();
		}
	};
	Ii = class Sr {
		state;
		file;
		input;
		end;
		constructor(t, r) {
			if (t instanceof Sr) {
				this.file = t.file, this.input = t.input, this.end = t.end;
				let n = t.state;
				this.state = {
					peek: n.peek,
					offset: n.offset,
					line: n.line,
					column: n.column
				};
			} else {
				if (!r) throw new Error("Programming error: the range argument must be provided with a file argument.");
				this.file = t, this.input = t.content, this.end = r.endPos, this.state = {
					peek: -1,
					offset: r.startPos,
					line: r.startLine,
					column: r.startCol
				};
			}
		}
		clone() {
			return new Sr(this);
		}
		peek() {
			return this.state.peek;
		}
		charsLeft() {
			return this.end - this.state.offset;
		}
		diff(t) {
			return this.state.offset - t.state.offset;
		}
		advance() {
			this.advanceState(this.state);
		}
		init() {
			this.updatePeek(this.state);
		}
		getSpan(t, r) {
			t = t || this;
			let n = t;
			if (r) for (; this.diff(t) > 0 && r.indexOf(t.peek()) !== -1;) n === t && (t = t.clone()), t.advance();
			let i = this.locationFromCursor(t);
			return new p(i, this.locationFromCursor(this), n !== t ? this.locationFromCursor(n) : i);
		}
		getChars(t) {
			return this.input.substring(t.state.offset, this.state.offset);
		}
		charAt(t) {
			return this.input.charCodeAt(t);
		}
		advanceState(t) {
			if (t.offset >= this.end) throw this.state = t, new Cr("Unexpected character \"EOF\"", this);
			let r = this.charAt(t.offset);
			r === 10 ? (t.line++, t.column = 0) : Oe(r) || t.column++, t.offset++, this.updatePeek(t);
		}
		updatePeek(t) {
			t.peek = t.offset >= this.end ? 0 : this.charAt(t.offset);
		}
		locationFromCursor(t) {
			return new De(t.file, t.state.offset, t.state.line, t.state.column);
		}
	};
	io = class vr extends Ii {
		internalState;
		constructor(t, r) {
			t instanceof vr ? (super(t), this.internalState = { ...t.internalState }) : (super(t, r), this.internalState = this.state);
		}
		advance() {
			this.state = this.internalState, super.advance(), this.processEscapeSequence();
		}
		init() {
			super.init(), this.processEscapeSequence();
		}
		clone() {
			return new vr(this);
		}
		getChars(t) {
			let r = t.clone(), n = "";
			for (; r.internalState.offset < this.internalState.offset;) n += String.fromCodePoint(r.peek()), r.advance();
			return n;
		}
		processEscapeSequence() {
			let t = () => this.internalState.peek;
			if (t() === 92) if (this.internalState = { ...this.state }, this.advanceState(this.internalState), t() === 110) this.state.peek = 10;
			else if (t() === 114) this.state.peek = 13;
			else if (t() === 118) this.state.peek = 11;
			else if (t() === 116) this.state.peek = 9;
			else if (t() === 98) this.state.peek = 8;
			else if (t() === 102) this.state.peek = 12;
			else if (t() === 117) if (this.advanceState(this.internalState), t() === 123) {
				this.advanceState(this.internalState);
				let r = this.clone(), n = 0;
				for (; t() !== 125;) this.advanceState(this.internalState), n++;
				this.state.peek = this.decodeHexDigits(r, n);
			} else {
				let r = this.clone();
				this.advanceState(this.internalState), this.advanceState(this.internalState), this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r, 4);
			}
			else if (t() === 120) {
				this.advanceState(this.internalState);
				let r = this.clone();
				this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r, 2);
			} else if (_r(t())) {
				let r = "", n = 0, i = this.clone();
				for (; _r(t()) && n < 3;) i = this.clone(), r += String.fromCodePoint(t()), this.advanceState(this.internalState), n++;
				this.state.peek = parseInt(r, 8), this.internalState = i.internalState;
			} else Oe(this.internalState.peek) ? (this.advanceState(this.internalState), this.state = this.internalState) : this.state.peek = this.internalState.peek;
		}
		decodeHexDigits(t, r) {
			let n = this.input.slice(t.internalState.offset, t.internalState.offset + r), i = parseInt(n, 16);
			if (isNaN(i)) throw t.state = t.internalState, new Cr("Invalid hexadecimal escape sequence", t);
			return i;
		}
	};
	Cr = class extends Error {
		msg;
		cursor;
		constructor(e, t) {
			super(e), this.msg = e, this.cursor = t, Object.setPrototypeOf(this, new.target.prototype);
		}
	};
	x = class Mi extends te {
		elementName;
		static create(t, r, n) {
			return new Mi(t, r, n);
		}
		constructor(t, r, n) {
			super(r, n), this.elementName = t;
		}
	};
	so = class {
		rootNodes;
		errors;
		constructor(e, t) {
			this.rootNodes = e, this.errors = t;
		}
	};
	Bi = class {
		getTagDefinition;
		constructor(e) {
			this.getTagDefinition = e;
		}
		parse(e, t, r, n = !1, i) {
			let s = (h) => (f, ...g) => h(f.toLowerCase(), ...g), a = n ? this.getTagDefinition : s(this.getTagDefinition), o = (h) => a(h).getContentType(), l = n ? i : s(i), c = Di(e, t, i ? (h, f, g, v) => {
				let W = l(h, f, g, v);
				return W !== void 0 ? W : o(h);
			} : o, r), u = r && r.canSelfClose || !1, d = r && r.allowHtmComponentClosingTags || !1, _ = new ao(c.tokens, a, u, d, n);
			return _.build(), new so(_.rootNodes, [...c.errors, ..._.errors]);
		}
	};
	ao = class qi {
		tokens;
		tagDefinitionResolver;
		canSelfClose;
		allowHtmComponentClosingTags;
		isTagNameCaseSensitive;
		_index = -1;
		_peek;
		_containerStack = [];
		rootNodes = [];
		errors = [];
		constructor(t, r, n, i, s) {
			this.tokens = t, this.tagDefinitionResolver = r, this.canSelfClose = n, this.allowHtmComponentClosingTags = i, this.isTagNameCaseSensitive = s, this._advance();
		}
		build() {
			for (; this._peek.type !== 43;) this._peek.type === 0 || this._peek.type === 4 ? this._consumeElementStartTag(this._advance()) : this._peek.type === 3 ? (this._closeVoidElement(), this._consumeElementEndTag(this._advance())) : this._peek.type === 13 ? (this._closeVoidElement(), this._consumeCdata(this._advance())) : this._peek.type === 10 ? (this._closeVoidElement(), this._consumeComment(this._advance())) : this._peek.type === 5 || this._peek.type === 7 || this._peek.type === 6 ? (this._closeVoidElement(), this._consumeText(this._advance())) : this._peek.type === 21 ? this._consumeExpansion(this._advance()) : this._peek.type === 26 ? (this._closeVoidElement(), this._consumeBlockOpen(this._advance())) : this._peek.type === 28 ? (this._closeVoidElement(), this._consumeBlockClose(this._advance())) : this._peek.type === 30 ? (this._closeVoidElement(), this._consumeIncompleteBlock(this._advance())) : this._peek.type === 31 ? (this._closeVoidElement(), this._consumeLet(this._advance())) : this._peek.type === 19 ? this._consumeDocType(this._advance()) : this._peek.type === 34 ? (this._closeVoidElement(), this._consumeIncompleteLet(this._advance())) : this._peek.type === 35 || this._peek.type === 39 ? this._consumeComponentStartTag(this._advance()) : this._peek.type === 38 ? this._consumeComponentEndTag(this._advance()) : this._advance();
			for (let t of this._containerStack) t instanceof ge && this.errors.push(x.create(t.name, t.sourceSpan, `Unclosed block "${t.name}"`));
		}
		_advance() {
			let t = this._peek;
			return this._index < this.tokens.length - 1 && this._index++, this._peek = this.tokens[this._index], t;
		}
		_advanceIf(t) {
			return this._peek.type === t ? this._advance() : null;
		}
		_consumeCdata(t) {
			let r = this._advance(), n = this._getText(r), i = this._advanceIf(14);
			this._addToParent(new Si(n, new p(t.sourceSpan.start, (i || r).sourceSpan.end), [r]));
		}
		_consumeComment(t) {
			let r = this._advanceIf(7), n = this._advanceIf(11), i = r != null ? r.parts[0].trim() : null, s = n == null ? t.sourceSpan : new p(t.sourceSpan.start, n.sourceSpan.end, t.sourceSpan.fullStart);
			this._addToParent(new wi(i, s));
		}
		_consumeDocType(t) {
			let r = this._advanceIf(7), n = this._advanceIf(20), i = r != null ? r.parts[0].trim() : null, s = new p(t.sourceSpan.start, (n || r || t).sourceSpan.end);
			this._addToParent(new Ti(i, s));
		}
		_consumeExpansion(t) {
			let r = this._advance(), n = this._advance(), i = [];
			for (; this._peek.type === 22;) {
				let a = this._parseExpansionCase();
				if (!a) return;
				i.push(a);
			}
			if (this._peek.type !== 25) {
				this.errors.push(x.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '}'."));
				return;
			}
			let s = new p(t.sourceSpan.start, this._peek.sourceSpan.end, t.sourceSpan.fullStart);
			this._addToParent(new vi(r.parts[0], n.parts[0], i, s, r.sourceSpan)), this._advance();
		}
		_parseExpansionCase() {
			let t = this._advance();
			if (this._peek.type !== 23) return this.errors.push(x.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '{'.")), null;
			let r = this._advance(), n = this._collectExpansionExpTokens(r);
			if (!n) return null;
			let i = this._advance();
			n.push({
				type: 43,
				parts: [],
				sourceSpan: i.sourceSpan
			});
			let s = new qi(n, this.tagDefinitionResolver, this.canSelfClose, this.allowHtmComponentClosingTags, this.isTagNameCaseSensitive);
			if (s.build(), s.errors.length > 0) return this.errors = this.errors.concat(s.errors), null;
			let a = new p(t.sourceSpan.start, i.sourceSpan.end, t.sourceSpan.fullStart), o = new p(r.sourceSpan.start, i.sourceSpan.end, r.sourceSpan.fullStart);
			return new Ci(t.parts[0], s.rootNodes, a, t.sourceSpan, o);
		}
		_collectExpansionExpTokens(t) {
			let r = [], n = [23];
			for (;;) {
				if ((this._peek.type === 21 || this._peek.type === 23) && n.push(this._peek.type), this._peek.type === 24) if (Ri(n, 23)) {
					if (n.pop(), n.length === 0) return r;
				} else return this.errors.push(x.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
				if (this._peek.type === 25) if (Ri(n, 21)) n.pop();
				else return this.errors.push(x.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
				if (this._peek.type === 43) return this.errors.push(x.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
				r.push(this._advance());
			}
		}
		_getText(t) {
			let r = t.parts[0];
			if (r.length > 0 && r[0] == `
`) {
				var n;
				let i = this._getClosestElementLikeParent();
				i != null && i.children.length == 0 && !((n = this._getTagDefinition(i)) === null || n === void 0) && n.ignoreFirstLf && (r = r.substring(1));
			}
			return r;
		}
		_consumeText(t) {
			let r = [t], n = t.sourceSpan, i = t.parts[0];
			if (i.length > 0 && i[0] === `
`) {
				var s;
				let a = this._getContainer();
				a != null && a.children.length === 0 && !((s = this._getTagDefinition(a)) === null || s === void 0) && s.ignoreFirstLf && (i = i.substring(1), r[0] = {
					type: t.type,
					sourceSpan: t.sourceSpan,
					parts: [i]
				});
			}
			for (; this._peek.type === 8 || this._peek.type === 5 || this._peek.type === 9;) t = this._advance(), r.push(t), t.type === 8 ? i += t.parts.join("").replace(/&([^;]+);/g, Oi) : t.type === 9 ? i += t.parts[0] : i += t.parts.join("");
			if (i.length > 0) {
				let a = t.sourceSpan;
				this._addToParent(new _i(i, new p(n.start, a.end, n.fullStart, n.details), r));
			}
		}
		_closeVoidElement() {
			var t;
			let r = this._getContainer();
			r !== null && !((t = this._getTagDefinition(r)) === null || t === void 0) && t.isVoid && this._containerStack.pop();
		}
		_consumeElementStartTag(t) {
			var r;
			let n = [], i = [], s = [];
			this._consumeAttributesAndDirectives(n, i, s);
			let a = this._getElementFullName(t, this._getClosestElementLikeParent()), o = this._getTagDefinition(a), l = !1;
			if (this._peek.type === 2) {
				this._advance(), l = !0;
				let v = this._getTagDefinition(a);
				this.canSelfClose || v?.canSelfClose || Pe(a) !== null || v?.isVoid || this.errors.push(x.create(a, t.sourceSpan, `Only void, custom and foreign elements can be self closed "${t.parts[1]}"`));
			} else this._peek.type === 1 && (this._advance(), l = !1);
			let c = this._peek.sourceSpan.fullStart, u = new p(t.sourceSpan.start, c, t.sourceSpan.fullStart), d = new p(t.sourceSpan.start, c, t.sourceSpan.fullStart), _ = new p(t.sourceSpan.start.moveBy(1), t.sourceSpan.end), h = new re(a, n, i, [], l, u, d, void 0, _, o?.isVoid ?? !1, void 0, s), f = this._getContainer(), g = f !== null && !!(!((r = this._getTagDefinition(f)) === null || r === void 0) && r.isClosedByChild(h.name));
			this._pushContainer(h, g), l ? this._popContainer(a, re, u) : t.type === 4 && (this._popContainer(a, re, null), this.errors.push(x.create(a, u, `Opening tag "${a}" not terminated.`)));
		}
		_consumeComponentStartTag(t) {
			var r;
			let n = t.parts[0], i = [], s = [], a = [];
			this._consumeAttributesAndDirectives(i, s, a);
			let o = this._getClosestElementLikeParent(), l = this._getComponentTagName(t, o), c = this._getComponentFullName(t, o), u = this._peek.type === 37;
			this._advance();
			let d = this._peek.sourceSpan.fullStart, _ = new p(t.sourceSpan.start, d, t.sourceSpan.fullStart), h = new U(n, l, c, i, s, [], u, _, new p(t.sourceSpan.start, d, t.sourceSpan.fullStart), void 0, void 0, a), f = this._getContainer(), g = f !== null && h.tagName !== null && !!(!((r = this._getTagDefinition(f)) === null || r === void 0) && r.isClosedByChild(h.tagName));
			this._pushContainer(h, g), u ? this._popContainer(c, U, _) : t.type === 39 && (this._popContainer(c, U, null), this.errors.push(x.create(c, _, `Opening tag "${c}" not terminated.`)));
		}
		_consumeAttributesAndDirectives(t, r, n) {
			for (; this._peek.type === 15 || this._peek.type === 40 || this._peek.type === 12;) if (this._peek.type === 40) r.push(this._consumeDirective(this._peek));
			else if (this._peek.type === 15) t.push(this._consumeAttr(this._advance()));
			else {
				let i = this._advance();
				n.push(new bi(i.parts[0], i.parts[1], i.sourceSpan));
			}
		}
		_consumeComponentEndTag(t) {
			let r = this._getComponentFullName(t, this._getClosestElementLikeParent());
			if (!this._popContainer(r, U, t.sourceSpan)) {
				let n = this._containerStack[this._containerStack.length - 1], i;
				n instanceof U && n.componentName === t.parts[0] ? i = `, did you mean "${n.fullName}"?` : i = ". It may happen when the tag has already been closed by another tag.";
				let s = `Unexpected closing tag "${r}"${i}`;
				this.errors.push(x.create(r, t.sourceSpan, s));
			}
		}
		_getTagDefinition(t) {
			return typeof t == "string" ? this.tagDefinitionResolver(t) : t instanceof re ? this.tagDefinitionResolver(t.name) : t instanceof U && t.tagName !== null ? this.tagDefinitionResolver(t.tagName) : null;
		}
		_pushContainer(t, r) {
			r && this._containerStack.pop(), this._addToParent(t), this._containerStack.push(t);
		}
		_consumeElementEndTag(t) {
			var r;
			let n = this.allowHtmComponentClosingTags && t.parts.length === 0 ? null : this._getElementFullName(t, this._getClosestElementLikeParent());
			if (n && !((r = this._getTagDefinition(n)) === null || r === void 0) && r.isVoid) this.errors.push(x.create(n, t.sourceSpan, `Void elements do not have end tags "${t.parts[1]}"`));
			else if (!this._popContainer(n, re, t.sourceSpan)) {
				let i = `Unexpected closing tag "${n}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
				this.errors.push(x.create(n, t.sourceSpan, i));
			}
		}
		_popContainer(t, r, n) {
			let i = !1;
			for (let a = this._containerStack.length - 1; a >= 0; a--) {
				var s;
				let o = this._containerStack[a], l = o instanceof U ? o.fullName : o.name;
				if (Pe(l) ? l === t : (l === t || t === null) && o instanceof r) return o.endSourceSpan = n, o.sourceSpan.end = n !== null ? n.end : o.sourceSpan.end, this._containerStack.splice(a, this._containerStack.length - a), !i;
				(o instanceof ge || !(!((s = this._getTagDefinition(o)) === null || s === void 0) && s.closedByParent)) && (i = !0);
			}
			return !1;
		}
		_consumeAttr(t) {
			let r = fe(t.parts[0], t.parts[1]), n = t.sourceSpan.end, i;
			this._peek.type === 16 && (i = this._advance());
			let s = "", a = [], o, l;
			if (this._peek.type === 17) for (o = this._peek.sourceSpan, l = this._peek.sourceSpan.end; this._peek.type === 17 || this._peek.type === 18 || this._peek.type === 9;) {
				let u = this._advance();
				a.push(u), u.type === 18 ? s += u.parts.join("").replace(/&([^;]+);/g, Oi) : u.type === 9 ? s += u.parts[0] : s += u.parts.join(""), l = n = u.sourceSpan.end;
			}
			this._peek.type === 16 && (l = n = this._advance().sourceSpan.end);
			let c = o && l && new p(i?.sourceSpan.start ?? o.start, l, i?.sourceSpan.fullStart ?? o.fullStart);
			return new ki(r, s, new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), t.sourceSpan, c, a.length > 0 ? a : void 0, void 0);
		}
		_consumeDirective(t) {
			let r = [], n = t.sourceSpan.end, i = null;
			if (this._advance(), this._peek.type === 41) {
				for (n = this._peek.sourceSpan.end, this._advance(); this._peek.type === 15;) r.push(this._consumeAttr(this._advance()));
				this._peek.type === 42 ? (i = this._peek.sourceSpan, this._advance()) : this.errors.push(x.create(null, t.sourceSpan, "Unterminated directive definition"));
			}
			let s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new p(s.start, i === null ? t.sourceSpan.end : i.end, s.fullStart);
			return new yi(t.parts[0], r, a, s, i);
		}
		_consumeBlockOpen(t) {
			let r = [];
			for (; this._peek.type === 29;) {
				let o = this._advance();
				r.push(new fr(o.parts[0], o.sourceSpan));
			}
			this._peek.type === 27 && this._advance();
			let n = this._peek.sourceSpan.fullStart, i = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new ge(t.parts[0], r, [], i, t.sourceSpan, s);
			this._pushContainer(a, !1);
		}
		_consumeBlockClose(t) {
			let r = this._containerStack.length, n = this._containerStack[r - 1];
			if (!this._popContainer(null, ge, t.sourceSpan)) {
				if (this._containerStack.length < r) {
					let i = n instanceof U ? n.fullName : n.name;
					this.errors.push(x.create(null, t.sourceSpan, `Unexpected closing block. The block may have been closed earlier. Did you forget to close the <${i}> element? If you meant to write the \`}\` character, you should use the "&#125;" HTML entity instead.`));
					return;
				}
				this.errors.push(x.create(null, t.sourceSpan, "Unexpected closing block. The block may have been closed earlier. If you meant to write the `}` character, you should use the \"&#125;\" HTML entity instead."));
			}
		}
		_consumeIncompleteBlock(t) {
			let r = [];
			for (; this._peek.type === 29;) {
				let o = this._advance();
				r.push(new fr(o.parts[0], o.sourceSpan));
			}
			let n = this._peek.sourceSpan.fullStart, i = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new ge(t.parts[0], r, [], i, t.sourceSpan, s);
			this._pushContainer(a, !1), this._popContainer(null, ge, null), this.errors.push(x.create(t.parts[0], i, `Incomplete block "${t.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`));
		}
		_consumeLet(t) {
			let r = t.parts[0], n, i;
			if (this._peek.type !== 32) {
				this.errors.push(x.create(t.parts[0], t.sourceSpan, `Invalid @let declaration "${r}". Declaration must have a value.`));
				return;
			} else n = this._advance();
			if (this._peek.type !== 33) {
				this.errors.push(x.create(t.parts[0], t.sourceSpan, `Unterminated @let declaration "${r}". Declaration must be terminated with a semicolon.`));
				return;
			} else i = this._advance();
			let s = i.sourceSpan.end, a = new p(t.sourceSpan.start, s, t.sourceSpan.fullStart), o = t.sourceSpan.toString().lastIndexOf(r), l = new p(t.sourceSpan.start.moveBy(o), t.sourceSpan.end), c = new dr(r, n.parts[0], a, l, n.sourceSpan);
			this._addToParent(c);
		}
		_consumeIncompleteLet(t) {
			let r = t.parts[0] ?? "", n = r ? ` "${r}"` : "";
			if (r.length > 0) {
				let i = t.sourceSpan.toString().lastIndexOf(r), s = new p(t.sourceSpan.start.moveBy(i), t.sourceSpan.end), a = new p(t.sourceSpan.start, t.sourceSpan.start.moveBy(0)), o = new dr(r, "", t.sourceSpan, s, a);
				this._addToParent(o);
			}
			this.errors.push(x.create(t.parts[0], t.sourceSpan, `Incomplete @let declaration${n}. @let declarations must be written as \`@let <name> = <value>;\``));
		}
		_getContainer() {
			return this._containerStack.length > 0 ? this._containerStack[this._containerStack.length - 1] : null;
		}
		_getClosestElementLikeParent() {
			for (let t = this._containerStack.length - 1; t > -1; t--) {
				let r = this._containerStack[t];
				if (r instanceof re || r instanceof U) return r;
			}
			return null;
		}
		_addToParent(t) {
			let r = this._getContainer();
			r === null ? this.rootNodes.push(t) : r.children.push(t);
		}
		_getElementFullName(t, r) {
			return fe(this._getPrefix(t, r), t.parts[1]);
		}
		_getComponentFullName(t, r) {
			let n = t.parts[0], i = this._getComponentTagName(t, r);
			return i === null ? n : i.startsWith(":") ? n + i : `${n}:${i}`;
		}
		_getComponentTagName(t, r) {
			let n = this._getPrefix(t, r), i = t.parts[2];
			return !n && !i ? null : !n && i ? i : fe(n, i || "ng-component");
		}
		_getPrefix(t, r) {
			var n;
			let i, s;
			if (t.type === 35 || t.type === 39 || t.type === 38 ? (i = t.parts[1], s = t.parts[2]) : (i = t.parts[0], s = t.parts[1]), i = i || ((n = this._getTagDefinition(s)) === null || n === void 0 ? void 0 : n.implicitNamespacePrefix) || "", !i && r) {
				let a = r instanceof re ? r.name : r.tagName;
				if (a !== null) {
					let o = Z(a)[1], l = this._getTagDefinition(o);
					l !== null && !l.preventNamespaceInheritance && (i = Pe(a));
				}
			}
			return i;
		}
	};
	Hi = class extends Bi {
		constructor() {
			super(Ne);
		}
		parse(e, t, r, n = !1, i) {
			return super.parse(e, t, r, n, i);
		}
	};
	oo = [
		co,
		uo,
		ho,
		fo,
		go,
		vo,
		_o,
		So,
		Co,
		mo
	];
	Fi = lo;
	Vi = {
		features: { experimental_frontMatterSupport: {
			massageAstNode: !0,
			embed: !0,
			print: !0
		} },
		preprocess: Fi,
		print: ko,
		insertPragma: ei,
		massageAstNode: or,
		embed: Gn,
		getVisitorKeys: Yn
	};
	Ui = [
		{
			name: "Angular",
			type: "markup",
			aceMode: "html",
			extensions: [".component.html"],
			tmScope: "text.html.basic",
			aliases: ["xhtml"],
			codemirrorMode: "htmlmixed",
			codemirrorMimeType: "text/html",
			parsers: ["angular"],
			vscodeLanguageIds: ["html"],
			filenames: [],
			linguistLanguageId: 146
		},
		{
			name: "HTML",
			type: "markup",
			aceMode: "html",
			extensions: [
				".html",
				".hta",
				".htm",
				".html.hl",
				".inc",
				".xht",
				".xhtml"
			],
			tmScope: "text.html.basic",
			aliases: ["xhtml"],
			codemirrorMode: "htmlmixed",
			codemirrorMimeType: "text/html",
			parsers: ["html"],
			vscodeLanguageIds: ["html"],
			linguistLanguageId: 146
		},
		{
			name: "Lightning Web Components",
			type: "markup",
			aceMode: "html",
			extensions: [],
			tmScope: "text.html.basic",
			aliases: ["LWC", "lwc"],
			codemirrorMode: "htmlmixed",
			codemirrorMimeType: "text/html",
			parsers: ["lwc"],
			vscodeLanguageIds: ["html"],
			filenames: [],
			linguistLanguageId: 146
		},
		{
			name: "MJML",
			type: "markup",
			aceMode: "html",
			extensions: [".mjml"],
			tmScope: "text.mjml.basic",
			aliases: ["MJML", "mjml"],
			codemirrorMode: "htmlmixed",
			codemirrorMimeType: "text/html",
			parsers: ["mjml"],
			filenames: [],
			vscodeLanguageIds: ["mjml"],
			linguistLanguageId: 146
		},
		{
			name: "Vue",
			type: "markup",
			aceMode: "vue",
			extensions: [".vue"],
			tmScope: "text.html.vue",
			codemirrorMode: "vue",
			codemirrorMimeType: "text/x-vue",
			parsers: ["vue"],
			vscodeLanguageIds: ["vue"],
			linguistLanguageId: 391
		}
	];
	br = {
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
	Wi = "HTML";
	zi = {
		bracketSameLine: br.bracketSameLine,
		htmlWhitespaceSensitivity: {
			category: Wi,
			type: "choice",
			default: "css",
			description: "How to handle whitespaces in HTML.",
			choices: [
				{
					value: "css",
					description: "Respect the default value of CSS display property."
				},
				{
					value: "strict",
					description: "Whitespaces are considered sensitive."
				},
				{
					value: "ignore",
					description: "Whitespaces are considered insensitive."
				}
			]
		},
		singleAttributePerLine: br.singleAttributePerLine,
		vueIndentScriptAndStyle: {
			category: Wi,
			type: "boolean",
			default: !1,
			description: "Indent script and style tags in Vue files."
		}
	};
	Pr = {};
	Ir(Pr, {
		angular: () => Wo,
		html: () => Fo,
		lwc: () => Go,
		mjml: () => Uo,
		vue: () => zo
	});
	Gi = To;
	yo = {
		canSelfClose: !0,
		normalizeTagName: !1,
		normalizeAttributeName: !1,
		allowHtmComponentClosingTags: !1,
		allowStartTagComments: !1,
		isTagNameCaseSensitive: !1,
		shouldParseFrontMatter: !0
	};
	qt = /* @__PURE__ */ new Map([
		["*", /* @__PURE__ */ new Set([
			"accesskey",
			"autocapitalize",
			"autocorrect",
			"autofocus",
			"class",
			"contenteditable",
			"dir",
			"draggable",
			"enterkeyhint",
			"exportparts",
			"hidden",
			"id",
			"inert",
			"inputmode",
			"is",
			"itemid",
			"itemprop",
			"itemref",
			"itemscope",
			"itemtype",
			"lang",
			"nonce",
			"part",
			"popover",
			"slot",
			"spellcheck",
			"style",
			"tabindex",
			"title",
			"translate",
			"writingsuggestions"
		])],
		["a", /* @__PURE__ */ new Set([
			"charset",
			"coords",
			"download",
			"href",
			"hreflang",
			"name",
			"ping",
			"referrerpolicy",
			"rel",
			"rev",
			"shape",
			"target",
			"type"
		])],
		["applet", /* @__PURE__ */ new Set([
			"align",
			"alt",
			"archive",
			"code",
			"codebase",
			"height",
			"hspace",
			"name",
			"object",
			"vspace",
			"width"
		])],
		["area", /* @__PURE__ */ new Set([
			"alt",
			"coords",
			"download",
			"href",
			"hreflang",
			"nohref",
			"ping",
			"referrerpolicy",
			"rel",
			"shape",
			"target",
			"type"
		])],
		["audio", /* @__PURE__ */ new Set([
			"autoplay",
			"controls",
			"crossorigin",
			"loop",
			"muted",
			"preload",
			"src"
		])],
		["base", /* @__PURE__ */ new Set(["href", "target"])],
		["basefont", /* @__PURE__ */ new Set([
			"color",
			"face",
			"size"
		])],
		["blockquote", /* @__PURE__ */ new Set(["cite"])],
		["body", /* @__PURE__ */ new Set([
			"alink",
			"background",
			"bgcolor",
			"link",
			"text",
			"vlink"
		])],
		["br", /* @__PURE__ */ new Set(["clear"])],
		["button", /* @__PURE__ */ new Set([
			"command",
			"commandfor",
			"disabled",
			"form",
			"formaction",
			"formenctype",
			"formmethod",
			"formnovalidate",
			"formtarget",
			"name",
			"popovertarget",
			"popovertargetaction",
			"type",
			"value"
		])],
		["canvas", /* @__PURE__ */ new Set(["height", "width"])],
		["caption", /* @__PURE__ */ new Set(["align"])],
		["col", /* @__PURE__ */ new Set([
			"align",
			"char",
			"charoff",
			"span",
			"valign",
			"width"
		])],
		["colgroup", /* @__PURE__ */ new Set([
			"align",
			"char",
			"charoff",
			"span",
			"valign",
			"width"
		])],
		["data", /* @__PURE__ */ new Set(["value"])],
		["del", /* @__PURE__ */ new Set(["cite", "datetime"])],
		["details", /* @__PURE__ */ new Set(["name", "open"])],
		["dialog", /* @__PURE__ */ new Set(["closedby", "open"])],
		["dir", /* @__PURE__ */ new Set(["compact"])],
		["div", /* @__PURE__ */ new Set(["align"])],
		["dl", /* @__PURE__ */ new Set(["compact"])],
		["embed", /* @__PURE__ */ new Set([
			"height",
			"src",
			"type",
			"width"
		])],
		["fieldset", /* @__PURE__ */ new Set([
			"disabled",
			"form",
			"name"
		])],
		["font", /* @__PURE__ */ new Set([
			"color",
			"face",
			"size"
		])],
		["form", /* @__PURE__ */ new Set([
			"accept",
			"accept-charset",
			"action",
			"autocomplete",
			"enctype",
			"method",
			"name",
			"novalidate",
			"target"
		])],
		["frame", /* @__PURE__ */ new Set([
			"frameborder",
			"longdesc",
			"marginheight",
			"marginwidth",
			"name",
			"noresize",
			"scrolling",
			"src"
		])],
		["frameset", /* @__PURE__ */ new Set(["cols", "rows"])],
		["h1", /* @__PURE__ */ new Set(["align"])],
		["h2", /* @__PURE__ */ new Set(["align"])],
		["h3", /* @__PURE__ */ new Set(["align"])],
		["h4", /* @__PURE__ */ new Set(["align"])],
		["h5", /* @__PURE__ */ new Set(["align"])],
		["h6", /* @__PURE__ */ new Set(["align"])],
		["head", /* @__PURE__ */ new Set(["profile"])],
		["hr", /* @__PURE__ */ new Set([
			"align",
			"noshade",
			"size",
			"width"
		])],
		["html", /* @__PURE__ */ new Set(["manifest", "version"])],
		["iframe", /* @__PURE__ */ new Set([
			"align",
			"allow",
			"allowfullscreen",
			"allowpaymentrequest",
			"allowusermedia",
			"frameborder",
			"height",
			"loading",
			"longdesc",
			"marginheight",
			"marginwidth",
			"name",
			"referrerpolicy",
			"sandbox",
			"scrolling",
			"src",
			"srcdoc",
			"width"
		])],
		["img", /* @__PURE__ */ new Set([
			"align",
			"alt",
			"border",
			"crossorigin",
			"decoding",
			"fetchpriority",
			"height",
			"hspace",
			"ismap",
			"loading",
			"longdesc",
			"name",
			"referrerpolicy",
			"sizes",
			"src",
			"srcset",
			"usemap",
			"vspace",
			"width"
		])],
		["input", /* @__PURE__ */ new Set([
			"accept",
			"align",
			"alpha",
			"alt",
			"autocomplete",
			"checked",
			"colorspace",
			"dirname",
			"disabled",
			"form",
			"formaction",
			"formenctype",
			"formmethod",
			"formnovalidate",
			"formtarget",
			"height",
			"ismap",
			"list",
			"max",
			"maxlength",
			"min",
			"minlength",
			"multiple",
			"name",
			"pattern",
			"placeholder",
			"popovertarget",
			"popovertargetaction",
			"readonly",
			"required",
			"size",
			"src",
			"step",
			"type",
			"usemap",
			"value",
			"width"
		])],
		["ins", /* @__PURE__ */ new Set(["cite", "datetime"])],
		["isindex", /* @__PURE__ */ new Set(["prompt"])],
		["label", /* @__PURE__ */ new Set(["for", "form"])],
		["legend", /* @__PURE__ */ new Set(["align"])],
		["li", /* @__PURE__ */ new Set(["type", "value"])],
		["link", /* @__PURE__ */ new Set([
			"as",
			"blocking",
			"charset",
			"color",
			"crossorigin",
			"disabled",
			"fetchpriority",
			"href",
			"hreflang",
			"imagesizes",
			"imagesrcset",
			"integrity",
			"media",
			"referrerpolicy",
			"rel",
			"rev",
			"sizes",
			"target",
			"type"
		])],
		["map", /* @__PURE__ */ new Set(["name"])],
		["menu", /* @__PURE__ */ new Set(["compact"])],
		["meta", /* @__PURE__ */ new Set([
			"charset",
			"content",
			"http-equiv",
			"media",
			"name",
			"scheme"
		])],
		["meter", /* @__PURE__ */ new Set([
			"high",
			"low",
			"max",
			"min",
			"optimum",
			"value"
		])],
		["object", /* @__PURE__ */ new Set([
			"align",
			"archive",
			"border",
			"classid",
			"codebase",
			"codetype",
			"data",
			"declare",
			"form",
			"height",
			"hspace",
			"name",
			"standby",
			"type",
			"typemustmatch",
			"usemap",
			"vspace",
			"width"
		])],
		["ol", /* @__PURE__ */ new Set([
			"compact",
			"reversed",
			"start",
			"type"
		])],
		["optgroup", /* @__PURE__ */ new Set(["disabled", "label"])],
		["option", /* @__PURE__ */ new Set([
			"disabled",
			"label",
			"selected",
			"value"
		])],
		["output", /* @__PURE__ */ new Set([
			"for",
			"form",
			"name"
		])],
		["p", /* @__PURE__ */ new Set(["align"])],
		["param", /* @__PURE__ */ new Set([
			"name",
			"type",
			"value",
			"valuetype"
		])],
		["pre", /* @__PURE__ */ new Set(["width"])],
		["progress", /* @__PURE__ */ new Set(["max", "value"])],
		["q", /* @__PURE__ */ new Set(["cite"])],
		["script", /* @__PURE__ */ new Set([
			"async",
			"blocking",
			"charset",
			"crossorigin",
			"defer",
			"fetchpriority",
			"integrity",
			"language",
			"nomodule",
			"referrerpolicy",
			"src",
			"type"
		])],
		["select", /* @__PURE__ */ new Set([
			"autocomplete",
			"disabled",
			"form",
			"multiple",
			"name",
			"required",
			"size"
		])],
		["slot", /* @__PURE__ */ new Set(["name"])],
		["source", /* @__PURE__ */ new Set([
			"height",
			"media",
			"sizes",
			"src",
			"srcset",
			"type",
			"width"
		])],
		["style", /* @__PURE__ */ new Set([
			"blocking",
			"media",
			"type"
		])],
		["table", /* @__PURE__ */ new Set([
			"align",
			"bgcolor",
			"border",
			"cellpadding",
			"cellspacing",
			"frame",
			"rules",
			"summary",
			"width"
		])],
		["tbody", /* @__PURE__ */ new Set([
			"align",
			"char",
			"charoff",
			"valign"
		])],
		["td", /* @__PURE__ */ new Set([
			"abbr",
			"align",
			"axis",
			"bgcolor",
			"char",
			"charoff",
			"colspan",
			"headers",
			"height",
			"nowrap",
			"rowspan",
			"scope",
			"valign",
			"width"
		])],
		["template", /* @__PURE__ */ new Set([
			"shadowrootclonable",
			"shadowrootcustomelementregistry",
			"shadowrootdelegatesfocus",
			"shadowrootmode",
			"shadowrootserializable"
		])],
		["textarea", /* @__PURE__ */ new Set([
			"autocomplete",
			"cols",
			"dirname",
			"disabled",
			"form",
			"maxlength",
			"minlength",
			"name",
			"placeholder",
			"readonly",
			"required",
			"rows",
			"wrap"
		])],
		["tfoot", /* @__PURE__ */ new Set([
			"align",
			"char",
			"charoff",
			"valign"
		])],
		["th", /* @__PURE__ */ new Set([
			"abbr",
			"align",
			"axis",
			"bgcolor",
			"char",
			"charoff",
			"colspan",
			"headers",
			"height",
			"nowrap",
			"rowspan",
			"scope",
			"valign",
			"width"
		])],
		["thead", /* @__PURE__ */ new Set([
			"align",
			"char",
			"charoff",
			"valign"
		])],
		["time", /* @__PURE__ */ new Set(["datetime"])],
		["tr", /* @__PURE__ */ new Set([
			"align",
			"bgcolor",
			"char",
			"charoff",
			"valign"
		])],
		["track", /* @__PURE__ */ new Set([
			"default",
			"kind",
			"label",
			"src",
			"srclang"
		])],
		["ul", /* @__PURE__ */ new Set(["compact", "type"])],
		["video", /* @__PURE__ */ new Set([
			"autoplay",
			"controls",
			"crossorigin",
			"height",
			"loop",
			"muted",
			"playsinline",
			"poster",
			"preload",
			"src",
			"width"
		])]
	]);
	$i = /* @__PURE__ */ new Set([
		"a",
		"abbr",
		"acronym",
		"address",
		"applet",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"base",
		"basefont",
		"bdi",
		"bdo",
		"bgsound",
		"big",
		"blink",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"center",
		"cite",
		"code",
		"col",
		"colgroup",
		"command",
		"content",
		"data",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"em",
		"embed",
		"fencedframe",
		"fieldset",
		"figcaption",
		"figure",
		"font",
		"footer",
		"form",
		"frame",
		"frameset",
		"geolocation",
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
		"i",
		"iframe",
		"image",
		"img",
		"input",
		"ins",
		"isindex",
		"kbd",
		"keygen",
		"label",
		"legend",
		"li",
		"link",
		"listing",
		"main",
		"map",
		"mark",
		"marquee",
		"math",
		"menu",
		"menuitem",
		"meta",
		"meter",
		"multicol",
		"nav",
		"nextid",
		"nobr",
		"noembed",
		"noframes",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"param",
		"picture",
		"plaintext",
		"pre",
		"progress",
		"q",
		"rb",
		"rbc",
		"rp",
		"rt",
		"rtc",
		"ruby",
		"s",
		"samp",
		"script",
		"search",
		"section",
		"select",
		"selectedcontent",
		"shadow",
		"slot",
		"small",
		"source",
		"spacer",
		"span",
		"strike",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"svg",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"title",
		"tr",
		"track",
		"tt",
		"u",
		"ul",
		"var",
		"video",
		"wbr",
		"xmp"
	]);
	Ht = {
		attrs: !0,
		children: !0,
		cases: !0,
		expression: !0
	};
	ji = /* @__PURE__ */ new Set(["parent"]);
	Me = class Me {
		constructor(t = {}) {
			Rr(this, ne);
			Wt(this, "kind");
			Wt(this, "parent");
			for (let r of /* @__PURE__ */ new Set([...ji, ...Object.keys(t)])) this.setProperty(r, t[r]);
			if (ae(t)) for (let r of Object.getOwnPropertySymbols(t)) this.setProperty(r, t[r]);
		}
		setProperty(t, r) {
			if (this[t] !== r) {
				if (t in Ht && (r = r.map((n) => this.createChild(n))), !ji.has(t)) {
					this[t] = r;
					return;
				}
				Object.defineProperty(this, t, {
					value: r,
					enumerable: !1,
					configurable: !0
				});
			}
		}
		map(t) {
			let r;
			for (let n in Ht) {
				let i = this[n];
				if (i) {
					let s = Eo(i, (a) => a.map(t));
					r !== i && (r ?? (r = new Me({ parent: this.parent })), r.setProperty(n, s));
				}
			}
			if (r) for (let n in this) n in Ht || (r[n] = this[n]);
			return t(r || this);
		}
		walk(t) {
			for (let r in Ht) {
				let n = this[r];
				if (n) for (let i = 0; i < n.length; i++) n[i].walk(t);
			}
			t(this);
		}
		createChild(t) {
			let r = t instanceof Me ? t.clone() : new Me(t);
			return r.setProperty("parent", this), r;
		}
		insertChildBefore(t, r) {
			let n = this.$children;
			n.splice(n.indexOf(t), 0, this.createChild(r));
		}
		removeChild(t) {
			let r = this.$children;
			r.splice(r.indexOf(t), 1);
		}
		replaceChild(t, r) {
			let n = this.$children;
			n[n.indexOf(t)] = this.createChild(r);
		}
		clone() {
			return new Me(this);
		}
		get $children() {
			return this[qe(this, ne, Tr)];
		}
		set $children(t) {
			this[qe(this, ne, Tr)] = t;
		}
		get firstChild() {
			return this.$children?.[0];
		}
		get lastChild() {
			return I(1, this.$children, -1);
		}
		get prev() {
			let t = qe(this, ne, yr);
			return t[t.indexOf(this) - 1];
		}
		get next() {
			let t = qe(this, ne, yr);
			return t[t.indexOf(this) + 1];
		}
		get rawName() {
			return this.hasExplicitNamespace ? this.fullName : this.name;
		}
		get fullName() {
			return this.namespace ? this.namespace + ":" + this.name : this.name;
		}
		get attrMap() {
			return Object.fromEntries(this.attrs.map((t) => [t.fullName, t.value]));
		}
	};
	ne = /* @__PURE__ */ new WeakSet(), Tr = function() {
		return this.kind === "angularIcuCase" ? "expression" : this.kind === "angularIcuExpression" ? "cases" : "children";
	}, yr = function() {
		return this.parent?.$children ?? [];
	};
	Ft = Me;
	xo = [
		{
			regex: /^(?<openingTagSuffix>\[if(?<condition>[^\]]*)\]>)(?<data>.*?)<!\s*\[endif\]$/s,
			parse: Lo
		},
		{
			regex: /^\[if(?<condition>[^\]]*)\]><!$/,
			parse: Ao
		},
		{
			regex: /^<!\s*\[endif\]$/,
			parse: Po
		}
	];
	Er = class extends gr {
		visitExpansionCase(t, r) {
			r.parseOptions.name === "angular" && this.visitChildren(r, (n) => {
				n(t.expression);
			});
		}
		visit(t, { parseOptions: r }) {
			Ro(t), Oo(t, r), Bo(t, r), Mo(t);
		}
	};
	Vt = Bt({
		name: "html",
		normalizeTagName: !0,
		normalizeAttributeName: !0,
		allowHtmComponentClosingTags: !0
	});
	Fo = st(Vt);
	Vo = /* @__PURE__ */ new Set(["mj-style", "mj-raw"]);
	Uo = st({
		...Vt,
		name: "mjml",
		shouldParseAsRawText: (e) => Vo.has(e)
	});
	Wo = st({
		name: "angular",
		tokenizeAngularBlocks: !0,
		tokenizeAngularLetDeclaration: !0,
		allowStartTagComments: !0
	});
	zo = st({
		name: "vue",
		isTagNameCaseSensitive: !0,
		shouldParseAsRawText(e, t, r, n) {
			return e.toLowerCase() !== "html" && !r && (e !== "template" || n.some(({ name: i, value: s }) => i === "lang" && s !== "html" && s !== "" && s !== void 0));
		}
	});
	Go = st({
		name: "lwc",
		canSelfClose: !1
	});
	$o = { html: Vi };
}))();
export { Zi as default, Ui as languages, zi as options, Pr as parsers, $o as printers };
