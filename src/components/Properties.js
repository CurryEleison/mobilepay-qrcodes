import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Help from '@material-ui/icons/Help';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import InfoDialog from './InfoDialog';
import SettingsDialog from './SettingsDialog';



function Properties(props) {
    const {t, i18n} = useTranslation();
    
    const [infoOpen, setInfoOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleClickInfo = () => {
        setInfoOpen(true);
    };
    const closeInfo = () => {
        setInfoOpen(false);
    }

    const handleClickSettings = () => {
        setSettingsOpen(true);
    }
    const closeSettings = () => {
        setSettingsOpen(false);
    }
    const changeSettings = (newSettings) => {
        props.onChange(newSettings);
    }
    return (
     <div>
         <Tooltip title={t('properties_help_tooltip','Help & info')}>
            <IconButton onClick={handleClickInfo}>
                <Help /> 
            </IconButton>
         </Tooltip>
         <Tooltip title={t('propeties_settings_tooltip','Settings')}>
            <IconButton onClick={handleClickSettings}>
            <MoreVertIcon />
            </IconButton>
         </Tooltip>
         <InfoDialog
            open={infoOpen}
            onClose={closeInfo}
         />
         <SettingsDialog
            open={settingsOpen}
            settings={props.settings}
            storedSettings={props.storedSettings}
            onClose={closeSettings}
            onChange={changeSettings}
         />
    </div>   
    )
}


export default Properties;