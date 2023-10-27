import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  billboardDescription: string;

  data: BillboardType;
};

const Billboard: React.FC<BillboardProps> = ({
  data,
  billboardDescription 
}) => {
  return (
    <div className="w-full overflow-hidden max-w-none">
      <div 
        className="relative overflow-hidden bg-cover
        aspect-square md:aspect-[2.4/1] opacity-90"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center
        text-center gap-y-8">
          <div className="flex flex-col gap-2 items-center">
            <p
              className="font-bold text-3xl sm:text-4xl 
              md:text-5xl lg:text-7xl max-w-xs sm:max-w-xl
              text-black"
            >
              {data?.label}
            </p>
            
            <p
              className="max-w-xs font-medium text-2xl text-white -mt-2
              bg-black bg-opacity-40 py-1 px-3 rounded-md"
            >
              {billboardDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billboard;