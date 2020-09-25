import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Flags from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';

import debouncedInput from './debouncedInput';
import { cleanAndValidateMobilePay } from '../modules/validations';
import { NumberFormatDkPhone } from './NumberFormatCustom';

const DebouncedTextField = debouncedInput(TextField, { timeout: 500 });

const useStyles = makeStyles((theme) => ({
	flag: {
		height: '1rem',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: '15rem',
	},
	inputTextSize: {
		fontSize: theme.typography.h5.fontSize,
	},
}));

function SettingsDialog(props) {
	const { t } = useTranslation();
	const theme = useTheme();
	const classes = useStyles();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [open, setOpen] = useState(props.open);
	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	const closeInfo = () => {
		setOpen(false);
		props.onClose();
	};

	const [acctno, setAcctno] = useState(props.storedSettings.acctno || '');
	const [acctnoHelp, setAcctnoHelp] = useState({
		error: false,
		helperText: '',
	});

	const [title, setTitle] = useState(props.storedSettings.title || '');
	const [language, setLanguage] = useState(props.storedSettings.language || '');
	const [palette, setPalette] = useState(props.storedSettings.palette || '');

	const handleAcctNoChange = (newVal) => {
		setAcctno(newVal);
		const status = cleanAndValidateMobilePay(t, newVal);
		const iserror =
			!!status.validationError && status.validationError !== 'BLANK';
		setAcctnoHelp({ error: iserror, helperText: status.validationError });
		if (!iserror) {
			props.onChange({
				...props.storedSettings,
				acctno: newVal,
			});
		}
	};

	const handleTitleChange = (newTitle) => {
		setTitle(newTitle);
		props.onChange({
			...props.storedSettings,
			title: newTitle,
		});
	};

	const handleLanguageChange = (newLanguage) => {
		setLanguage(newLanguage);
		props.onChange({
			...props.storedSettings,
			language: newLanguage,
		});
	};
	const handlePaletteChange = (newPalette) => {
		setPalette(newPalette);
		props.onChange({
			...props.storedSettings,
			palette: newPalette === 'auto' ? '' : newPalette,
		});
	};

	return (
		<Dialog
			fullScreen={fullScreen}
			maxwidth="sm"
			open={open}
			onClose={closeInfo}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">
				{t('settings_title', 'Setup')}
			</DialogTitle>
			<DialogContent>
				<FormControl className={classes.formControl}>
					<DebouncedTextField
						id="settings-acctno"
						value={acctno}
						name="acctno"
						label={t('settings_mobilepay_label', 'MobilePay Number')}
						onChange={(e) => {
							handleAcctNoChange(e.target.value);
						}}
						{...acctnoHelp}
						InputProps={{
							inputComponent: NumberFormatDkPhone,
							classes: {
								input: classes.inputTextSize,
							},
						}}
					/>
				</FormControl>
				<FormControl className={classes.formControl}>
					<TextField
						value={title}
						label={t('settings_headline_label', 'Headline')}
						onChange={(e) => {
							handleTitleChange(e.target.value);
						}}
						InputProps={{
							classes: {
								input: classes.inputTextSize,
							},
						}}
					/>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="settings_language_label">
						{t('settings_langugage_label', 'Language')}
					</InputLabel>
					<Select
						id="settings_language"
						labelId="settings_language_label"
						value={language}
						style={{ width: '12em' }}
						onChange={(e) => {
							handleLanguageChange(e.target.value);
						}}
						className={classes.inputTextSize}
					>
						<MenuItem value="da">
							<IconButton size="small">
								<Flags.DK className={classes.flag} />
							</IconButton>{' '}
							{t('languagename_da', 'Dansk')}
						</MenuItem>
						<MenuItem value="en">
							<IconButton size="small">
								<Flags.GB className={classes.flag} />
							</IconButton>{' '}
							{t('languagename_en', 'English')}
						</MenuItem>
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="settings_palette_label">
						{t('settings_palette_label', 'Dark mode')}
					</InputLabel>
					<Select
						id="settings_palette"
						labelId="settings_palette_label"
						value={palette}
						style={{ width: '12em' }}
						onChange={(e) => {
							handlePaletteChange(e.target.value);
						}}
						className={classes.inputTextSize}
					>
						<MenuItem value="auto">
							{t('settings_pallete_auto', 'Auto')}
						</MenuItem>
						<MenuItem value="light">
							{t('settings_pallete_light', 'Light')}
						</MenuItem>
						<MenuItem value="dark">
							{t('settings_pallete_dark', 'Dark')}
						</MenuItem>
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeInfo}>{t('settings_close', 'Done')}</Button>
			</DialogActions>
		</Dialog>
	);
}

export default SettingsDialog;
