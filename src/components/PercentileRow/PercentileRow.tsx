import "@/App.css";
import { useMemo } from "react";
import { useMatrix } from "@/context/MatrixContext";
import { calcCol60Percentiles } from "@/utils/utils";

export const PercentileRow = () => {
  const { matrix } = useMatrix();

  const p60 = useMemo(() => calcCol60Percentiles(matrix), [matrix]);

  return (
    <div className="row percentile-row">
      {p60.map((v, i) => (
        <div key={i} className="cell percentile-cell" title="60th percentile">
          {Number.isInteger(v) ? v : v.toFixed(1)}
        </div>
      ))}
      <div className="cell sum-cell" title="(empty)">
        {/* последняя ячейка под колонку Sum — можно оставить пустой */}
      </div>
      <div className="remove-row-btn" />
    </div>
  );
};