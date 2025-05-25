import { DataTablePosts } from '@/components/posts/DataTablePosts';
import React from 'react';

const PostsPage = () => {
    return (
        <div className='l-postsPage w-full rounded-xl p-6 bg-primary-foreground'>
            <DataTablePosts/>
        </div>
    );
}

export default PostsPage;
