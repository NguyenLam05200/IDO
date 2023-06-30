import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function NewCampaign() {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <OnlyClient>
            <Typography variant="h2">Create new campaign</Typography>
            <div className="flex justify-center items-center">
                <form
                    className="t-create-form min-w-[450px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="h6" className="font-bold">
                        Title of Campaign
                    </Typography>
                    <input
                        type="text"
                        className="t-input"
                        defaultValue=""
                        {...register("title")}
                    />

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
                        Goal (ETH)
                    </Typography>
                    <input
                        type="float"
                        className="t-input"
                        defaultValue=""
                        {...register("Goal")}
                    />

                    <Typography variant="h6" className="font-bold">
                        Minimum contribution (wei)
                    </Typography>
                    <input
                        type="float"
                        className="t-input"
                        defaultValue=""
                        {...register("min")}
                    />

                    <Button className="p-[10px] mt-[20px]" type="submit">
                        Create ⏩
                    </Button>
                </form>
            </div>
        </OnlyClient>
    );
}
