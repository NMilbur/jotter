import "./index.css";
import { useEffect, useRef } from "react";

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener("message", (event) => {
          try {
            eval(event.data);
          } catch(err) {
            const root = document.querySelector("#root");
            root.innerHTML = "<div style='color: red;'><h4>Runtime error</h4>" + err + "</div>";
            throw err;
          }
        }, false);
      </script>
    </body>
  </html>
`;

interface PreviewProps {
  code: string;
}

const Preview = ({ code }: PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe title="preview" ref={iframeRef} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

export default Preview;
