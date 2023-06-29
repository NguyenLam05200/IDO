import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Details() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const router = useRouter();
  const { slug } = router.query;
  console.log("_______", slug);

  return (
    <OnlyClient>
      <Typography variant="h4" className="t-title">
        Campaign Detail 📚
      </Typography>
      <div className="grid grid-cols-2 gap-16 p-[20px]">
        <div className="grid grid-cols-2 gap-4">
          {/* Campaign's name */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Name - cần DL
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Campaign's name
              </Typography>
              <Typography variant="body">Purpose - Cần DL</Typography>
            </CardContent>
          </Card>

          {/* Address of Manager */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Address - cần DL
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Address of Manager
              </Typography>
              <Typography variant="body">
                The manager who created this campaign can create a requests to
                withdraw funds.
              </Typography>
            </CardContent>
          </Card>

          {/* Minimum contribution (wei) */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                100 - cần DL
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Minimum Contribution (wei)
              </Typography>
              <Typography variant="body">
                You must contribute at lease this wei to become a approver.
              </Typography>
            </CardContent>
          </Card>

          {/* Number of requests */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                3 - Cần DL
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Number of requests
              </Typography>
              <Typography variant="body">
                A request with the purpose of trying to withdraw money from the
                contract. Requests must be approved by at least 50% approver
                first.
              </Typography>
            </CardContent>
          </Card>

          {/* Number of approvers */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                2 - cần DL
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Number of approvers
              </Typography>
              <Typography variant="body">
                The number of people who have already donated to this campaign.
              </Typography>
            </CardContent>
          </Card>

          {/* Campaign balance (ether) */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                100 - cần DL
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Campaign balance (ether)
              </Typography>
              <Typography variant="body">
                It stands for how much money this campaign has accumulated.
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" className="font-bold">
              Amount to contribute (Ethereum)
            </Typography>
            <input
              type="number"
              className="t-input"
              defaultValue=""
              {...register("amountEther")}
            />

            <Button className="max-w-xs p-[10px]" type="submit">
              Contribute ➕➕➕
            </Button>
          </form>
        </div>
      </div>
      <Button
        className="max-w-xs p-[10px] m-[20px]"
        onClick={() =>
          router.push({
            pathname: "/campaigns/[slug]/requests",
            query: { slug: slug },
          })
        }
      >
        Request 🧾
      </Button>
    </OnlyClient>
  );
}
