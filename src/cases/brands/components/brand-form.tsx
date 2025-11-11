import { SideBarForm } from "@/components/layout/sidebar-form";
import { useParams } from "react-router-dom";
import { useBrandById } from "../hooks/use-brand";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lotties/SandyLoading.json";

export function BrandForm() {
    const {id} = useParams<{id: string}>();
    const { data, isLoading } = useBrandById(id ?? '')

    function saveBrand() {
        console.log("salvando a marca")
    }

    return (
        <SideBarForm 
            title="Cadastro de Marcas"
            onSave={saveBrand}
            isLoading={isLoading}
        >
            <div className="flex p-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-[300px] animate-fade-in">
                        <Lottie
                            animationData={loadingAnimation}
                            loop
                            style={{ width: 150, height: 150 }}
                        />
                        <p className="mt-4 text-gray-500 text-sm">Carregando marcas...</p>
                    </div>
                ) : (
                    <h4>{JSON.stringify(data)}</h4>
                )}
                
            </div>
        </SideBarForm>
    )
}