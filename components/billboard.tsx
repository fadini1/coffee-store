import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
};

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden max-w-none">
      <div 
        className="relative overflow-hidden bg-cover
        aspect-square md:aspect-[2.4/1] opacity-70"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center
        text-center gap-y-8">
          <div className="flex flex-col gap-2 items-center">
            <p
              className="font-bold text-3xl sm:text-4xl 
              md:text-5xl lg:text-7xl max-w-xs sm:max-w-xl
              text-zinc-900"
            >
              {data?.label}
            </p>
            
            <p
              className="max-w-sm font-medium text-xl text-white"
            >
              Delivering the Best Coffee with the Best View since 1890
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billboard;