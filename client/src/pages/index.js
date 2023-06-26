import Image from "next/image";
import { Inter } from "next/font/google";
import Button from "@/components/Button/Button";
import GradientButton from "@/components/Button/GradientButton";
import Link from "next/link";
import { BannerLogo } from "@/components/svg/SvgIcon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      {/* Banner */}
      <div
        style={{
          backgroundImage:
            "url(https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/f51a3/hero.png)",
        }}
        className="w-full h-[100vh] items-center flex flex-col bg-cover bg-center"
      >
        <BannerLogo className="mt-[60px]" />

        <div className="mt-[180px] w-full flex">
          <div className="flex flex-col items-end justify-end w-1/2 pr-[160px]">
            <div className="flex flex-col items-center justify-center gap-y-[80px] w-auto">
              <Link href="/campaigns" passHref>
                <GradientButton className="text-left !py-1 md:!py-2 !px-4 md:!px-10 w-auto h-[44px] md:h-[56px] ">
                  <div className="text-xl font-semibold ">Campaigns</div>
                </GradientButton>
              </Link>
              <div
                style={{
                  backgroundImage:
                    "url(https://ethereum.org/static/a2122b00761e964ee0084399f5e2da3c/2b6f0/oldship.png)",
                }}
                className="bg-cover bg-center bg-transparent w-[250px] h-[180px] text-xs tooltip-arrow-bottom mb-[30px] justify-center items-center  inline-flex animate-bounce rounded-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-start w-1/2 pl-[130px]">
            <div className="flex flex-col items-center justify-center gap-y-[70px] w-auto">
              <Link href="/new-campaign" passHref className="ml-4">
                <GradientButton className="text-left !py-1 md:!py-2 !px-4 md:!px-10 w-auto h-[44px] md:h-[56px] ">
                  <div className="text-xl font-semibold ">New project</div>
                </GradientButton>
              </Link>
              <div
                style={{
                  backgroundImage:
                    "url(https://ethereum.org/static/5d3af9eb308978e7a078bf51022d8a5c/1e715/merge.png)",
                }}
                className="bg-cover bg-center bg-transparent w-[250px] h-[180px] text-xs tooltip-arrow-bottom mb-[30px] justify-center items-center  inline-flex animate-bounce rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
