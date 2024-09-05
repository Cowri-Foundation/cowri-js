  ****KOWRI.JS DESIGN DECISIONS****



**PROGRAM DESIGN AND DATA STRUCTURE:** This is a Vanilla JavaScript implementation of the Cowri Blockchain.

"Any application that can be written in JavaScript, will eventually be written in JavaScript." - Jeff Atwood.

Kowri was created to be a thin-client blockchain, that would operate in browsers and IOT devices with little computing power. Hence the need to build the first iteration using JavaScript. Other implementaions of the Cowri blockchain will follow in Golang, Python and Rust.

Beacuse JavaScript is a dynamic language with no type safety, we had to choose a design that would reduce bugs and promote clean design, clarity, conciseness and code correctness. The best way we can think of achieving this is to 'mostly' use a functional programming style, and diallow the uses of certain javascript keywords like: 'Class', 'this', 'let', 'for', 'while' and 'do while', 'bind' and 'call.

The program's data structure is comprised of function-returned objects, which are strictly separated from functions. In essence, there are no methods tied to any data. In Cowri JS, data must be explicitly passed to functions before they can be transformed, to avoid side effects and any unwanted behaviours.

For code organization, data and the related functions that operate on them are stored under a single 'umbrella' object or module.

