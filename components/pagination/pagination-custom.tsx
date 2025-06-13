import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import clsx from 'clsx';

export interface PaginationData {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
}

interface PaginationCustomProps {
    pagination: PaginationData;
    onPageChange: (page: number) => void;
    className?: string;
}

const PaginationCustom = ({ pagination, onPageChange, className }: PaginationCustomProps) => {
    const renderPaginationItems = () => {
        const items: React.ReactNode[] = [];
        const currentPage = pagination.page;
        const totalPages = pagination.total_pages;

        // Previous button
        items.push(
            <PaginationItem key="prev">
                <PaginationPrevious 
                    onClick={(e) => {
                        e.preventDefault();
                        if (pagination.has_prev_page) {
                            onPageChange(currentPage - 1);
                        }
                    }}
                    className={clsx(
                        !pagination.has_prev_page ? "pointer-events-none opacity-50" : "",
                        'cursor-pointer'
                    )}
                />
            </PaginationItem>
        );

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // First page
                i === totalPages || // Last page
                (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
            ) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(i);
                            }}
                            isActive={currentPage === i}
                            className='cursor-pointer'
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                items.push(
                    <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        // Next button
        items.push(
            <PaginationItem key="next">
                <PaginationNext 
                    onClick={(e) => {
                        e.preventDefault();
                        if (pagination.has_next_page) {
                            onPageChange(currentPage + 1);
                        }
                    }}
                    className={clsx(
                        !pagination.has_next_page ? "pointer-events-none opacity-50" : "",
                        'cursor-pointer'
                    )}
                />
            </PaginationItem>
        );

        return items;
    };

    return (
        <div className={clsx('py-10', className)}>
            <Pagination>
                <PaginationContent>
                    {renderPaginationItems()}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationCustom; 