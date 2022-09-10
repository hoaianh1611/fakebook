import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import useAuth from "../../hooks/useAuth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

function CommentCard({ comment, postId }) {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const userId = user?._id;
  const dispatch = useDispatch();
  const deleteCmt = () => {
    dispatch(deleteComment({ commentId: comment?._id, postId: comment?.post }));
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
      {userId === comment.author._id && (
        <IconButton
          onClick={() => {
            setOpenDialog(true);
          }}
          sx={{ color: "primary.main" }}>
          <DeleteIcon sx={{ fontSize: 20 }} />
        </IconButton>
      )}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
              deleteCmt();
            }}
            autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default CommentCard;
