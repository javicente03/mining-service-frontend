import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { Fragment, useEffect } from "react";
import { SizeHook } from "../../utils/SizeHook";
import './index.css';

export default function Paginator({
    query,
    filters,
    setFilters,
}: {
    query: any;
    filters: any;
    setFilters: any;
}) : JSX.Element {

    const changePage = (e: any, page: number) => {
        console.log(page)
        setFilters({
            ...filters,
            skip: (page - 1) * filters.limit,
            // limit: 36
        })
    }

    const size = SizeHook();

    return (
        <Fragment>
            <div style={{
                justifyContent: size.width < 900 ? 'center' : 'right',
                display: 'flex'
            }}>
            {/* El count de pagination debe ser el total de paginas en base al total de elementos divididos entre 36 */}
            
            {query && (
            <div>
                <Pagination className="paginator" variant={"outlined"} shape="rounded" count={
                    Math.ceil(query / filters.limit)
                } onChange={changePage} page={filters.skip / filters.limit + 1}
                // @ts-ignore
                defaultPage={1} color='primary'
                // Si la pantalla es menor a 468px solo mostrar 3 paginas
                siblingCount={0} size='small'
                />
            </div>
            )}
            </div>
        </Fragment>
    )
}