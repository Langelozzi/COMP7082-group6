import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function TreeNode({ node, addToInstructions = () => { }, level = 0 }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  if (!node) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToInstructions({
      node_query: `nq_${node.id}`,
      output: { location: `l${level}`, key: node.tag_type || `k_${node.id}` },
      flags: {},
      _preview: { id: node.id, tag_type: node.tag_type, raw: node.raw, level },
    });
  };

  return (
    <div className="my-3">
      <div
        className="flex flex-col px-6 py-4 rounded-lg shadow-md w-full cursor-pointer transition-colors"
        style={{
          marginLeft: `${level * 40}px`,
          width: `calc(100% - ${level * 40}px)`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center w-full">
          <span
            style={{
              fontFamily: "monospace",
              color: theme.palette.primary.main,
              fontSize: "1.05rem",
            }}
          >
            &lt;{node.tag_type}&gt;
          </span>

          <span
            className="ml-4 text-base truncate"
            style={{ color: theme.palette.text.secondary }}
          >
            {node.raw}
          </span>

          <div className="ml-auto flex items-center space-x-2">
            <IconButton
              size="small"
              onClick={handleAdd}
              onMouseDown={(e) => e.stopPropagation()}
              sx={{
                color: theme.palette.success.main,
                "&:hover": {
                  color: theme.palette.success.light,
                  transform: "scale(1.1)",
                },
                transition: "all 0.15s ease",
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  color: theme.palette.primary.light,
                  transform: "scale(1.1)",
                },
                transition: "all 0.15s ease",
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>
        </div>


        {expanded && (
          <div className="mt-3 pl-2 text-sm space-y-2">
            {node.hasData && node.body && (
              <div>
                <span style={{ fontWeight: 600, color: theme.palette.primary.light }}>
                  Body:
                </span>{" "}
                <span style={{ color: theme.palette.text.secondary }}>{node.body}</span>
              </div>
            )}

            {Object.keys(node.htmlAttributes || {}).length > 0 && (
              <div>
                <span style={{ fontWeight: 600, color: theme.palette.primary.light }}>
                  Attributes:
                </span>
                <ul className="list-disc list-inside ml-4">
                  {Object.entries(node.htmlAttributes).map(([k, v]) => (
                    <li key={k}>
                      <span style={{ color: theme.palette.primary.main }}>{k}</span>: {v}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {node.retrieval_instructions?.length > 0 && (
              <div>
                <span style={{ fontWeight: 600, color: theme.palette.primary.light }}>
                  Retrieval:
                </span>
                <ul className="list-disc list-inside ml-4">
                  {node.retrieval_instructions.map((inst, i) => (
                    <li key={i}>{inst.action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {node.children?.length > 0 && (
        <div className="mt-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              addToInstructions={addToInstructions}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
