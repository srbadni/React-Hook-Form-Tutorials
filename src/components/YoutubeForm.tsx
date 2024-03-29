import {useForm, useFieldArray, FieldErrors} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {useEffect} from "react";

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
        mode: "onTouched",
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
    const {register, control, handleSubmit,reset, trigger, formState: {errors, isDirty, isValid, isSubmitSuccessful}, getValues, setValue} = form;
    const {fields, append, remove} = useFieldArray({
        name: "phoneNumbers",
        control
    })
    const handleGetValues = () => {
        console.log("getValues", getValues("username"));
    }

    const handleResetValues = () => {
        reset()
    }

    const handleTriggerValues = () => {
        trigger()
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful])

    const handleSetValues = () => {
        setValue("username", "Hamed", {
            shouldTouch: true
        });
    }

    const onErrorHandler = (errors: FieldErrors<FormValues>) => {
        console.log(errors, "errors")
    }

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data);
    };

    return (
        <div>
            <h1>YouTube Form</h1>

            <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
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
                            },
                            emailAvailable: async (fieldValue) => {
                                const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                                const data = await response.json();
                                return data.length === 0 || "ایمیل موجود است"
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

                <button disabled={!isDirty || !isValid} style={{background: "#20de7e"}}>Submit</button>
                <button type="button" onClick={handleResetValues}>reset values</button>
                <button type="button" onClick={handleTriggerValues}>trigger</button>
                <button type="button" onClick={handleGetValues}>get values</button>
                <button type="button" onClick={handleSetValues}>set values</button>
            </form>

            <DevTool control={control}/>
        </div>
    );
};