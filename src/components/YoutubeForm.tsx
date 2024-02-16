import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";

type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string,
        facebook: string,
    },
    phoneNumbers: string[]
};

export const YouTubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            username: "alireza",
            email: "",
            channel: "",
            social: {
                twitter: "",
                facebook: ""
            },
            phoneNumbers: ["", ""]
        },
    });
    const {register, control, handleSubmit, formState: {errors}} = form;

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data);
    };

    return (
        <div>
            <h1>YouTube Form</h1>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", {
                        required: "نام کاربری الزامی است"
                    })} />
                    <p className="error">{errors.username?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" {...register("email", {
                        required:"ایمیل الزامی است",
                        validate: {
                            notAdmin: (field) => {
                                return (field !== "test@gmail.com" || "یک ایمیل دیگر وارد کنید");
                            },
                            notBlockListed: (field) => {
                                return (!field.endsWith("baddomain.com") || "غیر قابل قبول");
                            }
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "invalid format"
                        }
                    })} />
                    <p className="error">{errors.email?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" {...register("channel", {
                        required: "نام کانال الزامی است"
                    })} />
                    <p className="error">{errors.channel?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="twitter">twitter</label>
                    <input type="text" id="twitter" {...register("social.twitter")} />
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">facebook</label>
                    <input type="text" id="facebook" {...register("social.facebook")} />
                </div>

                <div className="form-control">
                    <label htmlFor="primaryNumber">primaryNumber</label>
                    <input type="text" id="primaryNumber" {...register("phoneNumbers.0")} />
                </div>

                <div className="form-control">
                    <label htmlFor="secondaryNumber">secondaryNumber</label>
                    <input type="text" id="secondaryNumber" {...register("phoneNumbers.1")} />
                </div>

                <button>Submit</button>
            </form>

            <DevTool control={control}/>
        </div>
    );
};