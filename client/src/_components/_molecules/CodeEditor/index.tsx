import "./index.css";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

// TODO: Add toggle for dark or light mode

interface CodeEditorProps {
  initialValue: string;
  onChange: (input: string) => void;
}

const CodeEditor = ({ initialValue = "// Hello and Welcome!", onChange }: CodeEditorProps) => {
  const ref = useRef<editor.IStandaloneCodeEditor>();

  const onEditorDidMount: EditorDidMount = (getValue, editor) => {
    ref.current = editor;

    editor.onDidChangeModelContent(() => onChange(getValue()));

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    if (!ref.current) return;

    const unformatted = ref.current.getModel()!.getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
      })
      .replace(/\n$/, "");

    ref.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>
        Format
      </button>

      <MonacoEditor
        value={initialValue}
        language="javascript"
        height="500px"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        editorDidMount={onEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
