import {useForm, useFieldArray} from "react-hook-form";
import {DevTool} from "@hookform/devtools";

type FormValues = {
    username: string;
    email: string;
    channel: string;
    age: number;
    dob: Date;
    social: {
        twitter: string,
        facebook: string,
    },
    phoneNumbers: {
        number: string
    }[]
};

export const YouTubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            username: "alireza",
            email: "",
            channel: "",
            age: 0,
            dob: new Date(),
            social: {
                twitter: "",
                facebook: ""
            },
            phoneNumbers: [{
                number: ""
            }]
        },
    });
    const {register, control, handleSubmit, formState: {errors}} = form;
    const {fields, append, remove} = useFieldArray({
        name: "phoneNumbers",
        control
    })

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
                    <label htmlFor="age">age</label>
                    <input type="text" id="age" {...register("age", {
                        valueAsNumber: true
                    })} />
                </div>

                <div className="form-control">
                    <label htmlFor="dob">dob</label>
                    <input type="date" id="dob" {...register("dob", {
                        valueAsDate: true
                    })} />
                </div>

                <div className="form-control">
                    <label htmlFor="twitter">twitter</label>
                    <input type="text" id="twitter" {...register("social.twitter")} />
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">facebook</label>
                    <input type="text" id="facebook" {...register("social.facebook")} />
                </div>

                <div>
                    <label>لیست شماره تلفن ها</label>
                    <div>
                        {
                            fields.map((field, index) => {
                                return <div key={field.id} className="form-control">
                                    <input type="text" {...register(`phoneNumbers.${index}.number`)}/>
                                    {
                                        index > 0 && (
                                            <button onClick={() => remove(index)} type="button">حذف کردن</button>
                                        )
                                    }
                                </div>
                            })
                        }
                        <button type="button" onClick={() => {
                            append({
                                number: ""
                            })
                        }
                        }>افزودن</button>
                    </div>
                </div>

                <button>Submit</button>
            </form>

            <DevTool control={control}/>
        </div>
    );
};