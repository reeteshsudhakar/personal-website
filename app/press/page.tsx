import PressContainer from "./PressContainer/PressContainer";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { pressArticles } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Press | Reetesh Sudhakar",
    description: "A compilation of relevant publications and press about me!",
};

export default function Page() {
    return (
        <PressContainer>
            <div className="flex flex-col gap-6 pb-8">
                {pressArticles.map((article) => (
                    <ArticleCard
                        key={article.title}
                        source={article.source}
                        title={article.title}
                        imagePath={article.imagePath}
                        date={article.date}
                        author={article.author}
                        href={article.href}
                    />
                ))}
            </div>
        </PressContainer>
    );
}
