import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { RenameProjectDialog } from "./RenameProjectDialog";

export const ProjectOptions = () => {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOption, setDeleteDialogOption] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRenameDialogOpen = () => {
    handleClose();
    setRenameDialogOpen(true);
  };

  const handleDeleteDialogOpen = () => {
    handleClose();
    setDeleteDialogOption(true);
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRenameDialogOpen}>Rename</MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteDialogOpen}>Delete</MenuItem>
      </Menu>
      <RenameProjectDialog
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
      />
      <DeleteProjectDialog
        open={deleteDialogOption}
        setOpen={setDeleteDialogOption}
      />
    </>
  );
};
