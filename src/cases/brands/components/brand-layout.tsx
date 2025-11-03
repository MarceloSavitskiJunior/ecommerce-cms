import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { BrandDataTable } from "./data-table/brand-data-table"
import { BreadCrumb } from "@/components/layout/bread-crumb"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Outlet, useNavigate } from "react-router-dom"

export function BrandLayout() {
    const navigate = useNavigate()

    function handleSearch() {
        navigate('/brands')
    }

    function handleCreate() {
        navigate('/marcas/new')
    }

    return (
        <div className="p-4">

            <BreadCrumb pageTitle="Marcas" />

            <div className="flex flex-col py-4 gap-4">
                <div className="flex flex-row justify-end gap-4 my-4">
                    <InputGroup className="max-w-96">
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                    </InputGroup>
                    <Button onClick={handleCreate}>
                        <Plus />
                        Adicionar
                    </Button>
                </div>

                <BrandDataTable />
                <Outlet />
            </div>
        </div>
    )
}