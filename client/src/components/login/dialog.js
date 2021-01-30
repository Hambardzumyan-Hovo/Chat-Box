import React, { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export default function AlertDialogSlide({ body, open, setOpen, setHasAccount }) {
  const handleClose = () => {
    setOpen(false);
    setHasAccount(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogContent>{body} </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
