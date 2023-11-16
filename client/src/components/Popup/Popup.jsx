import React from 'react'
import { Dialog,DialogTitle,DialogContent } from '@mui/material';

const Popup = (props) => {
    const {title,children,openPopup,setOpenPopup} = props;
  return (
    <Dialog open={openPopup}>
        <DialogTitle>
            <div>Title goes here</div>
        </DialogTitle>
        <DialogContent>
            <div>Content goes here</div>
        </DialogContent>
    </Dialog>
  )
}

export default Popup