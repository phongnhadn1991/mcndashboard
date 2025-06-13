'use client'

import { getAllPosts } from '@/lib/api/posts';
import { Posts } from '@/types/posts';
import React from 'react';
import NewsCard from '@/components/posts/NewsCard';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import PaginationCustom, { PaginationData } from '@/components/pagination/pagination-custom';

const PostsPage = () => {
    const [dataPosts, setDataPosts] = React.useState<Posts[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [pagination, setPagination] = React.useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 12,
        total_pages: 0,
        has_next_page: false,
        has_prev_page: false
    });

    const fetchPosts = async (page: number) => {
        try {
            setIsLoading(true);
            const response = await getAllPosts({
                params: {
                    posts_per_page: 12,
                    page: page
                }
            });
            setDataPosts(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setDataPosts([]);
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        fetchPosts(1);
    }, []);

    const handlePageChange = (page: number) => {
        fetchPosts(page);
    };

    const featuredPosts = dataPosts.slice(0, 8);
    const listPosts = dataPosts;

    return (
        <div className='l-postsPage w-full rounded-xl p-6 bg-primary-foreground'>
            {/* Featured Posts Carousel */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {Array(4).fill(0).map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                                <Skeleton className="w-full h-48" />
                                <div className="p-4">
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="relative">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {featuredPosts.map((post) => (
                                    <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4">
                                        <div className="p-1">
                                            <NewsCard post={post} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                                <CarouselPrevious className="static translate-y-0" />
                            </div>
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                                <CarouselNext className="static translate-y-0" />
                            </div>
                        </Carousel>
                    </div>
                )}
            </div>

            {/* Posts List */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array(12).fill(0).map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                                <Skeleton className="w-full h-48" />
                                <div className="p-4">
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            </Card>
                        ))
                    ) : (
                        listPosts.map((post) => (
                            <NewsCard key={post.id} post={post} />
                        ))
                    )}
                </div>
                <PaginationCustom 
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default PostsPage;
