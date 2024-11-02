// components/TableActions.tsx
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { ExportIcon, UploadIcon } from "../Icon"; // Ensure these icons are available
import { Button } from "antd";

interface TableActionsProps {
  onUploadClick: () => void;
  onExportClick: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  onUploadClick,
  onExportClick,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button type="primary" icon={<FaPlusCircle />} onClick={onUploadClick}>
        Upload
      </Button>
      <Button icon={<ExportIcon />} onClick={onExportClick}>
        Export
      </Button>
    </div>
  );
};

export default TableActions;
