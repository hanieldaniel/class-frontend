import React from 'react'
import { Form, Formik, } from 'formik'
import { Box, Button, FormLabel, Select } from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

interface registerProps {

}


const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [{ }, register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "", usertype: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        const userType = response.data.register.user.usertype;
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
                            <FormLabel htmlFor="name">UserType</FormLabel>
                            <Select  name="usertype" variant="filled" placeholder="Select Role" isRequired>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                                <option value="student">Student</option>
                            </Select>
                        </Box>
                        <Box mt={4}>
                            <InputField name="password" placeholder="password" label="Password" type="password" />
                        </Box>
                        <Button
                            mt={4}
                            variantColor="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register