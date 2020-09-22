import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function InfoDialog(props) {
    const [open, setOpen] = useState(props.open);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);


    const closeInfo = () => {
        setOpen(false);
        props.onClose();
    }
    return (
        <Dialog
        fullScreen={fullScreen}
        maxwidth="sm"
        open={open}
        onClose={closeInfo}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"Help & Info"}</DialogTitle>
        <DialogContent>
            <ul>
                <li><a href="#usage">Using the QR Code generator</a></li>
                <li><a href="#privacy">Privacy statement</a></li>
                <li><a href="#credits">Credits</a></li>
            </ul>
        
        <h4 id="usage">Using the QR Code Generator</h4>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus mauris a diam maecenas sed enim. Sit amet commodo nulla facilisi nullam vehicula. Purus in mollis nunc sed id semper risus. Venenatis urna cursus eget nunc scelerisque. Neque egestas congue quisque egestas diam. Interdum velit euismod in pellentesque massa placerat duis ultricies lacus. Mattis enim ut tellus elementum sagittis. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Et malesuada fames ac turpis egestas integer.
        </p>
        Lacus vel facilisis volutpat est velit. Nisi porta lorem mollis aliquam ut porttitor leo. Turpis egestas maecenas pharetra convallis posuere morbi. Elementum eu facilisis sed odio morbi quis commodo odio. Ac felis donec et odio pellentesque diam volutpat commodo. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Pharetra convallis posuere morbi leo urna. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Sit amet cursus sit amet dictum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Velit sed ullamcorper morbi tincidunt. Fusce ut placerat orci nulla. Cras tincidunt lobortis feugiat vivamus at augue.
        <h4 id="privacy">Privacy statement</h4>
        Sed ullamcorper morbi tincidunt ornare massa eget. Dapibus ultrices in iaculis nunc sed. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Nunc id cursus metus aliquam eleifend mi in. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Feugiat in fermentum posuere urna nec tincidunt. Quis eleifend quam adipiscing vitae proin. Nunc mi ipsum faucibus vitae. Tortor at risus viverra adipiscing at in. Feugiat nibh sed pulvinar proin gravida. Massa tincidunt dui ut ornare lectus sit amet est placerat. At consectetur lorem donec massa sapien faucibus et molestie. Aliquet lectus proin nibh nisl condimentum id venenatis. Ante metus dictum at tempor commodo ullamcorper a lacus. Imperdiet sed euismod nisi porta lorem mollis aliquam. Tellus cras adipiscing enim eu.

        Adipiscing enim eu turpis egestas pretium aenean pharetra. Elementum facilisis leo vel fringilla est. Tellus orci ac auctor augue mauris augue neque. Nascetur ridiculus mus mauris vitae. Pellentesque elit ullamcorper dignissim cras tincidunt. Morbi non arcu risus quis varius quam quisque id. Nulla pellentesque dignissim enim sit amet venenatis. Nulla pharetra diam sit amet nisl suscipit adipiscing. Ornare suspendisse sed nisi lacus sed viverra tellus in. Diam maecenas ultricies mi eget mauris pharetra et. Nec ultrices dui sapien eget mi proin sed. Ut etiam sit amet nisl purus. Risus commodo viverra maecenas accumsan lacus. Ac auctor augue mauris augue neque. At volutpat diam ut venenatis tellus in metus vulputate.
        <h4 id="credits">Credits</h4>
        Augue eget arcu dictum varius duis at. Urna condimentum mattis pellentesque id nibh tortor. Malesuada fames ac turpis egestas. Felis donec et odio pellentesque diam volutpat commodo sed. At in tellus integer feugiat scelerisque varius morbi. Non tellus orci ac auctor augue mauris augue neque gravida. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Eget mi proin sed libero enim sed faucibus. Nunc scelerisque viverra mauris in aliquam sem fringilla. Libero volutpat sed cras ornare arcu. Sem et tortor consequat id. Enim nulla aliquet porttitor lacus luctus. Lacinia at quis risus sed vulputate odio ut enim. At risus viverra adipiscing at in tellus integer. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Non odio euismod lacinia at quis risus. Lacus viverra vitae congue eu.
        </DialogContent>
        <DialogActions>
            <Button onClick={closeInfo} color="primary">Done</Button>
        </DialogActions>
        </Dialog>
    )
}

export default InfoDialog;
