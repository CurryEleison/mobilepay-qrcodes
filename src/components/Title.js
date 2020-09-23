import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';


function Title(props) {

    const { t } = useTranslation();

    return (
        <Typography variant="h2" component="h1" >{props.title || t('defaulttitle')}</Typography>
    )
};

export default Title;
