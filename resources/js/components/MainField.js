import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, FormGroup, FormControlLabel, useTheme } from '@mui/material';
import useForm from './Form';
import _ from 'lodash';

const MainField = ({
    readOnly = false,
    name = '',
    onChange = () => { },
    placeholder,
    ...props
}) => {
    const formik = useForm();
    const theme = useTheme();

    const [currentValue, setCurrentValue] = useState(formik ? _.get(formik.values, name) : '');
    const ifCheckbox = props.type && props.type === "checkbox" ? true : false;
    const handleChange = (e) => {
        setCurrentValue(ifCheckbox ? e.target.checked : e.target.value);
        onChange(ifCheckbox ? e.target.checked : e.target.value);
        if (formik) {
            ifCheckbox ? formik.setFieldValue(name, e.target.checked) : formik.setFieldValue(name, e.target.value)
        }
    }

    if (ifCheckbox) {
        return (
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox
                        checked={currentValue}
                        id={name}
                        name={name}
                        error={formik ?
                            Boolean(_.get(formik.errors, name))
                            : false}
                        helperText={formik ?
                            _.get(formik.errors, name)
                            : null}
                        onChange={handleChange}
                        {...props}
                    />
                } label={props.label ? props.label : ""} />
            </FormGroup>
        )
    }
    else {
        return (
            <TextField
                variant='standard'
                value={props.value ? props.value : formik ? _.get(formik.values, name) : currentValue}
                autoComplete="new-password"
                inputProps={{
                    readOnly: readOnly,
                    placeholder: placeholder
                }}
                id={name}
                name={name}
                error={formik ?
                    formik.validateOnChange ?
                        _.get(formik.touched, name) && Boolean(_.get(formik.errors, name))
                        :
                        Boolean(_.get(formik.errors, name))
                    : false}
                helperText={formik ?
                    formik.validateOnChange ?
                        _.get(formik.touched, name) && _.get(formik.errors, name)
                        :
                        _.get(formik.errors, name)
                    : null}
                onChange={handleChange}
                {...props}
                sx={{
                    '& .MuiFormLabel-asterisk': { color: theme.palette.error.main },
                    ...props.sx
                }}
            />
        )
    }


}

export default MainField;