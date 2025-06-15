'use client'

import "./index.css"
import { getPostBySlug } from '@/lib/api/posts';
import { Posts } from '@/types/posts';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';

const PostDetailPage = () => {
    const params = useParams();
    const [post, setPost] = React.useState<Posts | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                const slug = params.slug as string;
                const response = await getPostBySlug(slug);
                setPost(response);
            } catch (error) {
                console.error('Error fetching post:', error);
                setPost(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.slug) {
            fetchPost();
        }
    }, [params.slug]);

    if (isLoading) {
        return (
            <div className='w-full rounded-xl p-6 bg-primary-foreground'>
                <div className="overflow-hidden">
                    <Skeleton className="w-full h-[400px]" />
                    <div className="p-6">
                        <Skeleton className="h-8 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-1/4 mb-2" />
                        <Skeleton className="h-4 w-1/4 mb-6" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className='w-full rounded-xl p-6 bg-primary-foreground'>
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-center">Không tìm thấy bài viết</h1>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full rounded-xl p-6 bg-primary-foreground'>
            <div className="relative w-full h-[400px]">
            <Image
                src={post.thumbnail.full}
                alt={post.title}
                fill
                sizes='100%'
                className="object-cover"
            />
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                        <Badge key={category.id} variant="secondary">
                            {category.name}
                        </Badge>
                    ))}
                </div>
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                </div>
                <div className="c-article_post">
                    <article className="detail-post post-content">
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default PostDetailPage; 