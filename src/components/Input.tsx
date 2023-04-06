import { Component, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export class Input extends Component<InputHTMLAttributes<HTMLInputElement>> {
  render() {
    return (
      <input
        className="border rounded-lg bg-slate-200 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
        {...this.props}
      />
    );
  }
}

export class TextArea extends Component<
  TextareaHTMLAttributes<HTMLTextAreaElement>
> {
  render() {
    return (
      <textarea
        className="border rounded-lg bg-slate-200 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
        {...this.props}
      />
    );
  }
}
