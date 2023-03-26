import "./index.css";
import { useEffect } from "react";

import CodeEditor from "_components/_molecules/CodeEditor";
import Preview from "_components/_molecules/Preview";
import Resizable from "_components/_atoms/Resizable";
import { Cell, completeBundle, startBundle, updateCell } from "_state";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "_hooks/useTypedSelector";
import bundler from "_helpers/bundler";
import { useCumulativeCode } from "_hooks/useCumulativeCode";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell: { content, id: cellId } }: CodeCellProps) => {
  const dispatch = useDispatch();
  const bundle = useTypedSelector((state) => state.bundles[cellId]);
  const cumulativeCode = useCumulativeCode(cellId);

  const createBundle = async (cellId: string, input: string) => {
    dispatch(startBundle({ cellId }));

    const result = await bundler(input);

    dispatch(
      completeBundle({
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      })
    );
  };

  useEffect(() => {
    if (!bundle) {
      createBundle(cellId, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cellId, cumulativeCode);
    }, 750);

    return () => clearTimeout(timer);
  }, [cumulativeCode, cellId]);

  return (
    <Resizable orientation="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
        <Resizable orientation="horizontal">
          <CodeEditor
            initialValue={content}
            onChange={(value) => dispatch(updateCell({ id: cellId, content: value }))}
          />
        </Resizable>

        <div className="preview-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
