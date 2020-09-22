import React from 'react';
import Typography from '@material-ui/core/Typography';


function Title(props) {

    return (
        <Typography variant="h2" component="h1" >{props.title}</Typography>
    )
};

export default Title;
