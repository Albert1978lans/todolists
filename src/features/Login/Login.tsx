

import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";


export const Login = () => {
    return (
    <Grid container={true} justifyContent={'center'}>
        <Grid item xs={4}>
            <FormControl>
                <FormLabel title={'dfdff'}/>
                <FormGroup>
                    <TextField
                        label='Email'
                        margin='normal'
                    />
                    <TextField
                        label='Password'
                        margin='normal'
                    />
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox name='rememberMe'/>}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>
        </Grid>
    </Grid>
)}