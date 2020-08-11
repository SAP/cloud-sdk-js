---
id: how-to-write-documentation
title: Documentation Guide Lines
hide_title: false
hide_table_of_contents: false
sidebar_label: Documentation How To
description: Writing is an art!
keywords:
- sap
- cloud
- sdk
image:
---
import useBaseUrl from '@docusaurus/useBaseUrl'

## Cloud SDK Documentation Guidelines ##
> If you can write code, you can write docs.

## Markdown hints ##
- Start your page with `H2` because `H1` is for `title` specified in the `meta-header`
- If you need `Tabs` or other custom react component hoist it to the top of the page after the `meta-header`
- I recommend creating snippets for your editor for most used components like: `meta-header`, `admonitions`, `tabs`, etc...
- Run docs locally to ensure your page looks nice, some design ideas in your head my looked different with additional context

## Take ownership ##
- If you see a typo - fix it and make a pull request
- If an action to update yours or someone's article takes less then 10-15 minutes - just do it.
- If smth can't be fixed by you - notify an author or respective team.


## General notes on Writing ##
People who do not write frequently often struggle with putting words to paper. It's normal. A mental-ease soon to come with practice.

### Basic recommendations about writing ###

#### Write as you speak ####
Imagine you're explaining what Cloud SDK does to your friend with enough tech background but without SAP context. Your
Mom would also work.

Many people think writing is different from speaking. Not that much. Speaking is a natural way to transfer information for
humans. Write as you're chatting to someone, answering questions, or asking questions to yourself. Then edit where
there's a lack of structure.

>Such texts are much easier to read and comprehend than those written in cumbersome and complicated way.

##### Examples of poor docsumentation #####
- [If you need an example of bad documentation check Odata Sepcification](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html )
- [On the other hand, their Getting Started guide is quite OK](https://www.odata.org/getting-started/basic-tutorial/ )

#### Use simple words ####
Don't try to over-smart yourself. Use the most frequent term for the notion. Check what others use if not sure. Be
consistent. Google a couple of options if in doubt. Be careful with acronyms, they are . Notice, `careful` is better then
`cautious`, because careful is higher frequency word for this context.

#### More active case ####
Documentation is written or someone writes it? Both. When it's you who's writing is, please, use active voice where
appropriate. Instead of **This feature was developed by us so that you are made happy** try to use smth like this **We
developed this feature to make you happy**. We naturally speak in an active voice. When appropriate passive voice if fine.

#### Use short sentences ####
Make sentences as long as needed, but as short as possible. If you have a second subordinate clause something is
definitely getting wrong.

#### Use examples ####
They are better than many abstract terms following each other. Our minds were not made for this kind of work in the
first place. A good example helps connecting dots between concepts and builds beautiful memory associations.

#### Build upon the context ####
The same as defining a function for a code reusability context allows us to re-use already introduced concepts. It makes
the explanation more concise, easy to read and allows for scalable writing. Make sure there's just enough context introduced
and provide links or reminders where it might be lacking.

#### Use spelling and grammar checking ####
Linting, code style, static types checking, typos. Writing is no different from coding here. I found 16 issues in this
document after checking it with free version of [Grammarly](https://www.grammarly.com/ ) .

#### "Steal" relentlessly ####
Think if someone has already documented what you now want to document. Use it as an example! Take parts of it if
relevant. Be mindful and check copywrites if copying too much. Bookmark a couple of favorite documentation web-sites
and visit them for inspiration. Think of Google Cloud SDK, Graph QL, React, etc...

#### Ask for review ####
Yeah. Pull requests a new way.

#### Avoid variant reading  ####
Make sure you'll be understood one way and the one way only. For example, try to understand and make a single
interpretation for [odata.type meta
field](http://docs.oasis-open.org/odata/odata-json-format/v4.01/odata-json-format-v4.01.html#sec_ControlInformationtypeodatatype
). Don't spend too much time on it...

#### MVP ####
Don't be hard on yourself. Make smth imperfect and improve with every versions. Any documentation is better than no
documentation. Use feedback to iterate. Involve collaborators. We're all not writers here.

#### Inverted Pyramid Style ####
Think a bit before getting to the text editor. Or start with an outline. Same as with structuring your class methods and
variables it makes eventual writing much simpler and often faster. Here's a method from a journalism world that enriches
the coding paradigm example I used before with valuable context. [It's called inverted pyramid and might be useful for
documentation, in the same way, it's useful for news.](https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism) )
<img alt="Inverted Pyramid of writing" src={useBaseUrl('img/docs/inverted-pyramid.png')} />;
