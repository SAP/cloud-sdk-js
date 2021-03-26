## Why is moment imported differently?

When you see moment imports you see something like: `import moment from 'moment'`
and then when it is used: `moment.Moment`.

The reason for this is a missing `export as namespace moment` in the type definition of moment.
We opened an [issue](https://github.com/moment/moment/issues/5679) but until then we will use the other import.

Note that a "normal" import like `import {Moment} from 'moment'` works but eslint is complaining since Moment is not a named export.
Only the namespace is exported and not the individual entries due to the missing `export as namespace` as stated above.
