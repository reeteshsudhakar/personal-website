import { Stack } from "@mantine/core";
import PressContainer from "./PressContainer/PressContainer";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { pressArticles } from "@/utils/constants";

export default function HomePage() {
    return (
        <PressContainer>
            <Stack pb={'xl'}>
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
