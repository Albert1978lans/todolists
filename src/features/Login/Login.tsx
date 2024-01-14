import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {loginTC} from "./login-reducer";
import {Navigate} from "react-router-dom";




export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)



    const formik = useFormik({
        validate: values => {

            if (!values.email) {
                return {email: 'Required'}
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {email: 'Invalid email address'}
            }

            if (!values.password) {
                return {password: 'Required'}
            } else if (values.password.length > 20) {
                return {password: 'Must be 20 characters or less'}
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false

        },

        onSubmit: values => {
            dispatch(loginTC(values))
            console.log(values)
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