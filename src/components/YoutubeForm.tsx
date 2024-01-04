import {useForm} from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
    username: string;
    email: string;
    channel: string;
};

export const YouTubeForm = () => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit } = form;

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data);
    };

    return (
        <div>
            <h1>YouTube Form</h1>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {
                    required: "نام کاربری الزامی است"
                })} />

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" {...register("email", {
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "invalid format"
                    }
                })} />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel", {
                    required: "نام کانال الزامی است"
                })} />

                <button>Submit</button>
            </form>

            <DevTool control={control} />
        </div>
    );
};