import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
		/>
	);
}

function NumberFormatDkPhone(props) {
	return <NumberFormatCustom {...props} format="## ## ## ##" />;
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export { NumberFormatCustom as default, NumberFormatDkPhone };
