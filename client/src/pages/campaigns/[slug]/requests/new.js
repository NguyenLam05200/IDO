import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function NewRequest() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <OnlyClient>
            <Typography variant="h3" gutterBottom>
                New Request 🆕
            </Typography>
            <div className="flex justify-center items-center">
                <form
                    className="t-create-form min-w-[450px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="h6" className="font-bold">
                        Description
                    </Typography>
                    <input
                        type="text"
                        className="t-input"
                        defaultValue=""
                        {...register("description")}
                    />

                    <Typography variant="h6" className="font-bold">
                        Value (ETH)
                    </Typography>
                    <input
                        type="float"
                        className="t-input"
                        defaultValue=""
                        {...register("value")}
                    />

                    <Typography variant="h6" className="font-bold">
                        Recipient
                    </Typography>
                    <input
                        type="text"
                        className="t-input"
                        defaultValue=""
                        {...register("recipient")}
                    />

                    <Button className="p-[10px] mt-[20px]" type="submit">
                        Create ⏩
                    </Button>
                </form>
            </div>
        </OnlyClient>
    );
}
