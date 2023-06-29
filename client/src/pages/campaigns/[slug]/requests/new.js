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
      <Typography variant="h4" className="t-title">
        New Request 🆕
      </Typography>
      <div className="grid grid-cols-3 gap-16 p-[20px]">
        <div>
          <Button
            className="max-w-fit pl-[20px] pr-[20px]"
            onClick={() => router.back()}
          >
            Back 🔙
          </Button>
        </div>
        <form className="t-create-form" onSubmit={handleSubmit(onSubmit)}>
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
        <div></div>
      </div>
    </OnlyClient>
  );
}
