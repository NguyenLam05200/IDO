import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { withdrawFunds } from "@/redux/projectSlice";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function NewRequest() {
  const router = useRouter();
  const { slug } = router.query;
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const { description, value } = data;
    const x = await withdrawFunds(slug, value, description);
    console.log(x);
    // reset();
  };

  return (
    <OnlyClient>
      <div className="h-[calc(100vh-88px)]">
        <Typography variant="h4" gutterBottom className="font-semibold">
          New Request
        </Typography>
        <div className="flex mt-[80px] justify-center items-center">
          <form
            className="t-create-form min-w-[450px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h6" className="font-bold">
              Reason
            </Typography>
            <input
              type="text"
              className="t-input !mb-8"
              defaultValue=""
              {...register("description")}
            />

            <Typography variant="h6" className="font-bold">
              Value (ETH)
            </Typography>
            <input
              type="float"
              className="t-input !mb-8"
              defaultValue=""
              {...register("value")}
            />

            {/* <Typography variant="h6" className="font-bold">
              Recipient
            </Typography>
            <input
              type="text"
              className="t-input"
              defaultValue=""
              {...register("recipient")}
            /> */}

            <Button className="p-[10px] mt-[20px]" type="submit">
              Submit ⏩
            </Button>
          </form>
        </div>
      </div>
    </OnlyClient>
  );
}
