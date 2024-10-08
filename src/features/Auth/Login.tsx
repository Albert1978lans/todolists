import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {FormikHelpers, useFormik} from "formik";
import {useAppSelector} from "../TodolistsList/hooks";
import {loginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}


export const Login = () => {

    console.log('Login')

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }



    const formik = useFormik({
        validate: values => {

            // if (!values.email) {
            //     return {email: 'Required'}
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     return {email: 'Invalid email address'}
            // }

            if (!values.password) {
                return {password: 'Required'}
            } else if (values.password.length > 20) {
                return {password: 'Must be 20 characters or less'}
            }

            // const errors: FormikErrorType = {}
            // if (!values.email) {
            //     errors.email = 'Required'
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     errors.email = 'Invalid email address'
            // }
            // return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false

        },

        onSubmit: async (values :FormValuesType , formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await (dispatch(loginTC(values)))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate replace to="/" />
    }

    return (
        <Grid container={true} justifyContent={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label='Email'
                                margin='normal'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField
                                type={"password"}
                                label='Password'
                                margin='normal'
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                    checked={formik.values.rememberMe}
                                />}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}