import React from "react";
import { Paper, Typography } from '@mui/material';

interface JsonComparisonProps {
  jsons: Record<string, any>[];
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
            width: "400px",
            overflowX: "auto",
            scrollbarWidth: "thin",
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
        <Paper key={index} style={{ margin: "10px", padding: "10px" }}>
          <Typography variant="h6">JSON {index + 1}</Typography>
          {renderJsonWithHighlights(json, index === 0)}
        </Paper>
      ))}
    </div>
  );
};

export default JsonComparison;