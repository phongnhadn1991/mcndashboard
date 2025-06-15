import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Posts } from "@/types/posts";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface NewsCardProps {
  post: Posts;
}

const NewsCard = ({ post }: NewsCardProps) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
        <div className="relative w-full h-48">
          <Image
            src={post.thumbnail.large}
            alt={post.title}
            fill
            sizes='100%'
            className="object-cover"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
          <h3 className="font-semibold line-clamp-2">{post.title}</h3>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NewsCard; 