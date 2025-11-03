import { DataTable } from "@/components/ui/data-table";
import { brandsColumns } from "./brand-columns";
import { useBrands } from "../../hooks/use-brand";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lotties/SandyLoading.json";

export function BrandDataTable() {
    const { data: brands, isLoading } = useBrands();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[300px] animate-fade-in">
                <Lottie
                    animationData={loadingAnimation}
                    loop
                    style={{ width: 150, height: 150 }}
                />
                <p className="mt-4 text-gray-500 text-sm">Carregando marcas...</p>
            </div>
        );
    }

    return <DataTable columns={brandsColumns} data={brands!} />;
}
