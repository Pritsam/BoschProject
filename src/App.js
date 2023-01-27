import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import { data } from "./data.json";
import "reactflow/dist/style.css";
//import Table from "react-bootstrap/Table";

const EventNodes = [];
const EventEdges = [];

data.forEach((event, index) => {
  let dateArray = event.When.split("/");
  let xAlign = dateArray[0] * 500 + dateArray[1] * 10;
  //console.log(dateArray[0],dateArray[1],xAlign)
  // console.log(dateArray[0]*200,dateArray[1])
  //console.log(xAlign, index * 180);
  let node = {
    id: event.Id,
    sourcePosition: "right",
    data: { label: event.What },
    draggable: false,
    style: {
      background: event.Id.includes("app") ? "cyan" : "lightgreen",
      width: 90,
      height: 40
    },

    position:
      event.Who === "applicant" ? { x: xAlign, y: 0 } : { x: xAlign, y: 180 }
  };
  if (index === 0) {
    node.type = "input";
  } else {
    node.targetPosition = "left";
  }
  EventNodes.push(node);

  if (index > 0) {
    let next = index + 1;
    let edge = {
      id: index + " to " + next,
      source: event.DependsOn,
      target: event.Id,
      type: "smoothstep",
      animated: true
    };
    EventEdges.push(edge);
  }
});

const HorizontalFlow = () => {
  const [nodes, _, onNodesChange] = useNodesState(EventNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(EventEdges);

  const [node, setNode] = useState([]);
  const [edge, setEdge] = useState([]);

  useEffect(() => {
    setNode(EventNodes);
    setEdge(EventEdges);

    // console.log(EventNodes);
    // console.log(nodes);
    // console.log(EventEdges);
    // console.log(edges);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <ReactFlow
      nodes={node}
      edges={edge}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="bottom-left"
    ></ReactFlow>
  );
};

export default HorizontalFlow;
