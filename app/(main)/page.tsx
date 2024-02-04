/* eslint-disable @next/next/no-img-element */

'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

    //ProductService Type

    type InventoryStatus = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
    type Status = 'DELIVERED' | 'PENDING' | 'RETURNED' | 'CANCELLED';

    type ProductOrder = {
        id?: string;
        productCode?: string;
        date?: string;
        amount?: number;
        quantity?: number;
        customer?: string;
        status?: Status;
    };
    type Product = {
        id?: string;
        code?: string;
        name: string;
        description: string;
        image?: string;
        price?: number;
        category?: string;
        quantity?: number;
        inventoryStatus?: InventoryStatus;
        rating?: number;
        orders?: ProductOrder[];
        [key: string]: string | string[] | number | boolean | undefined | ProductOrder[] | InventoryStatus;
    };

    // This Functions is used for API call
const getProductsSmall = async ()=> {
    return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.data as Product[]);
}

// Export this component

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProductsSmall().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        <div className="grid">
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Recent Sales</h5>
                    <DataTable value={products} rows={5} paginator >
                        <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
                        <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                        <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />
                        <Column
                            header="View"
                            style={{ width: '15%' }}
                            body={() => (<Button icon="pi pi-search" text />
                            )}
                        />
                    </DataTable>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
