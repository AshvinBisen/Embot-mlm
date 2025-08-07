import React, { useRef, useState, useEffect, useCallback } from 'react';
import Tree from 'react-d3-tree';
import teamTreeData from "../Components/Data/teamTreeData";

const TeamTreeView = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const treeContainer = useRef(null);

  // Center tree on load
  useEffect(() => {
    const dimensions = treeContainer.current.getBoundingClientRect();
    setTranslate({ x: dimensions.width / 2, y: 100 });
  }, []);

  // Custom styled node
  const renderNodeWithCustomStyles = useCallback(({ nodeDatum, toggleNode }) => {
    return (
      <g onClick={toggleNode}>
        {/* Main node circle */}
        <circle r={20} fill="#2298D3" stroke="#fff" strokeWidth={2} />

        {/* Small top circle */}
        <path
          d={`
          M 0 0
          a 15.5 15 0 1 1 30 0
          z
        `}
          fill="#10B981"
          transform="translate(-7, -28) rotate(15)"
          stroke="none"
           
          
        />

        {/* Eyes */}
        <circle cx={5} cy={-33} r={2} fill="#ffffff" stroke='none' />
        <circle cx={15} cy={-30} r={2} fill="#ffffff" stroke='none' />

        {/* Name */}
        <text
          x={30}
          dy="-10"
          fontSize={14}
          fontWeight="bold"
          textAnchor="start"
          fill="#05CE99"
          stroke="#0000000"
          strokeWidth={0.75}
          paintOrder="stroke"
        >
          {nodeDatum.name}
        </text>

        {/* Attributes */}
        {nodeDatum.attributes && (
          <>
            <text
              x={30}
              dy="5"
              fontSize={12}
              fill="#cbd5e1"
              stroke="#000"
              strokeWidth={0.5}
              paintOrder="stroke"
            >
              Level: {nodeDatum.attributes.level}
            </text>
            <text
              x={30}
              dy="20"
              fontSize={12}
              fill="#cbd5e1"
              stroke="#000"
              strokeWidth={0.5}
              paintOrder="stroke"
            >
              Rewards: {nodeDatum.attributes.rewards}
            </text>
            <text
              x={30}
              dy="35"
              fontSize={12}
              fill="#cbd5e1"
              stroke="#000"
              strokeWidth={0.5}
              paintOrder="stroke"
            >
              Bonus: {nodeDatum.attributes.bonus}
            </text>
          </>
        )}
      </g>
    );
  }, []);



  return (
    <div
      ref={treeContainer}
      className=' '
      style={{
        width: '100%',
        height: '90vh',

        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="text-xs absolute left-0 top-0   rounded-xl   text-white shadow-lg w-fit space-y-1">
        <p className="font-bold text-sm text-primary mb-1">  Manual</p>
        <p><span className="text-green-300">  Click node</span> → Expand / Collapse team</p>
        <p><span className="text-blue-300">  Scroll</span> → Zoom in / out</p>
        <p><span className="text-pink-300">  Drag background</span> → Pan around</p>
      </div>

      <Tree
        data={teamTreeData}
        translate={translate}
        orientation="vertical"
        pathFunc="diagonal"
        collapsible={true}
        zoomable={true}
        draggable={true}
        renderCustomNodeElement={renderNodeWithCustomStyles}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        enableLegacyTransitions={true}
        shouldCollapseNeighborNodes={true}
        dimensions={treeContainer.current?.getBoundingClientRect()}
        pathClassFunc={() => 'custom-link-path'} // 👈 Add this line
      />

    </div>
  );
};

export default TeamTreeView;
