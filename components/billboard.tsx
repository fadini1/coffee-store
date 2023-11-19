import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  billboardDescription?: string;

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
      />  
    </div>
  )
}

export default Billboard;