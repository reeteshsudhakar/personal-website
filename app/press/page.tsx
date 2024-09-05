import { Stack } from "@mantine/core";
import PressContainer from "./PressContainer/PressContainer";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { pressArticles } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Press | Reetesh Sudhakar",
    description: "A compilation of relevant publications and press about me!",
};

export default function Page() {
    return (
        <PressContainer>
            <Stack pb={"xl"}>
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
            </Stack>
        </PressContainer>
    );
}
