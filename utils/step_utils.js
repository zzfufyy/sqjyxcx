
// const { Completer } = require('./function_util');

// class StepContext {
//     constructor() {
//         this._stack = [];
//         this.data = {};
//     }

//     _enter(step) {
//         this._stack.push[step];
//         step._doRun(this);
//     }

//     current() {
//         return this._stack[this._stack.length - 1];
//     }

//     start(step) {
//         this._compl = new Completer();
//         this._enter(step);
//     }

//     _end() {
//         this._compl.resolve(this);
//     }
// }

// class Step {
//     constructor(run, next) {
//         this._run = run;
//         this._next = next;
//     }

//     constructor() { }

//     setRun(run) {
//         this._run = run;
//     }

//     setNext(next) {
//         this._next = next;
//     }

//     _doRun(context) {
//         this._run(context);
//         let next = this._next();
//         if (next) {
//             context._enter(next);
//         }
//         // 流程结束
//         else {
//             context._end();
//         }
//     }
// }

// module.exports = {
//     StepContext: StepContext,
//     Step: Step,
// }
