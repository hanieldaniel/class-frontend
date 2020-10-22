import React from 'react'
import { Form, Formik, } from 'formik'
import { Box, Button} from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useLoginMutation} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";




const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [{}, login] = useLoginMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async(values, {setErrors}) => {
                   const response = await login({options: values});
                   if(response.data?.login.errors){
                        setErrors(toErrorMap(response.data.login.errors))
                   }else  if(response.data?.login.user){
                        const userType = response.data.login.user.usertype;
                        if(userType === "admin"){
                            window.location.href = '/admin';
                        }else if(userType === "staff") {
                            window.location.href = '/staff';
                        } else{
                            window.location.href = '/student';
                        }
                   }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="username" placeholder="username" label="Username" />
                        <Box mt={4}>
                            <InputField name="password" placeholder="password" label="Password" type="password" />
                        </Box>
                        <Button
                            mt={4}
                            variantColor="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >Login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Login