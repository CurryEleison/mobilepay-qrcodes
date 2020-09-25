import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Properties from './Properties';
import Title from './Title';
import QrCodeForm from './QrCodeForm';
import Footer from './Footer';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		//        flexGrow: 1,
		// Highly annoying here. Not sure how that happened
		width: '98vw',
		[theme.breakpoints.up('md')]: { height: '100vh' },
	},
	propertiesfield: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	centeredField: {
		display: 'flex',
		justifyContent: 'center',
	},
	spacer: {
		[theme.breakpoints.down('md')]: { height: 0 },
		[theme.breakpoints.up('md')]: { height: '3rem' },
	},
}));

function Skeleton(props) {
	const classes = useStyles();
	// const isLargishScreen = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Grid
			container
			direction="column"
			justify="space-between"
			className={classes.root}
		>
			<Grid item className={classes.propertiesfield}>
				<Box>
					<Properties
						settings={props.settings}
						storedSettings={props.storedSettings}
						onChange={props.onSettingsChange}
					/>
				</Box>
			</Grid>
			<Grid item className={classes.centeredField}>
				<Title title={props.settings.title} />
			</Grid>
			<Grid item className={classes.centeredField}>
				<QrCodeForm acctno={props.settings.acctno} />
			</Grid>
			<Grid item>
				<div className={classes.spacer}></div>
			</Grid>
			<Grid item className={classes.centeredField}>
				<Footer />
			</Grid>
		</Grid>
	);
}

export default Skeleton;
