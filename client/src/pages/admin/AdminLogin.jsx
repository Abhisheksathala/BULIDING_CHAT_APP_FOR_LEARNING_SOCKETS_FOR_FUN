import React from 'react'
import AnimationWarper from "../../animation/AnimationWraper.jsx";
import InputComponent from "../../components/InputComponent.jsx";
import Button from "../../components/Button.jsx";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

const AdminLogin = ({type = 'login'}) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const submit = (data) => {
        console.log('data' + ' ' + data);
    };

    // const [avater, setAvater] = React.useState(null);

    const isAdmin = true

    if (isAdmin) return <Navigate to={"/admin/dashboard"}/>

    console.log(watch);

    return (
        <AnimationWarper>
            <section className="w-screen h-screen overflow-hidden flex  items-center justify-center ">
                <form
                    onSubmit={handleSubmit(submit)}
                    action=""
                    className={`w-[80%] max-w-[500px] shadow rounded-lg py-4 px-4`}
                >
                    <h1 className={`text-4xl capitalize text-center mb-15 font-semibold`}>
                        {type === 'login' ? 'Admin' : ""}
                    </h1>

                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    <InputComponent
                        type={'password'}
                        placeholder={'password'}
                        containerclass={''}
                        className={'px-2 py-2'}
                        {...register('password', {required: 'password is required'})}
                    />

                    <div className="mt-6">
                        <Button
                            type={'submit'}
                            customclass={'text-white font-semibold '}
                            title={<>{type === 'signin' ? 'signin' : 'login'}</>}
                        />
                    </div>
                    {/*<div*/}
                    {/*    className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold ">*/}
                    {/*    <hr className="w-1/2 border-black"/>*/}
                    {/*    <p>Or</p>*/}
                    {/*    <hr className="w-1/2 border-black"/>*/}
                    {/*</div>*/}
                </form>
            </section>
        </AnimationWarper>
    )
}
export default AdminLogin
