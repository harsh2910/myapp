import React from "react";

interface JsonComparisonProps {
  jsons: Record<string, any>[]; // Array of JSON objects
}

const JsonComparison: React.FC<JsonComparisonProps> = ({ jsons }) => {
  if (jsons.length === 0) return null;

  const baseColor = "#DFF0D8"; // Light green for JSON A
  const compareColor = "#D9EDF7"; // Light blue for other JSONs
  const baseTextColor = "#3C763D"; // Dark green text for JSON A
  const compareTextColor = "#31708F"; // Dark blue text for other JSONs

  const renderJsonWithHighlights = (
    json: Record<string, any>,
    isBase: boolean
  ) => {
    return (
      <pre>
        {Object.entries(json).map(([key, value]) => {
          let style = {
            backgroundColor: "transparent",
            color: "inherit",
            padding: "5px",
            margin: "2px 0",
            width: "800px",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          };

          if (isBase) {
            style.backgroundColor = baseColor;
            style.color = baseTextColor;
          } else if (jsons[0].hasOwnProperty(key)) {
            const baseValue = jsons[0][key];
            if (baseValue === value) {
              style.backgroundColor = baseColor;
              style.color = baseTextColor;
            } else {
              style.backgroundColor = compareColor;
              style.color = compareTextColor;
            }
          }

          return (
            <div key={key} style={style as any}>
              <strong>{key}</strong>: {JSON.stringify(value, null, 2)}
            </div>
          );
        })}
      </pre>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        overflowX: "scroll",
      }}
    >
      {jsons.map((json, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <h3>JSON {index + 1}</h3>
          {renderJsonWithHighlights(json, index === 0)}
        </div>
      ))}
    </div>
  );
};

export default JsonComparison;
